<?php

namespace Tests\Feature;

use App\Models\Lesson;
use App\Models\LessonSeries;
use App\Models\Post;
use App\Models\PostCategory;
use App\Models\User;
use App\Support\Mindmap;
use App\Support\PostContent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Công cụ Sơ đồ tư duy: dựng cây từ chuyên đề có khẩu quyết, dàn ý chữ ↔ cây, shortcode trong bài viết, Admin.
class MindmapTest extends TestCase
{
    use RefreshDatabase;

    private function endgame(): LessonSeries
    {
        $s = LessonSeries::create(['name' => 'Cờ Tàn Thử', 'slug' => 'co-tan-thu', 'game_mode' => 'co-tuong', 'phase' => 'tan-cuoc', 'sort_order' => 1]);
        $mk = fn ($slug, $title, $red, $result, array $kq, $order) => Lesson::create([
            'title' => $title, 'slug' => $slug, 'series_id' => $s->id, 'phase' => 'tan-cuoc', 'status' => 'published', 'published_at' => now(),
            'order_in_series' => $order, 'initial_fen' => '3k5/9/9/9/9/9/9/9/9/4K4',
            'content' => "<h2>Thế cờ</h2><p><strong>Đỏ:</strong> {$red}. <strong>Đen:</strong> Tướng, Sĩ. Đỏ đi trước.</p><p><strong>Kết quả:</strong> {$result}.</p><h2>Khẩu quyết</h2><ul>"
                . implode('', array_map(fn ($k) => "<li>{$k}</li>", $kq)) . '</ul>',
        ]);
        $mk('ct-hai-chot-hoa', 'Cờ Tàn Chốt · Hai Chốt Thấp Hòa Hai Sĩ', 'Tướng, 2 Chốt', 'Hòa — Đen giữ được nếu thủ đúng khẩu quyết', ['Đen giữ Tướng ở tầng 2.', 'Dùng Sĩ lấy nước đi.'], 10);
        $mk('ct-hai-chot-thang', 'Cờ Tàn Chốt · Hai Chốt Thắng Hai Sĩ', 'Tướng, 2 Chốt', 'Đỏ thắng', ['Một Chốt làm chỗ dựa.'], 20);
        $mk('ct-don-xe-kheo', 'Cờ Tàn Xe · Đơn Xe Khéo Thắng Sĩ Tượng Toàn', 'Tướng, Xe', 'Đỏ khéo thắng (phải đi thật chính xác)', ['Khéo dùng nước nhấp, nước chờ.'], 30);
        $mk('ct-mot-chot-hoa', 'Cờ Tàn Chốt · Một Chốt Hòa Một Sĩ', 'Tướng, Chốt', 'Hòa', ['Sĩ đi qua lại đúng nhịp.'], 40);

        return $s;
    }

    public function test_tree_from_series_groups_by_chapter_and_attacker(): void
    {
        $this->endgame();
        $hoa = Mindmap::fromSeries('co-tan-thu', 'hoa');
        $this->assertSame('Tàn Chốt', $hoa[0]['t']);
        $this->assertSame(['Một Chốt', 'Hai Chốt'], array_column($hoa[0]['c'], 't'));      // xếp theo sức mạnh lực lượng
        $this->assertSame(['Đen giữ Tướng ở tầng 2.', 'Dùng Sĩ lấy nước đi.'], $hoa[0]['c'][1]['c'][0]['k']);
        $this->assertSame(2, Mindmap::leafCount($hoa));
        $this->assertSame('Đơn Xe', Mindmap::fromSeries('co-tan-thu', 'kheo')[0]['c'][0]['t']);
        $this->assertSame(1, Mindmap::leafCount(Mindmap::fromSeries('co-tan-thu', 'thang')));
    }

    public function test_outline_round_trip_and_nesting(): void
    {
        $tree = Mindmap::parseOutline("# A\n## A1 @bai-a1\n- câu 1\n- câu 2\n> ghi chú\n### A1a\n# B\n- câu B");
        $this->assertSame('A', $tree[0]['t']);
        $this->assertSame('bai-a1', $tree[0]['c'][0]['l']);
        $this->assertSame(['câu 1', 'câu 2'], $tree[0]['c'][0]['k']);
        $this->assertSame('ghi chú', $tree[0]['c'][0]['note']);
        $this->assertSame('A1a', $tree[0]['c'][0]['c'][0]['t']);
        $this->assertSame(['câu B'], $tree[1]['k']);
        $this->assertEquals($tree, Mindmap::parseOutline(Mindmap::toOutline($tree)));
        $this->assertSame(2, Mindmap::leafCount($tree));   // A1 có con (A1a) nên không phải lá: lá = A1a, B
    }

    public function test_post_shortcode_renders_numbered_tree_with_examples(): void
    {
        $this->endgame();
        $html = PostContent::render('<p>[so-do-tu-duy chuyen-de="co-tan-thu" ket-qua="hoa" tieu-de="Thế hòa"]</p>');
        $this->assertStringContainsString('data-mindmap="co-tan-thu-hoa"', $html);
        $this->assertStringContainsString('<span class="mm-num">1.2.1</span>', $html);
        $this->assertStringContainsString('/bai-hoc/ct-hai-chot-hoa', $html);
        $this->assertStringContainsString('cam=den', $html);              // thế hòa: người học cầm Đen giữ hòa
        $this->assertStringContainsString('<li>Dùng Sĩ lấy nước đi.</li>', $html);
        $this->assertStringNotContainsString('ct-hai-chot-thang', $html);

        $cat = PostCategory::create(['name' => 'Kiến thức', 'slug' => 'kien-thuc']);
        $post = Post::create(['title' => 'Khẩu quyết thử', 'slug' => 'khau-quyet-thu', 'post_category_id' => $cat->id, 'status' => 'published', 'published_at' => now(),
            'content' => '<h2>Sơ đồ</h2>[so-do-tu-duy chuyen-de="co-tan-thu" ket-qua="kheo"]']);
        $this->get(route('posts.show', [$cat->slug, $post->slug]))->assertOk()->assertSee('Đơn Xe Khéo Thắng Sĩ Tượng Toàn')->assertSee('Khéo dùng nước nhấp, nước chờ.');
    }

    public function test_admin_tool_create_generate_preview(): void
    {
        $this->endgame();
        $admin = User::create(['name' => 'Ad', 'email' => 'ad@t.local', 'password' => 'secret12', 'role' => 'admin']);
        $this->actingAs($admin)->get(route('admin.mindmaps.index'))->assertOk();
        $this->actingAs($admin)->get(route('admin.mindmaps.create'))->assertOk();
        $gen = $this->actingAs($admin)->getJson(route('admin.mindmaps.generate', ['series' => 'co-tan-thu', 'result' => 'hoa']))->assertOk()->json();
        $this->assertSame(2, $gen['leaves']);
        $this->actingAs($admin)->postJson(route('admin.mindmaps.preview'), ['outline' => $gen['outline'], 'title' => 'X'])->assertOk()->assertJson(['leaves' => 2]);

        $this->actingAs($admin)->post(route('admin.mindmaps.store'), ['title' => 'Sơ đồ hòa', 'outline' => $gen['outline']])->assertRedirect();
        $this->assertDatabaseHas('mindmaps', ['slug' => 'so-do-hoa']);
        $html = PostContent::render('[so-do-tu-duy slug="so-do-hoa"]');
        $this->assertStringContainsString('Một Chốt Hòa Một Sĩ', $html);
        $this->assertStringContainsString('Không tìm thấy sơ đồ', PostContent::render('[so-do-tu-duy slug="khong-co"]'));
    }
}
