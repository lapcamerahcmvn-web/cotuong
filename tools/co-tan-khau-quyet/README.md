# Chuyên đề "Cờ Tàn Có Khẩu Quyết" (series `co-tan-co-khau-quyet`)

329 bài = 2 bài lý thuyết (6 nguyên tắc tàn cuộc, 4 câu hỏi tư duy công sát) + 4 bài mở chương
(Chốt, Mã, Pháo, Xe) + 323 thế tàn cuộc. Mỗi thế: khẩu quyết viết lại bằng lời riêng, mạch chính +
nhánh biến (từ cây biến XQF), lời giảng ở các nước có chú thích, mục "Liên hệ sát chiêu" trỏ sang
đội hình tương ứng của "Sát Pháp 13 Đội Hình".

Trang bài tàn cuộc (`phase = tan-cuoc`) có khối **Máy tự giải / Đánh thử với máy**
(`resources/views/lessons/show.blade.php`) — mở `/choi-voi-may?tu-the=FEN&luot=..&cam=may|do|den&cap=4`.

## Dựng lại

```bash
# 1) XQF (ổ E:, nội bộ, KHÔNG commit) → drafts/ctkq.json (định dạng tcbd, nước ICCS)
node tools/co-tan-khau-quyet/extract.cjs
# 2) kiểm toàn bộ nước + nhánh bằng engine
node tools/trung-cuoc-bao-dien/tcbd.cjs drafts tools/trung-cuoc-bao-dien/drafts/ctkq.json
# 3) sinh batch từ data-*.cjs (tên bài, kết quả, khẩu quyết, lời giảng) rồi ghi vào database/seeders/data/content/
node tools/co-tan-khau-quyet/gen.cjs
node tools/trung-cuoc-bao-dien/tcbd.cjs build tools/trung-cuoc-bao-dien/batches/co-tan-khau-quyet.json
php artisan db:seed --class=ContentSeeder
```

- `tools/xqf-decoder/decode.js` nay xuất thêm `variation_tree` ({main, comments, vars:[{from, after, moves, comments}]}),
  giữ nguyên đầu ra cũ (mạch chính `moves`).
- `tcbd.cjs` chấp nhận nước dạng ICCS (`c7c8`) bên cạnh ký hiệu sách.
- `data-*.cjs`: `id: [tên bài, 'thang'|'kheo'|'hoa'|'bt', [khẩu quyết], {ply: lời giảng}?, {biến: {i: lời}}?]`.
  Đỏ luôn là bên tấn công trong bộ thế này. 11 thế chỉ có vị trí (bài tập, 0 nước) → giải bằng nút Máy tự giải.
- Nguồn XQF/PDF có bản quyền — chỉ dùng nội bộ; toàn bộ chữ trên web đã viết lại.

## Giới hạn engine (đo 06/10/2026)

Engine trình duyệt (`resources/js/engine/engine.js`) tự đi từ thế mở đầu, KHÔNG có sổ lời giải: chỉ thắng được
khoảng 1/4 số thế tàn thắng thử (Hai Chốt thắng hai Sĩ, Mã Chốt thắng khuyết Sĩ, Trắc diện hổ…). Các thế cần kế hoạch
sâu (đơn Xe thắng Sĩ Tượng toàn, Mã khấu, Song Xe thắng Xe Pháo song Tượng…) đều thành lặp thế hòa, kể cả khi đã cấm
nước lặp với ngưỡng 80–250 điểm. Vì vậy "Máy tự giải" từ bài dùng sổ lời giải (cây biến) trước, engine chỉ lo phần
ngoài sách. Đã thử bằng Chrome headless: bài Mã khấu → máy đi hết lời giải rồi chiếu hết, Đỏ thắng.
