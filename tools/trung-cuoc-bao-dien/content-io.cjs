/* Đọc/ghi kho nội dung ship theo git — cùng quy ước với App\Support\ContentStore (PHP):
     database/seeders/data/content/series.json        {"exported_at", "series":[...]}
     database/seeders/data/content/<series_slug>.json  [bài...]   (không chuyên đề: _khong-chuyen-de.json)
   Định dạng giữ giống `json_encode(JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE)` của PHP (thụt 4, "/" thoát "\/",
   không xuống dòng cuối) → diff git chỉ gồm phần thêm/sửa. read() trả {exported_at, series, lessons} như file cũ;
   vẫn đọc được database/seeders/data/content.json (định dạng 1 file trước 10/2026) nếu thư mục mới chưa có. */
'use strict';
const fs = require('fs');
const path = require('path');
const DIR = path.resolve(__dirname, '../../database/seeders/data/content');
const LEGACY = path.resolve(__dirname, '../../database/seeders/data/content.json');
const NO_SERIES = '_khong-chuyen-de';

function phpJson(obj) {
  return JSON.stringify(obj, null, 4).replace(/\//g, '\\/');
}
const fileOf = (slug) => String(slug || NO_SERIES).toLowerCase().replace(/[^a-z0-9_-]/g, '-') + '.json';
const lessonFiles = () => fs.readdirSync(DIR).filter((f) => f.endsWith('.json') && f !== 'series.json').sort();

function read() {
  if (!fs.existsSync(path.join(DIR, 'series.json'))) return JSON.parse(fs.readFileSync(LEGACY, 'utf8'));
  const head = JSON.parse(fs.readFileSync(path.join(DIR, 'series.json'), 'utf8'));
  const lessons = [];
  for (const f of lessonFiles()) lessons.push(...JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')));
  return { exported_at: head.exported_at || null, series: head.series || [], lessons };
}

/** Ghi lại: chỉ đụng file có nội dung đổi; xoá file chuyên đề không còn bài. */
function write(data) {
  fs.mkdirSync(DIR, { recursive: true });
  const put = (f, s) => { const p = path.join(DIR, f); if (!fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== s) fs.writeFileSync(p, s); };
  put('series.json', phpJson({ exported_at: data.exported_at || null, series: data.series || [] }));
  const groups = new Map();
  for (const l of data.lessons || []) { const f = fileOf(l.series_slug); if (!groups.has(f)) groups.set(f, []); groups.get(f).push(l); }
  for (const [f, list] of groups) put(f, phpJson(list));
  for (const f of lessonFiles()) if (!groups.has(f)) fs.unlinkSync(path.join(DIR, f));
}

/** Thời điểm sửa mới nhất của kho (thay cho mtime content.json cũ). */
function mtimeMs() {
  if (!fs.existsSync(DIR)) return fs.statSync(LEGACY).mtimeMs;
  return Math.max(...fs.readdirSync(DIR).filter((f) => f.endsWith('.json')).map((f) => fs.statSync(path.join(DIR, f)).mtimeMs));
}

module.exports = { DIR, LEGACY, CONTENT: DIR, phpJson, read, write, mtimeMs };
