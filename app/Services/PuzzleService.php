<?php

namespace App\Services;

use App\Models\Puzzle;
use App\Models\PuzzleAttempt;
use App\Models\User;
use App\Models\UserPuzzleReview;
use App\Services\Gamification\GamificationService;
use App\Support\Vn;
use App\Support\Xiangqi\Rules;
use Illuminate\Support\Collection;

// Thẩm định lời giải (server-side), ghi lượt thử, cập nhật rating Elo, hàng đợi ôn lỗi sai, XP.
class PuzzleService
{
    public const MODES = ['daily', 'rush', 'survival', 'topic', 'review', 'lesson', 'placement'];

    public function __construct(private GamificationService $gami) {}

    /**
     * So các nước người giải (chỉ nước của bên giải, theo thứ tự) với lời giải.
     * Ở nước CUỐI, chấp nhận mọi nước khác cũng chiếu hết.
     * @param list<string> $moves
     * @return array{ok:bool, wrong_ply:?int, user_move:?string, expected:?string}
     */
    public function verify(Puzzle $p, array $moves): array
    {
        $sol = array_values($p->solution ?? []);
        $board = Rules::loadFen($p->fen);
        $k = 0;
        $last = count($sol) - 1;

        foreach ($sol as $ply => $expected) {
            $solverTurn = $ply % 2 === 0;   // lời giải luôn bắt đầu bằng nước của bên giải
            if ($solverTurn) {
                $mv = $moves[$k++] ?? null;
                if ($mv === null) {
                    return ['ok' => false, 'wrong_ply' => $ply, 'user_move' => null, 'expected' => $expected];
                }
                if ($mv !== $expected) {
                    $isFinal = $ply === $last;
                    if ($isFinal && $this->isAltMate($board, $mv, $p->side === 'do')) {
                        return ['ok' => true, 'wrong_ply' => null, 'user_move' => null, 'expected' => null];
                    }

                    return ['ok' => false, 'wrong_ply' => $ply, 'user_move' => substr($mv, 0, 8), 'expected' => $expected];
                }
            }
            $sq = Rules::iccs($expected);
            if (! $sq) {
                return ['ok' => false, 'wrong_ply' => $ply, 'user_move' => null, 'expected' => $expected];
            }
            $board = Rules::apply($board, $sq[0], $sq[1]);
        }

        return ['ok' => true, 'wrong_ply' => null, 'user_move' => null, 'expected' => null];
    }

    private function isAltMate(array $board, string $mv, bool $solverRed): bool
    {
        $sq = Rules::iccs($mv);
        if (! $sq || ! isset($board[$sq[0]]) || Rules::isRed($board[$sq[0]]) !== $solverRed) {
            return false;
        }
        if (! Rules::legalNoSelfCheck($board, $sq[0], $sq[1])) {
            return false;
        }

        return Rules::isMated(Rules::apply($board, $sq[0], $sq[1]), ! $solverRed);
    }

    /**
     * Ghi kết quả 1 lượt giải. Khách (user null) chỉ được thẩm định, không lưu.
     * @return array{ok:bool, verify:array, gamification:?array, rating:?array}
     */
    public function submit(?User $user, Puzzle $p, string $mode, array $moves, int $ms, bool $revealed, ?string $sessionId = null): array
    {
        $v = $this->verify($p, $moves);
        $ok = $v['ok'] && ! $revealed;
        if (! $user) {
            return ['ok' => $ok, 'verify' => $v, 'gamification' => null, 'rating' => null];
        }

        $firstAttempt = ! PuzzleAttempt::where('user_id', $user->id)->where('puzzle_id', $p->id)->exists();
        $everSolved = ! $firstAttempt && PuzzleAttempt::where('user_id', $user->id)->where('puzzle_id', $p->id)->where('result', 'solved')->exists();
        $ratingBefore = (int) $user->puzzle_rating;
        $rating = null;

        if ($firstAttempt && in_array($mode, ['topic', 'daily', 'lesson', 'rush', 'survival', 'placement'], true)) {
            $rating = $this->updateRatings($user, $p, $ok);
        }

        PuzzleAttempt::create([
            'user_id' => $user->id, 'puzzle_id' => $p->id, 'mode' => $mode, 'session_id' => $sessionId,
            'result' => $revealed ? 'revealed' : ($ok ? 'solved' : 'failed'),
            'wrong_ply' => $v['wrong_ply'], 'user_move' => $v['user_move'], 'expected_move' => $v['expected'],
            'ms' => max(0, min($ms, 3600000)),
            'rating_before' => $ratingBefore, 'rating_after' => $rating['user'] ?? $ratingBefore,
        ]);
        $p->increment('attempts_count');
        if ($ok) {
            $p->increment('solved_count');
        }

        $this->updateReview($user, $p, $ok, $mode);

        $gami = null;
        // Giải quá nhanh so với số nước (bấm theo đáp án lộ trong JSON) → không cộng XP.
        $tooFast = $ms < 700 * max(1, (int) $p->solver_moves);
        if ($ok && ! $tooFast && ! in_array($mode, ['rush', 'survival'], true)) {
            $today = Vn::today();
            if ($mode === 'daily' && app(DailyPuzzleService::class)->forDate($today)?->id === $p->id) {
                $gami = $this->gami->record($user, 'daily_puzzle', ['key' => 'daily:' . $today, 'subject' => $p, 'puzzles' => 1]);
            } elseif ($mode === 'review') {
                $gami = $this->gami->record($user, 'review_solve', ['key' => 'review:' . $p->id . ':' . $today, 'subject' => $p, 'puzzles' => 1]);
            } elseif (! $everSolved) {
                $amount = (int) config('gamification.xp.puzzle_base') + (int) min(15, max(0, ($p->rating - 900) / 60));
                $gami = $this->gami->record($user, 'puzzle_solve', ['key' => 'puzzle:' . $p->id . ':first', 'subject' => $p, 'amount' => $amount, 'puzzles' => 1]);
            } else {
                $gami = $this->gami->record($user, 'puzzle_repeat', ['key' => 'puzzle:' . $p->id . ':' . $today, 'subject' => $p, 'puzzles' => 1]);
            }
        }

        return ['ok' => $ok, 'verify' => $v, 'gamification' => $gami, 'rating' => $rating];
    }

    /** Elo đơn giản: K người 40 (≤30 ván đầu) rồi 20; K thế cờ 8. */
    public function updateRatings(User $u, Puzzle $p, bool $solved): array
    {
        $ur = (int) $u->puzzle_rating;
        $pr = (int) $p->rating;
        $exp = 1 / (1 + 10 ** (($pr - $ur) / 400));
        $s = $solved ? 1 : 0;
        $ku = $u->puzzle_games < 30 ? 40 : 20;
        $newU = (int) max(400, min(3000, round($ur + $ku * ($s - $exp))));
        $newP = (int) max(400, min(3000, round($pr - 8 * ($s - $exp))));

        $u->forceFill(['puzzle_rating' => $newU, 'puzzle_games' => $u->puzzle_games + 1])->save();
        $p->forceFill(['rating' => $newP])->save();

        return ['user' => $newU, 'delta' => $newU - $ur];
    }

    /** Leitner: sai → về hộp 0 (ôn ngày mai); đúng trong chế độ ôn → lên hộp, giãn lịch. */
    private function updateReview(User $u, Puzzle $p, bool $ok, string $mode): void
    {
        $row = UserPuzzleReview::where('user_id', $u->id)->where('puzzle_id', $p->id)->first();
        if (! $ok) {
            UserPuzzleReview::updateOrCreate(
                ['user_id' => $u->id, 'puzzle_id' => $p->id],
                ['box' => 0, 'due_at' => Vn::daysAgo(-1), 'lapses' => ($row->lapses ?? 0) + 1, 'last_result' => 'failed'],
            );

            return;
        }
        if ($row && $mode === 'review') {
            $box = min(4, $row->box + 1);
            if ($row->box >= 1 && $row->last_result === 'solved') {
                $row->delete();   // đúng 2 lần liên tiếp khi ôn → rời hàng đợi

                return;
            }
            $row->update(['box' => $box, 'due_at' => Vn::daysAgo(-UserPuzzleReview::INTERVALS[$box]), 'last_result' => 'solved']);
        }
    }

    public function dueReviews(User $u, int $limit = 10): Collection
    {
        return UserPuzzleReview::with('puzzle')->where('user_id', $u->id)
            ->where('due_at', '<=', Vn::today())->orderBy('due_at')->limit($limit)->get()
            ->pluck('puzzle')->filter();
    }

    public function dueCount(User $u): int
    {
        return UserPuzzleReview::where('user_id', $u->id)->where('due_at', '<=', Vn::today())->count();
    }

    /**
     * Chọn thế cờ kế tiếp quanh mức rating mục tiêu, ưu tiên thế chưa thử.
     * @param list<int> $exclude
     */
    public function pick(?User $u, ?string $skill = null, array $exclude = [], ?int $target = null, ?int $maxSolver = null): ?Puzzle
    {
        $target ??= $u ? (int) $u->puzzle_rating : 1100;
        $tried = $u ? PuzzleAttempt::where('user_id', $u->id)->where('created_at', '>=', now()->subDays(30))->pluck('puzzle_id')->all() : [];

        foreach ([150, 300, 600, 3000] as $window) {
            $q = Puzzle::published()->whereBetween('rating', [$target - $window, $target + $window]);
            if ($skill) $q->skill($skill);
            if ($maxSolver) $q->where('solver_moves', '<=', $maxSolver);
            if ($exclude) $q->whereNotIn('id', $exclude);
            $fresh = (clone $q)->whereNotIn('id', $tried ?: [0])->inRandomOrder()->first();
            if ($fresh) return $fresh;
            if ($window >= 600) {
                $any = $q->inRandomOrder()->first();
                if ($any) return $any;
            }
        }

        return null;
    }

    /** Thống kê "bạn hay sai ở đâu" theo chủ đề (≥ 3 lượt thử mới tính). */
    public function weakSkills(User $u, int $limit = 3): array
    {
        $rows = PuzzleAttempt::query()->join('puzzles', 'puzzles.id', '=', 'puzzle_attempts.puzzle_id')
            ->where('puzzle_attempts.user_id', $u->id)
            ->where('puzzle_attempts.created_at', '>=', now()->subDays(60))
            ->get(['puzzles.skill_tags', 'puzzle_attempts.result']);
        $stat = [];
        foreach ($rows as $r) {
            foreach ((array) json_decode($r->skill_tags ?: '[]', true) as $tag) {
                $stat[$tag]['n'] = ($stat[$tag]['n'] ?? 0) + 1;
                $stat[$tag]['ok'] = ($stat[$tag]['ok'] ?? 0) + ($r->result === 'solved' ? 1 : 0);
            }
        }
        $skills = config('puzzle-skills.skills');
        $out = [];
        foreach ($stat as $tag => $s) {
            if ($s['n'] < 3 || ! isset($skills[$tag])) continue;
            $out[] = ['skill' => $tag, 'name' => $skills[$tag]['name'], 'accuracy' => (int) round(100 * $s['ok'] / $s['n']), 'n' => $s['n']];
        }
        usort($out, fn ($a, $b) => $a['accuracy'] <=> $b['accuracy']);

        return array_slice($out, 0, $limit);
    }
}
