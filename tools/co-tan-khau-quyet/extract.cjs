// Trích 323 file XQF "khẩu quyết cờ tàn" → drafts/ctkq.json (định dạng tcbd) + meta.json (đường dẫn, tiêu đề, khẩu quyết gốc).
const cp = require('child_process'), path = require('path'), fs = require('fs');
const DEC = 'D:/wamp64/www/cotuong/tools/xqf-decoder/decode.js';
const OUT = 'D:/wamp64/www/cotuong/tools/trung-cuoc-bao-dien/drafts/ctkq.json';
const root = 'E:/Co Tuong Mr Thanh/KHAU QUYET CO TAN C4 CO BINH LUAN XFQ';
const files = [];
(function w(d) { for (const f of fs.readdirSync(d).sort()) { const p = path.join(d, f); fs.statSync(p).isDirectory() ? w(p) : /\.xqf$/i.test(f) && files.push(p); } })(root);
const GROUP = { 'CO TAN CHOT': 'c', 'CO TAN MA': 'm', 'CO TAN PHAO': 'p', 'CO TAN XE': 'x' };
const drafts = [], meta = [];
for (const f of files) {
  const rel = path.relative(root, f).split(path.sep);
  const o = JSON.parse(cp.execFileSync('node', [DEC, f, '--json', '--full'], { encoding: 'utf8', maxBuffer: 1 << 26 }));
  const sub = rel[1].match(/^([A-E]),/)[1].toLowerCase();
  const base = rel[2].replace(/\.xqf$/i, '');
  const num = (base.match(/^(?:BAI\s*)?(\d+)/i) || [])[1] || base.replace(/\W+/g, '').toLowerCase();
  const id = `${GROUP[rel[0]]}${sub}-${num}`;
  const t = o.variation_tree;
  // bên đi trước = màu quân của nước đầu
  const b = {}; o.fen_initial.split('/').forEach((row, r) => { let c = 0; for (const ch of row) { if (/\d/.test(ch)) c += +ch; else { b[String.fromCharCode(97 + c) + (9 - r)] = ch; c++; } } });
  const p0 = t.main.length ? b[t.main[0].slice(0, 2)] : null;
  const first = p0 ? (p0 === p0.toUpperCase() ? 'do' : 'den') : (o.who_play === 1 ? 'den' : 'do');
  drafts.push({ id, fen: o.fen_initial, first, main: t.main, vars: t.vars.map(v => ({ from: v.from, after: v.after, moves: v.moves })) });
  meta.push({ id, file: rel.join('/'), group: rel[0], sub: rel[1], title: base, comment: o.file_level_comment, moveComments: t.comments, varComments: t.vars.map(v => v.comments) });
}
const ids = new Set(); for (const d of drafts) { if (ids.has(d.id)) console.log('DUP', d.id); ids.add(d.id); }
fs.writeFileSync(OUT, JSON.stringify(drafts));
fs.writeFileSync(require('os').tmpdir() + '/ctkq-meta.json', JSON.stringify(meta, null, 1));
console.log(drafts.length, drafts.reduce((s, d) => s + d.vars.length, 0), 'vars');
