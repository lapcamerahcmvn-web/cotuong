/* tools/mate-book/build-batch.cjs — Dựng 1 lô bài sát pháp từ định nghĩa (FEN + nước + lời giảng
   viết lại), merge vào database/seeders/data/content.json (upsert series + lessons theo slug).
   An toàn: bài nào có warning (nước phạm luật ⇒ FEN sai) sẽ BỎ QUA, không ghi dữ liệu hỏng.
   Cách dùng: node build-batch.cjs <batch.json>  (hoặc require + gọi buildBatch). */
'use strict';
const fs = require('fs');
const path = require('path');
const { makeBuilder } = require('./gen.cjs');

const CONTENT = path.resolve(__dirname, '../../database/seeders/data/content.json');

function buildLesson(L, seriesSlug) {
  // Bài chỉ có văn bản (VD Lời Nói Đầu) — không bàn cờ.
  if (!L.main || !L.fen) {
    return {
      series_slug: seriesSlug, order_in_series: L.order,
      game_mode: 'co-tuong', phase: 'trung-cuoc',
      title: L.title, slug: L.slug, level: L.level || 'co-ban',
      source_type: 'manual', initial_fen: null, variation_tree: null, move_count: 0,
      summary: L.summary || null, content: L.content || null,
      status: 'published', decode_confidence: null, thumbnail: null,
      seo_title: L.seo_title || L.title, seo_description: L.seo_description || L.summary || null,
      is_featured: false, steps: [],
    };
  }
  const r = makeBuilder(L.fen, L.first || 'do').build({ main: L.main, captions: L.captions || {}, variations: L.variations || [] });
  if (r.warnings.length) {
    console.error(`  ✗ BỎ QUA "${L.title}" — ${r.warnings.length} cảnh báo:`);
    r.warnings.forEach(w => console.error('     ! ' + w));
    return null;
  }
  const steps = r.mainline.map((m, i) => ({
    step_order: i + 1, fen: m.fen,
    move_notation_wxf: m.wxf, move_notation_iccs: m.iccs,
    move_side: m.side, moved_piece: null, captured_piece: null,
    caption: m.caption || '', is_flip_reveal: false,
  }));
  // Chỉ giữ variation_tree khi có NHÁNH thật (một node có >1 con). Bài tuyến tính → null.
  const hasBranch = (nodes) => nodes.some(n => n.children.length > 1 || hasBranch(n.children));
  const tree = (r.variation_tree.length && hasBranch(r.variation_tree)) ? r.variation_tree : null;
  return {
    series_slug: seriesSlug, order_in_series: L.order,
    game_mode: 'co-tuong', phase: 'trung-cuoc',
    title: L.title, slug: L.slug, level: L.level || 'co-ban',
    source_type: 'manual', initial_fen: r.initial_fen,
    variation_tree: tree,
    move_count: steps.length,
    summary: L.summary || null, content: L.content || null,
    status: 'published', decode_confidence: 'high',
    thumbnail: null, seo_title: L.seo_title || L.title,
    seo_description: L.seo_description || L.summary || null,
    is_featured: false, steps,
  };
}

function buildBatch(batch) {
  const data = JSON.parse(fs.readFileSync(CONTENT, 'utf8'));
  data.series = data.series || []; data.lessons = data.lessons || [];
  // upsert series
  const s = batch.series;
  const si = data.series.findIndex(x => x.slug === s.slug);
  if (si >= 0) data.series[si] = Object.assign({}, data.series[si], s);
  else data.series.push(s);
  // upsert lessons
  let ok = 0, skip = 0;
  batch.lessons.forEach(L => {
    const rec = buildLesson(L, s.slug);
    if (!rec) { skip++; return; }
    const li = data.lessons.findIndex(x => x.slug === rec.slug);
    if (li >= 0) data.lessons[li] = rec; else data.lessons.push(rec);
    ok++;
    console.log(`  ✓ ${rec.title}  (${rec.move_count} nước${rec.variation_tree ? ', có biến' : ''})`);
  });
  fs.writeFileSync(CONTENT, JSON.stringify(data, null, 2) + '\n');
  console.log(`\nĐã ghi ${ok} bài (${skip} bỏ qua) vào content.json.`);
  return { ok, skip };
}

module.exports = { buildBatch, buildLesson };

if (require.main === module) {
  const batch = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
  buildBatch(batch);
}
