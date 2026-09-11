<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'slug', 'title', 'h1', 'lede', 'body_html',
        'seo_title', 'seo_description', 'og_image', 'faq',
    ];

    protected $casts = [
        'faq' => 'array',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }
}
