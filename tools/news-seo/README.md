# Bài viết "Kiến thức cờ tướng" (SEO)

Bài Tin tức dạng evergreen, mỗi bài nhắm 1 cụm từ khoá (xem `.claude/ke-hoach-seo-tong-the-hoccotuong.md`)
và liên kết vào bài học / chương trình / trang chức năng. Nguồn: `posts/*.cjs` (1 file = 1 bài).

```bash
node tools/news-seo/build.cjs --check     # kiểm: link bài học/chuyên đề/chức năng/bài viết có thật, seo_title ≤65,
                                          #       seo_description 120–160, ≥900 chữ, có mục "Câu hỏi thường gặp"
node tools/news-seo/build.cjs             # ghi database/seeders/data/posts.json + ảnh public/og/posts, og/thumbs/posts
python tools/og-image/optimize.py public/og/posts public/og/thumbs/posts
php artisan db:seed --class=PostSeeder --force
```

- Helper trong bài: `h.L(slug)` bài học, `h.T('tên bài')` bài học theo tên, `h.S(slug)` chương trình,
  `h.P(phase)` trang giai đoạn, `h.F('/luyen-tap/...')` trang chức năng, `h.N(slug)` bài viết khác,
  `h.B(slug)` nhúng bàn cờ của bài học, `h.FEN(fen, chú thích)` bàn cờ tĩnh.
- Link viết tương đối (`/bai-hoc/...`) để chạy cả local lẫn hosting. Trang bài học tự hiện "Bài viết liên quan"
  với bài viết có link tới nó (khớp `/bai-hoc/{slug}"` hoặc `lesson="{slug}"`, rồi tới chương trình/giai đoạn).
- Mục `<h2>Câu hỏi thường gặp</h2>` + các cặp `<h3>hỏi</h3><p>đáp</p>` → schema FAQPage tự động; ≥3 `<h2>` → mục lục.
- `updated_at` trong posts.json chỉ đổi khi nội dung bài đổi → PostSeeder chỉ ghi đè đúng bài đã sửa.
- Bài trong posts.json không có file ở `posts/` (bài tin tức viết qua Admin) được giữ nguyên.
- Nội dung tự viết: kiến thức cờ phổ thông + mô tả chức năng web. KHÔNG dùng/nhắc nguồn có bản quyền trên ổ E:.
