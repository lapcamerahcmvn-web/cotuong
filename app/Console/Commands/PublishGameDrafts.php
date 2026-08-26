<?php

namespace App\Console\Commands;

use App\Models\Lesson;
use App\Models\LessonSeries;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

// Xuất bản các bài draft CÓ nước đi (ván mẫu thật từ XQF của thầy): sinh caption sạch từ ký hiệu
// nước đi + intro riêng theo tên thế trận & nước mở đầu. Không đụng FEN/nước (chỉ thêm caption/nội dung).
class PublishGameDrafts extends Command
{
    protected $signature = 'cotuong:publish-game-drafts
        {--series= : Tên chuỗi}
        {--limit=0 : Giới hạn số bài (0 = tất cả)}
        {--dry-run}';

    protected $description = 'Xuất bản bài draft có nước đi (ván mẫu) — sinh caption + intro tự động';

    private const PIECE_VI = ['R' => 'Xe', 'N' => 'Mã', 'B' => 'Tượng', 'A' => 'Sĩ', 'K' => 'Tướng', 'C' => 'Pháo', 'P' => 'Tốt'];

    public function handle(): int
    {
        $series = LessonSeries::where('name', $this->option('series'))->first();
        if (! $series) {
            $this->error('Không tìm thấy chuỗi: ' . $this->option('series'));
            return self::FAILURE;
        }

        // Bỏ bài quá ngắn (< 3 nước) — không đủ minh hoạ một thế trận.
        $q = $series->lessons()->where('status', 'draft')->where('move_count', '>=', 3)
            ->orderBy('order_in_series');
        if (($limit = (int) $this->option('limit')) > 0) {
            $q->limit($limit);
        }
        $drafts = $q->get();

        $this->info($drafts->count() . ' bài draft có nước đi trong "' . $series->name . '"');
        $ok = 0;

        foreach ($drafts as $lesson) {
            $steps = $lesson->steps()->orderBy('step_order')->get();
            if ($steps->isEmpty()) {
                continue;
            }

            $this->line('  • ' . Str::limit($lesson->title, 50) . ' (' . $steps->count() . ' nước)');
            if ($this->option('dry-run')) { $ok++; continue; }

            DB::transaction(function () use ($lesson, $steps) {
                foreach ($steps as $st) {
                    $cap = $st->move_notation_wxf ?: '';
                    if ($st->captured_piece) {
                        $cap .= ' — ăn ' . (self::PIECE_VI[strtoupper($st->captured_piece)] ?? 'quân');
                    }
                    $st->update(['caption' => $cap]);
                }
                $lesson->update([
                    'content'      => $this->buildIntro($lesson, $steps),
                    'status'       => 'published',
                    'published_at' => now(),
                ]);
            });
            $ok++;
        }

        $this->newLine();
        $this->info("Xong: {$ok} bài." . ($this->option('dry-run') ? ' (dry-run)' : ''));
        return self::SUCCESS;
    }

    private function buildIntro(Lesson $lesson, $steps): string
    {
        $name = trim(preg_replace('/^Bài\s+\d+\s*[:.\-]?\s*/u', '', $lesson->title));
        $first = $steps->take(3)->pluck('move_notation_wxf')->filter()->implode(', ');
        $n = $steps->count();

        if ($lesson->phase === 'tan-cuoc') {
            return "<p>Đây là thế <strong>{$name}</strong> — một thế cờ tàn cần nắm vững kỹ thuật. Ván mẫu gồm {$n} nước, "
                . ($first ? "mở đầu bằng {$first}, " : '')
                . "minh hoạ cách xử lý để giành kết quả tốt nhất trong tàn cuộc.</p>"
                . "<h2>Cách học</h2><p>Bấm <strong>Tiến</strong> để đi lại từng nước trên bàn cờ và quan sát kỹ thuật then chốt: cách đưa quân về vị trí thắng, khống chế Tướng đối phương và tính chính xác từng nước ở tàn cuộc.</p>";
        }

        // khai-cuoc (mặc định)
        return "<p>Đây là thế trận <strong>{$name}</strong> — một định thức khai cuộc kinh điển trong cờ tướng. Ván mẫu gồm {$n} nước, "
            . ($first ? "mở đầu bằng {$first}, " : '')
            . "minh hoạ cách hai bên bố trí quân và tranh tiên ngay từ đầu ván.</p>"
            . "<h2>Cách học</h2><p>Bấm <strong>Tiến</strong> để đi lại từng nước và quan sát thứ tự phát triển quân (Xe, Pháo, Mã), cách kiểm soát trung lộ và giành thế chủ động. Nắm vững định thức giúp bạn không bị lạc trong những nước khai cuộc đầu tiên.</p>";
    }
}
