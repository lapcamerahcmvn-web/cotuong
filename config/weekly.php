<?php

// Thử thách tuần + giải thưởng bảng xếp hạng tuần. Tuần = thứ 2 → chủ nhật theo giờ VN.
// Mỗi tuần chọn cố định (theo ngày đầu tuần) 1 nhiệm vụ mỗi nhóm + 1 nhiệm vụ thêm → mọi người cùng thử thách.
// metric: lessons | days | xp | puzzles | daily | rush | survival | bot_win | bot_win_l3 | pvp | coup | games | review
return [
    'quests' => [
        'hoc' => [
            'lessons-3'  => ['title' => 'Học 3 bài', 'desc' => 'Hoàn thành 3 bài học bất kỳ', 'metric' => 'lessons', 'target' => 3, 'xp' => 60, 'icon' => 'book'],
            'lessons-6'  => ['title' => 'Học 6 bài', 'desc' => 'Hoàn thành 6 bài học bất kỳ', 'metric' => 'lessons', 'target' => 6, 'xp' => 100, 'icon' => 'book'],
            'days-4'     => ['title' => 'Chăm chỉ 4 ngày', 'desc' => 'Có hoạt động nhận XP trong 4 ngày khác nhau', 'metric' => 'days', 'target' => 4, 'xp' => 80, 'icon' => 'calendar'],
            'days-6'     => ['title' => 'Bền bỉ 6 ngày', 'desc' => 'Có hoạt động nhận XP trong 6 ngày khác nhau', 'metric' => 'days', 'target' => 6, 'xp' => 120, 'icon' => 'flame'],
            'xp-300'     => ['title' => 'Gom 300 XP', 'desc' => 'Kiếm 300 XP từ học, luyện và chơi', 'metric' => 'xp', 'target' => 300, 'xp' => 70, 'icon' => 'star'],
            'xp-700'     => ['title' => 'Gom 700 XP', 'desc' => 'Kiếm 700 XP từ học, luyện và chơi', 'metric' => 'xp', 'target' => 700, 'xp' => 130, 'icon' => 'star'],
        ],
        'luyen' => [
            'puzzles-20' => ['title' => 'Giải 20 thế cờ', 'desc' => 'Giải đúng 20 thế cờ ở bất kỳ chế độ luyện tập nào', 'metric' => 'puzzles', 'target' => 20, 'xp' => 70, 'icon' => 'puzzle'],
            'puzzles-50' => ['title' => 'Giải 50 thế cờ', 'desc' => 'Giải đúng 50 thế cờ ở bất kỳ chế độ luyện tập nào', 'metric' => 'puzzles', 'target' => 50, 'xp' => 120, 'icon' => 'puzzle'],
            'daily-3'    => ['title' => 'Thế cờ hôm nay ×3', 'desc' => 'Giải "Thế cờ hôm nay" trong 3 ngày', 'metric' => 'daily', 'target' => 3, 'xp' => 80, 'icon' => 'calendar'],
            'rush-10'    => ['title' => 'Tia chớp 60 giây', 'desc' => 'Đạt 10 điểm trong một lượt chơi 60 giây', 'metric' => 'rush', 'target' => 10, 'xp' => 90, 'icon' => 'zap'],
            'survival-8' => ['title' => 'Sống sót 3 mạng', 'desc' => 'Giải 8 thế liên tiếp trong một lượt 3 mạng', 'metric' => 'survival', 'target' => 8, 'xp' => 90, 'icon' => 'heart'],
        ],
        'choi' => [
            'bot-win-2'  => ['title' => 'Hạ máy 2 ván', 'desc' => 'Thắng máy 2 ván (từ thế mở, tối thiểu 5 nước)', 'metric' => 'bot_win', 'target' => 2, 'xp' => 70, 'icon' => 'shield'],
            'bot-l3-1'   => ['title' => 'Vượt cấp Vừa', 'desc' => 'Thắng máy cấp Vừa hoặc Khó 1 ván', 'metric' => 'bot_win_l3', 'target' => 1, 'xp' => 120, 'icon' => 'trophy'],
            'pvp-1'      => ['title' => 'Thách đấu bạn bè', 'desc' => 'Chơi hết 1 ván đấu bạn (tối thiểu 5 nước)', 'metric' => 'pvp', 'target' => 1, 'xp' => 80, 'icon' => 'sword'],
            'coup-2'     => ['title' => 'Thử vận cờ úp', 'desc' => 'Chơi hết 2 ván cờ úp (máy hoặc bạn bè)', 'metric' => 'coup', 'target' => 2, 'xp' => 70, 'icon' => 'sparkles'],
            'games-4'    => ['title' => 'Thực chiến 4 ván', 'desc' => 'Chơi hết 4 ván bất kỳ (máy hoặc bạn bè)', 'metric' => 'games', 'target' => 4, 'xp' => 80, 'icon' => 'play'],
            'review-1'   => ['title' => 'Mổ xẻ ván cờ', 'desc' => 'Dùng "Phân tích ván" cho 1 ván trong lịch sử', 'metric' => 'review', 'target' => 1, 'xp' => 50, 'icon' => 'chart'],
        ],
    ],
    'groups' => ['hoc' => 'Học', 'luyen' => 'Luyện', 'choi' => 'Chơi'],
    'per_week' => 4,
    'min_plies' => 10,                       // ván tính cho thử thách: ≥ 5 nước mỗi bên

    // Mở rương khi xong mọi nhiệm vụ tuần.
    'chest' => ['xp' => 150, 'freezes' => 1],

    // Giải bảng xếp hạng XP tuần — chốt tự động lần đầu có người truy cập sau khi tuần kết thúc.
    'prizes' => [
        1 => ['name' => 'Vô địch tuần', 'medal' => 'gold', 'xp' => 500, 'freezes' => 1],
        2 => ['name' => 'Á quân tuần', 'medal' => 'silver', 'xp' => 300, 'freezes' => 1],
        3 => ['name' => 'Hạng ba tuần', 'medal' => 'bronze', 'xp' => 200, 'freezes' => 1],
        10 => ['name' => 'Top 10 tuần', 'medal' => 'top10', 'xp' => 100, 'freezes' => 0],   // hạng 4–10
    ],
    'prize_min_xp' => 100,                   // phải đạt tối thiểu ngần này XP trong tuần mới xét giải
];
