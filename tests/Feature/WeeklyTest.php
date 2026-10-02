<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\GameRecord;
use App\Models\PracticeSession;
use App\Models\User;
use App\Models\UserDailyActivity;
use App\Models\WeeklyAward;
use App\Services\Gamification\WeeklyService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Tests\TestCase;

class WeeklyTest extends TestCase
{
    use RefreshDatabase;

    private function user(string $name = 'A', bool $optOut = false): User
    {
        $u = User::create(['name' => $name, 'email' => uniqid().'@t.local', 'password' => 'secret12', 'role' => 'hoc_vien']);
        $u->forceFill(['leaderboard_opt_out' => $optOut])->save();

        return $u->fresh();
    }

    protected function setUp(): void
    {
        parent::setUp();
        Cache::flush();
        // Thứ 4, 07/10/2026 (giờ VN) — tuần 05/10: lessons-6, puzzles-50, coup-2, survival-8.
        $this->travelTo(\Carbon\CarbonImmutable::parse('2026-10-07 10:00', 'Asia/Ho_Chi_Minh'));
    }

    public function test_quests_are_stable_per_week_and_varied(): void
    {
        $svc = app(WeeklyService::class);
        $this->assertSame('2026-10-05', $svc->week());
        $q = $svc->quests();
        $this->assertSame(['lessons-6', 'puzzles-50', 'coup-2', 'survival-8'], array_keys($q));
        $this->assertSame($q, $svc->quests('2026-10-05'));
        $this->assertCount(4, array_unique(array_column($q, 'metric')));
        foreach (['2026-10-12', '2026-10-19', '2026-11-02', '2027-01-04'] as $w) {
            $this->assertCount(4, array_unique(array_column($svc->quests($w), 'metric')), $w);
        }
    }

    public function test_claim_quests_and_chest(): void
    {
        $u = $this->user();
        $this->actingAs($u)->postJson(route('weekly.claim'), ['quest' => 'lessons-6'])->assertStatus(422);

        UserDailyActivity::create(['user_id' => $u->id, 'date' => '2026-10-05', 'xp' => 300, 'lessons' => 4, 'puzzles' => 30]);
        UserDailyActivity::create(['user_id' => $u->id, 'date' => '2026-10-06', 'xp' => 200, 'lessons' => 2, 'puzzles' => 25]);
        UserDailyActivity::create(['user_id' => $u->id, 'date' => '2026-10-04', 'xp' => 900, 'lessons' => 9, 'puzzles' => 90]);   // tuần trước: không tính
        PracticeSession::create(['uuid' => (string) Str::uuid(), 'user_id' => $u->id, 'mode' => 'survival', 'puzzle_ids' => [], 'score' => 9, 'started_at' => now(), 'finished_at' => now()]);
        foreach ([12, 6] as $plies) {   // ván 3 nước (6 nửa nước) không tính
            GameRecord::create(['user_id' => $u->id, 'mode' => 'bot', 'variant' => 'co-up', 'level' => 1, 'side' => 'do', 'opponent' => 'Máy', 'result' => 'loss',
                'start_fen' => Game::COUP_FEN, 'moves' => [], 'plies' => $plies]);
        }

        $svc = app(WeeklyService::class);
        $p = $svc->progress($u);
        $this->assertSame([true, true, false, true], array_column($p['quests'], 'done'));
        $this->assertSame([6, 50, 1, 8], array_column($p['quests'], 'value'));

        $xp0 = (int) $u->xp_total;
        $res = $this->actingAs($u)->postJson(route('weekly.claim'), ['quest' => 'lessons-6'])->assertOk();
        $this->assertSame(100, $res->json('gamification.xp'));
        $this->actingAs($u)->postJson(route('weekly.claim'), ['quest' => 'lessons-6'])->assertOk()->assertJson(['gamification' => ['xp' => 0]]);
        $this->assertSame($xp0 + 100, (int) $u->fresh()->xp_total);
        // XP thưởng không vào hoạt động ngày (bảng xếp hạng tuần).
        $this->assertSame(0, (int) UserDailyActivity::where('user_id', $u->id)->where('date', '2026-10-07')->sum('xp'));

        $this->actingAs($u)->postJson(route('weekly.claim'), ['quest' => 'chest'])->assertStatus(422);
        GameRecord::create(['user_id' => $u->id, 'mode' => 'pvp', 'variant' => 'co-up', 'side' => 'den', 'opponent' => 'B', 'result' => 'win',
            'start_fen' => Game::COUP_FEN, 'moves' => [], 'plies' => 40]);
        foreach (['puzzles-50', 'coup-2', 'survival-8'] as $k) {
            $this->actingAs($u)->postJson(route('weekly.claim'), ['quest' => $k])->assertOk();
        }
        $res = $this->actingAs($u)->postJson(route('weekly.claim'), ['quest' => 'chest'])->assertOk();
        $this->assertSame(150, $res->json('gamification.xp'));
        $this->assertTrue($res->json('progress.chest.claimed'));
        $this->assertSame(1, (int) $u->fresh()->streak_freezes);
        $this->assertContains('weekly-1', array_column($res->json('gamification.achievements'), 'key'));
        $this->actingAs($u)->get(route('weekly'))->assertOk()->assertSee('Đã mở');
        $this->actingAs($u)->get(route('home'))->assertOk()->assertSee('Thử thách tuần');
    }

    public function test_weekly_prizes_finalize_once_and_notify(): void
    {
        $users = [];
        foreach ([500, 900, 300, 120, 80] as $i => $xp) {
            $u = $this->user('U' . $i);
            UserDailyActivity::create(['user_id' => $u->id, 'date' => '2026-09-30', 'xp' => $xp]);
            $users[] = $u;
        }
        $hidden = $this->user('Ẩn', true);
        UserDailyActivity::create(['user_id' => $hidden->id, 'date' => '2026-10-01', 'xp' => 5000]);

        $r = $this->get(route('weekly'))->assertOk();
        $r->assertSee('Vinh danh tuần trước');
        $awards = WeeklyAward::orderBy('rank')->get();
        $this->assertSame([$users[1]->id, $users[0]->id, $users[2]->id, $users[3]->id], $awards->pluck('user_id')->all());   // 80 XP < ngưỡng, người ẩn bị loại
        $this->assertSame('2026-09-28', $awards[0]->week_start->toDateString());
        $this->assertSame((int) $users[1]->xp_total + 500, (int) $users[1]->fresh()->xp_total);
        $this->assertSame(1, (int) $users[1]->fresh()->streak_freezes);

        Cache::flush();
        app(WeeklyService::class)->ensureFinalized();
        $this->assertSame(4, WeeklyAward::count());
        $this->assertSame((int) $users[1]->xp_total + 500, (int) $users[1]->fresh()->xp_total);   // không trao lại

        $champ = $users[1]->fresh();
        $this->actingAs($champ)->get(route('leaderboard'))->assertOk()->assertSee('"medal":"gold"', false);
        $this->assertTrue($champ->achievements()->where('key', 'weekly-champ')->exists());
        $award = WeeklyAward::where('user_id', $champ->id)->first();
        $this->actingAs($users[0])->postJson(route('weekly.seen', $award))->assertForbidden();
        $this->actingAs($champ)->postJson(route('weekly.seen', $award))->assertOk();
        $this->actingAs($champ)->get(route('leaderboard'))->assertDontSee('"medal":"gold"', false);
        $this->actingAs($champ)->get(route('weekly'))->assertSee('Tủ cúp của tôi');
    }
}
