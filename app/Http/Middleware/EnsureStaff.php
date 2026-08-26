<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

// Chỉ nhân sự (admin hoặc biên tập) mới vào được khu quản trị. Học viên bị chặn 403.
class EnsureStaff
{
    public function handle(Request $request, Closure $next): Response
    {
        abort_unless($request->user() && $request->user()->isStaff(), 403, 'Bạn không có quyền truy cập khu vực quản trị.');
        return $next($request);
    }
}
