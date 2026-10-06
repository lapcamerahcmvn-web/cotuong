<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
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
    public function bot(Request $request, GameRecordService $records)
    {
        // "Chơi tiếp với máy từ thế này" (từ lịch sử ván / thư viện): ?tu-the=FEN&luot=do|den[&tui=RRC..-rrc..]
        $custom = null;
        $fen = (string) $request->query('tu-the', '');
        if ($fen !== '') {
            $redFirst = $request->query('luot') !== 'den';
            if ($records->validStart($fen, $redFirst)) {
                $tui = (string) $request->query('tui', '');
                $pool = preg_match('/^([RNBACP]{0,15})-([rnbacp]{0,15})$/', $tui, $m) ? ['red' => str_split($m[1]), 'black' => str_split(strtoupper($m[2]))] : null;
                $custom = ['fen' => $fen, 'redFirst' => $redFirst, 'pool' => $pool];
                // Mở từ bài học (&bai=slug, cùng thế mở đầu): kèm "sổ lời giải" của bài → máy đi theo sách khi thế cờ
                // còn nằm trong cây biến, ra khỏi sách mới để engine tự tính.
                if ($lesson = $this->lessonFor((string) $request->query('bai', ''), $fen)) {
                    $custom['book'] = $this->lessonBook($lesson);
                    $custom['lesson'] = ['title' => $lesson->title, 'url' => route('lessons.show', $lesson->slug)];
                }
                // Từ "Xếp cờ để thẩm": &cam=do|den|may (may = máy tự giải cả hai bên) &cap=1..4 → vào ván ngay.
                if (in_array($request->query('cam'), ['do', 'den', 'may'], true)) {
                    $custom += ['human' => $request->query('cam'), 'level' => max(1, min(4, (int) $request->query('cap', 4))), 'autostart' => true];
                }
            } else {
                $custom = ['invalid' => true];
            }
        }

        return view('play.bot', compact('custom'));
    }

    private function lessonFor(string $slug, string $fen): ?Lesson
    {
        if ($slug === '' || ! preg_match('/^[a-z0-9-]{1,191}$/', $slug)) return null;
        $lesson = Lesson::published()->where('slug', $slug)->first();

        return $lesson && $lesson->initial_fen === $fen ? $lesson : null;
    }

    /** Sổ lời giải: "FEN bàn + r|b (bên đi)" → nước ICCS của sách (mạch chính ưu tiên — children[0]). */
    private function lessonBook(Lesson $lesson): array
    {
        $book = [];
        $put = function (string $fenBefore, string $side, ?string $iccs) use (&$book) {
            if (! $iccs || ! preg_match('/^[a-i]\d[a-i]\d$/', $iccs)) return;
            $key = $fenBefore.' '.($side === 'den' ? 'b' : 'r');
            $book[$key] ??= $iccs;
        };
        $tree = $lesson->variation_tree;
        if (is_string($tree)) $tree = json_decode($tree, true);
        if (is_array($tree) && $tree) {
            $walk = function (array $nodes, string $fenBefore) use (&$walk, $put) {
                foreach ($nodes as $n) {
                    $put($fenBefore, (string) ($n['side'] ?? ''), $n['iccs'] ?? null);
                    if (! empty($n['children']) && ! empty($n['fen'])) $walk($n['children'], (string) $n['fen']);
                }
            };
            $walk($tree, (string) $lesson->initial_fen);
        } else {
            $before = (string) $lesson->initial_fen;
            foreach ($lesson->steps()->orderBy('step_order')->get() as $st) {
                $put($before, (string) $st->move_side, $st->move_notation_iccs);
                $before = (string) $st->fen;
            }
        }

        return array_slice($book, 0, 600, true);
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
            'start_fen' => ['nullable', 'string', 'max:100'],
            'first_side' => ['nullable', 'in:do,den'],
        ]);
        $u = Auth::user();
        // Lưu lịch sử ván (mọi kết quả) — server kiểm tra lại luật từng nước, ván sai luật thì bỏ qua.
        $record = ! empty($data['moves']) ? $records->storeBot($u, $data) : null;
        $recordUrl = $record ? route('history.show', $record) : null;
        // Ván thắng hợp lệ cần ít nhất vài nước và thời gian chơi tối thiểu (chặn gửi tay).
        // Ván chơi tiếp từ 1 thế tuỳ chọn không tính XP (có thể chọn sẵn thế thắng).
        $custom = ! empty($data['start_fen']);
        if ($custom || $data['result'] !== 'win' || $data['plies'] < 10 || ($data['ms'] ?? 0) < 20000) {
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
