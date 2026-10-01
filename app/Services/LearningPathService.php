<?php

namespace App\Services;

use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\LessonSeries;
use App\Models\PuzzleAttempt;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

// Dựng lộ trình học (chặng → chương trình → unit → node bài) từ config/learning-path.php và trộn
// tiến độ người học. Phần tĩnh (danh sách bài) cache theo mốc cập nhật bài học mới nhất.
class LearningPathService
{
    /** Cấu trúc tĩnh: không phụ thuộc người dùng. */
    public function structure(): array
    {
        // Không dùng lessons.updated_at — tăng view_count cũng chạm updated_at, sẽ phá cache mỗi lượt xem.
        $stamp = Lesson::published()->count() . '|' . Lesson::published()->max('published_at') . '|' . LessonSeries::max('updated_at');

        return Cache::remember('learning-path:' . md5($stamp), 3600, function () {
            $courses = [];
            foreach (config('learning-path.courses') as $key => $c) {
                $series = LessonSeries::whereIn('slug', $c['series'])->get()->sortBy(fn ($s) => array_search($s->slug, $c['series'], true));
                $list = [];
                foreach ($series as $s) {
                    $lessons = Lesson::published()->where('series_id', $s->id)
                        ->orderBy('order_in_series')->orderBy('id')
                        ->get(['id', 'title', 'slug', 'level', 'move_count'])
                        ->map(fn ($l) => ['id' => $l->id, 'title' => $l->title, 'slug' => $l->slug, 'level' => $l->level])->all();
                    if (! $lessons) continue;
                    $list[] = ['id' => $s->id, 'name' => $s->name, 'slug' => $s->slug, 'lessons' => $lessons];
                }
                $courses[$key] = $c + ['key' => $key, 'series_list' => $list,
                    'total' => array_sum(array_map(fn ($s) => count($s['lessons']), $list))];
            }

            return $courses;
        });
    }

    /** Cấu trúc + trạng thái từng node cho 1 người học (null = khách). */
    public function forUser(?User $u): array
    {
        $courses = $this->structure();
        $done = $reading = [];
        $next = null;
        if ($u) {
            $rows = LessonProgress::where('user_id', $u->id)->pluck('status', 'lesson_id')->all();
            foreach ($rows as $id => $st) {
                $st === 'completed' ? $done[$id] = true : $reading[$id] = true;
            }
            $next = $u->nextLesson()?->id;
        }
        $acc = $u ? $this->accuracyByPhase($u) : [];
        $unit = (int) config('learning-path.unit_size', 10);
        $currentCourse = null;

        foreach ($courses as $key => &$c) {
            $c['done'] = 0;
            foreach ($c['series_list'] as &$s) {
                $s['done'] = 0;
                $s['units'] = [];
                foreach (array_chunk($s['lessons'], $unit) as $i => $chunk) {
                    $nodes = [];
                    foreach ($chunk as $k => $l) {
                        $state = isset($done[$l['id']]) ? 'done' : (isset($reading[$l['id']]) ? 'reading' : 'open');
                        if ($l['id'] === $next) {
                            $state = 'next';
                            $currentCourse ??= $key;
                        }
                        if ($state === 'done') { $s['done']++; $c['done']++; }
                        $nodes[] = $l + ['state' => $state, 'n' => $i * $unit + $k + 1];
                    }
                    $s['units'][] = ['index' => $i + 1, 'nodes' => $nodes,
                        'done' => count(array_filter($nodes, fn ($n) => $n['state'] === 'done'))];
                }
                unset($s['lessons']);
            }
            unset($s);
            $pct = $c['total'] ? $c['done'] / $c['total'] : 0;
            $c['completion'] = (int) round(100 * $pct);
            $a = $acc[$key] ?? null;
            $c['accuracy'] = $a;
            $c['mastery'] = $a === null ? $c['completion'] : (int) round(60 * $pct + 0.4 * $a);
        }
        unset($c);

        return ['courses' => $courses, 'current' => $currentCourse, 'next_id' => $next];
    }

    /** % giải đúng thế cờ theo giai đoạn (60 ngày, ≥ 5 lượt). */
    public function accuracyByPhase(User $u): array
    {
        $rows = PuzzleAttempt::query()->join('puzzles', 'puzzles.id', '=', 'puzzle_attempts.puzzle_id')
            ->where('puzzle_attempts.user_id', $u->id)->where('puzzle_attempts.created_at', '>=', now()->subDays(60))
            ->groupBy('puzzles.phase')
            ->selectRaw("puzzles.phase as phase, COUNT(*) as n, SUM(CASE WHEN puzzle_attempts.result = 'solved' THEN 1 ELSE 0 END) as ok")
            ->get();
        $out = [];
        foreach ($rows as $r) {
            if ($r->phase && $r->n >= 5) $out[$r->phase] = (int) round(100 * $r->ok / $r->n);
        }

        return $out;
    }

    /** Thanh tiến độ gọn cho trang chủ / hồ sơ. */
    public function summary(?User $u): array
    {
        $data = $this->forUser($u);

        return array_map(fn ($c) => [
            'key' => $c['key'], 'name' => $c['name'], 'glyph' => $c['glyph'], 'black' => $c['black'],
            'desc' => $c['desc'], 'total' => $c['total'], 'done' => $c['done'],
            'completion' => $c['completion'], 'mastery' => $c['mastery'], 'accuracy' => $c['accuracy'],
        ], array_values($data['courses']));
    }
}
