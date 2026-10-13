// Bài 29 — Chiến thuật chủ yếu cờ tàn: đánh chớp nhoáng. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Chiến Thuật Chủ Yếu Cờ Tàn: Đánh Chớp Nhoáng',
  y: 'Lấy nhanh đánh chậm: tạo ưu thế binh lực cục bộ, nhân lúc chủ lực đối phương chưa kịp về thủ, đột phá một điểm để kết thúc ván cờ.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Lấy Nhanh Đánh Chậm',
      s: 'Đánh chớp nhoáng là một tư tưởng chiến thuật: dù tổng binh lực ra sao, chỉ cần ưu thế cục bộ và đối phương không kịp về thủ là có thể đột phá một điểm.',
      c: `<p>Chiến thuật của bài này nói chính xác là một <strong>tư tưởng chiến thuật</strong>: <strong>đánh chớp nhoáng</strong> — lấy nhanh đánh chậm. Có vẻ như xem nhẹ "binh lực trên hết", nhưng không phải: dù so sánh binh lực toàn cục thế nào, chỉ cần tạo được <strong>ưu thế binh lực cục bộ</strong>, nhân lúc chủ lực đối phương không kịp về thủ, đột phá một điểm là có thể giải quyết ván đấu. Cách đánh này mang lại cảm giác sảng khoái.</p>`,
    },
    '2 TUYEN CUOC MANH THANH thang LIEU DAI HOA': {
      t: 'Ván Chọn: Mạnh Thần Thắng Liễu Đại Hoa — Bỏ Chốt Xuất Kích Mã',
      s: 'Đỏ có lợi binh chủng; cánh phải Đen trống, cánh phải Đỏ dày đặc. Thay vì ăn Chốt đánh lâu dài, Đỏ bỏ Chốt, nhảy Mã xuất kích — Đen không kịp về thủ.',
      c: `<p><strong>Phân tích cục diện</strong>: Đỏ có lợi binh chủng, chiếm ưu. Hai Xe đối xứng, đều ở chỗ tối, không linh hoạt lắm. Nhưng cánh phải Đen trống, cánh phải Đỏ dày đặc. Tiêu điểm cục bộ là Chốt lộ 3; tới lượt Đỏ, thường thì tiến Chốt ăn lên là không vấn đề — nhưng Đỏ thấy chưa đủ mạnh, bỏ lối đánh lâu dài, phát động <strong>tấn công chớp nhoáng</strong>.</p>
<p>Đỏ không ăn Chốt mà bỏ, chủ động nhảy Mã xuất kích, thấy rõ điểm yếu: Xe Mã Đen ở cánh trái không tiếp ứng được. Đỏ có hai lựa chọn Mã ngọa tào khó ngăn; Tượng cao Đen bị nhắm, Mã tiến là mất Tượng. Tiền đề: Đen không thể lui Xe phòng thủ (Mã đạp Tượng thì Đen sụp đổ).</p>
<p>Đỏ dám đánh chớp nhoáng vì thấy chủ lực Đen dù nhanh chóng hồi Mã tăng cường phòng thủ, nhưng Mã Đen hành động chậm. Đen thật ra có nước hay: Chốt giữa tiến (nhánh phụ) — bỏ trước đoạt sau, có thể bắt chết Mã Đỏ; tiếc là Đen không phát hiện thủ đoạn kín đáo này. Cuối cùng Đỏ lui Xe đuổi Xe (không ăn Mã trực tiếp vì Xe Đen sẽ chém Pháo) — Đen mất quân, thua.</p>`,
      k: { 3: 'Đỏ không ăn Chốt mà bỏ, chủ động nhảy Mã xuất kích: Xe Mã Đen cánh trái không tiếp ứng được, Đen ngột ngạt. Tượng cao bị nhắm, Mã tiến là mất Tượng; Đen cũng không lui Xe thủ được (Mã đạp Tượng).', 12: 'Đỏ dám đánh chớp nhoáng vì thấy Mã Đen hành động chậm. Đen có nước hay: Chốt giữa tiến — bỏ trước đoạt sau, có thể bắt chết Mã Đỏ; tiếc là Đen không thấy.', 33: 'Không thể ăn Mã trực tiếp (Xe Đen chém Pháo); lui Xe đuổi Xe — Đen mất quân. Đòn chớp nhoáng thành công.' },
      v: { 0: { 1: 'Nếu Xe lui phòng thủ…', 2: '…Mã đạp Tượng — Đen sụp đổ.' }, 1: { 1: 'Nước hay của Đen: Chốt giữa tiến!', 5: 'Bỏ trước đoạt sau — bắt chết Mã Đỏ.' }, 2: { 1: 'Nếu ăn Mã trực tiếp…', 2: '…Xe Đen chém Pháo.' } },
      kq: 'thang',
    },
    '3 TUYEN CUOC KIM BA thang LY THIEU CANH': {
      t: 'Ván Chọn: Kim Ba Thắng Lý Thiếu Canh — Song Pháo Chốt Phá Thành',
      s: 'Song Pháo Chốt đấu Pháo Mã Sĩ Tượng toàn — ai cũng nghĩ là hòa. Đỏ lập Pháo trung lộ, và chỉ vậy mà Đen đã hết sức thủ: ưu thế cục bộ lấy nhiều đánh ít.',
      c: `<p><strong>Phân tích cục diện</strong>: song Pháo Chốt đấu Pháo Mã Sĩ Tượng toàn — binh chủng Đen tốt hơn; Đỏ đã khuyết nửa Sĩ Tượng nên đáng lo bị tấn công hơn. Thông thường đây là hòa, ai cũng không thắng được. Nhưng hai bên đánh tiếp.</p>
<p>Đỏ lập Pháo trung lộ — nước tự nhiên để tổ chức thế công. Ai cũng nghĩ song Pháo Chốt làm sao phá nổi Pháo Mã Sĩ Tượng toàn? Vậy mà nước này vừa ra, Đen đã hết sức thủ. Thế công là ở khu vực quan trọng tạo được cục diện <strong>lấy nhiều đánh ít</strong>: Đen dù có Pháo Mã ở tiền tuyến, thậm chí có lợi binh chủng, cũng không phát huy được tác dụng phòng thủ. Cuối cùng Tướng Đỏ đã đợi sẵn bên ngoài — Chốt ăn Sĩ tuyệt sát.</p>`,
      k: { 1: 'Lập Pháo trung lộ — nước tự nhiên. Ai cũng nghĩ song Pháo Chốt không phá nổi Pháo Mã Sĩ Tượng toàn, nhưng nước này vừa ra, Đen đã hết sức thủ!', 2: 'Nếu chống Sĩ bên kia: Chốt tiến, Pháo lui (không thể lên Tượng vì Pháo bình tuyệt sát), Pháo bình, Pháo bình 4, Chốt bình… tuyệt sát.', 7: 'Đỏ thật sự đã phá được thành trì: Pháo Mã Đen ở tiền tuyến không có tác dụng phòng thủ — ưu thế cục bộ lấy nhiều đánh ít.', 19: 'Không hay không biết Tướng Đỏ đã đợi sẵn bên ngoài — Chốt ăn Sĩ tuyệt sát.' },
      v: { 0: { 1: 'Nếu chống Sĩ bên kia…', 10: '…tuyệt sát.' }, 1: { 1: 'Không thể lên Tượng…', 2: '…Pháo bình — tuyệt sát.' } },
      kq: 'thang',
    },
    '4 TUYEN CUOC TUONG XUYEN tien bai TRIEU HAM HAM': {
      t: 'Ván Chọn: Tưởng Xuyên Thua Triệu Hâm Hâm — Mã Đi Sai, Bị Đánh Chớp Nhoáng',
      s: 'Mã Pháo Chốt Sĩ Tượng toàn đấu Mã Chốt đơn khuyết Tượng — theo lý hòa. Đỏ nhảy Mã làm loạn hình trận; Đen thấy thời cơ chín muồi, đánh chớp nhoáng, bình Pháo thiểm kích — Đỏ mất Pháo.',
      c: `<p><strong>Phân tích cục diện</strong>: Đen Mã Pháo Chốt Sĩ Tượng toàn đấu Mã Chốt đơn khuyết Tượng — binh lực không đủ thắng, thường coi là hòa (giải chuyên nghiệp sẽ giằng co nhiều hiệp). Đen tập kết Mã Pháo Chốt ở một cánh, có hai mạch tấn công: Pháo bình về giữa hoặc Pháo chìm đáy. Mã Đỏ chưa tốt, không biết điều sang tiếp ứng thế nào.</p>
<p>Đỏ nhảy Mã — nước thua, làm loạn hình trận. Nên bình Tướng vào giữa (nhánh phụ): không bị khóa trung lộ; có thể đơn giản tiến Chốt xem Đen có đánh không — đánh thì áp lực trung lộ được giải, không đánh thì Đen nhất thời cũng không có thủ đoạn, Đỏ thủ hòa được.</p>
<p>Đen thấy thời cơ chín muồi, nhanh chóng <strong>tấn công chớp nhoáng</strong>, binh quý thần tốc. Không đánh Tượng trực tiếp (Đỏ chống Sĩ, vào cuộc chiến lâu dài) mà <strong>bình Pháo thiểm kích cánh bên</strong>: Đỏ có Mã Pháo nhưng không kịp về thủ — mất Pháo, Đen thắng.</p>`,
      k: { 5: 'Nước thua, làm loạn hình trận. Nên bình Tướng vào giữa: không bị khóa trung lộ, rồi tiến Chốt thăm dò — Đỏ có thể thủ hòa.', 8: 'Đen thấy thời cơ chín muồi — tấn công chớp nhoáng, binh quý thần tốc! Đỏ trong khoảnh khắc căng thẳng.', 12: 'Nếu Pháo đánh Tượng ngay, Đỏ chống Sĩ, vào cuộc chiến lâu dài. Bình Pháo thiểm kích cánh bên: Mã Pháo Đỏ không kịp về thủ — thua đã định.', 16: 'Đỏ mất Pháo — Đen thắng.' },
      v: { 0: { 1: 'Nên bình Tướng vào giữa…', 3: '…tiến Chốt thăm dò — Đỏ thủ hòa được.' }, 1: { 1: 'Nếu Pháo đánh Tượng ngay…', 2: '…chống Sĩ — vào cuộc chiến lâu dài.' } },
      kq: 'thang',
    },
    '5 TONG KET CHIEN THUAT TAN CUOC': {
      t: 'Tổng Kết Chiến Thuật Tàn Cuộc',
      s: 'Ở tàn cuộc, bất kỳ chiến thuật đơn giản nào cũng có thể quyết định thắng bại; đánh chớp nhoáng đòi hỏi nhận ra điểm yếu và lấy tốc độ nhanh nhất triển khai thế công.',
      c: `<p>Nhiều kỳ thủ nghĩ tàn Pháo Mã diễn biến rất chậm, động một tí là giằng co mấy chục hiệp. Thực tế, quân phối hợp như Pháo Mã Chốt phát động tấn công nhanh đúng thời cơ là rất chí mạng — không thể sơ ý.</p>
<p>Tàn cuộc là giai đoạn cuối của toàn cuộc: bất kỳ chiến thuật đơn giản nào cũng có thể trực tiếp quyết định thắng thua. Vì vậy tàn cuộc tuy ít quân càng phải cẩn trọng; nhiều chiến thuật đã học ở trung cuộc, tới tàn cuộc thường là chiến thuật chế thắng.</p>
<p>Loạt bài chiến thuật tàn cuộc kết thúc bằng <strong>đánh chớp nhoáng</strong> — tư tưởng chiến thuật của chiến tranh hiện đại, trọng tâm là lấy nhanh đánh chậm. "Binh lực trên hết" là kết cấu chiến đấu trong trạng thái bình thường; đánh chớp nhoáng yêu cầu cao hơn: nhạy bén nhận ra điểm yếu trong hình trận đối phương, lợi dụng lúc quân đối phương khó về thủ kịp, lấy tốc độ nhanh nhất triển khai thế công.</p>
<p>Tàn cuộc binh lực có hạn, nhưng tiểu binh đoàn phối hợp ăn ý vẫn chí mạng. Dùng tốt mọi quân, phát huy 100% giá trị — đó là phương hướng cần nỗ lực ở mọi tàn cuộc. Phần tiếp theo phân loại tàn cuộc truyền thống: tàn Xe, tàn Pháo Mã… đặc điểm và cách nắm bắt.</p>`,
    },
  },
};
