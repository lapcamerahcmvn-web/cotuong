// Thử nhanh 1 biến cờ úp: đi các nước (iccs[:quân lật]) rồi in top nước máy đề xuất cho bên tới lượt.
//   node tools/co-up-examples/probe.mjs "a3a4:R h9g7:n" [--top 10] [--ms 3000] [--start FEN]
import { createRequire } from 'node:module';
import { review } from '../../resources/js/engine/engine.js';

const require = createRequire(import.meta.url);
global.window = global;
require('../../public/js/xiangqi-rules.js');
const R = global.XiangqiRules;
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const COUP = 'xxxxkxxxx/9/1x5x1/x1x1x1x1x/9/9/X1X1X1X1X/1X5X1/9/XXXXKXXXX';
const SET = ['R', 'R', 'N', 'N', 'B', 'B', 'A', 'A', 'C', 'C', 'P', 'P', 'P', 'P', 'P'];
const nt = (b, f, t) => { const p = b[f]; if (p !== 'X' && p !== 'x') return R.notation(b, f, t).replace(/\s+/g, ' ').trim(); const nb = b.slice(); const role = R.posRole(f); nb[f] = p === 'X' ? role : role.toLowerCase(); return R.notation(nb, f, t).replace(/\s+/g, ' ').trim() + ' (úp)'; };

let b = R.loadFen(arg('--start', COUP));
const gone = [];
let red = true;
for (const tok of (process.argv[2] || '').split(/\s+/).filter(Boolean)) {
  const [mv, rv] = tok.split(':');
  const m = R.fromIccs(mv);
  const p = b[m.from];
  if (!p || !R.legalNoSelfCheck(b, m.from, m.to, false, true)) { console.log('SAI LUẬT', tok); process.exit(1); }
  const cap = b[m.to];
  if (cap && cap !== 'X' && cap !== 'x') gone.push(cap);
  console.log(nt(b, m.from, m.to), rv ? '→ ' + rv : '', cap ? '(ăn ' + cap + ')' : '');
  b = b.slice(); b[m.to] = (p === 'X' || p === 'x') ? rv : p; b[m.from] = null;
  red = !R.isRed(p);
}
const bag = { red: SET.slice(), black: SET.slice() };
const rm = (a, t) => { const i = a.indexOf(t); if (i >= 0) a.splice(i, 1); };
b.forEach((p) => { if (p && p !== 'X' && p !== 'x' && p.toUpperCase() !== 'K') rm(R.isRed(p) ? bag.red : bag.black, p.toUpperCase()); });
gone.forEach((p) => rm(R.isRed(p) ? bag.red : bag.black, p.toUpperCase()));
console.log(R.toFen(b), red ? 'Đỏ đi' : 'Đen đi');
const r = review(R.toFen(b), red, { pools: bag, timeMs: +arg('--ms', 3000), samples: 8, coup: true });
Object.entries(r.scores).sort((x, y) => y[1] - x[1]).slice(0, +arg('--top', 10)).forEach(([k, v]) => { const m = R.fromIccs(k); console.log(String(v).padStart(6), k, nt(b, m.from, m.to)); });
