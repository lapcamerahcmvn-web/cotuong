// Bài 9 — Phải có ý thức chiếm trung lộ. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Phải Có Ý Thức Chiếm Trung Lộ',
  y: 'Ở tàn cuộc, trung lộ là tuyến đường quan trọng nhất — gần như mọi thế tàn thực dụng đều dùng tới thủ đoạn tranh chiếm trung lộ.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Nguyên Tắc Chiếm Trung',
      s: 'Ở trung cuộc mỗi lộ có giá trị riêng; sang tàn cuộc nhiều lộ mất ý nghĩa, chỉ còn trung lộ là quan trọng nhất. Không biết chiếm trung lộ gần như là không biết đánh tàn cờ.',
      c: `<p>Ở trung cuộc, mỗi tuyến đường có giá trị riêng; sang tàn cuộc, nhiều tuyến không còn giá trị. Lộ 2 và 8 là lộ Xe quan trọng ở trung cuộc, tới tàn cuộc hết Xe thì hết đặc thù. Lộ 3 và 7 quan trọng để Mã linh hoạt ở khai cuộc, tới tàn cuộc Mã đi khắp nơi nên cũng không còn đặc biệt. Ở tàn cuộc, Xe bình sang lộ 7, 8 hay 9 gần như không khác nhau.</p>
<p>Tuyến quan trọng nhất ở tàn cuộc là <strong>trung lộ</strong>. Ghi nhớ: dù ở giai đoạn nào, mục đích ở đâu thì tuyến đó quan trọng nhất. Ở tàn cuộc, không hiểu phải chiếm trung lộ gần như đồng nghĩa với không biết đánh cờ — thử nghĩ xem, có thế tàn thực dụng nào không dùng thủ đoạn tranh trung lộ? Đây là chủ đề của bài: <strong>nguyên tắc chiếm trung</strong>.</p>`,
    },
    '2 DON MA thang TUONG tro troi': {
      t: 'Đơn Mã Thắng Tướng Trơ Trọi — Cũng Phải Chiếm Trung',
      s: 'Ngay cả Mã bắt Tướng trơ trọi cũng phải dùng nguyên tắc chiếm trung: Tướng Đỏ chiếm trung lộ khiến Tướng Đen chỉ còn ba điểm di chuyển, Mã thêm một chút khống chế là thắng.',
      c: `<p>Ngay cả đơn Mã bắt Tướng trơ trọi cũng phải chiếm trung, nếu không thì không thắng được. Mục đích của chiếm trung là <strong>khống chế vị trí Tướng Đen</strong>: phạm vi hoạt động của Tướng Đen hẹp lại, ở đường sườn chỉ còn ba điểm đi; Mã thêm một chút khống chế là thắng ngay.</p>
<p>Thế tàn đơn giản này chứng minh: không hiểu nguyên tắc chiếm trung thì đến đơn Mã bắt Tướng trơ trọi cũng không làm được.</p>`,
      k: { 3: 'Nước chờ.', 5: 'Muốn thắng phải chiếm trung lộ: khống chế Tướng Đen, chỉ còn ba điểm đi ở đường sườn — Mã thêm chút khống chế là thắng.', 11: 'Tướng Đen hết đường đi — Đỏ thắng.' },
      kq: 'thang', p: 'do',
    },
    '3 PHAO SI thang SONG SI': {
      t: 'Pháo Sĩ Thắng Song Sĩ — Khuyết Tượng Sợ Pháo',
      s: 'Song Sĩ chỉ quanh quẩn trong cửu cung, Pháo dùng Sĩ làm ngòi phá từng quân. Tướng Đỏ chiếm trung lộ là điều kiện — không chiếm trung thì Pháo đơn Sĩ cũng không thắng nổi Tướng trơ trọi.',
      c: `<p>Pháo Sĩ thắng song Sĩ là thế rất điển hình, thể hiện đầy đủ đặc tính <strong>khuyết Tượng sợ Pháo</strong>: song Sĩ chỉ hoạt động trong cửu cung, Pháo dùng Sĩ làm ngòi, phá từng quân một.</p>
<p>Nước then chốt là dùng Pháo nhòm Sĩ; khi Tướng Đỏ chiếm trung lộ, Đen không còn quân nào đi được. Cuối cùng Pháo lui về, Tướng chiếm trung, Pháo và Sĩ kích sát ở đường sườn.</p>
<p>Gần như mọi tàn cờ đều cần đến Tướng, và phần lớn trường hợp việc quan trọng nhất của Tướng là <strong>chiếm trung lộ</strong>: chỉ khi Tướng chiếm trung mới hạn chế tối đa phạm vi của Tướng đối phương — bị nhốt ở đường sườn thường chỉ còn ba ô.</p>`,
      k: { 5: 'Dùng Pháo nhòm Sĩ — nước then chốt của thế này.', 7: 'Vẫn là chiếm trung. Pháo nhòm Sĩ nên Tướng Đen không vào giữa được (mất Sĩ), nhưng không vào giữa cũng không được: nếu Tướng lên, Sĩ Đỏ lui là muộn cung sát. Tướng Đỏ chiếm trung xong, Đen hết quân để đi.', 8: 'Mất Sĩ còn hơn bị chiếu hết ngay.', 21: 'Lại đánh chết Sĩ — Đỏ thắng, cũng nhờ chiếm trung.', 27: 'Pháo lui về, Tướng chiếm trung, Pháo và Sĩ kích sát ở đường sườn. Không chiếm trung thì Pháo đơn Sĩ cũng không thắng nổi Tướng trơ trọi.' },
      v: { 0: { 1: 'Nếu Tướng lên…', 2: '…Sĩ lui — muộn cung sát.' } },
      kq: 'thang', p: 'do',
    },
    '4 PHAO CHIEM TRUNG che thang XE CHOT': {
      t: 'Xe Pháo Chiếm Trung Chế Thắng Xe Chốt — Hải Để Lao Nguyệt',
      s: 'Thế tàn thực dụng cao cấp: ăn Chốt ngay thì hòa! Đỏ phải chiếm trung lộ trước, rồi chuyển Pháo sang cánh kia, thực hiện "hải để lao nguyệt" (mò trăng đáy biển).',
      c: `<p>Thế tàn thực dụng khá cao cấp, giải bằng sát pháp <strong>"hải để lao nguyệt"</strong> (mò trăng đáy biển) — mà tiền đề của nó là <strong>chiếm trung lộ</strong>. Biết hải để lao nguyệt cũng chưa chắc giải được, còn cần nhiều kỹ xảo.</p>
<p>Đỏ Xe Pháo, Đen Xe Chốt. Thường Pháo là chủ lực mạnh hơn Chốt, nhưng ở đây Đỏ không còn Sĩ — Pháo không Sĩ như hổ không răng, sức chiến đấu theo hàng dọc giảm. Ở mức độ nào đó hai bên tám lạng nửa cân, Xe Chốt Đen còn uy hiếp trực tiếp hơn.</p>
<p>Đỏ có vẻ có cơ hội ăn Chốt ngay — nhưng <strong>ăn Chốt thì hòa</strong> (nhánh phụ): Xe Đen vào giữa, Tướng Đen chiếm trung là thành hòa. Đường thắng là Xe chiếm trung lộ trước, rồi chuyển Pháo sang cánh bên kia (Đen lui Xe cản — đuổi Pháo không phải "bắt" nên hợp luật; Đỏ dùng thủ đoạn tinh xảo: lui Pháo về cạnh Xe), dùng chiếu Tướng ngưng ngắt để đổi cánh. Cuối cùng Pháo đáy mượn Tướng Đen làm ngòi đuổi Xe Đen đi — Đen chậm một bước, nếu Chốt đã xuống thì không thua.</p>
<p>Chỉ khi Tướng chiếm trung mới có thể phế Pháo để thực hiện "bạch kiểm Tướng" (lộ mặt Tướng) — vì thế chiếm trung là điều kiện tiên quyết.</p>`,
      k: { 1: 'Chiếm trung lộ — nước then chốt để thắng. Nhưng có rủi ro: Xe Chốt Đen cũng có sức sát thương lớn, đây là thế đối chiến, chưa biết Chốt Đen hay Pháo Đỏ nhanh hơn.', 3: 'Muốn hải để lao nguyệt, Pháo phải sang được cánh bên kia — Đen lui Xe cản (không phải "bắt" nên hợp luật). Thủ đoạn tinh xảo: lui Pháo về cạnh Xe.', 7: 'Qua vài nước chiếu ngưng ngắt đơn giản, Pháo đã sang được cánh bên kia.', 11: 'Pháo đáy mượn Tướng Đen làm ngòi đuổi Xe đi — "hải để lao nguyệt", chiến thuật đặc sắc của tàn Xe Pháo. Đen chậm một bước.', 15: 'Chỉ khi Tướng chiếm trung mới có thể phế Pháo để lộ mặt Tướng — chiếm trung là điều kiện tiên quyết.' },
      v: { 0: { 1: 'Nếu Xe ăn Chốt ngay…', 2: '…Xe Đen vào giữa.', 4: 'Tướng Đen chiếm trung — thành hòa.' }, 1: { 1: 'Không thể Xe chiếu ăn Pháo…', 4: '…Xe Đỏ bình lộ mặt Tướng — sát cục.' } },
      kq: 'thang', p: 'do',
    },
    '5 SONG MA AM TUYEN': {
      t: 'Song Mã Ẩm Tuyền — Mượn Sức Tướng Chiếm Trung',
      s: 'Nhiều sát pháp tự nó đã đủ sát vẫn mượn sức Tướng chiếm trung: song Mã ẩm tuyền không có Tướng chiếm trung lộ thì không thắng được.',
      c: `<p>Rất nhiều sát pháp tưởng như tự sát được cũng thường mượn sức Tướng chiếm trung. Song Mã ẩm tuyền ở đây: nếu không có Tướng Đỏ chiếm trung lộ thì không thắng được — Mã cuối cùng mượn sức Tướng để tạo sát cục Quải giác Mã.</p>`,
      k: { 7: 'Mượn sức Tướng chiếm trung, tạo sát cục Quải giác Mã!' },
      kq: 'thang', p: 'do',
    },
    '6 TRONG DIEM BAI HOC': {
      t: 'Trọng Điểm Bài 9: Trung Lộ Là Số Một',
      s: 'Chiếm trung là nguyên tắc chủ yếu của tàn cuộc; Tướng chiếm trung chủ yếu ở tàn thực chiến; quân càng ít càng phải dùng mọi quân — kể cả Tướng.',
      c: `<ol>
<li><strong>Nguyên tắc chiếm trung</strong> là nguyên tắc chủ yếu của tàn cuộc. Trong mọi tuyến đường của tàn cuộc, trung lộ quan trọng nhất, không có tuyến thứ hai.</li>
<li><strong>Tướng chiếm trung chủ yếu ở tàn thực chiến</strong>: quân càng ít, Tướng ra ngoài càng ít nguy hiểm — nhất là khi đang vây công, Tướng đi thế nào cũng không có vấn đề.</li>
<li>Khi quân rất ít, Tướng chiếm trung phát huy tác dụng không kém bất kỳ chủ lực nào — có khi chẳng phải Xe cũng chỉ khống chế được tuyến này thôi sao? Quân càng ít càng phải vận dụng mọi quân tham chiến.</li>
</ol>`,
    },
  },
};
