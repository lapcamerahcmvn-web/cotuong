<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// Trang nội dung biên tập (không phải bài học): intro giai đoạn, trang tĩnh…
// Nạp từ database/seeders/data/pages.json qua PagesSeeder (giống ContentSeeder).
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->engine = 'InnoDB'; // WAMP local mặc định MyISAM — xem AppServiceProvider.
            $table->id();
            $table->string('slug')->unique();      // quy ước: "phase:khai-cuoc", "about", …
            $table->string('title')->nullable();   // <title> SEO
            $table->string('h1')->nullable();
            $table->text('lede')->nullable();      // câu mở đầu / meta description nguồn
            $table->longText('body_html')->nullable();
            $table->string('seo_title')->nullable();
            $table->text('seo_description')->nullable();
            $table->string('og_image')->nullable();
            $table->json('faq')->nullable();       // [{q, a}, …] → FAQPage schema + accordion
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pages');
    }
};
