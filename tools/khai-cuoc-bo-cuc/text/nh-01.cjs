// Nghi Hình — Chương 1: Loại hình Thuận Pháo. Nước đi chép từ sách; lời giảng viết lại bằng lời riêng.
module.exports = {
  ch: 1, ten: 'Loại Hình Thuận Pháo', level: 'trung-cap',
  y: 'Nghi hình là kết cấu cờ ẩn điểm yếu do chỉ chú trọng được mất cục bộ mà thiếu suy nghĩ tổng thể. Ở Thuận Pháo, hai bên đối đầu trực tiếp ở trung lộ — bên hậu thủ cô quân thâm nhập, Mã rời xa trung tâm hay bổ Sĩ chậm chạp đều bị trừng phạt nhanh.',
  cuoc: [
    {
      n: 1, t: 'Gậy Gõ Vào Đầu',
      s: 'Thuận Pháo: Đen bình Xe tróc Chốt quá sớm — phạm đại kỵ "cô quân thâm nhập". Đỏ phế Chốt linh hoạt Mã như cú gậy gõ đầu cảnh tỉnh, rồi phi Tượng tróc Xe ép Xe Đen định vị: dù Đen lui Xe, bình Xe hay tiến Pháo, Đỏ đều giành ưu thế.',
      c: `<p>Đen <strong>bình Xe tróc Chốt</strong> ở nước thứ 5 — đi vòng vèo, phạm đại kỵ binh gia <strong>"cô quân thâm nhập"</strong>. Nên nhảy Mã phải kịp xuất chủ lực hoặc bổ Sĩ củng cố phòng tuyến.</p>
<p>Đỏ <strong>phế Chốt 7 linh hoạt Mã</strong> — như cú "gậy gõ vào đầu" cảnh tỉnh; Đen thúc Chốt 7 phòng Mã xâm nhập; Đỏ <strong>phi Tượng tróc Xe</strong>, ép Xe Đen định vị để lợi dụng — "giấu kim trong bông". Đen có 3 cách:</p>
<ul>
<li><strong>Lui Xe 1</strong> (mạch chính): Đỏ hồi Mã kim thương tập kích, rồi <strong>phế quân tranh tiên</strong> (Xe bình 8) — Pháo nổ Sĩ thành đòn chí mạng, Đen khó giải cứu.</li>
<li><strong>Bình Xe mời đổi Pháo</strong>: mong đổi quân giảm áp lực; Đỏ tiến Pháo, Xe biên quá cung, song Xe chiếm vị trí cực tốt — ưu thế không gian tuyệt đối.</li>
<li><strong>Tiến Pháo</strong>: ngoan cường giằng co; Đỏ dùng Xe tối đổi Xe sáng giản dị có lực, "ngừng Xe hỏi đường" ý vị sâu xa — hình trận Đen rời rạc.</li>
</ul>
<h2>Bài học</h2>
<p>Triển khai quân đồng đều là nguyên tắc bố cục phổ biến; bên hậu thủ càng phải chống lại tiên thủ trước rồi mới phản kích. Hình trận chưa củng cố mà mù quáng tấn công là tự rơi vào thế khó.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1.1 X9-8 X1-6 X8.4 M8.7 X8-3 B7.1 X3.1 M7.6 B7.1 V7.9 X3/1 M6/8 P2.5 M8.7 B3.1 X9-8 P2-7 X8.8 P5.4 S6.5 V7.5 Tg5-6 S6.5 X6.2 P5/2 P5-6',
      k: {
        10: 'Bình Xe tróc Chốt — vòng vèo, phạm đại kỵ "cô quân thâm nhập".',
        11: 'Phế Chốt linh hoạt Mã — "gậy gõ vào đầu"!',
        14: 'Thúc Chốt 7 phòng Mã Đỏ xâm nhập.',
        15: 'Phi Tượng tróc Xe, ép Xe Đen định vị — giấu kim trong bông. Đen: lui Xe, bình Xe hay tiến Pháo?',
        17: 'Hồi Mã kim thương — tập kích bất ngờ.',
        18: 'Bắt buộc.',
        21: 'Phế quân tranh tiên — đẹp mắt!',
        27: 'Xuất Tướng!',
        31: 'Đen khó giải cứu đòn Pháo nổ Sĩ chí mạng.',
      },
      h: { 15: 'p011_0' },
      v: [
        { from: 'main', after: 15, m: 'X3.1 P8.7 X1-2 M6.8 X3/2 M8.7', k: { 1: 'Sai lầm…', 6: '…gọi sát rút Xe — Đỏ thắng nhanh.' } },
        { from: 'main', after: 17, m: 'X3.2 P8.5 M7.6 X9-8', k: { 4: 'Đỏ hơn quân, ưu thế lớn.' } },
        { from: 'main', after: 19, m: 'P2-7 M7/5 B5.1 M5/7', k: { 4: 'Đỏ vô cùng chủ động.' } },
        { from: 'main', after: 20, m: 'M3/2 M2.3 X9-8 X1-2', k: { 1: 'Chậm chạp…', 4: '…Đỏ bỏ lỡ cơ hội, Đen đối kháng được.' } },
        { from: 'main', after: 15, m: 'X3-2 P8-7 P2-3 P7.5 M2.3 X9-7 X2/3 X7.6 S4.5 X6-7 X1.2 Xs.4', k: { 1: 'Bình Xe mời đổi Pháo — mong hòa hoãn cục diện.', 3: 'Tiếp tục mưu cầu đổi quân.', 12: 'Đỏ chiếm ưu thế không gian tuyệt đối.' } },
        { from: 4, after: 21, m: 'X2/2 M6.7 P5-6 X6.6 V3.5 P5.4 S4.5 P5-8 P6-4 M7.5 V7.5 X7.7', k: { 12: 'Đỏ đoạt Tượng chiếm ưu.' } },
        { from: 'main', after: 15, m: 'P2.4 X6.2 M2.3 X9-7 B3.1 M6.7 X3.4 V9/7 P2/4 P8-7 P5-6 B5.1 S4.5 X6-8 X1-2 M7.9 V3.1 P7.5', k: { 1: 'Tiến Pháo — ngoan cường, mong giằng co.', 2: 'Chính xác.', 4: 'Xe tối đổi Xe sáng — giản dị có lực!', 8: 'Bị ép: Pháo chỉ có thể lui về chỗ cũ.', 14: 'Ngừng Xe hỏi đường — ý vị sâu xa!', 18: 'Hình trận Đen rời rạc, Đỏ có cơ hội tiến thủ.' } },
        { from: 6, after: 16, m: 'M6.5 M7.5 P5.4 S4.5 X6.2 X3.2 X6-8 M2.3 P5/2 X3-7', k: { 10: 'Đen đủ hài lòng.' } },
        { from: 6, after: 28, m: 'B5.1 P6.1', k: { 1: 'Nôn nóng…', 2: '…Đỏ nhất thời khó đột phá.' } },
      ],
      kq: 'do',
    },
    {
      n: 2, t: 'Mã Biên Ly Tâm',
      s: 'Thuận Pháo hoành Xe: Đen quăng Mã phải lên biên — cách cũ, thông thoáng cánh phải nhưng phòng tuyến trung lộ mỏng yếu. Đỏ quấy nhiễu bằng Xe, nhảy chính Mã dẫn dụ Pháo Đen rời vị trí; tham công thì bị sát cổ điển, bổ Sĩ thì vẫn túng quẫn.',
      c: `<p>Đen <strong>quăng Mã phải lên biên</strong> — đối phó kiểu cũ: thông thoáng cánh phải, chủ lực triển khai đều; nhưng lộ điểm yếu <strong>phòng tuyến trung lộ mỏng</strong>, đặc biệt trong cuộc đấu Pháo. Kỳ thủ hiện đại thường Xe tuần hà hoặc Mã chính.</p>
<p>Đỏ <strong>Xe tiến quấy nhiễu</strong>, rồi <strong>nhảy chính Mã trái</strong> — ổn chắc, tăng thế công tổng thể, dẫn dụ Đen bình Pháo đánh Mã để Pháo rời khu phòng thủ. Đen có 2 cách:</p>
<ul>
<li><strong>Pháo bình 3</strong> (mạch chính): tham công quên thủ — "thả hổ về rừng". Đỏ tiến Pháo cướp công giáng đòn phủ đầu; phế Xe chém Sĩ, khí thế cuồn cuộn — sát thức điển hình, khéo dùng nước ngừng ngắt, Pháo trùng tuyệt sát.</li>
<li><strong>Bổ Sĩ rồi tháo Trung Pháo</strong>: tăng phòng thủ, hạn chế Đỏ nhảy Mã. Đỏ <strong>đột kích Chốt biên</strong> đúng thời cơ; dù Đen tiến Pháo hay thúc Chốt 3, Đỏ thúc Chốt giữa, phong tỏa, vây khốn bắt sống Pháo — Đỏ ưu.</li>
</ul>
<h2>Bài học</h2>
<p>Đối đầu trực tiếp ở trung lộ là đặc trưng cơ bản của cuộc đấu Pháo — lập kế hoạch tác chiến phải nghĩ đến nhân tố này đầu tiên. Mã biên tự rời xa trung tâm để lại điểm yếu tiềm ẩn.</p>`,
      m: 'P2-5 P8-5 X1.1 M8.7 X1-6 X9-8 M2.3 M2.1 X6.6 P2.2 X6/2 B1.1 M8.7 P2-3 P8.5 P3.3 P8-3 P3-7 P5.4 S6.5 X9.2 P7-8 X9-6 Tg5-6 Xt.4 S5/4 X6-4 P5-6 X4.5 Tg6-5 X4.1 P8/4 P5/1 B7.1 P5.1',
      k: {
        8: 'Quăng Mã lên biên — cách cũ: phòng tuyến trung lộ mỏng yếu.',
        9: 'Quấy nhiễu trận doanh Đen — tích cực có lực!',
        13: 'Nhảy chính Mã trái — dẫn dụ Pháo Đen rời vị trí phòng thủ. Đen: Pháo bình 3 hay bổ Sĩ?',
        14: 'Tham công quên thủ — thả hổ về rừng!',
        15: 'Tiến Pháo cướp công — giáng đòn phủ đầu.',
        16: 'Pháo đánh Mã — phóng lao phải theo lao.',
        25: 'Phế Xe chém Sĩ — khí thế cuồn cuộn, sát thức điển hình.',
        35: 'Khéo dùng nước ngừng ngắt — nước sau Pháo trùng tuyệt sát.',
      },
      h: { 13: 'p014_0' },
      v: [
        { from: 'main', after: 12, m: 'B9.1 B1.1 X9.4 P2.5 P8.5 X8.2 X9-4 P2/6 X4.3 X1-2 X4-3 X8.4', k: { 1: 'Nôn nóng tấn công…', 8: 'Nước quan trọng!', 12: '…mỗi bên đều có chỗ kiêng dè.' } },
        { from: 0, after: 19, m: 'X1-2 P8-3 X8-7 P5.4 S6.5 X6-4', k: { 1: 'Sai lầm…', 6: '…tuyệt sát — Đỏ thắng.' } },
        { from: 'main', after: 15, m: 'X8.2 X9.1 S6.5 X9-4', k: { 4: 'Đen cũng khó phòng thủ.' } },
        { from: 'main', after: 25, m: 'Tg6.1 Xt/1 P5-6 P5-4 P6-5 S6.5 X1-2 P4/5', k: { 8: 'Đỏ thắng chắc.' } },
        { from: 'main', after: 13, m: 'S6.5 B7.1 P5-4 B9.1 B1.1 X9.4 P2.2 B5.1 V7.5 B5.1 X8.4 X9-8 P2-3 M7.5 B5.1 B3.1', k: { 1: 'Bổ Sĩ…', 3: '…rồi tháo Trung Pháo — hạn chế Đỏ nhảy Mã, liên kết Tượng tăng phòng thủ.', 4: 'Đột kích tuyến biên — đúng thời cơ!', 6: 'Uy hiếp Xe bình 8 sát Pháo. Đen: tiến Pháo hay Chốt 3?', 8: 'Thúc Chốt giữa — triển khai thế công trung lộ, hung hãn.', 11: 'Dùng Xe trói chặt Xe Chốt, trì hoãn thế công.', 12: 'Nước hay cướp tiên — tăng phong tỏa cánh phải Đen.', 16: 'Đỏ khống chế toàn cục — ưu thế áp đảo.' }, h: { 6: 'p015_0' } },
        { from: 4, after: 23, m: 'B5.1 X9/1 P2/3 X6-5', k: { 4: 'Trung lộ Đen rộng mở — Đỏ nhiều triển vọng.' } },
        { from: 4, after: 19, m: 'P2.2 B5.1 P4-5 B7.1 B3.1 X6-7 X8.5 X9-8 P2-6 M7.5', k: { 3: 'Hoàn Trung Pháo — vòng vèo, thiệt thòi khá lớn.', 4: 'Phế Chốt 7 — đột kích cục bộ thúc đẩy thế công toàn cục.', 10: 'Tiếp theo Xe bình 4, Pháo bình 7… — Đen khó chống đỡ.' } },
        { from: 4, after: 19, m: 'B3.1 X6-7 P2.2 B5.1 P2-3 X7-6 P3.3 S6.5 V7.5 B5.1 X8.4 M3.5 B5.1 X9/4 P3/1 X6/4 B5.1 P5.2 X1-2 P8.2', k: { 1: 'Phế Chốt dẫn dụ Xe Đỏ vào hiểm địa.', 4: 'Trước sau như một thúc Chốt giữa — không sợ phản kích.', 7: 'Đánh Tượng — vui nhất thời nhưng Pháo cô độc rơi vào hiểm địa (nên xuất Xe trước).', 12: 'Khua chiêng gõ trống giả công trung lộ — thực ra giăng lưới diệt Pháo.', 14: 'Hay!', 20: 'Kế vây khốn bắt sống Pháo Đen.' } },
        { from: 4, after: 19, m: 'B3.1 X6-7 P2.2 B5.1 V7.5 X7-6 P4-3 X9/1 P2-3 V7.9 X1-2 B7.1 X8.6 B5.1 X8-7 M3.5', k: { 5: 'Thoái thủ tiêu cực — không có lối thoát.', 14: 'Lấy công đối công không thành (nên Xe tiến 3 kiên trì phòng thủ).', 16: 'Trong đối công, Đỏ chiếm ưu.' } },
        { from: 8, after: 27, m: 'P2/5 P8.5 P3.5 M3/5', k: { 4: 'Đỏ ưu.' } },
        { from: 8, after: 27, m: 'P2/4 B5.1 P3.5 M3.5 P2-3 B5.1', k: { 6: 'Chốt Đỏ áp sát thành — Đỏ ưu.' } },
      ],
      kq: 'do',
    },
    {
      n: 3, t: 'Binh Đoàn Đại Chiến',
      s: 'Thuận Pháo hoành Xe đối trực Xe: Đen bổ Sĩ sớm cầu bình ổn — chồn chân bó gối. Đỏ Xe sườn điểm gấp eo Tượng, rồi "khua chiêng gõ trống, thanh Đông kích Tây" xé toang phòng tuyến; Đen Mã biên thì rơi vào phong tỏa không thoát được.',
      c: `<p>Đen <strong>bổ Sĩ củng cố</strong> — cầu bình ổn, có cải tiến so với cách cũ nhưng vẫn có nghi vấn. Đối phó chính xác là Xe tuần hà. Đỏ <strong>Xe sườn điểm gấp eo Tượng</strong> — chặt chẽ, khẩn cấp: để Đen xuất thêm một bước là mất cơ hội mở rộng tiên. Đỏ dọa bình Xe đè Mã; Đen có 2 cách:</p>
<ul>
<li><strong>Nhảy chính Mã</strong> (mạch chính): tích cực nhưng đã bổ thêm Sĩ nên mất thủ đoạn lui Mã phòng ngự. Đỏ mãnh công, Đen lộ lỗ hổng; Đỏ <strong>mũi kiếm đột nhiên chuyển hướng</strong> — thanh Đông kích Tây, Đen bị bao vây trước sau.</li>
<li><strong>Mã biên</strong>: uất ức nhưng bắt buộc. Đỏ bình Xe tróc Pháo kịp thời, thúc Chốt biên công thủ lưỡng lợi, rồi <strong>bình Pháo ra biên</strong> — hung ác có lực, tập trung binh lực mãnh công. Đen tiến Pháo hay lui Pháo đều không thoát phong tỏa — Đỏ hơn quân hoặc rõ ràng chiếm ưu.</li>
</ul>
<h2>Bài học</h2>
<p>Thuận Pháo hoành Xe đối trực Xe: bên tiên đã tập kết chủ lực cánh trái thành đoàn quân tác chiến, sức sát thương rất mạnh. Bên Đen phải nghiêm trận chờ thời, cẩn trọng; bất kỳ nước nghi vấn trì hoãn nào cũng để lại hậu quả khó vãn hồi.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1.1 X9-8 X1-6 S6.5 X6.7 M2.3 X6-7 P2.2 B7.1 X1.2 B7.1 B3.1 P8-7 S5.4 X7-3 X8.2 X3.1 M7/6 X9.1 X8-6 X9-6 S4.5 X3/3',
      k: {
        8: 'Bổ Sĩ cầu bình ổn — vẫn có nghi vấn (chính xác: Xe tuần hà).',
        9: 'Xe sườn điểm gấp eo Tượng — chặt chẽ, khẩn cấp! Đen: Mã chính hay Mã biên?',
        10: 'Nhảy chính Mã — tích cực, nhưng đã bổ Sĩ nên mất thủ đoạn lui Mã phòng ngự.',
        15: 'Phế Chốt!',
        18: 'Dưới thế mãnh công, Đen lộ lỗ hổng.',
        19: 'Mũi kiếm đột nhiên chuyển hướng — thanh Đông kích Tây!',
        20: 'Bắt buộc.',
        27: 'Đỏ chiếm ưu rõ ràng.',
      },
      h: { 9: 'p018_0' },
      v: [
        { from: 'main', after: 7, m: 'X8.4 X6.7 M2.3 X6-7 P2.2 B7.1 M7/5 M8.7 P2-6', k: { 1: 'Xe tuần hà — đối phó chính xác.', 9: 'Phục Pháo lui 3 và Pháo tiến 3 — cách gấp công của Đỏ không thành lập.' } },
        { from: 'main', after: 17, m: 'M3.4 X7-8 P5-3 X8/3', k: { 4: 'Đen mất trắng một quân.' } },
        { from: 'main', after: 19, m: 'M7/5 P5.4 Tg5-6 X9.1', k: { 4: 'Cục thế Đen nhanh chóng sụp đổ.' } },
        { from: 'main', after: 9, m: 'M2.1 X6-8 P2-4 B9.1 X8.4 M8.9 B1.1 M9.8 B1.1 X9.4 P4.5 P5/1 P4-6 P5-9 P5.4 M8/7 P6/6 X8/1 P5/2 X9-4 M1.2 P8-9 M2.3 Ps.8 M3.5 M7.5 M5.3 M5/6 X8.4 X8.2', k: { 1: 'Mã biên — uất ức nhưng bắt buộc.', 2: 'Bình Xe tróc Pháo — kịp thời có lực!', 4: 'Công thủ lưỡng lợi: khắc chế cánh phải Đen, mở đường Xe Mã.', 5: 'Chi viện cánh phải đang bị kiềm chế.', 11: 'Vươn Pháo đánh Mã — cố kiềm chế phần nào.', 14: 'Bình Pháo ra biên — hung ác có lực! Đen: Pháo tiến 4 hay Pháo lui 6?', 16: 'Thoái Mã ép đổi — không cho Đen hỗn chiến.', 17: 'Thoái Pháo đuổi Xe, mong giữ không đầu Pháo.', 20: 'Bình Xe tróc Pháo kiêm thiểm kích — chặt chẽ.', 30: 'Trong đối công, Đỏ hơn quân, cướp tiên làm loạn.' }, h: { 14: 'p020_0' } },
        { from: 3, after: 10, m: 'B9.1 X8.6 X6-8 X1-2 X8.1 M1/2 P8.7 X8-7', k: { 1: 'Chậm chạp…', 8: '…Đen phản khách vi chủ.' } },
        { from: 3, after: 13, m: 'X8.6 B9.1 B1.1 X9.5 X8-7 S6.5 P5.4 M3.5 X7-5 P8.5 V7.5 X8-6 M7/6 M8.9', k: { 14: 'Đỏ vô cùng chủ động.' } },
        { from: 3, after: 19, m: 'X8-6 P5-7 B3.1 X9.1', k: { 4: 'Đỏ chiếm chắc ưu thế.' } },
        { from: 3, after: 25, m: 'P6-2 M3.5 M1.2 X8-5 M7/5 P9.8', k: { 6: 'Đỏ đoạt Sĩ chiếm ưu.' } },
        { from: 3, after: 28, m: 'X8-3 X1-2 P8.5 P5-7', k: { 1: 'Sai lầm…', 4: '…Đen phản đoạt chủ động.' } },
        { from: 3, after: 31, m: 'X1.7 V7.9 M2.3 X8-3 M3.5 M7.5 M5.3 M5/6', k: { 8: 'Đen khó tạo sát — Đỏ hơn quân thắng thế.' } },
        { from: 3, after: 37, m: 'M3/4 Ps-7 S5.6 X4-6', k: { 4: 'Đỏ thắng chắc.' } },
        { from: 3, after: 23, m: 'P6/6 X8/1 P6.1 X8.1 X8.1 V3.5 X8-4 X9.1 X1-2 X8.1 M1/2 M8.7 X4.2 P8.6', k: { 1: 'Sách lược tử thủ — nhưng cất bước khó khăn.', 6: 'Tiến Xe cố kiềm chế — không có kế hay.', 10: 'Bình Xe mời đổi — cơ hội chống cự sau cùng.', 15: 'Đỏ rõ ràng chiếm ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 4, t: 'Đánh Thành Chiếm Đất',
      s: 'Thuận Pháo hoành Xe đối trực Xe: Đen phi Tượng biên phòng Xe Đỏ gấp công Mã — trông "binh đến tướng cản" nhưng làm suy yếu trận hình. Đỏ bình Xe đè Mã theo thói quen thì bỏ lỡ cơ hội; thăng Pháo rồi bình Pháo trấn trung mới đúng điểm yếu, Đen hoàn toàn bị động.',
      c: `<p>Đen nhảy chính Mã phải tăng năng lực trung tâm; Đỏ <strong>Xe gấp công Mã phải</strong>. Đen <strong>phi Tượng biên phòng thủ</strong> — tiêu cực, hình trận lỏng lẻo dễ bị kiềm chế (nên tiến Pháo có sức bật). Đỏ có 2 cách:</p>
<ul>
<li><strong>Thăng Pháo tuần hà rồi bình Pháo trấn trung</strong> (mạch chính): nước điều động tràn đầy sức sống — vừa mở đường Xe trái, vừa nắm điểm yếu hình cờ, nhãn quang chiến lược. Đen bình Xe hay nhảy Mã chống chọi, Đỏ đều thúc Chốt giữa, bình Xe — Đen bị động chịu đòn.</li>
<li><strong>Bình Xe đè Mã</strong> theo thói quen: bỏ lỡ cơ hội tấn công tốt. Đen bình Xe phong tỏa (nước hay có cái nhìn toàn cục), thoái Tượng khử Xe — Đen đủ hài lòng.</li>
</ul>
<h2>Bài học</h2>
<p>Trong bố cục, tính hoàn chỉnh của hình trận không thể xem nhẹ. Phi Tượng biên chỉ xuất phát từ suy nghĩ bảo vệ Mã mà thiếu quan niệm toàn cục — thất sách.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1.1 X9-8 X1-6 X8.4 M8.7 M2.3 X6.5 V3.1 P8.2 B3.1 P8-5 X8-4 X6-7 X1-3 X9-8 M3/5 P5.3 V7.5 X7-9 P2-4 B5.1 M5.3 X9-7',
      k: {
        10: 'Nhảy chính Mã phải — tăng năng lực tác chiến trung tâm.',
        11: 'Gấp công — mục tiêu là Mã phải Đen.',
        12: 'Phi Tượng biên — phòng thủ tiêu cực, hình trận lỏng lẻo. Đỏ: thăng Pháo hay bình Xe đè Mã?',
        13: 'Một nước điều động tràn đầy sức sống!',
        14: 'Phòng Đỏ bình Pháo đánh Mã.',
        15: 'Bình Pháo trấn trung — mở đường Xe trái, nắm điểm yếu: nhãn quang chiến lược. Đen: bình Xe hay nhảy Mã?',
        20: 'Chỉ có thể nhanh chóng thoát kiềm chế.',
        21: 'Kịp thời!',
        25: 'Nước hay phát triển thế công.',
        27: 'Đen hoàn toàn bị động chịu đòn.',
      },
      h: { 12: 'p022_0', 15: 'p023_0' },
      v: [
        { from: 'main', after: 9, m: 'S6.5 B3.1 M2.3 X9.1 P2-1', k: { 1: 'Bổ Sĩ củng cố trước…', 5: '…cũng thành cục diện đối kháng.' } },
        { from: 'main', after: 11, m: 'P2.2 X6-7 X1.2 B7.1 P2/3', k: { 1: 'Nên tiến Pháo — khá có sức bật.', 5: 'Đen có thể phản kích.' } },
        { from: 'main', after: 11, m: 'P2.2 B7.1 P2-7 M7.8 B3.1 B7.1 P7.3 P8-3', k: { 8: 'Đen đối kháng cân bằng.' } },
        { from: 'main', after: 12, m: 'X6-7 X1-3 P8-9 X8-2 X9.1 M3/5 X7.3 V1/3 X9-6 M5.3 X6.3 M3.4', k: { 1: 'Bình Xe đè Mã theo thói quen — bỏ lỡ cơ hội tốt.', 4: 'Bình Xe phong tỏa — nước hay có cái nhìn toàn cục.', 8: 'Thoái Tượng khử Xe — để Mã oa tâm nhảy ra trực tiếp.', 12: 'Tiếp theo Pháo bình 3 hoặc bình 4 — Đen đủ hài lòng.' } },
        { from: 3, after: 22, m: 'X6.5 X2-3', k: { 2: 'Đỏ không có lợi.' } },
        { from: 'main', after: 13, m: 'X8-3 P8-3 M7/5 B7.1 X3.1 M7.6', k: { 6: 'Đỏ vô cùng chủ động.' } },
        { from: 'main', after: 14, m: 'P8-3 M3.4 X6.1 P2-3 P3.3 S4.5 X6-7 M4/3 P3-7 X1-3 P7-8 B3.1 B7.1 X3.5 X9.2 X8-2', k: { 1: 'Bình Pháo đánh Mã — không thành công…', 16: '…Đen lấy lại một quân và dễ chơi.' } },
        { from: 'main', after: 15, m: 'S4.5 X9-8', k: { 2: 'Nước sau có Xe bình 7 — Đen cũng bất lợi.' } },
        { from: 'main', after: 19, m: 'S4.5 P5-3 M7/9 P3-9', k: { 1: 'Chậm chạp…', 4: '…tình hình Đen càng gay go.' } },
        { from: 'main', after: 20, m: 'X7-9 P5.3', k: { 1: 'Tiện tay…', 2: '…Đen có thủ đoạn đổi Pháo, cục thế buông lỏng.' } },
        { from: 'main', after: 24, m: 'X9.1 M5.3 X9/3 X4.2', k: { 1: 'Tham ăn Tượng…', 4: '…Đen có thể phản.' } },
        { from: 'main', after: 15, m: 'M3.4 P5.3 V7.5 X9-8 P2-3 X8.7 X1-3 B5.1 M4.3 X6/3 S4.5 B5.1 X8-5 M7.5 X5-8 S6.5', k: { 1: 'Hình trận đã bị tàn phá — nhảy Mã chống chọi.', 2: 'Thứ tự cần thiết.', 9: 'Tiến Mã đạp Chốt — thực dụng.', 10: 'Chính xác — không gấp công.', 12: 'Trực tiếp xông Chốt — có trình tự.', 16: 'Bổ Sĩ ổn chắc trước khi tổng tấn công — Đen không cách nào tổ chức phòng ngự tin cậy.' } },
        { from: 11, after: 23, m: 'M4.6 X6.1', k: { 2: 'Nước ác.' } },
        { from: 11, after: 24, m: 'X6.1 M3.5 V7.5 P3.5 M3.5 S6.5 X6-5 M7/6', k: { 1: 'Gấp công…', 8: '…Đỏ mất quân.' } },
        { from: 11, after: 26, m: 'M7.5 B3.1 B5.1 B3-4', k: { 4: 'Đen có thủ đoạn đánh trả xảo diệu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 5, t: 'Tránh Thực Đánh Hư',
      s: 'Thuận Pháo hoành Xe đối trực Xe chính Mã: Đen phi Tượng biên phòng Xe gấp công — "nước chưa đến, đắp đập trước" nhưng tiêu cực, thiếu tiêu điểm. Đỏ mặc kệ, thúc Chốt linh hoạt Mã, nhảy về cánh trái Đen, dùng bá vương Xe ép đổi — tránh chỗ mạnh đánh chỗ yếu.',
      c: `<p>Trong Thuận Pháo hoành Xe đối trực Xe chính Mã, Mã lộ 3 Đen thường là mục tiêu; Đen <strong>phi Tượng biên phòng thủ trước</strong> — không hợp thời (nên thúc Chốt 3 trước, đợi Đỏ Xe gấp công rồi mới phi Tượng).</p>
<p>Đỏ <strong>mặc kệ động thái của Đen</strong> — sách lược cao minh: thúc Chốt 3, Mã tiến 4 rồi <strong>nhảy về cánh trái</strong> — khi Đen bận xây công sự cánh phải, Đỏ tấn công hướng ngược lại. Đen tiến Pháo đánh Chốt giữa dọa; Đỏ <strong>bình Xe ép đổi</strong>, gây áp lực nặng nề lên cánh trái Đen. Đen có 2 cách:</p>
<ul>
<li><strong>Xe tiến 4</strong> (mạch chính): né được cạm bẫy (Pháo đánh Chốt giữa ngay thì trúng đòn đả kích). Đỏ Xe sườn chặt chẽ có lực, đoạt một Tượng chiếm ưu.</li>
<li><strong>Bình Xe</strong>: Đỏ nhảy Mã giữa đơn giản tiêu trừ phản kích, quyết đoán phế Chốt, dùng bá vương Xe ép đổi — cánh trái Đen bị tấn công.</li>
</ul>
<h2>Bài học</h2>
<p>Phòng ngự thiếu tiêu điểm hiển nhiên không đáng tin. Đỏ dựa tình thế mà dẫn dắt, thực thi chiến lược tránh chỗ mạnh đánh chỗ yếu.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1.1 X9-8 X1-6 X8.4 M8.7 M2.3 X9.1 V3.1 B3.1 B3.1 M3.4 S4.5 M4.3 P2.4 X6-2 X8.4 X9-2 P2-5 M7.5 P5.4 S4.5 X1-2 X2.6 X2.7 X2-3 X2/2 V3.1 M3.4 X3-9',
      k: {
        12: 'Phi Tượng biên phòng Xe gấp công — không hợp thời.',
        13: 'Mặc kệ động thái của Đen — sách lược cao minh.',
        17: 'Thiết thực! Đen bận xây công sự cánh phải, Đỏ tấn công hướng ngược lại.',
        18: 'Không cam khổ thủ — Pháo đánh Chốt giữa dọa, mong Đỏ đổi quân.',
        19: 'Không manh động: bình Xe ép đổi — nước mạnh khuếch tiên giành thế. Đen: Xe tiến 4 hay bình Xe?',
        20: 'Né được cạm bẫy của Đỏ.',
        27: 'Chặt chẽ có lực!',
        33: 'Trong tấn công, Đỏ đoạt một Tượng chiếm ưu.',
      },
      h: { 19: 'p026_0' },
      v: [
        { from: 'main', after: 11, m: 'B3.1 X6.5 V3.1', k: { 1: 'Thúc Chốt 3 trước…', 3: '…đợi Đỏ gấp công rồi phi Tượng — có mục tiêu hơn.' } },
        { from: 'main', after: 15, m: 'X8-6 X6.3 B5.1 M4.6 X1-3 M6.7 X3.2 P8.3', k: { 8: 'Hình trận Đen lỏng lẻo, Đỏ đắc thế.' } },
        { from: 'main', after: 17, m: 'P5-6 B3.1 X8-7 X6-3', k: { 4: 'Đỏ chiếm quyền chủ động.' } },
        { from: 'main', after: 17, m: 'X1-4 P5-3 P5-6 M3/4 M7/9 X6.8 S5/4 P3-4', k: { 8: 'Đỏ chủ động.' } },
        { from: 'main', after: 18, m: 'M3.5 V7.5 X6.5 M3.4', k: { 1: 'Đổi quân…', 4: '…cục thế hòa hoãn, Đỏ không có lợi.' } },
        { from: 'main', after: 19, m: 'P2-5 M7.5 X8.4 M3.5 X8-1 M5.3 Tg5-4 P5-6 X1-4 M5/6 Tg4.1 P6.1 S5.6 B3.1', k: { 1: 'Tiện tay đánh Chốt giữa…', 4: 'Hay!', 6: 'Hay!', 14: '…trúng đòn đả kích — Đỏ thắng thế.' } },
        { from: 'main', after: 26, m: 'P8-6 X2.5', k: { 2: 'Cục thế Đen thoải mái.' } },
        { from: 'main', after: 19, m: 'X8-4 M3.5 V7.5 B3.1 X4-7 X9-3 X7.4 X2-3 M7.8 X3.3 P2/2 P5-1', k: { 2: 'Đơn giản thỏa đáng — tiêu trừ năng lực phản kích.', 4: 'Quyết đoán phế Chốt!', 6: 'Bá vương Xe ép đổi — triển khai thế công lên cánh trái mỏng yếu.', 12: 'Cánh trái Đen bị tấn công — Đỏ ưu.' } },
        { from: 7, after: 25, m: 'P2/2 B5.1 X1-4 X3.4 P2-7 B5.1 X4.6 X2.6', k: { 8: 'Đỏ đánh phủ đầu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 6, t: 'Đường Vòng Cũng Tốt',
      s: 'Thuận Pháo trực Xe đối hoành Xe: Đen tiến Xe tuyến Chốt nóng lòng phản kích — cô quân thâm nhập. Đỏ tháo Pháo thoái thủ thì yếu mềm; Đỏ nhảy Mã tróc Xe rồi thoái Mã oa tâm "đường vòng dẫn lối an yên", thế công Đen tan thành mây khói — Đỏ hơn Chốt chiếm ưu.',
      c: `<p>Đen <strong>tiến Xe tuyến Chốt</strong> — nóng lòng phản kích, dẫn đến cô quân thâm nhập (chính xác: nhảy Mã triển khai đều chủ lực). Đỏ có 2 cách:</p>
<ul>
<li><strong>Nhảy Mã tróc Xe</strong> (mạch chính): không sợ Đen bình Xe đè Mã — can đảm có kiến thức. Đen sát Chốt quá tham, cô quân thâm nhập. Đỏ <strong>thoái Mã oa tâm</strong> — "đường vòng dẫn lối an yên": chỉ một hồi, thế công Đen tan biến. Xe tuần hà, Mã giữa, đơn giản rõ ràng — Đỏ hơn Chốt chiếm chắc ưu thế.</li>
<li><strong>Tháo Pháo thoái thủ</strong>: "địch tiến ta thoái" — yếu mềm, tiêu cực. Đen lập tức tấn công trung lộ, phản kích đủ hài lòng.</li>
</ul>
<h2>Bài học</h2>
<p>Đỏ dùng Mã phải xuất kích, gián tiếp yểm hộ Mã trái — tinh hoa chiến thuật bố cục. Đen di chuyển Xe quá nhiều lần ở giai đoạn bố cục, ảnh hưởng xuất động các quân khác, khó tránh khốn cuộc.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 X9.1 B3.1 X9-4 M8.7 X4.5 M3.4 X4-3 M7/5 M2.1 X2.6 P2-4 M5.3 X1-2 P8-6 P5/1 S4.5 X2.4 M4.5 M7.5 P5.4 V3.5 X2-3',
      k: {
        10: 'Tiến Xe tuyến Chốt — nóng lòng phản kích, cô quân thâm nhập. Đỏ: nhảy Mã hay tháo Pháo?',
        11: 'Nhảy Mã tróc Xe — can đảm có kiến thức.',
        12: 'Sát Chốt — quá tham tấn công, làm xấu thêm cục thế.',
        13: 'Thoái Mã oa tâm — đường vòng dẫn lối an yên!',
        15: 'Hay!',
        20: 'Thoái Pháo điều chỉnh, xoa dịu cục thế.',
        21: 'Củng cố trận doanh — dĩ dật đãi lao.',
        27: 'Thủ đoạn đơn giản rõ ràng — Đỏ hơn Chốt chiếm chắc ưu thế.',
      },
      h: { 10: 'p027_0' },
      v: [
        { from: 'main', after: 10, m: 'P5-4 B5.1 V7.5 M2.3 B7.1 M3.5 S6.5 B3.1 P4.1 X4.2', k: { 1: 'Địch tiến ta thoái — yếu mềm, tiêu cực.', 2: 'Lập tức tấn công trung lộ — chặt chẽ có lực.', 10: 'Đen có thể phản kích, đủ hài lòng.' } },
        { from: 0, after: 11, m: 'X4-3 V7.5 M2.1 S6.5', k: { 4: 'Hình trận Đỏ rắn chắc, khá chủ động.' } },
        { from: 0, after: 14, m: 'P4.5 X1.1 S6.5 X1-6 P4-7 M7.5', k: { 6: 'Đen lấy lại quân — Đỏ vô vị.' } },
        { from: 'main', after: 11, m: 'X4/1 M4.5 M7.5 P5.4 S4.5 V7.5 B9.1', k: { 1: 'Lựa chọn sáng suốt hơn…', 7: '…Đen hạ phong nhưng vẫn chống đỡ được.' } },
        { from: 'main', after: 13, m: 'P5.4 M4.6 X3-4 M6/5 X4-5 M5.3 X5/1 X2.6', k: { 8: 'Chủ lực cánh phải Đen chưa động — Đỏ chủ động.' } },
        { from: 'main', after: 13, m: 'X3-5 M5.3 X5/1 P5/1', k: { 4: 'Nước hay chỉnh hình — tiếp theo Xe tiến 6, phi Tượng… Đen khó chống đỡ.' } },
        { from: 'main', after: 19, m: 'X2.4 X2-3 S4.5 S6.5', k: { 4: 'Đỏ ưu thế áp đảo.' } },
        { from: 'main', after: 20, m: 'X2-3 V3.5 M4.6 X3-4 M6.5 P4.5 M5.3 P5-6', k: { 8: 'Đỏ không hoàn toàn nắm được cục thế.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 7, t: 'Một Mũi Tên Ba Đích',
      s: 'Thuận Pháo trực Xe đối hoành Xe: Đen phi Tượng biên bảo vệ Chốt — hình trận phân tán. Đỏ mở Pháo ra biên nắm điểm yếu; dời Pháo đánh Mã với chuỗi thủ đoạn liền nhau, hoặc Pháo nổ Chốt biên rồi bình Xe chiếm sườn — Đen chống trái đỡ phải.',
      c: `<p>Thúc Chốt 3 tương ứng là con đường để Đen giành thế đối kháng. Đen <strong>phi Tượng biên</strong> bảo vệ Chốt — trận hình tán loạn, chôn mầm bất lợi. Đỏ <strong>bình Pháo ra biên</strong> — chặt chẽ: dọa Pháo đánh Chốt biên và xuất Xe. Đen có 2 cách:</p>
<ul>
<li><strong>Thăng Xe tuyến Chốt</strong> (mạch chính): kiên trì phòng thủ. Đỏ <strong>dời Pháo đánh Mã</strong> — cấu tứ sâu xa, chuỗi thủ đoạn liền nhau, nước "qua cửa" Pháo bình 7 tất yếu; dù về vật chất hay vị trí, Đỏ đều ưu.</li>
<li><strong>Nhảy chính Mã</strong>: tăng sức trung tâm, ngoan cường. Đỏ xuất Xe thì hai bên giằng co; còn <strong>Pháo nổ Chốt biên</strong> — lợi dụng khéo điểm yếu Tượng biên — rồi <strong>bình Xe chiếm sườn</strong> thâm thúy, Đen rơi vào khó khăn.</li>
</ul>
<h2>Bài học</h2>
<p>Hình trận lỏng lẻo phân tán là nguyên nhân cơ bản dẫn đến bất lợi. Đỏ vận Pháo xảo diệu, những nước "qua cửa" đẹp mắt để lại ấn tượng sâu sắc.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 X9.1 M8.7 X9-4 B3.1 B3.1 X2.5 V3.1 P8-9 X4.2 X9-8 M2.4 P5-6 P2-3 P6.6 X4/2 P9.4 X1-3 P9-7 P3-4 P7-3 V7.9 V7.5',
      k: {
        10: 'Thúc Chốt 3 — con đường giành thế đối kháng.',
        12: 'Phi Tượng biên — trận hình tán loạn, chôn mầm bất lợi.',
        13: 'Bình Pháo ra biên — chặt chẽ. Đen: thăng Xe tuyến Chốt hay nhảy chính Mã?',
        14: 'Thăng Xe trấn giữ tuyến Chốt — kiên trì phòng thủ.',
        17: 'Bình Pháo đánh Mã — nước công kích hay.',
        19: 'Hay!',
        23: 'Nước "qua cửa" tất yếu — nếu không Mã trái Đỏ để lại mối nguy.',
        27: 'Cả vật chất lẫn vị trí, Đỏ đều có ưu thế.',
      },
      h: { 13: 'p030_0' },
      v: [
        { from: 'main', after: 11, m: 'M2.3 X2-7 M3.4 X9.1 V3.1 P8.4 X4.2 X9-6 P2-4', k: { 9: 'Hai bên giằng co.' } },
        { from: 'main', after: 11, m: 'P5/1 X2-7 X4.1 M3.4 M2.3 P8.4 P5-3 P8-7 V3.5 X7/1 P3.2 X7.2 P2/2', k: { 13: 'Đen có thể ứng chiến.' } },
        { from: 'main', after: 13, m: 'X4.5 M3.4 X4-3 P9.4 V1/3 P9-7 X3-2 P7-3 V7.9 X2-7', k: { 10: 'Đỏ liên tiếp ăn Chốt — hình thế đại ưu.' } },
        { from: 'main', after: 15, m: 'M2.3 X8.4 S4.5 B7.1', k: { 4: 'Đỏ nắm chắc tiên thủ.' } },
        { from: 'main', after: 13, m: 'M2.3 X9-8 X1-2 X8.6 M3.4 X8/3 X2.1 P9.4 M4.3 P9-3 V7.9 P5-4 P2-3 X8.5 X4-2', k: { 1: 'Nhảy chính Mã — tăng sức trung tâm, ngoan cường. Đỏ: xuất Xe hay Pháo nổ Chốt biên?', 3: 'Chính xác.', 5: 'Hay!', 9: 'Hay!', 15: 'Hai bên giằng co.' }, h: { 1: '!p031_0' } },
        { from: 4, after: 15, m: 'P2.2 X2.1', k: { 2: 'Đen tự chuốc họa.' } },
        { from: 4, after: 22, m: 'X8-7 P2-3 P9-7 B3.1', k: { 1: 'Sai lầm…', 4: '…Đỏ mất Xe.' } },
        { from: 4, after: 14, m: 'P9.4 X1-2 P9-8 X2-3 P8-3 V7.9 X2-4 S4.5 X9-8 P2.2 X4.3', k: { 1: 'Pháo nổ Chốt biên — lợi dụng khéo điểm yếu Tượng biên.', 3: 'Hay!', 5: 'Phù hợp thực tế.', 7: 'Bình Xe chiếm sườn — thâm thúy, giàu dư vị!', 11: 'Xe xuống hoành 2 — hình trận Đen lộn xộn, khó chiến đấu ngang ngửa.' } },
        { from: 7, after: 18, m: 'X2-7 X4.2 P8-7 M3/5 X7-8 X3.3 X8.2 X3.3', k: { 1: 'Sai lầm…', 8: '…Đen phản tiên.' } },
        { from: 7, after: 20, m: 'X9-8 P2.2 X2.1 X4.4', k: { 1: 'Tiện tay…', 4: '…Đỏ khó có lợi.' } },
        { from: 7, after: 21, m: 'M3.2 M3.4', k: { 2: 'Đỏ cũng ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 8, t: 'Hoa Nấp Dưới Lá',
      s: 'Thuận Pháo trực Xe lưỡng đầu xà đối song hoành Xe: Đỏ nâng Pháo tuần hà tưởng ổn chắc, thực ra chênh vênh. Đen bình Xe nấp sau Mã — "hoa nấp dưới lá" — nhắm mắt xích mỏng ở tuyến 7: Đỏ nhảy Mã thì Đen phế quân đoạt thế; Đỏ cao Xe thì Đen đột phá trung lộ.',
      c: `<p>Thế trận thịnh hành <strong>Thuận Pháo trực Xe lưỡng đầu xà</strong> đối <strong>song hoành Xe</strong>. Đỏ <strong>nâng Pháo tuần hà</strong> — trông ổn chắc, thực ra chênh vênh, đánh giá thấp sức phản kích của song hoành Xe (chính xác: bổ Sĩ).</p>
<p>Đen <strong>bình Xe nấp sau Mã</strong> — như "hoa nấp dưới lá": với kết cấu Trung Pháo + Pháo tuần hà, mắt xích mỏng ở tuyến 7; công kích hiệu quả ở đây làm suy yếu Pháo tuần hà. Đỏ có 2 cách:</p>
<ul>
<li><strong>Nhảy Mã</strong> (mạch chính): biết Đen sẽ đột phá đường 3 mà vẫn tiến — không lý trí. Đen đổi Pháo tranh tiên (chiến thuật đã định), <strong>Pháo nổ Sĩ đáy</strong> hung hãn, phế quân đoạt thế.</li>
<li><strong>Cao Xe biên bảo vệ Mã</strong>: kế tạm thời. Đen <strong>đột phá trung lộ</strong>, phế Xe cướp công — cục thế Đen có sức phản kích, lạc quan.</li>
</ul>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 X9.1 B3.1 X9-4 M8.7 M2.3 B7.1 X1.1 P8.2 X1-3 M7.6 B3.1 P5-6 P5-4 M6.4 P4.7 X9.2 B7.1 M4.3 P2-7 Tg5-6 B3.1 P8/3 B7.1',
      k: {
        12: 'Thế trận thịnh hành: Thuận Pháo trực Xe lưỡng đầu xà đối song hoành Xe.',
        13: 'Nâng Pháo tuần hà — tưởng ổn chắc, thực ra chênh vênh (chính xác: bổ Sĩ).',
        14: 'Bình Xe nấp sau Mã — "hoa nấp dưới lá". Đỏ: nhảy Mã hay cao Xe biên?',
        15: 'Biết rõ Đen sẽ đột phá đường 3 mà vẫn tiến — không lý trí.',
        18: 'Đổi Pháo tranh tiên — chiến thuật đã định.',
        20: 'Pháo nổ Sĩ đáy — hung hãn!',
        28: 'Đen phế quân đoạt thế — hình thế rất tốt.',
      },
      h: { 14: 'p033_0' },
      v: [
        { from: 'main', after: 12, m: 'S6.5', k: { 1: 'Củng cố một nước — lưỡng đầu xà được tăng cường, tiên thủ trong tầm tay.' } },
        { from: 'main', after: 17, m: 'M3.4 B7.1 X3.3 M3.4', k: { 4: 'Đỏ có thể giằng co.' } },
        { from: 'main', after: 14, m: 'X9.2 B5.1 M7.6 B3.1 P5-6 B5.1 P6.6 B5-4 V3.5 X3-4 B7.1 M3.5 B7.1 B4.1 S4.5 B4-5', k: { 1: 'Cao Xe biên bảo vệ Mã — kế tạm thời.', 3: 'Để Đen xông Chốt 3 — chủ lực Đen tập trung có lợi (nên Mã tiến 4 ổn chắc).', 6: 'Phế Xe cướp công — thế tất phải tranh!', 16: 'Cục thế Đen có sức phản kích — lạc quan.' } },
        { from: 2, after: 16, m: 'M3.4', k: { 1: 'Khá ổn chắc.' } },
        { from: 2, after: 23, m: 'B3.1 P8-6 X3-4 P6-5 M7.5', k: { 5: 'Đen vẫn chiếm quyền chủ động.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 9, t: 'Cương Nhu Hội Đủ',
      s: 'Thuận Pháo trực Xe lưỡng đầu xà: Đen bình Pháo ra biên mở đường Xe — suy nghĩ đơn phương. Đỏ xuất Xe trái cướp tiên, phong tỏa Xe Đen, Xe cấp tiến xuống hoành 2; bình Xe tróc Mã ép Đen thoái Mã oa tâm — song Mã tai hại thành điểm yếu chí mạng.',
      c: `<p>Đen <strong>bình Pháo ra biên</strong> mở đường Xe — chỉ là suy nghĩ đơn phương: khi Đỏ Pháo phong tỏa, Đen tiến thoái lưỡng nan (nên hoành Xe, dùng sức phản kích song hoành Xe).</p>
<p>Đỏ xuất Xe, <strong>tiến Pháo phong tỏa</strong>; Đen Xe tuần hà chuẩn bị mời đổi Chốt. Đỏ <strong>Xe xuống hoành 2</strong> — thọc sâu đánh mạnh, chặt chẽ, khẩn cấp. Đen có 2 cách:</p>
<ul>
<li><strong>Chốt 3 tiến</strong> (mạch chính): Đỏ bình Xe tróc Mã tinh chuẩn, Đen thăng Xe bảo vệ Mã bắt buộc; Đỏ bình Pháo — lại một nước ép buộc; Đen thoái Mã — Đỏ ưu thế áp đảo.</li>
<li><strong>Chốt 7 tiến</strong>: Đỏ bình Xe, Đen thoái Mã oa tâm; Đỏ <strong>tiến Pháo đánh Mã</strong> hung hãn. Đen phi Tượng thì Đỏ dùng một Xe đổi hai, xông Chốt mãnh công; Đen bình Xe thì Đỏ Mã tiến công thủ vẹn toàn — số kiếp đã định.</li>
</ul>
<h2>Bài học</h2>
<p>Bình Pháo mở đường Xe không thỏa đáng — nguyên nhân chính dẫn đến nghi hình. Đỏ trái phong phải đánh, cương nhu hội đủ, tổ hợp chiến thuật đẹp mắt.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 X9.1 B3.1 X9-4 M8.7 M2.3 B7.1 P2-1 X9-8 X1-2 P8.4 X4.3 X2.8 B3.1 X2-7 X2.2 P8-7 X2.7 M7/8 M3/5 B7.1 X4.1 V3.1',
      k: {
        12: 'Bình Pháo ra biên mở đường Xe — suy nghĩ đơn phương.',
        15: 'Phong tỏa!',
        16: 'Xe tuần hà — chuẩn bị mời đổi Chốt.',
        17: 'Thọc sâu đánh mạnh — chặt chẽ, khẩn cấp! Đen: Chốt 3 hay Chốt 7?',
        19: 'Bình Xe tróc Mã — tinh chuẩn.',
        20: 'Thăng Xe bảo vệ Mã — bắt buộc.',
        21: 'Hay!',
        22: 'Lại một nước bị ép buộc.',
        27: 'Đỏ chiếm ưu thế áp đảo.',
      },
      h: { 17: 'p035_0' },
      v: [
        { from: 'main', after: 11, m: 'X1.1', k: { 1: 'Hoành Xe — dùng sức phản kích song hoành Xe: có mục tiêu hơn.' } },
        { from: 'main', after: 15, m: 'X4.6 X8.2', k: { 1: 'Quấy nhiễu…', 2: '…Đen uổng công vô ích.' } },
        { from: 'main', after: 16, m: 'P8-5 M7.5 X8.9 M3/2 P5.4 S4.5', k: { 6: 'Đỏ đắc Chốt giữa nhưng hình trận không ổn chắc — Đen có cơ phản kích.' } },
        { from: 'main', after: 16, m: 'X2.6 B3.1 X2-3 B3.1 X3.1 B3.1', k: { 6: 'Đen phế Mã đắc thế, Đỏ được không bù mất.' } },
        { from: 'main', after: 17, m: 'S4.5 X2-3 P5-4 X3/1 P4.7 P8-5', k: { 1: 'Phòng thủ tiêu cực…', 6: '…Đỏ đắc quân thắng thế.' } },
        { from: 'main', after: 18, m: 'P8-3 M7/5 X8.9 M3/2', k: { 4: 'Thế công Đỏ suy yếu.' } },
        { from: 'main', after: 19, m: 'M7/5 P8-7 X2.9 M7/8', k: { 1: 'Sai lầm…', 4: '…tiếp theo Xe bình 6 — Đen vô phương né tránh.' } },
        { from: 'main', after: 21, m: 'B3.1 X8.7 P5-2 X7-8 P2.2 P7.3', k: { 6: 'Đen lập tức sụp đổ.' } },
        { from: 'main', after: 25, m: 'X4-3 P7.3', k: { 2: 'Chiếu Tướng rút Xe.' } },
        { from: 'main', after: 17, m: 'B7.1 X2-3 M3/5 P8.1 V7.9 P8-3 X2.9 P3-9 X2/7 P9-5 X2-5 B5.1 B7.1 X3/4 X4-7 X3.1 V9.7 B5.1', k: { 4: 'Tiến Pháo đánh Mã — hung hãn. Đen: phi Tượng hay bình Xe?', 6: 'Hay!', 12: 'Một Xe đổi hai, chiếm hết tiên thủ — xông Chốt mãnh công.', 18: 'Đen không cách nào giải trừ điểm yếu Mã oa tâm — Đỏ thắng thế.' }, h: { 4: 'p036_0' } },
        { from: 9, after: 21, m: 'P1/1 P8-3 X2.9 P5.4 V7.9 X3-2', k: { 6: 'Tuyệt sát!' } },
        { from: 9, after: 21, m: 'B7.1 P8-3 X2.9 P3.2 M5/7 M7/8', k: { 6: 'Đỏ ưu thế lớn.' } },
        { from: 9, after: 21, m: 'X2-1 P8-3 P1-7 P5.4 X4/1 M7.6 B7.1 X8.2 P7.5 X8-3 X4.2 Xs-4 B7-6 X3-4', k: { 3: 'Pháo đánh Pháo — mong kiềm chế.', 6: 'Nước hay công thủ vẹn toàn.', 14: 'Số kiếp đã định — tiếp theo diệt Chốt, mượn mặt Tướng trợ công.' } },
        { from: 12, after: 23, m: 'M5.7 X8.7', k: { 2: 'Đen khó ứng phó.' } },
        { from: 12, after: 29, m: 'B7.1 S4.5 B7.1 X3-4 P7-9 Tg5-4 P9/2 X8-3', k: { 8: 'Đỏ thắng chắc.' } },
        { from: 12, after: 29, m: 'X4-5 M6.5 M5.3 X3/1 M3.5 X3/3', k: { 6: 'Đỏ hơn quân cũng thắng.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 10, t: 'Đột Phát Lãnh Tiễn',
      s: 'Thuận Pháo: Đỏ quăng Mã biên (kiểu cũ), Đen Xe sườn lặn lội xuống hoành 2 thực thi "phong tỏa một cánh" — làm vội làm vàng. Đỏ bất ngờ bình Xe ép đổi — mũi tên lạnh bắn lén; dù Đen thoái Mã hay đau lòng phế Mã, Đỏ đều chiếm ưu khá lớn.',
      c: `<p>Đỏ <strong>quăng Mã trái lên biên</strong> — cách kiểu cũ, ổn chắc nhưng thế công không đủ. Đen <strong>Xe sườn tiến gấp xuống hoành 2</strong>, chuẩn bị chiến thuật "phong tỏa một cánh". Đỏ Xe tuyến Chốt tăng áp lực lên Mã Đen; Đen bình Xe phong tỏa — <strong>làm vội làm vàng</strong> (nên xuất chủ lực cánh phải trước rồi mới phong tỏa).</p>
<p>Đỏ nắm điểm yếu, <strong>bất ngờ bình Xe ép đổi</strong> — "đột phát lãnh tiễn"! Đen ăn Xe, Đỏ lui Mã ăn lại rồi bình Xe đánh Mã. Đen có 2 cách:</p>
<ul>
<li><strong>Thoái Mã</strong> (mạch chính): Đỏ Pháo đánh Chốt giữa, <strong>xuất Tướng trợ công</strong> phá phòng vệ cửu cung — hình trận Đen tan nát.</li>
<li><strong>Nhảy Mã (phế lại một Mã)</strong>: nén đau tránh tổn thất lớn hơn. Đỏ phi Pháo đánh Chốt tinh xảo thực dụng — hơn Chốt chiếm ưu.</li>
</ul>
<h2>Bài học</h2>
<p>Ở giai đoạn bố cục, một quân (thường là Xe) vận dụng quá nhiều lần thì chỗ hại dễ thấy: ảnh hưởng xuất động toàn bộ quân lực.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 X9.1 M8.9 X9-4 S4.5 X4.7 X2.6 X4-2 X9-8 X2.1 M9/8 P2.7 X2-3 M7/8 X3.3 M8.9 P5.4 S4.5 Tg5-4 Tg5-4 P5.2 M2.3 X3-4 Tg4.1 P5-1',
      k: {
        7: 'Quăng Mã biên — cách kiểu cũ: ổn chắc nhưng thế công không đủ.',
        10: 'Xe sườn tiến gấp xuống hoành 2 — chuẩn bị "phong tỏa một cánh".',
        11: 'Tiến Xe tuyến Chốt tăng áp lực lên Mã Đen — đối chọi gay gắt.',
        12: 'Làm vội làm vàng — dẫn đến thất thế.',
        13: 'Bất ngờ phát lãnh tiễn!',
        16: 'Không ăn Mã thì Xe trái mất trắng — Đen trúng đòn bất ngờ.',
        17: 'Bình Xe đánh Mã. Đen: thoái Mã hay nhảy Mã?',
        23: 'Xuất Tướng trợ công — phá phòng vệ cửu cung, đơn giản dễ làm.',
        29: 'Hình trận Đen tan nát — Đỏ ưu thế lớn.',
      },
      h: { 17: 'p038_0' },
      v: [
        { from: 'main', after: 11, m: 'B1.1 X2-3 M2.1 B3.1 X4-2', k: { 1: 'Nên xuất chủ lực cánh phải trước…', 5: '…rồi mới phong tỏa — hợp lý.' } },
        { from: 'main', after: 12, m: 'P8-6 B1.1 X2-3 B1.1 B9.1 X1.5 P6.5 P5/1', k: { 8: 'Cục thế Đen có sức bật.' } },
        { from: 'main', after: 15, m: 'M2.1 M8.9 P2-4 B9.1 X1-2 P8.2 X2.4 X2-3', k: { 8: 'Đỏ nắm chắc ưu thế.' } },
        { from: 'main', after: 17, m: 'M7/9 P5.4 S4.5 P8.6', k: { 4: 'Đỏ lập tức đoạt lại một quân, chiếm ưu.' } },
        { from: 'main', after: 17, m: 'M2.3 X3.1 X1-2 P8-7 X2.6 P7.4 S4.5 B7.1 P2/2 S5.6', k: { 1: 'Nén đau phế lại một Mã — tránh tổn thất lớn hơn.', 6: 'Phi Pháo đánh Chốt tiên thủ — tinh xảo thực dụng.', 10: 'Đỏ hơn Chốt chiếm ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 11, t: 'Không Hề Cấp Bách',
      s: 'Thuận Pháo trực Xe: Đen bình Pháo đè Mã — không hề cấp bách, ảnh hưởng xuất động quân khác, là nước mấu chốt tạo nghi hình. Đỏ thăng Xe tuần hà che giấu thực lực, ép Pháo Đen đánh Chốt mất tiên; dù Đen xuất Xe hay tháo Pháo, Đỏ đều bắt Đen bị động chịu đòn.',
      c: `<p>Đen tiến Pháo rồi <strong>bình Pháo đè Mã</strong> — không hề cấp bách, dễ ảnh hưởng xuất động các quân khác: nước mấu chốt tạo thành nghi hình (nên nhảy Mã xuất quân đồng đều).</p>
<p>Đỏ <strong>thăng Xe tuần hà</strong> — trông bình thường, thực ra che giấu thực lực, hàm súc có lực. Đen xuất Xe thế tất phải tranh; Đỏ bình Xe sườn, Đen bị ép Pháo đánh Chốt (để tránh Xe lui bắt chết Pháo) — mất một tiên. Đỏ tập kết chủ lực cánh trái; Đen có 2 cách:</p>
<ul>
<li><strong>Xe 1 bình 2</strong> (mạch chính): Đỏ <strong>phế Chốt tranh công</strong> hung hãn, Đen phải trốn Xe; Đen phế Chốt trì hoãn — Đỏ thoái Mã về, công thủ lưỡng lợi, rõ ràng chiếm ưu.</li>
<li><strong>Tháo Pháo liên kết phòng tuyến</strong> (phương châm thường dùng khi hạ phong): Đỏ Xe sườn chặt chẽ, <strong>tiến Pháo mời đổi</strong> — "chính binh tương ứng, kỳ binh chế thắng" — Đen đối diện nan đề phòng ngự.</li>
</ul>
<h2>Bài học</h2>
<p>Đi nước chưa thật sự cần thiết, thiếu mục tiêu, sẽ dễ bị đối thủ thừa cơ lợi dụng.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 B7.1 B7.1 P2.4 M8.7 P2-3 X2.4 X9-8 X2-6 P3-7 V3.1 M2.3 X9-8 X1-2 B7.1 B3.1 M7.8 X2-1 P8-7 B3.1 X6-7 M3.4 P7.7 S4.5 M8/7',
      k: {
        10: 'Bình Pháo đè Mã — không hề cấp bách, mấu chốt tạo nghi hình.',
        11: 'Thăng Xe tuần hà — che giấu thực lực, hàm súc có lực!',
        12: 'Thế tất phải tranh.',
        13: 'Hay!',
        14: 'Bị ép bình Pháo đánh Chốt — mất một tiên, rơi vào bị động.',
        17: 'Xuất Xe — tập kết chủ lực cánh trái. Đen: bình Xe hay tháo Pháo?',
        19: 'Phế Chốt tranh công — hung hãn!',
        22: 'Trốn Xe — bất đắc dĩ.',
        24: 'Phế Chốt mong trì hoãn thế công.',
        29: 'Thoái Mã về — công thủ lưỡng lợi, Đỏ rõ ràng chiếm ưu.',
      },
      h: { 17: 'p040_0' },
      v: [
        { from: 'main', after: 9, m: 'M2.3', k: { 1: 'Xuất quân đồng đều — hợp lý hơn.' } },
        { from: 'main', after: 10, m: 'X9-8 M2.3 P8-9 X9.1', k: { 1: 'Đi cờ tự nhiên…', 4: '…Đen có thể phản kích.' } },
        { from: 'main', after: 11, m: 'M2.3 B3.1 B7.1 X2-3 X9.2 M3.4', k: { 6: 'Phục Mã tiến 6 — Đỏ chiếm hết tiên cơ.' } },
        { from: 'main', after: 16, m: 'M7.8', k: { 1: 'Cũng tốt.' } },
        { from: 'main', after: 18, m: 'P8.4 S4.5', k: { 2: 'Đen không trở ngại gì lớn.' } },
        { from: 'main', after: 21, m: 'M3.2 M8.6', k: { 2: 'Tiếp theo Pháo bình 8 — Đen khó ứng phó.' } },
        { from: 'main', after: 23, m: 'M3.2 X6.1 B3.1 X6-8 B3-2 X8-3 M7.8 X8.4 V7.9 X3.1', k: { 10: 'Hình trận Đen tan tác.' } },
        { from: 'main', after: 23, m: 'X1.2 M8.6 M3/5 X8.8', k: { 4: 'Đen khó lòng chống đỡ.' } },
        { from: 'main', after: 17, m: 'P5-6 X6-4 S6.5 P8.5 V3.5 M7.6 X8.3 M6.7', k: { 1: 'Tháo Pháo liên kết phòng tuyến — cố thủ đợi biến.', 2: 'Chặt chẽ — phá thủ đoạn phản kích của Đen.', 4: 'Tiến Pháo mời đổi — "chính binh tương ứng, kỳ binh chế thắng".', 8: 'Phục Mã vào giữa công kích — Đen đối diện nan đề phòng ngự.' } },
        { from: 8, after: 21, m: 'P6-2 X8.7 X1.2 X8/1', k: { 4: 'Mã cánh phải Đen lộ rõ — mục tiêu tấn công chính.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 12, t: 'Mộng Bút Sinh Hoa',
      s: 'Thuận Pháo trực Xe: Đen tiến Pháo rồi khởi hoành Xe trái — không ăn khớp. Đỏ nhảy Mã ngoài rập khuôn hay thăng Xe tuần hà đều không đạt; diệu phế Chốt 3 rồi Xe tuyến Chốt mới là cấu tứ hay — đẹp như "mộng bút sinh hoa".',
      c: `<p>Đen tiến Pháo rồi <strong>khởi hoành Xe trái</strong> — không ăn khớp với nước tiến Pháo trước (chính xác: nhảy Mã). Điểm này chỉ hiện ra dưới sự công kích chặt chẽ, chuẩn xác. Đỏ có 3 cách:</p>
<ul>
<li><strong>Phế Chốt 3</strong> (mạch chính): nước phi thường — chỉ ai ý thức sâu sắc điểm yếu tiềm tàng mới đánh ra. Đỏ <strong>Xe tuyến Chốt</strong> tiếp nối; Đen ăn Chốt thì Đỏ nhảy Mã xuất kích táo bạo, phế quân cướp công — ưu thế áp đảo. Đen nhảy Mã ngoan cường thì Đỏ thoái Xe đơn giản, nhảy Mã cản Pháo — mượn ưu thế không gian giành nhiều cơ hội.</li>
<li><strong>Mã ngoài</strong>: quá máy móc, rập khuôn tư duy đối phó Mã chính. Đen quăng Mã biên cơ động — Đỏ mất phương hướng, Đen phản tiên.</li>
<li><strong>Thăng Xe tuần hà</strong>: hiệu suất không cao. Đen liên kết bá vương Xe — nghi hình thành hình tốt, bỏ trước đoạt sau thu hồi quân.</li>
</ul>
<h2>Bài học</h2>
<p>Đỏ phá quy tắc thông thường, dùng chuỗi tổ hợp chiến thuật lấy phế Chốt làm bàn đạp — kết hợp tinh thần dũng cảm và thiện nghệ tróc bắt cơ trí.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 B7.1 B7.1 P2.4 M8.7 X9.1 B3.1 B7.1 X2.6 B7.1 X2-3 X9.1 M7.6 B7.1 P8-3 M7/9 X9-8 P2-9 X8.8',
      k: {
        10: 'Khởi hoành Xe trái — không ăn khớp với nước tiến Pháo. Đỏ: Mã ngoài, Xe tuần hà hay Chốt 3?',
        11: 'Một nước phi thường — ý thức sâu sắc điểm yếu tiềm tàng.',
        13: 'Xe tuyến Chốt — thủ đoạn tiếp nối sau phế Chốt. Đen: ăn Chốt hay nhảy Mã?',
        17: 'Nhảy Mã xuất kích — đầy khát vọng và táo bạo.',
        23: 'Đỏ phế quân cướp công — ưu thế áp đảo.',
      },
      h: { 10: 'p042_0', 13: 'p043_0' },
      v: [
        { from: 'main', after: 9, m: 'M2.3 M7.8 X9.1', k: { 3: 'Thành bố cục thịnh hành.' } },
        { from: 'main', after: 10, m: 'M7.8 M2.1 B9.1 X1.1 B9.1 B1.1 X9.5 M1.2 X9.3 X9-1 X2.4 X1-4', k: { 1: 'Mã ngoài — quá máy móc.', 2: 'Cơ động linh hoạt — Đỏ mất phương hướng.', 4: 'Hay!', 12: 'Tiếp theo Mã tiến 4, Xe tiến 6… — Đen phản tiên.' } },
        { from: 1, after: 10, m: 'M7.6 X9-4 M6.7 M2.3', k: { 4: 'Đỏ không có lợi.' } },
        { from: 'main', after: 10, m: 'X2.4 P2-7 V3.1 X1.1 M7.8 X9-8 X2.4 X1-8 P8.7 X8-2 M8.7 X2/1', k: { 1: 'Thăng Xe — hiệu suất không cao.', 4: 'Liên kết bá vương Xe — nghi hình thành hình tốt!', 6: 'Hay!', 12: 'Bỏ trước đoạt sau thu hồi một quân — cục diện không tệ.' } },
        { from: 3, after: 16, m: 'X2-4 X8-6', k: { 2: 'Đỏ không có lợi.' } },
        { from: 'main', after: 13, m: 'M7.6 X2-4 M6.7 P5.4 S4.5 V7.5', k: { 6: 'Đỏ rõ ràng chủ động.' } },
        { from: 'main', after: 13, m: 'M2.3 X2-3 X9.1 X3/2 P2/5 M3.4 P2-7 M4.3 X9-8 X9-8 X1-2 P8.6 P5-4 P8/2', k: { 1: 'Nhanh xuất chủ lực — ngoan cường.', 4: 'Đơn giản có lực.', 6: 'Mấu chốt giữ ưu thế!', 8: 'Nhảy Mã cản Pháo — trong cứng rắn có hung ác.', 14: 'Trong cục diện giằng co, Đỏ chiếm ưu.' } },
        { from: 6, after: 16, m: 'M7.6 P2/5 M6.4 P2-7 X3.1 X9-7 M4.3 X1-2 P8-7 B7.1', k: { 1: 'Kiên quyết công kích…', 10: '…Đen phế quân phản kích, Đỏ được không bù mất.' } },
        { from: 6, after: 18, m: 'M7.6 P2.4', k: {} },
        { from: 6, after: 18, m: 'X3-2 P2-7 M7.6 X1-2 P8-7 X2.4', k: { 6: 'Đen đối kháng được.' } },
        { from: 6, after: 21, m: 'X1-2 X9-8 X2.4 P8-9 X2-6 X8.6', k: {} },
        { from: 6, after: 23, m: 'S4.5 P8.6', k: { 2: 'Ép đổi.' } },
        { from: 6, after: 25, m: 'P5-6 B5.1 X8.1 M3.5 X2.1 X3.3 X2.8 M5.7 P7-4 X3-4 X2/7 X4-6 X8/2 B5.1', k: { 14: 'Thế công Đỏ mãnh liệt.' } },
        { from: 6, after: 27, m: 'X8.1 P8-5 M7.5 M3.4', k: { 4: 'Đỏ ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 13, t: 'Sẵn Sàng Ra Trận',
      s: 'Thuận Pháo trực Xe: Đen cướp thúc Chốt 3 sớm — chủ lực chậm, lộ ý đồ quá sớm. Đỏ bình Pháo ra biên xuất Xe; Đen bình Pháo dọa Mã rồi quăng Mã biên. Đỏ Xe kỵ hà tróc Chốt thiếu tinh vi; Pháo nổ Chốt biên rồi bình Pháo phòng thủ phản công mới đơn giản dứt khoát — ưu thế tàn cuộc.',
      c: `<p>Đen <strong>cướp thúc Chốt 3</strong> — nôn nóng: chủ lực xuất chậm, lộ ý đồ sớm, hình trận chênh vênh (chính xác: nhảy Mã). Đỏ <strong>bình Pháo ra biên</strong> chuẩn bị xuất Xe tróc Pháo; Đen bình Pháo uy hiếp Mã trái, đẩy cục diện kịch liệt; Đỏ xuất Xe, Đen <strong>quăng Mã biên</strong> bắt buộc. Đỏ có 2 cách:</p>
<ul>
<li><strong>Pháo nổ Chốt biên</strong> (mạch chính): phòng thủ phản công, thỏa đáng. Đỏ bình Pháo "qua cửa", Đen bình Xe mời đổi thất tiên (bắt buộc); <strong>Chốt 9 Đỏ hùng hổ</strong> trở thành lực lượng quyết định — Đen khổ chiến.</li>
<li><strong>Xe kỵ hà tróc Chốt</strong>: "lấy công chế công" tích cực nhưng phối hợp không đủ tinh vi; Đen nhấc Pháo lấy căn — sức bật "5-3 Pháo" thể hiện đầy đủ, Mã oa tâm Đỏ bị khốn.</li>
</ul>
<h2>Bài học</h2>
<p>Trong trận địa chiến đấu Pháo, bên hậu thủ mà 4 nước đầu đã đi 2 nước Chốt — thế lưỡng đầu xà tạm khắc chế Mã Đỏ nhưng ảnh hưởng xuất động chủ lực, khó tránh thua thiệt tổng thể.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 B7.1 M8.7 B3.1 P8-9 P2-3 X9-8 M2.1 P9.4 X1-2 P9-7 X2.9 P7.3 S4.5 M7/8 X9-8 X2.9 M7/8 M8.9 M8.7 B9.1',
      k: {
        8: 'Cướp thúc Chốt 3 — nôn nóng, chủ lực xuất chậm.',
        9: 'Bình Pháo ra biên — chuẩn bị xuất Xe, triển khai thế công toàn diện.',
        10: 'Bình Pháo uy hiếp Mã trái — đẩy cục diện kịch liệt.',
        11: 'Xuất Xe — động thái liền mạch.',
        12: 'Quăng Mã biên — bắt buộc. Đỏ: Xe kỵ hà hay Pháo nổ Chốt biên?',
        13: 'Pháo nổ Chốt biên — phòng thủ phản công, thỏa đáng.',
        15: 'Hay!',
        20: 'Bình Xe mời đổi thất tiên — bắt buộc.',
        25: 'Chốt 9 hùng hổ — lực lượng quyết định; Đen sẽ khổ chiến vì nó.',
      },
      h: { 12: 'p046_0' },
      v: [
        { from: 'main', after: 7, m: 'M2.3', k: { 1: 'Chính xác — có cơ sở.' } },
        { from: 'main', after: 8, m: 'X2.4 X9-8 X2-6 X8.6 B7.1 X8-7 P5/1 P2-3', k: { 8: 'Lộ biến kịch liệt — Đỏ khá ưu nhưng Đen cũng có cơ hội chiến thuật.' } },
        { from: 'main', after: 9, m: 'M2.3 X9-8 X1-2 X8.4 P2-1 X8.5 M3/2 X2.4 X9-8 X2-8 M2.3 B7.1', k: { 1: 'Cầu bình ổn…', 12: '…lưỡng đầu xà Đen bị phá, cánh phải bị tấn công.' } },
        { from: 'main', after: 10, m: 'X2.4 X9-8', k: { 1: 'Chậm chạp…', 2: '…Đen mời đổi tranh tiên.' } },
        { from: 'main', after: 11, m: 'B3.1 X8.8 B3.1 M7/9', k: { 4: 'Đen sung sướng nhất thời nhưng sẽ mất quân.' } },
        { from: 'main', after: 12, m: 'X8.5 X1-2 X8-7 P3.1 X7-3 X9.2 M7/5 X2.8 P9-7 X2-4 P7.4 M1.3', k: { 1: 'Xe kỵ hà tróc Chốt — "lấy công chế công" nhưng thiếu tinh vi.', 2: 'Chính xác.', 3: 'Xe sát Chốt — miễn cưỡng.', 4: 'Nhấc Pháo lấy căn — sức bật "5-3 Pháo".', 12: 'Mã oa tâm Đỏ bị khốn, bốn bề nguy cơ.' } },
        { from: 5, after: 13, m: 'B3.1 X8-7 P3.1 P9.4 X1-2 P9-5 M7.5 P5.4 S4.5 B7.1', k: { 10: 'Chiến thuật Đen bị hóa giải.' } },
        { from: 5, after: 13, m: 'P3.4 M7/5', k: { 2: 'Thế quân Đen lỏng lẻo.' } },
        { from: 5, after: 14, m: 'X8.4 M1/2 X2.4', k: { 3: 'Công thủ cân bằng.' } },
        { from: 5, after: 19, m: 'P5-3', k: { 1: 'Cũng tốt.' } },
        { from: 'main', after: 13, m: 'M1.3 X8.6 M3.5 B5.1 M5/7 X2.6 P5.3 M7.5 P5.2 X2-3', k: { 10: 'Đỏ đắc quân.' } },
        { from: 'main', after: 13, m: 'M1/3 P9-7 M3.1 X8.6', k: { 4: 'Đỏ chủ động.' } },
        { from: 'main', after: 15, m: 'P3-4 X8.9 M1/2 X2.4 M2.1 P7-9', k: { 6: 'Tiếp theo đổi Chốt 3 Chốt 7 — hình thế có lợi.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 14, t: 'Hình Trận Lý Tưởng',
      s: 'Thuận Pháo trực Xe: Đỏ nhảy Mã sớm rồi thăng Pháo bảo vệ Mã, xây công sự bờ sông chờ bình Pháo chỉnh hình — "hình trận lý tưởng" chỉ là suy nghĩ đơn phương. Đen phòng thủ tiêu cực thì Đỏ thuận lợi; Đen thúc Chốt 3 phản kích, bình Pháo cản trở, bình Xe chuyển mình — xé toang mặt nạ.',
      c: `<p>Đỏ <strong>nhảy Mã xuất kích</strong> có phần sớm, rồi <strong>thăng Pháo bảo vệ Mã</strong> — xây công sự bờ sông, chờ Pháo bình 6 điều chỉnh. Tất cả chỉ là suy nghĩ đơn phương (nên Mã tiến 7). Đỏ dọa bình Pháo đánh Xe; Đen có 3 cách:</p>
<ul>
<li><strong>Thúc Chốt 3</strong> (mạch chính): lợi dụng lúc hình trận Đỏ chưa ổn mà phản kích — nước có lực điển hình. Đỏ bình Pháo thì Đen <strong>bình Pháo cản trở</strong>, trong thủ tàng công; Đỏ phi Tượng phòng thủ thì Đen bình Xe chuyển mình — "vén mây thấy trời xanh", Đỏ "tứ diện sở ca".</li>
<li><strong>Xe chặn Mã</strong>: tiêu cực, cục diện bị động — điểm yếu Mã cánh phải Đen lộ ra.</li>
<li><strong>Tiến Pháo</strong>: giải trừ uy hiếp nhưng Đỏ làm ngơ thì vô vị; Đỏ bình Pháo công cánh bên, kiềm chế tuyến 3 Đen.</li>
</ul>
<h2>Bài học</h2>
<p>"Hình trận lý tưởng" mà Đỏ một lòng xây dựng không hề lý tưởng: chưa ổn chắc, một khi bị nhìn thấu thì trở thành nghi hình thật sự.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 B7.1 M8.7 M2.3 B7.1 X1.1 M7.6 X1-4 P8.2 B3.1 P5-6 P5-4 P6.5 X4.1 V7.5 B3.1 V5.7 M3.4',
      k: {
        11: 'Nhảy Mã xuất kích — có phần quá sớm.',
        13: 'Thăng Pháo bảo vệ Mã — suy nghĩ đơn phương (nên Mã tiến 7). Đen: Xe chặn Mã, tiến Pháo hay Chốt 3?',
        14: 'Phản kích lúc hình trận Đỏ chưa ổn — nước có lực điển hình. Đỏ: bình Pháo hay phi Tượng?',
        16: 'Bình Pháo cản trở — trong thủ tàng công, kế hoạch bên bờ của Đỏ phá sản.',
        17: 'Bắt buộc.',
        22: 'Đen chiếm tiên thủ lớn.',
      },
      h: { 13: '!p048_0', 14: '!p049_0' },
      v: [
        { from: 'main', after: 12, m: 'M6.7 P2.4 P8-7 P2-3 X9-8', k: { 5: 'Cục diện kiêng dè lẫn nhau.' } },
        { from: 'main', after: 13, m: 'X4.3 P5-6 X4-2 P8.3 P5-2 V7.5', k: { 1: 'Chặn Mã — tiêu cực.', 6: 'Điểm yếu Mã cánh phải Đen lộ ra — Đỏ dần mở rộng chủ động.' } },
        { from: 'main', after: 13, m: 'P2.2 S6.5 P2-4 P5-7', k: { 1: 'Giải trừ uy hiếp đánh Xe — nhưng Đỏ làm ngơ thì vô vị.', 2: 'Lấy tĩnh chế động.', 4: 'Bình Pháo công cánh bên — tuyến 3 Đen bị kiềm chế, Đỏ ưu.' } },
        { from: 2, after: 14, m: 'P5-6 P2-4', k: { 2: 'Đen phản tiên.' } },
        { from: 'main', after: 15, m: 'M3.4 B7.1 X4-3 P6.3 X3.3 P6.2', k: { 6: 'Đen có nguy cơ mất quân.' } },
        { from: 'main', after: 16, m: 'M6.5 P4-5', k: { 2: 'Đen ưu.' } },
        { from: 'main', after: 16, m: 'M6.4 P4.7', k: { 2: 'Đen ưu.' } },
        { from: 'main', after: 14, m: 'V7.9 B3.1 V9.7 M3.4 P5-6 X4-3 P6.3 X3.4', k: { 1: 'Bị ép phòng thủ — không cứu vãn được.', 6: 'Bình Xe chuyển mình — vén mây thấy trời xanh!', 8: 'Bỏ trước đoạt sau — Đen đoạt Tượng chiếm ưu lớn.' } },
      ],
      kq: 'uu-den',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
