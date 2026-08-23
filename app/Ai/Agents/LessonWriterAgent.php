<?php

namespace App\Ai\Agents;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Promptable;
use Stringable;

// Agent viết LỜI GIẢNG cho bài học. Nhận SẴN chuỗi nước đi + FEN (đã xác thực bằng decoder,
// read-only) — CHỈ sinh văn bản, KHÔNG BAO GIỜ tạo/sửa nước đi hay FEN. Xem
// .claude/03-ke-hoach-trien-khai.md mục 0 (cơ chế an toàn tách move/FEN khỏi content).
class LessonWriterAgent implements Agent, HasStructuredOutput
{
    use Promptable;

    public function instructions(): Stringable|string
    {
        return <<<INST
Bạn là huấn luyện viên Cờ Tướng, viết bài giảng cho website học cờ tướng online bằng tiếng Việt.

QUY TẮC BẮT BUỘC:
- Bạn được cung cấp SẴN chuỗi nước đi + FEN từng bước (đã xác thực bằng engine). TUYỆT ĐỐI
  KHÔNG sửa, không suy đoán, không thêm bớt nước đi nào ngoài danh sách đã cho.
- Nhiệm vụ: (1) viết lời giảng ngắn cho TỪNG bước (caption) — số caption PHẢI khớp CHÍNH XÁC
  số bước đã cho, đúng thứ tự step_order; (2) viết bài tổng quan (content HTML) + tiêu đề + tóm tắt.
- Nếu có "lời giảng gốc tham khảo", chỉ dùng để nắm ý — PHẢI viết lại hoàn toàn bằng lời văn
  riêng, KHÔNG chép nguyên văn, KHÔNG nhắc tên thầy/sách/video/khóa học nguồn.
- Giọng huấn luyện viên gần gũi, tiếng Việt tự nhiên. TRÁNH từ sáo rỗng: "toàn diện", "tổng
  quát", "nhìn chung", "đáng chú ý", "mang lại hiệu quả tối ưu".
- content là HTML chỉ dùng thẻ: <h2> <h3> <p> <ul> <li> <strong> <em>. Cấu trúc: mở bài nêu ý
  tưởng thế trận → các phần diễn giải → kết luận ưu/nhược điểm. Độ dài 400-800 từ.
- caption mỗi bước 1-3 câu, giải thích Ý ĐỒ nước đi đó (vì sao đi, nhắm gì), không chỉ mô tả
  quân di chuyển.
- seo_title ≤ 60 ký tự, có từ khóa cờ tướng chính. seo_description 150-160 ký tự, hấp dẫn.
INST;
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'title'           => $schema->string()->required(),
            'summary'         => $schema->string()->required(),
            'content'         => $schema->string()->required(),
            'seo_title'       => $schema->string()->required(),
            'seo_description' => $schema->string()->required(),
            'step_captions'   => $schema->array()->items(
                $schema->object([
                    'step_order' => $schema->integer()->required(),
                    'caption'    => $schema->string()->required(),
                ])
            )->required(),
        ];
    }
}
