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

    /**
     * Thế "tìm nước theo khẩu quyết" (đoạn giữa ván tàn cuộc, không kết thúc bằng chiếu hết) mang nhãn khau-quyet —
     * chỉ dùng ở luyện theo chủ đề tàn cuộc; các chế độ phản xạ chiếu hết (60 giây, 3 mạng, thế hôm nay, kiểm tra) bỏ qua.
     */
    public function scopeMating(Builder $q): Builder
    {
        return $q->where(fn ($w) => $w->whereNull('skill_tags')->orWhere('skill_tags', 'not like', '%"khau-quyet"%'));
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
            'verses'      => $this->verses(),
        ];
    }

    /** Khẩu quyết của bài gốc (chuyên đề Cờ Tàn Có Khẩu Quyết) — hiện kèm thế cờ khi luyện tàn cuộc. */
    public function verses(): array
    {
        if (! $this->lesson || ! str_contains((string) $this->lesson->content, 'Khẩu quyết')) return [];

        return array_slice(\App\Support\Mindmap::lessonInfo($this->lesson->content)['verses'] ?? [], 0, 6);
    }

    public function successRate(): ?int
    {
        return $this->attempts_count >= 5 ? (int) round(100 * $this->solved_count / $this->attempts_count) : null;
    }
}
