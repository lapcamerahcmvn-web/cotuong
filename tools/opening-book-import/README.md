# Opening book import — quy trình chuyển tài liệu khai cuộc thành Lesson

Dùng khi biên soạn bài khai cuộc từ tài liệu tham khảo nội bộ (file scan PDF, không có lớp text —
xem `CLAUDE.md` mục bản quyền: KHÔNG public tên nguồn/tác giả, chỉ trích ký hiệu nước đi làm dữ
kiện, viết lại lý thuyết 100% bằng lời riêng).

## Quy trình (đã dùng cho series "Nền Tảng Nguyên Lý Khai Cuộc", LessonSeries id=11)

1. Render vài trang PDF bằng Python (`pymupdf`) rồi đọc bằng mắt để tìm tiêu đề chương + chuỗi
   nước "1. X Y  2. ...". Ưu tiên lấy ví dụ đầu tiên/chính của mỗi chương, không cần đào hết mọi
   nhánh phụ ("Biến hóa...").
2. Dùng `notation-parser.js` ở thư mục này: `applyGame(['P2-5','M8.7',...])` → parse ký hiệu sách
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

**Chưa xử lý**: Bài 1, 4, 7, 9, 11, 12, 14, 15, 19, 21–27, 31, 34–36, 38, 41–48 (trang PDF ~332
trở đi cho các bài cuối).
