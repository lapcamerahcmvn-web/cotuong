// Bài 27 — Chiến thuật chủ yếu cờ tàn: cản trở. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Chiến Thuật Chủ Yếu Cờ Tàn: Cản Trở',
  y: 'Cản trở ở tàn cuộc chủ yếu để phòng thủ, nhưng cũng rất hiệu quả khi tấn công — nâng lên thành chiến lược: chọn đúng quân để cản quan trọng hơn thủ pháp.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Cản Trở Ở Tầm Chiến Lược',
      s: 'Cản trở là chiến thuật rất quan trọng ở tàn cuộc. Bài này nhìn từ góc độ đại cục: vì sao phải cản trở — nâng cản trở lên tầm chiến lược.',
      c: `<p>Ở chuyên đề trung cuộc ta đã nghiên cứu chiến thuật <strong>cản trở</strong>. Ở tàn cuộc, cản trở cũng vô cùng quan trọng. Bài này nhìn từ góc độ đại cục: <strong>vì sao phải cản trở</strong> — tức là nâng cản trở lên tầm chiến lược.</p>`,
    },
    '2 XE PHAO kho thang SONG PHAO SI TUONG TOAN': {
      t: 'Xe Pháo Khó Thắng Song Pháo Sĩ Tượng Toàn — Pháo Gánh Cản Trở',
      s: 'Hai Pháo Đen liều mình cản trở; điều cần nhớ là không để Pháo Đỏ chìm đáy kìm Sĩ Tượng. Phán đoán chủ lưu: Đỏ không thắng.',
      c: `<p>Nói tới cản trở, hình ảnh dễ nghĩ tới nhất là <strong>Pháo gánh</strong>. Xe Pháo đấu song Pháo Sĩ Tượng toàn rất hiếm gặp; có thắng được không thì khó kết luận, nhưng phán đoán chủ lưu là không thắng được.</p>
<p>Cách thủ của Đen rất đơn giản: hai Pháo liều mình cản trở (dù có lúc không cản được). Khi Xe Pháo Đỏ dồn về một cánh, Đen cản quân nào cũng không sao — quân nào xuống cũng không tạo được uy hiếp chí mạng. Nhưng phải nhớ: <strong>không để Pháo Đỏ chìm đáy kìm Sĩ Tượng</strong>, nếu không Đỏ có thêm đòn Xe bình trung lộ sát Sĩ Tượng.</p>
<p>Ở tàn cuộc, cản trở rất quan trọng với bên thủ: có những vị trí dù thế nào cũng không cho đối phương tới, liều chết cũng phải ngăn. Nhưng cản trở còn có tác dụng không nhỏ với bên công — xem ván tiếp theo.</p>`,
      k: { 3: 'Xe Pháo Đỏ dồn về một cánh, Đen phải chọn cản quân nào — cản quân nào cũng không sao, miễn không để Pháo Đỏ chìm đáy kìm Sĩ Tượng.', 8: 'Đỏ quả thật không thắng được.' },
      kq: 'hoa',
    },
    '3 TUYEN CUOC TON DUNG CHINH thang TRAN HOANG TINH': {
      t: 'Ván Chọn: Tôn Dũng Chinh Thắng Trần Hoằng Thịnh — Cản Đường Về Của Pháo',
      s: 'Xe Mã đấu Xe Pháo: Đỏ dùng Xe vừa cản Pháo Đen về nhà, vừa chặn Chốt Đen tiến — "nhất tiễn tam điêu". Đen bỏ lỡ mấy lần lui Pháo, Xe Pháo bị ghim ở tuyến đáy, Xe Mã lãnh trước kết thúc.',
      c: `<p><strong>Phân tích cục diện</strong>: Đỏ Xe Mã, Đen Xe Pháo — kẻ tám lạng người nửa cân. Đen hơn một Chốt (đã qua sông) nhưng thiếu một Tượng; xét kỹ thì Đen hơi ưu về binh lực (một Chốt đổi được song Tượng), nhưng hình trận Đen phân tán, Sĩ Tượng tán loạn. Đỏ phải thận trọng; mạch tính cơ bản là trước tiên ổn định cục diện.</p>
<h2>Cản trở ở tầm chiến lược</h2>
<p>Đỏ nâng Xe tới một vị trí "nhất tiễn tam điêu": cản và hạn chế Pháo Đen ở lộ 9 — "cờ tàn Pháo về nhà", không cho Pháo Đen về nhà là nhiệm vụ cấp bách; đồng thời không cho Chốt Đen tiến xuống. Một Xe kìm ba quân.</p>
<p>Đen bỏ lỡ mấy lần lui Pháo (nhánh phụ: Pháo lui 7 — Đỏ đổi Mã thì thành hòa). Đỏ nhanh chóng lui Xe chặn đường về, Pháo Đen từ đó không còn cơ hội; ăn xong Tượng vẫn quay về cản trở — chấp hành chiến lược rất kiên quyết (dùng Tượng cản thì có thể khóa chết, Xe cản thì không cản mãi được). Cuối cùng Xe Mã lãnh trước tổ sát thành công.</p>`,
      k: { 13: 'Xe nâng tới đây: cản Pháo Đen ở lộ 9 (cờ tàn Pháo về nhà — không cho Pháo Đen về là nhiệm vụ cấp bách), lại không cho Chốt Đen tiến — một Xe kìm ba quân, nhất tiễn tam điêu.', 14: 'Đường biên bị kìm, Đen dứt khoát tạm bỏ qua, bảo vệ Chốt trước.', 19: 'Mã Đỏ tiếp cận ngọa tào, phát động tấn công; đuổi Tượng đáy cũng rất hung hãn.', 25: 'Thế công bị cản, binh lực không đủ — Đỏ lại tiến Tượng chặn đường Xe Đen về phòng thủ. Đen không lo được vẹn toàn.', 30: 'Đen chỉ có thể ra Tướng, bị ép bỏ Tượng.', 31: 'Lạ là Đỏ không dám ăn: nếu Xe ăn Tượng, Pháo Đen lui về nhà, thế công vô hiệu, Tướng Đỏ lại nguy hiểm.', 32: 'Điểm mù: Đen tưởng Đỏ không ăn Tượng thì Pháo không về được; thật ra Pháo lui 7 về được — Đỏ đổi Mã, thành hòa.', 34: 'Vẫn nên lui Pháo — gần như cơ hội cuối cùng.', 35: 'Nhanh chóng lui Xe, không cho Pháo về — lão luyện. Từ đây Pháo Đen hết cơ hội quay về.', 64: 'Đỏ đi một vòng lại quay về, nhưng Đen đã mất Chốt giữa — thế thắng đã định.', 67: 'Ăn xong Tượng vẫn quay về cản trở — chấp hành chiến lược kiên quyết. Dùng Tượng cản thì khóa chết được, Xe cản thì không cản mãi.', 69: 'Vẫn lui thủ — lo Đen lui Xe đuổi Mã, cũng e ngại Chốt bình.', 71: 'Không ham Chốt — từ đầu tới cuối cản Xe Pháo Đen; lui Mã chuẩn bị tổ sát khi Xe Pháo Đen chưa về.', 77: 'Tổ sát thành công — Đen nhận thua.' },
      v: { 0: { 1: 'Nếu Xe ăn Tượng…', 4: '…Pháo lui về nhà — thế công vô hiệu.' }, 1: { 1: 'Điểm mù: Pháo lui 7 về được!', 6: 'Mã đổi quân — hai bên thành hòa.' }, 2: { 1: 'Vẫn nên lui Pháo…', 5: '…Xe Pháo Chốt Đen tổ sát nhanh hơn Xe Mã Đỏ.' }, 3: { 1: 'Dùng Tượng cản thì có thể khóa chết.' }, 4: { 1: 'Xe lui đuổi Mã — Đen còn cơ hội đưa Pháo về.' } },
      kq: 'thang',
    },
    '4 TRONG DIEM BAI HOC': {
      t: 'Trọng Điểm Bài 27: Chọn Quân Cản Quan Trọng Hơn Thủ Pháp',
      s: 'Cản trở chủ yếu dùng khi thủ nhưng rất hiệu quả khi công; nâng lên tầm chiến lược: phải chọn đúng quân liên quan đại cục để cản.',
      c: `<ol>
<li><strong>Ở tàn cuộc, cản trở chủ yếu dùng để phòng thủ</strong>, nhưng cũng rất hiệu quả khi tấn công — như ván vừa xem: cản đường lui của Xe Pháo Đen, khi chúng không tham chiến được thì nhanh chóng kích sát.</li>
<li><strong>Cản trở là một ý thức, nâng lên thành chiến lược</strong> — yêu cầu cao hơn cản trở ở tầm chiến thuật: đối phương nhiều quân như vậy, nên cản quân nào? Quân đó có liên quan đại cục hay không? Cản mãi mà không cản đúng trọng điểm thì không bằng không cản.</li>
</ol>
<p><strong>Tổng kết: chọn quân quan trọng hơn thủ pháp!</strong></p>`,
    },
  },
};
