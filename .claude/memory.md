# Memory — Web Học Cờ Tướng & Cờ Úp

> Nhật ký quyết định kỹ thuật, phát hiện quan trọng, và trạng thái dự án theo thời gian.
> Ghi theo thứ tự mới nhất lên trên. Xem `CLAUDE.md` cho trạng thái tóm tắt hiện tại.

---

## 2026-08-23 (khuya) — FIX ký hiệu nước đi cờ tướng (user báo lỗi trang chủ)

User phát hiện caption trang chủ sai: "Mã hai tiến ba" cho 1 con Mã thực ra ở cột 8 (đúng phải
"Mã 8 tiến 7"). Nguyên nhân: hero trang chủ hardcode tay + tư duy kiểu cờ vua. Cờ tướng đếm cột
1→9 TỪ PHẢI SANG TRÁI theo TỪNG BÊN.

**Đã xác minh quy ước với sách PDF ổ E** (`E:\Co Tuong\Sup tam\PDF\Phuong phap sat chieu - pdf.pdf`
— text-based, pdftotext đọc được): format chuẩn "Pháo 3 bình 5", "Mã 8 tiến 7", "Xe 2 thoái 1",
"Sĩ 5 thoái 6". Quân đi thẳng cột (Xe/Pháo/Tốt/Tướng) dùng SỐ BƯỚC cho tiến/thoái; quân đổi cột
(Mã/Tượng/Sĩ) dùng CỘT ĐÍCH; bình dùng cột đích; 2 quân cùng cột dùng trước/sau.

**Đã implement `moveNotationVi()` trong `tools/xqf-decoder/decode.js`** (thuật toán: Đỏ file=9−x,
Đen file=x+1; tiến/thoái theo hướng mỗi bên; straight→số bước, non-straight→cột đích; trước/sau khi
trùng cột). Validate khớp khai cuộc kinh điển: nước 1 "Pháo 2 bình 5", nước 2 "Mã 2 tiến 3" (đúng
ví dụ user nêu). decode.js xuất `wxf_vi` mỗi nước.

- `ImportXqf` lưu vào `move_notation_wxf`. Command mới `cotuong:backfill-notation` điền lại cho DB
  cũ (đã chạy: 665 nước) — CHỈ cột move_notation_wxf, không đụng fen/caption.
- Bàn cờ (`board.js` + component) hiển thị `wxf` ở move list + caption box.
- Trang chủ: BỎ hero hardcode, `HomeController` lấy nước đi THẬT từ 1 bài publish bắt đầu từ thế
  chuẩn → ký hiệu luôn đúng, không hardcode tay nữa.
- `cotuong:lesson-source` xuất kèm `move_vi`; skill dặn agent DÙNG `move_vi` nguyên văn, KHÔNG tự
  suy cột từ toạ độ.

**Bài học rút ra**: KHÔNG bao giờ tự tính ký hiệu cờ tướng từ toạ độ bằng tay/tư duy cờ vua —
luôn dùng `moveNotationVi()` (decode.js) hoặc `move_notation_wxf` (DB).

---

## 2026-08-23 (tối muộn) — Nội dung bài học: quy trình LOCAL (không cần API runtime)

User quyết định: KHÔNG dùng `ANTHROPIC_API_KEY` runtime (làm local). Thay vào đó dùng
agent/người viết nội dung trực tiếp từ annotation gốc của thầy (đã giải mã sẵn trong
`source_assets.decoded_moves_json`).

**Đã xây**:
- Skill `.claude/commands/viet-bai-co-tuong.md` — quy tắc viết (bản quyền/văn phong/cấu
  trúc/an toàn) + quy trình 3 bước.
- Command `cotuong:lesson-source {id} --out=` — xuất meta + từng bước (side/iccs/quân/FEN) +
  annotation gốc ra JSON để đọc.
- Command `cotuong:lesson-fill {id} --file= [--publish]` — ghi content/summary/seo + caption
  (theo step_id) TỪ FILE JSON, whitelist trường, KHÔNG đụng fen/move (đã test round-trip:
  caption lưu OK, FEN nguyên vẹn).
- Phát hiện: annotation của thầy giàu ở các nước quan trọng (3-15 nước/bài trong 14 bài
  publish), là commentary chuyên nghiệp giá trị — viết lại từ đây chính xác hơn tự bịa.
  File_level_comment lộ tên thế trận thật (VD bài 16 = "Trung Pháo Hoành Xe Bàn Đầu Mã đối
  Phản Cung Mã") → nội dung tay tổng quát trước đó kém chính xác hơn.

**Đang chạy**: 1 agent general-purpose viết nội dung + caption cho 14 bài publish (id 16,34,
11,37,56,45,40,15,52,12,19,30,53,60). Bài 16 từng bị ghi content "Test" khi round-trip →
agent viết lại.

**Lưu ý**: nút "✦ Sinh nội dung AI" trong admin (CotuongContentService → laravel/ai) vẫn là
con đường thay thế khi có API key — không xoá.

---

## 2026-08-23 (tối) — Phase 1.5: Admin panel + dọn tiêu đề

**Admin** (`/admin`, login `/admin/login`): auth session Laravel + RBAC tối giản (cột `role`
trên users: admin | bien_tap; middleware alias `admin` = `EnsureAdmin` bảo vệ khu Nguồn tài
liệu bản quyền). Controllers `App\Http\Controllers\Admin\*` (Auth, Dashboard, Lesson, SourceAsset).
Views `resources/views/admin/*` + `public/css/admin.css` (dùng chung token app.css). **TinyMCE
self-hosted** copy tĩnh từ shop sang `public/tinymce/` (13MB, KHÔNG cần Vite build). Editor sửa
được caption từng nước — logic update CHỈ ghi cột `caption`, KHÔNG đụng fen/move (cơ chế an toàn).
Nút "✦ Sinh nội dung AI" gọi `CotuongContentService->generateLesson()` với annotation gốc làm
ngữ cảnh (cần `ANTHROPIC_API_KEY`). Seed admin: `admin@cotuong.test` / `cotuong@2026`.

**Gotcha**: model `Lesson` có `getRouteKeyName()='slug'` (cho URL frontend đẹp) → route admin
phải bind theo id rõ ràng `{lesson:id}` nếu không sẽ 404 khi truyền id.

**Dọn tiêu đề** (part 3): `config/xiangqi-terms.php` (map viết tắt BCDT/QHX/BPM... + cụm không
dấu→có dấu, longest-first) + command `cotuong:clean-titles [--reslug] [--dry-run]`. Đã chuẩn hoá
61 tiêu đề: "Bcdt Ngu Cuu Phao Qhx Doi Bpm" → "Bố Cục Định Thức Ngũ Cửu Pháo Quá Hà Xe đối Bình
Phong Mã Bàn Đầu Xe", reslug SEO. Command giữ prefix "Bài N:", chỉ map cụm CHẮC CHẮN (cụm lạ để
nguyên không dấu — thà thiếu dấu còn hơn sai nghĩa). Còn sót vài cụm hiếm (Thực Chốt...) — mở rộng
config sau nếu cần.

**Lưu ý test**: curl trên Git Bash mã hoá sai chuỗi tiếng Việt khi POST form (lỗi charset giả) —
KHÔNG phải bug app (seeder + DB utf8mb4 ghi tiếng Việt hoàn hảo). Test update qua trình duyệt thật.

---

## 2026-08-23 (chiều) — Phase 1: nền tảng Laravel + bàn cờ + MVP + frontend SEO

Làm xong cốt lõi Phase 1 trong 1 phiên. Kết quả chạy thật: `php artisan serve --port=8010`,
mọi route 200, bàn cờ render đúng (đã chụp màn hình home + lesson).

**Đã dựng**: project Laravel 13.26; 5 migrations + models; `cotuong:import-xqf` (import 61 bài
/665 bước từ 15 folder khai cuộc); `MvpPublishSeeder` (14 bài publish, 3 bài có nội dung);
bàn cờ SVG vanilla JS + design system CSS (2 theme); frontend home/phase/series/lesson với
đầy đủ SEO + JSON-LD; `LessonWriterAgent` + `CotuongContentService` (chờ API key).

**Quyết định lệch khỏi plan gốc (đều có lý do, đã ghi trong CLAUDE.md)**:
1. **Bàn cờ vanilla JS tự viết**, KHÔNG dùng xiangqi.js/xiangqiboard.js — 2 lib này không có
   trên npm + cần jQuery. decode.js đã tính sẵn FEN từng bước nên browser chỉ cần render FEN,
   không cần engine. xiangqi.js để dành cho tính năng "tự thử nước đi" sau.
2. **CSS/JS tĩnh trong `public/`**, KHÔNG qua Vite/Tailwind — để site chạy ngay không cần
   build (Windows Defender làm mọi thao tác npm/composer rất chậm). Tailwind/Vite/TinyMCE là
   bước sau, đặc biệt TinyMCE cần cho admin editor Phase 1.5.
3. **Bỏ bảng `categories`** trong plan → dùng cột `phase` (enum khai-cuoc/trung-cuoc/tan-cuoc/
   nhap-mon) trên lessons + series. Taxonomy cố định nhỏ, không cần CRUD riêng.
4. **`decode.js` nâng cấp Phase 0→1**: thêm parse cây nước đi đệ quy (main line, bỏ biến phụ —
   trước đó replay tuyến tính bị "trôi" vị trí do biến phụ) + tính `fen_after`/`moved_piece`/
   `captured_piece` từng bước. 0 drift trên các file test.

**Gotchas Windows/WAMP đã gặp & fix (QUAN TRỌNG cho phiên sau)**:
- **MyISAM**: WAMP mặc định MyISAM (key 1000 byte) → migration khung Laravel (users/jobs) vỡ
  index utf8mb4. Fix: `config/database.php` mysql `'engine' => 'InnoDB'` + `AppServiceProvider`
  `Schema::defaultStringLength(191)`. (Migration riêng vẫn khai báo `$table->engine='InnoDB'`.)
- **Multi-listen 1 port**: Windows cho NHIỀU `php artisan serve` cùng LISTEN 127.0.0.1:8000 →
  request phân tán sang server dự án khác (shop) trả 404/500 khó hiểu. Luôn kiểm
  `netstat -ano | grep :80xx` chỉ có 1 listener; cotuong dùng port riêng **8010**.
- **Blade + `@media`/JSON-LD**: `@media (...)` trong `<style>` inline và `@if`/`@type`/`@context`
  trong `<script ld+json>` bị Blade hiểu nhầm là directive → lỗi "unexpected end of file expecting
  endif". Fix: media query để trong `public/css/app.css` (không qua Blade); JSON-LD build bằng
  PHP array + `json_encode(..., JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES)` thay vì viết JSON
  thô có `@` trong Blade.
- **Path dài**: nhiều file nguồn có path/tiêu đề rất dài → `external_ref` VARCHAR(500),
  `source_xqf_path` 500, `title` 255 (không dùng mặc định 191).

**Phát hiện nội dung**: nhiều file `.xqf` có annotation là lời giảng viết tay dài của thầy
(lưu nội bộ trong `source_assets.decoded_moves_json`). Phase 1 CHƯA đổ vào caption public (bản
quyền — phải để Agent viết lại). Hiện caption trống → bàn cờ vẫn đi từng nước, chỉ chưa có
lời giảng mỗi nước cho tới khi chạy Agent (cần `ANTHROPIC_API_KEY`).

---

## 2026-08-23 — Khởi tạo dự án + Phase 0 (spike giải mã XQF)

**Bối cảnh**: User đã có sẵn `ke-hoach-xay-dung-web-hoc-co-tuong.md` (ý tưởng ban đầu),
yêu cầu lập kế hoạch chi tiết và cho biết toàn bộ "tài liệu video" nằm trên ổ `E:\`.

**Phát hiện #1 — không có YouTube**: Khảo sát ổ `E:\` cho thấy không có playlist YouTube
nào như file kế hoạch gốc giả định. Thay vào đó là kho file local đã được tác giả "Thầy
Thắng" tự phân loại: 2.429 `.xqf` + 1.427 `.pgn` + 152 video + ~56 PDF. → Pivot kiến trúc
pipeline sang XQF/PGN-first (xem `.claude/03-ke-hoach-trien-khai.md`).

**Quyết định kiến trúc** (user chọn qua AskUserQuestion, coi là chốt):
1. XQF/PGN là nguồn nước đi/FEN chính (không phải video transcript).
2. Taxonomy bám giáo trình có sẵn trên `E:\` (48 Bài Khai Cuộc, Đội Hình theo quân...).
3. Project Laravel mới sạch trong `cotuong/`, không fork `laravel13-shop`.
4. MVP Phase 1: 15 bài đầu "48 Bài Nguyên Lý Khai Cuộc".

**Phase 0 — spike giải mã `.xqf`**: chạy xong, kết quả **GO**.
- Format `.xqf` version 1.0 (byte 0x0A) có đặc tả công khai chính thức (xqbase/eleeye),
  KHÔNG mã hóa.
- Phát hiện qua sampling: corpus thực tế có nhiều version khác nhau (0x0A ~49%, 0x12
  ~41%, 0x0D ~7%, 0x0C ~2%) — phần lớn phía sau CÓ mã hóa, không có đặc tả chính thức
  công khai nhưng thuật toán đã reverse-engineer ổn định trong cộng đồng (nhiều repo độc
  lập cho cùng 1 kết quả) — tham khảo chính: `Velithia/JieqiBox` (`src/utils/xqf.ts`).
- Viết `tools/xqf-decoder/decode.js` (Node.js, không phụ thuộc Laravel), port thuật toán
  từ JieqiBox. Test 6+ file thật đủ 4 version: **piece/FEN decode đúng 100%**, move list
  hợp lệ mọi trường hợp. Annotation (lời giảng gắn theo thế cờ/nước đi) đọc đúng ở version
  0x0A/0x0C/0x12; có lỗi cục bộ (comment-length garbage) ở 1 mẫu version 0x0D — không chặn
  vì move/FEN không bị ảnh hưởng, chỉ mất phần văn bản bổ sung. Chi tiết đầy đủ:
  `.claude/02-dinh-dang-xqf.md`.

**Phát hiện #2 — file `.xqf` đã có sẵn lời giảng viết tay**: Nhiều file (đặc biệt các bài
"tổng quan"/"khai lược") có `file_level_comment` là đoạn văn dài tiếng Việt (không dấu) —
đây chính là giáo án gốc của thầy, không phải chỉ có nước đi trần trụi. Điều này thay đổi
vai trò của Agent ở Phase 1: từ "viết mới hoàn toàn từ move list" → "viết lại/mở rộng nội
dung giáo án gốc đã có" — vẫn phải viết lại bằng lời văn riêng theo đúng ràng buộc bản
quyền, nhưng có tài liệu tham khảo tốt hơn nhiều so với dự tính ban đầu.

**Phát hiện #3 — lộ tên thật tác giả**: 1 file comment có dòng "DANG NGOC THANH" — khả
năng cao là tên thật đầy đủ của "Thầy Thắng" (Đặng Ngọc Thắng). Ghi nhận nội bộ, KHÔNG
đưa vào nội dung public theo đúng ràng buộc bảo mật.

**Phát hiện #4 — không phải mọi file `.xqf` đều là nội dung gốc của thầy**: Một số file
`.xqf` trong `E:\Co Tuong\Sup tam\` và `E:\Co Tuong\CCBridge Co Tuong\CBL\` khi giải mã ra
là **ván đấu Kỳ Vương Trung Quốc sưu tầm** (tên người chơi tiếng Trung, giải đấu thật, vd
"全国象棋团体赛" 1983). Đây là dữ liệu sưu tầm/tải về, không phải giáo án tự soạn — cần cẩn
thận khi gắn nhãn `verified_authorship` trong `source_assets`, không mặc định coi mọi
`.xqf` trên ổ `E:\` là "của Thầy Thắng".

**Kết quả trong repo sau phiên làm việc này**:
- `CLAUDE.md` (entry point), `.claude/01-nguon-du-lieu.md`, `.claude/02-dinh-dang-xqf.md`,
  `.claude/03-ke-hoach-trien-khai.md` (copy kế hoạch đã duyệt), `.claude/memory.md` (file
  này).
- `tools/xqf-decoder/decode.js` + `test-encrypted.js` + `package.json` (dep: `iconv-lite`).

**Việc tiếp theo**: Phase 1 — setup Laravel project thật (`composer create-project`),
schema DB, bàn cờ v1, artisan `cotuong:import-xqf`, `LessonWriterAgent`, MVP 15 bài. Xem
chi tiết từng bước ở `.claude/03-ke-hoach-trien-khai.md` mục 4 Phase 1.

**Việc còn treo (không chặn Phase 1)**:
- Xác minh nguồn gốc `.cbl/.ccw/.cbr/.cbs` (~4.254 file) — chưa mở thử bằng phần mềm gốc.
- Điều tra sâu lỗi comment-length ở dải version 11-15 (ảnh hưởng nhỏ, không chặn).
- 16 PDF trong `E:\sach-co-tuong\` chưa test xem text-based hay scan ảnh (để dành Phase 4).
