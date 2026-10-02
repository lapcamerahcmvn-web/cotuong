# Kiểm định thế cờ luyện tập (Admin › Kiểm định thế cờ)

Bộ giải chiếu hết (`resources/js/engine/engine.js` → `mateIn`) thử MỌI cách đỡ ở từng nước của bên thua trong các thế
luyện tập kết thúc bằng chiếu hết, ghi lại chỗ nước đỡ trong sách chưa phải tốt nhất:
- **Thoát**: có cách đỡ khiến bên thắng không chiếu hết được trong số nước còn lại của bài — chỉ khẳng định khi còn
  ≤ 3 nước (bộ giải xét toàn bộ nước → chắc chắn).
- **Kéo dài**: vẫn bị chiếu hết nhưng phải thêm nước.
- `bookK = null`: chính nước sách cũng không bị ép chiếu hết — lời giải dựa vào nước đỡ yếu ở phía sau.

Kết quả lần đầu (02/10/2026): 747 thế chiếu hết → 207 thế có vấn đề (131 mục "Thoát", 49 "Kéo dài" sau khi gộp thế đầy đủ
+ đoạn kết theo bài/nước = 180 mục).

## Chạy lại (sau khi sửa bài / nạp nội dung mới) — trên máy dev (hosting không có Node)
```bash
php artisan tinker --execute="file_put_contents('puzzles-full.json', App\Models\Puzzle::published()->orderBy('id')->get()->map(fn(\$p)=>['id'=>\$p->id,'title'=>\$p->title,'fen'=>\$p->fen,'side'=>\$p->side,'solution'=>\$p->solution,'n'=>\$p->solver_moves,'lesson_id'=>\$p->lesson_id,'start_ply'=>\$p->start_ply])->toJson(JSON_UNESCAPED_UNICODE));"
for i in 0 1 2 3; do node tools/puzzle-audit.mjs puzzles-full.json $i 4 > aud-$i.jsonl & done; wait   # ~30 phút
node tools/puzzle-audit.mjs merge aud-[0-3].jsonl > database/data/puzzle-audit.json
rm puzzles-full.json aud-*.jsonl   # KHÔNG commit file tạm
```
Commit `database/data/puzzle-audit.json` rồi deploy. Dấu "Đã sửa bài / Giữ nguyên" lưu bảng `puzzle_audit_marks`
(khoá = bài + chỉ số nước trong bài) nên không mất khi chạy lại.
