// Cạm Bẫy — Chương 3: Trung Pháo đối Liệt Pháo và Hậu bổ Liệt Pháo. Nước đi chép từ sách; lời giảng viết lại bằng lời riêng.
module.exports = {
  ch: 3, ten: 'Trung Pháo Đối Liệt Pháo Và Hậu Bổ Liệt Pháo', level: 'trung-cap',
  y: 'Liệt Pháo (hai bên cùng Pháo đầu, ngược phía) là thế trận đối công gay gắt. Cạm bẫy thường gặp: phế Tượng dụ Xe, bình Pháo lạ lùng, bình Pháo đánh Mã… Phá bẫy nhờ nhìn thấu mục đích và chọn đúng nước tranh tiên.',
  cuoc: [
    {
      n: 35, t: 'Phế Tượng Bẫy Xe',
      s: 'Đen khởi hoành Xe ngược kỳ đạo, rồi thoái Mã dùng Tượng đáy làm mồi dụ Xe Đỏ vào vòng vây. Đỏ ăn Tượng thì Xe bị khóa, phải phế Mã; nhảy Mã trái phớt lờ, rồi "duyên hà thập bát đả" giáng đòn phủ đầu thì Đỏ giành ưu thế.',
      c: `<p>Liệt Pháo: Đỏ tiến Xe tấn công gấp (cũng có thể nhảy Mã trái hoặc bình Pháo 6 — ổn chắc). Đối diện uy hiếp bình Xe đánh Mã, lẽ ra Đen nên Xe bình 2 cướp tiên lại; ở đây Đen <strong>khởi hoành Xe tận lực cầu biến</strong> — ngược kỳ đạo, để bố trí cạm bẫy. Đỏ bình Xe quét Chốt; Đen <strong>thoái Mã giả vờ bất đắc dĩ</strong> — thực ra dùng Tượng đáy làm mồi dẫn dụ Xe Đỏ vào vòng vây.</p>
<ul>
<li><strong>Xe ăn Tượng</strong> (mạch chính): trúng kế — dũng cảm đáng khen nhưng dùng sai chỗ. Đen bình Pháo khóa Xe, Xe Đỏ lâm cảnh ngục tù; Đỏ thăng Pháo nén đau phế Mã — Đen hơn quân chiếm ưu.</li>
<li><strong>Mã trái tiến</strong> (nhánh phụ): phớt lờ, "dội cho Đen một gáo nước lạnh". Đen bình Pháo kìm Xe — kế đầu không thành lại bày kế khác; Đỏ thăng Pháo, bình Pháo giữa cướp tiên làm loạn, Xe sát Chốt giữa "thạch phá thiên kinh" — Đỏ lên Tướng hữu kinh vô hiểm, nhanh chân hơn.</li>
</ul>
<h2>Bài học</h2>
<p>Cạm bẫy ở cuộc này có cảm giác gượng ép, thực ra là đánh cầu may; bị nhìn thấu thì "trộm gà không được, lại mất nắm thóc". Dù vậy, nếu Đỏ tham ăn Tượng đáy thì chiến thuật vây khốn của Đen vẫn đáng tham khảo.</p>`,
      m: 'P2-5 P2-5 M2.3 M2.3 X1-2 M8.7 X2.6 X1.1 X2-3 M7/8 X3.3 P5-7 P8.2 V3.5 P8-1 P7.5 P1.5 P7/7 P1-3 V5/7',
      k: {
        7: 'Tiến Xe tấn công gấp (Mã tiến 7, Pháo bình 6 khá ổn chắc).',
        8: 'Khởi hoành Xe tận lực cầu biến — ngược kỳ đạo, ý là bố trí cạm bẫy (nên Xe bình 2 cướp tiên lại).',
        9: 'Bình Xe quét Chốt — đương nhiên.',
        10: 'Thoái Mã giả vờ bất đắc dĩ — thực ra là cạm bẫy: dùng Tượng đáy làm mồi dẫn Xe Đỏ vào vòng vây. Đỏ: Xe ăn Tượng hay Mã tiến 7?',
        11: 'Trúng kế! Tinh thần dũng cảm đáng khen nhưng dùng không đúng chỗ.',
        12: 'Bình Pháo khóa Xe — Xe Đỏ lâm cảnh ngục tù.',
        13: 'Lâm khốn cảnh — thăng Pháo nén đau phế Mã, bất đắc dĩ.',
        14: 'Cũng có thể Pháo tiến 5 trực tiếp đắc quân — nhưng Đen không vội, muốn lợi lớn hơn.',
        15: 'Ngoan cường nhất (Pháo bình 3 thì Pháo Đen tiến 4, Đỏ càng bất lợi).',
        18: 'Khá giản dị.',
        20: 'Đen hơn quân chiếm ưu.',
      },
      h: { 10: 'p122_0' },
      v: [
        { from: 'main', after: 7, m: 'X1-2 M8.7 B3.1 X2-3 M7/5 X9-8 X2.6 P8-9 X2-3 X8.2 X9.1', k: { 1: 'Nên Xe bình 2 cướp tiên lại…', 11: '…cục diện đối công.' } },
        { from: 'main', after: 14, m: 'P8-3 P7.4', k: { 1: 'Nếu Pháo bình 3…', 2: '…Đỏ càng bất lợi.' } },
        { from: 'main', after: 15, m: 'P8-9 X3-2 X9-8 P1.3 X1-9 P1-5 P7.5 Pt-6 X9-4', k: { 1: 'Nếu Pháo bình 9…', 9: '…Đỏ không sức chống đỡ.' } },
        { from: 'main', after: 10, m: 'M8.7 P8-7 P8.2 P5/1 P8-1 V7.9 P1-5 V3.5 P5.3 P5-7 X3-5 Pt.5 X5-6 Pt-3 X9-8 P7.8 Tg5.1 M8.7 X6.1', k: { 1: 'Nhảy Mã trái — phớt lờ, như dội cho Đen một gáo nước lạnh.', 2: 'Bình Pháo kìm Xe — kế đầu không thành lại bày kế khác.', 3: 'Pháo tiến 2!', 5: 'Pháo bình 1 — cướp tiên làm loạn trước khi Đen dùng Pháo trùng công kích.', 6: 'Phi Tượng bắt buộc.', 7: 'Chính xác — có thể chắc đoạt ưu thế.', 8: 'Không tiếc bỏ Tượng để tìm chút bù đắp.', 11: 'Xe sát Chốt giữa — thạch phá thiên kinh!', 13: 'Cũng có thể lui Mã giữa vững bước — nhưng không hung ác bằng.', 19: 'Đỏ lên Tướng hữu kinh vô hiểm — trong đối công nhanh chân hơn.' } },
        { from: 3, after: 11, m: 'M8.9 B7.1 X1-4 X3/2 X9-8 M7.6', k: { 1: 'Nếu Mã tiến biên…', 6: '…Đỏ giữ chắc tiên thủ.' } },
        { from: 3, after: 15, m: 'P5-7 P5.4 Tg5.1 X3-4', k: { 1: 'Nếu Pháo bình 7…', 4: '…Đen khó đối phó.' } },
        { from: 3, after: 16, m: 'X9.1 P5-7 X3-1 M8.6', k: { 1: 'Nếu Xe biên tiến…', 4: '…Đỏ có chỗ kiêng dè.' } },
        { from: 3, after: 17, m: 'P5.4 B5.1 P7-5 M3.5 M8.6 X3-4 B3.1 X4/1', k: { 1: 'Nếu Pháo tiến 4…', 8: '…Đỏ cũng ưu.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 36, t: 'Cờ Nhanh Một Nước',
      s: 'Đại liệt Pháo, Đen bình Pháo lộ 7 lạ lùng — cạm bẫy bố cục điển hình. Đỏ tiến Xe đè Mã theo cảm giác người mới thì Đen đắc thủ nhanh; nhảy Mã biên thuận thế, thành hình cờ đối xứng mà Đỏ nhanh hơn một nước — nắm chắc chủ động.',
      c: `<p>Đại liệt thủ Pháo. Đen <strong>bình Pháo lộ 7</strong> — cách đi lạ lùng, cũng là cạm bẫy bố cục điển hình (nước khá tốt là nhảy Mã 7). Đỏ có ba cách:</p>
<ul>
<li><strong>Xe tiến 8 đè Mã</strong> (mạch chính): cảm giác đầu tiên của người sơ cấp. Đổi Xe không lợi, Đỏ xua Pháo cản trở — liều lĩnh, bị đánh lui nhanh; Đen thoái Pháo cắt tiếp viện, một nước thoái Pháo đưa Đỏ vào khốn cảnh — không đầu Pháo Đen uy lực vô tận, thắng lợi trong tầm tay.</li>
<li><strong>Mã trái chính diện</strong>: có chút cứng nhắc, dễ bị lợi dụng; Đen điều động tràn sức sống. Đỏ bình Xe mãnh công thì Đen "ăn miếng trả miếng", xuất Tướng phòng ngự phản công — hơn quân chiếm ưu; Đỏ nâng Xe biên thì Đen phản kích chính xác — cuộc thế bình ổn.</li>
<li><strong>Mã trái lên biên</strong>: thuận theo xu thế — đối sách cao minh: hai bên thành hình cờ đối xứng mà <strong>Đỏ nhanh hơn một nước</strong>, chủ động tuyệt đối.</li>
</ul>
<h2>Bài học</h2>
<p>Các giải lớn rất hiếm dùng đại liệt thủ Pháo vì hình cờ giống nhau, bên hậu dễ thiệt. Đỏ đi biến 3 thì cạm bẫy của Đen không có đất dụng võ.</p>`,
      m: 'P2-5 P2-5 M2.3 M2.3 X1-2 P8-7 X2.8 X1.1 P8.6 P5/1 P8/4 P5.5 P5.4 P5/2 X2-9 M3/1 P8.3 M1.3 P8-3 M8.7 P5-6 X9-8',
      k: {
        6: 'Bình Pháo lộ 7 — lạ lùng, cạm bẫy bố cục điển hình (nước khá tốt là Mã tiến 7). Đỏ: Xe tiến 8, Mã tiến 7 hay Mã tiến biên?',
        7: 'Tiến Xe đè Mã — cảm giác đầu tiên của người sơ cấp, tưởng chiếm chút lợi.',
        9: 'Đổi Xe không lợi nên xua Pháo cản trở — liều lĩnh, sẽ bị đánh lui nhanh. Sáng suốt là chấp nhận đổi Xe.',
        10: 'Thoái Pháo cắt tiếp viện từ Xe Đỏ — sinh ra hàng loạt nước phản kích.',
        11: 'Lựa chọn duy nhất.',
        13: 'Quay giáo đánh lại — hy vọng mịt mờ.',
        14: 'Một nước thoái Pháo khiến Đỏ lập tức rơi vào khốn cảnh!',
        15: 'Nếu lui Xe thì Đen Mã tiến giữa — Đỏ mất Xe.',
        22: 'Không đầu Pháo Đen uy lực vô tận — thắng lợi trong tầm tay.',
      },
      h: { 6: 'p125_0' },
      v: [
        { from: 'main', after: 10, m: 'P8/5 X1-2', k: { 1: 'Nếu lui Pháo về 5…', 2: '…Xe bình 2.' } },
        { from: 'main', after: 12, m: 'M3.5 X1-8 M5.4 V7.5 M4.3 X9.2', k: { 1: 'Nếu Mã tiến giữa…', 6: '…Đen xác lập ưu thế.' } },
        { from: 'main', after: 13, m: 'M3.5 X2-9 P5/2 Tg5.1', k: { 1: 'Nếu Mã tiến giữa…', 4: '…Đỏ hơn quân chiếm ưu.' } },
        { from: 'main', after: 14, m: 'X2/3 M3.5 X2-5 P7-5', k: { 1: 'Nếu Xe lui…', 4: '…Đỏ mất Xe.' } },
        { from: 'main', after: 6, m: 'M8.7 B7.1 X2.8 X1.1 P8.6 X9.2 X9-8 X9-8 X2-7 B7.1 B3.1 P7.5 X7/1 P7-3 P5.4 S6.5 X7.2 Tg5-6', k: { 1: 'Nhảy chính Mã trái — có chút cứng nhắc, dễ bị lợi dụng.', 3: 'Dưới khiêu khích, Đỏ chọn tấn công "không mềm tay" (phi Tượng chắc hơn).', 5: 'Pháo có Xe chi viện nên tự tin tiến phong Xe.', 6: 'Nước điều động tràn sức sống. Đỏ: Xe bình 8 hay Xe biên tiến?', 8: 'Mãnh công.', 10: 'Ăn miếng trả miếng — đối đáp tốt nhất.', 18: 'Xuất Tướng phòng ngự phản công — Đen hơn quân chiếm ưu.' }, h: { 6: '!p127_0' } },
        { from: 4, after: 14, m: 'X2/1 P5-8 B5.1 P7-5', k: { 1: 'Nếu Xe lui…', 4: '…Đen cũng hài lòng.' } },
        { from: 4, after: 20, m: 'X7.2 P5.4 S6.5 X8-4', k: { 1: 'Nếu Xe tiến 2…', 4: '…trong đối công Đen khá nhanh.' } },
        { from: 4, after: 12, m: 'X9.1 B7.1 X9-2 B7-8 M3/5 P5/1 Xs.3 X1-2 Xt.1 V3.5', k: { 1: 'Thăng Xe chi viện cánh phải — trước sau không nhịp nhàng.', 2: 'Phản kích chính xác.', 4: 'Bình Chốt nhanh nhạy.', 10: 'Cuộc thế bình ổn — Đen đủ sức đối kháng.' } },
        { from: 'main', after: 6, m: 'M8.9 X1-2 P8-7 M8.9 X9.1', k: { 1: 'Nhảy Mã trái lên biên — thuận theo xu thế, đối sách cao minh.', 5: 'Hình cờ đối xứng, Đỏ nhanh hơn một nước — chủ động tuyệt đối.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 37, t: 'Cạm Bẫy Đánh Mã',
      s: 'Trung Pháo đối Hậu bổ Liệt Pháo: Đỏ bình Pháo dọa đánh Mã — cạm bẫy bộc lộ mục tiêu sớm. Đen phi Tượng thủ đơn thuần thì bị dắt mũi; lập tức xuất Xe phản kích — bỏ mặc Chốt Đỏ qua sông, tiến Xe đè Mã — thì Đen phản khách vi chủ.',
      c: `<p>Hai bên vào thế trận kinh điển <strong>Trung Pháo đối Hậu bổ Liệt Pháo</strong>. Đỏ <strong>bình Pháo dọa đánh Mã</strong> — nước có tính cạm bẫy, ép Đen phải phòng thủ. Đen có hai cách:</p>
<ul>
<li><strong>Phi Tượng</strong> (mạch chính): phòng thủ đơn thuần, như bị Đỏ dắt mũi; Đỏ Pháo tiến 4 rất thực dụng — nhẹ nhàng chiếm ưu.</li>
<li><strong>Xe bình 2</strong> (nhánh phụ): lập tức xuất Xe phản kích, không chút chậm trễ. Đỏ xông Chốt thì Đen bỏ mặc, tiến Xe đè Mã — phản kích hữu hiệu nhất, kìm quân lực cánh trái Đỏ; Đỏ nhảy Mã biên thì Đen tiến Xe kỵ hà vừa khéo, thoái Mã trong thủ tàng công — lạc quan.</li>
</ul>
<h2>Bài học</h2>
<p>Pháo bình 7 quá sớm — có cạm bẫy nhưng lộ mục tiêu sớm; cạm bẫy không thành thì dễ bị động. Nước chính xác là nhảy Mã 7 hoặc Mã biên, Đỏ vẫn giữ tiên.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 P8.4 B3.1 P2-5 B7.1 M2.3 P8-7 V3.1 P7.4 X1-2 M8.7 X2.4 X9-8 X2-8 P7-3',
      k: {
        11: 'Thế trận kinh điển Trung Pháo đối Hậu bổ Liệt Pháo. Bình Pháo dọa đánh Mã — có tính cạm bẫy. Đen: phi Tượng hay Xe bình 2?',
        12: 'Phi Tượng phòng thủ đơn thuần — có cảm giác bị Đỏ dắt mũi.',
        13: 'Vô cùng thực dụng — con đường tốt nhất hiện thực hóa ưu thế.',
        19: 'Qua mấy hồi ngắn ngủi, Đỏ nhẹ nhàng chiếm ưu.',
      },
      h: { 11: 'p129_0' },
      v: [
        { from: 'main', after: 10, m: 'M8.7', k: { 1: 'Nước chính xác: Mã tiến 7 (hoặc Mã tiến biên) — Đỏ vẫn giữ tiên.' } },
        { from: 'main', after: 11, m: 'X1-2 B7.1 X2.8 B7.1 M3/1 M3.4 P5.4 S4.5 P5/1 P7.1 P8-5 X2.9 M7/8', k: { 1: 'Lập tức xuất Xe phản kích — không chút chậm trễ. Đỏ: Chốt 7 tiến hay Mã tiến biên?', 3: 'Bỏ mặc Chốt Đỏ qua sông, tiến Xe đè Mã — phản kích hữu hiệu nhất.', 7: 'Không nôn nóng đắc quân (Pháo bình 2 thì Đỏ có Chốt 3 tiến).', 10: 'Thăng Pháo cản trở, phòng Pháo bình 3 thiểm kích.', 13: 'Quân lực cánh trái Đỏ bị kìm — Đen chiếm ưu.' }, h: { 1: 'p130_0' } },
        { from: 1, after: 12, m: 'M8.9 X2.5 X9-8 X2-3 X8.2 M3/5', k: { 1: 'Mã tiến biên.', 2: 'Tiến Xe kỵ hà — vừa khéo kịp lúc.', 6: 'Thoái Mã trong thủ tàng công, có nước Pháo bình 3, Xe bình 7 — lạc quan.' } },
        { from: 2, after: 13, m: 'X2.4 X9-8 X2-8 X8.6 P8-7 X2-1 P5-6 X8-7 V7.5 B7.1', k: { 1: 'Nếu Xe tiến 4…', 10: '…Pháo lộ 7 Đỏ phát huy đầy đủ — Đỏ ưu.' } },
        { from: 2, after: 14, m: 'B7.1 X2-3', k: { 1: 'Nếu Chốt tiến…', 2: '…Xe bình 3.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 38, t: 'Đơn Đao Phó Hội',
      s: 'Lưỡng đầu xà đối Hậu bổ Liệt Pháo: Đen tiến Xe quá hà rồi bình Pháo đè Mã — phế quân cướp công. Đỏ xông Chốt theo thói quen thì Đen đạt mưu đồ; nhảy Mã tróc đôi, đơn thương độc Mã xông vào hậu phương rồi trả quân cướp tiên thì Đỏ chiếm ưu.',
      c: `<p>Đỏ chọn Chốt 3 tiến đối chọi gay gắt (Chốt 7 tiến thì cánh phải Đỏ bị phong tỏa), hình thành <strong>lưỡng đầu xà</strong> kinh điển. Đen <strong>tiến Xe quá hà</strong> — nước biến thiên về tấn công, nhiều thủ đoạn lừa gạt (ổn chắc là Xe tuần hà, Pháo bình 9…). Đỏ nhảy Mã bàn hà tranh tiên; Đen chẳng thèm đoái hoài uy hiếp Chốt 7, <strong>bình Pháo đè Mã</strong> — ý đồ phế quân cướp công.</p>
<ul>
<li><strong>Chốt 7 tiến</strong> (mạch chính): có vẻ chặt chẽ nhưng thiếu nhìn xa — xua theo ý đồ "thủ thắng trong loạn chiến" của Đen; Đen nhẹ nhàng tiêu diệt Chốt, phế quân cướp công — bù đắp hài lòng, viễn cảnh khả quan.</li>
<li><strong>Mã tiến 4 tróc đôi</strong> (nhánh phụ): "vén mây mù thấy trời xanh" — lựa chọn tốt nhất. Đen cứng rắn xông Chốt nhưng bỏ Mã khó bù; Đỏ <strong>đơn thương độc Mã</strong> tiến vào hậu phương Đen, nhấc Xe chuẩn bị phế quân điều Xe lên tiền tuyến, kịp thời trả một Pháo cướp tiên — ưu thế.</li>
</ul>
<h2>Bài học</h2>
<p>Kế hoạch của Đen dựa trên phế quân đoạt thế. Đỏ phán đoán chuẩn, không qua Chốt theo thói quen mà <strong>"đơn đao phó hội"</strong> như biến 2 thì cạm bẫy khó thành.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 P8.4 B3.1 P2-5 M8.7 M2.3 B7.1 X1-2 X9-8 X2.6 M7.6 P8-7 B7.1 X8.9 M3/2 X2/1 M6.4 B3.1 M4/3 P5.4 S4.5 M3.4 M2.3 P5/2',
      k: {
        7: 'Đối chọi gay gắt (Chốt 7 tiến thì cánh phải Đỏ bị phong tỏa).',
        11: 'Lưỡng đầu xà kinh điển.',
        14: 'Xe quá hà — nước biến thiên về tấn công, nhiều thủ đoạn lừa gạt; bên cầm tiên không thể không biết.',
        15: 'Nhảy Mã bàn hà tranh tiên — tích cực.',
        16: 'Chẳng thèm đoái hoài uy hiếp Chốt 7 — bình Pháo đè Mã bất ngờ, ý đồ phế quân cướp công. Đỏ: Chốt 7 tiến hay Mã tiến 4?',
        17: 'Có vẻ chặt chẽ nhưng thiếu nhìn xa — xua theo ý đồ "thủ thắng trong loạn chiến" của Đen.',
        19: 'Không thể lui Mã về 8 (Đen Pháo tiến, bổ Sĩ, Pháo bình 4… Đỏ mất quân).',
        22: 'Đỏ còn say "săn bắt", Đen nhẹ nhàng diệt Chốt, phế quân cướp công — bù đắp hài lòng.',
        26: 'Nước quan trọng khống chế hình thế.',
        28: 'Đen phế quân đoạt thế — viễn cảnh khả quan.',
      },
      h: { 16: 'p132_0' },
      v: [
        { from: 'main', after: 6, m: 'B7.1 B7.1 M8.7 V3.5', k: { 1: 'Nếu Chốt 7 tiến…', 4: '…cánh phải Đỏ bị phong tỏa, Đen bước đầu đạt ý đồ.' } },
        { from: 'main', after: 13, m: 'X2.4 P8-9 X2-8', k: { 1: 'Ổn chắc và thường thấy: Xe tuần hà…', 3: '…tăng phong tỏa, phục Pháo bình 7 cướp tiên.' } },
        { from: 'main', after: 16, m: 'X2.9 P7.3 S4.5 M7/8 B7.1 X2/1 B7.1 X2-4 B7.1 M8.7', k: { 1: 'Nếu Xe tiến 9…', 10: '…cục diện đối công, hai bên đều có chỗ kiêng dè.' } },
        { from: 'main', after: 18, m: 'M6/8 P7.3 S4.5 P7-4 M3/2 P4-2', k: { 1: 'Không thể lui Mã về 8…', 6: '…Đỏ mất quân.' } },
        { from: 'main', after: 25, m: 'X2-7 M2.3 P5/2 Mt/1 X7-2 M3.5', k: { 1: 'Nước có sức cám dỗ: Xe bình 7…', 6: '…Đỏ hơn quân chiếm ưu.' } },
        { from: 'main', after: 16, m: 'M6.4 X8.9 M3/2 B7.1 M4.3 P5.4 S4.5 B7.1 M3/4 B7-6 M2.3 P5/2 M4.2 S6.5 V3.1 V3.5 X8.1 B6.1 X8-6 X2.1 M2.3 Tg5-6 X6.3', k: { 1: 'Vén mây mù thấy trời xanh — nhảy Mã tróc đôi: lựa chọn tốt nhất trong biến phức tạp.', 4: 'Cứng rắn xông Chốt — hay cho tác chiến cục bộ nhưng bỏ Mã khó bù.', 8: 'Nước bắt buộc.', 13: 'Mã tiến 2!', 15: 'Phòng thủ tất yếu.', 17: 'Đơn thương độc Mã vào hậu phương Đen tạo uy hiếp lớn; nhấc Xe chuẩn bị phế quân điều Xe lên tiền tuyến.', 23: 'Đỏ trả một Pháo đúng lúc — giành ưu thế.' } },
        { from: 5, after: 23, m: 'P5/2 M3/4', k: { 1: 'Nếu Pháo lui ngay…', 2: '…Đỏ lui Mã rồi Mã tiến 2 tróc chết Chốt Đen — Đỏ ưu.' } },
        { from: 5, after: 30, m: 'X8.1 P7.3', k: { 1: 'Nếu Xe tiến ngay…', 2: '…Đen có Pháo lui, Xe bình 8 — Đỏ khá kiêng dè.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 39, t: 'Cung Kính Dâng Lễ',
      s: 'Đỏ không nghĩ ngợi nhảy Mã trái "ngoan ngoãn dâng lễ" — Đen tham ăn Mã thì gặp nước cờ lợi hại, rơi vào khốn cuộc; bình tĩnh tiến Chốt 3 không tham lợi trước mắt thì hai bên giản hóa, cơ bản cân thế.',
      c: `<p>Đỏ tiến Pháo đánh Mã ép đổi Pháo Đen — độ mạnh không rõ nhưng dễ nắm, lại khảo nghiệm Đen (thường là Mã tiến 7 hoặc Chốt 7 tiến). Đỏ nhảy Mã xuất kích phục Chốt 3 tiến dọa Pháo. Rồi Đỏ <strong>nhảy Mã trái không nghĩ ngợi</strong> — nếu tưởng Đỏ sai lầm lúc bận rộn mà "ngoan ngoãn dâng lễ", lập tức tham ăn Mã, thì sẽ gặp nước lợi hại.</p>
<ul>
<li><strong>Pháo ăn Mã</strong> (mạch chính): Đỏ Xe tiến chiếu, nâng Xe biên, bình Xe 2 — chiếm hết tiên cơ, Đen hối không kịp; Đỏ dịch chuyển chủ lực áp sát Tướng Đen, bình Pháo cánh bên ám tàng Xe sát Tượng giữa — thế công mãnh liệt.</li>
<li><strong>Chốt 3 tiến</strong> (nhánh phụ): bình tĩnh đối phó, không tham lợi — hai bên giản hóa, cơ bản cân thế.</li>
</ul>
<h2>Bài học</h2>
<p>Trước "quà tặng" Mã của đối thủ, tuyệt đối không thiếu cảnh giác — phân tích bình tĩnh, không tham lợi trước mắt thì không phải lo gì.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 P8.4 B3.1 P2-5 P8.5 M2.3 P8-5 V7.5 M3.4 P8.1 M8.7 P8-3 X2.9 M7/8 X9.2 P3.1 X9/1 P3/1 X9-2 M8.7 M4.6 X1.2 X2.6 M7/5 M6.4 M5/7 M4.3 Tg5.1 P5-2 Tg5-4 X2-5',
      k: {
        9: 'Tiến Pháo đánh Mã ép đổi Pháo Đen — dễ nắm, khảo nghiệm Đen (thường: Mã tiến 7 hoặc Chốt 7 tiến).',
        13: 'Nhảy Mã xuất kích, phục Chốt 3 tiến dọa Pháo — Đỏ thu lợi nhỏ.',
        15: 'Nhảy Mã trái không nghĩ ngợi — tưởng là sai lầm "ngoan ngoãn dâng lễ"; tham ăn Mã thì gặp nước lợi hại. Đen: Pháo bình 3 hay Chốt 3 tiến?',
        16: 'Tham ăn Mã.',
        23: 'Qua mấy hồi, Đỏ chiếm hết tiên cơ — Đen hối hận không kịp.',
        24: 'Lựa chọn khác cũng không thoát khốn cuộc.',
        33: 'Bình Pháo tấn công cánh bên — ám tàng nước ác Xe sát Tượng giữa.',
        34: 'Bắt buộc (Pháo bình 6 thì Xe bình 4).',
        35: 'Thế công Đỏ mãnh liệt — Đen khó chống đỡ.',
      },
      h: { 15: 'p135_0' },
      v: [
        { from: 'main', after: 8, m: 'M8.7', k: { 1: 'Thông thường: Mã tiến 7 (hoặc Chốt 7 tiến) — biến hóa phong phú.' } },
        { from: 'main', after: 23, m: 'M8.6 X2.7 X1.1 M4.6 M6.4 P5.4 S4.5 X2/6 P3.1 M6.4', k: { 1: 'Nếu Mã tiến 6…', 10: '…Đỏ tập kết chủ lực áp sát phủ Tướng, thế công lớn mạnh.' } },
        { from: 'main', after: 27, m: 'B3.1 M6.7', k: { 1: 'Nếu Chốt 3 tiến…', 2: '…Đỏ có thể Mã tiến 7 giành thế đơn giản, hoặc Mã tiến 4 cướp công.' } },
        { from: 'main', after: 33, m: 'P3-6 X2-4', k: { 1: 'Nếu Pháo bình 6…', 2: '…Xe bình 4.' } },
        { from: 'main', after: 15, m: 'B3.1 M7/5 X1-2 M5.3 P8-5 X2.9 M7/8 V7.5 M8.6', k: { 1: 'Chốt 3 tiến — bình tĩnh, không tham lợi trước mắt.', 9: 'Chủ lực hai bên giản hóa — cơ bản cân thế.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 40, t: 'Thúc Mã Gấp Công',
      s: 'Đỏ thúc Mã tiến nhanh dọa Pháo trái Đen — có tính cạm bẫy nhưng chủ lực cánh trái chưa xuất. Đen lui Pháo, Pháo đánh Chốt hay thăng Xe phế quân đều sai lầm; phớt lờ uy hiếp, nhảy Mã tranh xuất chủ lực cánh phải thì mỗi bên đánh một cánh, cơ hội Đen không tệ.',
      c: `<p>Đỏ <strong>thúc Mã tiến nhanh</strong> uy hiếp Pháo trái Đen — nước mang cạm bẫy (thực chiến thường gặp hơn là Chốt 7 tiến hoặc Mã tiến 7, bố trí quân đồng đều). Đen có bốn cách:</p>
<ul>
<li><strong>Lui Pháo</strong> (mạch chính): né tránh — tiến rồi lại thoái, mất trắng một nước, cảm giác mắc lừa. Đỏ nhảy Mã trái chính diện ổn chắc, Pháo nổ Chốt giữa giành thực lợi, bình Pháo biên tinh tế — hơn Chốt, vị trí tốt, chiếm chắc ưu thế.</li>
<li><strong>Pháo đánh Chốt chiếu</strong>: đánh nhanh nhưng quá sớm; quân Đen bị kìm, Đỏ có tiềm lực công kích.</li>
<li><strong>Xe tiến 1</strong>: chuẩn bị phế quân tranh tiên — tính khả thi đáng ngờ; Đỏ thăng Xe chi viện cánh phải (nước mấu chốt), trả lại một quân đúng lúc, song Xe song Pháo tạo thế công lớn, Pháo trấn trung tinh diệu — Đỏ nhất định thắng.</li>
<li><strong>Mã phải tiến</strong>: phớt lờ uy hiếp, tranh xuất chủ lực — sách lược hay. Đen xuất Xe tróc Pháo ép Đỏ bày tỏ thái độ; Đỏ thăng Xe thì Đen ưu thế lớn; Đỏ nhảy Mã trái thì Đen phế quân tranh tiên, hơi ưu; Đỏ lui Mã thì mỗi bên có chỗ kiêng dè, cân bằng.</li>
</ul>
<h2>Bài học</h2>
<p>Thúc Mã tấn công có màu sắc cạm bẫy nhưng chủ lực cánh trái chưa xuất — "đầu voi đuôi chuột". Lấy công đối công như biến 4 thì Đen giành thế cân bằng hài lòng.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 P8.4 B3.1 P2-5 M3.4 P8/2 M8.7 P8-3 X2.9 M7/8 P5.4 S4.5 M7/5 M2.3 P5/1 X1-2 P8-9 M8.7 B7.1 P3-1 P9.3 B1.1 X9.2',
      k: {
        9: 'Thúc Mã tiến nhanh dọa Pháo trái Đen — nước mang cạm bẫy. Đen: lui Pháo, Pháo đánh Chốt, Xe tiến 1 hay Mã tiến 3?',
        10: 'Lui Pháo né tránh — tiến rồi lại thoái, mất trắng một nước tiên.',
        11: 'Nhảy Mã trái chính diện — bố trí đồng đều, ổn chắc.',
        15: 'Pháo nổ Chốt giữa — giành thực lợi, thực dụng.',
        21: 'Bình Pháo biên tinh tế — phòng Pháo Đen đánh Xe tiên thủ.',
        24: 'Bình Pháo mời đổi — ý đồ đơn giản hóa (Pháo bình 2 thì Xe 9 bình 8, Đen khó chơi).',
        27: 'Đỏ hơn Chốt, vị trí quân lực ưu hơn — chiếm chắc ưu thế.',
      },
      h: { 9: 'p137_0' },
      v: [
        { from: 'main', after: 8, m: 'B7.1', k: { 1: 'Thực chiến thường gặp hơn: Chốt 7 tiến (hoặc Mã tiến 7) — bố trí quân đồng đều.' } },
        { from: 'main', after: 11, m: 'P8.3 M4/3 P8-5 X2.9 M7/8 P8-5 M2.3 X9-8', k: { 1: 'Nếu Pháo tiến 3…', 8: '…5 nước đổi 3 nước — Đỏ mở rộng nước tiên.' } },
        { from: 'main', after: 11, m: 'M2.3 M4.6 X1-2 X9-8 M7/5 P8.4 B3.1 P8-7', k: { 1: 'Nếu Mã tiến 3…', 8: '…thế cờ Đỏ rất chủ động.' } },
        { from: 'main', after: 9, m: 'P5.4 S6.5 P8/2 M4.6 P5/2 M6.8 M2.1 X2.2 V7.5 B9.1', k: { 1: 'Pháo đánh Chốt chiếu Tướng — đánh nhanh nhưng quá sớm.', 4: 'Nếu Pháo bình 7 thì Chốt 3 tiến — Đỏ chủ động.', 9: 'Xe tiến 2!', 10: 'Quân lực Đen bị kìm — Đỏ khá có tiềm lực công kích.' } },
        { from: 'main', after: 9, m: 'X1.1 B3.1 X1-6 M4/2 B7.1 X9.1 P5.4 S6.5 S6.5 M8.7 P5/2 X2.2 B7.1 X2-4 P5-6 P8.1 B7.1 M2/1 X8.8 Tg5-6 X8-9 X9-6 Tg5-6 P8-3 X9/2 X4-3 P6-3 P5-4 Tg6-5 P3-5 M2.3 X3.5 P3.3 P5.5', k: { 1: 'Thăng Xe chuẩn bị phế quân tranh tiên — tính khả thi đáng ngờ.', 5: 'Không thể Xe tiến 5 (Đỏ Chốt 3 tiến, Mã lui… Đen không thu gì).', 6: 'Thăng Xe chi viện cánh phải — nước mấu chốt duy trì ưu thế.', 7: 'Pháo nổ Chốt giữa phòng Xe Đỏ chi viện.', 11: 'Chính xác (Xe 9 bình 6 thì Đen có phản kích).', 20: 'Thuận thế trả lại một quân — mưu đoạt thế công, sáng suốt.', 26: 'Bình Xe trầm ổn có lực, phục thiểm kích.', 34: 'Tinh diệu tuyệt luân — nhất cử phá toang phòng tuyến Đen; Đỏ nhất định thắng.' } },
        { from: 4, after: 13, m: 'X6.5 B3.1 M7/9 M2.3', k: { 1: 'Nếu Xe tiến 5…', 4: '…Đen không thu hoạch được gì.' } },
        { from: 4, after: 17, m: 'X6-8 P8.1 X8.5 X2.3 X8.6 M8.7 M7.6 M7.5 M6.5 X9-6', k: { 1: 'Nếu Xe bình 8…', 10: '…Xe Mã Đen khó thoát kìm, bó tay chịu trói.' } },
        { from: 'main', after: 9, m: 'M2.3 B3.1 P8-3 X2.9 M7/8 M4.6 X1-2 X9.2 P3/2 M6.7 P3/2 P5.4 S6.5 V7.5 M8.7 P5/2 B7.1 P8-7 P3.5 M8.7 X2.6', k: { 1: 'Phớt lờ uy hiếp, nhảy Mã tranh xuất chủ lực cánh phải — sách lược hay.', 2: 'Tiến Chốt tróc Pháo — nhưng cánh trái Đỏ còn tồn đọng (tốt hơn: Mã tiến 6).', 6: 'Nếu Chốt 3 tiến thì Đen Xe bình 2… phục thêm thủ đoạn phản kích.', 7: 'Xuất Xe tróc Pháo, ép Đỏ bày tỏ thái độ. Đỏ: Xe tiến 2, Mã tiến 7 hay Mã lui 7?', 10: 'Đổi quân tất nhiên — nếu không Pháo bình 1 đánh chết Xe.', 12: 'Khá ổn chắc (Pháo tiến 4 hung ác hơn, Đen cũng thượng phong).', 21: 'Đen chiếm ưu thế lớn.' }, h: { 7: 'p141_0' } },
        { from: 7, after: 10, m: 'M4.6 X1-2 P8.4 X2.2 M8.7 X8.4 B3.1 B7.1 X9-8 B3.1 P8-7 X2.7 M7/8 M3/2 X2.1', k: { 1: 'Khá tốt lúc này: Mã tiến 6…', 15: '…hai bên đối công, cơ hội tương đương.' } },
        { from: 7, after: 16, m: 'M8.7 B3.1 M6/7 B3.1 M7.5 B5.1 M5.7 S6.5', k: { 1: 'Mã trái tiến.', 2: 'Phế quân tranh tiên — quyết đoán có lực!', 8: 'Tiếp theo Xe tiến 4, Chốt 3 tiến tất lấy lại quân — Đen hơi ưu.' } },
        { from: 7, after: 16, m: 'M6/7 X2.7 M7.6 X2/5 P5-7 M3/5 B3.1 X2.2 M6.5 V7.5 M8.9 X2-7 B3-4 X7.5 B4-5 X7/3', k: { 1: 'Mã lui 7.', 4: 'Thoái Xe phòng thủ — chính xác.', 5: 'Nước cầu biến hóa.', 8: 'Lựa chọn ổn chắc.', 16: 'Mỗi bên có chỗ kiêng dè — Đen đủ sức đối kháng cân bằng.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 41, t: 'Xử Lý Kịp Thời',
      s: 'Đen thúc Chốt 7 mời đổi — cạm bẫy bố cục điển hình. Đỏ chấp nhận đổi Chốt thì đúng ý đồ Đen, Pháo Mã bị kìm; bình Xe nghênh chiến, phế Mã cầu thế rồi thăng Xe bảo vệ Mã, kịp thời trả quân thì Đỏ nắm chủ động.',
      c: `<p>Trung Pháo đối Hậu bổ Liệt Pháo, Đen <strong>thúc Chốt mời đổi</strong> — cách đi khá cứng rắn, một cạm bẫy bố cục điển hình. Đỏ có hai cách:</p>
<ul>
<li><strong>Chốt 3 tiến chấp nhận đổi</strong> (mạch chính): đúng ý đồ Đen, dễ bị lợi dụng. Đen tháo Pháo điều chỉnh ổn chắc; cuối cùng Đỏ hơn một Chốt nhưng Pháo Mã bị kìm, khó có lợi thế.</li>
<li><strong>Xe bình 7</strong> (nhánh phụ): nghênh chiến tích cực. Đen phế Mã cầu thế công (đã dự tính); Đỏ <strong>thăng Xe bảo vệ Mã</strong>, không bị cám dỗ hơn quân — nước bao quát toàn cuộc. Đen có ba cách: Chốt tiến (Đỏ tiên phát chế nhân), Pháo bình giữa (thế công Đỏ như sóng lớn), Xe bình 7 phế quân uy hiếp — ứng phó hay nhất, nhưng Đỏ lui Pháo linh hoạt, lui Xe kỵ hà công thủ vẹn toàn — xác lập ưu thế.</li>
</ul>
<h2>Bài học</h2>
<p>Biến 1 Đỏ không đủ sáng suốt; biến 2 tích cực ứng chiến, tiên phát chế nhân, đặc biệt <strong>phế trả một quân đúng lúc</strong> — nắm quyền chủ động.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 P8.4 B3.1 P2-5 B7.1 M2.3 M8.7 X1-2 X9-8 X2.4 P8-9 X2-8 X8.6 B7.1 B3.1 X8-7 P5/1 P5-6 P5-3 P8-7 X2.9 M7/8 P3.2 X7.2 X8-7 V7.5',
      k: {
        18: 'Thúc Chốt mời đổi — khá cứng rắn, cạm bẫy bố cục điển hình. Đỏ: Chốt 3 tiến hay Xe bình 7?',
        19: 'Chấp nhận đổi Chốt — đúng ý đồ tác chiến Đen, dễ bị lợi dụng.',
        21: 'Nếu Mã tiến 4 thì Pháo Đen tiến 1 — Đen phản tiên.',
        22: 'Tháo Pháo điều chỉnh hình trận — ổn chắc.',
        23: 'Nếu Mã tiến 4 tùy tiện thì Đen đắc quân.',
        30: 'Đỏ hơn một Chốt nhưng Pháo Mã bị kìm — khó có lợi thế.',
      },
      h: { 18: 'p143_0' },
      v: [
        { from: 'main', after: 20, m: 'M3.4 P8.1', k: { 1: 'Nếu Mã tiến 4…', 2: '…Đen phản tiên.' } },
        { from: 'main', after: 21, m: 'P8-7 X8-7 M3/5 V3.5 X8.9 M3/2 P7.2', k: { 1: 'Cũng có thể Pháo bình 7…', 7: '…mỗi bên có chỗ kiêng dè.' } },
        { from: 'main', after: 22, m: 'M3.4 P8/3 M4.5 M3.5', k: { 1: 'Nếu tùy tiện nhảy Mã…', 4: '…Đen sắp đắc quân.' } },
        { from: 'main', after: 18, m: 'X8-7 B7.1 X7.1 B7.1 X2.2 B7.1 X2-3 X8.2 X7.2', k: { 1: 'Nghênh chiến bằng trạng thái tích cực — có lực.', 2: 'Phế Mã cầu thế công — thủ đoạn đã dự tính.', 5: 'Thăng Xe bảo vệ Mã — không bị cám dỗ hơn quân, nước bao quát toàn cuộc. Đen: Chốt tiến, Pháo bình 5 hay Xe bình 7?', 6: 'Chốt tiến.', 9: 'Đỏ tiên phát chế nhân, rõ ràng chiếm ưu.' }, h: { 5: 'p144_0' } },
        { from: 3, after: 19, m: 'M3/5 B3.1 X8-7 M3.4 P8.1 M4.5 X7/1 M5/6 X7-3', k: { 1: 'Nếu Mã lui giữa…', 9: '…Đỏ hơn Chốt chiếm ưu.' } },
        { from: 3, after: 22, m: 'M3/5 P8-5 X2.5 M7.8 M7.5 P5.4', k: { 1: 'Nếu Mã lui giữa…', 6: '…Mã oa tâm Đỏ là đại họa, Đen phế quân đoạt thế.' } },
        { from: 3, after: 23, m: 'P8-5 M3.5 Xt.3 X7.2 Xt/3 B7.1', k: { 1: 'Pháo bình giữa.', 2: 'Không thể Mã tiến giữa (Xe Đen tiến, Pháo bình 2 — Đen phản đoạt).', 6: 'Tiến Chốt hỗ trợ Mã — thế công Đỏ như sóng lớn, Đen khó chống.' } },
        { from: 3, after: 23, m: 'X8-7 P5/1 B7.1 X2-3 X7.3 P9-3 P8.3 X7/2', k: { 1: 'Xe bình 7 — tiếp tục phế quân uy hiếp: ứng phó hay nhất.', 2: 'Vô cùng linh hoạt — sáng suốt duy trì tiên thủ.', 8: 'Lui Xe kỵ hà công thủ vẹn toàn — Đỏ xác lập ưu thế (Xe tiến 2 thì Đen Xe tiến 7, Đỏ khó khống chế).' } },
      ],
      kq: 'uu-den',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
