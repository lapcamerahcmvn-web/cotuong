<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AiGenerationLog extends Model
{
    protected $fillable = [
        'type', 'reference_id', 'reference_type', 'prompt', 'result',
        'model', 'tokens_used', 'status', 'error_message', 'created_by',
    ];
}
