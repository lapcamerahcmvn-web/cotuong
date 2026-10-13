# tools/nguyen-ly-tan-cuoc — Dựng lại chuyên đề "48 Bài Nguyên Lý Tàn Cuộc"

Bộ cũ (10/2026 trở về trước) chỉ có 48 file XQF chọn ngẫu nhiên, tiêu đề lấy từ tên file không dấu, bài nào cũng bật
giải đố (kể cả ván hòa, ván 150 nước) và mất nhánh biến của 80 file. Bộ mới bám đúng 48 bài giảng của nguồn:

- **214 bài** (Khái lược / ví dụ / ván chọn / Trọng điểm của từng bài giảng), 139 bài có bàn cờ, đủ nhánh biến.
- Lời giảng, lời từng nước **viết lại có dấu bằng lời riêng** (không chép nguyên văn; không nêu tên tác giả/sách/khóa học —
  tên kỳ thủ trong ván đấu thì giữ).
- **Giữ nguyên slug 48 bài cũ** (khớp theo thế đầu + chuỗi nước) để không mất tiến độ học / liên kết.
- **Giải đố** (bắt đi đúng từng nước) chỉ bật khi mạch chính ≤ 15 nước **và kết thúc bằng chiếu bí** (4 bài). Thế thắng
  tàn cuộc dài có nhiều nước thắng tương đương → không bật (vẫn xem / đoán nước bình thường).
- **Nháp (ngưng public)**: file trùng lặp trong nguồn — bài 37 chứa nhầm 2 file của bài 36; bài 46 có 2 bản Thiên Lý
  Độc Hành giống hệt (bản tên kèm GUID). Đặt `draft: true` trong `text/bai-NN.cjs` → `status: draft`.

## Tệp

| Tệp | Vai trò |
|-----|---------|
| `extract.cjs` | Đọc thư mục XQF nguồn (ngoài repo, có bản quyền — chỉ dùng nội bộ) → `src.json` (thế đầu, bên đi, mạch chính ICCS, nhánh `{from, after, moves}`). Bài 18 dạng `.txt` (ký pháp Trung) được chuyển sang ICCS. `--comments <out>` xuất lời bình gốc ra ngoài repo để đọc khi viết lại. |
| `src.json` | Dữ liệu nước đi đã trích (không chứa lời bình gốc). |
| `text/bai-NN.cjs` | Lời giảng viết lại: `{ ten, y, f: { '<tên file nguồn>': { t, s, c, k:{ply:caption}, v:{varIdx:{i:caption}}, kq, p, draft } } }`. `kq`: `thang`/`do`/`den`/`hoa`. `p`: bên giải nếu muốn bật giải đố (vẫn phải qua điều kiện chiếu bí ≤ 15 nước). |
| `gen.cjs` | Ghép `src.json` + `text/` → `tools/trung-cuoc-bao-dien/batches/48-bai-nguyen-ly-tan-cuoc.json`. Cắt mạch/nhánh ở nước phạm luật đầu tiên (hiện 0 trường hợp). Bài cũ lấy từ commit `303f658` (đổi bằng `OLD_REF=`). `--check` chỉ kiểm nước đi; `--partial` cho phép thiếu file lời giảng. |

## Quy trình

```bash
node tools/nguyen-ly-tan-cuoc/gen.cjs
node tools/trung-cuoc-bao-dien/tcbd.cjs build tools/trung-cuoc-bao-dien/batches/48-bai-nguyen-ly-tan-cuoc.json
# ảnh OG bài mới (4 tiến trình), rồi nén RIÊNG các PNG vừa tạo (không chạy optimize.py — nó nén lại toàn bộ ~7.800 ảnh)
node tools/og-image/generate.cjs --missing --shard=0/4   # … 3/4
# bài đổi tiêu đề nhưng giữ slug: tạo lại ảnh bằng --only=<slug>
php artisan db:seed --class=ContentSeeder --force          # ~18 phút local
php artisan optimize:clear && php artisan cotuong:build-puzzles
```

⚠️ **Giới hạn độ sâu JSON**: `variation_tree` lồng ~2 cấp/nước; ván > ~250 nước vượt giới hạn 512 cấp của
`json_decode` PHP và ContentSeeder **lặng lẽ bỏ qua cả file chuyên đề** (không báo lỗi). `gen.cjs` vì vậy chỉ giữ mạch
chính cho ván > 240 nước (bài 35, 298 nước). Kiểm nhanh: `php -r 'var_dump(json_decode(file_get_contents("database/seeders/data/content/48-bai-nguyen-ly-tan-cuoc.json"),true)!==null);'`.

ContentSeeder không xóa bài; bài cũ giữ slug được cập nhật tại chỗ, puzzle cũ không còn `puzzle_side` được
`cotuong:build-puzzles` chuyển sang `archived`.
