// Rà kho thế cờ luyện tập: nước ĐỠ trong sách có phải cách đỡ tốt nhất không?
// Với mỗi thế kết thúc bằng chiếu hết, ở từng nước của bên thua: thử mọi nước đỡ, đo bên giải cần bao nhiêu nước nữa
// để chiếu hết (bộ giải chứng minh mateIn). Ghi lại khi có cách đỡ THOÁT (không bị chiếu hết trong số nước còn lại —
// chỉ khẳng định khi bộ giải tìm toàn bộ nước, tức còn ≤ 3 nước) hoặc KÉO DÀI hơn nước sách.
//
// Dữ liệu vào: JSON xuất từ bảng puzzles (xem .claude/puzzle-audit.md). Chạy song song theo phần:
//   node tools/puzzle-audit.mjs <puzzles.json> <phần> <số phần> > out-<phần>.jsonl
// Gộp kết quả cho trang Admin "Kiểm định thế cờ":
//   node tools/puzzle-audit.mjs merge out-*.jsonl > database/data/puzzle-audit.json
import fs from 'fs';
import { loadFen, toFen, fromIccs, legalMoves, toIccs, mateIn, gameOver } from '../resources/js/engine/engine.js';

if (process.argv[2] === 'merge') {
    const rows = process.argv.slice(3).flatMap((f) => fs.readFileSync(f, 'utf8').split(/\r?\n/).filter((l) => l.startsWith('{')).map((l) => JSON.parse(l)));
    const out = rows.filter((r) => r.issues.length).sort((a, b) => a.id - b.id)
        .map((r) => ({ id: r.id, lesson_id: r.lesson_id, start_ply: r.start_ply, issues: r.issues }));
    console.log(JSON.stringify({ generated: new Date().toISOString().slice(0, 10), checked: rows.length, puzzles: out }));
    process.exit(0);
}

const FULL_MAX = 3;   // khớp engine.js: ≤ 3 nước bộ giải xét MỌI nước → kết luận "thoát" mới chắc chắn
const [file, part = 0, parts = 1] = [process.argv[2], +process.argv[3] || 0, +process.argv[4] || 1];
const list = JSON.parse(fs.readFileSync(file, 'utf8')).filter((_, i) => i % parts === part);

const apply = (b, mv) => { const [f, t] = fromIccs(mv); b[t] = b[f]; b[f] = null; };

for (const p of list) {
    const red = p.side === 'do';
    const end = loadFen(p.fen);
    p.solution.forEach((mv) => apply(end, mv));
    const defRedAtEnd = p.solution.length % 2 === 1 ? !red : red;
    if (!gameOver(end, defRedAtEnd, false)) continue;           // thế "thắng thế", không phải chiếu hết

    const b = loadFen(p.fen);
    const issues = [];
    for (let i = 0; i < p.solution.length; i++) {
        if (i % 2 === 1) {
            const left = Math.ceil((p.solution.length - i - 1) / 2);   // số nước bên giải còn lại sau nước đỡ này
            const lim = left + 2;
            const replies = legalMoves(b, !red).map((m) => toIccs(m[0], m[1]));
            const res = {};
            for (const r of replies) {
                const c = b.slice(); apply(c, r);
                const m = mateIn(toFen(c), red, lim, 2500);
                res[r] = m?.timeout ? 'T' : m ? m.k : null;   // null = không chiếu hết được trong lim nước
            }
            const book = res[p.solution[i]];
            const escape = Object.entries(res).filter(([, k]) => k === null && left <= FULL_MAX).map(([r]) => r);
            const longer = Object.entries(res).filter(([, k]) => typeof k === 'number' && typeof book === 'number' && k > book).map(([r, k]) => `${r}:${k}`);
            if (escape.length || longer.length) {
                issues.push({ ply: i, book: p.solution[i], bookK: book, left, escape: escape.slice(0, 6), longer: longer.slice(0, 6) });
            }
        }
        apply(b, p.solution[i]);
    }
    console.log(JSON.stringify({ id: p.id, lesson_id: p.lesson_id, start_ply: p.start_ply, slug: p.slug, title: p.title, n: p.n, issues }));
}
