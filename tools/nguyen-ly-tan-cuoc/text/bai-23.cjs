// Bài 23 — Chiến thuật chủ yếu cờ tàn: kìm chế. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Chiến Thuật Chủ Yếu Cờ Tàn: Kìm Chế',
  y: 'Ở trung cuộc kìm chế để được quân; ở tàn cuộc kìm chế dùng tốt có thể khiến đối phương ký biên bản thua. Đối ứng với kìm chế là thiểm kích.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Chiến Thuật Ở Tàn Cuộc — Bắt Đầu Từ Kìm Chế',
      s: 'Khai cuộc thiên về định thức, tàn cuộc có tàn thực dụng, trung cuộc lấy chiến thuật làm chính — nhưng tàn cuộc vẫn là chiến đấu nên vẫn cần chiến thuật. Bắt đầu với kìm chế.',
      c: `<p>Về kiến thức cơ bản: khai cuộc thiên về định thức, tàn cuộc có tàn thực dụng, trung cuộc lấy chiến thuật làm chính. Chiến thuật là phương pháp chiến đấu — vậy có hợp dùng ở tàn cuộc không? Có: khai cuộc là bày binh bố trận, trung cuộc là chiến đấu, tàn cuộc là giai đoạn cuối — thậm chí là quyết chiến — đã chiến đấu thì không thoát khỏi chiến thuật; chỉ là quân ít nên nhiều chiến thuật không còn dùng được. Mấy bài tới bàn các chiến thuật phải nắm ở tàn cuộc.</p>
<p>Bài này: <strong>kìm chế</strong>. Ở trung cuộc, kìm chế lý tưởng là được quân, có khi không được quân mà giành được tiên cũng tốt. Ở tàn cuộc, kìm chế có thể là chìa khóa thắng.</p>`,
    },
    '2 DON XE kheo thang MA': {
      t: 'Đơn Xe Khéo Thắng Pháo Mã — Kìm Chế Ba Quân',
      s: 'Pháo sau lưng Tướng là thế thủ khá tốt; nếu Mã linh hoạt thì hòa. Nhưng Mã Đen đang có vấn đề — Đỏ dùng kìm chế trói cả Tướng, Pháo lẫn Mã.',
      c: `<p>Đơn Xe đấu Pháo Mã còn có tranh luận. <strong>Phân tích</strong>: Pháo Đen sau lưng Tướng là thế thủ khá tốt — nếu Mã linh hoạt hơn một chút thì hòa (kiến thức truyền thống). Nhưng Mã Đen đang có vấn đề, nên Đỏ có cơ hội thắng bằng <strong>kìm chế</strong>.</p>`,
      k: { 4: 'Nếu Tướng lùi, Tướng Đỏ bình — trói chết cả ba quân Tướng, Pháo, Mã của Đen.', 9: 'Đỏ thắng.' },
      v: { 0: { 1: 'Nếu Tướng lùi…', 2: '…Tướng Đỏ bình — trói chết cả ba quân Đen.' } },
      kq: 'thang', p: 'do',
    },
    '3 TUYEN CUOC THUC CHIEN TREN MANG': {
      t: 'Ván Thực Chiến: Kìm Chế Xe Mã, Rồi Thiểm Kích Để Tự Cởi Trói',
      s: 'Xe song Chốt chưa qua sông, khuyết Tượng — theo lý không đủ thắng. Đỏ tạo quấy rối, bình Pháo kìm chế đánh chết Mã; khi chính mình bị kìm, Đỏ dùng Chốt tạo cơ hội thiểm kích để giải thoát.',
      c: `<p><strong>Phân tích cục diện</strong>: Đỏ Xe song Chốt chiếm ưu binh lực, nhưng song Chốt chưa qua sông, lại khuyết Tượng; Xe Mã Đen linh hoạt vẫn tạo được quấy rối — tổng thể Đỏ không đủ thắng. Đen muốn hòa có nhiều cách: ăn Chốt, đổi Xe, Mã đổi Pháo, thậm chí Mã đổi song Chốt. Tỷ lệ hòa rất lớn. Nhưng với kỳ thủ chuyên nghiệp, dù chỉ 1% cơ hội cũng phải nỗ lực 100% — mạch tính là <strong>cố gắng tạo quấy rối để tăng khả năng đối phương sai</strong>.</p>
<h2>Kìm chế</h2>
<p>Lui Xe kìm chế gần như là cơ hội duy nhất; nó đặt trước Đen một cám dỗ lớn là ăn Chốt (Đen ăn — không phải là không hòa được, chỉ phiền hơn; còn có cách gọn hơn là Mã đạp Sĩ đổi Xe, thành Pháo song Chốt đấu Mã Sĩ Tượng toàn — hòa tiêu chuẩn). Khi Đỏ bình Xe gọi sát, Đen ra Tướng là sai lầm lớn: nước gọi sát chỉ là chiêu bài, mục đích thật là bình Pháo rồi tiến Pháo đánh chết Mã — thao tác tiêu chuẩn của kìm chế. Đen nên bình Xe đỡ (nhánh phụ), khi Đỏ bình Pháo thì Mã đạp Sĩ thành hòa.</p>
<h2>Thiểm kích — đối ứng của kìm chế</h2>
<p>Đỏ tốn nhiều công đánh chết được Mã, nhưng Xe Pháo lại bị Đen kìm chặt — chẳng lẽ không thắng nổi? Chiến thuật đối ứng với kìm chế là <strong>thiểm kích</strong>. Lúc đầu Đỏ chưa có cơ hội thiểm kích, nhưng dùng Chốt biên tạo ra cơ hội: Chốt ăn Sĩ giữa chiếu, Đen lộ sơ hở, Xe Pháo Đỏ được giải thoát.</p>`,
      k: { 2: 'Đuổi Mã xem thái độ, tăng chút áp lực. Mã tiến 6 có lẽ còn tốt hơn: Đen có Tướng bình và đòn sát ngọa tào, Đỏ có thể mất Xe.', 4: 'Đen cũng có thể nhảy Mã bỏ Mã, trực tiếp mặc cả thắng hòa; nhưng không cần, Đen đánh tốt là chắc hòa.', 5: 'Lui Xe kìm chế — gần như cơ hội thắng duy nhất. Đặt trước Đen cám dỗ ăn Chốt. Cách gọn hơn của Đen: Mã đạp Sĩ đổi Xe — hòa tiêu chuẩn.', 7: 'Bình Xe đuổi Tượng gọi sát — cơ hội vừa xuất hiện, Đen không được đi cẩu thả.', 8: 'Ra Tướng — sai lầm lớn! Nước gọi sát của Đỏ chỉ là chiêu bài, mục đích thật là bình Pháo rồi tiến Pháo đánh chết Mã. Ra Tướng còn khiến Mã không nhảy được. Nên bình Xe đỡ.', 14: 'Hiện tượng thú vị: Đỏ đánh chết Mã nhưng Xe Pháo bị kìm chặt. Đối ứng với kìm chế là thiểm kích — Đỏ dùng Chốt biên tạo cơ hội.', 24: 'Đen muốn tránh thiểm kích phải giữ hai quân ở cánh phải, nhưng Chốt Đỏ phá hoại nỗ lực ấy.', 35: 'Tiếp theo chỉ cần Chốt ăn Sĩ giữa, Đen lộ sơ hở, Xe Pháo Đỏ được giải thoát.', 36: 'Nếu Tượng lên, Chốt bình; Sĩ lên thì Pháo chiếu rút Xe; Tướng lên thì Xe chiếu — Đen không kìm Đỏ được nữa.', 39: 'Đỏ ăn được Mã nhờ kìm chế, rồi nhờ Chốt áp cung ăn Sĩ chiếu mà giải thoát Xe Pháo.' },
      v: { 0: { 1: 'Mã tiến 6 cũng được…', 3: '…Tướng bình — Đen có đòn ngọa tào, Đỏ có thể mất Xe.' }, 4: { 1: 'Cách hòa gọn: Mã đạp Sĩ…', 5: '…đổi được Xe — Pháo song Chốt đấu Mã Sĩ Tượng toàn, hòa tiêu chuẩn.' }, 5: { 1: 'Ứng phó đúng: bình Xe đỡ…', 3: '…Mã đạp Sĩ — hòa.' } },
      kq: 'thang',
    },
    '4 TRONG DIEM BAI HOC': {
      t: 'Trọng Điểm Bài 23: Kìm Chế Và Thiểm Kích',
      s: 'Kìm chế ở tàn cuộc mạnh hơn trung cuộc một bậc — có thể khiến đối thủ ký biên bản thua; chiến thuật đối ứng là thiểm kích.',
      c: `<ol>
<li><strong>Kìm chế</strong> là chiến thuật quan trọng cả ở trung cuộc lẫn tàn cuộc — ở tàn cuộc uy lực còn cao hơn một bậc. Hai ví dụ đều không thể thắng nếu không dùng kìm chế. Ở trung cuộc kìm chế phần nhiều để được quân, đối thủ vẫn đánh tiếp; ở tàn cuộc dùng tốt có thể khiến đối thủ ký biên bản thua ngay.</li>
<li><strong>Kìm chế và phản kìm chế</strong>: chiến thuật đối ứng là <strong>thiểm kích</strong> — Xe Pháo Đỏ thoát kìm chế nhờ thiểm kích. Thủ pháp giải vây khéo như Mã đạp Sĩ đổi Xe cũng phải nắm vững, ở thời khắc quan trọng có thể bảo toàn tính mạng.</li>
</ol>`,
    },
  },
};
