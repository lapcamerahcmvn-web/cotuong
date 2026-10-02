// Biên bản ván cờ (ký hiệu Việt) + khay quân bị ăn + túi quân úp còn lại — cờ tướng & cờ úp.
// Cờ úp: nước của quân úp ghi theo binh chủng ô xuất phát + "(lật Mã)"; ăn quân đang úp ghi "ăn nắp: Xe".
// Danh tính quân bị ăn lấy từ `captured` (theo đúng thứ tự nước); "lúc bị ăn còn úp hay không" suy ra
// bằng cách dựng lại bàn công khai — không cần thêm dữ liệu từ server.
import { escapeHtml } from './core';

export const NAME = { R: 'Xe', N: 'Mã', B: 'Tượng', A: 'Sĩ', K: 'Tướng', C: 'Pháo', P: 'Tốt' };
const GLYPH = { K: '帥', A: '仕', B: '相', N: '馬', R: '俥', C: '炮', P: '兵', k: '將', a: '士', b: '象', n: '馬', r: '車', c: '砲', p: '卒' };
const VALUE = { R: 9, C: 4.5, N: 4, A: 2, B: 2, P: 1, K: 0 };
const ORDER = ['R', 'C', 'N', 'A', 'B', 'P'];
const SET = { R: 2, C: 2, N: 2, A: 2, B: 2, P: 5 };
const isHidden = (p) => p === 'X' || p === 'x';
const sideOf = (p) => (p === p.toUpperCase() ? 'do' : 'den');

/**
 * Phân tích ván: { notes, caps:[{p, hidden, by, ply}], pool:{do:{R:n..}, den:{..}}, hiddenLeft:{do,den} }.
 * `reveals[i]` = quân lật ra ở nước i (null nếu không), `captured` = quân bị ăn theo thứ tự.
 */
export function analyse(startFen, moves, reveals = [], captured = [], pool0 = null) {
    const R = window.XiangqiRules;
    const b = R.loadFen(startFen);
    const coup = b.some(isHidden);
    // pool0: túi quân úp lúc bắt đầu (ván từ thế tự chọn); mặc định đủ bộ 15 quân.
    const pool = pool0 ? { do: { ...pool0.do }, den: { ...pool0.den } } : { do: { ...SET }, den: { ...SET } };
    const caps = [];
    let ci = 0;
    const notes = moves.map((m, i) => {
        const f = R.fromIccs(m);
        const p = b[f.from], target = b[f.to];
        let note;
        if (isHidden(p)) {
            const role = R.posRole(f.from) || 'P';
            const tmp = b.slice();
            tmp[f.from] = p === 'X' ? role : role.toLowerCase();
            const rev = reveals[i];
            note = R.notation(tmp, f.from, f.to) + (rev ? ` (lật ${NAME[rev.toUpperCase()]})` : '');
            if (rev) pool[sideOf(rev)][rev.toUpperCase()]--;
            b[f.to] = rev || p;
        } else {
            note = R.notation(b, f.from, f.to);
            b[f.to] = p;
        }
        if (target) {
            const victim = captured[ci++] || target;
            const hidden = isHidden(target);
            const id = isHidden(victim) ? null : victim;
            if (hidden && id) pool[sideOf(id)][id.toUpperCase()]--;
            caps.push({ p: id || victim, hidden, by: sideOf(p === 'X' ? 'X' : p === 'x' ? 'x' : p), ply: i });
            note += hidden ? ` — ăn nắp${id ? ': ' + NAME[id.toUpperCase()] : ' (chưa rõ)'}` : (id ? ` — ăn ${NAME[id.toUpperCase()]}` : '');
        }
        b[f.from] = null;
        return note;
    });
    const hiddenLeft = coup ? { do: b.filter((x) => x === 'X').length, den: b.filter((x) => x === 'x').length } : null;
    return { notes, caps, pool: coup ? pool : null, hiddenLeft };
}

/** Giữ API cũ: chỉ lấy biên bản. */
export function buildNotes(startFen, moves, reveals = [], captured = []) {
    return analyse(startFen, moves, reveals, captured).notes;
}

export function renderNotes(listEl, notes) {
    let h = '';
    for (let i = 0; i < notes.length; i += 2) {
        const cell = (n, side) => {
            if (!n) return '';
            const nap = n.includes('ăn nắp');
            return `<span class="side-dot ${side}"></span>${escapeHtml(n).replace(/ — (ăn nắp[^<]*|ăn [^<]*)$/, (x, t) => ` <b class="${nap ? 'note-nap' : 'note-cap'}">${t}</b>`)}`;
        };
        h += `<div class="flex gap-2 py-1.5 border-b border-line text-[14px]"><span class="w-7 text-ink-faint font-bold shrink-0">${i / 2 + 1}.</span>
            <span class="flex-1 min-w-0">${cell(notes[i], 'do')}</span>
            <span class="flex-1 min-w-0">${cell(notes[i + 1], 'den')}</span></div>`;
    }
    listEl.innerHTML = h || '<p class="text-ink-faint text-[14px] m-0">Chưa có nước nào.</p>';
    listEl.scrollTop = listEl.scrollHeight;
}

const chip = (p, extra = '', title = '') => `<span class="cap-chip ${p === p.toUpperCase() ? 'is-red' : 'is-black'} ${extra}" title="${escapeHtml(title)}">${GLYPH[p] || '?'}</span>`;

/**
 * Khay quân bị ăn (+ cờ úp: đánh dấu "nắp", đếm số nắp đã ăn, túi quân úp còn lại của mỗi bên).
 * `a` = kết quả analyse(). `you` = 'do'|'den'|null để ghi "Bạn".
 * Luật cờ úp: ăn quân đang úp thì chỉ bên ăn biết là quân gì → trong ván, nắp đối phương ăn của mình hiện "?";
 * `opts.over` (hết ván): các nắp đó thành nút bấm để lật xem.
 */
export function renderCaptured(el, a, you = null, opts = {}) {
    if (!el) return;
    const total = a.caps.length;
    const row = (by) => {
        const list = a.caps.map((c, idx) => ({ ...c, idx })).filter((c) => c.by === by)
            .sort((x, y) => (VALUE[(y.p || '').toUpperCase()] || 0) - (VALUE[(x.p || '').toUpperCase()] || 0));
        const naps = list.filter((c) => c.hidden).length;
        const score = list.reduce((s, c) => s + (VALUE[(c.p || '').toUpperCase()] || 0), 0);
        const who = (by === 'do' ? 'Đỏ' : 'Đen') + (you === by ? ' (bạn)' : '');
        const chips = list.map((c) => {
            const unknown = isHidden(c.p);
            const secret = c.hidden && !unknown && opts.over && you && by !== you;   // hết ván: bấm để lật
            if (unknown) return chip(c.p, 'is-nap is-unknown', 'Ăn nắp: chưa biết là quân gì (nước ' + (Math.floor(c.ply / 2) + 1) + ')');
            if (secret) return `<button type="button" class="cap-chip ${c.p === c.p.toUpperCase() ? 'is-red' : 'is-black'} is-nap is-secret" data-real="${GLYPH[c.p]}" data-name="${escapeHtml(NAME[c.p.toUpperCase()])}" title="Bấm để lật nắp">?</button>`;
            return chip(c.p, (c.hidden ? 'is-nap' : '') + (c.idx === total - 1 ? ' is-new' : ''),
                (c.hidden ? 'Ăn nắp: ' : 'Ăn: ') + (NAME[c.p.toUpperCase()] || '?') + ' (nước ' + (Math.floor(c.ply / 2) + 1) + ')');
        }).join('');
        return { html: `<div class="flex items-start gap-2 min-h-[30px]"><span class="side-dot ${by} mt-2"></span>
            <span class="text-[12.5px] font-bold text-ink-soft w-20 shrink-0 pt-1">${who} ăn${naps ? `<span class="block font-semibold text-ink-faint">${naps} nắp</span>` : ''}</span>
            <span class="flex flex-wrap gap-1 flex-1">${chips || '<span class="text-ink-faint text-[13px] pt-1">—</span>'}</span></div>`, score };
    };
    const r = row('do'), d = row('den');
    const diff = r.score - d.score;
    const unknownAny = a.caps.some((c) => isHidden(c.p));
    let html = `<div class="flex items-center justify-between mb-1"><span class="font-extrabold text-[14px]">Quân bị ăn</span>
        ${diff && !unknownAny ? `<span class="text-[12.5px] font-bold text-jade-ink">${diff > 0 ? 'Đỏ' : 'Đen'} hơn ${Math.abs(diff)} điểm</span>` : ''}</div>` + r.html + d.html;
    if (opts.over && a.caps.some((c) => c.hidden && !isHidden(c.p) && you && c.by !== you)) {
        html += '<p class="text-[12.5px] text-ink-soft mt-1 mb-0">Ván đã xong — bấm vào nắp “?” để lật xem quân bị ăn.</p>';
    }

    if (a.pool) {
        const poolRow = (side) => {
            const left = a.hiddenLeft[side];
            // Nắp của bên này bị ăn mà mình chưa biết là gì vẫn nằm trong "túi chưa lộ" → xác suất chia cho cả túi.
            const unknown = a.caps.filter((c) => isHidden(c.p) && sideOf(c.p) === side).length;
            const bag = ORDER.reduce((n, t) => n + Math.max(0, a.pool[side][t]), 0);
            const counts = ORDER.filter((t) => a.pool[side][t] > 0)
                .map((t) => {
                    const pct = Math.round(100 * a.pool[side][t] / Math.max(1, bag));
                    return `<span class="pool-item" title="Xác suất lật ra ${NAME[t]}: ${pct}%">${chip(side === 'do' ? t : t.toLowerCase(), 'is-sm')}<span class="leading-tight"><b>×${a.pool[side][t]}</b><small class="block text-[10.5px] text-ink-faint">${pct}%</small></span></span>`;
                }).join('');
            return `<div class="flex items-start gap-2 mt-1.5"><span class="side-dot ${side} mt-2"></span>
                <span class="text-[12.5px] font-bold text-ink-soft w-20 shrink-0 pt-1">${side === 'do' ? 'Đỏ' : 'Đen'} còn úp<span class="block font-semibold text-ink-faint">${left} quân${unknown ? ` · ${unknown} nắp bị ăn chưa rõ` : ''}</span></span>
                <span class="flex flex-wrap gap-x-2 gap-y-1 flex-1">${counts || '<span class="text-ink-faint text-[13px] pt-1">Đã lật hết</span>'}</span></div>`;
        };
        html += `<div class="border-t border-line mt-3 pt-3"><div class="font-extrabold text-[14px]">Quân úp còn lại
            <span class="font-semibold text-[12px] text-ink-faint">— số lượng & xác suất lật ra</span></div>
            ${poolRow('do')}${poolRow('den')}</div>`;
    }
    el.innerHTML = html;
    el.querySelectorAll('.is-secret').forEach((b) => b.addEventListener('click', () => {
        b.textContent = b.dataset.real;
        b.classList.remove('is-secret');
        b.classList.add('is-flipped');
        b.title = 'Nắp này là: ' + b.dataset.name;
    }, { once: true }));
}

/** Thông báo khi vừa có quân bị ăn lúc còn úp. Trả về {p, by} nếu nước cuối là ăn nắp. */
export function lastNap(a, movesCount) {
    const c = a.caps[a.caps.length - 1];
    return c && c.hidden && c.ply === movesCount - 1 ? c : null;
}
