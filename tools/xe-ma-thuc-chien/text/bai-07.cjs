// Xe Mã Thực Chiến — Chương 1 · Bài 7: Một số cuộc Xe Mã khéo thắng. Thế cờ + nước đi theo sách; lời giảng viết lại.
module.exports = {
  bai: 7, ch: 1, ten: 'Một Số Cuộc Xe Mã Khéo Thắng', level: 'nang-cao',
  y: 'Các thế ở bài này gần với ván thật hơn: bên Đen còn Sĩ, Tượng, có khi thêm Pháo hay Mã, còn Đỏ có Sĩ Tượng giữ nhà. Xe Mã phải biết ăn quân phòng thủ đúng lúc (ăn Sĩ, ăn Tượng để mở đường chiếu), và Tướng Đỏ thường phải tự tránh các nước chiếu quấy của Xe Pháo Đen.',
  cuoc: [
    {
      n: 1, h: 'p058_0', fen: '5a3/4k4/5a3/9/6N2/2B6/9/2p1B4/4rp3/3K2R2',
      s: 'Xe tiến lên rồi bình về trung lộ, Mã ăn Sĩ chiếu; Mã lui, Xe lui ăn Tốt rồi tiến chiếu — Mã tiến, Xe bình trung ăn nốt Sĩ.',
      c: '<p>Đỏ <strong>Xe tiến 3</strong>, Đen bình Tốt sát Tướng Đỏ. Xe <strong>bình về trung lộ</strong>, Tướng Đen tránh sang lộ 4. <strong>Mã nhảy ăn Sĩ chiếu</strong>, Tướng lên; Mã lui về giữa chiếu, Tướng lui. Xe bình 6 đuổi Tướng về giữa, rồi <strong>lui ăn Tốt</strong> — Tướng Đỏ hết bị quấy.</p><p>Tướng Đen bình sang lộ 6, Xe <strong>tiến 6 chiếu</strong>, Đen phải chống Sĩ. Mã tiến chiếu đuổi Tướng lên, <strong>Xe bình trung ăn Sĩ</strong> — Đen mất hết quân phòng thủ, Đỏ thắng.</p>',
      m: 'X3.3 B3-4 X3-5 Tg5-4 M3.4 Tg4.1 M4/5 Tg4/1 X5-6 Tg4-5 X6/1 Tg5-6 X6.6 S6.5 M5.6 Tg6.1 X6-5',
      k: { 5: 'Mã ăn Sĩ chiếu.', 11: 'Xe lui ăn Tốt.', 17: 'Xe ăn Sĩ.' },
      kq: 'do',
    },
    {
      n: 2, h: 'p059_0', fen: '5k3/4a4/4b4/5N1Rp/9/2B6/3p2P2/4B1n2/4r4/3K5',
      s: 'Xe tiến chiếu, Mã tiến chiếu đẩy Tướng lên cao; Xe lui khóa hàng, bình vào ăn Sĩ — Mã quấn quanh cung chiếu liên tục, Xe bình chiếu bí.',
      c: '<p>Đỏ <strong>Xe tiến xuống đáy chiếu</strong>, <strong>Mã tiến chiếu</strong> — Tướng Đen bị đẩy lên tầng 3. Xe lui 1 khóa hàng, Đen lui Tượng phòng thủ; <strong>Xe bình ăn Sĩ</strong> rồi bình 6 chiếu, Tướng về giữa. Mã lần lượt tiến 4, tiến 6, lui 8, lui 7 — mỗi bước đều chiếu, Xe bình 4 theo; cuối cùng <strong>Xe bình 6 chiếu bí</strong>.</p>',
      m: 'X2.3 Tg6.1 M4.2 Tg6.1 X2/1 T5/7 X2-5 T7.9 X5-6 Tg6-5 M2.4 Tg5-6 M4.6 Tg6-5 X6-4 Tg5-4 M6/8 Tg4-5 M8/7 Tg5-4 X4-6',
      k: { 7: 'Xe ăn Sĩ.', 21: 'Xe bình chiếu bí.' },
      kq: 'do',
    },
    {
      n: 3, h: 'p060_0', fen: '2b6/9/3a1k3/9/5N3/9/9/4B4/1r1p1p1R1/3AKA3',
      s: 'Xe tiến chiếu hai lần, Mã nhảy chiếu; Xe bình trung, Đen lui Sĩ che — Xe lui về, Mã lui – tiến – tiến liên tục chiếu, Xe bình chiếu bí.',
      c: '<p>Đỏ <strong>Xe tiến 6 chiếu</strong>, Tướng lui; <strong>Xe tiến 1 chiếu</strong>, Tướng lên. Mã nhảy chiếu đuổi Tướng về giữa, Xe bình 4 — Đen lui Sĩ về giữa che. Đỏ <strong>Xe lui 4</strong> chờ, Đen bình Xe tìm phản kích; Mã lui chiếu, tiến chiếu, tiến chiếu — Tướng Đen bị dồn sang lộ 4, <strong>Xe bình 6 chiếu bí</strong>.</p>',
      m: 'X2.6 Tg6/1 X2.1 Tg6.1 M4.6 Tg6-5 X2-4 S4/5 X4/4 X2-3 M6/4 Tg5-6 M4.2 Tg6-5 M2.3 Tg5-4 X4-6',
      k: { 17: 'Xe bình chiếu bí.' },
      kq: 'do',
    },
    {
      n: 4, h: 'p061_0', fen: '1Rba1ab2/9/4k4/7N1/4r4/9/9/9/6p2/3K5',
      s: 'Mã tiến chiếu, Xe lui về bình chiếu; Đen tiến Xe chiếu, Tướng Đỏ lên tránh. Mã nhảy chiếu dồn Tướng, Xe Đen bị buộc lui về thủ — Đỏ lui Tướng về, thế thắng chắc.',
      c: '<p>Đỏ <strong>Mã tiến chiếu</strong>, Tướng Đen sang lộ 6. Xe Đỏ từ đáy lui 5, bình về lộ 4 chiếu — Tướng Đen về giữa. Mã lui, Tướng Đen lên; Xe bình sang lộ 2. Đen dồn Xe xuống chiếu, Đỏ <strong>lên Tướng</strong> né.</p><p>Mã tiến 6, tiến 8 chiếu liên tục; Xe bình trung đuổi Tướng sang lộ 6, Mã nhảy về lộ 6 — Xe Đen phải lui về che. Xe Đỏ bình sang lộ 2, đưa Tướng về trung lộ rồi lui xuống — Tốt Đen không làm gì được, Đỏ thắng.</p>',
      m: 'M2.3 Tg5-6 X8/5 Tg6/1 X8-4 Tg6-5 M3/4 Tg5.1 X4-2 X5.5 Tg6.1 Tg5-6 M4.6 Tg6-5 M6.8 X5-6 X2-5 Tg5-6 M8.6 X6/5 X5-2 X6-4 Tg6-5 B7-6 Tg5/1',
      kq: 'do',
    },
    {
      n: 5, h: 'p062_0', fen: '3k1a3/4a4/4b3b/1N5R1/9/6B2/9/2p1BA3/5K3/1c4r2',
      s: 'Xe bình 6, tiến 1 ăn Sĩ; Xe ăn Tượng trung lộ, Mã nhảy chiếu, Xe ra biên chiếu. Đen chống Sĩ, Đỏ lui Sĩ giữ nhà — Mã tiến, Xe lui chiếu, Xe tiến chiếu bí.',
      c: '<p>Đỏ <strong>Xe bình 6</strong>, Đen nâng Sĩ phòng thủ; <strong>Xe tiến ăn Sĩ</strong>, Tướng về giữa; <strong>Xe bình ăn Tượng</strong> trung lộ. Xe bình 6, Mã nhảy chiếu đẩy Tướng lên, Xe chạy ra biên rồi tiến chiếu. Mã lui về giữa, Xe bình 6 ép — Đen chống Sĩ, Đỏ <strong>lui Sĩ</strong> giữ nhà. Mã tiến chiếu, Xe lui chiếu, bình 4 — <strong>Xe tiến chiếu bí</strong>.</p><ul><li>Nếu sau khi Xe ăn Tượng, Đen chống Sĩ che: Mã nhảy chiếu, Xe ăn Sĩ chiếu; Đen dùng Xe Pháo quấy, Đỏ lui Tướng tránh, Mã lui – tiến, Xe lui về giữ — cuối cùng lui Tượng phòng thủ, Đỏ thắng.</li><li>Nếu Đen dùng Xe xuống chiếu thay vì bình Tướng: Đỏ lên Tướng, Xe bình 4 đuổi Tướng Đen, lui tiến Xe chiếu liên tục, Mã lui – tiến chiếu — Xe bình trung chiếu bí.</li></ul>',
      m: 'X2-6 S5.4 X6.1 Tg4-5 X6-5 Tg5-4 X5-6 Tg4-5 M8.7 Tg5.1 X6-1 Tg5-4 X1.1 Tg4/1 M7/5 Tg4-5 X1-6 S6.5 S4/5 S5.6 M5.7 Tg5-6 X6/1 Tg6.1 X6-4 Tg6-5 X4.1',
      k: { 3: 'Xe ăn Sĩ.', 5: 'Xe ăn Tượng.', 19: 'Lui Sĩ giữ nhà.', 27: 'Xe tiến chiếu bí.' },
      v: [
        { from: 'main', after: 5, m: 'S6.5 M8.6 Tg5-4 X5.1 X7/1 Tg4/1 X7-2 X5.1 Tg4.1 M6/5 X2/5 M5.4 Tg4.1 X5/1 X2-6 M4.5 X6/3 Tg4-5 X6-8 T5/3', k: { 1: 'Nếu chống Sĩ che…', 20: '…lui Tượng phòng thủ — Đỏ thắng.' } },
        { from: 'main', after: 21, m: 'X7/1 Tg4.1 P2/2 X6-4 Tg5-4 X4/1 Tg4.1 X4.1 Tg4/1 X4/3 Tg4.1 M7/6 X7/1 Tg4/1 P2.1 Tg4/1 B3-2 X4-6 X7-8 M6.8 Tg4-5 X6-5', k: { 1: 'Nếu Xe xuống chiếu…', 22: '…Xe bình trung chiếu bí.' } },
      ],
      kq: 'do',
    },
    {
      n: 6, h: 'p064_0', fen: '4k1b2/9/4b4/3N5/5R3/2Bp2B2/9/1p7/3KA4/1r3A3',
      s: 'Xe bình sang lộ 8, Mã tiến hai bước chiếu; Xe bình trung tiến chiếu, Mã lui – tiến đổi hướng — Xe lui, bình trung, Mã lui chiếu, Xe tiến chiếu thắng.',
      c: '<p>Đỏ <strong>Xe bình 8</strong>, Đen lui Tượng. Mã tiến 4, tiến 6 chiếu — Tướng Đen chạy sang lộ 6 rồi về giữa. <strong>Xe bình trung</strong>, Đen lên Tượng che; Xe tiến 2 rồi bình 6 chiếu. Mã lui 4, tiến 2 chiếu, Xe lui 3 rồi bình về trung lộ; Mã lui chiếu — <strong>Xe tiến chiếu</strong>, Đỏ thắng.</p><p>Nếu ở nước 3 Đen lên Tướng: Mã lui về trung chiếu, Mã tiến 3 chiếu, Xe bình 4 rồi bình 6 — Xe lui 1, Đỏ thắng.</p>',
      m: 'X4-8 T5/3 M6.4 Tg5-6 M4.6 Tg6-5 X8-5 T7.5 X5.2 Tg5-4 X5-6 Tg4-5 M6/4 Tg5-6 M4.2 Tg6-5 X6/3 T3.5 X6-5 Tg5.1 M2/3 Tg5/1 X5.3 Tg5-6 X5.1',
      k: { 25: 'Xe tiến chiếu.' },
      v: [
        { from: 'main', after: 5, m: 'Tg6.1 M6/5 Tg6-5 M5.3 Tg5/1 X8-4 Tg5-4 X4-6 Tg4-5 X6/1', k: { 1: 'Nếu Tướng lên…', 10: '…Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 7, h: 'p065_0', fen: '4k4/3Ncr3/4R4/9/9/9/9/9/3K5/9',
      s: 'Đen có Xe Pháo, Đỏ chỉ còn Xe Mã. Xe bình sang lộ 7; Đen tiến Xe chiếu hay tiến Pháo — Đỏ đều dùng Mã lui về trung, Xe tiến chiếu, Tướng Đỏ chiếm trung lộ — Xe chiếu thắng.',
      c: '<p>Hai bên lực lượng gần ngang nhau, nhưng Tướng Đen đã bị Mã và Xe kẹp. Đỏ <strong>Xe bình sang lộ 7</strong>. Đen có hai cách:</p><ul><li><strong>Xe tiến 7 chiếu</strong> (mạch chính): Đỏ lui Tướng; Đen bình Pháo, Mã lui về trung, Xe tiến chiếu, Mã tiến chiếu — Xe bình trung, <strong>Tướng Đỏ bình về giữa</strong> làm "quân thứ ba". Mã tiến chiếu, Xe lui, Xe bình 6 chiếu thắng.</li><li><strong>Pháo tiến 5</strong>: Mã lui về trung, Xe tiến chiếu, Mã tiến chiếu, Xe bình trung; Tướng Đỏ lên giữa, Mã tiến 6, Xe lui — Xe bình 4 chiếu bí. (Nếu Đen lên Tướng thay vì bình Tướng, Đỏ chỉ cần bình Tướng về giữa là thắng thế.)</li></ul>',
      m: 'X5-7 X6.7 Tg6/1 P5-7 M6/5 X6/5 X7.2 Tg5.1 M5.7 Tg5-6 X7-5 X6-4 Tg6-5 X4/1 M7.6 X4/1 X5/1 Tg6/1 X5-6',
      k: { 1: 'Xe sang lộ 7 — Đen có hai cách.', 13: 'Tướng Đỏ về trung lộ.', 19: 'Xe bình chiếu.' },
      v: [
        { from: 'main', after: 1, m: 'P5.5 M6/5 X6.2 X7.2 Tg5.1 M5.7 Tg5-6 X7-5 X6-4 Tg6-5 X4/1 M7.6 P5-4 X5/1 Tg6/1 X5-4', k: { 1: 'Pháo tiến 5.', 16: 'Xe bình chiếu bí.' } },
        { from: 0, after: 7, m: 'Tg5.1 Tg6-5', k: { 1: 'Nếu Tướng lên…', 2: '…Tướng Đỏ về giữa — Đỏ thắng thế.' } },
      ],
      kq: 'do',
    },
    {
      n: 8, h: 'p067_0', fen: '3ck4/9/9/4r4/9/6N2/9/5R3/9/5K3',
      s: 'Xe Mã đấu Xe Pháo. Mã tiến hai bước, Xe bình trung chiếu; Đen dùng Pháo che, Tướng Đỏ lên tham chiến. Xe Mã đổi vị nhiều lần, cuối cùng Xe bình chiếu thắng. Chỉ chắc thắng nếu Đen đi sai ở nước 2.',
      c: '<p>Đỏ <strong>Mã tiến 2</strong>, Đen lui Xe; Mã tiến 4, Đen bình Xe sang lộ 6. Xe Đỏ <strong>bình trung</strong>, Tướng Đen tránh; Xe tiến xuống áp sát, Đen dùng Pháo về giữa che. Tướng Đỏ lên, Xe bình 6 — Xe Pháo Đen chạy qua lại tìm cách thủ. Đỏ đưa Tướng sang lộ 6 làm chỗ dựa, Mã tiến 6, Xe lui – bình 3 – tiến 3 chiếu, Mã lui về trung, tiến 7, tiến 6; Tướng Đỏ về giữa — <strong>Xe bình 3</strong>, Đỏ thắng.</p><p><strong>Lưu ý:</strong> ở nước thứ 2, nếu Đen không bình Xe mà <strong>tiến Pháo 1</strong> thì Đỏ rất khó thắng. Thế này chỉ chắc thắng sau khi Đen đi nước 2 như mạch chính.</p>',
      m: 'M3.2 X5/2 M2.4 X5-6 X4-5 Tg5-6 X5.5 P4-5 Tg4.1 P5.1 X5-6 P5/1 Tg4-5 X6-5 Tg5-6 X5-6 M4.6 P5.1 X6-5 X6-7 X5/1 X7-6 X5-3 X6.1 X3.3 Tg6.1 M6/5 P5.1 X3-5 X6-8 M5.7 P5-4 M7.6 P4/1 Tg6-5 X8-6 X5-3',
      k: { 4: 'Đen bình Xe — sau nước này Đỏ mới chắc thắng.', 37: 'Xe bình chiếu.' },
      kq: 'do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
