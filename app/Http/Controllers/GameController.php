<?php

namespace App\Http\Controllers;

use App\Models\Game;
use App\Models\GameInvite;
use App\Models\User;
use App\Services\GameService;
use App\Services\SocialService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

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
            'variant' => ['nullable', 'in:' . implode(',', array_keys(Game::VARIANTS))],
        ]);
        $active = Game::where('creator_id', Auth::id())->where('status', 'waiting')->count();
        if ($active >= 5) {
            return back()->withErrors(['side' => 'Bạn đang có 5 phòng chờ — huỷ bớt hoặc chờ bạn vào trước.']);
        }
        $g = $this->games->create(Auth::user(), $data['side'], (int) $data['time'], $data['variant'] ?? 'co-tuong');

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
        // Xem ván đang/đã đấu: cần đăng nhập (ai có mã phòng / link đều xem được). Phòng chờ: khách thấy lời mời + nút đăng nhập.
        if (! Auth::check() && $g->status !== 'waiting') {
            return redirect()->guest(route('login'));
        }

        return view('play.pvp', ['game' => $g, 'state' => $g->state(Auth::user()) + ['watchers' => $this->watchers($g)]]);
    }

    /** Sảnh (JSON, làm mới 20s): bạn bè đang online + các phòng đang thi đấu. */
    public function lobbyData(SocialService $social): JsonResponse
    {
        $me = Auth::user();
        $ids = array_values(array_unique(array_merge(
            $social->followingIds($me),
            $me->followers()->where('users.leaderboard_opt_out', false)->pluck('users.id')->map(fn ($i) => (int) $i)->all(),
        )));
        $online = User::whereIn('id', $ids)->whereNull('banned_at')->where('last_seen_at', '>=', now()->subMinutes(User::ONLINE_MINUTES))
            ->orderByDesc('last_seen_at')->limit(30)->get(['id', 'name', 'avatar', 'level', 'last_seen_at']);
        $busy = Game::where('status', 'playing')->where('updated_at', '>=', now()->subMinutes(30))
            ->where(fn ($q) => $q->whereIn('red_user_id', $online->pluck('id'))->orWhereIn('black_user_id', $online->pluck('id')))
            ->get(['code', 'red_user_id', 'black_user_id']);
        $busyCode = [];
        foreach ($busy as $b) { $busyCode[$b->red_user_id] = $b->code; $busyCode[$b->black_user_id] = $b->code; }

        $live = Game::with(['red:id,name,level', 'black:id,name,level'])->where('status', 'playing')
            ->where('updated_at', '>=', now()->subMinutes(30))->latest('updated_at')->limit(20)->get();

        return response()->json([
            'friends' => $online->map(fn ($u) => ['id' => $u->id, 'name' => $u->name, 'level' => (int) $u->level, 'avatar' => $u->avatar,
                'url' => $u->profileUrl(), 'playing' => $busyCode[$u->id] ?? null])->all(),
            'live' => $live->map(fn ($g) => ['code' => $g->code, 'variant' => $g->variant, 'red' => $g->red?->name, 'black' => $g->black?->name,
                'red_level' => (int) $g->red?->level, 'black_level' => (int) $g->black?->level, 'plies' => count($g->moves ?? []),
                'time' => Game::TIME_CONTROLS[$g->time_control] ?? '', 'mine' => (bool) $g->sideOf($me), 'watchers' => $this->watchers($g)])->all(),
            'invites_left' => GameInvite::left($me),
        ]);
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
        $u = Auth::user();
        if ($u && ! $g->sideOf($u) && $g->status === 'playing') $this->watch($g, $u->id);
        if ((int) $request->query('v') === (int) $g->version && $g->status !== 'waiting') {
            return response()->json(['same' => true, 'clocks' => $g->time_control ? $g->clocks() : null, 'watchers' => $this->watchers($g)]);
        }
        $g->load(['red', 'black']);

        return response()->json($g->state($u) + ['watchers' => $this->watchers($g)]);
    }

    public function takeback(Request $request, string $code): JsonResponse
    {
        $g = $this->find($code);
        if ($request->has('accept')) {
            $g = $this->games->answerTakeback($g, Auth::user(), $request->boolean('accept'));

            return response()->json($g->load(['red', 'black'])->state(Auth::user()));
        }
        $res = $this->games->requestTakeback($g, Auth::user());

        return response()->json(['ok' => $res['ok'], 'error' => $res['error'] ?? null] + $res['game']->load(['red', 'black'])->state(Auth::user()), $res['ok'] ? 200 : 422);
    }

    /** Người xem (đã đăng nhập, không phải người chơi): đánh dấu trong cache, coi là còn xem nếu poll trong 20 giây. */
    private function watch(Game $g, int $uid): void
    {
        $key = "pvp:watch:{$g->id}";
        $map = array_filter(Cache::get($key, []), fn ($t) => $t >= time() - 20);
        $map[$uid] = time();
        Cache::put($key, $map, 120);
    }

    private function watchers(Game $g): int
    {
        return count(array_filter(Cache::get("pvp:watch:{$g->id}", []), fn ($t) => $t >= time() - 20));
    }

    public function move(Request $request, string $code): JsonResponse
    {
        $mv = $request->validate(['move' => ['required', 'regex:/^[a-i]\d[a-i]\d$/']])['move'];
        $res = $this->games->move($this->find($code), Auth::user(), $mv, $request->boolean('confirm'));
        $g = $res['game']->load(['red', 'black']);

        // 409 + confirm: nước gây lặp thế lần 3 — client hỏi người chơi rồi gửi lại kèm confirm=1.
        return response()->json(['ok' => $res['ok'], 'error' => $res['error'] ?? null, 'confirm' => $res['confirm'] ?? null] + $g->state(Auth::user()),
            $res['ok'] ? 200 : (isset($res['confirm']) ? 409 : 422));
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
