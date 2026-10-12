// Trung cuộc sơ đồ tư duy — sơ đồ tư duy toàn chuyên đề (bảng mindmaps, sinh bởi tools/trung-cuoc-so-do-tu-duy/gen.mjs)
// + liên kết chuyên đề "Trung Cuộc Sơ Đồ Tư Duy — Đòn Đánh, Tư Duy Và Chiến Thuật".
module.exports = (h) => {
  const P = 'trung-cuoc-tu-duy-';
  const T = (k, t) => h.L(P + k, t);
  return {
    slug: 'trung-cuoc-so-do-tu-duy-don-danh-chien-thuat',
    title: 'Trung Cuộc Sơ Đồ Tư Duy: Đòn Đánh, Cách Tư Duy Và Chiến Thuật Cờ Tướng',
    seo_title: 'Trung Cuộc Sơ Đồ Tư Duy — Đòn Đánh, Tư Duy, Chiến Thuật',
    seo_description: 'Học trung cuộc cờ tướng bằng sơ đồ tư duy: tính sát, 5 hướng khi bị bắt quân, khống chế, ngăn cản, phế quân, nhược điểm, cục diện và gần 300 bài tập.',
    excerpt: 'Trung cuộc là giai đoạn dài nhất và khó nhất của ván cờ: không có bài bản để học thuộc như khai cuộc, không có khẩu quyết thắng hòa như tàn cuộc. Bài viết gom các cách tư duy và chiến thuật trung cuộc thành một sơ đồ tư duy có thể mở từng nhánh, kèm ví dụ và bài tập trên bàn cờ.',
    og: { lesson: P + 'hinh-tran-chua-hoan-chinh', title: 'Trung cuộc sơ đồ tư duy' },
    content: `
<p><strong>Trung cuộc</strong> bắt đầu khi hai bên đã bày trận xong — thường sau 11 đến 15 nước — và quân bắt đầu chạm nhau. Đây là giai đoạn dài nhất của ván cờ, ảnh hưởng tới gần một nửa kết quả, và cũng là giai đoạn khó học nhất: khai cuộc có bài bản để thuộc, tàn cuộc có khẩu quyết thắng hòa, còn trung cuộc thì không ván nào giống ván nào. Thứ giúp người chơi đứng vững là <strong>cách tư duy</strong> và một kho <strong>chiến thuật</strong> đủ rộng. Bài viết này vẽ toàn bộ những thứ đó thành một sơ đồ tư duy, gắn với chuyên đề ${h.S('trung-cuoc-so-do-tu-duy')} trên ${h.home}.</p>

<h2>Vì sao nên học trung cuộc bằng sơ đồ tư duy?</h2>
<p>Ngồi trước một thế trung cuộc, người mới thường nhìn từng quân riêng lẻ và đi theo cảm giác. Người có kinh nghiệm thì tự hỏi theo một thứ tự quen thuộc: có đòn sát không, có bắt được quân không, điểm yếu ở đâu, có nên bỏ quân lấy thế không. Sơ đồ tư duy biến thứ tự ấy thành hình ảnh: mỗi nhánh là một câu hỏi hoặc một chiến thuật, mỗi nhánh con là việc cần làm khi tấn công và điều cần nhớ khi phòng thủ. Học xong một nhánh, bạn có ngay một "bảng kiểm" để mang vào ván thật.</p>

<h2>Sơ đồ tư duy trung cuộc</h2>
<p>Mở từng nhánh để xem: dòng đánh số là việc cần làm khi tấn công, dòng ghi chú là khi phòng thủ hoặc khi mình là bên đi bắt. Bấm vào tên chủ đề để mở bài học tương ứng, nhánh "Ví dụ" để xem thế cờ minh họa trên bàn cờ. Bật chế độ che nội dung để tự nhẩm trước khi xem.</p>
${h.MS('trung-cuoc-so-do-tu-duy', 'Trung cuộc sơ đồ tư duy — đòn đánh, tư duy, chiến thuật', 'Từ định nghĩa trung cuộc, phương pháp tính sát, các chiến thuật cơ bản tới đánh giá cục diện và các câu hỏi tự đặt trước mỗi nước.')}

<h2>1. Tính sát ngay cả khi bàn cờ còn đông quân</h2>
<p>Đòn sát không chỉ có ở tàn cuộc. Ở trung cuộc, quân đông khiến đòn khó nhìn ra hơn nhưng cũng nhiều đòn hơn. ${T('phuong-phap-tinh-sat', 'Phương pháp tính sát trung cuộc')} gồm tám bước: nhận ra hình quen, xác định sát liên hoàn hay cần nước nghỉ, điểm danh quân tham gia, quy về đội hình sát chiêu đã học, suy ra Tướng địch phải đứng đâu, xem đối phương đang dọa gì, tính chuỗi nước và cuối cùng mới kiểm chứng. Bước "đối phương đang dọa gì" hay bị bỏ qua nhất — nhiều người mải tính đòn mà quên mình sắp bị chiếu hết trước.</p>
<p>Ví dụ dễ thấy nhất là ${T('hinh-tran-chua-hoan-chinh', 'thế Sĩ chưa liên kết bị Xe nhòm')}: bàn cờ còn đầy đủ quân nhưng Đỏ chiếu hết sau 8 nước.</p>

<h2>2. Năm hướng khi quân mình bị đuổi bắt</h2>
<p>Trung cuộc là lúc quân hai bên liên tục đuổi nhau. Phản xạ "bị đuổi thì chạy" thường là lựa chọn kém nhất. ${T('5-huong-khi-bi-bat', 'Năm hướng xử lý')} là <strong>chạy</strong> (nhưng chạy tới chỗ gây áp lực), <strong>giữ</strong> (điều quân bảo vệ nếu vị trí đang đẹp), <strong>bắt lại</strong> (đổi lấy quân ngang giá, nhất là quân đang đứng chỗ mạnh của đối phương), <strong>cản</strong> (chèn ngang đường bắt) và <strong>phế</strong> (bỏ quân lấy thế — "thí trước đoạt sau"). Nhìn từ phía người đi bắt, năm hướng ấy cho biết khi nào <em>không nên</em> bắt: quân địch đang đứng chỗ xấu, đang được giữ chắc, hoặc bắt xong lại mở đường cho họ phế quân tấn công.</p>

<h2>3. Ba chiến thuật cơ bản: khống chế, ngăn cản, phế quân</h2>
<ul>
<li>${T('chien-thuat-khong-che', 'Khống chế')}: đặt quân vào vị trí trọng yếu để quân đối phương không dám cử động. Cách hay dùng nhất là Pháo đứng sau Xe yểm trợ để bắt chết quân bị ghim. Bên bị khống chế thì tạo thêm căn, dùng nước dọa sát hoặc chiếu rút để cởi trói, và không tùy tiện chạy quân đang làm căn.</li>
<li>${T('chien-thuat-ngan-can', 'Ngăn cản')}: chen quân vào cản mắt Tượng, cản chân Mã, chặn ngòi Pháo, khóa Sĩ — cắt đứt liên kết của đối phương. Một Tốt đứng đúng chỗ có khi đáng giá hơn một Xe.</li>
<li>${T('chien-thuat-phe-quan', 'Phế quân')}: bỏ quân để lấy thế công, để hóa giải đòn, để chuyển về tàn hòa, hoặc thí trước đoạt sau. Phế quân chuyển tàn chỉ làm đúng được khi thuộc khẩu quyết tàn cuộc — ví dụ trong chuyên đề cho thấy hai cách bỏ Xe dẫn tới hai kết quả ngược nhau: một tàn hòa, một tàn thua.</li>
</ul>

<h2>4. Nhìn ra nhược điểm và đánh giá cục diện</h2>
<p>Muốn tấn công đúng chỗ phải biết đối phương yếu ở đâu. ${T('phan-tich-nhuoc-diem', 'Phân tích nhược điểm')} chia làm ba tầng: <strong>điểm yếu</strong> ở từng quân (Mã đơn lẻ, Xe hẻo lánh, quân bị ghim, "điểm mạnh ảo" như đôi Pháo gánh tưởng chắc), <strong>nhược điểm hình trận</strong> trên diện rộng (trung lộ yếu, hai cánh trống) và <strong>hình trận chưa hoàn chỉnh</strong> (Sĩ Tượng chưa củng cố). Mỗi tầng có danh sách đòn hay dùng — Pháo đầu, Thiết môn thuyên, Mã ngọa tào cho trung lộ; Pháo giác, Trắc diện hổ, Song Xe lệch cho hai cánh.</p>
<p>Tiếp theo là ${T('cuc-dien-dien-hinh-dong-tinh', 'nhận thức cục diện')}: thế <strong>điển hình</strong> (đã được nghiên cứu sâu như Tả mã bàn hà, Cấp tiến trung binh — học và kế thừa), thế <strong>động</strong> (đối công, đua tốc độ) và thế <strong>tĩnh</strong> (chậm mà chắc, hơn thua từng Tốt). Biết mình đang ở loại nào thì mới chọn đúng kế hoạch.</p>

<h2>5. Phối hợp binh chủng và liên hệ hữu cơ</h2>
<p>Quân mạnh nhất khi có liên hệ với quân khác: làm căn, làm ngòi, mở đường, che chắn. Chuyên đề tách thành bốn bài: ${T('phoi-hop-binh-chung', 'sáu nguyên tắc phối hợp binh chủng')}, ${T('lien-he-huu-co', 'liên hệ hữu cơ giữa các quân')}, ${T('uu-viet-vi-tri-quan', 'vị trí ưu việt của Xe, Pháo, Mã')} và ${T('tap-trung-binh-luc', 'tập trung ưu thế binh lực')} — đông hơn đối phương ở đúng khu vực quyết định, dù tổng quân có thể ngang nhau.</p>

<h2>6. Năm hướng tư duy và các câu hỏi trước mỗi nước</h2>
<p>Gom tất cả lại, ${T('5-huong-tu-duy-trung-cuoc', 'năm hướng tư duy trung cuộc')} là bảng kiểm cho mọi thế cờ: có sát không, có bắt hay kìm được quân không, điểm yếu ở đâu, có nên phế quân tranh tiên không, và nếu đang kém thì đổi quân chủ lực của đối phương để về tàn hòa. Còn ${T('cau-hoi-khi-tu-duy', 'năm câu hỏi trước mỗi nước')} — mục đích nước đi là gì, còn phương án nào khác, đã hình dung thế cờ vài nước sau chưa, có đòn lợi hại nào không, đã bao quát toàn bàn chưa — là thói quen giúp bỏ tật "bốc cờ" đi nhanh.</p>

<h2>Luyện tập thế nào?</h2>
<ul>
<li>Đọc bài lý thuyết của một nhánh, xem các ví dụ trong chương, rồi làm bài tập của chương đó.</li>
<li>Bài tập có ba loại: <strong>chiếu hết</strong> (lời giải máy chứng minh hoặc máy tìm), <strong>tìm nước then chốt</strong> (bắt quân, tranh tiên, khống chế — máy chấp nhận nước tương đương) và <strong>phân tích</strong> (không có một nước vượt trội hẳn — để tự đánh giá).</li>
<li>Kết thúc bằng phần bài tập tổng hợp: không gợi ý trước dạng bài, giống ván thật nhất.</li>
<li>Muốn luyện phản xạ thêm, vào ${h.F('/luyen-tap', 'Luyện tập')} hoặc ôn lại ${h.S('sat-chieu-thuc-dung', 'Sát Chiêu Thực Dụng — 13 Đội Hình')}.</li>
</ul>

<h2>Câu hỏi thường gặp</h2>
<h3>Trung cuộc bắt đầu từ nước thứ mấy?</h3>
<p>Không có mốc cố định. Thông thường khai cuộc kết thúc sau khoảng 11–15 nước, khi hai bên đã đưa phần lớn quân ra và bắt đầu giao chiến. Dấu hiệu rõ nhất là khi các nước đi không còn là "phát triển quân" nữa mà là tấn công, đổi quân, tranh vị trí.</p>
<h3>Nên học trung cuộc trước hay tàn cuộc trước?</h3>
<p>Nên có nền tảng sát cục và tàn cuộc trước. Trung cuộc thường kết thúc bằng một đòn sát hoặc một cuộc chuyển tàn: không biết đòn sát thì không tận dụng được ưu thế, không biết tàn cuộc thì không biết nên đổi quân hay giữ quân.</p>
<h3>Bài tập không phải chiếu hết thì chấm thế nào?</h3>
<p>Với bài tìm nước then chốt, lời giải là nước máy đánh giá tốt hơn rõ rệt các phương án khác; khi tự giải, nước khác lời giải vẫn được chấp nhận nếu máy đánh giá tương đương. Thế nào không có nước vượt trội thì được để ở dạng bài phân tích, không chấm.</p>
<h3>Sơ đồ tư duy này dùng thế nào khi đang đánh?</h3>
<p>Đừng cố nhớ từng dòng. Hãy nhớ các nhánh lớn theo thứ tự — sát, bắt quân, điểm yếu, phế quân, đổi quân — và tự hỏi lần lượt mỗi khi tới lượt đi ở trung cuộc. Các dòng chi tiết sẽ tự hiện ra khi đã luyện đủ ví dụ.</p>
`,
  };
};
