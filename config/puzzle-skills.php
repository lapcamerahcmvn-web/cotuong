<?php

// Chủ đề luyện tập (skill) cho thế cờ. Dùng bởi cotuong:build-puzzles (gắn nhãn) và trang /luyen-tap (lưới chủ đề).
//   `match`  : regex trên tiêu đề bài gốc (không dấu, chữ thường)
//   `series` : gán theo chương trình
//   có CẢ `match` lẫn `series` → phải khớp cả hai (VD Tàn Chốt = bài "co tan chot…" của chuyên đề khẩu quyết)
//   `group`  : nhóm hiển thị ở trang Luyện tập (thứ tự nhóm theo `groups`, trong nhóm theo thứ tự khai báo)
// Một thế có thể thuộc nhiều chủ đề. Nhãn tự động khác (không hiện ở lưới): `sat-1`…`sat-10` (thế chiếu hết theo số
// nước — dùng cho "Luyện sát pháp"), `khau-quyet` (đoạn giữa ván tàn cuộc, không chiếu hết — loại khỏi 60 giây/3 mạng…).
return [
    'series_pool' => ['co-tan-co-khau-quyet', '48-bai-nguyen-ly-tan-cuoc', 'sat-phap-13-doi-hinh', 'sat-phap-dai-toan', 'sat-cuc-lien-hoan', 'sat-chieu-thuc-dung'],
    'max_plies'   => 20,   // thế dài hơn (quá 10 nước bên giải) → chỉ cắt thế con ở đoạn cuối
    'tail_solver_moves' => [2, 3],  // cắt thêm thế con gồm N nước cuối của người giải

    // Chuyên đề tàn cuộc không có bên giải đặt sẵn (puzzle_side) và ván thường không kết thúc bằng chiếu hết: cắt các
    // đoạn `solver` nước của bên cần tìm nước (Đỏ — bên thắng; Đen — bên giữ hòa khi tiêu đề có "hòa"), ưu tiên đoạn mở
    // đầu, đoạn có lời giảng và đoạn kết; tối đa `per_lesson` đoạn/bài. Máy chấp nhận nước tương đương với nước trong bài.
    'segment_series' => [
        'co-tan-co-khau-quyet' => ['solver' => 2, 'per_lesson' => 3],
    ],

    'ladder' => ['levels' => 10, 'pass' => 10, 'stars' => [10, 25, 50]],   // Luyện sát pháp: đúng `pass` thế để mở bậc kế

    'groups' => [
        'tan-cuoc' => ['name' => 'Tàn cuộc có khẩu quyết', 'desc' => 'Tìm nước đúng theo khẩu quyết trong các thế tàn thực dụng — máy nhận cả nước tương đương.'],
        'don-sat'  => ['name' => 'Đòn sát theo hình', 'desc' => 'Luyện nhận ra từng hình sát kinh điển.'],
        'quan'     => ['name' => 'Theo quân & tốc độ', 'desc' => 'Mỗi lượt 10 thế, độ khó tự điều chỉnh theo điểm thế cờ của bạn.'],
    ],

    'skills' => [
        // ---- Tàn cuộc (ưu tiên chuyên đề Cờ Tàn Có Khẩu Quyết) ----
        'tan-cuoc'   => ['group' => 'tan-cuoc', 'name' => 'Luyện tàn cuộc', 'glyph' => '帥', 'desc' => 'Tất cả thế tàn cuộc: thế thắng, khéo thắng, giữ hòa theo khẩu quyết.', 'series' => ['co-tan-co-khau-quyet', '48-bai-nguyen-ly-tan-cuoc']],
        'tan-chot'   => ['group' => 'tan-cuoc', 'name' => 'Tàn Chốt', 'glyph' => '兵', 'desc' => 'Chốt kẹp nách, Tướng trợ công, Chốt cao – thấp – lụt.', 'series' => ['co-tan-co-khau-quyet'], 'match' => '/^co tan chot/'],
        'tan-ma'     => ['group' => 'tan-cuoc', 'name' => 'Tàn Mã', 'glyph' => '馬', 'desc' => 'Mã khấu, Mã điền, Tướng khóa Mã, Song Mã ẩm tuyền.', 'series' => ['co-tan-co-khau-quyet'], 'match' => '/^co tan ma/'],
        'tan-phao'   => ['group' => 'tan-cuoc', 'name' => 'Tàn Pháo', 'glyph' => '炮', 'desc' => 'Lấy Tướng, Sĩ làm ngòi; Pháo canh trung lộ, thoát ngòi.', 'series' => ['co-tan-co-khau-quyet'], 'match' => '/^co tan phao/'],
        'tan-xe'     => ['group' => 'tan-cuoc', 'name' => 'Tàn Xe', 'glyph' => '車', 'desc' => 'Đơn Xe, Xe Chốt, Xe Mã, Xe Pháo, Song Xe — khống chế trung lộ, bắt đôi.', 'series' => ['co-tan-co-khau-quyet'], 'match' => '/^co tan xe/'],
        'kheo-thang' => ['group' => 'tan-cuoc', 'name' => 'Khéo thắng', 'glyph' => '將', 'desc' => 'Thế phải đi thật chính xác mới thắng — sai một nước là hòa.', 'series' => ['co-tan-co-khau-quyet'], 'match' => '/kheo thang/'],
        'giu-hoa'    => ['group' => 'tan-cuoc', 'name' => 'Giữ hòa', 'glyph' => '士', 'desc' => 'Bạn cầm bên kém quân: đứng đúng hình hòa, chiếm mặt, giữ liên kết.', 'series' => ['co-tan-co-khau-quyet'], 'match' => '/\bhoa\b/'],

        // ---- Đòn sát theo hình ----
        'ngoa-tao'    => ['group' => 'don-sat', 'name' => 'Mã ngọa tào', 'glyph' => '馬', 'desc' => 'Mã sát góc cung chiếu chéo, khóa Tướng ở lộ giữa.', 'match' => '/ngoa tao/'],
        'phao-trung'  => ['group' => 'don-sat', 'name' => 'Pháo trùng', 'glyph' => '炮', 'desc' => 'Pháo trước làm ngòi cho Pháo sau.', 'match' => '/phao trung/'],
        'muon-sat'    => ['group' => 'don-sat', 'name' => 'Muộn sát', 'glyph' => '砲', 'desc' => 'Mượn quân đối phương làm ngòi, Tướng tự bị tắc.', 'match' => '/muon (sat|cung)/'],
        'thiet-mon'   => ['group' => 'don-sat', 'name' => 'Thiết môn thuyên', 'glyph' => '門', 'desc' => 'Pháo đầu khóa trung lộ, Xe – Chốt lao xuống sát.', 'match' => '/thiet mon thuyen/'],
        'xuyen-tam'   => ['group' => 'don-sat', 'name' => 'Xuyên tâm', 'glyph' => '心', 'desc' => 'Đánh thẳng vào Sĩ giữa — đại đao, tiểu đao xuyên tâm.', 'match' => '/xuyen tam/'],
        'luong-chieu' => ['group' => 'don-sat', 'name' => 'Lưỡng chiếu', 'glyph' => '雙', 'desc' => 'Một nước hai quân cùng chiếu — chỉ còn cách chạy Tướng.', 'match' => '/luong chieu/'],
        'thi-quan'    => ['group' => 'don-sat', 'name' => 'Thí quân', 'glyph' => '捨', 'desc' => 'Bỏ quân để mở đường, dụ quân đối phương vào ô chết.', 'match' => '/\bthi (xe|ma|phao|tot)\b/'],

        // ---- Theo quân & tốc độ ----
        'song-xe'  => ['group' => 'quan', 'name' => 'Song Xe', 'glyph' => '俥', 'desc' => 'Hai Xe phối hợp đâm cung, thác Xe.', 'match' => '/song xe/'],
        'xe'       => ['group' => 'quan', 'name' => 'Đòn Xe', 'glyph' => '車', 'desc' => 'Xe đơn tấn công, ép tướng, chiếu rút.', 'match' => '/\bxe\b/'],
        'ma'       => ['group' => 'quan', 'name' => 'Đòn Mã', 'glyph' => '馬', 'desc' => 'Mã ngoạ tào, quải giác mã, song mã ẩm tuyền.', 'match' => '/\bma\b|ngoa tao|quai giac|quy giac/'],
        'phao'     => ['group' => 'quan', 'name' => 'Đòn Pháo', 'glyph' => '炮', 'desc' => 'Pháo trùng, pháo hậu, thiết môn thuyên.', 'match' => '/phao/'],
        'tot'      => ['group' => 'quan', 'name' => 'Tốt – Binh', 'glyph' => '兵', 'desc' => 'Binh tốt cận cung, phối hợp tốt sát.', 'match' => '/\btot\b|\bbinh\b|\bchot\b/'],
        'nhanh'    => ['group' => 'quan', 'name' => 'Sát nhanh', 'glyph' => '將', 'desc' => 'Chiếu hết trong 1–2 nước — luyện phản xạ.', 'max_solver' => 2],
    ],
];
