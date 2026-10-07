<?php

namespace App\Support;

use App\Models\Lesson;
use App\Models\LessonSeries;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

/**
 * Sơ đồ tư duy (mind map) dạng cây cho bài viết / Admin.
 *
 * Nút: ['t' => tiêu đề, 'k' => [khẩu quyết…], 'l' => slug bài học ví dụ, 'note' => ghi chú, 'c' => [con…]]
 * (fen / side / url của bài ví dụ được gắn lúc render).
 *
 * Nguồn cây:
 *  - fromSeries(): tự dựng từ chuyên đề có "Kết quả:" + "Khẩu quyết" trong nội dung bài (VD Cờ Tàn Có Khẩu Quyết)
 *    — luôn khớp bài mới thêm.
 *  - parseOutline(): dàn ý chữ do Admin soạn (bảng mindmaps):
 *        # Nhánh cấp 1
 *        ## Nhánh cấp 2 @slug-bai-hoc-vi-du
 *        - khẩu quyết 1
 *        > ghi chú
 */
class Mindmap
{
    public const RESULTS = ['hoa' => 'Thế hòa', 'thang' => 'Thế thắng', 'kheo' => 'Thế khéo thắng'];

    /** Tên quân tấn công (Đỏ) để nhóm cấp 2, theo thứ tự quân mạnh → yếu. */
    private const PIECES = ['Xe' => 'Xe', 'Mã' => 'Mã', 'Pháo' => 'Pháo', 'Chốt' => 'Chốt'];

    private const WEIGHT = ['Chốt' => 1, 'Mã' => 4, 'Pháo' => 4.5, 'Xe' => 9];

    /** Cây sơ đồ từ chuyên đề theo kết quả (hoa | thang | kheo). Cache theo mốc sửa bài. */
    public static function fromSeries(string $seriesSlug, string $result): array
    {
        $series = LessonSeries::where('slug', $seriesSlug)->first();
        if (! $series) return [];
        $stamp = Lesson::where('series_id', $series->id)->max('updated_at') . '|' . Lesson::where('series_id', $series->id)->count();

        return Cache::remember('mindmap:' . md5($seriesSlug . $result . $stamp), 3600, function () use ($series, $result) {
            $chapters = [];
            $lessons = Lesson::published()->where('series_id', $series->id)->orderBy('order_in_series')->orderBy('id')
                ->get(['id', 'title', 'slug', 'content']);
            foreach ($lessons as $l) {
                $info = self::lessonInfo($l->content);
                if (! $info || $info['result'] !== $result || ! $info['verses']) continue;
                [$chapter, $name] = str_contains($l->title, ' · ') ? explode(' · ', $l->title, 2) : [$series->name, $l->title];
                $group = self::attackerLabel($info['red']);
                $chapters[$chapter][$group['label']]['w'] = $group['w'];
                $chapters[$chapter][$group['label']]['c'][] = ['t' => $name, 'k' => $info['verses'], 'l' => $l->slug];
            }
            $tree = [];
            foreach ($chapters as $ch => $groups) {
                uasort($groups, fn ($a, $b) => $a['w'] <=> $b['w']);
                $kids = [];
                foreach ($groups as $label => $g) $kids[] = ['t' => $label, 'c' => $g['c']];
                $tree[] = ['t' => preg_replace('/^Cờ Tàn\s+/u', 'Tàn ', $ch), 'c' => $kids];
            }

            return $tree;
        });
    }

    /** Kết quả + khẩu quyết + lực lượng Đỏ từ nội dung bài (mẫu sinh bởi tools/co-tan-khau-quyet/gen.cjs). */
    public static function lessonInfo(?string $html): ?array
    {
        if (! $html || ! preg_match('/Kết quả:<\/strong>\s*([^<.—]+)/u', $html, $m)) return null;
        $r = mb_strtolower(trim($m[1]));
        $result = str_contains($r, 'khéo thắng') ? 'kheo' : (str_contains($r, 'thắng') ? 'thang' : (str_contains($r, 'hòa') ? 'hoa' : 'bt'));
        preg_match('/<h2>Khẩu quyết<\/h2>\s*<ul>(.*?)<\/ul>/su', $html, $k);
        preg_match_all('/<li>(.*?)<\/li>/su', $k[1] ?? '', $li);
        preg_match('/<strong>Đỏ:<\/strong>\s*([^.<]+)/u', $html, $red);

        return [
            'result' => $result,
            'verses' => array_values(array_filter(array_map(fn ($x) => trim(html_entity_decode(strip_tags($x), ENT_QUOTES | ENT_HTML5, 'UTF-8')), $li[1]))),
            'red' => trim($red[1] ?? ''),
        ];
    }

    /** "Tướng, 2 Chốt, Sĩ" → ['label' => 'Hai Chốt', 'w' => …]. Chỉ tính quân tấn công (Xe, Mã, Pháo, Chốt). */
    public static function attackerLabel(string $red): array
    {
        $count = [];
        foreach (array_map('trim', explode(',', $red)) as $p) {
            if (preg_match('/^(\d+)\s+(.+)$/u', $p, $m)) [$n, $name] = [(int) $m[1], $m[2]];
            else [$n, $name] = [1, $p];
            if (isset(self::PIECES[$name])) $count[$name] = ($count[$name] ?? 0) + $n;
        }
        if (! $count) return ['label' => 'Khác', 'w' => 999];
        $num = [1 => 'Một', 2 => 'Hai', 3 => 'Ba', 4 => 'Bốn', 5 => 'Năm'];
        $parts = [];
        $w = 0;
        foreach (self::PIECES as $name) {
            if (! isset($count[$name])) continue;
            $n = $count[$name];
            $w += $n * self::WEIGHT[$name];
            if (count($count) === 1) {
                $parts[] = $n === 1 ? (in_array($name, ['Xe', 'Pháo'], true) ? 'Đơn ' : 'Một ') . $name
                    : ($n === 2 && $name !== 'Chốt' ? 'Song ' : $num[$n] . ' ') . $name;
            } else {
                $parts[] = $n === 1 ? $name : ($n === 2 && $name !== 'Chốt' ? 'Song ' : $num[$n] . ' ') . $name;
            }
        }

        return ['label' => implode(' ', $parts), 'w' => $w];
    }

    /** Dàn ý chữ → cây. Dòng trống bỏ qua; "@slug" cuối dòng tiêu đề = bài ví dụ. */
    public static function parseOutline(string $text): array
    {
        // 1) Danh sách phẳng [cấp, nút]; dòng "-" / ">" gắn vào tiêu đề gần nhất phía trên.
        $flat = [];
        foreach (preg_split('/\R/u', $text) as $raw) {
            $line = trim($raw);
            if ($line === '') continue;
            if (preg_match('/^(#{1,6})\s+(.+)$/u', $line, $m)) {
                $title = trim($m[2]);
                $node = ['t' => $title];
                if (preg_match('/^(.*?)\s+@([a-z0-9-]+)$/u', $title, $s)) $node = ['t' => trim($s[1]), 'l' => $s[2]];
                $flat[] = ['lv' => strlen($m[1]), 'n' => $node];
            } elseif ($flat && preg_match('/^[-*]\s+(.+)$/u', $line, $m)) {
                $flat[count($flat) - 1]['n']['k'][] = trim($m[1]);
            } elseif ($flat && preg_match('/^>\s?(.*)$/u', $line, $m)) {
                $n = &$flat[count($flat) - 1]['n'];
                $n['note'] = trim(($n['note'] ?? '') . ' ' . $m[1]);
                unset($n);
            }
        }
        // 2) Lồng theo cấp: nút sau có cấp lớn hơn là con của nút trước.
        $pos = 0;
        $build = function (int $min) use (&$build, &$flat, &$pos): array {
            $out = [];
            while ($pos < count($flat) && $flat[$pos]['lv'] >= $min) {
                $item = $flat[$pos++];
                $item['n']['c'] = $build($item['lv'] + 1);
                $out[] = $item['n'];
            }

            return $out;
        };

        return self::clean($build(1));
    }

    /** Cây → dàn ý chữ (để Admin sửa tiếp bản tự sinh). */
    public static function toOutline(array $tree, int $level = 1): string
    {
        $out = '';
        foreach ($tree as $n) {
            $out .= str_repeat('#', $level) . ' ' . $n['t'] . (! empty($n['l']) ? ' @' . $n['l'] : '') . "\n";
            foreach ($n['k'] ?? [] as $k) $out .= '- ' . $k . "\n";
            if (! empty($n['note'])) $out .= '> ' . $n['note'] . "\n";
            if (! empty($n['c'])) $out .= self::toOutline($n['c'], min(6, $level + 1));
            if ($level === 1) $out .= "\n";
        }

        return $out;
    }

    /** Đếm nút lá (thế cờ / ý cuối). */
    public static function leafCount(array $tree): int
    {
        return array_sum(array_map(fn ($n) => empty($n['c']) ? 1 : self::leafCount($n['c']), $tree));
    }

    /** HTML sơ đồ (server-side, đọc được khi tắt JS / bởi Google). $id: khoá lưu tiến độ "đã thuộc" trên máy người học. */
    public static function render(array $tree, string $title, string $id, ?string $intro = null, string $play = 'do'): string
    {
        if (! $tree) return '<p><em>[Sơ đồ tư duy chưa có nội dung]</em></p>';
        $slugs = [];
        array_walk_recursive($tree, function ($v, $k) use (&$slugs) { if ($k === 'l') $slugs[] = $v; });
        $lessons = $slugs ? Lesson::published()->whereIn('slug', array_unique($slugs))->get(['slug', 'title', 'initial_fen', 'content'])->keyBy('slug') : collect();

        return view('components.mindmap', [
            'tree' => self::attach($tree, $lessons),
            'title' => $title,
            'id' => Str::slug($id) ?: 'so-do',
            'intro' => $intro,
            'total' => self::leafCount($tree),
            'play' => $play === 'den' ? 'den' : 'do',   // "Tự đánh kiểm chứng": người học cầm bên nào
        ])->render();
    }

    /**
     * Shortcode trong bài viết:
     *   [so-do-tu-duy chuyen-de="co-tan-co-khau-quyet" ket-qua="hoa" tieu-de="…" gioi-thieu="…"]  (tự dựng, luôn mới)
     *   [so-do-tu-duy slug="ten-so-do"]                                                            (soạn trong Admin)
     */
    public static function shortcode(array $a): string
    {
        if (! empty($a['slug'])) {
            $m = \App\Models\Mindmap::where('slug', $a['slug'])->first();
            if (! $m) return '<p><em>[Không tìm thấy sơ đồ tư duy "' . e($a['slug']) . '"]</em></p>';

            return self::render(self::parseOutline((string) $m->outline), $a['tieu-de'] ?? $m->title, 'map-' . $m->slug, $a['gioi-thieu'] ?? $m->description, $a['cam'] ?? 'do');
        }
        if (! empty($a['chuyen-de']) && isset(self::RESULTS[$a['ket-qua'] ?? ''])) {
            $r = $a['ket-qua'];

            return self::render(self::fromSeries($a['chuyen-de'], $r), $a['tieu-de'] ?? self::RESULTS[$r], $a['chuyen-de'] . '-' . $r,
                $a['gioi-thieu'] ?? null, $a['cam'] ?? ($r === 'hoa' ? 'den' : 'do'));
        }

        return '';
    }

    /** Gắn FEN / bên đi trước / tên bài cho nút có bài ví dụ (bỏ link nếu bài không còn published). */
    private static function attach(array $tree, $lessons): array
    {
        foreach ($tree as &$n) {
            if (! empty($n['l'])) {
                $l = $lessons[$n['l']] ?? null;
                if ($l) {
                    $n['fen'] = $l->initial_fen;
                    $n['side'] = preg_match('/Đen đi trước/u', (string) $l->content) ? 'den' : 'do';
                    $n['lesson_title'] = $l->title;
                } else {
                    unset($n['l']);
                }
            }
            if (! empty($n['c'])) $n['c'] = self::attach($n['c'], $lessons);
        }

        return $tree;
    }

    private static function clean(array $nodes): array
    {
        return array_map(function ($n) {
            if (empty($n['k'])) unset($n['k']);
            $n['c'] = self::clean($n['c'] ?? []);
            if (! $n['c']) unset($n['c']);

            return $n;
        }, $nodes);
    }
}
