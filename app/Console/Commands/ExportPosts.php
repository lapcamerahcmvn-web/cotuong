<?php

namespace App\Console\Commands;

use App\Models\Post;
use Illuminate\Console\Command;

// Xuất bảng `posts` (Tin tức) ra JSON ship theo git (mirror ExportPages/ExportContent).
// Hosting nạp lại qua PostSeeder — cần post_categories đã có (PostCategorySeeder chạy trước).
class ExportPosts extends Command
{
    protected $signature = 'cotuong:export-posts {--out=database/seeders/data/posts.json}';

    protected $description = 'Xuất bài viết Tin tức (bảng posts) ra JSON để seed trên hosting';

    public function handle(): int
    {
        $out = base_path($this->option('out'));
        @mkdir(dirname($out), 0777, true);

        $posts = Post::with('category')->orderBy('id')->get()->map(fn (Post $p) => [
            'slug' => $p->slug,
            'category_slug' => $p->category?->slug,
            'title' => $p->title,
            'excerpt' => $p->excerpt,
            'content' => $p->content,
            'thumbnail' => $p->thumbnail,
            'is_featured' => $p->is_featured,
            'status' => $p->status,
            'seo_title' => $p->seo_title,
            'seo_description' => $p->seo_description,
        ])->values();

        file_put_contents($out, json_encode(
            ['exported_at' => now()->toIso8601String(), 'posts' => $posts],
            JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
        ));

        $this->info("Xuất {$posts->count()} bài viết → {$out}");

        return self::SUCCESS;
    }
}
