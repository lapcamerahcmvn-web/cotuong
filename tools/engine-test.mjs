// Kiểm tra engine cờ tướng/cờ úp (resources/js/engine/engine.js). Chạy: node tools/engine-test.mjs
// BẮT BUỘC chạy lại sau mỗi lần sửa engine — sai luật/sai điểm rất khó thấy khi chỉ chơi thử.
import {
    loadFen, legalMoves, legalMovesSt, stateFrom, toIccs, search, thinkCoup, gameOver,
    START_FEN, COUP_FEN, COUP_SET,
} from '../resources/js/engine/engine.js';

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

console.log(fail ? `\n${fail} kiểm tra THẤT BẠI` : '\nTất cả đạt');
process.exit(fail ? 1 : 0);
