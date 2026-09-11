<?php

/**
 * Sinh favicon + app icon + ảnh OG tĩnh (giai đoạn + trang chủ) cho hoccotuong.top.
 *
 * CHỈ CHẠY Ở LOCAL (dùng font hệ thống Windows). Kết quả là file PNG/ICO/SVG tĩnh
 * commit vào public/ — hosting không cần chạy lại.
 *
 *   php tools/brand-assets/generate.php
 *
 * Bản sắc: chu sa (#c8451f) · giấy dó (#f4efe4) · gỗ bàn cờ (#e9cf9c) · mực (#211d17).
 */
error_reporting(E_ALL & ~E_DEPRECATED);

$PUB = dirname(__DIR__, 2).'/public';
$OG = $PUB.'/og';
@mkdir($OG, 0755, true);

// Font hệ thống (Windows). Đổi đường dẫn nếu chạy máy khác.
$FONT_SANS = 'C:/Windows/Fonts/segoeui.ttf';
$FONT_BOLD = 'C:/Windows/Fonts/segoeuib.ttf';
$FONT_KAI = 'C:/Windows/Fonts/simkai.ttf';   // 車 (KaiTi)
foreach (['sans' => $FONT_SANS, 'bold' => $FONT_BOLD, 'kai' => $FONT_KAI] as $k => $f) {
    if (! is_file($f)) {
        fwrite(STDERR, "Thiếu font [$k]: $f\n");
        exit(1);
    }
}

// ---- tiện ích màu / vẽ -------------------------------------------------------

function hex($img, string $h): int
{
    $h = ltrim($h, '#');

    return imagecolorallocate($img, hexdec(substr($h, 0, 2)), hexdec(substr($h, 2, 2)), hexdec(substr($h, 4, 2)));
}

function lerp(array $a, array $b, float $t): array
{
    return [
        (int) round($a[0] + ($b[0] - $a[0]) * $t),
        (int) round($a[1] + ($b[1] - $a[1]) * $t),
        (int) round($a[2] + ($b[2] - $a[2]) * $t),
    ];
}

/** Nền dốc màu dọc. */
function gradientFill($img, int $w, int $h, array $top, array $bottom): void
{
    for ($y = 0; $y < $h; $y++) {
        [$r, $g, $b] = lerp($top, $bottom, $y / max(1, $h - 1));
        $c = imagecolorallocate($img, $r, $g, $b);
        imageline($img, 0, $y, $w, $y, $c);
    }
}

/** Quân cờ tướng: đĩa kem + 2 vành + chữ (mặc định 車). */
function drawPiece($img, float $cx, float $cy, float $r, string $glyph, string $ink, string $fontKai): void
{
    $disc = hex($img, 'f6ecd6');
    $ring = hex($img, $ink);
    imagefilledellipse($img, (int) $cx, (int) $cy, (int) ($r * 2), (int) ($r * 2), $disc);
    imagesetthickness($img, max(2, (int) ($r * 0.06)));
    imageellipse($img, (int) $cx, (int) $cy, (int) ($r * 2), (int) ($r * 2), $ring);
    imageellipse($img, (int) $cx, (int) $cy, (int) ($r * 1.62), (int) ($r * 1.62), imagecolorallocatealpha($img, 44, 33, 27, 95));
    imagesetthickness($img, 1);
    if ($glyph !== '') {
        $size = $r * 1.15;
        $bb = imagettfbbox($size, 0, $fontKai, $glyph);
        $gw = $bb[2] - $bb[0];
        $gh = $bb[1] - $bb[7];
        imagettftext($img, $size, 0, (int) ($cx - $gw / 2 - $bb[0]), (int) ($cy + $gh / 2 - ($bb[1])), $ring, $fontKai, $glyph);
    }
}

function textLine($img, float $size, float $x, float $y, string $text, string $colorHex, string $font, string $anchor = 'left'): array
{
    $c = hex($img, $colorHex);
    $bb = imagettfbbox($size, 0, $font, $text);
    $w = $bb[2] - $bb[0];
    if ($anchor === 'center') {
        $x -= $w / 2;
    } elseif ($anchor === 'right') {
        $x -= $w;
    }
    imagettftext($img, $size, 0, (int) ($x - $bb[0]), (int) $y, $c, $font, $text);

    return [$w, $bb[1] - $bb[7]];
}

/** Bọc chữ theo chiều rộng tối đa (px). */
function wrap(string $text, float $size, string $font, float $maxW): array
{
    $words = preg_split('/\s+/', trim($text));
    $lines = [];
    $cur = '';
    foreach ($words as $word) {
        $try = $cur === '' ? $word : "$cur $word";
        $bb = imagettfbbox($size, 0, $font, $try);
        if (($bb[2] - $bb[0]) > $maxW && $cur !== '') {
            $lines[] = $cur;
            $cur = $word;
        } else {
            $cur = $try;
        }
    }
    if ($cur !== '') {
        $lines[] = $cur;
    }

    return $lines;
}

// ---- APP ICON (full-bleed vuông, maskable) ---------------------------------

function makeIcon(int $size, string $out, string $fontKai): void
{
    $img = imagecreatetruecolor($size, $size);
    imageantialias($img, true);
    gradientFill($img, $size, $size, [200, 69, 31], [224, 138, 46]); // chu sa → amber
    drawPiece($img, $size / 2, $size / 2, $size * 0.33, '車', '9a3416', $fontKai);
    imagepng($img, $out);
    echo "  $out\n";
}

// ---- FAVICON .ico (nhúng PNG 32px — hỗ trợ mọi trình duyệt hiện đại) --------

function makeFaviconIco(string $out, string $fontKai): void
{
    $s = 32;
    $img = imagecreatetruecolor($s, $s);
    imageantialias($img, true);
    gradientFill($img, $s, $s, [200, 69, 31], [224, 138, 46]);
    drawPiece($img, $s / 2, $s / 2, $s * 0.34, '車', '9a3416', $fontKai);
    ob_start();
    imagepng($img);
    $png = ob_get_clean();

    // ICONDIR (6) + ICONDIRENTRY (16) + PNG
    $ico = pack('vvv', 0, 1, 1)
        .pack('CCCCvvVV', $s, $s, 0, 0, 1, 32, strlen($png), 22)
        .$png;
    file_put_contents($out, $ico);
    echo "  $out\n";
}

// ---- FAVICON .svg (chữ 車 để trình duyệt tự render) ------------------------

function makeFaviconSvg(string $out): void
{
    $svg = <<<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#c8451f"/><stop offset="1" stop-color="#e08a2e"/>
  </linearGradient></defs>
  <rect width="64" height="64" rx="14" fill="url(#g)"/>
  <circle cx="32" cy="32" r="21" fill="#f6ecd6" stroke="#9a3416" stroke-width="2.4"/>
  <circle cx="32" cy="32" r="17" fill="none" stroke="#9a3416" stroke-width="1" opacity=".35"/>
  <text x="32" y="41" text-anchor="middle" font-family="KaiTi,STKaiti,'Noto Serif TC',serif"
        font-size="26" fill="#9a3416">車</text>
</svg>
SVG;
    file_put_contents($out, $svg);
    echo "  $out\n";
}

// ---- ẢNH OG 1200×630 ------------------------------------------------------

function makeOg(string $out, string $title, string $subtitle, string $fontSans, string $fontBold, string $fontKai): void
{
    $W = 1200;
    $H = 630;
    $img = imagecreatetruecolor($W, $H);
    imageantialias($img, true);

    // nền giấy dó
    imagefilledrectangle($img, 0, 0, $W, $H, hex($img, 'f4efe4'));
    // dải gỗ bàn cờ bên trái + lưới mờ
    imagefilledrectangle($img, 0, 0, 470, $H, hex($img, 'e9cf9c'));
    imagefilledrectangle($img, 470, 0, 476, $H, hex($img, 'dcb97e'));
    $grid = imagecolorallocatealpha($img, 124, 90, 44, 88);
    for ($i = 0; $i <= 8; $i++) {
        $x = 60 + $i * 44;
        imageline($img, $x, 70, $x, $H - 70, $grid);
    }
    for ($j = 0; $j <= 9; $j++) {
        $y = 70 + $j * ((int) (($H - 140) / 9));
        imageline($img, 60, $y, 60 + 8 * 44, $y, $grid);
    }
    drawPiece($img, 258, $H / 2 - 20, 66, '車', 'c0392b', $fontKai);
    drawPiece($img, 258, $H / 2 + 130, 66, '將', '24333f', $fontKai);

    // cột phải: brand + tiêu đề + chân
    $x = 540;
    textLine($img, 21, $x, 118, 'HỌC CỜ TƯỚNG', 'c8451f', $fontBold);
    // gạch dưới brand
    imagefilledrectangle($img, $x, 132, $x + 54, 135, hex($img, 'c8451f'));

    $lines = wrap($title, 46, $fontBold, $W - $x - 70);
    $y = 210;
    foreach ($lines as $ln) {
        textLine($img, 46, $x, $y, $ln, '211d17', $fontBold);
        $y += 66;
    }

    $y += 6;
    foreach (wrap($subtitle, 24, $fontSans, $W - $x - 70) as $ln) {
        textLine($img, 24, $x, $y, $ln, '5c5446', $fontSans);
        $y += 38;
    }

    textLine($img, 20, $x, $H - 54, 'hoccotuong.top', '9c9384', $fontSans);

    imagepng($img, $out);
    echo "  $out\n";
}

// ---- chạy ----------------------------------------------------------------

echo "App icons:\n";
makeIcon(512, "$PUB/icon-512.png", $FONT_KAI);
makeIcon(192, "$PUB/icon-192.png", $FONT_KAI);
makeIcon(180, "$PUB/apple-touch-icon.png", $FONT_KAI);

echo "Favicon:\n";
makeFaviconIco("$PUB/favicon.ico", $FONT_KAI);
makeFaviconSvg("$PUB/favicon.svg");

echo "OG (giai đoạn + trang chủ):\n";
$OGS = [
    'home' => ['Học cờ tướng qua bàn cờ tương tác', 'Khai cuộc · Trung cuộc · Tàn cuộc · Cờ úp — diễn giải từng nước đi'],
    'phase-nhap-mon' => ['Nhập môn cờ tướng', 'Luật chơi và cách đi từng quân cho người mới bắt đầu'],
    'phase-khai-cuoc' => ['Khai cuộc cờ tướng', 'Nguyên lý bố trí quân và các thế trận phổ biến'],
    'phase-trung-cuoc' => ['Trung cuộc cờ tướng', 'Sát pháp và chiến thuật phối hợp tấn công'],
    'phase-tan-cuoc' => ['Tàn cuộc cờ tướng', 'Kỹ thuật thắng thế cờ ít quân'],
    'phase-co-up' => ['Cờ úp', 'Luật chơi, chiến thuật lật quân và bài học có bàn cờ'],
];
foreach ($OGS as $slug => [$t, $s]) {
    makeOg("$OG/$slug.png", $t, $s, $FONT_SANS, $FONT_BOLD, $FONT_KAI);
}

echo "Xong.\n";
