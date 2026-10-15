# tools/khai-cuoc-bo-cuc — 2 chuyên đề khai cuộc từ sách scan nội bộ

Hai chuyên đề (phase `khai-cuoc`):

| Sách nguồn (scan, có bản quyền — chỉ dùng nội bộ, KHÔNG nêu tên tác giả/sách) | Chuyên đề | slug | Bài |
|---|---|---|---|
| `B4) CAM BAY DOI SACH.pdf` | Cạm Bẫy Khai Cuộc Và Đối Sách | `cam-bay-khai-cuoc-doi-sach` | 103 (75 cuộc phần 1 + 10 cuộc bố cục hiếm gặp + 18 ván thực chiến) |
| `B4) NGHI HINH CONG KICH.pdf` | Nghi Hình Khai Cuộc Và Công Kích | `nghi-hinh-khai-cuoc-cong-kich` | 106 (80 cuộc + 26 ván thực chiến) |

- Nước đi chép từ sách, **mọi nước (mạch chính + nhánh biến) đều được đi lại theo luật**; nước phạm luật trong sách
  (lỗi in) đã sửa theo thế cờ/sơ đồ, nhánh không đi được thì bỏ.
- **Mọi sơ đồ "Hình N"** trong sách được cắt tự động và đối chiếu với thế cờ tính được tại đúng nước đó (vị trí + màu).
  Sơ đồ máy đọc sót quân ở mép ảnh đã so bằng mắt — đánh dấu `!pNNN_k` trong `text/`.
- Lời giảng, lời từng nước **viết lại có dấu bằng lời riêng**. Ván thực chiến chỉ giữ tên kỳ thủ + năm (không ghi tên
  giải/đội/địa điểm). "Trắng" trong sách = Đỏ.

## Tệp

| Tệp | Vai trò |
|-----|---------|
| `find_boards.py`, `cut_all.py` | Tìm và cắt sơ đồ từ ảnh trang (render pymupdf 200dpi) → `boards/<cb|nh>/pNNN_k.png` (thư mục làm việc ngoài repo, biến `KCBC_WORK`). |
| `templates/` | Mẫu chữ quân cờ riêng cho font bộ sách (detect.py dùng qua `XQ_TPL_DIR`). |
| `text/cb-NN.cjs`, `text/nh-NN.cjs` | Mỗi chương 1 file — định dạng xem đầu `gen.cjs`. Cuộc mới chèn trước dòng `// @@END`. `after` của nhánh = số nước tuyệt đối tính từ đầu ván (kể cả nhánh lồng). |
| `gen.cjs` | Kiểm toàn bộ + ghi `tools/trung-cuoc-bao-dien/batches/<slug>.json`. Báo "VẤN ĐỀ" (phải sửa) và "Ghi chú". |
| `../trung-cuoc-bao-dien/detect.py` | Thêm `XQ_TPL_DIR` (thư mục mẫu) và `XQ_REFINE=1` (khớp lưới bằng HoughCircles khi sơ đồ bị xén mép). |

## Quy trình

```bash
node tools/khai-cuoc-bo-cuc/gen.cjs cb --only=9 --learn   # kiểm 1 chương khi đang chép (không ghi batch)
node tools/khai-cuoc-bo-cuc/gen.cjs cb && node tools/khai-cuoc-bo-cuc/gen.cjs nh   # ghi batch (~2–3 phút/sách)
node tools/trung-cuoc-bao-dien/tcbd.cjs build tools/trung-cuoc-bao-dien/batches/cam-bay-khai-cuoc-doi-sach.json tools/trung-cuoc-bao-dien/batches/nghi-hinh-khai-cuoc-cong-kich.json
node tools/og-image/generate.cjs --missing --shard=0/4   # … 3/4, rồi nén RIÊNG các PNG mới
php artisan db:seed --class=ContentSeeder --force
php artisan optimize:clear
```

Mẹo khi chép: ký hiệu sách `t`/`s` = quân trước/sau; nước thiếu `t/s` mà hai quân cùng lộ đều đi được thì `gen.cjs`
bắt ghi rõ. Lỗi "không tìm thấy quân" ở nhánh gần như luôn là `after` lệch 1–2 nước.
