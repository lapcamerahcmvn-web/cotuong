<?php

namespace App\Console\Commands;

use App\Models\Lesson;
use App\Models\Puzzle;
use App\Support\Xiangqi\Rules;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

/**
 * Dựng kho thế cờ luyện tập từ bài học có puzzle_side (sát pháp + tàn cuộc).
 * Idempotent: upsert theo (lesson_id, start_ply); KHÔNG đụng rating/số lượt đã tích luỹ;
 * thế của bài bị gỡ publish → archived (không xoá vì có thể đã có lượt thử).
 * Chạy sau mỗi lần nạp ContentSeeder (thuần PHP — chạy được trên hosting qua SSH).
 */
class BuildPuzzles extends Command
{
    protected $signature = 'cotuong:build-puzzles {--dry-run : Chỉ thống kê, không ghi DB}';

    protected $description = 'Dựng/cập nhật kho thế cờ luyện tập (puzzles) từ bài học sát pháp & tàn cuộc';

    private const BASE_RATING = ['co-ban' => 900, 'trung-cap' => 1200, 'nang-cao' => 1500];

    public function handle(): int
    {
        $cfg = config('puzzle-skills');
        $dry = (bool) $this->option('dry-run');
        $lessons = Lesson::published()->where('game_mode', 'co-tuong')->whereNotNull('puzzle_side')
            ->whereHas('series', fn ($q) => $q->whereIn('slug', $cfg['series_pool']))
            ->with(['series', 'steps' => fn ($q) => $q->orderBy('step_order')])->get();

        $stats = ['lessons' => $lessons->count(), 'full' => 0, 'tail' => 0, 'invalid' => 0, 'skipped' => 0];
        $keep = [];

        foreach ($lessons as $lesson) {
            $plies = $lesson->steps->map(fn ($s) => [
                'iccs' => $s->move_notation_iccs, 'side' => $s->move_side, 'fen' => $s->fen,
            ])->values()->all();
            if (! $plies || ($plies[0]['side'] ?? null) !== $lesson->puzzle_side) {
                $stats['skipped']++;
                continue;
            }
            // Lời giải phải kết thúc bằng nước của bên giải.
            while ($plies && end($plies)['side'] !== $lesson->puzzle_side) {
                array_pop($plies);
            }
            $line = $this->replay($lesson->initial_fen, $plies);
            if ($line === null) {
                $stats['invalid']++;
                $this->line("  ✗ #{$lesson->id} {$lesson->title} — nước đi không hợp lệ theo luật", null, 'v');
                continue;
            }
            $endsInMate = Rules::isMated($line['final'], $lesson->puzzle_side !== 'do');
            $candidates = [];

            if (count($plies) <= $cfg['max_plies']) {
                $candidates[] = [0, $lesson->initial_fen, $plies, false];
            }
            if ($endsInMate) {
                $solverIdx = array_keys(array_filter($plies, fn ($p) => $p['side'] === $lesson->puzzle_side));
                foreach ($cfg['tail_solver_moves'] as $n) {
                    if (count($solverIdx) <= $n) continue;
                    $start = $solverIdx[count($solverIdx) - $n];
                    if ($start === 0) continue;
                    $candidates[] = [$start, $plies[$start - 1]['fen'], array_slice($plies, $start), true];
                }
            }

            foreach ($candidates as [$start, $fen, $sub, $isTail]) {
                $solver = (int) ceil(count($sub) / 2);
                $title = $lesson->title . ($isTail ? ' — Đoạn kết ' . $solver . ' nước' : '');
                $data = [
                    'source' => 'lesson',
                    'title' => Str::limit($title, 250, ''),
                    'fen' => explode(' ', trim($fen))[0],
                    'side' => $lesson->puzzle_side,
                    'solution' => array_column($sub, 'iccs'),
                    'solver_moves' => $solver,
                    'skill_tags' => $this->skills($lesson, $solver, $endsInMate),
                    'phase' => $lesson->phase,
                    'status' => 'published',
                ];
                $rating = (self::BASE_RATING[$lesson->level] ?? 1200) - ($isTail ? 100 : 0) + 60 * ($solver - 1);
                $stats[$isTail ? 'tail' : 'full']++;
                $keep[] = $lesson->id . ':' . $start;
                if ($dry) continue;

                $p = Puzzle::firstOrNew(['lesson_id' => $lesson->id, 'start_ply' => $start]);
                if (! $p->exists) {
                    $p->rating = $rating;
                }
                $p->fill($data)->save();
            }
        }

        $archived = 0;
        if (! $dry) {
            Puzzle::where('source', 'lesson')->where('status', 'published')->get(['id', 'lesson_id', 'start_ply'])
                ->each(function ($p) use ($keep, &$archived) {
                    if (! in_array($p->lesson_id . ':' . $p->start_ply, $keep, true)) {
                        $p->update(['status' => 'archived']);
                        $archived++;
                    }
                });
        }

        $this->table(['Bài nguồn', 'Thế đầy đủ', 'Thế đoạn kết', 'Lỗi luật', 'Bỏ qua', 'Lưu trữ'],
            [[$stats['lessons'], $stats['full'], $stats['tail'], $stats['invalid'], $stats['skipped'], $archived]]);
        $this->info(($dry ? '[dry-run] ' : '') . 'Tổng thế cờ: ' . ($stats['full'] + $stats['tail']));

        return self::SUCCESS;
    }

    /** Đi lại toàn bộ nước theo luật; null nếu có nước sai luật. */
    private function replay(?string $fen, array $plies): ?array
    {
        $b = Rules::loadFen($fen ?: '');
        foreach ($plies as $p) {
            $sq = $p['iccs'] ? Rules::iccs($p['iccs']) : null;
            if (! $sq || $b[$sq[0]] === null || Rules::isRed($b[$sq[0]]) !== ($p['side'] === 'do')
                || ! Rules::legalNoSelfCheck($b, $sq[0], $sq[1])) {
                return null;
            }
            $b = Rules::apply($b, $sq[0], $sq[1]);
        }

        return ['final' => $b];
    }

    private function skills(Lesson $lesson, int $solver, bool $mate): array
    {
        $title = Str::of($lesson->title)->ascii()->lower()->toString();
        $tags = [];
        foreach (config('puzzle-skills.skills') as $slug => $s) {
            if (isset($s['match']) && preg_match($s['match'], $title)) $tags[] = $slug;
            if (isset($s['series']) && in_array($lesson->series?->slug, $s['series'], true)) $tags[] = $slug;
            if (isset($s['max_solver']) && $mate && $solver <= $s['max_solver']) $tags[] = $slug;
        }
        if (in_array('song-xe', $tags, true)) {
            $tags = array_values(array_diff($tags, ['xe']));
        }

        return array_values(array_unique($tags));
    }
}
