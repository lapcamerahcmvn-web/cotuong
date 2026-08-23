<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

// Chỉ cho role 'admin' — bảo vệ khu vực nhạy cảm (nguồn tài liệu bản quyền). Role 'bien_tap'
// chỉ được vào các module bài học thông thường.
class EnsureAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless($request->user() && $request->user()->isAdmin(), 403, 'Chỉ Quản trị viên mới truy cập được khu vực này.');
        return $next($request);
    }
}
