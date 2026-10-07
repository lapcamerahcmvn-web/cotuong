// Engine đi tiếp một biến cờ úp: giữ các nước mở đầu (đúng chủ đề bài), sau đó mỗi nửa nước chọn nước điểm cao nhất.
// Quân úp đi lần đầu lật theo danh sách --rv (lần lượt, chữ hoa Đỏ / thường Đen); hết danh sách thì lật Tốt nếu còn.
//   node tools/co-up-examples/autoline.mjs "a3a4:R b9c7:n" --plies 4 [--rv "P,p,C"] [--ms 2500] [--start FEN]
import { createRequire } from 'node:module';
import { review } from '../../resources/js/engine/engine.js';

const require = createRequire(import.meta.url);
global.window = global;
require('../../public/js/xiangqi-rules.js');
const R = global.XiangqiRules;
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const COUP = 'xxxxkxxxx/9/1x5x1/x1x1x1x1x/9/9/X1X1X1X1X/1X5X1/9/XXXXKXXXX';
const SET = ['R', 'R', 'N', 'N', 'B', 'B', 'A', 'A', 'C', 'C', 'P', 'P', 'P', 'P', 'P'];
const up = (p) => p === 'X' || p === 'x';
const nt = (b, f, t) => { const p = b[f]; if (!up(p)) return R.notation(b, f, t).replace(/\s+/g, ' ').trim(); const nb = b.slice(); const role = R.posRole(f); nb[f] = p === 'X' ? role : role.toLowerCase(); return R.notation(nb, f, t).replace(/\s+/g, ' ').trim() + ' (úp)'; };
const rvs = (arg('--rv', '') || '').split(',').filter(Boolean);
const MS = +arg('--ms', 2500);

let b = R.loadFen(arg('--start', COUP));
const gone = [];
const toks = [];
const bag = () => {
  const g = { red: SET.slice(), black: SET.slice() };
  const rm = (a, t) => { const i = a.indexOf(t); if (i >= 0) a.splice(i, 1); };
  b.forEach((p) => { if (p && !up(p) && p.toUpperCase() !== 'K') rm(R.isRed(p) ? g.red : g.black, p.toUpperCase()); });
  gone.forEach((p) => rm(R.isRed(p) ? g.red : g.black, p.toUpperCase()));
  return g;
};
const play = (mv, rv, note) => {
  const m = R.fromIccs(mv); const p = b[m.from];
  if (!p || !R.legalNoSelfCheck(b, m.from, m.to, false, true)) { console.log('SAI LUẬT', mv); process.exit(1); }
  if (up(p) && !rv) { const g = bag()[R.isRed(p) ? 'red' : 'black']; const t = g.includes('P') ? 'P' : g[0]; rv = R.isRed(p) ? t : t.toLowerCase(); }
  const cap = b[m.to];
  if (cap && !up(cap)) gone.push(cap);
  console.log(`${String(toks.length + 1).padStart(2)}. ${nt(b, m.from, m.to)}${up(p) ? ' → ' + rv : ''}${cap ? ' ăn ' + cap : ''}${note || ''}`);
  b = b.slice(); b[m.to] = up(p) ? rv : p; b[m.from] = null;
  toks.push(up(p) ? `${mv}:${rv}` : mv);
  return R.isRed(p);
};
let red = true;
for (const tok of (process.argv[2] || '').split(/\s+/).filter(Boolean)) { const [mv, rv] = tok.split(':'); red = !play(mv, rv); }
for (let i = 0; i < +arg('--plies', 4); i++) {
  const r = review(R.toFen(b), red, { pools: bag(), timeMs: MS, samples: 8, coup: true });
  const top = Object.entries(r.scores).sort((x, y) => y[1] - x[1]).slice(0, 3).map(([k, v]) => { const m = R.fromIccs(k); return `${nt(b, m.from, m.to)} ${v}`; });
  const m = R.fromIccs(r.best);
  let rv = null;
  if (up(b[m.from])) { const i = rvs.findIndex((x) => R.isRed(x) === red); if (i >= 0) rv = rvs.splice(i, 1)[0]; }
  red = !play(r.best, rv, `   [máy: ${top.join(' | ')}]`);
}
console.log('\n' + toks.join(' '));
