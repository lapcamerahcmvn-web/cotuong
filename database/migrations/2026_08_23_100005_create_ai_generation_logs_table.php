<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Log mọi lần gọi AI (LessonWriterAgent...) — port pattern từ laravel13-shop. Dùng để audit
// chi phí token + debug khi Agent trả kết quả lạ.
return new class extends Migration {
    public function up(): void
    {
        Schema::create('ai_generation_logs', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('type');                       // lesson_content | ...
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->string('reference_type')->nullable();
            $table->longText('prompt');
            $table->longText('result')->nullable();
            $table->string('model')->nullable();
            $table->unsignedInteger('tokens_used')->nullable();
            $table->string('status')->default('pending'); // pending | completed | failed
            $table->text('error_message')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->timestamps();

            $table->index(['type', 'status']);
            $table->index(['reference_type', 'reference_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ai_generation_logs');
    }
};
