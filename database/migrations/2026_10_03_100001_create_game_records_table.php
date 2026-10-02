<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Lịch sử ván đấu của từng người (ván với máy + ván đấu bạn) để xem lại / chép vào thư viện.
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('game_records', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('mode', 4);                     // bot | pvp
            $table->string('variant', 10)->default('co-tuong');
            $table->unsignedTinyInteger('level')->nullable();   // cấp máy (ván với máy)
            $table->foreignId('game_id')->nullable()->constrained('games')->nullOnDelete();
            $table->string('side', 3);                     // do | den — bên người này cầm
            $table->string('opponent', 120);
            $table->string('result', 4);                   // win | loss | draw
            $table->string('reason', 60)->nullable();
            $table->string('start_fen', 120);
            $table->text('moves');                         // JSON ICCS
            $table->text('reveals')->nullable();           // JSON — quân lật ra ở từng nước (cờ úp)
            $table->text('captured')->nullable();          // JSON — quân bị ăn theo thứ tự (cờ úp)
            $table->unsignedSmallInteger('plies')->default(0);
            $table->timestamps();
            $table->unique(['user_id', 'game_id']);
            $table->index(['user_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_records');
    }
};
