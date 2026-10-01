<?php

namespace App\Support;

use Carbon\CarbonImmutable;

// Ngày theo giờ Việt Nam (app chạy UTC) — dùng cho chuỗi ngày, mục tiêu ngày, xếp hạng tuần.
final class Vn
{
    public static function now(): CarbonImmutable
    {
        return CarbonImmutable::now(config('gamification.timezone', 'Asia/Ho_Chi_Minh'));
    }

    public static function today(): string
    {
        return self::now()->toDateString();
    }

    public static function daysAgo(int $n): string
    {
        return self::now()->subDays($n)->toDateString();
    }

    public static function weekStart(): string
    {
        return self::now()->startOfWeek(CarbonImmutable::MONDAY)->toDateString();
    }

    public static function monthStart(): string
    {
        return self::now()->startOfMonth()->toDateString();
    }

    /** Số giây còn lại tới 0h hôm sau (giờ VN) — đồng hồ "Thế cờ hôm nay". */
    public static function secondsToMidnight(): int
    {
        $now = self::now();

        return (int) $now->diffInSeconds($now->addDay()->startOfDay(), true);
    }
}
