<?php

namespace App\Http\Middleware;

use App\Models\AccessLog;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

// Ghi lịch sử truy cập của USER đã đăng nhập (chỉ GET trang, không ghi asset/api) — cho admin xem.
class LogAccess
{
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($request->isMethod('GET') && $request->user()
            && ! $request->ajax()
            && ! $request->is('admin*', 'api/*', 'storage/*', '*.css', '*.js', '*.ico', '*.png', '*.jpg')) {
            try {
                AccessLog::create([
                    'user_id'    => $request->user()->id,
                    'url'        => mb_substr($request->path(), 0, 500),
                    'ip'         => $request->ip(),
                    'user_agent' => mb_substr((string) $request->userAgent(), 0, 500),
                    'created_at' => now(),
                ]);
            } catch (\Throwable $e) {
                // không chặn request nếu ghi log lỗi
            }
        }

        return $response;
    }
}
