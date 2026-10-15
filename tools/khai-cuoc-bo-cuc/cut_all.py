#!/usr/bin/env python3
# Cắt mọi sơ đồ của 1 cuốn: python cut_all.py <thư mục trang pNNN.png> <thư mục ra>  → <ra>/pNNN_k.png + index.json
import sys, os, json, glob, cv2
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from find_boards import find
src, out = sys.argv[1], sys.argv[2]
os.makedirs(out, exist_ok=True)
idx = {}
for f in sorted(glob.glob(os.path.join(src, 'p*.png'))):
    g, bs = find(f)
    base = os.path.splitext(os.path.basename(f))[0]
    for k, (a, b, c, d) in enumerate(bs):
        cv2.imencode('.png', g[b:d, a:c])[1].tofile(os.path.join(out, f'{base}_{k}.png'))
    if bs: idx[base] = [[int(v) for v in b] for b in bs]
json.dump(idx, open(os.path.join(out, 'index.json'), 'w'), indent=0)
print(len(idx), 'trang có sơ đồ,', sum(len(v) for v in idx.values()), 'sơ đồ')
