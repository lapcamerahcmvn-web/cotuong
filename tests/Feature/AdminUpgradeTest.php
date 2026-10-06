<?php

namespace Tests\Feature;

use App\Models\LoginEvent;
use App\Models\SiteSetting;
use App\Models\UrlRedirect;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Cache;
use Tests\TestCase;

// Admin nâng cấp 10/2026: quản lý người dùng (đăng nhập, khoá, xoá), thống kê, cài đặt web & SEO, chuyển hướng 301.
class AdminUpgradeTest extends TestCase
{
    use RefreshDatabase;

    private function user(string $role = 'hoc_vien', array $extra = []): User
    {
        return User::create(array_merge(['name' => ucfirst($role), 'email' => uniqid() . '@t.local', 'password' => 'secret12', 'role' => $role], $extra))->fresh();
    }

    public function test_admin_pages_render(): void
    {
        $admin = $this->user('admin');
        $u = $this->user();
        foreach (['/admin', '/admin/users', '/admin/users?loc=active&sx=xp', '/admin/users/' . $u->id, '/admin/thong-ke', '/admin/cai-dat'] as $url) {
            $this->actingAs($admin)->get($url)->assertOk();
        }
        $this->actingAs($this->user('bien_tap'))->get('/admin/cai-dat')->assertForbidden();
    }

    public function test_login_events_are_recorded(): void
    {
        $u = $this->user();
        $this->post('/dang-nhap', ['email' => $u->email, 'password' => 'sai-mat-khau'])->assertSessionHasErrors();
        $this->post('/dang-nhap', ['email' => $u->email, 'password' => 'secret12'])->assertRedirect();
        $this->assertSame(1, LoginEvent::where('user_id', $u->id)->where('success', false)->count());
        $this->assertSame(1, LoginEvent::where('user_id', $u->id)->where('success', true)->where('method', 'password')->count());
    }

    public function test_banned_user_is_logged_out_and_cannot_log_in(): void
    {
        $admin = $this->user('admin');
        $u = $this->user();
        $this->actingAs($admin)->post("/admin/users/{$u->id}/khoa", ['reason' => 'spam'])->assertRedirect();
        $this->assertNotNull($u->fresh()->banned_at);

        $this->actingAs($u->fresh())->get('/tai-khoan')->assertRedirect(route('login'));
        $this->assertGuest();
        $this->post('/dang-nhap', ['email' => $u->email, 'password' => 'secret12'])->assertSessionHasErrors('email');
        $this->assertGuest();

        $this->actingAs($admin)->post("/admin/users/{$u->id}/mo-khoa");
        $this->assertNull($u->fresh()->banned_at);
    }

    public function test_delete_requires_matching_email(): void
    {
        $admin = $this->user('admin');
        $u = $this->user();
        $this->actingAs($admin)->delete("/admin/users/{$u->id}", ['confirm_email' => 'khac@t.local'])->assertRedirect();
        $this->assertNotNull($u->fresh());
        $this->actingAs($admin)->delete("/admin/users/{$u->id}", ['confirm_email' => strtoupper($u->email)])->assertRedirect(route('admin.users.index'));
        $this->assertNull(User::find($u->id));
    }

    public function test_settings_override_home_seo_and_redirects(): void
    {
        $admin = $this->user('admin');
        $this->actingAs($admin)->post('/admin/cai-dat', ['home_title' => 'Học cờ tướng miễn phí — thử nghiệm', 'ga4_id' => 'G-TEST1234'])->assertRedirect();
        Cache::forget('site_settings');
        $this->assertSame('Học cờ tướng miễn phí — thử nghiệm', SiteSetting::find('home_title')->value);
        SiteSetting::applyToConfig();   // như lúc khởi động request mới (AppServiceProvider)
        $this->get('/')->assertSee('<title>Học cờ tướng miễn phí — thử nghiệm</title>', false)->assertSee('G-TEST1234', false);

        $this->post('/admin/cai-dat', ['ga4_id' => 'sai-dinh-dang'])->assertSessionHasErrors('ga4_id');

        $this->actingAs($admin)->post('/admin/cai-dat/chuyen-huong', ['from_path' => '/trang-cu-xyz', 'to_path' => '/lo-trinh'])->assertRedirect();
        $this->get('/trang-cu-xyz')->assertRedirect('/lo-trinh')->assertStatus(301);
        $r = UrlRedirect::where('from_path', '/trang-cu-xyz')->first();
        $this->actingAs($admin)->delete("/admin/cai-dat/chuyen-huong/{$r->id}")->assertRedirect();
        $this->get('/trang-cu-xyz')->assertNotFound();
    }
}
