<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Ván đấu bạn bè (thách đấu qua link). Đồng bộ bằng polling — `version` tăng mỗi khi ván đổi.
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('games', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('code', 8)->unique();
            $table->foreignId('creator_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('red_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->foreignId('black_user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('status', 10)->default('waiting');   // waiting|playing|finished|aborted
            $table->string('fen', 120);
            $table->text('moves')->nullable();                   // JSON ICCS
            $table->unsignedSmallInteger('time_control')->default(0);   // giây mỗi bên, 0 = không giới hạn
            $table->unsignedInteger('red_ms')->default(0);
            $table->unsignedInteger('black_ms')->default(0);
            $table->timestamp('turn_started_at')->nullable();
            $table->string('result', 4)->nullable();              // do|den|hoa
            $table->string('reason', 40)->nullable();
            $table->string('draw_offer', 3)->nullable();          // do|den
            $table->unsignedInteger('version')->default(1);
            $table->timestamps();
            $table->index(['status', 'updated_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
