# Học Cờ Tướng (hoccotuong.top) — Đánh giá & Kế hoạch nâng cấp

*Ngày đánh giá: 25/09/2026 · Phạm vi: trang chủ, Khai cuộc, Trung cuộc, Tàn cuộc, Cờ úp, Tin tức, 1 trang bài học, robots.txt, so sánh nhanh đối thủ trên Google.*

> Ghi chú: đánh giá dựa trên HTML công khai. Các mục đánh dấu **[cần kiểm tra]** chưa xác minh được từ bên ngoài (tốc độ tải, JSON-LD, dữ liệu Search Console) — nên xác nhận bằng PageSpeed Insights và Google Search Console trước khi sửa.

---

## 1. Tóm tắt nhanh

| Hạng mục | Điểm | Nhận xét ngắn |
|---|---|---|
| Nền tảng kỹ thuật SEO | 7/10 | Title/meta/OG/canonical đầy đủ, robots.txt + llms.txt tốt. Lỗi canonical phân trang. |
| Giao diện & trải nghiệm | 6/10 | Bàn cờ tương tác là điểm mạnh nhất, nhưng danh sách bài dùng ảnh chung, popup đăng nhập hiện ở mọi trang. |
| Chất lượng bài học | 5/10 | 690 bài nhưng lệch: Khai cuộc chỉ 30 bài, ~19 bài Cờ úp có **0 nước đi**, nhiều bài chỉ ~100–150 chữ. |
| Kiến trúc nội dung | 5/10 | Bài "Đề kiểm tra sát pháp" nằm trong Tàn cuộc, số liệu chuỗi bài lệch nhau, tên bài khó tìm kiếm. |
| SEO nội dung | 4/10 | Chưa nhắm nhóm từ khoá khai cuộc (nhu cầu tìm kiếm lớn nhất), Tin tức mỏng, chưa có trang trụ cột. |

**3 việc làm ngay (tuần này):**
1. ✅ **[25/09]** Sửa canonical trang phân trang (`?page=2` đang canonical về trang 1).
2. ✅ **[25/09]** Ẩn/xử lý các bài Cờ úp "0 nước đi" — bàn cờ trống làm mất giá trị cốt lõi của site.
3. ⏳ Đăng bài **"1 năm Lại Lý Huynh vô địch thế giới"** trước/đúng ngày **27/09** — dịp tìm kiếm tăng tự nhiên, site đã có sẵn cụm bài về anh. (Việc viết nội dung — chưa làm, cần phiên riêng.)

---

## 2. Điểm mạnh cần giữ

- **Khác biệt rõ ràng**: bàn cờ tương tác đi từng nước, có biến A/B, tự chạy, lật bàn, phím ←/→, vuốt. Đối thủ lớn (zigavn, tuongky, hoccotuongonline) chủ yếu là video hoặc chữ.
- **On-page cơ bản tốt**: title có từ khoá + năm, meta description viết tay, OG image 1200×630 riêng từng bài khai cuộc, breadcrumb, FAQ trên từng trang chuyên mục.
- **Trang chuyên mục có nội dung thật** (Trung cuộc, Tàn cuộc, Cờ úp đều có 300–500 chữ giải thích + FAQ) — nền tốt để thành trang trụ cột.
- **Cờ úp** là ngách ít đối thủ dạy bài bản — lợi thế lớn nếu làm tròn.
- robots.txt mở cho AI crawler + có `llms.txt` → có cơ hội xuất hiện trong AI Overviews/ChatGPT search.
- Có hệ thống tài khoản, lưu tiến độ, bình luận — nền cho tương tác người dùng.

---

## 3. Vấn đề phát hiện (xếp theo mức ưu tiên)

### 🔴 Cao

| # | Vấn đề | Bằng chứng | Tác động |
|---|---|---|---|
| 1 | Canonical phân trang sai | `/trung-cuoc?page=2` có `canonical: /trung-cuoc` | Google bỏ qua trang 2–14 → hàng trăm bài sâu khó được phát hiện qua link nội bộ |
| 2 | Bài Cờ úp không có nước đi | Bài 06–24 trong `/co-up` hiển thị "0 nước đi" | Bàn cờ trống = trang mỏng, trải nghiệm tệ, đúng ở mảng ngách mạnh nhất |
| 3 | Khai cuộc quá ít | Khai cuộc 30 bài vs Trung cuộc 319, Tàn cuộc 292 | Khai cuộc là nhóm từ khoá được tìm nhiều nhất (pháo đầu, bình phong mã, thuận pháo…) |
| 4 | Bài học trọng điểm quá mỏng | "Trung Pháo Đối Bình Phong Mã" chỉ 6 nước, ~120 chữ | Từ khoá lớn nhưng trang không đủ sâu để cạnh tranh top |
| 5 | Diễn giải từng nước có thể chỉ render bằng JS **[cần kiểm tra]** | Bản HTML tải về chỉ thấy tiêu đề "Diễn giải từng nước 6 nước", không thấy nội dung | Nếu Google không thấy lời bình → mất phần nội dung giá trị nhất |

### 🟠 Trung bình

| # | Vấn đề | Bằng chứng |
|---|---|---|
| 6 | ✅ **[25/09]** Sai chuyên mục | "[Đề Kiểm Tra Sát Pháp] Bài 60–86" nằm đầu trang **Tàn cuộc**, trong khi đó là bài tập sát pháp (trung cuộc). **Đã sửa**: 66 bài (đúng bằng tiêu đề chứa "Đề Kiểm Tra Sát Pháp") đổi `phase` từ `tan-cuoc` → `trung-cuoc`. 178 bài "Tàn Cuộc Định Thức" cùng chuỗi giữ nguyên (nội dung tàn cuộc thật, không phải bug). |
| 7 | ✅ **[25/09] Một phần** Tên bài khó tìm kiếm | Tiền tố ngoặc vuông tốn ký tự title. **Đã sửa**: bỏ tiền tố `[...]` ở 332 bài (`[Nâng Cao]`, `[Tàn Cuộc Định Thức]`, `[Sát Pháp Trung Cuộc]`, `[Đề Kiểm Tra Sát Pháp]`) — chỉ xoá tiền tố dư thừa, KHÔNG viết lại thứ tự từ khoá (việc đó cần biên tập tay từng bài, xem mục 5.2). |
| 8 | ✅ **[25/09]** Ảnh đại diện chung | Đã sinh bù 117 thumbnail còn thiếu (xem mục 6) — không còn bài nào rơi về `icon-512.png` (trừ bài mới thêm sau lần export gần nhất). |
| 9 | ✅ **[25/09] Một phần** Lỗi chính tả/không dấu | Chạy `cotuong:clean-titles` sửa 146 bài; từ điển `xiangqi-terms.php` vẫn thiếu nhiều cụm — còn sót lại. |
| 10 | ✅ **[25/09]** Thứ tự bài lộn | Chạy `cotuong:organize-series` — đánh lại 1..N cho 434 bài (chuỗi Sát Pháp Đại Toàn). |
| 11 | ✅ **[25/09]** Số liệu không khớp | `planned_total=200` của chuỗi Sát Pháp Đại Toàn đã lỗi thời (thực tế 435 bài, vượt xa) → đã xoá để không hiện "X / 200 dự kiến" gây hiểu lầm. "Nhập Môn Cờ Úp chỉ 1 bài" — số đúng như thực tế (còn thiếu nội dung), không phải lỗi hiển thị; cần viết thêm bài (xem mục 5.4, việc nội dung). |
| 12 | Popup đăng nhập ở mọi trang | Khối "Đăng nhập để học có lộ trình" xuất hiện trên mọi URL | Trên mobile có thể bị Google coi là interstitial gây phiền |

### 🟡 Thấp

- Tin tức: 9 bài cùng ngày 15/09/2026, 4–7 lượt xem, thiếu ảnh riêng.
- "Tài khoản" và "Đăng nhập" trên menu cùng trỏ `/tai-khoan` — gộp thành một nút.
- Title chuyên mục chứa "2026" → nhớ cập nhật sang 2027 vào tháng 1.
- Mục "Video Hướng Dẫn" nói về video của kỳ thủ khác — chỉ nên nhúng video công khai chính chủ kèm phân tích riêng; **không** dùng lại nội dung từ kho video YouTube riêng tư (có bản quyền).

---

## 4. Kế hoạch giao diện (UI/UX)

### 4.1 Hệ thống thiết kế

| Thành phần | Đề xuất |
|---|---|
| Màu chính | Giữ đỏ son `#c8451f` (quân Đỏ) · mực `#1c1917` (quân Đen) · nền giấy `#faf6ef` · gỗ bàn cờ `#e8c98f` · xanh gợi ý `#2f7d6d` |
| Chế độ tối | Nền `#1a1714`, bàn cờ gỗ tối, giữ tương phản chữ ≥ 4.5:1 |
| Font | Tiêu đề: *Noto Serif* hoặc *Lora* (có dấu tiếng Việt đẹp, hợp chất cổ điển) · Nội dung: *Be Vietnam Pro* |
| Biểu tượng | Dùng chữ Hán quân cờ (車 炮 馬 將 兵) làm icon chuyên mục — đã có, nên thống nhất kiểu dáng tròn như quân cờ thật |
| Nhãn cấp độ | Cơ bản = xanh lá · Trung cấp = cam · Nâng cao = đỏ; hiển thị dạng chip |

### 4.2 Trang chủ

Thứ tự khối đề xuất:
1. **Hero**: câu giá trị + bàn cờ chạy tự động một thế sát đẹp + 2 nút "Tôi mới học" / "Tôi đã biết chơi".
2. **Thế cờ hôm nay** (puzzle hằng ngày, đổi mỗi 0h) — lý do để quay lại mỗi ngày.
3. **Lộ trình 4 bước** dạng timeline: Nhập môn → Khai cuộc → Trung cuộc → Tàn cuộc (+ nhánh Cờ úp), mỗi bước có % hoàn thành nếu đã đăng nhập.
4. **Tiếp tục bài đang học** (người đã đăng nhập).
5. Bài nổi bật — thay bài 6 nước bằng bài có chiều sâu.
6. Chương trình học → Tin mới → FAQ.

> **Cập nhật 25/09/2026**: khảo sát code (không chỉ nhìn HTML production như audit gốc) cho thấy
> phần lớn mục 4.3 **đã có sẵn** từ trước: layout 2 cột sticky desktop (`xqboard-split`/`board-col`
> trong `app.css`), bàn cờ dính đầu màn hình khi cuộn trên mobile, thanh tiến độ "Nước N/M", nút
> Bài trước/Bài tiếp, chế độ **Đoán nước** (`mode=puzzle` trong `chess-board.blade.php` +
> `initPuzzle()` trong `board.js`) — chỉ là audit không bấm thử nên không thấy. Đã làm thêm:
> - ✅ Mở khoá "Đoán nước" cho 469 bài còn thiếu (102 → 571/571 bài có nước đi) — suy `puzzle_side`
>   từ bên đi nước đầu tiên (`steps[0].move_side`), xác nhận khớp 100% trên mẫu ngẫu nhiên trước khi chạy.
> - ✅ Bộ lọc trang danh sách (`/khai-cuoc`, `/trung-cuoc`...): cấp độ, độ dài (ngắn/vừa/dài),
>   đã học/chưa học (đăng nhập) — dùng link GET thuần (không cần JS), canonical tự bỏ query lọc
>   để không tạo trang trùng lặp, chỉ hiện khi mục có > 12 bài. Card danh sách giờ có dấu ✓ đã học.
> - ✅ **"Thế cờ hôm nay"** (mục 4.2 #2) — thẻ trên trang chủ, chọn xoay vòng theo ngày (đổi lúc
>   0h UTC = 7h VN) trong 571 bài có "Đoán nước", link kèm `#giai-do` tự mở sẵn chế độ giải khi
>   vào bài. Không cache riêng (query nhẹ, đã đủ nhanh).
> - ⏸️ **Chưa làm** (cần xác nhận trực quan, phiên này không có công cụ chụp màn hình/trình duyệt):
>   gộp nút phụ (📋 ⛶ ⟲ ▶) vào menu "⋯" trên mobile. Đây là thay đổi thuần thị giác — nên làm ở
>   phiên có thể xem trực tiếp trên trình duyệt để tránh sửa mù.

### 4.3 Trang bài học (quan trọng nhất)

**Desktop (≥1024px):** 2 cột — bàn cờ *sticky* bên trái (~55%), bên phải là danh sách nước đi dạng ký hiệu (`1. Pháo 2 bình 5 — Mã 8 tiến 7`) bấm được, lời bình của nước đang chọn nổi bật ngay dưới.

**Mobile:** bàn cờ full-width dính đầu màn hình, thanh điều khiển 4 nút lớn (Đầu / Lùi / Tiến / Cuối) ngay dưới bàn, lời bình hiện trong ô cuộn phía dưới; ẩn bớt nút phụ (📋 ⛶ ⟲ ▶) vào menu "⋯".

**Tính năng nên thêm:**
- **Chế độ "Đoán nước"**: ẩn nước tiếp theo, người học tự đi trên bàn, đúng thì chạy tiếp — biến bài xem thành bài luyện (tăng thời gian trên trang rõ rệt).
- Mũi tên + ô tô màu gợi ý trên bàn cờ tại nước then chốt.
- Thanh tiến độ "Nước 12/57".
- Nút **Bài trước / Bài tiếp** trong cùng chuỗi (hiện chỉ có "Bài liên quan").
- Đánh dấu "Đã học" rõ hơn + gợi ý bài kế tiếp ngay khi xem hết.

### 4.4 Trang danh sách (chuyên mục / chương trình)

- **Ảnh thumbnail tự sinh từ thế cờ** cho mọi bài (site đã có pipeline tạo OG cho khai cuộc → áp dụng cho toàn bộ 690 bài + tin tức).
- Bộ lọc: cấp độ, số nước (ngắn <10 / vừa / dài >30), chủ đề (Song Xe, Pháo Mã…), đã học/chưa học.
- Nhóm bài theo **chuỗi** thay vì một danh sách phẳng 14 trang.
- Card hiển thị: thumbnail · tên ngắn · chip cấp độ · số nước · ✓ nếu đã học.

### 4.5 Popup đăng nhập

Chỉ hiện khi: đã xem hết ≥ 2 bài **hoặc** bấm "Đánh dấu đã học"/bình luận. Không hiện khi vừa vào từ Google. Dạng thanh trượt dưới đáy thay vì modal che nội dung.

---

## 5. Tối ưu bài học

### 5.1 Cấu trúc lại chuyên mục

```
Nhập môn            → luật, cách đi từng quân, ký hiệu ghi nước, mẹo người mới
Khai cuộc           → theo hệ khai cuộc (Pháo đầu, Thuận pháo, Nghịch pháo, Bình phong mã, Phi tượng, Tiên nhân chỉ lộ, Quá cung pháo, Sĩ giác pháo, Khởi mã…)
Trung cuộc          → chiến thuật, kế hoạch, đổi quân + các thế sát theo mô hình
Tàn cuộc            → chỉ tàn cuộc lý thuyết/thực dụng (48 bài nguyên lý + mở rộng)
Bài tập & Cờ thế    → MỚI: Đề kiểm tra sát pháp, Sát Pháp Đại Toàn, cờ thế giang hồ, puzzle hằng ngày
Cờ úp               → luật, khai cuộc (khui quân), trung cuộc, tàn cuộc, ván mẫu
```

→ Chuyển toàn bộ "Đề Kiểm Tra Sát Pháp" và phần lớn "Sát Pháp Kinh Điển/Đại Toàn" sang **Bài tập & Cờ thế**. Trang Trung cuộc và Tàn cuộc sẽ sạch và đúng ý định tìm kiếm hơn.

### 5.2 Chuẩn đặt tên bài

| Hiện tại | Đề xuất |
|---|---|
| [Sát Pháp Kinh Điển] Cuộc 12 — Bác Vọng Thiêu Đồn | Thế sát Hoả công: Bác Vọng Thiêu Đồn — Sát Pháp Đại Toàn #12 |
| [Đề Kiểm Tra Sát Pháp] Bài Số 62 — Song Xe Thay Nhau Đâm Sâu Vào Cung | Bài tập sát Song Xe: thay nhau đâm cung (Đề 62) |
| Trung Pháo Đối Bình Phong Mã — Khai Cuộc Có Biến | Pháo Đầu đối Bình Phong Mã: các biến chính cho người mới |

Quy tắc: **từ khoá mô hình/khai cuộc đứng đầu** · tên riêng Hán Việt ở giữa · số thứ tự ở cuối · title ≤ 60 ký tự · bỏ ngoặc vuông.

### 5.3 Khuôn mẫu một bài học chuẩn

1. **H1** chứa từ khoá chính.
2. **Bạn sẽ học được** (2–3 gạch đầu dòng).
3. Bàn cờ tương tác.
4. **Ý tưởng chính** (150–300 chữ, HTML thuần — Google đọc được).
5. **Diễn giải các nước then chốt** — in sẵn trong HTML dưới dạng danh sách có ký hiệu nước (không chỉ trong JS).
6. **Sai lầm thường gặp** (2–3 ý).
7. **Tự kiểm tra**: 1–3 thế cờ nhỏ dùng chế độ "Đoán nước".
8. Bài trước / Bài tiếp trong chuỗi · Bài liên quan · Bình luận.

Độ dài mục tiêu: bài khai cuộc/trụ cột ≥ 800 chữ · bài thường 400–600 chữ · bài tập/cờ thế 150–300 chữ nhưng gom vào trang hub.

### 5.4 Xử lý các bài Cờ úp "0 nước đi" (bài 06–24)

Chọn một trong hai (ưu tiên A):
- **A.** Bổ sung ván mẫu/thế minh hoạ có nước đi cho từng bài (mỗi bài 1–3 thế).
- **B.** Tạm thời đổi sang định dạng "bài lý thuyết": ẩn bàn cờ và nhãn "0 nước đi", dùng sơ đồ tĩnh có chú thích; bổ sung nước đi dần.

Đồng thời tách chuỗi "Nhập Môn Cờ Úp" (hiện 1 bài) thành 5–8 bài: luật lật quân · binh chủng theo ô xuất phát · Sĩ/Tượng khi lật · luật hoà/thắng · xác suất quân úp · 5 nước khai cuộc chuẩn.

### 5.5 Mở rộng Khai cuộc (30 → 120+ bài trong 3 tháng)

Mỗi hệ khai cuộc = 1 trang trụ cột + 5–10 bài biến:

| Hệ khai cuộc | Bài trụ cột | Bài biến gợi ý |
|---|---|---|
| Pháo đầu (Trung pháo) | Pháo đầu toàn tập | đối Bình phong mã, đối Phản cung mã, đối Đơn đề mã, Thuận pháo, Nghịch pháo, Liệt pháo |
| Bình phong mã | Bình phong mã: cách phòng thủ Pháo đầu | Tả mã bàn hà, Hữu hoành xe, Tốt 3/Tốt 7 |
| Phi tượng cuộc | Phi tượng: khai cuộc vững chắc | đối Sĩ giác pháo, đối Quá cung pháo, đối Tiên nhân chỉ lộ |
| Tiên nhân chỉ lộ | Tiên nhân chỉ lộ (tiến Tốt 3/7) | đối Tốt để, đối Pháo 2 bình 3 |
| Khởi mã cuộc | Khởi mã cuộc | đối Tốt 7, chuyển Pháo đầu |
| Quá cung pháo, Sĩ giác pháo | trang riêng mỗi hệ | 3–5 biến |

Nguồn soạn: thư viện PDF sách cờ + kiến thức từ video riêng tư **viết lại bằng lời mình** (không chép nguyên văn, không trích video).

---

## 6. SEO kỹ thuật — checklist cho dev (Laravel)

> **Đợt sửa 25/09/2026** (session `laravel13-shop`, phạm vi "thuần code, không viết nội dung"):
> tất cả mục dưới đây ĐÃ XONG local + đã smoke-test (curl các trang chính, kiểm tra canonical/
> alt/schema/redirect thực tế) — **CHƯA commit/deploy production**, người dùng tự xem lại diff
> trước khi commit. Chi tiết implementation:

- [x] **Canonical phân trang tự trỏ**: `layouts/app.blade.php` — canonical + `og:url` giữ `?page=N` (N>1); title 3 trang danh sách (phase/tin-tức/chuyên mục tin tức) thêm " — Trang N"; đã thêm `<link rel="prev">`/`rel="next">` (trước đây hoàn toàn không có ở `<head>`, chỉ có trên nút bấm).
- [x] **Render lời bình từng nước phía server**: `components/chess-board.blade.php` — danh sách nước đi (`data-xq-list`) giờ render sẵn bằng Blade từ `$payload` (ký hiệu nước + lời bình thật, đọc được ngay trong view-source, không đợi JS). `public/js/board.js` sửa 1 dòng (`list.innerHTML=''` trước khi dựng lại) để không bị nhân đôi khi JS enhance lại. Đã verify bằng `curl` — HTML trả về có đủ text lời bình.
- [x] **Schema JSON-LD**: `educationalLevel` đã có sẵn từ trước (không như audit ghi); bổ sung `timeRequired` (ISO 8601, ước lượng theo số nước — accessor `Lesson::time_required_iso`). `BreadcrumbList`/`Course`/`FAQPage` đã đầy đủ từ trước, không cần sửa. `VideoObject` chưa áp dụng (site chưa có video nhúng hợp lệ — xem ghi chú bản quyền CLAUDE.md).
- [x] **Sitemap tách nhóm**: ĐÃ CÓ SẴN từ trước (khảo sát 25/09 xác nhận `SitemapController` đã tách theo section + `lastmod` thật) — audit gốc ghi nhầm, không cần sửa gì.
- [x] **Thumbnail riêng + alt**: sửa 5 chỗ `alt=""` rỗng (phase/series/show/home) → alt mô tả theo tên bài/chuỗi. Chạy `node tools/og-image/generate.cjs --missing` + `optimize.py` (đã fix thêm 1 lỗi encoding Windows trong script) — sinh bù 117 ảnh thumbnail còn thiếu, 0 lỗi.
- [x] **Redirect 301 khi đổi slug**: bảng mới `url_redirects` (migration + model `UrlRedirect::record()`/`lookup()`, tự gộp chain A→B→C). Gắn vào 3 điểm có thể đổi slug bài học: `Admin\LessonController::update()` (checkbox reslug), `cotuong:clean-titles --reslug`, `cotuong:organize-series --reslug`. Route `/bai-hoc/{slug}` đổi từ implicit binding sang tra thủ công để fallback 301 khi không tìm thấy slug. Đã test end-to-end (301 đúng đích, slug lạ vẫn 404 bình thường).
- [x] **Core Web Vitals**: hầu hết đã tốt sẵn (`defer` script, `loading=lazy`, font async) — audit gốc đánh giá đúng nhưng chưa kiểm tra kỹ. Gap thật duy nhất: ảnh Tin tức admin upload thẳng không nén/không WebP → đã nối `intervention/image-laravel` (có sẵn trong composer.json nhưng chưa dùng) vào `Admin\PostController` — resize tối đa 1200px + encode WebP khi upload.
- [x] **Popup đăng nhập**: đổi từ modal chặn toàn màn hình (hiện sau 2 phút, mọi trang) sang thanh trượt góc dưới không che nội dung, KHÔNG hiện ở lượt xem đầu (chỉ hiện từ bài học thứ 2 trong phiên trở đi, sau 15s).
- [x] **Sửa chính tả tên bài**: chạy `cotuong:clean-titles` (không kèm `--reslug` → giữ nguyên URL) — 146 bài được chuẩn hoá. ⚠️ Từ điển `config/xiangqi-terms.php` vẫn còn thiếu nhiều cụm (vd "Tuyến Cuộc", "Tổng Kết Chiến Thuật" chưa map) — phần còn thiếu để lại cho đợt sau vì cần tra đúng nghĩa Hán Việt, không đoán bừa.
- [x] **(Ngoài checklist, phát hiện khi làm)** Sửa luôn bug #10 mục 3 (thứ tự bài lộn xộn): chạy `cotuong:organize-series` — đánh lại `order_in_series` 1..N cho 434 bài trong chuỗi "Tượng Kỳ Kinh Điển Sát Pháp Đại Toàn" (chuỗi lớn nhất, lệch nhiều nhất). Sửa luôn nhãn "0 nước đi" gây hiểu lầm ở 36 bài Cờ úp chưa có nước minh hoạ → đổi thành "Lý thuyết"/"Bài lý thuyết" (accessor `Lesson::move_count_label`/`move_count_badge`) — chọn phương án B ở mục 5.4 (không viết nội dung minh hoạ mới).
- [ ] **Gắn Google Search Console + GA4**: đã chuẩn bị sẵn phần code (`config/site.php` → `SITE_GA4_ID`/`SITE_GSC_VERIFICATION` trong `.env`, tự chèn `gtag.js` + thẻ xác minh khi có giá trị) nhưng **CẦN chính chủ đăng nhập Google** để tạo property GA4 + xác minh GSC — không thể tự làm thay. Sau khi có 2 giá trị này, chỉ cần điền `.env` là xong, không cần sửa code thêm.

---

## 7. Kế hoạch SEO nội dung

### 7.1 Bản đồ cụm từ khoá (Pillar → Cluster)

*Mức nhu cầu là ước lượng định tính — xác nhận lại bằng Google Keyword Planner/GSC.*

| Trụ cột (trang chính) | Từ khoá cụm | Nhu cầu | Cạnh tranh |
|---|---|---|---|
| **Cách chơi cờ tướng cho người mới** (`/nhap-mon`) | luật cờ tướng, cách xếp cờ tướng, các quân cờ tướng, cách đi quân mã/pháo, cách ghi biên bản cờ tướng, cờ tướng cho trẻ em | Rất cao | Cao |
| **Khai cuộc cờ tướng** (`/khai-cuoc`) | pháo đầu, bình phong mã, thuận pháo, nghịch pháo, phi tượng cuộc, tiên nhân chỉ lộ, quá cung pháo, đơn đề mã, phản cung mã | Cao | Trung bình |
| **Các thế sát cờ tướng** (hub mới) | mã hậu pháo, song xe sát, nhị quỷ gõ cửa, bạch mã hiện đề, thiết môn xuyên, đại đảm xuyên tâm | Trung bình | Thấp–TB |
| **Tàn cuộc cờ tướng** (`/tan-cuoc`) | xe thắng sĩ tượng bền, mã tốt thắng sĩ, pháo tốt thắng, tàn cuộc hoà | Trung bình | Thấp |
| **Cờ thế / bài tập** (hub mới) | cờ thế giang hồ, thế cờ tàn hay, thất tinh tụ hội, bài tập cờ tướng | Trung bình | Thấp |
| **Cờ úp** (`/co-up`) | cờ úp là gì, luật cờ úp, mẹo chơi cờ úp, cách thắng cờ úp, cờ úp online | Trung bình–cao, đang tăng | **Thấp** ⭐ |
| **Kỳ thủ & giải đấu** (`/tin-tuc`) | Lại Lý Huynh, Nguyễn Thành Bảo, Trần Quyết Thắng, giải vô địch cờ tướng thế giới 2027, giải A1 | Theo sự kiện | Trung bình |
| **Thuật ngữ cờ tướng** (trang mới) | tiến thoái bình là gì, ngòi pháo, cản chân mã, lộ mặt tướng, thí quân | Trung bình | Thấp |

**Đối thủ chính trên SERP**: tuluyencotuong.com (nền tảng học có lộ trình — đối thủ trực tiếp nhất), hoccotuongonline.com, kydao.net (khai cuộc theo ván danh thủ), zigavn.com, tuongky.vn, hoanghamobile.com (bài "cách chơi"). Lợi thế để vượt: bàn cờ tương tác + chế độ đoán nước + cờ úp chuyên sâu.

### 7.2 Nguyên tắc liên kết nội bộ

- Mỗi bài cụm link **lên** trang trụ cột bằng anchor chứa từ khoá (vd: "xem thêm [khai cuộc Pháo đầu](…)").
- Trang trụ cột link **xuống** tất cả bài cụm, nhóm theo biến.
- Bài tin tức về ván đấu → link tới bài khai cuộc/thế sát xuất hiện trong ván.
- Mỗi bài học ≥ 3 link nội bộ ngữ cảnh (không tính khối "Bài liên quan").

### 7.3 Lịch nội dung 12 tuần (bắt đầu 28/09/2026)

Nhịp: **4 bài/tuần** (2 bài học mới/nâng cấp + 1 bài hướng dẫn chữ + 1 tin/phân tích).

| Tuần | Trọng tâm | Bài chính |
|---|---|---|
| 0 (25–27/09) | Dịp sự kiện | ⭐ "1 năm Lại Lý Huynh vô địch thế giới: phân tích ván chung kết với Doãn Thăng" (bàn cờ tương tác; đối chiếu biên bản từ nguồn chính thống) |
| 1 | Nhập môn | Trụ cột "Cách chơi cờ tướng cho người mới từ A–Z" · Cách xếp bàn cờ · Cách ghi biên bản |
| 2 | Nhập môn | Cách đi quân Mã & luật cản chân mã · Quân Pháo & ngòi · 10 mẹo cho người mới |
| 3 | Khai cuộc | Trụ cột "Khai cuộc Pháo đầu toàn tập" · Pháo đầu đối Bình phong mã (viết lại bài 6 nước) |
| 4 | Khai cuộc | Thuận pháo · Nghịch pháo · Pháo đầu đối Phản cung mã |
| 5 | Cờ úp | Trụ cột "Luật cờ úp đầy đủ" (nâng cấp) · Xác suất quân úp · 5 nước khai cuộc cờ úp |
| 6 | Cờ úp | Hoàn thiện 8 bài cờ úp đang 0 nước · "10 mẹo thắng cờ úp" |
| 7 | Thế sát | Hub "Các thế sát cờ tướng phải thuộc" · Mã hậu pháo · Song xe sát |
| 8 | Thế sát | Nhị quỷ gõ cửa · Bạch mã hiện đề · Thiết môn xuyên |
| 9 | Khai cuộc | Trụ cột Phi tượng cuộc · Tiên nhân chỉ lộ · Quá cung pháo |
| 10 | Tàn cuộc | Xe thắng Sĩ Tượng bền · Mã Tốt thắng Sĩ · Khi nào tàn cuộc hoà |
| 11 | Cờ thế | Hub "Cờ thế giang hồ" · Thất tinh tụ hội · Dã mã tào điền |
| 12 | Thuật ngữ + tổng kết | "Từ điển thuật ngữ cờ tướng" · Rà soát, cập nhật bài tuần 1–4 theo dữ liệu GSC |

Song song mỗi tuần: đổi tên + thêm nội dung cho ~20 bài sát pháp cũ theo chuẩn mục 5.2–5.3.

### 7.4 Kéo traffic ngoài Google

- **Puzzle hằng ngày** → đăng ảnh thế cờ + link lên Fanpage, nhóm Facebook cờ tướng, Zalo OA.
- **Video ngắn tự quay** (màn hình bàn cờ của chính site, giọng mình): Shorts/TikTok 30–60 giây mỗi thế sát → link về bài.
- Liên hệ CLB cờ tướng, câu lạc bộ trường học để được dẫn link làm tài liệu học.
- Cho nhúng bàn cờ (embed) vào site khác kèm link nguồn → backlink tự nhiên.

---

## 8. Lộ trình 90 ngày

| Giai đoạn | Thời gian | Việc chính |
|---|---|---|
| **Sửa nền** | Tuần 1–2 | ✅ **[25/09] Xong phần code** — canonical phân trang · render lời bình server-side · xử lý bài 0 nước (đổi nhãn, chưa viết ván mẫu) · popup đăng nhập · sửa tên lỗi + thứ tự bài (434 bài) · thumbnail tự sinh cho mọi bài · redirect 301. Còn lại: GSC/GA4 (cần chính chủ), commit + deploy production |
| **Cấu trúc & giao diện** | Tuần 3–6 | Tách "Bài tập & Cờ thế" + 301 · giao diện bài học 2 cột/mobile mới · bộ lọc danh sách · Bài trước/Bài tiếp · trang chủ mới + puzzle hằng ngày |
| **Tăng tốc nội dung** | Tuần 3–12 | Lịch 12 tuần mục 7.3 · Khai cuộc lên 120+ bài · chế độ "Đoán nước" · schema đầy đủ |

---

## 9. Chỉ số theo dõi (KPI)

| Chỉ số | Hiện tại | Mục tiêu 90 ngày |
|---|---|---|
| Số trang được index (GSC) | [cần kiểm tra] | ≥ 90% URL trong sitemap |
| Lượt hiển thị Google/tháng | [cần kiểm tra] | ×3 so với tháng 9 |
| Từ khoá top 10 | [cần kiểm tra] | ≥ 30 (ưu tiên cụm cờ úp + khai cuộc) |
| Thời gian trung bình trên trang bài học | [cần kiểm tra] | ≥ 3 phút |
| Tỷ lệ xem hết bài (tới nước cuối) | [cần kiểm tra] | ≥ 40% |
| Tài khoản đăng ký mới/tháng | [cần kiểm tra] | Đặt mốc sau tháng đầu đo |

---

## Nguồn tham khảo

- Trang được đánh giá: [hoccotuong.top](https://hoccotuong.top) · [/trung-cuoc](https://hoccotuong.top/trung-cuoc) · [/tan-cuoc](https://hoccotuong.top/tan-cuoc) · [/co-up](https://hoccotuong.top/co-up) · [/tin-tuc](https://hoccotuong.top/tin-tuc) · [robots.txt](https://hoccotuong.top/robots.txt)
- Đối thủ: [tuluyencotuong.com](https://tuluyencotuong.com/) · [hoccotuongonline.com](https://hoccotuongonline.com/) · [kydao.net](https://kydao.net/khai-cuc) · [zigavn.com](https://zigavn.com/cotuong/hoc-choi-co-tuong-voi-72-bai-hoc-can-ban)
- Sự kiện Lại Lý Huynh vô địch 27/09/2025: [VnExpress](https://vnexpress.net/lai-ly-huynh-vo-dich-co-tuong-the-gioi-pha-the-doc-ton-cua-trung-quoc-4944406.html) · [Tuổi Trẻ](https://tuoitre.vn/nhin-lai-hanh-trinh-vo-dich-co-tuong-the-gioi-cua-ky-thu-lai-ly-huynh-20250927162923148.htm)
