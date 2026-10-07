'use strict';
// In bàn cờ tại nước lỗi đầu tiên của bài (mạch chính) + quân đang chiếu + các nước trước/sau. node inspect.cjs slug [slug…]
const { auditLesson, R } = require('./audit.cjs');
const IO = require('../trung-cuoc-bao-dien/content-io.cjs');
const c = IO.read();
const show = (b) => { for (let r = 0; r < 10; r++) console.log('     ' + (9 - r) + ' ' + b.slice(r * 9, r * 9 + 9).map((p) => p || '.').join(' ')); console.log('       a b c d e f g h i'); };
const checkers = (b, red) => { const k = R.findKing(b, red); const o = []; for (let i = 0; i < 90; i++) if (b[i] && R.isRed(b[i]) !== red && R.legalMove(b, i, k, false, false)) o.push(b[i] + '@' + R.toIccs(i)); return o.join(',') || '-'; };
for (const slug of process.argv.slice(2)) {
  const l = c.lessons.find((x) => x.slug === slug);
  const steps = l.steps.slice().sort((x, y) => x.step_order - y.step_order);
  console.log(`\n=== ${slug} | puzzle ${l.puzzle_side} | ${steps.length} nước | tree ${Array.isArray(l.variation_tree) ? 'có' : 'không'}`);
  console.log('   lỗi: ' + auditLesson(l).errors.slice(0, 3).join(' | '));
  let b = R.loadFen(l.initial_fen);
  console.log('   thế đầu:'); show(b);
  console.log('   chiếu Đỏ: ' + checkers(b, true) + ' | chiếu Đen: ' + checkers(b, false));
  console.log('   nước: ' + steps.map((s, i) => `${i + 1}.${s.move_notation_iccs}(${s.move_notation_wxf})`).join(' '));
  for (const [i, s] of steps.entries()) {
    const m = R.fromIccs(s.move_notation_iccs);
    if (!R.legalNoSelfCheck(b, m.from, m.to, false, false)) {
      console.log(`   ✗ nước ${i + 1} ${s.move_notation_iccs} ${s.move_notation_wxf} — bàn trước nước này:`); show(b);
      const nb = b.slice(); nb[m.to] = nb[m.from]; nb[m.from] = null;
      console.log('   sau nước đó, quân chiếu Tướng ' + (R.isRed(b[m.from]) ? 'Đỏ' : 'Đen') + ': ' + checkers(nb, R.isRed(b[m.from])));
      console.log('   lời giảng: ' + (s.caption || '').slice(0, 200));
      break;
    }
    b = R.loadFen(s.fen);
  }
}
