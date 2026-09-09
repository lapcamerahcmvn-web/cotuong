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
- **2026-09-02 (lô 8) — Bài 11 Thiết Môn Thuyên** (Pháo trấn trung lộ + Xe/Binh chốt cửa Tướng):
  - vd1 (Hình1.62, mượn Tướng trợ công — chiếu bí thật ✓). vd3 (Hình1.64, thí Mã cướp điểm nóng → hình thành thiết môn thuyên; isCheckmate=false vì nước cuối P7-5 chỉ DỰNG THẾ, không chiếu ngay → framing "giành thắng thế" thành thật).
  - **Hoãn vd2 (Hình1.63)**: X4.3 sách ghi "sát" nhưng engine cho king ăn được Xe (0,5) không được phòng thủ → chưa phải chiếu bí với sơ đồ đang đọc; nghi đọc sót 1 quân, cần soi lại.
  - **ĐỔI SCHEME ORDER từ Bài 11**: `type*10+vd` bị đụng (Bài10 vd11 = Bài11 vd1 = 111). Bài 11+ dùng **`Bài*100+vd`** (1101, 1103...) — sort sau Bài 10 (≤111), không đụng.
  - **NHẬN XÉT loại thiết môn thuyên**: nhiều ví dụ kết bằng "hình thành thế → thắng" (không chiếu hết ngay ở nước cuối sách in) — giống Pháo lăn. Chỉ đăng chiếu-bí khi isCheckmate=true; ví dụ "dựng thế" thì framing thành thật.
  - **Series = 53 bài**. ĐÃ PUSH (lô 8).
  - **Tiếp theo**: Bài 11 còn Hình 1.65+ (vd4+), rồi Bài 12.
- **2026-09-03/04 (lô 9) — hết Bài 11 + mở Bài 12**:
  - **Bài 11 Thiết Môn Thuyên** thêm: vd5 (Hình1.66, vận Pháo cánh trái), vd6 (Hình1.67, Tam bá thủ Xe Binh Tướng), vd8 (Hình1.69, tàn cuộc Pháo Binh — mate thật 15 nước), vd9 (Hình1.70, song Xe tam bá thủ). Hoãn: vd2 (Hình1.63 X4.3 chưa sát), vd4/vd7/vd10 (domination dài / dày quân).
  - **Bài 12 MÃ NGỌA TÀO** (马卧槽, Mã cài chuồng — Mã nhảy lên Tượng đáy đối phương, vừa chiếu vừa rút Xe): vd1 (Hình1.72, dẫn Xe về đáy), vd2 (Hình1.73, thí Xe dẫn Xe bịt mắt Tượng), vd3 (Hình1.74, lưỡng chiếu Mã Binh), vd4 (Hình1.75, thí Binh phá Sĩ), vd5 (Hình1.76, thí Xe sát Tượng). TẤT CẢ isCheckmate=true.
  - **Fix đọc sơ đồ (bài học)**: `validatePosition` bắt Sĩ/Tượng ĐỎ sai ô (Hình1.75 mình đọc lệch cụm phòng thủ đáy 1 cột → detector sửa: 相(7,4)/仕(8,4)/相(9,2)/仕(9,3)/帥(9,4)). Hình1.76 Mã đỏ ở (4,7)=file2 không phải (4,6). LUÔN chạy validatePosition trước khi seed.
  - **Series = 62 bài** (10 cây biến). ĐÃ PUSH GitHub (lô 9).
  - **Tiếp theo**: Bài 12 còn Hình 1.77-1.78+ (vd6+), rồi Bài 13.
- **2026-09-05/06 (lô 11-12) — hoàn tất Bài 13 Quải Giác Mã (6 vd) + Bài 14 Bạt Hoàng Mã (5 vd)**:
  - **Bài 13 QUẢI GIÁC MÃ** (挂角马/Sĩ giác Mã — Mã ở góc Sĩ trên cao, chiếu Tướng nguyên vị): vd1 (Xe tiến Pháo hậu), vd2 (Kim câu quải ngọc / Bạch Mã hiện đề — sửa lỗi in "M8.6"→"M8/6"), vd3 (nhất thạch tam điêu), vd4-6 hoàn tất từ phiên trước. Series đủ 6 ví dụ.
  - **Bài 14 BẠT HOÀNG MÃ** (拔皇马 — Mã như lò xo đàn hồi, Xe mượn sức Mã chiếu rút): vd1 (Xe mượn Mã chiếu rút), vd2 (Mã bật dẫn Xe về đáy, có biến), vd3 (mượn Mã khéo sát), vd4 (mượn Tướng trợ chiến, 15 nước), vd5 (chọn điểm đột phá — sửa giải mã "Xs.4" đúng là Xe sau vì có 2 Xe đen cùng lộ 6, không phải lỗi in). TẤT CẢ isCheckmate=true.
  - **Bài học transcribe**: OCR hay lẫn `/` (thoái) ↔ `.` (tiến) — luôn thử cả 2 khi 1 cái parse fail hoặc không mate. Ký hiệu `Xs`/`Xt` (trước/sau) chỉ hợp lệ khi THỰC SỰ có 2 quân cùng loại cùng file tại thời điểm đó — dùng engine đếm để xác nhận trước khi nghi ngờ lỗi in.
  - **Series = 75 bài** (13 cây biến). ĐÃ PUSH GitHub (lô 11-12).
  - **Tiếp theo**: Bài 15 (trang 64+, xem tên loại).
- **2026-09-06 (lô 13) — hoàn tất Bài 15 BÁT GIÁC MÃ (Mã Điền)** (Mã chiếm góc Sĩ đối diện chéo với Tướng, tước tự do hoạt động):
  - vd1 (song Mã đối diện góc), vd2 (biến "Mã chết" thành "Mã sống" + mượn Soái trợ chiến — **phát hiện: sách in thêm 2 nước cuối "X5-6"/"B6-5" dù thế đã CHIẾU BÍ ở nước 7 Trắng "B4.1"; dùng engine đếm nước đáp của Đen=0 xác nhận, cắt bỏ 2 nước thừa**), vd3 (thí Tượng cản Xe), vd4 (mượn Xe kềm Sĩ, chú ý thứ tự nước), vd5 (thí Xe phá Sĩ — thạch phá thiên kinh).
  - **Fix đọc sơ đồ**: Hình1.92/1.93 nhầm màu Sĩ đen thành đỏ (uppercase A thay vì lowercase a — validatePosition bắt ngay); Hình1.96 nhầm 1 quân Binh(P) thành Tượng(B) thứ 3 (validatePosition bắt "Quá số B: 3").
  - **Series = 80 bài** (13 cây biến). ĐÃ PUSH GitHub (lô 13).
  - **Tiếp theo**: **Bài 16 ĐIỀU NGƯ MÃ (MÃ CÂU CÁ)** — Mã ở vị trí 3.3/3.7 phối Xe câu chiếu bí, giống "song Tượng liên hoàn" nhưng khống chế Sĩ giữa+Sĩ đáy. Trang 65+, Hình 1.97+.
- **2026-09-06 (lô 14) — HOÀN TẤT Bài 16 Điều Ngư Mã (6 vd) + mở Bài 17 Cao Điều Mã (2 vd)**:
  - **Bài 16 ĐIỀU NGƯ MÃ**: vd1 (thí Binh lộ đáy), vd2 (thí Xe sát Sĩ), vd3 (song Xe Mã tạo sát cục), vd4 (ép Tướng về nguyên vị), vd5 (thí Xe kịp thời, có "Mã sau" — 2 Mã đen cùng file, engine tự chọn đúng), vd6 (song Xe nước đi lão luyện, "Xe sau" tương tự). Series đủ 6/6 ví dụ.
  - **Bài 17 CAO ĐIỀU MÃ (Trắc Diện Hổ)** (Mã chiếm lộ nguyên vị Tốt đối phương, Tướng ở đường sườn, Xe phối Mã): vd1 (**thủ đoạn Tiến Chiếu** — kết thúc chỉ ở thế áp đảo, KHÔNG chiếu bí ngay vì Tướng còn 2 ô lùi — framing thành thật "Trắng chiếm ưu thế"), vd2 (**thủ đoạn Thiềm Chiếu** — đổi hướng Xe né Pháo phòng thủ, chiếu bí thật ✓). Đây là 2 kỹ thuật ĐỐI LẬP có chủ đích của chính sách (tiến chiếu vs thiềm chiếu), không phải lỗi.
  - **Fix đọc sơ đồ nhiều lần**: Hình1.98 hàng 0 lệch 1 cột (validatePosition bắt Tượng/Sĩ sai ô); Hình1.101 đọc lại từ đầu bằng detector thô (nhầm Sĩ/Tượng đỏ vị trí, lẫn A_RED/B_RED).
  - **Series = 88 bài** (13 cây biến). ĐÃ PUSH GitHub (lô 14).
  - **Tiếp theo**: Bài 17 còn vd3+ (Hình 1.105 đã detect, trang 72+), rồi Bài 18.
- **2026-09-09 (lô 15) — HOÀN TẤT Bài 17 (6vd) + Bài 18 Song Mã Ẩm Tuyền (6vd) — 10 bài mới**:
  - **Bài 17 CAO ĐIỀU MÃ** hoàn tất: vd3 (song Mã đảo bước — framing "áp đảo" vì Đen còn nước chắn), vd4 (gọn gàng sạch sẽ, mate), vd5 (tặng Binh cho ăn, mate), vd6 (Xe Mã liên hợp tác chiến, 19 nước, mate). Đủ 6/6 ví dụ.
  - **Bài 18 SONG MÃ ẨM TUYỀN (Đá Cổn Mã)** (song Mã cánh sườn: 1 Mã khống chế cửa Tướng lộ 2/8 hoành 9, 1 Mã ngọa tào, mượn sức nhau chiếu rút): vd1 (khống chế rồi ngọa tào, mate), vd2 (mượn sức chiếu rút, mate), vd3 (mượn uy hiếp từ xa — framing "ưu thế" vì không mate ngay), vd4 (thí Mã quải giác, mate), vd5 (đổi hướng mượn Tướng trợ lực, mate), vd6 (nhảy vào miệng hổ — kinh điển nhất, 15 nước, mate). Đủ 6/6 ví dụ.
  - **Lỗi FEN đáng nhớ phiên này**: (1) thiếu 1 hàng trống giữa 2 dòng FEN (Hình1.109 — làm lệch toàn bộ nửa dưới bàn cờ 1 hàng); (2) đếm sai offset ký tự số trong chuỗi FEN (Hình1.107, "3akab1c" vs "3aka1b1c" — B TƯỢNG lạc sang cột kế); (3) nhầm màu quân do độ phân giải thấp — Pháo đen tưởng đỏ (Hình1.107), Mã đỏ tưởng đen (Hình1.108); (4) đọc lệch cột do đếm nhầm quân trong cụm dày (Hình1.111, phải zoom + đối chiếu nhãn lưới `colrow` trực tiếp mới đúng). Bài học: LUÔN chạy `validatePosition` — mọi lỗi trên đều bị bắt ngay, không lỗi nào lọt qua.
  - **Series = 98 bài** (13 cây biến). ĐÃ PUSH GitHub (lô 15).
  - **Tiếp theo**: **Bài 19 TIỀN MÃ HẬU PHÁO** (Mã cùng trục dọc/hoành với Tướng, cách 1 ô trống, hạn chế Tướng; Pháo sau Mã chiếu bí). Trang 79+, Hình 1.115 đã detect (vd1 dở).
- **2026-09-09 (lô 16) — HOÀN TẤT CHƯƠNG 1 (19/19 loại sát pháp cơ bản)! + dò đường Chương 2**:
  - **Sửa nhầm ranh giới chương trước đó**: Hình1.115 mà lô 15 tưởng là "Bài19 vd1" thực ra là **Bài18 vd7** (Song Mã Ẩm Tuyền) — Bài 19 thật sự bắt đầu SAU ví dụ đó. Đã đổi tên đúng `song-ma-am-tuyen-vi-du-7`.
  - **Bài 19 TIỀN MÃ HẬU PHÁO** (Mã cùng trục dọc/hoành với Tướng cách 1 ô, Pháo sau Mã chiếu xuyên): vd2 (thí Pháo nổ Tượng), vd3 (thí Xe sát Sĩ), vd4 (mượn Tướng trợ lực phế Xe), vd6 (tàn cuộc mượn uy Xe Pháo). Đủ 4/6 — **hoãn vd1 và vd5** (Hình1.116, Hình1.120): nước cuối sách in không tạo ra thế chiếu nào cả (không phải chỉ "chưa mate" mà hoàn toàn không check) — nghi ngờ lỗi transcribe sâu hơn dạng thường gặp, cần đọc lại kỹ hơn ở phiên sau thay vì đoán.
  - **Lỗi FEN mới phát hiện (Hình1.121)**: tự đọc nhầm cột ngay từ raw detector output (chép tay sai col3,4,5 thay vì đúng col4,5,6) — không phải lỗi ảnh/detector, mà lỗi TỰ CHÉP LẠI kết quả. Bài học: khi nghi ngờ, chạy lại `detect-pieces.py` lần nữa và đối chiếu trực tiếp, đừng tin trí nhớ vừa đọc.
  - **🎉 CHƯƠNG 1 "SÁT PHÁP CƠ BẢN" HOÀN TẤT — đủ 19/19 loại sát pháp** (Bài 1-19, ~103 bài trong series, tính cả biến).
  - **DÒ ĐƯỜNG CHƯƠNG 2 "SÁT PHÁP CƠ BẢN NÂNG CAO"**: cấu trúc HOÀN TOÀN KHÁC — không còn ví dụ dựng sẵn (constructed) mà là **trích đoạn ván đấu thực chiến của các kỳ thủ có tên tuổi** (Trương Hiểu Hà, Thiện Hà Lệ, Đào Hán Minh, Liễu Đại Hoa, Kim Ba, Trương Hóa Minh…), bắt đầu từ nước thứ 19-35 của ván (không phải nước 1), **rất dày quân (15-27 quân/thế)**, và phần lớn kết thúc bằng **"nhận thua" / "chiếm ưu"** chứ KHÔNG PHẢI chiếu bí in rõ trong sách. Bài 1 (Thiết Môn Thuyên nâng cao, Chương 2) đã thử vd1 (constructed, có sẵn — làm được, framing thắng thế) nhưng vd2-vd4 (thực chiến, Hình2.2/2.3/2.6) đều dày quân + kết "nhận thua" → rủi ro sai sót transcribe cao hơn hẳn, tạm hoãn không làm vội.
  - **Series = 103 bài**. ĐÃ PUSH GitHub (lô 16).
  - **2026-09-09 (lô 17) — PHA 2: code chức năng Bài Tập (giải đố)** — user chọn dừng Chương 2, chuyển hướng theo `ke-hoach-bai-tap-sat-phap.md` nhưng dùng kiến trúc đã chốt (tái dùng `Lesson`, KHÔNG tạo bảng `puzzles` riêng):
    - **Migration** `2026_09_09_100001_add_puzzle_side_to_lessons.php`: cột `lessons.puzzle_side` nullable string (`do`/`den`/null).
    - **`public/js/xiangqi-rules.js`** (MỚI): tách các hàm luật thuần túy từ board-editor.js (`isRed, sameSide, posRole, moveByType, legalMove, findKing, inCheck, legalNoSelfCheck, loadFen, toFen, toIccs, fromIccs, notation, sideOf`) thành file dùng chung `window.XiangqiRules`. **KHÔNG đụng board-editor.js** (giữ nguyên bản gốc, tránh rủi ro hồi quy cho trình soạn Admin đang chạy tốt) — chấp nhận trùng lặp code nhỏ, đổi lấy an toàn.
    - **`public/js/board.js`**: thêm `initPuzzle()` — chế độ giải đố dùng `steps` (mạch chính) làm lời giải cố định. Bấm quân mình → bấm ô đích → so khớp ICCS với nước kỳ vọng; đúng thì đi + tự động đáp trả nước đối phương sau 550ms, sai thì báo lỗi cho thử lại. Nút Làm lại/Xem lời giải (auto-play)/Copy FEN. `renderBoard()` thêm tham số `selected` (vòng tròn xanh quanh quân đang chọn).
    - **`chess-board.blade.php`**: thêm prop `mode`/`puzzleSide`; khi `mode=puzzle` ẩn control Lùi/Tiến thường, hiện control giải đố. **Sự cố phát hiện qua tinker-render**: `@json([...phức tạp lồng ternary...])` làm Blade compiler báo "Unclosed '[' does not match ')'" — SỬA bằng cách tính `$jsonConfig` trong `@php` trước rồi `@json($jsonConfig)` (đơn giản hoá biểu thức truyền cho directive).
    - **`lessons/show.blade.php`**: khi `$lesson->puzzle_side` có giá trị → render 2 bàn cờ (view ẩn/hiện qua toggle "📖 Xem lời giảng" / "🧩 Thử tự giải"), bài thường (puzzle_side=null, tất cả 103 bài hiện tại) không đổi gì.
    - **Admin**: thêm select `puzzle_side` vào `lessons/edit.blade.php` + validate/fill trong `LessonController@update`; `ExportContent.php` thêm `puzzle_side` vào export (round-trip qua `ContentSeeder` tự động vì seeder dùng mass-assignment chung).
    - **QUAN TRỌNG — hạn chế môi trường phát hiện**: sandbox này KHÔNG cho `curl`/HTTP tới cổng cotuong (dù `php artisan serve` chạy đúng) — mọi request HTTP cục bộ đều bị route nhầm sang project laravel13-shop (project chính của phiên). Đã xác minh bằng cách khác: `php artisan view:cache` (bắt lỗi cú pháp Blade) + giả lập request qua `app()->handle(Illuminate\Http\Request::create(...))` trong tinker (render thật, đọc HTML output) — xác nhận: bài có `puzzle_side` ra 2 board (view ẩn + puzzle), bài thường ra đúng 1 board như cũ (test hồi quy OK), trang Admin edit có field `puzzle_side` đúng.
    - **CHƯA LÀM** (để dành phiên sau nếu cần): (a) bật `puzzle_side` cho các bài cụ thể trong 103 bài hiện có (cần chọn bài phù hợp — ngắn 3-7 nước, không có biến phức tạp); (b) trang danh mục "Bài Tập" liệt kê các bài có `puzzle_side`; (c) test tương tác thật trên trình duyệt (người dùng tự làm, môi trường này không click được); (d) gamification (điểm/bảng xếp hạng) — cố tình hoãn theo kế hoạch gốc.
    - **Test bổ sung (không có trình duyệt thật — sandbox chặn tải Chromium mới, cache cũ không đủ file)**: viết harness Node.js nạp ĐÚNG `public/js/xiangqi-rules.js` thật, mô phỏng lại logic `initPuzzle` (không DOM) và trace toàn bộ 7 nước của `ma-ngoa-tao-vi-du-1` bằng dữ liệu `lesson_steps` thật lấy từ DB. Kết quả: cả 7 nước đi đúng + đối phương tự đáp trả đều khớp, `solved=true` đúng lúc; nước sai bị từ chối đúng (không đổi state); `inCheck`+đếm nước thoát xác nhận vị trí cuối là chiếu bí thật (0 nước thoát). Qua đó **phát hiện 1 lỗi thật**: nhãn "Đến lượt bạn" hiển thị SAI trong lúc máy đang tự đáp trả (dựa cứng vào `puzzleSide` thay vì lượt hiện tại `curExpected().side`) — đã sửa trong `draw()`.
    - **ĐÃ PUSH** (sau khi tự kiểm tra kỹ bằng 2 lớp: giả lập HTTP request qua Laravel kernel + harness Node logic nạp file luật thật — không có trình duyệt click-thật nên bạn vẫn nên tự thử tay khi rảnh, đặc biệt phần toạ độ SVG lúc bấm chuột thật).
  - **Khuyến nghị cho phiên sau**: Chương 2 cần tốc độ chậm hơn hẳn (mỗi thế 15-27 quân, đối chiếu kỹ từng quân bằng detector + zoom, xác nhận đúng nước cuối trước khi kết luận "thắng thế" hay có chiếu bí thật). Có thể cân nhắc: (a) tiếp tục nhưng chấp nhận tốc độ chậm hơn nhiều so với Chương 1, hoặc (b) hỏi ý kiến người dùng có muốn ưu tiên Pha 2 (code chức năng Bài Tập/giải đố theo `ke-hoach-bai-tap-sat-phap.md`) cho 103 bài Chương 1 đã có trước, thay vì tiếp tục đào sâu Chương 2 ngay.
  - **Thử nghiệm thực tế (cùng phiên, sau khi hỏi ý kiến — user chọn "làm tiếp chậm hơn")**: Bỏ nhiều công đọc kỹ **Hình 2.6** (Bài1 vd4, Kim Ba vs Trương Hóa Minh, 27 quân) — sau ~6 lần sửa FEN (lệch cột hàng loạt, nhầm màu Pháo đỏ/đen, đếm dư quân) mới đạt `validatePosition: OK`, nhưng nước đầu "P5/2" vẫn báo phạm luật (đường đi Pháo bị Binh mình chặn) — CHƯA giải quyết xong. Xem tiếp Bài2 Hình2.7 (Hồ Minh vs Lâm Dã) cũng kết "nhận thua" ở nước 31 nhưng có 2 NHÁNH THẮNG CỤ THỂ ghi rõ trong sách (nếu Đen đi tiếp) — tiềm năng dùng được nhưng cần dựng lại toàn bộ 31 nước từ đầu ván để có đúng FEN tại thời điểm đó → chi phí quá lớn cho 1 bài.
  - **KẾT LUẬN THỰC TẾ về Chương 2**: mỗi ví dụ tốn effort đọc/sửa FEN cao hơn Chương 1 GẤP NHIỀU LẦN (thế dày 15-27 quân so với 5-12 quân; không tự đứng độc lập mà là đoạn giữa ván thật nên nhiều khi cần biết cả chuỗi nước trước đó). Tỉ lệ thành công (ra được bài chiếu-bí-xác-nhận) trong lần thử này: 0/1 hoàn chỉnh dù đã đầu tư đáng kể. **Khuyến nghị mạnh cho phiên sau**: ưu tiên hỏi lại người dùng có thật sự muốn tiếp tục Chương 2 theo hướng này (rất chậm, tỉ lệ thành công thấp hơn), hay chuyển hướng — VD làm Pha 2 (giải đố) cho 103 bài Chương 1 đã vững chắc, hoặc tìm nguồn khác cho nội dung nâng cao.
- **2026-09-04 (lô 10) — hết Bài 12**:
  - Thêm vd6 (Hình1.77, hiến Xe lộ Binh đáy, có biến), vd7 (Hình1.78, hiến Xe miệng Tượng). **vd8 (Hình1.79) là ví dụ HÒA CỜ** (Mã ngọa tào cầm hòa, không phải sát) → KHÔNG đưa vào (không phải sát pháp). Bài 12 = vd1-7 (7 bài).
  - **Fix**: Hình1.78 相 đỏ ở (5,6) không phải (5,7) (validatePosition bắt). Biến vd7 sách in "X2.1" mâu thuẫn X2-5 (bỏ biến, chỉ giữ mạch chính).
  - **Series = 64 bài**. ĐÃ PUSH (lô 10, hết Bài 12).
  - **Tiếp theo**: **Bài 13 QUẢI GIÁC MÃ** (挂角马/Sĩ giác Mã — Mã ở góc Sĩ trên cao cửu cung đối phương, chiếu Tướng nguyên vị). Trang 56+, Hình 1.80+.
- **2026-09-05 (lô 11) — trọn Bài 13 Quải Giác Mã** (Hình 1.80-1.85, 6 ví dụ, TẤT CẢ isCheckmate=true):
  - vd1 (Xe tiến Pháo hậu), vd2 (Kim câu quải ngọc/Bạch Mã hiện đề — thí Xe dẫn ly Sĩ), vd3 (nhất thạch tam điêu — Pháo dẫn ly 3 tác dụng), vd4 (song Xe hiến Xe), vd5 (điều Mã đảo góc — nhấn TRÌNH TỰ), vd6 (Tiền Mã hậu Pháo, 2 biến).
  - **Fix đọc**: Hình1.80 Tướng đen (0,4)=file5 không phải (0,3) (detector). Hình1.81 "M8.6" thực ra **M8/6** (Mã xuống (2,3) quải giác — OCR /↔.). Hình1.82 cụm phòng thủ đáy lệch +1 cột. Hình1.84 detector báo (3,6) là FALSE POSITIVE (crop xác nhận trống).
  - **Series = 70 bài**. ĐÃ PUSH (lô 11).
  - **Tiếp theo**: **Bài 14 BẠT HOÀNG MÃ** (拔簧马 — Xe mượn sức Mã chiếu rút/chiếu bí, Mã như lò xo). Trang 60+, Hình 1.86+.
