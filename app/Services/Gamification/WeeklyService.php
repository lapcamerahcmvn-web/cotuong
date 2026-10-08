<?php

namespace App\Services\Gamification;

use App\Models\Game;
use App\Models\GameRecord;
use App\Models\PracticeSession;
use App\Models\User;
use App\Models\UserDailyActivity;
use App\Models\WeeklyAward;
use App\Models\XpTransaction;
use App\Support\Vn;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

/**
 * Thử thách tuần + giải thưởng bảng xếp hạng XP tuần (config/weekly.php).
 * - Nhiệm vụ: chọn cố định theo tuần, tiến độ suy từ dữ liệu có sẵn (hoạt động ngày, sổ XP, lịch sử ván,
 *   lượt luyện) → không phải ghi thêm gì khi người dùng học/chơi. Nhận thưởng = 1 dòng sổ cái idempotent.
 * - Giải tuần: hosting không có cron → chốt "lười" lần đầu có người truy cập sau khi tuần kết thúc
 *   (unique week+user + idem_key XP nên chốt lặp/đua song song cũng không trao trùng).
 */
class WeeklyService
{
    public function __construct(private GamificationService $gami) {}

    /** Ngày thứ 2 của tuần hiện tại (hoặc lùi $back tuần), dạng Y-m-d giờ VN. */
    public function week(int $back = 0): string
    {
        return CarbonImmutable::parse(Vn::weekStart())->subWeeks($back)->toDateString();
    }

    public function weekEnd(string $week): string
    {
        return CarbonImmutable::parse($week)->addDays(6)->toDateString();
    }

    /** Số giây tới hết tuần (0h thứ 2 tới, giờ VN). */
    public function secondsLeft(): int
    {
        $now = Vn::now();

        return (int) $now->diffInSeconds($now->startOfWeek(CarbonImmutable::MONDAY)->addWeek(), true);
    }

    /** @return array<string, array{key:string, group:string, title:string, desc:string, metric:string, target:int, xp:int, icon:string}> */
    public function quests(?string $week = null): array
    {
        $week ??= $this->week();
        $pool = array_map(fn ($items) => array_filter($items, fn ($q) => ($q['since'] ?? '0000') <= $week), config('weekly.quests'));
        $seed = crc32('weekly:' . $week);
        $picked = [];
        $metrics = [];
        foreach (array_keys($pool) as $i => $group) {
            $keys = array_keys($pool[$group]);
            $k = $keys[($seed >> ($i * 4)) % count($keys)];
            $picked[$k] = $group;
            $metrics[] = $pool[$group][$k]['metric'];
        }
        // Nhiệm vụ thêm: lấy từ cả kho, khác các chỉ số đã chọn.
        $rest = [];
        foreach ($pool as $group => $items) {
            foreach ($items as $k => $q) {
                if (! isset($picked[$k]) && ! in_array($q['metric'], $metrics, true)) $rest[$k] = $group;
            }
        }
        $extra = (int) config('weekly.per_week', 4) - count($picked);
        $restKeys = array_keys($rest);
        for ($j = 0; $j < $extra && $restKeys; $j++) {
            $k = $restKeys[($seed >> (16 + $j * 3)) % count($restKeys)];
            $picked[$k] = $rest[$k];
            $restKeys = array_values(array_filter($restKeys, fn ($x) => $x !== $k && $pool[$rest[$x]][$x]['metric'] !== $pool[$rest[$k]][$k]['metric']));
        }
        $out = [];
        foreach ($picked as $k => $group) {
            $out[$k] = ['key' => $k, 'group' => $group] + $pool[$group][$k];
        }

        return $out;
    }

    /** Giá trị 1 chỉ số của người dùng trong tuần. */
    public function metric(User $u, string $metric, string $week): int
    {
        $from = $week;
        $to = $this->weekEnd($week);
        $tz = config('gamification.timezone', 'Asia/Ho_Chi_Minh');
        $utcFrom = CarbonImmutable::parse($from, $tz)->startOfDay()->utc();
        $utcTo = CarbonImmutable::parse($to, $tz)->endOfDay()->utc();
        $days = fn () => UserDailyActivity::where('user_id', $u->id)->whereBetween('date', [$from, $to]);
        $games = fn () => GameRecord::where('user_id', $u->id)->whereBetween('created_at', [$utcFrom, $utcTo])
            ->where('plies', '>=', (int) config('weekly.min_plies', 10));
        $botWins = fn () => $games()->where('mode', 'bot')->where('result', 'win')->where('first_side', 'do')
            ->whereIn('start_fen', [Game::START_FEN, Game::COUP_FEN]);

        return (int) match ($metric) {
            'lessons' => $days()->sum('lessons'),
            'days' => $days()->where('xp', '>', 0)->count(),
            'xp' => $days()->sum('xp'),
            'puzzles' => $days()->sum('puzzles'),
            'daily' => XpTransaction::where('user_id', $u->id)->where('reason', 'daily_puzzle')->whereBetween('local_date', [$from, $to])->count(),
            'mistakes' => XpTransaction::where('user_id', $u->id)->where('reason', 'mistake_fix')->whereBetween('local_date', [$from, $to])->count(),
            'rush', 'survival' => PracticeSession::where('user_id', $u->id)->where('mode', $metric)
                ->whereBetween('finished_at', [$utcFrom, $utcTo])->max('score') ?? 0,
            'bot_win' => $botWins()->count(),
            'bot_win_l3' => $botWins()->where('level', '>=', 3)->count(),
            'pvp' => $games()->where('mode', 'pvp')->count(),
            'coup' => $games()->where('variant', 'co-up')->count(),
            'games' => $games()->count(),
            'review' => GameRecord::where('user_id', $u->id)->whereNotNull('analysis')->whereBetween('updated_at', [$utcFrom, $utcTo])->count(),
            default => 0,
        };
    }

    /**
     * Tiến độ tuần của 1 người: nhiệm vụ (progress/done/claimed) + rương.
     * @return array{week:string, quests:list<array>, chest:array{xp:int, ready:bool, claimed:bool}, done:int, total:int, seconds_left:int}
     */
    public function progress(User $u, ?string $week = null): array
    {
        $week ??= $this->week();
        $claimed = XpTransaction::where('user_id', $u->id)->where('idem_key', 'like', 'weekly:' . $week . ':%')->pluck('idem_key')->all();
        $list = [];
        $cache = [];
        foreach ($this->quests($week) as $k => $q) {
            $val = $cache[$q['metric']] ??= $this->metric($u, $q['metric'], $week);
            $list[] = $q + [
                'value' => min($val, $q['target']),
                'pct' => (int) min(100, round(100 * $val / max(1, $q['target']))),
                'done' => $val >= $q['target'],
                'claimed' => in_array('weekly:' . $week . ':' . $k, $claimed, true),
            ];
        }
        $done = count(array_filter($list, fn ($q) => $q['claimed']));

        return [
            'week' => $week,
            'quests' => $list,
            'done' => $done,
            'total' => count($list),
            'chest' => [
                'xp' => (int) config('weekly.chest.xp'),
                'freezes' => (int) config('weekly.chest.freezes'),
                'ready' => $done === count($list),
                'claimed' => in_array('weekly:' . $week . ':chest', $claimed, true),
            ],
            'seconds_left' => $this->secondsLeft(),
        ];
    }

    /** Nhận thưởng 1 nhiệm vụ của tuần hiện tại. null nếu chưa đạt / không có nhiệm vụ này. */
    public function claim(User $u, string $key): ?array
    {
        $week = $this->week();
        $q = $this->quests($week)[$key] ?? null;
        if (! $q || $this->metric($u, $q['metric'], $week) < $q['target']) {
            return null;
        }

        return $this->gami->grant($u, 'weekly_quest', 'weekly:' . $week . ':' . $key, (int) $q['xp']);
    }

    /** Mở rương khi đã nhận đủ mọi nhiệm vụ của tuần. */
    public function claimChest(User $u): ?array
    {
        $p = $this->progress($u);
        if (! $p['chest']['ready']) {
            return null;
        }

        return $this->gami->grant($u, 'weekly_chest', 'weekly:' . $p['week'] . ':chest', $p['chest']['xp'], $p['chest']['freezes']);
    }

    /** Bảng XP của 1 tuần đã qua (loại người ẩn khỏi xếp hạng). @return list<object{user_id:int, score:int}> */
    private function standings(string $week, int $limit): array
    {
        return UserDailyActivity::query()
            ->join('users', 'users.id', '=', 'user_daily_activity.user_id')
            ->where('users.leaderboard_opt_out', false)
            ->whereBetween('user_daily_activity.date', [$week, $this->weekEnd($week)])
            ->groupBy('user_daily_activity.user_id')
            ->selectRaw('user_daily_activity.user_id as user_id, SUM(user_daily_activity.xp) as score')
            ->havingRaw('SUM(user_daily_activity.xp) >= ?', [(int) config('weekly.prize_min_xp', 100)])
            ->orderByDesc('score')->orderBy('user_daily_activity.user_id')
            ->limit($limit)->get()->all();
    }

    /** Chốt giải tuần đã qua (gọi thoải mái — chỉ chạy thật 1 lần mỗi tuần). */
    public function ensureFinalized(): void
    {
        $week = $this->week(1);
        if (Cache::get('weekly-final:' . $week)) {
            return;
        }
        $this->finalize($week);
        Cache::forever('weekly-final:' . $week, true);
    }

    public function finalize(string $week): int
    {
        $n = 0;
        foreach ($this->standings($week, 10) as $i => $row) {
            $rank = $i + 1;
            $prize = config('weekly.prizes')[$rank] ?? config('weekly.prizes')[10];
            $award = DB::transaction(function () use ($week, $row, $rank, $prize) {
                $exists = WeeklyAward::where('week_start', $week)->where('user_id', $row->user_id)->exists();

                return $exists ? null : WeeklyAward::create([
                    'week_start' => $week, 'user_id' => $row->user_id, 'rank' => $rank,
                    'score' => (int) $row->score, 'xp' => (int) $prize['xp'],
                ]);
            });
            if ($award && ($u = User::find($row->user_id))) {
                $this->gami->grant($u, 'weekly_prize', 'weekly-prize:' . $week, (int) $prize['xp'], (int) $prize['freezes']);
                $n++;
            }
        }

        return $n;
    }

    /** Giải tuần mới nhất người dùng chưa xem (hiện bảng chúc mừng 1 lần). */
    public function unseen(User $u): ?WeeklyAward
    {
        return WeeklyAward::where('user_id', $u->id)->whereNull('seen_at')->latest('week_start')->first();
    }

    /** Top 3 tuần trước — "Vô địch tuần trước" trên bảng xếp hạng. */
    public function podium(): array
    {
        $week = $this->week(1);

        return Cache::remember('weekly-podium3:' . $week, 600, fn () => WeeklyAward::with('user:id,name,avatar,avatar_frame,shop_title,level')
            ->where('week_start', $week)->where('rank', '<=', 3)->orderBy('rank')->get()
            ->map(fn ($a) => ['user_id' => $a->user_id, 'rank' => $a->rank, 'score' => $a->score, 'name' => $a->user?->name, 'avatar' => $a->user?->avatar, 'level' => $a->user?->level,
                'frame' => $a->user?->avatar_frame, 'title' => \App\Services\ShopService::titleText($a->user?->shop_title)])
            ->all());
    }

    /** Tủ cúp của 1 người: số lần đạt từng loại huy chương + 5 giải gần nhất. */
    public function trophies(User $u): array
    {
        $all = WeeklyAward::where('user_id', $u->id)->orderByDesc('week_start')->get();

        return [
            'gold' => $all->where('rank', 1)->count(),
            'silver' => $all->where('rank', 2)->count(),
            'bronze' => $all->where('rank', 3)->count(),
            'top10' => $all->where('rank', '>', 3)->count(),
            'chests' => XpTransaction::where('user_id', $u->id)->where('reason', 'weekly_chest')->count(),
            'recent' => $all->take(5)->all(),
        ];
    }
}
