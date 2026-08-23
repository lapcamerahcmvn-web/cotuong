<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Chuỗi bài học = 1 cụm giáo trình có sẵn (VD "48 Bài Nguyên Lý Khai Cuộc", "Đội Hình Xe
// Song Pháo"). Mỗi series là 1 "Course" cho schema.org + đơn vị theo dõi tiến độ trong admin.
return new class extends Migration {
    public function up(): void
    {
        Schema::create('lesson_series', function (Blueprint $table) {
            $table->engine = 'InnoDB'; // WAMP local mặc định MyISAM — bắt buộc khai báo rõ.
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('game_mode')->default('co-tuong');   // co-tuong | co-up
            $table->string('phase')->nullable();                 // nhap-mon|khai-cuoc|trung-cuoc|tan-cuoc
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('planned_total')->nullable();
            $table->unsignedSmallInteger('sort_order')->default(0);
            $table->string('source_folder_ref')->nullable();     // NỘI BỘ — truy vết, không public
            $table->timestamps();

            $table->index(['game_mode', 'phase']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_series');
    }
};
