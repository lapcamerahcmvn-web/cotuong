module.exports = (h) => ({
  slug: 'thuat-ngu-co-tuong-cho-nguoi-moi',
  title: 'Thuật Ngữ Cờ Tướng: Hơn 50 Từ Người Chơi Nào Cũng Cần Biết',
  seo_title: 'Thuật Ngữ Cờ Tướng Cho Người Mới — Giải Thích Dễ Hiểu',
  seo_description: 'Giải thích hơn 50 thuật ngữ cờ tướng thường gặp: tiến, thoái, bình, chiếu, sát, tiên, hậu, ngòi pháo, cản mã, Bình Phong Mã, Ngọa Tào… kèm bài học minh họa.',
  excerpt: 'Đọc sách hay xem bình luận cờ tướng mà gặp toàn từ lạ như "bình", "thoái", "lộ mặt tướng", "thí quân", "Ngọa Tào"? Bài viết gom các thuật ngữ cờ tướng thông dụng theo nhóm, giải thích bằng lời dễ hiểu và dẫn tới bài học có bàn cờ minh họa.',
  og: { fen: h.START_FEN, title: 'Thuật ngữ cờ tướng cho người mới' },
  content: `
<p>Cờ tướng có kho <strong>thuật ngữ</strong> khá đồ sộ, phần lớn là từ Hán Việt nên người mới đọc sách hay nghe bình luận thường không hiểu. Bài viết này gom các <strong>thuật ngữ cờ tướng</strong> thông dụng nhất thành từng nhóm, giải thích ngắn gọn bằng lời thường. Những từ quan trọng đều có link tới bài học trên ${h.home} để bạn xem tận mắt trên bàn cờ.</p>

<h2>Bàn cờ và quân cờ</h2>
<ul>
<li><strong>Sông (Hà giới):</strong> khoảng trống giữa bàn cờ, thường ghi "Sở hà – Hán giới". Tượng không được qua sông; Tốt qua sông mới được đi ngang.</li>
<li><strong>Cung (Cửu cung):</strong> ô vuông 3×3 có hai đường chéo ở mỗi bên. Tướng và Sĩ chỉ được đi trong cung.</li>
<li><strong>Lộ (đường, cột):</strong> các đường dọc đánh số 1 đến 9, mỗi bên tự đếm từ phải sang trái của mình. "Trung lộ" là lộ 5 ở giữa.</li>
<li><strong>Tướng / Soái:</strong> quân chủ của mỗi bên. Nhiều sách gọi Tướng bên Đỏ là Soái.</li>
<li><strong>Chốt / Tốt / Binh:</strong> ba cách gọi cùng một loại quân. Bên Đỏ hay gọi là Binh, bên Đen là Tốt; dân chơi miền Nam hay gọi chung là Chốt.</li>
<li><strong>Quân nặng, quân nhẹ:</strong> Xe là quân nặng; Mã, Pháo là quân nhẹ (quân tấn công cỡ vừa).</li>
<li><strong>Sĩ Tượng toàn:</strong> còn đủ hai Sĩ, hai Tượng. <strong>Khuyết Sĩ / khuyết Tượng:</strong> thiếu một Sĩ hoặc một Tượng.</li>
</ul>

<h2>Thuật ngữ về nước đi</h2>
<ul>
<li><strong>Tiến:</strong> đi lên phía đối phương. <strong>Thoái:</strong> lùi về phía mình. <strong>Bình:</strong> đi ngang trên cùng một hàng. Ba từ này dùng trong ký hiệu nước đi, ví dụ "Pháo 2 bình 5" — xem ${h.N('cach-doc-ghi-ky-hieu-nuoc-di-co-tuong', 'cách đọc ký hiệu nước đi')}.</li>
<li><strong>Ngòi (pháo giá):</strong> quân đứng giữa Pháo và mục tiêu. Pháo phải nhảy qua đúng một ngòi mới ăn được — xem ${h.L('cach-di-quan-phao', 'cách đi quân Pháo')}.</li>
<li><strong>Cản mã (chân mã):</strong> quân đứng sát Mã theo hướng nó định đi làm Mã không nhảy được — xem ${h.L('cach-di-quan-ma', 'cách đi quân Mã')}.</li>
<li><strong>Mắt tượng (cản tượng):</strong> điểm giữa đường chéo Tượng đi; có quân ở đó thì Tượng bị chặn.</li>
<li><strong>Lộ mặt tướng (đối mặt tướng):</strong> hai Tướng đứng cùng cột mà giữa không có quân nào — nước đi tạo ra thế này bị cấm.</li>
<li><strong>Đi lại (hồi nước):</strong> rút lại nước vừa đi. Thi đấu thật không được đi lại, nhưng khi tập với máy thì có thể.</li>
</ul>

<h2>Thuật ngữ về tấn công và thắng thua</h2>
<ul>
<li><strong>Chiếu (chiếu tướng):</strong> đe dọa ăn Tướng ở nước sau, đối phương buộc phải đỡ.</li>
<li><strong>Chiếu hết / chiếu bí / sát:</strong> Tướng bị chiếu mà không còn cách gỡ, ván cờ kết thúc. "Sát cục", "sát pháp" là các mẫu chiếu hết.</li>
<li><strong>Chiếu rút:</strong> một quân rời đi để mở đường cho quân khác chiếu (vừa chiếu vừa dọa ăn quân).</li>
<li><strong>Chiếu đôi (song chiếu):</strong> hai quân cùng chiếu một lúc, rất khó đỡ.</li>
<li><strong>Bị khốn (vây chết):</strong> không bị chiếu nhưng không còn nước đi hợp lệ nào — trong cờ tướng bên bị khốn xử thua.</li>
<li><strong>Thí quân (phế quân):</strong> chủ động bỏ quân để đổi lấy thế tấn công hoặc thời gian.</li>
<li><strong>Bắt / đuổi:</strong> dọa ăn một quân của đối phương. <strong>Chiếu dài, đuổi dài:</strong> lặp đi lặp lại chiếu hoặc đuổi để cầu hòa — bị luật cấm, xem ${h.N('luat-chieu-dai-duoi-dai-co-tuong', 'luật chiếu dài, đuổi dài')}.</li>
<li><strong>Tranh tiên, được tiên:</strong> giành quyền chủ động, buộc đối phương phải đáp theo ý mình. <strong>Mất tiên:</strong> bị động phải đỡ.</li>
<li><strong>Đổi quân (thí đổi):</strong> hai bên ăn quân của nhau ngang giá. Xem ${h.N('gia-tri-cac-quan-co-tuong-quan-nao-manh-nhat', 'giá trị các quân cờ')} để biết đổi thế nào có lợi.</li>
</ul>

<h2>Thuật ngữ khai cuộc thường gặp</h2>
<ul>
<li><strong>Khai cuộc (bố cuộc):</strong> giai đoạn đầu ván, hai bên ra quân và dàn trận.</li>
<li><strong>Pháo đầu (Trung pháo):</strong> đưa Pháo vào lộ giữa ngay nước đầu, nhắm vào Tốt đầu của đối phương — xem ${h.N('phao-dau-co-tuong-cach-di-va-cach-pha', 'bài riêng về Pháo đầu')}.</li>
<li><strong>Bình Phong Mã:</strong> bên Đen lên cả hai Mã che phía trước cung, cách đáp Pháo đầu phổ biến nhất.</li>
<li><strong>Thuận pháo, nghịch pháo:</strong> Pháo đầu đối Pháo đầu, phân biệt theo phía hai Pháo vào giữa — xem ${h.L('noi-don-gian-ve-thuan-phao-va-nghich-phao')}.</li>
<li><strong>Phi Tượng, Tiên nhân chỉ lộ, Khởi Mã:</strong> các khai cuộc mở đầu bằng nước Tượng, nước Tốt 3/7, nước Mã — xem ${h.N('cac-the-khai-cuoc-co-tuong-pho-bien', 'các thế khai cuộc phổ biến')}.</li>
<li><strong>Hoành Xe:</strong> đưa Xe đi ngang ra cánh; <strong>Trực Xe:</strong> Xe tiến thẳng lên. <strong>Quá hà Xe:</strong> Xe vượt sông sớm.</li>
<li><strong>Định thức:</strong> chuỗi nước đi chuẩn đã được nghiên cứu kỹ cho một khai cuộc.</li>
</ul>

<h2>Thuật ngữ trung cuộc và tàn cuộc</h2>
<ul>
<li><strong>Trung cuộc:</strong> giai đoạn giữa ván, khi hai bên đã ra quân và bắt đầu giao tranh — xem ${h.N('trung-cuoc-co-tuong-nguyen-tac-chien-thuat', 'nguyên tắc trung cuộc')}.</li>
<li><strong>Thẩm cục:</strong> đánh giá thế cờ (ai hơn quân, ai hơn thế, điểm yếu ở đâu) trước khi lập kế hoạch — xem ${h.L('trung-cuoc-bao-dien-t1-y-nghia-tham-cuc')}.</li>
<li><strong>Tàn cuộc:</strong> giai đoạn cuối, ít quân, thường quyết định bằng kỹ thuật — xem ${h.N('tan-cuoc-co-tuong-co-ban-the-thang-hoa', 'các thế tàn cuộc cơ bản')}.</li>
<li><strong>Chốt cao, chốt thấp, chốt lụt:</strong> Tốt qua sông ở vị trí còn xa đáy (cao), đã xuống gần đáy (thấp), hay đã xuống tận hàng đáy (lụt). Độ "cao thấp" của Tốt quyết định nhiều thế tàn cuộc thắng hay hòa.</li>
<li><strong>Khẩu quyết:</strong> câu ghi nhớ ngắn tóm tắt cách đánh một loại thế cờ — chương trình ${h.S('co-tan-co-khau-quyet')} dạy theo cách này.</li>
</ul>

<h2>Tên các đòn sát nổi tiếng</h2>
<p>Nhiều mẫu chiếu hết có tên riêng, nghe một lần là kỳ thủ hiểu ngay thế cờ:</p>
<ul>
<li><strong>Mã Ngọa Tào:</strong> Mã nằm sát góc cung đối phương chiếu Tướng — ${h.L('ma-ngoa-tao-vi-du-1', 'xem ví dụ')}.</li>
<li><strong>Trùng Pháo:</strong> hai Pháo xếp cùng một đường, Pháo trước làm ngòi cho Pháo sau — ${h.L('phao-trung-vi-du-1', 'xem ví dụ')}.</li>
<li><strong>Thiết Môn Thuyên:</strong> "then cửa sắt", khóa Tướng ở giữa rồi chiếu hết — ${h.L('thiet-mon-thuyen-vi-du-1', 'xem ví dụ')}.</li>
<li><strong>Bạch Liễm Tướng (Tướng lộ diện):</strong> dùng chính Tướng nhà khống chế cột để hỗ trợ chiếu hết — ${h.L('bach-liem-tuong-vi-du-1', 'xem ví dụ')}.</li>
<li><strong>Song Xe Thác:</strong> hai Xe thay nhau chiếu — ${h.L('song-xe-thac-vi-du-1', 'xem ví dụ')}.</li>
</ul>
<p>Danh sách đầy đủ hơn nằm ở bài ${h.N('cac-the-sat-cuc-co-tuong-kinh-dien', 'các thế sát cục kinh điển')}.</p>

<h2>Câu hỏi thường gặp</h2>
<h3>"Bình" trong cờ tướng nghĩa là gì?</h3>
<p>"Bình" nghĩa là đi ngang trên cùng một hàng. Ví dụ "Pháo 2 bình 5" là Pháo đang ở lộ 2 đi ngang sang lộ 5. "Tiến" là đi lên phía đối phương, "thoái" là lùi về.</p>
<h3>Chốt, Tốt và Binh có khác nhau không?</h3>
<p>Không. Đây là ba tên gọi của cùng một loại quân. Sách thường gọi Binh cho bên Đỏ và Tốt cho bên Đen; người chơi miền Nam quen gọi là Chốt.</p>
<h3>Sát cục là gì?</h3>
<p>Sát cục (sát pháp) là mẫu chiếu hết, tức cách phối hợp quân để Tướng đối phương bị chiếu mà không gỡ được. Học thuộc các mẫu này giúp nhận ra cơ hội thắng nhanh hơn trong ván thật.</p>
<h3>Lộ mặt tướng là gì?</h3>
<p>Là tình huống hai Tướng đứng cùng một cột dọc mà không có quân nào ở giữa. Luật cấm đi nước tạo ra thế này, nên Tướng nhà có thể dùng để khống chế cột của Tướng đối phương.</p>
`,
});
