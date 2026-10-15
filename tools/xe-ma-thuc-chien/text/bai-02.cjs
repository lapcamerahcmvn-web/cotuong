// Xe Mã Thực Chiến — Chương 1 · Bài 2: Hoa Tâm Xe. Thế cờ + nước đi theo sách; lời giảng viết lại.
module.exports = {
  bai: 2, ch: 1, ten: 'Hoa Tâm Xe', level: 'trung-cap',
  y: '"Hoa tâm Xe" — Xe đánh thẳng vào tâm cung (ô giữa cung Tướng), Mã yểm hộ từ cạnh sườn. Tướng Đen bị đẩy ra khỏi trung tâm thì Xe Mã thay nhau chiếu, bên Đen có Xe Tốt cũng không kịp phản kích.',
  cuoc: [
    {
      n: 1, h: 'p017_0', fen: '9/3k3N1/9/5R3/9/9/9/9/3pr4/5K3',
      s: 'Mã nhảy về sát tâm cung; Đen lui Tướng hoặc bình Tướng — Đỏ đều dùng Xe đánh vào tâm cung phối hợp Mã chiếu bí.',
      c: '<p>Đỏ <strong>nhảy Mã về lộ 4</strong> sát tâm cung. Đen có hai cách:</p><ul><li><strong>Tướng lui 1</strong> (mạch chính): Xe chuyển sang lộ 8 chiếu xuống, Mã lui chặn, Xe lui về biên rồi về trung lộ — Mã quấn quanh cung, Xe tiến chiếu.</li><li><strong>Tướng bình 5</strong>: Mã lui chiếu, Xe tiến lui liên tục, Mã nhảy ra nhảy vào — Mã tiến chiếu bí.</li></ul>',
      m: 'M2.4 Tg4/1 X4-8 Tg4-5 X8.3 Tg5.1 M4/3 Tg5-4 X8/3 Tg4/1 X8-9 X5-7 M3.4 Tg4-5 X9-5 Tg5-4 M4/5 Tg4.1 M5/7 Tg4.1 X5.1',
      k: { 1: 'Mã về sát tâm cung — Đen có hai cách.', 21: 'Xe tiến chiếu.' },
      v: [
        { from: 'main', after: 1, m: 'Tg4-5 M4/3 Tg5.1 X4.1 Tg5/1 X4/3 Tg5.1 M3/4 Tg5/1 M4.6 Tg5-4 X4-6 B4-3 M6.4 Tg4-5 X6.4 Tg5.1 M4.2', k: { 1: 'Tướng bình 5.', 18: 'Mã chiếu bí.' } },
      ],
      kq: 'do',
    },
    {
      n: 2, h: 'p019_0', fen: '9/9/3k4r/9/1N7/5R3/9/9/3p1K3/9',
      s: 'Mã nhảy lên lộ 6 dọa chiếu; Đen lui Xe phòng thủ — Đỏ đổi vị Xe Mã, đưa Xe về tâm cung chiếu bí.',
      c: '<p>Đỏ <strong>Mã tiến 6</strong> áp sát. Đen lui Xe phòng thủ: Mã nhảy chiếu, Xe Đỏ bình về trung lộ đuổi Tướng, Mã lui – tiến liên tục; khi Đen dùng Xe xuống chiếu, Đỏ lên Tướng né rồi Xe bình về tâm cung chiếu bí.</p>',
      m: 'M8.6 X9/2 M6.8 Tg4-5 X4-5 Tg5-4 M8/7 Tg4/1 M7.5 Tg4.1 M5.4 Tg4/1 X5-7 X9.8 Tg4.1 Tg4-5 X7.4 Tg5/1 M4/6 Tg5-4 X7-5',
      k: { 1: 'Mã áp sát.', 21: 'Xe bình về tâm cung chiếu bí.' },
      v: [
      ],
      kq: 'do',
    },
    {
      n: 3, h: 'p020_0', fen: '4k4/9/9/3RN1r2/9/9/9/9/3K1p3/9',
      s: 'Xe tiến chiếu, Mã nhảy chiếu đuổi Tướng sang cánh phải; Đen dùng Xe quấy Tướng Đỏ, Đỏ lên xuống Tướng né rồi Xe Mã phối hợp chiếu bí.',
      c: '<p>Đỏ <strong>Xe tiến chiếu</strong>, <strong>Mã nhảy chiếu</strong> đuổi Tướng sang cánh phải rồi Xe lui về tuyến giữa. Đen dùng Xe xuống chiếu, Đỏ chỉ cần lên xuống Tướng né; sau đó Mã quay về, Xe lui chiếu và tiến chiếu bí.</p><p>Nếu ở nước 3 Đen bình Xe che: Đỏ Mã nhảy chiếu, lui về trung lộ, Xe tiến — Mã tiến chiếu bí.</p>',
      m: 'X6.3 Tg5.1 M5.7 Tg5-6 X6/2 Tg6/1 M7.6 X7.5 X6-4 Tg6-5 X4-5 Tg5-6 M6/8 X7/2 Tg6.1 X7.3 Tg6/1 X7/1 M8/6 Tg6.1 X5/1 Tg6.1 X5.2',
      k: { 23: 'Xe tiến chiếu.' },
      v: [
        { from: 'main', after: 5, m: 'X7-6 M7.6 Tg6/1 M6/5 Tg6.1 X6.1 Tg6.1 M5.6', k: { 1: 'Nếu Xe bình che…', 8: '…Mã tiến chiếu — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 4, h: 'p022_0', fen: '9/3R5/5k3/2r6/9/4N4/9/9/5p3/3K5',
      s: 'Xe bình vào tâm cung, lên Tướng né; Mã nhảy chiếu, Xe chuyển ra biên rồi về — khi Đen đổi hướng Xe, Đỏ dùng Tướng chặn và Mã chiếu ép thắng.',
      c: '<p>Đỏ <strong>Xe bình vào tâm cung</strong>, Đen bình Xe sang cánh trái. Đỏ <strong>lên Tướng</strong>, Xe tiến chiếu, Mã nhảy chiếu liên tục. Xe chuyển ra biên, Mã lui về trung lộ rồi lại tiến; khi Đen đưa Xe về lộ 4 quấy rối, Đỏ dùng Tướng chặn, Mã tiến chiếu và lui Tướng — Đỏ thắng.</p><p>Nếu ở nước 4 Đen bình Xe chặn lộ 4: Đỏ bình Tướng, Xe lui đuổi, Mã tiến chiếu rồi Xe bình chiếu — Đỏ thắng.</p>',
      m: 'X6-5 X3-7 Tg6.1 B6-7 X5.1 Tg6/1 M5.7 Tg6.1 M7.6 X7.3 X5-1 Tg6-5 M6/5 Tg5/1 X1/1 Tg5.1 M5.7 Tg5-6 X1-5 X7-4 Tg6-5 X4/3 M7.6 B7-6 Tg5/1',
      v: [
        { from: 'main', after: 7, m: 'X7-4 Tg6-5 X4.1 X5/3 B7-6 Tg5/1 X4-6 M7.6 Tg6.1 X5.1 Tg6/1 X5-3', k: { 1: 'Nếu Xe bình 4…', 12: '…Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 5, h: 'p023_0', fen: '9/9/4kNr2/9/5R3/9/9/9/2p2K3/9',
      s: 'Xe bình trung chiếu, Mã lui; Đen bình Tốt hoặc tiến Xe — Đỏ đều dùng Xe Mã đổi vị liên hoàn để chiếu bí.',
      c: '<p>Đỏ <strong>Xe bình trung chiếu</strong>, Tướng Đen bình 4, Đỏ <strong>Mã lui 6</strong>. Đen có hai cách đáng chú ý:</p><ul><li><strong>Tốt bình 4</strong> (mạch chính): cuộc dài nhất — Xe Mã đổi vị liên tục, Tướng Đen bị đuổi qua lại; cuối cùng Mã tiến chiếu.</li><li><strong>Xe tiến 1</strong>: Mã nhảy chiếu, Xe bình 4, Mã tiến liên tục — Xe bình trung chiếu.</li></ul>',
      m: 'X4-5 Tg5-4 M4/6 B3-4 X5-4 X7/2 M6.8 Tg4-5 X4-5 Tg5-4 M8/7 Tg4/1 M7.5 Tg4/1 X5-4 Tg4-5 X4.2 Tg5.1 M5.7 Tg5-4 X4/1 Tg4.1 M7.6 Tg4/1 M6/8 Tg4-5 X4.2 Tg5/1 M8/6 Tg5-4 X4-5 X7-6 M6.4',
      k: { 3: 'Mã lui — Đen có hai cách.', 33: 'Mã tiến chiếu.' },
      v: [
        { from: 'main', after: 3, m: 'X7.1 M6.8 X7-3 X5-4 Tg4-5 M8.6 X3.3 M6.4 Tg5/1 X4-5', k: { 1: 'Xe tiến 1.', 10: 'Xe bình trung chiếu.' } },
      ],
      kq: 'do',
    },
    {
      n: 6, h: 'p025_0', fen: '9/3N1k3/9/7r1/3R5/9/9/9/3K1p3/9',
      s: 'Xe bình chiếu, vào tâm cung, Mã lui về trung lộ; Đen dùng Xe chạy qua lại tìm phản kích — Đỏ lui Tướng giữ chắc rồi Xe Mã phối hợp chiếu bí.',
      c: '<p>Đỏ <strong>Xe bình chiếu</strong> rồi <strong>bình vào tâm cung</strong>, Mã lui về trung lộ. Đen dùng Xe chạy qua lại tìm cơ hội chiếu; Đỏ kiên nhẫn lui Xe giữ, lui Tướng tránh, Mã nhảy về cánh rồi trở lại. Cuối cùng Xe chuyển sang lộ 2, Mã tiến chiếu và Xe bình về trung chiếu bí.</p><p>Nếu ở nước 4 Đen tiến Xe: Đỏ Mã nhảy chiếu, lui Tướng, Mã tiến — Đỏ bình Tướng thắng.</p>',
      m: 'X6-4 Tg6-5 X4-5 Tg5-6 M6/5 Tg6.1 X5/1 X8-7 X5/1 X7-8 X5.2 X8-7 M5/3 Tg6/1 Tg6/1 X7-2 M3.5 Tg6.1 M5.6 Tg6/1 X5-2 Tg6-5 X2.3 Tg5.1 M6.4 Tg5-6 X2-5',
      k: { 27: 'Xe bình trung chiếu.' },
      v: [
        { from: 'main', after: 7, m: 'X8.1 M5.7 X8-6 Tg6/1 Tg6/1 M7.6 Tg6/1 Tg6-5', k: { 1: 'Nếu Xe tiến 1…', 8: '…Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
