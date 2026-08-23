# Kế hoạch triển khai: Web Học Cờ Tướng & Cờ Úp
> Tài liệu bàn giao cho Claude Code — pipeline Agent khai thác video YouTube (riêng tư, có bản quyền — chỉ dùng làm tài liệu nội bộ, KHÔNG public) + kho sách PDF → sinh bài học có bàn cờ tương tác (Cờ Tướng + Cờ Úp), tích hợp vào site Laravel có sẵn (tái sử dụng từ codebase bán hàng).

---

## 0. Bối cảnh & ràng buộc

- Site nền: **Laravel** đã hoàn thiện (từng dùng cho bán hàng — Lắp Camera HCM), tái sử dụng module Products→Lessons, Categories, Admin CRUD, SEO fields, sitemap.
- Nguồn nội dung:
  1. **Playlist YouTube riêng tư**, đã sắp xếp sẵn theo chủ đề khai cuộc (Pháo đầu, Thuận Pháo...). **Video có bản quyền — chỉ dùng làm tài liệu tham khảo để viết bài học, KHÔNG nhúng/hiển thị/liên kết video ra site công khai dưới bất kỳ hình thức nào.**
  2. **Kho sách PDF** trên máy tính người dùng — đưa vào thư mục thư viện cục bộ để Agent đọc và trích xuất, cũng chỉ dùng làm tài liệu tham khảo, nội dung public phải viết lại hoàn toàn bằng lời văn riêng.
- Bàn cờ tương tác: dùng **xiangqi.js** (logic nước đi/FEN) + **xiangqiboard.js** (UI kéo-thả), bộ quân SVG tự thiết kế riêng.
- Bàn cờ phải hỗ trợ **2 chế độ**: Cờ Tướng thường và **Cờ Úp** (quân úp, xáo trộn ngẫu nhiên, lật dần theo nước đi) — đây là môn đang thịnh hành ở Việt Nam nhưng thị trường nội dung còn rất mỏng, là cơ hội SEO lớn.
- Chiến lược tài nguyên: **làm xong Cờ Tướng trước, sau đó tái sử dụng gần như toàn bộ hạ tầng (bàn cờ, schema, pipeline Agent, admin) để làm Cờ Úp** — vì luật đi quân giống hệt cờ tướng, chỉ khác cơ chế úp/lật quân lúc đầu ván.
- Mỗi bài học lưu dưới dạng chuỗi **FEN theo từng bước** + chú thích, để bàn cờ tự render lại từng nước đi khi người học đọc bài.

---

## 1. Kiến trúc dữ liệu (Laravel migrations)

```
lessons
├─ id
├─ category_id        (FK → categories: Cờ Tướng / Cờ Úp / Khai cuộc / Trung cuộc / Tàn cuộc)
├─ game_mode           (enum: co-tuong | co-up)
├─ title
├─ slug
├─ level               (enum: co-ban | trung-cap | nang-cao)
├─ source_type         (enum: video | pdf | mixed)
├─ source_ref          (video_id nội bộ hoặc tên file pdf gốc — CHỈ dùng để Agent/admin truy vết, KHÔNG public, không có field video_url công khai)
├─ summary             (mô tả ngắn, dùng làm meta description)
├─ content_md           (nội dung diễn giải, viết lại hoàn toàn — không copy nguyên văn nguồn)
├─ status               (draft | review | published)
├─ seo_title, seo_description
└─ timestamps

lesson_steps
├─ id
├─ lesson_id      (FK)
├─ step_order
├─ fen              (trạng thái bàn cờ tại bước này)
├─ move_notation    (ký hiệu nước đi, ví dụ: "C2.5")
├─ caption          (chú thích hiển thị cùng bước)
├─ is_flip_reveal    (boolean — riêng cho Cờ Úp: đánh dấu bước này là lúc quân được lật mở)
└─ highlight_squares (json, ô cần tô sáng)

source_assets   (BẢNG NỘI BỘ — không expose qua API/route công khai)
├─ id
├─ type            (youtube | pdf)
├─ external_ref    (video_id hoặc file path — lưu nội bộ)
├─ raw_transcript / raw_text   (văn bản gốc trích xuất, chỉ dùng để đối chiếu khi viết bài, KHÔNG public, KHÔNG trả về qua API)
├─ processed        (boolean — đã qua Agent xử lý thành lesson chưa)
└─ linked_lesson_id (FK → lessons, nullable)
```

> Lưu ý bảo mật: `source_assets` và các field `raw_transcript`/`raw_text` phải nằm ngoài mọi route public, không đưa vào sitemap, không cho phép index, chỉ truy cập qua admin nội bộ.

---

## 2. Pipeline Agent — Giai đoạn khai thác nguồn (chỉ để viết bài, không public nguồn)

### 2A. Nhánh YouTube (video khai cuộc — có bản quyền, dùng nội bộ)
1. **Thu thập danh sách video**: xuất danh sách `video_id` + tiêu đề + playlist chủ đề (export từ YouTube Studio hoặc qua YouTube Data API nếu cấp OAuth).
2. **Lấy transcript**: dùng YouTube Data API / `yt-dlp --write-auto-sub` để lấy phụ đề. Vì video riêng tư và có bản quyền, Agent chạy với cookie/OAuth của chính chủ tài khoản; transcript lưu trong `source_assets`, **không bao giờ xuất ra ngoài, không nhúng video, không dẫn link video trên site công khai**.
3. **Trích xuất nước đi**: Agent đọc transcript, nhận diện chuỗi nước đi cờ tướng được nhắc tới (ví dụ "Pháo hai bình năm" → ký hiệu chuẩn). Cần bảng quy đổi ký hiệu Việt hóa ↔ ký hiệu chuẩn (WXF notation) làm prompt chuẩn cho Agent.
4. **Sinh FEN từng bước**: dùng `xiangqi.js` (chạy qua Node) để convert chuỗi nước đi → FEN từng bước, lưu vào `lesson_steps`.
5. **Viết lại nội dung bài học**: Agent tổng hợp thành bài viết mạch lạc bằng lời văn hoàn toàn mới (không diễn giải sát câu chữ transcript), có mở bài giải thích ý tưởng khai cuộc, diễn giải từng nước, kết luận ưu/nhược điểm thế trận.
6. Bài học public **chỉ gồm**: bàn cờ tương tác + nội dung viết lại. Không có phần "xem video gốc".

### 2B. Nhánh sách PDF
1. **Chuẩn hóa thư viện**: đặt toàn bộ PDF vào thư mục có cấu trúc rõ (khai-cuoc/, trung-cuoc/, tan-cuoc/, co-up/).
2. **OCR/trích xuất text**: PDF dạng ảnh scan cần OCR trước; PDF dạng text trích trực tiếp.
3. **Nhận diện thế cờ trong sách**:
   - Bảng ký hiệu text → parse trực tiếp thành FEN
   - Hình ảnh bàn cờ → rasterize trang, nhận diện vị trí quân (rủi ro sai sót cao nhất, **bắt buộc review thủ công** trước khi publish)
4. **Viết lại nội dung** theo văn phong riêng, không chép nguyên văn đoạn sách; nguồn sách lưu nội bộ để truy vết, không public tên sách.

### 2C. Review & publish
- Mọi lesson sinh ra từ Agent mặc định ở trạng thái `draft` hoặc `review`.
- Duyệt qua trang admin: kiểm tra bàn cờ render đúng thế cờ (bắt lỗi FEN sai), đọc lại nội dung xem đã viết lại đủ khác nguồn chưa, sau đó mới chuyển `published`.
- Không tự động publish hàng loạt — đặc biệt với bài lấy từ nhận diện ảnh trong PDF.

---

## 3. Bàn cờ tương tác — công việc kỹ thuật

### 3A. Bàn cờ Cờ Tướng (làm trước)
1. Tích hợp `xiangqi.js` + `xiangqiboard.js` vào Laravel qua component dùng chung:
   ```blade
   <x-chess-board mode="co-tuong" :steps="$lesson->steps" :autoplay="false" />
   ```
2. Thiết kế lại bộ quân SVG theo bộ nhận diện riêng (đồng bộ font Be Vietnam Pro, màu sắc thương hiệu).
3. Tính năng theo thứ tự ưu tiên:
   - v1: render FEN tĩnh theo từng bước + nút next/prev
   - v2: highlight nước đi, âm thanh khi đi/ăn quân
   - v3: auto-play theo tốc độ điều chỉnh được
   - v4: cho phép người học tự thử nước đi trên thế cờ đang học (chỉ validate hợp lệ)
4. Bắt buộc test responsive trên mobile trước.

### 3B. Bàn cờ Cờ Úp (tái sử dụng 3A + bổ sung cơ chế riêng)
Vì luật đi quân giống hệt cờ tướng, chỉ cần mở rộng component `<x-chess-board mode="co-up">` với các cơ chế riêng:
1. **Trạng thái úp quân**: tất cả quân trừ 2 Tướng hiển thị dạng "úp" (mặt sau đồng màu, không lộ loại quân), vị trí xếp ngẫu nhiên theo đúng luật (30 quân úp, xáo trộn rồi xếp vào thế trận cờ tướng chuẩn).
2. **Cơ chế lật quân**: khi 1 quân úp được di chuyển lần đầu, hệ thống lật mở (hiển thị loại quân thật) — cần thêm trạng thái `is_flip_reveal` trong `lesson_steps` để bài học minh họa đúng thời điểm lật.
3. **Luật riêng cần encode thêm** (khác cờ tướng thường): sĩ/tượng không giới hạn trong cung/qua sông, luật đuổi dài (6/12/18 nước tùy số quân đuổi) — cần bổ sung logic riêng cho `xiangqi.js` hoặc lớp validate riêng, vì thư viện gốc chỉ hỗ trợ luật cờ tướng chuẩn.
4. Giao diện: hiệu ứng lật quân (flip animation) để trực quan — đây là điểm khác biệt so với đối thủ hiện tại (Ziga, Kỳ Vương) chỉ có bàn chơi, chưa có bàn *học* cờ úp có diễn giải từng bước.

---

## 4. Lộ trình phát triển chi tiết

### Giai đoạn 1 — Nền tảng kỹ thuật & Cờ Tướng (Tuần 1–6)
| Tuần | Việc | Đầu ra |
|---|---|---|
| 1 | Setup migrations `lessons`, `lesson_steps`, `source_assets`; dựng `game_mode`, phân quyền admin nội bộ cho `source_assets` | Schema DB hoàn chỉnh |
| 2 | Tích hợp `xiangqi.js` + `xiangqiboard.js`; dựng component bàn cờ Cờ Tướng v1 (render FEN + next/prev) | Component bàn cờ chạy được với FEN mẫu |
| 3 | Thiết kế bộ quân SVG riêng; hoàn thiện v2 (highlight, âm thanh) | Bàn cờ hoàn chỉnh giao diện |
| 4 | Viết script thu thập danh sách video (video_id nội bộ) + script lấy transcript (yt-dlp/API) | Danh sách + transcript lưu trong `source_assets` |
| 5 | Viết Agent prompt: transcript → nước đi → FEN; chạy thử với 1 playlist khai cuộc nhỏ | 5–10 bài học khai cuộc ở trạng thái `review` |
| 6 | Dựng trang admin review + trang lesson công khai (SEO schema `Course`/`Article`); duyệt và publish batch đầu tiên | Bài học Cờ Tướng đầu tiên lên site |

### Giai đoạn 2 — Mở rộng nội dung Cờ Tướng từ PDF (Tuần 7–10)
| Tuần | Việc | Đầu ra |
|---|---|---|
| 7 | Chuẩn hóa thư viện PDF theo chủ đề; viết script quét + OCR nếu cần | Text trích xuất từ toàn bộ PDF |
| 8 | Viết Agent prompt: text sách → bài học + FEN (ưu tiên phần ký hiệu text trước, ảnh bàn cờ để sau) | Bài học tàn cuộc/trung cuộc ở trạng thái `review` |
| 9 | Review thủ công hàng loạt, xử lý phần nhận diện ảnh bàn cờ (rủi ro cao, làm thủ công/bán tự động) | Bài học đã duyệt |
| 10 | Publish batch, rà soát SEO on-page, sitemap, internal linking giữa các bài | Bộ nội dung Cờ Tướng cơ bản hoàn chỉnh (30–50 bài) |

### Giai đoạn 3 — Tái sử dụng hạ tầng cho Cờ Úp (Tuần 11–16)
| Tuần | Việc | Đầu ra |
|---|---|---|
| 11 | Bổ sung logic luật riêng của Cờ Úp vào lớp validate (đuổi dài, sĩ/tượng tự do); thêm `is_flip_reveal` vào pipeline sinh FEN | Logic luật Cờ Úp hoàn chỉnh |
| 12 | Xây `<x-chess-board mode="co-up">`: trạng thái úp quân, hiệu ứng lật | Bàn cờ Cờ Úp chạy được |
| 13 | Viết bài "luật chơi cờ úp", "cờ úp là gì", "cờ úp khác cờ tướng thế nào" (nội dung nền tảng, ít đối thủ, ưu tiên SEO nhanh) | 5–10 bài nền tảng Cờ Úp |
| 14 | Tái dùng Agent pipeline (2A/2B) với nguồn video/sách về cờ úp nếu có, hoặc tự biên soạn dựa trên kinh nghiệm | Bài học mẹo/chiến thuật cờ úp |
| 15 | Review, publish, tối ưu SEO on-page riêng cho cụm Cờ Úp | Bộ nội dung Cờ Úp cơ bản (15–20 bài) |
| 16 | Đánh giá tổng thể 2 mảng, lên kế hoạch mở rộng (tàn cuộc nâng cao, thế cờ khó, tính năng cộng đồng) | Báo cáo tổng kết + roadmap giai đoạn tiếp theo |

### Giai đoạn 4 — Mở rộng (sau tuần 16, tùy nhu cầu)
- Cho người dùng tự nhập/thử FEN để luyện giải thế cờ
- Chế độ chơi với máy (engine nhẹ)
- Cộng đồng: bình luận, chia sẻ thế cờ hay, lưu tiến độ học (tái dùng module account/wishlist từ site cũ)

---

## 5. Lưu ý quan trọng

- **Video có bản quyền — tuyệt đối không public**: không nhúng, không dẫn link, không để lộ tên/ID video ra ngoài site hay trong nội dung bài học. Chỉ dùng làm tài liệu nội bộ để Agent viết lại thành bài học.
- **Không publish tự động** nội dung sinh từ Agent — luôn qua bước review vì rủi ro sai FEN/thế cờ ảnh hưởng trực tiếp đến chất lượng bài học.
- **Bản quyền nội dung viết**: bài học phải là diễn giải bằng lời văn riêng, không chép nguyên văn transcript hay đoạn sách.
- **Cờ Úp là trọng tâm SEO thứ hai** sau khi ổn định Cờ Tướng — vì ít đối thủ có nội dung *học* bài bản (đa số chỉ có nền tảng *chơi*), cơ hội lên top nhanh hơn.
- Thứ tự ưu tiên nội dung xuyên suốt: **luật chơi cơ bản → khai cuộc phổ biến (từ video) → tàn cuộc/sách nâng cao → luật + nền tảng Cờ Úp → mẹo/chiến thuật Cờ Úp**.
