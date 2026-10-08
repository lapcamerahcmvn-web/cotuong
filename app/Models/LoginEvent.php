<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

// Lịch sử đăng nhập (Admin › Người dùng). Giữ 180 ngày như nhật ký truy cập (Chính sách bảo mật).
class LoginEvent extends Model
{
    public const UPDATED_AT = null;

    protected $fillable = ['user_id', 'email', 'method', 'success', 'ip', 'user_agent'];

    protected $casts = ['success' => 'boolean'];

    public const METHODS = ['password' => 'Email + mật khẩu', 'google' => 'Google', 'register' => 'Đăng ký mới', 'remember' => 'Tự đăng nhập lại (ghi nhớ)'];

    public static function record(Request $request, ?User $user, string $method, bool $success = true, ?string $email = null): void
    {
        try {
            static::create([
                'user_id' => $user?->id, 'email' => $email ?? $user?->email, 'method' => $method, 'success' => $success,
                'ip' => $request->ip(), 'user_agent' => mb_substr((string) $request->userAgent(), 0, 500),
            ]);
            if (random_int(1, 100) === 1) static::where('created_at', '<', now()->subDays(180))->delete();
        } catch (\Throwable $e) {
            // không chặn đăng nhập nếu ghi lịch sử lỗi
        }
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
