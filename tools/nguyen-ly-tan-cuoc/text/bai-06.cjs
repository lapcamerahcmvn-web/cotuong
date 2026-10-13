// Bài 6 — Mưu đoạt Chốt trong tàn cờ không Xe. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Mưu Đoạt Chốt Trong Tàn Cờ Không Xe',
  y: 'Không có Xe thì tốc độ quét Chốt chậm hẳn — Pháo quét Chốt nhanh hơn Mã, nhất là Chốt biên; và Mã có kỹ xảo riêng để giành lại Chốt.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Tàn Không Xe — Đánh Giá Lại Tốc Độ Quét Chốt',
      s: 'Xe là quân quét Chốt mạnh nhất; khi không còn Xe, tốc độ quét Chốt phải được đánh giá lại.',
      c: `<p>Là chủ lực mạnh nhất, kỹ năng lớn đầu tiên của Xe là quét Chốt. Khi tàn cờ không còn Xe, tốc độ quét Chốt chậm đi rất nhiều — phải đánh giá lại xem Pháo hay Mã làm việc này tốt hơn, và khi nào dùng quân nào.</p>`,
    },
    '2 VU DU 1 (HINH 33)': {
      t: 'Ví Dụ: Pháo Quét Chốt Nhanh Hơn Mã',
      s: 'Hai bên cùng ăn Chốt từ biên: Pháo chỉ cần có ngòi là đánh tả xung hữu đột, Mã còn phải điều chỉnh — Pháo nhanh hơn hẳn.',
      c: `<p>Năng lực quét Chốt của Pháo rõ ràng mạnh hơn Mã. Thử cho hai bên cùng ăn Chốt từ đường biên: Mã còn phải điều chỉnh chân, còn Pháo chỉ cần có ngòi là tả xung hữu đột, tốc độ rất nhanh. Điểm yếu của Pháo cũng ở ngòi: không có ngòi thì phế bỏ.</p>
<p>Các ví dụ sau phân tích vai trò của Pháo và Mã khi mưu đoạt Chốt, và khi nào nên dùng Mã, khi nào dùng Pháo để ăn Chốt.</p>`,
      k: { 1: 'Giả sử hai bên cùng bắt đầu ăn Chốt từ đường biên.', 6: 'Hiệu suất đánh Chốt của Pháo Đen rõ ràng cao hơn Mã Đỏ: Mã còn phải điều chỉnh, Pháo có ngòi là đánh liên tiếp.' },
    },
    '3 Vi du muu doat chot thuc chien MA PHAO CHOT doi SONG MA 1': {
      t: 'Ví Dụ: Mã Pháo Chốt Đấu Song Mã — Vận Pháo Ăn Chốt Biên',
      s: 'Tranh cặp Chốt đối đầu ở biên: Đỏ vận Pháo ăn Chốt biên, sau đó hy sinh một Tượng để Pháo chìm đáy yểm hộ Chốt 7 qua sông — mưu đoạt Chốt thành công.',
      c: `<p><strong>Phân tích cục diện</strong>: Đỏ có lợi về binh chủng và hơn một Chốt lộ 7; tiêu điểm là cặp Chốt đối đầu ở biên. Đỏ ăn được Chốt biên thì thành Mã Pháo song Chốt đấu song Mã Sĩ Tượng toàn — hơn hai Chốt là thắng; không ăn được thì hòa.</p>
<p>Đỏ vận Pháo ăn Chốt biên — thủ đoạn rất thực dụng trong tàn Pháo Mã; song Mã Đen chậm chạp không kịp cứu. Lý thuyết đã thắng, nhưng thực chiến khác: Đen lại tính chuyện đổi quân để mưu đoạt Chốt! Đỏ không được đổi Mã (thành Pháo song Chốt đấu Mã Sĩ Tượng toàn — hòa), cũng không được lui Mã (Đen đổi tiếp thành Mã Pháo Chốt đấu Mã Sĩ Tượng toàn — hòa).</p>
<p>Cuối cùng Đỏ chấp nhận hy sinh một Tượng, dùng Pháo chìm đáy làm "muộn cung" để đưa Chốt 7 qua sông — về cơ bản là thắng.</p>`,
      k: { 6: 'Vận Pháo ăn Chốt biên. Nhưng Đen đang tính đổi quân để mưu đoạt lại Chốt — Đỏ không được đổi Mã (Pháo song Chốt đấu Mã Sĩ Tượng toàn là hòa), cũng không được lui Mã.', 7: 'Chỉ có thể đi như vậy.', 11: 'May còn nước Tượng này, nếu không Chốt lộ 7 bị bắt chết.', 15: 'Hy sinh một Tượng, dùng Pháo chìm đáy đưa Chốt 7 qua sông — Đỏ mưu đoạt Chốt thành công, về cơ bản đã thắng.' },
      v: { 0: { 1: 'Nếu lui Mã…', 2: '…Mã Đen đổi tiếp, thành Mã Pháo Chốt đấu Mã Sĩ Tượng toàn — hòa.' } },
      kq: 'thang',
    },
    '4 Vi du muu doat chot thuc chien MA PHAO CHOT doi SONG MA 2': {
      t: 'Ví Dụ: Chốt Biên Nên Ăn Bằng Pháo, Không Phải Bằng Mã',
      s: 'Mã ăn Chốt biên rồi bị kẹt ở biên, Đỏ phải chọn mất Chốt hay mất Sĩ. Đường đúng: dùng Pháo đánh Chốt biên, và bỏ Sĩ trước — quân chết chớ vội ăn.',
      c: `<p>Tương tự ví dụ trước, Đỏ cũng phải ăn Chốt biên. Lúc này Mã Đỏ ăn được Chốt — có nên ăn không?</p>
<p>Mạch chính cho thấy cái giá: Mã nhảy ra biên ăn Chốt, Mã Đen tràn lên; Mã ở biên luôn phải tính đường quay về, hiệu suất thấp. Cuối cùng Đỏ phải chọn giữa mất Chốt lộ 7 và mất Sĩ — tất nhiên giữ Chốt, nhưng đã mất Sĩ thì độ khó thắng tăng.</p>
<h2>Đường đúng: Pháo đánh Chốt biên</h2>
<p>Nhánh phụ: dùng Pháo đánh Chốt biên, và <strong>bỏ Sĩ trước</strong> rồi mới ăn — "quân chết chớ vội ăn". Nếu ăn Chốt ngay, Mã Đen dọa Sĩ, Đỏ phải mất một Tượng; lui Pháo về thì quân Đỏ bị chặn đường. Chịu khó truy hỏi "còn nước tốt hơn không?" mới tìm ra nước bỏ Sĩ — thái độ cần có khi nghiên cứu tàn cuộc.</p>
<p><strong>Kết luận</strong>: Pháo điều động linh hoạt nên ăn Chốt nhanh hơn, đặc biệt là Chốt biên. Mã ăn Chốt biên thì bị kẹt ở biên; Pháo thì không sao, sau còn có thể chìm đáy hoặc về trung lộ. Có lựa chọn thì nên dùng Pháo ăn Chốt biên.</p>`,
      k: { 2: 'Mã Đỏ nhảy ra biên, Mã Đen xông lên — ứng phó không chính xác là mất Chốt lộ 7.', 3: 'Mã tới biên luôn phải tính đường quay lại, nếu không không phát huy được tác dụng; lúc này quay về đã có vấn đề.', 4: 'Đỏ ít nhất mất một Sĩ — độ khó thắng tăng lên.', 6: 'Bắt đôi: "thiết binh" lộ 7 thất thủ. Lúc này không thể tiến Pháo cản chân Mã.', 10: 'Mất Chốt hay mất Sĩ? Tất nhiên giữ Chốt. Nhưng đã mất Sĩ là không hài lòng — Mã ăn Chốt biên ngay từ đầu không phải nước hay; nên dùng Pháo đánh Chốt.' },
      v: { 0: { 1: 'Đường đúng: Pháo bình đánh Chốt biên.', 3: 'Bỏ Sĩ trước — quân chết chớ vội ăn, thao tác cao cấp. Ăn Chốt ngay thì Mã Đen dọa Sĩ, Đỏ phải mất Tượng.', 5: 'Vận Mã về phía trước bảo vệ Chốt lộ 7 an toàn nhất — Đen gần như hết khả năng hòa.', 7: 'Trạng thái lý tưởng nhất của Đỏ.' } },
    },
    '5 VD THUC CHIEN MUU DOAT CHOT MA KHEO MUU DOAT CHOT': {
      t: 'Ví Dụ: Mã Khéo Mưu Đoạt Chốt — Kỹ Xảo Giữ Mạng',
      s: 'Chốt biên Đen chắc chắn mất, còn lại Mã Chốt đấu Mã Sĩ Tượng toàn là thua — nhưng Đen dùng Mã cản Mã, đạp Chốt, giành lại một Chốt và có cơ hội hòa.',
      c: `<p><strong>Phân tích cục diện</strong>: Đen đứng trước thử thách sinh tử — nếu Chốt Đen bị ăn sẽ thành Mã Chốt đấu Mã Sĩ Tượng toàn, gần như không thể sống sót. Chốt biên Đen chắc chắn không giữ nổi, nhưng Đen đánh tốt thì vẫn không thua.</p>
<p>Kỹ xảo vận Mã mưu đoạt Chốt: Đen dùng Mã <strong>cản Mã đạp Chốt</strong>, không cho Mã Đỏ quay về, rồi bắt lại được một Chốt — có cơ hội mưu hòa. Kỹ xảo rất thường dùng, có thể cứu mạng ở thời khắc then chốt.</p>`,
      k: { 1: 'Nếu mất Chốt sẽ thành Mã Chốt đấu Mã Sĩ Tượng toàn — Đen gần như không thể sống. Chốt biên chắc mất, nhưng đánh tốt thì không thua.', 6: 'Cản Mã, đạp Chốt — nước then chốt, không cho Mã Đỏ quay về.', 8: 'Bắt được một Chốt — Đen có khả năng mưu hòa. Kỹ xảo rất thường dùng trong thực chiến.' },
      kq: 'hoa',
    },
    '6 TUYEN CUU MUU DOAT CHOT BOC PHUNG BA thang QUACH UY': {
      t: 'Ván Chọn: Pháo Mã Mưu Đoạt Chốt — Bốc Phụng Ba Thắng Quách Uy',
      s: 'Đổi song Xe về tàn Pháo Mã khi hơn hai Chốt (trong đó có Chốt giữa và Chốt 3): Đỏ vừa khống chế hai Mã Đen vừa âm thầm tích lũy ưu thế ba Chốt.',
      c: `<p>Ván đấu giữa kỳ thủ chuyên nghiệp và nghiệp dư. Đỏ hơn hai Chốt nên chuẩn bị đơn giản hóa cục diện: không giằng co ở trung lộ mà đổi luôn song Xe về tàn Pháo Mã.</p>
<p>Tàn Pháo Mã hơn hai Chốt là chí mạng, càng nguy hơn khi một Chốt là Chốt giữa, một Chốt là Chốt 3. Hai Pháo Đỏ đang ở tiền tuyến, trong miệng còn mấy Chốt Đen — Đen gặp nguy. Đỏ vừa ăn Chốt vừa hạn chế Mã Đen nhảy vào giữa, vừa khống chế hai Mã không cho ra quân, vừa tích lũy ưu thế ba Chốt — thắng cuộc đã định.</p>`,
      k: { 3: 'Hai bên đổi song Xe về tàn Pháo Mã. Hơn hai Chốt — một là Chốt giữa, một là Chốt 3 — rất lợi hại; hai Pháo Đỏ ở tiền tuyến, Đen nguy.', 4: 'Không muốn Chốt 3 Đỏ qua sông nên bỏ ý định Pháo đánh Chốt — nhưng so hai mạch, ăn Chốt có lẽ quan trọng hơn.', 5: 'Đen không đánh Chốt thì Đỏ không cho ăn nữa.', 9: 'Nước này vừa ăn Chốt vừa hạn chế Mã Đen nhảy vào giữa — rất quan trọng.', 22: 'Đỏ vừa khống chế hai Mã Đen, vừa vô hình tích lũy ưu thế ba Chốt — thắng cuộc đã định.' },
      kq: 'thang',
    },
    '7 TRONG DIEM BAI HOC': {
      t: 'Trọng Điểm Bài 6: Pháo Đánh Chốt Biên, Chốt Là Vàng Ở Tàn Pháo Mã',
      s: 'Tàn Pháo Mã mưu đoạt Chốt chậm hơn tàn có Xe; Pháo quét Chốt tốt hơn Mã, nhất là Chốt biên. Hơn Chốt thì vây đánh người, kém Chốt thì bị vây đánh.',
      c: `<ol>
<li><strong>Tàn Pháo Mã mưu đoạt Chốt chậm hơn tàn có Xe</strong>, nhưng Pháo vẫn quét Chốt tốt hơn Mã — đặc biệt là Chốt biên: Mã ăn Chốt biên thì tổn thất hiệu suất lớn. Có lựa chọn thì để Pháo đánh Chốt biên.</li>
<li><strong>Mưu đoạt Chốt là đại sự hàng đầu của tàn cờ</strong>: hơn Chốt thì vây đánh người khác, kém Chốt thì bị vây đánh. Ở tàn Pháo Mã, vì tỷ lệ đoạt Chốt thấp, giá trị của Chốt thể hiện cao nhất.</li>
</ol>`,
    },
  },
};
