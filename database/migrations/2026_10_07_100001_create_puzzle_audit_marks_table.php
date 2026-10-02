<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Kiểm định thế cờ (Admin): đánh dấu đã xử lý từng chỗ "nước đỡ trong sách chưa phải tốt nhất" — khoá theo bài học +
// chỉ số nước trong bài (thế đầy đủ và thế đoạn kết của cùng bài dùng chung 1 dấu).
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('puzzle_audit_marks', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->unsignedBigInteger('lesson_id');
            $table->unsignedSmallInteger('ply');             // chỉ số nước đỡ tính từ đầu bài học (0-based)
            $table->string('status', 10);                    // fixed (đã sửa bài) | keep (giữ nguyên)
            $table->string('note', 500)->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamps();
            $table->unique(['lesson_id', 'ply']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('puzzle_audit_marks');
    }
};
