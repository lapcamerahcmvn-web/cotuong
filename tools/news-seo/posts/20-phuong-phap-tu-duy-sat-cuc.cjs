// Phương pháp tư duy giải bài tập sát cục liên hoàn — sơ đồ tư duy 6 câu hỏi (bảng mindmaps, slug bên dưới)
// + ví dụ trong chuyên đề "Sát Cục Liên Hoàn 1-10 Nước" (tools/sat-cuc-lien-hoan/).
module.exports = (h) => {
  const P = 'sat-cuc-lien-hoan-';
  const L = (s, t) => h.L(P + s, t);
  return {
    slug: 'phuong-phap-tu-duy-giai-bai-tap-sat-cuc',
    title: 'Phương Pháp Tư Duy Giải Bài Tập Sát Cục Liên Hoàn (Sơ Đồ Tư Duy 6 Câu Hỏi)',
    seo_title: 'Phương Pháp Tư Duy Giải Sát Cục Liên Hoàn — Sơ Đồ 6 Câu Hỏi',
    seo_description: 'Sơ đồ tư duy 6 câu hỏi giải bài tập sát cục liên hoàn cờ tướng: quân nào chiếu, quân nào phối hợp, Tướng Đen chạy đâu… kèm ví dụ trên bàn cờ.',
    excerpt: 'Giải bài tập chiếu hết mà đi thử bừa thì vừa chậm vừa dễ sót. Bài viết trình bày phương pháp 6 câu hỏi — 3 câu cho quân ta, 3 câu cho quân Đen — dưới dạng sơ đồ tư duy, mỗi nhánh có ví dụ trên bàn cờ, cùng 3 bài phân tích trọn vẹn và lộ trình hơn 1.100 bài tập.',
    og: { lesson: P + '6-nuoc-bai-46', title: 'Phương pháp tư duy giải sát cục liên hoàn' },
    content: `
<p><strong>Sát cục liên hoàn</strong> là kiểu chiếu hết mà nước nào của bên tấn công cũng là nước chiếu. Đối phương chỉ biết chạy Tướng, lót quân hoặc ăn quân đang chiếu, không có lúc nào rảnh tay để phản công. Ván cờ có thể kết thúc bằng một đòn như vậy ở bất kỳ giai đoạn nào, nên luyện sát cục là việc không thể bỏ qua. Vấn đề là nhiều người giải bài tập theo kiểu đi thử từng nước, sai thì đi lại. Cách đó chậm và không giúp gì khi ngồi trước bàn cờ thật. Bài viết này trình bày một <strong>phương pháp tư duy gồm 6 câu hỏi</strong>, vẽ thành sơ đồ tư duy có ví dụ, để bạn áp dụng ngay vào chuyên đề ${h.S('sat-cuc-lien-hoan')} trên ${h.home}.</p>

<h2>Vì sao cần một phương pháp tư duy?</h2>
<p>Một thế sát cục 5–6 nước có thể có hàng chục nước chiếu ở mỗi lượt. Nếu chỉ dựa vào cảm giác, bạn sẽ thấy nước chiếu "đẹp mắt" trước rồi bỏ sót nước thí quân mới là lời giải. Phương pháp ở đây buộc bạn nhìn cả hai phía: <strong>quân ta tấn công bằng gì</strong> và <strong>quân Đen phòng thủ ra sao</strong>. Trả lời đủ 6 câu hỏi, số phương án cần tính giảm hẳn, và bạn hiểu vì sao lời giải đúng chứ không chỉ nhớ thuộc lòng.</p>

<h2>Sơ đồ tư duy: 6 câu hỏi trước nước đầu tiên</h2>
<p>Mở từng nhánh để xem ý chính. Mỗi nhánh lá có một bài tập minh họa: bấm "Xem ví dụ" để thấy câu hỏi đó áp dụng vào thế cờ thật, hoặc "Tự đánh kiểm chứng" để tự cầm Đỏ giải với máy. Bật "Che khẩu quyết" để tự nhắc lại các ý trước khi lật ra xem.</p>
${h.MS('phuong-phap-tu-duy-sat-cuc-lien-hoan', 'Phương pháp tư duy giải sát cục liên hoàn', 'Ba câu hỏi đầu dành cho quân ta, ba câu sau dành cho quân Đen. Nhánh cuối là ba ví dụ phân tích trọn vẹn.')}

<h2>Ba câu hỏi về quân ta</h2>
<h3>1. Quân nào chiếu được — kể cả phải thí quân?</h3>
<p>Đi lần lượt từng quân: Xe, Mã, Pháo, Tốt, rồi cả mặt Tướng nhà. Ghi nhận <strong>mọi</strong> nước chiếu, kể cả nước chiếu mà quân đi vào ô bị ăn. Trong sát cục liên hoàn, nước thí quân rất thường là lời giải: ở ${L('2-nuoc-bai-3', 'bài 2-3')}, Xe lao vào ăn Sĩ và chịu mất Xe, nhưng Tướng Đen bị kéo ra khỏi chỗ và Xe còn lại chiếu hết trên hàng đáy.</p>
<p>Ngoài nước chiếu hết trực tiếp còn có <strong>nước chiếu chiến thuật</strong>: chiếu để chuyển chỗ quân (${L('3-nuoc-bai-8', 'Mã chiếu liên tiếp đổi vị trí')}), chiếu rút — quân trước dời đi để quân sau chiếu (${L('5-nuoc-bai-20', 'ví dụ')}), chen một quân vào giữa làm ngòi cho Pháo (${L('1-nuoc-bai-15', 'ví dụ')}), hay lưỡng chiếu — hai quân cùng chiếu khiến Đen không thể lót hay ăn (${L('1-nuoc-bai-38', 'ví dụ')}).</p>
<h3>2. Toàn bộ quân nào phối hợp được?</h3>
<p>Quân phối hợp không chỉ là quân đang chiếu. Một Xe khóa đường, một Pháo làm giá, mặt Tướng chiếm một cột đều là lực lượng tấn công. Với mỗi quân, hãy đoán trước nó sẽ đánh vào ô nào. Từ đó bạn đoán được Tướng Đen sẽ bị dồn về đâu ở các nước sau.</p>
<h3>3. Đòn tấn công nào dùng được?</h3>
<p>Nhìn thế cờ và nhận ra hình sát quen thuộc: ${L('1-nuoc-bai-7', 'Mã ngọa tào')}, ${L('1-nuoc-bai-38', 'Mã quải giác')}, ${L('1-nuoc-bai-23', 'Pháo trùng')}, ${L('3-nuoc-bai-2', 'mặt Tướng trợ lực')}… Hai nguyên tắc đi kèm: quân nào đang có tác dụng (khóa đường, làm ngòi) thì để yên; và đôi khi phải gọi cả quân ở nhà, nhất là Pháo mượn Sĩ Tượng làm ngòi.</p>

<h2>Ba câu hỏi về quân Đen</h2>
<h3>4. Tướng, Sĩ, Tượng Đen sẽ đứng ở đâu?</h3>
<p>Sau mỗi nước chiếu, Tướng Đen chạy ô nào, Sĩ Tượng lót ở đâu? Tính được điều này là biết trước nước chiếu tiếp theo. Ở ${L('6-nuoc-bai-39', 'bài 6-39')}, Tượng Đen ăn Pháo rồi phải lót chiếu, Sĩ bị Xe thí phá, cuối cùng Tướng chỉ còn đứng ở góc cung.</p>
<h3>5. Quân nào của Đen sẽ về cứu?</h3>
<p>Xe, Pháo, Mã Đen có kịp về lót hoặc ăn quân chiếu không? Nước chiếu tốt là nước vừa chiếu vừa cắt đường tiếp viện. Ngược lại, nếu Đen đang dọa sát bên ta, Đỏ càng phải chiếu liên tục: chỉ một nước êm là thua trước.</p>
<h3>6. Quân Đen nào làm hại chính Tướng Đen?</h3>
<p>Quân phòng thủ đôi khi lại là chướng ngại. Sĩ, Tượng, thậm chí Xe Mã Đen đứng sát cung có thể lấp mất đường chạy của Tướng — đó là thế <strong>muộn cung</strong> (${L('1-nuoc-bai-54', 'ví dụ')}). Sĩ Tượng Đen cũng có thể thành ngòi cho Pháo ta (${L('1-nuoc-bai-24', 'ví dụ')}).</p>

<h2>Áp dụng: phân tích một bài 6 nước</h2>
<p>Hãy thử với ${L('6-nuoc-bai-46', 'bài 6-46')} trước khi đọc tiếp:</p>
${h.B(P + '6-nuoc-bai-46')}
<ul>
<li><strong>Câu 1:</strong> Đỏ có nước chiếu bằng Pháo và Mã, trong đó có nước Pháo ăn Tượng dù sẽ bị ăn lại.</li>
<li><strong>Câu 2:</strong> cả hai Xe, hai Pháo, hai Mã đều tham gia — Xe sau nhắm Tốt giữa, Xe trước chờ ở cánh.</li>
<li><strong>Câu 3:</strong> chuỗi thí quân phá Sĩ Tượng, kết thúc bằng Pháo chiếu ở hàng đáy.</li>
<li><strong>Câu 4:</strong> Sĩ giữa của Đen sẽ bị Mã thí kéo lệch khỏi trung lộ.</li>
<li><strong>Câu 5:</strong> Xe Đen đang dọa chiếu hết, nên Đỏ không được đi nước êm nào.</li>
<li><strong>Câu 6:</strong> Pháo Đen ăn Pháo thí ở hàng đáy, rồi chính nó thành ngòi cho Pháo Đỏ chiếu hết.</li>
</ul>
<p>Hai ví dụ còn lại trong sơ đồ là ${L('6-nuoc-bai-39', 'bài 6-39')} (thí Xe, Mã kết thúc vì Mã Đen tự chặn đường chạy) và ${L('9-nuoc-bai-1', 'bài 9-1')} (thí Tốt dụ Tướng, Mã chiếu liên tục để chuyển chỗ, Xe kết thúc nhờ mặt Tướng).</p>

<h2>Câu hỏi cuối cùng: đã gặp thế này chưa?</h2>
<p>Sau 6 câu hỏi, tự hỏi thêm: thế cờ này giống bài nào mình đã giải? Đưa được về một hình sát đã học thì lời giải hiện ra rất nhanh. Đó là lý do nên luyện theo thứ tự từ ít nước tới nhiều nước — các bài 1–2 nước chính là "từ vựng" để đọc các bài 8–10 nước.</p>

<h2>Lộ trình luyện hơn 1.100 bài tập</h2>
<p>Chuyên đề ${h.S('sat-cuc-lien-hoan')} chia thành 10 chặng theo số nước, mỗi chặng có bài giới thiệu riêng: ${L('1-nuoc-gioi-thieu', '1 nước')}, ${L('2-nuoc-gioi-thieu', '2 nước')}, ${L('3-nuoc-gioi-thieu', '3 nước')}, ${L('4-nuoc-gioi-thieu', '4 nước')}, ${L('5-nuoc-gioi-thieu', '5 nước')}, ${L('6-nuoc-gioi-thieu', '6 nước')}, ${L('7-nuoc-gioi-thieu', '7 nước')}, ${L('8-nuoc-gioi-thieu', '8 nước')}, ${L('9-nuoc-gioi-thieu', '9 nước')} và ${L('10-nuoc-gioi-thieu', '10 nước')}. Mỗi bài có chế độ <em>Thử tự giải</em>: bạn cầm Đỏ, máy đỡ dai nhất cho Đen, mọi đường chiếu hết đúng hạn đều được tính đúng. Lời giải của mọi bài đã được máy chứng minh — Đen đỡ thế nào cũng bị chiếu hết.</p>
<ul>
<li>Mỗi ngày 5–10 bài; chỉ lên chặng nhiều nước hơn khi chặng hiện tại giải đúng phần lớn.</li>
<li>Giải bằng mắt trước, trả lời 6 câu hỏi, chỉ đi quân khi đã thấy hết cờ.</li>
<li>Bài giải sai nên làm lại sau 1–3 ngày. Muốn luyện phản xạ thêm, vào ${h.F('/luyen-tap', 'Luyện tập')} hoặc thử đọc ${h.N('cac-the-sat-cuc-co-tuong-kinh-dien', 'các thế sát cục kinh điển')} để nhớ tên từng hình sát.</li>
</ul>

<h2>Câu hỏi thường gặp</h2>
<h3>Sát cục liên hoàn khác chiếu hết thông thường thế nào?</h3>
<p>Chiếu hết thông thường cho phép xen nước êm (không chiếu) để dàn quân. Sát cục liên hoàn yêu cầu mọi nước của bên tấn công đều chiếu, nên đối phương không có thời gian phản công. Kỹ năng này đặc biệt quan trọng khi đối phương cũng đang dọa sát bên mình.</p>
<h3>Vì sao lời giải trên web có lúc khác sách tôi đang đọc?</h3>
<p>Nhiều thế cờ có hơn một đường chiếu hết. Lời giải trên bàn cờ là đường máy đã chứng minh, với Đen chọn cách đỡ dai nhất. Khi bạn tự giải, mọi đường chiếu hết trong đúng số nước đều được chấp nhận.</p>
<h3>Người mới nên bắt đầu từ bài mấy nước?</h3>
<p>Từ chặng 1 nước. Bài 1–2 nước dạy bạn nhận ra ô chiếu hết của từng quân và vai trò mặt Tướng — đây là nền để đọc các đòn dài. Người đã chơi lâu có thể bắt đầu từ chặng 3–4 nước rồi đi tiếp.</p>
<h3>Có cần thuộc lòng lời giải không?</h3>
<p>Không. Hãy thuộc <strong>hình</strong> chứ không thuộc nước: Tướng Đen bị khóa thế nào, quân nào làm ngòi, quân nào thí để kéo phòng thủ lệch chỗ. Sáu câu hỏi trong sơ đồ giúp bạn rút ra đúng những điều đó sau mỗi bài.</p>
`,
  };
};
