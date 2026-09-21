// Parser: ký hiệu sách (P2-5, M8.7, X9-8, B7.1, S4.5, V3.5, P9/1...) -> {from,to} rồi apply lên board.
// Dùng lại public/js/xiangqi-rules.js (engine chuẩn của site) để LEGAL-CHECK từng nước — nước nào
// không hợp lệ sẽ ném lỗi ngay, không âm thầm sai. Dùng khi biên soạn bài khai cuộc từ tài liệu
// tham khảo nội bộ (KHÔNG public tên nguồn — xem CLAUDE.md mục bản quyền): trích ký hiệu nước đi
// (dữ kiện cờ) rồi viết lại lý thuyết 100% bằng lời riêng.
//
// Dùng: node tools/opening-book-import/notation-parser.js  (làm module, xem ví dụ cuối file)
// Lưu ý: dùng require() với đường dẫn TUYỆT ĐỐI (không phải __dirname-relative) — trên máy này,
// chạy qua `node -e` đôi khi Node nạp file CJS này qua ESM loader khiến __dirname không dùng
// được đúng cách (báo lỗi resolve path tương đối). Nếu chuyển máy/host khác, đổi path bên dưới.
global.window = global;
require('D:/wamp64/www/cotuong/public/js/xiangqi-rules.js');
var R = global.XiangqiRules;

var START = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';

// Chữ cái sách -> mã quân nội bộ (chú ý: sách dùng "B"=Binh/Tốt, "V"=Tượng; engine dùng
// "B"=Tượng, "P"=Tốt -- khác nhau, phải map tay, KHÔNG dùng chung ký tự).
var BOOK2ENGINE = { P: 'C', M: 'N', X: 'R', B: 'P', S: 'A', V: 'B', T: 'K' };
var STRAIGHT_ENGINE = 'RCPKrcpk';

function fileToX(fileNum, red) { return red ? 9 - fileNum : fileNum - 1; }
function xToFile(x, red) { return red ? 9 - x : x + 1; }

// parseOne: board hiện tại, notation vd "P2-5", side 'do'|'den' (bên đi nước này) -> {from,to}
function parseOne(board, notation, side) {
  var red = side === 'do';
  var m = notation.match(/^([A-Za-z])(\d)([-./])(\d)$/);
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
    // Bình: cùng hàng, sang cột đích.
    var destX = fileToX(targetNum, red);
    for (var ci = 0; ci < candidates.length; ci++) {
      var cf = candidates[ci], cr = (cf / 9) | 0;
      var ct = cr * 9 + destX;
      if (R.legalMove(board, cf, ct)) { from = cf; to = ct; break; }
    }
  } else {
    var forward = (verb === '.'); // tiến=. , thoái=/
    if (STRAIGHT_ENGINE.indexOf(pieceChar) >= 0) {
      // Xe/Pháo/Tốt/Tướng: target = số ô tiến/lùi theo CÙNG cột.
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
      // Mã/Tượng/Sĩ: target = CỘT đích, hàng đích suy ra từ luật đi + hướng tiến/thoái.
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

// applyGame: chạy 1 chuỗi nước (mảng string "P2-5", "M8.7", ...), trả về mảng step {fen, iccs, wxf, side}
function applyGame(moveList) {
  var board = R.loadFen(START);
  var steps = [];
  for (var i = 0; i < moveList.length; i++) {
    var side = (i % 2 === 0) ? 'do' : 'den';
    var mv = parseOne(board, moveList[i], side);
    var wxf = R.notation(board, mv.from, mv.to);
    var iccs = R.toIccs(mv.from) + R.toIccs(mv.to);
    board[mv.to] = board[mv.from];
    board[mv.from] = null;
    steps.push({ notation: moveList[i], wxf: wxf, iccs: iccs, side: side, fen: R.toFen(board) });
  }
  return { steps: steps, finalFen: R.toFen(board) };
}

module.exports = { applyGame: applyGame, START: START };
