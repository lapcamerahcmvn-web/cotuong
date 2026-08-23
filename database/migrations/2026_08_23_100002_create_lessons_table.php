<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Bài học. move/FEN (bảng lesson_steps) là dữ liệu "đáng tin" từ decoder — content/summary do
// Agent hoặc admin viết lại. 2 nguồn tách bạch (xem .claude/03-ke-hoach-trien-khai.md mục 0).
return new class extends Migration {
    public function up(): void
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('series_id')->nullable()->constrained('lesson_series')->nullOnDelete();
            $table->unsignedSmallInteger('order_in_series')->nullable();
            $table->string('game_mode')->default('co-tuong');   // co-tuong | co-up
            $table->string('phase')->nullable();                 // nhap-mon|khai-cuoc|trung-cuoc|tan-cuoc
            $table->string('title', 255);
            $table->string('slug')->unique();
            $table->string('level')->default('co-ban');          // co-ban | trung-cap | nang-cao
            $table->string('source_type')->default('xqf');       // xqf|pgn|pdf|video_local|manual|mixed
            $table->string('source_xqf_path', 500)->nullable();  // NỘI BỘ — truy vết
            $table->string('source_pgn_path', 500)->nullable();  // NỘI BỘ
            $table->string('initial_fen', 120)->nullable();      // thế cờ mở đầu (render bàn cờ)
            $table->unsignedSmallInteger('move_count')->default(0);
            $table->text('summary')->nullable();                 // meta description nguồn
            $table->longText('content')->nullable();             // HTML (TinyMCE) — Agent/admin viết
            $table->string('status')->default('draft');          // draft|review|needs_fix|published
            $table->string('decode_confidence')->nullable();     // high|medium|low
            $table->json('decode_warnings')->nullable();
            $table->string('thumbnail')->nullable();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->unsignedInteger('view_count')->default(0);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();

            $table->index(['game_mode', 'status']);
            $table->index(['phase', 'status']);
            $table->index(['series_id', 'order_in_series']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
