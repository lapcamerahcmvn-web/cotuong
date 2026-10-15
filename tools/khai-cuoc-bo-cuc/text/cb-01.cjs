// Cạm Bẫy — Chương 1: Loại hình Thuận Pháo. Nước đi chép từ sách; lời giảng viết lại bằng lời riêng.
module.exports = {
  ch: 1, ten: 'Loại Hình Thuận Pháo', level: 'co-ban',
  y: 'Thuận Pháo: hai bên cùng vào Pháo đầu một phía. Cạm bẫy thường gặp là phế Mã dụ ăn, thoái Mã oa tâm dụ Xe, Xe tấn công gấp xuống hàng 2 — biết nhìn ra ý đồ thì bên bày bẫy lại rơi vào thế bị động.',
  cuoc: [
    {
      n: 1, t: 'Phế Mã 13 Nước',
      s: 'Thuận Pháo hoành Xe đối trực Xe: Đỏ nâng Xe hoành phế Mã. Đen tham ăn Mã thì trúng đòn Pháo đánh Mã, "thiết môn thuyên" và "đại đao xuyên tâm" — thua trong 13 nước; bổ Sĩ giữ trung lộ rồi dùng một Xe đổi hai quân mới là cách phá.',
      c: `<p>Hai bên vào <strong>Thuận Pháo hoành Xe đối trực Xe</strong>. Đen tiến Xe quá hà sớm là cách đi cũ — điểm yếu là cánh phải ra quân chậm, dễ bị công kích; ngày nay người ta thường Xe tuần hà để thủ chắc chờ thời.</p>
<h2>Cạm bẫy phế Mã</h2>
<p>Đỏ Xe xông vào hàng 2, Đen nhảy Mã biên (mềm yếu — Mã chính tốt hơn), rồi Đỏ <strong>nâng hoành Xe, bỏ ngỏ Mã</strong>. Đen có hai cách: ăn Mã hoặc bổ Sĩ.</p>
<ul>
<li><strong>Ăn Mã</strong> (mạch chính) — trúng bẫy, lỗi rất thường gặp của người mới. Đỏ tiến Pháo đánh Mã chiếm Pháo đài, Đen buộc lui Mã; rồi Pháo đánh Chốt giữa, song Xe dồn vào lộ 6, Xe chém Sĩ và Pháo bình trung — Đỏ thắng trong 13 nước. Đây là danh cuộc cổ "Phế Mã 13 nước".</li>
<li><strong>Bổ Sĩ</strong> (nhánh phụ) — chính xác: gia cố trung lộ, không ăn mồi. Đỏ phế tiếp vẫn vô kế khả thi; Đen phế Xe chém Pháo (một Xe đổi hai quân), hóa giải thế công — cục diện Đen hài lòng.</li>
</ul>
<h2>Bài học</h2>
<p>"Biến phế Mã" là cạm bẫy khai cuộc điển hình: bên công thắng nhanh vì bên thủ tham ăn quân phế. Cách tích cực hơn nữa là ngay nước 5 Đen nhảy Mã chính, thế cờ có sức bật đủ cân bằng. Cuộc này cũng giúp ghi nhớ hai sát pháp cổ điển <strong>"thiết môn thuyên"</strong> và <strong>"đại đao xuyên tâm"</strong>; nước Pháo tiến đánh Mã chính là nước đột phá phòng tuyến Đen.</p>`,
      m: 'P2-5 P8-5 X1.1 M8.7 X1-6 X9-8 M2.3 X8.6 X6.7 M2.1 X9.1 P2.7 P8.5 M7/8 P5.4 S6.5 X9-6 Tg5-6 Xt.1 S5/4 X6-4 P5-6 X4.6 Tg6-5 P8-5',
      k: {
        8: 'Thuận Pháo hoành Xe đối trực Xe. Đen tiến Xe quá hà là cách cũ — cánh phải ra quân chậm, dễ bị công; ngày nay thường Xe tuần hà, thủ chắc chờ thời.',
        9: 'Xe xông vào hàng 2 — nước đi gấp công. Chắc hơn là tiến Chốt 7.',
        10: 'Nhảy Mã biên mềm yếu; Mã chính có sức đối kháng mạnh hơn nhiều.',
        11: 'Nâng hoành Xe, bỏ ngỏ Mã — cạm bẫy! Đen ăn Mã hay bổ Sĩ?',
        12: 'Ăn Mã cẩu thả — trúng bẫy. Lỗi thường gặp của người mới, thiếu cảnh giác.',
        13: 'Pháo tiến đánh Mã, chiếm Pháo đài — tận dụng triệt để sơ hở rồi công liên tiếp.',
        14: 'Lui Mã là bắt buộc. Nếu lui Xe thì Đỏ dồn quân, phục đòn "đại đao xuyên tâm", thắng chắc.',
        19: 'Xe trước tiến chém Sĩ — mở toang cửa cung.',
        25: 'Pháo bình trung — Đỏ thắng trong 13 nước.',
      },
      h: { 11: 'p011_0' },
      v: [
        { from: 'main', after: 8, m: 'B7.1 X8-7 M8.7 S4.5 M7.6', k: { 1: 'Cách chắc chắn: tiến Chốt 7.', 5: 'Đỏ chiếm ưu.' } },
        { from: 'main', after: 9, m: 'M2.3 X6-7 P2.2 B7.1 M7/5', k: { 1: 'Mã chính — đối kháng mạnh.', 3: 'Pháo ngầm bảo vệ Mã.', 5: 'Đen còn nhiều thủ đoạn phản kích (Pháo bình 6, Xe bình 7…).' } },
        { from: 'main', after: 13, m: 'X8/4 X6-3 X1-2 P8-3 V7.9 P5.4 S4.5 X9-6 B3.1 X6.7 M1.3 P3-1', k: { 1: 'Nếu lui Xe thay vì lui Mã…', 12: '…phục đòn Xe bình trung "đại đao xuyên tâm" — Đỏ thắng chắc.' } },
        { from: 'main', after: 11, m: 'S6.5 X9-4 X8-7 X4.7 P2-4 P5-6 X1-2 P8.6 X7.1 V3.5 X2.1 X6-8 P5.4 S6.5 X7/1', k: { 1: 'Bổ Sĩ gia cố trung lộ — nước đúng.', 6: 'Đỏ phế liên tiếp không có kết quả, đành tháo Pháo đầu tìm hướng khác.', 9: 'Phế Xe chém Pháo — nhạy bén.', 15: 'Một Xe đổi hai quân, hóa giải thế công — Đen hài lòng.' } },
        { from: 3, after: 19, m: 'X7/1 P8-5 P4.7 Tg5-6 S4.5 P6.5 P5.4 P6-5 P5/4 X4-5 M7/5 X6.1', k: { 1: 'Nếu lui Xe sai lầm…', 12: '…Đỏ thắng.' } },
      ],
      kq: 'do',
    },
    {
      n: 2, t: 'Tiến Thoái Có Phương Hướng',
      s: 'Đen thoái Mã oa tâm dụ Xe Đỏ bình sang sát Chốt rồi vây đánh Xe. Đỏ cố chấp đuổi theo thì Xe chạy lên chạy xuống, mất tiên; lui Xe về hà khẩu đúng lúc thì Đỏ nắm chủ động.',
      c: `<p>Hai bên cùng nhảy song Mã chính — đặc điểm của Thuận Pháo hiện đại, khác Thuận Pháo cổ điển. Đỏ tiến Xe tuyến Chốt (đánh nhanh); cũng có thể tiến Chốt 3, nâng Xe biên hoặc Pháo tiến 2.</p>
<h2>Cạm bẫy thoái Mã oa tâm</h2>
<p>Đen lui Mã về giữa — không phải chính biến nhưng có cấu tứ: dụ Xe Đỏ bình sát Chốt, rồi thừa cơ vây Xe tranh tiên. Đỏ có hai cách:</p>
<ul>
<li><strong>Xe bình ăn Chốt</strong> (mạch chính): biết có bẫy vẫn làm — Đen lui Pháo phản kích, đoạt tiên; Xe Đỏ chạy lên chạy xuống, cuối cùng phải chịu đổi Xe; Đen phản tiên.</li>
<li><strong>Lui Xe về hà khẩu</strong> (nhánh phụ): "có thành không nên đánh" — tránh mũi nhọn, trong công có thủ. Đỏ tiến Chốt, xông Chốt giữa đúng lúc và nắm chủ động.</li>
</ul>
<h2>Bài học</h2>
<p>Cạm bẫy thoái Mã oa tâm có tính toán nhưng suy cho cùng là lui chủ lực, đánh đường vòng. Bên bị dụ chỉ cần hiểu ý đồ và <strong>tiến thoái có phương hướng</strong> thì kế hoạch của đối phương khó thành.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1.1 X9-8 X1-6 X8.4 M8.7 M2.3 X6.5 M7/5 X6-7 P2/1 X7-8 P2-3 X8.2 X1.1 X8-9 M3/1 M7/5 M5.3 P8-7 P3-5',
      k: {
        10: 'Hai bên cùng song Mã chính — đặc điểm Thuận Pháo hiện đại.',
        11: 'Tiến Xe tuyến Chốt — đánh nhanh.',
        12: 'Thoái Mã oa tâm — dụ Xe Đỏ bình sát Chốt rồi vây đánh, tranh tiên. Không phải chính biến nhưng có cấu tứ.',
        13: 'Biết có bẫy vẫn cố chấp…',
        14: 'Lui Pháo phản kích — Đen đoạt tiên.',
        15: 'Bình Xe mời đổi Pháo, thoát hiểm địa.',
        16: 'Đen tránh đổi để tranh lợi lớn hơn.',
        18: 'Xe Đen tiến 1 — giăng lưới.',
        19: 'Phải chịu đổi Xe — không còn lựa chọn khác.',
        24: 'Đen phản tiên, có thể phản kích.',
      },
      h: { 12: 'p013_0' },
      v: [
        { from: 'main', after: 11, m: 'P2.2 X6-7 X1.2', k: { 1: 'Chính biến: Pháo tiến 2.', 3: 'Sau đó Đen có đòn lui Pháo phản kích.' } },
        { from: 'main', after: 15, m: 'P2.6 X8/4 M3.4 X9.1', k: { 1: 'Nếu Pháo tiến 6…', 4: '…Đỏ đủ sức ứng chiến.' } },
        { from: 'main', after: 18, m: 'X8/4 M3.4 X8-7 M5.3', k: { 1: 'Nếu Xe lui…', 4: '…Đỏ càng rơi vào hạ phong.' } },
        { from: 'main', after: 12, m: 'X6/2 P2.2 B7.1 P5-6 X9.1 M5.7 B5.1 S4.5 M7.5 V7.5 B5.1 B5.1 X6.2', k: { 1: 'Lui Xe về hà khẩu — tránh mũi nhọn, dễ bề tiến thoái.', 4: 'Bình Pháo để nhảy Mã oa tâm ra.', 7: 'Thẳng tiến trung lộ — nước đi có lực!', 13: 'Đỏ nắm quyền chủ động.' } },
        { from: 3, after: 18, m: 'X9-4 P2-6 P8.3 B7.1 X4-8 V3.5 B3.1 B3.1', k: { 1: 'Nếu bình Xe trốc Pháo — biến hóa thú vị…', 8: '…Đỏ tưởng sắp hưởng lợi nhưng Đen có diệu kế giải vây.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 3, t: 'Liều Lĩnh Và Hậu Quả',
      s: 'Đỏ tiến gấp Xe xuống hàng 2 — nước công có tính lừa gạt. Đen ham tiến quân thì bị "hầu lạp Mã" trói chặt; phòng thủ tiêu cực thì yếu trung lộ; phản kích bằng Pháo tiến và hai nước điều Xe khéo léo thì Đỏ "hậu phương bốc cháy".',
      c: `<p>Thuận Pháo hoành Xe đối trực Xe, Đỏ tiến gấp Xe xuống <strong>hàng 2 của Đen</strong> — nước công có tính lừa gạt; có phục chiến thuật nhưng cô quân thâm nhập dễ gặp phản kích. Cách bình thường là tiến Chốt 3, Pháo tiến 2 hoặc Xe tiến tuyến Chốt.</p>
<h2>Ba cách ứng phó của Đen</h2>
<ul>
<li><strong>Tiến Chốt 3</strong> (mạch chính): chỉ biết tiến quân, không thấy hiểm nguy. Đỏ tung chiêu <strong>"hầu lạp Mã"</strong> — Pháo kỵ hà trói chặt Xe Mã Đen; Đen thúc Chốt chuẩn bị phế quân tìm chút bù đắp, Đỏ tiến Chốt 3 súc tích, giải trừ điểm yếu duy nhất rồi rảo bước tiến lên.</li>
<li><strong>Pháo bình 6</strong> (nhánh phụ): phòng thủ tiêu cực, tự làm yếu hình trận; Đỏ địch thoái ta tiến, xông Chốt giữa — mở rộng nước tiên.</li>
<li><strong>Pháo tiến 2</strong> (nhánh phụ): điều động linh hoạt, công thủ vẹn toàn. Hai nước Xe tiến 1 liên tiếp ép Đỏ phi Tượng biên, làm yếu hình trận — Đỏ chưa thấy lợi gì, ngược lại "hậu phương bốc cháy", cạm bẫy phá sản.</li>
</ul>
<h2>Bài học</h2>
<p>Bên bày bẫy liều lĩnh, nôn nóng cầu công khi chiến thuật chưa chín; một khi bên kia phản kích chính xác thì hậu quả rất thảm.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1.1 X9-8 X1-6 X8.4 M8.7 M2.3 X6.7 B3.1 X6-7 M3.4 P8.3 B7.1 P8-6 B7.1 B3.1 X8-4 X9-8 P2-4 B7.1',
      k: {
        11: 'Tiến gấp Xe xuống hàng 2 — nước công có tính lừa gạt; cô quân thâm nhập dễ bị phản kích. Bình thường là tiến Chốt 3, Pháo tiến 2 hoặc Xe tiến 5.',
        12: 'Đơn thuần tiến quân, không thấy hiểm nguy.',
        14: 'Tốt hơn là lui Mã về giữa, nhưng Đỏ nâng Xe biên, Đen vẫn bị động.',
        15: '"Hầu lạp Mã": Pháo kỵ hà trói chặt Xe Mã Đen — hối hận cũng không kịp.',
        16: 'Thúc Chốt chuẩn bị phế quân tìm chút bù đắp.',
        19: 'Tiến Chốt 3 — súc tích, giữ chắc ưu thế.',
        23: 'Giải trừ điểm yếu duy nhất — Đỏ rảo bước tiến lên.',
      },
      h: { 11: 'p016_0' },
      v: [
        { from: 'main', after: 13, m: 'M7/5 X9.1', k: { 1: 'Lui Mã về giữa tốt hơn…', 2: '…nhưng Đỏ nâng Xe biên, Đen vẫn bị động.' } },
        { from: 'main', after: 15, m: 'S4.5 B7.1 P2-3 X7/1', k: { 1: 'Nếu bổ Sĩ…', 4: '…Đỏ đắc quân.' } },
        { from: 'main', after: 11, m: 'P5-6 B5.1 S6.5 M7.5', k: { 1: 'Pháo bình 6 — phòng thủ tiêu cực, tự làm yếu hình trận.', 2: 'Địch thoái ta tiến!', 3: 'Trung lộ mỏng nên phải bổ Sĩ.', 4: 'Đỏ mở rộng nước tiên, viễn cảnh tươi sáng.' } },
        { from: 2, after: 13, m: 'P6.5 B5.1 X8-5 M7.5 X5.2 P8-4', k: { 1: 'Nếu Pháo tiến thay vì bổ Sĩ…', 6: '…Xe Đen rơi vào hiểm địa, bốn bề nguy cơ.' } },
        { from: 'main', after: 11, m: 'P2.2 B7.1 P2-7 M7.8 X8.1 V7.9 X8.1 B3.1 P7.3 P8-3 X8-7 P3-4 X7.3', k: { 1: 'Pháo tiến 2 — điều động linh hoạt, công thủ vẹn toàn!', 4: 'Nhảy Mã phong Xe — khá cứng rắn.', 5: 'Xe tiến 1 — ép Đỏ phi Tượng biên, làm yếu hình trận.', 7: 'Xe lại tiến — phản kích đã tính từ trước.', 13: 'Đỏ chưa thấy lợi gì, ngược lại "hậu phương bốc cháy" — cạm bẫy phá sản.' } },
        { from: 4, after: 14, m: 'M7.6 X1-2 P8-7 B3.1 B7.1 P7.3 P7-3 X8-3', k: { 1: 'Nếu Mã tiến 6…', 4: 'Chốt 3 tiến — triển khai quân lực xảo diệu.', 8: 'Đen hài lòng.' } },
        { from: 4, after: 15, m: 'P7.3 P8-3 X8-2 M8/7', k: { 1: 'Nếu Pháo đổi Mã — tầm thường…', 4: '…vị trí quân Đỏ tốt hơn.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 4, t: 'Cấp Công Cận Lợi',
      s: 'Đen cương quyết đổi Chốt 3 — nước có cạm bẫy — rồi tiến Pháo cố ý lộ sơ hở. Đỏ nôn nóng nhảy Mã ăn lợi trước mắt thì bị lùi Xe vây đánh, mất tiên; tiến Mã mời đổi, nhìn thấu mưu đồ thì Đỏ xác lập ưu thế.',
      c: `<p>Đỏ tiến Xe tuyến Chốt; Đen tiến Pháo qua hà là nước chính xác (phi Tượng biên thì Đỏ tấn công đắc thế). Bình thường Đen bình Pháo 7 rồi tiến Chốt 3 để đối kháng cân bằng; ở đây Đen <strong>cương quyết đổi Chốt — nước có cạm bẫy</strong>, rồi tiến Pháo cố ý để lộ sơ hở.</p>
<h2>Hai cách đi của Đỏ</h2>
<ul>
<li><strong>Mã tiến 7</strong> (mạch chính): trông như nước hay nhưng thiếu suy nghĩ — Đen lùi Xe một bước, Đỏ ham nhảy Mã giữa thì Pháo bình 3 là diệu thủ, Xe Đỏ khó chạy, Đen phản khách vi chủ. (Đỏ nên bình Xe về lộ 6.)</li>
<li><strong>Mã tiến 4</strong> (nhánh phụ): ổn chắc, nhìn thấu mưu đồ — tiến Mã mời đổi; cục thế rõ ràng, Đỏ nắm chắc ưu thế.</li>
</ul>
<h2>Bài học</h2>
<p>Đổi Chốt ở nước 7 không phải nước chính xác của Đen nhưng có ý dẫn dụ, thiết lập mai phục. Nôn nóng tấn công vì lợi ích trước mắt thì giúp đối phương đạt ý đồ — <strong>"cấp công cận lợi" không giành được lợi thế</strong>.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1.1 X9-8 X1-6 X8.4 M8.7 M2.3 X6.5 P2.2 B7.1 B3.1 X6-7 X1.2 X7/1 B7.1 M7.6 P2.2 M6.7 X1/1 M7.5 P2-3',
      k: {
        11: 'Tiến Xe tuyến Chốt — một cách đánh của Đỏ (còn có Chốt 3 tiến, Pháo tiến 2, Xe biên tiến 1).',
        12: 'Pháo tiến 2 — nước chính xác.',
        14: 'Cương quyết đổi Chốt — nước có cạm bẫy (bình thường: Pháo bình 7, Mã tiến 8, Chốt 3 tiến — đối kháng cân bằng).',
        17: 'Thoát Xe diệt Chốt — phù hợp thực tế. (Tiến Chốt 7 thì Đen lui Pháo phản kích.)',
        20: 'Tiến Pháo cố ý lộ sơ hở — dẫn dụ Đỏ mắc bẫy. Đỏ: Mã tiến 7 hay Mã tiến 4?',
        21: 'Trông như nước hay nhưng thiếu suy nghĩ sâu xa.',
        22: 'Xe lùi 1 — giăng lưới!',
        23: 'Mắc lừa. Nên bình Xe về lộ 6, chưa có gì đáng ngại.',
        24: 'Diệu thủ! Xe Đỏ khó chạy — Đen phản khách vi chủ.',
      },
      h: { 20: 'p019_0' },
      v: [
        { from: 'main', after: 11, m: 'V3.1 P8.2 B3.1 P8-5 M3.4 P5.3 V7.5 X9-8 P2-3 X8.7', k: { 1: 'Nếu phi Tượng…', 10: '…Đỏ tấn công đắc thế.' } },
        { from: 'main', after: 13, m: 'P2-7 M7.8 B3.1', k: { 1: 'Biến thông thường…', 3: '…Đen đối kháng cân bằng.' } },
        { from: 'main', after: 16, m: 'B7.1 P2/3', k: { 1: 'Nếu tiến Chốt 7…', 2: '…Đen lui Pháo phản kích.' } },
        { from: 'main', after: 22, m: 'X7-6', k: { 1: 'Nên bình Xe — chưa có gì đáng ngại.' } },
        { from: 'main', after: 20, m: 'M6.4 P2-3 M4.3 P3/2 Mt/2 P3-8 P8-7', k: { 1: 'Mã tiến 4 — ổn chắc, nhìn thấu mưu đồ.', 3: 'Tiến Mã mời đổi.', 7: 'Cục thế rõ ràng — Đỏ nắm chắc ưu thế.' } },
        { from: 4, after: 21, m: 'M7.6 X7-4 P2-7 V3.1', k: { 1: 'Nếu Mã tiến 6…', 4: '…Chốt 7 Đỏ hùng hổ, qua sông sẽ uy hiếp chí mạng.' } },
        { from: 'main', after: 20, m: 'B3.1 B7.1 X7-2 M7.8 B7.1', k: { 1: 'Cách cứng rắn: tiến Chốt 3…', 5: '…hai bên tranh tiên lẫn nhau.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 5, t: 'Phản Kích Dạo Đầu',
      s: 'Đỏ lui Xe trốc Chốt, dụ Đen tiến Chốt 3 vào cạm bẫy. Đen theo kế hoạch thì quân đội tan rã; khéo tặng Chốt 7 để giải trừ uy hiếp Pháo thiểm kích rồi phản kích từ lộ 3 thì Đen nắm ưu.',
      c: `<p>Đen nhảy Mã phải lên biên: linh hoạt hơn Mã chính (sau này Pháo bình 3 dọa Mã Đỏ) nhưng trung lộ mỏng. Đỏ tiến Xe đánh Mã hơi vội (tốt hơn là bổ Sĩ hoặc Mã tiến 4 tranh Chốt giữa); Pháo tiến phong tỏa Xe là nước bắt buộc.</p>
<h2>Cạm bẫy lui Xe trốc Chốt</h2>
<p>Thay vì phi Tượng ổn chắc, Đỏ <strong>lui Xe dụ Đen tiến Chốt 3</strong> — cạm bẫy nham hiểm. Đen có hai cách:</p>
<ul>
<li><strong>Chốt 3 tiến</strong> (mạch chính): tấn công theo kế hoạch — Đỏ bình Xe, lui Xe đúng lúc; Đen nối tiếp sai lầm tiến Pháo, trúng mai phục; Pháo Đỏ bình đánh, quân Đen tan rã.</li>
<li><strong>Chốt 7 tiến</strong> (nhánh phụ): mưu tính sâu xa — "dạo đầu phản kích": tặng Chốt 7, tránh đòn Pháo thiểm kích, rồi thúc Chốt phản kích từ lộ 3. Đỏ bổ Sĩ hay bình Xe đều để Đen chiếm ưu.</li>
</ul>
<h2>Bài học</h2>
<p>Phản kích từ lộ 3 là phương hướng đúng, nhưng <strong>trước đó phế Chốt 7 tiêu trừ mối họa ngầm</strong> là bước mở đầu tất yếu — có nước này mới đập tan cạm bẫy của Đỏ.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 X9.1 B3.1 X9-4 M8.7 M2.1 X2.6 P2-3 X9-8 X1-2 P8.4 X4.6 X8.2 B3.1 X2/1 B3.1 X2-7 B3.1 X7/2 P3.5 P5-7 X4-7 V7.5 X7/1 P7.7 Tg5.1 P8.2 P5.4 S6.5',
      k: {
        10: 'Mã biên: linh hoạt hơn, sau này Pháo bình 3 dọa Mã Đỏ — nhưng trung lộ mỏng yếu.',
        11: 'Tiến Xe đánh Mã hơi vội. Tốt hơn: bổ Sĩ trước hoặc Mã tiến 4 tranh Chốt giữa.',
        14: 'Chính xác. Không nên tùy tiện tiến Chốt 3 tấn công.',
        15: 'Tiến Pháo phong tỏa Xe — thế tất phải đi.',
        19: 'Lui Xe dụ Đen tiến Chốt 3 — cạm bẫy nham hiểm (ổn chắc hơn là phi Tượng).',
        20: 'Tấn công theo kế hoạch — trúng bẫy.',
        23: 'Chính xác — lui Xe đúng lúc.',
        24: 'Nối tiếp sai lầm, trúng mai phục. Nên Pháo bình 4 nhẫn nhịn.',
        28: 'Nước bắt buộc (bổ Sĩ thì Pháo bình 3 thắng nhanh).',
        33: 'Quân Đen tan rã — Đỏ thắng thế.',
      },
      h: { 19: 'p020_0' },
      v: [
        { from: 'main', after: 10, m: 'S6.5', k: { 1: 'Tốt hơn: bổ Sĩ trước.' } },
        { from: 'main', after: 13, m: 'B3.1 X2/1 B3.1 X2-7 P3.1 P8.5', k: { 1: 'Nếu tiến Chốt 3 tấn công tùy tiện…', 6: '…Đen khó ứng phó.' } },
        { from: 'main', after: 14, m: 'X2-3 X2.6 P8-9 X2-3 X8.2 B3.1 P5-4 X4-6 S6.5 M1.3', k: { 1: 'Nếu Xe bình 3…', 10: '…phục đòn Mã tiến giữa — Đen ưu.' } },
        { from: 'main', after: 18, m: 'V7.9', k: { 1: 'Phi Tượng — ổn chắc, hai bên giằng co.' } },
        { from: 'main', after: 19, m: 'X4/4 X2-7 X4-2 X8.4 X2.3 X7.2 X2-3 X7/1 M1.3 B7.1', k: { 1: 'Nếu lui Xe…', 10: '…Đỏ hơn Chốt chiếm ưu.' } },
        { from: 'main', after: 22, m: 'X7.2 B3.1 P5-7 M7/5 X7/3 X4-7 P7.7 X2-3', k: { 1: 'Nếu tiến Xe sai lầm…', 8: '…"tứ Xe tương kiến" — Đen đắc quân.' } },
        { from: 'main', after: 23, m: 'P3-4', k: { 1: 'Nên Pháo bình 4 nhẫn nhịn — vẫn chống đỡ được.' } },
        { from: 'main', after: 19, m: 'B7.1 X2-3 B3.1 S6.5 X4/4 X3-7 B3.1 M7/6 X4-2 X8.4 X2.3 X7.2 X2-3 X7/1 M1.3 B3.1 M3.4 B3.1 M7/5', k: { 1: 'Chốt 7 tiến — dạo đầu phản kích có lực: tránh đòn Pháo bình 3 thiểm kích.', 3: 'Tặng Chốt 7 rồi thúc Chốt phản kích — khác hình 5 một trời một vực. Đỏ: bổ Sĩ hay bình Xe?', 4: 'Bổ Sĩ.', 5: 'Lui Xe trốc Pháo — súc tích.', 9: 'Đổi quân đơn giản.', 19: 'Mỗi bên đều có Chốt qua sông, nhưng chủ lực Đen linh hoạt — ưu thế rõ.' }, h: { 3: 'p022_0' } },
        { from: 7, after: 22, m: 'X3-7 B3.1 X7.2 B3.1 X8.1 X4/4 P8.2 X4/2 X7-9 X2.1 X8.5 X4-2 X9-6 X2.4 V3.1 M7.6 P5.4 S6.5', k: { 1: 'Xe bình 7.', 3: 'Đi đường cũ thì Đỏ không ổn.', 9: 'Nếu lui Pháo thì Đen tiến Chốt, Pháo bình, Mã tiến — ưu thế rõ.', 16: 'Không bỏ lỡ thời cơ nhảy Mã xuất kích!', 18: 'Hình trận Đỏ bất ổn, Đen sắp có Mã tiến, Xe lui… — Đỏ bị động.' } },
      ],
      kq: 'do',
    },
    {
      n: 6, t: 'Bán Bích Sơn Hà',
      s: 'Đỏ tiến Xe xuống hàng 2 quấy nhiễu — nước công có tính đánh lừa. Đen đổi Chốt lo kế hoạch của mình thì bị "săn bắt"; bổ Sĩ chặn Xe tạo thế "bán bích sơn hà", rồi phế quân tranh công thì Đen giành ưu thế.',
      c: `<p>Đỏ nhảy chính Mã trước rồi mới tiến Chốt, khởi hoành Xe — cách thường gặp ở bố cục chậm ra Xe. Đen bình Pháo mở đường cho Xe phải xuất. Thúc Chốt 3 tạo thế lưỡng đầu xà ở đây không phù hợp (Mã tiến 7 tốt hơn).</p>
<h2>Cạm bẫy Xe xuống hàng 2</h2>
<p>Để duy trì tiên thủ, Đỏ tiến Xe xuống hàng 2 quấy nhiễu — nước công có tính đánh lừa, khảo nghiệm Đen (cầu ổn thì Pháo bình 4). Đen có hai cách:</p>
<ul>
<li><strong>Chốt 3 tiến</strong> (mạch chính): đổi Chốt linh hoạt Mã, xem nhẹ thế công tiềm tàng — Đỏ bình Xe trốc Mã bắt đầu "săn bắt", nhảy Mã phớt lờ Chốt Đen; Mã oa tâm Đen để lại mối họa khó điều chỉnh.</li>
<li><strong>Bổ Sĩ</strong> (nhánh phụ): chặn đường Xe Đỏ sang cánh trái — thế <strong>"bán bích sơn hà"</strong>; đổi Chốt tranh tiên, nhảy Mã không chậm trễ, phế quân tranh công. Đỏ hơn một quân nhưng khó thành thế công, còn Đen tập kết binh lực cánh phải — thế không thể cản.</li>
</ul>
<h2>Bài học</h2>
<p>Dựa vào thế "bán bích sơn hà" để lấy công đối công là tinh hoa của đối sách. Phán đoán chuẩn xác hình thế và nước đi lăng lệ khiến cuộc này đẹp như thêu hoa trên gấm.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 M2.3 B7.1 P2-1 M8.7 X1-2 X9-8 X2.4 P8-9 X2.5 M7/8 X9.1 B3.1 X9-2 M8.7 X2.3 X2.8 B3.1 X2-7 M7/5 M7.6 B3.1 M6.5 M3.4 X7/4',
      k: {
        6: 'Nhảy chính Mã trước — giữ cơ động tiến Chốt, khởi hoành Xe.',
        8: 'Bình Pháo mở đường cho Xe phải xuất ra tranh tiên.',
        12: 'Xe tuần hà — khá ổn chắc.',
        17: 'Thúc Chốt 3 tạo thế lưỡng đầu xà — ở đây không phù hợp. Tốt hơn là Mã tiến 7.',
        21: 'Tiến Xe xuống hàng 2 quấy nhiễu — nước có tính đánh lừa, khảo nghiệm Đen. Đen: tiến Chốt 3 hay bổ Sĩ?',
        22: 'Đổi Chốt linh hoạt Mã — xem nhẹ thế công tiềm tàng của Đỏ.',
        23: 'Bình Xe trốc Mã — bắt đầu "săn bắt".',
        24: 'Lui Mã vẫn bắt buộc (Mã tiến 4 thì Đen mất quân).',
        25: 'Phớt lờ Chốt Đen, nhảy Mã xuất kích — liền mạch có lực.',
        29: 'Mã oa tâm Đen để lại mối họa ngầm, nhất thời khó điều chỉnh.',
      },
      h: { 21: 'p024_0' },
      v: [
        { from: 'main', after: 7, m: 'B7.1 P8-7 V3.1 M8.9 X1-2 B7.1 V1.3 M9.7', k: { 1: 'Nếu tiến Chốt 7…', 8: '…Đỏ tiên thủ.' } },
        { from: 'main', after: 8, m: 'P8-7 X1-2 M8.9 P1.4 X9-8 P1-3', k: { 1: 'Nếu Pháo bình 7…', 6: '…Đen có thể phản kích.' } },
        { from: 'main', after: 11, m: 'X2.6 P8-9 X2-3 X8.2 X9.1', k: { 1: 'Cũng có thể Xe tiến 6…', 5: '…lối công thủ phức tạp khác.' } },
        { from: 'main', after: 16, m: 'M8.7 X9-4 X2.4', k: { 1: 'Tốt hơn: Mã tiến 7…', 3: '…Đỏ hơi tiên.' } },
        { from: 'main', after: 21, m: 'B7.1 B3.1 X2-7 P5/1', k: { 1: 'Đổi Chốt 7 tốt hơn…', 4: '…nhưng vẫn là Đỏ chủ động.' } },
        { from: 'main', after: 23, m: 'M3.4 B7.1 P1-3 X7/1', k: { 1: 'Nếu Mã tiến 4…', 4: '…Đen mất quân.' } },
        { from: 'main', after: 29, m: 'M4.5 M3.5 P5.4 S4.5 V7.5 X7-5 X2.2 Tg5-4 M5.7 M5/7', k: { 1: 'Nếu Mã tiến giữa…', 10: '…Đen khó lòng ứng phó.' } },
        { from: 'main', after: 21, m: 'S4.5 X2-3 B3.1 M7.6 M3.4 M6.4 B3.1 M4.3 P1-3 P9.4 P3.7 S6.5 P5-2 P5.4 Tg5-4 V3.5 P3/2', k: { 1: 'Bổ Sĩ chặn Xe — thế "bán bích sơn hà", suy tính sâu xa!', 3: 'Đổi Chốt tranh tiên, phế quân tranh công — nước mấu chốt.', 5: 'Nhảy Mã tranh tiên, không chậm trễ!', 17: 'Đỏ hơn một quân nhưng khó thành thế công; Đen tập kết binh lực cánh phải — thế không thể cản.' } },
        { from: 7, after: 24, m: 'X3/1 P5.4 M7.5 P1-7 M5.4 P7-4', k: { 1: 'Nếu Xe lui…', 6: '…Đen ưu.' } },
        { from: 7, after: 25, m: 'B3.1 M6.7', k: { 1: 'Nếu Chốt tiến…', 2: '…Đỏ rõ ràng có lợi.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 7, t: 'Kiềm Chế Giả Tượng',
      s: 'Đen phi Pháo quá hà tạo giả tượng "Đỏ không thể dễ dàng đổi Chốt". Đỏ cứng nhắc nhảy Mã theo lệ thường thì giúp Đen đạt mưu đồ; dũng cảm đổi Chốt 3 nhìn thấu quỷ kế thì Đỏ mở rộng tiên thủ.',
      c: `<p>Đen thúc Chốt 7 trước rồi xuất hoành Xe — không sai nguyên tắc nhưng chiến thuật kế tiếp không đủ chặt (hợp lý hơn là Pháo tiến 4). Đỏ Xe tuần hà phòng trước khỏi họa.</p>
<h2>Cạm bẫy phi Pháo quá hà</h2>
<p>Đen phi Pháo qua hà — tạo <strong>giả tượng</strong> rằng Đỏ không thể dễ dàng đổi Chốt, để lừa qua ải (hợp lý hơn là nhảy Mã chính rồi song hoành Xe đấu tốc độ). Đỏ có hai cách:</p>
<ul>
<li><strong>Mã tiến 7</strong> (mạch chính): câu nệ cách xuất quân cứng nhắc — Đen đắc thủ, lập tức khởi hoành Xe; Đỏ tiến Mã "tiên thủ giả" (nên xuất Xe trái kịp thời); Đen bình Xe ép đổi, lấy lại quân. Xe chủ lực Đỏ xuất muộn, Mã cánh phải bị kìm — Đen dễ đi quân.</li>
<li><strong>Chốt 3 tiến</strong> (nhánh phụ): trông như đổi Chốt đơn giản nhưng đã nhìn thấu mưu đồ — bỏ giả lấy thật. Đen lui Pháo tạo giả tượng mà hóa ra ngược lại; Pháo Đen đánh đường vòng tổn thất nước đi. Đỏ đổi quân tranh tiên, trái ép phải tiến, chuẩn bị ăn Chốt giữa — ưu thế lớn.</li>
</ul>
<h2>Bài học</h2>
<p>Chiến thuật đổi Chốt kiềm chế của Đỏ buộc Đen trả giá bằng nước lui Pháo; tác chiến đường vòng ảnh hưởng tốc độ xuất quân, định trước thất bại của cạm bẫy.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 B7.1 B7.1 X9.1 X2.4 P2.4 M8.7 P2-7 V3.1 X1.1 M7.8 X9-8 X2.4 X1-8 P8.7 X8-2 M8.7 X2/1 M7.6 X2.1 M6/5 M7.5 P5.4 S6.5',
      k: {
        8: 'Thúc Chốt 7 rồi xuất hoành Xe — không sai nguyên tắc nhưng chiến thuật kế tiếp không đủ chặt; hợp lý hơn là Pháo tiến 4.',
        9: 'Xe tuần hà phòng trước khỏi họa.',
        10: 'Phi Pháo quá hà — có tính cạm bẫy: tạo giả tượng Đỏ không thể dễ dàng đổi Chốt. Đỏ: Mã tiến 7 hay Chốt 3 tiến?',
        11: 'Câu nệ cách xuất quân cứng nhắc — để Đen toan tính.',
        14: 'Đắc thủ xong, lập tức khởi hoành Xe tăng mức phản kích; Mã cánh phải chưa vội nhảy, giữ sức bật.',
        15: 'Nước tiên thủ giả! Nên xuất Xe trái kịp thời.',
        16: 'Cản trở xuất sắc kế hoạch Đỏ, thừa cơ mời đổi Xe.',
        20: 'Bình Xe đánh đôi, lấy lại quân — tất cả trong dự liệu.',
        25: 'Không thể lui Mã về 4 (Đen bình Xe, Đen ưu).',
        28: 'Xe chủ lực Đỏ xuất muộn, Mã phải bị kìm — Đen dễ đi quân.',
      },
      h: { 10: 'p026_0' },
      v: [
        { from: 'main', after: 8, m: 'M8.7 B3.1 B7.1 X9-3 M7.6 X3.3', k: { 1: 'Nếu cẩu thả nhảy Mã…', 2: 'Đen phản kích!', 6: '…Đen mở thông cục diện, giành thế cân bằng.' } },
        { from: 'main', after: 9, m: 'M2.3 M8.7 X1.1', k: { 1: 'Hợp lý hơn: nhảy Mã chính…', 3: '…song hoành Xe đấu tốc độ.' } },
        { from: 'main', after: 14, m: 'X9-8', k: { 1: 'Nên xuất Xe trái kịp thời (sau đó Pháo tiến 1 hoặc bình 9) — hình thế không tệ.' } },
        { from: 'main', after: 24, m: 'M6/4 X2-6 M4/3 X6.3 Mt/1 X6.3', k: { 1: 'Nếu lui Mã về 4…', 6: '…Đen ưu.' } },
        { from: 'main', after: 10, m: 'B3.1 P2/1 M8.7 P2-7 V3.1 P7.1 X9-8 M2.3 P8.1 P7-2 X8.3 X1-2 X8.6 M3/2 X2.2 P5-4 X2-3 V3.5 M3.4', k: { 1: 'Trông như đổi Chốt đơn giản — thực tế đã nhìn thấu mưu đồ: bỏ giả lấy thật!', 2: 'Lui Pháo tạo giả tượng — nhưng thực tế ngược lại; chấp nhận đổi Chốt thì cánh trái bị công, Pháo phải hụt hẫng.', 4: 'Pháo đánh đường vòng, tổn thất số nước.', 9: 'Đổi quân tranh tiên, chủ lực linh hoạt.', 15: 'Trái ép phải tiến — khí thế tràn đầy.', 19: 'Nước sau ăn Chốt giữa — Đỏ chiếm ưu thế lớn.' } },
        { from: 4, after: 13, m: 'B7.1 X2.2 P2/4 X2-3 X9.1 P8.5', k: { 1: 'Nếu tiến Chốt 7…', 6: '…Đỏ đại ưu.' } },
        { from: 4, after: 21, m: 'X9-4 X8.3', k: { 1: 'Nếu Xe bình 4…', 2: '…Đen vẫn bị tấn công.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 8, t: 'Lấy Cương Chế Cương',
      s: 'Đỏ xông Chốt 7 hiếp Mã — nước công có tính lừa gạt. Đen phi Tượng thủ tiêu cực hay tiến Pháo ép đổi chưa đúng thời đều để Đỏ ưu; bình Xe quá sườn rồi phản kích Chốt giữa — lấy cương chế cương — thì Đen đột phá thành trì Đỏ.',
      c: `<p>Đỏ nhảy Mã trái lên biên để nhanh xuất chủ lực; Đen khởi Xe trái. Đỏ <strong>xông Chốt 7</strong> — lập tức uy hiếp trực tiếp, nước công có tính lừa gạt (thông thường xuất Xe 9 là tốt).</p>
<h2>Ba cách ứng phó của Đen</h2>
<ul>
<li><strong>Phi Tượng</strong> (mạch chính): thủ tiêu cực, tự làm yếu hình trận — Xe Đỏ tiến áp chế, xuất Xe tinh chuẩn; Đỏ ưu thế.</li>
<li><strong>Pháo tiến 5 ép đổi</strong> (nhánh phụ): có chút phản kích nhưng thời cơ chưa chín — Đỏ xuất Xe đơn giản có lực, chỉ huy Xe áp chế Mã Đen, lui Xe tuần hà công thủ vẹn toàn — ưu thế khá lớn.</li>
<li><strong>Xe bình quá sườn</strong> (nhánh phụ): bất chấp Chốt Đỏ qua sông, phản kích từ trung lộ — đối sách cao minh <strong>"lấy cương chế cương"</strong>. Đỏ tiến Chốt thì Đen đột phá trung lộ, phế Xe chém Sĩ ("thạch phá thiên kinh"), thế công lên đỉnh điểm; Đỏ bình Chốt thì Đen phế Mã tranh tiên — cuối cùng Mã Đỏ bị xoay vòng, phạm luật "hai đánh một đánh trả".</li>
</ul>
<h2>Bài học</h2>
<p>Cạm bẫy của Đỏ vấp phản kích mạnh ở biến 3 chính vì hình trận bản thân không ổn chắc. Phản công trung lộ có bài bản thì khí thế mãnh liệt như trường giang đại hải.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 M2.3 M8.9 X9.1 P8-7 X1-2 B7.1 V3.1 X2.6 X9-4 X9-8 B7.1 X2-3 P5/1 X8.6 P5-7 X3-4 M7.8 X8-7',
      k: {
        7: 'Nhảy Mã trái lên biên — nhanh xuất chủ lực để công nhanh.',
        8: 'Khởi Xe trái tăng sức đối chọi (Chốt 7 tiến cũng được).',
        11: 'Xông Chốt 7 — uy hiếp trực tiếp, nước công có tính lừa gạt. Đen: phi Tượng, Pháo tiến 5 hay Xe bình 4?',
        12: 'Phòng thủ tiêu cực, tự làm yếu hình trận.',
        13: 'Xe tiến áp chế — thuận lợi mọi điều, mở rộng tiên thủ.',
        15: 'Xuất Xe tinh chuẩn.',
        23: 'Đỏ ưu thế.',
      },
      h: { 11: 'p029_0' },
      v: [
        { from: 'main', after: 10, m: 'X9-8', k: { 1: 'Thông thường xuất Xe 9 cũng tốt.' } },
        { from: 'main', after: 14, m: 'X2-3 P5/1', k: { 1: 'Nếu bình Xe…', 2: '…Đen có cơ hội thoát cục diện bị kìm.' } },
        { from: 'main', after: 15, m: 'X4.3 X8.6', k: { 2: 'Đỏ giữ tiên thủ.' } },
        { from: 'main', after: 15, m: 'X4.6 X8.2', k: { 2: 'Đỏ giữ tiên thủ.' } },
        { from: 'main', after: 11, m: 'P2.5 X9-8 X9-2 X2.6 P2-5 X8.8 X2.1 V3.5 B5.1 B7.1 M3.5 B7-6 B5.1 B5.1 P5.3 S4.5 V3.5 X2/2', k: { 1: 'Tiến Pháo ép đổi — có chút phản kích nhưng thời cơ chưa chín.', 2: 'Đơn giản có lực!', 5: 'Chỉ huy Xe áp chế Mã Đen, ép đổi quân.', 9: 'Tiến Chốt — hay nhất lúc này, kẻo song Mã bị công càng bị động.', 18: 'Lui Xe tuần hà — công thủ vẹn toàn, Đỏ ưu thế khá lớn.' } },
        { from: 4, after: 12, m: 'B7.1 B3.1 P7.5 P2-7 P7-3 P5.4 S4.5 X2.2', k: { 1: 'Nếu tiến Chốt 7…', 2: 'Cứng rắn!', 8: '…Đen phế quân có thế công, Đỏ không nắm chắc.' } },
        { from: 4, after: 13, m: 'P2-5 X8.9 M3/2 V3.5 B7.1 X2.4', k: { 1: 'Nếu Pháo bình giữa…', 6: '…Đen xuất quân thua thiệt.' } },
        { from: 'main', after: 11, m: 'X9-4 B7.1 B5.1 B7.1 M3.5 X9-8 B5.1 P5.2 X4.6 X8.2 S4.5 V3.5 M5.4 M9/8 X4.2 Tg5.1 P2.7 X8.7 M4.3 Tg5-4 X4/1 Tg4.1 M7.5', k: { 1: 'Bình Xe quá sườn — bất chấp Chốt Đỏ qua sông, hàm súc có lực.', 3: 'Phản kích từ trung lộ — đối sách cao minh "lấy cương chế cương". Đỏ: Chốt 7 tiến hay Chốt 7 bình 6?', 7: 'Kiên quyết đột phá — mở thông cục diện.', 8: 'Tiến Pháo đánh Chốt, trì hoãn thế công.', 11: 'Bổ Sĩ tích lực — trong động có tĩnh.', 15: 'Phế Xe chém Sĩ — "thạch phá thiên kinh"!', 23: 'Thế công Đen đạt đỉnh điểm — Đỏ khó chống đỡ.' }, h: { 3: 'p031_0' } },
        { from: 7, after: 18, m: 'B5.1 M5.4 P7.7 X2-3 X8.7 M4.5 V3.5 M7.5', k: { 1: 'Nếu tiến Chốt giữa…', 8: '…Đen phản kích mạnh mẽ.' } },
        { from: 7, after: 26, m: 'Tg5-6 P2.7 X8/2 M4.3 Tg6-5 X2.9', k: { 1: 'Nếu Tướng sang 6…', 6: '…Đen hơn quân thắng chắc.' } },
        { from: 7, after: 14, m: 'B7-6 X4.3 P7.5 M7.5 P7.1 P2.5 X9-8 X2.4 P7-1 P2-7 X8.5 X4-2 M9.7 X2-3 M7.9 X3-2 M9/7 X2-3 M7.9 X3-2', k: { 1: 'Chốt 7 bình 6.', 2: 'Phế Mã tranh tiên — phong thái hơn người!', 6: 'Nước bắt buộc.', 8: 'Cũng có thể Xe lui 3 — Đen lạc quan.', 9: 'Khá ngoan cường.', 14: 'Chính xác.', 15: 'Mã Đỏ không còn đường tốt hơn.', 20: '"Hai đánh một đánh trả" — Đỏ phạm luật; Đen phục Pháo bình 3, Mã tiến 7… rõ ràng chiếm ưu.' } },
        { from: 10, after: 15, m: 'M3.5 B6-5 M5.3 X9-8', k: { 1: 'Nếu Mã tiến giữa…', 4: '…cục thế đa biến, chưa rõ ràng.' } },
        { from: 10, after: 20, m: 'P7-1 P2-7 P1.1 M5.3 X2.9 P5.4 S4.5 V3.5', k: { 1: 'Nếu Pháo bình 1 đối công…', 8: '…Đỏ uổng công vô ích.' } },
        { from: 10, after: 26, m: 'P1.1 M5.3 P5.3 P5.4', k: { 1: 'Nếu Pháo tiến…', 4: '…Đỏ bại nhanh.' } },
        { from: 10, after: 27, m: 'X2/3 P1.1 P5-3 P5.3 S4.5 X2.2', k: { 1: 'Nếu Xe lui…', 6: '…Đen khó có lợi.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 9, t: 'Trịch Địa Hữu Thanh',
      s: 'Đỏ phi Tượng biên — nước có tính cạm bẫy dụ Đen bình Xe trốc đôi. Đen bình Xe thì tự sa lưới; lộ mặt Xe mời đổi, giáng đòn phủ đầu thì Đen giành ưu thế.',
      c: `<p>Thuận Pháo trực Xe đối Chậm ra Xe: Đen phi Pháo quá hà có thủ đoạn bình Pháo 3, bình Pháo 7 — biến hóa nổi tiếng. Đỏ nhảy Mã cửa sông (cách cũ, gần đây phát triển lại), bình Pháo; Đen ra Xe, Đỏ nhảy Mã chính xác.</p>
<h2>Cạm bẫy phi Tượng biên</h2>
<p>Đỏ <strong>phi Tượng lên biên</strong> — dẫn dụ Đen bình Xe trốc đôi để thực hiện phục kích (thông thường: Pháo tiến 2, đối công). Đen có hai cách:</p>
<ul>
<li><strong>Xe bình 3 trốc đôi</strong> (mạch chính): cảm giác mắc lừa — Đỏ bình Xe, Đen lui Xe tự sa lưới (bổ Sĩ thì còn ứng phó được); Đỏ thăng Pháo, phục Pháo bình — đắc quân chiếm ưu.</li>
<li><strong>Xe bình 8</strong> (nhánh phụ): không bị mê hoặc, trực tiếp ép đổi Xe — có lực, <strong>"trịch địa hữu thanh"</strong>. Đỏ ăn Xe, Đen phế quân tranh sát; bổ Sĩ củng cố trung lộ, Xe sang ép — Đen lấy lại quân và có thế công mạnh, thắng lợi trong tầm tay.</li>
</ul>
<h2>Bài học</h2>
<p>Phi Tượng biên có thể lừa đối thủ nhưng hình trận bản thân không vững, Xe trái xuất muộn. Ở biến 1 Đen thiếu quan sát, lui Xe diệt Chốt sai càng thêm sai; biến 2 Đen tích cực cầu chiến, lộ mặt Xe mời đổi — cạm bẫy bị thiệt hại nghiêm trọng.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 B7.1 M8.7 M2.3 B7.1 P2.4 M7.6 P2-7 P8-7 X1-2 M6.7 P5-4 B7.1 X2.6 V7.9 X2-3 X9-7 X3/2 P7.2 S4.5 P5-7 X3-4 P7.3',
      k: {
        10: 'Phi Pháo quá hà — có thủ đoạn bình Pháo 3, bình Pháo 7: biến hóa nổi tiếng của Thuận Pháo trực Xe đối Chậm ra Xe.',
        11: 'Nhảy Mã cửa sông — cách cũ, gần đây phát triển lại.',
        13: 'Bình Pháo (ổn chắc hơn là xuất Xe 9).',
        15: 'Chính xác (tiến Chốt 7 thì Đen Xe tiến trốc ngược).',
        19: 'Phi Tượng biên — có tính cạm bẫy: dụ Đen bình Xe trốc đôi để phục kích. Đen: Xe bình 3 hay Xe bình 8?',
        20: 'Bình Xe trốc đôi — có cảm giác mắc lừa, chưa nhìn thấu ý đồ.',
        22: 'Tự sa vào lưới! Bình tĩnh bổ Sĩ thì tuy hậu thủ vẫn ứng phó được.',
        23: 'Mọi thứ đã rõ: thăng Pháo, phục Pháo bình 5 và bình 3 — Đen khó phòng bị.',
        27: 'Đỏ đắc quân chiếm ưu.',
      },
      h: { 19: 'p034_0' },
      v: [
        { from: 'main', after: 12, m: 'X9-8 X9.1 P8-7 X9-4 M6.7 X4.2', k: { 1: 'Cách ổn chắc: xuất Xe 9…', 6: '…hai bên ràng buộc lẫn nhau.' } },
        { from: 'main', after: 14, m: 'B7.1 X2.5', k: { 1: 'Tiến Chốt 7 không có lợi…', 2: '…Đen Xe tiến trốc ngược lại.' } },
        { from: 'main', after: 18, m: 'P7.2 P4.5 M3/5 X9.1', k: { 1: 'Thông thường: Pháo tiến 2…', 4: '…thế đối công.' } },
        { from: 'main', after: 21, m: 'S4.5', k: { 1: 'Nên bổ Sĩ — tuy hậu thủ vẫn ứng phó được.' } },
        { from: 'main', after: 19, m: 'X9-8 X2.9 P7.3 S4.5 M7/8 B7-6 P4-8 P7.5 P7-9 M3.2 X2-5 V9/7 S6.5 X9-8 X5-8 S5.4 X8/1', k: { 1: 'Không bị mê hoặc — trực tiếp ép đổi Xe mưu phản kích: có lực, có khí phách!', 7: 'Phế quân tranh sát — chặt chẽ.', 10: 'Nước bắt buộc, kẻo mất Xe.', 13: 'Bổ Sĩ củng cố trung lộ, linh hoạt Xe giữa — lão luyện.', 17: 'Đen lấy lại một quân, thế công mạnh — thắng lợi trong tầm tay.' } },
        { from: 4, after: 20, m: 'B7-6 X8.9 M3/2 M3/1 X9-7 S6.5', k: { 1: 'Nếu Chốt bình 6…', 6: '…mỗi bên có chỗ kiêng dè, hình trận Đen chỉnh tề.' } },
        { from: 4, after: 24, m: 'P5.4 P4-7 P5/1 P7.5', k: { 1: 'Nếu Pháo đánh Chốt giữa…', 4: '…trong đối công Đen hơn quân chiếm ưu.' } },
        { from: 4, after: 25, m: 'X2-3 X9-7 P4-8 M7/6', k: { 1: 'Nếu Xe bình 3…', 4: '…Đen khó khống chế cục diện.' } },
        { from: 4, after: 31, m: 'B7.1 X9-8 S6.5 X8.4 X5-7', k: { 1: 'Nếu tiến Chốt…', 5: '…mỗi bên đều có chỗ kiêng dè.' } },
        { from: 4, after: 32, m: 'M7.5 V7.5 P7-2 M8.6 P2/1 B7.1', k: { 1: 'Nếu Mã tiến giữa…', 6: '…Đen cướp công, ưu thế lớn.' } },
        { from: 4, after: 32, m: 'S5.6 X5-8 M2.4 X8.3 Tg5.1 X8/1 Tg5/1 P8.5', k: { 1: 'Nếu chống Sĩ…', 8: '…Đen thắng chắc.' } },
        { from: 4, after: 34, m: 'M2.4 X8.3 S5/4 P8.5 P5-3 X8-7', k: { 1: 'Nếu Mã tiến 4…', 6: '…tuyệt sát — Đen thắng.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 10, t: 'Lượn Vòng Xuất Kích',
      s: 'Đen thăng Xe rồi bình Pháo — động tác liền mạch có tính cạm bẫy: Đỏ đạp Mã thì Mã không đường lui. Ba cách đầu của Đỏ đều để Đen đạt ý đồ; tiến Chốt giữa bao quát toàn cuộc, cho Mã lượn vòng xuất kích thì Đỏ ưu.',
      c: `<p>Đỏ bình Pháo tăng áp lực lên Mã phải Đen; rồi liên tiếp xông Chốt ép Đen dương cao Tượng, chỉ huy Mã tiến — thủ đoạn tranh tiên tiêu biểu. Đen khởi hoành Xe chuẩn bị bố cục cạm bẫy.</p>
<h2>Cạm bẫy bình Pháo</h2>
<p>Đen không lui thủ mà <strong>bình Pháo</strong>: nếu Đỏ đạp Mã thì Mã không còn đường lui, Đen bắt lại; nếu không ăn thì Đen tiến Pháo tiêu trừ thế công, lại ngầm dọa Pháo đánh Sĩ. Đỏ có bốn lựa chọn:</p>
<ul>
<li><strong>Mã đạp Mã</strong> (mạch chính): đắc một quân nhưng dùng Mã mạnh đổi Mã yếu — mắc lừa. Đen bình Xe bắt Mã, "bỏ trước đoạt sau", điều động linh hoạt — có thế công tuyến đáy, lạc quan.</li>
<li><strong>Xe tiến 4</strong>: chậm chạp — Đen nhảy Mã xuất kích đúng thời cơ, đủ sức bật.</li>
<li><strong>Xe 9 bình 8</strong>: có thể đi nhưng không đủ lực — Đen ung dung cân bằng.</li>
<li><strong>Chốt giữa tiến</strong>: nước hay bao quát toàn cuộc — phát triển thế công, duy trì kìm chế, giúp Mã phải <strong>lượn vòng xuất kích</strong>; chủ lực Đỏ thông thoáng, ưu thế rõ.</li>
</ul>
<h2>Bài học</h2>
<p>Cạm bẫy của Đen không phải không tinh tế nhưng đi vòng vèo, chủ lực ở phạm vi chật hẹp, hình trận có khiếm khuyết rõ. Khéo dẫn dắt, không bị cám dỗ như biến 4 thì cạm bẫy khó đạt hiệu quả.</p>`,
      m: 'P2-5 P8-5 M2.3 M8.7 X1-2 B7.1 M8.9 M2.3 P8-7 X1-2 B7.1 V3.1 B7.1 V1.3 M9.7 X9.1 M7.6 P5-4 M6.7 X9-3 X9-8 X3.1 X8.4 P4/1 X8-6 P4-5 X2.1 P2.7',
      k: {
        9: 'Bình Pháo tăng áp lực lên Mã phải Đen — chiêu thức thường gặp sau khi nhảy Mã biên.',
        15: 'Liên tiếp xông Chốt ép Đen dương cao Tượng, rồi chỉ huy Mã tiến — thủ đoạn tranh tiên tiêu biểu.',
        16: 'Khởi hoành Xe trái — chuẩn bị bố cục cạm bẫy.',
        18: 'Bình Pháo — cạm bẫy: Đỏ đạp Mã thì Mã không đường lui; không ăn thì Pháo tiến tiêu trừ thế công. Đỏ có 4 lựa chọn.',
        19: 'Đắc một quân — nhưng dùng Mã mạnh đổi Mã yếu, đã mắc lừa.',
        20: 'Bình Xe bắt Mã: "bỏ trước đoạt sau", giải trừ điểm yếu Mã lộ 3 trong vô hình.',
        24: 'Điều động linh hoạt — quân lực ách tắc trở nên thông thoáng.',
        25: 'Tranh yếu đạo, kẻo Đen bình Xe 4.',
        28: 'Đen có thế công tuyến đáy — hình thế lạc quan.',
      },
      h: { 18: 'p037_0' },
      v: [
        { from: 'main', after: 15, m: 'P2-1 M7.6 X2.2 X9.2 X9.1', k: { 1: 'Thông thường: Pháo bình 1…', 5: '…Đỏ tiên thủ nhưng Đen chống đỡ được.' } },
        { from: 'main', after: 18, m: 'X2.4 P4.1 B3.1 M7.6 B3.1 M6.4 P7.2 P2.7', k: { 1: 'Biến 2: Xe tiến 4 — thăng Xe chậm chạp.', 4: 'Nhảy Mã xuất kích — đúng thời cơ!', 8: 'Hình thế Đen có sức bật, đủ hài lòng.' } },
        { from: 'main', after: 18, m: 'X9-8 P4.1 X8.4 P2-1 X8.5 M3/2 X2.4 X9-6', k: { 1: 'Biến 3: Xe 9 bình 8 — có thể đi nhưng không đủ lực.', 2: 'Chính xác.', 8: 'Tiếp theo Đen có Xe tiến, Pháo bình… — hai bên giằng co.' } },
        { from: 2, after: 19, m: 'P4.7 V7.9', k: { 1: 'Nếu Pháo đánh Sĩ…', 2: '…Đen nhanh nhất thời nhưng về sau không đủ lực.' } },
        { from: 'main', after: 18, m: 'B5.1 S4.5 X9-8 P4.1 B5.1 P2.4 M3.5 B5.1 P5.3 M7.5 P7-6 P2-4 X8.9 M3/2 X2.4', k: { 1: 'Biến 4: Chốt giữa tiến — nước hay bao quát toàn cuộc: phát triển thế công, kìm quân Đen, giúp Mã phải lượn vòng xuất kích.', 3: 'Chặt chẽ.', 11: 'Cướp tiên — mở rộng thành quả.', 12: 'Chỉ đành vậy.', 15: 'Chủ lực Đỏ thông thoáng, có thế công — ưu thế rõ.' } },
        { from: 4, after: 20, m: 'M6.7 X2-3', k: { 1: 'Nếu Mã đạp…', 2: '…Đen bình Xe — vô vị.' } },
        { from: 4, after: 23, m: 'B5.1 X2.6 P2.1 X2-3', k: { 1: 'Nếu Chốt giữa đổi…', 4: '…Đen cũng bị động.' } },
        { from: 4, after: 28, m: 'X2.7 X9.1', k: { 1: 'Nếu Xe tiến 7…', 2: '…Đen nâng Xe.' } },
        { from: 4, after: 29, m: 'P4.4 M6.7', k: { 1: 'Không thể Pháo tiến 4…', 2: '…Đỏ đạp Mã đắc thủ.' } },
      ],
      kq: 'uu-den',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
