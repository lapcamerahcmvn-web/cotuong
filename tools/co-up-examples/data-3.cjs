// Ví dụ nước đi cho bài giảng cờ úp — Nâng cao 1 (#5–#10) + Nâng cao 2 (#1–#10).
// Bài kèo chấp: bên chấp đi liền các nước đầu (đúng cách chơi chấp nước).
// Soạn lại 07/10/2026: mọi nước được engine chấm (review.mjs --data), không còn nước treo quân / tự sát.
module.exports = {
  'co-up-xu-ly-khi-co-loi-the-lon': {
    moves: [
      ['a3a4', 'R', 'Đỏ lật Xe.'],
      ['c6c5', 'p', 'Đen mở tốt.'],
      ['i3i4', 'R', 'Đỏ lật thêm Xe thứ hai.'],
      ['g6g5', 'p', 'Đen mở tốt.'],
      ['b2b9', 'C', 'có hai Xe rất sớm — lợi thế lớn. Không đánh gấp mà chọn nước phá hình: Pháo giả 8 vật xuống ăn nắp Mã đáy b9 qua ngòi b7 (lật Pháo).'],
      ['a9b9', 'n', 'Đen ăn lại Pháo (nắp Xe giả lật ra Mã) — nắp rời góc, cột biên a bỏ ngỏ.'],
      ['a4a6', null, 'Xe tiến lên ăn nắp Tốt a6, ô này không còn quân nào giữ: chuyển lợi thế hình thế thành lợi thế vật chất, Xe vẫn đứng ở ô an toàn. Thắng nhanh hay chậm cũng chỉ một điểm — chọn đường an toàn nhất.'],
    ],
  },
  'co-up-uu-the-hinh-kem-quan-lien-ket': {
    moves: [
      ['c3c4', 'P', 'Đỏ mở tốt.'],
      ['a6a5', 'r', 'Đen lật Xe ở tốt biên — Đen hơn về quân mạnh.'],
      ['b0c2', 'N', 'thẩm thế trước, thẩm quân sau: Đỏ không đi tìm Xe đấu ngay mà ra Mã (lật Mã) giữ liên kết, che cánh trái.'],
      ['i6i5', 'a', 'Đen đấm tốt biên còn lại (lật Sĩ).'],
      ['i3i4', 'C', 'Đỏ lật Pháo biên, nhắm nắp Xe giả i9 qua ngòi Sĩ i5 — đánh vào quân phòng ngự then chốt của Đen.'],
      ['h9i7', 'p', 'Đen gác Mã 8 tiến 9 chặn cột biên, nhưng lật ra Tốt — Tốt đứng i7 không lùi được, thành quân "chết" trong hình phòng ngự.'],
      ['a3a4', 'P', 'Đỏ đấm tốt biên đuổi Xe a5 (quân a4 có nắp Xe úp a0 bảo vệ). Ít quân mạnh hơn nhưng Đỏ liên kết tốt, quân Đen lại đứng ô xấu — đó là ưu thế hình.'],
    ],
  },
  'co-up-uu-the-lau-dai-tu-lien-ket': {
    moves: [
      ['i3i4', 'R', 'Đỏ lật Xe.'],
      ['a6a5', 'r', 'Đen lật Xe ở tốt biên.'],
      ['a3a4', 'P', 'dùng nắp đánh Xe: đấm tốt biên ngay trước Xe Đen (lật Tốt) — Tốt a4 có nắp Xe úp a0 bảo vệ, Xe Đen buộc rời chỗ.'],
      ['a5h5', null, 'Xe Đen tránh sang lộ 8, nhắm nắp Pháo h2 của Đỏ.'],
      ['i4c4', null, 'Đỏ không vật Pháo giả cầu may (chưa đủ lực phối hợp), cũng không lùi giữ nắp, mà đưa Xe sang lộ 7 nhắm nắp c6 — tạo uy hiếp đa điểm, đổi nắp lấy nắp mà vẫn giữ liên kết.'],
      ['h5h2', null, 'Đen ăn nắp h2.'],
      ['c4c6', null, 'Đỏ ăn lại nắp c6. Bên còn liên kết chặt cứ đánh lâu dài: dùng Xe đánh nắp, giữ quân, không bỏ thế lấy quân.'],
    ],
  },
  'co-up-hai-phao-som-kem-luc-gia-tri-phao': {
    moves: [
      ['h2e2', 'C', 'Đỏ lật Pháo trung lộ.'],
      ['b9c7', 'n', 'Đen ra Mã.'],
      ['b2c2', 'C', 'Đỏ lật thêm Pháo — hai Pháo lộ sớm nhưng chưa liên kết.'],
      ['a6a5', 'r', 'Đen lật Xe ở tốt biên — Đỏ kém lực.'],
      ['c2c6', null, 'Pháo 7 tiến 4 ăn nắp c6 qua ngòi c3. Pháo e2 vẫn nằm nguyên ở trung lộ làm "Pháo trống" khống chế.'],
      ['a5c5', null, 'Xe Đen bình sang đuổi Pháo c6.'],
      ['c6g6', null, 'Pháo không lùi về đổi lỗ mà chạy ngang qua ngòi e6 ăn tiếp nắp g6. Hai Pháo đều được giữ: trong cờ úp hai Pháo còn nhỉnh hơn một Xe, đừng đổi chúng lấy một Mã.'],
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
      ['a3a4', 'N', 'phải giữ Pháo — không có Pháo thì không công vỡ được hình đối phương, nên chưa ném Pháo vào đổi lấy Tượng. Đỏ đấm tốt biên ngay trước Xe a5 (lật Mã, có nắp Xe úp a0 bảo vệ): vừa mở quân vừa đuổi Xe, gom thêm lực cho đòn đột phá.'],
      ['i5e5', null, 'Xe Đen vào trung lộ nhắm tốt đầu. Hình yếu chỉ phản được khi hội tụ đủ yếu tố — Đỏ phải tiếp tục huy động quân.'],
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
      ['a3a4', 'P', 'Kèo chấp ba nước: Đỏ đi liền ba nước. Nước 1 — tốt biên (lật Tốt).'],
      ['i3i4', 'P', 'Nước 2 — tốt biên còn lại (lật Tốt). Tốt biên cấm quân, lại khó bị bắt.'],
      ['g3g4', 'P', 'Nước 3 — tốt lộ 3, hạn chế mở tốt đầu sớm. "Ba trên" lý tưởng là hai Pháo biên + một quân lộ 3/7; lật ra ba Tốt là kém may, nhưng mở ba con tốt vẫn "đẹp nhiều hơn xấu": cả ba đứng ô tốt, không quân nào bị cấm.'],
      ['c6c5', 'n', 'Đen mới đi nước đầu (lật Mã) — Đỏ vẫn dẫn trước ba nhịp mở quân.'],
      ['c3c4', 'P', 'Đỏ giữ lợi thế tốc độ: tiếp tục mở quân (Tốt c4 còn dọa ăn Mã c5) thay vì vội ăn nắp — ăn quân là mất một nước. Đừng đổi tốc độ lấy vật chất.'],
    ],
  },
  'co-up-phat-trien-quan-khai-cuoc-song-ma': {
    moves: [
      ['c3c4', 'N', 'Kèo chấp ba nước. Nước 1 lật ra Mã.'],
      ['e3e4', 'N', 'Nước 2 lại ra Mã — hai Mã đứng gần nhau, cùng khống chế ô d6.'],
      ['g3g4', 'P', 'Nước 3 lật Tốt. Hình hai Mã tương hỗ + một Tốt khoảng 7/10: Tốt Đen khó tiến lên đuổi Mã.'],
      ['i6i5', 'r', 'Đen lộ Xe ở tốt biên.'],
      ['i3i4', 'P', 'ưu tiên xử lý bằng quân sẵn có: đấm tốt biên ngay trước Xe Đen (lật Tốt, có nắp Xe úp i0 bảo vệ) — đuổi Xe mà không phải đưa Mã đi lung tung.'],
      ['i5h5', null, 'Xe Đen tránh sang lộ 8, đứng ngay trước Pháo giả h7 của mình.'],
      ['h2h7', 'C', 'Pháo giả Đỏ mượn chính Xe Đen h5 làm ngòi, vật lên ăn Pháo giả h7 (lật Pháo). Hai Mã giữ hàng trên, Pháo ăn quân — hình song Mã phát huy khi các quân phối hợp.'],
    ],
  },
  'co-up-danh-gia-tinh-huong-song-ma-bien': {
    moves: [
      ['a3a4', 'N', 'Đỏ đấm tốt biên lật ra Mã — Mã biên: ít đường đi, không cấm được quân.'],
      ['a6a5', 'p', 'Tốt Đen dọa ngay Mã biên (lật Tốt): Mã a4 gần như không có ô thoát (c5 bị Tốt c6 khống chế), chỉ trông vào nắp Xe úp a0 bảo vệ. Vì vậy hình song Mã biên chỉ đáng khoảng 4 điểm.'],
      ['c3c4', 'C', 'Đỏ lật được Pháo ở tốt 7: quân thể hiện ý đồ tấn công ngay — một Pháo đáng giá hơn hẳn hai Mã biên.'],
      ['c9a7', 'a', 'Đen đưa nắp Tượng ra a7 phòng thủ cánh trái (lật Sĩ).'],
      ['c4e4', null, 'Pháo bình 5 chiếu Tướng qua ngòi tốt đầu — Pháo ở biên hay ở trung lộ đều làm hình đối phương lệch.'],
      ['f9e8', 'p', 'Đen lên Sĩ chặn chiếu, lật ra Tốt — tốt nhân bịt cửa tướng. Một con Pháo đã đổi cả cục diện.'],
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
      ['c9e7', 'b', 'Đen đánh giá đúng nguy cơ thật: Pháo c4 sắp vật xuống ăn nắp Tượng c9. Lên Tượng ngay (lật Tượng) — vừa tránh đòn, vừa giữ trung lộ.'],
      ['a3a4', 'P', 'Đỏ mở tốt biên (lật Tốt).'],
      ['c6c5', 'r', 'Đen lật được Xe sớm, Xe c5 dọa ngay Pháo c4.'],
      ['c4c2', null, 'ba câu hỏi: tình huống — Đen có Xe; nguy cơ — Pháo bị bắt; triển khai — đừng cố đi tìm Xe đối chọi bằng mọi giá. Đỏ lui Pháo về hàng 2, có nắp Mã b0 bảo vệ: giữ quân đang có, Pháo hàng dưới vẫn kìm cột 3.'],
      ['i6i5', 'n', 'Đen tiếp tục mở quân (lật Mã). Con Xe đơn độc của Đen chưa có quân phối hợp; Đỏ tối ưu quân đang có rồi mới tính chuyện công.'],
    ],
  },
  'co-up-khai-cuoc-ba-duoi-suc-manh-con-phao': {
    moves: [
      ['b0c2', 'N', 'Kèo ba dưới: Đỏ đi liền ba nước ở hàng dưới, mở đồng loạt để đối phương khó đoán. Nước 1 lật Mã.'],
      ['h0g2', 'C', 'Nước 2 — ô Mã thứ hai lật ra Pháo: Pháo hàng dưới là quân đắc vị nhất, kìm quân đối diện và gián tiếp khống chế tốt đầu.'],
      ['g2g6', null, 'Nước 3 — Pháo hàng dưới vào việc ngay: vượt ngòi g3 ăn nắp g6. Không phải "nổ" ăn tốt đầu vô ích: nắp g6 nằm sẵn trên đường Pháo, ăn xong Pháo vẫn kìm quân Đen ở lộ này.'],
      ['c6c5', 'n', 'Đen đi nước đầu (lật Mã).'],
      ['c3c4', 'P', 'Đỏ mở tiếp quân (lật Tốt). Đã dẫn trước ba nhịp thì giữ chắc, tiến từ từ — đừng đánh gấp dù đối thủ yếu hơn.'],
      ['i6i5', 'p', 'Đen mở tốt biên.'],
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
      ['e3e4', 'N', 'Đấm tốt đầu lật ra Mã — Mã e4 dọa ngay Xe c5. Mã sau này có thể phi lên 4/6 vừa cứu quân vừa cấm quân; phi 4 hơn 6 vì có Sĩ phối hợp giữ Mã lâu dài.'],
      ['c5f5', null, 'Đen buộc đưa Xe tránh.'],
      ['g3g4', 'P', 'Đỏ không phi Mã đuổi Xe (mất nhịp) mà mở thêm quân, giữ hình. Chỉ cần tính trong hai nước: nước đi có mục đích rõ và lường được đáp trả.'],
      ['d9e8', 'a', 'Đen lên Sĩ củng cố. Chọn nước theo dữ liệu quân đã lộ, không theo cảm giác.'],
    ],
  },
  'co-up-trung-cuoc-phuc-tap-up-ngua': {
    moves: [
      ['a3a4', 'P', 'Đỏ đấm tốt biên (lật Tốt).'],
      ['c6c5', 'p', 'Đen mở tốt.'],
      ['i3i4', 'C', 'Đỏ lật Pháo biên, nhắm nắp Xe giả i9.'],
      ['h9i7', 'n', 'Đen gác Mã 8 tiến 9 chặn cột biên (lật Mã).'],
      ['i4e4', null, 'Pháo bình 5 chiếu Tướng qua ngòi tốt đầu.'],
      ['d9e8', 'p', 'Đen lên Sĩ chặn chiếu, lật ra Tốt — tốt nhân.'],
      ['i0i6', 'R', 'Xe úp ở góc tiến thẳng ăn nắp Tốt biên i6 (lật Xe thật). Đếm quân: Đen đã lộ Tốt c5, Mã i7, Tốt e8 và mất thêm một nắp — trong các nắp còn lại, tỉ lệ Xe/Pháo tăng lên, nên trước mỗi nước phải tính "nếu Đen ăn xuống là quân gì". Đang ưu thì chọn nước kín, đừng ép Đen mở đúng quân mạnh nhất.'],
    ],
  },
};
