'use strict';

const { renderBoardStatic, BOARD_W, BOARD_H } = require('./render-board.cjs');

const OG_W = 1200, OG_H = 630;
const BG = '#f4efe4', WOOD_EDGE = '#dcb97e', INK = '#211d17', INK_SOFT = '#5c5446', INK_FAINT = '#9c9384', RED = '#c8451f';

const PHASE_LABEL = {
  'nhap-mon': 'Nhập môn', 'khai-cuoc': 'Khai cuộc', 'trung-cuoc': 'Trung cuộc',
  'tan-cuoc': 'Tàn cuộc',
};

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

// Bọc chữ theo số ký tự ước lượng (không có font-metrics chính xác trong Node, đủ dùng cho OG).
function wrapByChars(text, maxChars, maxLines) {
  const words = String(text).trim().split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    const t = cur ? cur + ' ' + w : w;
    if (t.length > maxChars && cur) { lines.push(cur); cur = w; }
    else cur = t;
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/.{1}$/, '') + '…';
  }
  return lines;
}

/** Ghép 1 SVG 1200×630: nền giấy dó + bàn cờ trái + brand/tiêu đề/meta phải. */
function compose(job) {
  const board = renderBoardStatic(job.fen, job.last);

  // Bàn cờ: cao 476px, giữ tỉ lệ, đặt lệch trái.
  const bh = 476;
  const bw = Math.round((BOARD_W / BOARD_H) * bh);
  const bx = 46, by = Math.round((OG_H - bh) / 2);

  const rightX = bx + bw + 60;
  const rightW = OG_W - rightX - 64;

  const phaseLabel = job.gameMode === 'co-up' ? 'Cờ úp' : (PHASE_LABEL[job.phase] || 'Bài học');
  const metaRight = job.moveCountLabel || (job.moveCount ? job.moveCount + ' nước đi' : '');

  const titleSize = job.title.length > 44 ? 39 : 45;
  const lineH = titleSize + 13;
  const titleLines = wrapByChars(job.title, Math.floor(rightW / (titleSize * 0.53)), 3);
  const titleTop = 200;
  const titleTspans = titleLines
    .map((ln, i) => `<tspan x="${rightX}" dy="${i === 0 ? 0 : lineH}">${esc(ln)}</tspan>`)
    .join('');

  const kicker = job.kind === 'series' ? 'CHƯƠNG TRÌNH' : phaseLabel.toUpperCase();
  const metaLine = [kicker, metaRight].filter(Boolean).join('  ·  ');
  const metaY = titleTop + (titleLines.length - 1) * lineH + 62;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">
  <rect width="${OG_W}" height="${OG_H}" fill="${BG}"/>
  <g transform="translate(${bx},${by})">
    <rect x="-14" y="-14" width="${bw + 28}" height="${bh + 28}" rx="18" fill="#00000010"/>
    <g transform="scale(${bw / BOARD_W})">${board}</g>
  </g>
  <rect x="${bx + bw + 22}" y="${by}" width="5" height="${bh}" rx="2" fill="${WOOD_EDGE}"/>

  <text x="${rightX}" y="86" font-family="Segoe UI, Arial, sans-serif" font-size="21" font-weight="700" letter-spacing="2" fill="${RED}">HỌC CỜ TƯỚNG</text>
  <rect x="${rightX}" y="100" width="54" height="3" fill="${RED}"/>

  <text y="${titleTop}" font-family="Segoe UI, Arial, sans-serif" font-size="${titleSize}" font-weight="800" fill="${INK}">${titleTspans}</text>

  <text x="${rightX}" y="${metaY}" font-family="Segoe UI, Arial, sans-serif" font-size="18" font-weight="600" letter-spacing="0.5" fill="${INK_SOFT}">${esc(metaLine)}</text>

  <text x="${rightX}" y="${OG_H - 46}" font-family="Segoe UI, Arial, sans-serif" font-size="20" fill="${INK_FAINT}">hoccotuong.top</text>
</svg>`;
}

module.exports = { compose, OG_W, OG_H };
