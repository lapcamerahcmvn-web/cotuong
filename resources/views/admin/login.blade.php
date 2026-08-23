<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Đăng nhập — Cờ Tướng Admin</title>
    <meta name="robots" content="noindex, nofollow">
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>♟️</text></svg>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Be+Vietnam+Pro:wght@400;500;600;700&display=swap">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">
</head>
<body>
<div class="login-wrap">
    <form method="POST" action="{{ url('/admin/login') }}" class="login-card card">
        @csrf
        <div class="lc-brand"><span class="logo">車</span> Cờ Tướng Admin</div>
        <p class="muted" style="margin:0 0 20px;font-size:14px;">Đăng nhập để quản lý bài học.</p>

        @if($errors->any())<div class="flash err">{{ $errors->first() }}</div>@endif

        <div class="field">
            <label for="email">Email</label>
            <input class="input" type="email" id="email" name="email" value="{{ old('email') }}" required autofocus>
        </div>
        <div class="field">
            <label for="password">Mật khẩu</label>
            <input class="input" type="password" id="password" name="password" required>
        </div>
        <label class="check" style="margin-bottom:18px;"><input type="checkbox" name="remember" value="1"> Ghi nhớ đăng nhập</label>
        <button type="submit" class="btn primary" style="width:100%;">Đăng nhập</button>
    </form>
</div>
</body>
</html>
