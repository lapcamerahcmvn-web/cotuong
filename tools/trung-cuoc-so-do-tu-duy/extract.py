# tools/trung-cuoc-so-do-tu-duy/extract.py — PDF trung cuộc sơ đồ tư duy (ổ E:, nội bộ) → probs.json [{sec, n, page, fen}]
#   python tools/trung-cuoc-so-do-tu-duy/extract.py "<file.pdf>" <probs.json>
# Bài tập cùng font cờ dạng chữ như sách sát cục liên hoàn (../sat-cuc-lien-hoan/README.md); `sec` = mã chương lấy từ
# tiêu đề "BÀI TẬP …" gần nhất phía trên, `n` = số "Bài n" trong chương.
import json, re, sys, os
import pymupdf
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'sat-cuc-lien-hoan'))
from extract import isrow, to_fen

SECS = [('SÁT CHIÊU', 'sat'), ('BẮT QUÂN', 'bat'), ('KHỐNG CHẾ', 'khong'), ('NGĂN CẢN', 'can'), ('PHẾ QUÂN', 'phe'),
        ('NHƯỢC ĐIỂM', 'nhuoc'), ('HỮU CƠ', 'lienhe'), ('5 HƯỚNG', 'huong'), ('TỔNG HỢP', 'tonghop')]


def main(pdf, out):
    doc = pymupdf.open(pdf)
    lines = []
    for i in range(doc.page_count):
        lines += [(i + 1, l.rstrip()) for l in doc[i].get_text().split('\n')]
    probs, sec, n, k = [], None, None, 0
    while k < len(lines):
        page, l = lines[k]
        s = l.strip()
        if s.startswith('BÀI TẬP') and '|' not in s:
            sec = next((c for key, c in SECS if key in s), sec)
        m = re.match(r'^Bài\s+(\d+)', s)
        if m: n = int(m.group(1))
        if isrow(l) and all(k + j < len(lines) and isrow(lines[k + j][1]) for j in range(10)):
            probs.append({'sec': sec, 'n': n, 'page': page, 'fen': to_fen([lines[k + j][1] for j in range(10)])})
            k += 10
            continue
        k += 1
    json.dump(probs, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
    from collections import Counter
    print(len(probs), 'bài →', out, dict(Counter(p['sec'] for p in probs)))


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
