<?php

namespace App\Http\Controllers;

use App\Models\GameMistake;
use App\Services\MistakeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// "Sai lầm của tôi": luyện lại các nước sai trong ván của chính mình (lặp ngắt quãng).
class MistakeController extends Controller
{
    public function index(MistakeService $svc)
    {
        $u = Auth::user();
        // Ván phân tích trước khi có tính năng này (hoặc lỡ lỗi mạng lúc lưu) → đồng bộ bù, idempotent.
        \App\Models\GameRecord::where('user_id', $u->id)->whereNotNull('analysis')->latest('updated_at')->limit(30)->get()
            ->each(fn ($r) => $svc->syncFromRecord($r));
        $due = $svc->dueQuery($u)->with('record')->orderBy('due_on')->orderByDesc('loss')->limit(20)->get();

        return view('practice.mistakes', [
            'items' => $due->map(fn ($m) => $svc->payload($m))->values(),
            'stats' => $svc->stats($u),
            'recentGames' => \App\Models\GameRecord::where('user_id', $u->id)->whereNull('analysis')->where('plies', '>=', 10)->latest()->limit(3)->get(),
        ]);
    }

    public function answer(Request $request, GameMistake $mistake, MistakeService $svc): JsonResponse
    {
        abort_unless($mistake->user_id === Auth::id(), 403);
        // move rỗng = bấm "Xem đáp án" (tính như chưa đúng).
        $data = $request->validate(['move' => ['nullable', 'string', 'regex:/^[a-i]\d[a-i]\d$/']]);

        return response()->json($svc->answer(Auth::user(), $mistake, (string) ($data['move'] ?? '')));
    }
}
