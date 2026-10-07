# Chuyên đề "Sát Cục Liên Hoàn 1-10 Nước" (series `sat-cuc-lien-hoan`)

1.176 bài = 1 bài tổng quan + 10 bài giới thiệu chặng (1→10 nước) + 1.165 bài tập chiếu hết liên hoàn (Đỏ đi trước,
mọi nước Đỏ đều chiếu) + bài viết "Phương pháp tư duy giải bài tập sát cục" có sơ đồ tư duy 6 câu hỏi.

Nguồn: PDF bài tập nội bộ trên ổ E: (có bản quyền — KHÔNG public tên sách/tác giả, chữ trên web đều tự viết).
Sơ đồ bài tập trong PDF là **font cờ dạng chữ** (không phải ảnh) → trích FEN tự động, không cần dò ảnh.
Phần đáp án của PDF là ảnh tiếng Trung → KHÔNG dùng; lời giải do máy tự giải và **chứng minh**.

## Dựng lại

```bash
# 1) PDF → probs.json (FEN từng bài) — xem "Định dạng sơ đồ" bên dưới
python tools/sat-cuc-lien-hoan/extract.py "E:/…/sát cục liên hoàn 1-10 nước.pdf" probs.json
# 2) Giải: mọi nước Đỏ đều chiếu, chứng minh chiếu hết với MỌI cách đỡ (4 tiến trình song song ~5 phút)
node tools/sat-cuc-lien-hoan/solve.mjs probs.json sol0.json 0/4 180      # … 1/4, 2/4, 3/4
#    bài chưa chứng minh được: thử thêm 2 nước (tham số cuối) — nước êm (tham số quiet) không giúp được bài nào
node tools/sat-cuc-lien-hoan/solve.mjs hard.json hard-x2.json 0/1 60 0 2
# 3) data.json (keep/skip) → batch + lời giảng tự sinh + sơ đồ tư duy (mindmap.md → database/seeders/data/mindmaps.json)
node tools/sat-cuc-lien-hoan/gen.mjs
node tools/trung-cuoc-bao-dien/tcbd.cjs build tools/trung-cuoc-bao-dien/batches/sat-cuc-lien-hoan.json   # kiểm chiếu bí nước cuối
node tools/news-seo/build.cjs                       # bài viết tools/news-seo/posts/20-*.cjs (nhúng sơ đồ bằng h.MS)
node tools/og-image/generate.cjs --missing && python tools/og-image/optimize.py
php artisan db:seed --class=ContentSeeder           # ~10 phút local
php artisan db:seed --class=MindmapSeeder --force
php artisan db:seed --class=PostSeeder --force
php artisan cotuong:build-puzzles                   # series đã thêm vào config/puzzle-skills.php series_pool
```

## Định dạng sơ đồ trong PDF (lớp text, pymupdf `get_text()`)

- 10 dòng × 9 ký tự liên tiếp = 1 bàn cờ; dòng 0 = hàng trên (Đen). Nhãn bài nằm ngay trước: `i 3-15`, `i 10 - 136`,
  `i10-29`, `i 10 – 140` (gạch ngang dài) — regex `^i\s*(\d+)\s*[-–]\s*(\d+)`.
- Quân: **chữ thường = Đỏ, chữ HOA = Đen**; `k` Tướng, `a` Sĩ, `e` Tượng, `h` Mã, `r` Xe, `c` Pháo, `p` Tốt
  (→ FEN: e→B/b, h→N/n). Mọi ký tự khác (`0-9 % $ ^ [ ] ; ' , . / \ =`) là nét vẽ bàn cờ = ô trống.
- Lỗi nhãn trong sách: trang 146 in "10-49" hai lần (cái đầu là 10-39); không có 10-142; "10-141" ghi "hơn 20 nước" (bỏ);
  1 bài "Thực chiến (11 nước)" không đánh số ở trang 142 → máy giải 10 nước, đăng thành bài thực chiến.

## Bộ giải (`solve.mjs`)

Chứng minh (không ước lượng) trên engine của site: Đỏ chỉ đi nước chiếu, Đen thử mọi nước; ghi nhớ vị trí theo
(bàn, số nước). Mạch chính: Đỏ đi nước chiếu hết nhanh nhất, **Đen đỡ dai nhất** (hoà điểm: ưu tiên nước ăn quân).
`alts` = nước Đỏ khác cũng chiếu hết đúng hạn (chế độ *Thử tự giải* của site đã tự chấp nhận mọi đường thắng).
Nhanh: bài 10 nước thường 0,1–2 giây.

## Bỏ 34 bài (xem `data.json` → `skip`)

- 7 bài sơ đồ thiếu Tướng (lỗi in): 5-5, 7-32, 7-74, 8-2, 9-50, 9-79, 9-84.
- 11 bài không chứng minh được chiếu hết liên hoàn trong số nước sách ghi (+2): nghi sơ đồ chép lệch so với bản gốc.
- 16 bài máy chiếu hết nhanh hơn sách **≥3 nước** (VD 6-57 sát ngay 1 nước): gần như chắc sơ đồ chép thiếu quân phòng thủ.
- Giữ: 30 bài nhanh hơn sách 1–2 nước và 15 bài cần thêm 1 nước — nội dung bài nói rõ số nước thật (máy chứng minh).

## Lời giảng tự sinh (`gen.mjs`)

Phân tích lời giải trên bàn: thí quân (Đen ăn ngay quân vừa đi), lưỡng chiếu, chiếu rút (kể cả mở chân Mã) khác với
"chen quân làm ngòi cho Pháo", hình sát cuối (Mã ngọa tào c8/g8, quải giác d7/f7, Pháo trùng, Pháo mượn Sĩ Tượng Đen làm
ngòi, Xe chiếu đáy, muộn cung, mặt Tướng khoá ô thoát), Đen có dọa chiếu hết ngay không (lý do phải chiếu liên tục).
Câu chữ chọn theo mã bài (ổn định giữa các lần sinh). Chỉ khẳng định điều kiểm được trên bàn cờ.
