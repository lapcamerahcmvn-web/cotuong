<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Sơ đồ tư duy soạn trong Admin (dàn ý chữ → cây). Nhúng vào bài viết bằng [so-do-tu-duy slug="…"].
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('mindmaps', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('slug', 191)->unique();
            $table->string('title', 191);
            $table->string('description', 500)->nullable();
            $table->mediumText('outline');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mindmaps');
    }
};
