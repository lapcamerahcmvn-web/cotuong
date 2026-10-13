// Bài 15 — Cách sử dụng Sĩ Tượng cao cấp. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Cách Sử Dụng Sĩ Tượng Cao Cấp',
  y: 'Sĩ Tượng là quân phòng thủ, nhưng khi tấn công vẫn trợ lực rất lớn: làm ngòi cho Pháo, cản chân Mã, khóa vị trí của Mã đối phương.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Sĩ Tượng Có Giá Trị Khi Tấn Công?',
      s: 'Sĩ Tượng là quân phòng thủ, không qua sông được — vậy chẳng lẽ vô giá trị khi tấn công? Bài này chứng minh điều ngược lại.',
      c: `<p>Bài trước bàn binh quý thần tốc; bài này bàn về Sĩ Tượng. Sĩ Tượng là quân phòng thủ, không qua sông được — vậy chẳng phải đã chứng minh nó không có giá trị gì khi tấn công? Hai ví dụ sau cho thấy điều ngược lại.</p>`,
    },
    '2 XE TUONG thang MA CHOT SONG SI': {
      t: 'Xe Tượng Thắng Mã Chốt Song Sĩ — Tượng Cản Chân Mã',
      s: 'Không ăn được Chốt thì hòa; Mã Đen lúc nào cũng bảo vệ được Chốt. Đỏ phát hiện mình còn một Tượng — ép Mã nhảy tới chỗ Tượng cản được chân, rồi ăn Chốt.',
      c: `<p>Ví dụ tàn Xe thú vị, cũng là trường hợp kinh điển bên công dùng Tượng. Ở vị trí này Mã Đen tiến 5 hay tiến 3 đều bảo vệ được Chốt; nhưng Đỏ không ăn Chốt thì không thể khốn chết Đen. Ăn bằng cách nào?</p>
<p>Đen lúc nào cũng có thể đi Mã hoặc đi Tướng — Đỏ không khống chế cả hai được, nên cách duy nhất là tìm cách ăn Chốt; ăn không được thì hòa. Đỏ phát hiện mình còn một <strong>Tượng</strong> — Tượng có thể <strong>cản chân Mã</strong>! Mạch tiếp theo là ép Mã nhảy tới vị trí Tượng cản được, rồi phi Tượng cản chân Mã: Chốt Đen mất chỗ dựa, Đỏ ăn Chốt, thành Xe thắng Mã song Sĩ.</p>
<h2>Tác dụng của Sĩ Tượng khi tấn công</h2>
<ul>
<li>Tàn cờ là chuyện <strong>mạch tính</strong>: có mạch tính đúng rồi mới dùng thủ pháp cụ thể để thắng.</li>
<li>Ở tàn cuộc, mỗi quân phải phát huy 100% — kể cả quân phòng thủ.</li>
<li>Tác dụng thường gặp: <strong>làm ngòi cho Pháo</strong> (như song Pháo Chốt dùng Tượng làm ngòi hạn chế Tướng đối phương).</li>
<li>Ở ván này: <strong>khống chế đường Mã</strong> — không có Tượng thì hòa vì không ăn được Chốt. Trường hợp này khá thường gặp ở tàn thực dụng.</li>
</ul>`,
      k: { 4: 'Mã Đen lúc nào cũng bảo vệ được Chốt — Đen hoặc đi Mã hoặc đi Tướng, Đỏ không khống chế cả hai. Cách duy nhất là tìm cách ăn Chốt; không ăn được thì hòa.', 8: 'Mạch tính quan trọng: Đỏ còn một Tượng — Tượng có thể cản Mã! Tiếp theo phải ép Mã nhảy tới vị trí Tượng cản được chân.', 11: 'Vì sao phải vòng sang bên này để bắt? Nếu Mã Đen vào giữa, Xe bình bắt Mã — Đen mất Chốt.', 15: 'Phi Tượng cản chân Mã — Chốt Đen mất chỗ dựa. Đỏ ăn Chốt, thành Xe thắng Mã song Sĩ.' },
      v: { 0: { 1: 'Nếu Mã vào giữa…', 2: '…Xe bình bắt Mã — Đen mất Chốt.' } },
      kq: 'thang', p: 'do',
    },
    '3 TUYEN CUOC TRIEU HAM HAM thang HO KHANH DUONG': {
      t: 'Ván Chọn: Triệu Hâm Hâm Thắng Hồ Khánh Dương — Song Tượng Khóa Song Mã',
      s: 'Đỏ hơn hai Chốt, đổi Xe để đơn giản hóa; song Tượng cùng Chốt giữa và Pháo tạo "giá Pháo hình vuông" khóa chặt song Mã Đen — không đánh mà khuất phục.',
      c: `<p><strong>Phân tích cục diện</strong>: Đỏ hơn hai Chốt, quân có xu thế đơn giản hóa về tàn — đổi Xe là thành tàn Pháo Mã; ở tàn cuộc hơn hai Chốt là đủ thắng (bài 3). Đen phải tận dụng lúc song Mã đang ở tiền tuyến, dùng Xe song Mã quấy rối tạo phản kích, nếu không là ngồi chờ chết.</p>
<h2>Đỏ ứng phó</h2>
<ul>
<li>Phi Tượng cản đường, ép không gian của song Mã — Đen bắt đầu ngột ngạt.</li>
<li><strong>Hơn quân cầu đơn giản</strong>: tinh hoa là hạ thấp rủi ro — dẫn trước vật chất tới mức nhất định thì đổi quân làm giảm lực phản kích; Đỏ chọn đổi Xe.</li>
<li>Hai Tượng Đỏ cùng Chốt giữa và Pháo lộ 7 tạo thành <strong>"giá Pháo" gần như hình vuông</strong>, khống chế cả hai Mã Đen: mọi ô Mã có thể nhảy tới đều bị chiếm. Trong thời gian dài Mã Đen khó vào ngọa tào.</li>
<li>Theo nguyên tắc binh chủng có lợi, Đen không dám nhảy Mã trước — Đỏ sẽ dùng Mã đổi Pháo, thành Mã Pháo song Chốt đấu Mã đơn Sĩ Tượng toàn.</li>
<li>Song Mã Đen quanh quẩn mãi ở hai vị trí; Đỏ ăn được một Tượng, Mã lộ 7 Đen không về được — Đen nhận thua.</li>
</ul>
<p>Ván này là mẫu mực của "<strong>không đánh mà khuất phục quân địch</strong>" ở tàn cuộc: nắm lợi thế hai Chốt, mượn hai Tượng khắc chế hoàn toàn song Mã đối phương. Ở trình độ sơ cấp, nắm quy luật Xe Pháo Mã là khống chế được đại cục; tới một trình độ nhất định, dùng thành thạo các quân nhỏ yếu mới là thao tác thể hiện công lực.</p>`,
      k: { 1: 'Phi Tượng cản đường, ép không gian hoạt động của song Mã Đen — Đen bắt đầu ngột ngạt.', 3: 'Hơn quân cầu đơn giản: hạ thấp rủi ro, giảm lực phản kích của đối phương — hơn hai Chốt đã đủ thắng, Đỏ chọn đổi Xe.', 4: 'Đen đổi Xe cũng là bất đắc dĩ: tránh đổi thì cánh trái trống trải, Xe Đỏ lại ở vị trí tốt.', 7: 'Hai Tượng, Chốt giữa và Pháo lộ 7 tạo "giá Pháo" gần như hình vuông, khống chế cả hai Mã Đen — mọi ô Mã có thể tới đều bị chiếm.', 15: 'Lại một đòn cản Mã — rõ ràng không thể để Mã Đen nhảy tới.', 22: 'Đỏ vận Mã như rồng: Mã ở Sĩ giác vị trí cực tốt, Mã tiền tuyến tiếp cận ngọa tào. Chốt giữa đóng vai khống chế quan trọng — có nó song Mã Đen không điều chỉnh được. Thế này đã cho phép tổng tấn công.', 26: 'Theo nguyên tắc binh chủng có lợi, Đen không dám nhảy Mã trước — nếu không Đỏ dùng Mã đổi Pháo, thành Mã Pháo song Chốt đấu Mã Sĩ Tượng toàn.', 31: 'Song Mã Đen quanh quẩn mãi ở hai vị trí, còn Đỏ đã ăn được một Tượng. Pháo Đen chìm đáy tấn công cuối cùng nhưng vô tác dụng.', 35: 'Lại một đòn cản Mã.', 37: 'Mã lộ 7 Đen không về được, Pháo Mã tuyến đáy không đủ lực — Đen dứt khoát nhận thua.' },
      kq: 'thang',
    },
    '4 TRONG DIEM BAI HOC': {
      t: 'Trọng Điểm Bài 15: Sĩ Tượng Trợ Công',
      s: 'Sĩ Tượng làm ngòi cho Pháo, cản chân Mã khắc chế phần lớn uy lực Mã đối phương; ở tàn Pháo Mã, Sĩ Tượng là chủ lực khống chế vị trí Mã.',
      c: `<ol>
<li><strong>Sĩ Tượng tuy là quân phòng thủ nhưng trợ công rất lớn</strong>: làm ngòi cho Pháo; dùng Sĩ Tượng cản chân Mã khắc chế phần lớn uy lực Mã đối phương.</li>
<li><strong>Ở tàn Pháo Mã, Sĩ Tượng là chủ lực khống chế vị trí Mã</strong>: Tượng cao cản Mã đầu Tượng, chống Sĩ giác cản Mã ngọa tào đều là sách lược hiệu quả. Cao cấp hơn là ván vừa xem: kết cấu tam giác song Tượng – Chốt giữa khống chế tối đa các ô tốt mà Mã đối phương có thể tới, khiến chúng như lạc vào mê cung.</li>
</ol>`,
    },
  },
};
