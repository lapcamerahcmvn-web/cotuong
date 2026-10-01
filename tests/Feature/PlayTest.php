<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\User;
use App\Models\XpTransaction;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PlayTest extends TestCase
{
    use RefreshDatabase;

    private function user(string $name): User
    {
        return User::create(['name' => $name, 'email' => uniqid().'@t.local', 'password' => 'secret12', 'role' => 'hoc_vien'])->fresh();
    }

    private function playing(): array
    {
        [$a, $b] = [$this->user('A'), $this->user('B')];
        $this->actingAs($a)->post(route('pvp.store'), ['side' => 'do', 'time' => 600])->assertRedirect();
        $g = Game::latest('id')->first();
        $this->actingAs($b)->post(route('pvp.accept', $g->code))->assertRedirect();

        return [$a, $b, $g->fresh()];
    }

    public function test_room_flow_turns_and_legality(): void
    {
        [$a, $b, $g] = $this->playing();
        $this->assertSame('playing', $g->status);
        $this->assertSame($b->id, $g->black_user_id);

        $this->actingAs($b)->postJson(route('pvp.move', $g->code), ['move' => 'h7e7'])->assertStatus(422);   // chưa tới lượt Đen
        $this->actingAs($a)->postJson(route('pvp.move', $g->code), ['move' => 'h2h9'])->assertOk();          // Pháo ăn Mã qua ngòi
        $this->actingAs($b)->postJson(route('pvp.move', $g->code), ['move' => 'a9a5'])->assertStatus(422);   // Xe nhảy qua quân: sai luật
        $this->actingAs($b)->postJson(route('pvp.move', $g->code), ['move' => 'i9h9'])->assertOk()->assertJson(['turn' => 'do']);

        $state = $this->getJson(route('pvp.state', $g->code).'?v=0')->json();
        $this->assertCount(2, $state['moves']);
        $same = $this->getJson(route('pvp.state', $g->code).'?v='.$state['version'])->json();
        $this->assertTrue($same['same']);
    }

    public function test_draw_agreement_awards_xp_after_ten_plies(): void
    {
        [$a, $b, $g] = $this->playing();
        // Hai bên đi qua lại Xe → đủ 12 nước nhưng tránh lặp thế 3 lần.
        $seq = ['a0a1', 'a9a8', 'a1a2', 'a8a7', 'i0i1', 'i9i8', 'i1i2', 'i8i7', 'b0c2', 'b9c7', 'h0g2', 'h9g7'];
        foreach ($seq as $i => $m) {
            $this->actingAs($i % 2 ? $b : $a)->postJson(route('pvp.move', $g->code), ['move' => $m])->assertOk();
        }
        $this->actingAs($a)->postJson(route('pvp.draw', $g->code))->assertJson(['draw_offer' => 'do']);
        $this->actingAs($b)->postJson(route('pvp.draw', $g->code))->assertJson(['status' => 'finished', 'result' => 'hoa']);

        $this->assertSame(2, XpTransaction::where('reason', 'pvp_draw')->count());
    }

    public function test_threefold_repetition_is_draw_and_short_games_give_no_xp(): void
    {
        [$a, $b, $g] = $this->playing();
        $seq = ['b0c2', 'b9c7', 'c2b0', 'c7b9', 'b0c2', 'b9c7', 'c2b0', 'c7b9'];
        foreach ($seq as $i => $m) {
            $r = $this->actingAs($i % 2 ? $b : $a)->postJson(route('pvp.move', $g->code), ['move' => $m])->json();
        }
        $this->assertSame('finished', $r['status']);
        $this->assertSame('hoa', $r['result']);
        $this->assertSame(0, XpTransaction::count());   // < 10 nước → không XP
    }

    public function test_resign_and_timeout(): void
    {
        [$a, $b, $g] = $this->playing();
        $this->actingAs($b)->postJson(route('pvp.resign', $g->code))->assertJson(['result' => 'do', 'reason' => 'xin thua']);

        [$c, $d, $g2] = $this->playing();
        $g2 = Game::latest('id')->first();
        $g2->forceFill(['turn_started_at' => now()->subMinutes(11)])->save();
        $this->getJson(route('pvp.state', $g2->code).'?v=0')->assertJson(['status' => 'finished', 'result' => 'den', 'reason' => 'hết giờ']);
    }

    public function test_bot_result_xp_rules(): void
    {
        $u = $this->user('Bot');
        $win = fn (array $o = []) => $this->actingAs($u)->postJson(route('play.bot.result'), array_merge(['level' => 3, 'result' => 'win', 'plies' => 40, 'ms' => 300000], $o))->json();

        $win();
        $this->assertSame(40, (int) XpTransaction::where('reason', 'bot_win')->latest('id')->value('amount'));
        $this->assertNull($win(['plies' => 4])['gamification']);                 // ván quá ngắn
        $this->assertNull($win(['result' => 'loss'])['gamification']);
        $win(['hints' => 1]);
        $this->assertSame(20, (int) XpTransaction::where('reason', 'bot_win')->latest('id')->value('amount'));   // dùng gợi ý → nửa XP
        $this->assertDatabaseHas('user_achievements', ['user_id' => $u->id, 'key' => 'bot-3']);
        for ($i = 0; $i < 5; $i++) $win();
        $this->assertSame(5, XpTransaction::where('user_id', $u->id)->where('reason', 'bot_win')->count());   // trần 5 ván/ngày
    }

    public function test_play_pages_render(): void
    {
        $this->get('/choi-voi-may')->assertOk()->assertSee('Chơi cờ tướng với máy');
        $this->get('/dau-ban')->assertOk();
        [$a, $b, $g] = $this->playing();
        $this->get('/dau-ban/'.$g->code)->assertOk();
        $this->actingAs($a)->get('/dau-ban')->assertOk()->assertSee($g->code);
    }
}
