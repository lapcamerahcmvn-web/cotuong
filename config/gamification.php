<?php

// Gamification — mọi con số ở đây là bản đầu, chỉnh theo dữ liệu thực tế sau vài tuần.
return [
    // Ngày học / chuỗi ngày / xếp hạng tuần đều tính theo giờ Việt Nam (app chạy UTC).
    'timezone' => 'Asia/Ho_Chi_Minh',

    'xp' => [
        'lesson_complete'  => 30,
        'puzzle_base'      => 10,   // + tối đa 15 theo độ khó (rating) — chỉ lần giải đầu tiên
        'puzzle_repeat'    => 5,    // giải lại thế đã giải (mỗi ngày 1 lần/thế)
        'daily_puzzle'     => 50,
        'review_solve'     => 5,
        'rush_per'         => 2,
        'rush_cap'         => 60,
        'survival_per'     => 3,
        'survival_cap'     => 60,
        'goal_reached'     => 20,
        'series_complete'  => 200,
        'phase_complete'   => 500,
        'streak_milestones' => [7 => 100, 30 => 300, 100 => 1000],
        // Thắng máy theo cấp (1 Tập sự · 2 Dễ · 3 Vừa · 4 Khó). Dùng gợi ý/đi lại → nửa XP.
        'bot_win'          => [1 => 10, 2 => 20, 3 => 40, 4 => 80],
        // Đấu bạn: thắng / hoà.
        'pvp_win'          => 30,
        'pvp_draw'         => 10,
    ],

    'caps' => [
        'puzzle_xp_daily'   => 400,  // trần XP từ thế cờ mỗi ngày (chống cày)
        'lessons_xp_daily'  => 30,   // tối đa số bài được cộng XP hoàn thành mỗi ngày
        'guest_merge_xp'    => 150,  // trần XP gộp từ hoạt động khách khi đăng nhập
        'bot_wins_daily'    => 5,    // số ván thắng máy được tính XP mỗi ngày
        'pvp_games_daily'   => 10,   // số ván đấu bạn được tính XP mỗi ngày
    ],

    'daily_goals' => [20 => 'Thư thả', 50 => 'Vừa phải', 100 => 'Nghiêm túc', 200 => 'Cao độ'],

    // Danh hiệu theo level — KHÔNG phải đẳng cấp cờ chính thức.
    'titles' => [
        1 => 'Tân binh', 3 => 'Tập sự', 6 => 'Kỳ sinh', 10 => 'Kỳ thủ',
        15 => 'Cao thủ', 22 => 'Danh thủ', 30 => 'Đại kỳ thủ',
    ],

    // Thẻ giữ chuỗi: cứ mỗi N ngày liên tiếp được tặng 1 thẻ (tối đa max) — tự dùng khi lỡ 1 ngày.
    'freeze_every' => 7,
    'freeze_max'   => 2,

    'leaderboard_size'  => 50,
    'leaderboard_cache' => 600,
];
