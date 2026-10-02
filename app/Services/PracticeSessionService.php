<?php

namespace App\Services;

use App\Models\PracticeSession;
use App\Models\Puzzle;
use App\Models\User;
use App\Services\Gamification\GamificationService;
use Illuminate\Support\Str;

// Phiên "60 giây" (rush) và "3 mạng" (survival): server giữ thứ tự thế cờ (độ khó tăng dần),
// điểm, mạng và hạn giờ — client chỉ gửi nước đi của từng thế.
class PracticeSessionService
{
    public const RUSH_SECONDS = 60;
    public const RUSH_PENALTY = 5;

    public function __construct(private PuzzleService $puzzles, private GamificationService $gami) {}

    public function start(?User $u, string $mode): PracticeSession
    {
        $ids = $this->ladder($mode === 'rush' ? 3 : 4, $mode === 'rush' ? 60 : 80);

        return PracticeSession::create([
            'uuid' => (string) Str::uuid(),
            'user_id' => $u?->id,
            'mode' => $mode,
            'puzzle_ids' => $ids,
            'cursor' => 0, 'score' => 0, 'lives' => 3, 'log' => [],
            'started_at' => now(),
            'expires_at' => $mode === 'rush' ? now()->addSeconds(self::RUSH_SECONDS) : null,
        ]);
    }

    /** Thang độ khó: chia kho thành 10 bậc rating, mỗi bậc lấy ngẫu nhiên vài thế. */
    private function ladder(int $maxSolver, int $count): array
    {
        $pool = Puzzle::published()->where('solver_moves', '<=', $maxSolver)->orderBy('rating')->pluck('id')->all();
        if (! $pool) {
            return [];
        }
        $buckets = array_chunk($pool, (int) max(1, ceil(count($pool) / 10)));
        $per = (int) ceil($count / count($buckets));
        $ids = [];
        foreach ($buckets as $b) {
            shuffle($b);
            array_push($ids, ...array_slice($b, 0, $per));
        }

        return array_slice($ids, 0, $count);
    }

    public function current(PracticeSession $s): ?Puzzle
    {
        $id = $s->puzzle_ids[$s->cursor] ?? null;

        return $id ? Puzzle::with('lesson')->find($id) : null;
    }

    /** Nộp nước đi cho thế hiện tại. Trả trạng thái phiên + thế kế tiếp (nếu còn). */
    public function answer(PracticeSession $s, ?User $u, int $puzzleId, array $moves, int $ms, ?array $line = null): array
    {
        if ($s->isOver()) {
            return $this->finish($s, $u);
        }
        $p = $this->current($s);
        if (! $p || $p->id !== $puzzleId) {
            return $this->state($s, $u, null);
        }

        $res = $this->puzzles->submit($u, $p, $s->mode, $moves, $ms, false, $s->uuid, $line);
        $log = $s->log ?? [];
        $log[] = ['id' => $p->id, 'ok' => $res['ok']];
        $s->log = $log;
        $s->cursor++;
        if ($res['ok']) {
            $s->score++;
        } elseif ($s->mode === 'survival') {
            $s->lives = max(0, $s->lives - 1);
        } elseif ($s->mode === 'rush' && $s->expires_at) {
            $s->expires_at = $s->expires_at->copy()->subSeconds(self::RUSH_PENALTY);
        }
        $s->save();

        if ($s->isOver() || $s->cursor >= count($s->puzzle_ids)) {
            return $this->finish($s, $u) + ['last' => $res['verify']];
        }

        return $this->state($s, $u, $res['verify']);
    }

    public function finish(PracticeSession $s, ?User $u): array
    {
        $gami = null;
        if (! $s->finished_at) {
            $s->finished_at = now();
            $s->save();
            if ($u && $s->score > 0) {
                $col = $s->mode === 'rush' ? 'rush_best' : 'survival_best';
                if ($s->score > (int) $u->{$col}) {
                    $u->forceFill([$col => $s->score])->save();
                }
                $per = (int) config('gamification.xp.' . $s->mode . '_per');
                $cap = (int) config('gamification.xp.' . $s->mode . '_cap');
                $gami = $this->gami->record($u, $s->mode . '_run', [
                    'key' => 'run:' . $s->uuid, 'amount' => min($cap, $per * $s->score), 'puzzles' => $s->score,
                ]);
            }
        }

        return [
            'over' => true,
            'score' => $s->score,
            'best' => $u ? (int) ($s->mode === 'rush' ? $u->rush_best : $u->survival_best) : null,
            'log' => $s->log ?? [],
            'gamification' => $gami,
        ];
    }

    public function state(PracticeSession $s, ?User $u, ?array $last): array
    {
        $p = $this->current($s);

        return [
            'over' => false,
            'score' => $s->score,
            'lives' => $s->lives,
            'remaining_ms' => $s->expires_at ? max(0, now()->diffInMilliseconds($s->expires_at, false)) : null,
            'puzzle' => $p?->toBoardPayload(),
            'index' => $s->cursor,
            'last' => $last,
        ];
    }
}
