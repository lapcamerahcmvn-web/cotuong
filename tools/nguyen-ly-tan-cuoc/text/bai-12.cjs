// Bài 12 — Bảng xếp hạng phối hợp quân lực mạnh nhất. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Bảng Xếp Hạng Phối Hợp Quân Lực Mạnh Nhất',
  y: 'Pháo Mã là tổ hợp mạnh nhất; song Pháo và song Mã mỗi bên một vẻ, kém Pháo Mã khoảng một Sĩ hoặc một Tượng.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Pháo Mã, Song Mã Hay Song Pháo?',
      s: 'Ở trung cuộc Xe Pháo Mã là tổ hợp mạnh nhất; ở tàn cuộc Pháo Mã cũng tốt nhất. Nhưng tốt hơn bao nhiêu? Và song Pháo với song Mã, cái nào mạnh hơn?',
      c: `<p>Đã bàn "binh lực trên hết" và nguyên tắc chiếm vị — vị trí quân, đặc biệt là vị trí Mã, rất quan trọng: Mã đứng xấu không chỉ không phát huy được sức mà còn dễ bị tấn công, thành gánh nặng. Bài này bàn tới <strong>binh chủng</strong>, tập trung vào cờ Pháo Mã, xét ba tổ hợp: <strong>Mã Pháo, song Mã, song Pháo</strong>.</p>
<p>Xe Pháo Mã là tổ hợp mạnh nhất ở trung cuộc; tương tự, phối hợp Pháo Mã ở tàn cuộc chắc chắn tốt nhất. Song Mã và song Pháo thì "mỗi bên một vẻ". Nhưng kết luận như vậy chưa đủ sâu. Hai câu hỏi cần làm rõ:</p>
<ol>
<li><strong>Tốt hơn bao nhiêu — có đo được không?</strong> Rất ít người nghiên cứu, nhưng cực kỳ quan trọng khi đổi quân: biết chuyển tàn thành Pháo Mã là tốt, nhưng nếu cho bạn thêm một Chốt, bạn có chịu đổi thành song Mã không?</li>
<li><strong>Song Mã và song Pháo, điểm mạnh điểm yếu ra sao?</strong> Cục diện nào song Pháo tốt hơn, cục diện nào song Mã tốt hơn?</li>
</ol>
<p>Hướng đánh tốt tàn cuộc là tinh tế đến cực độ — thảo luận tàn cuộc cũng phải truy tới cùng.</p>`,
    },
    '3 MA PHAO le hoa PHAO SI TUONG TOAN': {
      t: 'Mã Pháo Hòa Pháo Sĩ Tượng Toàn',
      s: 'Thế kinh điển của tàn thực dụng: Sĩ Tượng chỉnh tề, Pháo giữ đường sườn, cản Mã ngọa tào — điểm trọng yếu phòng thủ được công nhận, hòa.',
      c: `<p>Mã Pháo đấu đơn Pháo Sĩ Tượng toàn là hòa — trường hợp kinh điển của tàn thực dụng. Đen đã đứng vào <strong>điểm trọng yếu phòng thủ được công nhận</strong>: Sĩ Tượng chỉnh tề, Pháo giữ đường sườn, cản Mã ngọa tào.</p>
<p>Dĩ nhiên trong thi đấu bên thủ vẫn có lúc sơ hở, nhưng thế này đã đứng vào vị trí thủ tốt nhất.</p>`,
      k: { 6: 'Thế này được công nhận là hòa; Đen đã đứng vào vị trí thủ tốt nhất.' },
      kq: 'hoa',
    },
    '3 MA PHAO le thang PHAO SI TUONG TOAN': {
      t: 'Mã Pháo Sĩ Tượng Toàn Thắng Mã Sĩ Tượng Toàn',
      s: 'Chỉ đổi Pháo thủ thành Mã thủ, kết quả hoàn toàn khác: thế thắng được công nhận. Mã ngọa tào cộng Pháo đánh sườn, phá được một Sĩ hoặc Tượng là ăn sạch.',
      c: `<p>Mã Pháo Sĩ Tượng toàn đấu Mã Sĩ Tượng toàn — chỉ đổi Pháo của bên thủ thành Mã — kết quả hoàn toàn khác: <strong>thế thắng được công nhận chính thức</strong>. Biến hóa nhiều nên nhiều người biết thắng được mà thực chiến vẫn không tìm ra hướng; cần công lực tàn cuộc khá cao.</p>
<p>Hướng chung: <strong>Mã ngọa tào cộng Pháo đánh sườn</strong>, mục đích là nhân cơ hội ăn Sĩ Tượng — loại tàn này gần như không thể chiếu bí trực tiếp, nhưng phá được một Sĩ hoặc một Tượng là có cơ hội ăn sạch.</p>
<p>Ở đây quân Đen không dám động: Đỏ lúc nào cũng có nước chống Sĩ chiếu, nên Mã Đen phải giữ Sĩ, Sĩ cũng không đi được — chỉ còn song Tượng. Đỏ dùng nước chờ ép Đen hạ Tượng: song Tượng mất liên kết — làm đứt liên kết song Tượng là thường thức tấn công ở tàn cuộc, sau đó Đỏ ăn được một Tượng và thắng chắc.</p>`,
      k: { 1: 'Quân Đen không dám động: Đỏ lúc nào cũng có nước chống Sĩ chiếu, nên Mã Đen phải giữ Sĩ, Sĩ cũng không đi được — chỉ còn song Tượng.', 3: 'Lui Mã chiếu Tướng — rất lợi hại! Nếu chống Sĩ ngay, Đen chống Sĩ đáp lại, Đỏ chưa có thủ đoạn gì.', 5: 'Giờ mới chống Sĩ: chỉ đổi thứ tự mà đã khác cấu trúc. Tướng Đen ở bên trong, nếu Đen chống Sĩ thì Mã chiếu rút — thấy rõ vai trò Tướng Đỏ ở trung lộ.', 7: 'Đỏ dùng nước chờ ép Đen hạ Tượng mới có nước chiếu này; quan trọng hơn: song Tượng mất liên kết — thường thức tấn công ở tàn cuộc.', 8: 'Mã Đen lui về chỗ rất xấu; Đỏ phải thừa thắng truy kích, nếu không Đen nối lại Tượng thì đường thắng gian nan.', 11: 'Ăn được một Tượng — thắng chắc. Năng lực tấn công của Pháo Mã vô cùng linh hoạt.' },
      v: { 0: { 1: 'Nếu chống Sĩ ngay…', 2: '…Đen chống Sĩ đáp lại — Đỏ chưa có thủ đoạn.' }, 1: { 1: 'Nếu Đen chống Sĩ…', 2: '…Mã chiếu rút.' } },
      kq: 'thang', p: 'do',
    },
    '4 SONG PHAO (SONG MA) kho thang MA SI TUONG TOAN': {
      t: 'Song Pháo (Song Mã) Khó Thắng Mã Sĩ Tượng Toàn',
      s: 'Song Pháo hay song Mã đều không thắng được Mã Sĩ Tượng toàn — kỳ thủ chuyên nghiệp đi tới thế này thường không đánh tiếp. Pháo Mã ưu thế hơn hẳn.',
      c: `<p>Song Pháo (bàn cờ bên trên) và song Mã (bài tiếp theo) đều <strong>không thắng được Mã Sĩ Tượng toàn</strong>, và gần như không có cơ hội nào — ở giải chuyên nghiệp, đi ra thế này người ta thường không đánh tiếp, vì khả năng bên thủ sơ hở quá nhỏ. Từ đó thấy rõ: Mã Pháo ưu thế hơn song Mã và song Pháo.</p>`,
      kq: 'hoa',
    },
    '5 HINH MINH HOA HINH 74': {
      t: 'Song Mã Khó Thắng Mã Sĩ Tượng Toàn',
      s: 'Hình minh họa: song Mã đấu Mã Sĩ Tượng toàn cũng là hòa.',
      c: `<p>Hình minh họa cho trường hợp song Mã: song Mã đấu Mã Sĩ Tượng toàn cũng không thắng được — chỉ cần bên thủ giữ Sĩ Tượng chỉnh tề.</p>`,
      kq: 'hoa',
    },
    '6 SONG MA kho thang DON MA KHUYET SI': {
      t: 'Song Mã Khó Thắng Đơn Mã Khuyết Sĩ',
      s: 'Đen thiếu một Sĩ mà song Mã vẫn khó thắng — nghĩa là khác biệt binh chủng giữa song Mã và Pháo Mã ít nhất là một Sĩ.',
      c: `<p>Thử định lượng: Đen khuyết một Sĩ. Nếu Đỏ vẫn không thắng được, nghĩa là <strong>khác biệt binh chủng giữa song Mã và Pháo Mã ít nhất là một Sĩ</strong>. Vậy song Mã có thắng được không? Phán đoán chủ lưu hiện nay: song Mã khó thắng.</p>`,
      kq: 'hoa',
    },
    '7 DON MA kho thang PHAO SONG TUONG': {
      t: 'Song Mã Khó Thắng Pháo Song Tượng',
      s: 'Song Mã đấu Pháo song Tượng về lý là hòa — Pháo thủ ở tuyến hoành 2, giống điểm trọng yếu của thế Mã Pháo hòa Pháo Sĩ Tượng toàn.',
      c: `<p>Song Mã đấu Pháo song Tượng về lý cũng không thắng được — sức chiến đấu của song Mã kém Pháo Mã khá xa: Mã Pháo tuy không thắng Pháo Sĩ Tượng toàn, nhưng bên thủ thiếu một Sĩ hoặc một Tượng là tuyệt đối không thoát.</p>
<p>Đáng chú ý: Pháo Đen ở đây thủ giống hệt thế Mã Pháo hòa Pháo Sĩ Tượng toàn — quanh quẩn ở tuyến hoành 2. Điểm trọng yếu để thủ hòa ở rất nhiều tình huống là giống nhau.</p>
<p>Lưu ý: thế này chỉ nói về Pháo song Tượng (được công nhận là hòa). Còn song Mã đấu <strong>Mã song Tượng</strong> là tàn rất khó, đến nay chưa có định luận; quan điểm chủ lưu cho rằng song Mã thắng được với tỷ lệ khá lớn.</p>`,
      kq: 'hoa',
    },
    '8 SONG PHAO STT thang MA SONG TUONG': {
      t: 'Song Pháo Sĩ Tượng Toàn Thắng Mã Song Tượng',
      s: 'Song Pháo tất thắng Mã song Tượng: tránh đổi quân, dùng chiếu gọi sát và thiểm kích để đuổi Mã khỏi trung tâm rồi ăn một Tượng.',
      c: `<p>Song Mã thắng Mã song Tượng tỷ lệ lớn nhưng rất khó; còn <strong>song Pháo thì tất thắng</strong>. Mấu chốt: tránh đổi quân và tìm cách ăn một Tượng. Lý do chính là Mã không đủ linh hoạt, trước sức tấn công của song Pháo rất khó bảo toàn.</p>
<p>Song Pháo cực kỳ linh hoạt: lúc nào cũng có thể chiếu gọi sát, thiểm kích… khiến Mã Đen không biết đi đâu; Mã bị ép rời trung tâm, song Pháo thiểm kích ăn được một Tượng. Song Pháo thắng Mã song Tượng dễ hơn song Mã nhiều.</p>
<p>Đáng tiếc: song Pháo Sĩ Tượng toàn đấu <strong>Pháo</strong> song Tượng thì không thắng được (bài tiếp).</p>`,
      k: { 1: 'Ý đồ: sau khi Pháo bình chiếu Tướng, dùng Pháo bên trái đánh Tượng.', 8: 'Nếu Mã tiến 4, Pháo bình chiếu, Tướng vào giữa, Pháo tiến ăn Tượng — thắng.', 17: 'Song Pháo rất linh hoạt: chiếu gọi sát, thiểm kích khiến Mã Đen không biết đi đâu, bị ép rời trung tâm — song Pháo ăn được một Tượng.' },
      v: { 0: { 1: 'Nếu Mã tiến 4…', 4: '…Pháo tiến ăn Tượng — Đỏ thắng.' } },
      kq: 'thang', p: 'do',
    },
    '9 SONG PHAO STT kho thang PHAO SONG TUONG': {
      t: 'Song Pháo Sĩ Tượng Toàn Khó Thắng Pháo Song Tượng',
      s: 'Pháo linh hoạt hơn Mã nhiều: dùng sách lược đổi Pháo ở trung lộ, các cơ hội thiểm kích, gọi sát của Đỏ mất hiệu quả — bên thủ giữ được hòa.',
      c: `<p>Pháo linh hoạt hơn Mã rất nhiều. Đỏ có nhiều cơ hội thiểm kích, nhưng Đen cũng có cách thủ đơn giản: <strong>đổi Pháo ở trung lộ</strong> — khiến các nước thiểm kích, gọi sát mất hiệu quả. Bên thủ giữ được hòa (dù thực chiến rất dễ sai, không thể sơ ý).</p>
<p>Nhìn lại: khác biệt nhỏ giữa song Pháo và song Mã nằm ở đâu? Xem hai bài tiếp theo.</p>`,
      k: { 2: 'Đổi Pháo ở trung lộ khiến các cơ hội thiểm kích, gọi sát mất hiệu quả — bên thủ giữ được hòa.' },
      kq: 'hoa',
    },
    '10 SONG PHAO STT thang MA DON KHUYET SI': {
      t: 'Song Pháo Sĩ Tượng Toàn Thắng Mã Đơn Khuyết Sĩ',
      s: 'So với song Mã, song Pháo đấu Mã đơn khuyết Sĩ có tỷ lệ thắng khá lớn: Sĩ lẻ dễ bị song Pháo ăn, Mã Đen bị xua vào chỗ xấu, tạo cơ hội thiểm kích.',
      c: `<p>So với song Mã, song Pháo đấu Mã đơn khuyết Sĩ có tỷ lệ thắng khá lớn: Sĩ Đen rất dễ bị song Pháo ăn mất. Song Mã rất khó ăn một Sĩ lẻ loi, còn song Pháo có thể xua đuổi khiến Mã Đen rơi vào vị trí xấu, tạo cơ hội thiểm kích.</p>
<p>Qua mấy ví dụ, sức công kích của song Pháo dường như mạnh hơn song Mã một chút. Vậy "mỗi bên một vẻ" thể hiện ở đâu? <strong>Song Pháo phải dựa vào Sĩ Tượng nhà</strong> — không còn Sĩ Tượng thì song Pháo không phát huy được uy lực (bài tiếp).</p>`,
      kq: 'thang',
    },
    '11 SONG PHAO kho thang SONG TUONG': {
      t: 'Song Pháo Không Sĩ Khó Thắng Song Tượng',
      s: 'Không có Sĩ, song Pháo như không có ngòi — không thắng nổi song Tượng. Song Pháo và song Mã vì vậy "kẻ tám lạng, người nửa cân".',
      c: `<p>Không có Sĩ, song Pháo coi như không có ngòi — <strong>không thắng nổi song Tượng</strong>.</p>
<p>Đánh giá tổng hợp: song Mã và song Pháo mỗi bên có điểm mạnh, điểm yếu riêng. Song Pháo có Sĩ Tượng thì sức công kích mạnh hơn Mã; không có Sĩ Tượng thì uy lực giảm đáng kể. Thực chiến không ai đảm bảo giữ nguyên Sĩ Tượng tới tàn cuộc, nên song Pháo và song Mã coi như <strong>kẻ tám lạng, người nửa cân</strong>.</p>`,
      kq: 'hoa',
    },
    '12 TRONG DIEM BAI HOC': {
      t: 'Trọng Điểm Bài 12: Pháo Mã Mạnh Nhất, Pháo Thủ Tốt Hơn Mã, Song Tượng Linh Hoạt',
      s: 'Pháo Mã luôn là tổ hợp mạnh nhất (hơn song Pháo, song Mã khoảng một Sĩ hoặc Tượng); Pháo phòng thủ tốt hơn Mã; song Tượng linh hoạt nên thủ tốt hơn song Sĩ.',
      c: `<ol>
<li><strong>Pháo Mã luôn là tổ hợp mạnh nhất</strong>; song Pháo, song Mã mỗi bên một vẻ. So với Pháo Mã, uy lực của chúng đại thể kém khoảng một Sĩ hoặc một Tượng, ít trường hợp kém hai Sĩ. Đây là cố gắng định lượng để có khái niệm — chênh lệch thực tế biến đổi rất nhiều.</li>
<li><strong>Năng lực phòng thủ của Pháo luôn cao hơn Mã.</strong> Mã hành động chậm, dễ bị khống chế; Pháo linh hoạt, ở thời khắc then chốt không dễ bị khốn đến mức hết nước đi.</li>
<li><strong>Năng lực phòng thủ của Sĩ Tượng</strong>: ở loại cục diện này, Tượng thủ tốt hơn một chút vì song Tượng linh hoạt hơn. Như thế song Pháo khó thắng song Tượng: nếu là song Sĩ thì chắc chắn thua (Pháo còn lại dùng Sĩ làm ngòi là đủ thắng), còn song Tượng linh hoạt, không dễ bị khốn chết.</li>
</ol>`,
    },
  },
};
