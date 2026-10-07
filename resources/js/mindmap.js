// Sơ đồ tư duy (components/mindmap.blade.php): HTML <details> có sẵn từ server; ở đây thêm công cụ học thuộc:
//  - Mở hết / Thu gọn, tìm theo tên thế hoặc chữ trong khẩu quyết (tự mở nhánh khớp).
//  - "Che khẩu quyết": làm mờ từng câu — tự nhẩm trước, bấm vào câu để lật (học chủ động, nhớ lâu hơn đọc lại).
//  - "Đã thuộc": đánh dấu từng thế, đếm theo nhánh + thanh tiến độ (lưu localStorage theo sơ đồ, không cần đăng nhập).
//  - "Ôn ngẫu nhiên": thẻ ghi nhớ — hiện tên thế + bàn cờ, tự nhớ khẩu quyết rồi lật; thế chưa thuộc được hỏi trước.
//  - Bàn cờ thu nhỏ chỉ vẽ khi mở nhánh (sơ đồ có thể >100 thế).
import { loadBoard, store, save, escapeHtml, icon, track } from './core';
import { openSheet } from './gamification';

export function init() {
    document.querySelectorAll('[data-mindmap]').forEach(setup);
}

function setup(root) {
    const id = root.dataset.mindmap;
    const KEY = 'xq.mm.' + id;
    const done = new Set(store(KEY, []));
    const leaves = [...root.querySelectorAll('.mm-leaf')];
    const $ = (s) => root.querySelector(s);
    root.querySelectorAll('[data-mm-tools], [data-mm-progress]').forEach((x) => { x.hidden = false; });

    // ---- Bàn cờ thu nhỏ: vẽ khi nhánh được mở ----
    const drawThumbs = (scope) => {
        const pending = [...scope.querySelectorAll('[data-mm-fen]:not([data-drawn])')].filter((el) => el.offsetParent !== null);
        if (!pending.length) return;
        loadBoard().then(() => pending.forEach((el) => {
            el.dataset.drawn = '1';
            el.innerHTML = window.XiangqiBoard.render(el.dataset.mmFen, null, null, null, el.dataset.flip === '1', { thumb: true });
        }));
    };
    root.addEventListener('toggle', (e) => { if (e.target.open) drawThumbs(e.target); }, true);

    // ---- Đã thuộc ----
    const keyOf = (li) => li.dataset.mmKey;
    function refresh() {
        leaves.forEach((li) => {
            const on = done.has(keyOf(li));
            li.classList.toggle('is-done', on);
            const cb = li.querySelector('[data-mm-done]');
            if (cb) cb.checked = on;
        });
        root.querySelectorAll('.mm-branch').forEach((b) => {
            const ls = b.querySelectorAll('.mm-leaf');
            const n = [...ls].filter((li) => done.has(keyOf(li))).length;
            const out = b.querySelector(':scope > details > summary [data-mm-branch-done]');
            if (out) out.textContent = n ? `${n}/` : '';
            b.classList.toggle('is-done', n === ls.length && n > 0);
        });
        const n = leaves.filter((li) => done.has(keyOf(li))).length;
        $('[data-mm-done-n]').textContent = n;
        $('[data-mm-bar]').style.width = (leaves.length ? Math.round(100 * n / leaves.length) : 0) + '%';
    }
    function mark(key, on) {
        on ? done.add(key) : done.delete(key);
        save(KEY, [...done]);
        refresh();
    }
    root.addEventListener('change', (e) => {
        const cb = e.target.closest('[data-mm-done]');
        if (!cb) return;
        mark(keyOf(cb.closest('.mm-leaf')), cb.checked);
        if (cb.checked) track('mindmap_learned', { map: id });
    });
    refresh();

    // ---- Mở hết / thu gọn ----
    const all = () => root.querySelectorAll('details');
    $('[data-mm-expand]').addEventListener('click', () => { all().forEach((d) => { d.open = true; }); drawThumbs(root); });
    $('[data-mm-collapse]').addEventListener('click', () => all().forEach((d) => { d.open = d.parentElement.classList.contains('mm-d1') && !d.parentElement.classList.contains('mm-leaf'); }));

    // ---- Che khẩu quyết: bấm từng câu để lật ----
    const hideBtn = $('[data-mm-hide]');
    hideBtn.addEventListener('click', () => {
        const on = root.classList.toggle('mm-recall');
        hideBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
        hideBtn.classList.toggle('btn--primary', on);
        root.querySelectorAll('.mm-verse li.is-shown').forEach((x) => x.classList.remove('is-shown'));
        if (on) track('mindmap_recall', { map: id });
    });
    root.addEventListener('click', (e) => {
        const li = e.target.closest('.mm-verse li');
        if (li && root.classList.contains('mm-recall')) li.classList.toggle('is-shown');
    });

    // ---- Tìm kiếm ----
    const norm = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/gi, 'd').toLowerCase();
    const searchText = new Map(leaves.map((li) => [li, norm(li.textContent)]));
    let t = null;
    $('[data-mm-search]').addEventListener('input', (e) => {
        clearTimeout(t);
        t = setTimeout(() => {
            const q = norm(e.target.value.trim());
            let hits = 0;
            leaves.forEach((li) => {
                const ok = !q || searchText.get(li).includes(q);
                li.hidden = !ok;
                if (ok) hits++;
            });
            root.querySelectorAll('.mm-branch').forEach((b) => {
                const any = [...b.querySelectorAll('.mm-leaf')].some((li) => !li.hidden);
                b.hidden = !any;
                if (q && any) b.querySelector(':scope > details').open = true;
            });
            $('[data-mm-empty]').hidden = hits > 0;
            if (q) drawThumbs(root);
        }, 200);
    });

    // ---- Ôn ngẫu nhiên (thẻ ghi nhớ) ----
    $('[data-mm-quiz]').addEventListener('click', () => quiz());
    function pathOf(li) {
        const out = [];
        for (let b = li.parentElement.closest('.mm-branch'); b; b = b.parentElement.closest('.mm-branch')) {
            out.unshift(b.querySelector(':scope > details > summary .mm-title').textContent.trim());
        }
        return out.join(' › ');
    }
    function quiz() {
        let seen = 0, ok = 0;
        const dlg = openSheet('<div data-q></div>');
        const box = dlg.querySelector('[data-q]');
        track('mindmap_quiz', { map: id });
        next();
        function pick() {
            const pool = leaves.filter((li) => !done.has(keyOf(li)));
            const from = pool.length ? pool : leaves;
            return from[Math.floor(Math.random() * from.length)];
        }
        function next() {
            const li = pick();
            const title = li.querySelector('.mm-title').textContent.trim();
            const num = li.querySelector('.mm-num').textContent.trim();
            const thumb = li.querySelector('[data-mm-fen]');
            const verses = [...li.querySelectorAll('.mm-verse li')].map((x) => x.textContent.trim());
            const link = li.querySelector('.mm-actions a');
            const remaining = leaves.filter((x) => !done.has(keyOf(x))).length;
            box.innerHTML = `<div class="mm-quiz">
                <div class="text-[12.5px] font-bold text-ink-faint uppercase tracking-wide">${escapeHtml(pathOf(li))}</div>
                <h2 class="text-xl font-extrabold mt-1 mb-3">${escapeHtml(num)} · ${escapeHtml(title)}</h2>
                ${thumb ? `<div class="mm-quiz__board" data-qboard></div>` : ''}
                <p class="text-[14px] text-ink-soft">Nhẩm lại ${verses.length} câu khẩu quyết của thế này rồi bấm lật để kiểm tra.</p>
                <ol class="mm-verse mm-quiz__verse" data-qverse hidden>${verses.map((v) => `<li>${escapeHtml(v)}</li>`).join('')}</ol>
                <div class="flex flex-wrap gap-2 mt-3" data-qact>
                    <button type="button" class="btn btn--primary" data-flip-q>${icon('eye')} Lật khẩu quyết</button>
                </div>
                <p class="text-[12.5px] text-ink-faint mt-3 mb-0">Phiên này: nhớ ${ok}/${seen} · còn ${remaining} thế chưa thuộc trong sơ đồ.</p>
            </div>`;
            if (thumb) loadBoard().then(() => { box.querySelector('[data-qboard]').innerHTML = window.XiangqiBoard.render(thumb.dataset.mmFen, null, null, null, thumb.dataset.flip === '1', { thumb: true }); });
            box.querySelector('[data-flip-q]').addEventListener('click', () => {
                box.querySelector('[data-qverse]').hidden = false;
                box.querySelector('[data-qact]').innerHTML = `
                    <button type="button" class="btn btn--primary" data-yes>${icon('check')} Tôi nhớ đúng</button>
                    <button type="button" class="btn" data-no>${icon('repeat')} Chưa nhớ — ôn lại sau</button>
                    ${link ? `<a class="btn btn--ghost" href="${link.getAttribute('href')}" target="_blank" rel="noopener">${icon('book')} Xem ví dụ</a>` : ''}`;
                box.querySelector('[data-yes]').addEventListener('click', () => { seen++; ok++; mark(keyOf(li), true); next(); });
                box.querySelector('[data-no]').addEventListener('click', () => { seen++; mark(keyOf(li), false); next(); });
            });
        }
    }
}
