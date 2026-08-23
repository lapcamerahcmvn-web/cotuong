<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonSeries;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function index(Request $request)
    {
        $q = trim((string) $request->get('q', ''));
        $lessons = collect();
        $series = collect();

        if (mb_strlen($q) >= 2) {
            $lessons = Lesson::published()
                ->where(function ($w) use ($q) {
                    $w->where('title', 'like', "%{$q}%")
                        ->orWhere('summary', 'like', "%{$q}%")
                        ->orWhere('content', 'like', "%{$q}%");
                })
                ->orderByDesc('is_featured')->orderByDesc('move_count')
                ->limit(40)->get();

            $series = LessonSeries::where('name', 'like', "%{$q}%")
                ->withCount('publishedLessons')
                ->having('published_lessons_count', '>', 0)
                ->limit(10)->get();
        }

        return view('search', compact('q', 'lessons', 'series'));
    }
}
