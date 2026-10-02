// Web Worker: { id, fen, red, level, analyse?, coup?, pools? } → { id, move, score, depth }.
// Cờ úp: `fen` là bàn công khai (quân úp = X/x), `pools` = binh chủng chưa lộ của mỗi bên.
// Phân tích ván: { id, review: true, fen, red, pools?, timeMs? } → { id, best, score, scores, depth }.
import { think, thinkCoup, search, stateFrom, loadFen, review } from './engine';
import { pickBook } from './book';

self.onmessage = (e) => {
    const { id, fen, red, level, analyse, coup, pools } = e.data;
    const avoid = e.data.avoid?.length ? new Set(e.data.avoid) : null;   // nước bị cấm (chiếu dai lần thứ 3)
    if (e.data.review) {
        self.postMessage({ id, ...review(fen, red, { pools, timeMs: e.data.timeMs }) });
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
