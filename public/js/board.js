/* Học Cờ Tướng — bàn cờ tương tác (vanilla JS, không phụ thuộc jQuery/Alpine).
   Render FEN từng bước đã tính sẵn server-side. Auto-init mọi [data-xqboard] chứa 1
   <script type="application/json"> cấu hình: { initialFen, steps: [{fen,caption,side,iccs}] }. */
(function () {
  'use strict';

  // Ký tự quân theo lối truyền thống: Đỏ và Đen dùng chữ khác nhau cho cùng loại quân.
  var PIECES = {
    K: { c: '帥', red: true }, A: { c: '仕', red: true }, B: { c: '相', red: true },
    N: { c: '傌', red: true }, R: { c: '俥', red: true }, C: { c: '炮', red: true }, P: { c: '兵', red: true },
    k: { c: '將' }, a: { c: '士' }, b: { c: '象' }, n: { c: '馬' }, r: { c: '車' }, c: { c: '砲' }, p: { c: '卒' },
    // Quân ÚP (cờ úp): mặt sấp, chưa lộ binh chủng. X = Đỏ úp, x = Đen úp.
    X: { up: true, red: true }, x: { up: true }
  };

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

  // arrows: [{from,to,color,label}] — from/to là chỉ số ô 0..89. Vẽ mũi tên chọn biến.
  function renderBoard(fen, lastMove, arrows) {
    var M = 26, CW = 52, CH = 52;
    var W = M * 2 + CW * 8, H = M * 2 + CH * 9;
    function X(f) { return M + f * CW; }
    function Y(r) { return M + r * CH; }
    var board = fenToBoard(fen);
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" preserveAspectRatio="xMidYMid meet" style="width:100%;max-width:100%;height:auto;display:block" role="img" aria-label="Bàn cờ tướng">';
    s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" rx="10" fill="var(--xq-wood,#e9cf9c)"/>';
    for (var r = 0; r < 10; r++) s += line(X(0), Y(r), X(8), Y(r));
    for (var f = 0; f < 9; f++) {
      if (f === 0 || f === 8) s += line(X(f), Y(0), X(f), Y(9));
      else { s += line(X(f), Y(0), X(f), Y(4)); s += line(X(f), Y(5), X(f), Y(9)); }
    }
    s += line(X(3), Y(0), X(5), Y(2)) + line(X(5), Y(0), X(3), Y(2));
    s += line(X(3), Y(7), X(5), Y(9)) + line(X(5), Y(7), X(3), Y(9));
    s += '<text x="' + ((X(1) + X(3)) / 2) + '" y="' + ((Y(4) + Y(5)) / 2 + 6) + '" font-size="20" fill="var(--xq-line,#7c5a2c)" opacity=".5" font-family="serif" letter-spacing="6">楚河</text>';
    s += '<text x="' + ((X(5) + X(7)) / 2) + '" y="' + ((Y(4) + Y(5)) / 2 + 6) + '" font-size="20" fill="var(--xq-line,#7c5a2c)" opacity=".5" font-family="serif" letter-spacing="6">漢界</text>';
    if (lastMove) {
      [lastMove.from, lastMove.to].forEach(function (sq) {
        if (sq) s += '<circle cx="' + X(sq[0]) + '" cy="' + Y(sq[1]) + '" r="22" fill="var(--xq-hl,rgba(200,69,31,.30))"/>';
      });
    }
    for (var i = 0; i < 90; i++) {
      var chr = board[i]; if (!chr) continue;
      var p = PIECES[chr]; if (!p) continue;
      var ff = i % 9, rr = Math.floor(i / 9);
      var col = p.red ? 'var(--xq-red,#c0392b)' : 'var(--xq-black,#24333f)';
      var cx = X(ff), cy = Y(rr);
      if (p.up) {
        // Quân úp: chip mặt sấp — đĩa đặc màu bên, vành kem + hoa văn tròn đồng tâm, không lộ chữ.
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="' + col + '"/>';
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="16.5" fill="none" stroke="var(--xq-disc,#f6ecd6)" stroke-width="1.5" opacity=".85"/>';
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="9" fill="none" stroke="var(--xq-disc,#f6ecd6)" stroke-width="1.5" opacity=".6"/>';
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="2.6" fill="var(--xq-disc,#f6ecd6)" opacity=".9"/>';
        continue;
      }
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="var(--xq-disc,#f6ecd6)" stroke="' + col + '" stroke-width="2"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="17" fill="none" stroke="' + col + '" stroke-width="1" opacity=".35"/>';
      s += '<text x="' + cx + '" y="' + (Y(rr) + 8) + '" text-anchor="middle" font-size="24" font-family="KaiTi,STKaiti,serif" fill="' + col + '">' + p.c + '</text>';
    }
    // Mũi tên chọn biến (vẽ trên cùng, có nhãn A/B ở gần quân xuất phát).
    if (arrows && arrows.length) {
      arrows.forEach(function (a, k) {
        var fx = X(a.from % 9), fy = Y((a.from / 9) | 0), tx = X(a.to % 9), ty = Y((a.to / 9) | 0);
        var dx = tx - fx, dy = ty - fy, len = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / len, uy = dy / len;
        var sx = fx + ux * 20, sy = fy + uy * 20, ex = tx - ux * 20, ey = ty - uy * 20;
        var px = -uy, py = ux; // pháp tuyến (đặt nhãn lệch cạnh quân)
        s += '<line x1="' + sx + '" y1="' + sy + '" x2="' + ex + '" y2="' + ey + '" stroke="' + a.color + '" stroke-width="5" stroke-linecap="round" opacity=".92"/>';
        var ah = 14, aw = 8.5, bx = ex - ux * ah, by = ey - uy * ah;
        s += '<polygon points="' + ex + ',' + ey + ' ' + (bx + px * aw) + ',' + (by + py * aw) + ' ' + (bx - px * aw) + ',' + (by - py * aw) + '" fill="' + a.color + '"/>';
        var lx = fx + px * 16, ly = fy + py * 16;
        s += '<circle cx="' + lx + '" cy="' + ly + '" r="11.5" fill="' + a.color + '" stroke="#fff" stroke-width="1.5"/>';
        s += '<text x="' + lx + '" y="' + (ly + 5) + '" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="system-ui,sans-serif">' + a.label + '</text>';
        // vùng bấm trong suốt để chọn biến bằng cách bấm thẳng mũi tên
        s += '<line class="xq-brhit" data-br="' + k + '" x1="' + sx + '" y1="' + sy + '" x2="' + ex + '" y2="' + ey + '" stroke="transparent" stroke-width="26" style="cursor:pointer"/>';
      });
    }
    s += '</svg>';
    return s;
  }
  function line(x1, y1, x2, y2) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--xq-line,#7c5a2c)" stroke-width="1.4"/>';
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
    // Chế độ CÂY BIẾN: nếu cfg.tree có nhánh → điều hướng theo cây + mũi tên chọn biến (A/B…).
    if (Array.isArray(cfg.tree) && cfg.tree.length) {
      bindFullscreen(root);
      initTree(root, startFen, cfg.tree, {
        holder: holder, capStep: capStep, capText: capText, pill: pill, list: list,
        branches: root.querySelector('[data-xq-branches]')
      });
      return;
    }
    var idx = -1;

    function draw() {
      var cur = idx < 0 ? { fen: startFen } : steps[idx];
      var lm = idx < 0 ? null : iccsToSquares(cur.iccs);
      holder.innerHTML = renderBoard(cur.fen, lm);
      if (idx < 0) {
        if (capStep) capStep.textContent = 'Thế cờ mở đầu';
        if (capText) capText.textContent = steps.length ? 'Bấm “Tiến” để đi từng nước và đọc diễn giải.' : 'Bài học này chưa có nước đi minh hoạ.';
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
        // Cuộn active vào tầm nhìn CHỈ TRONG danh sách (không cuộn cả trang — tránh mobile nhảy
        // xuống khi bấm Tiến, vì trên mobile danh sách nằm dưới bàn cờ).
        if (on && list.scrollHeight > list.clientHeight + 4) {
          var lb = list.getBoundingClientRect(), eb = el.getBoundingClientRect();
          if (eb.top < lb.top) list.scrollTop += eb.top - lb.top - 8;
          else if (eb.bottom > lb.bottom) list.scrollTop += eb.bottom - lb.bottom + 8;
        }
      });
    }
    function setDisabled(name, v) { var b = root.querySelector('[data-xq-' + name + ']'); if (b) b.disabled = v; }
    function go(i) {
        idx = Math.max(-1, Math.min(steps.length - 1, i));
        draw();
        // Báo đã xem hết các nước (dùng cho theo dõi tiến độ học).
        if (steps.length > 0 && idx === steps.length - 1) {
            document.dispatchEvent(new CustomEvent('xq:viewed-all-moves'));
        }
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
        row.addEventListener('click', function () { go(i); });
        list.appendChild(row);
      });
    }
    bind('first', function () { go(-1); });
    bind('prev', function () { go(idx - 1); });
    bind('next', function () { go(idx + 1); });
    bind('last', function () { go(steps.length - 1); });
    function bind(name, fn) { var b = root.querySelector('[data-xq-' + name + ']'); if (b) b.addEventListener('click', fn); }

    // Phóng to bàn cờ chiếm hết màn hình — dùng overlay CSS (tin cậy trên mọi trình duyệt,
    // không phụ thuộc Fullscreen API vốn hay lỗi/khác nhau). Bấm ⛶ hoặc Esc để đóng.
    var boardCard = root.querySelector('[data-xq-boardcard]');
    var fsBtn = root.querySelector('[data-xq-fs]');
    function setFs(on) {
      if (!boardCard) return;
      boardCard.classList.toggle('xq-fs', on);
      document.body.classList.toggle('xq-fs-lock', on);
      if (fsBtn) fsBtn.textContent = on ? '✕' : '⛶';
    }
    if (fsBtn && boardCard) {
      fsBtn.addEventListener('click', function () { setFs(!boardCard.classList.contains('xq-fs')); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && boardCard.classList.contains('xq-fs')) setFs(false);
      });
    }

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(idx + 1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { go(idx - 1); e.preventDefault(); }
    });
    draw();
  }

  // Phóng to bàn cờ toàn màn hình (overlay CSS). Dùng chung cho cả 2 chế độ.
  function bindFullscreen(root) {
    var boardCard = root.querySelector('[data-xq-boardcard]');
    var fsBtn = root.querySelector('[data-xq-fs]');
    if (!fsBtn || !boardCard) return;
    function setFs(on) {
      boardCard.classList.toggle('xq-fs', on);
      document.body.classList.toggle('xq-fs-lock', on);
      fsBtn.textContent = on ? '✕' : '⛶';
    }
    fsBtn.addEventListener('click', function () { setFs(!boardCard.classList.contains('xq-fs')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && boardCard.classList.contains('xq-fs')) setFs(false); });
  }

  var BRANCH_COLORS = ['#16a34a', '#e0632f', '#2563eb', '#7c3aed', '#c026d3', '#0891b2'];

  // Điều hướng bài học có CÂY BIẾN: tại điểm rẽ, mỗi biến là 1 mũi tên (A/B…) trên bàn cờ.
  // Chọn A → đi theo A; Lùi về điểm rẽ → mũi tên các biến hiện lại để chọn biến khác.
  function initTree(root, startFen, tree, dom) {
    var rootNode = { fen: startFen, children: tree, parent: null, depth: 0, iccs: null, wxf: null, side: null, caption: null };
    (function link(node) {
      (node.children || []).forEach(function (c) { c.parent = node; c.depth = node.depth + 1; c.children = c.children || []; link(c); });
    })(rootNode);
    var cur = rootNode, flat = [];

    function setDisabled(name, v) { var b = root.querySelector('[data-xq-' + name + ']'); if (b) b.disabled = v; }
    function notifyEnd() { if (!cur.children || !cur.children.length) document.dispatchEvent(new CustomEvent('xq:viewed-all-moves')); }

    function draw() {
      var kids = cur.children || [];
      var lm = (cur === rootNode) ? null : iccsToSquares(cur.iccs);
      var arrows = kids.length > 1 ? kids.map(function (c, k) {
        return { from: c.from, to: c.to, color: BRANCH_COLORS[k % BRANCH_COLORS.length], label: String.fromCharCode(65 + k) };
      }) : null;
      dom.holder.innerHTML = renderBoard(cur.fen, lm, arrows);
      if (arrows) dom.holder.querySelectorAll('.xq-brhit').forEach(function (el) {
        el.addEventListener('click', function () { descend(kids[+el.getAttribute('data-br')]); });
      });
      if (cur === rootNode) {
        if (dom.capStep) dom.capStep.textContent = 'Thế cờ mở đầu';
        if (dom.capText) dom.capText.textContent = kids.length > 1 ? 'Có nhiều biến — chọn một mũi tên (A/B…) hoặc nút bên dưới để đi.' : (kids.length ? 'Bấm “Tiến” để đi từng nước.' : 'Bài học này chưa có nước đi.');
        if (dom.pill) dom.pill.textContent = 'Thế mở';
      } else {
        var sideLabel = cur.side === 'den' ? 'Đen' : (cur.side === 'do' ? 'Đỏ' : '');
        if (dom.capStep) dom.capStep.textContent = 'Nước ' + cur.depth + (sideLabel ? ' — ' + sideLabel : '') + (cur.wxf ? ' · ' + cur.wxf : '');
        if (dom.capText) dom.capText.textContent = cur.caption || (kids.length > 1 ? 'Chọn một biến (A/B…) để xem tiếp.' : (cur.wxf ? 'Nước đi: ' + cur.wxf + '.' : '(chưa có lời giảng)'));
        if (dom.pill) dom.pill.textContent = 'Nước ' + cur.depth;
      }
      renderBranchButtons(kids);
      setDisabled('first', cur === rootNode); setDisabled('prev', cur === rootNode);
      setDisabled('next', kids.length === 0); setDisabled('last', kids.length === 0);
      highlightList();
    }

    function renderBranchButtons(kids) {
      if (!dom.branches) return;
      if (kids.length < 2) { dom.branches.innerHTML = ''; dom.branches.style.display = 'none'; return; }
      dom.branches.style.display = '';
      var h = '<div class="branch-title">Chọn biến để xem tiếp:</div><div class="branch-row">';
      kids.forEach(function (c, k) {
        var color = BRANCH_COLORS[k % BRANCH_COLORS.length], letter = String.fromCharCode(65 + k);
        h += '<button type="button" class="branch-btn" data-br="' + k + '" style="border:2px solid ' + color + ';color:' + color + '">'
          + '<span class="branch-badge" style="background:' + color + '">' + letter + '</span>'
          + escapeHtml(c.wxf || ('Biến ' + letter)) + (k === 0 ? ' <em>(chính)</em>' : '') + '</button>';
      });
      dom.branches.innerHTML = h + '</div>';
      dom.branches.querySelectorAll('.branch-btn').forEach(function (el) {
        el.addEventListener('click', function () { descend(kids[+el.getAttribute('data-br')]); });
      });
    }

    function descend(node) { if (node) { cur = node; draw(); notifyEnd(); } }
    function back() { if (cur.parent) { cur = cur.parent; draw(); } }
    function next() { var kids = cur.children || []; if (kids.length) descend(kids[0]); } // Tiến = biến chính
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
        el.addEventListener('click', function () { cur = flat[+el.getAttribute('data-k')].node; draw(); notifyEnd(); });
      });
    }
    function highlightList() {
      if (!dom.list) return;
      Array.prototype.forEach.call(dom.list.children, function (el) {
        var f = flat[+el.getAttribute('data-k')];
        el.classList.toggle('active', !!f && f.node === cur);
      });
    }

    (function bindAll() {
      [['first', toStart], ['prev', back], ['next', next], ['last', toEnd]].forEach(function (p) {
        var b = root.querySelector('[data-xq-' + p[0] + ']'); if (b) b.addEventListener('click', p[1]);
      });
      root.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { next(); e.preventDefault(); }
        if (e.key === 'ArrowLeft') { back(); e.preventDefault(); }
      });
    })();
    buildList();
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
