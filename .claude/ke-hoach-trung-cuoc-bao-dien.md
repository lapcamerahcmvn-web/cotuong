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
| Tập 2 — Giới thiệu + Chương 1 (Cuộc 1–26) | ✅ 27 bài (thiếu Cuộc 4) — 03/10/2026 |
| Tập 2 — Chương 2 (Cuộc 27–55) | ✅ 28 bài (thiếu 39; 45 trùng 34) — 03/10/2026 |
| Tập 2 — Chương 3 (Cuộc 56–83) | ✅ 29 bài — 03/10/2026 |
| Tập 2 — Chương 4 (Cuộc 84–110) | ✅ 28 bài — 03/10/2026 |
| Tập 2 — Chương 5 (Cuộc 111–132) | ✅ 23 bài — 03/10/2026 |
| Tập 2 — Chương 6 (Cuộc 133–155) | ✅ 23 bài (thiếu 154) — 03/10/2026 |
| Tập 2 — Chương 7 (Cuộc 156–171) | ✅ 17 bài — 03/10/2026 |
| Tập 2 — Chương 8 (Cuộc 172–201) | ✅ 31 bài — 03/10/2026 |
| Tập 2 — Chương 9 (Cuộc 202–232) | ✅ 32 bài — 03/10/2026 |
| Tập 2 — Chương 10 (Cuộc 233–267) | ✅ 36 bài — 06/10/2026 |
| Tập 2 — Chương 11–12 (Cuộc 268–291) | ✅ 26 bài — 06/10/2026 — **Tập 2 xong (300 bài)** |
| Tập 1 — Chương 1–2 (khái luận, thẩm cục) | ✅ 31 bài — 03/10/2026 |
| Tập 1 — Chương 3–4 (tư tưởng + mục tiêu chiến lược) | ✅ 22 bài — 03/10/2026 |
| Tập 1 — Chương 5 (phân loại chiến thuật, 10 tiết) | ✅ 41 bài — 06/10/2026 |
| Tập 1 — Chương 6 (chiến pháp trận thức: 10 ván đầy đủ + 22 cây biến khai cuộc + 5 ván Xe Mã) | ✅ 37 bài — 06/10/2026 |
| Tập 1 — Chương 7 (thiết kế chiến dịch, 5 tiết + 1 ván 99 nước) | ✅ 24 bài — 06/10/2026 |
| Tập 1 — Chương 8 (trung biến kỳ lộ: 54 hình cây biến, 6 tiết) | ✅ 61 bài — 06/10/2026 |
| Tập 1 — Chương 9 (trung cục kinh điển: 135 ván) | ⬜ |

## Nợ (không đăng — không đoán nước)
- **Tập 2 Cuộc 4** (Tôn Chí Vĩ – Ân Quảng Thuận): sơ đồ đọc đúng, nhưng sau 20…S4.5 thì 21…Tg5.1 bất khả
  (Sĩ chiếm ô); vét cạn đổi 1 nước Đen ở ply 10/12/14 đều không ra chuỗi hợp lệ kết thúc chiếu bí.
- Tập 2 Cuộc 26: bỏ 1 biến "M4.6 đổi Pháo" (không áp được vào thế).
- Tập 2 Cuộc 31: dừng mạch chính ở nước 54…X4-6 (nước 55 "P7-4" Pháo không ngòi mà ăn Xe — bất khả).
- Tập 2 Cuộc 39: "X3/6" in 2 lần liền (nước 18–19), `repair` không ra nước nào → hoãn.
- Tập 2 Cuộc 42/49: cắt nước cuối (repair ra quá nhiều ứng viên, không chọn bừa).
- Tập 2 Cuộc 45 = Cuộc 34 (cùng sơ đồ, cùng nước; sách ghi bên cầm quân ngược nhau) → chỉ giữ 34, có ghi chú.
- Tập 1: Ch2 Tiết 1 thiếu sơ đồ (p017 là Hình 3 ván Lý Gia Hoa) → bài chữ; Hình 8 bình ổn (p032) in nhầm hình
  → bỏ; Tiết 5 ví dụ 1 (p050 trùng p047) → bỏ; tr.15 Hình 2 thiếu Tướng Đen, tr.37 Hình 13 thiếu Tướng Đỏ (fix).
- Tập 1 Ch3 Tiết 3 "Ngụ thủ vu công": sơ đồ p058 không khớp lời giải (nước 1 "P7.4" không có quân) → bài chữ,
  liệt kê nước dạng văn bản. Ch3 Tiết 2 cắt 2 biến (X1-3…, X4-2…) ở chỗ nước kế tiếp bất khả.
- Tập 1 Ch4 Tiết 4 ví dụ 1: mạch chính là biến "tấn công mạnh" của sách; nước thực chiến M9/7 để ở nhánh biến.

- Tập 2 Ch4: Cuộc 96 dừng ở nước 15 ("X3/4" mơ hồ, 2 Xe cùng lộ); 87/104/110/90 sửa sơ đồ (thiếu Tướng / Pháo đọc thành Xe).
- Tập 2 Ch5: 111 "P9-3"→P8-3, 120 "B1.1"→B7.1, 123 "S6.5"→S4.5 (repair duy nhất); cắt 112 (14), 113 (21), 117 (10), 121 (36).
- Tập 2 Ch6: bỏ Cuộc 154 ("Mt/2" không có 2 Mã cùng lộ, repair không ra); 145 "B3.4"→B3-4, 148 "P4-1"→P3-1; cắt 137 (9), 147 (7), 149 (26), 151 (23); 136 biến 2 sửa vị trí ply.
- Tập 2 Ch7: 156 "T3.5"→T3/5, 157 "M5/6"→M5/7 (repair duy nhất); cắt 159 (9), 160 (64), 162 (12), 170 (27); 159 sơ đồ thiếu Tốt i3.
- Tập 2 Ch8: 180 "P2.3"→P2.2 (engine xác nhận cả chuỗi), 200 "B7-5"→B7-6; cắt 180 (30), 182 (5), 183 (7), 188 (22), 193 (8), 194 (40), 195 (36); sửa Tướng ở 192/194/197.
- Tập 2 Ch9: 217 "X4-8"→P4-8, 220 "X7.4"→X6.4 (duy nhất khớp); cắt 210 (25), 215 (50), 228 (8 — "X1.2" không có Xe lộ 1), 229 (40); bỏ nước cuối biến 215 "P9.6" (phạm luật); sửa Tướng/Sĩ hàng đáy 219, 228. Sách in tiêu đề "Cuộc 131" cho Cuộc 231.
- Tập 2 Ch10: nhiều cuộc chỉ phân tích bằng lời → mạch chính = phương án đề xuất, thực chiến ở nhánh biến (257, 258, 260, 261, 255…). Sửa: 237 "P4.4"→Pt.4 và "X8/1"→X8/3, 242 "B6.5"→B6-5, 263 "X3.1"→X1.3 (bài nói Xe chiếu rồi lui về); sửa Tướng 259 (d1). Cắt 241 (21), 242 (23), 243 (52), 253 (16); bỏ cách 4 của 260 (P1-9 bị chặn) và cắt đuôi nhiều nhánh biến phạm luật (255, 258, 261, 266, 267).
- Tập 2 Ch11–12: sửa hình 268 (Tướng/Sĩ đáy + Pháo c1), 271 (Tướng f0), 285 (Tướng/Sĩ đáy); sửa nước 269 "X9.3"→P9.3, 274 "S4.5"→S5.4, 278 "S5.4"→Ss.5 (nước duy nhất khớp); cắt đuôi biến 286. Không cuộc nào phải cắt mạch chính.
- Tập 1 Ch5: sơ đồ tr.91 (t4b) thiếu Tốt Đỏ c4 → `fix:{c4:'P'}` (31 nước sau khớp); t6f sơ đồ đã ở sau nước Tg4-5 → mạch chính bắt đầu từ Đen; bỏ biến t9a "P8.8" (không có quân); tiết 10 ví dụ 5–6 (luật 60 nước, chỉ có hình) tóm tắt bằng lời.
- Tập 1 Ch6: ván/cây biến tách TỰ ĐỘNG bằng `scratchpad/tcbd/parse_games.py` (ván đánh số) và `parse_tree.py` (Ví dụ → Biến/Một là/“1. Pháo…” → mạch chính + nhánh, gốc nhánh = nhánh trước cắt tại điểm rẽ), `mkd6.cjs`/`mktree.cjs` → drafts (+ `.vars.cjs`/`.fix.cjs` bổ sung tay). Sửa lỗi in trong tap1.txt: "5. B7."→B7.1, "4. P9.4"→14., "0. ….."→10.
- ⚠️ content.json vượt 45MB → `ContentSeeder` thêm `ini_set('memory_limit','1536M')`. Trên hosting nếu ini_set bị chặn: `php -d memory_limit=1536M artisan db:seed --class=ContentSeeder`.
- Tập 1 Ch7: sơ đồ tr.217 thiếu Tốt Đen e6 → `fix:{e6:'p'}` (62 nước khớp); VD6 tiết 1 bản in dùng lại hình VD5 → bài chữ; cắt nước cuối VD5; tiết 3 VD3/VD4 lệch 1 sơ đồ (p237/p238).

## Mẹo
- `node tcbd.cjs repair <drafts> <id> <ply>`: vét cạn nước ở ply nghi in sai, giữ nước làm phần còn lại hợp lệ.
  Chỉ nhận khi ra ĐÚNG 1 ứng viên (VD Cuộc 32: "M7/9" thiếu chữ "trước" vì 2 Mã cùng lộ 7).
- Tập 1 caption "Hình N" không tin được (nhãn in đầu trang, có khi lệch) → map theo trang + engine xác nhận.
- Tập 1 Ch8: 54 cây biến tách bằng `parse_tree.py`, gán sơ đồ tuần tự theo tiết (`ch8map.py`) + `findimg.cjs` cho tiết 1 VD11–18; sửa nước VD13 ply 5 → P8.6; cắt VD3/12/13 (nhánh), Tiết 4 VD3. Tiết 2 VD6 (sơ đồ có Tốt Đỏ c3 chặn "M7.6") và Tiết 3 VD5 (không sơ đồ nào khớp) → bài chữ. Lời giảng đặt tự động ở nút rẽ nhánh đầu tiên của từng biến (`gen_t1c8.cjs`).
