<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// Thế cờ luyện tập — dựng từ bài học bằng `php artisan cotuong:build-puzzles`.
class Puzzle extends Model
{
    protected $fillable = [
        'lesson_id', 'start_ply', 'source', 'title', 'fen', 'side', 'solution', 'alt_finals',
        'solver_moves', 'rating', 'skill_tags', 'phase', 'status', 'attempts_count', 'solved_count',
    ];

    protected $casts = [
        'solution'   => 'array',
        'alt_finals' => 'array',
        'skill_tags' => 'array',
    ];

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }

    public function scopePublished(Builder $q): Builder
    {
        return $q->where('status', 'published');
    }

    public function scopeSkill(Builder $q, string $skill): Builder
    {
        return $q->where('skill_tags', 'like', '%"' . $skill . '"%');
    }

    /** Dữ liệu gửi cho bàn cờ client (lời giải gửi kèm để phản hồi tức thì; XP vẫn do server xác thực). */
    public function toBoardPayload(): array
    {
        return [
            'id'          => $this->id,
            'fen'         => $this->fen,
            'side'        => $this->side,
            'solution'    => $this->solution,
            'altFinals'   => $this->alt_finals ?: [],
            'rating'      => $this->rating,
            'solverMoves' => $this->solver_moves,
            'title'       => $this->title,
            'lessonUrl'   => $this->lesson ? route('lessons.show', $this->lesson->slug) : null,
        ];
    }

    public function successRate(): ?int
    {
        return $this->attempts_count >= 5 ? (int) round(100 * $this->solved_count / $this->attempts_count) : null;
    }
}
