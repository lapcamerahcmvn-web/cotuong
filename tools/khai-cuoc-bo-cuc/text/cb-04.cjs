// Cạm Bẫy — Chương 4: Trung Pháo đối Phản Cung Mã. Nước đi chép từ sách; lời giảng viết lại bằng lời riêng.
module.exports = {
  ch: 4, ten: 'Trung Pháo Đối Phản Cung Mã', level: 'trung-cap',
  y: 'Phản Cung Mã (Pháo sĩ giác, hai Mã chính) là thế phòng ngự đàn hồi. Bên Trung Pháo hay bày bẫy bằng Xe tuần hà giương cung không bắn, Xe xuống hàng 2 dọa tróc Mã… Bên Phản Cung Mã cần phá vỡ quy tắc thông thường, mặc Chốt đối phương qua sông để giành nhịp.',
  cuoc: [
    {
      n: 42, t: 'Ngang Tài Ngang Sức',
      s: 'Ngũ thất Pháo tiến Binh 3 đối Phản Cung Mã: Đỏ thăng Xe tuần hà "giương cung mà không bắn" — cạm bẫy phế Chốt đột phá. Đen đổi Xe cầu bình ổn thì trúng bẫy; bổ Sĩ, rồi xuất Xe mời đổi mặc kệ Chốt Đỏ qua sông thì ngang tài ngang sức.',
      c: `<p>Hai bên vào biến thường gặp của <strong>Ngũ thất Pháo tiến Binh 3 đối Phản Cung Mã tiến Tốt 3</strong>. Đen tiến Pháo phong Xe — lối tắt tốt nhất giành đối kháng (nếu không Đỏ Xe tuần hà thuận lợi giành tiên). Đỏ <strong>thăng Xe tuần hà</strong> — "giương cung mà không bắn", cạm bẫy bố cục đã tính sẵn: chuẩn bị phế Chốt đột phá.</p>
<ul>
<li><strong>Xe bình 8 đổi Xe</strong> (mạch chính): cầu bình ổn — mắc bẫy. Đỏ điều Xe linh hoạt, công cánh trái mỏng yếu của Đen; Chốt biên dĩ dật đãi lao tinh tế — cánh trái Đen trống trải khó xử, Đỏ không khó giành ưu.</li>
<li><strong>Bổ Sĩ</strong> (nhánh phụ): lấy tĩnh chế động, ổn chắc. Sau khi Đỏ xông Chốt, Đen tiến Chốt 3 thì xua theo ý Đỏ — bị cưỡng chế đoạt quân; Đen <strong>xuất Xe ép đổi, mặc kệ Chốt Đỏ qua sông</strong> — nước hay khó nhận ra: hai bên công thủ chặt chẽ, mỗi người một vẻ.</li>
</ul>
<h2>Bài học</h2>
<p>Xe tuần hà hồi 8 là nước có thể đi và mang tính cạm bẫy khá cao. Xuất Xe mời đổi ở biến 2 phá vỡ quy tắc thông thường, để mặc Chốt đối phương sang sông mà giành thế cân bằng — đáng suy ngẫm.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 B3.1 B3.1 M8.9 V7.5 P8-7 X1-2 X9-8 P2.4 X2.4 X9-8 X2.5 M7/8 X8.1 S4.5 X8-2 M8.9 B9.1 P2.1 M3.4 P2-5 V3.5 X2.7 P7/1',
      k: {
        11: 'Ngũ thất Pháo tiến Binh 3 đối Phản Cung Mã — Pháo bình 7 có sức công, dùng nhiều nhất (Pháo bình 6, Xe biên tiến thì ổn chắc hơn).',
        14: 'Tiến Pháo phong Xe — lối tắt tốt nhất giành đối kháng (không thì Đỏ Xe tuần hà thuận lợi giành tiên).',
        15: 'Thăng Xe tuần hà — "giương cung mà không bắn", cạm bẫy bố cục đã lên kế hoạch: chuẩn bị phế Chốt đột phá. Đen: Xe bình 8 hay bổ Sĩ?',
        16: 'Đổi Xe cầu bình ổn — mắc bẫy.',
        19: 'Điều động linh hoạt — giải phong tỏa, thừa cơ công cánh trái mỏng yếu của Đen.',
        20: 'Nếu Pháo bình 5 thì Pháo tiến 4 — Đỏ đắc quân.',
        23: 'Dĩ dật đãi lao — tinh tế.',
        24: 'Hy vọng đổi quân giảm áp lực.',
        29: 'Cánh trái Đen trống trải khó xử — Đỏ không khó giành ưu thế.',
      },
      h: { 15: 'p147_0' },
      v: [
        { from: 'main', after: 19, m: 'P2-5 P5.4', k: { 1: 'Nếu sai lầm Pháo bình 5…', 2: '…Đỏ lập tức đắc quân.' } },
        { from: 'main', after: 21, m: 'M8.7 P7-8 P2-5 M3.5 X2.7 M5.4 P6.1 X2.6', k: { 1: 'Nếu Mã tiến 7…', 8: '…Đen mất quân.' } },
        { from: 'main', after: 22, m: 'P7-8 P2-5 M3.5 X2.7 X2.6 V5/7', k: { 1: 'Cách gấp công khác: Pháo bình 8…', 6: '…Đỏ uổng công.' } },
        { from: 'main', after: 15, m: 'S6.5 B3.1 B7.1 B7.1 B3.1 X2-7 X2.2 P7.5 P6-3 X7/1 P2.2 X7/2 P2/1 X7-8 P2.2 X8.6 P3.5 M3/5', k: { 1: 'Bổ Sĩ lấy tĩnh chế động — ổn chắc.', 3: 'Nếu Chốt 7 tiến thì Đen Pháo lui 1 — Đen phản tiên.', 4: 'Đỏ: Chốt 3 tiến hay Xe bình 8?', 5: 'Đúng lúc xua theo ý đồ Đỏ — bị công kích.', 7: 'Thăng Xe bảo vệ Mã.', 8: 'Đơn giản có lực! Nhắm vào Xe Pháo Đen vô căn.', 18: 'Đỏ dùng thủ đoạn cưỡng chế đoạt quân chiếm ưu.' }, h: { 4: 'p149_0' } },
        { from: 3, after: 19, m: 'X9-8 X2.5 M7/8 B7.1 P2-3 X8.9 P3.3 S6.5 M3/2 P5.4 M2.3 P7.5 P3/7 M3.4 P3-1', k: { 1: 'Xuất Xe ép đổi, mặc kệ Chốt Đỏ qua sông — nước hay khó nhận ra.', 5: 'Bình Pháo đổi Xe — đơn giản rõ ràng.', 6: 'Chính xác (Xe bình 9 thì Đen Xe tiến 6 — Đỏ không được gì).', 15: 'Đổi Xe xong, hai bên công thủ chặt chẽ — mỗi người một vẻ.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 43, t: 'Thâm Nhập Hổ Huyệt',
      s: 'Ngũ lục Pháo tiến Binh 3: Đỏ tiến Xe xuống hàng 2 dọa tróc Mã — "đi sâu vào hang hổ". Đen dùng chiêu đối phó Ngũ thất Pháo thì mắc bẫy, nhấc Pháo thì tự yếu hình trận; phế Chốt 3 phản kích kịp thời nhắm điểm yếu thì Đen giành thế không tệ.',
      c: `<p>Thế trận thường gặp <strong>Ngũ lục Pháo tiến Binh 3 đối Phản Cung Mã phi hữu Tượng</strong>. Đỏ bình Pháo sĩ giác — ổn chắc. Đỏ <strong>tiến Xe xuống hàng 2</strong>, phục Xe bình 3 tróc Mã — cạm bẫy bố cục kinh điển. Đen có ba cách:</p>
<ul>
<li><strong>Lui Pháo</strong> (mạch chính): trúng kế — nước chính xác nếu Đỏ là Ngũ thất Pháo, nhưng ở đây Đỏ phớt lờ thiểm kích, bình Xe tróc Mã; phi Tượng bảo vệ Chốt — Mã trái Đen hết đường chạy, mất quân khó tránh.</li>
<li><strong>Pháo tiến 2</strong>: trông công thủ vẹn toàn nhưng tự yếu hình trận; Đỏ bình Xe 4 khiến Pháo Đen lúng túng — hình trận Đen lỏng lẻo.</li>
<li><strong>Chốt 3 tiến phế Chốt</strong>: thăm dò, mưu phản kích — đáp trả có lực. Đỏ tiến Chốt rồi tiếp tục tróc Mã (cố chấp, mạo hiểm) thì Đen nhấc Pháo bờ sông, nhiều thủ đoạn thiểm kích — Đen lấy lại quân, ưu hoặc hơn Chốt; Đỏ Xe ăn Chốt thì Đen qua hai nước tiên điều chỉnh, bình Pháo mời đổi — mỗi người một vẻ, hình thế Đen lạc quan.</li>
</ul>
<h2>Bài học</h2>
<p>Cạm bẫy "thâm nhập hổ huyệt" lừa gạt khá cao nhưng là cô quân thâm nhập, dễ bị lợi dụng. Đối chọi gay gắt như biến 3, nhắm điểm yếu muộn cung và Xe cánh phải nằm góc của Đỏ thì cạm bẫy vô hiệu.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 B3.1 B3.1 M8.9 V3.5 P8-6 X9.1 X9-8 X1-2 X8.4 X9-4 S4.5 S4.5 X2.8 P2/1 X2-3 X4.6 X8.4 X2.1 S5.6 X2.4 V3.1',
      k: {
        11: 'Ngũ lục Pháo tiến Binh 3 đối Phản Cung Mã phi hữu Tượng — Pháo sĩ giác ổn chắc (còn có Pháo bình 7, Pháo tiến 4).',
        19: 'Tiến Xe xuống hàng 2, phục Xe bình 3 tróc Mã — cạm bẫy bố cục kinh điển. Đen: lui Pháo, Pháo tiến 2 hay Chốt 3 tiến?',
        20: 'Trúng kế! Nếu Đỏ là Ngũ thất Pháo thì nước này chính xác.',
        21: 'Phớt lờ thiểm kích sắp tới — đã dự tính.',
        22: 'Nếu Xe tiến 4 thì Xe bình 5, Đỏ đắc Sĩ chiếm ưu.',
        27: 'Phi Tượng bảo vệ Chốt tránh Xe Đen quấy nhiễu — Mã trái Đen hết đường chạy, mất quân khó tránh.',
      },
      h: { 19: 'p151_0' },
      v: [
        { from: 'main', after: 21, m: 'X4.4 X3-5 S6.5 X8-6', k: { 1: 'Nếu Xe tiến 4…', 4: '…Đỏ đắc Sĩ chiếm ưu.' } },
        { from: 'main', after: 19, m: 'P6.2 X8-4 P6-5 X2/1 P5.3 V3.5 M3.2 M3.2 B5.1 X2/1', k: { 1: 'Pháo tiến 2 — trông công thủ vẹn toàn nhưng tự yếu hình trận.', 2: 'Đơn giản có lực — Pháo Đen lúng túng.', 10: 'Hình trận Đen lỏng lẻo — Đỏ rõ ràng chủ động.' } },
        { from: 'main', after: 19, m: 'B3.1 B7.1 X4.4 X2-3 P6.2 X3/1 P6-2 X8-9 M3.4 X3/1 B1.1 X9.1 Ps-3 P6-7 P3.5 P5.4 P2.3 M3.2 P3-1 V7.9 P2.2 V9/7 P2-1 X9-7 Tg5-4 P5-6 M4.6 X7-4 X2.9 P6-7 X2/1', k: { 1: 'Phế Chốt thăm dò, mưu phản kích — đáp trả có lực. Đỏ: Chốt 7 tiến hay Xe bình 7?', 2: 'Chốt 7 tiến.', 4: 'Tiếp tục tróc Mã — cố chấp, có chút mạo hiểm (nên Chốt biên tiến, ổn chắc).', 5: 'Nhấc Pháo bờ sông — phục hàng loạt thiểm kích, tràn sức sống. Đỏ: Xe lui hay Xe tiến 2?', 6: 'Xe lui.', 9: 'Nhảy Mã triển khai thế công.', 18: 'Tiến Pháo đánh Mã — chuẩn xác; trong đối công Đen nhanh chân hơn.', 31: 'Đen phục liên sát Xe bình 5 — thế công mãnh liệt, Đỏ khó chống.' }, h: { 1: 'p152_0', 5: 'p152_1' } },
        { from: 2, after: 24, m: 'X8.2 X4-3 P5-4 M3.4 X8/5 M4.2 P6-8 X3-7 V3.5 X7.2 X3/1 P6-2 X3.1 M2/4 P8.5 X2.2', k: { 1: 'Xe tiến 2.', 2: 'Quyết đoán dùng Xe sát qua Chốt Đỏ — hung hãn.', 3: 'Nếu tham ăn Mã thì Đen Mã tiến… — Đen đại ưu.', 6: 'Nhảy Mã đánh Xe tranh tiên — tích cực.', 7: 'Ngoan cường nhất.', 8: 'Duy trì cuộc thế phức tạp, giàu sức tiến thủ.', 11: 'Chính xác.', 12: 'Diệu thủ — thoát kìm chế.', 16: 'Cuộc thế bình ổn — Đen hơn Chốt, vị trí tốt, tiền đồ lạc quan.' } },
        { from: 2, after: 20, m: 'X8-7 P2/1 X7-8 B7.1 X2-3 M7.6 B3.1 X4.4 X8.4 X2.1 B3-4 X2.4 V3.1 X2/1 B4.1 P6-9', k: { 1: 'Xe ăn Chốt — bề ngoài ăn trắng một Chốt.', 2: 'Đen uy hiếp song Xe Đỏ, ung dung điều chỉnh.', 3: 'Đen qua phế Chốt đã được 2 nước tiên. Đen: Chốt 7 tiến hay Pháo bình 1?', 4: 'Lợi dụng thiểm kích thông đường Mã trái — giàu sinh lực.', 5: 'Tranh cuộc thế phức tạp.', 9: 'Một Xe đổi đôi.', 16: 'Mỗi người một vẻ.' }, h: { 3: 'p155_0' } },
        { from: 4, after: 23, m: 'P2-1 X8.5 M3/2 P6-7 X4.4 X2/4 M2.3', k: { 1: 'Pháo bình 1 — Xe phải Đỏ nằm góc, bình Pháo mời đổi Xe trái linh hoạt của Đỏ: rất thực tế.', 4: 'Chỉ đành vậy (không thì Đen song trùng uy hiếp).', 7: 'Hình trận Đen chỉnh tề, Xe kỵ hà kiểm soát toàn cuộc — lạc quan.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 44, t: 'Thời Cơ Phản Kích',
      s: 'Đỏ khởi hoành Xe rồi bình Xe nấp sau Pháo, gia tăng áp lực lộ 3 — ám tàng mưu kế. Đen bình Pháo đánh Xe theo cảm giác thì đúng ý Đỏ; thăng Xe dĩ dật đãi lao, đợi Đỏ xông Chốt rồi bình Pháo ép đổi đúng thời cơ thì Đen vững chắc, mỗi người một vẻ.',
      c: `<p>Hai bên thúc Chốt 3 tương ứng, Đen bổ Tượng củng cố (ưu điểm: Đỏ bình Pháo trái thì Đen tranh xuất Xe phải). Đỏ <strong>khởi hoành Xe rồi bình Xe nấp sau Pháo</strong> — gia tăng áp lực lên lộ 3 Đen, ám tàng mưu kế, khảo nghiệm Đen. Đỏ xông Chốt phát động công kích; Đen có hai cách:</p>
<ul>
<li><strong>Pháo bình 3 đánh Xe</strong> (mạch chính): tưởng tranh tiên có lợi — đúng ý Đỏ. Đỏ đổi Xe rồi <strong>hồi Xe về tuyến đáy</strong> bảo vệ Tượng tranh tiên (nước hay dự trù), bình Pháo điều chỉnh giương Tượng đuổi Pháo — dồn hỏa lực vào cánh phải Đen; quân lực Đỏ linh hoạt, rõ ràng chiếm ưu.</li>
<li><strong>Xe tiến 4</strong> (nhánh phụ): thăng Xe dĩ dật đãi lao — ổn chắc. Đỏ xông Chốt tranh tiên thì Đen bình Pháo đúng thời cơ tốt nhất; cuối cùng Đỏ hơn Chốt giữa nhưng trận hình Đen vững chắc — mỗi người một vẻ.</li>
</ul>
<h2>Bài học</h2>
<p>Nhiều người có ý thức phản kích mạnh — đáng khen; nhưng <strong>thời cơ phản kích</strong> phải cân nhắc tỉ mỉ. Ở biến 2 Đen nắm đúng thời cơ, khiến kế hoạch Đỏ không thực hiện được.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 B3.1 B3.1 M8.9 V7.5 P8-7 X1-2 X1.1 M8.7 X9-8 P2.4 X1-7 X9-8 B7.1 P2-3 X8.9 P3.2 X8/9 P3/3 P5-6 X8.4 V7.5 X8-4 S6.5 X4.2 M3.4 X4/1 M4.3 X4.1 P6/2 P3-4 P7-6 X4-1 P6.4 X1.1 P6.4',
      k: {
        6: 'Thúc Chốt 3 tương ứng, hạn chế thế mạnh của nhau.',
        8: 'Bổ Tượng củng cố — Đỏ bình Pháo trái thì Đen tranh xuất Xe phải.',
        15: 'Khởi hoành Xe rồi bình Xe phục sau Pháo — áp lực lên lộ 3 Đen, ám tàng mưu kế.',
        17: 'Xông Chốt phát động công kích. Đen: Pháo bình 3 hay Xe tiến 4?',
        18: 'Bình Pháo đánh Xe — tưởng tranh tiên có lợi, thực tế đúng ý Đỏ.',
        21: 'Hồi Xe về tuyến đáy bảo vệ Tượng tranh tiên — nước hay đã dự trù.',
        23: 'Bình Pháo điều chỉnh, chuẩn bị giương Tượng đuổi Pháo — áp lực lên cánh phải Đen.',
        30: 'Không còn cách nào khác.',
        39: 'Quân lực Đỏ linh hoạt — rõ ràng chiếm ưu.',
      },
      h: { 17: 'p157_0' },
      v: [
        { from: 'main', after: 5, m: 'M8.7 B7.1 X9-8', k: { 1: 'Cũng có thể Mã tiến 7…', 3: '…xuất nhanh Xe trái bù đắp — biến bình thường.' } },
        { from: 'main', after: 7, m: 'M8.7 P8-7 V3.5 X9-8 X1-2 X8.4 X9-8 X1-2 X8.9 M3/2', k: { 1: 'Nếu Mã tiến 7…', 10: '…Đỏ hơi chủ động.' } },
        { from: 'main', after: 25, m: 'P3-4 X8.7 M3/5 X8.1', k: { 1: 'Nếu Pháo bình 4…', 4: '…Đỏ có thế công chiếm ưu.' } },
        { from: 'main', after: 33, m: 'P3.1 M9.7 X4-3 X8.2 M3.4 P6-7 X3-4 Pt.7 V5/3 P7.9 S4.5 X8.7', k: { 1: 'Nếu Pháo tiến 1…', 12: '…Đỏ phế quân tranh công, hình thế chủ động.' } },
        { from: 'main', after: 17, m: 'X8.4 B7.1 P2-3 X8.9 P3.2 P7.5 P3/6 P5.4 S6.5 V3.5 X8-3', k: { 1: 'Thăng Xe dĩ dật đãi lao — ổn chắc.', 2: 'Xông Chốt tranh tiên (Pháo bình 6 thì bình ổn).', 3: 'Bình Pháo — đúng thời cơ tốt nhất.', 4: 'Nếu Pháo bình 6 thì Xe tiến, Mã lui… Đỏ khó có lợi.', 11: 'Cuộc thế bình ổn — hai bên cân thế.' } },
        { from: 4, after: 19, m: 'X8-3 P7.5 P6-3 X7.4 V5.3 M3.4', k: { 1: 'Nếu Xe bình 3…', 6: '…Đỏ chủ động.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 45, t: 'Bốn Lạng Đẩy Ngàn Cân',
      s: 'Đỏ phế Chốt 3 rồi Xe tróc Chốt — cạm bẫy đánh nhanh. Đen xông Chốt tróc Mã theo lối mòn thì gặp mãnh công; bình Chốt cản Xe — "bốn lạng đẩy ngàn cân" — trì hoãn thế công thì hai bên cân thế.',
      c: `<p>Đỏ nhảy Mã trái lên biên — cách cũ, xuất quân nhanh nhưng vị trí song Mã dễ thành điểm yếu; Đen thúc Chốt linh hoạt đường Mã — hữu hiệu chống Mã biên. Đỏ bình Pháo 7 (chưa đủ ổn chắc); Đen nhảy Mã lên hà kìm chế. Đỏ <strong>phế Chốt 3</strong> mang cạm bẫy — cương quyết tháo gỡ cục diện, đánh nhanh (thường là Xe tiến 4 hoặc Xe 2 tiến 4). Đen khử Chốt, Đỏ <strong>Xe tróc Chốt</strong>:</p>
<ul>
<li><strong>Chốt 7 tiến tróc Mã</strong> (mạch chính): trông như tiên thủ tuyệt đối nhưng theo lối mòn — Đỏ tiến Xe tróc Mã (áp bức), quán triệt mãnh công: Đỏ có thể công trung Pháo, chiếm ưu.</li>
<li><strong>Chốt bình 8 cản Xe</strong> (nhánh phụ): trì hoãn thế công — quyết đoán khác thường, tinh diệu <strong>"bốn lạng đẩy ngàn cân"</strong>; cao Xe lấy căn ép đổi Mã, trời quang mây tạnh — hai bên cân thế.</li>
</ul>
<h2>Bài học</h2>
<p>Cạm bẫy đột kích nhanh: Đen dùng lực càng mạnh thì thế Đỏ càng mạnh. Bình tĩnh trì hoãn sách lược như biến 2 thì bình an vô sự.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 M8.9 B7.1 P8-7 M7.6 X9-8 P2-1 B3.1 B7.1 X8.4 B7.1 X2.5 B7.1 X2-4 S4.5 B7.1 V3.5 B7.1 B3.1 P7.5 P6-3 P5.4 P3.7 S6.5',
      k: {
        7: 'Mã trái lên biên — cách cũ: xuất quân nhanh, nhưng song Mã dễ thành điểm yếu.',
        8: 'Thúc Chốt linh hoạt đường Mã — hữu hiệu chống Mã biên.',
        9: 'Bình Pháo 7 tăng áp lực lộ 3 — chưa đủ ổn chắc.',
        10: 'Mã nhanh lên hà — phục Mã tiến 4 xâm nhập.',
        12: 'Đương nhiên — thoát kìm chế của Xe Đỏ.',
        13: 'Phế Chốt mang cạm bẫy — tháo gỡ cục diện, đánh nhanh.',
        14: 'Khử Chốt — việc đáng làm.',
        15: 'Xe tróc Chốt. Đen: Chốt 7 tiến hay Chốt 7 bình 8?',
        16: 'Xông Chốt tróc Mã — trông như tiên thủ tuyệt đối nhưng theo lối mòn, nằm trong tính toán Đỏ.',
        17: 'Tiến Xe tróc Mã — áp bức, đã dự tính.',
        21: 'Quán triệt mãnh công.',
        29: 'Đỏ có thể công trung Pháo — chiếm ưu.',
      },
      h: { 15: 'p160_0' },
      v: [
        { from: 'main', after: 8, m: 'P8-6', k: { 1: 'Pháo bình 6 ổn chắc hơn một chút.' } },
        { from: 'main', after: 9, m: 'X1-2 X9-8 P2.4 X2.6', k: { 1: 'Cũng có thể Xe bình 2…', 4: '…mỗi bên công một cánh.' } },
        { from: 'main', after: 11, m: 'X1-2 X8.4', k: { 1: 'Nếu Xe bình 2…', 2: '…Đen không thể Pháo bình 1 mời đổi tự nhiên — Đỏ chiếm ưu.' } },
        { from: 'main', after: 12, m: 'X8.4', k: { 1: 'Thông thường: Xe tiến 4.' } },
        { from: 'main', after: 13, m: 'M6.4 B3.1 M4.3 X8.2 P6.5 M3.4', k: { 1: 'Nếu Mã tiến 4…', 6: '…Đen mất quân lại bị tấn công.' } },
        { from: 'main', after: 17, m: 'M6/7 X2-3 X9.2 X3/2', k: { 1: 'Nếu Mã lui 7…', 4: '…Đỏ chủ động.' } },
        { from: 'main', after: 20, m: 'P7-3 V3.5', k: { 1: 'Nếu Pháo bình 3…', 2: '…cục diện bình ổn, Đỏ hơi tiên.' } },
        { from: 'main', after: 15, m: 'B7-8 M3.2 X9-8 X2.2 X8.5 X2.2 M6.8 X8-2 V3.5 B9.1 S4.5 P7.4 B9.1 M9.8 X1-4', k: { 1: 'Bình Chốt cản Xe — trì hoãn thế công: "bốn lạng đẩy ngàn cân".', 3: 'Nước hay — thuận thế cướp tiên.', 4: 'Cao Xe lấy căn — lập tức ép đổi Mã bờ sông, kịp thời.', 7: 'Qua đổi quân trời quang mây tạnh — bình ổn.', 11: 'Bổ Sĩ ổn chắc (Chốt 3 tiến thì Đỏ Chốt 7 tiến tấn công).', 13: 'Tinh tế — không cho Pháo Đỏ bình đánh Chốt.', 15: 'Hai bên cơ bản cân thế.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 46, t: 'Rút Đao Chém Nước',
      s: 'Ngũ thất Pháo trực Xe đối Phản Cung Mã: Đỏ tiến Xe tróc Mã dẫn dụ Đen xông Chốt. Đen thúc Chốt cản Xe — "rút đao chém nước" — tự làm loạn hình trận; nhảy Mã đạp Chốt giành thực lợi, linh hoạt Pháo sườn thì Đen qua ải bố cục.',
      c: `<p><strong>Ngũ thất Pháo trực Xe đối Phản Cung Mã tiến Tốt 7</strong>: song Xe Đỏ xuất nhanh, có tiềm lực công; Đen dựa hình trận tốt phòng ngự tích cực. Đen khởi hoành Xe chuẩn bị bình quá sườn chi viện Mã bờ sông — nước hay hài hòa. Đỏ <strong>tiến Xe tróc Mã</strong>, dẫn dụ Đen xông Chốt — có tính cạm bẫy.</p>
<ul>
<li><strong>Chốt 3 tiến cản Xe</strong> (mạch chính): như "rút đao chém nước", không ý nghĩa tích cực mà tự làm loạn hình trận — Đỏ lui Xe khiến hình trận Đen suy yếu; Pháo Đỏ nổ Chốt giữa rồi xông Chốt giữa — Mã Đen một mình vào sâu thiếu thủ đoạn, Đỏ có Pháo trấn trung, song Xe giữ yếu đạo, Chốt giữa qua sông — ưu thế lớn.</li>
<li><strong>Mã tiến 7 đạp Chốt</strong> (nhánh phụ): không bị cám dỗ — cẩn trọng, thực dụng; Đỏ bình Xe tróc Pháo mong Đen bổ Sĩ tự cản Xe, Đen nhìn thấu, di động Pháo sườn linh hoạt — cuộc thế bình ổn, Đen hài lòng.</li>
</ul>
<h2>Bài học</h2>
<p>Mã phải Đen gánh trọng trách bảo vệ Chốt giữa nên Đỏ dẫn dụ Mã để phát động công kích. Phán đoán chuẩn, hiểu mục đích Đỏ như biến 2 thì thuận lợi qua ải bố cục.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 M8.9 B7.1 P8-7 M7.6 X9-8 P2-1 X2.4 V3.5 B7.1 X9.1 X8.5 B3.1 X8/2 B3.1 X2-7 M3.4 P5.4 S4.5 B5.1 M4.6 B5.1 M6.7 B5-4',
      k: {
        9: 'Ngũ thất Pháo trực Xe đối Phản Cung Mã tiến Tốt 7 — song Xe Đỏ xuất nhanh; Đen dựa hình trận tốt phòng ngự tích cực.',
        16: 'Khởi hoành Xe chuẩn bị bình quá sườn chi viện Mã bờ sông — nước hay hài hòa.',
        17: 'Tiến Xe tróc Mã, dẫn dụ Đen xông Chốt — có tính cạm bẫy. Đen: Chốt 3 tiến hay Mã tiến 7?',
        18: 'Thúc Chốt cản Xe — như "rút đao chém nước": tự làm loạn hình trận.',
        19: 'Tiến rồi lại thoái — khiến hình trận Đen tự suy yếu.',
        25: 'Pháo nổ Chốt giữa rồi xông Chốt giữa — cuộc thế sinh động.',
        29: 'Mã Đen một mình vào sâu, thiếu thủ đoạn; Đỏ Pháo trấn trung, song Xe giữ yếu đạo, Chốt giữa qua sông — ưu thế lớn.',
      },
      h: { 17: 'p163_0' },
      v: [
        { from: 'main', after: 17, m: 'M6.7 X2-4 P6-7 P5-6 X9-4 S4.5 X1-2 X8.4 M3/2', k: { 1: 'Không để đối phương cám dỗ — Mã đạp Chốt: cẩn trọng, thực dụng.', 2: 'Bình Xe tróc Pháo — mong Đen bổ Sĩ tự cản Xe.', 3: 'Nhìn thấu ý đồ — di động Pháo sườn, linh hoạt đa biến.', 9: 'Cuộc thế bình ổn — Đen đủ hài lòng.' } },
        { from: 0, after: 19, m: 'S4.5 P7.4 X9-7 P5-7 B7.1 X4-6', k: { 1: 'Nếu bổ Sĩ…', 6: '…tiếp theo Chốt tiến, Mã biên — Đỏ có thế công.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 47, t: 'Cờ Trống Tương Đương',
      s: 'Đỏ cướp thúc Chốt 7 rồi nhảy chính Mã trái ung dung — như không sợ bị đánh xâu. Đen tham Pháo đánh Chốt giữa thì bị lợi dụng; Chốt 7 tiến chậm chạp thì Đỏ mở rộng tiên; nhảy Mã chính, nhanh xuất chủ lực thì Đen giành thế cân bằng.',
      c: `<p>Đối với Phản Cung Mã, Đỏ <strong>cướp thúc Chốt 7 rồi nhảy Mã trái chính diện</strong> — chuẩn bị chiếm bờ sông, uy hiếp trung lộ (thịnh hành thập niên 80). Đỏ ung dung nhảy chính Mã — lẽ nào không sợ bị đánh xâu? Đen có ba cách:</p>
<ul>
<li><strong>Pháo đánh Chốt giữa</strong> (mạch chính): "bọ ngựa bắt ve, chim sẻ chờ sẵn" — Đỏ Xe tiến 2 chặt chẽ, Đen buộc phế trả một quân; qua đổi quân Đỏ có ít nhất 5 nước hiệu quả, Đen chỉ 2 — Đỏ mở lỗ hổng lộ 7 hoặc công trung lộ, Đen khó cân bằng.</li>
<li><strong>Chốt 7 tiến</strong>: mềm tay khó phát giác — chỉ chú trọng linh hoạt Mã, xem nhẹ tốc độ xuất quân; Đỏ xuất kích kịp thời, lộ Xe phải cướp trước đường xuất Xe trái Đen — hơn Chốt, thế công trung lộ, cực lạc quan.</li>
<li><strong>Mã tiến 7</strong>: thiết thực nhất — Đỏ có mấy nước tiên nhưng Đen ứng phó thỏa đáng, xây hình trận kiên cố — ngang tài ngang sức.</li>
</ul>
<h2>Bài học</h2>
<p>Đối với lối tấn công nhanh của Trung Pháo, Đen nên <strong>nhanh chóng xuất động chủ lực</strong> để tăng cường phòng ngự — mới giành được thế cân bằng.</p>`,
      m: 'P2-5 M2.3 B7.1 P8-6 M8.7 P6.5 X1.2 P6-3 P5/1 P3/1 X1-7 P3.3 X9-7 V3.5 Xt-6 M8.7 X6.4 X9-8 M2.3',
      k: {
        5: 'Cướp thúc Chốt 7 rồi nhảy Mã trái chính diện — lẽ nào không sợ bị đánh xâu? Đen: Pháo tiến 5, Chốt 7 tiến hay Mã tiến 7?',
        6: '"Bọ ngựa bắt ve, chim sẻ chờ sẵn" — kịp thời xuất kích chưa chắc là chuyện tốt.',
        7: 'Chặt chẽ!',
        10: 'Chỉ đành phế trả lại một quân (Pháo bình 4 thì gặp chiến thuật đả kích lợi hại).',
        19: 'Qua đổi quân Đỏ có ít nhất 5 nước hiệu quả, Đen chỉ 2 — Đỏ mở lỗ hổng lộ 7 hoặc công trung lộ, Đen khó cân bằng.',
      },
      h: { 5: 'p165_0' },
      v: [
        { from: 'main', after: 6, m: 'X9.2 P6-3 P8.4 P3/1 P8-5 M3.5 P5.4 M8.7 P5/2 X1-2', k: { 1: 'Nếu Xe 9 tiến 2…', 10: '…Đỏ có không đầu Pháo nhưng thiếu thủ đoạn tiếp — Đen cân bằng.' } },
        { from: 'main', after: 5, m: 'B7.1 M7.6 V3.5 M2.3 M8.7 X1-2 S4.5 P8-6 P2.3 M6.5 M3.5 P5.4 X1-4 X9-8 P2/3 S6.5', k: { 1: 'Chốt 7 tiến — mềm tay khó phát giác: xem nhẹ tốc độ xuất quân.', 2: 'Xuất kích kịp thời — ép Đen phòng thủ, tranh thời gian.', 6: 'Lộ Xe phải — cướp trước đường xuất Xe trái Đen.', 8: 'Mở đường Xe sát sườn Tướng.', 9: 'Đơn giản có lực.', 16: 'Đỏ hơn Chốt, có thế công trung lộ — cực kỳ lạc quan.' } },
        { from: 1, after: 11, m: 'X1-2 X9-8', k: { 1: 'Nếu Xe bình 2…', 2: '…chủ lực Đen bị kìm, khó triển khai.' } },
        { from: 1, after: 14, m: 'M6.7 X1-4 S4.5 P2.1', k: { 1: 'Nếu Mã tiến 7…', 4: '…Đen có thể giằng co.' } },
        { from: 'main', after: 5, m: 'M8.7 M7.6 S4.5 P8-7 V3.5 X9-8 P2-1 M2.3 X9-8 X1-2 X8.9 M3/2 B7.1', k: { 1: 'Mã tiến 7 — thiết thực nhất.', 9: 'Nếu Mã tiến 4 gấp công thì Pháo tiến, Chốt 3 tiến — Đỏ vô vị.', 13: 'Đen giành cục diện cân bằng.' } },
      ],
      kq: 'uu-do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
