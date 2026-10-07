// tools/sat-cuc-lien-hoan/solve.mjs — Bộ giải "liên tướng sát" (mọi nước của Đỏ đều chiếu) cho chuyên đề
// "Sát Cục Liên Hoàn 1-10 Nước". Chứng minh (không ước lượng): Đỏ chiếu hết trong ≤ n nước với MỌI cách đỡ của Đen.
//
//   node tools/sat-cuc-lien-hoan/solve.mjs <probs.json> <out.json> [shard/total] [giây/bài]
//
// probs.json: [{ch, n, fen, ...}] (n = số nước sách ghi theo chương `ch`). out.json: thêm
//   { k, main:[iccs...], alts:{ply: [iccs...]}, ms } — k = số nước Đỏ ít nhất; main = mạch chính (Đen đỡ DAI nhất);
//   alts = các nước Đỏ khác cũng chiếu hết đúng hạn tại ply đó (lời giải không duy nhất).
//   { err } nếu không chứng minh được trong ≤ ch nước hoặc hết giờ.
import fs from 'fs';
import { loadFen, stateFrom, legalMovesSt, inCheckSt, toIccs } from '../../resources/js/engine/engine.js';

const VAL = { K: 0, A: 2, B: 2, N: 4, R: 9, C: 4.5, P: 1 };

function mk(st, m) {
    const p = st.b[m[0]], cap = st.b[m[1]];
    st.b[m[1]] = p; st.b[m[0]] = null;
    if (p === 'K') st.kR = m[1]; else if (p === 'k') st.kB = m[1];
    if (cap === 'K') st.kR = -1; else if (cap === 'k') st.kB = -1;
    return cap;
}
function unmk(st, m, cap) {
    const p = st.b[m[1]];
    st.b[m[0]] = p; st.b[m[1]] = cap;
    if (p === 'K') st.kR = m[0]; else if (p === 'k') st.kB = m[0];
}

const TIMEOUT = { timeout: true };

export function solver(fen, deadline, quiet = 0) {
    const st = stateFrom(loadFen(fen));
    const win = new Map();   // key → số nước nhỏ nhất ĐÃ chứng minh thắng
    const lose = new Map();  // key → số nước lớn nhất ĐÃ chứng minh KHÔNG thắng
    let nodes = 0;
    const key = () => st.b.map((p) => p || '.').join('');

    // Nước Đỏ được xét: nước chiếu; khi còn hạn mức nước êm (q > 0) thì thêm nước êm (xếp sau).
    function checks(q = 0) {
        const out = [];
        for (const m of legalMovesSt(st, true)) {
            const c = mk(st, m);
            const chk = inCheckSt(st, false);
            if (chk || q > 0) out.push([m, (chk ? 100 : 0) + (c ? VAL[c.toUpperCase()] : 0)]);
            unmk(st, m, c);
        }
        return out.sort((a, b) => b[1] - a[1]).map((x) => x[0]);
    }
    function replies() {
        const ms = legalMovesSt(st, false);
        // Thử Tướng chạy + ăn quân trước: hay là cách đỡ phá được lời giải → cắt nhánh sớm.
        return ms.map((m) => [m, (st.b[m[0]] === 'k' ? 20 : 0) + (st.b[m[1]] ? VAL[st.b[m[1]]] : 0)])
            .sort((a, b) => b[1] - a[1]).map((x) => x[0]);
    }
    // Đen tới lượt, Đỏ còn n-1 nước (q nước êm). true = Đen đỡ được. Hết nước đi = thua (cờ tướng).
    function defended(n, q = quiet) {
        const rs = replies();
        if (!rs.length) return false;
        if (n <= 1) return true;
        for (const r of rs) {
            const c = mk(st, r);
            const ok = attack(n - 1, q);
            unmk(st, r, c);
            if (!ok) return true;
        }
        return false;
    }
    // Đỏ tới lượt: chiếu hết được trong ≤ n nước? (toàn nước chiếu, trừ tối đa q nước êm)
    function attack(n, q = quiet) {
        if ((++nodes & 1023) === 0 && Date.now() > deadline) throw TIMEOUT;
        const k = key() + q;
        const w = win.get(k); if (w !== undefined && w <= n) return true;
        const l = lose.get(k); if (l !== undefined && l >= n) return false;
        let res = false;
        for (const m of checks(q)) {
            const c = mk(st, m);
            const chk = inCheckSt(st, false);
            const ok = !defended(n, chk ? q : q - 1);
            unmk(st, m, c);
            if (ok) { res = true; break; }
        }
        if (res) win.set(k, Math.min(n, w ?? n)); else lose.set(k, Math.max(n, l ?? n));
        return res;
    }
    function dist(max, q = quiet) { for (let j = 1; j <= max; j++) if (attack(j, q)) return j; return 0; }

    // Mạch chính: Đỏ đi nước thắng nhanh nhất, Đen đỡ dai nhất (hoà điểm: ưu tiên nước ăn quân — tự nhiên hơn).
    function line(k) {
        const main = [], alts = {};
        let q = quiet;
        for (let left = k; left >= 1; left--) {
            const good = [];
            for (const m of checks(q)) {
                const c = mk(st, m);
                const chk = inCheckSt(st, false);
                if (!defended(left, chk ? q : q - 1)) good.push([m, chk]);
                unmk(st, m, c);
            }
            if (!good.length) throw new Error('mất đường thắng');
            // Ưu tiên nước chiếu (đúng tinh thần liên hoàn), nước êm chỉ khi bắt buộc.
            good.sort((a, b) => b[1] - a[1]);
            const [mv, chk] = good[0];
            if (!chk) q--;
            if (good.length > 1) alts[main.length + 1] = good.slice(1).map(([m]) => toIccs(m[0], m[1]));
            main.push(toIccs(mv[0], mv[1])); mk(st, mv);
            if (left === 1) break;
            let best = null, bd = -1, bcap = -1;
            for (const r of replies()) {
                const c = mk(st, r);
                const d = dist(left - 1, q);
                unmk(st, r, c);
                const cv = c ? VAL[c.toUpperCase()] : 0;
                if (d > bd || (d === bd && cv > bcap)) { best = r; bd = d; bcap = cv; }
            }
            main.push(toIccs(best[0], best[1])); mk(st, best);
            left = bd + 1;
        }
        return { main, alts };
    }

    return { solve(maxN) { const k = dist(maxN); if (!k) return null; return { k, quiet, ...line(k), nodes }; }, nodes: () => nodes };
}

// ---- CLI ----
if (process.argv[1] && process.argv[1].endsWith('solve.mjs')) {
    const [inp, out, shard = '0/1', secs = '120', quiet = '0', extraN = '0'] = process.argv.slice(2);
    const [si, sn] = shard.split('/').map(Number);
    const probs = JSON.parse(fs.readFileSync(inp, 'utf8'));
    const done = fs.existsSync(out) ? JSON.parse(fs.readFileSync(out, 'utf8')) : {};
    probs.forEach((p, idx) => {
        if (idx % sn !== si) return;
        const id = `${p.ch}-${p.n}${p.extra ? '-' + p.extra : ''}`;
        if (done[id] && !done[id].err) return;
        const b = loadFen(p.fen);
        if (b.indexOf('K') < 0 || b.indexOf('k') < 0) { done[id] = { err: 'thiếu Tướng' }; return; }
        const t0 = Date.now();
        try {
            const r = solver(p.fen, t0 + secs * 1000, +quiet).solve(Math.max(p.ch, 1) + (p.extra ? 2 : 0) + +extraN);
            done[id] = r ? { ...r, ms: Date.now() - t0 } : { err: 'không chứng minh được (liên chiếu)', ms: Date.now() - t0 };
        } catch (e) {
            done[id] = { err: e === TIMEOUT ? 'hết giờ' : String(e.message || e), ms: Date.now() - t0 };
        }
        const r = done[id];
        console.log(id, r.err ? 'ERR ' + r.err : `k=${r.k} ${r.main.join(' ')}`, r.ms + 'ms');
        fs.writeFileSync(out, JSON.stringify(done));
    });
}
