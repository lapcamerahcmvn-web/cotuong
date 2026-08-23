<?php

// Cấu hình laravel/ai. Mặc định provider = anthropic (Claude) cho dự án này.
return [

    'default'                    => env('AI_DEFAULT_PROVIDER', 'anthropic'),
    'default_for_images'         => 'anthropic',
    'default_for_audio'          => 'openai',
    'default_for_transcription'  => 'openai',
    'default_for_embeddings'     => 'openai',
    'default_for_reranking'      => 'cohere',

    'caching' => [
        'embeddings' => [
            'cache' => false,
            'store' => env('CACHE_STORE', 'database'),
        ],
    ],

    'providers' => [
        'anthropic' => [
            'driver' => 'anthropic',
            'key'    => env('ANTHROPIC_API_KEY'),
            'url'    => env('ANTHROPIC_URL', 'https://api.anthropic.com/v1'),
        ],

        'openai' => [
            'driver' => 'openai',
            'key'    => env('OPENAI_API_KEY'),
            'url'    => env('OPENAI_URL', 'https://api.openai.com/v1'),
        ],

        'gemini' => [
            'driver' => 'gemini',
            'key'    => env('GEMINI_API_KEY'),
        ],

        'ollama' => [
            'driver' => 'ollama',
            'key'    => env('OLLAMA_API_KEY', ''),
            'url'    => env('OLLAMA_URL', 'http://localhost:11434'),
        ],
    ],

];
