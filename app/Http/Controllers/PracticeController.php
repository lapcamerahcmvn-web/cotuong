<?php

namespace App\Http\Controllers;

use App\Models\PracticeSession;
use App\Models\Puzzle;
use App\Services\DailyPuzzleService;
use App\Services\PracticeSessionService;
use App\Services\PuzzleService;
use App\Support\Vn;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// Khu Luyện tập: hub, thế cờ hôm nay, 60 giây, 3 mạng, theo chủ đề, luyện lỗi sai, kiểm tra trình độ.
class PracticeController extends Controller
{
    public function __construct(
        private PuzzleService $puzzles,
        private DailyPuzzleService $daily,
        private PracticeSessionService $sessions,
    ) {}

    public function hub()
    {
        $u = Auth::user();
        $skills = collect(config('puzzle-skills.skills'))->map(fn ($s, $slug) => $s + [
            'slug' => $slug, 'count' => Puzzle::published()->skill($slug)->count(),
        ])->filter(fn ($s) => $s['count'] > 0);

        return view('practice.hub', [
            'daily' => $this->daily->forDate(),
            'skills' => $skills,
            'total' => Puzzle::published()->count(),
            'dueCount' => $u ? $this->puzzles->dueCount($u) : 0,
            'mistakesDue' => $u ? app(\App\Services\MistakeService::class)->dueCount($u) : 0,
            'weak' => $u ? $this->puzzles->weakSkills($u) : [],
            'secondsLeft' => Vn::secondsToMidnight(),
        ]);
    }

    public function daily()
    {
        $p = $this->daily->forDate();
        abort_unless($p, 404);
        $solved = Auth::check() && \App\Models\XpTransaction::where('user_id', Auth::id())->where('idem_key', 'daily:' . Vn::today())->exists();

        return view('practice.play', [
            'mode' => 'daily',
            'title' => 'Thế cờ hôm nay',
            'lede' => 'Một thế cờ mỗi ngày cho mọi người — giải đúng lần đầu nhận +' . config('gamification.xp.daily_puzzle') . ' XP.',
            'first' => $p,
            'solveRate' => $this->daily->solveRate($p),
            'alreadySolved' => $solved,
            'secondsLeft' => Vn::secondsToMidnight(),
        ]);
    }

    public function topic(string $skill)
    {
        $def = config('puzzle-skills.skills.' . $skill);
        abort_unless($def, 404);
        $first = $this->puzzles->pick(Auth::user(), $skill);
        abort_unless($first, 404);

        return view('practice.play', [
            'mode' => 'topic', 'skill' => $skill,
            'title' => 'Luyện chủ đề: ' . $def['name'],
            'lede' => $def['desc'] . ' Mỗi lượt 10 thế, độ khó theo trình độ của bạn.',
            'first' => $first, 'rounds' => 10,
        ]);
    }

    public function review()
    {
        $due = $this->puzzles->dueReviews(Auth::user(), 10);

        return view('practice.play', [
            'mode' => 'review',
            'title' => 'Luyện lỗi sai',
            'lede' => 'Những thế bạn từng giải sai, ôn lại theo lịch giãn cách (1 → 3 → 7 → 14 ngày). Đúng 2 lần liên tiếp là thuộc.',
            'first' => $due->first(),
            'queue' => $due->pluck('id')->values(),
            'items' => $due,
            'rounds' => $due->count(),
        ]);
    }

    public function placement()
    {
        $ids = [];
        foreach ([900, 1100, 1300, 1500, 1700] as $r) {
            $p = $this->puzzles->pick(null, null, $ids, $r, 3);
            if ($p) $ids[] = $p->id;
        }
        abort_if(! $ids, 404);

        return view('practice.play', [
            'mode' => 'placement',
            'title' => 'Kiểm tra trình độ',
            'lede' => '5 thế cờ từ dễ đến khó — làm xong, chúng tôi gợi ý chặng học phù hợp với bạn.',
            'first' => Puzzle::find($ids[0]),
            'queue' => $ids, 'rounds' => count($ids),
            'items' => Puzzle::with('lesson')->whereIn('id', $ids)->get()->sortBy(fn ($p) => array_search($p->id, $ids))->values(),
        ]);
    }

    public function rush()
    {
        return view('practice.session', [
            'mode' => 'rush', 'title' => '60 giây',
            'lede' => 'Giải càng nhiều thế càng tốt trong 60 giây. Sai một thế bị trừ 5 giây.',
            'best' => Auth::user()?->rush_best,
        ]);
    }

    public function survival()
    {
        return view('practice.session', [
            'mode' => 'survival', 'title' => '3 mạng',
            'lede' => 'Không giới hạn thời gian, độ khó tăng dần. Sai 3 lần là kết thúc.',
            'best' => Auth::user()?->survival_best,
        ]);
    }

    /** Thế kế tiếp (chế độ chủ đề / lỗi sai / kiểm tra) — JSON. */
    public function next(Request $request): JsonResponse
    {
        $data = $request->validate([
            'mode' => ['required', 'in:topic,review,placement,lesson'],
            'skill' => ['nullable', 'string', 'max:30'],
            'exclude' => ['nullable', 'array', 'max:200'],
            'exclude.*' => ['integer'],
        ]);
        $exclude = $data['exclude'] ?? [];
        $p = match ($data['mode']) {
            'review' => Auth::check() ? $this->puzzles->dueReviews(Auth::user(), 30)->first(fn ($p) => ! in_array($p->id, $exclude, true)) : null,
            default => $this->puzzles->pick(Auth::user(), $data['skill'] ?? null, $exclude),
        };

        return response()->json(['puzzle' => $p?->load('lesson')->toBoardPayload()]);
    }

    public function attempt(Request $request, Puzzle $puzzle): JsonResponse
    {
        $data = $request->validate([
            'moves' => ['present', 'array', 'max:40'],
            'moves.*' => ['string', 'regex:/^[a-i]\d[a-i]\d$/'],
            'line' => ['nullable', 'array', 'max:60'],
            'line.*' => ['string', 'regex:/^[a-i]\d[a-i]\d$/'],
            'ms' => ['required', 'integer', 'min:0'],
            'mode' => ['required', 'in:' . implode(',', PuzzleService::MODES)],
            'revealed' => ['nullable', 'boolean'],
        ]);
        abort_if($puzzle->status !== 'published', 404);

        $res = $this->puzzles->submit(Auth::user(), $puzzle, $data['mode'], $data['moves'], (int) $data['ms'], (bool) ($data['revealed'] ?? false), null, $data['line'] ?? null);

        return response()->json([
            'ok' => $res['ok'],
            'expected' => $res['verify']['expected'],
            'wrong_ply' => $res['verify']['wrong_ply'],
            'rating' => $res['rating'],
            'gamification' => $res['gamification'],
            'stats' => ['rate' => $puzzle->fresh()->successRate()],
        ]);
    }

    public function sessionStart(Request $request): JsonResponse
    {
        $mode = $request->validate(['mode' => ['required', 'in:rush,survival']])['mode'];
        $s = $this->sessions->start(Auth::user(), $mode);
        abort_if(! $s->puzzle_ids, 404);

        return response()->json(['uuid' => $s->uuid] + $this->sessions->state($s, Auth::user(), null));
    }

    public function sessionAnswer(Request $request, string $uuid): JsonResponse
    {
        $s = $this->findSession($uuid);
        $data = $request->validate([
            'puzzle_id' => ['required', 'integer'],
            'moves' => ['present', 'array', 'max:20'],
            'moves.*' => ['string', 'regex:/^[a-i]\d[a-i]\d$/'],
            'line' => ['nullable', 'array', 'max:60'],
            'line.*' => ['string', 'regex:/^[a-i]\d[a-i]\d$/'],
            'ms' => ['required', 'integer', 'min:0'],
        ]);

        return response()->json($this->sessions->answer($s, Auth::user(), (int) $data['puzzle_id'], $data['moves'], (int) $data['ms'], $data['line'] ?? null));
    }

    public function sessionFinish(string $uuid): JsonResponse
    {
        $s = $this->findSession($uuid);
        if (! $s->isOver() && $s->mode === 'rush' && $s->expires_at && now()->lessThan($s->expires_at->copy()->subSeconds(2))) {
            abort(422, 'Chưa hết giờ');
        }

        return response()->json($this->sessions->finish($s, Auth::user()));
    }

    private function findSession(string $uuid): PracticeSession
    {
        $s = PracticeSession::where('uuid', $uuid)->firstOrFail();
        abort_if($s->user_id && $s->user_id !== Auth::id(), 403);

        return $s;
    }
}
