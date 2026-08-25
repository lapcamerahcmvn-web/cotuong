#!/usr/bin/env node
/**
 * PGN cờ tướng (biến thể Trung Quốc, GBK) → JSON: FEN mở + nước đi main line (có ký hiệu VN +
 * FEN từng bước) + các BIẾN (variations trong ngoặc). Dùng cho "Lớp Sát Chiêu Thực Dụng".
 *
 * Ký hiệu Hán tự: Đỏ dùng số Hán 一二三…; Đen dùng số Ả-rập toàn角 ０１２…. Quy đổi cột theo bên
 * (Đỏ file=9-x, Đen file=x+1). Verb 进=tiến, 退=thoái, 平=bình; 前/后 = trước/sau khi trùng cột.
 * Notation VN sinh lại từ toạ độ (moveNotationVi) để đồng nhất với bài XQF.
 */
const fs = require('fs');
const iconv = require('iconv-lite');

// ---- helpers bàn cờ (char array 90, rank 0 = trên/đen) ----
function fenToBoard(fen) {
  const board = new Array(90).fill(null);
  const rows = fen.split(/\s+/)[0].split('/');
  for (let rank = 0; rank < rows.length && rank < 10; rank++) {
    let file = 0;
    for (const ch of rows[rank]) {
      if (ch >= '1' && ch <= '9') file += +ch;
      else { board[rank * 9 + file] = ch; file++; }
    }
  }
  return board;
}
function boardToFen(board) {
  let fen = '';
  for (let rank = 0; rank < 10; rank++) {
    let empty = 0, rs = '';
    for (let file = 0; file < 9; file++) {
      const c = board[rank * 9 + file];
      if (!c) empty++; else { if (empty) { rs += empty; empty = 0; } rs += c; }
    }
    if (empty) rs += empty;
    fen += (rank ? '/' : '') + rs;
  }
  return fen;
}
function applyMove(board, from, to) { const n = board.slice(); n[to] = n[from]; n[from] = null; return n; }
const toIccs = idx => String.fromCharCode(97 + (idx % 9)) + (9 - ((idx / 9) | 0));

// Bên `red` (true=Đỏ) có đang chiếu Tướng đối phương trong `board` không?
function givesCheck(board, red) {
  const kEnemy = red ? 'k' : 'K';
  let ki = -1; for (let i = 0; i < 90; i++) if (board[i] === kEnemy) { ki = i; break; }
  if (ki < 0) return false;
  const kr = (ki / 9) | 0, kc = ki % 9;
  const mine = c => c && (red ? c === c.toUpperCase() : c === c.toLowerCase());
  const is = (c, t) => c && c.toUpperCase() === t;
  // Xe + Pháo theo 4 hướng
  const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [dr, dc] of dirs) {
    let r = kr + dr, c = kc + dc, screen = 0;
    while (r >= 0 && r < 10 && c >= 0 && c < 9) {
      const p = board[r * 9 + c];
      if (p) {
        if (screen === 0) { if (mine(p) && is(p, 'R')) return true; if (mine(p) && is(p, 'K')) return true; screen = 1; }
        else { if (mine(p) && is(p, 'C')) return true; break; }
      }
      r += dr; c += dc;
    }
  }
  // Mã (kiểm tra chân Mã): Mã địch ở 8 vị trí, chân kề Tướng phải trống
  const horse = [[-2, -1, -1, 0], [-2, 1, -1, 0], [2, -1, 1, 0], [2, 1, 1, 0], [-1, -2, 0, -1], [1, -2, 0, -1], [-1, 2, 0, 1], [1, 2, 0, 1]];
  for (const [dr, dc, lr, lc] of horse) {
    const r = kr + dr, c = kc + dc;
    if (r < 0 || r > 9 || c < 0 || c > 8) continue;
    const p = board[r * 9 + c];
    if (mine(p) && is(p, 'N') && !board[(kr + lr) * 9 + (kc + lc)]) return true;
  }
  // Tốt: Đỏ tấn công lên (rank giảm) → Tốt ở (kr+1,kc); qua sông thêm 2 bên cùng hàng
  if (red) { if (is(board[(kr + 1) * 9 + kc], 'P') && board[(kr + 1) * 9 + kc] === 'P') return true; }
  else { if (board[(kr - 1) * 9 + kc] === 'p') return true; }
  for (const dc of [-1, 1]) { const c = kc + dc; if (c < 0 || c > 8) continue; const p = board[kr * 9 + c]; if (mine(p) && is(p, 'P')) return true; }
  return false;
}

// ---- ký hiệu VN (giống decode.js) ----
const PIECE_VI = { R:'Xe',N:'Mã',B:'Tượng',A:'Sĩ',K:'Tướng',C:'Pháo',P:'Tốt', r:'Xe',n:'Mã',b:'Tượng',a:'Sĩ',k:'Tướng',c:'Pháo',p:'Tốt' };
const STRAIGHT = 'RCPKrcpk';
const fileVi = (x, red) => red ? (9 - x) : (x + 1);
function moveNotationVi(board, from, to) {
  const piece = board[from]; if (!piece) return null;
  const name = PIECE_VI[piece]; const red = piece === piece.toUpperCase();
  const fx = from % 9, fr = (from / 9) | 0, tx = to % 9, tr = (to / 9) | 0;
  const mates = [];
  for (let r = 0; r < 10; r++) if (board[r * 9 + fx] === piece) mates.push(r);
  let col;
  if (mates.length >= 2) { mates.sort((a, b) => a - b); const front = red ? mates[0] : mates[mates.length - 1]; col = (fr === front) ? 'trước' : 'sau'; }
  else col = String(fileVi(fx, red));
  let verb, target;
  if (fr === tr) { verb = 'bình'; target = String(fileVi(tx, red)); }
  else { const fwd = red ? (tr < fr) : (tr > fr); verb = fwd ? 'tiến' : 'thoái'; target = STRAIGHT.includes(piece) ? String(Math.abs(tr - fr)) : String(fileVi(tx, red)); }
  return `${name} ${col} ${verb} ${target}`;
}

// ---- ánh xạ Hán tự ----
const PIECE_ZH = { '车':'R','車':'R','马':'N','馬':'N','相':'B','象':'B','仕':'A','士':'A','帅':'K','帥':'K','将':'K','將':'K','炮':'C','砲':'C','兵':'P','卒':'P' };
const NUM_ZH = { '一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9 };   // Đỏ
const NUM_AR = { '０':0,'1':1,'１':1,'２':2,'３':3,'４':4,'５':5,'６':6,'７':7,'８':8,'９':9,'0':0,'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9 }; // Đen (toàn角/ASCII)
const FRONT = '前', REAR = '后';

function numVal(ch) { if (ch in NUM_ZH) return { v: NUM_ZH[ch], red: true }; if (ch in NUM_AR) return { v: NUM_AR[ch], red: false }; return null; }

// Chuyển 1 nước Hán "车二进八" → {from, to} boardIndex trên `board`. Trả null nếu không parse được.
const MID = '中';
function zhMoveToIndices(board, mv) {
  const chars = [...mv.replace(/[\s\r\n]/g, '')];
  if (chars.length < 4) return null;

  // Vị trí quân: có tiền tố 前/后/中 → [marker][quân][verb][target]; không → [quân][file][verb][target].
  const hasMarker = chars[0] === FRONT || chars[0] === REAR || chars[0] === MID;
  const marker = hasMarker ? chars[0] : null;
  const pieceType = PIECE_ZH[hasMarker ? chars[1] : chars[0]]; if (!pieceType) return null;
  const fileCh = hasMarker ? null : chars[1];
  const verb = chars[2], targetCh = chars[3];

  // Xác định màu: quét toàn nước tìm 1 số Hán (đỏ) hoặc Ả-rập (đen).
  let red = null;
  for (const c of chars) { if (c in NUM_ZH) { red = true; break; } if (c in NUM_AR && !(c in NUM_ZH)) { red = false; break; } }
  if (red === null) return null;
  const pieceChar = red ? pieceType.toUpperCase() : pieceType.toLowerCase();

  // Tìm quân nguồn.
  let srcIdx = -1;
  if (marker) {
    const cols = {};
    for (let i = 0; i < 90; i++) if (board[i] === pieceChar) { const x = i % 9; (cols[x] = cols[x] || []).push(i); }
    let group = null;
    for (const x in cols) if (cols[x].length >= 2) { group = cols[x]; break; }
    if (!group) { group = []; for (let i = 0; i < 90; i++) if (board[i] === pieceChar) group.push(i); }
    group.sort((a, b) => a - b); // rank tăng (trên→dưới)
    // trước = gần đối phương: đỏ = rank nhỏ (trên); đen = rank lớn (dưới)
    if (marker === MID) srcIdx = group[(group.length / 2) | 0];
    else srcIdx = marker === FRONT ? (red ? group[0] : group[group.length - 1]) : (red ? group[group.length - 1] : group[0]);
  } else {
    const fn = numVal(fileCh); if (!fn) return null;
    const x = red ? (9 - fn.v) : (fn.v - 1);
    for (let r = 0; r < 10; r++) { const i = r * 9 + x; if (board[i] === pieceChar) { srcIdx = i; break; } }
  }
  if (srcIdx < 0) return null;

  const tn = numVal(targetCh); if (!tn) return null;
  const fx = srcIdx % 9, fr = (srcIdx / 9) | 0;
  let tx = fx, tr = fr;

  if (verb === '平' || verb === '=') {
    tx = red ? (9 - tn.v) : (tn.v - 1); tr = fr;
  } else {
    const fwd = verb === '进' || verb === '進';
    const straight = STRAIGHT.includes(pieceChar);
    if (straight) {
      const steps = tn.v; tx = fx;
      tr = red ? (fwd ? fr - steps : fr + steps) : (fwd ? fr + steps : fr - steps);
    } else {
      tx = red ? (9 - tn.v) : (tn.v - 1);
      const dx = Math.abs(tx - fx);
      let dr;
      if (pieceType === 'A') dr = 1;            // Sĩ: chéo 1
      else if (pieceType === 'B') dr = 2;       // Tượng: chéo 2
      else dr = (dx === 1) ? 2 : 1;             // Mã: L (dx1→dr2, dx2→dr1)
      tr = red ? (fwd ? fr - dr : fr + dr) : (fwd ? fr + dr : fr - dr);
    }
  }
  if (tx < 0 || tx > 8 || tr < 0 || tr > 9) return null;
  return { from: srcIdx, to: tr * 9 + tx };
}

// Tách phần move-text: bỏ header [...], lấy token nước + '(' ')' để tách biến.
function tokenizeMoves(text) {
  // bỏ header + chuẩn hoá khoảng trắng (kể cả \r\n lẫn trong file GBK)
  text = text.replace(/\[[^\]]*\]/g, ' ').replace(/[\r\n\t]/g, ' ');
  const chars = [...text];
  const tokens = [];
  let i = 0;
  const isPiece = c => c in PIECE_ZH, isMarker = c => c === FRONT || c === REAR || c === MID;
  while (i < chars.length) {
    const ch = chars[i];
    if (ch === '{') { // chú thích {…} — thường đặt tên thế sát (马后炮, 双车错杀…)
      let j = i + 1, s = '';
      while (j < chars.length && chars[j] !== '}') { s += chars[j]; j++; }
      tokens.push({ comment: s.replace(/[\s\r\n.]+/g, ' ').trim() }); i = j + 1; continue;
    }
    if (ch === '(' || ch === ')') { tokens.push(ch); i++; continue; }
    if (/\s/.test(ch)) { i++; continue; }
    if (/[0-9]/.test(ch)) { // số thứ tự "12." — nuốt số rồi dấu chấm
      let j = i; while (j < chars.length && /[0-9]/.test(chars[j])) j++;
      if (chars[j] === '.') { i = j + 1; continue; }
    }
    // 1 nước = 4 ký tự: [quân|前/后/中] + … . Bắt đầu bằng quân hoặc marker.
    if (isPiece(ch) || isMarker(ch)) { tokens.push(chars.slice(i, i + 4).join('')); i += 4; continue; }
    i++; // ký tự lạ (*, dấu chấm lẻ…), bỏ
  }
  return tokens;
}

function decodePgn(filePath) {
  const raw = fs.readFileSync(filePath);
  const text = iconv.decode(raw, 'gbk');
  const fenM = text.match(/\[FEN\s+"([^"]+)"/);
  if (!fenM) return { error: 'Không có FEN header' };
  const fenInitial = fenM[1].trim().split(/\s+/).slice(0, 1)[0]; // chỉ lấy phần bố cục
  const sideM = fenM[1].trim().split(/\s+/)[1];
  const redFirst = sideM !== 'b';

  const tokens = tokenizeMoves(text);

  const warnings = [];
  // Duyệt đệ quy: main line + biến (ngoặc). Biến bắt đầu = thay thế nước VỪA đi (branch từ vị trí trước nó).
  let pos = 0;
  function walk(board, redToMove, parentBefore) {
    // parentBefore: {board, red} trạng thái TRƯỚC nước gần nhất (để biến thay thế)
    const line = [];
    let curBoard = board, curRed = redToMove;
    let lastBefore = { board: curBoard, red: curRed };
    let pendingComment = null;
    while (pos < tokens.length) {
      const t = tokens[pos];
      if (t && typeof t === 'object' && 'comment' in t) { // chú thích: gắn vào nước vừa đi (hoặc chờ nếu ở đầu)
        if (t.comment) { if (line.length) line[line.length - 1].comment = ((line[line.length - 1].comment || '') + ' ' + t.comment).trim(); else pendingComment = t.comment; }
        pos++; continue;
      }
      if (t === ')') { pos++; break; }
      if (t === '(') {
        pos++;
        // biến: thay thế nước vừa đi → nhánh từ lastBefore
        const varLine = walk(lastBefore.board, lastBefore.red, null);
        if (line.length) (line[line.length - 1].variations = line[line.length - 1].variations || []).push(varLine);
        continue;
      }
      // là 1 nước
      const mi = zhMoveToIndices(curBoard, t);
      if (!mi) { warnings.push('không parse được nước: ' + t); pos++; continue; }
      const wxf = moveNotationVi(curBoard, mi.from, mi.to);
      const captured = curBoard[mi.to];
      const beforeBoard = curBoard;
      const nb = applyMove(curBoard, mi.from, mi.to);
      const step = {
        zh: t, wxf_vi: wxf, iccs: toIccs(mi.from) + toIccs(mi.to), side: curRed ? 'do' : 'den',
        moved_piece: beforeBoard[mi.from], captured_piece: captured,
        gives_check: givesCheck(nb, curRed),
        fen_after: boardToFen(nb),
      };
      if (pendingComment) { step.comment = pendingComment; pendingComment = null; }
      line.push(step);
      lastBefore = { board: beforeBoard, red: curRed };
      curBoard = nb; curRed = !curRed;
      pos++;
    }
    return line;
  }

  const board0 = fenToBoard(fenInitial);
  const main = walk(board0, redFirst, null);

  // gán step_order cho main line
  main.forEach((s, i) => { s.step_order = i + 1; });

  return {
    file: filePath,
    fen_initial: fenInitial,
    who_play: redFirst ? 0 : 1,
    move_count: main.length,
    variation_count: main.reduce((n, s) => n + (s.variations ? s.variations.length : 0), 0),
    moves: main,
    decode_warnings: warnings,
  };
}

if (require.main === module) {
  const file = process.argv[2];
  const full = process.argv.includes('--full');
  if (!file) { console.error('Usage: node decode-pgn.js <file.pgn> [--json] [--full]'); process.exit(1); }
  const r = decodePgn(file);
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(full ? r : { ...r, moves: r.moves ? r.moves.length + ' moves' : r.error }, null, 2));
  } else {
    console.log('FEN:', r.fen_initial, '| moves:', r.move_count, '| variations:', r.variation_count);
    (r.moves || []).forEach(s => console.log(`  ${s.step_order}. [${s.zh}] ${s.wxf_vi}` + (s.variations ? '  (+' + s.variations.length + ' biến)' : '')));
    if (r.decode_warnings && r.decode_warnings.length) console.log('warnings:', r.decode_warnings.slice(0, 5));
  }
}

module.exports = { decodePgn };
