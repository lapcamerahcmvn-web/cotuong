// Bài 25 — Chiến thuật chủ yếu cờ tàn: vây khốn. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Chiến Thuật Chủ Yếu Cờ Tàn: Vây Khốn',
  y: 'Ở tàn cuộc vây Xe, vây Pháo rất khó; đối tượng vây khốn chủ yếu là Mã. Quân thâm nhập sâu vào trận địa địch luôn phải thận trọng.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Vây Khốn Ở Tàn Cuộc',
      s: 'Ở trung cuộc vây khốn là thủ đoạn được quân kinh điển (vây Xe, Mã, Pháo). Ở tàn cuộc quân ít, vây Xe rất khó — phần lớn là cờ thế kinh điển.',
      c: `<p>Ở trung cuộc, <strong>vây khốn</strong> là thủ đoạn được quân kinh điển: vây Xe, vây Mã, vây Pháo. Ở tàn cuộc có gì đặc sắc?</p>
<p>Vây Xe ở tàn cuộc chắc chắn rất khó. Ở khai, trung cuộc kết cấu quân phức tạp, Xe đối phương qua sông thì có thể tập trung quân vây — vậy mà thường vẫn không vây được. Tới tàn cuộc quân có hạn, vây Xe càng khó; phần lớn vây Xe ở tàn cuộc là cờ thế kinh điển.</p>`,
    },
    '2 VD1 (HINH 152)': {
      t: 'Ví Dụ: Nhốt Xe Bên Trong',
      s: 'Vấn đề mạch tính: nhốt Xe Đen bên trong, rồi đưa Chốt biên qua sông diệt Chốt — ba Chốt chắc thắng song Sĩ.',
      c: `<p>Thực ra rất đơn giản — vấn đề mạch tính: <strong>nhốt Xe Đen bên trong</strong>, sau đó chỉ cần đưa Chốt biên qua sông tiêu diệt Chốt 7, Chốt 9 của Đen; cuối cùng ba Chốt chắc thắng song Sĩ.</p>
<p>Vây Pháo ở tàn cuộc cũng khó, lý do giống vây Xe. Đối tượng chủ yếu của vây khốn ở tàn cuộc vẫn là <strong>Mã</strong> — do đặc tính quân: Mã có thể bị cản chân.</p>`,
      k: { 3: 'Nhốt Xe bên trong. Tiếp theo đưa Chốt biên qua sông diệt Chốt Đen; cuối cùng ba Chốt chắc thắng song Sĩ.' },
      kq: 'thang',
    },
    '3 PHAO 3 CHOT kheo thang SONG MA PHAO': {
      t: 'Pháo Ba Chốt Khéo Thắng Song Mã Pháo — Trù Tính Vây Khốn',
      s: 'Không thể chiếu bí trực tiếp; Đỏ trù tính xảo diệu khiến Mã Pháo Đen không cử động được, nhốt Mã còn lại ở khu khác, phi Tượng giữ vây — rồi nhanh hơn một nước sát.',
      c: `<p>Thế khá kinh điển trong tiểu tàn cuộc, độ khó khá cao. Đỏ không thể chiếu bí trực tiếp; thắng lợi chủ yếu nhờ <strong>vây khốn</strong>, cùng vài chiến thuật cản trở phối hợp.</p>
<ul>
<li>Từng bước truy sát, rồi một trù tính xảo diệu: Mã Pháo Đen không cử động được, Sĩ cũng không hạ được. Đen còn một Mã — nhưng Mã này bị nhốt khéo ở khu khác.</li>
<li>Vây được Mã nhưng không ăn được; Đỏ muốn thắng phải tiến thêm một bước.</li>
<li>Phi Tượng là kỹ xảo vây quân: nếu không, Mã Đen nhảy thoát về giải vây thì Đỏ phiền.</li>
<li>Không thể khốn Mã mãi — phải nghĩ cách tấn công; cuối cùng Đỏ nhanh hơn một nước sát.</li>
</ul>
<p>Mạch tính kiểu này thường dùng để giải nhiều nan đề tàn cuộc.</p>`,
      k: { 7: 'Từng bước truy sát.', 9: 'Một trù tính xảo diệu: Mã Pháo Đen không cử động được, Sĩ cũng không hạ được; Mã còn lại bị nhốt khéo ở khu khác. Vây được nhưng chưa ăn được — phải tiến thêm một bước.', 13: 'Phi Tượng — kỹ xảo vây quân: nếu không, Mã Đen nhảy thoát về giải vây.', 18: 'Không thể khốn Mã mãi, phải nghĩ cách tấn công.', 29: 'Mọi thứ đã trù tính — vừa khéo nhanh hơn một nước, sát cờ Đen trước.' },
      kq: 'thang', p: 'do',
    },
    '4 TUYEN CUOC LY HONG GIA tien bai TUONG XUYEN': {
      t: 'Ván Chọn: Lý Hồng Gia Thua Tưởng Xuyên — Mã Thâm Nhập Bị Vây',
      s: 'Đỏ thiếu một Chốt nên phải cầu hòa: nhảy Mã bảo vệ Chốt nhưng Mã đứng quá xấu, bị Đen dùng cặp Chốt biên làm mồi dẫn tới tuyến hoành 2 rồi khóa chết.',
      c: `<p><strong>Phân tích cục diện</strong>: Đỏ kém một Chốt nên phải cầu hòa. Chưa sợ Pháo Đen đánh Chốt, nhưng nguy cơ ngầm phải giải quyết: không ăn được Chốt 9 của Đen thì cũng phải đổi nó đi — đổi xong tỷ lệ hòa cao.</p>
<h2>Sai lầm: vị trí Mã quá xấu</h2>
<p>Nước nhảy Mã có vấn đề lớn. Bài 11 đã nói linh hoạt Mã rất quan trọng, có lúc ngang với "binh lực trên hết". Mã Đỏ vốn ở chỗ tốt; nhảy đi để bảo vệ Chốt (và có kế hoạch ăn Chốt) thì hiểu được, nhưng vị trí mới thật sự xấu. Được cái này mất cái kia: Mã Đen nhảy lên chỗ lợi hại hơn; Chốt lộ 1 Đỏ không có quân giữ — kế hoạch thất bại.</p>
<p>Đen chuyển mục tiêu sang Mã lộ 2 của Đỏ mà Đỏ không hay. Đen lui Mã — nước giàu trí tưởng tượng: kế hoạch Chốt tiến của Đỏ không đứng vững (Mã đạp Mã, Chốt thành tặng không). Đáng ra Đỏ nên lui Mã đổi Mã — nhưng tính sâu thì nước này cũng đầy rủi ro: Mã Đỏ có thể bị khóa chết, mà Chốt lộ 1 tuyệt đối không được mất. Cuối cùng Đen nhảy Mã hạn chế Pháo — loại hình này chỉ cần hạn chế Pháo là có thể ăn Mã — Đỏ nhận thua.</p>
<h2>Phương án cầu hòa mạo hiểm (nhánh phụ)</h2>
<p>Nếu đổi Mã: Mã Đỏ tạm bị khóa, Đỏ không đi được gì, Đen dùng Chốt qua sông quấy rối Pháo, ăn trắng Chốt biên — Đỏ hết khả năng hòa. Muốn hòa, Đỏ phải nhận thức đầy đủ: <strong>không để Chốt Đen áp sát Chốt biên</strong> — điều Pháo chặn, khi cần nhanh chóng quay về bảo vệ Chốt, và đổi Chốt Đen bằng tốc độ nhanh nhất. Biến hóa rất phức tạp; ở trận đấu, kỳ thủ nào cũng phán đoán nguy cơ rất lớn, sai một lần là mất quyền tự quyết.</p>
<p><strong>Bài học</strong>: Đen dùng cặp Chốt đối đầu ở biên làm mồi dụ Mã Đỏ tới tuyến hoành 2. Phần lớn trường hợp vị trí đó không có vấn đề (bị đè thì Pháo kịp yểm hộ), nhưng vẫn nguy hiểm — không cần thiết thì đừng cho quân thâm nhập xa như vậy.</p>`,
      k: { 1: 'Nhảy Mã có vấn đề lớn: Mã Đỏ vốn ở chỗ tốt; nhảy đi để bảo vệ Chốt nhưng vị trí mới thật sự xấu.', 2: 'Được cái này mất cái kia — Mã Đen nhảy lên, vị trí lợi hại hơn nhiều.', 3: 'Đạp Chốt là bước tiếp theo.', 8: 'Đen nhảy liền hai nước Mã; Mã Đỏ lui về, Chốt lộ 1 không ai giữ — kế hoạch thất bại.', 10: 'Đỏ muốn đổi quân, Đen không chịu, hạ Tượng duy trì giằng co. Lúc này Đen đã chuyển mục tiêu sang Mã lộ 2 của Đỏ.', 14: 'Lui Mã — nước giàu trí tưởng tượng: nếu Chốt Đỏ tiến, Mã Đen đạp Mã, Chốt thành tặng không. Đỏ nên lui Mã đổi Mã.', 18: 'Thuận lợi đè chặt Mã Đỏ.', 22: 'Một nước nhảy Mã: chỉ cần hạn chế Pháo là Đen có thể ăn Mã Đỏ.', 24: 'Đỏ không còn ý chiến đấu — nhận thua.' },
      v: { 1: { 1: 'Phương án mạo hiểm: Mã lùi đổi Mã.', 4: 'Mã Đỏ tạm bị khóa; Đỏ không có cách, ngồi chờ Đen ra quân.', 14: 'Điểm then chốt — Chốt Đen sắp áp sát Chốt Đỏ. Hai sách lược.', 15: 'Sách lược bỏ mặc không quan tâm…', 17: 'Đỏ hiểu Đen chưa ăn được Chốt; dù mất một Chốt nhưng đổi được Pháo — Mã song Chốt đấu Mã Sĩ Tượng toàn, vấn đề không lớn.', 18: 'Nhưng Đen còn nhiều biến hóa…', 22: 'Đen quấy rối rất lớn; Đỏ đành phi Tượng.', 24: 'Xông Chốt xuống — Chốt biên chính thức mất.', 28: 'Đen ăn trắng Chốt biên, Mã Đỏ vẫn bị nhốt, có thể bị đánh chết bất cứ lúc nào — Đỏ hết khả năng hòa.' }, 2: { 1: 'Sách lược không để Chốt Đen áp sát: điều Pháo xảo diệu chặn Chốt Đen bình 8.', 5: 'Đỏ dốc sức: Đen hạ Tượng thì Pháo chặn; Đen phi Tượng đánh Chốt thì Pháo quay về bảo vệ — đổi Chốt Đen bằng tốc độ nhanh nhất.', 10: 'Đen vẫn ăn được Tượng; tuyệt đối không được tiện tay giải thoát Mã — phải cứu Pháo trước.', 12: 'Song Tượng bị ăn, cục diện vẫn phức tạp — khi thi đấu không thể tính hết.' } },
      kq: 'thang',
    },
    '5 TRONG DIEM BAI HOC': {
      t: 'Trọng Điểm Bài 25: Vây Khốn — Mã Là Mục Tiêu Chính',
      s: 'Vây khốn vẫn hiệu quả ở tàn cuộc; vây Xe, vây Pháo khó, đối tượng chính là Mã. Quân thâm nhập trận địa địch luôn phải thận trọng.',
      c: `<ol>
<li>Dù ở trung cuộc hay tàn cuộc, <strong>vây khốn</strong> vẫn là thủ đoạn rất hiệu quả. Ở tàn cuộc, vây Xe và vây Pháo khó; đối tượng bị vây chủ yếu là <strong>Mã</strong>.</li>
<li>Tàn cuộc quân ít nên quân bị vây ít đi, nhưng khi chủ lực thâm nhập vẫn phải rất thận trọng. Như Mã Đỏ nhảy tới tuyến hoành 2 — tuy là vị trí tấn công kinh điển ở tàn cuộc, thâm nhập trận địa địch thì không thể không cẩn thận.</li>
</ol>`,
    },
  },
};
