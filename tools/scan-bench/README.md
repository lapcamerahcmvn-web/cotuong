# Bộ đo độ chính xác "Nhận diện bàn cờ từ ảnh"

Kiểm tra `resources/js/scan/recognize.js` trên ảnh có đáp án (không cần mạng, không gửi ảnh đi đâu).

```bash
cd tools/scan-bench
python gen.py            # sinh ~66 ảnh vào img/ + cases.json (cần Pillow, numpy, opencv-python, fontTools, brotli)
npm i --no-save puppeteer-core   # 1 lần (không thêm vào package.json)
node bench.mjs           # chạy nhận dạng trong Chrome headless (puppeteer-core), in số ô sai từng ảnh
node bench.mjs real      # lọc theo tên file
```

Kiểu ảnh: 4 "phần mềm" giả lập (gỗ + serif, chữ trắng trên quân màu + giản thể + khung giao diện,
kai + Đen chữ ngược / Đỏ ở trên, nền xanh + giản thể), ảnh chụp mô phỏng (nghiêng phối cảnh, mờ, nhiễu,
quân xoay ngẫu nhiên — dùng góc lưới đáp án như khi người dùng kéo tay) và cờ úp.

Thêm kiểu `real` / `real-coup` = **ván cờ thật chụp bằng điện thoại**: quân gỗ cùng tông bàn, có độ dày + bóng đổ,
đặt lệch giao điểm ±0.2 ô, cỡ quân không đều, chữ khắc xoay 0–360°, ảnh nghiêng mạnh + xoay nhẹ + ánh sáng loang
+ vùng tối + JPEG; 1/4 số ảnh chụp từ phía Đen. Ảnh chụp mô phỏng người dùng kéo 4 góc lệch tay ±0.08 ô.

Kết quả 02/10/2026: ảnh màn hình 98.9% ô đúng · cờ úp (màn hình) 97.3% · ảnh chụp nghiêng 98.1% ·
**ván cờ thật 90.9% · cờ úp thật 87.4%** (trước khi làm chế độ ảnh chụp thật: ~0%).
`fens.json` = vài thế cờ ngẫu nhiên lấy từ bảng puzzles/lesson_steps. Đường dẫn Chrome trong bench.mjs là
`C:/Program Files/Google/Chrome/Application/chrome.exe` — sửa nếu máy khác.

## Ảnh thật người dùng gửi (`real/` + `real-cases.json`, có commit)
- `real/user-app-01.png` (02/10/2026): ảnh màn hình phần mềm cờ TQ — quân 3D cùng tông gỗ, chữ thư pháp. Dò lưới tự động
  không bắt được → góc đặt tay → chế độ ảnh chụp: **sai 6/26** (font mẫu chấm nghiêng hẳn về "Xe"). Đã thử và BỎ: gộp điểm
  theo nhóm quân giống nhau (8 sai), cắt vòng khắc quanh chữ (9–11 sai).
- Giải pháp: **học kiểu chữ** (`opts.learned` trong `classify`, lưu `localStorage xq.scan.learned` khi người dùng dùng kết
  quả đã thẩm). Thử "bỏ-ra-một" trên ảnh này: 18–20 → 23/26 đúng (3 sai là loại chỉ có 1 mẫu). E2E: quét lần đầu sai 5,
  sửa + bấm "Máy đánh giá" → quét lại đúng 26/26.
- Cờ cho bench: `SCREEN=1` ép chế độ màn hình, `DBG=1` in điểm từng quân, `NOGROUP/RING/SIMT` (thử nghiệm cũ).
