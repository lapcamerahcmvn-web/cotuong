module.exports = (h) => ({
  slug: 'xep-the-co-va-nho-may-giai-co-tuong',
  title: 'Cách Xếp Thế Cờ Tướng Và Nhờ Máy Giải — Kể Cả Chụp Ảnh Bàn Cờ',
  seo_title: 'Xếp Thế Cờ Tướng Cho Máy Giải — Chụp Ảnh Nhận Diện',
  seo_description: 'Hướng dẫn xếp thế cờ tướng, cờ úp cho máy giải, đánh thử với máy, chụp ảnh bàn cờ để máy nhận diện và lưu thế cờ vào thư viện cá nhân. Miễn phí, không cần cài.',
  excerpt: 'Gặp một thế cờ khó ngoài quán, trên báo hay trong ván vừa chơi và muốn biết nước đi đúng? Bài viết hướng dẫn tự xếp thế cờ trên web, cho máy giải hoặc đánh thử, chụp ảnh bàn cờ để máy tự nhận diện, rồi lưu và soạn biến trong thư viện cá nhân.',
  og: { lesson: 'c6-de-kiem-tra-bai-39', title: 'Xếp thế cờ tướng và nhờ máy giải' },
  content: `
<p>Bạn vừa gặp một thế cờ hay trong ván với bạn bè, một bài cờ thế trên báo, hoặc muốn biết "lúc đó đi nước khác thì sao"? Thay vì bày bàn cờ thật rồi tự mò, bạn có thể <strong>xếp thế cờ tướng</strong> ngay trên web và <strong>nhờ máy giải</strong>. Bài viết hướng dẫn ba công cụ miễn phí trên ${h.home}: bàn xếp quân, nhận diện bàn cờ từ ảnh và thư viện thế cờ.</p>

<h2>Công cụ 1: Xếp cờ để thẩm</h2>
<p>Vào ${h.F('/luyen-tap/xep-co', 'Xếp cờ để thẩm')}. Công cụ có ba bước:</p>
<ul>
<li><strong>Bước 1 — Xếp quân.</strong> Chọn quân ở bảng phía trên rồi bấm vào ô để đặt. Muốn di chuyển, bấm một quân rồi bấm ô khác; muốn bỏ quân, chọn công cụ xóa rồi bấm vào quân. Chọn bên đi trước.</li>
<li><strong>Bước 2 — Thẩm thế cờ.</strong> Chọn "Máy tự giải" để máy đi cả hai bên, hoặc "Tôi cầm Đỏ" / "Tôi cầm Đen" để đánh với máy. Trong ván có thể đổi bên bất cứ lúc nào.</li>
<li><strong>Bước 3 — Lưu vào thư viện</strong> để xem lại sau.</li>
</ul>
<p>Web tự kiểm tra thế cờ có hợp lệ không: mỗi bên đúng một Tướng; Sĩ, Tướng phải trong cung; Tượng không qua sông; Tốt không lùi về sau vị trí xuất phát; bên vừa đi không được đang bị chiếu và bên tới lượt phải còn nước đi. Ván đánh từ thế tự xếp không tính XP.</p>
<p><strong>Cờ úp cũng xếp được:</strong> đặt quân úp lên ô xuất phát của bên đó, máy tự tráo binh chủng cho các quân úp từ số quân chưa lộ, đúng luật cờ úp.</p>

<h2>Công cụ 2: Chụp ảnh bàn cờ, máy tự nhận diện</h2>
<p>Xếp tay mất thời gian khi bàn cờ còn nhiều quân. Với ${h.F('/nhan-dien-ban-co', 'Nhận diện bàn cờ')}, bạn chỉ cần chụp ảnh:</p>
<ul>
<li><strong>Chọn ảnh:</strong> chụp bằng điện thoại, chọn ảnh có sẵn hoặc dán ảnh chụp màn hình. Dùng được cho bàn cờ thật lẫn màn hình phần mềm cờ khác, cả ván cờ úp.</li>
<li><strong>Căn lưới:</strong> máy tự căn lưới bàn cờ; nếu lệch, bạn kéo chỉnh lại hoặc xoay ảnh.</li>
<li><strong>Thẩm và dùng:</strong> máy hiện thế cờ đã nhận được. Bấm vào ô để sửa quân nhận sai, sau đó cho máy đánh giá nước tốt nhất, chơi tiếp với máy hoặc lưu thư viện.</li>
</ul>
<p>Ảnh được xử lý ngay trên máy của bạn, không tải lên đâu. Khi ảnh khó nhận (chụp nghiêng, thiếu sáng), người dùng đã đăng nhập có thể bấm "Nhận dạng lại bằng AI". Mẹo chụp: chụp thẳng từ trên xuống, đủ sáng, tránh bóng tay và đèn chói, thấy rõ 4 góc lưới.</p>

<h2>Công cụ 3: Thư viện thế cờ cá nhân</h2>
<p>${h.F('/tai-khoan/thu-vien', 'Thư viện của tôi')} là nơi lưu mọi thế cờ bạn quan tâm:</p>
<ul>
<li><strong>Lưu từ bài học:</strong> bấm biểu tượng 🔖 trên bàn cờ ở bất kỳ bài học nào để lưu thế cờ đang xem.</li>
<li><strong>Lưu từ ván đã chơi:</strong> trong ${h.F('/tai-khoan/lich-su-van-dau', 'lịch sử ván đấu')}, đưa cả ván vào thư viện để soạn thêm biến, ghi chú.</li>
<li><strong>Soạn nước đi và biến:</strong> từ một thế cờ, ghi tiếp nước đi; đi lại từ một nước cũ để tạo nhánh biến song song — giống tự soạn một bài học nhỏ.</li>
<li><strong>Dán FEN:</strong> nếu có chuỗi FEN từ phần mềm khác, dán vào là có ngay thế cờ.</li>
<li><strong>Gửi cho Admin duyệt:</strong> thế cờ hay có thể gửi để được xem xét đưa vào nội dung chung.</li>
</ul>

<h2>Ứng dụng thực tế</h2>
<ul>
<li><strong>Phân tích ván vừa chơi trên bàn thật:</strong> chụp ảnh thế cờ quan trọng, cho máy đánh giá xem mình đã bỏ lỡ nước nào.</li>
<li><strong>Giải cờ thế:</strong> gặp bài cờ thế khó, xếp lại và cho máy giải, rồi bấm từng nước để hiểu lời giải. Muốn tự luyện giải trước, xem ${h.N('bai-tap-co-tuong-giai-the-co-moi-ngay', 'cách giải thế cờ mỗi ngày')}.</li>
<li><strong>Kiểm chứng tàn cuộc:</strong> xếp một thế tàn cuộc (ví dụ Xe đơn đối Sĩ Tượng toàn) rồi đánh thử với máy, xem bên tấn công có thắng được không. Các thế cơ bản có sẵn trong ${h.N('tan-cuoc-co-tuong-co-ban-the-thang-hoa', 'bài tàn cuộc cơ bản')}.</li>
<li><strong>Dạy cờ:</strong> phụ huynh hay thầy dạy cờ xếp các ván ít quân cho học trò luyện — xem ${h.N('day-tre-em-hoc-co-tuong-huong-dan-cho-phu-huynh', 'hướng dẫn dạy trẻ học cờ')}.</li>
</ul>
<p>Thế cờ dưới đây là một bài trong bộ 100 bài tự luyện. Thử tự giải trước, sau đó xếp lại trên công cụ Xếp cờ để thẩm và đánh thử với máy:</p>
${h.B('c6-de-kiem-tra-bai-39')}

<h2>Tùy chỉnh bàn cờ cho dễ nhìn</h2>
<p>Ở trang ${h.F('/giao-dien-ban-co', 'Giao diện bàn cờ')}, bạn chọn màu bàn cờ, kiểu quân (phẳng hoặc nổi), chữ trên quân (chữ Hán hoặc chữ Việt cho người mới), hiện số cột 1–9 quanh bàn, mũi tên nước vừa đi, âm thanh đặt quân, báo "chiếu tướng" và cả giọng đọc nước đi. Thiết lập lưu trên thiết bị, có hiệu lực ngay cho bài học, luyện tập, chơi với máy và đấu bạn — không cần đăng nhập.</p>

<h2>Câu hỏi thường gặp</h2>
<h3>Có phần mềm giải cờ tướng miễn phí không cần cài không?</h3>
<p>Có. Công cụ Xếp cờ để thẩm trên web cho phép xếp bất kỳ thế cờ nào và để máy giải hoặc đánh với máy ngay trên trình duyệt, kể cả điện thoại, hoàn toàn miễn phí.</p>
<h3>Chụp ảnh bàn cờ thật máy có nhận ra không?</h3>
<p>Có. Công cụ Nhận diện bàn cờ nhận được cả bàn cờ thật lẫn ảnh chụp màn hình phần mềm. Nên chụp thẳng từ trên xuống, đủ sáng, thấy rõ 4 góc lưới; quân nhận sai có thể bấm để sửa.</p>
<h3>Xếp thế cờ úp được không?</h3>
<p>Được. Đặt quân úp lên ô xuất phát của bên đó, máy sẽ tự tráo binh chủng cho các quân úp theo số quân chưa lộ, đúng luật cờ úp.</p>
<h3>Vì sao web báo thế cờ không hợp lệ?</h3>
<p>Thế cờ hợp lệ khi mỗi bên có đúng một Tướng, các quân đứng đúng vị trí luật cho phép (Sĩ, Tướng trong cung; Tượng không qua sông; Tốt không lùi), bên vừa đi không bị chiếu và bên tới lượt còn nước đi.</p>
`,
});
