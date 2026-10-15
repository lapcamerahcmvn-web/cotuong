// Xe Mã Thực Chiến — Chương 1 · Bài 1: Cao Điếu Mã. Thế cờ + nước đi theo sách; lời giảng viết lại.
module.exports = {
  bai: 1, ch: 1, ten: 'Cao Điếu Mã', level: 'trung-cap',
  y: '"Cao điếu Mã" — Mã treo cao sát cung Tướng đối phương, phối hợp Xe khống chế đường chạy của Tướng. Bên Đen có Xe Tốt đè sát cung Đỏ nên Đỏ phải đi liền mạch từng nước chiếu hoặc dọa sát; chỉ cần chậm một nhịp là Đen phản sát.',
  cuoc: [
    {
      n: 1, h: 'p006_0', fen: '9/3k5/7N1/5R3/9/9/9/5K3/3pr4/9',
      s: 'Xe Mã đối Xe Tốt: Đỏ nhảy Mã lên hàng đáy rồi liên tục thoái Mã chiếu, dồn Tướng Đen về đúng ô để Mã nhảy chiếu bí.',
      c: '<p>Xe Đỏ ở hàng 3 khóa tuyến ngang, Mã ở cánh phải. Đỏ <strong>nhảy Mã lên đáy</strong> ép Tướng Đen rời ô; sau đó Mã <strong>lui về trung lộ rồi lại tiến</strong> — mỗi nước đều chiếu, Đen không có thời gian dùng Xe Tốt phản kích. Cuối cùng Tướng bị dồn về giữa, Mã nhảy chiếu bí.</p>',
      m: 'M2.3 Tg4.1 M3/5 Tg4/1 M5/3 Tg4/1 M3/5 Tg4-5 M5.7',
      k: { 1: 'Mã lên đáy — bắt đầu chuỗi nước ép.', 9: 'Mã chiếu bí — Xe khóa đường lui.' },
      kq: 'do',
    },
    {
      n: 2, h: 'p007_0', fen: '3k5/8r/9/6N2/9/9/4R4/9/3p1K3/9',
      s: 'Đỏ bình Xe chiếu, lên Tướng tránh Xe Đen, rồi dùng Mã chuyển vị liên tục kết hợp Xe khóa hàng — đuổi Tướng Đen về giữa chiếu bí.',
      c: '<p>Đen có Xe ở cánh trái sẵn sàng xuống chiếu. Đỏ <strong>bình Xe chiếm lộ 8</strong> và chịu lên Tướng một nước để né; sau đó <strong>Mã nhảy qua lại lộ 4 – 6</strong> vừa chiếu vừa che, Xe Đỏ chuyển cánh liên tục. Đen chỉ còn chạy Tướng và đi Tốt — Xe Đỏ chiếu bí ở trung lộ.</p>',
      m: 'X5-8 X9.7 Tg4.1 X9-5 M3.4 Tg4-5 M4/6 Tg5-4 X8-6 B4-3 M6/4 Tg4-5 X6-8 Tg5-4 M4/6 X5-4 X8.6 Tg4.1 X8/1 Tg4/1 M6.7 Tg4-5 X8-5',
      k: { 3: 'Lên Tướng né Xe Đen.', 23: 'Xe bình trung chiếu bí.' },
      kq: 'do',
    },
    {
      n: 3, h: 'p008_0', fen: '3k5/9/6N2/9/9/5R3/9/5K3/3pr4/9',
      s: 'Đỏ bình Xe chiếm lộ 8; Đen có ba cách ứng (Xe tiến, Xe thoái, Xe bình) — cách nào Đỏ cũng phối hợp Xe Mã chiếu bí.',
      c: '<p>Sau nước <strong>Xe bình 8</strong>, Đen có ba cách:</p><ul><li><strong>Xe tiến 1</strong> (mạch chính): Đỏ Xe chiếu xuống đáy rồi lui, Mã về trung lộ; dùng Tướng chặn Xe Đen, cuối cùng Mã chiếu và Xe lui chiếu bí.</li><li><strong>Xe thoái 2</strong>: Đỏ Xe chiếu, bình về lộ 6 – 4 ép Tướng, Mã về trung rồi nhảy chiếu bí.</li><li><strong>Xe bình 7</strong>: Đỏ nhảy Mã chiếu, Xe về trung, Mã lui chiếu — Xe tiến chiếu bí.</li></ul>',
      m: 'X4-8 X5.1 X8.5 Tg4.1 X8/3 Tg4/1 M3/5 X5-6 Tg4-5 Tg4-5 Tg5-6 B4-3 X8.3 Tg5.1 M5.3 X6/7 X8/2',
      v: [
        { from: 'main', after: 1, m: 'X5/2 X8.5 Tg4.1 X8/3 Tg4/1 X8-6 Tg4-5 X6-4 X5.1 Tg4/1 B4-5 Tg4/1 Tg5-4 M3/5 Tg4-5 M5.7', k: { 1: 'Xe thoái 2.', 16: 'Mã chiếu bí.' } },
        { from: 'main', after: 1, m: 'X5-7 M3.4 Tg4-5 X8-5 Tg5-4 M4/5 Tg4.1 M5/7 Tg4/1 X5.4', k: { 1: 'Xe bình 7.', 10: 'Xe chiếu bí.' } },
      ],
      kq: 'do',
    },
    {
      n: 4, h: 'p010_0', fen: '9/3N1k3/9/9/9/3R5/9/9/4rp3/3K5',
      s: 'Đỏ bình Xe biên chiếu, Mã lui về trung lộ rồi Xe lui về tuyến dưới phòng thủ; Đen ba cách ứng — Đỏ đều thắng bằng chuỗi Xe Mã chiếu liên hoàn.',
      c: '<p>Tướng Đỏ đang bị Xe Tốt Đen dọa, nên Đỏ vừa công vừa thủ: <strong>Xe bình biên chiếu</strong>, <strong>Mã lui về trung lộ</strong>, rồi <strong>Xe lui 7</strong> về phòng tuyến. Đen có ba cách:</p><ul><li><strong>Xe bình 3</strong> (mạch chính): Mã nhảy chiếu, Xe xuống đáy chiếu, Mã lui chiếu — Xe bình trung chiếu bí.</li><li><strong>Tướng tiến 1</strong>: Đỏ lui Mã, chiếu bằng Xe, Tướng Đỏ lên tránh; Mã chuyển vị chiếu liên tục rồi Xe bình trung chiếu bí.</li><li><strong>Tốt bình 7</strong>: cuộc dài nhất — Đỏ lui Mã đuổi Tốt, Xe chiếu xuống đáy, Mã nhảy liên tục ép Tướng; cuối cùng Mã chiếu bí.</li></ul>',
      m: 'X6-1 Tg6-5 X1.4 Tg5/1 M6/4 Tg5-6 X1/7 X5-3 M4.6 Tg6-5 X1.8 Tg5.1 X1/1 Tg5/1 M6/4 Tg5-6 X1-5',
      k: { 7: 'Xe lui về phòng thủ — Đen có ba cách ứng.', 17: 'Xe bình trung chiếu bí.' },
      v: [
        { from: 'main', after: 7, m: 'Tg6.1 M4/6 X5-1 X1.6 Tg6/1 M6/4 X1.1 Tg6.1 X1/6 M4/5 Tg6.1 M5.6 Tg6-5 X1-5', k: { 1: 'Tướng tiến 1.', 14: 'Xe bình trung chiếu bí.' } },
        { from: 'main', after: 7, m: 'B6-7 M4/6 B7-6 M6/4 Tg6-5 X1.8 Tg5.1 M4.3 Tg5.1 X1-5 Tg5-6 X5-4 Tg6-5 M3/5 Tg5/1 M5.7 Tg5.1 X4-5 Tg5-6 M7/5 X5-3 X5-3 Tg6-5 X3/2 Tg5/1 M5.7 Tg5-6 M7.6', k: { 1: 'Tốt bình 7.', 28: 'Mã chiếu bí.' } },
      ],
      kq: 'do',
    },
    {
      n: 5, h: 'p012_0', fen: '3k5/9/9/9/7N1/2R6/9/5K3/3pr4/9',
      s: 'Mã nhảy chiếu, Xe xuống đáy rồi bình về lộ 4 khóa Tướng; dùng Tướng Đỏ né Xe Tốt, cuối cùng Mã về trung lộ rồi nhảy chiếu bí.',
      c: '<p>Đỏ <strong>Mã tiến chiếu</strong>, Đen lui Xe phòng thủ. <strong>Xe xuống đáy</strong> rồi lui, <strong>bình về lộ 4</strong> khóa đường Tướng. Đen dùng Xe Tốt quấy rối, Đỏ chỉ cần lui Tướng tránh; khi Tướng Đen bị dồn ra giữa, <strong>Mã lui về trung rồi nhảy chiếu bí</strong>.</p>',
      m: 'M2.3 X5/2 X7.5 Tg4.1 X7/3 Tg4/1 X7-6 Tg4-5 X6-4 X5.1 Tg4/1 B4-5 Tg4/1 Tg5-4 M3/5 Tg4-5 M5.7',
      k: { 17: 'Mã chiếu bí.' },
      kq: 'do',
    },
    {
      n: 6, h: 'p013_0', fen: '9/2Nk5/9/9/5R3/9/9/9/2rp5/5K3',
      s: 'Thế dài: Đỏ Xe tiến chiếu, Mã lui về biên rồi quay lại, Xe Mã đổi vị liên tục ép Tướng Đen; Đen có Xe Tốt quấy rối nhưng Đỏ điều Tướng né và kết thúc bằng Mã chiếu bí.',
      c: '<p>Thế cờ dài, đòi hỏi kiên nhẫn: Đỏ <strong>Xe tiến chiếu</strong> rồi lui, <strong>Mã lui về biên rồi quay lại trung lộ</strong>, sau đó Xe chuyển sang cánh trái chiếu xuống. Khi Đen dùng Xe xuống chiếu, Đỏ lên Tướng né rồi tiếp tục ép; cuối cùng Mã lui về trung lộ và nhảy chiếu bí.</p><ul><li>Nếu Đen bình Tốt thay vì lui Xe: Đỏ dùng Tướng né, Mã lên chiếu, Xe bình trung — Xe tiến chiếu bí.</li></ul>',
      m: 'X4.3 Tg4.1 X4/2 Tg4/1 M7/9 Tg4/1 M9/7 Tg4-5 X4-5 Tg5-4 M7.5 Tg4.1 M5.4 Tg4/1 X5-8 Tg4-5 X8.3 Tg5.1 M4/3 Tg5-4 X8/2 X3.1 Tg4.1 X3-5 X8/1 X5/1 Tg4.1 Tg4/1 X8-6 Tg4-5 X6-4 X5/1 Tg4/1 B4-5 Tg4/1 Tg5-4 M3/5 Tg4-5 M5.7',
      k: { 39: 'Mã chiếu bí.' },
      v: [
        { from: 'main', after: 25, m: 'B4-5 Tg4.1 Tg4/1 M3.4 Tg4-5 X8-5 Tg5-4 M4/5 Tg4.1 M5/7 Tg4/1 X5.2', k: { 1: 'Nếu Tốt bình 5…', 12: 'Xe tiến chiếu bí.' } },
      ],
      kq: 'do',
    },
    {
      n: 7, h: 'p014_0', fen: '9/4k4/9/1N7/5R3/4r4/9/9/3p1K3/9',
      s: 'Đỏ nhảy Mã biên, lên Tướng né Xe Đen; Đen có hai cách (lui Xe hoặc bình Tướng) — Đỏ dùng Mã quấn quanh cung Tướng phối hợp Xe chiếu bí.',
      c: '<p>Đỏ <strong>nhảy Mã ra biên</strong>, Đen Xe tiến chiếu, Đỏ <strong>lên Tướng né</strong>. Đen có hai cách:</p><ul><li><strong>Xe thoái 1</strong> (mạch chính): Đỏ lui Tướng tránh, Mã quấn quanh cung, Xe tiến lui liên tục dồn Tướng — Xe bình trung chiếu bí.</li><li><strong>Tướng bình 4</strong>: Mã lui chiếu, Xe lui chặn, Mã nhảy liên tục — Mã lui chiếu bí.</li></ul>',
      m: 'M8.9 X5.3 Tg4.1 X5/1 Tg4/1 B4-5 Tg4/1 Tg5-4 M9/7 Tg4.1 M7.8 X5/4 X4.4 X5/2 X4/3 X5.5 M8/9 Tg4/1 X4.2 Tg4/1 M9.8 X5/4 X4.1 X5/2 M8/7 Tg4.1 X4-5',
      k: { 2: 'Xe tiến xuống hàng 2 chiếu (sách in "tiến 2" — đi đúng luật phải là tiến 3).', 3: 'Lên Tướng né Xe — Đen có hai cách.', 27: 'Xe bình trung chiếu bí.' },
      v: [
        { from: 'main', after: 3, m: 'Tg5-4 M9/7 Tg4.1 X4/1 X5/4 M7.6 Tg4/1 M6/8 Tg4-5 X4.4 Tg5/1 M8/6 Tg5-4 M6/5', k: { 1: 'Tướng bình 4.', 14: 'Mã chiếu bí.' } },
      ],
      kq: 'do',
    },
    {
      n: 8, h: 'p016_0', fen: '8N/4k4/9/3R5/9/9/9/4r4/4p4/3K5',
      s: 'Mã ở góc bàn lui chiếu hai lần, Xe tiến xuống rồi lui; Mã chuyển về lộ 2 – 4 rồi Xe bình chiếm lộ 4 — Mã tiến chiếu bí.',
      c: '<p>Mã Đỏ ở góc bàn tưởng vô dụng nhưng <strong>lui chiếu liên tục</strong> buộc Tướng Đen chạy. Xe tiến xuống rồi lui về tuyến giữa, Mã chuyển từ biên vào lộ 2 – 4; Đen lui Xe phòng thủ, Đỏ <strong>bình Xe chiếm lộ 4</strong> và <strong>Mã tiến chiếu bí</strong>.</p>',
      m: 'M1/3 Tg5-6 M3/1 Tg6-5 X6.2 Tg5/1 X6/5 Tg5.1 M1/2 X5/5 M2.4 Tg5-6 X6-4 X5.5 M4/2 Tg6-5 M2.3 Tg5.1 X4-6 Tg5-6 M3.2',
      k: { 21: 'Mã chiếu bí.' },
      kq: 'do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
