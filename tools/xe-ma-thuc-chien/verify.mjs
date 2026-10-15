// tools/xe-ma-thuc-chien/verify.mjs — Kiểm chứng kết quả "Đỏ thắng" của từng cuộc bằng engine của site.
// Sách thường dừng ở thế thắng chắc (chưa chiếu bí). Với thế cuối mạch chính (và cuối từng nhánh):
//   - đã hết nước → OK;
//   - bên thua đến lượt: với MỌI nước đỡ, bên thắng chiếu hết trong ≤ N nước → "chứng minh";
//   - không chứng minh được trong giới hạn → chấm điểm bằng search() và in ra để xem tay.
//   node tools/xe-ma-thuc-chien/verify.mjs [N=4] [lọc tên bài]
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadFen, legalMoves, toIccs, fromIccs, mateIn, search, gameOver, inCheck } from '../../resources/js/engine/engine.js';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const N = +(process.argv[2] || 4);
const FILTER = process.argv[3] || '';
const batch = JSON.parse(fs.readFileSync(path.resolve(HERE, '../trung-cuoc-bao-dien/batches/xe-ma-thuc-chien.json'), 'utf8'));

const toFen = (b) => { const rows = []; for (let r = 0; r < 10; r++) { let s = '', e = 0; for (let c = 0; c < 9; c++) { const p = b[r * 9 + c]; if (!p) e++; else { if (e) s += e; e = 0; s += p; } } if (e) s += e; rows.push(s); } return rows.join('/'); };
function play(fen, moves) { const b = loadFen(fen); for (const m of moves) { const [f, t] = fromIccs(m); b[t] = b[f]; b[f] = null; } return b; }

function judge(b, loserRed) {
  const over = gameOver(b, loserRed, false);
  if (over) return { ok: true, how: over.reason };
  const winnerRed = !loserRed;
  let worst = 0;
  for (const [f, t] of legalMoves(b, loserRed)) {
    const c = b[t]; b[t] = b[f]; b[f] = null;
    const r = mateIn(toFen(b), winnerRed, N, 3000);
    b[f] = b[t]; b[t] = c;
    if (!r || r.timeout) { worst = -1; break; }
    worst = Math.max(worst, r.k);
  }
  if (worst > 0) return { ok: true, how: `chiếu hết ≤ ${worst} nước sau mọi nước đỡ` };
  const s = search(toFen(b), loserRed, { depth: 6, timeMs: 3000 });
  const sc = s.score ?? 0;
  if (sc > -150) { const p = playout(b.slice(), loserRed); if (p) return p; }
  // Điểm theo bên đến lượt (bên thua): ≤ -150 ≈ bên thắng hơn rõ (≥ 1,5 Tốt) — coi là nhất quán với "thắng".
  return { ok: sc <= -150, soft: true, how: `${sc <= -150 ? 'hơn rõ' : 'KHÔNG hơn rõ'} — điểm bên thua ${sc}` };
}

// Đánh thử theo luật cấm chiếu dai: bên thua không được lặp lại thế cờ bằng nước chiếu (engine search() coi lặp là hòa,
// nên thế "Đen chỉ còn chiếu dai" bị chấm ≈ 0 dù theo luật Đen phải đổi nước và thua). Hai bên đều đi nước tốt nhất của engine.
function playout(b, loserRed) {
  const seen = new Map(); let red = loserRed;
  for (let ply = 0; ply < 80; ply++) {
    const over = gameOver(b, red, false);
    if (over) return red === loserRed ? { ok: true, how: `đánh thử (cấm chiếu dai): bên thua hết nước sau ${ply} nửa nước` } : null;
    const key = toFen(b) + (red ? 'w' : 'b'); seen.set(key, (seen.get(key) || 0) + 1);
    if (seen.get(key) >= 4) return null;
    const avoid = new Set();
    if (red === loserRed) for (const [f, t] of legalMoves(b, red)) {
      const c = b[t]; b[t] = b[f]; b[f] = null;
      if (inCheck(b, !red) && seen.has(toFen(b) + (!red ? 'w' : 'b'))) avoid.add(toIccs(f, t));
      b[f] = b[t]; b[t] = c;
    }
    const r = search(toFen(b), red, { depth: 9, timeMs: 8000, avoid });
    if (!r.move) return null;
    const sc = red === loserRed ? -r.score : r.score;   // điểm nhìn từ bên thắng
    if (sc >= 90000) return { ok: true, how: `đánh thử (cấm chiếu dai): sau ${ply} nửa nước engine thấy chiếu hết` };
    if (sc >= 600) return { ok: true, how: `đánh thử (cấm chiếu dai): sau ${ply} nửa nước bên thua mất quân, điểm ${sc}` };
    const [f, t] = fromIccs(r.move); b[t] = b[f]; b[f] = null; red = !red;
  }
  return null;
}

let bad = 0, n = 0;
for (const L of batch.lessons) {
  if (FILTER && !L.title.includes(FILTER)) continue;
  const lines = [{ name: 'mạch chính', moves: L.main, kq: L.kq }];   // L.kq do gen.cjs ghi vào batch
  (L.vars || []).forEach((v, j) => {
    const base = v.from === 'main' ? L.main : lines[v.from + 1].moves;
    lines.push({ name: `biến ${j}`, moves: base.slice(0, v.after).concat(v.moves), kq: v.kq });
  });
  for (const ln of lines) {
    if (ln.kq === 'hoa') {
      // Hòa: chỉ chấm điểm tham khảo — |điểm| lớn (> 300) nghĩa là engine thấy một bên hơn rõ, cần xem lại.
      const bh = play(L.fen, ln.moves), redToMove = (ln.moves.length % 2 === 0) === (L.first === 'do');
      const sc = search(toFen(bh), redToMove, { depth: 6, timeMs: 3000 }).score ?? 0;
      console.log(`${Math.abs(sc) > 300 ? '?' : '='} ${L.title} — ${ln.name}: sách ghi hòa — điểm bên đi ${sc}`);
      continue;
    }
    n++;
    const b = play(L.fen, ln.moves);
    const loserRed = ln.moves.length % 2 === 1 ? L.first !== 'do' : L.first === 'do';
    const r = judge(b, loserRed);
    if (!r.ok) bad++;
    console.log(`${!r.ok ? '✗' : r.soft ? '≈' : '✓'} ${L.title} — ${ln.name}: ${r.how}`);
  }
}
console.log(`\n${n - bad}/${n} kết thúc nhất quán với "Đỏ thắng" (✓ chứng minh chiếu hết, ≈ engine chấm hơn rõ); ${bad} ✗ cần xem lại.`);
