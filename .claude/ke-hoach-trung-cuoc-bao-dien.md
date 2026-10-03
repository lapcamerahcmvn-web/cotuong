# Chuyên đề "Trung Cuộc Bảo Điển" — kế hoạch + nhật ký

> Nguồn (nội bộ, KHÔNG public file): `E:\sach-co-tuong\TRUNG CUỘC BẢO ĐIỂN TẬP 1.pdf` (516 tr., lý luận
> trung cục, 9 chương) và `... TẬP 2.pdf` (431 tr., 291 "cuộc" thực chiến của các đại sư, 12 chương).
> Cả 2 PDF **có lớp text** (khác sách trung cuộc id=12 phải đọc ảnh) → ký hiệu nước đi trích thẳng.
> Lý thuyết/lời bình viết lại 100% bằng lời riêng; nước đi + thế cờ giữ đúng sách (là dữ kiện).

## Series

| Series | slug | Nội dung | order_in_series |
|---|---|---|---|
| Trung Cuộc Bảo Điển (Tập 2) — Thế Trung Cuộc Danh Thủ | `trung-cuoc-bao-dien-tap-2` | giới thiệu + 12 bài mở chương + 291 cuộc | giới thiệu=1; mở chương = (cuộc đầu chương)×10−5; Cuộc n = n×10 |
| Trung Cuộc Bảo Điển (Tập 1) — Lý Luận Trung Cuộc | `trung-cuoc-bao-dien-tap-1` | 9 chương lý luận, mỗi tiết/ví dụ 1 bài | chương×1000 + thứ tự |

Slug bài: `trung-cuoc-bao-dien-cuoc-{n}-{tên}` (tập 2), `trung-cuoc-bao-dien-t1-...` (tập 1).
Sách gọi bên đi trước là "Trắng"/"Tiên" → trên site luôn gọi **Đỏ** (UI bàn cờ ghi Đỏ/Đen).

## Pipeline (`tools/trung-cuoc-bao-dien/`)

1. `extract.py <1|2> <work>` — render mọi sơ đồ (ảnh nhúng) ra PNG ~720px + `index.json` (trang, caption "Hình N").
   Tập 2: sơ đồ thứ n = HÌNH n (thứ tự trong sách). Tập 1: caption "Hình N" lấy từ text ngay dưới ảnh
   (số Hình đánh lại từ 1 mỗi tiết).
2. `detect.py` — nhận diện FEN **hoàn toàn bằng pixel**: dò lưới (chiếu nét mảnh), màu quân (vành khuyên
   tô đặc = Đen; vành tròn/đĩa sáng hơn nền xám = Đỏ), chữ quân = so láng giềng gần nhất với `templates/*.npy`.
   `--all <work/t2>` → `fens.json` (kèm ô điểm thấp). `--learn <img> <FEN>` thêm mẫu chữ từ sơ đồ đã xác minh.
   Đã gặp **4 kiểu vẽ** (nền trắng có nhãn, nền xám đậm, nền trắng không nhãn (tập 1), nền xám nhạt) — kiểu
   mới: dò vị trí/màu vẫn đúng, chỉ chữ sai → đọc tay 1 sơ đồ rồi `--learn`.
3. `drafts/*.json` — nước đi chép từ text sách: `{id, diagram, first, main, vars:[{from, after, moves}], fix?}`.
   `node tcbd.cjs drafts <file> [id..] [--show]` — áp nước lên FEN (engine `tools/mate-book/gen.cjs`),
   báo nước phạm luật/tự chiếu, in tên nước VN + ăn quân (x) + chiếu (+/#) để viết lời giảng đúng sự thật.
4. `batches/*.json` — bài học (`draft: "file#id"`, captions theo ply, `var_caps {k:{i:..}}`, content HTML).
   `node tcbd.cjs build <batch>` — dựng + kiểm lại, BỎ bài có cảnh báo, upsert vào `content.json`
   (giữ nguyên định dạng PHP pretty-print qua `content-io.cjs` → diff sạch), đóng băng FEN vào batch.
5. `php artisan db:seed --class=ContentSeeder` (≈2 phút) → kiểm render bằng `app()->handle(Request::create(..))`.

### Gotcha đã gặp
- Bash heredoc trong môi trường này làm hỏng `\\` và nháy → viết file JSON/JS bằng Write tool.
- OCR `/` ↔ `.` (Cuộc 26 "T7/5" thực là T7.5 — Tượng ở hàng đáy không thể thoái).
- Sơ đồ sách có thể thiếu quân (Tập 1 tr.15 Hình 2 mất Tướng Đen) → `fix: {"e9":"k"}` sau khi engine xác minh.
- Bản dịch có chỗ gọi nhầm quân bị ăn (Cuộc 26 "phá Tượng" thực là ăn Sĩ) → lời giảng theo engine.
- Biến bắt đầu từ nước đầu tiên (gốc cây) phải tính là có nhánh (`tree.length > 1`).

## Tiến độ

| Phần | Trạng thái |
|---|---|
| Tập 2 — Giới thiệu + Chương 1 (Cuộc 1–26) | ✅ 27 bài (thiếu Cuộc 4) — seed local 03/10/2026 |
| Tập 2 — Chương 2–12 (Cuộc 27–291) | ⬜ |
| Tập 1 — Chương 1–9 | ⬜ |

## Nợ (không đăng — không đoán nước)
- **Tập 2 Cuộc 4** (Tôn Chí Vĩ – Ân Quảng Thuận): sơ đồ đọc đúng, nhưng sau 20…S4.5 thì 21…Tg5.1 bất khả
  (Sĩ chiếm ô); vét cạn đổi 1 nước Đen ở ply 10/12/14 đều không ra chuỗi hợp lệ kết thúc chiếu bí.
- Tập 2 Cuộc 26: bỏ 1 biến "M4.6 đổi Pháo" (không áp được vào thế).
