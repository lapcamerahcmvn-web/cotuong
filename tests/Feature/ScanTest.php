<?php

namespace Tests\Feature;

use App\Http\Controllers\ScanController;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ScanTest extends TestCase
{
    use RefreshDatabase;

    public function test_scan_page_and_ai_disabled_without_key(): void
    {
        config(['ai.providers.anthropic.key' => null]);
        $this->get(route('scan'))->assertOk()->assertSee('Nhận diện bàn cờ từ ảnh')->assertSee('data-scan', false)
            ->assertDontSee('data-ai', false)->assertSee('images/scan-mau/co-up.jpg', false);
        $u = User::create(['name' => 'A', 'email' => 'a@t.local', 'password' => 'secret12', 'role' => 'hoc_vien']);
        $this->actingAs($u)->postJson(route('scan.ai'), ['image' => base64_encode('x')])->assertNotFound();
        $this->get(route('sitemap.section', 'pages'))->assertOk()->assertSee(route('scan'), false);
    }

    public function test_ai_endpoint_with_fake_agent(): void
    {
        config(['ai.providers.anthropic.key' => 'test-key']);
        $rows = ['rnbakabnr', '.........', '.c.....c.', 'p.p.p.p.p', '.........', '.........', 'P.P.P.P.P', '.C.....C.', '.........', 'RNBAKABNR'];
        \App\Ai\Agents\BoardVisionAgent::fake([['rows' => $rows], ['rows' => ['sai']]]);
        $png = base64_encode(base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=='));
        $u = User::create(['name' => 'A', 'email' => 'a@t.local', 'password' => 'secret12', 'role' => 'hoc_vien']);

        $this->get(route('scan'))->assertSee('data-ai', false);
        $this->postJson(route('scan.ai'), ['image' => $png])->assertUnauthorized();
        $this->actingAs($u)->postJson(route('scan.ai'), ['image' => base64_encode('không phải ảnh')])->assertStatus(422);
        $this->actingAs($u)->postJson(route('scan.ai'), ['image' => $png])->assertOk()
            ->assertJson(['fen' => 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR']);
        $this->actingAs($u)->postJson(route('scan.ai'), ['image' => $png])->assertStatus(422);
    }

    public function test_ai_rows_to_fen_validation(): void
    {
        $rows = ['rnbakabnr', '.........', '.c.....c.', 'p.p.p.p.p', '.........', '.........', 'P.P.P.P.P', '.C.....C.', '.........', 'RNBAKABNR'];
        $this->assertSame('rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR', ScanController::rowsToFen($rows));
        $this->assertSame('xxxxkxxxx/9/9/9/9/9/9/9/9/XXXXKXXXX', ScanController::rowsToFen(['xxxxkxxxx', ...array_fill(0, 8, '.........'), 'XXXXKXXXX']));
        $this->assertNull(ScanController::rowsToFen(array_slice($rows, 0, 9)));
        $this->assertNull(ScanController::rowsToFen(array_merge(array_slice($rows, 0, 9), ['RNBAKABN'])));
        $this->assertNull(ScanController::rowsToFen(array_merge(array_slice($rows, 0, 9), ['RNBAKABNQ'])));
    }
}
