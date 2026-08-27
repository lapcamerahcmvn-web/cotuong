# Nhật ký: Chuyên đề "Tượng Kỳ Kinh Điển Sát Pháp Đại Toàn" + Bài Tập Sát Pháp

> Nhật ký sống, cập nhật sau mỗi lô. Kế hoạch đầy đủ: xem mô tả bên dưới.
> Nguồn: `E:\sach-co-tuong\TUONG+KY+KINH+DIEN+SAT+PHAP+DAI+TOAN.pdf` (421 trang, ~415+ ví dụ).
> Cập nhật gần nhất: **2026-08-27**.

## Tóm tắt cách làm (đã chốt)
- **Nước đi**: `pdftotext` trích ASCII hoàn hảo (`M9.8`, `X7-6`, biến `Nếu…thì…`). Văn xuôi dấu vỡ → **viết lại bằng lời riêng** (bản quyền).
- **FEN**: đọc từ sơ đồ (ảnh) bằng vision (`pymupdf` render → nhìn). **Engine xác thực**: áp nước sách lên FEN, nước phạm luật ⇒ FEN sai ⇒ review.
- **Sinh bài**: `tools/mate-book/` (parser ký hiệu La-tinh + generator chép engine `board-editor.js`) → `variation_tree` + steps → append `database/seeders/data/content.json` → `db:seed --class=ContentSeeder`.
- **Bảng chữ**: X→R(Xe) M→N(Mã) P→C(Pháo) S→A(Sĩ) Tg→K(Tướng) B→P(Binh/Tốt) V/T→B(Tượng); `t/s`=trước/sau(前/后); `.`=tiến `/`=thoái `-`=bình.
- **Puzzle** (Pha 2): TÁI DÙNG `Lesson` + cột `puzzle_side` (do|den|null); `mode="puzzle"` trong `board.js` (bấm quân giải, đối chiếu ICCS, máy đáp). Cả ví dụ dạy + phần Bài Luyện đều thành puzzle.

## Bảng tiến độ
| Hạng mục | Ước lượng | Trạng thái |
|---|---|---|
| Pipeline `tools/mate-book/` (parser + gen + render + batch) | 1 lần | ✅ xong, test 9/9 |
| Pha 1: Lời Nói Đầu | 1 bài | ✅ (text; ván minh hoạ Lý Lai Quần để bổ sung sau) |
| Pha 1: Sát Pháp Cơ Bản (19 loại) | ~19 bài | 🔄 Bạch Liễm Tướng 3/6 vd + Hải Để Lao Nguyệt 2 vd (thứ tự type*10+vd) |
| Pha 2: `puzzle_side` + `xiangqi-rules.js` + `mode=puzzle` | code | ⬜ |
| Pha 2: bật giải đố cho ví dụ Pha 1 | ~20 | ⬜ |
| Pha 3: Tàn cuộc nhập thức sát pháp | ? | ⬜ |
| Pha 3: Phổ Sĩ / Phổ Tượng sát pháp | ? | ⬜ |
| Pha 3: các chương còn lại | ? | ⬜ |
| Pha 3: phần Bài Luyện → puzzle | ? | ⬜ |

## Nhật ký thực thi
- **2026-08-27**: Khảo sát + chốt kế hoạch. Dựng xong pipeline `tools/mate-book/`:
  - `gen.cjs` (engine + parser ký hiệu La-tinh + builder cây biến) — test 9/9.
  - `render-diagrams.py` (pymupdf: trích sơ đồ + phủ lưới toạ độ col/rank để đọc FEN).
  - `build-batch.cjs` (merge lô bài vào content.json, BỎ bài có nước phạm luật).
  - Quy trình xác thực chốt: render sơ đồ → phủ lưới → đọc FEN → **đọc bảng nước bằng vision**
    (pdftotext xáo bảng 2 cột) → engine kiểm mọi nước → có warning là FEN sai, sửa.
  - **Series "Tượng Kỳ Kinh Điển Sát Pháp Đại Toàn"** + 3 bài đầu: Lời Nói Đầu (text) +
    Bạch Liễm Tướng Ví dụ 1 (`3rka3/4a4/9/4R3R/9/9/9/1n7/3p1p3/3AKAB2`, 3 nước) + Ví dụ 2
    (`4k4/9/8b/9/9/1R7/9/4A4/6r2/3K5`, 7 nước). Seed local + verify frontend render đúng FEN+steps.
  - Bài học: dày sơ đồ (nhiều quân) dễ đọc lệch cột 1 ô — engine bắt được ngay; ván minh hoạ
    Lời Nói Đầu (25 nước, dày quân) tạm hoãn, làm sau bằng vòng xác thực.
  - **Còn lại**: các loại sát pháp cơ bản còn lại + các chương sau. Làm theo lô ở các phiên sau.
- **2026-08-27 (lô 2)**: thêm `detect-pieces.py` — TỰ DÒ vị trí + MÀU quân (đặc=Đen/viền=Đỏ) bằng
  lấy mẫu pixel; đối chiếu FEN đã biết (Bạch Liễm vd1) khớp 100%. Nhờ đó chỉ cần đọc BINH CHỦNG
  (chữ) cho các ô đã dò → nhanh + hết lỗi lệch cột/màu. Thêm 2 bài **Hải Để Lao Nguyệt** vd1
  (`3k5/9/9/9/4R4/3r2C2/9/9/9/4K4`, 17 nước) + vd2 (`3P5/5k3/9/9/5r3/4R4/9/9/9/4K4`, 11 nước) —
  engine + validatePosition khớp toàn bộ. Quy trình chuẩn giờ: render-diagrams → detect-pieces →
  đọc chữ điền binh chủng → đọc bảng nước (vision) → gen kiểm → build-batch.
- **Ghi chú bảng nước**: pdftotext xáo bảng 2 cột → LUÔN đọc bảng nước bằng vision (render full page).
