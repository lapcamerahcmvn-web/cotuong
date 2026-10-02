<?php

namespace App\Services;

use App\Models\GameMistake;
use App\Models\GameRecord;
use App\Models\User;
use App\Services\Gamification\GamificationService;
use App\Support\Vn;
use App\Support\Xiangqi\Rules;
use Carbon\CarbonImmutable;

/**
 * "Học từ sai lầm của chính mình": sau khi phân tích ván, mỗi nước Sai lầm / Sai lầm nghiêm trọng của người chơi
 * thành 1 thế cờ luyện lại. Lịch lặp ngắt quãng (hộp Leitner): đúng → 1, 3, 7, 21 ngày rồi coi như đã thuộc;
 * sai → về hộp 0, ôn lại ngày mai. Chấm điểm ở server bằng điểm từng nước máy đã tính (không lộ đáp án ra trang).
 */
class MistakeService
{
    public const INTERVALS = [1, 3, 7, 21];   // ngày chờ sau lần giải đúng thứ 1, 2, 3, 4

    public const TOLERANCE = 60;              // nước trong 60 điểm (≈ 0.6 Tốt) so với nước tốt nhất = đạt

    public function __construct(private GameRecordService $records, private GamificationService $gami) {}

    /** Lấy sai lầm của chính người chơi từ kết quả phân tích ván. Trả số thế mới thêm. */
    public function syncFromRecord(GameRecord $r): int
    {
        $an = $r->analysis;
        if (! $an || empty($an['moves'])) return 0;
        $steps = $this->records->stepsFor($r);
        if (! $steps) return 0;
        $added = 0;
        foreach ($an['moves'] as $i => $m) {
            if (! in_array($m['c'] ?? '', ['mistake', 'blunder'], true)) continue;
            $step = $steps[$i] ?? null;
            if (! $step || $step['move_side'] !== $r->side || empty($m['b'])) continue;
            $alts = $an['alts'][$i] ?? null;
            if (! is_array($alts) || ! isset($alts[$m['b']])) continue;
            $fen = $i === 0 ? $r->start_fen : $steps[$i - 1]['fen'];
            $row = GameMistake::firstOrCreate(['game_record_id' => $r->id, 'ply' => $i], [
                'user_id' => $r->user_id, 'fen' => $fen, 'side' => $step['move_side'],
                'played' => $step['move_notation_iccs'], 'best' => $m['b'], 'alts' => $alts,
                'loss' => (int) ($m['l'] ?? 0), 'class' => $m['c'], 'box' => 0, 'due_on' => Vn::today(),
            ]);
            if ($row->wasRecentlyCreated) $added++;
        }

        return $added;
    }

    public function dueQuery(User $u)
    {
        return GameMistake::where('user_id', $u->id)->whereNull('mastered_at')->where('due_on', '<=', Vn::today());
    }

    public function dueCount(User $u): int
    {
        return $this->dueQuery($u)->count();
    }

    /** Dữ liệu cho trang luyện (KHÔNG kèm đáp án). */
    public function payload(GameMistake $m): array
    {
        $r = $m->record;
        $b = Rules::loadFen($m->fen);
        $sq = Rules::iccs($m->played);

        return [
            'id' => $m->id, 'fen' => $m->fen, 'side' => $m->side, 'played' => $m->played,
            'playedNote' => $sq ? Rules::notation($b, $sq[0], $sq[1]) : $m->played,
            'class' => $m->class, 'loss' => $m->loss, 'box' => $m->box,
            'move' => intdiv($m->ply, 2) + 1,
            'game' => $r ? ['title' => ($r->isCoup() ? 'Cờ úp' : 'Cờ tướng') . ' vs ' . $r->opponent, 'date' => $r->created_at->format('d/m/Y'), 'url' => route('history.show', $r)] : null,
        ];
    }

    /** Chấm nước thử lại. Trả {correct, best, bestNote, box, due, gamification}. */
    public function answer(User $u, GameMistake $m, string $move): array
    {
        $alts = $m->alts ?? [];
        $bestScore = max($alts ?: [0]);
        $correct = isset($alts[$move]) && $alts[$move] >= $bestScore - self::TOLERANCE;
        $today = CarbonImmutable::parse(Vn::today());
        $m->tries++;
        if ($correct) {
            $m->solved++;
            $m->box = min(4, $m->box + 1);
            if ($m->box >= 4) { $m->mastered_at = now(); $m->due_on = null; }
            else $m->due_on = $today->addDays(self::INTERVALS[$m->box - 1])->toDateString();
        } else {
            $m->box = 0;
            $m->due_on = $today->addDay()->toDateString();
        }
        $m->save();

        $g = $correct ? $this->gami->record($u, 'mistake_fix', ['key' => 'mistake:' . $m->id . ':' . Vn::today(), 'amount' => (int) config('gamification.xp.mistake_fix', 8), 'puzzles' => 1]) : null;
        $b = Rules::loadFen($m->fen);
        $sq = Rules::iccs($m->best);

        return [
            'correct' => $correct,
            'best' => $m->best,
            'bestNote' => $sq ? Rules::notation($b, $sq[0], $sq[1]) : $m->best,
            'box' => $m->box,
            'mastered' => (bool) $m->mastered_at,
            'due' => $m->due_on,
            'gamification' => $g,
        ];
    }

    /** Thống kê nhỏ cho trang: đang chờ / đã thuộc / tổng. */
    public function stats(User $u): array
    {
        $q = GameMistake::where('user_id', $u->id);

        return [
            'due' => $this->dueCount($u),
            'learning' => (clone $q)->whereNull('mastered_at')->count(),
            'mastered' => (clone $q)->whereNotNull('mastered_at')->count(),
            'total' => (clone $q)->count(),
        ];
    }
}
