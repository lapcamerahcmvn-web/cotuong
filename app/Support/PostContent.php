<?php

namespace App\Support;

use App\Models\Lesson;
use Illuminate\Support\Str;

/**
 * Nội dung bài "Tin tức" là HTML thô từ TinyMCE (giống lessons.content) NHƯNG có thể chứa
 * shortcode [co-tuong fen="..."] hoặc [co-tuong lesson="slug"] để nhúng bàn cờ thật —
 * không thể nhúng cú pháp Blade trực tiếp vào HTML lưu DB nên dùng shortcode rồi thay thế
 * bằng <x-chess-board> ở đây trước khi render() ra view bài viết.
 */
class PostContent
{
    public static function render(?string $html): string
    {
        if (! $html) {
            return '';
        }

        return preg_replace_callback('/\[co-tuong([^\]]*)\]/i', function ($m) {
            preg_match_all('/(\w+)="([^"]*)"/', $m[1], $attrs, PREG_SET_ORDER);
            $a = collect($attrs)->mapWithKeys(fn ($x) => [$x[1] => $x[2]])->all();

            if (! empty($a['lesson'])) {
                $lesson = Lesson::with('steps')->where('slug', $a['lesson'])->first();
                if (! $lesson) {
                    return '<p><em>[Không tìm thấy bài học "'.e($a['lesson']).'" để nhúng bàn cờ]</em></p>';
                }

                return view('components.chess-board', [
                    'initialFen' => $lesson->initial_fen,
                    'steps' => $lesson->steps,
                    'tree' => $lesson->variation_tree,
                    'showList' => true,
                ])->render();
            }

            if (! empty($a['fen'])) {
                return view('components.chess-board', [
                    'initialFen' => $a['fen'],
                    'steps' => [],
                    'tree' => null,
                    'showList' => false,
                    'caption' => $a['caption'] ?? null,
                ])->render();
            }

            return '';
        }, $html);
    }

    /** Đoạn giới thiệu ngắn cho card/meta description khi bài không có excerpt riêng. */
    public static function autoExcerpt(?string $html, int $limit = 160): string
    {
        return Str::limit(trim(strip_tags((string) $html)), $limit);
    }
}
