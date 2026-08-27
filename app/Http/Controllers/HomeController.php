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

        $series = LessonSeries::withCount(['publishedLessons'])
            ->having('published_lessons_count', '>', 0)
            ->orderBy('sort_order')->take(4)->get();

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

        return view('home', compact('phases', 'featured', 'series', 'totalLessons', 'heroLesson', 'heroSteps', 'heroTree'));
    }
}
