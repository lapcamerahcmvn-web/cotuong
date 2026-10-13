// Bài 41 — Xe Pháo đơn Sĩ đấu Xe song Tượng. Lời giảng viết lại bằng lời riêng (không chép nguyên văn).
module.exports = {
  ten: 'Xe Pháo Đơn Sĩ Đấu Xe Song Tượng',
  y: 'Tàn cuộc khó mà cao thủ phải ôn đi ôn lại. Vị trí từng quân đều quyết định: Tượng cao hay Tượng đáy, Tướng tầng 1 hay tầng 2, Xe có ở tuyến đỉnh cung hay không — và đến lượt ai đi.',
  f: {
    '1 KHAI LUOC': {
      t: 'Khái Lược: Tàn Cuộc Cao Thủ Phải Ôn Mãi',
      s: 'Hai tàn cuộc tiếp theo độ khó và độ nổi tiếng đều tăng thêm một bậc. Xe Pháo đơn Sĩ đấu Xe song Tượng — ngay cả bậc thầy tàn cuộc cũng phải định kỳ ôn lại các chiến thuật trọng yếu.',
      c: `<p>Hai tàn cuộc khó phía trước hẳn đã cho thấy sự tinh thâm áo diệu của tàn cuộc — nhưng đừng buông lỏng: hai tàn cuộc tiếp theo cả độ nổi tiếng lẫn độ khó đều tăng thêm một bước.</p>
<p>Bài này bàn <strong>Xe Pháo đơn Sĩ đấu Xe song Tượng</strong>. Có giai thoại về Dương Quan Lân — nhân vật tiêu biểu của cờ tàn cận đại, công lực tàn cuộc thâm hậu đến mức được gọi là "ma cờ": dù nghiên cứu rất kỹ, cứ một thời gian ông lại ôn lại các chiến thuật trọng yếu của loại tàn này, nếu không sẽ quên vài chi tiết. Một tàn cuộc như vậy gần như là "bữa cơm hằng ngày" của cao thủ. Vậy rốt cuộc khó ở đâu?</p>`,
    },
    '2 TRAN CHIEN DAU TIEN XE PHAO DON SI thang XE SONG TUONG': {
      t: 'Trận Thứ Nhất: Pháo Thiểm Kích Ăn Tượng, Hải Để Lao Nguyệt',
      s: 'Xe Đen ở tuyến đỉnh cung, Tướng Đen ở tầng dưới: Đỏ có nước khéo kinh điển — Pháo rời khỏi chỗ kìm Xe để thiểm kích ăn Tượng, rồi lên Tướng phối hợp Pháo chìm đáy: hải để lao nguyệt.',
      c: `<p>Xe Đen ở <strong>tuyến đỉnh cung</strong>, Tướng Đen ở tầng dưới — Đỏ có một nước khéo kinh điển.</p>
<p>Thủ đoạn này đi ngược lẽ thường: Pháo khó khăn lắm mới kìm được Xe, sao lại rời đi? Nhưng chính vì Xe Đen đứng ở tuyến đỉnh cung nên Đỏ có cơ hội <strong>ăn Tượng</strong>: Đỏ bắt chết Tượng, nhân thời cơ hạ Sĩ về trước; Đen không bảo toàn được Tượng, chỉ có thể ăn Sĩ trước.</p>
<p>Tinh hoa: ăn Tượng xong Đỏ có thể lên Tướng ngay phối hợp Pháo chìm đáy thành <strong>hải để lao nguyệt</strong>, nhưng Đỏ cố ý chậm một chút để Đen phi Tượng lên có cơ hội chiếm trung lộ — biến số rất lớn — rồi mới kết liễu.</p>
<p>Đây là thủ pháp nhiều người có công phu tàn cuộc đều biết; không ít người cho rằng biết hình này là biết thắng. Thực tế hiểu được nước này có lẽ <strong>mới chỉ là nhập môn</strong>.</p>`,
      k: { 5: 'Pháo rời chỗ kìm Xe — ngược lẽ thường, nhưng Xe Đen ở tuyến đỉnh cung nên Đỏ có cơ hội ăn Tượng. Đỏ bắt chết Tượng, nhân thời cơ hạ Sĩ; Đen chỉ có thể ăn Sĩ trước.', 12: 'Tinh hoa: ăn Tượng xong có thể lên Tướng ngay phối hợp Pháo chìm đáy thành hải để lao nguyệt; nhưng chậm một chút cho Đen phi Tượng chiếm trung lộ thì biến số sẽ rất lớn.', 17: 'Hải để lao nguyệt — sát! Biết hình này có lẽ mới chỉ là nhập môn.' },
      v: { 0: { 1: 'Nếu Tướng sang…', 2: '…Pháo tiến, Tướng lên…', 4: '…hạ Sĩ — Tượng Đen bị bắt chết.' } },
      kq: 'do',
    },
    '3 TRAN CHIEN THU HAI BIEN HOA DEN CAO TUONG': {
      t: 'Trận Thứ Hai: Đen Tượng Cao — Ép Tướng Lên Tầng 2',
      s: 'Thế thường gặp hơn. Vị trí từng quân đều quyết định thắng hòa. Đỏ ngưng ngắt ép Xe Đen rời tuyến đỉnh cung, đuổi Tướng Đen lên tầng 2, rồi nhân lúc song Tượng mất liên kết mà trốc chết Tượng.',
      c: `<p>Giải pháp trận thứ nhất thực chiến không đặc biệt thực dụng; thường gặp hơn là thế này. Ở tàn cuộc này <strong>vị trí mỗi quân đều cực kỳ quan trọng</strong>: trừ Tướng gần như cố định, vị trí các quân khác thay đổi đều ảnh hưởng rất lớn đến kết quả — Đen Tượng cao hay Tượng đáy, Tướng Đen ở tầng 2 hay tầng 1, Xe Đen có ở tuyến đỉnh cung hay không… Đây là tàn cuộc luyện công phu cơ bản — nắm vững trước rồi mới tới nội dung khác.</p>
<h2>Các bước</h2>
<ul>
<li>Vị trí Xe Đen rất quan trọng: trước tiên ép Xe Đen lui khỏi tuyến đỉnh cung.</li>
<li><strong>Ép Tướng Đen lên tầng 2</strong> — chi tiết quan trọng để giành thắng; không như vậy thì gần như không thắng được.</li>
<li>Tướng Đỏ tiến lên giữ thành quả, nếu không Xe Đen có thể lại xuống.</li>
<li>Đen có ba cách đi; ra Tướng thì thua ngay (song Tượng mất liên kết, gọi sát là mất Tượng); Tướng xuống thì tĩnh quan kỳ biến — Đỏ vẫn đuổi Tướng lên tầng 2, nhân lúc song Tượng chưa liên kết chạy Xe sang lộ 3, <strong>trốc chết Tượng</strong>.</li>
</ul>
<p>Lưu ý: nếu Tướng Đen ở tầng 1 thì Đen phi Tượng được, Đỏ rất khó thắng — vì thế phải cố định Tướng Đen ở tầng 2.</p>`,
      k: { 1: 'Vị trí Xe Đen rất quan trọng — Đỏ có cơ hội: trước tiên ép Xe Đen lui.', 4: 'Thông thường đều phải ép Tướng Đen lên tầng 2 — chi tiết quan trọng để giành thắng.', 5: 'Trốc Tượng.', 7: 'Ngưng ngắt ép Xe Đen rời đi rồi — giờ phải giữ thành quả: Tướng Đỏ tiến lên, nếu không Xe Đen có thể lại xuống. Đen có ba cách đi — học được thủ pháp thắng kinh điển.', 8: 'Ra Tướng: song Tượng thoát cản, nhưng ra Tướng là thua thẳng.', 11: 'Tiền đề của nước này là song Tượng Đen mất liên kết: gọi sát xong, Đen tất mất Tượng.', 15: 'Đỏ thắng.' },
      v: { 0: { 1: 'Tướng xuống: không ra Tướng được thì tĩnh quan kỳ biến.', 3: 'Vẫn phải đuổi Tướng lên tầng 2 — rất quan trọng, không như vậy thì không thắng được.', 6: 'Nhân lúc song Tượng chưa liên kết, chạy Xe sang lộ 3 để sau trốc chết Tượng — chỗ tinh hoa. Đen không phi Tượng được vì Xe Đỏ thoát thân; nếu Tướng Đen ở tầng 1 thì phi Tượng được, Đỏ rất khó thắng.', 8: 'Trốc chết! Nếu phi Tượng thì Xe chiếu ép Tướng lên trước rồi ăn Tượng. Nắm các chi tiết này là đã nhập môn.' }, 1: { 1: 'Nếu phi Tượng…', 2: '…Xe chiếu ép Tướng lên…', 4: '…rồi ăn Tượng.' } },
      kq: 'do',
    },
    '4 TUYEN CUOC LU KHAM hoa HONG TRI': {
      t: 'Ván Chọn: Lữ Khâm Hòa Hồng Trí — Cuộc Chiến Nước Chờ',
      s: 'Ở đây Đen cầm Xe Pháo đơn Sĩ, Đỏ giữ Xe song Tượng. Đỏ lão luyện lên Tướng trước một bước, biến vấn đề thành bài toán đếm nước: đến lượt Đen thì Đen phải tìm cách "lợi" một nước. Đen nóng vội, đánh Pháo lên — hòa. Nhánh phụ chỉ ra cách thắng đúng.',
      c: `<p>Lần này đổi màu quân: <strong>Đen cầm Xe Pháo đơn Sĩ</strong>, Đỏ giữ Xe song Tượng. Đến lượt Đỏ đi, Đỏ đã rất lão luyện <strong>lên Tướng</strong> — thấm nhuần tinh hoa.</p>
<p>Vần nhau đã lâu, Đen có chút rối. Hai nước tiếp theo cho thấy cả hai đều biết chiến thuật: Tướng Đỏ ở tầng 2, Đen nóng vội trực tiếp đánh Pháo lên — kết quả hòa.</p>
<p>Nhiều người không hiểu: quán quân toàn quốc mà không thắng được thế này? Thực tế thắng không dễ. Đỏ lên Tướng trước một bước khiến vấn đề thành <strong>bài toán đếm nước</strong>: nếu lúc này vẫn đến lượt Đỏ thì Đen dễ chịu (Tướng Đỏ xuống thì thành sát pháp nhập môn; Xe Đỏ lui thì Tướng Đen lên cướp tuyến đỉnh cung). Nhưng đến lượt Đen — Đen phải tìm cách <strong>lợi một nước</strong>.</p>
<h2>Cách thắng đúng (nhánh phụ)</h2>
<ul>
<li>Lợi dụng nước chờ, "lãng phí" một nước mới hình thành được cục diện thắng; Đen phải tính số nước.</li>
<li>Phải giữ Tướng Đỏ ở tầng 2. Khi đó Đỏ chỉ còn hai lựa chọn: xuống Tướng (đã biết) hoặc lui Xe.</li>
<li>Tướng Đen lên cướp tuyến đỉnh cung; Đỏ đi nước rỗi thì thành như trận thứ hai.</li>
<li>Bình Xe sang bên kia — nước then chốt ép Đỏ phi Tượng: Tướng Đỏ không sang được vì Tướng và Tượng cùng một cánh, Đen chiếu Tướng ăn Tượng. Vì thế cục diện ở bên trái hay bên phải cũng liên quan không nhỏ.</li>
<li>Chiếu hai nước trước rồi mới chuyển Xe: nếu bình Xe sang thẳng, Tướng Đỏ ở tầng 1 phi Tượng cản được — Đen phí công; chuyển Xe như vậy thì Đỏ phi Tượng là Xe chiếu mời Tướng lên rồi ăn Tượng.</li>
</ul>`,
      k: { 1: 'Đỏ (bên Xe song Tượng) lão luyện lên Tướng — thấm nhuần tinh hoa. Vần nhau đã lâu, Đen bắt đầu rối.', 4: 'Cả hai đều biết chiến thuật: Tướng Đỏ ở tầng 2, Đen nóng vội trực tiếp đánh Pháo lên — thành hòa.', 13: 'Hai bên đồng ý hòa. Thắng không dễ: Đỏ lên Tướng trước một bước khiến vấn đề thành bài toán đếm nước — đến lượt Đen, Đen phải tìm cách lợi một nước.' },
      v: { 0: { 1: 'Cách thắng chính xác như sau.', 7: 'Lợi dụng nước chờ — lãng phí một nước mới hình thành được cục diện thắng.', 10: 'Cục diện rất quan trọng — Đen phải tính số nước.', 11: 'Nước này rất quan trọng: phải giữ Tướng Đỏ ở tầng 2.', 21: 'Cả đoạn trước là để giữ Tướng Đỏ ở tầng 2. Giờ Đỏ chỉ còn hai lựa chọn: xuống Tướng hoặc lui Xe.', 23: 'Lên Tướng cướp tuyến đỉnh cung. Nếu Đỏ vẫn lui Xe đi nước rỗi thì thành như trận thứ hai.', 27: 'Bình Xe — nước then chốt ép Đỏ phi Tượng: Tướng Đỏ không sang được vì Tướng và Tượng cùng một cánh, Đen chiếu Tướng ăn Tượng.', 33: 'Chiếu hai nước rất quan trọng: bình Xe thẳng thì Tướng Đỏ ở tầng 1 phi Tượng cản được; chuyển Xe như vậy thì Đỏ phi Tượng là Xe chiếu mời Tướng lên rồi ăn Tượng.' } },
      kq: 'hoa',
    },
    '5 CUOC SAU CUNG THACH THUC CUOI CUNG CUA PHAO DON SI': {
      t: 'Thử Thách Cuối Cùng: "Càn Khôn Đại Na Di"',
      s: 'Cục diện khó nhất: Tướng Đen ở cánh trái nên Pháo không thiểm kích được, Xe Đen ở tuyến đỉnh cung. Đỏ phải giữ Tướng Đen ở tầng 2, ép Xe Đen lui, rồi đảo Sĩ – lui Pháo – dịch Tướng sang cánh kia để Tướng hai bên không cùng một phía.',
      c: `<p>Có lẽ là cục diện khó nhất của Xe Pháo đơn Sĩ đấu Xe song Tượng — tài liệu về nó rất hiếm.</p>
<ul>
<li><strong>Tướng Đen ở cánh trái</strong>: Đỏ không thể dùng Pháo thiểm kích để thắng như trận thứ nhất.</li>
<li><strong>Xe Đỏ ở lộ 6, Xe Đen ở tuyến đỉnh cung</strong>: cách thắng thứ hai cần Xe đối phương không ở tuyến đỉnh cung — phải ép nó rời đi, mà việc này không dễ: Xe Đỏ rời lộ 6 là Tướng Đen lập tức ra.</li>
</ul>
<p>Hai điểm mấu chốt: nếu Xe Đỏ ở lộ 4 thì dễ thắng; và Tướng Đen với Sĩ Đỏ ở khác cánh nên Pháo không thiểm kích ăn Tượng được — tốt nhất là ép Xe Đen rời tuyến đỉnh cung.</p>
<h2>Thử lần đầu: thất bại</h2>
<p>Đỏ định vị ép Tướng Đen di chuyển để tìm nước chuyển đổi — nhưng Đen hạ Tượng, chiếm đường sườn rồi ra Tướng; Đen gọi chiếu ăn Sĩ, kế hoạch Đỏ phá sản: Đỏ không có cách vừa cướp tuyến đỉnh cung vừa kìm được trung lộ.</p>
<h2>Giữ Tướng Đen ở tầng 2</h2>
<p>Nếu ngay từ đầu Đỏ tìm cách để <strong>Tướng Đen ở tầng 2</strong> thì cục thế khác hẳn (nhánh phụ): Xe tiến 1 — Đen chỉ có thể đi Tượng; trốc như vậy Đen chỉ có thể phi Tượng — Tượng cao và Tượng đáy khác biệt rất lớn. Xe Đỏ tiến lên vẫn ở vị trí cao, đồng thời nhắm Tượng Đen phòng Xe Đen ép xuống — vừa chiếm tuyến đỉnh cung vừa kìm trung lộ. Rồi tiêu diệt Tượng Đen.</p>
<h2>Càn khôn đại na di</h2>
<p>Nhưng Đen chống còn tinh hơn: Xe lui 3 (không phải lui 2) giữ tuyến kỵ hà — vừa tranh tuyến đỉnh cung vừa giữ kỵ hà. Đỏ phải tinh tế: ăn được Tượng vì Xe Đen bị Tượng cản. Đỏ lui Xe — xong bước một (ép Xe Đen lui). Nhưng Đen nhanh chóng <strong>xuống Tướng</strong> — điểm trọng yếu phòng thủ: Tướng ở tầng 1 tránh được đại đa số vấn đề. Xe Đỏ và Tướng khác lộ nên không mời được Tướng Đen lên; Tướng Đen chơi trò "bịt mắt bắt dê" với Xe Đỏ.</p>
<p>Lời giải: <strong>xoay chuyển trời đất</strong> — dùng Pháo ép Xe Đen lui, đảo Sĩ sang phải, lui Pháo, dịch Tướng Đỏ sang cánh kia để <strong>Tướng hai bên không cùng một phía</strong>. Khi đó các cách tấn công nói ở đầu bài lại sống dậy, rồi đi theo mạch của ván Lữ Khâm – Hồng Trí là thắng.</p>`,
      k: { 1: 'Định vị ép Đen di chuyển Tướng để tìm vài nước chuyển đổi — cách nghĩ ban đầu, về sau phát hiện có vấn đề.', 2: 'Nếu Đen lui Xe thì Đỏ thuận lợi lên Tướng — bước một hoàn thành, biến hóa đơn giản.', 4: 'Hạ Tượng lúc này rất quan trọng — phi Tượng cao thì kém đi nhiều.', 8: 'Chiếm được đường sườn, Đen lập tức ra Tướng — Đỏ bối rối.', 12: 'Đen gọi chiếu ăn Sĩ — kế hoạch Đỏ phá sản: không có cách vừa cướp tuyến đỉnh cung vừa kìm trung lộ. Nhưng nếu ngay từ đầu Đỏ giữ được Tướng Đen ở tầng 2 thì khác hẳn.' },
      v: {
        0: { 1: 'Xe sang lộ 4 chuẩn bị đuổi Xe Đen…', 2: '…Tướng Đen lập tức ra…', 3: '…Xe Đỏ lại phải quay về.' },
        1: { 1: 'Cách tốt hơn: Xe tiến 1 — Đen chỉ có thể đi Tướng.', 5: 'Trốc như vậy Đen chỉ có thể phi Tượng — lợi ích cực lớn khi Tướng Đen ở tầng 2. Tượng cao và Tượng đáy khác biệt rất lớn!', 7: 'Nước trốc này — Đen lui về đâu cũng rất quan trọng.', 11: 'Xe Đỏ ở vị trí cao, đồng thời nhắm Tượng phòng Xe Đen ép xuống — vừa chiếm tuyến đỉnh cung vừa kìm trung lộ. Làm được điều này thì cách thắng không còn xa.', 13: 'Coi như xong bước một.', 17: 'Điều đặc biệt: nếu Tướng Đen ở tầng dưới thì Đỏ lại rất khó thắng.', 21: 'Vẫn là thủ pháp giành thắng quen thuộc — biến hóa bao nhiêu cũng không ngoài mục đích cuối cùng.', 25: 'Tiêu diệt Tượng Đen. Nhưng phía trước mới là tình tiết cao cấp thật sự.' },
        2: { 1: 'Phòng thủ tinh hơn: Xe lui 3 (không phải lui 2) — giữ tuyến kỵ hà, vừa tranh tuyến đỉnh cung vừa giữ kỵ hà, Đỏ rất khó xoay xở.', 5: 'Đen giữ được cả hai mục tiêu.', 6: 'Hay ở chỗ Đỏ ăn được Tượng vì Xe Đen bị Tượng cản. Đen không trực tiếp uy hiếp được; Đỏ lui Xe về, tiếp tục thao túng trung lộ — gần thắng thêm một bước.', 10: 'Điểm trọng yếu: Đỏ muốn Tướng Đen ở tầng 2 lâu dài (tầng 1 an toàn hơn cho bên thủ). Lui Xe là tiến — xong bước một: ép Xe Đen lui. Nhưng tình huống tiếp vẫn gay gắt.', 11: 'Đen nhanh chóng xuống Tướng — điểm trọng yếu phòng thủ: Tướng ở tầng 1 tránh được đại đa số vấn đề.', 13: 'Xe Đỏ và Tướng khác lộ nên không mời được Tướng Đen lên; mời lên thì Xe cũng phải nhấc theo và Tướng Đen lại xuống — trò "bịt mắt bắt dê". Lời giải: càn khôn đại na di.', 16: 'Đây cũng là lý do Đỏ cần Pháo ép Xe Đen lui.', 24: 'Đảo Sĩ sang bên phải trước.', 26: 'Lui Pháo — đại thể đã hoàn thành phần chính của càn khôn đại na di.', 34: 'Tốn công xoay chuyển trời đất là để Tướng Đỏ và Tướng Đen không cùng một phía — các cách tấn công lúc đầu lại sống dậy.', 35: 'Đen ngoan cường cản trở.', 46: 'Tới đây, đi theo mạch của ván Lữ Khâm – Hồng Trí là thắng.' },
      },
    },
  },
};
