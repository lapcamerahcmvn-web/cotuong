<?php

namespace App\Support;

use App\Models\Lesson;
use App\Models\LessonStep;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

/**
 * Tạo 1 Lesson + LessonStep từ dữ liệu bàn cờ soạn tay (thế mở + mạch chính + cây biến) —
 * dùng chung giữa Admin\BoardEditorController (Admin tự soạn) và LibraryController (người dùng
 * "Gửi cho Admin duyệt" từ Thư viện). Trích ra từ BoardEditorController::store() ban đầu.
 */
class LessonComposer
{
    /**
     * @param  array  $fields  title/series_id/order_in_series/game_mode/phase/level/status/
     *                         is_featured/summary/content/seo_title/seo_description/initial_fen
     * @param  array  $steps  mạch chính tuyến tính [{fen,iccs,wxf,side,caption}, ...]
     * @param  array  $tree  cây biến lồng nhau [{from,to,iccs,wxf,side,reveal,fen,caption,children}]
     */
    public static function create(array $fields, array $steps, array $tree, ?int $submittedByUserId = null): Lesson
    {
        $hasBranch = self::hasBranch($tree);
        $status = $fields['status'] ?? 'draft';

        return DB::transaction(function () use ($fields, $steps, $tree, $hasBranch, $status, $submittedByUserId) {
            $lesson = Lesson::create([
                'submitted_by_user_id' => $submittedByUserId,
                'series_id' => $fields['series_id'] ?? null,
                'order_in_series' => $fields['order_in_series'] ?? null,
                'game_mode' => $fields['game_mode'] ?? 'co-tuong',
                'phase' => ($fields['game_mode'] ?? 'co-tuong') === 'co-up' ? null : ($fields['phase'] ?? null),
                'title' => $fields['title'],
                'slug' => self::uniqueSlug($fields['title']),
                'level' => $fields['level'] ?? 'co-ban',
                'source_type' => 'manual',
                'initial_fen' => $fields['initial_fen'],
                'variation_tree' => ($tree && $hasBranch) ? $tree : null,
                'move_count' => count($steps),
                'summary' => $fields['summary'] ?? null,
                'content' => $fields['content'] ?? null,
                'seo_title' => $fields['seo_title'] ?? null,
                'seo_description' => $fields['seo_description'] ?? null,
                'is_featured' => $fields['is_featured'] ?? false,
                'status' => $status,
                'published_at' => $status === 'published' ? now() : null,
            ]);

            foreach ($steps as $i => $s) {
                LessonStep::create([
                    'lesson_id' => $lesson->id,
                    'step_order' => $i + 1,
                    'fen' => $s['fen'] ?? $lesson->initial_fen,
                    'move_notation_iccs' => $s['iccs'] ?? null,
                    'move_notation_wxf' => $s['wxf'] ?? null,
                    'move_side' => in_array($s['side'] ?? null, ['do', 'den']) ? $s['side'] : 'do',
                    'caption' => $s['caption'] ?? null,
                ]);
            }

            return $lesson;
        });
    }

    // Chỉ giữ variation_tree khi có nhánh thật (1 node >1 con) — bài tuyến tính → null.
    private static function hasBranch(array $nodes): bool
    {
        foreach ($nodes as $n) {
            if (count($n['children'] ?? []) > 1) {
                return true;
            }
            if (! empty($n['children']) && self::hasBranch($n['children'])) {
                return true;
            }
        }

        return false;
    }

    public static function uniqueSlug(string $title): string
    {
        $base = Str::slug($title) ?: 'bai-hoc';
        $slug = $base;
        $i = 1;
        while (Lesson::where('slug', $slug)->exists()) {
            $slug = $base.'-'.(++$i);
        }

        return $slug;
    }
}
