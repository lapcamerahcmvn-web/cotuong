// tools/trung-cuoc-so-do-tu-duy/theory.cjs — Lý thuyết + ví dụ của chuyên đề "Trung Cuộc Sơ Đồ Tư Duy".
// Nguồn: tài liệu nội bộ (ổ E:, có bản quyền) — phần lý thuyết là ảnh sơ đồ tư duy, đã đọc để nắm ý rồi VIẾT LẠI bằng lời
// riêng; không chép nguyên văn, không nêu tên sách/tác giả. FEN ví dụ chép từ ảnh, nước đi kiểm bằng máy (gen.mjs bỏ bài lỗi).
//
// CH[]: chương = { key, sec (mã phần bài tập trong probs.json, null nếu không có), ten, theory: [bài lý thuyết] }
//   bài lý thuyết = { key, title, summary, board?: mã ví dụ làm bàn minh họa, body: HTML, cong?: [...], thu?: [...] }
// EX{}: ví dụ = { title, fen, first, main?: [ký hiệu sách hoặc ICCS], captions?: {ply: '...'}, vars?, text: HTML, src? }
//   main rỗng → bài chỉ có sơ đồ (đọc thế cờ). `src: 'engine'` → phần sau của mạch do máy đi tiếp (ghi rõ trong bài).

const CH = [
  {
    key: 'tong-quan', sec: null, ten: 'Mở Đầu',
    theory: [
      {
        key: 'trung-cuoc-la-gi', title: 'Trung Cuộc Là Gì? Định Nghĩa, Trận Pháp Và 6 Mảng Kiến Thức',
        summary: 'Trung cuộc bắt đầu khi hai bên bày trận xong và bước vào giao tranh — giai đoạn dài nhất, biến hóa nhất và quyết định gần một nửa kết quả ván cờ.',
        cong: ['Bắt đầu khi hai bên dàn trận xong và giao chiến — thường sau 11–15 nước', 'Giai đoạn dài nhất, ảnh hưởng 40–50% kết quả, không ván nào giống ván nào', 'Mỗi khai cuộc là một trận pháp: Pháo đầu, Bình phong Mã, Phi Tượng, Tiên nhân chỉ lộ, Phản cung Mã…', 'Sáu mảng: định nghĩa, sát pháp, các bước tư duy, nhìn nhận đánh giá (điểm yếu, cánh yếu, hình trận, điều quân), chiến thuật cơ bản, chuyển tàn (thủ hòa, thủ thắng)'],
        body: `<h2>Trung cuộc bắt đầu từ đâu?</h2>
<p>Khai cuộc là lúc hai bên đưa quân ra, dựng thế trận. Khi đội hình đã thành hình và quân hai bên bắt đầu chạm nhau, ván cờ bước sang <strong>trung cuộc</strong>. Trong thực tế, khai cuộc thường kết thúc sau khoảng 11–15 nước đầu.</p>
<p>Đây là giai đoạn chiếm phần lớn thời gian của ván cờ và ảnh hưởng tới khoảng 40–50% kết quả. Khác với khai cuộc (có bài bản để học thuộc) và tàn cuộc (có khẩu quyết thắng – hòa), trung cuộc gần như không ván nào giống ván nào. Người chơi phải dựa vào kỹ năng tính toán, cách tư duy và một kho chiến thuật đủ rộng.</p>
<h2>Trận pháp — vì sao gọi là "bày trận"?</h2>
<p>Hãy hình dung hai đạo quân: cả hai cùng điều binh ra tiền tuyến rồi dàn thành thế trận — trận hình mũi tên, hình dùi, hình cánh nhạn, lưỡng nghi, tứ phương, bát quái… Cờ tướng cũng vậy, mỗi khai cuộc là một kiểu trận pháp: Pháo đầu, Bình phong Mã, Phi Tượng, Tiên nhân chỉ lộ, Phản cung Mã… Có cả những trận pháp ít người dùng, như Điệp pháo (hai Pháo chồng một lộ). Bước vào trung cuộc là lúc các trận pháp ấy va chạm.</p>
<h2>Sáu mảng kiến thức của chuyên đề</h2>
<ol>
<li><strong>Định nghĩa trung cuộc</strong> — bài này.</li>
<li><strong>Trung cuộc sát pháp</strong> — trung cuộc vẫn có đòn kết liễu; cách tính sát khi bàn cờ còn nhiều quân.</li>
<li><strong>Các bước tư duy cơ bản</strong> — 5 hướng khi bị đuổi bắt quân, 5 hướng tư duy trung cuộc, các câu hỏi tự đặt trước mỗi nước.</li>
<li><strong>Cách nhìn nhận, đánh giá</strong> — điểm yếu, cánh yếu, hình trận chưa hoàn chỉnh, điều quân.</li>
<li><strong>Các chiến thuật cơ bản</strong> — khống chế, ngăn cản, phế quân, phối hợp binh chủng, liên hệ hữu cơ giữa các quân.</li>
<li><strong>Chuyển tàn</strong> — biết lúc nào đổi quân về tàn cờ để thủ hòa hoặc thủ thắng (dùng kiến thức tàn cuộc có khẩu quyết).</li>
</ol>`,
      },
    ],
  },
  {
    key: 'tinh-sat', sec: 'sat', ten: 'Tư Duy Tính Sát Trung Cuộc',
    theory: [
      {
        key: 'phuong-phap-tinh-sat', title: 'Phương Pháp Tư Duy Tính Sát Trung Cuộc — 8 Bước Trước Một Thế Có Đòn',
        summary: 'Thế trung cuộc nhiều quân vẫn ẩn đòn sát. Tám bước tự hỏi giúp tìm ra đòn: hình quen, sát liên hoàn hay có nước nghỉ, quân tham gia, đội hình, vị trí Tướng, nước dọa của địch, tính chuỗi và kiểm chứng.',
        board: 'E1',
        cong: ['Hình này đã gặp chưa, đưa được về hình đã học không?', 'Sát liên hoàn hay có nước nghỉ — có nước nghỉ thì đối phương được thêm một nhịp đỡ sát', 'Điểm danh mọi quân có thể tham gia tấn công', 'Quy về đội hình, đòn sát chiêu đã học', 'Đọc vị trí quân ta để suy ra Tướng địch phải đứng đâu thì đòn mới thành', 'Đối phương đang dọa gì? Nước đỡ tốt nhất là nước vừa đỡ vừa phản đòn', 'Tính như sát liên hoàn: quân nào chiếu, thứ tự các bước', 'Tự tính xong mới kiểm chứng'],
        body: `<p>Bàn cờ bên trên là một thế trung cuộc điển hình: quân hai bên còn đông, Đỏ có cơ hội tấn công nhưng Đen cũng đang dọa. Thay vì đi thử, hãy đi qua tám bước dưới đây theo đúng thứ tự.</p>
<h2>8 bước tư duy</h2>
<ol>
<li><strong>Đã gặp hình này chưa?</strong> Có bài nào tương tự không, có thể đưa thế cờ về một hình đã học không? Nhận ra hình quen là rút ngắn được phần lớn việc tính.</li>
<li><strong>Sát liên hoàn hay có nước nghỉ?</strong> Nếu chiếu liên tục được thì đối phương không có thời gian. Nếu giữa chừng phải có nước nghỉ (nước không chiếu), đối phương được thêm một nhịp — họ có thể đỡ sát, hoặc diệt luôn quân sát của ta.</li>
<li><strong>Quân nào tham gia được?</strong> Điểm danh tất cả quân có thể góp sức. Ở bàn minh họa: hai Xe, hai Pháo, Mã và Tốt lộ 6 của Đỏ.</li>
<li><strong>Đội hình nào, đòn nào đã học?</strong> Quy về các đội hình sát chiêu quen thuộc (Xe Pháo Mã, Song Xe Pháo…). Ở thế này, đòn Muộn sát (mượn quân Đen làm ngòi) vừa là đường tấn công vừa là cách hóa giải sát thế của Đen.</li>
<li><strong>Tướng địch phải đứng đâu?</strong> Đọc vị trí từng quân ta để suy ra Tướng và các quân còn lại của đối phương sẽ phải ở đâu thì đòn mới thành. Ví dụ: Mã chỉ đánh được nếu Tướng Đen bị dồn tới một ô cụ thể.</li>
<li><strong>Đối phương đang dọa gì?</strong> Ở bàn minh họa, Đen dọa Xe ăn Tượng chiếu. Đỏ cần một quân lui về sát Tướng để đỡ, và nước đỡ ấy đồng thời phải mở ra đòn phản chiếu — quân làm được cả hai việc là Pháo.</li>
<li><strong>Tính như bài sát liên hoàn.</strong> Liệt kê các nước chiếu, thứ tự các bước, mỗi cách đỡ của đối phương.</li>
<li><strong>Kiểm chứng.</strong> Tự tính xong mới đối chiếu lời giải hoặc dùng chế độ tự đánh với máy để thử.</li>
</ol>
<h2>Vì sao phải theo thứ tự?</h2>
<p>Bước 1–2 cho biết có nên tìm đòn sát hay không; bước 3–5 thu hẹp phương án; bước 6 tránh lỗi phổ biến nhất của người tấn công — mải tính đòn mà quên đối phương sắp chiếu hết mình trước. Phần bài tập của chương này là các thế trung cuộc có đòn sát: Đỏ đi trước và chiếu hết.</p>`,
      },
    ],
  },
  {
    key: 'bat-quan', sec: 'bat', ten: 'Bị Đuổi Bắt Quân — Bắt Quân Và Tranh Tiên',
    theory: [
      {
        key: '5-huong-khi-bi-bat', title: '5 Hướng Tư Duy Khi Bị Đuổi Bắt Quân: Chạy, Giữ, Bắt Lại, Cản, Phế',
        summary: 'Khi một quân bị đuổi bắt luôn có năm lối thoát: chạy, giữ, bắt lại, cản, phế. Khi mình là bên đi bắt, năm hướng ấy cho biết lúc nào không nên bắt.',
        board: 'E2',
        cong: ['Chạy: chạy kèm theo nước gây khó cho đối phương — chạy tới chỗ mạnh, chạy mà tranh được tiên', 'Giữ: vị trí đang đẹp thì điều quân tới giữ — nhưng tính trước xem họ vẫn ăn thì ta được hay mất', 'Bắt lại: bắt lại quân có giá trị ngang hoặc hơn; quan trọng nhất là đổi được quân đang đứng ở vị trí mạnh của họ', 'Cản: chèn ngang chặn đường bắt — giữ được thế và cắt luôn đường lao lên của đối phương', 'Phế: có đường đánh hiệu quả thì mạnh dạn bỏ quân lấy thế; "tiên thí hậu đoạt" (thí trước, đoạt lại sau) là thủ pháp rất hay dùng'],
        thu: ['Đừng bắt quân địch đang đứng chỗ xấu — bắt chỉ giúp nó chạy tới chỗ đẹp', 'Quân địch được giữ chắc thì đừng cố lao vào bắt — tốn nước, còn giúp quân địch liên kết thêm', 'Nếu bị bắt lại bằng quân yếu thì cứ đổi; quân ta ở vị trí mạnh thì giữ lại, đừng đổi', 'Bị cản thì coi chừng tắc cờ, quân bị ghim — giải phóng quân càng sớm càng tốt', 'Giữ nhà cửa: nếu ta có điểm yếu, tính trước khả năng đối phương phế quân phát động tấn công; có lúc tương kế tựu kế cứ ăn để họ mất quân vô ích'],
        body: `<p>Trung cuộc là lúc quân hai bên chạm nhau, nên tình huống "quân mình bị đuổi" lặp lại liên tục. Người mới thường chỉ nghĩ tới một phản xạ: chạy. Thực ra luôn có <strong>năm hướng</strong> để cân nhắc, và hướng tốt nhất thường không phải là chạy.</p>
<h2>Khi quân mình bị đuổi bắt</h2>
@CONG
<h2>Khi mình là bên đi bắt</h2>
<p>Năm hướng trên nhìn từ phía người đi bắt cho ta biết <em>khi nào không nên bắt</em>:</p>
@THU
<h2>Cách luyện</h2>
<p>Mỗi ví dụ sau minh họa một hướng. Trước khi đọc lời bình, tự hỏi: quân nào đang bị đe dọa, năm hướng ở đây là gì, hướng nào cho thêm thế? Phần bài tập "bắt quân và tranh tiên" của chương: Đỏ đi trước, tìm nước bắt quân hoặc tranh tiên tốt nhất.</p>`,
      },
    ],
    examples: ['E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8'],
  },
  {
    key: 'khong-che', sec: 'khong', ten: 'Chiến Thuật Khống Chế',
    theory: [
      {
        key: 'chien-thuat-khong-che', title: 'Chiến Thuật Khống Chế — Ghim Quân, Bắt Chết Và Cách Giải Thoát',
        summary: 'Khống chế là đặt quân vào vị trí trọng yếu khiến quân đối phương khó cử động: hễ đi là thiệt quân hoặc hở cung Tướng. Cách siết khống chế và cách tự cởi trói.',
        board: 'E9',
        cong: ['Phá căn của quân đang giữ, yểm trợ phía sau để ghim chặt, hoặc điều thêm quân để bắt hơn quân', 'Pháo đứng sau Xe yểm trợ để bắt chết quân bị ghim — cách cực kỳ hiệu quả, rất hay dùng', 'Không để đối phương thoát quân bằng nước bắt lại, dọa sát ngược hoặc rút chiếu', 'Cảnh giác nhất: đối phương cố tình thoát rồi phế luôn quân phía sau để mở đường tấn công mạnh — trông nhà trước'],
        thu: ['Tạo thêm căn cho quân phía sau để đổi quân và giải thoát', 'Dùng nước bắt lại, dọa sát, rút chiếu hoặc thí trước đoạt sau để thoát', 'Phế quân để đổi lấy thế công', 'Đừng tùy tiện chạy quân đang làm căn; chú ý bảo vệ quân đang làm căn'],
        body: `<p><strong>Khống chế</strong> là dùng một hoặc nhiều quân đứng ở vị trí trọng yếu để quân đối phương khó di chuyển. Nếu họ cứ đi, họ sẽ mất quân, hoặc cung Tướng gặp nguy, hoặc lộ ra một điểm yếu khác.</p>
<p>Ở bàn minh họa, Xe Đỏ cắm sâu trên lộ 2 ghim cả Pháo lẫn Xe Đen đứng sau trên cùng một đường dọc: Pháo Đen không dám rời đi vì Xe phía sau sẽ bị ăn. Đỏ chỉ cần đưa thêm quân (thường là Pháo yểm trợ phía sau Xe) là quân bị ghim khó thoát.</p>
<h2>Khi khống chế đối phương</h2>
@CONG
<h2>Khi bị khống chế — cách giải thoát</h2>
@THU
<p>Hai ví dụ sau cho thấy bên bị khống chế tự cởi trói: một lần bằng cách bỏ quân đổi lấy thế, một lần bằng nước dọa sát.</p>`,
      },
    ],
    examples: ['E10', 'E11'],
  },
  {
    key: 'ngan-can', sec: 'can', ten: 'Chiến Thuật Ngăn Cản',
    theory: [
      {
        key: 'chien-thuat-ngan-can', title: 'Chiến Thuật Ngăn Cản — Cắt Liên Kết, Chặn Ngòi, Khóa Sĩ',
        summary: 'Ngăn cản là dùng bất kỳ quân nào để cản trở quân đối phương: làm mất liên kết, gây áp lực, chặn quân chủ lực tấn công. Khi tấn công và khi phòng thủ.',
        board: 'E12',
        cong: ['Cắt đứt liên kết: cản mắt Tượng, cản chân Mã, chặn ngòi Pháo, chặn đường Xe hoặc khóa Sĩ', 'Xác định quân chủ lực của đối phương để truy đuổi và ngăn kế hoạch của họ', 'Cẩn thận khi đứng vào "chân giả" của đối phương — ô mà quân họ chỉ tạm thời không với tới'],
        thu: ['Đề phòng quân địch chen vào làm mất liên kết quân ta; chọn và chiếm trước các điểm mấu chốt để giữ liên kết', 'Truy đuổi quân cản để biến chân giả thành chân thật, nối lại liên kết chặt chẽ'],
        body: `<p><strong>Ngăn cản</strong> là chiến thuật có thể dùng bất kỳ quân nào: chỉ cần đứng đúng chỗ để cản quân đối phương — làm chúng mất liên kết, gây áp lực, hoặc chặn quân chủ lực của họ tấn công. Một Tốt rẻ tiền đứng chặn mắt Tượng có khi đáng giá hơn một Xe.</p>
<h2>Khi tấn công</h2>
@CONG
<h2>Khi phòng thủ</h2>
@THU
<p>Ví dụ đầu: Xe Đỏ chen vào cản mắt Tượng để Pháo tấn công, dẫn tới chiếu hết. Ví dụ sau: Xe chặn ngang thế sát của Đen rồi phản công trung lộ.</p>`,
      },
    ],
    examples: ['E13', 'E14'],
  },
  {
    key: 'phe-quan', sec: 'phe', ten: 'Chiến Thuật Phế Quân',
    theory: [
      {
        key: 'chien-thuat-phe-quan', title: 'Chiến Thuật Phế Quân — Thí Quân Lấy Thế, Hóa Giải, Chuyển Tàn',
        summary: 'Phế quân là bỏ một quân có giá trị để lấy thế công, hóa giải đòn, cầu hòa hoặc dẫn dụ. Bốn dạng phế quân và năm điều cần nhớ khi đối phương phế.',
        board: 'E15',
        cong: ['Phế quân tạo thế tấn công: dùng các đội hình và đòn sát đã học để công sát, thắng hoặc giành ưu thế lớn', 'Phế quân hóa giải đòn đánh, thế công của đối phương', 'Phế quân chuyển sang tàn cờ hòa: phải thuộc khẩu quyết các thế tàn để tính đúng quân nào cần phế', 'Thí trước đoạt sau: phế xong, sau một hay vài nước đoạt lại quân và thế'],
        thu: ['Không tham ăn quân khi đối phương đang có thế công mạnh, dù đó là quân lớn hay quân nhỏ', 'Quân chết chớ vội ăn — quân không chạy được thì ăn sau cũng được', 'Tính sẵn các thế tàn hòa hoặc thắng để biết giữ quân nào là mấu chốt', 'Tương kế tựu kế: để đối phương mất quân vô ích hoặc bỏ quân mà không đoạt lại được', 'Tính tốc độ tấn công: nếu ta nhanh hơn thì cứ ăn rồi đối công, đua tốc độ'],
        body: `<p><strong>Phế quân</strong> là bỏ đi một quân có giá trị để đạt mục đích khác: lấy thế công, hóa giải đòn của đối phương, cầu hòa, hoặc dẫn dụ. Quân bị phế có thể là Xe, Pháo, Mã, Tốt — thậm chí cả Sĩ Tượng. Điều kiện chung: đối phương phải thấy cái lợi trước mắt để ăn.</p>
<h2>Bốn dạng phế quân khi tấn công</h2>
@CONG
<h2>Khi đối phương phế quân</h2>
@THU
<p>Ba ví dụ tiếp theo: phế Mã mở đường vào trung lộ trống trải, phế Pháo theo lối thí trước đoạt sau, và một thế phải chọn giữa hai cách bỏ Xe — cách đúng chuyển về tàn hòa, cách sai thua tàn.</p>`,
      },
    ],
    examples: ['E16a', 'E16', 'E17'],
  },
  {
    key: 'nhuoc-diem', sec: 'nhuoc', ten: 'Phân Tích Nhược Điểm, Đánh Giá Cục Diện',
    theory: [
      {
        key: 'phan-tich-nhuoc-diem', title: 'Phân Tích Nhược Điểm — Điểm Yếu, Cánh Yếu Và Đội Hình',
        summary: 'Đánh giá cục diện là nhìn toàn bộ bàn cờ bằng một chuỗi tư duy liên kết để tìm ra điểm yếu, cánh yếu hay đội hình chưa hoàn chỉnh của mỗi bên.',
        board: 'E18',
        cong: ['Điểm yếu có thể nằm ở bất kỳ quân nào, từ Xe Pháo Mã tới Sĩ Tượng Tướng', 'Hay gặp nhất là điểm yếu ở quân Mã (nhất là giai đoạn khai cuộc), rồi tới Sĩ và Tượng', 'Chia bàn cờ làm ba cánh: trái, phải, trung lộ — nhận định đúng cánh yếu để điều quân phối hợp', 'Dùng các đòn phối hợp đã học để ra đòn và khuếch đại ưu thế', 'Quân địch ở vị trí hẻo lánh, rời rạc, không liên kết là mục tiêu kìm hãm, dồn ép'],
        thu: ['Không để quân đứng cô độc, dễ bị công kích, vây bắt — vị trí vừa công vừa thủ là tốt nhất', 'Tướng đứng chỗ an toàn, Sĩ Tượng liên kết chắc chắn', 'Mang quân đi đánh phải nhớ nhà cửa: coi chừng hai cánh trống trải, nhất là đòn Pháo giác và Mã ngọa tào', 'Tốt giữa (Tốt 5) rất quan trọng với phòng tuyến trung lộ', 'Ra quân chiếm vị trí linh hoạt, trọng yếu, không để các quân dẫm chân nhau'],
        body: `<p><strong>Đánh giá cục diện</strong> là nhìn toàn bộ ván cờ bằng một chuỗi suy nghĩ liên kết, để đưa ra nhận định: bên nào có điểm yếu, cánh nào yếu, đội hình nào chưa hoàn chỉnh — dựa trên vị trí thật của các quân lúc này.</p>
<p>Chương này gồm bốn bài lý thuyết: tổng quan (bài này), khai thác điểm yếu, nhược điểm về hình trận và hình trận chưa hoàn chỉnh. Mỗi bài có hai ví dụ có lời giải.</p>
<h2>Khi tấn công</h2>
@CONG
<h2>Khi phòng thủ</h2>
@THU`,
      },
      {
        key: 'khai-thac-diem-yeu', title: 'Khai Thác Điểm Yếu — Quân Đơn Lẻ, Quân Hẻo Lánh, Quân Bị Ghim, Điểm Mạnh Ảo',
        summary: 'Điểm yếu là vị trí khiến một quân dễ bị công kích, vây bắt, khống chế. Bốn loại điểm yếu hay gặp và cách tự phòng.',
        board: 'E21',
        cong: ['Quân đơn lẻ — nhất là Mã đứng một mình: điều quân vây bắt, tạo áp lực', 'Quân hẻo lánh — nhất là Xe, Pháo ở chỗ khó đi: khó đi ngang thì vây dọc, khó đi dọc thì vây ngang bằng Xe hoặc Pháo', 'Quân bị ghim — đang phải chắn trước Tướng hoặc bảo vệ quân quan trọng hơn nên không rời được: chỉ cần điều quân phối hợp bắt chết', 'Điểm mạnh ảo — chỗ tưởng rất chắc nhưng là điểm chí mạng: phá Pháo gánh, phá Sĩ Tượng đã liên kết, Mã giao chân…'],
        thu: ['Không để quân ở vị trí hẻo lánh, cô độc; quân qua sông cần có quân khác đi cùng hỗ trợ', 'Cởi trói quân bị khống chế càng sớm càng tốt (xem chương Chiến thuật khống chế)', 'Cẩn thận chỗ tưởng chắc chắn: Pháo gánh chưa chắc đã khỏe, Sĩ Tượng liên kết chưa chắc đối phương không dám phá'],
        body: `<p><strong>Điểm yếu</strong> của một thế cờ là vị trí khiến một quân dễ bị công kích, vây bắt, khống chế hoặc chịu áp lực. Bất kỳ quân nào cũng có thể trở thành điểm yếu — và thành mục tiêu.</p>
<p>Bàn minh họa: Xe Đen đứng mép bàn trên lộ 1, cạnh Mã Đỏ — một quân "hẻo lánh" khó đi ngang; Pháo Đỏ ở hàng trên đang nhòm. Hãy tìm quân nào của Đen là đơn lẻ, hẻo lánh hay bị ghim.</p>
<h2>Bốn loại điểm yếu khi tấn công</h2>
@CONG
<h2>Khi phòng thủ</h2>
@THU`,
      },
      {
        key: 'nhuoc-diem-hinh-tran', title: 'Nhược Điểm Về Hình Trận — Trung Lộ Yếu Và Hai Cánh Trống',
        summary: 'Nhược điểm hình trận là điểm yếu trên một diện rộng: trung lộ, cánh trái, cánh phải. Nguyên nhân thường gặp và các đòn hay dùng để khai thác.',
        board: 'E24',
        cong: ['Trung lộ yếu thường do Sĩ Tượng chưa chắc, bị lệch, hoặc quân ở trung lộ chèn nhau, không liên kết, đang bị khống chế', 'Đòn hay dùng ở trung lộ: Pháo đầu, Thiết môn thuyên, Pháo trùng, Mã ngọa tào, Quải giác Mã…', 'Hai cánh yếu thường do mang hết quân đi đánh, bỏ trống nhà — bị khai thác ở hai cánh Tượng', 'Đòn hay dùng ở hai cánh: Pháo giác, Mã ngọa tào, Trắc diện hổ, Mã khẩu, Xe Pháo rút, Song Xe lệch, Song Xe nhĩ, Giáp Xe Pháo, Pháo lăn…'],
        thu: ['Bảo vệ chắc trung lộ, chú ý Tốt giữa; cần ít nhất một Mã giữ, hoặc Xe giữ ngang hàng Tốt khi cần', 'Sĩ Tượng phải củng cố, liên kết chặt; thấy trung lộ mỏng thì tìm cách triệt Pháo đầu của đối phương', 'Không để một cánh trống trải, đặc biệt đề phòng đòn Pháo giác', 'Giữ Tướng ở vị trí tốt: Tướng lệch ra cánh thì vô số đòn sát nguy hiểm sẽ nhắm vào cánh đó'],
        body: `<p><strong>Nhược điểm về hình trận</strong> là điểm yếu trên một diện rộng chứ không phải một quân. Thường thấy ở một trong ba cánh — trung lộ, cánh phải, cánh trái — hoặc ở một khu vực cục bộ.</p>
<p>Bàn minh họa: Xe Đỏ đã cắm vào hàng Tốt Đen ở trung lộ, Mã Đen giữa và Pháo Đen lộ 6 chen nhau quanh cung — trung lộ của Đen là nơi đáng khai thác.</p>
<h2>Khi tấn công</h2>
@CONG
<h2>Khi phòng thủ</h2>
@THU`,
      },
      {
        key: 'hinh-tran-chua-hoan-chinh', title: 'Hình Trận Chưa Hoàn Chỉnh — Đánh Thẳng Vào Sĩ Tượng',
        summary: 'Khi Sĩ Tượng của đối phương chưa được củng cố, tấn công trực tiếp vào chúng có thể kết thúc ván cờ. Dấu hiệu nhận biết và cách tự phòng.',
        board: 'E27',
        cong: ['Thế trận Pháo đầu thường khoét vào hai lộ Tượng ở hai cánh vì hai Tượng chưa liên kết', 'Sĩ đối phương chưa liên kết mà có Xe nhòm — chú ý ngay khả năng sát cục', 'Đối phương chống Sĩ Tượng sai bên — khai thác ngay', 'Có thế tấn công hay thế sát thì cân nhắc phế quân để đoạt Sĩ Tượng, phá vỡ trận hình'],
        thu: ['Đi Pháo đầu thì nhớ bảo vệ hai cánh Tượng, cẩn thận Pháo tuần hà nhòm Tượng', 'Bị Xe nhòm thì chống Sĩ cho liên kết — thường chống ngược phía Xe nhòm để Tướng có đường thoát', 'Sĩ Tượng đã chắc cũng đừng chủ quan: bị đánh đúng lúc tưởng an toàn nhất là lúc nguy hiểm nhất'],
        body: `<p>Đây là dạng khai thác nhược điểm <strong>trực tiếp vào Sĩ Tượng</strong> của đối phương khi chúng chưa được củng cố. Không cần vây bắt quân lớn — chỉ cần một cánh Sĩ Tượng hở là đủ.</p>
<p>Bàn cờ bên trên là ví dụ: Sĩ Đen chưa liên kết, Xe Đỏ đứng nhòm ngay cạnh cung. Đỏ đi trước chiếu hết sau 8 nước — bấm "Tiến" để xem.</p>
<h2>Khi tấn công</h2>
@CONG
<h2>Khi phòng thủ</h2>
@THU`,
      },
    ],
    examples: ['E19', 'E20', 'E22', 'E23', 'E25', 'E26', 'E28', 'E29'],
  },
  {
    key: 'lien-he-huu-co', sec: 'lienhe', ten: 'Phối Hợp Binh Chủng, Liên Hệ Hữu Cơ Giữa Các Quân',
    theory: [
      {
        key: 'phoi-hop-binh-chung', title: 'Sự Phối Hợp Các Loại Binh Chủng — 6 Nguyên Tắc',
        summary: 'Xe, Pháo, Mã, Tốt mạnh nhất khi phối hợp. Sáu nguyên tắc khi phối hợp quân tấn công hay phòng thủ.',
        board: 'E30',
        cong: ['Phối hợp phải nhìn toàn cục mới biết tốt hay xấu', 'Lúc nào cũng chú ý tính liên kết giữa các quân: công có lực, thủ có sức dẻo dai', 'Dồn quân đi đánh cũng phải nhìn lại nhà cửa — coi chừng bị đột kích và sơ hở điểm yếu cục bộ', 'Khi phối hợp công hay thủ, cả hai bên đều có được có mất — tính giá trị, thế cờ, tình huống ván đấu', 'Chú ý vị trí các quân để chọn đòn công thủ hợp lý', 'Dùng các đòn của 13 đội hình sát chiêu đã học'],
        body: `<p>Một quân đơn lẻ dù mạnh cũng ít khi tạo ra đòn quyết định. Sức mạnh thật của trung cuộc nằm ở chỗ các binh chủng — Xe, Pháo, Mã, Tốt — <strong>phối hợp</strong> với nhau.</p>
<h2>6 nguyên tắc phối hợp</h2>
@CONG
<p>Bàn minh họa: điểm yếu của Đen ở trung lộ — Pháo nhập cung làm tắc Sĩ lộ 6. Đỏ phải khai thác nhưng cũng cần tính được mất: mang quân nào đi, nhà có sơ hở gì không. Ví dụ ngay sau bài này phân tích chi tiết.</p>`,
      },
      {
        key: 'lien-he-huu-co', title: 'Liên Hệ Hữu Cơ Giữa Các Quân — Liên Kết Để Công Sắc, Thủ Bền',
        summary: 'Liên hệ hữu cơ là sự liên kết, hỗ trợ lẫn nhau giữa các quân để mỗi quân phát huy sức mạnh lớn nhất. Ba bước khi tấn công, ba bước khi phòng thủ.',
        board: 'E32',
        cong: ['Nhìn ra điểm mạnh, điểm yếu của cả ta lẫn địch', 'Bao quát hình cờ, nhận định các quân có liên hệ, có hỗ trợ được nhau không', 'Phối hợp quân tạo liên kết để thực hiện mục tiêu đã đề ra'],
        thu: ['Nhận ra điểm mạnh, điểm yếu của ta rồi điều quân hỗ trợ nhau phòng thủ', 'Đổi bớt quân để giảm sức phối hợp của đối phương', 'Cắt đứt liên lạc giữa các quân đối phương; tìm đường phản kích kéo quân họ về thủ'],
        body: `<p><strong>Liên hệ hữu cơ</strong> là sự liên kết, hỗ trợ lẫn nhau giữa các quân, giúp mỗi quân phát huy hết sức và làm cho tấn công sắc bén, phòng thủ vững vàng. Hai quân đứng cạnh nhau chưa chắc đã liên kết — liên kết là khi quân này làm căn, làm ngòi, mở đường hay che chắn cho quân kia.</p>
<h2>Khi tấn công</h2>
@CONG
<h2>Khi phòng thủ</h2>
@THU`,
      },
      {
        key: 'uu-viet-vi-tri-quan', title: 'Tính Ưu Việt Về Vị Trí Quân Cờ — Xe, Pháo, Mã Đứng Đâu Thì Mạnh?',
        summary: 'Mỗi binh chủng có những vị trí làm nó mạnh nhất: Xe ở lộ dài chân, Pháo ở chỗ có ngòi, Mã ở chỗ ít bị cản chân. Câu hỏi cần đặt cho từng quân.',
        board: 'E35',
        cong: ['Xe: đứng chỗ đi ngang, đi dọc đều rộng và dài chân — các lộ 2, 4, 6, 8; hàng Tốt, hàng tuần hà, hàng kỵ hà của cả hai bên; hàng sát cung Tướng', 'Pháo: đi giống Xe nhưng cần ngòi — đứng chỗ có ngòi sẽ mạnh hơn: lộ 3, 5, 7, hàng Pháo của mình, hàng tuần hà, hàng đáy đối phương (Pháo giác)', 'Mã: đứng chỗ ít bị cản chân nhất — Mã "bát diện" (đi được cả 8 điểm) cực kỳ linh hoạt; Mã đứng đầu Tượng để chuyển sang lộ 2, 4, 6, 8 rồi ngọa tào — rất mạnh, hay dùng'],
        thu: ['Với mỗi quân, tự hỏi: vị trí này có tác dụng gì? Sức tấn công hay sức phòng thủ? Vị trí vừa công vừa thủ là tốt nhất', 'Đưa quân mình tới chỗ thông thoáng; ngược lại hạn chế, chèn ép quân đối phương và chiếm trước điểm đẹp của họ'],
        body: `<p>Cùng một quân, đứng chỗ này thì mạnh, đứng chỗ kia thì vô dụng. Hiểu <strong>vị trí ưu việt</strong> của từng binh chủng giúp chọn nước đi nhanh hơn trong trung cuộc.</p>
<h2>Vị trí mạnh của từng quân</h2>
@CONG
<h2>Câu hỏi cho mỗi quân</h2>
@THU
<p>Bàn minh họa: Pháo Đỏ ở trung lộ có ngòi, Mã Đỏ ở hàng sông đứng chỗ thông thoáng, Pháo lộ 3 cắm sâu — đếm thử mỗi quân Đỏ và Đen đi được bao nhiêu ô, quân nào đang "chết đứng".</p>`,
      },
      {
        key: 'tap-trung-binh-luc', title: 'Tập Trung Ưu Thế Binh Lực — Đông Hơn Ở Đúng Chỗ',
        summary: 'Tổng quân ngang nhau vẫn thắng được nếu dồn quân tới một khu vực cục bộ để ở đó ta đông hơn đối phương. Cách làm khi tấn công và khi phòng thủ.',
        board: 'E38',
        cong: ['Tìm điểm đánh, hướng đánh rồi dồn quân tới', 'Các quân liên kết tối đa, hỗ trợ nhau tạo áp lực', 'Phát huy sức mạnh đông quân cục bộ, đồng thời ngăn đối phương liên kết, dồn quân về chỗ đó'],
        thu: ['Đổi, triệt tiêu quân chủ lực của đối phương để giảm áp lực', 'Dồn quân chi viện điểm yếu, cánh yếu', 'Tìm đường phản công, buộc đối phương phải lui quân về thủ'],
        body: `<p><strong>Tập trung ưu thế binh lực</strong> là dồn quân tới một vị trí cục bộ mà ở khu vực đó ta đông hơn đối phương — dù tổng quân trên bàn có thể ngang hoặc ít hơn. Trận đánh được quyết định ở nơi ta đông, không phải ở tổng số quân.</p>
<h2>Khi tấn công</h2>
@CONG
<h2>Khi phòng thủ</h2>
@THU`,
      },
    ],
    examples: ['E30', 'E31', 'E33', 'E34', 'E36', 'E37', 'E39', 'E40'],
  },
  {
    key: 'cuc-dien', sec: null, ten: 'Nhận Thức Và Đánh Giá Cục Diện',
    theory: [
      {
        key: 'cuc-dien-dien-hinh-dong-tinh', title: 'Ba Loại Cục Diện Trung Cuộc: Điển Hình, Động, Tĩnh',
        summary: 'Trước khi chọn kế hoạch, phải biết mình đang ở loại cục diện nào: điển hình (đã được nghiên cứu kỹ), động (đối công xô xát) hay tĩnh (yên ả nhưng so từng Tốt).',
        board: 'E41',
        cong: ['Điển hình: thế đã được nghiên cứu rất nhiều qua các thời kỳ và liên tục cập nhật biến mới (Tả mã bàn hà, Cấp tiến trung binh, Pháo đầu tam binh…) — nước đi và đòn đánh đã có sẵn, cần học và kế thừa', 'Động: đối công xô xát, ăn miếng trả miếng, đòn đánh rõ ràng — phải tính tốc độ tấn công nhanh hay chậm hơn đối phương, dùng nhiều đòn sát chiêu', 'Tĩnh: bề ngoài yên ả nhưng ẩn nội lực sâu xa — so độ hiểu biết về tàn cờ, hơn thua từng Tốt, chiếm vị trí trọng yếu, kìm hãm quân đối phương'],
        body: `<p>Cùng một trình độ, người biết mình đang ở <strong>loại cục diện nào</strong> sẽ chọn đúng kế hoạch: lúc cần tính tốc độ thì tính tốc độ, lúc cần kiên nhẫn thì không vội.</p>
<h2>Ba loại cục diện</h2>
@CONG
<p>Bàn minh họa là một thế điển hình xuất phát từ Pháo đầu đối Bình phong Mã: Đỏ đã thí Tốt giữa, Tốt Đỏ vượt sông áp sát — loại thế mà các phương án đã được nghiên cứu sâu. Các ví dụ sau lần lượt minh họa thế điển hình (7 phương án của Tả mã bàn hà), thế động và thế tĩnh.</p>`,
      },
    ],
    examples: ['E42', 'E43', 'E44', 'E45'],
  },
  {
    key: '5-huong-tu-duy', sec: 'huong', ten: '5 Hướng Tư Duy Trung Cuộc',
    theory: [
      {
        key: '5-huong-tu-duy-trung-cuoc', title: '5 Hướng Tư Duy Trung Cuộc — Sát Thế, Bắt Quân, Điểm Yếu, Phế Quân, Đổi Quân',
        summary: 'Đứng trước một thế trung cuộc, đi lần lượt năm câu hỏi: có sát không, có bắt hay kìm được quân không, điểm yếu ở đâu, có nên phế quân tranh tiên không, và nếu đang kém thì đổi quân thế nào.',
        board: 'E46',
        cong: ['Có hình sát hay tạo được thế sát không? — trung cuộc vẫn có sát liên hoàn; ưu tiên số một khi đội hình đang ở tư thế chiến đấu', 'Có bắt được quân, kìm hãm hay xua đuổi quân đối phương không?', 'Điểm yếu, cánh yếu, trung lộ yếu của ta và của địch ở đâu?', 'Có nên phế quân tranh tiên, dùng mồi nhử dụ đối phương không?', 'Nếu thế đang kém: tìm cách đổi quân chủ lực của đối phương, đưa về tàn hòa hoặc thế khó thắng cho họ'],
        body: `<p>Năm hướng dưới đây là "bảng kiểm" cho mọi thế trung cuộc. Đi theo đúng thứ tự: hướng trước càng cấp bách, hướng sau càng mang tính chiến lược.</p>
<h2>Năm hướng tư duy</h2>
@CONG
<p>Bàn cờ bên trên minh họa hướng thứ nhất: thế trung cuộc nhìn phức tạp nhưng ẩn một chuỗi sát liên hoàn — Đỏ đi trước chiếu hết sau 6 nước. Hãy dùng phương pháp tư duy sát liên hoàn để tìm trước khi bấm "Tiến". Ba ví dụ sau minh họa hướng 2, 3 và 4.</p>`,
      },
    ],
    examples: ['E47', 'E48', 'E49'],
  },
  {
    key: 'tong-hop', sec: 'tonghop', ten: 'Câu Hỏi Khi Tư Duy — Bài Tập Tổng Hợp',
    theory: [
      {
        key: 'cau-hoi-khi-tu-duy', title: 'Những Câu Hỏi Tự Đặt Trước Mỗi Nước Cờ Trung Cuộc',
        summary: 'Mục đích nước đi là gì, còn phương án nào khác, hình dung được thế cờ sau vài nước chưa, có đòn nào lợi hại không, đã bao quát toàn bàn chưa — năm thói quen nâng lực cờ.',
        cong: ['Mục đích của nước đi này là gì? — rèn tính cẩn thận, bỏ thói "bốc cờ" đi nhanh', 'Ngoài nước này còn phương án nào khác? — chỉ nghĩ một phương án dễ bỏ lỡ nước hay, hoặc không thấy âm mưu của đối phương', 'Đã tính và hình dung được thế cờ vài nước tiếp theo trong đầu chưa? — phải tưởng tượng quân ở vị trí mới; mắt vẫn nhìn thấy quân ở chỗ cũ nên rất dễ tính sai', 'Lúc này có đòn nào lợi hại không? — kể cả đòn kín đáo, có chiều sâu', 'Đã bao quát toàn bộ hình cờ chưa? — đánh giá cục diện, tìm điểm yếu, liên kết quân để phát huy sức mạnh'],
        body: `<p>Kiến thức chỉ thành lực cờ khi trở thành thói quen. Trước mỗi nước đi ở trung cuộc, hãy tự hỏi năm câu dưới đây — lúc đầu chậm, dần dần sẽ thành phản xạ.</p>
<h2>Năm câu hỏi</h2>
@CONG
<h2>Bài tập tổng hợp</h2>
<p>Phần cuối chuyên đề trộn lẫn mọi chủ đề: sát cục, bắt quân, tranh tiên, khai thác điểm yếu — không có gợi ý trước bài thuộc dạng nào, giống ván thật nhất. Với mỗi thế, đi qua năm câu hỏi trên rồi mới đi.</p>`,
      },
    ],
  },
];

// ---------------- ví dụ ----------------
const EX = {
  // 5 hướng khi bị đuổi bắt
  E2: { title: 'Chạy Mà Gây Áp Lực', text: '<p>Mã Đen ở lộ 6 đang bị đuổi. Trước nước này có đủ năm hướng — chạy, giữ, bắt lại, cản, phế — và lựa chọn tốt là <strong>chạy</strong>, nhưng chạy tới chỗ tạo áp lực mạnh lên đối phương chứ không chỉ để thoát.</p><p>Khi buộc phải chạy, hãy chọn ô vừa an toàn vừa dọa được một mục tiêu: đối phương mất một nhịp để đỡ, ta coi như chạy "không mất tiền".</p>' },
  E3: { title: 'Phế Mã Phản Công Vào Lộ Tượng', text: '<p>Hai Mã Đen tiến sâu, Xe Đỏ ở lộ 4 đang đuổi. Thay vì lo cứu Mã, Đen chọn hướng <strong>phế</strong>: bỏ Mã để phản công thẳng vào lộ Tượng của Đỏ, nơi phòng thủ đang mỏng.</p><p>Bài học: trước khi chạy, xem có đường đánh nào hiệu quả hơn giá trị quân bị mất không.</p>' },
  E4: { title: 'Giữ Quân Ở Vị Trí Đẹp', text: '<p>Quân bị đuổi đang đứng ở vị trí đẹp — chạy đi là tự bỏ vị trí. Hướng đúng ở đây là <strong>giữ</strong>: điều thêm quân tới bảo vệ để quân đó ở lại.</p><p>Điều kiện: tính trước rằng nếu đối phương vẫn cố ăn rồi ta ăn lại, cuộc đổi quân đó không thiệt cho ta.</p>' },
  E5: { title: 'Bắt Lại Quân Có Giá Trị Tương Đương', text: '<p>Khi quân mình bị đuổi, hãy nhìn quanh xem có quân nào của đối phương bắt lại được không. Ở thế này hướng <strong>bắt lại</strong> hợp lý: đổi lấy một quân có giá trị tương đương.</p><p>Điều quan trọng nhất của hướng này: đổi được đúng quân đang đứng ở vị trí mạnh của đối phương.</p>' },
  E6: { title: 'Phế Quân Lấy Thế Công Mạnh', text: '<p>Xe Đen đã xuống tới hàng đáy, quân Đỏ tập trung đông ở cánh trái Đen. Đỏ chấp nhận <strong>phế quân</strong>: mất quân bị đuổi nhưng đổi lại thế công mạnh vào cung Tướng Đen.</p><p>Hướng phế chỉ đúng khi đường tấn công thật sự hiệu quả — tính trước ít nhất vài nước tấn công tiếp theo.</p>' },
  E7: { title: 'Phế Mã Tranh Tiên', text: '<p>Đỏ chọn <strong>phế Mã để tranh tiên</strong>. Từ đây Đen phải liên tục chống đỡ các đợt tấn công của Đỏ, không còn thời gian thực hiện kế hoạch của mình.</p><p>Tiên (quyền chủ động) trong trung cuộc nhiều khi đáng giá hơn một quân: bên có tiên chọn chiến trường, bên bị động chỉ đỡ.</p>' },
  E8: { title: 'Cản Bắt — Bình Pháo Chặn Đường Xe', text: '<p>Xe đối phương đang đe dọa. Đỏ chọn hướng <strong>cản</strong>: bình Pháo chen ngang chặn đúng đường bắt của Xe.</p><p>Nước cản tốt vừa giữ được quân, vừa cắt đường lao lên của đối phương. Nhưng nhớ: quân đứng cản có thể bị ghim — đừng để nó thành quân tắc.</p>' },

  // khống chế
  E10: {
    title: 'Bỏ Xe Đổi Hai Quân Để Cởi Trói', main: ['M6.4', 'P2-7', 'M4.3', 'X8.2', 'M3/5', 'P7.2', 'P8-3', 'M3.5', 'P5.4', 'S6.5', 'X9-4'],
    captions: { 1: 'Đỏ đến lượt, Xe và Mã đang bị khống chế. Đỏ quyết định cởi trói bằng cách chấp nhận mất Xe.', 3: 'Đỏ bắt đầu thu lại quân.', 11: 'Xe ra lộ 4. Đỏ còn Xe hai Pháo, hơn Tốt, thế cờ chắc chắn; Đen song Xe không có đường phản công.' },
    text: '<p>Xe và Mã Đỏ đang bị khống chế. Để cởi trói, Đỏ chấp nhận bỏ Xe đổi lấy hai quân của Đen và vẫn giữ ưu thế.</p><p>Kết quả: Đỏ còn Xe và hai Pháo, hơn Tốt, có thế công trước song Xe của Đen. Hình cờ Đỏ chắc chắn, Đen không có đường phản.</p>',
  },
  E11: {
    title: 'Dọa Sát Để Thoát Khống Chế, Ép Xe Vào Góc', main: ['B3.1', 'B7.1', 'P2-3', 'X8-9', 'P3-1', 'T7.9', 'X9-6', 'P2.2', 'P1-8', 'P2-1', 'B9.1', 'B3.1', 'X6.5', 'P1-5', 'B7.1', 'P5/1', 'B7.1'],
    captions: { 1: 'Xe Đen đang khống chế Xe và Pháo Đỏ. Đỏ thí Tốt mở đường.', 3: 'Pháo bắt đầu chuyển sang cánh phải.', 4: 'Xe Đen dạt về góc.', 5: 'Pháo bình 1 nhắm thẳng Xe Đen trong góc — Đen phải lên Tượng che.', 13: 'Xe Đỏ đã thoát khống chế.', 17: 'Tốt Đỏ tiến lên. Đỏ thoát khống chế và giành ưu thế lớn.' },
    text: '<p>Xe Đen đang khống chế Xe và Pháo Đỏ. Đỏ dùng các nước dọa sát để thoát khống chế, đồng thời ép Xe Đen vào góc bàn.</p><p>Nguyên tắc: khi bị khống chế, nước dọa sát là cách cởi trói nhanh nhất — đối phương phải đỡ, ta được thêm nhịp để giải phóng quân.</p>',
  },
  // ngăn cản
  E13: {
    title: 'Xe Cản Mắt Tượng Yểm Trợ Pháo Sát Cục', main: ['P8.7', 'M5/3', 'X2-6', 'S6.5', 'X6.2', 'T5.3', 'X8.8', 'M7.9', 'P7/3', 'X5-8', 'X6-5', 'Tg5-6', 'S5.4', 'X8.3', 'Tg5.1', 'X8-4', 'B7-6', 'T7.5', 'X8-6', 'X4/6', 'P7.8'],
    captions: { 1: 'Pháo chiếu, mở màn.', 3: 'Xe bình 6 — chuẩn bị cản mắt Tượng.', 5: 'Xe tiến vào cản mắt Tượng: Tượng Đen mất liên kết.', 7: 'Xe thứ hai tiến sâu yểm trợ.', 11: 'Xe phá Sĩ.', 21: 'Pháo kết thúc ván cờ.' },
    text: '<p>Đỏ dùng Xe chen vào cản các mắt Tượng của Đen để Pháo có đường tấn công. Khi hai Tượng không còn bảo vệ được nhau, đòn Pháo kết thúc ván cờ.</p><p>Đây là dạng ngăn cản kinh điển: cản mắt Tượng làm đứt liên kết phòng thủ của đối phương.</p>',
  },
  E14: {
    title: 'Xe Ngăn Thế Sát Rồi Phản Tiên Đánh Trung Lộ', main: ['g7e7', 'M7/5', 'X5-8', 'M5.7', 'X8-7', 'T3.5', 'X7-5', 'X1/7', 'X5/1', 'X6.9', 'X2.2', 'X6/9', 'X2-4', 'Tg5-6', 'X5-4'],
    captions: { 1: 'Xe ăn Tượng giữa, chặn đúng đường tấn công của Đen.', 3: 'Xe dạt sang cánh — ngăn quân Đen.', 7: 'Xe lại ăn Tượng giữa: trung lộ Đen trống.', 11: 'Xe thứ hai chiếu.', 15: 'Xe chiếu — Đỏ tấn công trung lộ mạnh mẽ, ưu thế lớn.' },
    text: '<p>Đen đang có thế sát. Đỏ dùng nước Xe ngăn cản thế sát ấy, rồi phản tiên tấn công khiến Đen thất thế nặng.</p><p>Bài học: nước phòng thủ tốt nhất là nước vừa chặn đòn vừa tạo đòn — ngăn cản và phản công trong cùng một nước. (Nước đầu trong tài liệu gốc ghi nhầm số lộ; đã sửa theo bàn cờ.)</p>',
  },
  // phế quân
  E16a: {
    title: 'Phế Mã Đánh Trung Lộ Trống Trải', main: ['M3.5', 'X5/1', 'P6-2', 'X5-8', 'Ps-5'],
    captions: { 1: 'Mã nhảy vào trung lộ — phế Mã.', 2: 'Giả sử Đen tham ăn Mã.', 3: 'Pháo bình 2 nhắm cánh.', 5: 'Pháo sau về trung lộ: phế Xe, dọa đòn Pháo trùng — Đen rất khó đỡ.' },
    text: '<p>Đỏ nhảy Mã phế Mã, mở ra cuộc tấn công vào điểm yếu trung lộ khi Tướng Đen trống trải. Mạch trên xét biến Đen tham ăn Mã: Đỏ tiếp tục phế Xe, dọa đòn Pháo trùng.</p><p>Bài tập thêm: tự xét biến Đen không ăn Mã — Đỏ vẫn có cách duy trì thế công không?</p>',
  },
  E16: {
    title: 'Thí Trước Đoạt Sau: Phế Pháo Giữ Tiên', main: ['X2.6', 'M1.3', 'M9.8', 'X1-2', 'M8/7'],
    captions: { 1: 'Mã Đen nhảy ra dọa bắt Pháo. Đỏ không cứu Pháo mà tiến Xe.', 2: 'Mã Đen ăn Pháo.', 3: 'Mã Đỏ nhảy ra.', 5: 'Mã ăn lại Mã: Đỏ đoạt lại quân, thế trận vẫn tiên thủ.' },
    text: '<p>Thế cờ xuất phát từ khai cuộc Pháo đầu tam binh. Đen nhảy Mã bắt Pháo; Đỏ vận dụng chiến thuật <strong>thí trước đoạt sau</strong>: để mất Pháo nhưng ngay sau đó đoạt lại Mã, thế trận vẫn giữ được tiên.</p><p>Thế này còn nhiều biến hóa cần nghiên cứu thêm — thử tự đánh với máy từ thế xuất phát.</p>',
  },
  E17: {
    title: 'Chọn Đúng Cách Bỏ Xe — Hiểu Tàn Cờ Mới Chọn Đúng', main: ['X5/1', 'd3e3'], vars: [{ from: 'main', after: 0, moves: ['X5-6', 'd3d4'], captions: { 1: 'Cách SAI: đổi Xe lấy Xe vì nghĩ giữ quân mạnh hơn.', 2: 'Xe Đen ăn lại. Đen còn Xe Pháo đánh Pháo Mã Sĩ Tượng toàn — thế thắng của Đen.' } }],
    captions: { 1: 'Cách ĐÚNG: thí Xe ăn Pháo.', 2: 'Xe Đen ăn Xe. Đen còn song Xe, Đỏ Pháo Mã Sĩ Tượng toàn — tàn cờ hòa.' },
    text: '<p>Đỏ chỉ có hai lựa chọn: thí Xe vào Pháo, hoặc đổi Xe với Xe Đen.</p><ul><li><strong>Thí Xe ăn Pháo</strong> (mạch chính) — chính xác. Thế chuyển sang song Xe đánh Pháo Mã Sĩ Tượng toàn: tàn cờ hòa.</li><li><strong>Đổi Xe</strong> (nhánh phụ) — sai, dù nhìn qua có vẻ "giữ quân mạnh hơn". Thế thành Xe Pháo đánh Pháo Mã Sĩ Tượng toàn: tàn thắng cho Đen.</li></ul><p>Đây là dạng <strong>phế quân chuyển tàn</strong>: chỉ chọn đúng được khi thuộc khẩu quyết tàn cuộc.</p>',
  },
  // nhược điểm
  E19: {
    title: 'Diệt Tượng Chủ Lực, Đánh Cánh Trái Mỏng Manh', main: ['X1.1', 'X7/2', 'X1-3', 'X7.2', 'P2.7', 'X7/2', 'M3.4'],
    captions: { 1: 'Xe ăn ngay Tượng — quân phòng thủ chủ lực của cánh trái Đen.', 5: 'Pháo chiếu.', 7: 'Mã tiến phối hợp — Đen khó đỡ.' },
    text: '<p>Cánh trái Đen khá mỏng: quân phòng thủ chủ lực lúc này chỉ là Tượng và Xe. Ngược lại Đỏ có bốn quân ở cánh phải, cộng thêm Pháo lộ 6 chắn giữ một lộ quan trọng.</p><p>Đỏ tiêu diệt ngay Tượng chủ lực và phối hợp tấn công vào cánh trái Đen. Ngoài mạch chính còn một số biến khác — tự phân tích như bài tập.</p>',
  },
  E20: {
    title: 'Khóa Cánh Phải Không Người Giữ', main: ['X6.8'],
    captions: { 1: 'Xe tiến 8: không cho Đen đảo Tượng. Sau đó Pháo lộ 4 sẽ chuyển sang đánh Pháo giác.' },
    text: '<p>Cánh phải Đen không có quân phòng thủ, các quân Đen còn dẫm chân nhau khá tắc. Đỏ khai thác cánh phải.</p><p>Mục đích của nước Xe tiến: không cho Đen đảo Tượng sang che, rồi chuyển Pháo sang tấn công bằng Pháo giác cực mạnh. Đen phải gồng mình phòng thủ; Đỏ khuếch đại ưu thế về tàn cờ.</p>',
  },
  E22: {
    title: 'Từ Một Điểm Yếu Ở Xe Mở Rộng Ưu Thế Toàn Cục', main: ['B3.1', 'B3.1', 'M7.9', 'X1-6', 'B3.1', 'X6-7', 'M9.7', 'S6.5', 'P9-7'],
    captions: { 1: 'Xe Đen ở mép bàn khó đi ngang. Đỏ thí Tốt mở đường.', 3: 'Mã ra biên dọa bắt Xe.', 7: 'Mã ăn Tốt, áp sát.', 9: 'Pháo bình 7 phối hợp — cờ Đen khó đi.' },
    text: '<p>Đến lượt Đỏ. Xe Đen ở lộ 1 có điểm đi ngang rất hạn chế. Đỏ phối hợp Pháo Mã công kích, dọa bắt chết Xe.</p><p>Từ một điểm yếu ở quân Xe, Đỏ tạo đà mở rộng ưu thế ra toàn cục.</p>',
  },
  E23: {
    title: 'Đánh Thẳng Vào Điểm Mạnh Ảo Của Đôi Pháo Gánh', main: ['X6.3', 'P8/1', 'M5.4', 'P8-6', 'Tg5-6'],
    captions: { 1: 'Xe tiến thẳng vào nơi tưởng là chắc nhất.', 3: 'Mã chiếu.', 5: 'Tướng ra mặt: Đen bị khống chế quân, Đỏ ưu thế lớn.' },
    text: '<p>Thoạt nhìn đôi Pháo gánh của Đen rất khỏe. Nhưng Đỏ đánh thẳng vào chính chỗ "điểm mạnh ảo" đó, khiến Đen bất ngờ.</p><p>Sau vài nước Đen bị khống chế quân, Đỏ giành ưu thế lớn.</p>',
  },
  E25: {
    title: 'Nước Xe Tinh Tế Đánh Cánh Phải Mỏng', main: ['X8.3', 'P8.2', 'X8-7', 'S5.6', 'X3.1', 'X2/3', 'X3-4', 'Mt.7', 'X4.4'],
    captions: { 1: 'Xe tiến 3 — nước tinh tế nhất của thế cờ.', 5: 'Xe thứ hai tiến — nước mạnh tiếp theo.', 9: 'Xe ăn Mã: thế công Đỏ rất mạnh.' },
    text: '<p>Ví dụ về nhược điểm hình trận: cánh phải Đen khá mỏng manh, còn có nguy cơ dính đòn Pháo giác. Trong khi đó quân Đỏ tập trung ở đây khá dày.</p><p>Đỏ điều quân tấn công tinh tế bằng nước Xe tiến 3 — Xe chen vào đúng cánh yếu.</p>',
  },
  E26: {
    title: 'Song Xe Song Pháo Khai Thác Trung Lộ Chí Mạng', main: ['X9-8', 'B3.1', 'P2.5', 'B3-2', 'X8.3', 'X3.1', 'T5.7', 'P4-2', 'X6.3', 'P6/1', 'X6/1', 'X3/1', 'B5.1', 'P2/1', 'X6-7', 'Tg5-4', 'P5-7', 'X3-4', 'P7.3'],
    captions: { 3: 'Pháo tiến 5 — nước then chốt của thế cờ.', 16: 'Tướng Đen phải chạy.', 19: 'Sau đó bình Pháo về giữa, Đen khó đỡ.' },
    text: '<p>Cờ Đen vừa có điểm yếu ở Xe lộ 3, vừa có nhược điểm hình trận ở trung lộ — chí mạng. Đỏ khai thác bằng song Xe song Pháo.</p><p>Hai loại nhược điểm cùng lúc thì đòn đánh vào chỗ này sẽ kéo theo chỗ kia.</p>',
  },
  E28: {
    title: 'Pháo Dọa Nhòm Tượng, Hăm Bí Chiếm Ưu', main: ['P6.2', 'P4-3', 'X4.2', 'X2-6', 'X4-3', 'T7.9', 'P6-7', 'P3.3', 'B7.1', 'X8.2', 'M9/8', 'X6.2', 'M8.7', 'X6-7', 'X2.2', 'B5.1', 'M7.6', 'B5.1', 'B5.1', 'X7-4', 'M6.7', 'M1.3', 'X3-7'],
    captions: { 1: 'Pháo tiến, chuẩn bị nhòm Tượng.', 5: 'Xe bình 3 tấn công lộ Tượng.', 13: 'Mã chuyển quân.', 23: 'Xe ăn Mã — Đỏ chiếm ưu.' },
    text: '<p>Đen đánh Pháo đầu và để lộ điểm yếu trận hình: quân Tượng lộ 3 không được bảo vệ. Đỏ điều Pháo dọa nhòm Tượng, hăm bí để chiếm ưu thế.</p>',
  },
  E29: {
    title: 'Khoét Vào Cánh Mã Và Lộ Sĩ', main: ['X9-8', 'P3-7', 'P9-3', 'X4-2', 'X8.6', 'X9-8', 'P3-4', 'P2-1', 'X8-7', 'M3/4', 'X5-4', 'X8.5', 'P4/1', 'M9/8', 'P4.8', 'M8.7', 'P4/2', 'B7.1', 'X7-3', 'P1-6', 'X4.2', 'M7/6', 'P5.6', 'Tg5.1', 'X3.2', 'Tg5/1', 'X3-4'],
    captions: { 1: 'Xe ra.', 15: 'Pháo ăn Sĩ — khoét vào lộ Sĩ.', 23: 'Pháo ăn Sĩ còn lại.', 27: 'Xe bình 4 — cung Tướng Đen tan nát.' },
    text: '<p>Đỏ tấn công bằng song Xe song Pháo, khoét vào điểm yếu ở cánh Mã và lộ Sĩ 6 của Đen.</p>',
  },
  // phối hợp, liên hệ hữu cơ, vị trí, tập trung
  E30: {
    title: 'Khai Thác Pháo Nhập Cung, Tính Được Mất', main: ['X2-4', 'X4-7', 'Tg5-4', 'X7.2', 'Tg4.1', 'P5-6', 'X4.2', 'S4.5', 'P9-5'],
    captions: { 1: 'Xe bình 4 nhắm lộ Sĩ bị tắc.', 2: 'Xe Đen ăn Mã.', 3: 'Tướng ra mặt hỗ trợ.', 9: 'Pháo về trung lộ. Tướng Đỏ bị lệch nhưng Đen chưa kịp đánh đòn Nhị Xe lệch.' },
    text: '<p>Điểm yếu của Đen ở trung lộ: Pháo nhập cung làm tắc Sĩ lộ 6. Đỏ khai thác, nhưng phải tính được mất — mang quân nào đi tấn công, có sơ hở gì không.</p><p>Kết quả mạch: Tướng Đỏ bị lệch nhưng Đen chưa kịp tung đòn Nhị Xe lệch — Đỏ đã tính đúng tốc độ.</p>',
  },
  E31: {
    title: 'Đỡ Đội Hình Song Xe Pháo Rồi Phản Công', main: ['M9/7', 'X5-6', 'P3-4', 'Xs-7', 'P9.3', 'S5.4', 'X7.3', 'Tg5.1', 'X7/1', 'Tg5/1', 'P4-5', 'T5.3', 'M7.6', 'P5.4', 'P5/5'],
    captions: { 1: 'Mã lui về phòng thủ trước các đòn Thiết môn thuyên, Đại đao xuyên tâm của Đen.', 5: 'Pháo xuống đáy: bắt đầu phản công bằng Xe song Pháo.', 7: 'Xe chiếu.', 15: 'Pháo ăn Pháo chiếu.' },
    text: '<p>Đen có đội hình song Xe Pháo với các đòn Thiết môn thuyên, Đại đao xuyên tâm. Đỏ phối hợp quân để đỡ trước, sau đó mới phản công bằng đội hình Xe song Pháo.</p>',
  },
  E33: {
    title: 'Thí Trước Đoạt Sau, Khai Thác Hai Mã Và Tượng Lệch', main: ['P7-8', 'X8.1', 'X7.3', 'X8-2', 'P8-7', 'X2.2', 'M7/5', 'M3/5', 'M5.3', 'P4/2', 'X7-3', 'P8/2', 'M3.1', 'P8.1', 'P7.3', 'T3.5', 'X3/1', 'T5/7', 'P7.2', 'M5/3', 'X3.3'],
    captions: { 1: 'Pháo dạt sang lộ 8.', 3: 'Xe ăn Tượng.', 11: 'Xe ăn Tốt.', 21: 'Xe ăn Mã — đoạt lại quân.' },
    text: '<p>Đỏ dùng chiến thuật thí trước đoạt sau, phối hợp bộ Xe song Pháo Mã khai thác nhược điểm ở hai quân Mã Đen và Tượng lệch.</p>',
  },
  E34: { title: 'Tam Tử Đồng Biên — Ba Quân Cùng Một Cánh', text: '<p>Nhược điểm của Đen nằm ở bộ ba Xe Pháo Mã cánh phải. Đỏ phối hợp song Xe, Pháo, Mã ở cánh trái để khai thác: Xe Pháo Mã phía sau hỗ trợ cho Xe lộ 8 tấn công.</p><p>Sau khi đổi Xe lộ 8, Đỏ điều tiếp Xe lộ 4 sang phối hợp với Pháo Mã — ba quân cùng đánh một cánh ("tam tử đồng biên") cực mạnh.</p>' },
  E36: { title: 'Mỗi Quân Một Vai Trò', text: '<p>Đọc vai trò từng quân Đỏ:</p><ul><li><strong>Xe lộ 7</strong> nhòm thẳng Pháo Đen, có đường cắm đáy đánh đòn Song Xe nhĩ cùng Xe lộ 6 đang canh lộ Tướng.</li><li><strong>Mã lộ 2</strong> sẽ phát triển theo hướng ngọa tào, gây áp lực rất lớn.</li><li><strong>Pháo lộ 8</strong> phía sau sẽ hỗ trợ đóng Pháo ở trung lộ.</li><li><strong>Tốt lộ 3</strong> sẵn sàng hy sinh ở lộ 4 để tranh tiên.</li></ul><p>Đó là liên hệ hữu cơ: không quân nào đứng không, quân này mở đường cho quân kia.</p>' },
  E37: {
    title: 'Đánh Ba Đổi Một Nhờ Ưu Thế Đầu Tốt', main: ['M3.4', 'X6.4', 'B7.1', 'X4.1', 'P8-4', 'X4-6', 'B7.1', 'M3/1', 'X1-4', 'X6.4', 'Tg5-4'],
    captions: { 1: 'Mã nhảy vào — mở đầu cuộc đổi quân.', 5: 'Pháo ăn Xe.', 7: 'Tốt qua sông ăn Tốt.', 11: 'Tướng ăn Xe: Đỏ đánh ba đổi một nhưng hơn hẳn về vị trí Tốt.' },
    text: '<p>Đỏ chấp nhận đánh ba quân đổi một nhờ đã tính được ưu thế về vị trí các đầu Tốt. Thêm vào đó, Mã lộ 3 của Đen khá yếu, sau này không có đường phát triển.</p>',
  },
  E39: {
    title: 'Dồn Song Xe Song Pháo Và Mã Đánh Tượng 5', main: ['P8.3', 'P8-7', 'M6.7', 'M7/6', 'M3.4'],
    captions: { 1: 'Pháo tiến 3 — bắt đầu dồn quân.', 3: 'Mã ăn Tốt áp sát.', 5: 'Mã tiến: song Xe, song Pháo, Mã cùng đánh vào điểm yếu Tượng giữa.' },
    text: '<p>Đỏ tập trung song Xe, song Pháo và Mã lộ 6 tấn công điểm yếu Tượng giữa, cùng cánh phải Đen đang ít quân.</p>',
  },
  E40: {
    title: 'Tập Trung Song Pháo, Xe, Mã Đánh Cánh Phải', main: ['P5/1', 'P5-4', 'T3.5', 'P4.5', 'P7/1', 'X3-4', 'X2.9', 'M7/8', 'M3/2', 'M3/5', 'X8.4', 'T7.5', 'X8-7', 'M5.7', 'B5.1', 'X4.1', 'B5.1', 'X4-6', 'B5.1', 'X6.2'],
    captions: { 1: 'Pháo lui giữ, chuẩn bị chuyển quân.', 7: 'Xe ăn Xe.', 13: 'Xe ăn Tốt — vào cánh phải.', 15: 'Tốt giữa tiến lên.', 19: 'Tốt ăn Tốt — Đỏ ưu thế.' },
    text: '<p>Đỏ tập trung song Pháo, Xe và Mã để tấn công cánh phải của Đen, rồi đẩy Tốt giữa tiến lên. Mạch cho thấy cách dồn quân từng bước, không vội.</p>',
  },
  // cục diện
  E42: {
    title: 'Thế Điển Hình: Tả Mã Bàn Hà Và 7 Phương Án Của Đỏ', main: [],
    vars: [
      { moves: ['X2/2'], captions: { 1: 'Phương án 1 — Xe lui 2: dùng từ những năm 1950; về sau Đen có cách thoái Pháo chuyển cánh phản kích mạnh.' } },
      { moves: ['P8.2'], captions: { 1: 'Phương án 2 — Pháo tiến 2: lưu hành thập niên 1950, dẫn tới đối công kịch liệt.' } },
      { moves: ['X2-3'], captions: { 1: 'Phương án 3 — Xe bình 3: xuất hiện giữa thập niên 1950 trong một ván thắng nổi tiếng, được đưa vào sách.' } },
      { moves: ['B5.1'], captions: { 1: 'Phương án 4 — Tốt giữa tiến: xuất hiện cuối thập niên 1950, phát triển mạnh những năm 1960–70, đến nay vẫn dùng.' } },
      { moves: ['P8.1'], captions: { 1: 'Phương án 5 — Pháo tiến 1: thịnh hành nhất thập niên 1960.' } },
      { moves: ['P8-9'], captions: { 1: 'Phương án 6 — Pháo bình 9: triển khai cánh trái là chính, không bận tâm Mã bàn hà của Đen; vẫn thịnh hành.' } },
      { moves: ['X9.1'], captions: { 1: 'Phương án 7 — Xe 9 tiến 1: dùng từ thập niên 1950 tới 1980, sau được cải biến và dùng tiếp.' } },
    ],
    text: '<p>Đây là thế <strong>Tả mã bàn hà</strong> — Mã trái của Đen vượt sông — một thế điển hình đã được nghiên cứu qua nhiều thập kỷ. Đỏ có tới bảy phương án chính, mỗi phương án gắn với một thời kỳ.</p><p>Mỗi nhánh trên bàn cờ là một phương án (chọn nhánh trong danh sách nước để xem). Ý nghĩa của "thế điển hình": nước đi và đòn đánh đã được nghiên cứu sẵn — việc của người chơi là học, kế thừa và cập nhật biến mới.</p>',
  },
  E43: { title: 'Thế Động: Hai Bên Xô Xát Đánh Vào Điểm Yếu Của Nhau', text: '<p>Hai bên đang xô xát, mỗi bên tấn công điểm yếu của bên kia:</p><ul><li>Đỏ tập trung song Xe, song Pháo, Mã tấn công hai Mã Đen ở trung lộ.</li><li>Đen có hai Tốt qua sông gây áp lực lên Mã lộ 3 của Đỏ.</li></ul><p>Đánh giá tổng quan: sức tấn công của Đỏ mạnh hơn. Trong thế động, câu hỏi quan trọng nhất là <strong>tốc độ</strong>: đòn của ai tới trước.</p>' },
  E44: { title: 'Thế Động: Cấp Tiến Trung Binh, Tấn Công Bão Táp', text: '<p>Một cục diện điển hình dạng động: hai bên tấn công như bão táp. Đỏ đi Cấp tiến trung binh đánh vào trung lộ; Đen ăn miếng trả miếng, đánh vào cánh phải Đỏ.</p><p>Thắng thua rất khó lường; trong thi đấu thực tế tỷ lệ Đỏ thua ở thế này cao hơn. Thế động đòi hỏi tính chính xác từng nhịp — sai một nước là mất cả ván.</p>' },
  E45: {
    title: 'Thế Tĩnh: Chậm Mà Chắc, Hơn Tốt Hơn Sĩ', main: ['X3-4', 'S6.5', 'X9.1', 'X2.4', 'X9-6', 'X9-8', 'M5.7', 'X2-3', 'X6.5', 'X8.5'],
    captions: { 1: 'Xe chiếm lộ 4 — không vội tấn công.', 3: 'Xe biên ra.', 7: 'Mã chiếm vị trí tốt.', 9: 'Xe tiến chiếm điểm trọng yếu. Đỏ tiếp tục dồn ép chậm rãi, dần hơn Tốt, hơn Sĩ — thắng tàn trong tầm tay.' },
    text: '<p>Cục diện tĩnh: không ai tấn công ào ạt. Đỏ chậm rãi, chắc chắn khuếch trương ưu thế: tính Tốt, tính tàn, chiếm vị trí trọng yếu, kìm hãm quân Đen.</p><p>Mạch trên là phần đầu của kế hoạch; tiếp tục như vậy Đỏ dần hơn Tốt, hơn Sĩ, chuyển sang tàn cờ thắng.</p>',
  },
  // 5 hướng tư duy
  E47: {
    title: 'Hướng 2: Dọa Sát, Dọa Bắt — Đổi Xe Rồi Bắt Quân', main: ['X5-6', 'B3.1', 'X8.3', 'X4/2', 'X8.6', 'M3/2', 'M4/6'], src: 'engine', engineFrom: 2,
    captions: { 1: 'Xe bình 6: vừa dọa sát vừa dọa bắt.', 3: 'Xe ăn Pháo.', 5: 'Xe ăn Xe chiếu — ép đổi Xe.', 7: 'Mã ăn Xe: Đỏ hơn quân.' },
    text: '<p>Đỏ nhìn thấy hình dọa sát kết hợp bắt quân. Nước Xe bình 6 vừa dọa sát vừa dọa bắt, ép Đen đổi Xe; sau đó Mã Đỏ có nước bắt quân.</p>',
  },
  E48: {
    title: 'Hướng 3: Trung Lộ Không Người Bảo Vệ', main: ['M3.1', 'T7.9', 'X3-4', 'P2/3', 'P5.5', 'X2.1', 'P5-2', 'T9/7', 'P2.2'],
    captions: { 1: 'Mã nhảy ra biên — chuẩn bị chuyển hướng.', 3: 'Xe bình 4 khóa lộ Sĩ.', 5: 'Pháo ăn Tượng giữa — trung lộ Đen không còn quân bảo vệ.', 9: 'Pháo tiến: thế công cực mạnh.' },
    text: '<p>Trung lộ Đen không có quân bảo vệ. Đỏ chớp thời cơ đánh thẳng vào trung lộ, tạo thế công cực mạnh.</p>',
  },
  E49: {
    title: 'Hướng 4: Phế Pháo Phá Pháo Gánh', main: ['P1-2', 'P8.6', 'X6.3', 'P3.1', 'X6-7', 'P3-6', 'X7.1', 'S5/6', 'X7/1', 'S4.5', 'M7.8'],
    captions: { 1: 'Pháo bình 2 — phế Pháo.', 2: 'Pháo Đen ăn Pháo.', 5: 'Xe bình 7 vào cánh phải Đen.', 7: 'Xe ăn Tượng.', 11: 'Mã tiến tham chiến — hàng phòng thủ Pháo gánh đã vỡ.' },
    text: '<p>Một nước phế Pháo tinh tế phá vỡ hàng phòng thủ Pháo gánh của Đen, mở đường tấn công vào cánh phải.</p>',
  },
};

// Bàn minh họa (dùng trong bài lý thuyết, không có mạch nước — hoặc lấy mạch chiếu hết đã chứng minh, xem gen.mjs).
const BOARD = {
  E1: 'Bàn minh họa phương pháp 8 bước: Đỏ đi, Đen đang dọa Xe ăn Tượng chiếu.',
  E9: 'Xe Đỏ ghim Pháo và Xe Đen trên lộ 2.', E12: 'Thế cờ minh họa chiến thuật ngăn cản.', E15: 'Thế cờ minh họa chiến thuật phế quân.',
  E18: 'Thế cờ minh họa phân tích nhược điểm.', E21: 'Thế cờ minh họa khai thác điểm yếu.', E24: 'Thế cờ minh họa nhược điểm hình trận.',
  E27: 'Sĩ Đen chưa liên kết, Xe Đỏ nhòm — Đỏ đi trước chiếu hết.', E30: 'Pháo Đen nhập cung làm tắc Sĩ.', E32: 'Thế cờ minh họa liên hệ hữu cơ.',
  E35: 'Thế cờ minh họa vị trí ưu việt của quân.', E38: 'Thế cờ minh họa tập trung binh lực.', E41: 'Thế điển hình từ Pháo đầu đối Bình phong Mã.',
  E46: 'Thế trung cuộc ẩn sát liên hoàn — Đỏ đi trước chiếu hết.', E2: 'Mã Đen bị đuổi.',
};

module.exports = { CH, EX, BOARD };
