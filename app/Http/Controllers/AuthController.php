<?php

namespace App\Http\Controllers;

use App\Models\LoginEvent;
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
            if (Auth::user()->banned_at) {
                LoginEvent::record($request, Auth::user(), 'password', false);
                Auth::logout();
                return back()->withErrors(['email' => 'Tài khoản đã bị khoá. Liên hệ ' . config('site.contact_email') . ' nếu cần hỗ trợ.'])->onlyInput('email');
            }
            $request->session()->regenerate();
            Auth::user()->forceFill(['last_login_at' => now()])->saveQuietly();
            LoginEvent::record($request, Auth::user(), 'password');
            session()->flash('ga_event', 'login');
            return redirect()->intended(Auth::user()->isAdmin() ? route('admin.dashboard') : route('account.index'));
        }

        LoginEvent::record($request, User::where('email', $data['email'])->first(), 'password', false, $data['email']);

        return back()->withErrors(['email' => 'Email hoặc mật khẩu không đúng.'])->onlyInput('email');
    }

    // Trang đăng ký tài khoản email/mật khẩu.
    public function showRegister()
    {
        if (Auth::check()) {
            return redirect()->intended(route('account.index'));
        }
        return view('auth.register', [
            'googleEnabled' => (bool) config('services.google.client_id'),
        ]);
    }

    public function register(Request $request)
    {
        $data = $request->validate([
            'name'     => ['required', 'string', 'max:100'],
            'email'    => ['required', 'email', 'max:191', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ], [], [
            'name'     => 'họ tên',
            'email'    => 'email',
            'password' => 'mật khẩu',
        ]);

        $user = User::create([
            'name'          => $data['name'],
            'email'         => $data['email'],
            'password'      => bcrypt($data['password']),
            'role'          => 'hoc_vien',
            'last_login_at' => now(),
        ]);

        Auth::login($user, true);
        $request->session()->regenerate();
        LoginEvent::record($request, $user, 'register');
        session()->flash('ga_event', 'sign_up');

        // Người mới về trang chủ — nơi có thẻ "Bạn muốn bắt đầu từ đâu?" (onboarding).
        return redirect()->intended(route('home'));
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
            session()->flash('ga_event', 'login');
        } else {
            session()->flash('ga_event', 'sign_up');
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

        if ($user->banned_at) {
            LoginEvent::record(request(), $user, 'google', false);
            return redirect()->route('login')->withErrors(['email' => 'Tài khoản đã bị khoá. Liên hệ ' . config('site.contact_email') . ' nếu cần hỗ trợ.']);
        }
        Auth::login($user, true);
        LoginEvent::record(request(), $user, $user->wasRecentlyCreated ? 'register' : 'google');
        return redirect()->intended($user->onboarding_level ? route('account.index') : route('home'));
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('home');
    }
}
