module.exports = (h) => ({
  slug: 'phao-dau-co-tuong-cach-di-va-cach-pha',
  title: 'Pháo Đầu Trong Cờ Tướng: Cách Đi, Ý Đồ Và Cách Phá Cho Bên Đen',
  seo_title: 'Pháo Đầu Cờ Tướng: Cách Đi Và Cách Phá Pháo Đầu',
  seo_description: 'Pháo đầu (Trung pháo) là khai cuộc phổ biến nhất cờ tướng. Tìm hiểu ý đồ, các cách triển khai của Đỏ và cách phá Pháo đầu cho Đen, có bàn cờ đi từng nước.',
  excerpt: 'Pháo 2 bình 5 — nước mở đầu quen thuộc nhất của cờ tướng. Bài viết giải thích vì sao Pháo đầu mạnh, Đỏ triển khai tiếp thế nào (trực Xe, hoành Xe, Xe quá hà), và bên Đen có những cách phá Pháo đầu nào hiệu quả, kèm bài học đi từng nước.',
  og: { fen: 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C2C4/9/RNBAKABNR', last: 'h2e2', title: 'Pháo đầu — cách đi và cách phá' },
  content: `
<p><strong>Pháo đầu</strong> (còn gọi là Trung pháo) là khai cuộc phổ biến nhất trong cờ tướng: ngay nước đầu, Đỏ đưa Pháo vào đường giữa bằng nước <strong>Pháo 2 bình 5</strong>. Từ phong trào tới các giải đấu lớn, Pháo đầu luôn xuất hiện với tần suất cao nhất. Bài viết giải thích ý đồ của Pháo đầu, các cách triển khai của Đỏ và <strong>cách phá Pháo đầu</strong> cho bên Đen.</p>
${h.FEN('rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C2C4/9/RNBAKABNR', 'Pháo 2 bình 5: Pháo Đỏ vào trung lộ, nhắm Tốt đầu và cung Đen.')}

<h2>Vì sao Pháo đầu mạnh?</h2>
<ul>
<li><strong>Đánh vào điểm yếu nhất đầu ván.</strong> Tốt đầu (Tốt lộ 5) của Đen chỉ được bảo vệ khi Mã đã lên. Nếu Đen không lo phòng thủ, Pháo Đỏ nhảy qua Tốt nhà ăn ngay Tốt đầu (Pháo 5 tiến 4).</li>
<li><strong>Khống chế trung lộ.</strong> Pháo ở giữa gây áp lực thẳng lên cung, kìm Sĩ Tượng của Đen, và là "nền" cho các đòn sát trung lộ sau này.</li>
<li><strong>Ý đồ rõ ràng, dễ học.</strong> Người mới cầm Đỏ chỉ cần nhớ: Pháo vào giữa, lên Mã bảo vệ Tốt đầu của mình, ra Xe thật nhanh.</li>
</ul>

<h2>Đỏ triển khai Pháo đầu thế nào?</h2>
<p>Sau Pháo 2 bình 5, Đỏ thường lên Mã 2 tiến 3 để giữ Tốt đầu nhà, rồi ra Xe. Có ba hướng ra Xe chính:</p>
<ul>
<li><strong>Trực Xe:</strong> Xe 1 bình 2 rồi tiến thẳng theo lộ 2, áp sát cánh Đen — ví dụ ${h.L('phao-dau-doi-binh-phong-ma-ta-phao-phong-xe-khai-cuoc-de-nho-cho-nguoi-moi', 'biến Tả Pháo Phong Xe')}.</li>
<li><strong>Hoành Xe:</strong> Xe tiến một bước rồi đi ngang sang cánh khác, linh hoạt hơn — ${h.L('trung-phao-hoanh-xe-that-lo-ma-doi-binh-phong-ma-nhac-xe-truoc-khi-hoanh')}; uy lực của nước này được phân tích trong ${h.L('uy-luc-cua-hoanh-xe-chiem-suon')}.</li>
<li><strong>Xe quá hà:</strong> Xe vượt sông sớm để gây áp lực trực tiếp, lối đánh nhanh và sắc — ${h.L('phao-dau-doi-binh-phong-ma-bien-xe-qua-ha-loi-choi-tan-cong-nhanh')}.</li>
</ul>
<p>Pháo thứ hai của Đỏ cũng có nhiều chỗ đứng: lộ 7 (Ngũ thất pháo), lộ 9 (Ngũ cửu pháo), lộ 6 (Ngũ lục pháo)… Mỗi cách tạo một kiểu thế trận riêng, xem tổng quan ở ${h.N('cac-the-khai-cuoc-co-tuong-pho-bien', 'các thế khai cuộc phổ biến')}.</p>

<h2>Cách phá Pháo đầu 1: Bình Phong Mã</h2>
<p>Đây là cách đáp phổ biến và an toàn nhất. Đen lên cả hai Mã (Mã 8 tiến 7, Mã 2 tiến 3) đứng hai bên trước cung, cùng bảo vệ Tốt đầu. Đội hình vững, cân đối, sau đó Đen ra Xe và tìm cơ hội phản công ở hai cánh.</p>
${h.B('phao-dau-doi-binh-phong-ma-bien-ma-bien-loi-choi-cham-ma-chac')}
<p>Các biến hay gặp trong Pháo đầu đối Bình Phong Mã:</p>
<ul>
<li>${h.L('phao-dau-doi-binh-phong-ma-ma-ngoai-phong-xe-phong-toa-ma-khong-khoa-xe', 'Mã ngoài phong Xe')} — chặn đường Xe Đỏ mà không tự khóa Xe mình.</li>
<li>${h.L('phao-dau-doi-binh-phong-ma-tuan-ha-phao-vi-tri-kien-co-ben-bo-song', 'Tuần hà pháo')} — đặt Pháo ở bờ sông làm chốt chặn.</li>
<li>${h.L('luon-la-kinh-dien-ta-ma-ban-ha-doi-trung-phao-qua-ha-xe', 'Tả Mã bàn hà')} — biến kinh điển chống Xe quá hà.</li>
<li>${h.L('phao-dau-doi-binh-phong-ma-phe-ma-cuoc-chap-nhan-diem-yeu-co-tinh-toan', 'Phế Mã cuộc')} — Đỏ chấp nhận thí Mã để lấy thế.</li>
</ul>

<h2>Cách phá Pháo đầu 2: Thuận pháo (Pháo đầu đối Pháo đầu)</h2>
<p>Thay vì phòng thủ, Đen cũng đưa Pháo vào giữa, đối công trực diện. Lối chơi này sắc bén, nhiều biến phức tạp, hợp với người thích đánh nhau từ sớm. Đen phải tính toán chính xác vì chậm một nhịp là bị Pháo đầu Đỏ dồn ép. Xem ${h.L('noi-don-gian-ve-thuan-phao-va-nghich-phao')} để phân biệt thuận pháo và nghịch pháo, và ${h.L('bo-cuc-dinh-thuc-thuan-phao-truc-xe-doi-cham-ra-xe', 'định thức Thuận pháo trực Xe')}.</p>

<h2>Cách phá Pháo đầu 3: Phản cung mã và Tả Pháo phong Xe</h2>
<ul>
<li><strong>Phản cung mã:</strong> một Mã lên, một Pháo vào lộ Sĩ, Mã còn lại lên sau. Đội hình lệch nhưng mềm dẻo — ${h.L('trung-phao-doi-phan-cung-ma-khi-bo-si-som-khong-con-la-sai-lam')}, ${h.L('ngu-that-phao-doi-phan-cung-ma-phe-song-chot-lay-nhanh-danh-cham')}.</li>
<li><strong>Tả Pháo phong Xe:</strong> Đen dùng Pháo chặn đường tiến của Xe Đỏ — ${h.L('phao-dau-doi-ta-phao-phong-xe-song-phao-phong-xe-nuoc-co-mao-hiem-hai-mat')}.</li>
</ul>

<h2>Những lỗi hay gặp khi đối đầu Pháo đầu</h2>
<ul>
<li><strong>Quên giữ Tốt đầu.</strong> Đen đi nước khác mà chưa lên Mã, để Pháo Đỏ ăn Tốt đầu miễn phí và Pháo đó đứng sát cung.</li>
<li><strong>Ra Sĩ Tượng quá sớm.</strong> Lên Sĩ Tượng phòng thủ trước khi ra Mã Xe làm chậm cả thế trận — xem ${h.L('sai-lam-xuat-quan-thuong-gap-khi-bo-si-tuong-som-hon-xe-phao')}.</li>
<li><strong>Để Xe nằm im ở góc.</strong> Bên nào chậm ra Xe thường bị dồn ép; ra Xe trễ phải có lý do rõ ràng — ${h.L('truong-hop-cuc-doan-cua-cham-ra-xe-sau-nuoc-khong-dung-den-xe', 'trường hợp chậm ra Xe cực đoan')}.</li>
<li><strong>Cầm Đỏ nhưng tấn công khi chưa đủ quân.</strong> Pháo đầu đơn độc không thắng được; phải có Mã Xe hỗ trợ.</li>
</ul>

<h2>Luyện Pháo đầu trên web</h2>
<p>Cách nhanh nhất để nhớ khai cuộc là dùng nó trong ván thật. Học 2–3 bài ở trên, sau đó ${h.F('/choi-voi-may', 'chơi với máy')} cầm Đỏ và luôn mở đầu bằng Pháo 2 bình 5. Sau ván, mở ${h.F('/tai-khoan/lich-su-van-dau', 'lịch sử ván đấu')}, bấm "Phân tích ván" để xem chỗ nào lệch khỏi nguyên tắc. Đổi bên cầm Đen để tập Bình Phong Mã. Toàn bộ bài khai cuộc nằm ở trang ${h.P('khai-cuoc', 'Khai cuộc')}.</p>

<h2>Câu hỏi thường gặp</h2>
<h3>Pháo đầu là gì?</h3>
<p>Pháo đầu (Trung pháo) là khai cuộc mà Đỏ đưa Pháo vào đường giữa ngay nước đầu (Pháo 2 bình 5), nhắm vào Tốt đầu và cung của Đen. Đây là khai cuộc phổ biến nhất trong cờ tướng.</p>
<h3>Cách phá Pháo đầu hiệu quả nhất?</h3>
<p>Bình Phong Mã là cách phá Pháo đầu vững chắc và phổ biến nhất: Đen lên cả hai Mã bảo vệ Tốt đầu rồi ra Xe. Thuận pháo (Pháo đầu đối Pháo đầu) sắc bén hơn nhưng cần tính toán kỹ.</p>
<h3>Người mới cầm Đỏ có nên luôn đi Pháo đầu?</h3>
<p>Có, nên bắt đầu với Pháo đầu vì ý đồ rõ ràng và dễ học nguyên tắc ra quân. Khi đã vững, bạn có thể thử thêm Phi Tượng hay Tiên nhân chỉ lộ để đa dạng lối chơi.</p>
<h3>Thuận pháo và nghịch pháo khác nhau thế nào?</h3>
<p>Cả hai đều là Pháo đầu đối Pháo đầu. Điểm khác là phía Pháo Đen vào giữa so với Pháo Đỏ, dẫn tới thế trận và kế hoạch khác nhau. Bài "Nói đơn giản về thuận pháo và nghịch pháo" trên web giải thích có bàn cờ minh họa.</p>
`,
});
