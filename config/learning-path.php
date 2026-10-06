<?php

// Lộ trình học (/lo-trinh): thứ tự chặng → chương trình. Không khoá cứng: mọi bài vẫn mở,
// lộ trình chỉ gợi ý thứ tự. Chương trình mới chưa liệt kê ở đây vẫn TỰ hiện (LearningPathService::courseSeries). unit_size = số bài mỗi "chặng nhỏ" (unit) khi hiển thị node.
return [
    'unit_size' => 20,
    'courses' => [
        'nhap-mon' => [
            'name' => 'Nhập môn', 'glyph' => '兵', 'black' => false,
            'desc' => 'Luật chơi, cách đi 7 loại quân và ký hiệu ghi nước.',
            'series' => ['nhap-mon-co-tuong'],
        ],
        'khai-cuoc' => [
            'name' => 'Khai cuộc', 'glyph' => '車', 'black' => false,
            'desc' => 'Bố trí quân, tranh tiên và các hệ khai cuộc phổ biến.',
            'series' => ['nen-tang-nguyen-ly-khai-cuoc', '48-bai-nguyen-ly-khai-cuoc'],
        ],
        'trung-cuoc' => [
            'name' => 'Trung cuộc', 'glyph' => '炮', 'black' => false,
            'desc' => 'Nguyên lý trung cuộc và các đội hình sát pháp then chốt.',
            'series' => ['nen-tang-nguyen-ly-trung-cuoc', 'sat-phap-13-doi-hinh', 'trung-cuoc-bao-dien-tap-1', 'trung-cuoc-bao-dien-tap-2', 'sat-phap-dai-toan'],
        ],
        'tan-cuoc' => [
            'name' => 'Tàn cuộc', 'glyph' => '將', 'black' => true,
            'desc' => 'Kỹ thuật thắng – hoà thế cờ ít quân.',
            'series' => ['48-bai-nguyen-ly-tan-cuoc'],
        ],
        'co-up' => [
            'name' => 'Cờ úp', 'glyph' => '卒', 'black' => true,
            'desc' => 'Luật lật quân, chiến thuật thực chiến từ sơ cấp đến nâng cao.',
            'series' => ['nhap-mon-co-up', 'co-up-so-cap-1', 'co-up-so-cap-2', 'co-up-nang-cao-1', 'co-up-nang-cao-2'],
        ],
    ],
];
