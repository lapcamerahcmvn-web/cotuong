// Xe Mã Thực Chiến — Chương 2 · Bài 4: Xe Mã khéo thắng Xe Sĩ Tượng. Thế cờ + nước đi theo sách; lời giảng viết lại.
module.exports = {
  bai: 12, ch: 2, ten: 'Xe Mã Khéo Thắng Xe Sĩ Tượng', level: 'nang-cao',
  y: 'Bên Đen còn Xe cùng một vài Sĩ Tượng — phòng thủ khá dày. Đỏ thắng nhờ "khéo": đổi vị Xe Mã để buộc Tượng Đen phải đi những nước vô ích, dùng Tượng hay Sĩ của mình làm nước chờ, và chọn đúng lúc để Mã nhảy vào điểm chiếu. Nhiều thế kết thúc bằng một nước chờ yên lặng chứ không phải một nước chiếu.',
  cuoc: [
    {
      n: 1, h: 'p125_0', fen: '5k3/4a4/b2a1r3/7R1/9/3N5/9/5A3/4A4/3K5',
      s: 'Mã tiến 7, Xe lui – tiến chiếu, bình qua lại ép Tượng Đen chạy; Mã tiến 6! — Xe bình 7 tiến chiếu, Mã tiến 8 thắng.',
      c: '<p>Đỏ <strong>Mã tiến 7</strong>, Đen nâng Tượng; Xe lui 1, Tượng về; Xe tiến 4 chiếu, Tướng lên. Xe bình 3 – lui 4 – bình trung, Tượng Đen phải chạy lên chạy xuống. <strong>Mã tiến 6!</strong> Đen tiến Xe; Xe bình 7, Đen nâng Tượng; Xe tiến 2, Đen bình Xe ra biên — <strong>Mã tiến 8</strong>, Đỏ thắng.</p>',
      m: 'M6.7 T1.3 X2/1 T3/5 X2.4 Tg6.1 X2-3 T5.3 X3/4 T3/5 X3-5 T5/3 M7.6 X6.1 X5-7 T3.1 X7.2 X6-1 M6.8',
      k: { 13: 'Mã tiến 6!', 19: 'Mã tiến 8 — Đỏ thắng.' },
      kq: 'do',
    },
    {
      n: 2, h: 'p126_0', fen: '2rak1b2/3R5/4b4/9/4N4/9/9/9/4A4/3AK4',
      s: 'Mã tiến chiếu, lui 2, Xe lui 2 — Đen lên Tướng hay tiến Xe; Mã lui 4 tiến 3, Xe tiến chiếu ép Tượng — Sĩ Đỏ tiến làm nước chờ, Đỏ thắng.',
      c: '<p>Đỏ <strong>Mã tiến 4 chiếu</strong>, Tướng Đen sang lộ 6; Mã lui 2, Đen nâng Tượng; Xe lui 2. Đen có hai cách:</p><ul><li><strong>Tướng tiến 1</strong> (mạch chính): Mã lui 4, Đen tiến Xe; Xe tiến 2, Đen chống Sĩ; Mã tiến 3, Tướng lên; Xe bình trung, Mã tiến 4, Mã lui 6 — Đen hết nước tốt, <strong>Sĩ Đỏ tiến 4</strong> chờ, Đỏ thắng.</li><li><strong>Xe tiến 1</strong>: Mã lui 4, Xe tiến 3, Mã tiến 3, Xe lui 3, Xe bình 4, Xe bình trung — <strong>Sĩ tiến 6</strong> chờ, Đỏ thắng.</li></ul>',
      m: 'M5.4 Tg5-6 M4/2 T7.9 X6/2 Tg6.1 M2/4 X3.2 X6.2 S4.5 M4.3 Tg6.1 X6-5 T5/7 M3.4 X3-4 M4/6 T9.7 S5.4',
      k: { 5: 'Xe lui 2 — Đen có hai cách.', 19: 'Sĩ tiến — nước chờ, Đỏ thắng.' },
      v: [
        { from: 'main', after: 5, m: 'X3.1 M2/4 T9.7 X6.3 Tg6.1 M4.3 Tg6.1 X6/3 T5/7 X6-4 Tg6-5 X4-5 Tg5-6 S5.6', k: { 1: 'Xe tiến 1.', 14: 'Sĩ tiến — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 3, h: '!p127_0', fen: '5k3/9/3ab4/6r2/2b4N1/1R7/9/4B4/9/4K1B2',
      s: 'Mã nhảy biên, Xe tiến chiếu, bình trung ép Sĩ; Mã tiến 2, Xe lui 1 — Đen lui Tượng hay lui Xe, Đỏ đều dùng Tượng chặn, Xe Mã chiếu kết thúc.',
      c: '<p>Đỏ <strong>Mã nhảy biên</strong>, Đen tiến Xe; <strong>Xe tiến 5 chiếu</strong>, Tướng lên; Xe bình trung, Đen lui Sĩ che; Mã tiến 2, Tướng lên; Xe lui 1. Đen có hai cách:</p><ul><li><strong>Tượng lui 7</strong> (mạch chính): Xe lui 2, Đen lui Tượng; Tượng Đỏ tiến 3 chặn Xe Đen; Xe tiến 3 chiếu — Mã lui 3 thắng.</li><li><strong>Xe lui 4</strong>: Mã lui biên, tiến 3, tiến trung đuổi Xe Đen; Tượng Đỏ tiến 3 — Xe lui 1, bình 4 chiếu bí.</li></ul>',
      m: 'M2.1 X7.1 X8.5 Tg6.1 X8-5 S4/5 M1.2 Tg6.1 X5/1 T5/7 X5/2 T3/1 T5.3 X7-6 X5.3 Tg6/1 M2/3',
      k: { 9: 'Xe lui 1 — Đen có hai cách.', 17: 'Mã lui 3 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 9, m: 'X7/4 M2/1 X7.2 M1.3 X7.1 M3.5 X7/3 T5.3 X7-8 X5/1 Tg6/1 X5-4', k: { 1: 'Xe lui 4.', 12: 'Xe bình 4 chiếu bí.' } },
      ],
      kq: 'do',
    },
    {
      n: 4, h: '!p129_0', fen: '2ba5/4ak3/4b4/1r7/5N1R1/9/9/4B4/9/4K1B2',
      s: 'Xe tiến chiếu, bình 3; Đen bình Xe hay tiến Tượng — Mã lui 2 rồi tiến 3, tiến 2 đánh vào cung, Xe lui – bình trung chiếu — Đỏ thắng.',
      c: '<p>Đỏ <strong>Xe tiến 3 chiếu</strong>, Tướng lên; Xe bình 3. Đen có hai cách:</p><ul><li><strong>Xe bình 6</strong> (mạch chính): Mã lui 2, Đen tiến Tượng; Xe lui 3, Đen nâng Tượng; Mã tiến 3, Đen lui Sĩ; Mã tiến 2, Tướng về giữa; Xe bình trung chiếu, Tướng sang lộ 4; Mã tiến 4 — Đen lui Xe, <strong>Tượng Đỏ tiến 3</strong> chờ, Đỏ thắng.</li><li><strong>Tượng tiến 3</strong>: Mã lui 2, Tướng về giữa; Xe lui 3, Mã tiến 3, Mã tiến 2, Xe bình trung, Xe bình 3 tiến chiếu — Xe bình 2, Đỏ thắng.</li></ul>',
      m: 'X2.3 Tg6.1 X2-3 X2-6 M4/2 T5.3 X3/3 T3.1 M2.3 S5/6 M3.2 Tg6-5 X3-5 Tg5-4 M2.4 X6/3 T5.3',
      k: { 3: 'Xe bình 3 — Đen có hai cách.', 17: 'Tượng tiến — nước chờ, Đỏ thắng.' },
      v: [
        { from: 'main', after: 3, m: 'T5.3 M4/2 Tg6-5 X3/3 T3.1 M2.3 X2-6 X3-5 Tg5-6 M3.2 Tg6/1 X5-3 X6-8 X3.3 Tg6/1 X3-5 X8/2 X5-2', k: { 1: 'Tượng tiến 3.', 18: 'Xe bình 2 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
