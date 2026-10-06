<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

#[Fillable([
    'name', 'email', 'password', 'role', 'google_id', 'avatar', 'last_login_at',
    'daily_goal_xp', 'leaderboard_opt_out', 'onboarding_level',
])]
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

    public function progress(): HasMany
    {
        return $this->hasMany(LessonProgress::class);
    }

    public function loginEvents(): HasMany
    {
        return $this->hasMany(LoginEvent::class);
    }

    public function gameRecords(): HasMany
    {
        return $this->hasMany(GameRecord::class);
    }

    public function accessLogs(): HasMany
    {
        return $this->hasMany(AccessLog::class);
    }

    // "Thư viện" thế cờ cá nhân — xem SavedPosition.
    public function library(): HasMany
    {
        return $this->hasMany(SavedPosition::class);
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
                if ($n) {
                    return $n;
                }
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
            'streak_last_date' => 'date',
            'leaderboard_opt_out' => 'boolean',
            'banned_at' => 'datetime',
        ];
    }

    /** Người mình theo dõi. */
    public function following(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'follows', 'follower_id', 'followee_id')->withPivot('created_at');
    }

    public function followers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'follows', 'followee_id', 'follower_id')->withPivot('created_at');
    }

    /** Hồ sơ công khai được xem không (người chọn ẩn khỏi xếp hạng = hồ sơ riêng tư). */
    public function isPublic(): bool
    {
        return ! $this->leaderboard_opt_out;
    }

    public function profileUrl(): string
    {
        return self::profileUrlFor($this->id, $this->name);
    }

    public static function profileUrlFor(int $id, ?string $name): string
    {
        return route('profile.show', $id . '-' . (\Illuminate\Support\Str::slug((string) $name) ?: 'ky-thu'));
    }

    public function achievements(): HasMany
    {
        return $this->hasMany(UserAchievement::class);
    }

    public function dailyActivity(): HasMany
    {
        return $this->hasMany(UserDailyActivity::class);
    }

    public function puzzleAttempts(): HasMany
    {
        return $this->hasMany(PuzzleAttempt::class);
    }

    public function levelTitle(): string
    {
        return \App\Services\Gamification\LevelService::title($this->level ?: 1);
    }

    /** Chuỗi ngày đang "sống" (đã học hôm nay hoặc hôm qua) — đứt chuỗi tính lười khi đọc, không cần cron. */
    public function liveStreak(): int
    {
        return app(\App\Services\Gamification\StreakService::class)->current($this);
    }
}
