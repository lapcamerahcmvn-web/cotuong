// Biên bản ván cờ (ký hiệu Việt) cho cờ tướng + cờ úp, và khay quân bị ăn.
// Cờ úp: nước của quân úp ghi theo binh chủng ô xuất phát + "(lật Mã)".
import { escapeHtml } from './core';

export const NAME = { R: 'Xe', N: 'Mã', B: 'Tượng', A: 'Sĩ', K: 'Tướng', C: 'Pháo', P: 'Tốt' };
const GLYPH = { K: '帥', A: '仕', B: '相', N: '馬', R: '俥', C: '炮', P: '兵', k: '將', a: '士', b: '象', n: '馬', r: '車', c: '砲', p: '卒' };
const VALUE = { R: 9, C: 4.5, N: 4, A: 2, B: 2, P: 1, K: 0 };

/** Dựng biên bản từ thế đầu + danh sách nước (+ quân lật ra ở từng nước, null nếu không lật). */
export function buildNotes(startFen, moves, reveals = []) {
    const R = window.XiangqiRules;
    const b = R.loadFen(startFen);
    return moves.map((m, i) => {
        const f = R.fromIccs(m);
        const p = b[f.from];
        let note;
        if (p === 'X' || p === 'x') {
            const role = R.posRole(f.from) || 'P';
            const tmp = b.slice();
            tmp[f.from] = p === 'X' ? role : role.toLowerCase();
            const rev = reveals[i];
            note = R.notation(tmp, f.from, f.to) + (rev ? ` (lật ${NAME[rev.toUpperCase()]})` : '');
            b[f.to] = rev || p;
        } else {
            note = R.notation(b, f.from, f.to);
            b[f.to] = p;
        }
        b[f.from] = null;
        return note;
    });
}

export function renderNotes(listEl, notes) {
    let h = '';
    for (let i = 0; i < notes.length; i += 2) {
        h += `<div class="flex gap-2 py-1.5 border-b border-line text-[14px]"><span class="w-7 text-ink-faint font-bold shrink-0">${i / 2 + 1}.</span>
            <span class="flex-1 min-w-0"><span class="side-dot do"></span>${escapeHtml(notes[i])}</span>
            <span class="flex-1 min-w-0">${notes[i + 1] ? '<span class="side-dot den"></span>' + escapeHtml(notes[i + 1]) : ''}</span></div>`;
    }
    listEl.innerHTML = h || '<p class="text-ink-faint text-[14px] m-0">Chưa có nước nào.</p>';
    listEl.scrollTop = listEl.scrollHeight;
}

/** Khay quân bị ăn: Đỏ ăn được (quân Đen) và Đen ăn được (quân Đỏ), kèm chênh lệch vật chất. */
export function renderCaptured(el, captured, hiddenLeft = null) {
    if (!el) return;
    const byRed = captured.filter((p) => p === p.toLowerCase());     // Đỏ ăn quân Đen
    const byBlack = captured.filter((p) => p === p.toUpperCase());
    const score = (arr) => arr.reduce((s, p) => s + (VALUE[p.toUpperCase()] || 0), 0);
    const diff = score(byRed) - score(byBlack);
    const chips = (arr) => arr.sort((a, b) => (VALUE[b.toUpperCase()] || 0) - (VALUE[a.toUpperCase()] || 0))
        .map((p) => `<span class="cap-chip ${p === p.toUpperCase() ? 'is-red' : 'is-black'}" title="${NAME[p.toUpperCase()]}">${GLYPH[p] || '?'}</span>`).join('');
    el.innerHTML = `
        <div class="flex items-center gap-2 min-h-[28px]"><span class="side-dot do"></span><span class="text-[12.5px] font-bold text-ink-soft w-16 shrink-0">Đỏ ăn</span><span class="flex flex-wrap gap-1">${chips(byRed) || '<span class="text-ink-faint text-[13px]">—</span>'}</span>${diff > 0 ? `<b class="ml-auto text-[13px] text-jade-ink">+${diff}</b>` : ''}</div>
        <div class="flex items-center gap-2 min-h-[28px] mt-1"><span class="side-dot den"></span><span class="text-[12.5px] font-bold text-ink-soft w-16 shrink-0">Đen ăn</span><span class="flex flex-wrap gap-1">${chips(byBlack) || '<span class="text-ink-faint text-[13px]">—</span>'}</span>${diff < 0 ? `<b class="ml-auto text-[13px] text-jade-ink">+${-diff}</b>` : ''}</div>
        ${hiddenLeft ? `<div class="text-[12.5px] text-ink-faint mt-2">Còn úp: Đỏ ${hiddenLeft.red} · Đen ${hiddenLeft.black}</div>` : ''}`;
}
