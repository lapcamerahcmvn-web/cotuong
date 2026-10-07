// Khẩu quyết cờ tàn — các thế THẮNG. Sơ đồ tư duy tự dựng từ chuyên đề Cờ Tàn Có Khẩu Quyết (ket-qua="thang").
module.exports = (h) => {
  const P = 'co-tan-khau-quyet-';
  const L = (s, t) => h.L(P + s, t);
  return {
    slug: 'khau-quyet-co-tan-cac-the-thang',
    title: 'Khẩu Quyết Cờ Tàn: Các Thế Thắng Theo Từng Loại Quân (Sơ Đồ Tư Duy)',
    seo_title: 'Khẩu Quyết Cờ Tàn Các Thế Thắng — Sơ Đồ Tư Duy Theo Quân',
    seo_description: 'Sơ đồ tư duy hơn 130 thế thắng cờ tàn Chốt, Mã, Pháo, Xe: khẩu quyết đánh số, ví dụ để kiểm chứng, đòn sát có tên và cách học nhớ lâu.',
    excerpt: 'Ưu thế quân mà không biết cách thắng thì ván cờ rất dễ thành hòa. Bài viết gom hơn 130 thế thắng cờ tàn thành sơ đồ tư duy theo từng loại quân: mỗi thế có khẩu quyết đánh số, ví dụ trên bàn cờ, nút tự đánh với máy để kiểm chứng, kèm bảy quy luật thắng tàn cuộc.',
    og: { lesson: P + 'don-ma-khau-sat-chieu', title: 'Khẩu quyết cờ tàn: các thế thắng' },
    content: `
<p><strong>Khẩu quyết cờ tàn các thế thắng</strong> trả lời câu hỏi mà ai chơi cờ tướng cũng từng gặp: đã hơn quân rồi, vì sao vẫn không thắng được? Nguyên nhân thường không nằm ở lực lượng, mà ở chỗ không biết <em>đường thắng</em>. Bài viết này gom toàn bộ các thế thắng trong chuyên đề ${h.S('co-tan-co-khau-quyet')} trên ${h.home} thành một <strong>sơ đồ tư duy</strong> chia theo Tàn Chốt, Tàn Mã, Tàn Pháo và Tàn Xe. Mỗi thế có khẩu quyết đánh số và ví dụ để bạn tự kiểm chứng.</p>

<h2>Cách học để thắng được thật, không chỉ thuộc lòng</h2>
<p>Thế thắng khác thế hòa ở chỗ có <strong>kế hoạch nhiều bước</strong>: chiếm vị trí, khóa quân, đổi quân, rồi mới tung đòn kết thúc. Vì vậy hãy học theo trình tự sau:</p>
<ol>
<li><strong>Đọc khẩu quyết như đọc kế hoạch.</strong> Câu 1 thường là bước dàn quân (Tướng chiếm mặt, Chốt qua sông), câu giữa là cách khóa hoặc đổi quân, câu cuối là đòn kết thúc. Thứ tự 1, 2, 3 trong sơ đồ chính là thứ tự thực hiện.</li>
<li><strong>Xem ví dụ và đánh dấu từng bước.</strong> Bấm "Xem ví dụ trên bàn cờ", đi từng nước và tự hỏi: nước này đang làm câu khẩu quyết số mấy?</li>
<li><strong>Bấm "Tự đánh kiểm chứng".</strong> Bạn cầm Đỏ, máy cầm Đen phòng thủ hết sức. Máy không đi theo sách nên đây là bài kiểm tra thật. Thắng được máy nghĩa là bạn đã nắm kế hoạch chứ không chỉ nhớ nước đi.</li>
<li><strong>Dùng "Che khẩu quyết" và "Ôn ngẫu nhiên".</strong> Nhìn bàn cờ thu nhỏ rồi tự nói ra kế hoạch thắng trước khi lật khẩu quyết. Đánh dấu "Đã thuộc" khi nói đúng cả ba bước.</li>
<li><strong>Học theo nhánh lực lượng.</strong> Học hết nhánh "Hai Chốt" rồi mới sang "Mã Chốt". Các thế trong cùng nhánh dùng chung ý, học liền nhau sẽ thấy quy luật.</li>
</ol>

<h2>Sơ đồ tư duy các thế thắng</h2>
${h.MM('co-tan-co-khau-quyet', 'thang', 'Khẩu quyết cờ tàn — các thế thắng', 'Bên thắng luôn là Đỏ. Mở nhánh → đọc khẩu quyết theo số thứ tự (dàn quân → khóa / đổi quân → kết thúc) → xem ví dụ → tự đánh kiểm chứng (bạn cầm Đỏ).')}

<h2>Bảy quy luật thắng cờ tàn</h2>
<h3>1. Tướng là quân tấn công</h3>
<p>Ở tàn cuộc, mặt Tướng mạnh không kém một Xe. Gần như khẩu quyết nào cũng có câu "Tướng trợ công" hoặc "Tướng chiếm trung lộ". Trong ${L('hai-chot-thang-hai-si')}, Tướng Đỏ trợ công để đổi một Chốt lấy cả hai Sĩ. Trong ${L('hai-ma-thang-ma-hai-si')}, Tướng khống chế trung lộ trước tiên rồi mới đến việc của hai Mã.</p>
<h3>2. "Tướng một mặt, Chốt một mặt"</h3>
<p>Câu khẩu quyết ngắn mà dùng nhiều nhất. Tướng chiếm một cột, Chốt chiếm cột còn lại, Tướng đối phương hết chỗ đứng. Xem ${L('phao-chot-cao-thang-don-tuong')} và ${L('ma-chot-cao-thang-khuyet-si')}, nơi Mã còn điều Chốt xuống chiếm nốt mặt còn lại.</p>
<h3>3. Khóa quân trước, bắt quân sau</h3>
<p>Bên thắng hiếm khi ăn ngay được. Họ khóa một quân phòng thủ cho nó không đi được rồi mới bắt. Có Tướng khóa Mã (${L('hai-chot-thang-ma')}), có Xe canh "chân dài" của Mã (${L('don-xe-thang-ma-song-si')}), và có Xe tiến xuống hàng 8 khóa hai Tượng (${L('don-xe-thang-si-tuong-toan')}).</p>
<h3>4. Đổi quân theo công thức để về bài đã học</h3>
<p>Một Chốt đổi hai Sĩ, một Mã đổi hai Sĩ. Ở tàn Song Xe có công thức "một Xe = Mã + hai Sĩ = Mã + hai Tượng" (${L('song-xe-thang-song-ma-si-tuong-toan')}). Đổi đúng lúc biến thế khó thành một thế đơn giản đã thuộc. Đổi sai lúc thì ngược lại: nhiều khẩu quyết dặn "không đổi tùy tiện, kẻo thành hình hòa".</p>
<h3>5. Đánh vào điểm yếu</h3>
<p>Điểm yếu có thể là Tượng méo, Sĩ treo, Tượng đứng ngược bên Tướng hay một quân phòng thủ ở quá xa. Trong ${L('hai-chot-thap-thang-hai-tuong')}, toàn bộ kế hoạch bắt đầu từ việc "nhìn ra điểm yếu: Tượng đứng ngược bên".</p>
<h3>6. Không vội</h3>
<p>Chốt xuống quá sâu sẽ mất sức (Chốt thấp thường chỉ hòa). Xe ham ăn quân lẻ cũng làm mất vị trí. Trong ${L('xe-phao-chiem-trung-thang-don-xe-chot')}, câu đầu tiên là "Xe phải chiếm trung lộ — ham ăn Chốt là hòa ngay".</p>
<h3>7. Thuộc các đòn sát có tên</h3>
<p>Phần kết thúc của rất nhiều thế là một đòn sát quen thuộc: ${L('don-ma-khau-sat-chieu', 'Mã khấu')}, ${L('sat-chieu-trac-dien-ho', 'Trắc diện hổ')}, "Thiết môn thuyên", "Song Mã ẩm tuyền", "Mò trăng đáy bể". Học kèm chuyên đề ${h.S('sat-phap-13-doi-hinh')} để nhận ra đòn sát từ xa.</p>

<h2>Cặp thế đối chiếu giúp hiểu "vì sao thắng"</h2>
<ul>
<li>${L('phao-chot-cao-thang-don-tuong', 'Pháo Chốt cao thắng đơn Tướng')} so với ${L('phao-chot-thap-hoa-don-tuong', 'Pháo Chốt thấp hòa đơn Tướng')}: cùng là Pháo Chốt, nhưng Chốt còn cao thì thắng, đã xuống thấp thì hòa.</li>
<li>${L('hai-chot-thang-hai-si', 'Hai Chốt thắng hai Sĩ')} so với ${L('hai-chot-thap-hoa-hai-si', 'Hai Chốt thấp hòa hai Sĩ')}: Chốt phải giữ "chỗ dựa" ở hàng trên, xuống hết thì mất sức ép.</li>
<li>${L('xe-phao-chiem-trung-thang-don-xe-chot', 'Xe Pháo chiếm trung thắng Xe Chốt')}: một bài nhắc rằng vị trí quan trọng hơn ăn quân.</li>
</ul>
<p>Thế thắng mà phải đi thật chính xác mới thắng được tách thành bài riêng ${h.N('khau-quyet-co-tan-cac-the-kheo-thang', 'các thế khéo thắng')}. Còn để biết đối phương sẽ thủ thế nào, hãy đọc ${h.N('khau-quyet-co-tan-cac-the-hoa', 'các thế hòa')}.</p>

<h2>Đem vào ván thật</h2>
<p>Khi ván cờ của bạn bước vào tàn cuộc, hãy hỏi bốn câu: lực lượng này thuộc nhánh nào trong sơ đồ? Tướng mình đã chiếm mặt chưa? Đối phương có quân nào đang bị khóa hoặc đứng xấu? Có thể đổi quân để về thế đã học không? Sau ván, mở ${h.F('/tai-khoan/lich-su-van-dau', 'lịch sử ván đấu')} để xem lại phần tàn cuộc. Hoặc đặt lại thế đó trong ${h.F('/luyen-tap/xep-co', 'Xếp cờ để thẩm')} và đánh với ${h.F('/choi-voi-may', 'máy')} cho tới khi thắng được.</p>

<h2>Câu hỏi thường gặp</h2>
<h3>Hơn quân rồi mà vẫn hòa, sai ở đâu?</h3>
<p>Thường là thiếu một trong ba việc: Tướng chưa tham gia tấn công, quân phòng thủ chưa bị khóa, hoặc đổi quân sai lúc nên rơi vào hình hòa. Tìm thế cùng lực lượng trong sơ đồ và so khẩu quyết với ván của bạn.</p>
<h3>Nên học tàn Chốt hay tàn Xe trước?</h3>
<p>Nên học Chốt trước, rồi Mã, Pháo, Xe. Tàn Chốt dạy hai kỹ năng nền là chiếm mặt Tướng và ép hết nước đi. Các tàn nhiều quân hơn đều dùng lại hai kỹ năng ấy.</p>
<h3>Máy phòng thủ khác sách thì làm sao?</h3>
<p>Đó chính là lý do nên tự đánh kiểm chứng. Khẩu quyết là kế hoạch chứ không phải chuỗi nước thuộc lòng. Máy đỡ khác sách thì bạn vẫn đi theo đúng các bước dàn quân, khóa quân, kết thúc.</p>
<h3>Có cần thuộc hết hơn 130 thế không?</h3>
<p>Không cần thuộc từng nước. Hãy thuộc khẩu quyết của các thế đầu mỗi nhánh. Các thế sau trong nhánh phần lớn là biến thể và dùng lại ý cũ. Thanh tiến độ "Đã thuộc" giúp bạn biết mình còn thiếu nhánh nào.</p>
`,
  };
};
