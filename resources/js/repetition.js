// Luật LẶP NƯỚC phía trình duyệt (chơi với máy) — bản tương ứng của app/Support/Xiangqi/Repetition.php (đấu bạn).
//  - Thế cờ (bàn + lượt) lặp lần 3: bên nào trong vòng lặp MỌI nước đều chiếu / đuổi bắt quân (dọa ăn quân không được
//    bảo vệ, hoặc Mã/Pháo dọa ăn Xe) mà bên kia không → bên đó THUA; còn lại → HOÀ.
//  - Lặp lần 2 → báo trước (notice); sắp lặp lần 3 → hỏi người chơi xác nhận.
// Mục lịch sử: { key, check, side: 'do'|'den'|null, before, after, from, to, coup }.

/** Nước from→to của bên `moverRed` có đuổi bắt quân đối phương (tạo đe doạ ăn MỚI) không. */
export function chase(before, after, from, to, moverRed, coup) {
    const R = window.XiangqiRules;
    const p = after[to];
    if (!p) return false;
    const t = p.toUpperCase();
    for (let s = 0; s < 90; s++) {
        const q = after[s];
        if (!q || R.isRed(q) === moverRed) continue;
        const qt = q.toUpperCase();
        if (qt === 'K' || qt === 'P') continue;
        if (!R.legalMove(after, to, s, false, coup)) continue;
        if (before[from] && s !== from && R.legalMove(before, from, s, false, coup)) continue;   // đã dọa từ trước
        const b2 = after.slice();
        b2[s] = p; b2[to] = null;
        if (R.inCheck(b2, moverRed, coup)) continue;
        let prot = false;
        for (let d = 0; d < 90 && !prot; d++) {
            const r = b2[d];
            if (r && R.isRed(r) !== moverRed && R.legalNoSelfCheck(b2, d, s, false, coup)) prot = true;
        }
        if (!prot || (qt === 'R' && (t === 'N' || t === 'C'))) return true;
    }
    return false;
}

function spanOf(h) {
    const last = h[h.length - 1].key;
    const idx = h.map((x, i) => (x.key === last ? i : -1)).filter((i) => i >= 0);
    return [idx.length, h.slice(idx[0] + 1)];
}

function offense(span) {
    const out = {};
    for (const side of ['do', 'den']) {
        const mine = span.filter((x) => x.side === side);
        out[side] = {
            check: mine.length > 0 && mine.every((x) => x.check),
            off: mine.length > 0 && mine.every((x) => x.check || chase(x.before, x.after, x.from, x.to, side === 'do', x.coup)),
        };
    }
    return out;
}

/** Lặp lần 3 → { result: 'do'|'den'|'hoa', reason }; chưa → null. */
export function verdict(h) {
    const [n, span] = spanOf(h);
    if (n < 3) return null;
    const o = offense(span);
    for (const [side, opp] of [['do', 'den'], ['den', 'do']]) {
        if (o[side].off && !o[opp].off) return { result: opp, reason: o[side].check ? 'chiếu dai (lặp 3 lần)' : 'đuổi bắt quân dai (lặp 3 lần)' };
    }
    return { result: 'hoa', reason: 'lặp lại thế cờ 3 lần' };
}

/** Thế hiện tại đã lặp 2 lần → câu báo trước cho người chơi `viewer`. */
export function notice(h, viewer, oppName = 'đối phương') {
    const [n, span] = spanOf(h);
    if (n !== 2) return null;
    const o = offense(span), opp = viewer === 'do' ? 'den' : 'do';
    if (o[viewer].off && !o[opp].off) return `Thế cờ đã lặp lại 2 lần và bạn đang ${o[viewer].check ? 'chiếu' : 'đuổi bắt quân'} liên tục — nếu lặp lần 3 bạn sẽ bị XỬ THUA. Hãy đổi nước.`;
    if (o[opp].off && !o[viewer].off) return `Thế cờ đã lặp lại 2 lần — ${oppName} đang ${o[opp].check ? 'chiếu' : 'đuổi bắt quân'} liên tục; nếu lặp thêm lần nữa sẽ bị xử thua.`;
    return 'Thế cờ đã lặp lại 2 lần — nếu lặp lần 3 ván sẽ xử HOÀ.';
}
