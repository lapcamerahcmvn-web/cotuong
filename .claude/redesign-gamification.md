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
- `puzzles` (FK lessons.id + start_ply), `puzzle_attempts`, `user_puzzle_reviews` (Leitner: sai → ôn ngay trong ngày, đúng → giãn 1/3/7/14/30 ngày),
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

## Đợt 2 (02/10/2026) — Chơi với máy, Thách đấu bạn bè, Chia sẻ kết quả

### Chơi với máy — `/choi-voi-may` (index, có FAQ schema)
- Engine tự viết `resources/js/engine/engine.js` (chạy trong Web Worker `worker.js`): sinh nước hợp lệ, đánh giá
  vật chất + vị trí, negamax alpha-beta + quiescence + iterative deepening + killer moves.
  **Perft chuẩn: 44 / 1.920 / 79.666** (đã kiểm — từng sai 46 do Sĩ ra ngoài bàn, đã sửa giới hạn cung).
- 4 cấp: Tập sự (đi bừa 35%), Dễ (sâu 2), Vừa (sâu 3), Khó (≤ 6, 2,5s). Hoà khi lặp thế 3 lần / quá 150 nước.
- `resources/js/play-bot.js`: lưu ván dở trong localStorage `xq.bot.game`, đi lại, gợi ý (mũi tên vàng), lật bàn, xin thua.
- `POST /choi-voi-may/ket-qua`: XP thắng 10/20/40/80 theo cấp, dùng gợi ý/đi lại → nửa XP, ván < 10 nước hoặc
  < 20 giây không tính, tối đa 5 ván/ngày (server không thẩm định được ván nên giới hạn).
- `board.js` có thêm `XiangqiBoard.mountGame(el, {fen, red, onMove})` — bàn cờ ván đấu tự do (bấm/kéo, chấm nước).

### Thách đấu bạn bè — `/dau-ban` (sảnh), `/dau-ban/{code}` (phòng, noindex)
- Bảng `games` (mã 6 ký tự, Đỏ/Đen, moves JSON, đồng hồ ms mỗi bên, draw_offer, version). `App\Services\GameService`
  thẩm định từng nước bằng `Rules` PHP trong transaction `lockForUpdate`; chiếu hết/hết nước → thắng, lặp 3 lần hoặc
  300 nửa nước → hoà, hết giờ → thua (tính lười khi đọc trạng thái, không cron).
- Đồng bộ bằng **polling** (`GET /dau-ban/{code}/trang-thai?v=` trả `{same:true}` nếu chưa đổi): 1s khi chờ đối thủ,
  1,8s bình thường, 4s khi tab ẩn. Không cần websocket → chạy được trên hosting chia sẻ.
- XP sau khi ván kết thúc (≥ 10 nước): thắng 30, hoà 10, thua 5; tối đa 10 ván/ngày. Huy hiệu pvp-1, pvp-10.

### Chia sẻ kết quả (`resources/js/share.js`)
- Thế cờ hôm nay, 60 giây/3 mạng (ô 🟩🟥 kiểu Wordle), ván với máy, lời mời phòng đấu. Web Share trên mobile, còn lại copy.

### ⚠️ Gotcha throttle (đã sửa 02/10)
`throttle:N,1` của Laravel đếm **chung 1 bộ đếm cho mọi route** của cùng user/IP → polling ván đấu làm cạn hạn mức
nút "Đề nghị hoà" (429), khách luyện tập nhiều có thể bị chặn đăng nhập. Luôn thêm tiền tố: `throttle:20,1,pvp-draw`.

### Khác
- Thế giải sai vào hàng "Luyện lỗi sai" ngay trong ngày (trước đó hẹn sang hôm sau).
- Điều hướng: header thêm menu **Chơi**; thanh dưới mobile: Trang chủ · Học · Luyện · Chơi · Tôi (Xếp hạng chuyển vào
  menu tài khoản + trang chủ).
- Test: `tests/Feature/PlayTest.php` (6 test: lượt/luật, hoà + XP, lặp 3 lần, xin thua/hết giờ, XP thắng máy, render).

## Đợt 3 (02/10/2026) — Cờ úp cho Chơi với máy + Thách đấu bạn bè

Luật theo bài "Luật chơi cờ úp" của site: 2 Tướng ngửa; 15 quân/bên úp & tráo trên ô xuất phát của bên mình;
quân úp đi theo binh chủng **ô xuất phát**, lật ngay nước đầu; **Sĩ/Tượng đã lật không bị giới hạn cung/sông**
(và vì thế có thể chiếu Tướng); chiếu bí = thắng; ~~hết nước mà không bị chiếu = hoà~~ → SỬA 06/10/2026: **hết nước đi = THUA** như cờ tướng (Đợt 21);
ăn quân úp → quân bị ăn lộ mặt (vào khay quân bị ăn).

- **Engine** `resources/js/engine/engine.js`: trạng thái `{b, h, coup}`, ROLE theo ô; `thinkCoup()` dùng
  *determinization*: máy chỉ nhận **túi quân chưa lộ** của mỗi bên (không biết quân nào ở đâu), thử 1–4 cách xếp
  ngẫu nhiên, cộng điểm từng nước gốc. Perft cờ tướng vẫn 44/1920/79666 (đã kiểm sau refactor).
- **Luật dùng chung**: `public/js/xiangqi-rules.js` thêm tham số `coup` (legalMove/inCheck/legalNoSelfCheck —
  mặc định false, admin không đổi); `App\Support\Xiangqi\Rules` thêm `role()` + tham số `$coup`.
- **Chơi với máy**: `?bien-the=co-up`; ván lưu `layout` (danh tính quân úp) trong localStorage, mọi trạng thái
  công khai dựng lại bằng `replay()` từ danh sách nước (đi lại chính xác, quân lật lại úp khi lùi).
- **Đấu bạn**: cột `games.variant|secret|reveals|captured` (migration 2026_10_02_100002). `secret` nằm trong
  `$hidden` của model và KHÔNG có trong `state()` — client chỉ thấy X/x. Test `CoupTest` kiểm việc này.
- Biên bản: `resources/js/notation.js` — nước quân úp ghi theo binh chủng ô + "(lật Mã)"; khay quân bị ăn có
  chênh lệch vật chất và số quân còn úp.
- Lối vào: menu Chơi (2 mục cờ úp), trang `/co-up` (2 thẻ), footer. Huy hiệu `coup-bot`, `coup-pvp`.

## Đợt 4 (02/10/2026) — Tối ưu máy (lỗi "Xe đã lật treo mà máy không ăn")
- **Nguyên nhân**: thinkCoup cộng điểm từng nước gốc qua nhiều cách xếp, nhưng alpha-beta chỉ cho điểm CHÍNH XÁC
  với nước tốt nhất; các nước khác chỉ là cận trên (toàn bằng nhau, vd 800) → cộng lại mất nghĩa, máy chọn gần như
  ngẫu nhiên. Engine cũ cấp Vừa còn thua người đi ngẫu nhiên (0 thắng/6, bỏ lỡ 279 lần ăn quân).
- **Sửa**: `exactRoot` (mỗi nước gốc tìm cửa sổ đầy đủ) cho cờ úp; kẹp điểm ±5000 trước khi lấy trung bình;
  quiescence không "đứng yên" khi bị chiếu; giảm đi bừa/nhiễu cấp Dễ khi chơi cờ úp; số mẫu theo cấp 1/4/6/6.
- **Tăng tốc**: nhớ vị trí 2 Tướng, kiểm tra hợp lệ lười trong vòng tìm, nút lá vào thẳng quiescence
  (2,6–4,6× nút/giây), bảng chuyển vị Zobrist dạng typed array 2^18 ô (độ sâu 5 khai cuộc: 6,9s → 3,8s).
- **Đo**: engine mới cấp Vừa thắng 6/6 trước người đi ngẫu nhiên; cấp Khó thắng cấp Vừa 3-2-1.
- **Kiểm tra bắt buộc sau mỗi lần sửa engine**: `node tools/engine-test.mjs` (perft, luật cờ úp, ăn Xe treo).

## Đợt 5 (02/10/2026) — Hiển thị "ăn nắp" trong cờ úp
- `resources/js/notation.js` → `analyse(startFen, moves, reveals, captured)`: biên bản + danh sách quân bị ăn có cờ
  `hidden` (lúc bị ăn còn úp = "nắp", suy ra bằng cách dựng lại bàn công khai; danh tính lấy từ `captured` theo thứ tự
  nước — KHÔNG cần đổi DB/server) + túi quân úp còn lại mỗi bên (bộ 15 quân − đã lật − nắp bị ăn).
- Khay: chip nắp viền vàng + nhãn "úp", đếm "N nắp", chip vừa bị ăn nhấp nháy; mục "Quân úp còn lại" có số lượng và
  % xác suất lật ra từng loại (thông tin công khai, dùng được cả 2 bên). Biên bản ghi "… ăn nắp: Xe".
- Thông báo tức thì: "Bạn ăn nắp: Xe!" / "Máy (Đối thủ) ăn nắp của bạn: Tượng" (play-bot.js, play-pvp.js).

## Đợt 6 (02/10/2026) — Lịch sử ván đấu, xem lại, chép vào thư viện để sửa / thêm biến
- Bảng `game_records` (migration 2026_10_03_100001): 1 dòng/người/ván — mode bot|pvp, variant, level, game_id
  (unique user+game, nullOnDelete), side, opponent, result win|loss|draw, reason, start_fen, moves/reveals/captured
  (JSON phẳng), plies. Model `GameRecord`, service `GameRecordService`.
- Ghi tự động: chơi với máy → `play-bot.js finish()` gửi kèm `moves/reveals/captured/side/reason` lên
  `/choi-voi-may/ket-qua` (MỌI kết quả, cả ván thua/hoà), server `storeBot()` kiểm lại luật TỪNG nước
  (`steps()` dùng `Rules::legalNoSelfCheck` + coup), sai luật thì bỏ qua; trả `record_url` → nút "Xem lại ván ·
  thêm biến" ở sheet kết thúc. Đấu bạn → `GameService::finish()` gọi `storePvp()` qua `DB::afterCommit` cho cả 2 người.
- Trang (auth, chỉ chủ ván, noindex): `/tai-khoan/lich-su-van-dau` (lọc loai/bien-the/ket-qua + thống kê),
  `/tai-khoan/lich-su-van-dau/{record}` (x-chess-board + diễn giải tiếng Việt `Rules::notation()` + lật quân/ăn nắp +
  khay quân bị ăn), POST `…/thu-vien` chép sang Thư viện (steps phẳng có `reveal` + cây biến lồng nếu ≤ 200 nước) rồi
  redirect `/tai-khoan/thu-vien?sua={id}` → library.blade tự bấm nút Sửa → fen-composer mở sẵn chế độ soạn nước,
  đi lại từ 1 nước cũ là tạo nhánh biến. DELETE xoá ván.
- ⚠️ Gotcha MySQL: cột kiểu JSON giới hạn độ sâu lồng 100 → cây biến (2 tầng/nước) của ván > ~49 nước bị từ chối
  (lỗi 3157). Migration 2026_10_03_100002 đổi `saved_positions.variation_tree` sang longText (model vẫn cast array).
- Link: dropdown tài khoản, hồ sơ, sảnh đấu bạn, trang chơi với máy, sheet kết thúc PvP. Test: `tests/Feature/HistoryTest.php`.

## Đợt 7 (02/10/2026) — Phân tích ván (Game Review), chơi tiếp từ thế bất kỳ, link chia sẻ ván
- **Phân tích ván** trên trang xem lại (`resources/js/review.js`, mount `[data-review]`): engine `review()` (engine.js)
  chấm điểm CHÍNH XÁC mọi nước tại từng thế (exactRoot); cờ úp lấy mẫu túi quân chưa lộ (4 mẫu, trung bình).
  Chạy song song tối đa 4 Web Worker (≈10 giây/30 nước). Xếp loại theo điểm mất (100 = 1 Tốt): ≤15 Tốt nhất,
  <60 Tốt, <150 Thiếu chính xác, <350 Sai lầm, còn lại Sai lầm nghiêm trọng (thế đã thắng/thua chắc không bị tính
  sai lầm). Độ chính xác % theo công thức Lichess (win% co giãn ×0.6 vì Xe = 9 Tốt). Hiện: thanh ưu thế, biểu đồ
  (bấm để nhảy), "Khoảnh khắc quyết định", mũi tên nước tốt hơn, **Thử tìm nước tốt hơn** (3 lần, chấp nhận nước
  trong 60 điểm của nước tốt nhất — dùng `alts` = điểm 14 nước đầu ở các thế có lỗi).
- Kết quả lưu `game_records.analysis` qua POST `history.analysis` (chủ ván, `cleanAnalysis()` làm sạch, ≤300KB);
  độ chính xác hiện ở danh sách lịch sử.
- **Chơi tiếp với máy từ thế này**: `/choi-voi-may?tu-the=FEN&luot=do|den[&bien-the=co-up&tui=RRC..-rrc..]` —
  server `GameRecordService::validStart()` (đủ 2 Tướng, quân úp đúng ô/bên, bên kia không bị chiếu, còn nước đi);
  play-bot.js hỗ trợ `startFen`/`redFirst`/túi quân úp; ván lưu `first_side`, KHÔNG tính XP. Có nút ở trang xem lại
  (mọi nước) và ở Thư viện.
- **Link chia sẻ**: POST `history.share` bật/tắt `share_token` (16 ký tự) → `/van-co/{token}` (noindex, công khai,
  hiện cả phân tích; đối thủ PvP hiện là "Bạn chơi" để không lộ tên người khác).
- Migration `2026_10_03_100003` (first_side, analysis, share_token). Test: `HistoryTest` 7 test.

## Đợt 8 (02/10/2026) — Thử thách tuần + giải thưởng bảng xếp hạng tuần
- Cấu hình `config/weekly.php`: kho nhiệm vụ 3 nhóm (Học / Luyện / Chơi), mỗi tuần (thứ 2–CN giờ VN) chọn CỐ ĐỊNH
  theo crc32 ngày đầu tuần: 1 nhiệm vụ/nhóm + 1 nhiệm vụ thêm khác chỉ số → mọi người cùng thử thách.
  Tiến độ suy từ dữ liệu sẵn có (`user_daily_activity`, sổ XP, `game_records` ≥10 nửa nước — ván thắng máy chỉ tính
  ván từ thế mở chuẩn, `practice_sessions`) → không ghi thêm gì khi học/chơi.
- Nhận thưởng: POST `/thu-thach-tuan/nhan` {quest | chest} → `GamificationService::grant()` (idem_key
  `weekly:{tuần}:{nhiệm vụ}`). **grant() KHÔNG cộng vào hoạt động ngày** → XP thưởng không tính vào bảng xếp hạng
  tuần/tháng, mục tiêu ngày, chuỗi ngày. Rương tuần (xong cả 4): +150 XP + 1 thẻ giữ chuỗi.
- Giải bảng XP tuần (bảng `weekly_awards`): Top 1/2/3 cúp vàng/bạc/đồng (+500/300/200 XP + 1 thẻ giữ chuỗi), hạng
  4–10 "Top 10" (+100 XP); tối thiểu 100 XP/tuần, người ẩn khỏi xếp hạng không xét. Không có cron → `ensureFinalized()`
  chốt tuần trước "lười" ở view composer layout (cache forever + unique week/user + idem_key ⇒ không trao trùng).
  Giải chưa xem → `window.__xq.award` → bảng chúc mừng 1 lần (POST `/giai-thuong-tuan/{id}/da-xem`).
- Trang `/thu-thach-tuan` (noindex): thử thách, giải thưởng, bảng XP tuần top 10, bục vinh danh tuần trước, tủ cúp.
  Thẻ thử thách thu gọn ở trang chủ (đã đăng nhập); banner ở `/xep-hang`; link ở dropdown tài khoản + hồ sơ.
- Huy hiệu mới: weekly-1/4 (mở rương), weekly-top10/podium/champ. Test: `tests/Feature/WeeklyTest.php` (3 test).
- ⚠️ `WeeklyAward.week_start` KHÔNG cast 'date' (sqlite lưu kèm giờ → truy vấn theo ngày lệch) — dùng accessor.

## Đợt 9 (02/10/2026) — Hồ sơ kỳ thủ công khai, theo dõi bạn bè, cài web như app
- Bảng `follows` (follower_id → followee_id, 1 chiều kiểu Duolingo, tối đa 200). `User::following()/followers()`,
  `isPublic()` (= không chọn "ẩn khỏi xếp hạng"), `profileUrl()` / `profileUrlFor(id, name)` → `/ky-thu/{id}-{slug}`
  (sai slug → 301 về đúng slug; hồ sơ riêng tư → 404 với người khác, chủ vẫn xem được kèm cảnh báo). noindex.
- Hồ sơ: cấp/XP, người theo dõi, chỉ số (chuỗi ngày, bài, thế cờ, ván thắng), huy hiệu đã mở, tủ cúp tuần + hạng tuần,
  kỷ lục, ván đã bật link chia sẻ. Nút Theo dõi (POST `profile.follow`, JS `resources/js/social.js`) / Thách đấu / Mời bạn bè.
- `/ban-be` (`SocialService`): bảng XP tuần giữa mình + người đang theo dõi, bảng tin 14 ngày (huy hiệu, giải tuần,
  thắng đấu bạn / thắng máy cấp Vừa+), danh sách đang theo dõi / người theo dõi (nút "Theo dõi lại").
- Tên trên `/xep-hang`, top 10 + bục vinh danh `/thu-thach-tuan` đều link sang hồ sơ; tab "Bạn bè" ở bảng xếp hạng;
  dropdown tài khoản + trang hồ sơ có lối vào.
- PWA KHÔNG service worker: manifest thêm `id`, `shortcuts` (Thế cờ hôm nay / Chơi với máy / Thử thách tuần);
  nút "Cài ứng dụng" trong dropdown chỉ hiện khi trình duyệt bắn `beforeinstallprompt`.
- Test: `tests/Feature/SocialTest.php` (3 test).

## Đợt 10 (02/10/2026) — Nhận diện bàn cờ từ ảnh (cả cờ úp) `/nhan-dien-ban-co`
- Chạy HOÀN TOÀN trên trình duyệt (`resources/js/scan/recognize.js`, ảnh không tải lên server):
  1. `detectGrid()` — ảnh màn hình/ảnh chụp thẳng: đếm điểm "đường kẻ" theo hàng/cột (tổng tiền tố, chỉ tính
     trong phạm vi lưới ứng viên), chọn 10 hàng + 9 cột cách đều, tinh chỉnh bằng trọng tâm + hồi quy. Điểm < 1.0
     → coi như không thấy (ảnh chụp nghiêng) → người dùng kéo 4 chấm vào 4 góc lưới.
  2. `rectify()` — homography 4 điểm → ảnh nắn phẳng S=40px/ô.
  3. `classify()` — nền cục bộ (lấy mẫu LỆCH tâm ô vì đường chéo cung đi qua tâm); có quân = độ phủ theo 36 cung
     góc (giao điểm trống chỉ khác nền dọc đường kẻ); căn tâm lại theo trọng tâm đĩa quân; màu mặt quân = màu
     chiếm diện tích lớn nhất; cắt vòng viền theo bán kính (mực phủ > 50% chu vi) + bỏ cung tròn mỏng (thành phần
     liên thông); quân úp = gần như không có mực; màu Đỏ/Đen = độ đỏ của mực/mặt quân (2 cụm Otsu).
     Chữ → binh chủng: so khớp mật độ phủ 20×20 với mẫu từ 4 font OFL subset `public/fonts/scan/*.woff2`
     (Noto Serif TC, Noto Sans TC, Noto Serif SC, LXGW WenKai TC — đủ phồn/giản thể 帥帅將将 車俥车 炮砲包…),
     góc 0/180° (ảnh chụp: 24 góc khi quality < 0.76). Gán tối ưu bằng Hungarian theo luật (số lượng, ô hợp lệ
     Tướng/Sĩ/Tượng/Tốt — cờ úp nới Sĩ/Tượng/Tốt), thử cả 2 chiều bàn chọn tổng điểm cao hơn.
- Trang (`ScanController`, view `scan.blade.php`, JS `resources/js/board-scan.js`): chọn/chụp/kéo thả/Ctrl+V ảnh,
  3 ảnh mẫu `public/images/scan-mau/`; bước căn lưới (canvas + lưới xanh xem trước); kết quả: ô kém chắc có viền
  vàng, bấm ô → bảng chọn quân để THẨM; kiểm tra luật (đủ Tướng, thừa quân, bên không đi đang bị chiếu); chọn bên đi;
  Máy đánh giá (engine `review` trong worker, gợi ý nước + mũi tên); Chơi tiếp với máy (`?tu-the=&luot=&tui=`);
  Mở trình soạn (`/tai-khoan/thu-vien?fen=` → library tự nạp FEN, tự bật Cờ Úp nếu có X/x); Lưu thư viện.
- AI tuỳ chọn: chỉ hiện khi hosting có `ANTHROPIC_API_KEY` — `BoardVisionAgent` (structured output 10 chuỗi × 9 ký tự)
  nhận ảnh ĐÃ NẮN, server `rowsToFen()` kiểm định dạng; 15 lượt/người/ngày + throttle.
- Đo độ chính xác: `tools/scan-bench` (sinh 66 ảnh có đáp án + chấm trong Chrome headless): ảnh màn hình 98.9% ô
  đúng, cờ úp 97.3%, ảnh chụp mô phỏng (góc kéo tay) 91.7%. Ảnh thật đa dạng hơn → luôn cần bước thẩm.
- Test: `tests/Feature/ScanTest.php` (agent AI giả lập bằng `BoardVisionAgent::fake`).

### Đợt 10b (02/10/2026) — Ảnh chụp VÁN CỜ THẬT (quân đặt lệch, chữ xoay tự do, gỗ trên gỗ)
- Chế độ `photo` (tự bật khi không tự tìm được lưới → người dùng kéo góc; có công tắc "Ảnh chụp bàn cờ thật"),
  nắn ở 56 px/ô:
  - Phát hiện quân = **đường tròn mép quân** (`bestCircle`: gradient Sobel hướng tâm, tâm lệch ≤ 0.3 ô, bán kính
    0.34–0.5 ô, phạt khoảng hở chu vi), lấy bán kính LỚN NHẤT còn biên mạnh (mép ngoài, không phải vòng khắc).
    Loại quân "ma": đường kẻ vẫn chạy liền vào tâm ≥ 3 hướng (có quân thì bị che); 2 đĩa chồng nhau → bỏ đĩa yếu;
    tâm lệch > 0.18 mà biên < 0.72; hàng 4/5 không cho tâm trượt vào sông (chữ 楚河 漢界).
  - Mực = điểm TỐI hơn "mặt phẳng ánh sáng" khớp trên mặt quân (ánh sáng loang), ngưỡng Otsu, bản đồ mực mềm.
  - Nhận chữ: lấy mẫu theo toạ độ chuẩn hoá BÁN KÍNH quân + căn tâm theo trọng tâm mực + cỡ theo bán kính quán tính
    (so với mẫu), xoay 24 góc × 3 cỡ, cắt vòng khắc ngoài 0.7R; bước tinh 3 ứng viên đầu (lưới 32, ±6°);
    phạt nhẹ mẫu giản thể (bộ cờ gỗ ở VN hầu hết phồn thể).
  - Màu Đỏ/Đen ảnh chụp = R−G của 35% điểm mực đậm nhất (gỗ vốn ngả đỏ nên không dùng màu mặt quân).
- UI: khung căn lưới vừa 72% chiều cao màn hình (ảnh dọc điện thoại thấy đủ 4 góc), **kính lúp** khi kéo chấm,
  hướng dẫn "góc bị quân che → đặt chấm vào tâm quân". Ảnh mẫu mới `ban-that.jpg`, `co-up-that.jpg`.
- Đo: `tools/scan-bench` — ván thật 90.9%, cờ úp thật 87.4% (trước ~0%), ảnh màn hình giữ 98.9%.

## Đợt 11 (02/10/2026) — "Sai lầm của tôi": học từ sai lầm trong ván của chính mình
- Bảng `game_mistakes` (migration 2026_10_06_100001): mỗi nước Sai lầm / Sai lầm nghiêm trọng CỦA NGƯỜI CHƠI tìm ra khi
  "Phân tích ván" → thế cờ trước nước sai, nước đã đi, nước máy đề xuất, `alts` (điểm các nước ứng viên — chỉ ở server),
  hộp Leitner 0..4, `due_on` (chuỗi Y-m-d, không cast date). `MistakeService::syncFromRecord()` gọi khi lưu phân tích
  (idempotent, unique record+ply) + đồng bộ bù 30 ván đã phân tích gần nhất khi mở trang.
- `/luyen-tap/sai-lam-cua-toi` (auth, `MistakeController`, `resources/js/mistakes.js`): 20 thế đến hạn, bàn cờ cho bên
  phải đi, POST nước → server chấm: đạt nếu điểm ≥ điểm tốt nhất − 60 (0.6 Tốt); đúng → hộp+1, gặp lại sau 1/3/7/21 ngày,
  hộp 4 = đã thuộc; sai / "Xem đáp án" → hộp 0, ôn lại ngày mai. Đúng +8 XP (`mistake_fix`, tính vào trần XP thế cờ/ngày).
- Lối vào: thẻ ở `/luyen-tap`, nút "Luyện lại N sai lầm của bạn" + toast ngay sau khi phân tích xong.
- Huy hiệu `mistakes-10/50`; nhiệm vụ tuần `mistakes-5` với `since: 2026-10-12` — config weekly hỗ trợ `since` để thêm
  nhiệm vụ mới KHÔNG làm đổi bộ nhiệm vụ của tuần đang diễn ra. Test: `tests/Feature/MistakeTest.php`.

## Đợt 12 (02/10/2026) — Chuẩn hoá luật: ăn nắp bí mật + chiếu dai (user yêu cầu)
- **Ăn nắp (cờ úp):** ăn quân đang úp thì CHỈ bên ăn biết là quân gì; bên kia + người xem chỉ thấy 'X'/'x' (màu, không
  binh chủng) cho tới khi hết ván. Server: `Game::capturedFor($viewerSide)` (state() trả theo người xem). Máy:
  `play-bot.js seenCaptured()`; engine nhận túi quân THEO HIỂU BIẾT bên đang nghĩ (`pools(forRed)`: bộ 15 − quân đã
  lật − nắp chính mình ăn; nắp bị đối phương ăn vẫn ở trong túi → túi có thể lớn hơn số quân úp trên bàn, engine bốc
  ngẫu nhiên đủ số). Khay: nắp chưa rõ = "?"; hết ván nắp đối phương ăn = nút "?" bấm để lật (`renderCaptured(.., {over})`);
  xác suất "quân úp còn lại" chia cho cả túi chưa lộ + ghi "N nắp bị ăn chưa rõ". Biên bản: "ăn nắp (chưa rõ)".
- **Chiếu dai (cả cờ tướng & cờ úp, máy + đấu bạn):** nước CHIẾU đưa tới thế (bàn + lượt) đã xuất hiện ≥ 2 lần bị cấm
  (`GameService::forbiddenCheck`, `play-bot forbidden()`; engine nhận `avoid` → loại ở gốc, nếu chỉ còn nước bị cấm thì
  vẫn đi). Lặp 3 lần → hoà CHỈ khi trong chu kỳ không có bên nào nước nào cũng chiếu (thế sau nước đỡ lặp tới lần 3 trước
  thế sau nước chiếu — nếu cứ lặp 3 là hoà thì chiếu dai thành hoà, sai luật).
- `postJson` giữ body lỗi (`e.data`) → đấu bạn hiện đúng lý do bị từ chối. Test: `tests/Feature/CoupRulesTest.php`.

## Đợt 13 (02/10/2026) — Máy đánh đúng lý thuyết cờ úp + book khai cuộc cờ tướng (user yêu cầu)
- **Lỗi gốc cờ úp:** máy (và phân tích) coi "Pháo giả vật Mã giả" (b2b9/h2h9) là nước mạnh nhất. Nguyên nhân: (1) mỗi mẫu
  xếp quân úp engine "nhìn thấy" quân thật → tính như biết trước (strategy fusion); (2) phương sai mẫu lớn (2 nước đối xứng
  lệch hàng trăm điểm); (3) không có kiến thức khai cuộc. Sửa trong `resources/js/engine/engine.js`:
  - Quân úp lượng giá theo **kỳ vọng túi quân** (`hiddenValues`) + tiềm năng ô xuất phát `SLOT` + độ linh hoạt `MOB` — không nhìn trộm.
  - **Lấy mẫu phân tầng** (`stratifier`): mỗi ô úp nhận lần lượt các quân rải đều túi qua K mẫu.
  - `coupOpeningPrior` (khi còn ≥ 24 quân úp): quân úp ăn nắp mà bị ăn lại ngay −200; tốt Biên +35, tốt đầu −35, tốt 3/7 +10,
    mở Pháo +15 — áp cho cả máy (`thinkCoup`) lẫn phân tích (review). Tốt xuống đáy = lão tốt (PST 15).
  - Kết quả: xếp hạng nước đầu a3a4/c0e2/e3e4 đứng đầu, b2b9 tụt #9; cấp Vừa vật Pháo nước đầu 0/6 (test).
    Đấu cặp đổi màu cấp Vừa engine mới vs cũ 24 ván: **13 thắng – 9 thua – 2 hoà** (không yếu đi).
- **Book khai cuộc cờ tướng** `resources/js/engine/book.js`: 21 diễn biến có trọng số (Pháo đầu–Bình phong mã: Mã thất lộ/
  Xe qua hà; Phản cung mã; Thuận pháo Xe thẳng–Xe ngang; Liệt pháo; Tam bộ hổ; Tiên nhân chỉ lộ: đối binh/Pháo dưới tốt;
  Phi tượng; Khởi mã; Quá cung pháo; Sĩ giác pháo). Worker: cấp ≥ 2, không phải chế độ phân tích → đi nước sách ngẫu nhiên
  theo trọng số (tôn trọng `avoid`). Phân tích ván: nước trong book = **"≡ Nước sách"** (class `book`, độ chính xác 100,
  không gợi ý "nước tốt hơn"); `GameRecordService::cleanAnalysis` nhận class `book`.
- Test: `node tools/engine-test.mjs` thêm kiểm prior cờ úp + tính hợp lệ từng nước sách. Không cần migrate.
- **Bổ sung 02/10 (sau deploy) — bỏ "biết trước" quân lật trong cây tìm kiếm:** đo phân tích ở thời gian thật (1,2s,
  4 mẫu) thấy thế đầu bị chấm ≈ −300 và nước tốt thường bị "mất" 200–470 ngẫu nhiên — vì trong mỗi mẫu, nước lật quân
  được tính theo quân THẬT nên tìm kiếm chọn đúng nước "lật trúng Xe" (strategy fusion ở nút trong). Sửa: `st.rv[i]=1`
  cho quân lật trong lúc tìm kiếm (make/unmake giữ), `evaluate` tính vật chất của nó = kỳ vọng túi quân (vị trí vẫn theo
  quân thật). Kết quả: thế đầu ≈ 0, nước đối xứng điểm bằng nhau, sai số ±50; đấu cặp cấp Vừa vs bản 184f757:
  **21–11** (32 ván). Phân tích cờ úp dùng ngưỡng rộng hơn (tốt nhất ≤30 · tốt <90 · thiếu chính xác <200 · sai lầm <400).

## Đợt 14 (02/10/2026) — Luyện tập nhận MỌI đường chiếu hết, không chỉ 1 nước trong sách (user yêu cầu)
- Trước: chỉ nước CUỐI được nhận nước chiếu hết khác; nước giữa khác sách = sai. Đo 120 thế: 12/100 thế chiếu hết có nước
  đầu thắng khác sách (22 nước bị chấm sai oan), 37 nước khác thắng nhưng chậm hơn.
- Bộ giải CHỨNG MINH chiếu hết `engine.js` (`mateIn`, `checkPuzzleMove`): bên hết nước = thua; thử "liên chiếu" trước
  (nhanh), toàn bộ nước khi còn ≤ 3 nước (`FULL_MAX`); hết giờ → không kết luận. Kiểm 1 nước ~10–850ms, chạy Web Worker
  (`worker.js` message `puzzle`, `resources/js/puzzle-check.js` gắn `window.XiangqiPuzzleCheck`, nạp ở practice.js + lesson.js).
- **Chuẩn công bằng:** nhiều thế trong sách cho bên thua đỡ CHƯA tốt nhất (VD #22: Đen đỡ a8a9 thì không bị chiếu hết trong 3
  nước) → nước khác sách được nhận nếu thắng KHÔNG CHẬM HƠN nước đáp án khi cả hai cùng gặp cách đỡ tốt nhất (budget = n,
  hoặc số nước thật của đáp án, tối đa n+2). Chỉ áp cho thế mà lời giải kết thúc bằng chiếu hết.
- `public/js/board.js` createPuzzle: nước khác sách → khoá bàn "Đang kiểm tra…" → `win`: đi tiếp ĐƯỜNG RIÊNG (`state.dyn`,
  đối phương đỡ DAI nhất do máy chọn, gợi ý = nước thắng kế tiếp); `slow`: "vẫn thắng nhưng chưa nhanh nhất", không tính sai;
  còn lại: sai như cũ. Chiếu hết sớm hơn sách ở bất kỳ nước nào → đúng. Kết quả gửi kèm `line` (cả 2 bên).
- Server `PuzzleService::verifyLine`: luân phiên đúng bên, hợp lệ, kết thúc bên đỡ hết nước, số nước bên giải ≤ lời giải + 2.
  Nhận `line` ở `/luyen-tap/the-co/{id}/thu` + phiên 60 giây/3 mạng. Test: `tests/Feature/PuzzleAltLineTest.php`,
  `tools/engine-test.mjs` (bộ giải). Không cần migrate.

## Đợt 15 (02/10/2026) — Kiểm định thế cờ + bộ giải nước êm + book khai cuộc sâu (user yêu cầu 1→2→3)
1. **Admin › Kiểm định thế cờ** (`/admin/kiem-dinh-the-co`, nhân sự): bộ giải thử mọi cách đỡ ở từng nước của bên thua
   trong 747 thế chiếu hết → 207 thế (180 mục sau khi gộp thế đầy đủ + đoạn kết theo bài/nước): 131 "Thoát" (không bị
   chiếu hết trong số nước còn lại — chắc chắn vì còn ≤ 3 nước), 49 "Kéo dài"; 73 chỗ chính nước sách cũng không bị ép
   (lời giải dựa vào nước đỡ yếu phía sau). Bàn mini mũi tên đỏ/xanh, ký hiệu Việt, nút "Đã sửa bài / Giữ nguyên"
   (bảng `puzzle_audit_marks`, khoá bài + nước). Dữ liệu `database/data/puzzle-audit.json` sinh bằng
   `tools/puzzle-audit.mjs` (hosting không chạy Node) — quy trình chạy lại: `.claude/puzzle-audit.md`.
2. **Bộ giải chiếu hết thêm nước êm:** ≤ 3 nước xét mọi nước; sâu hơn liên chiếu + tối đa 2 nước êm (`QUIET_MAX`),
   chạy theo TẦNG: liên chiếu trước (nhanh), tầng nước êm có giờ riêng `QUIET_MS = 700`. Đo 31 thế dài (≥ 4 nước, 706
   nước khác sách): nước khác sách chứng minh thắng 3 → 8, đáp án chứng minh 19 → 20, trung bình < 1 giây/nước
   (bản thử không chia tầng: 2 giây, 444 lần hết giờ → bỏ).
3. **Book khai cuộc sâu:** `book-data.js` tự sinh từ 73 bài khai cuộc (engine lọc nước kém > 150 điểm) → 72 dòng, 574
   thế, dài tới 20 nước (trước 21 dòng ≤ 10 nước). Bộ lọc bắt 5 lỗi trong dòng viết tay cũ (Xe ra sau lưng Pháo bị ăn)
   → đã cắt. Chi tiết: `.claude/opening-book.md`.
- Deploy cần `php artisan migrate --force` (bảng `puzzle_audit_marks`).

## Đợt 16 (02/10/2026) — Đồng hồ khi chơi với máy (user yêu cầu)
- Màn hình bắt đầu: "Thời gian mỗi bên" — nhóm Cố định: Không giới hạn · 5 · 10 · 15 · 30 phút; nhóm Cộng giây: 5'+3s · 10'+5s (mặc định) · 15'+10s (Fischer: cộng giây
  sau mỗi nước). `g.clock = {tc, inc, do, den, hist}` lưu trong ván (localStorage); `hist` = giờ còn lại sau mỗi nước →
  "Đi lại" khôi phục đúng giờ.
- 2 thanh đồng hồ kẹp trên (Máy) / dưới (Bạn) bàn cờ, lật bàn thì đổi chỗ; bên đang đi sáng màu, < 20s đỏ nhấp nháy,
  < 10s hiện phần mười giây. Hết giờ = thua ("hết giờ", lưu lịch sử như ván thường). Nước tới sau khi đã hết giờ bị bỏ.
- Máy cũng bị tính giờ: còn < 45s thì nghĩ tối đa cấp Vừa, < 15s tối đa cấp Dễ.
- Rời trang / ẩn tab: chốt giờ còn lại (không tính thời gian vắng mặt) — mốc lượt `turnStart` KHÔNG lưu.
- Sửa kèm: thẻ "Máy · cấp …" bị `max-width: 62%` cắt mất tên cấp.

## Đợt 17 (02/10/2026) — Máy cờ úp cấp Khó mạnh hơn + phân tích chuẩn hơn (user: "máy cấp Khó vẫn hay thua")
- **Chẩn đoán trên 7 ván thật (đồng bộ từ web):** người thắng 5/7 — máy thua bằng bị chiếu hết dù HƠN quân (ván 1: +1250);
  cờ úp cấp Khó chỉ tính sâu 3–4 nửa nước (4,5s chia 6 mẫu × ~0,75s, mỗi mẫu tính chính xác MỌI nước gốc); nguyên lý
  khai cuộc chỉ áp 3 nước đầu → giữa khai cuộc vẫn "Pháo giả vật nắp" bị ăn lại; ván 6 máy chiếu dai rồi bị luật ép
  đổi nước vào thế thua.
- **Tìm kiếm** (`search`): kéo dài khi bị chiếu, nước rỗng (null move, bỏ khi tàn cuộc hết Xe/Mã/Pháo), PVS + LMR (không
  giảm nước ăn quân / lật quân / killer), history heuristic. 3 giây: cờ tướng sâu 5 → 8, cờ úp 5 → 7. Cấp Khó bỏ trần độ
  sâu (tới đâu hết giờ thì thôi). Đấu cờ tướng 1s/nước vs bản cũ: **8 thắng – 1 thua – 15 hoà**.
- **Cờ úp cấp Khó:** 4 mẫu + thu hẹp ứng viên (`coupNarrow: 8`: mẫu đầu 30% thời gian chấm mọi nước, các mẫu sau chỉ
  8 nước tốt nhất) + nguyên lý khai cuộc mở rộng (`coupOpeningPrior`, bên đi còn ≥ 11 quân úp ≈ 5 nước: mở quân hàng
  trên, giữ Xe giả, không phí nước quân đã ngửa −25, ô Xe −30, Sĩ/Tượng −20, Mã −10; vật nắp bị ăn lại −200). Đấu cặp
  vs bản cũ cùng 4,5s: chỉ search mới 8–8; + nguyên lý & dồn thời gian: 12–4, 11–4–1, cấu hình cuối 9–7 (cách xếp mới)
  → tổng 32–15–1.
- **Chiếu dai:** máy tránh chiếu lặp ngay từ lần 2 (`forbiddenMoves(red, 1)`) — chiếu dai không giữ được hoà theo luật.
- **Phân tích 2 lượt** (`review.js`): lượt nhanh (cờ úp 2,4s × 6 mẫu, bỏ trần độ sâu 4/5) rồi kiểm tra KỸ (×3 thời gian,
  8 mẫu) các nước bị đánh dấu chưa tốt. Đo 52 thế thật so với chuẩn 20s × 12 mẫu: sai lệch điểm mất 181 → 62, xếp
  loại trùng 44 → 45/52, nước tốt nhất trùng 38 → 40/52. Ván 63 nước ≈ 70 giây (trước ≈ 25 giây).

## Đợt 18 (02/10/2026) — Nhận dạng ảnh: học kiểu chữ của phần mềm người dùng hay chụp
- Ảnh lỗi người dùng gửi (phần mềm TQ, quân 3D chữ thư pháp): vị trí + màu đúng, sai binh chủng 6–9 ô — font mẫu không
  giống chữ thư pháp, quân 3D cùng tông gỗ → rơi vào chế độ ảnh chụp. Lưu thành ca thật `tools/scan-bench/real/`.
- `recognize.js`: trả `sigs` (chữ ký nét chữ 20×20 từng quân); `opts.learned` = mẫu đã học → khớp ≥ 0.8 thì điểm =
  30% font + 70% mẫu học. `board-scan.js`: dùng kết quả đã thẩm (đánh giá / chơi tiếp / lưu / soạn) → lưu ≤ 6 mẫu mỗi
  binh chủng vào localStorage (`xq.scan.learned`, có nút Xoá); sửa 1 ô → tự sửa các quân chữ TRÙNG KHÍT (≥ 0.93; ngưỡng
  thấp hơn đo trên ảnh thật sửa nhầm); nhiều ô chưa chắc + có AI → gợi ý "Nhận dạng lại bằng AI" (kết quả AI dùng xong
  cũng được học).
- Bench 87 ảnh sinh: không đổi so với trước (98.0 / 97.4 / 97.3 / 90.9 / 86.4%).
- AI nhận dạng (Claude vision) cần `ANTHROPIC_API_KEY` trong .env hosting — hiện TRỐNG nên nút AI không hiện.

## Đợt 19 (02/10/2026) — Giao diện bàn cờ, quân cờ, âm thanh (user yêu cầu)
- **LỖI CŨ đã sửa:** đổi màu bàn (Cổ điển / Ngọc bích / Tương phản cao) KHÔNG có tác dụng — biến `--xq-*` gốc ở `:root`
  (base.css, ngoài @layer) luôn thắng quy tắc `[data-board-theme]` nằm TRONG `@layer components`. Giờ các quy tắc màu bàn
  + số cột nằm cuối board.css, ngoài layer.
- Màu bàn mới: Gỗ đậm (walnut), Giấy (paper), Cẩm thạch (marble), Bàn đêm (night) — 8 màu, ô mẫu xem trước.
- Quân cờ (`board.js` PREF, localStorage): `piece_set` han|vi (chữ Việt Tướng/Sĩ/Tượng/Mã/Xe/Pháo/Tốt — cho người mới),
  `piece_style` flat|3d (bóng đổ, thành quân, gradient mặt cong, gờ sáng), `board_coords` 1 = số cột quanh bàn (trên 1..9,
  dưới 9..1, màu theo bên ngồi; khung `.board-holder` 468/550; ảnh thu nhỏ `{thumb:true}` không hiện).
- Âm thanh (`Sound`, localStorage `xq_sound`): bật/tắt, âm lượng (master gain), bộ âm Gỗ/Đá-ngọc/Nhẹ, báo chiếu tướng
  (`moveFx` kiểm chiếu sau mỗi nước — bài học, biến, ván đấu, giải đố), tích tắc < 10s (chơi máy + đấu bạn), âm báo kết
  thúc ván (thắng/thua/hoà), giọng đọc nước đi tiếng Việt (Web Speech; không có giọng vi thì im + báo trong cài đặt;
  đọc khi đi TIẾN trong bài học, sau mỗi nước khi chơi máy).
- Trang cài đặt: `partials/display-settings.blade.php` + `resources/js/display-settings.js` (xem trước trực tiếp, "Đi thử
  1 nước", nghe thử) — ở Cài đặt tài khoản và trang công khai `/giao-dien-ban-co` (khách dùng được); menu "⋯" mọi bàn cờ
  có lối tắt "Giao diện & âm thanh".
- Màn hoàn thành bài: vượt mục tiêu ngày hiện "Đã đạt mục tiêu hôm nay ✓ 143 XP / 50" thay vì "143/50 XP".

## Đợt 20 (06/10/2026) — Footer 2 cột + "Một dự án của LapCameraHCM" + chế độ "Đoán nước"
- Footer: điện thoại 2 cột (Học | Luyện tập, Chơi | Khám phá), máy tính 5 cột; dòng cuối "Một dự án của LapCameraHCM"
  → https://lapcamerahcm.vn (dofollow, anchor thương hiệu — tránh chữ "tài trợ" để Google không coi là link trả tiền).
- **Đoán nước** (học chủ động, tab trên trang bài học cho mọi bài cờ tướng ≥ 4 nước): chọn cầm Đỏ/Đen (nhớ localStorage
  `guess_side`), tới lượt mình thì đi nước nghĩ là đúng → đúng: "Đúng!" + lời giảng; sai: mũi tên xanh chỉ nước trong bài
  1,5s rồi đi tiếp; máy đi nước đối phương + nối lời giảng; hết bài "đoán đúng X/Y (Z%)", âm báo, phát
  `xq:guess-done` (GA `guess_done`) + `xq:viewed-all-moves` (tính là đã xem hết bài). Code: `createPuzzle` cfg.guess
  (guessAttempt/guessStep/guessDone) trong public/js/board.js; component chess-board mode="guess".

## Đợt 21 (06/10/2026) — 4 sửa theo phản hồi người dùng
1. **Luật cờ úp hết nước đi = THUA** (không phải hoà): bên chỉ còn Tướng / mọi quân bị khốn mà không bị chiếu vẫn thua —
   khớp bài "Cờ tàn cờ úp" trên site ("thắng = diệt hết quân hoặc ép hết nước đi"). Sửa engine (`terminal`, `gameOver`),
   server đấu bạn (`GameService`), luật trên trang chơi máy; test `CoupRulesTest::test_coup_no_legal_move...` + engine-test.
2. **Đánh dấu nước vừa đi** (Cài đặt → Giao diện): Loé sáng (mặc định) / **Vòng xoay** (vòng nét đứt xoay quanh quân vừa
   đi, `.xq-spin`) / Chỉ tô ô; ô tích **Mũi tên nước vừa đi** (mờ, vẽ dưới quân). localStorage `last_fx`, `last_arrow`.
3. **Nước tương đương trong luyện tập** (`equivMove` trong engine.js, worker `puzzle` trả `status:'equiv'`): chỉ xét nước
   CÙNG QUÂN với nước bài (Xe/Pháo thoái 3-4-5…) hoặc nước SAU của lời giải đi trước (đổi thứ tự); thế chiếu hết: chỉ nhận
   khi máy thấy cả 2 đều chiếu hết (chậm ≤ 1 nước); thế khác: máy tính ≥ 6 nước, coi nước bài gần tốt nhất (≤ 30), nước
   người chơi kém ≤ 12. Nhận → "Nước tương đương ✓", bàn đi theo bài (kết quả gửi server = lời giải chuẩn). Áp cả "Đoán
   nước". Đo kho: bản đầu (tol 35, không giới hạn quân) nhận nhầm ở thế chiếu hết máy chưa thấy sát (#433, #217) → siết.
4. **3 mạng**: trái tim không đổi màu — CSS đặt `color` thẳng lên svg nên `.is-lost` (đặt trên span) vô tác dụng;
   server vẫn trừ mạng đúng. Giờ tim còn = đỏ đặc, mất = viền mờ, vừa mất thì rung.

## Đợt 22 (06/10/2026) — Luật lặp nước + pháp lý/SEO + nâng cấp Admin
1. **Lặp nước 3 lần** (`app/Support/Xiangqi/Repetition.php` ↔ `resources/js/repetition.js`): lần 2 hiện thông báo;
   nước gây lần 3 phải xác nhận (đấu bạn: HTTP 409 `confirm` → gửi lại `confirm=1`; chơi máy: `window.confirm`).
   Phán quyết lần 3: bên mà MỌI nước trong vòng lặp là chiếu/bắt (đuổi quân không được bảo vệ, Mã/Pháo đuổi Xe) còn bên kia
   không → bên đó THUA; còn lại hoà. Chiếu mãi vẫn cấm như cũ (`forbiddenCheck`). Máy tránh lặp khi sẽ thua / khi đang hơn quân.
2. **Pháp lý + SEO**: `/dieu-khoan-su-dung`, `/chinh-sach-bao-mat` (theo NĐ 13/2023), link footer + trang đăng ký + sitemap;
   JSON-LD Organization thêm email + parentOrganization LapCameraHCM; `SoftwareApplication` (`Seo::appLd`) cho chơi máy,
   sảnh đấu bạn, quét ảnh, luyện tập; `llms.txt` thêm mục công cụ; log truy cập giữ 180 ngày.
3. **Admin**: bảng `login_events` (ghi từ 10/2026), khoá/mở khoá tài khoản (`users.banned_at`, middleware `EnsureNotBanned`),
   xoá tài khoản (gõ lại email), đổi vai trò; trang người dùng có bộ lọc/sắp xếp, trang chi tiết nhiều tab (đăng nhập, học tập,
   luyện tập, ván đấu, bình luận, truy cập, heatmap 28 ngày). Thống kê: người dùng/học tập/luyện tập/chơi máy theo cấp/đấu bạn/
   đăng nhập/top tuần. **Cài đặt web & SEO** (`site_settings` ghi đè `config('site.*')` trong `AppServiceProvider`): tên, mô tả,
   email, title/description trang chủ, GA4, GSC, mạng xã hội + quản lý chuyển hướng 301 (404 tự tra `UrlRedirect`).
   ⚠️ Deploy cần `php artisan migrate --force`.

## Đợt 23 (06/10/2026) — Đấu bạn xã hội + Xếp cờ để thẩm + lộ trình tự động
1. **Đấu bạn**: xin đi lại (`games.takeback_offer/takebacks/takeback_block`, tối đa `Game::MAX_TAKEBACKS`=3 lần ĐƯỢC ĐỒNG Ý/người/ván;
   bị từ chối phải chờ nước mới; tới lượt người xin = lùi 2 nước, không thì 1; cờ úp trả quân lật/nắp bị ăn về `secret`
   — `GameService::undo`). "Đề nghị hoà" đổi tên "Xin hoà". Xem ván cần đăng nhập (khách bị chuyển tới đăng nhập, trừ phòng
   chờ); đếm người xem bằng cache 20s. Online = `users.last_seen_at` (middleware `TouchLastSeen` ≤1 lần/phút + poll lời mời)
   trong `User::ONLINE_MINUTES`=3. Mời bạn bè (theo dõi 1 chiều bất kỳ) đang online: bảng `game_invites`, 3 lời/10 phút,
   hết hạn 2 phút; người nhận thấy thẻ `.invite-pop` ở MỌI trang (`resources/js/invites.js`, poll `/loi-moi` 20s, 3s sau khi
   vừa mời) → Đồng ý tự tạo phòng + vào ván, người mời tự chuyển vào ván. Sảnh: bạn online + phòng đang đấu (`/dau-ban/sanh`).
2. **Xếp cờ để thẩm** `/luyen-tap/xep-co` (`setup-board.js`): bàn xếp quân cờ tướng/cờ úp (kiểm vị trí, số quân, Tướng đối
   mặt, bên vừa đi bị chiếu, hết nước) → sang `/choi-voi-may?tu-the=…&cam=do|den|may&cap=N` tự vào ván không giờ. Ván thế tự
   chọn có nút **Đổi bên** (`board.setSide`) và **Máy tự giải** (`g.auto`, máy đi cả hai bên, không lưu lịch sử). Lưu thư viện
   (ghi "Đen đi trước" vào note); Thư viện có nút "Thẩm".
3. **Lộ trình + sơ đồ trang tự động**: `LearningPathService::courseSeries()` thêm series có bài published chưa khai báo trong
   config (theo game_mode → phase → phase phổ biến của bài). `/so-do-trang` nhóm theo chặng + mục công cụ.
   ⚠️ Deploy cần `php artisan migrate --force`.

## Đợt 24 (07/10/2026) — Công cụ Sơ đồ tư duy + 3 bài khẩu quyết cờ tàn
- `App\Support\Mindmap`: cây {t, k[], l, note, c[]}; `fromSeries(chuyên đề, hoa|thang|kheo)` đọc "Kết quả:" + mục
  "Khẩu quyết" + "Đỏ: …" trong nội dung bài → Chương › lực lượng tấn công (Một/Hai Chốt, Đơn/Song Xe, Mã Chốt…) › thế.
  Dàn ý chữ ↔ cây (`parseOutline`/`toOutline`, # cấp, `- ` khẩu quyết, `> ` ghi chú, `@slug` ví dụ).
- Shortcode bài viết (`PostContent::render`): `[so-do-tu-duy chuyen-de=".." ket-qua=".."]` (tự cập nhật) hoặc
  `[so-do-tu-duy slug=".."]` (bảng `mindmaps`, Admin › Sơ đồ tư duy: soạn dàn ý, tạo từ chuyên đề, xem trước iframe).
- HTML server-side `<details>` (SEO, không JS vẫn mở được): số 1/1.1/1.1.1, khẩu quyết `<ol>` đánh số, bàn cờ thu nhỏ vẽ
  khi mở nhánh, "Xem ví dụ" + "Tự đánh kiểm chứng" (thế hòa: cam=den; thắng: cam=do). `resources/js/mindmap.js`: mở/thu,
  tìm, "Che khẩu quyết" (bấm từng câu để lật), "Đã thuộc" + tiến độ (localStorage `xq.mm.{id}`), "Ôn ngẫu nhiên" (ưu tiên
  thế chưa thuộc).
- Bài `tools/news-seo/posts/17–19` (hòa 69 thế, thắng 135, khéo thắng 108) + quy luật chung + cặp thế đối chiếu.
- Sửa lỗi cũ: `.prose ul/ol` mất dấu đầu dòng/số (Tailwind preflight) → bật lại list-style.
- ⚠️ `published_at` bài học bị ContentSeeder đặt lại mỗi lần nạp → "mới" dùng `created_at`. Deploy: `migrate --force`
  + `db:seed --class=PostSeeder --force`.

## Đợt 25 (08/10/2026) — Chuyên đề lớn nhẹ trên điện thoại + Luyện sát pháp 10 bậc + Luyện tàn cuộc khẩu quyết
- **Trang chuyên đề** `/chuong-trinh/{slug}`: chỉ lấy cột cần cho danh sách (không lấy `content`), 40 bài/trang (`?page=N`,
  canonical/prev/next theo quy ước layout), mục lục chương (tiêu đề "Chương · Bài", nhảy đúng trang + `#bai-N`), nút
  "Hiện thêm" (`resources/js/series.js`: fetch trang kế, nối bài, `replaceState`), JSON-LD `hasPart` chỉ trang đang xem,
  `content-visibility: auto` cho thẻ bài. Sát Cục Liên Hoàn: 1,1 MB → 77 KB.
- **Lộ trình** `/lo-trinh`: chương trình đóng không in nút bài — nạp khi mở (`/lo-trinh/chuong-trinh/{slug}`, partial
  `partials/path-series-body`); phần (unit) đóng để trong `<template>`, dựng khi bấm. 1,8 MB / ~4.000 nút → 95 KB / 69 nút.
- **Luyện sát pháp** `/luyen-tap/sat-phap` (+ `/sat-phap/{1..10}`): thế chiếu hết gắn nhãn `sat-N` (N = số nước bên giải,
  `cotuong:build-puzzles`), đúng `ladder.pass`=10 thế KHÁC NHAU ở bậc N mới mở bậc N+1 (đã đăng nhập: server chặn, khách:
  localStorage `xq.ladder`). Sao 10/25/50. `max_plies` nâng 16 → 20 để có bậc 9–10.
- **Luyện tàn cuộc** (chủ đề `tan-cuoc` + Tàn Chốt/Mã/Pháo/Xe, Khéo thắng, Giữ hòa): chuyên đề Cờ Tàn Có Khẩu Quyết không
  có `puzzle_side` và ván ít khi kết thúc bằng chiếu hết → `segment_series`: cắt ≤ 3 đoạn/bài, mỗi đoạn 2 nước bên giải
  (Đỏ; Đen nếu tiêu đề có "hòa"), ưu tiên mở đầu / đoạn kết / đoạn có lời giảng → 845 thế, nhãn `khau-quyet`. Máy chấp
  nhận nước tương đương (đã có sẵn trong board.js). Thẻ thế hiện "Khẩu quyết của thế này" (`Puzzle::verses()`).
- Nhãn `khau-quyet` bị loại khỏi 60 giây / 3 mạng / thế hôm nay / kiểm tra trình độ (`Puzzle::scopeMating`).
- Chủ đề có CẢ `series` lẫn `match` → phải khớp cả hai; `groups` sắp lưới chủ đề (tàn cuộc khẩu quyết lên đầu); thêm
  chủ đề đòn: ngọa tào, Pháo trùng, muộn sát, thiết môn thuyên, xuyên tâm, lưỡng chiếu, thí quân.
- Đếm thế theo chủ đề/bậc cache theo mốc `puzzles:stamp` (ghi bởi build-puzzles; KHÔNG dùng `max(updated_at)` vì mỗi lượt
  giải tăng bộ đếm làm đổi mốc). `/luyen-tap` 3,6 s → 0,5 s.
- Deploy: `cotuong:build-puzzles` (bắt buộc — sinh nhãn mới) + `optimize:clear` + cache lại; không có migration.

## Đợt 26 (08/10/2026) — Đổi thưởng bằng xu (/doi-thuong)
- **Xu = `xp_total − users.xu_spent`**: 1 XP kiếm được = 1 xu, đổi thưởng chỉ tăng `xu_spent` → XP, cấp độ, bảng xếp hạng,
  huy hiệu KHÔNG đổi. Người dùng cũ có ngay xu bằng tổng XP. Migration `2026_10_11_100001_create_shop_tables`
  (users.xu_spent / avatar_frame / shop_title + bảng `user_items`, mỗi lần đổi 1 dòng).
- Danh mục `config/shop.php` (+ `min_level`): thẻ giữ chuỗi 300 xu (tối đa `freeze_max`), 6 màu bàn cờ cao cấp
  (CSS `[data-board-theme=…]` trong board.css — màu miễn phí cũ giữ nguyên), 5 khung ảnh (`.avatar.frame-*` trong ui.css,
  vòng mask không phủ chữ cái, khung rồng xoay — tắt khi giảm hiệu ứng), 8 danh hiệu (`.user-title` cạnh tên).
- `App\Services\ShopService` (khoá dòng user khi đổi), `ShopController`, component `<x-avatar :frame>` thay ảnh đại diện ở
  header, xếp hạng, trang chủ, thử thách tuần, bạn bè, hồ sơ, tài khoản, bình luận. Leaderboard/podium cache đổi key
  (`lb2:`, `weekly-podium3:`) vì thêm cột frame/title.
- Màu bàn đã đổi: chọn ở Cài đặt giao diện (mục "Màu cao cấp", chưa có thì khoá + dẫn sang /doi-thuong) hoặc nút "Dùng màu
  này" — lưu localStorage như màu thường. Lối vào: menu tài khoản (kèm số xu), trang Hồ sơ, chân trang.
- Deploy: `php artisan migrate --force` + cache lại; không cần build-puzzles.

## Đợt 27 (08/10/2026) — Học nhanh không phải chờ: tự sang thế, thanh "Đã học · Bài tiếp theo"
- **Luyện tập** (`practice.js`, mọi chế độ từng thế): giải đúng → hiện kết quả + đếm 2 giây rồi tự sang thế tiếp (nút "Ở lại
  xem"), thế tiếp được tải sẵn trong lúc đếm; kết quả hiện ngay, server ghi nhận chạy song song (điểm thế cờ / % người giải
  điền sau). Sai → không tự chuyển. Điện thoại: khung kết quả nổi ngay trên thanh điều hướng (`[data-result].is-float`),
  thế mới tự cuộn bàn cờ lên. "Sai lầm của tôi": nút nổi + đúng thì tự sang sau 2 giây (chạm màn hình để ở lại).
- **Bài học**: thanh dính đáy `[data-lesson-nextbar]` (locked → ready → done). Điều kiện "đã học" bài có nước: xem hết nước +
  ở lại `ProgressController::minSeconds()` = min(20, 3 + 2×số nước) giây (bài 1 nước: 5 giây; trước đây 20 giây + nhịp báo
  10 giây ⇒ thực tế 20–30 giây), HOẶC tự giải đúng ở "Thử tự giải" (server kiểm PuzzleAttempt solved của thế thuộc bài,
  6 giờ gần nhất). Trình duyệt tính giây thật khi tab hiện, báo ngay khi xem hết nước; bấm nút → ghi nhận rồi sang bài tiếp.
  Bỏ bảng chúc mừng chặn màn hình — thay bằng thông báo nhẹ (handleGamification). Khách: thanh mở khi xem hết nước.
- Thử tự giải trong bài: sai rồi giải lại đúng vẫn gửi lượt đúng (để ghi nhận đã học) nhưng KHÔNG cộng XP thế cờ
  (`PuzzleService::submit`, `$lessonRetry`).
- (08/10, sau phản hồi) Thanh "Đã học" dính đáy từng che danh sách nước trên điện thoại → đổi thành `position: fixed`, ẩn
  mặc định; chỉ trượt lên (`.is-shown`) khi tới nước cuối / tự giải đúng / vừa ghi nhận đã học, tự ẩn sau 3 giây nếu không
  bấm (chạm vào thanh thì giữ, có nút ×). Mỗi lần chạy lại tới nước cuối thì hiện lại.
- (08/10) Luyện tập — đi nước khác đáp án có 2 trạng thái KHÔNG kết thúc thế (người học kẹt, không có nút): máy đang
  kiểm tra (bàn khoá "Đang kiểm tra…", điện thoại yếu/thế dài có thể vài giây) và "thắng nhưng chậm" (chỉ báo trên bàn).
  board.js phát `xq:puzzle-checking` / `xq:puzzle-checked` / `xq:puzzle-slow`; practice.js hiện khung nổi "Xem lời giải" +
  "Bỏ qua · thế tiếp" (kiểm tra quá 1,5 giây, hoặc ngay khi "chậm"). Bỏ qua = ghi lượt "xem lời giải" rồi sang thế ngay.
- (08/10, rà soát) 60 giây / 3 mạng: "thắng nhưng chậm" tính như đi sai rồi sang thế (3 mạng không đồng hồ từng kẹt mãi).
  Thế cờ hôm nay: khung kẹt chỉ có "Xem lời giải" (không "Bỏ qua" sang thế ngẫu nhiên). Bài cuối chương trình (không có
  bài tiếp): nút trên thanh "Đã học" chỉ ẩn thanh. Luyện từng thế: nút Gợi ý / Xem lời giải nhỏ trên thanh đầu bàn cờ
  (`.board-bar__btn`, chèn bằng practice.js — không có ở 60 giây / 3 mạng).

## Đợt 28 (08/10/2026) — Admin: Lịch sử đăng nhập + Ván đấu (thắng máy, tư liệu)
- **Lịch sử đăng nhập thiếu**: Google / Đăng ký dùng `Auth::login($user, true)` (ghi nhớ) còn phiên chỉ 120 phút → người
  dùng quay lại được tự đăng nhập bằng cookie, không qua form nào nên không có dòng lịch sử. Thêm listener
  `Illuminate\Auth\Events\Login` (AppServiceProvider): `remember` + không phải route form → ghi `LoginEvent` method `remember`
  ("Tự đăng nhập lại (ghi nhớ)") + cập nhật `last_login_at`. (`Admin\AuthController` không còn route — đăng nhập Admin đi qua
  `/dang-nhap` chung, vẫn ghi lịch sử như cũ.)
- **Admin › Lịch sử đăng nhập** `/admin/dang-nhap` (LoginHistoryController): mọi người dùng, lọc tên/email/IP, cách đăng
  nhập, thành công/thất bại, chỉ Admin/Biên tập, khoảng ngày; thống kê 7 ngày; cảnh báo IP sai mật khẩu ≥ 5 lần; thiết bị đọc
  gọn từ user agent.
- **Admin › Ván đấu** `/admin/van-dau` (GameArchiveController): bảng ván với máy theo biến thể × cấp (thắng/thua/hoà, tỉ lệ,
  30 ngày, số nước TB khi thắng), biểu đồ thắng máy 30 ngày, top người thắng cấp Vừa/Khó; danh sách lọc (mặc định: với máy,
  người chơi THẮNG), sắp ít/nhiều nước. **Xem lại** dùng lại `account.history-show` (biến `$admin`: breadcrumb + khối công cụ):
  tải ván `.txt` (thông tin, FEN, từng nước Việt + ICCS), **tạo bài học nháp** (LessonComposer, chọn chương trình, "bắt đầu từ
  nửa nước N" để cắt đoạn hay) → mở trình sửa bài.
