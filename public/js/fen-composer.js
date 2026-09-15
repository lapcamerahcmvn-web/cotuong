/* Soạn thế cờ công khai (trang "Thư viện của tôi" — /tai-khoan/thu-vien): xếp quân TẠO THẾ rồi
   ghi NƯỚC ĐI + NHÁNH như bàn cờ thật (giống trình soạn của Admin), để lưu riêng hoặc "Gửi cho
   Admin duyệt" thành bài học. Dùng window.XiangqiRules (loadFen/toFen/legalNoSelfCheck/notation/
   toIccs/sideOf) cho MỌI logic luật+ký hiệu — KHÔNG viết lại. Vẽ bàn bằng window.XiangqiBoard.render
   (giống trang học) rồi chèn thêm lớp điểm bấm riêng (renderBoard là read-only, không tự có điểm
   bấm). KHÔNG đụng board-editor.js (trình soạn Admin) — file này độc lập, chấp nhận trùng một phần
   ý tưởng (palette/cây biến) để tránh rủi ro hồi quy cho Admin. */
(function () {
  'use strict';
  var root = document.querySelector('[data-fen-composer]');
  if (!root) return;
  var Rules = window.XiangqiRules, XB = window.XiangqiBoard;
  if (!Rules || !XB) return;

  var PIECES = {
    K: '帥', A: '仕', B: '相', N: '馬', R: '俥', C: '炮', P: '兵',
    k: '將', a: '士', b: '象', n: '馬', r: '車', c: '砲', p: '卒'
  };
  var VI_FULL = { K: 'Tướng', A: 'Sĩ', B: 'Tượng', N: 'Mã', R: 'Xe', C: 'Pháo', P: 'Tốt' };
  var ORDER = ['R', 'N', 'B', 'A', 'K', 'C', 'P', 'r', 'n', 'b', 'a', 'k', 'c', 'p'];
  var LIMITS = { K: 1, A: 2, B: 2, N: 2, R: 2, C: 2, P: 5, k: 1, a: 2, b: 2, n: 2, r: 2, c: 2, p: 5 };
  var START = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';
  var BRANCH_COLORS = ['#16a34a', '#e0632f', '#2563eb', '#7c3aed', '#c026d3', '#0891b2'];
  var M = 26, CW = 52, CH = 52;

  function pieceName(ch) { return (Rules.isRed(ch) ? 'Đỏ ' : 'Đen ') + (VI_FULL[ch.toUpperCase()] || ch); }
  function countPiece(b, ch) { var n = 0; for (var i = 0; i < 90; i++) if (b[i] === ch) n++; return n; }

  // Vùng đặt hợp lệ (không có nhánh Cờ Úp — công cụ này chỉ soạn Cờ Tướng chuẩn).
  function zoneOk(ch, r, c) {
    var red = Rules.isRed(ch), t = ch.toUpperCase();
    if (t === 'K' || t === 'A') { if (c < 3 || c > 5) return false; return red ? (r >= 7 && r <= 9) : (r >= 0 && r <= 2); }
    if (t === 'B') {
      var pts = red ? [[9, 2], [9, 6], [7, 0], [7, 4], [7, 8], [5, 2], [5, 6]] : [[0, 2], [0, 6], [2, 0], [2, 4], [2, 8], [4, 2], [4, 6]];
      for (var k = 0; k < pts.length; k++) if (pts[k][0] === r && pts[k][1] === c) return true;
      return false;
    }
    if (t === 'P') return red ? (r >= 0 && r <= 6) : (r >= 3 && r <= 9);
    return true;
  }

  var board = Rules.loadFen(START);
  var mode = 'setup';        // 'setup' | 'move'
  var palettePiece = null;
  var selected = -1;
  // Cây biến: rootNode = thế gốc; mỗi node = 1 nước; node.board là snapshot bàn cờ SAU nước đó.
  var rootNode = null;
  var cur = null;

  var holder = root.querySelector('[data-fc-board]');
  var fenInput = root.querySelector('[data-fc-fen-input]');
  var titleInput = root.querySelector('[data-fc-title]');
  var noteInput = root.querySelector('[data-fc-note]');
  var msgEl = root.querySelector('[data-fc-msg]');
  var movesBox = root.querySelector('[data-fc-moves]');
  var branchesBox = root.querySelector('[data-fc-branches]');

  function msg(text, kind) {
    if (!msgEl) return;
    msgEl.textContent = text || '';
    msgEl.style.color = kind === 'err' ? 'var(--red)' : (kind === 'ok' ? 'var(--jade)' : 'var(--ink-soft)');
  }

  function boardsEqual(a, b) { for (var i = 0; i < 90; i++) if ((a[i] || null) !== (b[i] || null)) return false; return true; }
  function newRoot() { rootNode = { board: board.slice(), children: [], parent: null, depth: 0 }; cur = rootNode; }
  function gotoNode(node) { cur = node; board = node.board.slice(); selected = -1; }

  function pushMove(from, to) {
    var nb = cur.board.slice();
    var p = nb[from];
    var wxf = Rules.notation(nb, from, to);
    var iccs = Rules.toIccs(from) + Rules.toIccs(to);
    var side = Rules.sideOf(p);
    nb[to] = p; nb[from] = null;
    for (var k = 0; k < cur.children.length; k++) {
      var c = cur.children[k];
      if (c.from === from && c.to === to) { gotoNode(c); return; }
    }
    var node = { from: from, to: to, iccs: iccs, wxf: wxf, side: side, caption: '', board: nb, depth: cur.depth + 1, children: [], parent: cur };
    cur.children.push(node);
    gotoNode(node);
  }

  function deleteNode(node) {
    if (!node.parent) return;
    var arr = node.parent.children, i = arr.indexOf(node);
    if (i >= 0) arr.splice(i, 1);
    descend(node.parent);
  }

  function descend(node) { if (node) { gotoNode(node); redraw(); } }
  function backOne() { if (cur.parent) descend(cur.parent); }

  // Mạch chính (con đầu mỗi node) → dùng cho trình chơi tuyến tính + steps_json.
  function mainline() {
    var out = [], n = rootNode;
    while (n && n.children.length) { n = n.children[0]; out.push({ fen: Rules.toFen(n.board), iccs: n.iccs, wxf: n.wxf, side: n.side, caption: n.caption || '' }); }
    return out;
  }
  // Cây đầy đủ (lồng nhau) → variation_tree.
  function serializeTree() {
    function ser(node) {
      return node.children.map(function (c) {
        return { from: c.from, to: c.to, iccs: c.iccs, wxf: c.wxf, side: c.side, reveal: null, fen: Rules.toFen(c.board), caption: c.caption || '', children: ser(c) };
      });
    }
    return rootNode ? ser(rootNode) : [];
  }

  function hitOverlay() {
    var s = '';
    for (var j = 0; j < 90; j++) {
      var cx = M + (j % 9) * CW, cy = M + ((j / 9) | 0) * CH;
      s += '<circle class="fc-hit" data-sq="' + j + '" cx="' + cx + '" cy="' + cy + '" r="24" fill="transparent" style="cursor:pointer"/>';
    }
    return s;
  }

  function redraw() { render(); renderMoves(); }

  function render() {
    var lastMove = null, arrows = null, choiceSet = null, choiceIdx = -1;
    if (mode === 'move' && cur && cur !== rootNode) {
      lastMove = { from: [cur.from % 9, (cur.from / 9) | 0], to: [cur.to % 9, (cur.to / 9) | 0] };
    }
    if (mode === 'move' && cur) {
      var kids = cur.children || [];
      var sibs = (cur.parent && cur.parent.children.length > 1) ? cur.parent.children : null;
      if (kids.length > 1) choiceSet = kids;
      else if (sibs) { choiceSet = sibs; choiceIdx = sibs.indexOf(cur); }
      if (choiceSet) {
        arrows = [];
        choiceSet.forEach(function (c, k) {
          if (k === choiceIdx) return;
          arrows.push({ from: c.from, to: c.to, color: BRANCH_COLORS[k % BRANCH_COLORS.length], label: String.fromCharCode(65 + k), _k: k });
        });
      }
    }
    var fen = Rules.toFen(board);
    var svg = XB.render(fen, lastMove, arrows, mode === 'move' && selected >= 0 ? selected : null, false);
    svg = svg.replace('</svg>', hitOverlay() + '</svg>');
    holder.innerHTML = svg;
    holder.querySelectorAll('.fc-hit').forEach(function (el) {
      el.addEventListener('click', function () { onSquare(+el.getAttribute('data-sq')); });
    });
    if (arrows && choiceSet) {
      holder.querySelectorAll('.xq-brhit').forEach(function (el) {
        var k = arrows[+el.getAttribute('data-br')]._k;
        el.addEventListener('click', function () { descend(choiceSet[k]); });
      });
    }
    renderBranchButtons(choiceSet, choiceIdx);
    if (fenInput && document.activeElement !== fenInput) fenInput.value = fen;
    var undoBtn = root.querySelector('[data-fc-undo]');
    if (undoBtn) undoBtn.disabled = !(cur && cur.parent);
  }

  function renderBranchButtons(choiceSet, curIdx) {
    if (!branchesBox) return;
    if (!choiceSet || choiceSet.length < 2) { branchesBox.innerHTML = ''; branchesBox.style.display = 'none'; return; }
    branchesBox.style.display = '';
    var title = curIdx >= 0 ? ('Đang xem biến ' + String.fromCharCode(65 + curIdx) + ' — bấm để đổi:') : 'Chọn biến để đi tiếp:';
    var h = '<div class="branch-title">' + title + '</div><div class="branch-row">';
    choiceSet.forEach(function (c, k) {
      var color = BRANCH_COLORS[k % BRANCH_COLORS.length], letter = String.fromCharCode(65 + k), on = (k === curIdx);
      h += '<button type="button" class="branch-btn' + (on ? ' on' : '') + '" data-br="' + k + '" style="border:2px solid ' + color + ';color:' + (on ? '#fff' : color) + (on ? ';background:' + color : '') + '">'
        + '<span class="branch-badge" style="background:' + (on ? '#fff' : color) + ';color:' + (on ? color : '#fff') + '">' + letter + '</span>'
        + escapeHtml(c.wxf || ('Biến ' + letter)) + (k === 0 ? ' <em>(chính)</em>' : '') + '</button>';
    });
    branchesBox.innerHTML = h + '</div>';
    branchesBox.querySelectorAll('.branch-btn').forEach(function (el) {
      el.addEventListener('click', function () { descend(choiceSet[+el.getAttribute('data-br')]); });
    });
  }

  function renderMoves() {
    if (!movesBox) return;
    if (!rootNode || rootNode.children.length === 0) {
      movesBox.innerHTML = '<p class="muted" style="font-size:13px;margin:6px 0;">Chưa có nước đi. Bấm 1 quân rồi bấm ô đích để ghi nước.</p>';
      return;
    }
    var flat = [];
    (function walk(node, indent) {
      node.children.forEach(function (c, idx) {
        var ind = (idx === 0) ? indent : indent + 1;
        flat.push({ node: c, indent: ind, letter: node.children.length > 1 ? String.fromCharCode(65 + idx) : '' });
        walk(c, ind);
      });
    })(rootNode, 0);
    var h = '';
    flat.forEach(function (row, k) {
      var m = row.node, sideLabel = m.side === 'den' ? 'Đen' : 'Đỏ', isCur = (m === cur);
      var wrap = 'margin-left:' + (row.indent * 14) + 'px;' + (isCur ? 'box-shadow:0 0 0 2px var(--jade);' : '');
      h += '<div class="fc-move" style="' + wrap + '">'
        + '<button type="button" class="fc-move-nav" data-nav="' + k + '">' + (isCur ? '▶ ' : '') + m.depth + row.letter + '. ' + sideLabel + (m.wxf ? ' · ' + escapeHtml(m.wxf) : '') + '</button>'
        + '<span class="fc-move-actions">'
        + '<button type="button" class="fc-move-mini" data-branch="' + k + '" title="Tạo biến khác cho nước này">+ Biến</button>'
        + '<button type="button" class="fc-move-mini fc-move-del" data-del="' + k + '" title="Xoá nhánh">✕</button>'
        + '</span>'
        + '<input type="text" class="fc-cap" data-cap="' + k + '" value="' + (m.caption || '').replace(/"/g, '&quot;') + '" placeholder="Ghi chú nước này (tuỳ chọn)…">'
        + '</div>';
    });
    movesBox.innerHTML = h;
    movesBox.querySelectorAll('[data-nav]').forEach(function (el) { el.addEventListener('click', function () { descend(flat[+el.getAttribute('data-nav')].node); }); });
    movesBox.querySelectorAll('[data-branch]').forEach(function (el) {
      el.addEventListener('click', function () {
        descend(flat[+el.getAttribute('data-branch')].node.parent);
        msg('Đã về thế trước nước đó — đi 1 nước khác để tạo biến song song.', 'ok');
      });
    });
    movesBox.querySelectorAll('[data-del]').forEach(function (el) { el.addEventListener('click', function () { deleteNode(flat[+el.getAttribute('data-del')].node); }); });
    movesBox.querySelectorAll('[data-cap]').forEach(function (el) { el.addEventListener('input', function () { flat[+el.getAttribute('data-cap')].node.caption = el.value; }); });
  }

  function onSquare(i) {
    if (mode === 'setup') {
      if (palettePiece === 'erase') { board[i] = null; render(); return; }
      if (!palettePiece) { msg('Chọn 1 quân ở bảng bên dưới trước.'); return; }
      var r = (i / 9) | 0, c = i % 9;
      if (!zoneOk(palettePiece, r, c)) { msg('Không hợp lệ: ' + pieceName(palettePiece) + ' không đặt được ở ô này.', 'err'); return; }
      var existing = board[i];
      if (existing !== palettePiece && countPiece(board, palettePiece) >= LIMITS[palettePiece]) {
        msg('Vượt số lượng: tối đa ' + LIMITS[palettePiece] + ' ' + pieceName(palettePiece) + ' mỗi bên.', 'err');
        return;
      }
      board[i] = palettePiece; render();
      return;
    }
    // move mode
    if (selected < 0) { if (board[i]) { selected = i; render(); } return; }
    if (i === selected) { selected = -1; render(); return; }
    var piece = board[selected];
    if (board[i] && Rules.sameSide(board[i], piece)) { selected = i; render(); return; }
    if (!Rules.legalNoSelfCheck(board, selected, i)) {
      msg('Nước đi không hợp lệ với luật của ' + pieceName(piece) + '.', 'err');
      selected = -1; render();
      return;
    }
    var from = selected; selected = -1;
    pushMove(from, i);
    redraw();
  }

  function buildPalette() {
    var pal = root.querySelector('[data-fc-palette]');
    if (!pal) return;
    var html = '';
    ORDER.forEach(function (p) {
      var red = Rules.isRed(p);
      html += '<button type="button" class="fc-pal" data-p="' + p + '" title="' + (red ? 'Đỏ' : 'Đen') + ' ' + (VI_FULL[p.toUpperCase()] || '') + '" style="color:' + (red ? 'var(--xq-red,#c0392b)' : 'var(--xq-black,#24333f)') + '">' + PIECES[p] + '</button>';
    });
    html += '<button type="button" class="fc-pal fc-erase" data-p="erase" title="Xoá quân">✕</button>';
    pal.innerHTML = html;
    pal.querySelectorAll('.fc-pal').forEach(function (el) {
      el.addEventListener('click', function () {
        palettePiece = el.getAttribute('data-p');
        pal.querySelectorAll('.fc-pal').forEach(function (x) { x.classList.remove('on'); });
        el.classList.add('on');
      });
    });
  }

  function setMode(m) {
    mode = m; selected = -1; palettePiece = null;
    root.querySelectorAll('[data-fc-mode]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-fc-mode') === m); });
    var setupTools = root.querySelector('[data-fc-setup-tools]');
    var moveTools = root.querySelector('[data-fc-move-tools]');
    if (setupTools) setupTools.style.display = m === 'setup' ? '' : 'none';
    if (moveTools) moveTools.style.display = m === 'move' ? '' : 'none';
    redraw();
  }
  function enterMove() {
    if (!rootNode || !boardsEqual(rootNode.board, board)) newRoot();
    else gotoNode(rootNode);
    setMode('move');
  }
  function enterSetup() {
    if (rootNode) { board = rootNode.board.slice(); selected = -1; }
    setMode('setup');
  }
  function resetAll(newBoard) {
    board = newBoard; rootNode = null; cur = null; selected = -1;
    setMode('setup');
  }

  function bind(sel, fn) { var el = root.querySelector(sel); if (el) el.addEventListener('click', fn); }

  root.querySelectorAll('[data-fc-mode]').forEach(function (b) {
    b.addEventListener('click', function () { (b.getAttribute('data-fc-mode') === 'move') ? enterMove() : enterSetup(); });
  });
  bind('[data-fc-start]', function () { resetAll(Rules.loadFen(START)); msg('Đã nạp thế mở chuẩn.', 'ok'); });
  bind('[data-fc-clear]', function () { resetAll(new Array(90).fill(null)); msg('Đã xoá bàn cờ — chọn quân rồi đặt lên bàn.', 'ok'); });
  bind('[data-fc-fen-apply]', function () {
    var val = fenInput && fenInput.value.trim();
    if (!val) { msg('Nhập chuỗi FEN trước.', 'err'); return; }
    try { resetAll(Rules.loadFen(val)); msg('Đã nạp FEN — kiểm tra lại quân trên bàn.', 'ok'); }
    catch (e) { msg('FEN không hợp lệ.', 'err'); }
  });
  bind('[data-fc-fen-copy]', function () {
    var fen = Rules.toFen(board);
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(fen).then(function () { msg('Đã sao chép FEN.', 'ok'); });
  });
  bind('[data-fc-undo]', function () { if (cur && cur.parent) deleteNode(cur); });

  function postJSON(url, body, onOk, onErr) {
    var tokenEl = document.querySelector('meta[name=csrf-token]');
    if (!tokenEl) return;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': tokenEl.content, 'Accept': 'application/json' },
      body: JSON.stringify(body)
    }).then(function (r) {
      if (r.ok) return r.json();
      return r.json().catch(function () { return {}; }).then(function (d) { throw new Error(d && d.message); });
    }).then(onOk).catch(function (e) { onErr(e && e.message); });
  }

  bind('[data-fc-save]', function () {
    var title = (titleInput && titleInput.value.trim()) || window.prompt('Đặt tên cho thế cờ này (không bắt buộc):', '') || '';
    postJSON('/thu-vien', {
      fen: rootNode ? Rules.toFen(rootNode.board) : Rules.toFen(board),
      title: title,
      steps: mainline(),
      variation_tree: serializeTree()
    }, function () { window.location.reload(); }, function () { msg('Lưu thất bại — thử lại sau.', 'err'); });
  });

  bind('[data-fc-submit]', function () {
    var title = titleInput && titleInput.value.trim();
    if (!title) { msg('Đặt tên cho bài trước khi gửi Admin duyệt.', 'err'); if (titleInput) titleInput.focus(); return; }
    if (!rootNode || !rootNode.children.length) { msg('Cần ghi ít nhất 1 nước đi trước khi gửi Admin duyệt.', 'err'); return; }
    if (!window.confirm('Gửi thế cờ/khai cuộc này cho Admin xem xét, có thể sẽ được xuất bản thành bài học?')) return;
    postJSON('/thu-vien/gui-admin', {
      title: title,
      initial_fen: Rules.toFen(rootNode.board),
      steps: mainline(),
      variation_tree: serializeTree(),
      summary: noteInput ? noteInput.value : null
    }, function () { msg('Đã gửi cho Admin — cảm ơn bạn! Admin sẽ xem xét và có thể xuất bản.', 'ok'); },
      function (m) { msg(m || 'Gửi thất bại — thử lại sau.', 'err'); });
  });

  function escapeHtml(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  buildPalette();
  enterSetup();
})();
