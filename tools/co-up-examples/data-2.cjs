// Ví dụ nước đi cho bài giảng cờ úp — Sơ cấp 2 (#5–#10) + Nâng cao 1 (#1–#4).
// Soạn lại 07/10/2026: mọi nước được engine chấm (review.mjs --data), không còn nước treo quân / tự sát.
module.exports = {
  'co-up-lien-ket-quan-trong-hinh-co-yeu': {
    moves: [
      ['a3a4', 'R', 'Đỏ lật Xe ở tốt biên.'],
      ['b9c7', 'a', 'Đen biết mình sẽ yếu nên dựng tường trước: quân ô Mã lên c7, lật ra Sĩ — Sĩ cờ úp đi khắp bàn, đứng c7 liên kết với các nắp quanh cung.'],
      ['i3i4', 'R', 'Đỏ lật thêm Xe thứ hai — Đen một chọi hai Xe.'],
      ['a6a5', 'c', 'vừa dựng tường vừa tạo nguy cơ: đấm tốt biên ngay trước Xe a4, lật ra Pháo. Pháo a5 dọa nhảy qua Xe a4 ăn nắp Xe úp a0 của Đỏ.'],
      ['h2h9', 'C', 'Đỏ chọn phản công thay vì chống đỡ: Pháo giả vật xuống ăn nắp Mã đáy h9 qua ngòi h7 (lật Pháo).'],
      ['a5a0', null, 'Đen thực hiện đe doạ: Pháo nhảy qua Xe a4 ăn nắp Xe úp a0. Bên yếu tạo được nguy cơ thật thì bên mạnh không thể thong thả mở hết quân.'],
      ['a4a9', null, 'Đỏ ăn lại nắp Xe giả a9 (cột biên đã thông). Ván cờ thành loạn chiến — đúng điều bên yếu cần: cờ úp không có phòng ngự tuyệt đối, chỉ co về thủ là thua dần.'],
    ],
  },
  'co-up-trung-cuoc-loan-chien': {
    start: '3akxx2/r8/5P1c1/x8/6R2/9/2X1X4/1X7/9/X2K5',
    moves: [
      ['g5g9', null, 'Xe tiến xuống ăn nắp Tượng g9 ở hàng đáy, phối hợp với Tốt f7 đánh vào cửa Sĩ: nắp Sĩ f9 bị ghim (rời đi là Xe chiếu Tướng theo hàng đáy). Một mình Tốt vô dụng — phải có Xe đi kèm.'],
      ['a8d8', null, 'Đen không chống đỡ thụ động mà phản đòn ngay: Xe bình sang lộ 4 chiếu Tướng Đỏ theo cột d.'],
      ['d0e0', null, 'Tướng Đỏ tránh sang cột 5 (nắp e3 che mặt Tướng).'],
      ['d8c8', null, 'Xe Đen bình sang lộ 3, nhắm thẳng xuống nắp c3 của Đỏ. Loạn chiến: cả hai bên cùng có đường công.'],
      ['e3e4', 'P', 'Đỏ không rút Xe về thủ mà đẩy tốt đầu (lật Tốt), mở thêm quân; Xe g9 vẫn đè cửa Sĩ. Loạn chiến thì phải giữ được đòn công của mình.'],
      ['c8c3', null, 'Xe Đen lao xuống ăn nắp c3, uy hiếp hàng dưới Đỏ.'],
      ['a0a6', 'R', 'nắp Xe góc của Đỏ tiến thẳng ăn nắp a6 (lật Xe thật) — thêm một Xe vào trận. Câu hỏi đầu tiên của loạn chiến: mình đã ăn được gì, đối phương dọa gì. Đỏ có hai Xe hoạt động nên chọn đánh tiếp thay vì về thủ.'],
    ],
  },
  'co-up-phan-cong-trong-hinh-thua-quan-kem-the': {
    moves: [
      ['c3c4', 'P', 'Đỏ mở tốt.'],
      ['a6a5', 'r', 'Đen lật Xe — Đỏ đang kém thế.'],
      ['b2f2', 'R', 'Pháo giả 8 bình 4 lật ra Xe, nhắm vào cánh trái Đen trong khi quân mình dồn cánh phải — "vẽ dần" một cơ hội tấn công. Hỏi trước: mình cần đạt gì để thắng?'],
      ['i6i5', 'p', 'Đen đấm tốt biên.'],
      ['a3a4', 'C', 'tìm Pháo hơn tìm Xe: đấm tốt biên lật ra Pháo, gác biên ngay trước Xe Đen — vừa công vừa thủ (quân a4 có nắp Xe úp a0 đứng sau bảo vệ). Đặt quân đúng ô quan trọng hơn đi tìm Xe.'],
      ['a5e5', null, 'Đen không đổi Xe lấy Pháo mà dồn Xe vào trung lộ, nhắm nắp tốt đầu e3.'],
      ['f2f3', null, 'Xe 4 tiến 1 giữ tốt đầu từ bên cạnh. Mỗi nước của bên yếu đều phải trả lời câu hỏi "nước này để làm gì?" — ở đây là giữ quân, chờ đưa quân tới ô có thể công.'],
    ],
  },
  'co-up-khai-thac-thuc-loi-nho-cau-truc-xau': {
    moves: [
      ['g3g4', 'P', 'Đỏ mở tốt 3.'],
      ['f9e8', 'p', 'Đen lên Sĩ, lật ra Tốt — tốt nhân! Quân ở ô xấu vô giá trị: Tốt này tốn nhiều nước để xử lý, tạo điểm yếu quanh Tướng.'],
      ['h0g2', 'N', 'Đỏ ra Mã.'],
      ['b9c7', 'n', 'Đen ra Mã.'],
      ['b2b6', 'C', 'Pháo 8 tiến 4: dù lật ra quân gì cũng tạo giá trị (ở đây lật Pháo), áp sát cánh có tốt nhân. Không chọn nước cứu quân bất khả thi, nhiều rủi ro.'],
      ['i6i5', 'p', 'Đen đấm tốt biên mở quân.'],
      ['c3c4', 'N', 'Đỏ mở tốt 7 (lật Mã): quân lộ ra ở lộ 3 – lộ 7 đều vào ô thông thoáng, hình Đỏ rộng rãi.'],
      ['a6a5', 'p', 'Đen tiếp tục mở tốt biên. Hai bên bằng quân, nhưng Đen có tốt nhân e8 bịt cửa tướng còn quân Đỏ đứng ô tốt — đó là "thực lợi nhỏ" về không gian và vị trí.'],
    ],
  },
  'co-up-nhung-thoi-diem-can-pha-cach': {
    moves: [
      ['i3i4', 'R', 'Đỏ lật Xe.'],
      ['c6c5', 'p', 'Đen đấm tốt (lật Tốt).'],
      ['h2h9', 'C', 'Pháo giả Đỏ vật xuống ăn nắp Mã h9 qua ngòi h7 (lật Pháo). Đen bị ép: Pháo h9 đứng sát cung tướng, Xe i4 sẵn sàng tràn lên cột biên, Đen chưa có đe doạ nào.'],
      ['i6i5', 'p', 'phá cách: đấm tốt biên thí ngay trước Xe (lật Tốt) — Tốt i5 dọa ăn Xe và có nắp i9 bảo vệ. Không tạo được đe doạ thì chắc thua, nên phải mở đường bằng mọi giá.'],
      ['i4e4', null, 'Xe buộc rời cột biên (sang trung lộ nhắm tốt đầu).'],
      ['i9h9', 'c', 'nắp i9 được giải phóng: đi như Xe sang ăn Pháo h9, lật ra Pháo. Đen gỡ lại quân và có thêm quân mạnh — phá cách đúng lúc thì thế bị ép tan biến.'],
    ],
  },
  'co-up-tan-dung-loi-the-trong-tan-cuoc': {
    start: '4k4/5a3/6n2/9/9/4P4/2N6/9/4A4/3K5',
    moves: [
      ['e4e5', null, 'Tốt đầu qua sông — quân tạo áp lực duy nhất của Đỏ, phải giữ thật kỹ.'],
      ['f8e7', null, 'Sĩ cờ úp ra khỏi cung chặn đường Tốt.'],
      ['c3e4', null, 'Mã đi thẳng vào trung tâm e4, đứng sau lưng Tốt (không đi "Mã quỳ" dễ tắc tướng). Mã và Tốt cùng tạo sức ép.'],
      ['e7f8', null, 'Sĩ Đen lui về giữ cung.'],
      ['d0e0', null, 'Tướng Đỏ chiếm cột 5 sau lưng Tốt: luật lộ mặt Tướng hỗ trợ Tốt tiến lên, Tướng Đen khó đứng ở cột giữa.'],
      ['e9e8', null, 'Tướng Đen lên chặn trước Tốt. Cờ tàn không Xe: hơn quân thì đánh chắc, chọn đường dễ, "lấy thịt đè người" — đừng tìm nước cao siêu.'],
    ],
  },
  'co-up-xu-ly-quan-up-ket-hop-quan-ngua-phuc-tap': {
    moves: [
      ['e3e4', 'P', 'Binh 5 tiến 1: tạo điểm chờ ở trung lộ.'],
      ['b9c7', 'n', 'Đen ra Mã.'],
      ['h2h6', 'C', 'Pháo giả tiến sâu (lật Pháo) ép vào khu Tượng/Mã Đen: dọa ăn nắp h9 qua ngòi h7 và nắp e6 qua ngòi g6 — đối phương không có điểm yếu thì mình phải tạo ra.'],
      ['h9g7', 'b', 'Đen phải chạy nắp h9, lật ra Tượng.'],
      ['i3i4', 'P', 'Tốt e4 chỉ là "vị trí chờ", tự nó không tấn công — Đỏ không đẩy tiếp mà mở thêm quân để huy động lực phối hợp (lật Tốt).'],
      ['a6a5', 'p', 'Đen mở tốt biên.'],
      ['c3c4', 'P', 'Đỏ tiếp tục mở quân. Quân lực = quân đã lộ + số nắp còn lại: ai đưa được quân mạnh vào đúng chỗ trước thì đột phá trước.'],
    ],
  },
  'co-up-chien-luoc-theo-quan-manh-tu-duy-hai-chieu': {
    moves: [
      ['g3g4', 'P', 'Đỏ mở tốt.'],
      ['c6c5', 'p', 'Đen mở tốt.'],
      ['a3a4', 'C', 'Đỏ lật Pháo biên, nhắm nắp Xe giả a9 qua ngòi a6.'],
      ['b9a7', 'a', 'Đen gác chặn cột biên (lật Sĩ).'],
      ['a4e4', null, 'chưa ăn được quân mạnh nào thì phải gây áp lực ngay: Pháo bình 5 chiếu Tướng qua ngòi tốt đầu. Đánh lâu dài khi chưa có lợi thế vật chất chỉ để đối phương thong thả mở quân mạnh.'],
      ['f9e8', 'p', 'Đen lên Sĩ chặn chiếu nhưng lật ra Tốt — tốt nhân bịt cửa tướng. Áp lực đã tạo ra điểm yếu cố định trong hình Đen.'],
    ],
  },
  'co-up-tam-quan-trong-cua-chien-luoc': {
    moves: [
      ['h2e2', 'C', 'Đỏ mở Pháo trung lộ.'],
      ['c6c5', 'n', 'Đen đấm tốt 3, lật ra Mã — Mã c5 đứng ngay trên đường tiến của Đỏ.'],
      ['c3c4', 'R', 'đánh giá rồi mới đi: tốt 7 tiến 1 lật ra Xe, Xe c4 bắt ngay Mã c5 (Mã không có quân nào giữ).'],
      ['i6i5', 'p', 'Mã c5 không có đường thoát an toàn, Đen chấp nhận mất Mã và tranh thủ mở quân (lật Tốt).'],
      ['c4c5', null, 'Xe ăn Mã. Đã hơn quân thì chiến lược là giữ vị, vừa khống chế vừa mở quân — tuyệt đối không đánh gấp.'],
      ['c9e7', 'p', 'Đen lên Tượng (lật Tốt) củng cố trung lộ. Ưu thế lớn mà nóng vội tấn công là mở đường cho đối phương phản đòn.'],
    ],
  },
  'co-up-phong-ngu-khi-cham-quan': {
    moves: [
      ['a3a4', 'R', 'Đỏ lật Xe.'],
      ['c6c5', 'p', 'Đen mở tốt.'],
      ['h2h9', 'C', 'Pháo giả của Đỏ vật xuống ăn nắp h9 (lật Pháo) — quân tấn công nhanh nhất của Đỏ.'],
      ['i9h9', 'r', 'Diệt quân tấn công chứ không đuổi quân phòng ngự: Đen ăn lại ngay Pháo (nắp Xe giả lật ra Xe).'],
      ['b0c2', 'N', 'Đỏ ra Mã.'],
      ['b9c7', 'n', 'Đen ra Mã, liên kết, mở quân cân bằng lực lượng — không bỏ thế để đoạt quân.'],
    ],
  },
};
