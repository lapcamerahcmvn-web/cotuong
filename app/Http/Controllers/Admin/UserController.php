<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\GameRecord;
use App\Models\LessonComment;
use App\Models\PuzzleAttempt;
use App\Models\SavedPosition;
use App\Models\User;
use App\Models\UserAchievement;
use App\Models\UserDailyActivity;
use App\Models\XpTransaction;
use App\Services\Gamification\LevelService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

// Quản lý người dùng (admin): danh sách lọc/sắp xếp, hồ sơ đầy đủ (đăng nhập, học tập, luyện tập, ván đấu, bình luận,
// truy cập), đổi vai trò, khoá / mở khoá, xoá tài khoản (yêu cầu xoá dữ liệu theo Chính sách bảo mật).
class UserController extends Controller
{
    public const ROLES = ['hoc_vien' => 'Học viên', 'bien_tap' => 'Biên tập', 'admin' => 'Admin'];

    public function index(Request $request)
    {
        $q = User::query()->withCount([
            'progress as completed_count' => fn ($x) => $x->where('status', 'completed'),
            'gameRecords as games_count',
            'puzzleAttempts as solved_count' => fn ($x) => $x->where('result', 'solved'),
        ]);

        if ($kw = trim((string) $request->get('q'))) {
            $q->where(fn ($w) => $w->where('name', 'like', "%{$kw}%")->orWhere('email', 'like', "%{$kw}%"));
        }
        if (array_key_exists($role = (string) $request->get('role'), self::ROLES)) {
            $q->where('role', $role);
        }
        match ($request->get('loc')) {
            'active' => $q->where('last_login_at', '>=', now()->subDays(7)),
            'new' => $q->where('created_at', '>=', now()->subDays(7)),
            'banned' => $q->whereNotNull('banned_at'),
            'google' => $q->whereNotNull('google_id'),
            default => null,
        };
        match ($request->get('sx')) {
            'xp' => $q->orderByDesc('xp_total'),
            'new' => $q->latest('created_at'),
            'games' => $q->orderByDesc('games_count'),
            'streak' => $q->orderByDesc('streak_current'),
            default => $q->orderByDesc('last_login_at'),
        };

        $users = $q->paginate(25)->withQueryString();
        $counts = [
            'all' => User::count(),
            'active' => User::where('last_login_at', '>=', now()->subDays(7))->count(),
            'new' => User::where('created_at', '>=', now()->subDays(7))->count(),
            'banned' => User::whereNotNull('banned_at')->count(),
        ];

        return view('admin.users.index', ['users' => $users, 'counts' => $counts, 'roles' => self::ROLES]);
    }

    public function show(User $user)
    {
        $u = $user;
        $progress = $u->progress()->with('lesson:id,title,slug')->latest('updated_at')->limit(100)->get();
        $logins = $u->loginEvents()->latest('created_at')->limit(50)->get();
        $logs = $u->accessLogs()->latest('created_at')->limit(80)->get();
        $games = GameRecord::where('user_id', $u->id)->latest()->limit(30)->get();
        $gameStats = GameRecord::where('user_id', $u->id)->selectRaw('mode, result, count(*) c')->groupBy('mode', 'result')->get()
            ->groupBy('mode')->map(fn ($g) => $g->pluck('c', 'result'));
        $puzzle = PuzzleAttempt::where('user_id', $u->id)->selectRaw('mode, result, count(*) c')->groupBy('mode', 'result')->get()
            ->groupBy('mode')->map(fn ($g) => $g->pluck('c', 'result'));
        $xp = XpTransaction::where('user_id', $u->id)->latest('created_at')->limit(30)->get();
        $activity = UserDailyActivity::where('user_id', $u->id)->where('date', '>=', now()->subDays(27)->toDateString())->get()->keyBy(fn ($a) => $a->date instanceof \DateTimeInterface ? $a->date->format('Y-m-d') : (string) $a->date);
        $comments = LessonComment::with('lesson:id,title,slug')->where('user_id', $u->id)->latest()->limit(20)->get();
        $counts = [
            'achievements' => UserAchievement::where('user_id', $u->id)->count(),
            'saved' => SavedPosition::where('user_id', $u->id)->count(),
            'following' => DB::table('follows')->where('follower_id', $u->id)->count(),
            'followers' => DB::table('follows')->where('followee_id', $u->id)->count(),
            'comments' => LessonComment::where('user_id', $u->id)->count(),
        ];

        return view('admin.users.show', [
            'user' => $u, 'progress' => $progress, 'logins' => $logins, 'logs' => $logs, 'games' => $games,
            'gameStats' => $gameStats, 'puzzle' => $puzzle, 'xp' => $xp, 'activity' => $activity, 'comments' => $comments,
            'counts' => $counts, 'roles' => self::ROLES, 'levelTitle' => LevelService::title((int) $u->level),
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $role = $request->validate(['role' => ['required', 'in:' . implode(',', array_keys(self::ROLES))]])['role'];
        if ($user->id === $request->user()->id && $role !== 'admin') {
            return back()->with('err', 'Không thể tự hạ quyền admin của chính mình.');
        }
        $user->forceFill(['role' => $role])->save();

        return back()->with('ok', 'Đã đổi vai trò thành ' . self::ROLES[$role] . '.');
    }

    public function ban(Request $request, User $user)
    {
        $data = $request->validate(['reason' => ['nullable', 'string', 'max:255']]);
        abort_if($user->id === $request->user()->id || $user->isAdmin(), 422, 'Không khoá được tài khoản admin.');
        $user->forceFill(['banned_at' => now(), 'ban_reason' => $data['reason'] ?? null])->save();
        DB::table('sessions')->where('user_id', $user->id)->delete();   // đăng xuất mọi phiên đang mở

        return back()->with('ok', 'Đã khoá tài khoản ' . $user->name . '.');
    }

    public function unban(User $user)
    {
        $user->forceFill(['banned_at' => null, 'ban_reason' => null])->save();

        return back()->with('ok', 'Đã mở khoá tài khoản ' . $user->name . '.');
    }

    /** Xoá vĩnh viễn (yêu cầu xoá dữ liệu): phải gõ đúng email để xác nhận. Dữ liệu liên quan xoá theo khoá ngoại. */
    public function destroy(Request $request, User $user)
    {
        $request->validate(['confirm_email' => ['required', 'string']]);
        abort_if($user->id === $request->user()->id || $user->isAdmin(), 422, 'Không xoá được tài khoản admin.');
        if (mb_strtolower(trim($request->input('confirm_email'))) !== mb_strtolower($user->email)) {
            return back()->with('err', 'Email xác nhận không khớp — chưa xoá.');
        }
        $name = $user->name;
        DB::transaction(function () use ($user) {
            DB::table('sessions')->where('user_id', $user->id)->delete();
            $user->delete();
        });

        return redirect()->route('admin.users.index')->with('ok', 'Đã xoá vĩnh viễn tài khoản ' . $name . ' và dữ liệu liên quan.');
    }
}
