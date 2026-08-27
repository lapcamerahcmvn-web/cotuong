/* tools/mate-book/gen.js — Sinh bài sát pháp (variation_tree + steps) từ FEN + chuỗi nước ký
   hiệu La-tinh của sách "Tượng Kỳ Kinh Điển Sát Pháp Đại Toàn".
   Engine (loadFen/toFen/legalMove/notation/tree) chép từ public/js/board-editor.js (đã test).
   Parser ký hiệu phỏng theo tools/pgn-decoder/decode-pgn.js zhMoveToIndices, nhưng màu do LƯỢT
   quyết định (sách dùng cùng ký hiệu cho 2 bên) nên caller truyền `red`.
   Chạy `node gen.js --test` để tự kiểm parser + tree. */
'use strict';

// ---------- ENGINE (thuần, board là mảng 90; rank0 = trên) ----------
var PIECE_VI = { R: 'Xe', N: 'Mã', B: 'Tượng', A: 'Sĩ', K: 'Tướng', C: 'Pháo', P: 'Tốt' };
var STRAIGHT = 'RCPKrcpk';
function loadFen(fen) {
  var b = new Array(90).fill(null), rows = (fen || '').split(' ')[0].split('/');
  for (var r = 0; r < 10; r++) { var f = 0, row = rows[r] || ''; for (var i = 0; i < row.length; i++) { var ch = row[i]; if (ch >= '1' && ch <= '9') f += +ch; else { b[r * 9 + f] = ch; f++; } } }
  return b;
}
function toFen(b) { var fen = ''; for (var r = 0; r < 10; r++) { var e = 0, rs = ''; for (var c = 0; c < 9; c++) { var p = b[r * 9 + c]; if (!p) e++; else { if (e) { rs += e; e = 0; } rs += p; } } if (e) rs += e; fen += (r ? '/' : '') + rs; } return fen; }
function toIccs(i) { return String.fromCharCode(97 + (i % 9)) + (9 - Math.floor(i / 9)); }
function fileVi(x, red) { return red ? 9 - x : x + 1; }
function isRed(ch) { return (ch === 'X') || (ch !== 'x' && ch === ch.toUpperCase()); }
function sameSide(a, b) { return isRed(a) === isRed(b); }
function moveByType(t, red, b, from, to) {
  var fr = (from / 9) | 0, fc = from % 9, tr = (to / 9) | 0, tc = to % 9, dr = tr - fr, dc = tc - fc, adr = Math.abs(dr), adc = Math.abs(dc);
  function between() { var n = 0, s; if (dr === 0) { s = fc < tc ? 1 : -1; for (var c = fc + s; c !== tc; c += s) if (b[fr * 9 + c]) n++; return n; } if (dc === 0) { s = fr < tr ? 1 : -1; for (var r = fr + s; r !== tr; r += s) if (b[r * 9 + fc]) n++; return n; } return -1; }
  if (t === 'R') { if (dr !== 0 && dc !== 0) return false; return between() === 0; }
  if (t === 'C') { if (dr !== 0 && dc !== 0) return false; var n = between(); return b[to] ? n === 1 : n === 0; }
  if (t === 'N') { if (!((adr === 1 && adc === 2) || (adr === 2 && adc === 1))) return false; var lr = fr + (adr === 2 ? dr / 2 : 0), lc = fc + (adc === 2 ? dc / 2 : 0); return !b[lr * 9 + lc]; }
  if (t === 'B') { if (adr !== 2 || adc !== 2) return false; if (b[(fr + dr / 2) * 9 + (fc + dc / 2)]) return false; return red ? (tr >= 5) : (tr <= 4); }
  if (t === 'A') { if (adr !== 1 || adc !== 1) return false; if (tc < 3 || tc > 5) return false; return red ? (tr >= 7 && tr <= 9) : (tr >= 0 && tr <= 2); }
  if (t === 'K') { var tg = b[to]; if (tg && tg.toUpperCase() === 'K' && dc === 0) return between() === 0; if (adr + adc !== 1) return false; if (tc < 3 || tc > 5) return false; return red ? (tr >= 7 && tr <= 9) : (tr >= 0 && tr <= 2); }
  if (t === 'P') { if (red) { if (dr === -1 && dc === 0) return true; if (fr <= 4 && dr === 0 && adc === 1) return true; return false; } if (dr === 1 && dc === 0) return true; if (fr >= 5 && dr === 0 && adc === 1) return true; return false; }
  return true;
}
function legalMove(b, from, to) {
  var p = b[from]; if (!p || from === to) return false;
  var tgt = b[to]; if (tgt && sameSide(tgt, p)) return false;
  return moveByType(p.toUpperCase(), isRed(p), b, from, to);
}
function notation(b, from, to) {
  var piece = b[from]; if (!piece) return '';
  var name = PIECE_VI[piece.toUpperCase()] || '', red = piece === piece.toUpperCase();
  var fx = from % 9, fr = (from / 9) | 0, tx = to % 9, tr = (to / 9) | 0, mates = [];
  for (var r = 0; r < 10; r++) if (b[r * 9 + fx] === piece) mates.push(r);
  var col;
  if (mates.length >= 2) { mates.sort(function (a, b) { return a - b; }); var front = red ? mates[0] : mates[mates.length - 1]; col = (fr === front) ? 'trước' : 'sau'; }
  else col = '' + fileVi(fx, red);
  var verb, target;
  if (fr === tr) { verb = 'bình'; target = '' + fileVi(tx, red); }
  else { var fwd = red ? (tr < fr) : (tr > fr); verb = fwd ? 'tiến' : 'thoái'; target = STRAIGHT.indexOf(piece) >= 0 ? '' + Math.abs(tr - fr) : '' + fileVi(tx, red); }
  return name + ' ' + col + ' ' + verb + ' ' + target;
}
function sideOf(p) { return (p === p.toUpperCase()) ? 'do' : 'den'; }

// ---------- PARSER ký hiệu La-tinh sách ----------
// token: [piece][ t|s (trước/sau) | file-digit ][ . | / | - (tiến/thoái/bình) ][ target-digit ]
// piece: Tg=K, X=R, M=N, P=C, S=A, B=P(Tốt), V/T=B(Tượng). red do caller truyền (theo lượt).
var PIECE_MAP = { X: 'R', M: 'N', P: 'C', S: 'A', B: 'P', V: 'B', T: 'B' };
function parseMove(board, tok, red) {
  tok = String(tok).replace(/\s/g, '');
  var piece, rest;
  if (tok.slice(0, 2) === 'Tg') { piece = 'K'; rest = tok.slice(2); }
  else { piece = PIECE_MAP[tok[0]]; if (!piece) return null; rest = tok.slice(1); }
  var marker = null, fileCh = null;
  if (rest[0] === 't' || rest[0] === 's') { marker = rest[0] === 't' ? 'front' : 'rear'; rest = rest.slice(1); }
  else { fileCh = rest[0]; rest = rest.slice(1); }
  var verb = rest[0], targetCh = rest[1];
  var isBinh = (verb === '-' || verb === '平' || verb === '=');
  var isTien = (verb === '.' || verb === '进' || verb === '進');
  var pieceChar = red ? piece : piece.toLowerCase();

  var srcIdx = -1;
  if (marker) {
    var cols = {};
    for (var i = 0; i < 90; i++) if (board[i] === pieceChar) { var x = i % 9; (cols[x] = cols[x] || []).push(i); }
    var group = null;
    for (var xk in cols) if (cols[xk].length >= 2) { group = cols[xk]; break; }
    if (!group) { group = []; for (var j = 0; j < 90; j++) if (board[j] === pieceChar) group.push(j); }
    group.sort(function (a, b) { return a - b; });
    srcIdx = marker === 'front' ? (red ? group[0] : group[group.length - 1]) : (red ? group[group.length - 1] : group[0]);
  } else {
    var fnum = +fileCh; if (!fnum) return null;
    var fx = red ? (9 - fnum) : (fnum - 1);
    for (var r2 = 0; r2 < 10; r2++) { var idx = r2 * 9 + fx; if (board[idx] === pieceChar) { srcIdx = idx; break; } }
  }
  if (srcIdx < 0) return null;

  var tnum = +targetCh; if (isNaN(tnum)) return null;
  var sfx = srcIdx % 9, sfr = (srcIdx / 9) | 0, tx = sfx, tr = sfr;
  if (isBinh) { tx = red ? (9 - tnum) : (tnum - 1); tr = sfr; }
  else {
    var straight = 'RCPK'.indexOf(piece) >= 0;
    if (straight) { tx = sfx; tr = red ? (isTien ? sfr - tnum : sfr + tnum) : (isTien ? sfr + tnum : sfr - tnum); }
    else {
      tx = red ? (9 - tnum) : (tnum - 1);
      var dx = Math.abs(tx - sfx), dr = piece === 'A' ? 1 : piece === 'B' ? 2 : (dx === 1 ? 2 : 1);
      tr = red ? (isTien ? sfr - dr : sfr + dr) : (isTien ? sfr + dr : sfr - dr);
    }
  }
  if (tx < 0 || tx > 8 || tr < 0 || tr > 9) return null;
  return { from: srcIdx, to: tr * 9 + tx };
}

// ---------- BUILDER cây biến ----------
function makeBuilder(startFen, firstSide) {
  var root = { children: [], parent: null, depth: 0, board: loadFen(startFen) };
  var warnings = [];
  function sideAtPly(ply) { return (ply % 2 === 1) ? firstSide : (firstSide === 'do' ? 'den' : 'do'); }
  // đi 1 nước từ node `cur`, trả node mới (hoặc null nếu lỗi — đã ghi warning)
  function step(cur, tok, ply, cap) {
    var red = sideAtPly(ply) === 'do';
    var mv = parseMove(cur.board, tok, red);
    if (!mv) { warnings.push('Không parse được nước "' + tok + '" (ply ' + ply + ')'); return null; }
    if (!legalMove(cur.board, mv.from, mv.to)) { warnings.push('Nước phạm luật "' + tok + '" ' + toIccs(mv.from) + toIccs(mv.to) + ' (ply ' + ply + ') — FEN có thể sai'); return null; }
    var nb = cur.board.slice(), moved = nb[mv.from];
    var wxf = notation(nb, mv.from, mv.to);
    nb[mv.to] = moved; nb[mv.from] = null;
    // gộp nếu đã có con trùng
    for (var k = 0; k < cur.children.length; k++) { var c = cur.children[k]; if (c.from === mv.from && c.to === mv.to) return c; }
    var node = { from: mv.from, to: mv.to, reveal: null, side: sideOf(moved), wxf: wxf, iccs: toIccs(mv.from) + toIccs(mv.to), caption: cap || '', depth: cur.depth + 1, board: nb, children: [], parent: cur };
    cur.children.push(node);
    return node;
  }
  // đi mạch chính
  function line(cur, tokens, captions, startPly) {
    var node = cur;
    for (var i = 0; i < tokens.length; i++) {
      var ply = startPly + i;
      node = step(node, tokens[i], ply, captions ? captions[ply] : '');
      if (!node) break;
    }
    return node;
  }
  return {
    root: root,
    build: function (input) {
      // input: { main:[tok], captions:{ply:txt}, variations:[{after_ply, moves:[tok], captions:{}}] }
      line(root, input.main, input.captions || {}, 1);
      (input.variations || []).forEach(function (v) {
        // điều hướng tới node sau `after_ply` nước của mạch chính
        var cur = root; for (var p = 0; p < v.after_ply && cur.children.length; p++) cur = cur.children[0];
        line(cur, v.moves, v.captions || {}, v.after_ply + 1);
      });
      return this.result();
    },
    result: function () {
      function ser(node) { return node.children.map(function (c) { return { from: c.from, to: c.to, iccs: c.iccs, wxf: c.wxf, side: c.side, reveal: null, fen: toFen(c.board), caption: c.caption || '', children: ser(c) }; }); }
      var out = [], n = root; while (n && n.children.length) { n = n.children[0]; out.push({ fen: toFen(n.board), iccs: n.iccs, wxf: n.wxf, side: n.side, caption: n.caption || '' }); }
      return { initial_fen: toFen(root.board), variation_tree: ser(root), mainline: out, warnings: warnings };
    }
  };
}

module.exports = { loadFen, toFen, toIccs, legalMove, notation, parseMove, makeBuilder };

// ---------- SELF-TEST ----------
if (require.main === module && process.argv[2] === '--test') {
  var pass = 0, fail = 0;
  function t(d, g, e) { if (JSON.stringify(g) === JSON.stringify(e)) pass++; else { fail++; console.log('FAIL ' + d + ': got ' + JSON.stringify(g) + ' exp ' + JSON.stringify(e)); } }
  var START = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';
  var b = loadFen(START);
  // Pháo 2 bình 5 (đỏ): P file2 bình 5 → "P2-5"; đỏ cannon phải ở (7,7) index70 → (7,4) index67
  t('P2-5 = c70-c67', parseMove(b, 'P2-5', true), { from: 70, to: 67 });
  // Mã 2 tiến 3 (đỏ): "M2.3" → knight (9,7)=88 → (7,6)=69
  t('M2.3 = 88-69', parseMove(b, 'M2.3', true), { from: 88, to: 69 });
  // Đen: Mã 8 tiến 7 "M8.7" → (0,7)=7 → (2,6)=24
  t('den M8.7 = 7-24', parseMove(b, 'M8.7', false), { from: 7, to: 24 });
  // Đen: Pháo 8 bình 5 "P8-5" → (2,7)=25 → (2,4)=22
  t('den P8-5 = 25-22', parseMove(b, 'P8-5', false), { from: 25, to: 22 });
  // Tốt: đỏ B3 tiến 1 "B3.1": red pawn file3 = board col6, at (6,6)=60 → (5,6)=51
  t('B3.1 = 60-51', parseMove(b, 'B3.1', true), { from: 60, to: 51 });
  // Builder: mạch chính 2 nước + 1 biến ở nước 1
  var bd = makeBuilder(START, 'do');
  var r = bd.build({ main: ['P2-5', 'M8.7'], captions: { 1: 'Pháo đầu', 2: 'Bình phong mã' }, variations: [{ after_ply: 1, moves: ['P8-5'], captions: { 2: 'Đối pháo' } }] });
  t('mainline 2 nước', r.mainline.length, 2);
  t('mainline[0] wxf', r.mainline[0].wxf, 'Pháo 2 bình 5');
  t('gốc có 1 nhánh, nước1 có 2 con (biến)', r.variation_tree[0].children.length, 2);
  t('không warning', r.warnings.length, 0);
  console.log('\nPASS ' + pass + ' | FAIL ' + fail);
  process.exit(fail ? 1 : 0);
}
