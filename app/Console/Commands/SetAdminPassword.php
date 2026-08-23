<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

// Đổi mật khẩu (và tạo nếu chưa có) tài khoản admin — chạy trên hosting qua SSH:
//   php artisan cotuong:admin-password admin@cotuong.test 'MatKhauManhMoi'
// Cần thiết vì repo public → mật khẩu mặc định trong seeder ai cũng biết.
class SetAdminPassword extends Command
{
    protected $signature = 'cotuong:admin-password {email} {password}';
    protected $description = 'Đặt lại mật khẩu tài khoản admin (đổi mật khẩu mặc định sau khi deploy)';

    public function handle(): int
    {
        $email = $this->argument('email');
        $password = $this->argument('password');

        if (strlen($password) < 8) {
            $this->error('Mật khẩu tối thiểu 8 ký tự.');
            return self::FAILURE;
        }

        $user = User::updateOrCreate(
            ['email' => $email],
            ['password' => Hash::make($password), 'role' => 'admin', 'name' => 'Quản trị viên']
        );

        $this->info("Đã đặt mật khẩu mới cho {$user->email} (vai trò: {$user->role}).");
        return self::SUCCESS;
    }
}
