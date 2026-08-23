# Định Dạng `.xqf` — Đặc Tả Kỹ Thuật (Phase 0 — GO)

> Kết quả spike Phase 0 (23/08/2026): **giải mã thành công cả 4 version thấy trong corpus**
> (0x0A không mã hóa, 0x0C/0x0D/0x12 có mã hóa). Script: `tools/xqf-decoder/decode.js`.
> Quyết định: **XQF-first**, đúng kiến trúc đã chốt trong `.claude/03-ke-hoach-trien-khai.md`.

## Nguồn tham khảo

- **XQF 1.0 (không mã hóa)**: đặc tả công khai chính thức, tác giả "过河象" (XQStudio),
  repo `xqbase/eleeye` (`XQFTOOLS/XQF.TXT`, tiếng Trung, encoding GBK).
- **XQF version > 10 (có mã hóa)**: KHÔNG có đặc tả chính thức công khai, nhưng thuật toán
  đã được reverse-engineer độc lập bởi nhiều dự án mã nguồn mở, tất cả cho ra cùng 1 thuật
  toán (dấu hiệu đây là "kiến thức chung" đã ổn định trong cộng đồng lập trình cờ tướng
  Trung Quốc): `walker8088/cchess` (Python), `zfdang/chinese-chess-fish-android` (Python +
  Java), `FastLight126/vschess` (JavaScript), **`Velithia/JieqiBox`** (TypeScript — dùng
  trực tiếp làm tham chiếu chính vì code sạch, đã port sang `decode.js`).
  - ⚡ **Lưu ý thú vị**: "JieqiBox" = 揭棋 (Jieqi) — đây chính là biến thể Trung Quốc của
    **Cờ Úp**! Repo này có thể hữu ích tham khảo thêm ở Phase 5 (luật đuổi dài, cơ chế lật
    quân) ngoài việc cho mượn XQF parser.

## Cấu trúc file

```
0x0000 - 0x03FF   Header (1024 bytes)
0x0400 - EOF      Move block (có thể bị mã hóa tùy version)
```

### Header — các offset quan trọng (đều đã verify khớp giữa đặc tả chính thức và code tham khảo)

| Offset | Field | Ghi chú |
|---|---|---|
| 0x00-0x01 | Magic | Phải là `"XQ"` |
| 0x02 | Version | 0x0A = XQF 1.0 (không mã hóa). >10 = có mã hóa (xem dưới) |
| 0x03 | KeyMask | Dùng cho tính F32 key khi version > 15 |
| 0x08-0x0B | KeyOr[0..3] | Dùng cho tính F32 key khi version > 15 |
| 0x0C | KeySum | Dùng tính XYp/XYf/XYt/RMK key |
| 0x0D | KeyXYp | " |
| 0x0E | KeyXYf | " |
| 0x0F | KeyXYt | " |
| 0x10-0x2F | QiziXY[0..31] | Vị trí 32 quân — xem "Giải mã vị trí quân" dưới |
| 0x30 (LE16) | PlayStepNo | Số nước đã đi tính đến vị trí này |
| 0x32 | WhoPlay | 0=đỏ đi, 1=đen đi |
| 0x33 | PlayResult | 0=chưa rõ, 1=đỏ thắng, 2=đen thắng, 3=hòa |
| 0x40 | Type | 0=toàn ván, 1=khai cuộc, 2=trung cuộc, 3=tàn cuộc |
| 0x50 (len) + 0x51 (data, 127 byte) | Title | String có tiền tố độ dài |
| 0xD0/0xD1 | MatchName | " |
| 0x110/0x111 | MatchTime | " |
| 0x120/0x121 | MatchAddr | " |
| 0x130/0x131 | RedPlayer | " |
| 0x140/0x141 | BlkPlayer | " |
| 0x1D0/0x1D1 | RMKWriter (người bình luận) | " |
| 0x1E0/0x1E1 | Author | " |

Text fields **không bị mã hóa** ở mọi version — chỉ cần decode GBK (`iconv-lite`, encoding
`'gbk'`) là ra đúng tiếng Trung/Việt. Với file của Thầy Thắng, text thường là tiếng Việt
KHÔNG dấu (thuần ASCII, vd "DANG NGOC THANH") nên không cần decode GBK vẫn đọc được.

### Giải mã vị trí quân (32 byte tại 0x10-0x2F)

Thứ tự cố định (không đổi theo version): 16 byte đầu = quân đỏ theo thứ tự
车马相士帅士相马车炮炮兵兵兵兵兵 (Xe Mã Tượng Sĩ Tướng Sĩ Tượng Mã Xe Pháo Pháo Tốt×5),
16 byte sau = quân đen cùng thứ tự chữ thường. Map ký tự FEN: `RNBAKABNRCCPPPPP` (đỏ) +
`rnbakabnrccppppp` (đen) — **thứ tự đúng theo index, không phải theo alphabet**.

```
byte value → toạ độ: x = floor(byte/10), y = 9 - (byte%10), boardIndex = y*9 + x
byte >= 90 → quân đã bị ăn / không có trên bàn
```

Nếu `version <= 11`: `piecePos = QiziXY[i]` trực tiếp, `pieceKey = i`.
Nếu `version > 11`: có "nhiễu" (disturbance) cộng vào:
```
XYp = ((KeyXYp² * 54 + 221) * KeyXYp) & 0xFF
piecePos = (QiziXY[i] - XYp) & 0xFF
pieceKey = (XYp + i + 1) & 31
```

### Move block

Bắt đầu tại 0x0400. Record đầu tiên (index 0) luôn là "nước rỗng" cố định — comment của
record này (nếu có) được xử lý như **comment cấp file** (`file_level_comment`), không phải
1 bước cờ thật.

**Version ≤ 10** (không mã hóa hoàn toàn): mỗi record LUÔN 8 byte cố định + n byte comment:
```
byte 0: fromPos + 24
byte 1: toPos + 32
byte 2: 0xF0 nếu chưa phải nước cuối, 0x00 nếu là nước cuối
byte 3: reserved (0x00)
byte 4-7: LE32 = độ dài comment theo sau (0 nếu không có)
```

**Version > 10**: record chỉ 4 byte cố định (from/to/flags/reserved); có comment theo sau
CHỈ KHI bit `0x20` trong byte flags (byte 2) được bật — lúc đó mới có thêm 4-byte LE32 độ
dài (đã cộng thêm key `RMK`, phải trừ lại) + n byte comment.

Move byte cần trừ ngược lại offset cộng thêm khi decode + trừ thêm key nhiễu nếu version>10:
```
Pf = (fromByte - 24 - KeyXYf_disturbed) & 0xFF
Pt = (toByte - 32 - KeyXYt_disturbed) & 0xFF
```

Toàn bộ move block (trừ text) bị **XOR-mask thêm 1 lớp** (F32, 32 byte lặp lại) chỉ khi
`version > 15` — dùng watermark cố định `"[(C) Copyright Mr. Dong Shiwei.]"` để derive key,
kết hợp KeySum/KeyXYp/KeyXYf/KeyXYt/KeyMask/KeyOr từ header.

## Kết quả test Phase 0 (6+ file mẫu, đủ 4 version)

| File | Version | Piece count | FEN chuẩn? | Move count | Annotation |
|---|---|---|---|---|---|
| BAI 1 CACH HOC KHAI CUOC TOT NHAT.xqf | 0x0A | ✅ 32/32 | ✅ | 0 | ✅ lời giảng dài, đọc được |
| BAI 2/1 KHAI LUOC.xqf | 0x0A | ✅ 32/32 | ✅ | 0 | ✅ lời giảng dài |
| 1 DOI HINH XSP/1. GIAP XE PHAO/VI DU 1.xqf | 0x0A | ✅ (thế cờ tùy chỉnh, không phải start) | n/a | 19 | ✅ 11 annotation, đọc được |
| CO TAN 1 CHOT NANG CAO.xqf | 0x0A | ✅ (thế tàn cuộc) | n/a | 23 | ✅ 6 annotation |
| CCBridge CBL/.../布局陷阱--中炮对拐角马.XQF | 0x0C | ✅ 32/32 | ✅ | 17 | ✅ đọc được (GBK) |
| CCBridge CBL/.../0 红进7兵后8炮巡河 老式.XQF | 0x12 | ✅ 32/32 | ✅ | 445 | ✅ đọc được (GBK) |
| Sup tam/.../19830610赵庆阁负胡荣华.XQF | 0x0D | ✅ 32/32 | ✅ | 89 | ⚠️ comment-length garbage (107 warning) — **move/FEN vẫn đúng**, chỉ annotation bị mất ở version 0x0D cụ thể |

**Kết luận**: move/FEN decode đúng 100% trên mọi version test được — đây là dữ liệu "đáng
tin" theo kiến trúc đã chốt (không qua LLM). Annotation decode đúng ở version 0x0A/0x0C/0x12,
có lỗi cục bộ ở dải version 11-15 (mẫu 0x0D) — không chặn go/no-go vì:
1. Move/FEN (phần bắt buộc chính xác) không bị ảnh hưởng.
2. Cơ chế `decode_confidence`/`decode_warnings` trong schema đã thiết kế sẵn để cờ những
   file này cho admin soi kỹ, thay vì tự động tin comment rỗng/sai.
3. Version 0x0D chỉ chiếm ~7% mẫu khảo sát, và phần lớn là ván sưu tầm (không phải nội
   dung gốc Thầy Thắng) — ưu tiên thấp hơn trong roadmap.

## Cách dùng `tools/xqf-decoder/decode.js`

```bash
cd tools/xqf-decoder
node decode.js "<file.xqf>"                # in tóm tắt ra console
node decode.js "<file.xqf>" --json          # in JSON đầy đủ (trừ move list rút gọn)
node decode.js "<file.xqf>" --json --full   # in JSON đầy đủ kể cả move list

node test-encrypted.js   # regression test trên 3 file mẫu version 0x0C/0x0D/0x12 (đường
                          # dẫn cứng trỏ tới E:\ — chỉ chạy được trên máy có gắn ổ E:\)
```

Output JSON dùng làm input cho artisan `cotuong:import-xqf` ở Phase 1 (gọi script này qua
`Symfony\Component\Process\Process`, KHÔNG viết lại logic binary parse bằng PHP).

Text (title/comment) trong output hiện là chuỗi latin1 giữ nguyên byte gốc — cần
`iconv-lite` decode `'gbk'` khi hiển thị nếu là ký tự Hán; text tiếng Việt không dấu (đa số
file Thầy Thắng) đọc được trực tiếp không cần decode thêm.

## Việc còn lại (không chặn Phase 1, làm khi có thời gian)

- Điều tra sâu hơn lỗi comment-length ở dải version 11-15 (mẫu 0x0D) — có thể do ngưỡng
  chuyển cấu trúc record (hiện dùng `version > 10`) chưa đúng hoàn toàn cho dải hẹp này.
- Viết Pest/Node test cố định fixture (hiện `test-encrypted.js` trỏ thẳng ổ `E:\`, cần copy
  2-3 file mẫu vào `tools/xqf-decoder/fixtures/` để test chạy được không phụ thuộc ổ ngoài —
  **nhớ thêm `fixtures/` vào `.gitignore`** vì vẫn là nội dung có bản quyền).
