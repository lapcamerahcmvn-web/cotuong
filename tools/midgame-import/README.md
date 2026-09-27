# Midgame book import — quy trình chuyển tài liệu trung cuộc thành Lesson

Dùng khi biên soạn bài trung cuộc từ tài liệu tham khảo nội bộ (file scan PDF, không có lớp text —
xem `CLAUDE.md` mục bản quyền: KHÔNG public tên nguồn/tác giả, chỉ trích ký hiệu nước đi + thế cờ
làm dữ kiện, viết lại lý thuyết 100% bằng lời riêng).

Series đích: **LessonSeries id=12**, slug `nen-tang-nguyen-ly-trung-cuoc`, phase=`trung-cuoc`.

## Khác biệt quan trọng so với sách khai cuộc

Sách khai cuộc (`tools/opening-book-import/`) luôn bắt đầu từ thế cờ mặc định — chỉ cần chuỗi ký
hiệu nước đi. **Sách trung cuộc thì KHÔNG** — mỗi bài bắt đầu từ 1 thế cờ tuỳ ý (đã đi được vài
chục nước), thể hiện qua 1 hình vẽ bàn cờ ở đầu bài. Phải tự dựng FEN từ hình vẽ đó trước khi áp
được chuỗi nước tiếp theo.

## Quy trình 6 bước

1. **Tìm bài + hình bắt đầu**: render trang PDF bằng Python (`pymupdf`) ở DPI thường (150) để đọc
   chữ, tìm tiêu đề "BÀI N" + hình vẽ đầu tiên (thường "Hình 1" của bài đó — SỐ HÌNH LẶP LẠI mỗi
   bài, không phải số hình toàn sách).
2. **Crop hình ở DPI cao (300) để đọc chính xác**: dùng Python/PIL crop đúng vùng hình vẽ (xem ví
   dụ code bên dưới). Đọc quân theo nhãn cột: nhãn TRÊN "1..9 trái→phải" = cột sách phía Đen = cột
   vật lý luôn; nhãn DƯỚI "9..1 trái→phải" = cột sách phía Trắng, cột vật lý = 10 − nhãn.
   ⚠️ **QUAN TRỌNG — bài học từ Bài 2 (tốn rất nhiều thời gian mới rút ra)**: đọc bằng mắt qua nhiều
   lần crop khác nhau RẤT DỄ lệch cột (crop khác biên → mắt nhìn "gần đúng" nhưng sai 1 cột, nhất
   là 2 quân cùng loại đứng gần nhau). **Cách chắc chắn nhất**: dùng code dò tâm pixel của CHÍNH
   CHỮ SỐ nhãn cột (không phải đường kẻ bàn cờ — đường kẻ dễ bị quân cờ che khuất gây lệch), rồi vẽ
   đè 9 đường dọc màu đỏ tại đúng toạ độ đó lên ảnh gốc để so bằng mắt — quân nào không nằm khớp
   ngay trên 1 đường là đọc sai, sửa lại ngay. Code mẫu dò tâm nhãn cột:
   ```python
   import numpy as np
   from PIL import Image
   arr = np.array(Image.open('full-page.png').convert('L'))
   band = arr[Y1:Y2, X1:X2]  # dải ngang chứa hàng nhãn cột (1..9 hoặc 9..1), Y1:Y2 ôm sát chữ số
   colsum = (band < 150).sum(axis=0)
   xs = np.where(colsum > 0)[0]
   groups, cur = [], [xs[0]]
   for x in xs[1:]:
       (cur.append(x) if x - cur[-1] <= 5 else (groups.append(cur), cur := [x]))
   groups.append(cur)
   centers = [(g[0] + g[-1]) / 2 + X1 for g in groups]  # 9 toạ độ x, đúng tâm từng chữ số nhãn
   ```
   Sau đó vẽ `ImageDraw.line` đè lên ảnh tại các `centers` này (kèm ảnh gốc, DPI cao) rồi `Read` lại
   để so — làm bước này TRƯỚC khi dựng FEN, không làm sau, tiết kiệm rất nhiều lần dựng lại.

   **Áp dụng tương tự cho HÀNG** (dễ nhầm hàng hơn cả cột vì không phải hàng nào cũng có nhãn số) —
   dò đường kẻ ngang bằng cách quét 1 CỘT dọc (ở vị trí chắc chắn không có quân, ví dụ giữa cột 1
   và 2) rồi tìm các đoạn tối liên tục (đường kẻ bàn cờ luôn hiện, không bị quân che ở cột trống):
   ```python
   col = arr[Y1:Y2, X_EMPTY]  # 1 cột dọc, X_EMPTY = toạ độ x của 1 cột chắc chắn trống quân
   dark = np.where(col < 150)[0]
   # gom nhóm liên tiếp (cách nhau <=4px) -> tâm mỗi nhóm = 1 đường kẻ hàng, đúng 10 đường (hàng 0-9)
   ```
   Vẽ đè cả 9 đường dọc (cột) VÀ 10 đường ngang (hàng), có nhãn số, lên 1 ảnh rồi so — đây là cách
   nhanh và chắc chắn nhất, đã dùng thành công cho Bài 4 (thế cờ dày đặc quân vẫn đọc đúng ngay lần
   đầu nhờ cách này, không phải dựng lại nhiều lần như Bài 2).
3. **Dựng FEN tay**: 10 hàng cách nhau `/`, hàng 0 = trên/Đen → hàng 9 = dưới/Trắng. Dùng
   `checkPieceCounts(fen)` trong `midgame-parser.cjs` để bắt lỗi đọc nhầm quân (Tướng phải đúng 1
   mỗi bên, Sĩ/Tượng/Xe/Pháo/Mã ≤2, Tốt ≤5).
4. **Parse chuỗi nước + validate**: `applyGameFromFen(fen, ['X2-5','Tg5-6',...], 'do'|'den')` —
   tham số cuối là bên đi nước ĐẦU TIÊN trong chuỗi (sách luôn ghi rõ ai đi trước, không mặc định
   là Trắng như sách khai cuộc). Tự ném lỗi nếu gõ sai/thiếu nước.
5. **Verify bằng mắt**: render FEN bắt đầu (và các mốc "Hình N" giữa bài nếu có) bằng
   `tools/og-image/render-board.cjs` + `@resvg/resvg-js`, so với ảnh crop gốc trước khi ghi DB.
6. **Viết + ghi + đồng bộ**: viết nội dung 100% bằng lời riêng → `LessonComposer::create()` với
   `initial_fen` = FEN tự dựng (KHÔNG phải thế cờ mặc định) → publish → `cotuong:export-content` →
   commit + push.

## ⭐ Phát hiện quan trọng nhất (từ Bài 5) — phân biệt màu quân bằng CHỮ, không phải bằng mắt tô đen/trắng

Sách này dùng **CHỮ KHÁC NHAU cho Pháo mỗi bên** (giống hệt quy ước Tốt/Chốt và Tướng/Soái đã biết):
- **`砲` = quân Pháo bên ĐEN** (quân đen/filled trong hình)
- **`炮` = quân Pháo bên TRẮNG** (quân đỏ/outline trong hình)

Đây là cách phân biệt màu quân **chắc chắn hơn nhiều** so với nhìn tô đen/trắng — ở thế cờ dày
đặc quân (như Bài 5, ~28-30 quân), nhìn màu qua nhiều lần crop/zoom rất dễ nhầm (đã xảy ra ở Bài 5:
đọc nhầm 2 quân từ "quân Trắng" thành "quân Đen" và ngược lại, phải dò lại nhiều lần mới ra). Kiểm
tra CHỮ trước, nếu vẫn nghi ngờ mới crop zoom to để xem viền tô đen hay để trắng.

**Cập nhật (Bài 7): Sĩ và Tượng CŨNG có chữ riêng theo phe** — chỉ Xe và Mã là dùng chung 1 chữ
cho cả hai bên, PHẢI phân biệt bằng tô đen/viền trắng (không có mẹo chữ):
| Quân | Bên Đen | Bên Trắng |
|---|---|---|
| Tướng | 將 | 帥 |
| Tốt | 卒 | 兵 |
| Pháo | 砲 | 炮 |
| Sĩ | 士 | 仕 |
| Tượng | 象 | 相 |
| Xe/Mã | (chữ giống nhau, chỉ phân biệt bằng tô đen/viền trắng — bắt buộc crop kỹ) |

## Ký hiệu sách (khác 1 điểm so với sách khai cuộc)

Giống hệt `../opening-book-import/README.md` (P/M/X/B/S/V, verb `-` `.` `/`) **cộng thêm**:
- `Tg` = Tướng (2 ký tự, ví dụ `Tg5-6`) — sách khai cuộc gần như không cần vì Tướng ít khi di
  chuyển ở giai đoạn khai cuộc. `midgame-parser.cjs` tự chuẩn hoá `Tg` → `T` trước khi parse.
- ⚠️ **Đã gặp ở Bài 9**: sách dùng ký hiệu "trước/sau" kiểu `Ps/2` (Pháo sau, KHÔNG kèm số cột) khi
  cần phân biệt quân — nhưng thực tế 2 quân cùng loại không nhất thiết cùng cột trong sách này, nên
  ký hiệu này còn mơ hồ hơn cả dự tính ban đầu (thử nghiệm cho thấy áp cả 2 khả năng đều không khớp
  luật hợp lệ ở Bài 9). `midgame-parser.cjs` CHƯA hỗ trợ ký hiệu này. **Cách xử lý tạm**: nếu gặp,
  ưu tiên tìm 1 nước khác trong cùng đoạn văn (thường sách có nhiều nước rõ ràng hơn xen kẽ) thay vì
  cố giải mã `Ps`/`Xs`/`Ms` — đã áp dụng thành công ở Bài 9 (chọn nước "15.B5.1" rõ ràng thay vì
  "17...Ps/2"). Nếu cần làm hẳn, phải mở rộng `parseOne()` nhận diện theo vị trí hàng thực tế của
  từng quân cùng loại trên bàn (không chỉ dựa vào cột gốc).

## Code mẫu — crop hình ở DPI cao

```python
import fitz
from PIL import Image
doc = fitz.open(r'E:\sach-co-tuong\...trung cục....pdf')
pix = doc[PAGE_INDEX].get_pixmap(dpi=300)
pix.save('full-page.png')
img = Image.open('full-page.png')
crop = img.crop((left, top, right, bottom))  # ước lượng vùng hình rồi crop thử, chỉnh lại nếu cắt thiếu cột 1-2
crop.save('crop.png')
```

## Ví dụ đã dùng (Bài 1)

FEN dựng tay: `2b1k4/3R3R1/4b4/9/9/9/9/9/1r3r3/3AKA3` — khớp `checkPieceCounts` (không lỗi), khớp
render trực quan với Hình 1 gốc.

## ⚠️ Lưu ý — lệch số trang PDF từ khoảng trang in 258 trở đi

Từ Bài 25 trở đi phát hiện `doc[N]` (0-indexed, pymupdf) KHÔNG còn bằng `số trang in - 1` như
trước nữa — công thức mới đã xác nhận ổn định xuyên suốt Bài 25-30: **`doc_index = trang_in - 2`**
(lệch thêm 1 so với công thức cũ, do có 1 trang chia phần không đánh số, "PHẦN 2 — MƯU ĐIỀU QUÂN",
chen vào đâu đó trước trang in 259). Ví dụ: trang in **259** nằm ở `doc[257]`, trang in **310** nằm
ở `doc[308]`. **Vẫn luôn xác nhận lại bằng số trang in thật hiện ở cuối ảnh render** trước khi tin
vào công thức, phòng trường hợp có thêm trang chia phần không đánh số khác ở các chương sau.

## ⚠️ Lưu ý — dùng chính lỗi engine ném ra để bắt lỗi đọc cột (phát hiện ở Bài 30)

Khi validate 1 chuỗi nước mà gặp lỗi kiểu "Không tìm thấy quân T (K) ở cột N" cho 1 nước Tướng
(`Tg`) tưởng chừng đơn giản — ĐỪNG vội nghi ngờ công thức quy đổi cột theo phe (đã đúng, đã kiểm
chứng nhiều lần) — nghi ngờ trước tiên khả năng TỰ ĐỌC NHẦM CỘT của quân Tướng trên ảnh gốc. Ở Bài
30 (Hình275), đọc nhanh qua ảnh tổng thể đã lầm Tướng đứng ở cột 5 (giữa) trong khi thực tế Tướng
đã đứng sẵn ở cột 6 ngay từ đầu — chỉ phát hiện ra nhờ nước "Tg4.1" (dùng số cột riêng của Trắng,
quy đổi ra cột 6 vật lý) không khớp với FEN đã dựng. Bài học: **luôn dò lại đúng ô Tướng bằng crop
riêng theo dòng (labeled row-strip) khi có bất kỳ mâu thuẫn nào giữa ký hiệu sách và FEN đã dựng**,
đừng chỉ tin vào 1 lần nhìn tổng thể lúc ban đầu — lỗi này có thể xảy ra ở BẤT KỲ quân nào, không
riêng Tướng.

## ⚠️ Lưu ý — luôn kiểm chứng cột bằng LABEL TRÊN (top), không suy luận ngược từ label dưới (bottom)

Phát hiện ở Bài 36: khi dò tâm nhãn cột bằng code, nếu vô tình bắt được dải nhãn DƯỚI bàn cờ (đọc
"9 8 7 6 5 4 3 2 1" trái→phải) rồi chỉ ĐẢO NGƯỢC MẢNG mà không tự tay kiểm tra lại bằng ảnh, rất dễ
gán sai cột vật lý (nhầm cột 1↔9, 2↔8, 3↔7, 4↔6, cột 5 giữ nguyên nên dễ đánh lừa). Hậu quả: FEN
dựng ra bị lật ngang trái↔phải toàn bộ, nhưng vẫn có thể "trông hợp lý" ở một số hàng đối xứng gần
tình cờ. **Cách phát hiện**: nếu 1 nước đi cụ thể báo lỗi "không tìm thấy quân ở cột N" một cách
khó hiểu (nhất là quân hiếm/đặc trưng như Mã biên), đừng vội "sửa" bằng cách lật ngược chuỗi FEN
theo suy luận — hãy **dò lại từ đầu bằng LABEL TRÊN** (dải "1 2 3 4 5 6 7 8 9" ngay sát hàng quân
đầu tiên, không phải label dưới) và generate lại toàn bộ ảnh crop theo hàng để đọc lại bằng mắt,
đối chiếu với ảnh gốc — đây là cách duy nhất chắc chắn, việc "vá" bằng suy luận đảo ngược dễ chồng
thêm lỗi mới (đã xảy ra ở Bài 36: lần vá đầu tiên bằng cách đảo ngược chuỗi ký tự FEN thất bại,
phải dò lại từ đầu bằng ảnh mới thành công).

## Bảng tra vị trí chương (cập nhật dần khi xử lý)

| Bài | Trang PDF bắt đầu | Ghi chú |
|---|---|---|
| 1 | 7 | Khuyết Sĩ sợ Song Xe |
| 2 | 15 | Khuyết Tượng sợ Pháo |
| 3 | 25 | Mã ngọa tào — thuật dùng Mã mạnh nhất |
| 4 | 35 | Mã oa tâm — Mã xấu nhất |
| 5 | 45 | Sách lược khi hơn quân — rất dài (45→60), nhiều cuộc đấu thật |
| 6 | 62 | Chiến thuật cản trở kinh điển — nối lại chủ đề Mã ngọa tào (Bài 3) — rất dài (62→74), 2 cuộc đấu thật |
| 7 | 75 | Điểm đột phá trong cục diện giằng co — "vô sự thúc Chốt biên" |
| 8 | 87 | Mỗi bên công một cánh, binh quý thần tốc — Vương Gia Lương thắng Mạnh Lập Quốc 1964 — rất dài (87→96), nhiều cuộc đấu thật |
| 9 | 97 | Máy ủi đất trung lộ — vì sao trung lộ quan trọng nhất, Trung Pháo — 1960 |
| 10 | 106 | Phế quân mãnh công trung lộ — Trịnh Duy Đồng bại Lưu Tuấn Đạt 2016 |
| 11 | 117 | Chiến thuật đoạt trung Binh — Vương Gia Lương thắng Mạnh Lập Quốc 1964 (rất dài, nhiều cuộc đấu thật) |
| 12 | 127 | Khi nào có thể để đối phương thí Không đầu Pháo — giải cá nhân toàn quốc 1960 (nhiều cuộc đấu thật) |
| 13 | 136 | Pháo chìm đáy — Không môn rút sát (phối hợp Xe) |
| 14 | 145 | Pháo chìm đáy — kềm chế trợ công (mở đường cho Xe tấn công) |
| 15 | 161 | Pháo chìm đáy — phong tỏa Xe — Trịnh Duy Đồng thắng Vương Thiên Nhất, giải chuyên nghiệp 2018 (Cuộc thứ hai; dùng Hình149 làm thế bắt đầu để né ký hiệu Pt/Ps mơ hồ ở Hình148 — xem mục ký hiệu bên trên) |
| 16 | 166 | Mãnh công đường sườn (lộ 4, lộ 6) — cuộc ví dụ minh hoạ (không tên thật), phát hiện: mỗi bên đọc cột theo đúng nhãn PHÍA MÌNH (trên=Đen, dưới=Trắng) — vd "Tg5-4" của Trắng là cột vật lý 6 chứ không phải cột 5 |
| 17 | 176 | Mãnh công hoành lộ 2 — Trịnh Duy Đồng thắng Thân Bằng, giải cờ nhanh 2013 (Hình160→161 cross-verify khớp 100%) |
| 18 | 184 | Kềm chế tuyến đỉnh cung (row2, khác hoành lộ 2 ở cách phối hợp) — Vương Thiên Nhất thắng Hoàng Hải Lâm, giải giáp cấp 2019 |
| 19 | 192 | Tầm quan trọng tuyến Chốt — Hứa Ngân Xuyên thắng Hồng Trí, giải cờ nhanh 2013 (ví dụ Hình173 minh hoạ 3 tác dụng Xe quá hà bỏ qua, dùng thẳng Cuộc thứ nhất Hình174→176, 21 nước, cross-verify khớp 100%) |
| 20 | 201 | Khống chế tuyến kỵ hà (ranh giới sông, khác tuyến Chốt ở bài trước) — Triệu Quốc Vinh thắng Liễu Đại Hoa, giải cá nhân toàn quốc 1981 (Hình183→184 cross-verify khớp 100%) |
| 21 | 213 | Tranh đoạt đường 3 7 (Tượng + chính Mã trú ngụ) — Tưởng Xuyên thắng Hứa Ngân Xuyên, giải quán quân toàn quốc 2015 |
| 22 | 221 | Phong tỏa lộ Xe và phản phong tỏa (đường 2 8, sân Pháo nhưng Xe thường trực) — Hứa Ngân Xuyên thắng Vu Ấu Hoa, giải BGN 2001 (Hình198→199 cross-verify khớp 100%) |
| 23 | 232 | Tập kích đường biên (tuyến kém giá trị nhất nhưng "dĩ chính hợp, dĩ kỳ thắng") — Hồ Vinh Hoa thắng Vương Gia Lương, giải toàn quốc 1960 |
| 24 | 242 | Nguyên lý trọng tâm mưu đoạt thế — không ngừng chỉnh hình để tối ưu hoá (ví dụ minh hoạ Hình216, không phải ván thật) — cuối "Phần 1: Mưu đoạt thế" |
| 25 | ⚠️259 | Tổ hợp 2 quân bá đạo Song Xe — Lữ Khâm thắng Vu Ấu Hoa, giải "Cao Tân Bôi" 2013 (Hình229→230 cross-verify khớp 100%) — mở đầu "Phần 2: Mưu điều quân" |
| 26 | 280 | Pháo gánh phòng thủ mạnh nhất — Hứa Ngân Xuyên thắng Hồ Vinh Hoa (không rõ năm) |
| 27 | 280 | Liên hoàn Mã khống chế mạnh nhất — Trương Thân Hoằng bại Triệu Hâm Hâm (chính tác giả sách!), giải Ba Nhị Trục Thừa Bôi 2005 |
| 28 | 289 | Tổ hợp mạnh nhất Xe Pháo Mã — Vu Ấu Hoa thắng Lữ Khâm (Hòa Xa Đầu, không rõ năm) — Hình256 cross-verify khớp 100% |
| 29 | 301 | Xe Song Mã khống chế mạnh nhất — Vương Định Trung thắng Lữ Khâm, giải đồng đội toàn quốc 1984 — Hình267 cross-verify khớp 100% |
| 30 | 310 | Xe Song Pháo hỏa lực mạnh nhất — Hồ Vinh Hoa thắng Vương Bân, giải đồng đội toàn quốc 2006 — ⚠️ phát hiện lỗi tự đọc nhầm cột (Tướng cột 6 tưởng cột 5) nhờ mâu thuẫn ký hiệu "Tg4.1" phát hiện ra và tự sửa kịp thời, xem mục cảnh báo mới bên dưới |
| 31 | 321 | Xe Mã lãnh trước trảm Tướng — Triệu Hâm Hâm (chính tác giả sách) thắng Lục Tranh Vanh, giải toàn quốc 2002 — mở đầu chương "Khéo Phá/Phế Quân Phá Sĩ Tượng" |
| 32 | 328 | Khéo phá Sĩ Tượng (ăn không, không tốn quân) — Hồ Vinh Hoa thắng Trịnh Phúc Thân, Đại hội TDTT toàn quốc 1979 |
| 33 | 333 | Phế quân phá Sĩ Tượng (chủ động trả giá, khác khéo phá ở bài trước) — Vương Thiên Nhất thắng Trịnh Duy Đồng, giải toàn quốc 2019 — Hình296→297 cross-verify khớp 100% |
| 34 | 344 | Vây Xe không lập hiểm địa (Hình306 minh hoạ ngắn bỏ qua, dùng thẳng Cuộc thứ nhất Hình310→311) — Vương Lão Cát/Hứa Ngân Xuyên thắng Trương Cường, giải 2005 — mở đầu chương "Vây Khốn Cô Quân" |
| 35 | 354 | Vây khốn cô quân thâm nhập (Vây Pháo — nhưng đối tượng vây đổi thành Mã qua đổi quân) — Lữ Khâm bại Vương Thiên Nhất, giải Bích Quế Viên 2018 — Hình317 cross-verify khớp 100% |
| 36 | 368 | Vây khốn Mã biên thùy tất vong — Hứa Ngân Xuyên thắng Hồ Vinh Hoa, giải toàn quốc 2000 — ⚠️ phát hiện lỗi dò nhầm dải nhãn (bắt label DƯỚI rồi suy luận ngược thay vì dò lại bằng label TRÊN), phải dò lại từ đầu mới đúng — xem mục cảnh báo mới |
| 37 | 368 | Vây đánh quải giác Mã (Mã oa giác) — Vương Thiên Nhất thắng Trần Phú Kiệt, giải giáp cấp 2019 — chỉ 1 nước thật (X9.1), phần còn lại sách chỉ phân tích lý thuyết/giả định |
| 38 | 377 | Vũ khí tầm ngắn thắng vũ khí tầm xa (Mã Chốt thắng Xe Pháo) — Triệu Hâm Hâm (chính tác giả) thắng Thôi Nham, giải đồng đội 2016 — Hình341 cross-verify khớp 100% |
| 39 | 388 | Vũ khí tầm xa thắng vũ khí tầm ngắn (chiều ngược Bài 38) — Ngô Da Hoa bại Hồng Trí, giải cá nhân Châu Á 2013 |
| 40 | 399 | Ưu kém của 1 Xe đối 2 (đổi 1 Xe lấy Song Pháo) — Hứa Ngân Xuyên bại Trương Minh Trung, giải đồng đội 1992 — chỉ 1 nước thật do gặp ký hiệu "Ps" mơ hồ ngay sau, phần còn lại tường thuật bằng lời văn sách |
