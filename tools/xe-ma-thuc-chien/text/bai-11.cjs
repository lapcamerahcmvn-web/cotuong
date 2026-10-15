// Xe Mã Thực Chiến — Chương 2 · Bài 3: Xe Mã đấu Xe đôi Tượng. Thế cờ + nước đi theo sách; lời giảng viết lại.
// Cuộc 5 (p123): sơ đồ vẽ Tướng Đỏ ở lộ 5, nhưng nước đi in kèm bắt đầu bằng "Tướng 6 bình 5" rồi "Tướng 5 bình 4"
// → FEN đặt Tướng Đỏ ở lộ 6 (đi thử cả hai nhánh đều hợp lệ).
module.exports = {
  bai: 11, ch: 2, ten: 'Xe Mã Đấu Xe Đôi Tượng', level: 'nang-cao',
  y: 'Bên Đen giữ Xe và đôi Tượng (không còn Sĩ). Không có Sĩ, Tướng Đen dễ bị Xe chiếu dọc ngang, nhưng đôi Tượng có thể chặn đường Xe và che chiếu. Đỏ thường dùng Mã chiếm điểm chiếu, Xe ép Tướng lên cao, và chú ý chặn Xe Đen chiếu ngược.',
  cuoc: [
    {
      n: 1, h: 'p118_0', fen: '2b2k1r1/9/4b4/6N2/9/8R/9/4B4/9/4K1B2',
      s: 'Mã lui về trung — nước then chốt; Đen lên Tướng hay bình Tướng, Mã tiến 6, Xe chuyển sang lộ 4 chiếu — Mã tiến 8 thắng.',
      c: '<p>Đỏ <strong>Mã lui về trung!</strong> Tướng Đen lên; Mã tiến 6, Đen tiến Xe; Tượng lên 7 chặn đường Xe, Đen nâng Tượng. Xe bình 4, Tướng về giữa; Xe tiến 3, Đen bình Xe; Xe bình trung chiếu, Tướng sang lộ 4 — <strong>Mã tiến 8</strong>, Đỏ thắng.</p><p>Nếu Đen bình Tướng về giữa ngay: Mã tiến 6, Tướng sang lộ 4; Xe tiến 4, Đen tiến Xe — Xe bình trung chiếu, Đỏ thắng.</p>',
      m: 'M3/5 Tg6.1 M5.6 X8.1 T5.7 T3.1 X1-4 Tg6-5 X4.3 X8-7 X4-5 Tg5-4 M6.8',
      k: { 1: 'Mã lui về trung!', 13: 'Mã tiến 8 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 1, m: 'Tg6-5 M5.6 Tg5-4 X1.4 X8.3 X1-5', k: { 1: 'Nếu bình Tướng về giữa…', 6: '…Xe bình trung — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 2, h: 'p119_0', fen: '2b2k3/2r6/2NRb4/9/9/9/9/9/9/2B1K1B2',
      s: 'Xe tiến chiếu, Mã lui; Đen tiến Xe ăn hai Tượng — Đỏ ăn lại Tượng, Xe ra biên chiếu, Mã tiến 7 – 6, Tướng Đỏ né Xe chiếu, Xe Mã kẹp Tướng — Mã lui chiếu thắng.',
      c: '<p>Đỏ <strong>Xe tiến 2 chiếu</strong>, Tướng lên; Mã lui về trung. Đen tiến Xe xuống ăn Tượng chiếu, Tướng Đỏ lên; Xe Đen bình ăn nốt Tượng thứ hai. Đỏ <strong>Xe bình ăn Tượng</strong>, Đen lui Xe; Xe lui 3, bình 8, tiến 3 chiếu — Mã tiến 7, tiến 6, Xe lui 2. Đen dùng Xe chiếu quấy, Tướng Đỏ bình 4 rồi về giữa; Xe bình trung, Đen đổi Xe — <strong>Mã lui chiếu</strong>, Đỏ thắng.</p>',
      m: 'X6.2 Tg6.1 M7/5 X3.8 Tg5.1 X3-7 X6-7 X7/6 X7/3 Tg6/1 X7-8 X7-6 X8.3 Tg6.1 M5.7 X6-3 M7.6 Tg6-5 X8/2 X3-5 Tg5-4 X5-6 Tg4-5 X6/1 X8-5 X6-5 M6/5',
      k: { 7: 'Xe ăn Tượng.', 27: 'Mã lui chiếu — Đỏ thắng.' },
      kq: 'do',
    },
    {
      n: 3, h: '!p120_0', fen: '2b2k3/9/4b4/3R5/2rN5/9/9/4B4/9/2B1K4',
      s: 'Xe tiến chiếu, lui chiếu đẩy Tướng lên cao; Mã tiến 4, tiến 2, tiến 1 đuổi Xe Đen, Mã lui về chặn — Xe lui, bình 4, bình 7 — Xe tiến 4 chiếu thắng.',
      c: '<p>Đỏ <strong>Xe tiến 3 chiếu</strong>, Tướng lên; Xe lui 1 chiếu, Tướng lên tầng 3. Mã tiến 4, Đen bình Xe sang lộ 7; Mã tiến 2, Đen lui Xe; Mã tiến biên, Đen tiến Xe; Mã lui 3 — Đen phải nâng Tượng che. Xe lui 3 chiếu, Tướng lui; Xe bình 4, Tướng về giữa; Xe bình 7, Tướng sang lộ 6 — <strong>Xe tiến 4</strong>, Đỏ thắng.</p>',
      m: 'X6.3 Tg6.1 X6/1 Tg6.1 M6.4 X3-7 M4.2 X7/2 M2.1 X7.1 M1/3 T5.7 X6/3 Tg6/1 X6-4 Tg6-5 X4-7 Tg5-6 X7.4',
      k: { 19: 'Xe tiến chiếu — Đỏ thắng.' },
      kq: 'do',
    },
    {
      n: 4, h: '!p121_0', fen: '4k1b2/9/4b4/2NR5/9/9/2r6/4B4/9/2B1K4',
      s: 'Tướng Đỏ bình 6 chiếm cột — Đen tiến Tượng, lui Xe hay bình Xe; Đỏ dùng Xe tiến – lui chiếu, Mã đi vòng đến điểm chiếu — Xe hoặc Mã chiếu thắng.',
      c: '<p>Đỏ <strong>Tướng bình 6</strong> — chiếm cột 6 để Tướng Đen không bình sang được. Đen có ba cách:</p><ul><li><strong>Tượng tiến 7</strong> (mạch chính): Xe tiến chiếu, lui chiếu; Mã lui về trung, Đen lên Tượng; Mã tiến 4, Tướng sang lộ 6 — Xe bình trung, Đỏ thắng.</li><li><strong>Xe lui 2</strong>: Xe tiến – lui chiếu, Mã nhảy biên rồi vào lộ 7; Tướng Đỏ về giữa, Đen bình Xe; Xe lui 3, Mã lui 6, Xe bình 4 — Mã tiến 4 thắng.</li><li><strong>Xe bình 2</strong>: Xe tiến – lui chiếu, Mã lui trung, lui 3, tiến 2, tiến 3; Xe Đen chạy theo — Xe tiến 1, bình 3, Xe bình 6 thắng.</li></ul>',
      m: 'Tg5-6 T5.7 X6.3 Tg5.1 X6/1 Tg5/1 M7/5 T7.5 M5.4 Tg5-6 X6-5',
      k: { 1: 'Tướng bình 6 — Đen có ba cách.', 11: 'Xe bình trung — Đỏ thắng.' },
      v: [
        { from: 'main', after: 1, m: 'X3/2 X6.3 Tg5.1 X6/1 Tg5/1 M7.9 X3/4 M9.7 Tg5-6 Tg6-5 X3-2 X6/3 Tg6.1 M7/6 Tg6/1 X6-4 Tg6-5 M6.4', k: { 1: 'Xe lui 2.', 18: 'Mã tiến 4 — Đỏ thắng.' } },
        { from: 'main', after: 1, m: 'X3-2 X6.3 Tg5.1 X6/1 Tg5/1 M7/5 X2-7 M5/3 X7-6 M3.2 X6-7 M2.3 Tg5-6 X6.1 Tg6.1 X6-3 X7/4 X3-6', k: { 1: 'Xe bình 2.', 18: 'Xe bình 6 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 5, h: '!p123_0', fen: '9/5kN2/4b4/8r/2b6/R8/9/4B4/9/3K2B2',
      s: 'Xe bình 4 chiếu, Mã lui; Tướng Đỏ về giữa, Xe bình 6 – bình 9, Mã tiến 6 — Đen bình Tướng sang trái hay phải, Mã đi vòng 8 – 6 – 5, Xe tiến chiếu — Mã tiến chiếu thắng.',
      c: '<p>Đỏ <strong>Xe bình 4 chiếu</strong>, Tướng về giữa; Mã lui 4, Tướng lui; <strong>Tướng Đỏ bình về giữa</strong>, Tướng Đen sang lộ 4. Xe bình 6 chiếu, Tướng về giữa; Mã tiến 6, Tướng lên; Xe bình 9 đuổi Xe Đen. Đen có hai cách:</p><ul><li><strong>Tướng bình 4</strong> (mạch chính): Mã tiến 8, Xe tiến 4 chiếu, Mã tiến 6, Xe tiến 1 — Đen lên Tượng che; Mã lui về trung, Xe lui 1 — Mã tiến 6 thắng.</li><li><strong>Tướng bình 6</strong>: Xe bình 4, Tướng Đỏ bình 4; Mã tiến 8, lui biên, tiến 7 đuổi Xe Đen — Xe tiến 5, lui 1, bình 7 thắng.</li></ul>',
      m: 'X9-4 Tg6-5 M3/4 Tg5/1 Tg6-5 Tg5-4 X4-6 Tg4-5 M4.6 Tg5.1 X6-9 Tg5-4 M6.8 Tg4-5 X9.4 Tg5-6 M8.6 Tg6/1 X9.1 T5.7 M6/5 Tg6.1 X9/1 Tg6.1 M5.6',
      k: { 11: 'Xe bình 9 — Đen có hai cách.', 25: 'Mã tiến 6 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 11, m: 'Tg5-6 X9-4 Tg6-5 Tg5-4 Tg5-4 M6.8 X9/2 M8/9 Tg4/1 M9.7 X9-3 X4.5 Tg4.1 X4/1 Tg4/1 X4-7', k: { 1: 'Tướng bình 6.', 16: 'Xe bình 7 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
