// Bài 10 — Đường sườn và đường sinh mệnh. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Đường Sườn Và Đường Sinh Mệnh',
  y: 'Sau trung lộ, đường sườn (lộ 4, 6) và tuyến hoành 2 là quan trọng nhất; biết chuyển đổi linh hoạt giữa trung lộ và đường sườn để phá nhịp phòng thủ.',
  f: {
    '1 TA CHOT HUU TUONG': {
      t: 'Tả Chốt Hữu Tướng — Chốt Và Tướng Chia Nhau Hai Đường Sườn',
      s: 'Chốt ở tuyến hoành 2 khóa Tướng Đen ở trung lộ, Tướng Đỏ chiếm đường sườn bên kia — Sĩ Đen bị kìm chế, Đỏ ăn Sĩ và thắng.',
      c: `<p>Khái niệm <strong>"tả Chốt hữu Tướng"</strong>: không phải Chốt nhất định đứng bên trái, mà là Chốt và Tướng <strong>chia nhau chiếm hai đường sườn</strong> (lộ 4 và lộ 6).</p>
<p>Ở đây Chốt Đỏ đứng ở tuyến hoành 2, khóa Tướng Đen ở trung lộ; Sĩ Đen ít lựa chọn nên buộc phải lên trung lộ và cũng bị kìm chế. Sau đó Chốt bình ăn Sĩ — Đỏ thắng.</p>
<p>Chốt Đỏ đứng đúng giao điểm của đường sườn và tuyến hoành 2 — hai tuyến là chủ đề của bài. Tàn cuộc thường kết thúc bằng chiếm trung lộ, nhưng có những trường hợp phải chiếm lộ 4, 6 trước rồi mới chiếm được trung lộ.</p>`,
      k: { 3: 'Sau đó Chốt bình ăn Sĩ — Đỏ thắng.' },
      kq: 'thang', p: 'do',
    },
    '2 PHAO CHOT THAP kheo thang PHAO DON TUONG': {
      t: 'Mã Chốt Thấp Khéo Thắng Pháo Đơn Tượng',
      s: 'Vận Mã chiếu không chết, nước chờ cũng vô hiệu, Chốt đã ở vị trí tốt nhất — Đỏ đổi mạch từ chiếm trung sang "tả Chốt hữu Tướng", rồi cho Mã vòng sau lưng Tướng sang cánh kia.',
      c: `<p>Mã Chốt đấu Pháo đơn Tượng là thế tất thắng — với tiền đề Chốt Đỏ đã chiếm hoa tâm và Tượng Đen ở tầng dưới (nếu Tượng ở trên thì Đỏ không khống chế được, thành hòa). Thắng được nhưng không dễ.</p>
<p><strong>Phân tích</strong>: chỉ vận Mã thì không chiếu chết được vì Pháo Đen luôn cản chân Mã; Đen còn Tượng để đi nước chờ nên Đỏ cũng không dùng nước chờ mà thắng; Chốt đã ở vị trí tốt nhất (hoa tâm). Có vẻ là bài toán không giải được.</p>
<h2>Lời giải: đổi mạch</h2>
<p>Đỏ chuyển từ chiếm trung sang <strong>"tả Chốt hữu Tướng"</strong>. Lý do là vị trí Pháo Đen: Pháo ở tuyến đáy, gặp nước Mã điếu ngư tiếp theo thì không kịp cản; Chốt lộ 6 lại hạn chế Pháo lộ 3 tiến lên. Pháo Đen vẫn ngoan cường dùng thân cản Mã, nên cách đơn giản để thắng là tìm một tuyến mà Pháo không cản được — cho Mã <strong>vòng sau lưng Tướng sang cánh bên kia</strong>.</p>
<p>Chuyển đổi linh hoạt giữa trung lộ và đường sườn, phát huy tối đa uy lực Mã Chốt — chỉ một lần đổi hướng đã hạ thấp năng lực phòng ngự của Pháo Đen.</p>`,
      k: { 6: 'Nước chờ trước đó có tác dụng: Tướng Đen đang ở trung lộ. Đen lui Pháo 2 là bắt buộc — lui 1 thì Chốt bình rút Pháo thắng ngay. Nhưng Đỏ vẫn có vẻ hết nước: Mã tiến thì Pháo Đen lên cản.', 9: 'Đỏ đổi mạch từ chiếm trung sang "tả Chốt hữu Tướng". Vì Pháo Đen ở tuyến đáy không kịp cản đòn Mã điếu ngư, và Chốt lộ 6 chặn Pháo lộ 3 tiến lên.', 16: 'Pháo Đen đã bị khóa nhưng vẫn ngoan cường cản Mã. Cách thắng đơn giản: tìm tuyến Pháo không cản được — Mã vòng sau lưng Tướng sang cánh kia.', 29: 'Đỏ thắng. Linh hoạt chuyển giữa trung lộ và đường sườn đã phá nhịp phòng thủ của Pháo Đen.' },
      v: { 0: { 1: 'Nếu Pháo lui 1…', 2: '…Chốt bình rút Pháo — Đỏ thắng ngay.' }, 1: { 1: 'Nếu Mã tiến ngay…', 2: '…Pháo Đen lên cản.' } },
      kq: 'thang', p: 'do',
    },
    '3 XE CHOT kheo thang XE DON SI TUONG': {
      t: 'Xe Chốt Khéo Thắng Xe Đơn Sĩ Tượng — Ra Tướng Hay Phi Tượng?',
      s: 'Theo lý Xe Chốt đấu Xe đơn Sĩ Tượng là hòa. Ở thế này lựa chọn đầu tiên quyết định tất cả: ra Tướng thì thắng, phi Tượng thì hòa — chỉ vì vị trí của Sĩ Đen.',
      c: `<p>Khái niệm nền: <strong>Xe Chốt đấu Xe đơn Sĩ Tượng theo lý là hòa</strong>. Nhưng ở tàn có Xe, để Chốt đối phương áp cửu cung luôn rất nguy hiểm — sai một nước là thua.</p>
<p>Thế cờ có vẻ lạ: Xe Đen đặt ngay trước mặt Tướng Đỏ. Đỏ đỡ chiếu bằng cách nào? Thường thì ra Tướng hay phi Tượng không khác nhau mấy — nhưng ở đây thì quyết định: <strong>phi Tượng thì hòa, ra Tướng thì Đỏ thắng</strong>.</p>
<h2>Vì sao ra Tướng thắng?</h2>
<p>Ra Tướng ép Đen phải hạ Sĩ (lựa chọn duy nhất khi Đỏ dọa Tướng tổ sát). Đen bình Xe chờ, phòng thủ trung lộ: cánh phải có một Sĩ đáy, cánh trái có Tượng cản — tưởng ung dung. Tinh hoa nằm ở <strong>nước Xe lui 1</strong> — một nước chờ thần kỳ: Sĩ Đen không lên được, Tướng bị cản mặt, chỉ còn đi Xe, mà Xe cũng không đi bừa được (ăn Tượng thì bị ép ra Tướng rồi mất Xe; Xe tiến thì Đỏ cướp tuyến đỉnh cung bắt chết Tướng). Cuối cùng Tướng Đen không kịp lui về, trung lộ và tuyến đáy cùng sơ hở; Xe Đỏ lui đánh hai điểm một lúc — Đen thua.</p>
<h2>Vì sao phi Tượng chỉ hòa?</h2>
<p>Nhánh phụ: khác biệt duy nhất là vị trí của Sĩ. Ra Tướng đã ép Sĩ Đen xuống, nên khi kích sát cánh phải, Đen không bỏ Sĩ được cũng không ra Tướng được. Còn phi Tượng thì Sĩ Đen luôn có thể về trung lộ — <strong>đó là yếu lĩnh phòng thủ</strong>; nắm được yếu lĩnh này, Đỏ vô kế khả thi.</p>
<p>Cái khó của cờ tàn nằm ở chi tiết; không nghĩ đủ sâu thì không hiểu được tầm quan trọng của chúng — mà chính chúng quyết định thắng bại.</p>`,
      k: { 1: 'Biến hóa ra Tướng — xem vì sao ra Tướng thắng được.', 5: 'Đen không thể chiếu mãi.', 6: 'Đỏ dọa Tướng tổ sát, Đen hạ Sĩ là lựa chọn duy nhất.', 7: 'Phi Tượng đỡ sát. Nếu tùy tiện bình Xe gọi sát, Đen lên Sĩ, Xe đuổi, Xe Đen bình ép đổi Xe — hòa.', 10: 'Đen đành bình Xe đi nước chờ. Xe giữ trung lộ, cánh phải có Sĩ đáy, cánh trái có Tượng cản — có vẻ Xe Chốt không chém nổi Xe đơn Sĩ Tượng. Đỏ tấn công thế nào?', 14: 'Xe Đen theo sát Xe Đỏ, công đâu thủ đó — tinh hoa của thế cờ ở nước tiếp theo!', 15: 'Nước then chốt — nước thần kỳ! Bản chất là nước chờ, chờ Xe Đen tự rời tuyến: Sĩ không lên được, Tướng bị cản mặt, chỉ còn đi Xe — mà ăn Tượng thì bị ép ra Tướng mất Xe, Xe tiến thì Đỏ cướp tuyến đỉnh cung bắt chết Tướng.', 19: 'Đen phòng thủ có vấn đề thứ tự: nếu Tướng kịp lui về trước thì không lo — nhưng Đỏ đã khéo cản mặt Tướng, Đen chỉ đi được Xe.', 21: 'Trung lộ và tuyến đáy Đen cùng sơ hở; Xe Đỏ lui đánh hai điểm một lúc, Xe Đen không giữ được cả hai — Đỏ thắng.' },
      v: { 0: { 1: 'Biến hóa phi Tượng.', 3: 'Thử tấn công cánh trái: Đen hạ Sĩ rồi lên Sĩ, đi đi lại lại — Đỏ vô kế. Phải nghĩ nước khác.', 6: 'Đen có thể ra Tướng.', 14: 'Đơn Xe linh Sĩ — hòa. Khác biệt duy nhất so với nhánh ra Tướng là vị trí Sĩ: ở đây Sĩ Đen luôn về được trung lộ — yếu lĩnh phòng thủ.' }, 5: { 1: 'Nếu Xe ăn Tượng…', 2: '…Chốt tiến ép Tướng ra, rồi phi Tượng diệt Xe.' }, 6: { 1: 'Nếu Xe tiến 1…', 2: '…Xe lui, Xe Đen bình 5, Xe bình 3 — cướp tuyến đỉnh cung bắt chết Tướng.' } },
      kq: 'thang',
    },
    '4 TRONG DIEM BAI HOC': {
      t: 'Trọng Điểm Bài 10: Đường Sườn, Tuyến Hoành 2 Và Tả Chốt Hữu Tướng',
      s: 'Sau trung lộ là đường sườn và tuyến hoành 2; chiếm được hoa tâm cũng phải biết chuyển đổi; tả Chốt hữu Tướng rất thực dụng ở tàn Mã Chốt.',
      c: `<ol>
<li><strong>Ngoài trung lộ, đường sườn và tuyến hoành 2 là tuyến quan trọng kế tiếp.</strong> Mục tiêu ở đâu thì trọng điểm ở đó. Hai tuyến này cùng khống chế phạm vi hoạt động của Tướng, và với Chốt, đây là đường tất yếu để vào cửu cung.</li>
<li><strong>Đã chiếm hoa tâm cũng không được đứng yên.</strong> Đúng lúc thì chuyển linh hoạt giữa đường sườn và trung lộ để phá nhịp phòng thủ — như Mã Chốt thắng Pháo đơn Tượng: Chốt ở đường sườn hạn chế Pháo Đen ở tuyến hoành 2, rồi mới kích sát.</li>
<li><strong>Tả Chốt hữu Tướng</strong> rất thực dụng khi quân còn khá nhiều, như tàn Mã Chốt. Dĩ nhiên mục tiêu cuối cùng của Chốt vẫn là chiếm hoa tâm.</li>
</ol>`,
    },
  },
};
