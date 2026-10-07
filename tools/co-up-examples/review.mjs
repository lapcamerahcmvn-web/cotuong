// Chấm "độ hợp lý" từng nước của ví dụ cờ úp bằng bộ phân tích ván của web (engine.review: lấy mẫu cách xếp quân úp
// chưa lộ, điểm trung bình mọi nước). Báo nước kém nước tốt nhất của máy ≥ ngưỡng (mặc định 150 ≈ 1,5 Tốt).
//   node tools/co-up-examples/review.mjs [slug,slug] [--ms 3000] [--th 150]
import { createRequire } from 'node:module';
import { review } from '../../resources/js/engine/engine.js';

const require = createRequire(import.meta.url);
global.window = global;
require('../../public/js/xiangqi-rules.js');
const R = global.XiangqiRules;
const IO = require('../trung-cuoc-bao-dien/content-io.cjs');
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const MS = +arg('--ms', 3000), TH = +arg('--th', 150);
const only = process.argv[2] && !process.argv[2].startsWith('--') ? new Set(process.argv[2].split(',')) : null;

const nt = (b, f, t) => { const p = b[f]; if (p !== 'X' && p !== 'x') return R.notation(b, f, t).replace(/\s+/g, ' ').trim(); const role = R.posRole(f); const nb = b.slice(); nb[f] = p === 'X' ? role : role.toLowerCase(); return R.notation(nb, f, t).replace(/\s+/g, ' ').trim() + ' (úp)'; };
const SET = ['R', 'R', 'N', 'N', 'B', 'B', 'A', 'A', 'C', 'C', 'P', 'P', 'P', 'P', 'P'];
const COUP = 'xxxxkxxxx/9/1x5x1/x1x1x1x1x/9/9/X1X1X1X1X/1X5X1/9/XXXXKXXXX';
let lessons;
if (process.argv.includes('--data')) {
  // Chấm thẳng dữ liệu nháp trong data-*.cjs (chưa cần ghi vào content).
  const data = Object.assign({}, ...['data-1', 'data-2', 'data-3', 'data-4'].map((f) => { try { return require(`./${f}.cjs`); } catch { return {}; } }));
  lessons = Object.entries(data).filter(([s]) => !only || only.has(s)).map(([slug, ex]) => {
    let b = R.loadFen(ex.start || COUP);
    const steps = ex.moves.map(([iccs, rv], i) => {
      const m = R.fromIccs(iccs); const p = b[m.from];
      const wxf = p ? nt(b, m.from, m.to) : '??';
      b = b.slice(); b[m.to] = (p === 'X' || p === 'x') ? rv : p; b[m.from] = null;
      return { step_order: i + 1, move_notation_iccs: iccs, move_notation_wxf: wxf + (rv ? ' → ' + rv : ''), fen: R.toFen(b) };
    });
    return { slug, series_slug: 'data', initial_fen: ex.start || COUP, steps };
  });
} else {
  const content = IO.read();
  lessons = content.lessons.filter((l) => l.game_mode === 'co-up' && l.status === 'published' && (l.steps || []).length && (!only || only.has(l.slug)));
}

/** Túi quân chưa lộ mỗi bên = bộ quân − quân đã ngửa trên bàn − quân ngửa đã bị ăn (ăn nắp: không biết → giữ trong túi). */
function pools(b, revealedGone) {
  const bag = { red: SET.slice(), black: SET.slice() };
  const rm = (arr, t) => { const i = arr.indexOf(t); if (i >= 0) arr.splice(i, 1); };
  b.forEach((p) => { if (p && p !== 'X' && p !== 'x' && p.toUpperCase() !== 'K') rm(R.isRed(p) ? bag.red : bag.black, p.toUpperCase()); });
  revealedGone.forEach((p) => rm(R.isRed(p) ? bag.red : bag.black, p.toUpperCase()));
  return bag;
}

for (const l of lessons) {
  const steps = l.steps.slice().sort((a, b) => a.step_order - b.step_order);
  let b = R.loadFen(l.initial_fen);
  const gone = [];
  const out = [];
  for (const s of steps) {
    const m = R.fromIccs(s.move_notation_iccs);
    const red = R.isRed(b[m.from]);
    const r = review(R.toFen(b), red, { pools: pools(b, gone), timeMs: MS, samples: 8, coup: true });
    const mine = r.scores[s.move_notation_iccs];
    const ranked = Object.entries(r.scores).sort((x, y) => y[1] - x[1]);
    const rank = ranked.findIndex(([k]) => k === s.move_notation_iccs) + 1;
    const loss = r.score - (mine ?? r.score);
    const bm = R.fromIccs(r.best);
    const flag = loss >= TH ? (loss >= 2 * TH ? '✗✗' : '✗ ') : '  ';
    out.push(`${flag} ${String(s.step_order).padStart(2)}. ${s.move_notation_wxf.padEnd(34)} hạng ${rank}/${ranked.length} mất ${String(loss).padStart(4)}  | máy: ${nt(b, bm.from, bm.to)} (${r.best})`);
    const cap = b[m.to];
    if (cap && cap !== 'X' && cap !== 'x') gone.push(cap);
    b = R.loadFen(s.fen);
  }
  console.log(`\n== ${l.series_slug} · ${l.slug}`);
  console.log(out.join('\n'));
}
