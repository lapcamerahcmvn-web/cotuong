<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

// Sổ cái XP — mỗi lần cộng/trừ là 1 dòng, idem_key chống cộng trùng (unique theo user).
class XpTransaction extends Model
{
    public const UPDATED_AT = null;

    protected $fillable = ['user_id', 'amount', 'reason', 'subject_type', 'subject_id', 'idem_key', 'local_date'];


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
