<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Nâng cấp Admin: lịch sử đăng nhập (thành công / thất bại), khoá tài khoản, cài đặt web & SEO sửa trong Admin.
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('login_events', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('email', 191)->nullable();          // email đã nhập (đăng nhập thất bại không có user_id)
            $table->string('method', 16);                       // password | google | register
            $table->boolean('success')->default(true);
            $table->string('ip', 45)->nullable();
            $table->string('user_agent', 500)->nullable();
            $table->timestamp('created_at')->nullable();
            $table->index(['user_id', 'created_at']);
            $table->index('created_at');
        });

        Schema::table('users', function (Blueprint $table) {
            $table->timestamp('banned_at')->nullable();
            $table->string('ban_reason', 255)->nullable();
        });

        Schema::create('site_settings', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->string('key', 64)->primary();
            $table->text('value')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['banned_at', 'ban_reason']);
        });
        Schema::dropIfExists('login_events');
    }
};
