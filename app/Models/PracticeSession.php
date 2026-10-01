<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Phiên luyện có giới hạn (60 giây / 3 mạng) — server giữ thứ tự thế cờ, điểm, mạng, hạn giờ.
class PracticeSession extends Model
{
    public $timestamps = false;

    protected $fillable = ['uuid', 'user_id', 'mode', 'puzzle_ids', 'cursor', 'score', 'lives', 'log', 'started_at', 'expires_at', 'finished_at'];

    protected $casts = [
        'puzzle_ids'  => 'array',
        'log'         => 'array',
        'started_at'  => 'datetime',
        'expires_at'  => 'datetime',
        'finished_at' => 'datetime',
    ];

    public function isOver(): bool
    {
        return $this->finished_at !== null
            || ($this->expires_at && now()->greaterThan($this->expires_at->copy()->addSeconds(5)))
            || ($this->mode === 'survival' && $this->lives <= 0);
    }
}
