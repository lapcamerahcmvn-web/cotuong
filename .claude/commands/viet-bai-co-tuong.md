# /viet-bai-co-tuong — Viết Nội Dung Bài Học Cờ Tướng

> Skill viết **lời giảng từng nước** + **bài viết tổng quan** cho 1 bài học cờ tướng, dựa trên
> annotation gốc của thầy (đã giải mã, lưu nội bộ) + thế cờ từng bước. Viết lại HOÀN TOÀN bằng
> lời văn riêng, có dấu tiếng Việt chuẩn. KHÔNG dùng API runtime — người/agent viết trực tiếp.

## Quy trình 3 bước

1. **Đọc nguồn**: `php artisan cotuong:lesson-source {id} --out=<file.json>` → đọc file JSON.
   - Gồm: `title`, `initial_fen`, `file_level_comment` (giảng tổng quan gốc), và `steps[]` mỗi
     bước có `step_id`, `step_order`, `side` (do/den), `iccs` (vd `h2e2`), `moved_piece`,
     `captured_piece`, `fen_after`, và `source_annotation` (lời giảng gốc của thầy — CÓ ở các
     nước quan trọng, `null` ở nước thường).
2. **Viết** ra 1 file JSON kết quả (xem "Định dạng output" bên dưới).
3. **Ghi lại**: `php artisan cotuong:lesson-fill {id} --file=<ket-qua.json> [--publish]`
   - CHỈ ghi content/summary/seo + caption (theo step_id). KHÔNG bao giờ đụng nước đi/FEN.
   - Mặc định về `review`; thêm `--publish` nếu bài này vốn đã publish và muốn giữ live.

## Định dạng output (JSON)

```json
{
  "content": "<h2>...</h2><p>...</p>",
  "summary": "Tóm tắt 1-2 câu, dùng làm meta phụ.",
  "seo_title": "≤ 60 ký tự, có từ khóa cờ tướng chính",
  "seo_description": "150–160 ký tự, hấp dẫn, có từ khóa",
  "captions": {
    "<step_id>": "Lời giảng cho nước này (1-3 câu).",
    "...": "..."
  }
}
```

## Quy tắc BẮT BUỘC

### Bản quyền
- **Viết lại hoàn toàn bằng lời văn riêng** từ `source_annotation` — KHÔNG chép nguyên văn, KHÔNG
  diễn giải sát câu chữ.
- **KHÔNG nhắc** tên thầy/tác giả/sách/video/khóa học nguồn (VD "DANG NGOC THANH", "Mr. Thanh").
- `file_level_comment` chỉ để nắm ý tổng quan — cũng phải viết lại.

### Ký hiệu nước đi — DÙNG `move_vi` CÓ SẴN, TUYỆT ĐỐI KHÔNG TỰ SUY
- Mỗi step đã có trường **`move_vi`** = ký hiệu cờ tướng CHUẨN do engine sinh (VD "Pháo 2 bình 5",
  "Mã 8 tiến 7", "Xe 2 thoái 1"). **Luôn dùng nguyên văn `move_vi`** khi cần gọi tên nước đi.
- ⚠️ Cờ tướng KHÁC cờ vua: cột đếm 1→9 TỪ PHẢI SANG TRÁI theo TỪNG BÊN. ĐỪNG tự tính cột/số từ
  `iccs` — sẽ sai. Nếu cần nói "nước này là gì", chép `move_vi`.

### Caption từng nước
- **Nước có `source_annotation`**: viết lại thành 1-3 câu, giữ đúng Ý ĐỒ chiến thuật thầy nêu
  (vì sao đi nước này, nhắm gì, ưu/nhược), bằng lời riêng có dấu. Có thể mở đầu bằng `move_vi`.
- **Nước KHÔNG có annotation**: viết 1 câu ngắn = `move_vi` + mục đích chung (dựa `moved_piece` +
  `captured_piece` + thế cờ). Giữ TỔNG QUÁT, ĐÚNG — KHÔNG bịa phân tích sâu.
  - Quy đổi quân: R/r=Xe, N/n=Mã, C/c=Pháo, P/p=Tốt, B/b=Tượng, A/a=Sĩ, K/k=Tướng.
  - Nếu `captured_piece` khác null → nước này ĂN quân, nêu rõ ("ăn Mã", "đổi Pháo").
  - VD caption nước thường: "Mã 8 tiến 7 — phát triển Mã cánh phải, dọn đường xuất Xe."
- Điền caption cho **MỌI** step_id trong `steps`.

### Bài viết tổng quan (content — HTML)
- Chỉ dùng thẻ: `<h2> <h3> <p> <ul> <li> <strong> <em>`. KHÔNG `<h1>`, `<div>`, `<img>`, `<table>`.
- Cấu trúc: mở bài nêu Ý TƯỞNG thế trận (2-3 câu) → 2-3 mục H2 diễn giải (đặc điểm, kế hoạch mỗi
  bên, then chốt) → kết luận ưu/nhược điểm. Độ dài 350-700 từ.
- Có thể nhắc tên thế trận thật lộ ra trong nguồn (VD "Trung Pháo Hoành Xe đối Phản Cung Mã") vì
  đó là thuật ngữ cờ tướng công khai, KHÔNG phải thông tin định danh nguồn.

### Văn phong tiếng Việt
- Tự nhiên, giọng huấn luyện viên gần gũi. **TRÁNH** từ AI-sounding: "toàn diện", "tổng quát",
  "nhìn chung", "đáng chú ý", "mang lại hiệu quả tối ưu", "trong bối cảnh đó".
- Dùng đúng thuật ngữ có dấu: Pháo Đầu, Bình Phong Mã, Phản Cung Mã, Hoành Xe, Trực Xe, Quá Hà Xe,
  Sĩ Giác Pháo, Ngũ Cửu Pháo, Tiên Nhân Chỉ Lộ, khai cuộc, tàn cuộc, tranh tiên, đổi quân...

### An toàn dữ liệu
- Chỉ ghi qua `cotuong:lesson-fill`. KHÔNG sửa DB trực tiếp. KHÔNG đụng bảng lesson_steps.fen /
  move_notation / move_side (đó là dữ liệu giải mã, là nguồn sự thật của bàn cờ).
