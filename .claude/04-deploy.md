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
php artisan optimize:clear && php artisan config:cache && php artisan route:cache && php artisan view:cache
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
