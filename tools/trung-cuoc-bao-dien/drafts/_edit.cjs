// Tạm: chỉnh _src.cjs. node drafts/_edit.cjs <json-ops>  — ops: [{cut:[id,n]}|{rep:[a,b]}|{drop:id}]
const fs = require('fs');
const f = __dirname + '/_src.cjs';
let s = fs.readFileSync(f, 'utf8');
const ops = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
for (const op of ops) {
  if (op.rep) { if (!s.includes(op.rep[0])) throw new Error('missing ' + op.rep[0]); s = s.replace(op.rep[0], op.rep[1]); }
  if (op.cut) {
    const [id, n] = op.cut; const key = '{id:' + id + ',';
    const i = s.indexOf(key); if (i < 0) throw new Error('no id ' + id);
    const m0 = s.indexOf('main:S("', i) + 8, m1 = s.indexOf('")', m0);
    s = s.slice(0, m0) + s.slice(m0, m1).split(' ').slice(0, n).join(' ') + s.slice(m1);
    if (op.novars) { const j = s.indexOf('\n {id:', i + 1); const end = j < 0 ? s.lastIndexOf('\n];') : j;
      const seg = s.slice(i, end).replace(/\),\n  vars:\[[\s\S]*\]\},?$/, ')},'); s = s.slice(0, i) + seg + s.slice(end); }
  }
}
fs.writeFileSync(f, s);
console.log('ok');
