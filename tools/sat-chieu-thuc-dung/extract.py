# tools/sat-chieu-thuc-dung/extract.py — PDF sát chiêu thực dụng (ổ E:, nội bộ) → probs.json [{sec, label, page, fen}]
#   python tools/sat-chieu-thuc-dung/extract.py "<file.pdf>" <probs.json>
# Sơ đồ bài tập cùng font cờ dạng chữ như sách sát cục liên hoàn (xem ../sat-cuc-lien-hoan/README.md);
# `sec` = tiêu đề phần "BÀI TẬP ĐỘI HÌNH SÁT CHIÊU <đội hình> (n)" gần nhất phía trên.
import json, re, sys, os
import pymupdf
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'sat-cuc-lien-hoan'))
from extract import isrow, to_fen


def main(pdf, out):
    doc = pymupdf.open(pdf)
    lines = []
    for i in range(doc.page_count):
        lines += [(i, l.rstrip()) for l in doc[i].get_text().split('\n')]
    probs, sec, k = [], None, 0
    while k < len(lines):
        page, l = lines[k]
        s = l.strip()
        if s.startswith('BÀI TẬP') and 'ĐỘI HÌNH' in s: sec = re.sub(r'\s+', ' ', s)
        if isrow(l) and all(k + j < len(lines) and isrow(lines[k + j][1]) for j in range(10)):
            probs.append({'sec': sec, 'label': None, 'page': page, 'fen': to_fen([lines[k + j][1] for j in range(10)])})
            k += 10
            continue
        k += 1
    json.dump(probs, open(out, 'w', encoding='utf-8'), ensure_ascii=False)
    print(len(probs), 'bài →', out)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
