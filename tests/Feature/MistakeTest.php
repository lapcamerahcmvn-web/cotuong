<?php

namespace Tests\Feature;

use App\Models\GameMistake;
use App\Models\GameRecord;
use App\Models\User;
use App\Services\Gamification\WeeklyService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class MistakeTest extends TestCase
{
    use RefreshDatabase;

    private function user(string $name = 'A'): User
    {
        return User::create(['name' => $name, 'email' => uniqid().'@t.local', 'password' => 'secret12', 'role' => 'hoc_vien'])->fresh();
    }

    /** Ván 4 nửa nước người chơi cầm Đỏ, phân tích: nước 2 (Đỏ) & nước 3 (Đen) đều là sai lầm nghiêm trọng. */
    private function analysedGame(User $u): GameRecord
    {
        $this->actingAs($u)->postJson(route('play.bot.result'), [
            'level' => 2, 'result' => 'loss', 'plies' => 4, 'ms' => 5000, 'variant' => 'co-tuong', 'side' => 'do',
            'moves' => ['h2e2', 'h9g7', 'e2e6', 'b9c7'],
        ])->assertOk();
        $rec = GameRecord::first();
        $an = [
            'evals' => [0, 10, 0, -400, -380],
            'moves' => [['b' => 'h2e2', 'l' => 0, 'c' => 'best'], ['b' => 'h9g7', 'l' => 0, 'c' => 'best'],
                ['b' => 'b0c2', 'l' => 420, 'c' => 'blunder'], ['b' => 'g6g5', 'l' => 500, 'c' => 'blunder']],
            'acc' => ['do' => 70, 'den' => 60],
            'alts' => ['2' => ['b0c2' => 20, 'h0g2' => -10, 'e2e6' => -400], '3' => ['g6g5' => 0, 'b9c7' => -500]],
        ];
        $res = $this->actingAs($u)->postJson(route('history.analysis', $rec), ['analysis' => $an])->assertOk();
        $this->assertSame(1, $res->json('mistakes'));   // chỉ sai lầm của chính người chơi (Đỏ)

        return $rec->fresh();
    }

    public function test_mistakes_created_from_own_moves_only(): void
    {
        $u = $this->user();
        $rec = $this->analysedGame($u);
        $m = GameMistake::sole();
        $this->assertSame([2, 'do', 'e2e6', 'b0c2', 'blunder'], [$m->ply, $m->side, $m->played, $m->best, $m->class]);
        $this->assertSame('rnbakab1r/9/1c4nc1/p1p1p1p1p/9/9/P1P1P1P1P/1C2C4/9/RNBAKABNR', $m->fen);   // thế TRƯỚC nước sai
        // phân tích lại không nhân đôi
        $this->actingAs($u)->postJson(route('history.analysis', $rec), ['analysis' => $rec->analysis])->assertOk()->assertJson(['mistakes' => 0]);
        $this->assertSame(1, GameMistake::count());

        $page = $this->actingAs($u)->get(route('practice.mistakes'))->assertOk()->assertSee('Pháo 5 tiến 4');
        $page->assertDontSee('b0c2');   // không lộ đáp án ra trang
        $this->actingAs($u)->get(route('practice.hub'))->assertSee('1 thế cần ôn hôm nay');
    }

    public function test_answer_schedule_xp_and_ownership(): void
    {
        $u = $this->user();
        $this->analysedGame($u);
        $m = GameMistake::sole();
        $url = route('practice.mistakes.answer', $m);

        $this->actingAs($this->user('B'))->postJson($url, ['move' => 'b0c2'])->assertForbidden();
        $this->actingAs($u)->postJson($url, ['move' => 'a0a1'])->assertOk()->assertJson(['correct' => false, 'box' => 0, 'bestNote' => 'Mã 8 tiến 7']);
        $this->assertSame(now('Asia/Ho_Chi_Minh')->addDay()->toDateString(), $m->fresh()->due_on);
        $this->actingAs($u)->postJson($url, ['move' => ''])->assertOk()->assertJson(['correct' => false]);   // xem đáp án

        // trong 60 điểm của nước tốt nhất = đạt
        $res = $this->actingAs($u)->postJson($url, ['move' => 'h0g2'])->assertOk()->assertJson(['correct' => true, 'box' => 1]);
        $this->assertSame(8, $res->json('gamification.xp'));
        $this->assertSame(now('Asia/Ho_Chi_Minh')->addDay()->toDateString(), $m->fresh()->due_on);
        $this->actingAs($u)->postJson($url, ['move' => 'b0c2'])->assertOk()->assertJson(['correct' => true, 'box' => 2]);
        $this->actingAs($u)->postJson($url, ['move' => 'b0c2'])->assertJson(['box' => 3]);
        $this->actingAs($u)->postJson($url, ['move' => 'b0c2'])->assertJson(['box' => 4, 'mastered' => true]);
        $this->assertNotNull($m->fresh()->mastered_at);
        $this->assertSame(0, app(\App\Services\MistakeService::class)->dueCount($u));
        $this->assertGreaterThanOrEqual(1, app(WeeklyService::class)->metric($u, 'mistakes', app(WeeklyService::class)->week()));
    }
}
