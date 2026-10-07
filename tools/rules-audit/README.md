# Rà luật bài học (rules-audit)

Kiểm mọi bài published trong `database/seeders/data/content/*.json` bằng đúng bộ luật bàn cờ web (`public/js/xiangqi-rules.js`):
thế mở đầu hợp lệ (đủ Tướng, Tướng trong cung, không lộ mặt Tướng, bên vừa đi không bị chiếu), từng nước của mạch chính
và mọi nhánh biến (đi đúng luật quân, không tự để bị chiếu, FEN khớp nước đi; cờ úp: quân úp đi theo ô, lật đúng màu).

```bash
node tools/rules-audit/audit.cjs                 # báo cáo (bài lý thuyết không bày bàn cờ được bỏ qua)
node tools/rules-audit/inspect.cjs slug [slug…]  # in bàn cờ tại nước lỗi + quân đang chiếu + lời giảng
node tools/rules-audit/repair.cjs                # đề xuất dời/bỏ 1 quân không di chuyển để cả bài hợp luật
node tools/rules-audit/repair.cjs --apply a,b    # ghi cách sửa tốt nhất
node tools/rules-audit/repair-engine.mjs a,b [--apply]   # bài giải đố: giữ tiền tố lời giải sách, engine đi tiếp tới chiếu hết
node tools/rules-audit/patch.cjs                 # vá tay (danh sách PATCHES trong file)
```

Sau khi sửa: `php artisan db:seed --class=ContentSeeder --force` rồi `php artisan cotuong:build-puzzles`.

## Đợt rà 07/10/2026 (25 bài lỗi → 0)
- Nhập môn "Cách đi quân …" (6 bài): chỉ có 2 Tướng cùng cột → lộ mặt Tướng. Thêm 2 Sĩ Đen e8 + d9 (`fix-nhap-mon.cjs`).
- Sát pháp đại toàn: 7 bài dời 1 quân (thế giải mã lệch 1 ô, `repair.cjs`); 6 bài engine đi tiếp phần lời giải sai
  (`repair-engine.mjs`); Xe Pháo Mã VD2 Tướng Đỏ e0→d0, Ngọa Tào Mã VD2 nước 16 "Xe sau thoái 1" (`patch.cjs`).
  Bài tự luyện 46, 55 không cứu được (máy chỉ ra lời giải 1 nước / không có) → chuyển nháp.
- Nền tảng trung cuộc: Mã ngọa tào dựng lại 3 nước; Vương Bân – Hồ Vinh Hoa dừng ở nước 6 (`fix-nen-tang.mjs`).
- Sau đó toàn bộ 36 bài cờ úp chưa có nước đi được thêm ví dụ (`tools/co-up-examples/`).
- Nguồn gốc lỗi: giải mã sách (nhầm trước/sau, tiến/thoái, lệch 1 ô). Nguồn có bản quyền chỉ dùng nội bộ, không dùng để sửa.
