# Tiến Độ & Kế Hoạch Phát Triển — hoccotuong.top

> Bảng điều khiển chính, cập nhật liên tục. Đối chiếu với `ke-hoach-seo-tong-the-hoccotuong.md`
> (nghiên cứu từ khóa + chiến lược) — file này theo dõi *đã làm gì* và *làm tiếp gì*.
> Cập nhật gần nhất: **2026-08-25**.

## Trạng thái tổng quan

- **6 chương trình học / 161 bài published** (nội dung trong `content.json`, seed bằng `ContentSeeder`).
- Nền tảng: bàn cờ tương tác (SVG vanilla JS, đi từng nước + phóng to + quân úp), đăng nhập Google + email/mật khẩu,
  đăng ký tài khoản, theo dõi tiến độ (✓ đã học), bình luận + trả lời + thích, chia sẻ FB/Zalo, sitemap XML + HTML.

| Cụm SEO (theo kế hoạch) | Chương trình | Số bài | Trạng thái |
|---|---|---|---|
| **A – Nhập môn** (ưu tiên #1) | Nhập Môn Cờ Tướng | 8 | ✅ Luật chơi + 7 quân (có bàn cờ demo động) |
| **B – Khai cuộc** | 48 Bài Nguyên Lý Khai Cuộc | 29 | ✅ Đã xuất bản hết ván mẫu XQF có nước đi (14→29); phần còn lại là bài "nói" 0 nước |
| **C – Trung cuộc** (kế hoạch ghi "chưa có") | Sát Pháp Thực Dụng 13 Đội Hình | 65 | ✅ Lấp xong bằng sát pháp (5 bài/đội hình) |
| **D – Tàn cuộc** | 48 Bài Nguyên Lý Tàn Cuộc | 48 | ✅ Đạt đủ 48 (10→48) từ thế tàn cuộc XQF |
| **E – Cờ Úp** (ưu tiên #2) | Nhập Môn Cờ Úp + Cờ Úp Sơ Cấp 1 | 1 + 10 | 🔄 Sơ Cấp 1 xong; còn Sơ Cấp 2 + 3 khóa |
| **F – So sánh/công cụ** | — | 0 | ⬜ Chưa làm (web/app học cờ, bàn cờ tương tác online) |

> Khai cuộc dừng ở 29 vì nguồn XQF của thầy chỉ có 15 ván có nước đi ngoài 14 bài cũ; các "bài" còn lại
> trong folder là clip thầy giảng bằng lời (0 nước) — muốn đủ 48 phải tự biên soạn hoặc lấy phụ đề video.

## Đã làm (chi tiết)

### Nội dung
- **Nhập Môn Cờ Tướng (8)** — cụm A, ưu tiên cao nhất kế hoạch SEO. Bài quân có bàn cờ demo động
  (FEN/ICCS/ký hiệu sinh bằng `scratchpad/gen-nhapmon.js`), bài luật hiển thị thế mở tĩnh.
- **Sát Pháp 13 Đội Hình (65)** — lấp mảng Trung cuộc. Giải mã từ ~1000 file PGN của thầy
  (`tools/pgn-decoder/`), mỗi đội hình 1 flagship + 4 thế, có mục "Biến cần lưu ý", caption tự sinh.
- **Tàn Cuộc (10)** — nguyên lý tàn cuộc, cơ bản → nâng cao.
- **Khai Cuộc (14)** — từ XQF của thầy (`tools/xqf-decoder/`).
- **Cờ Úp Sơ Cấp 1 (10)** — soạn lại bằng lời riêng từ **phụ đề video khóa học thầy Hà Văn Tiến**
  (kéo bằng `yt-dlp --write-auto-sub --sub-lang vi`, video unlisted không cần cookie). + **Nhập Môn Cờ Úp (1)**:
  Luật chơi cờ úp. Bài cờ úp có **bàn cờ minh hoạ quân úp** (chip sấp mặt, thế mở tĩnh).

### Tính năng nền tảng
- **Bàn cờ tương tác**: SVG vanilla JS, đi từng nước + caption, phóng to toàn màn hình, **quân úp** (cờ úp),
  chế độ tĩnh (bài lý thuyết). Màu bàn cờ **cố định nền sáng** ở mọi theme (dễ xem mobile).
- **Tài khoản**: đăng nhập Google + email/mật khẩu, **đăng ký** tài khoản học viên, theo dõi tiến độ
  (đọc + xem hết nước → ✓ đã học), trang tài khoản (5 bài gần nhất + "Hiện thêm"), tích ✓ trên trang chuyên đề.
- **Cộng đồng**: bình luận + trả lời (1 cấp) + **Thích** (AJAX), sắp "quan tâm nhất". Chia sẻ **Facebook/Zalo** + copy link.

### SEO kỹ thuật (theo mục 2B + 3 kế hoạch)
- ✅ **sitemap.xml động** (trang chủ + giai đoạn + chuỗi Course + toàn bộ bài) + **robots.txt** (trỏ sitemap, chặn trang riêng tư).
- ✅ **Structured data** đã có: `Article` (+ `description`, `mainEntityOfPage`, `speakable`), `BreadcrumbList`, `Course`, `Organization`, `WebSite`.
- ✅ Breadcrumb UI + prev/next trong chuỗi. Meta title/description/canonical/OG. Trang tài khoản/đăng nhập `noindex`.
- ✅ **Tối ưu AI search (GEO)** — như lapcamerahcm: `public/llms.txt` (tổng quan site + hỏi đáp + gợi ý cho AI),
  robots.txt mời AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, Google-Extended, PerplexityBot, ClaudeBot,
  Claude-Web, anthropic-ai) + trỏ llms.txt, `speakable` schema trên bài học.
- ✅ **On-page (mục 2A kế hoạch)**: đoạn USP trang chủ (200-300 từ) + phần FAQ (accordion) kèm **FAQPage schema**;
  **HowTo schema** cho bài cách đi quân (nhập môn); **internal linking** (block "Bài liên quan" cuối mỗi bài);
  **HTML sitemap** `/so-do-trang` (link footer) + sitemap.xml phủ hết 161 bài.

## Việc tiếp theo (ưu tiên theo kế hoạch SEO)

### Ngắn hạn
1. **Cờ Úp Sơ Cấp 2 (10 bài)** — phụ đề ĐÃ tải + trích text sẵn ở `scratchpad/subs2/`. ⚠️ **Đang chờ nâng
   hạn mức chi tiêu** (agent chắt lọc dừng vì monthly spend limit). Nâng xong là soạn tiếp ngay.
2. **3 khóa Cờ Úp còn lại** — Nâng Cao Đặc Biệt 2024, Đặc Biệt 02/2024, Cờ Úp Tàn Cuộc Tổng Hợp.
   Chỉ cần user dán URL video → tải phụ đề → soạn (quy trình như Sơ Cấp 1).
3. **Mở rộng Nhập Môn Cờ Úp** (cụm E còn dư địa lớn) — thêm: cờ úp khác cờ tướng thế nào, luật đuổi dài cờ úp
   (từ khóa featured-snippet ít cạnh tranh), giá trị quân úp & xác suất, mẹo cho người mới.

### Trung hạn
4. **Mở rộng Khai Cuộc → đủ 48 bài** (cụm B): còn ~34 bài XQF của thầy chưa import. Thêm bài tổng hợp dạng
   listicle "các thế khai cuộc hay" để internal-link.
5. **Mở rộng Tàn Cuộc → đủ 48 bài** (cụm D): tương tự, còn XQF + PGN chưa dùng.
6. **Sát pháp**: mỗi đội hình còn 30–200 file PGN; kho `TTTK VƯỢT QUAN ẢI` (359) + `TRUNG CỤC SÁT CHIÊU`
   (104, nâng cao) chưa dùng — nhân thêm khi cần.

### SEO nâng cao (còn lại)
7. **FAQPage on-page cho từng bài cờ úp/luật** ("luật đuổi dài" v.v.) — hiện FAQPage mới ở trang chủ; thêm khối
   Q&A trong các bài rules để bắt thêm featured-snippet.
8. **Internal linking cross-cluster**: hiện "Bài liên quan" mới trong cùng chuỗi; bổ sung link ngữ cảnh chéo cụm
   (VD bài "pháo đầu" khai cuộc → "cách đi quân Pháo" nhập môn) — cần chèn link thủ công trong nội dung.
9. **Cụm F** (từ khóa thương hiệu "web học cờ tướng", "bàn cờ tương tác online"): dựng 1 landing tối ưu USP.
10. **Core Web Vitals**: đo LCP/CLS trang có bàn cờ (phần tử nặng nhất). Bàn cờ đã lazy-friendly (SVG nhẹ, không CDN).
11. **Nội dung sâu hơn cho bài ván mẫu**: 15 khai cuộc + 38 tàn cuộc mới hiện có intro + caption tự sinh; có thể
    viết diễn giải chiến thuật sâu hơn cho các thế trận quan trọng (khi có phụ đề/nguồn).

### Dài hạn
12. **Cờ Úp nâng cao** (sau khi có đủ phụ đề 4 khóa): trung cuộc loạn chiến, phản công, cờ tàn cờ úp.
13. **Backlink** (mục 2D): chia sẻ bài chất lượng lên hội nhóm Facebook cờ tướng VN (organic).
14. **Theo dõi Search Console** theo từng cụm, điều chỉnh ưu tiên sau 4–6 tuần lên bài Nhập môn.

## Ghi chú kỹ thuật (quy trình)

- **Soạn bài từ phụ đề video**: `yt-dlp --skip-download --write-auto-sub --sub-lang vi --sub-format json3
  "https://www.youtube.com/watch?v=<ID>"` → trích text json3 → chắt lọc → viết LẠI bằng lời riêng (bản quyền)
  → JSON → tinker glob upsert vào series.
- **Bàn cờ demo động** (Nhập môn/tự soạn): `scratchpad/gen-nhapmon.js` nhận `{fen, moves:[{from:[r,c],to:[r,c],cap}]}`
  → sinh steps (fen_after/iccs/wxf/side). ⚠️ Slug tiếng Việt bỏ dấu dễ TRÙNG (Tượng/Tướng → "tuong") — kiểm tra.
- **Giải mã cờ**: `tools/pgn-decoder/decode-pgn.js` (PGN Hán tự GBK) + `tools/xqf-decoder/decode.js` (XQF nhị phân).
- **Deploy** (BẮT BUỘC đủ 4 bước — thiếu `db:seed` thì bài không hiện):
  ```
  git fetch origin && git reset --hard origin/main
  php artisan migrate --force
  php artisan db:seed --class=Database\Seeders\ContentSeeder --force
  php artisan optimize:clear && php artisan config:cache && php artisan route:cache && php artisan view:cache
  ```
