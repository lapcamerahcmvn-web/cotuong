<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Duyệt bình luận: bình luận mới mặc định CHỜ DUYỆT, admin duyệt mới hiện.
        Schema::table('lesson_comments', function (Blueprint $table) {
            $table->boolean('approved')->default(false)->index()->after('body');
        });
        // Bình luận đã có (nếu có) → coi như đã duyệt để không biến mất.
        DB::table('lesson_comments')->update(['approved' => true]);

        // Thống kê truy cập: mỗi lượt xem trang frontend (đã lọc bot) một dòng.
        Schema::create('page_visits', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('path', 255);
            $table->unsignedBigInteger('lesson_id')->nullable();
            $table->string('visitor_hash', 64);
            $table->date('visited_on');
            $table->timestamp('created_at')->nullable();

            $table->index('visited_on');
            $table->index(['visited_on', 'visitor_hash']);
            $table->index('lesson_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('page_visits');
        Schema::table('lesson_comments', fn (Blueprint $t) => $t->dropColumn('approved'));
    }
};
