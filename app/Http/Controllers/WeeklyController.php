<?php

namespace App\Http\Controllers;

use App\Models\WeeklyAward;
use App\Services\Gamification\LeaderboardService;
use App\Services\Gamification\WeeklyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// Thử thách tuần + giải thưởng bảng xếp hạng tuần.
class WeeklyController extends Controller
{
    public function index(WeeklyService $weekly, LeaderboardService $lb)
    {
        $weekly->ensureFinalized();
        $u = Auth::user();

        return view('weekly', [
            'progress' => $u ? $weekly->progress($u) : null,
            'quests' => $weekly->quests(),
            'podium' => $weekly->podium(),
            'trophies' => $u ? $weekly->trophies($u) : null,
            'top' => array_slice($lb->top('xp', 'week'), 0, 10),
            'mine' => $u ? $lb->rankOf($u, 'xp', 'week') : null,
            'secondsLeft' => $weekly->secondsLeft(),
        ]);
    }

    public function claim(Request $request, WeeklyService $weekly): JsonResponse
    {
        $data = $request->validate(['quest' => ['required', 'string', 'max:30']]);
        $u = Auth::user();
        $g = $data['quest'] === 'chest' ? $weekly->claimChest($u) : $weekly->claim($u, $data['quest']);
        if ($g === null) {
            return response()->json(['message' => 'Chưa hoàn thành nhiệm vụ này.'], 422);
        }

        return response()->json(['gamification' => $g, 'progress' => $weekly->progress($u)]);
    }

    public function seen(WeeklyAward $award): JsonResponse
    {
        abort_unless($award->user_id === Auth::id(), 403);
        $award->update(['seen_at' => now()]);

        return response()->json(['ok' => true]);
    }
}
