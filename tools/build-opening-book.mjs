// Dựng book khai cuộc từ các BÀI KHAI CUỘC trên site (đi từ thế mở) + các dòng viết tay trong book.js.
// Bài giảng nguyên lý có khi CỐ Ý minh hoạ nước sai → mỗi diễn biến được engine chấm từng nước (tìm sâu, điểm chính xác
// từng nước gốc) và CẮT ngay trước nước đầu tiên kém hơn nước tốt nhất quá ngưỡng. Chỉ giữ ký hiệu nước đi (dữ kiện),
// không chép lời bình / tên nguồn.
//
//   node tools/build-opening-book.mjs <openings.json> <phần> <số phần> > part-<phần>.jsonl      (chấm, chạy song song)
//   node tools/build-opening-book.mjs merge part-*.jsonl > resources/js/engine/book-data.js     (gộp → module)
// openings.json = [{ id, moves:[iccs…] }] xuất từ bài published phase khai-cuoc có initial_fen = thế mở (xem
// .claude/opening-book.md).
import fs from 'fs';
import { search, stateFrom, loadFen, START_FEN, fromIccs } from '../resources/js/engine/engine.js';

const MAX_PLIES = 20;     // 10 nước mỗi bên — sau đó máy tự tính
const MIN_PLIES = 4;
const MAX_LOSS = 150;     // điểm (1 Tốt = 100). Đánh giá khai cuộc ở độ sâu 6 lệch ±1 Tốt (VD Xe qua hà bị chấm cao) → chỉ cắt nước kém rõ (bỏ quân, mất thế lớn)
const DEPTH = 6, TIME = 2500;

if (process.argv[2] === 'merge') {
    const rows = process.argv.slice(3).flatMap((f) => fs.readFileSync(f, 'utf8').split(/\r?\n/).filter((l) => l.startsWith('{')).map((l) => JSON.parse(l)));
    // Bỏ dòng là tiền tố của dòng khác (đã nằm trong dòng dài hơn), gộp dòng trùng.
    const lines = [...new Set(rows.filter((r) => r.keep.length >= MIN_PLIES).map((r) => r.keep.join(' ')))]
        .sort((a, b) => b.length - a.length);
    const kept = lines.filter((l, i) => !lines.slice(0, i).some((x) => x.startsWith(l + ' ')));
    const cut = rows.filter((r) => r.cut);
    const out = `// TỰ SINH bởi tools/build-opening-book.mjs — KHÔNG sửa tay. Diễn biến khai cuộc lấy từ các bài khai cuộc trên site,
// đã được engine kiểm từng nước (cắt trước nước kém > ${MAX_LOSS} điểm ở độ sâu ${DEPTH}). ${kept.length} dòng, ${cut.length} dòng bị cắt sớm.
export const LESSON_LINES = ${JSON.stringify(kept.sort())};
`;
    process.stdout.write(out);
    process.exit(0);
}

const [file, part = 0, parts = 1] = [process.argv[2], +process.argv[3] || 0, +process.argv[4] || 1];
const list = JSON.parse(fs.readFileSync(file, 'utf8')).filter((_, i) => i % parts === part);

for (const ln of list) {
    const b = loadFen(START_FEN);
    let red = true;
    const keep = [];
    let cut = null;
    for (const mv of ln.moves.slice(0, MAX_PLIES)) {
        const r = search(stateFrom(b), red, { depth: DEPTH, timeMs: TIME, exactRoot: true });
        const sc = r.scores?.[mv];
        if (sc === undefined) { cut = { ply: keep.length, mv, why: 'sai luật / không có' }; break; }
        const loss = r.score - sc;
        if (loss > MAX_LOSS) { cut = { ply: keep.length, mv, loss, best: r.move }; break; }
        keep.push(mv);
        const [f, t] = fromIccs(mv); b[t] = b[f]; b[f] = null;
        red = !red;
    }
    console.log(JSON.stringify({ id: ln.id, keep, cut }));
}
