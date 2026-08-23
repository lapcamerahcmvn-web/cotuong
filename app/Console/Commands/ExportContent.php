<?php

namespace App\Console\Commands;

use App\Models\Lesson;
use App\Models\LessonSeries;
use Illuminate\Console\Command;

// Xuất nội dung đã BIÊN SOẠN (series + lessons published + steps) ra 1 file JSON ship theo git,
// để hosting tái tạo qua ContentSeeder (KHÔNG cần file .xqf gốc — vốn bị gitignore vì bản quyền).
// Chỉ xuất dữ liệu đã viết lại (bài/caption) + nước đi/FEN (dữ kiện ván cờ) — KHÔNG xuất
// source_assets (annotation gốc bản quyền).
class ExportContent extends Command
{
    protected $signature = 'cotuong:export-content {--out=database/seeders/data/content.json}';
    protected $description = 'Xuất series + bài học published + nước đi ra JSON (ship theo git để seed trên hosting)';

    public function handle(): int
    {
        $out = base_path($this->option('out'));
        @mkdir(dirname($out), 0777, true);

        $seriesList = LessonSeries::orderBy('id')->get()->map(fn ($s) => [
            'name' => $s->name, 'slug' => $s->slug, 'game_mode' => $s->game_mode,
            'phase' => $s->phase, 'description' => $s->description,
            'planned_total' => $s->planned_total, 'sort_order' => $s->sort_order,
        ])->values();

        $lessons = Lesson::with('steps')->where('status', 'published')->orderBy('series_id')->orderBy('order_in_series')->get()
            ->map(function ($l) {
                return [
                    'series_slug' => $l->series?->slug,
                    'order_in_series' => $l->order_in_series,
                    'game_mode' => $l->game_mode, 'phase' => $l->phase,
                    'title' => $l->title, 'slug' => $l->slug, 'level' => $l->level,
                    'source_type' => $l->source_type,
                    'initial_fen' => $l->initial_fen, 'move_count' => $l->move_count,
                    'summary' => $l->summary, 'content' => $l->content,
                    'status' => 'published',
                    'decode_confidence' => $l->decode_confidence,
                    'thumbnail' => $l->thumbnail,
                    'seo_title' => $l->seo_title, 'seo_description' => $l->seo_description,
                    'is_featured' => $l->is_featured,
                    'steps' => $l->steps->map(fn ($s) => [
                        'step_order' => $s->step_order, 'fen' => $s->fen,
                        'move_notation_wxf' => $s->move_notation_wxf,
                        'move_notation_iccs' => $s->move_notation_iccs,
                        'move_side' => $s->move_side, 'moved_piece' => $s->moved_piece,
                        'captured_piece' => $s->captured_piece, 'caption' => $s->caption,
                        'is_flip_reveal' => $s->is_flip_reveal,
                    ])->values(),
                ];
            })->values();

        $payload = ['exported_at' => now()->toIso8601String(), 'series' => $seriesList, 'lessons' => $lessons];
        file_put_contents($out, json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

        $this->info("Xuất {$seriesList->count()} chuỗi + {$lessons->count()} bài → {$out}");
        return self::SUCCESS;
    }
}
