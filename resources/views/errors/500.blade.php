{{-- Trang 500 ĐỘC LẬP: không @extends layout (tránh phụ thuộc DB/session vốn có thể là nguyên
     nhân gây lỗi 500). Chỉ HTML + CSS nội tuyến để luôn hiển thị được. --}}
<!doctype html>
<html lang="vi">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Lỗi máy chủ (500) — Học Cờ Tướng</title>
    <style>
        :root { color-scheme: light dark; }
        body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
               font-family:'Be Vietnam Pro',system-ui,sans-serif; background:#f6f1e7; color:#2a2118; padding:24px; }
        @media (prefers-color-scheme: dark) { body { background:#17130d; color:#ece3d4; } }
        .box { max-width:520px; text-align:center; }
        .code { font-weight:800; font-size:72px; line-height:1; color:#c0392b; }
        h1 { font-size:22px; margin:8px 0 8px; }
        p { color:#6b5d49; font-size:15px; line-height:1.6; margin:0 0 22px; }
        @media (prefers-color-scheme: dark) { p { color:#b6a88f; } }
        a { display:inline-block; background:#c0392b; color:#fff; text-decoration:none; font-weight:600;
            padding:11px 20px; border-radius:10px; }
    </style>
</head>
<body>
    <div class="box">
        <div class="code">500</div>
        <h1>Máy chủ đang gặp sự cố</h1>
        <p>Đã có lỗi xảy ra ở phía máy chủ. Chúng tôi sẽ khắc phục sớm. Bạn vui lòng thử lại sau ít phút.</p>
        <a href="/">Về trang chủ</a>
    </div>
</body>
</html>
