<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonSeries;
use Illuminate\Support\Carbon;

// Sitemap XML động: trang chủ + giai đoạn có bài + chuỗi (Course) + toàn bộ bài published.
class SitemapController extends Controller
{
    public function index()
    {
        $urls = [];
        $add = function (string $loc, $lastmod, string $freq, string $prio) use (&$urls) {
            $urls[] = [
                'loc'     => $loc,
                'lastmod' => ($lastmod instanceof Carbon ? $lastmod : Carbon::parse($lastmod ?? now()))->toAtomString(),
                'freq'    => $freq,
                'prio'    => $prio,
            ];
        };

        $add(route('home'), now(), 'daily', '1.0');

        // Giai đoạn cờ tướng có ít nhất 1 bài
        foreach (array_keys(Lesson::PHASES) as $ph) {
            $q = Lesson::published()->mode('co-tuong')->where('phase', $ph);
            if ($q->exists()) {
                $add(route('phase', $ph), $q->max('updated_at'), 'weekly', '0.8');
            }
        }
        // Cờ úp (game_mode riêng)
        $qu = Lesson::published()->mode('co-up');
        if ($qu->exists()) {
            $add(route('phase', 'co-up'), $qu->max('updated_at'), 'weekly', '0.8');
        }

        // Chuỗi bài (Course) có bài published
        foreach (LessonSeries::orderBy('id')->get() as $s) {
            if ($s->publishedLessons()->exists()) {
                $add(route('series', $s->slug), $s->updated_at, 'weekly', '0.7');
            }
        }

        // Bài học
        foreach (Lesson::published()->orderBy('id')->get(['slug', 'updated_at']) as $l) {
            $add(route('lessons.show', $l->slug), $l->updated_at, 'monthly', '0.6');
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n"
            . '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        foreach ($urls as $u) {
            $xml .= '  <url><loc>' . htmlspecialchars($u['loc'], ENT_XML1)
                . '</loc><lastmod>' . $u['lastmod']
                . '</lastmod><changefreq>' . $u['freq']
                . '</changefreq><priority>' . $u['prio']
                . '</priority></url>' . "\n";
        }
        $xml .= '</urlset>';

        return response($xml, 200)->header('Content-Type', 'application/xml; charset=UTF-8');
    }
}
