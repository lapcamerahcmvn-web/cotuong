// Nghi Hình — Chương 5: Trung Pháo đối các loại bố cục khác. Nước đi chép từ sách; lời giảng viết lại bằng lời riêng.
module.exports = {
  ch: 5, ten: 'Trung Pháo Đối Các Bố Cục Khác', level: 'trung-cap',
  y: 'Đơn Đề Mã, Quải Giác Mã, Bình Phong Mã biến thể… — các bố cục hậu thủ ít gặp hơn. Đặc điểm chung: song Mã Pháo liên hệ nhau, trung lộ chỉ một Mã phòng thủ; Mã quăng biên tùy tiện hay đổi Chốt vội vàng đều để lộ trung lộ trước Trung Pháo.',
  cuoc: [
    {
      n: 53, t: 'Đoạt Lấy Không Đầu Pháo',
      s: 'Trung Pháo đối Đơn Đề Mã: Đen tiện tay quăng Mã trái lên biên — quá ung dung, trung lộ không ai giữ. Đỏ bình Pháo 7 thì làm lỡ chiến cơ; Đỏ phế Chốt 7 đột phá, nhân lúc Đen bảo vệ quân thì Pháo nổ Chốt giữa đoạt không đầu Pháo — công thủ vẹn toàn, ưu thế lớn.',
      c: `<p>Đen <strong>quăng Mã trái lên biên</strong> — quá ung dung, không chú ý thủ đoạn công kích tiềm tàng (chính xác: bổ Sĩ củng cố trung lộ). Đỏ có 2 cách:</p>
<ul>
<li><strong>Phế Chốt 7 đột phá</strong> (mạch chính): nhất cử đánh trúng yếu hại; Đen buộc ăn Chốt. Đỏ bình Pháo, nhân lúc Đen bảo vệ quân thì <strong>Pháo nổ Chốt giữa</strong> — đoạt được <strong>không đầu Pháo</strong>. Đen hết đường lui, qua Chốt ứng chiến liều một phen; Đỏ bố trí đâu ra đó, công thủ vẹn toàn, lúc nào cũng có thủ đoạn bình trung chiếu rút — ưu thế lớn.</li>
<li><strong>Bình Pháo lộ 7</strong>: làm lỡ chiến cơ — Đen mượn tiên đánh Xe, bình Pháo Sĩ giác; hình trận ổn chắc, đối kháng hài lòng.</li>
</ul>
<h2>Bài học</h2>
<p>Ví dụ điển hình của Trung Pháo công kích Đơn Đề Mã: song Mã Pháo liên hệ nhau, khi bị Xe Đỏ kiềm chế sẽ liên lụy trung lộ — bên hậu thủ cần phòng thủ thích đáng.</p>`,
      m: 'P2-5 M2.3 M2.3 X9.1 X1-2 X9-4 B7.1 M8.9 B7.1 B3.1 P8-7 X4.1 P5.4 B3.1 P7-5 M3.2 X2.5 M2.4 P5/2 B3.1 M8.9 B3-4 X9-8 B4.1 Ps-4',
      k: {
        8: 'Quăng Mã trái lên biên — quá ung dung (chính xác: Sĩ 4 tiến 5). Đỏ: Pháo bình 7 hay Chốt 7 tiến?',
        9: 'Phế Chốt đột phá — đánh trúng yếu hại!',
        10: 'Chỉ có thể chấp nhận ăn Chốt.',
        13: 'Nhân lúc Đen bảo vệ quân — Pháo nổ Chốt giữa, đoạt không đầu Pháo.',
        14: 'Hết đường thoái thủ — qua Chốt ứng chiến, liều một phen.',
        25: 'Quân Đỏ đâu ra đó, công thủ vẹn toàn, luôn có thủ đoạn bình trung chiếu rút — ưu thế lớn.',
      },
      h: { 8: 'p151_0' },
      v: [
        { from: 'main', after: 7, m: 'S4.5', k: { 1: 'Củng cố phòng tuyến trung lộ — chính xác.' } },
        { from: 'main', after: 8, m: 'P8-7 X4.3 M8.9 B9.1 X2.6 P8-6 X9-8 X1-2 X8.6 V3.5 S4.5 S4.5', k: { 1: 'Bình Pháo lộ 7 — làm lỡ chiến cơ.', 6: 'Mượn tiên đánh Xe ép Xe Đỏ quá hà, rồi bình Pháo Sĩ giác — bố cục thành công bước đầu.', 12: 'Đỏ không thể Xe bình 7 vì Đen có Pháo tiến 1 đánh đôi Xe — Đen đối kháng hài lòng.' } },
        { from: 1, after: 10, m: 'B7.1 X4-3 P5/1 P8-6 P5-7 X3-2 M8.9 X2.3', k: { 8: 'Đỏ vô vị.' } },
        { from: 'main', after: 9, m: 'X4.2 P8-7', k: { 2: 'Tiếp theo có thủ đoạn Chốt bình 6 — Đen khó ứng phó.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 54, t: 'Sấm Giữa Trời Quang',
      s: 'Trung Pháo đối Đơn Đề Mã: Đen đổi Chốt linh hoạt đường Mã quá sớm khi trung lộ mỏng yếu. Đỏ nhảy Mã chính thì chỉ hơi ưu; Đỏ song Mã liên hoàn xuất kích như đất bằng dậy sấm, Pháo nổ Chốt giữa, phế quân cướp công — viễn cảnh tươi sáng.',
      c: `<p>Đen <strong>đổi Chốt</strong> linh hoạt đường Mã quá sớm — trung lộ mỏng yếu dễ bị công (nên bổ Sĩ một nước). Đỏ có 2 cách:</p>
<ul>
<li><strong>Mã 3 tiến 4</strong> (mạch chính): <strong>song Mã liên hoàn xuất kích</strong> — tựa đất bằng dậy sấm! Đỏ <strong>Pháo nổ Chốt giữa</strong>, phế quân cướp công — cấu tứ tinh xảo, khí độ bất phàm.</li>
<li><strong>Đổi Chốt 7</strong>: trông không chê được nhưng bỏ qua cơ hội cực tốt; cục thế bình ổn, Đỏ hơi ưu, Đen chấp nhận được.</li>
</ul>
<h2>Bài học</h2>
<p>Thông đường Mã là tư tưởng chỉ đạo của bố cục nhưng không thể thiên lệch — phòng tuyến trung lộ chưa củng cố mà vội đổi Chốt là nguyên nhân trực tiếp dẫn đến bất lợi.</p>`,
      m: 'P2-5 M2.3 M2.3 X9.1 X1-2 M8.9 M8.7 X9-4 B7.1 X4.3 B3.1 B3.1 M3.4 X4-6 M7.6 X6.1 M6.5 M3.5 P5.4 P8-6 B7.1',
      k: {
        12: 'Đổi Chốt linh hoạt đường Mã quá sớm (nên Sĩ 4 tiến 5). Đỏ: Chốt 7 tiến hay Mã 3 tiến 4?',
        15: 'Song Mã liên hoàn xuất kích — đất bằng dậy sấm!',
        19: 'Pháo nổ Chốt giữa!',
        21: 'Đỏ phế quân cướp công — viễn cảnh tươi sáng.',
      },
      h: { 12: 'p153_0' },
      v: [
        { from: 'main', after: 11, m: 'S4.5', k: { 1: 'Bổ cờ một nước — tốt hơn.' } },
        { from: 'main', after: 11, m: 'B9.1 M3.4 X4-6 P8.2 M9.8 B3.1', k: { 6: 'Đỏ dựa vị trí quân ưu việt — hình thế chủ động.' } },
        { from: 'main', after: 17, m: 'X6-3 M5.7 P8-5 X2.5 X3.1 P8.4 X3-5 P8-5', k: { 8: 'Đỏ có thế công — rõ ràng chiếm ưu.' } },
        { from: 'main', after: 12, m: 'B7.1 X4-3 M7.6 S4.5 M6.5 M3.5 P5.4 V3.5 V7.5 B9.1 X2.6 P8-6', k: { 1: 'Đổi Chốt 7 — trông không chê được nhưng bỏ qua cơ hội cực tốt.', 12: 'Cục thế bình ổn — Đỏ hơi ưu, Đen chấp nhận được.' } },
        { from: 'main', after: 12, m: 'B5.1 P8-5 M7.5 P2.4 B5.1 X4.2', k: { 6: 'Đen lập tức có thế phản kích — Đen ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 55, t: 'Không Để Ý Đến',
      s: 'Ngũ Lục Pháo Mã biên đối Bình Phong Mã: Đen nhảy Mã phải lên biên trông không sai nhưng trung lộ mỏng yếu. Đỏ phế Chốt 3 tinh diệu rồi thăng Xe tróc lại: Đen Mã bảo vệ Chốt thì Đỏ không đầu Pháo; Đen Chốt khử Mã thì Đỏ đòn phủ đầu; Đen bổ Tượng thì Đỏ Xe tuần hà "dừng Xe hỏi đường" — hơn Chốt hơn Tượng.',
      c: `<p>Đỏ nhảy Mã biên trước — né cách đi thịnh hành, so đọ thực lực. Đen <strong>nhảy Mã phải lên biên</strong> — trông không sai nhưng trực tiếp làm trung lộ mỏng yếu (ổn chắc: Mã 2 tiến 3). Đen tiến Pháo phong tỏa Xe.</p>
<p>Đỏ <strong>phế Chốt 3</strong> không chậm trễ — thủ đoạn đột phá tinh diệu; rồi <strong>thăng Xe tróc lại</strong>. Đen có 3 cách:</p>
<ul>
<li><strong>Nhảy Mã bảo vệ Chốt</strong> (mạch chính): Đỏ Pháo nổ Chốt giữa, xác lập <strong>không đầu Pháo</strong>; Đen tham khử Mã thì Đỏ diệu sát. Tướng Đen trên cao nguy cơ bốn bề.</li>
<li><strong>Chốt khử Mã rồi Pháo đánh Tượng</strong> đổi Xe: tốc độ không kịp; Đỏ đánh phủ đầu, thế công không thể cản.</li>
<li><strong>Bổ Tượng</strong>: ổn chắc nhưng Đỏ Pháo Sĩ giác quấy nhiễu, <strong>thăng Xe tuần hà — dừng Xe hỏi đường</strong>, Xe tiến tinh chuẩn — hơn Chốt hơn Tượng.</li>
</ul>
<h2>Bài học</h2>
<p>Bên hậu thủ trước tiên phải phòng thủ trung lộ; chỉ một Mã giữ trung lộ thường không đáng tin. Đỏ công kích chính xác, tiết tấu rõ ràng — hình mẫu kinh điển của công kích nghi hình.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 M8.9 B7.1 P8-6 M2.1 X9-8 X1-2 X1-2 P8.4 B3.1 B7.1 X8.4 B7.1 X8-3 M7.6 P5.4 P2-8 P6.5 Tg5.1 X3.4 Tg5.1 P6-2 X8.2 M3/1 P8.2 V3.5',
      k: {
        5: 'Mã biên trước — né cách đi thịnh hành.',
        8: 'Mã phải lên biên — trung lộ mỏng yếu (ổn chắc: Mã 2 tiến 3).',
        12: 'Tiến Pháo phong tỏa Xe.',
        13: 'Phế Chốt 3 — không chậm trễ, đột phá tinh diệu!',
        17: 'Bình Xe tróc lại. Đen: Mã 7 tiến 6, Chốt 7 tiến hay Tượng 7 tiến 5?',
        18: 'Nhảy Mã bảo vệ Chốt.',
        19: 'Pháo nổ Chốt giữa — xác lập không đầu Pháo!',
        29: 'Tướng Đen trên cao, nguy cơ bốn bề — Đỏ ưu thế lớn.',
      },
      h: { 17: 'p155_0' },
      v: [
        { from: 'main', after: 7, m: 'M2.3', k: { 1: 'Khá ổn chắc.' } },
        { from: 'main', after: 12, m: 'X8.4 P2-5', k: { 2: 'Thuận thế đổi quân — Đen lập tức phản tiên.' } },
        { from: 'main', after: 17, m: 'P8-5 M3.5 X8.9 M5/3', k: { 4: 'Đỏ đắc quân.' } },
        { from: 'main', after: 19, m: 'B7.1 P6.3 Tg5.1 P6-5 Tg5-4 X3-6 P2-4 X6.3 Tg4.1 X2.1', k: { 10: 'Diệu sát — tuyệt sát, Đỏ thắng.' } },
        { from: 'main', after: 17, m: 'B7.1 X3.3 P8-7 X2.9 P7.3 S4.5 P7/7 P5.4 P2.1 P5/2 P2.3 P6.3 P2-5 Tg5-4 X2.5 X2/5', k: { 1: 'Chốt khử Mã.', 3: 'Bình Pháo đánh Tượng ép đổi Xe — tốc độ không kịp Đỏ.', 8: 'Đỏ đoạt thế không đầu Pháo — thế công không thể kháng cự.', 16: 'Đỏ tranh thế công trước — Đen khó cản.' } },
        { from: 4, after: 19, m: 'V3.5 X3/4 P8.2 P6-3', k: { 4: 'Đen vẫn bị động.' } },
        { from: 'main', after: 17, m: 'V7.5 X3/1 P8/5 P6.5 M7.6 X3.1 P2.5 P5.4 S4.5 X2.7 X2.4 P6.1 X2-5 X2.1 X8.1 P6-2 X5/1 P2.1 V5/7 X3.5 X5-8 P2-1', k: { 1: 'Bổ Tượng — ổn chắc nhưng Đỏ vẫn chủ động.', 4: 'Pháo Sĩ giác quấy nhiễu — phát huy tính cơ động của Ngũ Lục Pháo.', 6: 'Thăng Xe tuần hà — dừng Xe hỏi đường, hàm súc có lực!', 7: 'Bắt buộc.', 10: 'Tinh chuẩn.', 14: 'Đơn giản thỏa đáng.', 22: 'Đỏ hơn Chốt hơn Tượng — rõ ràng chiếm ưu.' } },
        { from: 6, after: 27, m: 'Tg5-4 P6/6', k: { 2: 'Đen cũng khó ứng phó.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 56, t: 'Sai Lầm Của Quải Giác Mã',
      s: 'Trung Pháo đối Tả Tượng Quải Giác Mã — bố cục cổ, phòng thủ tiêu cực. Đỏ nhảy chính Mã trái tăng thế công tổng thể: Đen thúc Chốt 3 thì Đỏ xông Chốt giữa, phế Chốt 7 tháo gỡ cục diện, hơn Chốt; Đen thúc Chốt 7 thì Đỏ hoành Xe quá cung nhắm Quải Giác Mã, xông Chốt giữa — thế công lăng lệ.',
      c: `<p>Dùng <strong>Tả Tượng Quải Giác Mã</strong> chống Trung Pháo là bố cục cổ, thịnh hành thập niên 1920–30; sau đó vì phòng thủ tiêu cực dễ bị công kích nên ít xuất hiện, hiếm thấy ở giải lớn nhưng vẫn thường gặp trong giới nghiệp dư.</p>
<p>Đỏ <strong>nhảy chính Mã trái</strong> — chiến thuật hữu hiệu tấn công hình trận này (Mã biên thì sức công không đủ; Chốt 7 thì hai bên kiềm chế lẫn nhau). Đen có 2 cách:</p>
<ul>
<li><strong>Chốt 3 tiến</strong> (mạch chính): Đỏ <strong>xông Chốt giữa</strong> chặt chẽ, hạn chế Mã Đen phản kích. Đen tiến Pháo phong tỏa cố sức; Đỏ <strong>phế Chốt 7 đột phá</strong> — tháo gỡ cục diện; Đen bình Pháo đè Mã bắt buộc. Đỏ Xe tiến đơn giản có lực — hơn Chốt, rất có triển vọng.</li>
<li><strong>Chốt 7 tiến</strong> chuẩn bị Xe chân Tượng phản kích đường 3: Đỏ <strong>hoành Xe quá cung</strong> — kế hoạch rõ ràng nhắm Quải Giác Mã; xông Chốt giữa mở đường bàn đầu Mã — thế công lăng lệ.</li>
</ul>
<h2>Bài học</h2>
<p>Nắm được yếu lĩnh công kích Quải Giác Mã, căn cứ hình thế phát động thế công trung lộ đúng lúc thì không khó giành ưu thế.</p>`,
      m: 'P2-5 M2.3 M2.3 V7.5 X1-2 M8.6 M8.7 B3.1 B5.1 X9-8 X9.1 P8.4 X9-4 X1.1 B3.1 P2.4 B7.1 P8-3 X2.9 M6/8 B7.1 P3.3 S6.5 P3/5 X4.2 P2/2 M7.6 X1-4 M6.8 M3.2 P5.4 S4.5 P5-1',
      k: {
        6: 'Tả Tượng Quải Giác Mã — bố cục cổ, phòng thủ tiêu cực.',
        7: 'Nhảy chính Mã trái — tăng thế công tổng thể. Đen: Chốt 3 hay Chốt 7?',
        9: 'Xông Chốt giữa — hạn chế Mã Đen phản kích, chặt chẽ.',
        10: 'Xuất Xe chuẩn bị tiến Pháo phong tỏa, kiềm chế trung lộ.',
        14: 'Tiến Pháo cố sức phong tỏa — không cam bị động.',
        17: 'Phế Chốt đột phá — tháo gỡ cục diện!',
        18: 'Bình Pháo đè Mã — bắt buộc.',
        19: 'Đơn giản có lực.',
        28: 'Bắt buộc.',
        33: 'Đỏ hơn Chốt chiếm ưu — rất có triển vọng.',
      },
      h: { 7: 'p158_0' },
      v: [
        { from: 'main', after: 6, m: 'M8.9 B3.1 X9.1 B1.1 X9-4 X9.1 X2.4 S6.5 P8-6 X1.1', k: { 1: 'Mã trái lên biên — sức công không đủ.', 10: 'Hình trận Đen ổn chắc — đủ sức chống đỡ.' } },
        { from: 'main', after: 6, m: 'B7.1 P2.4 B5.1 X1.1 M8.7 X1-4 X9.1 X4.5 X9-4 X9.1', k: { 1: 'Thúc Chốt 7.', 10: 'Hai bên kiềm chế lẫn nhau, mỗi bên có chỗ kiêng dè.' } },
        { from: 1, after: 8, m: 'B3.1 X9-7 M8.7 B7.1 B3.1 X7.4 P5/1 P2-3', k: { 8: 'Đỏ không được lợi.' } },
        { from: 'main', after: 8, m: 'X9.1 M3.4 X9-4 X1.1 X4.4 P2.2', k: { 6: 'Hình thế không sáng sủa — Đen có thể đối kháng.' } },
        { from: 'main', after: 9, m: 'M3.4 B5.1 B5.1 P8.3', k: { 1: 'Nếu Mã phản kích…', 4: '…Đỏ đổi Chốt giữa, tiến Pháo — xuất quân trước, khá có ưu thế.' } },
        { from: 'main', after: 13, m: 'P2.2 X4.2 P8.2 P8/1', k: { 4: 'Phục bình Pháo đánh Mã — Đỏ chủ động.' } },
        { from: 'main', after: 17, m: 'B3.1 X4.2 M3.4 X4-2 X8.6 X2.3 B3.1 X2.5 B3.1 P5.4', k: { 10: 'Đen khó lòng ứng phó.' } },
        { from: 'main', after: 18, m: 'X4.7 X8.9 X4-9 X8/3 X9-8 P3.3 S6.5 B3.1', k: { 1: 'Phế Xe chém Mã — xảo diệu nhưng hình thế đã thay đổi…', 8: '…Đen kém quân có thế công, Đỏ được không bù mất.' } },
        { from: 'main', after: 25, m: 'P2/3 X4-6', k: { 2: 'Đỏ chiếm yếu đạo chiếm ưu.' } },
        { from: 'main', after: 27, m: 'M8.6 P8-7', k: { 2: 'Đen khó ứng phó.' } },
        { from: 'main', after: 7, m: 'B7.1 X9.1 X9-7 X9-4 X1.1 B5.1 B7.1 B3.1 X7.5 M7.5 X7/1 X4.5 P8-7 M3.2 X7-8 X4/1 X8/1 B5.1 B5.1 M5.3', k: { 1: 'Thúc Chốt 7 — chuẩn bị Xe chân Tượng phản kích đường 3.', 2: 'Hoành Xe quá cung — kế hoạch rõ ràng nhắm Quải Giác Mã.', 6: 'Xông Chốt giữa mở đường bàn đầu Mã — thanh thoát có lực.', 16: 'Hay!', 20: 'Thế công Đỏ lăng lệ — Đen khó chống đỡ.' } },
        { from: 10, after: 12, m: 'X4.6 P8-7 X2.8 P2/1 X2-4 S6.5', k: { 6: 'Đỏ gặp phục kích.' } },
        { from: 10, after: 19, m: 'B3.1 B5.1 B5.1 P8/1', k: { 4: 'Thế Đỏ giàu sức sống.' } },
        { from: 10, after: 21, m: 'X7.2 M2.4 X7-6 B5.1', k: { 4: 'Cũng là Đỏ ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 57, t: 'Rời Xa Trung Tâm',
      s: 'Trung Pháo đối Hữu Đơn Đề Mã: Đen nhảy Mã phải lên biên — rời xa phòng ngự trung tâm. Đỏ Xe quá hà rồi xông Chốt giữa: Đen bổ Sĩ thì Đỏ phế Chốt giữa trước, nhảy bàn đầu Mã đúng thứ tự; Đen thoái Pháo bình trung thì Đỏ khởi hoành Xe phát động tổng tấn công.',
      c: `<p>Đen <strong>nhảy Mã phải lên biên</strong> — ứng phó tiêu cực, phòng thủ trung lộ mỏng (chính xác: Xe 9 bình 8 hoặc Mã 2 tiến 3). Đỏ xuất trực Xe — kiềm chế hiệu quả nhất cánh trái Đen. Đỏ <strong>Xe quá hà</strong> rồi <strong>xông Chốt giữa</strong> — chặt chẽ, phương châm rõ ràng. Đen có 2 cách:</p>
<ul>
<li><strong>Bổ Sĩ</strong> (mạch chính): cố thủ nhưng tiêu cực. Đỏ <strong>phế Chốt giữa</strong> trước — thứ tự chính xác (nhảy bàn đầu Mã trước thì Đen phản kích được); rồi bàn đầu Mã. Đen bình Pháo mời đổi Xe — ngược lại càng xấu; Đỏ hoành Xe sang cánh trái trống trải — nhiều thủ đoạn công kích.</li>
<li><strong>Thoái Pháo bình trung</strong> — chiến thuật thường dùng chống Trung Pháo bàn đầu Mã. Đỏ tránh đổi Xe duy trì thế công; <strong>khởi hoành Xe</strong> có cái nhìn toàn cuộc — phát động tổng tấn công, chủ lực chiếm hết yếu đạo.</li>
</ul>
<h2>Bài học</h2>
<p>Hữu Đơn Đề Mã có điểm yếu rõ: quân cánh trái gánh áp lực của Xe Đỏ, Mã trái lại phải giữ Chốt giữa — thế cô sức yếu.</p>`,
      m: 'P2-5 M8.7 M2.3 B7.1 M8.7 M2.1 X1-2 X9-8 X2.6 V7.5 B5.1 S6.5 B5.1 B5.1 M7.5 P2.1 X2/2 P8-9 X2.5 M7/8 X9.1 P9-6 X9-4',
      k: {
        6: 'Mã phải lên biên — tiêu cực, trung lộ mỏng (chính xác: Xe 9 bình 8 hoặc Mã 2 tiến 3).',
        7: 'Xuất trực Xe — kiềm chế hiệu quả nhất cánh trái Đen.',
        11: 'Xông Chốt giữa phối hợp Xe quá hà — chặt chẽ. Đen: bổ Sĩ hay thoái Pháo?',
        12: 'Bổ Sĩ cố thủ — tiêu cực.',
        13: 'Thứ tự chính xác — phế Chốt giữa trước!',
        16: 'Chính xác.',
        18: 'Bình Pháo mời đổi Xe — ngược lại càng bất lợi (khá tốt: Mã lui 3).',
        21: 'Hoành Xe sang cánh trái trống trải.',
        23: 'Đỏ nhiều thủ đoạn công kích (Pháo nổ Chốt giữa, Mã 5 tiến 7…) — Đen khó chống đỡ.',
      },
      h: { 11: 'p161_0' },
      v: [
        { from: 'main', after: 5, m: 'X9-8', k: { 1: 'Chính xác.' } },
        { from: 'main', after: 7, m: 'P8.2 B7.1 V7.5 M7.6', k: { 4: 'Hình trận Đen lỏng lẻo — dễ bị lợi dụng.' } },
        { from: 'main', after: 12, m: 'M7.5 P2-4', k: { 2: 'Tiếp theo Xe 1 bình 2 tróc Pháo, Pháo tiến 1 đuổi Xe — thế công Đỏ bị cản trở.' } },
        { from: 'main', after: 17, m: 'M1/3', k: { 1: 'Tăng liên kết phòng tuyến — vẫn có thể ứng phó.' } },
        { from: 'main', after: 20, m: 'M5.7 P2.2 M7.5 P2-5', k: { 4: 'Đen thoát khỏi khốn cảnh.' } },
        { from: 'main', after: 11, m: 'P8/1 M7.5 P8-5 X2-3 P2-4 X9.1 X1-2 X9-6 P5-7 X3-4 S6.5 P8-9', k: { 1: 'Thoái Pháo bình trung — chiến thuật thường dùng.', 4: 'Tránh đổi Xe — duy trì thế công.', 6: 'Khởi hoành Xe — cái nhìn toàn cuộc, phát động tổng tấn công.', 12: 'Chủ lực Đỏ chiếm hết vị trí trọng yếu — thế công căng thẳng.' } },
        { from: 5, after: 15, m: 'X1.1 P8-9 X1-4 X9-8 P2-3 X8.7', k: { 6: 'Đỏ ưu.' } },
        { from: 5, after: 16, m: 'B5.1 X1-2 P8-6 B5.1 M5.4 P5-7 M4.3 P7.2 M3.2 X2.1', k: { 1: 'Gấp công…', 10: '…Đen bình Xe tróc Mã lấy lại quân — tất cả tan thành mây khói.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 58, t: 'Như Hổ Thêm Cánh',
      s: 'Trung Pháo đối Tam Bộ Hổ: Đen nhảy Mã trái lên biên trái ý đồ ban đầu, rồi thăng Xe tuần hà chậm chạp. Đỏ thăng Pháo tuần hà công thành: Đen bình Xe trốn thì trúng cạm bẫy khác; Đen xuất Xe thì Đỏ không ham Xe, điều khiển binh mã; Đen bổ Sĩ thì Đỏ hồi Mã kim thương — cả 3 cách đều thua.',
      c: `<p>Đen bình Pháo ra biên định thành <strong>Tam Bộ Hổ</strong> tranh tiên. Đen <strong>nhảy Mã trái lên biên</strong> — tự làm suy yếu, trái ý đồ ban đầu (nên Xe tiến 6 phản kích hoặc Pháo bình 6). Thăng Xe tuần hà định thúc Chốt biên — quá chậm.</p>
<p>Đỏ <strong>thăng Pháo tuần hà</strong> — nhân lúc trận hình Đen không ổn, kịp thời điều Pháo công thành. Đen có 3 cách:</p>
<ul>
<li><strong>Bình Xe trốn</strong> (mạch chính): né trùng Pháo nhưng rơi vào cạm bẫy khác — Đỏ phế Chốt, phi Tượng, Đen phế Xe chém Pháo; Đỏ <strong>chuyển mình xảo diệu</strong> — Đen bó tay.</li>
<li><strong>Xuất Xe</strong>: Đỏ không ham ăn Xe mà tiếp tục điều khiển binh mã, thêm Chốt 7 qua sông — đắc quân thắng chắc.</li>
<li><strong>Bổ Sĩ</strong>: Đỏ <strong>hồi Mã kim thương</strong> — lấy thoái làm tiến, dọa Mã đạp Xe; dù Đen bình Pháo cản hay bình Pháo Sĩ giác, Đỏ đều thắng thế.</li>
</ul>
<h2>Bài học</h2>
<p>Khi trận doanh đối phương bất ổn, Pháo tuần hà "duyên hà thập bát đả" uy hiếp mạnh mẽ, phối hợp các chủ lực — như hổ thêm cánh.</p>`,
      m: 'P2-5 M2.3 M2.3 P2-1 X1-2 X1-2 M8.7 M8.9 X9-8 X2.4 P8.2 X2-3 B7.1 X3.1 V7.9 X3.2 P8-7 X3/2 V9.7 X9.1 X8.6 X9-6 X8-7 X6.1 B5.1 P1/1 B5.1 P1-5 B5-4',
      k: {
        4: 'Bình Pháo ra biên — định thành Tam Bộ Hổ.',
        8: 'Mã trái lên biên — tự làm suy yếu (nên Xe tiến 6 hoặc Pháo bình 6).',
        10: 'Thăng Xe tuần hà — quá chậm chạp (vẫn nên Xe tiến 6).',
        11: 'Pháo tuần hà — kịp thời điều Pháo công thành! Đen: bình Xe, Xe 9 bình 8 hay bổ Sĩ?',
        12: 'Né song trùng Pháo — nhưng rơi vào cạm bẫy khác.',
        13: 'Hay!',
        15: 'Hay!',
        18: 'Phế Xe chém Pháo — hạn chế thế công lớn mạnh.',
        22: 'Chỉ đành xuất Xe ra đại lộ.',
        25: 'Hay!',
        29: 'Chuyển mình xảo diệu — Đen bó tay chịu trói.',
      },
      h: { 11: 'p164_0' },
      v: [
        { from: 'main', after: 7, m: 'X2.6', k: { 1: 'Phản kích — tốt hơn.' } },
        { from: 'main', after: 17, m: 'P8-5 P7.3 X3-4 X2.8 S6.5 S6.5 X4/5 P7.1 X9-8 X2-4 X8.4 P7-9 P1-2 P9.1', k: { 14: 'Sát thức Đỏ hiện rõ — thế công căng thẳng.' } },
        { from: 'main', after: 21, m: 'P8-6 X8-7 V3.5 X2.7 S4.5 B5.1', k: { 6: 'Đen hết đường xoay sở.' } },
        { from: 'main', after: 25, m: 'S6.5 B5.1 B5.1 M3.5', k: { 4: 'Đỏ cũng vô cùng có lợi.' } },
        { from: 'main', after: 27, m: 'P1-3 B5.1 S6.5 B5-4', k: { 4: 'Đen cũng sụp đổ.' } },
        { from: 'main', after: 11, m: 'X9-8 P8-5 X2-5 B7.1 P8-5 X2.9 M9/8 X8.6 X5-4 X8-7 X4/2 B7.1 P1/1 B7-6 P1-3 B6.1', k: { 1: 'Xuất Xe.', 4: 'Không ham Xe — tiếp tục điều khiển binh mã.', 12: 'Thêm Chốt 7 qua sông tham chiến.', 16: 'Đỏ đắc quân thắng chắc.' } },
        { from: 5, after: 11, m: 'B3.1 P8-5 P8-5 X2.5', k: { 4: 'Đen cũng rơi vào khốn cảnh.' } },
        { from: 'main', after: 11, m: 'S6.5 P8-7 X2-3 M7/9 P1-2 P5-7 V3.1 X8.6 P8-6 Pt-9 X3-1 B7.1 P2/2 B7.1 X1-3 V3.5 X3.2 P9-7', k: { 1: 'Bổ Sĩ.', 2: 'Hay!', 3: 'Bắt buộc.', 4: 'Hồi Mã kim thương — lấy thoái làm tiến! Đen: Pháo bình 2 hay Pháo 8 bình 6?', 5: 'Bình Pháo cản Mã — tác dụng tạm thời.', 6: 'Hay!', 10: 'Hay!', 18: 'Đỏ đắc quân thắng chắc.' }, h: { 4: 'p165_0' } },
        { from: 7, after: 15, m: 'P8-6 M9.8 X3-2 P7.3 P1-2 P5.4 Tg5-6 P5-1 X9-8 X2.9 M9/8 P1-7 V7.5 Pt-4 S5.6', k: { 1: 'Pháo bình Sĩ giác.', 4: 'Chỉ có thể lấy lại quân trước.', 15: 'Đỏ lợi dụng nước tiên liên tiếp diệt Chốt — hơn Chốt chi phối toàn cuộc.' } },
        { from: 7, after: 15, m: 'B9.1 P5-7 M9.8 Pt.2 V3.5 Ps.3 P8.7 Ps.2', k: { 8: 'Đỏ đắc quân thắng thế.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 59, t: 'Một Mũi Tên Trúng Hai Đích',
      s: 'Trung Pháo đối Bình Phong Mã tả Pháo phong Xe: Đen tiến Chốt 3 không ăn khớp với nước Pháo phong Xe, hình trận lỏng lẻo. Đỏ nhảy Mã xuất kích — uy hiếp song trùng Chốt 3 tiến và Mã đạp Chốt giữa: Đen thoái Pháo thì Đỏ phế Chốt ép Tượng bay cao; Đen nhảy Mã thì Đỏ qua Chốt 3, hơn Chốt chiếm thế.',
      c: `<p>Đen <strong>tả Pháo phong Xe</strong> rồi <strong>tiến Chốt 3</strong> — không ăn khớp, hình trận lỏng lẻo (khá có tính mục tiêu: Pháo bình 5 kiềm chế trung lộ). Đỏ <strong>nhảy Mã xuất kích</strong> — "nhất tiễn song điêu": uy hiếp song trùng Chốt 3 tiến và Mã đạp Chốt giữa. Đen có 2 cách:</p>
<ul>
<li><strong>Thoái Pháo</strong> (mạch chính): Đỏ tiến Pháo, <strong>phế Chốt</strong> ép Đen bay Tượng lên cao — làm suy yếu hình cờ; chủ lực Đỏ chiếm yếu đạo — ưu thế, tiếp theo đổi Chốt 7 mở rộng thành quả.</li>
<li><strong>Nhảy Mã</strong>: nhân lúc Đen phòng thủ trung lộ, Đỏ thuận lợi qua Chốt 3, nhảy Mã biên (có lực hơn Mã đạp Chốt giữa), bình Pháo — hơn Chốt, rõ ràng ưu.</li>
</ul>
<h2>Bài học</h2>
<p>Mã 3 tiến 4 xuất kích là đáp trả có lực với đòn tả Pháo phong Xe — để hạn chế kế hoạch Đỏ, nước chính xác ở hồi 4 của Đen là Pháo bình 5.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 P8.4 B3.1 B3.1 M3.4 P8/3 P8.4 V3.5 B3.1 V5.7 M8.7 M2.3 P8-7 P2.2 X9-8 X1-2 X2.4 V7.5 X8.4',
      k: {
        6: 'Tả Pháo phong Xe.',
        8: 'Tiến Chốt — không ăn khớp với Pháo phong Xe (nên Pháo bình 5).',
        9: 'Nhảy Mã xuất kích — uy hiếp song trùng! Đen: thoái Pháo hay nhảy Mã?',
        13: 'Phế Chốt ép Tượng bay cao — làm suy yếu hình cờ.',
        18: 'Pháo tuần hà phòng Mã Đỏ xâm nhập.',
        23: 'Chủ lực Đỏ chiếm cứ yếu đạo — cục diện ưu thế.',
      },
      h: { 9: 'p167_0' },
      v: [
        { from: 'main', after: 7, m: 'P2-5', k: { 1: 'Khá có tính mục tiêu — kiềm chế trung lộ Đỏ.' } },
        { from: 'main', after: 9, m: 'P8/2 M4.5 M7.5 P5.4 P8-5 P8-5', k: { 6: 'Đỏ thắng chắc.' } },
        { from: 'main', after: 17, m: 'P8.4 X9-8 X1-2 M4.6 M3/5 X8.6 P8-3 X2.9 M7/8 P5.4', k: { 10: 'Thế công Đỏ vô cùng mãnh liệt.' } },
        { from: 'main', after: 9, m: 'M2.3 B3.1 P8-3 X2.9 M7/8 B3.1 V3.5 M8.9 B3.1 P8-7 M3.2 P7.2 X1-3 P5.4 S4.5 V7.5', k: { 1: 'Nhảy Mã.', 6: 'Nhân lúc Đen phòng thủ trung lộ, Đỏ qua Chốt 3 — tiến triển vật chất.', 8: 'Có lực hơn Mã đạp Chốt giữa.', 10: 'Hay!', 16: 'Đỏ hơn Chốt chiếm thế — rõ ràng ưu.' } },
        { from: 3, after: 16, m: 'M4.5 S4.5', k: { 2: 'Đỏ thiếu thủ đoạn tiếp.' } },
        { from: 3, after: 19, m: 'P2.4 M9.7 P2-5 S6.5 M3.2 M7/9 M2.4 P7/1 X1-2 X9-8', k: { 10: 'Đỏ hơn quân thắng thế.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 60, t: 'Giống Nhau Y Hệt',
      s: 'Trung Pháo đối Bình Phong Mã tả Pháo phong Xe: Đen bổ Tượng mềm tay — vẫn không thoát nghi hình. Đỏ nhảy Mã xuất kích uy hiếp Pháo quá hà: Đen thoái Pháo thì Đỏ đánh chắc tiến chắc, "ngừng Xe hỏi đường"; Đen nhảy Quải Giác Mã mưu phế quân thì Đỏ công thủ gọn ghẽ, hơn quân.',
      c: `<p>Giống cuộc trước, nhưng Đen <strong>bổ Tượng</strong> — mềm tay; tốt hơn Chốt 3 tiến nhưng vẫn không thoát nghi hình (nước duy nhất vừa củng cố trung lộ vừa kiềm chế Đỏ: Pháo bình 5). Đỏ <strong>lập tức nhảy Mã xuất kích</strong> uy hiếp Pháo quá hà — thủ đoạn có lực nhất. Đen có 2 cách:</p>
<ul>
<li><strong>Thoái Pháo</strong> (mạch chính): tiến rồi lại lui — thiệt thòi. Đỏ thúc Chốt kiềm chế Mã; <strong>"ngừng Xe hỏi đường"</strong> — ý vị sâu xa; bình Pháo — Đỏ bố trí cực tốt, mời đổi Xe, nắm chắc ưu thế.</li>
<li><strong>Quải Giác Mã</strong>: mưu phế quân đối kháng. Đỏ xông Chốt để Mã đạp Pháo; khởi hoành Xe chăm lo toàn cuộc, nâng Pháo đánh Chốt — ưu thế hơn quân không thể lay chuyển; ép đổi Mã — thắng cuộc đã định.</li>
</ul>
<h2>Bài học</h2>
<p>Quán triệt ý đồ đi cờ của mình là nguyên tắc cơ bản trong bố cục — kế hoạch không ăn khớp thì gặp công kích có lực.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 P8.4 B3.1 V3.5 M3.4 P8/2 M8.7 M2.3 B7.1 S4.5 P8-9 B3.1 B7.1 V5.3 X2.3 X1-4 S6.5 V3/5 P5-3 P8-6 X2.6 M7/8 V7.5 M8.9 B1.1 X4.3 P3-1 B5.1 X9-6',
      k: {
        8: 'Bổ Tượng — mềm tay (nước duy nhất: Pháo bình 5).',
        9: 'Lập tức nhảy Mã uy hiếp Pháo quá hà — có lực nhất. Đen: Pháo lui 2 hay Mã 2 tiến 4?',
        10: 'Tiến rồi lại lui — thiệt thòi.',
        12: 'Nhảy chính Mã — khá lợi cho phòng thủ.',
        13: 'Thúc Chốt kiềm chế Mã — mở rộng thế lực.',
        19: 'Ngừng Xe hỏi đường — ý vị sâu xa, nước hay toàn cuộc!',
        23: 'Hay!',
        33: 'Quân Đỏ bố trí cực tốt, mời đổi Xe — nắm chắc ưu thế.',
      },
      h: { 9: 'p168_0' },
      v: [
        { from: 'main', after: 11, m: 'P8-7 X2.9 P7.5 S4.5 M7/8 P5.4 S4.5 P8-9', k: { 8: 'Đen đơn Pháo khó làm đại sự — Đỏ chủ động.' } },
        { from: 'main', after: 11, m: 'B3.1 P8.4 M2.4 P8-3 P8.3 M7/5 X1-2 B3.1 V5.7 P3.3 X8-7 X2.2 P2-1 X9.2', k: { 14: 'Đỏ ưu thế rõ ràng.' } },
        { from: 'main', after: 12, m: 'M4.6 X1-3 B7.1 B3.1', k: { 1: 'Quá nôn nóng…', 4: '…Đen phản tiên.' } },
        { from: 'main', after: 13, m: 'P8.3 M4/3 P8-5 X2.9 M7/8 P8-5', k: { 6: 'Hiệu suất xuất quân 5 nước đổi 2 — Đen khó chấp nhận.' } },
        { from: 'main', after: 18, m: 'M7.6 X1-4 M6.5 M3.5 M4.5 M7.5 P5.4 P2-5 V7.5 X4.3 P5/1 P8.4', k: { 12: 'Đen phản khách vi chủ.' } },
        { from: 'main', after: 19, m: 'M3.4 M4.6 P8-7 B3.1 X8.6 M6.4 X8-6 B3.1', k: { 8: 'Đỏ ưu.' } },
        { from: 'main', after: 9, m: 'M2.4 B3.1 B7.1 X2.3 X8.6 M4/2 B7.1 M8.7 B7.1 M2/1 M7.6 X9.1 P2.2 X9-6 X1.1 B7.1 M6.8 P8.1 M8.6 M1.2 S4.5 P8-4 B7-6 M2.4', k: { 1: 'Quải Giác Mã — mưu phế quân đối kháng.', 2: 'Xông Chốt để Mã đạp Pháo — làm việc nhân nghĩa không nhường.', 3: 'Khử Chốt — thế tất phải đi.', 12: 'Khởi hoành Xe — chăm lo toàn cuộc, công thủ lưỡng lợi.', 18: 'Nâng Pháo đánh Chốt — ưu thế hơn quân không thể lay chuyển.', 19: 'Bắt buộc.', 20: 'Hay!', 24: 'Ép đổi Mã rồi khéo nhảy Mã phải lên — thắng cuộc đã định.' } },
        { from: 6, after: 11, m: 'P8-3 X2.9 M7/8 B3.1', k: { 4: 'Đen không có bù đắp — khó cứu vãn.' } },
        { from: 6, after: 19, m: 'M4.6 P5.4 S4.5 P5/2 M6.7 V7.5 Mt.5 B5.1 X1-4 P8-9 X4.6 X9-8 P2-1 X8.7 P1/1 P9.4 X4-3 P9.1', k: { 18: 'Đen kém quân khó đối kháng cân bằng.' } },
        { from: 6, after: 26, m: 'X6.3 M8.6 P5-4 P2-9', k: { 4: 'Đen có cơ hội giằng co.' } },
        { from: 6, after: 27, m: 'B7-6 X6-3', k: { 2: 'Đen lập tức sụp đổ.' } },
      ],
      kq: 'uu-do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
