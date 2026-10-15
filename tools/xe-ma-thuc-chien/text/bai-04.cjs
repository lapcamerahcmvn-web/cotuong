// Xe Mã Thực Chiến — Chương 1 · Bài 4: Các phương pháp thắng cuộc khác. Thế cờ + nước đi theo sách; lời giảng viết lại.
module.exports = {
  bai: 4, ch: 1, ten: 'Các Phương Pháp Thắng Cuộc Khác', level: 'trung-cap',
  y: 'Ngoài các đòn quen thuộc, Xe Mã còn thắng bằng cách vây khốn Tướng, đổi quân giản hóa, hay dùng Tướng mình tham gia tấn công. Đây cũng là bài cho thấy một nước sai có thể biến thế thắng thành hòa.',
  cuoc: [
    {
      n: 1, h: 'p033_0', fen: '9/1R4N2/3k5/3r5/9/9/9/9/3p1K3/9',
      s: 'Mã tiến về trung lộ chiếu rồi lui; Đen đưa Tốt quấy, Đỏ lui Tướng tránh, Xe bình ra biên rồi lui chiếu — Xe bình chiếu thắng.',
      c: '<p>Đỏ <strong>Mã nhảy về trung lộ chiếu</strong> rồi <strong>lui về</strong>; Đen lui Xe phòng thủ và dùng Tốt quấy rối. Đỏ <strong>lui Tướng</strong> tránh, Xe bình ra biên rồi lui chiếu — Tướng Đen phải lui, Xe bình về lộ 4 chiếu thắng.</p>',
      m: 'M3.5 Tg4-5 M5/7 X4/2 Tg4/1 B4-5 X8-9 B5-4 X9/1 Tg5/1 X9-4',
      kq: 'do',
    },
    {
      n: 2, h: 'p034_0', fen: '5k3/4R4/9/2N6/9/9/4pr3/9/9/4K4',
      s: 'Xe lui một bước, Mã nhảy biên rồi quay về, Xe chiếu xuống đáy; Đỏ thắng. Nhưng nếu Mã lui về trung lộ sai thời điểm, Đen đổi Xe giản hóa — hòa.',
      c: '<p>Đỏ <strong>Xe lui 1</strong>, Tướng Đen lên. Đỏ <strong>Mã nhảy ra biên</strong> (nước đúng), Đen Xe chiếu Tướng Đỏ, Đỏ lên Tướng né rồi <strong>Xe chiếu xuống</strong>. Mã quay về trung lộ, nhảy chiếu — Xe bình 4 thắng.</p><p><strong>Bài học:</strong> nếu ở nước thứ 2 Đỏ lui Mã về trung lộ thì Đen có Xe chiếu, Tốt tiến và Xe Đen ăn được Mã — còn Xe đối Xe, thế cờ thành <strong>hòa</strong>. Một nước Mã sai hướng làm mất thắng lợi.</p>',
      m: 'X5/1 Tg6.1 M7.8 X6.3 Tg5.1 X6/3 X5.2 X6.2 Tg5/1 X6/2 M8/6 Tg6.1 M6/5 Tg6/1 M5.3 Tg6.1 X5-4',
      k: { 3: 'Mã ra biên — nước đúng (lui về trung lộ thì chỉ hòa).' },
      v: [
        { from: 'main', after: 2, m: 'M7/5 X6.3 Tg5.1 X6/1 Tg5/1 B5.1 M5.4 B5.1 X5/6 X6/6', k: { 1: 'Nếu Mã lui về trung lộ…', 10: '…Đen ăn Mã, còn Xe đối Xe — hòa cờ.' }, kq: 'hoa' },
      ],
      kq: 'do',
    },
    {
      n: 3, h: 'p035_0', fen: '9/9/3k5/9/9/4NR3/9/4r4/4p4/5K3',
      s: 'Mã tiến, Xe lui giữ, dùng Tướng lên hai bước làm điểm tựa; Mã nhảy về trung lộ — Đen lui Tướng hay bình Xe, Đỏ đều thắng.',
      c: '<p>Đỏ <strong>Mã tiến 4</strong>, Đen lui Xe. Đỏ <strong>Xe lui 1</strong> rồi <strong>lên Tướng hai bước</strong> — Tướng Đỏ trở thành quân tham chiến, khống chế lộ giữa. <strong>Mã nhảy về trung</strong>, Đen có hai cách:</p><ul><li><strong>Tướng lui 1</strong> (mạch chính): Mã lui, Xe bình 4, Mã nhảy chiếu liên tục — Mã tiến chiếu thắng.</li><li><strong>Xe bình 3</strong>: Mã lui, lui Tướng tránh, Xe bình 6 – Mã tiến — Xe bình trung chiếu thắng.</li></ul>',
      m: 'M5.4 X5/4 X4/1 B5-4 Tg4.1 B4-5 Tg4.1 B5-4 M4.5 Tg4/1 M5/3 X5-4 M3.4 Tg4/1 M4/5 Tg4.1 X4.5 Tg4.1 M5.4',
      k: { 9: 'Mã về trung — Đen có hai cách.' },
      v: [
        { from: 'main', after: 9, m: 'X5-3 M5/3 X3.4 Tg4/1 X3.1 X4-6 Tg4-5 M3.4 Tg5/1 X6-5', k: { 1: 'Xe bình 3.', 10: 'Xe bình trung chiếu.' } },
      ],
      kq: 'do',
    },
    {
      n: 4, h: 'p036_0', fen: '9/3k5/8r/4R4/4N4/9/9/9/3p5/5K3',
      s: 'Thế dài: Xe tiến chiếu, lên Tướng né, Xe lui bình liên tục ép Tướng; Mã tiến về lộ 4 rồi quấn quanh cung — Xe bình chiếu thắng.',
      c: '<p>Đỏ <strong>Xe tiến chiếu</strong>, Đen bình Xe, Đỏ <strong>lên Tướng</strong>. Xe Đỏ lui – bình liên tục khóa Tướng Đen; Mã tiến về lộ 4 rồi lui – tiến quanh cung. Khi Đen bình Xe về lộ 3 cố cứu, Đỏ dùng Xe tiến chiếu hai lần và bình sang lộ 7 — Đỏ thắng.</p>',
      m: 'X5.3 X9-3 Tg4.1 B4-3 X5/3 X3-8 X5-4 Tg4-5 X4.2 Tg5/1 X4/4 Tg5.1 M5.4 Tg5.1 X4-5 Tg5-4 M4/6 B3-4 X5-4 Tg4/1 M6.4 Tg4.1 M4/5 Tg4/1 M5.7 X8-3 X4.4 Tg4/1 X4.1 Tg4.1 X4-7',
      kq: 'do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
