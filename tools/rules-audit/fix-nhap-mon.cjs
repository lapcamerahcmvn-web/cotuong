'use strict';
// Bài "Cách đi quân …" (Nhập môn): thế minh hoạ chỉ có 2 Tướng cùng cột e → quân Đỏ rời cột là hai Tướng đối mặt (phạm
// luật), Xe trên cột e thì chiếu sẵn Tướng Đen. Sửa cho tự nhiên: giữ Tướng Đen e9, thêm 2 Sĩ Đen ở e8 + d9 (Sĩ e8 chắn
// cột giữa) — thêm vào mọi FEN của bài nếu 2 ô đó luôn trống. Chạy lại audit sau khi ghi.
const fs = require('fs');
const path = require('path');
const { auditLesson, R } = require('./audit.cjs');
const IO = require('../trung-cuoc-bao-dien/content-io.cjs');

const file = path.join(IO.DIR, 'nhap-mon-co-tuong.json');
const arr = JSON.parse(fs.readFileSync(file, 'utf8'));
const ADD = { 13: 'a', 3: 'a' };   // e8, d9
let changed = 0;
for (const l of arr) {
  if (!auditLesson(l).errors.length) continue;
  const add = (fen) => {
    const b = R.loadFen(fen);
    for (const [i, p] of Object.entries(ADD)) { if (b[i]) return null; b[i] = p; }
    return R.toFen(b);
  };
  const n = JSON.parse(JSON.stringify(l));
  n.initial_fen = add(n.initial_fen);
  let ok = !!n.initial_fen;
  for (const s of n.steps || []) { if (s.fen) { s.fen = add(s.fen); if (!s.fen) ok = false; } }
  const errs = ok ? auditLesson(n).errors : ['ô e8/d9 bị chiếm'];
  console.log(`${l.slug}: ${errs.length ? '✗ ' + errs.join('; ') : '✓ hợp luật sau khi thêm 2 Sĩ Đen'}`);
  if (!errs.length) { arr[arr.indexOf(l)] = n; changed++; }
}
if (changed) fs.writeFileSync(file, IO.phpJson(arr));
console.log(`→ sửa ${changed} bài trong nhap-mon-co-tuong.json`);
