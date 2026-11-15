// TRAMA · motor de animación determinista. render(t) dibuja cualquier instante.
// Cada video define: SCENES = [{id, s, e, update(el, lt, t)}], PLATES (cambios de bloque), DUR.
// Ver bible/BIBLIA.md (secciones 0, 7, 8, 15–18) y tools/qa_video.js.
const FPS = 30;
const q15 = t => Math.floor(t * 15) / 15;
const hash = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const prog = (lt, a, d) => clamp((lt - a) / d);
const easeOut = k => 1 - Math.pow(1 - k, 3);
const easeIO = k => k * k * (3 - 2 * k);
const back = k => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(k - 1, 3) + c1 * Math.pow(k - 1, 2); };
const SVGNS = 'http://www.w3.org/2000/svg';
const svgEl = (tag, attrs = {}, parent) => { const e = document.createElementNS(SVGNS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; };

// ---------- ejércitos de glifos ----------
// shape: 'c' círculo (infantería), 't' triángulo (caballería), 's' cuadrado (artillería), 'mix'
function army(parent, { x, y, cols, rows, cell = 30, color = '#EE6A1F', shape = 'c' }) {
  const g = svgEl('g', {}, parent); g._units = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const cx = c * cell, cy = r * cell, R = cell * 0.36;
    const sh = shape === 'mix' ? ['c', 'c', 't', 's'][(r * cols + c) % 4] : shape;
    let u;
    if (sh === 'c') u = svgEl('circle', { cx, cy, r: R, fill: color, stroke: '#17140F', 'stroke-width': 3 }, g);
    else if (sh === 't') u = svgEl('polygon', { points: `${cx},${cy - R} ${cx + R},${cy + R * .8} ${cx - R},${cy + R * .8}`, fill: color, stroke: '#17140F', 'stroke-width': 3 }, g);
    else u = svgEl('rect', { x: cx - R * .85, y: cy - R * .85, width: R * 1.7, height: R * 1.7, fill: color, stroke: '#17140F', 'stroke-width': 3 }, g);
    g._units.push(u);
  }
  g._x = x; g._y = y; g._w = (cols - 1) * cell; g._h = (rows - 1) * cell;
  g.setAttribute('transform', `translate(${x},${y})`);
  return g;
}
function place(g, x, y, extra = '') { g.setAttribute('transform', `translate(${x},${y}) ${extra}`); }
// rendición: las unidades se vuelven banderas blancas
function surrender(g, k) { g._units.forEach((u, i) => { const on = k > hash(i) ; u.setAttribute('fill', on ? '#F2E6CF' : u.getAttribute('data-c') || u.getAttribute('fill')); if (!u.getAttribute('data-c')) u.setAttribute('data-c', u.getAttribute('fill')); }); }

// ---------- flechas que se dibujan ----------
function arrow(parent, d, { color = '#EE6A1F', w = 26, dash = false } = {}) {
  const g = svgEl('g', {}, parent);
  const under = svgEl('path', { d, fill: 'none', stroke: '#17140F', 'stroke-width': w + 12, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  const over = svgEl('path', { d, fill: 'none', stroke: color, 'stroke-width': w, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, g);
  const head = svgEl('polygon', { points: `0,${-w * 1.3} ${w * 2.2},0 0,${w * 1.3}`, fill: color, stroke: '#17140F', 'stroke-width': 6, 'stroke-linejoin': 'round' }, g);
  const L = over.getTotalLength();
  [under, over].forEach(p => { p.style.strokeDasharray = dash ? `${w * 1.4} ${w * 1.1}` : `${L} ${L}`; });
  g._p = [under, over]; g._head = head; g._L = L; g._dash = dash;
  setArrow(g, 0); return g;
}
function setArrow(g, k) {
  k = clamp(k); g.style.display = k <= 0 ? 'none' : 'block'; if (k <= 0) return;
  const L = g._L, l = L * k;
  if (!g._dash) g._p.forEach(p => p.style.strokeDashoffset = L - l);
  else g._p.forEach(p => p.style.opacity = k);
  const pt = g._p[1].getPointAtLength(Math.max(0, l - 1)), pt2 = g._p[1].getPointAtLength(l);
  const a = Math.atan2(pt2.y - pt.y, pt2.x - pt.x) * 180 / Math.PI;
  g._head.setAttribute('transform', `translate(${pt2.x},${pt2.y}) rotate(${a})`);
}

// ---------- tipografía cinética ----------
function setupKinetics() {
  document.querySelectorAll('.kin').forEach(k => {
    const lines = JSON.parse(k.dataset.lines); k._words = [];
    lines.forEach(([cls, text, s, e]) => {
      const ln = document.createElement('span'); ln.className = 'ln ' + cls; k.appendChild(ln);
      const ws = text.split(' '); const tot = ws.reduce((a, w) => a + w.length + 1, 0); let acc = 0;
      ws.forEach(w => { const sp = document.createElement('span'); sp.className = 'w'; sp.textContent = w; ln.appendChild(sp);
        const t0 = s + (e - s) * acc / tot; acc += w.length + 1; k._words.push({ el: sp, t: t0 - 0.04 }); });
      if (k.dataset.hl === cls) { ln.classList.add('hl'); ln._hl = [s, e]; k._hl = ln; }
    });
    k._show = k.dataset.show ? JSON.parse(k.dataset.show) : null;
  });
}
function renderKinetics(el, t) {
  el.querySelectorAll('.kin').forEach(k => {
    if (k._show) { const on = t >= k._show[0] && t < k._show[1]; k.style.visibility = on ? 'visible' : 'hidden'; if (!on) return; }
    k._words.forEach(({ el: w, t: wt }) => {
      if (t < wt) { w.style.opacity = 0; return; }
      const a = Math.min((t - wt) / 0.14, 1); w.style.opacity = (0.35 + 0.65 * a).toFixed(3);
      const b = Math.min((t - wt) / 0.22, 1); w.style.transform = `translateY(${(1 - back(b)) * 18}px)`;
    });
    if (k._hl) { const [s2, e2] = k._hl._hl; const h = clamp((t - s2 - 0.3) / (e2 - s2)); k._hl.style.backgroundSize = `${h * 100}% 42%`; }
  });
}

// ---------- autoajuste: el texto nunca se corta (regla dura 1) ----------
function setupFit() {
  document.querySelectorAll('.fit').forEach(el => { let f = +el.dataset.max || 300; const sc = el.closest('.scene'); const d = sc.style.display; sc.style.display = 'block';
    el.style.fontSize = f + 'px'; while ((el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight + 4) && f > 30) { f -= 3; el.style.fontSize = f + 'px'; } sc.style.display = d; });
}

// ---------- capas genéricas ----------
function renderLayers(el, lt, p) {
  const cam = el.querySelector(':scope > .cam'); if (cam && !cam.dataset.free) cam.style.transform = `scale(${1 + 0.05 * p})`;
  el.querySelectorAll('.giant').forEach(g => { g.style.transform = `translateX(${(+g.dataset.slide || -120) * p}px)`; });
  el.querySelectorAll('.pz').forEach((pz, i) => {
    const at = +pz.dataset.at, qt = q15(lt);
    if (pz._base === undefined) pz._base = pz.style.transform || '';
    if (qt < at) { pz.style.visibility = 'hidden'; return; }
    pz.style.visibility = 'visible';
    const step = Math.round((qt - at) * 15); let extra = '';
    if (pz.classList.contains('sello') || pz.classList.contains('banda')) { const k = back(clamp((lt - at) / 0.28)); extra = ` scale(${2.0 - 1.0 * k})`; }
    else if (step < 4) { const j = (4 - step) / 4; extra = ` translate(${(hash(i * 7 + step) - .5) * 14 * j}px,${(hash(i * 13 + step) - .5) * 14 * j}px) rotate(${(hash(i + step * 3) - .5) * 3 * j}deg)`; }
    if (pz.classList.contains('boil')) { const b = Math.floor(lt * 12); extra += ` translate(${(hash(b + i) - .5) * 3}px,${(hash(b * 3 + i) - .5) * 3}px)`; }
    if (pz.classList.contains('drift')) extra += ` translateY(${(+pz.dataset.drift) * p}px)`;
    if (pz.classList.contains('driftx')) extra += ` translateX(${(+pz.dataset.drift) * p}px)`;
    pz.style.transform = pz._base + extra;
  });
  el.querySelectorAll('.spin').forEach(r => { r.style.transform = `rotate(${lt * 12}deg)`; });
}

// ---------- grano y desregistro ----------
const GRAINS = [...Array(4)].map((_, i) => { const c = document.createElement('canvas'); c.width = c.height = 270; const x = c.getContext('2d'); const d = x.createImageData(270, 270);
  for (let p = 0; p < d.data.length; p += 4) { const v = hash(p + i * 99991) * 255; d.data[p] = d.data[p + 1] = d.data[p + 2] = v; d.data[p + 3] = 255; } x.putImageData(d, 0, 0); return c.toDataURL(); });
function renderPlates(t) {
  const pls = ['pl1', 'pl2', 'pl3'].map(i => document.getElementById(i));
  let act = null; for (const ps of (window.PLATES || [])) if (t >= ps - 0.02 && t < ps + 0.4) act = t - ps;
  pls.forEach((pl, i) => { if (act === null) { pl.style.display = 'none'; return; }
    const st = Math.floor(Math.max(act, 0) / 0.4 * 4) / 4; pl.style.display = 'block';
    pl.style.transform = `translate(${[-1, 1, 0.6][i] * 160 * (1 - st) + [-1, 1, 0][i] * 40}px,${[0.6, -0.7, 1][i] * 120 * (1 - st)}px)`; pl.style.opacity = (0.85 * (1 - st)).toFixed(2); });
  document.getElementById('grain').style.backgroundImage = `url(${GRAINS[Math.floor(t * 15) % 4]})`;
}

function render(t) {
  for (const sc of SCENES) {
    const el = document.getElementById(sc.id), on = t >= sc.s && t < sc.e; el.style.display = on ? 'block' : 'none'; if (!on) continue;
    const lt = t - sc.s, p = lt / (sc.e - sc.s);
    renderLayers(el, lt, p); renderKinetics(el, t); if (sc.update) sc.update(el, lt, t, p);
  }
  renderPlates(t);
}
function boot() { setupKinetics(); setupFit(); SCENES.forEach(s => s.setup && s.setup(document.getElementById(s.id))); window.SCENES_T = SCENES.map(s => [s.id, s.s, s.e]); render(0); }
window.FPS = FPS;
