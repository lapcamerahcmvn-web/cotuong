'use strict';

/**
 * Port THUẦN của renderBoard() trong public/js/board.js — không phụ thuộc DOM, màu ghi
 * CỨNG bằng hex (resvg KHÔNG resolve var(--xq-*)).
 *
 * ⚠️ GIỮ ĐỒNG BỘ với public/js/board.js::renderBoard (hình học M/CW/CH, cách vẽ quân).
 * Chỉ dựng thế cờ tĩnh: bàn + quân + tô sáng nước cuối. Không mũi tên / không cờ úp chip đặc biệt
 * (quân úp X/x vẫn vẽ dạng chip).
 */

var C = {
  wood: '#e9cf9c', line: '#7c5a2c', disc: '#f6ecd6',
  red: '#c0392b', black: '#24333f', hl: 'rgba(200,69,31,.30)',
};
var PIECE_FONT = 'XiangqiKai, KaiTi, serif';

var PIECES = {
  K: { c: '帥', red: true }, A: { c: '仕', red: true }, B: { c: '相', red: true },
  N: { c: '馬', red: true }, R: { c: '俥', red: true }, C: { c: '炮', red: true }, P: { c: '兵', red: true },
  k: { c: '將' }, a: { c: '士' }, b: { c: '象' }, n: { c: '馬' }, r: { c: '車' }, c: { c: '砲' }, p: { c: '卒' },
  X: { up: true, red: true }, x: { up: true },
};

function fenToBoard(fen) {
  var board = new Array(90).fill(null);
  var rows = (fen || '').split(' ')[0].split('/');
  for (var rank = 0; rank < rows.length && rank < 10; rank++) {
    var file = 0, row = rows[rank];
    for (var i = 0; i < row.length; i++) {
      var ch = row[i];
      if (ch >= '1' && ch <= '9') file += +ch;
      else { board[rank * 9 + file] = ch; file++; }
    }
  }
  return board;
}

function iccsToSquares(iccs) {
  if (!iccs || iccs.length < 4) return null;
  function sq(a, b) {
    return [a.charCodeAt(0) - 97, 9 - (b.charCodeAt(0) - 48)];
  }
  return { from: sq(iccs[0], iccs[1]), to: sq(iccs[2], iccs[3]) };
}

var M = 26, CW = 52, CH = 52;
var W = M * 2 + CW * 8, H = M * 2 + CH * 9;

function line(x1, y1, x2, y2) {
  return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="' + C.line + '" stroke-width="1.4"/>';
}

/** Trả về chuỗi <svg> vẽ thế cờ (viewBox 0 0 W H). */
function renderBoardStatic(fen, lastMove) {
  function X(f) { return M + f * CW; }
  function Y(r) { return M + r * CH; }
  var board = fenToBoard(fen);
  var s = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '">';
  s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" rx="10" fill="' + C.wood + '"/>';
  for (var r = 0; r < 10; r++) s += line(X(0), Y(r), X(8), Y(r));
  for (var f = 0; f < 9; f++) {
    if (f === 0 || f === 8) s += line(X(f), Y(0), X(f), Y(9));
    else { s += line(X(f), Y(0), X(f), Y(4)); s += line(X(f), Y(5), X(f), Y(9)); }
  }
  s += line(X(3), Y(0), X(5), Y(2)) + line(X(5), Y(0), X(3), Y(2));
  s += line(X(3), Y(7), X(5), Y(9)) + line(X(5), Y(7), X(3), Y(9));
  var midY = (Y(4) + Y(5)) / 2 + 6;
  s += '<text x="' + X(2) + '" y="' + midY + '" font-size="20" fill="' + C.line + '" opacity="0.5" font-family="' + PIECE_FONT + '" letter-spacing="6" text-anchor="middle">楚河</text>';
  s += '<text x="' + X(6) + '" y="' + midY + '" font-size="20" fill="' + C.line + '" opacity="0.5" font-family="' + PIECE_FONT + '" letter-spacing="6" text-anchor="middle">漢界</text>';
  if (lastMove) {
    [lastMove.from, lastMove.to].forEach(function (sq) {
      if (sq) s += '<circle cx="' + X(sq[0]) + '" cy="' + Y(sq[1]) + '" r="22" fill="' + C.hl + '"/>';
    });
  }
  for (var i = 0; i < 90; i++) {
    var chr = board[i]; if (!chr) continue;
    var p = PIECES[chr]; if (!p) continue;
    var cx = X(i % 9), cy = Y(Math.floor(i / 9));
    var col = p.red ? C.red : C.black;
    if (p.up) {
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="' + col + '"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="16.5" fill="none" stroke="' + C.disc + '" stroke-width="1.5" opacity="0.85"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="9" fill="none" stroke="' + C.disc + '" stroke-width="1.5" opacity="0.6"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="2.6" fill="' + C.disc + '" opacity="0.9"/>';
      continue;
    }
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="' + C.disc + '" stroke="' + col + '" stroke-width="2"/>';
    s += '<circle cx="' + cx + '" cy="' + cy + '" r="17" fill="none" stroke="' + col + '" stroke-width="1" opacity="0.35"/>';
    s += '<text x="' + cx + '" y="' + (cy + 8) + '" text-anchor="middle" font-size="24" font-family="' + PIECE_FONT + '" fill="' + col + '">' + p.c + '</text>';
  }
  s += '</svg>';
  return s;
}

/** Đi hết mạch chính của variation_tree (con đầu) → FEN node cuối. */
function treeFinalFen(tree, initialFen) {
  var fen = initialFen, node = tree && tree.length ? tree[0] : null;
  while (node) {
    if (node.fen) fen = node.fen;
    node = node.children && node.children.length ? node.children[0] : null;
  }
  return fen;
}

/** iccs của nước cuối trong mạch chính (để tô sáng). */
function treeFinalIccs(tree) {
  var iccs = null, node = tree && tree.length ? tree[0] : null;
  while (node) { if (node.iccs) iccs = node.iccs; node = node.children && node.children.length ? node.children[0] : null; }
  return iccs;
}

module.exports = { renderBoardStatic, iccsToSquares, treeFinalFen, treeFinalIccs, BOARD_W: W, BOARD_H: H };
