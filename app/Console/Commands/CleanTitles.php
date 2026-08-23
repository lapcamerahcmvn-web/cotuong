<?php

namespace App\Console\Commands;

use App\Models\Lesson;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

// Chuẩn hoá tiêu đề bài học: mở viết tắt (BCDT/QHX/BPM...) + thêm dấu tiếng Việt cho các cụm
// chắc chắn (config/xiangqi-terms.php). Cụm không map để nguyên (không đoán dấu → tránh sai).
class CleanTitles extends Command
{
    protected $signature = 'cotuong:clean-titles
        {--reslug : Tạo lại slug từ tiêu đề mới (chỉ dùng TRƯỚC khi launch)}
        {--only-published : Chỉ xử lý bài đã publish}
        {--dry-run : Xem trước, không ghi DB}';

    protected $description = 'Chuẩn hoá tiêu đề bài học (mở viết tắt + thêm dấu tiếng Việt)';

    public function handle(): int
    {
        $abbr    = config('xiangqi-terms.abbreviations', []);
        $phrases = config('xiangqi-terms.phrases', []);
        // Sắp phrase theo độ dài giảm dần để khớp cụm dài trước.
        uksort($phrases, fn ($a, $b) => strlen($b) <=> strlen($a));

        $q = Lesson::query();
        if ($this->option('only-published')) {
            $q->where('status', 'published');
        }
        $lessons = $q->get();

        $changed = 0;
        foreach ($lessons as $lesson) {
            $new = $this->clean($lesson->title, $abbr, $phrases);
            if ($new === $lesson->title && ! $this->option('reslug')) {
                continue;
            }

            $this->line(sprintf('  %s', $lesson->title));
            $this->line(sprintf('  → %s', $new));

            if (! $this->option('dry-run')) {
                $lesson->title = $new;
                if ($this->option('reslug')) {
                    $lesson->slug = Str::slug($new);
                }
                $lesson->saveQuietly();
            }
            $changed++;
        }

        $this->newLine();
        $this->info("Đã xử lý {$changed} bài." . ($this->option('dry-run') ? ' (dry-run)' : ''));
        return self::SUCCESS;
    }

    private function clean(string $title, array $abbr, array $phrases): string
    {
        // Tách prefix "Bài N:" giữ nguyên.
        $prefix = '';
        if (preg_match('/^(Bài\s+\d+\s*:\s*)(.*)$/u', $title, $m)) {
            $prefix = $m[1];
            $title = $m[2];
        }

        // 1) Mở viết tắt (ranh giới từ, cả hoa/thường).
        foreach ($abbr as $ab => $full) {
            $title = preg_replace('/\b' . preg_quote($ab, '/') . '\b/iu', $full, $title);
        }

        // 2) Chuẩn hoá về chữ thường để khớp phrase, rồi thay bằng bản có dấu.
        $work = mb_strtolower($title, 'UTF-8');
        // đánh dấu placeholder để không thay chồng lên phần đã có dấu
        $tokens = [];
        $i = 0;
        foreach ($phrases as $plain => $viet) {
            $pattern = '/\b' . preg_quote($plain, '/') . '\b/u';
            $work = preg_replace_callback($pattern, function () use (&$tokens, &$i, $viet) {
                $key = "\x01{$i}\x01";
                $tokens[$key] = $viet;
                $i++;
                return $key;
            }, $work);
        }

        // 3) Những từ chưa map: title-case đơn giản (giữ chữ thường ban đầu).
        $work = preg_replace_callback('/[a-zàáảãạăắằẳẵặâấầẩẫậđèéẻẽẹêếềểễệìíỉĩịòóỏõọôốồổỗộơớờởỡợùúủũụưứừửữựỳýỷỹỵ]+/u', function ($mm) {
            return Str::ucfirst($mm[0]);
        }, $work);

        // 4) Trả placeholder về cụm có dấu.
        $work = strtr($work, $tokens);

        // Dọn khoảng trắng.
        $work = trim(preg_replace('/\s+/', ' ', $work));

        return $prefix . $work;
    }
}
