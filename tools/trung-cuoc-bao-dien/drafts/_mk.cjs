// Tạm: sinh drafts từ chuỗi nước gọn (S("a b c")). Chạy: node drafts/_mk.cjs <tên> rồi xoá.
const S = s => s.trim().split(/\s+/);
const out = process.argv[2];
const d = require('./_src.cjs')(S);
require('fs').writeFileSync(__dirname + '/' + out + '.json', JSON.stringify(d, null, 1));
console.log(out, d.length);
