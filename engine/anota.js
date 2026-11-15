// TRAMA · anotaciones dibujadas a mano sobre fotos, pinturas y mapas reales (biblia, sección 21).
// Todo se mueve FLUIDO (sin pasos de 15 fps): cámara, trazos y unidades usan curvas de easing continuas.
// Requiere engine/trama.js (svgEl, clamp, easeIO, easeOut, hash).

const _probe = (() => { const s = document.createElementNS(SVGNS, 'svg'); s.style.cssText = 'position:absolute;width:0;height:0'; document.documentElement.appendChild(s); return s; })();
function samplePath(d, n = 120) {
  const p = svgEl('path', { d }, _probe); const L = p.getTotalLength(); const pts = [];
  for (let i = 0; i <= n; i++) { const q = p.getPointAtLength(L * i / n); pts.push([q.x, q.y]); }
  p.remove(); pts.L = L; return pts;
}
const ease = { io: k => k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2, out: k => 1 - Math.pow(1 - k, 3), outQ: k => 1 - Math.pow(1 - k, 4) };

// Trazo de pincel: polígono de ancho variable (fino → grueso → fino) con leve temblor orgánico.
function brushD(pts, k, w, seed = 1, taper = [0.25, 0.55]) {
  const n = Math.max(2, Math.round((pts.length - 1) * clamp(k))); if (k <= 0) return '';
  const L = [], R = [];
  for (let i = 0; i <= n; i++) {
    const a = pts[Math.max(0, i - 1)], b = pts[Math.min(pts.length - 1, i + 1)], p = pts[i];
    let nx = -(b[1] - a[1]), ny = b[0] - a[0]; const m = Math.hypot(nx, ny) || 1; nx /= m; ny /= m;
    const u = i / (pts.length - 1);
    const prof = Math.min(1, Math.min(u / taper[0], (1 - u) / (1 - taper[1]) + .35)) ;
    const wob = 1 + (hash(seed * 31 + i * .7) - .5) * .18;
    const ww = w * Math.max(.18, prof) * wob / 2;
    L.push([p[0] + nx * ww, p[1] + ny * ww]); R.push([p[0] - nx * ww, p[1] - ny * ww]);
  }
  const all = L.concat(R.reverse());
  let d = `M${all[0][0].toFixed(1)} ${all[0][1].toFixed(1)}`;
  for (let i = 1; i < all.length - 1; i++) { const mx = (all[i][0] + all[i + 1][0]) / 2, my = (all[i][1] + all[i + 1][1]) / 2; d += ` Q${all[i][0].toFixed(1)} ${all[i][1].toFixed(1)} ${mx.toFixed(1)} ${my.toFixed(1)}`; }
  return d + 'Z';
}

// Flecha a mano: cuerpo de pincel + punta hecha con dos trazos que se dibujan al final.
function handArrow(parent, d, { color = '#EE6A1F', w = 30, seed = 1, shadow = true, head = 1 } = {}) {
  const g = svgEl('g', {}, parent); const pts = samplePath(d, 140);
  const sh = shadow ? svgEl('path', { fill: 'rgba(23,20,15,.55)', transform: 'translate(6,7)' }, g) : null;
  const body = svgEl('path', { fill: color }, g);
  const hs = shadow ? [svgEl('path', { fill: 'rgba(23,20,15,.55)', transform: 'translate(6,7)' }, g), svgEl('path', { fill: 'rgba(23,20,15,.55)', transform: 'translate(6,7)' }, g)] : [];
  const h1 = svgEl('path', { fill: color }, g), h2 = svgEl('path', { fill: color }, g);
  const e = pts[pts.length - 1], b = pts[pts.length - 6]; const ang = Math.atan2(e[1] - b[1], e[0] - b[0]);
  const hl = w * 2.3 * head;
  const mk = s => { const a = ang + Math.PI + s * 0.62; return samplePath(`M${e[0]} ${e[1]} Q${e[0] + Math.cos(a) * hl * .5 + s * 3} ${e[1] + Math.sin(a) * hl * .5} ${e[0] + Math.cos(a) * hl} ${e[1] + Math.sin(a) * hl}`, 20); };
  g._a = { pts, body, sh, h1, h2, hs, p1: mk(1), p2: mk(-1), w, seed };
  setHandArrow(g, 0); return g;
}
function setHandArrow(g, k) {
  const a = g._a; k = clamp(k); g.style.display = k <= 0 ? 'none' : 'block'; if (k <= 0) return;
  const kb = ease.out(clamp(k / .85)); const dd = brushD(a.pts, kb, a.w, a.seed, [.12, .9]);
  a.body.setAttribute('d', dd); if (a.sh) a.sh.setAttribute('d', dd);
  const kh = ease.out(clamp((k - .8) / .2));
  const d1 = brushD(a.p1, kh, a.w * .8, a.seed + 3, [.05, .5]), d2 = brushD(a.p2, kh, a.w * .8, a.seed + 5, [.05, .5]);
  a.h1.setAttribute('d', d1); a.h2.setAttribute('d', d2); if (a.hs.length) { a.hs[0].setAttribute('d', d1); a.hs[1].setAttribute('d', d2); }
}

// Círculo de marcador: algo más de una vuelta, irregular, con el trazo que se superpone al cerrar.
function handCircle(parent, cx, cy, rx, ry, { color = '#F3A72B', w = 16, seed = 2, turns = 1.18, rot = -12 } = {}) {
  const N = 90, pts = [];
  for (let i = 0; i <= N; i++) { const u = i / N, th = (rot * Math.PI / 180) + u * turns * Math.PI * 2; const r = 1 + (hash(seed + Math.floor(u * 6)) - .5) * .07 + u * .06;
    pts.push([cx + Math.cos(th) * rx * r, cy + Math.sin(th) * ry * r]); }
  const g = svgEl('g', {}, parent); const p = svgEl('path', { fill: color, opacity: .95 }, g); g._c = { pts, p, w, seed }; setHandCircle(g, 0); return g;
}
function setHandCircle(g, k) { const c = g._c; k = clamp(k); g.style.display = k <= 0 ? 'none' : 'block'; if (k > 0) c.p.setAttribute('d', brushD(c.pts, ease.io(k), c.w, c.seed, [.08, .92])); }

// Subrayado / tachado a mano.
function handLine(parent, d, opts = {}) { const g = svgEl('g', {}, parent); const pts = samplePath(d, 60); const p = svgEl('path', { fill: opts.color || '#F3A72B' }, g); g._l = { pts, p, w: opts.w || 14, seed: opts.seed || 4 }; setHandLine(g, 0); return g; }
function setHandLine(g, k) { const l = g._l; k = clamp(k); g.style.display = k <= 0 ? 'none' : 'block'; if (k > 0) l.p.setAttribute('d', brushD(l.pts, ease.io(k), l.w, l.seed, [.1, .9])); }

// Unidad de mapa (estilo atlas): rectángulo redondeado con borde de tinta y sombra dura, que viaja por una curva.
function unit(parent, { w = 110, h = 34, color = '#EE6A1F', label = '' } = {}) {
  const g = svgEl('g', {}, parent);
  svgEl('rect', { x: -w / 2 + 6, y: -h / 2 + 7, width: w, height: h, rx: 8, fill: 'rgba(23,20,15,.6)' }, g);
  svgEl('rect', { x: -w / 2, y: -h / 2, width: w, height: h, rx: 8, fill: color, stroke: '#17140F', 'stroke-width': 5 }, g);
  for (let i = 1; i < 4; i++) svgEl('line', { x1: -w / 2 + i * w / 4, y1: -h / 2 + 6, x2: -w / 2 + i * w / 4, y2: h / 2 - 6, stroke: 'rgba(23,20,15,.45)', 'stroke-width': 3 }, g);
  if (label) { const t = svgEl('text', { x: 0, y: h / 2 + 30, 'text-anchor': 'middle', 'font-size': 26, fill: '#17140F', 'paint-order': 'stroke', stroke: '#F2E6CF', 'stroke-width': 7 }, g); t.textContent = label; }
  g.style.display = 'none'; return g;
}
function setUnit(g, x, y, ang = 0, opacity = 1, sc = 1) { g.style.display = opacity <= 0 ? 'none' : 'block'; g.setAttribute('transform', `translate(${x},${y}) rotate(${ang}) scale(${sc})`); g.style.opacity = opacity; }
function unitOnPath(g, pts, k, opacity = 1) { k = clamp(k); const i = Math.min(pts.length - 2, Math.floor(k * (pts.length - 1))); const p = pts[i], q = pts[i + 1]; const ang = Math.atan2(q[1] - p[1], q[0] - p[0]) * 180 / Math.PI; setUnit(g, p[0], p[1], ang, opacity); }

// Etiqueta de papel clavada en el mapa (entra con rebote).
function tag(parent, x, y, text, { size = 30, bg = '#F2E6CF', fg = '#17140F', rot = -3 } = {}) {
  const g = svgEl('g', {}, parent); const pad = 16, w = text.length * size * .62 + pad * 2, h = size + pad * 1.4;
  svgEl('rect', { x: 6, y: 7, width: w, height: h, fill: 'rgba(23,20,15,.6)' }, g);
  svgEl('rect', { x: 0, y: 0, width: w, height: h, fill: bg, stroke: '#17140F', 'stroke-width': 4 }, g);
  const t = svgEl('text', { x: pad, y: h / 2 + size * .36, 'font-size': size, fill: fg }, g); t.textContent = text;
  g._t = { x, y, rot, w, h }; g.style.display = 'none'; return g;
}
function setTag(g, k) { const t = g._t; k = clamp(k); g.style.display = k <= 0 ? 'none' : 'block'; if (k <= 0) return; const s = back(clamp(k * 1.0)); g.setAttribute('transform', `translate(${t.x},${t.y}) rotate(${t.rot}) scale(${Math.max(.01, s)}) translate(${-t.w / 2},${-t.h / 2})`); }

// Cámara sobre un mapa/pintura grande: keyframes [t, cx, cy, zoom] con interpolación suave.
// El mapa y su capa de dibujos viven en el mismo contenedor, así las anotaciones quedan pegadas al terreno.
function mapCam(el, keys, t) {
  let a = keys[0], b = keys[keys.length - 1];
  for (let i = 0; i < keys.length - 1; i++) if (t >= keys[i][0] && t <= keys[i + 1][0]) { a = keys[i]; b = keys[i + 1]; break; }
  if (t < keys[0][0]) b = a; if (t > keys[keys.length - 1][0]) a = b;
  const k = a === b ? 0 : ease.io(clamp((t - a[0]) / (b[0] - a[0])));
  const cx = a[1] + (b[1] - a[1]) * k, cy = a[2] + (b[2] - a[2]) * k, z = a[3] + (b[3] - a[3]) * k;
  el.style.transform = `translate(${540 - cx * z}px,${1080 - cy * z}px) scale(${z})`;
}

// ---------- Vistas de foto/mapa reutilizables (desde el piloto 03) ----------
// Coordenadas normalizadas: x de 0 a 1000 sobre el ancho; y de 0 a 1000·alto/ancho.
// photoView('mw1', {src, W, H}) → {wrap, sv, m}. Dibujar en sv con esas coordenadas.
function photoView(wrapId, { src, W, H }) {
  const m = { src, W, H, x0: 0, y0: 0, pw: 1000, ph: 1000 * H / W }, wrap = document.getElementById(wrapId);
  wrap.style.width = W + 'px'; wrap.style.height = H + 'px';
  const img = document.createElement('img'); img.src = src; img.style.width = W + 'px'; img.style.height = H + 'px'; wrap.appendChild(img);
  const sv = svgEl('svg', { width: W, height: H, viewBox: `0 0 ${m.pw} ${m.ph}` }); wrap.appendChild(sv);
  return { wrap, sv, m };
}
// Cámara: centra el punto (cx, cy) del material en el punto (vx, vy) del cuadro, con zoom z.
function viewAt(v, cx, cy, z, vx = 540, vy = 1330) { const X = (cx - v.m.x0) * v.m.W / v.m.pw, Y = (cy - v.m.y0) * v.m.H / v.m.ph; v.wrap.style.transform = `translate(${vx - X * z}px,${vy - Y * z}px) scale(${z})`; }
// keys = [[t, cx, cy, zoom], ...] interpolados con easeInOut cúbico (sin pasos).
function viewCam(v, keys, t, vx, vy) {
  let a = keys[0], b = keys[keys.length - 1];
  for (let i = 0; i < keys.length - 1; i++) if (t >= keys[i][0] && t <= keys[i + 1][0]) { a = keys[i]; b = keys[i + 1]; break; }
  if (t < keys[0][0]) b = a; if (t > keys[keys.length - 1][0]) a = b;
  const k = a === b ? 0 : ease.io(clamp((t - a[0]) / (b[0] - a[0])));
  viewAt(v, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k, a[3] + (b[3] - a[3]) * k, vx, vy);
}
const prg = (t, a, d) => clamp((t - a) / d);
// Ícono que entra con rebote: g._p = [x, y, escala]
function popIn(g, k) { const [x, y, s] = g._p; g.style.display = k <= 0 ? 'none' : 'block'; if (k > 0) g.setAttribute('transform', `translate(${x},${y}) scale(${s * Math.max(.01, back(clamp(k)))})`); }
function heartIcon(parent, x, y, s = 1, color = '#EE6A1F') { const g = svgEl('g', {}, parent);
  svgEl('path', { d: 'M0 6 C-14 -4 -10 -16 0 -9 C10 -16 14 -4 0 6 Z', fill: color, stroke: '#17140F', 'stroke-width': 2, 'stroke-linejoin': 'round' }, g); g._p = [x, y, s]; g.style.display = 'none'; return g; }
function personIcon(parent, x, y, s = 1, color = '#F2E6CF') { const g = svgEl('g', {}, parent);
  svgEl('circle', { cx: 0, cy: -9, r: 5, fill: color, stroke: '#17140F', 'stroke-width': 1.6 }, g); svgEl('path', { d: 'M-8 9 Q-8 -2 0 -2 Q8 -2 8 9 Z', fill: color, stroke: '#17140F', 'stroke-width': 1.6 }, g);
  g._p = [x, y, s]; g.style.display = 'none'; return g; }
function jaggedEdge(el, seed) { const pts = ['0% 0%', '100% 0%']; for (let i = 0; i <= 40; i++) pts.push(`${100 - i * 2.5}% ${93 + hash(seed + i) * 6}%`); el.style.clipPath = `polygon(${pts.join(',')})`; }
