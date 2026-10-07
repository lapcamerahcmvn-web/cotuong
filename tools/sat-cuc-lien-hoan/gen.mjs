// tools/sat-cuc-lien-hoan/gen.mjs — Sinh batch chuyên đề "Sát Cục Liên Hoàn 1-10 Nước" từ data.json (FEN + lời giải
// đã được solve.mjs CHỨNG MINH chiếu hết). Phân tích từng lời giải để viết lời giảng: thí quân, lưỡng chiếu, chiếu rút,
// hình sát cuối (Mã ngọa tào, quải giác, Pháo trùng, mặt Tướng, muộn cung…), Đen có đang dọa sát không.
//
//   node tools/sat-cuc-lien-hoan/gen.mjs   → tools/trung-cuoc-bao-dien/batches/sat-cuc-lien-hoan.json
//   node tools/trung-cuoc-bao-dien/tcbd.cjs build tools/trung-cuoc-bao-dien/batches/sat-cuc-lien-hoan.json
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { loadFen, stateFrom, legalMovesSt, inCheckSt } from '../../resources/js/engine/engine.js';

const require = createRequire(import.meta.url);
const G = require('../mate-book/gen.cjs');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, '../trung-cuoc-bao-dien/batches/sat-cuc-lien-hoan.json');
const DATA = JSON.parse(fs.readFileSync(path.join(HERE, 'data.json'), 'utf8'));

export const SERIES_SLUG = 'sat-cuc-lien-hoan';
export const POST_SLUG = 'phuong-phap-tu-duy-giai-bai-tap-sat-cuc';
const SER = {
    name: 'Sát Cục Liên Hoàn 1-10 Nước', slug: SERIES_SLUG, game_mode: 'co-tuong', phase: 'tan-cuoc', sort_order: 4, planned_total: 0,
    description: 'Hơn 1.100 bài tập chiếu hết liên hoàn từ 1 đến 10 nước: Đỏ đi trước, nước nào cũng chiếu, Đen đỡ thế nào cũng bị hết cờ. Tự giải trên bàn cờ, xem lời giải từng nước — mọi lời giải đều đã được máy kiểm chứng.',
};

const NAME = { R: 'Xe', C: 'Pháo', N: 'Mã', P: 'Tốt', A: 'Sĩ', B: 'Tượng', K: 'Tướng' };
const nm = (p) => NAME[p.toUpperCase()];
const isRed = (p) => p === p.toUpperCase();
const rc = (i) => [(i / 9) | 0, i % 9];
const sq = (iccs) => (9 - +iccs[1]) * 9 + (iccs.charCodeAt(0) - 97);
const NUM = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];
const cap1 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const titleCase = (s) => s.split(' ').map(cap1).join(' ');
// Chọn câu theo mã bài (ổn định giữa các lần sinh, khác nhau giữa các bài).
const hash = (s) => { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const pick = (seed, arr, salt = '') => arr[hash(seed + salt) % arr.length];

/* ---------------- luật tấn công (đủ cho phân tích lời giải) ---------------- */
function between(b, a, c) { // số quân giữa 2 ô cùng hàng/cột
    const [r1, c1] = rc(a), [r2, c2] = rc(c);
    let n = 0;
    if (r1 === r2) for (let x = Math.min(c1, c2) + 1; x < Math.max(c1, c2); x++) { if (b[r1 * 9 + x]) n++; }
    else for (let y = Math.min(r1, r2) + 1; y < Math.max(r1, r2); y++) { if (b[y * 9 + c1]) n++; }
    return n;
}
function screenOf(b, a, c) {
    const [r1, c1] = rc(a), [r2, c2] = rc(c);
    if (r1 === r2) { for (let x = Math.min(c1, c2) + 1; x < Math.max(c1, c2); x++) if (b[r1 * 9 + x]) return r1 * 9 + x; }
    else for (let y = Math.min(r1, r2) + 1; y < Math.max(r1, r2); y++) if (b[y * 9 + c1]) return y * 9 + c1;
    return -1;
}
function attacks(b, from, to) {
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
function onSegment(x, a, c) {
    const [rx, cx] = rc(x), [ra, ca] = rc(a), [rk, ck] = rc(c);
    if (ra === rk && rx === ra) return cx > Math.min(ca, ck) && cx < Math.max(ca, ck);
    if (ca === ck && cx === ca) return rx > Math.min(ra, rk) && rx < Math.max(ra, rk);
    return false;
}
const checkersOf = (b, kSq) => { const out = []; for (let i = 0; i < 90; i++) if (b[i] && isRed(b[i]) && attacks(b, i, kSq)) out.push(i); return out; };
const PALACE_B = (i) => { const [r, c] = rc(i); return r <= 2 && c >= 3 && c <= 5; };

/* ---------------- phân tích 1 bài ---------------- */
function analyse(P) {
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
function material(fen) {
    const cnt = { r: {}, b: {} };
    for (const ch of fen) { if (!/[a-zA-Z]/.test(ch) || /[kK]/.test(ch)) continue; const s = isRed(ch) ? 'r' : 'b', k = ch.toUpperCase(); cnt[s][k] = (cnt[s][k] || 0) + 1; }
    const txt = (c) => ['Tướng'].concat(['R', 'C', 'N', 'P', 'A', 'B'].filter((k) => c[k]).map((k) => (c[k] > 1 ? c[k] + ' ' : '') + NAME[k])).join(', ');
    return { red: txt(cnt.r), black: txt(cnt.b), blackDef: (cnt.b.A || 0) + (cnt.b.B || 0) };
}
const joinVi = (a) => a.length <= 1 ? (a[0] || '') : a.slice(0, -1).join(', ') + ' và ' + a[a.length - 1];

function finishPhrase(A, seed) {
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

function captionRed(p, A, i, seed, isLast) {
    const parts = [];
    if (isLast) {
        const f = finishPhrase(A, seed);
        return `${p.captured ? `Ăn ${nm(p.captured)}, chiếu` : 'Chiếu'} hết! ${f.bits.length ? cap1(f.bits[0]) + '.' : `${f.who} kết thúc ván cờ.`}`;
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
function captionBlack(p, prev, seed, i) {
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

function themeOf(A) {
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

const LEVEL = (ch) => ch <= 3 ? 'co-ban' : ch <= 6 ? 'trung-cap' : 'nang-cao';
const order = (P) => P.extra ? 10900 : P.ch * 1000 + P.n;
const slugOf = (P) => P.extra ? 'sat-cuc-lien-hoan-thuc-chien-10-nuoc' : `sat-cuc-lien-hoan-${P.ch}-nuoc-bai-${P.n}`;
const chapSlug = (ch) => `sat-cuc-lien-hoan-${ch}-nuoc-gioi-thieu`;
const L = (slug, text) => `<a href="/bai-hoc/${slug}">${text}</a>`;
const POST = (text) => `<a href="/tin-tuc/kien-thuc-co-tuong/${POST_SLUG}">${text}</a>`;

function lessonOf(P) {
    const A = analyse(P);
    const seed = P.id;
    const mat = material(P.fen);
    const theme = themeOf(A);
    const label = P.extra ? 'Thực Chiến' : `Bài ${P.ch}-${P.n}`;
    const chapName = P.extra ? 'Sát Cục Thực Chiến' : `Sát Cục ${P.ch} Nước`;
    const title = `${chapName} · ${label}: ${theme}`;
    const k = P.k;
    const captions = {};
    A.plies.forEach((p, i) => { captions[i + 1] = p.red ? captionRed(p, A, i, seed, i === A.plies.length - 1) : captionBlack(p, A.plies[i - 1], seed, i); });

    const fin = finishPhrase(A, seed);
    const kingPos = A.plies.length ? '' : '';
    const defNote = mat.blackDef >= 4 ? 'Sĩ Tượng của Đen còn đủ, phải tìm cách phá hoặc lợi dụng chúng làm vật cản'
        : mat.blackDef === 0 ? 'Đen không còn Sĩ Tượng nào che Tướng' : `Đen chỉ còn ${mat.blackDef} quân Sĩ/Tượng che Tướng`;
    const intro = pick(seed, [
        `Bài tập sát cục ${NUM[k] || k} nước: Đỏ đi trước, mỗi nước đều phải chiếu và chiếu hết Tướng Đen sau đúng ${k} nước, dù Đen đỡ thế nào.`,
        `Đỏ đi trước và chiếu liên tục, ${k} nước là hết cờ. Hãy tự tìm lời giải trên bàn cờ trước khi xem đáp án.`,
        `Thế cờ này đòi hỏi Đỏ chiếu liên hoàn ${k} nước. Mọi nước của Đỏ đều là nước chiếu — chỉ cần một nước êm là Đen có thời gian phản công.`,
    ]);
    const chNote = P.extra ? `<p>Đây là thế cờ thực chiến dài hơn các bài thông thường; đường chiếu hết liên hoàn ngắn nhất được chứng minh là ${k} nước.</p>`
        : k < P.ch ? `<p><em>Bài nằm trong nhóm ${P.ch} nước nhưng có đường chiếu hết nhanh hơn, chỉ ${k} nước — thử tìm xem!</em></p>`
            : k > P.ch ? `<p><em>Bài nằm trong nhóm ${P.ch} nước; đường chiếu hết liên hoàn ngắn nhất được máy chứng minh là ${k} nước.</em></p>` : '';
    const hints = [];
    hints.push(`<li><strong>Quân nào chiếu được ngay?</strong> Ở thế đầu, Đỏ có nước chiếu bằng ${joinVi(A.firstChecks)}. Liệt kê hết, kể cả nước chiếu phải bỏ quân.</li>`);
    hints.push(`<li><strong>Phòng thủ của Đen:</strong> ${defNote}. Tướng Đen đang ở ${A.plies.length && rc(loadFen(P.fen).indexOf('k'))[0] === 0 ? 'hàng đáy (nguyên vị)' : 'trên tầng cao của cung'}.</li>`);
    if (A.threat) hints.push(`<li><strong>Vì sao không được đi nước êm?</strong> Đen có ${A.threat.piece} ${A.threat.mate ? 'dọa chiếu hết ngay' : 'dọa chiếu'} nếu Đỏ để Đen rảnh tay một nước.</li>`);
    hints.push(`<li><strong>Quân phối hợp:</strong> lời giải dùng ${joinVi(A.attackers)}${A.attackers.length > 1 ? ' thay nhau chiếu' : ''}.</li>`);

    const steps = [];
    for (let i = 0; i < A.plies.length; i += 2) {
        const r = A.plies[i], d = A.plies[i + 1];
        steps.push(`<li><strong>${r.wxf}</strong>${d ? ` — Đen ${d.wxf}` : ' — hết cờ'}.${r.sac ? ` Đỏ thí ${nm(r.piece)}.` : ''}${r.double ? ' Lưỡng chiếu.' : ''}</li>`);
    }
    const key = [];
    if (A.sacs.length) key.push(`<li><strong>Thí quân:</strong> Đỏ bỏ ${joinVi(A.sacs)} để kéo quân Đen vào ô bất lợi hoặc phá lớp phòng thủ quanh Tướng.</li>`);
    if (A.tags.includes('luong-chieu')) key.push('<li><strong>Lưỡng chiếu:</strong> hai quân cùng chiếu một lúc — Đen không thể vừa lót vừa ăn, chỉ còn cách chạy Tướng.</li>');
    if (A.tags.includes('chieu-rut')) key.push('<li><strong>Chiếu rút (chiếu mở):</strong> một quân dời đi để quân phía sau chiếu, vừa chiếu vừa chuyển quân sang vị trí đẹp hơn.</li>');
    if (A.tags.includes('ma-chuyen-cho')) key.push('<li><strong>Mã chiếu chuyển chỗ:</strong> Mã chiếu liên tục để đổi vị trí, đưa mình tới ô khống chế Tướng mà Đen không kịp phản ứng.</li>');
    key.push(`<li><strong>Đòn kết thúc:</strong> ${fin.bits.length ? cap1(joinVi(fin.bits)) : `${fin.who} chiếu hết`}.</li>`);

    const content = `<p>${intro}</p>${chNote}<p><strong>Đỏ:</strong> ${mat.red}. <strong>Đen:</strong> ${mat.black}.</p>`
        + `<h2>Gợi ý tư duy</h2><p>Trước khi đi, trả lời nhanh các câu hỏi trong ${POST('phương pháp tư duy giải bài tập sát cục')}:</p><ul>${hints.join('')}</ul>`
        + `<h2>Lời giải</h2><ol>${steps.join('')}</ol>`
        + (P.alts && P.alts[1] ? `<p>Nước mở đầu không duy nhất: chế độ <em>Thử tự giải</em> chấp nhận mọi đường chiếu hết đúng hạn.</p>` : '')
        + `<h2>Điểm then chốt</h2><ul>${key.join('')}</ul>`;
    const summary = `Đỏ đi trước, chiếu liên hoàn ${k} nước là hết cờ. ${theme}.`;
    let seoTitle = `Sát Cục ${k} Nước ${P.extra ? 'Thực Chiến' : `Bài ${P.ch}-${P.n}`}: ${theme}`;
    if (seoTitle.length > 60) seoTitle = seoTitle.slice(0, 60).replace(/[ ,]+[^ ,]*$/, '');
    let seoDesc = `Bài tập cờ tướng sát cục liên hoàn: Đỏ đi trước, chiếu hết trong ${k} nước. ${theme}. Tự giải trên bàn cờ, xem lời giải từng nước.`;
    if (seoDesc.length > 160) seoDesc = seoDesc.slice(0, 157).replace(/\s+\S*$/, '') + '…';
    return {
        rec: { order: order(P), slug: slugOf(P), title, level: LEVEL(P.extra ? 10 : P.ch), fen: P.fen, first: 'do', main: P.main, captions, expect: 'mate', puzzle_side: 'do', summary, content, seo_title: seoTitle, seo_description: seoDesc },
        A, theme,
    };
}

/* ---------------- bài giới thiệu (tổng quan + từng chương) ---------------- */
const CH_NOTE = {
    1: 'Chỉ một nước nhưng là nền móng: nhận ra ngay ô chiếu hết của từng quân — Tốt, Mã, Xe, Pháo — và vai trò của mặt Tướng.',
    2: 'Hai nước: nước đầu dọn đường hoặc dụ quân, nước sau kết thúc. Bắt đầu xuất hiện thí quân và chiếu rút.',
    3: 'Ba nước: phối hợp hai quân rõ rệt hơn — một quân ép Tướng, quân kia khép lưới.',
    4: 'Bốn nước: phải tính trước vị trí Tướng Đen sau mỗi nước chiếu, đặc biệt khi Tướng có hai đường chạy.',
    5: 'Năm nước: nhiều đòn thí quân liên tiếp, Mã chiếu chuyển chỗ, Pháo đổi ngòi.',
    6: 'Sáu nước: tư duy theo cả hai phía — quân ta chiếu thế nào và quân Đen sẽ tiếp viện, lót đỡ ra sao.',
    7: 'Bảy nước: các đòn liên hoàn dài, thường kết hợp ba quân trở lên.',
    8: 'Tám nước: luyện sức tính sâu — giữ được hình dung bàn cờ sau nhiều nước chiếu.',
    9: 'Chín nước: chuỗi chiếu dài, nhiều lần Tướng Đen bị lùa qua lại trong cung.',
    10: 'Mười nước: phần khó nhất, cần kết hợp mọi kỹ thuật — thí quân, chiếu rút, chuyển chỗ, mượn mặt Tướng.',
};
function chapterLesson(ch, list) {
    const count = list.length;
    const tagCount = (t) => list.filter((x) => x.A.tags.includes(t)).length;
    const sac = list.filter((x) => x.A.sacs.length).length;
    const finBy = {};
    for (const x of list) for (const s of x.A.fin.checkers) { const n = nm(x.A.fin.board[s]); finBy[n] = (finBy[n] || 0) + 1; }
    const finTxt = Object.entries(finBy).sort((a, b) => b[1] - a[1]).map(([n, c]) => `${n} (${c} bài)`).join(', ');
    const first = list.slice(0, 5).map((x) => `<li>${L(x.rec.slug, x.rec.title.split(' · ')[1])}</li>`).join('');
    const content = `<p><strong>Sát cục ${ch} nước</strong> gồm ${count} bài tập chiếu hết liên hoàn: Đỏ đi trước, nước nào cũng chiếu, sau ${ch} nước là hết cờ. ${CH_NOTE[ch]}</p>`
        + `<h2>Cách luyện nhóm bài này</h2><ul><li>Mở bài, chọn <em>Thử tự giải</em>: bạn cầm Đỏ, máy đỡ dai nhất cho Đen. Mọi đường chiếu hết đúng hạn đều được tính đúng.</li>`
        + `<li>Trước khi đi, trả lời 6 câu hỏi của ${POST('sơ đồ tư duy giải bài tập sát cục')}: quân nào chiếu được, quân nào phối hợp, đòn nào; Tướng Đen sẽ chạy đâu, quân nào tiếp viện, quân Đen nào tự làm tắc Tướng.</li>`
        + `<li>Giải sai thì xem lời giảng từng nước, rồi làm lại sau 1–2 ngày.</li></ul>`
        + `<h2>Trong ${count} bài này có gì</h2><ul><li>Quân kết thúc ván: ${finTxt}.</li><li>${sac} bài có thí quân, ${tagCount('luong-chieu')} bài có lưỡng chiếu, ${tagCount('chieu-rut')} bài có chiếu rút.</li>`
        + `<li>${tagCount('ngoa-tao')} bài kết thúc bằng Mã ngọa tào, ${tagCount('quai-giac')} bài Mã quải giác, ${tagCount('phao-trung')} bài Pháo trùng, ${tagCount('muon-cung')} bài muộn cung.</li></ul>`
        + `<h2>Bắt đầu với 5 bài đầu tiên</h2><ul>${first}</ul>`;
    return {
        order: ch * 1000, slug: chapSlug(ch), title: `Sát Cục ${ch} Nước · Giới Thiệu Và Cách Luyện`, level: LEVEL(ch),
        summary: `${count} bài tập chiếu hết liên hoàn ${ch} nước: cách luyện, các đòn hay gặp và 5 bài mở đầu.`,
        seo_title: `Bài Tập Sát Cục ${ch} Nước — ${count} Thế Chiếu Hết Liên Hoàn`,
        seo_description: `${count} bài tập cờ tướng sát cục ${ch} nước: Đỏ đi trước chiếu liên tục tới hết cờ. Tự giải trên bàn cờ, lời giải đã kiểm chứng từng nước.`,
        content,
    };
}
function overviewLesson(byCh, total) {
    const rows = Object.keys(byCh).map((ch) => `<li>${L(chapSlug(ch), `Sát cục ${ch} nước`)} — ${byCh[ch].length} bài. ${CH_NOTE[ch]}</li>`).join('');
    const content = `<p><strong>Sát cục liên hoàn</strong> (liên tướng sát) là kiểu chiếu hết mà <strong>mọi nước của bên tấn công đều là nước chiếu</strong>. Đối phương không có lúc nào rảnh tay để phản công, chỉ biết chạy Tướng, lót quân hoặc ăn quân chiếu. Đây là kỹ năng dứt điểm quan trọng nhất trong cờ tướng: ván cờ có thể kết thúc ở bất kỳ giai đoạn nào — khai cuộc, trung cuộc hay tàn cuộc — chỉ vì bỏ lỡ hoặc dính một đòn liên hoàn.</p>`
        + `<p>Chuyên đề gồm ${total} bài tập xếp từ 1 đến 10 nước, độ khó tăng dần. Mỗi bài có bàn cờ tương tác: tự giải (máy đỡ dai nhất cho Đen), xem lời giải từng nước kèm lời giảng, và mục "Điểm then chốt" tóm tắt đòn thí quân, lưỡng chiếu, chiếu rút hay hình sát cuối. <strong>Toàn bộ lời giải đã được máy chứng minh</strong>: Đen đỡ cách nào cũng bị chiếu hết trong số nước đã nêu.</p>`
        + `<h2>Lộ trình 10 chặng</h2><ul>${rows}</ul>`
        + `<h2>Phương pháp tư duy khi giải</h2><p>Đừng đi thử bừa. Trước mỗi bài, tự hỏi 3 câu về quân ta (quân nào chiếu được, quân nào phối hợp, đòn tấn công nào) và 3 câu về quân Đen (Tướng Sĩ Tượng sẽ đứng đâu, quân nào tiếp viện, quân nào tự làm tắc Tướng hoặc làm ngòi cho ta). Toàn bộ phương pháp được vẽ thành sơ đồ tư duy có ví dụ trong bài viết ${POST('Phương pháp tư duy giải bài tập sát cục liên hoàn')}.</p>`
        + `<h2>Mẹo luyện tập</h2><ul><li>Mỗi ngày 5–10 bài, đừng nhảy cóc lên nhóm nhiều nước khi nhóm ít nước còn giải sai nhiều.</li><li>Giải bằng mắt trước, chỉ đi quân khi đã thấy hết cờ.</li><li>Bài giải sai được đưa vào mục ôn lỗi sai của trang Luyện tập để lặp lại sau.</li></ul>`;
    return {
        order: 0, slug: 'sat-cuc-lien-hoan-tong-quan', title: 'Sát Cục Liên Hoàn 1-10 Nước — Tổng Quan Và Lộ Trình Luyện', level: 'co-ban',
        summary: `Sát cục liên hoàn là gì, lộ trình ${total} bài tập chiếu hết từ 1 đến 10 nước và phương pháp tư duy khi giải.`,
        seo_title: 'Sát Cục Liên Hoàn 1-10 Nước — Bài Tập Chiếu Hết Cờ Tướng',
        seo_description: `${total} bài tập sát cục liên hoàn cờ tướng từ 1 đến 10 nước, độ khó tăng dần. Tự giải trên bàn cờ, lời giải kiểm chứng bằng máy, kèm phương pháp tư duy.`,
        content,
    };
}

/* ---------------- main ---------------- */
const items = DATA.keep.map((P) => lessonOf(P));
const byCh = {};
for (const x of items) { const ch = x.rec.order >= 10900 ? 'x' : String(Math.floor(x.rec.order / 1000)); if (ch !== 'x') (byCh[ch] = byCh[ch] || []).push(x); }
const lessons = [overviewLesson(byCh, items.length)];
for (const ch of Object.keys(byCh)) lessons.push(chapterLesson(+ch, byCh[ch]));
lessons.push(...items.map((x) => x.rec));
SER.planned_total = lessons.length;
fs.writeFileSync(OUT, JSON.stringify({ series: SER, lessons }, null, 1) + '\n');
// Thống kê nhanh để chọn ví dụ cho sơ đồ tư duy.
const stat = {};
for (const x of items) for (const t of x.A.tags) stat[t.split(':')[0]] = (stat[t.split(':')[0]] || 0) + 1;
console.log(`Đã ghi ${lessons.length} bài → ${path.relative(process.cwd(), OUT)}`);
console.log(stat);
if (process.argv.includes('--examples')) {
    for (const t of ['ma-chuyen-cho', 'muon-cung', 'luong-chieu', 'chieu-rut', 'mat-tuong-khoa', 'ngoa-tao', 'phao-trung'])
        console.log(t, items.filter((x) => x.A.tags.includes(t) && x.rec.order < 6000).slice(0, 6).map((x) => x.rec.slug.replace('sat-cuc-lien-hoan-', '')).join(' '));
}

/* ---------------- sơ đồ tư duy (bảng mindmaps, nạp bằng MindmapSeeder) ---------------- */
// Dàn ý ở mindmap.md → database/seeders/data/mindmaps.json (gộp theo slug; updated_at chỉ đổi khi nội dung đổi
// → MindmapSeeder chỉ ghi đè khi bản trong git mới hơn bản đang có trên DB).
export const MINDMAP_SLUG = 'phuong-phap-tu-duy-sat-cuc-lien-hoan';
{
    const MM_JSON = path.resolve(HERE, '../../database/seeders/data/mindmaps.json');
    const store = fs.existsSync(MM_JSON) ? JSON.parse(fs.readFileSync(MM_JSON, 'utf8')) : { mindmaps: [] };
    const entry = {
        slug: MINDMAP_SLUG,
        title: 'Phương pháp tư duy giải sát cục liên hoàn',
        description: '6 câu hỏi trước khi đi nước đầu tiên: 3 câu cho quân ta, 3 câu cho quân Đen. Mở từng nhánh, bấm "Xem ví dụ" để thấy câu hỏi đó áp dụng vào bài thật.',
        outline: fs.readFileSync(path.join(HERE, 'mindmap.md'), 'utf8').replace(/\r\n/g, '\n').trim() + '\n',
    };
    const i = store.mindmaps.findIndex((m) => m.slug === entry.slug);
    const old = store.mindmaps[i];
    const same = old && ['title', 'description', 'outline'].every((k) => old[k] === entry[k]);
    entry.updated_at = same ? old.updated_at : new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    if (i >= 0) store.mindmaps[i] = entry; else store.mindmaps.push(entry);
    for (const m of entry.outline.matchAll(/@([a-z0-9-]+)/g)) if (!lessons.some((l) => l.slug === m[1])) console.error('  ✗ sơ đồ: không có bài ' + m[1]);
    fs.writeFileSync(MM_JSON, JSON.stringify(store, null, 1) + '\n');
    console.log(`Sơ đồ tư duy "${entry.slug}"${same ? ' (không đổi)' : ' (đã cập nhật)'} → database/seeders/data/mindmaps.json`);
}
