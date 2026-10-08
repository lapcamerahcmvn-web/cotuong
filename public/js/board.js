/* Học Cờ Tướng — bàn cờ tương tác (vanilla JS, không phụ thuộc thư viện).
   File TĨNH dùng chung cho trang học (nạp động từ resources/js/app.js) và admin (thẻ <script>).
   Auto-init mọi [data-xqboard] chứa 1 <script type="application/json">:
     { initialFen, steps: [{fen,caption,side,iccs,wxf}], tree, mode, puzzleSide }

   Chế độ: view (mạch chính) · tree (cây biến, mũi tên A/B) · puzzle (tự đi quân).
   API: window.XiangqiBoard.render(fen, lastMove, arrows, selected, flip, opts)
        window.XiangqiBoard.mountPuzzle(el, cfg) → { reset, reveal, hint, load, destroy }
   Sự kiện (bubble lên document): xq:viewed-all-moves · xq:userstep · xq:puzzle-move {ok,ply,move,expected}
        · xq:puzzle-checking / xq:puzzle-checked {status} (máy kiểm nước khác đáp án) · xq:puzzle-slow {k} (thắng nhưng chậm)
        · xq:puzzle-solved {moves,ms,mistakes,revealed} · xq:puzzle-failed {moves,ms,wrongPly,userMove,expected} */
(function () {
  'use strict';

  var REDUCE = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Icon: dùng sprite SVG nếu trang có (site chính), không thì rơi về ký tự (admin).
  var EMOJI = { volume: '🔊', 'volume-x': '🔇', copy: '📋', bookmark: '🔖', expand: '⛶', x: '✕', check: '✓', play: '▶', pause: '⏸', more: '⋯', flip: '⟲', reset: '↺', bulb: '💡', eye: '👁' };
  function ico(name) {
    if (document.getElementById('i-' + name)) {
      return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
    }
    return EMOJI[name] || '';
  }
  function setBtn(btn, name, text) {
    if (!btn) return;
    btn.innerHTML = ico(name) + (text ? '<span>' + text + '</span>' : '');
  }

  // Âm thanh — tổng hợp bằng Web Audio API (không cần file audio) + giọng đọc nước đi (Web Speech, tiếng Việt).
  // Cài đặt lưu localStorage 'xq_sound' (JSON): on, vol 0..1, pack 'wood'|'stone'|'soft', check, tick, end, voice.
  var Sound = (function () {
    var DEF = { on: true, vol: 0.8, pack: 'wood', check: true, tick: true, end: true, voice: false };
    var P = {};
    function load() {
      var o = {};
      try { o = JSON.parse(localStorage.getItem('xq_sound') || '{}') || {}; } catch (e) { o = {}; }
      P = {};
      for (var k in DEF) P[k] = (o[k] === undefined ? DEF[k] : o[k]);
      try { if (localStorage.getItem('xq_muted') === '1' && o.on === undefined) P.on = false; } catch (e) {}
    }
    function store() {
      try { localStorage.setItem('xq_sound', JSON.stringify(P)); localStorage.setItem('xq_muted', P.on ? '0' : '1'); } catch (e) {}
    }
    load();
    window.addEventListener('storage', function (e) { if (e.key === 'xq_sound') load(); });
    var ctx = null, master = null;
    function ac() {
      if (!ctx) {
        try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return null; }
        master = ctx.createGain(); master.connect(ctx.destination);
      }
      if (ctx.state === 'suspended') ctx.resume();
      master.gain.value = Math.max(0, Math.min(1, +P.vol || 0)) * 1.25;
      return ctx;
    }
    function tone(freq, dur, type, gain, delay, slideTo) {
      var c = ac(); if (!c) return;
      var t0 = c.currentTime + (delay || 0);
      var osc = c.createOscillator(), g = c.createGain();
      osc.type = type; osc.frequency.setValueAtTime(freq, t0);
      if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
      g.gain.setValueAtTime(0, t0);
      g.gain.linearRampToValueAtTime(gain, t0 + 0.006);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      osc.connect(g); g.connect(master);
      osc.start(t0); osc.stop(t0 + dur + 0.02);
    }
    function noiseBurst(dur, gain, delay, hp) {
      var c = ac(); if (!c) return;
      var t0 = c.currentTime + (delay || 0);
      var len = Math.max(1, Math.floor(c.sampleRate * dur));
      var buf = c.createBuffer(1, len, c.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
      var src = c.createBufferSource(); src.buffer = buf;
      var g = c.createGain(); g.gain.setValueAtTime(gain, t0); g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      var node = src;
      if (hp) { var f = c.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = hp; src.connect(f); node = f; }
      node.connect(g); g.connect(master);
      src.start(t0);
    }
    // Bộ âm: Gỗ (cạch trầm như quân gỗ đặt xuống bàn) · Đá (tiếng "tách" sáng của quân đá/ngọc) · Nhẹ (êm, nhỏ).
    var PACKS = {
      wood: function (cap) { tone(cap ? 150 : 190, 0.09, 'triangle', 0.22, 0); tone(cap ? 95 : 115, 0.12, 'sine', 0.16, 0.006); if (cap) noiseBurst(0.05, 0.14, 0.012); },
      stone: function (cap) { tone(cap ? 1250 : 1650, 0.05, 'sine', 0.14, 0); noiseBurst(0.035, 0.16, 0, 2200); tone(cap ? 420 : 560, 0.08, 'triangle', 0.1, 0.004); if (cap) noiseBurst(0.07, 0.12, 0.02, 1200); },
      soft: function (cap) { tone(cap ? 330 : 392, 0.14, 'sine', 0.1, 0); if (cap) tone(262, 0.16, 'sine', 0.08, 0.05); }
    };
    function move(isCapture) { if (P.on) (PACKS[P.pack] || PACKS.wood)(!!isCapture); }
    function check() { if (P.on && P.check) { tone(880, 0.11, 'square', 0.05, 0.08); tone(1175, 0.16, 'square', 0.05, 0.19); } }
    function tick(urgent) { if (P.on && P.tick) tone(urgent ? 1400 : 1000, 0.035, 'square', urgent ? 0.05 : 0.03, 0); }
    function end(kind) {
      if (!P.on || !P.end) return;
      if (kind === 'win') { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.22, 'triangle', 0.12, i * 0.11); }); }
      else if (kind === 'loss') { [392, 330, 262].forEach(function (f, i) { tone(f, 0.3, 'sine', 0.12, i * 0.16); }); }
      else { tone(523, 0.25, 'sine', 0.1, 0); tone(523, 0.3, 'sine', 0.1, 0.22); }
    }
    function good() { if (P.on) { tone(660, 0.12, 'sine', 0.12, 0); tone(880, 0.18, 'sine', 0.12, 0.09); } }
    function bad() { if (P.on) { tone(220, 0.16, 'square', 0.06, 0); tone(165, 0.22, 'square', 0.06, 0.1); } }
    // Giọng đọc: chọn giọng tiếng Việt nếu máy có; không có thì im lặng (không đọc bằng giọng ngoại ngữ).
    var viVoice = null;
    function pickVoice() {
      try { var vs = window.speechSynthesis.getVoices() || []; viVoice = vs.filter(function (v) { return /^vi/i.test(v.lang); })[0] || null; } catch (e) {}
    }
    if (window.speechSynthesis) { pickVoice(); try { window.speechSynthesis.addEventListener('voiceschanged', pickVoice); } catch (e) {} }
    function hasVoice() { if (!viVoice) pickVoice(); return !!viVoice; }
    function say(text, force) {
      if (!text || !window.speechSynthesis || !(force || (P.on && P.voice))) return;
      if (!hasVoice()) return;
      try {
        window.speechSynthesis.cancel();
        var u = new SpeechSynthesisUtterance(String(text).replace(/\s*[—-]\s*/g, ', '));
        u.voice = viVoice; u.lang = viVoice.lang; u.rate = 1.05; u.volume = Math.max(0.1, Math.min(1, +P.vol || 0.8));
        window.speechSynthesis.speak(u);
      } catch (e) {}
    }
    function toggle() { P.on = !P.on; store(); return !P.on; }
    function get() { var o = {}; for (var k in P) o[k] = P[k]; return o; }
    function set(o) { for (var k in o) if (k in DEF) P[k] = o[k]; store(); }
    return {
      move: move, check: check, tick: tick, end: end, good: good, bad: bad, say: say, hasVoice: hasVoice,
      toggle: toggle, get: get, set: set, isMuted: function () { return !P.on; }
    };
  })();

  // Sau 1 nước: tiếng đặt quân / ăn quân, báo chiếu tướng (nếu có), đọc tên nước (nếu bật giọng đọc).
  function moveFx(beforeFen, afterFen, wxf) {
    Sound.move(countPieces(beforeFen) !== countPieces(afterFen));
    var R = window.XiangqiRules;
    if (R && afterFen) {
      try {
        var b = R.loadFen(afterFen.split(' ')[0]), coup = /[Xx]/.test(afterFen);
        if (R.inCheck(b, true, coup) || R.inCheck(b, false, coup)) Sound.check();
      } catch (e) {}
    }
    if (wxf) Sound.say(wxf);
  }

  function attachSound(root) {
    var btn = root.querySelector('[data-xq-sound]');
    if (!btn) return;
    function render() {
      setBtn(btn, Sound.isMuted() ? 'volume-x' : 'volume');
      btn.setAttribute('aria-pressed', Sound.isMuted() ? 'true' : 'false');
      btn.setAttribute('aria-label', Sound.isMuted() ? 'Bật âm thanh nước đi' : 'Tắt âm thanh nước đi');
    }
    render();
    btn.addEventListener('click', function () { Sound.toggle(); render(); });
  }

  // Menu "⋯" trên thanh bàn cờ (sao chép FEN, lưu thư viện…).
  function attachMenu(root) {
    var tg = root.querySelector('[data-xq-menu-toggle]'), menu = root.querySelector('[data-xq-menu]');
    if (!tg || !menu) return;
    setBtn(tg, 'more');
    tg.addEventListener('click', function (e) { e.stopPropagation(); menu.hidden = !menu.hidden; tg.setAttribute('aria-expanded', menu.hidden ? 'false' : 'true'); });
    document.addEventListener('click', function (e) { if (!menu.hidden && !menu.contains(e.target)) menu.hidden = true; });
  }

  function flash(btn, ok) {
    if (!btn) return;
    btn.classList.add('is-ok');
    var label = btn.querySelector('span');
    var old = label ? label.textContent : null;
    if (label) label.textContent = ok;
    setTimeout(function () { btn.classList.remove('is-ok'); if (label) label.textContent = old; }, 1600);
  }

  function attachCopyFen(root, getFen) {
    var btn = root.querySelector('[data-xq-copyfen]');
    if (!btn) return;
    if (!btn.innerHTML.trim()) setBtn(btn, 'copy');
    btn.addEventListener('click', function () {
      var fen = getFen();
      if (!navigator.clipboard || !navigator.clipboard.writeText) return;
      navigator.clipboard.writeText(fen).then(function () { flash(btn, 'Đã sao chép'); });
    });
  }

  function attachSaveFen(root, getFen) {
    var btn = root.querySelector('[data-xq-savefen]');
    if (!btn) return;
    if (!btn.innerHTML.trim()) setBtn(btn, 'bookmark');
    var group = root.querySelector('[data-xq-source-lesson]');
    var sourceLessonId = group ? group.getAttribute('data-xq-source-lesson') : null;
    btn.addEventListener('click', function () {
      var title = window.prompt('Đặt tên cho thế cờ này (không bắt buộc):', '') || '';
      var tokenEl = document.querySelector('meta[name=csrf-token]');
      if (!tokenEl) return;
      fetch('/thu-vien', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': tokenEl.content, 'Accept': 'application/json' },
        body: JSON.stringify({ fen: getFen(), title: title, source_lesson_id: sourceLessonId || null })
      }).then(function (r) { return r.ok ? r.json() : Promise.reject(); }).then(function () {
        flash(btn, 'Đã lưu');
      }).catch(function () { alert('Lưu thất bại, thử lại sau.'); });
    });
  }

  function countPieces(fen) {
    var m = (fen || '').split(' ')[0].match(/[A-Za-z]/g);
    return m ? m.length : 0;
  }

  // Ký tự quân theo lối truyền thống: Đỏ và Đen dùng chữ khác nhau cho cùng loại quân.
  var PIECES = {
    K: { c: '帥', red: true }, A: { c: '仕', red: true }, B: { c: '相', red: true },
    N: { c: '馬', red: true }, R: { c: '俥', red: true }, C: { c: '炮', red: true }, P: { c: '兵', red: true },
    k: { c: '將' }, a: { c: '士' }, b: { c: '象' }, n: { c: '馬' }, r: { c: '車' }, c: { c: '砲' }, p: { c: '卒' },
    X: { up: true, red: true }, x: { up: true }
  };
  Object.keys(PIECES).forEach(function (k) { PIECES[k].t = k.toUpperCase(); });
  // Chữ Việt trên quân (cài đặt "Bộ quân: Chữ Việt") — dễ cho người mới chưa quen chữ Hán.
  var VI = { K: 'Tướng', A: 'Sĩ', B: 'Tượng', N: 'Mã', R: 'Xe', C: 'Pháo', P: 'Tốt' };
  // Cài đặt hiển thị (localStorage, trang Cài đặt): bộ chữ, kiểu quân phẳng/nổi, số cột quanh bàn.
  var PREF = {};
  function loadPrefs() {
    function rd(k, d) { try { var v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } }
    PREF = { set: rd('piece_set', 'han'), style: rd('piece_style', 'flat'), coords: rd('board_coords', '0') === '1',
      lastFx: rd('last_fx', 'pulse'), lastArrow: rd('last_arrow', '0') === '1' };
    try { document.documentElement.dataset.boardCoords = PREF.coords ? '1' : '0'; } catch (e) {}
  }
  loadPrefs();
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
    function sq(a, b) { return [a.charCodeAt(0) - 97, 9 - (b.charCodeAt(0) - 48)]; }
    return { from: sq(iccs[0], iccs[1]), to: sq(iccs[2], iccs[3]) };
  }
  function iccsToIdx(iccs) {
    var s = iccsToSquares(iccs); if (!s) return null;
    return { from: s.from[1] * 9 + s.from[0], to: s.to[1] * 9 + s.to[0] };
  }

  var M = 26, CW = 52, CH = 52;
  var BW = M * 2 + CW * 8, BH = M * 2 + CH * 9;

  function pieceSvg(p, cx, cy) {
    var col = p.red ? 'var(--xq-red,#c0392b)' : 'var(--xq-black,#24333f)';
    var s = '';
    if (p.up) {
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="' + col + '"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="16.5" fill="none" stroke="var(--xq-disc,#f6ecd6)" stroke-width="1.5" opacity=".85"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="9" fill="none" stroke="var(--xq-disc,#f6ecd6)" stroke-width="1.5" opacity=".6"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="2.6" fill="var(--xq-disc,#f6ecd6)" opacity=".9"/>';
    } else if (PREF.style === '3d') {
      // Quân nổi: bóng đổ, mặt có độ cong (gradient), viền khắc đôi.
      s += '<ellipse cx="' + (cx + 1.5) + '" cy="' + (cy + 4) + '" rx="21.5" ry="20.5" fill="rgba(30,16,0,.42)"/>';    // bóng đổ
      s += '<circle cx="' + cx + '" cy="' + (cy + 2) + '" r="21" fill="var(--xq-line,#7c5a2c)" opacity=".55"/>';       // thành quân (độ dày)
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="var(--xq-disc,#f6ecd6)"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="url(#xqShade)"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="20.3" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.2"/>';  // gờ sáng
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="17.4" fill="none" stroke="' + col + '" stroke-width="1.5" opacity=".75"/>';
    } else {
      s += '<circle cx="' + cx + '" cy="' + (cy + 1.5) + '" r="21" fill="rgba(60,35,5,.22)"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="21" fill="var(--xq-disc,#f6ecd6)" stroke="' + col + '" stroke-width="2"/>';
      s += '<circle cx="' + cx + '" cy="' + cy + '" r="17" fill="none" stroke="' + col + '" stroke-width="1" opacity=".35"/>';
    }
    if (!p.up) {
      if (PREF.set === 'vi') {
        var lb = VI[p.t] || p.c, fs = lb.length >= 5 ? 11 : lb.length >= 4 ? 12.5 : lb.length >= 3 ? 14 : 16.5;
        s += '<text x="' + cx + '" y="' + (cy + fs * 0.36) + '" text-anchor="middle" font-size="' + fs + '" font-weight="800" font-family="\'Be Vietnam Pro\',system-ui,sans-serif" fill="' + col + '">' + lb + '</text>';
      } else {
        s += '<text x="' + cx + '" y="' + (cy + 8) + '" text-anchor="middle" font-size="24" font-family="' + PIECE_FONT + '" fill="' + col + '">' + p.c + '</text>';
      }
    }
    return s;
  }

  // arrows: [{from,to,color,label}] (ô 0..89) · selected: ô đang chọn · flip: nhìn từ phía Đen.
  // opts: { dots:[ô], check: ô tướng bị chiếu, hint: ô gợi ý, hide: ô ẩn quân (đang kéo) }
  function renderBoard(fen, lastMove, arrows, selected, flip, opts) {
    opts = opts || {};
    function fx(f) { return flip ? 8 - f : f; }
    function ry(r) { return flip ? 9 - r : r; }
    function X(f) { return M + fx(f) * CW; }
    function Y(r) { return M + ry(r) * CH; }
    var board = fenToBoard(fen);
    // Số cột (ký hiệu Việt "Pháo 2 bình 5"): mỗi bên đếm 1→9 từ PHẢI sang TRÁI theo hướng nhìn của mình →
    // hàng số phía trên luôn 1..9, phía dưới luôn 9..1 (trái → phải), màu theo bên ngồi ở đó. Ảnh thu nhỏ không hiện.
    var coords = opts.coords === true || (PREF.coords && !opts.thumb && opts.coords !== false);
    var PAD = coords ? 15 : 0;
    var s = '<svg viewBox="0 ' + (-PAD) + ' ' + BW + ' ' + (BH + 2 * PAD) + '" width="100%" preserveAspectRatio="xMidYMid meet" style="width:100%;max-width:100%;height:auto;display:block" role="img" aria-label="Bàn cờ tướng">';
    if (PREF.style === '3d') s += '<defs><radialGradient id="xqShade" cx="38%" cy="30%" r="78%"><stop offset="0" stop-color="#fff" stop-opacity=".75"/><stop offset=".45" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#3a2408" stop-opacity=".38"/></radialGradient></defs>';
    s += '<rect x="0" y="' + (-PAD) + '" width="' + BW + '" height="' + (BH + 2 * PAD) + '" rx="10" fill="var(--xq-wood,#e9cf9c)"/>';
    if (coords) {
      var topCol = flip ? 'var(--xq-red,#c0392b)' : 'var(--xq-black,#24333f)', botCol = flip ? 'var(--xq-black,#24333f)' : 'var(--xq-red,#c0392b)';
      for (var cf = 0; cf < 9; cf++) {
        var cxx = M + cf * CW;
        s += '<text x="' + cxx + '" y="-2" text-anchor="middle" font-size="12.5" font-weight="700" font-family="system-ui,sans-serif" fill="' + topCol + '" opacity=".8">' + (cf + 1) + '</text>';
        s += '<text x="' + cxx + '" y="' + (BH + 11) + '" text-anchor="middle" font-size="12.5" font-weight="700" font-family="system-ui,sans-serif" fill="' + botCol + '" opacity=".8">' + (9 - cf) + '</text>';
      }
    }
    for (var r = 0; r < 10; r++) s += line(X(0), Y(r), X(8), Y(r));
    for (var f = 0; f < 9; f++) {
      if (f === 0 || f === 8) s += line(X(f), Y(0), X(f), Y(9));
      else { s += line(X(f), Y(0), X(f), Y(4)); s += line(X(f), Y(5), X(f), Y(9)); }
    }
    s += line(X(3), Y(0), X(5), Y(2)) + line(X(5), Y(0), X(3), Y(2));
    s += line(X(3), Y(7), X(5), Y(9)) + line(X(5), Y(7), X(3), Y(9));
    var midY = (M + 4 * CH + M + 5 * CH) / 2 + 6;
    s += '<text x="' + (M + 2 * CW) + '" y="' + midY + '" font-size="20" fill="var(--xq-line,#7c5a2c)" opacity=".5" font-family="' + PIECE_FONT + '" letter-spacing="6" text-anchor="middle">' + (flip ? '漢界' : '楚河') + '</text>';
    s += '<text x="' + (M + 6 * CW) + '" y="' + midY + '" font-size="20" fill="var(--xq-line,#7c5a2c)" opacity=".5" font-family="' + PIECE_FONT + '" letter-spacing="6" text-anchor="middle">' + (flip ? '楚河' : '漢界') + '</text>';
    var spinAt = null;
    if (lastMove) {
      [lastMove.from, lastMove.to].forEach(function (sq) {
        if (sq) s += '<circle cx="' + X(sq[0]) + '" cy="' + Y(sq[1]) + '" r="22" fill="var(--xq-hl,rgba(200,69,31,.30))"/>';
      });
      // Cài đặt "Đánh dấu nước vừa đi": pulse (loé 1 lần) · spin (vòng nét đứt xoay quanh quân vừa đi) · none.
      if (lastMove.to && PREF.lastFx === 'pulse') s += '<circle class="xq-pulse" cx="' + X(lastMove.to[0]) + '" cy="' + Y(lastMove.to[1]) + '" r="22" fill="none" stroke="var(--xq-red,#c0392b)" stroke-width="2.5" opacity="0"/>';
      if (lastMove.to && PREF.lastFx === 'spin') spinAt = lastMove.to;
      // Mũi tên mờ từ ô cũ tới ô mới (vẽ DƯỚI quân để không che chữ).
      if (PREF.lastArrow && lastMove.from && lastMove.to && !opts.thumb) {
        var lx1 = X(lastMove.from[0]), ly1 = Y(lastMove.from[1]), lx2 = X(lastMove.to[0]), ly2 = Y(lastMove.to[1]);
        var ldx = lx2 - lx1, ldy = ly2 - ly1, ll = Math.sqrt(ldx * ldx + ldy * ldy) || 1, lux = ldx / ll, luy = ldy / ll;
        var lex = lx2 - lux * 22, ley = ly2 - luy * 22, lbx = lex - lux * 13, lby = ley - luy * 13;
        s += '<g opacity=".55"><line x1="' + (lx1 + lux * 8) + '" y1="' + (ly1 + luy * 8) + '" x2="' + lbx + '" y2="' + lby + '" stroke="var(--xq-last-arrow,#c8451f)" stroke-width="6" stroke-linecap="round"/>'
          + '<polygon points="' + lex + ',' + ley + ' ' + (lbx - luy * 9) + ',' + (lby + lux * 9) + ' ' + (lbx + luy * 9) + ',' + (lby - lux * 9) + '" fill="var(--xq-last-arrow,#c8451f)"/></g>';
      }
    }
    if (typeof opts.check === 'number' && opts.check >= 0) {
      s += '<circle cx="' + X(opts.check % 9) + '" cy="' + Y((opts.check / 9) | 0) + '" r="25" fill="rgba(220,38,38,.28)" stroke="#dc2626" stroke-width="2"/>';
    }
    for (var i = 0; i < 90; i++) {
      var chr = board[i]; if (!chr || i === opts.hide) continue;
      var p = PIECES[chr]; if (!p) continue;
      var ff = i % 9, rr = Math.floor(i / 9);
      var cx = X(ff), cy = Y(rr);
      var moved = lastMove && lastMove.to && lastMove.to[0] === ff && lastMove.to[1] === rr;
      var dx = 0, dy = 0;
      if (moved && lastMove.from) { dx = X(lastMove.from[0]) - cx; dy = Y(lastMove.from[1]) - cy; }
      s += '<g class="xq-pc' + (moved ? ' xq-pc-moved' : '') + '"' + (moved ? ' style="--fx:' + dx + 'px;--fy:' + dy + 'px"' : '') + '>' + pieceSvg(p, cx, cy) + '</g>';
    }
    if (spinAt && !opts.thumb) {
      s += '<circle class="xq-spin" cx="' + X(spinAt[0]) + '" cy="' + Y(spinAt[1]) + '" r="24.5" fill="none" stroke="var(--xq-red,#c0392b)" stroke-width="3" stroke-dasharray="7 5" stroke-linecap="round"/>';
    }
    if (typeof selected === 'number' && selected >= 0) {
      s += '<circle cx="' + X(selected % 9) + '" cy="' + Y((selected / 9) | 0) + '" r="23.5" fill="none" stroke="var(--xq-select,#2563eb)" stroke-width="3"/>';
    }
    if (typeof opts.hint === 'number' && opts.hint >= 0) {
      s += '<circle cx="' + X(opts.hint % 9) + '" cy="' + Y((opts.hint / 9) | 0) + '" r="24" fill="none" stroke="#d99a1e" stroke-width="3.5" stroke-dasharray="6 4"/>';
    }
    (opts.dots || []).forEach(function (d) {
      var occupied = !!board[d];
      s += occupied
        ? '<circle cx="' + X(d % 9) + '" cy="' + Y((d / 9) | 0) + '" r="23" fill="none" stroke="var(--xq-dot,rgba(47,107,94,.55))" stroke-width="4"/>'
        : '<circle cx="' + X(d % 9) + '" cy="' + Y((d / 9) | 0) + '" r="8" fill="var(--xq-dot,rgba(47,107,94,.55))"/>';
    });
    if (arrows && arrows.length) {
      arrows.forEach(function (a, k) {
        var fxp = X(a.from % 9), fyp = Y((a.from / 9) | 0), tx = X(a.to % 9), ty = Y((a.to / 9) | 0);
        var ddx = tx - fxp, ddy = ty - fyp, len = Math.sqrt(ddx * ddx + ddy * ddy) || 1, ux = ddx / len, uy = ddy / len;
        var sx = fxp + ux * 20, sy = fyp + uy * 20, ex = tx - ux * 20, ey = ty - uy * 20;
        var px = -uy, py = ux;
        s += '<line x1="' + sx + '" y1="' + sy + '" x2="' + ex + '" y2="' + ey + '" stroke="' + a.color + '" stroke-width="5" stroke-linecap="round" opacity=".92"/>';
        var ah = 14, aw = 8.5, bx = ex - ux * ah, by = ey - uy * ah;
        s += '<polygon points="' + ex + ',' + ey + ' ' + (bx + px * aw) + ',' + (by + py * aw) + ' ' + (bx - px * aw) + ',' + (by - py * aw) + '" fill="' + a.color + '"/>';
        if (a.label) {
          var lx = fxp + px * 16, ly = fyp + py * 16;
          s += '<circle cx="' + lx + '" cy="' + ly + '" r="11.5" fill="' + a.color + '" stroke="#fff" stroke-width="1.5"/>';
          s += '<text x="' + lx + '" y="' + (ly + 5) + '" text-anchor="middle" font-size="14" font-weight="800" fill="#fff" font-family="system-ui,sans-serif">' + a.label + '</text>';
          s += '<line class="xq-brhit" data-br="' + k + '" x1="' + sx + '" y1="' + sy + '" x2="' + ex + '" y2="' + ey + '" stroke="transparent" stroke-width="26" style="cursor:pointer"/>';
        }
      });
    }
    s += '</svg>';
    return s;
  }
  function line(x1, y1, x2, y2) {
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" stroke="var(--xq-line,#7c5a2c)" stroke-width="1.4"/>';
  }

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
      pulse.animate([{ opacity: .55, transform: 'scale(.72)' }, { opacity: 0, transform: 'scale(1.15)' }],
        { duration: 620, easing: 'ease-out', transformOrigin: 'center' });
    }
  }

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
      if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy) * 1.5) (dx < 0 ? onNext : onPrev)();
    }, { passive: true });
  }

  function attachControls(root, api) {
    var flipBtn = root.querySelector('[data-xq-flip]');
    if (flipBtn) flipBtn.addEventListener('click', function () { api.toggleFlip(); });
    var autoBtn = root.querySelector('[data-xq-autoplay]');
    if (autoBtn) {
      var timer = null;
      var label = function (on) { setBtn(autoBtn, on ? 'pause' : 'play', on ? 'Dừng' : 'Tự chạy'); };
      var stop = function () { if (timer) { clearInterval(timer); timer = null; autoBtn.classList.remove('is-on'); label(false); } };
      var start = function () {
        api.first(); autoBtn.classList.add('is-on'); label(true);
        timer = setInterval(function () { if (!api.next()) stop(); }, 1400);
      };
      label(false);
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
      setBtn(fsBtn, on ? 'x' : 'expand');
      fsBtn.setAttribute('aria-label', on ? 'Thoát phóng to' : 'Phóng to toàn màn hình');
    }
    setBtn(fsBtn, 'expand');
    fsBtn.addEventListener('click', function () { setFs(!boardCard.classList.contains('xq-fs')); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && boardCard.classList.contains('xq-fs')) setFs(false); });
  }

  function emit(root, name, detail) {
    (root || document).dispatchEvent(new CustomEvent(name, { detail: detail || {}, bubbles: true }));
  }

  function initBoard(root) {
    if (root.__xqInit) return;
    root.__xqInit = true;
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
    attachSound(root);
    attachMenu(root);
    root.querySelectorAll('[data-xq-icon]').forEach(function (b) { setBtn(b, b.getAttribute('data-xq-icon'), b.getAttribute('data-xq-label') || ''); });

    if (cfg.mode === 'puzzle' && cfg.puzzleSide && steps.length && !window.XiangqiRules) {
      holder.innerHTML = renderBoard(startFen, null);
      return;
    }
    if (cfg.mode === 'guess' && steps.length > 1) {
      // ĐOÁN NƯỚC: người học cầm 1 bên, tự đi trước khi xem nước trong bài; sai thì máy chỉ đáp án rồi đi tiếp.
      var gdom = { holder: holder, capStep: capStep, capText: capText, pill: pill, capBox: root.querySelector('.caption-box') };
      var cfgFor = function (side) {
        var k = 0; while (k < steps.length && steps[k].side !== side) k++;
        if (k >= steps.length) k = 0;
        var rest = steps.slice(k);
        return {
          fen: k === 0 ? startFen : steps[k - 1].fen, side: side, guess: true, failOnWrong: false,
          solution: rest.map(function (x) { return x.iccs; }),
          notes: rest.map(function (x) { return x.wxf || ''; }),
          captions: rest.map(function (x) { return x.caption || ''; })
        };
      };
      var gside = 'do';
      try { gside = localStorage.getItem('guess_side') || steps[0].side || 'do'; } catch (e) {}
      if (!steps.some(function (x) { return x.side === gside; })) gside = steps[0].side || 'do';
      var gEngine = createPuzzle(root, gdom, cfgFor(gside));
      var markSide = function () { root.querySelectorAll('[data-xq-guess-side]').forEach(function (b) { b.classList.toggle('is-on', b.getAttribute('data-xq-guess-side') === gside); }); };
      root.querySelectorAll('[data-xq-guess-side]').forEach(function (b) {
        b.addEventListener('click', function () {
          gside = b.getAttribute('data-xq-guess-side');
          try { localStorage.setItem('guess_side', gside); } catch (e) {}
          markSide(); gEngine.load(cfgFor(gside));
        });
      });
      markSide();
      attachCopyFen(root, gEngine.fen);
      bind(root, 'reset', function () { gEngine.load(cfgFor(gside)); });
      bind(root, 'hint', gEngine.hint);
      root.__xqPuzzle = gEngine;
      return;
    }
    if (cfg.mode === 'puzzle' && cfg.puzzleSide && steps.length) {
      var dom = { holder: holder, capStep: capStep, capText: capText, pill: pill, capBox: root.querySelector('.caption-box') };
      var engine = createPuzzle(root, dom, {
        fen: startFen,
        solution: steps.map(function (s) { return s.iccs; }),
        side: cfg.puzzleSide,
        failOnWrong: false
      });
      attachSaveFen(root, engine.fen);
      attachCopyFen(root, engine.fen);
      bind(root, 'reset', engine.reset);
      bind(root, 'solution', engine.reveal);
      bind(root, 'hint', engine.hint);
      root.__xqPuzzle = engine;
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
    var getCurFen = function () { return idx < 0 ? startFen : steps[idx].fen; };
    attachCopyFen(root, getCurFen);
    attachSaveFen(root, getCurFen);

    function draw() {
      var cur = idx < 0 ? { fen: startFen } : steps[idx];
      var lm = idx < 0 ? null : iccsToSquares(cur.iccs);
      holder.innerHTML = renderBoard(cur.fen, lm, null, null, flip);
      playAnim(holder);
      if (idx < 0) {
        if (capStep) capStep.textContent = 'Thế cờ mở đầu';
        if (capText) capText.textContent = steps.length ? 'Bấm “Tiến”, dùng phím ←/→ hoặc vuốt trên bàn cờ.' : 'Bài học này chưa có nước đi minh hoạ.';
        if (pill) pill.textContent = 'Thế mở · ' + steps.length + ' nước';
      } else {
        var sideLabel = cur.side === 'den' ? 'Đen' : (cur.side === 'do' ? 'Đỏ' : '');
        var mv = cur.wxf ? (' · ' + cur.wxf) : '';
        if (capStep) capStep.textContent = 'Nước ' + (idx + 1) + (sideLabel ? ' — ' + sideLabel : '') + mv;
        if (capText) capText.textContent = cur.caption || (cur.wxf ? ('Nước đi: ' + cur.wxf + '.') : '(chưa có lời giảng cho nước này)');
        if (pill) pill.textContent = 'Nước ' + (idx + 1) + '/' + steps.length;
      }
      setDisabled('first', idx < 0); setDisabled('prev', idx < 0);
      setDisabled('next', idx >= steps.length - 1); setDisabled('last', idx >= steps.length - 1);
      root.style.setProperty('--xq-progress', steps.length ? ((idx + 1) / steps.length * 100) + '%' : '0%');
      var bar = root.querySelector('[data-xq-progress]');
      if (bar) bar.style.width = steps.length ? ((idx + 1) / steps.length * 100) + '%' : '0%';
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
      var beforeFen = idx < 0 ? startFen : steps[idx].fen, forward = clamped > idx;
      idx = clamped;
      draw();
      if (idx >= 0) moveFx(beforeFen, steps[idx].fen, forward ? steps[idx].wxf : null);   // chỉ đọc khi đi tiến
      if (userAction) emit(root, 'xq:userstep');
      if (steps.length > 0 && idx === steps.length - 1) emit(root, 'xq:viewed-all-moves');
      return true;
    }

    if (list) {
      var fullMode = list.classList.contains('move-list--full');
      list.innerHTML = ''; // xoá danh sách render sẵn server-side (SEO) trước khi JS dựng lại có gắn sự kiện
      steps.forEach(function (st, i) {
        var row = document.createElement('button');
        row.type = 'button';
        row.className = 'move-row';
        var sideLabel = st.side === 'den' ? 'Đen' : (st.side === 'do' ? 'Đỏ' : '');
        var dot = st.side === 'den' ? '<span class="side-dot den"></span>' : '<span class="side-dot do"></span>';
        var label = st.wxf ? escapeHtml(st.wxf) : sideLabel;
        var cap = (st.caption && st.caption.trim() !== (st.wxf || '').trim()) ? st.caption : '';
        if (!fullMode && cap.length > 40) cap = cap.slice(0, 40) + '…';
        row.innerHTML = '<span class="num">' + (i + 1) + '.</span><span class="mv">' + dot + '<span class="mv-label">' + label + '</span>' +
          (cap ? '<span class="cap-inline">' + escapeHtml(cap) + '</span>' : '') + '</span>';
        row.title = sideLabel + (st.wxf ? ' — ' + st.wxf : '');
        row.addEventListener('click', function () { go(i, true); });
        list.appendChild(row);
      });
    }
    bind(root, 'first', function () { go(-1, true); });
    bind(root, 'prev', function () { go(idx - 1, true); });
    bind(root, 'next', function () { go(idx + 1, true); });
    bind(root, 'last', function () { go(steps.length - 1, true); });

    attachSwipe(holder, function () { go(idx - 1, true); }, function () { go(idx + 1, true); });
    attachControls(root, {
      toggleFlip: function () { flip = !flip; draw(); },
      first: function () { go(-1); },
      next: function () { return go(idx + 1); }
    });

    root.addEventListener('keydown', function (e) {
      if (e.target.closest && e.target.closest('input,textarea')) return;
      if (e.key === 'ArrowRight') { go(idx + 1, true); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { go(idx - 1, true); e.preventDefault(); }
      if (e.key === 'Home') { go(-1, true); e.preventDefault(); }
      if (e.key === 'End') { go(steps.length - 1, true); e.preventDefault(); }
    });
    draw();
  }

  function bind(root, name, fn) { var b = root.querySelector('[data-xq-' + name + ']'); if (b) b.addEventListener('click', fn); }

  var BRANCH_COLORS = ['#16a34a', '#e0632f', '#2563eb', '#7c3aed', '#c026d3', '#0891b2'];

  // Điều hướng bài học có CÂY BIẾN: tại điểm rẽ, mỗi biến là 1 mũi tên (A/B…) trên bàn cờ.
  function initTree(root, startFen, tree, dom) {
    var rootNode = { fen: startFen, children: tree, parent: null, depth: 0, iccs: null, wxf: null, side: null, caption: null };
    (function link(node) {
      (node.children || []).forEach(function (c) { c.parent = node; c.depth = node.depth + 1; c.children = c.children || []; link(c); });
    })(rootNode);
    var cur = rootNode, flat = [], flip = false;
    var getCurFen = function () { return cur.fen; };
    attachCopyFen(root, getCurFen);
    attachSaveFen(root, getCurFen);

    function setDisabled(name, v) { var b = root.querySelector('[data-xq-' + name + ']'); if (b) b.disabled = v; }
    function notifyEnd() { if (!cur.children || !cur.children.length) emit(root, 'xq:viewed-all-moves'); }

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

    function descend(node) {
      if (!node) return;
      var beforeFen = cur.fen;
      cur = node;
      draw();
      moveFx(beforeFen, cur.fen, cur.wxf);
      notifyEnd();
    }
    function back() {
      if (!cur.parent) return;
      var beforeFen = cur.fen;
      cur = cur.parent;
      draw();
      Sound.move(countPieces(beforeFen) !== countPieces(cur.fen));
    }
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
        var cap = (m.caption && m.caption.trim() !== (m.wxf || '').trim()) ? '<span class="cap-inline">' + escapeHtml(m.caption) + '</span>' : '';
        h += '<button type="button" class="move-row" data-k="' + k + '" style="padding-left:' + (16 + row.indent * 14) + 'px">'
          + '<span class="num">' + m.depth + (row.letter || '') + '.</span>'
          + '<span class="mv">' + dot + '<span class="mv-label">' + (m.wxf ? escapeHtml(m.wxf) : sideLabel) + '</span>' + cap + '</span></button>';
      });
      dom.list.innerHTML = h;
      dom.list.querySelectorAll('[data-k]').forEach(function (el) {
        el.addEventListener('click', function () { cur = flat[+el.getAttribute('data-k')].node; draw(); notifyEnd(); emit(root, 'xq:userstep'); });
      });
    }
    function highlightList() {
      if (!dom.list) return;
      Array.prototype.forEach.call(dom.list.children, function (el) {
        var fentry = flat[+el.getAttribute('data-k')];
        el.classList.toggle('active', !!fentry && fentry.node === cur);
      });
    }

    [['first', toStart], ['prev', back], ['next', next], ['last', toEnd]].forEach(function (p) {
      var b = root.querySelector('[data-xq-' + p[0] + ']');
      if (b) b.addEventListener('click', function () { p[1](); emit(root, 'xq:userstep'); });
    });
    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { next(); emit(root, 'xq:userstep'); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { back(); emit(root, 'xq:userstep'); e.preventDefault(); }
    });
    attachSwipe(dom.holder, function () { back(); }, function () { next(); });
    attachControls(root, {
      toggleFlip: function () { flip = !flip; draw(); },
      first: function () { toStart(); },
      next: function () { return next(); }
    });
    buildList();
    draw();
  }

  /* ======================================================================
     Bộ máy GIẢI ĐỐ dùng chung (bài học "Thử tự giải" + khu Luyện tập).
     cfg: { fen, solution:[iccs…] (bắt đầu bằng nước bên giải), side:'do'|'den',
            failOnWrong:boolean, onMove(info), onSolved(info), onFail(info) }
     ====================================================================== */
  function createPuzzle(root, dom, cfg) {
    var Rules = window.XiangqiRules;
    var state;
    var flip = cfg.side === 'den';
    var reply = null;

    function initState(c) {
      cfg = Object.assign(cfg, c || {});
      flip = cfg.side === 'den';
      state = {
        board: Rules.loadFen(cfg.fen), ply: 0, selected: -1, dots: [], solved: false, failed: false, locked: false,
        moves: [], mistakes: 0, revealed: false, hint: -1, t0: Date.now(), last: null, arrows: null, hits: 0, guesses: 0,
        // Đường thắng KHÁC đáp án (đã được bộ giải chứng minh): dyn = true, đối phương đỡ theo máy, left = số nước còn lại.
        line: [], dyn: false, left: 0, next: null, mateGoal: endsInMate()
      };
    }

    // Lời giải kết thúc bằng chiếu hết → mới chấp nhận đường thắng khác (thế tàn cuộc "thắng thế" thì vẫn theo đáp án).
    function endsInMate() {
      var b = Rules.loadFen(cfg.fen);
      for (var i = 0; i < cfg.solution.length; i++) {
        var m = iccsToIdx(cfg.solution[i]); if (!m) return false;
        b[m.to] = b[m.from]; b[m.from] = null;
      }
      var defRed = cfg.solution.length % 2 === 1 ? !solverRed() : solverRed();
      for (var f = 0; f < 90; f++) {
        var p = b[f]; if (!p || Rules.isRed(p) !== defRed) continue;
        for (var t = 0; t < 90; t++) if (Rules.legalNoSelfCheck(b, f, t)) return false;
      }
      return true;
    }

    function solverRed() { return cfg.side === 'do'; }
    // Các nước SAU của bên giải trong lời giải (đi trước = đổi thứ tự nước — có thể tương đương).
    function laterMoves() { var out = []; for (var i = state.ply + 2; i < cfg.solution.length; i += 2) out.push(cfg.solution[i]); return out; }
    function expected() { return state.dyn ? state.next : (cfg.solution[state.ply] || null); }
    function remaining() { return state.dyn ? state.left : Math.ceil((cfg.solution.length - state.ply) / 2); }
    function isSolverTurn() { return !state.solved && !state.failed && !state.locked && (state.dyn || state.ply < cfg.solution.length) && state.ply % 2 === 0; }
    function fen() { return Rules.toFen(state.board); }

    function setCaption(step, text, kind) {
      if (dom.capStep) dom.capStep.textContent = step;
      if (dom.capText) dom.capText.textContent = text;
      if (dom.capBox) { dom.capBox.classList.toggle('is-ok', kind === 'ok'); dom.capBox.classList.toggle('is-err', kind === 'err'); }
    }

    function draw(opts) {
      opts = opts || {};
      var lm = state.last ? iccsToSquares(state.last) : null;
      var toMoveRed = state.ply % 2 === 0 ? solverRed() : !solverRed();
      var check = Rules.inCheck(state.board, toMoveRed) ? Rules.findKing(state.board, toMoveRed) : -1;
      dom.holder.innerHTML = renderBoard(fen(), lm, state.arrows, state.selected, flip, { dots: state.dots, check: check, hint: state.hint, hide: opts.hide });
      if (!opts.noAnim) playAnim(dom.holder);
      dom.holder.classList.toggle('is-interactive', isSolverTurn());
      var done = Math.ceil(state.ply / 2), total = state.dyn ? done + state.left : Math.ceil(cfg.solution.length / 2);
      if (dom.pill && cfg.guess) guessPill();
      else if (dom.pill) dom.pill.textContent = state.solved ? 'Đã giải xong!' : ('Nước ' + Math.min(done + 1, total) + '/' + total + ' · ' + (solverRed() ? 'Đỏ' : 'Đen') + ' đi');
    }

    function legalTargets(from) {
      var out = [];
      for (var to = 0; to < 90; to++) if (Rules.legalNoSelfCheck(state.board, from, to)) out.push(to);
      return out;
    }

    function select(sq) {
      state.selected = sq;
      state.dots = sq >= 0 ? legalTargets(sq) : [];
      draw({ noAnim: true });
    }

    function applyIccs(iccs) {
      var m = iccsToIdx(iccs); if (!m) return false;
      var captured = !!state.board[m.to];
      state.board[m.to] = state.board[m.from]; state.board[m.from] = null;
      state.last = iccs; state.ply++; state.line.push(iccs);
      Sound.move(captured);
      try { var cr = state.ply % 2 === 0 ? solverRed() : !solverRed(); if (Rules.inCheck(state.board, cr)) Sound.check(); } catch (e) {}
      return true;
    }

    function hasAnyMove(red) {
      for (var f = 0; f < 90; f++) {
        var p = state.board[f]; if (!p || Rules.isRed(p) !== red) continue;
        for (var t = 0; t < 90; t++) if (Rules.legalNoSelfCheck(state.board, f, t)) return true;
      }
      return false;
    }

    // ---- Chế độ ĐOÁN NƯỚC ----
    function sideName(red) { return red ? 'Đỏ' : 'Đen'; }
    function guessPill() { if (dom.pill) dom.pill.textContent = 'Đoán đúng ' + state.hits + '/' + state.guesses; }
    function guessAttempt(from, to) {
      if (!isSolverTurn()) return;
      var got = Rules.toIccs(from) + Rules.toIccs(to), exp = expected(), k = state.ply;
      state.selected = -1; state.dots = []; state.hint = -1;
      if (!Rules.legalNoSelfCheck(state.board, from, to)) { draw({ noAnim: true }); return; }
      var ok = got === exp;
      var checker = cfg.checkMove || window.XiangqiPuzzleCheck;
      if (!ok && checker && !state.checking) {
        // Khác bài → hỏi máy nước này có TƯƠNG ĐƯƠNG không (khoá bàn trong lúc chờ).
        var mine = state;
        state.locked = true; state.checking = true;
        setCaption('Đang so với nước trong bài…', '', null);
        draw({ noAnim: true });
        Promise.resolve(checker({ fen: fen(), red: solverRed(), move: got, expected: exp, n: 1, mateGoal: false, later: laterMoves() })).then(function (r) {
          if (state !== mine) return;
          state.locked = false; state.checking = false;
          if (r && r.status === 'equiv') { state.guesses++; state.hits++; emit(root, 'xq:puzzle-move', { ok: true, ply: k, move: got, expected: exp, guess: true, equiv: true }); guessStep(exp, 'equiv'); return; }
          state.guesses++; emit(root, 'xq:puzzle-move', { ok: false, ply: k, move: got, expected: exp, guess: true });
          guessMiss(got, exp, k);
        }, function () { if (state !== mine) return; state.locked = false; state.checking = false; state.guesses++; guessMiss(got, exp, k); });
        return;
      }
      state.guesses++;
      if (ok) state.hits++;
      emit(root, 'xq:puzzle-move', { ok: ok, ply: k, move: got, expected: exp, guess: true });
      if (ok) { guessStep(exp, true); return; }
      guessMiss(got, exp, k);
    }
    function guessMiss(got, exp, k) {
      state.mistakes++;
      Sound.bad();
      if (dom.holder.animate && !REDUCE) dom.holder.classList.remove('xq-shake'), void dom.holder.offsetWidth, dom.holder.classList.add('xq-shake');
      var em = iccsToIdx(exp);
      state.arrows = em ? [{ from: em.from, to: em.to, color: '#2f6b5e' }] : null;
      state.locked = true;
      setCaption('Chưa trùng — trong bài: ' + (cfg.notes[k] || exp), 'Mũi tên xanh là nước trong bài. Xem lời giảng để hiểu vì sao…', 'err');
      draw({ noAnim: true });
      guessPill();
      reply = setTimeout(function () { state.arrows = null; state.locked = false; guessStep(exp, false); }, 1500);
    }
    function guessStep(mv, ok) {
      var k = state.ply;
      applyIccs(mv);
      state.moves.push(mv);
      guessPill();
      var cap = cfg.captions[k] || '';
      setCaption((ok === 'equiv' ? 'Tương đương ✓ — bài đi ' : ok ? 'Đúng! ' : '') + sideName(solverRed()) + ': ' + (cfg.notes[k] || mv),
        cap || (ok === 'equiv' ? 'Nước của bạn cùng mục đích với nước trong bài.' : ok ? 'Chính xác như trong bài.' : ''), ok ? 'ok' : null);
      if (state.ply >= cfg.solution.length) { draw(); guessDone(); return; }
      draw();
      state.locked = true;
      reply = setTimeout(function () {
        var r = state.ply;
        applyIccs(cfg.solution[r]);
        var rc = cfg.captions[r] || '';
        // Lời giảng nước của mình + nước đáp của đối phương (nếu có) — đọc nối tiếp.
        setCaption(sideName(!solverRed()) + ' đáp: ' + (cfg.notes[r] || cfg.solution[r]), [cap, rc].filter(Boolean).join(' — '), null);
        state.locked = false;
        if (state.ply >= cfg.solution.length) { draw(); guessDone(); return; }
        draw();
        guessPill();
      }, ok ? 650 : 400);
    }
    function guessDone() {
      state.solved = true;
      var pct = state.guesses ? Math.round(100 * state.hits / state.guesses) : 0;
      Sound.end(pct >= 70 ? 'win' : 'draw');
      setCaption('Hết bài — bạn đoán đúng ' + state.hits + '/' + state.guesses + ' nước (' + pct + '%)',
        pct >= 80 ? 'Xuất sắc! Bạn đã nắm rất chắc ván này.' : pct >= 50 ? 'Khá tốt — bấm “Làm lại” để đoán lại, hoặc thử cầm bên còn lại.' : 'Xem lại lời giảng rồi đoán lại nhé — đoán lại vài lần là nhớ ván rất lâu.', 'ok');
      guessPill();
      emit(root, 'xq:guess-done', { hits: state.hits, total: state.guesses, side: cfg.side });
      emit(root, 'xq:viewed-all-moves');
    }

    function finishSolved() {
      state.solved = true;
      Sound.good();
      var info = { moves: state.moves.slice(), ms: Date.now() - state.t0, mistakes: state.mistakes, revealed: state.revealed };
      if (state.dyn) info.line = state.line.slice();   // đường thắng riêng → server thẩm định cả diễn biến
      setCaption(state.revealed ? 'Đã xem lời giải' : 'Chính xác!', state.revealed ? 'Thử lại thế này sau để ghi nhớ nhé.' : state.dyn ? 'Bạn đã chiếu hết theo một đường khác lời giải trong sách — rất hay!' : (state.mistakes ? 'Bạn đã giải xong (có ' + state.mistakes + ' lần đi sai).' : 'Xuất sắc — bạn đã giải đúng ngay từ đầu.'), 'ok');
      draw({ noAnim: true });
      emit(root, 'xq:puzzle-solved', info);
      if (cfg.onSolved) cfg.onSolved(info);
    }

    function attempt(from, to) {
      if (cfg.guess) return guessAttempt(from, to);
      if (!isSolverTurn()) return;
      var got = Rules.toIccs(from) + Rules.toIccs(to);
      var exp = expected();
      state.selected = -1; state.dots = []; state.hint = -1;
      if (!Rules.legalNoSelfCheck(state.board, from, to)) { draw({ noAnim: true }); return; }

      var isFinal = !state.dyn && state.ply === cfg.solution.length - 1;
      var ok = !state.dyn && got === exp;
      var mates = false;
      if (got !== exp || state.dyn) {
        // Nước khác đáp án nhưng chiếu hết ngay → tính đúng (mọi lúc, không chỉ nước cuối).
        var snap = state.board.slice();
        state.board[to] = state.board[from]; state.board[from] = null;
        mates = !hasAnyMove(!solverRed());
        state.board = snap;
        if (mates) ok = true;
      }
      // Khác đáp án / đang đi đường riêng → nhờ bộ giải chiếu hết kiểm chứng (bất đồng bộ, khoá bàn trong lúc chờ).
      var checker = cfg.checkMove || window.XiangqiPuzzleCheck;
      // Thế chiếu hết: kiểm đường thắng khác (không áp nước cuối — nước cuối phải chiếu hết, đã xét ở trên).
      // Thế khác (tàn cuộc thắng thế…): chỉ kiểm nước TƯƠNG ĐƯƠNG nước trong bài.
      if (!mates && (state.dyn || got !== exp) && checker && (state.mateGoal ? !isFinal : !state.dyn)) {
        var before = fen(), mine = state;
        state.locked = true;
        if (!state.dyn) setCaption('Đang kiểm tra…', 'Nước này khác lời giải trong sách — máy đang kiểm chứng xem có tương đương / còn thắng không.', null);
        draw({ noAnim: true });
        emit(root, 'xq:puzzle-checking', { move: got, expected: exp });
        Promise.resolve(checker({ fen: before, red: solverRed(), move: got, expected: exp, n: remaining(), mateGoal: state.mateGoal, later: laterMoves() })).then(function (r) {
          if (state !== mine || state.solved) return;   // đã bị đặt lại / chuyển thế trong lúc chờ
          state.locked = false;
          emit(root, 'xq:puzzle-checked', { status: r ? r.status : null });
          if (r && r.status === 'win') return acceptLine(got, exp, r);
          if (r && r.status === 'equiv' && !state.dyn) return acceptEquiv(got, exp);
          if (r && r.status === 'slow') {
            setCaption('Vẫn thắng — nhưng chưa nhanh nhất', 'Nước này vẫn dẫn tới chiếu hết nhưng cần ' + r.k + ' nước. Hãy tìm đường ngắn hơn.', null);
            draw({ noAnim: true });
            emit(root, 'xq:puzzle-slow', { move: got, expected: exp, k: r.k });
            return;
          }
          wrong(got, exp);
        }, function () { if (state !== mine) return; state.locked = false; emit(root, 'xq:puzzle-checked', { status: null }); wrong(got, exp); });
        return;
      }
      if (!ok) return wrong(got, exp);
      if (mates && got !== exp) state.dyn = true;   // chiếu hết sớm hơn đáp án
      if (state.dyn) { state.moves.push(got); applyIccs(got); draw(); finishSolved(); return; }
      var info = { ok: true, ply: state.ply, move: got, expected: exp };
      emit(root, 'xq:puzzle-move', info);
      if (cfg.onMove) cfg.onMove(info);

      state.moves.push(got);
      applyIccs(got);
      if (state.ply >= cfg.solution.length || mates) { draw(); finishSolved(); return; }
      setCaption('Đúng rồi!', 'Đối phương đang đáp trả…', 'ok');
      draw();
      state.locked = true;
      reply = setTimeout(function () {
        state.locked = false;
        applyIccs(cfg.solution[state.ply]);
        if (state.ply >= cfg.solution.length) { draw(); finishSolved(); return; }
        setCaption('Đến lượt bạn', 'Tìm nước tiếp theo.', null);
        draw();
      }, 520);
    }

    // Nước TƯƠNG ĐƯƠNG nước trong bài (cùng mục đích: Xe thoái 3/4/5, đổi thứ tự nước…): tính đúng, rồi đi tiếp theo
    // đúng lời giải của bài (bàn chuyển sang nước trong bài) — kết quả gửi server vẫn là lời giải chuẩn.
    function acceptEquiv(got, exp) {
      var info = { ok: true, ply: state.ply, move: got, expected: exp, equiv: true };
      emit(root, 'xq:puzzle-move', info);
      if (cfg.onMove) cfg.onMove(info);
      var em = iccsToIdx(exp);
      var note = (cfg.notes && cfg.notes[state.ply]) || (em && Rules.notation ? Rules.notation(state.board, em.from, em.to) : exp);
      state.moves.push(exp);
      applyIccs(exp);
      if (state.ply >= cfg.solution.length) { draw(); finishSolved(); return; }
      setCaption('Nước tương đương ✓', 'Nước của bạn cùng mục đích — bài chọn ' + (note || exp) + ' (bàn đi theo bài). Đối phương đang đáp trả…', 'ok');
      draw();
      state.locked = true;
      reply = setTimeout(function () {
        state.locked = false;
        applyIccs(cfg.solution[state.ply]);
        if (state.ply >= cfg.solution.length) { draw(); finishSolved(); return; }
        setCaption('Đến lượt bạn', 'Tìm nước tiếp theo.', null);
        draw();
      }, 900);
    }

    // Nước được bộ giải chứng minh vẫn thắng: đi tiếp theo đường riêng, đối phương đỡ DAI nhất (máy chọn).
    function acceptLine(got, exp, r) {
      var info = { ok: true, ply: state.ply, move: got, expected: exp, alt: !state.dyn && got !== exp };
      emit(root, 'xq:puzzle-move', info);
      if (cfg.onMove) cfg.onMove(info);
      var first = !state.dyn && got !== exp;
      state.dyn = true;
      state.left = Math.max(0, r.k - 1);
      state.moves.push(got);
      applyIccs(got);
      if (!r.reply) { draw(); finishSolved(); return; }
      setCaption(first ? 'Hay — một đường thắng khác!' : 'Đúng rồi!', first ? 'Nước này không có trong sách nhưng máy đã chứng minh vẫn chiếu hết được. Đối phương đỡ…' : 'Đối phương đang đáp trả…', 'ok');
      draw();
      state.locked = true;
      reply = setTimeout(function () {
        state.locked = false;
        applyIccs(r.reply);
        state.next = r.next;
        setCaption('Đến lượt bạn', 'Còn ' + state.left + ' nước để chiếu hết.', null);
        draw();
      }, 520);
    }

    function wrong(got, exp) {
      var info = { ok: false, ply: state.ply, move: got, expected: exp };
      emit(root, 'xq:puzzle-move', info);
      if (cfg.onMove) cfg.onMove(info);
      state.mistakes++;
      Sound.bad();
      if (dom.holder.animate && !REDUCE) dom.holder.classList.remove('xq-shake'), void dom.holder.offsetWidth, dom.holder.classList.add('xq-shake');
      if (cfg.failOnWrong) {
        state.failed = true;
        var em = iccsToIdx(exp);
        state.arrows = em ? [{ from: em.from, to: em.to, color: '#2f6b5e' }] : null;
        setCaption('Chưa đúng', 'Nước đúng được chỉ bằng mũi tên xanh.', 'err');
        draw({ noAnim: true });
        var fail = { moves: state.moves.concat([got]), ms: Date.now() - state.t0, wrongPly: info.ply, userMove: got, expected: exp };
        emit(root, 'xq:puzzle-failed', fail);
        if (cfg.onFail) cfg.onFail(fail);
      } else {
        setCaption('Chưa đúng', 'Nước này chưa phải nước hay nhất — thử lại nhé.', 'err');
        draw({ noAnim: true });
      }
    }

    // ---- Đầu vào: bấm-bấm + kéo-thả (Pointer Events), gắn 1 lần trên holder ----
    function squareAt(clientX, clientY) {
      var svg = dom.holder.querySelector('svg'); if (!svg) return -1;
      var pt = svg.createSVGPoint(); pt.x = clientX; pt.y = clientY;
      var loc = pt.matrixTransform(svg.getScreenCTM().inverse());
      var f = Math.round((loc.x - M) / CW), r = Math.round((loc.y - M) / CH);
      if (f < 0 || f > 8 || r < 0 || r > 9) return -1;
      if (flip) { f = 8 - f; r = 9 - r; }
      return r * 9 + f;
    }
    function isOwn(sq) { var p = state.board[sq]; return !!p && Rules.isRed(p) === solverRed(); }

    var drag = null;
    function onDown(e) {
      if (!isSolverTurn() || (e.button !== undefined && e.button !== 0)) return;
      var sq = squareAt(e.clientX, e.clientY); if (sq < 0) return;
      if (isOwn(sq)) {
        drag = { sq: sq, x: e.clientX, y: e.clientY, moved: false, wasSelected: state.selected === sq, id: e.pointerId };
        if (state.selected !== sq) select(sq);
        try { dom.holder.setPointerCapture(e.pointerId); } catch (err) {}
        e.preventDefault();
      } else if (state.selected >= 0) {
        attempt(state.selected, sq);
      }
    }
    function onMove(e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 8) return;
      if (!drag.moved) {
        drag.moved = true;
        var p = PIECES[state.board[drag.sq]];
        var size = dom.holder.getBoundingClientRect().width / BW * 52;
        drag.ghost = document.createElement('div');
        drag.ghost.className = 'xq-ghost';
        drag.ghost.style.width = drag.ghost.style.height = size + 'px';
        drag.ghost.innerHTML = '<svg viewBox="-26 -26 52 52" width="100%" height="100%">' + pieceSvg(p, 0, 0) + '</svg>';
        document.body.appendChild(drag.ghost);
        dom.holder.classList.add('is-dragging');
        draw({ noAnim: true, hide: drag.sq });
      }
      drag.ghost.style.left = e.clientX + 'px';
      drag.ghost.style.top = e.clientY + 'px';
    }
    function onUp(e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag; drag = null;
      dom.holder.classList.remove('is-dragging');
      if (d.ghost) d.ghost.remove();
      if (d.moved) {
        var to = squareAt(e.clientX, e.clientY);
        if (to >= 0 && to !== d.sq) attempt(d.sq, to); else draw({ noAnim: true });
      } else if (d.wasSelected) {
        select(-1);
      }
    }
    dom.holder.addEventListener('pointerdown', onDown);
    dom.holder.addEventListener('pointermove', onMove);
    dom.holder.addEventListener('pointerup', onUp);
    dom.holder.addEventListener('pointercancel', function () { if (drag && drag.ghost) drag.ghost.remove(); drag = null; draw({ noAnim: true }); });

    function start(c) {
      if (reply) clearTimeout(reply);
      initState(c);
      if (cfg.guess) setCaption('Đoán nước — bạn cầm ' + (solverRed() ? 'Đỏ' : 'Đen'), 'Hãy đi nước bạn nghĩ cao thủ trong bài đã chọn. Đoán xong máy hiện lời giảng rồi đi nước của đối phương.', null);
      else setCaption('Đến lượt bạn', 'Tìm nước đi mạnh nhất cho bên ' + (solverRed() ? 'Đỏ' : 'Đen') + '. Bấm hoặc kéo quân để đi.', null);
      draw();
    }

    var api = {
      fen: fen,
      reset: function () { start(); },
      load: function (c) { start(c); },
      hint: function () {
        if (!isSolverTurn()) return;
        var m = iccsToIdx(expected()); if (!m) return;
        state.revealed = true; state.hint = m.from;
        setCaption('Gợi ý', 'Hãy để ý quân được khoanh vàng.', null);
        draw({ noAnim: true });
      },
      reveal: function () {
        if (reply) clearTimeout(reply);
        var keepT0 = state.t0;
        initState(); state.revealed = true; state.locked = true; state.t0 = keepT0;
        setCaption('Lời giải', 'Xem lần lượt các nước của lời giải…', null);
        draw();
        (function step() {
          if (state.ply >= cfg.solution.length) { state.locked = false; draw(); finishSolved(); return; }
          applyIccs(cfg.solution[state.ply]);
          draw();
          reply = setTimeout(step, 750);
        })();
      },
      destroy: function () { if (reply) clearTimeout(reply); dom.holder.innerHTML = ''; },
      state: function () { return state; }
    };
    start();
    return api;
  }

  /** Gắn 1 bộ giải đố vào phần tử bất kỳ (khu Luyện tập). el cần chứa [data-xq-holder]
      và tuỳ chọn [data-xq-capstep]/[data-xq-captext]/[data-xq-pill]/.caption-box. */
  function mountPuzzle(el, cfg) {
    return createPuzzle(el, {
      holder: el.querySelector('[data-xq-holder]'),
      capStep: el.querySelector('[data-xq-capstep]'),
      capText: el.querySelector('[data-xq-captext]'),
      pill: el.querySelector('[data-xq-pill]'),
      capBox: el.querySelector('.caption-box')
    }, cfg);
  }

  /* ======================================================================
     Bàn cờ VÁN ĐẤU tự do (chơi với máy / đấu bạn). Bàn chỉ lo hiển thị + nhận nước đi hợp lệ
     của người chơi; luật thắng/thua, lượt đi, đồng hồ do nơi gọi quản lý.
     cfg: { fen, red:boolean (người chơi cầm Đỏ), coup:boolean (cờ úp), onMove(iccs) }
     API: set(fen, lastIccs, {arrows}) · lock(bool) · setFlip(bool) · flip() · fen()
     ====================================================================== */
  function mountGame(el, cfg) {
    var Rules = window.XiangqiRules;
    var holder = el.querySelector('[data-xq-holder]');
    var st = { board: Rules.loadFen(cfg.fen), last: null, selected: -1, dots: [], locked: false, flip: !cfg.red, arrows: null, hint: -1 };

    function draw(opts) {
      opts = opts || {};
      var lm = st.last ? iccsToSquares(st.last) : null;
      var check = -1;
      [true, false].forEach(function (red) { if (Rules.inCheck(st.board, red, !!cfg.coup)) check = Rules.findKing(st.board, red); });
      holder.innerHTML = renderBoard(Rules.toFen(st.board), lm, st.arrows, st.selected, st.flip, { dots: st.dots, check: check, hint: st.hint, hide: opts.hide });
      if (!opts.noAnim) playAnim(holder);
      holder.classList.toggle('is-interactive', !st.locked);
    }
    function isOwn(sq) { var p = st.board[sq]; return !!p && Rules.isRed(p) === cfg.red; }
    function select(sq) {
      st.selected = sq; st.dots = [];
      if (sq >= 0) for (var t = 0; t < 90; t++) if (Rules.legalNoSelfCheck(st.board, sq, t, false, !!cfg.coup)) st.dots.push(t);
      draw({ noAnim: true });
    }
    function attempt(from, to) {
      if (st.locked) return;
      var ok = Rules.legalNoSelfCheck(st.board, from, to, false, !!cfg.coup);
      st.selected = -1; st.dots = [];
      if (!ok) { draw({ noAnim: true }); return; }
      var iccs = Rules.toIccs(from) + Rules.toIccs(to);
      st.arrows = null; st.hint = -1;
      if (cfg.onMove) cfg.onMove(iccs);
    }
    function squareAt(x, y) {
      var svg = holder.querySelector('svg'); if (!svg) return -1;
      var pt = svg.createSVGPoint(); pt.x = x; pt.y = y;
      var loc = pt.matrixTransform(svg.getScreenCTM().inverse());
      var f = Math.round((loc.x - M) / CW), r = Math.round((loc.y - M) / CH);
      if (f < 0 || f > 8 || r < 0 || r > 9) return -1;
      if (st.flip) { f = 8 - f; r = 9 - r; }
      return r * 9 + f;
    }
    var drag = null;
    holder.addEventListener('pointerdown', function (e) {
      if (st.locked || (e.button !== undefined && e.button !== 0)) return;
      var sq = squareAt(e.clientX, e.clientY); if (sq < 0) return;
      if (isOwn(sq)) {
        drag = { sq: sq, x: e.clientX, y: e.clientY, moved: false, was: st.selected === sq, id: e.pointerId };
        if (st.selected !== sq) select(sq);
        try { holder.setPointerCapture(e.pointerId); } catch (err) {}
        e.preventDefault();
      } else if (st.selected >= 0) attempt(st.selected, sq);
    });
    holder.addEventListener('pointermove', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 8) return;
      if (!drag.moved) {
        drag.moved = true;
        var size = holder.getBoundingClientRect().width / BW * 52;
        drag.ghost = document.createElement('div');
        drag.ghost.className = 'xq-ghost';
        drag.ghost.style.width = drag.ghost.style.height = size + 'px';
        drag.ghost.innerHTML = '<svg viewBox="-26 -26 52 52" width="100%" height="100%">' + pieceSvg(PIECES[st.board[drag.sq]], 0, 0) + '</svg>';
        document.body.appendChild(drag.ghost);
        draw({ noAnim: true, hide: drag.sq });
      }
      drag.ghost.style.left = e.clientX + 'px'; drag.ghost.style.top = e.clientY + 'px';
    });
    holder.addEventListener('pointerup', function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      var d = drag; drag = null;
      if (d.ghost) d.ghost.remove();
      if (d.moved) { var to = squareAt(e.clientX, e.clientY); if (to >= 0 && to !== d.sq) attempt(d.sq, to); else draw({ noAnim: true }); }
      else if (d.was) select(-1);
    });
    holder.addEventListener('pointercancel', function () { if (drag && drag.ghost) drag.ghost.remove(); drag = null; draw({ noAnim: true }); });

    draw();
    return {
      set: function (fen, lastIccs, o) {
        var before = Rules.toFen(st.board);
        st.board = Rules.loadFen(fen); st.last = lastIccs || null; st.selected = -1; st.dots = [];
        st.arrows = (o && o.arrows) || null; st.hint = -1;
        draw(o && o.noAnim ? { noAnim: true } : null);
        if (lastIccs && !(o && o.silent)) moveFx(before, fen, o && o.say);
      },
      showArrow: function (iccs, color) {
        var m = iccsToIdx(iccs); if (!m) return;
        st.arrows = [{ from: m.from, to: m.to, color: color || '#2f6b5e' }]; st.hint = m.from;
        draw({ noAnim: true });
      },
      lock: function (v) { st.locked = !!v; if (v) { st.selected = -1; st.dots = []; } draw({ noAnim: true }); },
      setFlip: function (v) { st.flip = !!v; draw({ noAnim: true }); },
      setSide: function (red) { cfg.red = !!red; st.selected = -1; st.dots = []; draw({ noAnim: true }); },   // đổi bên người đi (Xếp cờ để thẩm)
      flip: function () { st.flip = !st.flip; draw({ noAnim: true }); },
      fen: function () { return Rules.toFen(st.board); }
    };
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

  window.XiangqiBoard = { render: renderBoard, mountPuzzle: mountPuzzle, mountGame: mountGame, init: initBoard, initAll: initAll, sound: Sound, reloadPrefs: loadPrefs };
})();
