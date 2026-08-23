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

// Import file .xqf → source_assets + lessons + lesson_steps (draft). Gọi tools/xqf-decoder
// (Node) để giải mã — KHÔNG parse binary trong PHP. Nội dung văn bản (caption/content) để
// trống, chờ Agent (cotuong:generate-lesson) hoặc admin viết.
class ImportXqf extends Command
{
    protected $signature = 'cotuong:import-xqf
        {path : File .xqf hoặc thư mục chứa .xqf}
        {--series= : Tên chuỗi bài (tạo mới nếu chưa có)}
        {--phase=khai-cuoc : nhap-mon|khai-cuoc|trung-cuoc|tan-cuoc}
        {--level=co-ban : co-ban|trung-cap|nang-cao}
        {--game-mode=co-tuong : co-tuong|co-up}
        {--limit=0 : Giới hạn số file (0 = không giới hạn)}
        {--dry-run : Chỉ hiển thị, không ghi DB}';

    protected $description = 'Import file .xqf thành bài học nháp (draft) — giải mã qua Node decoder';

    public function handle(): int
    {
        $path = $this->argument('path');
        if (! file_exists($path)) {
            $this->error("Không tìm thấy: {$path}");
            return self::FAILURE;
        }

        $files = is_dir($path) ? $this->collectXqf($path) : [$path];
        $limit = (int) $this->option('limit');
        if ($limit > 0) {
            $files = array_slice($files, 0, $limit);
        }
        // Ổn định thứ tự theo tên (BAI 1, BAI 2, ... 10, 11) nếu có số trong tên.
        natcasesort($files);
        $files = array_values($files);

        if (empty($files)) {
            $this->warn('Không có file .xqf nào.');
            return self::SUCCESS;
        }

        $series = null;
        if ($this->option('series')) {
            $series = LessonSeries::firstOrCreate(
                ['name' => $this->option('series')],
                ['game_mode' => $this->option('game-mode'), 'phase' => $this->option('phase')]
            );
        }

        $this->info(count($files) . ' file .xqf. Series: ' . ($series?->name ?? '(không)'));
        $ok = 0; $skip = 0; $order = 0;

        foreach ($files as $file) {
            $order++;
            $decoded = $this->decode($file);
            if (! $decoded) { $skip++; continue; }

            $title = $this->titleFromFile($file, $decoded['title_raw'] ?? '');
            $confidence = $this->confidence($decoded['decode_warnings'] ?? []);
            $this->line(sprintf('  [%s] %s — %d nước, tin cậy: %s',
                $decoded['version_hex'] ?? '?', $title, count($decoded['moves'] ?? []), $confidence));

            if ($this->option('dry-run')) { $ok++; continue; }

            DB::transaction(function () use ($file, $decoded, $title, $confidence, $series, $order) {
                $asset = SourceAsset::updateOrCreate(
                    ['type' => 'xqf', 'file_hash' => hash_file('sha1', $file)],
                    [
                        'external_ref'        => $this->relRef($file),
                        'original_filename'   => basename($file),
                        'title_raw'           => $decoded['title_raw'] ?? null,
                        'decoded_moves_json'  => json_encode($decoded, JSON_UNESCAPED_UNICODE),
                        'decode_version'      => $decoded['version_hex'] ?? null,
                        'verified_authorship' => 'author_original',
                        'processed'           => true,
                    ]
                );

                $lesson = Lesson::updateOrCreate(
                    ['source_type' => 'xqf', 'source_xqf_path' => $this->relRef($file)],
                    [
                        'series_id'         => $series?->id,
                        'order_in_series'   => $series ? $order : null,
                        'game_mode'         => $this->option('game-mode'),
                        'phase'             => $this->option('phase'),
                        'title'             => $title,
                        'level'             => $this->option('level'),
                        'initial_fen'       => $decoded['fen_initial'] ?? null,
                        'move_count'        => count($decoded['moves'] ?? []),
                        'decode_confidence' => $confidence,
                        'decode_warnings'   => $decoded['decode_warnings'] ?? [],
                        'status'            => 'draft',
                    ]
                );

                $asset->update(['linked_lesson_id' => $lesson->id]);

                // Ghi lại steps (xóa cũ nếu import lại).
                $lesson->steps()->delete();
                $firstSide = ($decoded['who_play'] ?? 0) === 1 ? 'den' : 'do';
                foreach (($decoded['moves'] ?? []) as $m) {
                    $sideIsFirst = ((int) $m['step_order'] % 2) === 1;
                    LessonStep::create([
                        'lesson_id'          => $lesson->id,
                        'step_order'         => $m['step_order'],
                        'fen'                => $m['fen_after'] ?? $lesson->initial_fen,
                        'move_notation_iccs' => ($m['from'] ?? '') . ($m['to'] ?? ''),
                        'move_notation_wxf'  => $m['wxf_vi'] ?? null,   // ký hiệu VN chuẩn (Pháo 2 bình 5)
                        'move_side'          => $sideIsFirst ? $firstSide : ($firstSide === 'do' ? 'den' : 'do'),
                        'moved_piece'        => $m['moved_piece'] ?? null,
                        'captured_piece'     => $m['captured_piece'] ?? null,
                        'raw_source_move'    => ($m['from'] ?? '') . '-' . ($m['to'] ?? ''),
                        // caption để trống — chờ Agent/admin viết (bản quyền: không dùng lời gốc verbatim).
                    ]);
                }
            });

            $ok++;
        }

        $this->newLine();
        $this->info("Xong: {$ok} bài, bỏ qua {$skip}." . ($this->option('dry-run') ? ' (dry-run)' : ''));
        return self::SUCCESS;
    }

    private function collectXqf(string $dir): array
    {
        $out = [];
        $it = new \RecursiveIteratorIterator(new \RecursiveDirectoryIterator($dir, \FilesystemIterator::SKIP_DOTS));
        foreach ($it as $f) {
            if (strtolower($f->getExtension()) === 'xqf') {
                $out[] = $f->getPathname();
            }
        }
        return $out;
    }

    private function decode(string $file): ?array
    {
        $script = base_path('tools/xqf-decoder/decode.js');
        $proc = new Process(['node', $script, $file, '--json', '--full']);
        $proc->setTimeout(60);
        $proc->run();

        if (! $proc->isSuccessful()) {
            $this->warn('  decode lỗi: ' . basename($file) . ' — ' . trim($proc->getErrorOutput()));
            return null;
        }
        $data = json_decode($proc->getOutput(), true);
        if (! is_array($data)) {
            $this->warn('  JSON không hợp lệ: ' . basename($file));
            return null;
        }
        return $data;
    }

    // Tiêu đề: tên file (đã có nghĩa) + ngữ cảnh "Bài N" từ thư mục cha nếu là folder "BAI N…"
    // (nhiều BAI có file con generic trùng tên như "1 KHAI LUOC" → thêm "Bài N:" cho phân biệt).
    private function titleFromFile(string $file, string $titleRaw): string
    {
        $name = pathinfo($file, PATHINFO_FILENAME);
        $name = preg_replace('/^\d+[\.\)\s]+/', '', $name);   // bỏ "1. ", "12) "
        $name = trim(preg_replace('/\s+/', ' ', $name));
        $childClean = Str::of($name)->lower()->title()->toString();

        $parent = basename(dirname($file));
        if (preg_match('/^BAI\s+(\d+)/i', $parent, $mm) && ! preg_match('/^Bai\s+\d+/i', $childClean)) {
            $childClean = 'Bài ' . $mm[1] . ': ' . $childClean;
        }

        return $childClean ?: ($titleRaw ?: 'Bài học cờ tướng');
    }

    private function confidence(array $warnings): string
    {
        foreach ($warnings as $w) {
            if (Str::contains($w, ['no piece', 'out of board'])) return 'low';
        }
        foreach ($warnings as $w) {
            if (Str::contains($w, 'suspicious comment')) return 'medium';
        }
        return 'high';
    }

    // Nếu file nằm trong storage/app/private → lưu path tương đối; ngược lại lưu path gốc (nội bộ).
    private function relRef(string $file): string
    {
        $priv = storage_path('app/private') . DIRECTORY_SEPARATOR;
        $norm = str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $file);
        if (Str::startsWith($norm, $priv)) {
            return str_replace('\\', '/', Str::after($norm, $priv));
        }
        return $file;
    }
}
