<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Cờ úp cho ván đấu bạn: `secret` giữ danh tính quân úp (CHỈ server biết, không bao giờ gửi về client),
// `reveals` ghi quân lật ra ở từng nước (để dựng biên bản), `captured` các quân đã bị ăn (lộ mặt).
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->string('variant', 10)->default('co-tuong')->after('code');
            $table->text('secret')->nullable()->after('moves');
            $table->text('reveals')->nullable()->after('secret');
            $table->text('captured')->nullable()->after('reveals');
        });
    }

    public function down(): void
    {
        Schema::table('games', function (Blueprint $table) {
            $table->dropColumn(['variant', 'secret', 'reveals', 'captured']);
        });
    }
};
