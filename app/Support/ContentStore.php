<?php

namespace App\Support;

/**
 * Kho nội dung bài học ship theo git (đọc bởi ContentSeeder, ghi bởi cotuong:export-content và tools/*.cjs).
 *
 * Định dạng tách file (từ 10/2026 — 1 file content.json đã vượt 75MB, sát giới hạn 100MB của GitHub):
 *   database/seeders/data/content/series.json       {"exported_at": ..., "series": [...]}
 *   database/seeders/data/content/<series_slug>.json [bài học...]   (bài không thuộc chuyên đề: _khong-chuyen-de.json)
 * Vẫn đọc được file cũ database/seeders/data/content.json nếu thư mục mới chưa có.
 * Bản Node tương ứng: tools/trung-cuoc-bao-dien/content-io.cjs — giữ hai bên cùng quy ước.
 */
class ContentStore
{
    public const NO_SERIES = '_khong-chuyen-de';

    public static function dir(): string
    {
        return base_path('database/seeders/data/content');
    }

    public static function legacyFile(): string
    {
        return base_path('database/seeders/data/content.json');
    }

    public static function exists(): bool
    {
        return is_file(self::dir().'/series.json') || is_file(self::legacyFile());
    }

    /** Danh sách chuyên đề + exported_at (nhẹ, không nạp bài). */
    public static function seriesFile(): ?array
    {
        $f = self::dir().'/series.json';
        if (is_file($f)) return json_decode(file_get_contents($f), true);
        if (is_file(self::legacyFile())) {
            $d = json_decode(file_get_contents(self::legacyFile()), true);

            return ['exported_at' => $d['exported_at'] ?? null, 'series' => $d['series'] ?? []];
        }

        return null;
    }

    /**
     * Duyệt bài theo từng file (đỡ tốn bộ nhớ): yield mảng bài của mỗi file.
     *
     * @return \Generator<int, array>
     */
    public static function lessonChunks(): \Generator
    {
        if (is_file(self::dir().'/series.json')) {
            foreach (glob(self::dir().'/*.json') as $f) {
                if (basename($f) === 'series.json') continue;
                $lessons = json_decode(file_get_contents($f), true);
                if (is_array($lessons)) yield $lessons;
            }

            return;
        }
        if (is_file(self::legacyFile())) {
            $d = json_decode(file_get_contents(self::legacyFile()), true);
            yield $d['lessons'] ?? [];
        }
    }

    /** Ghi toàn bộ (series + lessons) theo định dạng tách file; xoá file chuyên đề không còn bài. */
    public static function write(array $series, array $lessons, ?string $exportedAt = null): array
    {
        $dir = self::dir();
        @mkdir($dir, 0777, true);
        $flags = JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT;
        file_put_contents($dir.'/series.json', json_encode(['exported_at' => $exportedAt ?? now()->toIso8601String(), 'series' => array_values($series)], $flags));

        $groups = [];
        foreach ($lessons as $l) {
            $groups[($l['series_slug'] ?? null) ?: self::NO_SERIES][] = $l;
        }
        $written = [];
        foreach ($groups as $slug => $list) {
            $name = preg_replace('/[^a-z0-9_-]/', '-', strtolower($slug)).'.json';
            file_put_contents($dir.'/'.$name, json_encode($list, $flags));
            $written[] = $name;
        }
        foreach (glob($dir.'/*.json') as $f) {
            $b = basename($f);
            if ($b !== 'series.json' && ! in_array($b, $written, true)) @unlink($f);
        }

        return $written;
    }
}
