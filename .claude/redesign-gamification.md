# Redesign + Lộ trình + Gamification + Luyện tập (10/2026)

Triển khai Phase 0–4 của `.claude/hoccotuong-redesign-plan.md`. PvP / chơi với máy / AI Coach / lớp học: chưa làm.

## Giao diện (Vite 8 + Tailwind 4)
- `resources/css/app.css` import: `base.css` (token sáng/tối, font quân cờ), `layout.css` (header, bottom nav
  mobile, footer), `ui.css` (btn, card, tag, chip, progress/ring, stat, form, sheet, toast, faq, pager, bình luận),
  `board.css` (bàn cờ — GIỮ tên class gốc vì admin dùng chung markup), `content.css` (hero, danh sách bài, bài
  học, prose, tin tức, auth, fen-composer), `game.css` (HUD XP/chuỗi, heatmap, huy hiệu, xếp hạng, lộ trình, luyện tập).
- Theme: script đầu `<head>` đặt `html[data-theme]` (localStorage `theme`, không có thì theo HĐH) +
  `data-board-theme` (gỗ/cổ điển/ngọc/tương phản) + class `reduce-fx`. Dark variant Tailwind = `[data-theme=dark]`.
- Icon: sprite `resources/views/partials/icons.blade.php`, dùng `<x-icon name="flame" />`. KHÔNG dùng emoji trên nút.
- Font Google tải `display=optional` (đổi từ swap 01/10 — swap làm CLS trang chủ 0.107 do tiêu đề hero đổi dòng).
- JS (`resources/js`): `app.js` (dropdown, theme, tìm kiếm mobile, guest-gate, gộp tiến độ khách, nạp bàn cờ khi có
  `[data-xqboard]|[data-needs-board]|[data-fen-thumb]`), `core.js`, `gamification.js` (toast XP, sheet lên cấp),
  `lesson.js` (trang bài: tiến độ, sheet hoàn thành, ghi kết quả "Thử tự giải"), `practice.js`, `countdown.js`.
- `public/js/board.js` (tĩnh, dùng chung admin): thêm chấm nước hợp lệ, kéo-thả (Pointer Events), tự lật bàn
  khi giải bên Đen, chấp nhận nước chiếu hết thay thế ở nước cuối, `XiangqiBoard.mountPuzzle(el, cfg)`,
  sự kiện có payload (`xq:puzzle-move/solved/failed`). Thư viện thế cờ nạp `fen-composer.js` SAU `xq:board-ready`.

## Dữ liệu
- `users`: xp_total, level, streak_current/best/last_date/freezes, daily_goal_xp, leaderboard_opt_out,
  onboarding_level, puzzle_rating/games, rush_best, survival_best.
- `xp_transactions` (sổ cái, unique user+idem_key, local_date = ngày VN), `user_daily_activity` (xp/bài/thế theo
  ngày VN), `user_achievements` (định nghĩa ở `config/achievements.php`).
- `puzzles` (FK lessons.id + start_ply), `puzzle_attempts`, `user_puzzle_reviews` (Leitner 1/3/7/14/30 ngày),
  `practice_sessions` (60 giây / 3 mạng).
- ⚠️ Cột ngày-VN (`user_daily_activity.date`, `xp_transactions.local_date`, `user_puzzle_reviews.due_at`) KHÔNG cast
  `date` — cast làm lưu `Y-m-d H:i:s`, so sánh chuỗi ngày lệch (lộ ra trên sqlite test).

## Quy tắc (config/gamification.php)
- XP: hoàn thành bài 30 · thế cờ lần đầu 10–25 theo rating · giải lại 5/ngày · thế cờ hôm nay 50 · mục tiêu ngày +20
  · 60s 2/thế (trần 60) · 3 mạng 3/thế (trần 60) · xong chương trình 200 · xong giai đoạn 500 · mốc chuỗi 7/30/100.
- Trần: XP thế cờ 400/ngày, XP hoàn thành tối đa 30 bài/ngày. Giải nhanh hơn 700ms × số nước → không XP.
- Cấp: tổng XP cấp L = 20(L−1)² + 30(L−1). Danh hiệu không phải đẳng cấp chính thức.
- Chuỗi ngày theo `Asia/Ho_Chi_Minh`, đứt chuỗi tính lười (không cron). Mỗi 7 ngày +1 thẻ giữ chuỗi (tối đa 2).
- Elo thế cờ: K người 40 (≤30 ván) rồi 20, K thế 8; chỉ lượt thử đầu mỗi thế mới tính.
- Tiến độ bài: server kẹp `read_seconds` ≤ thời gian thực kể từ heartbeat đầu (+15s) — chặn gửi tay số giây lớn.
- Mọi điểm cộng XP đi qua `GamificationService::record()`; khách không có XP (localStorage giữ ✓ đã xem,
  gộp thành "đang học" khi đăng nhập qua `POST /tien-do/gop`).

## Kho thế cờ — `php artisan cotuong:build-puzzles`
- Nguồn: bài published có `puzzle_side` thuộc `sat-phap-13-doi-hinh`, `sat-phap-dai-toan`, `48-bai-nguyen-ly-tan-cuoc`.
- Thế đầy đủ nếu ≤ 16 nước; nếu kết thúc chiếu hết thì cắt thêm "Đoạn kết 2/3 nước". Kiểm luật từng nước bằng
  `app/Support/Xiangqi/Rules.php` (bản PHP của xiangqi-rules.js) — 01/10: 861 thế, 17 bài bị loại vì dữ liệu sách
  có Tướng Đỏ đang bị chiếu sẵn (các bài này "Thử tự giải" cũng không giải được — cần sửa FEN nếu muốn).
- Chủ đề (`config/puzzle-skills.php`): song-xe, xe, ma, phao, tot, nhanh (≤2 nước), tan-cuoc.

## Route mới
`/lo-trinh` (index) · `/xep-hang` (noindex) · `/luyen-tap` (index) + `/hom-nay`, `/60-giay`, `/3-mang`,
`/chu-de/{skill}`, `/loi-sai` (auth), `/kiem-tra` (noindex) · API `practice.attempt|next|session.*` ·
`/tai-khoan/cai-dat` · `POST /tai-khoan/bat-dau` (onboarding) · `POST /tien-do/gop`.

## Kiểm thử
- `php artisan test` — `tests/Feature/GamificationTest.php` (idempotent XP, chuỗi qua nửa đêm VN, thẻ giữ chuỗi,
  thẩm định lời giải + chiếu hết thay thế, chống tua thời gian, xếp hạng opt-out, phiên 60s, smoke route).
- E2E thủ công 01/10 bằng puppeteer-core + Chrome có sẵn: giải thế hôm nay (khách + đăng nhập), luyện chủ đề cố
  tình sai, 60 giây (trừ 5s đúng), hoàn thành bài → sheet +XP; admin không lỗi JS.
- Lighthouse mobile local: SEO 100, Accessibility 96–98, Best Practices 100, CLS ≈ 0.
