<?php

// Đổi thưởng bằng xu (/doi-thuong). 1 XP kiếm được = 1 xu; đổi thưởng chỉ trừ xu, KHÔNG trừ XP / cấp / hạng.
//   type: freeze (thẻ giữ chuỗi — đổi nhiều lần, tối đa gamification.freeze_max thẻ cùng lúc)
//         board  (màu bàn cờ cao cấp — CSS [data-board-theme="<theme>"] trong resources/css/board.css)
//         frame  (khung ảnh đại diện — CSS .avatar.frame-<frame> trong resources/css/ui.css; người khác nhìn thấy)
//         title  (danh hiệu hiển thị cạnh tên ở hồ sơ, bảng xếp hạng, bình luận)
//   min_level: cấp tối thiểu mới đổi được (để vật phẩm đắt có ý nghĩa "đẳng cấp").
// Màu bàn cờ miễn phí hiện có (gỗ, cổ điển, ngọc bích…) giữ nguyên miễn phí — chỉ màu MỚI mới cần xu.
return [
    'sections' => [
        'freeze' => ['name' => 'Giữ chuỗi ngày', 'desc' => 'Lỡ một ngày không học, thẻ tự dùng để chuỗi ngày không bị mất.'],
        'board'  => ['name' => 'Màu bàn cờ cao cấp', 'desc' => 'Áp dụng cho bài học, luyện tập, chơi với máy và đấu bạn. Đổi một lần, dùng mãi.'],
        'frame'  => ['name' => 'Khung ảnh đại diện', 'desc' => 'Hiện quanh ảnh của bạn ở bảng xếp hạng, hồ sơ, bình luận — ai cũng thấy.'],
        'title'  => ['name' => 'Danh hiệu', 'desc' => 'Hiện cạnh tên của bạn ở hồ sơ, bảng xếp hạng và bình luận.'],
    ],

    'items' => [
        'freeze' => ['type' => 'freeze', 'name' => 'Thẻ giữ chuỗi', 'price' => 300, 'desc' => 'Thêm 1 thẻ giữ chuỗi (giữ tối đa 2 thẻ cùng lúc).'],

        'board-lacquer'  => ['type' => 'board', 'theme' => 'lacquer', 'name' => 'Sơn mài', 'price' => 800, 'desc' => 'Nền đỏ son, nét vàng như tranh sơn mài.'],
        'board-bamboo'   => ['type' => 'board', 'theme' => 'bamboo', 'name' => 'Tre xanh', 'price' => 800, 'desc' => 'Mặt tre non mát mắt, hợp học lâu.'],
        'board-peach'    => ['type' => 'board', 'theme' => 'peach', 'name' => 'Hoa đào', 'price' => 1500, 'desc' => 'Hồng phấn ngày Tết.'],
        'board-bronze'   => ['type' => 'board', 'theme' => 'bronze', 'name' => 'Đồng cổ', 'price' => 1500, 'desc' => 'Sắc đồng thau cổ kính.'],
        'board-starry'   => ['type' => 'board', 'theme' => 'starry', 'name' => 'Tinh không', 'price' => 3000, 'desc' => 'Bàn đêm xanh thẫm, nét bạc — đẹp khi dùng giao diện tối.'],
        'board-imperial' => ['type' => 'board', 'theme' => 'imperial', 'name' => 'Hoàng cung', 'price' => 5000, 'min_level' => 10, 'desc' => 'Vàng hoàng kim, viền son — dành cho Kỳ thủ trở lên.'],

        'frame-bronze' => ['type' => 'frame', 'frame' => 'bronze', 'name' => 'Khung đồng', 'price' => 1000, 'desc' => 'Viền đồng ấm.'],
        'frame-silver' => ['type' => 'frame', 'frame' => 'silver', 'name' => 'Khung bạc', 'price' => 3000, 'desc' => 'Viền bạc sáng.'],
        'frame-gold'   => ['type' => 'frame', 'frame' => 'gold', 'name' => 'Khung vàng', 'price' => 8000, 'min_level' => 6, 'desc' => 'Viền vàng lấp lánh.'],
        'frame-jade'   => ['type' => 'frame', 'frame' => 'jade', 'name' => 'Khung ngọc', 'price' => 12000, 'min_level' => 10, 'desc' => 'Ngọc bích xanh trong.'],
        'frame-dragon' => ['type' => 'frame', 'frame' => 'dragon', 'name' => 'Khung rồng', 'price' => 25000, 'min_level' => 15, 'desc' => 'Vòng lửa chu sa xoay — dành cho Cao thủ.'],

        'title-vua-chieu-het'  => ['type' => 'title', 'title' => 'Vua chiếu hết', 'name' => 'Vua chiếu hết', 'price' => 2000, 'desc' => 'Cho người mê giải thế sát.'],
        'title-tan-cuoc'       => ['type' => 'title', 'title' => 'Bậc thầy tàn cuộc', 'name' => 'Bậc thầy tàn cuộc', 'price' => 2000, 'desc' => 'Thuộc lòng khẩu quyết cờ tàn.'],
        'title-phao-thu'       => ['type' => 'title', 'title' => 'Pháo thủ', 'name' => 'Pháo thủ', 'price' => 1500, 'desc' => 'Pháo đầu không rời tay.'],
        'title-ky-si'          => ['type' => 'title', 'title' => 'Kỵ sĩ', 'name' => 'Kỵ sĩ', 'price' => 1500, 'desc' => 'Mã nhảy đâu, Tướng chạy đó.'],
        'title-xa-than'        => ['type' => 'title', 'title' => 'Xa thần', 'name' => 'Xa thần', 'price' => 1500, 'desc' => 'Một Xe đáng mười quân.'],
        'title-giu-hoa'        => ['type' => 'title', 'title' => 'Thành đồng giữ hòa', 'name' => 'Thành đồng giữ hòa', 'price' => 2000, 'desc' => 'Kém quân vẫn cầm hòa.'],
        'title-muu-si'         => ['type' => 'title', 'title' => 'Mưu sĩ', 'name' => 'Mưu sĩ', 'price' => 3000, 'min_level' => 6, 'desc' => 'Tính trước ba bước.'],
        'title-ky-tai'         => ['type' => 'title', 'title' => 'Kỳ tài', 'name' => 'Kỳ tài', 'price' => 6000, 'min_level' => 10, 'desc' => 'Danh hiệu hiếm cho người đi đường dài.'],
    ],
];
