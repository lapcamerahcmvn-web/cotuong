<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

// Trạng thái "đang online" cho đấu bạn: ghi users.last_seen_at tối đa 1 lần/phút (không chạm updated_at).
class TouchLastSeen
{
    public function handle(Request $request, Closure $next): Response
    {
        $u = $request->user();
        if ($u && (! $u->last_seen_at || $u->last_seen_at->lt(now()->subMinute()))) {
            DB::table('users')->where('id', $u->id)->update(['last_seen_at' => now()]);
            $u->last_seen_at = now();
        }

        return $next($request);
    }
}
