// Bài 42 — Xe Mã đấu Xe song Tượng. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Xe Mã Đấu Xe Song Tượng — Viên Ngọc Trên Vương Miện',
  y: 'Tàn cuộc được ví như "giả thuyết Goldbach" của cờ tướng: thực chiến thắng – hòa gần 50–50. Xe Mã Sĩ Tượng toàn thắng được, nhưng phải huy động mọi quân — nhất là Tướng trợ công — và nhớ các hình cờ bất lợi của bên thủ.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Xe Mã Đấu Xe Song Tượng',
      s: 'Tàn cuộc "viên ngọc trên vương miện" của cờ tướng: không quá khó mà tỷ lệ đánh sai trong thực chiến cực cao, kết quả các giải xưa nay gần 50–50. Bài này giải thích logic giành thắng và vài thủ đoạn chiến thuật chính.',
      c: `<p>Có một tàn cuộc được gọi là <strong>"viên ngọc trên vương miện của tàn cuộc cờ tướng"</strong>, được ví như "giả thuyết Goldbach" trong lý thuyết số: <strong>Xe Mã đấu Xe song Tượng</strong>. Điều khiến người ta tuyệt vọng là tàn cuộc này không quá khó mà tỷ lệ đánh sai trong thực chiến lại cực cao. Thống kê các giải xưa nay, thắng – hòa cơ bản tương đương, 50–50; cả nghiên cứu lẫn thành tích thi đấu đều không đưa ra được kết luận chắc chắn.</p>
<p>Có những người nghiên cứu đã dành hơn hai mươi năm để phá giải nan đề này, với hàng trăm cuộc biến hóa — khó tưởng tượng một tàn cuộc trông đơn giản lại phát sinh nhiều biến đến vậy. Nhưng thẳng thắn mà nói, với đại đa số người chơi, khả năng học trọn tàn cuộc này không nhiều.</p>
<p>Bài này đứng ở góc độ người học, thử giải thích <strong>logic giành thắng</strong>: nắm vài con đường chính, xác định đúng hướng tấn công và vận dụng thuần thục vài thủ đoạn đặc biệt là đã khá tốt.</p>`,
    },
    '2 TUYEN CUOC DUONG QUAN LAN tien hoa LIEU DAI HOA': {
      t: 'Ván Dương Quan Lân – Liễu Đại Hoa: Bỏ Sĩ Để Tướng Trợ Công',
      s: 'Một cục diện kinh điển từ giải đấu năm 1981 (thực chiến hòa). Phân tích về sau cho thấy Đỏ thắng được nếu bỏ Sĩ: Tướng là chủ lực tấn công, Sĩ cản Xe phòng Đen chiếu; song Tượng Đen mất liên kết là không xong.',
      c: `<p>Cục diện này xuất hiện ở một giải đấu năm 1981 giữa Dương Quan Lân và Liễu Đại Hoa (thực chiến hòa), về sau được phân tích kỹ. Đường chính dưới đây là cách Đỏ <strong>thắng được</strong>: phải bỏ Sĩ.</p>
<h2>Vì sao phải bỏ Sĩ?</h2>
<p>Dùng kỳ lý mà xét: Xe Mã đấu Xe song Tượng là "nan đề" vì binh lực nằm ở giữa — có thể thắng, có thể hòa. <strong>Tướng tuyệt đối là chủ lực tấn công</strong> — không phát huy uy lực của Tướng thì chắc chắn không thắng. Sĩ Tượng cũng phải phát huy đủ giá trị: chống Sĩ cản Xe, phòng Đen tiến Xe chiếu Tướng.</p>
<p>Vấn đề lớn nhất của Đen: <strong>song Tượng mất liên kết</strong>, và Tướng Đen ở tầng 1 cũng là mối họa ngầm. Tướng Đỏ đã lộ diện nên Đen không thể lui Xe trốc Mã (Xe Đỏ bình ăn Tượng), cũng không ăn được Mã (Xe bình "bạch kiểm Tướng" sát). Đi thành như vậy coi như thắng tàn cuộc. Thực chiến Đỏ không có thủ đoạn chống Sĩ nên hòa — nhưng nghiên cứu này về sau đã được dùng trong thi đấu.</p>`,
      k: { 2: 'Cục diện kinh điển — Đỏ muốn thắng phải bỏ Sĩ.', 3: 'Vì sao bỏ Sĩ? Tướng là chủ lực tấn công — không phát huy Tướng thì không thể thắng; Sĩ chống lên cản Xe, phòng Đen tiến Xe chiếu Tướng. Vấn đề lớn nhất của Đen: song Tượng mất liên kết, Tướng ở tầng 1 cũng là mối họa ngầm.', 9: 'Tượng Đen mất liên kết là vấn đề rất lớn: Tướng Đỏ lộ diện nên Đen không lui Xe trốc Mã được (Xe Đỏ ăn Tượng), cũng không ăn Mã được (bạch kiểm Tướng sát). Coi như thắng tàn cuộc.', 21: 'Tướng Đen đã ở tầng 3, song Tượng không thể liên kết — chắc chắn không xong. Thực chiến không có nước chống Sĩ nên hòa; nghiên cứu này về sau được dùng trong thi đấu.' },
      v: { 0: { 1: 'Nếu Xe lui trốc Mã…', 2: '…Xe bình ăn Tượng.', 4: 'Không ăn được Mã — bạch kiểm Tướng.' } },
    },
    '3 TUYEN CUOC LY LAI QUAN thang TRIEU QUOC VINH': {
      t: 'Ván Chọn: Lý Lai Quần Thắng Triệu Quốc Vinh — Không Kịp Hạ Tượng',
      s: 'Cùng hình cờ, Đen sơ ý không kịp hạ Tượng về thì thua ngay; Đỏ chọn cách thắng đơn giản khác — thực chiến chứng minh cục diện ban đầu Đen tất bại.',
      c: `<p>Cùng một hình cờ (Đen thêm Chốt đáy). Đen sơ ý không kịp thời <strong>hạ Tượng về</strong> — lập tức thua. Đỏ chọn một cách thắng đơn giản khác, cũng rất lợi hại. Thực chiến chứng minh: từ cục diện ban đầu Đen đã tất bại.</p>`,
      k: { 4: 'Đen sơ ý không kịp thời hạ Tượng về — lập tức thua.', 19: 'Đỏ chọn cách thắng đơn giản khác — cũng rất lợi hại.', 27: 'Thực chiến chứng minh: từ cục diện ban đầu Đen đã tất bại.' },
      kq: 'do',
    },
    '4 VI DU CACH PHONG THU KIEN CUONG NHAT CUA BEN DEN': {
      t: 'Ví Dụ: Cách Thủ Kiên Cường Nhất Của Đen — Và Cách Phá',
      s: 'Đen kịp liên kết song Tượng. Đỏ ngưng ngắt ép Tướng Đen về tầng 1, kìm cờ Đen, phế liền hai Sĩ để Mã từ quải giác nhảy vào ngọa tào, rồi Xe vào trung lộ chiếu ăn Tượng — Đen biết mà bất lực.',
      c: `<p>Qua hai ván, ta hiểu yếu lĩnh thắng của Xe Mã Sĩ Tượng toàn đấu Xe song Tượng; nhưng nếu bên thủ không có sách lược hiệu quả thì đã chẳng gọi là tàn cuộc khó. Xem cách thủ kiên cường nhất của Đen.</p>
<ul>
<li>Tượng Đen đã liên kết — nhưng Đỏ vẫn thắng được. Tượng Đen hạ xuống, Đỏ tiến Mã, lên kế hoạch công kích song Tượng.</li>
<li>Ngưng ngắt ép Tướng Đen lui về tầng 1 — rất tinh tế: Tướng Đen ở tầng 1 thì Đỏ có nước tiến Mã; và để Tướng Đen cách xa Tượng có lợi cho Đỏ.</li>
<li><strong>Hình then chốt</strong>: Xe Mã dần khống chế Xe song Tượng. Đặc điểm giai đoạn này: Tướng Đen ở tuyến đáy, Tướng và Tượng sát nhau — Đỏ có cơ hội ăn Tượng. Điều kiện chưa chín; sau khi kìm cờ Đen, Đỏ nhảy Mã vào <strong>ngọa tào</strong>.</li>
<li>Phế liền hai Sĩ — giá trị không nhỏ, nhưng Đỏ đã tính rõ: chỉ cần Mã vào được ngọa tào là thắng; thu hoạch lớn nhất là Đen không thể lên Tướng. Hiểu vì sao Đen không ăn được Sĩ là tư duy rất quan trọng.</li>
<li>Mã quải giác nhảy vào ngọa tào, ngắm Tượng giữa. Nước sát thật sự: chuẩn bị Xe vào trung lộ rồi chiếu ăn Tượng — kế hoạch rõ ràng, hành động chậm, thường bị đối thủ phát giác; nhưng ở đây Đen biết mà bất lực. Nếu Mã vẫn ở quải giác thì Đen phi Tượng lên là công sức đổ sông — thấy rõ tầm quan trọng của ngọa tào.</li>
</ul>
<h2>Hình cờ bất lợi cần nhớ</h2>
<p>Hình phòng thủ kém nhất của Đen: <strong>Tướng ở tuyến đáy, Tượng ở ngay bên cạnh</strong> — lúc nào cũng có thể bị ép thành Tướng tự chặn mắt Tượng, rất dễ thua. Biến hóa Xe Mã đấu Xe song Tượng quá phức tạp, không thể học thuộc kỳ phổ; cách tốt nhất là nhớ vài hình cờ bất lợi của bên thủ rồi tìm cách ép đối phương vào đó. Ngược lại, bên thủ cố tránh những hình xấu này — đáng sợ nhất là không hiểu mà tự đi vào.</p>`,
      k: { 1: 'Bên thủ không có sách lược thì đã chẳng là tàn cuộc khó — xem cách thủ kiên cường nhất của Đen.', 2: 'Tượng Đen đã liên kết — nhưng Đỏ vẫn có thể thắng.', 6: 'Tượng Đen hạ xuống; Đỏ tiến Mã, lên kế hoạch công kích song Tượng.', 11: 'Ngưng ngắt ép Tướng Đen về tầng 1 — rất tinh tế: Tướng tầng 1 thì Đỏ có nước tiến Mã; để Tướng Đen cách xa Tượng có lợi cho Đỏ.', 18: 'Nếu Tướng sang 6 thì Xe Mã liên hoàn — Đen không phòng được Mã đạp Tượng, Đỏ thắng.', 27: 'Hình then chốt: Xe Mã dần khống chế Xe song Tượng. Tướng Đen ở tuyến đáy, Tướng và Tượng sát nhau — Đỏ có cơ hội ăn Tượng. Điều kiện chưa chín: tiếp theo nhảy Mã vào ngọa tào.', 30: 'Hiểu được vì sao Đen không thể ăn Sĩ là tư duy rất quan trọng.', 33: 'Phế liền hai Sĩ — giá trị không nhỏ, nhưng chỉ cần Mã vào được ngọa tào là thắng. Thu hoạch lớn nhất: Đen không thể lên Tướng.', 37: 'Mã từ quải giác nhảy vào ngọa tào — ngắm Tượng giữa Đen.', 41: 'Nước sát thật sự: chuẩn bị Xe vào trung lộ rồi chiếu ăn Tượng. Kế hoạch rõ ràng mà Đen biết cũng bất lực. Nếu Mã vẫn ở quải giác thì Đen phi Tượng — công cốc.', 44: 'Bình 8 chờ Đỏ vào trung lộ thì lui Xe.', 45: 'Cách thắng rất đơn giản.', 47: 'Đen tất mất Tượng. Hình thủ kém nhất: Tướng ở tuyến đáy, Tượng ngay bên cạnh — dễ bị ép thành Tướng tự chặn mắt Tượng.' },
      v: { 0: { 1: 'Nếu Tướng sang 6…', 2: '…Xe chiếu…', 10: '…Mã lui phục đòn Xe chiếu cho Mã đạp Tượng.', 14: 'Đen không phòng được nước Mã tiếp theo — Đỏ thắng.' }, 1: { 1: 'Nếu Xe vào trung lộ…', 2: '…Xe Đen lui chặn.' } },
      kq: 'do',
    },
    '5 LOI DUNG LUAT CO PHA VI TRI XE DEN': {
      t: 'Ví Dụ: Lợi Dụng Luật Cờ Phá Xe Giữ Đường Sườn',
      s: 'Xe Đen giữ đường sườn uy lực rất lớn. Đỏ tiến Tướng chiếm trung lộ, đặt Sĩ để Xe Đen bình sang là dọa Sĩ — theo luật Đen không được "một chiếu một trốc" mãi nên phải đổi biến; Xe rời đường sườn là thua.',
      c: `<p>Xe Đen thủ ở <strong>đường sườn</strong> uy lực cực lớn — Đỏ có ép nó rời đi được không?</p>
<p>Đỏ <strong>lợi dụng luật cờ</strong>: tiến Tướng chiếm trung lộ — Tướng Đỏ ở trung lộ uy hiếp lớn nên Đen buộc phải chiếu. Xe Đen về đường sườn thì Sĩ Đỏ đặt sẵn ở đó, Xe bình sang là dọa Sĩ — thành "một chiếu một trốc" lặp lại, theo luật Đen phải đổi biến. Đen kiên quyết không chiếm đường sườn nữa — và hậu quả khi Xe rời đường sườn: Mã điệu ngự, Đen không còn cách phòng thủ.</p>`,
      k: { 4: 'Lợi dụng luật cờ: tiến Tướng chiếm trung lộ, Đen buộc phải chiếu; Xe Đen về đường sườn thì dọa Sĩ — thành một chiếu một trốc, Đen phải đổi biến. Xem hậu quả khi Xe Đen rời đường sườn.', 8: 'Nếu Tướng sang 6 thì Xe vào trung lộ — thắng!', 17: 'Nước sau Mã điệu ngự, Đen không còn cách phòng thủ (Xe vào trung lộ cũng tuyệt sát).' },
      v: { 0: { 1: 'Nếu Tướng sang 6…', 2: '…Xe vào trung lộ — thắng!' } },
      kq: 'do',
    },
    '6 TUYEN CUOC TRANG NGOC DINH thang VU AU HOA': {
      t: 'Ván Chọn: Trang Ngọc Đình Thắng Vu Ấu Hoa — Xe Mã Đơn Sĩ',
      s: 'Về lý Đỏ chỉ một Sĩ thì không đủ thắng, nhưng thực chiến vẫn có cơ hội: Đỏ dọa Mã chiếu, Đen bình Xe sai chỗ (nên lui Xe phòng thủ), Xe bị kẹt lúng túng — Mã đạp Tượng, Đen thua.',
      c: `<p>Về lý thuyết Đỏ chỉ còn <strong>một Sĩ</strong> thì không đủ thắng, nhưng thực chiến vẫn có cơ hội. Cục diện rất dễ xuất hiện: Đỏ chuẩn bị Mã chiếu Tướng, Đen sai lầm — bình Xe là nước bại, đúng ra phải <strong>lui Xe phòng thủ</strong>. Xe Đen bị kẹt ở vị trí lúng túng, Đỏ lúc nào cũng có cơ hội Mã đạp Tượng; cuối cùng dù Đen đi gì, Mã lui đạp Tượng — bại cuộc đã định.</p>`,
      k: { 1: 'Cục diện rất dễ gặp: Đỏ chuẩn bị Mã chiếu Tướng.', 2: 'Nước bại! Nên lui Xe phòng thủ.', 5: 'Xe Đen bị kẹt ở vị trí lúng túng — Đỏ lúc nào cũng có cơ hội Mã đạp Tượng.', 11: 'Dù Đen đi gì, Đỏ đều Mã lui đạp Tượng — Đen bại cuộc đã định.' },
      v: { 0: { 1: 'Lui Xe phòng thủ — nước đúng.' } },
      kq: 'do',
    },
    '7 TRONG DIEM BAI HOC': {
      t: 'Trọng Điểm Bài 42: Huy Động Mọi Quân, Nhớ Hình Bất Lợi',
      s: 'Xe Mã Sĩ Tượng toàn thắng được Xe song Tượng nhưng biến hóa rất phức tạp; phải huy động mọi quân, nhất là Tướng trợ công; bên thủ nên giữ Tượng cao; nhớ các hình then chốt, đánh chắc tiến chắc.',
      c: `<ol>
<li>Kết luận được công nhận hiện nay: <strong>Xe Mã Sĩ Tượng toàn thắng được Xe song Tượng</strong>, nhưng biến hóa quá phức tạp — dù thủ thắng hay thủ hòa đều cần nội công tàn cuộc rất cao.</li>
<li>Bên công có nhiều thủ pháp, nhưng mạch tổng thể là <strong>huy động mọi quân, đặc biệt là Tướng trợ công</strong>; qua các sách lược như ép Tướng tự chặn mắt Tượng, nhấn mạnh khống chế, từng bước ăn mòn. Với bên thủ, Tượng đáy dễ bị tấn công — hình tốt nhất vẫn là <strong>Tượng cao</strong>.</li>
<li>Các cách thắng kinh điển đều cần nhiều bước phức tạp. Thực chiến phải nắm thuần thục vài hình then chốt, <strong>đánh chắc tiến chắc</strong>.</li>
</ol>
<p>Xe Mã đấu Xe song Tượng biến hóa rất phức tạp; bài này chỉ giới thiệu vài mạch tính và biến hóa kinh điển — ai hứng thú có thể tìm tài liệu chuyên khảo để nghiên cứu sâu hơn.</p>`,
    },
  },
};
