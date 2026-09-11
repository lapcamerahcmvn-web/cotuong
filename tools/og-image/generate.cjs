'use strict';

/**
 * Sinh ảnh OG/preview thế cờ cho từng bài học + chuỗi.
 *
 *   node tools/og-image/generate.cjs                 # sinh toàn bộ
 *   node tools/og-image/generate.cjs --only=<slug>   # 1 bài/chuỗi
 *   node tools/og-image/generate.cjs --changed       # bỏ qua PNG mới hơn content.json
 *   node tools/og-image/generate.cjs --missing       # CHỈ sinh bài chưa có PNG (nhanh, dùng khi có bài mới)
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
const { composeThumb, SIZE: THUMB_SIZE } = require('./compose-thumb.cjs');

const ROOT = path.resolve(__dirname, '../..');
const CONTENT = path.join(ROOT, 'database/seeders/data/content.json');
const FONT_TTF = path.join(ROOT, 'public/fonts/xiangqi-kai.ttf');
const OUT = { lesson: path.join(ROOT, 'public/og/lessons'), series: path.join(ROOT, 'public/og/series') };
const OUT_THUMB = { lesson: path.join(ROOT, 'public/og/thumbs/lessons'), series: path.join(ROOT, 'public/og/thumbs/series') };

const args = process.argv.slice(2);
const only = (args.find((a) => a.startsWith('--only=')) || '').split('=')[1];
const changedOnly = args.includes('--changed');
const missingOnly = args.includes('--missing');

fs.mkdirSync(OUT.lesson, { recursive: true });
fs.mkdirSync(OUT.series, { recursive: true });
fs.mkdirSync(OUT_THUMB.lesson, { recursive: true });
fs.mkdirSync(OUT_THUMB.series, { recursive: true });

const content = JSON.parse(fs.readFileSync(CONTENT, 'utf8'));
let jobs = buildJobs(content);
if (only) jobs = jobs.filter((j) => j.slug === only);

const fontOpt = { fontFiles: [FONT_TTF], loadSystemFonts: true, defaultFontFamily: 'Segoe UI' };
const resvgOpts = { fitTo: { mode: 'width', value: OG_W }, font: fontOpt };
const resvgThumbOpts = { fitTo: { mode: 'width', value: THUMB_SIZE }, font: fontOpt };

let made = 0, skipped = 0, failed = 0;

function shouldSkip(outPath) {
  const exists = fs.existsSync(outPath);
  if (missingOnly && exists) return true;
  if (changedOnly && exists && fs.statSync(outPath).mtimeMs >= fs.statSync(CONTENT).mtimeMs) return true;
  return false;
}

for (const job of jobs) {
  const outPath = path.join(OUT[job.kind], job.slug + '.png');
  const thumbPath = path.join(OUT_THUMB[job.kind], job.slug + '.png');
  const skipOg = shouldSkip(outPath);
  const skipThumb = shouldSkip(thumbPath);
  if (skipOg && skipThumb) { skipped++; continue; }
  try {
    if (!skipOg) {
      const png = new Resvg(compose(job), resvgOpts).render().asPng();
      fs.writeFileSync(outPath, png);
    }
    if (!skipThumb) {
      const png = new Resvg(composeThumb(job), resvgThumbOpts).render().asPng();
      fs.writeFileSync(thumbPath, png);
    }
    made++;
  } catch (e) {
    failed++;
    console.error('  ✗ ' + job.kind + '/' + job.slug + ': ' + e.message);
  }
}

console.log(`OG images: ${made} tạo, ${skipped} bỏ qua, ${failed} lỗi (tổng job ${jobs.length}).`);
console.log(`→ public/og/{lessons,series}/  (1200x630)  +  public/og/thumbs/{lessons,series}/  (${THUMB_SIZE}x${THUMB_SIZE})`);
if (failed) process.exit(1);
