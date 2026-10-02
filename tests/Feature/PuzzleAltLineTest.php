<?php

namespace Tests\Feature;

use App\Models\Puzzle;
use App\Models\User;
use App\Services\PuzzleService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

// Thế cờ có NHIỀU đường chiếu hết: người giải đi khác sách nhưng vẫn chiếu hết (bộ giải phía client chứng minh,
// gửi cả diễn biến) → server nhận. Dữ liệu là thế thật trong kho (sát pháp) + đường thắng do engine dựng.
class PuzzleAltLineTest extends TestCase
{
    use RefreshDatabase;

    private function puzzle(array $over = []): Puzzle
    {
        return Puzzle::create($over + [
            'title' => 'Sát pháp Song Xe', 'fen' => '3k1ab2/4a4/4c4/2R6/9/R8/9/B2A3r1/4A2r1/2B2K3', 'side' => 'do',
            'solution' => ['c6c9', 'd9d8', 'c9c8', 'd8d9', 'a4a9'], 'solver_moves' => 3,
            'rating' => 1200, 'skill_tags' => ['song-xe'], 'phase' => 'trung-cuoc',
        ]);
    }

    public function test_dung_loi_giai_sach_van_dung(): void
    {
        $v = app(PuzzleService::class)->verify($this->puzzle(), ['c6c9', 'c9c8', 'a4a9']);
        $this->assertTrue($v['ok']);
    }

    public function test_duong_chieu_het_khac_sach_duoc_nhan(): void
    {
        $line = ['a4a9', 'd9d8', 'a9a8', 'd8d9', 'c6c9'];
        $v = app(PuzzleService::class)->verify($this->puzzle(), ['a4a9', 'a9a8', 'c6c9'], $line);
        $this->assertTrue($v['ok']);
        $this->assertTrue($v['alt'] ?? false);
    }

    public function test_duong_khong_chieu_het_bi_tu_choi(): void
    {
        $svc = app(PuzzleService::class);
        $p = $this->puzzle();
        $this->assertFalse($svc->verify($p, ['a4a9', 'a9a8'], ['a4a9', 'd9d8', 'a9a8'])['ok']);       // kết thúc bằng nước đỡ
        $this->assertFalse($svc->verify($p, ['a4a5'], ['a4a5'])['ok']);                                // chưa hết
        $this->assertFalse($svc->verify($p, ['a4a9'], ['a4a9', 'd9d8', 'z9z9'])['ok']);                // nước rác
        $this->assertFalse($svc->verify($p, ['a4a9'], ['a4a9', 'c6c5', 'a9a8'])['ok']);                // đi nhầm quân bên kia
    }

    public function test_ma_chieu_het_duong_khac(): void
    {
        $p = $this->puzzle(['fen' => '9/3k5/9/3N5/9/9/9/9/4K4/9', 'solution' => ['d6b7', 'd8d9', 'e1e0'], 'solver_moves' => 2]);
        $this->assertTrue(app(PuzzleService::class)->verify($p, ['d6f7', 'e1e2'], ['d6f7', 'd8d9', 'e1e2'])['ok']);
    }

    public function test_duong_qua_dai_bi_tu_choi(): void
    {
        // Giới hạn = số nước lời giải + 2 (3 + 2 = 5): vòng chiếu lặp kéo dài rồi mới chiếu hết.
        $svc = app(PuzzleService::class);
        $p = $this->puzzle();
        $loop = ['c6c9', 'd9d8', 'c9c8', 'd8d9', 'c8c9', 'd9d8', 'c9c8', 'd8d9'];
        $ok5 = array_merge($loop, ['a4a9']);                                             // 5 nước → nhận
        $this->assertTrue($svc->verify($p, ['x'], $ok5)['ok']);
        $long7 = array_merge($loop, ['c8c9', 'd9d8', 'c9c8', 'd8d9', 'a4a9']);           // 7 nước → từ chối
        $this->assertFalse($svc->verify($p, ['x'], $long7)['ok']);
    }

    public function test_the_khong_ket_thuc_bang_chieu_het_khong_nhan_duong_khac(): void
    {
        // Lời giải chỉ "tiến Xe" (không chiếu hết) → chỉ nhận đúng sách.
        $p = $this->puzzle(['solution' => ['c6c7'], 'solver_moves' => 1]);
        $this->assertFalse(app(PuzzleService::class)->verify($p, ['a4a9'], ['a4a9', 'd9d8', 'a9a8', 'd8d9', 'c6c9'])['ok']);
    }

    public function test_api_nhan_line(): void
    {
        $u = User::factory()->create();
        $p = $this->puzzle();
        $this->actingAs($u)->postJson("/luyen-tap/the-co/{$p->id}/thu", [
            'moves' => ['a4a9', 'a9a8', 'c6c9'], 'line' => ['a4a9', 'd9d8', 'a9a8', 'd8d9', 'c6c9'],
            'ms' => 9000, 'mode' => 'topic',
        ])->assertOk()->assertJson(['ok' => true]);
        $this->assertDatabaseHas('puzzle_attempts', ['user_id' => $u->id, 'puzzle_id' => $p->id, 'result' => 'solved']);
    }
}
