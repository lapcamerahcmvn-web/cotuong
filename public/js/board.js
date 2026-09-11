/* Học Cờ Tướng — bàn cờ tương tác (vanilla JS, không phụ thuộc jQuery/Alpine).
   Render FEN từng bước đã tính sẵn server-side. Auto-init mọi [data-xqboard] chứa 1
   <script type="application/json"> cấu hình: { initialFen, steps: [{fen,caption,side,iccs}] }.

   Chế độ: view (mạch chính tuyến tính) · tree (cây biến, mũi tên A/B) · puzzle (tự đi quân).
   Tương tác chung (view/tree): nút Tiến/Lùi, vuốt trái–phải trên bàn, phím ←/→, lật bàn,
   tự chạy, phóng to. Quân trượt mượt khi đổi bước (tắt nếu prefers-reduced-motion). */
(function () {
  'use strict';

  var REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Ký tự quân theo lối truyền thống: Đỏ và Đen dùng chữ khác nhau cho cùng loại quân.
  var PIECES = {
    K: { c: '帥', red: true }, A: { c: '仕', red: true }, B: { c: '相', red: true },
    N: { c: '馬', red: true }, R: { c: '俥', red: true }, C: { c: '炮', red: true }, P: { c: '兵', red: true },
    k: { c: '將' }, a: { c: '士' }, b: { c: '象' }, n: { c: '馬' }, r: { c: '車' }, c: { c: '砲' }, p: { c: '卒' },
    // Quân ÚP (cờ úp): mặt sấp, chưa lộ binh chủng. X = Đỏ úp, x = Đen úp.
    X: { up: true, red: true }, x: { up: true }
  };
  var PIECE_FONT = 'XiangqiKai,KaiTi,STKaiti,serif';

  function fenToBoard(fen) {
    var board = new Array(90).fill(null);
    var rows = (fen || '').split(' ')[0].split('/');
    for (var rank = 0; rank < rows.length && rank < 10; rank++) {
      var file = 0, row = rows[rank];
      for (var i = 0; i < row.length; i++) {
        var ch = row[i];
        if (ch >= '1' && ch <= '9') file += +ch;
        else { board[rank * 9 + file] = ch; file++; }
      }
    }
    return board;
  }

  // iccs "h2e2" -> {from:[file,rank], to:[file,rank]} theo hệ toạ độ hiển thị (rank 0 = trên).
  function iccsToSquares(iccs) {
    if (!iccs || iccs.length < 4) return null;
    function sq(a, b) {
      var f = a.charCodeAt(0) - 97;        // a-i -> 0-8
      var r = 9 - (b.charCodeAt(0) - 48);  // '9'->0 (top) ... '0'->9 (bottom)
      return [f, r];
    }
    return { from: sq(iccs[0], iccs[1]), to: sq(iccs[2], iccs[3]) };
  }

  var M = 26, CW = 52, CH = 52;
  var BW = M * 2 + CW * 8, BH = M * 2 + CH * 9;

  // arrows: [{from,to,color,label}] — from/to là chỉ số ô 0..89. Vẽ mũi tên chọn biến.
  // selected: chỉ số ô đang chọn (chế độ giải đố).
  // flip: true → nhìn từ phía Đen (xoay bàn 180°).
  function renderBoard(fen, lastMove, arrows, selected, flip) {
    function fx(f) { return flip ? 8 - f : f; }
    function ry(r) { return flip ? 9 - r : r; }
    function X(f) { return M + fx(f) * CW; }
    function Y(r) { return M + ry(r) * CH; }
    var board = fenToBoard(fen);
    var s = '<svg viewBox="0 0 ' + BW + ' ' + BH + '" width="100%" preserveAspectRatio="xMidYMid meet" style="width:100%;max-width:100%;height:auto;display:block" role="img" aria-label="Bàn cờ tướng">';
    s += '<rect x="0" y="0" width="' + BW + '" height="' + BH + '" rx="10" fill="var(--xq-wood,#e9cf9c)"/>';
    for (var r = 0; r < 10; r++) s += line(X(0), Y(r), X(8), Y(r));
    for (var f = 0; f < 9; f++) {
      if (f === 0 || f === 8) s += line(X(f), Y(0), X(f), Y(9));
      else { s += line(X(f), Y(0), X(f), Y(4)); s += line(X(f), Y(5), X(f), Y(9)); }
    }
    s += line(X(3), Y(0), X(5), Y(2)) + line(X(5), Y(0), X(3), Y(2));
    s += line(X(3), Y(7), X(5), Y(9)) + line(X(5), Y(7), X(3), Y(9));
    var midY = (M + 4 * CH + M + 5 * CH) / 2 + 6;
    s += '<text x="' + (M + 2 * CW) + '" y="' + midY + '" font-size="20" fill="var(--xq-line,#7c5a2c)" opacity=".5" font-family="' + PIECE_FONT + '" letter-spacing="6" text-anchor="middle">楚河</text>';
    s += '<text x="' + (M + 6 * CW) + '" y="' + midY + '" font-size="20" fill="var(--xq-line,#7c5a2c)" opacity=".5" font-family="' + PIECE_FONT + '" letter-spacing="6" text-anchor="middle">漢界</text>';
    if (lastMove) {
      [lastMove.from, lastMove.to].forEach(function (sq) {
        if (sq) s += '<circle cx="' + X(sq[0]) + '" cy="' + Y(sq[1]) + '" r="22" fill="var(--xq-hl,rgba(200,69,31,.30))"/>';
      });
      if (lastMove.to) {
        s += '<circle class="xq-pulse" cx="' + X(lastMove.to[0]) + '" cy="' + Y(lastMove.to[1]) + '" r="22" fill="none" stroke="var(--xq-red,#c0392b)" stroke-width="2.5" opacity="0"/>';
      }
    }
    for (var i = 0; i < 90; i++) {
      var chr = board[i]; if (!chr) continue;
      var p = PIECES[chr]; if (!p) continue;
      var ff = i % 9, rr = Math.floor(i / 9);
      var col = p.red ? 'var(--xq-red,#c0392b)' : 'var(--xq-black,#24333f)';
      var cx = X(ff), cy = Y(rr);
      var moved = lastMove && lastMove.to && lastMove.to[0] === ff && lastMove.to[1] === rr;
      var dx = 0, dy = 0;
      if (moved && lastMove.from) { dx = X(lastMove.from[0]) - cx; dy = Y(lastMove.from[1]) - cy; }
      s += '<g class="xq-pc' + (moved ? ' xq-pc-moved' : '') + '"' + (moved ? ' style="--fx:' + dx + 'px;--fy:' + dy + 'px"' : '') + '>';
      if (p.up) {
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="' + col + '"/>';
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="16.5" fill="none" stroke="var(--xq-disc,#f6ecd6)" stroke-width="1.5" opacity=".85"/>';
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="9" fill="none" stroke="var(--xq-disc,#f6ecd6)" stroke-width="1.5" opacity=".6"/>';
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="2.6" fill="var(--xq-disc,#f6ecd6)" opacity=".9"/>';
      } else {
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="var(--xq-disc,#f6ecd6)" stroke="' + col + '" stroke-width="2"/>';
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="17" fill="none" stroke="' + col + '" stroke-width="1" opacity=".35"/>';
        s += '<text x="' + cx + '" y="' + (cy + 8) + '" text-anchor="middle" font-size="24" font-family="' + PIECE_FONT + '" fill="' + col + '">' + p.c + '</text>';
      }
      s += '</g>';
    }
    if (typeof selected === 'number' && selected >= 0) {
      s += '<circle cx="' + X(selected % 9) + '" cy="' + Y((selected / 9) | 0) + '" r="23" fill="none" stroke="#2563eb" stroke-width="3"/>';
    }
    if (arrows && arrows.length) {
      arrows.forEach(function (a, k) {
        var fxp = X(a.from % 9), fyp = Y((a.from / 9) | 0), tx = X(a.to % 9), ty = Y((a.to / 9) | 0);
        var ddx = tx - fxp, ddy = ty - fyp, len = Math.sqrt(ddx * ddx + ddy * ddy) || 1, ux = ddx / len, uy = ddy / len;
        var sx = fxp + ux * 20, sy = fyp + uy * 20, ex = tx - ux * 20, ey = ty - uy * 20;
        var px = -uy, py = ux;
        s += '<line x1="' + sx + '" y1="' + sy + '" x2="' + ex + '" y2="' + ey + '" stroke="' + a.color + '" stroke-width="5" stroke-linecap="round" opacity=".92"/>';
        var ah = 14, aw = 8.5, bx = ex - ux * ah, by = ey - uy * ah;
        s += '<polygon points="' + ex + ',' + ey + ' ' + (bx + px * aw) + ',' + (by + py * aw) + ' ' + (bx - px * aw) + ',' + (by - py * aw) + '" fill="' + a.color + '"/>';
        var lx = fxp + px * 16, ly = fyp + py * 16;
        s += '<circle cx="' + lx + '" cy="' + ly + '" r="11.5" fill="' + a.color + '" stroke="#fff" stroke-width="1.5"/>';
        s += '<text x="' + lx + '" y="' + (ly + 5) + '" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="system-ui,sans-serif">' + a.label + '</text>';
        s += '<line class="xq-brhit" data-br="' + k + '" x1="' + sx + '" y1="' + sy + '" x2="' + ex + '" y2="' + ey + '" stroke="transparent" stroke-width="26" style="cursor:pointer"/>';
      });
    }
    s += '</svg>';
    return s;
  }
  function line(x1, y1, x2, y2) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--xq-line,#7c5a2c)" stroke-width="1.4"/>';
  }

  // Sau khi thay innerHTML: chạy hiệu ứng trượt quân + nhấp nháy ô đích (tôn trọng reduced-motion).
  function playAnim(holder) {
    if (REDUCE) return;
    var mv = holder.querySelector('.xq-pc-moved');
    if (mv) {
      mv.style.transform = 'translate(var(--fx), var(--fy))';
      requestAnimationFrame(function () {
        mv.style.transition = 'transform .18s cubic-bezier(.22,.61,.36,1)';
        mv.style.transform = 'translate(0,0)';
      });
    }
    var pulse = holder.querySelector('.xq-pulse');
    if (pulse && pulse.animate) {
      pulse.animate(
        [{ opacity: .55, transform: 'scale(.72)' }, { opacity: 0, transform: 'scale(1.15)' }],
        { duration: 620, easing: 'ease-out', transformOrigin: 'center' }
      );
    }
  }

  // Vuốt trái/phải trên bàn cờ → tiến/lùi (view & tree). Bỏ qua đa chạm.
  function attachSwipe(holder, onPrev, onNext) {
    var sx = 0, sy = 0, t = 0;
    holder.addEventListener('touchstart', function (e) {
      if (e.touches.length !== 1) { t = 0; return; }
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; t = Date.now();
    }, { passive: true });
    holder.addEventListener('touchend', function (e) {
      if (!t) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      t = 0;
      if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        (dx < 0 ? onNext : onPrev)();
      }
    }, { passive: true });
  }

  // Nút Lật + Tự chạy dùng chung cho view/tree.
  function attachControls(root, api) {
    var flipBtn = root.querySelector('[data-xq-flip]');
    if (flipBtn) flipBtn.addEventListener('click', function () { api.toggleFlip(); });

    var autoBtn = root.querySelector('[data-xq-autoplay]');
    if (autoBtn) {
      var timer = null;
      var stop = function () { if (timer) { clearInterval(timer); timer = null; autoBtn.classList.remove('is-on'); autoBtn.textContent = '▶ Tự chạy'; } };
      var start = function () {
        api.first(); autoBtn.classList.add('is-on'); autoBtn.textContent = '⏸ Dừng';
        timer = setInterval(function () { if (!api.next()) stop(); }, 1400);
      };
      autoBtn.addEventListener('click', function () { timer ? stop() : start(); });
      root.addEventListener('xq:userstep', stop);
    }
  }

  function bindFullscreen(root) {
    var boardCard = root.querySelector('[data-xq-boardcard]');
    var fsBtn = root.querySelector('[data-xq-fs]');
    if (!fsBtn || !boardCard) return;
    function setFs(on) {
      boardCard.classList.toggle('xq-fs', on);
      document.body.classList.toggle('xq-fs-lock', on);
      fsBtn.textContent = on ? '✕' : '⛶';
      fsBtn.setAttribute('aria-label', on ? 'Thoát phóng to' : 'Phóng to toàn màn hình');
    }
    fsBtn.addEventListener('click', function () { setFs(!boardCard.classList.contains('xq-fs')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && boardCard.classList.contains('xq-fs')) setFs(false); });
  }

  function initBoard(root) {
    var cfgEl = root.querySelector('script[type="application/json"]');
    if (!cfgEl) return;
    var cfg;
    try { cfg = JSON.parse(cfgEl.textContent); } catch (e) { return; }
    var steps = cfg.steps || [];
    var startFen = cfg.initialFen || 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';

    var holder = root.querySelector('[data-xq-holder]');
    var capStep = root.querySelector('[data-xq-capstep]');
    var capText = root.querySelector('[data-xq-captext]');
    var pill = root.querySelector('[data-xq-pill]');
    var list = root.querySelector('[data-xq-list]');

    bindFullscreen(root);

    if (cfg.mode === 'puzzle' && cfg.puzzleSide && steps.length) {
      initPuzzle(root, startFen, steps, { holder: holder, capStep: capStep, capText: capText, pill: pill }, cfg.puzzleSide);
      return;
    }
    if (Array.isArray(cfg.tree) && cfg.tree.length) {
      initTree(root, startFen, cfg.tree, {
        holder: holder, capStep: capStep, capText: capText, pill: pill, list: list,
        branches: root.querySelector('[data-xq-branches]')
      });
      return;
    }

    var idx = -1, flip = false;

    function draw() {
      var cur = idx < 0 ? { fen: startFen } : steps[idx];
      var lm = idx < 0 ? null : iccsToSquares(cur.iccs);
      holder.innerHTML = renderBoard(cur.fen, lm, null, null, flip);
      playAnim(holder);
      if (idx < 0) {
        if (capStep) capStep.textContent = 'Thế cờ mở đầu';
        if (capText) capText.textContent = steps.length ? 'Bấm “Tiến”, dùng phím ←/→ hoặc vuốt trên bàn cờ.' : 'Bài học này chưa có nước đi minh hoạ.';
        if (pill) pill.textContent = 'Thế mở';
      } else {
        var sideLabel = cur.side === 'den' ? 'Đen' : (cur.side === 'do' ? 'Đỏ' : '');
        var mv = cur.wxf ? (' · ' + cur.wxf) : '';
        if (capStep) capStep.textContent = 'Nước ' + (idx + 1) + (sideLabel ? ' — ' + sideLabel : '') + mv;
        if (capText) capText.textContent = cur.caption || (cur.wxf ? ('Nước đi: ' + cur.wxf + '.') : '(chưa có lời giảng cho nước này)');
        if (pill) pill.textContent = 'Nước ' + (idx + 1) + '/' + steps.length;
      }
      setDisabled('first', idx < 0); setDisabled('prev', idx < 0);
      setDisabled('next', idx >= steps.length - 1); setDisabled('last', idx >= steps.length - 1);
      if (list) Array.prototype.forEach.call(list.children, function (el, i) {
        var on = i === idx;
        el.classList.toggle('active', on);
        if (on && list.scrollHeight > list.clientHeight + 4) {
          var lb = list.getBoundingClientRect(), eb = el.getBoundingClientRect();
          if (eb.top < lb.top) list.scrollTop += eb.top - lb.top - 8;
          else if (eb.bottom > lb.bottom) list.scrollTop += eb.bottom - lb.bottom + 8;
        }
      });
    }
    function setDisabled(name, v) { var b = root.querySelector('[data-xq-' + name + ']'); if (b) b.disabled = v; }
    function go(i, userAction) {
      var clamped = Math.max(-1, Math.min(steps.length - 1, i));
      if (clamped === idx) return false;
      idx = clamped;
      draw();
      if (userAction) root.dispatchEvent(new CustomEvent('xq:userstep'));
      if (steps.length > 0 && idx === steps.length - 1) document.dispatchEvent(new CustomEvent('xq:viewed-all-moves'));
      return true;
    }

    if (list) {
      var fullMode = list.classList.contains('move-list--full');
      steps.forEach(function (st, i) {
        var row = document.createElement('button');
        row.type = 'button';
        row.className = 'move-row';
        var sideLabel = st.side === 'den' ? 'Đen' : (st.side === 'do' ? 'Đỏ' : '');
        var dot = st.side === 'den' ? '<span class="side-dot den"></span>' : '<span class="side-dot do"></span>';
        var label = st.wxf ? escapeHtml(st.wxf) : sideLabel;
        var cap = st.caption || '';
        if (!fullMode && cap.length > 40) cap = cap.slice(0, 40) + '…';
        row.innerHTML = '<span class="num">' + (i + 1) + '.</span><span class="mv">' + dot + '<span class="mv-label">' + label + '</span>' +
          (cap ? '<span class="cap-inline">' + escapeHtml(cap) + '</span>' : '') + '</span>';
        row.title = sideLabel + (st.wxf ? ' — ' + st.wxf : '');
        row.addEventListener('click', function () { go(i, true); });
        list.appendChild(row);
      });
    }
    bind('first', function () { go(-1, true); });
    bind('prev', function () { go(idx - 1, true); });
    bind('next', function () { go(idx + 1, true); });
    bind('last', function () { go(steps.length - 1, true); });
    function bind(name, fn) { var b = root.querySelector('[data-xq-' + name + ']'); if (b) b.addEventListener('click', fn); }

    attachSwipe(holder, function () { go(idx - 1, true); }, function () { go(idx + 1, true); });
    attachControls(root, {
      toggleFlip: function () { flip = !flip; draw(); },
      first: function () { go(-1); },
      next: function () { return go(idx + 1); }
    });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(idx + 1, true); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { go(idx - 1, true); e.preventDefault(); }
    });
    draw();
  }

  var BRANCH_COLORS = ['#16a34a', '#e0632f', '#2563eb', '#7c3aed', '#c026d3', '#0891b2'];

  // Điều hướng bài học có CÂY BIẾN: tại điểm rẽ, mỗi biến là 1 mũi tên (A/B…) trên bàn cờ.
  function initTree(root, startFen, tree, dom) {
    var rootNode = { fen: startFen, children: tree, parent: null, depth: 0, iccs: null, wxf: null, side: null, caption: null };
    (function link(node) {
      (node.children || []).forEach(function (c) { c.parent = node; c.depth = node.depth + 1; c.children = c.children || []; link(c); });
    })(rootNode);
    var cur = rootNode, flat = [], flip = false;

    function setDisabled(name, v) { var b = root.querySelector('[data-xq-' + name + ']'); if (b) b.disabled = v; }
    function notifyEnd() { if (!cur.children || !cur.children.length) document.dispatchEvent(new CustomEvent('xq:viewed-all-moves')); }

    function draw() {
      var kids = cur.children || [];
      var sibs = (cur.parent && cur.parent.children.length > 1) ? cur.parent.children : null;
      var choiceSet = null, curIdx = -1;
      if (kids.length > 1) { choiceSet = kids; }
      else if (sibs) { choiceSet = sibs; curIdx = sibs.indexOf(cur); }
      var arrows = null;
      if (choiceSet) {
        arrows = [];
        choiceSet.forEach(function (c, k) {
          if (k === curIdx) return;
          arrows.push({ from: c.from, to: c.to, color: BRANCH_COLORS[k % BRANCH_COLORS.length], label: String.fromCharCode(65 + k), _k: k });
        });
      }
      var lm = (cur === rootNode) ? null : iccsToSquares(cur.iccs);
      dom.holder.innerHTML = renderBoard(cur.fen, lm, arrows, null, flip);
      playAnim(dom.holder);
      if (arrows) dom.holder.querySelectorAll('.xq-brhit').forEach(function (el) {
        var k = arrows[+el.getAttribute('data-br')]._k;
        el.addEventListener('click', function () { descend(choiceSet[k]); });
      });
      if (cur === rootNode) {
        if (dom.capStep) dom.capStep.textContent = 'Thế cờ mở đầu';
        if (dom.capText) dom.capText.textContent = kids.length > 1 ? 'Có nhiều biến — bấm một mũi tên (A/B…) hoặc nút bên dưới để đi.' : (kids.length ? 'Bấm “Tiến”, phím ←/→ hoặc vuốt trên bàn cờ.' : 'Bài học này chưa có nước đi.');
        if (dom.pill) dom.pill.textContent = 'Thế mở';
      } else {
        var sideLabel = cur.side === 'den' ? 'Đen' : (cur.side === 'do' ? 'Đỏ' : '');
        if (dom.capStep) dom.capStep.textContent = 'Nước ' + cur.depth + (sideLabel ? ' — ' + sideLabel : '') + (cur.wxf ? ' · ' + cur.wxf : '');
        if (dom.capText) dom.capText.textContent = cur.caption || (kids.length > 1 ? 'Chọn một biến (A/B…) để xem tiếp.' : (sibs ? 'Có thể đổi sang biến khác bên dưới.' : (cur.wxf ? 'Nước đi: ' + cur.wxf + '.' : '(chưa có lời giảng)')));
        if (dom.pill) dom.pill.textContent = 'Nước ' + cur.depth;
      }
      renderBranchButtons(choiceSet, curIdx);
      setDisabled('first', cur === rootNode); setDisabled('prev', cur === rootNode);
      setDisabled('next', kids.length === 0); setDisabled('last', kids.length === 0);
      highlightList();
    }

    function renderBranchButtons(choiceSet, curIdx) {
      if (!dom.branches) return;
      if (!choiceSet || choiceSet.length < 2) { dom.branches.innerHTML = ''; dom.branches.style.display = 'none'; return; }
      dom.branches.style.display = '';
      var title = curIdx >= 0 ? ('Đang xem biến ' + String.fromCharCode(65 + curIdx) + ' — bấm để đổi biến:') : 'Chọn biến để xem tiếp:';
      var h = '<div class="branch-title">' + title + '</div><div class="branch-row">';
      choiceSet.forEach(function (c, k) {
        var color = BRANCH_COLORS[k % BRANCH_COLORS.length], letter = String.fromCharCode(65 + k), on = (k === curIdx);
        h += '<button type="button" class="branch-btn' + (on ? ' on' : '') + '" data-br="' + k + '" style="border:2px solid ' + color + ';color:' + (on ? '#fff' : color) + (on ? ';background:' + color : '') + '">'
          + '<span class="branch-badge" style="background:' + (on ? '#fff' : color) + ';color:' + (on ? color : '#fff') + '">' + letter + '</span>'
          + escapeHtml(c.wxf || ('Biến ' + letter)) + (k === 0 ? ' <em>(chính)</em>' : '') + '</button>';
      });
      dom.branches.innerHTML = h + '</div>';
      dom.branches.querySelectorAll('.branch-btn').forEach(function (el) {
        el.addEventListener('click', function () { descend(choiceSet[+el.getAttribute('data-br')]); });
      });
    }

    function descend(node) { if (node) { cur = node; draw(); notifyEnd(); } }
    function back() { if (cur.parent) { cur = cur.parent; draw(); } }
    function next() { var kids = cur.children || []; if (kids.length) { descend(kids[0]); return true; } return false; }
    function toStart() { cur = rootNode; draw(); }
    function toEnd() { while (cur.children && cur.children.length) cur = cur.children[0]; draw(); notifyEnd(); }

    function buildList() {
      if (!dom.list) return;
      flat = [];
      (function walk(node, indent) {
        node.children.forEach(function (c, idx) {
          var ind = (idx === 0) ? indent : indent + 1;
          flat.push({ node: c, indent: ind, letter: node.children.length > 1 ? String.fromCharCode(65 + idx) : '' });
          walk(c, ind);
        });
      })(rootNode, 0);
      var h = '';
      flat.forEach(function (row, k) {
        var m = row.node, sideLabel = m.side === 'den' ? 'Đen' : (m.side === 'do' ? 'Đỏ' : '');
        var dot = m.side === 'den' ? '<span class="side-dot den"></span>' : '<span class="side-dot do"></span>';
        var cap = m.caption ? '<span class="cap-inline">' + escapeHtml(m.caption) + '</span>' : '';
        h += '<button type="button" class="move-row" data-k="' + k + '" style="margin-left:' + (row.indent * 14) + 'px">'
          + '<span class="num">' + m.depth + (row.letter || '') + '.</span>'
          + '<span class="mv">' + dot + '<span class="mv-label">' + (m.wxf ? escapeHtml(m.wxf) : sideLabel) + '</span>' + cap + '</span></button>';
      });
      dom.list.innerHTML = h;
      dom.list.querySelectorAll('[data-k]').forEach(function (el) {
        el.addEventListener('click', function () { cur = flat[+el.getAttribute('data-k')].node; draw(); notifyEnd(); root.dispatchEvent(new CustomEvent('xq:userstep')); });
      });
    }
    function highlightList() {
      if (!dom.list) return;
      Array.prototype.forEach.call(dom.list.children, function (el) {
        var fentry = flat[+el.getAttribute('data-k')];
        el.classList.toggle('active', !!fentry && fentry.node === cur);
      });
    }

    (function bindAll() {
      [['first', toStart], ['prev', back], ['next', next], ['last', toEnd]].forEach(function (p) {
        var b = root.querySelector('[data-xq-' + p[0] + ']');
        if (b) b.addEventListener('click', function () { p[1](); root.dispatchEvent(new CustomEvent('xq:userstep')); });
      });
      root.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { next(); root.dispatchEvent(new CustomEvent('xq:userstep')); e.preventDefault(); }
        if (e.key === 'ArrowLeft') { back(); root.dispatchEvent(new CustomEvent('xq:userstep')); e.preventDefault(); }
      });
      attachSwipe(dom.holder, function () { back(); }, function () { next(); });
      attachControls(root, {
        toggleFlip: function () { flip = !flip; draw(); },
        first: function () { toStart(); },
        next: function () { return next(); }
      });
    })();
    buildList();
    draw();
  }

  // Chế độ GIẢI ĐỐ: người dùng bấm quân mình rồi bấm ô đích; so khớp với `steps`.
  function initPuzzle(root, startFen, steps, dom, puzzleSide) {
    var Rules = window.XiangqiRules;
    if (!Rules) { dom.holder.innerHTML = renderBoard(startFen, null); return; }
    var board = Rules.loadFen(startFen);
    var stepIdx = -1;
    var selected = -1;
    var solved = false;

    function curExpected() { return stepIdx + 1 < steps.length ? steps[stepIdx + 1] : null; }
    function isSolverTurn() { var e = curExpected(); return !solved && !!e && e.side === puzzleSide; }

    function squareFromEvent(evt) {
      var svg = dom.holder.querySelector('svg'); if (!svg) return -1;
      var pt = svg.createSVGPoint();
      var t = (evt.touches && evt.touches[0]) || evt;
      pt.x = t.clientX; pt.y = t.clientY;
      var loc = pt.matrixTransform(svg.getScreenCTM().inverse());
      var f = Math.round((loc.x - M) / CW), r = Math.round((loc.y - M) / CH);
      if (f < 0 || f > 8 || r < 0 || r > 9) return -1;
      return r * 9 + f;
    }

    function setMsg(text, kind) {
      if (!dom.capText) return;
      dom.capText.textContent = text;
      dom.capText.style.color = kind === 'err' ? 'var(--red,#c0392b)' : (kind === 'ok' ? 'var(--jade,#16a34a)' : '');
    }

    function applyStep() {
      stepIdx++;
      var ic = iccsToSquares(steps[stepIdx].iccs);
      if (!ic) return;
      var fromIdx = ic.from[1] * 9 + ic.from[0], toIdx = ic.to[1] * 9 + ic.to[0];
      board[toIdx] = board[fromIdx]; board[fromIdx] = null;
      if (stepIdx + 1 >= steps.length) solved = true;
    }

    function draw() {
      var lm = stepIdx >= 0 ? iccsToSquares(steps[stepIdx].iccs) : null;
      dom.holder.innerHTML = renderBoard(Rules.toFen(board), lm, null, selected);
      playAnim(dom.holder);
      bindClicks();
      var e = curExpected(), turnLabel = e ? (e.side === 'den' ? 'Đen' : 'Đỏ') : '';
      if (dom.pill) dom.pill.textContent = solved ? 'Đã giải xong!' : ('Nước ' + (stepIdx + 2) + ' — bên ' + turnLabel + ' đi');
      if (dom.capStep) dom.capStep.textContent = solved ? 'Hoàn thành! 🎉' : (isSolverTurn() ? 'Đến lượt bạn' : 'Đối phương đang đi…');
      if (solved) {
        setMsg('Chính xác! Bạn đã giải xong bài tập này.', 'ok');
        document.dispatchEvent(new CustomEvent('xq:puzzle-solved'));
      } else if (isSolverTurn()) {
        setMsg('Bấm quân của bạn rồi bấm ô muốn đi.', null);
      } else {
        setMsg('Đối phương đang đi…', null);
      }
    }

    function bindClicks() {
      var svg = dom.holder.querySelector('svg'); if (!svg) return;
      svg.style.cursor = isSolverTurn() ? 'pointer' : 'default';
      svg.addEventListener('click', onClick);
    }

    function onClick(evt) {
      if (!isSolverTurn()) return;
      var sq = squareFromEvent(evt); if (sq < 0) return;
      var piece = board[sq];
      var isOwn = piece && Rules.isRed(piece) === (puzzleSide === 'do');
      if (selected < 0) { if (isOwn) { selected = sq; draw(); } return; }
      if (sq === selected) { selected = -1; draw(); return; }
      if (isOwn) { selected = sq; draw(); return; }
      attemptMove(selected, sq);
    }

    function attemptMove(from, to) {
      var expect = curExpected();
      var got = Rules.toIccs(from) + Rules.toIccs(to);
      selected = -1;
      if (!expect || got !== expect.iccs) {
        draw();
        setMsg('Nước sai rồi — thử lại nhé.', 'err');
        return;
      }
      applyStep();
      draw();
      var nx = curExpected();
      if (nx && nx.side !== puzzleSide) {
        setMsg('Đối phương đang đi…', null);
        setTimeout(function () { applyStep(); draw(); }, 550);
      }
    }

    function reset() { board = Rules.loadFen(startFen); stepIdx = -1; selected = -1; solved = false; draw(); }
    function showSolution() {
      reset();
      var i = 0;
      (function step() {
        if (i >= steps.length) { solved = true; draw(); return; }
        applyStep(); draw(); i++;
        setTimeout(step, 750);
      })();
    }
    function copyFen() {
      var fen = Rules.toFen(board);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(fen).then(function () { setMsg('Đã sao chép FEN vào bộ nhớ tạm.', 'ok'); });
      } else {
        setMsg('FEN: ' + fen, null);
      }
    }

    function bind(name, fn) { var b = root.querySelector('[data-xq-' + name + ']'); if (b) b.addEventListener('click', fn); }
    bind('reset', reset); bind('solution', showSolution); bind('copyfen', copyFen);
    draw();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function initAll() {
    document.querySelectorAll('[data-xqboard]').forEach(initBoard);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initAll);
  else initAll();

  window.XiangqiBoard = { render: renderBoard };
})();
