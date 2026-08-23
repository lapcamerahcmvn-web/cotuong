<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

// Quản lý người dùng (admin): thông tin, bài đã học, lịch sử truy cập.
class UserController extends Controller
{
    public function index(Request $request)
    {
        $q = User::query()->withCount([
            'progress as completed_count' => fn ($x) => $x->where('status', 'completed'),
        ])->latest('last_login_at');

        if ($kw = $request->get('q')) {
            $q->where(fn ($w) => $w->where('name', 'like', "%{$kw}%")->orWhere('email', 'like', "%{$kw}%"));
        }
        if ($role = $request->get('role')) {
            $q->where('role', $role);
        }

        $users = $q->paginate(25)->withQueryString();
        return view('admin.users.index', compact('users'));
    }

    public function show(User $user)
    {
        $progress = $user->progress()->with('lesson')->latest('updated_at')->get();
        $logs = $user->accessLogs()->latest('created_at')->limit(80)->get();

        return view('admin.users.show', compact('user', 'progress', 'logs'));
    }
}
