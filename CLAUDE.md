# Web Học Cờ Tướng & Cờ Úp — Tổng Quan Dự Án

> Website học Cờ Tướng (sau đó Cờ Úp) có bàn cờ tương tác, nội dung sinh từ kho tài liệu
> nội bộ (file `.xqf`/`.pgn`/video/PDF của "Thầy Thắng" lưu trên ổ E:\) qua pipeline
> Agent, tái sử dụng pattern kỹ thuật từ dự án chị em `laravel13-shop`.

## Môi Trường

| | Local |
|-|-------|
| URL | http://127.0.0.1:8000 (chưa setup — xem Phase 1) |
| Admin | http://127.0.0.1:8000/admin (chưa setup) |
| DB | MySQL WAMP local |
| Thư mục | `d:\wamp64\www\cotuong` |

## Stack (thực tế sau Phase 1)

Laravel 13.26 · PHP 8.5 · MySQL (DB `cotuong`) · Claude API (`laravel/ai`, default provider
`anthropic`) · Livewire 4 + Intervention Image + Spatie Sluggable (đã cài, dùng dần) ·
Google Fonts (Bricolage Grotesque + Be Vietnam Pro).

**Bàn cờ**: SVG tự viết bằng **vanilla JS** (`public/js/board.js`) — render FEN từng bước đã
tính sẵn server-side (decode.js). KHÔNG dùng `xiangqi.js`/`xiangqiboard.js` (không có trên
npm + cần jQuery); thư viện đó để dành cho tính năng "người học tự thử nước đi" sau này.

**Frontend Phase 1 dùng CSS/JS tĩnh trong `public/`** (`public/css/app.css`, `public/js/board.js`)
— KHÔNG qua Vite/Tailwind build, để site chạy ngay với `php artisan serve`. Tailwind 4/Vite 8/
TinyMCE 8 là bước nâng cấp sau (đặc biệt cần TinyMCE cho admin editor Phase 1.5).

### Chạy local
```bash
php artisan serve --host=127.0.0.1 --port=8010    # (8000/8001 hay bị server session khác chiếm)
# → http://127.0.0.1:8010
```
⚠️ **Gotcha đã gặp**: Windows cho NHIỀU process cùng LISTEN 1 port → request bị phân tán sang
server của dự án khác (shop) trả 404/500 lạ. Nếu route lạ, kiểm tra `netstat -ano | grep :80xx`
phải chỉ có ĐÚNG 1 listener; kill hết PID lạ rồi chạy lại. Dùng port riêng (8010) cho cotuong.

## Thông Tin Quan Trọng — Bản Quyền & Bảo Mật (BẮT BUỘC đọc trước khi code)

- **Toàn bộ nguồn trên ổ `E:\`** (file `.xqf`/`.pgn`/video/PDF của khóa học "Thầy Thắng" —
  tên thật khả năng cao là **Đặng Ngọc Thắng**, phát hiện từ file-level comment trong 1 file
  `.xqf`) **có bản quyền — chỉ dùng làm tài liệu nội bộ để viết lại bài học, KHÔNG public
  dưới bất kỳ hình thức nào** (không nhúng video, không dẫn link, không lộ tên sách/khóa học).
- Một phần dữ liệu trên `E:\Co Tuong\Sup tam` và `E:\Co Tuong\CCBridge Co Tuong\CBL` là
  **ván đấu Kỳ Vương Trung Quốc sưu tầm** (tên người chơi bằng tiếng Trung, vd "赵庆阁 vs
  胡荣华"), **không phải nội dung tự soạn của Thầy Thắng** — cân nhắc riêng khi dùng.
- Mọi bài học sinh từ Agent mặc định `draft`/`review` — **không tự động publish**.
- Nội dung public phải viết lại hoàn toàn bằng lời văn riêng — không chép nguyên văn
  transcript/comment gốc dù đã có sẵn lời giảng khá đầy đủ trong nhiều file `.xqf`.
- Chi tiết đầy đủ: `.claude/03-ke-hoach-trien-khai.md` mục 5.

---

## Tài Liệu Chi Tiết

- **[.claude/tien-do-va-ke-hoach.md](.claude/tien-do-va-ke-hoach.md)** — Bảng điều khiển chính:
  đã làm gì (6 chuỗi/108 bài + tính năng) & làm tiếp gì, đối chiếu cụm từ khóa SEO ← **ĐỌC ĐÂY TRƯỚC**
- **[.claude/ke-hoach-seo-tong-the-hoccotuong.md](.claude/ke-hoach-seo-tong-the-hoccotuong.md)** —
  Nghiên cứu từ khóa chi tiết + chiến lược SEO on-page/technical/content/backlink
- **[ke-hoach-xay-dung-web-hoc-co-tuong.md](ke-hoach-xay-dung-web-hoc-co-tuong.md)** — Ý tưởng
  gốc của user: schema DB, thiết kế bàn cờ Cờ Tướng/Cờ Úp, ràng buộc bảo mật/bản quyền ←
  **vẫn là nguồn ràng buộc gốc**, không thay đổi phần bàn cờ/bảo mật
- **[.claude/03-ke-hoach-trien-khai.md](.claude/03-ke-hoach-trien-khai.md)** — Kế hoạch triển
  khai đã duyệt (pivot kiến trúc pipeline khỏi giả định YouTube sang XQF/PGN-first) ←
  **ĐỌC ĐÂY TRƯỚC KHI CODE**
- [.claude/01-nguon-du-lieu.md](.claude/01-nguon-du-lieu.md) — Kiểm kê đầy đủ ổ `E:\` (số
  liệu file, cấu trúc giáo trình, phân loại theo taxonomy)
- [.claude/02-dinh-dang-xqf.md](.claude/02-dinh-dang-xqf.md) — Đặc tả kỹ thuật định dạng
  `.xqf` đã giải mã thành công (offset header, thuật toán mã hóa theo version, kết quả test)
- [.claude/memory.md](.claude/memory.md) — Quyết định kỹ thuật, tiến độ, việc tiếp theo

### Skills

- **[.claude/commands/viet-bai-co-tuong.md](.claude/commands/viet-bai-co-tuong.md)** — Skill
  viết lời giảng từng nước + bài viết cho 1 bài học (từ annotation gốc → viết lại có dấu, ghi
  qua `lesson-source`/`lesson-fill`). Dùng cho agent/người, KHÔNG cần API runtime.

### Tools

- [tools/xqf-decoder/decode.js](tools/xqf-decoder/decode.js) — Script Node.js giải mã file
  `.xqf` → JSON (title, FEN, move list, annotations). Chạy: `node decode.js <file.xqf>
  [--json] [--full]`. Xong Phase 0, đã test 6+ file mẫu đủ 4 version (0x0A/0x0C/0x0D/0x12).

---

## Trạng Thái Dự Án (2026-08-23)

### ✅ Hoàn Thành
- **Phase 0 — Spike giải mã XQF**: GO. `tools/xqf-decoder/decode.js` giải mã đủ 4 version,
  parse cây nước đi (main line, bỏ biến phụ), tính FEN từng bước. Chi tiết: `.claude/02-dinh-dang-xqf.md`.
- **Phase 1 — Nền tảng + bàn cờ + MVP** (XONG cốt lõi):
  - Project Laravel 13.26 setup xong (MySQL `cotuong`, `config/database.php` ép `engine=InnoDB`,
    `AppServiceProvider` set `defaultStringLength(191)` — fix WAMP MyISAM).
  - 5 migrations: `lesson_series`, `lessons`, `lesson_steps`, `source_assets`, `ai_generation_logs`.
    Models tương ứng (Spatie HasSlug, scopes, phase/level/game_mode labels).
  - `cotuong:import-xqf` (gọi node decode.js qua Process) — đã import **61 bài, 665 bước** từ
    15 folder "48 Bài Nguyên Lý Khai Cuộc"; **14 bài đã publish** (seeder `MvpPublishSeeder`),
    3 bài có nội dung diễn giải viết tay.
  - Bàn cờ SVG tương tác (`public/js/board.js`) + design system (`public/css/app.css`,
    bản sắc chu sa/mực/ngọc bích, 2 theme sáng-tối).
  - Frontend: home, phase (`/khai-cuoc`...), series (`/chuong-trinh/{slug}`), lesson
    (`/bai-hoc/{slug}`) — full SEO (title/meta/canonical/OG + JSON-LD Article/Course/Breadcrumb).
  - `LessonWriterAgent` + `CotuongContentService` viết xong (chờ `ANTHROPIC_API_KEY` để chạy thật).
  - Đã verify: tất cả route 200, bàn cờ render đúng, chụp màn hình OK (home + lesson).

- **Phase 1.5 — Admin panel + dọn tiêu đề** (XONG 23/08):
  - **Admin** tại `/admin` (login `/admin/login`): auth session + RBAC (`role` trên users:
    admin | bien_tap; middleware `admin` bảo vệ khu Nguồn tài liệu). Dashboard (thống kê),
    quản lý bài học (lọc/tìm, sửa, publish/ẩn, xóa), **TinyMCE self-hosted** (copy tĩnh từ shop,
    không cần Vite), sửa **caption từng nước** (KHÔNG đụng FEN), nút **✦ Sinh nội dung AI**
    (gọi `CotuongContentService`, cần API key), xem preview bàn cờ, khu **Nguồn tài liệu**
    (chỉ admin — hiện annotation gốc để đối chiếu, không public).
    - **Tài khoản admin**: `admin@cotuong.test` / `cotuong@2026` (seed `AdminUserSeeder`).
  - **Dọn tiêu đề**: `config/xiangqi-terms.php` (từ điển viết tắt + không dấu→có dấu) +
    `cotuong:clean-titles` — đã chuẩn hoá 61 tiêu đề (VD "Bcdt Ngu Cuu Phao Qhx Doi Bpm" →
    "Bố Cục Định Thức Ngũ Cửu Pháo Quá Hà Xe đối Bình Phong Mã") + reslug SEO.

- **Nội dung bài học — quy trình LOCAL (không cần API runtime)**: annotation gốc của thầy đã
  giải mã sẵn trong `source_assets.decoded_moves_json`. Thay vì gọi `laravel/ai` lúc chạy, dùng
  agent/người viết trực tiếp theo skill `.claude/commands/viet-bai-co-tuong.md`:
  1. `php artisan cotuong:lesson-source {id} --out=<file.json>` — xuất meta + từng bước +
     annotation gốc để đọc.
  2. Viết file JSON kết quả (content/summary/seo + caption theo step_id).
  3. `php artisan cotuong:lesson-fill {id} --file=<file.json> [--publish]` — ghi AN TOÀN (chỉ
     trường văn bản + caption; KHÔNG đụng fen/move).
  Nút "✦ Sinh nội dung AI" trong admin (gọi `CotuongContentService`) vẫn dùng được khi CÓ
  `ANTHROPIC_API_KEY` — là con đường thay thế, không bắt buộc.

### 🔄 Đang Làm / Việc Tiếp Theo
1. **Nâng cấp Tailwind 4 + Vite 8** (hiện CSS/JS tĩnh) — không bắt buộc.
2. Mở rộng `config/xiangqi-terms.php` cho các cụm còn sót (Thực Chốt, một vài mã trận hiếm).
3. Viết nội dung cho các bài draft còn lại (dùng quy trình lesson-source → lesson-fill).
4. Các phase tiếp theo (PGN, video Whisper, PDF/OCR, Cờ Úp) — xem `.claude/03-ke-hoach-trien-khai.md`.

---

## Lệnh Hay Dùng

```bash
# Dev server (dùng port riêng 8010 — xem gotcha multi-listen ở trên)
php artisan serve --host=127.0.0.1 --port=8010

# Import bài học từ .xqf (giải mã qua node decode.js)
php artisan cotuong:import-xqf "storage/app/private/cotuong-sources/khai-cuoc/48-bai-nguyen-ly" \
  --series="48 Bài Nguyên Lý Khai Cuộc" --phase=khai-cuoc --level=co-ban
php artisan cotuong:import-xqf "<file-hoặc-thư-mục>" --dry-run   # xem trước không ghi DB

# Publish batch MVP (14 bài + nội dung 3 bài chủ lực) + tạo admin user
php artisan db:seed --class=MvpPublishSeeder --force
php artisan db:seed --class=AdminUserSeeder --force   # admin@cotuong.test / cotuong@2026

# Dọn tiêu đề (mở viết tắt + thêm dấu tiếng Việt) — --reslug chỉ dùng TRƯỚC khi launch
php artisan cotuong:clean-titles --dry-run
php artisan cotuong:clean-titles --reslug

# Viết nội dung bài học (local, theo skill .claude/commands/viet-bai-co-tuong.md)
php artisan cotuong:lesson-source {id} --out=lesson.json     # xuất nguồn + annotation gốc
php artisan cotuong:lesson-fill {id} --file=out.json --publish  # ghi content+caption (an toàn)

# Test decode 1 file .xqf (script Node độc lập)
cd tools/xqf-decoder && node decode.js "<path.xqf>" --json --full
node test-encrypted.js    # regression bộ mẫu 0x0C/0x0D/0x12

# DB
php artisan migrate:fresh --force        # ⚠️ xóa sạch — chạy lại import + seed sau đó
```
