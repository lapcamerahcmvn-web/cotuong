// Ví dụ nước đi cho bài giảng cờ úp — Sơ cấp 2 (#5–#10) + Nâng cao 1 (#1–#4).
module.exports = {
  'co-up-lien-ket-quan-trong-hinh-co-yeu': {
    moves: [
      ['a3a4', 'R', 'Đỏ lật Xe ở tốt biên.'],
      ['f9e8', 'a', 'Đen đang yếu thì dựng tường trước: Sĩ lên e8, liên kết với nắp Sĩ d9.'],
      ['i3i4', 'R', 'Đỏ lật thêm Xe thứ hai — Đen một chọi hai Xe.'],
      ['b7e7', 'c', 'Pháo giả về trung lộ (lật Pháo) bịt lộ: cặp Sĩ + Pháo thành "bức tường thép" — các quân nhỏ bó lại như bó đũa, quân mạnh khó thí vào.'],
      ['a4a5', null, 'Đỏ đẩy Xe áp sát.'],
      ['i6i5', 'p', 'Vừa dựng tường vừa tạo nguy cơ: Tốt biên tiến xuống dọa ăn Xe i4. Cờ úp không có phòng ngự tuyệt đối — chỉ co về thủ thì đối thủ thong thả mở hết quân rồi thắng.'],
    ],
  },
  'co-up-trung-cuoc-loan-chien': {
    start: '3akxx2/9/5P1c1/x8/6R2/9/2X1X4/1X7/9/X2K5',
    moves: [
      ['f7f8', null, 'Tốt Đỏ đã qua sông áp sát cửa Sĩ. Một mình Tốt chưa làm được gì — phải có Xe phối hợp.'],
      ['d9e8', null, 'Đen lên Sĩ giữ cửa tướng.'],
      ['g5g9', null, 'Xe tiến xuống ăn nắp hàng đáy, phối hợp với Tốt đáy f8 đánh vào cửa Sĩ: nắp Sĩ f9 bị kẹp giữa Xe và Tốt — và bị ghim, rời đi là Xe chiếu thẳng Tướng.'],
      ['h7h8', null, 'Đen lui Pháo về hàng 8 phòng thủ, nhưng không cứu được nắp đang bị ghim.'],
      ['f8f9', null, 'Tốt đáy ăn nắp f9 (có Xe g9 bảo vệ) và chiếu Tướng — Xe + Tốt đáy phá tan cửa Sĩ. Điều kiện thắng ở thế này chỉ cần thêm một Pháo, không cần Xe thứ hai.'],
      ['e8f9', null, 'Tướng không chạy được (sang d9 là đối mặt Tướng Đỏ), Đen buộc dùng Sĩ ăn Tốt. Cửa Sĩ đã mở, Tướng Đen chỉ còn một Sĩ che — Xe Đỏ tiếp tục uy hiếp.'],
    ],
  },
  'co-up-phan-cong-trong-hinh-thua-quan-kem-the': {
    moves: [
      ['c3c4', 'P', 'Đỏ mở tốt.'],
      ['a6a5', 'r', 'Đen lật Xe — Đỏ đang kém thế.'],
      ['b2f2', 'R', 'Pháo giả 8 bình 4 lật ra Xe, nhắm vào cánh trái Đen trong khi quân mình dồn cánh phải — "vẽ dần" một cơ hội tấn công. Hỏi trước: mình cần đạt gì để thắng?'],
      ['i6i5', 'p', 'Đen đấm tốt biên.'],
      ['c0a2', 'C', 'Bay Tượng biên để tìm Pháo (lật ra Pháo): gác Pháo biên vừa công vừa thủ. Đặt quân đúng ô quan trọng hơn đi tìm Xe.'],
      ['a5e5', null, 'Đen dồn Xe vào trung lộ ép tốt đầu — mỗi nước của bên yếu đều phải trả lời câu hỏi "nước này để làm gì?".'],
    ],
  },
  'co-up-khai-thac-thuc-loi-nho-cau-truc-xau': {
    moves: [
      ['g3g4', 'P', 'Đỏ mở tốt 3.'],
      ['f9e8', 'p', 'Đen lên Sĩ, lật ra Tốt — tốt nhân! Quân ở ô xấu vô giá trị: Tốt này tốn nhiều nước để xử lý, tạo điểm yếu quanh Tướng.'],
      ['h0g2', 'N', 'Đỏ ra Mã.'],
      ['b9c7', 'n', 'Đen ra Mã.'],
      ['b2b6', 'C', 'Pháo 8 tiến 4: dù lật ra quân gì cũng tạo giá trị (ở đây lật Pháo), áp sát cánh có tốt nhân. Không chọn nước cứu quân bất khả thi, nhiều rủi ro.'],
      ['c6c5', 'p', 'Đen đấm tốt.'],
      ['g2f4', null, 'Mã tiến vào trung tâm chiếm không gian, ép quân Đen vào ô xấu. Hai bên bằng quân nhưng Đỏ hơn hẳn về vị trí — đó là "thực lợi nhỏ".'],
    ],
  },
  'co-up-nhung-thoi-diem-can-pha-cach': {
    moves: [
      ['i3i4', 'R', 'Đỏ lật Xe.'],
      ['c6c5', 'p', 'Đen đấm tốt.'],
      ['i4i6', null, 'Xe ăn nắp tốt biên, giờ nhắm thẳng nắp Xe giả i9 — nắp này không cứu được, coi như "đã chết".'],
      ['i9i7', 'p', 'Phá cách: thay vì để mất trắng, Đen mở luôn nắp "đã chết" — lật ra Tốt chặn ngay trước Xe, dọa ăn Xe.'],
      ['i6i7', null, 'Đỏ ăn Tốt, nhưng Xe bị kéo lên sâu, rời vị trí khống chế.'],
      ['h9g7', 'c', 'Đen ra quân (lật Pháo): đổi một nắp chắc chắn mất lấy nhịp phát triển. Bị ép mà không tạo được đe doạ thì phải phá cách.'],
    ],
  },
  'co-up-tan-dung-loi-the-trong-tan-cuoc': {
    start: '4k4/5a3/6n2/9/9/4P4/2N6/9/4A4/3K5',
    moves: [
      ['e4e5', null, 'Tốt đầu qua sông — quân tạo áp lực duy nhất của Đỏ, phải giữ thật kỹ.'],
      ['f8e7', null, 'Sĩ cờ úp ra khỏi cung chặn đường Tốt.'],
      ['c3d5', null, 'Mã đi thẳng lên trung tâm áp sát Sĩ (không đi "Mã quỳ" dễ tắc tướng). Mã và Tốt cùng tạo sức ép.'],
      ['e7f6', null, 'Sĩ Đen phải tránh.'],
      ['e5e6', null, 'Tốt tiến từng bước, có Mã che chở. Cờ tàn không Xe: hơn quân thì đánh chắc, chọn đường dễ, "lấy thịt đè người" — đừng tìm nước cao siêu.'],
    ],
  },
  'co-up-xu-ly-quan-up-ket-hop-quan-ngua-phuc-tap': {
    moves: [
      ['e3e4', 'P', 'Binh 5 tiến 1: tạo điểm chờ ở trung lộ.'],
      ['b9c7', 'n', 'Đen ra Mã.'],
      ['h2h6', 'C', 'Pháo giả tiến sâu (lật Pháo) ép vào khu Tượng/Mã Đen: dọa ăn nắp h9 qua ngòi h7 và nắp e6 qua ngòi g6 — đối phương không có điểm yếu thì mình phải tạo ra.'],
      ['h9g7', 'b', 'Đen phải chạy nắp h9, lật ra Tượng.'],
      ['e4e5', null, 'Tốt tiến thêm — nhưng nhớ Tốt chỉ là "vị trí chờ", tự nó không tấn công; phải huy động quân mạnh phối hợp.'],
    ],
  },
  'co-up-chien-luoc-theo-quan-manh-tu-duy-hai-chieu': {
    moves: [
      ['g3g4', 'P', 'Đỏ mở tốt.'],
      ['c6c5', 'p', 'Đen mở tốt.'],
      ['b2b9', 'C', 'Pháo giả 8 vật xuống (lật Pháo) ăn nắp Mã b9 qua ngòi b7. Chỉ Đỏ biết nắp vừa ăn là quân gì: ăn trúng quân mạnh thì đánh chắc, chưa trúng thì phải tấn công gây áp lực ngay.'],
      ['a9b9', 'a', 'Đen ăn lại Pháo (nắp Xe giả lật ra Sĩ).'],
      ['b0c2', 'N', 'Đường lộ 8 đã mở cho quân Đỏ phát triển — vật quân đôi khi để mở đường, không chỉ để đổi.'],
    ],
  },
  'co-up-tam-quan-trong-cua-chien-luoc': {
    moves: [
      ['h2e2', 'C', 'Đỏ mở Pháo trung lộ.'],
      ['b9c7', 'n', 'Đen ra Mã.'],
      ['e2g2', null, 'Đánh giá rồi mới đi: Pháo 5 bình 3 qua ngòi g3 nhắm nắp g6 — cấm quân Đen, đồng thời mở đường.'],
      ['g6g5', 'p', 'Đen đẩy nắp bị cấm ra (lật Tốt).'],
      ['b2b5', 'R', 'Pháo 8 tiến 3 lật ra Xe. Đã có quân mạnh thì giữ vị, vừa khống chế vừa mở quân — ưu thế lớn tuyệt đối không đánh gấp.'],
      ['a6a5', 'p', 'Đen đấm tốt biên.'],
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
