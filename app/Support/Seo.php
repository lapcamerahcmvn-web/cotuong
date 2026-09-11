<?php

namespace App\Support;

use App\Models\Lesson;
use App\Models\LessonSeries;

/**
 * Tiện ích SEO dùng chung: chọn ảnh OG/preview cho từng trang + dựng JSON-LD
 * Organization / WebSite. KHÔNG phụ thuộc request — nhận thẳng model/slug.
 *
 * Ảnh OG là file PNG tĩnh commit sẵn trong public/og/ (sinh ở LOCAL bằng
 * tools/og-image). Ở đây chỉ chọn file phù hợp nhất đang tồn tại theo thứ tự
 * ưu tiên, rơi dần về ảnh giai đoạn rồi ảnh trang chủ.
 */
class Seo
{
    /**
     * URL TUYỆT ĐỐI tới ảnh OG cho một Lesson, LessonSeries, slug giai đoạn,
     * hoặc null (→ ảnh trang chủ). Có cache-bust ?v={mtime} để share lại đúng ảnh mới.
     */
    public static function ogImage(mixed $subject = null): string
    {
        $candidates = [];

        if ($subject instanceof Lesson) {
            $candidates[] = "og/lessons/{$subject->slug}.png";
            $candidates[] = self::phaseImage($subject->phase, $subject->game_mode);
        } elseif ($subject instanceof LessonSeries) {
            $candidates[] = "og/series/{$subject->slug}.png";
            $candidates[] = self::phaseImage($subject->phase, $subject->game_mode);
        } elseif (is_string($subject) && $subject !== '') {
            $candidates[] = "og/phase-{$subject}.png";
        }

        $candidates[] = 'og/home.png';
        $candidates[] = 'icon-512.png'; // luôn tồn tại sau P0

        foreach (array_filter($candidates) as $rel) {
            $abs = public_path($rel);
            if (is_file($abs)) {
                return asset($rel).'?v='.@filemtime($abs);
            }
        }

        return asset('icon-512.png');
    }

    private static function phaseImage(?string $phase, ?string $gameMode): ?string
    {
        if ($gameMode === 'co-up') {
            return 'og/phase-co-up.png';
        }

        return $phase ? "og/phase-{$phase}.png" : null;
    }

    public static function organizationLd(): array
    {
        return array_filter([
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            '@id' => url('/#org'),
            'name' => config('site.name'),
            'url' => url('/'),
            'logo' => [
                '@type' => 'ImageObject',
                'url' => asset('icon-512.png'),
                'width' => 512,
                'height' => 512,
            ],
            'description' => config('site.description'),
            'sameAs' => config('site.social') ?: null,
        ]);
    }

    public static function websiteLd(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type' => 'WebSite',
            '@id' => url('/#website'),
            'name' => config('site.name'),
            'url' => url('/'),
            'inLanguage' => 'vi-VN',
            'publisher' => ['@id' => url('/#org')],
            'potentialAction' => [
                '@type' => 'SearchAction',
                'target' => [
                    '@type' => 'EntryPoint',
                    'urlTemplate' => route('search').'?q={search_term_string}',
                ],
                'query-input' => 'required name=search_term_string',
            ],
        ];
    }

    /** Encode 1 mảng JSON-LD thành chuỗi <script> an toàn cho Blade. */
    public static function ld(array $data): string
    {
        return '<script type="application/ld+json">'
            .json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
            .'</script>';
    }
}
