<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\PostCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

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
        $n = $skipped = 0;
        foreach (($data['posts'] ?? []) as $p) {
            $postData = collect($p)->except(['slug', 'category_slug', 'published_at', 'updated_at'])->toArray();
            $postData['post_category_id'] = $categoryBySlug[$p['category_slug'] ?? ''] ?? null;
            $existing = Post::where('slug', $p['slug'])->first();

            // Bài đã có trên DB: chỉ ghi đè khi bản trong JSON MỚI HƠN (tránh đè bài đã sửa trực tiếp
            // trên hosting bằng bản cũ trong git). JSON cũ không có updated_at → coi là cũ, không đè.
            $jsonUpdated = ! empty($p['updated_at']) ? Carbon::parse($p['updated_at'])->startOfSecond() : null; // DB lưu tới giây
            if ($existing && (! $jsonUpdated || ($existing->updated_at && $existing->updated_at->gte($jsonUpdated)))) {
                $skipped++;

                continue;
            }

            // Ngày đăng giữ nguyên qua các lần seed (trước đây bị đặt lại = now() mỗi lần chạy).
            if (($postData['status'] ?? null) === 'published') {
                $postData['published_at'] = $existing?->published_at
                    ?? (! empty($p['published_at']) ? Carbon::parse($p['published_at']) : now());
            }

            $post = $existing ?? new Post(['slug' => $p['slug']]);
            $post->fill($postData);
            if ($jsonUpdated) {
                $post->updated_at = $jsonUpdated;
            }
            $post->save();
            $n++;
        }

        $this->command?->info("Đã nạp {$n} bài viết từ posts.json ({$skipped} bài trên DB đã mới hơn/không đổi — giữ nguyên).");
    }
}
