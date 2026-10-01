<?php

namespace App\Services\Gamification;

// Đường cong cấp độ: tổng XP để đạt cấp L = 20(L-1)² + 30(L-1).
// Lv2 = 50 · Lv5 = 440 · Lv10 = 1.890 · Lv20 = 7.790 · Lv30 = 17.690.
final class LevelService
{
    public static function xpForLevel(int $level): int
    {
        $n = max(0, $level - 1);

        return 20 * $n * $n + 30 * $n;
    }

    public static function levelFor(int $xp): int
    {
        $level = 1;
        while (self::xpForLevel($level + 1) <= $xp) {
            $level++;
        }

        return $level;
    }

    public static function title(int $level): string
    {
        $title = 'Tân binh';
        foreach (config('gamification.titles', []) as $min => $name) {
            if ($level >= $min) {
                $title = $name;
            }
        }

        return $title;
    }

    /** @return array{level:int, title:string, into:int, need:int, pct:int, next_total:int} */
    public static function progress(int $xp): array
    {
        $level = self::levelFor($xp);
        $base = self::xpForLevel($level);
        $next = self::xpForLevel($level + 1);
        $into = $xp - $base;
        $need = $next - $base;

        return [
            'level' => $level,
            'title' => self::title($level),
            'into' => $into,
            'need' => $need,
            'pct' => $need > 0 ? (int) floor(100 * $into / $need) : 100,
            'next_total' => $next,
        ];
    }
}
