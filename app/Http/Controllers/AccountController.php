<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonProgress;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $progress = LessonProgress::with('lesson')
            ->where('user_id', $user->id)
            ->latest('updated_at')->get();

        $completed = $progress->where('status', 'completed');
        $reading   = $progress->where('status', 'reading');

        // Gợi ý bài tiếp theo: bài publish chưa có tiến độ.
        $learnedIds = $progress->pluck('lesson_id');
        $suggested = Lesson::published()
            ->whereNotIn('id', $learnedIds)
            ->orderBy('series_id')->orderBy('order_in_series')
            ->take(4)->get();

        return view('account.index', compact('user', 'completed', 'reading', 'suggested'));
    }
}
