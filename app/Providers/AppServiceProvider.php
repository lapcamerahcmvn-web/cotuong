<?php

namespace App\Providers;

use App\Support\Seo;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // WAMP MySQL local mặc định storage engine = MyISAM (key tối đa 1000 byte). Các
        // migration khung của Laravel (users/cache/jobs) không khai báo InnoDB nên bị MyISAM;
        // VARCHAR(255) utf8mb4 = 1020 byte > 1000 → lỗi index. Giới hạn 191 để an toàn.
        // (Migration RIÊNG của dự án vẫn khai báo $table->engine='InnoDB' — xem .claude rules.)
        Schema::defaultStringLength(191);

        // Dùng view phân trang tùy biến (dự án không load Tailwind — view mặc định của Laravel
        // dùng class Tailwind nên hiển thị vỡ). Xem resources/views/vendor/pagination/cotuong.blade.php.
        Paginator::defaultView('vendor.pagination.cotuong');
        Paginator::defaultSimpleView('vendor.pagination.cotuong');

        // Biến SEO dùng chung cho layout: ảnh OG mặc định (suy ra từ route hiện tại,
        // trang bài học / chuỗi tự set @section('og_image') riêng) + JSON-LD Organization/WebSite.
        View::composer('layouts.app', function ($view) {
            $route = request()->route();
            $name = $route?->getName();
            $subject = match ($name) {
                'lessons.show' => $route->parameter('lesson'),
                'series' => $route->parameter('series'),
                'phase' => $route->parameter('phase'),
                default => null,
            };

            $view->with([
                'ogImageDefault' => Seo::ogImage($subject),
                'siteName' => config('site.name'),
                'siteTwitter' => config('site.twitter'),
                'orgLd' => Seo::organizationLd(),
                'websiteLd' => Seo::websiteLd(),
                // Chip chuỗi ngày / XP / mục tiêu ngày trên header (chỉ khi đăng nhập).
                'hud' => auth()->check() ? app(\App\Services\Gamification\GamificationService::class)->snapshot(auth()->user()) : null,
                // Giải xếp hạng tuần chưa xem → bảng chúc mừng 1 lần (giải tuần trước được chốt "lười" ở đây).
                'weeklyAward' => auth()->check() ? $this->weeklyAward() : null,
            ]);
        });
    }

    private function weeklyAward(): ?array
    {
        $svc = app(\App\Services\Gamification\WeeklyService::class);
        $svc->ensureFinalized();
        $a = $svc->unseen(auth()->user());
        if (! $a) {
            return null;
        }
        $p = $a->prize();

        return [
            'id' => $a->id, 'rank' => $a->rank, 'score' => $a->score, 'xp' => $a->xp, 'name' => $p['name'],
            'medal' => $p['medal'], 'freezes' => $p['freezes'],
            'week' => $a->week_start->format('d/m') . '–' . $a->week_start->addDays(6)->format('d/m'),
        ];
    }
}
