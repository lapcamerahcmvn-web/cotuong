'use strict';
/**
 * Dựng ví dụ nước đi cho các bài giảng CỜ ÚP chưa có bàn cờ minh hoạ (tools/co-up-examples/data*.cjs).
 *   data: slug → { start?: FEN (mặc định thế mở cờ úp), moves: [[iccs, lật ra | null, lời giảng], …] }
 *   - Quân úp đi theo binh chủng của ô đứng, đi nước đầu là LẬT: bắt buộc ghi quân lật ra (chữ hoa Đỏ / thường Đen).
 *   - Kiểm: đúng luật cờ úp (xiangqi-rules.js, coup=true), không tự để Tướng bị chiếu, số quân lật ≤ bộ quân mỗi bên,
 *     quân úp chỉ đứng ở ô xuất phát hợp lệ của bên đó.
 *   node tools/co-up-examples/build.cjs           # kiểm tra
 *   node tools/co-up-examples/build.cjs --write   # ghi vào database/seeders/data/content/co-up-*.json
 */
const fs = require('fs');
const path = require('path');
global.window = global;
require(path.resolve(__dirname, '../../public/js/xiangqi-rules.js'));
const R = global.XiangqiRules;
const IO = require('../trung-cuoc-bao-dien/content-io.cjs');
const { auditLesson } = require('../rules-audit/audit.cjs');

const COUP = 'xxxxkxxxx/9/1x5x1/x1x1x1x1x/9/9/X1X1X1X1X/1X5X1/9/XXXXKXXXX';
const SET = { R: 2, N: 2, B: 2, A: 2, C: 2, P: 5 };
const VI = { K: 'Tướng', A: 'Sĩ', B: 'Tượng', N: 'Mã', R: 'Xe', C: 'Pháo', P: 'Tốt' };
const data = { ...require('./data-1.cjs'), ...require('./data-2.cjs'), ...require('./data-3.cjs'), ...require('./data-4.cjs') };
const write = process.argv.includes('--write');

const isUp = (p) => p === 'X' || p === 'x';
const red = (p) => R.isRed(p);
const clean = (s) => s.replace(/\s+/g, ' ').trim();

/** Ký hiệu nước: quân ngửa theo ký hiệu chuẩn; quân úp "Pháo úp 2 bình 5 → lật Xe". */
function notation(b, f, t, reveal) {
  const p = b[f];
  if (!isUp(p)) return clean(R.notation(b, f, t));
  const role = R.posRole(f);
  const nb = b.slice(); nb[f] = red(p) ? role : role.toLowerCase();
  return clean(R.notation(nb, f, t)).replace(VI[role], VI[role] + ' úp') + ` → lật ${VI[reveal.toUpperCase()]}`;
}

/** Thế đầu hợp lệ: quân úp đúng ô xuất phát, số quân mỗi loại không vượt bộ quân. */
function checkStart(b) {
  const errs = [];
  const used = { true: {}, false: {} };
  b.forEach((p, i) => {
    if (!p) return;
    if (isUp(p)) {
      const role = R.posRole(i), r = (i / 9) | 0;
      if (!role || role === 'K' || (p === 'X') !== (r >= 5)) errs.push(`quân úp sai ô ${R.toIccs(i)}`);
      return;
    }
    const t = p.toUpperCase();
    if (t !== 'K') used[red(p)][t] = (used[red(p)][t] || 0) + 1;
  });
  for (const side of ['true', 'false']) for (const [t, n] of Object.entries(used[side])) if (n > SET[t]) errs.push(`thừa ${VI[t]} ${side === 'true' ? 'Đỏ' : 'Đen'}`);
  return { errs, used };
}

const content = IO.read();
const bySeries = new Map();
let bad = 0;
for (const [slug, ex] of Object.entries(data)) {
  const l = content.lessons.find((x) => x.slug === slug);
  if (!l) { console.log(`✗ ${slug}: không có bài`); bad++; continue; }
  const start = ex.start || COUP;
  let b = R.loadFen(start);
  const { errs, used } = checkStart(b);
  const steps = [];
  ex.moves.forEach(([iccs, reveal, caption], i) => {
    if (errs.length) return;
    const m = R.fromIccs(iccs);
    const p = b[m.from];
    if (!p) { errs.push(`nước ${i + 1} ${iccs}: ô đi không có quân`); return; }
    if (!R.legalNoSelfCheck(b, m.from, m.to, false, true)) { errs.push(`nước ${i + 1} ${iccs}: sai luật / tự để bị chiếu`); return; }
    if (isUp(p)) {
      if (!reveal || red(reveal) !== red(p) || reveal.toUpperCase() === 'K') { errs.push(`nước ${i + 1} ${iccs}: quân úp phải ghi quân lật ra đúng màu`); return; }
      const t = reveal.toUpperCase(), s = red(p);
      used[s][t] = (used[s][t] || 0) + 1;
      if (used[s][t] > SET[t]) { errs.push(`nước ${i + 1}: lật quá số ${VI[t]}`); return; }
    } else if (reveal) { errs.push(`nước ${i + 1} ${iccs}: quân ngửa không lật`); return; }
    const wxf = notation(b, m.from, m.to, reveal);
    const cap = b[m.to];
    b = b.slice(); b[m.to] = isUp(p) ? reveal : p; b[m.from] = null;
    steps.push({
      step_order: i + 1, fen: R.toFen(b), move_notation_wxf: wxf, move_notation_iccs: iccs, move_side: red(p) ? 'do' : 'den',
      moved_piece: isUp(p) ? reveal : p, captured_piece: cap || null, caption: `${wxf} — ${caption}`, is_flip_reveal: isUp(p),
    });
  });
  const n = { ...l, initial_fen: start, steps, move_count: steps.length, puzzle_side: null, variation_tree: null };
  if (!errs.length) errs.push(...auditLesson(n).errors);
  if (errs.length) { console.log(`✗ ${slug}: ${errs.join(' | ')}`); bad++; continue; }
  console.log(`✓ ${slug}: ${steps.length} nước`);
  bySeries.set(l.series_slug, (bySeries.get(l.series_slug) || []).concat(n));
}
console.log(`\n${Object.keys(data).length - bad}/${Object.keys(data).length} bài hợp lệ.`);
if (write && !bad) {
  for (const [series, list] of bySeries) {
    const file = path.join(IO.DIR, series + '.json');
    const arr = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const n of list) { const i = arr.findIndex((x) => x.slug === n.slug); if (i >= 0) arr[i] = n; }
    fs.writeFileSync(file, IO.phpJson(arr));
    console.log(`→ ghi ${list.length} bài vào ${series}.json`);
  }
} else if (write) console.log('Còn lỗi — chưa ghi.');
