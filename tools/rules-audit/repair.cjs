'use strict';
/**
 * Tìm cách sửa TỐI THIỂU cho bài có lỗi luật: dời 1 quân KHÔNG di chuyển trong suốt bài (hoặc bỏ hẳn) sao cho thế mở đầu,
 * mạch chính và MỌI nhánh biến đều hợp luật; bài có giải đố (puzzle_side) thì thế cuối vẫn phải hết nước (chiếu bí).
 * Ưu tiên dời ngắn nhất, sau đó mới tới bỏ quân. Thường gặp: thế giải mã từ sách lệch 1 quân → bên đi đang bị chiếu.
 *
 *   node tools/rules-audit/repair.cjs                  # đề xuất cho mọi bài lỗi
 *   node tools/rules-audit/repair.cjs --apply slug,..  # ghi cách sửa tốt nhất vào database/seeders/data/content/<chuyên đề>.json
 */
const fs = require('fs');
const path = require('path');
const { auditLesson, R } = require('./audit.cjs');
const IO = require('../trung-cuoc-bao-dien/content-io.cjs');

const VI = { K: 'Tướng', A: 'Sĩ', B: 'Tượng', N: 'Mã', R: 'Xe', C: 'Pháo', P: 'Tốt' };
const name = (p) => `${VI[p.toUpperCase()]} ${R.isRed(p) ? 'Đỏ' : 'Đen'}`;

/** Ô đặt được theo luật cờ tướng (quân không bao giờ tới được ô sai vị trí). */
function placeOk(p, i) {
  const r = (i / 9) | 0, c = i % 9, red = R.isRed(p), t = p.toUpperCase();
  if (t === 'K') return c >= 3 && c <= 5 && (red ? r >= 7 : r <= 2);
  if (t === 'A') return (red ? [[9, 3], [9, 5], [8, 4], [7, 3], [7, 5]] : [[0, 3], [0, 5], [1, 4], [2, 3], [2, 5]]).some(([y, x]) => y === r && x === c);
  if (t === 'B') return (red ? [[9, 2], [9, 6], [7, 0], [7, 4], [7, 8], [5, 2], [5, 6]] : [[0, 2], [0, 6], [2, 0], [2, 4], [2, 8], [4, 2], [4, 6]]).some(([y, x]) => y === r && x === c);
  if (t === 'P') return red ? r <= 6 && (r <= 4 || c % 2 === 0) : r >= 3 && (r >= 5 || c % 2 === 0);
  return true;
}

/** Dời quân p ở ô a sang b (b = -1: bỏ quân) trong MỌI FEN của bài. null nếu quân này có lúc rời ô a (đi / bị ăn). */
function applyEdit(l, a, b, p) {
  const fix = (fen) => {
    const bd = R.loadFen(fen);
    if (bd[a] !== p || (b >= 0 && bd[b])) return null;
    bd[a] = null;
    if (b >= 0) bd[b] = p;
    return R.toFen(bd);
  };
  const n = JSON.parse(JSON.stringify(l));
  n.initial_fen = fix(n.initial_fen);
  if (!n.initial_fen) return null;
  for (const s of n.steps || []) { if (!s.fen) continue; s.fen = fix(s.fen); if (!s.fen) return null; }
  let ok = true;
  const walk = (nodes) => { for (const x of nodes || []) { if (x.fen) { x.fen = fix(x.fen); if (!x.fen) ok = false; } walk(x.children); } };
  if (Array.isArray(n.variation_tree)) walk(n.variation_tree);
  return ok ? n : null;
}

/** Bài giải đố: thế cuối (sau mạch chính) bên tới lượt phải hết nước đi (chiếu bí / bí). */
function endsInMate(l) {
  const steps = (l.steps || []).slice().sort((x, y) => x.step_order - y.step_order);
  if (!steps.length) return true;
  const last = steps[steps.length - 1];
  const b = R.loadFen(last.fen);
  const mv = last.move_notation_iccs ? R.fromIccs(last.move_notation_iccs) : null;
  const moverRed = mv && b[mv.to] ? R.isRed(b[mv.to]) : null;
  if (moverRed === null) return true;
  for (let f = 0; f < 90; f++) {
    if (!b[f] || R.isRed(b[f]) === moverRed) continue;
    for (let t = 0; t < 90; t++) if (R.legalNoSelfCheck(b, f, t, false, false)) return false;
  }
  return true;
}

function proposals(l) {
  const start = R.loadFen(l.initial_fen);
  const wantMate = !!l.puzzle_side && l.phase !== 'nhap-mon';
  const out = [];
  for (let a = 0; a < 90; a++) {
    const p = start[a];
    if (!p) continue;
    const targets = [];
    for (let b = 0; b < 90; b++) if (!start[b] && placeOk(p, b)) targets.push(b);
    targets.sort((x, y) => (Math.abs(((x / 9) | 0) - ((a / 9) | 0)) + Math.abs(x % 9 - a % 9)) - (Math.abs(((y / 9) | 0) - ((a / 9) | 0)) + Math.abs(y % 9 - a % 9)));
    if (p.toUpperCase() !== 'K') targets.push(-1);
    for (const b of targets) {
      const n = applyEdit(l, a, b, p);
      if (!n) break;                                  // quân này có di chuyển trong bài → không dời được
      if (auditLesson(n).errors.length) continue;
      if (wantMate && !endsInMate(n)) continue;
      const dist = b < 0 ? 100 : Math.abs(((b / 9) | 0) - ((a / 9) | 0)) + Math.abs(b % 9 - a % 9);
      out.push({ dist, a, b, p, text: b < 0 ? `bỏ ${name(p)} ở ${R.toIccs(a)}` : `dời ${name(p)} ${R.toIccs(a)} → ${R.toIccs(b)}`, lesson: n });
      break;                                          // ô gần nhất hợp lệ cho quân này là đủ
    }
  }
  return out.sort((x, y) => x.dist - y.dist);
}

const content = IO.read();
const bad = content.lessons.filter((l) => l.status === 'published' && auditLesson(l).errors.length);
const ai = process.argv.indexOf('--apply');
const applySet = ai > 0 ? new Set(process.argv[ai + 1].split(',')) : null;
const fixed = new Map();
for (const l of bad) {
  if (applySet && !applySet.has(l.slug)) continue;
  const ps = proposals(l);
  console.log(`\n${l.slug}`);
  if (!ps.length) { console.log('   ✗ không tìm được cách sửa 1 quân — cần sửa tay'); continue; }
  ps.slice(0, 4).forEach((x, i) => console.log(`   ${i ? ' ' : '★'} ${x.text}`));
  if (applySet) fixed.set(l.slug, ps[0].lesson);
}
if (applySet && fixed.size) {
  // Ghi từng file chuyên đề: đọc lại ngay trước khi ghi, chỉ thay đúng bài đã sửa (không đụng file / bài khác).
  const bySeries = new Map();
  for (const l of fixed.values()) bySeries.set(l.series_slug, (bySeries.get(l.series_slug) || []).concat(l));
  for (const [series, list] of bySeries) {
    const file = path.join(IO.DIR, series + '.json');
    const arr = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const nl of list) { const i = arr.findIndex((x) => x.slug === nl.slug); if (i >= 0) arr[i] = nl; }
    fs.writeFileSync(file, IO.phpJson(arr));
    console.log(`→ ghi ${list.length} bài vào ${series}.json`);
  }
}
