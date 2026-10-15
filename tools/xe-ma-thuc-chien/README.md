# tools/xe-ma-thuc-chien — chuyên đề tàn cuộc "Xe Mã Thực Chiến" từ sách scan nội bộ

Chuyên đề (phase `tan-cuoc`, slug `xe-ma-thuc-chien`, sort_order 6), 15 bài / 97 cuộc. Sách nguồn có bản quyền —
chỉ dùng nội bộ, **KHÔNG nêu tên tác giả/sách/người biên tập** trong nội dung. "Trắng" trong sách = Đỏ.

| Bài | Nội dung | Cuộc |
|---|---|---|
| 1–4 | Cao Điếu Mã · Hoa Tâm Xe · Chiếu Rút · Các phương pháp thắng khác | 24 |
| 5–6 | Xe Mã thắng Xe đôi Tốt (cơ bản / khéo) | 15 |
| 7–8 | Một số cuộc khéo thắng · Thế sáng tác | 18 |
| 9–13 | Xe Mã (Sĩ/Tượng) đấu Xe đôi Sĩ, Xe đôi Tượng, Xe Sĩ Tượng, hai quân mạnh | 27 |
| 14 | Thế Xe Mã hòa cờ | 6 |
| 15 | Thực chiến hay | 7 |

Đã bỏ hoặc cắt những đoạn sách in sai không khôi phục được (ghi chú ở đầu từng `text/bai-NN.cjs`), sửa lỗi in rõ ràng
(sai số lộ, "tiến/thoái", quân sai loại) khi một cách sửa duy nhất làm cả mạch hợp lệ và engine xác nhận.
Một số sơ đồ trong sách vẽ lệch so với nước đi (bài 6 cuộc 7, bài 10 cuộc 2 & 4, bài 11 cuộc 5, bài 15 cuộc 3) — FEN theo nước đi.

## Tệp

| Tệp | Vai trò |
|-----|---------|
| `text/bai-NN.cjs` | Mỗi bài 1 file — định dạng ở đầu `gen.cjs`. `after` của nhánh = số nước tuyệt đối; `from` = `'main'` hoặc chỉ số nhánh. Nhánh có thể ghi `kq: 'do'|'den'|'hoa'`. Ký hiệu `B3s-4` = quân sau trên lộ 3 (khi nhiều lộ cùng có 2 quân giống nhau). |
| `templates/` | Mẫu chữ quân cờ cho font sách (detect.py dùng qua `XQ_TPL_DIR`). |
| `gen.cjs` | Đi lại mọi nước (mạch + nhánh), đối chiếu sơ đồ bằng `detect.py`, ghi `tools/trung-cuoc-bao-dien/batches/xe-ma-thuc-chien.json`. |
| `verify.mjs` | Kiểm kết quả từng mạch/nhánh bằng engine của site: chứng minh chiếu hết, hoặc đánh thử theo luật **cấm chiếu dai**, hoặc chấm điểm "hơn rõ". Thế hòa chỉ chấm điểm tham khảo (`?` = engine thấy một bên hơn nhiều). |

## Quy trình

```bash
node tools/xe-ma-thuc-chien/gen.cjs --only=9           # kiểm 1 bài khi đang chép (không ghi batch)
node tools/xe-ma-thuc-chien/gen.cjs                    # ghi batch (--no-detect để bỏ đối chiếu sơ đồ cho nhanh)
node tools/xe-ma-thuc-chien/verify.mjs 5 "Hòa Cờ"      # kiểm 1 bài theo tên; bỏ tham số 2 = toàn bộ (~10 phút)
node tools/trung-cuoc-bao-dien/tcbd.cjs build tools/trung-cuoc-bao-dien/batches/xe-ma-thuc-chien.json
node tools/og-image/generate.cjs --missing --shard=0/4   # … 3/4, rồi nén RIÊNG các PNG mới
php artisan db:seed --class=ContentSeeder --force
php artisan optimize:clear
```

Lưu ý: `verify.mjs` mặc định coi mạch kết thúc bằng nước của bên thắng (độ dài lẻ khi Đỏ đi trước). Nhiều thế sách dừng ở
"thắng chắc" chứ không chiếu bí — engine `search()` coi lặp nước là hòa nên thế "Đen chỉ còn chiếu dai" bị chấm ≈ 0;
bước đánh thử cấm chiếu dai xử lý trường hợp này.
