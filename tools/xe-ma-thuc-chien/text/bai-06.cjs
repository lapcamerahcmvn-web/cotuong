// Xe Mã Thực Chiến — Chương 1 · Bài 6: Xe Mã khéo thắng Xe đôi Tốt. Thế cờ + nước đi theo sách; lời giảng viết lại.
// Cuộc 1 trong sách bỏ qua: chuỗi nước in sai nhiều chỗ (Xe lui đè lên Tướng mình, Mã "nhảy" từ lộ không có Mã),
// không khôi phục được một đường đi chắc chắn đúng.
// Cuộc 7 (p057): Tượng Đỏ trên sơ đồ vẽ lệch giữa hai đường (không phải điểm Tượng hợp lệ) — đặt ở giữa sân Tượng (hàng 7, lộ 5):
// đó là điểm canh ô đáy mà Xe Đen định chiếu; engine xác nhận có Tượng ở đây thì Đen thua, không có thì thế cờ chỉ hơn ít.
module.exports = {
  bai: 6, ch: 1, ten: 'Xe Mã Khéo Thắng Xe Đôi Tốt', level: 'nang-cao',
  y: 'Cùng là Xe Mã đấu Xe hai Tốt, nhưng các thế ở bài này khó hơn: Tướng Đỏ bị Xe Tốt quấy, đôi khi phải tự tay đi Tướng nhiều nước, hoặc phải kiên nhẫn đổi vị Xe Mã qua lại mới tìm ra đòn kết thúc. Chú ý cách Xe Đỏ ăn Tốt đúng lúc để giảm phản kích, và cách Mã đi vòng để vừa chiếu vừa chặn đường Xe Đen.',
  cuoc: [
    {
      n: 1, h: 'p048_0', fen: '9/4k1N2/9/3R5/9/9/9/7p1/2p1r4/5K3',
      s: 'Mã lui chiếu; Đen bình Tướng ra lộ 6 hay lui Tướng — Đỏ đều dùng Xe khóa lộ, Mã đi vòng quanh cung chiếu liên tục rồi Mã tiến chiếu kết thúc.',
      c: '<p>Đỏ <strong>Mã lui chiếu</strong>. Đen có hai cách:</p><ul><li><strong>Tướng bình 6</strong> (mạch chính): Xe lui 2 rồi bình về lộ 4; Đen lui Xe lên phòng thủ. Mã nhảy sang lộ 2, Xe tiến chiếu, Mã tiến chiếu; Xe lui về giữ, Mã lui về trung lộ rồi về lộ 3. Khi Đen bình Xe sang lộ 4 chặn, Mã tiến – lui liên tục, <strong>Xe tiến 4</strong> — Mã tiến chiếu, Đỏ thắng.</li><li><strong>Tướng lui 1</strong>: Mã tiến 6, Mã lui về lộ 8, Xe bình 4 khóa; Đen bình Xe che. Mã nhảy ra biên, Xe tiến chiếu, Mã lui chiếu — Đen phải dùng Xe chặn chân Mã, Xe Đỏ lui về: Xe Đen bị ghim, Đỏ thắng quân.</li></ul>',
      m: 'M3/4 Tg5-6 X6/2 Tg6.1 X6-4 X5/5 M4.2 Tg6-5 X4.3 Tg5/1 M2.3 Tg5-4 X4/3 Tg4.1 M3/5 Tg4/1 M5/3 X5-4 M3.4 Tg4/1 M4/5 Tg4.1 X4.4 Tg4.1 M5.4',
      k: { 1: 'Mã lui chiếu — Đen có hai cách.', 25: 'Mã tiến chiếu.' },
      v: [
        { from: 'main', after: 1, m: 'Tg5/1 M4.6 Tg5-4 M6/8 Tg4-5 X6-4 X5-4 M8.9 B8-7 X4.3 Tg5.1 M9/7 X4/6 X4/2', k: { 1: 'Tướng lui 1.', 14: 'Xe lui — Xe Đen bị ghim.' } },
      ],
      kq: 'do',
    },
    {
      n: 2, h: 'p050_0', fen: '9/4k4/N8/9/9/6R2/9/6p2/2pr5/5K3',
      s: 'Thế dài: Tướng Đỏ tự lên ba bước né Xe Tốt quấy, Xe ăn Tốt; Đen dùng Xe chạy dọc tìm phản kích bằng ba cách — Đỏ đều phối hợp Xe Mã chiếu bí.',
      c: '<p>Đỏ <strong>Xe bình trung chiếu</strong>, Mã nhảy lên áp sát. Đen dùng Xe và hai Tốt quấy Tướng Đỏ; Đỏ không vội, <strong>tự đi Tướng</strong> lên – sang từng bước tránh chiếu, Xe tiến xuống rồi <strong>lui ăn Tốt</strong>. Đen chỉ còn Xe chạy dọc đường giữa; Xe Đỏ lui 1 chờ — Đen có ba cách:</p><ul><li><strong>Xe tiến 6</strong> (mạch chính): Mã lui ra biên, Xe tiến chiếu, Mã quay về — Xe tiến chiếu, Mã lui chiếu bí.</li><li><strong>Xe tiến 3</strong>: Xe bình ra biên chiếu, Mã lui – lui chiếu liên tục — Mã tiến chiếu thắng.</li><li><strong>Xe bình 9</strong>: Xe Đỏ cũng bình ra biên; Đen tiến Xe chiếu, Đỏ lui Tướng. Mã lui, Mã lui về trung, Mã tiến hai bước chiếu — Xe bình trung chiếu bí.</li></ul>',
      m: 'X3-5 Tg5-4 M9.8 Tg4.1 X5-3 X4.1 Tg4.1 B7.1 Tg4-5 B3-4 Tg5.1 X4-5 Tg5-4 X5/1 X3.3 X5/6 X3/6 X5.6 X3.6 X5/6 X3/1 X5.6 M8/9 Tg4/1 X3.2 Tg4/1 M9.8 X5/6 X3.1 X5/2 M8/7',
      k: { 17: 'Xe lui ăn Tốt.', 21: 'Xe lui 1 chờ — Đen có ba cách.', 31: 'Mã lui chiếu.' },
      v: [
        { from: 'main', after: 21, m: 'X5.3 X3-9 Tg4-5 X9.1 Tg5/1 M8/7 Tg5.1 M7/8 Tg5/1 M8.6', k: { 1: 'Xe tiến 3.', 10: 'Mã tiến chiếu.' } },
        { from: 'main', after: 21, m: 'X5-9 X3-9 X9.5 Tg4/1 Tg4-5 X9.1 Tg5/1 M8/7 Tg5.1 M7/5 Tg5/1 M5.3 Tg5-4 M3.4 Tg4-5 X9-5', k: { 1: 'Xe bình 9.', 16: 'Xe bình trung chiếu bí.' } },
      ],
      kq: 'do',
    },
    {
      n: 3, h: 'p052_0', fen: '9/9/5k3/3R5/7N1/9/4r4/1p2p4/3K5/9',
      s: 'Tướng Đỏ lui tránh, Xe đánh vào trung lộ ép Tướng Đen; Đen dùng Xe chiếu quấy, Đỏ lên xuống Tướng né — Mã chuyển ba bước về lộ 7 rồi tiến chiếu thắng.',
      c: '<p>Đỏ <strong>Mã nhảy ra biên</strong>, Đen tiến Tốt sát Tướng Đỏ, Đỏ <strong>lui Tướng</strong>. Xe bình 4 rồi bình trung đuổi Tướng Đen sang lộ 6; Xe lui về chặn, Đen dùng Xe chiếu – lui liên tục. Mã tiến về lộ 2, Xe bình sang lộ 2 tiến xuống đáy; Mã lui về lộ 3, về trung, rồi tiến sang lộ 7. Đen lại chiếu, Đỏ chỉ việc đi Tướng né — cuối cùng <strong>Mã tiến chiếu</strong>, Đỏ thắng.</p>',
      m: 'M2.1 B5.1 Tg6/1 X5-7 X6-4 Tg6-5 X4-5 Tg5-6 X5/5 X7.3 Tg6.1 X7/7 M1.2 X7/2 X5-2 Tg6-5 X2.6 Tg5/1 M2/3 Tg5/1 M3/5 Tg5.1 M5.7 Tg5-6 X2/1 Tg6/1 Tg6-5 X7.8 Tg5/1 X7-6 M7.6',
      k: { 31: 'Mã tiến chiếu.' },
      kq: 'do',
    },
    {
      n: 4, h: 'p053_0', fen: '4k4/9/9/9/2p2N3/9/5R3/5K3/3pr4/9',
      s: 'Mã nhảy sang cánh, Tướng Đỏ lui hai bước né Xe Tốt; Đen bình Tướng hay lên Tướng — Xe Mã đổi vị liên tục, cuối cùng Mã lui khóa ô thoát, Xe tiến xuống đáy chiếu bí.',
      c: '<p>Đỏ <strong>Mã tiến sang lộ 2</strong>; Đen dùng Xe và Tốt chiếu, Đỏ <strong>lui Tướng hai bước</strong>. Đen có hai cách:</p><ul><li><strong>Tướng bình 4</strong> (mạch chính): Xe bình 6 chiếu, Mã tiến – lui – tiến chiếu liên tục, Xe bình qua lại theo Tướng Đen. Khi Mã <strong>lui về lộ 7</strong>, Mã vừa canh ô bên cạnh vừa canh ô phía trên Tướng Đen; Tướng lui xuống đáy thì <strong>Xe tiến 6 xuống đáy chiếu bí</strong> — Xe được Mã bảo vệ, Tướng Đen không còn ô nào thoát.</li><li><strong>Tướng tiến 1</strong>: Xe tiến chiếu, lui về, bình 6 chiếu; Mã tiến – lui liên tục chiếu dồn Tướng. Đen bình Xe về lộ 4 chặn, Mã nhảy chiếu, Đen dùng Xe chặn chân Mã — Xe Đỏ tiến 1, Xe Đen bị ghim, Đỏ thắng.</li></ul>',
      m: 'M4.2 X5/1 Tg4/1 B4-5 Tg4/1 Tg5-4 X4-6 Tg4-5 M2.3 Tg5.1 M3/4 Tg5/1 M4.6 Tg5.1 X6-4 Tg5-4 M6.8 Tg4-5 M8.6 Tg5-4 X4-6 Tg4-5 M6/7 Tg5/1 X6.6',
      k: { 5: 'Tướng Đỏ lui — Đen có hai cách.', 23: 'Mã lui về lộ 7, khống chế hai ô quanh Tướng.', 25: 'Xe tiến xuống đáy chiếu bí.' },
      v: [
        { from: 'main', after: 5, m: 'Tg5.1 X4.5 Tg5/1 X4/2 Tg5-4 X4-6 Tg4-5 M2.4 Tg5.1 X6-4 Tg5.1 M4.3 Tg5-4 M3/5 Tg4/1 M5/3 X5-4 M3/5 Tg4-5 M5.7 X4/5 X4.1', k: { 1: 'Tướng tiến 1.', 20: 'Mã nhảy chiếu.', 22: 'Xe tiến 1 — Xe Đen bị ghim.' } },
      ],
      kq: 'do',
    },
    {
      n: 5, h: '!p055_0', fen: '4k1b2/9/4b4/3N1R3/9/9/3p5/4B4/4rp3/3K2B2',
      s: 'Đen còn đôi Tượng giữ cung. Mã tiến chiếu, Xe bình sang cánh tiến chiếu rồi lui về; Xe bình chiếu dồn Tướng sang lộ 6, Mã lui hai bước — Mã tiến chiếu bí.',
      c: '<p>Thế này Đen có thêm <strong>đôi Tượng</strong>, nhưng Tượng không giữ được các điểm Mã chiếu. Đỏ <strong>Mã tiến chiếu</strong>, Tướng Đen lên. Xe bình sang lộ 2, tiến chiếu rồi lui về tuyến giữa; Xe bình 4 chiếu, bình 6 đuổi — Tướng Đen bị dồn sang lộ 6. <strong>Mã lui</strong> hai bước vòng về lộ 4, rồi <strong>Mã tiến chiếu</strong> — Đỏ thắng.</p>',
      m: 'M6.7 Tg5.1 X4-2 Tg5-6 X2.2 Tg6/1 X2/5 Tg6.1 X2-4 Tg6-5 X4-6 Tg5-6 M7/6 Tg6/1 M6/4 Tg6-5 M4.3',
      k: { 17: 'Mã tiến chiếu.' },
      kq: 'do',
    },
    {
      n: 6, h: 'p056_0', fen: '4k4/9/9/5N3/9/9/3R2pp1/9/4r4/5K3',
      s: 'Mã tiến chiếu, Xe chuyển sang lộ 8 tiến chiếu rồi lui; Mã lui – tiến đổi vị, Xe bình sang lộ 2 rồi về lộ 6 — Xe tiến chiếu thắng.',
      c: '<p>Đỏ <strong>Mã tiến chiếu</strong>, Tướng Đen lên. <strong>Xe bình sang lộ 8</strong>, tiến chiếu, lui về rồi bình 6 chiếu — Tướng Đen chạy qua lại. Mã lui về lộ 4, Xe bình sang lộ 2; Mã lui về lộ 6 rồi <strong>tiến lên lộ 7</strong> chiếu, Tướng Đen bị đẩy lên cao. <strong>Xe bình 6</strong>, Tướng về giữa — <strong>Xe tiến chiếu</strong>, Đỏ thắng.</p>',
      m: 'M4.3 Tg5.1 X6-8 Tg5-4 X8.5 Tg4/1 X8/4 Tg4.1 X8-6 Tg4-5 M3/4 Tg5/1 X6-2 Tg5-4 M4/6 Tg4.1 M6.7 Tg4.1 X2-6 Tg4-5 X6.4',
      k: { 21: 'Xe tiến chiếu.' },
      kq: 'do',
    },
    {
      n: 7, h: 'p057_0', fen: '2Nk5/9/9/9/9/5R3/5p3/4B4/3p2r2/5K3',
      s: 'Xe tiến chiếu, lui ăn Tốt rồi lại tiến chiếu; Mã lui hai bước về giữa, Xe lui chiếu, Mã tiến chiếu — Xe bình chiếu bí. Tượng Đỏ giữ điểm Xe Đen định chiếu.',
      c: '<p>Đỏ <strong>Xe tiến chiếu</strong>, Tướng Đen lên; <strong>Xe lui ăn Tốt</strong> rồi lại tiến chiếu. Lưu ý Tượng Đỏ ở giữa: nó canh điểm dưới đáy mà Xe Đen muốn xuống chiếu, nên Đỏ yên tâm dùng Xe đi ăn Tốt.</p><p>Mã lui hai bước vào giữa, Xe lui 1 chiếu, Mã tiến chiếu, Xe lui chiếu, Mã tiến chiếu — Tướng Đen bị dồn vào lộ 4, <strong>Xe bình 6 chiếu bí</strong>.</p>',
      m: 'X4.5 Tg4.1 X4/6 Tg4/1 X4.6 Tg4.1 M7/8 Tg4-5 M8/6 Tg5-4 X4/1 Tg4.1 M6.8 Tg4-5 X4/1 Tg5/1 M8.7 Tg5-4 X4-6',
      k: { 3: 'Xe lui ăn Tốt — Tượng canh điểm chiếu đáy.', 19: 'Xe bình chiếu bí.' },
      kq: 'do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
