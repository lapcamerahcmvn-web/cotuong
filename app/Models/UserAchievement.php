<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserAchievement extends Model
{
    public $timestamps = false;

    protected $fillable = ['user_id', 'key', 'unlocked_at'];

    protected $casts = ['unlocked_at' => 'datetime'];

    public function definition(): ?array
    {
        return config('achievements.' . $this->key);
    }
}
