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
| Pha 1: Sát Pháp Cơ Bản (19 loại) | ~19 bài | 🔄 **21 bài** xong: Bạch Liễm 5vd, Hải Để 3vd, Giáp Xe Pháo 5vd (vd2=Hình1.13 hoãn), Thiên Địa Pháo 3vd (vd4=Hình1.21 hoãn), **Đại Đảm Xuyên Tâm 4vd** (Hình1.22-1.25; vd5=Hình1.26 chưa làm) |
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
- **2026-08-28 (lô 3)**: Chốt quy trình VÀNG cho mỗi Hình: (1) `render-diagrams.py` cắt sơ đồ + phủ lưới, (2) `detect-pieces.py` dò vị trí+màu, (3) **Read ảnh `-grid.png` để đọc BINH CHỦNG (chữ Hán)** — kết hợp 2+3 cho FEN chắc, (4) render FULL PAGE (`pymupdf` Matrix 2x) rồi Read để lấy bảng nước ĐÚNG THỨ TỰ (tránh xáo 2 cột), (5) `gen.cjs` validate. Ghi chú then chốt: nhãn lưới là `{col}{rank}`; đỏ file=9-col, đen file=col+1; quân THẲNG (R/C/P/K) số sau verb = SỐ BƯỚC, quân CHÉO (A/B/N) số sau = FILE ĐÍCH.
  - **Hoàn tất Bài 3 Giáp Xe Pháo**: thêm vd3 (Hình1.14, `C2k1ab1r/4a4/4b4/9/9/1R7/9/4B2C1/3pAK3/2BA4r`, 13 nước, có Xs/Xt), vd5 (Hình1.16, 13 nước), vd6 (Hình1.17, 15 nước, thí Mã quải giác). **vd2 (Hình1.13) HOÃN** — sơ đồ đọc rõ nhưng nước X6/5 & S5.6 của Đen không khớp quân trên bàn (mâu thuẫn sách/sơ đồ không giải được từ xa), đừng đoán.
  - **Bài 4 Thiên Địa Pháo**: vd1 (Hình1.18, mate-6, mượn Tướng trợ công), vd2 (Hình1.19, 19 nước, đắc Xe — không phải chiếu hết), vd3 (Hình1.20, 19 nước, song Binh ăn Sĩ). **vd4 (Hình1.21) HOÃN** — bảng nước dòng 1 layout nhập nhằng (X7-5 lặp).
  - **Sửa `gen.cjs` parseMove**: khi >1 quân CÙNG CỘT mà sách KHÔNG ghi trước/sau (VD 2 Sĩ chồng, chỉ 1 quân đi hợp lệ) → giờ thử mọi ứng viên trên cột, chọn nước ĐÚNG LUẬT (trước đây lấy quân đầu tiên → fail "S4/5"). Self-test vẫn PASS 9/9.
  - **Bài 5 Đại Đảm Xuyên Tâm**: vd1 (Hình1.22, mate-3, thí Xe lộ đáy — Pháo file4 cản Sĩ đỡ), vd2 (Hình1.23, mate-7, tặng Xe dụ Tướng + lộ mặt Tướng), vd3 (Hình1.24, 9 nước, giải sát hoàn sát), vd4 (Hình1.25, 19 nước, đôi công một cánh). vd5 (Hình1.26) chưa làm — cần trang 23 + có biến "nếu S6.5 thì...".
  - **Local đã seed 222 bài** (30 bài trong series `sat-phap-dai-toan`).
  - **2026-08-28 (lô 4 — lên tới 30 bài)**: Đại Đảm Xuyên Tâm vd5-8 (Hình1.26-1.29; vd5/6/8 có cây biến; vd7 thí Xe dụ Mã) + **Song Xe Thác Bài 6** vd1/3/4/5/6 (Hình1.30/1.32/1.33/1.34/1.35). Hoãn: Xuyên Tâm vd4 (Hình1.21 layout nhập nhằng), Song Xe vd2 (Hình1.31 — song Xe trung lộ là THANG chiếu, isCheckmate=false vì Đen chắn được ở nước 7; không phải sát ngay → không dựng thành bài "chiếu hết").
  - **Nâng cấp gen.cjs**: thêm `isCheckmate/inCheck/legalNoSelfCheck` — giờ MỌI bài "Trắng thắng" đều tự xác nhận là chiếu bí thật trước khi seed (bắt được vd2 Hình1.31 chỉ là thang, không sát). Đây là chốt chất lượng mới: nếu isCheckmate=false mà sách ghi "Trắng thắng" → hoãn, không đoán.
  - **ĐÃ PUSH GitHub `6034523`** (origin/main). Deploy hosting: user tự chạy (máy này không có SSH) — `cd ~/hocotuong && git fetch origin && git reset --hard origin/main && php artisan db:seed --class=ContentSeeder --force && php artisan optimize:clear && php artisan config:cache && php artisan route:cache && php artisan view:cache`. KHÔNG cần migrate/composer (batch chỉ đổi content.json + tool).
  - **Tiếp theo**: Bài 7 Xe Pháo Rút Sát (Hình 1.36-1.37, trang 27+).
- **2026-09-02 (lô 5 — tới 35 bài)**:
  - **Bài 7 Xe Pháo Rút Sát**: vd1 (Hình1.36, mượn Sĩ làm ngòi, **3 biến** chi Sĩ/phi hữu Tượng/phi tả Tượng đều sát), vd2 (Hình1.37, song Xe thay nhau rút, có biến), vd3 (Hình1.38, thí trung Pháo dụ Xe, 2 biến). Hoãn vd4 (Hình1.39): ván dài kết bằng đắc song Xe (đổi 1 Xe lấy 2), không phải chiếu bí ngay.
  - **Bài 8 Pháo Triển Đan Sa (Pháo lăn)**: vd1 (Hình1.40, quét song Sĩ→thắng thế, KHUNG "kỹ thuật→thắng" không phải chiếu bí — framing thành thật), vd3 (Hình1.42, lăn xong khép sát — chiếu bí thật ✓). Hoãn vd2/vd4/vd5/vd6 (Hình1.41/1.43/1.44/1.45 — đa số là quét→"thắng chắc", không sát ngay; đã có vd1+vd3 đại diện đủ loại).
  - **CHÍNH SÁCH loại "kỹ thuật→thắng"** (Pháo lăn, thang song Xe...): CHỈ xuất bản dạng "chiếu bí" khi `isCheckmate=true`. Ví dụ chỉ "thắng thế" (quét sạch phòng thủ, đối phương chắc thua nhưng chưa chiếu hết ở nước cuối sách in) → hoặc (a) đưa 1-2 bài đại diện với LỜI GIẢNG THÀNH THẬT (không ghi "chiếu hết"), hoặc (b) hoãn nếu trùng lặp. KHÔNG bịa thêm nước để ép thành mate.
  - Local seed 227 bài (35 trong series). CHƯA push (chờ đủ ~20 bài mới kể từ lần push 30 → push ở ~50).
  - **Tiếp theo**: Bài 8 còn Hình1.44/1.45 (vd5/6, xem có mate không) → Bài 9 Pháo Trùng/Song Pháo (trang 33+).
  - Bài 8 vd5 (Hình1.44), vd6 (Hình1.45) đều CHIẾU BÍ THẬT ✓ → đã thêm. Bài 8 chốt: vd1(win)/vd3/vd5/vd6, hoãn vd2/vd4.
  - **Bài 9 Pháo Trùng (Song Pháo)** trang 33-35: vd1 (Hình1.46, song Pháo trung lộ), vd3 (Hình1.48, thí Binh khống chế), vd4 (Hình1.49, thí Xe hiến Binh), vd5 (Hình1.50, **Tiền Mã hậu Pháo + 4 BIẾN** đều sát ✓) — TẤT CẢ isCheckmate=true. Hoãn vd2 (Hình1.47 — ví dụ "nguyên tắc" kết bằng P5-6 chỉ NÓI không in nước, kết ở nước lặng).
  - **Series = 41 bài** (8 có cây biến). Local seed 233.
  - **ĐÃ PUSH GitHub** (lô 5, tới 41 bài) — hoàn tất Bài 7+8+9. Deploy hosting như cũ (git reset + db:seed ContentSeeder + cache).
  - **Tiếp theo**: Bài 10 (trang 36+) — xem loại gì.
- **2026-09-02 (lô 6 — tới 46 bài) — Bài 10 Muộn Cung Sát** (trang 34-41):
  - vd1 (Hình1.51, mượn Sĩ làm giá — **sửa lỗi in sách: "P2.7" đúng ra là P3.7**, engine xác nhận), vd2 (Hình1.52, thí Xe tranh trung lộ — **giải mã đánh số nước bị xáo trong sách**, engine confirm mate), vd3 (Hình1.53, tàn cuộc Pháo Binh Tượng quản chế), vd4 (Hình1.54, **ván Na Kiện Đình — bức Pháo**; sách in tới zugzwang, mình NỐI 2 nước cuối mà sách MÔ TẢ (P7-8, P3.1) — đã verify isCheckmate + là nước ÉP DUY NHẤT nên không phải bịa), vd6 (Hình1.56, hiến Binh phong bế — **"S6/5" đúng ra là S6.5**, OCR nhầm / ↔ .).
  - **Hoãn vd5 (Hình1.55)**: nước cuối "P7.9" bất khả (Pháo file7 đang ở rank0 sau khi thí; 2 Pháo khác file nên front/rear không áp; không tìm ra nước sát khớp) — cần đọc lại kỹ.
  - **Bài học chốt thêm**: sách CÓ lỗi in ký hiệu (số file sai, / ↔ ., bỏ nước cuối zugzwang). Engine + isCheckmate là lưới an toàn: nước sách phạm luật/không-sát ⇒ soi lại, thường là 1 ký tự OCR sai. KHÔNG đăng nếu không tìm ra bản đúng verify được.
  - **Series = 46 bài**. Local seed 235. ĐÃ PUSH GitHub (lô 6).
  - **2026-09-02 (lô 7)**: hoàn tất **Bài 10** — thêm vd7 (Hình1.57, bức Pháo bằng Mã), vd8 (Hình1.58, Pháo trước Xe sau, 2 biến), vd9 (Hình1.59, thí Xe cản thông đạo), vd10 (Hình1.60, Tiền Mã hậu Pháo, 2 biến), vd11 (Hình1.61, thí Binh thí Xe). Tất cả isCheckmate=true. Bài 10 = 10 bài (vd1-11 trừ vd5 hoãn). **Fix cột: Hình1.58 top row là col3-5 (Tướng file5), không phải col2-4.**
  - **Series = 51 bài**. ĐÃ PUSH GitHub (lô 7, Bài 10 hoàn tất).
  - **Tiếp theo**: Bài 11 **Thiết Môn Thuyên** (铁门闩, trang 44+, Hình 1.62+).
