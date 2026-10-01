<?php

namespace Tests\Feature;

use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\Puzzle;
use App\Models\User;
use App\Models\XpTransaction;
use App\Services\Gamification\GamificationService;
use App\Services\Gamification\LeaderboardService;
use App\Services\Gamification\LevelService;
use App\Services\PuzzleService;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GamificationTest extends TestCase
{
    use RefreshDatabase;

    // Thế chiếu hết 1 nước: Xe a8→a9; Xe i8→i9 cũng chiếu hết (nước thay thế hợp lệ).
    private const MATE_FEN = '3k5/R7R/9/9/9/9/9/9/9/4K4';

    protected function tearDown(): void
    {
        Carbon::setTestNow();
        parent::tearDown();
    }

    private function user(array $attrs = []): User
    {
        return User::create(array_merge(['name' => 'Học viên', 'email' => uniqid().'@t.local', 'password' => 'secret12', 'role' => 'hoc_vien'], $attrs))->fresh();
    }

    private function lesson(array $attrs = []): Lesson
    {
        return Lesson::create(array_merge([
            'game_mode' => 'co-tuong', 'phase' => 'trung-cuoc', 'title' => 'Bài '.uniqid(), 'level' => 'co-ban',
            'initial_fen' => self::MATE_FEN, 'move_count' => 1, 'status' => 'published', 'published_at' => now()->subDay(),
        ], $attrs));
    }

    private function puzzle(): Puzzle
    {
        return Puzzle::create([
            'title' => 'Thế thử', 'fen' => self::MATE_FEN, 'side' => 'do', 'solution' => ['a8a9'],
            'solver_moves' => 1, 'rating' => 1000, 'skill_tags' => ['xe', 'nhanh'], 'phase' => 'trung-cuoc',
        ]);
    }

    public function test_level_curve(): void
    {
        $this->assertSame(1, LevelService::levelFor(0));
        $this->assertSame(2, LevelService::levelFor(50));
        $this->assertSame(5, LevelService::levelFor(440));
        $this->assertSame(10, LevelService::levelFor(1890));
        $this->assertSame('Kỳ thủ', LevelService::title(10));
    }

    public function test_xp_is_idempotent_per_key(): void
    {
        $u = $this->user();
        $g = app(GamificationService::class);
        $first = $g->record($u, 'puzzle_solve', ['key' => 'puzzle:1:first', 'amount' => 20]);
        $again = $g->record($u, 'puzzle_solve', ['key' => 'puzzle:1:first', 'amount' => 20]);

        $this->assertSame(20, $first['xp']);
        $this->assertSame(0, $again['xp']);
        $this->assertSame(20, $u->fresh()->xp_total);
        $this->assertSame(1, XpTransaction::where('user_id', $u->id)->where('reason', 'puzzle_solve')->count());
    }

    public function test_daily_goal_bonus_and_streak_across_vietnam_midnight(): void
    {
        $u = $this->user(['daily_goal_xp' => 20]);
        $g = app(GamificationService::class);

        Carbon::setTestNow('2026-10-01 16:30:00'); // 23:30 giờ VN ngày 01/10
        $r = $g->record($u, 'puzzle_solve', ['key' => 'a', 'amount' => 25]);
        $this->assertTrue($r['goalReached']);
        $this->assertSame(45, $u->fresh()->xp_total);            // 25 + 20 thưởng mục tiêu
        $this->assertSame(1, $u->fresh()->streak_current);

        Carbon::setTestNow('2026-10-01 17:30:00'); // 00:30 giờ VN ngày 02/10 → ngày mới
        $g->record($u, 'puzzle_solve', ['key' => 'b', 'amount' => 5]);
        $this->assertSame(2, $u->fresh()->streak_current);

        Carbon::setTestNow('2026-10-04 03:00:00'); // bỏ lỡ ngày 03/10, không có thẻ giữ chuỗi
        $this->assertSame(0, $u->fresh()->liveStreak());
        $g->record($u, 'puzzle_solve', ['key' => 'c', 'amount' => 5]);
        $this->assertSame(1, $u->fresh()->streak_current);
        $this->assertSame(2, $u->fresh()->streak_best);
    }

    public function test_streak_freeze_covers_one_missed_day(): void
    {
        $u = $this->user();
        $u->forceFill(['streak_current' => 5, 'streak_best' => 5, 'streak_last_date' => '2026-10-01', 'streak_freezes' => 1])->save();
        Carbon::setTestNow('2026-10-03 03:00:00'); // 10h VN 03/10 — lỡ ngày 02/10

        app(GamificationService::class)->record($u, 'puzzle_solve', ['key' => 'x', 'amount' => 5]);
        $u->refresh();
        $this->assertSame(6, $u->streak_current);
        $this->assertSame(0, $u->streak_freezes);
    }

    public function test_puzzle_verify_accepts_solution_and_alternative_mate(): void
    {
        $p = $this->puzzle();
        $svc = app(PuzzleService::class);

        $this->assertTrue($svc->verify($p, ['a8a9'])['ok']);
        $this->assertTrue($svc->verify($p, ['i8i9'])['ok']);          // chiếu hết thay thế
        $wrong = $svc->verify($p, ['e0f0']);
        $this->assertFalse($wrong['ok']);
        $this->assertSame('a8a9', $wrong['expected']);
        $this->assertFalse($svc->verify($p, [])['ok']);
    }

    public function test_puzzle_attempt_awards_xp_once_and_queues_mistakes(): void
    {
        $u = $this->user();
        $p = $this->puzzle();

        $this->actingAs($u)->postJson(route('practice.attempt', $p), ['moves' => ['e0f0'], 'ms' => 5000, 'mode' => 'topic'])
            ->assertOk()->assertJson(['ok' => false]);
        $this->assertDatabaseHas('user_puzzle_reviews', ['user_id' => $u->id, 'puzzle_id' => $p->id, 'box' => 0]);

        $ok = $this->actingAs($u)->postJson(route('practice.attempt', $p), ['moves' => ['a8a9'], 'ms' => 5000, 'mode' => 'topic'])
            ->assertOk()->assertJson(['ok' => true])->json();
        $this->assertGreaterThan(0, $ok['gamification']['xp']);

        $fast = $this->actingAs($u)->postJson(route('practice.attempt', $p), ['moves' => ['a8a9'], 'ms' => 100, 'mode' => 'topic'])->json();
        $this->assertNull($fast['gamification']);                     // giải quá nhanh → không XP
    }

    public function test_guest_attempt_is_verified_but_not_stored(): void
    {
        $p = $this->puzzle();
        $this->postJson(route('practice.attempt', $p), ['moves' => ['a8a9'], 'ms' => 3000, 'mode' => 'daily'])
            ->assertOk()->assertJson(['ok' => true, 'gamification' => null]);
        $this->assertDatabaseCount('puzzle_attempts', 0);
    }

    public function test_progress_rejects_inflated_read_seconds_and_awards_lesson_xp_once(): void
    {
        $u = $this->user();
        $l = $this->lesson(['move_count' => 5]);
        Carbon::setTestNow('2026-10-01 03:00:00');

        $r = $this->actingAs($u)->postJson(route('progress.store', $l), ['read_seconds' => 99999, 'viewed_all_moves' => true])->json();
        $this->assertFalse($r['completed']);                           // lần đầu: thời gian thực chỉ ~15s

        Carbon::setTestNow('2026-10-01 03:00:30');
        $r = $this->actingAs($u)->postJson(route('progress.store', $l), ['read_seconds' => 30, 'viewed_all_moves' => true])->json();
        $this->assertTrue($r['completed']);
        // 30 XP bài + 20 đạt mục tiêu ngày + 500 hoàn thành giai đoạn (bài duy nhất của giai đoạn).
        $this->assertSame(550, $r['gamification']['xp']);
        $this->assertDatabaseHas('xp_transactions', ['user_id' => $u->id, 'reason' => 'lesson_complete', 'amount' => 30]);

        $r = $this->actingAs($u)->postJson(route('progress.store', $l), ['read_seconds' => 40, 'viewed_all_moves' => true])->json();
        $this->assertNull($r['gamification']);
        $this->assertSame(550, $u->fresh()->xp_total);
        $this->assertDatabaseHas('user_achievements', ['user_id' => $u->id, 'key' => 'first-lesson']);
    }

    public function test_leaderboard_excludes_opted_out_users(): void
    {
        $a = $this->user(['name' => 'Hiện']);
        $b = $this->user(['name' => 'Ẩn']);
        $b->forceFill(['leaderboard_opt_out' => true])->save();
        $g = app(GamificationService::class);
        $g->record($a, 'puzzle_solve', ['key' => 'k', 'amount' => 10]);
        $g->record($b, 'puzzle_solve', ['key' => 'k', 'amount' => 50]);

        $names = collect(app(LeaderboardService::class)->top('xp', 'week'))->pluck('name');
        $this->assertTrue($names->contains('Hiện'));
        $this->assertFalse($names->contains('Ẩn'));
        $this->assertNull(app(LeaderboardService::class)->rankOf($b->fresh(), 'xp', 'week'));
    }

    public function test_rush_session_flow(): void
    {
        $this->puzzle();
        $u = $this->user();
        $start = $this->actingAs($u)->postJson(route('practice.session.start'), ['mode' => 'rush'])->assertOk()->json();
        $pid = $start['puzzle']['id'];

        $next = $this->actingAs($u)->postJson(route('practice.session.answer', $start['uuid']), ['puzzle_id' => $pid, 'moves' => ['a8a9'], 'ms' => 3000])->json();
        $this->assertSame(1, $next['score']);
        $this->assertTrue($next['over']);                              // kho chỉ có 1 thế → hết phiên
        $this->assertSame(1, $u->fresh()->rush_best);
    }

    public function test_public_pages_render(): void
    {
        $l = $this->lesson(['slug' => 'bai-thu']);
        LessonProgress::query()->delete();
        $this->puzzle();
        foreach (['/', '/lo-trinh', '/luyen-tap', '/luyen-tap/hom-nay', '/luyen-tap/60-giay', '/luyen-tap/3-mang',
            '/xep-hang', '/trung-cuoc', '/bai-hoc/bai-thu', '/tim-kiem?q=bai', '/dang-nhap'] as $url) {
            $this->get($url)->assertOk();
        }
        $this->get('/luyen-tap/loi-sai')->assertRedirect();

        $u = $this->user();
        foreach (['/', '/tai-khoan', '/tai-khoan/cai-dat', '/luyen-tap/loi-sai', '/lo-trinh'] as $url) {
            $this->actingAs($u)->get($url)->assertOk();
        }
    }
}
