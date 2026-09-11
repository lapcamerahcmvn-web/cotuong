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
];
