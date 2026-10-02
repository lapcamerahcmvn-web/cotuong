<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PuzzleAuditMark extends Model
{
    public const STATUSES = ['fixed' => 'Đã sửa bài', 'keep' => 'Giữ nguyên'];

    protected $fillable = ['lesson_id', 'ply', 'status', 'note', 'user_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
