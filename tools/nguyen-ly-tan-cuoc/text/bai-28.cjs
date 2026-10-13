// Bài 28 — Chiến thuật chủ yếu cờ tàn: mưu hòa. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Chiến Thuật Chủ Yếu Cờ Tàn: Mưu Hòa',
  y: 'Mưu hòa là chiến thuật riêng của tàn cuộc: khi binh lực bất lợi, dùng kỹ xảo để về một thế hòa định sẵn — điều kiện là thuộc thật kỹ các thế thắng hòa.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Mưu Hòa — Chiến Thuật Chỉ Có Ở Tàn Cuộc',
      s: 'Thắng được ván không thể thắng, hòa được ván rất khó hòa: khi binh lực bất lợi, dùng kỹ xảo mưu hòa để tránh thua là biểu hiện của kỹ nghệ cao.',
      c: `<p>Các chiến thuật trước đều dùng rộng rãi ở trung cuộc; chiến thuật của bài này chỉ có ở tàn cuộc: <strong>mưu hòa</strong>. Đánh cờ có tấn công có phòng thủ, có cầu thắng có mưu hòa. Thú vị nhất là thắng được ván không thể thắng, hòa được ván rất khó hòa. Khi binh lực bất lợi, dùng kỹ xảo mưu hòa để tránh thua cũng là biểu hiện của kỹ nghệ cao. Xem vài ví dụ mưu hòa tinh xảo trong thực chiến.</p>`,
    },
    '2 VUONG THIEN NHAT hoa LY HAN LAM': {
      t: 'Ván Chọn: Vương Thiên Nhất Hòa Lý Hàn Lâm — Một Mã Đổi Song Chốt',
      s: 'Đen hơn Chốt, binh chủng tốt hơn, còn đang nhắm Chốt giữa. Đỏ tính chuẩn: dùng một Mã đổi song Chốt, giữ tuyến Chốt, kìm Xe Mã Đen — hòa.',
      c: `<p><strong>Phân tích cục diện</strong>: Đen hơn một Chốt đã qua sông; binh chủng Đen Xe Pháo Mã, Đỏ Xe song Mã — Đỏ thiệt. Đen còn đang nhắm Chốt giữa; Đỏ bất cẩn mất nó là coi như thua. May là Đỏ suy nghĩ ra hai kế hoạch mưu hòa tinh diệu.</p>
<ul>
<li>Đen cũng tinh, đã ăn thêm một Chốt — tiếp theo nếu Xe lui bảo vệ Mã thì Đen Xe Mã hai Chốt, thêm một cặp Chốt đối đầu, rất nguy. Nhưng nước Xe lui của Đỏ đã tính sẵn: một nước thành hòa!</li>
<li>Đỏ dùng <strong>một Mã đổi song Chốt</strong>, tính chuẩn là mưu hòa được. Nếu Đen lui Mã, Xe Đỏ lui giữ chặt tuyến Chốt — đây là phán đoán tàn cuộc: không biết thế này là hòa thì không chọn biến này. Giữ được Chốt biên, Đen không ăn trắng được, chỉ có thể đổi Xe để ăn — thành Mã Chốt đấu Sĩ Tượng toàn, cũng hòa.</li>
<li>Cuối cùng Đỏ dùng thủ thuật kìm chế tinh xảo, không cho Xe Mã Đen đi; Đen không ăn được Chốt — hòa.</li>
</ul>`,
      k: { 4: 'Đen cũng tinh, ăn thêm một Chốt. Nếu Xe lui bảo vệ Mã, Đen Xe Mã hai Chốt, rất nguy. Nhưng Đỏ đã tính sẵn — một nước thành hòa!', 7: 'Đỏ dùng một Mã đổi song Chốt, tính chuẩn là mưu hòa được. Nếu Đen lui Mã, Xe lui giữ tuyến Chốt; Đen chỉ có thể đổi Xe để ăn Chốt biên — thành Mã Chốt đấu Sĩ Tượng toàn, hòa.', 11: 'Thủ thuật kìm chế tinh xảo: Xe Mã Đen không đi được, không ăn được Chốt — hòa.' },
      v: { 0: { 1: 'Nếu Mã lui…', 2: '…Xe lui giữ chặt tuyến Chốt.' } },
      kq: 'hoa',
    },
    '3 TUYEN CUOC HO VINH HOA hoa DUONG QUAN LAN': {
      t: 'Ván Chọn: Hồ Vinh Hoa Hòa Dương Quan Lân — Phi Tượng Đổi Pháo',
      s: 'Sắp thành song Pháo song Chốt đấu song Pháo Chốt Sĩ Tượng toàn — Đen rất khó thủ. Đen tập trung ăn Chốt biên; khi Đỏ định Pháo đánh Tượng, Đen phi Tượng đổi Pháo — hòa.',
      c: `<p><strong>Phân tích cục diện</strong>: Đỏ hơn một Chốt, sắp thành song Pháo song Chốt đấu song Pháo Chốt Sĩ Tượng toàn — phát triển bình thường thì Đen rất khó thủ. Chốt Đen lại ở miệng Tượng, Sĩ Tượng không chỉnh tề — một đống vấn đề. Người cầm Đen là cao thủ tàn cuộc nên xử lý xuôi chèo mát mái.</p>
<ul>
<li>Trọng điểm rõ ràng: <strong>ăn Chốt</strong> — ăn được Chốt Đỏ thì mọi vấn đề tan biến; Chốt biên Đỏ đang ở vị trí lúng túng.</li>
<li>Chốt biên không phải muốn ăn là ăn: nếu Đen phi Tượng ngay, Đỏ tiến Pháo chiếu, rồi Pháo bình đánh Tượng — Đen mất cả chì lẫn chài.</li>
<li>Đen phi Tượng đuổi Pháo trước — nước có thâm ý.</li>
<li>Tinh hoa ván cờ: <strong>phi Tượng đổi Pháo</strong>. Nếu lui Pháo ngay thì Đỏ Pháo đánh Tượng; việc duy nhất phải làm là không cho Đỏ đánh. Đỏ đổi thì thành Pháo song Chốt đấu Pháo Sĩ Tượng toàn — hòa chính thức; không đổi thì đi đâu Đen cũng lui Pháo đánh được Chốt biên. Mưu hòa thành công.</li>
</ul>`,
      k: { 1: 'Đỏ hơn Chốt, Đen có một đống vấn đề — người cầm Đen là cao thủ tàn cuộc.', 2: 'Trọng điểm rõ ràng: ăn Chốt. Chốt biên Đỏ đang ở vị trí lúng túng.', 5: 'Chốt biên không dễ ăn: nếu phi Tượng ngay, Đỏ Pháo chiếu, Chốt tiến, rồi Pháo bình đánh Tượng — Đen mất cả chì lẫn chài.', 6: 'Phi Tượng đuổi Pháo trước — có thâm ý.', 8: 'Biến hóa vừa xét tưởng bất khả thi — nhưng giờ đã có chút thay đổi.', 12: 'Tinh hoa: phi Tượng đổi Pháo. Đỏ đổi thì Pháo song Chốt đấu Pháo Sĩ Tượng toàn — hòa chính thức; không đổi thì Đen lui Pháo đánh được Chốt biên. Mưu hòa thành công.' },
      v: { 0: { 1: 'Nếu phi Tượng ngay…', 6: '…Pháo bình đánh Tượng — Đen mất cả chì lẫn chài.' }, 1: { 1: 'Nếu lui Pháo ngay…', 2: '…Pháo bình đánh Tượng.' } },
      kq: 'hoa',
    },
    '4 TUYEN CUOC TRIEU QUOC VINH hoa LI KHAM': {
      t: 'Ván Chọn: Triệu Quốc Vinh Hòa Lữ Khâm — Pháo Vào Hoa Tâm',
      s: 'Đen khuyết Tượng, Tượng giữa sắp bị bắt — rất nguy. Cách mưu hòa tốt nhất là đổi quân; Đen đưa Pháo vào hoa tâm đổi chết Pháo Đỏ, thành Xe Chốt đấu Xe song Sĩ.',
      c: `<p><strong>Phân tích</strong>: Đỏ hơn Chốt lộ 3, Đen khuyết Tượng, Tượng giữa gần như bị bắt chết — tỷ lệ cao thành Xe Pháo Chốt đấu Xe Pháo song Sĩ; Đen không có uy hiếp. Đánh giá tổng hợp: Đen rất nguy. Cách mưu hòa tốt nhất là <strong>đổi quân</strong> (Xe hay Pháo đều được) — nhưng đâu có đơn giản.</p>
<p>Ai ngờ được đưa Pháo vào <strong>hoa tâm</strong> lại tuyệt diệu như vậy: đổi chết Pháo Đỏ. Đỏ không thể đánh Pháo về vì Xe tiến là sát cục. Sau khi đổi, thành Xe Chốt đấu Xe song Sĩ — mưu hòa thành công.</p>`,
      k: { 1: 'Đen khuyết Tượng, Tượng giữa sắp bị bắt — cách mưu hòa tốt nhất là đổi quân.', 8: 'Pháo vào hoa tâm — tuyệt diệu: đổi chết Pháo Đỏ. Đỏ không đánh Pháo về được vì Xe tiến sát cục. Thành Xe Chốt đấu Xe song Sĩ — mưu hòa thành công.' },
      kq: 'hoa',
    },
    '5 TUYEN CUOC HO VINH HOA thang LUU KIEM THANH': {
      t: 'Ván Chọn: Hồ Vinh Hoa Thắng Lưu Kiếm Thanh — Một Bước Thiên Đường, Một Bước Địa Ngục',
      s: 'Đen gần mưu hòa thành công, chỉ cần chọn đúng giữa Xe bình 2 (hòa) và Xe bình 4 (thua). Đen tiện tay chọn sai — Đỏ đổi Xe phản trực giác, Pháo Đen bị khốn chết.',
      c: `<p><strong>Phân tích cục diện</strong>: song Xe Mã đấu song Xe Pháo — ưu thế chính của Đỏ là hơn một Tượng; nếu không thì chắc hòa. Cơ hội của Đỏ: Xe lộ 9 Đen chưa ra (Đen đã ăn Pháo đáy của Đỏ nên mới về vị trí này — dù vậy ở lại đó là vấn đề lớn), và "cờ tàn Pháo về nhà": Pháo Đen rất muốn về nhà, nhất là khi nhà khuyết Tượng.</p>
<p>Đen vừa chọn Pháo bình 2 — một nước tiên. Phản xạ đầu là phi Tượng (khuyết Tượng sợ Pháo); nhưng theo bài cản trở, biết đối phương muốn Pháo về nhà thì sao để nó về dễ dàng? Đáp án đúng: <strong>cản trở — Xe bình 8</strong> (nhánh phụ), tính sâu thì có thể ăn trắng một Pháo. Đỏ đi sai thứ tự, Pháo Đen thuận lợi lui về, tỷ lệ hòa tăng mạnh.</p>
<h2>Thiên đường và địa ngục</h2>
<p>Song Xe đấu Pháo song Sĩ là hòa, dễ thủ: chỉ cần Pháo bình sang lộ 4, Xe lui về tuyến hoành 2. Nhưng cặp Chốt đối đầu đang chạm nhau — Đỏ phi Tượng thăm dò. Đen thả lỏng: dù sao cũng hòa, tùy tiện đi một nước. Trước mặt có hai lựa chọn <strong>Xe bình 2 (hòa) và Xe bình 4 (thua)</strong>. Đen chọn bình 4 — Đỏ đổi Xe phản trực giác, nước cờ thần diệu: Pháo Đen không nhấc lên được, bị khốn, Chốt Đen chỉ đi tặng không — Đen nhận thua.</p>
<p>Vì sao bình 2 hòa? Đen có thể <strong>từ chối đổi Xe</strong>: thực chiến Đen chết ngạt vì không giữ được Xe; bình 2 thì có nước chiếu Tướng thoát thân, kiên trì không đổi Xe, giải quyết xong Chốt biên là hòa. Ai đánh tàn cũng từng kiên trì bao lâu, sắp hòa thì một nước sai làm công sức đổ sông đổ biển — đó là khảo nghiệm của tàn cuộc với kỳ thủ.</p>`,
      k: { 2: 'Nước hạ Sĩ cho manh mối: Đỏ có lẽ đã thấy biến cản trở nhưng đi sai thứ tự. Đen cũng thấy không ổn nên không ăn Tượng — sai thứ tự khiến Pháo Đen thuận lợi lui về, tỷ lệ hòa tăng mạnh.', 21: 'Đoạn này Đen đánh không tệ: đổi được một Chốt, mất một Tượng nhưng Xe đã ra. Vẫn phải chú ý: Mã Đỏ ở vị trí quá tốt.', 51: 'Song Xe đấu Pháo song Sĩ là hòa, dễ thủ. Nhưng cặp Chốt đối đầu đang chạm nhau, Đỏ phi Tượng thăm dò. Trước mặt Đen: Xe bình 2 thì hòa, Xe bình 4 thì thua!', 55: 'Đúng lúc Đen sắp hưởng niềm vui mưu hòa, Đỏ đổi Xe phản trực giác — cờ Đen bị đánh phá hoàn toàn. Nước cờ thần diệu!', 59: 'Pháo Đen không nhấc lên được, bị khốn, Chốt Đen chỉ đi tặng không — Đen nhận thua.' },
      v: { 0: { 1: 'Đáp án đúng: cản trở — Xe bình 8!', 11: 'Phi Tượng — có khả năng ăn trắng một Pháo.' }, 2: { 1: 'Khác biệt giữa bình 2 và bình 4 là đâu?', 5: 'Đen có thể từ chối đổi Xe — bình 2 có nước chiếu Tướng thoát thân.', 7: 'Kiên trì không đổi Xe, giải quyết xong Chốt biên — hòa.' } },
      kq: 'thang',
    },
    '6 TRONG DIEM BAI HOC': {
      t: 'Trọng Điểm Bài 28: Mưu Hòa Cần Thuộc Thế Thắng Hòa',
      s: 'Mưu hòa là chiến thuật đặc biệt chỉ có ở tàn cuộc; muốn dùng thành thạo phải thấu hiểu các thế thắng hòa theo lý.',
      c: `<ol>
<li><strong>Mưu hòa</strong> là chiến thuật đặc biệt chỉ có ở tàn cuộc, dùng trong tình huống cực kỳ bất lợi: qua các kỹ xảo chiến thuật để đạt mục đích hòa.</li>
<li>Tiêu chí để nắm thành thạo mưu hòa là <strong>thấu hiểu sâu sắc các thế thắng – hòa theo lý</strong>; nếu không thì dù thật sự có cơ hội cũng chưa chắc nắm được.</li>
</ol>`,
    },
  },
};
