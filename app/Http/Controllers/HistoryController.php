<?php

namespace App\Http\Controllers;

use App\Models\GameRecord;
use App\Services\GameRecordService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

// Lịch sử ván đấu: danh sách, xem lại từng ván, chép vào thư viện để sửa / thêm nhánh biến.
class HistoryController extends Controller
{
    public function index(Request $request)
    {
        $u = Auth::user();
        $f = [
            'loai' => in_array($request->query('loai'), ['bot', 'pvp'], true) ? $request->query('loai') : null,
            'bien-the' => in_array($request->query('bien-the'), ['co-tuong', 'co-up'], true) ? $request->query('bien-the') : null,
            'ket-qua' => array_key_exists((string) $request->query('ket-qua'), GameRecord::RESULTS) ? $request->query('ket-qua') : null,
        ];
        $q = GameRecord::where('user_id', $u->id)
            ->when($f['loai'], fn ($q, $v) => $q->where('mode', $v))
            ->when($f['bien-the'], fn ($q, $v) => $q->where('variant', $v))
            ->when($f['ket-qua'], fn ($q, $v) => $q->where('result', $v));
        $records = (clone $q)->latest('id')->paginate(20)->withQueryString();

        $all = GameRecord::where('user_id', $u->id)->selectRaw('result, COUNT(*) as n')->groupBy('result')->pluck('n', 'result');
        $stats = ['total' => (int) $all->sum(), 'win' => (int) ($all['win'] ?? 0), 'loss' => (int) ($all['loss'] ?? 0), 'draw' => (int) ($all['draw'] ?? 0)];

        return view('account.history', compact('records', 'f', 'stats'));
    }

    public function show(GameRecord $record, GameRecordService $svc)
    {
        abort_unless($record->user_id === Auth::id(), 403);
        $steps = $svc->stepsFor($record) ?? [];

        return view('account.history-show', ['record' => $record, 'steps' => $steps, 'public' => false]);
    }

    /** Trang xem lại công khai qua link chia sẻ (noindex) — không lộ tên đối thủ là người thật. */
    public function publicShow(string $token, GameRecordService $svc)
    {
        $record = GameRecord::with('user')->where('share_token', $token)->firstOrFail();

        return view('account.history-show', ['record' => $record, 'steps' => $svc->stepsFor($record) ?? [], 'public' => true]);
    }

    /** Lưu kết quả phân tích ván (do trình duyệt tính bằng engine) để lần sau mở ra là có ngay. */
    public function saveAnalysis(Request $request, GameRecord $record, GameRecordService $svc)
    {
        abort_unless($record->user_id === Auth::id(), 403);
        $data = $request->validate(['analysis' => ['required', 'array']]);
        abort_if(strlen((string) json_encode($data['analysis'])) > 300000, 413);
        $clean = $svc->cleanAnalysis($data['analysis'], (int) $record->plies);
        abort_if($clean === null, 422, 'Dữ liệu phân tích không khớp ván.');
        $record->update(['analysis' => $clean]);

        return response()->json(['ok' => true, 'accuracy' => $record->accuracy()]);
    }

    /** Bật / tắt link chia sẻ công khai. */
    public function share(GameRecord $record)
    {
        abort_unless($record->user_id === Auth::id(), 403);
        $record->update(['share_token' => $record->share_token ? null : Str::random(16)]);

        return back()->with('success', $record->share_token ? 'Đã tạo link chia sẻ ván — ai có link đều xem lại được.' : 'Đã tắt link chia sẻ ván.');
    }

    /** Chép ván sang Thư viện (mạch chính + cây biến) rồi mở sẵn trình soạn để sửa / thêm nhánh. */
    public function toLibrary(GameRecord $record, GameRecordService $svc)
    {
        abort_unless($record->user_id === Auth::id(), 403);
        $steps = $svc->stepsFor($record);
        abort_if($steps === null, 422, 'Không đọc được ván cờ.');

        // Định dạng của trình soạn (fen-composer.js): steps phẳng + cây biến lồng nhau.
        $reveals = $record->reveals ?? [];
        $flat = [];
        foreach ($steps as $i => $s) {
            $flat[] = ['fen' => $s['fen'], 'iccs' => $s['move_notation_iccs'], 'wxf' => $s['move_notation_wxf'],
                'side' => $s['move_side'], 'caption' => $s['caption'], 'reveal' => $reveals[$i] ?? null];
        }
        // Cây lồng nhau sâu bằng số nước — json_decode mặc định giới hạn 512 tầng nên chỉ tạo cây khi ván ≤ 200 nước;
        // ván dài hơn vẫn sửa được (trình soạn dựng cây từ steps phẳng).
        $tree = null;
        if (count($flat) <= 200) {
            $tree = [];
            for ($i = count($flat) - 1; $i >= 0; $i--) {
                $sq = \App\Support\Xiangqi\Rules::iccs($flat[$i]['iccs']);
                $tree = [[
                    'from' => $sq[0], 'to' => $sq[1], 'iccs' => $flat[$i]['iccs'], 'wxf' => $flat[$i]['wxf'], 'side' => $flat[$i]['side'],
                    'reveal' => $reveals[$i] ?? null, 'fen' => $flat[$i]['fen'], 'caption' => $flat[$i]['caption'], 'children' => $tree,
                ]];
            }
        }

        $label = GameRecord::RESULTS[$record->result] ?? '';
        $item = Auth::user()->library()->create([
            'fen' => $record->start_fen,
            'title' => mb_substr($record->title() . ' · ' . $record->created_at->format('d/m/Y'), 0, 120),
            'note' => $label . ($record->reason ? ' — ' . $record->reason : '') . ' (' . (int) ceil($record->plies / 2) . ' nước)',
            'steps_json' => $flat,
            'variation_tree' => $tree,
        ]);

        return redirect()->route('account.library', ['sua' => $item->id])
            ->with('success', 'Đã chép ván vào thư viện — chỉnh nước đi hoặc đi lại từ 1 nước cũ để thêm nhánh biến, xong bấm "Cập nhật thế cờ".');
    }

    public function destroy(GameRecord $record)
    {
        abort_unless($record->user_id === Auth::id(), 403);
        $record->delete();

        return redirect()->route('history.index')->with('success', 'Đã xoá ván khỏi lịch sử.');
    }
}
