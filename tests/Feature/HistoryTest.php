<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\GameRecord;
use App\Models\User;
use App\Services\GameRecordService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HistoryTest extends TestCase
{
    use RefreshDatabase;

    private function user(string $name = 'A'): User
    {
        return User::create(['name' => $name, 'email' => uniqid().'@t.local', 'password' => 'secret12', 'role' => 'hoc_vien'])->fresh();
    }

    private function botPayload(array $over = []): array
    {
        return array_merge([
            'level' => 2, 'result' => 'loss', 'plies' => 4, 'hints' => 0, 'undos' => 0, 'ms' => 5000,
            'variant' => 'co-tuong', 'side' => 'do', 'reason' => 'Xin thua',
            'moves' => ['h2e2', 'h9g7', 'e2e6', 'b9c7'],
        ], $over);
    }

    public function test_steps_validate_rules_and_build_captions(): void
    {
        $svc = app(GameRecordService::class);
        $steps = $svc->steps(Game::START_FEN, ['h2e2', 'h9g7', 'e2e6']);
        $this->assertCount(3, $steps);
        $this->assertSame('Pháo 2 bình 5', $steps[0]['move_notation_wxf']);
        $this->assertStringContainsString('ăn Tốt', $steps[2]['caption']);
        $this->assertNull($svc->steps(Game::START_FEN, ['a0a5']));          // Xe nhảy qua Tốt
        $this->assertNull($svc->steps(Game::START_FEN, ['h9g7']));          // Đen đi trước

        // Cờ úp: quân úp đi theo ô xuất phát, phải khai báo quân lật ra đúng bên.
        $coup = $svc->steps(Game::COUP_FEN, ['b2b9', 'a9a8'], ['R', 'c'], ['n']);
        $this->assertStringContainsString('lật Xe', $coup[0]['caption']);
        $this->assertStringContainsString('ăn nắp: Mã', $coup[0]['caption']);
        $this->assertSame(['p' => 'n', 'hidden' => true], $coup[0]['cap']);
        $this->assertNull($svc->steps(Game::COUP_FEN, ['b2b9'], ['r']));     // lật ra quân Đen cho Đỏ
    }

    public function test_bot_result_stores_record_and_returns_url(): void
    {
        $u = $this->user();
        $res = $this->actingAs($u)->postJson(route('play.bot.result'), $this->botPayload())->assertOk();
        $rec = GameRecord::first();
        $this->assertNotNull($rec);
        $this->assertSame(route('history.show', $rec), $res->json('record_url'));
        $this->assertSame(['bot', 'loss', 4, 'Máy · Dễ'], [$rec->mode, $rec->result, $rec->plies, $rec->opponent]);

        // Nước sai luật → không lưu.
        $this->actingAs($u)->postJson(route('play.bot.result'), $this->botPayload(['moves' => ['h2e2', 'h2e2']]))
            ->assertOk()->assertJson(['record_url' => null]);
        $this->assertSame(1, GameRecord::count());
    }

    public function test_pvp_finish_stores_record_for_both_players(): void
    {
        [$a, $b] = [$this->user('A'), $this->user('B')];
        $this->actingAs($a)->post(route('pvp.store'), ['side' => 'do', 'time' => 600]);
        $g = Game::latest('id')->first();
        $this->actingAs($b)->post(route('pvp.accept', $g->code));
        $this->actingAs($a)->postJson(route('pvp.move', $g->code), ['move' => 'h2e2'])->assertOk();
        $this->actingAs($b)->postJson(route('pvp.move', $g->code), ['move' => 'h9g7'])->assertOk();
        $this->actingAs($a)->post(route('pvp.resign', $g->code));

        $ra = GameRecord::where('user_id', $a->id)->first();
        $rb = GameRecord::where('user_id', $b->id)->first();
        $this->assertSame(['loss', 'do', 'B', 2], [$ra->result, $ra->side, $ra->opponent, $ra->plies]);
        $this->assertSame(['win', 'den', 'A'], [$rb->result, $rb->side, $rb->opponent]);
    }

    public function test_history_pages_owner_only_and_copy_to_library(): void
    {
        [$u, $other] = [$this->user('A'), $this->user('B')];
        $this->actingAs($u)->postJson(route('play.bot.result'), $this->botPayload());
        $rec = GameRecord::first();

        $this->actingAs($u)->get(route('history.index'))->assertOk()->assertSee('Máy · Dễ');
        $this->actingAs($u)->get(route('history.index', ['ket-qua' => 'win']))->assertOk()->assertDontSee('Máy · Dễ');
        $this->actingAs($u)->get(route('history.show', $rec))->assertOk()->assertSee('Pháo 2 bình 5');
        $this->actingAs($other)->get(route('history.show', $rec))->assertForbidden();
        $this->actingAs($other)->post(route('history.library', $rec))->assertForbidden();

        $res = $this->actingAs($u)->post(route('history.library', $rec));
        $item = $u->library()->first();
        $res->assertRedirect(route('account.library', ['sua' => $item->id]));
        $this->assertSame(Game::START_FEN, $item->fen);
        $this->assertCount(4, $item->steps_json);
        $this->assertSame('h2e2', $item->variation_tree[0]['iccs']);
        $this->assertSame('b9c7', $item->variation_tree[0]['children'][0]['children'][0]['children'][0]['iccs']);

        $this->actingAs($other)->delete(route('history.destroy', $rec))->assertForbidden();
        $this->actingAs($u)->delete(route('history.destroy', $rec))->assertRedirect(route('history.index'));
        $this->assertSame(0, GameRecord::count());
    }

    public function test_long_game_tree_fits_library_column(): void
    {
        // 120 nước Xe đi qua lại — cây biến lồng > 100 tầng (vượt giới hạn cột JSON MySQL cũ).
        $moves = [];
        for ($i = 0; $i < 30; $i++) array_push($moves, 'a0a1', 'a9a8', 'a1a0', 'a8a9');
        $u = $this->user();
        $this->actingAs($u)->postJson(route('play.bot.result'), $this->botPayload(['moves' => $moves, 'result' => 'draw', 'plies' => 120]));
        $rec = GameRecord::first();
        $this->actingAs($u)->post(route('history.library', $rec))->assertRedirect();
        $this->assertCount(120, $u->library()->first()->steps_json);
    }
}
