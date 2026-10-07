// Sát chiêu thực dụng — sơ đồ tư duy 27 đòn / 13 đội hình (bảng mindmaps, sinh bởi tools/sat-chieu-thuc-dung/gen.mjs)
// + liên kết chuyên đề "Sát Chiêu Thực Dụng — 13 Đội Hình".
module.exports = (h) => {
  const P = 'sat-chieu-';
  const D = (k, t) => h.L(P + 'don-' + k, t);
  const F = (k, t) => h.L(P + 'doi-hinh-' + k, t);
  return {
    slug: 'sat-chieu-thuc-dung-so-do-tu-duy-13-doi-hinh',
    title: 'Sát Chiêu Thực Dụng: Sơ Đồ Tư Duy 27 Đòn Và 13 Đội Hình Cờ Tướng',
    seo_title: 'Sát Chiêu Thực Dụng — Sơ Đồ Tư Duy 27 Đòn, 13 Đội Hình',
    seo_description: 'Sơ đồ tư duy 27 đòn sát chiêu thực dụng cờ tướng: khẩu quyết tấn công, cách phòng thủ, 13 đội hình bộ ba và hơn 600 bài tập giải trên bàn cờ.',
    excerpt: 'Mã ngọa tào, Pháo trùng, Thiết môn thuyên, Trất sát… mỗi đòn sát chiêu có một hình dạng và một cách phòng thủ riêng. Bài viết gom 27 đòn thực dụng nhất thành một sơ đồ tư duy: mỗi nhánh có khẩu quyết tấn công, ghi chú phòng thủ và ví dụ trên bàn cờ, xếp theo 13 đội hình bộ ba.',
    og: { lesson: P + 'don-ma-hau-phao', title: 'Sát chiêu thực dụng: sơ đồ tư duy' },
    content: `
<p><strong>Sát chiêu thực dụng</strong> là những đòn kết liễu lặp đi lặp lại trong ván thật: Mã ngọa tào, Pháo trùng, Thiết môn thuyên, Xe lửa dồn toa… Người chơi lâu năm nhận ra chúng chỉ sau một cái liếc, vì mắt đã quen hình. Bài viết này gom 27 đòn thành một <strong>sơ đồ tư duy</strong>: mỗi đòn có khẩu quyết khi tấn công, ghi chú khi phòng thủ và ví dụ trên bàn cờ. Tất cả nằm trong chuyên đề ${h.S('sat-chieu-thuc-dung')} trên ${h.home}, kèm hơn 600 bài tập để luyện.</p>

<h2>Vì sao học sát chiêu theo đội hình?</h2>
<p>Một ván cờ hiếm khi kết thúc bằng một quân đơn độc. Đòn sát luôn là sự phối hợp của hai, ba quân — gọi là <strong>đội hình</strong>. Chia theo đội hình giúp bạn trả lời câu hỏi thực tế nhất khi ngồi trước bàn cờ: "Mình đang có những quân nào, và chúng làm được đòn gì?". Có 13 đội hình bộ ba thường gặp: Xe Song Pháo, Xe Pháo Mã, Xe Song Mã, Mã Song Pháo, Pháo Song Mã, Song Xe Pháo, Song Xe Mã, Song Xe Chốt, Pháo Mã Chốt, Xe Mã Chốt, Xe Pháo Chốt, Song Pháo Chốt và Song Mã Chốt.</p>
<p>Cùng một đòn có thể xuất hiện ở nhiều đội hình. ${D('ma-ngoa-tao', 'Mã ngọa tào')} có mặt ở cả Xe Pháo Mã, Xe Song Mã lẫn Song Mã Chốt. Vì vậy sơ đồ dưới đây xếp đòn theo <strong>quân chủ lực</strong> (Pháo, Mã, Xe, Chốt), còn nhánh cuối liệt kê đội hình nào dùng đòn nào.</p>

<h2>Sơ đồ tư duy 27 đòn sát chiêu</h2>
<p>Mở từng nhánh: các dòng đánh số là khẩu quyết khi tấn công, dòng ghi chú là cách phòng thủ. Bấm "Xem ví dụ" để thấy đòn trên bàn cờ, "Tự đánh kiểm chứng" để tự cầm Đỏ thử với máy. Bật "Che khẩu quyết" để tự nhẩm trước khi xem.</p>
${h.MS('sat-chieu-thuc-dung-13-doi-hinh', 'Sát chiêu thực dụng — 27 đòn, 13 đội hình', 'Nhánh đầu là 4 câu hỏi tư duy; các nhánh giữa là đòn theo quân chủ lực; nhánh cuối là 13 đội hình.')}

<h2>Bốn câu hỏi trước mỗi thế cờ</h2>
<p>Đòn hay đến đâu cũng vô ích nếu không nhận ra lúc nào dùng. ${h.L(P + 'phuong-phap-tu-duy', 'Phương pháp tư duy sát chiêu')} gồm bốn câu hỏi theo thứ tự:</p>
<ol>
<li><strong>Hình này đã gặp chưa?</strong> Nếu chưa giống hẳn, có đưa về được hình đã học không?</li>
<li><strong>Có sát liên hoàn hoặc nước dọa sát không?</strong> Nếu có chuỗi chiếu liên tục, giải như ${h.L('sat-cuc-lien-hoan-tong-quan', 'sát cục liên hoàn')}.</li>
<li><strong>Dùng đội hình nào?</strong> Chọn quân chủ lực, quân đi đánh; để lại quân giữ nhà hợp lý, đừng mang quân thừa làm chậm đòn.</li>
<li><strong>Đòn nào mạnh nhất lúc này?</strong> Điểm danh các đòn của đội hình vừa chọn, rồi hỏi có cần thêm quân hỗ trợ không.</li>
</ol>

<h2>Bốn nhóm đòn và điểm chung của chúng</h2>
<h3>Đòn Pháo: tìm ngòi trước</h3>
<p>Pháo cần ngòi, nên mọi đòn Pháo đều xoay quanh câu hỏi "ngòi ở đâu?". ${D('phao-trung', 'Pháo trùng')} lấy Pháo nhà làm ngòi, ${D('ma-hau-phao', 'Mã hậu pháo')} lấy Mã, ${D('tien-chot-hau-phao', 'Tiền chốt hậu pháo')} lấy Chốt, còn ${D('muon-sat', 'Muộn sát')} mượn luôn quân đối phương đang bị tắc. ${D('thiet-mon-thuyen', 'Thiết môn thuyên')} dùng Pháo đầu khóa trung lộ như then cửa, ${D('thien-dia-phao', 'Thiên địa pháo')} dùng hai Pháo kìm Sĩ Tượng từ hai hướng.</p>
<h3>Đòn Mã: vị trí là tất cả</h3>
<p>Phần lớn đòn Mã mang tên theo ô Mã đứng: ${D('ma-ngoa-tao', 'ngọa tào')} (sát góc cung), ${D('quai-giac-ma', 'quải giác')} (góc cung trên cao), ${D('dai-giac-ma', 'đại giác')} (chân Sĩ hàng đáy), ${D('trac-dien-ho', 'trắc diện hổ')} (hoa Chốt lộ 3, 7). Mã đứng đúng ô thì chỉ cần một quân nữa vào sát. ${D('liet-ma-xe', 'Liệt mã xe')} là đòn chiếu rút: Xe đang cản chân Mã, Xe rời đi là Mã chiếu.</p>
<h3>Đòn Xe: phá Sĩ Tượng</h3>
<p>Hai Xe mạnh nhất khi phối hợp: ${D('nhi-xe-lech', 'Nhị xe lệch')} thay nhau chiếu ở ba hàng cuối, ${D('xe-lua-don-toa', 'Xe lửa dồn toa')} nối đuôi trên một đường, ${D('trat-sat', 'Trất sát')} thí một Xe để quân đối phương tự lấp đường thoát của Tướng. ${D('xuyen-tam-cuc', 'Xuyên tâm cục')} đánh thẳng vào Sĩ giữa.</p>
<h3>Đòn Chốt: chậm mà chắc</h3>
<p>Chốt chỉ đi từng bước nhưng là quân khóa rẻ nhất. ${D('tam-tien-tot', 'Tam tiến tốt')} ép Tướng bằng ba nước Chốt, ${D('nhat-tot-tong-chung', 'Nhất tốt tống chung')} dùng Chốt chiếu liên tục, ${D('tieu-dao-xuyen-tam', 'Tiểu đao xuyên tâm')} đưa Chốt vào ăn Sĩ giữa.</p>

<h2>Phòng thủ: đọc ngược sơ đồ</h2>
<p>Mỗi nhánh của sơ đồ đều có ghi chú phòng thủ. Khi đối phương có một đội hình nào đó trên bàn, hãy mở nhánh đội hình đó, liệt kê các đòn nó có thể dùng và chặn trước. Quy tắc chung rút ra từ 27 đòn: <strong>đuổi quân chủ lực</strong> (Pháo sau, Mã ở ô then chốt), <strong>chặn quân hỗ trợ</strong> (một quân đơn độc hiếm khi sát được), và <strong>giữ sẵn đường thoát</strong> cho Tướng trước khi lưới khép.</p>

<h2>Luyện tập thế nào?</h2>
<ul>
<li>Đọc bài một đòn, thuộc khẩu quyết, rồi giải các bài tập ngắn nhất của đòn đó (mỗi bài đòn liệt kê sẵn 8 bài).</li>
<li>Tiếp theo giải theo đội hình, bắt đầu từ ${F('xe-song-phao', 'Xe Song Pháo')} và ${F('xe-phao-ma', 'Xe Pháo Mã')} — hai đội hình nền tảng nhất.</li>
<li>Cuối cùng là ${F('trung-cuoc', 'trung cuộc sát chiêu')} và ${F('tong-hop', 'bài tập tổng hợp')}: không có gợi ý đội hình, giống ván thật nhất.</li>
<li>Muốn luyện phản xạ thêm, vào ${h.F('/luyen-tap', 'Luyện tập')} hoặc xem ${h.N('cac-the-sat-cuc-co-tuong-kinh-dien', 'các thế sát cục kinh điển')}.</li>
</ul>

<h2>Câu hỏi thường gặp</h2>
<h3>Sát chiêu thực dụng khác sát cục liên hoàn thế nào?</h3>
<p>Sát cục liên hoàn yêu cầu mọi nước của bên tấn công đều là nước chiếu. Sát chiêu thực dụng rộng hơn: học hình dạng đòn đánh theo đội hình, cả cách tấn công lẫn phòng thủ. Nên luyện sát cục liên hoàn trước để có sức tính, rồi học sát chiêu để nhận ra hình.</p>
<h3>Có cần thuộc hết 27 đòn không?</h3>
<p>Nên bắt đầu với những đòn hay gặp nhất: Mã ngọa tào, Pháo trùng, Mã hậu pháo, Thiết môn thuyên, Muộn sát, Trất sát. Các đòn còn lại sẽ dễ nhớ hơn vì chúng là biến thể của những đòn này.</p>
<h3>Lời giải bài tập có đáng tin không?</h3>
<p>Lời giải được máy kiểm tra: nước cuối của mọi bài là chiếu hết, và phần lớn bài được chứng minh Đen đỡ cách nào cũng thua. Khi tự giải, mọi đường chiếu hết đúng hạn đều được tính đúng.</p>
<h3>Khẩu quyết dùng để làm gì?</h3>
<p>Khẩu quyết là vài câu ngắn tóm ý chính của đòn, giúp nhớ lâu và gọi ra nhanh khi đang đánh. Đừng học thuộc nước đi; hãy thuộc khẩu quyết và hình dạng, rồi tự tìm nước trên bàn cờ.</p>
`,
  };
};
