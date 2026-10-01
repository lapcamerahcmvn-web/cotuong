<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserDailyActivity extends Model
{
    protected $table = 'user_daily_activity';

    public $timestamps = false;

    protected $fillable = ['user_id', 'date', 'xp', 'lessons', 'puzzles'];

}
