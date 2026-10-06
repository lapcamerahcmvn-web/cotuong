<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameInvite;
use App\Models\User;
use App\Services\GameService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

// Mời bạn bè đang online vào ván: gửi (tối đa 3 lời/10 phút) → người nhận thấy thông báo (poll 20s) →
// Đồng ý: tự tạo phòng, cả hai vào ván · Không đồng ý: báo lại người mời. Lời mời hết hạn sau 2 phút.
class InviteController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $data = $request->validate([
            'to' => ['required', 'integer'],
            'variant' => ['nullable', 'in:' . implode(',', array_keys(Game::VARIANTS))],
            'time' => ['nullable', 'in:' . implode(',', array_keys(Game::TIME_CONTROLS))],
            'side' => ['nullable', 'in:do,den,random'],
        ]);
        $me = Auth::user();
        $to = User::find($data['to']);
        $friend = $to && ($me->following()->whereKey($to->id)->exists() || $me->followers()->whereKey($to->id)->exists());
        $err = match (true) {
            ! $to || $to->id === $me->id || ! $friend || $to->leaderboard_opt_out => 'Chỉ mời được bạn bè (người bạn theo dõi hoặc theo dõi bạn).',
            (bool) $to->banned_at || ! $to->isOnline() => $to->name . ' hiện không online.',
            GameInvite::left($me) === 0 => 'Bạn đã gửi ' . GameInvite::LIMIT . ' lời mời trong ' . GameInvite::WINDOW . ' phút — chờ một chút rồi mời tiếp nhé.',
            GameInvite::where('from_user_id', $me->id)->where('to_user_id', $to->id)->where('status', 'pending')
                ->where('created_at', '>=', now()->subSeconds(GameInvite::TTL))->exists() => 'Bạn đã mời ' . $to->name . ' — đang chờ trả lời.',
            default => null,
        };
        if ($err) {
            return response()->json(['ok' => false, 'error' => $err, 'left' => GameInvite::left($me)], 422);
        }
        $inv = GameInvite::create([
            'from_user_id' => $me->id, 'to_user_id' => $to->id,
            'variant' => $data['variant'] ?? 'co-tuong', 'time_control' => (int) ($data['time'] ?? 600), 'from_side' => $data['side'] ?? 'random',
        ]);

        return response()->json(['ok' => true, 'id' => $inv->id, 'left' => GameInvite::left($me),
            'message' => 'Đã gửi lời mời tới ' . $to->name . ' — chờ bạn ấy trả lời (tối đa 2 phút).']);
    }

    /** Poll (20s, nhanh hơn khi vừa gửi lời mời): lời mời đến + kết quả lời mời mình đã gửi. */
    public function poll(): JsonResponse
    {
        $me = Auth::user();
        $fresh = now()->subSeconds(GameInvite::TTL);
        $incoming = GameInvite::with('from:id,name,level,avatar')->where('to_user_id', $me->id)->where('status', 'pending')
            ->where('created_at', '>=', $fresh)->latest()->limit(3)->get();

        // Kết quả cho người mời: đồng ý / từ chối / hết hạn (mỗi kết quả báo 1 lần).
        GameInvite::where('from_user_id', $me->id)->where('status', 'pending')->where('created_at', '<', $fresh)
            ->update(['status' => 'expired', 'responded_at' => now()]);
        $results = GameInvite::with(['to:id,name', 'game:id,code'])->where('from_user_id', $me->id)->where('sender_seen', false)
            ->whereIn('status', ['accepted', 'declined', 'expired'])->where('created_at', '>=', now()->subMinutes(15))->get();
        if ($results->isNotEmpty()) {
            GameInvite::whereIn('id', $results->pluck('id'))->update(['sender_seen' => true]);
        }

        return response()->json([
            'incoming' => $incoming->map(fn ($i) => [
                'id' => $i->id, 'name' => $i->from->name, 'level' => (int) $i->from->level, 'avatar' => $i->from->avatar,
                'variant' => Game::VARIANTS[$i->variant] ?? '', 'time' => Game::TIME_CONTROLS[$i->time_control] ?? '',
                'side' => match ($i->from_side) { 'do' => 'Bạn cầm Đen', 'den' => 'Bạn cầm Đỏ', default => 'Bốc thăm bên' },
                'expires_in' => max(0, GameInvite::TTL - (int) $i->created_at->diffInSeconds(now(), true)),
            ])->all(),
            'results' => $results->map(fn ($i) => ['id' => $i->id, 'status' => $i->status, 'name' => $i->to?->name,
                'url' => $i->game ? route('pvp.show', $i->game->code) : null])->all(),
            'pending_sent' => GameInvite::where('from_user_id', $me->id)->where('status', 'pending')->where('created_at', '>=', $fresh)->count(),
        ]);
    }

    public function accept(GameInvite $invite, GameService $games): JsonResponse
    {
        $me = Auth::user();
        abort_unless($invite->to_user_id === $me->id, 403);
        $res = DB::transaction(function () use ($invite, $me, $games) {
            $inv = GameInvite::whereKey($invite->id)->lockForUpdate()->first();
            if ($inv->status !== 'pending' || $inv->expired()) return null;
            $from = User::find($inv->from_user_id);
            if (! $from || $from->banned_at) return null;
            $g = $games->create($from, $inv->from_side, (int) $inv->time_control, $inv->variant);
            $g = $games->join($g, $me);
            $inv->update(['status' => 'accepted', 'game_id' => $g->id, 'responded_at' => now()]);

            return $g;
        });
        if (! $res) {
            return response()->json(['ok' => false, 'error' => 'Lời mời đã hết hạn hoặc đã bị huỷ.'], 422);
        }

        return response()->json(['ok' => true, 'url' => route('pvp.show', $res->code)]);
    }

    public function decline(GameInvite $invite): JsonResponse
    {
        abort_unless($invite->to_user_id === Auth::id(), 403);
        if ($invite->status === 'pending') {
            $invite->update(['status' => 'declined', 'responded_at' => now()]);
        }

        return response()->json(['ok' => true]);
    }
}
