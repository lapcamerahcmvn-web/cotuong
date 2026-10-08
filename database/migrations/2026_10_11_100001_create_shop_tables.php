<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Đổi thưởng bằng xu (/doi-thuong). Xu = tổng XP kiếm được − xu đã tiêu (users.xu_spent) — tiêu xu KHÔNG làm giảm XP,
// cấp độ hay thứ hạng. Vật phẩm sở hữu ghi ở user_items (mỗi lần đổi 1 dòng; thẻ giữ chuỗi đổi được nhiều lần).
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedInteger('xu_spent')->default(0)->after('xp_total');
            $table->string('avatar_frame', 30)->nullable()->after('avatar');      // khung ảnh đang dùng (key vật phẩm)
            $table->string('shop_title', 40)->nullable()->after('avatar_frame');  // danh hiệu đang dùng (key vật phẩm)
        });

        Schema::create('user_items', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('item', 40);
            $table->unsignedInteger('price');
            $table->timestamp('created_at')->nullable();
            $table->index(['user_id', 'item']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_items');
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['xu_spent', 'avatar_frame', 'shop_title']);
        });
    }
};
