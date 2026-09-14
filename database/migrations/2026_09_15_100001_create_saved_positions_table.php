<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// "Thư viện" cá nhân: thế cờ (FEN) người dùng đăng nhập tự lưu — sao chép từ bài học hoặc
// tự soạn ở /tai-khoan/thu-vien. Xem .claude/memory.md mục 2026-09-15.
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('saved_positions', function (Blueprint $table) {
            $table->engine = 'InnoDB'; // WAMP local mặc định MyISAM — xem AppServiceProvider.
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            // Bài học gốc (nếu lưu từ 1 bài) — chỉ để hiển thị link ngược, không bắt buộc.
            $table->foreignId('source_lesson_id')->nullable()->constrained('lessons')->nullOnDelete();
            $table->string('fen', 120);
            $table->string('title')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('saved_positions');
    }
};
