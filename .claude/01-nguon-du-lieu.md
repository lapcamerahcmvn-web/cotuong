# Kiểm Kê Nguồn Dữ Liệu — Ổ E:\

> Khảo sát 23/08/2026. Toàn bộ đường dẫn dưới đây là trên ổ `E:\` (ổ ngoài của máy user),
> **không phải trong repo này**. Trước khi import phải copy tập con cần dùng vào
> `storage/app/private/cotuong-sources/` (xem `.claude/03-ke-hoach-trien-khai.md` mục 2.1)
> — không thao tác trực tiếp trên `E:\` vì ổ ngoài có thể không luôn gắn kết.

## Tổng Quan Số Liệu (đếm trong `E:\Co Tuong` + `E:\Co Tuong Mr Thanh`)

| Định dạng | Số lượng | Vai trò |
|---|---|---|
| `.xqf` | 2.429 | **Nguồn nước đi/FEN chính** — giải mã bằng code, xem `02-dinh-dang-xqf.md` |
| `.pgn` (biến thể Trung Quốc, GBK) | 1.427 | Đối chiếu chéo với `.xqf` khi có song song |
| `.cbl` | 1.723 | ⚠️ Chưa xác minh nguồn gốc — có thể là opening book mặc định của CCBridge/GUI SHARK |
| `.ccw` | 1.604 | ⚠️ Chưa xác minh |
| `.cbr` | 822 | ⚠️ Chưa xác minh |
| `.cbs` | 105 | ⚠️ Chưa xác minh |
| `.mp4`/`.avi` | 152 / 5 | Video khóa học "Thầy Thắng", không phụ đề — chỉ dùng ngữ cảnh bổ sung |
| `.pdf` (trong `Co Tuong`/`Co Tuong Mr Thanh`) | ~24 | Sách/mindmap, nhiều file trùng lặp |
| `.pdf` (`E:\sach-co-tuong\`) | 16 | Sách riêng, dung lượng lớn (2MB–235MB) — nghi scan ảnh, cần OCR |

**Không tìm thấy tài liệu nào cho Cờ Úp** trong toàn bộ ổ `E:\` — mảng này (Phase 5) sẽ
tự biên soạn nội dung, không qua pipeline khai thác nguồn.

## Cấu Trúc Thư Mục Chính

### `E:\Co Tuong Mr Thanh\` — kho `.xqf` đã tự phân loại theo giáo trình

```
48 BAI GIANG NGUYEN LY KHAI CUOC XQF/     — 48 bài, đặt tên rõ (BAI 1, BAI 2...)
  BAI 1 CACH HOC KHAI CUOC TOT NHAT/
    BAI 1 CACH HOC KHAI CUOC TOT NHAT.xqf      ← 1 bài = 1 file
  BAI 2 BA NGUYEN TAC VA 4 LOAI HINH BO CUOC LON/
    1 KHAI LUOC.xqf                            ← 1 bài = NHIỀU file con (6 file)
    2 DINH THUC BO CUC NGU THAT PHAO doi BINH PHONG MA.xqf
    3 DINH THU BO CUC NGU CUU PHAO QHX doi BINH PHONG MA BPDX.xqf
    4 LOAI HINH LINH HOAT.xqf
    5 LOAI HINH TAN THU.xqf
    6 TRONG DIEM BAI HOC.xqf
  ... (BAI 3 - BAI 48 tương tự, cấu trúc KHÔNG đồng nhất — một số bài 1 file,
       một số bài nhiều file con theo chủ đề phụ)

48 BAI GIANG NGUYEN LY TAN CUOC XQF FULL/  — 48 bài nguyên lý tàn cuộc (cấu trúc tương tự)

1 DOI HINH XE SONG PHAO/                   — Đội hình theo quân (13 đội hình, đánh số 1-13)
  1. GIAP XE PHAO/
    DINH NGIHA GIAP XE PHAO.xqf            — thế cờ định nghĩa (move_count=0, chỉ FEN + lời giảng dài)
    VI DU 1.xqf                            — ví dụ có nước đi thật (move_count>0)
    VI DU 2.xqf
    VI DU 3 VAN DANH THUC CHIEN GXP.xqf
  2. THIEN DIA PHAO/ ... 3. SONG HIEN TUU/ ... (8 sub-thư mục thế biến)
2 DOI HINH XE PHAO MA/ ... 3 DOI HINH XE SONG MA/ ... (đến 13. SONG MA CHOT/)

LOP SAT CHIEU THUC DUNG/                   — có CẢ .xqf và .pgn song song (đối chiếu chéo)
  1.DOI HINH XE SONG PHAO/
    SCTD Bai 1.pgn, SCTD Bai 1.xqf (kiểm tra tên khớp)...

CO TAN NANG CAO CO BINH LUAN XFQ/          — "CO BINH LUAN" = có annotation per-move
  co tan chot/1 chot nang cao/CO TAN 1 CHOT NANG CAO.xqf   (+ 2 file trùng tên có GUID)
  co tan ma/ ... co tan phao/ ... phao ma/

KHAU QUYET CO TAN C4 CO BINH LUAN XFQ/
Cam bay va doi sach XQF kt chinh ta xong/
XQF LY THUYET TRUNG CUC/
```

### `E:\Co Tuong\Anh THANH\Khoa hoc cua thay thang\` — 152 video

```
BINHPHONGMA/               — Bình Phong Mã cơ bản / tốt 7 / vs Tả Mã Bàn Hà
CHUYENDEGIANGHOCUOC/        — Phá Chấp 3 Tiên, Phá Chấp Mã, Pháo Đầu công chấp 2 Tiên...
CHUYENDEPHAODAUDOIBPM/      — Pháo Đầu Tam Binh/Tốt 7 Hoành Xe vs Bình Phong Mã (nhiều bài)
PHAODAUDOIDONDEMA/
PHAODAUTOT7 HOANHXA DOI BPM/
PHITUONGCUCDOIPHAODAU/
THUANPHAO(DIHAU)/ THUANPHAO(DITIEN)/
```
Không có `.srt`/`.vtt` sẵn. Tên file tiếng Việt rõ nghĩa nhưng KHÔNG map 1-1 với lesson —
1 video thường phủ nhiều chủ đề/nước đi, cần mapping thủ công theo từ khóa (Phase 2).

### `E:\sach-co-tuong\` — 16 PDF sách

File lớn (vd `B4) CAM BAY DOI SACH.pdf` 235MB, `B4) NGHI HINH CONG KICH.pdf` 233MB) —
khả năng cao là sách scan ảnh, cần OCR (Phase 4, rủi ro cao, review 100%).

## Định Dạng Chưa Xác Minh Nguồn Gốc (`.cbl`/`.ccw`/`.cbr`/`.cbs`)

Số lượng lớn (tổng ~4.254 file) nhưng **KHÔNG đưa vào pipeline** cho tới khi xác minh —
nhiều khả năng là opening book / database mặc định đi kèm phần mềm cờ bên thứ 3
(`E:\Co Tuong\CCBridge Co Tuong`, `E:\Co Tuong\GUI SHARK 1.7.4`, `E:\Co Tuong\Sofware`,
`E:\Co Tuong\bhsim`), không phải nội dung tác giả tự soạn. Xem `verified_authorship`
trong schema `source_assets` (`.claude/03-ke-hoach-trien-khai.md` mục 1).

**Bằng chứng gián tiếp đã có**: một số file `.xqf` trong `E:\Co Tuong\Sup tam\` và
`E:\Co Tuong\CCBridge Co Tuong\CBL\` (KHÔNG phải `.cbl`, mà là `.xqf` nằm trong các thư
mục đó) khi giải mã ra là **ván đấu Kỳ Vương Trung Quốc sưu tầm** (tên người chơi tiếng
Trung, vd "赵庆阁 vs 胡荣华", "全国象棋团体赛" = giải đồng đội toàn quốc) — rõ ràng là dữ
liệu sưu tầm/tải về, không phải bài giảng gốc của Thầy Thắng. Các thư mục `.cbl/.ccw` có
khả năng cùng bản chất (book sưu tầm) chứ không hẳn là "bundled với phần mềm" — cần mở
thử bằng phần mềm gốc để xác nhận chính xác trước khi quyết định dùng hay bỏ.
