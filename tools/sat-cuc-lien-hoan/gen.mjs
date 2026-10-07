// tools/sat-cuc-lien-hoan/gen.mjs — Sinh batch chuyên đề "Sát Cục Liên Hoàn 1-10 Nước" từ data.json (FEN + lời giải
// đã được solve.mjs CHỨNG MINH chiếu hết). Phân tích từng lời giải để viết lời giảng: thí quân, lưỡng chiếu, chiếu rút,
// hình sát cuối (Mã ngọa tào, quải giác, Pháo trùng, mặt Tướng, muộn cung…), Đen có đang dọa sát không.
//
//   node tools/sat-cuc-lien-hoan/gen.mjs   → tools/trung-cuoc-bao-dien/batches/sat-cuc-lien-hoan.json
//   node tools/trung-cuoc-bao-dien/tcbd.cjs build tools/trung-cuoc-bao-dien/batches/sat-cuc-lien-hoan.json
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadFen } from '../../resources/js/engine/engine.js';
import { nm, rc, NUM, cap1, pick, analyse, material, joinVi, finishPhrase, captionRed, captionBlack, themeOf } from './analyse.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, '../trung-cuoc-bao-dien/batches/sat-cuc-lien-hoan.json');
const DATA = JSON.parse(fs.readFileSync(path.join(HERE, 'data.json'), 'utf8'));

export const SERIES_SLUG = 'sat-cuc-lien-hoan';
export const POST_SLUG = 'phuong-phap-tu-duy-giai-bai-tap-sat-cuc';
const SER = {
    name: 'Sát Cục Liên Hoàn 1-10 Nước', slug: SERIES_SLUG, game_mode: 'co-tuong', phase: 'tan-cuoc', sort_order: 4, planned_total: 0,
    description: 'Hơn 1.100 bài tập chiếu hết liên hoàn từ 1 đến 10 nước: Đỏ đi trước, nước nào cũng chiếu, Đen đỡ thế nào cũng bị hết cờ. Tự giải trên bàn cờ, xem lời giải từng nước — mọi lời giải đều đã được máy kiểm chứng.',
};

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
