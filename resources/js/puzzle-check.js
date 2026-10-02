// Kiểm chứng nước giải đố KHÁC đáp án bằng bộ giải chiếu hết (engine Web Worker). Gắn window.XiangqiPuzzleCheck để
// public/js/board.js (bàn giải đố dùng chung bài học + luyện tập) gọi khi người chơi đi khác lời giải.
let worker = null, seq = 0;
const waiters = new Map();

export function installPuzzleCheck() {
    if (window.XiangqiPuzzleCheck || typeof Worker === 'undefined') return;
    window.XiangqiPuzzleCheck = (q) => new Promise((resolve) => {
        if (!worker) {
            worker = new Worker(new URL('./engine/worker.js', import.meta.url), { type: 'module' });
            worker.onmessage = (e) => { const w = waiters.get(e.data.id); if (w) { waiters.delete(e.data.id); w(e.data); } };
            worker.onerror = () => { waiters.forEach((w) => w(null)); waiters.clear(); worker = null; };
        }
        const id = ++seq;
        waiters.set(id, resolve);
        setTimeout(() => { if (waiters.has(id)) { waiters.delete(id); resolve(null); } }, 9000);
        worker.postMessage({ id, puzzle: true, fen: q.fen, red: q.red, move: q.move, expected: q.expected, n: q.n });
    });
}
