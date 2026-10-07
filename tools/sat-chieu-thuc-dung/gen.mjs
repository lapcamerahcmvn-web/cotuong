// tools/sat-chieu-thuc-dung/gen.mjs — Sinh chuyên đề "Sát Chiêu Thực Dụng — 13 Đội Hình" từ data.json (FEN + lời giải
// máy chứng minh / máy tìm, xem README.md) + don.cjs (27 đòn: định nghĩa, khẩu quyết công/thủ).
//   node tools/sat-chieu-thuc-dung/gen.mjs → tools/trung-cuoc-bao-dien/batches/sat-chieu-thuc-dung.json + mindmaps.json
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { loadFen } from '../../resources/js/engine/engine.js';
import { nm, isRed, rc, sq, cap1, pick, analyse, material, joinVi, finishPhrase, captionRed, captionBlack, themeOf, between, screenOf, checkersOf, attacks } from '../sat-cuc-lien-hoan/analyse.mjs';

const require = createRequire(import.meta.url);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(HERE, '../trung-cuoc-bao-dien/batches/sat-chieu-thuc-dung.json');
const DATA = JSON.parse(fs.readFileSync(path.join(HERE, 'data.json'), 'utf8'));
const DON = require('./don.cjs');
const CONTENT = require('../trung-cuoc-bao-dien/content-io.cjs').read();
const PUBLISHED = new Set(CONTENT.lessons.filter((l) => l.status === 'published').map((l) => l.slug));

export const SERIES_SLUG = 'sat-chieu-thuc-dung';
export const POST_SLUG = 'sat-chieu-thuc-dung-so-do-tu-duy-13-doi-hinh';
export const MINDMAP_SLUG = 'sat-chieu-thuc-dung-13-doi-hinh';
const P_ = 'sat-chieu-';
const SER = {
    name: 'Sát Chiêu Thực Dụng — 13 Đội Hình', slug: SERIES_SLUG, game_mode: 'co-tuong', phase: 'tan-cuoc', sort_order: 5, planned_total: 0,
    description: '27 đòn sát chiêu thực dụng có khẩu quyết tấn công và phòng thủ, xếp theo 13 đội hình bộ ba (Xe Pháo Mã, Song Xe Chốt…), kèm hàng trăm bài tập giải trên bàn cờ — lời giải đã được máy kiểm chứng.',
};

/* ---------------- 13 đội hình + 2 phần bài tập tổng hợp ---------------- */
const F = [
    { sec: 'SÁT CHIÊU XE SONG PHÁO', key: 'xe-song-phao', ten: 'Xe Song Pháo', don: ['giap-xe-phao', 'thien-dia-phao', 'song-hien-tuu', 'phao-lan', 'phao-trung', 'muon-sat', 'thiet-mon-thuyen', 'song-tien'],
      note: 'Hai Pháo là xương sống, Xe là quân dứt điểm. Đội hình này là gốc của mọi đòn Pháo: học kỹ ở đây thì các đội hình có Pháo phía sau chỉ là biến thể.' },
    { sec: 'SÁT CHIÊU XE PHÁO MÃ', key: 'xe-phao-ma', ten: 'Xe Pháo Mã', don: ['ma-hau-phao', 'ma-ngoa-tao', 'luong-chieu', 'xuyen-tam-cuc', 'trac-dien-ho', 'quai-giac-ma', 'ma-khau', 'dai-giac-ma', 'ma-dien', 'liet-ma-xe'],
      note: 'Đội hình toàn diện nhất: gộp các đòn của ba cặp Pháo Mã, Xe Pháo và Xe Mã. Phần bài tập dài nhất sách nằm ở đây.' },
    { sec: 'SÁT CHIÊU XE SONG MÃ', key: 'xe-song-ma', ten: 'Xe Song Mã', don: ['trac-dien-ho', 'liet-ma-xe', 'ma-khau', 'ma-ngoa-tao', 'quai-giac-ma', 'dai-giac-ma', 'ma-dien', 'song-ma-am-tuyen'],
      note: 'Bộ ba đánh cự ly gần cực mạnh: hai Mã thay nhau khóa và chiếu, Xe dọn đường hoặc chiếu rút.' },
    { sec: 'SÁT CHIÊU MÃ SONG PHÁO', key: 'ma-song-phao', ten: 'Mã Song Pháo', don: ['phao-trung', 'song-hien-tuu', 'phao-lan', 'thien-dia-phao', 'muon-sat', 'ma-hau-phao', 'ma-ngoa-tao', 'luong-chieu', 'ma-dien', 'quai-giac-ma'],
      note: 'Không có Xe nên mọi đòn dựa vào ngòi: Mã vừa là quân khóa Tướng vừa là ngòi cho hai Pháo.' },
    { sec: 'SÁT CHIÊU PHÁO SONG MÃ', key: 'phao-song-ma', ten: 'Pháo Song Mã', don: ['song-ma-am-tuyen', 'quai-giac-ma', 'dai-giac-ma', 'ma-dien', 'ma-khau', 'trac-dien-ho', 'ma-ngoa-tao', 'ma-hau-phao', 'muon-sat', 'luong-chieu'],
      note: 'Hai Mã gánh phần khóa Tướng, Pháo đứng sau chờ ngòi. Rất nhiều hình Mã vị trí (điền, khẩu, quải giác) xuất hiện ở đây.' },
    { sec: 'SÁT CHIÊU SONG XE PHÁO', key: 'song-xe-phao', ten: 'Song Xe Pháo', don: ['xuyen-tam-cuc', 'muon-sat', 'phao-lan', 'thiet-mon-thuyen', 'song-xe-nhi', 'nhi-xe-lech', 'trat-sat', 'xe-lua-don-toa'],
      note: 'Hỏa lực mạnh nhất: hai Xe phá Sĩ Tượng, Pháo làm then cửa hoặc chiếu rút. Đại đao xuyên tâm là đòn tiêu biểu.' },
    { sec: 'SÁT CHIÊU SONG XE MÃ', key: 'song-xe-ma', ten: 'Song Xe Mã', don: ['song-xe-nhi', 'nhi-xe-lech', 'trat-sat', 'xe-lua-don-toa', 'trac-dien-ho', 'ma-ngoa-tao', 'quai-giac-ma', 'dai-giac-ma', 'ma-khau', 'ma-dien', 'liet-ma-xe'],
      note: 'Bốn đòn song Xe cộng bảy đòn Xe Mã. Mã khẩu, Mã điền chỉ cần một Xe vào sát là xong.' },
    { sec: 'SÁT CHIÊU SONG XE CHỐT', key: 'song-xe-chot', ten: 'Song Xe Chốt', don: ['song-xe-nhi', 'nhi-xe-lech', 'trat-sat', 'xe-lua-don-toa', 'tam-tien-tot', 'tieu-dao-xuyen-tam', 'nhat-tot-tong-chung'],
      note: 'Chốt sát cung là quân khóa rẻ nhất: chỉ cần một Chốt kẹp nách là song Xe có chỗ dựa để sát.' },
    { sec: 'SÁT CHIÊU PHÁO MÃ CHỐT', key: 'phao-ma-chot', ten: 'Pháo Mã Chốt', don: ['ma-hau-phao', 'luong-chieu', 'thiet-mon-thuyen', 'muon-sat', 'ma-ngoa-tao', 'ma-dien', 'quai-giac-ma', 'dai-giac-ma', 'ma-khau', 'nhat-tot-tong-chung'],
      note: 'Ba quân nhẹ phối hợp: Chốt và Mã khóa, Pháo dứt điểm. Mỗi quân đều phải có việc, thừa một nước là hỏng.' },
    { sec: 'SÁT CHIÊU XE MÃ CHỐT', key: 'xe-ma-chot', ten: 'Xe Mã Chốt', don: ['trac-dien-ho', 'liet-ma-xe', 'ma-ngoa-tao', 'ma-khau', 'ma-dien', 'quai-giac-ma', 'dai-giac-ma', 'xuyen-tam-cuc', 'tam-tien-tot', 'nhat-tot-tong-chung'],
      note: 'Xe Mã là cặp chủ lực, Chốt làm căn hoặc tự mình xuyên tâm. Hay gặp ở cuối trung cuộc.' },
    { sec: 'SÁT CHIÊU XE PHÁO CHỐT', key: 'xe-phao-chot', ten: 'Xe Pháo Chốt', don: ['thien-dia-phao', 'thiet-mon-thuyen', 'phao-lan', 'muon-sat', 'xuyen-tam-cuc', 'tam-tien-tot', 'nhat-tot-tong-chung'],
      note: 'Pháo đầu làm then cửa, Xe và Chốt lao xuống sát — Thiết môn thuyên là đòn quen thuộc nhất của đội hình này.' },
    { sec: 'SÁT CHIÊU SONG PHÁO CHỐT', key: 'song-phao-chot', ten: 'Song Pháo Chốt', don: ['muon-sat', 'phao-trung', 'phao-lan', 'thien-dia-phao', 'song-hien-tuu', 'tien-chot-hau-phao', 'tieu-dao-xuyen-tam', 'nhat-tot-tong-chung', 'thiet-mon-thuyen'],
      note: 'Hai Pháo cần ngòi, Chốt chính là ngòi tốt nhất. Tiền chốt hậu pháo và Pháo trùng là hai hình hay gặp.' },
    { sec: 'SÁT CHIÊU SONG MÃ CHỐT', key: 'song-ma-chot', ten: 'Song Mã Chốt', don: ['song-ma-am-tuyen', 'ma-ngoa-tao', 'ma-dien', 'quai-giac-ma', 'dai-giac-ma', 'ma-khau', 'trac-dien-ho', 'tam-tien-tot', 'nhat-tot-tong-chung'],
      note: 'Đội hình khó dứt điểm nhất vì không có quân đi xa. Chốt khóa ô, hai Mã thay nhau chiếu — phải tính rất kỹ thứ tự nước.' },
    { sec: 'TRUNG CỤC SÁT CHIÊU', key: 'trung-cuoc', ten: 'Trung Cuộc Sát Chiêu', don: [], mix: true,
      note: 'Thế cờ trung cuộc còn nhiều quân: phải nhận ra đội hình nào đang có trên bàn rồi mới chọn đòn. Lời giải thường dài.' },
    { sec: 'SÁT CHIÊU TỔNG HỢP', key: 'tong-hop', ten: 'Bài Tập Tổng Hợp', don: [], mix: true,
      note: 'Trộn lẫn mọi đội hình, không gợi ý trước đòn nào — giống ván thật nhất.' },
];
const FBY = Object.fromEntries(F.map((f) => [f.sec, f]));
const DBY = Object.fromEntries(DON.map((d) => [d.key, d]));

/* ---------------- nhận diện đòn trên lời giải ---------------- */
function tagsOf(A, P) {
    const t = new Set();
    const b = A.fin.board, kB = A.fin.kB, [kr, kc] = rc(kB);
    const finals = A.fin.checkers.map((s) => ({ s, p: b[s] }));
    const red = A.plies.filter((p) => p.red);
    for (const { s, p } of finals) {
        if (p === 'C') {
            const scr = b[screenOf(b, s, kB)];
            if (scr === 'N') t.add('ma-hau-phao');
            if (scr === 'P') t.add('tien-chot-hau-phao');
            if (scr === 'R') {
                // Giáp Xe Pháo: Pháo – Xe – … – Pháo cùng một đường (Xe kẹp giữa hai Pháo)
                const [r, c] = rc(s), [r2, c2] = rc(screenOf(b, s, kB));
                const line = [];
                for (let i = 0; i < 90; i++) { const [y, x] = rc(i); if ((r === r2 && y === r) || (c === c2 && x === c)) line.push(i); }
                if (line.some((i) => i !== s && b[i] === 'C')) t.add('giap-xe-phao');
            }
            if (scr && !isRed(scr)) t.add('muon-sat');
            if (scr === 'C') t.add('phao-trung');
        }
        if (p === 'N') {
            const [r, c] = rc(s);
            if (r === 1 && (c === 2 || c === 6) && kr === 0) t.add('ngoa-tao');
            if (r === 2 && (c === 3 || c === 5) && kr === 0) t.add('quai-giac');
        }
        if (p === 'R') {
            // Xe lửa dồn toa: Xe sau nối đuôi Xe chiếu trên cùng đường, không quân xen giữa
            const [r, c] = rc(s);
            for (let i = 0; i < 90; i++) if (i !== s && b[i] === 'R') {
                const [y, x] = rc(i);
                const sameLine = (y === r && r === kr) || (x === c && c === kc);
                if (sameLine && between(b, i, s) === 0 && Math.abs(y - kr) + Math.abs(x - kc) > Math.abs(r - kr) + Math.abs(c - kc)) t.add('xe-lua-don-toa');
                // Nhị Xe lệch: Xe chiếu ngang hàng Tướng, Xe kia nằm hàng sát bên, khóa hàng đó ngay trên cột Tướng
                if (r === kr && Math.abs(y - kr) === 1 && between(b, i, y * 9 + kc) === 0 && !t.has('xe-lua-don-toa')) t.add('nhi-xe-lech');
            }
            // Trắc diện hổ: Mã đứng hoa Chốt lộ 3/7 (c7/g7) cùng phía với Tướng lệch, Xe kết thúc
            if (kr <= 1 && ((kc === 3 && b[2 * 9 + 2] === 'N') || (kc === 5 && b[2 * 9 + 6] === 'N'))) t.add('trac-dien-ho');
        }
    }
    // Đại giác Mã: Mã ở chân Sĩ hàng đáy (d9/f9) góp mặt ở thế cuối (chiếu hoặc kề Tướng)
    const kAdj = [-9, 9, -1, 1].map((d) => kB + d).filter((x) => x >= 0 && x < 27 && Math.abs((x % 9) - kc) <= 1 && (x % 9) >= 3 && (x % 9) <= 5);
    for (const s of [3, 5]) if (b[s] === 'N' && (finals.some((f) => f.s === s) || kAdj.some((x) => attacks(b, s, x)))) t.add('dai-giac-ma');
    // Thiên địa pháo: Pháo trung lộ + Pháo trên hàng đáy (hàng Tướng), có Pháo chiếu
    if (finals.some((f) => f.p === 'C')) {
        const cs = []; for (let i = 0; i < 90; i++) if (b[i] === 'C') cs.push(i);
        if (cs.some((i) => i % 9 === 4 && (i / 9 | 0) > kr) && cs.some((i) => (i / 9 | 0) === kr && i % 9 !== 4)) t.add('thien-dia-phao');
    }
    // Thiết môn thuyên: Pháo đầu (cột giữa) có đúng 1 ngòi tới ô giữa hàng Tướng, Tướng đứng lệch, Xe/Chốt kết thúc
    if (kc !== 4 && finals.some((f) => f.p === 'R' || f.p === 'P')) {
        for (let i = 0; i < 90; i++) if (b[i] === 'C' && i % 9 === 4 && (i / 9 | 0) > kr + 1 && between(b, i, kr * 9 + 4) === 1 && !b[kr * 9 + 4]) t.add('thiet-mon-thuyen');
    }
    // Song Mã ẩm tuyền: hai Mã đều áp sát cung (≤ 2 hàng/cột), một Mã chiếu
    const ns = []; for (let i = 0; i < 90; i++) if (b[i] === 'N') ns.push(i);
    if (ns.length >= 2 && finals.some((f) => f.p === 'N') && ns.every((i) => { const [y, x] = rc(i); return y <= 3 && x >= 2 && x <= 6; })) t.add('song-ma-am-tuyen');
    // Theo diễn biến lời giải
    red.forEach((p, j) => {
        if (p.discovered && p.piece === 'R' && p.checkers.includes('N')) t.add('liet-ma-xe');
        if (p.discovered && p.piece === 'C' && p.checkers.some((c) => c === 'R' || c === 'C')) t.add('phao-lan');
        if (p.captured === 'a' && rc(p.to)[0] === 1 && rc(p.to)[1] === 4) {
            if (p.piece === 'R') t.add('dai-dao-xuyen-tam');
            if (p.piece === 'P') t.add('tieu-dao-xuyen-tam');
        }
    });
    if (A.tags.includes('luong-chieu')) t.add('luong-chieu');
    const rooks = (P.fen.match(/R/g) || []).length;
    // Trất sát: thí Xe, quân Đen ăn Xe rồi đứng lấp ngay ô thoát cạnh Tướng, Xe còn lại chiếu hết
    if (rooks >= 2 && finals.some((f) => f.p === 'R') && A.plies.some((p, j) => p.red && p.sac && p.piece === 'R'
        && b[p.to] && !isRed(b[p.to]) && b[p.to] !== 'k' && kAdj.includes(p.to))) t.add('trat-sat');
    const pawnMoves = red.filter((p) => p.piece === 'P').length;
    const pawnChecks = red.filter((p) => p.piece === 'P' && p.checkers.length).length;
    if (pawnChecks >= 2 && finals.some((f) => f.p === 'P')) t.add('nhat-tot-tong-chung');
    else if (pawnMoves >= 3 && !finals.some((f) => f.p === 'P')) t.add('tam-tien-tot');
    return [...t];
}
// nhãn → đòn (don.cjs)
const TAG2DON = Object.fromEntries(DON.filter((d) => d.tag).map((d) => [d.tag, d.key]));

/* ---------------- tiện ích ---------------- */
const L = (slug, text) => `<a href="/bai-hoc/${slug}">${text}</a>`;
const POST = (text) => `<a href="/tin-tuc/kien-thuc-co-tuong/${POST_SLUG}">${text}</a>`;
const donSlug = (k) => `${P_}don-${k}`;
const chapSlug = (f) => `${P_}doi-hinh-${f.key}`;
const exSlug = (f, n) => `${P_}${f.key}-bai-${n}`;
const LEVEL = (fi) => fi <= 4 ? 'trung-cap' : fi <= 12 ? 'trung-cap' : 'nang-cao';
const LIST = (a) => `<ul>${a.map((x) => `<li>${x}</li>`).join('')}</ul>`;

/* ---------------- bài tập ---------------- */
const byF = new Map(F.map((f) => [f.key, []]));
// Chỉ nhận lời giải kết thúc bằng CHIẾU HẾT (máy tìm đôi khi ra "hết nước đi" — thắng theo luật nhưng không phải sát cục).
const stalemates = [];
for (const P of DATA.keep) {
    if (!analyse({ fen: P.fen, main: P.main }).fin.checkers.length) { stalemates.push(P.id); continue; }
    byF.get(FBY[P.sec].key).push(P);
}
if (stalemates.length) console.log('Bỏ (kết thúc bằng hết nước đi, không chiếu hết):', stalemates.join(' '));

const exercises = [];
const byDon = Object.fromEntries(DON.map((d) => [d.key, []]));
F.forEach((f, fi) => {
    byF.get(f.key).forEach((P, idx) => {
        const n = idx + 1;
        const A = analyse({ fen: P.fen, main: P.main, id: P.id });
        const tags = tagsOf(A, P);
        const dons = [...new Set(tags.map((x) => TAG2DON[x]).filter(Boolean))];
        const seed = P.id;
        const mat = material(P.fen);
        const quiet = A.plies.filter((p) => p.red && !p.checkers.length).length;
        let theme = dons.length ? dons.slice(0, 2).map((k) => DBY[k].ten).join(', ') : themeOf(A);
        if (A.sacs.length && dons.length < 2) theme = `Thí ${[...new Set(A.sacs)][0]}, ${theme}`;
        const captions = {};
        A.plies.forEach((p, i) => { captions[i + 1] = p.red ? captionRed(p, A, i, seed, i === A.plies.length - 1) : captionBlack(p, A.plies[i - 1], seed, i); });
        const fin = finishPhrase(A, seed);
        const k = P.k;
        const intro = quiet
            ? `Đỏ đi trước và chiếu hết sau ${k} nước. Lời giải có ${quiet === 1 ? 'một nước êm' : quiet + ' nước êm'} (không chiếu): Đỏ dựng thế sát trước, Đen không còn cách đỡ.`
            : pick(seed, [`Đỏ đi trước, chiếu liên tục ${k} nước là hết cờ, dù Đen đỡ thế nào.`, `Đỏ đi trước. Tìm chuỗi nước chiếu dẫn tới chiếu hết sau ${k} nước.`, `Thế cờ đội hình ${f.ten}: Đỏ đi trước, ${k} nước chiếu liên hoàn là xong.`]);
        const proofNote = P.src === 'search'
            ? 'Lời giải do máy tìm (Đen đỡ theo đánh giá của máy); chế độ <em>Thử tự giải</em> vẫn chấp nhận mọi đường chiếu hết đúng hạn.'
            : 'Lời giải đã được máy chứng minh: Đen đỡ cách nào cũng bị chiếu hết trong số nước đã nêu.';
        const hints = [
            `<li><strong>Đội hình:</strong> ${f.mix ? 'thế cờ nhiều quân — tự xác định bộ ba quân nào làm chủ lực' : `${f.ten} — xem lại ${L(chapSlug(f), 'các đòn của đội hình này')}`}.</li>`,
            `<li><strong>Quân chiếu được ngay:</strong> ${joinVi(A.firstChecks) || 'không có — phải dựng thế trước'}.</li>`,
            A.threat ? `<li><strong>Đen đang dọa:</strong> ${A.threat.piece} Đen ${A.threat.mate ? 'dọa chiếu hết' : 'dọa chiếu'} — Đỏ phải ra đòn trước.</li>` : '',
        ].join('');
        const steps = [];
        for (let i = 0; i < A.plies.length; i += 2) {
            const r = A.plies[i], d = A.plies[i + 1];
            steps.push(`<li><strong>${r.wxf}</strong>${d ? ` — Đen ${d.wxf}` : ' — hết cờ'}.${r.sac ? ` Đỏ thí ${nm(r.piece)}.` : ''}${!r.checkers.length ? ' Nước êm.' : ''}${r.double ? ' Lưỡng chiếu.' : ''}</li>`);
        }
        const key = [];
        for (const dk of dons) key.push(`<li><strong>${L(donSlug(dk), DBY[dk].ten)}:</strong> ${DBY[dk].cong[0].replace(/ — /g, ': ')}.</li>`);
        if (A.sacs.length) key.push(`<li><strong>Thí quân:</strong> Đỏ bỏ ${joinVi(A.sacs)} để kéo quân Đen lệch chỗ hoặc phá lớp phòng thủ.</li>`);
        key.push(`<li><strong>Đòn kết thúc:</strong> ${fin.bits.length ? cap1(joinVi(fin.bits)) : `${fin.who} chiếu hết`}.</li>`);
        const content = `<p>${intro}</p><p><strong>Đỏ:</strong> ${mat.red}. <strong>Đen:</strong> ${mat.black}.</p>`
            + `<h2>Gợi ý tư duy</h2>${'<ul>' + hints + '</ul>'}`
            + `<h2>Lời giải</h2><ol>${steps.join('')}</ol><p>${proofNote}</p>`
            + `<h2>Điểm then chốt</h2><ul>${key.join('')}</ul>`;
        let seo = `Sát Chiêu ${f.mix ? f.ten : f.ten} Bài ${n}: ${theme}`;
        if (seo.length > 60) seo = seo.slice(0, 60).replace(/[ ,:]+[^ ,:]*$/, '');
        let desc = `Bài tập sát chiêu thực dụng đội hình ${f.ten}: Đỏ đi trước, chiếu hết trong ${k} nước. ${theme}. Tự giải trên bàn cờ, xem lời giải từng nước.`;
        if (desc.length > 160) desc = desc.slice(0, 157).replace(/\s+\S*$/, '') + '…';
        const rec = {
            order: (fi + 1) * 1000 + 100 + n, slug: exSlug(f, n), title: `${f.ten} · Bài ${n}: ${theme}`, level: LEVEL(fi),
            fen: P.fen, first: 'do', main: P.main, captions, expect: 'mate', puzzle_side: 'do',
            summary: `Đội hình ${f.ten}: Đỏ đi trước, chiếu hết trong ${k} nước. ${theme}.`, content, seo_title: seo, seo_description: desc,
        };
        exercises.push({ rec, f, dons, k, A });
        for (const dk of dons) byDon[dk].push({ rec, f, k });
    });
});

/* ---------------- bài lý thuyết từng đòn ---------------- */
const donLessons = DON.map((d, i) => {
    const ex = byDon[d.key].slice().sort((a, b) => a.k - b.k);
    const showcase = ex[0];
    const forms = F.filter((f) => f.don.includes(d.key));
    const dt = d.dt && PUBLISHED.has(d.dt) ? d.dt : null;
    const content = `<p><strong>${d.ten}</strong>${d.aka ? ` (còn gọi ${d.aka})` : ''}: ${d.dinh}</p>`
        + (showcase ? `<p>Bàn cờ bên trên là ${L(showcase.rec.slug, `bài ${showcase.f.ten} số ${showcase.rec.slug.split('-bai-')[1]}`)}: Đỏ đi trước, chiếu hết sau ${showcase.k} nước bằng đòn này. Bấm "Tiến" để xem từng nước.</p>` : '')
        + `<h2>Khẩu quyết</h2>${LIST(d.cong)}`
        + `<h2>Khi phòng thủ</h2>${LIST(d.thu)}`
        + `<h2>Dùng trong đội hình nào</h2><p>${forms.length ? forms.map((f) => L(chapSlug(f), f.ten)).join(', ') + '.' : 'Đòn kết hợp, gặp ở nhiều đội hình.'}</p>`
        + (ex.length ? `<h2>Bài tập luyện đòn ${d.ten}</h2><p>${ex.length} bài trong chuyên đề có dùng đòn này${ex.length > 8 ? ', dưới đây là 8 bài ngắn nhất' : ''}:</p>${LIST(ex.slice(0, 8).map((x) => `${L(x.rec.slug, `${x.f.ten} — bài ${x.rec.slug.split('-bai-')[1]}: ${x.rec.title.split(': ').slice(1).join(': ')}`)} (${x.k} nước)`))}` : '')
        + (dt ? `<p>Xem thêm ví dụ có lời bình trong chuyên đề Sát Pháp Đại Toàn: ${L(dt, 'ví dụ minh họa')}.</p>` : '')
        + `<p>Toàn bộ 27 đòn được vẽ thành sơ đồ tư duy trong bài ${POST('Sát chiêu thực dụng: sơ đồ tư duy 13 đội hình')}.</p>`;
    const base = {
        order: 100 + i, slug: donSlug(d.key), title: `Đòn Sát Chiêu · ${d.ten}: Khẩu Quyết Tấn Công Và Phòng Thủ`, level: 'co-ban',
        summary: `${d.ten}: ${d.dinh.split('. ')[0]}. Khẩu quyết khi tấn công, khi phòng thủ và bài tập luyện.`,
        seo_title: `${d.ten} — Khẩu Quyết Sát Chiêu Cờ Tướng`.slice(0, 60),
        seo_description: (`Đòn ${d.ten} trong cờ tướng: định nghĩa, khẩu quyết tấn công và phòng thủ, ${ex.length ? ex.length + ' bài tập' : 'bài tập'} giải trên bàn cờ.`).slice(0, 160),
        content,
    };
    if (showcase) Object.assign(base, { fen: showcase.rec.fen, first: 'do', main: showcase.rec.main, captions: showcase.rec.captions, expect: 'mate' });
    return { rec: base, d, hasBoard: !!showcase, dt };
});

/* ---------------- bài đội hình (mở chương) ---------------- */
const chapLessons = F.map((f, fi) => {
    const list = exercises.filter((x) => x.f === f);
    const cnt = {}; for (const x of list) for (const dk of x.dons) cnt[dk] = (cnt[dk] || 0) + 1;
    const ks = list.map((x) => x.k);
    const donList = f.mix
        ? Object.entries(cnt).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([dk, c]) => `${L(donSlug(dk), DBY[dk].ten)} — ${c} bài`)
        : f.don.map((dk) => `${L(donSlug(dk), DBY[dk].ten)}${cnt[dk] ? ` — ${cnt[dk]} bài` : ''}`);
    const old = `sat-phap-${f.key}`;
    const content = `<p>${f.note}</p>`
        + `<h2>${f.mix ? 'Đòn hay gặp nhất trong phần này' : `Các đòn của đội hình ${f.ten}`}</h2>${LIST(donList)}`
        + (!f.mix ? `<p>Phương pháp chung: điểm danh lại các đòn trên, chọn đòn hợp với thế cờ, rồi hỏi "có cần thêm quân hỗ trợ không?". Khi phòng thủ trước đội hình này, đề phòng đủ các đòn đó và chặn đúng chỗ, đúng lúc.</p>` : '')
        + `<h2>Bài tập (${list.length} bài)</h2><p>Mỗi bài: Đỏ đi trước, chiếu hết trong ${Math.min(...ks)}–${Math.max(...ks)} nước. Chọn <em>Thử tự giải</em> để tự cầm Đỏ, máy đỡ dai nhất cho Đen.</p>`
        + LIST(list.slice(0, 6).map((x) => L(x.rec.slug, x.rec.title.split(' · ')[1])))
        + (PUBLISHED.has(old) ? `<p>Ván mẫu có biến của đội hình này: ${L(old, `Sát Pháp ${f.ten}`)} (chuyên đề Sát Pháp Thực Dụng — 13 Đội Hình).</p>` : '');
    return {
        order: (fi + 1) * 1000, slug: chapSlug(f), title: `${f.ten} · ${f.mix ? 'Giới Thiệu Và Cách Luyện' : 'Các Đòn Của Đội Hình'}`, level: LEVEL(fi),
        summary: f.mix ? `${f.note} ${list.length} bài tập.` : `Đội hình ${f.ten}: ${f.don.length} đòn sát chiêu và ${list.length} bài tập chiếu hết.`,
        seo_title: (f.mix ? `${f.ten} — Bài Tập Sát Chiêu Cờ Tướng` : `Đội Hình ${f.ten} — Các Đòn Sát Chiêu Cờ Tướng`).slice(0, 60),
        seo_description: (`${f.mix ? f.ten : 'Đội hình ' + f.ten}: ${f.mix ? '' : f.don.length + ' đòn sát chiêu thực dụng, '}${list.length} bài tập cờ tướng chiếu hết giải trên bàn cờ, lời giải kiểm chứng bằng máy.`).slice(0, 160),
        content,
    };
});

/* ---------------- tổng quan + phương pháp tư duy ---------------- */
const total = exercises.length;
const overview = {
    order: 0, slug: `${P_}thuc-dung-tong-quan`, title: 'Sát Chiêu Thực Dụng — Tổng Quan 13 Đội Hình Và Lộ Trình Luyện', level: 'co-ban',
    summary: `13 đội hình bộ ba, 27 đòn sát chiêu có khẩu quyết và ${total} bài tập chiếu hết: học theo thứ tự nào, luyện thế nào.`,
    seo_title: 'Sát Chiêu Thực Dụng Cờ Tướng — 13 Đội Hình, 27 Đòn',
    seo_description: `Sát chiêu thực dụng cờ tướng: 13 đội hình bộ ba, 27 đòn có khẩu quyết tấn công và phòng thủ, ${total} bài tập chiếu hết giải trên bàn cờ.`,
    content: `<p><strong>Sát chiêu thực dụng</strong> là những đòn kết liễu gặp đi gặp lại trong ván thật. Ván cờ có thể kết thúc ở bất kỳ giai đoạn nào nếu một bên dính đòn, nên đây là phần nên luyện sớm — sau khi đã quen ${L('sat-cuc-lien-hoan-tong-quan', 'sát cục liên hoàn')} để tăng sức tính.</p>`
        + `<p>Chuyên đề chia theo <strong>13 đội hình bộ ba</strong> — ba quân tấn công phối hợp: Xe Song Pháo, Xe Pháo Mã, Xe Song Mã, Mã Song Pháo, Pháo Song Mã, Song Xe Pháo, Song Xe Mã, Song Xe Chốt, Pháo Mã Chốt, Xe Mã Chốt, Xe Pháo Chốt, Song Pháo Chốt, Song Mã Chốt. Mỗi đội hình có một nhóm đòn quen thuộc; cùng một đòn (ví dụ Mã ngọa tào) xuất hiện ở nhiều đội hình.</p>`
        + `<h2>Lộ trình</h2><ol><li>Đọc ${L(`${P_}phuong-phap-tu-duy`, 'phương pháp tư duy sát chiêu')} (4 câu hỏi trước mỗi thế cờ).</li><li>Học 27 đòn: mỗi bài có định nghĩa, khẩu quyết khi tấn công, khi phòng thủ, bàn cờ minh họa và danh sách bài tập luyện đòn đó.</li><li>Giải bài tập theo từng đội hình, rồi tới phần ${L(chapSlug(F[13]), 'trung cuộc')} và ${L(chapSlug(F[14]), 'tổng hợp')}.</li></ol>`
        + `<h2>13 đội hình</h2>${LIST(chapLessons.slice(0, 13).map((c, i) => `${L(c.slug, F[i].ten)} — ${exercises.filter((x) => x.f === F[i]).length} bài tập`))}`
        + `<h2>Sơ đồ tư duy</h2><p>Toàn bộ đòn và khẩu quyết được vẽ thành một sơ đồ tư duy có ví dụ, chế độ che khẩu quyết để tự nhẩm và ôn ngẫu nhiên: ${POST('Sát chiêu thực dụng: sơ đồ tư duy 13 đội hình')}.</p>`
        + `<p>Lời giải các bài tập đã được máy kiểm tra: nước cuối của mọi bài đều là chiếu hết. Bài nào sơ đồ có lỗi hoặc không phải thế chiếu hết bắt buộc đã được bỏ ra.</p>`,
};
const method = {
    order: 1, slug: `${P_}phuong-phap-tu-duy`, title: 'Phương Pháp Tư Duy Sát Chiêu — 4 Câu Hỏi Trước Mỗi Thế Cờ', level: 'co-ban',
    summary: 'Bốn câu hỏi cần tự trả lời trước khi ra đòn: đã gặp hình này chưa, có sát liên hoàn không, đội hình nào, đòn nào mạnh nhất.',
    seo_title: 'Phương Pháp Tư Duy Sát Chiêu Cờ Tướng — 4 Câu Hỏi',
    seo_description: 'Phương pháp tư duy sát chiêu cờ tướng: 4 câu hỏi trước mỗi thế cờ để tìm đòn kết liễu — hình đã gặp, sát liên hoàn, đội hình công sát, đòn mạnh nhất.',
    content: `<p>Thấy thế cờ có cơ hội tấn công, đừng vội đi thử. Tự hỏi lần lượt bốn câu dưới đây — mỗi câu loại bớt một phần phương án sai.</p>`
        + `<h2>1. Hình này đã gặp chưa?</h2><p>Nếu thế cờ giống một hình đã học, đòn đánh gần như có sẵn. Nếu chưa giống hẳn, tìm cách đưa nó về hình đã học — thường chỉ cần một nước chuyển quân hoặc một nước thí.</p>`
        + `<h2>2. Có sát liên hoàn hoặc nước dọa sát không?</h2><p>Kiểm tra trước chuỗi nước chiếu liên tục: nếu có, áp dụng ngay cách giải ${L('sat-cuc-lien-hoan-tong-quan', 'sát cục liên hoàn')}. Nếu không, tìm nước dọa sát khiến đối phương phải đỡ, để giành thêm thời gian điều quân.</p>`
        + `<h2>3. Dùng đội hình nào để công sát?</h2><ul><li>Chọn quân chủ lực và những quân đi đánh mạnh nhất trong thế cờ này.</li><li>Để lại quân phòng thủ hợp lý — đừng mang theo quân thừa làm chậm đòn.</li><li>Đánh vào chỗ yếu của đối phương, tránh chỗ mạnh kẻo hao quân vô ích.</li></ul>`
        + `<h2>4. Đòn nào đã học, đòn nào mạnh nhất lúc này?</h2><p>Điểm danh các đòn của đội hình vừa chọn (xem bài mở đầu từng đội hình), chọn đòn mạnh nhất và hỏi thêm: có cần quân hỗ trợ không?</p>`
        + `<h2>Khi phòng thủ</h2><p>Làm ngược lại: nhận ra đội hình đối phương đang có, liệt kê các đòn của đội hình đó và chặn đúng nơi, đúng lúc — đuổi quân chủ lực, chặn quân hỗ trợ, giữ sẵn đường thoát cho Tướng.</p>`
        + `<p>Bốn câu hỏi này cùng 27 đòn được vẽ thành sơ đồ trong bài ${POST('Sát chiêu thực dụng: sơ đồ tư duy 13 đội hình')}.</p>`,
};

const lessons = [overview, method, ...donLessons.map((x) => x.rec), ...chapLessons, ...exercises.map((x) => x.rec)];
SER.planned_total = lessons.length;
fs.writeFileSync(OUT, JSON.stringify({ series: SER, lessons }, null, 1) + '\n');
console.log(`Đã ghi ${lessons.length} bài (${exercises.length} bài tập, ${donLessons.length} đòn, ${chapLessons.length} đội hình) → ${path.relative(process.cwd(), OUT)}`);
const st = {}; for (const d of DON) st[d.key] = byDon[d.key].length;
console.log(st);

/* ---------------- sơ đồ tư duy ---------------- */
const NHOM = ['Pháo', 'Pháo Mã', 'Xe Pháo', 'Xe Mã', 'Song Mã', 'Song Xe', 'Chốt'];
const NHOM_TEN = { 'Pháo': 'Đòn Pháo', 'Pháo Mã': 'Đòn Pháo Mã', 'Xe Pháo': 'Đòn Xe Pháo', 'Xe Mã': 'Đòn Xe Mã (vị trí Mã)', 'Song Mã': 'Đòn Song Mã', 'Song Xe': 'Đòn Song Xe', 'Chốt': 'Đòn Chốt' };
let outline = `# Phương pháp tư duy: 4 câu hỏi @${method.slug}\n- Hình này đã gặp chưa? Đưa được về hình đã học không?\n- Có sát liên hoàn hoặc nước dọa sát không?\n- Dùng đội hình nào: quân chủ lực, quân đi đánh, quân ở nhà giữ?\n- Đòn nào đã học, đòn nào mạnh nhất lúc này, cần thêm quân hỗ trợ không?\n> Khi phòng thủ: nhận ra đội hình đối phương, liệt kê đòn của nó, chặn đúng nơi đúng lúc.\n\n`;
for (const g of NHOM) {
    outline += `# ${NHOM_TEN[g]}\n`;
    for (const x of donLessons.filter((x) => x.d.nhom === g)) {
        const link = x.hasBoard ? x.rec.slug : (x.dt || x.rec.slug);
        outline += `## ${x.d.ten} @${link}\n` + x.d.cong.map((c) => `- ${c}\n`).join('') + `> Phòng thủ: ${x.d.thu.map((t, i) => (i ? t.charAt(0).toLowerCase() + t.slice(1) : t)).join('; ')}.\n`;
    }
    outline += '\n';
}
outline += `# 13 đội hình bộ ba\n`;
chapLessons.slice(0, 13).forEach((c, i) => { outline += `## ${F[i].ten} @${c.slug}\n- ${F[i].don.map((k) => DBY[k].ten).join(', ')}\n> ${F[i].note}\n`; });
fs.writeFileSync(path.join(HERE, 'mindmap.md'), outline);
{
    const MM_JSON = path.resolve(HERE, '../../database/seeders/data/mindmaps.json');
    const store = fs.existsSync(MM_JSON) ? JSON.parse(fs.readFileSync(MM_JSON, 'utf8')) : { mindmaps: [] };
    const entry = { slug: MINDMAP_SLUG, title: 'Sát chiêu thực dụng — 27 đòn, 13 đội hình',
        description: 'Mở từng nhánh để xem khẩu quyết tấn công (đánh số) và cách phòng thủ (ghi chú). Bấm "Xem ví dụ" để thấy đòn trên bàn cờ.', outline };
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
