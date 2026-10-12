// tools/trung-cuoc-so-do-tu-duy/gen.mjs — Sinh chuyên đề "Trung Cuộc Sơ Đồ Tư Duy" từ theory.cjs (lý thuyết + ví dụ viết lại
// bằng lời riêng), boards.txt (FEN ví dụ chép từ ảnh) và data.json (bài tập + lời giải máy, xem README.md).
//   node tools/trung-cuoc-so-do-tu-duy/gen.mjs → tools/trung-cuoc-bao-dien/batches/trung-cuoc-so-do-tu-duy.json + mindmaps.json
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { nm, isRed, cap1, pick, analyse, material, joinVi, finishPhrase, captionRed, captionBlack, themeOf, sq } from '../sat-cuc-lien-hoan/analyse.mjs';

const require = createRequire(import.meta.url);
const G = require('../mate-book/gen.cjs');
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, '../trung-cuoc-bao-dien/batches/trung-cuoc-so-do-tu-duy.json');
const { CH, EX } = require('./theory.cjs');
const DATA = JSON.parse(fs.readFileSync(path.join(HERE, 'data.json'), 'utf8'));
const BOARDS = Object.fromEntries(fs.readFileSync(path.join(HERE, 'boards.txt'), 'utf8').trim().split('\n')
    .map((l) => l.trim().split(/\s+/)).map(([id, , fen, s]) => [id, { fen, first: s === 'w' ? 'do' : 'den' }]));
const CONTENT = require('../trung-cuoc-bao-dien/content-io.cjs').read();
const PUBLISHED = new Set(CONTENT.lessons.filter((l) => l.status === 'published').map((l) => l.slug));

export const SERIES_SLUG = 'trung-cuoc-so-do-tu-duy';
export const POST_SLUG = 'trung-cuoc-so-do-tu-duy-don-danh-chien-thuat';
export const MINDMAP_SLUG = 'trung-cuoc-so-do-tu-duy';
const P_ = 'trung-cuoc-tu-duy-';
const SER = {
    name: 'Trung Cuộc Sơ Đồ Tư Duy — Đòn Đánh, Tư Duy Và Chiến Thuật', slug: SERIES_SLUG, game_mode: 'co-tuong', phase: 'trung-cuoc', sort_order: 6, planned_total: 0,
    description: 'Trung cuộc học bằng sơ đồ tư duy: phương pháp tính sát, 5 hướng khi bị đuổi bắt quân, khống chế, ngăn cản, phế quân, khai thác nhược điểm, phối hợp binh chủng, đánh giá cục diện — kèm ví dụ và gần 300 bài tập giải trên bàn cờ.',
};
// Thế ví dụ dùng làm bàn minh họa có mạch chiếu hết (máy chứng minh, xem README.md).
const BOARD_MATE = {
    E27: 'd7d9 e9d9 b2b9 d9d8 i1d1 f3d3 d1d3 d8e8 a6c7 e8f8 d3f3 g4f4 f3f4 g7f5 f4f5'.split(' '),
    E46: 'd4d9 e9d9 b0b9 c8c9 e3d5 g3d3 d5c7 d9e9 b9c9 d3d9 c9d9'.split(' '),
};
// Tên ngắn + đề bài + câu gợi ý của từng phần bài tập.
const SEC = {
    sat: { short: 'Trung Cuộc Sát Chiêu', task: 'tìm đòn chiếu hết', level: 'trung-cap' },
    bat: { short: 'Bắt Quân Và Tranh Tiên', task: 'tìm nước bắt quân hoặc tranh tiên tốt nhất', level: 'trung-cap' },
    khong: { short: 'Khống Chế', task: 'tìm nước khống chế — hoặc thoát khống chế — tốt nhất', level: 'nang-cao' },
    can: { short: 'Ngăn Cản', task: 'tìm nước ngăn cản tốt nhất', level: 'nang-cao' },
    phe: { short: 'Phế Quân', task: 'tìm nước tốt nhất — có khi phải dám bỏ quân', level: 'nang-cao' },
    nhuoc: { short: 'Khai Thác Nhược Điểm', task: 'tìm điểm yếu của Đen và nước khai thác', level: 'nang-cao' },
    lienhe: { short: 'Liên Hệ Hữu Cơ', task: 'phối hợp các quân, tìm nước tốt nhất', level: 'nang-cao' },
    huong: { short: '5 Hướng Tư Duy', task: 'đi qua 5 hướng tư duy, tìm nước tốt nhất', level: 'nang-cao' },
    tonghop: { short: 'Tổng Hợp Trung Cuộc', task: 'tìm nước tốt nhất', level: 'nang-cao' },
};

/* ---------------- tiện ích ---------------- */
const L = (slug, text) => `<a href="/bai-hoc/${slug}">${text}</a>`;
const POST = (text) => `<a href="/tin-tuc/kien-thuc-co-tuong/${POST_SLUG}">${text}</a>`;
const LIST = (a) => `<ul>${a.map((x) => `<li>${x}</li>`).join('')}</ul>`;
const OL = (a) => `<ol>${a.map((x) => `<li>${x}</li>`).join('')}</ol>`;
const thSlug = (t) => `${P_}${t.key}`;
const exSlug = (ch, n) => `${P_}${ch.key}-bai-${n}`;
const egSlug = (ch, j) => `${P_}${ch.key}-vi-du-${j}`;
const clip = (s, n) => (s.length <= n ? s : s.slice(0, n).replace(/[\s,:;—-]+\S*$/, ''));
const clipDesc = (s) => (s.length <= 160 ? s : s.slice(0, 157).replace(/\s+\S*$/, '') + '…');
const plain = (h) => h.replace(/<\/(p|li|h2)>/g, ' ').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
// Mở đầu đoạn văn: gom câu tới khi đủ `min` ký tự (tối đa `max`).
const lead = (h, min, max) => {
    let out = '';
    for (const c of plain(h).split(/(?<=[.:!?])\s/)) { if (out.length >= min || (out + ' ' + c).length > max) break; out = (out + ' ' + c).trim(); }
    return (out || clip(plain(h), max - 1) + '…').replace(/:$/, '.');
};
const VAL = { R: 9, C: 4.5, N: 4, P: 1, A: 2, B: 2, K: 0 };

// Đi một mạch ICCS, trả về thông tin từng nước (ký hiệu, quân ăn, chiếu).
function replay(fen, main) {
    let b = G.loadFen(fen);
    return main.map((m) => {
        const from = sq(m.slice(0, 2)), to = sq(m.slice(2));
        const piece = b[from], cap = b[to], red = isRed(piece);
        const wxf = G.notation(b, from, to);
        b = b.slice(); b[to] = piece; b[from] = null;
        return { iccs: m, piece, cap, red, wxf, check: G.inCheck(b, !red), mate: G.isCheckmate(b, !red) };
    });
}
const factCaption = (p) => `${p.red ? '' : 'Đen '}${p.wxf}${p.cap ? ` — ăn ${nm(p.cap)}` : ''}${p.mate ? ', chiếu hết' : p.check ? ', chiếu' : ''}.`;

/* ---------------- bài tập ---------------- */
const exercises = [];
const bySec = {};
for (const P of DATA.keep) (bySec[P.sec] = bySec[P.sec] || []).push(P);
const chOfSec = Object.fromEntries(CH.filter((c) => c.sec).map((c) => [c.sec, c]));

function mateLesson(P, ch, ci) {
    const S = SEC[P.sec];
    const A = analyse({ fen: P.fen, main: P.main, id: 'tcsd-' + P.id });
    if (!A.fin.checkers.length) return null;   // máy tìm ra "hết nước đi" — không phải chiếu hết
    const seed = 'tcsd-' + P.id, k = P.k, theme = themeOf(A);
    const captions = {};
    A.plies.forEach((p, i) => { captions[i + 1] = p.red ? captionRed(p, A, i, seed, i === A.plies.length - 1) : captionBlack(p, A.plies[i - 1], seed, i); });
    const fin = finishPhrase(A, seed);
    const mat = material(P.fen);
    const quiet = A.plies.filter((p) => p.red && !p.checkers.length).length;
    const steps = [];
    for (let i = 0; i < A.plies.length; i += 2) {
        const r = A.plies[i], d = A.plies[i + 1];
        steps.push(`<strong>${r.wxf}</strong>${d ? ` — Đen ${d.wxf}` : ' — hết cờ'}.${r.sac ? ` Đỏ thí ${nm(r.piece)}.` : ''}${!r.checkers.length ? ' Nước êm.' : ''}${r.double ? ' Lưỡng chiếu.' : ''}`);
    }
    const intro = quiet
        ? `Đỏ đi trước và chiếu hết sau ${k} nước. Lời giải có ${quiet === 1 ? 'một nước êm' : quiet + ' nước êm'} (không chiếu): phải dựng thế sát trước khi ra đòn.`
        : pick(seed, [`Đỏ đi trước, chiếu liên tục ${k} nước là hết cờ, Đen đỡ cách nào cũng vậy.`, `Đỏ đi trước. Tìm chuỗi nước chiếu dẫn tới chiếu hết sau ${k} nước.`, `Thế trung cuộc còn nhiều quân nhưng Đỏ có đòn: ${k} nước chiếu liên hoàn là xong.`]);
    const proof = P.src === 'search'
        ? 'Lời giải do máy tìm (Đen đỡ theo đánh giá của máy); chế độ <em>Thử tự giải</em> vẫn chấp nhận mọi đường chiếu hết đúng hạn.'
        : 'Lời giải đã được máy chứng minh: Đen đỡ cách nào cũng bị chiếu hết trong số nước đã nêu.';
    const hints = [`<strong>Quân chiếu được ngay:</strong> ${joinVi(A.firstChecks) || 'không có — phải dựng thế trước'}.`];
    if (A.threat) hints.push(`<strong>Đen đang dọa:</strong> ${A.threat.piece} Đen ${A.threat.mate ? 'dọa chiếu hết' : 'dọa chiếu'} — Đỏ không được chậm nhịp.`);
    hints.push(`Áp dụng ${L(thSlug(CH[1].theory[0]), '8 bước tư duy tính sát')}: hình quen, sát liên hoàn hay có nước nghỉ, quân tham gia, đội hình, vị trí Tướng.`);
    const key = [];
    if (A.sacs.length) key.push(`<strong>Thí quân:</strong> Đỏ bỏ ${joinVi(A.sacs)} để kéo quân Đen lệch chỗ hoặc phá lớp phòng thủ.`);
    key.push(`<strong>Đòn kết thúc:</strong> ${fin.bits.length ? cap1(joinVi(fin.bits)) : `${fin.who} chiếu hết`}.`);
    const content = `<p>${intro}</p><p><strong>Đỏ:</strong> ${mat.red}. <strong>Đen:</strong> ${mat.black}.</p>`
        + `<h2>Gợi ý tư duy</h2>${LIST(hints)}<h2>Lời giải</h2>${OL(steps)}<p>${proof}</p><h2>Điểm then chốt</h2>${LIST(key)}`;
    return {
        order: ci * 1000 + 100 + P.n, slug: exSlug(ch, P.n), title: `${S.short} · Bài ${P.n}: ${theme}`, level: S.level,
        fen: P.fen, first: 'do', main: P.main, captions, expect: 'mate', puzzle_side: 'do',
        summary: `${S.short}: Đỏ đi trước, chiếu hết trong ${k} nước. ${theme}.`, content,
        seo_title: clip(`Trung Cuộc Sát Chiêu Bài ${P.n}: ${theme}`, 60),
        seo_description: clipDesc(`Bài tập trung cuộc cờ tướng: Đỏ đi trước, chiếu hết trong ${k} nước. ${theme}. Tự giải trên bàn cờ, xem lời giải từng nước đã kiểm chứng bằng máy.`),
        _k: k, _kind: 'mate',
    };
}

function bestLesson(P, ch, ci) {
    const S = SEC[P.sec];
    const plies = replay(P.fen, P.main);
    // Giải đố khi nước đầu rõ ràng: Đỏ hơn hẳn và nước đó vượt phương án thứ hai, hoặc đây là nước (đỡ) duy nhất vượt trội.
    const puzzle = (P.margin >= 60 && P.score >= 80) || P.margin >= 120;
    const redCaps = plies.filter((p) => p.red && p.cap).map((p) => nm(p.cap));
    const blackCaps = plies.filter((p) => !p.red && p.cap).map((p) => nm(p.cap));
    const first = plies[0];
    // Tiêu đề: đặc điểm nước đầu + kết quả.
    const sac = plies.length > 1 && plies[1].cap && P.main[1].slice(2) === P.main[0].slice(2);
    let theme = first.check ? `${nm(first.piece)} Chiếu` : first.cap ? `${nm(first.piece)} Ăn ${nm(first.cap)}` : sac ? `Thí ${nm(first.piece)}` : `Nước ${nm(first.piece)} Then Chốt`;
    const g = P.gain;
    const outcome = P.score < -50 ? (P.threat ? 'Đỡ Đòn Sát' : 'Tìm Cách Đỡ') : g >= 8 ? 'Đỏ Hơn Xe' : g >= 3.5 ? 'Đỏ Hơn Quân' : g >= 1 ? 'Đỏ Lời Quân' : P.score >= 150 ? 'Đỏ Giành Thế' : P.score >= 80 ? 'Tranh Tiên' : 'Giữ Cân Bằng';
    theme = `${theme}, ${outcome}`;
    const captions = {};
    plies.forEach((p, i) => { captions[i + 1] = factCaption(p); });
    const last = plies.length;
    const pawns = (Math.abs(P.score) / 100).toFixed(1).replace('.', ',');
    const evalTxt = P.score >= 30 ? `Máy đánh giá Đỏ hơn khoảng ${pawns} Tốt.` : P.score <= -30 ? `Máy đánh giá Đen vẫn hơn khoảng ${pawns} Tốt — đây là cách đỡ tốt nhất của Đỏ.` : 'Máy đánh giá hai bên cân bằng.';
    const gainTxt = redCaps.length || blackCaps.length
        ? `Đỏ ăn ${joinVi(redCaps) || 'không quân nào'}${blackCaps.length ? `, Đen ăn ${joinVi(blackCaps)}` : ''} — ${g >= 1 ? `Đỏ lời khoảng ${String(g).replace('.', ',')} điểm quân (Tốt = 1, Xe = 9)` : 'quân hai bên gần như ngang nhau'}.`
        : P.score >= 80 ? 'Chưa ăn quân nào nhưng thế cờ đã nghiêng về Đỏ.' : 'Chưa ăn quân nào.';
    captions[last] += ` ${gainTxt} ${evalTxt}`;
    const mat = material(P.fen);
    const steps = [];
    for (let i = 0; i < plies.length; i += 2) {
        const r = plies[i], d = plies[i + 1];
        steps.push(`<strong>${r.wxf}</strong>${r.cap ? ` (ăn ${nm(r.cap)})` : ''}${r.check ? ', chiếu' : ''}${d ? ` — Đen ${d.wxf}${d.cap ? ` (ăn ${nm(d.cap)})` : ''}` : ''}.`);
    }
    const alts = (P.alts || []).slice(0, 3).map((m) => { const [x] = replay(P.fen, [m]); return x.wxf; });
    const theoryLinks = ch.theory.map((t) => L(thSlug(t), t.title.split(' — ')[0]));
    const hints = [`Chủ đề của phần này: ${joinVi(theoryLinks)}.`];
    if (P.threat) hints.unshift(`<strong>Đen đang dọa:</strong> nếu được đi, Đen có đòn chiếu hết trong ${P.threat} nước — Đỏ không được đi chậm.`);
    const kq = ch.theory.flatMap((t) => t.cong || []);
    if (kq.length) hints.push(`Nhớ lại: ${pick('tcsd-' + P.id, kq).charAt(0).toLowerCase() + pick('tcsd-' + P.id, kq).slice(1)}.`);
    hints.push('Trước khi đi, tự hỏi: quân nào của mỗi bên đang bị đe dọa, quân nào đứng cô độc hoặc bị ghim, và đối phương đang dọa gì.');
    const task = P.sec === 'sat' ? 'tìm nước tốt nhất (máy không thấy đòn chiếu hết bắt buộc — có khi phải đỡ trước rồi mới phản công)' : S.task;
    const content = `<p>${S.short}: Đỏ đi trước, ${task}.</p><p><strong>Đỏ:</strong> ${mat.red}. <strong>Đen:</strong> ${mat.black}.</p>`
        + `<h2>Gợi ý tư duy</h2>${LIST(hints)}`
        + `<h2>${puzzle ? 'Lời giải' : 'Phương án máy đề xuất'}</h2>${OL(steps)}<p>${gainTxt} ${evalTxt}</p>`
        + (puzzle
            ? `<p>Lời giải do máy phân tích (Đen đáp theo đánh giá của máy): nước đầu tốt hơn rõ rệt mọi phương án khác${P.score < 80 ? ' — các nước khác đều thiệt nặng hơn' : ''}. Ở chế độ <em>Thử tự giải</em>, nước khác lời giải vẫn được chấp nhận nếu máy đánh giá tương đương.</p>`
            : `<p>Thế này không có một nước vượt trội hẳn: máy đánh giá nước tốt nhất chỉ hơn phương án kế tiếp ${(P.margin / 100).toFixed(1).replace('.', ',')} Tốt${alts.length ? `; các nước gần tương đương: ${joinVi(alts)}` : ''}. Vì vậy bài này để xem và tự phân tích, không chấm nước đi.</p>`);
    return {
        order: ci * 1000 + 100 + P.n, slug: exSlug(ch, P.n), title: `${S.short} · Bài ${P.n}: ${theme}${puzzle ? '' : ' (Phân Tích)'}`, level: S.level,
        fen: P.fen, first: 'do', main: P.main, captions, ...(puzzle ? { puzzle_side: 'do' } : {}),
        summary: `${S.short}: Đỏ đi trước, ${task}. ${theme}.`, content,
        seo_title: clip(`${S.short} Bài ${P.n}: ${theme}`, 60),
        seo_description: clipDesc(`Bài tập trung cuộc cờ tướng phần ${S.short.toLowerCase()}: Đỏ đi trước, ${task}. Giải trên bàn cờ, xem lời giải từng nước.`),
        _kind: puzzle ? 'best' : 'view',
    };
}

CH.forEach((ch, ci) => {
    if (!ch.sec) return;
    for (const P of (bySec[ch.sec] || []).sort((a, b) => a.n - b.n)) {
        const rec = P.kind === 'mate' ? mateLesson(P, ch, ci) : bestLesson(P, ch, ci);
        if (!rec) { console.log('Bỏ bài (không kết thúc bằng chiếu hết):', P.sec, P.n); continue; }
        exercises.push({ rec, ch, P });
    }
});

/* ---------------- ví dụ ---------------- */
const examples = [];
CH.forEach((ch, ci) => {
    (ch.examples || []).forEach((id, j) => {
        const e = EX[id], b = BOARDS[id];
        if (!e || !b) throw new Error('thiếu ví dụ ' + id);
        const main = e.main || [];
        const rec = {
            order: ci * 1000 + 20 + j, slug: egSlug(ch, j + 1), title: `${ch.ten.split(' — ')[0].split(',')[0]} · Ví Dụ ${j + 1}: ${e.title}`, level: SEC[ch.sec]?.level || 'nang-cao',
            fen: b.fen, first: b.first, main, captions: e.captions || {}, ...(e.vars ? { vars: e.vars.map((v) => ({ from: 'main', after: 0, ...v })) } : {}),
            summary: lead(e.text, 70, 230),
            content: e.text + (main.length || e.vars
                ? `<p>${e.src === 'engine' ? `Ý tưởng và nước đầu theo tài liệu; các nước sau${e.engineFrom ? ' của Đen' : ''} do máy đi tiếp để minh họa. ` : ''}Bấm "Tiến" để xem từng nước.</p>`
                : '<p>Bài này chỉ có sơ đồ để đọc thế cờ: trước khi đọc lời bình, tự xác định quân nào đang bị đe dọa và bạn sẽ chọn hướng nào.</p>')
                + `<p>Lý thuyết: ${joinVi(ch.theory.map((t) => L(thSlug(t), t.title.split(' — ')[0])))}.</p>`,
            seo_title: clip(`${e.title} — Trung Cuộc Cờ Tướng`, 60),
            seo_description: clipDesc(`Ví dụ trung cuộc cờ tướng: ${e.title.toLowerCase()}. ${lead(e.text, 40, 110)}`),
        };
        // Lời giảng: giữ câu ý tưởng đã viết; nước không có câu thì ghi sự kiện (ăn quân, chiếu) để người xem theo dõi.
        if (main.length) {
            const toIccs = (() => { try { return replayBook(b.fen, b.first, main); } catch { return null; } })();
            if (toIccs) toIccs.forEach((p, i) => { if (!rec.captions[i + 1] && (p.cap || p.check)) rec.captions[i + 1] = factCaption(p); });
        }
        examples.push({ rec, ch, id });
    });
});
// Đi mạch ví dụ (ký hiệu sách hoặc ICCS) để lấy thông tin ăn quân/chiếu.
function replayBook(fen, first, toks) {
    let b = G.loadFen(fen), red = first === 'do';
    return toks.map((t) => {
        const ic = /^([a-i])(\d)([a-i])(\d)$/.exec(t);
        const mv = ic ? { from: sq(t.slice(0, 2)), to: sq(t.slice(2)) } : G.parseMove(b, t, red);
        if (!mv) throw new Error('không đọc được ' + t);
        const piece = b[mv.from], cap = b[mv.to];
        const wxf = G.notation(b, mv.from, mv.to);
        b = b.slice(); b[mv.to] = piece; b[mv.from] = null;
        const r = { piece, cap, red, wxf, check: G.inCheck(b, !red), mate: G.isCheckmate(b, !red) };
        red = !red;
        return r;
    });
}

/* ---------------- bài lý thuyết ---------------- */
const theory = [];
CH.forEach((ch, ci) => {
    const exs = exercises.filter((x) => x.ch === ch);
    const egs = examples.filter((x) => x.ch === ch);
    ch.theory.forEach((t, ti) => {
        let body = t.body.replace('@CONG', t.cong ? LIST(t.cong) : '').replace('@THU', t.thu ? LIST(t.thu) : '');
        if (ti === ch.theory.length - 1) {
            if (egs.length) body += `<h2>Ví dụ trong chương</h2>${LIST(egs.map((x) => L(x.rec.slug, x.rec.title.split(' · ')[1])))}`;
            if (exs.length) {
                const kinds = { mate: 0, best: 0, view: 0 }; exs.forEach((x) => kinds[x.rec._kind]++);
                const desc = [kinds.mate && `${kinds.mate} bài chiếu hết`, kinds.best && `${kinds.best} bài tìm nước then chốt`, kinds.view && `${kinds.view} bài phân tích`].filter(Boolean).join(', ');
                body += `<h2>Bài tập (${exs.length} bài)</h2><p>Gồm ${desc}. Đỏ luôn đi trước; chọn <em>Thử tự giải</em> để tự cầm Đỏ.</p>${LIST(exs.slice(0, 6).map((x) => L(x.rec.slug, x.rec.title.split(' · ')[1])))}`;
            }
        }
        body += `<p>Toàn bộ chuyên đề được vẽ thành sơ đồ tư duy trong bài ${POST('Trung cuộc sơ đồ tư duy: đòn đánh, tư duy, chiến thuật')}.</p>`;
        const rec = {
            order: ci * 1000 + ti + (ci === 0 ? 1 : 0), slug: thSlug(t), title: t.title, level: ci <= 2 ? 'trung-cap' : 'nang-cao',
            summary: t.summary, content: body,
            seo_title: clip(t.title.replace(/ — .*/, '') + ' — Trung Cuộc Cờ Tướng', 60),
            seo_description: clipDesc(t.summary),
        };
        if (t.board) {
            const b = BOARDS[t.board];
            Object.assign(rec, { fen: b.fen, first: b.first, main: [] });
            if (BOARD_MATE[t.board]) {
                const A = analyse({ fen: b.fen, main: BOARD_MATE[t.board], id: t.board });
                const captions = {};
                A.plies.forEach((p, i) => { captions[i + 1] = p.red ? captionRed(p, A, i, t.board, i === A.plies.length - 1) : captionBlack(p, A.plies[i - 1], t.board, i); });
                Object.assign(rec, { main: BOARD_MATE[t.board], captions, expect: 'mate' });
            }
        }
        theory.push({ rec, ch, t });
    });
});

/* ---------------- tổng quan ---------------- */
const total = exercises.length;
const cnt = (k) => exercises.filter((x) => x.rec._kind === k).length;
const chapters = CH.filter((c) => c.key !== 'tong-quan');
const overview = {
    order: 0, slug: `${P_}tong-quan`, title: 'Trung Cuộc Sơ Đồ Tư Duy — Tổng Quan Và Lộ Trình Học', level: 'trung-cap',
    summary: `Học trung cuộc theo sơ đồ tư duy: ${chapters.length} chương từ tính sát, xử lý khi bị bắt quân, các chiến thuật cơ bản tới đánh giá cục diện, ${examples.length} ví dụ và ${total} bài tập.`,
    seo_title: 'Trung Cuộc Cờ Tướng Sơ Đồ Tư Duy — Lộ Trình Học',
    seo_description: clipDesc(`Học trung cuộc cờ tướng bằng sơ đồ tư duy: tính sát, 5 hướng khi bị bắt quân, khống chế, ngăn cản, phế quân, nhược điểm, cục diện — ${total} bài tập giải trên bàn cờ.`),
    content: `<p><strong>Trung cuộc</strong> là giai đoạn dài nhất và biến hóa nhất của ván cờ — bắt đầu khi hai bên bày trận xong (thường sau 11–15 nước) và kéo dài tới khi quân còn ít, chuyển sang tàn cuộc. Chuyên đề này gom kiến thức trung cuộc thành các <strong>sơ đồ tư duy</strong>: mỗi chủ đề có định nghĩa, những điều cần làm khi tấn công, khi phòng thủ, ví dụ minh họa và bài tập.</p>`
        + `<p>Nền tảng cần có trước: ${PUBLISHED.has('sat-cuc-lien-hoan-tong-quan') ? L('sat-cuc-lien-hoan-tong-quan', 'sát cục liên hoàn') : 'sát cục liên hoàn'}, ${PUBLISHED.has('sat-chieu-thuc-dung-tong-quan') ? L('sat-chieu-thuc-dung-tong-quan', 'sát chiêu thực dụng 13 đội hình') : 'sát chiêu thực dụng'} và tàn cuộc có khẩu quyết — nhiều chỗ trong chuyên đề sẽ nhắc lại các đòn và thế tàn đã học ở đó.</p>`
        + `<h2>Lộ trình ${chapters.length} chương</h2>${OL(chapters.map((c) => {
            const n = exercises.filter((x) => x.ch === c).length, e = (c.examples || []).length;
            return `${L(thSlug(c.theory[0]), c.ten)}${e || n ? ` — ${[e && `${e} ví dụ`, n && `${n} bài tập`].filter(Boolean).join(', ')}` : ''}`;
        }))}`
        + `<h2>Bài tập</h2><p>${total} bài tập, Đỏ luôn đi trước: ${cnt('mate')} bài chiếu hết (lời giải máy chứng minh hoặc máy tìm), ${cnt('best')} bài tìm nước then chốt (bắt quân, tranh tiên, khống chế… — máy phân tích, chấp nhận nước tương đương) và ${cnt('view')} bài phân tích (không có một nước vượt trội, để xem và tự đánh giá).</p>`
        + `<h2>Sơ đồ tư duy</h2><p>Toàn bộ nội dung được vẽ thành một sơ đồ tư duy có thể mở từng nhánh, che nội dung để tự nhẩm: ${POST('Trung cuộc sơ đồ tư duy: đòn đánh, tư duy, chiến thuật')}.</p>`,
};

const lessons = [overview, ...theory.map((x) => x.rec), ...examples.map((x) => x.rec), ...exercises.map((x) => x.rec)]
    .sort((a, b) => a.order - b.order).map((l) => { const { _k, _kind, ...r } = l; return r; });
SER.planned_total = lessons.length;
fs.writeFileSync(OUT, JSON.stringify({ series: SER, lessons }, null, 1) + '\n');
console.log(`Đã ghi ${lessons.length} bài (${theory.length} lý thuyết, ${examples.length} ví dụ, ${total} bài tập: ${cnt('mate')} chiếu hết, ${cnt('best')} tìm nước, ${cnt('view')} phân tích) → ${path.relative(process.cwd(), OUT)}`);

/* ---------------- sơ đồ tư duy ---------------- */
let outline = '';
for (const x of theory) {
    const ch = x.ch, t = x.t;
    const isFirst = ch.theory[0] === t;
    if (isFirst && ch.theory.length > 1) outline += `# ${ch.ten}\n`;
    const lv = ch.theory.length > 1 ? '##' : '#';
    outline += `${lv} ${t.title.split(' — ')[0].replace(/:.*/, '')} @${x.rec.slug}\n`;
    if (t.cong) outline += t.cong.map((c) => `- ${c}\n`).join('');
    else outline += `- ${t.summary}\n`;
    if (t.thu) outline += `> ${ch.key === 'bat-quan' ? 'Khi mình là bên đi bắt' : ch.key === 'lien-he-huu-co' && t.key === 'uu-viet-vi-tri-quan' ? 'Câu hỏi cho mỗi quân' : 'Khi phòng thủ'}: ${t.thu.map((s, i) => (i ? s.charAt(0).toLowerCase() + s.slice(1) : s)).join('; ')}.\n`;
    const egs = examples.filter((e) => e.ch === ch);
    if (t === ch.theory[ch.theory.length - 1] && egs.length) {
        outline += `${lv}# Ví dụ\n`;
        for (const e of egs) outline += `${lv}## ${EX[e.id].title} @${e.rec.slug}\n`;
    }
    if (ch.theory.length === 1 || t === ch.theory[ch.theory.length - 1]) outline += '\n';
}
fs.writeFileSync(path.join(HERE, 'mindmap.md'), outline);
{
    const MM_JSON = path.resolve(HERE, '../../database/seeders/data/mindmaps.json');
    const store = fs.existsSync(MM_JSON) ? JSON.parse(fs.readFileSync(MM_JSON, 'utf8')) : { mindmaps: [] };
    const entry = { slug: MINDMAP_SLUG, title: 'Trung cuộc sơ đồ tư duy — đòn đánh, tư duy, chiến thuật',
        description: 'Mở từng nhánh: các dòng đánh số là việc cần làm khi tấn công, ghi chú là khi phòng thủ. Bấm vào tên chủ đề để mở bài học, nhánh "Ví dụ" để xem trên bàn cờ.', outline };
    const i = store.mindmaps.findIndex((m) => m.slug === entry.slug);
    const old = store.mindmaps[i];
    const same = old && ['title', 'description', 'outline'].every((k) => old[k] === entry[k]);
    entry.updated_at = same ? old.updated_at : new Date().toISOString().replace(/\.\d+Z$/, 'Z');
    if (i >= 0) store.mindmaps[i] = entry; else store.mindmaps.push(entry);
    const slugs = new Set([...PUBLISHED, ...lessons.map((l) => l.slug)]);
    for (const m of outline.matchAll(/@([a-z0-9-]+)/g)) if (!slugs.has(m[1])) console.error('  ✗ sơ đồ: không có bài ' + m[1]);
    fs.writeFileSync(MM_JSON, JSON.stringify(store, null, 1) + '\n');
    console.log(`Sơ đồ tư duy "${entry.slug}"${same ? ' (không đổi)' : ' (đã cập nhật)'}`);
}
