<?php

namespace App\Http\Controllers;

use App\Models\GameRecord;
use App\Models\LessonProgress;
use App\Models\PuzzleAttempt;
use App\Models\User;
use App\Services\Gamification\LeaderboardService;
use App\Services\Gamification\LevelService;
use App\Services\Gamification\StreakService;
use App\Services\Gamification\WeeklyService;
use App\Services\SocialService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

// Hồ sơ kỳ thủ công khai + theo dõi + trang "Bạn bè" (bảng XP tuần bạn bè, hoạt động gần đây).
class ProfileController extends Controller
{
    private function resolve(string $ref): User
    {
        abort_unless(preg_match('/^(\d+)(?:-[a-z0-9-]*)?$/', $ref, $m), 404);

        return User::findOrFail((int) $m[1]);
    }

    public function show(string $ref, LeaderboardService $lb, StreakService $streaks, WeeklyService $weekly, SocialService $social)
    {
        $user = $this->resolve($ref);
        $me = Auth::user();
        $self = $me && $me->id === $user->id;
        abort_unless($user->isPublic() || $self, 404);
        if ($ref !== basename(parse_url($user->profileUrl(), PHP_URL_PATH))) {
            return redirect()->to($user->profileUrl(), 301);
        }

        $games = GameRecord::where('user_id', $user->id)->selectRaw('result, COUNT(*) as n')->groupBy('result')->pluck('n', 'result');
        $defs = config('achievements', []);
        $badges = $user->achievements()->latest('unlocked_at')->get()
            ->filter(fn ($a) => isset($defs[$a->key]))->map(fn ($a) => ['key' => $a->key, 'at' => $a->unlocked_at] + $defs[$a->key])->values();

        return view('profile.show', [
            'user' => $user,
            'self' => $self,
            'level' => LevelService::progress((int) $user->xp_total),
            'streak' => $streaks->current($user),
            'weekRank' => $user->isPublic() ? $lb->rankOf($user, 'xp', 'week') : null,
            'stats' => [
                'lessons' => LessonProgress::where('user_id', $user->id)->where('status', 'completed')->count(),
                'puzzles' => PuzzleAttempt::where('user_id', $user->id)->where('result', 'solved')->distinct()->count('puzzle_id'),
                'games' => (int) $games->sum(),
                'wins' => (int) ($games['win'] ?? 0),
            ],
            'badges' => $badges,
            'badgeTotal' => count($defs),
            'trophies' => $weekly->trophies($user),
            'shared' => GameRecord::where('user_id', $user->id)->whereNotNull('share_token')->latest()->limit(5)->get(),
            'followers' => $user->followers()->count(),
            'followingCount' => $user->following()->count(),
            'isFollowing' => $me && ! $self ? $me->following()->whereKey($user->id)->exists() : false,
            'followsMe' => $me && ! $self ? $user->following()->whereKey($me->id)->exists() : false,
        ]);
    }

    public function follow(string $ref, SocialService $social): JsonResponse
    {
        $user = $this->resolve($ref);
        $state = $social->toggle(Auth::user(), $user);
        if ($state === null) {
            return response()->json(['message' => 'Không thể theo dõi kỳ thủ này.'], 422);
        }

        return response()->json(['following' => $state, 'followers' => $user->followers()->count()]);
    }

    public function friends(SocialService $social)
    {
        $me = Auth::user();

        return view('profile.friends', [
            'me' => $me,
            'board' => $social->friendsBoard($me),
            'feed' => $social->feed($me),
            'following' => $me->following()->where('users.leaderboard_opt_out', false)->orderBy('name')->get(['users.id', 'name', 'avatar', 'level']),
            'followers' => $me->followers()->where('users.leaderboard_opt_out', false)->orderByPivot('created_at', 'desc')->limit(30)->get(['users.id', 'name', 'avatar', 'level']),
            'followingIds' => $social->followingIds($me),
        ]);
    }
}
