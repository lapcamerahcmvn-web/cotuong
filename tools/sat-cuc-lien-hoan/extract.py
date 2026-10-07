# tools/sat-cuc-lien-hoan/extract.py — PDF bài tập (ổ E:, nội bộ) → probs.json [{ch, n, page, fen, extra}]
#   python tools/sat-cuc-lien-hoan/extract.py "<file.pdf>" <probs.json>
# Sơ đồ là font cờ dạng chữ: 10 dòng × 9 ký tự; chữ thường = Đỏ, HOA = Đen (xem README.md).
import json, re, sys
import pymupdf

PIECE = {'k': 'K', 'a': 'A', 'e': 'B', 'h': 'N', 'r': 'R', 'c': 'C', 'p': 'P',
         'K': 'k', 'A': 'a', 'E': 'b', 'H': 'n', 'R': 'r', 'C': 'c', 'P': 'p'}
OK = set("0123456789%$^[];',./=" + chr(92)) | set(PIECE)


def isrow(line):
    return len(line) == 9 and all(c in OK for c in line)


def to_fen(rows):
    out = []
    for r in rows:
        s, e = '', 0
        for ch in r:
            if ch in PIECE:
                if e: s += str(e); e = 0
                s += PIECE[ch]
            else:
                e += 1
        out.append(s + (str(e) if e else ''))
    return '/'.join(out)


def main(pdf, out):
    doc = pymupdf.open(pdf)
    lines = []
    for i in range(doc.page_count):
        lines += [(i, l.rstrip()) for l in doc[i].get_text().split('\n')]
    probs, label, k = [], None, 0
    while k < len(lines):
        page, l = lines[k]
        m = re.match(r'^i\s*(\d+)\s*[-–]\s*(\d+)', l.strip())
        if m: label = (int(m.group(1)), int(m.group(2)))
        if isrow(l) and all(k + j < len(lines) and isrow(lines[k + j][1]) for j in range(10)):
            fen = to_fen([lines[k + j][1] for j in range(10)])
            if label and label == (10, 49) and page == 146: label = (10, 39)   # lỗi in nhãn trong sách
            probs.append({'ch': label[0] if label else 10, 'n': label[1] if label else 0, 'page': page, 'fen': fen,
                          'extra': None if label else 'thuc-chien-11'})
            label = None
            k += 10
            continue
        k += 1
    json.dump(probs, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    print(len(probs), 'bài →', out)


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
