# Kế hoạch nội dung "Bài Tập Sát Pháp" — hoccotuong.top
> Bàn giao cho Claude Code. Khảo sát từ hoccotuong.net (đối thủ có mảng bài tập sát pháp mạnh nhất hiện quan sát được) để rút ra mô hình dữ liệu + tính năng, áp dụng lại bằng nguồn nội dung riêng (không sao chép đề bài của họ).

---

## 0. Sát pháp là gì — định vị nội dung
"Sát pháp" là phương pháp/đòn phối hợp để chiếu bí (chiếu hết), khác với tàn cuộc (giai đoạn ít quân nói chung) — sát pháp là bài tập chiến thuật ngắn, có lời giải cụ thể, phù hợp dạng puzzle tương tác. Đây là bài tập vỡ lòng gần như bắt buộc với người mới, nên nhu cầu tìm kiếm ổn định và lặp lại (người học giải hàng chục/hàng trăm bài liên tục — tốt cho time-on-site).

---

## 1. Mô hình đã khảo sát từ đối thủ (hoccotuong.net)

**Cách phân loại bài tập** (2 trục song song):
1. **Theo số nước chiếu hết**: 1 Nước Sát, 2 Nước Sát, ... 15 Nước Sát — càng nhiều nước càng khó, tăng dần độ khó tuyến tính, dễ làm lộ trình luyện tập.
2. **Theo đội hình quân tấn công**: Đội Hình Xe Mã, Xe Pháo, Xe Tốt, Mã Tốt, Pháo Mã, Pháo Tốt, Xe Pháo Mã, Song Xe Mã, Song Xe Pháo, Song Mã Chốt, Song Pháo Chốt... — phân loại theo bộ quân còn lại trên bàn, giúp người học luyện phản xạ với từng tổ hợp quân cụ thể.

**Cấu trúc 1 trang bài tập:**
- Bàn cờ tương tác: nút Reset, Undo, Xoay bàn, Copy FEN, toggle "AI đi ngay"/"AI vs AI" (xem máy tự giải minh họa), toggle âm thanh, toggle hiển thị ký hiệu Việt
- Yêu cầu đăng nhập mới được thao tác giải bài (nội dung mô tả + bàn cờ hiển thị vẫn public để SEO index được)
- Thống kê: số lượt thử, bảng xếp hạng "Top 1" (người giải nhanh nhất + số lượt thử + thời gian)
- Cơ chế điểm thưởng: thưởng điểm khi giải đúng (WIN), trừ điểm nếu bấm "mở lời giải"
- Danh sách "Các ván cờ liên quan" (bài cùng mức độ) ở cuối trang — internal linking rất mạnh
- Tag cloud toàn site (57 tài liệu, 44 tài liệu...) — tối ưu cho hàng loạt long-tail keyword

**Nhận xét:** đây là mô hình **programmatic SEO** điển hình — hàng nghìn trang nhỏ (mỗi bài 1 URL riêng, ví dụ `bai-3373-53293`), mỗi trang ít cạnh tranh riêng lẻ nhưng cộng lại tạo lượng traffic dài hạn lớn, đồng thời giữ chân người dùng quay lại giải tiếp (retention).

---

## 2. Áp dụng cho hoccotuong.top — mô hình dữ liệu

```
puzzle_categories
├─ id
├─ type            (enum: so_nuoc | doi_hinh)   -- 2 trục phân loại song song
├─ name             (vd "2 Nước Sát", "Xe Pháo Mã")
├─ slug
├─ move_count       (nullable, dùng khi type = so_nuoc)
└─ description       (đoạn giới thiệu ngắn cho trang danh mục, tốt cho SEO)

puzzles
├─ id
├─ category_id      (FK — có thể gán puzzle vào cả 2 trục qua bảng pivot nếu cần)
├─ title             (vd "2 Nước Sát — Bài 001")
├─ slug
├─ fen               (thế cờ ban đầu)
├─ solution_moves    (json — chuỗi nước đi đúng, dùng để validate khi người dùng thao tác)
├─ move_count
├─ difficulty        (co-ban | trung-binh | kho)
├─ source_ref         (sách/PDF nguồn nội bộ — KHÔNG public, chỉ để truy vết bản quyền)
├─ status             (draft | review | published)
├─ seo_title, seo_description
└─ timestamps

puzzle_attempts   (gamification — làm ở giai đoạn sau khi có tài khoản người dùng)
├─ id
├─ puzzle_id
├─ user_id
├─ attempts_count
├─ solved_at
├─ time_taken_seconds
└─ timestamps

puzzle_points     (điểm thưởng, tùy chọn — có thể hoãn đến giai đoạn sau)
├─ user_id
├─ total_points
└─ timestamps
```

---

## 3. Tính năng bàn cờ giải bài tập (mở rộng từ bàn cờ tương tác đã có)

Component `<x-chess-board mode="puzzle">` kế thừa từ bàn cờ Cờ Tướng/Cờ Úp đã xây, bổ sung:
1. **Chế độ giải đố**: người dùng kéo quân, hệ thống validate nước đi so với `solution_moves`; sai thì báo lại/cho thử lại, đúng thì tự động đi nước đáp trả của "đối phương" theo lời giải rồi chờ nước tiếp theo.
2. Nút **Reset / Undo** — dùng lại logic đã có từ bàn cờ học bài.
3. Nút **Xem lời giải** (auto-play toàn bộ lời giải) — tương đương "AI đi ngay" của đối thủ, nhưng đề xuất **không gắn cơ chế trừ điểm** ở giai đoạn đầu (đơn giản hóa, thêm gamification sau khi có traffic ổn định).
4. **Copy FEN** — tiện cho người dùng chia sẻ hoặc tự phân tích thêm bằng công cụ khác.
5. Toggle hiển thị ký hiệu nước đi (Việt hóa / quốc tế WXF) — phù hợp cả người mới lẫn người đã quen ký hiệu chuẩn.
6. **Không bắt buộc đăng nhập mới xem bàn cờ** — chỉ yêu cầu đăng nhập nếu muốn *lưu tiến độ/tham gia bảng xếp hạng*, để tối đa hóa nội dung crawl được cho SEO (khác với đối thủ khóa cứng ngay từ đầu).

---

## 4. Kế hoạch nội dung — nguồn & quy trình

1. **Nguồn**: sách/PDF "sát pháp cơ bản" đã có trong kho tài liệu cá nhân (ví dụ dạng "33 Sát Pháp Cơ Bản", "Sát Chiêu Thực Dụng") — dùng làm tài liệu tham khảo để **tự soạn lại thế cờ và lời giải bằng FEN**, không copy nguyên đề bài của bất kỳ site nào.
2. Áp dụng lại pipeline Agent đã thiết kế (đọc PDF → OCR nếu cần → nhận diện thế cờ → sinh FEN) — tái sử dụng gần như nguyên vẹn cho puzzle, chỉ khác là mỗi "bài học" nay là 1 "bài tập" với lời giải xác định thay vì diễn giải tự do.
3. **Thứ tự triển khai nội dung theo độ khó tăng dần**:
   - Giai đoạn đầu: 1–3 Nước Sát (số lượng nhiều, dễ làm, dễ rank vì đối thủ cũng chủ yếu mạnh ở nhóm cơ bản)
   - Sau đó: 4–6 Nước Sát
   - Song song mở dần trục "Đội hình" (Xe Mã, Xe Pháo... ưu tiên tổ hợp phổ biến nhất trước)
   - Nhóm nước sát cao (10-15) và tổ hợp hiếm làm sau cùng, số lượng ít hơn

---

## 5. SEO cho mảng Bài Tập

1. **Cấu trúc URL**: `/bai-tap-sat-phap/{loai}/{slug}` — ví dụ `/bai-tap-sat-phap/2-nuoc-sat/bai-001-xxx`, `/bai-tap-sat-phap/doi-hinh/xe-phao-ma`
2. **Trang danh mục** (vd "2 Nước Sát"): liệt kê toàn bộ bài trong nhóm + đoạn mô tả ngắn giải thích khái niệm, giúp trang danh mục cũng rank được cho từ khóa dạng "bài tập sát pháp 2 nước", "2 nước chiếu hết cờ tướng".
3. **Mỗi trang bài tập**: `H1` = tên bài, breadcrumb (Trang chủ › Bài tập › 2 Nước Sát › Bài 001), schema `Quiz`/`LearningResource` nếu phù hợp, đoạn text mô tả ngắn thế cờ (không chỉ có bàn cờ JS — cần text để Google đọc được).
4. **Internal linking**: cuối mỗi bài hiển thị 4-6 bài liên quan cùng nhóm độ khó (giống mô hình đối thủ) — tăng thời gian ở lại và số trang/phiên.
5. **Từ khóa mục tiêu cụm này**: "bài tập sát pháp cờ tướng", "sát pháp cờ tướng cơ bản", "N nước chiếu hết cờ tướng" (N=1..15), "bài tập cờ tướng có lời giải", "luyện sát pháp online".
6. Vì đây là dạng **programmatic SEO** (nhiều trang nhỏ), cần đặc biệt chú ý: mỗi bài phải có nội dung/thế cờ khác biệt thật sự (không trùng FEN), tránh bị Google đánh giá là thin/duplicate content.

---

## 6. Trình tự bàn giao cho Claude Code

| Bước | Việc |
|---|---|
| 1 | Migrations: `puzzle_categories`, `puzzles`, (hoãn `puzzle_attempts`/`puzzle_points` đến giai đoạn gamification) |
| 2 | Mở rộng component bàn cờ thêm `mode="puzzle"`: validate nước đi theo `solution_moves`, nút reset/undo/xem lời giải/copy FEN |
| 3 | Dựng trang danh mục theo 2 trục (số nước sát / đội hình) + breadcrumb + internal linking bài liên quan |
| 4 | Áp dụng lại Agent pipeline xử lý PDF sát pháp → sinh FEN + lời giải, ở trạng thái `draft`/`review` |
| 5 | Review thủ công từng bài trước khi publish (bắt buộc như các nội dung khác — rủi ro sai FEN/lời giải ảnh hưởng trực tiếp trải nghiệm) |
| 6 | Publish batch đầu tiên: 1–3 Nước Sát (ưu tiên số lượng nhiều để phủ nhanh cụm dễ) |
| 7 | Mở rộng dần 4–6 Nước Sát + trục Đội hình phổ biến |
| 8 | (Giai đoạn sau) Thêm gamification: lượt thử, bảng xếp hạng, điểm thưởng — chỉ làm khi đã có traffic/người dùng đăng ký ổn định, tránh xây tính năng cộng đồng khi chưa có người dùng |

---

## 7. Lưu ý
- Không sao chép đề bài/thế cờ cụ thể từ hoccotuong.net hay bất kỳ site nào — chỉ tái sử dụng **mô hình phân loại và cấu trúc trang** (đây là dạng cấu trúc chung, không phải nội dung có bản quyền), còn thế cờ/lời giải phải tự soạn từ nguồn PDF cá nhân.
- Gamification (bảng xếp hạng, điểm thưởng) nên **hoãn đến sau khi có nội dung + traffic ổn định** — làm sớm khi chưa có người chơi sẽ chỉ tốn công mà không tạo hiệu ứng cạnh tranh/thi đua như đối thủ đang có.
