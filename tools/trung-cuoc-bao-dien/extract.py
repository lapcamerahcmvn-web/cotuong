#!/usr/bin/env python3
# tools/trung-cuoc-bao-dien/extract.py — Trích toàn bộ sơ đồ bàn cờ (ảnh nhúng) của 2 tập sách
# "Trung Cuộc Bảo Điển" (PDF nội bộ trên E:\, KHÔNG public) + chú thích "Hình N" gần nhất.
# Ra: <out>/t{vol}/p{page:03d}_{idx}.png + <out>/t{vol}/index.json
# Cách dùng: python extract.py <vol 1|2> <out_dir>
import sys, os, re, json, glob
import pymupdf

vol, out = int(sys.argv[1]), sys.argv[2]
pdf = [f for f in glob.glob(r'E:\sach-co-tuong\*.pdf') if 'TRUNG' in f and f.rstrip('.pdf').endswith(str(vol))][0]
doc = pymupdf.open(pdf)
od = os.path.join(out, f't{vol}')
os.makedirs(od, exist_ok=True)
CAP = re.compile(r'H[ÌI]NH\s*(\d+)', re.I)
index = []
for pno, page in enumerate(doc, start=1):
    words = page.get_text('blocks')
    for j, info in enumerate(page.get_images(full=True)):
        xref = info[0]
        rects = page.get_image_rects(xref)
        if not rects:
            continue
        for k, rect in enumerate(rects):
            if rect.width < 90 or rect.height < 90:
                continue
            ar = rect.height / rect.width
            if not (0.95 <= ar <= 1.35):
                continue
            # render vùng ảnh từ trang (ổn định mọi định dạng ảnh nhúng), chuẩn hoá rộng ~720px
            z = 720.0 / rect.width
            pix = page.get_pixmap(matrix=pymupdf.Matrix(z, z), clip=rect, colorspace=pymupdf.csGRAY)
            # chú thích: block text chứa "Hình N" nằm ngay dưới ảnh (≤45pt) và chồng ngang
            cap = None
            best = 1e9
            for b in words:
                x0, y0, x1, y1, txt = b[0], b[1], b[2], b[3], b[4]
                m = CAP.search(txt.strip())
                if not m or len(txt.strip()) > 14:
                    continue
                if x1 < rect.x0 - 10 or x0 > rect.x1 + 10:
                    continue
                dy = y0 - rect.y1
                if -8 <= dy <= 45 and dy < best:
                    best, cap = dy, int(m.group(1))
            fn = f'p{pno:03d}_{j}{"_" + str(k) if k else ""}.png'
            pix.save(os.path.join(od, fn))
            index.append({'file': fn, 'page': pno, 'xref': xref, 'w': pix.width, 'h': pix.height,
                          'rect': [round(v, 1) for v in rect], 'caption': cap})
json.dump(index, open(os.path.join(od, 'index.json'), 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'vol {vol}: {len(index)} sơ đồ, có caption: {sum(1 for i in index if i["caption"])}')
