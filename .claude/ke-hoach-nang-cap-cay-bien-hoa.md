# Kế hoạch nâng cấp: Bài học đa nhánh (cây biến hóa) — hoccotuong.top
> Bàn giao cho Claude Code. **Lưu ý quan trọng**: trang tham khảo `hoccotuong.net/luyen-tap/khoa-18/...` chặn truy cập tự động (robots disallowed) nên chưa xem được giao diện/code thực tế. Bản kế hoạch dưới đây dựa trên suy luận từ cấu trúc URL (`luyen-tap/khoa-18/khai-cuoc-di-tien/cap-tien-trung-binh`) và mô hình phổ biến của các nền tảng luyện khai cuộc có biến hóa (variation tree). **Cần đối chiếu lại với ảnh chụp màn hình thực tế từ người dùng trước khi code chính thức**, để tránh làm sai hướng.

---

## 0. Vấn đề hiện tại
Bàn cờ/bài học hiện tại của hoccotuong.top chỉ hỗ trợ **1 nhánh tuyến tính** (`lesson_steps` là danh sách bước tuần tự: bước 1 → bước 2 → bước 3...). Điều này phù hợp để *trình chiếu* một ván mẫu, nhưng không đủ để dạy khai cuộc thực sự — vì khai cuộc luôn có nhiều cách đối phương đáp trả khác nhau ở mỗi nước, và người học cần thấy được "nếu đối phương đi X thì mình đi Y, nếu đối phương đi Z thì mình đi W".

## 1. Mô hình suy luận từ đối thủ (cần xác nhận lại)
Dựa trên tên URL, khả năng cao đây là một **khóa học có cấp độ** (`khoa-18`) → theo hướng đi tiên/đi hậu (`khai-cuoc-di-tien`) → theo trình độ (`cap-tien-trung-binh`), và bên trong mỗi bài có **cây biến hóa**: tại các nước đi mấu chốt, hệ thống cho người học chọn giữa nhiều phương án đối phó, mỗi phương án dẫn tới một nhánh tiếp theo với diễn giải riêng.

Hai cách triển khai UI phổ biến cho mô hình này (cần xác nhận đối thủ dùng cách nào qua ảnh chụp màn hình):
- **A. Chọn nhánh tuần tự**: bàn cờ đi tới điểm rẽ nhánh, hiện danh sách 2-4 lựa chọn dạng nút bấm ("Nếu đối phương đi Pháo 2-5" / "Nếu đối phương đi Mã 8-7"), người học bấm chọn để xem tiếp nhánh đó.
- **B. Sơ đồ cây trực quan**: hiển thị toàn bộ cây biến hóa dạng sơ đồ (giống cây thư mục), người học bấm vào bất kỳ nút nào để nhảy tới đoạn đó trên bàn cờ.

## 2. Mô hình dữ liệu đề xuất — chuyển từ danh sách tuyến tính sang cây

```
lesson_steps  (sửa đổi từ bảng hiện tại)
├─ id
├─ lesson_id
├─ parent_step_id   (MỚI — FK tự tham chiếu, null = bước gốc; nhiều step có cùng parent_step_id = các nhánh rẽ tại cùng 1 điểm)
├─ fen
├─ move_notation
├─ caption            (diễn giải riêng cho nhánh này — vd "Nếu đối phương chọn cách này, ưu điểm là...")
├─ branch_label        (MỚI — tên ngắn hiển thị trên nút chọn nhánh, vd "Đối phương giữ Pháo đầu")
├─ is_main_line          (MỚI — boolean, đánh dấu nhánh chính/khuyến nghị để mặc định hiển thị trước)
├─ order_in_siblings      (thứ tự hiển thị giữa các nhánh cùng cha)
└─ highlight_squares
```

**Cách hoạt động**: thay vì đọc `lesson_steps` theo `step_order` tuần tự, giờ đọc theo cấu trúc cây (`parent_step_id`). Một bước có thể có 0 con (kết thúc nhánh), 1 con (tiếp tục thẳng), hoặc nhiều con (điểm rẽ nhánh — UI hiện lựa chọn).

> Với dữ liệu bài học cũ (tuyến tính, không nhánh): vẫn tương thích ngược hoàn toàn — mỗi step chỉ có đúng 1 con, `parent_step_id` nối step trước → step sau, không cần migrate dữ liệu.

## 3. Việc cần làm ở component bàn cờ

1. Component bàn cờ bài học hiện tại (`<x-chess-board>`) cần đổi cách nạp dữ liệu: từ mảng phẳng `steps[]` sang cấu trúc cây (nạp children theo `parent_step_id` khi cần, hoặc nạp toàn bộ cây 1 lần rồi build ở client nếu bài học không quá lớn).
2. Khi bước hiện tại có >1 con: hiện UI chọn nhánh (đề xuất làm trước theo phương án A — nút bấm liệt kê các lựa chọn — đơn giản hơn để dựng, phù hợp mobile) thay vì chỉ có nút "Tiến/Lùi" đơn thuần.
3. Giữ nguyên nút Reset/Undo hiện có; "Lùi" khi đang ở giữa 1 nhánh thì quay lại đúng điểm rẽ nhánh trước đó (không tự nhảy sang nhánh khác).
4. Đường di chuyển giữa các nhánh cần lưu lại trong URL hoặc state để có thể chia sẻ link tới đúng 1 nhánh cụ thể (tốt cho cả UX và SEO — mỗi nhánh sâu có thể có anchor riêng).
5. Nếu về sau muốn làm sơ đồ cây trực quan (phương án B), có thể làm ở giai đoạn 2 như một chế độ xem thay thế, dùng lại đúng dữ liệu cây đã có — không cần đổi schema.

## 4. Việc cần làm ở Admin (soạn bài học)
1. Giao diện soạn bài học hiện tại (nhập tuần tự từng bước) cần thêm nút **"Thêm nhánh rẽ tại đây"** — cho phép tạo nhiều step con cùng cha, mỗi nhánh có `branch_label` + diễn giải riêng.
2. Cần hiển thị trực quan cây đang soạn (thu gọn/mở rộng từng nhánh) để người soạn không bị rối khi bài có nhiều điểm rẽ.
3. Đánh dấu 1 nhánh là `is_main_line` (nhánh khuyến nghị) — dùng để bàn cờ tự động đi theo khi người học chỉ bấm "Tiến" mà không chọn nhánh cụ thể.

## 5. Trình tự bàn giao cho Claude Code

| Bước | Việc |
|---|---|
| 1 | **Xác nhận lại mô hình UI thực tế** với ảnh chụp màn hình từ người dùng trước khi code (tránh làm sai hướng vì chưa xem được trang gốc) |
| 2 | Migration: thêm cột `parent_step_id`, `branch_label`, `is_main_line`, `order_in_siblings` vào `lesson_steps` (không phá dữ liệu cũ — mặc định các bài cũ vẫn chạy tuyến tính bình thường) |
| 3 | Cập nhật API/query load bài học: trả về cấu trúc cây thay vì mảng phẳng |
| 4 | Cập nhật component bàn cờ: xử lý điểm rẽ nhánh, UI chọn nhánh (phương án A trước) |
| 5 | Cập nhật giao diện Admin soạn bài: thêm nhánh, đánh dấu main line, xem cây thu gọn |
| 6 | Thử nghiệm với 1 bài khai cuộc có nhánh thật (ví dụ Pháo đầu với 2-3 cách đối phương đáp trả phổ biến) trước khi áp dụng hàng loạt |
| 7 | (Giai đoạn 2, tùy chọn) Sơ đồ cây trực quan thay thế UI nút bấm, nếu sau khi dùng thử thấy cần thiết |

## 6. Lưu ý
- Đây là bản kế hoạch **dựa trên suy luận**, chưa xác minh được giao diện thực tế của đối thủ do trang chặn crawl. Trước khi Code bắt tay vào bước 3-5, nên xác nhận lại với ảnh chụp màn hình cụ thể để chọn đúng phương án UI (A hay B) và tránh làm lại.
- Ưu tiên làm trước ở mảng **Khai cuộc** (nơi biến hóa nhiều nhánh có giá trị cao nhất) — Tàn cuộc/Sát pháp thường không cần nhánh phức tạp nên có thể giữ nguyên dạng tuyến tính.
