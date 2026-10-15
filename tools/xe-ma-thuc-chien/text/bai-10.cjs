// Xe Mã Thực Chiến — Chương 2 · Bài 2: Xe Mã đôi Tượng đấu Xe đôi Sĩ. Thế cờ + nước đi theo sách; lời giảng viết lại.
// Hai sơ đồ trong sách vẽ lệch so với nước đi in kèm, FEN ở đây theo nước đi (đi thử toàn bộ các nhánh đều hợp lệ):
//   - Cuộc 2 (p106): sơ đồ vẽ Xe Đỏ ở lộ 4, Mã ở lộ 2 — nước đi ("Mã 3 tiến 5", "Xe 5 tiến 3") cần Xe lộ 5, Mã lộ 3.
//   - Cuộc 4 (p110): sơ đồ vẽ Tướng Đỏ ở hàng đáy — ba nhánh có "Tướng 5 thoái 1" nên Tướng phải đứng trên 1 hàng.
// Cuộc 3: mạch chính dừng sau nước 13 của Đỏ — đoạn sách in tiếp ("Xe 3 tiến 2" khi Xe đã ở đáy, "Tướng 4" khi Tướng ở lộ 6)
// không khớp thế cờ; engine chấm thế dừng Đỏ hơn rõ.
module.exports = {
  bai: 10, ch: 2, ten: 'Xe Mã Đôi Tượng Đấu Xe Đôi Sĩ', level: 'nang-cao',
  y: 'Lần này Đỏ có đôi Tượng thay cho Sĩ. Tượng không che được Tướng sát như Sĩ, nhưng giữ được các điểm giữa sân và có thể chặn đường Xe Đen chiếu ngang. Kế hoạch chung: Xe chiếm lộ, Mã đi vòng ép Sĩ, Tướng Đỏ chủ động chọn cột để Xe Đen không chiếu dai được; đôi khi phải đi Tượng lên xuống như nước chờ.',
  cuoc: [
    {
      n: 1, h: 'p104_0', fen: '4ka3/4a4/1r7/1N6R/9/9/9/4B4/9/4K1B2',
      s: 'Xe bình trung ép Sĩ; Đen bình Xe hay bình Tướng — Đỏ dùng Tượng làm nước chờ, Tướng Đỏ chọn cột, Mã đi vòng quanh cung, cuối cùng Mã tiến chiếu thắng.',
      c: '<p>Đỏ <strong>Xe bình trung</strong>. Đen có hai cách:</p><ul><li><strong>Xe bình 3</strong> (mạch chính): Mã lui – tiến, Đen đuổi Mã; Đỏ lên Tượng che, Xe bình 7, Tướng Đỏ sang lộ 6, Tượng về. Đen tiến Xe chiếu, Đỏ dồn Xe lên chiếu, Mã nhảy sang lộ 2, Tướng Đỏ về giữa; Xe bình 7, bình trung — Đen dùng Xe chiếu dài, Đỏ lên xuống Tướng, Tượng tiến 7 che, Mã lui – tiến — Mã tiến 4 thắng.</li><li><strong>Tướng bình 4</strong>: Tượng lui 7 chờ, Tướng Đen lên; Xe bình 6 ép Sĩ, Tướng Đỏ sang lộ 6, Xe bình 7; Mã lui 7, tiến 6, Tướng Đỏ về giữa, Tượng lên; Mã lui 7, Xe tiến 1 — Mã tiến 8, Xe bình 9 thắng. (Đen bình Tướng về giữa thì Xe bình 7, Xe bình 4 – lui 2, Mã tiến 7 — Xe bình 9 thắng; Đen lui Xe thì Mã lui 7, tiến 5, Xe bình 2 chiếu – lui — Mã tiến 4 thắng.)</li></ul>',
      m: 'X1-5 X2-3 M8/6 X3-4 M6.4 X4-6 T5.3 X6-7 X5-7 X7-5 Tg5-6 S5.6 T3/5 X5.4 X7.3 Tg5.1 X7-4 X5/4 M4.2 X5-4 Tg6-5 Tg5-4 M2.3 S6/5 X4-7 S5.6 X7-5 X4.7 Tg5.1 X4/7 T5.7 X4.6 Tg5/1 X4/6 M3/2 X4.7 Tg5.1 X4/7 M2.4',
      k: { 1: 'Xe bình trung — Đen có hai cách.', 39: 'Mã tiến 4 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 1, m: 'Tg5-4 T5/7 Tg4.1 X5-6 S5.4 Tg5-6 S6.5 X6-7 S5.6 M8/7 X2.2 M7.6 S4/5 Tg6-5 X2-5 T7.5 X5/2 M6/7 S5.4 X7.1 Tg4-5 M7.8 Tg5-4 X7-9', k: { 1: 'Tướng bình 4.', 24: 'Xe bình 9 — Đỏ thắng.' } },
        { from: 0, after: 3, m: 'Tg4-5 X5-7 X2-5 Tg5-6 X5-4 Tg6-5 X4/2 M8.7 X4.1 X7-9', k: { 1: 'Nếu Tướng về giữa…', 10: '…Xe bình 9 — Đỏ thắng.' } },
        { from: 0, after: 9, m: 'X2/1 M8/7 X2/1 M7.5 Tg4/1 X7-2 S5/6 X2.3 Tg4.1 X2/1 Tg4/1 M5.4', k: { 1: 'Nếu Xe lui 1…', 12: '…Mã tiến 4 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 2, h: '!p106_0', fen: '3k1a3/4a4/9/4R1N2/9/3r5/9/4B4/9/4K1B2',
      s: 'Mã tiến trung, Đen tiến Xe chiếu, Tướng Đỏ lên tránh; Mã tiến 3 — Đen bình Xe, lên Tướng hay chiếu dai — Đỏ dùng Tướng chọn cột, Tượng chặn, Mã quấn cung để thắng.',
      c: '<p>Đỏ <strong>Mã tiến trung</strong>, Đen tiến Xe xuống chiếu; Tướng Đỏ lên, Đen lui Xe về; Mã tiến 3. Đen có ba cách:</p><ul><li><strong>Xe bình 7</strong> (mạch chính): Mã lui về trung, Tướng Đen về giữa; Tướng Đỏ bình 6, Đen nâng Sĩ; Mã tiến 3, Xe tiến 3 chiếu, Mã lui về trung, Mã lui 6; Đen tiến Xe chiếu, Tướng Đỏ lui; Mã tiến 4 — Xe bình 3, Đỏ thắng.</li><li><strong>Tướng tiến 1</strong>: Mã lui 4, Xe bình 6 ép, Tướng Đỏ sang lộ 6; Xe bình 7, Mã lui 6, Tướng Đỏ về giữa; Xe tiến chiếu hai lần — Mã lui 8, Đỏ thắng.</li><li><strong>Xe tiến 6 chiếu</strong>: Đen chiếu dai bằng Xe, Tướng Đỏ lên xuống, Tượng lên che; Mã lui 4, Xe bình 7, Tượng về; Xe tiến – lui chiếu, Mã lui 6, Xe tiến chiếu hai lần, Mã lui 8 – tiến 7 – tiến 8 — Tướng Đỏ bình 4, Đỏ thắng.</li></ul>',
      m: 'M3.5 X4.4 Tg5.1 X4/7 M5.3 X4-7 M3/5 Tg4-5 Tg5-6 S5.4 M5.3 Tg5-4 X5.3 Tg4.1 M3/5 S6.5 M5/6 X7.6 Tg6/1 X7-3 M6.4 S5/4 X5-3',
      k: { 5: 'Mã tiến 3 — Đen có ba cách.', 23: 'Xe bình 3 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 5, m: 'Tg4.1 M3/4 X4-6 X5-6 S5.4 Tg5-6 S6.5 X6-7 S5/6 M4/6 S4/5 Tg6-5 X6-4 X7.2 Tg4/1 X7.1 Tg4.1 M6/8', k: { 1: 'Tướng tiến 1.', 18: 'Mã lui 8 — Đỏ thắng.' } },
        { from: 'main', after: 5, m: 'X4.6 Tg5/1 X4.1 Tg5.1 X4/7 T5.3 X4.6 Tg5/1 X4.1 Tg5.1 X4/7 M3/4 X4.3 X5-7 X4.1 T3/5 X4/1 X7.3 Tg4.1 X7/4 X4/2 M4/6 S5.4 X7.3 Tg4/1 X7.1 Tg4.1 M6/8 X4-2 M8.7 Tg4-5 X7/1 Tg5/1 M7.8 X2/1 Tg5-4', k: { 1: 'Xe tiến 6 chiếu.', 36: 'Tướng Đỏ bình 4 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 3, h: 'p109_0', fen: '9/4k4/3a1a3/6R2/2r6/2N6/9/4B4/9/4K1B2',
      s: 'Xe bình 4 ép Tướng, Tướng Đỏ chọn cột, Xe Đỏ tiến – lui chiếu; Mã lui về trung rồi tiến 3, 4 — Xe Mã kẹp chặt Tướng Đen ở lộ 6, Đỏ hơn rõ.',
      c: '<p>Đỏ <strong>Xe bình 4</strong>, Tướng Đen sang lộ 6; <strong>Tướng Đỏ bình 4</strong>, Đen lui Sĩ. Xe bình 3, Đen bình Xe đối; Tướng Đỏ về giữa, Tướng Đen lui. Xe tiến 3 chiếu, lui 6; Mã lui về trung, Đen bình Xe về trung; Xe tiến 6 chiếu, Mã tiến 3, Xe lui 3 – tiến 2 – tiến 1 chiếu; <strong>Mã tiến 4</strong> — Xe Đen phải chạy, Tướng Đen bị nhốt ở lộ 6, Đỏ thắng thế.</p><p>Nếu Đen lui Xe 1 thay vì tiến Xe: Mã lui trung, Mã tiến 3, Tượng lên 7, Xe lui 1 — Mã tiến 4, Đỏ thắng.</p>',
      m: 'X3-4 Tg5-6 Tg5-4 S4/5 X4-3 X3-6 Tg4-5 Tg6/1 X3.3 Tg6.1 X3/6 Tg6/1 M7/5 X6-5 X3.6 Tg6.1 M5.3 X5-6 X3/3 X6-8 X3.2 Tg6/1 X3.1 Tg6.1 M3.4',
      k: { 25: 'Mã tiến 4 — Tướng Đen bị nhốt.' },
      v: [
        { from: 'main', after: 25, m: 'X8/1 M4/5 X8-5 M5.3 X5-8 T5.7 S5.4 X3/1 Tg6/1 M3.4', k: { 1: 'Nếu Xe lui 1…', 10: '…Mã tiến 4 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 4, h: '!p110_0', fen: '2R6/4k3N/3a1a3/6r2/9/9/9/4B3B/4K4/9',
      s: 'Xe lui 1, Tướng Đen lên; Tượng tiến 3 làm nước chờ — Đen có sáu cách, Đỏ đều thắng: Mã lui ép Sĩ, Xe lui bình chiếu, Tướng Đỏ hoặc Tượng làm nước chờ đúng lúc.',
      c: '<p>Đỏ <strong>Xe lui 1</strong>, Tướng Đen lên; <strong>Tượng tiến 3</strong> — một nước chờ, Đen phải tự đổi thế. Sáu cách của Đen:</p><ul><li><strong>Xe tiến 1</strong> (mạch chính): Mã lui 2, Đen lui Sĩ; Xe lui 2, Xe bình 6 chiếu — Tướng Đỏ bình 6, Đỏ thắng.</li><li><strong>Xe tiến 2</strong>: Mã lui 2, Đen tiến Xe chiếu, Tướng Đỏ lui; Xe lui 1 ép Sĩ, Mã lui 4, Tướng Đen lui — Xe bình 6 thắng.</li><li><strong>Xe bình 9</strong>: Mã lui 3, Đen tiến Xe chiếu, Tướng Đỏ lui; Xe lui 2, Xe bình trung, Mã tiến 2 — Tượng tiến 7 che, Đỏ thắng.</li><li><strong>Xe bình 4</strong>: Mã lui 3, Xe lui 1 ép Sĩ, Mã lui 4 — Xe lui 1, Đỏ thắng.</li><li><strong>Sĩ lui</strong>: Xe lui 3, Xe bình trung, Mã tiến 3, Xe lui 3 — Tượng tiến 7, Đỏ thắng. (Đen bình Xe về trung: Mã lui 3, Xe tiến 3, Xe lui 1, Mã tiến 4 — Xe bình 6 thắng.)</li><li><strong>Sĩ lui 5 bên kia</strong>: Xe lui 1, Tướng Đỏ lui, Xe bình 4, Mã tiến 3 rồi lui 2, lui 3, lui 5 — Mã tiến 4 thắng.</li></ul>',
      m: 'X7/1 Tg5.1 T1.3 X7.1 M1/2 S4/5 X7/2 Tg5-4 X7-6 Tg4-5 Tg5-6',
      k: { 3: 'Tượng tiến 3 — nước chờ. Đen có sáu cách.', 11: 'Tướng Đỏ bình 6 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 3, m: 'X7.2 M1/2 X7.3 Tg5/1 S4/5 X7/1 S5.4 M2/4 Tg5/1 X7-6', k: { 1: 'Xe tiến 2.', 10: 'Xe bình 6 — Đỏ thắng.' } },
        { from: 'main', after: 3, m: 'X7-9 M1/3 X9.5 Tg5/1 S6/5 X7/2 X9-6 X7-5 Tg5-6 M3.2 X6/2 T5.7', k: { 1: 'Xe bình 9.', 12: 'Tượng tiến 7 — Đỏ thắng.' } },
        { from: 'main', after: 3, m: 'X7-4 M1/3 S4/5 X7/1 S5.4 M3/4 X4-6 X7/1', k: { 1: 'Xe bình 4.', 8: 'Xe lui 1 — Đỏ thắng.' } },
        { from: 'main', after: 3, m: 'S6/5 X7/3 S5/4 X7-5 Tg5-6 M1.3 X7/3 T5.7', k: { 1: 'Sĩ lui.', 8: 'Tượng tiến 7 — Đỏ thắng.' } },
        { from: 3, after: 5, m: 'X7-5 M1/3 S5.6 X7.3 S4/5 X7/1 S5.4 M3.4 Tg5/1 X7-6', k: { 1: 'Nếu Xe bình trung…', 10: '…Xe bình 6 — Đỏ thắng.' } },
        { from: 'main', after: 3, m: 'S4/5 X7/1 S5.4 Tg5/1 X7-4 M1.3 X4.3 X7/1 S4/5 M3/2 Tg5-4 M2/3 Tg4-5 M3/5 X4/1 M5.4', k: { 1: 'Sĩ lui 5 bên kia.', 16: 'Mã tiến 4 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 5, h: 'p113_0', fen: '4k4/4a4/3a1r3/2N3R2/9/9/9/4B4/9/4K1B2',
      s: 'Tượng lên, Mã nhảy biên rồi vào lộ 7, lui 6; Xe tiến – lui chiếu, Mã lui 4, lui 2, Tượng về; Xe bình 6 ép, Mã tiến 4 lui trung — Đen lên Tướng hay bình Xe đều thua.',
      c: '<p>Đỏ <strong>Tượng tiến 7</strong>, Đen tiến Xe; Mã nhảy biên, tiến 7 rồi lui 6 — Tướng Đen sang lộ 6. Xe tiến 3 chiếu, lui 4; Mã lui 4, Đen nâng Sĩ; Xe tiến chiếu hai lần, Mã lui 2; Đen bình Xe về trung, Tượng lui về, Tướng Đen về giữa. Xe bình 6, Đen bình Xe đối; Mã tiến 4, lui về trung. Đen có hai cách:</p><ul><li><strong>Tướng tiến 1</strong> (mạch chính): Xe bình trung, Đen lui Sĩ; Xe bình 3, Tướng Đen sang 6; Mã tiến 3, Xe lui 2, Mã nhảy biên rồi tiến 2 — Xe bình 4 thắng.</li><li><strong>Xe bình 4</strong>: Mã tiến 7, Đen bình Xe 3; Tướng Đỏ bình 6, Mã tiến trung; Xe bình trung, Mã tiến 3 — Xe bình 2, Đỏ thắng.</li></ul>',
      m: 'T5.7 X6.3 M7.9 Tg5-6 M9.7 X6/3 M7/6 X6.4 X3.3 Tg6.1 X3/4 X6/3 M6/4 S5.6 X3.3 Tg6/1 X3.1 Tg6.1 M4/2 X6-5 T7/5 Tg6-5 X3-6 X5-4 M2.4 X4-6 M4/5 Tg5.1 X6-5 S6/5 X5-3 Tg5-6 M5.3 X6-5 X3/2 Tg6/1 M3.1 S5.6 M1.2 Tg6-5 X3-4',
      k: { 27: 'Mã lui trung — Đen có hai cách.', 41: 'Xe bình 4 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 27, m: 'X6-4 M5.7 X4-3 Tg5-6 X3/1 M7.5 Tg5.1 X6-5 S6/5 M5.3 Tg5-6 X5-2', k: { 1: 'Xe bình 4.', 12: 'Xe bình 2 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 6, h: '!p115_0', fen: '3k5/4a4/5a3/2R2N3/9/9/3r5/4B4/4K4/6B2',
      s: 'Xe tiến chiếu, lui 4 — Đen lui Tướng, lui Xe 1 hay lui Xe 3; Đỏ dùng Mã lui 6 khống chế, Tượng lên che, Xe chiếu dồn Tướng — Đỏ đều thắng.',
      c: '<p>Đỏ <strong>Xe tiến 3 chiếu</strong>, Tướng lên; <strong>Xe lui 4</strong>. Đen có ba cách:</p><ul><li><strong>Tướng lui 1</strong> (mạch chính): Mã lui 6, Tướng về giữa; Tượng tiến 3, Tướng sang lộ 6; Xe tiến 4 chiếu, Mã lui 4, Mã tiến 3, Mã tiến 2 đuổi Tướng; Xe lui 3, Đen bình Xe chặn; Mã lui 4, Xe tiến 2, bình trung — Xe lui 2 thắng.</li><li><strong>Xe lui 1</strong>: Mã lui 6, Xe tiến chiếu, Mã tiến 7 chiếu, Xe tiến – bình 4; Mã lui biên rồi tiến 8, Xe lui 1, bình 3, lui 3, bình trung, bình 6 — Tướng Đỏ bình 6, Đỏ thắng.</li><li><strong>Xe lui 3</strong>: Mã lui 6, Xe tiến chiếu, Mã lui 8; Tướng Đỏ lui, Mã tiến 7 – tiến 8; Đen chiếu dài, Đỏ lui Tượng che, Tượng lên lại; Xe tiến chiếu, đổi Xe về lộ 2 — Xe bình 6 thắng.</li></ul>',
      m: 'X7.3 Tg4.1 X7/4 Tg4/1 M4/6 Tg4-5 T5.3 Tg5-6 X7.4 Tg6.1 M6/4 X4/6 M4.3 Tg6/1 M3.2 Tg6.1 X7/3 X4-7 M2/4 S5.6 X7.2 S6/5 X7-5 Tg6.1 X5/2',
      k: { 3: 'Xe lui 4 — Đen có ba cách.', 25: 'Xe lui 2 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 3, m: 'X4/1 M4/6 S5.4 X7.3 Tg4/1 M6.7 Tg4-5 X7.1 Tg5.1 X7-4 X4-6 M7/9 Tg5.1 M9.8 X6/2 X4/1 S4/5 X4-3 X6-2 X3/3 X2/2 X3-5 Tg5-4 X5-6 Tg4-5 Tg5-6', k: { 1: 'Xe lui 1.', 26: 'Tướng Đỏ bình 6 — Đỏ thắng.' } },
        { from: 'main', after: 3, m: 'X4/3 M4/6 Tg4/1 X7.4 Tg4.1 M6/8 S5.4 Tg5/1 X4-2 M8.7 Tg4-5 X7/1 Tg5/1 M7.8 X2/1 Tg5-4 X2.7 T5/7 X2/3 T3.5 X2/4 X7.1 Tg5.1 X7-3 X2-3 X3-2 X3-2 X2/1 Tg5/1 X2-7 Tg5-6 X7-6', k: { 1: 'Xe lui 3.', 32: 'Xe bình 6 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
