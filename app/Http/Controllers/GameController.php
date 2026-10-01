<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Services\GameService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// Thách đấu bạn bè qua link: /dau-ban (sảnh) → tạo phòng → gửi link → bạn bấm "Nhận lời" → chơi.
class GameController extends Controller
{
    public function __construct(private GameService $games) {}

    public function lobby()
    {
        $u = Auth::user();
        $mine = $u ? Game::with(['red', 'black'])
            ->where(fn ($q) => $q->where('red_user_id', $u->id)->orWhere('black_user_id', $u->id))
            ->latest('updated_at')->take(10)->get() : collect();

        return view('play.lobby', ['mine' => $mine]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'side' => ['required', 'in:do,den,random'],
            'time' => ['required', 'in:' . implode(',', array_keys(Game::TIME_CONTROLS))],
        ]);
        $active = Game::where('creator_id', Auth::id())->where('status', 'waiting')->count();
        if ($active >= 5) {
            return back()->withErrors(['side' => 'Bạn đang có 5 phòng chờ — huỷ bớt hoặc chờ bạn vào trước.']);
        }
        $g = $this->games->create(Auth::user(), $data['side'], (int) $data['time']);

        return redirect()->route('pvp.show', $g->code);
    }

    public function joinByCode(Request $request)
    {
        $code = strtoupper(trim((string) $request->validate(['code' => ['required', 'string', 'max:12']])['code']));

        return Game::where('code', $code)->exists()
            ? redirect()->route('pvp.show', $code)
            : back()->withErrors(['code' => 'Không tìm thấy phòng có mã ' . $code . '.']);
    }

    public function show(string $code)
    {
        $g = $this->games->refresh(Game::with(['red', 'black'])->where('code', strtoupper($code))->firstOrFail());

        return view('play.pvp', ['game' => $g, 'state' => $g->state(Auth::user())]);
    }

    public function accept(string $code)
    {
        $g = $this->games->join($this->find($code), Auth::user());

        return redirect()->route('pvp.show', $g->code);
    }

    /** Polling: trả nhanh {same:true} nếu ván chưa đổi so với version client đang có. */
    public function state(Request $request, string $code): JsonResponse
    {
        $g = $this->games->refresh($this->find($code));
        if ((int) $request->query('v') === (int) $g->version && $g->status !== 'waiting') {
            return response()->json(['same' => true, 'clocks' => $g->time_control ? $g->clocks() : null]);
        }
        $g->load(['red', 'black']);

        return response()->json($g->state(Auth::user()));
    }

    public function move(Request $request, string $code): JsonResponse
    {
        $mv = $request->validate(['move' => ['required', 'regex:/^[a-i]\d[a-i]\d$/']])['move'];
        $res = $this->games->move($this->find($code), Auth::user(), $mv);
        $g = $res['game']->load(['red', 'black']);

        return response()->json(['ok' => $res['ok'], 'error' => $res['error'] ?? null] + $g->state(Auth::user()), $res['ok'] ? 200 : 422);
    }

    public function resign(Request $request, string $code)
    {
        $g = $this->games->resign($this->find($code), Auth::user());
        if (! $request->expectsJson()) {
            return redirect()->route('pvp.lobby');   // nút "Huỷ phòng" là form thường
        }

        return response()->json($g->load(['red', 'black'])->state(Auth::user()));
    }

    public function draw(Request $request, string $code): JsonResponse
    {
        $g = $request->boolean('decline')
            ? $this->games->declineDraw($this->find($code), Auth::user())
            : $this->games->offerDraw($this->find($code), Auth::user());

        return response()->json($g->load(['red', 'black'])->state(Auth::user()));
    }

    private function find(string $code): Game
    {
        return Game::where('code', strtoupper($code))->firstOrFail();
    }
}
