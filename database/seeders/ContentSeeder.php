<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\LessonSeries;
use App\Models\LessonStep;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

// Nạp nội dung bài học từ database/seeders/data/content.json (do cotuong:export-content xuất).
// Dùng trên hosting để tái tạo bài học qua git mà KHÔNG cần file .xqf gốc.
// Chạy: php artisan db:seed --class=Database\\Seeders\\ContentSeeder
class ContentSeeder extends Seeder
{
    public function run(): void
    {
        $path = base_path('database/seeders/data/content.json');
        if (! is_file($path)) {
            $this->command?->warn('Không thấy content.json — chạy cotuong:export-content trước.');
            return;
        }

        $data = json_decode(file_get_contents($path), true);
        if (! is_array($data)) {
            $this->command?->error('content.json không hợp lệ.');
            return;
        }

        DB::transaction(function () use ($data) {
            $seriesBySlug = [];
            foreach (($data['series'] ?? []) as $s) {
                $series = LessonSeries::updateOrCreate(
                    ['slug' => $s['slug']],
                    collect($s)->except('slug')->toArray()
                );
                $seriesBySlug[$s['slug']] = $series->id;
            }

            foreach (($data['lessons'] ?? []) as $l) {
                $steps = $l['steps'] ?? [];
                $lessonData = collect($l)->except(['steps', 'series_slug'])->toArray();
                $lessonData['series_id'] = $seriesBySlug[$l['series_slug']] ?? null;
                if (($lessonData['status'] ?? null) === 'published') {
                    $lessonData['published_at'] = now();
                }

                $lesson = Lesson::updateOrCreate(['slug' => $l['slug']], $lessonData);

                // Ghi lại steps (xóa cũ để tránh trùng khi seed lại).
                $lesson->steps()->delete();
                foreach ($steps as $st) {
                    $st['lesson_id'] = $lesson->id;
                    LessonStep::create($st);
                }
            }
        });

        $this->command?->info('Đã nạp ' . count($data['lessons'] ?? []) . ' bài học từ content.json.');
    }
}
