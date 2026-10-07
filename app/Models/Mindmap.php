<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

// Sơ đồ tư duy soạn trong Admin. `outline` = dàn ý chữ (xem App\Support\Mindmap::parseOutline).
class Mindmap extends Model
{
    protected $fillable = ['slug', 'title', 'description', 'outline'];

    public function tree(): array
    {
        return \App\Support\Mindmap::parseOutline((string) $this->outline);
    }

    public function shortcode(): string
    {
        return '[so-do-tu-duy slug="' . $this->slug . '"]';
    }
}
