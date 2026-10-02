# Bộ đo độ chính xác "Nhận diện bàn cờ từ ảnh"

Kiểm tra `resources/js/scan/recognize.js` trên ảnh có đáp án (không cần mạng, không gửi ảnh đi đâu).

```bash
cd tools/scan-bench
python gen.py            # sinh ~66 ảnh vào img/ + cases.json (cần Pillow, numpy, opencv-python, fontTools, brotli)
npm i --no-save puppeteer-core   # 1 lần (không thêm vào package.json)
node bench.mjs           # chạy nhận dạng trong Chrome headless (puppeteer-core), in số ô sai từng ảnh
node bench.mjs photo     # lọc theo tên file
```

Kiểu ảnh: 4 "phần mềm" giả lập (gỗ + serif, chữ trắng trên quân màu + giản thể + khung giao diện,
kai + Đen chữ ngược / Đỏ ở trên, nền xanh + giản thể), ảnh chụp mô phỏng (nghiêng phối cảnh, mờ, nhiễu,
quân xoay ngẫu nhiên — dùng góc lưới đáp án như khi người dùng kéo tay) và cờ úp.

Kết quả 02/10/2026 (lưới tự tìm): ảnh màn hình 98.9% ô đúng · cờ úp 97.3% · ảnh chụp 91.7%.
`fens.json` = vài thế cờ ngẫu nhiên lấy từ bảng puzzles/lesson_steps. Đường dẫn Chrome trong bench.mjs là
`C:/Program Files/Google/Chrome/Application/chrome.exe` — sửa nếu máy khác.
