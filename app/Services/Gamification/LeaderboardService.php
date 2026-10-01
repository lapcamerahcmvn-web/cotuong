<?php

namespace App\Services\Gamification;

use App\Models\User;
use App\Models\UserDailyActivity;
use App\Support\Vn;
use Illuminate\Support\Facades\Cache;

// Bảng xếp hạng. Tuần/tháng cộng từ user_daily_activity (nhỏ hơn sổ cái), mọi lúc đọc users.xp_total.
// Người chọn "ẩn khỏi xếp hạng" (leaderboard_opt_out) bị loại. Top N cache ngắn; hạng của tôi tính riêng.
class LeaderboardService
{
    public const BOARDS = ['xp', 'streak', 'rush'];

    public const PERIODS = ['week' => 'Tuần này', 'month' => 'Tháng này', 'all' => 'Mọi lúc'];

    /** @return list<array{user_id:int,name:string,avatar:?string,level:int,score:int}> */
    public function top(string $board, string $period): array
    {
        $size = (int) config('gamification.leaderboard_size', 50);
        $key = "lb:{$board}:{$period}:" . ($period === 'week' ? Vn::weekStart() : ($period === 'month' ? Vn::monthStart() : 'all'));

        return Cache::remember($key, (int) config('gamification.leaderboard_cache', 600), function () use ($board, $period, $size) {
            if ($board === 'xp' && $period !== 'all') {
                $rows = UserDailyActivity::query()
                    ->join('users', 'users.id', '=', 'user_daily_activity.user_id')
                    ->where('users.leaderboard_opt_out', false)
                    ->where('user_daily_activity.date', '>=', $this->since($period))
                    ->groupBy('user_daily_activity.user_id', 'users.name', 'users.avatar', 'users.level')
                    ->selectRaw('user_daily_activity.user_id as user_id, users.name, users.avatar, users.level, SUM(user_daily_activity.xp) as score')
                    ->havingRaw('SUM(user_daily_activity.xp) > 0')
                    ->orderByDesc('score')->limit($size)->get();
            } else {
                $col = match ($board) { 'streak' => 'streak_current', 'rush' => 'rush_best', default => 'xp_total' };
                $q = User::query()->where('leaderboard_opt_out', false)->where($col, '>', 0);
                if ($board === 'streak') {
                    $q->where('streak_last_date', '>=', Vn::daysAgo(1));
                }
                $rows = $q->orderByDesc($col)->orderBy('id')->limit($size)
                    ->get(['id as user_id', 'name', 'avatar', 'level', $col . ' as score']);
            }

            return $rows->map(fn ($r) => [
                'user_id' => (int) $r->user_id, 'name' => $r->name, 'avatar' => $r->avatar,
                'level' => (int) $r->level, 'score' => (int) $r->score,
            ])->all();
        });
    }

    /** Hạng + điểm của 1 user (không cache). null nếu user ẩn khỏi xếp hạng hoặc chưa có điểm. */
    public function rankOf(User $u, string $board, string $period): ?array
    {
        if ($u->leaderboard_opt_out) {
            return null;
        }
        if ($board === 'xp' && $period !== 'all') {
            $since = $this->since($period);
            $mine = (int) UserDailyActivity::where('user_id', $u->id)->where('date', '>=', $since)->sum('xp');
            if ($mine <= 0) {
                return null;
            }
            $better = UserDailyActivity::query()
                ->join('users', 'users.id', '=', 'user_daily_activity.user_id')
                ->where('users.leaderboard_opt_out', false)->where('date', '>=', $since)
                ->groupBy('user_daily_activity.user_id')
                ->havingRaw('SUM(user_daily_activity.xp) > ?', [$mine])
                ->select('user_daily_activity.user_id')->get()->count();

            return ['rank' => $better + 1, 'score' => $mine];
        }
        $col = match ($board) { 'streak' => 'streak_current', 'rush' => 'rush_best', default => 'xp_total' };
        $mine = (int) $u->{$col};
        if ($board === 'streak' && ($u->streak_last_date?->toDateString() ?? '') < Vn::daysAgo(1)) {
            $mine = 0;
        }
        if ($mine <= 0) {
            return null;
        }
        $q = User::where('leaderboard_opt_out', false)->where($col, '>', $mine);
        if ($board === 'streak') {
            $q->where('streak_last_date', '>=', Vn::daysAgo(1));
        }

        return ['rank' => $q->count() + 1, 'score' => $mine];
    }

    private function since(string $period): string
    {
        return $period === 'month' ? Vn::monthStart() : Vn::weekStart();
    }
}
