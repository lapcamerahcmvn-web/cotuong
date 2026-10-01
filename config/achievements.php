<?php

// Huy hiệu — định nghĩa ở config (KHÔNG phải bảng DB) để ContentSeeder không đụng tới.
// type: lessons | puzzles | streak | level | rush | survival | daily | series | phase
// value: ngưỡng (số) hoặc slug series / key phase.
return [
    'first-lesson'   => ['name' => 'Nước đi đầu tiên', 'desc' => 'Hoàn thành bài học đầu tiên', 'icon' => '兵', 'type' => 'lessons', 'value' => 1],
    'lessons-10'     => ['name' => 'Chăm chỉ', 'desc' => 'Hoàn thành 10 bài học', 'icon' => '馬', 'type' => 'lessons', 'value' => 10],
    'lessons-50'     => ['name' => 'Học trò giỏi', 'desc' => 'Hoàn thành 50 bài học', 'icon' => '炮', 'type' => 'lessons', 'value' => 50],
    'lessons-200'    => ['name' => 'Thư viện sống', 'desc' => 'Hoàn thành 200 bài học', 'icon' => '俥', 'type' => 'lessons', 'value' => 200],

    'puzzle-1'       => ['name' => 'Giải đố nhập môn', 'desc' => 'Giải đúng thế cờ đầu tiên', 'icon' => 'puzzle', 'type' => 'puzzles', 'value' => 1],
    'puzzle-50'      => ['name' => 'Mắt tinh', 'desc' => 'Giải đúng 50 thế cờ', 'icon' => 'eye', 'type' => 'puzzles', 'value' => 50],
    'puzzle-200'     => ['name' => 'Sát thủ', 'desc' => 'Giải đúng 200 thế cờ', 'icon' => 'sword', 'type' => 'puzzles', 'value' => 200],
    'puzzle-500'     => ['name' => 'Bậc thầy sát pháp', 'desc' => 'Giải đúng 500 thế cờ', 'icon' => 'trophy', 'type' => 'puzzles', 'value' => 500],

    'streak-3'       => ['name' => 'Khởi động', 'desc' => 'Học 3 ngày liên tiếp', 'icon' => 'flame', 'type' => 'streak', 'value' => 3],
    'streak-7'       => ['name' => 'Một tuần bền bỉ', 'desc' => 'Học 7 ngày liên tiếp', 'icon' => 'flame', 'type' => 'streak', 'value' => 7],
    'streak-30'      => ['name' => 'Tháng không nghỉ', 'desc' => 'Học 30 ngày liên tiếp', 'icon' => 'flame', 'type' => 'streak', 'value' => 30],
    'streak-100'     => ['name' => 'Trăm ngày luyện cờ', 'desc' => 'Học 100 ngày liên tiếp', 'icon' => 'medal', 'type' => 'streak', 'value' => 100],

    'level-5'        => ['name' => 'Tập sự', 'desc' => 'Đạt cấp 5', 'icon' => 'star', 'type' => 'level', 'value' => 5],
    'level-10'       => ['name' => 'Kỳ thủ', 'desc' => 'Đạt cấp 10', 'icon' => 'star', 'type' => 'level', 'value' => 10],
    'level-20'       => ['name' => 'Cao thủ', 'desc' => 'Đạt cấp 20', 'icon' => 'star', 'type' => 'level', 'value' => 20],

    'rush-10'        => ['name' => 'Phản xạ nhanh', 'desc' => 'Đạt 10 điểm trong chế độ 60 giây', 'icon' => 'zap', 'type' => 'rush', 'value' => 10],
    'rush-20'        => ['name' => 'Tia chớp', 'desc' => 'Đạt 20 điểm trong chế độ 60 giây', 'icon' => 'zap', 'type' => 'rush', 'value' => 20],
    'survival-15'    => ['name' => 'Kiên cường', 'desc' => 'Giải 15 thế liên tiếp ở chế độ 3 mạng', 'icon' => 'heart', 'type' => 'survival', 'value' => 15],
    'daily-7'        => ['name' => 'Thói quen tốt', 'desc' => 'Giải 7 "Thế cờ hôm nay"', 'icon' => 'calendar', 'type' => 'daily', 'value' => 7],

    'bot-2'          => ['name' => 'Thắng máy', 'desc' => 'Thắng máy từ cấp Dễ trở lên', 'icon' => 'shield', 'type' => 'bot', 'value' => 2],
    'bot-3'          => ['name' => 'Vượt mặt máy', 'desc' => 'Thắng máy cấp Vừa', 'icon' => 'shield', 'type' => 'bot', 'value' => 3],
    'bot-4'          => ['name' => 'Hạ máy cấp Khó', 'desc' => 'Thắng máy cấp Khó', 'icon' => 'trophy', 'type' => 'bot', 'value' => 4],
    'pvp-1'          => ['name' => 'Chiến thắng đầu tay', 'desc' => 'Thắng ván đấu bạn đầu tiên', 'icon' => 'sword', 'type' => 'pvp', 'value' => 1],
    'pvp-10'         => ['name' => 'Kỳ thủ giao lưu', 'desc' => 'Chơi 10 ván đấu bạn', 'icon' => 'user', 'type' => 'pvp_games', 'value' => 10],
    'phase-nhap-mon'   => ['name' => 'Tốt nghiệp Nhập môn', 'desc' => 'Hoàn thành toàn bộ Nhập môn', 'icon' => 'graduation', 'type' => 'phase', 'value' => 'nhap-mon'],
    'phase-khai-cuoc'  => ['name' => 'Chủ khai cuộc', 'desc' => 'Hoàn thành toàn bộ Khai cuộc', 'icon' => '車', 'type' => 'phase', 'value' => 'khai-cuoc'],
    'series-13-doi-hinh' => ['name' => '13 đội hình sát', 'desc' => 'Hoàn thành Sát Pháp 13 Đội Hình', 'icon' => 'sword', 'type' => 'series', 'value' => 'sat-phap-13-doi-hinh'],
    'series-tan-cuoc'  => ['name' => 'Tàn cuộc vững vàng', 'desc' => 'Hoàn thành 48 Bài Nguyên Lý Tàn Cuộc', 'icon' => '將', 'type' => 'series', 'value' => '48-bai-nguyen-ly-tan-cuoc'],
    'series-co-up'     => ['name' => 'Lật quân như gió', 'desc' => 'Hoàn thành Cờ Úp Sơ Cấp 1', 'icon' => 'layers', 'type' => 'series', 'value' => 'co-up-so-cap-1'],
];
