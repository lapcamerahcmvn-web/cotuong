module.exports = (h) => ({
  slug: 'hoc-co-tuong-online-cho-nguoi-moi-lo-trinh-30-ngay',
  title: 'Học Cờ Tướng Online Cho Người Mới: Lộ Trình 30 Ngày Từ Con Số 0',
  seo_title: 'Học Cờ Tướng Online Cho Người Mới — Lộ Trình 30 Ngày',
  seo_description: 'Lộ trình học cờ tướng online miễn phí trong 30 ngày cho người mới: luật chơi, khai cuộc, sát pháp, tàn cuộc, có bàn cờ tương tác và bài tập mỗi ngày.',
  excerpt: 'Chưa biết gì về cờ tướng vẫn có thể chơi được một ván ra hồn sau 30 ngày nếu học đúng thứ tự. Bài viết chia lộ trình thành 4 tuần, mỗi tuần một mục tiêu rõ ràng, kèm bài học có bàn cờ tương tác và bài tập để luyện ngay trên web.',
  featured: true,
  og: { lesson: 'luat-choi-co-tuong', title: 'Học cờ tướng online cho người mới — lộ trình 30 ngày' },
  content: `
<p>Nhiều người muốn <strong>học cờ tướng</strong> nhưng bỏ cuộc sau vài ván vì thua liên tục mà không hiểu tại sao. Lý do thường không nằm ở năng khiếu, mà ở thứ tự học: nhảy vào chơi ngay khi chưa nắm cách quân phối hợp, hoặc ngược lại, đọc quá nhiều lý thuyết khai cuộc mà chưa từng chiếu hết được ai. Bài viết này đưa ra một lộ trình <strong>học cờ tướng online cho người mới</strong> trong 30 ngày, mỗi ngày khoảng 20–30 phút, học ngay trên ${h.home} với bàn cờ tương tác đi từng nước.</p>

<p>Mục tiêu sau 30 ngày rất cụ thể: bạn đi đúng luật mọi quân, có một bộ khai cuộc để dùng, nhận ra được khoảng 10 đòn sát cơ bản và biết cách thắng khi đã hơn quân. Đó là nền đủ vững để thắng máy ở cấp Dễ và chơi sòng phẳng với bạn bè.</p>

<h2>Trước khi bắt đầu: cần chuẩn bị gì?</h2>
<p>Bạn không cần mua bàn cờ hay cài phần mềm. Mọi bài học trên web đều có bàn cờ chạy ngay trên trình duyệt, kể cả trên điện thoại. Có ba thói quen nên tập ngay từ ngày đầu:</p>
<ul>
<li><strong>Bấm từng nước, đừng lướt.</strong> Mỗi bài có nút Tiến/Lùi. Trước khi bấm Tiến, hãy tự đoán nước tiếp theo rồi so với lời giải. Cách học chủ động này nhớ lâu hơn nhiều so với đọc thụ động.</li>
<li><strong>Đăng ký tài khoản miễn phí</strong> để web lưu tiến độ, đánh dấu bài đã học và gợi ý bài tiếp theo. Bạn có thể ${h.F('/dang-ky', 'tạo tài khoản tại đây')}; nếu học khi chưa đăng nhập, tiến độ vẫn được gộp lại khi bạn đăng nhập sau.</li>
<li><strong>Học ít mà đều.</strong> 20 phút mỗi ngày hiệu quả hơn 3 tiếng vào cuối tuần. Chuỗi ngày học liên tục trên web cũng là động lực tốt.</li>
</ul>

<h2>Tuần 1 (ngày 1–7): Luật chơi và cách đi từng quân</h2>
<p>Tuần đầu chỉ có một nhiệm vụ: đi đúng luật mà không phải nghĩ. Bắt đầu với bài ${h.L('luat-choi-co-tuong', 'luật chơi cờ tướng đầy đủ cho người mới')}, sau đó mỗi ngày học một quân:</p>
<ul>
<li>Ngày 1: tổng quan bàn cờ, sông, cung, cách xếp quân.</li>
<li>Ngày 2: ${h.L('cach-di-quan-xe', 'cách đi quân Xe')} và ${h.L('cach-di-quan-tot', 'quân Tốt')}.</li>
<li>Ngày 3: ${h.L('cach-di-quan-phao', 'quân Pháo')} — quân khiến người mới bối rối nhất vì phải có "ngòi" mới ăn được.</li>
<li>Ngày 4: ${h.L('cach-di-quan-ma', 'quân Mã')} và luật cản chân mã.</li>
<li>Ngày 5: ${h.L('cach-di-quan-tuong', 'quân Tượng')}, ${h.L('cach-di-quan-si', 'quân Sĩ')} — hai quân phòng thủ.</li>
<li>Ngày 6: ${h.L('cach-di-quan-tuong-soai', 'quân Tướng')} và luật cấm hai Tướng đối mặt.</li>
<li>Ngày 7: chơi 2–3 ván với máy ở cấp Tập sự để quen tay.</li>
</ul>
<p>Thế cờ xuất phát dưới đây là nơi mọi ván bắt đầu. Hãy nhớ vị trí từng quân: Xe ở góc, rồi tới Mã, Tượng, Sĩ, Tướng ở giữa; hai Pháo đứng hàng thứ ba, năm Tốt đứng hàng thứ tư.</p>
${h.FEN(h.START_FEN, 'Thế cờ xuất phát: Đỏ đi trước. Mỗi bên 16 quân.')}
<p>Nếu cần tra nhanh các từ như "chiếu", "bình", "tiến", "thoái", hãy giữ bài ${h.N('thuat-ngu-co-tuong-cho-nguoi-moi', 'thuật ngữ cờ tướng')} bên cạnh. Còn nếu muốn đọc được biên bản ván cờ, xem ${h.N('cach-doc-ghi-ky-hieu-nuoc-di-co-tuong', 'cách đọc ký hiệu nước đi')}.</p>

<h2>Tuần 2 (ngày 8–14): Chiếu hết — học cách thắng trước</h2>
<p>Nghe có vẻ ngược, nhưng người mới nên học <strong>sát pháp</strong> (cách chiếu hết) trước khai cuộc. Lý do: khi biết các mẫu chiếu hết, bạn sẽ hiểu vì sao khai cuộc phải ra Xe sớm, vì sao không được bỏ trống Sĩ Tượng. Mọi kế hoạch trên bàn cờ cuối cùng đều hướng về Tướng đối phương.</p>
<p>Chương trình ${h.S('sat-phap-13-doi-hinh')} là điểm xuất phát tốt nhất: mỗi đội hình (Song Xe, Xe Pháo, Mã Pháo…) có 5 thế, mỗi thế chỉ 5–9 nước. Mỗi ngày học 2 đội hình. Ví dụ đội hình Song Xe Pháo dưới đây:</p>
${h.B('sat-phap-song-xe-phao')}
<p>Sau mỗi đội hình, vào ${h.F('/luyen-tap', 'trang Luyện tập')} giải thêm vài thế cùng chủ đề. Các thế ở đó được cắt từ chính bài học nên độ khó vừa sức. Bài ${h.N('cac-the-sat-cuc-co-tuong-kinh-dien', 'các thế sát cục kinh điển')} tổng hợp tên gọi và đặc điểm của những đòn sát hay gặp nhất.</p>

<h2>Tuần 3 (ngày 15–21): Khai cuộc — ra quân đúng cách</h2>
<p>Đến lúc học cách bắt đầu ván cờ. Người mới không cần thuộc hàng chục biến; chỉ cần hiểu nguyên tắc và chọn <strong>một khai cuộc cho bên Đỏ, một cách đáp cho bên Đen</strong>. Hãy đọc trước bài ${h.L('ba-nguyen-tac-va-bon-kieu-bo-cuoc-trong-khai-cuoc-co-tuong')}, rồi học theo gợi ý:</p>
<ul>
<li><strong>Cầm Đỏ:</strong> đi Pháo đầu (Pháo 2 bình 5) — khai cuộc phổ biến nhất, ý đồ rõ ràng. Bắt đầu với ${h.L('phao-dau-doi-binh-phong-ma-ta-phao-phong-xe-khai-cuoc-de-nho-cho-nguoi-moi', 'biến Tả Pháo Phong Xe dễ nhớ cho người mới')}.</li>
<li><strong>Cầm Đen:</strong> đáp Bình Phong Mã (lên cả hai Mã che giữa) — cách phòng thủ vững nhất trước Pháo đầu.</li>
<li>Ngày cuối tuần: đọc ${h.N('cac-the-khai-cuoc-co-tuong-pho-bien', 'tổng quan các thế khai cuộc phổ biến')} để biết đối thủ có thể đi những gì khác.</li>
</ul>
<p>Toàn bộ bài khai cuộc nằm ở trang ${h.P('khai-cuoc', 'Khai cuộc')}, trong đó chương trình ${h.S('nen-tang-nguyen-ly-khai-cuoc')} giải thích từng nước một cách dễ hiểu nhất.</p>

<h2>Tuần 4 (ngày 22–30): Tàn cuộc và chơi ván hoàn chỉnh</h2>
<p>Rất nhiều ván người mới đã hơn quân rồi vẫn hòa, thậm chí thua, vì không biết cách kết thúc. Tuần cuối dành cho <strong>tàn cuộc</strong>: những thế ít quân mà kết quả thắng – hòa đã được xác định.</p>
<ul>
<li>Đọc ${h.L('co-tan-khau-quyet-tong-quan', '6 nguyên tắc tàn cuộc')} trong chương trình ${h.S('co-tan-co-khau-quyet')}.</li>
<li>Học các thế cơ bản nhất: ${h.T('Cờ Tàn Mã · Mã Thắng Đơn Sĩ — Hình Cơ Bản 1', 'Mã thắng đơn Sĩ')}, ${h.T('Cờ Tàn Chốt · Hai Chốt Thắng Hai Sĩ', 'hai Chốt thắng hai Sĩ')}, ${h.T('Cờ Tàn Pháo · Pháo Chốt Cao Thắng Đơn Tướng', 'Pháo Chốt cao thắng đơn Tướng')}.</li>
<li>Ở các bài tàn cuộc có nút <strong>"Máy tự giải"</strong>: bấm để xem máy đi lời giải từ đầu đến cuối, hoặc "Đánh thử với máy" để tự cầm quân thắng.</li>
<li>Mỗi ngày chơi 1–2 ván với máy, sau đó mở ${h.F('/tai-khoan/lich-su-van-dau', 'lịch sử ván đấu')} và bấm "Phân tích ván" để xem mình đi sai ở đâu.</li>
</ul>
<p>Bài ${h.N('tan-cuoc-co-tuong-co-ban-the-thang-hoa', 'tàn cuộc cờ tướng cơ bản')} liệt kê các thế thắng – hòa quan trọng nhất theo từng nhóm quân.</p>

<h2>Sau 30 ngày: học tiếp gì?</h2>
<p>Khi đã đi hết bốn tuần, bạn có thể theo ${h.F('/lo-trinh', 'lộ trình học 5 chặng')} của web để học sâu hơn:</p>
<ul>
<li><strong>Trung cuộc:</strong> ${h.S('nen-tang-nguyen-ly-trung-cuoc')} dạy tổ hợp quân, điểm đột phá, vây khốn quân đối phương; sau đó là bộ ${h.S('trung-cuoc-bao-dien-tap-1')} cho người muốn đi sâu lý luận.</li>
<li><strong>Sát pháp nâng cao:</strong> ${h.S('sat-phap-dai-toan')} với hơn 400 ví dụ, sắp theo từng loại đòn.</li>
<li><strong>Cờ úp:</strong> nếu thích biến thể có yếu tố bất ngờ, bắt đầu từ ${h.P('co-up', 'trang Cờ úp')} và đọc ${h.N('meo-choi-co-up-cho-nguoi-moi', '10 mẹo chơi cờ úp cho người mới')}.</li>
</ul>
<p>Song song, hãy giữ nhịp ${h.F('/luyen-tap/hom-nay', 'thế cờ hôm nay')} mỗi sáng và tham gia ${h.F('/thu-thach-tuan', 'thử thách tuần')} để luôn có mục tiêu nhỏ.</p>

<h2>Câu hỏi thường gặp</h2>
<h3>Người lớn tuổi mới học cờ tướng có muộn không?</h3>
<p>Không muộn. Cờ tướng không đòi hỏi phản xạ nhanh như thể thao; người lớn tuổi thường kiên nhẫn hơn nên học tàn cuộc và tính toán khá tốt. Quan trọng là học đều mỗi ngày và chơi nhiều ván có phân tích lại.</p>
<h3>Học cờ tướng online có hiệu quả bằng học với thầy không?</h3>
<p>Học online với bàn cờ tương tác giúp bạn tự học được phần lớn kiến thức nền: luật, khai cuộc, sát pháp, tàn cuộc. Phần còn lại là kinh nghiệm thực chiến, có thể bù bằng chơi với máy, đấu với bạn bè và phân tích lại ván của chính mình.</p>
<h3>Mỗi ngày nên học bao lâu?</h3>
<p>Khoảng 20–30 phút là đủ cho người mới: 10–15 phút học bài mới, phần còn lại giải thế cờ hoặc chơi một ván ngắn. Học đều đặn quan trọng hơn học dài.</p>
<h3>Bao lâu thì thắng được máy?</h3>
<p>Theo lộ trình này, đa số người mới thắng được máy cấp Tập sự sau tuần đầu và cấp Dễ sau khoảng một tháng. Cấp Vừa và Khó cần thêm vài tháng luyện trung cuộc và tàn cuộc.</p>
<h3>Học trên web có mất phí không?</h3>
<p>Toàn bộ bài học, bài tập và chế độ chơi với máy trên ${h.home} đều miễn phí. Đăng ký tài khoản chỉ để lưu tiến độ và nhận XP, huy hiệu.</p>
`,
});
