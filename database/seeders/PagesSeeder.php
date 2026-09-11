<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

// Nạp trang nội dung biên tập từ database/seeders/data/pages.json (upsert theo slug).
// Chạy trên hosting sau khi pages.json đổi: php artisan db:seed --class=PagesSeeder --force
class PagesSeeder extends Seeder
{
    public function run(): void
    {
        $file = database_path('seeders/data/pages.json');
        if (! is_file($file)) {
            $this->command?->warn('Không thấy pages.json — bỏ qua PagesSeeder.');

            return;
        }

        $data = json_decode(file_get_contents($file), true);
        foreach ($data['pages'] ?? [] as $p) {
            Page::updateOrCreate(['slug' => $p['slug']], collect($p)->except('slug')->toArray());
        }

        $this->command?->info('PagesSeeder: '.count($data['pages'] ?? []).' trang.');
    }
}
