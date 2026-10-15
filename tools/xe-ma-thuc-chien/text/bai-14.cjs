// Xe Mã Thực Chiến — Chương 2 · Bài 6: Một số thế Xe Mã hòa cờ. Thế cờ + nước đi theo sách; lời giảng viết lại.
// Cuộc 1 (hình 86) bỏ qua: nước đầu "Mã 5 tiến 6" để Sĩ Đen ăn ngay Mã, cuối mạch engine chấm Đen hơn hẳn — không phải thế hòa.
// Cuộc 5 trong sách (hình 90) bỏ qua: mạch in "Xe 6 thoái 7" bị Pháo Đen chặn đường, engine chấm thế trước đó Đỏ thua —
// không khôi phục được đường hòa đúng.
module.exports = {
  bai: 14, ch: 2, ten: 'Thế Xe Mã Hòa Cờ', level: 'nang-cao',
  y: 'Không phải thế Xe Mã nào cũng thắng. Bài này gom các thế hòa: bên có Xe Mã bị đối phương giữ chặt (Xe Pháo phòng thủ đủ quân, Tốt Đen đã áp sát Tướng, hoặc chính bên kia có Xe Mã để chống đỡ hai Xe). Học các thế này để biết khi nào nên ép thắng, khi nào nên chủ động giữ hòa — và nhận ra những nước đi sai biến thế hòa thành thua.',
  cuoc: [
    {
      n: 1, h: 'p141_0', fen: '6b2/3ka4/2N6/9/9/1R7/9/3pB3B/4Ap2r/3AK4',
      s: 'Hai Tốt Đen đã sát cung, Xe Đen ở hàng 8. Đỏ lui Sĩ, Xe tiến chiếu, Mã lui; Tướng Đỏ phải lên tránh Tốt — Xe Đen bám sát Tướng Đỏ, Đỏ không có thời gian tấn công — hòa.',
      c: '<p>Đỏ <strong>lui Sĩ</strong>, Đen tiến Tốt sát cung. Xe tiến 4 chiếu, Tướng Đen lên; Mã lui 6, Tốt Đen tiến tiếp; Tướng Đỏ bình 6 tránh. Xe Đỏ lui về rồi bình qua lại chiếu; Xe Đen bám theo, chiếu ngược Tướng Đỏ. Đỏ lên Tượng, lên Tướng — Xe Đen vẫn đuổi được — <strong>hòa</strong>.</p>',
      m: 'S5/4 B4.1 X8.4 Tg4.1 M7/6 B4.1 Tg5-6 B6.1 X8/2 X9-5 X8-6 Tg4-5 X6-4 Tg5-4 X4/6 X5/1 X4.5 Tg4/1 T1.3 X5/4 Tg6.1 X5-3 X4/1 X3-4 X4.1 X4-3 Tg6-5 X3.1',
      kq: 'hoa',
    },
    {
      n: 2, h: '!p142_0', fen: '1R1ak1b2/9/6r1b/9/5n3/9/9/R8/4A4/4KA3',
      s: 'Lần này Đen là bên có Xe Mã (đủ Sĩ Tượng), Đỏ có hai Xe. Xe Đỏ chiếu dồn, ăn Sĩ — Đen dùng Mã về giữ trung lộ, Xe chạy đổi hướng; Đỏ không phá được — hòa.',
      c: '<p>Đây là thế ngược: <strong>Đen giữ hòa bằng Xe Mã</strong> trước hai Xe Đỏ. Đỏ bình Xe sang lộ 6, Đen lui Mã về trung; Đỏ lui Sĩ, Tướng Đen sang lộ 6. Xe tiến 6, Đen tiến Xe; Xe bình trung ăn Sĩ, Xe Đen bình 4; Xe bình 2, Tướng Đen về giữa. Đỏ lui Xe, đưa Sĩ về; Mã Đen tiến 7, Xe Đen ra biên; Xe bình trung, Mã Đen lui về giữa — <strong>hòa</strong>.</p><p>Mã đứng ở trung lộ che Tướng, Xe Đen chạy ngang bắt nạt Xe Đỏ — hai Xe không có điểm chiếu nào an toàn.</p>',
      m: 'X9-6 M6/5 S5/6 Tg5-6 X6.6 X7.2 X6-5 X7-4 X5-2 Tg6-5 X8/5 X4-5 S4.5 M5.7 X2.1 X5-9 X8-5 M7/5',
      kq: 'hoa',
    },
    {
      n: 3, h: '!p143_0', fen: '6N2/3k5/1r1cn4/9/9/9/2P6/4R4/3KA4/3A5',
      s: 'Xe Mã Tốt đấu Xe Mã Pháo. Xe tiến 4, Xe bình 8 bắt Xe Đen; Đen đưa Mã Pháo về che — Mã Đỏ lui về giữ Tốt. Đen có cách lui Mã vây Tốt để giành ưu thế; mạch chính đi đúng hướng — hòa.',
      c: '<p>Đỏ <strong>Xe tiến 4</strong>, Đen tiến Xe; Xe bình 8, Mã Đen tiến 4. Đỏ nâng Sĩ, Mã Đen lui 2; Tướng Đỏ về giữa, Pháo Đen về trung. Mã Đỏ lui 4, Mã Đen tiến 4; Tốt tiến, Mã Đen tiến trung — Mã Đỏ lui về trung, <strong>hòa</strong>.</p><p>Nếu ở nước cuối Đen lui Mã về 2 thay vì tiến trung: Tốt Đỏ tiến tiếp, Mã Đen lui về 4 vây bắt Tốt — thế cờ nghiêng về Đen. Một nước Mã lệch hướng đổi cả kết quả ván cờ.</p>',
      m: 'X5.4 X2.1 X5-8 M5.4 S5.6 M4/2 Tg6-5 P4-5 M3/4 M2.4 B7.1 M4.5 M4/5',
      kq: 'hoa',
    },
    {
      n: 4, h: '!p145_0', fen: '5kn2/3PP4/4bNR2/9/9/4p4/9/B8/5r3/4KA1r1',
      s: 'Đen có đôi Xe dọa Tướng Đỏ. Xe lui về giữ nhà; Đen đổi Xe ăn Sĩ — Tướng Đỏ ăn lại Xe, Mã Đen ăn Mã, hai bên Tốt Tượng — hòa. Nếu Đen lui Xe chậm, Xe Đỏ tiến xuống, Tốt Mã phối hợp — Đỏ thắng.',
      c: '<p>Đỏ <strong>Xe lui 7</strong> về giữ hàng đáy. Đen có hai cách:</p><ul><li><strong>Xe tiến ăn Sĩ</strong> (mạch chính): Xe Đỏ ăn lại, Xe Đen kia ăn Xe, Tướng Đỏ ăn Xe; Mã Đen ăn Mã. Còn Tốt Tượng mỗi bên — <strong>hòa</strong>.</li><li><strong>Xe lui 3</strong>: Xe Đỏ tiến 8 xuống áp Tướng Đen; Đen dồn Xe chiếu, Tướng Đỏ lên tránh; khi Xe Đen lui về che, Tốt Đỏ bình mở đường — Xe tiến chiếu, <strong>Đỏ thắng</strong>.</li></ul>',
      m: 'X3/7 X6.1 X3-4 X8-6 Tg5-4 M7.6 B6.1 B5-6 T9/7 T5.7',
      v: [
        { from: 'main', after: 1, m: 'X8/3 X3.8 X8-5 Tg5-6 X6.1 Tg6.1 X5-4 Tg6-5 X6/7 B5-4 X6/1 X3.1', k: { 1: 'Xe lui 3.', 12: 'Xe tiến chiếu — Đỏ thắng.' }, kq: 'do' },
      ],
      kq: 'hoa',
    },
    {
      n: 5, h: 'p146_0', fen: '3a1R3/3kaPP2/Pc2N1P2/9/9/9/4P4/B8/p2p1r3/4K4',
      s: 'Đỏ Xe Mã bốn Tốt, Đen Xe Pháo hai Tốt. Mã lui – lui, Tốt ăn Sĩ — Đen đổi Xe; Tốt ăn Pháo. Đen có ba cách: chống Sĩ thì hòa, tiến Xe 8 hoặc tiến Xe 3 thì Đỏ thắng.',
      c: '<p>Đỏ <strong>Mã lui 7</strong>, Tướng Đen lên; Mã lui về trung, Tướng Đen về giữa; <strong>Tốt ăn Sĩ</strong> — Xe Đen lui ăn Xe Đỏ; Tốt ăn Pháo. Đen có ba cách:</p><ul><li><strong>Sĩ tiến ăn Tốt</strong> (mạch chính): Tốt Đỏ đi vòng, Xe Đen ăn Tốt; Tượng Đỏ lên xuống, Tốt Đen tiến; hai bên lên xuống Sĩ Tướng — <strong>hòa</strong>.</li><li><strong>Xe tiến 8</strong>: Tốt sau bình 4, Xe Đen lui; Mã tiến 4, Tướng Đen sang 6 — Tốt bình 6, Đỏ thắng.</li><li><strong>Xe tiến 3</strong>: Tốt sau bình 4, Tướng Đen lui; Tốt bình 4, Tướng Đen sang 4; Tốt bình 7, Xe Đen về trung — Tốt sau bình 5, Đỏ thắng.</li></ul>',
      m: 'M5/7 Tg4.1 M7/5 Tg4-5 B4-5 X6/8 B9-8 S4.5 B8-7 X6.3 B3t-4 X6-5 B5.1 B1-2 T9.7 B2-3 T7/9 S5/4 Tg5-4 S4.5 Tg4-5',
      k: { 5: 'Tốt ăn Sĩ.', 7: 'Tốt ăn Pháo — Đen có ba cách.' },
      v: [
        { from: 'main', after: 7, m: 'X6.8 B3s-4 X6/6 M5.4 Tg5-6 B5-6', k: { 1: 'Xe tiến 8.', 6: 'Tốt bình 6 — Đỏ thắng.' }, kq: 'do' },
        { from: 'main', after: 7, m: 'X6.3 B3s-4 Tg5/1 B3-4 Tg5-4 B8-7 X6-5 B4s-5', k: { 1: 'Xe tiến 3.', 8: 'Tốt sau bình 5 — Đỏ thắng.' }, kq: 'do' },
      ],
      kq: 'hoa',
    },
    {
      n: 6, h: 'p148_0', fen: '4r2P1/2Rna4/5k2b/4p1P2/2P3N2/9/9/9/2p2p3/1c1K1p3',
      s: 'Thế sáng tác: Tốt Đỏ tiến dồn Tướng Đen, Mã nhảy chiếu, Xe ăn Sĩ; Đen dùng Tốt Pháo phản kích Tướng Đỏ. Hai bên đổi quân dần — cuối cùng Đỏ chỉ giữ được hòa.',
      c: '<p>Đỏ <strong>Tốt tiến</strong> hai bước dồn Tướng Đen xuống đáy, Tốt cánh bình vào ăn Tượng. Mã tiến 2, Xe lui 1 rồi bình 6; Đen tiến Xe che. Mã lui – tiến – lui chiếu liên tục, Xe bình trung ăn Tốt; Đen phản công bằng Tốt và Pháo, Xe Đỏ phải lui về ăn Tốt cứu nhà. Mã lui ba bước về giữ, Tốt bình trung — Đen cũng dồn Tốt vào trung lộ, Tướng Đỏ bình 4 — <strong>hòa</strong>.</p>',
      m: 'B3.1 Tg6/1 B3.1 Tg6/1 B2-3 T9/7 B3.1 Tg6.1 M3.2 Tg6.1 X7/1 S5.4 X7-6 X5.2 M2/3 Tg6/1 X6.1 X5/1 M3.5 Tg6.1 M5/3 Tg6/1 M3.2 Tg6.1 X6-5 Bt-5 X5/8 P2-5 Tg6-5 B3-4 M2/3 Tg6/1 M3/4 B6-5 M4/5 Tg6-5 B7-6 B4-5 Tg5-4',
      kq: 'hoa',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
