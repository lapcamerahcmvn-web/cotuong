<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

// Tài khoản bị khoá (Admin › Người dùng › Khoá) → đăng xuất ngay ở request kế tiếp.
class EnsureNotBanned
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()?->banned_at) {
            Auth::logout();
            if ($request->hasSession()) {
                $request->session()->invalidate();
                $request->session()->regenerateToken();
            }
            if ($request->expectsJson()) {
                return response()->json(['message' => 'Tài khoản đã bị khoá.'], 403);
            }
            return redirect()->route('login')->withErrors(['email' => 'Tài khoản đã bị khoá. Liên hệ ' . config('site.contact_email') . ' nếu cần hỗ trợ.']);
        }

        return $next($request);
    }
}
