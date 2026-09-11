"""Nén ảnh OG (giảm palette) — chạy SAU generate.cjs. CHỈ LOCAL.

    python tools/og-image/optimize.py

Ảnh OG toàn màu phẳng (nền giấy dó, bàn gỗ, ít màu) nên giảm về palette 128 màu
gần như không đổi hình mà nhẹ ~65%. Cần: pip install pillow
"""
import glob
import os
from PIL import Image

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
DIRS = [
    os.path.join(ROOT, "public", "og", "lessons"),
    os.path.join(ROOT, "public", "og", "series"),
    os.path.join(ROOT, "public", "og", "thumbs", "lessons"),
    os.path.join(ROOT, "public", "og", "thumbs", "series"),
    os.path.join(ROOT, "public", "og"),  # home.png + phase-*.png
]

before = after = n = 0
for d in DIRS:
    for f in glob.glob(os.path.join(d, "*.png")):
        b = os.path.getsize(f)
        im = Image.open(f).convert("RGB")
        q = im.quantize(colors=128, method=Image.MEDIANCUT, dither=Image.NONE)
        q.save(f, optimize=True)
        a = os.path.getsize(f)
        before += b
        after += a
        n += 1

print(f"{n} ảnh: {before/1e6:.1f}MB -> {after/1e6:.1f}MB")
