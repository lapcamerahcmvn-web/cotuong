// Engine cờ tướng + CỜ ÚP (chạy trong Web Worker): sinh nước hợp lệ, đánh giá thế cờ,
// tìm kiếm negamax alpha-beta + quiescence + iterative deepening + killer moves.
// Bàn = mảng 90 ô, index = hàng*9 + cột, hàng 0 = trên (Đen), chữ HOA = Đỏ (giống FEN / board.js).
//
// Cờ úp: quân úp ghi 'X' (Đỏ) / 'x' (Đen) trên bàn CÔNG KHAI. Trạng thái nội bộ `st = {b, h, coup}`:
//   b[i] = quân (danh tính thật nếu biết, hoặc 'X'/'x' nếu chưa biết), h[i] = 1 nếu đang úp.
//   Quân úp đi theo binh chủng của ô xuất phát (ROLE), lật lộ mặt ngay khi đi. Sau khi lật,
//   Sĩ/Tượng không bị giới hạn cung/sông. Hết nước mà không bị chiếu = HOÀ (cờ tướng: thua).
// Máy KHÔNG nhìn quân úp: thinkCoup() thử nhiều cách xếp ngẫu nhiên các quân chưa lộ (determinization).

export const START_FEN = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';
export const COUP_FEN = 'xxxxkxxxx/9/1x5x1/x1x1x1x1x/9/9/X1X1X1X1X/1X5X1/9/XXXXKXXXX';
export const COUP_SET = ['A', 'A', 'B', 'B', 'N', 'N', 'R', 'R', 'C', 'C', 'P', 'P', 'P', 'P', 'P'];
const MATE = 100000;

export function loadFen(fen) {
    const b = new Array(90).fill(null);
    const rows = String(fen).split(' ')[0].split('/');
    for (let r = 0; r < 10; r++) {
        let f = 0;
        for (const ch of rows[r] || '') {
            if (ch >= '1' && ch <= '9') f += +ch;
            else { b[r * 9 + f] = ch; f++; }
        }
    }
    return b;
}

export function toFen(b) {
    const out = [];
    for (let r = 0; r < 10; r++) {
        let s = '', e = 0;
        for (let c = 0; c < 9; c++) {
            const p = b[r * 9 + c];
            if (!p) e++;
            else { if (e) { s += e; e = 0; } s += p; }
        }
        out.push(s + (e || ''));
    }
    return out.join('/');
}

export const isRed = (p) => p === p.toUpperCase();
export const isHiddenChar = (p) => p === 'X' || p === 'x';
export const toIccs = (from, to) => String.fromCharCode(97 + (from % 9)) + (9 - ((from / 9) | 0)) + String.fromCharCode(97 + (to % 9)) + (9 - ((to / 9) | 0));
export function fromIccs(s) {
    const i = (a, d) => (9 - (d.charCodeAt(0) - 48)) * 9 + (a.charCodeAt(0) - 97);
    return [i(s[0], s[1]), i(s[2], s[3])];
}

/** Binh chủng theo ô xuất phát (quân úp luôn đứng trên ô xuất phát của nó). */
const BACK = ['R', 'N', 'B', 'A', 'K', 'A', 'B', 'N', 'R'];
export const ROLE = new Array(90).fill(null).map((_, i) => {
    const r = (i / 9) | 0, c = i % 9;
    if (r === 0 || r === 9) return BACK[c];
    if ((r === 2 || r === 7) && (c === 1 || c === 7)) return 'C';
    if ((r === 3 || r === 6) && c % 2 === 0) return 'P';
    return null;
});

/** Bàn công khai → trạng thái nội bộ (quân 'X'/'x' = úp chưa rõ danh tính). */
export function stateFrom(board, coup = false) {
    const b = board.slice();
    const h = b.map((p) => (p && isHiddenChar(p) ? 1 : 0));
    return withKings({ b, h, coup: coup || h.some(Boolean) });
}

/** Ghi nhớ vị trí 2 Tướng (kR, kB) để kiểm tra chiếu không phải quét cả bàn. */
export function withKings(st) {
    st.kR = st.b.indexOf('K');
    st.kB = st.b.indexOf('k');
    return st;
}

const typeAt = (st, i) => (st.h[i] ? ROLE[i] : st.b[i].toUpperCase());
const inPalace = (r, c, red) => c >= 3 && c <= 5 && (red ? r >= 7 && r <= 9 : r >= 0 && r <= 2);
const ON = (r, c) => r >= 0 && r < 10 && c >= 0 && c < 9;
const ORTH = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const DIAG = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const KNIGHT = [[-2, -1, -1, 0], [-2, 1, -1, 0], [2, -1, 1, 0], [2, 1, 1, 0], [-1, -2, 0, -1], [1, -2, 0, -1], [-1, 2, 0, 1], [1, 2, 0, 1]];

/** Nước giả hợp lệ (chưa lọc tự chiếu). Trả mảng [from, to]. */
function pseudoMoves(st, red, capturesOnly = false) {
    const b = st.b, out = [];
    const push = (f, t) => {
        const q = b[t];
        if (q && isRed(q) === red) return;
        if (capturesOnly && !q) return;
        out.push([f, t]);
    };
    for (let i = 0; i < 90; i++) {
        const p = b[i];
        if (!p || isRed(p) !== red) continue;
        const r = (i / 9) | 0, c = i % 9, t = typeAt(st, i);
        const free = st.coup && !st.h[i];          // Sĩ/Tượng đã lật trong cờ úp: không giới hạn cung/sông
        if (t === 'K') {
            for (const [dr, dc] of ORTH) { const nr = r + dr, nc = c + dc; if (inPalace(nr, nc, red)) push(i, nr * 9 + nc); }
        } else if (t === 'A') {
            for (const [dr, dc] of DIAG) {
                const nr = r + dr, nc = c + dc;
                if (free ? ON(nr, nc) : inPalace(nr, nc, red)) push(i, nr * 9 + nc);
            }
        } else if (t === 'B') {
            for (const [dr, dc] of DIAG) {
                const nr = r + 2 * dr, nc = c + 2 * dc;
                if (!ON(nr, nc) || (!free && (red ? nr < 5 : nr > 4)) || b[(r + dr) * 9 + c + dc]) continue;
                push(i, nr * 9 + nc);
            }
        } else if (t === 'N') {
            for (const [dr, dc, lr, lc] of KNIGHT) {
                const nr = r + dr, nc = c + dc;
                if (ON(nr, nc) && !b[(r + lr) * 9 + c + lc]) push(i, nr * 9 + nc);
            }
        } else if (t === 'R' || t === 'C') {
            for (const [dr, dc] of ORTH) {
                let nr = r + dr, nc = c + dc, jumped = false;
                while (ON(nr, nc)) {
                    const q = b[nr * 9 + nc];
                    if (t === 'R') {
                        if (!q) { if (!capturesOnly) out.push([i, nr * 9 + nc]); }
                        else { if (isRed(q) !== red) out.push([i, nr * 9 + nc]); break; }
                    } else if (!jumped) {
                        if (!q) { if (!capturesOnly) out.push([i, nr * 9 + nc]); } else jumped = true;
                    } else if (q) {
                        if (isRed(q) !== red) out.push([i, nr * 9 + nc]);
                        break;
                    }
                    nr += dr; nc += dc;
                }
            }
        } else if (t === 'P') {
            const fr = red ? r - 1 : r + 1;
            if (ON(fr, c)) push(i, fr * 9 + c);
            if (red ? r <= 4 : r >= 5) {
                if (c > 0) push(i, r * 9 + c - 1);
                if (c < 8) push(i, r * 9 + c + 1);
            }
        }
    }
    return out;
}

function findKing(b, red) {
    const k = red ? 'K' : 'k';
    for (let i = 0; i < 90; i++) if (b[i] === k) return i;
    return -1;
}

/** Ô `sq` có bị bên `byRed` tấn công không (kể cả lộ mặt tướng). */
function attacked(st, sq, byRed) {
    const b = st.b;
    const r = (sq / 9) | 0, c = sq % 9;
    const own = (i) => b[i] && isRed(b[i]) === byRed;
    for (const [dr, dc] of ORTH) {
        let nr = r + dr, nc = c + dc, screen = false;
        while (ON(nr, nc)) {
            const i = nr * 9 + nc;
            if (b[i]) {
                if (!screen) {
                    if (own(i)) {
                        const t = typeAt(st, i);
                        if (t === 'R') return true;
                        if (t === 'K' && dc === 0) return true;          // lộ mặt tướng
                    }
                    screen = true;
                } else {
                    if (own(i) && typeAt(st, i) === 'C') return true;
                    break;
                }
            }
            nr += dr; nc += dc;
        }
    }
    // Tốt: Đỏ tiến lên (hàng giảm), Đen tiến xuống; đã qua sông thì ăn ngang được.
    const isPawn = (i) => own(i) && typeAt(st, i) === 'P';
    if (byRed ? (r + 1 <= 9 && isPawn((r + 1) * 9 + c)) : (r - 1 >= 0 && isPawn((r - 1) * 9 + c))) return true;
    if (byRed ? r <= 4 : r >= 5) {
        if (c > 0 && isPawn(r * 9 + c - 1)) return true;
        if (c < 8 && isPawn(r * 9 + c + 1)) return true;
    }
    // Mã: mã ở (r+dr, c+dc) nhảy tới (r,c); chân mã nằm cạnh con mã theo trục dài.
    for (const [dr, dc] of [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [1, -2], [-1, 2], [1, 2]]) {
        const nr = r + dr, nc = c + dc;
        if (!ON(nr, nc)) continue;
        const i = nr * 9 + nc;
        if (!own(i) || typeAt(st, i) !== 'N') continue;
        const lr = Math.abs(dr) === 2 ? nr - Math.sign(dr) : nr, lc = Math.abs(dc) === 2 ? nc - Math.sign(dc) : nc;
        if (!b[lr * 9 + lc]) return true;
    }
    // Cờ úp: Sĩ/Tượng đã lật đi khắp bàn nên có thể chiếu Tướng.
    if (st.coup) {
        for (const [dr, dc] of DIAG) {
            const a = r + dr, b2 = c + dc;
            if (ON(a, b2) && own(a * 9 + b2) && !st.h[a * 9 + b2] && typeAt(st, a * 9 + b2) === 'A') return true;
            const e = r + 2 * dr, f = c + 2 * dc;
            if (ON(e, f) && own(e * 9 + f) && !st.h[e * 9 + f] && typeAt(st, e * 9 + f) === 'B' && !b[a * 9 + b2]) return true;
        }
    }
    return false;
}

export function inCheckSt(st, red) {
    const k = red ? st.kR : st.kB;
    return k < 0 ? true : attacked(st, k, !red);
}

/** Đi nước trên trạng thái; trả "undo" để hoàn lại. Quân úp đi → lật (h=0). */
function make(st, m) {
    const p = st.b[m[0]];
    const u = [st.b[m[1]], st.h[m[1]], st.h[m[0]]];
    st.b[m[1]] = p; st.h[m[1]] = 0;
    st.b[m[0]] = null; st.h[m[0]] = 0;
    if (p === 'K') st.kR = m[1]; else if (p === 'k') st.kB = m[1];
    else if (u[0] === 'K') st.kR = -1; else if (u[0] === 'k') st.kB = -1;
    return u;
}
function unmake(st, m, u) {
    const p = st.b[m[1]];
    st.b[m[0]] = p; st.h[m[0]] = u[2];
    st.b[m[1]] = u[0]; st.h[m[1]] = u[1];
    if (p === 'K') st.kR = m[0]; else if (p === 'k') st.kB = m[0];
    if (u[0] === 'K') st.kR = m[1]; else if (u[0] === 'k') st.kB = m[1];
}

export function legalMovesSt(st, red, capturesOnly = false) {
    const out = [];
    for (const m of pseudoMoves(st, red, capturesOnly)) {
        const u = make(st, m);
        if (!inCheckSt(st, red)) out.push(m);
        unmake(st, m, u);
    }
    return out;
}

// Tiện ích cho bàn cờ tướng thường (không úp) — giữ API cũ.
export const legalMoves = (b, red, capturesOnly = false) => legalMovesSt(stateFrom(b), red, capturesOnly);
export const inCheck = (b, red) => inCheckSt(stateFrom(b), red);

/* ---------------- Đánh giá ---------------- */
const VAL = { K: 0, A: 200, B: 200, N: 400, R: 900, C: 450, P: 100 };
const HIDDEN_VAL = 330;   // giá trị kỳ vọng của 1 quân úp chưa rõ danh tính
function pst(t, r, c, red) {
    const rr = red ? r : 9 - r;            // hàng tính từ phía mình: 9 = hàng cuối của mình
    const center = 4 - Math.abs(c - 4);
    switch (t) {
        case 'P': return rr === 0 ? 15 : rr <= 4 ? 70 + (4 - rr) * 12 + center * 8 : 0;   // hàng đáy đối phương = lão tốt
        case 'N': return center * 8 + (rr <= 6 ? 15 : 0) - (rr === 9 ? 15 : 0);
        case 'C': return (c === 4 ? 20 : 0) + (rr === 7 ? 5 : 0) + (rr <= 2 ? 10 : 0);
        case 'R': return (rr <= 6 ? 15 : 0) + (c === 3 || c === 5 ? 6 : 0);
        case 'K': return c === 4 ? 6 : 0;
        default: return 0;
    }
}

/*
 * Cờ úp — giá trị VỊ TRÍ của quân giả theo ô xuất phát (lý thuyết: "vị trí Xe giả cực quan trọng", Pháo giả là quân
 * công kích chính; Sĩ/Tượng giả thụ động). Cộng thêm vào giá trị kỳ vọng của túi quân chưa lộ.
 */
const SLOT = { R: 45, C: 40, N: 5, B: -5, A: -10, P: 0 };
const MOB = { R: 5, C: 3, N: 4 };   // điểm mỗi nước đi được — "không gian phát triển là tối thượng"

/** Số ô đi được của Xe/Pháo (theo tia) và Mã (chân không bị cản) — dùng cho cờ úp. */
function mobility(st, i, t) {
    const b = st.b, r = (i / 9) | 0, c = i % 9;
    let n = 0;
    if (t === 'R' || t === 'C') {
        for (const [dr, dc] of ORTH) {
            let nr = r + dr, nc = c + dc;
            while (ON(nr, nc) && !b[nr * 9 + nc]) { n++; nr += dr; nc += dc; }
        }
    } else if (t === 'N') {
        for (const [dr, dc, lr, lc] of KNIGHT) {
            const nr = r + dr, nc = c + dc;
            if (ON(nr, nc) && !b[(r + lr) * 9 + c + lc]) n++;
        }
    }
    return n;
}

function evaluate(st, red) {
    let s = 0;
    for (let i = 0; i < 90; i++) {
        const p = st.b[i];
        if (!p) continue;
        const pr = isRed(p);
        let v;
        if (isHiddenChar(p) || st.h[i]) {
            // Quân còn úp: KHÔNG dùng danh tính thật (kể cả khi trạng thái mẫu biết) — chỉ giá trị kỳ vọng của túi quân
            // chưa lộ + giá trị vị trí ô giả. Tránh "nhìn trộm nắp" (strategy fusion) khi lấy mẫu cách xếp quân.
            const role = ROLE[i];
            v = (pr ? st.hvR : st.hvB) ?? HIDDEN_VAL;
            if (st.coup && role) v += SLOT[role] + (MOB[role] ? MOB[role] * mobility(st, i, role) : 0);
        } else {
            const t = p.toUpperCase();
            v = VAL[t] + pst(t, (i / 9) | 0, i % 9, pr);
            if (st.coup) {
                if (t === 'A' || t === 'B') v += 40;                              // Sĩ/Tượng tự do trong cờ úp
                if (MOB[t]) v += MOB[t] * mobility(st, i, t);
            }
        }
        s += pr ? v : -v;
    }
    return red ? s : -s;
}

/** Giá trị kỳ vọng 1 quân úp của mỗi bên theo túi quân chưa lộ (theo hiểu biết của bên đang tính). */
function hiddenValues(pools) {
    const ev = (list) => (list && list.length ? list.reduce((a, t) => a + VAL[t.toUpperCase()], 0) / list.length : HIDDEN_VAL);
    return { hvR: ev(pools?.red), hvB: ev(pools?.black) };
}

/* ---------------- Tìm kiếm ---------------- */
// Zobrist: mỗi (ô, loại quân, úp?) một cặp số ngẫu nhiên 32-bit; khoá thế = XOR các cặp.
const KIND = { K: 0, A: 1, B: 2, N: 3, R: 4, C: 5, P: 6, X: 7, k: 8, a: 9, b: 10, n: 11, r: 12, c: 13, p: 14, x: 15 };
const Z1 = new Int32Array(90 * 32), Z2 = new Int32Array(90 * 32);
(function seed() {
    let x = 0x2545f491;
    const rnd = () => { x ^= x << 13; x ^= x >>> 17; x ^= x << 5; return x | 0; };
    for (let i = 0; i < Z1.length; i++) { Z1[i] = rnd(); Z2[i] = rnd(); }
})();
const zi = (sq, p, hid) => sq * 32 + KIND[p] + (hid ? 16 : 0);
const SIDE1 = 0x5bd1e995, SIDE2 = 0x1b873593;
const EXACT = 0, LOWER = 1, UPPER = 2;
// Bảng chuyển vị dạng mảng số cố định (2^18 ô, ~4MB) — dùng chung giữa các lần tìm (khoá đã gồm danh
// tính quân + lượt đi nên dùng lại an toàn). Ô = khoá & MASK; kiểm khớp bằng cả 2 nửa khoá.
const TT_BITS = 18, TT_SIZE = 1 << TT_BITS, TT_MASK = TT_SIZE - 1;
const ttK1 = new Int32Array(TT_SIZE), ttK2 = new Int32Array(TT_SIZE), ttScore = new Int32Array(TT_SIZE);
const ttDepth = new Int8Array(TT_SIZE).fill(-1), ttFlag = new Int8Array(TT_SIZE), ttMove = new Int16Array(TT_SIZE).fill(-1);
let H1 = 0, H2 = 0;   // kết quả hashAfter (tránh cấp phát mảng)
const VICTIM = { K: 10000, R: 900, C: 450, N: 400, A: 200, B: 200, P: 100, X: 330 };
const vOf = (p) => VICTIM[p.toUpperCase()] || 300;
function order(st, moves, killers, best) {
    return moves.map((m) => {
        let k = 0;
        if (best && m[0] === best[0] && m[1] === best[1]) k = 1e6;
        else if (st.b[m[1]]) k = 1e4 + vOf(st.b[m[1]]) * 10 - vOf(st.b[m[0]]) / 10;
        else if (killers && killers.some((x) => x && x[0] === m[0] && x[1] === m[1])) k = 5e3;
        return [k, m];
    }).sort((a, c) => c[0] - a[0]).map((x) => x[1]);
}

/**
 * Tìm nước tốt nhất. `input` là FEN (cờ tướng) hoặc trạng thái `{b,h,coup}`.
 * Trả { move, score, depth, nodes, scores } — scores = điểm từng nước gốc ở độ sâu xong cuối.
 */
export function search(input, red, opts = {}) {
    const st = typeof input === 'string' ? stateFrom(loadFen(input)) : (input.kR === undefined ? withKings(input) : input);
    const maxDepth = opts.depth || 3;
    const deadline = Date.now() + (opts.timeMs || 1500);
    const noise = opts.noise || 0;
    let nodes = 0, stop = false;
    const killers = [];
    let h1 = 0, h2 = 0;
    for (let i = 0; i < 90; i++) if (st.b[i]) { const k = zi(i, st.b[i], st.h[i]); h1 ^= Z1[k]; h2 ^= Z2[k]; }
    if (!red) { h1 ^= SIDE1; h2 ^= SIDE2; }
    if (st.coup) { h1 ^= 0x27d4eb2f; h2 ^= 0x165667b1; }   // luật cờ úp khác cờ tướng → không dùng chung kết quả
    // Băm sau khi đi nước m (tính TRƯỚC khi make) → H1/H2: quân rời ô gốc, (bị ăn) rời ô đích, quân tới ô đích đã lật.
    function hashAfter(m, a, b) {
        const p = st.b[m[0]], c = st.b[m[1]];
        let k = zi(m[0], p, st.h[m[0]]); a ^= Z1[k]; b ^= Z2[k];
        if (c) { k = zi(m[1], c, st.h[m[1]]); a ^= Z1[k]; b ^= Z2[k]; }
        k = zi(m[1], p, 0); H1 = a ^ Z1[k] ^ SIDE1; H2 = b ^ Z2[k] ^ SIDE2;
    }

    function terminal(side, ply) {
        // Cờ tướng: hết nước = thua. Cờ úp: hết nước mà không bị chiếu = hoà.
        return st.coup && !inCheckSt(st, side) ? 0 : -MATE + ply;
    }

    function quiesce(alpha, beta, side, qd) {
        if ((++nodes & 1023) === 0 && Date.now() > deadline) stop = true;
        const checked = qd < 4 && inCheckSt(st, side);
        if (!checked) {
            const stand = evaluate(st, side);
            if (stand >= beta) return beta;
            if (alpha < stand) alpha = stand;
            if (qd >= 6 || stop) return alpha;
        }
        let legal = 0;
        for (const m of order(st, pseudoMoves(st, side, !checked))) {
            const u = make(st, m);
            if (inCheckSt(st, side)) { unmake(st, m, u); continue; }
            legal++;
            const sc = -quiesce(-beta, -alpha, !side, qd + 1);
            unmake(st, m, u);
            if (sc >= beta) return beta;
            if (sc > alpha) alpha = sc;
        }
        if (checked && !legal) return terminal(side, 30 + qd);
        return alpha;
    }

    function negamax(depth, alpha, beta, side, ply, a1, a2) {
        if ((++nodes & 1023) === 0 && Date.now() > deadline) stop = true;
        if (stop) return 0;
        if (depth <= 0) return quiesce(alpha, beta, side, 0);
        const slot = a2 & TT_MASK;
        let hint = null;
        if (ttK1[slot] === a1 && ttK2[slot] === a2 && ttDepth[slot] >= 0) {
            const mv = ttMove[slot];
            if (mv >= 0) hint = [(mv / 90) | 0, mv % 90];
            if (ttDepth[slot] >= depth) {
                const sc = ttScore[slot], fl = ttFlag[slot];
                if (fl === EXACT) return sc;
                if (fl === LOWER && sc > alpha) alpha = sc;
                else if (fl === UPPER && sc < beta) beta = sc;
                if (alpha >= beta) return sc;
            }
        }
        const alpha0 = alpha;
        let best = -Infinity, legal = 0, bestM = null;
        for (const m of order(st, pseudoMoves(st, side), killers[ply], hint)) {
            const cap = st.b[m[1]];
            hashAfter(m, a1, a2);
            const n1 = H1, n2 = H2;
            const u = make(st, m);
            if (inCheckSt(st, side)) { unmake(st, m, u); continue; }
            legal++;
            const sc = -negamax(depth - 1, -beta, -alpha, !side, ply + 1, n1, n2);
            unmake(st, m, u);
            if (stop) return 0;
            if (sc > best) { best = sc; bestM = m; }
            if (sc > alpha) alpha = sc;
            if (alpha >= beta) {
                if (!cap) killers[ply] = [m, (killers[ply] || [])[0]];
                break;
            }
        }
        if (!legal) return terminal(side, ply);
        if (ttDepth[slot] <= depth || ttK1[slot] !== a1) {   // thay khi sâu hơn hoặc khác thế
            ttK1[slot] = a1; ttK2[slot] = a2; ttDepth[slot] = depth;
            ttScore[slot] = Math.max(-2e9, Math.min(2e9, best));
            ttFlag[slot] = best <= alpha0 ? UPPER : best >= beta ? LOWER : EXACT;
            ttMove[slot] = bestM ? bestM[0] * 90 + bestM[1] : -1;
        }
        return best;
    }

    // opts.avoid: nước bị cấm ở gốc (chiếu dai lần thứ 3) — nếu chỉ còn nước bị cấm thì vẫn phải đi.
    const all = legalMovesSt(st, red);
    const allowed = opts.avoid?.size ? all.filter((m) => !opts.avoid.has(toIccs(m[0], m[1]))) : all;
    const root = allowed.length ? allowed : all;
    if (!root.length) return { move: null, score: terminal(red, 0), depth: 0, nodes, scores: {} };
    let bestMove = root[0], bestScore = -Infinity, reached = 0, scores = {};
    for (let d = 1; d <= maxDepth; d++) {
        let alpha = -Infinity, curBest = null, curScore = -Infinity;
        const cur = {};
        for (const m of order(st, root, killers[0], bestMove)) {
            hashAfter(m, h1, h2);
            const n1 = H1, n2 = H2;
            const u = make(st, m);
            // exactRoot: mỗi nước gốc tìm với cửa sổ đầy đủ → điểm chính xác, không phải cận trên alpha-beta.
            let sc = -negamax(d - 1, -Infinity, opts.exactRoot ? Infinity : -alpha, !red, 1, n1, n2);
            unmake(st, m, u);
            if (stop) break;
            if (noise) sc += Math.round((Math.random() - 0.5) * noise);
            cur[toIccs(m[0], m[1])] = sc;
            if (sc > curScore) { curScore = sc; curBest = m; }
            if (sc > alpha) alpha = sc;
        }
        if (stop && d > 1) break;
        if (curBest) { bestMove = curBest; bestScore = curScore; reached = d; scores = cur; }
        if (Math.abs(bestScore) > MATE - 100) break;    // đã thấy chiếu hết
        if (Date.now() > deadline) break;
    }
    return { move: toIccs(bestMove[0], bestMove[1]), score: bestScore, depth: reached, nodes, scores };
}

/** Cấp độ máy: độ sâu, thời gian, độ "nhiễu" (đi kém cố ý), xác suất đi bừa, số mẫu xếp quân úp. */
export const LEVELS = {
    1: { name: 'Tập sự', depth: 1, timeMs: 300, noise: 260, random: 0.35, samples: 1 },
    2: { name: 'Dễ', depth: 2, timeMs: 700, noise: 90, random: 0.08, samples: 4, coupDepth: 2, coupTimeMs: 900, coupNoise: 30, coupRandom: 0.03 },
    3: { name: 'Vừa', depth: 3, timeMs: 1500, noise: 20, random: 0, samples: 6, coupDepth: 3, coupTimeMs: 2000 },
    4: { name: 'Khó', depth: 6, timeMs: 3000, noise: 0, random: 0, samples: 6, coupDepth: 5, coupTimeMs: 4500 },
};

function randomMove(st, red, avoid = null) {
    let ms = legalMovesSt(st, red);
    if (avoid?.size) { const ok = ms.filter((m) => !avoid.has(toIccs(m[0], m[1]))); if (ok.length) ms = ok; }
    if (!ms.length) return null;
    const caps = ms.filter((m) => st.b[m[1]]);
    const pool = caps.length && Math.random() < 0.5 ? caps : ms;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    return { move: toIccs(pick[0], pick[1]), score: 0, depth: 0, nodes: 0 };
}

export function think(fen, red, level, avoid = null) {
    const L = LEVELS[level] || LEVELS[2];
    const st = stateFrom(loadFen(fen));
    if (L.random && Math.random() < L.random) {
        const r = randomMove(st, red, avoid);
        if (r) return r;
    }
    return search(st, red, { ...L, avoid });
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
}

/**
 * Nguyên lý khai cuộc CỜ ÚP (bài học trên site: "thế trước quân sau", "chỉ vật Pháo giả khi đủ lực", "đấm tốt Biên,
 * đừng vội mở tốt trung lộ", "ưu tiên mở quân hàng trên"). Chỉ áp dụng giai đoạn khai cuộc (≥ 24 quân còn úp ≈ 5 nước
 * đầu mỗi bên). Trả hàm iccs → điểm cộng/trừ cho nước gốc.
 */
export function coupOpeningPrior(pub, red) {
    const hidden = pub.filter(isHiddenChar).length;
    if (hidden < 24) return () => 0;
    const st = stateFrom(pub, true);
    return (mv) => {
        const [f, t] = fromIccs(mv);
        const p = st.b[f];
        if (!p || !st.h[f]) return 0;                 // chỉ xét nước MỞ quân úp
        const role = ROLE[f], c = f % 9, target = st.b[t];
        if (target && st.h[t]) {
            // Quân giả ăn nắp: chỉ đáng khi đối phương không ăn lại được ngay ("vật khi đủ lực").
            const u = make(st, [f, t]);
            const recapture = attacked(st, t, !red);
            unmake(st, [f, t], u);
            return recapture ? -200 : 0;
        }
        if (target) return 0;
        if (role === 'P') return c === 0 || c === 8 ? 35 : c === 4 ? -35 : 10;   // tốt Biên / tốt đầu / tốt 3-7
        if (role === 'C') return 15;                                            // mở Pháo hàng trên
        return 0;
    };
}

/**
 * Lấy mẫu PHÂN TẦNG cách xếp quân úp: mỗi bên xếp các ô úp theo 1 thứ tự ngẫu nhiên và túi quân theo 1 thứ tự ngẫu
 * nhiên; mẫu k xoay túi đi floor(k·m/K) vị trí → qua K mẫu, MỖI ô úp nhận lần lượt các quân rải đều khắp túi (thay vì
 * bốc ngẫu nhiên độc lập). Giảm mạnh phương sai ở nút lật quân (Xe vs Tốt chênh 800 điểm) — 2 nước đối xứng cho điểm
 * gần như bằng nhau. Trong 1 mẫu các ô nhận quân KHÁC nhau của túi → cách xếp luôn hợp lệ.
 */
function stratifier(pub, pools) {
    const side = (ch, list) => {
        const sq = shuffle(pub.map((p, i) => (p === ch ? i : -1)).filter((i) => i >= 0));
        return { sq, bag: shuffle((list || []).slice()) };
    };
    const R = side('X', pools?.red), B = side('x', pools?.black);
    return {
        assign(st, k, K) {
            for (const [S, red] of [[R, true], [B, false]]) {
                const m = S.bag.length, shift = m ? Math.floor((k * m) / K) : 0;
                S.sq.forEach((i, j) => {
                    const t = j < m ? S.bag[(j + shift) % m] : 'P';
                    st.b[i] = red ? t : t.toLowerCase();
                });
            }
        },
    };
}

/**
 * Cờ úp: `publicFen` có quân 'X'/'x' chưa rõ; `pools` = { red: ['R','C',...], black: [...] } là các
 * binh chủng CHƯA LỘ của mỗi bên (máy chỉ biết bao nhiêu, không biết quân nào ở đâu).
 * Thử nhiều cách xếp ngẫu nhiên, cộng điểm từng nước gốc, chọn nước tốt nhất trung bình.
 */
export function thinkCoup(publicFen, pools, red, level, avoid = null) {
    const L = LEVELS[level] || LEVELS[2];
    const pub = loadFen(publicFen);
    const base = stateFrom(pub, true);
    const hv = hiddenValues(pools);
    const strata = stratifier(pub, pools);
    const rnd = L.coupRandom ?? L.random;
    if (rnd && Math.random() < rnd) {
        const r = randomMove(base, red, avoid);
        if (r) return r;
    }
    const samples = Math.max(1, L.samples || 1);
    const total = {}, count = {};
    let nodes = 0, depth = 0;
    for (let k = 0; k < samples; k++) {
        const st = withKings({ b: pub.slice(), h: base.h.slice(), coup: true, ...hv });
        strata.assign(st, k, samples);
        const res = search(st, red, { depth: L.coupDepth || L.depth, timeMs: Math.round((L.coupTimeMs || L.timeMs) / samples), noise: L.coupNoise ?? L.noise, exactRoot: true, avoid });
        nodes += res.nodes; depth = Math.max(depth, res.depth);
        if (!res.move) return { move: null, score: res.score, depth: 0, nodes };
        // Kẹp điểm: 1 cách xếp "may mắn" thấy chiếu hết không được lấn át trung bình các cách xếp khác.
        for (const [m, sc] of Object.entries(res.scores || {})) {
            const v = Math.max(-5000, Math.min(5000, sc));
            total[m] = (total[m] || 0) + v; count[m] = (count[m] || 0) + 1;
        }
    }
    let best = null, bestAvg = -Infinity;
    const prior = coupOpeningPrior(pub, red);
    for (const m of Object.keys(total)) {
        const avg = total[m] / count[m] + (count[m] < samples ? -50 : 0) + prior(m);
        if (avg > bestAvg) { bestAvg = avg; best = m; }
    }
    if (!best) { const r = randomMove(base, red, avoid); return r || { move: null, score: 0, depth: 0, nodes }; }
    return { move: best, score: Math.round(bestAvg), depth, nodes };
}

/** Kết thúc ván (dùng chung bot / kiểm tra): null nếu chưa hết. */
export function gameOver(board, redToMove, coup) {
    const st = stateFrom(board, coup);
    if (legalMovesSt(st, redToMove).length) return null;
    const check = inCheckSt(st, redToMove);
    if (!check && st.coup) return { winner: null, reason: 'hết nước đi (hoà theo luật cờ úp)' };
    return { winner: redToMove ? 'den' : 'do', reason: check ? 'chiếu hết' : 'hết nước đi' };
}

/**
 * Phân tích ván (Game Review): điểm CHÍNH XÁC của mọi nước tại 1 thế (exactRoot), nhìn từ bên đi.
 * Cờ úp: lấy mẫu cách xếp quân úp từ `pools` rồi lấy trung bình (kẹp ±5000 như thinkCoup).
 * Trả { best, score, scores:{iccs:điểm}, depth } — best null nếu hết nước (score = kết cục).
 */
export function review(fen, red, opts = {}) {
    const timeMs = opts.timeMs || 700;
    const pub = loadFen(fen);
    const coup = pub.some(isHiddenChar) || !!opts.coup;
    if (!coup) {
        const r = search(stateFrom(pub), red, { depth: opts.depth || 5, timeMs, exactRoot: true });
        return { best: r.move, score: r.score, scores: r.scores || {}, depth: r.depth };
    }
    const base = stateFrom(pub, true);
    const hv = hiddenValues(opts.pools);
    const samples = opts.samples || 4;
    const strata = stratifier(pub, opts.pools);
    const total = {}, count = {};
    let depth = 0, terminal = null;
    for (let k = 0; k < samples; k++) {
        const st = withKings({ b: pub.slice(), h: base.h.slice(), coup: true, ...hv });
        strata.assign(st, k, samples);
        const r = search(st, red, { depth: opts.depth || 4, timeMs: Math.round(timeMs / samples), exactRoot: true });
        if (!r.move) { terminal = r.score; break; }
        depth = Math.max(depth, r.depth);
        for (const [m, sc] of Object.entries(r.scores || {})) {
            total[m] = (total[m] || 0) + Math.max(-5000, Math.min(5000, sc)); count[m] = (count[m] || 0) + 1;
        }
    }
    if (terminal !== null) return { best: null, score: terminal, scores: {}, depth: 0 };
    const scores = {};
    let best = null, bs = -Infinity;
    const prior = coupOpeningPrior(pub, red);
    for (const m of Object.keys(total)) {
        scores[m] = Math.round(total[m] / count[m] + prior(m));
        if (scores[m] > bs) { bs = scores[m]; best = m; }
    }
    return { best, score: bs, scores, depth };
}
