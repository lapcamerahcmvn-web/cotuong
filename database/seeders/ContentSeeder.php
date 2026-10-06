<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\LessonSeries;
use App\Models\LessonStep;
use Illuminate\Database\Seeder;
use App\Support\ContentStore;
use Illuminate\Support\Facades\DB;

// Nạp nội dung bài học từ database/seeders/data/content/ (series.json + 1 file/chuyên đề — xem App\Support\ContentStore).
// Dùng trên hosting để tái tạo bài học qua git mà KHÔNG cần file .xqf gốc.
// Chạy: php artisan db:seed --class=Database\\Seeders\\ContentSeeder
class ContentSeeder extends Seeder
{
    public function run(): void
    {
        if (! ContentStore::exists()) {
            $this->command?->warn('Không thấy database/seeders/data/content/ (hay content.json) — chạy cotuong:export-content trước.');
            return;
        }

        // Dữ liệu tách theo chuyên đề (ContentStore) — mỗi file vài MB; vẫn nới bộ nhớ cho file cũ 1 khối.
        ini_set('memory_limit', '1536M');

        $data = ContentStore::seriesFile();
        if (! is_array($data)) {
            $this->command?->error('Dữ liệu nội dung không hợp lệ.');
            return;
        }

        $total = 0;
        DB::transaction(function () use ($data, &$total) {
            $seriesBySlug = [];
            foreach (($data['series'] ?? []) as $s) {
                $series = LessonSeries::updateOrCreate(
                    ['slug' => $s['slug']],
                    collect($s)->except('slug')->toArray()
                );
                $seriesBySlug[$s['slug']] = $series->id;
            }

            foreach (ContentStore::lessonChunks() as $chunk) foreach ($chunk as $l) {
                $total++;
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

        $this->command?->info("Đã nạp {$total} bài học.");
    }
}
