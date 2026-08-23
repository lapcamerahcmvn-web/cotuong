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
```bash
cd ~/   # tới thư mục chứa web
git clone https://github.com/lapcamerahcmvn-web/cotuong.git hocotuong
cd hocotuong
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
# Document root của subdomain phải trỏ vào .../hocotuong/public
```

## Cập nhật các lần sau
```bash
cd ~/hocotuong
git fetch origin && git reset --hard origin/main
composer install --no-dev --optimize-autoloader
php artisan migrate --force
php artisan db:seed --class=Database\\Seeders\\ContentSeeder --force   # nếu content.json đổi
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
