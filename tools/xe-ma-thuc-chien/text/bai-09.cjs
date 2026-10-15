// Xe Mã Thực Chiến — Chương 2 · Bài 1: Xe Mã Sĩ đấu Xe đôi Sĩ. Thế cờ + nước đi theo sách; lời giảng viết lại.
// Cuộc 4 nhánh (B) sau thế phụ lục bỏ qua: sách in "Xe 8 tiến 7" không đi được, sửa cách nào cũng thành mất Xe.
module.exports = {
  bai: 9, ch: 2, ten: 'Xe Mã Sĩ Đấu Xe Đôi Sĩ', level: 'nang-cao',
  y: 'Chương 2 nghiên cứu các thế tàn cuộc Xe Mã "chuẩn" — hai bên còn Sĩ Tượng, Đen có Xe để phòng thủ. Xe Mã (thêm một Sĩ) đấu Xe đôi Sĩ là thế Đỏ thắng được nhưng rất dài: phải dùng Xe khống chế lộ, Mã quấn quanh cung, phá Sĩ hoặc ép Xe Đen rời vị trí. Bên Đen phòng thủ bằng cách giữ Xe ở hàng ngang của Tướng và dùng Xe chiếu quấy.',
  cuoc: [
    {
      n: 1, h: 'p088_0', fen: '5a1R1/3k5/N2a1r3/9/9/9/9/5A3/5K3/9',
      s: 'Xe lui rồi tiến chiếu, bình ra biên; Mã nhảy về lộ 7, Xe lui – tiến chiếu ép Tướng lên. Đen lui Sĩ hay tiến Sĩ — Đỏ đều dùng Mã đổi vị liên tục, Xe chiếu kết thúc.',
      c: '<p>Đỏ <strong>Xe lui 3</strong>, Tướng Đen về giữa; Xe tiến 2 chiếu, Tướng lui. Xe bình 8 rồi bình ra biên; Đen tiến Xe lên giữ. <strong>Mã tiến 7</strong>, Tướng Đen tránh sang lộ 4; Xe lui 1, Đen chống Sĩ; Xe tiến 2 chiếu, Tướng lên; Mã lui ra biên, Đen bình Xe sang lộ 3; Xe bình 2 — Đen có hai cách:</p><ul><li><strong>Sĩ lui 4</strong> (mạch chính): Xe lui 3, Mã lui – lui về lộ 6, Mã tiến trung, Mã tiến 3; Xe tiến chiếu, Mã tiến chiếu — Xe lui chiếu, Đỏ thắng.</li><li><strong>Sĩ tiến 6</strong>: Xe bình trung, Mã tiến 8, Xe bình qua lại; Đen đổi Sĩ phòng thủ, Đỏ tiến – lui Xe từng bước — cuối cùng Đỏ lui Sĩ về giữ nhà, thế thắng.</li></ul><p>Nếu ở nước 3 Đen tiến Xe 4 chiếu: Mã tiến 7, Xe lui chiếu, Tướng lên, Mã lui ra biên; Xe Đỏ tiến chiếu hai lần, bình trung — Mã lui về lộ 7, Đỏ thắng.</p>',
      m: 'X2/3 Tg4-5 X2.2 Tg5/1 X2-8 X6.1 X8-9 X6.3 M9.7 Tg5-4 X9/1 S6.5 X9.2 Tg4.1 M7/9 X6-3 X9-2 S5/4 X2/3 X3/6 M9/7 X3.2 M7/6 X3-2 M6.5 Tg4-5 M5.3 Tg5-4 X2.2 S4/5 M3.4 Tg4.1 X2/1',
      k: { 17: 'Xe bình 2 — Đen có hai cách.', 33: 'Xe lui chiếu.' },
      v: [
        { from: 'main', after: 17, m: 'S5.6 X2-5 S4/5 M9.8 Tg4.1 X5-3 X3-2 X3-7 Tg4-5 X7/2 S5.4 M8/9 X2-4 X7.1 S6/5 X7/3 S5/4 X7-5 Tg5-6 X5-4 Tg6-5 S4/5', k: { 1: 'Sĩ tiến 6.', 22: 'Lui Sĩ giữ nhà — Đỏ thắng thế.' } },
        { from: 'main', after: 5, m: 'X6.4 M9.7 Tg5-4 X8/1 Tg4.1 M7/9 X6/4 X8.1 Tg4/1 X8.1 Tg4.1 X8-5 S4/5 M9/7', k: { 1: 'Nếu Xe tiến 4 chiếu…', 14: '…Mã lui — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 2, h: 'p090_0', fen: '5a1R1/3ka4/N8/5r3/9/9/9/5A3/5K3/9',
      s: 'Xe lui bình về lộ 6, Đen bình Xe đối; Xe chuyển sang lộ 7, bình trung chiếu, tiến chiếu; Mã tiến – Xe lui, Tướng Đỏ bình về giữa — Xe lui bắt Xe Đen, Đỏ thắng.',
      c: '<p>Đỏ <strong>Xe lui 4</strong>, Đen chống Sĩ; Xe bình 6 dọa, Đen bình Xe sang lộ 2. Xe bình 7, bình trung đuổi Tướng; <strong>Xe tiến 4 chiếu</strong>, Đen lui Sĩ. Xe bình 7, Đen lui Xe; <strong>Mã tiến 8</strong>, Xe lui 1, Tướng Đen lên; <strong>Tướng Đỏ bình về giữa</strong> — Đen lui Xe chặn, Xe Đỏ lui 7 bắt Xe, Đỏ thắng.</p><p>Nếu ở nước 2 Đen chống Sĩ thay vì bình Xe: Xe bình 7, Sĩ tiến 6, Mã lui về lộ 7 — Mã tiến 8, Đen bình Xe chặn, Xe ăn Xe.</p>',
      m: 'X2/4 S5.4 X2-6 X6-2 X6-7 Tg4-5 X7-5 Tg5-4 X5.4 S4/5 X5-7 X2/1 M9.8 S5/4 X7/1 Tg4.1 Tg4-5 X2/2 X7/7',
      k: { 17: 'Tướng Đỏ về trung lộ.', 19: 'Xe lui — Đỏ thắng.' },
      v: [
        { from: 'main', after: 3, m: 'S6.5 X6-7 S5.6 M9/7 Tg4-5 M7.8 X6-4 X7-4', k: { 1: 'Nếu chống Sĩ…', 8: '…Xe ăn Xe — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 3, h: 'p091_0', fen: '3k5/4a4/N2a3R1/5r3/9/9/9/5A3/5K3/9',
      s: 'Mã tiến 7 — Đen có tới bảy cách đáp (tiến Sĩ, lên Tướng, bình Xe ba hướng, lui Xe, tiến Xe). Mỗi cách Đỏ có một kế hoạch riêng; cách khó nhất là Sĩ tiến 6, Đỏ phải cho Tướng mình tham chiến.',
      c: '<p>Đỏ <strong>Mã tiến 7</strong> khống chế các ô quanh cung. Đen có bảy cách:</p><ul><li><strong>Sĩ tiến 6</strong> (mạch chính): Xe tiến chiếu, bình trung; Đen dùng Xe chiếu dài, Tướng Đỏ lui – bình né. Xe lui hai lần ép Sĩ, bình 8 khống chế; Mã lui ra biên, về lộ 8, tiến 6 — Tướng Đỏ lên rồi bình về giữa, Đỏ thắng.</li><li><strong>Tướng tiến 1</strong>: Xe lui 2 — Đen tiến Sĩ thì Xe bình trung, Mã lui, Xe bình 7 thắng; Đen bình Xe sang lộ 3 thì Mã lui – tiến, Xe bình 8, Tướng Đỏ về giữa, Mã lui – tiến chiếu — Đỏ thắng.</li><li><strong>Xe bình 3</strong>: Xe tiến chiếu, Mã lui, Đen tiến Xe chiếu, Tướng Đỏ lui – bình về giữa — Đỏ thắng.</li><li><strong>Xe bình 1</strong>: Xe tiến chiếu, bình 8 lui về, Mã lui ra biên; Xe tiến chiếu hai lần — Xe bình trung, Đỏ thắng.</li><li><strong>Xe lui 1</strong>, <strong>Xe lui 2</strong>, <strong>Xe tiến 3</strong>: Xe lui 1 ép Sĩ, Mã lui về lộ 6 hoặc lộ 8, Xe bình chiếu — Đỏ đều thắng nhanh.</li></ul>',
      m: 'M9.7 S5.6 X2.2 Tg4.1 X2-5 X6-1 Tg4-5 X1.5 Tg5/1 X1/5 X5/2 S6/5 X5/2 S5.6 X5-8 X1-5 Tg5-6 Tg4-5 X8-6 X5-3 M7/9 X3/1 M9/8 X3-2 M8.6 X2.7 Tg6.1 Tg5-6 M6.4 Tg6.1 Tg6-5',
      k: { 1: 'Mã tiến 7 — Đen có bảy cách.', 31: 'Tướng Đỏ về giữa — Đỏ thắng.' },
      v: [
        { from: 'main', after: 1, m: 'Tg4.1 X2/2 S5.6 X2-5 S6/5 M7/9 Tg4/1 X5-7', k: { 1: 'Tướng tiến 1, Xe lui 2 — rồi Sĩ tiến 6.', 8: 'Xe bình 7 — Đỏ thắng.' } },
        { from: 'main', after: 1, m: 'Tg4.1 X2/2 X6-3 M7/9 X3/1 M9.8 X3/2 X2-8 Tg4/1 Tg4-5 Tg4-5 M8/7 X3-1 X8-3 X1.8 Tg5/1 Tg5-6 M7.6', k: { 1: 'Tướng tiến 1, Xe lui 2 — rồi Xe bình 3.', 18: 'Mã tiến chiếu — Đỏ thắng.' } },
        { from: 'main', after: 1, m: 'X6-3 X2.2 Tg4.1 M7/9 X3.5 Tg4/1 S5.6 Tg4-5', k: { 1: 'Xe bình 3.', 8: 'Tướng Đỏ về giữa — Đỏ thắng.' } },
        { from: 'main', after: 1, m: 'X6-1 X2.2 Tg4.1 X2-8 S5.6 X8/2 X1-5 M7/9 X5-4 X8.1 Tg4/1 X8.1 Tg4.1 X8-5', k: { 1: 'Xe bình 1.', 14: 'Xe bình trung — Đỏ thắng.' } },
        { from: 'main', after: 1, m: 'X6/1 X2/1 S5/6 X2-8 S4/5 X8.3 Tg4.1 M7/6 X6-4 M6/8', k: { 1: 'Xe lui 1.', 10: 'Mã lui — Đỏ thắng.' } },
        { from: 'main', after: 1, m: 'X6/2 X2/1 S5/6 M7/8 X6.1 X2-7 Tg4-5 X7.1', k: { 1: 'Xe lui 2.', 8: 'Xe tiến chiếu — Đỏ thắng.' } },
        { from: 'main', after: 1, m: 'X6.3 X2/1 S5.6 X2.3 Tg4.1 X2-5 S4/5 M7/9 X6-3 M9.8 Tg4.1 X5-3', k: { 1: 'Xe tiến 3.', 12: 'Xe bình 3 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 4, h: 'p095_0', fen: '4k4/4a4/3a5/4r4/1N4R2/9/9/5A3/5K3/9',
      s: 'Xe tiến 4 ép Sĩ, Mã nhảy biên rồi vào lộ 7; Xe lui – bình ra lộ 8, tiến chiếu, Mã lui về lộ 8. Đen có ba cách: bình Tướng về giữa, lui Sĩ, hay tiến Xe — Đỏ đều thắng, có nhánh rất dài.',
      c: '<p>Đỏ <strong>Xe tiến 4</strong>, Đen lui Sĩ; Mã nhảy ra biên rồi tiến 7, Tướng Đen sang lộ 4. Xe lui 4, Đen chống Sĩ; Xe bình 8, Đen bình Xe sang lộ 3; Xe tiến 4 chiếu, Tướng lên; Mã lui ra biên, Mã lui 8, Xe lui 2. Đen có ba cách:</p><ul><li><strong>Tướng bình 5</strong> (mạch chính): Mã tiến biên, Xe lui – tiến chiếu ép Tướng, Xe bình 4 — Xe lui 2, Đỏ thắng.</li><li><strong>Sĩ lui 5</strong>: cuộc dài — Đen dùng Xe chiếu liên tục, Tướng Đỏ lên xuống né; Xe Đỏ ra biên, Mã quấn từ lộ 7 sang lộ 9 rồi trở lại; Tướng Đỏ bình về giữa làm chỗ dựa; Mã lui 6, tiến 4, tiến 2 bắt Xe — Đỏ thắng.</li><li><strong>Xe tiến 4</strong>: Tướng Đỏ lên xuống né chiếu, Mã nhảy biên — thế cờ còn phức tạp, Đen có thêm ba cách: lui Sĩ (Mã lui 7, Tướng Đỏ về giữa, Xe lui 3 – tiến 2, Mã tiến 9, tiến 7 — Xe bình 6, Mã tiến chiếu thắng), hoặc lui Xe 4 (Tướng Đỏ về giữa rồi lên xuống, Mã tiến 8, lui 7 — Xe tiến 1, Mã tiến 8 thắng).</li></ul><p>Nếu ở nước 4 Đen lên Tướng thay vì chống Sĩ: Mã lui biên, Xe bình 6 – bình 7, Tướng Đen về giữa, Xe bình trung chiếu — Xe tiến 4, Đỏ thắng thế.</p>',
      m: 'X3.4 S5/6 M8.9 S4/5 M9.7 Tg5-4 X3/4 S5.4 X3-8 X5-3 X8.4 Tg4.1 M7/9 X3/1 M9/8 X3.2 X8/2 Tg4-5 M8.9 Tg5.1 X8/1 Tg5/1 X8.2 Tg5.1 X8-4 S4/5 X4/2',
      k: { 17: 'Xe lui 2 — Đen có ba cách.', 27: 'Xe lui 2 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 7, m: 'Tg4.1 M7/9 X5-2 X3-6 S5.4 X6-7 Tg4-5 X7-5 Tg5-4 X5.4', k: { 1: 'Nếu Tướng lên…', 10: '…Xe tiến 4 — Đỏ thắng thế.' } },
        { from: 'main', after: 17, m: 'S4/5 M8.7 X3/1 Tg4-5 X3.5 Tg5/1 X3/5 X8-9 X3.6 Tg5.1 X3/1 Tg5/1 X3/5 X9.1 Tg4.1 M7/9 X3-5 Tg5-4 Tg4-5 M9.7 X5-4 X9/1 S5.4 X9/2 S4/5 X9-5 Tg5-6 Tg4-5 X4-6 M7/6 X6.4 X5.1 Tg6/1 M6.4 X6-7 M4.2 X7/5 X5-4 S5.6 X4-3', k: { 1: 'Sĩ lui 5.', 40: 'Xe bình 3 — Đỏ thắng.' } },
        { from: 'main', after: 17, m: 'X3.4 Tg4/1 X3.1 Tg4.1 X3/5 M8.9 S4/5 X8/1 Tg4/1 M9/7 Tg4-5 Tg4-5 X3-4 X8/3 X4/2 X8.2 X4.1 M7.9 X4-5 Tg5-6 S5.4 M9.7 Tg5.1 X8-6 X5-3 M7/9 X3/1 M9/8 X3-2 M8.6 X2-3 M6.4 Tg5-6 M4.2', k: { 1: 'Xe tiến 4.', 6: 'Thế phức tạp — Đen có ba cách. Sĩ lui 5.', 34: 'Mã tiến 2 — Đỏ thắng.' } },
        { from: 2, after: 33, m: 'X4.4 M7.9 X4-5 Tg5-6 S5.6 M9.7 Tg5.1 M7/6 Tg5-6 X8-2 S6.5 M6/4 X5-4 Tg6-5', k: { 1: 'Nếu Xe tiến 4…', 14: '…Tướng Đỏ về giữa — Đỏ thắng.' } },
        { from: 2, after: 23, m: 'X3/4 Tg4-5 X3.8 Tg5/1 X3.1 Tg5.1 X3/9 M9.8 S4/5 M8/7 X3-1 X8.1 Tg4.1 M7.8', k: { 1: 'Xe lui 4.', 14: 'Mã tiến 8 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 5, h: '!p100_0', fen: '3aka3/9/9/2N6/5r3/2R6/9/4B4/4K4/9',
      s: 'Ở đây Đỏ có Tượng thay Sĩ. Mã tiến trung rồi tiến 7, Xe bình 3, Mã lui 8 — Đen bình Xe, tiến Xe hay chống Sĩ; Đỏ đều dùng Xe bình 6 khóa, Mã quấn quanh cung, Xe bình trung chiếu thắng.',
      c: '<p>Đỏ <strong>Mã tiến trung</strong>, Đen lui Xe; Mã tiến 7, Tướng Đen lên; Xe bình 3, Tướng Đen sang lộ 4; Mã lui 8. Đen có ba cách:</p><ul><li><strong>Xe bình 2</strong> (mạch chính): Xe bình 6 chiếu, Tướng về giữa; Mã tiến 6, Đen bình Xe sang lộ 3; Tướng Đỏ bình 6, Mã lui về giữa, Mã lui 3 — Xe bình trung chiếu, Đỏ thắng.</li><li><strong>Xe tiến 1</strong>: Xe bình 6, Mã tiến 7, lui 6, Xe bình trung, Mã tiến 4; Đen tiến Xe chiếu, Tướng Đỏ lui — Tượng tiến 7 che, Đỏ thắng.</li><li><strong>Chống Sĩ</strong>: cuộc dài — Xe bình 6, bình 7, Mã lui biên, Xe tiến 4 – tiến 1 chiếu; Tượng lui che, Tướng Đỏ lui; Xe lui chiếu hai lần, Mã tiến 8, Xe bình 8 tiến chiếu — Mã tiến 7, Đỏ thắng. (Đen đổi Sĩ khác thì Mã lui biên, Xe tiến chiếu, Mã tiến 7 rồi lui 6 — Đỏ thắng.)</li></ul>',
      m: 'M7.5 X6/2 M5.7 Tg5.1 X7-3 Tg5-4 M7/8 X6-2 X3-6 Tg4-5 M8.6 X2-3 Tg5-6 Tg5.1 M6/5 X3/2 M5/3 Tg5/1 X6-5',
      k: { 7: 'Mã lui 8 — Đen có ba cách.', 19: 'Xe bình trung chiếu.' },
      v: [
        { from: 'main', after: 7, m: 'X6.1 X3-6 Tg4-5 M8.7 X6-3 M7/6 Tg5.1 X6-5 Tg5-4 M6.4 X3.5 Tg5/1 S4.5 T5.7', k: { 1: 'Xe tiến 1.', 14: 'Tượng tiến che — Đỏ thắng.' } },
        { from: 'main', after: 7, m: 'S4.5 X3-6 S5.4 X6-7 S4/5 M8/9 X6-2 X7.4 Tg4/1 X7.1 Tg4.1 M9.7 X2.1 T5/7 X2.5 Tg5/1 X2/5 X7/1 Tg4/1 X7/1 X2/3 M7.8 Tg4-5 X7.1 X2-4 X7-8 X4.6 X8.1 X4/6 M8.7', k: { 1: 'Chống Sĩ.', 30: 'Mã tiến 7 — Đỏ thắng (chiếu hết sau vài nước).' } },
        { from: 1, after: 11, m: 'S6.5 M8/9 X6.1 X7.4 Tg4/1 X7.1 Tg4.1 M9.7 X6-2 T5/7 X2.5 Tg5/1 X2/5 X7/1 Tg4/1 X7/1 X2/3 M7.6', k: { 1: 'Nếu đổi Sĩ khác…', 18: '…Mã lui 6 — Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 6, h: 'p102_0', fen: '3aka3/9/9/2N6/9/2R6/6r2/4B4/4K4/9',
      s: 'Mã tiến trung, Xe tiến 3; Đen tiến Xe chiếu, Tướng Đỏ lui – bình né, Xe chuyển sang lộ 6, Mã nhảy 3 rồi lui biên — Xe bình 3 bắt Sĩ, Đỏ thắng.',
      c: '<p>Đỏ <strong>Mã tiến trung</strong>, Đen lui Xe; <strong>Xe tiến 3</strong>, Đen tiến Xe chiếu; Tướng Đỏ lui, Tướng Đen lên. Tướng Đỏ bình 6, Đen bình Xe sang lộ 2; Xe bình 6, Đen lui Xe; Mã tiến 3, Tướng Đen sang lộ 6; Mã lui biên, Đen chống Sĩ — <strong>Xe bình 3</strong>, Đỏ thắng.</p><p>Nếu ở nước 3 Đen bình Xe sang lộ 6 chặn: Mã tiến 7, Tướng lên, Xe bình 6, Đen bình Xe sang lộ 3 — Mã lui 6, Đỏ ăn được Sĩ, thế thắng.</p>',
      m: 'M7.5 X7/4 X7.3 X7.6 Tg5/1 Tg5.1 Tg5-6 X7-2 X7-6 X2/3 M5.3 Tg5-6 M3/1 S6.5 X6-3',
      k: { 15: 'Xe bình 3 — Đỏ thắng.' },
      v: [
        { from: 'main', after: 5, m: 'X7-6 M5.7 Tg5.1 X7-6 X6-3 M7/6', k: { 1: 'Nếu Xe bình 6…', 6: '…Mã lui — Đỏ ăn Sĩ, thế thắng.' } },
      ],
      kq: 'do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
