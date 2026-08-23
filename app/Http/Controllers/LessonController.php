<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonSeries;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    // Trang giai đoạn: /khai-cuoc, /trung-cuoc, /tan-cuoc, /co-up (landing SEO diện rộng).
    public function phase(string $phase)
    {
        // Cờ úp là game_mode riêng, không phải phase — điều hướng theo game_mode.
        if ($phase === 'co-up') {
            $lessons = Lesson::published()->mode('co-up')->latest('published_at')->paginate(24);
            $meta = ['label' => 'Cờ Úp', 'desc' => 'Học cờ úp: luật chơi, mẹo và chiến thuật lật quân — môn cờ biến hoá đang thịnh hành.'];
            $seriesList = LessonSeries::where('game_mode', 'co-up')->withCount('publishedLessons')->get();
        } else {
            abort_unless(array_key_exists($phase, Lesson::PHASES), 404);
            $lessons = Lesson::published()->mode('co-tuong')->where('phase', $phase)->latest('published_at')->paginate(24);
            $meta = [
                'label' => Lesson::PHASES[$phase],
                'desc'  => 'Học ' . mb_strtolower(Lesson::PHASES[$phase]) . ' cờ tướng qua bàn cờ tương tác, diễn giải từng nước đi rõ ràng.',
            ];
            $seriesList = LessonSeries::where('game_mode', 'co-tuong')->where('phase', $phase)
                ->withCount('publishedLessons')->orderBy('sort_order')->get();
        }

        return view('lessons.phase', compact('phase', 'lessons', 'meta', 'seriesList'));
    }

    // Trang chuỗi bài (Course): /chuong-trinh/{series}
    public function series(LessonSeries $series)
    {
        $lessons = $series->publishedLessons()->orderBy('order_in_series')->get();
        abort_if($lessons->isEmpty(), 404);

        return view('lessons.series', compact('series', 'lessons'));
    }

    // Trang bài học có bàn cờ tương tác: /bai-hoc/{lesson}
    public function show(Lesson $lesson)
    {
        abort_unless($lesson->isIndexable(), 404);

        $lesson->load('steps', 'series');
        $lesson->increment('view_count');

        // Điều hướng bài trước/sau trong cùng series.
        $prev = $next = null;
        if ($lesson->series_id) {
            $prev = Lesson::published()->where('series_id', $lesson->series_id)
                ->where('order_in_series', '<', $lesson->order_in_series)
                ->orderByDesc('order_in_series')->first();
            $next = Lesson::published()->where('series_id', $lesson->series_id)
                ->where('order_in_series', '>', $lesson->order_in_series)
                ->orderBy('order_in_series')->first();
        }

        $completed = false;
        if (auth()->check()) {
            $completed = \App\Models\LessonProgress::where('user_id', auth()->id())
                ->where('lesson_id', $lesson->id)->where('status', 'completed')->exists();
        }

        return view('lessons.show', compact('lesson', 'prev', 'next', 'completed'));
    }
}
