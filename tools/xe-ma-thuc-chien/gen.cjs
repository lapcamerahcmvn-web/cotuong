// tools/xe-ma-thuc-chien/gen.cjs — Dựng chuyên đề tàn cuộc "Xe Mã Thực Chiến" từ sách scan nội bộ (2 chương, 15 bài).
// Nguồn chép tay: text/bai-NN.cjs (mỗi bài 1 file — thế cờ + nước đi theo sách, lời giảng viết lại có dấu).
//
//   node tools/xe-ma-thuc-chien/gen.cjs [--only=<bài>] [--learn] [--no-detect]
//     → kiểm FEN hợp lệ, đối chiếu FEN với sơ đồ "Hình N" của sách (detect.py: vị trí + màu quân phải khớp),
//       đi lại MỌI nước (mạch chính + biến) theo luật, báo cuộc "Đỏ thắng" mà mạch chính không kết thúc bằng
//       chiếu bí/hết nước; ghi tools/trung-cuoc-bao-dien/batches/xe-ma-thuc-chien.json (nước đi xuất ra ICCS
//       để tcbd.cjs không phải đoán lại quân trước/sau).
//     --learn: sơ đồ khớp vị trí/màu mà lệch binh chủng → học thêm mẫu chữ (templates/ — font giản thể của sách).
//
// Định dạng text/bai-NN.cjs:
//   module.exports = { bai: N, ch: 1|2, ten, y, level?, cuoc: [ {
//     n, h: 'p006_0' | '!p006_0',                   // số cuộc trong bài, sơ đồ sách ("!" = đã so bằng mắt)
//     fen: '9/3k5/…', first?: 'do'|'den',          // thế đầu (hàng 0 = trên, chữ HOA = Đỏ), bên đi trước
//     t?, s, c,                                     // tên phụ (tuỳ chọn), tóm tắt (plain), nội dung HTML (viết lại)
//     m: 'M2.3 Tg4.1 …',                            // mạch chính (ký hiệu ngắn; "!"/"?" tự bỏ)
//     k: { ply: 'lời nước' },
//     v: [ { from: 'main'|chỉsốbiến, after: n, m: '…', k: {i: '…'} } ],
//     kq: 'do'|'den'|'hoa', end?: 'thua'           // end: 'thua' = sách ghi bên thua chịu thua (không bắt chiếu bí)
//   } ] }
'use strict';
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const G = require('../mate-book/gen.cjs');

const SERIES = {
  name: 'Xe Mã Thực Chiến', slug: 'xe-ma-thuc-chien', prefix: 'xe-ma',
  description: 'Tàn cuộc Xe Mã thực chiến: các đòn phối hợp Xe – Mã (cao điếu Mã, hoa tâm Xe, chiếu rút…), Xe Mã đấu Xe Tốt, Xe Sĩ Tượng, hai quân mạnh, các thế hòa và thế lấy từ ván thật — mỗi thế đi lại từng nước có nhánh biến, kết quả đã kiểm chứng bằng engine.',
};
const WORK = process.env.XMTC_WORK || 'C:/Users/MinhTuyen/AppData/Local/Temp/claude/d--wamp64-www-laravel13-shop/269d57a1-3190-4e72-a0bb-b213d3143b24/scratchpad/xm/bd';
const TPL = path.join(__dirname, 'templates');
const DETECT = path.resolve(__dirname, '../trung-cuoc-bao-dien/detect.py');

const args = process.argv.slice(2);
const only = (args.find((a) => a.startsWith('--only=')) || '').slice(7);
const LEARN = args.includes('--learn');
const DET = !args.includes('--no-detect');

const vn = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
const slugify = (s) => vn(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const clip = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/[\s,:;—-]+\S*$/, '') + '…');
const toks = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).map((t) => t.replace(/[!?]+/g, ''));

// Đi một chuỗi nước từ bàn b (lượt red). Trả {boards, iccs, err}
function walk(b, red, moves) {
  const boards = [], iccs = [];
  for (let i = 0; i < moves.length; i++) {
    const t = moves[i];
    let mv;
    // "B3s-4" = quân sau (s) / trước (t) trên lộ 3 — dùng khi nhiều lộ cùng có 2 quân giống nhau.
    const fm = /^(Tg|[XMPSVTB])(\d)([ts])([.\/-]\d)$/.exec(t);
    if (fm) {
      const ch = { X: 'R', M: 'N', P: 'C', S: 'A', V: 'B', T: 'B', Tg: 'K', B: 'P' }[fm[1]];
      const pc = red ? ch : ch.toLowerCase(), col = red ? 9 - +fm[2] : +fm[2] - 1;
      const same = []; for (let r = 0; r < 10; r++) if (b[r * 9 + col] === pc) same.push(r * 9 + col);
      const front = red ? same[0] : same[same.length - 1], rear = red ? same[same.length - 1] : same[0];
      const pick = fm[3] === 't' ? front : rear;
      const b2 = b.slice(); for (const k of same) if (k !== pick) b2[k] = null;
      mv = pick == null ? null : G.parseMove(b2, fm[1] + fm[2] + fm[4], red);
    } else mv = G.parseMove(b, t, red);
    if (!mv) return { boards, iccs, err: `nước ${i + 1} "${t}": không đọc/không tìm thấy quân` };
    const am = /^(Tg|[XMPSVTB])(\d)([.\/-]\d)$/.exec(t);
    if (am) {
      const ch = { X: 'R', M: 'N', P: 'C', S: 'A', V: 'B', T: 'B', Tg: 'K', B: 'P' }[am[1]];
      const col = red ? 9 - +am[2] : +am[2] - 1;
      let n = 0; for (let r = 0; r < 10; r++) if (b[r * 9 + col] === (red ? ch : ch.toLowerCase())) n++;
      if (n > 1) {
        const ok = ['t', 's'].map((q) => G.parseMove(b, am[1] + q + am[3], red))
          .filter((m) => m && G.legalMove(b, m.from, m.to) && G.legalNoSelfCheck(b, m.from, m.to));
        if (ok.length === 2 && (ok[0].from !== ok[1].from)) return { boards, iccs, err: `nước ${i + 1} "${t}": hai quân cùng lộ đều đi được — ghi rõ ${am[1]}t/${am[1]}s` };
        if (ok.length) mv = ok[0];
      }
    }
    const p = b[mv.from];
    if (!p || (p === p.toUpperCase()) !== red) return { boards, iccs, err: `nước ${i + 1} "${t}": không phải quân ${red ? 'Đỏ' : 'Đen'}` };
    if (!G.legalMove(b, mv.from, mv.to)) return { boards, iccs, err: `nước ${i + 1} "${t}": phạm luật` };
    if (!G.legalNoSelfCheck(b, mv.from, mv.to)) return { boards, iccs, err: `nước ${i + 1} "${t}": tự để hở Tướng` };
    b = b.slice(); b[mv.to] = p; b[mv.from] = null; red = !red;
    boards.push(b); iccs.push(G.toIccs(mv.from) + G.toIccs(mv.to));
  }
  return { boards, iccs };
}
// Bên `red` (true = Đỏ) hết nước hợp lệ? (bị chiếu bí hoặc hết nước — cờ tướng đều tính thua)
function noMoves(b, red) {
  for (let f = 0; f < 90; f++) {
    const p = b[f]; if (!p || (p === p.toUpperCase()) !== red) continue;
    for (let t = 0; t < 90; t++) if (G.legalMove(b, f, t) && G.legalNoSelfCheck(b, f, t)) return false;
  }
  return true;
}

function detect(ref, refine) {
  const img = path.join(WORK, ref + '.png');
  if (!fs.existsSync(img)) return { err: 'không có ảnh sơ đồ ' + ref };
  const r = cp.spawnSync('python', [DETECT, img, '--json'], { encoding: 'utf8', env: Object.assign({}, process.env, { PYTHONIOENCODING: 'utf-8', XQ_TPL_DIR: TPL, XQ_REFINE: refine ? '1' : '0' }) });
  if (r.status !== 0) return { err: 'detect lỗi ' + r.stderr.slice(-200) };
  return JSON.parse(r.stdout);
}
const grid = (fen) => fen.split('/').map((row) => row.replace(/\d/g, (d) => '.'.repeat(+d)).split(''));
function compare(want, got) {
  const a = grid(want), b = grid(got);
  const occ = [], typ = [];
  for (let r = 0; r < 10; r++) for (let c = 0; c < 9; c++) {
    const x = a[r][c], y = b[r][c];
    if ((x === '.') !== (y === '.') || (x !== '.' && (x === x.toUpperCase()) !== (y === y.toUpperCase()))) occ.push(`r${r}c${c} cần ${x} thấy ${y}`);
    else if (x !== y) typ.push(`r${r}c${c} ${x}≠${y}`);
  }
  return { occ, typ };
}

const dir = path.join(__dirname, 'text');
const files = fs.readdirSync(dir).filter((f) => /^bai-\d+\.cjs$/.test(f)).sort();
const lessons = [], problems = [], soft = [];
let nh = 0, nhOk = 0, learned = 0, nCuoc = 0;
const notMate = [];
const used = new Set();

for (const f of files) {
  const BAI = require(path.join(dir, f));
  if (only && String(BAI.bai) !== only) continue;
  const recs = [];
  for (const x of BAI.cuoc) {
    nCuoc++;
    const tag = `${f} cuộc ${x.n}`;
    const title = `${BAI.ten} · Cuộc ${x.n}${x.t ? ' — ' + x.t : ''}`;
    let slug = x.slug || slugify(`${SERIES.prefix}-${BAI.ten}-cuoc-${x.n}`).slice(0, 90).replace(/-$/, '');
    while (used.has(slug)) slug += '-2';
    used.add(slug);
    const rec = {
      order: BAI.bai * 100 + recs.length + 1, slug, title, level: x.level || BAI.level || 'trung-cap',
      summary: x.s, seo_title: clip(`${BAI.ten} cuộc ${x.n} — tàn cuộc Xe Mã`, 60), seo_description: clip(x.s, 160), status: x.draft ? 'draft' : 'published',
    };
    // 1. FEN hợp lệ + khớp sơ đồ
    const first = x.first || 'do';
    let start;
    try { start = G.loadFen(x.fen); } catch (e) { problems.push(`${tag}: FEN đọc lỗi ${e.message}`); continue; }
    const bad = G.validatePosition ? G.validatePosition(start) : [];
    if (bad && bad.length) problems.push(`${tag}: thế không hợp lệ — ${bad.join('; ')}`);
    if (G.inCheck(start, first !== 'do')) problems.push(`${tag}: bên chờ đang bị chiếu ngay ở thế đầu`);
    if (DET && x.h) {
      nh++;
      if (x.h.startsWith('!')) { nhOk++; soft.push(`${tag} [${x.h.slice(1)}]: đối chiếu bằng mắt — khớp`); }
      else {
        let d = detect(x.h, false), c = d.err ? null : compare(x.fen, d.fen);
        if (d.err) problems.push(`${tag} [${x.h}]: ${d.err}`);
        else {
          if (c.occ.length) {
            const d2 = detect(x.h, true);
            if (!d2.err) { const c2 = compare(x.fen, d2.fen); if (c2.occ.length < c.occ.length) { d = d2; c = c2; d.refine = true; } }
          }
          if (c.occ.length === 1 && / thấy \.$/.test(c.occ[0])) { soft.push(`${tag} [${x.h}]: máy dò sót 1 quân (${c.occ[0]}) — xem ảnh`); nhOk++; }
          else if (c.occ.length) problems.push(`${tag} [${x.h}]: LỆCH VỊ TRÍ/MÀU ${c.occ.length} ô — ${c.occ.slice(0, 6).join('; ')}`);
          else {
            nhOk++;
            if (c.typ.length && LEARN) {
              cp.spawnSync('python', [DETECT, '--learn', path.join(WORK, x.h + '.png'), x.fen], { env: Object.assign({}, process.env, { PYTHONIOENCODING: 'utf-8', XQ_TPL_DIR: TPL, XQ_REFINE: d.refine ? '1' : '0' }) });
              learned++;
            } else if (c.typ.length) soft.push(`${tag} [${x.h}]: binh chủng máy đọc khác ${c.typ.length} ô (vị trí đúng) — ${c.typ.slice(0, 4).join('; ')}`);
          }
        }
      }
    }
    // 2. Nước đi
    const main = toks(x.m);
    const W = walk(start, first === 'do', main);
    if (W.err) problems.push(`${tag} mạch chính: ${W.err}`);
    const lines = [{ moves: main, boards: W.boards, iccs: W.iccs }];
    const vars = [];
    (x.v || []).forEach((v, j) => {
      const base = v.from === undefined || v.from === 'main' ? lines[0] : lines[v.from + 1];
      if (!base) { problems.push(`${tag} biến ${j}: from sai`); lines.push(null); return; }
      if (v.after > base.moves.length) { problems.push(`${tag} biến ${j}: after=${v.after} > ${base.moves.length}`); lines.push(null); return; }
      const startB = v.after ? base.boards[v.after - 1] : start;
      if (!startB) { problems.push(`${tag} biến ${j}: gốc (sau ${v.after}) không đi được`); lines.push({ moves: [], boards: [], iccs: [] }); return; }
      const redToMove = (v.after % 2 === 0) === (first === 'do');
      const R = walk(startB, redToMove, toks(v.m));
      if (R.err) problems.push(`${tag} biến ${j} (sau ${v.after}): ${R.err}`);
      lines.push({ moves: base.moves.slice(0, v.after).concat(toks(v.m)), boards: base.boards.slice(0, v.after).concat(R.boards), iccs: base.iccs.slice(0, v.after).concat(R.iccs) });
      vars.push(Object.assign({ from: v.from === undefined ? 'main' : v.from, after: v.after, moves: R.iccs, captions: v.k || {} }, v.kq ? { kq: v.kq } : {}));
    });
    // 3. Kết quả: "Đỏ thắng" mà không phải chiếu bí/hết nước → ghi chú (trừ khi sách ghi bên thua chịu thua)
    let mate = false;
    if (!W.err && W.boards.length) {
      const last = W.boards[W.boards.length - 1];
      const loserRed = (W.boards.length % 2 === 1) === (first !== 'do');   // bên đến lượt sau nước cuối
      mate = noMoves(last, loserRed);
      const winner = loserRed ? 'den' : 'do';
      if (x.kq && x.kq !== 'hoa' && !x.end) {
        if (!mate) notMate.push(`${BAI.bai}.${x.n}`);
        else if (winner !== x.kq) problems.push(`${tag}: chiếu bí nhưng bên thắng là ${winner}, sách ghi ${x.kq}`);
      }
    }
    Object.assign(rec, { fen: x.fen, first, main: W.iccs.length === main.length ? W.iccs : main, captions: x.k || {} });
    if (vars.length) rec.vars = vars;
    if (x.kq) rec.kq = x.kq;   // cho verify.mjs (tcbd bỏ qua trường này)
    if (mate && x.kq === first && main.length <= 15) rec.puzzle_side = first;
    const kq = { do: 'Đỏ thắng.', den: 'Đen thắng.', hoa: 'Hòa.' }[x.kq];
    recs.push({ rec, x, kq });
  }
  recs.forEach(({ rec, x, kq }, i) => {
    const sib = recs.map((r, j) => (j === i ? `<li><strong>${r.rec.title}</strong></li>` : `<li><a href="/bai-hoc/${r.rec.slug}">${r.rec.title}</a></li>`)).join('');
    rec.content = x.c + (kq ? `<p><strong>Kết quả:</strong> ${kq}</p>` : '')
      + `<h2>Bài ${BAI.bai}: ${BAI.ten}</h2>${BAI.y ? `<p>${BAI.y}</p>` : ''}` + (recs.length > 1 ? `<ol>${sib}</ol>` : '');
    lessons.push(rec);
  });
}

console.log(`${SERIES.name}: ${lessons.length} bài (${nCuoc} cuộc), sơ đồ đối chiếu ${nhOk}/${nh} khớp vị trí${LEARN ? `, học thêm mẫu từ ${learned} sơ đồ` : ''}, giải đố ${lessons.filter((l) => l.puzzle_side).length}`);
if (notMate.length) console.log(`Kết thúc ở thế thắng chắc (chưa chiếu bí): ${notMate.length} cuộc — ${notMate.join(' ')}`);
if (soft.length) console.log('Ghi chú (' + soft.length + '):\n  ' + soft.join('\n  '));
if (problems.length) console.log('VẤN ĐỀ (' + problems.length + '):\n  ' + problems.join('\n  '));
if (!only) {
  const series = { name: SERIES.name, slug: SERIES.slug, game_mode: 'co-tuong', phase: 'tan-cuoc', sort_order: 6, planned_total: lessons.filter((l) => l.status !== 'draft').length, description: SERIES.description };
  const OUT = path.resolve(__dirname, `../trung-cuoc-bao-dien/batches/${SERIES.slug}.json`);
  fs.writeFileSync(OUT, JSON.stringify({ series, lessons }, null, 1) + '\n');
  console.log('→ ' + path.relative(process.cwd(), OUT));
}
process.exitCode = problems.length ? 1 : 0;
