# Book khai cuộc cờ tướng (máy + "Nước sách" khi phân tích)

- `resources/js/engine/book.js`: dòng viết tay `LINES` (trọng số theo độ phổ biến) + `LESSON_LINES` từ
  `book-data.js` (TỰ SINH, trọng số 2/dòng) → `ALL_LINES`. Máy cấp ≥ 2 đi nước sách ngẫu nhiên theo trọng số.
- `book-data.js` sinh từ các bài published phase `khai-cuoc` đi từ thế mở; mỗi nước được engine chấm (độ sâu 6,
  điểm chính xác từng nước gốc), cắt diễn biến trước nước kém hơn nước tốt nhất > 150 điểm (bài nguyên lý có khi cố ý
  minh hoạ nước sai). Ngưỡng 150 vì đánh giá khai cuộc ở độ sâu 6 lệch ±1 Tốt (90 thì cắt cả hệ chủ lưu "Pháo đầu – Bình
  phong mã tiến tốt 7" do engine quá thích Xe qua hà). Chỉ lưu ký hiệu nước đi — không lời bình / tên nguồn.
- Cùng bộ lọc đã bắt 5 lỗi trong dòng viết tay (VD Phi tượng → Mã → Xe i0h0 đứng sau Pháo h2 → Pháo đen h7 ăn Xe) —
  02/10/2026 đã cắt/bỏ; test `tools/engine-test.mjs` chặn tái phát.

## Dựng lại (sau khi thêm/sửa bài khai cuộc) — máy dev
```bash
php artisan tinker --execute="file_put_contents('openings.json', App\Models\Lesson::published()->where('game_mode','co-tuong')->where('phase','khai-cuoc')->with(['steps'=>fn(\$q)=>\$q->orderBy('step_order')])->get()->filter(fn(\$l)=>explode(' ',trim((string)\$l->initial_fen))[0]==='rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR')->map(fn(\$l)=>['id'=>\$l->id,'moves'=>\$l->steps->pluck('move_notation_iccs')->filter()->values()])->values()->toJson());"
for i in 0 1 2 3; do node tools/build-opening-book.mjs openings.json $i 4 > ob-$i.jsonl & done; wait   # ~20 phút
node tools/build-opening-book.mjs merge ob-[0-3].jsonl > resources/js/engine/book-data.js
rm openings.json ob-*.jsonl && node tools/engine-test.mjs && npm run build
```
