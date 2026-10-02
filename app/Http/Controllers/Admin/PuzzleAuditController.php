<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\Puzzle;
use App\Models\PuzzleAuditMark;
use App\Support\Xiangqi\Rules;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\View\View;

/**
 * Kiểm định thế cờ: những chỗ nước ĐỠ trong sách chưa phải cách đỡ tốt nhất (bộ giải chiếu hết chứng minh — dữ liệu
 * do `node tools/puzzle-audit.mjs` tạo ở máy dev, lưu database/data/puzzle-audit.json vì hosting không chạy Node).
 * Thế đầy đủ + thế "đoạn kết" của cùng bài gộp theo (bài, nước trong bài) để Thầy duyệt 1 lần.
 */
class PuzzleAuditController extends Controller
{
    public function index(Request $request): View
    {
        $data = $this->data();
        $filter = in_array($request->query('loc'), ['open', 'done', 'all'], true) ? $request->query('loc') : 'open';
        $kind = in_array($request->query('loai'), ['escape', 'longer'], true) ? $request->query('loai') : null;

        $puzzles = Puzzle::whereIn('id', array_column($data['puzzles'], 'id'))->get()->keyBy('id');
        $lessons = Lesson::whereIn('id', array_unique(array_column($data['puzzles'], 'lesson_id')))
            ->get(['id', 'title', 'slug', 'status'])->keyBy('id');
        $marks = PuzzleAuditMark::with('user:id,name')->get()->keyBy(fn ($m) => $m->lesson_id . ':' . $m->ply);

        // Gộp theo (bài, nước trong bài); ưu tiên thế đầy đủ (start_ply nhỏ nhất) để hiển thị.
        $items = [];
        foreach ($data['puzzles'] as $row) {
            $p = $puzzles[$row['id']] ?? null;
            if (! $p) continue;
            foreach ($row['issues'] as $is) {
                $abs = (int) $row['start_ply'] + (int) $is['ply'];
                $k = $row['lesson_id'] . ':' . $abs;
                if (isset($items[$k])) {
                    $items[$k]['puzzle_ids'][] = $p->id;
                    continue;
                }
                $items[$k] = ['key' => $k, 'lesson_id' => $row['lesson_id'], 'ply' => $abs, 'puzzle' => $p,
                    'puzzle_ids' => [$p->id], 'issue' => $is, 'escape' => (bool) $is['escape']] + $this->describe($p, $is);
            }
        }

        $all = collect($items)->map(function ($it) use ($marks, $lessons) {
            $it['mark'] = $marks[$it['key']] ?? null;
            $it['lesson'] = $lessons[$it['lesson_id']] ?? null;

            return $it;
        });
        $counts = [
            'all' => $all->count(), 'done' => $all->whereNotNull('mark')->count(),
            'escape' => $all->where('escape', true)->count(),
        ];
        $counts['open'] = $counts['all'] - $counts['done'];

        $list = $all->filter(fn ($it) => match ($filter) {
            'open' => ! $it['mark'], 'done' => (bool) $it['mark'], default => true,
        })->filter(fn ($it) => ! $kind || ($kind === 'escape') === $it['escape'])
            ->sortBy([['escape', 'desc'], ['lesson_id', 'asc'], ['ply', 'asc']])->values();

        return view('admin.puzzle-audit.index', [
            'items' => $list, 'counts' => $counts, 'filter' => $filter, 'kind' => $kind,
            'generated' => $data['generated'] ?? null, 'checked' => $data['checked'] ?? 0,
        ]);
    }

    public function mark(Request $request): RedirectResponse
    {
        $d = $request->validate([
            'lesson_id' => ['required', 'integer'],
            'ply' => ['required', 'integer', 'min:0', 'max:999'],
            'status' => ['required', 'in:fixed,keep,open'],
            'note' => ['nullable', 'string', 'max:500'],
        ]);
        if ($d['status'] === 'open') {
            PuzzleAuditMark::where('lesson_id', $d['lesson_id'])->where('ply', $d['ply'])->delete();
        } else {
            PuzzleAuditMark::updateOrCreate(
                ['lesson_id' => $d['lesson_id'], 'ply' => $d['ply']],
                ['status' => $d['status'], 'note' => $d['note'] ?? null, 'user_id' => $request->user()->id],
            );
        }

        return back()->with('ok', 'Đã cập nhật.');
    }

    private function data(): array
    {
        $path = database_path('data/puzzle-audit.json');
        $json = is_file($path) ? json_decode((string) file_get_contents($path), true) : null;

        return is_array($json) ? $json + ['puzzles' => []] : ['puzzles' => []];
    }

    /** Thế cờ trước nước đỡ + ký hiệu Việt của nước sách / các cách đỡ tốt hơn. */
    private function describe(Puzzle $p, array $is): array
    {
        $b = Rules::loadFen($p->fen);
        $sol = array_values($p->solution ?? []);
        $names = [];
        for ($i = 0; $i < $is['ply'] && isset($sol[$i]); $i++) {
            $sq = Rules::iccs($sol[$i]);
            if (! $sq) break;
            $names[] = Rules::notation($b, $sq[0], $sq[1]);
            $b = Rules::apply($b, $sq[0], $sq[1]);
        }
        $note = function (string $mv) use ($b): string {
            $sq = Rules::iccs($mv);

            return $sq ? Rules::notation($b, $sq[0], $sq[1]) : $mv;
        };
        $defRed = ($p->side === 'do') === ($is['ply'] % 2 === 0);

        return [
            'fen' => Rules::toFen($b),
            'before' => $names,
            'defender' => $defRed ? 'Đỏ' : 'Đen',
            'book_note' => $note($is['book']),
            'escape_notes' => array_map(fn ($m) => ['iccs' => $m, 'note' => $note($m)], $is['escape']),
            'longer_notes' => array_map(function ($s) use ($note) {
                [$m, $k] = explode(':', $s) + [1 => '?'];

                return ['iccs' => $m, 'note' => $note($m), 'k' => $k];
            }, $is['longer']),
        ];
    }
}
