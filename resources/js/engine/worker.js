// Web Worker: { id, fen, red, level, analyse?, coup?, pools? } → { id, move, score, depth }.
// Cờ úp: `fen` là bàn công khai (quân úp = X/x), `pools` = binh chủng chưa lộ của mỗi bên.
// Phân tích ván: { id, review: true, fen, red, pools?, timeMs? } → { id, best, score, scores, depth }.
// Giải đố: { id, puzzle: true, fen, red, move, expected, n } → kết quả checkPuzzleMove (nước khác đáp án có thắng không).
import { think, thinkCoup, search, stateFrom, loadFen, review, checkPuzzleMove, equivMove } from './engine';
import { pickBook } from './book';

self.onmessage = (e) => {
    const { id, fen, red, level, analyse, coup, pools } = e.data;
    const avoid = e.data.avoid?.length ? new Set(e.data.avoid) : null;   // nước bị cấm (chiếu dai lần thứ 3)
    if (e.data.puzzle) {
        const { move, expected, n, mateGoal } = e.data;
        const later = e.data.later || [];
        // Thế không phải chiếu hết (tàn cuộc thắng thế…) → chỉ so nước tương đương.
        if (mateGoal === false) {
            const eq = expected && expected !== move ? equivMove(fen, red, move, expected, 1500, 12, false, later) : null;
            self.postMessage({ id, ...(eq ? { status: 'equiv', ...eq } : { status: 'no' }) });
            return;
        }
        // Chuẩn công bằng: nước khác đáp án được nhận nếu thắng KHÔNG CHẬM HƠN nước đáp án khi đối phương đỡ tốt nhất
        // (nhiều thế trong sách cho bên thua đỡ chưa tốt → đáp án thật ra cần nhiều nước hơn số nước ghi trong bài).
        let budget = n;
        if (expected && expected !== move) {
            const ex = checkPuzzleMove(fen, red, expected, n + 2, 1500);
            budget = ex.status === 'win' ? n : ex.status === 'slow' ? ex.k : n + 2;
        }
        let res = checkPuzzleMove(fen, red, move, budget, 2500);
        // Bộ giải chưa chứng minh được (nước êm sâu, đổi thứ tự…) → thử so nước TƯƠNG ĐƯƠNG nước trong bài.
        if (res.status !== 'win' && res.status !== 'slow' && expected && expected !== move) {
            const eq = equivMove(fen, red, move, expected, 1500, 12, true, later);
            if (eq) res = { status: 'equiv', ...eq };
        }
        self.postMessage({ id, ...res, budget });
        return;
    }
    if (e.data.review) {
        self.postMessage({ id, ...review(fen, red, { pools, timeMs: e.data.timeMs, samples: e.data.samples }) });
        return;
    }
    let res;
    // Cờ tướng từ cấp Dễ: thế cờ nằm trong book khai cuộc → đi nước sách (chọn ngẫu nhiên theo độ phổ biến).
    if (!coup && !analyse && level >= 2) {
        const mv = pickBook(fen, red, avoid);
        if (mv) { self.postMessage({ id, move: mv, score: 0, depth: 0, nodes: 0, book: true }); return; }
    }
    if (coup) res = thinkCoup(fen, pools || { red: [], black: [] }, red, analyse ? 3 : level, avoid);
    else res = analyse ? search(stateFrom(loadFen(fen)), red, { depth: 4, timeMs: 1500, avoid }) : think(fen, red, level, avoid);
    self.postMessage({ id, move: res.move, score: res.score, depth: res.depth, nodes: res.nodes });
};
