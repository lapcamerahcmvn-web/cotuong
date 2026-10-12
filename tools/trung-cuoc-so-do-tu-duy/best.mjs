// tools/trung-cuoc-so-do-tu-duy/best.mjs — Bài tập trung cuộc KHÔNG phải chiếu hết (bắt quân, tranh tiên, khống chế…):
// dùng tìm kiếm alpha-beta của site tìm nước then chốt cho Đỏ + mạch ngắn (Đen đỡ theo đánh giá máy).
//   node tools/trung-cuoc-so-do-tu-duy/best.mjs <probs.json> <skip.json> <out.json> <shard/total> [ms gốc] [ms mỗi nước]
// skip.json: {index: {...}} các bài đã có lời giải chiếu hết (bỏ qua). out.json: {index: {score, margin, alts, main, gain}}
//   score  = điểm máy sau nước then chốt (bên Đỏ, 100 ≈ 1 Tốt; > 99000 = thấy chiếu hết)
//   margin = chênh lệch với nước tốt thứ hai (lớn = nước then chốt rõ ràng → làm bài giải đố; nhỏ = chỉ làm bài phân tích)
//   main   = mạch ICCS cắt ở nước Đỏ có lợi vật chất lớn nhất (tối thiểu 1 nước); gain = lợi vật chất (điểm quân) tại đó.
import fs from 'fs';
import { loadFen, toFen, search, fromIccs, legalMoves } from '../../resources/js/engine/engine.js';

const [inp, skipF, out, shard = '0/1', rootMs = '6000', plyMs = '1500'] = process.argv.slice(2);
const [si, sn] = shard.split('/').map(Number);
const P = JSON.parse(fs.readFileSync(inp, 'utf8'));
const SKIP = fs.existsSync(skipF) ? JSON.parse(fs.readFileSync(skipF, 'utf8')) : {};
const done = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')) : {};
const VAL = { K: 0, A: 2, B: 2, N: 4, R: 9, C: 4.5, P: 1 };
const mat = (b) => b.reduce((s, p) => !p ? s : s + (p === p.toUpperCase() ? 1 : -1) * VAL[p.toUpperCase()], 0);
const MATE = 100000;

P.forEach((p, i) => {
    if (i % sn !== si || SKIP[i] || done[i]) return;
    const t0 = Date.now();
    const r0 = search(p.fen, true, { timeMs: +rootMs, depth: 30, exactRoot: true });
    const sc = Object.values(r0.scores || {}).sort((a, b) => b - a);
    const alts = Object.entries(r0.scores || {}).filter(([m, v]) => v >= r0.score - 30 && m !== r0.move).map(([m]) => m);
    let b = loadFen(p.fen), red = true;
    const base = mat(b), main = [r0.move], g = [];
    const play = (m) => { const [f, t] = fromIccs(m); b = b.slice(); b[t] = b[f]; b[f] = null; red = !red; g.push(mat(b) - base); };
    play(r0.move);
    for (let ply = 1; ply < 9; ply++) {
        if (!legalMoves(b, red).length) break;
        const r = search(toFen(b), red, { timeMs: +plyMs, depth: 30 });
        if (!r.move) break;
        main.push(r.move); play(r.move);
    }
    // Lợi "đã chốt" của nước Đỏ thứ j = lợi sau khi Đen đáp lại (Đen có thể bắt lại) — cắt ở nước Đỏ có lợi chốt lớn nhất.
    let best = 0, bestGain = -99;
    for (let k = 0; k < main.length; k += 2) {
        const settled = k + 1 < g.length ? Math.min(g[k], g[k + 1]) : g[k];
        if (settled > bestGain + 0.4) { bestGain = settled; best = k; }
    }
    const mated = r0.score > MATE - 300;
    done[i] = { score: r0.score, depth: r0.depth, margin: sc.length > 1 ? sc[0] - sc[1] : 9999, alts,
        main: mated ? main : main.slice(0, best + 1), gain: Math.round(bestGain * 10) / 10, mated, ms: Date.now() - t0 };
    console.log(i, p.sec, p.n, 'score', r0.score, 'margin', done[i].margin, 'gain', done[i].gain, done[i].main.join(' '));
    fs.writeFileSync(out, JSON.stringify(done));
});
