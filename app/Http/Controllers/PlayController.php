<?php

namespace App\Http\Controllers;

use App\Models\XpTransaction;
use App\Services\GameRecordService;
use App\Services\Gamification\GamificationService;
use App\Support\Vn;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// Chơi với máy: engine chạy hoàn toàn trên trình duyệt (Web Worker). Server chỉ ghi nhận kết quả
// để cộng XP — không thẩm định được ván cờ nên giới hạn số ván tính XP mỗi ngày.
class PlayController extends Controller
{
    public function bot()
    {
        return view('play.bot');
    }

    public function botResult(Request $request, GamificationService $gami, GameRecordService $records): JsonResponse
    {
        $data = $request->validate([
            'level' => ['required', 'integer', 'between:1,4'],
            'result' => ['required', 'in:win,loss,draw'],
            'plies' => ['required', 'integer', 'min:0', 'max:400'],
            'hints' => ['nullable', 'integer', 'min:0'],
            'undos' => ['nullable', 'integer', 'min:0'],
            'ms' => ['nullable', 'integer', 'min:0'],
            'variant' => ['nullable', 'in:co-tuong,co-up'],
            'side' => ['nullable', 'in:do,den'],
            'reason' => ['nullable', 'string', 'max:60'],
            'moves' => ['nullable', 'array', 'max:400'],
            'moves.*' => ['string', 'regex:/^[a-i]\d[a-i]\d$/'],
            'reveals' => ['nullable', 'array', 'max:400'],
            'captured' => ['nullable', 'array', 'max:40'],
        ]);
        $u = Auth::user();
        // Lưu lịch sử ván (mọi kết quả) — server kiểm tra lại luật từng nước, ván sai luật thì bỏ qua.
        $record = ! empty($data['moves']) ? $records->storeBot($u, $data) : null;
        $recordUrl = $record ? route('history.show', $record) : null;
        // Ván thắng hợp lệ cần ít nhất vài nước và thời gian chơi tối thiểu (chặn gửi tay).
        if ($data['result'] !== 'win' || $data['plies'] < 10 || ($data['ms'] ?? 0) < 20000) {
            return response()->json(['gamification' => null, 'record_url' => $recordUrl]);
        }
        $today = Vn::today();
        $n = XpTransaction::where('user_id', $u->id)->where('reason', 'bot_win')->where('local_date', $today)->count();
        if ($n >= (int) config('gamification.caps.bot_wins_daily')) {
            return response()->json(['gamification' => null, 'capped' => true, 'record_url' => $recordUrl]);
        }
        $amount = (int) config('gamification.xp.bot_win.' . $data['level']);
        if (($data['hints'] ?? 0) > 0 || ($data['undos'] ?? 0) > 0) {
            $amount = intdiv($amount, 2);
        }

        return response()->json([
            'gamification' => $gami->record($u, 'bot_win', [
                'key' => 'bot:L' . $data['level'] . ':' . ($data['variant'] ?? 'co-tuong') . ':' . $today . ':' . ($n + 1),
                'amount' => $amount,
            ]),
            'record_url' => $recordUrl,
        ]);
    }
}
