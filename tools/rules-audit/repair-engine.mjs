// Sửa bài giải đố (sát pháp) có nước giải mã sai: giữ phần lời giải sách còn hợp luật, từ nước lỗi trở đi để engine
// (bộ chứng minh chiếu hết của web) đi tiếp: bên thua đỡ DAI nhất, bên thắng chiếu hết nhanh nhất. Thế đầu không hợp lệ
// (bên vừa đi đang bị chiếu) → dời quân đang chiếu sang ô gần nhất làm thế hợp lệ mà vẫn chiếu hết được.
//   node tools/rules-audit/repair-engine.mjs slug,slug [--apply]
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { mateIn, checkPuzzleMove } from '../../resources/js/engine/engine.js';

const require = createRequire(import.meta.url);
const { auditLesson, R } = require('./audit.cjs');
const IO = require('../trung-cuoc-bao-dien/content-io.cjs');

const slugs = (process.argv[2] || '').split(',').filter(Boolean);
const apply = process.argv.includes('--apply');
const content = IO.read();
const TIMEOUT_MS = 6000;

const wxf = (b, f, t) => R.notation(b, f, t).replace(/\s+/g, ' ').trim();
const apply1 = (b, f, t) => { const n = b.slice(); n[t] = n[f]; n[f] = null; return n; };
const legalList = (b, red) => { const o = []; for (let f = 0; f < 90; f++) if (b[f] && R.isRed(b[f]) === red) for (let t = 0; t < 90; t++) if (R.legalNoSelfCheck(b, f, t, false, false)) o.push([f, t]); return o; };
const VI = { K: 'Tướng', A: 'Sĩ', B: 'Tượng', N: 'Mã', R: 'Xe', C: 'Pháo', P: 'Tốt' };

/** Từ thế b (tới lượt `red` = bên thắng), engine đi tiếp tới chiếu hết. → [[f,t]…] hoặc null. */
function mateLine(b, red, n) {
  const line = [];
  for (let guard = 0; guard < 40; guard++) {
    const fen = R.toFen(b);
    const m = mateIn(fen, red, n, TIMEOUT_MS);
    if (!m || m.timeout || !m.move) return null;
    const mv = R.fromIccs(m.move);
    const res = checkPuzzleMove(fen, red, m.move, m.k, TIMEOUT_MS);
    line.push([mv.from, mv.to]);
    b = apply1(b, mv.from, mv.to);
    if (!legalList(b, !red).length) return line;            // chiếu hết
    if (res.status !== 'win' || !res.reply) return null;
    const r = R.fromIccs(res.reply);
    line.push([r.from, r.to]);
    b = apply1(b, r.from, r.to);
    n = m.k - 1;
  }
  return null;
}

/** Bên thua tới lượt ở thế b: chọn nước đỡ khiến bên thắng cần nhiều nước nhất. */
function longestDefence(b, red, n) {
  let best = null, bestK = 0;
  for (const [f, t] of legalList(b, !red)) {
    const nb = apply1(b, f, t);
    const m = mateIn(R.toFen(nb), red, n, TIMEOUT_MS);
    if (!m || m.timeout) return null;                           // có cách đỡ không bị chiếu hết trong n → bỏ
    if (m.k > bestK) { bestK = m.k; best = [f, t]; }
  }
  return best;
}

function rebuild(l, startBoard, moves, keepCaptions) {
  const n = JSON.parse(JSON.stringify(l));
  n.initial_fen = R.toFen(startBoard);
  let b = startBoard;
  n.steps = moves.map(([f, t], i) => {
    const p = b[f], red = R.isRed(p);
    const old = keepCaptions[i];
    const notation = wxf(b, f, t);
    const cap = b[t];
    b = apply1(b, f, t);
    const check = R.inCheck(b, !red, false);
    const mate = !legalList(b, !red).length;
    return {
      step_order: i + 1, fen: R.toFen(b), move_notation_wxf: notation, move_notation_iccs: R.toIccs(f) + R.toIccs(t),
      move_side: red ? 'do' : 'den', moved_piece: p, captured_piece: cap || null,
      caption: old ?? (mate ? `${notation} — chiếu hết!` : red ? `${notation}${check ? ' — chiếu' : ''}.` : `${notation} — Đen đỡ dai nhất.`),
      is_flip_reveal: false,
    };
  });
  n.move_count = n.steps.length;
  n.variation_tree = null;                                      // nhánh cũ dựa trên lời giải sai → bỏ
  return n;
}

const out = [];
for (const slug of slugs) {
  const l = content.lessons.find((x) => x.slug === slug);
  const steps = l.steps.slice().sort((a, b) => a.step_order - b.step_order);
  const start = R.loadFen(l.initial_fen);
  const firstMv = R.fromIccs(steps[0].move_notation_iccs);
  const red = R.isRed(start[firstMv.from]);                     // bên giải
  const redMoves = steps.filter((s, i) => i % 2 === 0).length;
  let result = null;

  // Các thế đầu ứng viên: nguyên bản (nếu hợp lệ) + mọi thế dời 1 quân sang ô gần (≤ 2 ô) làm thế hợp lệ.
  // Xếp theo số nước sách còn đi được (giữ lời giải gốc nhiều nhất), rồi theo khoảng cách dời.
  const okStart = (b) => !R.inCheck(b, !red, false) && b.indexOf('K') >= 0 && b.indexOf('k') >= 0;
  const prefix = (b0) => {
    let b = b0; const keep = [];
    for (const st of steps) {
      const m = R.fromIccs(st.move_notation_iccs);
      if (!b[m.from] || !R.legalNoSelfCheck(b, m.from, m.to, false, false)) break;
      keep.push([m.from, m.to]); b = apply1(b, m.from, m.to);
    }
    return keep;
  };
  const starts = [];
  if (okStart(start)) starts.push({ b: start, note: '', dist: 0 });
  for (let a = 0; a < 90; a++) {
    if (!start[a] || start[a].toUpperCase() === 'K') continue;
    for (let t = 0; t < 90; t++) {
      const d = Math.abs(((t / 9) | 0) - ((a / 9) | 0)) + Math.abs(t % 9 - a % 9);
      if (start[t] || d > +(process.env.MAX_DIST || 2)) continue;
      const b = start.slice(); b[t] = b[a]; b[a] = null;
      if (okStart(b)) starts.push({ b, note: `dời ${VI[start[a].toUpperCase()]} ${R.isRed(start[a]) ? 'Đỏ' : 'Đen'} ${R.toIccs(a)} → ${R.toIccs(t)}`, dist: d });
    }
  }
  starts.forEach((s) => { s.keep = prefix(s.b); });
  starts.sort((x, y) => y.keep.length - x.keep.length || x.dist - y.dist);
  const minRed = process.env.MIN_RED ? +process.env.MIN_RED : Math.max(2, redMoves - 1);                     // lời giải mới không được ngắn hơn gốc quá 1 nước

  for (const s of starts.slice(0, +(process.env.MAX_STARTS || 25))) {
    const keep = s.keep;
    // Lùi về nước cuối của bên giải trong tiền tố rồi để engine đi tiếp (bên giải tới lượt).
    for (let cut = keep.length; cut >= 0; cut--) {
      let bb = s.b; for (const [f, t] of keep.slice(0, cut)) bb = apply1(bb, f, t);
      const toMove = cut % 2 === 0 ? red : !red;
      const budget = redMoves + 1 - Math.ceil(cut / 2);
      if (budget < 1) continue;
      let tail = null;
      if (toMove === red) tail = mateLine(bb, red, budget);
      else { const d = longestDefence(bb, red, budget); if (d) { const t2 = mateLine(apply1(bb, d[0], d[1]), red, budget); if (t2) tail = [d, ...t2]; } }
      if (tail) {
        const moves = [...keep.slice(0, cut), ...tail];
        const caps = moves.map((m, i) => (i < cut ? steps[i].caption : null));
        const n = rebuild(l, s.b, moves, caps);
        const errs = auditLesson(n).errors;
        const solverMoves = Math.ceil(moves.length / 2);
        if (!errs.length && solverMoves >= minRed) { result = { n, note: s.note, cut, total: moves.length, orig: steps.length }; break; }
      }
      if (cut < keep.length - 4) break;                         // đừng cắt quá sâu lời giải sách
    }
    if (result) break;
  }
  if (!result) { console.log(`✗ ${slug}: engine không tìm được đường chiếu hết hợp luật trong ≤ ${redMoves + 1} nước`); continue; }
  console.log(`✓ ${slug}: ${result.note ? result.note + '; ' : ''}giữ ${result.cut}/${result.orig} nước sách, máy đi tiếp → ${result.total} nước: ` +
    result.n.steps.map((x) => x.move_notation_wxf).join(', '));
  out.push(result.n);
}
if (apply && out.length) {
  const file = path.join(IO.DIR, 'sat-phap-dai-toan.json');
  const arr = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const n of out) { const i = arr.findIndex((x) => x.slug === n.slug); if (i >= 0 && n.series_slug === 'sat-phap-dai-toan') arr[i] = n; }
  fs.writeFileSync(file, IO.phpJson(arr));
  console.log(`→ ghi ${out.length} bài vào sat-phap-dai-toan.json`);
}
