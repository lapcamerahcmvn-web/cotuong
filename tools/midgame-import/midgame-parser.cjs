// Parser cho sách trung cuộc: khác sách khai cuộc ở chỗ mỗi bài KHÔNG bắt đầu từ thế cờ mặc định —
// bắt đầu từ 1 thế cờ tuỳ ý (đọc tay từ hình vẽ trong sách, tự dựng FEN) rồi mới áp chuỗi nước từ
// đó. Dùng lại đúng engine luật của site (public/js/xiangqi-rules.js) để LEGAL-CHECK từng nước.
//
// Quy trình dựng FEN từ hình vẽ sách:
// 1. Crop vùng hình bằng Python/PIL ở DPI cao (300) để đọc quân + tọa độ chính xác.
// 2. Nhãn cột TRÊN (1..9 trái->phải) = số cột sách phía Đen = cột vật lý luôn (engine x = nhãn-1).
//    Nhãn cột DƯỚI (9..1 trái->phải) = số cột sách phía Trắng (engine x = 10-nhãn).
// 3. Dựng FEN 10 hàng (hàng0=trên/Đen -> hàng9=dưới/Trắng), field còn lại "w KQkq - 0 1" bỏ qua
//    (chỉ cần phần bàn cờ, R.loadFen chỉ đọc phần đầu).
// 4. Validate lại: tổng số quân mỗi loại hợp lệ (Tướng=1, Sĩ<=2, Tượng<=2, Xe/Pháo/Mã<=2, Tốt<=5).
//
// KHÔNG public tên sách/tác giả (xem CLAUDE.md mục bản quyền) — chỉ trích ký hiệu nước đi + thế cờ
// làm dữ kiện, viết lại lý thuyết 100% bằng lời riêng.
global.window = global;
require('D:/wamp64/www/cotuong/public/js/xiangqi-rules.js');
var R = global.XiangqiRules;

var BOOK2ENGINE = { P: 'C', M: 'N', X: 'R', B: 'P', S: 'A', V: 'B', T: 'K' };
var STRAIGHT_ENGINE = 'RCPKrcpk';

function fileToX(fileNum, red) { return red ? 9 - fileNum : fileNum - 1; }

function parseOne(board, notation, side) {
  var red = side === 'do';
  // "Tg" = Tướng (2 ký tự, tránh nhầm "T"=Tốt viết tắt kiểu khác ở sách trung cuộc). Các quân còn
  // lại vẫn 1 ký tự như sách khai cuộc.
  var norm = notation.replace(/^Tg/, 'T');
  var m = norm.match(/^([A-Za-z])(\d)([-./])(\d)$/);
  if (!m) throw new Error('Không đọc được ký hiệu: ' + notation);
  var bookLetter = m[1].toUpperCase(), originFile = +m[2], verb = m[3], targetNum = +m[4];
  var engineType = BOOK2ENGINE[bookLetter];
  if (!engineType) throw new Error('Không map được quân: ' + bookLetter + ' trong ' + notation);
  var pieceChar = red ? engineType : engineType.toLowerCase();

  var originX = fileToX(originFile, red);
  var candidates = [];
  for (var r = 0; r < 10; r++) if (board[r * 9 + originX] === pieceChar) candidates.push(r * 9 + originX);
  if (candidates.length === 0) throw new Error('Không tìm thấy quân ' + bookLetter + ' (' + pieceChar + ') ở cột ' + originFile + ' (side ' + side + ') cho nước ' + notation);

  var from = null, to = null;
  if (verb === '-') {
    var destX = fileToX(targetNum, red);
    for (var ci = 0; ci < candidates.length; ci++) {
      var cf = candidates[ci], cr = (cf / 9) | 0;
      var ct = cr * 9 + destX;
      if (R.legalMove(board, cf, ct)) { from = cf; to = ct; break; }
    }
  } else {
    var forward = (verb === '.');
    if (STRAIGHT_ENGINE.indexOf(pieceChar) >= 0) {
      for (var ci2 = 0; ci2 < candidates.length; ci2++) {
        var cf2 = candidates[ci2], cr2 = (cf2 / 9) | 0;
        var dr = red ? -targetNum : targetNum;
        if (!forward) dr = -dr;
        var tr2 = cr2 + dr;
        if (tr2 < 0 || tr2 > 9) continue;
        var ct2 = tr2 * 9 + originX;
        if (R.legalMove(board, cf2, ct2)) { from = cf2; to = ct2; break; }
      }
    } else {
      var destX2 = fileToX(targetNum, red);
      for (var ci3 = 0; ci3 < candidates.length && from === null; ci3++) {
        var cf3 = candidates[ci3], cr3 = (cf3 / 9) | 0;
        for (var tr3 = 0; tr3 <= 9; tr3++) {
          var ct3 = tr3 * 9 + destX2;
          var isForward = red ? (tr3 < cr3) : (tr3 > cr3);
          if (isForward !== forward) continue;
          if (R.legalMove(board, cf3, ct3)) { from = cf3; to = ct3; break; }
        }
      }
    }
  }
  if (from === null || to === null) throw new Error('Không suy ra được nước hợp lệ cho: ' + notation + ' (side ' + side + ')');
  return { from: from, to: to };
}

// applyGameFromFen: startFen = thế cờ bắt đầu (tự dựng từ hình sách), moveList = chuỗi ký hiệu,
// startSide = 'do'|'den' (bên đi nước đầu tiên trong chuỗi — sách luôn ghi rõ ai đi trước).
function applyGameFromFen(startFen, moveList, startSide) {
  var board = R.loadFen(startFen);
  var steps = [];
  var firstIsRed = startSide === 'do';
  for (var i = 0; i < moveList.length; i++) {
    var side = ((i % 2 === 0) === firstIsRed) ? 'do' : 'den';
    var mv = parseOne(board, moveList[i], side);
    var wxf = R.notation(board, mv.from, mv.to);
    var iccs = R.toIccs(mv.from) + R.toIccs(mv.to);
    board[mv.to] = board[mv.from];
    board[mv.from] = null;
    steps.push({ notation: moveList[i], wxf: wxf, iccs: iccs, side: side, fen: R.toFen(board) });
  }
  return { steps: steps, finalFen: R.toFen(board) };
}

// checkPieceCounts: kiểm tra nhanh 1 FEN có hợp lý về số lượng quân không (bắt lỗi transcribe tay).
function checkPieceCounts(fen) {
  var board = R.loadFen(fen);
  var counts = {};
  for (var i = 0; i < 90; i++) { var c = board[i]; if (c) counts[c] = (counts[c] || 0) + 1; }
  var limits = { k: 1, a: 2, b: 2, n: 2, r: 2, c: 2, p: 5 };
  var problems = [];
  Object.keys(limits).forEach(function (lower) {
    var upper = lower.toUpperCase();
    if ((counts[lower] || 0) > limits[lower]) problems.push('Đen thừa quân ' + lower + ': ' + counts[lower]);
    if ((counts[upper] || 0) > limits[lower]) problems.push('Trắng thừa quân ' + upper + ': ' + counts[upper]);
  });
  if (!counts['k']) problems.push('Thiếu Tướng Đen (k)');
  if (!counts['K']) problems.push('Thiếu Tướng Trắng (K)');
  return { counts: counts, problems: problems };
}

module.exports = { applyGameFromFen: applyGameFromFen, checkPieceCounts: checkPieceCounts, parseOne: parseOne };
