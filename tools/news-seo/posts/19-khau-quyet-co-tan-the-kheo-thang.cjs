// Khẩu quyết cờ tàn — các thế KHÉO THẮNG. Sơ đồ tư duy tự dựng từ chuyên đề Cờ Tàn Có Khẩu Quyết (ket-qua="kheo").
module.exports = (h) => {
  const P = 'co-tan-khau-quyet-';
  const L = (s, t) => h.L(P + s, t);
  return {
    slug: 'khau-quyet-co-tan-cac-the-kheo-thang',
    title: 'Khẩu Quyết Cờ Tàn: Các Thế Khéo Thắng — Đi Sai Một Nước Là Hòa (Sơ Đồ Tư Duy)',
    seo_title: 'Khẩu Quyết Cờ Tàn Các Thế Khéo Thắng — Sơ Đồ Tư Duy',
    seo_description: 'Sơ đồ tư duy hơn 100 thế khéo thắng cờ tàn: nước nhấp, nước chờ, ép hết nước đi, kẹp nách, bỏ quân đúng lúc. Khẩu quyết đánh số, ví dụ kiểm chứng.',
    excerpt: 'Thế "khéo thắng" là thế thắng được nhưng phải đi thật chính xác: sai một nhịp là đối phương về hình hòa. Bài viết gom hơn 100 thế như vậy thành sơ đồ tư duy có khẩu quyết đánh số, ví dụ trên bàn cờ để kiểm chứng, và giải thích sáu kỹ thuật làm nên chữ "khéo".',
    og: { lesson: P + 'hai-chot-kheo-thang-hai-si', title: 'Khẩu quyết cờ tàn: các thế khéo thắng' },
    content: `
<p><strong>Khẩu quyết cờ tàn các thế khéo thắng</strong> dành cho những thế mà bên ưu thắng được, nhưng chỉ khi đi đúng từng nhịp. Thiếu một nước chờ hay đổi quân sớm một nước là đối phương kịp về hình hòa. Đây là phần tàn cuộc phân biệt người chơi khá với người chơi giỏi. Bài viết gom toàn bộ các thế khéo thắng trong chuyên đề ${h.S('co-tan-co-khau-quyet')} trên ${h.home} thành một <strong>sơ đồ tư duy</strong>. Mỗi thế có khẩu quyết đánh số và ví dụ để kiểm chứng.</p>

<h2>Vì sao gọi là "khéo thắng"</h2>
<p>Ở thế thắng thường, bên ưu có nhiều đường đều dẫn tới thắng. Ở thế khéo thắng, phần lớn các nước "tự nhiên" lại cho đối phương thời gian sửa hình. Chữ "khéo" nằm ở mấy chỗ: <strong>đi đúng thứ tự</strong>, <strong>dùng nước chờ để chuyển lượt</strong> cho đối phương, và <strong>chọn đúng lúc bỏ quân</strong>. Vì vậy cách học cũng khác: thuộc khẩu quyết chưa đủ, phải tự đánh với máy nhiều lần.</p>

<h2>Cách học thế khéo thắng</h2>
<ol>
<li><strong>Học thế thắng và thế hòa cùng lực lượng trước.</strong> Thế khéo thắng thường nằm giữa hai thế đó. Hãy đọc ${h.N('khau-quyet-co-tan-cac-the-thang', 'các thế thắng')} và ${h.N('khau-quyet-co-tan-cac-the-hoa', 'các thế hòa')} để biết ranh giới ở đâu.</li>
<li><strong>Đọc khẩu quyết, gạch chân chữ "chờ", "nhấp", "hết nước đi".</strong> Đó là chìa khóa của gần như mọi thế khéo thắng.</li>
<li><strong>Xem ví dụ, đếm nhịp.</strong> Tại thế then chốt, thử đếm: nếu đến lượt Đen đi thì Đen phải đi quân nào? Có quân nào đi được mà không làm hỏng thế thủ không? Nếu không có, đó là lúc Đen đã "hết nước".</li>
<li><strong>Tự đánh kiểm chứng nhiều lần.</strong> Bạn cầm Đỏ, máy cầm Đen. Thua một lần thì đánh lại từ đầu và đổi đúng một nước. Thế khéo thắng chỉ thật sự thuộc khi bạn thắng được máy hai lần liền.</li>
<li><strong>Ôn ngẫu nhiên, ưu tiên thế chưa thuộc.</strong> Sơ đồ tự hỏi thế chưa đánh dấu "Đã thuộc" trước. Ôn lại sau 1, 3 rồi 7 ngày.</li>
</ol>

<h2>Sơ đồ tư duy các thế khéo thắng</h2>
${h.MM('co-tan-co-khau-quyet', 'kheo', 'Khẩu quyết cờ tàn — các thế khéo thắng', 'Bên khéo thắng luôn là Đỏ. Chú ý các câu có chữ "nước chờ", "nước nhấp", "hết nước đi". Tự đánh kiểm chứng nhiều lần, bạn cầm Đỏ.')}

<h2>Sáu kỹ thuật làm nên chữ "khéo"</h2>
<h3>1. Nước chờ, nước nhấp: ép đối phương hết nước đi</h3>
<p>Đây là kỹ thuật quan trọng nhất. Nước chờ là nước đi không đổi gì về mặt thế cờ nhưng chuyển lượt cho đối phương. Khi mọi nước của bên thủ đều làm hỏng hình, họ buộc phải tự phá. Trong ${L('hai-chot-kheo-thang-hai-si')}, câu cuối là "khi Đen hết nước đi thì dùng nước nhấp ăn Sĩ". ${L('mot-ma-kheo-thang-mot-tuong')} và ${L('mot-xe-kheo-thang-hai-ma')} đều có câu "chú ý các nước chờ, nước nhấp".</p>
<h3>2. Kẹp nách và chiếm nốt mặt còn lại</h3>
<p>Chốt đứng sát cạnh Sĩ, ép vào cửa cung, gọi là "kẹp nách". Tướng chiếm nốt mặt còn lại để Tướng đối phương hết chỗ đứng. Đây là toàn bộ khẩu quyết của ${L('mot-chot-va-tuong-kheo-thang-mot-si')}, bài đầu tiên nên học.</p>
<h3>3. Khai thác vị trí xấu nhất thời</h3>
<p>Nhiều thế chỉ khéo thắng được vì quân thủ đang đứng xấu đúng lúc đó. Chậm một nhịp là họ sửa xong. Ví dụ ${L('phao-chot-thap-kheo-thang-don-tuong')}: Chốt đã thấp mà vẫn thắng vì Tướng Đen leo lên tầng 3 quá sâu. Hay ${L('xe-chot-lut-kheo-thang-don-xe')}: Đen chiếm được trung lộ nhưng Tướng và Xe đứng quá xấu.</p>
<h3>4. Không cho đối phương sửa hình</h3>
<p>Khi đối phương đang ở hình yếu như Tượng méo hay Sĩ treo, việc đầu tiên là giữ nguyên tình trạng đó. Trong ${L('don-xe-kheo-thang-si-tuong-toan')}, Xe khống chế ngay lúc Tượng Đen đang "méo", không cho sửa về hình Tượng trung lộ.</p>
<h3>5. Bỏ quân đúng lúc</h3>
<p>Bên ưu đôi khi phải hy sinh quân để mở đường. Trong ${L('xe-chot-kheo-thang-xe-phao')}, Đỏ có thể dùng nước bỏ Xe dọa sát để chiếm lộ 6. Ở tàn Chốt có nước bỏ Chốt lụt để kéo Tướng đối phương vào chỗ xấu. Bỏ sớm hay muộn một nhịp đều thành hòa.</p>
<h3>6. Đưa về thế đã học</h3>
<p>Thế khéo thắng phức tạp thường được giải bằng cách quy về một thế gốc. Chuỗi 11 thế "Đơn Xe khéo thắng Pháo song Tượng" kết thúc bằng ${L('don-xe-kheo-thang-phao-song-tuong-the-11-tong-ket', 'bài tổng kết')}: luyện để đưa mọi biến về bài đầu tiên, với các đòn Xe khóa Pháo khóa Tướng, bắt đôi, dụ Tướng lên tầng 2, bắt Tượng.</p>

<h2>Bộ ba đối chiếu: hòa, thắng, khéo thắng</h2>
<p>Đặt ba thế cùng lực lượng cạnh nhau là cách nhanh nhất để hiểu chữ "khéo":</p>
<ul>
<li><strong>Hai Chốt đối hai Sĩ:</strong> ${L('hai-chot-thap-hoa-hai-si', 'Chốt thấp thì hòa')}, ${L('hai-chot-thang-hai-si', 'Chốt có chỗ dựa thì thắng')}, ${L('hai-chot-kheo-thang-hai-si', 'phải chiếm trục lộ 6 rồi ép hết nước đi thì mới khéo thắng')}.</li>
<li><strong>Pháo Chốt đối đơn Tướng:</strong> ${L('phao-chot-cao-thang-don-tuong', 'Chốt cao thì thắng')}, ${L('phao-chot-thap-hoa-don-tuong', 'Chốt thấp thì hòa')}, ${L('phao-chot-thap-kheo-thang-don-tuong', 'Chốt thấp nhưng Tướng Đen đứng sai thì khéo thắng')}.</li>
<li><strong>Xe Pháo đối Xe Tượng:</strong> ${L('xe-phao-hoa-xe-tuong', 'Đen chiếm được trung lộ thì hòa')}, ${L('xe-phao-kheo-thang-xe-tuong', 'Xe và Tượng Đen đứng xấu thì khéo thắng')} bằng đòn "Mò trăng đáy bể".</li>
<li><strong>Một Mã đối một Tượng:</strong> ${L('mot-ma-hoa-mot-tuong', 'thủ đúng thì hòa')}, ${L('mot-ma-kheo-thang-mot-tuong', 'Mã khóa Tướng cộng nước chờ thì khéo thắng')}.</li>
</ul>

<h2>Luyện thêm</h2>
<p>Đặt bất kỳ thế nào trong sơ đồ vào ${h.F('/luyen-tap/xep-co', 'Xếp cờ để thẩm')}, xóa bớt hoặc dời một quân rồi xem kết quả đổi thế nào. Đây là cách tự tạo bài tập "nếu Tướng Đen đứng chỗ khác thì sao". Ôn kèm các đòn sát trong ${h.S('sat-phap-13-doi-hinh')} vì phần kết của thế khéo thắng thường là một đòn sát quen thuộc.</p>

<h2>Câu hỏi thường gặp</h2>
<h3>Khéo thắng khác thắng ở điểm nào?</h3>
<p>Ở thế thắng có nhiều đường đều thắng. Ở thế khéo thắng chỉ có một vài đường, thường phải dùng nước chờ hoặc bỏ quân đúng nhịp. Đi sai một nước là đối phương kịp về hình hòa.</p>
<h3>"Nước nhấp" và "nước chờ" là gì?</h3>
<p>Nước chờ là nước đi không làm đổi thế cờ, chỉ để chuyển lượt sang đối phương. Nước nhấp là nước đi tới đi lui (thường của Xe, Pháo hoặc Tướng) nhằm tạo đúng thế "đến lượt đối phương". Cả hai đều dùng để ép bên thủ hết nước đi.</p>
<h3>Đánh với máy mãi không thắng được thì làm gì?</h3>
<p>Xem lại ví dụ và tìm thế then chốt, tức nước mà sau đó Đen hết nước tốt. Tự đặt thế then chốt ấy trong ${h.F('/luyen-tap/xep-co', 'Xếp cờ để thẩm')} và luyện riêng đoạn kết. Khi thắng được rồi mới lùi về thế đầu.</p>
<h3>Nên học thế khéo thắng khi nào?</h3>
<p>Sau khi đã thuộc thế thắng và thế hòa cùng nhánh lực lượng. Khi biết rõ ranh giới hòa và thắng, bạn sẽ thấy ngay nước "khéo" đang làm gì.</p>
`,
  };
};
