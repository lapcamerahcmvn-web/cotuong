// Bài 24 — Chiến thuật chủ yếu cờ tàn: nước chờ. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Chiến Thuật Chủ Yếu Cờ Tàn: Nước Chờ',
  y: 'Nước chờ là chiến thuật đặc thù của tàn cuộc: nhường đối phương đi khi họ chỉ còn nước xấu. Kết hợp với kìm chế và với luật cờ thì thành vũ khí kết thúc ván.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Nước Chờ — Chiến Thuật Riêng Của Tàn Cuộc',
      s: 'Ở trung cuộc không ai "không đi" để đối thủ tới sát mình; ở tàn cuộc thì một nước lãng phí thời gian (như lùi Tướng) có thể khốn chết Tướng đối phương.',
      c: `<p>Kìm chế là chiến thuật thông dụng; bài này bàn <strong>nước chờ</strong> — chiến thuật đặc thù của tàn cuộc. Vì sao không dùng ở trung cuộc? Trung cuộc hai bên liều sống chết, đột nhiên "không đi" để đối thủ tới sát thì chẳng khác đầu hàng. Tàn cuộc thì khác: nhiều lúc có thời gian lãng phí.</p>
<p>Bàn cờ: Mã Đỏ đối diện Tướng trơ trọi, chưa chiếu bí được. Nếu không biết dùng nước chờ, Đỏ "không đi gì" mà chỉ tùy tiện lùi Tướng — nước chẳng có tác dụng gì, thuần túy lãng phí thời gian — lại trực tiếp khốn chết Tướng Đen. Đó là chỗ thú vị của tàn thực dụng.</p>
<p>Không có nước chờ thì rất nhiều tàn không thắng được. Kìm chế và nước chờ có quan hệ vi diệu: ở bài trước, Đỏ khốn chết Đen bằng kìm chế, nhưng nguyên nhân chính là Đen <strong>không còn nước chờ</strong> để đi. Nước chờ còn gọi là nước rỗi; không có quân dư để đi nước rỗi thì có nguy cơ bị khốn. Bài này đi vào nước chờ bản nâng cấp.</p>`,
      k: { 1: 'Nước chờ — tưởng lãng phí thời gian nhưng khốn chết Tướng Đen.' },
      kq: 'thang', p: 'do',
    },
    '2 PHAO CHOT kheo thang XE MA': {
      t: 'Pháo Chốt Khéo Thắng Xe Mã — Nước Chờ Kết Hợp Luật Cờ',
      s: 'Không có Sĩ thì Pháo Chốt không thắng nổi Mã. Đỏ dùng nước chờ ép Xe Đen chỉ còn hai điểm đi, buộc Đen chiếu dài — mà chiếu dài thì bị xử thua.',
      c: `<p><strong>Phân tích</strong>: Đỏ Pháo Chốt, Đen Xe Mã. Đỏ có thể bình Pháo đánh Xe ngay, nhưng như đã nói: không có Sĩ thì Pháo Chốt không thắng nổi Mã. Phải dùng nước chờ — nhưng chỉ chờ thì chưa đủ, vì Xe Đen còn đi được.</p>
<p>Xe Đen đi được nhưng chỉ còn <strong>hai điểm</strong>; Đỏ lợi dụng hai điểm đó ép Đen thành <strong>chiếu dài</strong>. Đen không muốn chiếu dài nhưng không còn cách — luật là luật, chiếu dài bị xử thua.</p>
<p>Nước chờ kết hợp luật cờ là nước chờ bản nâng cấp. Ít gặp trong thực chiến, nhưng nắm mạch tính này có thể giúp thắng những ván trước đây không thắng nổi.</p>
<p><em>Lưu ý: kết quả ở đây do luật cờ (cấm chiếu dài) quyết định — bàn cờ chỉ minh họa diễn biến, không phải thế chiếu bí.</em></p>`,
      k: { 8: 'Xe Đen chỉ còn hai điểm đi; Đỏ ép Đen thành chiếu dài — theo luật, Đen bị xử thua.' },
      kq: 'thang',
    },
    '3 VAN XUAN LAM thang HAC KE SIEU': {
      t: 'Ván Chọn: Vạn Xuân Lâm Thắng Hách Kế Siêu — Đơn Xe Sĩ Tượng Đấu Pháo Mã',
      s: 'Pháo sau lưng Tướng, Sĩ giữa, Mã giữ Sĩ ở tuyến đáy — kết cấu vững chắc. Đỏ dùng nước chờ kết hợp luật cờ ép Đen phải đổi nước, tự phá hình, rồi khốn chết.',
      c: `<p><strong>Phân tích cục diện</strong>: thế rất hiếm gặp. Pháo Đen sau lưng Tướng — Đỏ không thể chiếu trước mặt Tướng Đen; Đen có một Sĩ giữa lẻ loi dễ bị đánh nên đặt Mã ở tuyến đáy giữ — kết cấu vững chắc thú vị. Đi theo cách truyền thống thì không thắng được: muốn đánh Mã thì Xe phải sang, Mã nhảy lên; muốn quay sang Sĩ thì Mã lại lui về giữ. Đỏ chỉ có một Xe, binh lực có hạn.</p>
<p>Thử phân tích: Xe tiến khống chế đường lui của Tướng Đen; Mã không đi được, bỏ Sĩ thì Xe bắt Mã — Đen chỉ có thể đưa Pháo qua lại, cuối cùng chỉ còn một ô Pháo bình 5. Hạn chế nốt ô này là khốn chết được — nhưng một Xe mà kìm bốn quân thì quá khó. Vậy là không thắng được?</p>
<h2>Thực chiến: dùng luật cờ</h2>
<p>Đỏ khéo léo dùng luật: bố trí để Sĩ Tượng nhà thoát cản, khiến hai nước Pháo của Đen đều là "đánh quân" — đuổi dài phạm luật — dù rõ ràng Đen không có khả năng ăn Sĩ Tượng. Có hợp lý không? Ván đấu năm 2013; luật cờ liên tục điều chỉnh, luật hiện hành có điều khoản "phòng thủ điểm yếu hại" không tính là đánh quân. Chỉ cần biết: thời điểm đó Đen bị phán phải đổi nước; và nếu gặp hình tương tự, hãy học Đỏ tạo khó khăn cho đối phương, đẩy việc khó cho trọng tài.</p>
<p><strong>Tinh túy của nước chờ</strong>: dùng khi đối phương chỉ còn một nước đi. Nếu đối phương còn nhiều lựa chọn mà ta đi nước chờ thì chẳng khác nhường tiên. Dùng đúng là ép đối phương đi khi đi còn tệ hơn không đi — không đi thì không sao, đi là thua.</p>
<p>Sau đó Đỏ trói chặt toàn bộ Mã Pháo Sĩ Tượng Đen, thêm một nước chờ, Sĩ Đen tất mất. Phân tích thêm: chỉ cần bên Xe có Sĩ Tượng (tốt nhất song Tượng và một Sĩ), Pháo Mã không thủ hòa được.</p>
<p><em>Lưu ý: ván này thắng nhờ áp dụng luật cờ của thời điểm thi đấu.</em></p>`,
      k: { 1: 'Không rõ ý đồ.', 10: 'Hình trận gần giống thế vừa phân tích.', 23: 'Đỏ khéo léo lợi dụng luật: bố trí để Sĩ Tượng nhà thoát cản, khiến các nước Pháo của Đen thành đuổi dài — Đen phải đổi nước.', 24: 'Đen không còn cách nào khác, buộc phải đổi nước, tự phá hình trận.', 29: 'Lại là một nước chờ — Đen chỉ còn đúng một nước đi.', 33: 'Trói chặt toàn bộ Mã Pháo Sĩ Tượng Đen, thêm một nước chờ — Sĩ Đen tất mất.', 63: 'Đơn Xe đấu Pháo Mã: sách thường bàn trường hợp bên công chỉ có Xe trơ trọi; thực chiến hiếm thế. Bên Xe có Sĩ Tượng thì Pháo Mã không thủ hòa được.' },
      v: { 0: { 1: 'Phân tích: Xe tiến khống chế đường lui của Tướng.', 3: 'Xe lui chiếu — hình trận Đen bất ổn.' }, 1: { 1: 'Bỏ Sĩ…', 2: '…Xe bắt Mã — kết cấu vững chắc tan vỡ.' }, 2: { 5: 'Đen chỉ còn một ô Pháo bình 5 để đi.' } },
      kq: 'thang',
    },
    '4 XE SI TUONG TOAN tat thang MA PHAO': {
      t: 'Xe Sĩ Tượng Toàn Tất Thắng Mã Pháo',
      s: 'Kể cả khi Tướng và Pháo Đen ở đường sườn, Mã giữ linh hoạt — vẫn không hòa được. Hai bước: đuổi Mã sang cánh phải, rồi dùng nước chờ và luật cờ ép Mã "chuyển nhà".',
      c: `<p>Ở ván vừa rồi, có lẽ bạn thấy Tướng và Pháo Đen ở trung lộ nên thủ không tốt. Vậy nếu ở đường sườn, Mã lộ 3 giữ linh hoạt thì hòa được không? <strong>Không</strong>.</p>
<h2>Hai bước</h2>
<ol>
<li><strong>Đuổi Mã Đen sang cánh phải</strong> để Mã, Pháo, Tướng ở cùng một bên — nhiều cơ hội lợi dụng. Muốn làm được phải có Sĩ Tượng, đặc biệt là Tượng trợ giúp. Đuổi Mã thật ra không dễ: đuổi một vòng không có tác dụng, Đỏ điều chỉnh mạch tính; bình 8 (không bình 9) để Mã Đen không tiến được; dùng nước chờ xem thái độ.</li>
<li><strong>Ép Mã "chuyển nhà"</strong> bằng luật cờ: Đỏ "một bắt một chặn", mục đích thật là lui Xe giữ Mã; Mã không muốn chuyển nhà thì phải quay về, nhưng quay về lại vừa khéo đuổi Xe — thành đuổi dài. Đen không phải chỉ thủ điểm trọng yếu mà Mã thật sự sắp ăn Xe, nên không thể cầu hòa bằng lặp nước.</li>
</ol>
<p>Hoàn thành điều chỉnh, Đỏ tung đòn cuối: nước chờ ép Mã — Mã lui thì Tướng bình, Mã tiến biên thì Xe lui bắt chết.</p>`,
      k: { 8: 'Đuổi Mã đi không dễ: đuổi một vòng không có tác dụng — Đỏ điều chỉnh mạch tính.', 11: 'Bình 8 tinh tế: bình 9 thì Mã Đen còn nhảy lên được — không cần thiết.', 13: 'Nước chờ, xem Đen bày tỏ thái độ.', 16: 'Tiếp theo Đỏ dùng thủ đoạn "thần diệu" ép Mã Đen chuyển nhà.', 27: 'Chẳng có gì thần diệu — vẫn là luật cờ: bình 6 để rồi lui Xe giữ Mã. Mã quay về lại đuổi Xe — thành đuổi dài; Mã Đen thật sự sắp ăn Xe nên không thể cầu hòa.', 49: 'Hoàn thành điều chỉnh — tung đòn cuối!', 50: 'Nếu Mã lui 6, Tướng bình, Tướng Đen vào, Xe bình, Pháo tiến, Tượng lên — Đỏ thắng.', 53: 'Nước chờ: Đen chỉ có thể lui Mã, Tướng Đỏ bình; nếu Mã tiến biên thì Xe lui bắt chết.' },
      v: { 2: { 1: 'Nếu Mã lui 6…', 6: '…Đỏ thắng.' }, 3: { 1: 'Nếu Mã tiến biên…', 2: '…Xe lui bắt chết Mã.' } },
      kq: 'thang',
    },
    '5 TRONG DIEM BAI HOC': {
      t: 'Trọng Điểm Bài 24: Nước Chờ, Kìm Chế Và Luật Cờ',
      s: 'Kìm chế và nước chờ phối hợp thành đòn chí mạng; nước chờ cao cấp kết hợp luật cờ; bên thủ đôi khi giữ một Chốt để có nước rỗi.',
      c: `<ol>
<li><strong>Nước chờ và kìm chế hợp tác chặt chẽ.</strong> Như đơn Xe đấu Pháo Mã: gần như mọi kết quả đều là kìm chế khiến Pháo Mã bị khốn, rồi một nước chờ kết thúc. Phối hợp này hợp với rất nhiều tàn thực dụng — có thể xem là đòn sát chí mạng.</li>
<li><strong>Nước chờ cao cấp phối hợp với luật cờ.</strong> Khéo dùng luật thì phát huy giá trị lớn nhất của nước chờ — đến mức đối phương đổi nước cũng thua mà không đổi cũng thua.</li>
<li><strong>Với bên thủ, đôi khi giữ một Chốt rất quan trọng</strong>: không còn gì thì dễ bị kìm chế và nước chờ khốn chết; còn một Chốt là còn nước rỗi để đi. Ví dụ quen thuộc nhất: đơn Mã khó thắng đơn Chốt — vì Chốt có thể đi nước rỗi.</li>
</ol>`,
    },
  },
};
