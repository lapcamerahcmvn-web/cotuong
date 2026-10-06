// Giữ lịch sử manifest sau mỗi `vite build` (emptyOutDir=false nên file hash cũ không bị xoá).
//   node tools/build-keep.mjs          → lưu public/build/manifests/<timestamp>.json
//   node tools/build-keep.mjs --prune  → xoá asset KHÔNG nằm trong 5 manifest gần nhất
// Lý do: HTML đã cache có thể còn trỏ tới asset của bản build trước — xoá ngay sẽ gây 404.
import fs from 'node:fs';
import path from 'node:path';

const buildDir = path.resolve('public/build');
const histDir = path.join(buildDir, 'manifests');
const KEEP = 5;

function filesOf(manifest) {
    const out = new Set();
    for (const entry of Object.values(manifest)) {
        if (entry.file) out.add(entry.file);
        (entry.css || []).forEach((f) => out.add(f));
        (entry.assets || []).forEach((f) => out.add(f));
    }
    return out;
}

fs.mkdirSync(histDir, { recursive: true });

if (process.argv.includes('--prune')) {
    const hist = fs.readdirSync(histDir).filter((f) => f.endsWith('.json')).sort().reverse();
    const keep = new Set();
    hist.slice(0, KEEP).forEach((f) => filesOf(JSON.parse(fs.readFileSync(path.join(histDir, f), 'utf8'))).forEach((x) => keep.add(x)));
    hist.slice(KEEP).forEach((f) => fs.unlinkSync(path.join(histDir, f)));
    const assetsDir = path.join(buildDir, 'assets');
    let removed = 0;
    for (const f of fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir) : []) {
        if (f.startsWith('.')) continue;   // giữ .htaccess (cache 1 năm cho asset có hash)
        if (!keep.has('assets/' + f)) { fs.unlinkSync(path.join(assetsDir, f)); removed++; }
    }
    console.log(`build-keep: giữ ${keep.size} file, xoá ${removed} file cũ.`);
} else {
    const src = path.join(buildDir, 'manifest.json');
    if (!fs.existsSync(src)) { console.error('Chưa có public/build/manifest.json'); process.exit(1); }
    const stamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
    fs.copyFileSync(src, path.join(histDir, stamp + '.json'));
    console.log(`build-keep: đã lưu manifests/${stamp}.json`);
}
