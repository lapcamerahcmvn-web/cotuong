<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

// BẢNG NỘI BỘ — nguồn tài liệu gốc (.xqf/.pgn/video/pdf) có bản quyền. KHÔNG expose qua route
// public / API / sitemap. `verified_authorship='unknown'` chặn cứng xử lý tới khi xác minh.
return new class extends Migration {
    public function up(): void
    {
        Schema::create('source_assets', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->id();
            $table->string('type');                              // xqf|pgn|video_local|pdf|cbl|cbr|ccw|cbs
            $table->string('external_ref', 500);                 // path tương đối trong storage private
            $table->string('original_filename', 300)->nullable();
            $table->string('file_hash', 64)->nullable()->index();
            $table->string('verified_authorship')->default('unknown'); // unknown|author_original|bundled_software_default|collected_database
            $table->string('title_raw')->nullable();
            $table->longText('raw_transcript')->nullable();      // video Whisper / OCR PDF
            $table->longText('decoded_moves_json')->nullable();  // snapshot moves+FEN từ decoder
            $table->string('decode_version')->nullable();        // version byte hex, vd 0x0a
            $table->boolean('processed')->default(false);
            $table->foreignId('linked_lesson_id')->nullable()->constrained('lessons')->nullOnDelete();
            $table->timestamps();

            $table->index(['type', 'processed']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('source_assets');
    }
};
