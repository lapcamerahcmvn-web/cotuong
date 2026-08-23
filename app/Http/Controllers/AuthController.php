<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

// Đăng nhập thống nhất: Google (người học) + email/mật khẩu (quản trị). route('login') = /dang-nhap.
class AuthController extends Controller
{
    public function showLogin()
    {
        if (Auth::check()) {
            return redirect()->intended(route('account.index'));
        }
        return view('auth.login', [
            'googleEnabled' => (bool) config('services.google.client_id'),
        ]);
    }

    // Đăng nhập bằng email/mật khẩu (chủ yếu cho admin).
    public function loginPassword(Request $request)
    {
        $data = $request->validate([
            'email'    => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($data, $request->boolean('remember'))) {
            $request->session()->regenerate();
            Auth::user()->forceFill(['last_login_at' => now()])->saveQuietly();
            return redirect()->intended(Auth::user()->isAdmin() ? route('admin.dashboard') : route('account.index'));
        }

        return back()->withErrors(['email' => 'Email hoặc mật khẩu không đúng.'])->onlyInput('email');
    }

    public function googleRedirect()
    {
        abort_unless(config('services.google.client_id'), 404, 'Chưa cấu hình đăng nhập Google.');
        return Socialite::driver('google')->redirect();
    }

    public function googleCallback()
    {
        abort_unless(config('services.google.client_id'), 404);
        try {
            $g = Socialite::driver('google')->user();
        } catch (\Throwable $e) {
            return redirect()->route('login')->withErrors(['email' => 'Đăng nhập Google thất bại, thử lại nhé.']);
        }

        $user = User::where('google_id', $g->getId())->first()
            ?? User::where('email', $g->getEmail())->first();

        if ($user) {
            $user->forceFill([
                'google_id'     => $g->getId(),
                'avatar'        => $g->getAvatar(),
                'last_login_at' => now(),
            ])->save();
        } else {
            $user = User::create([
                'name'          => $g->getName() ?: 'Người học',
                'email'         => $g->getEmail(),
                'password'      => bcrypt(Str::random(32)),
                'role'          => 'hoc_vien',   // người học thường
                'google_id'     => $g->getId(),
                'avatar'        => $g->getAvatar(),
                'last_login_at' => now(),
            ]);
        }

        Auth::login($user, true);
        return redirect()->intended(route('account.index'));
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('home');
    }
}
