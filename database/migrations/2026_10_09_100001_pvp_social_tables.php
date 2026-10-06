<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Đấu bạn: xin đi lại (tối đa 3 lần/người/ván), trạng thái online, mời bạn bè vào ván.
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->string('takeback_offer', 4)->nullable();        // do | den: bên đang xin đi lại
            $table->json('takebacks')->nullable();                   // {"do":n,"den":n} số lần đã được đi lại
            $table->unsignedSmallInteger('takeback_block')->nullable(); // bị từ chối ở số nước này → chờ nước mới mới xin lại
        });

        Schema::table('users', function (Blueprint $table) {
            $table->timestamp('last_seen_at')->nullable()->index();
        });

        Schema::create('game_invites', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('from_user_id')->constrained('users')->cascadeOnDelete();
            $table->foreignId('to_user_id')->constrained('users')->cascadeOnDelete();
            $table->string('variant', 16)->default('co-tuong');
            $table->unsignedSmallInteger('time_control')->default(600);
            $table->string('from_side', 8)->default('random');       // do | den | random (bên của người mời)
            $table->string('status', 12)->default('pending');        // pending | accepted | declined | cancelled
            $table->foreignId('game_id')->nullable()->constrained('games')->nullOnDelete();
            $table->boolean('sender_seen')->default(false);           // người mời đã nhận kết quả (đồng ý / từ chối)
            $table->timestamp('responded_at')->nullable();
            $table->timestamps();
            $table->index(['to_user_id', 'status']);
            $table->index(['from_user_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('game_invites');
        Schema::table('users', function (Blueprint $table) {
            $table->dropIndex(['last_seen_at']);
            $table->dropColumn('last_seen_at');
        });
        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn(['takeback_offer', 'takebacks', 'takeback_block']);
        });
    }
};
