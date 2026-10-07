// Ví dụ nước đi cho bài giảng cờ úp — Sơ cấp 1 (#5–#10) + Sơ cấp 2 (#1–#4).
// [nước ICCS, quân lật ra (quân úp đi lần đầu; hoa = Đỏ, thường = Đen) hoặc null, lời giảng]. Ký hiệu nước tự sinh.
module.exports = {
  'co-up-dinh-hinh-chien-thuat-xac-dinh-diem-yeu': {
    moves: [
      ['g3g4', 'R', 'ưu tiên mở tốt 3 hơn tốt 7: nếu lật ra Xe thì Xe đứng ngay lộ 3, có sẵn vị trí đẹp. Ở đây lật ra Xe thật.'],
      ['d9e8', 'p', 'Đen lên Sĩ nhưng lật ra Tốt — đây là "tốt nhân" (cây đinh): Tốt không lùi được, kẹt ngay trong cung, chặn đường Tướng và phá liên kết Sĩ. Điểm yếu lộ ra chỉ sau một nước.'],
      ['g4f4', null, 'Đối phương có tốt nhân mà mình có Xe thì chiếm ngay cửa tướng lộ 4: ô e8 đã bị tốt nhân chiếm, giờ cửa bên phải cũng bị Xe khống chế.'],
      ['f9g8', 'b', 'Sĩ úp ở f9 nằm trên đường Xe nên phải tránh — lật ra Tượng. Quanh Tướng Đen chỉ còn tốt nhân đứng chắn, rất lỏng lẻo.'],
      ['h2e2', 'C', 'Pháo vào trung lộ (lật Pháo thật). Đỏ đã có điểm đánh cố định (cửa tướng + trung lộ): chọn dạng chiến thuật thứ hai — mở nhiều quân, giữ hình ổn định, đánh chắc lâu dài. Đã hơn thế thì không xô xát.'],
    ],
  },
  'co-up-tuyet-doi-hoa-loi-the-cuop-tien': {
    moves: [
      ['h2e2', 'C', 'Đỏ mở Pháo ra trung lộ.'],
      ['h7e7', 'c', 'Đối phương mở Pháo thì mình mở lại một Pháo — đòn "cướp tiên": về sau khi phải mở tốt đầu, bên kia buộc đổi Pháo và mình lợi thêm một nhịp.'],
      ['b0c2', 'N', 'Đỏ ra Mã.'],
      ['b9c7', 'n', 'Đen cũng ra Mã.'],
      ['e2e6', null, 'Ăn quân kiêm phát triển: Pháo vượt ngòi e3 ăn nắp tốt đầu, đồng thời chiếu Tướng (ngòi là Pháo e7) — một nước làm nhiều việc.'],
      ['d9e8', 'a', 'Đen lên Sĩ chặn chiếu (lật ra Sĩ thật).'],
      ['e6e4', null, 'Đã lời một nắp: thay vì lao tiếp, Pháo lui về giữ hình, chuẩn bị mở thêm quân — kỹ thuật tuyệt đối hoá lợi thế. Mỗi nước tấn công vô hiệu chỉ cho đối phương thêm thời gian mở quân đuổi kịp.'],
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
      ['a3a4', 'R', 'Đỏ đấm tốt biên lật ra Xe — quân mạnh ra rất sớm.'],
      ['i6i5', 'n', 'Đen đấm tốt biên lại lật ra Mã: vị trí xấu nhất trong các khuôn mặt. Đen đang ở thế yếu.'],
      ['c3c4', 'P', 'Đỏ tiếp tục mở quân.'],
      ['h9g7', 'c', 'Mã 8 tiến 7: nước phòng thủ chính xác. Ô h9 bỏ trống nên Pháo giả h2 của Đỏ có vật xuống qua ngòi h7 cũng không ăn được gì. Lật ra Pháo — quân dễ liên kết phòng thủ.'],
      ['a4a5', null, 'Đỏ đẩy Xe áp sát tốt biên Đen.'],
      ['f9e8', 'a', 'Ở trung tâm chỉ cần lộ ra một Sĩ là đủ chơi: Sĩ liên kết với Pháo, giảm áp lực, chờ quân mạnh lộ ra. Đừng cố giữ mọi quân — tập trung mở quân để cân bằng.'],
    ],
  },
  'co-up-chuyen-hoa-uu-the-thanh-chien-thang': {
    moves: [
      ['b0c2', 'N', 'Đỏ ra Mã.'],
      ['b9c7', 'n', 'Đen ra Mã.'],
      ['g0e2', 'B', 'Mở quân "biết bay": lên Tượng úp (lật Tượng). Dù lật ra Mã, Xe hay Tượng thì quân vẫn đi được, không tự bịt ô nắp.'],
      ['d9e8', 'p', 'Đen lên Sĩ hớ hênh, lật ra Tốt — tự bịt cửa tướng. Đây đúng là sai lầm bài học cảnh báo: càng gần thắng càng phải tỉnh táo.'],
      ['h2h4', 'C', 'Tiến Pháo giả lên (lật Pháo) để giữ nắp, giữ Pháo ở tuyến giữa làm nhiệm vụ phòng thủ thay vì đẩy lên bắt Tượng.'],
      ['g6g5', 'p', 'Đen giãy giụa đẩy tốt tạo biến động — bên sắp thua thường làm vậy, bên đang ưu phải lường trước.'],
    ],
  },
  'co-up-co-tan-thuc-dung-khac-co-tuong': {
    start: '4k4/4a4/9/9/4b2R1/9/9/9/9/3K5',
    moves: [
      ['h5h8', null, 'Xe áp sát hàng 8 dọa bắt Sĩ — nhưng Sĩ e8 đứng sát Tướng, ăn vào là Tướng ăn lại Xe.'],
      ['e5c3', null, 'Khác cờ tướng: Tượng cờ úp qua sông được. Tượng Đen tràn sang đất Đỏ, thêm một quân hoạt động.'],
      ['h8h9', null, 'Xe chiếu Tướng theo hàng đáy.'],
      ['e8f9', null, 'Sĩ lùi chắn chiếu, vẫn đứng sát Tướng. Xe đi đâu thì Tướng cũng che được Sĩ; Sĩ cờ úp lại ra khỏi cung được — vì vậy Xe đấu một Sĩ trong cờ úp là HÒA (cờ tướng thì Xe thắng).'],
    ],
  },
  'co-up-phong-thu-quan-manh-xuat-hien-som': {
    moves: [
      ['i3i4', 'R', 'Đỏ đấm tốt biên lật ra Xe ngay — quân mạnh xuất hiện sớm.'],
      ['h9g7', 'n', 'Nước phòng thủ chính thống Mã 8 tiến 7: tránh đòn Pháo đánh Mã, không làm long chân Xe, giữ cặp Pháo giả b7–h7 làm "Pháo gánh". Đừng vội đấu quân hay đấm tốt hàng trên.'],
      ['i4i5', null, 'Đỏ đẩy Xe lên dò xét.'],
      ['g6g5', 'p', 'Đen đấm tốt 7 (lật Tốt) — vừa mở quân vừa chuẩn bị ngòi.'],
      ['b0c2', 'N', 'Đỏ ra Mã.'],
      ['b7b5', 'c', 'Pháo giả tiến lên lật Pháo, dùng Tốt g5 làm ngòi dọa bắt Xe — ép Xe Đỏ phải lui, Đen lợi một nhịp mà không cần đi tìm Sĩ bắt Xe.'],
      ['i5i3', null, 'Xe phải lui. Yếu quân thì bù bằng tốc độ mở quân và các nước dọa bắt có nhịp.'],
    ],
  },
  'co-up-phong-thu-quan-manh-xuat-hien-som-tiep': {
    moves: [
      ['i3i4', 'R', 'Đỏ lật Xe ở tốt biên.'],
      ['b9c7', 'n', 'Đen lên Mã sớm để giữ tốt đầu.'],
      ['i4e4', null, 'Đường tấn công mạnh của Đỏ: Xe 1 bình 5 nhắm thẳng tốt đầu — nhưng tốt đầu đã có Mã giữ.'],
      ['g9e7', 'b', 'Tượng 7 tiến 5: liên kết với Mã giữ trung lộ. Lên Tượng mở cờ ra, nhiều cơ hội phản đòn hơn là chỉ co Mã về giữ rồi bị đè dần.'],
      ['g3g4', 'C', 'Đỏ mở tốt 3 lật ra Pháo.'],
      ['c6c5', 'p', 'Đen ưu tiên tốc độ mở quân: càng nhiều quân trên bàn, càng sớm lật được quân mạnh. Chấp nhận mất nắp nhưng nhanh hơn hai nhịp vẫn là lời.'],
    ],
  },
  'co-up-phong-thu-quan-manh-xuat-hien-som-tiep-2': {
    moves: [
      ['h2i2', 'C', 'Đỏ mở Pháo sớm, gác ra biên.'],
      ['h7i7', 'c', 'Đen gác Pháo biên đối lại.'],
      ['h0g2', 'N', 'Đỏ Mã 2 tiến 3.'],
      ['g6g5', 'p', 'Đen không "ăn lên" (ăn lên sẽ vỡ Xe giả, buộc phải đánh gấp) mà đi tốt 7 tiến 1 ép Mã: vừa ép Mã, vừa giảm xô cờ, vừa giữ lợi thế Xe giả.'],
      ['c3c4', 'P', 'Đỏ mở tốt.'],
      ['b9c7', 'n', 'Đen phát triển bình thường. Pháo biên của Đỏ là "Pháo trống" — chưa có ngòi, chưa có quân thứ hai phối hợp — không đáng sợ, đừng hoảng mà đi mua quân đuổi.'],
    ],
  },
  'co-up-xu-ly-quan-up-lien-ket-quan-ngua': {
    moves: [
      ['a3a4', 'R', 'Đỏ lật Xe ở tốt biên.'],
      ['i6i5', 'p', 'Đen đấm tốt biên.'],
      ['a4h4', null, 'Xe Đỏ phải về h4 canh Pháo giả h7 của Đen — nếu không, Pháo giả vật xuống qua ngòi h2 ăn Mã úp h0. Pháo giả đã "trói" Xe: suốt ván con Xe có thể phải đứng canh như một con Tốt.'],
      ['b9c7', 'n', 'Đen ra Mã, không vội bắn Pháo giả.'],
      ['b0c2', 'N', 'Đỏ ra Mã.'],
      ['c6c5', 'p', 'Đen tạo hướng tấn công thứ hai ở cánh trái. Một Xe đã bị trói không thể đỡ hai điểm cùng lúc.'],
    ],
  },
};
