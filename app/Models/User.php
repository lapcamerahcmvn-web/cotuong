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
        return $this->progress()->where('status', 'completed')->count();
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
