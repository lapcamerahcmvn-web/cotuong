<?php

// Thông tin nhận diện site — dùng cho meta SEO, JSON-LD Organization, thẻ share.
return [

    // Tên thương hiệu (hiển thị ở og:site_name, JSON-LD name).
    'name' => 'Học Cờ Tướng',

    'description' => 'Website học cờ tướng và cờ úp qua bàn cờ tương tác, diễn giải từng nước đi — '
        .'lộ trình bài bản từ nhập môn đến nâng cao.',

    // URL các trang mạng xã hội chính thức → JSON-LD Organization.sameAs.
    // Điền qua .env (SITE_SOCIAL_FACEBOOK=...) hoặc thêm trực tiếp chuỗi vào mảng.
    // Bỏ trống thì sameAs không được xuất (không sao).
    'social' => array_values(array_filter([
        env('SITE_SOCIAL_FACEBOOK'),
        env('SITE_SOCIAL_YOUTUBE'),
        env('SITE_SOCIAL_TIKTOK'),
        env('SITE_SOCIAL_ZALO'),
    ])),

    // Handle Twitter/X (dạng "@hoccotuong") → thẻ twitter:site. Bỏ trống nếu chưa có.
    'twitter' => env('SITE_TWITTER'),

    // Google Analytics 4 measurement ID (dạng "G-XXXXXXXXXX") — bỏ trống thì KHÔNG chèn gtag.js
    // (chưa gắn GA4 cho site này, xem checklist SEO kỹ thuật mục "Gắn GSC + GA4").
    'ga4_id' => env('SITE_GA4_ID'),

    // Mã xác minh Google Search Console qua thẻ <meta name="google-site-verification">
    // (chuỗi content lấy từ GSC → Cài đặt → Quyền sở hữu → HTML tag, KHÔNG cần tải file lên server).
    'gsc_verification' => env('SITE_GSC_VERIFICATION'),
];
