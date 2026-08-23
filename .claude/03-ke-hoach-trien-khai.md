# Kế Hoạch Triển Khai: Web Học Cờ Tướng & Cờ Úp

> Kế hoạch đã được user duyệt qua Claude Code Plan Mode ngày 23/08/2026, lưu lại đây để
> không phụ thuộc vào thư mục plan tạm của máy (`~/.claude/plans/`). **Phase 0 đã chạy
> xong (GO — xem `.claude/02-dinh-dang-xqf.md`)**, các mục dưới đây giữ nguyên nội dung đã
> duyệt; cập nhật tiến độ theo dõi tại `.claude/memory.md` và `CLAUDE.md`.

## Context

Người dùng đã soạn sẵn 1 file ý tưởng (`ke-hoach-xay-dung-web-hoc-co-tuong.md`) mô tả việc
xây web học Cờ Tướng (sau đó Cờ Úp) tái sử dụng pattern từ dự án chị em `laravel13-shop`.
File đó giả định nguồn tri thức chính là **transcript giọng nói từ playlist YouTube riêng
tư**, với Agent tự suy đoán chuỗi nước đi từ lời giảng.

Khi khảo sát thực tế ổ `E:\` (nơi user lưu toàn bộ "tài liệu video"), phát hiện quan
trọng: **không có YouTube nào cả**. Thay vào đó là một kho tài liệu local đã được chính
tác giả ("Thầy Thắng") tự phân loại rất công phu theo giáo trình, gồm:

- **2.429 file `.xqf`** (game record nhị phân, định dạng "Xiangqi Studio") — có thể giải
  mã bằng **script code, chính xác gần tuyệt đối**, không cần AI đoán nước đi
- **1.427 file `.pgn`** biến thể Trung Quốc (GBK-encoded, ký hiệu Hán tự) — cũng giải mã
  bằng code, dùng đối chiếu chéo với XQF
- **152 video `.mp4`/`.avi`** không phụ đề — chỉ hữu ích làm ngữ cảnh bổ sung
- **~56 PDF** sách/mindmap — nhiều file dung lượng lớn, khả năng cao là ảnh scan cần OCR
- Thư mục đã tự phân loại sẵn: 48 Bài Nguyên Lý Khai Cuộc, 48 Bài Nguyên Lý Tàn Cuộc, 13
  Đội Hình theo quân, Sát Chiêu Thực Dụng, Cờ Tàn Nâng Cao theo quân
- **Không có tài liệu nào riêng cho Cờ Úp** — mảng này sẽ phải tự biên soạn nội dung

Vì XQF/PGN là dữ liệu có cấu trúc, giải mã được bằng code, đây là nguồn **đáng tin cậy
hơn nhiều** so với việc để Agent nghe transcript rồi tự đoán nước đi. Toàn bộ kiến trúc
pipeline trong plan này **pivot khỏi file gốc**: tách bạch cứng nguồn nước đi (script
decode, không qua LLM) khỏi nguồn nội dung diễn giải (Agent viết lời giảng).

Người dùng đã xác nhận (qua AskUserQuestion) 4 quyết định kiến trúc dưới đây — coi là
**đã chốt, không hỏi lại**:
1. XQF/PGN là nguồn nước đi/FEN chính; video/PDF chỉ dùng làm ngữ cảnh viết lời giảng.
2. Taxonomy bám theo đúng giáo trình có sẵn trên ổ E:\ (không tự nghĩ lại).
3. Tạo project Laravel **mới sạch** trong `cotuong/`, chỉ port ý tưởng/pattern (không fork
   nguyên code bán hàng).
4. MVP giai đoạn 1 nhắm **10-15 bài học** đầu tiên (chọn 15 bài đầu "48 Bài Nguyên Lý
   Khai Cuộc") để hoàn thiện trọn vẹn pipeline trước khi nhân rộng.

File `ke-hoach-xay-dung-web-hoc-co-tuong.md` vẫn là nguồn ràng buộc gốc cho phần **bảo
mật/bản quyền** và **thiết kế bàn cờ** — plan này **giữ nguyên** các phần đó, chỉ thay đổi
kiến trúc pipeline khai thác nguồn.

---

## 0. Điểm Pivot Cốt Lõi

```
NGUỒN NƯỚC ĐI (deterministic — KHÔNG qua LLM)
  .xqf / .pgn  →  script decode (Node, ngoài Laravel)  →  move list (WXF+ICCS) + FEN từng bước
                                          │
                                          ▼
NGUỒN NGỮ CẢNH (tùy chọn, chỉ để viết lời giảng)
  video transcript (Whisper) / PDF text (OCR nếu cần) / annotation có sẵn trong .xqf
                                          │
                                          ▼
        Agent Claude (App\Ai\Agents\LessonWriterAgent)
        — nhận move/FEN đã chốt (read-only) + ngữ cảnh
        — CHỈ sinh: title/summary/content/seo_*/caption từng bước
        — KHÔNG BAO GIỜ được tạo/sửa move hay FEN
                                          │
                                          ▼
              status=draft/review → admin duyệt thủ công → published
```

Cơ chế an toàn: dữ liệu "đáng tin" (từ decoder) và dữ liệu "AI sinh" (văn bản) nằm ở 2 cột
khác nhau trong `lesson_steps` (`fen`/`move_notation_*` vs `caption`) — service ghi caption
theo `step_order` **không được đụng vào** cột move/FEN.

> **Cập nhật sau Phase 0**: nhiều file `.xqf` (đặc biệt version 0x0A không mã hóa) đã có
> sẵn **lời giảng viết tay của Thầy Thắng** gắn kèm thế cờ (file-level comment hoặc
> per-move annotation), đọc được trực tiếp qua `tools/xqf-decoder/decode.js`. Nhánh "nguồn
> ngữ cảnh" ở Phase 1 nên ưu tiên dùng annotation có sẵn trong chính file `.xqf` trước khi
> cần tới video/PDF — Agent lúc này thiên về "viết lại/mở rộng" nội dung đã có hơn là "viết
> mới hoàn toàn từ move list".

---

## 1. Schema DB

Mọi migration mới **bắt buộc** `$table->engine = 'InnoDB';` ngay sau `Schema::create(...)`
— WAMP MySQL local default là MyISAM.

**`lesson_series`** (bảng mới, ánh xạ các cụm giáo trình có sẵn): `name`, `slug`,
`game_mode`, `description`, `planned_total`, `source_folder_ref` (nội bộ, không public).

**`lessons`**: `category_id`, `series_id`, `order_in_series`, `game_mode` (co-tuong|co-up),
`title`, `slug`, `level`, `source_type` (xqf|pgn|pdf|video_local|manual|mixed),
`source_xqf_path`/`source_pgn_path` (nội bộ), `summary`, `content` (**HTML**, tái dùng
TinyMCE editor pattern), `status` (draft|review|needs_fix|published), `decode_confidence`
(high|medium|low), `decode_warnings` (json), `thumbnail`, `seo_title`, `seo_description`,
`published_at`.

**`lesson_steps`**: `lesson_id`, `step_order`, `fen`, `move_notation_wxf`,
`move_notation_iccs`, `move_side`, `caption` (Agent viết), `is_flip_reveal` (Cờ Úp),
`highlight_squares` (json), `raw_source_move` (debug/truy vết). Unique
`[lesson_id, step_order]`.

**`source_assets`**: `type` (xqf|pgn|video_local|pdf|cbl|cbr|ccw|cbs), `external_ref`
(path tương đối trong storage private), `original_filename`, `file_hash` (dedupe),
`verified_authorship` (unknown|author_original|bundled_software_default|collected_database
— **mặc định `unknown` chặn cứng việc xử lý**), `raw_transcript`, `decoded_moves_json`,
`processed`, `linked_lesson_id`.

> Toàn bộ 4 bảng trên: không route public, không sitemap, không API công khai, không index.

---

## 2. Pipeline Khai Thác Nguồn

### 2.1. Lưu trữ nguồn cục bộ trong project
Copy tập con cần dùng từ `E:\` vào `storage/app/private/cotuong-sources/`. Thêm
`storage/app/private/cotuong-sources/` vào `.gitignore` ngay từ đầu.

### 2.2. XQF decode (`tools/xqf-decoder/`, Node.js CLI độc lập)
✅ **Xong Phase 0** — xem `.claude/02-dinh-dang-xqf.md` cho đặc tả đầy đủ + kết quả test.
Dùng `xiangqi.js` để validate lại từng nước đi trước khi ghi DB — nước đi không hợp lệ →
`decode_confidence=low`.

### 2.3. PGN decode (biến thể Trung Quốc — GBK, khác PGN cờ vua)
- Đặc tả công khai: xqbase.com/protocol/cchess_pgn.htm. `iconv('GBK','UTF-8', $raw)` →
  parse FEN header → parse move list Hán tự.
- Bảng ánh xạ `config/xiangqi-notation.php`: Hán tự quân (车/馬/炮/兵...) + động từ
  (进/退/平) → WXF chuẩn + nhãn Việt hóa.
- Khi 1 bài có cả `.xqf` và `.pgn` song song: dùng đối chiếu chéo — lệch nhau →
  `decode_confidence=low`.

### 2.4. Artisan commands
```
php artisan cotuong:sync-source --from= --filter= --to=
php artisan cotuong:import-xqf {path|--dir=} {--series=}
php artisan cotuong:import-pgn {path|--dir=} {--series=}
php artisan cotuong:generate-lesson {source_asset_id}
```

### 2.5. Agent nội dung — `App\Ai\Agents\LessonWriterAgent`
Port cấu trúc y hệt `laravel13-shop/app/Ai/Agents/BlogPostAgent.php`:

```php
namespace App\Ai\Agents;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Promptable;
use Stringable;

class LessonWriterAgent implements Agent, HasStructuredOutput
{
    use Promptable;

    public function instructions(): Stringable|string
    {
        return <<<INST
Bạn là huấn luyện viên Cờ Tướng viết bài giảng cho website học cờ tướng online.

QUY TẮC BẮT BUỘC:
- Bạn được cung cấp SẴN chuỗi nước đi + FEN từng bước (đã xác thực bằng engine, KHÔNG được
  sửa/suy đoán thêm).
- Nhiệm vụ CHỈ là viết lời giảng cho từng bước (caption) + bài viết tổng quan. Số caption
  PHẢI khớp chính xác số bước đã cho — không tự bịa thêm nước đi nào ngoài danh sách.
- Nếu có transcript/PDF/annotation gốc tham khảo, dùng làm phong phú ý nghĩa chiến thuật,
  KHÔNG chép nguyên văn.
- Tiếng Việt tự nhiên, giọng huấn luyện viên gần gũi. Cấu trúc: mở bài ý tưởng khai cuộc →
  diễn giải từng nước theo caption → kết luận ưu/nhược điểm thế trận.
- KHÔNG nhắc tới video nguồn, tên sách, hay bất kỳ chi tiết định danh tài liệu tham khảo nào.
INST;
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'title'           => $schema->string()->required(),
            'summary'         => $schema->string()->required(),
            'content'         => $schema->string()->required(),
            'seo_title'       => $schema->string()->required(),
            'seo_description' => $schema->string()->required(),
            'step_captions'   => $schema->array()->items(
                $schema->object([
                    'step_order' => $schema->integer()->required(),
                    'caption'    => $schema->string()->required(),
                ])
            )->required(),
        ];
    }
}
```

`app/Services/CotuongContentService.php` (port từ `AiContentService.php`, cùng pattern
`$this->run()` + `AiGenerationLog::create(...)`) build prompt gồm chuỗi move WXF, FEN các
mốc quan trọng, transcript/PDF/annotation excerpt liên quan nếu có, context series. **Sau
khi Agent trả về, service chỉ ghi `caption` vào đúng `lesson_steps.step_order` — không
được đụng `fen`/`move_notation_*`.** `config/ai.php` đổi default provider thành `anthropic`.

### 2.6. Review & publish
Mọi lesson từ Agent mặc định `draft`/`review`. Admin duyệt qua UI (port
`PostController`/`PostEditor` pattern). UI review hiển thị `decode_confidence`/
`decode_warnings`.

---

## 3. Setup Project Laravel Mới

Thư mục `cotuong/` hiện trống (ngoài `.claude/`, `tools/`, file kế hoạch) — tạo mới sạch,
pin version khớp `laravel13-shop`:

```bash
composer create-project laravel/laravel . "^13.0"
composer require laravel/ai:^0.10.3 anthropic-ai/sdk:^0.41.0 \
  livewire/livewire:^4.3.1 spatie/laravel-sluggable:^4.0.3 \
  intervention/image-laravel:^4.1 laravel/breeze:^2.4 laravel/sanctum:^4.3
composer require --dev pestphp/pest:^5.0.4 pestphp/pest-plugin-laravel:^5.0.1 laravel/pint:^1.27

npm install -D @tailwindcss/forms@^0.5.11 @tailwindcss/typography@^0.5.20 \
  @tailwindcss/vite@^4.3.1 alpinejs@^3.15.12 laravel-vite-plugin@^3.1.3 vite@^8.2.1
npm install tinymce@^8.8.2 @alpinejs/persist@^3.15.12
```

- Copy TinyMCE self-hosted GPL assets: `laravel13-shop/public/tinymce/` →
  `cotuong/public/tinymce/`.
- `xiangqi.js`/`xiangqiboard.js` (tác giả `lengyanyu258`): kiểm tra npm registry trước;
  nếu không có, vendor thủ công vào `resources/js/vendor/xiangqi/`, ghi rõ version/commit
  + license trong `LICENSE-NOTICE.md`.

### Bảng đối chiếu port (tham khảo → viết mới)

| Nguồn (`laravel13-shop`) | Đích (`cotuong`) | Mục đích |
|---|---|---|
| `app/Ai/Agents/BlogPostAgent.php` | `app/Ai/Agents/LessonWriterAgent.php` | Agent sinh nội dung |
| `app/Services/AiContentService.php` | `app/Services/CotuongContentService.php` | Orchestrate + log AI call |
| `app/Models/AiGenerationLog.php` | port nguyên | Log mọi lần gọi AI |
| `app/Models/Post.php` | `app/Models/Lesson.php` | Khuôn Lesson model |
| `app/Http/Controllers/Admin/PostController.php` | `app/Http/Controllers/Admin/LessonController.php` | CRUD admin |
| `app/Livewire/Admin/PostEditor.php` | `app/Livewire/Admin/LessonEditor.php` | + nút "Sinh caption AI" |
| TinyMCE init block trong `layouts/admin.blade.php` | y hệt | Editor nội dung |
| `config/admin-roles.php` + `config/admin-nav.php` | tương tự, thêm role `bien_tap` | RBAC + menu |
| `components/admin/image-picker.blade.php` | tái dùng gần nguyên | Ảnh minh họa bài học |
| `components/shop/breadcrumb.blade.php` | `components/lesson-breadcrumb.blade.php` | Breadcrumb JSON-LD |
| `app/Services/ImageService.php` | port | Ảnh OG/thumbnail |
| `database/migrations/..._create_posts_table.php` (mẫu InnoDB) | mọi migration mới | `$table->engine='InnoDB'` |

---

## 4. Lộ Trình Theo Phase

### Phase 0 — Spike giải mã XQF ✅ XONG (23/08/2026)
Kết quả: GO — XQF-first. Chi tiết đầy đủ: `.claude/02-dinh-dang-xqf.md`.

### Phase 1 — Nền tảng Laravel + Bàn cờ v1 + MVP 10-15 bài (⏳ CHƯA BẮT ĐẦU)
1. Setup project (mục 3), chạy migrations (mục 1).
2. Vendor `xiangqi.js`/`xiangqiboard.js`, dựng
   `<x-chess-board mode="co-tuong" :steps="$lesson->steps" :autoplay="false" />` — v1 chỉ
   render FEN tĩnh + next/prev.
3. Viết `cotuong:import-xqf`, copy **15 bài đầu** của "48 BAI GIANG NGUYEN LY KHAI CUOC
   XQF" vào `storage/app/private/cotuong-sources/khai-cuoc/48-bai-nguyen-ly/`. **Lưu ý**:
   cấu trúc không đồng nhất — 1 số BAI có 1 file `.xqf`, 1 số BAI có nhiều file con (xem
   `.claude/01-nguon-du-lieu.md`) — quyết định cụ thể việc gộp/tách lesson lúc triển khai.
4. Chạy import, tạo `lesson_series` "48 Bài Nguyên Lý Khai Cuộc" (`planned_total=48`).
5. Viết `LessonWriterAgent` + `CotuongContentService`, chạy `cotuong:generate-lesson` cho
   từng bài → `review`.
6. Dựng admin CRUD, duyệt thủ công 15 bài → `published`.
7. Trang công khai `/bai-hoc/{series-slug}/{lesson-slug}`, breadcrumb JSON-LD, schema
   `Article`/`Course`.
8. Test responsive mobile cho bàn cờ.

### Phase 2 — Hoàn thiện PGN + hết 48 bài Khai Cuộc + video enrichment (tùy chọn)
1. Hoàn thiện nhánh PGN nếu chưa xong ở Phase 0/1.
2. Import + generate bài 16-48 còn lại.
3. (Tùy chọn) Whisper local trên video có chủ đề khớp lesson.
4. Đối chiếu chéo XQF vs PGN, hạ `decode_confidence` nếu lệch.

### Phase 3 — Đội Hình theo quân + Sát Chiêu Thực Dụng + Cờ Tàn Nâng Cao
1. Tạo `lesson_series` cho 13 Đội Hình, Sát Chiêu Thực Dụng, Cờ Tàn Nâng Cao, Khẩu Quyết.
2. Sub-thư mục theo thế biến → map mỗi sub-thư mục thành 1+ lesson.
3. `LOP SAT CHIEU THUC DUNG` — ưu tiên đối chiếu PGN/XQF song song.
4. `CO TAN NANG CAO CO BINH LUAN XFQ` — khai thác annotation làm ngữ cảnh Agent.

### Phase 4 — Sách PDF (ưu tiên text trước, OCR sau — rủi ro cao)
1. Trích text trực tiếp trước; text rỗng/ít → xếp batch OCR riêng.
2. PDF text-based: parse ký hiệu → FEN nếu có, Agent viết lại nội dung.
3. PDF scan/mindmap ảnh: OCR — rủi ro cao nhất dự án, bắt buộc review 100%.
4. Dùng `source_assets.file_hash` để loại trùng.

### Phase 5 — Cờ Úp (tái dùng hạ tầng, tự biên soạn nội dung)
1. Logic luật riêng (đuổi dài, sĩ/tượng tự do) bọc quanh `xiangqi.js`. Có thể tham khảo
   thêm repo `Velithia/JieqiBox` (biến thể Trung Quốc tương đương Cờ Úp).
2. Mở rộng `<x-chess-board mode="co-up">`: trạng thái úp quân, flip animation.
3. 5-10 bài nền tảng.
4. Bài mẹo/chiến thuật — review nghiêm ngặt hơn vì không có nguồn đối chiếu.

---

## 5. Bảo Mật & Bản Quyền

- `source_assets` + mọi field `raw_transcript`/`decoded_moves_json` + toàn bộ
  `storage/app/private/cotuong-sources/`: không route public, không sitemap, không API,
  không index.
- `.gitignore` chặn `storage/app/private/cotuong-sources/`.
- Trang lesson công khai chỉ gồm bàn cờ + nội dung Agent viết lại — không lộ tên
  sách/video/khóa học gốc.
- Không publish tự động hàng loạt.
- RBAC: role `bien_tap` chỉ duyệt/sửa `lessons`, KHÔNG truy cập `admin.source-assets.*`.
- `.cbl/.cbr/.ccw/.cbs`: KHÔNG đưa vào pipeline tới khi `verified_authorship` xác minh
  thủ công.

---

## 6. Verification / Testing

- **Phase 0**: ✅ `node tools/xqf-decoder/decode.js <file> --json` — xem kết quả trong
  `.claude/02-dinh-dang-xqf.md`.
- **Phase 1**: Pest feature test cho `import-xqf`; test `LessonWriterAgent` mock response,
  assert `caption` ghi đúng `step_order` và `fen`/`move_notation_*` không bị ghi đè;
  end-to-end thủ công qua UI.
- **Phase 2-4**: PGN fixture GBK; PDF text extract; OCR review thủ công 100%.
- **Phase 5**: unit test luật đuổi dài/sĩ tượng tự do; test flip animation thủ công.

---

## 7. Rủi Ro Tổng Hợp

| Rủi ro | Trạng thái |
|---|---|
| XQF scramble không giải mã đầy đủ | ✅ Đã giải quyết Phase 0 — decode đúng mọi version test |
| Comment-length garbage ở version 11-15 (mẫu 0x0D) | ⚠️ Còn tồn tại, không chặn — move/FEN không ảnh hưởng, cờ `decode_confidence` |
| Agent hallucinate nước đi | Kiến trúc tách cứng move/FEN khỏi content — chưa test code thật (Phase 1) |
| Lộ nguồn có bản quyền | Thiết kế `.gitignore` + private disk + RBAC — chưa triển khai (Phase 1) |
| `.cbl/.cbr/.ccw/.cbs` không rõ nguồn gốc | Chưa xác minh — phát hiện thêm: 1 phần `.xqf` trong `Sup tam`/`CBL` là ván sưu tầm TQ, không phải bài giảng gốc |
| PDF scan/OCR sai vị trí quân | Chưa bắt đầu (Phase 4) |
| Video không map 1-1 với lesson | Chưa bắt đầu (Phase 2) |
| MySQL WAMP default MyISAM | Ghi chú sẵn, áp dụng khi viết migration thật (Phase 1) |

---

## Critical Files Tham Khảo

- `ke-hoach-xay-dung-web-hoc-co-tuong.md` — ràng buộc gốc (bảo mật/bản quyền/schema/thiết
  kế bàn cờ)
- `tools/xqf-decoder/decode.js` — decoder đã hoàn thiện Phase 0
- `d:\wamp64\www\laravel13-shop\app\Ai\Agents\BlogPostAgent.php` — khuôn mẫu
  `LessonWriterAgent.php`
- `d:\wamp64\www\laravel13-shop\app\Services\AiContentService.php` — khuôn mẫu
  `CotuongContentService.php`
- `d:\wamp64\www\laravel13-shop\config\admin-roles.php`,
  `config\admin-nav.php` — khuôn RBAC + sidebar
- `d:\wamp64\www\laravel13-shop\database\migrations\2026_07_18_100001_create_customer_profiles_table.php:12`
  — mẫu `$table->engine = 'InnoDB'`
- Ngoài dự án: `xqbase/eleeye` (GitHub) `XQFTOOLS/` — đặc tả XQF 1.0;
  `Velithia/JieqiBox` (GitHub) `src/utils/xqf.ts` — thuật toán decode version mã hóa;
  `lengyanyu258/xiangqi.js` + `xiangqiboardjs` (GitHub) — thư viện bàn cờ
