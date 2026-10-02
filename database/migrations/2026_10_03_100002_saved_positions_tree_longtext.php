<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Cây biến lồng 2 tầng JSON mỗi nước → cột kiểu JSON của MySQL (giới hạn sâu 100) từ chối ván > ~49 nước.
// Đổi sang longText như lessons.variation_tree; model vẫn cast 'array' nên không đổi gì ở code đọc/ghi.
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('saved_positions', function (Blueprint $table) {
            $table->longText('variation_tree')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('saved_positions', function (Blueprint $table) {
            $table->json('variation_tree')->nullable()->change();
        });
    }
};
