// tools/khai-cuoc-bo-cuc/gen.cjs — Dựng 2 chuyên đề khai cuộc từ 2 sách scan nội bộ (bộ "giảng bố cục"):
//   cb = Cạm Bẫy Khai Cuộc Và Đối Sách, nh = Nghi Hình Khai Cuộc Và Công Kích.
// Nguồn chép tay: text/<book>-NN.cjs (mỗi chương 1 file — nước đi theo ký hiệu sách, lời giảng viết lại có dấu).
//
//   node tools/khai-cuoc-bo-cuc/gen.cjs <cb|nh> [--only=<chương>] [--learn] [--no-detect]
//     → đi lại MỌI nước (mạch chính + biến) theo luật, đối chiếu từng sơ đồ "Hình N" trong sách với thế cờ tại
//       đúng nước đó (detect.py: vị trí + màu quân phải khớp tuyệt đối; binh chủng lệch thì cảnh báo),
//       rồi ghi tools/trung-cuoc-bao-dien/batches/<slug>.json (dựng tiếp bằng tcbd.cjs build).
//     --learn: sơ đồ khớp vị trí/màu và lệch binh chủng ≤ 8 ô → học thêm mẫu chữ (templates/ — font riêng bộ sách).
//
// Định dạng text/<book>-NN.cjs:
//   module.exports = { ch: N, ten, y, level?, cuoc: [ {
//     n, t, s, c,                                  // số cuộc, tên, tóm tắt (plain), nội dung HTML (viết lại)
//     m: 'P2-5 P8-5 …',                            // mạch chính (ký hiệu sách; "!"/"?" tự bỏ)
//     k: { ply: 'lời nước' }, h: { ply: 'p011_0' },// lời theo nước (1-based) + sơ đồ sách tại nước đó
//     v: [ { from: 'main'|chỉsốbiến, after: n, m: '…', k: {i: '…'}, h: {i: 'pNNN_k'} } ],
//     kq: 'do'|'den'|'hoa'|'uu-do'|'uu-den'|'can-bang', text?: true (bài chữ, không bàn cờ), slug? } ] }
'use strict';
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const G = require('../mate-book/gen.cjs');

const BOOKS = {
  cb: {
    slug: 'cam-bay-khai-cuoc-doi-sach', prefix: 'cam-bay',
    name: 'Cạm Bẫy Khai Cuộc Và Đối Sách',
    description: 'Nhận diện các cạm bẫy khai cuộc điển hình — Thuận Pháo, Trung Pháo đối Bình Phong Mã, Liệt Pháo, Phản Cung Mã, Tiên Nhân Chỉ Lộ, Phi Tượng… — và cách phá giải: mỗi cuộc đi lại từng nước, kèm nhánh biến bên mắc bẫy và bên ứng phó đúng.',
  },
  nh: {
    slug: 'nghi-hinh-khai-cuoc-cong-kich', prefix: 'nghi-hinh',
    name: 'Nghi Hình Khai Cuộc Và Công Kích',
    description: 'Nghi hình là kết cấu cờ ẩn điểm yếu do đi theo quán tính trong khai cuộc. Chuyên đề chỉ ra từng nghi hình thường gặp ở các thế trận lớn, cách tránh và cách công kích để giành ưu thế — mỗi cuộc có bàn cờ đi từng nước và nhánh biến.',
  },
};
const START = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';
const WORK = process.env.KCBC_WORK || 'C:/Users/MinhTuyen/AppData/Local/Temp/claude/d--wamp64-www-laravel13-shop/269d57a1-3190-4e72-a0bb-b213d3143b24/scratchpad/khai/boards';
const TPL = path.join(__dirname, 'templates');
const DETECT = path.resolve(__dirname, '../trung-cuoc-bao-dien/detect.py');

const args = process.argv.slice(2);
const bookKey = args[0];
const B = BOOKS[bookKey];
if (!B) { console.error('Cách dùng: node gen.cjs <cb|nh> [--only=N] [--learn] [--no-detect]'); process.exit(1); }
const only = (args.find((a) => a.startsWith('--only=')) || '').slice(7);
const LEARN = args.includes('--learn');
const DET = !args.includes('--no-detect');

const vn = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
const slugify = (s) => vn(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const clip = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/[\s,:;—-]+\S*$/, '') + '…');
const toks = (s) => String(s || '').trim().split(/\s+/).filter(Boolean).map((t) => t.replace(/[!?]+/g, ''));

// Đi một chuỗi nước từ bàn b (lượt red). Trả {boards:[sau mỗi nước], err}
function walk(b, red, moves) {
  const boards = [];
  for (let i = 0; i < moves.length; i++) {
    const t = moves[i];
    let mv = G.parseMove(b, t, red);
    if (!mv) return { boards, err: `nước ${i + 1} "${t}": không đọc/không tìm thấy quân` };
    // Hai quân cùng loại cùng lộ mà ký hiệu không ghi trước/sau: thử cả "t" lẫn "s" — chỉ một quân đi hợp lệ thì
    // chọn quân đó; cả hai đều hợp lệ (đi tới ô khác nhau) thì mơ hồ thật → bắt ghi rõ.
    const am = /^(Tg|[XMPSVT])(\d)([.\/-]\d)$/.exec(t);
    if (am) {
      const ch = { X: 'R', M: 'N', P: 'C', S: 'A', V: 'B', T: 'B', Tg: 'K' }[am[1]];
      const col = red ? 9 - +am[2] : +am[2] - 1;
      let n = 0; for (let r = 0; r < 10; r++) if (b[r * 9 + col] === (red ? ch : ch.toLowerCase())) n++;
      if (n > 1) {
        const ok = ['t', 's'].map((q) => G.parseMove(b, am[1] + q + am[3], red))
          .filter((m) => m && G.legalMove(b, m.from, m.to) && G.legalNoSelfCheck(b, m.from, m.to));
        if (ok.length === 2 && (ok[0].from !== ok[1].from)) return { boards, err: `nước ${i + 1} "${t}": hai quân cùng lộ đều đi được — ghi rõ ${am[1]}t/${am[1]}s` };
        if (ok.length) mv = ok[0];
      }
    }
    const p = b[mv.from];
    if (!p || (p === p.toUpperCase()) !== red) return { boards, err: `nước ${i + 1} "${t}": không phải quân ${red ? 'Đỏ' : 'Đen'}` };
    if (!G.legalMove(b, mv.from, mv.to)) return { boards, err: `nước ${i + 1} "${t}": phạm luật` };
    if (!G.legalNoSelfCheck(b, mv.from, mv.to)) return { boards, err: `nước ${i + 1} "${t}": tự để hở Tướng` };
    b = b.slice(); b[mv.to] = p; b[mv.from] = null; red = !red;
    boards.push(b);
  }
  return { boards };
}

function detect(ref, refine) {
  const img = path.join(WORK, bookKey, ref + '.png');
  if (!fs.existsSync(img)) return { err: 'không có ảnh sơ đồ ' + ref };
  const r = cp.spawnSync('python', [DETECT, img, '--json'], { encoding: 'utf8', env: Object.assign({}, process.env, { PYTHONIOENCODING: 'utf-8', XQ_TPL_DIR: TPL, XQ_REFINE: refine ? '1' : '0' }) });
  if (r.status !== 0) return { err: 'detect lỗi ' + r.stderr.slice(-200) };
  return JSON.parse(r.stdout);
}
const grid = (fen) => fen.split('/').map((row) => row.replace(/\d/g, (d) => '.'.repeat(+d)).split(''));
function compare(want, got) {
  const a = grid(want), b = grid(got);
  let occ = [], typ = [];
  for (let r = 0; r < 10; r++) for (let c = 0; c < 9; c++) {
    const x = a[r][c], y = b[r][c];
    if ((x === '.') !== (y === '.') || (x !== '.' && (x === x.toUpperCase()) !== (y === y.toUpperCase()))) occ.push(`r${r}c${c} cần ${x} thấy ${y}`);
    else if (x !== y) typ.push(`r${r}c${c} ${x}≠${y}`);
  }
  return { occ, typ };
}

const dir = path.join(__dirname, 'text');
const files = fs.readdirSync(dir).filter((f) => f.startsWith(bookKey + '-') && f.endsWith('.cjs')).sort();
const lessons = [];
const problems = [];
const soft = [];
let nh = 0, nhOk = 0, learned = 0;
const used = new Set();

for (const f of files) {
  const CH = require(path.join(dir, f));
  if (only && String(CH.ch) !== only) continue;
  const recs = [];
  for (const x of CH.cuoc) {
    const tag = `${f} cuộc ${x.n}`;
    const title = x.n ? `Cuộc ${x.n} · ${x.t}` : x.t;
    let slug = x.slug || slugify(`${B.prefix}-${x.n ? 'cuoc-' + x.n + '-' : ''}${x.t}`).slice(0, 90).replace(/-$/, '');
    while (used.has(slug)) slug += '-2';
    used.add(slug);
    const rec = {
      order: (CH.ch * 100) + (x.n ? 0 : 0) + recs.length + 1, slug, title, level: x.level || CH.level || 'trung-cap',
      summary: x.s, seo_title: clip(x.t, 60), seo_description: clip(x.s, 160), status: x.draft ? 'draft' : 'published',
    };
    if (!x.text) {
      const main = toks(x.m);
      const W = walk(G.loadFen(START), true, main);
      if (W.err) problems.push(`${tag} mạch chính: ${W.err}`);
      const lines = [{ moves: main, boards: W.boards }];
      const vars = [];
      const checks = [];
      (x.v || []).forEach((v, j) => {
        const base = v.from === undefined || v.from === 'main' ? lines[0] : lines[v.from + 1];
        if (!base) { problems.push(`${tag} biến ${j}: from sai`); lines.push(null); return; }
        if (v.after > base.moves.length) { problems.push(`${tag} biến ${j}: after=${v.after} > ${base.moves.length}`); lines.push(null); return; }
        const pre = base.moves.slice(0, v.after);
        const mv = toks(v.m);
        const startB = v.after ? base.boards[v.after - 1] : G.loadFen(START);
        if (!startB) { problems.push(`${tag} biến ${j}: gốc (sau ${v.after}) không đi được — sửa nhánh gốc trước`); lines.push({ moves: pre, boards: [] }); vars.push({ from: v.from === undefined ? 'main' : v.from, after: v.after, moves: toks(v.m), captions: v.k || {} }); return; }
        const R = walk(startB, v.after % 2 === 0, mv);
        if (R.err) problems.push(`${tag} biến ${j} (sau ${v.after}): ${R.err}`);
        lines.push({ moves: pre.concat(mv), boards: (v.after ? base.boards.slice(0, v.after) : []).concat(R.boards) });
        vars.push({ from: v.from === undefined ? 'main' : v.from, after: v.after, moves: mv, captions: v.k || {} });
        for (const [i, ref] of Object.entries(v.h || {})) checks.push([`${tag} biến ${j} nước ${i}`, R.boards[+i - 1], ref]);
      });
      for (const [p, ref] of Object.entries(x.h || {})) checks.push([`${tag} nước ${p}`, W.boards[+p - 1], ref]);
      if (DET) for (const [label, bd, ref] of checks) {
        nh++;
        if (!bd) { problems.push(`${label}: không có thế cờ (nước vượt quá chuỗi)`); continue; }
        const want = G.toFen(bd);
        // Tiền tố "!" = sơ đồ đã đối chiếu bằng mắt (máy dò lệch do quân đè sát mép ảnh) — không chạy detect.
        if (ref.startsWith('!')) { nhOk++; soft.push(`${label} [${ref.slice(1)}]: đối chiếu bằng mắt — khớp`); continue; }
        // Dò lưới thường trước; lệch vị trí thì dò lại có tinh chỉnh theo tâm quân (XQ_REFINE) — lấy kết quả khớp hơn.
        let d = detect(ref, false);
        if (d.err) { problems.push(`${label} [${ref}]: ${d.err}`); continue; }
        let c = compare(want, d.fen);
        if (c.occ.length) {
          const d2 = detect(ref, true);
          if (!d2.err) { const c2 = compare(want, d2.fen); if (c2.occ.length < c.occ.length || (!c2.occ.length && c2.typ.length < c.typ.length)) { d = d2; c = c2; d.refine = true; } }
        }
        // Đúng 1 ô "cần quân, máy thấy trống" (máy dò sót quân, thường ở mép) → cảnh báo nhẹ, không tính lỗi.
        if (c.occ.length === 1 && / thấy \.$/.test(c.occ[0])) { soft.push(`${label} [${ref}]: máy dò sót 1 quân (${c.occ[0]}) — xem ảnh xác nhận`); nhOk++; }
        else if (c.occ.length) problems.push(`${label} [${ref}]: LỆCH VỊ TRÍ/MÀU ${c.occ.length} ô — ${c.occ.slice(0, 6).join('; ')}`);
        else {
          nhOk++;
          if (c.typ.length) {
            if (LEARN && c.typ.length <= 8) {
              cp.spawnSync('python', [DETECT, '--learn', path.join(WORK, bookKey, ref + '.png'), want], { env: Object.assign({}, process.env, { PYTHONIOENCODING: 'utf-8', XQ_TPL_DIR: TPL, XQ_REFINE: d.refine ? '1' : '0' }) });
              learned++;
            } else problems.push(`${label} [${ref}]: binh chủng lệch ${c.typ.length} ô (vị trí đúng) — ${c.typ.slice(0, 6).join('; ')}`);
          }
        }
      }
      Object.assign(rec, { fen: START, first: 'do', main, captions: x.k || {} });
      if (vars.length) rec.vars = vars;
    }
    const kq = { do: 'Đỏ thắng.', den: 'Đen thắng.', hoa: 'hòa.', 'uu-do': 'Đỏ chiếm ưu.', 'uu-den': 'Đen chiếm ưu.', 'can-bang': 'thế cân bằng.' }[x.kq];
    recs.push({ rec, x, kq });
  }
  recs.forEach(({ rec, x, kq }, i) => {
    const sib = recs.map((r, j) => (j === i ? `<li><strong>${r.rec.title}</strong></li>` : `<li><a href="/bai-hoc/${r.rec.slug}">${r.rec.title}</a></li>`)).join('');
    rec.content = x.c + (kq ? `<p><strong>Kết quả:</strong> ${kq}</p>` : '')
      + (recs.length > 1 ? `<h2>Chương ${CH.ch}: ${CH.ten}</h2>${CH.y ? `<p>${CH.y}</p>` : ''}<ol>${sib}</ol>` : '');
    lessons.push(rec);
  });
}

console.log(`${B.name}: ${lessons.length} bài, sơ đồ đối chiếu ${nhOk}/${nh} khớp vị trí${LEARN ? `, học thêm mẫu từ ${learned} sơ đồ` : ''}`);
if (soft.length) console.log('Ghi chú (' + soft.length + '):\n  ' + soft.join('\n  '));
if (problems.length) { console.log('VẤN ĐỀ (' + problems.length + '):\n  ' + problems.join('\n  ')); }
if (!only) {
  const series = { name: B.name, slug: B.slug, game_mode: 'co-tuong', phase: 'khai-cuoc', sort_order: bookKey === 'cb' ? 3 : 4, planned_total: lessons.filter((l) => l.status !== 'draft').length, description: B.description };
  const OUT = path.resolve(__dirname, `../trung-cuoc-bao-dien/batches/${B.slug}.json`);
  fs.writeFileSync(OUT, JSON.stringify({ series, lessons }, null, 1) + '\n');
  console.log('→ ' + path.relative(process.cwd(), OUT));
}
process.exitCode = problems.length ? 1 : 0;
