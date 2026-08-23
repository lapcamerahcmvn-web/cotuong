<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    public function run(): void
    {
        $email = env('ADMIN_EMAIL', 'admin@cotuong.test');
        // Ưu tiên ADMIN_PASSWORD trong .env (đặt mật khẩu riêng lúc deploy). Nếu không có mới
        // dùng mặc định — nhưng repo là PUBLIC nên PHẢI đổi ngay bằng: php artisan cotuong:admin-password
        $password = env('ADMIN_PASSWORD', 'cotuong@2026');

        // firstOrCreate: KHÔNG ghi đè mật khẩu nếu tài khoản đã tồn tại (giữ mật khẩu đã đổi).
        $user = User::firstOrCreate(
            ['email' => $email],
            ['name' => 'Quản trị viên', 'password' => Hash::make($password), 'role' => 'admin']
        );
        if ($user->role !== 'admin') {
            $user->update(['role' => 'admin']);
        }
    }
}
