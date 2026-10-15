// Xe Mã Thực Chiến — Chương 2 · Bài 7: Một số cuộc Xe Mã thực chiến hay. Thế cờ + nước đi theo sách; lời giảng viết lại.
// Cuộc 1 nhánh "Xe 3 thoái 4" bỏ qua: sách in "Xe 8 bình 6" mà ô đích đang có Tướng Đen.
// Cuộc 3 (p152): sơ đồ vẽ Tốt Đỏ ở lộ 3, nước đi in kèm là "Tốt 4 tiến 1" rồi "Tốt 4 bình 5" → FEN đặt Tốt ở lộ 4.
// Cuộc 7: sách dừng ở "Đen nhận thua" sau nước 10 của Đỏ; đoạn minh họa tiếp theo in "Mã 5 thoái 2" không khớp vị trí Mã.
module.exports = {
  bai: 15, ch: 2, ten: 'Xe Mã Thực Chiến Hay', level: 'nang-cao',
  y: 'Bài cuối gom các thế lấy từ ván đấu thật: quân hai bên còn nhiều, Tốt đã qua sông, có cả Pháo. Xe Mã ở đây không chỉ chiếu bí mà còn phối hợp với Tốt, Tượng, Sĩ — và thế nào cũng có lúc phải chọn giữa tấn công tiếp hay chấp nhận thế cân bằng.',
  cuoc: [
    {
      n: 1, h: '!p150_0', fen: '2n3b2/4ak3/2N4r1/6R2/9/9/9/9/9/4KA3',
      s: 'Xe tiến chiếu hai lần, Đen nhảy Mã chặn. Đỏ có ba cách đánh tiếp: Mã tiến 6 ép Sĩ thì thắng; lui Mã về 8 thì chỉ cân bằng.',
      c: '<p>Đỏ <strong>Xe tiến 2 chiếu</strong>, Tướng Đen lên; Xe tiến 1 chiếu, Đen nhảy Mã chặn. Tới đây Đỏ có nhiều cách:</p><ul><li><strong>Mã tiến 6</strong> (mạch chính): Đen lui Sĩ; Xe bình 4 đuổi Mã, Mã Đen lui 6; Xe bình trung, Đen nâng Sĩ; Xe lui 1 — Mã Đen chạy ra biên, Xe lui tiếp, <strong>Đỏ thắng</strong>.</li><li><strong>Mã lui 8</strong>: Đen tiến Xe; Xe lui – tiến chiếu, bình trung; Đen tiến Xe xuống, Xe Đỏ lui về; Tướng Đen lên, Mã Đen tiến 3 — thế trận <strong>cân bằng</strong>.</li></ul>',
      m: 'X3.2 Tg6.1 X3.1 M3.4 M7.6 S5/4 X3-4 M4/6 X4-5 S4.5 X5/1 M6/8 X5/1',
      k: { 4: 'Mã chặn — Đỏ chọn cách đánh.', 5: 'Mã tiến 6.', 13: 'Đỏ thắng.' },
      v: [
        { from: 'main', after: 4, m: 'M7/8 X8.1 X3/2 Tg6/1 X3.1 Tg6/1 X3-5 X8.6 X5/4 X8-6 Tg5.1 M4.3', k: { 1: 'Nếu lui Mã về 8…', 12: '…thế trận cân bằng.' }, kq: 'hoa' },
      ],
      kq: 'do',
    },
    {
      n: 2, h: '!p151_0', fen: '3a5/4a4/2N1nk3/2r4R1/2p6/9/9/9/9/4K1B2',
      s: 'Mã lui trung, Xe tiến chiếu, Mã tiến 3 đuổi Mã Đen; Xe bình 3 — Đen phải thí Tốt; Tượng Đỏ lên ăn Tốt rồi đi qua đi lại làm nước chờ, Xe Đen hết đường — Đỏ thắng.',
      c: '<p>Đỏ <strong>Mã lui về trung</strong>, Tướng lui; Xe tiến 2 chiếu, Tướng lui; Mã tiến 3, Mã Đen lui về góc; Xe bình 3, Xe Đen bình 7 che. Đỏ <strong>Tượng tiến 5</strong> chờ — Đen buộc phải thí Tốt (nếu chống Sĩ thì Xe tiến chiếu, bình 4, lui 2 thắng). <strong>Tượng tiến 7 ăn Tốt</strong>; Xe Đen tiến – lui chiếu quấy, Tướng Đỏ lên xuống, Tượng lui – tiến làm nước chờ — Đen hết nước tốt, Đỏ thắng.</p>',
      m: 'M7/5 Tg6/1 X2.2 Tg6/1 M5.3 M5/7 X2-3 X3-7 T3.5 B3.1 T5.7 X7.6 Tg5.1 X7/6 T7/5 X7.5 Tg5/1 X7/5 T5.3',
      k: { 9: 'Tượng tiến — nước chờ.', 11: 'Tượng ăn Tốt.', 19: 'Tượng tiến — Đỏ thắng.' },
      v: [
        { from: 'main', after: 9, m: 'S5.6 X3.1 Tg6.1 X3-4 Tg6-5 X4/2', k: { 1: 'Nếu chống Sĩ…', 6: '…Xe lui 2 — Đỏ thắng.' }, kq: 'do' },
      ],
      kq: 'do',
    },
    {
      n: 3, h: '!p152_0', fen: '5a3/5k3/5a2N/9/5P3/2R6/6r2/3A2n2/1p1pA4/4K4',
      s: 'Tốt tiến dồn Tướng về giữa, Mã nhảy 3 chiếu, Tốt bình trung; Xe tiến xuống, Mã quấn quanh cung chiếu liên tục, Tốt tiến từng bước — Xe lui chiếu bí.',
      c: '<p>Đỏ <strong>Tốt tiến 1</strong>, Tướng Đen về giữa; Mã tiến 3, Tướng sang lộ 4; <strong>Tốt bình trung</strong>, Đen bình Xe về lộ 4 che. Xe tiến 4 chiếu, Mã lui – lui – lui – tiến liên tục, Xe tiến 1 ép; Đen lui Xe về chặn, Tốt tiến dần vào cung. Đen chống Sĩ, lui Sĩ; Xe tiến chiếu, Mã lui chiếu — <strong>Xe lui 2 chiếu bí</strong>.</p>',
      m: 'B4.1 Tg6-5 M1.3 Tg5-4 B4-5 X7-4 X7.4 Tg4/1 M3/5 Tg4-5 X7.1 Tg5.1 M5/7 Tg5-6 M7/5 X4/2 M5.3 Tg6-5 B5.1 Tg5-4 X7/1 Tg4/1 M3.4 S6.5 B5.1 S6/5 X7.1 Tg4.1 M4/5 Tg4.1 X7/2',
      k: { 5: 'Tốt bình trung.', 31: 'Xe lui chiếu bí.' },
      kq: 'do',
    },
    {
      n: 4, h: 'p154_0', fen: '5a3/4k4/3a1N3/2p5p/p8/2P2R3/P3P4/9/2r3n2/5K3',
      s: 'Hai bên còn Xe Mã và nhiều Tốt. Mã tiến 2, Xe bình trung chiếu; Đen dùng Xe Mã chiếu quấy Tướng Đỏ. Đỏ đổi được Xe nhưng Mã Đen chạy kịp — hai bên Mã Tốt — hòa.',
      c: '<p>Đỏ <strong>Mã tiến 2</strong>, Mã Đen lui về trung; Tướng Đỏ về giữa, Xe Đen bình 7; Xe bình trung chiếu, Tướng Đen sang lộ 6; Xe tiến 2, Mã Đen tiến 3. Tướng Đỏ bình 6, Xe Đen tiến chiếu; Tướng Đỏ lên, Xe Đen lui; Xe Đỏ bình 3 đổi Xe — Đen tiến Xe. Mã Đỏ lui về, Mã Đen chạy góc; hai bên Mã đuổi nhau, Tốt tiến — <strong>hòa</strong>.</p>',
      m: 'M4.2 M7/5 Tg4-5 X3-7 X4-5 Tg5-6 X5.2 M5.3 Tg5-6 X7.1 Tg6.1 X7/7 X5-3 X7.1 M2/3 Tg6-5 M3/5 M3/1 M5.7 M1.2 Tg6.1 M2/3 M7/9 M3/1 B7.1 B9.1',
      kq: 'hoa',
    },
    {
      n: 5, h: '!p155_0', fen: '4k4/4a4/9/1R1N5/9/2B6/4p4/9/3r5/4K4',
      s: 'Mã lui về giữ, Xe bình trung, tiến chiếu; Đen dùng Tốt Xe quấy — Xe Đỏ chạy ra biên. Đen lui Xe 4 hay lui Xe 2 — Xe Mã đổi vị chiếu dồn — Đỏ đều thắng.',
      c: '<p>Đỏ <strong>Mã lui 4</strong>, Đen lui Xe; Xe bình trung, Tốt Đen bình 6; Xe tiến 2 chiếu, Tướng sang lộ 4; Xe lui 6 giữ, Tướng lên; Xe bình ra biên. Đen có hai cách:</p><ul><li><strong>Xe lui 4</strong> (mạch chính): Xe tiến 6 chiếu, lui 3, bình trung; Mã tiến trung, tiến 4 — Xe tiến 4, bình 7 thắng.</li><li><strong>Xe lui 2</strong>: Mã tiến 3, Xe Đen bình trung, Tướng Đỏ bình 4; Xe tiến chiếu hai lần, bình trung — Tướng Đỏ về giữa thắng. (Đen lui Tướng thay vì bình Xe: Xe tiến 7 chiếu, lui 3, bình 6, bình 4 — Xe lui 3 thắng.)</li></ul>',
      m: 'M6/4 X4/2 X8-5 B5-6 X5.2 Tg5-4 X5/6 Tg4.1 X5-9 X4/4 X9.6 Tg4/1 X9/3 B6.1 X9-5 Tg4.1 M4.5 B6.1 M5.4 Tg4/1 X5.4 Tg4.1 X5-7',
      k: { 9: 'Xe ra biên — Đen có hai cách.', 23: 'Xe bình 7 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 9, m: 'X4/2 M4.3 X4-5 Tg5-4 X5-4 X9.6 Tg4/1 X9.1 Tg4.1 X9-5 X4.5 Tg4.1 B6.1 Tg4-5', k: { 1: 'Xe lui 2.', 14: 'Tướng Đỏ về giữa — Đỏ thắng.' }, kq: 'do' },
        { from: 0, after: 13, m: 'Tg4/1 X9.7 Tg4.1 X9/3 Tg4/1 X9-6 Tg4-5 X6-4 Tg5-4 X4/3', k: { 1: 'Nếu lui Tướng…', 10: '…Xe lui 3 — Đỏ thắng.' }, kq: 'do' },
      ],
      kq: 'do',
    },
    {
      n: 6, h: 'p157_0', fen: '4ka3/4a4/9/2p1P4/7R1/3r4p/p3P4/4B1N2/4A4/2BAK3c',
      s: 'Tốt Đỏ tiến vào sát cung, Xe tiến khóa Sĩ; Tốt bình – tiến ép Tướng Đen lên. Mã tiến 4, tiến trung — Xe ra biên chiếu, Tốt trung tiến, Tốt bình 4 chiếu thắng.',
      c: '<p>Đỏ <strong>Tốt trước tiến 1</strong>, Đen lui Pháo; Xe tiến 4, Đen lui Sĩ; Tốt bình 4, Sĩ lên lại; Tốt tiến, Pháo bình 6; Tốt bình trung, Tướng Đen phải lên. Xe bình 4, bình 2, lui 3, bình trung — Đen dùng Tốt Pháo xuống quấy. Mã tiến 4, Pháo về trung; Xe bình 8, Mã tiến trung; Tốt trung tiến, Xe tiến 2 – tiến 1 chiếu, bình trung — <strong>Tốt bình 4</strong>, Đỏ thắng.</p>',
      m: 'Bt.1 P9/3 X2.4 S5/4 B5-4 S4.5 B4.1 P9-6 B4-5 Tg5.1 X2-4 P6/5 X4-2 B1-2 X2/3 B3.1 X2-5 Tg5-4 B5.1 B2-3 M3.4 P6-5 X5-8 P5.1 M4.5 X4/3 B5.1 Bs.1 X8.2 Tg4/1 X8.1 Tg4.1 X8-5 Bt-4 B5-4',
      k: { 35: 'Tốt bình 4 — Đỏ thắng.' },
      kq: 'do',
    },
    {
      n: 7, h: '!p158_0', fen: '2bR1ab2/2N1k4/9/4p3p/p4Cp2/9/P5P1P/4B4/1r2n4/4KABc1',
      s: 'Pháo bình trung chiếu, Đen dùng Tốt ăn Pháo; Mã lui 6 — Đen bình Tướng hay lên Tướng. Xe lui chiếu, Mã tiến 4, Xe chặn đường — Đen nhận thua; nếu lên Tướng thì Xe đuổi qua lại, Mã đi vòng 8 – 7 – 5 — Xe lui chiếu thắng.',
      c: '<p>Đỏ <strong>Pháo bình trung chiếu</strong> — Đen dùng Tốt trung tiến lên ăn Pháo. Đỏ <strong>Mã lui 6</strong>, đe dọa chiếu. Đen có hai cách:</p><ul><li><strong>Tướng bình 6</strong> (mạch chính): Xe lui 1, Đen chống Sĩ; Xe bình trung, Tướng lui; Mã tiến 4, Xe Đen tiến chiếu, Tướng Đỏ lên xuống; Xe Đen bình 8, Xe Đỏ tiến 1 chiếu, Tướng lên; Mã lui trung, Xe Đen lui; Mã tiến 6 — Đen <strong>nhận thua</strong>.</li><li><strong>Tướng tiến 1</strong>: Xe bình 4 – 6 – 3 – 6 – 7 – 6 – 2 đuổi Tướng Đen chạy qua lại; Xe lui 2, Tướng lui; Mã tiến 8, tiến 7, Xe lui 1 chiếu; Mã lui trung, Xe tiến 2, Mã lui 6 — <strong>Xe lui 1</strong>, Đỏ thắng.</li></ul>',
      m: 'P4-5 B5.1 M7/6 Tg5-6 X6/1 S6.5 X6-5 Tg6/1 M6.4 X2.1 Tg5.1 X2/1 Tg5/1 X2-8 X5.1 Tg6.1 M4/5 X8/5 M5.6',
      k: { 1: 'Pháo bình trung chiếu.', 3: 'Mã lui 6 — Đen có hai cách.', 19: 'Đen nhận thua.' },
      v: [
        { from: 'main', after: 3, m: 'Tg5.1 X6-4 Tg5-4 X4-6 Tg4-5 X6-3 Tg5-4 X3-6 Tg4-5 X6-7 Tg5-4 X7-6 Tg4-5 X6-2 Tg5-4 X2/2 Tg4/1 M6.8 Tg4-5 M8.7 Tg5-6 X2/1 Tg6.1 M7/5 Tg6/1 X2.2 Tg6.1 M5/6 Tg6-5 X2/1', k: { 1: 'Tướng tiến 1.', 30: 'Xe lui 1 — Đỏ thắng.' }, kq: 'do' },
        { from: 0, after: 21, m: 'X2/6 X2-8', k: { 1: 'Nếu Xe Đen lui 6…', 2: '…Xe bình 8 — Đỏ dễ thắng.' }, kq: 'do' },
      ],
      kq: 'do', end: 'thua',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
