'use strict';
/**
 * Vá tay bài có lỗi luật (sau khi đã phân tích bằng inspect.cjs). Mỗi bản vá:
 *   { slug, move: 'e0d0' }                 dời 1 quân (không di chuyển trong bài) trên MỌI FEN: thế đầu, mạch chính, nhánh
 *   { slug, step: 16, iccs: 'f1f0' }       thay nước thứ 16 của mạch chính (+ nút nhánh cùng đường), tính lại FEN, ký hiệu
 *                                          và quân bị ăn của nước đó và mọi nước sau theo đúng các nước còn lại
 * Chỉ ghi khi bài hết lỗi luật. node tools/rules-audit/patch.cjs
 */
const fs = require('fs');
const path = require('path');
const { auditLesson, R } = require('./audit.cjs');
const IO = require('../trung-cuoc-bao-dien/content-io.cjs');

const PATCHES = [
  // Loại hình Xe Pháo Mã VD2: Tướng Đỏ e0 cùng cột Tướng Đen, Sĩ e1 rời là lộ mặt Tướng → Tướng Đỏ ở d0.
  { series: 'sat-phap-dai-toan', slug: 'c3-loai-hinh-xe-phao-ma-vi-du-2', move: 'e0d0' },
  // Ngọa Tào Mã VD2, nước 16: Đỏ đang bị Xe f0 chiếu → "Xe SAU thoái 1" (f1 ăn f0), không phải Xe trước f8→f7.
  { series: 'sat-phap-dai-toan', slug: 'c2-ngoa-tao-ma-vi-du-2', step: 16, iccs: 'f1f0' },
];

const relocate = (fen, a, b) => {
  const bd = R.loadFen(fen);
  if (!bd[a] || bd[b]) return null;
  bd[b] = bd[a]; bd[a] = null;
  return R.toFen(bd);
};

function patchLesson(l, p) {
  const n = JSON.parse(JSON.stringify(l));
  if (p.move) {
    const m = R.fromIccs(p.move);
    const fix = (fen) => { const r = relocate(fen, m.from, m.to); if (!r) throw new Error('ô ' + p.move + ' không dời được ở ' + fen); return r; };
    n.initial_fen = fix(n.initial_fen);
    for (const s of n.steps || []) if (s.fen) s.fen = fix(s.fen);
    const walk = (nodes) => { for (const x of nodes || []) { if (x.fen) x.fen = fix(x.fen); walk(x.children); } };
    walk(n.variation_tree);
  }
  if (p.step) {
    const steps = n.steps.sort((a, b) => a.step_order - b.step_order);
    let b = R.loadFen(n.initial_fen);
    const oldIccs = [];
    steps.forEach((s, i) => {
      oldIccs.push(s.move_notation_iccs);
      if (i + 1 === p.step) s.move_notation_iccs = p.iccs;
      if (i + 1 >= p.step) {
        const m = R.fromIccs(s.move_notation_iccs);
        s.move_notation_wxf = R.notation(b, m.from, m.to).replace(/\s+/g, ' ').trim();
        s.moved_piece = b[m.from];
        s.captured_piece = b[m.to] || null;
        b[m.to] = b[m.from]; b[m.from] = null;
        s.fen = R.toFen(b);
      } else b = R.loadFen(s.fen);
    });
    // Nhánh: đi theo đúng đường mạch chính tới nước bị thay, sửa nút đó + tính lại FEN cả cây con.
    const redo = (nodes, board) => {
      for (const x of nodes || []) {
        const m = R.fromIccs(x.iccs);
        x.from = m.from; x.to = m.to;
        x.wxf = R.notation(board, m.from, m.to).replace(/\s+/g, ' ').trim();
        const nb = board.slice(); nb[m.to] = nb[m.from]; nb[m.from] = null;
        x.fen = R.toFen(nb);
        redo(x.children, nb);
      }
    };
    const follow = (nodes, board, depth) => {
      for (const x of nodes || []) {
        if (x.iccs !== oldIccs[depth]) continue;
        if (depth + 1 === p.step) { x.iccs = p.iccs; redo([x], board); return; }
        const nb = R.loadFen(x.fen);
        follow(x.children, nb, depth + 1);
      }
    };
    follow(n.variation_tree, R.loadFen(n.initial_fen), 0);
  }
  return n;
}

const bySeries = new Map();
for (const p of PATCHES) bySeries.set(p.series, (bySeries.get(p.series) || []).concat(p));
for (const [series, list] of bySeries) {
  const file = path.join(IO.DIR, series + '.json');
  const arr = JSON.parse(fs.readFileSync(file, 'utf8'));
  let changed = 0;
  for (const p of list) {
    const i = arr.findIndex((x) => x.slug === p.slug);
    if (i < 0) { console.log('✗ không có bài ' + p.slug); continue; }
    if (!auditLesson(arr[i]).errors.length) { console.log('· ' + p.slug + ': đã hợp luật, bỏ qua'); continue; }
    const n = patchLesson(arr[i], p);
    const errs = auditLesson(n).errors;
    console.log(errs.length ? `✗ ${p.slug}: vẫn lỗi — ${errs.slice(0, 2).join(' | ')}` : `✓ ${p.slug}`);
    if (!errs.length) { arr[i] = n; changed++; }
  }
  if (changed) { fs.writeFileSync(file, IO.phpJson(arr)); console.log(`→ ghi ${changed} bài vào ${series}.json`); }
}
