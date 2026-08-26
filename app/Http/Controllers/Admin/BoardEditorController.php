<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lesson;
use App\Models\LessonSeries;
use App\Models\LessonStep;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

// Trình soạn bàn cờ: xếp quân tạo thế + ghi nước đi bằng cách bấm quân/ô, rồi lưu thành bài (nháp).
class BoardEditorController extends Controller
{
    public function create()
    {
        $series = LessonSeries::orderBy('sort_order')->orderBy('id')->get();
        return view('admin.lessons.board-editor', compact('series'));
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'       => ['required', 'string', 'max:200'],
            'series_id'   => ['nullable', 'integer', 'exists:lesson_series,id'],
            'game_mode'   => ['required', 'in:co-tuong,co-up'],
            'phase'       => ['nullable', 'in:nhap-mon,khai-cuoc,trung-cuoc,tan-cuoc'],
            'level'       => ['required', 'in:co-ban,trung-cap,nang-cao'],
            'initial_fen' => ['required', 'string', 'max:120'],
            'summary'     => ['nullable', 'string'],
            'content'     => ['nullable', 'string'],
            'steps_json'  => ['nullable', 'string'],       // mạch chính (tuyến tính) → lesson_steps
            'variation_tree' => ['nullable', 'string'],    // cây biến đầy đủ (JSON lồng nhau)
        ]);

        $steps = json_decode($data['steps_json'] ?? '[]', true) ?: [];
        $tree  = json_decode($data['variation_tree'] ?? '[]', true) ?: [];

        $lesson = DB::transaction(function () use ($data, $steps, $tree) {
            $lesson = Lesson::create([
                'series_id'      => $data['series_id'] ?? null,
                'game_mode'      => $data['game_mode'],
                'phase'          => $data['game_mode'] === 'co-up' ? null : ($data['phase'] ?? null),
                'title'          => $data['title'],
                'slug'           => $this->uniqueSlug($data['title']),
                'level'          => $data['level'],
                'source_type'    => 'manual',
                'initial_fen'    => $data['initial_fen'],
                'variation_tree' => $tree ?: null,
                'move_count'     => count($steps),
                'summary'        => $data['summary'] ?? null,
                'content'        => $data['content'] ?? null,
                'status'         => 'draft',
            ]);

            foreach ($steps as $i => $s) {
                LessonStep::create([
                    'lesson_id'          => $lesson->id,
                    'step_order'         => $i + 1,
                    'fen'                => $s['fen'] ?? $lesson->initial_fen,
                    'move_notation_iccs' => $s['iccs'] ?? null,
                    'move_notation_wxf'  => $s['wxf'] ?? null,
                    'move_side'          => in_array($s['side'] ?? null, ['do', 'den']) ? $s['side'] : 'do',
                    'caption'            => $s['caption'] ?? null,
                ]);
            }
            return $lesson;
        });

        return redirect()->route('admin.lessons.edit', $lesson)
            ->with('ok', 'Đã tạo bài học từ bàn cờ (trạng thái nháp). Bổ sung nội dung rồi xuất bản.');
    }

    private function uniqueSlug(string $title): string
    {
        $base = Str::slug($title) ?: 'bai-hoc';
        $slug = $base; $i = 1;
        while (Lesson::where('slug', $slug)->exists()) {
            $slug = $base . '-' . (++$i);
        }
        return $slug;
    }
}
