<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonSeries;

class HomeController extends Controller
{
    public function index()
    {
        $phases = [];
        foreach (Lesson::PHASES as $key => $label) {
            $phases[$key] = [
                'label' => $label,
                'count' => Lesson::published()->where('phase', $key)->count(),
            ];
        }

        $featured = Lesson::published()->featured()->latest('published_at')->take(6)->get();
        if ($featured->isEmpty()) {
            $featured = Lesson::published()->where('move_count', '>', 8)->latest('published_at')->take(6)->get();
        }

        // Mọi chương trình có bài, xếp theo chặng lộ trình (tự gồm chuyên đề mới chưa khai báo trong config).
        $courses = app(\App\Services\LearningPathService::class)->courseSeries();
        $courseKeys = array_keys($courses);
        $courseOf = [];
        foreach ($courses as $key => $c) {
            foreach ($c['series'] as $i => $slug) $courseOf[$slug] = [$key, $i];
        }
        // ⚠️ published_at bị ContentSeeder đặt lại mỗi lần nạp nội dung → "mới" tính theo created_at (ổn định).
        $series = LessonSeries::withCount(['publishedLessons'])
            ->has('publishedLessons')->get()
            ->each(fn ($s) => $s->course_key = $courseOf[$s->slug][0] ?? null)
            ->sortBy(fn ($s) => [array_search($s->course_key, $courseKeys, true) === false ? 99 : array_search($s->course_key, $courseKeys, true), $courseOf[$s->slug][1] ?? 99])
            ->values();
        $courseNames = collect($courses)->filter(fn ($c, $k) => $series->contains('course_key', $k))->map(fn ($c) => $c['name'])->all();
        $latest = Lesson::published()->with('series:id,name')->latest('created_at')->latest('id')->take(6)->get();

        $totalLessons = Lesson::published()->count();

        // Bàn cờ hero: lấy nước đi THẬT từ 1 bài đã publish bắt đầu từ thế xuất phát chuẩn
        // (ký hiệu do decoder sinh — luôn đúng, không hardcode tay nữa).
        $standardFen = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';
        // Ưu tiên bài có CÂY BIẾN để khoe tính năng chọn biến (mũi tên A/B) ngay trang chủ.
        $heroLesson = Lesson::published()
            ->where('initial_fen', $standardFen)
            ->where(fn ($q) => $q->whereNotNull('variation_tree')->orWhere('move_count', '>=', 6))
            ->orderByRaw('(variation_tree IS NOT NULL) DESC')
            ->orderByDesc('is_featured')->orderBy('id')
            ->first();
        $heroSteps = $heroLesson
            ? $heroLesson->steps()->orderBy('step_order')->take(6)->get()
            : collect();
        $heroTree = $heroLesson?->variation_tree;

        // Thế cờ hôm nay (theo ngày giờ VN, chung cho mọi người) — kho puzzles; chưa dựng kho thì dùng bài học.
        $dailySvc = app(\App\Services\DailyPuzzleService::class);
        $dailyPuzzle = $dailySvc->forDate();
        $dailyLesson = $dailyPuzzle ? null : $dailySvc->fallbackLesson();
        $secondsLeft = \App\Support\Vn::secondsToMidnight();

        $user = auth()->user();
        $paths = app(\App\Services\LearningPathService::class)->summary($user);
        $snap = $user ? app(\App\Services\Gamification\GamificationService::class)->snapshot($user) : null;
        $weekly = $user ? app(\App\Services\Gamification\WeeklyService::class)->progress($user) : null;
        $continue = $user?->nextLesson();
        $continueSeries = null;
        if ($continue && $continue->series_id) {
            $tot = Lesson::published()->where('series_id', $continue->series_id)->count();
            $done = $user->completedCountBySeries()[$continue->series_id] ?? 0;
            $continueSeries = ['total' => $tot, 'done' => $done, 'pct' => $tot ? (int) round(100 * $done / $tot) : 0];
        }
        $weak = $user ? app(\App\Services\PuzzleService::class)->weakSkills($user) : [];
        $topWeek = array_slice(app(\App\Services\Gamification\LeaderboardService::class)->top('xp', 'week'), 0, 5);

        return view('home', compact(
            'phases', 'featured', 'series', 'courseNames', 'latest', 'totalLessons', 'heroLesson', 'heroSteps', 'heroTree',
            'dailyPuzzle', 'dailyLesson', 'secondsLeft', 'paths', 'snap', 'weekly', 'continue', 'continueSeries', 'weak', 'topWeek',
        ));
    }
}
