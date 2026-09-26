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

Các cặp chữ phân biệt màu đã biết trong sách (Xe/Mã/Sĩ/Tượng dùng CHUNG 1 chữ cho cả hai bên, chỉ
phân biệt được bằng tô màu — không có mẹo chữ cho các quân này):
| Quân | Bên Đen | Bên Trắng |
|---|---|---|
| Tướng | 將 | 帥 |
| Tốt | 卒 | 兵 |
| Pháo | 砲 | 炮 |
| Xe/Mã/Sĩ/Tượng | (chữ giống nhau, chỉ phân biệt bằng tô đen/viền trắng) |

## Ký hiệu sách (khác 1 điểm so với sách khai cuộc)

Giống hệt `../opening-book-import/README.md` (P/M/X/B/S/V, verb `-` `.` `/`) **cộng thêm**:
- `Tg` = Tướng (2 ký tự, ví dụ `Tg5-6`) — sách khai cuộc gần như không cần vì Tướng ít khi di
  chuyển ở giai đoạn khai cuộc. `midgame-parser.cjs` tự chuẩn hoá `Tg` → `T` trước khi parse.
- ⚠️ **Chưa gặp nhưng cần chú ý**: sách có thể dùng ký hiệu phân biệt "trước/sau" (ví dụ `Xs` =
  Xe sau) khi 2 quân cùng loại đứng cùng cột — lúc đó số cột không đủ phân biệt. Nếu gặp, cần mở
  rộng `parseOne()` trong `midgame-parser.cjs` để nhận diện quân theo vị trí hàng (trước/sau) thay
  vì cột gốc.

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

## Bảng tra vị trí chương (cập nhật dần khi xử lý)

| Bài | Trang PDF bắt đầu | Ghi chú |
|---|---|---|
| 1 | 7 | Khuyết Sĩ sợ Song Xe |
| 2 | 15 | Khuyết Tượng sợ Pháo |
| 3 | 25 | Mã ngọa tào — thuật dùng Mã mạnh nhất |
| 4 | 35 | Mã oa tâm — Mã xấu nhất |
| 5 | 45 | Sách lược khi hơn quân — rất dài (45→60), nhiều cuộc đấu thật |
| 6 | 62 | Chiến thuật cản trở kinh điển — nối lại chủ đề Mã ngọa tào (Bài 3) |
