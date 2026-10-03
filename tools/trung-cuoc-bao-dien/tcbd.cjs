/* tools/trung-cuoc-bao-dien/tcbd.cjs — Dựng chuyên đề "Trung Cuộc Bảo Điển" (2 tập) thành Lesson.
 *
 *   node tcbd.cjs check <diagram|FEN> <do|den> [nước...]   → dò FEN từ sơ đồ (detect.py) hoặc dùng FEN
 *        đưa vào, kiểm vị trí, đi thử từng nước (in ký hiệu VN), báo nước phạm luật/tự chiếu, chiếu bí.
 *        <diagram> = "t2/p003_0" (tương đối thư mục work, mặc định scratchpad — đặt TCBD_WORK).
 *   node tcbd.cjs build <batch.json> [...batch.json]      → dựng + kiểm TOÀN BỘ bài; bài nào có cảnh
 *        báo thì BỎ QUA (không ghi dữ liệu hỏng); upsert series + lesson theo slug vào content.json
 *        (giữ nguyên định dạng file, xem content-io.cjs).
 *
 * Định nghĩa 1 bài (batch.lessons[]):
 *   { order, slug, title, level, fen, diagram?, first:'do'|'den',
 *     main:[ký hiệu sách...], captions:{ply:'lời giảng'},          // ply 1-based theo mạch chính
 *     vars:[{ from:'main'|k, after:n, moves:[...], captions:{i:'...'} }],  // k = chỉ số biến trước đó;
 *                                       // after = số nước đi theo đường gốc trước khi rẽ; i 1-based trong moves
 *     expect?:'mate', summary, content, seo_title, seo_description, puzzle_side? }
 * Ký hiệu sách: X M P S T(Tượng) Tg(Tướng) B(Tốt) + t/s (trước/sau), '.' tiến, '/' thoái, '-' bình.
 */
'use strict';
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const G = require('../mate-book/gen.cjs');
const IO = require('./content-io.cjs');

const WORK = process.env.TCBD_WORK || 'C:/Users/MinhTuyen/AppData/Local/Temp/claude/d--wamp64-www-laravel13-shop/1a2f1e31-8f89-45a9-a46f-f1d4bd0ed5b4/scratchpad/tcbd/work';
const isRedCh = (ch) => ch === ch.toUpperCase();

function detectFen(ref) {
  const img = path.join(WORK, ref + '.png');
  const r = cp.spawnSync('python', [path.join(__dirname, 'detect.py'), img, '--json'], { encoding: 'utf8', env: Object.assign({}, process.env, { PYTHONIOENCODING: 'utf-8' }) });
  if (r.status !== 0) throw new Error('detect.py lỗi: ' + r.stderr);
  return JSON.parse(r.stdout);
}

// Chuẩn hoá ký hiệu OCR: bỏ khoảng trắng, "Tg" giữ nguyên, ký tự lạ.
function norm(tok) { return String(tok).replace(/\s+/g, '').replace(/[，,;]$/, ''); }

function play(board, tok, red) {
  const t = norm(tok);
  const mv = G.parseMove(board, t, red);
  if (!mv) return { err: `không đọc/không tìm thấy quân cho "${t}"` };
  const p = board[mv.from];
  if (!p || isRedCh(p) !== red) return { err: `"${t}": ô xuất phát ${G.toIccs(mv.from)} không phải quân ${red ? 'Đỏ' : 'Đen'}` };
  if (!G.legalMove(board, mv.from, mv.to)) return { err: `"${t}" ${G.toIccs(mv.from)}${G.toIccs(mv.to)} phạm luật` };
  if (!G.legalNoSelfCheck(board, mv.from, mv.to)) return { err: `"${t}" ${G.toIccs(mv.from)}${G.toIccs(mv.to)} để hở Tướng (tự chiếu)` };
  const wxf = G.notation(board, mv.from, mv.to);
  const nb = board.slice(); const cap = nb[mv.to]; nb[mv.to] = nb[mv.from]; nb[mv.from] = null;
  return { from: mv.from, to: mv.to, wxf, board: nb, captured: cap, side: red ? 'do' : 'den' };
}

function startChecks(board, first) {
  const w = G.validatePosition(board).map(m => 'Vị trí: ' + m);
  // Bên KHÔNG tới lượt không được đang bị chiếu (nếu có ⇒ FEN hoặc bên đi trước sai).
  const idle = first === 'do' ? false : true; // idle red?
  if (G.inCheck(board, idle)) w.push(`Vị trí: bên ${idle ? 'Đỏ' : 'Đen'} đang bị chiếu nhưng lại không tới lượt — sai FEN hoặc sai bên đi trước`);
  return w;
}

// Dựng cây từ các "đường" đầy đủ (mạch chính trước → children[0] luôn là mạch chính).
function buildTree(fen, first, main, mainCaps, vars) {
  const warnings = [];
  const root = { board: G.loadFen(fen), children: [] };
  startChecks(root.board, first).forEach(m => warnings.push(m));
  const lines = [{ tokens: main, caps: mainCaps || {}, name: 'mạch chính' }];
  (vars || []).forEach((v, k) => {
    const base = (v.from === undefined || v.from === 'main') ? lines[0] : lines[v.from + 1];
    if (!base) { warnings.push(`biến ${k}: from=${v.from} không tồn tại`); return; }
    const after = v.after | 0;
    const caps = {};
    Object.keys(v.captions || {}).forEach(i => { caps[after + (+i)] = v.captions[i]; });
    lines.push({ tokens: base.tokens.slice(0, after).concat(v.moves), caps, name: `biến ${k} (sau ${after} nước)` });
  });
  lines.forEach(L => {
    let node = root;
    for (let i = 0; i < L.tokens.length; i++) {
      const ply = i + 1;
      const red = (ply % 2 === 1) ? first === 'do' : first !== 'do';
      const r = play(node.board, L.tokens[i], red);
      if (r.err) { warnings.push(`${L.name}, nước ${ply}: ${r.err}`); break; }
      let nx = node.children.find(c => c.from === r.from && c.to === r.to);
      if (!nx) {
        nx = { from: r.from, to: r.to, wxf: r.wxf, side: r.side, board: r.board, caption: '', children: [] };
        node.children.push(nx);
      }
      if (L.caps[ply] && !nx.caption) nx.caption = L.caps[ply];
      node = nx;
    }
  });
  const ser = (n) => n.children.map(c => ({ from: c.from, to: c.to, iccs: G.toIccs(c.from) + G.toIccs(c.to), wxf: c.wxf, side: c.side, reveal: null, fen: G.toFen(c.board), caption: c.caption || '', children: ser(c) }));
  const mainline = []; let n = root;
  while (n.children.length) { n = n.children[0]; mainline.push(n); }
  const hasBranch = (nodes) => nodes.some(x => x.children.length > 1 || hasBranch(x.children));
  const tree = ser(root);
  return { warnings, mainline, tree: (tree.length > 1 || hasBranch(tree)) ? tree : null, last: n };
}

function cmdCheck(args) {
  let [src, first, ...moves] = args;
  if (moves.length === 1 && /\s/.test(moves[0])) moves = moves[0].trim().split(/\s+/);
  let fen = src;
  if (!src.includes('/') || /^t\d\//.test(src)) {
    const d = detectFen(src); fen = d.fen;
    console.log(`FEN dò được (${d.pieces} quân): ${fen}`);
    d.low.forEach(c => console.log(`  ⚠ ô r${c.r}c${c.c} (${G.toIccs(c.r * 9 + c.c)}) ${c.color} → ${c.type} score=${c.score} margin=${c.margin}`));
  }
  const b = G.loadFen(fen);
  startChecks(b, first).forEach(m => console.log('  ✗ ' + m));
  let board = b, ply = 0;
  for (const t of moves) {
    ply++;
    const red = (ply % 2 === 1) ? first === 'do' : first !== 'do';
    const r = play(board, t, red);
    if (r.err) { console.log(`  ✗ ply ${ply}: ${r.err}`); break; }
    console.log(`  ${String(ply).padStart(2)}. ${red ? 'Đỏ ' : 'Đen'} ${norm(t).padEnd(7)} ${r.wxf}${r.captured ? '  (ăn ' + r.captured + ')' : ''}${G.inCheck(r.board, !red) ? '  +chiếu' : ''}${G.isCheckmate(r.board, !red) ? '  #CHIẾU BÍ' : ''}`);
    board = r.board;
  }
  console.log('FEN cuối: ' + G.toFen(board));
}

function buildLesson(L, seriesSlug, phase) {
  const base = {
    series_slug: seriesSlug, order_in_series: L.order, game_mode: 'co-tuong', phase: phase || 'trung-cuoc',
    title: L.title, slug: L.slug, level: L.level || 'trung-cap', source_type: 'manual',
  };
  const meta = {
    summary: L.summary || null, content: L.content || null, status: L.status || 'published',
    decode_confidence: L.fen ? 'high' : null, thumbnail: null,
    seo_title: L.seo_title || L.title, seo_description: L.seo_description || L.summary || null, is_featured: false,
  };
  if (!L.fen) {
    return { rec: Object.assign(base, { initial_fen: null, move_count: 0, variation_tree: null, puzzle_side: null }, meta, { steps: [] }), warnings: [] };
  }
  const r = buildTree(L.fen, L.first || 'do', L.main || [], L.captions || {}, L.vars || []);
  if (L.expect === 'mate') {
    const lastRed = r.mainline.length ? r.mainline[r.mainline.length - 1].side === 'do' : true;
    if (!G.isCheckmate(r.last.board, !lastRed)) r.warnings.push('expect=mate nhưng nước cuối mạch chính KHÔNG chiếu bí');
  }
  const steps = r.mainline.map((m, i) => ({
    step_order: i + 1, fen: G.toFen(m.board), move_notation_wxf: m.wxf, move_notation_iccs: G.toIccs(m.from) + G.toIccs(m.to),
    move_side: m.side, moved_piece: null, captured_piece: null, caption: m.caption || '', is_flip_reveal: false,
  }));
  const rec = Object.assign(base, { initial_fen: L.fen.split(' ')[0], move_count: steps.length, variation_tree: r.tree, puzzle_side: L.puzzle_side || null }, meta, { steps });
  return { rec, warnings: r.warnings };
}

// Gộp nước đi đã kiểm (drafts/*.json, khoá "file#id") vào bài: draft cấp diagram/fix/first/main/vars,
// bài cấp lời giảng (captions theo ply mạch chính, var_caps {k:{i:txt}} theo biến k).
const draftCache = {};
function withDraft(L) {
  if (!L.draft) return L;
  const [file, id] = L.draft.split('#');
  const p = path.join(__dirname, 'drafts', file + '.json');
  draftCache[p] = draftCache[p] || JSON.parse(fs.readFileSync(p, 'utf8'));
  const d = draftCache[p].find(x => String(x.id) === id);
  if (!d) throw new Error('Không thấy draft ' + L.draft);
  const vars = (d.vars || []).map((v, k) => Object.assign({}, v, { captions: (L.var_caps || {})[k] || v.captions || {} }));
  return Object.assign({ diagram: d.diagram, fix: d.fix, first: d.first, fen: d.fen }, L, { main: L.main || d.main, vars: L.vars || vars });
}

function cmdBuild(files) {
  const data = IO.read();
  let ok = 0, skip = 0;
  for (const f of files) {
    const batch = JSON.parse(fs.readFileSync(f, 'utf8'));
    let dirty = false;
    const s = batch.series;
    const si = data.series.findIndex(x => x.slug === s.slug);
    if (si >= 0) data.series[si] = Object.assign({}, data.series[si], s); else data.series.push(s);
    for (const L0 of batch.lessons) {
      // "đóng băng" FEN vào file batch ngay lần build đầu → về sau dựng lại không cần cache dò sơ đồ
      if (L0.draft && !L0.fen) {
        const d = withDraft(L0);
        if (d.diagram || d.fen) { L0.fen = d.fen || applyFix(cachedFen(d.diagram).fen, d.fix); dirty = true; }
      }
      const L = withDraft(L0);
      if (L0.fen) L.fen = L0.fen;
      const { rec, warnings } = buildLesson(L, s.slug, s.phase);
      if (warnings.length) { skip++; console.error(`  ✗ BỎ QUA "${L.title}":\n     ! ` + warnings.join('\n     ! ')); continue; }
      const li = data.lessons.findIndex(x => x.slug === rec.slug);
      if (li >= 0) data.lessons[li] = rec; else data.lessons.push(rec);
      ok++;
      console.log(`  ✓ [${rec.order_in_series}] ${rec.title} (${rec.move_count} nước${rec.variation_tree ? ', có biến' : ''})`);
    }
    if (dirty) fs.writeFileSync(f, JSON.stringify(batch, null, 1) + '\n');
  }
  IO.write(data);
  console.log(`\nĐã ghi ${ok} bài, bỏ qua ${skip}.`);
  if (skip) process.exitCode = 2;
}

// FEN dò sẵn hàng loạt (detect.py --all) → tra nhanh, không gọi Python từng sơ đồ.
function cachedFen(ref) {
  const [vol, name] = ref.split('/');
  const f = path.join(WORK, vol, 'fens.json');
  if (fs.existsSync(f)) { const c = JSON.parse(fs.readFileSync(f, 'utf8')); if (c[name] && c[name].fen) return c[name]; }
  return detectFen(ref);
}

// node tcbd.cjs drafts <drafts.json> [id...]  — kiểm nhanh nhiều thế: [{id, diagram|fen, fix?, first, main, vars}]
// fix: {"e9":"k", "c0":""} sửa ô (ICCS) sau khi dò — dùng khi sơ đồ sách thiếu/sai quân đã xác minh.
function applyFix(fen, fix) {
  if (!fix) return fen;
  const b = G.loadFen(fen);
  for (const sq in fix) { const x = sq.charCodeAt(0) - 97, r = 9 - (+sq[1]); b[r * 9 + x] = fix[sq] || null; }
  return G.toFen(b);
}
function cmdDrafts(args) {
  const list = JSON.parse(fs.readFileSync(args[0], 'utf8'));
  const showAll = args.includes('--show');
  const only = args.slice(1).filter(a => a !== '--show');
  for (const d of list) {
    if (only.length && !only.includes(String(d.id))) continue;
    let fen = d.fen, low = [];
    if (!fen) { const c = cachedFen(d.diagram); fen = c.fen; low = c.low || []; }
    fen = applyFix(fen, d.fix);
    const r = buildTree(fen, d.first, d.main || [], {}, d.vars || []);
    const last = r.mainline.length ? r.mainline[r.mainline.length - 1] : null;
    const mate = last && G.isCheckmate(last.board, last.side !== 'do');
    console.log(`${r.warnings.length ? '✗' : '✓'} ${d.id}  ${fen}  (${r.mainline.length}/${(d.main || []).length} nước${mate ? ', CHIẾU BÍ' : ''})`);
    low.forEach(c => console.log(`     ⚠ ${G.toIccs(c.r * 9 + c.c)} ${c.color}→${c.type} ${c.score}/${c.margin}`));
    r.warnings.forEach(w => console.log('     ! ' + w));
    if (d.show || showAll) {
      const NAME = { r: 'Xe', n: 'Mã', b: 'Tượng', a: 'Sĩ', k: 'Tướng', c: 'Pháo', p: 'Tốt' };
      const ann = (pr, red) => (pr.captured ? ` x${NAME[pr.captured.toLowerCase()]}` : '') + (G.isCheckmate(pr.board, !red) ? ' #' : (G.inCheck(pr.board, !red) ? ' +' : ''));
      { let bb = G.loadFen(fen); const out = [];
        for (let i = 0; i < (d.main || []).length; i++) { const red = ((i + 1) % 2 === 1) ? d.first === 'do' : d.first !== 'do'; const pr = play(bb, d.main[i], red); if (pr.err) break; out.push(`${i + 1}.${red ? 'Đỏ' : 'Đen'} ${pr.wxf}${ann(pr, red)}`); bb = pr.board; }
        console.log('     main: ' + out.join(' | ')); }
      (d.vars || []).forEach((v, k) => {
        const base = (v.from === undefined || v.from === 'main') ? d.main : null;
        let node = { board: G.loadFen(fen) }; const out = [];
        // dựng lại đường đầy đủ của biến k để in tên nước
        const lines = [d.main]; (d.vars || []).forEach((vv) => { const b = (vv.from === undefined || vv.from === 'main') ? lines[0] : lines[vv.from + 1]; lines.push(b.slice(0, vv.after).concat(vv.moves)); });
        const full = lines[k + 1];
        for (let i = 0; i < full.length; i++) {
          const red = ((i + 1) % 2 === 1) ? d.first === 'do' : d.first !== 'do';
          const pr = play(node.board, full[i], red); if (pr.err) { out.push('ERR'); break; }
          if (i >= v.after) out.push(`${i + 1 - v.after}.${red ? 'Đỏ' : 'Đen'} ${pr.wxf}${ann(pr, red)}`);
          node = pr;
        }
        console.log(`     var${k} (from ${v.from === undefined ? 'main' : v.from}, after ${v.after}): ` + out.join(' | '));
      });
    }
  }
}

// node tcbd.cjs repair <drafts.json> <id> <ply>  — sách in sai 1 nước? Thử MỌI nước hợp lệ của đúng bên
// ở ply đó, giữ lại những nước khiến TOÀN BỘ phần còn lại của mạch chính đi được. Chỉ gợi ý — người
// viết phải đối chiếu với lời bình của sách (chiếu, ăn quân...) trước khi chấp nhận.
function cmdRepair(args) {
  const list = JSON.parse(fs.readFileSync(args[0], 'utf8'));
  const d = list.find(x => String(x.id) === args[1]); const ply = +args[2];
  let fen = d.fen || cachedFen(d.diagram).fen; fen = applyFix(fen, d.fix);
  let b = G.loadFen(fen);
  const redAt = (p) => ((p % 2 === 1) ? d.first === 'do' : d.first !== 'do');
  for (let i = 0; i < ply - 1; i++) { const r = play(b, d.main[i], redAt(i + 1)); if (r.err) { console.log('lỗi trước ply', i + 1, r.err); return; } b = r.board; }
  const red = redAt(ply); let found = 0;
  for (let f = 0; f < 90; f++) {
    if (!b[f] || isRedCh(b[f]) !== red) continue;
    for (let t = 0; t < 90; t++) {
      if (!G.legalNoSelfCheck(b, f, t)) continue;
      let nb = b.slice(); const w = G.notation(b, f, t); nb[t] = nb[f]; nb[f] = null; let ok = true;
      for (let i = ply; i < d.main.length; i++) { const r = play(nb, d.main[i], redAt(i + 1)); if (r.err) { ok = false; break; } nb = r.board; }
      if (ok) { found++; console.log(`  ✓ ply ${ply}: ${w}  (sách ghi "${d.main[ply - 1]}")`); }
    }
  }
  if (!found) console.log('  không nước nào làm phần còn lại hợp lệ');
}

const [cmd, ...rest] = process.argv.slice(2);
if (cmd === 'check') cmdCheck(rest);
else if (cmd === 'repair') cmdRepair(rest);
else if (cmd === 'drafts') cmdDrafts(rest);
else if (cmd === 'build') cmdBuild(rest);
else console.log('Dùng: node tcbd.cjs check <diagram|FEN> <do|den> [nước...] | build <batch.json>...');

module.exports = { buildTree, buildLesson, play };
