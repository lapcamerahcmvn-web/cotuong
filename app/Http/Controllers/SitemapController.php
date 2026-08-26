<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonSeries;
use Illuminate\Support\Carbon;

// Sitemap dạng CHỈ MỤC (index) + sitemap con theo từng mục, tất cả động.
// robots.txt cũng động (trỏ sitemap index + mời AI crawlers).
class SitemapController extends Controller
{
    // Danh sách các sitemap con (mục) — 'pages' + các giai đoạn có bài + cờ úp.
    private function sections(): array
    {
        $out = ['pages'];
        foreach (array_keys(Lesson::PHASES) as $ph) {
            if (Lesson::published()->mode('co-tuong')->where('phase', $ph)->exists()) {
                $out[] = $ph;
            }
        }
        if (Lesson::published()->mode('co-up')->exists()) {
            $out[] = 'co-up';
        }
        return $out;
    }

    // /sitemap.xml — chỉ mục trỏ tới các sitemap con.
    public function index()
    {
        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n"
            . '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        foreach ($this->sections() as $s) {
            $xml .= '  <sitemap><loc>' . htmlspecialchars(url('/sitemap-' . $s . '.xml'), ENT_XML1)
                . '</loc><lastmod>' . $this->sectionLastmod($s) . '</lastmod></sitemap>' . "\n";
        }
        $xml .= '</sitemapindex>';

        return response($xml, 200)
            ->header('Content-Type', 'application/xml; charset=UTF-8')
            ->header('Cache-Control', 'public, max-age=3600');
    }

    // /sitemap-{section}.xml — sitemap con của một mục.
    public function section(string $section)
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

        if ($section === 'pages') {
            $add(route('home'), now(), 'daily', '1.0');
            $add(route('sitemap.page'), now(), 'weekly', '0.4');
            foreach ($this->sections() as $s) {
                if ($s === 'pages') {
                    continue;
                }
                $q = $s === 'co-up' ? Lesson::published()->mode('co-up') : Lesson::published()->mode('co-tuong')->where('phase', $s);
                $add(route('phase', $s), $q->max('updated_at'), 'weekly', '0.8');
            }
            foreach (LessonSeries::orderBy('id')->get() as $sr) {
                if ($sr->publishedLessons()->exists()) {
                    $add(route('series', $sr->slug), $sr->updated_at, 'weekly', '0.7');
                }
            }
        } elseif ($section === 'co-up') {
            foreach (Lesson::published()->mode('co-up')->orderBy('id')->get(['slug', 'updated_at']) as $l) {
                $add(route('lessons.show', $l->slug), $l->updated_at, 'monthly', '0.6');
            }
        } elseif (array_key_exists($section, Lesson::PHASES)) {
            foreach (Lesson::published()->mode('co-tuong')->where('phase', $section)->orderBy('id')->get(['slug', 'updated_at']) as $l) {
                $add(route('lessons.show', $l->slug), $l->updated_at, 'monthly', '0.6');
            }
        } else {
            abort(404);
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

        return response($xml, 200)
            ->header('Content-Type', 'application/xml; charset=UTF-8')
            ->header('Cache-Control', 'public, max-age=3600');
    }

    private function sectionLastmod(string $section): string
    {
        if ($section === 'pages') {
            return now()->toAtomString();
        }
        $q = $section === 'co-up'
            ? Lesson::published()->mode('co-up')
            : Lesson::published()->mode('co-tuong')->where('phase', $section);
        $max = $q->max('updated_at');
        return ($max ? Carbon::parse($max) : now())->toAtomString();
    }

    // /robots.txt — động: cho phép index, chặn trang riêng tư, mời AI crawlers, trỏ sitemap index.
    public function robots()
    {
        $lines = [
            'User-agent: *',
            'Allow: /',
            'Disallow: /admin',
            'Disallow: /tai-khoan',
            'Disallow: /dang-nhap',
            'Disallow: /dang-ky',
            'Disallow: /tim-kiem',
            '',
            '# AI / LLM crawlers — cho phép để nội dung học cờ xuất hiện trong AI search',
        ];
        foreach (['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'Google-Extended', 'PerplexityBot', 'ClaudeBot', 'Claude-Web', 'anthropic-ai'] as $bot) {
            $lines[] = "User-agent: {$bot}";
            $lines[] = 'Allow: /';
            $lines[] = '';
        }
        $lines[] = 'Sitemap: ' . url('/sitemap.xml');
        $lines[] = '# AI-readable site overview: ' . url('/llms.txt');

        return response(implode("\n", $lines) . "\n", 200)
            ->header('Content-Type', 'text/plain; charset=UTF-8')
            ->header('Cache-Control', 'public, max-age=3600');
    }

    // /so-do-trang — sơ đồ trang cho người dùng (HTML sitemap).
    public function page()
    {
        $series = LessonSeries::with(['publishedLessons' => fn ($q) => $q->orderBy('order_in_series')])
            ->orderBy('sort_order')->orderBy('id')->get()
            ->filter(fn ($s) => $s->publishedLessons->isNotEmpty())
            ->values();

        return view('lessons.sitemap', compact('series'));
    }
}
