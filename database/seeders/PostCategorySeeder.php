<?php

namespace Database\Seeders;

use App\Models\PostCategory;
use Illuminate\Database\Seeder;

// 4 chuyên mục mặc định cho Tin tức — chạy 1 lần: php artisan db:seed --class=PostCategorySeeder --force
// (không tự động trong DatabaseSeeder::run(), giống PagesSeeder — tránh chạy lại làm phiền dữ liệu khác).
class PostCategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name' => 'Video Hướng Dẫn', 'slug' => 'video-huong-dan', 'sort_order' => 1],
            ['name' => 'Phân Tích Ván Cờ', 'slug' => 'phan-tich-van-co', 'sort_order' => 2],
            ['name' => 'Tin Cộng Đồng & Giải Đấu', 'slug' => 'tin-cong-dong-giai-dau', 'sort_order' => 3],
            ['name' => 'Kiến Thức Cờ Tướng', 'slug' => 'kien-thuc-co-tuong', 'sort_order' => 4],
        ];

        foreach ($categories as $c) {
            PostCategory::firstOrCreate(['slug' => $c['slug']], $c);
        }
    }
}
