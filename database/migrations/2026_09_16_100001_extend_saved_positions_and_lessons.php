<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Nâng "Thư viện của tôi" từ lưu 1 thế cờ tĩnh → soạn được nước đi + nhánh (như bàn cờ thật):
// - saved_positions: thêm steps_json/variation_tree (giống dữ liệu bài học, nhưng lưu thẳng JSON
//   thay vì bảng lesson_steps riêng — khối lượng nhỏ, không cần quan hệ riêng).
// - lessons: thêm submitted_by_user_id — đánh dấu bài do người dùng "Gửi cho Admin duyệt" từ
//   thư viện (null = Admin tự soạn, như từ trước tới giờ).
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('saved_positions', function (Blueprint $table) {
            $table->json('steps_json')->nullable()->after('fen');
            $table->json('variation_tree')->nullable()->after('steps_json');
        });

        Schema::table('lessons', function (Blueprint $table) {
            $table->foreignId('submitted_by_user_id')->nullable()->after('id')
                ->constrained('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->dropConstrainedForeignId('submitted_by_user_id');
        });
        Schema::table('saved_positions', function (Blueprint $table) {
            $table->dropColumn(['steps_json', 'variation_tree']);
        });
    }
};
