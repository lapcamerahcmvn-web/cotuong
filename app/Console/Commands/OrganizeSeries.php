<?php

namespace App\Console\Commands;

use App\Models\Lesson;
use App\Models\LessonSeries;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

// Dọn thứ tự + tiêu đề trong 1 chuỗi bài: bỏ tiền tố "Bài N:" (gây trùng/rối), đánh lại
// order_in_series 1..N cho các bài ĐÃ PUBLISH theo thứ tự giảng hiện có. Chạy lại mỗi khi
// publish thêm bài để giữ 1..N liền mạch (mở rộng dần tới 48).
class OrganizeSeries extends Command
{
    protected $signature = 'cotuong:organize-series {--series= : ID chuỗi (mặc định: tất cả)} {--reslug} {--dry-run}';
    protected $description = 'Bỏ tiền tố "Bài N:" + đánh lại thứ tự 1..N cho bài đã publish trong chuỗi';

    public function handle(): int
    {
        $series = $this->option('series')
            ? LessonSeries::where('id', $this->option('series'))->get()
            : LessonSeries::all();

        foreach ($series as $s) {
            $published = Lesson::where('series_id', $s->id)->where('status', 'published')
                ->orderBy('order_in_series')->orderBy('id')->get();

            $this->info("Chuỗi #{$s->id} {$s->name}: {$published->count()} bài publish");
            $order = 0;
            foreach ($published as $l) {
                $order++;
                $newTitle = preg_replace('/^Bài\s+\d+\s*:\s*/u', '', $l->title);
                $changed = [];
                if ($newTitle !== $l->title) { $changed['title'] = $newTitle; }
                if ($l->order_in_series !== $order) { $changed['order_in_series'] = $order; }
                if ($this->option('reslug') && isset($changed['title'])) {
                    $changed['slug'] = Str::slug($newTitle);
                }
                if ($changed) {
                    $this->line("  #{$l->id} → [{$order}] {$newTitle}");
                    if (! $this->option('dry-run')) {
                        $l->forceFill($changed)->saveQuietly();
                    }
                }
            }
        }

        $this->newLine();
        $this->info('Xong.' . ($this->option('dry-run') ? ' (dry-run)' : ''));
        return self::SUCCESS;
    }
}
