<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Gamification: XP (sổ cái), level, chuỗi ngày, hoạt động theo ngày, huy hiệu.
// Cột trên users là bản tổng hợp (denormalized) để header đọc rẻ — nguồn sự thật là xp_transactions.
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedInteger('xp_total')->default(0);
            $table->unsignedSmallInteger('level')->default(1);
            $table->unsignedSmallInteger('streak_current')->default(0);
            $table->unsignedSmallInteger('streak_best')->default(0);
            $table->date('streak_last_date')->nullable();
            $table->unsignedTinyInteger('streak_freezes')->default(0);
            $table->unsignedSmallInteger('daily_goal_xp')->default(50);
            $table->boolean('leaderboard_opt_out')->default(false);
            $table->string('onboarding_level', 20)->nullable();
            $table->unsignedSmallInteger('puzzle_rating')->default(1200);
            $table->unsignedInteger('puzzle_games')->default(0);
            $table->unsignedSmallInteger('rush_best')->default(0);
            $table->unsignedSmallInteger('survival_best')->default(0);
        });

        Schema::create('xp_transactions', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('amount');
            $table->string('reason', 40);
            $table->string('subject_type', 40)->nullable();
            $table->unsignedBigInteger('subject_id')->nullable();
            $table->string('idem_key', 120);
            $table->date('local_date');
            $table->timestamp('created_at')->nullable();
            $table->unique(['user_id', 'idem_key']);
            $table->index(['local_date', 'user_id']);
        });

        Schema::create('user_daily_activity', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->unsignedInteger('xp')->default(0);
            $table->unsignedSmallInteger('lessons')->default(0);
            $table->unsignedSmallInteger('puzzles')->default(0);
            $table->unique(['user_id', 'date']);
            $table->index(['date', 'xp']);
        });

        Schema::create('user_achievements', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('key', 60);
            $table->timestamp('unlocked_at');
            $table->unique(['user_id', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_achievements');
        Schema::dropIfExists('user_daily_activity');
        Schema::dropIfExists('xp_transactions');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'xp_total', 'level', 'streak_current', 'streak_best', 'streak_last_date', 'streak_freezes',
                'daily_goal_xp', 'leaderboard_opt_out', 'onboarding_level', 'puzzle_rating', 'puzzle_games',
                'rush_best', 'survival_best',
            ]);
        });
    }
};
