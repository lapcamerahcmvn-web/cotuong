// Xe Mã Thực Chiến — Chương 1 · Bài 3: Chiếu Rút. Thế cờ + nước đi theo sách; lời giảng viết lại.
module.exports = {
  bai: 3, ch: 1, ten: 'Chiếu Rút', level: 'trung-cap',
  y: '"Chiếu rút" — một quân chiếu rồi rút ra mở đường cho quân kia chiếu (chiếu lộ), hoặc chiếu xong lui về chỗ an toàn mà vẫn giữ áp lực. Với Xe Mã, Mã thường là quân rút: mỗi lần Mã nhảy là một lần chiếu, Xe đứng sau mở đường.',
  cuoc: [
    {
      n: 1, h: 'p026_0', fen: '3k5/9/9/2R3N2/9/9/9/9/3pr4/5K3',
      s: 'Mã nhảy chiếu rồi lui về trung lộ dọa chiếu rút; Đen bình Xe sang trái hoặc sang phải — Đỏ đều dùng Xe tiến chiếu, Mã nhảy liên hoàn ép Tướng thắng.',
      c: '<p>Đỏ <strong>Mã nhảy chiếu</strong>, Tướng Đen bình về giữa, Đỏ <strong>Mã lui về trung lộ</strong> — thế chiếu rút: Mã có thể nhảy đi bất cứ lúc nào để Xe chiếu. Đen có hai cách:</p><ul><li><strong>Xe bình 7</strong> (mạch chính): Xe Đỏ tiến chiếu, Mã nhảy chiếu, Xe bình trung; khi Đen dùng Xe xuống quấy, Đỏ lên Tướng né — Đỏ thắng.</li><li><strong>Xe bình 8</strong>: Xe tiến chiếu, Mã nhảy chiếu, Xe lui chặn, Mã chuyển vị liên tục — Xe tiến chiếu bí.</li></ul>',
      m: 'M3.4 Tg4-5 M4/5 X5-7 X7.3 Tg5.1 M5.7 Tg5.1 X7-5 Tg5-4 M7/6 Tg4/1 M6.5 X7.1 Tg4.1 X7-3 M5.4 X3/1 Tg4.1',
      k: { 3: 'Mã lui về trung lộ — thế chiếu rút. Đen có hai cách.' },
      v: [
        { from: 'main', after: 3, m: 'X5-8 X7.3 Tg5.1 M5.3 Tg5-4 X7/5 Tg4/1 M3.4 Tg4-5 X7-5 Tg5-4 M4/5 Tg4.1 M5/7 Tg4/1 X5.4', k: { 1: 'Xe bình 8.', 16: 'Xe tiến chiếu bí.' } },
      ],
      kq: 'do',
    },
    {
      n: 2, h: 'p028_0', fen: '4k4/9/9/2r1N4/9/5R3/9/9/3p1K3/9',
      s: 'Xe tiến chiếu, Mã nhảy chiếu dồn Tướng; Đen dùng Xe xuống quấy, Đỏ lên xuống Tướng né rồi Mã lui chiếu rút giữ chắc thắng lợi.',
      c: '<p>Đỏ <strong>Xe tiến chiếu</strong>, <strong>Mã nhảy chiếu</strong> dồn Tướng sang lộ 4, Xe lui về giữ. Đen dùng Xe xuống đáy chiếu Tướng Đỏ — Đỏ chỉ cần lên xuống Tướng né; Mã lui về lộ 2 rồi quay lại — chiếu rút, Đen không còn cách phòng thủ.</p>',
      m: 'X4.5 Tg5.1 M5.3 Tg5-4 X4/2 Tg4/1 M3.4 X3.5 X4-6 Tg4-5 X6-5 Tg5-4 M4/2 X3/2 Tg4.1 X3.3 Tg4/1 X3/1 M2/4 Tg4.1 Tg4.1',
      kq: 'do',
    },
    {
      n: 3, h: 'p029_0', fen: '9/2N2R3/3k5/9/9/9/9/9/2rp5/5K3',
      s: 'Mã lui hai lần chiếu, Xe bình trung chiếu; Đen dùng Xe chiếu quấy, Đỏ lên Tướng né, Xe lui về chặn — Xe bình chiếu thắng.',
      c: '<p>Đỏ <strong>Mã lui chiếu</strong> hai lần (chiếu rút), Xe <strong>bình về trung lộ chiếu</strong>. Đen dùng Xe xuống chiếu Tướng Đỏ, Đỏ lên Tướng né; Xe Đỏ lui về chặn đường, Đen bình Xe che — Xe bình sang lộ 6 chiếu, Đỏ thắng.</p>',
      m: 'M7/8 Tg4-5 M8/6 Tg5-4 X4-5 X3.1 Tg4.1 X3/6 X5/4 X3-4 X5-6',
      kq: 'do',
    },
    {
      n: 4, h: 'p030_0', fen: '9/9/5kN2/9/9/3R5/9/3K5/4rp3/9',
      s: 'Xe lui một bước rồi bình về lộ 4 chiếu; Mã lui – tiến liên tục chiếu rút ép Tướng sang cánh — Xe bình chiếu thắng.',
      c: '<p>Đỏ <strong>Xe lui 1</strong> giữ phòng tuyến, Đen Xe lui về. Đỏ <strong>Xe bình 4 chiếu</strong>, Tướng Đen về giữa; <strong>Mã lui, Mã tiến</strong> — mỗi bước đều chiếu hoặc dọa chiếu rút. Tướng Đen bị dồn sang lộ 6, Xe bình về lộ 4 — Đỏ thắng.</p>',
      m: 'X6/1 X5/3 X6-4 Tg6-5 M3/4 Tg5/1 M4.6 Tg5-4 X4-6 X5/3 M6.4 Tg4-5 M4.3 Tg5-6 X6-4',
      kq: 'do',
    },
    {
      n: 5, h: 'p031_0', fen: '6N2/9/3k5/R8/9/9/4r4/5K3/3p5/9',
      s: 'Xe tiến chiếu, Mã lui hai lần chiếu rút; Xe lui về chặn, bình sang lộ 6 khóa — Đỏ dồn Tướng Đen vào thế bị Mã chiếu bí.',
      c: '<p>Đỏ <strong>Xe tiến chiếu</strong>, <strong>Mã lui chiếu</strong> hai lần đưa Tướng Đen qua lại. Xe lui về rồi <strong>bình sang lộ 6</strong> khóa đường, liên tục lui để giữ thế; khi Tướng Đen bị ép về giữa, Mã nhảy về cánh rồi <strong>Mã tiến chiếu</strong> — Đỏ thắng.</p><ul><li>Nếu Đen lên Tướng thay vì lui Xe: Xe bình 6, Mã lui – Xe bình 4 chiếu thắng.</li><li>Nếu Đen tiến Xe sâu: Xe lui, Mã tiến chiếu, Xe tiến — Mã nhảy chiếu thắng.</li></ul>',
      m: 'X9.1 Tg4/1 M3/4 Tg4-5 M4/6 Tg5-4 X9/3 X5/4 X9-6 B4-3 X6/2 B3-2 X6/2 X5-9 M6.8 Tg4-5 X6-5 X9-5 M8.7',
      v: [
        { from: 'main', after: 7, m: 'Tg4.1 X9-6 Tg4-5 M6/4 Tg5-6 X6-4', k: { 1: 'Nếu Tướng tiến 1…', 6: '…Xe bình 4 — Đỏ thắng.' } },
        { from: 'main', after: 9, m: 'X5.6 X6/1 B4-3 M6.4 Tg4-5 X6.5 Tg5.1 M4.2', k: { 1: 'Nếu Xe tiến 6…', 8: '…Mã tiến chiếu — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 6, h: 'p032_0', fen: '9/4k4/7N1/5R3/9/9/9/9/3pr4/5K3',
      s: 'Mã tiến chiếu, Xe tiến – lui chiếu đuổi Tướng; Mã lui hai bước chuyển về lộ 6 rồi nhảy chiếu — Xe Mã chiếu rút thắng.',
      c: '<p>Đỏ <strong>Mã tiến chiếu</strong>, <strong>Xe tiến chiếu rồi lui</strong> — Tướng Đen phải lên xuống liên tục. Mã lui hai bước về lộ 6, Xe bình theo; Đen chỉ còn bình Tốt. <strong>Mã nhảy chiếu</strong>, Xe tiến chiếu, Mã tiếp tục chiếu — Đỏ thắng.</p>',
      m: 'M2.3 Tg5/1 X4.3 Tg5.1 X4/5 Tg5/1 M3/4 Tg5.1 M4/6 Tg5-4 X4-6 B4-3 M6.4 Tg4-5 X6.4 Tg5.1 M4.2',
      kq: 'do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
