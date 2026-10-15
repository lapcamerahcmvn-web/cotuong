// Nghi Hình — Chương 4: Loại hình Trung Pháo đối Phản Cung Mã. Nước đi chép từ sách; lời giảng viết lại bằng lời riêng.
module.exports = {
  ch: 4, ten: 'Trung Pháo Đối Phản Cung Mã', level: 'trung-cap',
  y: 'Phản Cung Mã có kết cấu đặc thù (Pháo Sĩ giác, hai Mã chéo nhau) nên nghi hình thường do Mã vội xuất trận, Xe phải xuất chậm, Pháo nổ Chốt thiếu cân nhắc… — bên Trung Pháo nắm điểm yếu là có thể tập kích bất ngờ.',
  cuoc: [
    {
      n: 42, t: 'Xảy Ra Bất Ngờ',
      s: 'Trung Pháo quá hà Xe đối Phản Cung Mã: Đen tả Mã bàn hà vội vàng xuất trận. Đỏ diệu phế Chốt 7 tập kích bất ngờ rồi bình Pháo lộ 7: Đen thoái Mã ép dạ cầu toàn thì hình trận bị phá; Đen bổ Tượng phản kích thì Đỏ thoái Xe về tuyến Chốt, Pháo nổ Chốt giữa — ưu thế ở mức khác nhau.',
      c: `<p>Đỏ dùng <strong>Chốt 7 quá hà Xe</strong> đối Phản Cung Mã. Đen <strong>tả Mã bàn hà</strong> — trông tích cực, thực ra tính toán không đủ sâu, tạo nguy cơ tiềm ẩn (thường Xe 9 tiến 2 hoặc bổ Sĩ).</p>
<p>Đỏ <strong>phế Chốt 7</strong> — sắc bén, nhất cử đánh trúng yếu hại; Đen buộc ăn; Đỏ <strong>bình Pháo lộ 7</strong> tập kích. Đen có 2 cách:</p>
<ul>
<li><strong>Thoái Mã</strong> (mạch chính): bảo toàn quân lực nhưng hình trận bị phá nghiêm trọng. Đỏ vòng qua cạm bẫy nhỏ, thoái Xe có lực hơn Pháo nổ Chốt; bình Pháo — dù không hơn quân, hình trận Đen đình trệ khó điều chỉnh.</li>
<li><strong>Bổ Tượng</strong> — ngoan cường, chấp nhận mất quân để phản kích. Đỏ <strong>thoái Xe về tuyến Chốt</strong> ý đồ chém giết. Đen thúc Chốt thì Đỏ Pháo nổ Chốt giữa công thủ vẹn toàn, ưu thế hơn quân dần rõ; Đen bổ Sĩ thì Pháo nổ Chốt giữa làm việc nghĩa không do dự — Trung Pháo uy lực, Đỏ ưu.</li>
</ul>
<h2>Bài học</h2>
<p>Đỏ công kích có lực là xây trên nền hình cờ không ổn chắc của Đen — chiến thuật sắc bén có tính đột phá.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 B7.1 B7.1 X2.6 M7.6 B7.1 B3.1 P8-7 M6/5 M8.9 P2.1 X2/1 P2-3 P7.4 M5.3 P5-7 Mt/5 X2-3 V3.1 X9-8',
      k: {
        9: 'Chốt 7 quá hà Xe đối Phản Cung Mã.',
        10: 'Tả Mã bàn hà — tính toán không đủ sâu (thường Xe tiến 2 hoặc bổ Sĩ).',
        11: 'Phế Chốt — sắc bén, nhất cử đánh trúng yếu hại!',
        12: 'Bắt buộc.',
        13: 'Tập kích bất ngờ. Đen: Mã 6 lui 5 hay Tượng 3 tiến 5?',
        14: 'Bảo toàn quân lực nhưng hình trận bị phá.',
        15: 'Vòng qua một cạm bẫy nhỏ.',
        17: 'Có lực hơn Pháo nổ Chốt giữa.',
        21: 'Hay!',
        25: 'Không hơn quân nhưng hình trận Đen đình trệ — Đỏ nắm chắc ưu thế.',
      },
      h: { 13: '!p122_0' },
      v: [
        { from: 'main', after: 9, m: 'X9.2', k: { 1: 'Thường gặp hơn.' } },
        { from: 'main', after: 11, m: 'B7.1 X2-4 M6.4 B7.1 M4/3 B3.1', k: { 6: 'Đỏ hơn Chốt chiếm ưu.' } },
        { from: 'main', after: 12, m: 'P8-7 M6.4', k: { 2: 'Đỏ bỏ lỡ chiến cơ.' } },
        { from: 'main', after: 14, m: 'P7.5 P6-3 P5.4 M5/7', k: { 4: 'Đỏ mất Xe.' } },
        { from: 'main', after: 15, m: 'X1-2 X9-8 P2.4 M9.7 S4.5 M7.5', k: { 6: 'Đỏ nhanh chóng mở rộng nước tiên.' } },
        { from: 'main', after: 16, m: 'P5.4 M3.5 X2-5 P2.4 V7.5 P6.5', k: { 6: 'Đen có thể ứng chiến.' } },
        { from: 'main', after: 13, m: 'V3.5 X2-4 M6.4 X4.1 M3.2 X4/1 B3.1 P7-6 B3.1 P5.4 M4/5 X4-5 M2.4 X5-8 P2-3 V7.5', k: { 1: 'Bổ Tượng — ngoan cường, tuy mất quân vẫn chiến đấu được.', 6: 'Thoái Xe về tuyến Chốt — ý đồ chém giết. Đen: Chốt 3 tiến hay bổ Sĩ?', 8: 'Duy trì ưu thế hơn quân.', 10: 'Pháo nổ Chốt giữa — công thủ vẹn toàn!', 11: 'Đổi quân — bắt buộc.', 16: 'Hóa giải thế công — ưu thế hơn quân dần rõ.' }, h: { 6: 'p123_0' } },
        { from: 'main', after: 13, m: 'P2.1 X2.1', k: { 2: 'Đen không thể đi Pháo 2 tiến 1.' } },
        { from: 6, after: 17, m: 'M4.2 X4/6', k: { 2: 'Đỏ tử thủ — hơn quân chiếm ưu.' } },
        { from: 6, after: 20, m: 'P5.4 M4/5 X4-5 P2.7 X9-8 M2.4', k: { 6: 'Đen lấy lại quân.' } },
        { from: 6, after: 23, m: 'S4.5 P5/2 M4.2 S4.5', k: { 4: 'Trung Pháo Đỏ uy lực — trong đối công Đỏ chiếm ưu.' } },
        { from: 6, after: 19, m: 'S4.5 P5.4 X1-4 P5/1 P2.7 P7-6 M4.3 S4.5 X4.4 B5.1', k: { 1: 'Bổ Sĩ.', 2: 'Pháo nổ Chốt giữa — nước mấu chốt giành ưu thế!', 4: 'Lại một nước chặt chẽ.', 5: 'Lập tức lấy lại một quân.', 10: 'Đối công — Trung Pháo Đỏ uy lực hơn, phục Tướng bình 4, Xe tiến 2… chiếm ưu.' } },
        { from: 11, after: 20, m: 'S4.5 P2.1 X4/2 B3.1', k: { 4: 'Đen kém quân có thế công — đủ sức đối kháng.' } },
        { from: 11, after: 22, m: 'P7-5 X4.3 B5.1 M4.5 V7.5 M2/3 B5.1 P2.2', k: { 8: 'Đen phản đoạt ưu thế.' } },
        { from: 11, after: 23, m: 'M4.2 S4.5 X4.4 P7-5', k: { 4: 'Rồi Mã ra, xuất Tướng, Xe biên tiến — Đỏ ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 43, t: 'Tập Kích Cánh Bên',
      s: 'Trung Pháo quá hà Xe đối Phản Cung Mã: Đen xuất hoành Xe không hợp thời, trung lộ mỏng yếu. Đỏ nhảy Mã thường gặp thì không đủ lực; xông Chốt giữa, khi Đen hoàn Trung Pháo thì bất ngờ phế Chốt 7 tập kích cánh bên — đòn phủ đầu giành ưu thế.',
      c: `<p>Đỏ Xe trực tiếp quá hà lên tuyến Chốt; Đen cao Xe bảo vệ Mã — công thủ có trình tự. Đỏ <strong>Pháo trái tiến</strong> phối hợp Trung Pháo, Xe quá hà thành gọng kìm; Đen bình Xe mời đổi xảo diệu. Đỏ bình Xe đè Mã duy trì phức tạp. Đen <strong>xuất hoành Xe</strong> — trung lộ mỏng yếu, không hợp thời (chính xác: bổ Sĩ). Đỏ có 2 cách:</p>
<ul>
<li><strong>Nhảy Mã xuất kích</strong>: thường gặp nhưng không đủ lực — đổi quân hàng loạt, cục thế bình ổn, ngang thế.</li>
<li><strong>Xông Chốt giữa</strong> (mạch chính): Đen không cam khổ thủ, <strong>hoàn Trung Pháo</strong>. Đỏ dùng thế công Trung Pháo kiềm chế, bất ngờ <strong>phế Chốt 7 đột phá</strong> — tập kích cánh bên sắc bén. Bình Xe chiếm sườn tinh tế — mấu chốt giữ ưu thế; hình trận Đen rời rạc.</li>
</ul>
<h2>Bài học</h2>
<p>Bức ép toàn tuyến (trung lộ và hai cánh) là thủ đoạn thường dùng của Trung Pháo, nhưng đột phá cuối cùng lại tập trung một cánh — tầm nhìn xa rộng, ý thức nhạy bén.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 B7.1 B7.1 X2.6 X9.2 P8.4 X9-8 X2-3 P6/1 M8.7 X1.1 B5.1 P6-7 X3-4 P7-5 B7.1 B3.1 P8-7 P5.4 M3.5 B5.1 P7.3 S4.5 X9-8 P2/2 X4-6 P5.2 V7.5 B5.1 P7/4 M7.6 X6-7 P2-3 P7-5 Tg5-4 X7-6 X8-4 X6.1 S5.4 M5.7',
      k: {
        10: 'Cao Xe bảo vệ Mã — công thủ có trình tự.',
        11: 'Pháo trái tiến — thế công gọng kìm.',
        12: 'Bình Xe mời đổi — ứng phó xảo diệu.',
        13: 'Bình Xe đè Mã — duy trì biến hóa phức tạp.',
        16: 'Xuất hoành Xe — trung lộ mỏng, không hợp thời (chính xác: Sĩ 4 tiến 5). Đỏ: Mã 7 tiến 6 hay Chốt giữa?',
        17: 'Xông Chốt giữa — cách công kích chuẩn xác.',
        20: 'Hoàn Trung Pháo — quyết tâm cản trở thế công.',
        21: 'Phế Chốt 7 đột phá — tập kích cánh bên sắc bén!',
        24: 'Pháo nổ Chốt giữa — cố gắng phản kích.',
        31: 'Bình Xe chiếm sườn — tinh tế, mấu chốt giữ ưu thế.',
        35: 'Hay!',
        37: 'Nước đánh khá hung ác.',
        45: 'Nhảy Mã lên đầu Tượng — vững bước. Hình trận Đen rời rạc, Đỏ nhiều cơ hội.',
      },
      h: { 16: 'p126_0' },
      v: [
        { from: 'main', after: 11, m: 'V3.5 P8-5 M3.5 P5.4 S4.5 B5.1 X1-4 M8.7', k: { 8: 'Đỏ mở thông cục diện, hơn Chốt chiếm ưu.' } },
        { from: 'main', after: 12, m: 'X2.1 P6-8 M8.7 V3.5', k: { 4: 'Cục thế bình ổn — cơ hội tiến thủ của Đỏ giảm mạnh.' } },
        { from: 'main', after: 15, m: 'S4.5 X9.1 V3.5 X9-6 P6-7 X3-4 P2/1', k: { 1: 'Làm rắn chắc cục thế…', 7: '…hình cờ Đen vững vàng, đủ sức đối kháng.' } },
        { from: 'main', after: 16, m: 'M7.6 P6-7 X3-4 V7.5 M6.5 M3.5 P8-5 M7.5 P5.4 P7-5 X9-8 P5.2 X4-5 P2-1', k: { 1: 'Nhảy Mã xuất kích — thường gặp nhưng không đủ lực.', 4: 'Bổ Tượng — ổn chắc.', 5: 'Mã đạp Chốt giữa — dẫn đến đổi quân hàng loạt.', 14: 'Cục thế bình ổn, hai bên ngang thế.' } },
        { from: 3, after: 19, m: 'X1-4 M6.5 M7.5 P8-5 M3.5 P5.4 X4.2', k: { 7: 'Đối công phức tạp — hai bên kiêng dè.' } },
        { from: 3, after: 26, m: 'P5-1 P2.1 X4-7 P2-9 X7-1 X8.4', k: { 1: 'Sai lầm…', 6: '…Mã phải Đỏ bị khắc chế, Đen kiếm lợi.' } },
        { from: 'main', after: 19, m: 'V7.5 M3.5 X1-4 B5.1', k: { 4: 'Đỏ rõ ràng chủ động.' } },
        { from: 'main', after: 21, m: 'P5.4 S6.5 B3.1 X4/2 P5/1 P8-7 M3/5 X9-8 P2-5 X4-6', k: { 10: 'Mã oa tâm Đen hậu họa khôn lường.' } },
        { from: 'main', after: 23, m: 'P5-3 P7.2 X1-3 B5.1 S4.5 X9-8 P2.2 B5.1 M7.5 M3.5', k: { 10: 'Đen có nguy cơ mất quân.' } },
        { from: 'main', after: 23, m: 'V3.5 X9-8 X1.1 X4.2 X8.4 B5.1 B5.1 X8.7 X1-2 P5.5', k: { 10: 'Chiếu Tướng rút Xe — Đỏ thắng thế.' } },
        { from: 'main', after: 25, m: 'P5.2 P7.3 S4.5 X9-8 P2.2 V7.5 V7.5 P7-8', k: { 8: 'Đỏ đắc Tượng chiếm ưu.' } },
        { from: 'main', after: 30, m: 'X4-7 M7.5 X8.7 X1-4', k: { 4: 'Hai bên giằng co.' } },
        { from: 'main', after: 30, m: 'P7/4 M7.5 P7-3 P2-3 S6.5 X1-4', k: { 6: 'Quân Đen chiếm yếu đạo — đủ bù tàn Tượng.' } },
        { from: 'main', after: 35, m: 'B5.1 P7-5 V7.5 X8.7', k: { 4: 'Đỏ tất đoạt lại quân — thế thắng trong tầm tay.' } },
        { from: 'main', after: 41, m: 'X1-4 X6.2 Tg4.1 X8.8 Tg4/1 X8-7', k: { 6: 'Đen hạn hữu cách phòng ngự — rơi vào thế kém.' } },
        { from: 'main', after: 44, m: 'X8.7 M3.4 X8-6 X1-4', k: { 1: 'Gấp công…', 4: '…Đỏ gượng ép, ngược lại bất lợi.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 44, t: 'Khéo Dùng Ngừng Ngắt',
      s: 'Trung Pháo quá hà Xe đối Phản Cung Mã: Đỏ vươn Pháo quá hà khi trung lộ Đen đã vững — thiếu mục tiêu. Đen bổ Tượng, rồi Pháo tiến đánh Mã dẫn dụ Xe Đỏ, thoái Pháo một nước ám phục sát thủ; Pháo trái đánh lên Chốt dọa nổ Tượng đáy và đánh chết Xe — cánh phải Đỏ rơi vào khốn cuộc.',
      c: `<p>Đỏ dùng sách lược tấn công nhanh: tiến Chốt 7 rồi quá hà Xe; Đen bổ Sĩ củng cố — thỏa đáng. Đỏ <strong>tiến Pháo quá hà</strong> khi trung lộ Đen đã được tăng cường — không sáng suốt, dẫn đến nghi hình (khá tốt: Pháo bình 7).</p>
<p>Đen bổ Tượng; Đỏ bình Xe đè Mã quán triệt "cướp tiên". Đen <strong>Pháo tiến đánh Mã</strong> dẫn dụ Đỏ cao Xe biên; Pháo <strong>một tiến một thoái</strong> — nhạy bén, ám phục sát thủ. Pháo trái Đen đánh lên Chốt: ngoài nổ Tượng đáy còn có nước ác đánh chết Xe — cánh phải Đỏ bị tấn công, rơi vào khốn cuộc.</p>
<h2>Bài học</h2>
<p>Phản kích của Đen đặc sắc ở chỗ khéo vận Pháo ở hai nước "ngừng ngắt" — nếu trực tiếp thoái Pháo thì không đủ thú vị, bỏ lỡ cơ hội nhanh chóng chiếm ưu.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 B7.1 B7.1 X2.6 S4.5 P8.4 V3.5 X2-3 X9.2 M8.7 X1-4 B3.1 P6.5 X9.2 P6/6 B3.1 P6-7 X3-4 P7.3 B9.1 P7.5 S4.5 X9-8',
      k: {
        10: 'Bổ Sĩ củng cố — thỏa đáng.',
        11: 'Tiến Pháo khi trung lộ Đen đã vững — dẫn đến nghi hình (khá tốt: Pháo bình 7).',
        13: 'Bình Xe đè Mã — quán triệt "cướp tiên".',
        17: 'Nguy hiểm cận kề mà Đỏ không hay biết.',
        18: 'Tiến Pháo đánh Mã — dẫn dụ Xe Đỏ!',
        20: 'Một tiến một thoái — nhạy bén, ám phục sát thủ!',
        24: 'Ngoài nổ Tượng đáy còn có nước ác đánh chết Xe — Đỏ khó ứng phó.',
        28: 'Cánh phải Đỏ bị tấn công — rơi vào khốn cuộc.',
      },
      h: { 24: 'p129_0' },
      v: [
        { from: 'main', after: 10, m: 'P8-7 V3.5 X2-3 X9.2 M8.9 P2.4 B5.1', k: { 7: 'Công thủ phức tạp, Đỏ vẫn duy trì tiên thủ.' } },
        { from: 'main', after: 12, m: 'P8-5 M3.5 P5.4 X9-8 X2.3 M7/8', k: { 6: 'Đỏ cũng vô vị.' } },
        { from: 'main', after: 16, m: 'P8-5 P6.5 X9-8 M3.5 P5.4 M7.5 X3-5 P6/5 S6.5 X4.6', k: { 10: 'Song Mã Đỏ bị khắc chế — không lạc quan.' } },
        { from: 'main', after: 19, m: 'X4.7 B3.1 X4-3 X9-7 P6-3 M3.2', k: { 1: 'Khó tránh vụng về…', 6: '…Đỏ phế quân đoạt thế, lạc quan.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 45, t: 'Đất Bằng Dậy Sấm',
      s: 'Trung Pháo thúc Chốt 3 đối Phản Cung Mã hoành Xe: Đỏ quất ngựa tiến lên dọa Chốt giữa — xem nhẹ sức phản kích. Đen Pháo nổ Sĩ đáy như đất bằng dậy sấm: Đỏ phi Tượng thì Đen lời một Sĩ; Đỏ Xe kỵ hà thì Đen tặng Chốt 7 tinh xảo; Đỏ liều mạng Xe kề Mã thì Đen phế quân mãnh công, "nhị quỷ phách môn" tuyệt sát.',
      c: `<p>Đỏ <strong>thúc Chốt 3</strong> khắc chế Mã lộ 7 Đen, phá kết cấu Pháo Mã. Đen <strong>khởi hoành Xe</strong> — dùng tốc độ xuất quân bù điểm yếu Mã trái (thường gặp nhất: Chốt 3 tiến).</p>
<p>Đỏ <strong>quất ngựa tiến lên</strong> dọa Chốt giữa, ép Đen bổ Sĩ hoặc Tượng — suy nghĩ đơn phương, xem nhẹ sức phản kích (chính xác: Mã biên hoặc Chốt 7). Đen <strong>Pháo nổ Sĩ đáy</strong> — hung hãn, "đất bằng dậy sấm". Đỏ có 3 cách:</p>
<ul>
<li><strong>Phi Tượng</strong> (mạch chính): hoảng loạn; Đen lời một Sĩ, Pháo đáy an toàn thoái lui; Pháo nằm hiểm địa "hữu kinh vô hiểm" — Đen hơn Sĩ, có cơ hội thắng.</li>
<li><strong>Xe kỵ hà</strong>: tích cực. Đen <strong>phế Chốt 7</strong> dẫn dụ Xe vào vòng vây — tâm bình khí hòa, chủ lực rộng đường tiến.</li>
<li><strong>Xe kề Mã</strong> (liều mạng): Đen lập tức hành động, <strong>Pháo lại nổ Sĩ</strong> — phế quân mãnh công; song Xe xuống tuyến áp đáy: "nhị quỷ phách môn" tuyệt sát.</li>
</ul>
<h2>Bài học</h2>
<p>Tích cực chiến đấu, xuất kích đúng lúc — Pháo nổ Sĩ đáy kịp thời cho thấy cái nhìn nhạy bén về hình trận, tổ hợp chiến thuật đặc sắc.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 B3.1 X9.1 M3.4 P6.7 V3.1 P6/3 M8.9 X9-4 X2-4 P6-3 P8.4 P3/2 M4.5 M7.5 P8-5 M3.5 P5.4 P3-5 S6.5 X4.2 X4.6 P2.1 B5.1 X4-5 X4-5 P2-5 B5.1 P5/2 X9-8 X1.2',
      k: {
        7: 'Thúc Chốt 3 khắc chế Mã lộ 7 — phá kết cấu Pháo Mã.',
        8: 'Khởi hoành Xe — dùng tốc độ xuất quân bù điểm yếu.',
        9: 'Quất ngựa dọa Chốt giữa — suy nghĩ đơn phương (chính xác: Mã biên hoặc Chốt 7).',
        10: 'Pháo nổ Sĩ đáy — đất bằng dậy sấm! Đỏ: phi Tượng, Xe kỵ hà hay Xe 2 tiến 7?',
        11: 'Hoảng loạn bay Tượng.',
        12: 'Lời trắng một Sĩ — Pháo đáy an toàn thoái lui (nếu Đỏ dùng Tướng khử Pháo thì Đen bình Xe lấy lại quân ngay).',
        16: 'Pháo nằm hiểm địa — hữu kinh vô hiểm.',
        19: 'Gửi hy vọng vào không đầu Pháo.',
        24: 'Hay!',
        29: 'Bắt buộc.',
        36: 'Đen hơn Sĩ, có cơ hội thắng cờ.',
      },
      h: { 10: 'p130_0' },
      v: [
        { from: 'main', after: 7, m: 'B3.1', k: { 1: 'Thường gặp nhất — hạn chế Mã lẫn nhau.' } },
        { from: 'main', after: 8, m: 'M8.9', k: { 1: 'Chính xác.' } },
        { from: 'main', after: 9, m: 'V3.5 M4.5 M3.5 P5.4', k: { 4: 'Hoành Xe quá cung bị cản trở — nhưng đó chỉ là suy nghĩ đơn phương của Đỏ.' } },
        { from: 'main', after: 12, m: 'M4.6 X9-3', k: { 2: 'Đỏ không có thủ đoạn tiếp — Đen dễ chơi.' } },
        { from: 'main', after: 18, m: 'M9.7 X4.4 M7.6 S4.5', k: { 4: 'Cũng là Đen ưu.' } },
        { from: 'main', after: 28, m: 'Tg5-4 X4-5 X4.3 Tg5.1', k: { 4: 'Phục Xe bình 6 đổi Xe — Đỏ khó thành đại cuộc.' } },
        { from: 'main', after: 10, m: 'X2.5 B7.1 X2-3 X9-6 M4/3 P6/3 X3-6 V3.5 B3.1 B3.1 X6.1 V5.7 X6-7 X1-3 X7/1 V7/5 X7.1 P6/3 X7/2 P6.4', k: { 1: 'Xe kỵ hà — tạo cục diện phức tạp, khá tích cực.', 2: 'Cờ hay! Phế Chốt dẫn dụ Xe vào vòng vây.', 5: 'Bắt buộc.', 20: 'Đen tâm bình khí hòa — chủ lực rộng đường tiến.' } },
        { from: 6, after: 14, m: 'M4.6 P6-4 Tg5-6 V7.9 X3.1 X6-4', k: { 6: 'Đen hơn song Sĩ — hứa hẹn thắng lợi.' } },
        { from: 'main', after: 10, m: 'X2.7 X9-6 M4.5 V3.5 M5.7 P6-4 Tg5-6 X6.8 Tg6.1 X6/1 Tg6/1 X1-3 X2-3 X3.2 X3/1 X3-4 Tg6-5 P2.7 X9-8 X4.6', k: { 1: 'Liều mạng — cục diện lên vách treo dốc đứng.', 2: 'Không thể chậm trễ!', 4: 'Không tiện đạp Mã.', 6: 'Phế quân — Pháo lại nổ Sĩ!', 12: 'Bình Xe tróc Mã — lấy lại quân.', 18: 'Một nước ấn định cuộc cờ.', 20: '"Nhị quỷ phách môn" — tuyệt sát, Đen thắng.' } },
        { from: 7, after: 11, m: 'P6/3 M4.5', k: { 2: 'Đỏ đoạt thế chiếm ưu.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 46, t: 'Tay Năm Tay Mười',
      s: 'Trung Pháo đối Phản Cung Mã: Đen bổ Tượng trì hoãn, để Đỏ thúc Chốt 7 thành "lưỡng đầu xà" vững chắc. Đỏ Mã biên thì thiếu lực, tháo Pháo thì hơi ưu; Mã phải bàn hà rồi Mã trái lên chính diện — phối trí cực hài hòa, Đen rất bị động.',
      c: `<p>Đen <strong>bổ Tượng</strong> — trì hoãn, lơ là kế hoạch của Đỏ (chính xác: Chốt 3 tiến). Đỏ <strong>thúc Chốt 7</strong> thành "lưỡng đầu xà" vững chắc, hai cánh cùng tiến. Đỏ có 3 cách:</p>
<ul>
<li><strong>Mã phải bàn hà</strong> (mạch chính): hùng cứ bờ sông, khống chế yếu đạo, yểm hộ Mã trái lên chính diện; Xe sáng Mã linh hoạt — tiềm lực công kích lớn. Đen đổi Chốt đã muộn: Đỏ nhảy Mã, Pháo nổ Chốt giữa — ưu thế lớn; Đen tiến Pháo chặn Mã thì Đỏ dĩ dật đãi lao, khéo tặng Chốt giữa, <strong>thoái Mã</strong> ép Đen vào khốn cảnh.</li>
<li><strong>Mã trái quăng biên</strong>: không phát huy hết "lưỡng đầu xà"; Đen phản kích chính xác, phong tỏa cánh trái rồi ép đổi Xe — Đen hài lòng.</li>
<li><strong>Tháo Pháo</strong> điều chỉnh, bảo lưu Mã trái lên chính diện; Đen đổi Chốt thông đường Mã — bình ổn, Đỏ hơi ưu.</li>
</ul>
<h2>Bài học</h2>
<p>Đen xem nhẹ tầm quan trọng của việc linh hoạt Mã ở giai đoạn bố cục.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 B3.1 V3.5 B7.1 S4.5 M3.4 X1-4 M8.7 P2.4 P8-9 P2-3 X9-8 B7.1 B3.1 V5.7 M4.5 M3.5 P5.4 P6-5 P5/1 M7.5 B5.1',
      k: {
        8: 'Bổ Tượng — trì hoãn (chính xác: Chốt 3 tiến).',
        9: '"Lưỡng đầu xà" vững chắc. Đỏ: Mã biên, tháo Pháo hay Mã phải bàn hà?',
        11: 'Mã phải hùng cứ bờ sông — khống chế yếu đạo!',
        13: 'Mã trái lên chính diện — phối trí cực tốt.',
        17: 'Xe sáng Mã linh hoạt — tiềm lực công kích lớn. Đen: Chốt 7 tiến hay Pháo tiến 2?',
        18: 'Đổi Chốt linh hoạt Mã — đã muộn.',
        21: 'Quân Đỏ chiếm vị trí tốt — đủ sức tổng tấn công.',
        24: 'Không có nước khác.',
        27: 'Tiếp theo Xe tiến 3, Xe tiến 6… — Đỏ ưu thế lớn.',
      },
      h: { 10: 'p134_0', 17: 'p135_0' },
      v: [
        { from: 'main', after: 7, m: 'B3.1', k: { 1: 'Chính xác.' } },
        { from: 'main', after: 10, m: 'M8.9 X1-4 P8-7 X4.7 P7/1 X4-2 S6.5 X9-8 X2.9 M7/8 P5-4 B9.1 V7.5 X2/3', k: { 1: 'Mã trái quăng biên — không đủ lực.', 4: 'Phản kích chính xác.', 6: 'Phong tỏa cánh trái Đỏ.', 8: 'Ép đổi Xe phải — Đỏ không kiếm được lợi.', 14: 'Hình trận Đen ổn chắc, đủ hài lòng.' } },
        { from: 1, after: 13, m: 'X4.5 X9-8 X4-3 P7.1 P2.5 X8.2 X3.1 X8.7 M3/2 M9.7 M2.3 X2.6', k: { 12: 'Đỏ xuất quân trước chiếm quyền chủ động.' } },
        { from: 1, after: 14, m: 'P7.4 X4/2', k: { 2: 'Đỏ thất tiên.' } },
        { from: 'main', after: 10, m: 'P5-4 B3.1 B7.1 V5.3 M8.7 V3/5 M3.4 P6.5 P8-4 M3.2 V7.5 X1-3 S6.5', k: { 1: 'Tháo Pháo điều chỉnh, bảo lưu Mã trái lên chính diện.', 2: 'Đổi Chốt thông đường Mã phải.', 13: 'Cục thế bình ổn — Đỏ hơi ưu.' } },
        { from: 4, after: 11, m: 'X1-4 M8.7', k: { 2: 'Xe Đen không có vị trí đẹp.' } },
        { from: 'main', after: 23, m: 'V7/5 P5-9', k: { 2: 'Đen càng khó ứng phó.' } },
        { from: 'main', after: 17, m: 'P6.2 S6.5 X4.5 B5.1 X4-5 M4/3 P6-5 X8.7 M3/4 P9.4', k: { 1: 'Tiến Pháo chặn Mã — tạm trì hoãn thế công.', 2: 'Dĩ dật đãi lao.', 4: 'Khéo tặng Chốt giữa — mở rộng thế công.', 6: 'Hay!', 7: 'Bắt buộc — Đen rơi vào khốn cảnh.', 10: 'Thế công Đỏ như sóng lớn — hứa hẹn thắng lợi.' } },
        { from: 7, after: 21, m: 'X4-3 M7.5 X3-4 X8.3 X4.1 B5.1 X4-5 B5-4', k: { 8: 'Đỏ đại ưu.' } },
        { from: 7, after: 23, m: 'X5-3 M7.5 X3/1 P9-7', k: { 4: 'Đen khó tránh mất quân.' } },
        { from: 7, after: 23, m: 'P6/2 M7.5 X5-4 M5.4', k: { 4: 'Đen khó tránh mất quân.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 47, t: 'Hành Động Khinh Suất',
      s: 'Ngũ Thất Pháo chậm ra Xe đối Phản Cung Mã: Đen tùy tiện đổi Chốt khi hậu phương mỏng yếu. Đỏ chỉ huy Xe quá hà đánh trúng yếu hại: Đen bình Pháo điều chỉnh thì Đỏ đổi Chốt, Xe bình 3 nhẹ nhàng chiếm ưu; Đen nhảy Mã phản kích thì Đỏ phế Chốt rồi Xe chém Pháo như sấm nổ giữa trời quang.',
      c: `<p>Đỏ tranh thúc Chốt 3 rồi Mã trái lên biên — thế <strong>Ngũ Thất Pháo chậm ra Xe</strong>; hai bên đấu tranh về hình cờ và vị trí. Đen thăng Xe tuần hà (tất phải đi). Đỏ Pháo đánh Chốt ổn chắc.</p>
<p>Đen <strong>đổi Chốt linh hoạt Mã</strong> — tự nhiên nhưng hình trận không ổn chắc (chính xác: Tượng tiến bổ trước). Đỏ <strong>chỉ huy Xe quá hà</strong> — đánh trúng yếu hại! Đen có 2 cách:</p>
<ul>
<li><strong>Bình Pháo</strong> (mạch chính): Đỏ đổi Chốt, mượn thủ đoạn đơn giản <strong>Xe bình 3</strong> nhẹ nhàng — hơn Chốt, vị trí quân tốt.</li>
<li><strong>Nhảy Mã phản kích</strong>: Đỏ có diệu thủ — <strong>phế Chốt</strong> dẫn dụ Xe Đen chuyển vị rồi <strong>Xe chém Pháo</strong>, như sấm nổ giữa trời quang. Đen tiến Xe thì Đỏ thoái Pháo, thế công Đen tiêu tan; Đen thoái Xe thì Đỏ cưỡng đoạt một quân, Mã trái nhảy ra — hứa hẹn thắng lợi.</li>
</ul>
<h2>Bài học</h2>
<p>Đen nôn nóng đổi Chốt mà không ý thức điểm yếu tiềm ẩn trong hình trận — nguyên nhân chủ yếu dẫn đến bất lợi.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 B3.1 M8.7 M8.9 X9-8 P8-7 X1-2 X9-8 P2.4 B7.1 X8.4 X1-2 X8-4 P7.4 B7.1 X2.6 P6-4 B3.1 X4-7 X2-3 X7/1 P7-3 V7.5 M3.4',
      k: {
        7: 'Mã trái lên biên — Ngũ Thất Pháo chậm ra Xe.',
        8: 'Xuất trực Xe — một trong những lựa chọn chủ yếu.',
        14: 'Thăng Xe tuần hà — thế tất phải đi.',
        17: 'Đánh Chốt mưu thực lợi — ổn chắc.',
        18: 'Đổi Chốt linh hoạt Mã — hình trận không ổn chắc (chính xác: phi Tượng trước).',
        19: 'Xe quá hà — đánh trúng chỗ yếu hại! Đen: Pháo bình 4 hay Mã 7 tiến 6?',
        23: 'Hay!',
        27: 'Đỏ hơn Chốt, vị trí quân khá tốt — rõ ràng ưu.',
      },
      h: { 19: '!p137_0' },
      v: [
        { from: 'main', after: 9, m: 'V3.5 X9-8 P2-1 B7.1 S4.5 X1-2 X8.9 M3/2 X1-4 P5-3', k: { 10: 'Đỏ chủ động.' } },
        { from: 'main', after: 13, m: 'V3.5 X1-2 X8.9 M3/2 P2-3 P5.4 S6.5 X8.9', k: { 8: 'Song Mã Đen bị khắc chế — Đỏ hơn Chốt chiếm ưu.' } },
        { from: 'main', after: 16, m: 'X2.6 P6-4 S6.5 V3.5 X2-3 P2/3', k: { 6: 'Hai bên giằng co, kiêng dè nhau.' } },
        { from: 'main', after: 17, m: 'V3.5', k: { 1: 'Bổ trước một nước — chính xác.' } },
        { from: 'main', after: 19, m: 'B7.1 X2-3 M7/9 X3/2', k: { 4: 'Đỏ nắm chắc ưu thế.' } },
        { from: 'main', after: 21, m: 'P4.7 X8.2', k: { 2: 'Đánh Sĩ chưa chín muồi — Đen không có thủ đoạn tiếp.' } },
        { from: 'main', after: 19, m: 'M7.6 B7.1 X4-3 X8.3 X2.6 P7.3 S4.5 P7/4 B7.1 X2-4 M6.4 X4-3 M4.6 P7/4', k: { 1: 'Nhảy Mã mưu phản kích.', 3: 'Phế Chốt dẫn dụ Xe Đen chuyển vị…', 4: '…rồi Xe chém Pháo — sấm nổ giữa trời quang! Đen: Xe 2 tiến 6 hay Xe 3 lui 1?', 14: 'Thế công Đen tiêu tan — Đỏ thắng thế.' }, h: { 4: 'p138_0' } },
        { from: 6, after: 23, m: 'B7.1 X8.6 M3/2 X2-5 S4.5 X5/1', k: { 6: 'Đen khó tránh mất quân.' } },
        { from: 6, after: 23, m: 'X3/1 X8.6 M3/2 X2-4 P6-3 X4/1 P3.7 S6.5 X3.4 S5.6 X3-4 M9.7', k: { 6: 'Đỏ không bỏ lỡ thời cơ cưỡng đoạt một quân.', 12: 'Mã trái nhảy ra — Đỏ hứa hẹn thắng lợi.' } },
        { from: 8, after: 31, m: 'P3-1 S5.6 X3.6 Tg5.1 X3/4 V3.1', k: { 6: 'Đỏ cũng ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 48, t: 'Hoa Nở Trung Tâm',
      s: 'Trung Pháo xông Chốt giữa đối Phản Cung Mã hoàn Trung Pháo: Đen nhảy Mã trái lên hà "cực kỳ tự nhiên" — hình trận chênh vênh. Đỏ xông Chốt giữa: Đen đổi Chốt thì Đỏ hiến Mã tuyệt diệu; Đen Pháo đánh Chốt giữa thì sau mấy hồi Đỏ vẫn ưu thế áp đảo — thị phạm tấn công trung lộ.',
      c: `<p>Đỏ <strong>cấp tiến Chốt giữa</strong> — tấn công nhanh; Đen hoàn Trung Pháo tuy mất một tiên nhưng kìm hãm trực tiếp thế công — mỗi bên có cái được riêng. Đỏ chỉ huy Xe quá hà; Đen <strong>nhảy Mã trái lên hà</strong> "cực kỳ tự nhiên" — không cam yếu thế nhưng dẫn tới tổ hợp chiến thuật có lực của Đỏ (ổn chắc: Xe 9 tiến 2).</p>
<p>Đỏ <strong>xông Chốt giữa</strong>. Đen có 2 cách:</p>
<ul>
<li><strong>Đổi Chốt</strong> (mạch chính): Đỏ <strong>hiến Mã</strong> — tuyệt diệu, quyết đoán giàu tinh thần tiến thủ; Đen lập tức rơi vào khốn cảnh — Pháo trùng, Xe bình 7… Đen khó chống đỡ.</li>
<li><strong>Pháo đánh Chốt giữa</strong>: tạm xoa dịu thế công; Đen Mã định đạp Trung Pháo Đỏ. Qua mấy hồi, Đỏ khống chế toàn tuyến — ưu thế áp đảo.</li>
</ul>
<h2>Bài học</h2>
<p>Đen đánh giá thấp uy lực tiềm tàng của thế công Đỏ. Cấu tứ đột phá mạnh mẽ và tổ hợp chiến thuật có lực — thị phạm kinh điển của tấn công trung lộ.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 B5.1 P6-5 M8.7 B7.1 X2.6 M7.6 B5.1 B5.1 M7.5 M6.5 P5.3 S4.5 M3.5',
      k: {
        7: 'Cấp tiến Chốt giữa — sách lược tấn công nhanh.',
        8: 'Hoàn Trung Pháo — mất một tiên nhưng kìm hãm trực tiếp.',
        12: 'Nhảy Mã trái lên hà — chênh vênh, mối nguy ngầm (ổn chắc: Xe 9 tiến 2).',
        13: 'Xông Chốt giữa! Đen: đổi Chốt hay Pháo tiến 2?',
        15: 'Hiến Mã — tuyệt diệu! Đen lập tức rơi vào khốn cảnh.',
        19: 'Tiếp theo Xe bình 7, Pháo bình 5… — Đen khó chống đỡ.',
      },
      h: { 13: 'p140_0' },
      v: [
        { from: 'main', after: 11, m: 'X9.2', k: { 1: 'Khá ổn chắc.' } },
        { from: 'main', after: 15, m: 'P5.4 M3.5 M6.5 P5.3 X9.2 P8-5', k: { 6: 'Đỏ phế quân cướp công — thế công không đầu Pháo mạnh mẽ.' } },
        { from: 'main', after: 13, m: 'P5.2 M3.5 P5.3 P8-5 M6.4 X9-8 X1-2 M5.6 M4.5 V3.5 X9.2 X8.6', k: { 1: 'Pháo đánh Chốt giữa — tạm xoa dịu.', 3: 'Chỉ đành như vậy.', 6: 'Mục đích đạp Trung Pháo Đỏ.', 12: 'Đỏ chiếm ưu thế áp đảo.' } },
        { from: 2, after: 15, m: 'M6.5 P5.3 B5.1 M7.5', k: { 4: 'Thế trận Đen lỏng lẻo, càng khó phòng thủ.' } },
        { from: 2, after: 17, m: 'M6.7 P5/1 S4.5 X9-8 X1-2 X8.6', k: { 6: 'Chủ lực Đỏ khống chế toàn tuyến — thế công căng thẳng.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 49, t: 'Bình Xe Chuyển Mình',
      s: 'Ngũ Lục Pháo đối Phản Cung Mã tả hoành Xe: Đỏ thăng Xe tuần hà, mượn tiên mời đổi Chốt 3 — vùi đầu vào kế hoạch mà không chú ý. Đen bình Xe chuyển mình bất ngờ, phản khách vi chủ: Đỏ đổi Chốt thì bị động; Đỏ tiến Xe ngoan cường thì vẫn hạ phong.',
      c: `<p>Đen dùng <strong>tả hoành Xe</strong> chống Ngũ Lục Pháo — bình Xe chiếm sườn uy hiếp cánh trái Đỏ (thường gặp hơn: Xe 1 bình 2 thành thế thịnh hành). Đỏ xuất Xe hơi chậm (Xe 9 bình 8 có kiềm chế hơn).</p>
<p>Đỏ <strong>thăng Xe tuần hà</strong>, mượn nước tiên nhảy Mã đánh Xe mời đổi Chốt 3 — kế hoạch sai lầm, tạo khiếm khuyết (nên Xe tiến 6). Đen <strong>bình Xe chuyển mình</strong> — Đỏ không kịp dự liệu; phản khách vi chủ. Đỏ có 2 cách:</p>
<ul>
<li><strong>Đổi Chốt</strong> (mạch chính): bị động; Đỏ phải trốn Xe; chủ lực Đen phát huy hết năng lực — ưu rõ ràng.</li>
<li><strong>Tiến Xe một nước</strong> — ngoan cường; Đen phi Tượng, nhảy Mã; Đỏ phế Chốt qua sông lý trí, nhảy Mã hà khẩu cố kiềm chế — nhưng cờ Đỏ vẫn hạ phong, Đen lạc quan.</li>
</ul>
<h2>Bài học</h2>
<p>Đổi Chốt khai thông đường Mã có ý nghĩa tích cực nhưng vẫn phải nắm thời cơ. Bình Xe chuyển mình không tinh diệu mấy nhưng phá tan kế hoạch của đối phương.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 P8-6 X9.1 M8.7 X9-4 S4.5 X1-2 B7.1 B7.1 X2.4 M7.6 B3.1 X4-7 B3.1 X7.3 X2/2 V3.5 X9-8 P2.4',
      k: {
        8: 'Tả hoành Xe — bình Xe chiếm sườn uy hiếp cánh trái Đỏ.',
        12: 'Hơi chậm (nên Xe 9 bình 8).',
        15: 'Thăng Xe tuần hà, mượn tiên mời đổi Chốt — kế hoạch sai lầm (nên Xe tiến 6).',
        18: 'Bình Xe chuyển mình — Đỏ không kịp dự liệu! Đen phản khách vi chủ. Đỏ: Chốt 3 tiến hay Xe tiến 1?',
        19: 'Trực tiếp đổi Chốt — bị động.',
        21: 'Tránh Xe Đen đoạt quân — chỉ đành trốn Xe.',
        24: 'Chủ lực Đen phát huy hết năng lực — ưu rõ ràng.',
      },
      h: { 18: '!p142_0' },
      v: [
        { from: 'main', after: 7, m: 'X1-2 M8.7 P2-1 B7.1 B7.1', k: { 5: 'Thế trận thịnh hành.' } },
        { from: 'main', after: 12, m: 'X9-8 B7.1 X2.6', k: { 3: 'Đỏ tiên thủ.' } },
        { from: 'main', after: 14, m: 'X2.6', k: { 1: 'Vẫn là cục diện mỗi người một vẻ.' } },
        { from: 'main', after: 18, m: 'X2.1 V3.5 B3.1 M6.7 X2.2 S4.5 X9-8 X7.3 M7.6 M7.5 V3.5 P2.5 S5/4 B3.1 B7.1 X7-3', k: { 1: 'Tiến Xe một nước — ngoan cường.', 5: 'Phế Chốt qua sông — khá lý trí.', 9: 'Nhảy Mã hà khẩu — cố kiềm chế.', 13: 'Bắt buộc — giải trừ uy hiếp Pháo bình 5.', 16: 'Cờ Đỏ hạ phong — Đen lạc quan.' } },
        { from: 3, after: 18, m: 'V3.1 B7.1 X2-3 X7.4 V1.3 P2-1', k: { 6: 'Đen cũng phản tiên.' } },
        { from: 3, after: 24, m: 'B3-2 M7/6 X9-8 P2.4 V3.1 X7.5', k: { 6: 'Đen ưu thế áp đảo.' } },
        { from: 3, after: 26, m: 'X8.6 B3.1 B7.1 X7-3', k: { 4: 'Đen chiếm thế chủ động.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 50, t: 'Từng Bước Lấn Tới',
      s: 'Ngũ Lục Pháo đối Phản Cung Mã hoành Xe quá cung: Đen tiến Xe phản kích quá nóng vội. Đỏ thăng Xe tuần hà hàm súc: Đen nhảy Mã thì Đỏ mời đổi Chốt, Mã hà khẩu, bình Pháo cánh bên rồi phế Xe chém Pháo; Đen xuất Xe phải thì Đỏ đổi Chốt, chiến thuật bức ép — thế công lăng lệ.',
      c: `<p>Đen <strong>xuất hoành Xe</strong>, bình Xe quá cung kiềm chế Pháo Sĩ giác Đỏ — một biến chủ yếu chống Ngũ Lục Pháo. Đen <strong>tiến Xe phản kích</strong> quá nóng vội — Pháo cánh phải bị kiềm chế, hình trận nhiều mối nguy (nên Xe 1 bình 2 xuất chủ lực trước).</p>
<p>Đỏ <strong>thăng Xe tuần hà</strong> — hàm súc có lực. Đen có 2 cách:</p>
<ul>
<li><strong>Nhảy Mã</strong> (mạch chính): Đỏ <strong>mời đổi Chốt</strong> — chiến thuật cơ bản; Mã hà khẩu nhắm cánh trái mỏng; <strong>bình Pháo công kích cánh bên</strong> nhân lúc rảnh rỗi; cuối cùng <strong>phế Xe chém Pháo</strong> hung hãn — xé toang phòng tuyến, thế như chẻ tre.</li>
<li><strong>Xuất Xe phải</strong>: Đỏ mời đổi Chốt 3 (vẫn hiệu quả nhất), nhảy Mã bức ép; Đen thoái Xe tuyến Chốt cố vật lộn. Đỏ tiến Xe, nhảy Mã — thế công lăng lệ, Đen khó ngăn.</li>
</ul>
<h2>Bài học</h2>
<p>Đen tiến Xe ở hồi 7 — nước xuất kích không thỏa đáng — để lại điểm yếu ngầm; Đỏ thăng Xe tuần hà và loạt thủ đoạn sau đó khiến nó càng hiện rõ.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 P8-6 X9.1 M8.7 X9-4 S4.5 B7.1 X9-8 X4.5 X2.4 M7.6 B3.1 B7.1 X2-3 X4-3 M3.4 B3.1 P5-3 V7.9 P3-2 P6-8 P6-4 M6.4 X8.7 P8-2 P2.7 V9/7 X3.5 X3.1 V3.5 X3/1 X3/1 S6.5 P4-2',
      k: {
        10: 'Xuất hoành Xe — bình Xe quá cung kiềm chế Pháo Sĩ giác.',
        14: 'Tiến Xe phản kích quá nóng vội (nên Xe 1 bình 2).',
        15: 'Thăng Xe tuần hà — hàm súc có lực. Đen: Mã 7 tiến 6 hay Xe 1 bình 2?',
        17: 'Đổi Chốt linh hoạt Mã — chiến thuật cơ bản phát triển thế trận.',
        20: 'Bình Xe sát Chốt — kiềm chế nhất định.',
        21: 'Hay!',
        22: 'Thúc Chốt phòng Mã xâm nhập — tạm hóa giải.',
        23: 'Nhân lúc rảnh rỗi bình Pháo công kích cánh bên — Đen không chỗ thả lỏng!',
        28: 'Tiến Mã quyết chiến — vạn bất đắc dĩ.',
        29: 'Phế Xe chém Pháo — xé toang phòng tuyến, thế như chẻ tre!',
        39: 'Trước sát chiêu Pháo trước bình 1 — Đen chỉ đành ngồi chờ.',
      },
      h: { 15: 'p143_0' },
      v: [
        { from: 'main', after: 7, m: 'X1-2 M8.7 P2-1 B7.1 B7.1', k: { 5: 'Thế trận thịnh hành.' } },
        { from: 'main', after: 13, m: 'X1-2', k: { 1: 'Xuất chủ lực trước — hợp lý hơn.' } },
        { from: 'main', after: 14, m: 'X2.6 X1.2 X2-3 P6/1', k: { 1: 'Xâm nhập tuyến Chốt…', 4: '…Đen có thủ đoạn phản kích, Đỏ khó đạt hiệu quả.' } },
        { from: 'main', after: 21, m: 'X3/1 V7.9 X3-6 X3-4 P6.3 X8.7 X1.2 X8/3 P6-8 X8-4 P8.4 S5/4 M6/7 M7.6', k: { 14: 'Nước tiên Đỏ khá lớn.' } },
        { from: 'main', after: 23, m: 'P6-7 X8.7 P7-2 P3.7 S6.5 P6-2 M6/8 P3-1', k: { 8: 'Đỏ cũng có thể công mạnh.' } },
        { from: 'main', after: 27, m: 'M6/8 X3.2 P8.5 X8.7 P8-3 X8-7', k: { 6: 'Hình trận Đen tán loạn.' } },
        { from: 'main', after: 15, m: 'X1-2 B3.1 B7.1 X2-3 P6/1 M3.4 X4/3 X3.1 P6-7 X3-6 X4.1 M4.6 M7/5 X8.6 P7.2 B5.1', k: { 1: 'Xuất Xe cánh phải.', 2: 'Mời đổi Chốt 3 — vẫn hiệu quả nhất.', 7: 'Nhảy Mã xuất kích — chiến thuật bức ép.', 8: 'Thoái Xe tuyến Chốt cố vật lộn.', 9: 'Hay!', 16: 'Thế công lăng lệ — Đen khó ngăn cản.' } },
        { from: 6, after: 16, m: 'B7.1 X4-3 B3.1 P2.3', k: { 4: 'Đen có cơ hội giằng co.' } },
        { from: 6, after: 17, m: 'M7.6 X8.5', k: {} },
        { from: 6, after: 21, m: 'X4/1 B7.1 X4-3 V7.9 X3/1 M7.6 S4.5 M4.6', k: { 8: 'Đỏ ưu thế lớn.' } },
        { from: 6, after: 23, m: 'B3.1 X3-7 X4/1 M4.6 X4.2 X7.2', k: { 6: 'Đỏ cường hành sát nhân — Đen khó tránh mất quân.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 51, t: 'Hồi Mã Kim Thương',
      s: 'Ngũ Lục Pháo đối Phản Cung Mã: Đen thúc Chốt 3 không hợp thời, rồi tiến Pháo phong Xe. Đỏ hồi Mã kim thương — trong vụng về ẩn tàng khéo léo — đuổi Pháo; dù Pháo Đen lui về hà hay về tuyến Chốt, Đỏ đều phế Chốt tranh tiên, tập kết chủ lực, giành ưu thế.',
      c: `<p>Đen <strong>thúc Chốt 3</strong> — không hợp thời, tạo nghi hình (nên Pháo bình 1 mở mặt Xe, khống chế đạo Xe trái Đỏ). Đỏ xuất Xe trái; Đen <strong>tiến Pháo phong Xe</strong> — thế tất phải đi (nếu phi Tượng thì Đỏ Xe tuần hà).</p>
<p>Đỏ <strong>hồi Mã kim thương</strong> — trong vụng về ẩn tàng khéo léo; mở rộng tiên thủ, triển khai công kích (Xe tuần hà theo thói quen thì Đen phản tiên). Đen có 2 cách:</p>
<ul>
<li><strong>Pháo lui về hà</strong> (mạch chính): Đỏ <strong>phế Chốt tranh tiên</strong> — nước hay; Đen thăng Xe bảo vệ Mã bắt buộc. Hai bên chưa có quân qua sông nhưng quân Đen bị kiềm chế — thế kém.</li>
<li><strong>Pháo lui về tuyến Chốt</strong>: linh hoạt hơn chút nhưng không cải thiện cơ bản. Đỏ tiếp tục phế Chốt đột phá; Đen bổ Tượng phải tránh Pháo bình 7 — có chút cải tiến. Đỏ đổi phương án kịp thời, Xe tiến chính xác — chủ lực linh hoạt, ưu thế.</li>
</ul>
<h2>Bài học</h2>
<p>Kế hoạch tranh thúc Chốt 3 và Pháo phong Xe của Đen quá chú trọng được mất cục bộ. Thoái Mã đuổi Pháo, phế Chốt đột phá — tổ hợp chiến thuật tuyệt hay để mở thông cục diện.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 P8-6 X1-2 M8.7 B3.1 X9-8 P2.4 M7/9 P2/2 B7.1 B3.1 X2.4 B3.1 X2-7 V7.5 X7/1 X9-8 P6-7 X2.2 B3.1 X8.4 X8.4 S6.5 M3.4',
      k: {
        10: 'Thúc Chốt 3 — không hợp thời (nên Pháo bình 1).',
        12: 'Tiến Pháo phong Xe — thế tất phải đi.',
        13: 'Hồi Mã kim thương — trong vụng về ẩn tàng khéo léo! Đen: Pháo lui 2 hay lui 3?',
        15: 'Phế Chốt tranh tiên — nước hay!',
        24: 'Thăng Xe bảo vệ Mã — thực ra bắt buộc.',
        29: 'Hai bên chưa có quân qua sông nhưng quân Đen bị kiềm chế — rơi vào thế kém.',
      },
      h: { 13: 'p146_0' },
      v: [
        { from: 'main', after: 9, m: 'P2-1', k: { 1: 'Mở mặt Xe — khống chế đạo Xe trái Đỏ.' } },
        { from: 'main', after: 11, m: 'V7.5 X8.4', k: { 2: 'Đỏ thong dong — hình thế lạc quan.' } },
        { from: 'main', after: 12, m: 'X2.4 X9-8 X2-4 P6-4', k: { 4: 'Đen có thể phản tiên.' } },
        { from: 'main', after: 14, m: 'P6.5 P6.2 X2.7 P6-7', k: { 1: 'Gấp công…', 4: '…Đỏ vô vị.' } },
        { from: 'main', after: 23, m: 'M3.4 P5.4 S4.5 X8.5', k: { 4: 'Đỏ thắng nhanh.' } },
        { from: 'main', after: 13, m: 'P2/3 B7.1 B3.1 X2.4 B3.1 X2-7 V3.5 X7/1 X9-8 M9.7 X8.4 X7.3 P2/2 M7.6 P2-3 X8.9 P3.2 X8/3 P3.1 B3.1', k: { 1: 'Pháo lui về tuyến Chốt — linh hoạt hơn chút.', 2: 'Tiếp tục phế Chốt đột phá.', 7: 'Bổ Tượng phải tránh Pháo bình 7 — có chút cải tiến.', 10: 'Kịp thời thay đổi phương án tấn công.', 16: 'Chính xác.', 20: 'Chủ lực Đỏ linh hoạt — cục diện ưu thế.' } },
        { from: 5, after: 17, m: 'P6.2 X8.3 P6-2 X8-6', k: { 4: 'Đen phí công vô ích.' } },
        { from: 5, after: 22, m: 'P6-7 X2.2 B3.1 X8.4', k: { 4: 'Vị trí Pháo phải Đen đã khác nên có Mã tiến 2 phản kích.' } },
        { from: 5, after: 28, m: 'P5.4 S6.5 X8.9 P3.2 X8/3 M3.5 M6.5 P6.1', k: { 8: 'Đỏ tham Chốt giữa thì gặp phiền phức.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 52, t: 'Trực Tiếp Giành Chốt Giữa',
      s: 'Ngũ Lục Pháo đối Phản Cung Mã: Đen tranh thúc Chốt 7, tiến Pháo phong Xe, rồi nhảy Mã tùy tiện — tự làm suy yếu trung lộ. Đỏ Xe tiến tuyến Chốt dọa bình Xe tróc đôi: Đen hoàn Trung Pháo miễn cưỡng thì Đỏ diệu thủ cưỡng đoạt Chốt giữa; Đen bổ Sĩ thì Pháo Đỏ trực tiếp giành Chốt giữa.',
      c: `<p>Đen <strong>tranh thúc Chốt 7</strong> (thường Pháo bình 1), <strong>tiến Pháo phong Xe</strong> — xu thế lớn. Đen <strong>nhảy Mã</strong> ngăn Mã Đỏ lên đầu hà, yểm hộ phong tỏa — nhưng tự làm suy yếu hình cờ, trung lộ mong manh (khá tốt: Pháo bình 4).</p>
<p>Đỏ <strong>Xe trực tiếp tiến tuyến Chốt</strong>, uy hiếp bình Xe tróc đôi — chặt chẽ có lực. Đen có 2 cách:</p>
<ul>
<li><strong>Hoàn Trung Pháo</strong> (mạch chính): miễn cưỡng vì chủ lực không hài hòa. Đỏ <strong>diệu thủ Pháo tiến</strong> cưỡng đoạt Chốt giữa — cửa ngõ Đen mở toang.</li>
<li><strong>Bổ Sĩ</strong>: Đỏ <strong>Pháo trực tiếp giành Chốt giữa</strong> — giản dị có lực; hơn Chốt, chủ động.</li>
</ul>
<h2>Bài học</h2>
<p>Đỏ công kích không hoa mỹ nhưng làm đến nơi đến chốn — thủ đoạn tiến Xe quá hà trực tiếp giành Chốt giữa có giá trị thực dụng cao.</p>`,
      m: 'P2-5 M2.3 M2.3 P8-6 X1-2 M8.7 P8-6 X1-2 M8.7 B7.1 X9-8 P2.4 B7.1 M7.6 X2.6 P6-5 X2-4 M6.5 M3.5 P5.4 S6.5 S6.5 P6.5 P5-3 X4-5 V3.5 X5/1',
      k: {
        10: 'Tranh thúc Chốt 7 (thường Pháo bình 1).',
        12: 'Tiến Pháo phong Xe — xu thế lớn.',
        14: 'Nhảy Mã — tự làm suy yếu trung lộ (khá tốt: Pháo bình 4).',
        15: 'Xe tiến tuyến Chốt, dọa tróc đôi — chặt chẽ có lực! Đen: hoàn Pháo hay bổ Sĩ?',
        16: 'Hoàn Trung Pháo — miễn cưỡng.',
        23: 'Diệu thủ — cưỡng đoạt Chốt giữa!',
        27: 'Cửa ngõ Đen mở toang — Đỏ tiên thủ, viễn cảnh tốt đẹp.',
      },
      h: { 15: 'p149_0' },
      v: [
        { from: 'main', after: 9, m: 'P2-1', k: { 1: 'Thường gặp hơn.' } },
        { from: 'main', after: 13, m: 'P6-4 X2.4 P2-7', k: { 3: 'Ngăn Mã Đỏ nhảy lên — có thể đối kháng.' } },
        { from: 'main', after: 17, m: 'M6.7 M7.6', k: { 2: 'Đỏ cũng chiếm tiên.' } },
        { from: 'main', after: 15, m: 'S4.5 P5.4 M3.5 X2-5 V7.5 X5-4 M6.7 M7.6 P2.1 M6.7', k: { 1: 'Bổ Sĩ.', 2: 'Trực tiếp giành Chốt giữa — giản dị có lực!', 10: 'Đỏ hơn Chốt, chiếm quyền chủ động.' } },
      ],
      kq: 'uu-do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
