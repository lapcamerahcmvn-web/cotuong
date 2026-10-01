<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Kho thế cờ luyện tập — dựng từ bài học có puzzle_side bằng `cotuong:build-puzzles`.
// Chỉ FK tới lessons.id (ContentSeeder xoá/tạo lại lesson_steps nên id bước KHÔNG ổn định).
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('puzzles', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('lesson_id')->nullable()->constrained()->nullOnDelete();
            $table->unsignedSmallInteger('start_ply')->default(0);
            $table->string('source', 20)->default('lesson');
            $table->string('title');
            $table->string('fen', 120);
            $table->string('side', 3);                       // do | den — bên người giải
            $table->text('solution');                        // JSON: ICCS cả 2 bên theo thứ tự
            $table->text('alt_finals')->nullable();          // JSON: các nước chiếu hết thay thế ở nước cuối
            $table->unsignedTinyInteger('solver_moves');
            $table->unsignedSmallInteger('rating')->default(1200);
            $table->text('skill_tags')->nullable();          // JSON: ["song-xe","sat-phap",...]
            $table->string('phase', 20)->nullable();
            $table->string('status', 12)->default('published');
            $table->unsignedInteger('attempts_count')->default(0);
            $table->unsignedInteger('solved_count')->default(0);
            $table->timestamps();
            $table->unique(['lesson_id', 'start_ply']);
            $table->index(['status', 'rating']);
        });

        Schema::create('puzzle_attempts', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('puzzle_id')->constrained()->cascadeOnDelete();
            $table->string('mode', 12);                      // daily|rush|survival|topic|review|lesson|placement
            $table->string('session_id', 36)->nullable();
            $table->string('result', 10);                    // solved|failed|revealed
            $table->unsignedTinyInteger('wrong_ply')->nullable();
            $table->string('user_move', 8)->nullable();
            $table->string('expected_move', 8)->nullable();
            $table->unsignedInteger('ms')->default(0);
            $table->unsignedSmallInteger('rating_before')->nullable();
            $table->unsignedSmallInteger('rating_after')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->index(['user_id', 'created_at']);
            $table->index(['puzzle_id', 'result']);
        });

        Schema::create('user_puzzle_reviews', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('puzzle_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('box')->default(0);  // Leitner 0..4
            $table->date('due_at');
            $table->unsignedSmallInteger('lapses')->default(0);
            $table->string('last_result', 10)->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'puzzle_id']);
            $table->index(['user_id', 'due_at']);
        });

        Schema::create('practice_sessions', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->uuid('uuid')->unique();
            $table->foreignId('user_id')->nullable()->constrained()->cascadeOnDelete();
            $table->string('mode', 12);
            $table->text('puzzle_ids');                      // JSON
            $table->unsignedSmallInteger('cursor')->default(0);
            $table->unsignedSmallInteger('score')->default(0);
            $table->unsignedTinyInteger('lives')->default(3);
            $table->text('log')->nullable();                 // JSON [{id, ok}]
            $table->timestamp('started_at');
            $table->timestamp('expires_at')->nullable();
            $table->timestamp('finished_at')->nullable();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('practice_sessions');
        Schema::dropIfExists('user_puzzle_reviews');
        Schema::dropIfExists('puzzle_attempts');
        Schema::dropIfExists('puzzles');
    }
};
