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

**Frontend (từ 10/2026): Vite 8 + Tailwind 4** — design system ở `resources/css/*.css` (token
màu bản sắc chu sa/mực/giấy/ngọc trên `:root` + `[data-theme=dark]`), JS dùng chung vanilla ở
`resources/js/` (bàn cờ + luyện tập nạp động khi trang cần). `public/build` **được commit** (hosting
không build) — xem `.claude/04-deploy.md`. **Admin KHÔNG dùng Vite**: vẫn nạp `public/css/app.css`
+ `admin.css` + `public/js/board.js` tĩnh → không xoá/đổi tên các file này. `board.js` dùng chung
cho site và admin (icon: sprite SVG nếu trang có, không thì ký tự).

**Gamification + Luyện tập** — xem `.claude/redesign-gamification.md` (kiến trúc, quy tắc XP, lệnh).

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

## Trạng Thái Dự Án (2026-10-01)

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

- **Redesign + Lộ trình + Gamification + Luyện tập** (XONG 01/10/2026, nhánh `redesign`):
  giao diện mới Vite/Tailwind, `/lo-trinh`, `/luyen-tap` (thế cờ hôm nay, 60 giây, 3 mạng, chủ đề,
  lỗi sai, kiểm tra trình độ), XP/cấp/chuỗi ngày/huy hiệu/`/xep-hang`, hồ sơ + cài đặt mới.
  Chi tiết: `.claude/redesign-gamification.md`.
- **Chơi với máy (engine Web Worker) + Thách đấu bạn bè qua link (polling) + Chia sẻ kết quả** (02/10/2026),
  **hỗ trợ cả Cờ úp** (quân úp giữ bí mật trên server, máy không nhìn trộm).
- **Lịch sử ván đấu** `/tai-khoan/lich-su-van-dau` (02/10/2026): tự lưu mọi ván (máy + bạn), xem lại từng nước,
  chép vào Thư viện để sửa / thêm nhánh biến. Chi tiết: Đợt 6 trong `.claude/redesign-gamification.md`.
- **Phân tích ván bằng máy** (chấm từng nước, biểu đồ ưu thế, độ chính xác, thử lại nước sai) + **chơi tiếp với
  máy từ thế bất kỳ** + **link chia sẻ ván** `/van-co/{token}` (02/10/2026) — Đợt 7 cùng file.
- **Thử thách tuần + giải thưởng bảng xếp hạng tuần** `/thu-thach-tuan` (02/10/2026) — Đợt 8 cùng file.
- **Hồ sơ kỳ thủ công khai** `/ky-thu/{id}-{slug}` + **theo dõi bạn bè** `/ban-be` + PWA shortcuts (02/10/2026) — Đợt 9.
- **Nhận diện bàn cờ từ ảnh** `/nhan-dien-ban-co` (ảnh chụp thật / màn hình phần mềm khác, cả cờ úp; chạy trên trình duyệt, AI tuỳ chọn) — Đợt 10.
- **Sai lầm của tôi** `/luyen-tap/sai-lam-cua-toi` — luyện lại nước sai từ ván đã phân tích, lặp ngắt quãng — Đợt 11.
- **Máy đánh đúng lý thuyết** — cờ úp không nhìn trộm quân úp + nguyên lý khai cuộc (không vội vật Pháo giả); cờ tướng có book khai cuộc `resources/js/engine/book.js`, phân tích ghi "Nước sách" — Đợt 13.
- **Luyện tập nhận mọi đường chiếu hết** — nước khác sách được bộ giải chứng minh thắng thì tính đúng, máy đỡ dai nhất — Đợt 14.
- **Chuyên đề Sát Cục Liên Hoàn 1-10 Nước** (07/10/2026, phase tàn cuộc, 1.176 bài) + bài viết sơ đồ tư duy "Phương pháp tư duy giải bài tập sát cục" — FEN trích từ font cờ trong PDF, lời giải máy chứng minh. Quy trình: `tools/sat-cuc-lien-hoan/README.md`. Deploy cần thêm `db:seed --class=MindmapSeeder --force`.
- **Kiểm định thế cờ (Admin) + bộ giải nước êm + book khai cuộc 72 dòng/20 nước** — Đợt 15 (`.claude/puzzle-audit.md`, `.claude/opening-book.md`).
- **Giao diện bàn cờ & âm thanh** `/giao-dien-ban-co` — 8 màu bàn, chữ Hán/Việt, quân phẳng/3D, số cột, âm lượng/bộ âm/báo chiếu/tích tắc/giọng đọc — Đợt 19.

### 🔄 Đang Làm / Việc Tiếp Theo
1. Merge nhánh `redesign` → deploy theo `.claude/04-deploy.md` (có bước `cotuong:build-puzzles`).
2. Mở rộng `config/xiangqi-terms.php` cho các cụm còn sót (Thực Chốt, một vài mã trận hiếm).
3. Viết nội dung cho các bài draft còn lại (dùng quy trình lesson-source → lesson-fill).
4. Các phase tiếp theo (PGN, video Whisper, PDF/OCR, Cờ Úp) — xem `.claude/03-ke-hoach-trien-khai.md`.

---

## Lệnh Hay Dùng

```bash
# Dev server (dùng port riêng 8010 — xem gotcha multi-listen ở trên)
php artisan serve --host=127.0.0.1 --port=8010
npm run dev            # hoặc npm run build trước khi commit (public/build được commit)

# Kho thế cờ luyện tập (chạy lại sau mỗi lần nạp nội dung)
php artisan cotuong:build-puzzles [--dry-run]
php artisan test       # 23 test gamification/luyện tập/chơi/cờ úp (sqlite memory)
node tools/engine-test.mjs   # BẮT BUỘC sau khi sửa engine máy (perft, luật cờ úp, không bỏ quân treo, khai cuộc cờ úp, book, bộ giải chiếu hết)

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
