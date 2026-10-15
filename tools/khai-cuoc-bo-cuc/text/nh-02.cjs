// Nghi Hình — Chương 2: Loại hình Trung Pháo đối Bình Phong Mã. Nước đi chép từ sách; lời giảng viết lại bằng lời riêng.
module.exports = {
  ch: 2, ten: 'Trung Pháo Đối Bình Phong Mã', level: 'trung-cap',
  y: 'Trung Pháo đối Bình Phong Mã là thế trận phổ biến nhất. Nghi hình ở đây thường là: Xe sát Chốt mạo hiểm, Pháo chui vào gọng kìm, Mã khinh suất tiến lên, thúc Chốt mời đổi thiếu suy xét — bên kia nắm được là công kích ồ ạt.',
  cuoc: [
    {
      n: 15, t: 'Pháo Đánh Song Tượng',
      s: 'Ngũ Cửu Pháo quá hà Xe đối Bình Phong Mã bình Pháo đổi Xe: Đỏ bình Xe sát Chốt — tấn công mạo hiểm mang tâm lý cầu may. Đen phi Pháo quá hà, rồi dùng một Pháo đổi song Tượng hoặc ép đổi Mã, Mã phải nhảy lên đánh hạ thành trì.',
      c: `<p>Hai bên vào bố cục thịnh hành <strong>Trung Pháo tiến Chốt 7 quá hà Xe</strong> đối <strong>Bình Phong Mã bình Pháo đổi Xe</strong>, thành thế Ngũ Cửu Pháo điển hình. Đỏ tiến Xe trái gây sức ép, Đen xông Chốt phản kích — mỗi bên công một cánh.</p>
<p>Đỏ <strong>bình Xe sát Chốt</strong> — quá cứng nhắc, tấn công mạo hiểm (nên Mã tiến 6 rồi chọn thời cơ nhảy Mã oa tâm ra). Đen <strong>phi Pháo quá hà</strong> — tranh chấp có cơ sở vững chắc. Đỏ có 2 cách:</p>
<ul>
<li><strong>Nhảy Mã</strong> (mạch chính): Đen vẫn đánh tương đồng, tiến Xe kiềm chế giản dị; ép đổi Mã rồi <strong>tiến Mã đạp Xe</strong> cướp tiên. Dù Đỏ bình Xe, tiến Xe hay xông Chốt giữa, Đen đều phế quân công sát, hồi Mã kim thương — Đỏ "khoanh tay chịu chết".</li>
<li><strong>Thúc Chốt 7</strong>: Đen Pháo đánh Chốt, rồi dùng <strong>một Pháo đổi song Tượng</strong> — thế công lớn mạnh ở cánh trái, Đỏ nguy cơ một sớm một chiều.</li>
</ul>
<h2>Bài học</h2>
<p>Thủ đoạn phản kích của Đen đặc sắc — bài học người thích dùng Bình Phong Mã phòng thủ cần học và rèn luyện.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 X2.6 P8-9 X2-3 P9/1 M8.7 S4.5 P8-9 P9-7 X3-4 M7.8 X9-8 X1-2 X8.6 B7.1 X4/1 B7.1 M3/5 V7.5 X8-7 P2.4 M7.6 P2-3 X7-6 X2.8 M6.5 X8.3 B7.1 B7-6 X6/3 M3.5 X6-7 M5.4 X4-6 M8.6 X6/1 M6.8 X6-3 V5.7 B7-6 V3.1 X7.1 P7.4 X7-3 X2/1',
      k: {
        13: 'Bố cục thịnh hành: Trung Pháo tiến Chốt 7 quá hà Xe đối Bình Phong Mã bình Pháo đổi Xe.',
        15: 'Thế trận điển hình của Ngũ Cửu Pháo.',
        22: 'Mỗi bên công một cánh.',
        27: 'Bình Xe sát Chốt — quá cứng nhắc, mạo hiểm cầu may.',
        28: 'Phi Pháo quá hà — tranh chấp có cơ sở vững chắc. Đỏ: Chốt 7 hay nhảy Mã?',
        32: 'Vẫn đánh tương đồng — có lực.',
        33: 'Thế tất phải đi.',
        34: 'Tiến Xe kiềm chế — giản dị, Đỏ công thủ bất lợi.',
        37: 'Lựa chọn bất đắc dĩ.',
        40: 'Tiến Mã đạp Xe cướp tiên — quân Đen vô cùng linh hoạt. Đỏ: bình Xe, tiến Xe hay Chốt giữa?',
        42: 'Quyết đoán phế quân công sát!',
        44: 'Mã trực tiếp dọa ngọa tào.',
        52: 'Đen thắng chắc.',
      },
      h: { 28: 'p052_0', 40: 'p053_0' },
      v: [
        { from: 'main', after: 14, m: 'M7.6 P9-7 X3-4 X8.5 P8.2 V3.5 P5-6 B3.1 B3.1 X8/1', k: { 10: 'Đen đủ sức đối kháng cân bằng.' } },
        { from: 'main', after: 22, m: 'X4-3 M8/7 X3-4 B7.1', k: { 4: 'Xe Đỏ và Mã Đen đổi thứ tự — cục thế khác biệt vi diệu.' } },
        { from: 'main', after: 26, m: 'M7.6', k: { 1: 'Nên nhảy Mã rồi chọn thời cơ đưa Mã oa tâm ra.' } },
        { from: 'main', after: 27, m: 'M3/4 X7-8 M4.3 B7.1', k: { 4: 'Đỏ ưu.' } },
        { from: 'main', after: 28, m: 'B7.1 P2-3 X7-6 X2.8 X6/3 P3.3 M5/7 P7.8 S4.5 B7.1', k: { 1: 'Thúc Chốt 7.', 3: 'Bắt buộc.', 6: 'Hay!', 8: 'Một Pháo đổi song Tượng — thế công lớn mạnh cánh trái, Đỏ nguy cơ một sớm một chiều.' } },
        { from: 4, after: 30, m: 'B7-8 P7.8 M5/3 P3.3 S6.5 P3/6', k: { 6: 'Đen đắc quân thắng chắc.' } },
        { from: 4, after: 32, m: 'B7.1 P7.2 X6/3 X2/2 M7/9 P7-3', k: { 6: 'Đen ưu thế.' } },
        { from: 'main', after: 32, m: 'B7.1 X2-4 B7.1 P7.2', k: { 4: 'Thế cờ Đỏ lập tức sụp đổ.' } },
        { from: 'main', after: 36, m: 'B7.1 B6-5 B7.1 B5.1 V7.5 X2-4 X6-7 P3-5', k: { 8: 'Đen lập tức thắng thế.' } },
        { from: 'main', after: 40, m: 'X4.3 P7.5 X7-6 M4.2 X4/5 M2.3 X6/2 X8-4', k: { 8: 'Đỏ sẽ ngồi chờ chết.' } },
        { from: 9, after: 44, m: 'M5.7 B6-5', k: { 2: 'Đỏ cũng khó ứng phó.' } },
        { from: 'main', after: 40, m: 'B5.1 M4.2 X4-6 M8/6 X6.1 M6.5 X6/2 P7.5', k: { 6: 'Hồi Mã kim thương — tuyệt diệu.', 8: 'Đỏ khoanh tay chịu chết.' } },
        { from: 11, after: 42, m: 'P9-6 P7.5 X7/1 X2-4 X4/2 M2.4 X4-6 M8.6 X7-6 X4/1 X6/1 P7-5', k: { 12: 'Pháo Đen trấn trung — nước sau Mã tiến 8!' } },
        { from: 11, after: 44, m: 'X6/1 P7.5', k: { 2: 'Đen đắc Xe thắng.' } },
      ],
      kq: 'den',
    },
    {
      n: 16, t: 'Thần Binh Thiên Giáng',
      s: 'Ngũ Cửu Pháo đối Bình Phong Mã: Đen nâng Pháo lên tuyến Chốt tưởng công thủ vẹn toàn, thực ra tự chui vào gọng kìm. Đỏ Pháo nổ Chốt biên như thần binh từ trời giáng xuống: Đen Mã đạp Pháo thì Xe chém Pháo đổi quân hơn Chốt; Đen xông Chốt thì thoái Xe tróc Mã, chìm Pháo đáy.',
      c: `<p>Đỏ bình Pháo ra biên — thế trận <strong>Ngũ Cửu Pháo</strong> thịnh hành, không sợ Đen thúc Chốt 7 phản kích, nhanh xuất chủ lực cánh trái triển khai thế gọng kìm.</p>
<p>Đen <strong>nâng Pháo lên tuyến Chốt</strong> — thoạt nhìn vừa giữ Chốt giữa, vừa thúc Chốt 3 đuổi Xe; thực ra Pháo rơi vào gọng kìm, hình trận ứ đọng, dễ bị phục kích (nên tiến Pháo 6). Đỏ <strong>Pháo nổ Chốt biên</strong> — như "thần binh thiên giáng". Đen có 2 cách:</p>
<ul>
<li><strong>Mã đạp Pháo</strong> (mạch chính): Đỏ <strong>Xe chém Pháo</strong> — diệu thủ đổi quân giành thế kinh điển; hơn Chốt chiếm ưu.</li>
<li><strong>Xông Chốt 7</strong>: Đỏ <strong>thoái Xe tróc Mã</strong> tinh chuẩn, rồi <strong>Xe phục sau Pháo, chìm Pháo đáy</strong> — cấu tứ tinh xảo; cánh phải Đen bị kiềm chế cực lớn.</li>
</ul>
<h2>Bài học</h2>
<p>Pháo tự chui vào gọng kìm, quân nằm nơi chật hẹp dễ bị công kích. Pháo nổ Chốt biên vận dụng linh hoạt — nước công kích có sức tưởng tượng.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 X2.6 M7.6 M8.7 V3.5 P8-9 X1-2 X9-8 P2.1 P9.4 M3.1 X8.6 X2.3 P5.4 V5/3 P5-8 P8-5 V7.5 X8.3 P8-2',
      k: {
        13: 'Ngũ Cửu Pháo — thịnh hành: không sợ Chốt 7 phản kích, triển khai thế gọng kìm.',
        16: 'Nâng Pháo lên tuyến Chốt — tưởng hay, thực ra chui vào gọng kìm (nên Pháo tiến 6).',
        17: 'Pháo nổ Chốt biên — thần binh từ trời giáng xuống! Đen: Mã đạp Pháo hay xông Chốt 7?',
        18: 'Mã đạp Pháo.',
        19: 'Diệu thủ đổi quân giành thế kinh điển.',
        27: 'Đỏ hơn Chốt chiếm ưu.',
      },
      h: { 17: 'p055_0' },
      v: [
        { from: 'main', after: 13, m: 'B7.1 X2/1 M6/7 X2.1 B7.1 M3/5 P8-9 X2-3 X8.2 X9-8', k: { 10: 'Đỏ khá chủ động.' } },
        { from: 'main', after: 15, m: 'P2.6', k: { 1: 'Cũng là tiến Pháo — hợp lý hơn.' } },
        { from: 'main', after: 16, m: 'B5.1 B7.1 X2/1 M6/7 X2/2 B7-6', k: { 1: 'Xông Chốt giữa…', 6: '…Đen đều có thể hài lòng.' } },
        { from: 'main', after: 21, m: 'S6.5 P5-8 M1/2 B5.1 B7.1 X2/1', k: { 6: 'Đỏ chủ động.' } },
        { from: 'main', after: 17, m: 'B7.1 X2/1 M6/7 X2-9 B7.1 P9.3 B7.1 X8.6 X2-3 X8-7 M3/5 M7.6', k: { 1: 'Xông Chốt 7.', 2: 'Thoái Xe tróc Mã — tinh chuẩn.', 4: 'Xe phục sau Pháo, chuẩn bị chìm Pháo đáy — cấu tứ tinh xảo.', 12: 'Cánh phải Đen bị kiềm chế — Đỏ ưu thế.' } },
        { from: 4, after: 18, m: 'X2-4 M6/4 B3.1 M3.1 P5.4 S4.5', k: { 1: 'Bình Xe tróc Mã — dễ gây rắc rối…', 6: '…lưỡng phân, Đen hơn quân.' } },
        { from: 4, after: 19, m: 'B7.1 X2-4 B7.1 X4-2 B7-6 P5-6 M3.1 P6.4', k: { 8: 'Đỏ lấy lại quân dễ chơi.' } },
        { from: 4, after: 21, m: 'M3.1 B3.1', k: {} },
        { from: 4, after: 23, m: 'V5/3 X9-3', k: { 2: 'Đỏ ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 17, t: 'Thời Buổi Rối Ren',
      s: 'Ngũ Bát Pháo đối Bình Phong Mã: Đen khinh suất nhảy Mã phải lên — cách đi chênh vênh mà người mới dễ mắc. Đỏ tiến Xe tróc Mã thuận thế công kích, ép Mã Đen cô quân thâm nhập rồi ép đổi; "bảo Mã lương câu" đành hy sinh — Đỏ hơn ba nước xuất quân.',
      c: `<p>Đỏ phi Pháo quá hà theo cách <strong>Ngũ Bát Pháo</strong>, thừa cơ đè Mã hoặc đánh Chốt. Đen <strong>khinh suất nhảy Mã phải lên</strong> — chênh vênh, sai lầm người mới dễ mắc (chính xác: phi Tượng củng cố). Đỏ có 2 cách:</p>
<ul>
<li><strong>Tiến Xe tróc Mã</strong> (mạch chính): tăng áp lực lên Mã Đen có kế hoạch — đáp trả tốt nhất. Đỏ bình Xe; Đen nhảy Mã tìm cơ hội: tiến Mã thì Đỏ cảnh giác cao Xe biên, lấy lại quân chiếm tiên lớn; thoái Mã thì Đỏ thoái Xe quan trọng, dùng Pháo đổi Mã — Đỏ hơn ít nhất ba nước xuất quân, ưu thế tuyệt đối.</li>
<li><strong>Pháo đánh Chốt</strong>: máy móc, cơ hội mở rộng tiên tuột khỏi tay; Đen phế Chốt tranh tiên, bình Pháo đánh Tượng rút Xe — hai bên ngang thế.</li>
</ul>
<h2>Bài học</h2>
<p>Mã khinh suất tiến lên tạo hình trận không ổn chắc — nguyên nhân chủ yếu thất tiên. Đỏ thuận thế công kích, đổi quân tranh tiên vừa là mưu tính chiến lược vừa là tổ hợp chiến thuật tinh xảo.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B3.1 B3.1 P8.4 M3.4 X2.5 M4.3 X2-7 M3.2 X7/4 P8.4 P8-3 M2/3 M8.9 P2-3 X7-2 M3.5 V3.5 V7.5 X9-8 B1.1 X8.5',
      k: {
        9: 'Phi Pháo quá hà — cách Ngũ Bát Pháo, thừa cơ đè Mã hoặc đánh Chốt.',
        10: 'Mã phải khinh suất tiến lên — chênh vênh (chính xác: Tượng 7 tiến 5).',
        11: 'Tăng áp lực lên Mã Đen có kế hoạch — đáp trả tốt nhất.',
        13: 'Đen: tiến Mã hay thoái Mã?',
        15: 'Nước quan trọng.',
        22: 'Niềm kiêu hãnh duy nhất: dùng Mã đổi Pháo Đỏ.',
        27: 'Đỏ hơn ít nhất 3 nước xuất quân — ưu thế tuyệt đối.',
      },
      h: { 10: '!p057_0', 13: 'p058_0' },
      v: [
        { from: 'main', after: 9, m: 'V7.5', k: { 1: 'Củng cố — Đen có cơ hội đối kháng.' } },
        { from: 'main', after: 10, m: 'P8-3 V7.5 M8.7 P8.4 X9-8 P2-3 X8.4 B3.1 X8-7 P8-3 V7.9 X8.9 M3/2 X1-2 M2.3 X2.8 P5-4 B1.1 S6.5 X2/3 V3.5 X2-3 V9.7 S6.5', k: { 1: 'Máy móc — cơ hội mở rộng tiên tuột khỏi tay.', 3: 'Nhảy chính Mã trái — tăng sức trung tâm.', 6: 'Phế Chốt tranh tiên.', 10: 'Hay!', 12: 'Bình Pháo đánh Tượng rút Xe — cướp tiên đổi Xe.', 16: 'Xe điểm huyệt hoành 2 — ném đá hỏi đường.', 17: 'Ổn chắc.', 24: 'Hai bên cơ bản ngang thế.' } },
        { from: 1, after: 12, m: 'M8.9 P2.5 X9-8 X1-2', k: { 4: 'Đen có thể phản tiên.' } },
        { from: 1, after: 26, m: 'B5.1 X2-3 B5.1 Ps-2 B5-6 P2.7 S6.5 P3-2', k: { 1: 'Tùy tiện tấn công…', 8: '…phục Pháo trước bình 1 — Đỏ sụp đổ.' } },
        { from: 'main', after: 13, m: 'M3.4 X9.1 M4.2 P8-3 V7.5 X7.2 P2.5 M3.4', k: { 1: 'Tạo cơ hội chiến thuật — Mã đã đi 3 nước.', 2: 'Cảnh giác có lực — nước hay được mưu tính trước!', 6: 'Chặt chẽ.', 8: 'Tiếp theo Xe bình 8 lấy lại quân — Đỏ chiếm tiên lớn.' } },
        { from: 4, after: 15, m: 'M4/6 X9-4 M6/7 M8.7', k: { 4: 'Đỏ hiệu suất xuất quân ưu.' } },
        { from: 4, after: 18, m: 'X7-8 M2/3 X9-7 M3/4', k: { 4: 'Đen có cơ hội đối kháng cân bằng.' } },
        { from: 'main', after: 14, m: 'S6.5 V3.5 X7.2 X1-3', k: { 4: 'Đen phản đoạt chủ động.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 18, t: 'Tranh Đoạt Ven Sông',
      s: 'Ngũ Bát Pháo đối Bình Phong Mã: Đen thúc Chốt mời đổi, chỉ mải linh hoạt Mã mình mà quên năng lực công kích tiềm tàng của Đỏ. Đỏ nhấc Xe tuần hà án binh bất động, dẫn đường khuếch trương thế lực — Đen khử Chốt hay bổ Sĩ đều thua trên dải ven sông.',
      c: `<p>Đỏ phi Pháo quá hà, Đen bổ Tượng trái ổn chắc. Đỏ <strong>bình Pháo đè Mã</strong> tăng áp lực. Đen tiến Pháo, rồi <strong>thúc Chốt 7 mời đổi</strong> — đổi Chốt quá vội, cho Đỏ cơ hội xâm nhập (nên Xe tiến 3). Đỏ <strong>nhấc Xe tuần hà</strong> — "án binh bất động", giản dị mà hiệu quả. Đen có 2 cách:</p>
<ul>
<li><strong>Khử Chốt</strong> (mạch chính): tháo gỡ cục diện tìm đối công. Đỏ <strong>nhảy Mã ép đổi</strong> — nước tranh tiên đã mưu tính; Đen bình Pháo đánh Tượng gửi gắm toàn bộ hy vọng. Đỏ <strong>"ngự giá thân chinh"</strong> lên Tướng, Pháo đánh Chốt giữa cướp tiên; nhảy Mã, Pháo tiến 2 — tuyệt sát.</li>
<li><strong>Bổ Sĩ</strong>: Đỏ cứng rắn xông Chốt 7 — "tứ binh tương kiến", chiến thuật điển hình đột phá phòng tuyến bờ sông. Đỏ thăng Xe trái tuần hà, hai cánh gần như đối xứng; Đỏ bình Pháo, đoạt Tượng — ưu thế lớn.</li>
</ul>
<h2>Bài học</h2>
<p>Cuộc "tranh đoạt dọc bờ sông" — kế hoạch Đen không thực hiện được, còn cho Đỏ cơ hội xâm nhập. Đỏ đánh chắc tiến chắc, trong bình ổn mang hung hiểm.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B3.1 B3.1 P8.4 V7.5 P8-7 X1-2 M8.7 P2.2 X9-8 B7.1 X2.4 B7.1 X2-3 M7.6 B7.1 B3.1 X3-7 X8-7 M3.2 M6.7 M2.3 P2-7 X8.9 P7.5 Tg5.1 M3/2 P5.4 S4.5 M3.2 X7.1 P7.2 X7.1 P7-8 Tg5-4 X7-6 Tg4-5 Tg5-6',
      k: {
        10: 'Bổ Tượng trái — ứng phó ổn chắc.',
        11: 'Bình Pháo đè Mã — tăng áp lực.',
        16: 'Đổi Chốt quá vội — cho Đỏ cơ hội xâm nhập (nên Xe tiến 3).',
        17: 'Nhấc Xe tuần hà — án binh bất động, giản dị mà hiệu quả. Đen: khử Chốt hay bổ Sĩ?',
        18: 'Lập tức khử Chốt — tháo gỡ cục diện, tìm đối công.',
        25: 'Nhảy Mã ép đổi — nước tranh tiên đã mưu tính.',
        26: 'Tránh đổi — không cam khổ thủ.',
        28: 'Bình Pháo đánh Tượng — gửi gắm toàn bộ hy vọng.',
        31: 'Ngự giá thân chinh — hữu kinh vô hiểm!',
        33: 'Pháo đánh Chốt giữa cướp tiên làm loạn.',
        34: 'Bổ Sĩ bất đắc dĩ.',
        35: 'Hay!',
        37: 'Hay!',
        43: 'Đỏ thắng.',
      },
      h: { 17: 'p060_0' },
      v: [
        { from: 'main', after: 9, m: 'V3.5 P8-3', k: { 2: 'Tượng đáy Đen bị nhòm — Đỏ luôn có uy hiếp Chốt 3.' } },
        { from: 'main', after: 10, m: 'M8.7 M3.2 P8-3 X1.1 X2.5 M2.3 X9-8 P2-3 P5-4 X1-6 S6.5 P8-9 X2.4 M7/8 X8.4 M3/4 V7.5 P9-7', k: { 18: 'Hai bên giằng co.' } },
        { from: 'main', after: 10, m: 'M8.9 B1.1 P8-7 X1.3 X9-8 X1-3 X8.7 P8-9 X2.9 M7/8 X8/6 B3.1 X8-2 M8.6', k: { 14: 'Mỗi người một vẻ.' } },
        { from: 'main', after: 14, m: 'X2.6 B7.1 X2-3 X8-7 X9-8 B7.1 X3/2 M7.6 X3.5 V5/7 X8.4 V3.5', k: { 2: 'Lúc này Chốt 7 mới thích đáng.', 12: 'Hình trận Đen ổn chắc, đủ sức đối kháng.' } },
        { from: 'main', after: 15, m: 'X2.3 P7-3 B5.1 B3.1 V5.7 M3.4 X2-6 X2.4 P8/1', k: { 1: 'Nước có lực hơn cho Đen.', 9: 'Phục thủ đoạn thiểm kích — Đen đối kháng có sức bật.' } },
        { from: 'main', after: 16, m: 'B3.1 P2-7 X8.9 M3/2 V3.1 P8.4', k: { 1: 'Chấp nhận đổi Chốt…', 6: '…Đỏ vô vị.' } },
        { from: 'main', after: 17, m: 'P8-9 X2.5 M7/8 B3.1 P2-7 P5.4 S4.5 X8.9 P7.5 S4.5 M3/2 B5.1', k: { 12: 'Cờ tàn không Xe — Đỏ hơn Chốt, quân linh hoạt.' } },
        { from: 'main', after: 25, m: 'M6.8 X7-2 P8-6 M7.6', k: { 4: 'Đỏ chủ động.' } },
        { from: 'main', after: 27, m: 'M7.5 V7.5 S4.5', k: { 1: 'Đáng tin hơn…', 3: '…nhưng quân Đen bị kiềm chế, vẫn bị động.' } },
        { from: 'main', after: 33, m: 'S6.5 M3.5', k: { 2: 'Đỏ cũng nhanh chân đến trước.' } },
        { from: 'main', after: 35, m: 'X7.2 P7-1', k: { 2: 'Tuyệt sát vô giải.' } },
        { from: 'main', after: 35, m: 'X7.5 Tg5-6', k: { 2: 'Tuyệt sát vô giải.' } },
        { from: 'main', after: 17, m: 'S6.5 B7.1 P8.2 X8.4 B7.1 X2-3 M7.6 M3.4 B3.1 X8-7 P8.1 P5-4 P8-6 X7-4 X2.3 P7.3 V5/3 X4.1', k: { 1: 'Bổ Sĩ.', 2: 'Cứng rắn xông Chốt 7 — "tứ binh tương kiến".', 3: 'Lại thăng Pháo tử thủ bờ sông.', 4: 'Thăng Xe trái tuần hà — hai cánh gần như đối xứng.', 5: 'Phá vỡ giằng co — tình thế ép buộc.', 13: 'Hay!', 17: 'Hay!', 18: 'Tranh thủ đoạt Tượng — Đỏ ưu thế lớn.' } },
        { from: 12, after: 19, m: 'B3.1 B3.1 B3.1 B3.1 B3.1 B3.1', k: { 6: 'Đỏ đi sau đến trước — cục thế Đen sụp đổ.' } },
        { from: 12, after: 21, m: 'X8-6 B7.1 P8-3 M7.6 X6.7 X2/2 B7.1 S6.5 X6.1 X8.1 X2.4 M6.8 B7.1 X2.5', k: { 14: 'Đỏ hơn quân chiếm ưu.' } },
        { from: 12, after: 29, m: 'M6/7 V7.5', k: { 2: 'Tĩnh quan kỳ biến — Đen vẫn ở thế kém.' } },
      ],
      kq: 'do',
    },
    {
      n: 19, t: 'Rập Khuôn Máy Móc',
      s: 'Trung Pháo đối Bình Phong Mã phi hữu Tượng: Đỏ vẫn bày Ngũ Thất Pháo — cứng nhắc, thiếu mục tiêu. Đen xuất Xe phải ứng biến linh hoạt, Mã biên xuất kích kịp thời, tiến Pháo áp sát; Đỏ lấy công bù thủ bị ép đổi quân, tiến Xe phòng thủ thì bị phong tỏa từng bước.',
      c: `<p>Đen <strong>phi hữu Tượng</strong> — khá ổn chắc. Đỏ vẫn áp dụng <strong>Ngũ Thất Pháo</strong> — cứng nhắc, thiếu tính mục tiêu, vì Đen triển khai cánh phải không tốn chút sức (nên Pháo tiến 4 theo Ngũ Bát Pháo).</p>
<p>Đen nhảy Mã, <strong>xuất Xe ứng biến</strong> linh hoạt chặt chẽ; <strong>Mã biên xuất kích</strong> kịp thời (Xe Đen đã ra nên Đỏ mất thủ đoạn bình Xe tróc ngược); <strong>tiến Pháo áp sát</strong>. Đỏ có 2 cách:</p>
<ul>
<li><strong>Xe xuống hoành 2</strong> (mạch chính): lấy công bù thủ. Đen tiến Xe quyết đoán, ép đổi quân đơn giản có lực, khống chế cục thế — Đỏ ở thế thủ.</li>
<li><strong>Thăng Xe phòng thủ</strong>: Đen <strong>tiến Pháo phong tỏa</strong> — một nước hai tác dụng. Đỏ giương Sĩ mãnh công thì Đen dấy phân tranh, đối công chiếm ưu; Đỏ chuyển phòng thủ thì Đen bình Xe, khống chế cục thế.</li>
</ul>
<h2>Bài học</h2>
<p>Không quan tâm đặc điểm hình cờ đối phương mà mù quáng dùng Ngũ Thất Pháo là nguyên nhân trực tiếp tạo nghi hình.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B3.1 B3.1 M8.9 V3.5 P8-7 M3.2 X9.1 X1-2 X9-6 M2.1 P7/1 P2.6 X6.7 X2.7 X6-3 X2-1 X3/1 X1-3 X2.7 X8.2 X3-2 X3.1 P5.4 S4.5 V3.5 P2.1 S4.5 X3-4 P5-4 B1.1',
      k: {
        10: 'Phi hữu Tượng — khá ổn chắc.',
        11: 'Vẫn bày Ngũ Thất Pháo — cứng nhắc, thiếu mục tiêu (nên Pháo tiến 4).',
        14: 'Ứng biến linh hoạt, chặt chẽ.',
        16: 'Xuất kích kịp thời — Xe Đen đã ra nên Đỏ mất thủ đoạn tróc ngược.',
        18: 'Lại một nước hay — chiến thuật áp sát. Đỏ: Xe xuống hoành 2 hay thăng Xe?',
        19: 'Xe xuống hoành 2 — lấy công bù thủ.',
        20: 'Quyết đoán!',
        24: 'Đơn giản có lực — qua đổi quân, Đen càng khống chế cục thế.',
        29: 'Phòng thủ cần thiết — cánh trái Đỏ mỏng yếu.',
        36: 'Đỏ ở thế thủ, Đen cơ hội khá tốt.',
      },
      h: { 18: 'p063_0' },
      v: [
        { from: 'main', after: 10, m: 'P8.4', k: { 1: 'Ngũ Bát Pháo — phù hợp hơn.' } },
        { from: 'main', after: 13, m: 'S4.5', k: { 1: 'Thành biến hóa thường gặp — Đen bỏ lỡ cơ hội tốt.' } },
        { from: 'main', after: 19, m: 'S4.5 P5-4 P8.4 V3.5', k: { 1: 'Chậm chạp…', 4: '…cục thế bình ổn.' } },
        { from: 'main', after: 28, m: 'X2/2 X3-4 S4.5 M1.3 X2-7', k: { 5: 'Đen tổ chức tấn công nguy hiểm vào cánh trái mỏng yếu — Đỏ khó ứng phó.' } },
        { from: 'main', after: 18, m: 'X6.1 P8.4 B5.1 S4.5 S4.5 P2-1 X6.1 P8/2 S5.6 X2.5 B7.1 B3.1 B5.1 B5.1 P7-5 B3-4 X6-4 B5.1 X4.5 B4.1 P5.5 Tg5-4 X2.3 X2-4', k: { 1: 'Thăng Xe phòng thủ.', 2: 'Một nước hai tác dụng: phong tỏa Xe, kiềm chế Mã phải Đỏ.', 8: 'Đỏ: giương Sĩ hay Pháo bình 4?', 9: 'Giương Sĩ — không cam tử thủ, cưỡng ép công trung lộ.', 11: 'Dấy phân tranh tìm cơ hội.', 24: 'Trong đối công, Đen chiếm ưu.' }, h: { 8: '!p064_0' } },
        { from: 4, after: 28, m: 'P7-5 P1-4 X6-4 X2-4', k: { 4: 'Đỏ mất Sĩ.' } },
        { from: 4, after: 26, m: 'P5-4 P1.1 V3.5 B1.1 X2.4 X2.5 X6-5 B1.1 P4.2 X2.2 P4/2 X2/2', k: { 1: 'Đổi sách lược — phòng thủ vững chắc.', 5: 'Không thể Mã tiến 4 — Đen Pháo tiến 3.', 12: 'Đen khống chế cục thế chiếm ưu.' } },
        { from: 6, after: 36, m: 'P4-9 M1.3 P9/4 M3/5 M3.5 P8-9 X2.5 M7/8', k: { 8: 'Tàn cuộc 4 quân yếu (Đỏ không Xe) đối 3 quân mạnh — Đỏ khó mưu hòa.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 20, t: 'Cừu Non Lạc Đường',
      s: 'Trung Pháo đối Bình Phong Mã: Đỏ nhảy Mã lên bờ sông thiếu kế hoạch — "cừu non lạc đường". Đen vươn Pháo đánh Mã thăm dò, Mã Đỏ tiến thoái lưỡng nan: thoái Mã thì mất tiên, Pháo Đen thoái về hà công thủ lưỡng lợi; tiến Mã đạp Chốt thì cũng chỉ là cảm giác đầu tiên.',
      c: `<p>Đỏ bình Pháo lộ 7 trước — đổi thứ tự, khảo nghiệm Đen. Đen <strong>bổ Sĩ tĩnh quan kỳ biến</strong> — ổn chắc. Đỏ <strong>nhảy Mã lên bờ sông</strong> khi trung lộ Đen rất kiên cố — thất tiên (chính xác: Mã biên xuất quân đồng đều).</p>
<p>Đen <strong>vươn Pháo đánh Mã</strong> — chiến thuật áp sát có lực, Mã Đỏ tiến thoái lưỡng nan. Đỏ có 2 cách:</p>
<ul>
<li><strong>Thoái Mã</strong> (mạch chính): tiến rồi lại thoái — thiệt, nhưng trong cục diện đặc thù là lựa chọn "ép dạ cầu toàn". Pháo Đen thong dong <strong>thoái về chiếm yếu đạo ven sông</strong>, công thủ vẹn toàn — phản tiên. Đen cao Xe tuyến Chốt hàm súc, giành ưu thế có tiềm lực.</li>
<li><strong>Mã đạp Chốt 7</strong>: cảm giác đầu tiên; Pháo Đen tiến tuyến Chốt — trông tổn thất số nước, thực tế chiếm tiên cơ. Đỏ xông Chốt né thiểm kích, xuất quân chiếm tiên, chủ động.</li>
</ul>
<h2>Bài học</h2>
<p>Loại nước không phải công cũng không phải thủ thường tạo nghi hình. Tiến Pháo đánh Mã ép nó định vị, thấy khe hở là xâm nhập — thủ pháp đặc thù công kích Mã hà khẩu.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B3.1 B3.1 P8-7 S4.5 M3.4 P8.3 M4/3 P8/1 X9.1 V3.5 X9-6 M3.2 M8.9 B1.1 P7/1 X1.3 X2.4 M2.1 X6.3 B1.1',
      k: {
        9: 'Bình Pháo lộ 7 trước — đổi thứ tự, khảo nghiệm Đen.',
        10: 'Bổ Sĩ tĩnh quan kỳ biến — ổn chắc.',
        11: 'Nhảy Mã lên bờ sông — thất tiên (chính xác: Mã biên).',
        12: 'Vươn Pháo đánh Mã — áp sát có lực, Mã Đỏ tiến thoái lưỡng nan.',
        13: 'Tiến rồi lại thoái — ép dạ cầu toàn.',
        14: 'Pháo thong dong chiếm yếu đạo ven sông — công thủ vẹn toàn, phản tiên.',
        15: 'Nhanh chóng xuất Xe trái — cố gắng cân bằng.',
        22: 'Cao Xe lên tuyến Chốt — hàm súc có lực.',
        26: 'Đen giành ưu thế có tiềm lực phát triển.',
      },
      h: { 12: 'p066_0' },
      v: [
        { from: 'main', after: 9, m: 'M3.2 M3.4', k: { 2: 'Tự làm suy yếu trung lộ — Đỏ chiếm tiên.' } },
        { from: 'main', after: 10, m: 'M8.9', k: { 1: 'Chính xác — bố trí quân đồng đều.' } },
        { from: 'main', after: 14, m: 'B7.1 M3.4 P7.3 P8-3 B7.1 X8.9 M3/2 M4.5', k: { 1: 'Tùy tiện tấn công…', 8: '…Đỏ qua một Chốt không bù được thua thiệt xuất quân.' } },
        { from: 'main', after: 21, m: 'B1.1 B9.1 X1.5 X2.4', k: { 1: 'Nôn nóng đột phá…', 4: '…Đen không lợi.' } },
        { from: 'main', after: 12, m: 'M4.3 P8.1 B7.1 M3.4 B7.1 M4.5 S6.5 V3.5 B7.1 X1-4', k: { 1: 'Mã đạp Chốt — cảm giác đầu tiên.', 2: 'Trông tổn thất số nước, thực tế chiếm tiên cơ.', 3: 'Xông Chốt né thiểm kích — xu thế lớn.', 10: 'Đỏ xuất quân chiếm tiên, chủ động.' } },
        { from: 4, after: 14, m: 'M8.9 M3.4 X9-8 P2-5 M3.5 V3.5', k: { 6: 'Quân Đỏ ứ đọng, cục thế Đen giàu sức sống.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 21, t: 'Tranh Chiếm Tuyến Đỉnh Cửu Cung',
      s: 'Ngũ Thất Pháo đối Bình Phong Mã: Đỏ tùy tiện nhảy Mã lộ sơ hở. Đen Mã đạp Chốt biên công cánh bên, rồi tiến Pháo chiếm tuyến đỉnh cửu cung Đỏ — như đặt quả bom trong trận địa. Đỏ đạp Chốt thì trúng bỏ trước đoạt sau; tiến Xe tróc Pháo thì bị ép đổi — Đen ưu.',
      c: `<p>Đen <strong>thúc Chốt biên</strong> át chế Mã Đỏ, mở đường Xe phải — nước thịnh hành. Đen bổ hữu Tượng (gián tiếp làm suy yếu Ngũ Thất Pháo), cao Xe biên.</p>
<p>Đỏ <strong>tùy tiện nhảy Mã</strong> — lộ sơ hở (chính xác: Xe tiến 6 áp chế cánh trái Đen). Đen <strong>Mã đạp Chốt biên</strong>, công cánh bên; rồi <strong>tiến Pháo phong tỏa</strong> tuyến đỉnh cửu cung (hoành 3 Đỏ) — "nặng ngàn cân, như quả bom trong trận địa". Đỏ có 2 cách:</p>
<ul>
<li><strong>Mã đạp Chốt 7</strong> (mạch chính): tổ hợp chiến thuật đặc sắc — Đen bình Pháo đánh Mã, rồi mặc kệ Xe Đỏ, bình Pháo đánh Tượng: tập trung binh lực công cánh trái. Đen tất lấy lại quân, hình trận Đỏ lộn xộn.</li>
<li><strong>Tiến Xe tróc Pháo</strong>: điều chỉnh tương ứng, nhưng Đen <strong>bình Pháo ép đổi Xe</strong> đơn giản thỏa đáng — Đen hơn Tượng, hình thế khá ưu.</li>
</ul>
<h2>Bài học</h2>
<p>Pháo chiếm tuyến đỉnh cửu cung đối phương — vị trí cực tốt, kết nối từ xa, mở cơ hội cho phối hợp chiến thuật sau đó.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B3.1 B3.1 M8.9 B1.1 P8-7 M3.2 X9.1 V3.5 X9-6 X1.3 M3.4 M2.1 P7/1 P8.5 M4.3 P8-1 X2.9 P1-3 X2/1 P3.2 Tg5.1 P2.6',
      k: {
        10: 'Thúc Chốt biên át chế Mã Đỏ, mở đường Xe phải — thịnh hành.',
        14: 'Bổ hữu Tượng — gián tiếp làm suy yếu Ngũ Thất Pháo, phòng ngự ôn nhu.',
        17: 'Tùy tiện nhảy Mã — lộ sơ hở (chính xác: Xe tiến 6).',
        18: 'Mã đạp Chốt biên — công kích cánh bên, có lực!',
        20: 'Tiến Pháo chiếm tuyến đỉnh cửu cung — như quả bom trong trận địa Đỏ. Đỏ: Mã đạp Chốt hay tiến Xe?',
        22: 'Bình Pháo đánh Mã trước…',
        24: '…rồi mặc kệ Xe, bình Pháo đánh Tượng — tổ hợp chiến thuật đặc sắc!',
        28: 'Đen tất lấy lại quân — hình trận Đỏ vô cùng lộn xộn.',
      },
      h: { 20: 'p069_0' },
      v: [
        { from: 'main', after: 13, m: 'B1.1 B9.1 X1.5 X2.4 V7.5 X9-4 S6.5 X4.5 M2.1 P7/1 P2.5', k: { 11: 'Cục diện giằng co phức tạp.' } },
        { from: 'main', after: 13, m: 'V7.5 M3.4 B1.1 B9.1 X1.5 X9-4 S6.5 M4.6 P8.1', k: { 9: 'Đen đối kháng cân bằng.' } },
        { from: 'main', after: 16, m: 'X2.6', k: { 1: 'Áp chế chủ lực cánh trái Đen — chính xác.' } },
        { from: 'main', after: 18, m: 'X6-8 M1.3 X8.6 M3/5 M9.8 X1-4', k: { 6: 'Đen hơn Chốt chiếm ưu.' } },
        { from: 'main', after: 20, m: 'X6.6 X1-2 P7-3 S6.5 X6-7 P8-7 X2.9 P7.2 S4.5 M7/8 M4.5 P2/2', k: { 1: 'Tiến Xe tróc Pháo.', 3: 'Pháo sang cánh phải — muốn hóa giải nguy cơ cánh trái.', 6: 'Bình Pháo ép đổi Xe — đơn giản thỏa đáng.', 12: 'Đen hơn Tượng, hình thế khá ưu.' } },
        { from: 4, after: 22, m: 'P7.4 S4.5 X6-7 V5.3 X7-3 V3/5 X3/1 P2-3', k: { 8: 'Đỏ khó ứng phó.' } },
        { from: 4, after: 22, m: 'M4.6 S6.5 X6-7 B5.1 P5.3 X2-4', k: { 6: 'Đen dễ chơi.' } },
        { from: 4, after: 25, m: 'X2.2 M4.6 P2.2 M6.4 X2-6 M4.3 X6/4 X7-5 X6-7 X5-8', k: { 1: 'Cố giằng co…', 10: '…Đen đắc quân thất thế, không lợi.' } },
        { from: 4, after: 26, m: 'P3-2 P7-1 V7.9 X8.7', k: { 4: 'Đỏ vô cùng bất lợi.' } },
        { from: 4, after: 30, m: 'P5.4 M8.7 P5/1 X2-6', k: { 4: 'Đen ưu.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 22, t: 'Râu Ông Nọ Cắm Cằm Bà Kia',
      s: 'Ngũ Lục Pháo đối Bình Phong Mã: Đen đối phó "xem như Ngũ Thất Pháo" vẫn nhảy Mã lên cửa sông — "râu ông nọ cắm cằm bà kia". Đỏ tiến Pháo át Mã, xuất Xe trái tả hữu giáp công; tung phế Chốt tinh diệu phá tan phòng tuyến, hoặc khống chế Mã biên rồi vây khốn.',
      c: `<p>Ngũ Lục Pháo và Ngũ Thất Pháo có khác biệt vi diệu. Đen đối phó "xem như nhau", vẫn <strong>nhảy Mã lên</strong> — "râu ông nọ cắm cằm bà kia", cho Đỏ cơ hội xâm nhập.</p>
<p>Đỏ <strong>tiến Pháo át Mã</strong>, Đen Mã biên bắt buộc; Đỏ <strong>xuất Xe trái</strong> thuận thế — tả hữu giáp công, kiềm chế lớn. Đen có 2 cách:</p>
<ul>
<li><strong>Bình Pháo thoát kiềm chế</strong> (mạch chính): Đen tiến Pháo khá tinh xảo, chỉ cần phi Tượng là xong phòng ngự. Đúng lúc ấy Đỏ tung <strong>nước phế Chốt tinh diệu</strong> — nhất cử phá tan phòng tuyến, tổ hợp chiến thuật đẹp mắt săn được một Pháo.</li>
<li><strong>Thăng Xe giữ tuyến Chốt</strong>: kiên trì đợi biến. Đỏ khống chế Mã biên, tiến Xe phải áp chế cánh trái. Đen bình Pháo 4 thì Đỏ lui Mã nhẹ nhàng vây khốn Mã biên; bình Pháo 3 (kém ổn hơn) thì Đỏ trực tiếp phát động công kích — Đen khó ứng phó.</li>
</ul>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B3.1 B3.1 M8.9 B1.1 P8-6 M3.2 P6.3 M2.1 X9-8 P2-4 X8.6 P8.1 B3.1 B7.1 P5.4 M7.5 X8-5 P4-5 P6-5 S4.5 X5-2 X8.3 X2.6',
      k: {
        11: 'Ngũ Lục Pháo — khác biệt vi diệu với Ngũ Thất Pháo.',
        12: '"Xem như nhau" — râu ông nọ cắm cằm bà kia.',
        13: 'Tiến Pháo át Mã!',
        14: 'Bắt buộc.',
        15: 'Xuất Xe trái thuận thế — tả hữu giáp công. Đen: bình Pháo hay thăng Xe?',
        16: 'Bình Pháo thoát kiềm chế trước, sau đó tính tiếp.',
        18: 'Tinh xảo: phòng tuyến Chốt và phòng Xe tiến 6 áp chế.',
        19: 'Phế Chốt tinh diệu tuyệt luân — nhất cử phá tan phòng tuyến!',
        21: 'Hay!',
        29: 'Tổ hợp chiến thuật đẹp mắt săn được một Pháo.',
      },
      h: { 15: 'p071_0' },
      v: [
        { from: 'main', after: 13, m: 'M2/3 P6.1', k: { 2: 'Mã Đen tiến rồi lại thoái — Đỏ chiếm ưu.' } },
        { from: 'main', after: 17, m: 'V7.5 X2.6', k: { 2: 'Đỏ ưu thế áp đảo.' } },
        { from: 'main', after: 15, m: 'X1.3 X8.3 B1.1 X2.6 P2-4 M9/8 V7.5 P5-9 S6.5 M8.7 P8-9 X2.3 M7/8 V7.5', k: { 1: 'Thăng Xe giữ tuyến Chốt — kiên trì đợi biến.', 4: 'Khống chế Mã biên rồi tiến Xe phải áp chế cánh trái. Đen: Pháo bình 4 hay bình 3?', 6: 'Nhẹ nhàng tinh tế — bắt đầu vây khốn Mã Đen.', 9: 'Chính xác (không gấp Xe bình 9).', 14: 'Mã biên Đen bị khốn, nguy cơ mất quân.' }, h: { 4: 'p071_1' } },
        { from: 2, after: 19, m: 'P2-3 X2-3 P8.4 M3.4 P8-7 P6-3 P7/2 B3.1 V7.5 X8.4', k: { 1: 'Bình Pháo lộ 3 — kém ổn hơn bình Sĩ giác.', 2: 'Trực tiếp phát động công kích.', 4: 'Vòng qua mai phục ngầm.', 10: 'Đen khó ứng phó.' } },
        { from: 3, after: 21, m: 'V7.5 B3.1 P8-9 X3-4', k: { 4: 'Đỏ cũng ưu.' } },
        { from: 3, after: 22, m: 'X3.1 V7.5 X3/1 P8-7', k: { 4: 'Đen có thể phản kích.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 23, t: 'Tiên Phát Chế Nhân',
      s: 'Trung Pháo đối Bình Phong Mã: Đen bình Pháo mở đường Xe sớm để tranh tiên — bộc lộ ý đồ quá sớm. Đỏ phi Pháo tiến sâu vào trận địa Đen, ra đòn trước để chế ngự: Đen xuất Xe bắt Pháo thì mỗi bên chiếm một cánh nhưng Đỏ dễ chơi; Đen phi Tượng né thì kế hoạch phá sản.',
      c: `<p>Đen <strong>bình Pháo mở đường Xe</strong> — muốn tranh tiên nhưng kết quả trái ý, dẫn đến bị công kích (chính xác: thúc Chốt 3 tương ứng). Đỏ <strong>phi Pháo tiến sâu vào trận địa Đen</strong> — "tiên phát chế nhân", cảnh giác có lực. Đen có 2 cách:</p>
<ul>
<li><strong>Xuất Xe bắt Pháo</strong> (mạch chính): không cam thế yếu, khá cứng rắn. Đỏ Xe tiến chặt chẽ; hai bên mỗi bên chiếm một cánh, qua chuyển đổi Đỏ đơn giản thích hợp — Mã Đỏ bị kiềm chế nhưng Xe Pháo Đen không căn cũng khó xử lý, Đỏ ưu.</li>
<li><strong>Phi Tượng né đổi</strong>: cầu bình ổn nhưng kế hoạch tranh xuất Xe phải "trôi theo dòng nước" — bị Xe Pháo Đỏ phong tỏa; Đỏ qua Chốt trợ công, Đen rơi vào khốn cuộc.</li>
</ul>
<h2>Bài học</h2>
<p>Tư tưởng "tiên phát chế nhân" — tích cực chiến đấu — một lần nữa thể hiện giá trị.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B3.1 P2-1 P8.5 X1-2 P8-3 P1-7 X2.5 X2.8 M3.4 V7.5 M4.5 M3.5 P5.4 S6.5 V7.5 P7-6 S6.5',
      k: {
        8: 'Bình Pháo mở đường Xe — bộc lộ ý đồ quá sớm (chính xác: Chốt 3 tiến).',
        9: 'Phi Pháo vào sâu trận địa Đen — tiên phát chế nhân! Đen: xuất Xe hay phi Tượng?',
        10: 'Xuất Xe bắt Pháo — không cam thế yếu.',
        13: 'Chặt chẽ!',
        17: 'Đơn giản thích hợp.',
        23: 'Mã Đỏ bị kiềm chế nhưng Xe Pháo Đen không căn — trong giằng co Đỏ chiếm ưu.',
      },
      h: { 9: 'p073_0' },
      v: [
        { from: 'main', after: 7, m: 'B3.1', k: { 1: 'Thúc Chốt 3 tương ứng — tốt hơn.' } },
        { from: 'main', after: 8, m: 'M8.9 X1-2 X9-8 X2.5', k: { 4: 'Xe Đen ra trước — Đỏ không dễ khống chế.' } },
        { from: 'main', after: 12, m: 'M8.7 X2.5 B5.1 P8.4 B5.1 P7-5', k: { 6: 'Đỏ khó có lợi.' } },
        { from: 'main', after: 15, m: 'S6.5 M4.6 V7.5 S4.5', k: { 4: 'Tiếp theo Mã tiến 4 và Pháo bình 2 — Đen khó ứng phó.' } },
        { from: 'main', after: 16, m: 'M4.6 B3.1', k: { 2: 'Đỏ vô vị.' } },
        { from: 'main', after: 16, m: 'P5-2 X2-8', k: { 2: 'Đen có cơ hội giằng co.' } },
        { from: 'main', after: 9, m: 'V3.5 M8.7 X1-2 X9-8 B3.1 X2.6 P8-9 X2-3 X8.2 B3.1 P9/1 X3-4', k: { 1: 'Phi Tượng né đổi — cầu bình ổn.', 4: 'Kế hoạch tranh xuất Xe phải bị Xe Pháo Đỏ phong tỏa.', 10: 'Qua Chốt trợ công.', 12: 'Tiếp theo Chốt 3 tiến — Đen rơi vào khốn cuộc.' } },
        { from: 6, after: 9, m: 'P8-9 X2.9 M7/8 P8-1 P1-9 B7.1 X1-2 M8.7', k: { 8: 'Đỏ cũng chiếm tiên.' } },
        { from: 6, after: 13, m: 'P8.4 B7.1', k: { 2: 'Song Mã Đen bị khắc chế — khó chơi.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 24, t: 'Mã Biên Thùy Tất Vong',
      s: 'Ngũ Thất Pháo đối Bình Phong Mã: Đen nhảy Mã đạp Chốt biên — nhanh nhất thời nhưng cô quân thâm nhập. Đỏ bình Xe tróc Pháo kịp thời, hướng mũi nhọn về Mã biên: Đen bình Pháo Sĩ giác thì Đỏ dùng Mã biên đổi Mã phải Đen; bình Pháo bảo vệ Mã thì Đen xuất quân chậm.',
      c: `<p>Đỏ bình Pháo nhòm Chốt thành thế <strong>Ngũ Thất Pháo</strong>. Đen <strong>Mã đạp Chốt biên</strong> — nhanh nhất thời nhưng cô quân thâm nhập (chính xác: Xe mời đổi). Đỏ <strong>bình Xe tróc ngược</strong> — chặt chẽ có lực, đáp trả nước trái kỳ lý. Đen có 2 cách:</p>
<ul>
<li><strong>Pháo bình Sĩ giác</strong> (mạch chính): chỉ có thể chạy Pháo. Đỏ tiến Xe tróc Mã, rồi <strong>bình Xe</strong> đơn giản có lực; qua chuyển đổi, Đỏ dùng Mã biên — mắt xích yếu nhất trận địa mình — đổi Mã phải Đen, lại cướp được nước Chốt 3 quan trọng. Quân Đỏ chiếm vị trí cực tốt, tiền đồ tươi sáng.</li>
<li><strong>Pháo bình biên bảo vệ Mã</strong>: ảnh hưởng tốc độ xuất chủ lực; Đỏ xông Chốt, nhảy Mã, thoái Pháo tất yếu — Đen đối diện nan đề phòng thủ.</li>
</ul>
<h2>Bài học</h2>
<p>"Mã biên thùy tất vong" — Mã tiến đường biên ở khu vực chật hẹp nên vị trí nguy hiểm. Mã Đen đạp Chốt biên cô quân thâm nhập, dù không mất quân trực tiếp nhưng ảnh hưởng toàn cục.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 B3.1 M8.9 M2.3 P8-7 M3.2 X2.6 V3.5 X9.1 S4.5 X9-6 M2.1 X6-8 P2-4 X8.2 B1.1 X8-9 B1.1 X9-8 B1.1 X8.3 B1.1 B3.1 X1.5 P5-9 P8-9 X2.3 M7/8 V3.5 M8.7 P7/1',
      k: {
        9: 'Bình Pháo nhòm Chốt — thế Ngũ Thất Pháo.',
        16: 'Mã đạp Chốt biên — cô quân thâm nhập (chính xác: Xe mời đổi).',
        17: 'Bình Xe tróc ngược — chặt chẽ có lực! Đen: Pháo bình 4 hay bình 1?',
        18: 'Chỉ có thể chạy Pháo.',
        19: 'Tiến Xe tróc Mã — liền mạch.',
        21: 'Đơn giản có lực!',
        27: 'Đỏ dùng Mã biên đổi Mã phải Đen, lại cướp được Chốt 3 quan trọng.',
        30: 'Bình Pháo mời đổi — mưu cầu đơn giản hóa.',
        35: 'Quân Đỏ chiếm vị trí cực tốt — tiền đồ tươi sáng.',
      },
      h: { 17: 'p075_0' },
      v: [
        { from: 'main', after: 15, m: 'X1-2', k: { 1: 'Mời đổi trực tiếp — chính xác.' } },
        { from: 'main', after: 17, m: 'M1.3 X8.6', k: { 2: 'Song Mã Đen mất căn, khó xử lý.' } },
        { from: 'main', after: 19, m: 'P4.4 B7.1 P4-7 B5.1 P7.3 S4.5', k: { 6: 'Đen khó tránh mất quân.' } },
        { from: 'main', after: 20, m: 'M9/8 B1.1', k: { 2: 'Tranh chấp chiến thuật — Đen có cơ hội.' } },
        { from: 'main', after: 26, m: 'P5-9 B7.1', k: { 2: 'Đỏ quá chậm, Đen ứng chiến được.' } },
        { from: 'main', after: 27, m: 'B1.1 M3.4', k: { 2: 'Đỏ rõ ràng nắm quyền chủ động.' } },
        { from: 'main', after: 29, m: 'X1-7 P9.7 X7.2 X8.3 P4/2 X2/2 X7-4 S6.5 X4/5 P7-6', k: { 1: 'Tùy tiện sát Chốt…', 10: '…Đỏ phế quân công sát nhanh.' } },
        { from: 'main', after: 17, m: 'P2-1 X8.2 B1.1 B3.1 B1.1 M3.4 P1-4 P7/1 X1.3 M4.6', k: { 1: 'Bình Pháo bảo vệ Mã — ảnh hưởng xuất chủ lực.', 8: 'Tất yếu — Đen có nước khéo Chốt 1 bình 2.', 10: 'Tiếp theo Mã tiến 4, tiến 7, Pháo bình 9… — Đen nan đề phòng thủ.' } },
        { from: 7, after: 19, m: 'B7.1 P5.4 M7.5 X2-5', k: { 4: 'Đánh thông tuyến Chốt — Đen khó phòng thủ.' } },
        { from: 7, after: 23, m: 'X1-4 P7/1 P8-9 X2.3 M7/8 P5.4 M8.7 P5/1', k: { 8: 'Đỏ ưu thế không gian khá lớn.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 25, t: 'Khư Khư Cái Cũ',
      s: 'Trung Pháo quá hà Xe đối Bình Phong Mã: Đỏ nhảy Mã biên (không thúc Chốt 7) nhưng Đen vẫn bình Pháo đổi Xe theo nếp cũ — không hợp lý. Đỏ bình Pháo lộ 7 uy hiếp Mã, xuất Xe trái: Đen bổ Sĩ chậm thì Đỏ xông Chốt qua sông; Đen thoái Mã vây Xe thì Đỏ Pháo nổ Chốt giữa đoạt thế.',
      c: `<p>Đen cướp thúc Chốt 7, Đỏ chỉ huy <strong>Xe quá hà</strong> tích cực. Đỏ <strong>nhảy Mã biên</strong> (không thúc Chốt 7 thường gặp) — vậy mà Đen vẫn <strong>bình Pháo đổi Xe</strong> theo nếp cũ: không hợp lý (hợp lý và có sức bật: Mã tiến 6).</p>
<p>Đỏ <strong>bình Pháo lộ 7</strong> uy hiếp Mã lộ 3, thuận thế mở đường Xe trái. Đen có 2 cách:</p>
<ul>
<li><strong>Bổ Sĩ</strong> (mạch chính): phòng thủ, tốc độ chậm. Đỏ xuất Xe trái, xông Chốt 7 qua sông — thế hai mặt giáp công, Chốt Đỏ trợ chiến chiếm hết ưu thế.</li>
<li><strong>Thoái Mã oa tâm</strong> mưu vây Xe: Đỏ <strong>xuất Xe trái cướp tiên</strong> (nước hay — thoái Xe ăn Chốt thì đúng ý Đen), rồi <strong>Pháo nổ Chốt giữa</strong> khéo giải vây Xe, đột kích phòng tuyến; nước lão luyện không cho Đen phản kích, Chốt qua sông — Đỏ ưu.</li>
</ul>
<h2>Bài học</h2>
<p>Bình Pháo đổi Xe không phải vạn năng — chỉ khi Đỏ thúc Chốt 7 thì mới hợp tình hợp lý. Đỏ đã thay đổi mà Đen vẫn rập khuôn — bảo thủ giáo điều.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 B7.1 X2.6 M2.3 M8.9 P8-9 X2-3 P9/1 P8-7 S4.5 X9-8 X1-2 B7.1 P9-7 X3-4 V3.5 X8.6 P2-1 X8-7 M3/4 B7.1',
      k: {
        7: 'Xe quá hà — tích cực.',
        10: 'Bình Pháo đổi Xe theo nếp cũ — không hợp lý khi Đỏ không thúc Chốt 7 (nên Mã tiến 6).',
        13: 'Bình Pháo lộ 7 uy hiếp Mã, mở đường Xe trái. Đen: bổ Sĩ hay thoái Mã?',
        14: 'Bổ Sĩ — tốc độ khá chậm.',
        20: 'Mưu phòng thủ.',
        21: 'Phù hợp thực tế.',
        25: 'Chốt Đỏ qua sông trợ chiến — chiếm hết ưu thế.',
      },
      h: { 13: '!p078_0' },
      v: [
        { from: 'main', after: 6, m: 'B7.1 P8.4 M8.7 V3.5', k: { 4: 'Cánh phải Đỏ bị phong tỏa — Đen bố cục hài lòng.' } },
        { from: 'main', after: 9, m: 'M7.6', k: { 1: 'Hợp lý và có sức bật.' } },
        { from: 'main', after: 19, m: 'X8.5 B3.1 X8-7 M3.4', k: { 4: 'Đỏ chiếm ưu.' } },
        { from: 'main', after: 20, m: 'B7.1 V5.3 M9.7 P2-1', k: { 1: 'Gấp công…', 4: '…cho Đen cơ hội thư thả — đối kháng được.' } },
        { from: 'main', after: 13, m: 'M3/5 X9-8 P9-7 P5.4 V3.5 X3-4 M7.5 X8.7 P7.5 V3.5 M5.7 X8/3 S4.5 B5.1', k: { 1: 'Thoái Mã oa tâm — dọa Pháo bình 7 đánh Xe.', 2: 'Nước hay cướp tiên!', 4: 'Pháo nổ Chốt giữa — khéo giải vây Xe, đột kích phòng tuyến.', 5: 'Bắt buộc.', 10: 'Lão luyện — không cho Đen phản kích.', 14: 'Đỏ xông Chốt qua sông — Đen khó tìm kế phòng ngự.' } },
        { from: 4, after: 14, m: 'X3/1 V3.5 X3-6 M5/3 B3.1 P9-7', k: { 1: 'Tiêu cực thoái Xe ăn Chốt — đúng ý Đen.', 6: 'Đỏ không thu hoạch được gì.' } },
        { from: 4, after: 17, m: 'M5.3 P5/1 P7.2 X8.7', k: { 1: 'Cứng rắn…', 4: '…Đỏ phế Xe cướp công, Đen khó chống đỡ.' } },
        { from: 4, after: 27, m: 'X8.5 X4/3', k: { 2: 'Đỏ ưu.' } },
        { from: 4, after: 27, m: 'M5.3 B5.1 X1-4 B5-6 X4.4 B7.1', k: { 6: 'Đỏ ưu.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 26, t: 'Đổi Quân Giành Thế',
      s: 'Trung Pháo trực hoành Xe đối Bình Phong Mã: Đen bình Pháo Sĩ giác trông ổn chắc nhưng bị Đỏ bình Pháo mời đổi — nhạy bén. Đen chấp nhận đổi Pháo thì lộ kẽ hở, Pháo Đỏ nổ Sĩ đáy; Đen né Pháo thì vô cớ mất một tiên.',
      c: `<p>Đỏ <strong>nhảy chính Mã trái trước</strong> — thế trận trực hoành Xe, xu thế phổ biến ở giải lớn những năm gần đây. Đen chấp nhận đổi Chốt dứt khoát. Đen <strong>bình Pháo Sĩ giác</strong> — ứng phó tiêu cực, cho Đỏ cơ hội xâm nhập (chính xác: Pháo bình 7 có sức kiềm chế).</p>
<p>Đỏ <strong>bình Pháo mời đổi</strong> — nhạy bén có lực, đánh loạn bố trí tưởng ổn chắc của Đen. Đen có 2 cách:</p>
<ul>
<li><strong>Chấp nhận đổi Pháo</strong> (mạch chính): chưa ý thức điểm yếu. Hình trận lộ kẽ hở, Đỏ <strong>Pháo nổ Sĩ đáy</strong> thừa sơ hở xâm nhập; bình Xe rất chặt chẽ — Đen tàn Sĩ, hình trận không chỉnh tề.</li>
<li><strong>Né Pháo</strong>: kiên trì đợi biến. Đỏ nhảy Mã xuất kích tự nhiên, đánh Mã đổi quân đơn giản; bình Pháo phong tỏa thông đạo Xe Đen — Đỏ lạc quan.</li>
</ul>
<h2>Bài học</h2>
<p>Với hình cờ bình thường, có Mã trên bờ sông mà bình Pháo Sĩ giác thành thế "tiền Mã hậu Pháo" là kết cấu lý tưởng; nhưng ở đây Đỏ có thủ đoạn bình Pháo ép đổi. Bình một nước hay hai nước trông không khác mấy nhưng hiệu quả một trời một vực.</p>`,
      m: 'P2-5 M8.7 M2.3 B7.1 X1-2 X9-8 X2.6 M2.3 M8.7 B3.1 X9.1 P2.1 X2/2 V3.5 B3.1 B7.1 X2-3 M7.6 B7.1 B3.1 X3-7 P8-6 P5-4 P6.5 P8-4 M3.4 P4.7 X8.7 X9-6 X8-7 X6.4 M6/7 P4/1',
      k: {
        9: 'Nhảy chính Mã trái trước — thế trực hoành Xe, tiến thủ vững chắc.',
        16: 'Chấp nhận đổi Chốt — dứt khoát.',
        22: 'Bình Pháo Sĩ giác — tiêu cực (chính xác: Pháo bình 7).',
        23: 'Bình Pháo mời đổi — nhạy bén có lực! Đen: đổi Pháo hay né?',
        24: 'Chấp nhận đổi Pháo — chưa ý thức điểm yếu.',
        27: 'Pháo nổ Sĩ đáy — thừa sơ hở mà xâm nhập.',
        29: 'Rất chặt chẽ.',
        33: 'Đen tàn Sĩ, hình trận không chỉnh tề — Đỏ rõ ràng chiếm ưu.',
      },
      h: { 23: 'p080_0' },
      v: [
        { from: 'main', after: 15, m: 'P2.1 B7.1 P8.2 X9-6 S4.5 P8/1', k: { 6: 'Phục Pháo bình 7 ép Đen tháo gỡ — Đỏ tiên thủ.' } },
        { from: 'main', after: 18, m: 'X9-4 P2.1 X4-2 X1.1', k: { 4: 'Đen đối kháng cân bằng.' } },
        { from: 'main', after: 21, m: 'P8-7 X9-4 X8.4 M3.4 X8-7 M4/2 X7-8', k: { 7: 'Đen ung dung chống địch.' } },
        { from: 'main', after: 27, m: 'Tg5-6 X9-4 P2.1 M7.6 X8.4 M3.2', k: { 6: 'Đen tàn Sĩ, không cách nào chống thế công.' } },
        { from: 'main', after: 28, m: 'M3.4 X8-4 M4.6 X4/3 X9-8 P2.1', k: { 6: 'Đỏ vẫn ưu nhưng thế công gặp trở ngại.' } },
        { from: 'main', after: 23, m: 'P6-7 M3.4 P2/2 P4.3 P2-3 X7-8 P3.6 X9-3 P7-6 P4-2', k: { 1: 'Né Pháo — kiên trì đợi biến.', 2: 'Thuận thế nhảy Mã xuất kích.', 4: 'Đánh Mã đổi quân — đơn giản thỏa đáng.', 10: 'Phong tỏa thông đạo Xe Đen — Đỏ lạc quan.' } },
        { from: 5, after: 24, m: 'V3.5 X8.4 M3.4 X8-7', k: { 4: 'Đen hơi bị động nhưng hình trận không loạn.' } },
        { from: 5, after: 26, m: 'P8.4 P2-3 P8-7 M3/1', k: { 4: 'Đỏ có phiền phức.' } },
        { from: 5, after: 26, m: 'M7/5 P2-3 X7-8 P7.6', k: { 4: 'Đỏ thất tiên.' } },
        { from: 5, after: 26, m: 'V7.5 P2-3 X7-8 P3.6 P4-7 X8.5', k: { 6: 'Đen hài lòng.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 27, t: 'Binh Quý Thần Tốc',
      s: 'Trung Pháo trực hoành Xe song chính Mã đối Bình Phong Mã: Đen bình Pháo biên mở đường Xe — lộ ý đồ sớm, trung lộ trống trải. Đỏ kiên quyết xông Chốt giữa, thoái Pháo cánh trái vừa thoát kiềm chế vừa bình vào trung lộ — thế công hào hùng, sắc bén không cản nổi.',
      c: `<p>Đỏ nhảy chính Mã trái trước — <strong>trực hoành Xe</strong>, trận thức hưng thịnh từ thập niên 1980, nay vẫn là bố cục "hot". Đen thúc Chốt 3 chính xác. Đen <strong>bình Pháo biên</strong> — ý tưởng xuất Xe kiềm chế Pháo Đỏ, đáng học nhưng không hợp thời (nên bổ Sĩ củng cố trung lộ trước).</p>
<p>Đỏ <strong>kiên quyết xông Chốt giữa</strong> — tâm thái tích cực, nắm thời cơ trung lộ Đen mỏng yếu. Đỏ <strong>thoái Pháo cánh trái</strong> điều động linh hoạt, rồi bình vào trung lộ — thế công mãnh liệt; Đen tiến Xe kiềm chế, liên tục mất Chốt giữa, khó chống đỡ.</p>
<h2>Bài học</h2>
<p>Hình cờ trực hoành Xe song chính Mã có quân xuất kích chính diện nên tiềm lực công kích mạnh. Đen — bên hậu thủ — phải coi trọng điểm này và tăng cường phòng thủ trung lộ.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 B7.1 X2.6 M2.3 M8.7 B3.1 X9.1 P2-1 B5.1 X1-2 P8/1 S4.5 P8-5 X2.6 B5.1 B5.1 M3.5 X2-3 X9-6 B5.1 Pt.2 M3.5 X6.5 P1.4 V3.5 P1-5 M7.5 V3.5 Pt.1',
      k: {
        9: 'Nhảy chính Mã trái trước — trực hoành Xe, bố cục "hot".',
        10: 'Chính xác.',
        12: 'Bình Pháo biên xuất Xe — đáng học nhưng không hợp thời (nên bổ Sĩ trước).',
        13: 'Kiên quyết tiến thủ — tâm thái tích cực!',
        15: 'Điều động linh hoạt — làm mạnh thêm thế công trung lộ.',
        18: 'Tiến Xe kiềm chế.',
        33: 'Thế công mãnh liệt — Đen khó chống đỡ.',
      },
      h: { 13: 'p083_0' },
      v: [
        { from: 'main', after: 9, m: 'P8-9 X2-3 P9/1 B5.1 S4.5 B5.1', k: { 6: 'Đỏ có thế công.' } },
        { from: 'main', after: 9, m: 'M7.6 B5.1 B7.1 X2/1 M6.4 B3.1 M4.3 X9.1', k: { 8: 'Đỏ phế quân tranh tiên, hình thế chủ động.' } },
        { from: 'main', after: 11, m: 'S4.5 X9-6 P2-1', k: { 3: 'Cục diện đối kháng cân bằng.' } },
        { from: 'main', after: 12, m: 'X9-6 X1-2 B5.1 S4.5', k: { 4: 'Đỏ chưa rơi vào khuôn sáo cũ, Đen cơ hội không tệ.' } },
        { from: 'main', after: 17, m: 'V3.5 M3.5 M3.4 B5.1 M4.5 M7.5', k: { 6: 'Thế Đỏ cũng không thể cản.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 28, t: 'Đổi Không Đúng Lúc',
      s: 'Trung Pháo trực hoành Xe đối Bình Phong Mã: Đen bình Pháo đổi Xe — trông tự nhiên nhưng không đúng lúc, "dẫn sói vào nhà". Đỏ đổi Xe dứt khoát, Xe trước ngã xuống Xe sau tiến lên, xông Chốt giữa tạo gọng kìm; Đen bổ Sĩ, thoái Mã hay lui Mã oa tâm đều khó cứu.',
      c: `<p>Đen <strong>bình Pháo đổi Xe</strong> — trông tự nhiên, thực tế không thích hợp lúc này, tạo nghi hình: "dẫn sói vào nhà" (chính xác: phi Tượng dĩ dật đãi lao).</p>
<p>Đỏ <strong>đổi Xe dứt khoát</strong>; Xe sau tiến lên, Xe trước ngã xuống — mạnh mẽ vang dội; rồi <strong>xông Chốt giữa</strong> phối hợp Xe phải thành gọng kìm. Đen có 3 cách:</p>
<ul>
<li><strong>Bổ Sĩ</strong> (mạch chính): tăng phòng thủ trung lộ nhưng quân bị kiềm chế vẫn hết đường xoay sở; Mã Đỏ thuận lợi nhảy lên — ưu thế lớn.</li>
<li><strong>Thoái Mã oa tâm</strong> dùng Pháo đánh Xe ngăn địch: miễn cưỡng. Đỏ thoái Pháo điều động có lực, hỏa Pháo mãnh liệt trung lộ — ưu thế áp đảo.</li>
<li><strong>Mã về oa tâm</strong>: Đỏ nắm điểm yếu Mã oa tâm, từng bước bức ép, bắt Pháo — hơn quân thắng thế.</li>
</ul>
<h2>Bài học</h2>
<p>Dùng Xe tối mời đổi Xe sáng thường khả thi; nhưng ở đây hình trận không ổn chắc, hậu phương trống trải nên đổi Xe tạo nghi hình.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 B7.1 X2.6 M2.3 M8.7 B3.1 X9.1 P2.1 X2/2 P8-9 X2.5 M7/8 X9-2 M8.7 X2.6 P2/1 B5.1 S4.5 M7.5 P2-1 B3.1 X1-2 P8-6 B7.1 M5.3 P9/1 Mt.4 P9-6 B5.1',
      k: {
        14: 'Bình Pháo đổi Xe — không đúng lúc, "dẫn sói vào nhà" (chính xác: Tượng 3 tiến 5).',
        15: 'Đổi Xe dứt khoát.',
        19: 'Xe sau tiến lên!',
        21: 'Xông Chốt giữa — gọng kìm cùng Xe phải. Đen: bổ Sĩ, Mã 3 lui 5 hay Mã 7 lui 5?',
        22: 'Bổ Sĩ — quân bị kiềm chế vẫn hết đường xoay sở.',
        29: 'Mã Đỏ thuận lợi nhảy lên — Đen bốn bề nguy cơ.',
        33: 'Thế công mãnh liệt — Đỏ ưu thế lớn.',
      },
      h: { 14: '!p084_0', 21: 'p084_1' },
      v: [
        { from: 'main', after: 13, m: 'V3.5', k: { 1: 'Dĩ dật đãi lao — hình trận vững chắc.' } },
        { from: 'main', after: 14, m: 'X9-2 X8.5 X2.3 V3.5', k: { 1: 'Bỏ lỡ chiến cơ…', 4: '…Đen đủ sức đối kháng cân bằng.' } },
        { from: 'main', after: 33, m: 'B5.1 X2-3 P1-7 M4.6', k: { 4: 'Sát cục.' } },
        { from: 'main', after: 21, m: 'M3/5 X2/1 P2-5 P8/1 P5.3 P8-5 P5.3 S4.5 X1.2 M7.5 X1-4 X2-3', k: { 1: 'Thoái Mã oa tâm — miễn cưỡng.', 4: 'Điều động có lực — hỏa Pháo làm mạnh trung lộ.', 12: 'Đỏ ưu thế áp đảo.' } },
        { from: 3, after: 27, m: 'B5.1 Ps.3 B5.1 M3.5 B5.1 M7.5', k: { 6: 'Thế công Đỏ như sóng lớn cuộn trào.' } },
        { from: 'main', after: 21, m: 'M7/5 X2.1 P9-5 X2-4 P2/1 X4/1 P5.3 M3.5 B5.1 S4.5 P2.1 X4/2 P2.2 Tg5-4 M5.7 X4.2 M3.5 X4-8 P2-1 B9.1', k: { 1: 'Mã về oa tâm.', 6: 'Từng bước bức ép điểm yếu Mã oa tâm.', 10: 'Thăng Pháo kiên trì phòng thủ.', 20: 'Pháo Đen bị bắt — Đỏ hơn quân thắng thế.' } },
        { from: 5, after: 31, m: 'P5.2 P8-5 M5.7 X4-5 S4.5 B7.1', k: { 6: 'Thế công Đỏ hưng thịnh.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 29, t: 'Nghe Tin Lập Tức Hành Động',
      s: 'Trung Pháo đối Bình Phong Mã: Đỏ xông Chốt giữa không có Xe quá hà phối hợp — hữu dũng vô mưu. Đen phi Pháo quá hà phong tỏa, bổ Sĩ dĩ dật đãi lao: Đỏ giữ Chốt qua sông thì quân lực bị khắc chế; Đỏ phế Chốt phá vây thì Đen phòng thủ nghiêm mật, ưu thế áp đảo.',
      c: `<p>Đỏ <strong>xông Chốt giữa</strong> — sai lầm người mới dễ mắc: trông hung hãn, thực ra hữu dũng vô mưu, không hợp thời (chính xác: Xe tiến 6 trước rồi mới xông Chốt).</p>
<p>Đen <strong>phi Pháo quá hà phong tỏa</strong> — khắc chế hiệu quả nhất thế công trung lộ; rồi <strong>bổ Sĩ</strong> thuận thế, dĩ dật đãi lao. Đỏ có 2 cách:</p>
<ul>
<li><strong>Bình Chốt qua sông</strong> (mạch chính): gửi gắm hy vọng vào Chốt; Đen phi Tượng, Pháo phải quá hà tăng phong tỏa. Chốt Đỏ ép Mã Đen thoái nhưng một quân đi quá nhiều lần — được không bù mất; tuyến Chốt Đỏ gần như tê liệt, Đen phản tiên.</li>
<li><strong>Phế Chốt 3 phá vây</strong> (thủ đoạn quen dùng của Trung Pháo bàn đầu Mã): Đen cảnh giác bình Chốt; Mã Đỏ không còn đường chạy, đành xả thân đổi Sĩ — Đen ưu thế lớn.</li>
</ul>
<h2>Bài học</h2>
<p>Xông Chốt giữa kiểu Pháo đầu Mã đội phải có Xe quá hà phối hợp mới uy lực. Ở đây thế công không hiệu quả mà còn bị phong tỏa — công thủ bất lợi.</p>`,
      m: 'P2-5 M8.7 M2.3 M2.3 M8.7 B7.1 X1-2 X9-8 B5.1 P8.4 B5.1 S4.5 B5-6 V3.5 B6.1 P2.4 B7.1 X1-4 B6-7 M3/1 S6.5 X4.6',
      k: {
        9: 'Xông Chốt giữa — hữu dũng vô mưu (chính xác: Xe tiến 6 trước).',
        10: 'Phi Pháo quá hà phong tỏa — tinh chuẩn có lực!',
        12: 'Bổ Sĩ dĩ dật đãi lao. Đỏ: giữ Chốt qua sông hay phế Chốt 3?',
        13: 'Giữ Chốt qua sông — gửi gắm hy vọng.',
        16: 'Hữu Pháo quá hà — tăng cường phong tỏa.',
        20: 'Mã Đen phải thoái…',
        22: '…nhưng một quân đi quá nhiều lần — tuyến Chốt Đỏ gần như tê liệt, Đen phản tiên.',
      },
      h: { 12: 'p087_0' },
      v: [
        { from: 'main', after: 8, m: 'X2.6', k: { 1: 'Xe quá hà trước — rồi mới tính xông Chốt.' } },
        { from: 'main', after: 9, m: 'S4.5 X2.6', k: { 2: 'Đen mất cơ hội phản tiên.' } },
        { from: 'main', after: 12, m: 'B5.1 M3.5 M7.5 P2-5 M5.6 M5.6 M6.5 V3.5', k: { 8: 'Đen chiếm ưu.' } },
        { from: 'main', after: 15, m: 'P2.2', k: { 1: 'Cũng được — nước sau bình Pháo trấn trung giành thế.' } },
        { from: 'main', after: 12, m: 'B3.1 B7.1 M3.5 B7-6 M5.6 V3.5 M6.7 B5.1 S6.5 X1-3 Mt.5 S6.5', k: { 1: 'Phế Chốt phá vây — không cam khổ thủ.', 4: 'Cảnh giác!', 6: 'Phi Tượng củng cố — ổn chắc có lực.', 11: 'Mã Đỏ hết đường chạy, đành xả thân đổi Sĩ.', 12: 'Đỏ lời một Sĩ nhưng cục diện lạc hậu — Đen ưu thế lớn.' } },
        { from: 4, after: 15, m: 'B7.1 M5.3', k: { 2: 'Đỏ tranh vị trí trọng yếu — Đen có kiêng dè.' } },
        { from: 4, after: 17, m: 'P8-5 P5-3', k: { 2: 'Nước cám dỗ — Đỏ chiếm ưu.' } },
        { from: 4, after: 22, m: 'Mt/5 M7.5 P5.4 P8-5 M7.5 X8.9', k: { 6: 'Đen ưu.' } },
      ],
      kq: 'uu-den',
    },
    {
      n: 30, t: 'Không Phải Tầm Thường',
      s: 'Trung Pháo tiến Chốt 7 đối Bình Phong Mã: Đen Mã trái xuất kích sớm, tự rời phòng tuyến trung lộ. Đỏ thăng Xe tuần hà hay xuất Xe biên đều chưa "kê đúng thuốc"; tiến Pháo trái đoạt Chốt giữa mới đúng điểm yếu — liên tiếp chiếm vị trí trọng yếu, Đỏ rõ ràng chiếm ưu.',
      c: `<p>Đen <strong>nhảy Mã trái xuất kích</strong> — tự rời phòng tuyến, tạo điểm yếu tiềm tàng ở trung lộ (chính xác: Xe 9 bình 8 thành Bình Phong Mã chính quy). Đen bình Pháo nhòm Chốt, uy hiếp Mã Đỏ. Đỏ có 3 cách:</p>
<ul>
<li><strong>Tiến Pháo trái đoạt Chốt giữa</strong> (mạch chính): chọn điểm đánh chính xác — con đường hay nhất. Đỏ đoạt Chốt giữa rồi liên tiếp tranh vị trí trọng yếu, đi chặt chẽ có lực — tranh tiên, Đỏ rõ ràng chiếm ưu.</li>
<li><strong>Xe tuần hà</strong>: bảo thủ, ổn chắc nhưng thế công không đủ; Đỏ phải tháo Trung Pháo — Đen giành thế trận hài lòng.</li>
<li><strong>Xe biên tiến</strong>: không sợ phản kích nhưng lực không đủ; Đen phi Tượng ổn chắc — hình trận chỉnh tề, đủ sức đối kháng.</li>
</ul>
<h2>Bài học</h2>
<p>Lâm trận phải thoát khỏi tư duy kiểu cũ, nhằm đúng điểm yếu hình trận đối phương — như "vô hình thắng hữu hình".</p>`,
      m: 'P2-5 M2.3 B7.1 B7.1 M8.7 M8.7 M2.3 M7.6 X1-2 P8-7 P8.4 S4.5 P8-5 M3.5 P5.4 V3.5 X9-8 X1-4 X8.5 X4.3 X2.6 M6.7 S4.5 B9.1 X8.1 M7/6 B5.1 B7.1 X2-4',
      k: {
        8: 'Mã trái xuất kích — tự rời phòng tuyến (chính xác: Xe 9 bình 8).',
        10: 'Bình Pháo nhòm Chốt, uy hiếp Mã Đỏ. Đỏ: Xe tuần hà, Xe biên hay tiến Pháo?',
        11: 'Tiến Pháo chuẩn bị đoạt Chốt giữa — chọn điểm đánh chính xác!',
        14: 'Tương đối ổn chắc.',
        19: 'Hay!',
        23: 'Chính xác — không tham ăn Chốt.',
        27: 'Hay!',
        29: 'Hai bên tranh tiên — Đỏ rõ ràng chiếm ưu.',
      },
      h: { 10: 'p089_0' },
      v: [
        { from: 'main', after: 7, m: 'X9-8', k: { 1: 'Thành trận Bình Phong Mã chính quy.' } },
        { from: 'main', after: 22, m: 'X8-3 X4-5', k: { 2: 'Đỏ mất quân.' } },
        { from: 'main', after: 10, m: 'X2.4 M6.7 P5-6 V3.5 V7.5 X9.1 P8-9 X1-2 X9-8 P2.4', k: { 1: 'Xe tuần hà — bảo thủ, thế công không đủ.', 2: 'Thực dụng.', 3: 'Né Mã 7 tiến 5 ăn quân — buộc tháo Trung Pháo.', 10: 'Đen giành thế trận hài lòng.' } },
        { from: 2, after: 11, m: 'B7.1 X2-3 P2/1 M3/5', k: { 4: 'Đỏ hơn Chốt dễ chơi.' } },
        { from: 2, after: 12, m: 'M7.6 P2.3', k: {} },
        { from: 'main', after: 10, m: 'X9.1 V3.5 X9-4 M6.7 X4.2 S4.5 B5.1 X1-4 X2.6 X9.2', k: { 1: 'Xe biên tiến — lực không đủ.', 2: 'Lựa chọn ổn chắc.', 10: 'Hình trận Đen chỉnh tề, đủ sức đối kháng.' } },
        { from: 5, after: 11, m: 'B7.1 X2.5 M6.7 X2-3', k: { 4: 'Đỏ chủ động.' } },
        { from: 5, after: 11, m: 'M6.7 M7.6', k: { 2: 'Đỏ tiên thủ.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 31, t: 'Tiểu Chốt Lập Kỳ Công',
      s: 'Trung Pháo hoành Xe đối Bình Phong Mã: Đen bình Pháo mở đường Xe không cấp bách, rồi thúc Chốt biên định xây công sự cánh phải. Đỏ phế Chốt biên đột kích — mượn lực phát lực: Đen ăn Chốt thì song Xe liên thủ thành bá vương Xe; Đen bình Pháo biên thì Đỏ dần thâm nhập.',
      c: `<p>Đỏ thăng Pháo tuần hà cầu biến (thường Xe bình 4 thành thế thịnh hành). Đen <strong>bình Pháo mở đường Xe</strong> — không cấp bách (nên Mã tiến 6 có mục tiêu). Đỏ nhảy Mã, <strong>tháo Trung Pháo</strong> kịp thời chuyển đổi hình trận. Đen <strong>thúc Chốt biên</strong> chuẩn bị cao Xe tăng công sự cánh phải (đáng tin hơn: Xe tiến 3).</p>
<p>Đỏ xét kỹ chân tơ kẽ tóc: <strong>phế Chốt biên đột kích</strong> — nước đặc sắc, mới lạ! Đen có 2 cách:</p>
<ul>
<li><strong>Ăn Chốt</strong> (mạch chính): song Xe Đỏ liên thủ đoạt Chốt thành thế <strong>bá vương Xe</strong>; cánh trái Đen trống trải khó tiếp viện. Đỏ đổi Chốt linh hoạt Mã phát triển toàn cục — chiếm tiên lớn.</li>
<li><strong>Bình Pháo biên</strong>: làm chậm thế công một phần (Pháo tiến 1 phòng thủ vô bổ — Pháo tiến 3 có sức kiềm chế hơn). Đỏ bình Xe yểm hộ Chốt qua sông, dần thâm nhập cánh phải Đen — ưu thế lớn.</li>
</ul>
<h2>Bài học</h2>
<p>Kế hoạch thúc Chốt biên của Đen phá sản hoàn toàn. Trong tấn công, tiểu Chốt cũng có thể lập kỳ công!</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 B7.1 B7.1 M8.7 M2.3 X1.1 V3.5 P8.2 P8-9 M7.6 S4.5 P5-6 B1.1 B9.1 B1.1 X1-9 X8.3 X9.3 X1-3 V7.5 B3.1 B7.1 V5.3 B3.1 B7.1 Xs-8 V3/5',
      k: {
        11: 'Thăng Pháo tuần hà — cầu biến.',
        12: 'Bình Pháo mở đường Xe — không cấp bách (nên Mã tiến 6).',
        15: 'Tháo Trung Pháo kịp thời — chuyển đổi hình trận linh hoạt.',
        16: 'Thúc Chốt biên chuẩn bị cao Xe (đáng tin hơn: Xe tiến 3).',
        17: 'Phế Chốt biên — đặc sắc, mới lạ! Đen: ăn Chốt hay bình Pháo?',
        19: 'Song Xe liên thủ đoạt Chốt — có lực.',
        22: 'Tránh đổi bắt buộc — nếu không cánh phải càng trống.',
        27: 'Đổi Chốt linh hoạt Mã — ưu thế dần mở rộng.',
        30: 'Đỏ chiếm tiên thủ lớn.',
      },
      h: { 17: 'p091_0' },
      v: [
        { from: 'main', after: 10, m: 'X1-4', k: { 1: 'Thế trận thịnh hành.' } },
        { from: 'main', after: 11, m: 'M7.6', k: { 1: 'Có tính mục tiêu hơn.' } },
        { from: 'main', after: 15, m: 'X8.3 V7.5 B5.1', k: { 3: 'Đen kiên trì phòng thủ chờ biến.' } },
        { from: 'main', after: 16, m: 'V7.5 X1.3', k: { 1: 'Chậm chạp…', 2: '…chiến cơ vụt mất.' } },
        { from: 'main', after: 24, m: 'B5.1 Xt.1', k: { 2: 'Đen cũng khó chơi.' } },
        { from: 'main', after: 17, m: 'P2-1 M6.7 P1.1 X1-7 X8.3 B7.1 X1-2 X9-8 B1.1 P8.3 X2-4 S6.5 M7.6 M7/9', k: { 1: 'Bình Pháo biên — kế tạm thời.', 3: 'Phòng thủ vô bổ (Pháo tiến 3 kiềm chế tốt hơn).', 4: 'Bình Xe yểm hộ Chốt qua sông — chọn điểm chính xác.', 14: 'Đen khó tìm kế phòng thủ trước Chốt 7 tiến — Đỏ ưu thế lớn.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 32, t: 'Vận Pháo Như Thần',
      s: 'Trung Pháo hoành Xe thất lộ Mã đối Bình Phong Mã bổ Tượng trái: Đỏ nhảy Mã mang nghi vấn, Đen tiến Pháo phản kích mãnh liệt rồi bình Pháo đường sườn thâm trầm. Đỏ bình Xe hay tiến Pháo đè Xe đều rơi vào khốn cuộc trước Pháo Đen xuất thần nhập hóa.',
      c: `<p>Đen <strong>bổ Tượng trái</strong> — trận doanh cánh phải rắn chắc nhưng đường xuất Xe phải giảm; hoán đổi với Tượng 3 thành hai hệ thống phòng ngự lớn chống Trung Pháo hoành Xe thất lộ Mã. Đỏ <strong>nhảy Mã</strong> — nước mang nghi vấn (thường Chốt giữa, Pháo tiến 2 hoặc Xe biên tiến).</p>
<p>Đen <strong>tiến Pháo phản kích mãnh liệt</strong> — cũng là cách hay nhất giải quyết xuất Xe cánh phải. Đỏ phi Tượng biên phòng thủ trước — dụng tâm khổ sở. Đen <strong>bình Pháo đường sườn</strong> — thâm trầm có lực, hàm súc hơn nhiều so với Pháo bình 7 trực tiếp; xuất Xe kiềm chế Pháo — "giương cung nhưng không bắn". Đỏ có 2 cách:</p>
<ul>
<li><strong>Bình Xe sườn</strong> (mạch chính): Đen lại bình Pháo đánh Chốt — kịp thời làm suy yếu hình trận Đỏ trong vô hình. Mã Đen đạp Chốt biên "như vào chốn không người"; Xe trái áp cảnh — hình trận Đỏ tán loạn.</li>
<li><strong>Tiến Pháo đè Xe</strong>: Đen "công không quên thủ" bình Xe; vận quân linh hoạt, đánh lui thế Đỏ rồi mặc sức tấn công.</li>
</ul>
<h2>Bài học</h2>
<p>Nước Pháo bình sườn ở hồi thứ 8 là đặc sắc nhất — hàm chứa uy hiếp và dẫn ly, gian xảo, ý vị sâu xa, đẩy Đỏ vào cảnh tiến thoái lưỡng nan.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 B7.1 B7.1 M8.7 M2.3 X1.1 V7.5 X1-4 S6.5 M7.6 P2.4 V3.1 P2-4 X9-8 X1-2 X4-6 P4-7 P8.6 P8/1 P8/1 B7.1 M6.7 M7.8 V1.3 M8.9 M3.1 P7.3 Tg5.1 P8-9 X6.1 P9.5 P5-2 X8.6',
      k: {
        10: 'Bổ Tượng trái — cánh phải rắn chắc, đường xuất Xe phải giảm.',
        13: 'Nhảy Mã — nước mang nghi vấn.',
        14: 'Tiến Pháo phản kích mãnh liệt!',
        15: 'Phi Tượng biên phòng thủ trước — dụng tâm khổ sở.',
        16: 'Bình Pháo đường sườn — thâm trầm có lực!',
        18: 'Giương cung nhưng không bắn — phục Pháo tiến 1 quấy nhiễu. Đỏ: bình Xe hay tiến Pháo?',
        20: 'Bình Pháo đánh Chốt — kịp thời làm suy yếu hình trận Đỏ.',
        21: 'Tiến Pháo đè Xe — xu thế lớn.',
        24: 'Thúc Chốt 7 — tập kích cánh trái Đỏ.',
        26: 'Công thủ lưỡng lợi.',
        28: 'Mã đạp Chốt biên — như vào chốn không người.',
        35: 'Lựa chọn duy nhất.',
        36: 'Xe trái áp cảnh — hình trận Đỏ tán loạn, khó cứu vãn.',
      },
      h: { 18: 'p094_0' },
      v: [
        { from: 'main', after: 12, m: 'B5.1', k: { 1: 'Thường gặp hơn — biến hóa phức tạp.' } },
        { from: 'main', after: 15, m: 'P2-7 X9-8 X1-2 P8.6', k: { 4: 'Mỗi bên công một cánh — Đỏ khá chủ động.' } },
        { from: 'main', after: 20, m: 'X6-2 P8.4 S4.5 X2.5', k: { 4: 'Đỏ không cách nào chấp nhận.' } },
        { from: 'main', after: 25, m: 'P7-8 P8-5 V3.5 M7.5', k: { 4: 'Đỏ cướp tiên làm loạn.' } },
        { from: 'main', after: 34, m: 'Tg5-6 P9.2', k: { 2: 'Đỏ càng khó ứng phó.' } },
        { from: 'main', after: 18, m: 'P8.6 P4.1 M6.7 X2-1 P8/6 P8.1 X4.5 M7.8 X4-3 M8.7 S6.5 P4-3 M7/6 P3-7 P8-3 P8.6 V1/3 P8-9', k: { 1: 'Tiến Pháo đè Xe — mong đối công tạo chiến cơ.', 4: 'Công không quên thủ!', 18: 'Đen vận quân linh hoạt, đánh lui thế Đỏ rồi mặc sức tấn công.' } },
        { from: 5, after: 22, m: 'X8.7 X1.1 P5/1 P4-9', k: { 4: 'Đen đoạt Tượng chiếm ưu.' } },
        { from: 5, after: 24, m: 'M7/6 X1-2', k: { 2: 'Đen lập tức phản tiên.' } },
        { from: 5, after: 18, m: 'X8.1 X2.5 M6.7 X2-3 X4-7 P4-3', k: { 6: 'Mã Đỏ khó thoát.' } },
      ],
      kq: 'den',
    },
    {
      n: 33, t: 'Công Thủ Vẹn Toàn',
      s: 'Trung Pháo hoành Xe thất lộ Mã đối Bình Phong Mã: Đỏ thăng Pháo tuần hà công thủ vẹn toàn; Đen tiến Xe quá hà nôn nóng rồi bình Xe ăn Chốt — cô quân thâm nhập. Đỏ tháo Pháo dẫn dụ vào vòng vây, Xe xuống hoành 2 "đè lưng bóp cổ": bổ Sĩ phải thì mất quân, bổ Sĩ trái thì cánh trái trống rỗng.',
      c: `<p>Đỏ dùng <strong>hoành Xe thất lộ Mã</strong> — trong nhu có cương, công chắc thủ vững. Đen bình Pháo mở đường Xe trái. Đỏ <strong>thăng Pháo tuần hà</strong>; Đen <strong>tiến Xe quá hà</strong> nôn nóng phản kích (chính xác: Mã tiến 8 công cánh bên). Đỏ tháo Pháo chỉnh hình — trong công có thủ, dẫn dụ vào vòng vây; Đen <strong>bình Xe ăn Chốt</strong> khinh suất — cô quân thâm nhập (sáng suốt hơn: bổ Sĩ).</p>
<p>Đen Pháo nổ Chốt biên cứu Xe (bất đắc dĩ). Đỏ <strong>tiến Xe xuống hoành 2</strong> — "đè lưng bóp cổ". Đen có 2 cách:</p>
<ul>
<li><strong>Bổ Sĩ phải</strong> (mạch chính): Đỏ bổ Sĩ, tung lưới bắt Xe Pháo; <strong>thoái Pháo</strong> — chiến thuật tinh diệu khiến Đen không thoát khốn cảnh. Nước sát muộn cung — Đen mất quân.</li>
<li><strong>Bổ Sĩ trái</strong> né nguy hiểm muộn cung — thấy chiêu đỡ chiêu. Đỏ thoái Xe cơ trí, dùng Mã đổi Pháo đơn giản có lực, <strong>diệu kế đột phá Chốt 7</strong> — cánh trái Đen mỏng yếu dễ sụp đổ.</li>
</ul>`,
      m: 'P2-5 M8.7 M2.3 X9-8 B7.1 B7.1 M8.7 M2.3 X1.1 V3.5 X1-4 P8-9 P8.2 X8.6 P5-6 X8-7 V7.5 P9.4 X4.7 S4.5 S6.5 P2/1 P8/1 X7.1 P6-3 P2-6 P8-1 P6-9 P1-3',
      k: {
        11: 'Hoành Xe thất lộ Mã — trong nhu có cương, khống chế Mã Đen.',
        12: 'Bình Pháo mở đường Xe trái.',
        14: 'Tiến Xe quá hà nôn nóng (chính xác: Mã tiến 8).',
        15: 'Tháo Pháo chỉnh hình — dẫn dụ vào vòng vây.',
        16: 'Bình Xe ăn Chốt — khinh suất, cô quân thâm nhập.',
        18: 'Pháo nổ Chốt biên cứu Xe — bất đắc dĩ.',
        19: 'Xe xuống hoành 2 — đè lưng bóp cổ! Đen: Sĩ 4.5 hay Sĩ 6.5?',
        21: 'Bổ Sĩ — chuẩn bị tung lưới bắt Xe Pháo.',
        22: 'Thoái Pháo đuổi Xe trước.',
        23: 'Chiến thuật tinh diệu!',
        29: 'Nước sát muộn cung — Đen không tránh khỏi mất quân.',
      },
      h: { 19: 'p097_0' },
      v: [
        { from: 'main', after: 10, m: 'X1-6 M7.6 M7.6 M6.4 X6.3 P8-7 P8-7 P2.4', k: { 8: 'Đen hài lòng.' } },
        { from: 'main', after: 13, m: 'M7.8 X4-2 P2.2', k: { 3: 'Phục Pháo bình 8 đánh Xe — Đen đối kháng cân bằng.' } },
        { from: 'main', after: 15, m: 'S4.5', k: { 1: 'Tĩnh quan kỳ biến — tuy hậu thủ nhưng không trở ngại lớn.' } },
        { from: 'main', after: 17, m: 'X7-8 M3.4 X8-5 P6.5 X5-3 P6-8 X3.1 M4.6 X3-5 S6.5 X1-3 X4.7 X5/3 X9-6', k: { 14: 'Đại quân Đỏ áp cảnh, Đen khó phòng bị.' } },
        { from: 'main', after: 18, m: 'M3.1 X7-9 P6.1 X9/2 X4.7 S4.5', k: { 6: 'Đen có thể cố thủ.' } },
        { from: 'main', after: 21, m: 'P9-5 M3.5 X7-5 P6.5 X5-3 P6-8 X3.1 P8-5', k: { 8: 'Đen sụp đổ nhanh.' } },
        { from: 'main', after: 22, m: 'X4/2 P9-5 M3.5 X7-5 P6.5 X5-3 P6-3 X3.1 P3-7 X3-2 P8-9 X1-3 P7-9 B1.1', k: { 1: 'Chậm chạp…', 14: '…Đen bỏ trước đoạt sau, Đỏ phí hết công sức.' } },
        { from: 'main', after: 25, m: 'P9-2 X4/4 M7/9 B7.1', k: { 4: 'Phục Xe bình 8 tróc đôi — Đỏ chiếm hết ưu thế.' } },
        { from: 'main', after: 19, m: 'S6.5 S6.5 P2/1 X4/2 P9-5 M3.5 X7-5 P6.5 X5-3 P6-3 X3.1 B7.1 V5.3 P8-2 S5/6 P2.5 S4.5 X4-3', k: { 1: 'Bổ Sĩ trái — thấy chiêu đỡ chiêu, khá ngoan cường.', 4: 'Cơ trí — kịp điều chỉnh phương án.', 6: 'Dùng Mã đổi Pháo — đơn giản có lực.', 12: 'Diệu kế đột phá — cánh trái Đen mỏng yếu.', 18: 'Đen không cách nào tổ chức phòng ngự — dễ sụp đổ.' } },
        { from: 8, after: 22, m: 'P8/1 X7.1 P6-3 P2-6 P8-1 M7.8', k: { 6: 'Đỏ không thu hoạch được gì.' } },
      ],
      kq: 'do',
    },
    {
      n: 34, t: 'Phá Vỡ Xiềng Xích',
      s: 'Trung Pháo hoành Xe thất lộ Mã đối Bình Phong Mã: Đen xuất Xe sát sườn Tướng mong phong tỏa lớn — quên xiềng xích của Pháo quá hà thành nguy cơ ngầm. Đỏ hồi Mã kim thương lay động thế phong tỏa; Đen bình Xe thì Pháo Đỏ giáng đòn phủ đầu, tiến Pháo đổi quân thì Đỏ vẫn nắm ưu.',
      c: `<p>Đen bổ Sĩ củng cố (cũng có Pháo bình 9, Pháo tiến 2 — biến thịnh hành). Đỏ xông Chốt giữa phòng Pháo đánh Chốt, triển khai thế công trung lộ. Đen <strong>xuất Xe sát sườn Tướng</strong>, định nước sau chiếm tuyến Chốt — tạo thế phong tỏa lớn: suy nghĩ đơn phương; xiềng xích của Pháo quá hà thành nguy cơ ngầm (nên Xe bình 2 bảo vệ Pháo).</p>
<p>Đỏ <strong>hồi Mã kim thương</strong> — cảnh giác có lực, lay động xiềng xích phong tỏa. Đen có 2 cách:</p>
<ul>
<li><strong>Xe chiếm tuyến Chốt</strong> (mạch chính): quay Xe bảo vệ Pháo đã muộn. Đỏ <strong>bình Pháo</strong> như đánh đòn phủ đầu; Mã ra biên, Pháo về giữa, xông Chốt cắt đứt liên hệ — cánh phải Đen mở toang.</li>
<li><strong>Tiến Pháo đổi quân</strong>: kế tạm thời, sáng suốt hơn. Đỏ tiến Xe; Đen bình Xe là cách phòng ngự tốt nhất trước mắt — Đỏ nắm chắc ưu thế.</li>
</ul>
<h2>Bài học</h2>
<p>Cứng quá dễ gãy — dưới đòn hồi Mã có lực, kế hoạch phong tỏa của Đen tan thành mây khói.</p>`,
      m: 'P2-5 M8.7 M2.3 M2.3 B7.1 B7.1 M8.7 X9-8 X1.1 V3.5 X1-4 S4.5 P8-9 P2.4 B5.1 P8.4 X9-8 X1-4 M3/1 X4.6 P5-2 X8-9 M1.2 X4-7 P2-5 X7-8 P5.1 P2-3 V7.5',
      k: {
        12: 'Bổ Sĩ củng cố — có thể chọn.',
        15: 'Phòng Pháo đánh Chốt, thuận thế triển khai trung lộ.',
        18: 'Xe sát sườn Tướng — suy nghĩ đơn phương (nên Xe bình 2 bảo vệ Pháo).',
        19: 'Hồi Mã kim thương — cảnh giác có lực! Đen: Xe tiến 6 hay Pháo tiến 1?',
        20: 'Quay Xe bảo vệ Pháo đã muộn.',
        21: 'Đòn phủ đầu!',
        27: 'Thoáng một cái đã cắt đứt liên hệ các quân Đen.',
        29: 'Cánh phải Đen mở toang — khó mà phòng cho được.',
      },
      h: { 19: 'p099_0' },
      v: [
        { from: 'main', after: 14, m: 'X9-8 P2-7 V3.1 B7.1 X8.7 X1-3', k: { 6: 'Mỗi bên công một cánh, kiêng dè lẫn nhau.' } },
        { from: 'main', after: 17, m: 'X1-2', k: { 1: 'Bảo vệ Pháo — bình yên vô sự, hai bên giằng co.' } },
        { from: 'main', after: 19, m: 'X4-2 P5-2 X8-9 M1.2 P2-8 X8.9 M3/2 X4-8', k: { 8: 'Xe trái Đen bị ép vào góc, cánh phải trống rỗng — Đỏ thừa thắng truy kích.' } },
        { from: 'main', after: 19, m: 'P8.1 X8.3 P8-3 X8.4 X4-3 P9.4 P3-4 P9/2 P4/5 X8/1', k: { 1: 'Tiến Pháo đổi quân — kế tạm thời, sáng suốt hơn.', 6: 'Cách phòng ngự tốt nhất trước mắt — tạm giữ an toàn tuyến đáy.', 10: 'Đỏ nắm chắc ưu thế.' } },
        { from: 3, after: 23, m: 'X4.2 P9.4', k: { 2: 'Sau đó có thể chìm Pháo đáy tấn công.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 35, t: 'Làm Theo Quy Củ',
      s: 'Trung Pháo đối Bình Phong Mã: Đen bổ Sĩ "vô kỳ tự bổ" — định hình quá sớm. Đỏ thăng Pháo tuần hà cương nhu hội đủ, mời đổi Chốt 3 đúng tiết tấu: Đen chấp nhận đổi thì Đỏ thực hiện kế hoạch thuận lợi, đoạt Tượng; Đen tiến Pháo chống chọi thì Xe Pháo bị kiềm chế khó giải thoát.',
      c: `<p>Đen <strong>bổ Sĩ</strong> — cứng nhắc rập khuôn, định hình quá sớm ("vô kỳ tự bổ"), cho Đỏ thời cơ tốt (khá có sức bật: Pháo tiến 4 mưu phản kích; dù bổ cờ cũng nên phi Tượng 3).</p>
<p>Đỏ <strong>thăng Pháo tuần hà</strong> — cục diện Đen trông an toàn, Đỏ phải nắm cơ hội mở rộng chủ động. Đỏ <strong>mời đổi Chốt 3</strong> kịp thời, nắm tiết tấu Pháo tuần hà. Đen có 2 cách:</p>
<ul>
<li><strong>Chấp nhận đổi Chốt</strong> (mạch chính): kế hoạch Đỏ thuận lợi. Đỏ Xe tiến chặt chẽ, Đen nhảy Mã không cam bị kiềm chế; Đỏ tháo Pháo bình 6 tinh tế (bình 4 thì Đen thoát kiềm chế), Pháo tiến đoạt Tượng — tiến triển về vật chất.</li>
<li><strong>Tiến Pháo</strong>: Mã trái xuất trận mong kiềm chế; nhưng sau mấy hồi giao tranh, Xe Pháo Đen vẫn bị kiềm chế khó giải thoát — Đỏ chủ động.</li>
</ul>
<h2>Bài học</h2>
<p>Không phải cục diện nào bổ Sĩ cũng phát huy tác dụng củng cố. Nếu Đen phi Tượng 3 ở hồi thứ 5 thì cục diện cải thiện, vẫn có thể chiến đấu.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 X1-2 M2.3 B7.1 B7.1 M8.7 S4.5 P8.2 V3.5 B3.1 B7.1 P8-3 P2.4 X2.6 M7.6 X2/1 M6/7 X2.1 M7.6 X2/1 M6.7 X9-8 X1-2 P5-6 X8.1 V7.5 P2/5 X2/2 P8-7 P3.5 V5/7 X2-3',
      k: {
        10: 'Bổ Sĩ — định hình quá sớm (nên Pháo tiến 4, hoặc phi Tượng 3).',
        11: 'Thăng Pháo tuần hà — nắm cơ hội tốt mở rộng chủ động.',
        13: 'Mời đổi Chốt 3 kịp thời. Đen: đổi Chốt hay tiến Pháo?',
        14: 'Chấp nhận đổi — kế hoạch Đỏ thuận lợi.',
        17: 'Chặt chẽ.',
        18: 'Không cam chịu bị kiềm chế.',
        22: 'Bắt buộc.',
        27: 'Tháo Pháo bình 6 — tinh tế.',
        33: 'Hay!',
        35: 'Đoạt Tượng — Đỏ tiến triển về vật chất.',
      },
      h: { 13: 'p101_0' },
      v: [
        { from: 'main', after: 9, m: 'P2.4', k: { 1: 'Có sức bật — mưu phản kích.' } },
        { from: 'main', after: 11, m: 'P2.2 X2.6 M7.6 M7.6', k: { 4: 'Ép đổi Mã — Xe Pháo cánh trái Đen thoát căn, Đỏ ưu thế lớn.' } },
        { from: 'main', after: 15, m: 'P8.4 M3.4 X8.5 M4.6 X8-7 X2.3 X7-3 X9-8', k: { 8: 'Hình trận Đen nhiều điểm yếu.' } },
        { from: 'main', after: 16, m: 'X9-8 P8.4', k: { 2: 'Đen có cơ hội đối kháng.' } },
        { from: 'main', after: 17, m: 'P8-9 X2-3 X8.2 X9-8 X1-2 P5-4', k: { 6: 'Quân lực Đen bị kiềm chế — Đỏ rõ ràng chiếm ưu.' } },
        { from: 'main', after: 23, m: 'M6/7 X2.1 M7.6 X2/1', k: { 4: '"Hai đánh một đánh trả" — theo luật hiện hành Đen phải đổi biến.' } },
        { from: 'main', after: 26, m: 'P5-4 X8.1', k: { 2: 'Phục Xe bình 6 / bình 7 thoát kiềm chế — công sức Đỏ bỏ phí.' } },
        { from: 'main', after: 13, m: 'P2.2 X2.6 M7.6 B3.1 P2-7 M3.2 M6.7 V3.1 X1-4 V1.3', k: { 1: 'Tiến Pháo.', 3: 'Mã trái xuất trận — mong kiềm chế Đỏ.', 10: 'Xe Pháo Đen bị kiềm chế khó giải thoát — Đỏ chủ động.' } },
        { from: 'main', after: 13, m: 'X1-4 B3.1', k: { 2: 'Đỏ đắc thế dễ đi.' } },
        { from: 7, after: 15, m: 'B7.1 P8-3 M7.6 X2/3 X8.1 X9-8 X1-2 M3.4 X8-7 P3.5 X7/1 X2.4', k: { 12: 'Đỏ đánh phủ đầu chiếm ưu.' } },
        { from: 7, after: 19, m: 'P7.1 X2-3 P7-2 M2.4 P2/2 X9-8 X1-2 X3-2', k: { 1: 'Sai lầm…', 8: '…Đỏ khống chế toàn cục.' } },
      ],
      kq: 'uu-do',
    },
    {
      n: 36, t: 'Binh Bại Ven Sông',
      s: 'Trung Pháo tuần hà Pháo đối Bình Phong Mã phi Tượng trái: Đen khử Chốt rồi thăng Xe tuần hà — kế hoạch không thỏa đáng. Đỏ bình Xe tróc Pháo cướp tiên: Đen nhảy Mã đánh Xe tưởng tiên mà hậu; Đen thăng Pháo tuần hà thì Đỏ hiến Pháo miệng hổ — sấm động giữa trời quang.',
      c: `<p>Đỏ <strong>thăng Pháo tuần hà</strong>: mời đổi Chốt 3 mở đường Mã phải, yểm hộ Mã trái chiếm đầu sông, tiêu trừ thủ đoạn Pháo tiến 4 của Đen. Đen <strong>phi Tượng trái</strong> chuẩn bị hoành Xe — biến chủ lưu đối kháng.</p>
<p>Đỏ đổi Chốt thông đường Mã. Đen thuận tay khử Chốt rồi <strong>thăng Xe tuần hà</strong> — trông ung dung có trình tự, thực ra tự tạo nghi hình (nên Pháo tiến 2, nhạy bén có lực). Đỏ <strong>bình Xe tróc Pháo</strong> — cướp tiên. Đen có 2 cách:</p>
<ul>
<li><strong>Nhảy Mã đánh Xe</strong> (mạch chính): có vẻ tiên thực ra hậu; Đỏ bình Pháo cản đòn đã chuẩn bị, nhảy Mã xuất kích chặt chẽ; Xe tiến thực dụng — Đỏ nắm chắc ưu thế.</li>
<li><strong>Thăng Pháo tuần hà</strong>: tính toán không chu toàn — "đã rét vì tuyết lại giá vì sương". Đỏ <strong>hiến Pháo miệng hổ</strong> — sấm động giữa trời quang! Đen phi Tượng khử Pháo thì Đỏ liên hoàn sát thủ, hơn quân; Đen đổi Mã thì Đỏ diệu kế đột phá Chốt 7; Đen tiến Xe tróc Mã thì Đỏ thoái Xe quyết đoán — Đen không sức chống chọi.</li>
</ul>
<h2>Bài học</h2>
<p>Đen bất lợi vì hai điểm: dễ dàng chấp nhận đổi Chốt khiến Đỏ thuận lợi; mù quáng mưu phản kích, đánh giá thấp tiềm lực Đỏ — binh bại ven sông.</p>`,
      m: 'P2-5 M8.7 M2.3 X9-8 B7.1 B7.1 M8.7 M2.3 P8.2 V7.5 X1-2 X1.1 X9.1 X1-4 B3.1 B7.1 P8-3 X4.3 X9-8 M7.8 P3-2 P2.2 M3.4 X4-6 M4.2 P2-8 P2.3 X8.2 X8.5',
      k: {
        9: 'Thăng Pháo tuần hà — tiến thủ vững chắc, tiêu trừ Pháo tiến 4 của Đen.',
        10: 'Phi Tượng trái — chuẩn bị hoành Xe.',
        15: 'Đổi Chốt thông đường Mã.',
        18: 'Khử Chốt rồi thăng Xe tuần hà — kế hoạch không thỏa đáng (nên Pháo tiến 2).',
        19: 'Bình Xe tróc Pháo — cướp tiên! Đen: nhảy Mã hay thăng Pháo?',
        20: 'Nhảy Mã đánh Xe — có vẻ tiên thực ra hậu.',
        23: 'Lập tức nhảy Mã xuất kích — chặt chẽ.',
        26: 'Đành chịu.',
        29: 'Thực dụng — Đỏ nắm chắc ưu thế.',
      },
      h: { 19: '!p104_0' },
      v: [
        { from: 'main', after: 15, m: 'P2.2 X2.6 X4.6 X9-7 B7.1 P8-3 M7.6 X2-4 X8-7', k: { 1: 'Nhạy bén có lực.', 9: 'Đen phản khách vi chủ.' } },
        { from: 'main', after: 15, m: 'P2.2 B3.1 M7.8 M3.2 V5.7 X9-3 X4.3 P5-2 V7/5', k: { 9: 'Hai bên giằng co.' } },
        { from: 'main', after: 22, m: 'P2.3 X8.2 M3.4 X4-6 M4.2 X8.2 X2.5 P2-8', k: { 8: 'Đen vượt qua khó khăn.' } },
        { from: 'main', after: 28, m: 'X8.6 M3/5 P5.4 X6-5 M7.6 X5/1', k: { 6: 'Đen phản kém thành thắng.' } },
        { from: 'main', after: 19, m: 'P2.2 X2.6 M7.6 P3.1 V5.7 M3.4 V7/5 X2.1 X8.2 M4.6 M6.7 X8.4 X8.2 B7.1', k: { 1: 'Thăng Pháo tuần hà — tính toán không chu toàn.', 4: 'Hiến Pháo miệng hổ — sấm động giữa trời quang! Đen: Tượng 5.7, Mã 6.5 hay Xe 4.3?', 5: 'Vội vàng phi Tượng khử Pháo — phản ứng máy móc.', 6: 'Liên hoàn sát thủ!', 8: 'Hay!', 14: 'Đỏ hơn quân thắng chắc.' }, h: { 4: '!p105_0' } },
        { from: 4, after: 21, m: 'P8-9 X2-3 X8.2 P5-4 S6.5 M3.4', k: { 6: 'Đỏ chiếm hết tiên thủ.' } },
        { from: 4, after: 23, m: 'M6.5 M3.5 X4-7 B7.1 B3.1 M7.6 B3.1 M6.5 M3.5 P5.4 S6.5 M5.7 P2-3 V7.5', k: { 1: 'Đổi quân cải thiện cục diện…', 4: 'Diệu kế đột phá!', 5: 'Bắt buộc.', 14: 'Đỏ có ưu thế binh chủng và vị trí, tiền đồ tươi sáng.' } },
        { from: 4, after: 23, m: 'X4.3 X8.4 B3.1 X8.3 S6.5 M3.2 M6.5 X8/5 M5.3 S6.5 X4/2 P3/3 X4-3 P3-7 X3.2 M2.4', k: { 1: 'Tiến Xe tróc Mã — nhiễu loạn để đục nước thả câu.', 4: 'Hay!', 5: 'Bất đắc dĩ.', 8: 'Thoái Xe tróc Mã — quyết đoán, lòng có toàn cục.', 10: 'Nước giải duy nhất.', 12: 'Hay!', 16: 'Quân Đen bị kiềm chế, không sức chống chọi.' } },
      ],
      kq: 'uu-do',
    },
    // @@END — mốc nối thêm cuộc
  ],
};
