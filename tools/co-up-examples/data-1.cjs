// Ví dụ nước đi cho bài giảng cờ úp — Sơ cấp 1 (#5–#10) + Sơ cấp 2 (#1–#4).
// [nước ICCS, quân lật ra (quân úp đi lần đầu; hoa = Đỏ, thường = Đen) hoặc null, lời giảng]. Ký hiệu nước tự sinh.
// Soạn lại 07/10/2026: mọi nước được engine chấm (review.mjs --data), không còn nước treo quân / tự sát.
module.exports = {
  'co-up-dinh-hinh-chien-thuat-xac-dinh-diem-yeu': {
    moves: [
      ['g3g4', 'R', 'ưu tiên mở tốt 3 hơn tốt 7: nếu lật ra Xe thì Xe đứng ngay lộ 3, có sẵn vị trí đẹp. Ở đây lật ra Xe thật.'],
      ['d9e8', 'p', 'Đen lên Sĩ nhưng lật ra Tốt — đây là "tốt nhân" (cây đinh): Tốt không lùi được, kẹt ngay trong cung, chặn đường Tướng và phá liên kết Sĩ. Điểm yếu lộ ra chỉ sau một nước.'],
      ['g4g6', null, 'đối phương vừa lộ điểm yếu thì bên có Xe khai thác ngay: Xe tiến lên ăn nắp Tốt g6 — ô này không quân Đen nào giữ.'],
      ['c6c5', 'p', 'Đen đẩy tốt mở quân (lật Tốt), chưa vá được cánh phải.'],
      ['g6e6', null, 'Xe bình sang ăn tiếp nắp tốt đầu e6, đứng ngay trước tốt nhân e8: Xe khống chế trung lộ, Tướng Đen bị chính tốt nhân bịt lối đi.'],
      ['b7e7', 'c', 'Đen buộc đưa Pháo giả về trung lộ (lật Pháo thật) chắn giữa Xe và Tướng.'],
      ['a3a4', 'C', 'Đỏ đã hơn hai nắp, đối phương lại có tốt nhân cố định: chọn dạng chiến thuật thứ hai — mở thêm quân (lật Pháo), giữ hình ổn định, đánh chắc lâu dài. Đã hơn thì không xô xát.'],
    ],
  },
  'co-up-tuyet-doi-hoa-loi-the-cuop-tien': {
    moves: [
      ['h2e2', 'C', 'Đỏ mở Pháo ra trung lộ.'],
      ['h7e7', 'c', 'Đối phương mở Pháo thì mình mở lại một Pháo — đòn "cướp tiên": về sau khi phải mở tốt đầu, bên kia buộc đổi Pháo và mình lợi thêm một nhịp.'],
      ['e2e6', null, 'ăn quân kiêm phát triển: Pháo vượt ngòi e3 ăn nắp tốt đầu, đồng thời chiếu Tướng (ngòi là Pháo e7) — một nước làm nhiều việc.'],
      ['e7e3', null, 'Đen đáp chính xác nhờ đã "mở lại Pháo": Pháo e7 nhảy qua Pháo Đỏ ăn lại nắp tốt đầu e3 — vừa gỡ một nắp, vừa hết bị chiếu vì Pháo Đỏ mất ngòi.'],
      ['c3c4', 'P', 'hai bên mỗi bên ăn một nắp. Đỏ không lao Pháo đi ăn tiếp mà quay về mở quân (lật Tốt) — tinh thần tuyệt đối hoá: mỗi nước tấn công vô hiệu chỉ cho đối phương thêm thời gian mở quân đuổi kịp.'],
      ['a6a5', 'n', 'Đen cũng mở quân (lật Mã). Cuộc đua mở quân tiếp diễn — bên nào giữ được nhịp, không phí nước vào đòn vô hiệu, bên đó nắm lợi thế.'],
    ],
  },
  'co-up-tim-diem-danh-trung-cuoc': {
    moves: [
      ['g3g4', 'P', 'Mở tốt 3 tiến 1 vào ô "đắc vị": nếu lật ra Xe hay Pháo thì rất lợi; ra Tốt vẫn chiếm được không gian.'],
      ['b9c7', 'n', 'Đen ra Mã — trung cuộc yên bình, chưa ai giao tranh.'],
      ['h2h3', 'C', 'Khởi động Pháo giả an toàn: trích Pháo lên một ô để gây áp lực và dọn đường đưa Pháo vào trung lộ. Lật ra Pháo thật.'],
      ['h9g7', 'b', 'Đen ra quân, lật ra Tượng.'],
      ['e3e4', 'P', 'Đỏ đấm tốt đầu (lật Tốt), mở trung lộ cho Pháo.'],
      ['a6a5', 'p', 'Đen đấm tốt biên.'],
      ['h3e3', null, 'Pháo vào trung lộ. Chỉ cần vài khuôn mặt nhẹ (Tốt 3, Tốt 5) liên kết là Pháo trung lộ đã đủ tạo sức ép — không cần đi tìm Xe.'],
    ],
  },
  'co-up-phong-thu-phan-don-the-yeu': {
    moves: [
      ['a3a4', 'R', 'Đỏ đấm tốt biên lật ngay ra Xe — quân mạnh ra rất sớm.'],
      ['a6a5', 'n', 'Đen đấm tốt biên đối diện, lật ra Mã — Mã biên là vị trí xấu nhất trong các khuôn mặt. Dù vậy quân a5 vẫn chặn đường Xe: nó có nắp Xe úp a9 che phía sau nên Xe không ăn được.'],
      ['i3i4', 'R', 'Đỏ lật thêm Xe thứ hai. Đen ở thế yếu rõ rệt: hai Xe đối một Mã biên.'],
      ['i6i5', 'a', 'Đen tạo điểm chặn: đấm tốt biên ngay trước Xe i4, lật ra Sĩ. Sĩ có nắp i9 đứng sau bảo vệ nên Xe không ăn được — một quân nhẹ chặn đứng con Xe.'],
      ['h2h9', 'C', 'Đỏ vật Pháo giả xuống ăn nắp Mã đáy h9 qua ngòi h7 (lật Pháo) — đây là đòn mà nước Mã 8 tiến 7 thường dùng để phòng; Đen đã ưu tiên chặn Xe trước.'],
      ['i9h9', 'c', 'không cố giữ mọi quân: Đen dùng nắp i9 ăn lại Pháo (lật Pháo), đổi quân để giảm áp lực tấn công.'],
      ['i4i5', null, 'nắp i9 rời đi nên Sĩ i5 hết người giữ, Xe ăn Sĩ. Ở thế yếu, mỗi quân chặn đều phải có quân giữ — Đen đổi được Pháo nhưng trả giá một Sĩ. Liên kết là phải tính cả "ai giữ cho quân đang giữ".'],
    ],
  },
  'co-up-chuyen-hoa-uu-the-thanh-chien-thang': {
    moves: [
      ['b0c2', 'N', 'Đỏ ra Mã.'],
      ['b9c7', 'n', 'Đen ra Mã.'],
      ['g0e2', 'B', 'Mở quân "biết bay": lên Tượng úp (lật Tượng). Dù lật ra Mã, Xe hay Tượng thì quân vẫn đi được, không tự bịt ô nắp.'],
      ['d9e8', 'p', 'Đen lên Sĩ hớ hênh, lật ra Tốt — tự bịt cửa tướng. Đây đúng là sai lầm bài học cảnh báo: càng gần thắng càng phải tỉnh táo.'],
      ['a3a4', 'C', 'Đỏ giữ đầu óc tỉnh táo, tiếp tục mở quân ở tốt biên (lật Pháo): Pháo a4 nhắm nắp Xe giả a9.'],
      ['b7a7', 'n', 'Đen dùng Pháo giả gác chặn cột biên (lật Mã) để cứu Xe giả.'],
      ['h2h6', 'C', 'tiến Pháo giả lên (lật Pháo) nhắm nắp Mã h9 qua ngòi h7 — giữ thế chủ động bằng đe doạ, thay vì dùng Pháo a4 ăn Mã a7 để bị nắp a9 ăn lại: đang ưu mà đổi quân là tự thu hẹp lợi thế.'],
      ['i6i5', 'p', 'Đen giãy giụa đẩy tốt tạo biến động — bên sắp thua thường làm vậy, bên đang ưu phải lường trước.'],
    ],
  },
  'co-up-co-tan-thuc-dung-khac-co-tuong': {
    start: '3ak4/9/4b4/9/7R1/9/9/9/9/5K3',
    moves: [
      ['h5e5', null, 'muốn thắng cờ tàn phải diệt hết quân hoặc ép hết nước đi. Xe bình 5 nhắm Tượng e7, sau lưng Tượng là Tướng.'],
      ['e9e8', null, 'Tướng Đen lên giữ Tượng.'],
      ['f0e0', null, 'Tượng e7 đang bị Xe ghim (rời đi là Xe chiếu Tướng). Tướng Đỏ chiếm cột 5 để dùng luật lộ mặt Tướng: khi Xe rời cột 5, Tướng Đen sẽ không được đứng trên cột này nữa.'],
      ['d9c8', null, 'điểm khác cờ tướng: Sĩ cờ úp ra được khỏi cung (c8). Nhưng Sĩ rời Tướng thì Tướng mất lá chắn.'],
      ['e5e7', null, 'Xe ăn Tượng, chiếu. Tướng Đen không ăn lại được vì sẽ đối mặt Tướng Đỏ.'],
      ['e8d8', null, 'Tướng chạy sang lộ 4.'],
      ['e7e8', null, 'Xe chiếu tiếp, vẫn được Tướng Đỏ "bảo vệ" theo cột 5.'],
      ['d8d9', null, 'Tướng lui về đáy.'],
      ['e8c8', null, 'Xe ăn nốt Sĩ — Tướng Đen không còn nước đi hợp lệ (d8 bị Xe khống chế, sang e9 là đối mặt Tướng Đỏ), mà hết nước đi là thua. Sĩ ra ngoài cung linh hoạt hơn cờ tướng, nhưng phòng thủ sai hình thì vẫn thua — cờ tàn cờ úp phải tính thật cụ thể.'],
    ],
  },
  'co-up-phong-thu-quan-manh-xuat-hien-som': {
    moves: [
      ['i3i4', 'R', 'Đỏ đấm tốt biên lật ra Xe ngay — quân mạnh xuất hiện sớm.'],
      ['h9g7', 'n', 'Nước phòng thủ chính thống Mã 8 tiến 7: tránh đòn Pháo đánh Mã, không làm long chân Xe, giữ cặp Pháo giả b7–h7 làm "Pháo gánh". Đừng vội đấu quân hay đấm tốt hàng trên.'],
      ['a3a4', 'P', 'Đỏ mở tiếp tốt biên (lật Tốt).'],
      ['i6i5', 'a', 'Đen không đấu quân vội mà mở Sĩ: đấm tốt biên chặn ngay trước Xe (lật Sĩ). Quân i5 có nắp Xe úp i9 đứng sau bảo vệ nên Xe không ăn được.'],
      ['c3c4', 'P', 'Đỏ tiếp tục mở quân.'],
      ['h7h4', 'c', 'Pháo giả tiến xuống (lật Pháo thật) nhắm nắp Mã h0 qua ngòi h2 — một nước dọa có nhịp. Xe i4 không dám ăn Pháo vì Sĩ i5 giữ ô h4. Yếu quân thì bù bằng tốc độ mở quân và các điểm uy hiếp.'],
    ],
  },
  'co-up-phong-thu-quan-manh-xuat-hien-som-tiep': {
    moves: [
      ['i3i4', 'R', 'Đỏ lật Xe ở tốt biên.'],
      ['h9g7', 'n', 'Đen lên Mã phòng thủ (lật Mã) — Mã g7 giữ luôn tốt đầu e6.'],
      ['i4e4', null, 'đường tấn công mạnh của Đỏ: Xe 1 bình 5 nhắm thẳng tốt đầu — nhưng tốt đầu đã có Mã g7 giữ, ăn vào là mất Xe.'],
      ['a6a5', 'n', 'tốc độ mở quân là tối thượng: Đen không co về giữ từng nắp mà đấm tốt biên mở thêm quân (lật Mã). Càng nhiều quân trên bàn, xác suất lật ra quân mạnh càng cao.'],
      ['a3a4', 'P', 'Đỏ đấm tốt biên đối diện (lật Tốt), dọa ăn Mã a5. Nhưng Mã có nắp Xe úp a9 bảo vệ: các quân nhỏ của Đen liên kết với nhau (Mã g7 giữ tốt đầu, nắp a9 giữ Mã a5) thành một "bức tường thép".'],
    ],
  },
  'co-up-phong-thu-quan-manh-xuat-hien-som-tiep-2': {
    moves: [
      ['h2i2', 'C', 'Đỏ mở Pháo sớm, gác ra biên (lật Pháo).'],
      ['a6a5', 'p', 'Đen không hoảng: Pháo biên của Đỏ là "Pháo trống" — chưa có ngòi tốt, chưa có quân thứ hai phối hợp. Đen mở quân bình thường bằng tốt biên bên kia (lật Tốt).'],
      ['h0g2', 'N', 'Đỏ Mã 2 tiến 3 (lật Mã).'],
      ['i6i5', 'p', 'Đen đấm luôn tốt biên trước mặt Pháo (lật Tốt): Pháo i2 có ăn Tốt i5 qua ngòi i3 thì nắp i9 ăn lại ngay — Đỏ đổi Pháo lấy Tốt là lỗ. Không cần đi mua quân đuổi Pháo.'],
      ['g3g4', 'P', 'Đỏ mở tốt 3.'],
      ['c6c5', 'n', 'Đen tiếp tục mở quân (lật Mã). Hình Đen vẫn tròn, hai nắp Xe giả ở góc còn nguyên — giữ được lợi thế Xe giả quan trọng hơn chạy theo con Pháo trống.'],
    ],
  },
  'co-up-xu-ly-quan-up-lien-ket-quan-ngua': {
    moves: [
      ['a3a4', 'R', 'Đỏ lật Xe ở tốt biên.'],
      ['i6i5', 'p', 'Đen đấm tốt biên (lật Tốt).'],
      ['a4h4', null, 'Xe bình sang lộ 2 nhắm Pháo giả h7 của Đen. Trước khi đáp, Đen phải đọc mục đích nước này.'],
      ['h7h2', 'c', 'Đen đọc đúng ý đồ: Pháo giả không bỏ chạy mà mượn chính Xe h4 làm ngòi, vật xuống ăn nắp Pháo h2 của Đỏ (lật ra Pháo thật). Pháo giả không bắn bừa — chỉ bắn khi vừa đổi được quân vừa giải được mối đe doạ.'],
      ['h4h2', null, 'Xe phải lùi về ăn lại Pháo — con Xe bị kéo xuống hàng dưới, mất vị trí hàng trên.'],
      ['b9c7', 'n', 'Đen ra Mã liên kết. Hai bên đổi Pháo, nhưng Xe Đỏ đã lùi sâu còn Đen giữ được hình và nhịp mở quân.'],
    ],
  },
};
