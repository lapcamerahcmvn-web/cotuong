<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\User;
use App\Support\Xiangqi\Rules;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Luật: ăn nắp chỉ bên ăn biết là quân gì; chiếu dai bị cấm (không xử hoà); lặp thế không chiếu vẫn hoà.
class CoupRulesTest extends TestCase
{
    use RefreshDatabase;

    private function user(string $name): User
    {
        return User::create(['name' => $name, 'email' => uniqid().'@t.local', 'password' => 'secret12', 'role' => 'hoc_vien'])->fresh();
    }

    private function game(string $variant): array
    {
        [$a, $b] = [$this->user('A'), $this->user('B')];
        $this->actingAs($a)->post(route('pvp.store'), ['side' => 'do', 'time' => 0, 'variant' => $variant])->assertRedirect();
        $g = Game::latest('id')->first();
        $this->actingAs($b)->post(route('pvp.accept', $g->code));

        return [$a, $b, $g->fresh()];
    }

    public function test_coup_no_legal_move_without_check_is_a_loss_not_draw(): void
    {
        // Đen chỉ còn Tướng d9: Xe a8 đi a7 → Tướng không còn nước (d8 bị Xe i8 khống chế, e9 lộ mặt Tướng) dù không bị
        // chiếu → theo luật cờ úp bên hết nước đi THUA (trước đây xử hoà — sai).
        [$a, $b, $g] = $this->game('co-up');
        $g->forceFill(['fen' => '3k5/R7R/9/9/9/9/9/9/9/4K4', 'moves' => [], 'reveals' => [], 'captured' => []])->save();
        $this->actingAs($a)->postJson(route('pvp.move', $g->code), ['move' => 'a8a7'])->assertOk();
        $g->refresh();
        $this->assertSame('finished', $g->status);
        $this->assertSame('do', $g->result);
        $this->assertSame('hết nước đi', $g->reason);
    }

    public function test_captured_hidden_piece_identity_only_known_to_capturer(): void
    {
        [$a, $b, $g] = $this->game('co-up');
        // Pháo úp Đỏ b2 nhảy qua ngòi b7 ăn nắp Mã úp Đen ở b9.
        $this->actingAs($a)->postJson(route('pvp.move', $g->code), ['move' => 'b2b9'])->assertOk();
        $g->refresh();
        $real = $g->captured[0];
        $this->assertNotSame('x', $real);

        $mine = $this->actingAs($a)->getJson(route('pvp.state', $g->code))->json('captured');
        $theirs = $this->actingAs($b)->getJson(route('pvp.state', $g->code))->json('captured');
        $this->assertSame([$real], $mine);           // bên ăn biết
        $this->assertSame(['x'], $theirs);           // bên bị ăn chỉ biết mất 1 nắp
        auth()->logout();
        $this->assertSame(['x'], $this->getJson(route('pvp.state', $g->code))->json('captured'));   // người xem

        $this->actingAs($b)->post(route('pvp.resign', $g->code));
        $this->assertSame([$real], $this->actingAs($b)->getJson(route('pvp.state', $g->code))->json('captured'));   // hết ván → mở
    }

    public function test_perpetual_check_is_forbidden_not_drawn(): void
    {
        [$a, $b, $g] = $this->game('co-tuong');
        // Dựng lịch sử: Xe Đỏ chiếu liên tục e7 ↔ e8, Mã Đen b9 ↔ c7 (đã lặp 2 lần).
        $moves = ['a0e7', 'b9c7', 'e7e8', 'c7b9', 'e8e7', 'b9c7', 'e7e8', 'c7b9'];
        $board = Rules::loadFen(Game::START_FEN);
        foreach ($moves as $m) { $sq = Rules::iccs($m); $board = Rules::apply($board, $sq[0], $sq[1]); }
        $g->forceFill(['moves' => $moves, 'fen' => Rules::toFen($board)])->save();
        $this->assertSame('playing', $g->fresh()->status);   // lặp 2 lần chưa xử gì

        $res = $this->actingAs($a)->postJson(route('pvp.move', $g->code), ['move' => 'e8e7'])->assertStatus(422);
        $this->assertStringContainsString('chiếu dai', $res->json('error'));
        $this->assertSame('playing', $g->fresh()->status);   // không xử hoà

        $this->actingAs($a)->postJson(route('pvp.move', $g->code), ['move' => 'e8d8'])->assertOk();   // đổi nước khác → được
    }

    public function test_idle_threefold_repetition_is_still_a_draw(): void
    {
        [$a, $b, $g] = $this->game('co-tuong');
        // Hai bên đi Mã qua lại, không chiếu.
        foreach (['h0g2', 'h9g7', 'g2h0', 'g7h9', 'h0g2', 'h9g7', 'g2h0', 'g7h9'] as $i => $m) {
            $this->actingAs($i % 2 ? $b : $a)->postJson(route('pvp.move', $g->code), ['move' => $m])->assertOk();
        }
        $g->refresh();
        $this->assertSame('finished', $g->status);
        $this->assertSame('hoa', $g->result);
        $this->assertStringContainsString('lặp lại', $g->reason);
    }
}
