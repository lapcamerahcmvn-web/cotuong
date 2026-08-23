<?php

namespace App\Console\Commands;

use App\Models\Lesson;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

// Ghi nội dung đã viết vào 1 bài học TỪ FILE JSON. CHỈ ghi các trường văn bản (content/summary/
// seo_* + caption từng bước theo step_id) — TUYỆT ĐỐI không đụng fen/move (cơ chế an toàn).
// JSON đầu vào: { "content": "...html...", "summary": "...", "seo_title": "...",
//   "seo_description": "...", "captions": { "<step_id>": "lời giảng", ... }, "status": "review" }
class LessonFill extends Command
{
    protected $signature = 'cotuong:lesson-fill {id} {--file= : File JSON nội dung} {--publish : Publish luôn}';
    protected $description = 'Ghi nội dung + caption đã viết vào bài học (an toàn — không đụng nước đi/FEN)';

    public function handle(): int
    {
        $lesson = Lesson::with('steps')->find($this->argument('id'));
        if (! $lesson) {
            $this->error('Không tìm thấy bài id=' . $this->argument('id'));
            return self::FAILURE;
        }

        $file = $this->option('file');
        if (! $file || ! is_file($file)) {
            $this->error('Thiếu --file hoặc file không tồn tại: ' . $file);
            return self::FAILURE;
        }

        $data = json_decode(file_get_contents($file), true);
        if (! is_array($data)) {
            $this->error('JSON không hợp lệ.');
            return self::FAILURE;
        }

        $validStepIds = $lesson->steps->pluck('id')->flip();
        $capCount = 0;

        DB::transaction(function () use ($lesson, $data, $validStepIds, &$capCount) {
            // Trường văn bản của bài — whitelist.
            $fields = [];
            foreach (['content', 'summary', 'seo_title', 'seo_description'] as $f) {
                if (array_key_exists($f, $data) && $data[$f] !== null && $data[$f] !== '') {
                    $fields[$f] = $data[$f];
                }
            }
            // Mặc định đưa về 'review' (admin duyệt), trừ khi --publish.
            $fields['status'] = $this->option('publish') ? 'published' : 'review';
            if ($fields['status'] === 'published' && ! $lesson->published_at) {
                $fields['published_at'] = now();
            }
            $lesson->fill($fields)->save();

            // Caption theo step_id — CHỈ cột caption, chỉ step thuộc bài này.
            foreach (($data['captions'] ?? []) as $stepId => $text) {
                if ($validStepIds->has((int) $stepId) && $text !== null && $text !== '') {
                    $lesson->steps->firstWhere('id', (int) $stepId)?->update(['caption' => $text]);
                    $capCount++;
                }
            }
        });

        $this->info("Đã ghi bài #{$lesson->id}: nội dung + {$capCount} caption. Trạng thái: " . $lesson->fresh()->status);
        return self::SUCCESS;
    }
}
