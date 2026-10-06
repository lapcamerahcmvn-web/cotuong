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

        // ---- Người dùng, học tập, luyện tập, chơi (Admin nâng cấp 10/2026) ----
        $d7 = $today->copy()->subDays(6)->toDateString();
        $d30 = $today->copy()->subDays(29)->toDateString();
        $users = [
            'total' => DB::table('users')->count(),
            'new7' => DB::table('users')->where('created_at', '>=', $d7)->count(),
            'new30' => DB::table('users')->where('created_at', '>=', $d30)->count(),
            'dau' => DB::table('user_daily_activity')->where('date', $today->toDateString())->count(),
            'wau' => DB::table('user_daily_activity')->where('date', '>=', $d7)->distinct('user_id')->count('user_id'),
            'mau' => DB::table('user_daily_activity')->where('date', '>=', $d30)->distinct('user_id')->count('user_id'),
            'google' => DB::table('users')->whereNotNull('google_id')->count(),
            'banned' => DB::table('users')->whereNotNull('banned_at')->count(),
        ];
        $logins = DB::table('login_events')->where('created_at', '>=', $d7)
            ->selectRaw('method, success, count(*) c')->groupBy('method', 'success')->get();

        // Chuỗi 14 ngày: đăng ký mới · người học hoạt động · bài hoàn thành · lượt giải thế cờ.
        $from14 = $today->copy()->subDays(13);
        $series = function ($table, $col, $extra = null) use ($from14) {
            $q = DB::table($table)->where($col, '>=', $from14->toDateString());
            if ($extra) $extra($q);
            return $q->selectRaw("DATE($col) d, count(*) c")->groupBy('d')->pluck('c', 'd');
        };
        $sNew = $series('users', 'created_at');
        $sActive = DB::table('user_daily_activity')->where('date', '>=', $from14->toDateString())->selectRaw('date d, count(*) c')->groupBy('d')->pluck('c', 'd');
        $sLessons = $series('lesson_progress', 'completed_at', fn ($q) => $q->whereNotNull('completed_at'));
        $sPuzzles = $series('puzzle_attempts', 'created_at');
        $learn14 = [];
        for ($i = 13; $i >= 0; $i--) {
            $d = $today->copy()->subDays($i);
            $k = $d->toDateString();
            $learn14[] = ['date' => $d->format('d/m'), 'new' => (int) ($sNew[$k] ?? 0), 'active' => (int) ($sActive[$k] ?? 0),
                'lessons' => (int) ($sLessons[$k] ?? 0), 'puzzles' => (int) ($sPuzzles[$k] ?? 0)];
        }

        $learn = [
            'lessons7' => DB::table('lesson_progress')->whereNotNull('completed_at')->where('completed_at', '>=', $d7)->count(),
            'lessons30' => DB::table('lesson_progress')->whereNotNull('completed_at')->where('completed_at', '>=', $d30)->count(),
            'xp30' => (int) DB::table('xp_transactions')->where('local_date', '>=', $d30)->sum('amount'),
        ];
        $puzzleModes = DB::table('puzzle_attempts')->where('created_at', '>=', $d30)
            ->selectRaw("mode, count(*) c, sum(result = 'solved') ok")->groupBy('mode')->orderByDesc('c')->get();
        $sessions = DB::table('practice_sessions')->where('started_at', '>=', $d30)->selectRaw('mode, count(*) c, max(score) best')->groupBy('mode')->get()->keyBy('mode');

        $botByLevel = DB::table('game_records')->where('mode', 'bot')->where('created_at', '>=', $d30)
            ->selectRaw("level, variant, count(*) c, sum(result = 'win') w, sum(result = 'loss') l, sum(result = 'draw') d")
            ->groupBy('level', 'variant')->orderBy('variant')->orderBy('level')->get();
        $pvp = [
            'finished30' => DB::table('games')->where('status', 'finished')->where('updated_at', '>=', $d30)->count(),
            'coup30' => DB::table('games')->where('status', 'finished')->where('variant', 'co-up')->where('updated_at', '>=', $d30)->count(),
            'playing' => DB::table('games')->where('status', 'playing')->count(),
        ];
        $topLearners = DB::table('xp_transactions')->join('users', 'users.id', '=', 'xp_transactions.user_id')
            ->where('xp_transactions.local_date', '>=', $d7)
            ->selectRaw('users.id, users.name, sum(xp_transactions.amount) xp')->groupBy('users.id', 'users.name')
            ->orderByDesc('xp')->limit(10)->get();

        return view('admin.stats.index', compact('kpi', 'chart', 'chartMax', 'topLessons', 'topPaths',
            'users', 'logins', 'learn14', 'learn', 'puzzleModes', 'sessions', 'botByLevel', 'pvp', 'topLearners'));
    }
}
