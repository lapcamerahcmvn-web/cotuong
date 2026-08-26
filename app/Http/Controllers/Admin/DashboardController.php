<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\LessonComment;
use App\Models\LessonSeries;
use App\Models\SourceAsset;
use App\Models\User;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        $stats = [
            'published' => Lesson::where('status', 'published')->count(),
            'draft'     => Lesson::where('status', 'draft')->count(),
            'total'     => Lesson::count(),
            'series'    => LessonSeries::count(),
            'assets'    => SourceAsset::count(),
            'users'     => User::count(),
            'pending_comments' => LessonComment::where('approved', false)->count(),
            'comments'  => LessonComment::count(),
            'views_today' => DB::table('page_visits')->where('visited_on', $today->toDateString())->count(),
            'views_7'   => DB::table('page_visits')->where('visited_on', '>=', $today->copy()->subDays(6)->toDateString())->count(),
            'visitors_today' => DB::table('page_visits')->where('visited_on', $today->toDateString())->distinct('visitor_hash')->count('visitor_hash'),
        ];

        $recent = Lesson::latest('updated_at')->take(6)->get();
        $pendingComments = LessonComment::with(['user', 'lesson'])->where('approved', false)->latest()->take(5)->get();

        return view('admin.dashboard', compact('stats', 'recent', 'pendingComments'));
    }
}
