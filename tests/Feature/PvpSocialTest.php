<?php

namespace Tests\Feature;

use App\Models\Game;
use App\Models\GameInvite;
use App\Models\LessonSeries;
use App\Models\User;
use App\Services\LearningPathService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

// Đấu bạn 10/2026: xin đi lại (3 lần/ván), xem ván (cần đăng nhập), mời bạn online (3 lời/10 phút),
// sảnh phòng đang đấu; Xếp cờ để thẩm; lộ trình + sơ đồ trang tự thêm chương trình mới.
class PvpSocialTest extends TestCase
{
    use RefreshDatabase;

    private function user(string $name): User
    {
        return User::create(['name' => $name, 'email' => uniqid() . '@t.local', 'password' => 'secret12', 'role' => 'hoc_vien'])->fresh();
    }

    private function playing(string $variant = 'co-tuong'): array
    {
        [$a, $b] = [$this->user('A'), $this->user('B')];
        $this->actingAs($a)->post(route('pvp.store'), ['side' => 'do', 'time' => 600, 'variant' => $variant])->assertRedirect();
        $g = Game::latest('id')->first();
        $this->actingAs($b)->post(route('pvp.accept', $g->code))->assertRedirect();

        return [$a, $b, $g->fresh()];
    }

    private function move(User $u, Game $g, string $mv): void
    {
        $this->actingAs($u)->postJson(route('pvp.move', $g->code), ['move' => $mv])->assertOk();
    }

    public function test_takeback_undoes_own_move_and_reply(): void
    {
        [$a, $b, $g] = $this->playing();
        $this->move($a, $g, 'h2e2');
        $this->move($b, $g, 'h9g7');
        // Tới lượt Đỏ (người xin) → lùi 2 nước.
        $this->actingAs($a)->postJson(route('pvp.takeback', $g->code))->assertOk()->assertJson(['takeback_offer' => 'do']);
        $this->actingAs($a)->postJson(route('pvp.takeback', $g->code))->assertStatus(422);     // đang chờ trả lời
        $this->actingAs($b)->postJson(route('pvp.takeback', $g->code), ['accept' => 1])->assertOk()
            ->assertJson(['moves' => [], 'fen' => Game::START_FEN, 'takeback_offer' => null, 'takebacks_left' => ['do' => 2, 'den' => 3]]);

        // Đỏ đi, xin lại ngay (chưa có nước đáp) → lùi 1 nước.
        $this->move($a, $g, 'b2e2');
        $this->actingAs($a)->postJson(route('pvp.takeback', $g->code))->assertOk();
        $this->actingAs($b)->postJson(route('pvp.takeback', $g->code), ['accept' => 1])->assertOk()->assertJson(['moves' => [], 'turn' => 'do']);
    }

    public function test_takeback_decline_blocks_until_new_move_and_limit_three(): void
    {
        [$a, $b, $g] = $this->playing();
        $this->move($a, $g, 'h2e2');
        $this->actingAs($a)->postJson(route('pvp.takeback', $g->code))->assertOk();
        $this->actingAs($b)->postJson(route('pvp.takeback', $g->code), ['accept' => 0])->assertOk()->assertJson(['moves' => ['h2e2'], 'takeback_offer' => null]);
        $this->actingAs($a)->postJson(route('pvp.takeback', $g->code))->assertStatus(422);      // vừa bị từ chối

        $g->refresh()->update(['takebacks' => ['do' => 3], 'takeback_block' => null]);
        $this->actingAs($a)->postJson(route('pvp.takeback', $g->code))->assertStatus(422)->assertJsonFragment(['takebacks_left' => ['do' => 0, 'den' => 3]]);
        $this->actingAs($b)->postJson(route('pvp.takeback', $g->code))->assertStatus(422);      // Đen chưa đi nước nào
    }

    public function test_takeback_in_coup_restores_hidden_pieces(): void
    {
        [$a, $b, $g] = $this->playing('co-up');
        $secret = $g->secret;
        $this->move($a, $g, 'h2h9');          // Pháo úp lật + ăn nắp Đen ở h9
        $g->refresh();
        $this->assertCount(28, $g->secret);
        $this->assertCount(1, $g->captured);
        $this->actingAs($a)->postJson(route('pvp.takeback', $g->code))->assertOk();
        $this->actingAs($b)->postJson(route('pvp.takeback', $g->code), ['accept' => 1])->assertOk();
        $g->refresh();
        $this->assertSame(Game::COUP_FEN, $g->fen);
        $this->assertSame([], $g->captured);
        $this->assertSame([], $g->reveals);
        $this->assertEquals($secret, $g->secret);
    }

    public function test_watching_requires_login_and_counts_watchers(): void
    {
        [$a, $b, $g] = $this->playing();
        auth()->logout();
        $this->get(route('pvp.show', $g->code))->assertRedirect(route('login'));
        $c = $this->user('C');
        $this->actingAs($c)->get(route('pvp.show', $g->code))->assertOk()->assertSee('Các phòng khác');
        $this->actingAs($c)->getJson(route('pvp.state', $g->code) . '?v=0')->assertOk();
        $this->actingAs($a)->getJson(route('pvp.state', $g->code) . '?v=0')->assertJson(['watchers' => 1]);
        $this->actingAs($c)->getJson(route('pvp.lobby.data'))->assertOk()->assertJsonPath('live.0.code', $g->code);
    }

    public function test_invite_online_friend_accept_creates_game(): void
    {
        [$a, $b] = [$this->user('A'), $this->user('B')];
        $a->following()->attach($b->id, ['created_at' => now()]);
        $stranger = $this->user('S');
        DB::table('users')->update(['last_seen_at' => now()]);

        $this->actingAs($a)->getJson(route('pvp.lobby.data'))->assertOk()->assertJsonPath('friends.0.id', $b->id);
        $this->actingAs($a)->postJson(route('invites.store'), ['to' => $stranger->id])->assertStatus(422);
        $id = $this->actingAs($a)->postJson(route('invites.store'), ['to' => $b->id, 'variant' => 'co-up', 'side' => 'do', 'time' => 300])->assertOk()->json('id');
        $this->actingAs($a)->postJson(route('invites.store'), ['to' => $b->id])->assertStatus(422);    // đang chờ trả lời

        $this->actingAs($b)->getJson(route('invites.poll'))->assertOk()->assertJsonPath('incoming.0.id', $id);
        $url = $this->actingAs($b)->postJson(route('invites.accept', $id))->assertOk()->json('url');
        $g = Game::latest('id')->first();
        $this->assertSame(route('pvp.show', $g->code), $url);
        $this->assertSame(['playing', 'co-up', $a->id, $b->id, 300], [$g->status, $g->variant, $g->red_user_id, $g->black_user_id, $g->time_control]);

        $this->actingAs($a)->getJson(route('invites.poll'))->assertJsonPath('results.0.status', 'accepted')->assertJsonPath('results.0.url', $url);
        $this->actingAs($a)->getJson(route('invites.poll'))->assertJsonCount(0, 'results');      // chỉ báo 1 lần
    }

    public function test_invite_limit_three_per_ten_minutes_and_decline(): void
    {
        $a = $this->user('A');
        $friends = collect(range(1, 4))->map(fn ($i) => $this->user('F' . $i));
        foreach ($friends as $f) $f->following()->attach($a->id, ['created_at' => now()]);   // họ theo dõi mình = bạn bè
        DB::table('users')->update(['last_seen_at' => now()]);

        foreach ($friends->take(3) as $f) $this->actingAs($a)->postJson(route('invites.store'), ['to' => $f->id])->assertOk();
        $this->actingAs($a)->postJson(route('invites.store'), ['to' => $friends[3]->id])->assertStatus(422)->assertJson(['left' => 0]);

        $inv = GameInvite::where('to_user_id', $friends[0]->id)->first();
        $this->actingAs($friends[0])->postJson(route('invites.decline', $inv->id))->assertOk();
        $this->actingAs($friends[1])->postJson(route('invites.decline', $inv->id))->assertForbidden();
        $this->actingAs($a)->getJson(route('invites.poll'))->assertJsonPath('results.0.status', 'declined');

        $this->travel(11)->minutes();
        DB::table('users')->update(['last_seen_at' => now()]);
        $this->actingAs($a)->postJson(route('invites.store'), ['to' => $friends[3]->id])->assertOk();
    }

    public function test_offline_friend_cannot_be_invited(): void
    {
        [$a, $b] = [$this->user('A'), $this->user('B')];
        $a->following()->attach($b->id, ['created_at' => now()]);
        DB::table('users')->where('id', $b->id)->update(['last_seen_at' => now()->subMinutes(10)]);
        $this->actingAs($a)->postJson(route('invites.store'), ['to' => $b->id])->assertStatus(422);
    }

    public function test_setup_page_and_bot_autostart_params(): void
    {
        $this->get(route('practice.setup'))->assertOk()->assertSee('Xếp cờ để thẩm');
        $fen = '3k5/9/9/9/9/9/9/9/9/R3K4';
        $this->get(route('play.bot', ['tu-the' => $fen, 'luot' => 'do', 'cam' => 'may', 'cap' => 3]))->assertOk()
            ->assertSee('human":"may', false)->assertSee('autostart":true', false);
    }

    public function test_learning_path_and_sitemap_include_new_series(): void
    {
        $s = LessonSeries::create(['name' => 'Chuyên đề mới thử nghiệm', 'slug' => 'chuyen-de-moi-thu', 'game_mode' => 'co-tuong', 'phase' => 'tan-cuoc', 'sort_order' => 99]);
        \App\Models\Lesson::create(['title' => 'Bài thử chuyên đề mới', 'slug' => 'bai-thu-chuyen-de-moi', 'series_id' => $s->id, 'phase' => 'tan-cuoc',
            'status' => 'published', 'published_at' => now(), 'order_in_series' => 1]);
        $courses = app(LearningPathService::class)->structure();
        $this->assertContains('chuyen-de-moi-thu', array_column($courses['tan-cuoc']['series_list'], 'slug'));
        $this->get(route('sitemap.page'))->assertOk()->assertSee('Chuyên đề mới thử nghiệm')->assertSee('Xếp cờ để thẩm');
        $this->get(route('path'))->assertOk()->assertSee('Chuyên đề mới thử nghiệm');
    }
}
