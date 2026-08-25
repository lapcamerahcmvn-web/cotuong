# Tiến Độ & Kế Hoạch Phát Triển — hoccotuong.top

> Bảng điều khiển chính, cập nhật liên tục. Đối chiếu với `ke-hoach-seo-tong-the-hoccotuong.md`
> (nghiên cứu từ khóa + chiến lược) — file này theo dõi *đã làm gì* và *làm tiếp gì*.
> Cập nhật gần nhất: **2026-08-25**.

## Trạng thái tổng quan

- **6 chương trình học / 108 bài published** (nội dung trong `content.json`, seed bằng `ContentSeeder`).
- Nền tảng: bàn cờ tương tác (SVG vanilla JS, đi từng nước + phóng to), đăng nhập Google + email/mật khẩu,
  đăng ký tài khoản, theo dõi tiến độ (✓ đã học), bình luận + trả lời + thích, chia sẻ FB/Zalo, sitemap động.

| Cụm SEO (theo kế hoạch) | Chương trình | Số bài | Trạng thái |
|---|---|---|---|
| **A – Nhập môn** (ưu tiên #1) | Nhập Môn Cờ Tướng | 8 | ✅ Luật chơi + 7 quân (có bàn cờ demo động) |
| **B – Khai cuộc** | 48 Bài Nguyên Lý Khai Cuộc | 14 | 🔄 Đã có nền, còn mở rộng tới 48 |
| **C – Trung cuộc** (kế hoạch ghi "chưa có") | Sát Pháp Thực Dụng 13 Đội Hình | 65 | ✅ Lấp xong bằng sát pháp (5 bài/đội hình) |
| **D – Tàn cuộc** | 48 Bài Nguyên Lý Tàn Cuộc | 10 | 🔄 Đã có nền, còn mở rộng tới 48 |
| **E – Cờ Úp** (ưu tiên #2) | Nhập Môn Cờ Úp + Cờ Úp Sơ Cấp 1 | 1 + 10 | 🔄 Sơ Cấp 1 xong; còn Sơ Cấp 2 + 3 khóa |
| **F – So sánh/công cụ** | — | 0 | ⬜ Chưa làm (web/app học cờ, bàn cờ tương tác online) |

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

### SEO nâng cao (mục 2A–2C kế hoạch, chưa làm)
7. **FAQPage schema on-page** cho các bài dạng hỏi-đáp ("cờ úp là gì", "luật chơi cờ úp", "luật đuổi dài") —
   thêm khối Q&A hiển thị trong bài rồi gắn schema (llms.txt đã có FAQ cho AI, nhưng on-page FAQPage cho Google
   featured-snippet thì chưa). Cân nhắc thêm `HowTo` schema cho bài hướng dẫn cách đi quân.
8. **Đoạn giới thiệu USP trang chủ** (200–300 từ) nhấn "bàn cờ tương tác, đi từng nước, có diễn giải" —
   Google đọc ngữ nghĩa. Hiện trang chủ thiên UI.
9. **Internal linking**: bài khai cuộc/tàn cuộc link chéo tới bài Nhập môn liên quan (VD "pháo đầu" → "cách đi
   quân Pháo"); bài listicle link tới toàn bộ bài chi tiết trong cụm.
10. **Cụm F** (từ khóa thương hiệu "web học cờ tướng", "bàn cờ tương tác online"): dựng 1 landing tối ưu USP.
11. **Core Web Vitals**: đo LCP/CLS trang có bàn cờ (phần tử nặng nhất). Bàn cờ đã lazy-friendly (SVG nhẹ, không CDN).

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
