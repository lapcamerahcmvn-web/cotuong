// Sửa 2 bài "Nền tảng nguyên lý trung cuộc" có lỗi luật (xem tools/rules-audit/README.md):
//  1) thuat-dung-ma-manh-nhat-ma-ngoa-tao: Mã đứng sẵn ở g8 chiếu Tướng Đen trong khi tới lượt Đỏ (thế không thể có)
//     → Mã chờ ở f6; Xe tiến sâu khoá hàng 8, Đen đi 1 nước, Mã nhảy vào ô ngọa tào chiếu hết.
//  2) xe-song-phao-…-ho-vinh-hoa: nước 7 Tướng Đỏ đi vào hàng Xe Đen (giải mã sai) → giữ 6 nước đầu, phần kết để engine đi:
//     Đỏ đỡ dai nhất, Đen dồn tới chiếu hết.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { mateIn, checkPuzzleMove } from '../../resources/js/engine/engine.js';

const require = createRequire(import.meta.url);
const { auditLesson, R } = require('./audit.cjs');
const IO = require('../trung-cuoc-bao-dien/content-io.cjs');
const file = path.join(IO.DIR, 'nen-tang-nguyen-ly-trung-cuoc.json');
const arr = JSON.parse(fs.readFileSync(file, 'utf8'));
const nt = (b, f, t) => R.notation(b, f, t).replace(/\s+/g, ' ').trim();
const legal = (b, red) => { const o = []; for (let f = 0; f < 90; f++) if (b[f] && R.isRed(b[f]) === red) for (let t = 0; t < 90; t++) if (R.legalNoSelfCheck(b, f, t, false, false)) o.push([f, t]); return o; };
const step = (b, iccs, i, caption) => {
  const m = R.fromIccs(iccs); const p = b[m.from], cap = b[m.to];
  const s = { step_order: i, move_notation_wxf: nt(b, m.from, m.to), move_notation_iccs: iccs, move_side: R.isRed(p) ? 'do' : 'den', moved_piece: p, captured_piece: cap || null, caption: null, is_flip_reveal: false };
  b[m.to] = p; b[m.from] = null; s.fen = R.toFen(b);
  s.caption = typeof caption === 'function' ? caption(s) : caption;
  return s;
};

// ---- 1) Mã ngọa tào ----
{
  const i = arr.findIndex((x) => x.slug === 'thuat-dung-ma-manh-nhat-ma-ngoa-tao');
  const l = arr[i];
  const b = R.loadFen(l.initial_fen);
  const g8 = R.fromIccs('g8g8').from, f6 = R.fromIccs('f6f6').from;
  b[f6] = b[g8]; b[g8] = null;
  l.initial_fen = R.toFen(b);
  const bb = b.slice();
  l.steps = [
    step(bb, 'b4b8', 1, (s) => `${s.move_notation_wxf} — Trắng đưa Xe tiến sâu, khoá chặt hàng ngang ngay trước Tướng Đen (ô e8). Mã đang chờ ở f6, chỉ còn một bước là vào vị trí "ngọa tào".`),
    step(bb, 'a4a5', 2, (s) => `${s.move_notation_wxf} — Đen không nhận ra nguy cơ, lui Xe về phòng thủ quá chậm.`),
    step(bb, 'f6g8', 3, (s) => `${s.move_notation_wxf} — Mã nhảy vào ô ngọa tào (cột 3 tính từ Đen, hàng thứ hai) chiếu Tướng. Xe ở hàng 8 khoá ô e8, hai Sĩ tự chặn d9 và f9 — Tướng Đen hết đường: chiếu hết.`),
  ];
  l.move_count = l.steps.length;
  const mate = !legal(R.loadFen(l.steps[2].fen), false).length;
  l.content = l.content.replace('đã sẵn sàng ở đúng vị trí đó', 'chỉ cần một bước là nhảy vào đúng vị trí đó');
  console.log('Mã ngọa tào:', auditLesson(l).errors.join(' | ') || '✓ hợp luật', mate ? '· chiếu hết' : '· CHƯA chiếu hết');
}

// ---- 2) Xe Song Pháo (Vương Bân vs Hồ Vinh Hoa) ----
{
  const i = arr.findIndex((x) => x.slug === 'xe-song-phao-hoa-luc-manh-nhat-van-vuong-ban-bai-ho-vinh-hoa');
  const l = arr[i];
  const old = l.steps.slice().sort((a, b) => a.step_order - b.step_order);
  const keep = old.slice(0, 6);
  let b = R.loadFen(keep[5].fen);
  const out = keep.map((s) => ({ ...s }));
  // Đỏ tới lượt, Đen là bên tấn công: Đỏ đỡ dai nhất (nước làm Đen cần nhiều nước nhất), Đen chiếu hết nhanh nhất.
  let n = 6, ok = false;
  for (let guard = 0; guard < 12; guard++) {
    let best = null, bestK = 0;
    for (const [f, t] of legal(b, true)) {
      const nb = b.slice(); nb[t] = nb[f]; nb[f] = null;
      const m = mateIn(R.toFen(nb), false, n, 6000);
      if (!m || m.timeout) { best = null; bestK = -1; break; }
      if (m.k > bestK) { bestK = m.k; best = [f, t]; }
    }
    if (!best) break;
    out.push(step(b, R.toIccs(best[0]) + R.toIccs(best[1]), out.length + 1, (s) => `${s.move_notation_wxf} — Trắng cố đỡ, nhưng thế trận đã không còn cứu được.`));
    const m = mateIn(R.toFen(b), false, bestK, 6000);
    out.push(step(b, m.move, out.length + 1, (s) => `${s.move_notation_wxf}${R.inCheck(R.loadFen(s.fen), true, false) ? ' — chiếu' : ''}.`));
    if (!legal(b, true).length) { ok = true; break; }
    n = bestK - 1;
  }
  if (ok) {
    const last = out[out.length - 1];
    last.caption = `${last.move_notation_wxf} — chiếu hết! Bộ ba Xe Song Pháo của Đen hoàn tất sát cục ở cánh bên — đúng sức mạnh mà bài học muốn chỉ ra.`;
    l.steps = out; l.move_count = out.length;
    console.log('Xe Song Pháo:', auditLesson(l).errors.join(' | ') || '✓ hợp luật', '·', out.slice(6).map((s) => s.move_notation_wxf).join(', '));
  } else {
    // Không có đường chiếu hết bắt buộc ngắn: dừng ở nước 6 (ý chính của bài) và tóm tắt phần kết trong lời giảng.
    const last = keep[5];
    last.caption = `${last.caption} Từ đây Đen giữ nguyên bộ ba Xe Song Pháo dồn ép cánh bên; Tướng Trắng bị đẩy tới lui không thoát khỏi vòng vây, cuối cùng đành nhận thua.`;
    l.steps = keep; l.move_count = keep.length;
    console.log('Xe Song Pháo: dừng ở nước 6 —', auditLesson(l).errors.join(' | ') || '✓ hợp luật');
  }
}
if (!process.argv.includes('--dry')) { fs.writeFileSync(file, IO.phpJson(arr)); console.log('→ ghi nen-tang-nguyen-ly-trung-cuoc.json'); }
