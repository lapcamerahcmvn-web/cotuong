# Deploy — hoccotuong.top (hosting AZDIGI, thư mục `hocotuong`)

> Domain `hoccotuong.top` → subdomain `hocco.lapcamerahcm.vn` → thư mục web **`hocotuong`** trên
> hosting. Repo GitHub: `https://github.com/lapcamerahcmvn-web/cotuong`. Quy trình giống
> `laravel13-shop`: đẩy code lên GitHub, SSH vào hosting pull về.

## Nội dung ship theo git (KHÔNG cần file .xqf gốc trên hosting)
- 14 bài học đã biên soạn nằm trong `database/seeders/data/content.json` (do
  `php artisan cotuong:export-content` xuất). `ContentSeeder` nạp lại trên hosting.
- File `.xqf`/`.pgn`/PDF gốc (bản quyền) **bị `.gitignore**` — chỉ dùng local để decode/biên soạn.
- Khi biên soạn thêm bài ở local → chạy `cotuong:export-content` lại → commit `content.json`.

## Lần đầu deploy (SSH vào hosting)
> Hosting trỏ document root của subdomain vào CHÍNH thư mục web (VD `hoccotuong`), không
> phải `/public`. Root `.htaccess` (đã có trong repo) lo việc rewrite vào `public/`. Vì thư
> mục web đã tồn tại (không rỗng), KHÔNG dùng `git clone` — dùng git init + fetch + reset:
```bash
cd ~/hoccotuong           # thư mục web của subdomain (đang đứng sẵn ở đây)
git init
git remote add origin https://github.com/lapcamerahcmvn-web/cotuong.git
git fetch origin
git reset --hard origin/main      # kéo toàn bộ code về (ghi đè, cẩn thận nếu có file cũ)

composer install --no-dev --optimize-autoloader
cp .env.example .env
php artisan key:generate
# Sửa .env: APP_ENV=production, APP_DEBUG=false, APP_URL=https://hoccotuong.top,
#           DB_* (theo hosting), GOOGLE_CLIENT_ID/SECRET (OAuth Google Console),
#           GOOGLE_REDIRECT_URI=https://hoccotuong.top/dang-nhap/google/callback
php artisan migrate --force
php artisan db:seed --force            # tạo admin + nạp 14 bài (AdminUserSeeder + ContentSeeder)
php artisan storage:link
php artisan config:cache && php artisan route:cache && php artisan view:cache
# PHP version của subdomain đặt 8.3+ (Laravel 13). Không cần trỏ docroot vào /public —
# root .htaccess đã tự rewrite.
```
> ⚠️ Nếu `git reset --hard` báo lỗi vì có file trùng (VD index.html mặc định), xóa file đó
> rồi chạy lại, hoặc `git clean -fd` sau khi fetch.

## Cập nhật các lần sau
```bash
cd ~/hocotuong
git fetch origin && git reset --hard origin/main
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan db:seed --class=ContentSeeder --force   # nếu content.json đổi (KHÔNG kèm namespace — shell nuốt dấu \\ thành DatabaseSeedersContentSeeder)
php artisan db:seed --class=PagesSeeder --force     # nếu pages.json đổi (intro trang giai đoạn)
php artisan optimize:clear && php artisan config:cache && php artisan route:cache && php artisan view:cache
```

## Đợt SEO/UI (từ 09/2026) — lưu ý deploy

- **`view:clear` bắt buộc** trong bước cache ở trên (`optimize:clear` đã bao gồm) — nhiều blade
  đổi (layout head, phase/series/lesson). Nếu `/so-do-trang` hiện RỖNG sau deploy: chạy
  `php artisan view:clear && php artisan db:seed --class=ContentSeeder --force` rồi
  `php artisan view:cache`. Trang này loop `LessonSeries` có `publishedLessons` — rỗng nghĩa là
  seeder chưa chạy sau khi thêm series, hoặc blade cũ còn bị cache.
- **`.env` production PHẢI có `APP_URL=https://hoccotuong.top`** — `og:image`, `canonical`,
  `asset()` (favicon/icon/OG PNG) và JSON-LD `@id` đều dựng từ đây. Sai domain ⇒ thẻ share hỏng.
  Tùy chọn: `SITE_SOCIAL_FACEBOOK=`, `SITE_SOCIAL_YOUTUBE=`, `SITE_TWITTER=@...` (JSON-LD
  Organization.sameAs + thẻ `twitter:site`).
- **Ảnh OG + favicon là file tĩnh commit sẵn** trong `public/og/`, `public/favicon.*`,
  `public/icon-*.png`, `public/apple-touch-icon.png`, `public/site.webmanifest` — KHÔNG cần build.
  Sinh lại ở LOCAL: `php tools/brand-assets/generate.php` (favicon + OG giai đoạn/trang chủ) và
  `node tools/og-image/generate.cjs` (OG 1200×630 từng bài/chuỗi **+ thumbnail vuông 320×320**
  trong `public/og/thumbs/` dùng cho ảnh nhỏ trong danh sách bài trên site). Toolchain Node/`@resvg`
  chỉ chạy LOCAL. Có bài/chuỗi mới → `node tools/og-image/generate.cjs --missing` (nhanh, chỉ sinh
  ảnh còn thiếu) rồi `python tools/og-image/optimize.py`.
- Sau deploy, ép Facebook/Zalo quét lại thẻ mới: Facebook Sharing Debugger (Scrape Again) +
  Zalo share link để cache preview.
- **Migration mới `create_pages_table`** + seeder `PagesSeeder` (nội dung intro 5 trang giai đoạn từ
  `database/seeders/data/pages.json`). Deploy lần đầu sau đợt này BẮT BUỘC `migrate --force` +
  `db:seed --class=PagesSeeder --force`, nếu không trang `/khai-cuoc`… mất phần intro + FAQ.
- **Font quân cờ** `public/fonts/xiangqi-kai.{woff2,ttf}` (subset Noto Serif TC, SIL OFL) commit sẵn —
  quân cờ hiển thị giống nhau mọi thiết bị. Sinh lại: xem `public/fonts/README.md`.
- **Toolchain LOCAL** (không lên hosting): `tools/og-image/` (Node + @resvg), `tools/brand-assets/generate.php`
  (PHP GD, dùng font Windows). `npm install` trong `tools/og-image/` chỉ để chạy local.

### Quy trình khi biên soạn thêm bài / sửa nội dung (LOCAL)
```bash
php artisan cotuong:lesson-fill <id> --file=<json> --publish   # ghi nội dung (an toàn, không đụng FEN)
php artisan cotuong:export-content                             # → content.json
php artisan cotuong:export-pages                               # → pages.json (nếu sửa intro giai đoạn)
node tools/og-image/generate.cjs --changed                     # ảnh OG bài mới/đổi thế cờ
git add database/seeders/data public/og public/fonts <code> && git commit && git push
```

## Google OAuth (để bật đăng nhập Google)
1. Google Cloud Console → tạo OAuth 2.0 Client ID (Web application).
2. Authorized redirect URI: `https://hoccotuong.top/dang-nhap/google/callback`.
3. Điền `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` vào `.env` hosting.
   (Chưa điền thì trang /dang-nhap vẫn cho admin đăng nhập bằng email/mật khẩu.)

## Tài khoản admin mặc định (ĐỔI NGAY sau deploy)
- Email `admin@cotuong.test` / mật khẩu `cotuong@2026` (từ `AdminUserSeeder`).
- Đăng nhập tại `https://hoccotuong.top/dang-nhap` → vào `/admin`.

## Lưu ý (giống laravel13-shop)
- Assets CSS/JS là file TĨNH trong `public/css`, `public/js`, `public/tinymce` — commit sẵn,
  KHÔNG cần `npm run build`.
- Nếu hosting tắt `shell_exec()`: các lệnh `cotuong:import-xqf`/`backfill-notation` (gọi node)
  sẽ KHÔNG chạy được trên hosting — nhưng KHÔNG cần, vì nội dung đã seed từ `content.json`.
  Việc decode/biên soạn luôn làm ở LOCAL rồi export.
