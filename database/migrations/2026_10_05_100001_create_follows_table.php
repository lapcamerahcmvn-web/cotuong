<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Theo dõi kỳ thủ khác (1 chiều, kiểu Duolingo) — bảng xếp hạng & hoạt động "Bạn bè".
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('follows', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('follower_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('followee_id')->constrained('users')->cascadeOnDelete();
            $table->timestamp('created_at')->nullable();
            $table->unique(['follower_id', 'followee_id']);
            $table->index('followee_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('follows');
    }
};
