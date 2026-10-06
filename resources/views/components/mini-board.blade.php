@props(['fen', 'size' => 84])
@php
    // Bàn cờ thu nhỏ vẽ thẳng từ FEN (SVG inline, cùng kiểu ảnh thumb trong tools/og-image) — không cần ảnh sinh sẵn.
    $names = ['K' => '帥', 'A' => '仕', 'B' => '相', 'N' => '傌', 'R' => '俥', 'C' => '炮', 'P' => '兵',
              'k' => '將', 'a' => '士', 'b' => '象', 'n' => '馬', 'r' => '車', 'c' => '砲', 'p' => '卒'];
    $cell = 10; $pad = 7;
    $w = $cell * 8 + $pad * 2; $h = $cell * 9 + $pad * 2;
    $pieces = [];
    foreach (explode('/', explode(' ', trim($fen))[0]) as $row => $line) {
        $col = 0;
        foreach (str_split($line) as $ch) {
            if (ctype_digit($ch)) { $col += (int) $ch; continue; }
            if (isset($names[$ch]) && $row < 10 && $col < 9) $pieces[] = [$col, $row, $ch];
            $col++;
        }
    }
    $x = fn ($c) => $pad + $c * $cell;
    $y = fn ($r) => $pad + $r * $cell;
@endphp
<svg {{ $attributes->merge(['class' => 'mini-board']) }} viewBox="0 0 {{ $w }} {{ $h }}" width="{{ $size }}" height="{{ round($size * $h / $w) }}" role="img" aria-label="Thế cờ của bài">
    <rect width="{{ $w }}" height="{{ $h }}" rx="3" fill="#e9cf9c"/>
    <g stroke="#8a6a3c" stroke-width=".5" fill="none">
        <rect x="{{ $pad }}" y="{{ $pad }}" width="{{ $cell * 8 }}" height="{{ $cell * 9 }}"/>
        @for($r = 1; $r < 9; $r++)<line x1="{{ $pad }}" y1="{{ $y($r) }}" x2="{{ $x(8) }}" y2="{{ $y($r) }}"/>@endfor
        @for($c = 1; $c < 8; $c++)<line x1="{{ $x($c) }}" y1="{{ $y(0) }}" x2="{{ $x($c) }}" y2="{{ $y(4) }}"/><line x1="{{ $x($c) }}" y1="{{ $y(5) }}" x2="{{ $x($c) }}" y2="{{ $y(9) }}"/>@endfor
        <path d="M{{ $x(3) }} {{ $y(0) }}L{{ $x(5) }} {{ $y(2) }}M{{ $x(5) }} {{ $y(0) }}L{{ $x(3) }} {{ $y(2) }}M{{ $x(3) }} {{ $y(7) }}L{{ $x(5) }} {{ $y(9) }}M{{ $x(5) }} {{ $y(7) }}L{{ $x(3) }} {{ $y(9) }}"/>
    </g>
    @foreach($pieces as [$c, $r, $ch])
        @php $red = ctype_upper($ch); @endphp
        <circle cx="{{ $x($c) }}" cy="{{ $y($r) }}" r="4.4" fill="#fbf3e2" stroke="{{ $red ? '#c0392b' : '#2b2b2b' }}" stroke-width=".7"/>
        <text x="{{ $x($c) }}" y="{{ $y($r) + 2 }}" font-size="5.4" text-anchor="middle" fill="{{ $red ? '#c0392b' : '#2b2b2b' }}" font-weight="700">{{ $names[$ch] }}</text>
    @endforeach
</svg>
