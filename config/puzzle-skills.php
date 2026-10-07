<?php

// Chủ đề luyện tập (skill) cho thế cờ. `match`: regex trên tiêu đề bài gốc (không dấu, chữ thường)
// — 1 thế có thể thuộc nhiều chủ đề. `series`: gán theo chương trình. Dùng bởi cotuong:build-puzzles.
return [
    'series_pool' => ['sat-phap-13-doi-hinh', 'sat-phap-dai-toan', '48-bai-nguyen-ly-tan-cuoc', 'sat-cuc-lien-hoan', 'sat-chieu-thuc-dung'],
    'max_plies'   => 16,   // thế dài hơn → chỉ cắt thế con ở đoạn cuối
    'tail_solver_moves' => [2, 3],  // cắt thêm thế con gồm N nước cuối của người giải

    'skills' => [
        'song-xe'  => ['name' => 'Song Xe', 'glyph' => '俥', 'desc' => 'Hai Xe phối hợp đâm cung, thác Xe.', 'match' => '/song xe/'],
        'xe'       => ['name' => 'Đòn Xe', 'glyph' => '車', 'desc' => 'Xe đơn tấn công, ép tướng, chiếu rút.', 'match' => '/\bxe\b/'],
        'ma'       => ['name' => 'Đòn Mã', 'glyph' => '馬', 'desc' => 'Mã ngoạ tào, quải giác mã, song mã ẩm tuyền.', 'match' => '/\bma\b|ngoa tao|quai giac|quy giac/'],
        'phao'     => ['name' => 'Đòn Pháo', 'glyph' => '炮', 'desc' => 'Pháo trùng, pháo hậu, thiết môn thuyên.', 'match' => '/phao/'],
        'tot'      => ['name' => 'Tốt – Binh', 'glyph' => '兵', 'desc' => 'Binh tốt cận cung, phối hợp tốt sát.', 'match' => '/\btot\b|\bbinh\b|\bchot\b/'],
        'nhanh'    => ['name' => 'Sát nhanh', 'glyph' => '將', 'desc' => 'Chiếu hết trong 1–2 nước — luyện phản xạ.', 'max_solver' => 2],
        'tan-cuoc' => ['name' => 'Tàn cuộc', 'glyph' => '帥', 'desc' => 'Kỹ thuật thắng thế cờ ít quân.', 'series' => ['48-bai-nguyen-ly-tan-cuoc']],
    ],
];
