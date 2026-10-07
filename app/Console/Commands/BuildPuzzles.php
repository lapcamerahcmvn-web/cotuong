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
        $segSeries = array_keys($cfg['segment_series'] ?? []);
        $lessons = Lesson::published()->where('game_mode', 'co-tuong')
            ->where(fn ($q) => $q->whereNotNull('puzzle_side')->orWhereHas('series', fn ($s) => $s->whereIn('slug', $segSeries)))
            ->whereHas('series', fn ($q) => $q->whereIn('slug', $cfg['series_pool']))
            ->with(['series', 'steps' => fn ($q) => $q->orderBy('step_order')])->get();

        $stats = ['lessons' => $lessons->count(), 'full' => 0, 'tail' => 0, 'segment' => 0, 'invalid' => 0, 'skipped' => 0];
        $keep = [];

        foreach ($lessons as $lesson) {
            $plies = $lesson->steps->map(fn ($s) => [
                'iccs' => $s->move_notation_iccs, 'side' => $s->move_side, 'fen' => $s->fen, 'caption' => (string) $s->caption,
            ])->values()->all();
            // Chuyên đề tàn cuộc "khẩu quyết": cắt đoạn tìm nước theo bài (xem segments()).
            if (! $lesson->puzzle_side && isset($cfg['segment_series'][$lesson->series?->slug])) {
                if (! $plies) { $stats['skipped']++; continue; }
                if ($this->replay($lesson->initial_fen, $plies) === null) {
                    $stats['invalid']++;
                    continue;
                }
                foreach ($this->segments($lesson, $plies, $cfg['segment_series'][$lesson->series->slug]) as $seg) {
                    $stats['segment']++;
                    $keep[] = $lesson->id . ':' . $seg['start'];
                    if ($dry) continue;
                    $p = Puzzle::firstOrNew(['lesson_id' => $lesson->id, 'start_ply' => $seg['start']]);
                    if (! $p->exists) $p->rating = $seg['rating'];
                    $p->fill($seg['data'])->save();
                }
                continue;
            }
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
            // Mốc dựng kho: trang Luyện tập cache số thế theo chủ đề / bậc theo mốc này (lượt giải không làm mất cache).
            \Illuminate\Support\Facades\Cache::forever('puzzles:stamp', time());
            Puzzle::where('source', 'lesson')->where('status', 'published')->get(['id', 'lesson_id', 'start_ply'])
                ->each(function ($p) use ($keep, &$archived) {
                    if (! in_array($p->lesson_id . ':' . $p->start_ply, $keep, true)) {
                        $p->update(['status' => 'archived']);
                        $archived++;
                    }
                });
        }

        $this->table(['Bài nguồn', 'Thế đầy đủ', 'Thế đoạn kết', 'Đoạn khẩu quyết', 'Lỗi luật', 'Bỏ qua', 'Lưu trữ'],
            [[$stats['lessons'], $stats['full'], $stats['tail'], $stats['segment'], $stats['invalid'], $stats['skipped'], $archived]]);
        $this->info(($dry ? '[dry-run] ' : '') . 'Tổng thế cờ: ' . ($stats['full'] + $stats['tail'] + $stats['segment']));

        return self::SUCCESS;
    }

    /**
     * Đoạn "tìm nước theo khẩu quyết" từ ván tàn cuộc (bài không đặt puzzle_side): bên giải = Đen nếu tiêu đề có "hòa"
     * (bên giữ hòa), ngược lại Đỏ. Mỗi đoạn `solver` nước của bên giải (kèm nước đáp), chọn: đoạn mở đầu, đoạn kết,
     * đoạn có nhiều lời giảng (nước then chốt trong bài); không chồng nhau, tối đa `per_lesson`.
     * @return list<array{start:int, rating:int, data:array}>
     */
    private function segments(Lesson $lesson, array $plies, array $opt): array
    {
        $title = Str::of($lesson->title)->ascii()->lower()->toString();
        $side = preg_match('/\bhoa\b/', $title) && ! preg_match('/thang/', $title) ? 'den' : 'do';
        $n = max(1, (int) ($opt['solver'] ?? 2));
        $len = 2 * $n - 1;                       // n nước bên giải + (n-1) nước đáp
        $starts = [];
        foreach ($plies as $i => $p) {
            if ($p['side'] === $side && $i + $len <= count($plies)) $starts[] = $i;
        }
        if (! $starts) return [];
        $score = function (int $i) use ($plies, $len) {
            $c = 0;
            for ($k = $i; $k < $i + $len; $k++) if (trim($plies[$k]['caption']) !== '') $c++;

            return $c;
        };
        $mid = array_slice($starts, 1, -1);
        usort($mid, fn ($a, $b) => ($score($b) <=> $score($a)) ?: ($a <=> $b));
        $order = array_merge([$starts[0], end($starts)], $mid);
        $chosen = [];
        foreach ($order as $i) {
            if (count($chosen) >= (int) ($opt['per_lesson'] ?? 3)) break;
            foreach ($chosen as $c) if (abs($c - $i) < $len + 1) continue 2;
            $chosen[] = $i;
        }
        sort($chosen);

        $out = [];
        $base = self::BASE_RATING[$lesson->level] ?? 1200;
        foreach ($chosen as $k => $i) {
            $sub = array_slice($plies, $i, $len);
            $fen = $i === 0 ? $lesson->initial_fen : $plies[$i - 1]['fen'];
            $last = $i + $len === count($plies);
            $mate = $last && Rules::isMated(Rules::loadFen($sub[count($sub) - 1]['fen']), $side !== 'do');
            $out[] = ['start' => $i, 'rating' => $base + 40 * $k, 'data' => [
                'source' => 'lesson',
                'title' => Str::limit($lesson->title . ' — ' . ($i === 0 ? 'Nước mở đầu' : ($last ? 'Đoạn kết' : 'Giữa ván')), 250, ''),
                'fen' => explode(' ', trim((string) $fen))[0],
                'side' => $side,
                'solution' => array_column($sub, 'iccs'),
                'solver_moves' => $n,
                'skill_tags' => $this->skills($lesson, $n, $mate, ! $mate),
                'phase' => $lesson->phase,
                'status' => 'published',
            ]];
        }

        return $out;
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

    private function skills(Lesson $lesson, int $solver, bool $mate, bool $segment = false): array
    {
        $title = Str::of($lesson->title)->ascii()->lower()->toString();
        $tags = [];
        foreach (config('puzzle-skills.skills') as $slug => $s) {
            // Đoạn khẩu quyết (không chiếu hết) chỉ thuộc chủ đề nhóm tàn cuộc.
            if ($segment && ($s['group'] ?? null) !== 'tan-cuoc') continue;
            $inSeries = isset($s['series']) && in_array($lesson->series?->slug, $s['series'], true);
            $matches = isset($s['match']) && preg_match($s['match'], $title);
            if (isset($s['series'], $s['match'])) {
                if ($inSeries && $matches) $tags[] = $slug;   // khai báo cả hai → phải khớp cả hai
            } elseif ($matches || $inSeries) {
                $tags[] = $slug;
            }
            if (isset($s['max_solver']) && $mate && $solver <= $s['max_solver']) $tags[] = $slug;
        }
        // Luyện sát pháp theo bậc: thế chiếu hết gắn số nước của bên giải.
        $maxLevel = (int) config('puzzle-skills.ladder.levels', 10);
        if ($mate && $solver >= 1 && $solver <= $maxLevel) $tags[] = 'sat-' . $solver;
        if ($segment) $tags[] = 'khau-quyet';
        if (in_array('song-xe', $tags, true)) {
            $tags = array_values(array_diff($tags, ['xe']));
        }

        return array_values(array_unique($tags));
    }
}
