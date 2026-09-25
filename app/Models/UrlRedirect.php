<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UrlRedirect extends Model
{
    protected $fillable = ['from_path', 'to_path'];

    /**
     * Ghi nhận 1 slug đã đổi: $from → $to (path tuyệt đối, VD "/bai-hoc/{slug-cu}").
     * - Không ghi nếu $from === $to (không đổi gì).
     * - Các redirect CŨ đang trỏ tới $from được cập nhật trỏ thẳng tới $to luôn — tránh
     *   redirect chain (A→B→C) khi 1 bài bị đổi slug nhiều lần qua các đợt dọn tên khác nhau.
     */
    public static function record(string $from, string $to): void
    {
        if ($from === $to) {
            return;
        }

        static::where('to_path', $from)->update(['to_path' => $to]);

        static::updateOrCreate(['from_path' => $from], ['to_path' => $to]);

        // Nếu vô tình tạo ra vòng lặp (VD slug quay lại giá trị cũ), xoá cạnh tự trỏ chính nó.
        static::where('from_path', $to)->where('to_path', $to)->delete();
    }

    /** Trả về path đích nếu $from có redirect đã ghi nhận, ngược lại null. */
    public static function lookup(string $from): ?string
    {
        return static::where('from_path', $from)->value('to_path');
    }
}
