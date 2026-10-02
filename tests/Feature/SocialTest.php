<?php

namespace Tests\Feature;

use App\Models\GameRecord;
use App\Models\Game;
use App\Models\User;
use App\Models\UserAchievement;
use App\Models\UserDailyActivity;
use App\Support\Vn;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SocialTest extends TestCase
{
    use RefreshDatabase;

    private function user(string $name, bool $optOut = false): User
    {
        $u = User::create(['name' => $name, 'email' => uniqid().'@t.local', 'password' => 'secret12', 'role' => 'hoc_vien']);
        $u->forceFill(['leaderboard_opt_out' => $optOut])->save();

        return $u->fresh();
    }

    public function test_public_profile_privacy_and_canonical_slug(): void
    {
        [$a, $hidden] = [$this->user('Nguyễn Văn An'), $this->user('Kín Đáo', true)];
        $this->assertStringEndsWith('/ky-thu/' . $a->id . '-nguyen-van-an', $a->profileUrl());

        $this->get($a->profileUrl())->assertOk()->assertSee('Nguyễn Văn An')->assertSee('noindex', false)->assertSee('Đăng nhập để theo dõi');
        $this->get(route('profile.show', $a->id))->assertRedirect($a->profileUrl());
        $this->get(route('profile.show', $a->id . '-sai-ten'))->assertRedirect($a->profileUrl());
        $this->get(route('profile.show', '99999'))->assertNotFound();

        $this->get($hidden->profileUrl())->assertNotFound();
        $this->actingAs($a)->get($hidden->profileUrl())->assertNotFound();
        $this->actingAs($hidden)->get($hidden->profileUrl())->assertOk()->assertSee('đang riêng tư');
    }

    public function test_follow_toggle_rules(): void
    {
        [$a, $b, $hidden] = [$this->user('A'), $this->user('B'), $this->user('H', true)];
        $url = fn (User $u) => route('profile.follow', $u->id);

        $this->postJson($url($b))->assertUnauthorized();
        $this->actingAs($a)->postJson($url($b))->assertOk()->assertJson(['following' => true, 'followers' => 1]);
        $this->actingAs($a)->get($b->profileUrl())->assertSee('Đang theo dõi');
        $this->actingAs($b)->get($a->profileUrl())->assertSee('Đang theo dõi bạn');
        $this->actingAs($a)->postJson($url($b))->assertOk()->assertJson(['following' => false, 'followers' => 0]);
        $this->actingAs($a)->postJson($url($a))->assertStatus(422);
        $this->actingAs($a)->postJson($url($hidden))->assertStatus(422);
    }

    public function test_friends_board_and_feed(): void
    {
        [$a, $b, $c] = [$this->user('An'), $this->user('Bình'), $this->user('Chi')];
        $a->following()->attach([$b->id => ['created_at' => now()], $c->id => ['created_at' => now()]]);
        UserDailyActivity::create(['user_id' => $a->id, 'date' => Vn::today(), 'xp' => 50]);
        UserDailyActivity::create(['user_id' => $b->id, 'date' => Vn::today(), 'xp' => 120]);
        UserDailyActivity::create(['user_id' => $b->id, 'date' => Vn::daysAgo(30), 'xp' => 9999]);   // ngoài tuần
        UserAchievement::create(['user_id' => $c->id, 'key' => 'first-lesson', 'unlocked_at' => now()->subHour()]);
        GameRecord::create(['user_id' => $b->id, 'mode' => 'bot', 'variant' => 'co-tuong', 'level' => 4, 'side' => 'do', 'opponent' => 'Máy · Khó',
            'result' => 'win', 'start_fen' => Game::START_FEN, 'moves' => [], 'plies' => 40]);
        // Người ẩn khỏi xếp hạng không xuất hiện trong bảng / bảng tin bạn bè.
        $c->forceFill(['leaderboard_opt_out' => true])->save();

        $res = $this->actingAs($a)->get(route('friends'))->assertOk();
        $res->assertSeeInOrder(['Bình', '120', 'Bạn', '50']);
        $res->assertSee('thắng máy cấp khó sau 20 nước')->assertDontSee('mở huy hiệu');
        $this->get(route('leaderboard'))->assertOk()->assertSee($a->profileUrl(), false);
    }
}
