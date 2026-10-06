module.exports = (h) => ({
  slug: 'tan-cuoc-co-tuong-co-ban-the-thang-hoa',
  title: 'Tàn Cuộc Cờ Tướng Cơ Bản: Những Thế Thắng – Hòa Phải Thuộc Lòng',
  seo_title: 'Tàn Cuộc Cờ Tướng Cơ Bản: Thế Thắng – Hòa Phải Thuộc',
  seo_description: 'Tàn cuộc cờ tướng cơ bản theo từng nhóm quân Chốt, Mã, Pháo, Xe: thế nào thắng, thế nào hòa, nguyên tắc tàn cuộc và cách luyện có máy tự giải từng thế.',
  excerpt: 'Hơn quân mà vẫn hòa, thậm chí thua — lỗi phổ biến nhất của người chơi phong trào nằm ở tàn cuộc. Bài viết tổng hợp các thế tàn cuộc cơ bản theo từng nhóm quân, cho biết thế nào thắng, thế nào hòa, kèm 6 nguyên tắc tàn cuộc và cách luyện với máy.',
  og: { lesson: h.slugOf('Cờ Tàn Mã · Mã Thắng Đơn Sĩ — Hình Cơ Bản 1'), title: 'Tàn cuộc cờ tướng cơ bản — thế thắng, thế hòa' },
  content: `
<p>Nhiều người chơi nhiều năm vẫn thường xuyên gặp cảnh: đã hơn một Mã, hơn hai Tốt mà ván cờ kết thúc hòa. Nguyên nhân là không biết <strong>tàn cuộc</strong> — giai đoạn cuối ván khi mỗi bên chỉ còn ít quân. Ở tàn cuộc, kết quả của rất nhiều thế cờ đã được nghiên cứu sẵn: thế nào chắc thắng, thế nào chỉ hòa. Thuộc các <strong>thế tàn cuộc cờ tướng cơ bản</strong> giúp bạn biết khi nào nên đổi quân, khi nào nên giữ, và kết thúc ván đúng cách.</p>

<h2>6 nguyên tắc tàn cuộc cần nhớ</h2>
<ul>
<li><strong>Quân đứng linh hoạt, liên hoàn.</strong> Ít quân thì mỗi quân càng quý; quân rời rạc rất dễ bị bắt.</li>
<li><strong>Giữ quân nhưng biết hy sinh đúng lúc.</strong> Bên ưu đừng đổi quân khi chưa đưa được về thế thắng điển hình; bên kém có thể thí quân để về thế hòa điển hình.</li>
<li><strong>Công phải lo thủ.</strong> Mải tấn công dễ bị phản đòn.</li>
<li><strong>Chiếm các lộ 4, 5, 6</strong> — đường dẫn tới Tướng đối phương.</li>
<li><strong>Tướng, Sĩ, Tượng cũng tham chiến.</strong> Trong tàn cuộc, Tướng chiếm "mặt" (đứng cùng cột khống chế Tướng đối phương) thường quyết định thắng thua.</li>
<li><strong>Đánh giá đúng vai trò Chốt.</strong> Chốt cao, Chốt thấp, Chốt lụt có giá trị khác nhau rất nhiều.</li>
</ul>
<p>Các nguyên tắc này được giải thích kỹ ở bài ${h.L('co-tan-khau-quyet-tong-quan')}.</p>

<h2>Tàn cuộc Chốt</h2>
<p>Tàn Chốt là nền móng của mọi thế tàn. Điều quan trọng nhất cần biết: Chốt càng xuống thấp càng yếu.</p>
<ul>
<li>${h.T('Cờ Tàn Chốt · Một Chốt Hòa Một Sĩ')} — một Chốt không đủ thắng khi đối phương còn Sĩ.</li>
<li>${h.T('Cờ Tàn Chốt · Hai Chốt Thắng Hai Sĩ')}, nhưng ${h.T('Cờ Tàn Chốt · Hai Chốt Thấp Hòa Hai Sĩ', 'hai Chốt thấp thì hòa hai Sĩ')}.</li>
<li>${h.T('Cờ Tàn Chốt · Hai Chốt Thắng Hai Tượng')}; ${h.T('Cờ Tàn Chốt · Hai Chốt Hòa Sĩ Tượng Lẻ', 'hai Chốt hòa Sĩ Tượng lẻ')}.</li>
<li>${h.T('Cờ Tàn Chốt · Hai Chốt Thắng Mã')}, ${h.T('Cờ Tàn Chốt · Hai Chốt Thắng Pháo')} — hai Chốt phối hợp tốt mạnh hơn một quân nhẹ đơn độc.</li>
<li>${h.T('Cờ Tàn Chốt · Ba Chốt Cao Thắng Sĩ Tượng Toàn')}, còn ${h.T('Cờ Tàn Chốt · Ba Chốt Thấp Hòa Sĩ Tượng Toàn', 'ba Chốt thấp chỉ hòa')}.</li>
</ul>
<p>Khẩu quyết chung của nhóm này: ${h.L('co-tan-khau-quyet-chuong-chot', 'Cờ tàn Chốt — khẩu quyết chung')}.</p>

<h2>Tàn cuộc Mã</h2>
<p>Mã mạnh lên rõ rệt trong tàn cuộc vì bàn cờ thoáng. Thế đầu tiên mọi người nên học:</p>
${h.B(h.slugOf('Cờ Tàn Mã · Mã Thắng Đơn Sĩ — Hình Cơ Bản 1'))}
<ul>
<li>${h.T('Cờ Tàn Mã · Mã Thắng Đơn Sĩ — Hình Cơ Bản 1', 'Mã thắng đơn Sĩ')} nhưng ${h.T('Cờ Tàn Mã · Một Mã Hòa Một Tượng', 'một Mã thường chỉ hòa một Tượng')} (chỉ ${h.T('Cờ Tàn Mã · Một Mã Khéo Thắng Một Tượng', 'khéo thắng')} trong vài thế đặc biệt).</li>
<li>${h.T('Cờ Tàn Mã · Mã Chốt Cao Thắng Khuyết Sĩ')}, còn ${h.T('Cờ Tàn Mã · Mã Chốt Thấp Hòa Khuyết Sĩ', 'Mã Chốt thấp hòa khuyết Sĩ')}.</li>
<li>${h.T('Cờ Tàn Mã · Mã Chốt Lụt Hòa Sĩ Tượng Toàn', 'Mã Chốt lụt hòa Sĩ Tượng toàn')}, nhưng Chốt còn tốt thì có thể ${h.T('Cờ Tàn Mã · Mã Chốt Khéo Thắng Sĩ Tượng Toàn (Thế 1)', 'khéo thắng Sĩ Tượng toàn')}.</li>
<li>${h.T('Cờ Tàn Mã · Hai Mã Thắng Sĩ Tượng Toàn')} — hai Mã phối hợp đủ phá mọi hàng phòng thủ.</li>
</ul>
<p>Xem thêm ${h.L('co-tan-khau-quyet-chuong-ma', 'khẩu quyết tàn Mã')}.</p>

<h2>Tàn cuộc Pháo</h2>
<p>Pháo yếu đi trong tàn cuộc vì thiếu ngòi, nên Pháo thường cần Chốt hoặc Sĩ nhà làm ngòi mới thắng được.</p>
<ul>
<li>${h.T('Cờ Tàn Pháo · Pháo Chốt Cao Thắng Đơn Tướng')}; với Chốt thấp thì ${h.T('Cờ Tàn Pháo · Pháo Chốt Thấp Hòa Đơn Tướng', 'thường hòa')}, trừ khi có ${h.T('Cờ Tàn Pháo · Pháo Chốt Thấp Có Tượng Thắng Đơn Tướng', 'Tượng nhà hỗ trợ')}.</li>
<li>${h.T('Cờ Tàn Pháo · Hai Pháo Thắng Hai Sĩ')}, nhưng ${h.T('Cờ Tàn Pháo · Hai Pháo Hòa Hai Tượng', 'hai Pháo lại hòa hai Tượng')}.</li>
<li>${h.T('Cờ Tàn Pháo · Pháo Hai Sĩ Hòa Đơn Pháo')} — Pháo đơn khó thắng Pháo.</li>
<li>${h.T('Cờ Tàn Pháo · Pháo Sĩ Hòa Hai Chốt')}.</li>
</ul>
<p>Nhiều thế Pháo Chốt dùng kỹ thuật "Pháo về nhà" (Pháo lui về làm ngòi từ phía sau) — xem ${h.L('xe-phao-don-khuyet-si-nghe-thuat-phao-ve-nha')} và ${h.L('co-tan-khau-quyet-chuong-phao', 'khẩu quyết tàn Pháo')}.</p>

<h2>Tàn cuộc Xe</h2>
<p>Xe mạnh nhất nhưng không vô địch. Những điều bất ngờ với người mới:</p>
<ul>
<li>Một Xe trước Sĩ Tượng toàn thường chỉ hòa; ${h.T('Cờ Tàn Xe · Đơn Xe Khéo Thắng Sĩ Tượng Toàn', 'chỉ khéo thắng')} khi phòng thủ đặt sai.</li>
<li>${h.T('Cờ Tàn Xe · Đơn Xe Thắng Mã Song Sĩ')}, nhưng ${h.T('Cờ Tàn Xe · Đơn Xe Hòa Mã Song Tượng', 'Xe đơn thường hòa Mã song Tượng')}.</li>
<li>${h.T('Cờ Tàn Xe · Đơn Xe Hòa Pháo Song Tượng', 'Xe đơn hòa Pháo song Tượng')} trong thế phòng thủ đúng, chỉ ${h.T('Cờ Tàn Xe · Đơn Xe Khéo Thắng Pháo Song Tượng', 'khéo thắng')} khi đối phương sơ hở.</li>
<li>${h.T('Cờ Tàn Xe · Một Xe Hòa Ba Chốt')} — ba Chốt liên kết cầm hòa được cả Xe.</li>
</ul>
<p>Xem thêm ${h.L('co-tan-khau-quyet-chuong-xe', 'khẩu quyết tàn Xe')}.</p>

<h2>Luyện tàn cuộc hiệu quả với "Máy tự giải"</h2>
<p>Mọi bài tàn cuộc trên ${h.home} đều có bàn cờ đi từng nước, nhánh biến (đi sai thì sao) và hai nút đặc biệt:</p>
<ul>
<li><strong>Máy tự giải:</strong> máy đi trọn lời giải từ thế xuất phát. Ở những thế khó, máy theo đúng lời giải trong bài trước, ra ngoài lời giải thì máy tự tính.</li>
<li><strong>Đánh thử với máy:</strong> bạn cầm bên tấn công, máy phòng thủ. Thắng được máy mới chắc là đã hiểu thế cờ.</li>
</ul>
<p>Học theo thứ tự Chốt → Mã → Pháo → Xe trong chương trình ${h.S('co-tan-co-khau-quyet')}, rồi ôn bằng ${h.S('48-bai-nguyen-ly-tan-cuoc')}. Luyện thêm ở ${h.F('/luyen-tap/chu-de/tan-cuoc', 'chủ đề Tàn cuộc')} trên trang luyện tập. Nhiều thế tàn thắng kết thúc bằng đòn sát quen thuộc, nên học song song ${h.N('cac-the-sat-cuc-co-tuong-kinh-dien', 'các thế sát cục kinh điển')}.</p>

<h2>Câu hỏi thường gặp</h2>
<h3>Một Xe có thắng được Sĩ Tượng toàn không?</h3>
<p>Thường là không — một Xe đơn độc trước Tướng có đủ hai Sĩ hai Tượng đứng đúng vị trí là thế hòa. Xe chỉ thắng được khi Sĩ Tượng của đối phương đứng sai, bị tách rời.</p>
<h3>Vì sao Chốt thấp lại yếu hơn Chốt cao?</h3>
<p>Chốt không đi lùi được. Chốt xuống quá sâu (thấp, lụt) mất khả năng khống chế các điểm quanh cung và không còn ép được Tướng, nên nhiều thế Chốt cao thắng thì Chốt thấp chỉ hòa.</p>
<h3>Có nên học tàn cuộc trước trung cuộc không?</h3>
<p>Nhiều thầy dạy cờ khuyên học tàn cuộc sớm, vì ít quân thì dễ hiểu tác dụng của từng quân, và biết tàn cuộc giúp bạn biết khi nào nên đổi quân ở trung cuộc.</p>
<h3>Hai Pháo có thắng được hai Tượng không?</h3>
<p>Thường là hòa. Hai Pháo thắng được hai Sĩ, nhưng gặp hai Tượng phòng thủ đúng cách thì khó tìm ngòi để chiếu hết.</p>
`,
});
