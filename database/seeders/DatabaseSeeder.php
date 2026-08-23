<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    // Seed toàn bộ cho môi trường mới (hosting): tài khoản admin + nội dung bài học từ JSON.
    public function run(): void
    {
        $this->call([
            AdminUserSeeder::class,   // admin@cotuong.test / cotuong@2026 — ĐỔI mật khẩu sau khi deploy
            ContentSeeder::class,     // 14 bài học từ database/seeders/data/content.json
        ]);
    }
}
