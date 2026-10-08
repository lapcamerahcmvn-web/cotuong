<?php

namespace App\Http\Controllers;

use App\Services\ShopService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// Đổi thưởng bằng xu (/doi-thuong): xu = XP kiếm được − xu đã tiêu; đổi không làm giảm XP/cấp/hạng.
class ShopController extends Controller
{
    public function __construct(private ShopService $shop) {}

    public function index()
    {
        $u = Auth::user();
        $items = collect($this->shop->catalog());

        return view('shop', [
            'sections' => config('shop.sections'),
            'items' => $items->groupBy('type'),
            'balance' => $u ? $this->shop->balance($u) : null,
            'owned' => array_flip($this->shop->owned($u)),
            'user' => $u,
            'freezeMax' => (int) config('gamification.freeze_max'),
        ]);
    }

    public function buy(Request $request, string $item)
    {
        $res = $this->shop->buy(Auth::user(), $item);
        if ($request->expectsJson()) return response()->json($res, $res['ok'] ? 200 : 422);

        return back()->with($res['ok'] ? 'shop_ok' : 'shop_err', $res['message']);
    }

    public function equip(Request $request)
    {
        $data = $request->validate(['type' => ['required', 'in:frame,title'], 'item' => ['nullable', 'string', 'max:40']]);
        $ok = $this->shop->equip(Auth::user(), $data['type'], $data['item'] ?: null);

        return back()->with($ok ? 'shop_ok' : 'shop_err', $ok ? ($data['item'] ? 'Đã dùng vật phẩm.' : 'Đã bỏ dùng.') : 'Không dùng được vật phẩm này.');
    }
}
