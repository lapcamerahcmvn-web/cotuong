const iconv = require('iconv-lite');
const { decodeFile } = require('./decode.js');

const files = [
  'E:/Co Tuong/Sup tam/Co The/166 the phan cong ma cua HVH - xqf/胡荣华反宫马对局大全（166局）/19830610赵庆阁负胡荣华.XQF',
  'E:/Co Tuong/CCBridge Co Tuong/CBL/Phao Dau Vs Binh Phong Ma/其他和冷僻部分/布局陷阱--中炮对拐角马.XQF',
  'E:/Co Tuong/CCBridge Co Tuong/CBL/Phao Dau Vs Binh Phong Ma/0 红进7兵后8炮巡河 老式.XQF',
];

const gbk = (s) => iconv.decode(Buffer.from(s, 'latin1'), 'gbk');
const STANDARD_START = 'rnbakabnr/9/1c5c1/p1p1p1p1p/9/9/P1P1P1P1P/1C5C1/9/RNBAKABNR';

for (const f of files) {
  console.log('='.repeat(60));
  const r = decodeFile(f);
  console.log('File:', f.split('/').pop());
  console.log('Version:', r.version_hex);
  console.log('Title (GBK):', gbk(r.title_raw));
  console.log('Match (GBK):', gbk(r.match_name));
  console.log('Red (GBK):', gbk(r.red_player), '| Black (GBK):', gbk(r.blk_player));
  console.log('FEN:', r.fen_initial);
  console.log('Matches standard start position:', r.fen_initial === STANDARD_START);
  console.log('Move count:', r.move_count);
  if (r.moves.length) {
    console.log('First 5 moves:', r.moves.slice(0, 5).map(m => `${m.from}->${m.to}`).join(', '));
  }
  if (r.annotations.length) {
    console.log('Sample annotation (GBK):', gbk(r.annotations[0].text).slice(0, 100));
  }
  console.log('Warnings:', r.decode_warnings.length, r.decode_warnings.slice(0, 3));
}
