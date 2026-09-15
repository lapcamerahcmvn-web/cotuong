# Memory — Web Học Cờ Tướng & Cờ Úp

> Nhật ký quyết định kỹ thuật, phát hiện quan trọng, và trạng thái dự án theo thời gian.
> Ghi theo thứ tự mới nhất lên trên. Xem `CLAUDE.md` cho trạng thái tóm tắt hiện tại.

---

## 2026-09-16 (4) — Xuất bản 10 bài mẫu + menu chuyên mục thật

User gửi ảnh chụp production (hoccotuong.top/tin-tuc): "Chưa thấy tin tức... Tối ưu giao diện,
Menu" + "bàn cờ cần có nước đi như bên Bài học". Nguyên nhân: 10 bài ở đợt trước để `draft` (đúng
quy ước AI-content cần duyệt), nên dù deploy đúng vẫn KHÔNG hiện công khai — production đã seed
đúng `post_categories` (ảnh cho thấy 4 tên chuyên mục đúng) nhưng 0 bài published.

**Xử lý**: chuyển cả 10 bài `draft`→`published` (đã xem trước kỹ qua Puppeteer ở đợt tạo, chấp nhận
được) + `cotuong:export-posts` lại để `posts.json` phản ánh đúng trạng thái publish cho lần deploy
tới. Bàn cờ "có nước đi như bài học" THỰC RA đã đúng từ đầu (mỗi bài nhúng `[co-tuong lesson=...]`
= y hệt component bài học, có move-list) — vấn đề chỉ là user chưa thấy được VÌ bài chưa publish.

**Menu chuyên mục**: đổi từ hàng `.tag` phẳng sang `.news-cat-nav`/`.news-cat-item` (icon + tên +
badge số bài, trạng thái active tô đỏ) — giống 1 dải điều hướng thật. Mobile ≤560px: lưới 2 cột
thay vì xếp chồng dọc 4 hàng đầy màn hình.

**Bug CSS thật bắt qua ảnh chụp mobile** (không phải chỉ đọc code): item lưới bị CẮT CHỮ ở viền
phải dù `document.documentElement.scrollWidth` báo KHÔNG tràn ngang — vì `overflow-x:hidden` trên
`body` (đã có sẵn toàn site) chỉ CLIP nội dung tràn tại viền body chứ không cho nó đẩy rộng
`<html>`, nên phép đo scrollWidth "sạch" trong khi mắt thường vẫn thấy chữ bị cắt. Nguyên nhân gốc:
`white-space:nowrap` trên `.nc-name` tạo kích thước nội tại (intrinsic width) rộng hơn cột `1fr`,
và grid item mặc định có `min-width:auto` (không tự co) nên đẩy tràn khỏi ô lưới của nó. **Bài học:
`document.documentElement.scrollWidth` KHÔNG phát hiện được kiểu tràn bị `overflow-x:hidden` của
1 ancestor che giấu — phải NHÌN ẢNH CHỤP THẬT (không chỉ dựa vào phép đo số liệu) mới bắt được lớp
lỗi này. Fix chuẩn: `min-width:0` trên chính grid/flex item (không phải chỉ trên phần tử con) mỗi
khi item chứa text `white-space:nowrap`.**

**Tiện thể sửa 1 lỗi UX nhỏ phát hiện qua ảnh chụp**: bài đánh dấu `is_featured` bị hiện TRÙNG 2 lần
(1 lần ở khối "Nổi bật", 1 lần lặp lại trong "Tất cả bài viết" bên dưới) — `PostController@index`
thêm `whereNotIn('id', $featured->pluck('id'))` cho query danh sách chính.

---

## 2026-09-16 (3) — 10 bài Tin tức mẫu: video 4 kênh cờ tướng VN + bàn cờ nhúng

User: "Bạn khảo sát và viết tầm 10 bài tin tức có nhúng video trên YouTube của các kênh như Thăng
Long Kỳ Đạo, Trần Quyết Thắng, Hà Văn Tiến, Lại Lý Huynh... đưa bàn cờ link bài học mình nhé".

**Quy trình xác minh video TRƯỚC khi dùng (quan trọng — đừng bịa URL)**: WebSearch tìm ứng viên →
xác minh TỪNG video qua `https://www.youtube.com/oembed?url=...&format=json` (trả JSON title +
author_name + author_url thật, 404 nếu video không tồn tại/riêng tư). Phát hiện qua thực tế: nhiều
video tưởng đúng kênh hoá ra KHÔNG PHẢI (vd. 1 video "Thăng Long Kỳ Đạo" trong tiêu đề nhưng do
kênh khác đăng) — 2/12 ứng viên ban đầu bị loại vì 404 hoặc sai kênh. Kết quả 10 video xác minh
thật: 3 từ chính kênh Cờ Tướng – Kỳ Đạo, 2 từ chính kênh Trần Quyết Thắng, 1 từ chính kênh KTQG Hà
Văn Tiến, còn lại là các trận đấu/video CÓ Lại Lý Huynh/Hà Văn Tiến tham gia do các kênh tường
thuật khác đăng (Cờ Úp Danh Thủ, Co Tuong ba ria, Cờ Tướng Ngàn Nước, Cờ Tướng Hậu Giang, Sông Mã
Ca) — bài viết ghi rõ đúng kênh đăng, không gán nhầm cho 1 trong 4 cái tên user nêu.

**Fact-check 1 tin quan trọng trước khi viết**: Lại Lý Huynh vô địch cờ tướng thế giới — xác minh
qua nhiều báo VN uy tín (VOV, VnExpress, Tuổi Trẻ, Thanh Niên, Tiền Phong) → đúng ngày 27/9/2025,
thắng Doãn Thăng (Trung Quốc) tại Trung Quốc, kỳ thủ Việt Nam ĐẦU TIÊN đoạt danh hiệu này. Video
nhúng trong bài (`p8diEdO-1aE`, vs Mạnh Thần) là trận KHÁC — bài viết ghi chú rõ ràng "không phải
trận chung kết thế giới" để tránh gây hiểu nhầm/đưa tin sai.

**Nhúng bàn cờ**: mỗi bài chọn 1 bài học có sẵn trên site liên quan chủ đề (khai cuộc/sát pháp/tàn
cuộc phù hợp ngữ cảnh video) qua `[co-tuong lesson="slug"]` — xác minh cả 10 slug tồn tại + published
qua tinker TRƯỚC khi viết nội dung tham chiếu tới chúng.

**Hạ tầng mới (mirror `cotuong:export-pages`/`PagesSeeder`)**: `cotuong:export-posts` (xuất bảng
`posts` → `database/seeders/data/posts.json`, khớp category qua `slug` không phải ID cứng) +
`PostSeeder` (`updateOrCreate` theo slug bài viết, nạp category theo slug) — đưa nội dung Tin tức
vào quy trình ship-qua-git đã có sẵn của dự án thay vì chỉ nằm trong DB local. Test round-trip
(xoá hết → `db:seed --class=PostSeeder` → xác nhận khôi phục đúng 10 bài, đúng slug/category) trước
khi commit.

**Trạng thái**: cả 10 bài tạo ở `draft` — nhất quán với quy ước "nội dung AI cần Admin duyệt trước
khi publish" (giống `CotuongContentService::generateLesson()` luôn để `status=review`). User cần vào
`/admin/tin-tuc` đọc lại + bấm "Đăng" từng bài. Verify 1 bài (bài về Lại Lý Huynh, có gắn
`is_featured`) bằng cách publish thử qua Puppeteer + chụp ảnh — video nhúng đúng (hiện thumbnail
thật của YouTube), bàn cờ tương tác đủ nước đi + diễn giải, layout khớp theme site — rồi trả về
draft trước khi commit (không để lại dữ liệu "published" ngoài ý muốn).

**Deploy**: cần chạy thêm `cotuong:export-posts` mỗi khi sửa nội dung ở local rồi commit lại
`posts.json`; production chạy `php artisan db:seed --class=PostSeeder --force` (SAU
`PostCategorySeeder` nếu là lần đầu, vì cần category tồn tại để khớp slug).

---

## 2026-09-16 (2) — Rà soát Tin tức: N+1, sitemap, mobile admin

User: "Kiểm tra code tối ưu... cài đặt thông số SEO... quản lý được trong Admin. Tối ưu cả
mobile" — tự review lại code Tin tức vừa dựng (mục trên), không phải feature mới.

**Bắt được qua tự đọc lại code (không phải Puppeteer lần này)**:
- **N+1**: `PostController@index`/`@show` (public) không `with('category')` dù view (`posts/index`,
  `posts/show` phần related) truy cập `$p->category` NGAY TRONG VÒNG LẶP — mỗi bài 1 query riêng.
  Admin's `PostController@index` đã đúng từ đầu (có `with('category')`), chỉ public bị sót.
  `category()` method KHÔNG bị lỗi này vì view dùng `$category->slug` (đã biết sẵn), không đụng
  `$p->category`.
- **Gap SEO thật sự nghiêm trọng — bài published không có trong sitemap.xml**: quên hoàn toàn khi
  dựng feature, Google sẽ không tự crawl bài mới. Đã thêm `sitemap-tin-tuc.xml` vào
  `SitemapController` (chỉ xuất hiện trong sitemap index khi có ≥1 bài published — mẫu y hệt cách
  `co-up`/từng giai đoạn được thêm có điều kiện) + route whitelist `where('section', '...|tin-tuc')`.
  **Bài học: mỗi khi thêm 1 loại nội dung công khai mới (route `show` mới), PHẢI tự hỏi "đã vào
  sitemap chưa?" — không có gì tự động nhắc, rất dễ quên vì trang vẫn chạy bình thường, chỉ là
  không được Google phát hiện.**
- `alt=""` trên thumbnail danh sách/bài liên quan (ảnh nội dung thật, không phải trang trí) → đổi
  thành `alt="{{ $p->title }}"`.

**Verify lại bằng thực nghiệm** (không chỉ đọc code): tạo/xoá post test qua tinker, `curl
/sitemap.xml` xác nhận `sitemap-tin-tuc.xml` CHỈ xuất hiện khi có bài published (biến mất đúng khi
xoá hết); `curl /sitemap-tin-tuc.xml` xác nhận URL + lastmod đúng. Puppeteer mobile 390×844 cho cả
3 trang Admin Tin tức (danh sách/form soạn bài/chuyên mục) — không tràn ngang, bảng cuộn ngang đúng
trong khung (`.tbl-wrap` 358px chứa `.admin-table` 720px, không tràn ra ngoài) — admin KHÔNG cần
sửa gì thêm vì đã tái dùng đúng `.tbl-wrap`/`.admin-table`/`.form-grid` có sẵn từ Lesson admin (đã
mobile-hoá từ trước). Chụp ảnh thật form soạn bài trên mobile — TinyMCE tự co toolbar vào nút "…"
khi không đủ chỗ (hành vi mặc định của TinyMCE, không cần code thêm).

**Phát hiện phụ**: cleanup dữ liệu test ở phiên trước (dựng feature Tin tức) SÓT 1 bài
("Bài Test Nhúng Video Và Bàn Cờ", id=2) vì dùng `Post::where(...)->first()->delete()` thay vì
`->get()->each(...)` khi có NHIỀU bản ghi trùng tên do slug tự tăng số (`-1`) ở lần chạy lại test.
**Bài học: khi dọn dữ liệu test sau 1 phiên có RETRY (chạy lại script test do lỗi giữa chừng), luôn
dùng `->get()->each()` hoặc `->delete()` trên cả query thay vì `->first()` — lần chạy trước có thể
để lại nhiều bản ghi, không chỉ 1.**

---

## 2026-09-16 — Trang "Tin Tức" mới: bài viết nhúng video + bàn cờ tương tác

User: "Xem web lapcamerahcm.vn để làm phần Tin tức cho web cờ tướng này. Có những video, thế cờ
có bàn cờ trong bài học..." — site trước đây KHÔNG có blog/tin tức gì, dựng mới hoàn toàn.

**Khảo sát trước khi code** (Explore agent + WebFetch site thật lapcamerahcm.vn/tin-tuc): tham khảo
LAYOUT của blog `laravel13-shop` (nổi bật + lưới + sidebar category, breadcrumb→TOC→content→related
→comment→share) nhưng **KHÔNG copy schema/hạ tầng** — project đó dùng ImageService riêng + TinyMCE
đầy đủ plugin mà cotuong **chưa từng có upload file nào trước đây** (xác nhận: không
`public/storage`, không route/controller nào gọi `Storage::`/`hasFile()`). Ngược lại cotuong **đã
có sẵn** Spatie `HasSlug` (dùng ở `Lesson`) và TinyMCE 8 self-hosted GPL (dùng ở
`admin/lessons/edit.blade.php`, trước chỉ bật `lists link autolink`) — tái dùng, chỉ mở rộng plugin.

**Schema** (`posts`/`post_categories`, mẫu 1:1 theo `lessons`/`lesson_series`): status chỉ
`draft`/`published` (KHÔNG theo 4 trạng thái review/needs_fix của Lesson — user chỉ cần công cụ
đăng tin, không cần luồng duyệt phức tạp). 4 chuyên mục seed sẵn qua `PostCategorySeeder` (chạy
riêng, KHÔNG tự động trong `DatabaseSeeder`, giống `PagesSeeder`): Video Hướng Dẫn, Phân Tích Ván
Cờ, Tin Cộng Đồng & Giải Đấu, Kiến Thức Cờ Tướng.

**Nhúng bàn cờ — vấn đề kỹ thuật cốt lõi**: nội dung bài viết là HTML thô lưu DB từ TinyMCE, KHÔNG
compile lại nên không thể nhúng cú pháp Blade (`<x-chess-board>`) trực tiếp vào đó. Giải pháp:
shortcode `[co-tuong fen="..."]` (1 thế cờ tĩnh) hoặc `[co-tuong lesson="slug-bai-hoc"]` (nhúng
NGUYÊN 1 bài học có sẵn — đủ nước đi/nhánh, y hệt trang bài học gốc) — `App\Support\PostContent::
render()` quét bằng `preg_replace_callback` và thay bằng `view('components.chess-board', [...])
->render()` TRƯỚC KHI `{!! !!}` render ra view. Admin chèn qua nút tuỳ biến "♟ Bàn cờ" trên thanh
TinyMCE (`editor.ui.registry.addButton`), dùng `prompt()` hỏi FEN hoặc slug — nhất quán với các chỗ
khác trong site đã dùng `prompt()` (lật quân úp, đặt tên thế cờ khi lưu thư viện).

**Video**: hoàn toàn miễn phí nhờ TinyMCE `media` plugin (dán URL YouTube tự nhúng iframe) — không
cần field/code riêng. CSS mới DUY NHẤT: `.prose iframe { aspect-ratio:16/9; width:100%; height:auto }`
để ép responsive (TinyMCE nhúng iframe với `width="560" height="314"` cứng, không tự co giãn).

**Lần đầu tiên cotuong có file upload** (thumbnail bài viết + ảnh chèn TinyMCE) — cần
`php artisan storage:link` là bước deploy MỚI (đã thêm `/public/storage` + `/storage/app/public/posts`
vào `.gitignore` — symlink và ảnh upload không commit, mỗi máy/server tự tạo). Không có ImageService
nào ở cotuong nên dùng thẳng `$request->file('thumbnail')->store('posts','public')` — đơn giản, đủ
dùng cho quy mô hiện tại. **Bug đã bắt qua Puppeteer trước khi commit**: `update()` ban đầu overwrite
`thumbnail` thành `null` mỗi lần sửa bài KHÔNG kèm upload ảnh mới, vì `$request->validate()` trả về
cả field file rỗng — sửa bằng `unset($data['thumbnail'])` trước khi merge lại path thật (chỉ khi
`$request->hasFile('thumbnail')`).

**View public tái dùng gần như 100% CSS có sẵn** — `.lesson-list`/`.lesson-item.has-thumb`/`.li-thumb`/
`.tag`/`.prose`/`.page-head`/`.section` y hệt trang bài học, không dựng hệ `.post-*` riêng. Route
`/tin-tuc/{categorySlug}/{postSlug}` có redirect 301 nếu category slug lệch category thật của bài
(giống pattern `laravel13-shop\PostController::show`).

**Test E2E đầy đủ qua Puppeteer TRƯỚC khi commit** (không chỉ smoke test): đăng nhập admin → tạo bài
qua form thật → set nội dung qua `tinymce.get('content').setContent(...)` (API thật, không phải gõ
textarea thô) gồm 1 iframe YouTube + 2 shortcode (`fen=` và `lesson=`) → upload thumbnail thật →
submit → xác nhận trang công khai: `hasShortcodeLeftover:false` (không còn `[co-tuong` thô nào),
`boardCount:2` đúng, iframe render 720×405 (đúng tỉ lệ 16:9, không phải 560×314 cứng), bài học nhúng
CÓ move-list + nút Tiến (`hasNext:true`) còn thế FEN tĩnh THÌ KHÔNG — đúng theo thiết kế 2 loại
nhúng. Mobile 390×844 cả `/tin-tuc` và `/tin-tuc/{category}` không tràn ngang. Dữ liệu test đã dọn
sau khi xong (tinker delete + xoá file thumbnail test).

**Deploy** (⚠️ có bước MỚI so với mọi lần trước — lần đầu cần storage symlink):
```bash
git fetch origin && git reset --hard origin/main
php artisan migrate --force
php artisan storage:link
php artisan db:seed --class=PostCategorySeeder --force
php artisan optimize:clear && php artisan config:cache && php artisan route:cache && php artisan view:cache
```

---

## 2026-09-15 (3) — Thư viện: hỗ trợ Cờ Úp + tối ưu mobile

User: "Tối ưu giao diện trên mobile luôn nha bạn, soạn được cả cờ úp nữa nhé" — nối tiếp mục (2)
bên dưới (lúc đó `fen-composer.js` mới ghi được nước đi Cờ Tướng chuẩn, chưa có quân úp).

**Cờ Úp trong `fen-composer.js`**: port gần như 1:1 từ `board-editor.js` (đọc lại toàn bộ file đó
để chắc chắn đúng luật/tránh lệch hành vi với Admin), KHÔNG đụng file gốc:
- Thêm `X`/`x` vào `ORDER`/`LIMITS` (15 quân úp/bên), `hidden[90]` (binh chủng thật dưới nắp) đi
  kèm `board[90]` ở MỌI nơi — snapshot theo từng node của cây biến (`node.hidden`), không chỉ
  biến toàn cục, để lùi/tiến giữa các nước không làm mất thông tin đã lật.
- 2 nút mới: "Thế mở Cờ Úp" (nạp FEN chuẩn `xxxxkxxxx/.../XXXXKXXXX` — vào soạn nước ngay, prompt
  hỏi lật ra gì mỗi lần đi) và "Đậy nắp quân" (chuyển quân sáng đang xếp, trừ 2 Tướng, thành X/x +
  nhớ `hidden[i]` → khi soạn nước sau đó tự lật đúng, KHÔNG hỏi lại).
- Toggle "Cờ Tướng"/"Cờ Úp" chỉ nới lỏng `zoneOk` cho Sĩ/Tượng/Tốt (cho phép xếp quân sáng vào vị
  trí "sai" luật cờ tướng chuẩn trước khi đậy nắp — vì quân úp thật sự bị xáo ngẫu nhiên khắp bàn).
  Tướng LUÔN giữ đúng cung dù ở chế độ nào; X/x luôn đặt được mọi ô.
- Luật đi quân/chiếu tướng của quân úp **tự động** qua `Rules.legalNoSelfCheck` — không cần
  parameter `up` rời, vì `xiangqi-rules.js`'s `legalMove()` đã tự nhận diện `p==='X'||'x'`.
- `revealedUsed()`/`MAX_REVEAL` (2 Xe/Mã/Tượng/Sĩ/Pháo, 5 Tốt mỗi bên) đếm CẢ quân đã lộ rồi bị ăn
  dọc theo nhánh đang xem (không chỉ đếm trên bàn hiện tại) — copy nguyên logic đếm ngược lên cây
  từ `board-editor.js`, tự kiểm chứng lại bằng Puppeteer (đặt quân → đậy nắp → đi 1 quân đã biết
  danh tính → xác nhận KHÔNG hiện prompt, tự lật đúng "Tốt"; và thế mở Cờ Úp gốc → đi quân chưa
  biết danh tính → prompt hiện đúng, chọn "X" → lật ra "Xe" đúng, FEN cập nhật đúng).
- `LibraryController::submit`: không có field chọn chế độ chơi trong tool công khai → suy luận
  `game_mode` từ chính chuỗi FEN (`str_contains($fen, 'X') || str_contains($fen, 'x')` → `co-up`,
  ngược lại `co-tuong`) trước khi gọi `LessonComposer::create` — quyết định phase=null đúng cho
  Lesson tạo ra (mirroring cách Admin's `#be-gamemode` select làm, nhưng tự động thay vì hỏi).

**Tối ưu mobile**: test trực tiếp bằng Puppeteer viewport 390×844 (iPhone-cỡ), chụp ảnh full khối
composer ở cả 2 chế độ (xếp quân + soạn nước có nhánh) — xác nhận `document.documentElement.
scrollWidth === clientWidth` (không tràn ngang) ở cả 2. Thay đổi CSS chính:
- `.fc-wide-input` (class mới, thay `style="min-width:220px"` inline cũ) + `@media (max-width:640px)`
  ép `min-width:0` — input/textarea full-width thay vì bị kẹp min-width trên màn hẹp.
- `[data-fen-composer] .btn { flex:1 1 auto }` ở mobile — các nút trong `.cluster` giãn đều lấp đầy
  hàng thay vì co cụm 1 góc, dễ bấm hơn.
- `.fc-move-mini` (nút +Biến/✕ trên mỗi nước) tăng 26px→30px trên mobile cho khớp ngón tay hơn.
- `.fc-panel` (class mới thay `style="padding:18px 20px"` inline trên `<details class="card">`) —
  giảm còn `14px 14px` ở mobile.

**Bài học tái dùng cho lần sau**: khi 1 khối UI mới có nhiều `style="min-width:...px"` inline rải
rác (như phase (2) để lại), rất khó áp override mobile gọn qua `!important` từng chỗ — nên đổi
sang class ngay từ đầu (`.fc-wide-input`) để override qua `@media` 1 chỗ duy nhất. Ghi nhớ áp dụng
sớm hơn cho các UI mới sau này, tránh phải dọn lại như lần này.

---

## 2026-09-15 (2) — Thư viện: soạn NƯỚC ĐI + NHÁNH (không chỉ xếp quân) + Gửi Admin duyệt

User gửi ảnh app cờ Trung Quốc có "棋谱编辑" (mũi tên nhánh 1/2 màu) làm ví dụ, yêu cầu nâng cấp
công cụ soạn ở `/tai-khoan/thu-vien` (vừa xong ở mục bên dưới, lúc đó CHỈ xếp quân) thành ghi được
nước đi + biến "tương tác như bàn cờ thật", và thêm nút gửi bài cho Admin duyệt/publish.

**`saved_positions`**: thêm `steps_json`/`variation_tree` (json, nullable — tương thích ngược,
các thế cờ đơn đã lưu trước đó không có 2 cột này vẫn hoạt động bình thường).

**`LessonComposer` (mới, `app/Support/`)**: gom logic tạo `Lesson`+`LessonStep` DÙNG CHUNG giữa
`Admin\BoardEditorController::store()` (đã refactor gọi vào đây) và `LibraryController::submit()`
(mới) — tránh lặp code giữa "Admin tự soạn" và "người dùng gửi". `lessons.submitted_by_user_id`
(FK nullable) đánh dấu bài user gửi; Admin thấy badge "📤 gửi bởi {tên}" + checkbox lọc riêng ở
`admin/lessons/index.blade.php`. Route mới `POST /thu-vien/gui-admin` (throttle 10/phút, trong
nhóm `auth` sẵn có) → tạo Lesson `status=draft`, Admin vào sửa/duyệt như bài tự soạn bình thường.

**`public/js/fen-composer.js` viết lại hoàn toàn** (từ ~150 dòng đặt-quân-đơn-thuần lên full
move-recording + cây biến, phỏng theo đúng kết cấu `board-editor.js`/`initTree` của `board.js`
nhưng file RIÊNG — không đụng 2 file đó):
- Dùng `window.XiangqiRules.legalNoSelfCheck/notation/toIccs/sideOf` cho MỌI luật+ký hiệu (không
  viết lại) — xác nhận `notation(b,from,to)` cần gọi TRƯỚC khi mutate board (đọc `b[from]`).
- Vẽ bàn bằng `window.XiangqiBoard.render(fen,lastMove,arrows,selected,flip)` (dùng chung với
  trang học) rồi CHÈN THÊM 90 `<circle class="fc-hit" fill="transparent">` làm điểm bấm bằng
  string-splice trước `</svg>` — render() vốn read-only nên phải làm vậy; toạ độ M=26/CW=52/CH=52
  phải khớp y hệt `board.js` để hit-target thẳng hàng với quân vẽ.
- Cây biến (`rootNode`/`cur`, `pushMove`/`descend`/`deleteNode`) + `mainline()` (steps_json) +
  `serializeTree()` (variation_tree) — cùng shape JSON với `board-editor.js` nên
  `<x-chess-board :tree>` hiển thị được ngay, không cần đổi component.
- 2 chế độ UI: "1 · Xếp quân" (setup, palette đặt quân) / "2 · Soạn nước đi" (move, ghi nước +
  nhánh) — chuyển qua lại giữ nguyên board hiện tại làm gốc cây khi vào mode 'move'.

**⚠️ 2 bug thật phát hiện qua Puppeteer, đã vá**:
1. `setMode()` reset `selected = null` thay vì `-1` → phá vỡ check `if (selected < 0)` trong
   `onSquare` (null < 0 === false) → bấm quân không chọn được gì, không báo lỗi, im lặng không
   làm gì cả. Bài học: khi có nhiều "giá trị rỗng" cho cùng 1 biến số (`-1` dùng làm sentinel
   "chưa chọn" ở nơi khác trong file) phải dùng ĐÚNG sentinel đó ở mọi chỗ reset, không tự ý đổi
   sang `null`.
2. **Gotcha Puppeteer/SVG quan trọng** (tốn nhiều vòng debug nhất): `page.click(selector)` của
   Puppeteer (click theo toạ độ thật qua CDP) liên tục thất bại VÔ THANH trên các phần tử SVG
   `<circle fill="transparent">` VÀ trên nút thường nằm dưới `y` vượt viewport (không tự cuộn tới
   nơi đúng) — không lỗi, không throw, chỉ đơn giản là không kích hoạt listener. `ElementHandle.click()`
   cũng vậy (dùng cùng cơ chế toạ độ). Cách test tin cậy được: `page.evaluate(el =>
   el.dispatchEvent(new MouseEvent('click',{bubbles:true})))` — bỏ qua hit-testing/toạ độ, gọi
   thẳng listener. Áp dụng cho MỌI test Puppeteer sau này có bàn cờ SVG hoặc layout có phần tử
   sticky/fixed — đừng dùng `page.click()`/`ElementHandle.click()` cho các case này, dùng
   dispatchEvent qua evaluate ngay từ đầu để đỡ tốn vòng lặp debug.

**Test E2E đầy đủ đã chạy qua** (Puppeteer thật, admin@cotuong.test): xếp quân → soạn nước đi →
tạo nhánh (quay lại nước 1, đi nước 2 khác) → cây có đúng 3 node → lưu vào thư viện → mục đã lưu
hiện lại đúng dưới dạng bàn cờ TƯƠNG TÁC ĐẦY ĐỦ (có nút Tiến/Lùi, không phải bàn tĩnh) → gửi Admin
duyệt (có `confirm()`, dùng `page.on('dialog')` để accept trong test) → vào `/admin/lessons?submitted=1`
xác nhận đúng badge 📤 + tên người gửi + status draft. Dữ liệu test đã dọn (tinker delete) sau khi
xong, không còn rác trong DB local.

**Deploy**: migration mới `2026_09_16_100001_extend_saved_positions_and_lessons` — nhắc
`php artisan migrate --force` khi user deploy lần tới (kèm bước cache thường lệ).

---

## 2026-09-15 — Copy/Dán FEN (Admin + công khai) + Thư viện thế cờ cá nhân

Plan đầy đủ: `C:\Users\MinhTuyen\.claude\plans\pure-pondering-haven.md` (máy dev). Làm cả 3 pha
P1/P2/P3 trong 1 phiên, đã test E2E bằng Puppeteer (đăng nhập admin, thao tác thật qua trình
duyệt headless) trước khi commit.

**P1 — Copy/Dán FEN**:
- `board-editor.js` (Admin): thêm ô FEN + nút "Dán FEN vào bàn"/"Copy FEN" — code MỚI thêm cuối
  file, KHÔNG sửa hàm nào có sẵn (đúng nguyên tắc không đụng core file này).
- **Tiện thể vá 1 bug có sẵn**: `serializeTree()` crash `Cannot read properties of null (reading
  'children')` khi `rootNode` là null — xảy ra ngay cả với nút "Xoá hết"/"Thế mở Cờ Tướng" GỐC
  (không liên quan gì FEN mới), chỉ chưa ai bấm đúng lúc để lộ ra. Vá 1 dòng: `return rootNode ?
  ser(rootNode) : [];`. Có thể admin từng bấm các nút đó ở thế trống và `variation_tree` không
  được ghi (lỗi JS âm thầm) — nếu gặp bài nào có vẻ thiếu cây biến sau khi dùng các nút đó trước
  đây, đây là nguyên nhân khả dĩ.
- `board.js`: `attachCopyFen(root, getFen)` dùng chung cho view/tree/static (trước CHỈ có ở
  puzzle mode). Nút 📋 chuyển vào `.board-fab-group` (cạnh 🔊/⛶), áp dụng MỌI chế độ.

**P2 — Thư viện (bảng `saved_positions`)**:
- Migration mẫu `user_learning_tables` (InnoDB + `foreignId()->constrained()->cascadeOnDelete()`).
  `SavedPosition` (user_id, source_lesson_id nullable, fen, title, note). `User::library()`.
- `LibraryController@store` (JSON, dùng chung cho nút 🔖 trên bàn cờ VÀ khối soạn cờ ở P3) +
  `@destroy` (chỉ chủ sở hữu, 403 nếu không). Route trong khối `auth` sẵn có ở `routes/web.php`.
- Nút "🔖 Lưu vào thư viện" trên MỌI chế độ bàn cờ công khai (view/tree/static/puzzle) — `@auth`.
  Prop `sourceLessonId` mới cho `<x-chess-board>`, đã truyền từ `lessons/show.blade.php` (cả 3
  instance: view/puzzle/static).

**P3 — Trang `/tai-khoan/thu-vien`**:
- `account/library.blade.php`: khối "Soạn thế cờ mới" (`<details>` gấp/mở) + danh sách đã lưu
  (`<details><summary class="lesson-item">` — click hàng mở rộng thành `<x-chess-board>` tĩnh
  ngay tại chỗ, KHÔNG cần route riêng để "xem"). Xoá = form DELETE thường + `confirm()`.
- **Thumbnail thư viện = SVG SỐNG** (`window.XiangqiBoard.render(fen)`, JS chèn lúc load trang) —
  KHÔNG sinh ảnh PNG như lesson OG. Không hạ tầng ảnh mới, sắc nét mọi kích thước.
- `public/js/fen-composer.js` (MỚI, ~150 dòng): đặt quân đơn giản (không ghi nước/luật đi quân/
  cây biến — chỉ cần 1 thế cờ tĩnh), dùng `window.XiangqiRules.loadFen/toFen` (KHÔNG viết lại FEN
  logic). Board + 90 điểm bấm tự vẽ riêng (bản rút gọn từ setup-mode của `board-editor.js`,
  KHÔNG đụng file đó). CSS namespace `.fc-*` thêm vào `app.css` (KHÔNG dùng `.be-*` — những class
  đó chỉ định nghĩa trong `admin.css`, trang public không nạp file này — phát hiện lúc làm, xem
  kỹ trước khi tái dùng class giữa admin/public).
- `account/index.blade.php`: stat-grid 3→4 ô (2x2), ô mới "Thế cờ đã lưu" link sang thư viện.

**Gotcha rút ra**: `admin.css` và `app.css` là 2 file RIÊNG — admin load cả 2, public CHỈ load
`app.css`. Mọi class dùng ở view public phải định nghĩa trong `app.css`, dù nhìn "giống" 1 class
đã có ở admin (`.be-palette` v.v.) — kiểm tra bằng `grep` trước khi giả định dùng chung được.

---

## 2026-09-11 — Đợt SEO + ảnh thế cờ + giao diện bàn cờ hiện đại (đã push `5a77477`)

User yêu cầu "làm hết kế hoạch rồi đẩy GitHub để đồng bộ". Đã push `origin/main` `5a77477`.
Kế hoạch đầy đủ: `C:\Users\MinhTuyen\.claude\plans\pure-pondering-haven.md` (máy dev).

**⚠️ DEPLOY đợt này CẦN**: `migrate --force` (bảng `pages` mới) + `db:seed --class=ContentSeeder --force`
+ `db:seed --class=PagesSeeder --force` + clear/cache. Thiếu PagesSeeder → trang giai đoạn mất intro+FAQ.
`.env` prod phải có `APP_URL=https://hoccotuong.top` (đã xác nhận có). Sau deploy chạy Facebook
Sharing Debugger "Scrape Again" để cập nhật ảnh share.

**SEO/structured data** (`layouts/app.blade.php` + `app/Support/Seo.php` mới + View Composer trong
`AppServiceProvider`):
- `og:title` giờ mirror `<title>` (trước hardcode "Học Cờ Tướng" mọi trang — bug lớn nhất). Thêm
  `og:image`/`og:image:*`, twitter card, `og:site_name`, `og:type=article`+`article:*` cho bài học.
- JSON-LD toàn site: Organization + WebSite(SearchAction), tham chiếu `@id` `url('/#org')`/`#website`.
- Phase page: thêm BreadcrumbList + CollectionPage + ItemList (trước KHÔNG có JSON-LD).
- Series page: `Course` đủ `offers`(free)/`hasCourseInstance`/`hasPart`/`provider.logo` + BreadcrumbList.
- Lesson: BreadcrumbList thêm cấp series (trước thiếu), Article→`["Article","LearningResource"]`+`isPartOf`.
- `config/site.php`: `SITE_SOCIAL_*` + `SITE_TWITTER` qua `.env` → `sameAs` + `twitter:site` (đang trống).
- favicon.ico (đang 0 byte) → thật; + favicon.svg, apple-touch, icon-192/512, site.webmanifest.
- Nav thêm "Nhập môn". De-dupe title 5 trang giai đoạn (trong `LessonController::PHASE_META`).

**Ảnh thế cờ OG** — `tools/og-image/` (Node + `@resvg/resvg-js`, **CHỈ LOCAL, không lên hosting**):
- `render-board.cjs` port `renderBoard` của `board.js` (màu HEX cứng — resvg không resolve `var()`).
  ⚠️ GIỮ ĐỒNG BỘ 2 file này khi sửa cách vẽ bàn cờ.
- Quy tắc chọn thế: FEN nước mainline CUỐI (thế "kết"), fallback tree→node cuối→initial_fen.
- `generate.cjs` sinh 541 bài + 9 chuỗi → `public/og/{lessons,series}/{slug}.png` 1200×630, COMMIT git.
- `optimize.py` (Pillow, quantize 128 màu) chạy SAU generate: 41MB → 14MB.
- `tools/brand-assets/generate.php` (PHP GD, font Windows): favicon + 6 ảnh OG giai đoạn/trang chủ.
- `Seo::ogImage($model)`: lesson→phase→home, cache-bust `?v=mtime`.

**Font quân cờ** `public/fonts/xiangqi-kai.{woff2,ttf}` — subset 19 glyph Noto Serif TC (SIL OFL,
lấy qua Google Fonts `text=` API), internal family đổi thành "XiangqiKai" (fonttools). Trước đây
quân dựa `KaiTi`/`STKaiti` của HĐH → Android/iOS render lệch. Wire vào `app.css` `@font-face` +
`board.js` (glyph quân + 楚河漢界) + `.brand .logo`/`.phase-card .pc-icon`/`.li-num`.

**Giao diện bàn cờ** (`board.js` viết lại + `components/chess-board.blade.php` + `app.css`):
- Điều khiển gọn: hàng chính "‹ Lùi" + "Tiến ›" (primary, lớn); thanh riêng pill "Nước n/m" + ⛶;
  hàng phụ "⏮ Đầu / Cuối ⏭ / ⟲ Lật bàn / ▶ Tự chạy". Tap target ≥44-52px.
- MỚI trong board.js: `renderBoard(...flip)` (tham số 5), vuốt trái/phải trên bàn để đi nước
  (view+tree), lật bàn, tự chạy (setInterval 1400ms), nhấp nháy ô đích, **trượt quân** khi đổi
  bước (`.xq-pc-moved` + `--fx/--fy` + WAAPI, tắt nếu `prefers-reduced-motion`). Tree/puzzle giữ nguyên.
- Mobile ≤900px: `.board-col` `position:sticky;top:56px` (bàn cờ dính khi cuộn đọc caption — trước
  đây trôi mất); `.move-list--full` `max-height:44vh;overflow-y:auto`.
- `.board-holder` giờ nằm trong `.board-stage` + `.board-bar` (nút overlay tách khỏi vùng bị
  innerHTML-replace).

**Dark/Light toggle** — nút trong nav + drawer (`[data-theme-toggle]`), cycle auto→light→dark,
localStorage, script chống FOUC ngay đầu `<head>`, cập nhật `<meta theme-color>`. CSS `[data-theme]`
đã hỗ trợ sẵn từ trước.

**Nội dung SEO** (P2):
- Bảng `pages` mới (`App\Models\Page`, migration `2026_09_11_100001`) + `PagesSeeder` +
  `cotuong:export-pages` → `database/seeders/data/pages.json`. Intro 300-500 từ + 4 FAQ mỗi trang
  cho 5 giai đoạn. `LessonController@phase` load `Page::firstWhere('slug',"phase:$phase")`, render
  `body_html` + FAQ accordion + FAQPage schema. Page có `seo_title`/`seo_description` thì override.
- Viết lại 7 bài "cách đi quân X" nhập môn (id 348-355 trừ 354) từ ~100 → ~300+ từ qua
  `cotuong:lesson-fill --publish` → `cotuong:export-content`. content.json +1 bài
  (`c2-thiet-mon-thuyen-vi-du-7` đã publish sẵn từ commit trước, chỉ chưa export).

**CHƯA làm / hoãn** (trong kế hoạch nhưng không cấp thiết):
- Admin override `lessons.og_step` (chọn thủ công thế cờ làm ảnh OG) — quy tắc mặc định (nước cuối)
  cho ảnh đẹp rồi, chưa cần. Nếu làm: migration + `Lesson::$fillable` + `ExportContent` map +
  `build-batch.cjs` (2 chỗ `thumbnail:null`) + regen; `manifest.cjs` đã đọc `og_step` sẵn.
- Intro + FAQ cho 10 trang chuỗi (`lesson_series` thêm cột `intro_html`/`faq`) — chuỗi đã có
  `description` + Course schema đã fix, ưu tiên thấp hơn.
- `@layer` cho `app.css` — giữ file phẳng, chỉ thêm section BỔ SUNG 09/2026 ở cuối + utility nhỏ.

---

## 2026-08-24 — Phase 2: tài khoản + UI bài học + tìm kiếm + admin + DEPLOY GitHub

Loạt việc lớn (user yêu cầu), làm trực tiếp session chính (subagent bị chặn bởi **monthly
spend limit** — không spawn được nữa). Đã đẩy lên GitHub: `lapcamerahcmvn-web/cotuong` (main).

**Nội dung**: hoàn tất 14/14 bài publish có content + caption (6 bài agent viết trước khi hết
spend, 6 bài agent đợt 2, 2 bài 53/60 tự viết tay). Command `cotuong:export-content` +
`ContentSeeder` → nội dung ship qua `database/seeders/data/content.json` (KHÔNG cần .xqf trên
hosting; .xqf vẫn gitignore vì bản quyền).

**Thứ tự/tiêu đề**: command `cotuong:organize-series` — bỏ tiền tố "Bài N:" + đánh lại 1..14
theo thứ tự giảng (chạy lại khi mở rộng tới 48).

**UI bài học**: layout đọc — desktop bàn cờ trái (sticky) + diễn giải ĐẦY ĐỦ từng nước bên phải
(có chấm Đỏ/Đen + ký hiệu chuẩn + caption full), mobile xếp dọc; nút ⛶ phóng to toàn màn hình
(Fullscreen API + fallback CSS). board.js dispatch `xq:viewed-all-moves` khi tới nước cuối.

**Tài khoản** (thay CTA "Bắt đầu học" bằng nút "Tài khoản" + ô tìm kiếm trên nav):
- Đăng nhập THỐNG NHẤT tại `/dang-nhap` (route name `login`): Google (Socialite, cần
  GOOGLE_CLIENT_ID/SECRET) + email/mật khẩu (admin). `AuthController` (mới, thay admin/AuthController).
- Theo dõi tiến độ: `lesson_progress` (đọc ≥300s + xem hết nước → status=completed); JS trong
  lessons/show.blade.php POST `/tien-do/{lesson}`; badge "✓ Đã học".
- Guest-gate: modal sau 120s cho khách (sessionStorage dismiss).
- Trang `/tai-khoan`: bài đã học/đang học/gợi ý. Middleware `LogAccess` ghi `access_logs`.
- User model: cột google_id/avatar/last_login_at + role `hoc_vien`.

**Admin**: thêm Quản lý người dùng (`admin/users` — info + bài đã học + lịch sử truy cập);
sửa pagination (view tùy biến `vendor/pagination/cotuong` + Paginator::defaultView, vì không có
Tailwind); trang sửa bài giờ có bàn cờ + danh sách nước đầy đủ để đối chiếu biên soạn.

**Tìm kiếm**: `/tim-kiem` (SearchController) tìm lesson (title/summary/content) + series.

**Deploy**: `.claude/04-deploy.md` (SSH hosting `hocotuong`, domain hoccotuong.top). gh authed
org `lapcamerahcmvn-web`. Assets tĩnh (public/css,js,tinymce) commit sẵn, không cần npm build.
CẦN user: (1) Google OAuth creds vào .env hosting; (2) SSH pull + migrate + db:seed. ĐỔI mật
khẩu admin mặc định (admin@cotuong.test / cotuong@2026).

**Gotcha**: model Lesson getRouteKeyName='slug' → route admin/progress phải bind `{lesson:id}`.
curl Git Bash mã hoá sai tiếng Việt khi POST (test qua trình duyệt/JSON file, không phải bug).

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

---

## Cập nhật 2026-08-25 — Pipeline PGN + Sát Pháp + Tàn Cuộc

**Đã xong & PUSH origin/main (commit 9ecbecf). Production CHƯA seed** — chạy:
`git fetch origin && git reset --hard origin/main` → `php artisan db:seed --class=Database\Seeders\ContentSeeder --force` → `php artisan optimize:clear && ... view:cache`.

**Parser PGN Hán tự** — `tools/pgn-decoder/decode-pgn.js` (dep iconv-lite, node_modules gitignore):
- Giải mã PGN biến thể TQ (GBK) → FEN + nước đi ký hiệu VN + biến trong ngoặc.
- Bài học rút ra khi viết parser (dễ sai lại): (1) tiền tố **前/后/中 đứng TRƯỚC quân** (`后车平五`
  = rear-Xe-bình-5), KHÔNG phải sau; (2) phải strip `\r` lẫn trong file GBK; (3) chú thích `{…}`
  thường **đặt tên thế sát** (`马后炮`=mã hậu pháo, `双车错`=song xe thác) — tách riêng, đừng nuốt
  vào token nước; (4) `step.fen` lưu là thế **SAU** nước (initial_fen = thế đầu); ICCS: cột a-i =
  0-8, digit = 9 - rank_nội_bộ (rank0=trên). Có `givesCheck()` phát hiện chiếu để caption đúng.
- Đã test: 38/40 TCSC sạch, 13/13 SCTD đội hình sạch (kết "chiếu hết", có biến).

**Lệnh `cotuong:import-pgn`** — mirror import-xqf; tự sinh caption từ dữ kiện ván cờ
(chiếu/ăn quân/chiếu hết/Tướng tránh đòn), KHÔNG suy diễn chiến thuật. Lưu JSON giải mã vào
source_assets. 1420 file PGN nằm ở `E:\Co Tuong Mr Thanh\LOP SAT CHIEU THUC DUNG\` (13 đội hình).

**Series #3 "Sát Pháp Thực Dụng — 13 Đội Hình"** (phase **trung-cuoc**, trước đó trống) — 13 bài
cơ bản→nâng cao xếp theo sức tấn công: 2 Xe (co-ban) → 1 Xe (trung-cap) → quân nhẹ Mã/Pháo/Chốt
(nang-cao). Mỗi bài 1 thế sát ngắn (5-9 nước) có mục "Biến cần lưu ý" (sinh tự động từ decoder).
Lesson ID 272-284. Nội dung bài giảng đội hình viết tay trong scratchpad `build-satphap.js`.

**Series #2 Tàn Cuộc** — thêm 4 bài (ID 88,101,163,191), tổng **10 bài**, order 1-10 theo cấp độ.

**Tổng content.json: 3 chuỗi / 37 bài published** (14 khai-cuoc + 10 tan-cuoc + 13 trung-cuoc).

**Còn có thể mở rộng**: mỗi đội hình sát pháp còn 30-200 file PGN chưa import (mới lấy 1 bài/đội
hình làm MVP); `TTTK VUOT QUAN AI` (359 file) và `TRUNG CUC SAT CHIEU` (104 file, dài 13-33 nước,
nâng cao) chưa dùng. Parser đã sẵn sàng import hàng loạt nếu cần.

---

## Cập nhật 2026-08-25 (2) — Chuyên đề Cờ Úp + SEO sitemap

**Kéo phụ đề video khóa học thầy Hà Văn Tiến** (breakthrough): 4 playlist "Lớp Cờ Úp" là
PRIVATE nhưng VIDEO LẺ là unlisted → `yt-dlp --write-auto-sub --sub-lang vi --sub-format json3
"https://www.youtube.com/watch?v=<ID>"` lấy được phụ đề Việt KHÔNG cần cookie (cookie Chrome/Edge
bị App-Bound Encryption khóa, không đọc được khi trình duyệt đang mở). User dán URL video từng khóa.

**Đã xong + PUSH (aa94010)**:
- **Nhập Môn Cờ Úp** (series #4): bài "Cờ Úp Là Gì? Luật Chơi Cờ Úp" (luật chuẩn, tự soạn).
- **Cờ Úp Sơ Cấp 1** (series #5): 10 bài soạn LẠI bằng lời riêng từ phụ đề thầy (mở Xe/Pháo sớm,
  định hình chiến thuật/điểm yếu, tuyệt đối hóa lợi thế, phòng thủ thế yếu, chuyển hóa ưu thế,
  cờ tàn thực dụng). game_mode=co-up, phase=null (tránh đếm nhầm giai đoạn cờ tướng + breadcrumb sạch).
- **SEO sitemap.xml động** + robots.txt (SitemapController) — gap lớn nhất của SEO plan.
- show.blade: chỉ render bàn cờ khi có FEN/nước đi (bài prose cờ úp hiển thị sạch).

**CÒN DANG DỞ**:
- **Sơ Cấp 2** (10 bài): phụ đề ĐÃ tải + trích text ở `scratchpad/subs2/bai1-10.txt`, nhưng agent
  chắt lọc DỪNG vì **chạm giới hạn chi tiêu tháng** (monthly spend limit). Chờ nâng hạn mức/chu kỳ mới.
- Chưa có URL: **Nâng Cao Đặc Biệt 2024**, **Đặc Biệt 02/2024**, **Cờ Úp Tàn Cuộc Tổng Hợp**.
- Cụm Nhập Môn Cờ Úp mới có 1 bài (cần thêm: khác cờ tướng, luật đuổi dài, giá trị quân úp, mẹo).

**Quy trình soạn bài cờ úp**: tải phụ đề → trích text json3 → (agent) chắt lọc ghi chú →
viết lại bằng lời riêng (bản quyền) → JSON vào scratchpad/coup-sc*/ → tinker glob upsert vào series.

**Deploy**: `git reset --hard origin/main` → `php artisan db:seed --class=Database\Seeders\ContentSeeder --force` → clear+cache. content.json: 5 chuỗi / 100 bài.

---

## Cập nhật 2026-08-25 (3) — Nhập môn cờ tướng + tính năng cộng đồng + GEO

**Xem `.claude/tien-do-va-ke-hoach.md`** — bảng điều khiển tiến độ + roadmap (6 chuỗi/108 bài).

Đã push (tới commit 0f8d7ca):
- **Nhập Môn Cờ Tướng (8 bài)** — luật chơi + 7 quân, bài quân có bàn cờ demo động (generator
  `scratchpad/gen-nhapmon.js` sinh steps từ nước đi coord). ⚠️ Slug bỏ dấu TRÙNG: Tượng vs Tướng →
  "cach-di-quan-tuong" → đã đổi Tướng thành "cach-di-quan-tuong-soai".
- **Bàn cờ quân úp**: board.js vẽ X/x (chip sấp mặt); component có chế độ tĩnh (ẩn Tiến/Lùi khi 0 nước);
  11 bài cờ úp có thế mở úp minh hoạ.
- **Đăng ký tài khoản** email/mật khẩu (role hoc_vien) — /dang-ky.
- **Bình luận + trả lời + Thích** (bảng lesson_comments/comment_likes, AJAX like/reply) + **chia sẻ FB/Zalo/copy**.
- **Tài khoản**: 5 bài đã học + "Hiện thêm"; trang chuyên đề tích ✓; bàn cờ luôn nền sáng (bỏ override --board-bg theme tối).
- **GEO (AI search)** như lapcamerahcm: `public/llms.txt`, robots mời AI bots + trỏ llms, `speakable` schema bài học.

**Còn treo**: Cờ Úp Sơ Cấp 2 (phụ đề đã tải `scratchpad/subs2/`, CHỜ nâng hạn mức chi tiêu — agent chắt lọc
dừng vì monthly spend limit) + 3 khóa cờ úp còn lại (chờ user dán URL). Xem roadmap để biết việc tiếp theo.

---

## Cập nhật 2026-08-26 — Hoàn tất Cờ Úp 4 khóa + admin + bảo mật + PageSpeed + sitemap index

- **Cờ Úp XONG cả 4 khóa của thầy** (soạn từ phụ đề, 3 agent chắt lọc song song): Sơ Cấp 1 (10) +
  Sơ Cấp 2 (10) + Nâng Cao Đặc Biệt (10) + Đặc Biệt 2 (10) + Nhập Môn (1) = **41 bài cờ úp**.
  Phụ đề gốc ở scratchpad/subs2, subs-nc, subs-db2. Build scripts: build-coup-sc2/nc/db2.js.
- **Bảo mật**: đã vá lỗi user thường vào /admin (thêm middleware `staff` = EnsureStaff/User::isStaff cho
  cả nhóm /admin; học viên hoc_vien → 403).
- **Admin**: duyệt bình luận (cột approved, mặc định chờ duyệt) + thống kê truy cập (page_visits +
  TrackVisit middleware) + dashboard nâng cấp + mobile responsive (sidebar off-canvas checkbox-hack).
- **PageSpeed**: font Google tải async (media=print/onload) + rút Bricolage 2 weight; sửa tương phản
  (--accent-ink); bỏ role=button sai trên nav-toggle.
- **Sitemap**: sitemap.xml thành CHỈ MỤC (sitemapindex) + 6 sitemap con động; robots.txt động.
  ⚠️ Bài học lớn (GSC "Không thể tìm nạp"): sitemap/robots PHẢI bọc withoutMiddleware(StartSession +
  cookie + CSRF) + Cache-Control public, nếu không StartSession gắn Set-Cookie + Cache-Control:private →
  Google từ chối. Và submit GSC KHÔNG có dấu / đầu (double-slash → 404).

**Tổng: 9 chuỗi / 191 bài.** Cụm SEO còn lại: Nhập môn cờ úp mở rộng, cụm F (landing thương hiệu), FAQPage
on-page từng bài. Xem `.claude/tien-do-va-ke-hoach.md`.
