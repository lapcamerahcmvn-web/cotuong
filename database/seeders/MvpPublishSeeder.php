<?php

namespace Database\Seeders;

use App\Models\Lesson;
use App\Models\LessonSeries;
use Illuminate\Database\Seeder;

// Publish một tập bài học MVP (Phase 1). Bàn cờ đã có nước đi thật từ decoder; nội dung diễn
// giải ở đây viết tổng quát ĐÚNG về nguyên lý (không bịa phân tích từng nước cụ thể) — caption
// từng nước sẽ do Agent bổ sung khi có ANTHROPIC_API_KEY. Chạy: php artisan db:seed --class=MvpPublishSeeder
class MvpPublishSeeder extends Seeder
{
    public function run(): void
    {
        // Chuẩn hoá series khai cuộc.
        $series = LessonSeries::where('name', '48 Bài Nguyên Lý Khai Cuộc')->first();
        if ($series) {
            $series->update([
                'sort_order'   => 1,
                'phase'        => 'khai-cuoc',
                'planned_total'=> 48,
                'description'  => 'Giáo trình nguyên lý khai cuộc cờ tướng: cách xuất Xe, Mã, Pháo, tranh tiên và bố cục hợp lý ngay từ đầu ván. Mỗi bài có bàn cờ đi lại từng nước.',
            ]);
        }

        // Publish các bài có chuỗi nước đi tốt (>=10 nước) — tối đa 14 bài cho MVP.
        $toPublish = Lesson::where('move_count', '>=', 10)
            ->orderByDesc('move_count')->take(14)->get();

        foreach ($toPublish as $lesson) {
            $lesson->update([
                'status'       => 'published',
                'published_at' => $lesson->published_at ?? now(),
            ]);
        }

        // Nội dung diễn giải tổng quát ĐÚNG cho các bài chủ lực + đánh dấu nổi bật.
        $content = $this->flagshipContent();
        foreach ($content as $id => $data) {
            $lesson = Lesson::find($id);
            if (! $lesson) {
                continue;
            }
            $lesson->update([
                'title'           => $data['title'],
                'summary'         => $data['summary'],
                'content'         => $data['content'],
                'seo_title'       => $data['seo_title'],
                'seo_description' => $data['seo_description'],
                'is_featured'     => true,
                'status'          => 'published',
                'published_at'    => $lesson->published_at ?? now(),
            ]);
        }
    }

    private function flagshipContent(): array
    {
        return [
            16 => [
                'title'   => 'Uy Lực Của Hoành Xe Chiếm Sườn',
                'summary' => 'Hoành xe là cách xuất Xe ngang, nhanh chóng chiếm lộ sườn để mở đường tấn công. Bài học phân tích thế trận qua bàn cờ đi từng nước.',
                'seo_title' => 'Hoành Xe Chiếm Sườn — Nguyên Lý Khai Cuộc Cờ Tướng',
                'seo_description' => 'Học cách dùng hoành xe chiếm lộ sườn trong khai cuộc cờ tướng, đi lại từng nước trên bàn cờ tương tác để hiểu rõ thế trận.',
                'content' => '<h2>Hoành xe là gì?</h2>'
                    . '<p>Trong khai cuộc, có hai cách cơ bản để đưa Xe ra trận: <strong>trực xe</strong> (Xe tiến thẳng theo cột) và <strong>hoành xe</strong> (Xe đi ngang qua một hàng để đổi cột). Hoành xe giúp Xe nhanh chóng chuyển sang lộ có nhiều triển vọng, thường là lộ sườn, nơi đối phương chưa kịp phòng bị.</p>'
                    . '<h2>Vì sao chiếm sườn lại mạnh?</h2>'
                    . '<p>Lộ sườn là hai cột biên và các cột kề bên. Khi Xe chiếm được lộ này, nó vừa hỗ trợ tấn công cánh, vừa sẵn sàng bọc lót cho Pháo và Mã. Một quân Xe hoạt động thông thoáng có giá trị hơn hẳn quân Xe bị kẹt sau hàng Tốt.</p>'
                    . '<h2>Theo dõi thế trận</h2>'
                    . '<p>Hãy dùng nút <strong>Tiến</strong> trên bàn cờ phía trên để đi lại từng nước. Chú ý thời điểm Xe chuyển ngang và cách nó phối hợp với các quân khác để giành thế chủ động.</p>'
                    . '<ul><li>Ưu tiên phát triển quân trước khi tấn công.</li><li>Hoành xe hợp với các thế trận cần đổi cánh nhanh.</li><li>Luôn quan sát an toàn của Tướng khi dồn quân sang một bên.</li></ul>',
            ],
            37 => [
                'title'   => 'Khởi Mã Cuộc — Nguyên Lý Cơ Bản',
                'summary' => 'Khởi mã cuộc là thế khai cuộc mở màn bằng nước lên Mã thay vì Pháo đầu, chú trọng phát triển chắc chắn và linh hoạt.',
                'seo_title' => 'Khởi Mã Cuộc — Khai Cuộc Cờ Tướng Cho Người Mới',
                'seo_description' => 'Tìm hiểu khởi mã cuộc trong cờ tướng: ý tưởng, ưu nhược điểm và cách triển khai, minh hoạ bằng bàn cờ tương tác đi từng nước.',
                'content' => '<h2>Ý tưởng của khởi mã cuộc</h2>'
                    . '<p>Thay vì lao ngay Pháo vào giữa, bên đi trước chọn lên Mã để xây dựng thế trận vững chắc. Đây là lối chơi thiên về phát triển đều các quân, tránh mạo hiểm sớm và giữ nhiều lựa chọn biến hoá cho các nước sau.</p>'
                    . '<h2>Ưu và nhược điểm</h2>'
                    . '<ul><li><strong>Ưu điểm:</strong> chắc chắn, ít bị đối phương bắt bài, dễ chuyển hoá sang nhiều hệ thống khác nhau.</li><li><strong>Nhược điểm:</strong> sức ép ban đầu nhẹ hơn Pháo đầu, cần kiên nhẫn tích luỹ lợi thế.</li></ul>'
                    . '<h2>Theo dõi thế trận</h2>'
                    . '<p>Đi lại từng nước trên bàn cờ để thấy cách hai bên lần lượt đưa quân ra trận và tranh giành các lộ quan trọng ở giai đoạn khai cuộc.</p>',
            ],
            34 => [
                'title'   => 'Phi Tượng Cuộc Đối Sĩ Giác Pháo',
                'summary' => 'Phi tượng cuộc mở màn bằng nước lên Tượng, xây thế phòng thủ vững rồi phản công. Bài phân tích cách đối phó với sĩ giác pháo.',
                'seo_title' => 'Phi Tượng Cuộc Đối Sĩ Giác Pháo — Khai Cuộc Cờ Tướng',
                'seo_description' => 'Học phi tượng cuộc đối sĩ giác pháo trong cờ tướng: tư duy phòng thủ phản công, minh hoạ bằng bàn cờ đi từng nước.',
                'content' => '<h2>Phi tượng cuộc là gì?</h2>'
                    . '<p>Phi tượng cuộc là thế khai cuộc bắt đầu bằng nước lên Tượng giữa. Bên đi trước ưu tiên sự cân bằng và an toàn, dựng một thế trận khó bị công phá rồi chờ thời cơ phản công.</p>'
                    . '<h2>Đối sĩ giác pháo</h2>'
                    . '<p>Sĩ giác pháo là cách bố trí Pháo ở góc sĩ, tạo thế linh hoạt cho bên đi sau. Khi hai hệ thống này gặp nhau, ván cờ thường diễn ra thận trọng, đôi bên tranh giành từng lộ và từng nhịp tiên.</p>'
                    . '<h2>Theo dõi thế trận</h2>'
                    . '<p>Dùng bàn cờ tương tác phía trên để đi lại từng nước, quan sát cách mỗi bên vừa củng cố phòng thủ vừa tìm cơ hội chủ động.</p>',
            ],
        ];
    }
}
