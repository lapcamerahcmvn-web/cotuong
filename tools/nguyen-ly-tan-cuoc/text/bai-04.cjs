// Bài 4 — Chốt và tàn Sĩ Tượng. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Chốt Và Tàn Sĩ Tượng',
  y: 'Một Chốt xấp xỉ hai Sĩ hoặc hai Tượng: từ công thức này đọc ra hàng loạt thế thắng – hòa của tàn thực dụng.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Khi Sĩ Tượng Không Còn Nguyên Vẹn',
      s: 'Sĩ Tượng toàn thủ hòa được đơn Xe, Mã Chốt nhưng không thủ được Pháo Chốt. Thực chiến hiếm khi giữ đủ Sĩ Tượng tới cuối — bài này bàn về tàn Sĩ Tượng.',
      c: `<p>Bổ sung cho điểm giới hạn binh lực: bên thủ có Sĩ Tượng toàn có thể hòa đơn Xe, hòa Mã Chốt, nhưng không hòa được Pháo Chốt — đây là chỗ đầy huyền diệu của tàn cuộc.</p>
<p>Thực chiến, hai bên giằng co, rất ít khi giữ được Sĩ Tượng nguyên vẹn tới cuối; bị ăn một Sĩ, phá một Tượng là chuyện thường. Bài này bàn về bên phòng thủ đã <strong>tàn Sĩ Tượng</strong>.</p>`,
    },
    '2 MA CHOT le hoa SI TUONG TOAN': {
      t: 'Mã Chốt Hòa Sĩ Tượng Toàn',
      s: 'Thực chiến bên Sĩ Tượng toàn hay thua, nhưng Mã Chốt đấu Sĩ Tượng toàn là thế hòa được công nhận: lui Sĩ chặn Chốt, lui Tượng, rồi khốn chết Mã.',
      c: `<p>Sĩ Tượng toàn đấu Mã Chốt: thực chiến bên thủ hay thất thủ, nhưng về lý đây là <strong>thế hòa được công nhận</strong>. Mấu chốt là không cho Chốt chiếm trung tâm (Chốt đã xuống đáy thì vô dụng) và tìm cơ hội khốn Mã.</p>`,
      k: { 2: 'Lui Sĩ — nước tinh diệu cầu hòa! Ngăn Chốt Đỏ chiếm trung tâm (Chốt ăn Sĩ thì thành Chốt đáy, không còn tác dụng).', 4: 'Lui Tượng — nước quan trọng, sau đó có thể bỏ Sĩ để nhốt Mã.', 10: 'Khốn chết Mã Đỏ — chắc chắn hòa.' },
      kq: 'hoa', p: null,
    },
    '3 MA CHOT CAO le thang DON KHUYET SI': {
      t: 'Mã Chốt Cao Thắng Đơn Khuyết Sĩ',
      s: 'Sĩ Tượng không còn hoàn chỉnh thì tàn cờ tất thua: Đen thiếu một Sĩ, Đỏ có Chốt cao là chắc thắng — mục tiêu cuối cùng vẫn là Mã ngọa tào.',
      c: `<p>Khi Sĩ Tượng bên thủ không còn hoàn chỉnh, tàn cờ tất bại. Đen khuyết một Sĩ, Đỏ chỉ cần Chốt cao là chắc thắng.</p>
<p>Mạch nước cho thấy: khống chế Sĩ Đen gần như là điều kiện cần để thắng; Mã điều quân tinh tế với mục tiêu cuối là <strong>Mã ngọa tào</strong> — từ khai cuộc tới tàn cuộc, ngọa tào luôn là vị trí tấn công quan trọng nhất. Cuối cùng toàn bộ Sĩ Tượng Đen bị ăn sạch.</p>
<p>Nhưng không phải khuyết một Sĩ là thua: Mã Chốt đấu đơn khuyết Sĩ vẫn có thế hòa — "Thái công tọa kỳ" (bài sau).</p>`,
      k: { 8: 'Nếu Tướng Đen lên, Tướng Đỏ đã chiếm trung lộ, chỉ cần Mã chiếu là thắng ngay.', 13: 'Đen chỉ còn một Sĩ — chắc chắn không giữ nổi.', 20: 'Mấy nước vận Mã rất tinh tế, mục tiêu cuối cùng vẫn là Mã ngọa tào.', 21: 'Khống chế Sĩ Đen gần như là điều kiện cần để thắng.', 31: 'Sau đó Mã tiến chiếu là thắng. Khuyết Sĩ Tượng là thiệt thòi lớn khi phòng thủ.' },
      v: { 0: { 1: 'Nếu Tướng lên…', 2: '…Mã chiếu, Tướng Đỏ chiếm trung lộ — thắng nhanh.' } },
      kq: 'thang', p: 'do',
    },
    '4 DON KHUYET SI kheo hoa MA CHOT THAP (THAI CONG TOA KY)': {
      t: 'Đơn Khuyết Sĩ Khéo Hòa Mã Chốt Thấp — Thái Công Tọa Kỳ',
      s: 'Sĩ Đen nằm dưới Tướng, Đỏ không có cách ăn Sĩ; song Tượng Đen tự do đi lại, Đỏ không kìm chế được — thế hòa.',
      c: `<p>Sĩ Đen nằm ngay dưới Tướng, Đỏ không có cách nào ăn được Sĩ; thêm song Tượng Đen tự do hoạt động nên Đỏ không thể kìm chế — thế hòa theo lý, có tên "Thái công tọa kỳ".</p>`,
      kq: 'hoa',
    },
    '5 MA CHOT CAO le thang DON KHUYET TUONG': {
      t: 'Mã Chốt Cao Thắng Đơn Khuyết Tượng',
      s: 'Đen khuyết Tượng: trước tiên chọn điểm yếu — ăn Tượng còn lại. Khống chế Tượng, ép nó về góc rồi dùng Chốt bắt.',
      c: `<p>Đen khuyết một Tượng — Đỏ làm gì? Chọn điểm yếu mà đánh: <strong>ăn Tượng còn lại</strong>. Chốt khống chế không cho Tượng bay lên trung lộ, Mã ép Tượng về góc biên rồi Chốt bắt — thành Mã Chốt đấu song Sĩ, chắc thắng.</p>`,
      k: { 1: 'Trước tiên khống chế Tượng Đen, không cho bay lên trung lộ.', 5: 'Nước Mã này ép Tượng Đen về góc biên, sau đó dùng Chốt bắt — thành Mã Chốt đấu song Sĩ, chắc thắng.', 13: 'Bắt chết Tượng Đen — Đỏ thắng.' },
      kq: 'thang', p: 'do',
    },
    '6 MA CHOT thang MA DON SI': {
      t: 'Mã Chốt Thắng Mã Đơn Sĩ — Một Chốt Đổi Được Bao Nhiêu?',
      s: 'Một Chốt thường đổi được hai Sĩ hoặc hai Tượng. Mã song Chốt hòa Mã Sĩ Tượng toàn — nhưng nếu đổi được nhiều hơn, còn Mã Chốt đấu Mã đơn Sĩ, là đủ thắng.',
      c: `<p>Tàn cuộc "binh lực trên hết" — vậy một Chốt đáng giá bao nhiêu? Thông thường khi đánh giá tàn cờ, coi <strong>một Chốt đổi được hai Tượng hoặc hai Sĩ</strong>; đổi nhiều hơn thì rất khó, thậm chí đổi một Sĩ một Tượng còn khó hơn đổi song Tượng hay song Sĩ.</p>
<p>Theo phép tính đó, Mã song Chốt đấu Mã Sĩ Tượng toàn là hòa, nên Mã Chốt đấu Mã song Sĩ hoặc Mã song Tượng cũng không thắng. Nhưng nếu song Chốt phát huy thần dũng, đổi được nhiều hơn, còn Mã Chốt đấu <strong>Mã đơn Sĩ</strong> thì đủ thắng: Đen muốn giữ Sĩ lẻ loi là cực kỳ khó.</p>
<p>Nắm phép so sánh giá trị này thì học một hiểu nhiều: Mã Chốt đấu Pháo đơn Sĩ, Mã Chốt đấu Pháo đơn Tượng đều tất thắng. Ngoại lệ duy nhất: Mã Chốt đấu Mã đơn Tượng (bài sau).</p>`,
      k: { 8: 'Nếu Mã Đen vào giữa, Chốt tiến chiếu; Tướng ở trung lộ, Mã lui là bị sát cục, Tướng bình thì mất Mã.', 12: 'Nếu Mã lui về, Mã Đỏ lùi bắt chết Mã — Đỏ thắng.', 13: 'Ăn được Sĩ — thắng cuộc đã định.' },
      v: { 0: { 2: 'Chốt tiến chiếu — Tướng ở trung lộ…', 4: '…Mã lui là bị sát cục.' }, 1: { 1: 'Nếu Tướng bình…', 2: '…Mã lùi bắt Mã, Đen mất Mã.' }, 2: { 1: 'Nếu Mã lui về…', 2: '…Mã Đỏ lùi bắt chết Mã.' } },
      kq: 'thang', p: 'do',
    },
    '7 MA CHOT le hoa MA DON TUONG': {
      t: 'Mã Chốt Hòa Mã Đơn Tượng — Ngoại Lệ',
      s: 'Đơn Mã khó thắng đơn Tượng, nên chỉ cần Đen có cơ hội dùng Mã đổi Chốt là hòa. Vì sao Mã Chốt đấu Pháo đơn Tượng lại thắng?',
      c: `<p>Thực chiến thế này không dễ thủ, nhưng theo lý Đỏ không đủ thắng: <strong>đơn Mã khó thắng đơn Tượng</strong>, nên chỉ cần Đen có cơ hội dùng Mã đổi Chốt là hòa. Bên thủ còn một quân mạnh thì có thể đổi Chốt, độ khó thắng tăng lên.</p>
<p>Vậy vì sao Mã Chốt đấu Pháo đơn Tượng lại tất thắng? Vì Pháo đổi Chốt tuy có thể hòa, nhưng Pháo muốn đổi Chốt lại rất khó — nhất là khi không còn Sĩ làm ngòi.</p>`,
      kq: 'hoa',
    },
    '8 TUYEN CUOC PHAO CHOT DON KHUYET SI kheo thang PHAO SONG SI': {
      t: 'Ván Chọn: Pháo Chốt Đơn Khuyết Sĩ Khéo Thắng Pháo Song Sĩ',
      s: 'Theo lý Pháo Chốt đấu Pháo song Sĩ là hòa, nhưng thủ rất khó. Ván thực chiến: Đỏ chống Sĩ thành "lồng" chật hẹp và bị khốn chết. Nhánh phụ chỉ cách thủ đúng.',
      c: `<p>Pháo song Chốt đấu Pháo Sĩ Tượng toàn là hòa; một Chốt đã đổi hai Tượng nên về lý Pháo Chốt đấu Pháo song Sĩ cũng hòa. Nhưng thực chiến thủ đúng tuyệt đối không dễ: Tướng Đen khống chế đường sườn, Pháo Đỏ tạm bị kìm (nhấc lên là bị Pháo bình đánh chết), Tướng Đỏ ở lộ 6 khó chịu mà vào giữa lại càng khó chịu vì Pháo Chốt Đen đều ở trung lộ.</p>
<h2>Đỏ sai ở đâu?</h2>
<p>Trong ván thực chiến, Đỏ chống Sĩ lên tạo thành một "lồng" trông an toàn nhưng cực kỳ chật hẹp. Đen ung dung vận Sĩ, chiếu Tướng rồi chống Sĩ — nước tuyệt diệu: Đỏ không còn nước đi, hai Sĩ bị kìm, Tướng không vào được, Pháo không động được — bị khốn chết, mất Sĩ và thua.</p>
<p>Đường đúng: khi Chốt Đen ở trung lộ, Đỏ <strong>không được chống Sĩ mà phải hạ Sĩ xuống</strong> để mở rộng không gian (nhánh phụ). Các nhánh cho thấy:</p>
<ul>
<li>Pháo đứng hàng dưới ngăn được nước Đen bỏ Sĩ chiếu Tướng; Đen muốn tránh thì phải đưa Tướng xuống, Đỏ được thêm nước đi.</li>
<li>Khi Chốt Đen tiến xuống, Đỏ phải chống <strong>Sĩ giác</strong> lên — Sĩ giác có tác dụng vô song: kéo dài hơi thở cho Tướng, mà thắng thua thường chỉ cách nhau một hơi thở.</li>
<li>Đổi Pháo xong còn đơn Chốt đấu song Sĩ — hòa theo lý, nhưng ứng phó sai vẫn thua.</li>
</ul>`,
      k: { 1: 'Trước hết xem diễn biến thực chiến.', 3: 'Chống Sĩ lên tạo thành "lồng" — trông an toàn nhưng cực kỳ chật hẹp. Từ đây Đỏ chỉ còn chịu trận.', 12: 'Chiếu Tướng rồi chống Sĩ — nước tuyệt diệu! Đỏ hết nước: hai Sĩ bị kìm, Tướng không vào được, Pháo không động được — bị khốn chết, mất Sĩ, Đen thắng.' },
      v: { 0: { 1: 'Đúng ra phải hạ Sĩ xuống để mở rộng không gian — nhưng vẫn phải đối mặt thử thách lớn, sai một bước là vạn kiếp bất phục.', 2: 'Bình Pháo là cách thử trực tiếp. Nếu Đỏ cẩu thả chạy Pháo, Chốt bình, Tướng vào giữa, Chốt tiến — Đỏ bị khốn chết ngay.', 4: 'Đổi Pháo, còn đơn Chốt đấu song Sĩ: hòa theo lý nhưng ứng phó sai vẫn thua.', 8: 'Nếu không bỏ Sĩ mà lùi Tướng, Chốt bình rồi tiến — Đen thắng.', 11: 'Thành tàn cơ bản đơn Chốt đấu đơn Sĩ — hòa.' }, 1: { 1: 'Đen không vội: chờ một nước, xem Đỏ ứng phó.', 3: 'Bình Pháo — không được sai. Nếu tiến Pháo, Đen bình Pháo, Chốt bình, Đỏ bị khốn chết.', 4: 'Ở đây phải lên Tướng, nếu không sẽ bị khốn chết.', 6: 'Pháo đứng đây ngăn hiệu quả nước Đen bỏ Sĩ chiếu Tướng — cách thủ của cao thủ.', 11: 'Đen vẫn muốn bình Chốt hạn chế Đỏ; Đỏ phải lui Sĩ kìm Chốt mới giữ hòa.', 14: 'Chốt Đen tiến xuống, Đỏ phải chống Sĩ giác lên — kéo dài hơi thở cho Tướng.', 18: 'Đỏ không có vấn đề gì.' } },
    },
    '9 VD (HINH 25)': {
      t: 'Ví Dụ: Sĩ Giác Và Pháo Trung Lộ — Thế Thủ An Toàn',
      s: 'Cách thủ nhẹ nhàng của Pháo song Sĩ: chống Sĩ giác, đặt Pháo ở trung lộ — rất khó bị khốn chết.',
      c: `<p>Một cách thủ nhẹ nhàng hơn: Đỏ chống Sĩ giác, Pháo ở trung lộ — thế thủ có cảm giác an toàn rất cao, về cơ bản không có vấn đề.</p>
<p>Tóm lại cả bài: <strong>một Chốt xấp xỉ hai Tượng hoặc hai Sĩ</strong>. Công thức này giúp học một hiểu ba, nắm được nhiều quy luật tàn thực dụng. Nhưng tàn cuộc không chỉ có binh lực: vị trí và biến hóa tinh tế ảnh hưởng rất lớn tới kết quả.</p>`,
      k: { 1: 'Thế thủ này có cảm giác an toàn rất cao.', 3: 'Phòng thủ như vậy về cơ bản không có vấn đề.' },
      kq: 'hoa',
    },
    '10 TRONG DIEM BAI HOC': {
      t: 'Trọng Điểm Bài 4: Sĩ Giác Và Pháo Trung Lộ',
      s: 'Hai điều cần nhớ khi thủ tàn Sĩ: chống Sĩ giác để kéo dài hơi thở cho Tướng; đặt Pháo ở trung lộ để hạn chế Tướng đối phương kìm chế.',
      c: `<ol>
<li><strong>Chống Sĩ giác lên</strong>: kéo dài "tuổi thọ" của Tướng, không dễ bị khốn chết.</li>
<li><strong>Pháo đặt ở trung lộ</strong>: cực kỳ linh hoạt, chủ yếu để hạn chế tác dụng kìm chế của Tướng đối phương.</li>
</ol>`,
    },
    '11 BAI TAP NHO': {
      t: 'Bài Tập Nhỏ: Vương Lâm Na — Lữ Khâm, Vì Sao Không Thủ Được?',
      s: 'Đỏ chống Sĩ giác, đặt Pháo trung lộ thì không bị chết ngạt — vậy ván thực chiến của nữ đại sư có phải cẩu thả? Xem cả ván để thấy đối thủ không cho cơ hội đứng vào vị trí thủ.',
      c: `<p>Bài giảng nói bên thủ chỉ cần chống Sĩ giác, đặt Pháo trung lộ là không bị chết ngạt. Vậy trong ván Pháo Chốt đơn khuyết Sĩ khéo thắng Pháo song Sĩ, có phải bên thua đã chủ quan?</p>
<p>Thực ra không: chính công phu tàn cuộc quá cao của đối thủ đã không cho bên thủ có thời cơ đứng vào vị trí phòng thủ chuẩn. Đây là toàn bộ ván đấu (giải vô địch đồng đội toàn quốc 2006) — hãy theo dõi xem bên thủ có lúc nào đứng được vào thế thủ đã học không.</p>`,
    },
  },
};
