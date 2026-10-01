// Web Worker: nhận { id, fen, red, level | depth/timeMs } → trả { id, move, score, depth }.
import { think, search } from './engine';

self.onmessage = (e) => {
    const { id, fen, red, level, analyse } = e.data;
    const res = analyse ? search(fen, red, { depth: 4, timeMs: 1500 }) : think(fen, red, level);
    self.postMessage({ id, ...res });
};
