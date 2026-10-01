<?php

namespace App\Http\Controllers;

use App\Services\Gamification\LeaderboardService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LeaderboardController extends Controller
{
    public function index(Request $request, LeaderboardService $lb)
    {
        $board = in_array($request->query('loai'), LeaderboardService::BOARDS, true) ? $request->query('loai') : 'xp';
        $period = array_key_exists((string) $request->query('ky'), LeaderboardService::PERIODS) ? $request->query('ky') : 'week';
        if ($board !== 'xp') {
            $period = 'all';
        }
        $rows = $lb->top($board, $period);
        $me = Auth::user();
        $mine = $me ? $lb->rankOf($me, $board, $period) : null;

        return view('leaderboard', compact('board', 'period', 'rows', 'me', 'mine'));
    }
}
