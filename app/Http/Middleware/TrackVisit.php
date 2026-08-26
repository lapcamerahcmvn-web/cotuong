<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

// Ghi nhận lượt xem trang frontend (đã lọc bot) vào bảng page_visits cho thống kê admin.
class TrackVisit
{
    private const BOTS = ['bot', 'crawl', 'spider', 'slurp', 'gptbot', 'claudebot', 'perplexity',
        'bytespider', 'facebookexternalhit', 'headless', 'lighthouse', 'pingdom', 'uptime', 'preview'];

    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        try {
            if ($this->trackable($request, $response)) {
                $ua = mb_strtolower((string) $request->userAgent());
                if ($ua !== '' && ! $this->isBot($ua)) {
                    $seed = ($request->hasSession() ? $request->session()->getId() : null) ?: $request->ip();
                    DB::table('page_visits')->insert([
                        'path'         => mb_substr($request->path(), 0, 250),
                        'lesson_id'    => $request->route('lesson') instanceof \App\Models\Lesson
                                            ? $request->route('lesson')->id : null,
                        'visitor_hash' => substr(hash('sha256', $seed . '|' . $ua), 0, 64),
                        'visited_on'   => now()->toDateString(),
                        'created_at'   => now(),
                    ]);
                }
            }
        } catch (\Throwable $e) {
            // không để lỗi thống kê ảnh hưởng trang
        }

        return $response;
    }

    private function trackable(Request $request, Response $response): bool
    {
        if (! $request->isMethod('GET') || $request->ajax()) {
            return false;
        }
        if ($response->getStatusCode() !== 200) {
            return false;
        }
        $path = $request->path();
        foreach (['admin', 'dang-nhap', 'dang-ky', 'dang-xuat', 'tai-khoan', 'tien-do', 'binh-luan',
                  'sitemap.xml', 'robots.txt', 'llms.txt', 'css/', 'js/', 'images/', 'storage/', 'favicon'] as $skip) {
            if ($path === $skip || str_starts_with($path, rtrim($skip, '/') . '/') || str_starts_with($path, $skip)) {
                return false;
            }
        }
        return true;
    }

    private function isBot(string $ua): bool
    {
        foreach (self::BOTS as $b) {
            if (str_contains($ua, $b)) {
                return true;
            }
        }
        return false;
    }
}
