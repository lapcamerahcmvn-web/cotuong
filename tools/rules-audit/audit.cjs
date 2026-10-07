'use strict';
/**
 * Rà luật toàn bộ bài học trong kho nội dung (database/seeders/data/content/*.json) bằng ĐÚNG bộ luật bàn cờ trên web
 * (public/js/xiangqi-rules.js):
 *   - thế mở đầu hợp lệ: đủ 2 Tướng, Tướng trong cung, hai Tướng không đối mặt;
 *   - mỗi nước (mạch chính `steps` + mọi nhánh `variation_tree`): quân đi đúng luật, không tự để Tướng bị chiếu
 *     (kể cả để lộ mặt Tướng), FEN sau nước khớp với nước đi (cờ úp: quân úp lật ra đúng màu);
 *   - cảnh báo (không tính lỗi): một bên đi liền 2 nước (bài minh hoạ cách đi quân), bài cờ úp chưa có nước đi.
 *
 *   node tools/rules-audit/audit.cjs              # báo cáo
 *   node tools/rules-audit/audit.cjs --json out   # + ghi danh sách lỗi ra file JSON
 */
const fs = require('fs');
const path = require('path');

global.window = global;
require(path.resolve(__dirname, '../../public/js/xiangqi-rules.js'));
const R = global.XiangqiRules;

const IO = require('../trung-cuoc-bao-dien/content-io.cjs');
const COUP_SET = { R: 2, N: 2, B: 2, A: 2, C: 2, P: 5 };

const isHidden = (p) => p === 'X' || p === 'x';
const isRedP = (p) => R.isRed(p);
const sideName = (red) => (red ? 'Đỏ' : 'Đen');

/** Lỗi thế cờ tĩnh (null = hợp lệ). */
function positionError(b) {
  const K = b.indexOf('K'), k = b.indexOf('k');
  if (K < 0 || k < 0) return 'thiếu Tướng';
  if (b.filter((p) => p === 'K').length > 1 || b.filter((p) => p === 'k').length > 1) return 'thừa Tướng';
  const inPalace = (i, red) => { const r = (i / 9) | 0, c = i % 9; return c >= 3 && c <= 5 && (red ? r >= 7 : r <= 2); };
  if (!inPalace(K, true) || !inPalace(k, false)) return 'Tướng ngoài cung';
  if (K % 9 === k % 9) {
    let blocked = false;
    for (let i = k + 9; i < K; i += 9) if (b[i]) { blocked = true; break; }
    if (!blocked) return 'hai Tướng đối mặt (lộ mặt Tướng)';
  }
  return null;
}

/** So bàn sau nước đi với FEN ghi trong dữ liệu (cờ úp: ô đích được phép là quân lật cùng màu). */
function sameAfter(expect, got, to, reveal) {
  for (let i = 0; i < 90; i++) {
    if ((expect[i] || null) === (got[i] || null)) continue;
    if (i === to && reveal && got[i] && expect[i] && isRedP(got[i]) === isRedP(expect[i])) continue;
    return false;
  }
  return true;
}

/** Thử 1 nước trên bàn b. Trả {err?, board, warn?}. */
function checkMove(b, from, to, coup, fenAfter, reveal) {
  const p = b[from];
  if (!p) return { err: `ô ${R.toIccs(from)} không có quân` };
  if (!R.legalMove(b, from, to, false, coup)) return { err: `${pieceVi(p)} ${R.toIccs(from)}→${R.toIccs(to)} đi sai luật quân` };
  if (!R.legalNoSelfCheck(b, from, to, false, coup)) {
    const nb = b.slice(); nb[to] = nb[from]; nb[from] = null;
    return { err: `${pieceVi(p)} ${R.toIccs(from)}→${R.toIccs(to)} để Tướng ${sideName(isRedP(p))} bị chiếu${positionError(nb) ? ' (hai Tướng đối mặt)' : ''}` };
  }
  const nb = b.slice();
  nb[to] = isHidden(p) && typeof reveal === 'string' ? reveal : nb[from];
  nb[from] = null;
  if (fenAfter) {
    const exp = R.loadFen(fenAfter);
    if (!sameAfter(exp, nb, to, isHidden(p))) return { err: `FEN sau nước ${R.toIccs(from)}${R.toIccs(to)} không khớp nước đi`, board: exp };
    return { board: exp };
  }
  return { board: nb };
}

const VI = { K: 'Tướng', A: 'Sĩ', B: 'Tượng', N: 'Mã', R: 'Xe', C: 'Pháo', P: 'Tốt', X: 'Quân úp' };
const pieceVi = (p) => `${VI[p.toUpperCase()] || p} ${sideName(isRedP(p))}`;

/** Suy nước đi từ 2 FEN liên tiếp (dữ liệu tay không ghi ICCS). */
function diffMove(a, b) {
  const left = [], arrived = [];
  for (let i = 0; i < 90; i++) {
    if ((a[i] || null) === (b[i] || null)) continue;
    if (a[i] && !b[i]) left.push(i);
    else if (b[i]) arrived.push(i);
  }
  if (left.length === 1 && arrived.length === 1) return [left[0], arrived[0]];
  return null;
}

function auditLesson(l) {
  const errors = [], warns = [];
  const coup = l.game_mode === 'co-up' || /[Xx]/.test(l.initial_fen || '');
  const start = R.loadFen(l.initial_fen || '');
  const steps = (l.steps || []).slice().sort((x, y) => x.step_order - y.step_order);
  // Bài lý thuyết không bày bàn cờ (không quân, không nước đi) → bỏ qua.
  if (!start.some(Boolean) && !steps.length && !Array.isArray(l.variation_tree)) return { errors, warns, coup, skip: true };
  const pe = positionError(start);
  if (pe) errors.push(`thế mở đầu: ${pe}`);
  // Bên KHÔNG tới lượt mà đang bị chiếu → thế cờ không thể có (bên tới lượt bị chiếu thì hợp lệ: nước đầu phải gỡ chiếu,
  // nếu không gỡ thì phần kiểm từng nước bên dưới sẽ báo).
  if (steps[0] && !pe) {
    const mv = steps[0].move_notation_iccs ? R.fromIccs(steps[0].move_notation_iccs) : null;
    const red = mv && start[mv.from] ? isRedP(start[mv.from]) : null;
    if (red !== null && R.inCheck(start, !red, coup)) errors.push(`thế mở đầu: ${sideName(!red)} (vừa đi) đang bị chiếu`);
  }
  let b = start, lastRed = null, sameSide = 0;
  steps.forEach((s, i) => {
    if (errors.length > 8) return;
    let mv = s.move_notation_iccs && /^[a-i]\d[a-i]\d$/.test(s.move_notation_iccs) ? R.fromIccs(s.move_notation_iccs) : null;
    let from, to;
    if (mv) [from, to] = [mv.from, mv.to];
    else {
      const d = s.fen ? diffMove(b, R.loadFen(s.fen)) : null;
      if (!d) { errors.push(`nước ${i + 1}: không suy ra được nước đi từ FEN (đổi nhiều hơn 1 quân?)`); if (s.fen) b = R.loadFen(s.fen); return; }
      [from, to] = d;
    }
    const red = b[from] ? isRedP(b[from]) : null;
    if (lastRed !== null && red === lastRed) sameSide++;
    lastRed = red;
    const res = checkMove(b, from, to, coup, s.fen, null);
    if (res.err) errors.push(`nước ${i + 1} (${s.move_notation_wxf || (s.caption || '').slice(0, 40)}): ${res.err}`);
    b = res.board || (s.fen ? R.loadFen(s.fen) : b);
    const pe2 = positionError(b);
    if (pe2 && !res.err) errors.push(`sau nước ${i + 1}: ${pe2}`);
  });
  if (sameSide) warns.push(`${sameSide} lần một bên đi liền 2 nước (minh hoạ)`);

  // Nhánh biến
  const walk = (nodes, board, trail) => {
    for (const n of nodes || []) {
      if (errors.length > 12) return;
      let from = n.from, to = n.to;
      if ((from == null || to == null) && n.iccs) { const m = R.fromIccs(n.iccs); from = m.from; to = m.to; }
      const res = checkMove(board, from, to, coup, n.fen, n.reveal || null);
      const here = trail + (n.wxf || n.iccs);
      if (res.err) { errors.push(`nhánh ${here}: ${res.err}`); continue; }
      walk(n.children, res.board, here + ' › ');
    }
  };
  if (Array.isArray(l.variation_tree)) walk(l.variation_tree, start, '');
  return { errors, warns, coup };
}

module.exports = { auditLesson, positionError, R };
if (require.main !== module) return;

const content = IO.read();
const report = [];
let total = 0, withMoves = 0, coupNoMoves = [];
for (const l of content.lessons) {
  if (l.status !== 'published') continue;
  total++;
  if ((l.steps || []).length || Array.isArray(l.variation_tree)) withMoves++;
  const r = auditLesson(l);
  if (r.coup && !(l.steps || []).length) coupNoMoves.push(`${l.series_slug} · ${l.slug}`);
  if (r.errors.length) report.push({ series: l.series_slug, slug: l.slug, title: l.title, errors: r.errors, warns: r.warns });
}
console.log(`Đã rà ${total} bài published (${withMoves} bài có nước đi).`);
console.log(`✗ ${report.length} bài có lỗi luật:`);
for (const r of report) {
  console.log(`\n[${r.series}] ${r.slug} — ${r.title}`);
  r.errors.forEach((e) => console.log('   - ' + e));
}
console.log(`\nBài cờ úp chưa có nước đi (${coupNoMoves.length}):\n   ` + coupNoMoves.join('\n   '));
const ji = process.argv.indexOf('--json');
if (ji > 0) fs.writeFileSync(process.argv[ji + 1], JSON.stringify({ report, coupNoMoves }, null, 2));
