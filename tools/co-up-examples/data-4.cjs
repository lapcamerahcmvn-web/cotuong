// Ví dụ nước đi cờ úp — bài nhập môn + Sơ cấp 1 (#1–#4), soạn lại 07/10/2026 theo góp ý người học:
// mỗi bài một ví dụ riêng khớp lý thuyết, từng nước được engine chấm (review.mjs --data) không kém nước tốt nhất quá 1 Tốt.
module.exports = {
  'co-up-la-gi-luat-choi-co-up': {
    moves: [
      ['i3i4', 'C', 'quân úp ở hàng Tốt đi như Tốt (tiến 1 ô), đi xong thì lật ra mặt thật: đây là Pháo. Từ giờ nó đi như Pháo, và đang nhắm ngay quân úp ở góc i9 (ô Xe gốc của Đen) qua ngòi là Tốt úp i6.'],
      ['h9i7', 'n', 'nước mạnh nhất của Đen. Quân úp ở ô Mã gốc đi như Mã, lật ra Mã. Đứng ở i7, Mã chặn thêm một quân trên cột biên: giữa Pháo Đỏ và quân úp i9 giờ có hai quân nên Pháo không ăn được nữa, còn Mã thì có quân úp i9 (đi như Xe) đứng sau bảo vệ.'],
      ['a3a4', 'R', 'Đỏ đấm tốt biên bên kia và lật trúng Xe. Lưu ý: quân này bắt đầu ở hàng Tốt nhưng mặt thật là Xe, nên từ nước sau nó đi như Xe — không còn bị luật đi của Tốt ràng buộc.'],
      ['a6a5', 'p', 'Đen đấm tốt biên đối diện, lật ra Tốt. Tốt a5 đe doạ tiến lên ăn Xe; Xe không ăn lại được vì Tốt có quân úp a9 (đi như Xe) che phía sau.'],
      ['a4d4', null, 'Xe tránh sang lộ 6 trước cửa tướng — vị trí đẹp để vừa phòng thủ vừa chuẩn bị tấn công. Mở được Xe sớm thì phải giữ Xe ở chỗ an toàn và cơ động.'],
      ['b9c7', 'c', 'quân úp ở ô Mã gốc nên nước đầu đi theo kiểu Mã, nhưng lật ra lại là Pháo. Từ nước sau, quân ở c7 đi và ăn như Pháo chứ không còn đi như Mã nữa — đây là điểm khác biệt cốt lõi của cờ úp.'],
      ['c3c4', 'P', 'Đỏ tiếp tục mở quân hàng trên, lật ra Tốt. Khai cuộc cờ úp xoay quanh việc mở quân nhanh và an toàn: quân nào lộ mặt trước, ở chỗ tốt trước thì chiếm thế chủ động.'],
    ],
  },
  'co-up-mo-xe-som-toi-uu-loi-the': {
    moves: [
      ['a3a4', 'R', 'nước đầu đấm tốt biên và lật trúng Xe — con Xe hàng trên ra ngay từ đầu, mạnh và cơ động hơn hẳn Xe hàng dưới còn úp ở góc.'],
      ['b9c7', 'n', 'thấy Xe xuất hiện, Đen phải lo phòng lộ đáy trước: lên mã giả cánh trái để hạn chế Xe công phá (lật ra Mã thật).'],
      ['i3i4', 'P', 'Đỏ không vội đưa Xe đi bắt quân mà làm đúng nguyên tắc 1: tiếp tục mở quân hàng trên. Chọn đấm nốt tốt biên bên kia (an toàn), không đụng tốt trung lộ. Lật ra Tốt.'],
      ['a6a5', 'p', 'Đen đấm tốt biên đuổi Xe, lật ra Tốt. Tốt a5 có quân úp a9 che phía sau nên Xe không ăn được, buộc phải chuyển chỗ.'],
      ['a4h4', null, 'nước tối ưu cho Xe: tránh Tốt mà vẫn có việc làm — Xe sang lộ 2 nhắm thẳng Pháo úp h7 của Đen, đồng thời đứng làm ngòi cho Pháo úp h2 phía sau. Một nước hai mục đích, không phí nhịp.'],
      ['g6g5', 'p', 'Đen đẩy tốt mong lật ra quân mạnh để phản kích nhưng chỉ lật ra Tốt, và chưa giải được áp lực trên lộ 2.'],
      ['h2h7', 'C', 'Pháo úp ở ô Pháo gốc nhảy qua ngòi là chính con Xe h4, ăn quân úp h7 — lật ra Pháo thật. Không quân Đen nào ăn lại được. Xe đứng đúng vị trí thì cả các quân phía sau cũng hưởng lợi: đó là cách "tối ưu lợi thế" khi mở Xe sớm.'],
    ],
  },
  'co-up-khai-thac-uu-the-khi-mo-xe': {
    moves: [
      ['a3a4', 'R', 'Đỏ mở được Xe hàng trên ngay nước đầu.'],
      ['b9c7', 'n', 'Đen chống bằng cách lên mã giả (lật ra Mã). Đây là lúc chọn hướng khai thác.'],
      ['a4c4', null, 'hướng 1 — chuyển Xe sang bắt quân: Xe nhắm Tốt úp c6, ô này Đen không có quân nào giữ. Hướng 2 là Pháo 2 tiến 7 vật mã đáy h9 (đổi Pháo lấy mã giả, tạo thế phức tạp) — dùng khi gặp người mạnh hơn; với người ngang sức thì chuyển Xe bắt quân, chơi chắc như ở đây.'],
      ['g6g5', 'p', 'Đen không giữ được Tốt 3 nên đẩy tốt mở quân tìm phản kích, nhưng lật ra Tốt.'],
      ['c4c6', null, 'Xe ăn Tốt: lợi thế hình thế biến thành lợi thế vật chất. Hơn nữa Xe c6 còn đứng ngay sau Mã c7 — Mã không có quân nào bảo vệ, Đen lại phải lo chạy Mã. Không đổi quân, không lao Xe sâu vào chỗ dễ bị giam: Xe vẫn đứng ở ô an toàn và khống chế cả cánh.'],
    ],
  },
  'co-up-mo-phao-som-toi-uu-loi-the': {
    moves: [
      ['i3i4', 'C', 'Đỏ đấm tốt biên lật trúng Pháo: Pháo biên đi thẳng bắt ô Xe giả i9 (ngòi là Tốt úp i6).'],
      ['h9i7', 'c', 'Đen chống đúng cách — gác Mã 8 tiến 9 che cột biên (nước mạnh nhất), nhưng quân này lật ra Pháo. Pháo i7 có ngòi i6 nên đang dọa ngược lại Pháo Đỏ ở i4.'],
      ['i4i7', null, 'đối phương gác mã và lộ Pháo thì ăn Pháo (đổi Pháo) là nước hay — không tham nhịp mở quân mà để mất Pháo hay vị trí. (Pháo 1 bình 5 chiếu Tướng cũng là một lựa chọn mạnh.)'],
      ['g9i7', 'b', 'Đen buộc ăn lại bằng Tượng úp (lật ra Tượng). Cánh phải Đen giờ rối: Tượng đứng i7 chặn đường quân úp i9, và Tốt biên i6 không còn ai giữ.'],
      ['i0i6', 'R', 'Xe úp ở góc tiến thẳng lên ăn Tốt biên (lật ra Xe thật). Đổi Pháo xong Đỏ đoạt luôn Tốt biên, đẩy Đen vào thế xấu — đúng tinh thần "thế trước, quân sau": chịu đi sau một nhịp nhưng thế cờ hơn hẳn.'],
    ],
  },
  'co-up-khai-thac-uu-the-khi-mo-phao': {
    moves: [
      ['a3a4', 'C', 'Đỏ mở được Pháo biên, nhắm ô Xe úp a9 (ngòi là Tốt úp a6).'],
      ['b9a7', 'n', 'Đen gác Mã 2 tiến 1 che cột biên (lật ra Mã).'],
      ['i3i4', 'R', 'Đỏ đấm tốt biên còn lại, lật ra Xe: giờ Đỏ đã có cả Xe và Pháo ở hàng trên. Việc tiếp theo không phải mở quân cầu may mà là đưa quân mạnh tới ô tốt nhất.'],
      ['h9g7', 'n', 'Đen lên Mã phòng thủ (lật ra Mã).'],
      ['i4c4', null, 'Xe 1 bình 7: Xe nhắm Tốt úp c6 — biến lợi thế hình thế thành thực lợi, đồng thời khống chế cánh trái Đen.'],
      ['a6a5', 'p', 'Đen đấm tốt biên đuổi Pháo a4 (lật ra Tốt).'],
      ['a4a7', null, 'Pháo không lùi mà mượn chính Tốt a5 làm ngòi, ăn Mã a7. Mỗi nước phải có mục đích: Pháo vừa tránh được Tốt, vừa ăn được quân.'],
      ['c9a7', 'b', 'Đen ăn lại Pháo bằng Tượng úp (lật ra Tượng) — nhưng Tốt c6 mất người giữ.'],
      ['c4c6', null, 'Xe ăn Tốt: đổi Pháo lấy Mã xong Đỏ còn lời thêm một Tốt, Xe đứng sâu khống chế cánh. Lợi thế thật được giữ và tăng dần, không cần chờ may mắn từ quân úp.'],
    ],
  },
};
