<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Phân tích ván bằng máy (lưu lại để khỏi tính lại), link chia sẻ công khai, bên đi trước
// (ván "chơi tiếp với máy từ thế này" có thể bắt đầu bằng lượt Đen).
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('game_records', function (Blueprint $table) {
            $table->string('first_side', 3)->default('do')->after('start_fen');
            $table->longText('analysis')->nullable()->after('plies');
            $table->string('share_token', 24)->nullable()->unique()->after('analysis');
        });
    }

    public function down(): void
    {
        Schema::table('game_records', function (Blueprint $table) {
            $table->dropUnique(['share_token']);
            $table->dropColumn(['first_side', 'analysis', 'share_token']);
        });
    }
};
