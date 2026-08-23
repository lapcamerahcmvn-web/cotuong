<?php

namespace App\Services;

use App\Ai\Agents\LessonWriterAgent;
use App\Models\AiGenerationLog;
use App\Models\Lesson;
use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Support\Facades\Log;

// Điều phối việc gọi Claude sinh nội dung bài học. Port pattern run()+AiGenerationLog từ
// laravel13-shop/app/Services/AiContentService.php.
//
// CƠ CHẾ AN TOÀN: sau khi Agent trả về, service CHỈ ghi caption vào lesson_steps theo đúng
// step_order — KHÔNG đụng fen/move_notation_*. Move/FEN luôn là dữ liệu từ decoder.
class CotuongContentService
{
    public function getProvider(): string
    {
        return config('ai.default', 'anthropic');
    }

    public function getModel(): ?string
    {
        return env('ANTHROPIC_MODEL') ?: null;
    }

    public function isConfigured(): bool
    {
        return ! empty(config('ai.providers.' . $this->getProvider() . '.key'));
    }

    // Sinh nội dung cho 1 bài học. Ghi content/summary/seo vào lesson + caption vào từng step.
    // $referenceAnnotations: lời giảng gốc (nội bộ) theo step_order, chỉ để Agent tham khảo ý.
    public function generateLesson(Lesson $lesson, array $referenceAnnotations = []): array
    {
        $lesson->loadMissing('steps', 'series');

        $prompt = $this->buildPrompt($lesson, $referenceAnnotations);
        $result = $this->run($prompt, 'lesson_content', $lesson->id, Lesson::class);

        // Ghi phần văn bản của bài — KHÔNG đụng gì tới move/FEN.
        $lesson->update([
            'title'           => $result['title'] ?? $lesson->title,
            'summary'         => $result['summary'] ?? $lesson->summary,
            'content'         => $result['content'] ?? $lesson->content,
            'seo_title'       => $result['seo_title'] ?? null,
            'seo_description' => $result['seo_description'] ?? null,
            'status'          => 'review', // luôn về review — admin duyệt thủ công mới publish
        ]);

        // Ghi caption theo đúng step_order. CHỈ cột caption.
        $captions = collect($result['step_captions'] ?? [])->keyBy('step_order');
        foreach ($lesson->steps as $step) {
            $cap = $captions->get($step->step_order);
            if ($cap && ! empty($cap['caption'])) {
                $step->update(['caption' => $cap['caption']]);
            }
        }

        return $result;
    }

    private function buildPrompt(Lesson $lesson, array $referenceAnnotations): string
    {
        $lines = [
            'Thế trận / chủ đề bài học: ' . $lesson->title,
            'Giai đoạn: ' . $lesson->phase_label . ' | Cấp độ: ' . $lesson->level_label,
            'Chuỗi bài: ' . ($lesson->series?->name ?? '(độc lập)'),
            'Thế cờ mở đầu (FEN): ' . ($lesson->initial_fen ?: '(thế xuất phát chuẩn)'),
            '',
            'CHUỖI NƯỚC ĐI (đã xác thực — KHÔNG được đổi):',
        ];

        foreach ($lesson->steps as $s) {
            $ref = $referenceAnnotations[$s->step_order] ?? null;
            $side = $s->move_side === 'den' ? 'Đen' : ($s->move_side === 'do' ? 'Đỏ' : '');
            $line = "  Bước {$s->step_order}: {$side} {$s->move_notation_iccs}"
                . ' (' . $s->moved_piece . ($s->captured_piece ? ' ăn ' . $s->captured_piece : '') . ')';
            if ($ref) {
                $line .= ' — [lời giảng gốc tham khảo, viết lại bằng lời riêng]: ' . mb_substr(strip_tags($ref), 0, 300);
            }
            $lines[] = $line;
        }

        if ($lesson->summary) {
            $lines[] = '';
            $lines[] = 'Ghi chú tổng quan gốc (tham khảo, viết lại): ' . mb_substr(strip_tags($lesson->summary), 0, 500);
        }

        return implode("\n", $lines);
    }

    private function run(string $prompt, string $type, ?int $referenceId = null, ?string $referenceType = null): array
    {
        $provider = $this->getProvider();
        $model    = $this->getModel();

        $log = AiGenerationLog::create([
            'type'           => $type,
            'reference_id'   => $referenceId,
            'reference_type' => $referenceType,
            'prompt'         => $prompt,
            'model'          => $model ?? $provider,
            'status'         => 'pending',
            'created_by'     => auth()->id(),
        ]);

        try {
            $agent = new LessonWriterAgent;
            $response = $model
                ? $agent->prompt($prompt, provider: $provider, model: $model)
                : $agent->prompt($prompt, provider: $provider);

            $result = $response instanceof Arrayable
                ? $response->toArray()
                : (json_decode($response->text, true) ?? []);

            $tokens = null;
            if (isset($response->usage)) {
                $tokens = ($response->usage->promptTokens ?? 0) + ($response->usage->completionTokens ?? 0);
            }

            $log->update([
                'result'      => is_array($result) ? json_encode($result, JSON_UNESCAPED_UNICODE) : (string) $response->text,
                'tokens_used' => $tokens,
                'status'      => 'completed',
            ]);

            return $result;
        } catch (\Throwable $e) {
            $log->update(['status' => 'failed', 'error_message' => $e->getMessage()]);
            Log::error('CotuongContentService error', ['type' => $type, 'message' => $e->getMessage()]);
            throw $e;
        }
    }
}
