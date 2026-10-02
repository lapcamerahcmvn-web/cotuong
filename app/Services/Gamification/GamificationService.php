<?php

namespace App\Services\Gamification;

use App\Models\Lesson;
use App\Models\User;
use App\Models\UserDailyActivity;
use App\Models\XpTransaction;
use App\Support\Vn;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;

/**
 * Điểm vào DUY NHẤT để cộng XP. Mỗi lần cộng ghi 1 dòng sổ cái (xp_transactions) với idem_key
 * unique theo user → gọi lặp không cộng trùng. Cập nhật luôn hoạt động ngày, chuỗi ngày, cấp độ,
 * thưởng mốc chuỗi / mục tiêu ngày và huy hiệu. Trả về khối `gamification` cho frontend.
 */
class GamificationService
{
    /** Lý do tính vào trần XP thế cờ mỗi ngày. */
    private const PUZZLE_REASONS = ['puzzle_solve', 'puzzle_repeat', 'review_solve', 'rush_run', 'survival_run', 'mistake_fix'];

    public function __construct(
        private StreakService $streaks,
        private AchievementService $achievements,
    ) {}

    /**
     * @param array{amount?:int, key?:string, subject?:\Illuminate\Database\Eloquent\Model|null, lessons?:int, puzzles?:int} $opt
     */
    public function record(User $user, string $reason, array $opt = []): array
    {
        $today = Vn::today();
        $amount = (int) ($opt['amount'] ?? $this->defaultAmount($reason));
        $key = $opt['key'] ?? ($reason . ':' . ($opt['subject']?->getKey() ?? '') . ':' . $today);

        return DB::transaction(function () use ($user, $reason, $amount, $key, $opt, $today) {
            /** @var User $u */
            $u = User::whereKey($user->id)->lockForUpdate()->first();
            $levelBefore = (int) $u->level;
            $todayBefore = (int) (UserDailyActivity::where('user_id', $u->id)->where('date', $today)->value('xp') ?? 0);

            $amount = $this->applyCaps($u, $reason, $amount, $today);
            $gained = $this->ledger($u, $amount, $reason, $key, $opt['subject'] ?? null, $today);
            if ($gained === null) {
                return $this->result($u, 0, false, $todayBefore, [], false);   // đã cộng trước đó
            }

            $this->bumpDay($u, $today, $gained, (int) ($opt['lessons'] ?? 0), (int) ($opt['puzzles'] ?? 0));
            $streak = $this->streaks->touch($u, $today);
            $total = $gained;

            if ($streak['increased']) {
                $bonus = config('gamification.xp.streak_milestones.' . $streak['streak']);
                if ($bonus) {
                    $total += (int) $this->ledger($u, (int) $bonus, 'streak_milestone', 'streak:' . $streak['streak'] . ':' . $today, null, $today);
                }
            }

            $goal = (int) ($u->daily_goal_xp ?: 50);
            $goalReached = false;
            if ($todayBefore < $goal && $todayBefore + $total >= $goal) {
                $b = $this->ledger($u, (int) config('gamification.xp.goal_reached'), 'goal_reached', 'goal:' . $today, null, $today);
                if ($b) {
                    $total += $b;
                    $goalReached = true;
                }
            }
            if ($total !== $gained) {
                $this->bumpDay($u, $today, $total - $gained, 0, 0);
            }

            $u->xp_total = (int) $u->xp_total + $total;
            $u->level = LevelService::levelFor((int) $u->xp_total);
            $u->save();

            $new = $this->achievements->evaluate($u, $reason);
            $user->setRawAttributes($u->getAttributes(), true);

            return $this->result($u, $total, $u->level > $levelBefore, $todayBefore + $total, $new, $goalReached, $streak['increased']);
        });
    }

    /**
     * XP thưởng (thử thách tuần, giải xếp hạng): vào sổ cái + tổng XP/cấp độ nhưng KHÔNG vào hoạt động ngày →
     * không tính vào bảng xếp hạng tuần/tháng, mục tiêu ngày hay chuỗi ngày. Idempotent theo $key.
     */
    public function grant(User $user, string $reason, string $key, int $amount, int $freezes = 0): array
    {
        $today = Vn::today();

        return DB::transaction(function () use ($user, $reason, $key, $amount, $freezes, $today) {
            /** @var User $u */
            $u = User::whereKey($user->id)->lockForUpdate()->first();
            $levelBefore = (int) $u->level;
            $todayXp = (int) (UserDailyActivity::where('user_id', $u->id)->where('date', $today)->value('xp') ?? 0);
            $gained = $this->ledger($u, $amount, $reason, $key, null, $today);
            if ($gained === null) {
                return $this->result($u, 0, false, $todayXp, [], false);
            }
            $u->xp_total = (int) $u->xp_total + $gained;
            $u->level = LevelService::levelFor((int) $u->xp_total);
            if ($freezes > 0) {
                $u->streak_freezes = min((int) config('gamification.freeze_max'), (int) $u->streak_freezes + $freezes);
            }
            $u->save();
            $new = $this->achievements->evaluate($u, $reason);
            $user->setRawAttributes($u->getAttributes(), true);

            return $this->result($u, $gained, $u->level > $levelBefore, $todayXp, $new, false);
        });
    }

    /** Hoàn thành bài học: XP bài + thưởng hoàn thành chương trình / giai đoạn (mỗi thứ 1 lần). */
    public function lessonCompleted(User $user, Lesson $lesson): array
    {
        $res = $this->record($user, 'lesson_complete', ['key' => 'lesson:' . $lesson->id, 'subject' => $lesson, 'lessons' => 1]);
        $extra = [];

        if ($lesson->series_id && $lesson->series && $this->achievements->seriesDone($user, $lesson->series->slug)) {
            $extra[] = $this->record($user, 'series_complete', ['key' => 'series:' . $lesson->series_id, 'subject' => $lesson->series]);
        }
        $phase = $lesson->game_mode === 'co-up' ? 'co-up' : $lesson->phase;
        if ($phase && $this->achievements->phaseDone($user, $phase)) {
            $extra[] = $this->record($user, 'phase_complete', ['key' => 'phase:' . $phase]);
        }

        return $this->merge($res, $extra);
    }

    /** Trạng thái gọn cho header / dashboard. */
    public function snapshot(User $u): array
    {
        $today = (int) (UserDailyActivity::where('user_id', $u->id)->where('date', Vn::today())->value('xp') ?? 0);

        return [
            'xp' => (int) $u->xp_total,
            'level' => LevelService::progress((int) $u->xp_total),
            'streak' => $this->streaks->current($u),
            'streak_today' => $this->streaks->activeToday($u),
            'freezes' => (int) $u->streak_freezes,
            'goal' => ['xp' => $today, 'target' => (int) ($u->daily_goal_xp ?: 50)],
        ];
    }

    public function defaultAmount(string $reason): int
    {
        $xp = config('gamification.xp');

        return (int) match ($reason) {
            'lesson_complete' => $xp['lesson_complete'],
            'puzzle_repeat'   => $xp['puzzle_repeat'],
            'review_solve'    => $xp['review_solve'],
            'daily_puzzle'    => $xp['daily_puzzle'],
            'series_complete' => $xp['series_complete'],
            'phase_complete'  => $xp['phase_complete'],
            'goal_reached'    => $xp['goal_reached'],
            default           => $xp['puzzle_base'],
        };
    }

    private function applyCaps(User $u, string $reason, int $amount, string $today): int
    {
        if ($reason === 'lesson_complete') {
            $n = XpTransaction::where('user_id', $u->id)->where('local_date', $today)->where('reason', 'lesson_complete')->where('amount', '>', 0)->count();

            return $n >= (int) config('gamification.caps.lessons_xp_daily') ? 0 : $amount;
        }
        if (in_array($reason, self::PUZZLE_REASONS, true)) {
            $used = (int) XpTransaction::where('user_id', $u->id)->where('local_date', $today)->whereIn('reason', self::PUZZLE_REASONS)->sum('amount');

            return max(0, min($amount, (int) config('gamification.caps.puzzle_xp_daily') - $used));
        }

        return $amount;
    }

    /** Ghi sổ cái. Trả null nếu idem_key đã tồn tại (đã cộng). */
    private function ledger(User $u, int $amount, string $reason, string $key, $subject, string $today): ?int
    {
        if (XpTransaction::where('user_id', $u->id)->where('idem_key', $key)->exists()) {
            return null;
        }
        try {
            XpTransaction::create([
                'user_id' => $u->id, 'amount' => $amount, 'reason' => $reason,
                'subject_type' => $subject ? class_basename($subject) : null,
                'subject_id' => $subject?->getKey(),
                'idem_key' => mb_substr($key, 0, 120), 'local_date' => $today,
            ]);
        } catch (QueryException) {
            return null;   // đua request song song — dòng kia đã thắng
        }

        return $amount;
    }

    private function bumpDay(User $u, string $today, int $xp, int $lessons, int $puzzles): void
    {
        $row = UserDailyActivity::firstOrCreate(['user_id' => $u->id, 'date' => $today], ['xp' => 0, 'lessons' => 0, 'puzzles' => 0]);
        $row->xp += $xp;
        $row->lessons += $lessons;
        $row->puzzles += $puzzles;
        $row->save();
    }

    private function result(User $u, int $xp, bool $levelUp, int $todayXp, array $new, bool $goalReached, bool $streakUp = false): array
    {
        return [
            'xp' => $xp,
            'total' => (int) $u->xp_total,
            'level' => LevelService::progress((int) $u->xp_total),
            'leveledUp' => $levelUp,
            'streak' => $this->streaks->current($u),
            'streakUp' => $streakUp,
            'goal' => ['xp' => $todayXp, 'target' => (int) ($u->daily_goal_xp ?: 50)],
            'goalReached' => $goalReached,
            'achievements' => array_map(fn ($a) => ['key' => $a['key'], 'name' => $a['name'], 'desc' => $a['desc'], 'icon' => $a['icon']], $new),
        ];
    }

    private function merge(array $base, array $extra): array
    {
        foreach ($extra as $e) {
            $base['xp'] += $e['xp'];
            $base['total'] = $e['total'];
            $base['level'] = $e['level'];
            $base['leveledUp'] = $base['leveledUp'] || $e['leveledUp'];
            $base['goal'] = $e['goal'];
            $base['goalReached'] = $base['goalReached'] || $e['goalReached'];
            $base['achievements'] = array_merge($base['achievements'], $e['achievements']);
        }

        return $base;
    }
}
