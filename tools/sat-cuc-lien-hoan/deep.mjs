// Bài chưa chứng minh được: dùng tìm kiếm alpha-beta của site (search) để tìm đường chiếu hết cho Đỏ, dựng mạch chính
// bằng cách tìm lại ở từng nước (Đỏ: nước tốt nhất; Đen: nước máy đánh giá đỡ tốt nhất). Chỉ giữ khi nước cuối chiếu bí.
//   node deep.mjs <probs.json> <sol1.json> <out.json> <shard/total> [ms]
import fs from 'fs';
import { loadFen, toFen, stateFrom, inCheckSt, legalMovesSt, search, fromIccs } from '../../resources/js/engine/engine.js';
const [inp, sol, out, shard = '0/1', ms = '5000', lineMs = '700'] = process.argv.slice(2);
const [si, sn] = shard.split('/').map(Number);
const P = JSON.parse(fs.readFileSync(inp, 'utf8')), S = JSON.parse(fs.readFileSync(sol, 'utf8'));
const done = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')) : {};
const MATE = 100000;
P.forEach((p, i) => {
    if (i % sn !== si || (S[i] && !S[i].err) || done[i]) return;
    const t0 = Date.now();
    const r0 = search(p.fen, true, { timeMs: +ms, depth: 40 });
    if (!(r0.score > MATE - 200)) { done[i] = { err: 'không thấy sát', score: r0.score, depth: r0.depth }; fs.writeFileSync(out, JSON.stringify(done)); return; }
    // Dựng mạch: mỗi lượt tìm lại (giờ ngắn hơn), tối đa 40 nửa nước.
    let b = loadFen(p.fen), red = true; const main = [];
    for (let ply = 0; ply < 40; ply++) {
        const st = stateFrom(b);
        if (!legalMovesSt(st, red).length) break;
        const r = search(toFen(b), red, { timeMs: red ? +lineMs : +lineMs, depth: 40 });
        if (!r.move) break;
        main.push(r.move);
        const [f, t] = fromIccs(r.move); b = b.slice(); b[t] = b[f]; b[f] = null; red = !red;
    }
    const st = stateFrom(b);
    const mated = !red && false;
    const blackMated = red === false && !legalMovesSt(st, false).length; // sau nước Đỏ, tới lượt Đen hết nước
    done[i] = blackMated ? { k: Math.ceil(main.length / 2), main, ms: Date.now() - t0, quietOk: true, score: r0.score }
        : { err: 'mạch không kết thúc bằng chiếu bí', main, score: r0.score };
    console.log(i, done[i].err || 'k=' + done[i].k, main.join(' '));
    fs.writeFileSync(out, JSON.stringify(done));
});
