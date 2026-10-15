// Xe Mã Thực Chiến — Chương 2 · Bài 5: Xe Mã đấu hai quân mạnh. Thế cờ + nước đi theo sách; lời giảng viết lại.
// Sửa lỗi in: cuộc 2 nhánh "Pháo bình 6" — sách in "Pháo 5 bình 7" (không có Pháo lộ 5) → Pháo 7 bình 5;
// cuộc 6 mạch chính — sách in "Mã 2 thoái 3" (không có Mã lộ 2) → Mã 3 thoái 2.
module.exports = {
  bai: 13, ch: 2, ten: 'Xe Mã Đấu Hai Quân Mạnh', level: 'nang-cao',
  y: 'Bên Đen có hai quân mạnh (đôi Pháo, đôi Mã hoặc Mã Pháo) cùng Sĩ Tượng — về quân số không kém Xe Mã. Nhưng hai quân này phải lo phòng thủ, nên Đỏ thắng được nếu tấn công đúng điểm: Xe chiếu ép Tướng Đen lên cao, Mã chen vào cung, Tượng Đỏ chặn đường Pháo, và Tướng Đỏ chọn cột để tránh Pháo chiếu.',
  cuoc: [
    {
      n: 1, h: 'p130_0', fen: '3ak4/4a4/3cbc3/9/8N/2R6/9/4B4/9/2B1K4',
      s: 'Đôi Pháo phòng thủ. Mã tiến 3, Xe bình 2, Tượng lên chặn; Xe tiến chiếu ép Sĩ, Mã tiến 4 — Tướng Đỏ bình 4, Xe bình trung chiếu thắng.',
      c: '<p>Đỏ <strong>Mã tiến 3</strong>, Đen lên Tượng; Xe bình 2, Đen bình Pháo về giữa; Tượng Đỏ lên 7, Pháo tiến 1. Xe tiến 1, Pháo bình 7; Xe tiến 4 chiếu, Đen lui Sĩ; Xe lui 2, Pháo lui; <strong>Mã tiến 4</strong>, Pháo trung lui. Xe bình 3, Đen lui Tượng; <strong>Tướng Đỏ bình 4</strong>, Pháo chạy ra biên — Xe bình trung, Đỏ thắng.</p><p>Nếu ở nước 3 Đen lui Pháo 2: Xe tiến 1, Pháo bình 7; Mã lui trung, Tượng lui — Xe tiến 2, Đỏ thắng.</p>',
      m: 'M1.3 T5.7 X7-2 P4-5 T5.7 P5.1 X2.1 P6-7 X2.4 S5/6 X2/2 P7/2 M3.4 P5/2 X2-3 T7/5 Tg5-4 P7-9 X3-5',
      k: { 13: 'Mã tiến 4.', 19: 'Xe bình trung — Đỏ thắng.' },
      v: [
        { from: 'main', after: 5, m: 'P6/2 X2.1 P5-7 M3/5 T7/5 X2.2', k: { 1: 'Nếu lui Pháo 2…', 6: '…Xe tiến 2 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 2, h: 'p132_0', fen: '2ba1k3/4a1N2/3cbc3/9/8R/9/9/4B4/9/2B1K4',
      s: 'Xe tiến chiếu, Tướng Đỏ bình 4; Mã lui – nhảy biên – lui 3 đổi hướng. Đen lui Tượng hay bình Pháo — Đỏ dùng Tướng chọn cột, Tượng chặn Pháo, Xe lui về chiếu thắng.',
      c: '<p>Đỏ <strong>Xe tiến 4 chiếu</strong>, Tướng Đen lên; <strong>Tướng Đỏ bình 4</strong>, Đen lên Tượng. Mã lui 2, Pháo tiến 2; Mã nhảy biên. Đen có hai cách:</p><ul><li><strong>Tượng lui</strong> (mạch chính): Mã lui 3, Đen đổi Pháo sang lộ 6; Tướng Đỏ về giữa, Pháo bình biên; Xe bình 2, Pháo về trung; Tượng Đỏ lên, Pháo cũng về trung; Tướng Đỏ bình 6, Pháo sau bình 4; Xe lui 1, Mã tiến 2, Tướng Đỏ về giữa — Xe lui 2, Đỏ thắng.</li><li><strong>Pháo bình 6</strong>: Tướng Đỏ về giữa, Pháo sau ra biên; Mã lui 3, Pháo tiến 2; Mã tiến 2, Xe lui 1; Đen bình Pháo, Tượng Đỏ lên; Xe bình 4 chiếu — Xe lui 5, Đỏ thắng.</li></ul><p>Nếu ở nước 3 Đen nâng Tượng giữa: Mã lui 3, Pháo tiến 2, Mã tiến trung; Xe lui 3, chống Sĩ — Xe bình 4, Mã lui 6, Đỏ thắng.</p>',
      m: 'X1.4 Tg6.1 Tg5-4 T5.7 M3/2 P4.2 M2.1 T7/9 M1/3 P4-6 Tg4-5 Pt-9 X1-2 P6-5 T5.7 P9-5 Tg5-6 Ps-4 X2/1 Tg6.1 M3.2 Tg6-5 Tg6-5 T9.7 X2/2',
      k: { 7: 'Mã nhảy biên — Đen có hai cách.', 25: 'Xe lui 2 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 7, m: 'P4-6 Tg4-5 Ps-9 M1/3 P6.2 M3.2 Tg6.1 X1/1 P6-7 T5.3 P7-5 X1-4 Tg6-5 X4/5', k: { 1: 'Pháo bình 6.', 14: 'Xe lui 5 — Đỏ thắng.' } },
        { from: 'main', after: 5, m: 'T3.5 M2/3 P4.2 M3.5 P6.2 X1/3 S5.6 X1-4 S4.5 M5/6', k: { 1: 'Nếu nâng Tượng giữa…', 10: '…Mã lui 6 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 3, h: 'p133_0', fen: '5kb1R/4a4/3a1n3/9/3N5/9/5n3/4B4/9/2B1K4',
      s: 'Đôi Mã phòng thủ. Tướng Đỏ bình 4, Mã tiến 8 — Đen lui Mã hay bình Tướng; Xe lui – bình ra biên, Mã đi vòng 7 – 9 – 8, Xe tiến chiếu thắng.',
      c: '<p>Đỏ <strong>Tướng bình 4</strong>, Tướng Đen về giữa; <strong>Mã tiến 8</strong>. Đen có hai cách:</p><ul><li><strong>Mã trước lui</strong> (mạch chính): Mã tiến 7, Tướng sang lộ 4; Xe lui 6, Đen lui Sĩ; Xe bình 8, tiến 6 chiếu, Tướng lên; Xe bình 7 — Đen dồn Mã phòng thủ, Tướng Đỏ về giữa rồi sang lộ 6; Xe lui 3, Mã lui 8 — Xe tiến 3 chiếu bí. (Nếu Đen lui Mã kia: Xe bình 7, Mã lui 8, Xe tiến 6 — Mã tiến 6 thắng.)</li><li><strong>Tướng bình 6</strong>: Mã tiến 7, Đen lui Sĩ; Xe lui 4, bình 4, tiến 1; Mã lui 6, tiến 4, Xe tiến chiếu — Xe bình 1 thắng.</li></ul>',
      m: 'Tg5-4 Tg6-5 M6.8 Mt/5 M8.7 Tg5-4 X1/6 S5/6 X1-8 S4/5 X8.6 Tg4.1 X8-7 M5/4 M7.9 M6.4 Tg4-5 T7.9 Tg5-6 T9/7 X7/3 Mt.6 M9/8 Tg4/1 X7.3',
      k: { 3: 'Mã tiến 8 — Đen có hai cách.', 25: 'Xe tiến chiếu bí.' },
      v: [
        { from: 'main', after: 7, m: 'M6/4 X1-7 Tg4-5 M7/8 M5/6 X7.6 S5/4 M8.6', k: { 1: 'Nếu lui Mã kia…', 8: '…Mã tiến 6 — Đỏ thắng.' } },
        { from: 'main', after: 3, m: 'Tg5-6 M8.7 S5/4 X1/4 S4/5 X1-4 Mt/8 X4.1 T7.9 M7/6 Tg6.1 M6.4 S5.6 X4.1 Tg6-5 X4-1', k: { 1: 'Tướng bình 6.', 16: 'Xe bình 1 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 4, h: '!p135_0', fen: '5k3/4a1N2/3abn3/9/4n1b2/8R/9/4B4/9/2B2K3',
      s: 'Xe tiến chiếu, Mã lui; Xe lui bình 2, Tướng Đỏ về giữa; Mã lui 3, tiến biên, tiến 2 — đôi Mã Đen chạy quanh, Tướng Đỏ bình 6, Xe tiến 2 — Mã tiến 3 thắng.',
      c: '<p>Đỏ <strong>Xe tiến 5 chiếu</strong>, Tướng lên; Mã lui 4, Đen lui Mã; Xe lui 3, Đen lui Mã kia; Xe bình 2, Tướng Đen lui. <strong>Tướng Đỏ về giữa</strong>, Tướng Đen cũng về giữa; Mã lui 3, Tướng sang lộ 4; Mã tiến biên, Đen lui Tượng; Mã tiến 2 — đôi Mã Đen chạy về phòng thủ. Xe bình trung, bình 4; Tướng Đỏ bình 6, Xe tiến 2 — <strong>Mã tiến 3</strong>, Đỏ thắng.</p>',
      m: 'X1.5 Tg6.1 M3/4 M5/7 X1/3 M6/8 X1-2 Tg6/1 Tg4-5 Tg6-5 M4/3 Tg5-4 M3.1 T5/7 M1.2 M7.5 X2-5 M5.6 X5-4 M6.7 Tg5-6 M7/8 X4.2 Ms.6 M2.3',
      k: { 25: 'Mã tiến 3 — Đỏ thắng.' },
      kq: 'do',
    },
    {
      n: 5, h: '!p136_0', fen: '3ak1b1R/4a4/5n3/9/1N7/9/3c5/4B4/9/2B1K4',
      s: 'Mã Pháo phòng thủ. Mã tiến 7; Đen lui Pháo về trung hay bình Tướng — Đỏ dùng Tượng, Tướng làm nước chờ, Xe chiếm lộ 4, Mã lui – tiến đúng lúc — Xe chiếu thắng.',
      c: '<p>Đỏ <strong>Mã tiến 7</strong>. Đen có hai cách:</p><ul><li><strong>Pháo lui về trung</strong> (mạch chính): Tượng tiến 3, Tướng Đen sang lộ 6; Tướng Đỏ bình 4, Tướng Đen về giữa; Mã lui 6, Mã Đen tiến 4; Xe bình 3, bình 4 — Tướng Đen lên, Xe lui 3, Đỏ thắng.</li><li><strong>Tướng bình 6</strong>: cuộc dài — Tướng Đỏ bình 4, Tượng lui chờ; Xe lui 3, bình 4, Mã lui 6; Pháo Đen chạy qua lại, Xe bình 3, Tướng Đỏ về giữa, Mã lui 7; Xe ra biên tiến 3 chiếu, Tướng Đỏ lại bình 4; Xe lui 6 chặn Pháo, Mã tiến trung, tiến 4 — Xe tiến 6 thắng. (Đen lui Tượng thay vì bình Pháo: Xe tiến 2, bình 2, tiến 1 — Mã tiến trung thắng.)</li></ul>',
      m: 'M8.7 P4/5 T5.3 Tg5-6 Tg5-4 Tg6-5 M7/6 M6.4 X1-3 S5/6 X3-4 Tg5.1 X4/3',
      k: { 1: 'Mã tiến 7 — Đen có hai cách.', 13: 'Xe lui 3 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 1, m: 'Tg5-6 Tg5-4 P4-6 T5/3 P6/1 X1/3 P6.1 X1-4 P6-8 M7/6 P8/5 X4-3 P8-6 Tg4-5 T7.9 M6/7 P6-8 X3-1 T9.7 X1.3 Tg6.1 Tg5-4 P8.5 X1/6 P8/1 M7.5 P8-6 M5.4 Tg6/1 X1.6', k: { 1: 'Tướng bình 6.', 30: 'Xe tiến 6 — Đỏ thắng.' } },
        { from: 0, after: 13, m: 'T7.5 X3.2 P8.2 X3-2 P8-7 X2.1 P7/3 M6.5', k: { 1: 'Nếu lui Tượng…', 8: '…Mã tiến trung — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 6, h: '!p138_0', fen: '2ba4R/4akN2/3cbn3/9/9/9/9/4B4/9/4K1B2',
      s: 'Mã lui biên; Đen lui Mã hay tiến Mã — Đỏ dùng Mã đi vòng 2 – 3 – 4, Xe lui – bình chiếm lộ, Tượng lên chặn — Xe chiếu thắng.',
      c: '<p>Đỏ <strong>Mã lui ra biên</strong>. Đen có hai cách:</p><ul><li><strong>Mã lui 8</strong> (mạch chính): Mã lui 2, Mã Đen tiến 7; Xe lui 3, Mã tiến trung; Xe bình trung, Mã tiến 4; Xe bình 4, Đen nâng Sĩ; Mã tiến 3, Tướng về giữa; Xe bình 6, Mã lui 3; Tượng lên, Tướng sang lộ 4; Xe bình 7, Pháo ra biên; Xe tiến 2, Tướng lên; Mã tiến 4, Mã Đen lui — Xe bình 8, Đỏ thắng. (Đen lui Tướng thay vì bình: Xe bình 2, tiến 3, bình 4 — Xe bình 7 thắng.)</li><li><strong>Mã tiến trung</strong>: Mã tiến 2, lui 3, Xe lui 1 – lui 3 chiếu; Tượng lên, Mã tiến 2; Đen tiến Pháo, Xe tiến 1, bình 3 — Xe lui 1, Đỏ thắng.</li></ul>',
      m: 'M3/1 M6/8 M1/2 M8.7 X1/3 M7.5 X1-5 M5.4 X5-4 S5.6 M2.3 Tg6-5 X4-6 M4/3 T5.7 Tg5-4 X6-7 P4-1 X7.2 Tg4.1 M3.4 M3/2 X7-8',
      k: { 1: 'Mã lui biên — Đen có hai cách.', 23: 'Xe bình 8 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 15, m: 'Tg5/1 X6-2 S4.5 X2.3 S5/6 X2-4 Tg5.1 X4-7', k: { 1: 'Nếu lui Tướng…', 8: '…Xe bình 7 — Đỏ thắng.' } },
        { from: 'main', after: 1, m: 'M6.5 M1.2 Tg6/1 M2/3 Tg6.1 X1/1 Tg6.1 X1/3 T5.7 M3.2 P4.2 X1.1 M5/4 X1-3 P4-5 Tg5-6 Tg6-5 X3/1', k: { 1: 'Mã tiến trung.', 18: 'Xe lui 1 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
