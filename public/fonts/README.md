# Font quân cờ — `xiangqi-kai`

`xiangqi-kai.woff2` / `xiangqi-kai.ttf` là **bản subset** của **Noto Serif TC** (weight 700),
chỉ chứa 19 ký tự Hán dùng để vẽ quân cờ + chữ trên bàn cờ:

```
帥 仕 相 馬 俥 炮 兵   將 士 象 車 砲 卒   楚 河 漢 界   課 揭
```

- **Nguồn:** Google Fonts — Noto Serif TC (https://fonts.google.com/noto/specimen/Noto+Serif+TC)
- **Giấy phép:** SIL Open Font License 1.1 (https://openfontlicense.org)
- **Vì sao tự host:** glyph quân trước đây dựa vào `KaiTi`/`STKaiti` của hệ điều hành —
  Android/iOS/Linux thường không có nên quân bị render lệch hoặc thành ô vuông. Subset 19 glyph
  chỉ ~5 KB (woff2) nên nhúng thẳng, hiển thị giống nhau mọi thiết bị và khớp với ảnh OG
  (`tools/og-image` nạp cùng file `.ttf`).

## Tạo lại (khi cần thêm glyph)

```bash
# text= là danh sách ký tự cần (URL-encode). Google trả về TTF subset.
curl -A "Mozilla/5.0 Chrome" \
  "https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@700&text=<CÁC-KÝ-TỰ>" 
# → lấy URL trong src: url(...) → tải về xiangqi-kai.ttf
python -c "from fontTools.ttLib import TTFont; f=TTFont('xiangqi-kai.ttf'); f.flavor='woff2'; f.save('xiangqi-kai.woff2')"
```

Cần `pip install fonttools brotli` cho bước chuyển woff2.
