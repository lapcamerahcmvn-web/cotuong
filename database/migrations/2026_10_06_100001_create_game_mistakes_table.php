<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// "Học từ sai lầm của chính mình": mỗi nước Sai lầm / Sai lầm nghiêm trọng của người chơi (tìm ra khi phân tích ván)
// thành 1 thế cờ luyện lại theo lịch lặp ngắt quãng. Đáp án (điểm từng nước) chỉ nằm ở server.
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_mistakes', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('game_record_id')->constrained()->cascadeOnDelete();
            $table->unsignedSmallInteger('ply');            // chỉ số nước đi sai trong ván (0-based)
            $table->string('fen', 100);                      // thế cờ TRƯỚC nước sai
            $table->string('side', 3);                       // do | den — bên phải đi
            $table->string('played', 4);                     // nước đã đi (ICCS)
            $table->string('best', 4);                       // nước máy đề xuất
            $table->text('alts');                            // JSON {iccs: điểm} — chấm nước người dùng thử lại
            $table->unsignedInteger('loss');
            $table->string('class', 8);                      // mistake | blunder
            $table->unsignedTinyInteger('box')->default(0);  // hộp Leitner 0..4 (4 = đã thuộc)
            $table->date('due_on')->nullable();
            $table->unsignedSmallInteger('tries')->default(0);
            $table->unsignedSmallInteger('solved')->default(0);
            $table->timestamp('mastered_at')->nullable();
            $table->timestamps();
            $table->unique(['game_record_id', 'ply']);
            $table->index(['user_id', 'due_on']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_mistakes');
    }
};
