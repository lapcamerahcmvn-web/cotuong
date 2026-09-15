<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Database\Seeder;

// Nạp bài viết Tin tức từ database/seeders/data/posts.json (do cotuong:export-posts xuất).
// Cần PostCategorySeeder chạy trước (khớp category theo slug).
// Chạy: php artisan db:seed --class=PostSeeder --force
class PostSeeder extends Seeder
{
    public function run(): void
    {
        $path = base_path('database/seeders/data/posts.json');
        if (! is_file($path)) {
            $this->command?->warn('Không thấy posts.json — chạy cotuong:export-posts trước.');

            return;
        }

        $data = json_decode(file_get_contents($path), true);
        if (! is_array($data)) {
            $this->command?->error('posts.json không hợp lệ.');

            return;
        }

        $categoryBySlug = PostCategory::pluck('id', 'slug');
        $n = 0;
        foreach (($data['posts'] ?? []) as $p) {
            $postData = collect($p)->except(['slug', 'category_slug'])->toArray();
            $postData['post_category_id'] = $categoryBySlug[$p['category_slug'] ?? ''] ?? null;
            if (($postData['status'] ?? null) === 'published') {
                $postData['published_at'] = now();
            }

            Post::updateOrCreate(['slug' => $p['slug']], $postData);
            $n++;
        }

        $this->command?->info("Đã nạp {$n} bài viết từ posts.json.");
    }
}
