<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Đánh dấu bài học là bài tập giải đố: null = bài học thường (chỉ xem/biến), 'do'/'den' = bên
// người dùng cần tự giải (đối phương do máy tự đáp theo steps/variation_tree có sẵn).
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->string('puzzle_side')->nullable()->after('variation_tree');
        });
    }

    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->dropColumn('puzzle_side');
        });
    }
};
