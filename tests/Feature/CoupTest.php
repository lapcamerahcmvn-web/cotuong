<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\User;
use App\Support\Xiangqi\Rules;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CoupTest extends TestCase
{
    use RefreshDatabase;

    private function user(string $name): User
    {
        return User::create(['name' => $name, 'email' => uniqid().'@t.local', 'password' => 'secret12', 'role' => 'hoc_vien'])->fresh();
    }

    private function coupGame(): array
    {
        [$a, $b] = [$this->user('A'), $this->user('B')];
        $this->actingAs($a)->post(route('pvp.store'), ['side' => 'do', 'time' => 0, 'variant' => 'co-up'])->assertRedirect();
        $g = Game::latest('id')->first();
        $this->actingAs($b)->post(route('pvp.accept', $g->code));

        return [$a, $b, $g->fresh()];
    }

    public function test_secret_layout_is_complete_and_never_sent_to_clients(): void
    {
        [$a, $b, $g] = $this->coupGame();
        $this->assertSame(Game::COUP_FEN, $g->fen);
        $this->assertCount(30, $g->secret);
        $red = array_filter($g->secret, fn ($p) => $p === strtoupper($p));
        $this->assertCount(15, $red);
        $counts = array_count_values(array_map('strtoupper', $red));
        ksort($counts);
        $this->assertSame(['A' => 2, 'B' => 2, 'C' => 2, 'N' => 2, 'P' => 5, 'R' => 2], $counts);

        foreach ([route('pvp.state', $g->code).'?v=0', route('pvp.show', $g->code)] as $url) {
            $body = $this->actingAs($a)->get($url)->getContent();
            $this->assertStringNotContainsString('secret', $body);
        }
        $json = $this->actingAs($a)->getJson(route('pvp.state', $g->code).'?v=0')->json();
        $this->assertArrayNotHasKey('secret', $json);
        $this->assertSame('co-up', $json['variant']);
    }

    public function test_hidden_piece_moves_by_start_square_and_reveals(): void
    {
        [$a, $b, $g] = $this->coupGame();
        $actual = $g->secret[Rules::iccs('a0a1')[0]];               // quân úp ở góc (vị trí Xe)
        $r = $this->actingAs($a)->postJson(route('pvp.move', $g->code), ['move' => 'a0a1'])->assertOk()->json();
        $this->assertSame([$actual], $r['reveals']);
        $this->assertStringNotContainsString('X', explode('/', $r['fen'])[8]);  // ô a1 giờ là quân thật
        $this->assertCount(29, $g->fresh()->secret);

        $this->actingAs($b)->postJson(route('pvp.move', $g->code), ['move' => 'b9c6'])->assertStatus(422);  // ô Mã không đi kiểu Pháo
        $this->actingAs($b)->postJson(route('pvp.move', $g->code), ['move' => 'b9c7'])->assertOk();          // đi như Mã
    }

    public function test_revealed_advisor_and_elephant_are_free_in_coup_only(): void
    {
        $fen = '3k5/9/9/9/4B4/9/9/9/9/5K3';
        $b = Rules::loadFen($fen);
        [$from, $to] = Rules::iccs('e5c7');                            // Tượng Đỏ đã qua sông đi tiếp lên
        $this->assertTrue(Rules::legalNoSelfCheck($b, $from, $to, true));
        $this->assertFalse(Rules::legalNoSelfCheck($b, $from, $to, false));

        $b = Rules::loadFen('3k5/9/9/9/4A4/9/9/9/9/5K3');
        $this->assertTrue(Rules::legalNoSelfCheck($b, ...[...Rules::iccs('e5d6'), true]));
        $this->assertFalse(Rules::legalNoSelfCheck($b, ...[...Rules::iccs('e5d6'), false]));
    }

    public function test_capturing_hidden_piece_reveals_it_into_captured_list(): void
    {
        [$a, $b, $g] = $this->coupGame();
        // Quân úp ở ô Pháo (b2) đi như Pháo: ăn quân úp Đen ở b9 qua ngòi b7.
        $victim = $g->secret[Rules::iccs('b2b9')[1]];
        $r = $this->actingAs($a)->postJson(route('pvp.move', $g->code), ['move' => 'b2b9'])->assertOk()->json();
        $this->assertSame([$victim], $r['captured']);
    }
}
