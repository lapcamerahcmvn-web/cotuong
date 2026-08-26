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

        // Bài đã học của người dùng đang đăng nhập → hiện dấu tích ✓ trong danh sách.
        $completedIds = [];
        if (auth()->check()) {
            $completedIds = \App\Models\LessonProgress::where('user_id', auth()->id())
                ->where('status', 'completed')
                ->whereIn('lesson_id', $lessons->pluck('id'))
                ->pluck('lesson_id')->all();
        }

        return view('lessons.series', compact('series', 'lessons', 'completedIds'));
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

        // Bình luận (gốc + trả lời 1 cấp), sắp theo "quan tâm nhất" (nhiều like → mới).
        $comments = \App\Models\LessonComment::with(['user', 'replies.user'])
            ->where('lesson_id', $lesson->id)->whereNull('parent_id')
            ->orderByDesc('likes_count')->orderByDesc('created_at')->get();
        $commentCount = \App\Models\LessonComment::where('lesson_id', $lesson->id)->count();
        $likedCommentIds = auth()->check()
            ? \Illuminate\Support\Facades\DB::table('comment_likes')->where('user_id', auth()->id())->pluck('comment_id')->all()
            : [];

        // Bài liên quan (internal linking) — cùng chuỗi, bỏ bài trước/sau đã có ở nav.
        $related = Lesson::published()->where('id', '!=', $lesson->id)
            ->where('series_id', $lesson->series_id)
            ->when($prev, fn ($q) => $q->where('id', '!=', $prev->id))
            ->when($next, fn ($q) => $q->where('id', '!=', $next->id))
            ->orderBy('order_in_series')->take(4)->get();

        return view('lessons.show', compact('lesson', 'prev', 'next', 'completed', 'comments', 'commentCount', 'likedCommentIds', 'related'));
    }
}
