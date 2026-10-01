// Engine cờ tướng gọn nhẹ (chạy trong Web Worker): sinh nước hợp lệ, đánh giá thế cờ,
// tìm kiếm negamax alpha-beta + quiescence + iterative deepening + killer moves.
// Bàn = mảng 90 ô, index = hàng*9 + cột, hàng 0 = trên (Đen), chữ HOA = Đỏ (giống FEN / board.js).

export const START_FEN = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';
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
export const toIccs = (from, to) => String.fromCharCode(97 + (from % 9)) + (9 - ((from / 9) | 0)) + String.fromCharCode(97 + (to % 9)) + (9 - ((to / 9) | 0));
export function fromIccs(s) {
    const i = (a, d) => (9 - (d.charCodeAt(0) - 48)) * 9 + (a.charCodeAt(0) - 97);
    return [i(s[0], s[1]), i(s[2], s[3])];
}

const inPalace = (r, c, red) => c >= 3 && c <= 5 && (red ? r >= 7 && r <= 9 : r >= 0 && r <= 2);
const ON = (r, c) => r >= 0 && r < 10 && c >= 0 && c < 9;
const ORTH = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const DIAG = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const KNIGHT = [[-2, -1, -1, 0], [-2, 1, -1, 0], [2, -1, 1, 0], [2, 1, 1, 0], [-1, -2, 0, -1], [1, -2, 0, -1], [-1, 2, 0, 1], [1, 2, 0, 1]];

/** Nước giả hợp lệ (chưa lọc tự chiếu). Trả mảng [from, to]. */
function pseudoMoves(b, red, capturesOnly = false) {
    const out = [];
    const push = (f, t) => {
        const q = b[t];
        if (q && isRed(q) === red) return;
        if (capturesOnly && !q) return;
        out.push([f, t]);
    };
    for (let i = 0; i < 90; i++) {
        const p = b[i];
        if (!p || isRed(p) !== red) continue;
        const r = (i / 9) | 0, c = i % 9, t = p.toUpperCase();
        if (t === 'K') {
            for (const [dr, dc] of ORTH) { const nr = r + dr, nc = c + dc; if (inPalace(nr, nc, red)) push(i, nr * 9 + nc); }
        } else if (t === 'A') {
            for (const [dr, dc] of DIAG) { const nr = r + dr, nc = c + dc; if (inPalace(nr, nc, red)) push(i, nr * 9 + nc); }
        } else if (t === 'B') {
            for (const [dr, dc] of DIAG) {
                const nr = r + 2 * dr, nc = c + 2 * dc;
                if (!ON(nr, nc) || (red ? nr < 5 : nr > 4) || b[(r + dr) * 9 + c + dc]) continue;
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
function attacked(b, sq, byRed) {
    const r = (sq / 9) | 0, c = sq % 9;
    for (const [dr, dc] of ORTH) {
        let nr = r + dr, nc = c + dc, screen = false;
        while (ON(nr, nc)) {
            const q = b[nr * 9 + nc];
            if (q) {
                if (!screen) {
                    if (isRed(q) === byRed) {
                        const t = q.toUpperCase();
                        if (t === 'R') return true;
                        if (t === 'K' && dc === 0) return true;          // lộ mặt tướng
                    }
                    screen = true;
                } else {
                    if (isRed(q) === byRed && q.toUpperCase() === 'C') return true;
                    break;
                }
            }
            nr += dr; nc += dc;
        }
    }
    // Tốt: Đỏ tiến lên (hàng giảm), Đen tiến xuống; đã qua sông thì ăn ngang được.
    const pawn = byRed ? 'P' : 'p';
    if (byRed ? (r + 1 <= 9 && b[(r + 1) * 9 + c] === pawn) : (r - 1 >= 0 && b[(r - 1) * 9 + c] === pawn)) return true;
    if (byRed ? r <= 4 : r >= 5) {
        if (c > 0 && b[r * 9 + c - 1] === pawn) return true;
        if (c < 8 && b[r * 9 + c + 1] === pawn) return true;
    }
    // Mã: mã ở (r+dr, c+dc) nhảy tới (r,c); chân mã nằm cạnh con mã theo trục dài.
    for (const [dr, dc] of [[-2, -1], [-2, 1], [2, -1], [2, 1], [-1, -2], [1, -2], [-1, 2], [1, 2]]) {
        const nr = r + dr, nc = c + dc;
        if (!ON(nr, nc)) continue;
        const q = b[nr * 9 + nc];
        if (!q || isRed(q) !== byRed || q.toUpperCase() !== 'N') continue;
        const lr = Math.abs(dr) === 2 ? nr - Math.sign(dr) : nr, lc = Math.abs(dc) === 2 ? nc - Math.sign(dc) : nc;
        if (!b[lr * 9 + lc]) return true;
    }
    return false;
}

export function inCheck(b, red) {
    const k = findKing(b, red);
    return k < 0 ? true : attacked(b, k, !red);
}

export function legalMoves(b, red, capturesOnly = false) {
    const out = [];
    for (const m of pseudoMoves(b, red, capturesOnly)) {
        const cap = b[m[1]];
        b[m[1]] = b[m[0]]; b[m[0]] = null;
        if (!inCheck(b, red)) out.push(m);
        b[m[0]] = b[m[1]]; b[m[1]] = cap;
    }
    return out;
}

/* ---------------- Đánh giá ---------------- */
const VAL = { K: 0, A: 200, B: 200, N: 400, R: 900, C: 450, P: 100 };
function pst(t, r, c, red) {
    const rr = red ? r : 9 - r;            // hàng tính từ phía mình: 9 = hàng cuối của mình
    const center = 4 - Math.abs(c - 4);
    switch (t) {
        case 'P': return rr <= 4 ? 70 + (4 - rr) * 12 + (rr >= 1 ? center * 8 : -20) : (rr === 5 || rr === 6 ? 0 : 0);
        case 'N': return center * 8 + (rr <= 6 ? 15 : 0) - (rr === 9 ? 15 : 0);
        case 'C': return (c === 4 ? 20 : 0) + (rr === 7 ? 5 : 0) + (rr <= 2 ? 10 : 0);
        case 'R': return (rr <= 6 ? 15 : 0) + (c === 3 || c === 5 ? 6 : 0);
        case 'K': return c === 4 ? 6 : 0;
        default: return 0;
    }
}

export function evaluate(b, red) {
    let s = 0;
    for (let i = 0; i < 90; i++) {
        const p = b[i];
        if (!p) continue;
        const pr = isRed(p), t = p.toUpperCase();
        const v = VAL[t] + pst(t, (i / 9) | 0, i % 9, pr);
        s += pr ? v : -v;
    }
    return red ? s : -s;
}

/* ---------------- Tìm kiếm ---------------- */
const VICTIM = { K: 10000, R: 900, C: 450, N: 400, A: 200, B: 200, P: 100 };
function order(b, moves, killers, best) {
    return moves.map((m) => {
        let k = 0;
        if (best && m[0] === best[0] && m[1] === best[1]) k = 1e6;
        else if (b[m[1]]) k = 1e4 + VICTIM[b[m[1]].toUpperCase()] * 10 - VICTIM[b[m[0]].toUpperCase()] / 10;
        else if (killers && killers.some((x) => x && x[0] === m[0] && x[1] === m[1])) k = 5e3;
        return [k, m];
    }).sort((a, c) => c[0] - a[0]).map((x) => x[1]);
}

export function search(fen, red, opts = {}) {
    const b = loadFen(fen);
    const maxDepth = opts.depth || 3;
    const deadline = Date.now() + (opts.timeMs || 1500);
    const noise = opts.noise || 0;
    let nodes = 0, stop = false;
    const killers = [];

    function quiesce(alpha, beta, side, qd) {
        const stand = evaluate(b, side);
        if (stand >= beta) return beta;
        if (alpha < stand) alpha = stand;
        if (qd >= 6) return alpha;
        for (const m of order(b, legalMoves(b, side, true))) {
            const cap = b[m[1]];
            b[m[1]] = b[m[0]]; b[m[0]] = null;
            const sc = -quiesce(-beta, -alpha, !side, qd + 1);
            b[m[0]] = b[m[1]]; b[m[1]] = cap;
            if (sc >= beta) return beta;
            if (sc > alpha) alpha = sc;
        }
        return alpha;
    }

    function negamax(depth, alpha, beta, side, ply) {
        if ((++nodes & 1023) === 0 && Date.now() > deadline) stop = true;
        if (stop) return 0;
        const moves = legalMoves(b, side);
        if (!moves.length) return -MATE + ply;          // hết nước = thua (cờ tướng không có hoà do hết nước)
        if (depth <= 0) return quiesce(alpha, beta, side, 0);
        let best = -Infinity;
        for (const m of order(b, moves, killers[ply])) {
            const cap = b[m[1]];
            b[m[1]] = b[m[0]]; b[m[0]] = null;
            const sc = -negamax(depth - 1, -beta, -alpha, !side, ply + 1);
            b[m[0]] = b[m[1]]; b[m[1]] = cap;
            if (stop) return 0;
            if (sc > best) best = sc;
            if (sc > alpha) alpha = sc;
            if (alpha >= beta) {
                if (!cap) killers[ply] = [m, (killers[ply] || [])[0]];
                break;
            }
        }
        return best;
    }

    const root = legalMoves(b, red);
    if (!root.length) return { move: null, score: -MATE, depth: 0, nodes };
    let bestMove = root[0], bestScore = -Infinity, reached = 0;
    for (let d = 1; d <= maxDepth; d++) {
        let alpha = -Infinity, curBest = null, curScore = -Infinity;
        for (const m of order(b, root, killers[0], bestMove)) {
            const cap = b[m[1]];
            b[m[1]] = b[m[0]]; b[m[0]] = null;
            let sc = -negamax(d - 1, -Infinity, -alpha, !red, 1);
            b[m[0]] = b[m[1]]; b[m[1]] = cap;
            if (stop) break;
            if (noise) sc += Math.round((Math.random() - 0.5) * noise);
            if (sc > curScore) { curScore = sc; curBest = m; }
            if (sc > alpha) alpha = sc;
        }
        if (stop && d > 1) break;
        if (curBest) { bestMove = curBest; bestScore = curScore; reached = d; }
        if (Math.abs(bestScore) > MATE - 100) break;    // đã thấy chiếu hết
        if (Date.now() > deadline) break;
    }
    return { move: toIccs(bestMove[0], bestMove[1]), score: bestScore, depth: reached, nodes };
}

/** Cấp độ máy: độ sâu, thời gian, độ "nhiễu" (đi kém cố ý) và xác suất đi bừa. */
export const LEVELS = {
    1: { name: 'Tập sự', depth: 1, timeMs: 300, noise: 260, random: 0.35 },
    2: { name: 'Dễ', depth: 2, timeMs: 600, noise: 90, random: 0.08 },
    3: { name: 'Vừa', depth: 3, timeMs: 1200, noise: 20, random: 0 },
    4: { name: 'Khó', depth: 6, timeMs: 2500, noise: 0, random: 0 },
};

export function think(fen, red, level) {
    const L = LEVELS[level] || LEVELS[2];
    if (L.random && Math.random() < L.random) {
        const b = loadFen(fen);
        const ms = legalMoves(b, red);
        if (ms.length) {
            const caps = ms.filter((m) => b[m[1]]);
            const pool = caps.length && Math.random() < 0.5 ? caps : ms;
            const pick = pool[Math.floor(Math.random() * pool.length)];
            return { move: toIccs(pick[0], pick[1]), score: 0, depth: 0, nodes: 0 };
        }
    }
    return search(fen, red, L);
}
