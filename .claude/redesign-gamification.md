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
(và vì thế có thể chiếu Tướng); chiếu bí = thắng; **hết nước mà không bị chiếu = HOÀ** (cờ tướng: thua);
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
