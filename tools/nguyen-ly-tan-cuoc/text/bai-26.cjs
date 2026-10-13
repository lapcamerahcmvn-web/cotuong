// Bài 26 — Chiến thuật chủ yếu cờ tàn: ngưng ngắt. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Chiến Thuật Chủ Yếu Cờ Tàn: Ngưng Ngắt',
  y: 'Ngưng ngắt (qua cửa): dùng chiếu Tướng, đuổi quân để được tiên, ép đối phương chuyển tới vị trí có lợi cho mình. Ở tàn cuộc dùng nhiều hơn, uy lực lớn hơn trung cuộc.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Ngưng Ngắt — Chiến Thuật Tranh Tiên',
      s: 'Ngưng ngắt là chiến thuật tranh tiên rất quan trọng; dùng hợp lý thì hiệu quả gấp bội.',
      c: `<p><strong>Ngưng ngắt</strong> là một chiến thuật tranh tiên rất quan trọng trong cờ tướng; dùng hợp lý sẽ phát huy hiệu quả gấp bội. Có thể hiểu là "qua cửa": qua chiếu Tướng, đuổi quân mà được tiên, ép đối phương điều chỉnh thành vị trí có lợi cho mình.</p>`,
    },
    '2 DON XE kheo thang SONG PHAO': {
      t: 'Đơn Xe Khéo Thắng Song Pháo',
      s: 'Đơn Xe đấu song Pháo: bên thủ đứng đúng vị trí thì hòa. Đen chưa về vị trí; Đỏ ngưng ngắt kìm Pháo lộ 4 và lời trắng một tiên, rồi ép Tướng Đen về tầng 1 và bắt Pháo.',
      c: `<p>Đơn Xe đấu song Pháo: nếu bên thủ đứng được vị trí trọng yếu thì hòa. Ở đây Đen chưa về vị trí nên Đỏ có cơ hội.</p>
<p>Mấy nước đầu rất có nghiên cứu: Tướng bình sang lộ 6 kìm Pháo lộ 4, mà vẫn tới lượt Đỏ — qua thao tác tinh tế, Đỏ <strong>lời trắng một nước tiên</strong>. Một tiên này rất quan trọng: nếu tới lượt Đen, Pháo lui 2 là Đỏ khó thắng gấp mấy lần.</p>
<p>Lúc này Đỏ chưa ăn ngay được Pháo vì Tướng Đen ở tầng 2; Đỏ lại dùng ngưng ngắt ép Tướng Đen về tầng 1, rồi bắt Pháo không giữ được. Xe chạy tới chạy lui, cuối cùng ép Tướng Đen tới chỗ có lợi nhất cho Đỏ — đó là uy lực của ngưng ngắt. Người đánh tàn tốt thường tinh tế, phần lớn là ở chỗ biết ngưng ngắt; và ngưng ngắt đòi hỏi nắm chuẩn cục diện — không biết nên ép Tướng đối phương đi đâu thì ngưng ngắt vô nghĩa.</p>`,
      k: { 8: 'Mấy nước rất có nghiên cứu: Tướng sang lộ 6 kìm Pháo lộ 4, mà vẫn tới lượt Đỏ — lời trắng một tiên. Nếu tới lượt Đen, Pháo lui 2 thì Đỏ khó thắng gấp mấy lần. Tiếp theo: ép Tướng Đen về tầng 1.', 13: 'Đuổi Pháo chiếu Tướng — ép Tướng Đen về tầng 1; sau đó Pháo bị bắt không giữ được.', 15: 'Xe chạy tới chạy lui, cuối cùng ép Tướng Đen tới vị trí có lợi nhất cho Đỏ và bắt chết Pháo — uy lực của ngưng ngắt.' },
      kq: 'thang', p: 'do',
    },
    '3 NGUNG NGAT THIET MON THUYEN KINH DIEN': {
      t: 'Ngưng Ngắt Kinh Điển Với Đòn Thiết Môn Thuyên',
      s: 'Đỏ hơn quân nhưng chỉ còn một Sĩ, Đen luôn dọa Xe Mã lãnh trước. Dựa vào uy hiếp Thiết môn thuyên, Đỏ chiếu và gọi sát liên tục, ăn Chốt, ăn Mã — Đen sụp đổ trong nháy mắt.',
      c: `<p><strong>Phân tích</strong>: Đỏ hơn quân nhưng chỉ có một Sĩ; Đen bất cứ lúc nào cũng dọa đòn Xe Mã lãnh trước, lại hơn Chốt. Nếu Đỏ không nhanh chóng mở rộng thành quả, Đen phản kích thì áp lực không nhỏ. Đỏ đã có uy hiếp <strong>Thiết môn thuyên</strong> — dùng ngưng ngắt tranh tiên ở mức độ lớn nhất. Trước hết phải giải quyết nước Mã Đen đạp Sĩ.</p>
<p>Lui Mã gọi sát; nhiều lần chiếu Tướng và gọi sát ăn trắng Chốt lộ 3 — thủ pháp ngưng ngắt kinh điển nhất trong thực chiến; một vòng tuần hoàn nữa ăn được Mã Đen. Trong nháy mắt Đỏ ăn được Mã và Chốt, Đen không đi được nước nào — Xe Mã Pháo đấu Xe, thắng chắc.</p>`,
      k: { 1: 'Lui Mã gọi sát.', 5: 'Thủ pháp ngưng ngắt kinh điển nhất trong thực chiến: nhiều lần chiếu Tướng, gọi sát, ăn trắng Chốt lộ 3.', 9: 'Sau khi ăn Chốt, thêm một vòng tuần hoàn — ăn được Mã Đen.', 11: 'Trong nháy mắt Đỏ ăn được Mã và Chốt, Đen không đi được nước nào — cục thế sụp đổ.', 15: 'Xe Mã Pháo đấu Xe — thắng chắc.' },
      kq: 'thang', p: 'do',
    },
    '4 SONG PHAO kheo thang XE SONG SI': {
      t: 'Song Pháo Khéo Thắng Xe Song Sĩ — Ngưng Ngắt Không Có Sĩ Làm Ngòi',
      s: 'Xe Đen kẹt ở chỗ Tướng; nếu tới lượt Đen thoát ra thì song Pháo bất lực. Đỏ chiếu rồi lui về tuyến hoành 2, rồi một nước chờ thần diệu ép Xe phải rời chỗ — và Pháo trùng sát.',
      c: `<p>Loại tàn này thường chỉ có trong cờ thế: Xe chạy về đúng chỗ của Tướng là vị trí rất xấu. Nếu tới lượt Đen, Xe thoát ra ngay và song Pháo không làm gì được. Đỏ phải nhân cơ hội tấn công — nhưng Đỏ không còn Sĩ làm ngòi. Chiến thuật trọng tâm là <strong>ngưng ngắt</strong>.</p>
<ul>
<li>Chiếu Tướng rồi lui về tuyến hoành 2 — thủ pháp ngưng ngắt kinh điển. Tiền đề: Đỏ biết Đen phải đi Tướng (nếu hạ Sĩ thì Pháo bình chiếu rút Xe).</li>
<li>Lui Pháo — tinh diệu, bản chất là một nước chờ. Nếu vội hạ Tướng trợ công thì Đen lui Sĩ chiếu. Xe Đen ở yên đó thì Đỏ hết cách, nhưng nhường Đen đi một nước: Tướng không đi được, Sĩ không đi được (hạ Sĩ thì Xe bị rút chết) — Xe phải rời chỗ.</li>
<li>Xe đi đâu? Nếu bình 3 thì Tượng chặn đường, Đen không thủ nổi Pháo trùng sát. Hạ Tượng là then chốt (nếu không Xe Đen kéo Pháo). Thấy được cái tinh diệu của việc chiếu Tướng rồi lui Pháo về tuyến hoành 2 từ đầu.</li>
</ul>`,
      k: { 3: 'Chiếu Tướng rồi lui về tuyến hoành 2 — ngưng ngắt kinh điển. Tiền đề: Đỏ biết Đen phải đi Tướng; nếu hạ Sĩ thì Pháo bình chiếu rút Xe.', 5: 'Lui Pháo — tinh diệu! Bản chất là nước chờ: nhường Đen đi, Tướng không đi được, Sĩ không đi được (hạ Sĩ thì Xe bị rút chết) — Xe phải rời chỗ. Đi đâu?', 6: 'Nếu Xe bình 3, Tượng chặn đường — Đen không thủ nổi đòn Pháo trùng.', 7: 'Hạ Tượng — then chốt, nếu không Xe Đen tiến kéo Pháo. Thấy cái tinh diệu của việc chiếu rồi lui Pháo về tuyến hoành 2 từ đầu.' },
      v: { 0: { 1: 'Nếu hạ Sĩ…', 4: '…Pháo sau bình 5 rút Xe.' }, 2: { 1: 'Nếu Xe bình 3…', 2: '…Tượng chặn đường — Pháo trùng sát.' } },
      kq: 'thang', p: 'do',
    },
    '5 MA PHAO thang DON XE': {
      t: 'Mã Pháo Thắng Đơn Xe — Ngưng Ngắt Siêu Hạng',
      s: 'Bước một: ép Xe Đen xuống thấp ("Xe sợ ở thấp, Tướng sợ ở cao"). Bảy nước gọi sát liên tục bằng song sát pháp và lưỡng chiếu — ngưng ngắt dài nhất — rồi tuyệt sát.',
      c: `<p>Ngưng ngắt ở trên thường gặp trong thực chiến; ván này cho thấy thế nào là <strong>ngưng ngắt siêu hạng</strong>.</p>
<p><strong>Phân tích</strong>: bài trước có ví dụ đơn Xe thắng Pháo Mã; nhưng ở đây bên Mã Pháo đã chiếm trung lộ, có thế công cục bộ nên có cơ hội. Đỏ không cẩn thận thì bị Đen dùng kìm chế phá. Đỏ cần kế hoạch kỹ lưỡng.</p>
<p>Việc thứ nhất: khiến <strong>Xe Đen xuống thấp</strong> — "Xe sợ ở thấp, Tướng sợ ở cao". Tướng Đen ở cao nhưng Xe cũng ở cao thì bất lợi cho Đỏ; Xe xuống thấp thì không gian thực thi kế hoạch lớn hơn nhiều.</p>
<ul>
<li>Lui Mã về điểm trọng yếu: Đen không thể bình Xe chiếu; Đỏ có song sát pháp (Mã lui, Mã tiến) — Đen chỉ còn cách đưa Xe xuống thấp.</li>
<li>Đỏ liên tục gọi sát, tốn bảy nước, ép Xe Đen xuống thấp — có thể gọi là ngưng ngắt dài nhất; để Xe Đen quay về thì hình thế khác hẳn.</li>
<li>Lại dùng lưỡng chiếu sát; cuối cùng một nước phản trực giác: truy sát ở đường sườn, không để Xe Đen lọt giữa Pháo Mã; Xe Đen quá thấp, không cướp được trung lộ — tuyệt sát.</li>
</ul>`,
      k: { 5: 'Lui về đây rất quan trọng — điểm trọng yếu chế thắng: Đen không bình Xe chiếu được; Đỏ có song sát pháp. Tướng lên thì Mã lui chiếu, Đen phải bỏ Xe; Xe bình 3 thì Mã tiến, Mã chiếu lưỡng chiếu sát. Đen chỉ còn đưa Xe xuống thấp.', 8: 'Đen dốc hết tâm tư mới giải được hai lộ sát cùng lúc — nhưng vẫn trong tính toán của Đỏ. Bước hai là gì?', 9: 'Dĩ nhiên không thể lui Mã — Đen bình Xe, Đỏ lại bị khốn chết.', 11: 'Vẫn lui Mã gọi sát.', 14: 'Đỏ gọi sát liên tục, tốn bảy nước, ép Xe Đen xuống thấp — ngưng ngắt dài nhất, hiệu quả rất tốt.', 17: 'Vẫn lợi dụng lưỡng chiếu sát!', 19: 'Nước phản trực giác: truy sát ở đường sườn, không để Xe Đen lọt giữa Pháo Mã; Xe Đen quá thấp không cướp được trung lộ — tuyệt sát.' },
      v: { 0: { 1: 'Nếu Tướng lên…', 3: '…Đen phải bỏ Xe.' }, 1: { 1: 'Nếu Xe bình 3…', 4: '…Mã chiếu — lưỡng chiếu sát.' }, 2: { 1: 'Nếu lui Mã…', 2: '…Xe bình — Đỏ bị khốn chết.' } },
      kq: 'thang', p: 'do',
    },
    '6 TUYEN CUOC HUA NGAN XUYEN thang DAO HAN MINH': {
      t: 'Ván Chọn: Hứa Ngân Xuyên Thắng Đào Hán Minh — Ngưng Ngắt Đơn Xe Đấu Mã Sĩ Tượng',
      s: 'Ăn được Chốt biên thì Xe Chốt tất thắng Mã Sĩ Tượng toàn; để Mã đổi Chốt thì hòa. Đỏ ra Tướng kìm Sĩ, dùng ngưng ngắt phá hình trận Đen, thành đơn Xe đấu Mã song Tượng — rồi thắng.',
      c: `<p>Đối cuộc thực chiến kinh điển. Tiêu điểm: Đỏ có ăn được Chốt biên không? Ăn được thì thành Xe Chốt đấu Mã Sĩ Tượng toàn — tất thắng; bị Mã đổi Chốt thì còn đơn Xe đấu Sĩ Tượng toàn — chắc hòa. Thoạt nhìn không ăn được: Xe bình 4 thì Mã tiến 8, Đỏ vô công; Xe tiến 2 thì Mã chạy một vòng, lấy Xe làm vật cản chặn Chốt qua sông rồi đổi Chốt — hòa.</p>
<p>Hình cờ khó vậy mà Đỏ vẫn tìm ra lời giải — mạch tính chính là <strong>ngưng ngắt</strong>.</p>
<ul>
<li>Ra Tướng — trông như nước rỗi, nhưng Đen cũng không có cách: lui Tượng thì song Tượng mất liên kết, Đỏ có nước bắt đôi ăn Tượng (Mã đơn khuyết Tượng phải về đúng vị trí mới hòa, mà Mã đi ăn Chốt rồi thì khó về); lui Sĩ thì Xe bình đuổi Sĩ, thành đơn Xe đấu Mã song Tượng — Đen khó về vị trí cũng thua. Để giữ Sĩ Tượng chỉnh tề, Đen chỉ có thể ra Tướng.</li>
<li>Đỏ chuyển hướng tinh diệu: Đen ăn Chốt quan trọng nên Đỏ nhảy Mã… Tướng Đỏ đã ra kìm Sĩ Đen nên Đen bị ép mất Sĩ.</li>
<li>Thành <strong>Xe đấu Mã song Tượng</strong>: bên Đen chỉ có một hình cờ thủ hòa, thực chiến rất khó đi tới, nên phần lớn không giữ được.</li>
<li>Song Tượng Đỏ phi lên chuẩn bị chu đáo; ép Mã Đen ra biên (Mã biên chỉ tồn tại trên danh nghĩa) rồi đòn sấm sét — bắt chết Tượng, Đỏ thắng.</li>
</ul>`,
      k: { 1: 'Trông như nước rỗi, nhưng Đen cũng không có cách: lui Tượng thì song Tượng mất liên kết, Đỏ có nước bắt đôi ăn Tượng; lui Sĩ thì Xe đuổi Sĩ, thành đơn Xe đấu Mã song Tượng. Để giữ Sĩ Tượng chỉnh tề, Đen chỉ có thể ra Tướng.', 4: 'Chuyển hướng tinh diệu: Tướng Đỏ đã ra kìm Sĩ Đen nên Đen bị ép mất Sĩ.', 10: 'Đơn Xe đấu Mã đơn khuyết Sĩ là hòa, nhưng Đen chưa về vị trí — Đỏ có thời gian ăn sạch Sĩ.', 20: 'Thành Xe đấu Mã song Tượng: bên Đen chỉ có một hình thủ hòa, thực chiến rất khó đi tới.', 41: 'Song Tượng phi lên — chuẩn bị chu đáo trước tổng tấn công.', 45: 'Nếu không phi Tượng, Mã Đen có thể nhảy lên phía trước — vẫn thắng nhưng khó hơn.', 50: 'Ép Mã Đen ra biên — Mã biên chỉ tồn tại trên danh nghĩa. Đòn sấm sét.', 55: 'Bắt chết Tượng — Đỏ thắng. Nếu Tượng tiến biên thì Xe bình bắt chết.' },
      v: { 0: { 1: 'Nếu Xe bình 4…', 2: '…Mã tiến 8 — Đỏ vô công.' }, 1: { 1: 'Nếu Xe tiến 2…', 8: '…Mã đổi Chốt — hòa.' }, 2: { 1: 'Nếu lui Tượng…', 12: '…song Tượng mất liên kết, Đỏ bắt đôi ăn Tượng.' } },
      kq: 'thang',
    },
    '7 TRONG DIEM BAI HOC': {
      t: 'Trọng Điểm Bài 26: Ngưng Ngắt Trên Con Đường Thành Thủ Cờ Tàn',
      s: 'Ngưng ngắt là biểu hiện tinh tế của tàn cuộc: cần phán đoán cục diện chuẩn và vận dụng chặt chẽ; ở tàn cuộc dùng nhiều hơn, uy lực lớn hơn trung cuộc.',
      c: `<ol>
<li><strong>Ngưng ngắt là biểu hiện tinh tế tỉ mỉ của tàn cuộc</strong>: cần phán đoán cục diện chính xác, nhạy bén, và công phu vận dụng chặt chẽ. Như ván cuối bài: ngoài cơ hội ban đầu nhờ Tướng trợ công, sau đó đơn Xe sát Mã song Tượng lúc nào cũng dùng ngưng ngắt thao túng — quân Đen có hạn, chỉ đi theo sắp đặt của đối phương.</li>
<li>So với trung cuộc, <strong>tỷ lệ dùng ngưng ngắt ở tàn cuộc cao hơn, uy lực lớn hơn</strong> — có tàn không có ngưng ngắt thì không thể thắng. Ngưng ngắt là thủ đoạn phải nắm trên con đường thành thủ cờ tàn.</li>
</ol>`,
    },
  },
};
