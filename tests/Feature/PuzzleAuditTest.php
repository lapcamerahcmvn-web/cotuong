<?php

namespace Tests\Feature;

use App\Models\Puzzle;
use App\Models\PuzzleAuditMark;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Trang Admin "Kiểm định thế cờ": đọc database/data/puzzle-audit.json (dữ liệu thật đã commit), chỉ nhân sự xem được.
class PuzzleAuditTest extends TestCase
{
    use RefreshDatabase;

    private function user(string $role): User
    {
        return User::create(['name' => $role, 'email' => uniqid() . '@t.local', 'password' => 'secret12', 'role' => $role])->fresh();
    }

    public function test_hoc_vien_bi_chan(): void
    {
        $this->actingAs($this->user('hoc_vien'))->get('/admin/kiem-dinh-the-co')->assertForbidden();
    }

    public function test_bien_tap_xem_va_danh_dau(): void
    {
        $data = json_decode(file_get_contents(database_path('data/puzzle-audit.json')), true);
        $row = $data['puzzles'][0];
        // Dựng lại đúng thế cờ trong JSON (id cố định) để trang có dữ liệu hiển thị.
        $p = Puzzle::forceCreate([
            'id' => $row['id'], 'lesson_id' => null, 'start_ply' => $row['start_ply'], 'title' => 'Thế kiểm định',
            'fen' => '3k1ab2/c1P2P3/3C5/9/9/6B2/9/3AK4/9/9', 'side' => 'do', 'solution' => ['d7d8', 'a8d8', 'c8c9'],
            'solver_moves' => 2, 'rating' => 1200, 'skill_tags' => [], 'phase' => 'trung-cuoc',
        ]);
        $u = $this->user('bien_tap');

        $this->actingAs($u)->get('/admin/kiem-dinh-the-co?loc=all')->assertOk()
            ->assertSee('Kiểm định thế cờ')->assertSee('#' . $p->id);

        $this->actingAs($u)->post('/admin/kiem-dinh-the-co', ['lesson_id' => 5, 'ply' => 3, 'status' => 'keep', 'note' => 'Bài cố ý'])
            ->assertRedirect();
        $this->assertDatabaseHas('puzzle_audit_marks', ['lesson_id' => 5, 'ply' => 3, 'status' => 'keep', 'user_id' => $u->id]);

        $this->actingAs($u)->post('/admin/kiem-dinh-the-co', ['lesson_id' => 5, 'ply' => 3, 'status' => 'open']);
        $this->assertSame(0, PuzzleAuditMark::count());
    }
}
