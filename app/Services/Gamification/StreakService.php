<?php

namespace App\Services\Gamification;

use App\Models\User;
use App\Support\Vn;

// Chuỗi ngày học theo giờ VN. Không có cron: đứt chuỗi được tính "lười" khi đọc (current()) và
// khi có hoạt động mới (touch()). Thẻ giữ chuỗi tự dùng khi lỡ đúng 1 ngày.
class StreakService
{
    public function current(User $u): int
    {
        $last = $u->streak_last_date?->toDateString();
        if (! $last || ! $u->streak_current) {
            return 0;
        }
        if ($last >= Vn::daysAgo(1)) {
            return (int) $u->streak_current;
        }
        if ($last === Vn::daysAgo(2) && $u->streak_freezes > 0) {
            return (int) $u->streak_current;
        }

        return 0;
    }

    public function activeToday(User $u): bool
    {
        return $u->streak_last_date?->toDateString() === Vn::today();
    }

    /**
     * Ghi nhận hoạt động hôm nay. Trả về ['streak'=>n, 'increased'=>bool, 'freeze_used'=>bool].
     * Chỉ sửa model trong bộ nhớ — nơi gọi tự save().
     */
    public function touch(User $u, string $today): array
    {
        $last = $u->streak_last_date?->toDateString();
        $yesterday = Vn::daysAgo(1);
        $freezeUsed = false;

        if ($last === $today) {
            return ['streak' => (int) $u->streak_current, 'increased' => false, 'freeze_used' => false];
        }
        if ($last === $yesterday) {
            $u->streak_current = $u->streak_current + 1;
        } elseif ($last === Vn::daysAgo(2) && $u->streak_freezes > 0) {
            $u->streak_freezes = $u->streak_freezes - 1;
            $u->streak_current = $u->streak_current + 1;
            $freezeUsed = true;
        } else {
            $u->streak_current = 1;
        }
        $u->streak_last_date = $today;
        $u->streak_best = max((int) $u->streak_best, (int) $u->streak_current);

        $every = (int) config('gamification.freeze_every', 7);
        if ($every > 0 && $u->streak_current % $every === 0 && $u->streak_freezes < (int) config('gamification.freeze_max', 2)) {
            $u->streak_freezes = $u->streak_freezes + 1;
        }

        return ['streak' => (int) $u->streak_current, 'increased' => true, 'freeze_used' => $freezeUsed];
    }
}
