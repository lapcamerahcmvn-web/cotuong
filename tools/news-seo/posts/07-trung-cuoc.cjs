module.exports = (h) => ({
  slug: 'trung-cuoc-co-tuong-nguyen-tac-chien-thuat',
  title: 'Trung Cuộc Cờ Tướng: 8 Nguyên Tắc Và Chiến Thuật Người Chơi Cần Nắm',
  seo_title: 'Trung Cuộc Cờ Tướng: 8 Nguyên Tắc Và Chiến Thuật',
  seo_description: 'Trung cuộc cờ tướng là gì, đánh thế nào? 8 nguyên tắc: thẩm cục, chọn thế không chọn quân, tổ hợp quân, điểm đột phá, vây khốn, tranh tuyến… có ví dụ đại sư.',
  excerpt: 'Ra quân xong rồi đi gì tiếp? Đó là câu hỏi của trung cuộc — giai đoạn quyết định phần lớn ván cờ. Bài viết tóm tắt 8 nguyên tắc trung cuộc quan trọng nhất, từ đánh giá thế cờ, chọn mục tiêu, phối hợp quân đến các chiến thuật kinh điển, kèm ván đấu minh họa.',
  og: { lesson: 'to-hop-manh-nhat-xe-phao-ma-van-vu-au-hoa-thang-lu-kham', title: 'Trung cuộc cờ tướng — 8 nguyên tắc và chiến thuật' },
  content: `
<p>Khai cuộc có định thức để học thuộc, tàn cuộc có thế cờ mẫu để luyện. Còn <strong>trung cuộc cờ tướng</strong> — đoạn giữa ván, khi hai bên đã ra quân và bắt đầu giao tranh — thì gần như mỗi ván một khác. Vì thế trung cuộc là nơi phân biệt người chơi mạnh và yếu rõ nhất. Không thể học thuộc trung cuộc, nhưng có thể học <strong>nguyên tắc</strong> và <strong>chiến thuật</strong> để biết mình nên làm gì trong từng tình huống.</p>
<p>Bài viết tóm tắt 8 nguyên tắc cốt lõi, mỗi nguyên tắc dẫn tới bài học có bàn cờ minh họa trên ${h.home}.</p>

<h2>Trung cuộc là gì và bắt đầu từ khi nào?</h2>
<p>Không có ranh giới cứng, nhưng có thể hiểu trung cuộc bắt đầu khi hai bên đã ra gần đủ quân chủ lực (Xe, Mã, Pháo) và bắt đầu tranh chấp trực tiếp; kết thúc khi quân đã đổi bớt nhiều, ván cờ chuyển sang tàn cuộc. Bài ${h.L('trung-cuoc-bao-dien-t1-trung-cuoc-la-gi')} và ${h.L('trung-cuoc-bao-dien-t1-phan-chia-tien-trung-cuoc-hau-trung-cuoc')} phân tích kỹ cách chia giai đoạn này.</p>

<h2>Nguyên tắc 1: Thẩm cục trước khi đi</h2>
<p>Thẩm cục là đánh giá thế cờ: ai hơn quân, ai hơn thế, quân nào đang đứng tốt, quân nào bị kẹt, Tướng bên nào an toàn hơn. Người chơi yếu thường chỉ nhìn nước đi trước mắt; người chơi mạnh hỏi "thế cờ đang thế nào" trước rồi mới tìm nước. Đọc ${h.L('trung-cuoc-bao-dien-t1-y-nghia-tham-cuc')} và ${h.L('trung-cuoc-bao-dien-t1-tham-the-tham-quan-tham-ma-mat-the', 'ví dụ tham Mã mất thế')}.</p>

<h2>Nguyên tắc 2: Chọn thế, không chọn quân</h2>
<p>Ăn được quân không phải lúc nào cũng có lợi. Nếu ăn một Tốt mà Xe bị kéo ra xa, để đối phương tràn vào cung, thì đó là nước lỗ. Ngược lại, thí một quân để có thế tấn công mạnh thường là nước hay. Nguyên tắc này được trình bày trong ${h.L('trung-cuoc-bao-dien-t1-chon-the-khong-chon-quan')}.</p>

<h2>Nguyên tắc 3: Có mục tiêu chiến lược rõ ràng</h2>
<p>Mỗi kế hoạch trung cuộc nên hướng tới một trong các mục tiêu: chiếu hết, giành quyền tiên (chủ động), hơn quân, tạo ưu thế lâu dài, hoặc cầu hòa khi đang yếu. Biết mình đang theo đuổi mục tiêu nào giúp chọn nước đúng hướng — xem ${h.L('trung-cuoc-bao-dien-t1-muc-tieu-chien-luoc-sat-tien-quan-uu-hoa')}.</p>

<h2>Nguyên tắc 4: Phối hợp quân thành tổ hợp</h2>
<p>Một quân đơn độc hiếm khi làm nên chuyện. Sức mạnh trung cuộc đến từ tổ hợp: Xe Pháo Mã phối hợp, Song Xe áp chế, Pháo gánh phòng thủ, liên hoàn Mã khống chế. Ván dưới đây minh họa tổ hợp Xe Pháo Mã:</p>
${h.B('to-hop-manh-nhat-xe-phao-ma-van-vu-au-hoa-thang-lu-kham')}
<p>Xem thêm: ${h.L('to-hop-hai-quan-ba-dao-song-xe-van-lu-kham-thang-vu-au-hoa', 'Song Xe bá đạo')}, ${h.L('to-hop-hai-quan-phong-thu-manh-nhat-phao-ganh-van-hua-ngan-xuyen-thang-ho-vinh-hoa', 'Pháo gánh phòng thủ')}, ${h.L('hai-quan-khong-che-chien-truong-manh-nhat-lien-hoan-ma-van-truong-than-hoang-bai-trieu-ham-ham', 'liên hoàn Mã')}, ${h.L('xe-song-phao-hoa-luc-manh-nhat-van-vuong-ban-bai-ho-vinh-hoa', 'Xe song Pháo')}.</p>

<h2>Nguyên tắc 5: Tranh giành tuyến và điểm then chốt</h2>
<p>Trên bàn cờ có những đường và điểm quan trọng hơn hẳn: trung lộ, tuyến sông (kỵ hà), tuyến Tốt, các lộ 3 và 7, đường đỉnh cung. Ai chiếm được trước thì quân hoạt động thoáng, đối phương bị bó. Các bài minh họa: ${h.L('khong-che-tuyen-ky-ha-van-trieu-quoc-vinh-thang-lieu-dai-hoa', 'khống chế tuyến kỵ hà')}, ${h.L('tam-quan-trong-cua-tuyen-chot-van-hua-ngan-xuyen-thang-hong-tri', 'tuyến chốt')}, ${h.L('tranh-doat-duong-3-7-van-tuong-xuyen-thang-hua-ngan-xuyen', 'tranh đoạt đường 3–7')}, ${h.L('kem-che-tuyen-dinh-cung-van-vuong-thien-nhat-thang-hoang-hai-lam', 'kềm chế tuyến đỉnh cung')}.</p>

<h2>Nguyên tắc 6: Tìm điểm đột phá khi thế cờ giằng co</h2>
<p>Khi hai bên cân bằng, không ai tấn công được ngay, hãy tìm điểm yếu nhỏ nhất của đối phương để tập trung lực lượng vào đó: một Mã đứng biên, một cánh thiếu Sĩ, một Xe chưa ra. "Lấy nhiều đánh ít" ở một khu vực là chìa khóa. Xem ${h.L('diem-dot-pha-trong-cuc-dien-giang-co')} và ${h.L('nguyen-tac-trong-tam-cua-muu-dieu-quan-cuc-bo-lay-nhieu-danh-it-van-trieu-quoc-vinh-thang-hong-tri')}.</p>

<h2>Nguyên tắc 7: Vây khốn quân đối phương</h2>
<p>Không phải lúc nào cũng cần chiếu hết. Vây một quân mạnh của đối phương (Xe đi quá sâu, Mã đứng biên) rồi bắt sống nó cũng thắng được ván cờ. Câu "Mã biên tất vong" (Mã ở biên dễ chết) nói lên điều đó. Xem ${h.L('vay-xe-trong-chien-thuat-vay-khon-xe-van-vuong-lao-cat-hua-ngan-xuyen-thang-truong-cuong', 'vây Xe')}, ${h.L('vay-ma-trong-chien-thuat-vay-khon-ma-bien-thuy-tat-vong-van-hua-ngan-xuyen-thang-ho-vinh-hoa', 'vây Mã biên')}, ${h.L('vay-khon-co-quan-tham-nhap-van-lu-kham-bai-vuong-thien-nhat', 'vây cô quân thâm nhập')}.</p>

<h2>Nguyên tắc 8: Không ngừng chỉnh hình</h2>
<p>Khi chưa có đòn đánh, hãy cải thiện vị trí từng quân: đưa Mã từ biên về trung tâm, đổi chỗ Pháo cho có ngòi, lên Tốt mở đường. Nhiều ván đại sư thắng chỉ nhờ quân của họ đứng tốt hơn một chút ở mọi nơi — xem ${h.L('khong-ngung-chinh-hinh-de-toi-uu-hoa-the-co')}.</p>

<h2>Chiến thuật trung cuộc thường gặp</h2>
<ul>
<li><strong>Đè bẹp trung lộ:</strong> dồn Pháo, Tốt, Xe vào giữa — ${h.L('may-ui-dat-trung-lo-chien-thuat-de-bep')}, ${h.L('chien-thuat-doat-trung-binh-van-vuong-gia-luong-thang-manh-lap-quoc', 'đoạt Tốt giữa')}.</li>
<li><strong>Tấn công đường sườn:</strong> ${h.L('manh-cong-duong-suon-cuoc-dua-gianh-quyen-chu-dong')}.</li>
<li><strong>Pháo chìm đáy:</strong> Pháo xuống hàng đáy đối phương để kìm hoặc chiếu rút — ${h.L('phao-chim-day-kem-che-tro-cong', 'kềm chế trợ công')}, ${h.L('phao-chim-day-khong-mon-rut-sat', 'rút sát')}.</li>
<li><strong>Phá Sĩ Tượng:</strong> thí quân để mở cung — ${h.L('kheo-pha-si-tuong-van-ho-vinh-hoa-thang-trinh-phuc-than')}, ${h.L('phe-quan-pha-si-tuong-van-vuong-thien-nhat-thang-trinh-duy-dong')}.</li>
<li><strong>Cản trở:</strong> đặt quân chặn đường liên lạc giữa các quân đối phương — ${h.L('rut-dao-chem-nuoc-nuoc-khong-chay-chien-thuat-can-tro-kinh-dien')}.</li>
</ul>
<p>Khi trung cuộc dẫn tới thế chiếu hết, bạn cần biết các mẫu sát cục — xem ${h.N('cac-the-sat-cuc-co-tuong-kinh-dien', 'các thế sát cục kinh điển')}. Còn khi đã hơn quân, hãy đổi bớt và chuyển về ${h.N('tan-cuoc-co-tuong-co-ban-the-thang-hoa', 'tàn cuộc')}.</p>

<h2>Học trung cuộc theo thứ tự nào?</h2>
<ul>
<li><strong>Người mới:</strong> chương trình ${h.S('nen-tang-nguyen-ly-trung-cuoc')} — mỗi bài một nguyên lý, minh họa bằng ván đại sư.</li>
<li><strong>Khá hơn:</strong> ${h.S('trung-cuoc-bao-dien-tap-1')} — lý luận trung cuộc hệ thống (thẩm cục, chiến lược, chiến thuật, chiến pháp, thiết kế chiến dịch).</li>
<li><strong>Nâng cao:</strong> ${h.S('trung-cuoc-bao-dien-tap-2')} — 300 thế trung cuộc trích từ ván đấu danh thủ, có bình giải.</li>
</ul>
<p>Tất cả nằm ở trang ${h.P('trung-cuoc', 'Trung cuộc')}. Sau mỗi bài, thử ${h.F('/choi-voi-may', 'chơi với máy')} cấp Vừa và cố áp dụng đúng nguyên tắc vừa học.</p>

<h2>Câu hỏi thường gặp</h2>
<h3>Trung cuộc cờ tướng là gì?</h3>
<p>Trung cuộc là giai đoạn giữa ván cờ, sau khi hai bên đã ra quân xong và bắt đầu giao tranh trực tiếp, trước khi quân đổi bớt nhiều để vào tàn cuộc. Đây thường là giai đoạn quyết định kết quả ván cờ.</p>
<h3>Làm sao để đánh trung cuộc giỏi hơn?</h3>
<p>Hãy tập thói quen đánh giá thế cờ trước mỗi nước, học các mẫu phối hợp quân và chiến thuật cơ bản, đồng thời xem ván đấu của đại sư có bình giải. Chơi nhiều ván rồi phân tích lại chỗ mình đi sai cũng rất hiệu quả.</p>
<h3>"Chọn thế, không chọn quân" nghĩa là gì?</h3>
<p>Nghĩa là ưu tiên vị trí và quyền chủ động hơn là ăn quân. Ăn quân mà để mất thế thì thường lỗ; còn thí quân để giành thế tấn công mạnh lại thường có lợi.</p>
<h3>Trung cuộc khác sát pháp thế nào?</h3>
<p>Sát pháp là các mẫu chiếu hết cụ thể, thường là đoạn kết của một đợt tấn công. Trung cuộc rộng hơn: gồm lập kế hoạch, phối hợp quân, tranh tuyến, vây khốn, đổi quân. Sát pháp là một phần của trung cuộc.</p>
`,
});
