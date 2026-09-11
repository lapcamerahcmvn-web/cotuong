'use strict';

/**
 * Sinh ảnh OG/preview thế cờ cho từng bài học + chuỗi.
 *
 *   node tools/og-image/generate.cjs                 # sinh toàn bộ
 *   node tools/og-image/generate.cjs --only=<slug>   # 1 bài/chuỗi
 *   node tools/og-image/generate.cjs --changed       # chỉ bài mất/mới so với PNG hiện có
 *
 * CHỈ CHẠY LOCAL. Kết quả public/og/lessons/*.png + public/og/series/*.png được COMMIT vào git;
 * hosting phục vụ tĩnh, KHÔNG cần @resvg.
 *
 * SAU khi chạy xong, nén ảnh cho nhẹ git:  python tools/og-image/optimize.py
 *
 * ⚠️ render-board.cjs phải GIỮ ĐỒNG BỘ với public/js/board.js::renderBoard.
 */

const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');
const { buildJobs } = require('./manifest.cjs');
const { compose, OG_W } = require('./compose.cjs');

const ROOT = path.resolve(__dirname, '../..');
const CONTENT = path.join(ROOT, 'database/seeders/data/content.json');
const FONT_TTF = path.join(ROOT, 'public/fonts/xiangqi-kai.ttf');
const OUT = { lesson: path.join(ROOT, 'public/og/lessons'), series: path.join(ROOT, 'public/og/series') };

const args = process.argv.slice(2);
const only = (args.find((a) => a.startsWith('--only=')) || '').split('=')[1];
const changedOnly = args.includes('--changed');

fs.mkdirSync(OUT.lesson, { recursive: true });
fs.mkdirSync(OUT.series, { recursive: true });

const content = JSON.parse(fs.readFileSync(CONTENT, 'utf8'));
let jobs = buildJobs(content);
if (only) jobs = jobs.filter((j) => j.slug === only);

const resvgOpts = {
  fitTo: { mode: 'width', value: OG_W },
  font: { fontFiles: [FONT_TTF], loadSystemFonts: true, defaultFontFamily: 'Segoe UI' },
};

let made = 0, skipped = 0, failed = 0;

for (const job of jobs) {
  const outPath = path.join(OUT[job.kind], job.slug + '.png');
  if (changedOnly && fs.existsSync(outPath) && fs.statSync(outPath).mtimeMs >= fs.statSync(CONTENT).mtimeMs) {
    skipped++;
    continue;
  }
  try {
    const svg = compose(job);
    const png = new Resvg(svg, resvgOpts).render().asPng();
    fs.writeFileSync(outPath, png);
    made++;
  } catch (e) {
    failed++;
    console.error('  ✗ ' + job.kind + '/' + job.slug + ': ' + e.message);
  }
}

console.log(`OG images: ${made} tạo, ${skipped} bỏ qua, ${failed} lỗi (tổng job ${jobs.length}).`);
console.log(`→ public/og/lessons/  public/og/series/`);
if (failed) process.exit(1);
