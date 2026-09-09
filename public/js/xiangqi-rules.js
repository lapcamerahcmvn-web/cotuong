/* Luật cờ tướng thuần túy (không đụng DOM), dùng chung giữa board-editor.js (Admin) và
   board.js (trang học/giải đố). Trích từ board-editor.js — xem file đó nếu cần đối chiếu.
   Board: mảng 90 ô, index = rank*9+file, rank 0 = trên (Đen), giá trị là 1 ký tự quân hoặc null. */
(function (global) {
  'use strict';
  var STRAIGHT = 'RCPKrcpk';
  var PIECE_VI = { R: 'Xe', N: 'Mã', B: 'Tượng', A: 'Sĩ', K: 'Tướng', C: 'Pháo', P: 'Tốt' };

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
    function between() {
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
      if (tgt && tgt.toUpperCase() === 'K' && dc === 0) return between() === 0;
      if (adr + adc !== 1) return false; if (tc < 3 || tc > 5) return false; return red ? (tr >= 7 && tr <= 9) : (tr >= 0 && tr <= 2);
    }
    if (t === 'P') {
      if (red) { if (dr === -1 && dc === 0) return true; if (fr <= 4 && dr === 0 && adc === 1) return true; return false; }
      if (dr === 1 && dc === 0) return true; if (fr >= 5 && dr === 0 && adc === 1) return true; return false;
    }
    return true;
  }

  function legalMove(b, from, to, up) {
    var p = b[from]; if (!p || from === to) return false;
    var tgt = b[to]; if (tgt && sameSide(tgt, p)) return false;
    var red = isRed(p), type, isUp = up || (p === 'X' || p === 'x');
    if (isUp) { var role = posRole(from); if (!role) return true; type = role; }
    else type = p.toUpperCase();
    return moveByType(type, red, b, from, to, isUp);
  }

  function findKing(b, red) { var kc = red ? 'K' : 'k'; for (var i = 0; i < 90; i++) if (b[i] === kc) return i; return -1; }

  // Tướng bên `red` có đang bị chiếu không (kể cả luật đối mặt tướng — legalMove của Tướng đã lo).
  function inCheck(b, red) {
    var ki = findKing(b, red); if (ki < 0) return false;
    for (var i = 0; i < 90; i++) { var p = b[i]; if (!p || isRed(p) === red) continue; if (legalMove(b, i, ki)) return true; }
    return false;
  }

  // Nước hợp lệ VÀ không để hở Tướng mình (lọc tự chiếu — legalMove thuần không lọc).
  function legalNoSelfCheck(b, from, to, up) {
    if (!legalMove(b, from, to, up)) return false;
    var nb = b.slice(); nb[to] = nb[from]; nb[from] = null;
    return !inCheck(nb, isRed(b[from]));
  }

  function loadFen(fen) {
    var b = new Array(90).fill(null);
    var rows = (fen || '').split(' ')[0].split('/');
    for (var r = 0; r < 10; r++) {
      var f = 0, row = rows[r] || '';
      for (var i = 0; i < row.length; i++) {
        var ch = row[i];
        if (ch >= '1' && ch <= '9') f += +ch;
        else { b[r * 9 + f] = ch; f++; }
      }
    }
    return b;
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
  function fromIccs(s) {
    if (!s || s.length < 4) return null;
    function idx(a, b) { return (9 - (b.charCodeAt(0) - 48)) * 9 + (a.charCodeAt(0) - 97); }
    return { from: idx(s[0], s[1]), to: idx(s[2], s[3]) };
  }
  function fileVi(x, red) { return red ? 9 - x : x + 1; }

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

  global.XiangqiRules = {
    isRed: isRed, sameSide: sameSide, posRole: posRole, moveByType: moveByType,
    legalMove: legalMove, findKing: findKing, inCheck: inCheck, legalNoSelfCheck: legalNoSelfCheck,
    loadFen: loadFen, toFen: toFen, toIccs: toIccs, fromIccs: fromIccs, fileVi: fileVi,
    notation: notation, sideOf: sideOf
  };
})(window);
