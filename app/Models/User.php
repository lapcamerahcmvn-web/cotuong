<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable(['name', 'email', 'password', 'role', 'google_id', 'avatar', 'last_login_at'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable;

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    // Nhân sự được vào khu quản trị (admin đầy đủ + biên tập viên). Học viên (hoc_vien) KHÔNG.
    public function isStaff(): bool
    {
        return in_array($this->role, ['admin', 'bien_tap'], true);
    }

    public function progress(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(LessonProgress::class);
    }

    public function accessLogs(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(AccessLog::class);
    }

    public function completedCount(): int
    {
        return count($this->completedLessonIds());
    }

    protected ?array $_completedIds = null;
    protected ?array $_completedBySeries = null;

    /** ID các bài đã học (completed) — memoize trong 1 request. */
    public function completedLessonIds(): array
    {
        return $this->_completedIds ??= $this->progress()
            ->where('status', 'completed')->pluck('lesson_id')->all();
    }

    /** Số bài đã học theo từng chuỗi: [series_id => số bài]. */
    public function completedCountBySeries(): array
    {
        return $this->_completedBySeries ??= LessonProgress::query()
            ->where('lesson_progress.user_id', $this->id)
            ->where('lesson_progress.status', 'completed')
            ->join('lessons', 'lessons.id', '=', 'lesson_progress.lesson_id')
            ->whereNotNull('lessons.series_id')
            ->groupBy('lessons.series_id')
            ->selectRaw('lessons.series_id as sid, count(*) as c')
            ->pluck('c', 'sid')->all();
    }

    /** Gợi ý bài học tiếp theo: tiếp tục chuỗi đang học dở → nếu không thì bài chưa học đầu tiên (ưu tiên Nhập môn). */
    public function nextLesson(): ?Lesson
    {
        $done = $this->completedLessonIds();
        $recent = $this->progress()->latest('updated_at')->first();
        if ($recent) {
            $recentLesson = Lesson::find($recent->lesson_id);
            if ($recentLesson && $recentLesson->series_id) {
                $n = Lesson::published()->where('series_id', $recentLesson->series_id)
                    ->whereNotIn('id', $done)->orderBy('order_in_series')->orderBy('id')->first();
                if ($n) return $n;
            }
        }
        return Lesson::published()->where('phase', 'nhap-mon')->whereNotIn('id', $done)
                ->orderBy('order_in_series')->orderBy('id')->first()
            ?? Lesson::published()->whereNotIn('id', $done)->orderBy('id')->first();
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
