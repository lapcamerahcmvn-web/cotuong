<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// BẢNG NỘI BỘ — không có route/API public. Chỉ admin (không phải role bien_tap) truy cập.
class SourceAsset extends Model
{
    protected $fillable = [
        'type', 'external_ref', 'original_filename', 'file_hash',
        'verified_authorship', 'title_raw', 'raw_transcript',
        'decoded_moves_json', 'decode_version', 'processed', 'linked_lesson_id',
    ];

    protected $casts = [
        'processed' => 'boolean',
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class, 'linked_lesson_id');
    }

    public function decodedMoves(): ?array
    {
        return $this->decoded_moves_json ? json_decode($this->decoded_moves_json, true) : null;
    }
}
