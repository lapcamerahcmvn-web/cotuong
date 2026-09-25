<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonComment;
use App\Models\LessonProgress;
use App\Models\LessonSeries;
use App\Models\Page;
use Illuminate\Support\Facades\DB;

class LessonController extends Controller
{
    // Meta SEO riêng từng trang giai đoạn (title ≤ ~60, description có từ khoá chính + ngữ cảnh).
    public const PHASE_META = [
        'nhap-mon' => [
            'label' => 'Nhập môn',
            'title' => 'Nhập Môn Cờ Tướng — Luật Chơi & Cách Đi Từng Quân',
            'h1' => 'Nhập môn cờ tướng',
            'desc' => 'Học cờ tướng từ số 0: luật chơi cơ bản và cách đi từng quân (Xe, Pháo, Mã, Tượng, Sĩ, Tướng, Tốt), mỗi bài có bàn cờ tương tác minh hoạ từng nước.',
            'about' => 'Luật chơi cờ tướng cho người mới',
        ],
        'khai-cuoc' => [
            'label' => 'Khai cuộc',
            'title' => 'Khai Cuộc Cờ Tướng — Nguyên Lý & Các Thế Trận Phổ Biến',
            'h1' => 'Khai cuộc cờ tướng',
            'desc' => 'Học khai cuộc cờ tướng: nguyên lý bố trí quân, tranh tiên và các thế trận phổ biến (Pháo đầu, Phi Tượng, Khởi Mã, Bình Phong Mã…), có bàn cờ tương tác diễn giải từng nước.',
            'about' => 'Khai cuộc cờ tướng',
        ],
        'trung-cuoc' => [
            'label' => 'Trung cuộc',
            'title' => 'Trung Cuộc Cờ Tướng — Sát Pháp & Chiến Thuật Phối Hợp',
            'h1' => 'Trung cuộc cờ tướng',
            'desc' => 'Học trung cuộc cờ tướng: các sát pháp, đòn phối hợp tấn công và cách tính toán đổi quân, có bàn cờ tương tác đi từng nước kèm diễn giải.',
            'about' => 'Trung cuộc và sát pháp cờ tướng',
        ],
        'tan-cuoc' => [
            'label' => 'Tàn cuộc',
            'title' => 'Tàn Cuộc Cờ Tướng — Kỹ Thuật Thắng Thế Cờ Ít Quân',
            'h1' => 'Tàn cuộc cờ tướng',
            'desc' => 'Học tàn cuộc cờ tướng: kỹ thuật thắng và cầm hoà các thế cờ ít quân điển hình, có bàn cờ tương tác đi từng nước kèm diễn giải.',
            'about' => 'Tàn cuộc cờ tướng',
        ],
        'co-up' => [
            'label' => 'Cờ Úp',
            'title' => 'Cờ Úp — Luật Chơi, Chiến Thuật & Bài Học Có Bàn Cờ',
            'h1' => 'Cờ úp',
            'desc' => 'Học cờ úp: luật chơi, mẹo và chiến thuật lật quân — môn cờ biến hoá đang thịnh hành, có bàn cờ tương tác đi từng nước kèm diễn giải.',
            'about' => 'Cờ úp (biến thể cờ tướng)',
        ],
    ];

    // Bộ lọc dùng chung cho trang giai đoạn: cấp độ / độ dài (số nước) / đã học-chưa học.
    // Query string đơn giản (?level=...&length=...&done=1|0) — không cần JS, chỉ là link GET.
    public const LENGTH_FILTERS = [
        'short'  => ['label' => 'Ngắn (< 10 nước)', 'min' => 0, 'max' => 9],
        'medium' => ['label' => 'Vừa (10–30 nước)', 'min' => 10, 'max' => 30],
        'long'   => ['label' => 'Dài (> 30 nước)', 'min' => 31, 'max' => null],
    ];

    // Trang giai đoạn: /nhap-mon, /khai-cuoc, /trung-cuoc, /tan-cuoc, /co-up (landing SEO diện rộng).
    public function phase(string $phase, \Illuminate\Http\Request $request)
    {
        abort_unless(array_key_exists($phase, self::PHASE_META), 404);
        $meta = self::PHASE_META[$phase];
        $page = Page::firstWhere('slug', "phase:{$phase}");

        $filters = [
            'level'  => $request->get('level'),
            'length' => $request->get('length'),
            'done'   => $request->get('done'),
        ];

        $query = ($phase === 'co-up')
            ? Lesson::published()->mode('co-up')
            : Lesson::published()->mode('co-tuong')->where('phase', $phase);

        if ($filters['level'] && array_key_exists($filters['level'], Lesson::LEVELS)) {
            $query->where('level', $filters['level']);
        }
        if ($filters['length'] && isset(self::LENGTH_FILTERS[$filters['length']])) {
            $range = self::LENGTH_FILTERS[$filters['length']];
            $query->where('move_count', '>=', $range['min']);
            if ($range['max'] !== null) {
                $query->where('move_count', '<=', $range['max']);
            }
        }
        if (in_array($filters['done'], ['1', '0'], true) && auth()->check()) {
            $doneIds = LessonProgress::where('user_id', auth()->id())->where('status', 'completed')->pluck('lesson_id');
            $filters['done'] === '1' ? $query->whereIn('id', $doneIds) : $query->whereNotIn('id', $doneIds);
        }

        $lessons = $query->latest('published_at')->paginate(24)->withQueryString();

        $completedIds = auth()->check()
            ? LessonProgress::where('user_id', auth()->id())->where('status', 'completed')
                ->whereIn('lesson_id', $lessons->pluck('id'))->pluck('lesson_id')->all()
            : [];

        if ($phase === 'co-up') {
            $seriesList = LessonSeries::where('game_mode', 'co-up')->withCount('publishedLessons')
                ->orderBy('sort_order')->get();
        } else {
            $seriesList = LessonSeries::where('game_mode', 'co-tuong')->where('phase', $phase)
                ->withCount('publishedLessons')->orderBy('sort_order')->get();
        }

        // Chỉ hiện khối lọc khi trang có đủ bài để lọc mới có ích (tránh rối mắt ở mục ít bài).
        $showFilters = ! $filters['level'] && ! $filters['length'] && ! $filters['done']
            ? Lesson::published()->mode($phase === 'co-up' ? 'co-up' : 'co-tuong')
                ->when($phase !== 'co-up', fn ($q) => $q->where('phase', $phase))->count() > 12
            : true;

        return view('lessons.phase', compact('phase', 'lessons', 'meta', 'seriesList', 'page', 'filters', 'showFilters', 'completedIds'));
    }

    // Trang chuỗi bài (Course): /chuong-trinh/{series}
    public function series(LessonSeries $series)
    {
        $lessons = $series->publishedLessons()->orderBy('order_in_series')->get();
        abort_if($lessons->isEmpty(), 404);

        // Bài đã học của người dùng đang đăng nhập → hiện dấu tích ✓ trong danh sách.
        $completedIds = [];
        if (auth()->check()) {
            $completedIds = LessonProgress::where('user_id', auth()->id())
                ->where('status', 'completed')
                ->whereIn('lesson_id', $lessons->pluck('id'))
                ->pluck('lesson_id')->all();
        }

        return view('lessons.series', compact('series', 'lessons', 'completedIds'));
    }

    // Trang bài học có bàn cờ tương tác: /bai-hoc/{slug}
    public function show(string $slug)
    {
        $lesson = Lesson::where('slug', $slug)->first();
        if (! $lesson) {
            if ($to = \App\Models\UrlRedirect::lookup('/bai-hoc/'.$slug)) {
                return redirect($to, 301);
            }
            abort(404);
        }
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
            $completed = LessonProgress::where('user_id', auth()->id())
                ->where('lesson_id', $lesson->id)->where('status', 'completed')->exists();
        }

        // Bình luận ĐÃ DUYỆT (gốc + trả lời 1 cấp), sắp theo "quan tâm nhất" (nhiều like → mới).
        $comments = LessonComment::with(['user', 'replies.user'])
            ->where('lesson_id', $lesson->id)->whereNull('parent_id')->where('approved', true)
            ->orderByDesc('likes_count')->orderByDesc('created_at')->get();
        $commentCount = LessonComment::where('lesson_id', $lesson->id)->where('approved', true)->count();
        $likedCommentIds = auth()->check()
            ? DB::table('comment_likes')->where('user_id', auth()->id())->pluck('comment_id')->all()
            : [];

        // Bài liên quan (internal linking) — cùng chuỗi, BỎ bài đã học + bài trước/sau ở nav.
        $doneIds = auth()->check() ? auth()->user()->completedLessonIds() : [];
        $related = Lesson::published()->where('id', '!=', $lesson->id)
            ->where('series_id', $lesson->series_id)
            ->when($prev, fn ($q) => $q->where('id', '!=', $prev->id))
            ->when($next, fn ($q) => $q->where('id', '!=', $next->id))
            ->whereNotIn('id', $doneIds)
            ->orderBy('order_in_series')->take(4)->get();
        // Thiếu thì bù bằng bài CÙNG GIAI ĐOẠN chưa học (khác chuỗi) để luôn gợi ý nội dung mới.
        if ($related->count() < 4 && $lesson->phase) {
            $exclude = $related->pluck('id')->push($lesson->id)->merge($doneIds)->unique()->all();
            $fill = Lesson::published()->mode($lesson->game_mode)->where('phase', $lesson->phase)
                ->whereNotIn('id', $exclude)->inRandomOrder()->take(4 - $related->count())->get();
            $related = $related->concat($fill);
        }

        // Gợi ý học tiếp: bài kế trong chuỗi chưa học (ưu tiên $next nếu chưa học), rồi tới gợi ý toàn cục.
        $suggestNext = ($next && ! in_array($next->id, $doneIds)) ? $next
            : (auth()->check() ? auth()->user()->nextLesson() : null);
        if ($suggestNext && $suggestNext->id === $lesson->id) {
            $suggestNext = null;
        }

        return view('lessons.show', compact('lesson', 'prev', 'next', 'completed', 'comments', 'commentCount', 'likedCommentIds', 'related', 'suggestNext'));
    }
}
