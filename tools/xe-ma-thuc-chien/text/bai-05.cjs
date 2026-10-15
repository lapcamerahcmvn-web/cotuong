// Xe Mã Thực Chiến — Chương 1 · Bài 5: Xe Mã thắng Xe đôi Tốt. Thế cờ + nước đi theo sách; lời giảng viết lại.
module.exports = {
  bai: 5, ch: 1, ten: 'Xe Mã Thắng Xe Đôi Tốt', level: 'trung-cap',
  y: 'Bên Đen có Xe và hai Tốt đã qua sông — đủ để chiếu quấy Tướng Đỏ nếu Đỏ lơ là. Mấu chốt của dạng này: Xe Mã phải tấn công liên tục để Đen không có thời gian phản kích, và khi cần thì Tướng Đỏ chủ động lên xuống né chiếu thay vì đem quân về thủ. Nhiều thế kết thúc ở đây Đen chỉ còn cách dùng Xe chiếu dai Tướng Đỏ — theo luật cờ tướng, bên chiếu dai phải đổi nước, nên đó không phải cách cứu cờ.',
  cuoc: [
    {
      n: 1, h: 'p038_0', fen: '9/4k4/9/5R3/2N6/9/6p2/9/2p1r4/5K3',
      s: 'Mã nhảy vòng qua cánh trái rồi trở về áp sát cung, khống chế hai điểm thoát của Tướng; Xe bình sang lộ 3 dọa chiếu ngang đáy — Đen không còn cách đỡ.',
      c: '<p>Đỏ <strong>Mã nhảy lên lộ 8</strong>, Tướng Đen lui xuống đáy. Mã <strong>lui về lộ 6</strong> rồi <strong>tiến vào lộ 4</strong> — từ đây Mã khống chế cả điểm giữa cung lẫn ô trên đầu Tướng, Tướng Đen (đã bình sang lộ 4) bị nhốt chặt.</p><p>Đen bình Xe sang lộ 4 để che đường dọc. Đỏ chỉ cần <strong>Xe bình sang lộ 3</strong>: nước sau Xe tiến xuống đáy chiếu ngang là bí, Đen không có quân nào chặn được hàng đáy. Cách kháng cự duy nhất là dùng Xe chiếu liên tục Tướng Đỏ, nhưng chiếu dai bị luật cấm — Đen buộc phải đổi nước và thua.</p>',
      m: 'M7.8 Tg5/1 M8/6 Tg5-4 M6.4 X5-4 X4-3',
      k: { 5: 'Mã vào lộ 4 — Tướng Đen bị nhốt.', 7: 'Dọa Xe tiến chiếu ngang đáy.' },
      kq: 'do',
    },
    {
      n: 2, h: 'p038_1', fen: '1R7/9/1N1k5/9/9/5p3/9/9/2p5r/5K3',
      s: 'Xe bình sang cánh phải; Đen lui Xe giữ hàng ngang thì Đỏ dùng Xe chiếu dọc, Mã lui chiếu — Xe bình chiếu thắng. Nếu Đen bình Tướng thay vì lui Xe, Xe Mã chiếu dồn xuống đáy bí ngay.',
      c: '<p>Đỏ <strong>Xe bình sang lộ 2</strong>. Đen có hai cách:</p><ul><li><strong>Xe lui 6</strong> (mạch chính) giữ hàng ngang của Tướng: Đỏ lui Xe về tuyến giữa, bình về lộ 6 chiếu dọc, Xe bình trung đuổi Tướng sang lộ 6; <strong>Mã lui chiếu</strong>, Tướng phải lui — Xe bình 4 chiếu, Đỏ thắng.</li><li><strong>Tướng bình 5</strong>: Xe lui chiếu ngang, Mã tiến chiếu, Xe tiến xuống đáy — chiếu bí.</li></ul><p>Sách in nước 2 của Đen là "Tốt 4 bình 5", nhưng trên thế cờ không có Tốt ở lộ 4 — ở đây dùng <strong>Tốt 3 bình 4</strong>. Tốt lộ 6 không được rời chỗ: nó đang che mặt hai Tướng, rời đi thì về sau Tướng Đen không còn đường bình sang lộ 6.</p>',
      m: 'X8-2 X9/6 X2/4 B3-4 X2-6 Tg4-5 X6-5 Tg5-6 M8/6 Tg6/1 X5-4',
      k: { 1: 'Xe sang cánh phải — Đen có hai cách.', 9: 'Mã lui chiếu.' },
      v: [
        { from: 'main', after: 1, m: 'Tg4-5 X2/2 Tg5/1 M8.7 Tg5/1 X2.2', k: { 1: 'Nếu Tướng bình 5…', 6: '…Xe tiến chiếu bí.' } },
      ],
      kq: 'do',
    },
    {
      n: 3, h: 'p039_0', fen: '9/4k1N2/9/7R1/9/5p3/9/9/2p1r4/5K3',
      s: 'Xe tiến sát Mã, Mã lui mở đường thành chiếu lộ; Xe Mã thay nhau chiếu đuổi Tướng, cuối cùng Xe ăn Tốt chiếu dọc rồi tiến chiếu — Đen thua.',
      c: '<p>Đỏ <strong>Xe tiến 2</strong> đứng sau Mã trên cùng hàng với Tướng Đen. Đen bình Tướng sang lộ 6 né trước; Đỏ <strong>Mã lui</strong> — Xe lộ ra chiếu ngang (chiếu lộ). Tướng lên, Xe lui chiếu, Mã nhảy chiếu, Mã tiến chiếu — Tướng Đen bị đẩy qua lại trong cung.</p><p>Xe lui về giữ, Đen lui Xe lên phòng thủ; Mã lui chiếu, Đen phải dùng Xe chặn chân Mã. Lúc này Đỏ <strong>Xe bình ăn Tốt chiếu</strong>, Tướng Đen bình về giữa, <strong>Xe tiến chiếu</strong> — Tướng Đen không thể ăn Xe vì sẽ lộ mặt Tướng, Đỏ thắng.</p><p>Ở nước 6, Đỏ cũng có thể lui Xe 1, Xe bình 4 chiếu rồi lui ăn Tốt — vẫn thắng.</p>',
      m: 'X2.2 Tg5-6 M3/4 Tg6.1 X2/1 Tg6/1 M4.6 Tg6-5 M6.7 Tg5-6 X2/3 X5/3 M7/6 X5/3 X2-4 Tg6-5 X4.4',
      k: { 3: 'Mã lui — chiếu lộ.', 17: 'Xe tiến chiếu — Tướng Đen không thể ăn vì lộ mặt Tướng.' },
      v: [
        { from: 'main', after: 10, m: 'X2/1 Tg6/1 X2-4 Tg6-5 X4/2', k: { 1: 'Cách khác: Xe lui 1…', 5: '…Xe lui ăn Tốt — Đỏ thắng thế.' } },
      ],
      kq: 'do',
    },
    {
      n: 4, h: 'p040_0', fen: '8r/N2k5/9/5R3/9/9/6p2/9/2p2K3/9',
      s: 'Mã lui chiếu, Xe tiến chiếu rồi lui về giữ; Đen lên Tướng hay tiến Xe chiếu quấy, Đỏ đều dùng Mã quấn quanh cung để chiếu thắng.',
      c: '<p>Đỏ <strong>Mã lui chiếu</strong>, Tướng Đen lên. <strong>Xe tiến chiếu</strong>, Tướng lui, Xe lui về tuyến giữa. Đen có hai cách:</p><ul><li><strong>Tướng tiến 1</strong> (mạch chính): Xe bình 6 chiếu, Mã lui – tiến về lộ 4 chiếu; Đen tiến Xe chiếu quấy, Đỏ lui Tướng tránh; Mã tiến chiếu hai lần — Đỏ thắng.</li><li><strong>Xe tiến 8 chiếu</strong>: Đỏ lui Tướng, Mã tiến 6 rồi lui về lộ 8, Xe bình trung chiếu; Mã lui chiếu, Xe tiến chiếu — Đỏ thắng.</li></ul>',
      m: 'M9/7 Tg4.1 X4.1 Tg4/1 X4/3 Tg4.1 X4-6 Tg4-5 M7/6 Tg5/1 M6.4 Tg5-6 X6-4 X9.8 Tg4/1 B7.1 M4.6 Tg6-5 M6.7',
      k: { 5: 'Xe lui về tuyến giữa — Đen có hai cách.', 19: 'Mã tiến chiếu.' },
      v: [
        { from: 'main', after: 5, m: 'X9.8 Tg4/1 Tg4.1 M7.6 Tg4/1 M6/8 Tg4-5 X4-5 Tg5-4 M8/7 Tg4/1 X5.4', k: { 1: 'Xe tiến 8 chiếu.', 12: 'Xe tiến chiếu.' } },
      ],
      kq: 'do',
    },
    {
      n: 5, h: 'p042_0', fen: '9/9/4kN2r/9/9/5R3/6p2/9/2p2K3/9',
      s: 'Mã tiến rồi lui chặn đường; Đen tiến Xe chiếu, Đỏ lui Tướng. Mã lui về trung lộ, Xe tiến chiếu, Mã tiến — Xe lui ra chiếu bắt Tướng.',
      c: '<p>Đỏ <strong>Mã tiến lên đáy</strong>, Tướng Đen lui; Mã lui về lộ 3. Đen tiến Xe xuống chiếu, Đỏ lui Tướng né. Đen bình Tướng sang lộ 4; Đỏ <strong>Mã lui về trung lộ</strong> che chắn. Đen bình Xe vào trung lộ ghim Mã, nhưng Đỏ <strong>Xe tiến chiếu</strong>, Tướng lên, <strong>Mã tiến chiếu</strong> — Xe Đen phải lui về đỡ, Xe Đỏ lui chiếu, Đỏ thắng.</p><p>Nếu Đen bình Tướng về giữa thay vì bình Xe: Xe bình trung chiếu, Mã lui chiếu, Xe tiến xuống đáy — Đỏ thắng.</p>',
      m: 'M4.5 Tg5/1 M5/3 X9.6 Tg4/1 Tg5-4 M3/5 X9-5 X4.4 Tg4.1 M5.4 X5/8 X4/4',
      k: { 7: 'Mã về trung lộ che chắn.', 11: 'Mã tiến chiếu.' },
      v: [
        { from: 'main', after: 7, m: 'Tg4-5 X4-5 Tg5-4 M5/7 Tg4/1 X5.4', k: { 1: 'Nếu Tướng bình 5…', 6: '…Xe tiến chiếu — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 6, h: 'p043_0', fen: '4k4/9/9/3R1N3/9/9/6p2/9/2p1r4/5K3',
      s: 'Mã tiến áp sát; Đen bình Tướng hoặc lên Tướng — Đỏ đều đổi vị Mã, Xe bình chiếu ép Tướng vào góc rồi Xe tiến/lui chiếu thắng.',
      c: '<p>Đỏ <strong>Mã tiến về lộ 6</strong> áp sát cung. Đen có hai cách:</p><ul><li><strong>Tướng bình 4</strong> (mạch chính): Mã lui sang cánh, Tướng về giữa; Xe bình 4 khóa lộ, Đen bình Xe che. Mã nhảy ra biên, <strong>Xe tiến chiếu</strong>, Mã lui chiếu — Đen phải dùng Xe chặn chân Mã, Xe Đỏ lui về khóa — Đỏ thắng. (Nếu Đen bình Tướng thay vì bình Xe: Mã lui – tiến chiếu, Xe bình 6, Xe tiến chiếu — Đỏ thắng.)</li><li><strong>Tướng tiến 1</strong>: Xe bình 4, Mã nhảy về lộ 8 rồi lộn lại; Tướng Đen bị đuổi qua lại, Mã lui chiếu, Xe tiến khóa — Đỏ thắng.</li></ul><p>Ở nhánh thứ hai sách in nước Đen là "Tốt 5 bình 4" — trên thế cờ không có Tốt lộ 5; theo diễn biến tiếp theo (Đen lại "Tướng 4 bình 5") thì đó là <strong>Tướng 5 bình 4</strong>.</p>',
      m: 'M4.6 Tg5-4 M6/8 Tg4-5 X6-4 X5-4 M8.9 B7.1 X4.3 Tg5.1 M9/7 X4/6 X4/2',
      k: { 1: 'Mã áp sát — Đen có hai cách.', 9: 'Xe tiến chiếu.', 11: 'Mã lui chiếu.' },
      v: [
        { from: 'main', after: 5, m: 'Tg5-4 M8/6 Tg4.1 M6.7 Tg4.1 X4-6 Tg4-5 X6.2', k: { 1: 'Nếu Tướng bình 4…', 8: '…Xe tiến chiếu — Đỏ thắng.' } },
        { from: 'main', after: 1, m: 'Tg5.1 X6-4 Tg5-4 M6.8 Tg4-5 M8.6 Tg5-4 X4-6 Tg4-5 M6/7 Tg5.1 X6.2', k: { 1: 'Tướng tiến 1.', 12: 'Xe tiến khóa — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 7, h: 'p044_0', fen: '3k5/9/9/9/2N6/5p3/9/1R7/3p3r1/5K3',
      s: 'Xe tiến chiếu đáy, Mã nhảy hai bước áp sát cung; Đen bình Tướng sang lộ 6 hay lên Tướng — Đỏ kiên nhẫn né chiếu bằng Tướng, Xe Mã đổi vị liên tục rồi chiếu bí.',
      c: '<p>Đỏ <strong>Xe tiến xuống đáy chiếu</strong>, Tướng Đen lên; Mã tiến hai bước sát cung. Đen có hai cách:</p><ul><li><strong>Tướng bình 6</strong> (mạch chính): Đỏ lui Xe về giữ, Đen dùng Xe chiếu quấy — Đỏ <strong>lên Tướng</strong> né. Mã lui về trung rồi tiến sang lộ 3, Xe tiến xuống đáy; Đen lại chiếu, Đỏ lui Tướng. Mã lui về lộ 4, Xe lui 1 giữ hàng — <strong>Mã tiến chiếu</strong>, Đỏ thắng.</li><li><strong>Tướng tiến 1</strong>: Xe bình trung chiếu, bình 6 đuổi; Mã lui – tiến – tiến chiếu liên tục, Xe bình trung. Đen tiến Xe chiếu, Đỏ lên Tướng; Mã tiến chiếu, Xe lui chiếu — Đỏ thắng.</li></ul><p>Ở mạch chính, nước cuối sách in "Xe 4 tiến 3" — Đỏ không có Xe ở lộ 4; quân ở lộ 4 là Mã, nên đúng là <strong>Mã 4 tiến 3</strong> (engine xác nhận chiếu hết sau 2 nước).</p>',
      m: 'X8.7 Tg4.1 M7.5 Tg4-5 M5.7 Tg5-6 X8/5 X8.1 Tg4.1 X8/4 M7/5 Tg6-5 M5.3 Tg5-6 X8.5 X8.3 Tg4/1 Tg6.1 M3/4 Tg6/1 X8/1 Tg6/1 M4.3',
      k: { 5: 'Mã áp sát — Đen có hai cách.', 23: 'Mã tiến chiếu.' },
      v: [
        { from: 'main', after: 5, m: 'Tg5.1 X8-5 Tg5-4 X5-6 Tg4-5 M7/6 Tg5/1 M6.4 Tg5-6 M4.6 Tg6-5 X6-5 Tg5-4 M6/5 X8.1 Tg4.1 X8-3 M5.4 Tg4.1 X5/1', k: { 1: 'Tướng tiến 1.', 20: 'Xe lui chiếu — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 8, h: 'p046_0', fen: '7N1/1R7/3k5/9/9/9/9/7p1/3pr4/5K3',
      s: 'Mã lui chiếu, Mã tiến chiếu; Xe bình sang cánh phải rồi lui về chiếu dọc — Mã lui chiếu kết thúc.',
      c: '<p>Đỏ <strong>Mã lui chiếu</strong>, Tướng Đen về giữa; <strong>Mã tiến chiếu</strong>, Tướng lại sang lộ 4. Đỏ <strong>Xe bình sang lộ 2</strong>, Đen lui Xe phòng thủ. Xe lui về tuyến giữa, Tướng Đen lui; <strong>Xe bình 6 chiếu</strong>, Tướng về giữa — <strong>Mã lui chiếu</strong>, Đỏ thắng.</p>',
      m: 'M2/4 Tg4-5 M4.6 Tg5-4 X8-2 X5/5 X2/4 Tg4/1 X2-6 Tg4-5 M6/7',
      k: { 11: 'Mã lui chiếu.' },
      kq: 'do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
