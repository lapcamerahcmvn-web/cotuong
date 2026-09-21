# Opening book import — quy trình chuyển tài liệu khai cuộc thành Lesson

Dùng khi biên soạn bài khai cuộc từ tài liệu tham khảo nội bộ (file scan PDF, không có lớp text —
xem `CLAUDE.md` mục bản quyền: KHÔNG public tên nguồn/tác giả, chỉ trích ký hiệu nước đi làm dữ
kiện, viết lại lý thuyết 100% bằng lời riêng).

## Quy trình (đã dùng cho series "Nền Tảng Nguyên Lý Khai Cuộc", LessonSeries id=11)

1. Render vài trang PDF bằng Python (`pymupdf`) rồi đọc bằng mắt để tìm tiêu đề chương + chuỗi
   nước "1. X Y  2. ...". Ưu tiên lấy ví dụ đầu tiên/chính của mỗi chương, không cần đào hết mọi
   nhánh phụ ("Biến hóa...").
2. Dùng `notation-parser.cjs` ở thư mục này (đuôi `.cjs` bắt buộc — repo gốc có
   `"type": "module"` trong `package.json`, `.js` thường sẽ bị nạp nhầm qua ESM loader):
   `applyGame(['P2-5','M8.7',...])` → parse ký hiệu sách
   thành `{from,to}`, validate qua đúng engine luật (`public/js/xiangqi-rules.js`) — **tự ném lỗi
   nếu gõ sai/thiếu nước**, đây là lưới an toàn quan trọng nhất.
3. Verify bằng mắt: dùng `tools/og-image/render-board.cjs` (`renderBoardStatic(fen)`) +
   `@resvg/resvg-js` để render FEN tại đúng các mốc "(Hình N)" sách đưa ra, so với ảnh scan gốc
   trước khi ghi DB.
4. Viết nội dung lý thuyết 100% bằng lời riêng (không dịch sát câu chữ sách gốc), theo khuôn: mở
   bài → vì sao quan trọng/đánh đổi → phân tích sâu hơn → "Bài học rút ra". Nếu sách dẫn ván đấu
   thật có tên kỳ thủ/giải đấu thật thì được phép nêu thẳng (sự kiện lịch sử có thật).
5. Ghi bằng `App\Support\LessonComposer::create()` (series_id=11, phase='khai-cuoc',
   game_mode='co-tuong') → publish → `php artisan cotuong:export-content` → commit + push.

## Ký hiệu sách

`P`=Pháo, `M`=Mã, `X`=Xe, `B`=Binh/Tốt, `S`=Sĩ, `V`=Tượng (⚠️ khác ký tự nội bộ engine — xem
`BOOK2ENGINE` trong `notation-parser.js`). Verb: `-`=bình, `.`=tiến, `/`=thoái.

## Bảng tra vị trí chương (cập nhật dần khi xử lý)

| Bài | Trang PDF bắt đầu | Ghi chú |
|---|---|---|
| 2 | 12 | Ba nguyên tắc + 4 loại hình (đã dùng cho bài lý thuyết mở đầu) |
| 3 | 17 | Trực Xe/Hoành Xe — rất dài (~19 trang), mới lấy 1 ví dụ |
| 5 | 38 | |
| 6 | 46 | Hoành Xe thất lộ Mã — nhiều nhánh phụ, mới lấy 1 ví dụ |
| 8 | 62 | |
| 10 | 74 | |
| 13 | 103 | |
| 16 | 127 | |
| 17 | 137 | |
| 18 | 145 | |
| 20 | 162 | |
| 28 | 222 | |
| 29 | 233 | |
| 30 | 244 | |
| 32 | 259 | |
| 33 | 265 | |
| 37 | 305 | |
| 39 | 320 | |
| 40 | 329 | |
| 41 | 337 | Song Pháo quá hà |
| 43 | 357 | Lưỡng đầu xà đối Tam bộ hổ |
| 45 | 374 | Phi Tượng cũng có thể thúc Chốt giữa (Đối Binh cuộc) |
| 46 | 382 | Cờ xấu phi Tượng loạn — Du ly Tượng |
| 47 | ~386 | Vấn đề bổ Sĩ (thời cơ) — ví dụ dùng: Trung Pháo đối Phản Cung Mã (Hình361, tr.394) |
| 48 | 400 | Bản chất của bố cuộc (chương cuối sách) — Ngũ cửu Pháo quá hà Xe, Song Xe áp chế (Hình366, tr.401) |

**Đã chạm hết 410 trang / tới Bài 48 (chương cuối)** — nhưng vẫn còn nhiều chương ở giữa sách CHƯA
xử lý vì trước đó ưu tiên "lấy rộng" theo chuỗi nước sạch, dễ tìm trước:

**Chưa xử lý**: Bài 1, 4, 7, 9, 11, 12, 14, 15, 19, 21–27, 31, 34–36, 38, 42, 44 (23 chương — nằm
rải rác trong khoảng trang 5–349, cần quay lại dò từng đoạn vì đã nhảy cóc nhiều lần khi xử lý
Bài 41–48).
