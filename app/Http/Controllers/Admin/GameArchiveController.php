<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GameRecord;
use App\Models\LessonSeries;
use App\Services\GameRecordService;
use App\Support\LessonComposer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// Kho ván đấu (Admin › Ván đấu): thống kê thắng máy theo cấp, lọc ván (mặc định: người chơi THẮNG máy), xem lại từng
// nước, tải về dạng chữ, tạo bài học nháp từ ván để làm tài liệu. Nguồn: game_records (người chơi tự lưu khi xong ván).
class GameArchiveController extends Controller
{
    public const LEVELS = [1 => 'Tập sự', 2 => 'Dễ', 3 => 'Vừa', 4 => 'Khó'];

    public function index(Request $request)
    {
        $q = GameRecord::query()->with('user:id,name,email');
        $mode = $request->get('mode', 'bot');
        if (in_array($mode, ['bot', 'pvp'], true)) $q->where('mode', $mode);
        $result = $request->get('kq', 'win');
        if (array_key_exists($result, GameRecord::RESULTS)) $q->where('result', $result);
        if (array_key_exists($lv = (int) $request->get('cap'), self::LEVELS)) $q->where('level', $lv);
        if (in_array($v = $request->get('bien-the'), ['co-tuong', 'co-up'], true)) $q->where('variant', $v);
        if ($request->get('phan-tich') === '1') $q->whereNotNull('analysis');
        if ($kw = trim((string) $request->get('q'))) {
            $q->whereHas('user', fn ($u) => $u->where('name', 'like', "%{$kw}%")->orWhere('email', 'like', "%{$kw}%"));
        }
        match ($request->get('sx')) {
            'ngan' => $q->orderBy('plies'),
            'dai' => $q->orderByDesc('plies'),
            default => $q->latest(),
        };

        // Thống kê ván với máy (toàn thời gian + 30 ngày) theo cấp và biến thể.
        $byLevel = DB::table('game_records')->where('mode', 'bot')
            ->selectRaw("variant, level, count(*) c, sum(result = 'win') w, sum(result = 'loss') l, sum(result = 'draw') d,
                sum(case when result = 'win' and created_at >= ? then 1 else 0 end) w30, avg(case when result = 'win' then plies end) avgw", [now()->subDays(30)])
            ->groupBy('variant', 'level')->orderBy('variant')->orderBy('level')->get();
        $from = now()->subDays(29)->startOfDay();
        $perDay = DB::table('game_records')->where('mode', 'bot')->where('result', 'win')->where('created_at', '>=', $from)
            ->selectRaw('DATE(created_at) d, count(*) c')->groupBy('d')->pluck('c', 'd');
        $days = [];
        for ($i = 29; $i >= 0; $i--) {
            $d = now()->subDays($i);
            $days[] = ['label' => $d->format('d/m'), 'c' => (int) ($perDay[$d->toDateString()] ?? 0)];
        }
        // Người thắng máy cấp Vừa/Khó nhiều nhất.
        $top = GameRecord::with('user:id,name')->where('mode', 'bot')->where('result', 'win')->where('level', '>=', 3)
            ->selectRaw('user_id, count(*) c, max(level) maxlv, min(plies) fastest')->groupBy('user_id')->orderByDesc('c')->limit(10)->get();

        return view('admin.games.index', [
            'games' => $q->paginate(30)->withQueryString(),
            'byLevel' => $byLevel, 'days' => $days, 'top' => $top,
            'levels' => self::LEVELS, 'results' => GameRecord::RESULTS,
            'filters' => ['mode' => $mode, 'kq' => $result],
        ]);
    }

    /** Xem lại ván (dùng lại trang xem lại của người học, chế độ quản trị: không lộ nút của chủ ván). */
    public function show(GameRecord $record, GameRecordService $svc)
    {
        $record->load('user');

        return view('account.history-show', [
            'record' => $record, 'steps' => $svc->stepsFor($record) ?? [], 'public' => true,
            'admin' => [
                'back' => route('admin.games.index'),
                'export' => route('admin.games.export', $record),
                'toLesson' => route('admin.games.lesson', $record),
                'user' => route('admin.users.show', $record->user_id),
                'series' => LessonSeries::orderBy('sort_order')->orderBy('id')->get(['id', 'name']),
                'level' => self::LEVELS[$record->level] ?? null,
            ],
        ]);
    }

    /** Tải ván về dạng chữ: thông tin ván + FEN bắt đầu + từng nước (ký hiệu Việt + ICCS). */
    public function export(GameRecord $record, GameRecordService $svc)
    {
        $record->load('user');
        $steps = $svc->stepsFor($record) ?? [];
        $lines = [
            'Ván: ' . $record->title(),
            'Người chơi: ' . ($record->user->name ?? '?') . ' (cầm ' . ($record->side === 'do' ? 'Đỏ' : 'Đen') . ')',
            'Đối thủ: ' . $record->opponent . ($record->level ? ' — cấp ' . (self::LEVELS[$record->level] ?? $record->level) : ''),
            'Kết quả: ' . (GameRecord::RESULTS[$record->result] ?? $record->result) . ($record->reason ? ' (' . $record->reason . ')' : ''),
            'Ngày: ' . $record->created_at?->timezone('Asia/Ho_Chi_Minh')->format('d/m/Y H:i'),
            'FEN bắt đầu: ' . $record->start_fen . ' — ' . ($record->redFirst() ? 'Đỏ' : 'Đen') . ' đi trước',
            '',
        ];
        foreach (array_chunk($steps, 2) as $i => $pair) {
            $lines[] = sprintf('%3d. %-22s %s', $i + 1,
                ($pair[0]['move_notation_wxf'] ?? '') . ' (' . ($pair[0]['move_notation_iccs'] ?? '') . ')',
                isset($pair[1]) ? ($pair[1]['move_notation_wxf'] ?? '') . ' (' . ($pair[1]['move_notation_iccs'] ?? '') . ')' : '');
        }
        $lines[] = '';
        $lines[] = 'ICCS: ' . implode(' ', array_map(fn ($s) => $s['move_notation_iccs'] ?? '', $steps));
        $name = 'van-' . $record->id . '-' . $record->created_at?->format('Ymd') . '.txt';

        return response(implode("\n", $lines) . "\n", 200, [
            'Content-Type' => 'text/plain; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="' . $name . '"',
        ]);
    }

    /** Tạo bài học NHÁP từ ván (thế bắt đầu + toàn bộ nước) → mở trình sửa bài để thêm lời giảng, cắt đoạn hay. */
    public function toLesson(Request $request, GameRecord $record, GameRecordService $svc)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:200'],
            'series_id' => ['nullable', 'integer', 'exists:lesson_series,id'],
            'from_ply' => ['nullable', 'integer', 'min:0'],
        ]);
        $steps = $svc->stepsFor($record) ?? [];
        $from = min((int) ($data['from_ply'] ?? 0), max(0, count($steps) - 1));
        $startFen = $from > 0 ? ($steps[$from - 1]['fen'] ?? $record->start_fen) : $record->start_fen;
        $slice = array_slice($steps, $from);
        $mapped = array_map(fn ($s) => ['fen' => $s['fen'], 'iccs' => $s['move_notation_iccs'], 'wxf' => $s['move_notation_wxf'],
            'side' => $s['move_side'], 'caption' => $s['caption'] ?? null], $slice);
        $lesson = LessonComposer::create([
            'title' => $data['title'], 'series_id' => $data['series_id'] ?? null,
            'game_mode' => $record->isCoup() ? 'co-up' : 'co-tuong', 'level' => ($record->level ?? 0) >= 3 ? 'nang-cao' : 'trung-cap',
            'status' => 'draft', 'initial_fen' => $startFen,
            'summary' => 'Ván ' . (GameRecord::RESULTS[$record->result] ?? '') . ' máy cấp ' . (self::LEVELS[$record->level] ?? '?')
                . ' (ván #' . $record->id . ')' . ($from ? ', từ nước ' . ($from + 1) : '') . '.',
        ], $mapped, []);

        return redirect()->route('admin.lessons.edit', $lesson)
            ->with('ok', 'Đã tạo bài học nháp từ ván #' . $record->id . ' — thêm lời giảng, chỉnh tiêu đề rồi xuất bản khi xong.');
    }
}
