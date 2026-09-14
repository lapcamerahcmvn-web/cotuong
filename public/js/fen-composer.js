/* Soạn thế cờ công khai (trang "Thư viện của tôi" — /tai-khoan/thu-vien): ĐẶT QUÂN đơn giản,
   không ghi nước/không luật đi quân/không cây biến — mục tiêu chỉ là 1 thế cờ tĩnh để lưu.
   Dùng window.XiangqiRules.loadFen/toFen (KHÔNG viết lại logic FEN). Board.js::renderBoard là
   read-only (không phát điểm bấm) nên phải tự vẽ SVG + điểm bấm riêng ở đây, giống board-editor.js
   nhưng đơn giản hơn nhiều (KHÔNG đụng board-editor.js). */
(function () {
  'use strict';
  var root = document.querySelector('[data-fen-composer]');
  if (!root) return;
  var Rules = window.XiangqiRules;
  if (!Rules) return;

  var PIECES = {
    K: '帥', A: '仕', B: '相', N: '馬', R: '俥', C: '炮', P: '兵',
    k: '將', a: '士', b: '象', n: '馬', r: '車', c: '砲', p: '卒'
  };
  var ORDER = ['R', 'N', 'B', 'A', 'K', 'C', 'P', 'r', 'n', 'b', 'a', 'k', 'c', 'p'];
  var START = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';
  var M = 26, CW = 52, CH = 52, W = M * 2 + CW * 8, H = M * 2 + CH * 9;

  var board = Rules.loadFen(START);
  var palettePiece = null;

  var holder = root.querySelector('[data-fc-board]');
  var fenInput = root.querySelector('[data-fc-fen-input]');
  var msgEl = root.querySelector('[data-fc-msg]');

  function msg(text, ok) {
    if (!msgEl) return;
    msgEl.textContent = text || '';
    msgEl.style.color = ok ? 'var(--jade)' : 'var(--red)';
  }

  function line(x1, y1, x2, y2) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--xq-line,#7c5a2c)" stroke-width="1.4"/>';
  }

  function render() {
    function X(f) { return M + f * CW; }
    function Y(r) { return M + r * CH; }
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" style="max-width:420px;height:auto;display:block;touch-action:manipulation" role="img" aria-label="Soạn thế cờ">';
    s += '<rect x="0" y="0" width="' + W + '" height="' + H + '" rx="10" fill="var(--xq-wood,#e9cf9c)"/>';
    for (var r = 0; r < 10; r++) s += line(X(0), Y(r), X(8), Y(r));
    for (var f = 0; f < 9; f++) { if (f === 0 || f === 8) s += line(X(f), Y(0), X(f), Y(9)); else { s += line(X(f), Y(0), X(f), Y(4)); s += line(X(f), Y(5), X(f), Y(9)); } }
    s += line(X(3), Y(0), X(5), Y(2)) + line(X(5), Y(0), X(3), Y(2)) + line(X(3), Y(7), X(5), Y(9)) + line(X(5), Y(7), X(3), Y(9));
    for (var i = 0; i < 90; i++) {
      var chr = board[i]; if (!chr) continue;
      var cx = X(i % 9), cy = Y((i / 9) | 0), red = Rules.isRed(chr);
      var col = red ? 'var(--xq-red,#c0392b)' : 'var(--xq-black,#24333f)';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="var(--xq-disc,#f6ecd6)" stroke="' + col + '" stroke-width="2"/>';
      s += '<text x="' + cx + '" y="' + (cy + 8) + '" text-anchor="middle" font-size="24" font-family="XiangqiKai,KaiTi,STKaiti,serif" fill="' + col + '">' + (PIECES[chr] || '?') + '</text>';
    }
    for (var j = 0; j < 90; j++) {
      var jx = j % 9, jr = (j / 9) | 0;
      s += '<circle class="fc-hit" data-sq="' + j + '" cx="' + X(jx) + '" cy="' + Y(jr) + '" r="24" fill="transparent" style="cursor:pointer"/>';
    }
    s += '</svg>';
    holder.innerHTML = s;
    holder.querySelectorAll('.fc-hit').forEach(function (el) {
      el.addEventListener('click', function () { onSquare(+el.getAttribute('data-sq')); });
    });
    if (fenInput && document.activeElement !== fenInput) fenInput.value = Rules.toFen(board);
  }

  function onSquare(i) {
    if (palettePiece === 'erase') { board[i] = null; render(); return; }
    if (!palettePiece) { msg('Chọn một quân ở bảng bên dưới trước, rồi bấm lên bàn cờ để đặt.'); return; }
    board[i] = palettePiece; render();
  }

  function buildPalette() {
    var pal = root.querySelector('[data-fc-palette]');
    if (!pal) return;
    var html = '';
    ORDER.forEach(function (p) {
      var red = Rules.isRed(p);
      html += '<button type="button" class="fc-pal" data-p="' + p + '" title="' + (red ? 'Đỏ' : 'Đen') + '" style="color:' + (red ? 'var(--xq-red,#c0392b)' : 'var(--xq-black,#24333f)') + '">' + PIECES[p] + '</button>';
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

  function bind(sel, fn) { var el = root.querySelector(sel); if (el) el.addEventListener('click', fn); }

  bind('[data-fc-start]', function () { board = Rules.loadFen(START); palettePiece = null; render(); msg('Đã nạp thế mở chuẩn.', true); });
  bind('[data-fc-clear]', function () { board = new Array(90).fill(null); render(); msg('Đã xoá bàn cờ — chọn quân rồi đặt lên bàn.', true); });
  bind('[data-fc-fen-apply]', function () {
    var val = fenInput && fenInput.value.trim();
    if (!val) { msg('Nhập chuỗi FEN trước.'); return; }
    board = Rules.loadFen(val); render(); msg('Đã nạp FEN — kiểm tra lại quân trên bàn.', true);
  });
  bind('[data-fc-fen-copy]', function () {
    var fen = Rules.toFen(board);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fen).then(function () { msg('Đã sao chép FEN.', true); });
    }
  });
  bind('[data-fc-save]', function () {
    var title = window.prompt('Đặt tên cho thế cờ này (không bắt buộc):', '') || '';
    var tokenEl = document.querySelector('meta[name=csrf-token]');
    var btn = root.querySelector('[data-fc-save]');
    if (!tokenEl) return;
    if (btn) btn.disabled = true;
    fetch('/thu-vien', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': tokenEl.content, 'Accept': 'application/json' },
      body: JSON.stringify({ fen: Rules.toFen(board), title: title })
    }).then(function (r) { return r.ok ? r.json() : Promise.reject(); }).then(function () {
      window.location.reload();
    }).catch(function () {
      if (btn) btn.disabled = false;
      msg('Lưu thất bại — thử lại sau.');
    });
  });

  buildPalette();
  render();
})();
