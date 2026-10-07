<?php

namespace Database\Seeders;

use App\Models\Mindmap;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

// Nạp sơ đồ tư duy soạn sẵn (database/seeders/data/mindmaps.json, sinh bởi tools/sat-cuc-lien-hoan/gen.mjs) vào bảng
// mindmaps để shortcode [so-do-tu-duy slug="…"] chạy trên hosting. Giống PostSeeder: sơ đồ đã có trên DB chỉ bị ghi đè
// khi bản JSON MỚI HƠN (không đè bản Admin vừa sửa trên hosting).
// Chạy: php artisan db:seed --class=MindmapSeeder --force
class MindmapSeeder extends Seeder
{
    public function run(): void
    {
        $path = base_path('database/seeders/data/mindmaps.json');
        if (! is_file($path)) return;
        $data = json_decode(file_get_contents($path), true);
        $n = $skipped = 0;
        foreach (($data['mindmaps'] ?? []) as $m) {
            $existing = Mindmap::where('slug', $m['slug'])->first();
            $jsonUpdated = ! empty($m['updated_at']) ? Carbon::parse($m['updated_at'])->startOfSecond() : null;
            if ($existing && (! $jsonUpdated || ($existing->updated_at && $existing->updated_at->gte($jsonUpdated)))) {
                $skipped++;

                continue;
            }
            $map = $existing ?? new Mindmap(['slug' => $m['slug']]);
            $map->fill(collect($m)->only(['title', 'description', 'outline'])->all());
            if ($jsonUpdated) $map->updated_at = $jsonUpdated;
            $map->save();
            $n++;
        }
        $this->command?->info("Sơ đồ tư duy: ghi {$n}, giữ nguyên {$skipped}.");
    }
}
