// tools/nguyen-ly-tan-cuoc/extract.cjs — 214 file XQF/TXT "48 bài nguyên lý tàn cuộc" (ổ E:, nội bộ) → src.json:
// chỉ thế cờ + nước đi + nhánh biến (KHÔNG chép lời bình — lời giảng viết lại bằng lời riêng trong text/bai-NN.cjs).
//   node tools/nguyen-ly-tan-cuoc/extract.cjs [thư mục nguồn] [--comments <out.json>]
// --comments: xuất thêm lời bình gốc (không dấu) ra file NGOÀI repo để đọc khi soạn lời giảng.
const cp = require('child_process'), path = require('path'), fs = require('fs');
const G = require('../mate-book/gen.cjs');
const DEC = path.join(__dirname, '../xqf-decoder/decode.js');
const args = process.argv.slice(2);
const root = args[0] && !args[0].startsWith('--') ? args[0] : 'E:/Co Tuong Mr Thanh/48 BAI GIANG NGUYEN  LY TAN CUOC XQF FULL';
const ci = args.indexOf('--comments'), commentsOut = ci >= 0 ? args[ci + 1] : null;
const START = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';

// File .txt (bài 18): FEN + nước đi ký hiệu chữ Hán (车六平四 / 将４平５) → ICCS.
const PIECE = { 车: 'X', 車: 'X', 马: 'M', 馬: 'M', 炮: 'P', 砲: 'P', 兵: 'B', 卒: 'B', 仕: 'S', 士: 'S', 相: 'T', 象: 'T', 帅: 'Tg', 帥: 'Tg', 将: 'Tg', 將: 'Tg' };
const NUM = (c) => '一二三四五六七八九'.indexOf(c) + 1 || '１２３４５６７８９'.indexOf(c) + 1 || +c;
const RE_MOVE = /^([前后])?([车車马馬炮砲兵卒仕士相象帅帥将將])([一二三四五六七八九１２３４５６７８９]?)([进退平])([一二三四五六七八九１２３４５６７８９])$/;
function cnToVn(m) {
  const r = RE_MOVE.exec(m);
  if (!r) return null;
  const op = { 进: '.', 退: '/', 平: '-' }[r[4]];
  return PIECE[r[2]] + (r[1] ? (r[1] === '前' ? 't' : 's') : NUM(r[3])) + op + NUM(r[5]);
}
function parseTxt(raw) {
  const fm = /FEN ：(\S+) ([wb])/.exec(raw);
  if (!fm || fm[1] === START) return null;
  const toks = [];
  for (const line of raw.split(/\r?\n/)) {
    if (!/^\s*\d+\./.test(line)) continue;
    for (const t of line.replace(/\d+\./g, ' ').trim().split(/\s+/)) if (t && !/^…+$/.test(t)) toks.push(t);
  }
  let b = G.loadFen(fm[1]), red = fm[2] === 'w';
  const first = red ? 'do' : 'den', main = [];
  for (const t of toks) {
    const vn = cnToVn(t);
    const mv = vn && G.parseMove(b, vn, red);
    if (!mv) { console.warn('  ! không đọc được nước', t); break; }
    main.push(G.toIccs(mv.from) + G.toIccs(mv.to));
    b = b.slice(); b[mv.to] = b[mv.from]; b[mv.from] = null; red = !red;
  }
  return { fen: fm[1], first, main };
}

const src = [], com = [];
for (const d of fs.readdirSync(root)) {
  const bai = +d.match(/^BAI (\d+)/)[1];
  for (const f of fs.readdirSync(path.join(root, d)).sort((a, b) => parseInt(a) - parseInt(b) || a.localeCompare(b))) {
    const p = path.join(root, d, f), key = f.replace(/\.(xqf|txt)$/i, '').trim();
    if (/\.txt$/i.test(f)) {
      const raw = fs.readFileSync(p, 'utf8').replace(/^\uFEFF/, '');
      const t = parseTxt(raw);
      src.push(t ? { bai, key, fen: t.fen, first: t.first, main: t.main, vars: [] } : { bai, key, text: true });
      com.push({ bai, key, file: raw.replace(/[\s\S]*?FEN ：[^\n]*\n/, ''), main: {}, vars: [] });
      continue;
    }
    const o = JSON.parse(cp.execFileSync('node', [DEC, p, '--json', '--full'], { encoding: 'utf8', maxBuffer: 1 << 26 }));
    const t = o.variation_tree;
    const b = {}; o.fen_initial.split('/').forEach((row, r) => { let c = 0; for (const ch of row) { if (/\d/.test(ch)) c += +ch; else { b[String.fromCharCode(97 + c) + (9 - r)] = ch; c++; } } });
    const p0 = t.main.length ? b[t.main[0].slice(0, 2)] : null;
    const first = p0 ? (p0 === p0.toUpperCase() ? 'do' : 'den') : (o.who_play === 1 ? 'den' : 'do');
    src.push({ bai, key, fen: o.fen_initial, first, main: t.main, vars: t.vars.map((v) => ({ from: v.from, after: v.after, moves: v.moves })) });
    com.push({ bai, key, file: o.file_level_comment, main: t.comments, vars: t.vars.map((v) => v.comments) });
  }
}
const order = (a, b) => a.bai - b.bai;
src.sort(order);
fs.writeFileSync(path.join(__dirname, 'src.json'), JSON.stringify(src) + '\n');
if (commentsOut) fs.writeFileSync(commentsOut, JSON.stringify(com.sort(order)));
console.log(src.length, 'file', src.filter((s) => s.text).length, 'bài chữ', src.reduce((s, x) => s + (x.vars || []).length, 0), 'nhánh');
