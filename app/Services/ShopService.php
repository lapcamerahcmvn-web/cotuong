<?php

namespace App\Services;

use App\Models\User;
use App\Models\UserItem;
use Illuminate\Support\Facades\DB;

/**
 * Đổi thưởng bằng xu. Xu = users.xp_total − users.xu_spent: kiếm XP là có xu, tiêu xu KHÔNG đụng xp_total
 * (cấp độ, bảng xếp hạng, huy hiệu giữ nguyên). Danh mục: config/shop.php.
 */
class ShopService
{
    public function balance(User $u): int
    {
        return max(0, (int) $u->xp_total - (int) $u->xu_spent);
    }

    /** @return array<string, array> danh mục kèm key */
    public function catalog(): array
    {
        $out = [];
        foreach (config('shop.items') as $key => $it) $out[$key] = $it + ['key' => $key, 'min_level' => $it['min_level'] ?? 1];

        return $out;
    }

    /** @return list<string> key vật phẩm đã sở hữu (không tính thẻ giữ chuỗi — vật phẩm tiêu hao). */
    public function owned(?User $u): array
    {
        if (! $u) return [];

        return UserItem::where('user_id', $u->id)->where('item', '!=', 'freeze')->distinct()->pluck('item')->all();
    }

    /** Màu bàn cờ cao cấp đã sở hữu → tên theme (dùng cho Cài đặt giao diện). */
    public function ownedBoardThemes(?User $u): array
    {
        $cat = $this->catalog();

        return array_values(array_filter(array_map(fn ($k) => $cat[$k]['theme'] ?? null, $this->owned($u))));
    }

    /**
     * Đổi 1 vật phẩm. Khung/danh hiệu vừa đổi được dùng ngay.
     * @return array{ok:bool, message:string, balance:int}
     */
    public function buy(User $user, string $key): array
    {
        $cat = $this->catalog();
        $it = $cat[$key] ?? null;
        if (! $it) return ['ok' => false, 'message' => 'Không có vật phẩm này.', 'balance' => $this->balance($user)];

        return DB::transaction(function () use ($user, $key, $it) {
            /** @var User $u */
            $u = User::whereKey($user->id)->lockForUpdate()->first();
            $bal = $this->balance($u);
            $fail = fn ($m) => ['ok' => false, 'message' => $m, 'balance' => $bal];

            if ((int) $u->level < $it['min_level']) return $fail('Cần đạt cấp ' . $it['min_level'] . ' để đổi vật phẩm này.');
            if ($it['type'] === 'freeze') {
                if ((int) $u->streak_freezes >= (int) config('gamification.freeze_max')) return $fail('Bạn đang giữ tối đa ' . config('gamification.freeze_max') . ' thẻ giữ chuỗi.');
            } elseif (UserItem::where('user_id', $u->id)->where('item', $key)->exists()) {
                return $fail('Bạn đã có vật phẩm này.');
            }
            if ($bal < $it['price']) return $fail('Chưa đủ xu — cần ' . number_format($it['price'], 0, ',', '.') . ' xu, bạn có ' . number_format($bal, 0, ',', '.') . ' xu.');

            UserItem::create(['user_id' => $u->id, 'item' => $key, 'price' => $it['price'], 'created_at' => now()]);
            $u->xu_spent = (int) $u->xu_spent + $it['price'];
            match ($it['type']) {
                'freeze' => $u->streak_freezes = (int) $u->streak_freezes + 1,
                'frame' => $u->avatar_frame = $key,
                'title' => $u->shop_title = $key,
                default => null,
            };
            $u->save();
            $user->setRawAttributes($u->getAttributes(), true);

            return ['ok' => true, 'message' => 'Đã đổi “' . $it['name'] . '”.', 'balance' => $this->balance($u)];
        });
    }

    /** Dùng / bỏ khung hoặc danh hiệu đã sở hữu ($key null = bỏ). */
    public function equip(User $u, string $type, ?string $key): bool
    {
        if (! in_array($type, ['frame', 'title'], true)) return false;
        if ($key !== null) {
            $it = $this->catalog()[$key] ?? null;
            if (! $it || $it['type'] !== $type || ! UserItem::where('user_id', $u->id)->where('item', $key)->exists()) return false;
        }
        $u->forceFill([$type === 'frame' ? 'avatar_frame' : 'shop_title' => $key])->save();

        return true;
    }

    /** Lớp CSS khung + chữ danh hiệu để hiển thị (dùng chung mọi nơi có ảnh đại diện). */
    public static function frameClass(?string $key): string
    {
        $f = $key ? (config('shop.items.' . $key . '.frame') ?? null) : null;

        return $f ? 'has-frame frame-' . $f : '';
    }

    public static function titleText(?string $key): ?string
    {
        return $key ? (config('shop.items.' . $key . '.title') ?? null) : null;
    }
}
