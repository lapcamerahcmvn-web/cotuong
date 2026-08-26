/* Trình soạn bàn cờ cho Admin: xếp quân tạo thế mở, rồi bấm quân → ô để ghi nước đi.
   Tự sinh FEN + ICCS + ký hiệu VN + phân biệt bên đi. Hỗ trợ cả cờ tướng lẫn cờ úp (quân X/x + lật). */
(function () {
  'use strict';
  var root = document.querySelector('[data-board-editor]');
  if (!root) return;

  var PIECES = {
    K: '帥', A: '仕', B: '相', N: '傌', R: '俥', C: '炮', P: '兵',
    k: '將', a: '士', b: '象', n: '馬', r: '車', c: '砲', p: '卒'
  };
  var PIECE_VI = { R: 'Xe', N: 'Mã', B: 'Tượng', A: 'Sĩ', K: 'Tướng', C: 'Pháo', P: 'Tốt' };
  var STRAIGHT = 'RCPKrcpk';
  var STARTS = {
    normal: 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR',
    up: 'xxxxkxxxx/9/1x5x1/x1x1x1x1x/9/9/X1X1X1X1X/1X5X1/9/XXXXKXXXX'
  };

  var board = new Array(90).fill(null);
  var startBoard = null;      // ảnh chụp thế mở (để tính lại khi xoá nước)
  var mode = 'setup';         // 'setup' | 'move'
  var palettePiece = null;    // quân đang chọn ở bảng quân (setup)
  var selected = -1;          // ô đang chọn (move)
  var moves = [];             // [{fen, iccs, wxf, side, caption}]

  // ---- helpers ----
  function loadFen(fen) {
    board = new Array(90).fill(null);
    var rows = (fen || '').split(' ')[0].split('/');
    for (var r = 0; r < 10; r++) {
      var f = 0, row = rows[r] || '';
      for (var i = 0; i < row.length; i++) {
        var ch = row[i];
        if (ch >= '1' && ch <= '9') f += +ch;
        else { board[r * 9 + f] = ch; f++; }
      }
    }
  }
  function toFen(b) {
    var fen = '';
    for (var r = 0; r < 10; r++) {
      var e = 0, rs = '';
      for (var c = 0; c < 9; c++) {
        var p = b[r * 9 + c];
        if (!p) e++; else { if (e) { rs += e; e = 0; } rs += p; }
      }
      if (e) rs += e;
      fen += (r ? '/' : '') + rs;
    }
    return fen;
  }
  function toIccs(i) { return String.fromCharCode(97 + (i % 9)) + (9 - Math.floor(i / 9)); }
  var fileVi = function (x, red) { return red ? 9 - x : x + 1; };

  function notation(b, from, to) {
    var piece = b[from]; if (!piece) return '';
    if (piece === 'X' || piece === 'x') return 'quân úp';
    var name = PIECE_VI[piece.toUpperCase()] || '';
    var red = piece === piece.toUpperCase();
    var fx = from % 9, fr = (from / 9) | 0, tx = to % 9, tr = (to / 9) | 0;
    var mates = [];
    for (var r = 0; r < 10; r++) if (b[r * 9 + fx] === piece) mates.push(r);
    var col;
    if (mates.length >= 2) { mates.sort(function (a, b) { return a - b; }); var front = red ? mates[0] : mates[mates.length - 1]; col = (fr === front) ? 'trước' : 'sau'; }
    else col = '' + fileVi(fx, red);
    var verb, target;
    if (fr === tr) { verb = 'bình'; target = '' + fileVi(tx, red); }
    else { var fwd = red ? (tr < fr) : (tr > fr); verb = fwd ? 'tiến' : 'thoái'; target = STRAIGHT.indexOf(piece) >= 0 ? '' + Math.abs(tr - fr) : '' + fileVi(tx, red); }
    return name + ' ' + col + ' ' + verb + ' ' + target;
  }
  function sideOf(p) { return (p === p.toUpperCase()) ? 'do' : 'den'; }

  // ---- render bàn cờ (SVG có điểm bấm) ----
  var holder = root.querySelector('[data-be-board]');
  function render() {
    var M = 26, CW = 52, CH = 52, W = M * 2 + CW * 8, H = M * 2 + CH * 9;
    function X(f) { return M + f * CW; } function Y(r) { return M + r * CH; }
    function line(x1, y1, x2, y2) { return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--xq-line,#7c5a2c)" stroke-width="1.4"/>'; }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:460px;height:auto;display:block;touch-action:manipulation">';
    s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" rx="10" fill="var(--xq-wood,#e9cf9c)"/>';
    for (var r = 0; r < 10; r++) s += line(X(0), Y(r), X(8), Y(r));
    for (var f = 0; f < 9; f++) { if (f === 0 || f === 8) s += line(X(f), Y(0), X(f), Y(9)); else { s += line(X(f), Y(0), X(f), Y(4)); s += line(X(f), Y(5), X(f), Y(9)); } }
    s += line(X(3), Y(0), X(5), Y(2)) + line(X(5), Y(0), X(3), Y(2)) + line(X(3), Y(7), X(5), Y(9)) + line(X(5), Y(7), X(3), Y(9));
    // quân
    for (var i = 0; i < 90; i++) {
      var chr = board[i]; if (!chr) continue;
      var ff = i % 9, rr = (i / 9) | 0, cx = X(ff), cy = Y(rr);
      var up = (chr === 'X' || chr === 'x');
      var red = (chr === 'X') || (!up && chr === chr.toUpperCase());
      var col = red ? 'var(--xq-red,#c0392b)' : 'var(--xq-black,#24333f)';
      if (up) {
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="' + col + '"/>';
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="16.5" fill="none" stroke="var(--xq-disc,#f6ecd6)" stroke-width="1.5" opacity=".85"/>';
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="2.6" fill="var(--xq-disc,#f6ecd6)" opacity=".9"/>';
      } else {
        s += '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="var(--xq-disc,#f6ecd6)" stroke="' + col + '" stroke-width="2"/>';
        s += '<text x="' + cx + '" y="' + (cy + 8) + '" text-anchor="middle" font-size="24" font-family="KaiTi,STKaiti,serif" fill="' + col + '">' + (PIECES[chr] || '?') + '</text>';
      }
      if (i === selected) s += '<circle cx="' + cx + '" cy="' + cy + '" r="23" fill="none" stroke="#16a34a" stroke-width="3"/>';
    }
    // điểm bấm (trong suốt)
    for (var j = 0; j < 90; j++) {
      var jx = (j % 9), jr = (j / 9) | 0;
      s += '<circle class="be-hit" data-sq="' + j + '" cx="' + X(jx) + '" cy="' + Y(jr) + '" r="24" fill="transparent" style="cursor:pointer"/>';
    }
    s += '</svg>';
    holder.innerHTML = s;
    holder.querySelectorAll('.be-hit').forEach(function (el) {
      el.addEventListener('click', function () { onSquare(+el.getAttribute('data-sq')); });
    });
  }

  // ---- xử lý bấm ô ----
  function onSquare(i) {
    if (mode === 'setup') {
      if (palettePiece === 'erase') board[i] = null;
      else if (palettePiece) board[i] = palettePiece;
      render();
      return;
    }
    // move mode
    if (selected < 0) {
      if (board[i]) { selected = i; render(); }
      return;
    }
    if (i === selected) { selected = -1; render(); return; }
    // thực hiện nước: selected -> i
    var piece = board[selected];
    if (!piece) { selected = i; render(); return; }
    var reveal = null;
    if (piece === 'X' || piece === 'x') {
      var rv = prompt('Quân úp lật ra binh chủng gì? Nhập: X(Xe) P(Pháo) M(Mã) T(Tượng) S(Sĩ) B(Tốt) — bỏ trống nếu giữ úp:', '');
      if (rv) {
        var map = { X: 'R', P: 'C', M: 'N', T: 'B', S: 'A', B: 'P' };
        var rc = map[rv.trim().toUpperCase()];
        if (rc) reveal = (piece === 'X') ? rc : rc.toLowerCase();
      }
    }
    var wxf = notation(board, selected, i);
    var moved = reveal || piece;
    board[i] = moved; board[selected] = null;
    var fromSq = selected; selected = -1;
    moves.push({ fen: toFen(board), iccs: toIccs(fromSq) + toIccs(i), wxf: wxf, side: sideOf(moved === moved.toUpperCase() ? moved : moved), caption: '' });
    render(); renderMoves();
  }

  // ---- danh sách nước + caption ----
  var movesBox = root.querySelector('[data-be-moves]');
  function renderMoves() {
    if (moves.length === 0) { movesBox.innerHTML = '<p class="muted" style="font-size:13px;">Chưa có nước đi. Chuyển sang chế độ “Soạn nước đi” rồi bấm quân → ô đích.</p>'; syncHidden(); return; }
    var h = '';
    moves.forEach(function (m, k) {
      var side = m.side === 'den' ? 'Đen' : 'Đỏ';
      h += '<div class="be-move"><div class="be-move-head"><strong>' + (k + 1) + '. ' + side + (m.wxf ? ' · ' + m.wxf : '') + '</strong>'
        + '<button type="button" class="btn danger" data-del="' + k + '" style="min-height:28px;padding:0 10px;">Xoá từ đây</button></div>'
        + '<input type="text" class="be-cap" data-cap="' + k + '" value="' + (m.caption || '').replace(/"/g, '&quot;') + '" placeholder="Lời giảng cho nước này…"></div>';
    });
    movesBox.innerHTML = h;
    movesBox.querySelectorAll('[data-cap]').forEach(function (el) {
      el.addEventListener('input', function () { moves[+el.getAttribute('data-cap')].caption = el.value; syncHidden(); });
    });
    movesBox.querySelectorAll('[data-del]').forEach(function (el) {
      el.addEventListener('click', function () {
        var k = +el.getAttribute('data-del');
        moves = moves.slice(0, k);
        // dựng lại thế cờ tới nước k-1
        board = (k === 0) ? startBoard.slice() : (function () { var b; loadFen(moves[k - 1].fen); return board.slice(); })();
        if (k === 0) board = startBoard.slice();
        selected = -1; render(); renderMoves();
      });
    });
    syncHidden();
  }

  // ---- đồng bộ vào input ẩn của form ----
  var elFen = root.querySelector('[name="initial_fen"]');
  var elSteps = root.querySelector('[name="steps_json"]');
  function syncHidden() {
    if (elFen) elFen.value = startBoard ? toFen(startBoard) : toFen(board);
    if (elSteps) elSteps.value = JSON.stringify(moves);
  }

  // ---- bảng quân (palette) ----
  function buildPalette() {
    var pal = root.querySelector('[data-be-palette]');
    if (!pal) return;
    var order = ['R', 'N', 'B', 'A', 'K', 'C', 'P', 'r', 'n', 'b', 'a', 'k', 'c', 'p', 'X', 'x'];
    var html = '';
    order.forEach(function (p) {
      var up = (p === 'X' || p === 'x');
      var red = (p === 'X') || (!up && p === p.toUpperCase());
      var label = up ? 'úp' : (PIECES[p]);
      html += '<button type="button" class="be-pal" data-p="' + p + '" title="' + (up ? 'Quân úp ' : '') + (red ? 'Đỏ' : 'Đen') + '" style="color:' + (red ? 'var(--xq-red,#c0392b)' : 'var(--xq-black,#24333f)') + '">' + label + '</button>';
    });
    html += '<button type="button" class="be-pal be-erase" data-p="erase" title="Xoá quân">✕</button>';
    pal.innerHTML = html;
    pal.querySelectorAll('.be-pal').forEach(function (el) {
      el.addEventListener('click', function () {
        palettePiece = el.getAttribute('data-p');
        pal.querySelectorAll('.be-pal').forEach(function (x) { x.classList.remove('on'); });
        el.classList.add('on');
      });
    });
  }

  // ---- điều khiển ----
  function setMode(m) {
    if (m === 'move' && mode === 'setup') { startBoard = board.slice(); moves = []; renderMoves(); }
    mode = m; selected = -1; palettePiece = null;
    root.querySelectorAll('[data-be-mode]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-be-mode') === m); });
    root.querySelector('[data-be-setup-tools]').style.display = (m === 'setup') ? '' : 'none';
    root.querySelector('[data-be-move-tools]').style.display = (m === 'move') ? '' : 'none';
    render();
  }

  root.querySelectorAll('[data-be-mode]').forEach(function (b) { b.addEventListener('click', function () { setMode(b.getAttribute('data-be-mode')); }); });
  root.querySelector('[data-be-start-normal]').addEventListener('click', function () { loadFen(STARTS.normal); render(); });
  root.querySelector('[data-be-start-up]').addEventListener('click', function () { loadFen(STARTS.up); render(); });
  root.querySelector('[data-be-clear]').addEventListener('click', function () { board = new Array(90).fill(null); render(); });
  root.querySelector('[data-be-undo]').addEventListener('click', function () { if (moves.length) { moves.pop(); board = moves.length ? (loadFen(moves[moves.length - 1].fen), board.slice()) : startBoard.slice(); selected = -1; render(); renderMoves(); } });

  // init
  loadFen(root.getAttribute('data-init') || STARTS.normal);
  buildPalette();
  setMode('setup');
  renderMoves();
})();
