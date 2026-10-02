<?php

namespace App\Services;

use App\Models\GameRecord;
use App\Models\User;
use App\Models\UserAchievement;
use App\Models\UserDailyActivity;
use App\Models\WeeklyAward;
use App\Support\Vn;
use Illuminate\Support\Facades\DB;

// Lớp xã hội: theo dõi kỳ thủ, bảng XP tuần giữa bạn bè, bảng tin hoạt động bạn bè.
class SocialService
{
    public const MAX_FOLLOWING = 200;

    /** Bật/tắt theo dõi. Trả trạng thái mới (true = đang theo dõi). null nếu không được phép. */
    public function toggle(User $me, User $target): ?bool
    {
        if ($me->id === $target->id || ! $target->isPublic()) {
            return null;
        }
        if ($me->following()->whereKey($target->id)->exists()) {
            $me->following()->detach($target->id);

            return false;
        }
        if ($me->following()->count() >= self::MAX_FOLLOWING) {
            return null;
        }
        $me->following()->attach($target->id, ['created_at' => now()]);

        return true;
    }

    /** ID những người mình theo dõi còn để hồ sơ công khai. @return list<int> */
    public function followingIds(User $me): array
    {
        return $me->following()->where('users.leaderboard_opt_out', false)->pluck('users.id')->map(fn ($i) => (int) $i)->all();
    }

    /** XP tuần này của mình + bạn bè, xếp hạng. */
    public function friendsBoard(User $me): array
    {
        $ids = array_merge([$me->id], $this->followingIds($me));
        $xp = UserDailyActivity::whereIn('user_id', $ids)->where('date', '>=', Vn::weekStart())
            ->groupBy('user_id')->select('user_id', DB::raw('SUM(xp) as score'))->pluck('score', 'user_id');

        return User::whereIn('id', $ids)->get(['id', 'name', 'avatar', 'level', 'streak_current'])
            ->map(fn ($u) => ['user_id' => $u->id, 'name' => $u->name, 'avatar' => $u->avatar, 'level' => (int) $u->level,
                'score' => (int) ($xp[$u->id] ?? 0), 'url' => $u->profileUrl(), 'me' => $u->id === $me->id])
            ->sortBy([['score', 'desc'], ['name', 'asc']])->values()->all();
    }

    /**
     * Hoạt động gần đây (14 ngày) của những người mình theo dõi: huy hiệu, giải tuần, thắng máy cấp cao / đấu bạn.
     * @return list<array{at:\Carbon\CarbonInterface, user:User, icon:string, text:string, url:?string}>
     */
    public function feed(User $me, int $limit = 20): array
    {
        $ids = $this->followingIds($me);
        if (! $ids) {
            return [];
        }
        $since = now()->subDays(14);
        $users = User::whereIn('id', $ids)->get(['id', 'name', 'avatar', 'level'])->keyBy('id');
        $defs = config('achievements', []);
        $events = [];

        foreach (UserAchievement::whereIn('user_id', $ids)->where('unlocked_at', '>=', $since)->latest('unlocked_at')->limit($limit)->get() as $a) {
            if (! isset($defs[$a->key])) continue;
            $events[] = ['at' => $a->unlocked_at, 'user' => $users[$a->user_id], 'icon' => 'medal', 'text' => 'mở huy hiệu “' . $defs[$a->key]['name'] . '”', 'url' => null];
        }
        foreach (WeeklyAward::whereIn('user_id', $ids)->where('created_at', '>=', $since)->latest()->limit($limit)->get() as $w) {
            $events[] = ['at' => $w->created_at, 'user' => $users[$w->user_id], 'icon' => 'trophy',
                'text' => 'đạt ' . mb_strtolower($w->prize()['name']) . ' (hạng ' . $w->rank . ', ' . number_format($w->score, 0, ',', '.') . ' XP)', 'url' => route('weekly')];
        }
        $games = GameRecord::whereIn('user_id', $ids)->where('created_at', '>=', $since)->where('result', 'win')
            ->where(fn ($q) => $q->where('mode', 'pvp')->orWhere('level', '>=', 3))->latest()->limit($limit)->get();
        foreach ($games as $g) {
            $events[] = ['at' => $g->created_at, 'user' => $users[$g->user_id], 'icon' => $g->mode === 'pvp' ? 'sword' : 'shield',
                'text' => 'thắng ' . ($g->mode === 'pvp' ? 'một ván đấu bạn' : 'máy cấp ' . mb_strtolower(explode(' · ', $g->opponent)[1] ?? '')) . ($g->isCoup() ? ' (cờ úp)' : '') . ' sau ' . (int) ceil($g->plies / 2) . ' nước',
                'url' => $g->share_token ? route('history.public', $g->share_token) : null];
        }
        usort($events, fn ($a, $b) => $b['at'] <=> $a['at']);

        return array_slice($events, 0, $limit);
    }
}
