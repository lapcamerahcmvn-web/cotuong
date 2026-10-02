// Book khai cuộc CỜ TƯỚNG (thế mở chuẩn) — các hệ chủ lưu trong thực chiến hiện đại. Mỗi dòng là 1 diễn biến (ICCS,
// Đỏ đi trước) kèm trọng số phổ biến; thế cờ ở mỗi tiền tố → các nước sách kế tiếp (gộp trọng số). Máy chọn ngẫu nhiên
// có trọng số để không lặp 1 kiểu; phân tích ván ghi "Nước sách" cho nước nằm trong book.
// Toạ độ: cột a..i trái→phải nhìn từ Đỏ, hàng 0 (đáy Đỏ)..9 (đáy Đen). Hợp lệ từng nước kiểm ở tools/engine-test.mjs.
import { START_FEN, loadFen, toFen, fromIccs } from './engine.js';

export const LINES = [
    // ── Pháo đầu (炮二平五) đối Bình phong mã (屏风马) ─────────────────────────────
    [12, 'h2e2 h9g7 h0g2 i9h9 i0h0 b9c7 c3c4 g6g5 b0c2 c9e7'],          // Pháo đầu Mã thất lộ đối Bình phong mã
    [10, 'h2e2 h9g7 h0g2 i9h9 i0h0 b9c7 h0h6 g6g5 b0c2 c9e7'],          // Pháo đầu Xe qua hà đối Bình phong mã
    [6, 'h2e2 h9g7 h0g2 i9h9 i0h0 b9c7 h0h6 c6c5 b0c2 c9e7'],           // … Bình phong mã tiến tốt 3
    [5, 'h2e2 h9g7 h0g2 i9h9 i0h0 b9c7 b0c2 g6g5 c3c4 c9e7'],           // Pháo đầu Mã thất lộ (thứ tự khác)
    [5, 'h2e2 h9g7 h0g2 g6g5 i0h0 i9h9 b0c2 b9c7 c3c4 c9e7'],           // đối Bình phong mã tiến tốt 7 sớm
    // ── Pháo đầu đối Phản cung mã (反宫马) ───────────────────────────────────────
    [6, 'h2e2 b9c7 h0g2 h7f7 i0h0 h9g7 c3c4 g6g5'],                      // Phản cung mã (Mã 2 tiến 3 · Pháo 8 bình 6)
    // ── Thuận pháo (顺炮) & Liệt pháo (列炮) ─────────────────────────────────────
    [7, 'h2e2 h7e7 h0g2 h9g7 i0h0 i9i8 b0c2 i8d8'],                      // Thuận pháo Xe thẳng đối Xe ngang (Xe 9 bình 4)
    [5, 'h2e2 h7e7 h0g2 h9g7 i0h0 i9h9 b0c2 b9c7'],                      // Thuận pháo Xe thẳng đối Xe thẳng
    [4, 'h2e2 b7e7 h0g2 b9c7 i0h0 a9b9 b0c2 h9g7'],                      // Liệt pháo
    // ── Pháo đầu đối Tam bộ hổ / Đơn đề mã ───────────────────────────────────────
    [4, 'h2e2 h9g7 h0g2 h7i7 i0h0 i9h9 b0c2 b9c7'],                      // Tam bộ hổ (Pháo 8 bình 9)
    // ── Tiên nhân chỉ lộ (仙人指路: 兵七进一) ─────────────────────────────────────
    [8, 'c3c4 g6g5 b0c2 h9g7 h0g2 b9c7 i0h0 i9h9'],                      // Đối binh (卒7进1)
    [6, 'c3c4 b7c7 h2e2 c9e7 h0g2 h9g7 i0h0 i9h9'],                      // Pháo dưới tốt (卒底炮: 炮2平3)
    [4, 'c3c4 c9e7 h2e2 h9g7 h0g2 i9h9'],                                 // Phi tượng đáp lại
    [3, 'c3c4 h9g7 h2e2 g6g5 h0g2 i9h9'],                                 // Khởi mã đáp lại
    // ── Phi tượng cục (飞相局: 相三进五) ─────────────────────────────────────────
    [6, 'g0e2 h7f7 h0g2 h9g7 i0h0 i9h9 b0c2 g6g5'],                      // đối Sĩ giác pháo (炮8平6)
    [5, 'g0e2 g6g5 h0g2 h9g7 i0h0 i9h9 c3c4 b9c7'],                      // đối Tiến tốt 7
    [4, 'g0e2 h9g7 h0g2 i9h9 i0h0 g6g5 c3c4 b9c7'],                      // đối Khởi mã
    // ── Khởi mã cục (起马局: 马二进三) ──────────────────────────────────────────
    [4, 'h0g2 g6g5 g3g4 h9g7 i0h0 i9h9'],                                 // đối Tiến tốt 7
    [3, 'h0g2 h9g7 c3c4 g6g5 b0c2 b9c7'],                                 // đối Khởi mã
    // ── Quá cung pháo (过宫炮: 炮二平六) & Sĩ giác pháo (士角炮: 炮二平四) ─────────
    [3, 'h2d2 h9g7 h0g2 i9h9 i0h0 b9c7'],                                 // Quá cung pháo
    [2, 'h2f2 h9g7 h0g2 i9h9 i0h0 b9c7'],                                 // Sĩ giác pháo
];

let BOOK = null;
const key = (b, red) => toFen(b) + (red ? ' r' : ' b');

function build() {
    BOOK = new Map();
    for (const [w, line] of LINES) {
        const b = loadFen(START_FEN);
        let red = true;
        for (const mv of line.split(' ')) {
            const k = key(b, red);
            const list = BOOK.get(k) || [];
            const hit = list.find((x) => x.move === mv);
            if (hit) hit.w += w; else list.push({ move: mv, w });
            BOOK.set(k, list);
            const [f, t] = fromIccs(mv);
            b[t] = b[f]; b[f] = null;
            red = !red;
        }
    }
    return BOOK;
}

/** Các nước sách tại thế cờ (bàn mảng 90 ô hoặc FEN) — [] nếu ngoài book. */
export function bookMoves(board, red) {
    const b = typeof board === 'string' ? loadFen(board) : board;
    return (BOOK || build()).get(key(b, red)) || [];
}

/** Chọn 1 nước sách ngẫu nhiên theo trọng số (bỏ qua nước trong `avoid`); null nếu ngoài book. */
export function pickBook(board, red, avoid = null, rnd = Math.random) {
    const list = bookMoves(board, red).filter((x) => !avoid || !avoid.has(x.move));
    if (!list.length) return null;
    let r = rnd() * list.reduce((a, x) => a + x.w, 0);
    for (const x of list) { r -= x.w; if (r <= 0) return x.move; }
    return list[list.length - 1].move;
}
