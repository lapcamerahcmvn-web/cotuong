// tools/nguyen-ly-tan-cuoc/gen.cjs — Dựng lại chuyên đề "48 Bài Nguyên Lý Tàn Cuộc" theo đúng 48 bài giảng của nguồn:
// src.json (extract.cjs: thế cờ + nước + nhánh) + text/bai-NN.cjs (tiêu đề, lời giảng, lời từng nước — viết lại có dấu).
//   node tools/nguyen-ly-tan-cuoc/gen.cjs [--partial]   → tools/trung-cuoc-bao-dien/batches/48-bai-nguyen-ly-tan-cuoc.json
// Giữ nguyên slug 48 bài cũ (khớp theo thế đầu + nước đi) để không mất tiến độ học / liên kết; bài mới slug theo tiêu đề.
'use strict';
const fs = require('fs');
const path = require('path');
const G = require('../mate-book/gen.cjs');

// Đi thử một chuỗi ICCS: trả về số nước hợp lệ liên tiếp từ đầu.
const sqOf = (s) => (9 - +s[1]) * 9 + (s.charCodeAt(0) - 97);
function legalPrefix(fen, first, moves) {
  let b = G.loadFen(fen), red = first === 'do';
  for (let i = 0; i < moves.length; i++) {
    const m = moves[i];
    if (!/^[a-i]\d[a-i]\d$/.test(m || '')) return i;
    const f = sqOf(m.slice(0, 2)), t = sqOf(m.slice(2));
    const p = b[f];
    if (!p || (p === p.toUpperCase()) !== red || !G.legalMove(b, f, t) || !G.legalNoSelfCheck(b, f, t)) return i;
    b = b.slice(); b[t] = p; b[f] = null; red = !red;
  }
  return moves.length;
}
function endsInMate(fen, first, moves) {
  let b = G.loadFen(fen), red = first === 'do';
  for (const m of moves) { const f = sqOf(m.slice(0, 2)), t = sqOf(m.slice(2)); b = b.slice(); b[t] = b[f]; b[f] = null; red = !red; }
  return G.isCheckmate(b, red);
}
// Mạch chính cắt ở nước lỗi đầu tiên; nhánh lỗi (hoặc gốc là nhánh đã bỏ) bị bỏ, chỉ số `from` đánh lại.
function sanitize(s) {
  const report = [];
  const n = legalPrefix(s.fen, s.first, s.main);
  const main = s.main.slice(0, n);
  if (n < s.main.length) report.push(`mạch chính cắt ${s.main.length}→${n}`);
  const lines = [], map = {}, vars = [];
  s.vars.forEach((v, j) => {
    const base = v.from === 'main' ? main : (map[v.from] !== undefined ? lines[map[v.from]] : null);
    if (!base || v.after > base.length) { report.push(`bỏ nhánh ${j} (gốc không còn)`); return; }
    const full = base.slice(0, v.after).concat(v.moves);
    if (legalPrefix(s.fen, s.first, full) < full.length || !v.moves.length) { report.push(`bỏ nhánh ${j} (nước sai)`); return; }
    map[j] = vars.length; lines.push(full);
    vars.push({ ...v, from: v.from === 'main' ? 'main' : map[v.from], _orig: j });
  });
  return { main, vars, report };
}

if (process.argv.includes('--check')) {   // chỉ kiểm nước đi/nhánh của toàn bộ src.json
  const S0 = JSON.parse(fs.readFileSync(path.join(__dirname, 'src.json'), 'utf8'));
  let n = 0;
  for (const s of S0) { if (s.text) continue; const z = sanitize(s); if (z.report.length) { n++; console.log(s.bai, s.key, '—', z.report.join('; ')); } }
  console.log('file có vấn đề:', n);
  process.exit(0);
}
const SERIES = '48-bai-nguyen-ly-tan-cuoc';
const SRC = JSON.parse(fs.readFileSync(path.join(__dirname, 'src.json'), 'utf8'));
const START = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';
const partial = process.argv.includes('--partial');

// Bài/chuyên đề cũ lấy từ bản đã commit của 48 bài gốc (không lấy working copy — tcbd build đã ghi đè thì lần chạy sau
// sẽ coi bài mới là "cũ" và sinh slug -2). OLD_REF mặc định 303f658 (commit cuối còn bộ 48 bài cũ).
const { execSync } = require('child_process');
const OLD_REF = process.env.OLD_REF || '303f658';
const gitJson = (f) => JSON.parse(execSync(`git show ${OLD_REF}:database/seeders/data/content/${f}`, { cwd: path.resolve(__dirname, '../..'), maxBuffer: 1 << 28 }).toString());
const old = gitJson(`${SERIES}.json`);
const oldSeries = gitJson('series.json').series.find((s) => s.slug === SERIES);

// Slug cũ ↔ file nguồn: cùng thế đầu và cùng chuỗi nước (cả 48 bài cũ đều khớp đúng 1 file).
const slugOf = new Map();
for (const l of old) {
  const mv = l.steps.map((s) => s.move_notation_iccs).join(' ');
  const hit = SRC.find((s) => !s.text && s.fen === l.initial_fen && s.main.join(' ') === mv);
  if (hit) slugOf.set(hit.bai + '|' + hit.key, l.slug);
}

const vn = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
const slugify = (s) => vn(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const plain = (h) => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const clip = (s, n) => (s.length <= n ? s : s.slice(0, n - 1).replace(/[\s,:;—-]+\S*$/, '') + '…');
const LEVEL = (b) => (b <= 10 ? 'co-ban' : b <= 30 ? 'trung-cap' : 'nang-cao');

const texts = {};
for (let b = 1; b <= 48; b++) {
  const f = path.join(__dirname, 'text', `bai-${String(b).padStart(2, '0')}.cjs`);
  if (fs.existsSync(f)) texts[b] = require(f);
}
const missing = [];
const lessons = [];
const used = new Set(old.map((l) => l.slug));
const byBai = {};
for (const s of SRC) (byBai[s.bai] = byBai[s.bai] || []).push(s);

for (let b = 1; b <= 48; b++) {
  const T = texts[b];
  if (!T) { missing.push(b); continue; }
  const files = byBai[b] || [];
  const recs = [];
  files.forEach((s, i) => {
    const x = T.f[s.key];
    if (!x) { missing.push(`${b}|${s.key}`); return; }
    let slug = slugOf.get(b + '|' + s.key);
    if (!slug) {
      slug = clip(slugify(`tan-cuoc-bai-${b}-${x.t.replace(/^(Ví Dụ|Khái Lược|Bài Tập Nhỏ)[^:]*:\s*/, '')}`), 90).replace(/…$|-$/g, '');
      let k = 2; const base = slug; while (used.has(slug)) slug = `${base}-${k++}`;
    }
    used.add(slug);
    const hasBoard = !s.text && s.fen && !(s.fen === START && !s.main.length);
    const rec = {
      order: b * 100 + i + 1, slug, title: `Bài ${b} · ${x.t}`, level: LEVEL(b),
      summary: x.s, seo_title: clip(x.t, 60), seo_description: clip(x.s, 160),
      status: x.draft ? 'draft' : 'published',   // draft: thế cờ nguồn không hợp lý → ngưng public
    };
    if (hasBoard) {
      const z = sanitize(s);
      if (z.report.length) console.log(`  ! bài ${b} "${s.key}": ${z.report.join('; ')}`);
      Object.assign(rec, { fen: s.fen, first: s.first, main: z.main, captions: x.k || {} });
      // Cây biến lồng ~2 cấp/nước: ván quá dài (bài 35, 298 nước) vượt giới hạn 512 cấp của json_decode PHP → seeder
      // bỏ qua cả file. Ván > 240 nước chỉ giữ mạch chính (ý của nhánh phụ đã có trong lời giảng).
      if (z.vars.length && z.main.length <= 240) rec.vars = z.vars.map((v) => ({ from: v.from, after: v.after, moves: v.moves, captions: (x.v || {})[v._orig] || {} }));
      // Giải đố (bắt đi đúng từng nước) chỉ khi mạch chính ngắn và kết thúc bằng chiếu bí — thế thắng tàn cuộc dài có
      // nhiều nước thắng tương đương, bắt đúng 1 đường sẽ báo sai oan. Bên giải phải là bên đi nước đầu.
      if (x.p && !x.draft && x.p === s.first && z.main.length && z.main.length <= 15 && endsInMate(s.fen, s.first, z.main)) rec.puzzle_side = x.p;
    }
    recs.push({ rec, x, s });
  });
  // Nội dung + liên kết các phần cùng bài giảng.
  recs.forEach(({ rec, x }, i) => {
    const sib = recs.map((r, j) => (j === i || r.x.draft ? `<li><strong>${r.x.t}</strong></li>` : `<li><a href="/bai-hoc/${r.rec.slug}">${r.x.t}</a></li>`)).join('');
    rec.content = x.c
      + ({ thang: 'bên tấn công thắng.', do: 'Đỏ thắng.', den: 'Đen thắng.', hoa: 'hòa.' }[x.kq] ? `<p><strong>Kết quả:</strong> ${{ thang: 'bên tấn công thắng.', do: 'Đỏ thắng.', den: 'Đen thắng.', hoa: 'hòa.' }[x.kq]}</p>` : '')
      + (recs.length > 1 ? `<h2>Bài ${b}: ${T.ten}</h2><p>${T.y}</p><ol>${sib}</ol>` : '');
    lessons.push(rec);
  });
}

if (missing.length && !partial) { console.error('Thiếu lời giảng:', missing.join(', ')); process.exit(1); }
const series = Object.assign({}, oldSeries, {
  planned_total: lessons.filter((l) => l.status !== 'draft').length,
  description: '48 bài giảng nguyên lý tàn cuộc: vì sao phải học tàn cuộc, phân loại tàn cuộc, giới hạn binh lực, mưu đoạt Chốt, phá Sĩ Tượng, chiến thuật kìm chế – nước chờ – vây khốn, các tổ hợp quân và tứ đại danh cuộc — mỗi bài kèm ví dụ có nhánh biến và lời giảng từng nước.',
});
const OUT = path.resolve(__dirname, '../trung-cuoc-bao-dien/batches/48-bai-nguyen-ly-tan-cuoc.json');
fs.writeFileSync(OUT, JSON.stringify({ series, lessons }, null, 1) + '\n');
console.log(`${lessons.length} bài (${lessons.filter((l) => l.fen).length} có bàn cờ, ${lessons.filter((l) => l.puzzle_side).length} giải đố), giữ ${[...slugOf.values()].filter((s) => lessons.some((l) => l.slug === s)).length}/${old.length} slug cũ${missing.length ? ' — CÒN THIẾU ' + missing.length : ''}`);
