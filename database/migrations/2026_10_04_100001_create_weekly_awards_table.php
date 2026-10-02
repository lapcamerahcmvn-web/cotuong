<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Giải thưởng bảng xếp hạng XP tuần (top 10). Thử thách tuần không cần bảng riêng — đã nhận hay chưa
// suy từ sổ cái xp_transactions (idem_key "weekly:{tuần}:{nhiệm vụ}").
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('weekly_awards', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->date('week_start');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->unsignedTinyInteger('rank');
            $table->unsignedInteger('score');
            $table->unsignedInteger('xp')->default(0);
            $table->timestamp('seen_at')->nullable();
            $table->timestamps();
            $table->unique(['week_start', 'user_id']);
            $table->index(['user_id', 'week_start']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('weekly_awards');
    }
};
