<?php

namespace App\Http\Controllers;

use App\Ai\Agents\BoardVisionAgent;
use App\Services\CotuongContentService;
use App\Support\Xiangqi\Rules;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Laravel\Ai\Files\Base64Image;

// "Nhận diện bàn cờ từ ảnh": nhận dạng chính chạy trên trình duyệt (resources/js/scan/recognize.js).
// Tuỳ chọn AI (Claude vision) chỉ bật khi hosting có ANTHROPIC_API_KEY — giới hạn lượt/ngày mỗi người.
class ScanController extends Controller
{
    public const AI_DAILY = 15;

    public function show(CotuongContentService $ai)
    {
        return view('scan', ['aiEnabled' => $ai->isConfigured()]);
    }

    public function ai(Request $request, CotuongContentService $ai): JsonResponse
    {
        abort_unless($ai->isConfigured(), 404);
        $data = $request->validate(['image' => ['required', 'string', 'max:2800000']]);
        $raw = base64_decode($data['image'], true);
        abort_if($raw === false || @getimagesizefromstring($raw) === false, 422, 'Ảnh không hợp lệ.');

        $key = 'scan-ai:' . Auth::id() . ':' . now()->toDateString();
        $used = (int) Cache::get($key, 0);
        if ($used >= self::AI_DAILY) {
            return response()->json(['message' => 'Hôm nay bạn đã dùng hết ' . self::AI_DAILY . ' lượt nhận dạng bằng AI.'], 429);
        }
        Cache::put($key, $used + 1, now()->endOfDay());

        try {
            $agent = new BoardVisionAgent;
            $model = $ai->getModel();
            $res = $agent->prompt('Đọc thế cờ trong ảnh.', attachments: [new Base64Image($data['image'], 'image/jpeg')], provider: $ai->getProvider(), model: $model);
            $out = $res instanceof \Illuminate\Contracts\Support\Arrayable ? $res->toArray() : (json_decode($res->text ?? '', true) ?? []);
            $rows = $out['rows'] ?? null;
        } catch (\Throwable $e) {
            Log::warning('scan ai failed', ['message' => $e->getMessage()]);

            return response()->json(['message' => 'AI đang bận — thử lại sau, hoặc sửa tay trên bàn cờ.'], 502);
        }

        $fen = self::rowsToFen($rows);
        if ($fen === null) {
            return response()->json(['message' => 'AI trả kết quả không hợp lệ — hãy sửa tay trên bàn cờ.'], 422);
        }

        return response()->json(['fen' => $fen, 'left' => self::AI_DAILY - $used - 1]);
    }

    /** 10 chuỗi × 9 ký tự (RNBAKCPX/rnbakcpx/.) → FEN; null nếu sai định dạng. */
    public static function rowsToFen(mixed $rows): ?string
    {
        if (! is_array($rows) || count($rows) !== 10) return null;
        $b = [];
        foreach (array_values($rows) as $row) {
            $row = preg_replace('/\s+/', '', (string) $row);
            if (! preg_match('/^[RNBAKCPXrnbakcpx.]{9}$/', $row)) return null;
            foreach (str_split($row) as $ch) $b[] = $ch === '.' ? null : $ch;
        }

        return Rules::toFen($b);
    }
}
