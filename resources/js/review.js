// Xem lại + PHÂN TÍCH VÁN (kiểu "Game Review"): engine chấm mọi nước tại từng thế (chạy song song nhiều
// Web Worker), xếp loại nước đi, biểu đồ ưu thế, độ chính xác từng bên, "thử tìm nước tốt hơn" tại nước
// sai và "chơi tiếp với máy từ thế này". Kết quả lưu lên server (ván của chính mình) để lần sau có ngay.
import { loadBoard, postJson, icon, escapeHtml, toast, track } from './core';
import { bookMoves } from './engine/book';

const CLS = {
    book: { label: 'Nước sách', mark: '≡', tone: 'book' },
    best: { label: 'Tốt nhất', mark: '★', tone: 'best' },
    good: { label: 'Tốt', mark: '✓', tone: 'good' },
    inacc: { label: 'Thiếu chính xác', mark: '?!', tone: 'inacc' },
    mistake: { label: 'Sai lầm', mark: '?', tone: 'mistake' },
    blunder: { label: 'Sai lầm nghiêm trọng', mark: '??', tone: 'blunder' },
};
const NAME = { R: 'Xe', N: 'Mã', B: 'Tượng', A: 'Sĩ', K: 'Tướng', C: 'Pháo', P: 'Tốt' };
const SET = { R: 2, C: 2, N: 2, A: 2, B: 2, P: 5 };
const MATE = 90000;
const clamp = (x, m = 3000) => Math.max(-m, Math.min(m, x));
// Xác suất thắng theo điểm (công thức Lichess, co giãn vì Xe cờ tướng = 9 Tốt).
const wp = (cp) => 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * clamp(cp, 4000) * 0.6)) - 1);
const isHidden = (p) => p === 'X' || p === 'x';

export function init() {
    const root = document.querySelector('[data-review]');
    if (!root) return;
    loadBoard().then(() => setup(root));
}

function setup(root) {
    const R = window.XiangqiRules;
    const cfg = JSON.parse(root.querySelector('script[type="application/json"]').textContent);
    const $ = (s) => root.querySelector(s);
    const steps = cfg.steps;
    const n = steps.length;
    const fens = [cfg.startFen, ...steps.map((s) => s.fen)];
    const redAt = (k) => (k % 2 === 0) === cfg.redFirst;      // bên đi tại thế k
    const coup = cfg.coup;
    let idx = n, flip = cfg.you === 'den', an = cfg.analysis || null, running = false, board = null, retry = null;

    // Túi quân úp chưa lộ ở mỗi thế (cờ úp) — thứ duy nhất engine được biết về quân úp.
    const pools = (() => {
        if (!coup) return [];
        const pool = { do: { ...SET }, den: { ...SET } };
        const b0 = R.loadFen(cfg.startFen);
        if (cfg.startFen !== cfg.coupFen) b0.forEach((p) => { if (p && !isHidden(p) && p.toUpperCase() !== 'K') pool[p === p.toUpperCase() ? 'do' : 'den'][p.toUpperCase()]--; });
        const out = [];
        const snap = () => {
            const list = (side) => Object.entries(pool[side]).flatMap(([t, c]) => Array(Math.max(0, c)).fill(t));
            return { red: list('do'), black: list('den') };
        };
        out.push(snap());
        steps.forEach((s) => {
            if (s.reveal) pool[s.reveal === s.reveal.toUpperCase() ? 'do' : 'den'][s.reveal.toUpperCase()]--;
            if (s.cap?.hidden && s.cap.p && !isHidden(s.cap.p)) pool[s.cap.p === s.cap.p.toUpperCase() ? 'do' : 'den'][s.cap.p.toUpperCase()]--;
            out.push(snap());
        });
        return out;
    })();

    // Ký hiệu Việt của 1 nước bất kỳ tại thế k (quân úp ghi theo binh chủng ô xuất phát).
    function noteOf(k, iccs) {
        const b = R.loadFen(fens[k]), m = R.fromIccs(iccs);
        if (!m || !b[m.from]) return iccs;
        if (isHidden(b[m.from])) { const role = R.posRole(m.from) || 'P'; b[m.from] = b[m.from] === 'X' ? role : role.toLowerCase(); }
        return R.notation(b, m.from, m.to);
    }
    const sq = (iccs) => R.fromIccs(iccs);
    const fmt = (cpRed) => {
        if (Math.abs(cpRed) > MATE) return (cpRed > 0 ? 'Đỏ' : 'Đen') + ' chiếu hết';
        const v = cpRed / 100;
        return (v > 0 ? '+' : '') + v.toFixed(1).replace('.', ',');
    };

    // ---------- Bàn cờ ----------
    function mountBoard(red, onMove) {
        const el = $('[data-rv-board]');
        el.innerHTML = '<div class="board-holder" data-xq-holder></div>';
        const g = window.XiangqiBoard.mountGame(el, { fen: fens[0], red, coup, onMove });
        g.setFlip(flip);
        return g;
    }
    board = mountBoard(true, null);
    board.lock(true);

    function arrowsFor(k) {
        if (!an || k >= n || !an.moves[k]?.b) return null;
        const m = sq(an.moves[k].b);
        return m ? [{ from: m.from, to: m.to, color: '#2f6b5e' }] : null;
    }

    function go(k, opts = {}) {
        if (retry) stopRetry();
        idx = Math.max(0, Math.min(n, k));
        const better = opts.better && idx > 0 && an;
        if (better) {
            // Thế TRƯỚC nước vừa đi: mũi tên xanh = nước máy đề xuất, đỏ = nước đã đi.
            const mv = an.moves[idx - 1], arrows = [];
            const p = sq(steps[idx - 1].iccs); arrows.push({ from: p.from, to: p.to, color: '#c8451f' });
            if (mv.b) { const b = sq(mv.b); arrows.push({ from: b.from, to: b.to, color: '#2f6b5e' }); }
            board.set(fens[idx - 1], null, { arrows, noAnim: true, silent: true });
        } else {
            board.set(fens[idx], idx ? steps[idx - 1].iccs : null, { arrows: opts.hint ? arrowsFor(idx) : null, silent: !opts.sound, noAnim: !opts.sound });
        }
        renderCoach(better);
        highlight();
        renderBar();
        drawGraph();
    }

    $('[data-rv-first]').addEventListener('click', () => go(0));
    $('[data-rv-prev]').addEventListener('click', () => go(idx - 1, { sound: true }));
    $('[data-rv-next]').addEventListener('click', () => go(idx + 1, { sound: true }));
    $('[data-rv-last]').addEventListener('click', () => go(n));
    $('[data-rv-flip]').addEventListener('click', () => { flip = !flip; board.setFlip(flip); });
    root.addEventListener('keydown', (e) => {
        if (e.target.closest('input,textarea')) return;
        if (e.key === 'ArrowRight') { go(idx + 1, { sound: true }); e.preventDefault(); }
        if (e.key === 'ArrowLeft') { go(idx - 1, { sound: true }); e.preventDefault(); }
    });

    // ---------- Danh sách nước ----------
    const listEl = $('[data-rv-moves]');
    function renderList() {
        let h = '';
        const lead = cfg.redFirst ? 0 : 1;
        for (let r = 0; r * 2 - lead < n; r++) {
            const cell = (i) => {
                if (i < 0 || i >= n) return '<span class="rv-mv is-empty"></span>';
                const c = an?.moves[i]?.c, k = c ? CLS[c] : null;
                return `<button type="button" class="rv-mv" data-ply="${i + 1}">${escapeHtml(steps[i].wxf)}${steps[i].reveal ? `<small> lật ${NAME[steps[i].reveal.toUpperCase()]}</small>` : ''}${k && c !== 'good' ? `<span class="rv-mark rv-${k.tone}" title="${k.label}">${k.mark}</span>` : ''}</button>`;
            };
            h += `<div class="rv-row"><span class="rv-num">${r + 1}.</span>${cell(r * 2 - lead)}${cell(r * 2 + 1 - lead)}</div>`;
        }
        listEl.innerHTML = h;
        listEl.querySelectorAll('[data-ply]').forEach((b) => b.addEventListener('click', () => go(+b.dataset.ply, { sound: true })));
    }
    function highlight() {
        listEl.querySelectorAll('[data-ply]').forEach((b) => {
            const on = +b.dataset.ply === idx;
            b.classList.toggle('is-on', on);
            if (on) {
                const lb = listEl.getBoundingClientRect(), eb = b.getBoundingClientRect();
                if (eb.top < lb.top || eb.bottom > lb.bottom) listEl.scrollTop += eb.top - lb.top - lb.height / 2;
            }
        });
    }

    // ---------- Lời bình nước hiện tại ----------
    function renderCoach(better) {
        const box = $('[data-rv-coach]');
        if (idx === 0) {
            box.innerHTML = `<div class="rv-coach__head">Thế cờ mở đầu</div><p>${an ? 'Bấm vào biểu đồ hoặc một nước để xem đánh giá của máy.' : 'Dùng ←/→ hoặc các nút bên dưới để xem lại từng nước.'}</p>${actions(0)}`;
            bindActions(box);
            return;
        }
        const s = steps[idx - 1], mv = an?.moves[idx - 1], k = mv ? CLS[mv.c] : null;
        let html = `<div class="rv-coach__head"><span class="side-dot ${s.side}"></span>Nước ${Math.ceil(idx / 2)} · ${escapeHtml(s.caption.replace(/\.$/, ''))}</div>`;
        if (k) {
            html += `<p class="rv-verdict rv-${k.tone}"><b>${k.mark} ${k.label}</b>${mv.l > 15 && mv.c !== 'best' ? ` — mất khoảng ${(mv.l / 100).toFixed(1).replace('.', ',')} điểm` : ''}.`;
            if (mv.b && mv.b !== s.iccs && !['best', 'book'].includes(mv.c)) html += ` Nước tốt hơn: <b>${escapeHtml(noteOf(idx - 1, mv.b))}</b>.`;
            html += ` <span class="text-ink-faint">Thế cờ: ${fmt(an.evals[idx])}</span></p>`;
            if (better) html += '<p class="text-[13px] text-ink-soft">Mũi tên xanh = nước máy đề xuất · mũi tên đỏ = nước đã đi.</p>';
        } else if (!an) {
            html += '<p class="text-ink-soft">Bấm “Phân tích ván” để máy chấm từng nước.</p>';
        }
        box.innerHTML = html + actions(idx, better);
        bindActions(box);
    }
    function actions(k, better) {
        const mv = k > 0 ? an?.moves[k - 1] : null;
        const bad = mv && ['inacc', 'mistake', 'blunder'].includes(mv.c);
        const over = k === n && cfg.ended;
        return `<div class="cluster mt-3">
            ${bad ? `<button type="button" class="btn btn--sm" data-rv-better>${icon('eye')} ${better ? 'Xem nước đã đi' : 'Xem nước tốt hơn'}</button>` : ''}
            ${bad && an.alts?.[k - 1] ? `<button type="button" class="btn btn--sm btn--primary" data-rv-retry>${icon('target')} Thử tìm nước tốt hơn</button>` : ''}
            ${!over ? `<a class="btn btn--sm" href="${escapeHtml(playUrl(k))}">${icon('play')} Chơi tiếp với máy từ đây</a>` : ''}
        </div>`;
    }
    function bindActions(box) {
        box.querySelector('[data-rv-better]')?.addEventListener('click', (e) => go(idx, { better: !e.currentTarget.textContent.includes('đã đi') }));
        box.querySelector('[data-rv-retry]')?.addEventListener('click', () => startRetry(idx - 1));
    }

    function playUrl(k) {
        const q = new URLSearchParams({ 'tu-the': fens[k], luot: redAt(k) ? 'do' : 'den' });
        if (coup && fens[k].match(/[Xx]/)) {
            q.set('bien-the', 'co-up');
            q.set('tui', pools[k].red.join('') + '-' + pools[k].black.join('').toLowerCase());
        }
        return cfg.playUrl + '?' + q.toString();
    }

    // ---------- Thử tìm nước tốt hơn ----------
    function startRetry(k) {
        const alt = an.alts[k], bestScore = Math.max(...Object.values(alt));
        let tries = 0;
        idx = k + 1;
        highlight();
        const box = $('[data-rv-coach]');
        const msg = (t, kind = '') => {
            box.innerHTML = `<div class="rv-coach__head">${icon('target')} Thử lại nước ${Math.ceil((k + 1) / 2)} — ${redAt(k) ? 'Đỏ' : 'Đen'} đi</div>
                <p class="rv-verdict ${kind}">${t}</p><div class="cluster mt-3"><button type="button" class="btn btn--sm" data-rv-stop>Thoát</button></div>`;
            box.querySelector('[data-rv-stop]').addEventListener('click', () => go(k + 1));
        };
        retry = mountBoard(redAt(k), (iccs) => {
            const sc = alt[iccs];
            tries++;
            if (sc !== undefined && sc >= bestScore - 60) {
                retry.set(fens[k], null, { arrows: [{ ...sq(iccs), color: '#2f6b5e' }], noAnim: true, silent: true });
                retry.lock(true);
                msg(`Chính xác! <b>${escapeHtml(noteOf(k, iccs))}</b> là nước tốt${iccs === an.moves[k].b ? ' nhất' : ''} ở thế này.`, 'rv-best');
                track('review_retry', { result: 'ok', tries });
                toast('Tìm đúng nước tốt hơn!', { kind: 'xp', iconName: 'check-circle' });
            } else if (tries >= 3) {
                retry.set(fens[k], null, { arrows: [{ ...sq(an.moves[k].b), color: '#2f6b5e' }], noAnim: true, silent: true });
                retry.lock(true);
                msg(`Chưa đúng. Nước máy đề xuất: <b>${escapeHtml(noteOf(k, an.moves[k].b))}</b> (mũi tên xanh).`, 'rv-mistake');
                track('review_retry', { result: 'fail', tries });
            } else {
                retry.set(fens[k], null, { noAnim: true, silent: true });
                msg(`<b>${escapeHtml(noteOf(k, iccs))}</b> chưa phải nước tốt hơn — thử lại (còn ${3 - tries} lần).`, 'rv-mistake');
            }
        });
        retry.set(fens[k], k ? steps[k - 1].iccs : null, { noAnim: true, silent: true });
        msg('Bấm quân rồi bấm ô đích để đi nước bạn cho là tốt hơn nước đã chơi.');
    }
    function stopRetry() {
        retry = null;
        board = mountBoard(true, null);
        board.lock(true);
    }

    // ---------- Thanh ưu thế + biểu đồ ----------
    function renderBar() {
        const fill = $('[data-rv-evalfill]'), lbl = $('[data-rv-evallabel]');
        if (!an) { fill.style.width = '50%'; lbl.textContent = ''; return; }
        const e = an.evals[idx];
        fill.style.width = wp(e).toFixed(1) + '%';
        lbl.textContent = fmt(e);
    }
    const graphEl = $('[data-rv-graph]');
    function drawGraph() {
        if (!an) { graphEl.hidden = true; return; }
        graphEl.hidden = false;
        const W = 600, H = 120, pad = 4;
        const x = (k) => pad + (W - 2 * pad) * (n ? k / n : 0);
        const y = (e) => H / 2 - (H / 2 - pad) * (wp(e) - 50) / 50;
        const pts = an.evals.map((e, k) => `${x(k).toFixed(1)},${y(e).toFixed(1)}`).join(' ');
        const dots = an.moves.map((m, i) => (['mistake', 'blunder', 'inacc'].includes(m.c)
            ? `<circle cx="${x(i + 1).toFixed(1)}" cy="${y(an.evals[i + 1]).toFixed(1)}" r="${m.c === 'inacc' ? 3 : 4.5}" class="rv-dot rv-${CLS[m.c].tone}"/>` : '')).join('');
        graphEl.querySelector('[data-rv-svg]').innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" class="rv-svg" role="img" aria-label="Biểu đồ ưu thế">
            <polygon points="${x(0)},${H} ${pts} ${x(n)},${H}" class="rv-area"/>
            <line x1="0" y1="${H / 2}" x2="${W}" y2="${H / 2}" class="rv-mid"/>
            <line x1="${x(idx)}" y1="0" x2="${x(idx)}" y2="${H}" class="rv-cur"/>${dots}</svg>`;
    }
    graphEl.addEventListener('click', (e) => {
        if (!an) return;
        const r = graphEl.querySelector('svg').getBoundingClientRect();
        go(Math.round((e.clientX - r.left) / r.width * n), { hint: true });
    });

    // ---------- Tổng kết ----------
    function renderSummary() {
        const box = $('[data-rv-summary]');
        if (running) return;
        if (!an) {
            box.innerHTML = `<div class="rv-sum__head">${icon('chart')} Phân tích ván bằng máy</div>
                <p class="text-[14px] text-ink-soft">Máy chấm từng nước của cả hai bên, chỉ ra sai lầm, nước tốt hơn và độ chính xác của bạn.${coup ? ' Cờ úp: máy chỉ biết túi quân chưa lộ, đánh giá theo xác suất.' : ''}</p>
                ${cfg.canAnalyse ? `<button type="button" class="btn btn--primary w-full mt-3" data-rv-run>${icon('sparkles')} Phân tích ván</button>` : '<p class="text-[13px] text-ink-faint">Ván này chưa được phân tích.</p>'}`;
            box.querySelector('[data-rv-run]')?.addEventListener('click', run);
            return;
        }
        const count = (side) => {
            const c = { book: 0, best: 0, good: 0, inacc: 0, mistake: 0, blunder: 0 };
            an.moves.forEach((m, i) => { if ((redAt(i) ? 'do' : 'den') === side) c[m.c]++; });
            return c;
        };
        const col = (side) => {
            const c = count(side), acc = an.acc?.[side];
            const who = (side === 'do' ? 'Đỏ' : 'Đen') + (cfg.you === side ? ` (${escapeHtml(cfg.youName)})` : '');
            return `<div class="rv-acc"><span class="side-dot ${side}"></span><b>${who}</b>
                <span class="rv-acc__num">${acc !== undefined ? Math.round(acc) + '%' : '—'}</span><small>độ chính xác</small>
                <ul>${Object.entries(CLS).map(([key, k]) => `<li><span class="rv-mark rv-${k.tone}">${k.mark}</span>${k.label}<b>${c[key]}</b></li>`).join('')}</ul></div>`;
        };
        box.innerHTML = `<div class="rv-sum__head">${icon('chart')} Đánh giá của máy</div><div class="rv-accs">${col('do')}${col('den')}</div>`;
        renderMoments();
    }
    function renderMoments() {
        const box = $('[data-rv-moments]');
        const list = an.moves.map((m, i) => ({ ...m, i })).filter((m) => m.c === 'mistake' || m.c === 'blunder')
            .sort((a, b) => b.l - a.l).slice(0, 6).sort((a, b) => a.i - b.i);
        box.hidden = false;
        box.innerHTML = `<div class="rv-sum__head">${icon('target')} Khoảnh khắc quyết định</div>` + (list.length
            ? list.map((m) => `<button type="button" class="rv-moment" data-go="${m.i + 1}"><span class="rv-mark rv-${CLS[m.c].tone}">${CLS[m.c].mark}</span>
                <span class="flex-1 min-w-0"><b>Nước ${Math.ceil((m.i + 1) / 2)} · ${redAt(m.i) ? 'Đỏ' : 'Đen'}${cfg.you === (redAt(m.i) ? 'do' : 'den') ? ` (${escapeHtml(cfg.youName)})` : ''}</b>
                <span class="block text-[12.5px] text-ink-soft truncate">${escapeHtml(steps[m.i].wxf)} → nên đi ${escapeHtml(m.b ? noteOf(m.i, m.b) : '?')}</span></span>${icon('chev-right')}</button>`).join('')
            : '<p class="text-[14px] text-ink-soft">Không có sai lầm lớn nào — ván cờ chặt chẽ!</p>');
        box.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => {
            go(+b.dataset.go, { better: true });
            $('[data-rv-board]').scrollIntoView({ behavior: 'smooth', block: 'center' });
        }));
    }

    // ---------- Chạy phân tích ----------
    async function run() {
        if (running) return;
        running = true;
        track('review_start', { plies: n, coup });
        const box = $('[data-rv-summary]');
        box.innerHTML = `<div class="rv-sum__head">${icon('chart')} Đang phân tích…</div>
            <div class="progress progress--primary mt-2"><div class="progress__bar" data-rv-prog style="width:0%"></div></div>
            <p class="text-[13px] text-ink-soft mt-2" data-rv-progtext>Đang chuẩn bị máy…</p>`;
        const total = n + 1, res = new Array(total);
        const workers = Math.max(1, Math.min(4, (navigator.hardwareConcurrency || 2) - 1));
        const t0 = Date.now();
        const prog = (pct, text) => {
            box.querySelector('[data-rv-prog]').style.width = pct + '%';
            box.querySelector('[data-rv-progtext]').textContent = text;
        };
        // Chấm 1 danh sách thế cờ song song trên nhiều worker.
        const pass = (list, opts, label) => {
            let done = 0, next = 0;
            const t1 = Date.now();
            return Promise.all(Array.from({ length: Math.min(workers, list.length) }, () => new Promise((resolve) => {
                const w = new Worker(new URL('./engine/worker.js', import.meta.url), { type: 'module' });
                const take = () => {
                    if (next >= list.length) { w.terminate(); resolve(); return; }
                    const k = list[next++];
                    w.onmessage = (e) => {
                        res[k] = e.data;
                        done++;
                        const left = Math.round((Date.now() - t1) / done * (list.length - done) / 1000);
                        prog(Math.round(done / list.length * 100), `${label} ${done}/${list.length}${done > 3 && left > 0 ? ` · còn khoảng ${left} giây` : ''}`);
                        take();
                    };
                    w.postMessage({ id: k, review: true, fen: fens[k], red: redAt(k), pools: coup ? pools[k] : undefined, ...opts });
                };
                take();
            })));
        };
        // Lượt 1: chấm nhanh mọi thế (cờ úp 6 mẫu × 0,4s).
        await pass(Array.from({ length: total }, (_, k) => k), { timeMs: coup ? 2400 : 1200 }, 'Đã chấm');
        // Lượt 2: kiểm tra KỸ (gấp 3 thời gian, cờ úp 8 mẫu) các nước bị đánh dấu chưa tốt — chính là các nước người chơi
        // cần xem; đo trên ván thật: lượt nhanh có lúc chấm "sai lầm" cho nước thật ra dẫn tới bị chiếu hết, hoặc ngược lại.
        const doubt = build(res).moves.map((m, k) => (['inacc', 'mistake', 'blunder'].includes(m.c) ? k : -1)).filter((k) => k >= 0);
        if (doubt.length) {
            prog(0, `Đang kiểm tra kỹ ${doubt.length} nước đáng chú ý…`);
            await pass(doubt, coup ? { timeMs: 7200, samples: 8 } : { timeMs: 3600 }, 'Kiểm tra kỹ');
        }
        an = build(res);
        running = false;
        renderList(); renderSummary(); go(idx);
        track('review_done', { plies: n, secs: Math.round((Date.now() - t0) / 1000) });
        if (cfg.saveUrl) {
            postJson(cfg.saveUrl, { analysis: an }).then((res) => {
                if (res?.mistakes) {
                    const box = $('[data-rv-summary]');
                    box.insertAdjacentHTML('beforeend', `<a class="btn btn--primary w-full mt-3" href="${escapeHtml(res.mistakesUrl)}">${icon('target')} Luyện lại ${res.mistakes} sai lầm của bạn</a>`);
                    toast(`Đã thêm ${res.mistakes} thế vào "Sai lầm của tôi" để luyện lại.`, { kind: 'xp', iconName: 'target', timeout: 4500 });
                }
            }).catch(() => toast('Không lưu được kết quả phân tích — sẽ cần phân tích lại lần sau.', { kind: 'err' }));
        }
    }

    function build(res) {
        const evals = res.map((r, k) => {
            if (!r) return 0;
            const s = r.best ? r.score : (r.score ?? 0);
            return redAt(k) ? s : -s;
        });
        const moves = [], alts = {}, accs = { do: [], den: [] };
        steps.forEach((s, i) => {
            const r = res[i] || {}, scores = r.scores || {};
            const best = r.best || null;
            const bestSc = clamp(r.score ?? 0);
            const played = clamp(scores[s.iccs] ?? -(res[i + 1]?.score ?? 0));
            let loss = Math.max(0, bestSc - played);
            // Thế đã thắng chắc / thua chắc: kéo dài đường chiếu hết không phải "sai lầm".
            if ((bestSc >= 1500 && played >= 1200) || bestSc <= -1500) loss = Math.min(loss, 40);
            // Nước nằm trong book khai cuộc (cờ tướng, thế mở chuẩn) = "Nước sách", không chấm theo độ sâu tìm ngắn.
            const inBook = !coup && bookMoves(fens[i], redAt(i)).some((x) => x.move === s.iccs);
            // Cờ úp: điểm là trung bình qua vài cách xếp quân úp (sai số ±50) → ngưỡng rộng hơn để không gắn nhãn oan.
            const [tBest, tGood, tInacc, tMist] = coup ? [30, 90, 200, 400] : [15, 60, 150, 350];
            const c = inBook ? 'book' : (best === s.iccs || loss <= tBest) ? 'best' : loss < tGood ? 'good' : loss < tInacc ? 'inacc' : loss < tMist ? 'mistake' : 'blunder';
            if (inBook) loss = 0;
            moves.push({ b: best, l: Math.round(loss), c });
            const side = redAt(i) ? 'do' : 'den';
            accs[side].push(inBook ? 100 : Math.max(0, Math.min(100, 103.1668 * Math.exp(-0.04354 * (wp(bestSc) - wp(played))) - 3.1669)));
            if (!['book', 'best', 'good'].includes(c)) {
                alts[i] = Object.fromEntries(Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, 14));
            }
        });
        const avg = (a) => (a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length * 10) / 10 : undefined);
        return { v: 1, evals, moves, acc: { do: avg(accs.do), den: avg(accs.den) }, alts };
    }

    renderList();
    renderSummary();
    go(n);
    if (an) renderMoments();
}
