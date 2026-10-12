// tools/trung-cuoc-so-do-tu-duy/merge.mjs — Gộp kết quả máy giải (thư mục làm việc) → data.json của chuyên đề.
//   node tools/trung-cuoc-so-do-tu-duy/merge.mjs <thư mục làm việc>
// Thư mục làm việc chứa: probs.json (extract.py), mates.json ({index: {k, main, src:'proof'|'search'}}), b0..b3.json (best.mjs),
// threat.json ({index: k} — nếu được đi, Đen chiếu hết trong k nước: chạy solve.mjs trên thế lật màu, xem README.md).
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const W = process.argv[2];
const P = JSON.parse(fs.readFileSync(path.join(W, 'probs.json'), 'utf8'));
const M = JSON.parse(fs.readFileSync(path.join(W, 'mates.json'), 'utf8'));
const B = {};
const TH = fs.existsSync(path.join(W, 'threat.json')) ? JSON.parse(fs.readFileSync(path.join(W, 'threat.json'), 'utf8')) : {};
for (const f of fs.readdirSync(W).filter((f) => /^b\d+\.json$/.test(f))) Object.assign(B, JSON.parse(fs.readFileSync(path.join(W, f), 'utf8')));

const keep = [], miss = [];
P.forEach((p, i) => {
    const base = { id: i, sec: p.sec, n: p.n, page: p.page, fen: p.fen, ...(TH[i] ? { threat: TH[i] } : {}) };
    if (M[i]) keep.push({ ...base, kind: 'mate', k: M[i].k, main: M[i].main, src: M[i].src });
    else if (B[i]) keep.push({ ...base, kind: 'best', main: B[i].main, score: B[i].score, margin: B[i].margin, gain: B[i].gain, alts: B[i].alts, depth: B[i].depth });
    else miss.push(i);
});
fs.writeFileSync(path.join(HERE, 'data.json'), JSON.stringify({ keep, miss }) + '\n');
console.log(`${keep.length} bài (${keep.filter((x) => x.kind === 'mate').length} chiếu hết), thiếu ${miss.length}`);
