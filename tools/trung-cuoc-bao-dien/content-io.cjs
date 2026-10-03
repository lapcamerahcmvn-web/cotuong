/* Đọc/ghi database/seeders/data/content.json GIỮ NGUYÊN định dạng của `cotuong:export-content`
   (PHP json_encode JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE: thụt 4 dấu cách, "/" thoát thành "\/",
   không xuống dòng cuối file) → diff git chỉ gồm đúng phần thêm/sửa, không xáo trộn 7MB dữ liệu cũ. */
'use strict';
const fs = require('fs');
const path = require('path');
const CONTENT = path.resolve(__dirname, '../../database/seeders/data/content.json');

function phpJson(obj) {
  return JSON.stringify(obj, null, 4).replace(/\//g, '\\/');
}
function read() { return JSON.parse(fs.readFileSync(CONTENT, 'utf8')); }
function write(data) { fs.writeFileSync(CONTENT, phpJson(data)); }

module.exports = { CONTENT, phpJson, read, write };

if (require.main === module) {
  const raw = fs.readFileSync(CONTENT, 'utf8');
  const out = phpJson(JSON.parse(raw));
  if (out === raw) { console.log('round-trip: IDENTICAL'); process.exit(0); }
  let i = 0; while (out[i] === raw[i]) i++;
  console.log('round-trip: DIFF at', i, '\nraw:', JSON.stringify(raw.slice(i - 60, i + 60)), '\nout:', JSON.stringify(out.slice(i - 60, i + 60)));
  process.exit(1);
}
