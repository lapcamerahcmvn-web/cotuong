<?php

namespace App\Console\Commands;

use App\Models\Lesson;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Symfony\Component\Process\Process;

// Điền/chuẩn hoá lại move_notation_wxf (ký hiệu VN) cho lesson_steps đã có, bằng cách decode
// lại file .xqf gốc. CHỈ cập nhật cột move_notation_wxf theo step_order — KHÔNG đụng fen/caption.
class BackfillNotation extends Command
{
    protected $signature = 'cotuong:backfill-notation {--id= : Chỉ 1 bài} {--dry-run}';
    protected $description = 'Điền lại ký hiệu nước đi tiếng Việt (move_notation_wxf) cho các bài đã import';

    public function handle(): int
    {
        $q = Lesson::query()->whereNotNull('source_xqf_path')->with('steps');
        if ($id = $this->option('id')) {
            $q->where('id', $id);
        }
        $lessons = $q->get();

        $this->info($lessons->count() . ' bài có nguồn .xqf.');
        $done = 0; $stepsUpdated = 0; $missing = 0;

        foreach ($lessons as $lesson) {
            $path = $lesson->source_xqf_path;
            if (! is_file($path)) {
                $path = storage_path('app/private/' . $lesson->source_xqf_path);
            }
            if (! is_file($path)) {
                $this->warn("  Bỏ qua #{$lesson->id}: không thấy file nguồn.");
                $missing++;
                continue;
            }

            $decoded = $this->decode($path);
            if (! $decoded) { $missing++; continue; }

            $wxfByOrder = [];
            foreach (($decoded['moves'] ?? []) as $m) {
                $wxfByOrder[$m['step_order']] = $m['wxf_vi'] ?? null;
            }

            if ($this->option('dry-run')) {
                $this->line("  #{$lesson->id}: " . count($wxfByOrder) . ' nước — VD: '
                    . collect($wxfByOrder)->take(3)->implode(' · '));
                $done++;
                continue;
            }

            DB::transaction(function () use ($lesson, $wxfByOrder, &$stepsUpdated) {
                foreach ($lesson->steps as $step) {
                    if (isset($wxfByOrder[$step->step_order]) && $wxfByOrder[$step->step_order]) {
                        $step->update(['move_notation_wxf' => $wxfByOrder[$step->step_order]]);
                        $stepsUpdated++;
                    }
                }
            });
            $done++;
        }

        $this->newLine();
        $this->info("Xong: {$done} bài, {$stepsUpdated} nước cập nhật ký hiệu." . ($missing ? " (bỏ {$missing} thiếu nguồn)" : ''));
        return self::SUCCESS;
    }

    private function decode(string $file): ?array
    {
        $proc = new Process(['node', base_path('tools/xqf-decoder/decode.js'), $file, '--json', '--full']);
        $proc->setTimeout(60);
        $proc->run();
        if (! $proc->isSuccessful()) {
            $this->warn('  decode lỗi: ' . basename($file));
            return null;
        }
        $d = json_decode($proc->getOutput(), true);
        return is_array($d) ? $d : null;
    }
}
