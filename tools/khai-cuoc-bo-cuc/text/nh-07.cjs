// Nghi Hình — Chương 7: Loại hình Phi Tượng cuộc. Nước đi chép từ sách; lời giảng viết lại bằng lời riêng.
// Lưu ý: ở chương này Đỏ đi Phi Tượng trước — bên mắc nghi hình có thể là Đỏ hoặc Đen.
module.exports = {
  ch: 7, ten: 'Loại Hình Phi Tượng Cuộc', level: 'trung-cap',
  y: 'Phi Tượng cuộc ổn chắc, giàu tính phòng thủ phản kích. Nghi hình thường gặp: Mã xuyên cung/Quải Giác Mã định vị quá sớm, hoàn Trung Pháo sai hướng, Mã biên tự rời trung tâm — bên kia khéo dùng Pháo tuần hà, phong tỏa và thiểm kích để trừng phạt.',
  cuoc: [
    {
      n: 69, t: 'Lớp Lớp Nối Tiếp',
      s: 'Phi Tượng đối Trung Pháo: Đỏ nhảy Quải Giác Mã rồi Mã xuyên cung — định vị quá sớm, mục tiêu không rõ, Chốt giữa thất thủ. Đen Pháo nổ Chốt giữa, bình Pháo đè Mã, thăng Pháo tuần hà: Đỏ nhấc Pháo cố thủ thì bị trói trên cao; Đỏ thăng Xe tróc Pháo thì Đen "biên đả nhị quái", song Xe lớp lớp nối tiếp — Đen thắng thế.',
      c: `<p>Đỏ <strong>nhảy Quải Giác Mã</strong> (còn gọi Triền Giác Mã, Xuyên Cung Mã) — kiểu cũ, định vị quá sớm, mục tiêu lộ ra (ổn chắc nhất: Mã 2 tiến 3 hoặc Mã 8 tiến 7). Rồi <strong>Mã xuyên cung</strong> — mục tiêu không rõ, Chốt giữa thất thủ (nên nhanh xuất chủ lực cánh trái).</p>
<p>Đen <strong>Pháo nổ Chốt giữa</strong> giành thực lợi trước, rồi <strong>bình Pháo đè Mã</strong> khống chế — chiến thuật điển hình công kích Xuyên Cung Mã. Đen <strong>thăng Pháo tuần hà</strong> — tiềm tàng sức công phong phú. Đỏ có 2 cách:</p>
<ul>
<li><strong>Nhấc Pháo tuần hà</strong> (mạch chính): quyết cố thủ — cảm giác "bị trói chết trên cao". Đen hoàn Pháo, nhấc hoành Xe sang cánh phải trống trải; bổ Sĩ chính xác — Đen xuất kích toàn tuyến, hứa hẹn thắng.</li>
<li><strong>Thăng Xe tróc Pháo</strong>: Đen phát huy "duyên hà thập bát đả" — bình Pháo ra biên đánh Xe, lắp lại Trung Pháo; Xe trước nằm xuống, Xe sau tiến lên — Đỏ ở thế thủ, Đen thắng thế.</li>
</ul>
<h2>Bài học</h2>
<p>So với Mã chính và Mã biên, Quải Giác Mã là hình cờ đặc thù — chỉ dùng trong cục diện đặc biệt mới có đất dụng võ.</p>`,
      m: 'V3.5 P8-5 M2.4 M8.7 M4.6 X9-8 P2-3 P5.4 S4.5 P5-4 X1-4 P2.2 P8.2 P2-5 P8-5 X1.1 M8.7 X8.7 P3.4 X1-8 P3.3 S6.5 X9-8 V3.5 P5/1 Xt.2 X8.9 M7.6',
      k: {
        3: 'Quải Giác Mã — kiểu cũ, định vị quá sớm (ổn chắc: Mã 2 tiến 3).',
        5: 'Mã xuyên cung — mục tiêu không rõ (nên Mã 8 tiến 7 hoặc tiến 9).',
        8: 'Pháo nổ Chốt giữa giành thực lợi trước…',
        10: '…rồi bình Pháo đè Mã — chiến thuật điển hình công kích Xuyên Cung Mã.',
        12: 'Thăng Pháo tuần hà — chặt chẽ có lực! Đỏ: Pháo tiến 2 hay Xe tiến 3?',
        13: 'Nhấc Pháo tuần hà — quyết cố thủ.',
        16: 'Nhấc hoành Xe sang cánh phải trống trải — rất có uy lực.',
        18: 'Hay!',
        19: 'Bắt buộc.',
        22: 'Bổ cờ một nước — chính xác (tuyệt không Xe 8 bình 5).',
        25: 'Tránh nước ác Xe bình 5 — bất đắc dĩ.',
        28: 'Đen xuất kích toàn tuyến — hứa hẹn thắng cuộc.',
      },
      h: { 12: 'p193_0' },
      v: [
        { from: 'main', after: 2, m: 'M2.3', k: { 1: 'Ổn chắc nhất.' } },
        { from: 'main', after: 4, m: 'M8.7', k: { 1: 'Nhanh xuất chủ lực cánh trái.' } },
        { from: 'main', after: 10, m: 'P8.1 P4-2 M6.8 B5.1 B7.1 V3.5 Ms.7 X8.6', k: { 1: 'Nếu đổi Pháo…', 8: '…Mã Đỏ khó điều chỉnh, Đen dễ chơi.' } },
        { from: 'main', after: 18, m: 'P3/2 P4-9', k: { 2: 'Đen ưu.' } },
        { from: 'main', after: 12, m: 'X4.3 P2-1 P8-9 P1-5 M8.7 X8.9 X4/3 X8-6 Tg5-4 X1.1 X9-8 X1-6 P3-4 X6-8', k: { 1: 'Thăng Xe tróc Pháo.', 2: '"Duyên hà thập bát đả" — bình Pháo ra biên đánh Xe!', 3: 'Bắt buộc.', 4: 'Lắp lại Trung Pháo — qua cửa đặc sắc.', 10: 'Xe trước nằm xuống, Xe sau tiến lên — nhắm cánh phải trống rỗng.', 14: 'Đỏ ở thế thủ — Đen thắng thế.' } },
        { from: 4, after: 14, m: 'M8.9 P4-1', k: { 2: '"Biên đả nhị quái" — Đỏ mất Xe.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 70, t: 'Phương Hướng Sai Lầm',
      s: 'Phi Tượng đối Trung Pháo: Đen lắp hữu Trung Pháo theo thói quen — sai hướng (nên Pháo 8 bình 5). Đỏ bố trận Bình Phong Mã đường đường chính chính, phát huy hiệu suất nước tiên: dù Đen Xe quá hà, thúc Chốt 3 hay Mã biên, Đỏ đều xây hệ thống phòng ngự giàu sức bật rồi chiếm ưu.',
      c: `<p>Đỏ mở bằng <strong>Phi Tượng</strong> (V3.5 — "chính Tượng"). Đen <strong>lắp hữu Trung Pháo</strong> — theo thói quen nhưng không hợp thời (cũng là lắp Trung Pháo phản kích nhưng nên Pháo 8 bình 5). Đỏ bố trận <strong>Bình Phong Mã</strong> đường đường chính chính, phát huy hiệu suất nước tiên. Đen có 3 cách:</p>
<ul>
<li><strong>Xe quá hà gấp</strong> (mạch chính): Đỏ thúc Chốt 3 ngầm bảo vệ Mã; <strong>nhấc Pháo lên tuyến Chốt</strong> — trong thủ tàng công; đuổi địch ra khỏi thành rồi phi Pháo quá hà trực chỉ Mã Đen.</li>
<li><strong>Thúc Chốt 3</strong>: Đỏ tiến Pháo phong Xe mở rộng ưu thế không gian; xuất trực Xe không sợ Chốt 7 — hình trận giàu sức bật.</li>
<li><strong>Mã biên</strong>: Đỏ thúc Chốt 7 — trong nhu có cương; Tả Mã bàn hà tranh tiên; bình Pháo điều chuyển — Đen bị áp chế toàn diện.</li>
</ul>
<h2>Bài học</h2>
<p>Bình Phong Mã của hậu thủ đủ sức ngang tài với Trung Pháo tiên thủ ("Pháo Mã tranh hùng"); ở đây Đỏ còn bổ thêm một nước chính Tượng — chiếm ưu là điều tự nhiên.</p>`,
      m: 'V3.5 P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 X2.6 B3.1 B5.1 P2.1 M8.7 S4.5 M7.5 X1-4 P8-7 B7.1 X2/2 P2.3',
      k: {
        1: 'Phi Tượng — "chính Tượng".',
        2: 'Lắp hữu Trung Pháo — sai hướng (nên Pháo 8 bình 5).',
        7: 'Bình Phong Mã đường đường chính chính. Đen: Xe 2 tiến 6, Chốt 3 hay Mã biên?',
        8: 'Tiến gấp Xe quá hà — uy hiếp Mã trái Đỏ.',
        9: 'Thúc Chốt 3 ngầm bảo vệ Mã — linh hoạt có lực.',
        10: 'Xông Chốt giữa — quán triệt phương châm gấp công.',
        11: 'Nhấc Pháo lên tuyến Chốt — trong thủ tàng công!',
        19: 'Thời cơ chín muồi — phi Pháo quá hà trực chỉ Mã Đen, Đen công thủ bất lợi.',
      },
      h: { 7: 'p195_0' },
      v: [
        { from: 'main', after: 1, m: 'P8-5', k: { 1: 'Lắp Trung Pháo bên này — đã được nghiệm chứng trong vô số thực chiến.' } },
        { from: 'main', after: 7, m: 'P8.4 B3.1 B3.1 M3.4', k: { 4: 'Pháo quá hà Đỏ không ổn chắc — Đen có thể phản kích.' } },
        { from: 'main', after: 7, m: 'B7.1 B7.1 X2.6 S4.5 X2-3 P2.4 B5.1 X1-4 X3.1 X4.6', k: { 1: 'Hoãn quá hà Xe…', 10: '…Đỏ phế quân cướp công, đắc tiên đoạt thế.' } },
        { from: 'main', after: 9, m: 'B3.1 S4.5 M8.9 X1-4 S6.5 X4.5', k: { 6: 'Đỏ nắm chắc tiên thủ.' } },
        { from: 'main', after: 19, m: 'B5.1 B5.1 P5.3 P2-5 M3.5 X4.6', k: { 6: 'Đỏ hoàn toàn khống chế cục diện.' } },
        { from: 'main', after: 7, m: 'B3.1 B3.1 M8.9 P8.4 P8-7 X1-2 B7.1 M3.4 B7.1 V5.3 X9.1 P2-4 X9-4 V3/5', k: { 1: 'Thúc Chốt 3.', 4: 'Tiến Pháo phong Xe — mở rộng ưu thế không gian.', 6: 'Xuất trực Xe — không sợ Chốt 7.', 14: 'Quân Đỏ hài hòa, hình trận giàu sức bật — ưu thế.' } },
        { from: 5, after: 9, m: 'P8.4 S4.5 P8-3 X1-4 P5-4 P2.2 X2.6 P8-9 X2.3 M7/8 X9.1 P9-6 X9-2 M8.9 X2.6 X4.6', k: { 16: 'Quân lực Đỏ chiếm cao điểm — rõ ràng ưu.' } },
        { from: 'main', after: 7, m: 'M8.9 B7.1 X2.6 M7.6 P8-6 S4.5 X9-8 P2-1 X8.4 X1-4 S6.5 P1.4 X8-4 P8-6 X2.3 P6.3 X2/5 X4.5', k: { 1: 'Mã biên.', 2: 'Thúc Chốt 7 — trong nhu có cương.', 4: 'Tả Mã bàn hà — nước hay tranh tiên!', 8: 'Bình Pháo điều chuyển linh hoạt.', 14: 'Hay!', 18: 'Đen bị áp chế toàn diện — rơi vào bị động.' } },
        { from: 7, after: 7, m: 'M8.7 B7.1 X2.6 M7.6', k: { 4: 'Tả Mã bàn hà tiên thủ chính quy — Đen vẫn thua thiệt.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 71, t: 'Khéo Bày Tuyệt Tác',
      s: 'Phi Tượng đối Quá Cung Pháo: Đen khởi hoành Xe phải chưa chu đáo, rồi bổ Sĩ mềm tay. Đỏ tập kích đường biên, bình Xe tróc Pháo, vươn Pháo đánh Xe bám chặt không buông, rồi phế Xe chém Pháo — tổ hợp chiến thuật lôi cuốn: Đen chém lại thì Đỏ thoái Xe linh hoạt, đắc quân; Đen né thì Đỏ ưu thế áp đảo.',
      c: `<p>Đỏ thúc Chốt 7 xuất quân cân bằng hai cánh. Đen quăng Mã phải lên biên — phương án phòng ngự an toàn. Đen <strong>khởi hoành Xe phải</strong> — chuẩn bị bình 3 xông Chốt mời đổi, nhưng không thực hiện được vì Đỏ cướp tiên (khá tốt: Pháo bình 3).</p>
<p>Đỏ <strong>tập kích đường biên</strong> — chặt chẽ; bình Xe tróc Pháo ép Đen bổ Sĩ tự tắc đường Xe — Đen <strong>bổ Sĩ mềm yếu</strong> (nên Pháo 4 bình 3). Đỏ <strong>vươn Pháo đánh Xe</strong>, Pháo qua cửa cần thiết, rồi <strong>phế Xe chém Pháo</strong> — tổ hợp chiến thuật tinh diệu bắt đầu. Đen có 2 cách:</p>
<ul>
<li><strong>Chém lại Xe</strong> (mạch chính): Đỏ <strong>thoái Xe linh hoạt</strong> — Đen bất ngờ; Đen bình Xe sai lầm, Đỏ trói buộc xảo diệu — đắc quân thắng thế.</li>
<li><strong>Bình Pháo</strong>: Đỏ bình Xe mời đổi; bình Pháo, tiến Pháo, Xe tiến 7 — ưu thế áp đảo.</li>
</ul>
<h2>Bài học</h2>
<p>Ý thức tranh tiên mãnh liệt, "tiên phát chế nhân", và chiến thuật tinh diệu xảo diệu đột phá hình trận có vẻ ổn chắc của Đen.</p>`,
      m: 'V3.5 P8-4 M2.3 M8.7 X1-2 B7.1 B7.1 X9-8 M8.7 M2.1 B9.1 X1.1 B9.1 B1.1 X9.5 V7.5 X9-6 S6.5 P2.6 P2/1 P8-9 M1.2 X6.2 X1.6 X6/5 X1-2 P2-8 M2.1 X2.9 M7/8 M3/5 M1.3 P8-6',
      k: {
        7: 'Thúc Chốt 7 — xuất quân cân bằng hai cánh.',
        10: 'Mã phải lên biên — phương án phòng ngự an toàn.',
        12: 'Khởi hoành Xe phải — không thực hiện được (khá tốt: Pháo 2 bình 3).',
        13: 'Tập kích đường biên — hiệu quả nhanh, chặt chẽ!',
        17: 'Bình Xe tróc Pháo — ép Đen bổ Sĩ tự tắc đường Xe.',
        18: 'Bổ Sĩ — mềm yếu (nên Pháo 4 bình 3).',
        19: 'Vươn Pháo đánh Xe — bám chặt không buông!',
        20: 'Bị mê hoặc bởi an toàn bề ngoài (bình tĩnh: Xe lui 1).',
        21: 'Qua cửa cần thiết — đánh loạn bố trí Đen.',
        23: 'Phế Xe chém Pháo — tổ hợp chiến thuật tinh diệu bắt đầu! Đen: Xe 1 tiến 6 hay Pháo 2 bình 8?',
        24: 'Chém lại để giải quyết vấn đề…',
        25: '…nhưng Đỏ thoái Xe linh hoạt — Đen không kịp trở tay!',
        26: 'Quyết sách sai lầm (duy nhất: Xe 1 bình 3).',
        33: 'Trói buộc xảo diệu — Đỏ đắc quân thắng thế.',
      },
      h: { 12: 'p199_0', 23: 'p199_1' },
      v: [
        { from: 'main', after: 7, m: 'P2-1', k: { 1: 'Cũng có thể bình Pháo — thế trận Tam Bộ Hổ.' } },
        { from: 'main', after: 11, m: 'P2-3 M7.8 P4.3 P2.2 P3-5', k: { 1: 'Bình Pháo 3…', 5: '…Đen có thể ứng chiến.' } },
        { from: 'main', after: 17, m: 'P4-3 M7.6', k: { 2: 'Đỏ vẫn nắm quyền chủ động.' } },
        { from: 'main', after: 19, m: 'X1/1', k: { 1: 'Bình tĩnh — dù không vui vẻ gì.' } },
        { from: 'main', after: 20, m: 'X6.2 P2-8 X6-8 P8.5', k: { 4: 'Đỏ không được lợi gì.' } },
        { from: 'main', after: 22, m: 'P2/7 B3.1 P2-9 X8.9 M3/2 P2-4 X6.2 X1.6', k: { 8: 'Đen có nước khéo giải vây — Đỏ không thu lợi.' } },
        { from: 'main', after: 25, m: 'X1-3 X6-7 X8.1 X7-6 X8.8 M3/2 P2.1', k: { 1: 'Lựa chọn duy nhất…', 7: '…Đen miễn cưỡng phòng thủ.' } },
        { from: 'main', after: 23, m: 'P2-8 X6-8 X1-2 P9-8 X2.1 P8.5 S5.4 X2.7 M7/6 P8/1', k: { 1: 'Bình Pháo.', 2: 'Bình Xe mời đổi — cố gắng bình tiên.', 4: 'Hay!', 8: 'Hay!', 10: 'Đỏ ưu thế áp đảo.' } },
        { from: 'main', after: 23, m: 'X8.1 X6-8 X8.8 M3/2 M2/4 M2.4', k: { 6: 'Quân Đen bị kiềm chế — cục thế khó khăn.' } },
        { from: 7, after: 25, m: 'P8.3 B7.1 M2.3 X8/4', k: { 4: 'Đen vẫn không thoát kiềm chế.' } },
        { from: 7, after: 25, m: 'X1.3 X2.7 M7/6 M7.9 X1.2 X8/2 X8-9 X8.1', k: { 8: 'Đen vẫn bị kiềm chế.' } },
        { from: 7, after: 29, m: 'M7.6 X2.7', k: { 2: 'Đỏ ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 72, t: 'Hai Điểm Trọng Yếu',
      s: 'Phi Tượng đối Quá Cung Pháo: Đen nhảy Quải Giác Mã định vị quá sớm — hình cờ ứ đọng. Đỏ khởi hoành Xe, Xe kỵ hà khống chế cục thế, rồi thúc Chốt giữa nhảy bàn đầu Mã dù không có Trung Pháo — cấu tứ mới lạ: dù Đen xuất Xe hay thoái Pháo bố "mê hồn trận", Đỏ đều chiếm ưu.',
      c: `<p>Lý luận hiện đại: Đen <strong>tiến Chốt 7</strong> ở nước này phù hợp tinh thần cục diện (xuất Xe trước thì Đỏ dễ nắm tiên). Đen <strong>nhảy Quải Giác Mã</strong> — định vị quá sớm, hình cờ ứ đọng, viễn cảnh ảm đạm (nên Xe 9 bình 8 hoặc Xe 9 tiến 1).</p>
<p>Đỏ <strong>khởi hoành Xe</strong> — đối chọi gay gắt, nước hay khống chế cục diện. Đen có 2 cách:</p>
<ul>
<li><strong>Xuất trực Xe</strong> (mạch chính): Đỏ tiến Pháo — thứ tự tinh chuẩn (bình Xe sườn tróc Pháo là quyền lợi, đi sớm sinh rắc rối); Xe kỵ hà; <strong>xông Chốt giữa</strong>, Mã lên trung lộ — từng bước xúc tiến.</li>
<li><strong>Thoái Pháo</strong> bố "mê hồn trận": Đỏ bình Pháo mở đường Xe, <strong>Xe kỵ hà</strong> — thủ đoạn điển hình. Đen phế Chốt khốn Xe thì Đỏ hơn Chốt; Đen bình Xe đổi Pháo thì Đỏ <strong>thúc Chốt giữa nhảy bàn đầu Mã</strong> — chủ lực chiếm yếu đạo.</li>
</ul>
<h2>Bài học</h2>
<p>Hai điểm đáng học: Xe kỵ hà là thủ đoạn có lực khống chế cục thế; không có Trung Pháo mà thúc Chốt giữa nhảy bàn đầu Mã — cấu tứ độc đáo, thoát khuôn sáo cũ.</p>`,
      m: 'V3.5 P8-4 M2.3 M8.7 X1-2 B7.1 B7.1 V3.5 M8.7 M2.4 X9.1 X9-8 P2.4 X1-3 X9-6 S4.5 X6.4 B3.1 B7.1 V5.3 B5.1 V3/5 M7.5',
      k: {
        6: 'Tiến Chốt — phù hợp tinh thần cục diện.',
        10: 'Quải Giác Mã — định vị quá sớm, hình cờ ứ đọng (nên Xe 9 bình 8 hoặc Xe 9 tiến 1).',
        11: 'Khởi hoành Xe — đối chọi gay gắt, khống chế cục diện. Đen: Xe 9 bình 8 hay Pháo 2 lui 2?',
        13: 'Thứ tự tinh chuẩn.',
        17: 'Xe kỵ hà.',
        21: 'Hay!',
        23: 'Mã lên trung lộ — tiếp theo Chốt 3 tiến, Mã 5 tiến 7… từng bước xúc tiến.',
      },
      h: { 11: 'p201_0' },
      v: [
        { from: 'main', after: 5, m: 'X9-8 P2.4 B7.1 P2-3', k: { 4: 'Xuất Xe trước — Đỏ dễ nắm tình hình.' } },
        { from: 'main', after: 9, m: 'X9-8', k: { 1: 'Hợp lý hơn.' } },
        { from: 'main', after: 10, m: 'P2-1 B3.1 B7.1 X1-3', k: { 4: 'Đen phế Chốt thông Xe — hình cờ được cải thiện.' } },
        { from: 'main', after: 11, m: 'X1-3 X9-6 S4.5 X6.4', k: { 4: 'Đỏ giành quyền chủ động.' } },
        { from: 'main', after: 11, m: 'P2-3 X9-6 S4.5 M7.8 B3.1 X6.3', k: { 6: 'Đỏ giành quyền chủ động.' } },
        { from: 'main', after: 12, m: 'X9-6 S4.5 P2.4 B3.1 B7.1 P2-3', k: { 1: 'Bình Xe quá sớm…', 6: '…Đen có thể phản tiên.' } },
        { from: 'main', after: 16, m: 'B5.1 M7.6 B5.1 B5.1 P2/1', k: { 5: 'Đỏ ưu.' } },
        { from: 'main', after: 19, m: 'X3.4 X6-7 V5.3 P2-3 V3/5 X2.9 M7/8 B3.1 B7.1 V5.3', k: { 10: 'Sau đơn giản hóa, Đỏ chiếm chắc ưu thế.' } },
        { from: 'main', after: 11, m: 'P2/2 P2-1 X1.2 X9-6 S4.5 X6.4 B3.1 B7.1 P2-4 B7.1 M4.2 X6-8 M2.3 M7.8 Pt.5 S4.5 Pt-7 P8-3', k: { 1: 'Thoái Pháo — bố "mê hồn trận".', 2: 'Bình Pháo mở đường Xe — xem Đen ứng ra sao.', 3: 'Cao Xe bảo vệ Pháo.', 6: 'Xe kỵ hà — công thủ đắc lực. Đen: Chốt 3 tiến hay Xe 1 bình 2?', 7: 'Phế Chốt khốn Xe — dấy tranh chấp.', 10: 'Chính xác.', 18: 'Đỏ hơn Chốt chiếm ưu.' }, h: { 6: 'p203_0' } },
        { from: 8, after: 12, m: 'X9-6 S4.5 P2-1 M4.2', k: { 4: 'Đen có thủ đoạn dịch chuyển.' } },
        { from: 8, after: 13, m: 'M4.2 X9-8', k: { 2: 'Đỏ ưu.' } },
        { from: 8, after: 17, m: 'P2-4 X6-8', k: { 2: 'Đỏ chiếm ưu.' } },
        { from: 8, after: 20, m: 'X6.1 X1-2', k: { 2: 'Đỏ có chỗ kiêng dè.' } },
        { from: 8, after: 21, m: 'X1-2 P8.4', k: { 2: 'Phong tỏa — Đỏ giành mọi cơ hội.' } },
        { from: 8, after: 17, m: 'X1-2 P8.7 X2/2 B5.1 X2.6 M3.5 M4.2 B3.1 B7.1 M5.3 X9.1 X2.6', k: { 1: 'Bình Xe đổi Pháo — mưu đơn giản hóa.', 3: 'Tác chiến vòng vèo…', 4: '…Đỏ có nước hay ngoài dự liệu: thúc Chốt giữa!', 12: 'Chủ lực Đỏ chiếm yếu đạo — ưu thế.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 73, t: 'Hữu Mã Thoát Căn',
      s: 'Phi Tượng đối Quá Cung Pháo: Đen bổ Tượng thiếu ổn thỏa khiến Mã phải không có căn, thành điểm yếu. Đỏ tiến Xe đánh Mã, phế Chốt bỏ trước đoạt sau, bình Xe ép Mã — dù Đen tiến Xe hay Mã hồi nguyên vị, Đỏ đều nắm chắc ưu thế.',
      c: `<p>Đen <strong>nhảy chính Mã</strong> — tăng tính đối kháng nhưng bản thân Mã không có căn, dễ thành mục tiêu (Mã biên ổn chắc hơn nhưng phản kích yếu). Đen <strong>bổ Tượng</strong> — thiếu ổn thỏa, trực tiếp dẫn đến nghi hình (nên Xe 1 bình 2).</p>
<p>Đỏ <strong>tiến Xe đánh Mã</strong> — thấy sơ hở là xâm nhập; <strong>phế Chốt 7</strong> chặt chẽ — bỏ trước đoạt sau; <strong>bình Xe ép Mã</strong>. Đen có 2 cách:</p>
<ul>
<li><strong>Xe tiến 2</strong> (mạch chính): Đỏ thoái Pháo ép Mã Đen phải lui; <strong>bình Pháo mở đường Xe</strong> — thông thương toàn bộ chủ lực, kiềm chế cánh trái Đen; nhảy Mã biên — toàn quân linh hoạt, vô cùng chủ động.</li>
<li><strong>Mã hồi nguyên vị</strong> — vòng vèo. Đỏ <strong>thúc Chốt biên</strong> tinh tế — hạn chế Mã Đen và phong tỏa Xe Đen; Đỏ nắm chắc ưu thế.</li>
</ul>
<h2>Bài học</h2>
<p>Một nước tiện tay bổ Tượng khiến cục thế lập tức thua thiệt — phối trí quân lực, hài hòa hình trận đều phải cân nhắc kỹ.</p>`,
      m: 'V3.5 P2-4 X9.1 M2.3 X9-6 M8.7 B3.1 S6.5 M8.9 V7.5 X6.5 B3.1 B7.1 B3.1 X6-7 X1.2 P8-7 M3/1 X7/2 X9-6 M2.3 X6.4 P2-1 B7.1 X1-2 P8-9 M9.7 X1-2 B3.1 X6-7 M7.5 X7-5 X2.7',
      k: {
        4: 'Nhảy chính Mã — tăng đối kháng nhưng Mã không có căn.',
        10: 'Bổ Tượng — thiếu ổn thỏa, dẫn đến nghi hình (nên Xe 1 bình 2).',
        11: 'Tiến Xe đánh Mã — thấy sơ hở là xâm nhập!',
        13: 'Phế Chốt — chặt chẽ, bỏ trước đoạt sau!',
        15: 'Bình Xe ép Mã. Đen: Xe 1 tiến 2 hay Mã 3 lui 2?',
        17: 'Ép Mã Đen phải thoái — mở rộng tiên thủ.',
        23: 'Bình Pháo mở đường Xe — thông thương toàn bộ chủ lực, kiềm chế cánh trái Đen!',
        27: 'Nhảy Mã biên lên — toàn quân linh hoạt sống động.',
        33: 'Cục thế Đỏ vô cùng chủ động.',
      },
      h: { 15: 'p205_0' },
      v: [
        { from: 'main', after: 3, m: 'M2.1', k: { 1: 'Khá ổn chắc nhưng sức phản kích yếu — lợi hại ngang nhau.' } },
        { from: 'main', after: 9, m: 'X1-2 X6.5 P4-6', k: { 3: 'Thuận thế chỉnh hình.' } },
        { from: 'main', after: 12, m: 'X6-7 X1.2 B7.1 P8.1', k: { 4: 'Đỏ ngược lại thiệt thòi.' } },
        { from: 'main', after: 23, m: 'P8/2 X1-2 P8-7 M3.4', k: { 4: 'Đỏ chiếm tiên.' } },
        { from: 'main', after: 15, m: 'M3/2 X7/2 M2.1 B9.1 X9-6 M2.3 X6.4 P2-1 B7.1 X1-2 P8-9 X2.7 P9/2 B3.1 X6-7 P1.4', k: { 1: 'Mã hồi nguyên vị — rõ ràng vòng vèo.', 4: 'Tinh tế! Hạn chế Mã Đen, đồng thời phong tỏa Xe Đen.', 5: 'Xe tuần hà — kiên trì chờ biến.', 16: 'Đỏ nắm chắc ưu thế.' } },
        { from: 4, after: 21, m: 'X1.1 P8-7', k: { 2: 'Tượng đáy Đen bị kiềm chế, không dễ xử lý.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 74, t: 'Chậm Bước Đến Muộn',
      s: 'Phi Tượng đối Quá Cung Pháo: Đen bổ Tượng không hợp thời khiến Xe phải xuất chậm. Đỏ nhảy Mã hùng cứ bờ sông: Đen xuất trực Xe thì Đỏ tiến Pháo phong Xe, cấm khống hai mặt; Đen hoành Xe thì Đỏ phong tỏa thông đạo, tiến Pháo ép đổi — chủ lực Đen bị kiềm chế.',
      c: `<p>Đen <strong>bổ Tượng</strong> nhằm củng cố — không hợp thời (nên Xe 1 bình 2 kiềm chế, tăng đối kháng). Đỏ <strong>nhảy Mã hùng cứ bờ sông</strong> — chiếm cao điểm khống chế toàn cuộc. Đen có 2 cách:</p>
<ul>
<li><strong>Xuất trực Xe</strong> (mạch chính): "chậm bước đến muộn" — suy luận ngược: nếu đổi nước phi Tượng thành xuất Xe thì đã là thế đối kháng. Đỏ <strong>tiến Pháo phong Xe</strong> — phối hợp Mã bờ sông tạo thế cấm khống; Đen vươn Pháo đánh Mã mở đường Xe trái; Đỏ bình Xe vào chân Tượng, xua Chốt qua sông — thế ưu.</li>
<li><strong>Hoành Xe</strong>: Đỏ bình Pháo <strong>phong tỏa thông đạo hoành Xe</strong> — tinh tế; <strong>tiến Pháo ép đổi</strong> — tinh hoa mở rộng nước tiên; Đen thoái Pháo né, Đỏ tiến Pháo, Xe tiến tranh tiên — viễn cảnh lạc quan.</li>
</ul>
<h2>Bài học</h2>
<p>Trong chiến đấu Sĩ Tượng, dù không khói lửa, vẫn phải nhanh chóng xuất chủ lực — Xe là binh chủng hạng nặng càng phải đi đầu.</p>`,
      m: 'V3.5 P2-4 M8.7 B3.1 B3.1 M2.3 X9-8 V7.5 M2.3 M8.7 M3.4 X1-2 P8.4 S6.5 P2-4 P8.3 M4.3 X9-6 S6.5 P8.1 X1-3 P8-3 B3.1 P3-9 P8.2 X6-8 B5.1',
      k: {
        8: 'Bổ Tượng — không hợp thời (nên Xe 1 bình 2).',
        11: 'Mã hùng cứ bờ sông — chiếm cao điểm. Đen: Xe 1 bình 2 hay Xe 1 tiến 1?',
        12: 'Xuất trực Xe — chậm bước đến muộn.',
        13: 'Tiến Pháo phong Xe — phối hợp Mã bờ sông tạo thế cấm khống!',
        16: 'Vươn Pháo đánh Mã — mở đường Xe trái.',
        21: 'Bình Xe vào chân Tượng — xua Chốt qua sông trợ công.',
        27: 'Đỏ có thủ đoạn đột phá Chốt giữa — hình thế chiếm ưu.',
      },
      h: { 11: 'p207_0' },
      v: [
        { from: 'main', after: 7, m: 'X1-2 M2.3 M8.7 M3.4 X2.6', k: { 5: 'Hình thành cục diện giằng co.' } },
        { from: 'main', after: 19, m: 'P8/5 X1-2 P8-7 M3.1 X6.1 P4-3 X6-9 M1/3 X9-6 X2.7 P7.3 P3.4 M3.4 P8.1 S5/6 P3-9', k: { 16: 'Đỏ chủ động.' } },
        { from: 'main', after: 11, m: 'X1.1 P2-4 X9-8 P8.5 P4/1 P8.1 P8.3 M4.3 P8.4 S4.5 M3.4 P4.6 P8/2 X8.7 P4-3 M7/9 X8.4 X1-2', k: { 1: 'Hoành Xe — phương án đối kháng cầu biến.', 2: 'Phong tỏa thông đạo hoành Xe — tinh tế.', 3: 'Chính xác.', 4: 'Tiến Pháo ép đổi — tinh hoa mở rộng nước tiên!', 5: 'Thoái Pháo né — duy trì giằng co.', 13: 'Hay!', 15: 'Tiến Xe — nước hay tranh tiên.', 18: 'Cục thế Đỏ cực kỳ sáng sủa.' } },
        { from: 2, after: 12, m: 'P8.5 P4-2 X8.7 X1-6 M4.3 M3.4 X8-6 M4.6 M3/4 X6.4 B3.1 M7.6 X6/2 V5.7 X6-7 V7/5', k: { 16: 'Đỏ hơn Chốt hơi ưu nhưng cục diện đơn giản hóa.' } },
        { from: 2, after: 13, m: 'P8.3 M4.3 X1-6 S6.5 P8.1 P8.5 P4-2 X8.7 P8-3 X1-3 X6.3 B5.1', k: { 12: 'Quân Đen không thoải mái.' } },
        { from: 2, after: 21, m: 'P4-7 M3.1 X8.2 P4.5 M7.6 P4-7 V5/7 P8/1 X8-3 M1.3 X1-7 X1-2', k: { 1: 'Tiện tay đánh Mã…', 12: '…Đỏ đắc quân.' } },
        { from: 2, after: 25, m: 'P8-3 X8-6', k: { 2: 'Bỏ trước đoạt sau — Đỏ cũng ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 75, t: 'Xuất Quân Tự Nhiên',
      s: 'Phi Tượng đối Quá Cung Pháo: Đen xuất Xe "tự nhiên" nhưng cho Đỏ cơ hội — Đỏ bình Pháo vào lộ 7 mời đổi Xe tưởng thất tiên mà gia tăng áp lực lên đường 3. Đen nhảy Mã ra thì không hài hòa; thoái Mã thì hậu thủ, mất Chốt; tiến Pháo kiềm chế thì vẫn khó thoát khốn cảnh.',
      c: `<p>Đen thúc Chốt 3 tương ứng — hạn chế lẫn nhau, ổn chắc. Đen <strong>xuất Xe "tự nhiên"</strong> — lại cho Đỏ cơ hội mở rộng tiên (nên Tượng 7 tiến 5 củng cố rồi mới nhảy Mã).</p>
<p>Đỏ <strong>bình Pháo lộ 7</strong> — nước hay ngoài dự liệu: mời đổi Xe tưởng thất tiên nhưng gia tăng áp lực đường 3, lộ điểm yếu. Đen có 3 cách:</p>
<ul>
<li><strong>Nhảy Mã lên</strong> (mạch chính): né mũi Pháo nhưng xuất quân không hài hòa. Đỏ điều động binh lực, Xe sang cánh phải yếu; <strong>bình Pháo</strong> "nhất cử lưỡng dụng" — kiềm chế Mã Đen, nhường đường Mã đáy; thế công căng thẳng.</li>
<li><strong>Thoái Mã</strong> cầu bình an — hậu thủ; Đỏ <strong>Pháo nổ Chốt</strong> giản dị — hơn Chốt, vị tốt.</li>
<li><strong>Tiến Pháo kiềm chế</strong> — ngoan cường; Đỏ bình Xe vào chân Tượng duy trì uy hiếp; Đen bình Pháo đánh Mã thì Đỏ thúc Chốt — nguy cơ như lửa xém lông mày; Đen tránh nặng tìm nhẹ thì Đỏ nhảy Mã đổi kế hoạch — Đen hạn hữu cách ứng phó.</li>
</ul>
<h2>Bài học</h2>
<p>Trông như xuất quân tự nhiên chưa chắc đáng tin — dù cục diện bình ổn, thứ tự đi cờ vẫn phải không ngừng hoàn thiện.</p>`,
      m: 'V3.5 P2-4 B3.1 B3.1 M2.3 M2.3 M8.9 X1-2 X9-8 M8.7 P8-7 X2.9 M9/8 M3.2 B7.1 V3.5 B7.1 V5.3 X1.1 V3/5 X1-6 S6.5 P7-8 P8.2 M8.7',
      k: {
        4: 'Thúc Chốt 3 tương ứng — hạn chế lẫn nhau, ổn chắc.',
        8: 'Xuất Xe "tự nhiên" — cho Đỏ cơ hội (nên Tượng 7 tiến 5).',
        11: 'Bình Pháo lộ 7 — nước hay ngoài dự liệu: gia tăng áp lực đường 3!',
        13: 'Đen: Mã 3 tiến 2, Mã 3 lui 1 hay Pháo 4 tiến 5?',
        14: 'Né mũi Pháo — nhưng xuất quân không hài hòa.',
        19: 'Điều động đầy đủ binh lực — Xe sắp sang cánh phải yếu của Đen.',
        22: 'Phòng thủ tốt nhất trong hình thế.',
        23: 'Nhất cử lưỡng dụng: kiềm chế Mã Đen, nhường đường Mã đáy!',
        25: 'Quân Đỏ linh hoạt — thế công căng thẳng.',
      },
      h: { 13: 'p209_0' },
      v: [
        { from: 'main', after: 3, m: 'M2.3 M8.9 X1-2 X9-8 P8-5 M2.3 M8.7 X1-2 X9-8', k: { 9: 'Phương án đối kháng thỏa đáng — hai bên đối đầu.' } },
        { from: 'main', after: 7, m: 'V7.5', k: { 1: 'Củng cố hình cờ trước rồi nhảy Mã cũng chưa muộn.' } },
        { from: 'main', after: 13, m: 'M3.4 B7.1 V3.5 B7.1 V5.3 P2.3', k: { 6: 'Đánh Tượng kiêm đánh Chốt — Đen lúng túng.' } },
        { from: 'main', after: 21, m: 'P4-2 X6.4 M2.1 P7-9', k: { 4: 'Phục Pháo tiến 4 và Pháo tiến 1 — Đen có chỗ kiêng dè.' } },
        { from: 'main', after: 13, m: 'M3/1 P7.3 V7.5 P7.1 B7.1 B3.1 V5.7 B7.1 V7/5 M8.7 M7.6 M3.4', k: { 1: 'Thoái Mã cầu bình an — khó tránh hậu thủ.', 2: 'Giản dị nhất — chuyển tiên thủ thành thực lực vật chất.', 12: 'Đỏ hơn Chốt, chiếm vị khá tốt — nắm chắc ưu thế.' } },
        { from: 4, after: 15, m: 'X9.1 P7.1 X9-2 M8.7', k: { 4: 'Đỏ cũng ưu.' } },
        { from: 'main', after: 13, m: 'P4.5 X1-3 P4-7 X3.2 V7.5 B7.1 M3.4 B7.1 M4.5 X3.1 M5.3 M8.7 V5.3 B3.1', k: { 1: 'Tiến Pháo kiềm chế — khá ngoan cường.', 2: 'Hàm súc — duy trì uy hiếp. Đen: Pháo 4 bình 7 hay Pháo 8 bình 9?', 3: 'Bình Pháo đánh Mã.', 12: 'Chính xác.', 14: 'Đen diệt được Chốt qua sông nhưng nguy cơ mới cấp bách như lửa xém lông mày.' }, h: { 2: 'p211_0' } },
        { from: 6, after: 14, m: 'M3.4 P4-8 P7-2 V7.5', k: { 4: 'Đơn giản hóa — Đen đối kháng cân bằng.' } },
        { from: 6, after: 24, m: 'P2-7 P8.7 V5/3 X9-8', k: { 4: 'Đỏ thu hiệu quả ít ỏi.' } },
        { from: 6, after: 15, m: 'P8-9 M3.2 P4-8 P7-2 V7.5 X3.3 S6.5 M2.3 P9/1 X3-2 P9-7 B3.1', k: { 1: 'Bình Pháo tránh nặng tìm nhẹ…', 2: '…Đỏ chuyển kế hoạch khác!', 10: 'Hay!', 12: 'Tiếp theo Xe tiến 4 — Đen hạn hữu cách ứng phó.' } },
        { from: 9, after: 23, m: 'X9-8 M3.1 X8.2 B3.1', k: { 4: 'Đỏ ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 76, t: 'Thoái Mã Tập Kích',
      s: 'Phi Tượng đối Sĩ Giác Pháo: Đen nhảy chính Mã hơi yếu, rồi tiện tay bổ Tượng — cẩu thả. Đỏ thúc Chốt 3 mời đổi, Mã bờ sông phối hợp Xe phải, rồi thoái Mã tập kích bất ngờ: Đen tiến Xe thì Đỏ cưỡng đoạt Tượng; Đen tiến Pháo thì Đỏ Pháo trấn trung, ý đồ phản kích của Đen tiêu tan.',
      c: `<p>Dùng <strong>Sĩ Giác Pháo</strong> đối Phi Tượng — linh hoạt đa biến, thịnh hành gần đây. Đỏ thúc Chốt 7 mở đường chủ lực trái. Đen thăng Xe tuần hà công thủ vẹn toàn. Đen <strong>nhảy chính Mã</strong> — rất ổn chắc nhưng không đủ lực (có mục tiêu nhất: Chốt 7 tiến).</p>
<p>Đỏ <strong>thúc Chốt 3</strong> mời đổi; Mã nhảy lên phối hợp Xe phải tạo uy hiếp. Đen <strong>bổ Tượng</strong> — trực tiếp tạo nghi hình (nên bổ Sĩ, tuy hậu thủ nhưng nghiêm trận chờ thời). Đỏ <strong>thoái Mã tập kích</strong> — bất ngờ, lợi dụng điểm yếu vừa xuất hiện. Đen có 2 cách:</p>
<ul>
<li><strong>Xe tiến 2</strong> (mạch chính): Đỏ cưỡng đoạt một Tượng, uy hiếp thật sự cánh phải Đen — ưu thế lớn.</li>
<li><strong>Tiến Pháo cầu đa biến</strong>: Đỏ Pháo tiến; <strong>Pháo trấn trung</strong>; Xe tiến — ý đồ phản kích của Đen tiêu tan, hình trận phân tán rời rạc.</li>
</ul>
<h2>Bài học</h2>
<p>Thoái Mã bất ngờ tập kích là thủ đoạn thường dùng trong cục diện tương tự — các kỳ hữu không thể sơ ý.</p>`,
      m: 'V3.5 P2-4 B7.1 M2.1 M8.7 X1-2 X9-8 X2.4 P8-9 X2-4 M2.3 M8.7 B3.1 B7.1 B3.1 X4-7 M3.4 V7.5 M4/2 X7.2 P2.5 X7-8 P2-5 V3.5 X8.7 S6.5 X8-9',
      k: {
        2: 'Sĩ Giác Pháo — linh hoạt đa biến.',
        3: 'Thúc Chốt 7 trước — mở đường chủ lực trái.',
        8: 'Thăng Xe tuần hà — công thủ vẹn toàn.',
        12: 'Nhảy chính Mã — ổn chắc nhưng không đủ lực (có mục tiêu nhất: Chốt 7 tiến).',
        13: 'Mời đổi Chốt — sau đó Mã phối hợp Xe phải tạo uy hiếp.',
        18: 'Bổ Tượng — trực tiếp tạo nghi hình (nên bổ Sĩ).',
        19: 'Thoái Mã tập kích bất ngờ! Đen: Xe 7 tiến 2 hay Pháo 8 tiến 3?',
        23: 'Hay!',
        24: 'Phi Tượng diệt Pháo — bắt buộc.',
        27: 'Đỏ đoạt Tượng, uy hiếp cánh phải Đen (có Pháo 9 bình 8) — ưu thế lớn.',
      },
      h: { 19: 'p213_0' },
      v: [
        { from: 'main', after: 11, m: 'B7.1 P2-1 M8.7 X1-2 X9-8 X2.4 P8-9 X2.5 M7/8', k: { 9: 'Đen đủ sức đối kháng cân bằng.' } },
        { from: 'main', after: 17, m: 'X7-6 X1-3', k: { 2: 'Đỏ cướp tiên thủ.' } },
        { from: 'main', after: 17, m: 'S6.5', k: { 1: 'Bổ Sĩ — tuy hậu thủ nhưng nghiêm trận chờ thời.' } },
        { from: 'main', after: 23, m: 'M1/3 X8.7', k: { 2: 'Đen cũng không thoát mất Tượng.' } },
        { from: 'main', after: 19, m: 'P8.3 P2.2 X9-8 P2.3 X7-6 P2-5 M1/3 X8.7 P4.4 P5-7 M3/1 X8.2 P4-8 X1-2', k: { 1: 'Tiến Pháo cầu đa biến.', 4: 'Hay!', 6: 'Pháo trấn trung!', 9: 'Tiến Pháo — ý đồ phản kích.', 14: 'Ý đồ phản kích tiêu tan — hình trận Đen rời rạc.' } },
        { from: 4, after: 19, m: 'P8.5 M2.3 V5.7 M7.6', k: { 4: 'Đỏ cũng ưu.' } },
        { from: 4, after: 23, m: 'X7-4 M2.4 X4-6 P2-5', k: { 4: 'Đen không thoát khốn cảnh.' } },
        { from: 4, after: 27, m: 'V3.5 X8-6 X8.6 X1-3 M7.8 M7.6', k: { 6: 'Đen khó chống đỡ.' } },
      ],
      kq: 'uu-do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
