<?php

namespace App\Ai\Agents;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Promptable;
use Stringable;

// Đọc thế cờ từ ảnh bàn cờ ĐÃ NẮN PHẲNG (trình duyệt căn 4 góc lưới rồi gửi ảnh 9×10 giao điểm thẳng hàng).
// Chỉ trả về ký tự quân ở 90 giao điểm — server kiểm tra lại hợp lệ, người dùng vẫn phải "thẩm" trước khi lưu.
class BoardVisionAgent implements Agent, HasStructuredOutput
{
    use Promptable;

    public function instructions(): Stringable|string
    {
        return <<<INST
Bạn đọc ảnh bàn cờ tướng (xiangqi) đã được nắn thẳng: lưới 9 cột × 10 hàng giao điểm, các giao điểm cách đều,
mép ảnh cách giao điểm ngoài cùng khoảng 0.6 ô. Quân cờ nằm trên GIAO ĐIỂM (không nằm trong ô).

Trả về đúng 10 chuỗi `rows`, mỗi chuỗi đúng 9 ký tự, hàng trên cùng của ảnh trước, từ trái sang phải:
- Quân ĐỎ (chữ/mặt màu đỏ) viết HOA, quân ĐEN viết thường:
  K = Tướng (帥 帅 將 将) · A = Sĩ (仕 士) · B = Tượng (相 象) · N = Mã (馬 傌 马) · R = Xe (車 俥 车)
  C = Pháo (炮 砲 包) · P = Tốt (兵 卒)
- X = quân ĐỎ đang úp mặt (cờ úp: mặt trơn, không có chữ), x = quân ĐEN đang úp mặt.
- Dấu chấm "." = giao điểm trống.
Màu quyết định bên (đỏ = HOA), KHÔNG dựa vào việc chữ là 帥 hay 將. Quân có thể xoay lệch (ảnh chụp thật).
Nếu không chắc 1 quân, vẫn đoán ký tự hợp lý nhất. Không thêm giải thích.
INST;
    }

    public function schema(JsonSchema $schema): array
    {
        return [
            'rows' => $schema->array()->items($schema->string())->required(),
        ];
    }
}
