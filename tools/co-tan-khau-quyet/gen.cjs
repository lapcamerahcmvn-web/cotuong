// Sinh batch "Cờ Tàn Có Khẩu Quyết" → tools/trung-cuoc-bao-dien/batches/co-tan-khau-quyet.json
const fs = require('fs');
const OUT = 'D:/wamp64/www/cotuong/tools/trung-cuoc-bao-dien/batches/co-tan-khau-quyet.json';
const drafts = require('D:/wamp64/www/cotuong/tools/trung-cuoc-bao-dien/drafts/ctkq.json');
const DATA = Object.assign({}, require('./data-c.cjs'), require('./data-m.cjs'), require('./data-p.cjs'), require('./data-xa.cjs'), require('./data-xb.cjs'), require('./data-xcde.cjs'));

const SER = {
  name: 'Cờ Tàn Có Khẩu Quyết', slug: 'co-tan-co-khau-quyet', game_mode: 'co-tuong', phase: 'tan-cuoc', sort_order: 3, planned_total: 0,
  description: 'Hơn 300 thế cờ tàn thực dụng từ tàn Chốt, Mã, Pháo đến Xe — mỗi thế có khẩu quyết dễ nhớ, biến hóa nước đi trên bàn cờ tương tác và nút cho máy tự giải.',
};
const P = 'co-tan-khau-quyet-';
const SAT = (s, t) => `<a href="/bai-hoc/${s}">${t}</a>`;
const SERL = (s, t) => `<a href="/chuong-trinh/${s}">${t}</a>`;

// ---------- tiện ích ----------
const slugify = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const NAME = { R: 'Xe', C: 'Pháo', N: 'Mã', P: 'Chốt', A: 'Sĩ', B: 'Tượng' };
const VAL = { R: 9, C: 4.5, N: 4, P: 1.5, A: 2, B: 2 };
function material(fen) {
  const cnt = { red: {}, black: {} };
  for (const ch of fen.split(' ')[0]) {
    if (!/[a-zA-Z]/.test(ch) || /[kK]/.test(ch)) continue;
    const side = ch === ch.toUpperCase() ? 'red' : 'black', k = ch.toUpperCase();
    cnt[side][k] = (cnt[side][k] || 0) + 1;
  }
  const txt = (c) => ['Tướng'].concat(['R', 'C', 'N', 'P', 'A', 'B'].filter(k => c[k]).map(k => (c[k] > 1 ? c[k] + ' ' : '') + NAME[k])).join(', ');
  const val = (c) => Object.entries(c).reduce((s, [k, n]) => s + VAL[k] * n, 0);
  return { red: txt(cnt.red), black: txt(cnt.black), strong: 'Đỏ', weak: 'Đen' };  // trong bộ thế này Đỏ luôn là bên tấn công (giá trị quân không phản ánh tàn cuộc)
}
const num = (id) => { const k = id.split('-')[1]; return isNaN(+k) ? 999 : +k; };

// ---------- nhóm ----------
const GROUPS = [
  { key: 'c', name: 'Chốt', title: 'Cờ Tàn Chốt', subs: { a: 'Một Chốt', b: 'Hai Chốt', c: 'Ba Chốt', d: 'Bài tập rèn luyện' },
    sat: [SERL('48-bai-nguyen-ly-tan-cuoc', '48 Bài Nguyên Lý Tàn Cuộc')], level: 'co-ban',
    intro: 'Tàn Chốt là nền móng của mọi thế tàn: ở giai đoạn cuối, một Chốt có thể quyết định thắng hòa. Ba ý xuyên suốt nhóm này: <strong>Chốt kẹp nách</strong> (đứng sát cửa cung) để khóa Tướng, <strong>Tướng trợ công</strong> chiếm mặt còn lại, và <strong>Chốt cao – Chốt thấp – Chốt lụt</strong> có giá trị rất khác nhau. Bên giữ hòa thì ngược lại: dùng Tướng chiếm mặt, Sĩ Tượng che chắn, tránh hết nước đi.' },
  { key: 'm', name: 'Mã', title: 'Cờ Tàn Mã', subs: { a: 'Một Mã', b: 'Mã Chốt', c: 'Hai Mã' },
    sat: [SAT('sat-phap-song-ma-chot', 'Sát pháp Song Mã Chốt'), SAT('sat-phap-phao-ma-chot', 'Sát pháp Pháo Mã Chốt'), SAT('sat-phap-phao-song-ma', 'Sát pháp Pháo Song Mã')], level: 'trung-cap',
    intro: 'Mã là quân linh hoạt nhất trong tàn cuộc nhưng đi chậm, nên mỗi chân Mã đều phải tính trước. Các đòn then chốt: <strong>Mã ngọa tào</strong>, <strong>Mã khấu</strong> (Mã sát cạnh Tướng phía ngoài), <strong>Mã điền</strong>, <strong>Song Mã ẩm tuyền</strong>; cùng các điểm khóa quen thuộc như hoa Chốt lộ 7, hoa Pháo. Tướng phải luôn trợ công — “Tướng khóa Mã” là đòn dùng rất nhiều.' },
  { key: 'p', name: 'Pháo', title: 'Cờ Tàn Pháo', subs: { a: 'Một Pháo', b: 'Pháo Chốt', c: 'Hai Pháo' },
    sat: [SAT('sat-phap-song-phao-chot', 'Sát pháp Song Pháo Chốt'), SAT('sat-phap-phao-ma-chot', 'Sát pháp Pháo Mã Chốt'), SAT('sat-phap-ma-song-phao', 'Sát pháp Mã Song Pháo')], level: 'trung-cap',
    intro: 'Pháo cần ngòi: trong tàn cuộc, ngòi thường là chính Sĩ Tượng hoặc Tướng của mình (“lấy Tướng làm ngòi”, “lấy Sĩ làm ngòi”). Nhóm này rèn các ý: <strong>Pháo canh trung lộ</strong>, <strong>Pháo giác</strong>, <strong>Pháo đầu</strong>, <strong>nước thoát ngòi</strong>, đổi một Chốt lấy hai Sĩ; và các hình hòa cơ bản mà bên ít quân cần thuộc lòng.' },
  { key: 'x', name: 'Xe', title: 'Cờ Tàn Xe', subs: { a: 'Đơn Xe', b: 'Xe Chốt', c: 'Xe Mã', d: 'Xe Pháo', e: 'Song Xe' },
    sat: [SAT('sat-phap-xe-ma-chot', 'Sát pháp Xe Mã Chốt'), SAT('sat-phap-xe-phao-chot', 'Sát pháp Xe Pháo Chốt'), SAT('sat-phap-song-xe-chot', 'Sát pháp Song Xe Chốt'), SAT('sat-phap-xe-phao-ma', 'Sát pháp Xe Pháo Mã')], level: 'nang-cao',
    intro: 'Tàn Xe là phần rộng nhất: đơn Xe đối các tổ hợp phòng thủ, Xe Chốt, Xe Mã, Xe Pháo và Song Xe. Khẩu quyết lặp đi lặp lại: <strong>khống chế trung lộ</strong>, làm <strong>Tượng méo</strong> rồi bắt, <strong>bắt đôi</strong>, dụ Tướng lên tầng 2–3, các đòn có tên như <strong>Trắc diện hổ, Mã khấu, Thiết môn thuyên, Mò trăng đáy bể, Đại đao xuyên tâm</strong>. Bên giữ hòa thì phải nhớ đúng “hình hòa duy nhất” của từng tổ hợp.' },
];
const SUBSAT = { // liên hệ sát chiêu riêng theo nhóm con
  ma: SAT('sat-phap-song-ma-chot', 'Sát pháp Song Mã Chốt'), mb: SAT('sat-phap-phao-ma-chot', 'Sát pháp Pháo Mã Chốt'), mc: SAT('sat-phap-phao-song-ma', 'Sát pháp Pháo Song Mã'),
  pa: SAT('sat-phap-song-phao-chot', 'Sát pháp Song Pháo Chốt'), pb: SAT('sat-phap-song-phao-chot', 'Sát pháp Song Pháo Chốt'), pc: SAT('sat-phap-ma-song-phao', 'Sát pháp Mã Song Pháo'),
  xa: SAT('sat-phap-song-xe-chot', 'Sát pháp Song Xe Chốt'), xb: SAT('sat-phap-xe-ma-chot', 'Sát pháp Xe Mã Chốt'), xc: SAT('sat-phap-xe-ma-chot', 'Sát pháp Xe Mã Chốt'),
  xd: SAT('sat-phap-xe-phao-chot', 'Sát pháp Xe Pháo Chốt'), xe: SAT('sat-phap-song-xe-phao', 'Sát pháp Song Xe Pháo'),
};

const L = [];
let ord = 0;
function T(slug, title, summary, seo_title, seo_description, content) {
  ord += 10; L.push({ order: ord, slug: P + slug, title, level: 'co-ban', summary, seo_title, seo_description, content });
}

// ---------- bài lý thuyết ----------
T('tong-quan', 'Cờ Tàn Có Khẩu Quyết — Tổng Quan Và 6 Nguyên Tắc Tàn Cuộc',
  'Vì sao nên học cờ tàn trước, hai loại tàn cuộc (nghệ thuật và thực dụng), 6 nguyên tắc cơ bản của giai đoạn tàn cuộc và cách học bằng khẩu quyết.',
  'Cờ Tàn Có Khẩu Quyết — 6 Nguyên Tắc Tàn Cuộc',
  '6 nguyên tắc cơ bản của tàn cuộc cờ tướng và lộ trình học hơn 300 thế tàn Chốt, Mã, Pháo, Xe bằng khẩu quyết, có biến hóa và máy tự giải.',
  `<h2>Tàn cuộc là gì</h2><p>Khi lực lượng hai bên đã tiêu hao, mỗi bên chỉ còn một hai quân chiến đấu và vài Chốt, ván cờ bước vào tàn cuộc — giai đoạn quyết định. Nhiệm vụ rất rõ: <strong>bên ưu</strong> phải biến ưu thế thành thắng, <strong>bên kém</strong> phải thủ thật chắc để về hòa, còn khi cân bằng thì tìm cách giành ưu.</p>
<h2>Tàn cuộc thực dụng và “khẩu quyết”</h2><p>Có hai loại tàn cuộc: loại nghệ thuật (cờ thế, đặt ra để thưởng thức, thường chỉ một lời giải) và loại thực dụng — các thế cơ bản rút từ ván đấu thật. Chuyên đề này thuộc loại thứ hai. Mỗi thế được tóm thành vài câu <strong>khẩu quyết</strong> ngắn gọn để nhớ lâu: Chốt đứng đâu, Tướng chiếm mặt nào, đòn nào kết thúc. Khi gặp thế tương tự trong ván thật, bạn chỉ cần nhận ra hình và áp dụng.</p>
<p>Lời khuyên quen thuộc của nhiều thầy dạy cờ: <strong>học cờ tàn trước</strong>. Ít quân thì dễ phân tích, dễ thấy tác dụng của từng quân, từ đó mới tiếp thu được các đòn phối hợp phức tạp ở trung cuộc.</p>
<h2>6 nguyên tắc cơ bản của tàn cuộc</h2><ul>
<li><strong>Quân đứng linh hoạt và liên hoàn.</strong> Quân ít thì mỗi quân càng quý; đứng kẹt hoặc rời rạc là yếu đi, khó bảo vệ nhau và bảo vệ Tướng.</li>
<li><strong>Giữ gìn mọi quân, nhưng sẵn sàng hy sinh đúng lúc.</strong> Đang ưu thì đừng đổi quân khi chưa đưa được về thế thắng điển hình; nhưng có cơ hội thì mạnh dạn bỏ quân để kết thúc. Đang kém thì bỏ quân đúng chỗ có thể đưa về thế hòa điển hình.</li>
<li><strong>Công phải lo thủ, thủ phải sẵn sàng phản công.</strong> Mải tấn công dễ bị phản đòn; chỉ biết chống đỡ thì bỏ lỡ sai lầm của đối phương.</li>
<li><strong>Chiếm các trục lộ 4, 5, 6</strong> — đường dẫn tới Tướng đối phương — nhưng đừng xem nhẹ đường ngang và đường biên khi điều quân.</li>
<li><strong>Tướng, Sĩ, Tượng cũng là lực lượng tấn công.</strong> Trong tàn cuộc, “mặt Tướng” thường quyết định thắng; Sĩ Tượng làm ngòi, che chắn. Khi kém thế thì giữ chặt chúng để về hòa.</li>
<li><strong>Đánh giá đúng vai trò của Chốt.</strong> Yểm trợ Chốt sang sông và bảo vệ nó; không vội đẩy Chốt xuống sâu khi chưa có kế hoạch; dùng Chốt làm quân xung kích phá Sĩ Tượng.</li></ul>
<h2>Lộ trình chuyên đề</h2><p>Đi theo thứ tự <strong>Chốt → Mã → Pháo → Xe</strong>, từ ít quân đến nhiều quân. Mỗi bài có: thế cờ trên bàn tương tác, khẩu quyết, nhánh biến (đi sai thì sao), và nút <strong>Máy tự giải</strong> để xem máy đi thế cờ từ đầu hoặc <strong>Đánh thử với máy</strong> để tự kiểm chứng khẩu quyết.</p>
<p>Học xong các thế tàn, hãy nối sang mảng sát cục: ${SERL('sat-phap-13-doi-hinh', 'Sát Pháp Thực Dụng 13 Đội Hình')} — nhiều thế tàn thắng kết thúc đúng bằng các đòn sát trong đó.</p>`);

T('tu-tan-cuoc-den-sat-chieu', 'Từ Tàn Cuộc Đến Sát Chiêu — 4 Câu Hỏi Tư Duy Công Sát',
  'Cách nghĩ khi đứng trước một thế cờ ít quân: đã gặp hình này chưa, có phải sát liên hoàn không, đội hình công sát nào, đòn nào mạnh nhất — và nguyên tắc đánh vào điểm yếu.',
  'Tư Duy Công Sát Trong Tàn Cuộc Cờ Tướng',
  '4 câu hỏi tư duy công sát giúp chuyển thế tàn cuộc thành đòn sát: nhận hình, sát liên hoàn, chọn đội hình 13 đội hình sát chiêu, chọn đòn mạnh nhất.',
  `<h2>Tàn cuộc và sát chiêu là một mạch</h2><p>Rất nhiều thế tàn thắng kết thúc bằng một đòn sát quen thuộc: Mã khấu, Trắc diện hổ, Thiết môn thuyên, Đại đao xuyên tâm… Vì vậy học tàn cuộc nên đi đôi với học <strong>đội hình sát chiêu</strong> — các bộ ba quân phối hợp (Xe Pháo Mã, Xe Song Pháo, Song Xe Chốt…). Trên web đã có chuyên đề ${SERL('sat-phap-13-doi-hinh', 'Sát Pháp Thực Dụng 13 Đội Hình')} trình bày đủ 13 đội hình này.</p>
<h2>Bốn câu hỏi trước mỗi nước công</h2><ul>
<li><strong>Hình cờ này đã gặp chưa?</strong> Có hình tương tự không, có đưa về được hình đã học không? Đây chính là tinh thần “đưa về bài đã học” lặp lại trong các khẩu quyết tàn cuộc.</li>
<li><strong>Có phải thế sát liên hoàn không,</strong> hay chỉ là các nước dọa sát? Nếu có chuỗi chiếu hết thì tính trọn chuỗi trước.</li>
<li><strong>Đây là loại đội hình công sát nào?</strong> Xe Mã, Xe Pháo, Xe Song Pháo…? Chọn đúng các quân chủ lực cho đội hình; mang quân mạnh nhất đi đánh, để lại quân phòng thủ hợp lý; đừng kéo theo quân thừa làm đòn công yếu và chậm.</li>
<li><strong>Trong đội hình đó có đòn nào đã học, đòn nào mạnh nhất lúc này?</strong></li></ul>
<h2>Nguyên tắc vàng</h2><p>Mang đội hình đi đánh phải đánh vào <strong>điểm yếu</strong> của đối phương (Sĩ treo, Tượng méo, Tướng lộ, quân bị cô). Đánh vào chỗ mạnh chỉ hao tổn binh lực vô ích.</p>
<h2>Áp dụng trong chuyên đề</h2><p>Mỗi bài tàn cuộc ở đây có mục “Liên hệ sát chiêu” trỏ sang đội hình sát tương ứng. Khi bấm <strong>Máy tự giải</strong>, hãy để ý máy kết thúc ván bằng đòn nào — đó thường chính là một đòn trong 13 đội hình.</p>`);

// ---------- bài thế cờ ----------
const ids = new Set(drafts.map(d => d.id));
for (const k of Object.keys(DATA)) if (!ids.has(k)) throw new Error('data thừa ' + k);
const slugs = new Set();
for (const G of GROUPS) {
  const subs = Object.keys(G.subs);
  const listItems = subs.map(s => {
    const n = drafts.filter(d => d.id.startsWith(G.key + s + '-')).length;
    return `<li><strong>${G.subs[s]}</strong> — ${n} thế</li>`;
  }).join('');
  T('chuong-' + slugify(G.name), `${G.title} — Khẩu Quyết Chung`,
    `${G.title}: các nhóm ${subs.map(s => G.subs[s]).join(', ')}. Ý chính và khẩu quyết chung trước khi vào từng thế.`,
    `${G.title} Có Khẩu Quyết — Cờ Tướng`, `${G.title} cờ tướng có khẩu quyết dễ nhớ: ${subs.map(s => G.subs[s]).join(', ')}. Bàn cờ tương tác, biến hóa và máy tự giải.`,
    `<h2>Ý chính</h2><p>${G.intro}</p><h2>Các nhóm thế cờ</h2><ul>${listItems}</ul><h2>Liên hệ sát chiêu</h2><p>Ôn kèm: ${G.sat.join(', ')}.</p>`);
  for (const s of subs) {
    const list = drafts.filter(d => d.id.startsWith(G.key + s + '-')).sort((a, b) => num(a.id) - num(b.id));
    for (const d of list) {
      const x = DATA[d.id]; if (!x) throw new Error('thiếu data ' + d.id);
      const [name, res, kq, caps = {}, vcaps = {}] = x;
      const m = material(d.fen);
      let slug = P + slugify(name); if (slugs.has(slug)) slug += '-' + d.id; slugs.add(slug);
      const first = d.first === 'den' ? 'Đen' : 'Đỏ';
      const resTxt = res === 'thang' ? `${m.strong} thắng` : res === 'kheo' ? `${m.strong} khéo thắng (phải đi thật chính xác)` : res === 'hoa' ? `Hòa — ${m.weak} giữ được nếu thủ đúng khẩu quyết` : 'Bài tập tự giải';
      const captions = Object.assign({}, caps);
      const nm = d.main.length;
      if (nm && !captions[nm]) captions[nm] = res === 'hoa' ? 'Hòa cờ.' : `Hết biến chính — ${m.strong} thắng.`;
      let content = `<h2>Thế cờ</h2><p><strong>Đỏ:</strong> ${m.red}. <strong>Đen:</strong> ${m.black}. ${first} đi trước.</p><p><strong>Kết quả:</strong> ${resTxt}.</p>`;
      content += `<h2>Khẩu quyết</h2><ul>${kq.map(t => `<li>${t}</li>`).join('')}</ul>`;
      if (!nm) content += `<h2>Bài tập</h2><p>Thế cờ này không kèm lời giải: hãy tự suy nghĩ theo khẩu quyết, đi thử trên bàn, rồi bấm <strong>Máy tự giải</strong> bên dưới bàn cờ để đối chiếu cách máy xử lý.</p>`;
      else if (d.vars.length) content += `<h2>Biến hóa</h2><p>Ngoài biến chính, bàn cờ có <strong>${d.vars.length} nhánh biến</strong>${res === 'hoa' ? ' — nhiều nhánh là những nước thủ sai dẫn tới thua' : ''}. Tại điểm rẽ, chọn mũi tên A/B hoặc nút “Chọn biến” để xem từng nhánh.</p>`;
      content += `<h2>Cho máy tự giải</h2><p>Bấm <strong>Máy tự giải</strong> dưới bàn cờ để máy đi cả hai bên từ thế mở đầu, hoặc <strong>Đánh thử với máy</strong> để tự cầm ${first} kiểm chứng khẩu quyết. Máy có thể chọn đường khác sách nhưng kết quả ${res === 'hoa' ? 'hòa' : 'thắng'} sẽ cho thấy khẩu quyết đúng ở đâu.</p>`;
      content += SUBSAT[G.key + s]
        ? `<h2>Liên hệ sát chiêu</h2><p>Đòn kết thúc của nhóm thế này hay gặp trong ${SUBSAT[G.key + s]}. Xem thêm: ${SAT(P + 'tu-tan-cuoc-den-sat-chieu', 'Từ tàn cuộc đến sát chiêu')} và ${SAT(P + 'tong-quan', '6 nguyên tắc tàn cuộc')}.</p>`
        : `<h2>Học thêm</h2><p>Ôn nguyên lý tàn cuộc trong chuyên đề ${SERL('48-bai-nguyen-ly-tan-cuoc', '48 Bài Nguyên Lý Tàn Cuộc')} và ${SAT(P + 'tong-quan', '6 nguyên tắc tàn cuộc')}.</p>`;
      const summary = (`${m.red} đối ${m.black} — ${resTxt}. Khẩu quyết: ${kq[0]}`).slice(0, 300);
      ord += 10;
      L.push({ order: ord, slug, title: `${G.title} · ${name}`, level: G.level, draft: 'ctkq#' + d.id,
        summary, seo_title: (`${name} — Cờ Tàn ${G.name}`).slice(0, 70),
        seo_description: (`${name}: khẩu quyết ${resTxt.toLowerCase()}, biến hóa trên bàn cờ tương tác và máy tự giải. ${kq[0]}`).slice(0, 160),
        content, captions, var_caps: vcaps });
    }
  }
}
SER.planned_total = L.length;
fs.writeFileSync(OUT, JSON.stringify({ series: SER, lessons: L }, null, 1));
console.log('lessons', L.length);
