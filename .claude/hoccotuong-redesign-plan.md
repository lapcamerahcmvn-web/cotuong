# KẾ HOẠCH THIẾT KẾ LẠI TOÀN BỘ HỆ THỐNG HỌC CỜ TƯỚNG
## hoccotuong.top — Product / UX / UI / Gamification Roadmap

**Phiên bản:** 1.0  
**Ngày lập:** 27/09/2026  
**Mục tiêu:** biến hoccotuong.top từ một website học cờ thành một nền tảng EdTech + Game học cờ tướng chuyên nghiệp, hiện đại, dễ dùng và có khả năng giữ chân người học.

---

## 1. TÓM TẮT ĐỊNH HƯỚNG

### Vision

> **Học cờ tướng như chơi game: dễ bắt đầu, có lộ trình, có phản hồi tức thì và luôn biết bước tiếp theo là gì.**

Website mới cần kết hợp 4 lớp:

1. **Learning** — bài học có cấu trúc, tương tác trên bàn cờ.
2. **Practice** — puzzle/thế cờ, luyện theo điểm yếu, ôn lại lỗi sai.
3. **Gamification** — XP, level, streak, nhiệm vụ, huy hiệu, bảng xếp hạng.
4. **Community/Game** — đấu bạn bè, phòng riêng, giải đấu, thử thách.

Không nên biến mọi thứ thành game một cách hình thức. Game phải phục vụ việc học.

---

# 2. KẾT QUẢ RÀ SOÁT HIỆN TẠI

## 2.1. Những gì đã xác minh được

Qua thông tin/index hiện có của hoccotuong.top, sản phẩm đang có định hướng:

- Kho khoảng **750 bài học tương tác**.
- Nội dung được tổ chức theo các nhóm:
  - Nhập môn
  - Khai cuộc
  - Trung cuộc
  - Tàn cuộc
  - Cờ úp
- Có **bàn cờ tương tác**.
- Bài học có cơ chế đi từng nước và giải thích.

Đây là nền tảng nội dung rất đáng giữ lại.

## 2.2. Giới hạn của lần audit này

Tại thời điểm lập tài liệu, công cụ truy cập web không tải được HTML trực tiếp của `https://hoccotuong.top/`. Vì vậy:

- Không coi đây là audit source code.
- Không khẳng định những chức năng hiện tại không tồn tại nếu chưa kiểm chứng.
- Không đề xuất xóa dữ liệu/bài học hiện có.
- Trước khi code Phase 1, cần chạy một **Technical + UX Audit** trực tiếp trên production/staging và source code.

### Checklist cần audit trước khi triển khai

- [ ] Sitemap / toàn bộ URL
- [ ] Header / navigation
- [ ] Trang chủ
- [ ] Trang danh mục
- [ ] Trang bài học
- [ ] Login / Register
- [ ] Profile
- [ ] Search
- [ ] Mobile
- [ ] Dark mode nếu đang có
- [ ] Bàn cờ và engine
- [ ] Database bài học
- [ ] User progress
- [ ] API
- [ ] SEO
- [ ] Core Web Vitals
- [ ] Analytics
- [ ] Authentication / authorization
- [ ] Cache
- [ ] Queue / realtime nếu có
- [ ] Khả năng mở rộng cho PvP

**Nguyên tắc:** redesign UI không được làm mất dữ liệu, URL SEO hoặc tiến độ người học hiện tại.

---

# 3. THAM KHẢO CÁC SẢN PHẨM KHÁC

## 3.1. Chess.com

Chess.com tổ chức khu Learn theo **Learning Path** và Lesson Library. Người học có thể đi theo path hoặc mở thư viện để chọn bài theo chủ đề, trình độ, instructor. Bài học có practice challenges.

Các nhóm nội dung gồm openings, strategy, tactics, endgames, master games.

**Bài học áp dụng cho hoccotuong.top:**

- Learning Path
- Lesson Library
- Filter theo trình độ/chủ đề
- Practice challenge ngay trong bài
- Progress/Mastery

Nguồn:
- https://www.chess.com/learn
- https://support.chess.com/en/articles/8609703-how-do-lessons-work-on-chess-com
- https://www.chess.com/lessons

## 3.2. Lichess

Lichess có hệ sinh thái rất mạnh quanh việc luyện cờ:

- Tactical puzzles
- Learn from your mistakes
- Puzzle Streak
- Puzzle Storm
- Puzzle Racer
- Studies
- Analysis board
- Opening explorer
- Tournament
- Challenge/friend/community
- Custom board/pieces
- Light/Dark theme

**Bài học áp dụng:**

- Puzzle phải là sản phẩm chính, không phải tính năng phụ.
- Có luyện lại lỗi sai.
- Có chế độ luyện nhanh.
- Có phân tích.
- Có nội dung cộng đồng sau khi nền tảng học cốt lõi ổn định.

Nguồn:
- https://lichess.org/features

## 3.3. Kahoot

Kahoot chứng minh mô hình học + game có thể hỗ trợ:

- Live game
- Self-paced challenge
- Single-player practice
- Nhiều loại câu hỏi
- Timer
- Points
- Puzzle/order
- Reports
- Class/group
- Personalized practice

**Bài học áp dụng:**

- Thử thách có thời gian.
- Chế độ tự luyện.
- Phòng đấu nhóm.
- Báo cáo kết quả.
- Cho phép giáo viên giao bài trong giai đoạn sau.

Nguồn:
- https://kahoot.com/schools/how-it-works/
- https://kahoot.com/schools/ways-to-play/

## 3.4. Duolingo

Duolingo sử dụng:

- XP
- Streak
- Leaderboard
- Timed challenges
- Milestones/rewards

để khuyến khích người học quay lại thường xuyên.

**Bài học áp dụng:**

- Daily Goal
- Streak
- XP
- Daily Challenge
- Weekly leaderboard
- Achievement

Cần cho phép người dùng không tham gia cạnh tranh nếu họ muốn học yên tĩnh.

Nguồn:
- https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/

---

# 4. PRODUCT PRINCIPLES

## 4.1. 3 giây đầu tiên

Người mới vào phải hiểu ngay:

> Tôi đang ở đâu?
> Tôi nên học gì?
> Tôi có thể chơi/luyện gì?

## 4.2. Luôn có “Next Step”

Sau mỗi bài:

> **Bước tiếp theo →**

Sau khi đăng nhập:

> **Học tiếp →**

Sau khi sai:

> **Luyện lại →**

## 4.3. Không ép gamification

XP, streak, leaderboard là lớp hỗ trợ.

Không được để người học cảm thấy đang “cày điểm” thay vì học cờ.

## 4.4. Mobile-first

Bàn cờ phải là thành phần trung tâm và hoạt động tốt trên màn hình nhỏ.

---

# 5. KIẾN TRÚC THÔNG TIN MỚI

```text
HỌC CỜ TƯỚNG
│
├── Trang chủ
│
├── Học
│   ├── Lộ trình
│   ├── Nhập môn
│   ├── Khai cuộc
│   ├── Trung cuộc
│   ├── Tàn cuộc
│   └── Cờ úp
│
├── Luyện tập
│   ├── Thế cờ hôm nay
│   ├── Tìm nước hay
│   ├── Chế độ 60 giây
│   ├── 3 mạng
│   ├── Luyện lỗi sai
│   └── Ôn nhanh
│
├── Chơi
│   ├── Chơi với máy
│   ├── Đấu bạn
│   ├── Phòng riêng
│   └── Giải đấu
│
├── Xếp hạng
│
├── Thành tích
│
└── Hồ sơ
```

---

# 6. DESIGN SYSTEM

## 6.1. Phong cách

**Modern / Clean / Gaming / Education**

Không sử dụng giao diện quá giống website cờ truyền thống.

### Đặc điểm

- Card bo góc 16–20px
- Khoảng trắng rộng
- Typography rõ
- Icon đơn giản
- Animation 150–250ms
- Bàn cờ là hero visual
- Không lạm dụng gradient
- Không dùng quá nhiều màu

## 6.2. Màu đề xuất

### Light

```text
Background: #F7F8FA
Surface:    #FFFFFF
Text:       #111827
Muted:      #6B7280
Primary:    #0F766E
Accent:     #D97706
Success:    #16A34A
Danger:     #DC2626
Border:     #E5E7EB
```

### Dark

```text
Background: #0B1220
Surface:    #111827
Surface 2:  #1F2937
Text:       #F9FAFB
Muted:      #9CA3AF
Primary:    #2DD4BF
Accent:     #F59E0B
```

Màu cụ thể có thể tinh chỉnh sau khi làm prototype.

## 6.3. Typography

Ưu tiên font sans-serif hiện đại hỗ trợ tiếng Việt tốt.

Ví dụ:

- Inter
- Be Vietnam Pro
- system-ui

Không dùng quá nhiều font.

---

# 7. TRANG CHỦ MỚI

## Hero

```text
Mỗi ngày tiến bộ một nước cờ.

Học cờ tướng qua bài học tương tác,
luyện thế cờ và thử thách mỗi ngày.

[ Học tiếp ]    [ Thử thách hôm nay ]

                 [ BÀN CỜ ]
```

## Dashboard người dùng

```text
🔥 7 ngày liên tiếp
🎯 15 phút hôm nay
⭐ 1.240 XP
🏆 Lv.12
```

## Continue Learning

Hiển thị bài đang học:

```text
Khai cuộc #12

████████████░░ 80%

[ Tiếp tục ]
```

## Daily Challenge

```text
THỬ THÁCH HÔM NAY

Tìm nước đi mạnh nhất.

00:27

[ Bắt đầu ]
```

## Learning Path

Hiển thị trực quan:

```text
Nhập môn
   ↓
Khai cuộc
   ↓
Trung cuộc
   ↓
Tàn cuộc
   ↓
Cờ úp
```

## Các khu tiếp theo

1. Continue Learning
2. Daily Challenge
3. Learning Path
4. Luyện điểm yếu
5. Thành tích
6. Leaderboard
7. Bài học đề xuất

---

# 8. LEARNING PATH

Đây là một trong những thay đổi quan trọng nhất.

Mỗi course có:

- Tổng số bài
- % hoàn thành
- XP
- Mastery
- Điều kiện mở khóa

Ví dụ:

```text
KHAI CUỘC

Bài 01 ✓
Bài 02 ✓
Bài 03 ✓
Bài 04 ▶
Bài 05 🔒
Bài 06 🔒
```

### Trạng thái

- Locked
- Available
- In Progress
- Completed
- Mastered

Không nên khóa toàn bộ nội dung quá cứng. Người dùng vẫn phải có Lesson Library để tìm bài cụ thể.

---

# 9. TRANG BÀI HỌC

Layout desktop:

```text
┌────────────────────────────────────────────┐
│ ← Khai cuộc       Bài 12/48      75%      │
├───────────────────────┬────────────────────┤
│                       │                    │
│       BÀN CỜ          │  Giải thích        │
│                       │                    │
│                       │  💡 Gợi ý          │
│                       │                    │
│                       │ [Lùi] [Tiếp]      │
└───────────────────────┴────────────────────┘
```

Mobile:

```text
Progress
Bàn cờ
Giải thích
Nút thao tác
```

### Kết thúc bài

```text
🎉 Hoàn thành!

+50 XP

✓ 6 nước chính
✓ 2 biến
✓ 1 thế chiến thuật

[ Luyện ngay ]
[ Bài tiếp theo ]
```

---

# 10. PUZZLE / LUYỆN TẬP

## Chế độ 1 — Daily Puzzle

1 thế cờ mỗi ngày.

## Chế độ 2 — 60 giây

Giải càng nhiều càng tốt.

## Chế độ 3 — 3 mạng

Sai 3 lần kết thúc.

## Chế độ 4 — Luyện lỗi sai

Tự động gom những thế người dùng đã sai.

## Chế độ 5 — Theo kỹ năng

Ví dụ:

- Pháo
- Mã
- Xe
- Sát chiêu
- Phòng thủ
- Tàn cuộc
- Khai cuộc

---

# 11. HỆ THỐNG “HỌC TỪ LỖI SAI”

Mỗi lần sai lưu:

```text
user_id
puzzle_id
attempt
mistake_type
correct_move
user_move
timestamp
```

Sau đó:

```text
Bạn thường sai ở:

Pháo đầu      62%
Mã chiến      54%
Tàn cuộc      41%
```

Tạo danh sách:

> **Luyện lại 10 thế bạn thường sai**

Đây là một tính năng có giá trị học tập thực tế cao hơn việc chỉ cộng XP.

---

# 12. XP / LEVEL / STREAK

## XP đề xuất

| Hoạt động | XP |
|---|---:|
| Học bài | +20 |
| Hoàn thành bài | +50 |
| Puzzle đúng | +30 |
| Daily Challenge | +100 |
| Chuỗi 7 ngày | +200 |
| Hoàn thành course | +500 |

Các con số chỉ là prototype; cần A/B test sau khi có dữ liệu.

## Level

```text
Lv.1  Người mới
Lv.5  Tập sự
Lv.10 Kỳ thủ
Lv.20 Cao thủ
Lv.30 Đại kỳ thủ
```

Tên level không được hiểu là rating cờ chính thức.

## Streak

```text
🔥 12

12 ngày học liên tiếp
```

Có thể có:

- 7 ngày
- 30 ngày
- 100 ngày

---

# 13. ACHIEVEMENTS

Ví dụ:

```text
🏆 Bài đầu tiên
🔥 7 ngày liên tiếp
🔥 30 ngày liên tiếp
🧩 100 puzzle
🧩 500 puzzle
📚 Hoàn thành Nhập môn
♟ Hoàn thành Khai cuộc
⚔️ 50 trận đấu
```

Badge chỉ là phần thưởng; không biến thành tiêu chí đánh giá năng lực.

---

# 14. HỒ SƠ NGƯỜI DÙNG

```text
Avatar
Tên
Level

XP
Streak
Bài đã học
Puzzle
Tỉ lệ đúng

Kỹ năng
──────────────
Khai cuộc     82%
Trung cuộc    65%
Tàn cuộc      52%
Sát pháp      71%
```

Thêm lịch hoạt động:

```text
T2 ✓
T3 ✓
T4 ✓
T5 ✓
T6 ✓
T7 ✓
CN ✓
```

---

# 15. SKILL MASTERY

Không chỉ hiển thị tổng XP.

Mỗi kỹ năng có mastery:

```text
Khai cuộc       82%
Chiến thuật     76%
Tấn công        68%
Phòng thủ       59%
Tàn cuộc        52%
```

Mastery nên tính từ nhiều dữ liệu:

- Bài đã hoàn thành
- Puzzle accuracy
- Độ khó
- Lần làm lại
- Kết quả gần đây

Không dùng một bài test duy nhất để kết luận trình độ.

---

# 16. AI COACH

Đây là Phase 4, không làm ngay.

Trong bàn cờ:

```text
🤖 Trợ lý

[ Gợi ý ]
[ Tại sao? ]
[ Phân tích ]
[ Xem biến ]
```

Ví dụ:

> Gợi ý: Quân Mã của bạn đang bị đe dọa. Hãy tìm cách bảo vệ nó trước khi tấn công.

AI nên ưu tiên **gợi ý theo từng tầng**:

1. Hint nhẹ
2. Chỉ quân cần chú ý
3. Gợi ý ý tưởng
4. Gợi ý nước
5. Giải thích đầy đủ

Không đưa đáp án ngay.

---

# 17. CHƠI VÀ PVP

Chỉ triển khai sau khi Learning + Puzzle ổn định.

## Chơi với máy

- Easy
- Normal
- Hard
- Custom

## Đấu bạn

Tạo phòng:

```text
Tạo phòng

Mã: 482913

[ Chia sẻ ]
```

## Challenge

```text
Minh thách bạn!

⚔️ Đấu 10 phút

[ Chấp nhận ]
```

## Tournament

- Daily
- Weekend
- Seasonal

---

# 18. LEADERBOARD

Không chỉ một bảng tổng.

Tabs:

```text
Bạn bè | Tuần | Tháng | Toàn thời gian
```

Nên có:

- XP leaderboard
- Puzzle leaderboard
- Streak leaderboard
- PvP rating leaderboard

Người dùng có thể ẩn khỏi bảng xếp hạng XP nếu muốn.

---

# 19. FLASHCARDS / ÔN NHANH

Tạo thẻ:

```text
Mặt trước:

Khi nào nên đổi quân?

[ Hiện đáp án ]
```

Sau đó:

```text
👍 Nhớ
🔄 Chưa nhớ
```

Về sau có thể bổ sung spaced repetition.

---

# 20. SEARCH + FILTER

Search cần tìm được:

- Bài học
- Khai cuộc
- Thế cờ
- Chủ đề
- Level

Filter:

```text
Trình độ
Chủ đề
Thời lượng
Đã hoàn thành
Chưa học
```

---

# 21. GIÁO VIÊN / LỚP HỌC — PHASE SAU

Nếu sản phẩm mở rộng B2B/B2School:

### Teacher Dashboard

```text
Lớp 6A1

32 học sinh

78% hoàn thành

Điểm yếu chung:
- Khai cuộc
- Sát chiêu
- Tàn cuộc
```

Giáo viên có thể:

- Tạo lớp
- Giao bài
- Giao puzzle
- Tạo quiz
- Xem tiến độ
- Xem lỗi phổ biến
- Tạo giải đấu lớp

---

# 22. MOBILE UX

Bottom navigation:

```text
🏠      📚      🧩      🏆      👤
Home    Học     Luyện   BXH     Tôi
```

Bàn cờ phải chiếm phần lớn viewport.

Các nút chính:

- Undo
- Hint
- Next
- Submit

Không để text dài chiếm màn hình.

---

# 23. DARK MODE

Dark mode cần thiết kế riêng chứ không chỉ đảo màu.

Ưu tiên:

- nền tối
- card hơi sáng
- bàn cờ rõ
- contrast tốt
- giảm animation nếu thiết bị yếu

---

# 24. ACCESSIBILITY

Checklist:

- Contrast đạt mức tốt.
- Keyboard navigation.
- Focus state rõ.
- Button có aria-label.
- Không chỉ dùng màu để biểu thị đúng/sai.
- Font tối thiểu dễ đọc trên mobile.
- Touch target đủ lớn.
- Animation có tùy chọn giảm.

---

# 25. PERFORMANCE

Đặc biệt quan trọng vì bàn cờ tương tác.

## Mục tiêu

- Fast initial render
- Lazy-load module nặng
- Không load toàn bộ puzzle cùng lúc
- Cache lesson data
- Optimize images
- Code splitting
- Web worker nếu engine nặng
- CDN/static asset caching

## Theo dõi

- LCP
- INP
- CLS
- JS bundle
- API latency
- Chess engine latency

---

# 26. SEO

Không để redesign làm mất traffic.

## Giữ

- URL cũ
- title
- meta
- canonical
- sitemap
- robots
- internal links

Nếu đổi URL:

```text
301 redirect
```

## SEO landing pages

Có thể tạo:

```text
/hoc-co-tuong
/hoc-co-tuong-co-ban
/khai-cuoc-co-tuong
/trung-cuoc-co-tuong
/tan-cuoc-co-tuong
/the-co-tuong
/bai-tap-co-tuong
```

Nhưng tránh tạo hàng nghìn trang mỏng chỉ để SEO.

---

# 27. ANALYTICS

Cần đo từ ngày đầu.

## Event

```text
signup
login
lesson_start
lesson_complete
lesson_continue
puzzle_start
puzzle_correct
puzzle_wrong
daily_challenge_start
daily_challenge_complete
streak_continue
achievement_unlock
pvp_start
pvp_finish
search
```

## KPI

### Activation

% user mới hoàn thành bài đầu tiên.

### Learning

- Lessons/week
- Puzzle/week
- Completion rate
- Accuracy
- Return-to-learning

### Retention

- D1
- D7
- D30

### Engagement

- Session/week
- Learning minutes
- Daily challenge completion

---

# 28. DATABASE / BACKEND — KHUNG ĐỀ XUẤT

Không bắt buộc phải đổi toàn bộ schema hiện tại.

Các entity có thể cần:

```text
users
profiles
courses
course_sections
lessons
lesson_steps
lesson_progress

puzzles
puzzle_attempts

skills
user_skills

daily_challenges
daily_challenge_attempts

xp_transactions
user_levels
streaks

achievements
user_achievements

games
game_players
game_moves

friendships
challenges
notifications

leaderboard_snapshots
```

Nếu hệ thống hiện tại đã có bảng tương đương, ưu tiên migrate/incremental thay vì viết lại.

---

# 29. API / SERVICE LAYER

Có thể tách logic:

```text
LearningService
ProgressService
PuzzleService
XPService
StreakService
AchievementService
LeaderboardService
GameService
NotificationService
AI Coach Service
```

Mục tiêu là tránh nhồi toàn bộ logic vào Controller.

---

# 30. ROADMAP TRIỂN KHAI

## PHASE 0 — Audit

**Thời gian:** 1–3 ngày

- [ ] Audit production
- [ ] Audit source
- [ ] Sitemap
- [ ] Database
- [ ] Analytics
- [ ] Performance
- [ ] Mobile
- [ ] SEO
- [ ] Xác định URL/data cần bảo toàn

**Output:**

`AUDIT-REPORT.md`

---

## PHASE 1 — Design System + UI

**Thời gian:** 1–2 tuần

- [ ] Design tokens
- [ ] Header
- [ ] Footer
- [ ] Buttons
- [ ] Cards
- [ ] Modal
- [ ] Toast
- [ ] Progress
- [ ] Avatar
- [ ] Badge
- [ ] Board container
- [ ] Light/Dark
- [ ] Responsive

Pages:

- [ ] Home
- [ ] Course
- [ ] Learning Path
- [ ] Lesson
- [ ] Profile
- [ ] Search

---

## PHASE 2 — Learning Experience

**Thời gian:** 1–2 tuần

- [ ] Continue Learning
- [ ] Progress
- [ ] Learning Path
- [ ] Lesson completion
- [ ] Mastery
- [ ] Recommendation
- [ ] Lesson Library
- [ ] Search/filter

---

## PHASE 3 — Gamification

**Thời gian:** 1–2 tuần

- [ ] XP
- [ ] Level
- [ ] Streak
- [ ] Daily Goal
- [ ] Daily Challenge
- [ ] Achievements
- [ ] Leaderboard

---

## PHASE 4 — Puzzle

**Thời gian:** 1–3 tuần

- [ ] Daily Puzzle
- [ ] 60 seconds
- [ ] 3 lives
- [ ] Skill categories
- [ ] Mistake review
- [ ] Puzzle rating
- [ ] Statistics

---

## PHASE 5 — Game/PvP

**Thời gian:** 2–4 tuần

- [ ] Play vs bot
- [ ] Friend challenge
- [ ] Private room
- [ ] Realtime game
- [ ] Game history
- [ ] Rating
- [ ] Tournament

---

## PHASE 6 — AI Coach

**Thời gian:** 2–4 tuần

- [ ] Hint engine
- [ ] Explain move
- [ ] Position analysis
- [ ] Personalized exercises
- [ ] AI chat around board

---

## PHASE 7 — Teacher/Classroom

**Thời gian:** 2–4 tuần

- [ ] Teacher
- [ ] Class
- [ ] Assign lesson
- [ ] Assign puzzle
- [ ] Reports
- [ ] Student progress
- [ ] Classroom tournament

---

# 31. ƯU TIÊN BACKLOG

| Feature | Giá trị | Độ khó | Ưu tiên |
|---|---|---|---|
| Redesign Home | Cao | Trung | P0 |
| Learning Path | Rất cao | Trung | P0 |
| Lesson UI | Rất cao | Trung | P0 |
| Mobile | Rất cao | Trung | P0 |
| Progress | Rất cao | Trung | P0 |
| Daily Challenge | Cao | Trung | P1 |
| XP | Cao | Thấp | P1 |
| Streak | Cao | Thấp | P1 |
| Achievement | Trung | Thấp | P1 |
| Puzzle | Rất cao | Cao | P1 |
| Mistake Review | Rất cao | Cao | P1 |
| Leaderboard | Trung | Trung | P1 |
| PvP | Cao | Rất cao | P2 |
| Tournament | Trung | Cao | P2 |
| AI Coach | Cao | Rất cao | P2 |
| Teacher Dashboard | Cao | Cao | P3 |
| Community | Trung | Rất cao | P3 |

---

# 32. NHỮNG THỨ KHÔNG NÊN LÀM NGAY

Không nên triển khai ngay:

- NFT / blockchain
- Marketplace phức tạp
- Chat toàn hệ thống
- Feed mạng xã hội lớn
- Quá nhiều animation
- 3D board nặng
- Hàng chục loại currency
- Hệ thống level quá phức tạp
- AI thay toàn bộ nội dung giáo trình

Tập trung vào:

> **Learn → Practice → Feedback → Progress → Return**

---

# 33. HOMEPAGE WIREFRAME ĐỀ XUẤT

```text
┌──────────────────────────────────────────────────────┐
│ LOGO    Học   Luyện   Chơi   BXH       🔥 XP   👤 │
├──────────────────────────────────────────────────────┤
│                                                      │
│  MỖI NGÀY TIẾN BỘ MỘT NƯỚC CỜ.        ┌──────────┐ │
│  Học + luyện + thử thách mỗi ngày.      │          │ │
│                                          │  BÀN CỜ  │ │
│  [ Học tiếp ] [ Thử thách hôm nay ]     │          │ │
│                                          └──────────┘ │
├──────────────────────────────────────────────────────┤
│ 🔥 Chuỗi 7 ngày    🎯 15 phút    ⭐ 1.240 XP        │
├──────────────────────────────────────────────────────┤
│                                                      │
│ TIẾP TỤC HỌC                                         │
│ ┌──────────────────────────────────────────────────┐ │
│ │ Khai cuộc #12                                     │ │
│ │ █████████████░░ 80%                              │ │
│ │ [ Tiếp tục ]                                      │ │
│ └──────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────┤
│                                                      │
│ 🧩 THỬ THÁCH HÔM NAY                                │
│                                                      │
│ [ Bàn cờ ]     Tìm nước đi mạnh nhất                 │
│                00:27                                │
│                [ Bắt đầu ]                          │
├──────────────────────────────────────────────────────┤
│                                                      │
│ 🗺️ LỘ TRÌNH HỌC                                      │
│                                                      │
│ Nhập môn → Khai cuộc → Trung cuộc → Tàn cuộc → Cờ úp│
├──────────────────────────────────────────────────────┤
│                                                      │
│ 🧠 LUYỆN ĐIỂM YẾU                                    │
│                                                      │
│ Pháo 62%   Mã 54%   Tàn cuộc 41%                    │
├──────────────────────────────────────────────────────┤
│                                                      │
│ 🏆 THÀNH TÍCH       🥇 BẢNG XẾP HẠNG                │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

# 34. MOBILE WIREFRAME

```text
┌──────────────────────┐
│ ☰   HỌC CỜ TƯỚNG 👤 │
├──────────────────────┤
│                      │
│ 🔥 7 ngày            │
│ █████████░ 80%       │
│                      │
│ [ HỌC TIẾP ]         │
│                      │
├──────────────────────┤
│ 🧩 THỬ THÁCH HÔM NAY │
│                      │
│       BÀN CỜ         │
│                      │
│ [ Bắt đầu ]          │
├──────────────────────┤
│ 🗺️ LỘ TRÌNH          │
│                      │
│ Nhập môn              │
│    ↓                 │
│ Khai cuộc             │
│    ↓                 │
│ Trung cuộc            │
├──────────────────────┤
│ 🏆 Thành tích         │
├──────────────────────┤
│                      │
│ 🏠  📚  🧩  🏆  👤 │
└──────────────────────┘
```

---

# 35. ĐỊNH NGHĨA “DONE”

Redesign chỉ được xem là hoàn thành khi:

### UI

- [ ] Desktop đẹp
- [ ] Tablet tốt
- [ ] Mobile tốt
- [ ] Dark mode
- [ ] Loading state
- [ ] Empty state
- [ ] Error state
- [ ] Success state

### Learning

- [ ] Người dùng biết bài tiếp theo
- [ ] Progress chính xác
- [ ] Có thể quay lại bài cũ
- [ ] Có practice
- [ ] Có feedback

### Performance

- [ ] Core Web Vitals đạt mục tiêu
- [ ] Không lỗi console nghiêm trọng
- [ ] Bàn cờ không lag

### Data

- [ ] Không mất progress cũ
- [ ] Không mất user
- [ ] Không mất bài học
- [ ] Không phá URL SEO

### Analytics

- [ ] Theo dõi lesson
- [ ] Theo dõi puzzle
- [ ] Theo dõi retention
- [ ] Theo dõi gamification

---

# 36. KẾT LUẬN

Hoccotuong.top đã có một tài sản quan trọng: **nội dung học cờ và trải nghiệm bàn cờ tương tác**.

Không nên phá bỏ để xây một website hoàn toàn khác.

Chiến lược phù hợp hơn là:

```text
NỘI DUNG HIỆN CÓ
       +
UX/UI HIỆN ĐẠI
       +
LEARNING PATH
       +
PUZZLE
       +
GAMIFICATION
       +
PROGRESS
       +
PVP
       +
AI COACH
       =
NỀN TẢNG HỌC CỜ TƯỚNG
```

## Thứ tự ưu tiên cuối cùng

**P0**
> Audit → Design System → Home → Learning Path → Lesson → Mobile

**P1**
> Progress → XP → Streak → Daily Challenge → Puzzle → Mistake Review → Achievement

**P2**
> PvP → Friend Challenge → Tournament → AI Coach

**P3**
> Teacher → Classroom → Community

### Nguyên tắc cốt lõi

> **Đừng cố làm hoccotuong.top giống Chess.com.**
>
> Hãy học những cơ chế tốt từ Chess.com, Lichess, Kahoot và Duolingo, rồi tạo một trải nghiệm **riêng cho người học cờ tướng Việt Nam**.

---

# 37. NGUỒN THAM KHẢO

- Chess.com Learn: https://www.chess.com/learn
- Chess.com Lessons: https://www.chess.com/lessons
- Chess.com Lesson workflow: https://support.chess.com/en/articles/8609703-how-do-lessons-work-on-chess-com
- Lichess Features: https://lichess.org/features
- Kahoot for Schools: https://kahoot.com/schools/how-it-works/
- Kahoot Ways to Play: https://kahoot.com/schools/ways-to-play/
- Duolingo Gamification: https://blog.duolingo.com/duolingo-101-how-to-learn-a-language-on-duolingo/

**Lưu ý nguồn:** Các tính năng của bên thứ ba trong tài liệu được dùng làm tham khảo sản phẩm/UX, không phải yêu cầu sao chép giao diện hoặc thương hiệu.

---

## PHỤ LỤC A — USER JOURNEY MỤC TIÊU

```text
Landing
  ↓
Chọn trình độ / bắt đầu
  ↓
Bài học đầu tiên
  ↓
Puzzle ngắn
  ↓
+XP
  ↓
Hiển thị progress
  ↓
Daily Goal
  ↓
Streak
  ↓
Ngày hôm sau
  ↓
Daily Challenge
  ↓
Luyện lỗi sai
  ↓
Mastery
  ↓
PvP / Tournament
```

## PHỤ LỤC B — VÒNG LẶP HỌC TẬP

```text
LEARN
  ↓
TRY
  ↓
FAIL / PASS
  ↓
FEEDBACK
  ↓
RETRY
  ↓
MASTERY
  ↓
REWARD
  ↓
NEXT CHALLENGE
```

Đây là vòng lặp cần được ưu tiên hơn các tính năng “trang trí”.

---

**END OF PRODUCT REDESIGN PLAN**
