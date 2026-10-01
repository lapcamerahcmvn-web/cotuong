<?php

namespace App\Services\Gamification;

use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\PuzzleAttempt;
use App\Models\User;
use App\Models\UserAchievement;
use App\Models\XpTransaction;

// Kiểm tra & mở huy hiệu theo định nghĩa trong config/achievements.php.
class AchievementService
{
    /** Loại huy hiệu cần kiểm tra lại sau mỗi lý do cộng XP (tránh query thừa). */
    private const BY_REASON = [
        'lesson_complete' => ['lessons', 'series', 'phase', 'level', 'streak'],
        'puzzle_solve'    => ['puzzles', 'level', 'streak'],
        'puzzle_repeat'   => ['puzzles', 'level', 'streak'],
        'review_solve'    => ['puzzles', 'level', 'streak'],
        'daily_puzzle'    => ['daily', 'puzzles', 'level', 'streak'],
        'rush_run'        => ['rush', 'level', 'streak'],
        'survival_run'    => ['survival', 'level', 'streak'],
        'bot_win'         => ['bot', 'level', 'streak'],
        'pvp_win'         => ['pvp', 'pvp_games', 'level', 'streak'],
        'pvp_draw'        => ['pvp_games', 'level', 'streak'],
        'pvp_play'        => ['pvp_games', 'level', 'streak'],
    ];

    /** @return list<array{key:string,name:string,desc:string,icon:string}> huy hiệu mới mở */
    public function evaluate(User $u, string $reason): array
    {
        $types = self::BY_REASON[$reason] ?? ['level', 'streak'];
        $have = UserAchievement::where('user_id', $u->id)->pluck('key')->all();
        $metrics = [];
        $new = [];

        foreach (config('achievements', []) as $key => $def) {
            if (in_array($key, $have, true) || ! in_array($def['type'], $types, true)) {
                continue;
            }
            if ($this->met($u, $def, $metrics)) {
                UserAchievement::firstOrCreate(['user_id' => $u->id, 'key' => $key], ['unlocked_at' => now()]);
                $new[] = ['key' => $key] + $def;
            }
        }

        return $new;
    }

    private function met(User $u, array $def, array &$m): bool
    {
        $v = $def['value'];

        return match ($def['type']) {
            'lessons'  => ($m['lessons'] ??= LessonProgress::where('user_id', $u->id)->where('status', 'completed')->count()) >= $v,
            'puzzles'  => ($m['puzzles'] ??= PuzzleAttempt::where('user_id', $u->id)->where('result', 'solved')->distinct()->count('puzzle_id')) >= $v,
            'streak'   => max((int) $u->streak_best, (int) $u->streak_current) >= $v,
            'level'    => (int) $u->level >= $v,
            'rush'     => (int) $u->rush_best >= $v,
            'survival' => (int) $u->survival_best >= $v,
            'daily'    => ($m['daily'] ??= XpTransaction::where('user_id', $u->id)->where('reason', 'daily_puzzle')->count()) >= $v,
            'bot'      => XpTransaction::where('user_id', $u->id)->where('reason', 'bot_win')
                ->where(fn ($q) => collect(range((int) $v, 4))->each(fn ($l) => $q->orWhere('idem_key', 'like', 'bot:L'.$l.':%')))->exists(),
            'pvp'      => ($m['pvp'] ??= XpTransaction::where('user_id', $u->id)->where('reason', 'pvp_win')->count()) >= $v,
            'pvp_games' => ($m['pvpg'] ??= XpTransaction::where('user_id', $u->id)->whereIn('reason', ['pvp_win', 'pvp_draw', 'pvp_play'])->count()) >= $v,
            'series'   => $this->seriesDone($u, (string) $v),
            'phase'    => $this->phaseDone($u, (string) $v),
            default    => false,
        };
    }

    public function seriesDone(User $u, string $slug): bool
    {
        $ids = Lesson::published()->whereHas('series', fn ($q) => $q->where('slug', $slug))->pluck('id');

        return $ids->isNotEmpty() && $this->allDone($u, $ids->all());
    }

    public function phaseDone(User $u, string $phase): bool
    {
        $q = Lesson::published();
        $phase === 'co-up' ? $q->where('game_mode', 'co-up') : $q->where('phase', $phase)->where('game_mode', 'co-tuong');
        $ids = $q->pluck('id');

        return $ids->isNotEmpty() && $this->allDone($u, $ids->all());
    }

    private function allDone(User $u, array $ids): bool
    {
        return LessonProgress::where('user_id', $u->id)->where('status', 'completed')
            ->whereIn('lesson_id', $ids)->count() >= count($ids);
    }

    /** Toàn bộ huy hiệu kèm trạng thái — cho trang hồ sơ. */
    public function board(User $u): array
    {
        $have = UserAchievement::where('user_id', $u->id)->pluck('unlocked_at', 'key');
        $out = [];
        foreach (config('achievements', []) as $key => $def) {
            $out[] = ['key' => $key, 'unlocked_at' => $have[$key] ?? null] + $def;
        }
        usort($out, fn ($a, $b) => ($b['unlocked_at'] ? 1 : 0) <=> ($a['unlocked_at'] ? 1 : 0));

        return $out;
    }
}
