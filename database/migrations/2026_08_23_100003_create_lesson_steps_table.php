<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Từng bước của bài học. `fen` = thế cờ SAU nước đi này (browser chỉ render FEN, không cần
// engine). `caption` do Agent/admin viết — service sinh caption KHÔNG được đụng fen/move_*.
return new class extends Migration {
    public function up(): void
    {
        Schema::create('lesson_steps', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('lesson_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('step_order');
            $table->string('fen', 120);                          // thế cờ sau nước đi
            $table->string('move_notation_wxf')->nullable();     // hiển thị: "Pháo 2 bình 5"
            $table->string('move_notation_iccs', 8)->nullable(); // máy đọc: "h2e2"
            $table->string('move_side', 8)->nullable();          // do | den
            $table->string('moved_piece', 1)->nullable();
            $table->string('captured_piece', 1)->nullable();
            $table->text('caption')->nullable();                 // lời giảng (Agent/admin viết)
            $table->boolean('is_flip_reveal')->default(false);   // Cờ Úp: bước lật mở quân
            $table->json('highlight_squares')->nullable();
            $table->string('raw_source_move')->nullable();       // debug/truy vết
            $table->timestamps();

            $table->unique(['lesson_id', 'step_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_steps');
    }
};
