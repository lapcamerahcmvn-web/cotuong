'use strict';
/**
 * Dựng các bài "Kiến thức cờ tướng" (SEO, liên kết bài học + chức năng web) → database/seeders/data/posts.json
 * + ảnh chia sẻ public/og/posts/*.png, public/og/thumbs/posts/*.png.
 *
 *   node tools/news-seo/build.cjs            # kiểm tra + ghi
 *   node tools/news-seo/build.cjs --check    # chỉ kiểm tra (không ghi)
 *
 * Mỗi file posts/*.cjs xuất (h) => ({ slug, title, seo_title, seo_description, excerpt, og, featured?, content }).
 * h.* sinh link/bàn cờ VÀ kiểm tra đích có thật (bài học published, chuyên đề, trang chức năng, bài viết khác).
 * Bài trong posts.json do người khác viết (không có trong posts/) giữ nguyên.
 * Seed: php artisan db:seed --class=PostSeeder --force (chỉ ghi đè bài khi bản JSON mới hơn DB).
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '../..');
const IO = require('../trung-cuoc-bao-dien/content-io.cjs');
const POSTS_JSON = path.join(ROOT, 'database/seeders/data/posts.json');
const CATEGORY = 'kien-thuc-co-tuong';
const START_FEN = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';
const checkOnly = process.argv.includes('--check');

const content = IO.read();
const lessons = new Map(content.lessons.filter((l) => l.status === 'published').map((l) => [l.slug, l]));
const byTitle = new Map([...lessons.values()].map((l) => [l.title, l]));
const series = new Map(content.series.map((s) => [s.slug, s]));
const PHASES = ['nhap-mon', 'khai-cuoc', 'trung-cuoc', 'tan-cuoc', 'co-up'];
const FEATURES = new Set([
  '/', '/lo-trinh', '/luyen-tap', '/luyen-tap/hom-nay', '/luyen-tap/60-giay', '/luyen-tap/3-mang', '/luyen-tap/kiem-tra',
  '/luyen-tap/xep-co', '/luyen-tap/sai-lam-cua-toi', '/luyen-tap/loi-sai', '/choi-voi-may', '/dau-ban', '/thu-thach-tuan',
  '/xep-hang', '/nhan-dien-ban-co', '/giao-dien-ban-co', '/tin-tuc', '/tim-kiem', '/so-do-trang', '/dang-ky',
  '/tai-khoan/lich-su-van-dau', '/tai-khoan/thu-vien',
  ...['song-xe', 'xe', 'ma', 'phao', 'tot', 'nhanh', 'tan-cuoc'].map((s) => '/luyen-tap/chu-de/' + s),
]);

const existing = JSON.parse(fs.readFileSync(POSTS_JSON, 'utf8'));
const files = fs.readdirSync(path.join(__dirname, 'posts')).filter((f) => f.endsWith('.cjs')).sort();
const ownSlugs = new Set();
const postSlugs = new Set(existing.posts.map((p) => p.slug));
const errors = [];
let cur = '';
const err = (m) => errors.push(`${cur}: ${m}`);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const a = (href, text) => `<a href="${href}">${text}</a>`;
const pendingPostLinks = [];

const h = {
  /** Link bài học theo slug (text mặc định = tên bài). */
  L(slug, text) {
    const l = lessons.get(slug);
    if (!l) err('không có bài học ' + slug);
    return a('/bai-hoc/' + slug, text || (l ? l.title : slug));
  },
  /** Link bài học theo đúng tên bài. */
  T(title, text) {
    const l = byTitle.get(title);
    if (!l) { err('không có bài tên "' + title + '"'); return text || title; }
    return a('/bai-hoc/' + l.slug, text || title.replace(/^.*? · /, ''));
  },
  slugOf(title) { const l = byTitle.get(title); if (!l) err('không có bài tên "' + title + '"'); return l ? l.slug : ''; },
  /** Link chương trình (chuyên đề). */
  S(slug, text) {
    const s = series.get(slug);
    if (!s) err('không có chuyên đề ' + slug);
    return a('/chuong-trinh/' + slug, text || (s ? s.name : slug));
  },
  /** Link trang giai đoạn: nhap-mon, khai-cuoc, trung-cuoc, tan-cuoc, co-up. */
  P(phase, text) { if (!PHASES.includes(phase)) err('giai đoạn lạ ' + phase); return a('/' + phase, text); },
  /** Link trang chức năng. */
  F(href, text) { if (!FEATURES.has(href)) err('trang chức năng lạ ' + href); return a(href, text); },
  /** Link sang bài viết khác (kiểm sau khi nạp đủ). */
  N(slug, text) { pendingPostLinks.push([cur, slug]); return a('/tin-tuc/' + CATEGORY + '/' + slug, text); },
  /** Bàn cờ tương tác của 1 bài học. */
  B(slug) { if (!lessons.has(slug)) err('nhúng bàn cờ: không có bài ' + slug); return `[co-tuong lesson="${slug}"]`; },
  /** Bàn cờ tĩnh từ FEN + chú thích. */
  FEN(fen, caption) {
    const rows = fen.split(' ')[0].split('/');
    if (rows.length !== 10 || rows.some((r) => r.replace(/\d/g, (d) => 'x'.repeat(+d)).length !== 9)) err('FEN sai ' + fen);
    return `[co-tuong fen="${fen}"${caption ? ` caption="${esc(caption)}"` : ''}]`;
  },
  /**
   * Sơ đồ tư duy tự dựng từ chuyên đề (App\Support\Mindmap::fromSeries): ket-qua = hoa | thang | kheo.
   * Kiểm tra chuyên đề có thật + đếm số bài khớp (bài có "Kết quả:" và "Khẩu quyết").
   */
  MM(seriesSlug, result, title, intro) {
    const s = series.get(seriesSlug);
    if (!s) err('sơ đồ: không có chuyên đề ' + seriesSlug);
    if (!['hoa', 'thang', 'kheo'].includes(result)) err('sơ đồ: kết quả lạ ' + result);
    const n = [...lessons.values()].filter((l) => l.series_slug === seriesSlug || l.series === seriesSlug).length;
    if (s && !n) err('sơ đồ: chuyên đề ' + seriesSlug + ' chưa có bài published');
    return `[so-do-tu-duy chuyen-de="${seriesSlug}" ket-qua="${result}"${title ? ` tieu-de="${esc(title)}"` : ''}${intro ? ` gioi-thieu="${esc(intro)}"` : ''}]`;
  },
  START_FEN,
  home: a('/', 'Học Cờ Tướng'),
};

const built = [];
for (const f of files) {
  cur = f;
  const p = require(path.join(__dirname, 'posts', f))(h);
  cur = p.slug || f;
  if (!/^[a-z0-9-]+$/.test(p.slug || '')) err('slug sai');
  if (ownSlugs.has(p.slug)) err('trùng slug');
  ownSlugs.add(p.slug); postSlugs.add(p.slug);
  if (!p.seo_title || p.seo_title.length > 65) err(`seo_title ${p.seo_title?.length} ký tự (>65)`);
  if (!p.seo_description || p.seo_description.length < 120 || p.seo_description.length > 160) err(`seo_description ${p.seo_description?.length} ký tự (cần 120–160)`);
  if (!p.excerpt || p.excerpt.length > 300) err('excerpt thiếu/dài');
  const words = p.content.replace(/\[(co-tuong|so-do-tu-duy)[^\]]*\]/g, '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words < 900) err(`chỉ ${words} chữ (<900)`);
  if (!/<h2[^>]*>[^<]*Câu hỏi thường gặp/i.test(p.content)) err('thiếu mục Câu hỏi thường gặp');
  if (/<h1/i.test(p.content)) err('không dùng <h1> trong bài');
  built.push({ ...p, words, file: f });
}
for (const [file, slug] of pendingPostLinks) if (!postSlugs.has(slug)) errors.push(`${file}: link tới bài viết chưa có ${slug}`);

console.log(built.map((p) => `${String(p.words).padStart(5)} chữ  ${p.slug}`).join('\n'));
if (errors.length) { console.error('\n✗ ' + errors.length + ' lỗi:\n  ' + errors.join('\n  ')); process.exit(1); }
console.log(`\n✓ ${built.length} bài hợp lệ, tổng ${built.reduce((s, p) => s + p.words, 0)} chữ.`);
if (checkOnly) process.exit(0);

// ---- Ghi posts.json: bài của tool thay/ thêm; giữ nguyên bài khác. updated_at chỉ đổi khi nội dung đổi. ----
const hash = (o) => crypto.createHash('sha1').update(JSON.stringify([o.title, o.excerpt, o.content, o.seo_title, o.seo_description, o.is_featured])).digest('hex');
const old = new Map(existing.posts.map((p) => [p.slug, p]));
const now = new Date(Math.floor(Date.now() / 1000) * 1000);
const iso = (d) => d.toISOString().replace(/\.\d{3}Z$/, 'Z'); // không mili-giây: DB lưu tới giây
const out = existing.posts.filter((p) => !ownSlugs.has(p.slug));
built.forEach((p, i) => {
  const row = {
    slug: p.slug, category_slug: CATEGORY, title: p.title, excerpt: p.excerpt, content: p.content.trim(),
    thumbnail: null, is_featured: !!p.featured, status: 'published', seo_title: p.seo_title, seo_description: p.seo_description,
  };
  const prev = old.get(p.slug);
  const same = prev && hash(prev) === hash(row);
  // Ngày đăng: bài mới rải cách nhau 1 phút theo thứ tự file (bài số nhỏ hiện sau cùng = "mới nhất").
  row.published_at = prev?.published_at?.replace(/\.\d{3}Z$/, 'Z') || iso(new Date(now.getTime() - i * 60000));
  row.updated_at = same && prev.updated_at ? prev.updated_at.replace(/\.\d{3}Z$/, 'Z') : iso(now);
  out.push(row);
});
fs.writeFileSync(POSTS_JSON, JSON.stringify({ exported_at: iso(now), posts: out }, null, 4).replace(/\//g, '\\/'));
console.log(`→ posts.json: ${out.length} bài (${built.length} từ tools/news-seo).`);

// ---- Ảnh chia sẻ (OG 1200×630 + thumb vuông) ----
const { Resvg } = require('../og-image/node_modules/@resvg/resvg-js');
const { compose, OG_W } = require('../og-image/compose.cjs');
const { composeThumb, SIZE } = require('../og-image/compose-thumb.cjs');
const { iccsToSquares } = require('../og-image/render-board.cjs');
const pick = require('../og-image/manifest.cjs');
const font = { fontFiles: [path.join(ROOT, 'public/fonts/xiangqi-kai.ttf')], loadSystemFonts: true, defaultFontFamily: 'Segoe UI' };
const outOg = path.join(ROOT, 'public/og/posts'), outTh = path.join(ROOT, 'public/og/thumbs/posts');
fs.mkdirSync(outOg, { recursive: true }); fs.mkdirSync(outTh, { recursive: true });
let made = 0;
for (const p of built) {
  let pos = { fen: START_FEN, last: null };
  if (p.og?.lesson) pos = pick.pickPosition(lessons.get(p.og.lesson)) || pos;
  if (p.og?.fen) pos = { fen: p.og.fen, last: p.og.last ? iccsToSquares(p.og.last) : null };
  const job = { kind: 'post', slug: p.slug, title: p.og?.title || p.title, kicker: 'KIẾN THỨC CỜ TƯỚNG', fen: pos.fen, last: pos.last };
  fs.writeFileSync(path.join(outOg, p.slug + '.png'), new Resvg(compose(job), { fitTo: { mode: 'width', value: OG_W }, font }).render().asPng());
  fs.writeFileSync(path.join(outTh, p.slug + '.png'), new Resvg(composeThumb(job), { fitTo: { mode: 'width', value: SIZE }, font }).render().asPng());
  made++;
}
for (const dir of [outOg, outTh]) for (const f of fs.readdirSync(dir)) if (!ownSlugs.has(f.replace(/\.png$/, ''))) fs.unlinkSync(path.join(dir, f));
console.log(`→ ${made} ảnh chia sẻ (public/og/posts + thumbs/posts). Nén: python tools/og-image/optimize.py`);
