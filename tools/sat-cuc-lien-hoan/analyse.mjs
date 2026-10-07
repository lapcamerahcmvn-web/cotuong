// tools/sat-cuc-lien-hoan/analyse.mjs — Phân tích 1 lời giải chiếu hết trên bàn cờ (thí quân, lưỡng chiếu, chiếu rút,
// đặt ngòi, hình sát cuối…) + câu chữ lời giảng. Dùng chung cho các chuyên đề bài tập sát (sat-cuc-lien-hoan, sat-chieu-thuc-dung).
import { createRequire } from 'module';
import { loadFen, stateFrom, legalMovesSt, inCheckSt } from '../../resources/js/engine/engine.js';

const require = createRequire(import.meta.url);
const G = require('../mate-book/gen.cjs');

export const NAME = { R: 'Xe', C: 'Pháo', N: 'Mã', P: 'Tốt', A: 'Sĩ', B: 'Tượng', K: 'Tướng' };
export const nm = (p) => NAME[p.toUpperCase()];
export const isRed = (p) => p === p.toUpperCase();
export const rc = (i) => [(i / 9) | 0, i % 9];
export const sq = (iccs) => (9 - +iccs[1]) * 9 + (iccs.charCodeAt(0) - 97);
export const NUM = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];
export const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const titleCase = (s) => s.split(' ').map(cap1).join(' ');
// Chọn câu theo mã bài (ổn định giữa các lần sinh, khác nhau giữa các bài).
export const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
export const pick = (seed, arr, salt = '') => arr[hash(seed + salt) % arr.length];

/* ---------------- luật tấn công (đủ cho phân tích lời giải) ---------------- */
export function between(b, a, c) { // số quân giữa 2 ô cùng hàng/cột
    const [r1, c1] = rc(a), [r2, c2] = rc(c);
    let n = 0;
    if (r1 === r2) for (let x = Math.min(c1, c2) + 1; x < Math.max(c1, c2); x++) { if (b[r1 * 9 + x]) n++; }
    else for (let y = Math.min(r1, r2) + 1; y < Math.max(r1, r2); y++) { if (b[y * 9 + c1]) n++; }
    return n;
}
export function screenOf(b, a, c) {
    const [r1, c1] = rc(a), [r2, c2] = rc(c);
    if (r1 === r2) { for (let x = Math.min(c1, c2) + 1; x < Math.max(c1, c2); x++) if (b[r1 * 9 + x]) return r1 * 9 + x; }
    else for (let y = Math.min(r1, r2) + 1; y < Math.max(r1, r2); y++) if (b[y * 9 + c1]) return y * 9 + c1;
    return -1;
}
export function attacks(b, from, to) {
    const p = b[from]; if (!p) return false;
    const t = p.toUpperCase(), red = isRed(p);
    const [r1, c1] = rc(from), [r2, c2] = rc(to);
    const line = r1 === r2 || c1 === c2;
    if (t === 'R') return line && between(b, from, to) === 0;
    if (t === 'C') return line && between(b, from, to) === 1;
    if (t === 'K') return c1 === c2 && between(b, from, to) === 0 && b[to] && b[to].toUpperCase() === 'K';
    if (t === 'N') {
        const dr = r2 - r1, dc = c2 - c1;
        if (Math.abs(dr) === 2 && Math.abs(dc) === 1) return !b[(r1 + dr / 2) * 9 + c1];
        if (Math.abs(dr) === 1 && Math.abs(dc) === 2) return !b[r1 * 9 + c1 + dc / 2];
        return false;
    }
    if (t === 'P') {
        const fwd = red ? -1 : 1, crossed = red ? r1 <= 4 : r1 >= 5;
        if (r2 === r1 + fwd && c2 === c1) return true;
        return crossed && r2 === r1 && Math.abs(c2 - c1) === 1;
    }
    return false;
}
// Ô x nằm giữa a và c (cùng hàng/cột)?
export function onSegment(x, a, c) {
    const [rx, cx] = rc(x), [ra, ca] = rc(a), [rk, ck] = rc(c);
    if (ra === rk && rx === ra) return cx > Math.min(ca, ck) && cx < Math.max(ca, ck);
    if (ca === ck && cx === ca) return rx > Math.min(ra, rk) && rx < Math.max(ra, rk);
    return false;
}
export const checkersOf = (b, kSq) => { const out = []; for (let i = 0; i < 90; i++) if (b[i] && isRed(b[i]) && attacks(b, i, kSq)) out.push(i); return out; };
export const PALACE_B = (i) => { const [r, c] = rc(i); return r <= 2 && c >= 3 && c <= 5; };

/* ---------------- phân tích 1 bài ---------------- */
export function analyse(P) {
    const st0 = stateFrom(loadFen(P.fen));
    let b = loadFen(P.fen);
    const plies = [];
    // Đen có dọa sát ngay không (nếu Đỏ đi nước êm)? → lý do phải chiếu liên tục.
    let threat = null;
    for (const m of legalMovesSt(st0, false)) {
        const nb = b.slice(); nb[m[1]] = nb[m[0]]; nb[m[0]] = null;
        const st = stateFrom(nb);
        if (inCheckSt(st, true) && !legalMovesSt(st, true).length) { threat = { piece: nm(b[m[0]]), mate: true }; break; }
        if (!threat && inCheckSt(st, true)) threat = { piece: nm(b[m[0]]), mate: false };
    }
    // Quân Đỏ có nước chiếu ngay từ đầu.
    const firstChecks = new Set();
    for (const m of legalMovesSt(st0, true)) {
        const nb = b.slice(); nb[m[1]] = nb[m[0]]; nb[m[0]] = null;
        if (inCheckSt(stateFrom(nb), false)) firstChecks.add(nm(b[m[0]]));
    }
    for (let i = 0; i < P.main.length; i++) {
        const iccs = P.main[i], from = sq(iccs.slice(0, 2)), to = sq(iccs.slice(2));
        const piece = b[from], captured = b[to], red = isRed(piece);
        const replies = red ? null : legalMovesSt(stateFrom(b), false).length;
        const wxf = G.notation(b, from, to);
        const nb = b.slice(); nb[to] = piece; nb[from] = null;
        const info = { iccs, from, to, piece, captured, red, wxf, replies };
        if (red) {
            const kB = nb.indexOf('k');
            const ch = checkersOf(nb, kB);
            info.checkers = ch.map((s) => nb[s]);
            info.double = ch.length >= 2;
            // Quân khác (không phải quân vừa đi) mới chiếu được: hoặc là Pháo nhận quân vừa đi làm ngòi (đặt ngòi),
            // hoặc quân vừa đi rời khỏi đường/chân của nó (chiếu rút — kể cả mở chân Mã).
            const others = ch.filter((c) => c !== to);
            info.screen = others.some((c) => nb[c] === 'C' && screenOf(nb, c, kB) === to);
            info.discovered = others.some((c) => !(nb[c] === 'C' && screenOf(nb, c, kB) === to));
            if (ch.some((s) => nb[s] === 'K')) info.faceCheck = true;
        }
        plies.push(info);
        b = nb;
    }
    // Thí quân: quân Đỏ vừa đi bị Đen ăn ngay ở ô đó.
    for (let i = 0; i + 1 < plies.length; i++) {
        const a = plies[i], d = plies[i + 1];
        if (a.red && d.to === a.to && d.captured) { a.sac = true; d.takesSac = true; }
    }
    const last = plies[plies.length - 1];
    const kB = b.indexOf('k'), kR = b.indexOf('K');
    const [kr, kc] = rc(kB);
    const fin = { board: b, kB, checkers: checkersOf(b, kB) };
    // Hình sát cuối.
    const tags = [];
    const mates = fin.checkers.map((s) => ({ s, p: b[s].toUpperCase() }));
    for (const { s, p } of mates) {
        const [r, c] = rc(s);
        if (p === 'N') {
            if (r === 1 && (c === 2 || c === 6) && kr === 0) tags.push('ngoa-tao');
            else if (r === 2 && (c === 3 || c === 5) && kr === 0) tags.push('quai-giac');
            else tags.push('ma');
        } else if (p === 'C') {
            const scr = screenOf(b, s, kB);
            const sp = b[scr];
            if (sp === 'C') tags.push('phao-trung');
            else if (sp && !isRed(sp) && (sp === 'a' || sp === 'b')) tags.push('phao-ngoi-si-tuong:' + nm(sp));
            else if (sp && isRed(sp)) tags.push('phao-ngoi-quan-nha:' + nm(sp));
            else if (sp) tags.push('phao-ngoi-quan-den:' + nm(sp));
            if (r === kr && kr === 0) tags.push('day');
        } else if (p === 'R') {
            tags.push(r === kr && kr === 0 ? 'xe-day' : 'xe');
        } else if (p === 'P') tags.push('tot');
        else if (p === 'K') tags.push('mat-tuong');
    }
    // Ô thoát của Tướng Đen: bị mặt Tướng Đỏ khoá? bị chính quân Đen lấp kín (muộn cung)?
    const adj = [-9, 9, -1, 1].map((d) => kB + d).filter((x) => x >= 0 && x < 90 && PALACE_B(x) && Math.abs((x % 9) - kc) <= 1);
    if (adj.length && adj.every((x) => b[x] && !isRed(b[x]))) tags.push('muon-cung');
    if (kR >= 0 && adj.some((x) => !b[x] && x % 9 === kR % 9 && between(b, x, kR) === 0)) tags.push('mat-tuong-khoa');
    if (plies.some((p) => p.double)) tags.push('luong-chieu');
    if (plies.some((p) => p.red && p.discovered && !p.double)) tags.push('chieu-rut');
    const sacs = plies.filter((p) => p.sac).map((p) => nm(p.piece));
    const attackers = [...new Set(plies.filter((p) => p.red).map((p) => nm(p.piece)))];
    // Mã chiếu liên tục để chuyển chỗ (≥3 nước Mã chiếu).
    if (plies.filter((p) => p.red && p.piece === 'N').length >= 3) tags.push('ma-chuyen-cho');
    return { plies, threat, firstChecks: [...firstChecks], tags, sacs, attackers, last, fin, kingRow: kr };
}

/* ---------------- câu chữ ---------------- */
export function material(fen) {
    const cnt = { r: {}, b: {} };
    for (const ch of fen) { if (!/[a-zA-Z]/.test(ch) || /[kK]/.test(ch)) continue; const s = isRed(ch) ? 'r' : 'b', k = ch.toUpperCase(); cnt[s][k] = (cnt[s][k] || 0) + 1; }
    const txt = (c) => ['Tướng'].concat(['R', 'C', 'N', 'P', 'A', 'B'].filter((k) => c[k]).map((k) => (c[k] > 1 ? c[k] + ' ' : '') + NAME[k])).join(', ');
    return { red: txt(cnt.r), black: txt(cnt.b), blackDef: (cnt.b.A || 0) + (cnt.b.B || 0) };
}
export const joinVi = (a) => a.length <= 1 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' và ' + a[a.length - 1];

export function finishPhrase(A, seed) {
    const t = A.tags;
    const m = A.fin.checkers.map((s) => nm(A.fin.board[s]));
    const who = joinVi([...new Set(m)]);
    const bits = [];
    if (t.includes('ngoa-tao')) bits.push('Mã ngọa tào (Mã đứng sát góc cung, chiếu chéo vào Tướng)');
    if (t.includes('quai-giac')) bits.push('Mã quải giác (Mã đứng góc cung trên cao)');
    if (t.includes('phao-trung')) bits.push('Pháo trùng (Pháo trước làm ngòi cho Pháo sau)');
    const ng = t.find((x) => x.startsWith('phao-ngoi-'));
    if (ng) {
        const [kind, piece] = ng.replace('phao-ngoi-', '').split(':');
        bits.push(kind === 'si-tuong' ? `Pháo mượn chính ${piece} Đen làm ngòi`
            : kind === 'quan-nha' ? `Pháo lấy ${piece} Đỏ làm ngòi` : `Pháo lấy ${piece} Đen làm ngòi`);
    }
    if (t.includes('xe-day')) bits.push('Xe chiếu trên hàng đáy');
    if (t.includes('mat-tuong')) bits.push('Tướng Đỏ lộ mặt trực tiếp');
    if (t.includes('muon-cung')) bits.push('Tướng Đen bị chính quân nhà lấp kín ô thoát (muộn cung)');
    if (t.includes('mat-tuong-khoa')) bits.push('mặt Tướng Đỏ khóa một đường chạy của Tướng Đen');
    return { who, bits };
}

export function captionRed(p, A, i, seed, isLast) {
    const parts = [];
    if (isLast) {
        const f = finishPhrase(A, seed);
        return `${p.captured ? `Ăn ${nm(p.captured)}, chiếu` : 'Chiếu'} hết! ${f.bits.length ? cap1(f.bits[0]) + '.' : `${f.who} kết thúc ván cờ.`}`;
    }
    if (!p.checkers.length) {
        // Nước êm (chỉ có ở chuyên đề sát chiêu): không chiếu nhưng Đen không còn cách đỡ đòn tiếp theo.
        parts.push(`${nm(p.piece)}${p.captured ? ` ăn ${nm(p.captured)}` : ''} — nước không chiếu nhưng dựng sẵn thế sát, Đen không đỡ kịp`);
        return cap1(`${parts.join('; ')}.`);
    }
    if (p.double) parts.push(`lưỡng chiếu: ${joinVi([...new Set(p.checkers.map(nm))])} cùng chiếu một lúc, Đen không thể đỡ cả hai`);
    else if (p.discovered) parts.push(`chiếu rút — ${nm(p.piece)} dời đi mở đường cho ${nm(p.checkers[0])} chiếu`);
    else if (p.screen) parts.push(`${nm(p.piece)} chen vào làm ngòi cho Pháo chiếu`);
    else if (p.faceCheck) parts.push('mượn mặt Tướng để chiếu');
    else if (p.piece === 'N' && i >= 2 && A.plies[i - 2].piece === 'N') parts.push('Mã chiếu tiếp — vừa chiếu vừa chuyển sang ô khống chế mới');
    else if (p.sac && p.captured) parts.push(`${nm(p.piece)} ăn ${nm(p.captured)} để chiếu`);
    else { const N = nm(p.piece); parts.push(pick(seed + i, [`${N} chiếu`, `${N} tiếp tục chiếu`, `${N} chiếu, giữ thế chủ động`, `${N} chiếu, không cho Đen thở`])); }
    if (p.sac) parts.push(pick(seed + i, [`thí ${nm(p.piece)} để dụ quân Đen vào ô bất lợi`, `bỏ ${nm(p.piece)} — hy sinh có tính toán`, `chấp nhận mất ${nm(p.piece)} để mở đường`], 's'));
    else if (p.captured) parts.push(`tiện ăn luôn ${nm(p.captured)}`);
    if (p.captured && p.sac && (p.double || p.discovered || p.screen)) parts.unshift(`ăn ${nm(p.captured)}`);
    return cap1(`${parts.join('; ')}.`);
}
export function captionBlack(p, prev, seed, i) {
    if (prev && prev.checkers && !prev.checkers.length) {
        // Đỏ vừa đi nước êm → Đen không bị chiếu, được đi tự do nhưng không gỡ được thế sát.
        return `${nm(p.piece)}${p.captured ? ` ăn ${nm(p.captured)}` : ''} — Đen không bị chiếu, ${pick(seed + i, ['cố tìm cách phòng thủ nhưng không kịp', 'xoay xở nhưng thế sát đã thành', 'nhưng không còn nước nào gỡ được'])}.`;
    }
    const only = p.replies === 1;
    if (p.takesSac) {
        if (p.piece === 'k') return `Tướng ${only ? 'buộc phải ăn' : 'ăn'} ${nm(p.captured)} và bị kéo ra khỏi chỗ đứng quen thuộc.`;
        const how = `${nm(p.piece)} ăn`;
        return `${how} ${nm(p.captured)}${only ? ' (nước đỡ duy nhất)' : ''}, ${pick(seed + i, ['đúng như Đỏ tính trước', 'nhưng quân này vừa rời vị trí phòng thủ', 'ô đó đã được Đỏ tính sẵn'])}.`;
    }
    if (p.captured) return `Ăn ${nm(p.captured)} để giải chiếu${only ? ', không còn cách nào khác' : ''}.`;
    if (p.piece === 'k') return `${only ? 'Tướng chỉ còn một đường chạy' : pick(seed + i, ['Tướng né chiếu', 'Tướng tránh sang ô khác', 'Tướng chạy'])}.`;
    return `Lót ${nm(p.piece)} cản chiếu${only ? ' (bắt buộc)' : ''}.`;
}

export function themeOf(A) {
    const t = A.tags, parts = [];
    if (A.sacs.length) parts.push('Thí ' + [...new Set(A.sacs)].slice(0, 2).join(' Thí '));
    if (t.includes('luong-chieu')) parts.push('Lưỡng Chiếu');
    if (t.includes('ngoa-tao')) parts.push('Mã Ngọa Tào');
    else if (t.includes('quai-giac')) parts.push('Mã Quải Giác');
    else if (t.includes('phao-trung')) parts.push('Pháo Trùng');
    else if (t.includes('muon-cung')) parts.push('Muộn Cung');
    else if (t.includes('mat-tuong') || t.includes('mat-tuong-khoa')) parts.push('Mặt Tướng Trợ Lực');
    else if (t.includes('chieu-rut') && parts.length < 2) parts.push('Chiếu Rút');
    if (parts.length < 2 && !parts.some((x) => /Ngọa Tào|Quải Giác|Pháo Trùng/.test(x))) {
        const who = [...new Set(A.fin.checkers.map((s) => nm(A.fin.board[s])))].join(' ');
        parts.push(`${who} Chiếu Hết`);
    }
    return parts.slice(0, 2).join(', ');
}
