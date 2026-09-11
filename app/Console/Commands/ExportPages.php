<?php

namespace App\Console\Commands;

use App\Models\Page;
use Illuminate\Console\Command;

// Xuất bảng `pages` ra JSON ship theo git (mirror ExportContent). Hosting nạp lại qua PagesSeeder.
class ExportPages extends Command
{
    protected $signature = 'cotuong:export-pages {--out=database/seeders/data/pages.json}';

    protected $description = 'Xuất trang nội dung biên tập (bảng pages) ra JSON để seed trên hosting';

    public function handle(): int
    {
        $out = base_path($this->option('out'));
        @mkdir(dirname($out), 0777, true);

        $pages = Page::orderBy('slug')->get()->map(fn ($p) => [
            'slug' => $p->slug,
            'title' => $p->title,
            'h1' => $p->h1,
            'lede' => $p->lede,
            'body_html' => $p->body_html,
            'seo_title' => $p->seo_title,
            'seo_description' => $p->seo_description,
            'og_image' => $p->og_image,
            'faq' => $p->faq,
        ])->values();

        file_put_contents($out, json_encode(
            ['exported_at' => now()->toIso8601String(), 'pages' => $pages],
            JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT
        ));

        $this->info("Xuất {$pages->count()} trang → {$out}");

        return self::SUCCESS;
    }
}
