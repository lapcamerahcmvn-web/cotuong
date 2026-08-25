<?php

namespace App\Console\Commands;

use App\Models\Lesson;
use App\Models\LessonSeries;
use App\Models\LessonStep;
use App\Models\SourceAsset;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Symfony\Component\Process\Process;

// Import file .pgn (biến thể TQ, GBK) → source_assets + lessons + lesson_steps.
// Giải mã qua tools/pgn-decoder/decode-pgn.js (Node) — KHÔNG parse trong PHP.
// Các file sát cục không có annotation chữ → tự sinh caption CHÍNH XÁC dựa trên
// dữ kiện ván cờ (chiếu/ăn quân/nước cuối) do decoder tính; lời giảng sâu để content.
class ImportPgn extends Command
{
    protected $signature = 'cotuong:import-pgn
        {path : File .pgn hoặc thư mục chứa .pgn}
        {--series= : Tên chuỗi bài (tạo mới nếu chưa có)}
        {--phase=trung-cuoc : nhap-mon|khai-cuoc|trung-cuoc|tan-cuoc}
        {--level=co-ban : co-ban|trung-cap|nang-cao}
        {--game-mode=co-tuong}
        {--title= : Ép tiêu đề (chỉ khi import 1 file)}
        {--order=0 : order_in_series (chỉ khi import 1 file; 0 = tự tăng)}
        {--limit=0}
        {--dry-run}';

    protected $description = 'Import file .pgn (sát cục Hán tự) thành bài học — giải mã qua Node decoder, tự sinh caption';

    private const PIECE_VI = ['R' => 'Xe', 'N' => 'Mã', 'B' => 'Tượng', 'A' => 'Sĩ', 'K' => 'Tướng', 'C' => 'Pháo', 'P' => 'Tốt'];

    public function handle(): int
    {
        $path = $this->argument('path');
        if (! file_exists($path)) {
            $this->error("Không tìm thấy: {$path}");
            return self::FAILURE;
        }

        $files = is_dir($path) ? $this->collect($path) : [$path];
        natcasesort($files);
        $files = array_values($files);
        if (($limit = (int) $this->option('limit')) > 0) {
            $files = array_slice($files, 0, $limit);
        }
        if (empty($files)) {
            $this->warn('Không có file .pgn nào.');
            return self::SUCCESS;
        }

        $series = null;
        if ($this->option('series')) {
            $series = LessonSeries::firstOrCreate(
                ['name' => $this->option('series')],
                ['game_mode' => $this->option('game-mode'), 'phase' => $this->option('phase')]
            );
        }

        $this->info(count($files) . ' file .pgn. Series: ' . ($series?->name ?? '(không)'));
        $ok = 0; $skip = 0;
        $baseOrder = (int) $this->option('order');

        foreach ($files as $i => $file) {
            $decoded = $this->decode($file);
            if (! $decoded || empty($decoded['moves'])) { $this->warn('  bỏ qua (decode rỗng): ' . basename($file)); $skip++; continue; }

            $warnings = $decoded['decode_warnings'] ?? [];
            $confidence = empty($warnings) ? 'high' : 'medium';
            $title = $this->option('title') && count($files) === 1
                ? $this->option('title')
                : $this->titleFromFile($file);
            $order = $baseOrder > 0 ? $baseOrder : ($series ? $i + 1 : null);

            $this->line(sprintf('  %s — %d nước, %d biến, tin cậy %s',
                $title, count($decoded['moves']), (int) ($decoded['variation_count'] ?? 0), $confidence));

            if ($this->option('dry-run')) { $ok++; continue; }

            DB::transaction(function () use ($file, $decoded, $title, $confidence, $series, $order, $warnings) {
                $asset = SourceAsset::updateOrCreate(
                    ['type' => 'pgn', 'file_hash' => hash_file('sha1', $file)],
                    [
                        'external_ref'        => $this->relRef($file),
                        'original_filename'   => basename($file),
                        'decoded_moves_json'  => json_encode($decoded, JSON_UNESCAPED_UNICODE),
                        'verified_authorship' => 'author_original',
                        'processed'           => true,
                    ]
                );

                $lesson = Lesson::updateOrCreate(
                    ['source_type' => 'pgn', 'source_pgn_path' => $this->relRef($file)],
                    [
                        'series_id'         => $series?->id,
                        'order_in_series'   => $order,
                        'game_mode'         => $this->option('game-mode'),
                        'phase'             => $this->option('phase'),
                        'title'             => $title,
                        'level'             => $this->option('level'),
                        'initial_fen'       => $decoded['fen_initial'] ?? null,
                        'move_count'        => count($decoded['moves']),
                        'decode_confidence' => $confidence,
                        'decode_warnings'   => $warnings,
                        'status'            => 'draft',
                    ]
                );
                $asset->update(['linked_lesson_id' => $lesson->id]);

                $lesson->steps()->delete();
                $moves = $decoded['moves'];
                $lastOrder = count($moves);
                foreach ($moves as $m) {
                    LessonStep::create([
                        'lesson_id'          => $lesson->id,
                        'step_order'         => $m['step_order'],
                        'fen'                => $m['fen_after'] ?? $lesson->initial_fen,
                        'move_notation_iccs' => $m['iccs'] ?? null,
                        'move_notation_wxf'  => $m['wxf_vi'] ?? null,
                        'move_side'          => $m['side'] ?? 'do',
                        'moved_piece'        => $m['moved_piece'] ?? null,
                        'captured_piece'     => $m['captured_piece'] ?? null,
                        'caption'            => $this->autoCaption($m, (int) $m['step_order'] === $lastOrder),
                        'raw_source_move'    => $m['zh'] ?? null,
                    ]);
                }
            });

            $ok++;
        }

        $this->newLine();
        $this->info("Xong: {$ok} bài, bỏ qua {$skip}." . ($this->option('dry-run') ? ' (dry-run)' : ''));
        return self::SUCCESS;
    }

    // Caption tự sinh — CHỈ dùng dữ kiện chắc chắn từ decoder (không suy diễn chiến thuật).
    private function autoCaption(array $m, bool $isLast): string
    {
        $wxf = $m['wxf_vi'] ?? '';
        $ben = ($m['side'] ?? 'do') === 'do' ? 'Đỏ' : 'Đen';
        $check = ! empty($m['gives_check']);
        $captured = $m['captured_piece'] ?? null;
        $capVi = $captured ? (self::PIECE_VI[strtoupper($captured)] ?? 'quân') : null;

        if ($isLast && $check) return "{$wxf} — chiếu hết, kết thúc ván cờ.";
        if ($check && $capVi) return "{$wxf} — ăn {$capVi} đồng thời chiếu Tướng.";
        if ($check) return "{$wxf} — chiếu Tướng.";
        if ($capVi) return "{$wxf} — {$ben} ăn {$capVi}.";
        // nước không chiếu không ăn: Tướng đối phương chạy, hoặc nước chuẩn bị
        if (strtoupper($m['moved_piece'] ?? '') === 'K') return "{$wxf} — {$ben} đưa Tướng tránh đòn.";
        return "{$wxf} — {$ben} vào thế.";
    }

    private function collect(string $dir): array
    {
        $out = [];
        $it = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($dir, \FilesystemIterator::SKIP_DOTS));
        foreach ($it as $f) {
            if (strtolower($f->getExtension()) === 'pgn') $out[] = $f->getPathname();
        }
        return $out;
    }

    private function decode(string $file): ?array
    {
        $proc = new Process(['node', base_path('tools/pgn-decoder/decode-pgn.js'), $file, '--json', '--full']);
        $proc->setTimeout(60);
        $proc->run();
        if (! $proc->isSuccessful()) {
            $this->warn('  decode lỗi: ' . basename($file) . ' — ' . trim($proc->getErrorOutput()));
            return null;
        }
        $data = json_decode($proc->getOutput(), true);
        return is_array($data) ? $data : null;
    }

    private function titleFromFile(string $file): string
    {
        $name = pathinfo($file, PATHINFO_FILENAME);
        $name = preg_replace('/^(SCTD|TCSC)\s*/i', '', $name);
        $name = trim(preg_replace('/\s+/', ' ', $name));
        return Str::of($name)->lower()->title()->toString() ?: 'Thế sát cờ tướng';
    }

    private function relRef(string $file): string
    {
        $priv = storage_path('app/private') . DIRECTORY_SEPARATOR;
        $norm = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $file);
        if (Str::startsWith($norm, $priv)) return str_replace('\\', '/', Str::after($norm, $priv));
        return $file;
    }
}
