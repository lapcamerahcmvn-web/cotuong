# Chuyên đề "Trung Cuộc Sơ Đồ Tư Duy" (series `trung-cuoc-so-do-tu-duy`)

Lý thuyết trung cuộc theo sơ đồ tư duy: định nghĩa, phương pháp tính sát, 5 hướng khi bị đuổi bắt quân, khống chế, ngăn cản,
phế quân, phân tích nhược điểm (4 bài), phối hợp binh chủng / liên hệ hữu cơ / vị trí quân / tập trung binh lực, nhận thức
cục diện (điển hình – động – tĩnh), 5 hướng tư duy, câu hỏi khi tư duy — kèm ví dụ và 294 bài tập. Sơ đồ tư duy
`trung-cuoc-so-do-tu-duy` (bảng `mindmaps`) nhúng trong bài viết `tools/news-seo/posts/22-trung-cuoc-so-do-tu-duy.cjs`.

Nguồn: PDF nội bộ trên ổ E: (có bản quyền — KHÔNG public tên sách/tác giả). Phần lý thuyết là ảnh sơ đồ tư duy: đã đọc
bằng mắt để nắm ý rồi **viết lại bằng lời riêng** trong `theory.cjs`. Thế ví dụ (`boards.txt`, E1–E49) chép tay từ ảnh, mọi
mạch nước trong sách được đi thử bằng máy (sách có 1 lỗi in số lộ ở E14, mạch E40/E45 cắt trước chỗ không khớp bàn cờ).
Bài tập là font cờ dạng chữ (trích FEN tự động), sách **không kèm lời giải** → máy giải.

## Dựng lại

```bash
W=<thư mục làm việc>
python tools/trung-cuoc-so-do-tu-duy/extract.py "E:/…/SÁCH TRUNG CỤC SƠ ĐỒ TƯ DUY FULL.pdf" $W/probs.json   # 294 bài
# probs.json → in.json [{…, ch:10, n:index}] (n phải duy nhất: khóa kết quả của solve.mjs là "ch-n")
node tools/sat-cuc-lien-hoan/solve.mjs $W/in.json $W/c0.json 0/4 20        # liên chiếu, 4 tiến trình
node tools/sat-cuc-lien-hoan/solve.mjs $W/left.json $W/q0.json 0/4 150 1   # bài còn lại: cho 1 nước êm, 150 giây/bài
node tools/sat-cuc-lien-hoan/deep.mjs $W/in.json $W/sol.json $W/d0.json 0/4 5000 700   # alpha-beta tìm chiếu hết
#   → $W/mates.json {index: {k, main, src:'proof'|'search'}}
node tools/sat-cuc-lien-hoan/solve.mjs $W/flip.json $W/f0.json 0/2 10      # thế LẬT MÀU: Đen có sẵn đòn sát không → threat.json
node tools/trung-cuoc-so-do-tu-duy/best.mjs $W/probs.json $W/mates.json $W/b0.json 0/4 6000 1500   # bài không chiếu hết
node tools/trung-cuoc-so-do-tu-duy/merge.mjs $W                             # → data.json
node tools/trung-cuoc-so-do-tu-duy/gen.mjs                                  # → batch + mindmap.md + mindmaps.json
node tools/trung-cuoc-bao-dien/tcbd.cjs build tools/trung-cuoc-bao-dien/batches/trung-cuoc-so-do-tu-duy.json
node tools/news-seo/build.cjs   # rồi git checkout ảnh bài viết cũ (build ghi lại toàn bộ ảnh posts)
php artisan db:seed --class=ContentSeeder && php artisan db:seed --class=MindmapSeeder --force
php artisan db:seed --class=PostSeeder --force && php artisan cotuong:build-puzzles
```

## Ba loại bài tập (Đỏ luôn đi trước)

| Loại | Điều kiện | Trên site |
|---|---|---|
| Chiếu hết | `solve.mjs` chứng minh (liên chiếu / 1 nước êm) hoặc `deep.mjs` tìm thấy | giải đố, `expect: mate`; vào "Luyện sát pháp" theo số nước |
| Tìm nước | `best.mjs`: nước đầu hơn phương án thứ hai ≥ 0,6 Tốt và Đỏ hơn ≥ 0,8 Tốt — hoặc hơn phương án thứ hai ≥ 1,2 Tốt (nước đỡ duy nhất) | giải đố, máy nhận nước tương đương; thế luyện tập gắn nhãn `tim-nuoc` (chỉ ở chủ đề nhóm Trung cuộc) |
| Phân tích | còn lại (không có nước vượt trội, hoặc Đỏ đang kém) | chỉ xem, tiêu đề "(Phân Tích)", nêu các nước gần tương đương |

`best.mjs` cắt mạch ở nước Đỏ có lợi vật chất "đã chốt" lớn nhất (tính sau khi Đen đáp lại). `threat.json`: nhiều thế phần
sát chiêu có Đen dọa chiếu hết 1–2 nước — gợi ý "Đen đang dọa" trong bài.
