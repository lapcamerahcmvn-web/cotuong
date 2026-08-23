<?php

namespace App\Console\Commands;

use App\Models\Lesson;
use App\Models\SourceAsset;
use Illuminate\Console\Command;

// Xuất TOÀN BỘ dữ liệu cần để viết 1 bài học ra JSON (cho agent/skill đọc): meta + từng bước
// (side/nước/quân/FEN) + annotation gốc của thầy (nội bộ — để viết lại, KHÔNG chép nguyên văn).
// Dùng cặp với cotuong:lesson-fill.
class LessonSource extends Command
{
    protected $signature = 'cotuong:lesson-source {id} {--out= : Ghi ra file thay vì in stdout}';
    protected $description = 'Xuất dữ liệu 1 bài học + annotation gốc để viết nội dung';

    public function handle(): int
    {
        $lesson = Lesson::with('steps')->find($this->argument('id'));
        if (! $lesson) {
            $this->error('Không tìm thấy bài id=' . $this->argument('id'));
            return self::FAILURE;
        }

        $asset = SourceAsset::where('linked_lesson_id', $lesson->id)->first();
        $decoded = $asset?->decodedMoves();
        $annByStep = [];
        foreach (($decoded['annotations'] ?? []) as $a) {
            $annByStep[$a['step_order']] = $a['text'];
        }

        $out = [
            'id'           => $lesson->id,
            'title'        => $lesson->title,
            'phase'        => $lesson->phase,
            'phase_label'  => $lesson->phase_label,
            'level'        => $lesson->level,
            'game_mode'    => $lesson->game_mode,
            'series'       => $lesson->series?->name,
            'initial_fen'  => $lesson->initial_fen,
            'move_count'   => $lesson->move_count,
            'file_level_comment' => $decoded['file_level_comment'] ?? null,
            'has_content'  => (bool) $lesson->content,
            'steps'        => $lesson->steps->map(fn ($s) => [
                'step_id'          => $s->id,
                'step_order'       => $s->step_order,
                'side'             => $s->move_side,           // do | den
                'move_vi'          => $s->move_notation_wxf,   // KÝ HIỆU CHUẨN — DÙNG NGUYÊN, đừng tự suy
                'iccs'             => $s->move_notation_iccs,  // toạ độ máy, vd h2e2
                'moved_piece'      => $s->moved_piece,
                'captured_piece'   => $s->captured_piece,
                'fen_after'        => $s->fen,
                'source_annotation'=> $annByStep[$s->step_order] ?? null, // NỘI BỘ — viết lại
                'current_caption'  => $s->caption,
            ])->values(),
        ];

        $json = json_encode($out, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

        if ($path = $this->option('out')) {
            file_put_contents($path, $json);
            $this->info('Đã ghi: ' . $path);
        } else {
            $this->line($json);
        }

        return self::SUCCESS;
    }
}
