// Kiểm tra engine cờ tướng/cờ úp (resources/js/engine/engine.js). Chạy: node tools/engine-test.mjs
// BẮT BUỘC chạy lại sau mỗi lần sửa engine — sai luật/sai điểm rất khó thấy khi chỉ chơi thử.
import {
    loadFen, legalMoves, legalMovesSt, stateFrom, toIccs, search, thinkCoup, gameOver,
    START_FEN, COUP_FEN, COUP_SET, coupOpeningPrior, fromIccs, review, mateIn, checkPuzzleMove,
} from '../resources/js/engine/engine.js';
import { LINES, bookMoves, pickBook } from '../resources/js/engine/book.js';

let fail = 0;
const ok = (cond, msg) => { console.log((cond ? '  ✓ ' : '  ✗ ') + msg); if (!cond) fail++; };

function perft(b, red, d) {
    if (!d) return 1;
    let n = 0;
    for (const m of legalMoves(b, red)) {
        const c = b[m[1]]; b[m[1]] = b[m[0]]; b[m[0]] = null;
        n += perft(b, !red, d - 1);
        b[m[0]] = b[m[1]]; b[m[1]] = c;
    }
    return n;
}

console.log('Luật cờ tướng (perft chuẩn 44 / 1920 / 79666)');
const sb = loadFen(START_FEN);
ok(perft(sb, true, 1) === 44 && perft(sb, true, 2) === 1920 && perft(sb, true, 3) === 79666, 'perft 1-3');
ok(search('3k5/R7R/9/9/9/9/9/9/9/4K4', true, { depth: 3, timeMs: 2000 }).move === 'a8a9', 'tìm thấy chiếu hết 1 nước');

console.log('Luật cờ úp');
ok(legalMovesSt(stateFrom(loadFen(COUP_FEN)), true).length === 44, 'nước đầu theo ô xuất phát = 44');
const el = stateFrom(loadFen('3k5/9/9/9/4B4/9/9/9/9/5K3'), true);
ok(legalMovesSt(el, true).filter((m) => m[0] === 40).length === 4, 'Tượng đã lật qua sông đi tiếp được');
ok(legalMovesSt(stateFrom(loadFen('3k5/9/9/9/4B4/9/9/9/9/5K3')), true).filter((m) => m[0] === 40).length === 2, 'cờ tướng thường: Tượng không qua sông');
ok(legalMovesSt(stateFrom(loadFen('4k4/9/9/9/4A4/9/9/9/9/3K5'), true), true).filter((m) => m[0] === 40).length === 4, 'Sĩ đã lật ra ngoài cung');
const stale = '3k5/R8/9/9/9/9/9/4R4/9/5K3';
ok(gameOver(loadFen(stale), false, false)?.winner === 'do', 'cờ tướng: hết nước = thua');
ok(gameOver(loadFen(stale), false, true)?.winner === null, 'cờ úp: hết nước không bị chiếu = hoà');

console.log('Sức cờ cờ úp: không bỏ quân Xe treo (cấp Vừa)');
const hang = 'xxxxkxxxx/4r4/1x5x1/x1x1x1x1x/4R4/9/X1X1X1X1X/1X5X1/9/XXXXKXXX1';
const b = loadFen(hang);
const pools = { red: COUP_SET.slice(0, b.filter((p) => p === 'X').length), black: COUP_SET.slice(0, b.filter((p) => p === 'x').length) };
let hit = 0;
for (let i = 0; i < 3; i++) if (thinkCoup(hang, pools, false, 3).move === 'e6e5') hit++;
ok(hit === 3, `ăn Xe treo ${hit}/3 lần`);

console.log('Lý thuyết khai cuộc cờ úp: Pháo giả không vội vật Mã giả');
const prior = coupOpeningPrior(loadFen(COUP_FEN), true);
ok(prior('b2b9') <= -200 && prior('h2h9') <= -200, 'nước đầu Pháo giả ăn nắp (bị ăn lại ngay) bị trừ điểm');
ok(prior('a3a4') > prior('e3e4'), 'tốt Biên ưu tiên hơn tốt đầu');
const full = { red: COUP_SET, black: COUP_SET };
let rush = 0;
for (let i = 0; i < 6; i++) if (['b2b9', 'h2h9'].includes(thinkCoup(COUP_FEN, full, true, 3).move)) rush++;
ok(rush <= 1, `máy vật Pháo giả ở nước đầu ${rush}/6 lần`);
// Không "biết trước" quân lật ra trong cây tìm kiếm → thế đầu cân bằng, 2 nước đối xứng điểm gần bằng nhau.
const rv = review(COUP_FEN, true, { pools: full, timeMs: 1200 });
ok(Math.abs(rv.score) < 150, `phân tích thế đầu cờ úp gần cân bằng (${rv.score})`);
ok(Math.abs(rv.scores.b2b9 - rv.scores.h2h9) < 120 && Math.abs(rv.scores.a3a4 - rv.scores.i3i4) < 120, 'nước đối xứng được chấm gần bằng nhau');
ok(rv.score - rv.scores.b2b9 >= 150, `phân tích chấm Pháo giả vật nắp kém hơn nước tốt nhất (${rv.score - rv.scores.b2b9})`);

console.log('Book khai cuộc cờ tướng');
let bad = 0;
for (const [, line] of LINES) {
    const bb = loadFen(START_FEN);
    let red = true;
    for (const mv of line.split(' ')) {
        if (!legalMoves(bb, red).some((m) => toIccs(m[0], m[1]) === mv)) { bad++; console.log('    sai luật:', line, mv); break; }
        const [f, t] = fromIccs(mv);
        bb[t] = bb[f]; bb[f] = null; red = !red;
    }
}
ok(bad === 0, `${LINES.length} diễn biến sách đều hợp lệ`);
const first = new Set(bookMoves(START_FEN, true).map((x) => x.move));
ok(first.has('h2e2') && first.has('c3c4') && first.has('g0e2'), 'thế mở có Pháo đầu / Tiên nhân chỉ lộ / Phi tượng');
ok(bookMoves(loadFen(START_FEN), false).length === 0, 'sai lượt đi → ngoài sách');
ok(pickBook(START_FEN, true, new Set(first)) === null, 'tránh hết nước sách → null (máy tự tính)');

console.log('Bộ giải chiếu hết (luyện tập nhận đường thắng khác sách)');
ok(mateIn('3k5/R7R/9/9/9/9/9/9/9/4K4', true, 1)?.k === 1, 'tìm chiếu hết 1 nước');
const sx = '3k1ab2/4a4/4c4/2R6/9/R8/9/B2A3r1/4A2r1/2B2K3';   // Song Xe: sách c6c9…, a4a9… cũng thắng
const alt = checkPuzzleMove(sx, true, 'a4a9', 3);
ok(alt.status === 'win' && alt.k <= 3 && alt.reply && alt.next, `nước khác sách a4a9 được chứng minh thắng (${alt.status} ${alt.k})`);
ok(checkPuzzleMove(sx, true, 'c6c9', 3).status === 'win', 'nước theo sách vẫn thắng');
ok(checkPuzzleMove(sx, true, 'a4a5', 3).status !== 'win', 'nước yếu không được nhận');
const tm = Date.now(); checkPuzzleMove('1R3a1c1/r3a4/3kN4/8p/p8/9/9/8B/9/4K4', true, 'b9b5', 3);
const dt = Date.now() - tm;
ok(dt < 3000, `kiểm 1 nước trong ${dt}ms`);

console.log(fail ? `\n${fail} kiểm tra THẤT BẠI` : '\nTất cả đạt');
process.exit(fail ? 1 : 0);
