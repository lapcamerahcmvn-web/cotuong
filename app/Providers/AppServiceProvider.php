<?php

namespace App\Providers;

use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Schema;
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
    }
}
