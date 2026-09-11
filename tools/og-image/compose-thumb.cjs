'use strict';

const { renderBoardStatic, BOARD_W, BOARD_H } = require('./render-board.cjs');

const SIZE = 320; // vuông, @2x cho ảnh 48px hiển thị trên site
const BG = '#f4efe4';

/** Ảnh vuông CHỈ bàn cờ (không chữ) — dùng làm thumbnail trong danh sách bài/chuỗi. */
function composeThumb(job) {
  const board = renderBoardStatic(job.fen, job.last);
  const pad = 14;
  const avail = SIZE - pad * 2;
  const scale = Math.min(avail / BOARD_W, avail / BOARD_H);
  const w = BOARD_W * scale, h = BOARD_H * scale;
  const x = (SIZE - w) / 2, y = (SIZE - h) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="${BG}"/>
  <g transform="translate(${x},${y}) scale(${scale})">${board}</g>
</svg>`;
}

module.exports = { composeThumb, SIZE };
