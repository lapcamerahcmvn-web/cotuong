'use strict';

const { iccsToSquares, treeFinalFen, treeFinalIccs } = require('./render-board.cjs');

const START_FEN = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';

/**
 * Chọn THẾ CỜ để render cho 1 bài học, theo thứ tự ưu tiên (xem .claude/... kế hoạch A.3):
 *   1. Override admin: lesson.og_step (step_order) — có ở P2
 *   2. Có steps → FEN nước mainline CUỐI CÙNG
 *   3. Chỉ có variation_tree → đi hết con đầu → FEN node cuối
 *   4. Có initial_fen, không nước đi → initial_fen (vd cờ úp minh hoạ)
 *   5. Không có gì → null (dùng ảnh fallback theo giai đoạn)
 */
function pickPosition(lesson) {
  const steps = (lesson.steps || []).slice().sort((a, b) => a.step_order - b.step_order);

  if (lesson.og_step != null) {
    const s = steps.find((x) => x.step_order === lesson.og_step);
    if (s && s.fen) return { fen: s.fen, last: iccsToSquares(s.move_notation_iccs) };
  }
  if (steps.length) {
    const last = steps[steps.length - 1];
    return { fen: last.fen, last: iccsToSquares(last.move_notation_iccs) };
  }
  if (Array.isArray(lesson.variation_tree) && lesson.variation_tree.length) {
    const base = lesson.initial_fen || START_FEN;
    return { fen: treeFinalFen(lesson.variation_tree, base), last: iccsToSquares(treeFinalIccs(lesson.variation_tree)) };
  }
  if (lesson.initial_fen) return { fen: lesson.initial_fen, last: null };
  return null;
}

/** Danh sách job: mỗi bài published có thế cờ → 1 ảnh; mỗi series → ảnh từ bài đầu. */
function buildJobs(content) {
  const jobs = [];
  const lessons = (content.lessons || []).filter((l) => l.status === 'published');

  for (const l of lessons) {
    const pos = pickPosition(l);
    if (!pos || !pos.fen) continue;
    jobs.push({
      kind: 'lesson',
      slug: l.slug,
      title: l.title,
      phase: l.phase,
      gameMode: l.game_mode,
      moveCount: l.move_count || 0,
      level: l.level,
      fen: pos.fen,
      last: pos.last,
    });
  }

  // Series: lấy thế cờ bài đầu tiên trong chuỗi (order_in_series nhỏ nhất).
  for (const s of content.series || []) {
    const inSeries = lessons
      .filter((l) => l.series_slug === s.slug)
      .sort((a, b) => (a.order_in_series || 0) - (b.order_in_series || 0));
    if (!inSeries.length) continue;
    const pos = pickPosition(inSeries[0]);
    if (!pos || !pos.fen) continue;
    jobs.push({
      kind: 'series',
      slug: s.slug,
      title: s.name,
      phase: s.phase,
      gameMode: s.game_mode,
      moveCount: inSeries.length,
      moveCountLabel: inSeries.length + ' bài học',
      fen: pos.fen,
      last: pos.last,
    });
  }

  return jobs;
}

module.exports = { buildJobs, pickPosition };
