#!/usr/bin/env node
/**
 * XQF (象棋演播室) decoder — Phase 0 spike.
 *
 * Format reference:
 *  - Official XQF 1.0 spec (unencrypted, version byte 0x0A): xqbase/eleeye XQFTOOLS/XQF.TXT
 *  - Encrypted variants (version > 10, seen widely in the wild, e.g. 0x0C/0x0D/0x12):
 *    algorithm reverse-engineered independently by multiple open-source projects
 *    (walker8088/cchess, zfdang/chinese-chess-fish-android, FastLight126/vschess,
 *    Velithia/JieqiBox). This script re-implements that documented algorithm.
 *
 * Output: JSON with title, fen_initial, moves[], annotations[], decode_warnings[].
 */

const fs = require('fs');
const path = require('path');

const FEN_PIECES = 'RNBAKABNRCCPPPPPrnbakabnrccppppp';

function readLE32(buf, offset) {
  return buf.readUInt32LE(offset);
}

function bytesToLatin1String(bytes) {
  let end = bytes.length;
  const zeroIdx = bytes.indexOf(0);
  if (zeroIdx !== -1) end = zeroIdx;
  return Buffer.from(bytes.slice(0, end)).toString('latin1').trim();
}

function readLenPrefixedString(buffer, lenOffset, dataOffset) {
  const length = buffer[lenOffset];
  if (!length) return { raw: Buffer.alloc(0), text: '' };
  const raw = buffer.slice(dataOffset, dataOffset + length);
  return { raw, text: bytesToLatin1String(raw) };
}

function parseHeader(buffer) {
  if (buffer.length < 1024) throw new Error('File too small to be XQF (< 1024 bytes header)');
  const magic = buffer.toString('ascii', 0, 2);
  if (magic !== 'XQ') throw new Error(`Bad magic header: expected "XQ", got "${magic}"`);

  const header = {
    magic,
    version: buffer[2],
    keyMask: buffer[3],
    keyOr: [buffer[8], buffer[9], buffer[10], buffer[11]],
    keySum: buffer[12],
    keyXYp: buffer[13],
    keyXYf: buffer[14],
    keyXYt: buffer[15],
    qiziXY: Array.from(buffer.slice(16, 48)),
    playStepNo: buffer.readUInt16LE(48),
    whoPlay: buffer[50],
    playResult: buffer[51],
    type: buffer[64],
  };

  const title = readLenPrefixedString(buffer, 80, 81);
  const matchName = readLenPrefixedString(buffer, 208, 209);
  const matchTime = readLenPrefixedString(buffer, 272, 273);
  const matchAddr = readLenPrefixedString(buffer, 288, 289);
  const redPlayer = readLenPrefixedString(buffer, 304, 305);
  const blkPlayer = readLenPrefixedString(buffer, 320, 321);
  const rmkWriter = readLenPrefixedString(buffer, 464, 465);
  const author = readLenPrefixedString(buffer, 480, 481);

  header.title = title;
  header.matchName = matchName;
  header.matchTime = matchTime;
  header.matchAddr = matchAddr;
  header.redPlayer = redPlayer;
  header.blkPlayer = blkPlayer;
  header.rmkWriter = rmkWriter;
  header.author = author;

  return header;
}

// Watermark used by the (reverse-engineered) encryption scheme for version > 15.
const WATERMARK = '[(C) Copyright Mr. Dong Shiwei.]';

function calculateKeys(header) {
  const keys = { F32: new Array(32).fill(0), XYp: 0, XYf: 0, XYt: 0, RMK: 0 };

  if (header.version <= 10) {
    // Baseline XQF 1.0 — no encryption at all (per official spec).
    return keys;
  }

  keys.XYp = ((header.keyXYp * header.keyXYp * 54 + 221) * header.keyXYp) & 0xff;
  keys.XYf = ((header.keyXYf * header.keyXYf * 54 + 221) * keys.XYp) & 0xff;
  keys.XYt = ((header.keyXYt * header.keyXYt * 54 + 221) * keys.XYf) & 0xff;
  keys.RMK = ((((header.keySum << 8) + header.keyXYp) % 32000) + 767) & 0xffff;

  if (header.version > 15) {
    const FKey = [
      (header.keySum & header.keyMask) | header.keyOr[0],
      (header.keyXYp & header.keyMask) | header.keyOr[1],
      (header.keyXYf & header.keyMask) | header.keyOr[2],
      (header.keyXYt & header.keyMask) | header.keyOr[3],
    ];
    for (let i = 0; i < 32; i++) {
      keys.F32[i] = FKey[i % 4] & WATERMARK.charCodeAt(i);
    }
  }

  return keys;
}

function decryptMoveBlock(raw, keys, version) {
  if (version <= 15) return raw; // F32 all-zero anyway, but skip work
  const out = Buffer.alloc(raw.length);
  for (let i = 0; i < raw.length; i++) {
    out[i] = (raw[i] - keys.F32[i % 32]) & 0xff;
  }
  return out;
}

// posCode -> {x, y, boardIndex} ; boardIndex 0..89, row-major, rank9 (black back rank) first.
function posCodeToCoord(posCode) {
  const x = Math.floor(posCode / 10);
  const y = 9 - (posCode % 10);
  const boardIndex = y * 9 + x;
  return { x, y, boardIndex };
}

function boardIndexToAlgebraic(index) {
  const file = index % 9;
  const rank = 9 - Math.floor(index / 9);
  return String.fromCharCode(97 + file) + rank; // a-i, 0-9
}

function parsePiecePositions(header, keys) {
  const board = new Array(90).fill(null);
  const warnings = [];

  for (let i = 0; i < 32; i++) {
    let pieceKey;
    let piecePos;

    if (header.version > 11) {
      pieceKey = (keys.XYp + i + 1) & 31;
      piecePos = (header.qiziXY[i] - keys.XYp) & 0xff;
    } else {
      pieceKey = i;
      piecePos = header.qiziXY[i];
    }

    if (piecePos >= 90) continue; // captured / off-board

    const { boardIndex } = posCodeToCoord(piecePos);
    if (boardIndex < 0 || boardIndex > 89) {
      warnings.push(`piece ${i}: out-of-range boardIndex ${boardIndex} (piecePos=${piecePos})`);
      continue;
    }
    if (board[boardIndex] !== null) {
      warnings.push(`piece ${i}: square ${boardIndex} already occupied by piece key ${board[boardIndex].pieceKey}`);
    }
    board[boardIndex] = { pieceKey, char: FEN_PIECES[pieceKey] };
  }

  return { board, warnings };
}

function boardToFen(board) {
  let fen = '';
  for (let rank = 0; rank < 10; rank++) {
    let empty = 0;
    let rankStr = '';
    for (let file = 0; file < 9; file++) {
      const idx = rank * 9 + file;
      const cell = board[idx];
      if (!cell) {
        empty++;
      } else {
        if (empty > 0) { rankStr += empty; empty = 0; }
        rankStr += cell.char;
      }
    }
    if (empty > 0) rankStr += empty;
    fen += (rank > 0 ? '/' : '') + rankStr;
  }
  return fen;
}

function countPieces(board) {
  const counts = {};
  for (const cell of board) {
    if (!cell) continue;
    counts[cell.char] = (counts[cell.char] || 0) + 1;
  }
  return counts;
}

// --- Ký hiệu nước đi tiếng Việt (chuẩn cờ tướng) ---------------------------------------------
// Cột đếm 1..9 TỪ PHẢI SANG TRÁI theo TỪNG BÊN: Đỏ file = 9 - x; Đen file = x + 1.
// Đỏ "tiến" = tiến về phía trên (rank index giảm); Đen "tiến" = xuống dưới (rank index tăng).
// Quân đi thẳng theo cột (Xe/Pháo/Tốt/Tướng): tiến/thoái dùng SỐ BƯỚC; bình dùng cột đích.
// Quân đổi cột (Mã/Tượng/Sĩ): tiến/thoái dùng CỘT ĐÍCH.
// Hai quân cùng loại cùng cột: thay số cột bằng "trước"/"sau". (Xác minh với sách "Phương Pháp
// Sát Chiêu": "Mã 8 tiến 7", "Pháo 3 bình 5", "Sĩ 5 thoái 6", "Xe 2 thoái 1"...)
const PIECE_VI = {
  R: 'Xe', N: 'Mã', B: 'Tượng', A: 'Sĩ', K: 'Tướng', C: 'Pháo', P: 'Tốt',
  r: 'Xe', n: 'Mã', b: 'Tượng', a: 'Sĩ', k: 'Tướng', c: 'Pháo', p: 'Tốt',
};
const STRAIGHT_MOVERS = 'RCPKrcpk'; // Xe, Pháo, Tốt, Tướng — đi thẳng theo cột

function fileNumberVi(x, isRed) {
  return isRed ? (9 - x) : (x + 1);
}

// board: mảng 90 (null | { char } | char) TRƯỚC nước đi. from/to là boardIndex (rank*9+file).
function moveNotationVi(board, fromIdx, toIdx) {
  const cell = board[fromIdx];
  const piece = cell ? (typeof cell === 'string' ? cell : cell.char) : null;
  if (!piece) return null;
  const name = PIECE_VI[piece];
  if (!name) return null;

  const isRed = piece === piece.toUpperCase();
  const fx = fromIdx % 9, fr = Math.floor(fromIdx / 9);
  const tx = toIdx % 9, tr = Math.floor(toIdx / 9);

  // Có quân cùng loại cùng màu trên cùng cột fx không? → dùng trước/sau.
  const mates = [];
  for (let r = 0; r < 10; r++) {
    const c = board[r * 9 + fx];
    const ch = c ? (typeof c === 'string' ? c : c.char) : null;
    if (ch === piece) mates.push(r);
  }
  let colDesig;
  if (mates.length >= 2) {
    mates.sort((a, b) => a - b); // theo rank index tăng dần (trên→dưới)
    const frontRank = isRed ? mates[0] : mates[mates.length - 1]; // "trước" = gần đối phương
    colDesig = (fr === frontRank) ? 'trước' : 'sau';
  } else {
    colDesig = String(fileNumberVi(fx, isRed));
  }

  let verb, target;
  if (fr === tr) {
    verb = 'bình';
    target = String(fileNumberVi(tx, isRed));
  } else {
    const forward = isRed ? (tr < fr) : (tr > fr);
    verb = forward ? 'tiến' : 'thoái';
    target = STRAIGHT_MOVERS.includes(piece)
      ? String(Math.abs(tr - fr))       // số bước
      : String(fileNumberVi(tx, isRed)); // cột đích
  }

  return `${name} ${colDesig} ${verb} ${target}`;
}

// Apply a from->to move to a board array (90 cells, null or char). Returns new board.
// Deterministic: piece at `from` moves to `to`, capturing whatever sits there. No legality
// check needed — the moves come from a recorded game, we only replay them for display.
function applyMove(board, fromIndex, toIndex) {
  const next = board.slice();
  next[toIndex] = next[fromIndex];
  next[fromIndex] = null;
  return next;
}

function boardArrayToFen(board) {
  // board is array of 90: null or { char } OR plain char string.
  let fen = '';
  for (let rank = 0; rank < 10; rank++) {
    let empty = 0;
    let rankStr = '';
    for (let file = 0; file < 9; file++) {
      const cell = board[rank * 9 + file];
      const ch = cell ? (typeof cell === 'string' ? cell : cell.char) : null;
      if (!ch) { empty++; }
      else { if (empty > 0) { rankStr += empty; empty = 0; } rankStr += ch; }
    }
    if (empty > 0) rankStr += empty;
    fen += (rank > 0 ? '/' : '') + rankStr;
  }
  return fen;
}

// XQF stores moves as a depth-first tree, NOT a flat list: each record may carry a "next"
// (continuation) child and a "variation" (alternative to this move) sibling. Replaying every
// record linearly onto one board drifts as soon as a variation branch appears. So we walk the
// tree recursively (advancing a shared cursor to skip variation subtrees correctly) and keep
// only the MAIN LINE (root → first child → first child → ...) for lesson display. Variations
// are parsed-through but not shown in v1. Reference: walker8088/cchess io_xqf.py _read_steps.
function parseMoves(moveData, header, keys, initialBoard) {
  const warnings = [];
  const isLow = header.version <= 0x0A;
  const cursor = { pos: 0 };
  let variationCount = 0;

  const readInt = () => {
    if (cursor.pos + 4 > moveData.length) { cursor.pos = moveData.length; return 0; }
    const v = readLE32(moveData, cursor.pos);
    cursor.pos += 4;
    return v;
  };

  // Read one node at the current cursor. `board` is the position BEFORE this move.
  // Returns { node, boardAfter } or null when out of data.
  const readNode = (board) => {
    if (cursor.pos + 4 > moveData.length) return null;
    const info = [moveData[cursor.pos], moveData[cursor.pos + 1], moveData[cursor.pos + 2]];
    cursor.pos += 4; // 4-byte step header (byte 3 reserved)

    let hasNext, hasVar, annoteLen;
    if (isLow) {
      hasNext = (info[2] & 0xf0) !== 0;
      hasVar = (info[2] & 0x0f) !== 0;
      annoteLen = readInt(); // low version ALWAYS stores a 4-byte annote length
    } else {
      const flag = info[2] & 0xe0;
      hasNext = (flag & 0x80) !== 0;
      hasVar = (flag & 0x40) !== 0;
      annoteLen = (flag & 0x20) !== 0 ? readInt() - keys.RMK : 0;
    }
    if (annoteLen < 0 || annoteLen > 200000) { annoteLen = 0; }

    let annote = '';
    if (annoteLen > 0 && cursor.pos + annoteLen <= moveData.length) {
      annote = bytesToLatin1String(moveData.slice(cursor.pos, cursor.pos + annoteLen));
      cursor.pos += annoteLen;
    } else if (annoteLen > 0) {
      cursor.pos = moveData.length;
    }

    const Pf = isLow ? (info[0] - 24) & 0xff : (info[0] - 24 - keys.XYf) & 0xff;
    const Pt = isLow ? (info[1] - 32) & 0xff : (info[1] - 32 - keys.XYt) & 0xff;
    const from = posCodeToCoord(Pf);
    const to = posCodeToCoord(Pt);

    // Apply the move to a COPY (leave `board` intact for a possible variation sibling).
    let boardAfter = board;
    let movedPiece = null;
    let captured = null;
    let wxfVi = null;
    const isSentinel = (from.boardIndex === to.boardIndex);
    if (board && !isSentinel && from.boardIndex >= 0 && from.boardIndex <= 89 && to.boardIndex >= 0 && to.boardIndex <= 89) {
      movedPiece = board[from.boardIndex];
      captured = board[to.boardIndex];
      if (!movedPiece) {
        warnings.push(`move ${from.boardIndex}->${to.boardIndex}: no piece at source (main-line replay drift?)`);
      }
      wxfVi = moveNotationVi(board, from.boardIndex, to.boardIndex); // trên board TRƯỚC nước đi
      boardAfter = applyMove(board, from.boardIndex, to.boardIndex);
    }

    const node = {
      isSentinel,
      fromIndex: from.boardIndex,
      toIndex: to.boardIndex,
      from: boardIndexToAlgebraic(from.boardIndex),
      to: boardIndexToAlgebraic(to.boardIndex),
      movedPiece,
      captured,
      wxfVi,
      fenAfter: boardAfter ? boardArrayToFen(boardAfter) : null,
      comment: annote,
      next: null,
    };

    // Depth-first: continuation follows the position AFTER this move; a variation is an
    // ALTERNATIVE to this move, branching from the SAME position before it (board).
    if (hasNext) node.next = readNode(boardAfter);
    if (hasVar) { variationCount++; readNode(board); } // parse-through only, discard

    return node;
  };

  const startBoard = initialBoard ? initialBoard.map(c => (c ? c.char : null)) : null;
  const root = readNode(startBoard);

  // Root record is the fixed empty-move sentinel; its comment is the file-level comment,
  // and its `.next` chain is the real main line.
  const fileLevelComment = root ? root.comment : '';
  const moves = [];
  let n = root ? root.next : null;
  let order = 0;
  while (n) {
    order++;
    moves.push({
      step_order: order,
      from: n.from,
      to: n.to,
      from_index: n.fromIndex,
      to_index: n.toIndex,
      moved_piece: n.movedPiece,
      captured_piece: n.captured,
      wxf_vi: n.wxfVi,
      fen_after: n.fenAfter,
      comment: n.comment,
    });
    n = n.next;
  }

  if (variationCount > 0) {
    warnings.push(`${variationCount} variation branch(es) skipped (only main line kept for v1)`);
  }

  return { moves, warnings, fileLevelComment };
}

function decodeFile(filePath) {
  const buffer = fs.readFileSync(filePath);
  const header = parseHeader(buffer);
  const keys = calculateKeys(header);
  const { board, warnings: pieceWarnings } = parsePiecePositions(header, keys);
  const fenInitial = boardToFen(board);
  const pieceCounts = countPieces(board);

  const rawMoveData = buffer.slice(1024);
  const moveData = decryptMoveBlock(rawMoveData, keys, header.version);
  const { moves, warnings: moveWarnings, fileLevelComment } = parseMoves(moveData, header, keys, board);

  const annotations = moves.filter(m => m.comment).map(m => ({ step_order: m.step_order, text: m.comment }));

  return {
    file: filePath,
    version_hex: '0x' + header.version.toString(16).padStart(2, '0'),
    title_raw: header.title.text,
    match_name: header.matchName.text,
    red_player: header.redPlayer.text,
    blk_player: header.blkPlayer.text,
    file_level_comment: fileLevelComment,
    who_play: header.whoPlay,
    type: header.type,
    fen_initial: fenInitial,
    piece_counts: pieceCounts,
    move_count: moves.length,
    moves,
    annotations,
    decode_warnings: [...pieceWarnings, ...moveWarnings],
  };
}

function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Usage: node decode.js <file.xqf> [--json] [--full]');
    process.exit(1);
  }
  const filePath = args[0];
  const asJson = args.includes('--json');
  const full = args.includes('--full');

  try {
    const result = decodeFile(filePath);
    if (asJson) {
      console.log(JSON.stringify(full ? result : { ...result, moves: result.moves.length + ' moves (use --full to list)' }, null, 2));
    } else {
      console.log(`File: ${path.basename(filePath)}`);
      console.log(`Version: ${result.version_hex}`);
      console.log(`Title: ${result.title_raw}`);
      console.log(`Match: ${result.match_name} | Red: ${result.red_player} | Black: ${result.blk_player}`);
      console.log(`File-level comment: ${result.file_level_comment ? result.file_level_comment.slice(0, 200) : '(none)'}`);
      console.log(`Piece counts:`, result.piece_counts);
      console.log(`FEN initial: ${result.fen_initial}`);
      console.log(`Move count: ${result.move_count}`);
      console.log(`Annotations found: ${result.annotations.length}`);
      if (result.annotations.length) {
        console.log('First annotation sample:', JSON.stringify(result.annotations[0]).slice(0, 300));
      }
      console.log(`Warnings: ${result.decode_warnings.length}`);
      result.decode_warnings.slice(0, 10).forEach(w => console.log('  - ' + w));
      if (full) {
        console.log('Moves:', result.moves.map(m => `${m.from}->${m.to}`).join(', '));
      }
    }
  } catch (err) {
    console.error(`ERROR decoding ${filePath}: ${err.message}`);
    process.exit(2);
  }
}

if (require.main === module) {
  main();
}

module.exports = { decodeFile, parseHeader, calculateKeys, boardToFen };
