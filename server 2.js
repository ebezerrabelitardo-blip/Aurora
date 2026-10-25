// Servidor multiplayer do Aurora: HTTP (jogo + /health) + WebSocket (salas por código, até 8 jogadores).
// Sem dependências externas: só Node.js 18+.
const http = require('http'), fs = require('fs'), path = require('path'), crypto = require('crypto');
const PORT = process.env.PORT || 3000, MAX = 8, PUB = __dirname;
const ORIGIN = process.env.ALLOWED_ORIGIN || '';
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.ico': 'image/x-icon' };
const rooms = new Map(), clients = new Set();
let nid = 0;
const log = (...a) => console.log(new Date().toISOString(), ...a);

const server = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split('?')[0]);
  if (u === '/health') {
    res.writeHead(200, { 'content-type': 'application/json' });
    return res.end(JSON.stringify({ ok: true, rooms: rooms.size, players: clients.size, uptime: process.uptime() | 0 }));
  }
  if (u !== '/' && u !== '/index.html') { res.writeHead(404); return res.end('404'); }   // só expõe o jogo
  fs.readFile(path.join(PUB, 'index.html'), (e, d) => {
    if (e) { res.writeHead(404); return res.end('index.html não encontrado'); }
    res.writeHead(200, { 'content-type': MIME['.html'] });
    res.end(d);
  });
});

function frame(op, payload) {
  const n = payload.length; let h;
  if (n < 126) h = Buffer.from([0x80 | op, n]);
  else if (n < 65536) { h = Buffer.alloc(4); h[0] = 0x80 | op; h[1] = 126; h.writeUInt16BE(n, 2); }
  else { h = Buffer.alloc(10); h[0] = 0x80 | op; h[1] = 127; h.writeBigUInt64BE(BigInt(n), 2); }
  return Buffer.concat([h, payload]);
}
const send = (c, o) => { if (!c.sock.destroyed) c.sock.write(frame(1, Buffer.from(JSON.stringify(o)))); };
const bcast = (r, o, ex) => { for (const c of r.c.values()) if (c !== ex) send(c, o); };

server.on('upgrade', (req, sock) => {
  const k = req.headers['sec-websocket-key'];
  if (!k || String(req.headers.upgrade).toLowerCase() !== 'websocket') return sock.destroy();
  if (ORIGIN && req.headers.origin && req.headers.origin !== ORIGIN) { sock.write('HTTP/1.1 403 Forbidden\r\n\r\n'); return sock.destroy(); }
  if (clients.size >= 400) { sock.write('HTTP/1.1 503 Service Unavailable\r\n\r\n'); return sock.destroy(); }
  const acc = crypto.createHash('sha1').update(k + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11').digest('base64');
  sock.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: ' + acc + '\r\n\r\n');
  const c = { sock, id: 'p' + (++nid), room: null, name: 'Jogador', buf: Buffer.alloc(0), frag: null, bucket: 80, last: Date.now(), alive: true };
  clients.add(c); sock.setNoDelay(true);
  sock.on('data', d => { c.buf = Buffer.concat([c.buf, d]); if (c.buf.length > 262144) return sock.destroy(); parse(c); });
  sock.on('close', () => { clients.delete(c); leave(c); });
  sock.on('error', () => sock.destroy());
  send(c, { t: 'hi', id: c.id });
});

function parse(c) {
  for (;;) {
    const b = c.buf; if (b.length < 2) return;
    const op = b[0] & 15, fin = b[0] & 128, masked = b[1] & 128; let len = b[1] & 127, off = 2;
    if (len === 126) { if (b.length < 4) return; len = b.readUInt16BE(2); off = 4; }
    else if (len === 127) { if (b.length < 10) return; len = Number(b.readBigUInt64BE(2)); off = 10; }
    if (!masked || len > 16384) return c.sock.destroy();
    if (b.length < off + 4 + len) return;
    const m = b.subarray(off, off + 4), p = Buffer.from(b.subarray(off + 4, off + 4 + len));
    for (let i = 0; i < len; i++) p[i] ^= m[i & 3];
    c.buf = b.subarray(off + 4 + len);
    if (op === 8) { c.sock.end(frame(8, Buffer.alloc(0))); return; }
    if (op === 9) { c.sock.write(frame(10, p)); continue; }
    if (op === 10) { c.alive = true; continue; }
    if (op === 0 || op === 1) {
      c.frag = op === 1 ? [p] : (c.frag || []).concat([p]);
      if (!fin) { if (c.frag.length > 16) return c.sock.destroy(); continue; }
      const t = Buffer.concat(c.frag).toString(); c.frag = null; handle(c, t);
    }
  }
}

const num = v => typeof v === 'number' && isFinite(v) && Math.abs(v) < 1e5;
function sanitizePres(d) {
  const o = {};
  for (const k of ['x', 'y', 'z', 'r', 'h']) if (num(d[k])) o[k] = d[k];
  if (d.s === 0 || d.s === 1) o.s = d.s;
  if (typeof d.n === 'string') o.n = d.n.slice(0, 16);
  if (typeof d.c === 'string' && /^[0-9]{4}$/.test(d.c)) o.c = d.c;
  return o;
}
const ALF = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const randCode = () => Array.from(crypto.randomBytes(6), b => ALF[b % ALF.length]).join('');

function handle(c, t) {
  const now = Date.now();
  c.bucket = Math.min(80, c.bucket + (now - c.last) / 1000 * 60); c.last = now;
  if (--c.bucket < 0) return;                       // limite ~60 mensagens/s por jogador
  let m; try { m = JSON.parse(t); } catch { return; }
  if (!m || typeof m.t !== 'string') return;
  if (m.t === 'create' || m.t === 'join') {
    if (c.room) return send(c, { t: 'err', e: 'Você já está em uma sala.' });
    c.name = String(m.name || 'Jogador').replace(/[^\p{L}\p{N} _-]/gu, '').slice(0, 16) || 'Jogador';
    let r;
    if (m.t === 'create') {
      let code; do { code = randCode(); } while (rooms.has(code));
      r = { code, c: new Map(), host: null, t0: Math.floor(now / 1000), pub: !!m.pub, pres: new Map() };
      rooms.set(code, r);
    } else {
      const code = String(m.code || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
      r = rooms.get(code);
      if (!r) return send(c, { t: 'err', e: 'Sala não encontrada.' });
      if (r.c.size >= MAX) return send(c, { t: 'err', e: 'Sala lotada (máximo 8 jogadores).' });
    }
    c.room = r; r.c.set(c.id, c); if (!r.host) r.host = c.id;
    send(c, { t: 'joined', id: c.id, code: r.code, t0: r.t0, host: r.host,
      peers: [...r.c.values()].filter(x => x !== c).map(x => ({ id: x.id, p: r.pres.get(x.id) || {} })) });
    bcast(r, { t: 'in', id: c.id }, c);
    log('entrou', r.code, c.id, r.c.size + '/' + MAX);
    return;
  }
  if (m.t === 'list') {
    return send(c, { t: 'list', rooms: [...rooms.values()].filter(r => r.pub && r.c.size < MAX)
      .map(r => ({ code: r.code, n: r.c.size, host: r.c.get(r.host) && r.c.get(r.host).name })) });
  }
  const r = c.room; if (!r) return;
  if (m.t === 'p' && m.d && typeof m.d === 'object') {
    const d = sanitizePres(m.d); r.pres.set(c.id, d); bcast(r, { t: 'p', f: c.id, d }, c);
  } else if (m.t === 'e' && /^[a-z][a-z0-9_.-]{0,31}$/.test(m.k || '')) {
    if (JSON.stringify(m.d === undefined ? 0 : m.d).length > 2048) return;
    bcast(r, { t: 'e', f: c.id, k: m.k, d: m.d }, c);
  } else if (m.t === 'leave') leave(c);
}

function leave(c) {
  const r = c.room; if (!r) return;
  c.room = null; r.c.delete(c.id); r.pres.delete(c.id);
  bcast(r, { t: 'out', id: c.id });
  if (r.host === c.id) { r.host = r.c.keys().next().value || null; if (r.host) bcast(r, { t: 'host', id: r.host }); }
  if (!r.c.size) { rooms.delete(r.code); log('sala encerrada', r.code); }
  log('saiu', r.code, c.id, r.c.size + '/' + MAX);
}

setInterval(() => {                                   // detecta conexões mortas
  for (const c of clients) { if (!c.alive) { c.sock.destroy(); continue; } c.alive = false; try { c.sock.write(frame(9, Buffer.alloc(0))); } catch {} }
}, 30000);

process.on('uncaughtException', e => log('erro', e && e.stack || e));
server.listen(PORT, () => log('Aurora servidor na porta', PORT));
module.exports = server;
