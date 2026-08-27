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
  var BRANCH_COLORS = ['#16a34a', '#e0632f', '#2563eb', '#7c3aed', '#c026d3', '#0891b2']; // màu biến A,B,C…
  var STARTS = {
    normal: 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR',
    up: 'xxxxkxxxx/9/1x5x1/x1x1x1x1x/9/9/X1X1X1X1X/1X5X1/9/XXXXKXXXX'
  };
  // Giới hạn số lượng mỗi loại quân/bên (theo luật cờ tướng); X/x = quân úp (cờ úp) tối đa 15.
  var LIMITS = { K: 1, A: 2, B: 2, N: 2, R: 2, C: 2, P: 5, X: 15, k: 1, a: 2, b: 2, n: 2, r: 2, c: 2, p: 5, x: 15 };
  var VI_FULL = { K: 'Tướng', A: 'Sĩ', B: 'Tượng', N: 'Mã', R: 'Xe', C: 'Pháo', P: 'Tốt', X: 'quân úp', x: 'quân úp' };
  function pieceName(ch) { var up = (ch === 'X' || ch === 'x'); return (up ? '' : ((ch === ch.toUpperCase()) ? 'Đỏ ' : 'Đen ')) + (VI_FULL[ch.toUpperCase()] || VI_FULL[ch] || ch); }
  function countPiece(ch) { var n = 0; for (var i = 0; i < 90; i++) if (board[i] === ch) n++; return n; }
  function isCoUp() { var g = document.getElementById('be-gamemode'); return !!(g && g.value === 'co-up'); }
  // Vùng đặt hợp lệ: Tướng/Sĩ trong cung; Tượng đúng điểm & không qua sông; Tốt trong phạm vi tiến.
  function zoneOk(ch, r, c) {
    if (ch === 'X' || ch === 'x') return true; // quân úp: đặt đâu cũng được
    var red = (ch === ch.toUpperCase());
    var t = ch.toUpperCase();
    // 2 Tướng luôn trong cung (cả cờ tướng lẫn cờ úp).
    if (t === 'K') { if (c < 3 || c > 5) return false; return red ? (r >= 7 && r <= 9) : (r >= 0 && r <= 2); }
    // Cờ úp: 15 quân còn lại được xáo trộn nên đặt đâu cũng hợp lệ (sẽ đậy nắp lại).
    if (isCoUp()) return true;
    if (t === 'A') { if (c < 3 || c > 5) return false; return red ? (r >= 7 && r <= 9) : (r >= 0 && r <= 2); }
    if (t === 'B') {
      var pts = red ? [[9, 2], [9, 6], [7, 0], [7, 4], [7, 8], [5, 2], [5, 6]] : [[0, 2], [0, 6], [2, 0], [2, 4], [2, 8], [4, 2], [4, 6]];
      for (var k = 0; k < pts.length; k++) if (pts[k][0] === r && pts[k][1] === c) return true;
      return false;
    }
    if (t === 'P') { return red ? (r >= 0 && r <= 6) : (r >= 3 && r <= 9); }
    return true; // Mã/Xe/Pháo: đặt đâu cũng được
  }
  function beMsg(text, ok) {
    var el = root.querySelector('[data-be-msg]');
    if (!el) { if (text) alert(text); return; }
    el.textContent = text || '';
    el.style.color = ok ? 'var(--jade)' : 'var(--red)';
  }

  // ---- luật đi quân (kiểm tra nước hợp lệ) ----
  function isRed(ch) { return (ch === 'X') || (ch !== 'x' && ch === ch.toUpperCase()); }
  function sameSide(a, b) { return isRed(a) === isRed(b); }
  // Binh chủng theo ô xuất phát (cho quân úp đi theo vai trò của ô).
  function posRole(idx) {
    var r = (idx / 9) | 0, c = idx % 9, back = ['R', 'N', 'B', 'A', 'K', 'A', 'B', 'N', 'R'];
    if (r === 0 || r === 9) return back[c];
    if (r === 2 || r === 7) return (c === 1 || c === 7) ? 'C' : null;
    if (r === 3 || r === 6) return (c % 2 === 0) ? 'P' : null;
    return null;
  }
  // up=true: quân úp đi theo vai trò ô — Sĩ/Tượng úp KHÔNG bị giới hạn cung/sông (là quân xáo).
  function moveByType(t, red, b, from, to, up) {
    var fr = (from / 9) | 0, fc = from % 9, tr = (to / 9) | 0, tc = to % 9, dr = tr - fr, dc = tc - fc;
    var adr = Math.abs(dr), adc = Math.abs(dc);
    function between() { // số quân nằm GIỮA (chỉ khi đi thẳng); -1 nếu không thẳng
      var n = 0, s;
      if (dr === 0) { s = fc < tc ? 1 : -1; for (var c = fc + s; c !== tc; c += s) if (b[fr * 9 + c]) n++; return n; }
      if (dc === 0) { s = fr < tr ? 1 : -1; for (var r = fr + s; r !== tr; r += s) if (b[r * 9 + fc]) n++; return n; }
      return -1;
    }
    if (t === 'R') { if (dr !== 0 && dc !== 0) return false; return between() === 0; }
    if (t === 'C') { if (dr !== 0 && dc !== 0) return false; var n = between(); return b[to] ? n === 1 : n === 0; }
    if (t === 'N') { if (!((adr === 1 && adc === 2) || (adr === 2 && adc === 1))) return false; var lr = fr + (adr === 2 ? dr / 2 : 0), lc = fc + (adc === 2 ? dc / 2 : 0); return !b[lr * 9 + lc]; }
    if (t === 'B') { if (adr !== 2 || adc !== 2) return false; if (b[(fr + dr / 2) * 9 + (fc + dc / 2)]) return false; return up ? true : (red ? (tr >= 5) : (tr <= 4)); }
    if (t === 'A') { if (adr !== 1 || adc !== 1) return false; if (!up && (tc < 3 || tc > 5)) return false; return up ? true : (red ? (tr >= 7 && tr <= 9) : (tr >= 0 && tr <= 2)); }
    if (t === 'K') {
      var tgt = b[to];
      if (tgt && tgt.toUpperCase() === 'K' && dc === 0) return between() === 0; // đối mặt tướng (ăn)
      if (adr + adc !== 1) return false; if (tc < 3 || tc > 5) return false; return red ? (tr >= 7 && tr <= 9) : (tr >= 0 && tr <= 2);
    }
    if (t === 'P') {
      if (red) { if (dr === -1 && dc === 0) return true; if (fr <= 4 && dr === 0 && adc === 1) return true; return false; }
      if (dr === 1 && dc === 0) return true; if (fr >= 5 && dr === 0 && adc === 1) return true; return false;
    }
    return true;
  }
  function legalMove(b, from, to) {
    var p = b[from]; if (!p || from === to) return false;
    var tgt = b[to]; if (tgt && sameSide(tgt, p)) return false; // không ăn quân mình
    var red = isRed(p), type, up = (p === 'X' || p === 'x');
    if (up) { var role = posRole(from); if (!role) return true; type = role; }
    else type = p.toUpperCase();
    return moveByType(type, red, b, from, to, up);
  }

  var board = new Array(90).fill(null);
  var hidden = new Array(90).fill(null);   // binh chủng thật DƯỚI nắp (để tự lật khi đi)
  var mode = 'setup';         // 'setup' | 'move'
  var palettePiece = null;    // quân đang chọn ở bảng quân (setup)
  var selected = -1;          // ô đang chọn (move)
  // Cây biến: rootNode là thế gốc; mỗi node là 1 nước, có nhiều con = nhiều biến (2A, 2B...).
  // node = {from,to,reveal,side,wxf,iccs,caption,depth,board[90],hidden[90],children[],parent}
  // (KHÔNG đặt tên "root" vì biến đó đã là phần tử DOM [data-board-editor].)
  var rootNode = null;        // node gốc (thế mở)
  var cur = null;             // node đang hiển thị trên bàn cờ

  // ---- helpers ----
  function loadFen(fen) {
    board = new Array(90).fill(null);
    hidden = new Array(90).fill(null);
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

  // ---- CÂY BIẾN (variation tree) ----
  // Tạo lại gốc từ thế hiện tại (khi đổi thế mở / đậy nắp / vào chế độ soạn nước).
  function newRoot() {
    rootNode = { children: [], parent: null, depth: 0, board: board.slice(), hidden: hidden.slice() };
    cur = rootNode;
  }
  // Nạp thế của 1 node lên bàn cờ.
  function gotoNode(node) {
    cur = node; board = node.board.slice(); hidden = node.hidden.slice(); selected = -1;
  }
  // Ghi 1 nước từ node hiện tại: from→to (reveal = binh chủng lật ra nếu là quân úp).
  // Nếu node hiện tại đã có con trùng nước này → đi vào biến đó (không tạo trùng).
  function pushMove(from, to, reveal) {
    var nb = cur.board.slice(), nh = cur.hidden.slice();
    var p = nb[from], up = (p === 'X' || p === 'x'), moved = up ? reveal : p;
    var wxf = up ? ('úp → ' + (PIECE_VI[(reveal || '').toUpperCase()] || 'quân úp')) : notation(nb, from, to);
    nb[to] = moved; nb[from] = null; nh[to] = null; nh[from] = null;
    for (var k = 0; k < cur.children.length; k++) {
      var c = cur.children[k];
      if (c.from === from && c.to === to && (c.reveal || null) === (reveal || null)) { gotoNode(c); return; }
    }
    var node = {
      from: from, to: to, reveal: reveal || null, side: sideOf(moved),
      wxf: wxf, iccs: toIccs(from) + toIccs(to), caption: '',
      depth: cur.depth + 1, board: nb, hidden: nh, children: [], parent: cur
    };
    cur.children.push(node); gotoNode(node);
  }
  // Xoá 1 node + toàn bộ nhánh con của nó; về node cha.
  function deleteNode(node) {
    if (!node.parent) return;
    var arr = node.parent.children, idx = arr.indexOf(node);
    if (idx >= 0) arr.splice(idx, 1);
    gotoNode(node.parent);
  }
  // Đậy nắp mọi quân (trừ 2 Tướng) → tạo thế cờ úp; nhớ binh chủng thật để tự lật khi đi.
  function coverAll() {
    var n = 0;
    for (var i = 0; i < 90; i++) {
      var p = board[i];
      if (!p || p === 'X' || p === 'x' || p === 'K' || p === 'k') continue;
      hidden[i] = p; board[i] = isRed(p) ? 'X' : 'x'; n++;
    }
    newRoot(); render(); renderMoves();
    beMsg(n ? ('Đã đậy nắp ' + n + ' quân (2 Tướng để ngửa). Sang “Soạn nước đi” — quân úp tự lật đúng binh chủng khi đi.') : 'Không có quân nào để đậy nắp.', n > 0);
  }
  // Mạch chính = chuỗi con đầu (children[0]) từ gốc — dùng cho trình chơi tuyến tính hiện có.
  function mainline() {
    var out = [], n = rootNode;
    while (n && n.children.length) { n = n.children[0]; out.push({ fen: toFen(n.board), iccs: n.iccs, wxf: n.wxf, side: n.side, caption: n.caption || '' }); }
    return out;
  }
  // Cây đầy đủ (lồng nhau) — lưu để Agent/tương lai render biến.
  function serializeTree() {
    function ser(node) {
      return node.children.map(function (c) {
        return { from: c.from, to: c.to, iccs: c.iccs, wxf: c.wxf, side: c.side, reveal: c.reveal || null, fen: toFen(c.board), caption: c.caption || '', children: ser(c) };
      });
    }
    return ser(rootNode);
  }
  // Đường dẫn từ gốc tới node (để tô sáng dòng đang xem).
  function isOnPath(node) { var n = cur; while (n) { if (n === node) return true; n = n.parent; } return false; }

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
    // Mũi tên biến (giống trang học): ở chế độ soạn nước, khi node hiện tại có nhiều nhánh
    // hoặc đang xem 1 biến trong nhóm anh em → vẽ mũi tên A/B… cho các biến còn lại.
    if (mode === 'move' && cur) {
      var _kids = cur.children || [], _sibs = (cur.parent && cur.parent.children.length > 1) ? cur.parent.children : null;
      var _set = null, _ci = -1;
      if (_kids.length > 1) { _set = _kids; }
      else if (_sibs) { _set = _sibs; _ci = _sibs.indexOf(cur); }
      if (_set) _set.forEach(function (c, k) {
        if (k === _ci) return;
        var col = BRANCH_COLORS[k % BRANCH_COLORS.length], label = String.fromCharCode(65 + k);
        var fx = X(c.from % 9), fy = Y((c.from / 9) | 0), tx = X(c.to % 9), ty = Y((c.to / 9) | 0);
        var dx = tx - fx, dy = ty - fy, len = Math.sqrt(dx * dx + dy * dy) || 1, ux = dx / len, uy = dy / len;
        var sx = fx + ux * 20, sy = fy + uy * 20, ex = tx - ux * 20, ey = ty - uy * 20, px = -uy, py = ux;
        s += '<line x1="' + sx + '" y1="' + sy + '" x2="' + ex + '" y2="' + ey + '" stroke="' + col + '" stroke-width="5" stroke-linecap="round" opacity=".9"/>';
        var ah = 14, aw = 8.5, bx = ex - ux * ah, by = ey - uy * ah;
        s += '<polygon points="' + ex + ',' + ey + ' ' + (bx + px * aw) + ',' + (by + py * aw) + ' ' + (bx - px * aw) + ',' + (by - py * aw) + '" fill="' + col + '"/>';
        var lx = fx + px * 16, ly = fy + py * 16;
        s += '<circle cx="' + lx + '" cy="' + ly + '" r="11.5" fill="' + col + '" stroke="#fff" stroke-width="1.5"/>';
        s += '<text x="' + lx + '" y="' + (ly + 5) + '" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="system-ui,sans-serif">' + label + '</text>';
      });
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
      if (palettePiece === 'erase') { board[i] = null; hidden[i] = null; render(); beMsg('Đã xoá quân.', true); return; }
      if (!palettePiece) { beMsg('Hãy chọn một quân ở bảng quân trước.'); return; }
      var r = (i / 9) | 0, c = i % 9;
      if (!zoneOk(palettePiece, r, c)) { beMsg('Không hợp lệ: ' + pieceName(palettePiece) + ' không được đặt ở ô này.'); return; }
      var existing = board[i];
      if (existing !== palettePiece && countPiece(palettePiece) >= LIMITS[palettePiece]) {
        beMsg('Vượt số lượng: tối đa ' + LIMITS[palettePiece] + ' ' + pieceName(palettePiece) + ' mỗi bên.'); return;
      }
      board[i] = palettePiece; hidden[i] = null; render(); beMsg('Đã đặt ' + pieceName(palettePiece) + '.', true);
      return;
    }
    // move mode
    if (selected < 0) {
      if (board[i]) { selected = i; render(); }
      return;
    }
    if (i === selected) { selected = -1; render(); return; }
    var piece = board[selected];
    if (!piece) { selected = i; render(); return; }
    // bấm sang quân cùng bên → đổi chọn quân đó
    if (board[i] && sameSide(board[i], piece)) { selected = i; render(); return; }
    // kiểm tra nước đi đúng luật cờ tướng
    if (!legalMove(board, selected, i)) {
      beMsg('Nước đi không hợp lệ với luật của ' + pieceName(piece) + '. Chọn ô đích khác.');
      return;
    }
    var reveal = null;
    if (piece === 'X' || piece === 'x') {
      if (hidden[selected]) { reveal = hidden[selected]; } // tự lật theo quân đã đặt rồi đậy nắp
      else {
        var rv = prompt('Quân úp này lật ra binh chủng gì? Nhập: X=Xe, P=Pháo, M=Mã, T=Tượng, S=Sĩ, B=Tốt', '');
        var map = { X: 'R', P: 'C', M: 'N', T: 'B', S: 'A', B: 'P' };
        var rc = rv ? map[rv.trim().toUpperCase()] : null;
        if (!rc) { beMsg('Cần chọn binh chủng quân úp lật ra để ghi nước.'); return; }
        reveal = (piece === 'X') ? rc : rc.toLowerCase();
      }
    }
    var wasBranch = cur.children.length; // nếu node hiện tại đã có nước → nước mới là 1 biến
    pushMove(selected, i, reveal);
    render(); renderMoves();
    if (wasBranch > 0) beMsg('Đã tạo biến mới ở nước này. Danh sách nước đi đã phân nhánh.', true);
  }

  // ---- danh sách nước đi dạng CÂY BIẾN + caption ----
  var movesBox = root.querySelector('[data-be-moves]');
  var flatNodes = [];
  function renderMoves() {
    if (!rootNode || rootNode.children.length === 0) {
      movesBox.innerHTML = '<p class="muted" style="font-size:13px;line-height:1.6;">Chưa có nước đi. Bấm một quân rồi bấm ô đích để ghi nước.<br>Muốn tạo <strong>biến</strong> cho một nước: bấm nút <strong>+ Biến</strong> trên nước đó (bàn cờ về thế trước nước đó) rồi đi một nước khác — nhánh 1A/1B… sẽ hiện ra.</p>';
      flatNodes = []; syncHidden(); return;
    }
    flatNodes = [];
    (function walk(node, indent) {
      node.children.forEach(function (ch, idx) {
        var branch = node.children.length > 1;
        var childIndent = (idx === 0) ? indent : indent + 1;
        flatNodes.push({ node: ch, indent: childIndent, letter: branch ? String.fromCharCode(65 + idx) : '' });
        walk(ch, childIndent);
      });
    })(rootNode, 0);
    var h = '';
    flatNodes.forEach(function (row, k) {
      var m = row.node, side = m.side === 'den' ? 'Đen' : 'Đỏ';
      var isCur = (m === cur);
      var wrap = 'margin-left:' + (row.indent * 14) + 'px;' + (isCur ? 'box-shadow:0 0 0 2px var(--jade,#16a34a);border-radius:8px;' : '');
      h += '<div class="be-move" style="' + wrap + '">'
        + '<div class="be-move-head">'
        + '<button type="button" class="be-move-nav" data-nav="' + k + '" title="Xem thế cờ sau nước này" style="background:none;border:0;cursor:pointer;font-weight:700;color:inherit;text-align:left;padding:0;">'
        + (isCur ? '▶ ' : '') + m.depth + row.letter + '. ' + side + (m.wxf ? ' · ' + m.wxf : '') + (row.letter ? ' <span style="color:var(--ink-faint,#999);font-weight:600;">(biến ' + row.letter + ')</span>' : '') + '</button>'
        + '<span style="display:inline-flex;gap:6px;flex-shrink:0;">'
        + '<button type="button" class="btn" data-branch="' + k + '" title="Tạo biến khác cho nước này: về thế TRƯỚC nước này rồi đi một nước khác" style="min-height:28px;padding:0 10px;">+ Biến</button>'
        + '<button type="button" class="btn danger" data-del="' + k + '" style="min-height:28px;padding:0 10px;">Xoá nhánh</button>'
        + '</span>'
        + '</div>'
        + '<input type="text" class="be-cap" data-cap="' + k + '" value="' + (m.caption || '').replace(/"/g, '&quot;') + '" placeholder="Lời giảng cho nước này…"></div>';
    });
    movesBox.innerHTML = h;
    movesBox.querySelectorAll('[data-nav]').forEach(function (el) {
      el.addEventListener('click', function () {
        var nd = flatNodes[+el.getAttribute('data-nav')].node;
        gotoNode(nd); render(); renderMoves();
        beMsg('Đang xem sau nước “' + nd.wxf + '”. Đi tiếp để nối nhánh này, hoặc đi nước khác để tạo biến.', true);
      });
    });
    movesBox.querySelectorAll('[data-branch]').forEach(function (el) {
      el.addEventListener('click', function () {
        var nd = flatNodes[+el.getAttribute('data-branch')].node;
        gotoNode(nd.parent); // về thế TRƯỚC nước này (quân đã đi trở lại vị trí cũ)
        render(); renderMoves();
        beMsg('Đã về thế trước nước “' + nd.wxf + '”. Đi một nước khác để tạo biến — nước cũ giữ nguyên thành nhánh song song (1A, 1B…).', true);
      });
    });
    movesBox.querySelectorAll('[data-cap]').forEach(function (el) {
      el.addEventListener('input', function () { flatNodes[+el.getAttribute('data-cap')].node.caption = el.value; syncHidden(); });
    });
    movesBox.querySelectorAll('[data-del]').forEach(function (el) {
      el.addEventListener('click', function () { deleteNode(flatNodes[+el.getAttribute('data-del')].node); render(); renderMoves(); });
    });
    syncHidden();
  }

  // ---- đồng bộ vào input ẩn của form ----
  var elFen = root.querySelector('[name="initial_fen"]');
  var elSteps = root.querySelector('[name="steps_json"]');
  var elTree = root.querySelector('[name="variation_tree"]');
  function syncHidden() {
    if (elFen) elFen.value = rootNode ? toFen(rootNode.board) : toFen(board);
    if (elSteps) elSteps.value = JSON.stringify(mainline());     // mạch chính (trình chơi tuyến tính)
    if (elTree) elTree.value = JSON.stringify(serializeTree());  // cây biến đầy đủ (Agent/hiển thị biến)
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
  function boardsEqual(a, b) { for (var i = 0; i < 90; i++) { if ((a[i] || null) !== (b[i] || null)) return false; } return true; }
  function setMode(m) { // chỉ đổi giao diện; logic thế cờ do enterMove/enterSetup lo
    mode = m; selected = -1; palettePiece = null;
    root.querySelectorAll('[data-be-mode]').forEach(function (b) { b.classList.toggle('on', b.getAttribute('data-be-mode') === m); });
    root.querySelector('[data-be-setup-tools]').style.display = (m === 'setup') ? '' : 'none';
    root.querySelector('[data-be-move-tools]').style.display = (m === 'move') ? '' : 'none';
    render(); renderMoves();
  }
  function enterMove() {
    // chốt thế hiện tại làm gốc cây biến; nếu thế gốc đổi thì dựng cây mới (mất các nước cũ)
    if (!rootNode || !boardsEqual(rootNode.board, board) || !boardsEqual(rootNode.hidden, hidden)) newRoot();
    else gotoNode(rootNode);
    setMode('move');
  }
  function enterSetup() {
    if (rootNode) { board = rootNode.board.slice(); hidden = rootNode.hidden.slice(); selected = -1; }
    setMode('setup');
  }

  root.querySelectorAll('[data-be-mode]').forEach(function (b) {
    b.addEventListener('click', function () { (b.getAttribute('data-be-mode') === 'move') ? enterMove() : enterSetup(); });
  });
  root.querySelector('[data-be-start-normal]').addEventListener('click', function () { loadFen(STARTS.normal); rootNode = null; cur = null; render(); renderMoves(); });
  root.querySelector('[data-be-start-up]').addEventListener('click', function () { loadFen(STARTS.up); rootNode = null; cur = null; render(); renderMoves(); });
  root.querySelector('[data-be-clear]').addEventListener('click', function () { board = new Array(90).fill(null); hidden = new Array(90).fill(null); rootNode = null; cur = null; render(); renderMoves(); });
  var beCover = root.querySelector('[data-be-cover]');
  if (beCover) beCover.addEventListener('click', coverAll);
  root.querySelector('[data-be-undo]').addEventListener('click', function () { if (cur && cur.parent) { deleteNode(cur); render(); renderMoves(); } });

  // đổi loại cờ: Cờ Úp → vào xếp quân (xếp quân sáng đúng luật rồi đậy nắp); Cờ Tướng → soạn nước ngay
  var gm = document.getElementById('be-gamemode');
  if (gm) gm.addEventListener('change', function () {
    loadFen(STARTS.normal); rootNode = null; cur = null;
    if (this.value === 'co-up') { enterSetup(); beMsg('Cờ Úp: chỉnh quân sáng cho đúng luật mỗi bên rồi bấm “Đậy nắp quân”, sau đó sang “Soạn nước đi”.', true); }
    else { enterMove(); }
  });

  // init — mặc định vào ngay chế độ Soạn nước đi để dựng khai cuộc nhanh
  loadFen(root.getAttribute('data-init') || STARTS.normal);
  buildPalette();
  enterMove();
})();
