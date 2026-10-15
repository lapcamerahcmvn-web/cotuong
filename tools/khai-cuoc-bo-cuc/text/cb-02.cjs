// Cạm Bẫy — Chương 2: Loại hình Trung Pháo đối Bình Phong Mã. Nước đi chép từ sách; lời giảng viết lại bằng lời riêng.
module.exports = {
  ch: 2, ten: 'Trung Pháo Đối Bình Phong Mã', level: 'co-ban',
  y: 'Trung Pháo quá hà Xe đối Bình Phong Mã là thế trận phổ biến nhất. Cạm bẫy thường gặp: Xe Đen xuống hàng 2 quấy nhiễu, tặng Chốt 7 phản kích lộ 3, Mã tróc Xe… Nắm nước mấu chốt để phá bẫy là bài học quan trọng cho người chơi mọi trình độ.',
  cuoc: [
    {
      n: 11, t: 'Bất Công Tự Phá',
      s: 'Xe Đen tiến gấp xuống hàng 2 như hổ rình mồi — nước biến có tính lừa gạt. Đỏ bổ Sĩ hay nhảy Mã cửa sông đều tự làm loạn thế trận; mặc kệ Xe Đen, đưa Xe trái qua hà áp chế chủ lực Đen thì cạm bẫy "chưa đánh đã tan".',
      c: `<p>Trung Pháo quá hà Xe đối Bình Phong Mã. Theo lẽ thường Đen nên bình Pháo 7, Xe bình 4, nhảy Mã 8 — trận thức <strong>Ngũ cửu Pháo</strong> kinh điển. Ở đây Đen <strong>tiến gấp Xe xuống hàng 2</strong> như hổ nhìn chằm chằm — nước biến có tính lừa gạt.</p>
<h2>Ba cách đi của Đỏ</h2>
<ul>
<li><strong>Bổ Sĩ</strong> (mạch chính): mềm tay — không lợi cho phòng thủ mà còn bị lợi dụng. Đen nhảy Mã xuất kích phát huy Pháo lộ 7; Đỏ bình Xe cản Pháo (bắt buộc), Đen lui Mã cầu biến, rồi Pháo tiến 5 — Đen phản kích thuận lợi.</li>
<li><strong>Mã tiến 6</strong> (nhánh phụ): hình trận lỏng lẻo — Đen bình Xe tróc Mã cướp tiên; chủ lực Đỏ bị kìm, Đen chủ động.</li>
<li><strong>Xe 8 tiến 6</strong> (nhánh phụ): <strong>mặc kệ Xe Đen quấy nhiễu, chỉ huy Xe qua hà áp chế chủ lực Đen</strong> — nước bao quát toàn cuộc. Đen bình Xe 3 thì Mã lui giữa (Xe Đen lặn lội xa xôi lại nằm ở hiểm địa), toàn bộ chủ lực Đen bị kìm; Đen bình Xe 4 thì Đỏ thúc Chốt giữa linh hoạt song Mã — khống chế cục diện.</li>
</ul>
<h2>Bài học</h2>
<p>Xe Đen quấy nhiễu dù "nhìn chằm chằm như hổ đói" cũng không tạo được uy hiếp trực tiếp. Chỉ cần hiểu rõ, không để bị mê hoặc, dùng <strong>Xe quá hà tranh vị trí trọng yếu</strong> là giành ưu thế.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 X2.6 P8-9 X2-3 P9/1 M8.7 S4.5 P8-9 X1-2 X9-8 X8.8 S6.5 P9-7 X3-4 M7.8 X4-3 M8/9 X3/1 V3.5 X3.2 X8-7 M7.6 P2.5',
      k: {
        18: 'Xe tiến gấp xuống hàng 2 như hổ rình — nước biến có tính lừa gạt. Lẽ thường nên bình Pháo 7, Xe bình 4, Mã tiến 8 (Ngũ cửu Pháo kinh điển). Đỏ: bổ Sĩ, Mã tiến 6 hay Xe tiến 6?',
        19: 'Mềm tay — không lợi cho phòng thủ, ngược lại bị lợi dụng.',
        22: 'Nhảy Mã xuất kích, phát huy uy hiếp của Pháo lộ 7.',
        23: 'Bình Xe cản Pháo — nước bắt buộc.',
        24: 'Lui Mã cầu biến (lui về 7 thì hai bên có thể lặp lại thành hòa).',
        30: 'Đen phản kích thuận lợi, Đỏ bất lợi.',
      },
      h: { 18: 'p041_0' },
      v: [
        { from: 'main', after: 17, m: 'P9-7 X3-4 M7.8', k: { 1: 'Lẽ thường: bình Pháo 7…', 3: '…trận thức Ngũ cửu Pháo kinh điển.' } },
        { from: 'main', after: 21, m: 'X8-7 P5-6 X7.1 V7.5 X7/1 P9/1 P2.6 X4.2 P7-9 X4-3', k: { 1: 'Nếu tấn công gấp bằng Xe bình 7…', 10: '…Đen mất quân.' } },
        { from: 'main', after: 21, m: 'B7.1 X4.2 P2/1 X8.8 X2.1 X4-3 M7.6 B3.1', k: { 1: 'Nếu tiến Chốt 7…', 2: 'Giải vây kịp thời.', 8: '…Đỏ hơi ưu.' } },
        { from: 'main', after: 22, m: 'P9/1 P7.5 M3/1 P2.6', k: { 1: 'Nếu lui Pháo…', 4: '…Đen đại ưu.' } },
        { from: 'main', after: 23, m: 'M8/7 X3-4 M7.8 X4-3', k: { 1: 'Nếu lui Mã về 7…', 4: '…bất biến theo vòng tuần hoàn có thể thành hòa.' } },
        { from: 'main', after: 18, m: 'M7.6 X8-4 M6.7 P9-7 X3-4 M7.8 X4-3 M8/9 X3/1 V3.5 X3/1 P2.5 S4.5 X2.1', k: { 1: 'Mã tiến 6 — hình trận lỏng lẻo, dễ bị lợi dụng.', 2: 'Bình Xe tróc Mã, thuận thế cướp tiên.', 14: 'Chủ lực Đỏ bị kìm — Đen chủ động.' } },
        { from: 5, after: 24, m: 'X8.5 P7.5 V3.1 B7.1 X8-2 P2.7 S4.5 P7-1 V1.3 P1-3 B7.1 X2.7', k: { 1: 'Biến thú vị: Xe tiến 5…', 12: '…phế quân xong Đen có thế công lớn mạnh.' } },
        { from: 'main', after: 18, m: 'X8.6 X8-3 M3/5 P9-7 X3-4 M7.8 P5-3 X3-4 X4-2 M8.9 X2/3 P7-9 B3.1 V3.5 B3.1', k: { 1: 'Mặc kệ Xe Đen quấy nhiễu, chỉ huy Xe qua hà áp chế chủ lực Đen — nước bao quát toàn cuộc! Đen: Xe bình 3 hay Xe bình 4?', 2: 'Xe bình 3.', 3: 'Bề ngoài bị ép lui Mã — thực tế Xe Đen lặn lội xa xôi không còn nước hiểm, lại nằm ở hiểm địa.', 10: 'Nước bắt buộc (Mã lui 7 thì Xe bình 3, Đen càng khó).', 15: 'Toàn bộ chủ lực Đen bị kìm — Đỏ thắng thế.' }, h: { 1: 'p043_0' } },
        { from: 7, after: 19, m: 'X8-4 B5.1 P9-7 X3-4 V3.5 M7.5 X4/2 B5.1 B5.1 P5.3', k: { 1: 'Xe bình 4.', 2: 'Thúc Chốt giữa linh hoạt song Mã, liên kết chủ lực (không thể Xe bình 7 sát Chốt — Đen có Pháo tiến 4 phản kích).', 10: 'Đỏ khống chế cục diện, chiếm ưu.' } },
        { from: 7, after: 27, m: 'M8.7 X2-3', k: { 1: 'Nếu Mã tiến 7…', 2: '…Xe bình 3 — Đen càng khó ứng phó.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 12, t: 'Dũng Sấm Cấm Khu',
      s: 'Đen kiên quyết tặng Chốt 7 — cạm bẫy điển hình, phản kích lên lộ 3. Đỏ ham ăn Chốt hay lui Xe giữ Mã đều chưa đủ; "biết núi có hổ vẫn lên núi" — bình Xe tróc Pháo xông vào khu cấm, rồi Pháo nổ Chốt giữa — thì Đỏ phá tan cạm bẫy.',
      c: `<p>Đen <strong>kiên quyết tặng Chốt 7</strong> — cạm bẫy bố cục điển hình: nhanh chóng tháo gỡ cục diện, phản kích lên tuyến đường 3 của Đỏ. Bên tiên thủ cần làm rõ vấn đề này, nếu không rất dễ bị lợi dụng (nước chính xác của Đen là nhảy Mã 8 — Ngũ cửu Pháo quá hà Xe đối Bình Phong Mã bình Pháo đổi Xe).</p>
<h2>Hai cách đi của Đỏ</h2>
<ul>
<li><strong>Xe tiến tróc Pháo</strong> (mạch chính): lánh nặng tìm nhẹ, có tính sách lược; Đen tiếp tục xông Chốt, đưa cuộc chiến vào biến phức tạp — cuối cùng thế mỗi người một vẻ, Đen hài lòng.</li>
<li><strong>Chốt 3 tiến</strong> (nhánh phụ): dùng Chốt khử Chốt, rất có lực; Đen nhảy Mã tróc Xe. Đỏ có ba cách:
<ul>
<li>Chốt 3 tiến tiếp (chuẩn bị phế quân) — tính khả thi đáng ngờ; Đen hiến Mã tranh công, Đỏ thất thế.</li>
<li>Xe lui giữ Mã — ổn chắc nhưng thế công không đủ; hai bên đơn giản hóa, khả năng hòa lớn.</li>
<li><strong>Xe bình tróc Pháo</strong> — "biết rõ trên núi có hổ vẫn lên núi": dũng cảm xông vào khu cấm, rồi <strong>Pháo nổ Chốt giữa</strong> mượn đòn đánh Tướng tạo căn cho Mã phải — một đòn phá tan phản kích, Đỏ lấy lại quân, hơn Chốt chiếm ưu.</li>
</ul></li>
</ul>
<h2>Bài học</h2>
<p>Chọn nước chuẩn xác và suy nghĩ chặt chẽ thì cạm bẫy tặng Chốt 7 khó thành, Đen rơi vào thế "giật gấu vá vai". Tổ hợp <strong>bình Xe xông khu cấm + Pháo nổ Chốt giữa</strong> là vũ khí sắc bén, rất đáng ghi nhớ.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 X2.6 P8-9 X2-3 P9/1 M8.7 S4.5 P8-9 X1-2 X9-8 P9-7 X3-4 B7.1 X4.2 B7.1 X4-3 B7.1 M7.6 X8.5 P9-3 V7.9 M6.7 M7.6 X8.4 M6/5 M7.5 P2-5 X8.5 M3/2',
      k: {
        20: 'Kiên quyết tặng Chốt — cạm bẫy điển hình: tháo gỡ cục diện, phản kích lên lộ 3. (Nước chính xác là Mã tiến 8.) Đỏ: Xe tiến 2 hay Chốt 3 tiến?',
        21: 'Vươn Xe tróc Pháo — lánh nặng tìm nhẹ, có tính sách lược.',
        22: 'Đưa cuộc chiến vào biến phức tạp.',
        26: 'Quyết đoán! Tiếc Chốt qua sông mà tiến tiếp thì Pháo Đỏ tiến 4, phục đòn công kích — Đỏ ưu.',
        28: 'Đề phòng tất yếu.',
        30: 'Tiện tay Xe sát Chốt thì Pháo Đỏ tiến — Đen bị khốn.',
        32: 'Khéo léo mời đổi, đơn giản hóa.',
        36: 'Thế mỗi người một vẻ — Đen có thể hài lòng.',
      },
      h: { 20: 'p044_0' },
      v: [
        { from: 'main', after: 21, m: 'P2/1 X8.8 X2.1 X4-3 M7.6 B3.1', k: { 1: 'Nếu lui Pháo…', 6: '…Đỏ dùng 1 Xe đổi 2, hơn Chốt, hơi ưu.' } },
        { from: 'main', after: 24, m: 'S6.5 X8.2 X8.6 V7.5 X3-4 X8.3 X8-7 P2.4', k: { 1: 'Nếu bổ Sĩ…', 8: '…Đen ưu.' } },
        { from: 'main', after: 25, m: 'B7.1 P9.4', k: { 1: 'Tiếc Chốt mà tiến tiếp…', 2: '…Đỏ phục đòn công kích — Đỏ ưu.' } },
        { from: 'main', after: 27, m: 'X8-4 X3/1 V7.5 P3-1', k: { 1: 'Nếu Xe bình 4…', 4: '…cánh trái Đen trống rỗng, Đỏ chủ động.' } },
        { from: 'main', after: 29, m: 'X8-3 P3.4', k: { 1: 'Tiện tay sát Chốt…', 2: '…Đen bị khốn!' } },
        { from: 'main', after: 20, m: 'B3.1 M7.8 B3.1 P7.6 P5.4 M3.5 P9-3 M8.9 P3/1 M5.4 X4-2 M9/7 X2.3 M7.6 P3-4 M4.3 X8-9 P2-5 V7.5 X2.6', k: { 1: 'Tiếp nhận khiêu chiến — dùng Chốt khử Chốt, rất có lực.', 2: 'Nhảy Mã tróc Xe, phục thủ đoạn. Đỏ: Chốt 3 tiến, Xe lui 4 hay Xe bình 3?', 3: 'Chuẩn bị phế quân mưu thế — tính khả thi đáng ngờ.', 9: 'Tránh trước một nước — khá ngoan cường.', 11: 'Ý đồ đánh một đòn cầu may.', 12: 'Hiến Mã tranh công!', 17: 'Chọn lựa bắt buộc.', 20: 'Thế công Đen khá mạnh — Đỏ thất thế.' }, h: { 2: 'p046_0' } },
        { from: 5, after: 28, m: 'X4-2 X8-9 X2-1 M9.7 X1.3 M5.4', k: { 1: 'Nếu bình Xe ngay…', 6: '…hiến Mã tranh công, Đỏ khó ứng phó.' } },
        { from: 5, after: 30, m: 'X8.7 X2.2 M7.6 V3.5 V3.5 X8.8 P3/1 M9.7', k: { 1: 'Nếu Xe tiến 7…', 8: '…Đen hơn quân, ưu.' } },
        { from: 5, after: 36, m: 'X8.7 X2.2 X2/7 X2-6', k: { 1: 'Sai lầm Xe tiến 7…', 4: '…Đỏ không thể "bỏ trước đoạt sau".' } },
        { from: 5, after: 22, m: 'X4/4 M8.9 V3.1 M9.7 P5-3 P2.5 M7.6 P2-7 X8.9 M3/2 P9-3 X8.7 X4-8 X8-7 X8.7 V7.5 M6.7 S5/4', k: { 1: 'Lui Xe bảo vệ Mã — ổn chắc nhưng thế công không đủ.', 2: 'Tiến Mã xâm nhập — thủ đoạn đột phá thường gặp.', 3: 'Bổ Tượng củng cố — rất cần thiết.', 6: 'Tiến Pháo đánh xâu.', 10: 'Lui Mã ăn Xe — không bị mê hoặc.', 18: 'Mỗi bên có chỗ kiêng dè, chủ lực còn ít — khả năng hòa lớn.' } },
        { from: 9, after: 24, m: 'M3.1 P7.8 S4.5 X8.6', k: { 1: 'Nếu Mã tiến biên…', 4: '…bỏ trước đoạt sau, Đen đoạt Tượng dễ đi quân.' } },
        { from: 5, after: 22, m: 'X4-3 M8/7 X3-4 M7.8 X4-3 M8/9 P5.4 V3.5 X3-4 P2.5 M7.6 P2/2 M6.7 P7.6 X8.4 X2.5 M7/8 M3.4 P5/1 M4.2 X4-8', k: { 1: '"Biết rõ trên núi có hổ vẫn lên núi" — bình Xe tróc Pháo, dũng cảm xông vào khu cấm!', 2: 'Lui Mã tróc Xe — xu thế tất yếu.', 7: 'Pháo nổ Chốt giữa — nước quyết định: mượn đòn đánh Tướng tạo căn cho Mã phải, một đòn phá tan phản kích. (Không được mềm tay lui Xe — Đen phục kích, Xe Đỏ sa "vũng bùn".)', 10: 'Gửi gắm hy vọng vào chiến thuật.', 12: 'Nếu Xe tiến 7 thì vô hại — Đỏ thoát Mã oa tâm, hơn Chốt.', 21: 'Đỏ lấy lại quân, hơn Chốt — thắng lợi trong tầm tay.' } },
        { from: 11, after: 28, m: 'X3/1 V3.5 X3.2 P2-1', k: { 1: 'Nếu mềm tay lui Xe…', 4: '…Xe Đỏ sa "vũng bùn" — Đen thắng chắc.' } },
        { from: 11, after: 31, m: 'M3.5 X4-5', k: { 1: 'Nếu Mã tiến giữa…', 2: '…đổi một quân, Xe Pháo cánh phải Đen bị kìm.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 13, t: 'Thủ Châu Đãi Thố',
      s: 'Đỏ khởi hoành Xe trái "ôm cây đợi thỏ" — chờ Đen sai lầm. Đen nôn nóng phản kích, thăng Pháo hay bình Xe vào chân Tượng đều để Đỏ ưu; xông Chốt 7 phản kích ngay — bỏ giả lấy thật — mới là đối sách hay nhất.',
      c: `<p>Đỏ nhảy Mã cửa sông (một trong các nước chủ yếu); Đen tiến Xe tróc Mã — chọn lựa ổn chắc nhất. Đỏ thăng Pháo bảo vệ Mã, hai bên tranh đoạt ở bờ sông; Đen bổ Tượng củng cố là tất yếu.</p>
<h2>Cạm bẫy thăng Xe chờ thời</h2>
<p>Đỏ <strong>khởi hoành Xe trái "ôm cây đợi thỏ"</strong> — chờ Đen mắc sai lầm, tính lừa gạt khá cao (nước chính xác là Pháo bình 6, vẫn giữ chút tiên thủ). Đen có bốn cách:</p>
<ul>
<li><strong>Chốt 3 tiến</strong> (mạch chính): nôn nóng phản kích = tự sa lưới. Mã Đỏ đạp Chốt giữa, Xe tiến, lui Mã chắc — Đỏ nhiều thủ đoạn, ưu thế lớn.</li>
<li><strong>Pháo tiến 1</strong>: hiệu suất thấp, Đỏ thừa cơ chỉnh hình; Đỏ hơn Chốt, vị trí rất tốt.</li>
<li><strong>Xe bình vào chân Tượng</strong>: cấu tứ không tệ (bảo vệ Mã, xông Chốt 3), nhưng Đỏ chỉnh hình gọn — khó tránh hình thức; Đỏ ưu.</li>
<li><strong>Chốt 7 tiến</strong>: xông Chốt phản kích ngay — không dễ phát hiện, là đối sách hay; Đen kìm chế Đỏ, quân lực linh hoạt, đủ bù kém Chốt.</li>
</ul>
<h2>Bài học</h2>
<p>Ba cách đầu của Đen đều không thỏa đáng, cạm bẫy Đỏ đạt hiệu quả. Biến 4 <strong>xông Chốt phản kích, bỏ giả lấy thật</strong> là đối sách hay nhất — Đỏ được không bù mất.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 X2.6 P8-9 X2-3 P9/1 M8.7 S4.5 M7.6 P9-7 X3-4 X8.5 P8.2 V3.5 X9.1 B3.1 M6.5 X8-3 M5.7 X3-2 X4.2 P7-9 M7/6 V5/3 X9-6',
      k: {
        15: 'Nhảy Mã cửa sông — một trong các nước chủ yếu (Pháo bình 9 thì thành Ngũ cửu Pháo bình Pháo đổi Xe).',
        18: 'Xe tiến tróc Mã — chọn lựa ổn chắc nhất.',
        19: 'Thăng Pháo bảo vệ Mã — hai bên tranh đoạt bờ sông. (Không tiện Mã đạp Chốt giữa ngay.)',
        20: 'Bổ Tượng củng cố — tất yếu (nôn nóng tiến Chốt 3 thì Đỏ đắc quân).',
        21: 'Khởi hoành Xe "ôm cây đợi thỏ" — chờ Đen sai, tính lừa gạt cao. Đen có 4 cách: Chốt 3 tiến, Pháo tiến 1, Xe bình 3, Chốt 7 tiến.',
        22: 'Nôn nóng phản kích = tự sa lưới.',
        26: 'Nếu Xe bình 3 thì Mã đạp Sĩ — Đỏ ưu.',
        29: 'Ổn chắc khả thi.',
        31: 'Đỏ còn nhiều thủ đoạn (Mã tiến 4…) — ưu thế lớn.',
      },
      h: { 21: 'p050_0' },
      v: [
        { from: 'main', after: 18, m: 'M6.5 M3.5 P5.4 M7.5 X4-5 P2-7', k: { 1: 'Nếu Mã đạp Chốt giữa ngay…', 6: '…Đỏ mất tiên, bị tấn công.' } },
        { from: 'main', after: 19, m: 'B3.1 M6.5 X8-3 P8-9 V3.1 M5.7', k: { 1: 'Nôn nóng tiến Chốt 3…', 6: '…Đỏ đắc một quân, ưu thế lớn.' } },
        { from: 'main', after: 20, m: 'M6.5 X8-3 P8-9 X1-3', k: { 1: 'Nếu Mã đạp Chốt giữa…', 4: '…Đỏ khó được lợi.' } },
        { from: 'main', after: 20, m: 'P5-6 B3.1 B3.1 X8/1 B7.1 V5.3 P8-7 M3.4 P6.3 B7.1 P6.3 P7-4 P7-3 X8-7 V7.5 V3/5', k: { 1: 'Nước chính xác: Pháo bình 6 — vẫn giữ chút tiên thủ.', 16: 'Đen cũng có thể chấp nhận.' } },
        { from: 'main', after: 25, m: 'X1-3 M7.5', k: { 1: 'Nếu Xe bình 3…', 2: '…Mã đạp Sĩ — Đỏ ưu.' } },
        { from: 'main', after: 28, m: 'M7.5 P9-5 P5.5 P5.5 M3.5 X2-5', k: { 1: 'Nếu Mã đạp giữa…', 6: '…Đen phản kích mãnh liệt.' } },
        { from: 'main', after: 21, m: 'P2.1 X4/4 X8/1 P5-6 P2/2 V3.5 B7.1 B3.1 B3.1 X9-7 B3.1 X7.3 M3.2 P8.4 P7-2 X4.4', k: { 1: 'Thăng Pháo — hiệu suất thấp, Đỏ thừa cơ chỉnh hình.', 7: 'Phế Chốt để thông Xe trái.', 10: 'Tinh tế — khai thông Xe trái.', 16: 'Đỏ hơn Chốt, quân lực vị trí cực tốt.' } },
        { from: 6, after: 27, m: 'P2-3 X9-8 B3.1 B7.1 V5.3 P8-9 X1-3 X8.6', k: { 1: 'Nếu Pháo bình 3…', 8: '…Đỏ chiếm ưu.' } },
        { from: 'main', after: 21, m: 'X1-3 X9-6 X8.1 P5-7 X3-4 P7-6 X4-3 V3.5', k: { 1: 'Xe bình vào chân Tượng — bảo vệ Mã, xông Chốt 3; cấu tứ không tệ.', 2: 'Trông như ngốc nhưng hay — phục nước tiến Chốt 7.', 8: 'Đỏ chiếm ưu thế.' } },
        { from: 8, after: 22, m: 'P5-7 B3.1 B3.1 X8/1 B7.1 B7.1', k: { 1: 'Bình Pháo dễ bị mê hoặc…', 6: '…dưới phản kích mãnh liệt Đỏ khó khống chế.' } },
        { from: 8, after: 23, m: 'X8/1 M6.7', k: { 2: 'Đỏ ưu.' } },
        { from: 8, after: 23, m: 'X3-4 P5-6', k: { 2: 'Đỏ ưu.' } },
        { from: 'main', after: 21, m: 'B7.1 M6.7 X1-4 B3.1 X8.1 X4/4 X8-7 X9-7 X4.6 V3.1 X4-2 X7-2 P2/1', k: { 1: 'Xông Chốt 7 phản kích ngay — không dễ phát hiện, là đối sách hay!', 10: 'Tiến Xe yếu đạo — chuẩn bị phản kích.', 13: 'Đen kìm chế Đỏ, quân lực linh hoạt — đủ bù kém Chốt.' } },
        { from: 12, after: 22, m: 'B3.1 X8-7 M3/5 X7.1', k: { 1: 'Nếu tiến Chốt 3…', 4: '…hình thế Đen có sức bật.' } },
        { from: 12, after: 24, m: 'P8-3 P7.4 B3.1 X8-7 X9-8 X4-2', k: { 1: 'Nếu Pháo bình 3…', 6: '…Đen phản tiên.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 14, t: 'Nhất Cử Lưỡng Dụng',
      s: 'Đỏ nhảy Mã đạp Chốt giữa — cạm bẫy điển hình khi quân lực hai bên đan xen. Đen lui Pháo hay dùng Mã phải đạp đều thiệt; dùng Mã trái đạp Mã rồi thăng Pháo "nhất cử lưỡng dụng" thì phá được bẫy.',
      c: `<p>Cùng dạng Trung Pháo quá hà Xe đối Bình Phong Mã, Đỏ <strong>nhảy Mã đạp Chốt giữa</strong> — nước công có tính cạm bẫy (thường thì Pháo bình 6, Đỏ hơi tiên). Hai bên đi những nước bắt buộc tới thế Hình 18; Đen có ba cách:</p>
<ul>
<li><strong>Lui Pháo</strong> (mạch chính): thủ tiêu cực, cho Đỏ cơ hội — Pháo bình 7 kìm chế, đổi quân đoạt thế; Đen tiến Chốt 3 xem nhẹ diệu thủ, Xe Đỏ tiến chặn đánh cắt đứt song Pháo — Đỏ đắc quân.</li>
<li><strong>Mã phải đạp Mã</strong>: vẫn không giải quyết vị Pháo chật hẹp; Đỏ tránh đổi, ép Đen phế quân, Pháo bình trấn trung, Xe bình 4 tinh diệu — Đỏ thắng.</li>
<li><strong>Mã trái đạp Mã</strong>: hữu kinh vô hiểm — đối sách tốt nhất; thăng Pháo <strong>"nhất cử lưỡng dụng"</strong>: vừa trừ uy hiếp mất Mã vừa phòng Xe tróc Pháo, làm tròn tuyến phòng thủ — Đen đối kháng hài lòng.</li>
</ul>
<h2>Bài học</h2>
<p>Trong cục diện quân lực đan xen, ứng phó không thỏa đáng là thiệt ngay. Biến 3 bỏ giả giữ thật, nước thăng Pháo ngầm bảo vệ Mã có cấu tứ tinh xảo, đáng học hỏi.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 X2.6 P8-9 X2-3 P9/1 M8.7 S4.5 M7.6 P9-7 X3-4 X8.5 P8.2 V3.5 M6.5 X8-3 P8-9 X1-3 X9-8 P2/1 V7.9 Xt.1 P9-7 M7.5 P5.4 B3.1 P7.3 Xs.2 X4.2',
      k: {
        21: 'Nhảy Mã đạp Chốt giữa — nước công có tính cạm bẫy (thường: Pháo bình 6, Đỏ hơi tiên).',
        25: 'Hai bên đi nước bắt buộc tới thế này. Đen: lui Pháo, Mã phải đạp hay Mã trái đạp?',
        26: 'Lui Pháo thủ tiêu cực — cho Đỏ cơ hội tốt.',
        29: 'Bình Pháo kìm chế — đổi quân đoạt thế, đơn giản có lực.',
        32: 'Xem nhẹ diệu thủ của Đỏ — cục thế nhanh xấu đi. Chỉ có thể Pháo bình 4, bị động nhưng còn giằng co.',
        35: 'Diệu thủ chặn đánh — cắt đứt song Pháo! Đỏ tất đắc quân chiếm ưu.',
      },
      h: { 25: 'p053_0' },
      v: [
        { from: 'main', after: 20, m: 'P5-6', k: { 1: 'Thông thường: Pháo bình 6 — Đỏ hơi tiên.' } },
        { from: 'main', after: 31, m: 'P2-4', k: { 1: 'Chỉ có thể Pháo bình 4 — bị động nhưng còn giằng co.' } },
        { from: 'main', after: 25, m: 'M3.5 X8.7 X3-6 X4-2 M5.3 X2.2 M3.4 X2-3 M4.3 Tg5.1 X3-4 P9-5 M7.5 X3-4', k: { 1: 'Mã phải đạp Mã — vẫn không giải quyết vị Pháo chật hẹp, còn nguy cơ ngầm.', 5: 'Tránh đổi — đương nhiên.', 8: 'Nén đau phế quân, liều một phen — bất đắc dĩ.', 9: 'Bình Xe sát Pháo — việc đáng làm thì làm.', 13: 'Pháo trấn trung — kìm Xe cánh phải Đen, xác lập thế thắng.', 16: 'Tinh diệu! Nếu Xe lui thì Pháo tiến, chống Sĩ, Pháo trùng tuyệt sát.' } },
        { from: 2, after: 31, m: 'P7-6 P5.5 Tg5-4 P5/3', k: { 1: 'Nếu Pháo bình 6…', 4: '…thế quân Đỏ cực tốt.' } },
        { from: 'main', after: 25, m: 'M7.5 X8.7 P7.1 X8/1 B1.1 P9-8 M5.3', k: { 1: 'Mã trái đạp Mã — hữu kinh vô hiểm, đối sách tốt nhất.', 3: '"Nhất cử lưỡng dụng": vừa trừ uy hiếp mất Mã vừa phòng Xe tróc Pháo — làm tròn tuyến phòng thủ.', 7: 'Đen giành thế đối kháng hài lòng.' } },
        { from: 4, after: 27, m: 'X3-6 X4-3 P7.1 X8/1', k: { 1: 'Nếu Xe bình 6…', 4: '…Đen khó tránh mất quân.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 15, t: 'Công Thủ Vẹn Toàn',
      s: 'Đen thoái Pháo phản kích — cạm bẫy ẩn huyền cơ. Đỏ tham ăn Mã Đen thì vấp liên hoàn phản kích; lui Mã oa tâm "lấy thoái làm tiến" — trong thủ có công — thì Đen tiến thoái lưỡng nan.',
      c: `<p>Đối với bố cục <strong>Cao Xe bảo Mã</strong> của Đen, Đỏ bình Pháo tăng áp lực lên Mã phải — cách đánh thường dùng để tranh chủ động. Đen <strong>thoái Pháo phản kích trực tiếp</strong> — cạm bẫy ẩn huyền cơ (nước chính xác là phi Tượng gia cố). Đỏ tiến Chốt khẩn cấp, Đen dùng thủ đoạn cưỡng chế ép tới Hình 19: trông như Đỏ lập tức đắc quân.</p>
<h2>Ba cách của Đỏ</h2>
<ul>
<li><strong>Chốt ăn Mã</strong> (mạch chính): khinh suất mạo hiểm — Đen dịch chuyển xảo diệu, phế quân công sát toàn tuyến; cuối cùng "nhất Xe thập tử hàn", Đen có thể thắng cờ tàn.</li>
<li><strong>Pháo ăn Mã</strong>: đắc một quân nhưng phiền phức kéo đến; Đen bình Pháo, kìm chủ lực Đỏ, đoạt lại quân, chủ động.</li>
<li><strong>Lui Mã oa tâm</strong>: nước hay công thủ trọn vẹn — có Chốt qua sông nên lui Mã tăng cường trận doanh, đẩy nan đề cho đối thủ; Chốt 3 tiến đột phá xảo diệu, Đỏ chi phối toàn cuộc.</li>
</ul>
<h2>Bài học</h2>
<p>Trong đối công, vừa phải hung ác tấn công vừa phải giữ an toàn hậu phương. Lui Mã oa tâm, <strong>trong thủ tàng công</strong>, là thị phạm kinh điển của "công thủ vẹn toàn".</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 X2.6 P8-9 X2-3 X8.2 P8-7 P2/1 B7.1 P2-7 X3-4 X8.6 B7.1 X8-2 B7.1 P9-3 P7.7 X1-3 X4.1 P7-3 M3/5 Pt-5 P5.4 P3-5 P5.2 S4.5 X4-3 X3.9 X3-5 X2-4 M8.7 X3-1 X5/3 X1-3 X5-7 X4.1 M7/6 X3/4',
      k: {
        13: 'Bình Pháo tăng áp lực lên Mã phải Đen — cách đánh tranh chủ động.',
        14: 'Thoái Pháo phản kích trực tiếp — cạm bẫy ẩn huyền cơ. (Chính xác: phi Tượng gia cố.)',
        15: 'Khẩn cấp, không thể chậm trễ.',
        20: 'Đen dùng thủ đoạn cưỡng chế ép tới thế này — trông như Đỏ lập tức đắc quân. Đỏ: Chốt ăn Mã, Pháo ăn Mã hay lui Mã?',
        21: 'Khinh suất mạo hiểm — ưu thế tưởng tượng tan nhanh, điểm yếu lộ rõ.',
        25: 'Thủ đoạn Đỏ gửi gắm hy vọng — nhưng Đen dịch chuyển xảo diệu, cục diện đổi hẳn.',
        28: 'Nước qua cửa tất yếu khiến cờ Đỏ lu mờ.',
        29: 'Thử liều một phen.',
        30: 'Phế quân công sát — Đen phản kích toàn tuyến.',
        39: 'Thoái Xe là bắt buộc.',
        44: '"Nhất Xe thập tử hàn" — Đen có thể thắng cờ tàn.',
      },
      h: { 20: 'p056_0' },
      v: [
        { from: 'main', after: 13, m: 'V3.5', k: { 1: 'Chính xác: phi Tượng gia cố hình trận phòng thủ.' } },
        { from: 'main', after: 20, m: 'X4.2 X1.1', k: { 1: 'Xe tiến tróc cũng không thu hoạch gì…', 2: '…Đen có nước giải.' } },
        { from: 'main', after: 22, m: 'M3/5 P7-2', k: { 1: 'Nếu lui Mã…', 2: '…Đen phản tiên.' } },
        { from: 'main', after: 28, m: 'X4-3 P5.4 X3/1 P3-5 X3-5 X3.6', k: { 1: 'Nếu Xe bình 3…', 6: '…Đỏ bó tay chịu trói.' } },
        { from: 'main', after: 38, m: 'X5-7 Tg5-4 M5.4 X4-3 S4.5 X1-3', k: { 1: 'Nếu Xe bình 7…', 6: '…Đỏ mất quân.' } },
        { from: 'main', after: 38, m: 'X5-8 Tg5-4 M5.4 X1-3 X8/5 X4/1', k: { 1: 'Nếu Xe bình 8…', 6: '…Mã Đỏ khó giữ.' } },
        { from: 'main', after: 40, m: 'X5-6 X3-4', k: { 1: 'Nếu Xe bình 6…', 2: '…Xe bình 4!' } },
        { from: 'main', after: 20, m: 'P7.5 P7-3 P5-7 P3.2 X4/2 P9-3 P7.5 X1.2 P7.1 X1/1 P7/1 X1-3 P7-6 S4.5 P6/5 P3-2 V3.5 P2.6', k: { 1: 'Pháo ăn Mã — đắc một quân nhưng phiền phức lũ lượt kéo đến.', 3: 'Kế sách tạm duy trì hơn quân.', 10: 'Trực tiếp ăn Xe cũng lấy lại quân nhưng Đỏ tiến Chốt 3 thì Đen khó có lợi.', 13: 'Chủ lực Đỏ bị kìm — bình Pháo là sáng suốt.', 18: 'Đen đoạt lại một quân, hình thế chủ động.' } },
        { from: 7, after: 22, m: 'P5.4 P9-3 V7.5 M7.5 X4-5 Pt-5 X5-6 P3-7', k: { 1: 'Nếu Pháo đánh Chốt giữa…', 8: '…Đen giành thế đối kháng vừa ý.' } },
        { from: 7, after: 28, m: 'P7-4 P3-2', k: { 1: 'Nếu Pháo bình 4…', 2: '…Đen chiếm ưu.' } },
        { from: 7, after: 32, m: 'X4.3 M7.8 X4-2 M8.7', k: { 1: 'Nếu Xe tiến…', 4: '…giằng co qua lại, Đỏ bất lợi.' } },
        { from: 'main', after: 20, m: 'M3/5 M3/5 X4.2 P7-9 B3.1 X2/4 P5-3 P9.4 P3.3 V7.9 P3.1', k: { 1: 'Lui Mã oa tâm — nước hay công thủ trọn vẹn: đã có Chốt qua sông, lui Mã tăng cường trận doanh, đẩy nan đề cho đối thủ.', 2: 'Lựa chọn khó khăn.', 5: 'Đột phá xảo diệu!', 6: 'Chỉ đành vậy.', 10: 'Không còn cách nào khác.', 11: 'Cục diện rõ ràng — Đỏ chi phối toàn cuộc.' } },
        { from: 11, after: 21, m: 'P9.4 M5.3 M3/5 X4.1', k: { 1: 'Nếu Pháo tiến 4…', 4: '…Đen khó ứng phó.' } },
        { from: 11, after: 21, m: 'P7-2 P7.5 P9-3 B7.1 X1.2 B7.1 P2.8 M5.7 X2-3 X9-8 X3/1 B7.1 X3/7 X4-3', k: { 1: 'Nếu Pháo bình 2…', 14: '…Đỏ ưu thế lớn.' } },
        { from: 11, after: 21, m: 'P7-3 B7.1 P3.6 M5.7 P9-3 X9.1 X1-2 X9-8 X2.8 X4-3 V3.5 M7.6 X2.1 M6.4', k: { 1: 'Nếu Pháo bình 3…', 14: '…Đen cực kỳ bị động.' } },
        { from: 11, after: 25, m: 'B7.1 P5-3 X1.2 P7-5 P9.4 P5.4', k: { 1: 'Nếu tiến Chốt…', 6: '…Đỏ thắng chắc.' } },
        { from: 11, after: 25, m: 'X1-2 B3.1 Xt.1 X9-8 X2.9 B3.1', k: { 1: 'Nếu Xe bình 2…', 6: '…Đỏ ưu thế áp đảo.' } },
        { from: 11, after: 27, m: 'X2-6 P3.3', k: { 1: 'Nếu Xe bình 6…', 2: '…cuộc thế Đen nhanh chóng xấu đi.' } },
        { from: 11, after: 29, m: 'M7.8 P7-5', k: { 1: 'Nếu Mã tiến 8…', 2: '…Đỏ có thủ đoạn Pháo bình 5.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 16, t: 'Tiên Thí Hậu Đoạt',
      s: 'Đen phi Pháo quá hà dòm Chốt — nôn nóng phản kích có chút cạm bẫy. Đỏ mời đổi Chốt 3 thì trúng ý đồ, Đen lui Pháo khéo léo chiếm ưu thế lớn; xông Chốt giữa, trả giá một Pháo trống rồi "bỏ trước đoạt sau" thì Đỏ giành lại quyền chủ động.',
      c: `<p>Trung Pháo quá hà Xe đối Bình Phong Mã <strong>Cao Xe bảo Mã</strong>. Đen <strong>phi Pháo quá hà dòm ngó Chốt Đỏ</strong>, triển khai phản kích (nước thích hợp hơn là lui Pháo 1, có sức bật, cân bằng). Đỏ thường có hai cách:</p>
<ul>
<li><strong>Chốt 3 tiến mời đổi</strong> (mạch chính): sai lầm người sơ cấp dễ mắc — đúng ý đồ Đen. Đen lui Pháo một nước nhẹ nhàng mà khéo, Đỏ rơi vào thế khó xử; Đen lui Pháo đánh Xe sáng suốt — chiếm ưu thế lớn.</li>
<li><strong>Chốt giữa tiến</strong> (nhánh phụ): xông Chốt 5, đã có đối sách — trả một cái giá <strong>Pháo trống</strong> cho Đen, rồi thúc Chốt biên khiến Pháo trống không có đất dụng võ; dùng chiến thuật <strong>"bỏ trước đoạt sau"</strong> giành lại ưu thế.</li>
</ul>
<h2>Bài học</h2>
<p>Nôn nóng phản kích kèm chút cạm bẫy không phải cách đi thích hợp; bị nhìn thấu thì rơi vào bị động. Cấu tứ của biến 2 tinh xảo, đáng nghiền ngẫm.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 X2.6 P8-9 X2-3 X8.2 M8.7 V3.5 M7.6 P2.4 B3.1 P2/1 B3.1 P2-4 B3-2 P4/2 B2.1 P4-7 B2.1 P7.6 S4.5 X1-2 P8-6 X2.4',
      k: {
        14: 'Trung Pháo quá hà Xe đối Bình Phong Mã cao Xe bảo Mã.',
        16: 'Phi Pháo quá hà dòm Chốt — nôn nóng phản kích, có chút cạm bẫy. Đỏ: Chốt 3 tiến hay Chốt giữa tiến?',
        17: 'Mời đổi Chốt 3 — sai lầm người sơ cấp dễ mắc, đúng ý đồ Đen.',
        18: 'Nhẹ nhàng lui Pháo một nước — khéo bất ngờ, Đỏ rơi vào thế khó xử.',
        19: 'Chỉ đành vậy (chạy Mã thì Pháo Đen đánh Chốt "nhất tiễn song điêu").',
        22: 'Lui Pháo đánh Xe — nhìn chuẩn toàn cuộc, sáng suốt.',
        30: 'Đen chiếm ưu thế lớn.',
      },
      h: { 16: 'p060_0' },
      v: [
        { from: 'main', after: 15, m: 'P2/1', k: { 1: 'Nên lui Pháo 1 — khá có sức bật, hai bên cân bằng.' } },
        { from: 'main', after: 17, m: 'B7.1 B7.1', k: { 1: 'Nếu tiện tay tiến Chốt…', 2: '…Đỏ chủ động.' } },
        { from: 'main', after: 21, m: 'M7/8 M3.4', k: { 1: 'Nếu lui Mã…', 2: '…Đỏ vẫn có tiên thủ nhất định.' } },
        { from: 'main', after: 16, m: 'B5.1 P2/1 M6.7 P2-5 M3.5 P9.4 P5.2 P9-5 B9.1 B5.1 X9.3 B5.1 P8.2 S4.5 P8-5', k: { 1: 'Xông Chốt giữa — chẳng lẽ không sợ lui Pháo đánh xâu? Thực ra Đỏ đã có đối sách.', 6: 'Ép đổi — Đen được lợi ích Pháo trống.', 7: 'Không tiện tiến Chốt 3 (Đen Xe tiến 4).', 9: 'Lập tức thúc Chốt biên — Pháo trống Đen không có đất dụng võ.', 15: '"Bỏ trước đoạt sau" — Đỏ giành cục diện ưu thế.' } },
        { from: 3, after: 21, m: 'X1-2 P5.2 X2.7 P5-4', k: { 1: 'Nếu Xe bình 2…', 4: '…Đỏ có thủ đoạn Pháo tiến, Mã tiến — rõ ràng chủ động.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 17, t: 'Phấn Khởi Hoàn Kích',
      s: 'Đỏ phế Chốt rồi bình Xe đè Mã — nước công có tính cạm bẫy. Đen nâng Xe hay bình Xe bảo Mã đều mềm yếu; tiến Pháo phản kích, không sợ mất Mã — hăng hái đánh trả — mới là đối sách hay nhất.',
      c: `<p>Đối lại Trung Pháo quá hà Xe, Đen <strong>lập tức khởi hoành Xe</strong> để nhanh xuất chủ lực. Đỏ nhảy chính Mã trái (có thể đi nhưng dễ cho Đen phản kích; chắc hơn là bình Pháo 7). Đen tiến Pháo phản kích — nước mấu chốt tranh cân bằng.</p>
<h2>Cạm bẫy phế Chốt, bình Xe đè Mã</h2>
<p>Đỏ phế Chốt rồi <strong>bình Xe đè Mã</strong> — nước công có tính cạm bẫy (thông thường tiến Chốt giữa, hai bên kìm chế nhau). Đen có ba cách:</p>
<ul>
<li><strong>Xe tiến 1</strong> (mạch chính): mềm yếu — Đỏ xuất Xe tranh tiên, Đen buộc bình Pháo; Đỏ thúc Chốt giữa, thế công mãnh liệt.</li>
<li><strong>Xe bình bảo Mã</strong>: khó tránh thiệt — Đỏ nhảy Mã gấp rút, tranh công nhanh hơn, hơi ưu.</li>
<li><strong>Pháo tiến 4</strong>: không sợ Đỏ ăn Mã, tiến Pháo phản kích — chiến thuật sắc bén! Đỏ đoạt quân thì Đen chiếu liền hai nhịp, lên Tướng giải chiếu rút, rút ăn Xe — thắng lợi trong tầm tay; Đỏ lui Xe sát Chốt (ổn chắc) thì Đen thăng Xe tróc Pháo, tiên phát chế nhân.</li>
</ul>
<h2>Bài học</h2>
<p>Cạm bẫy cuộc này không đủ tinh tế: một khi Đen tiến Pháo phản kích, Đỏ phải gánh hậu quả. Khi phản kích, Đen cũng có vài nước quan trọng và đẹp mắt đáng chú ý.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 X2.6 X1.1 M8.7 X1-4 P8-9 P2.4 B3.1 B7.1 X2-3 X4.1 X9-8 P8.4 X3/2 P8-7 V3.1 P2-3 B5.1 X8.6 B5.1',
      k: {
        10: 'Lập tức khởi hoành Xe — nhanh xuất chủ lực, tăng phản kích.',
        11: 'Nhảy chính Mã trái — có thể đi nhưng dễ cho Đen phản kích. Chắc hơn: Pháo bình 7.',
        14: 'Tiến Pháo phản kích — nước mấu chốt tranh cân bằng, né nước Xe tróc Pháo.',
        17: 'Phế Chốt rồi bình Xe đè Mã — nước công có tính cạm bẫy. Đen: Xe tiến 1, Xe bình 7 hay Pháo tiến 4?',
        18: 'Mềm yếu (lui Mã giữa thì Xe lui nhẹ nhàng giành thế).',
        19: 'Tranh tiên (lui Xe trước thì Đen phản kích mãnh liệt).',
        22: 'Nước bắt buộc (bổ Sĩ thì Chốt giữa tiến, Đen mất quân).',
        27: 'Thế công Đỏ mãnh liệt — Đen không cách nào phòng thủ.',
      },
      h: { 17: 'p062_0' },
      v: [
        { from: 'main', after: 10, m: 'P8-7 X1-4 P7.4 V3.1 M8.7 X4.2 B7.1 V1.3 X9-8 X4-3 X8.7 V3/5 M7.6 X3.1 X8/3', k: { 1: 'Chắc hơn: Pháo bình 7…', 15: '…Đỏ hơi tiên thủ.' } },
        { from: 'main', after: 14, m: 'B5.1 X4.5 X9-8', k: { 1: 'Thông thường: Chốt giữa tiến…', 3: '…hai bên kìm chế lẫn nhau.' } },
        { from: 'main', after: 17, m: 'M7/5 X3/2', k: { 1: 'Nếu lui Mã giữa…', 2: '…Đỏ nhẹ nhàng giành thế.' } },
        { from: 'main', after: 18, m: 'X3/2 P8/1 M3.4 P8-7 M4.5 X8.9', k: { 1: 'Nếu lui Xe trước…', 6: '…Đen phản kích mãnh liệt.' } },
        { from: 'main', after: 21, m: 'S4.5 B5.1', k: { 1: 'Nếu bổ Sĩ…', 2: '…Đen mất quân.' } },
        { from: 'main', after: 17, m: 'X4-7 M7.6 X8.1 X9-8 P8.4 X3/2 P8-7 V3.1 M7.8 X3-2 M8/7 X2.4 X7-8 B5.1 X8-2 S6.5', k: { 1: 'Bình Xe bảo Mã — khó tránh thiệt, xuất chủ lực chậm.', 2: 'Gấp rút!', 14: 'Tấn công chính xác.', 16: 'Đỏ tranh công nhanh hơn — hơi ưu.' } },
        { from: 5, after: 18, m: 'X9-8 P2-3 X3/2 X8.1', k: { 1: 'Nếu xuất Xe…', 4: '…Đen vẫn đối kháng sòng phẳng.' } },
        { from: 5, after: 19, m: 'B7.1 B7.1', k: { 1: 'Nếu tiến Chốt…', 2: '…Đỏ chủ động.' } },
        { from: 5, after: 30, m: 'B7.1 B3.1 M6/8 X8-2 B5.1 B3.1 X8.1 B3.1', k: { 1: 'Sai lầm tiến Chốt 7…', 8: '…Đen phản đoạt ưu thế.' } },
        { from: 'main', after: 17, m: 'P8.4 X3.1 P8-7 X3-7 P7.3 S4.5 P7-9 S5.6 X4-8 P5.4 X8.8 Tg5.1 X8/1 Tg5/1 Tg5.1 X9.1 P2.2 S6.5 Xt.1 S5/4 X8/7 S4.5 X8-3', k: { 1: 'Không sợ Đỏ ăn Mã — tiến Pháo phản kích, chiến thuật sắc bén! Đỏ: Xe tiến 1 hay Xe lui 2?', 2: 'Kiên quyết đoạt quân — đối diện thế công mãnh liệt, được không bù mất.', 15: 'Chiếu liền hai nhịp định vị, lên Tướng giải thế chiếu rút — lão luyện, tuần tự.', 23: 'Rút ăn Xe Đỏ — Đen thắng lợi trong tầm tay.' }, h: { 1: 'p063_0' } },
        { from: 9, after: 24, m: 'X7-4 B7.1', k: { 1: 'Nếu Xe bình 4…', 2: '…Đỏ cũng thất thủ.' } },
        { from: 9, after: 18, m: 'X3/2 P8-7 V3.1 M7.6 B5.1 V7.5 B5.1 B5.1 X3-4 M6.8 X4-3 X4.5 M3.5 P2-5 P5.3 S4.5 X3/1 X8.4 P5/1 X8-5 X3.1 X4-3 P5-2 X3.1', k: { 1: 'Lui Xe sát Chốt — ổn chắc; Đen từ đây tranh cơ hội phản kích.', 13: 'Nếu Pháo ăn Tượng thì Xe tiến, Mã biên — Đen ưu.', 20: 'Thăng Xe tróc Pháo — phòng thủ phản công, ý đồ Đỏ tan thành mây khói.', 24: 'Đen tiên phát chế nhân — phục thiểm kích, chiếu rút… Đỏ khó chống cự.' } },
        { from: 11, after: 24, m: 'X9-8 X4.5', k: { 1: 'Nếu xuất Xe…', 2: '…thế Đen rất lạc quan.' } },
        { from: 11, after: 26, m: 'X3.1 P7-5 M7.5 V5.7 M5.4 S6.5 X9-8 X4.5', k: { 1: 'Nếu Xe tiến 1…', 8: '…Đen vẫn có lợi.' } },
        { from: 11, after: 26, m: 'M7.5 M6.5 M3.5 X4.5 X3/1 P2-5 P5.3 S4.5', k: { 1: 'Nếu Mã tiến giữa…', 8: '…Đen vẫn có lợi.' } },
        { from: 11, after: 28, m: 'P5.5 X4.5', k: { 1: 'Nếu Pháo ăn Tượng…', 2: '…sau đó Mã tiến biên — Đen chiếm ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 18, t: 'Xe Nhập Hoa Tâm',
      s: 'Đỏ đặt Xe vào hoa tâm — cạm bẫy được lên kế hoạch tinh xảo. Đen cứng rắn bình Xe tấn công thì Pháo Đỏ nổ Chốt giữa, phế quân đoạt thế; khử Chốt giữa trừ họa ngầm rồi lui Pháo tăng phản kích thì Đen hài lòng.',
      c: `<p>Đen <strong>phi tả Tượng</strong> — cách ứng phó cũ: phải mạnh trái yếu, phòng ngự thừa cơ phản kích. Đỏ xuất hoành Xe trái không đủ lực (sáng sủa hơn là Xe bình 3 hoặc Mã tiến 6); Đen hữu Pháo quá hà chuẩn xác. Đỏ tiến Chốt giữa khá liều lĩnh; Đen tiến Xe phối hợp Pháo phong tỏa tuyến Chốt.</p>
<h2>Cạm bẫy Xe nhập hoa tâm</h2>
<p>Đỏ <strong>đặt Xe vào hoa tâm</strong> — độc đáo, cạm bẫy lên kế hoạch tinh xảo. Đen có hai cách:</p>
<ul>
<li><strong>Xe bình 3 tấn công</strong> (mạch chính): trông chặt chẽ — nhưng đúng lúc Mã Đỏ không còn đường thoát, <strong>Pháo nổ Chốt giữa</strong>: "hoa nở trung tâm, cháy nhà ra mặt chuột"; Đỏ phế quân đoạt thế, triển vọng lớn.</li>
<li><strong>Chốt giữa ăn</strong> (nhánh phụ): khử Chốt tiêu trừ mối họa ngầm — ổn chắc; rồi lui Pháo giữ cục diện phức tạp, tăng phản kích trung lộ; Pháo Đen xuất kích tạo uy hiếp — Đen dễ đi quân.</li>
</ul>
<h2>Bài học</h2>
<p>Biến 1 Đen "già néo đứt dây, cứng quá dễ gãy". Biến 2 nhìn thấu ý đồ thì hiệu quả hài lòng. Dù không thành công trước đối sách đúng, cạm bẫy "Xe nhập hoa tâm" vẫn tinh xảo, ý vị sâu xa.</p>`,
      m: 'P2-5 M8.7 M2.3 M2.3 X1-2 X9-8 B7.1 B7.1 X2.6 V7.5 M8.7 X1.1 X9.1 P2.4 B5.1 X1-4 B5.1 X4.5 X9-5 X4-3 P5.4 M3.5 M7.5 M5/3 M5.6 X3.1 X5.1 X3-5 V7.5 M3/1 B5.1',
      k: {
        10: 'Phi tả Tượng — cách cũ: phải mạnh trái yếu, phòng ngự thừa cơ phản kích.',
        13: 'Xuất hoành Xe trái không đủ lực (sáng sủa hơn: Xe bình 3 hoặc Mã tiến 6).',
        14: 'Hữu Pháo quá hà — đối phó chuẩn xác.',
        15: 'Khá liều lĩnh (Xe bình 6 thỏa đáng hơn).',
        18: 'Tiến Xe phối hợp Pháo quá hà — phong tỏa tuyến Chốt Đỏ: tích cực có lực!',
        19: 'Xe vào hoa tâm — độc đáo, cạm bẫy tinh xảo. Đen: Xe bình 3 hay Chốt giữa ăn?',
        20: 'Trông như nước công chặt chẽ — nhưng Đỏ tìm được đường sống trong cõi chết.',
        21: 'Đúng lúc Mã Đỏ không đường thoát — Pháo nổ Chốt giữa: "hoa nở trung tâm", mưu kế trót lọt!',
        28: 'Phòng ngự duy nhất có thể đi.',
        31: 'Đỏ phế quân đoạt thế — rất có triển vọng.',
      },
      h: { 19: 'p066_0' },
      v: [
        { from: 'main', after: 13, m: 'X1-4 X2-3 X8-7 X9-2', k: { 1: 'Nếu Xe bình 4 trước…', 4: '…Đỏ ưu.' } },
        { from: 'main', after: 14, m: 'X9-6 P2-7 V3.1', k: { 1: 'Xe bình 6 thỏa đáng hơn…', 3: '…nhưng Đỏ không chiếm tiên.' } },
        { from: 'main', after: 17, m: 'B5.1 M7.5 X4.5 P5.3 S6.5 X9-6', k: { 1: 'Nếu tiện tay khử Chốt…', 6: '…Đỏ chủ động.' } },
        { from: 'main', after: 23, m: 'P2-5 M3.5 M5/3 M5.6 X3-2 P8-5', k: { 1: 'Nếu Pháo bình giữa…', 6: '…Đỏ có thế công lớn mạnh.' } },
        { from: 'main', after: 27, m: 'P8-9 X2-3 M7/5 M6.8', k: { 1: 'Nếu Pháo bình 9…', 4: '…Đỏ tốc thắng.' } },
        { from: 'main', after: 19, m: 'B5.1 M7.5 P8/1 X2-3 P2-5 M3.5 X4-5 X3.1 S6.5 X3-2 X8-6 X5-6 P8-7 X6.5 P7.5', k: { 1: 'Khử Chốt giữa tiêu trừ mối họa ngầm — ổn chắc.', 3: 'Nước biến có lực — giữ cục diện phức tạp, tăng phản kích trung lộ.', 9: 'Không thể Pháo tiến 3 (Đỏ mất quân).', 11: 'Xe bình 6!', 12: 'Không thể tham ăn Pháo Đen.', 15: 'Pháo Đen xuất kích tạo uy hiếp — Đen dễ đi quân hơn.' } },
        { from: 5, after: 21, m: 'P2-5 M3.5 X4-5 P5.3 X5/2 X5.4 P8/1 X5/4 P8-5 X2.3 M7/8 P8-5 M8.7', k: { 1: 'Nếu Pháo bình giữa…', 13: '…cục diện đơn giản hóa, dễ thành hòa.' } },
        { from: 5, after: 22, m: 'X2.1 P8-5 X2-3 B5.1', k: { 1: 'Nếu Xe tiến 1…', 4: '…Đen ưu thế.' } },
        { from: 5, after: 26, m: 'P5.3 X5/2 X5.4 P8-5', k: { 1: 'Không thể Pháo tiến 3…', 4: '…Đỏ mất quân.' } },
        { from: 5, after: 28, m: 'X5-4 P8.4', k: { 1: 'Nếu Xe bình 4…', 2: '…Đỏ không được lợi gì.' } },
        { from: 5, after: 30, m: 'X2.1 X5-6 X5-2 Xt.3 Tg5.1 X6.6', k: { 1: 'Nếu tham ăn Pháo…', 6: '…Đen thắng thế.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 19, t: 'Kiêng Dè Lẫn Nhau',
      s: 'Tả Mã bàn hà uy hiếp Xe quá hà. Đỏ sợ Đen thúc Chốt mà lui Xe né tránh thì mất tiên; nhảy Mã trái tự nhiên rồi bình Xe tróc Mã thì Đỏ giữ tiên, nắm chủ động — bên cầm tiên không cần sợ Đen thúc Chốt phản kích.',
      c: `<p>Hai bên vào thế trận thường gặp: <strong>Trung Pháo quá hà Xe đối Bình Phong Mã tả Mã bàn hà</strong>. Đen dọa thúc Chốt 7; nếu Đỏ sợ mà một mực né tránh thì Đen giành thế lạc quan.</p>
<ul>
<li><strong>Lui Xe về tuần hà</strong> (mạch chính): né tránh, mất trắng một nước tiên — Đen lui Pháo chuẩn bị đi ngang, tiến Chốt chính xác; cuối cùng Đen phản đoạt tiên thủ.</li>
<li><strong>Mã trái tiến</strong> (nhánh phụ): xuất quân tự nhiên, tĩnh quan kỳ biến — nước chính xác. Đen lập tức xông Chốt (cạm bẫy kinh điển nhưng thời cơ chưa chín; chính xác là phi Tượng), Đỏ <strong>bình Xe tróc Mã</strong> ổn chắc. Đen có ba cách: Mã tiến 7 (Đỏ đánh chết Chốt, giữ tiên), Mã tiến 8 (Đỏ phế Mã, Pháo nổ Chốt giữa — bỏ trước đoạt sau), Chốt 7 tiến (Đỏ nhảy Mã xuất kích tiên phát chế nhân).</li>
</ul>
<h2>Bài học</h2>
<p>Tả Mã bàn hà uy hiếp Xe để kìm chế, nhưng bản thân Xe Pháo cánh trái không căn cũng có điểm yếu — hai bên <strong>kiêng dè lẫn nhau</strong>. Bên cầm tiên không cần lo sợ Đen thúc Chốt, không cần chủ động chạy Xe.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 X2.6 M7.6 X2/2 P2/1 B3.1 B7.1 X2.1 M6/7 X2-3 P8.4 X3/1 X8.2',
      k: {
        10: 'Tả Mã bàn hà — thế trận thường gặp. Đen dọa thúc Chốt 7: Đỏ né tránh thì Đen lạc quan.',
        11: 'Lui Xe né tránh — mất trắng một nước tiên.',
        12: 'Lui Pháo chuẩn bị đi ngang — cơ động, giàu phản kích, hỗ trợ Mã bờ sông.',
        14: 'Chính xác (Pháo tiến 4 hào nhoáng — cho Đỏ cơ hội).',
        15: 'Cứng rắn giữ chủ động.',
        18: 'Nếu Xe tiến thì Đen phế quân mãnh công.',
        20: 'Đen phản đoạt tiên thủ.',
      },
      h: { 10: 'p068_0' },
      v: [
        { from: 'main', after: 10, m: 'X2-4 M6.7', k: { 1: 'Nếu Xe bình 4…', 2: '…Đỏ phí công vô ích.' } },
        { from: 'main', after: 12, m: 'X2-4 P8.2', k: { 1: 'Nếu Xe bình 4…', 2: '…Đen có Pháo bình 6, ung dung ứng chiến.' } },
        { from: 'main', after: 13, m: 'P2.4 M8.7 B7.1 X2.1 M6/7 X2-8', k: { 1: 'Nếu Pháo tiến 4 (hào nhoáng)…', 6: '…Đen có nguy cơ mất quân.' } },
        { from: 'main', after: 14, m: 'X2-3 P8-7 X3.1 V7.5 X3-4 P7.7 S4.5 P7-9 Tg5-4 X1.1', k: { 1: 'Nếu Xe bình 3…', 10: '…Đen phế Mã có thế công lớn, cuộc thế sinh động.' } },
        { from: 'main', after: 18, m: 'X3.2 P8-7 X3-7 P7.3 S4.5 V7.5', k: { 1: 'Nếu Xe tiến 2…', 6: '…Đen phế quân mãnh công.' } },
        { from: 'main', after: 10, m: 'M8.7 B7.1 X2-4 M6.7 P5-6 V7.5 X4-2 X1.1 P8.2 X1-7 V7.5', k: { 1: 'Mã trái tiến — xuất quân tự nhiên, tĩnh quan kỳ biến: nước chính xác duy trì tiên thủ.', 2: 'Lập tức xông Chốt — thời cơ chưa chín, cạm bẫy kinh điển (chính xác: phi Tượng).', 3: 'Bình Xe tróc Mã — ổn chắc, dễ khống chế. Đen: Mã tiến 7, Mã tiến 8 hay Chốt 7 tiến?', 4: 'Mã tiến 7.', 5: 'Tránh Pháo — phòng Đen đơn giản hóa.', 11: 'Đánh chết Chốt Đen — hình trận Đỏ rất tốt, giữ chắc tiên thủ.' }, h: { 3: 'p070_0' } },
        { from: 5, after: 11, m: 'V3.5', k: { 1: 'Chính xác: phi Tượng củng cố hình trận trước.' } },
        { from: 5, after: 12, m: 'X2/1 M6/7 X2/2 P2.4', k: { 1: 'Nếu lui Xe…', 4: '…Đỏ chưa chắc giành được lợi.' } },
        { from: 5, after: 14, m: 'X4-3 M7.5 V7.5 V3.5 X3/2 P8-6', k: { 1: 'Nếu Xe bình 3…', 6: '…cuộc thế bình ổn.' } },
        { from: 5, after: 13, m: 'M6.8 B3.1 M8.7 P5.4 M3.5 X4-5 P2-5 P8-3 P8.7 S6.5', k: { 1: 'Mã tiến 8.', 2: 'Kiên quyết phế Mã — nước hay không ai tưởng tượng được!', 4: 'Pháo nổ Chốt giữa — bỏ trước đoạt sau; Đen đổi Pháo là tất yếu.', 10: 'Bổ Sĩ củng cố — Đỏ hơn Chốt, ưu thế binh chủng, rất lạc quan.' } },
        { from: 5, after: 13, m: 'B7.1 X4/1 B7.1 M7.6 P8-5 B7.1 X8.5 B7.1 X8-4 B7.1 P2.4 P8-3', k: { 1: 'Chốt 7 tiến.', 4: 'Một Chốt khó thành đại sự — Đỏ nhảy Mã xuất kích tiên phát chế nhân.', 5: 'Lắp Pháo tăng cường trung lộ.', 12: 'Đỏ nắm chắc ưu thế.' } },
        { from: 10, after: 16, m: 'X4-2 B7-6 P5-6 X1.1', k: { 1: 'Nếu Xe bình 2…', 4: '…Đỏ không được lợi.' } },
        { from: 10, after: 19, m: 'B3.1 X4-7', k: { 1: 'Nếu Chốt 3 tiến…', 2: '…Đỏ chiếm ưu.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 20, t: 'Bách Ư Vô Nại',
      s: 'Đỏ nhảy Mã ép đổi — cạm bẫy tạo giả tượng "vạn bất đắc dĩ", mong Đen bình Pháo đánh Xe. Đen mù quáng phản kích thì Đỏ bỏ Xe đổi quân tranh tiên, hơn Chốt; nhảy Mã tróc, bổ Sĩ chờ biến thì Đen đối kháng vừa ý.',
      c: `<p>Đỏ lui Xe tuần hà hơi mềm (thường bình Pháo 9 hoặc Pháo tiến 1); Đen lui Pháo — nước hay điều chỉnh hình trận. Đỏ khởi hoành Xe, Xe bình 3, rồi <strong>nhảy Mã ép đổi</strong> — cạm bẫy điển hình: Đỏ mong nhất Đen tiếp theo Pháo bình 7 hoặc Pháo tiến 4 để phục hàng loạt thủ đoạn đổi quân tranh tiên.</p>
<ul>
<li><strong>Pháo bình 7 đánh Xe</strong> (mạch chính): Đỏ <strong>bỏ Xe đổi quân tranh tiên</strong> — nước hay ngoài dự tính, mở rộng tiên thủ hợp lý; Đỏ hơn Chốt chiếm ưu, Đen rơi vào khốn cảnh.</li>
<li><strong>Mã tiến 4</strong> (nhánh phụ): Đỏ ăn Pháo, Đen bổ Sĩ dĩ dật đãi lao, thăng Xe tuần hà đã dự tính, tiến Chốt tích cực — hai bên cân thế.</li>
</ul>
<h2>Bài học</h2>
<p>Cạm bẫy tạo giả tượng "vạn bất đắc dĩ", dẫn dụ đối thủ đi theo sự thao túng của mình. Phân tích khách quan, không bị cám dỗ của "hầu lạp Mã" và bình Pháo đánh Xe thì yên ổn không việc gì.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 X2.6 M7.6 M8.7 V3.5 X2/2 P2/1 X9.1 B7.1 X2-3 P8-7 M7.6 P2-7 M6.4 Ps.4 M4.3 X8.2 Mt/5 P7.2 P8-3 M3.5 P5.4 S6.5 X9-4',
      k: {
        13: 'Lui Xe tuần hà hơi mềm — để Đen thong dong điều chỉnh (thường: Pháo bình 9 hoặc Pháo tiến 1).',
        14: 'Lui Pháo — nước hay điều chỉnh hình trận, phối hợp phản kích cánh trái.',
        15: 'Khởi hoành Xe tăng hỏa lực.',
        19: 'Nhảy Mã ép đổi — cạm bẫy điển hình: Đỏ mong Đen Pháo bình 7 hoặc Pháo tiến 4. Đen: Pháo bình 7 hay Mã tiến 4?',
        20: 'Bình Pháo đánh Xe — cứng nhắc, chỉ lo kế hoạch của mình.',
        21: 'Bỏ Xe đổi quân tranh tiên — nước hay ngoài dự tính, mở rộng tiên thủ hợp lý.',
        31: 'Đỏ hơn Chốt chiếm ưu — Đen rơi vào khốn cảnh.',
      },
      h: { 19: 'p073_0' },
      v: [
        { from: 'main', after: 13, m: 'B7.1 X2-3 P8-7', k: { 1: 'Cũng có thể tiến Chốt 7…', 3: '…nhưng lui Pháo trước hàm súc hơn.' } },
        { from: 'main', after: 14, m: 'X2-4 P8.2', k: { 1: 'Nếu Xe bình 4…', 2: '…sau đó Pháo bình 6 đánh Xe — hình trận Đen chỉnh tề, có sức bật.' } },
        { from: 'main', after: 23, m: 'P7.2 M3.2 P7-2 M2/3', k: { 1: 'Nếu Pháo tiến 2…', 4: '…Đỏ hơn Chốt chiếm ưu.' } },
        { from: 'main', after: 25, m: 'P7/3 M5/3 X8/1 X9-4 S4.5 X4.5', k: { 1: 'Nếu Pháo lui…', 6: '…Đỏ chiếm yếu đạo, hơn Chốt.' } },
        { from: 'main', after: 19, m: 'M6.4 X3.3 S4.5 X9-6 X1-4 X6.2 X8.4 P5-6 B3.1 B7.1 X8-3 V3.5 P2-4 X6.1 P4.6 X6.5 S5/4', k: { 1: 'Mã tiến 4.', 2: 'Đỏ tất nhiên ăn Pháo.', 3: 'Bổ Sĩ dĩ dật đãi lao, chờ biến.', 5: 'Thăng Xe chuẩn bị lắp Pháo kìm chế, ép Mã Đen rời bờ sông.', 6: 'Xe tuần hà — đã dự tính trước.', 8: 'Tích cực!', 9: 'Lựa chọn sáng suốt.', 17: 'Hai bên cân thế.' } },
        { from: 4, after: 20, m: 'X3-6 P2-7', k: { 1: 'Nếu Xe bình 6…', 2: '…lộ 3 Đỏ bị công khó phòng.' } },
        { from: 4, after: 21, m: 'B3.1 B7.1 M4.2 X9-8 M2/3 P8-7 Mt.4 P5-6', k: { 1: 'Nếu tùy tiện tiến Chốt 3…', 8: '…thế công Đen tan rã, Đỏ chiếm ưu.' } },
        { from: 4, after: 24, m: 'X3/3 P2.4', k: { 1: 'Nếu Xe lui…', 2: '…Đen đủ đối kháng.' } },
        { from: 4, after: 26, m: 'P8-6 P2-4 X6.1 P4.6 X6.5 Tg5-4', k: { 1: 'Nếu Pháo bình 6…', 6: '…Đỏ ngược lại thua thiệt.' } },
        { from: 4, after: 28, m: 'P6.2 B3.1 P6.4 P2-3', k: { 1: 'Nếu Pháo tiến 2…', 4: '…Đen phế quân đoạt thế.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 21, t: 'Kế Hoạch Di Chuyển Sang Cánh Trái',
      s: 'Đen thoái Pháo định chuyển sang cánh trái — nước biến có tính cạm bẫy cao. Đỏ xuất Xe theo thói quen thì kế hoạch Đen trót lọt; bình Pháo dọa nổ Sĩ đáy, ép Đen bổ Sĩ thì phá hỏng kế hoạch và Đỏ giành ưu.',
      c: `<p><strong>Tả Mã bàn hà</strong> — biến hóa quan trọng của Bình Phong Mã, thịnh hành thập niên 70–80. Đỏ bình Pháo ra biên chuẩn bị xuất Xe công cánh phải. Đen <strong>thoái Pháo, định chuyển sang cánh trái tăng phản kích</strong> — nước biến có tính cạm bẫy khá cao (thường thì tiến Chốt 7, mỗi bên công một cánh).</p>
<ul>
<li><strong>Xe 9 bình 8</strong> (mạch chính): xuất Xe tróc Pháo theo thói quen — để Đen thuận lợi thực hiện kế hoạch: Pháo bình 7, nhấc Xe bảo vệ Pháo, Mã lui hay — Đỏ khó xử.</li>
<li><strong>Pháo bình 4</strong> (nhánh phụ): nước có ý nghĩa chiến lược — <strong>dọa Pháo nổ Sĩ đáy</strong>, ép Đen bổ Sĩ, phá hoại hiệu quả kế hoạch phản kích; Đỏ tiến Mã mời đổi, nắm chắc ưu thế.</li>
</ul>
<h2>Bài học</h2>
<p>Trong bố cục, hiểu rõ ý đồ đi cờ của đối thủ để phá hoại kế hoạch tác chiến của họ thường là cách cơ bản nhất để giành ưu thế.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 X2.6 M7.6 M8.7 V3.5 P8-9 P2/1 X9-8 P2-7 X2-4 M6.7 X4-3 X8.1 M7.6 S4.5 P5-6 P8-6 V7.5 M7/8',
      k: {
        10: 'Tả Mã bàn hà uy hiếp Xe quá hà — biến quan trọng của Bình Phong Mã.',
        13: 'Bình Pháo ra biên chuẩn bị xuất Xe công cánh phải.',
        14: 'Thoái Pháo, chuẩn bị chuyển sang cánh trái — nước biến có tính cạm bẫy khá cao. Đỏ: Xe bình 8 hay Pháo bình 4?',
        15: 'Xuất Xe tróc Pháo — theo thói quen, giúp Đen thực hiện kế hoạch.',
        18: 'Nhấc Xe bảo vệ Pháo, duy trì kìm lộ 3 — thủ đoạn đã dự trù.',
        23: 'Đỏ cảm thấy áp lực, tháo Pháo đầu điều chỉnh.',
        26: 'Thoái Mã — nước hay, phục Pháo bình 7 tấn công; Đỏ khó xử lý.',
      },
      h: { 14: 'p076_0' },
      v: [
        { from: 'main', after: 13, m: 'B7.1 X2-4 M6.8 M3/5 B7.1 X9-8 X1-2 M7.6 P8-9', k: { 1: 'Thông thường: tiến Chốt 7…', 9: '…mỗi bên công một cánh, đều có chỗ kiêng dè.' } },
        { from: 'main', after: 14, m: 'X9.1 P2-7 X9-4 P8-6 X2.3 P6.6', k: { 1: 'Nếu nâng Xe biên…', 6: '…Đỏ hụt hẫng, Đen phản tiên.' } },
        { from: 'main', after: 14, m: 'B5.1 B7.1 X2-4 B7.1 X4/1 P8-7 M7.6 B7.1 V3.1 P2.4', k: { 1: 'Nếu tiến Chốt giữa…', 6: 'Nước hay!', 10: '…Đen khá ưu.' } },
        { from: 'main', after: 22, m: 'X3-2 X1-4 M6.7 M7/6 X2-4 M6.5 M3.5 P7.8 Tg5.1 P8.6 M7.9 X4.9', k: { 1: 'Nếu Xe bình 2…', 12: '…trong đối công Đen nhanh chân hơn.' } },
        { from: 'main', after: 14, m: 'P5-4 S4.5 X9-8 P2-4 X8.8 P4.2 X2/2 B7.1 X2-3 P8-7 M7.6 M6.4 X3-6 P4/3 X6-3 P7-6 P4-7', k: { 1: 'Pháo bình 4 — nước có ý nghĩa chiến lược: dọa Pháo nổ Sĩ đáy, ép Đen bổ Sĩ, phá hoại kế hoạch phản kích.', 2: 'Chọn lựa vạn bất đắc dĩ.', 11: 'Tiến Mã mời đổi — đơn giản sáng suốt, giữ chắc ưu thế.', 17: 'Đỏ nắm chắc ưu thế.' } },
        { from: 4, after: 15, m: 'P2-7 P4.7 V7.9 P4/2 B7.1 X2/1', k: { 1: 'Nếu Pháo bình 7…', 6: '…Đỏ ưu.' } },
        { from: 4, after: 15, m: 'B7.1 X2-4 M6.7 P4.7 X8.1 X9.1', k: { 1: 'Nếu tiến Chốt 7…', 6: '…Đen tàn Sĩ, có mối lo về sau.' } },
        { from: 4, after: 17, m: 'P2-3 X8.8 X1-3 X2/2 B3.1 X2-4 M6/7 B7.1 P3.3 M7.8', k: { 1: 'Nếu Pháo bình 3…', 10: '…cũng là Đỏ ưu.' } },
        { from: 4, after: 25, m: 'P7.4 V3.5 M6.4 X3/1', k: { 1: 'Nếu Pháo tiến 4…', 4: '…chủ lực cánh phải Đen chen chúc, Đỏ chủ động.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 22, t: 'Phản Qua Nhất Kích',
      s: 'Trung Pháo thất lộ Mã đối Bình Phong Mã song Pháo quá hà: Đỏ kiên quyết tặng Chốt 3 chủ động cầu biến. Đen ham Chốt qua sông thì bị thăng Xe tróc Pháo, rơi vào khốn cảnh; bình Pháo chiếm sườn "quay giáo đánh lại" thì Đen giành ưu thế.',
      c: `<p>Đen hữu Pháo quá hà mưu phản kích; Đỏ xông Chốt giữa triển khai thế công, ngăn Pháo đánh Chốt. Đen tiến Pháo thứ hai — biến nổi tiếng <strong>Trung Pháo thất lộ Mã đối Bình Phong Mã song Pháo quá hà</strong>: tranh chấp chiến thuật rõ ràng, đối công kịch liệt.</p>
<h2>Cạm bẫy tặng Chốt 3</h2>
<p>Thường gặp là Xe tiến 6 (Đỏ hơn quân, Đen đắc thế). Ở đây Đỏ <strong>kiên quyết tặng Chốt 3 chủ động cầu biến</strong> — cạm bẫy bố cục kinh điển. Hai bên giương cung bạt kiếm:</p>
<ul>
<li><strong>Chốt 7 tiến</strong> (mạch chính): bị lừa! Trông như sang sông trắng một Chốt, nhưng Đỏ thăng Xe tróc Pháo, Đen phải lui Pháo (chọn cái hại ít hơn); xông Chốt giữa mưu thế công, chém giết một phen rồi ép đổi có lực — Mã phải Đen ứ đọng, Đỏ hứa hẹn.</li>
<li><strong>Pháo bình 6</strong> (nhánh phụ): không bị Chốt cám dỗ, bình Pháo chiếm sườn phản kích, tránh luôn đòn Xe tiến tróc — tính toán sâu xa. Đỏ nhảy Mã thì đối công Đen nhanh hơn một nước; Đỏ tiến Chốt 3 thì Đen bình Pháo ép đổi — hóa giải thế công, hơn quân chiếm ưu.</li>
</ul>
<h2>Bài học</h2>
<p>Hai bên lửa chiến khắp nơi, biến hóa khá phức tạp. Bảo thủ nếp cũ thì bị Xe tróc Pháo giành tiên cơ; quyết đoán <strong>bình Pháo chiếm sườn quay giáo phản kích</strong> thì đánh lui thế công chưa chín. Người cầm hậu không thể không biết cuộc này.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 M8.7 P2.4 B5.1 P8.4 X9.1 P2-3 V7.9 X1-2 X9-6 X2.6 B3.1 B7.1 X6.2 P8/2 B5.1 S6.5 M3.5 P3-5 X6-5 X2-5 M7.5 B7-6 M5.6 P8-4 X2.9 M7/8 B5-6',
      k: {
        10: 'Hữu Pháo quá hà mưu phản kích — tích cực (cũng có thể phi Tượng thủ).',
        11: 'Xông Chốt giữa triển khai thế công, ngăn Pháo bình đánh Chốt.',
        12: 'Song Pháo quá hà — biến nổi tiếng, đối công kịch liệt.',
        13: 'Nếu tiến Chốt giữa thì Đen bổ Sĩ, Chốt bình… — chủ lực Đỏ bị phong tỏa, Đen hài lòng.',
        18: 'Tiến Xe cánh phải tăng phong tỏa, chuẩn bị phế quân giành thế.',
        19: 'Kiên quyết tặng Chốt 3 chủ động cầu biến — cạm bẫy kinh điển. Đen: Chốt 7 tiến hay Pháo bình 6?',
        20: 'Bị lừa! Trông như sang sông trắng một Chốt, nhưng Đỏ phục thủ đoạn tinh xảo.',
        22: 'Chọn cái hại ít hơn — lui Pháo là kế tạm thời.',
        23: 'Xông Chốt giữa mưu thế công.',
        30: 'Qua một phen chém giết, Đen như vượt ải — nhưng nước sau Đỏ ép đổi có lực.',
        32: 'Chọn lựa đau khổ.',
        35: 'Cục diện đơn giản nhưng Mã phải Đen ứ đọng — Đỏ khá hứa hẹn.',
      },
      h: { 19: 'p079_0' },
      v: [
        { from: 'main', after: 12, m: 'B5.1 S4.5 B5-6 V3.5', k: { 1: 'Nếu Chốt giữa tiến tiếp…', 4: '…chủ lực Đỏ bị phong tỏa — Đen hài lòng.' } },
        { from: 'main', after: 17, m: 'P3-6 X6.6 P6.1', k: { 1: 'Cũng có thể Pháo bình 6…', 3: '…đánh giáp lá cà, căng thẳng.' } },
        { from: 'main', after: 18, m: 'X6.6 V7.5 X6-7 S6.5', k: { 1: 'Thường gặp: Xe tiến 6…', 4: '…Đỏ hơn quân, Đen đắc thế.' } },
        { from: 'main', after: 21, m: 'M7.6 X6-2 X8.6 X2.3 B7.1 X2.2 M6.4 M3/5 B7-6 X2-6 M4.3 M5.7 B6.1 X6/2 B6-5 P8-5', k: { 1: 'Nếu nhảy Mã…', 2: 'Xe bình 2 — chuyển đổi khéo léo!', 14: 'Đơn giản có lực.', 16: '…Đen khó đối kháng.' } },
        { from: 'main', after: 22, m: 'V3.1 P8-7 X2.9 M7/8 M3/2 V7.5 P8/2 B7-6 S6.5 B6-5 P8-7', k: { 1: 'Phi Tượng cũng không tệ…', 11: '…Đỏ đắc quân chiếm ưu.' } },
        { from: 'main', after: 31, m: 'M3/1 P5.4 M7.5 B5.1', k: { 1: 'Nếu lui Mã…', 4: '…Xe Pháo Đen thoát căn — Đỏ ưu.' } },
        { from: 'main', after: 19, m: 'P3-6 M7.6 B7.1 P8-7 B7.1 B7.1 X2-3 B7.1 B7.1 B7.1 P6/1', k: { 1: 'Không bị Chốt cám dỗ — bình Pháo chiếm sườn phản kích, tránh đòn Xe tiến tróc: tính toán sâu xa. Đỏ: Mã tiến 6 hay Chốt 3 tiến?', 2: 'Mã tiến 6 — mong Đen ăn Pháo để phế quân tranh công.', 3: 'Rất tinh tế — không cho Đỏ hỗn chiến.', 9: 'Đối công — Đen nhanh hơn một nước.', 11: 'Pháo lui 1! Đen sắp Pháo bình 4, Pháo bình 5 — Đỏ không biết làm thế nào.' }, h: { 1: 'p080_0' } },
        { from: 6, after: 22, m: 'P8/1 P6/1 M3.4 P8-5 P5-8 X2.1 X2.9 M7/8 M4.3 M8.7', k: { 1: 'Nếu lui Pháo…', 10: '…Đen đột phá, tiếp theo Pháo bình 7.' } },
        { from: 6, after: 26, m: 'M6.8 X3.1 M8.7 S6.5 M3.5 X3/1', k: { 1: 'Nếu Mã tiến 8…', 6: '…ưu thế Đen không lay chuyển.' } },
        { from: 6, after: 20, m: 'B3.1 P6.1 M3.4 P8-6 X2.9 M7/8 M4.5 M3.5 P5.4 X2.1 M7.6 Pt-1 M6.7 P1.2 Tg5.1 X2/1 M7.6 V7.9 M6/4 M8.6', k: { 1: 'Chốt 3 tiến.', 4: 'Bình Pháo ép đổi — hóa giải thế công, chọn lựa hay nhất trong biến rối ren.', 16: 'Thoái Xe — phục Pháo bình 5, đánh lui thế công Đỏ.', 17: 'Phòng thủ tất yếu — Đỏ vô kế khả thi.', 20: 'Đen hơn quân chiếm ưu.' } },
        { from: 9, after: 23, m: 'P6-3 X2.3 X8.6 M4/2 X2-8 X6.6', k: { 1: 'Nếu Pháo bình 3…', 6: '…Đen đang ưu thành kém thế.' } },
        { from: 9, after: 23, m: 'P8/1 X2.3 P8-5 X2-5 X2-5 M7.5 P6-2 P5.2 V7.5 M5/3 B5.1 P5/3', k: { 1: 'Nếu lui Pháo…', 12: '…Đen bị động.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 23, t: 'Lòng Có Toàn Cuộc',
      s: 'Đen tả Pháo phong Xe, rồi bình Pháo đè Mã — kiên quyết cầu biến, có tính cạm bẫy. Đỏ tiến Mã phải khinh suất thì trúng kế; nhảy Mã trái chính diện, bỏ Tượng tranh tiên với mưu tính toàn cuộc thì Đỏ phát triển tiên thủ có lực.',
      c: `<p>Đỏ bình Pháo đè Mã — nước công thường gặp. Đen <strong>tả Pháo phong Xe</strong> (lẽ thường là Xe bình 2 hoặc Chốt biên tiến) — khá cứng rắn, có tính cạm bẫy nhất định. Đỏ có hai cách:</p>
<ul>
<li><strong>Mã phải tiến</strong> (mạch chính): khinh suất, khiến Xe phải thoát căn — trúng kế. Đen Pháo bình 3 xảo diệu, tiên thủ Đỏ tan thành mây khói; Đen phản tiên.</li>
<li><strong>Mã trái tiến</strong> (nhánh phụ): bày hình trận đường đường chính chính. Đen bình Pháo đè Mã tưởng kiếm lợi, nhưng Đỏ chủ động đổi Xe, tiến Xe trái, tiến Chốt 7 — <strong>bỏ Tượng tranh tiên</strong>. Đen lời một Tượng mà chưa tạo uy hiếp; song Mã Đỏ rộng đường, sẽ giành ưu thế.</li>
</ul>
<h2>Bài học</h2>
<p>Thủ đoạn Pháo đè Mã không đáng sợ đến vậy: không có chiến thuật phối hợp thì dù ăn được Tượng cũng chưa chắc kiếm lợi — vừa tổn thất nước tiên khi đổi Xe, vừa thả xổng Mã Đỏ. Bỏ Tượng tranh tiên với <strong>mưu tính toàn cuộc</strong> là đối sách hay nhất.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B3.1 B3.1 P8.4 V7.5 P8-7 P8.4 M3.4 P8-3 X2.9 P3/3 P5-7 M7/8 P7.4 B1.1',
      k: {
        11: 'Bình Pháo đè Mã — nước công thường gặp.',
        12: 'Tả Pháo phong Xe — kiên quyết cầu biến, có tính cạm bẫy (lẽ thường: Xe bình 2 hoặc Chốt biên). Đỏ: Mã tiến 4 hay Mã trái tiến?',
        13: 'Tiến Mã khinh suất, Xe phải thoát căn — trúng kế.',
        14: 'Thủ đoạn xảo diệu! Tiên thủ Đỏ tan thành mây khói.',
        17: 'Nước bắt buộc (lui Xe thì Pháo tiến chiếu rút Xe).',
        20: 'Tiếp theo Đen có Xe biên tiến 3 — đã ở thế phản tiên.',
      },
      h: { 12: 'p082_0' },
      v: [
        { from: 'main', after: 10, m: 'M8.9 B1.1 P8-7 X1.3 X9-8 X1-3 X8.7 P8-9 X2.9 M7/8 X8/6 B3.1 X8-2 M8.6', k: { 1: 'Có thể di chuyển Mã trái…', 14: '…Đen giành thế cân bằng.' } },
        { from: 'main', after: 16, m: 'X2/2 P3.6', k: { 1: 'Không thể lui Xe…', 2: '…Pháo chiếu Tướng rút Xe — Đen chiếm ưu.' } },
        { from: 'main', after: 12, m: 'M8.7 P8-7 X2.9 M7/8 X9-8 X1-2 X8.4 M8.7 B7.1 B3.1 X8-7 P7.3 S4.5', k: { 1: 'Nhảy Mã trái chính diện — ổn chắc.', 2: 'Bình Pháo đè Mã tưởng kiếm lợi — Đỏ không lo sợ.', 3: 'Chủ động đổi Xe, không bị mê hoặc — nước mấu chốt giữ chủ động.', 7: 'Nước có lực!', 9: 'Nước hay có cái nhìn toàn cuộc — kẻo Đen Pháo bình 1 đơn giản hóa.', 13: 'Đen lời một Tượng nhưng chưa uy hiếp; song Mã Đỏ rộng đường — Đỏ sẽ giành ưu thế.' } },
        { from: 2, after: 13, m: 'X1-2 M3.4 P2.2 X9-8', k: { 1: 'Nếu Xe bình 2…', 4: '…Đỏ vẫn nắm tiên thủ.' } },
        { from: 2, after: 15, m: 'P7.3 S4.5 M7/8 X9-8 X1-2 M3.4', k: { 1: 'Nếu Pháo ăn Tượng…', 6: '…Đen đắc Tượng nhưng thiếu thủ đoạn tiếp — Đỏ tiên thủ.' } },
        { from: 2, after: 19, m: 'P7.3 S4.5 P2-1 X8.5 M3/2 P5.4 S4.5 V7.5', k: { 1: 'Nếu Đen đánh Tượng…', 8: '…Đỏ hơn Chốt chiếm ưu.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 24, t: 'Thủ Đoạn Cục Bộ',
      s: 'Đỏ lập tức nhảy Mã xuất kích dọa Chốt 3 — cạm bẫy điển hình chống Tả Pháo phong Xe. Đen né tránh đơn thuần thì Đỏ ưu; tiến Pháo đánh Chốt tích cực thì thủ đoạn cục bộ của Đỏ phản tác dụng, Đen hơn Chốt chiếm ưu.',
      c: `<p>Đối với nước bổ Tượng phải phòng ngự của Đen, Đỏ dùng cách công chậm hoành Xe trái (thường là Pháo tiến 4 — Ngũ bát Pháo). Đen tiến Pháo phong Xe chuẩn bị phản kích.</p>
<h2>Cạm bẫy nhảy Mã xuất kích</h2>
<p>Đỏ <strong>lập tức nhảy Mã xuất kích dọa Chốt 3</strong> — cạm bẫy điển hình: Đen mềm yếu, phòng thủ tiêu cực thì Đỏ nắm chắc tiên. Đen có ba cách:</p>
<ul>
<li><strong>Lui Pháo</strong> (mạch chính): né tránh đơn thuần, tự tổn thất một nước — Đen đắc một Tượng nhưng khó có thủ đoạn tiếp; Đỏ cướp thế công trước, rõ ràng chiếm ưu.</li>
<li><strong>Pháo bình 3</strong>: thoát miệng hổ nhưng thành thế mời đổi oa Xe, tổn thất xuất quân; Đỏ thăng Pháo quá hà, bình Pháo đè Mã — Đen có Chốt qua sông nhưng chủ lực bị kìm.</li>
<li><strong>Pháo tiến 4 đánh Chốt</strong>: đổi phong cách bảo thủ — tích cực có lực. Đỏ qua Chốt 3 phát động thế công chưa chín thì Đen khử Chốt, Pháo đánh Chốt "biên đả nhị quái" — hơn Chốt chiếm ưu; Đỏ lui Pháo (kế tạm) thì Đen bình Pháo giữa, Pháo tiến ép thoái Sĩ — đoạt quyền chủ động.</li>
</ul>
<h2>Bài học</h2>
<p>Riêng thủ đoạn cục bộ nhảy Mã của Đỏ có ý nghĩa tích cực, thường uy hiếp trực tiếp thủ đoạn phong Xe. Nhưng gặp đòn <strong>Pháo tiến 4 phản kích</strong> thì nhảy Mã khó mang lại hiệu quả — Đỏ nên bình Pháo 7, vẫn là cục diện tiên thủ.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B3.1 B3.1 M8.9 V3.5 X9.1 P8.4 M3.4 P8/2 P8.4 P8-7 X2.9 P7.5 S4.5 M7/8 X9-6 M8.7 X6.5',
      k: {
        11: 'Công chậm hoành Xe trái (thường: Pháo tiến 4 — Ngũ bát Pháo).',
        12: 'Tiến Pháo phong Xe, chuẩn bị phản kích (ổn chắc hơn: bổ Sĩ).',
        13: 'Lập tức nhảy Mã xuất kích dọa Chốt 3 — cạm bẫy điển hình. Đen: lui Pháo, Pháo bình 3 hay Pháo tiến 4?',
        14: 'Né tránh đơn thuần — tự tổn thất một nước tiên.',
        21: 'Bình Xe chính xác.',
        23: 'Đen đắc một Tượng nhưng khó có thủ đoạn tiếp — Đỏ cướp thế công trước, rõ ràng chiếm ưu.',
      },
      h: { 13: 'p085_0' },
      v: [
        { from: 'main', after: 12, m: 'P8-7', k: { 1: 'Đỏ nên bình Pháo 7 — vẫn là cục diện tiên thủ.' } },
        { from: 'main', after: 20, m: 'P8-7 P2/1 M4.6 P2-8 P5-2 X1.2', k: { 1: 'Nếu Pháo bình 7…', 6: '…Đen đủ sức đối kháng cân bằng.' } },
        { from: 'main', after: 13, m: 'P8-3 X2.9 M7/8 P8.4 B3.1 M9.7 B3.1 P8-7 P2/2 X9-8 P2-3 X8.5', k: { 1: 'Pháo bình 3 — thoát miệng hổ nhưng thành thế mời đổi oa Xe.', 4: 'Thăng Pháo quá hà — nước hay tranh tiên.', 5: 'Sang Chốt dễ cho Đỏ đơn giản hóa (lui Pháo nhẫn nại hơn).', 8: 'Bình Pháo đè Mã — thủ đoạn mở rộng tiên hay nhất.', 12: 'Đen có Chốt qua sông nhưng chủ lực bị kìm — thế kém.' } },
        { from: 2, after: 17, m: 'P3/1', k: { 1: 'Lui Pháo nhẫn nại hơn một chút.' } },
        { from: 2, after: 20, m: 'X9-7 M3.2', k: { 1: 'Nếu Xe bình 7…', 2: '…Đen đủ sức ứng chiến.' } },
        { from: 'main', after: 13, m: 'P2.4 B3.1 P2-5 S4.5 B7.1 X2.3 X8.6 M4/2 P5-1 X9-6 P1-8', k: { 1: 'Đổi phong cách bảo thủ — tiến Pháo đánh Chốt, tích cực có lực. Đỏ: Chốt 3 tiến hay lui Pháo?', 2: 'Kiên quyết qua Chốt — thế công chưa chín.', 5: 'Cứng rắn khử Chốt — đã dự tính.', 9: 'Diệu thủ đánh Chốt — đòn "biên đả nhị quái" phá tan giấc mộng hơn quân.', 11: 'Đen hơn Chốt chiếm ưu.' }, h: { 1: 'p086_0' } },
        { from: 5, after: 14, m: 'P5/1 P2-5 P8-5 P5.2 S4.5 P8.2 S5/4 P8/4', k: { 1: 'Lui Pháo — kế sách tạm thời.', 6: 'Đơn giản có lực — ép Đỏ thoái Sĩ.', 8: 'Đen phục Pháo bình 5 — đoạt quyền chủ động.' } },
        { from: 5, after: 14, m: 'X9-6 P2-5 S6.5 X1-2 P8-7 X2.5', k: { 1: 'Nếu Xe bình 6…', 6: '…Đỏ càng bất lợi.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 25, t: 'Không Đáng Ngạc Nhiên',
      s: 'Đỏ bình Pháo lộ 7 trước khi nhảy Mã biên — thay đổi nhỏ thứ tự nước tưởng không đáng ngạc nhiên mà có tính cạm bẫy. Ba cách đi đầu của Đen đều mắc lừa; bổ Sĩ củng cố, không lộ sơ hở thì Đen trở về thế trận thường gặp, cân bằng.',
      c: `<p>Nước thường gặp nhất là nhảy Mã biên rồi mới bình Pháo — thế trận thịnh hành <strong>Ngũ thất Pháo tiến Binh 3 đối Bình Phong Mã</strong>. Ở đây Đỏ <strong>bình Pháo lộ 7 trước</strong> — thay đổi nhỏ về thứ tự, tưởng không đáng ngạc nhiên mà có tính cạm bẫy. Đen có bốn cách:</p>
<ul>
<li><strong>Mã tiến ngoài</strong> (mạch chính): tự làm yếu trung lộ — mềm tay. Đỏ nhảy Mã xuất kích kịp thời, đổi Xe, lui Mã — hơn Chốt chiếm ưu.</li>
<li><strong>Chốt biên tiến</strong>: theo khuôn phép cũ — do Đỏ chưa nhảy Mã biên nên hụt hẫng; Đỏ nâng Xe biên linh hoạt, nhảy Mã xuất kích: Đen ăn Mã thì Đỏ được không đầu Pháo; Đen tiến Xe biên hay phi Tượng thì Đỏ đều có lợi.</li>
<li><strong>Phi Tượng</strong>: bổ Sĩ hoặc Tượng trước là đúng mạch nhưng cách đi phải tinh — bổ Tượng làm Mã phải thoát căn; Đỏ ép liên kết Tượng trên cao, Mã đạp trung Tượng hung hãn — Đen tàn Tượng khó thủ.</li>
<li><strong>Bổ Sĩ</strong>: vừa gia cố trung lộ vừa tránh Chốt 7 đột kích — một nước hai tác dụng, ổn chắc; rồi Mã ngoài phong Xe, Tả Pháo phong Xe — hai bên cân thế.</li>
</ul>
<h2>Bài học</h2>
<p>Ba cách đi đầu của Đen đều mắc lừa — đủ để cảnh giác. Đi Pháo bình 7 trước là cải tiến so với nhảy Mã biên trước; nhưng nếu Đen thấy rõ ý đồ, nghiêm trận chờ thời thì Đỏ do đã định hình Pháo nên chưa chắc thu hiệu quả tốt hơn.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B3.1 B3.1 P8-7 M3.2 M3.4 V3.5 M4.5 P8-9 X2.9 M7/8 M5/7 S4.5 M7/5 X1-4 B7.1',
      k: {
        9: 'Bình Pháo lộ 7 trước — thay đổi nhỏ thứ tự nước, có tính cạm bẫy. Đen: Mã tiến 2, Chốt biên, phi Tượng hay bổ Sĩ?',
        10: 'Tiến Mã ngoài tự làm yếu phòng thủ trung lộ — mềm tay.',
        11: 'Nhảy Mã xuất kích — kịp thời có lực.',
        14: 'Khá ngoan cường (Mã tiến giữa thì Pháo đánh Chốt, Xe tiến — Đỏ chiếm ưu).',
        21: 'Đỏ hơn Chốt chiếm ưu.',
      },
      h: { 9: 'p088_0' },
      v: [
        { from: 'main', after: 8, m: 'M8.9 B1.1 P8-7 M3.2 X9.1', k: { 1: 'Thường gặp nhất: nhảy Mã biên trước…', 5: '…thế trận thịnh hành Ngũ thất Pháo tiến Binh 3.' } },
        { from: 'main', after: 13, m: 'M7.5 P5.4 S4.5 X2.5', k: { 1: 'Nếu Mã tiến giữa…', 4: '…phục song trùng — Đỏ chiếm ưu.' } },
        { from: 'main', after: 9, m: 'B1.1 X9.1 M3.2 M3.4 P2.7 X9-8 M2.1 X8.2 B1.1 P7-9 P2-1 M4.5 M7.5 P5.4 X1.3 P9-5 B9.1 X2.5', k: { 1: 'Chốt biên — theo khuôn phép cũ; Đỏ chưa nhảy Mã biên nên hụt hẫng.', 2: 'Nước hay linh hoạt đa biến.', 4: 'Nhảy Mã xuất kích — tích cực có lực. Đen: Pháo tiến 7, Xe tiến 3 hay phi Tượng?', 5: 'Pháo ăn Mã.', 18: 'Mã đáy làm mồi nhử — Đỏ giành không đầu Pháo, ưu thế lớn.' }, h: { 4: 'p089_0' } },
        { from: 2, after: 13, m: 'X1.3 B7.1 B3.1 P7.7 S4.5 X2.5 M2.4 X9-8', k: { 1: 'Xe biên tiến 3.', 2: 'Xông Chốt phát động công kích — chặt chẽ có lực.', 3: 'Ý đồ cướp nước tiên.', 8: 'Trong đối công Đỏ khá có lợi.' } },
        { from: 3, after: 15, m: 'P2.7 B7.1 M2.3 X9-8 P2-1 X8/1 P1/1 X2.1 X1-4 M4.6', k: { 1: 'Nếu Pháo ăn Mã…', 10: '…Đỏ tất lấy lại quân, hình thế cực kỳ lạc quan.' } },
        { from: 2, after: 13, m: 'V7.5 M4.5 P8-9 X9-2 X8.8 X2.1 M7.5 P5.4 S4.5 P7-2 P9-8 M8.7 M2.3 P2-1', k: { 1: 'Phi Tượng.', 3: 'Chỉ hy vọng đổi Xe để giảm áp lực.', 4: 'Chặt chẽ! Không cho cơ hội nghỉ ngơi.', 14: 'Đỏ hình thế lạc quan, có tiềm lực phát triển.' } },
        { from: 5, after: 15, m: 'M7.5 P5.4 S6.5 X2.5 P2.7 X9-2', k: { 1: 'Nếu Mã tiến giữa…', 6: '…Đỏ chiếm ưu.' } },
        { from: 5, after: 16, m: 'X2.9 M7/8 M8.9 S6.5', k: { 1: 'Nếu đổi Xe…', 4: '…Đen đủ sức ứng chiến.' } },
        { from: 'main', after: 9, m: 'V3.5 B7.1 M3.2 B7.1 V5.3 X2.5 V7.5 M3.4 S4.5 M4.6 P8-9 M6.5 P9-5 X2-7 M2/1 X7.2 P5.4 S6.5 P2.6 X9.2 P2/4 X9-8 P2.5 X8/2 X8.4 X8.3 P5/1 X8-5 P5.2 V3.5 M7/8 X5.3', k: { 1: 'Phi Tượng — đúng mạch nhưng cách đi phải tinh: Mã phải thoát căn, để lại họa ngầm.', 4: 'Mã ngoài phong Xe — vạn bất đắc dĩ.', 6: 'Ép Đen liên kết Tượng trên cao — chặt chẽ có lực.', 8: 'Nhảy Mã xuất kích.', 12: 'Mã đạp trung Tượng — hung hãn, mở rộng tiên thủ.', 13: 'Bắt buộc.', 20: 'Chính xác — hóa giải thế công Đen.', 27: 'Ép đổi Pháo Đen — hóa giải hoàn toàn, lão luyện.', 32: 'Đen hơn một quân nhưng tàn Tượng khó thủ — Đỏ sẽ có ưu thế tuyệt đối.' } },
        { from: 8, after: 11, m: 'M3.4 B7.1 V5.3 X2.5 P2.2 M8.9', k: { 1: 'Nếu Mã tiến 4…', 6: '…Đen lúng túng.' } },
        { from: 8, after: 16, m: 'X2-6', k: { 1: 'Cũng có thể bình Xe 6 — Đỏ vẫn giữ tiên.' } },
        { from: 8, after: 21, m: 'X8.4 M5.7 Tg5-4 M7.9', k: { 1: 'Nếu Xe tiến 4…', 4: '…Đỏ đắc Tượng chiếm ưu.' } },
        { from: 8, after: 28, m: 'X7-3 X8.4 X3/1 X8-4 X3-5 X4.2', k: { 1: 'Nóng vội lấy lại quân…', 6: '…Đen bật lại.' } },
        { from: 'main', after: 9, m: 'S4.5 M8.9 M3.2 X9.1 V3.5 X9-6 P8.4 X6.5 B3.1 X6-8 M2.4 X8.1 M4.3 B7.1 X1-3', k: { 1: 'Bổ Sĩ — gia cố trung lộ, tránh Chốt 7 đột kích: một nước hai tác dụng, ổn chắc.', 3: 'Đúng thời cơ nhảy Mã ngoài phong Xe.', 7: 'Tả Pháo phong Xe — kìm chế hiệu quả.', 15: 'Hai bên cân thế — Đen hài lòng.' } },
        { from: 13, after: 15, m: 'X1-4 X6.8 S5/4', k: { 1: 'Nếu Xe bình 4…', 3: '…Đỏ khá có lợi.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 26, t: 'Nguy Cơ Trung Lộ',
      s: 'Đỏ tiến gấp Mã lên cửa sông dọa Mã giữa — cách công cũ có chút cạm bẫy. Đen phi Tượng thủ tiêu cực thì mưu kế Đỏ dễ thành; thăng Xe ngầm bảo vệ Chốt giữa — trung lộ tưởng trống mà có phục binh — thì Đỏ tự sa bẫy, Đen hơn quân thắng thế.',
      c: `<p>Đen thúc Chốt biên kìm chế Mã, thông đường Xe biên — cách đi có mục tiêu (cũng thịnh hành phi Tượng, bổ Sĩ). Đỏ <strong>tiến gấp Mã lên cửa sông</strong> dọa Mã tiến giữa — cách công cũ mang chút cạm bẫy, nay ít dùng vì nếu Đen ứng phó thỏa đáng thì thủ đoạn tiếp không đủ, "đầu voi đuôi chuột" (kỳ thủ hiện nay hầu hết nâng Xe biên, xuất quân đều hai cánh).</p>
<ul>
<li><strong>Phi Tượng</strong> (mạch chính): yếu mềm, thủ tiêu cực — Đỏ đổi Xe, Pháo tiến 3 đột phá xảo diệu, Mã lượn vòng, tiến Chốt trợ chiến; Đỏ rõ ràng có lợi.</li>
<li><strong>Xe biên tiến 3</strong> (nhánh phụ): thăng Xe ngầm bảo vệ Chốt giữa — nhạy bén có lực! Đỏ vẫn chìm trong "chiến thuật đẹp đẽ", Mã đạp giữa, Pháo nổ Chốt — không biết trung lộ trống rỗng thực ra có phục binh; muốn đánh chết Xe Đen nhưng quên Xe mình cũng ở hiểm địa — Đen hơn quân thắng thế.</li>
</ul>
<h2>Bài học</h2>
<p>Dù Đỏ không sa bẫy, Đen vẫn dựng được hình trận kiên cố. Nước Mã tiến cửa sông không sâu sắc, nhưng thỉnh thoảng dùng với người lạ biến này vẫn có thể "xuất kỳ bất ý".</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B3.1 B3.1 M8.9 B1.1 P8-7 M3.2 M3.4 V3.5 M4.5 P8-9 X2.9 M7/8 P7.3 V5.3 M5.7 V3/5 M7/8 X1.3 B7.1 X1-2 B7.1 P2.2 B7-8 X2.1 M9.7 X2.2 M7.6',
      k: {
        10: 'Thúc Chốt biên kìm chế Mã, thông đường Xe biên — có mục tiêu.',
        13: 'Tiến gấp Mã lên cửa sông — cách công cũ, có chút cạm bẫy. Đen: phi Tượng hay Xe biên tiến 3?',
        14: 'Yếu mềm, thủ tiêu cực — giúp mưu kế Đỏ dễ thực hiện.',
        16: 'Ý đồ đổi quân giảm áp lực.',
        19: 'Thủ đoạn đột phá xảo diệu!',
        27: 'Vị trí Mã không lý tưởng — qua Chốt trợ chiến, mưu đổi quân tranh tiên: nhạy bén.',
        33: 'Đỏ rõ ràng có lợi.',
      },
      h: { 13: 'p093_0' },
      v: [
        { from: 'main', after: 12, m: 'X9.1', k: { 1: 'Hiện nay hầu hết nâng Xe biên — xuất quân đều hai cánh, từng bước tiến thủ.' } },
        { from: 'main', after: 15, m: 'M7.5 P5.4 S4.5 X2.5', k: { 1: 'Nếu Mã tiến giữa…', 4: '…phục Xe bình 7, Pháo bình 2 — Đỏ ưu.' } },
        { from: 'main', after: 18, m: 'M5/7 S4.5 M7/5 X1-4', k: { 1: 'Nếu lui Mã…', 4: '…Đen kém 2 Chốt nhưng xuất quân nhanh, có bù đắp.' } },
        { from: 'main', after: 19, m: 'S4.5 P7-2', k: { 1: 'Nếu bổ Sĩ…', 2: '…Đen khá bị động.' } },
        { from: 'main', after: 27, m: 'S4.5 M8/7 V5.3 M7.5 V3/5 M9.7', k: { 1: 'Nếu bổ Sĩ…', 6: '…song Mã Đỏ lượn vòng xuất ra, chiếm chủ động.' } },
        { from: 'main', after: 13, m: 'X1.3 M4.5 M7.5 P5.4 X1-5 P7-5 X5/2 P5.6 P8-5 V3.5 X8.9 P5-8 M2/3', k: { 1: 'Thăng Xe ngầm bảo vệ Chốt giữa — nhạy bén có lực!', 2: 'Vẫn chìm trong "chiến thuật đẹp đẽ" — không biết trung lộ trống rỗng có phục binh. (Nên Xe tiến 6 hoặc nâng Xe biên — giằng co.)', 8: 'Muốn đánh chết Xe Đen mà quên Xe mình cũng ở hiểm địa.', 13: 'Đen hơn quân thắng thế.' } },
        { from: 5, after: 14, m: 'X2.6', k: { 1: 'Nên Xe tiến 6 — tuy không đủ hài lòng nhưng giằng co được.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 27, t: 'Quý Ở Tranh Tiên',
      s: 'Đen bình Xe sang đè Xe — cứng rắn có chút cạm bẫy. Đỏ nhảy Mã cứng nhắc cho Đen cơ hội phản kích, hơi ưu; bình Xe mời đổi, vây khốn Pháo, thúc Mã tiếp cận ngọa tào rồi bỏ trước đoạt sau thì Đỏ giữ tiên, giành ưu thế.',
      c: `<p>Ngũ lục Pháo đối Bình Phong Mã: Đỏ Xe tuần hà nhắm cánh phải Đen; Đen bình Pháo biên, Xe trái tiến lên thừa cơ phản kích. Rồi Đen <strong>bình Xe sang đè</strong> — cứng rắn, mang chút cạm bẫy (chính xác là lui Pháo tránh trước một nước).</p>
<ul>
<li><strong>Mã biên tiến 8</strong> (mạch chính): cứng nhắc, cho Đen cơ hội phản kích; Xe Đỏ ở hiểm địa đành bình giữa; Đen ép đổi, đơn giản hóa — Đen hơi ưu.</li>
<li><strong>Xe bình 8 mời đổi</strong> (nhánh phụ): thừa cơ vây khốn Pháo mở rộng tiên — giản dị có lực. Thúc Mã phi nhanh tiếp cận điểm ngọa tào như "chôn quả bom" trong trận Đen; rồi Mã tiến 7 đột phá ngoài dự liệu — <strong>bỏ trước đoạt sau</strong>, chém Tượng; Đen phải khổ chiến.</li>
</ul>
<h2>Bài học</h2>
<p>Hai quân giao tranh, quý ở tranh tiên. Đơn giản giành thế như biến 2 thì cạm bẫy của Đen khó đạt mưu đồ.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 M8.9 B7.1 P8-6 X1-2 X9-8 P2.4 X2.4 P8-9 X2-4 X8.6 B9.1 X8-7 M9.8 B7.1 X4-5 P9-8 M8.6 P8.3 M6.7 X2.2 P6.1 X7.1 M7/5 P8-5 P5.2 X2-5 X8.3 M7.5 V7.5 B7-6 P5.3 V7.5 X8.3 X7/3 X8-7 X7-5',
      k: {
        12: 'Nếu Pháo tiến 4 tả Pháo phong Xe thì Đỏ Xe tiến 6 — mỗi bên đánh một cánh.',
        13: 'Xe tuần hà nhắm cánh phải Đen — hợp logic.',
        16: 'Xe trái tiến thừa cơ phản kích (bổ Sĩ chắc hơn).',
        18: 'Bình Xe đè — cứng rắn, có chút cạm bẫy. (Chính xác: lui Pháo tránh trước.) Đỏ: Mã tiến 8 hay Xe bình 8?',
        19: 'Khá cứng nhắc — cho Đen cơ hội phản kích.',
        21: 'Xe Đỏ ở hiểm địa nhưng chỉ đành vậy.',
        22: 'Theo dự tính.',
        26: 'Ý đồ giải cứu Xe giữa.',
        42: 'Cục diện đơn giản hóa — Đen hơi ưu.',
      },
      h: { 18: 'p096_0' },
      v: [
        { from: 'main', after: 11, m: 'P8.4 X8.6', k: { 1: 'Nếu tả Pháo phong Xe…', 2: '…lưỡng phân, mỗi bên đánh một cánh.' } },
        { from: 'main', after: 12, m: 'X2.6 M7.6', k: { 1: 'Nếu Xe tiến 6…', 2: '…thế trận Đen có sức phản kích.' } },
        { from: 'main', after: 15, m: 'S4.5', k: { 1: 'Cũng có thể bổ Sĩ củng cố — khá ổn chắc.' } },
        { from: 'main', after: 17, m: 'P2/2 P6.1 S4.5 X8.4 V7.5', k: { 1: 'Chính xác: lui Pháo tránh trước một nước…', 5: '…Đỏ hơi tiên nhưng Đen ứng phó được.' } },
        { from: 'main', after: 20, m: 'X4-6 M7.6 X6-7 B3.1 X7.1 X2.5 X7-4 V7.5', k: { 1: 'Nếu Xe bình 6…', 2: 'Đen lập tức phản kích!', 8: '…hai cánh Đỏ bị khống chế, bị động.' } },
        { from: 'main', after: 21, m: 'P2-1 P6-8 P1-2 X8-9 P9-8 M8.6', k: { 1: 'Nếu Pháo bình 1…', 6: '…Đỏ cướp tiên làm loạn.' } },
        { from: 'main', after: 26, m: 'X5.2 M7.5 P5.4 X2-3 P6.3 Tg5.1', k: { 1: 'Cách khác: Xe tiến 2…', 6: '…thế công Đỏ tan rã.' } },
        { from: 'main', after: 26, m: 'M7/5 P8-5 P5.2 V3.5 M5.3 S4.5', k: { 1: 'Cách khác: lui Mã…', 6: '…Đen có Xe tiến, Chốt bình… — Đỏ khá chủ động.' } },
        { from: 'main', after: 31, m: 'S6.5 M5/4 X2-5 M4/3 P2-4 X8.5', k: { 1: 'Nếu bổ Sĩ…', 6: '…mỗi bên có chỗ kiêng dè, cơ bản cân thế.' } },
        { from: 'main', after: 18, m: 'X4-8 X2.5 M9.8 P2-5 M3.5 X7-5 M8.6 X5/2 M6.8 S6.5 S6.5 P9/1 M8.7 P9-3 X8.8 B3.1 X8-7 M3.2 X7.1', k: { 1: 'Bình Xe mời đổi, thừa cơ vây khốn Pháo — giản dị có lực.', 4: 'Chỉ có thể vậy.', 9: 'Thúc Mã tiếp cận điểm ngọa tào — như chôn quả bom trong trận Đen.', 12: 'Lui Pháo kiên trì phòng thủ.', 13: 'Đột phá ngoài dự liệu — bỏ trước đoạt sau!', 19: 'Chém Tượng — Đỏ tiến triển về vật chất; Đen phải khổ chiến.' } },
        { from: 9, after: 21, m: 'P2-1 M8/7 P1-5 M3.5 X7-5 P6/1 X5/2 P6-5', k: { 1: 'Nếu Pháo bình 1…', 8: '…Đỏ đắc Xe.' } },
        { from: 9, after: 26, m: 'X8.7 M7.6 X8-7 V7.5 X7/1 X5-4 X7-5 S4.5', k: { 1: 'Nếu Xe tiến 7…', 8: '…Đen hài lòng.' } },
        { from: 9, after: 29, m: 'X5-4 P5-3', k: { 1: 'Nếu Xe bình 4…', 2: '…Đỏ chiếm ưu.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 28, t: 'Khiếp Phòng Dũng Chiến',
      s: 'Ngũ lục Pháo hoành Xe: Đỏ bình Pháo sĩ giác — chút cạm bẫy. Đen bổ Sĩ theo thói quen bị bao vây tứ phía; bình Xe quá ổn chắc thì bị động; xông Chốt phản kích kịp thời, phế Mã lấy không đầu Pháo thì Đen giành ưu thế.',
      c: `<p>Xe Đỏ quá hà là cách đánh cũ, dễ dẫn đến phản kích kịch liệt (nay thường bình Pháo 7 hoặc 6). Đen <strong>tả Mã bàn hà</strong> — thủ đoạn có lực giành thế cân bằng. Đỏ bày <strong>Ngũ lục Pháo hoành Xe</strong>, bình Pháo sĩ giác — nước mang chút cạm bẫy (thông thường: Xe bình 4, Mã tiến 7… giằng co).</p>
<ul>
<li><strong>Bổ Sĩ</strong> (mạch chính): chưa nhìn thấu cạm bẫy — nước tự nhiên lại khiến Đen bị bao vây tứ phía rất nhanh. Đỏ bình Xe trong nháy mắt — đòn sát thủ đã dự tính; vào tàn không Xe, Đỏ hơn Chốt chiếm ưu.</li>
<li><strong>Xe bình 2</strong>: khá ổn chắc nhưng lực phản kích không đủ; Mã Đen nhảy bị ép, nhấc Xe thoát kìm — Đỏ hơn Chốt hơi ưu.</li>
<li><strong>Chốt 7 tiến</strong>: mọi trì hoãn đều bất lợi — <strong>phản kích là đối sách tốt nhất</strong>. Đỏ Xe tiến 5 thì Đen tiến Pháo lấy công làm thủ, phế Mã giành không đầu Pháo, song Xe điểm trúng yếu huyệt — ưu thế tuyệt đối; Đỏ Xe tiến 3 thì Đen bình Chốt linh hoạt, điều Pháo nhiều thủ đoạn thiểm kích — lạc quan.</li>
</ul>
<h2>Bài học</h2>
<p>Hình trận Ngũ lục Pháo hoành Xe có cạm bẫy nhưng nước nâng Xe biên và bình Pháo 6 có chút chồng chéo, hạ hiệu suất tiên thủ — cạm bẫy không thành thì dễ cho Đen phản kích.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 M8.9 B7.1 X2.6 M7.6 X9.1 V3.5 P8-6 S4.5 X9-4 P8-6 X2.3 P6.6 X2/8 P6/2 X2-8 X1-2 X8.3 B7.1 B3.1 P6-7 V3.1 P2.2 S6.5 M6.8 B9.1 P2-8 X8.5 M3/2 M3/1',
      k: {
        9: 'Xe quá hà — cách đánh cũ, dễ bị phản kích kịch liệt (nay thường Pháo bình 7 hoặc 6).',
        10: 'Tả Mã bàn hà — tích cực, có lực giành cân bằng.',
        13: 'Bình Pháo sĩ giác — mang chút cạm bẫy. Đen: bổ Sĩ, Xe bình 2 hay Chốt 7 tiến?',
        14: 'Chưa nhìn thấu cạm bẫy — ung dung bổ Sĩ; nước tự nhiên này khiến Đen bị bao vây tứ phía.',
        16: 'Thường Đen vui vẻ đổi quân để giải thoát Xe Pháo vô căn — nhưng Đỏ đã bình Pháo 6 nên cục thế đã khác.',
        21: 'Bình Xe trong nháy mắt — đòn sát thủ đã dự tính!',
        24: 'Phế Chốt bắt buộc (kẻo Xe bình 4).',
        25: 'Chính xác.',
        35: 'Vào cờ tàn không Xe — Đỏ hơn Chốt chiếm ưu.',
      },
      h: { 13: 'p099_0' },
      v: [
        { from: 'main', after: 9, m: 'B3.1 P8-7 M3.2 B5.1', k: { 1: 'Nếu tiến Chốt 3…', 4: '…Đỏ chủ động.' } },
        { from: 'main', after: 12, m: 'X2-4 M6.7 P5-4 S4.5 X9-2', k: { 1: 'Thông thường: Xe bình 4…', 5: '…hai bên giằng co.' } },
        { from: 'main', after: 20, m: 'X2.3 X1-4 X2-4 X4.7 X4.1 P2.6 X4/2 X4-1', k: { 1: 'Nếu Xe tiến 3…', 8: '…Đen có thể ứng chiến.' } },
        { from: 'main', after: 24, m: 'X8-3 X2-4 S4.5 X4.5', k: { 1: 'Nếu Xe bình 3…', 4: '…hình thế Đen không yếu.' } },
        { from: 'main', after: 13, m: 'X1-2 X9-4 M6.4 X4.3 M4.5 V3.5 X8.1 B9.1 B3.1 M9.8 X8-4 S4.5 P8-9 B7.1 X4.3 X2-1', k: { 1: 'Xe bình 2 — khá ổn chắc nhưng lực phản kích không đủ.', 3: 'Nước bị ép.', 6: 'Nhấc Xe thoát kìm — ngoan cường nhất.', 16: 'Cuộc thế bình ổn — Đỏ hơn Chốt hơi ưu.' } },
        { from: 4, after: 15, m: 'P8-6 X2.3 P6.6 X2/8 P6/2 X2.3', k: { 1: 'Nếu Pháo bình 6…', 6: '…Đen có nguy cơ mất quân.' } },
        { from: 4, after: 22, m: 'S4.5 X2.1', k: { 1: 'Nếu bổ Sĩ…', 2: '…Đen cũng thoát được kìm chế.' } },
        { from: 'main', after: 13, m: 'B7.1 X2-4 M6.7 P5-4 S4.5 X9-8 X1-2 X8.5 P8.4 X4-3 P8-5 X3/2 P5/2 X3/1 X2-4 P6.1 X4.5 X8.1 X8.8 P4-6 X4-5 S6.5 X5-2 V3.5 X2/3', k: { 1: 'Chốt 7 tiến — mọi trì hoãn đều bất lợi; phản kích là đối sách tốt nhất.', 7: 'Chính xác (Pháo bình 1 thì khá bị động). Đỏ: Xe tiến 5 hay Xe tiến 3?', 9: 'Tiến Pháo lấy công làm thủ — hóa giải uy hiếp, tích cực đáng học.', 10: 'Chuẩn bị đoạt quân trắng trợn.', 11: 'Phế Mã giành không đầu Pháo — quyết đoán, chuyển thủ thành công.', 19: 'Song Xe điểm trúng yếu huyệt — thế công mãnh liệt.', 21: 'Bình Pháo đánh Xe là nước giải duy nhất.', 23: 'Chiếu rút ăn Xe đúng lúc — chính xác.', 25: 'Đen chiếm ưu thế tuyệt đối.' }, h: { 7: 'p101_0' } },
        { from: 7, after: 14, m: 'X2/1 M6.7 X9-8 X1-2 X8.3 M7.5 V3.5 B7.1 M3/1 X8.1', k: { 1: 'Nếu lui Xe…', 10: '…hình thế Đen lạc quan.' } },
        { from: 7, after: 19, m: 'P2-1 X8.3 P8.6 X8-3 X1-4 S6.5 P8-7 B9.1 X8.4 X3-8', k: { 1: 'Nếu Pháo bình 1…', 10: '…Đen khá bị động.' } },
        { from: 7, after: 22, m: 'P4.1 P8-6 X4/3 X8.4', k: { 1: 'Nếu Pháo tiến 1…', 4: '…thế Đen cũng tốt.' } },
        { from: 7, after: 20, m: 'X8.3 B7-6 X4/2 P2.2 X4/1 P2-5 X8-5 P8-7 S4.5 P5-7 B9.1 X8.6', k: { 1: 'Xe tiến 3.', 2: 'Bình Chốt — khá linh hoạt.', 4: 'Điều động linh hoạt, phục nhiều thủ đoạn thiểm kích.', 9: 'Bổ Sĩ gia cố — tất yếu.', 12: 'Đen khá có sức bật, đủ lạc quan.' } },
        { from: 11, after: 22, m: 'X8-4 M7/8', k: { 1: 'Sai lầm Xe bình 4…', 2: '…Mã lui!' } },
        { from: 11, after: 28, m: 'X4-3 P5-7 X3-4 Ps.5 P6-3 P7.5 S4.5 P7-9', k: { 1: 'Nếu Xe bình 3…', 8: '…Đen phế quân cướp thế công, chiếm ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 29, t: 'Phân Biệt Đối Đãi',
      s: 'Đỏ lui Xe về tuyến Chốt hoặc về hàng 2 — hai cách tưởng gần giống nhưng khác bản chất, đều có tính cạm bẫy. Đen bổ Sĩ hay nâng Pháo phải phân biệt theo vị trí Xe Đỏ: dùng cách cũ cho cách mới thì trúng kế.',
      c: `<p>Đỏ bình Xe tróc Mã — cách đi rất thịnh hành gần đây. Đen lui Mã duy trì uy hiếp Xe; Đỏ hy sinh Chốt lộ 3 đổi lấy Mã phải linh hoạt — mỗi bên có cái được riêng. Đen tiến Chốt dùng Pháo bảo vệ Mã, phục đòn Chốt 7 phản kích. Đỏ có hai cách lui Xe:</p>
<h2>Xe lui về tuyến Chốt</h2>
<ul>
<li><strong>Bổ Sĩ</strong> (mạch chính): như không chê được, nhưng đánh giá thấp tiềm lực công của Đỏ — Đỏ công chính xác, dùng Xe đổi đôi (nước mấu chốt), chủ lực lượn vòng xuất ra — thế công như sóng lớn cuộn trào.</li>
<li><strong>Pháo tiến 2</strong>: nhấc Pháo phòng thủ tích cực — đáng học; Đỏ xông Chốt thì Đen tiến Xe tạo căn cho Xe trái, thăng Xe bảo vệ Mã — hai bên cân thế.</li>
</ul>
<h2>Xe lui về hàng 2</h2>
<ul>
<li><strong>Pháo tiến 2</strong>: Xe Đỏ ở vị trí khác mà Đen vẫn cứng nhắc dùng thủ đoạn phản kích cũ — trúng kế; Đỏ bình Xe bảo vệ Chốt đột ngột ("át chủ bài"), Đen mất quân.</li>
<li><strong>Bổ Sĩ</strong>: lấy tĩnh chế động, hợp thời thế; dùng Chốt 7 dẫn dụ Xe Đỏ, song Mã xuất kích — cờ giản hóa thành hòa.</li>
</ul>
<h2>Bài học</h2>
<p>Hai cách lui Xe khác biệt tuy nhỏ nhưng khác về bản chất; Đen tuyệt đối phải cảnh giác. Biết <strong>phân biệt đối đãi</strong>, tùy tình thế mà phát triển thì vô tư không phải lo.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 M8.9 B7.1 P8-7 P2.2 X2.6 M7.6 X9-8 X1-2 X8.4 V3.5 X2-4 M6.7 X4-2 M7/6 X8-4 B3.1 X2/3 S4.5 B7.1 B7.1 X4-3 M3.4 P5.4 P2.2 B5.1 M4.5 X2-5 M6.5 M3.5 X2.3 B5.1 P2/2 X3-5 P8.2 M9.7',
      k: {
        17: 'Bình Xe tróc Mã — rất thịnh hành gần đây (Chốt biên tiến thì thành biến thường gặp).',
        20: 'Lui Mã duy trì uy hiếp Xe — tự nhiên. Đỏ hy sinh Chốt 3 đổi lấy Mã phải linh hoạt — mỗi bên có cái được.',
        21: 'Điều Xe chặn Mã — một biến chủ yếu.',
        22: 'Tiến Chốt dùng Pháo bảo vệ Mã, phục Chốt 7 phản kích. Đỏ: Xe lui 3 hay Xe lui 5?',
        23: 'Lui Xe về tuyến Chốt — có tính cạm bẫy, ngầm dọa Chốt 7; khảo nghiệm cực lớn với Đen.',
        24: 'Bổ Sĩ — tưởng không chê được nhưng đánh giá thấp tiềm lực công của Đỏ.',
        26: 'Phế Chốt hòa hoãn áp lực.',
        29: 'Công kích chính xác.',
        33: 'Dùng Xe đổi đôi — nước mấu chốt giành ưu thế.',
        41: 'Chủ lực Đỏ lượn vòng xuất ra — thế công như sóng lớn cuộn trào.',
      },
      h: { 23: 'p104_0' },
      v: [
        { from: 'main', after: 16, m: 'B9.1', k: { 1: 'Nếu Chốt biên tiến — thuộc biến thường gặp.' } },
        { from: 'main', after: 25, m: 'M3.4 X4.1 M4.5 M3.5 P2-6 M5.4', k: { 1: 'Nếu sai lầm Mã tiến 4…', 6: '…Đỏ dùng 1 Xe đổi 3 quân, ưu thế lớn.' } },
        { from: 'main', after: 23, m: 'P8.2 B7.1 X8.3 X2/1 X2.2 B7.1 B7.1 X4-3 P8-3 P7.5 X8.4 P5-2 X2-3 X3-8 P2-1 M9/8 P3.2', k: { 1: 'Nhấc Pháo phòng thủ tích cực — đáng học.', 2: 'Xông Chốt 7 phát động — cục diện gay gắt.', 3: 'Tạo căn cho Xe trái — cấu tứ xảo diệu.', 4: 'Chính xác (sai lầm tiến Chốt thì Đen phản kích đắc thế).', 5: 'Thăng Xe bảo vệ Mã — tiêu trừ mối họa ngầm.', 17: 'Cuộc thế bình ổn, hai bên cân thế.' } },
        { from: 'main', after: 22, m: 'X2/5 P8.2 B7.1 X8.3 B7.1 B7.1 X4-7 P2.3 X2-4 B7.1 X4.4 B7.1 X7-2 P8-3 X2.2 P3.5 Tg5.1 S4.5 X2/2', k: { 1: 'Lui Xe về hàng 2 — cải tiến so với lui về tuyến Chốt, có tính cạm bẫy. Đen: Pháo tiến 2 hay bổ Sĩ?', 2: 'Xe Đỏ ở vị trí khác mà Đen vẫn cứng nhắc dùng thủ đoạn phản kích cũ — trúng kế.', 7: 'Bình Xe bảo vệ Chốt — đòn đột ngột, "át chủ bài" đã chuẩn bị (Xe ở tuyến Chốt thì nước này không thành).', 10: 'Xông Chốt ép đối công.', 14: 'Được ăn cả, ngã về không.', 17: 'Ngự giá thân chinh — hữu kinh vô hiểm.', 19: 'Lui Xe lão luyện — Đỏ hơn quân chiếm ưu.' }, h: { 1: 'p106_0' } },
        { from: 3, after: 23, m: 'S4.5 B7.1 B7.1 X4-3 M3.4 B7.1 M4.5 M3.5 M6.5 X3-5 M5.3 B7-8 X2-4 X2-7 M3/4 X7-6 M4.5 X6.8 S5/4 V7.5 P8-9', k: { 1: 'Bổ Sĩ — lấy tĩnh chế động, hợp thời thế.', 18: 'Bình Xe cản chân Mã — ổn chắc.', 20: 'Ép đổi.', 21: 'Cuộc thế giản hóa — cơ bản thành hòa.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 30, t: 'Liên Hoàn Sát Chiêu',
      s: 'Đỏ phi Pháo đánh Chốt, lui Pháo giữa, tạo giả tượng để Mã Đen bị khốn mời Xe Đen tiến tróc. Đen tiến Xe tróc Mã thì tự sa lưới — Đỏ dùng liên hoàn sát chiêu, xuất Tướng gọi sát; tiến Xe tuyến Chốt tróc Chốt thì thế mỗi người một vẻ.',
      c: `<p>Đen thăng Pháo tuần hà — lựa chọn ổn chắc, triển khai cân bằng chủ lực. Đỏ <strong>phi Pháo đánh Chốt</strong> sớm (ổn chắc hơn là Chốt biên tiến, tạo căn cho Xe trái), rồi lui Pháo giữa duy trì phức tạp. Đen tiến Pháo mưu đối công (chắc hơn là Xe tiến tróc Pháo). Tới Hình 41: Mã Đen bị khốn hết đường lui, nhưng Đen có thể tổ chức tấn công bằng Pháo đáy.</p>
<ul>
<li><strong>Xe tiến 7 tróc Mã</strong> (mạch chính): sức cám dỗ cực lớn — nhưng rơi vào vòng vây dày công thiết kế. Đen say sưa chiến thuật phế quân; Đỏ <strong>xuất Tướng gọi sát</strong> cướp một nước tiên quyết định, rồi Xe tiến 3, bỏ trước đoạt sau — hơn quân thắng chắc.</li>
<li><strong>Xe tiến 6 tróc Chốt</strong> (nhánh phụ): giản dị không hào nhoáng — đã nhìn thấu quỷ kế. Đỏ buộc bình Xe (nước giải duy nhất), hai bên chém giết thành thế Đỏ hơn quân, Đen có thế công — mỗi người một vẻ.</li>
</ul>
<h2>Bài học</h2>
<p>Một cách đặt cạm bẫy là <strong>tạo giả tượng</strong> cho đối phương — ở đây là giả tượng mời tiến Xe tróc Mã. Bỏ giả giữ thật, nhìn thấu ý đồ thì may mắn tránh khỏi. Đỏ phi Pháo đánh Chốt chưa đủ hàm súc; Đen suy nghĩ thấu đáo, ở nước 11 Xe tiến tróc Pháo là có kết quả hài lòng.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 M8.9 B7.1 P8-7 P2.2 X2.6 M7.6 X9-8 X1-2 X8.4 V3.5 P7.4 B7.1 X2-4 M6.7 P5/1 P8.5 X8-3 P8-1 V7.9 P2.5 V9/7 X2.7 X3/1 X2-4 P5.5 M3.5 S4.5 X4.1 Tg5-4 S4.5 X4-5 X8.8 X5-4 X8-5 X4.3 S5/6 P7-5 Tg5-4 P5/5 X4.1 Tg4.1',
      k: {
        10: 'Thăng Pháo tuần hà — lựa chọn khá ổn chắc, triển khai cân bằng chủ lực.',
        17: 'Phi Pháo đánh Chốt — hơi sớm; ổn chắc hơn là Chốt biên tiến, tạo căn cho Xe trái.',
        21: 'Lui Pháo giữa — duy trì cục thế phức tạp.',
        22: 'Tiến Pháo mưu đối công (chắc hơn: Xe tiến tróc Pháo).',
        27: 'Mã Đen bị khốn hết đường lui, nhưng Đen có thể tổ chức tấn công bằng Pháo đáy. Đen: Xe tiến 7 hay Xe tiến 6?',
        28: 'Sức cám dỗ cực lớn — nhưng rơi vào vòng vây dày công thiết kế.',
        35: 'Xuất Tướng gọi sát — cướp một nước tiên quyết định; thế công Đen tan thành mây khói.',
        38: 'Cách đi liều mạng.',
        41: 'Xe tiến 3!',
        47: 'Đỏ bỏ trước đoạt sau — hơn quân thắng chắc.',
      },
      h: { 27: 'p109_0' },
      v: [
        { from: 'main', after: 16, m: 'B9.1', k: { 1: 'Ổn chắc hơn: Chốt biên tiến, tạo căn cho Xe trái rồi ung dung triển khai.' } },
        { from: 'main', after: 20, m: 'X8-3 M7.5 V3.5 X2.3 P7/2 P8.6', k: { 1: 'Nếu Xe bình 3…', 6: '…chủ lực Đen linh hoạt, Đỏ khó hài lòng.' } },
        { from: 'main', after: 21, m: 'X2.3 X8-3 X2-3 X3/1 P8.5', k: { 1: 'Cũng có thể Xe tiến tróc Pháo — khá ổn chắc…', 5: '…hình thế Đen không yếu.' } },
        { from: 'main', after: 34, m: 'X4-5 X8.8 Tg5-4 X8-5 M3/5 X4.1 Tg4.1 X4-6', k: { 1: 'Nếu sai lầm Xe bình 5…', 8: '…sát cục.' } },
        { from: 'main', after: 27, m: 'X2.6 X4-2 X8.3 P7-2 X2-3 X3/1 X3.3 P5-1 M3.2', k: { 1: 'Tiến Xe tuyến Chốt — giản dị không hào nhoáng, nhìn thấu quỷ kế.', 2: 'Nước giải duy nhất — nếu không Đỏ sụp đổ nhanh.', 9: 'Cục thế phức tạp: Đỏ hơn quân, Đen có thế công — mỗi người một vẻ.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 31, t: 'Ép Đổi Xảo Diệu',
      s: 'Đỏ tiến Pháo ép đổi phá liên lạc quân Đen — có tính cạm bẫy khá cao. Đen đổi Pháo thì mắc lừa, Đỏ hơn Chốt; không trốn tránh cũng không đổi mà bình Pháo quay giáo đánh lại, phế Chốt 7 cho Pháo đánh Xe thì Đen nắm chủ động.',
      c: `<p>Đen cướp tiên thúc Chốt 3 — cách đi ôn nhu của bên hậu: thông đường Mã phải, tránh phương án Chốt 7 tiến của Đỏ. Hai bên tranh đoạt quanh lộ 7; Đỏ nhảy Mã biên không đủ lực (nên Xe bình 7 — tuần hoàn thì Đen "hai đánh một đánh trả" phải đổi biến).</p>
<h2>Cạm bẫy tiến Pháo ép đổi</h2>
<p>Đỏ <strong>tiến Pháo ép đổi</strong> — phá liên lạc giữa các quân Đen, tính cạm bẫy khá cao. Đen có hai cách:</p>
<ul>
<li><strong>Pháo bình 3 đổi</strong> (mạch chính): mắc lừa, đúng ý Đỏ; ép đổi Pháo Đỏ giảm áp lực — Đỏ hơn Chốt chiếm ưu.</li>
<li><strong>Pháo bình 2</strong> (nhánh phụ): không trốn tránh, không đổi quân — <strong>quay giáo đánh lại</strong>, nhìn thấu cạm bẫy. Đỏ tham ăn Pháo (nên bình Pháo 8 — hòa), Đen phế Chốt 7 để Pháo đánh Xe — thủ đoạn đã dự tính. Đỏ bình Xe 3 thì Đen song Xe song Pháo hỏa lực rất mạnh; Đỏ Xe tiến 1 thì hình trận Đỏ phân tán — Đen nắm chủ động.</li>
</ul>
<h2>Bài học</h2>
<p>Trước nước ép đổi xảo diệu, biến 1 Đen mềm yếu dẫn tới bị động; biến 2 ứng phó xảo diệu, đồng thời trả đòn — giành ưu thế.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 B3.1 X2.4 M2.3 B7.1 B3.1 X2-7 P2/1 P8-7 P2-3 X7-2 M3.2 M8.9 B7.1 X9-8 P8.2 P7.3 P8-3 X2.5 M7/8 X8.5 Pt-5 P5.3 B5.1 V3.5 V3.5 X8-5 X1-2 M9.7',
      k: {
        6: 'Cướp tiên thúc Chốt 3 — cách đi ôn nhu của bên hậu: thông đường Mã phải, tránh Chốt 7 tiến.',
        7: 'Thăng Xe chuẩn bị mời đổi Chốt 7 — tự nhiên (còn có Mã tiến biên, Chốt 3 tiến).',
        17: 'Nhảy Mã biên không đủ lực — giúp Đen ung dung củng cố, cân bằng.',
        21: 'Tiến Pháo ép đổi — phá liên lạc quân Đen, tính cạm bẫy khá cao. Đen: Pháo bình 3 hay Pháo bình 2?',
        22: 'Mắc lừa — đúng ý đồ Đỏ.',
        26: 'Ép đổi Pháo Đỏ giảm áp lực (Pháo đánh Tượng tùy tiện thì Đỏ có thủ đoạn tróc chết Pháo).',
        33: 'Đỏ hơn Chốt chiếm ưu.',
      },
      h: { 21: 'p111_0' },
      v: [
        { from: 'main', after: 16, m: 'X2-7 M2/3 X7-2 P3.6 M8.7', k: { 1: 'Nên Xe bình 7…', 5: '…Đỏ hơi tiên (tuần hoàn thì Đen "hai đánh một đánh trả" phải đổi biến).' } },
        { from: 'main', after: 25, m: 'P3.8 S6.5 P3-5 M9/7', k: { 1: 'Nếu tùy tiện Pháo đánh Tượng…', 4: '…Đỏ phục thủ đoạn tróc chết Pháo.' } },
        { from: 'main', after: 21, m: 'P3-2 X8.5 B7.1 X2-3 P8-2 X3.3 V3.5 P5.4 S4.5 V3.5 X8.3 P5/2 X1-3 P7/1 P2.3', k: { 1: 'Không trốn tránh, không đổi quân — quay giáo đánh lại, nhìn thấu cạm bẫy!', 2: 'Nhận lợi ích bất đắc dĩ — có chút tham lam.', 3: 'Phế Chốt 7 để Pháo đánh Xe — thủ đoạn đã dự tính. Đỏ: Xe bình 3 hay Xe tiến 1?', 8: 'Bổ Sĩ duy trì cục diện phức tạp — có lợi cho Đen.', 15: 'Đen song Xe song Pháo hỏa lực rất mạnh — Đỏ bị động, nghèo cách ứng phó.' }, h: { 3: 'p112_0' } },
        { from: 2, after: 22, m: 'P5-8 P2.6 P7-2 X8.4 X2.1 M7.8 X8.2 M2.4 X8.2 M4/6 B3.1', k: { 1: 'Nếu tỉnh ngộ bình Pháo 8…', 11: '…cơ bản thành hòa.' } },
        { from: 2, after: 24, m: 'X2.1 X8.4 X8.3 B7.1 X8-3 X1.2 P7/3 X8-3 P7-6 B7.1 P6-3 V7.9', k: { 1: 'Xe tiến 1.', 3: 'Đổi quân đơn giản hóa (Chốt 3 tiến thì Pháo bình 7, Đen ưu).', 12: 'Hình trận Đỏ phân tán — Đen nắm quyền chủ động.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 32, t: 'Đánh Thông Tuyến Chốt',
      s: 'Đỏ xông trung Binh gấp công, đánh thông tuyến Chốt Đen rồi bình Xe dọa Xe sang 8. Đen sợ mất quân nhảy Mã ra thì thả Xe Đỏ, cục diện vượt tầm kiểm soát; dám tiến Chốt giữa phế quân tranh tiên thì Đen tạo sát giành thắng lợi.',
      c: `<p>Đen tranh thúc Chốt 3 trước — suy nghĩ chiến lược đưa đến cục diện quen thuộc (về chiến thuật, Chốt 7 hợp lý hơn và phổ biến hơn). Đỏ <strong>xông trung Binh gấp công</strong>, chuẩn bị đánh thông tuyến Chốt Đen — cách đi mang tính cạm bẫy (ổn chắc là nâng Xe biên, Đỏ hơi ưu). Đỏ "được như ý": đánh thông tuyến Chốt, bình Xe sát Chốt, phục Xe sang 8.</p>
<ul>
<li><strong>Mã tiến biên</strong> (mạch chính): tưởng tranh được một nước tiên — đúng ý Đỏ. Đỏ cướp tiên ép đổi, lui Pháo — ưu kém rõ ràng, Đỏ nhiều thủ đoạn tấn công, đầy triển vọng.</li>
<li><strong>Chốt giữa tiến</strong> (nhánh phụ): không chùn bước — có can đảm, có kiến thức. Đỏ lui Pháo tránh, Đen bình Xe chặt chẽ; Đỏ bình Xe chuẩn bị đắc quân, Đen hai nước nhảy Mã cấp tiến; Đen Mã đạp Pháo, Pháo chìm đáy, quân Đen dũng khí lên cao — tuyệt sát, Đen thắng.</li>
</ul>
<h2>Bài học</h2>
<p>Xông Chốt 5 đánh thông tuyến Chốt và uy hiếp Pháo Mã cánh phải, nhưng chiến thuật chưa hoàn thiện: một khi Đen nhìn thấu và <strong>phế quân cướp công</strong> thì Đỏ chịu nhiều khổ sở.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 M8.9 B3.1 P8-7 M3.2 X2.6 V3.5 B5.1 S4.5 B5.1 B5.1 X2-3 M2.1 X9-8 P2-4 P7/1',
      k: {
        8: 'Tranh thúc Chốt 3 trước — suy nghĩ chiến lược đưa về cục diện quen thuộc (Chốt 7 hợp lý hơn về chiến thuật).',
        9: 'Còn có Xe tiến 4, đổi Chốt 7 — Đỏ vẫn tiên.',
        13: 'Xông trung Binh gấp công, chuẩn bị đánh thông tuyến Chốt — mang tính cạm bẫy (ổn chắc: nâng Xe biên).',
        17: 'Đánh thông tuyến Chốt, bình Xe sát Chốt — phục Xe sang 8. Đen: Mã tiến biên hay Chốt giữa tiến?',
        18: 'Nhảy Mã tưởng tranh được một nước tiên — đúng ý Đỏ.',
        19: 'Cướp tiên ép đổi — thủ đoạn có lực.',
        21: 'Chỉ qua hai hồi, ưu kém rõ ràng — Đỏ nhiều thủ đoạn tấn công, đầy triển vọng.',
      },
      h: { 17: 'p114_0' },
      v: [
        { from: 'main', after: 12, m: 'X9.1 S4.5 X9-6', k: { 1: 'Ổn chắc: nâng Xe biên…', 3: '…Đỏ hơi ưu.' } },
        { from: 'main', after: 19, m: 'M1.3 X8.7', k: { 1: 'Nếu Mã tiến 3…', 2: '…song Mã Đen bị khốn, khó tránh mất quân.' } },
        { from: 'main', after: 17, m: 'B5.1 P7/1 X1-4 X3-8 M7.8 X8/1 M8.6 M3/1 X4.8 S6.5 M6.5 V3.5 P8.7 V5/3 X8.8 S5.4 X8/1 S4/5 X8-5 M1.3 Tg5-4', k: { 1: 'Không chùn bước — có can đảm, có kiến thức!', 2: 'Tránh trước một nước, vẫn hy vọng giải tỏa thế phong Xe.', 3: 'Chặt chẽ có lực!', 4: 'Chuẩn bị đắc quân.', 6: 'Hai nước nhảy Mã cấp tiến — Đen đã có thế phản kích mạnh.', 7: 'Bảo toàn ưu thế hơn quân.', 10: 'Đạp Pháo tranh nước tiên — quân Đen dũng khí lên cao.', 21: 'Tuyệt sát — Đen thắng.' } },
        { from: 2, after: 18, m: 'X3-8 M7.6 X8/1 M6.4 X8/3 P8-7 P7-6 X8.6', k: { 1: 'Nếu Xe bình 8 ngay…', 8: '…Đen phế quân đoạt thế, cục diện tràn đầy sức sống.' } },
        { from: 2, after: 19, m: 'M2.1 X9-8 P2-4 X8.3 B1.1 X8-9 B1.1 X9-8 B1.1 P7-9', k: { 1: 'Nếu Mã tiến biên…', 10: '…Đỏ đắc quân chiếm ưu.' } },
        { from: 2, after: 24, m: 'X8/1 M6.7 X8-5 P8-7 X9-8 X8.8', k: { 1: 'Nếu Xe lui…', 6: '…thế công Đen như sóng lớn, Đỏ khó chống đỡ.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 33, t: 'Tiến Thủ Vững Chắc',
      s: 'Đen bình Xe bảo vệ Pháo rồi tiến Pháo xuống hàng 2 chèn mắt Tượng, dọa Pháo đánh Chốt — cạm bẫy kinh điển. Đỏ cũng cầu xông Chốt tấn công thì Đen điều động lấy lại quân; nhảy Mã đạp Chốt 3 tiến thủ vững chắc thì Đỏ giành ưu thế lớn.',
      c: `<p>Trung Pháo hoành Xe thất lộ Mã đối Bình Phong Mã bổ hữu Tượng. Đen bổ Sĩ — cách thường gặp. Đen <strong>bình Xe bảo vệ Pháo</strong> chuẩn bị thực thi cạm bẫy (chính xác là Pháo bình 7 đánh Chốt — mỗi bên công một cánh), rồi <strong>tiến Pháo xuống hàng 2 chèn mắt Tượng</strong>, dọa Pháo bình 7 — cạm bẫy khá kinh điển.</p>
<ul>
<li><strong>Chốt 7 tiến</strong> (mạch chính): kiên quyết phát động thế công — chính là thuận ý địch. Đen qua vài hồi điều động lấy lại một quân, hình thế khá lạc quan.</li>
<li><strong>Mã tiến 7 đạp Chốt</strong> (nhánh phụ): không bị mê hoặc — tiến thủ vững chắc, cương nhu đủ cả. Tránh đổi Xe duy trì tấn công, đổi Chốt linh hoạt Mã, tiêu trừ điểm yếu duy nhất — dù vật chất hay vị trí, ưu thế Đỏ không lay chuyển.</li>
</ul>
<h2>Bài học</h2>
<p>Nước Xe bảo Pháo hồi 8 đáng ngờ — đúng hơn là cạm bẫy chuẩn bị sẵn cho Pháo xuống hàng 2. Ở biến 2, Đỏ tiến Mã đạp Chốt ổn chắc kèm hung hiểm là sách lược cao minh. Đen ở hồi 10 nên đổi sang Pháo tiến 1 thì khá ổn chắc.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 B7.1 B7.1 M8.7 M2.3 X1.1 V3.5 X1-4 S4.5 P8-9 P2.4 X9-8 X1-2 M7.6 P8.6 B7.1 P2-7 X8.9 M3/2 M3/1 B3.1 P9.4 M2.1 X4-8 X8.5 M6.5 M7.5 P5.4 X8-4 X8-2 X4/2',
      k: {
        12: 'Trung Pháo hoành Xe thất lộ Mã đối Bình Phong Mã bổ hữu Tượng — bổ Sĩ là cách thường gặp.',
        16: 'Bình Xe bảo vệ Pháo, chuẩn bị cạm bẫy. (Chính xác: Pháo bình 7 đánh Chốt — mỗi bên công một cánh.)',
        17: 'Nước thanh thoát.',
        18: 'Tiến Pháo xuống hàng 2 chèn mắt Tượng, dọa Pháo bình 7 — cạm bẫy khá kinh điển. Đỏ: Chốt 7 tiến hay Mã tiến 7?',
        19: 'Kiên quyết phát động thế công — chính là thuận ý địch.',
        34: 'Đen sẽ lấy lại một quân — hình thế khá lạc quan.',
      },
      h: { 18: '!p117_0' },
      v: [
        { from: 'main', after: 15, m: 'P2-7 V3.1 B7.1 X8.7 X1-3', k: { 1: 'Chính xác: Pháo bình 7 đánh Chốt…', 5: '…mỗi bên công một cánh, đều có chỗ kiêng dè.' } },
        { from: 'main', after: 16, m: 'B5.1 P8.4', k: { 1: 'Nếu tiến Chốt giữa…', 2: '…hai bên giằng co.' } },
        { from: 'main', after: 22, m: 'B7.1 P7.3 S4.5 P7-9 S5.6 B7.1', k: { 1: 'Nếu tiến Chốt…', 6: '…trong đối công Đen rõ ràng chiếm ưu.' } },
        { from: 'main', after: 28, m: 'M6.8 V5/3', k: { 1: 'Nếu Mã tiến 8…', 2: '…Đỏ thiếu thủ đoạn tiếp theo.' } },
        { from: 'main', after: 18, m: 'M6.7 X2.3 P5-7 M3/1 V7.5 P8/1 X4.3 M7.8 X4-2 M8/7 X2-6 P8/4 B3.1 P8-3 P7.4 X8.4 P7-9', k: { 1: 'Không bị mê hoặc — nhảy Mã đạp Chốt 3, tiến thủ vững chắc: cương nhu đủ cả.', 6: 'Lui Pháo (nếu Pháo bình 7 phản kích thì Đỏ Xe bình 8 — Đen hụt hẫng).', 9: 'Tránh đổi Xe — duy trì tấn công, phòng Mã Đen xuất kích, thêm thủ đoạn Xe tiến.', 13: 'Đổi Chốt linh hoạt Mã — tiêu trừ điểm yếu duy nhất.', 17: 'Dù vật chất hay vị trí, ưu thế Đỏ không lay chuyển.' } },
        { from: 4, after: 19, m: 'P2-7 X8.9 M3/2 M3/1', k: { 1: 'Nếu Pháo bình 7…', 4: '…cánh phải Đen trống rỗng, Đỏ có cơ hội rõ rệt.' } },
        { from: 4, after: 23, m: 'P2-7 X4-8 X2.5 X8.1', k: { 1: 'Nếu Pháo bình 7 phản kích…', 4: '…Đen hụt hẫng.' } },
        { from: 'main', after: 19, m: 'P2.1', k: { 1: 'Đen nên Pháo tiến 1 — khá ổn chắc.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 34, t: 'Lấy Tĩnh Chế Động',
      s: 'Đen vươn Pháo kỵ hà dọa Chốt 7, mục đích thật là đuổi Mã đầu hà Đỏ để tiện phản kích. Đỏ tiến Mã đạp Chốt theo ý đồ Đen thì mất tiên; thăng Xe phải lấy tĩnh chế động thì Đỏ phế quân đoạt thế hoặc đối công đều chiếm ưu.',
      c: `<p>Đối với trung Pháo <strong>tiên phong Mã</strong> của Đỏ, Đen <strong>vươn Pháo kỵ hà</strong> dọa Chốt 7 — nhưng mục đích thật là đuổi Mã đầu hà Đỏ rời đi để tiện phản kích (nước chính xác của Đen là bổ Sĩ hoặc bình Pháo biên).</p>
<ul>
<li><strong>Mã tiến 7 đạp Chốt</strong> (mạch chính): tưởng không có gì chê trách nhưng xuôi theo ý đồ chiến lược của Đen. Đen lập tức phi Pháo quá hà phản kích: song Xe Đỏ chưa xuất, chỉ đơn Mã qua sông ăn một Chốt nhỏ — cô quân khó thành đại sự; song Pháo Đen quá hà làm mấy việc cùng lúc — Đen phản khách vi chủ.</li>
<li><strong>Xe phải tiến 1</strong> (nhánh phụ): thăng Xe <strong>lấy tĩnh chế động</strong> — hàm súc có lực. Đen xông Chốt qua sông thì Đỏ quyết đoán phế quân (Chốt 3 tiến) — có can đảm có kiến thức — phế quân đoạt thế, tiên thủ lớn; Đen tiến Pháo đánh Chốt đối công thì chậm một nhịp — Đỏ phi Tượng phòng trước, cướp công trước.</li>
</ul>
<h2>Bài học</h2>
<p>Không phải lúc nào cố sức mãnh công cũng là con đường duy nhất; giữ tâm thái điềm tĩnh, nắm cuộc thế khách quan thì tự khắc áp dụng sách lược tiến thủ vững chắc. Pháo kỵ hà của Đen có tính cạm bẫy, nhưng gặp đối thủ lấy tĩnh chế động thì hào nhoáng bên ngoài mà không hiệu quả.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 B7.1 B7.1 M8.7 M2.3 M7.6 P8.3 M6.7 P2.4',
      k: {
        10: 'Vươn Pháo kỵ hà dọa Chốt 7 — mục đích thật là đuổi Mã đầu hà Đỏ để tiện phản kích. Đỏ: Mã tiến 7 hay Xe tiến 1?',
        11: 'Tiến Mã đạp Chốt — tưởng không có gì chê, nhưng xuôi theo ý đồ chiến lược Đen.',
        12: 'Lập tức phi Pháo quá hà phản kích: mới 6 hồi mà Đen đã có thế trận hài lòng, rất có sức bật — song Pháo quá hà làm nhiều việc cùng lúc. Đen phản khách vi chủ.',
      },
      h: { 10: 'p119_0' },
      v: [
        { from: 'main', after: 9, m: 'S4.5', k: { 1: 'Nước chính xác của Đen: bổ Sĩ (hoặc bình Pháo biên) — đều có cơ hội đối kháng.' } },
        { from: 'main', after: 10, m: 'X1.1 B7.1 B3.1 P8-4 X1-6 P4/3 B3.1 S6.5 P8-7 V7.5 B3.1 M7/6 X9-8', k: { 1: 'Thăng Xe lấy tĩnh chế động — hàm súc có lực! Đen: Chốt 7 tiến hay Pháo tiến 4?', 2: 'Xông Chốt qua sông — tính toán chưa đủ sâu.', 3: 'Quyết đoán phế quân — có can đảm có kiến thức!', 7: 'Chốt 3 tiến!', 13: 'Đỏ phế quân đoạt thế, chiếm tiên thủ lớn.' }, h: { 1: '!p120_0' } },
        { from: 1, after: 11, m: 'P2.4 V3.1 P2-7 X9-8 S4.5 M6.7 P8/2 B7.1 V3.5 X1-7 B7.1 B7-6 P7-8 M7.5 V7.5 X7.6', k: { 1: 'Biết đoạt quân không lợi, đổi sang tiến Pháo đánh Chốt đối công — chậm một nhịp.', 2: 'Phòng thủ trước một bước — tranh xuất Xe trái trước Xe Đen.', 5: 'Nếu Xe bình 2 thì Pháo Đỏ tiến 4 — Đỏ tiên.', 16: 'Đỏ cướp công trước, nhanh chân đến trước.' } },
      ],
      kq: 'uu-den',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
