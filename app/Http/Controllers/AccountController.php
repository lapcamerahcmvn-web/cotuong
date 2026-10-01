<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonProgress;
use App\Models\PuzzleAttempt;
use App\Models\UserDailyActivity;
use App\Services\Gamification\AchievementService;
use App\Services\Gamification\GamificationService;
use App\Services\LearningPathService;
use App\Services\PuzzleService;
use App\Support\Vn;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    public function index(GamificationService $gami, AchievementService $ach, LearningPathService $paths, PuzzleService $puzzles)
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

        // Lịch hoạt động 18 tuần (heatmap) — key = ngày VN.
        $from = Vn::now()->subWeeks(17)->startOfWeek()->toDateString();
        $activity = UserDailyActivity::where('user_id', $user->id)->where('date', '>=', $from)
            ->get()->mapWithKeys(fn ($r) => [substr((string) $r->date, 0, 10) => (int) $r->xp])->all();

        $attempts = PuzzleAttempt::where('user_id', $user->id);
        $puzzleStats = [
            'solved' => (clone $attempts)->where('result', 'solved')->distinct()->count('puzzle_id'),
            'total' => (clone $attempts)->count(),
            'ok' => (clone $attempts)->where('result', 'solved')->count(),
        ];

        return view('account.index', [
            'user' => $user, 'completed' => $completed, 'reading' => $reading, 'suggested' => $suggested,
            'snap' => $gami->snapshot($user),
            'achievements' => $ach->board($user),
            'courses' => $paths->summary($user),
            'activity' => $activity, 'activityFrom' => $from,
            'puzzleStats' => $puzzleStats,
            'weak' => $puzzles->weakSkills($user, 4),
            'dueCount' => $puzzles->dueCount($user),
            'libraryCount' => $user->library()->count(),
        ]);
    }

    public function settings()
    {
        return view('account.settings', ['user' => Auth::user()]);
    }

    public function saveSettings(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:60'],
            'daily_goal_xp' => ['required', 'in:' . implode(',', array_keys(config('gamification.daily_goals')))],
            'leaderboard_opt_out' => ['nullable', 'boolean'],
        ]);
        Auth::user()->update([
            'name' => $data['name'],
            'daily_goal_xp' => (int) $data['daily_goal_xp'],
            'leaderboard_opt_out' => $request->boolean('leaderboard_opt_out'),
        ]);

        return redirect()->route('account.settings')->with('ok', 'Đã lưu cài đặt.');
    }

    /** Chọn điểm xuất phát (onboarding) + mục tiêu ngày. */
    public function onboarding(Request $request)
    {
        $data = $request->validate([
            'level' => ['required', 'in:beginner,intermediate'],
            'daily_goal_xp' => ['nullable', 'in:' . implode(',', array_keys(config('gamification.daily_goals')))],
        ]);
        $u = Auth::user();
        $u->update(['onboarding_level' => $data['level']] + (isset($data['daily_goal_xp']) ? ['daily_goal_xp' => (int) $data['daily_goal_xp']] : []));

        $to = $data['level'] === 'beginner'
            ? ($u->nextLesson() ? route('lessons.show', $u->nextLesson()->slug) : route('phase', 'nhap-mon'))
            : route('practice.placement');

        return $request->expectsJson() ? response()->json(['redirect' => $to]) : redirect($to);
    }
}
