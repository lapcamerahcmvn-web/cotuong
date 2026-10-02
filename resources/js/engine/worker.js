// Web Worker: { id, fen, red, level, analyse?, coup?, pools? } → { id, move, score, depth }.
// Cờ úp: `fen` là bàn công khai (quân úp = X/x), `pools` = binh chủng chưa lộ của mỗi bên.
import { think, thinkCoup, search, stateFrom, loadFen } from './engine';

self.onmessage = (e) => {
    const { id, fen, red, level, analyse, coup, pools } = e.data;
    let res;
    if (coup) res = thinkCoup(fen, pools || { red: [], black: [] }, red, analyse ? 3 : level);
    else res = analyse ? search(stateFrom(loadFen(fen)), red, { depth: 4, timeMs: 1500 }) : think(fen, red, level);
    self.postMessage({ id, move: res.move, score: res.score, depth: res.depth, nodes: res.nodes });
};
