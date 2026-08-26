<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Cây biến (variation tree) do trình soạn bàn cờ tạo: mỗi nước có thể có nhiều nhánh (2A, 2B...).
// lesson_steps vẫn giữ MẠCH CHÍNH (tuyến tính) cho trình chơi hiện tại; cây đầy đủ lưu ở đây
// để Agent soạn bài phong phú hơn + về sau render biến trên trang bài học.
return new class extends Migration {
    public function up(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->longText('variation_tree')->nullable()->after('initial_fen');
        });
    }

    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->dropColumn('variation_tree');
        });
    }
};
