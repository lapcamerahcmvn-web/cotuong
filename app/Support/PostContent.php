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

        // Sơ đồ tư duy: [so-do-tu-duy …] (xem App\Support\Mindmap::shortcode). TinyMCE có thể bọc shortcode trong <p>.
        $html = preg_replace_callback('/(?:<p>\s*)?\[so-do-tu-duy([^\]]*)\](?:\s*<\/p>)?/iu', function ($m) {
            preg_match_all('/([\w-]+)="([^"]*)"/u', $m[1], $attrs, PREG_SET_ORDER);

            return Mindmap::shortcode(collect($attrs)->mapWithKeys(fn ($x) => [$x[1] => html_entity_decode($x[2], ENT_QUOTES | ENT_HTML5, 'UTF-8')])->all());
        }, $html);

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

    /**
     * Gắn id cho mọi <h2> (để mục lục nhảy tới được) và trả [html mới, mục lục [[id, chữ]...]].
     * Giữ nguyên id sẵn có nếu biên tập viên đã đặt.
     */
    public static function withToc(string $html): array
    {
        $toc = [];
        $used = [];
        $html = preg_replace_callback('/<h2([^>]*)>(.*?)<\/h2>/is', function ($m) use (&$toc, &$used) {
            $text = trim(html_entity_decode(strip_tags($m[2]), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
            if ($text === '') {
                return $m[0];
            }
            if (preg_match('/\bid="([^"]+)"/', $m[1], $idm)) {
                $id = $idm[1];
                $attrs = $m[1];
            } else {
                $id = Str::slug($text) ?: 'muc';
                $base = $id;
                for ($i = 2; isset($used[$id]); $i++) $id = $base.'-'.$i;
                $attrs = $m[1].' id="'.$id.'"';
            }
            $used[$id] = true;
            $toc[] = [$id, $text];

            return '<h2'.$attrs.'>'.$m[2].'</h2>';
        }, $html);

        return [$html, $toc];
    }

    /**
     * Câu hỏi thường gặp cho schema FAQPage: lấy các cặp <h3>hỏi</h3> + đoạn trả lời nằm sau
     * <h2> có chữ "Câu hỏi thường gặp" (tới <h2> kế tiếp). Không có mục đó → [].
     *
     * @return array<int, array{0: string, 1: string}>
     */
    public static function faq(?string $html): array
    {
        if (! $html || ! preg_match('/<h2[^>]*>[^<]*câu hỏi thường gặp[^<]*<\/h2>(.*?)(?=<h2|$)/isu', $html, $m)) {
            return [];
        }
        preg_match_all('/<h3[^>]*>(.*?)<\/h3>(.*?)(?=<h3|$)/is', $m[1], $qs, PREG_SET_ORDER);
        $clean = fn ($x) => trim(preg_replace('/\s+/u', ' ', html_entity_decode(strip_tags($x), ENT_QUOTES | ENT_HTML5, 'UTF-8')));

        return collect($qs)->map(fn ($q) => [$clean($q[1]), $clean($q[2])])
            ->filter(fn ($q) => $q[0] !== '' && $q[1] !== '')->values()->all();
    }

    /** Slug các bài học được nhắc trong bài viết (shortcode + link /bai-hoc/...), theo thứ tự xuất hiện. */
    public static function lessonSlugs(?string $html): array
    {
        preg_match_all('#(?:lesson="|/bai-hoc/)([a-z0-9-]+)#', (string) $html, $m);

        return array_values(array_unique($m[1]));
    }

    /** Đoạn giới thiệu ngắn cho card/meta description khi bài không có excerpt riêng. */
    public static function autoExcerpt(?string $html, int $limit = 160): string
    {
        return Str::limit(trim(strip_tags((string) $html)), $limit);
    }
}
