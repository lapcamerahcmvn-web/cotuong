# Chuyên đề "Sát Chiêu Thực Dụng — 13 Đội Hình" (series `sat-chieu-thuc-dung`)

667 bài = tổng quan + phương pháp tư duy (4 câu hỏi) + 27 bài đòn (định nghĩa, **khẩu quyết** tấn công, phòng thủ,
bàn cờ minh họa, danh sách bài luyện) + 15 bài mở chương (13 đội hình + trung cuộc + tổng hợp) + 623 bài tập.
Kèm sơ đồ tư duy `sat-chieu-thuc-dung-13-doi-hinh` (bảng `mindmaps`) nhúng trong bài viết
`tools/news-seo/posts/21-sat-chieu-thuc-dung.cjs`.

Nguồn: PDF nội bộ trên ổ E: (có bản quyền — KHÔNG public tên sách/tác giả; định nghĩa và khẩu quyết trong `don.cjs`
đều viết lại bằng lời riêng). Phần lý thuyết của PDF là ảnh sơ đồ tư duy (đọc bằng mắt để nắm ý); phần bài tập là font cờ
dạng chữ (trích FEN tự động). Sách không kèm lời giải → máy tự giải.

Khác chuyên đề cũ `sat-phap-13-doi-hinh` (65 ván mẫu có biến, từ PGN): bài mở chương ở đây link sang ván mẫu cùng đội hình,
bài đòn link sang ví dụ cùng hình trong `sat-phap-dai-toan` (Mã điền = Bát giác Mã, Trắc diện hổ = Cao điều Mã…).

## Dựng lại

```bash
python tools/sat-chieu-thuc-dung/extract.py "E:/…/SAT CHIEU THUC DUNG….pdf" probs.json        # 1.055 sơ đồ
# đổi probs.json → [{ch:12, n:index, fen}] rồi giải liên chiếu (chứng minh) — 4 tiến trình, ~5 phút
node tools/sat-cuc-lien-hoan/solve.mjs in.json c0.json 0/4 40          # … 1/4 … 3/4
node tools/sat-cuc-lien-hoan/solve.mjs left.json q0.json 0/4 20 1     # bài còn lại: cho phép 1 nước êm
node tools/sat-cuc-lien-hoan/deep.mjs probs.json sol1.json d0.json 0/4 5000 700   # còn nữa: tìm kiếm alpha-beta của site
# gộp → tools/sat-chieu-thuc-dung/data.json {keep:[{id, sec, fen, k, main, src:'proof'|'search'}], skip:[…]}
node tools/sat-chieu-thuc-dung/gen.mjs        # batch + mindmap.md + database/seeders/data/mindmaps.json
node tools/trung-cuoc-bao-dien/tcbd.cjs build tools/trung-cuoc-bao-dien/batches/sat-chieu-thuc-dung.json
node tools/news-seo/build.cjs                 # rồi git checkout ảnh bài viết cũ (build ghi lại toàn bộ ảnh posts)
node tools/og-image/generate.cjs --missing --shard=i/4   # 4 tiến trình song song
php artisan db:seed --class=ContentSeeder && php artisan db:seed --class=MindmapSeeder --force
php artisan db:seed --class=PostSeeder --force && php artisan cotuong:build-puzzles
```

## Kết quả giải (07/10/2026)

- 1.055 sơ đồ → **600 bài chứng minh** (liên chiếu hoặc 1 nước êm) + **26 bài máy tìm** (alpha-beta thấy chiếu hết,
  dựng mạch bằng cách tìm lại từng nước — Đen đỡ theo đánh giá máy, chưa chứng minh; nội dung bài ghi rõ) − 3 bài kết thúc
  bằng "hết nước đi" (thắng theo luật nhưng không phải chiếu hết) = **623 bài tập**.
- **429 bài bỏ**: không có chiếu hết bắt buộc trong tầm máy (5 giây/bài). Đã soi ảnh gốc 2 bài (Song Pháo Chốt bài 2, 6):
  sơ đồ đọc ĐÚNG — đó là thế thắng quân/thắng thế, không phải lỗi trích. Nhiều nhất ở Xe Pháo Mã (107/200), Tổng hợp (59/120),
  các đội hình có Chốt (≈ 2/3 bị bỏ). Muốn đưa vào phải làm dạng bài "thắng thế" (không có trong khuôn bài tập chiếu hết hiện tại).

## Nhận diện đòn (`gen.mjs` › `tagsOf`) — chỉ gắn tên đòn khi khớp hình trên bàn cờ

| Đòn | Điều kiện |
|---|---|
| Mã hậu pháo / Tiền chốt hậu pháo / Pháo trùng | Pháo chiếu hết, ngòi là Mã / Chốt / Pháo Đỏ |
| Muộn sát | Pháo chiếu hết, ngòi là quân Đen |
| Giáp Xe Pháo | Pháo chiếu hết qua ngòi Xe, có Pháo thứ hai cùng đường |
| Ngọa tào / Quải giác / Đại giác Mã | Mã ở c8,g8 / d7,f7 (chiếu) / d9,f9 (chiếu hoặc khống chế ô cạnh Tướng) |
| Trắc diện hổ | Xe chiếu hết, Mã ở c7/g7 cùng phía Tướng lệch |
| Thiên địa pháo | Pháo trung lộ + Pháo trên hàng Tướng, có Pháo chiếu |
| Thiết môn thuyên | Pháo cột giữa khóa ô giữa hàng Tướng (1 ngòi), Tướng lệch, Xe/Chốt chiếu hết |
| Liệt mã xe / Pháo lăn | Chiếu rút: Xe dời đi để Mã chiếu / Pháo dời đi để Xe-Pháo chiếu |
| Đại đao / Tiểu đao xuyên tâm | Xe / Chốt ăn Sĩ ở e8 |
| Trất sát | Thí Xe, quân Đen ăn rồi lấp ô thoát cạnh Tướng, Xe còn lại chiếu hết |
| Nhị Xe lệch / Xe lửa dồn toa | Xe chiếu ngang + Xe kia khóa hàng kề / hai Xe nối đuôi cùng đường |
| Song Mã ẩm tuyền | Hai Mã áp sát cung, một Mã chiếu hết |
| Nhất tốt tống chung / Tam tiến tốt | Chốt chiếu ≥ 2 lần và chiếu hết / Chốt đi ≥ 3 nước, quân khác kết thúc |

Không nhận diện (không đủ chắc): Song hiến tửu, Song tiên, Mã khẩu, Mã điền, Song Xe nhĩ — bài đòn này không có bàn cờ
riêng; sơ đồ tư duy trỏ sang ví dụ Sát Pháp Đại Toàn nếu có. Sách có nhắc "Pháo giác", "Mã vuông" nhưng không có trang định
nghĩa → không viết bài riêng.
