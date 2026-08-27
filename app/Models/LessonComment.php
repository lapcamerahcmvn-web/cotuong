<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class LessonComment extends Model
{
    protected $fillable = ['lesson_id', 'user_id', 'parent_id', 'body', 'approved', 'likes_count'];

    protected $casts = ['approved' => 'boolean'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }

    // Bình luận cha (khi đây là câu trả lời). Admin eager-load để hiển thị ngữ cảnh.
    public function parent(): BelongsTo
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    // Trả lời (1 cấp) đã duyệt — sắp cũ → mới. (Admin dùng query riêng để xem cả chưa duyệt.)
    public function replies(): HasMany
    {
        return $this->hasMany(self::class, 'parent_id')->where('approved', true)->with('user')->oldest();
    }
}
