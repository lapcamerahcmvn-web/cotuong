<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Redirect 301 khi slug bài học đổi (VD: cotuong:clean-titles --reslug, OrganizeSeries
        // --reslug, checkbox "reslug" trong admin) — tránh vỡ URL cũ đã được Google index.
        Schema::create('url_redirects', function (Blueprint $table) {
            $table->id();
            $table->engine = 'InnoDB'; // WAMP local mặc định MyISAM — xem AppServiceProvider.
            $table->string('from_path')->unique();
            $table->string('to_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('url_redirects');
    }
};
