// Ví dụ nước đi cho bài giảng cờ úp — Nâng cao 1 (#5–#10) + Nâng cao 2 (#1–#10).
// Bài kèo chấp: bên chấp đi liền các nước đầu (đúng cách chơi chấp nước).
module.exports = {
  'co-up-xu-ly-khi-co-loi-the-lon': {
    moves: [
      ['a3a4', 'R', 'Đỏ lật Xe.'],
      ['c6c5', 'p', 'Đen mở tốt.'],
      ['i3i4', 'R', 'Đỏ lật thêm Xe thứ hai.'],
      ['g6g5', 'p', 'Đen mở tốt.'],
      ['h2e2', 'C', 'Đỏ có hai Xe một Pháo rất sớm — lợi thế lớn. Điều khó bây giờ là giữ, đừng tự đánh mất.'],
      ['b9c7', 'n', 'Đen ra Mã.'],
      ['a4b4', null, 'Không đánh gấp: Xe bình sang lộ 8 nhắm Pháo giả b7, khống chế cánh trái Đen — Pháo giả đứng yên thì bị dọa, bỏ đi thì vỡ cánh. Đánh chậm chắc, tối ưu vị trí quân mạnh, chuyển lợi thế hình thế thành vật chất. Thắng nhanh hay chậm cũng chỉ một điểm.'],
    ],
  },
  'co-up-uu-the-hinh-kem-quan-lien-ket': {
    moves: [
      ['c3c4', 'P', 'Đỏ mở tốt.'],
      ['a6a5', 'r', 'Đen lật Xe ở tốt biên.'],
      ['d0e1', 'A', 'Đỏ lên Sĩ chặn cửa tướng — con Sĩ then chốt.'],
      ['a9a6', 'r', 'Đen lật thêm Xe thứ hai, nhưng hai Xe đứng chồng hàng dọc ở lộ biên (a5–a6): hai Xe hàng dọc chỉ bằng khoảng một Xe. Thẩm thế trước, thẩm quân sau — bên "kém quân" lại đang ưu thế hình.'],
      ['h2i2', 'C', 'Pháo bình biên (lật Pháo) đánh vào cánh phải Đen chỗ quân úp. Mục đích là gây rối để kéo ván về cân bằng, không cầu thắng trực tiếp.'],
    ],
  },
  'co-up-uu-the-lau-dai-tu-lien-ket': {
    moves: [
      ['i3i4', 'R', 'Đỏ lật Xe.'],
      ['a6a5', 'r', 'Đen lật Xe ở tốt biên.'],
      ['i4a4', null, 'Xe Đỏ áp sát đánh Xe Đen (Xe a4 có Tốt a3 bảo vệ).'],
      ['a5a8', null, 'Xe Đen buộc lui về hàng dưới — ở đó Xe chỉ đi được ít nước, hiệu năng giảm.'],
      ['e3e4', 'P', 'Đỏ không vội vật Pháo giả (chưa đủ lực phối hợp để khai thác, lại tự lộ điểm yếu) mà tiếp tục mở quân, giữ liên kết: còn nguyên quân + liên kết chặt thì đánh lâu dài, tiềm năng lớn.'],
    ],
  },
  'co-up-hai-phao-som-kem-luc-gia-tri-phao': {
    moves: [
      ['h2e2', 'C', 'Đỏ lật Pháo trung lộ.'],
      ['b9c7', 'n', 'Đen ra Mã.'],
      ['b2c2', 'C', 'Đỏ lật thêm Pháo — hai Pháo lộ sớm nhưng chưa liên kết.'],
      ['a6a5', 'r', 'Đen lật Xe ở tốt biên — Đỏ kém lực.'],
      ['e3e4', 'P', 'Pháo e2 giờ là "Pháo trống" khống chế trung lộ. Giữ Pháo, không đổi hai Pháo lấy một Mã — trong cờ úp hai Pháo còn nhỉnh hơn một Xe.'],
      ['a5e5', null, 'Đen đưa Xe vào trung lộ ép tốt đầu. Mối nguy lớn nhất của bên kém lực là quân mạnh đối phương xuống trung lộ khi trung lộ mỏng — phải chuẩn bị đỡ từ trước.'],
    ],
  },
  'co-up-the-yeu-trung-cuoc-tao-dot-pha': {
    moves: [
      ['c3c4', 'P', 'Đỏ mở tốt.'],
      ['a6a5', 'r', 'Đen lật Xe.'],
      ['b2c2', 'C', 'Đỏ lật Pháo.'],
      ['i6i5', 'r', 'Đen lật thêm Xe thứ hai — Đỏ thất thế nặng.'],
      ['c2c6', null, 'Thế yếu thì phải đột phá: Pháo vật xuống ăn nắp c6 qua ngòi c4, tạo hỗn loạn.'],
      ['b9c7', 'n', 'Đen ra Mã.'],
      ['c6c9', null, 'Pháo ăn tiếp nắp Tượng c9 qua ngòi Mã c7, lại chiếu Tướng qua ngòi Sĩ d9 — chấp nhận đổi một Pháo lấy hai nắp và phá hình Đen. Thế yếu thì chọn nước táo bạo tạo bước ngoặt, hơn là đánh trầm ổn rồi vẫn thua.'],
    ],
  },
  'co-up-chuyen-hoa-uu-the-mot-sai-lam-chien-luoc': {
    moves: [
      ['g3g4', 'P', 'Giữ Tốt ở thế "lửng" (g4): khống chế và làm bàn đạp cho Mã.'],
      ['b9c7', 'n', 'Đen ra Mã.'],
      ['h0g2', 'N', 'Mã lên giữa, sẵn sàng vào khu tấn công.'],
      ['a6a5', 'p', 'Đen đấm tốt biên.'],
      ['b0a2', 'N', 'Sai lầm chí mạng: Mã ra biên. Mã là quân cận chiến, phải vào trung tâm hoặc khu tấn công; đưa ra biên vừa ngược chiến lược vừa trái kỳ lý.'],
      ['a5a4', null, 'Đen lập tức đẩy Tốt qua sông áp sát đúng cánh có Mã biên — Mã đứng biên ít đường đi, không về giúp được. Một sai lầm chiến lược đủ làm sụp cả ván đang ưu thế.'],
    ],
  },
  'co-up-khai-niem-nen-tang-chap-ba-nuoc': {
    moves: [
      ['b2a2', 'C', 'Kèo chấp ba nước: Đỏ đi liền ba nước. Nước 1 — Pháo biên (lật Pháo).'],
      ['h2i2', 'C', 'Nước 2 — Pháo biên còn lại (lật Pháo).'],
      ['g3g4', 'P', 'Nước 3 — mở một quân lộ 3. "Ba trên" chuẩn: hai Pháo biên + một quân lộ 3/7; hạn chế mở tốt đầu sớm.'],
      ['b9c7', 'n', 'Đen mới đi nước đầu tiên — Đỏ dẫn trước ba nhịp.'],
      ['c3c4', 'P', 'Đỏ giữ lợi thế tốc độ: tiếp tục mở quân thay vì ăn nắp (ăn quân là mất một nước). Đừng đổi tốc độ lấy vật chất.'],
    ],
  },
  'co-up-phat-trien-quan-khai-cuoc-song-ma': {
    moves: [
      ['c3c4', 'N', 'Kèo chấp ba nước. Nước 1 lật ra Mã.'],
      ['e3e4', 'N', 'Nước 2 lại ra Mã — hai Mã đứng gần nhau, cùng khống chế ô d6.'],
      ['g3g4', 'P', 'Nước 3 lật Tốt. Hình hai Mã tương hỗ + một Tốt khoảng 7/10: Tốt Đen khó tiến lên đuổi Mã.'],
      ['i6i5', 'r', 'Đen lộ Xe ở tốt biên.'],
      ['c4b6', null, 'Ưu tiên xử lý quân đã lộ: Mã tiến lên khống chế hàng trên Đen thay vì mở thêm nắp. Đừng vội tấn Sĩ — giữ nhiều lựa chọn về sau.'],
    ],
  },
  'co-up-danh-gia-tinh-huong-song-ma-bien': {
    moves: [
      ['a3a4', 'N', 'Đỏ lật Mã ở tốt biên.'],
      ['c6c5', 'p', 'Đen mở tốt.'],
      ['i3i4', 'N', 'Lại lật Mã biên — hình song Mã biên chỉ đáng khoảng 4 điểm: Mã biên ít đường, không cấm được quân.'],
      ['a6a5', 'p', 'Tốt Đen dọa Mã biên.'],
      ['h2e2', 'C', 'Đỏ lộ Pháo trung lộ.'],
      ['b7b0', 'c', 'Bị đối phương lộ Pháo thì chọn đối công: Pháo 2 tiến 7 (lật Pháo) vật xuống ăn nắp Mã đáy qua ngòi b2 — thay vì Mã 2 tiến 1 bị động.'],
    ],
  },
  'co-up-khai-cuoc-hai-tren-mot-duoi': {
    moves: [
      ['a3a4', 'P', 'Kèo hai trên một dưới: Đỏ đi liền ba nước. Nước 1 (trên) — tốt biên.'],
      ['i3i4', 'P', 'Nước 2 (trên) — tốt biên còn lại.'],
      ['c0e2', 'B', 'Nước 3 (dưới) mở Tượng lên giữa: nước dưới đóng vai phòng ngự, Tượng có thể thành Pháo gánh.'],
      ['b9c7', 'n', 'Đen đi nước đầu.'],
      ['c3c4', 'P', 'Binh 7 tiến 1 tạo liên kết: quân ở lộ 3 và lộ 5 dễ triển khai, bổ trợ nhau. Hình đẹp, đang ưu thì hạn chế đỏ đen, đánh chắc.'],
    ],
  },
  'co-up-ky-nang-danh-gia-tinh-huong-trung-cuoc': {
    moves: [
      ['c3c4', 'C', 'Đỏ lật Pháo ở tốt 7.'],
      ['a6a5', 'r', 'Đen có Xe sớm.'],
      ['g0e2', 'B', 'Đỏ không cố tìm Xe bằng mọi giá mà tối ưu quân đang có: lên Tượng.'],
      ['b9c7', 'n', 'Đen ra Mã.'],
      ['c4e4', null, 'Đóng Pháo đầu, chiếu Tướng qua ngòi e6. Nhiều quân phối hợp (Pháo, Tượng…) thì con Xe đơn độc của Đen trở nên xấu.'],
      ['d9e8', 'a', 'Đen lên Sĩ chặn chiếu. Trước mỗi nước trung cuộc, hỏi ba câu: tình huống ra sao, nguy cơ thật là gì, triển khai tiếp thế nào.'],
    ],
  },
  'co-up-khai-cuoc-ba-duoi-suc-manh-con-phao': {
    moves: [
      ['b0c2', 'N', 'Kèo ba dưới: Đỏ đi liền ba nước ở hàng dưới, mở đồng loạt để đối phương khó đoán. Nước 1 lật Mã.'],
      ['h0g2', 'C', 'Nước 2 — ô Mã thứ hai lật ra Pháo: Pháo hàng dưới là quân đắc vị nhất, kìm quân đối diện và gián tiếp khống chế tốt đầu.'],
      ['d0e1', 'A', 'Nước 3 lên Sĩ.'],
      ['b9c7', 'n', 'Đen đi nước đầu.'],
      ['e3e4', 'P', 'Tốt đầu đã có Pháo g2 hỗ trợ, mở lúc nào cũng được — mở quân khó trước, quân dễ sau. Đừng đánh gấp dù đối thủ yếu hơn.'],
    ],
  },
  'co-up-ba-duoi-tiep-y-tuong-tan-cong': {
    moves: [
      ['a3a4', 'P', 'Chọn đấm tốt biên lộ 9.'],
      ['i6i5', 'r', 'Đen lộ Xe sớm.'],
      ['c3c4', 'P', 'Đừng hoảng: Xe hai bên chênh không nhiều, mình vẫn hơn nhịp — mở tốt 7.'],
      ['i5e5', null, 'Xe Đen vào trung lộ nhắm tốt đầu.'],
      ['e3e4', 'P', 'Không dùng Xe giữ một con tốt đầu (tự làm mình bị động) — đấm luôn tốt đầu, xử lý mềm mại. Tốt e4 còn dọa ăn Xe.'],
      ['e5g5', null, 'Xe Đen phải tránh. Cả hai bên luôn phải giữ ý tưởng tấn công — không phòng ngự bị động.'],
    ],
  },
  'co-up-khai-cuoc-hai-duoi-mot-tren': {
    moves: [
      ['f0e1', 'A', 'Kèo hai dưới một trên: Đỏ đi liền ba nước, mở cùng một cánh để giữ liên kết. Nước 1 (dưới) — Sĩ.'],
      ['h0g2', 'N', 'Nước 2 (dưới) — chọn Mã 2 (cánh phải) để không yếu cánh phải.'],
      ['i3i4', 'P', 'Nước 3 (trên) — tốt biên cùng cánh. Kết cấu Sĩ – Mã – Tốt liền nhau, vững chắc.'],
      ['b9c7', 'n', 'Đen đi nước đầu.'],
      ['b2e2', 'C', 'Pháo giữa (lật Pháo): buộc Đen phải đi nước dưới ở trung tâm, lại nhắm ăn tốt đầu. Pháo giữa giá trị hơn Xe ở trung tâm.'],
      ['d9e8', 'a', 'Đen buộc lên Sĩ giữ trung tâm.'],
    ],
  },
  'co-up-khai-cuoc-hai-tren-mot-duoi-phan-tich-sau': {
    moves: [
      ['a3a4', 'P', 'Kèo hai trên một dưới, Đỏ đi liền ba nước. Nước 1 — tốt biên.'],
      ['i3i4', 'P', 'Nước 2 — tốt biên còn lại.'],
      ['d0e1', 'A', 'Nước 3 (dưới) chọn Sĩ — ở nước dưới Sĩ tốt hơn Tượng.'],
      ['c6c5', 'r', 'Đen lật Xe.'],
      ['e3e4', 'N', 'Đấm tốt đầu lật ra Mã. Mã sau này có thể phi lên 4/6 vừa cứu quân vừa cấm quân — phi 4 hơn 6 vì có Sĩ phối hợp giữ Mã lâu dài.'],
      ['b9c7', 'n', 'Đen ra Mã. Chỉ cần tính trong hai nước: nước đi có mục đích rõ và lường được đáp trả — chọn theo dữ liệu quân đã lộ, không theo cảm giác.'],
    ],
  },
  'co-up-trung-cuoc-phuc-tap-up-ngua': {
    moves: [
      ['h2h9', 'C', 'Pháo giả vật ăn nắp h9 (lật Pháo). Chỉ Đỏ biết nắp vừa ăn là quân gì.'],
      ['i9h9', 'r', 'Đen ăn lại, lật ra Xe.'],
      ['b2b9', 'C', 'Pháo giả còn lại vật ăn nắp b9.'],
      ['a9b9', 'a', 'Đen ăn lại, lật ra Sĩ.'],
      ['c3c4', 'P', 'Đếm quân đã ăn để suy quân úp còn lại của Đen. Đang ưu thì chọn nước "kín cờ" như binh 7 tiến 1 — đừng ép đối phương mở đúng quân mạnh nhất.'],
      ['e6e5', 'p', 'Đen kém quân thì làm hỗn loạn: đấm tốt đầu đánh gấp — trong loạn, kẻ yếu có nhiều cơ hội hơn.'],
    ],
  },
};
