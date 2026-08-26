<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class StatsController extends Controller
{
    public function index()
    {
        $today = Carbon::today();

        $viewsIn = fn (int $days) => DB::table('page_visits')
            ->where('visited_on', '>=', $today->copy()->subDays($days - 1)->toDateString())->count();
        $visitorsIn = fn (int $days) => DB::table('page_visits')
            ->where('visited_on', '>=', $today->copy()->subDays($days - 1)->toDateString())
            ->distinct('visitor_hash')->count('visitor_hash');

        $kpi = [
            'views_today'   => $viewsIn(1),
            'views_7'       => $viewsIn(7),
            'views_30'      => $viewsIn(30),
            'visitors_today' => $visitorsIn(1),
            'visitors_7'    => $visitorsIn(7),
            'visitors_30'   => $visitorsIn(30),
            'total_views'   => DB::table('page_visits')->count(),
        ];

        // Chuỗi 14 ngày (lượt xem + khách) để vẽ biểu đồ cột.
        $raw = DB::table('page_visits')
            ->where('visited_on', '>=', $today->copy()->subDays(13)->toDateString())
            ->selectRaw('visited_on, count(*) as views, count(distinct visitor_hash) as visitors')
            ->groupBy('visited_on')->get()->keyBy('visited_on');

        $chart = [];
        for ($i = 13; $i >= 0; $i--) {
            $d = $today->copy()->subDays($i)->toDateString();
            $chart[] = [
                'date'     => $today->copy()->subDays($i)->format('d/m'),
                'views'    => (int) ($raw[$d]->views ?? 0),
                'visitors' => (int) ($raw[$d]->visitors ?? 0),
            ];
        }
        $chartMax = max(1, collect($chart)->max('views'));

        // Bài xem nhiều nhất (theo view_count tích luỹ).
        $topLessons = Lesson::where('view_count', '>', 0)
            ->orderByDesc('view_count')->take(10)->get(['title', 'slug', 'view_count', 'phase']);

        // Trang được xem nhiều nhất 30 ngày.
        $topPaths = DB::table('page_visits')
            ->where('visited_on', '>=', $today->copy()->subDays(29)->toDateString())
            ->select('path', DB::raw('count(*) as c'), DB::raw('count(distinct visitor_hash) as u'))
            ->groupBy('path')->orderByDesc('c')->take(12)->get();

        return view('admin.stats.index', compact('kpi', 'chart', 'chartMax', 'topLessons', 'topPaths'));
    }
}
