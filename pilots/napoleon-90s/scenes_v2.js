// Escenas de batalla v2: mapa real + cámara fluida + dibujos a mano encima.
const MAPS = { toulon: { x0: 133, y0: 175, pw: 802, ph: 615, W: 2400, H: 1840, src: 'assets/map_toulon.jpg' },
  ulm: { x0: 120, y0: 160, pw: 748, ph: 548, W: 2400, H: 1757, src: 'assets/map_ulm.jpg' },
  austerlitz: { x0: 120, y0: 160, pw: 760, ph: 555, W: 2400, H: 1752, src: 'assets/map_austerlitz.jpg' },
  montenotte: { x0: 0, y0: 0, pw: 960, ph: 860, W: 1920, H: 1720, src: 'assets/map_montenotte.jpg' },
  andes: { x0: 0, y0: 0, pw: 1400, ph: 1866, W: 1400, H: 1866, src: 'assets/andes_foto.jpg' } };
function makeMap(wrapId, key) {
  const m = MAPS[key], wrap = document.getElementById(wrapId);
  wrap.style.width = m.W + 'px'; wrap.style.height = m.H + 'px';
  const img = document.createElement('img'); img.src = m.src; img.style.width = m.W + 'px'; img.style.height = m.H + 'px'; wrap.appendChild(img);
  const sv = svgEl('svg', { width: m.W, height: m.H, viewBox: `${m.x0} ${m.y0} ${m.pw} ${m.ph}` }); wrap.appendChild(sv);
  return { wrap, sv, m };
}
const toImg = (m, x, y) => [(x - m.x0) * m.W / m.pw, (y - m.y0) * m.H / m.ph];
function camAt(map, cx, cy, z, vx = 540, vy = 1330) { const [X, Y] = toImg(map.m, cx, cy); map.wrap.style.transform = `translate(${vx - X * z}px,${vy - Y * z}px) scale(${z})`; }
function camKeys(map, keys, t, vx, vy) {
  let a = keys[0], b = keys[keys.length - 1];
  for (let i = 0; i < keys.length - 1; i++) if (t >= keys[i][0] && t <= keys[i + 1][0]) { a = keys[i]; b = keys[i + 1]; break; }
  if (t < keys[0][0]) b = a; if (t > keys[keys.length - 1][0]) a = b;
  const k = a === b ? 0 : ease.io(clamp((t - a[0]) / (b[0] - a[0])));
  camAt(map, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k, a[3] + (b[3] - a[3]) * k, vx, vy);
}
const D = (t, a, d) => clamp((t - a) / d);           // progreso lineal
const E = (t, a, d) => ease.io(D(t, a, d));          // progreso suave
function shipIcon(sv, x, y, s = 1, color = AZU) { const g = svgEl('g', {}, sv);
  svgEl('path', { d: 'M-10 0 L10 0 L7 5 L-7 5 Z', fill: color, stroke: INK, 'stroke-width': 1.4, 'stroke-linejoin': 'round' }, g);
  svgEl('line', { x1: 0, y1: 0, x2: 0, y2: -13, stroke: INK, 'stroke-width': 1.3 }, g);
  svgEl('path', { d: 'M1 -12 Q9 -7 8 -2 L1 -2 Z', fill: PAP, stroke: INK, 'stroke-width': 1 }, g);
  g._p = [x, y, s]; g.setAttribute('transform', `translate(${x},${y}) scale(${s})`); return g; }
function cannonIcon(sv, x, y, s = 1) { const g = svgEl('g', {}, sv);
  svgEl('rect', { x: -2, y: -4.5, width: 15, height: 6, rx: 2.5, fill: INK, transform: 'rotate(-25)' }, g);
  svgEl('circle', { cx: 0, cy: 2, r: 4.2, fill: ACE, stroke: INK, 'stroke-width': 1.4 }, g);
  g._p = [x, y, s]; g.style.display = 'none'; return g; }
function pop(g, k) { const [x, y, s] = g._p; g.style.display = k <= 0 ? 'none' : 'block'; if (k > 0) g.setAttribute('transform', `translate(${x},${y}) scale(${s * Math.max(.01, back(clamp(k)))})`); }
function flagIcon(sv, x, y) { const g = svgEl('g', {}, sv); svgEl('line', { x1: 0, y1: 0, x2: 0, y2: -26, stroke: INK, 'stroke-width': 2 }, g); svgEl('path', { d: 'M0 -26 Q9 -29 16 -24 Q10 -19 0 -17 Z', fill: '#fff', stroke: INK, 'stroke-width': 1.5 }, g); g._p = [x, y, 1]; g.style.display = 'none'; return g; }
function jagged(el, seed) { const pts = ['0% 0%', '100% 0%']; for (let i = 0; i <= 40; i++) { const x = 100 - i * 2.5; const y = 93 + hash(seed + i) * 6; pts.push(`${x}% ${y}%`); } el.style.clipPath = `polygon(${pts.join(',')})`; }

const SCENES_V2 = [
 // ---------- Toulon: la pintura con Bonaparte marcado ----------
 { id: 's3', s: 10.0, e: 12.4, setup() { const sv = document.getElementById('sv3'); S.c3 = handCircle(sv, 545, 980, 150, 190, { color: MOS, w: 16, seed: 3 }); S.t3 = tag(sv, 545, 1300, 'BONAPARTE, 24 AÑOS', { size: 30 }); },
   update(el, lt, t) { setHandCircle(S.c3, D(t, 10.6, .7)); setTag(S.t3, D(t, 11.1, .35)); } },
 // ---------- Toulon: el mapa ----------
 { id: 's4', s: 12.4, e: 22.6, setup(el) {
    S.m4 = makeMap('mw4', 'toulon'); const sv = S.m4.sv; jagged(el.querySelector('.cabecera'), 4);
    S.fleet = handCircle(sv, 488, 574, 58, 26, { color: AZU, w: 4.2, seed: 5 }); S.fleetTag = tag(sv, 488, 538, 'FLOTA BRITÁNICA', { size: 10 });
    S.ships4 = [[458, 574], [488, 582], [520, 570], [545, 584]].map(([x, y]) => shipIcon(sv, x, y, 1.1));
    S.city = handCircle(sv, 525, 490, 42, 28, { color: MOS, w: 4.5, seed: 7 }); S.cityX = handLine(sv, 'M490 470 Q525 492 562 515', { color: INK, w: 3.4, seed: 8 });
    S.hill = handCircle(sv, 462, 620, 36, 22, { color: MOS, w: 4.5, seed: 9 }); S.hillTag = tag(sv, 455, 655, 'LA COLINA', { size: 10, bg: MOS });
    S.can = [[448, 616], [461, 624], [474, 614]].map(([x, y]) => cannonIcon(sv, x, y, 1.2));
    S.fire = S.ships4.map((sh, i) => handArrow(sv, `M${464 + i * 3} 612 Q${470 + (sh._p[0] - 464) * .5} ${590 - i * 4} ${sh._p[0] - 6} ${sh._p[1] - 4}`, { color: NAR, w: 3.2, seed: 11 + i, shadow: false }));
    S.exit = handArrow(sv, 'M540 585 C600 610 660 640 735 685', { color: AZU, w: 5.5, seed: 17 });
   }, update(el, lt, t) {
    camKeys(S.m4, [[12.4, 534, 482, .45], [13.3, 500, 570, .86], [16.7, 500, 560, .86], [17.2, 505, 540, .95], [18.5, 505, 545, .95], [19.1, 466, 606, 1.3], [20.8, 470, 606, 1.25], [21.7, 560, 625, .82], [22.6, 575, 630, .78]], t);
    setHandCircle(S.fleet, D(t, 12.9, .7)); setTag(S.fleetTag, D(t, 13.4, .3));
    document.getElementById('bonaparte4').style.opacity = t > 16.9 ? Math.max(0, 1 - (t - 16.9) / .3) : 1;
    setHandCircle(S.city, D(t, 17.11, .55)); setHandLine(S.cityX, D(t, 17.9, .3));
    setHandCircle(S.hill, D(t, 18.6, .55)); setTag(S.hillTag, D(t, 19.0, .3));
    S.can.forEach((c, i) => pop(c, D(t, 19.84 + i * .12, .3)));
    S.fire.forEach((f, i) => setHandArrow(f, D(t, 20.2 + i * .1, .45)));
    const k = E(t, 20.96, 1.5); S.ships4.forEach((s, i) => { const [x, y, sc] = s._p; s.setAttribute('transform', `translate(${x + k * (200 + i * 25)},${y + k * (95 + i * 10)}) scale(${sc}) rotate(${k * 8})`); s.style.opacity = 1 - D(t, 22.0, .5); });
    setHandArrow(S.exit, D(t, 21.0, .9));
   } },
 // ---------- Italia: Montenotte ----------
 { id: 's6', s: 22.6, e: 31.6, setup(el) {
    S.m6 = makeMap('mw6', 'montenotte'); const sv = S.m6.sv; jagged(el.querySelector('.cabecera'), 6);
    S.pie = handCircle(sv, 175, 500, 150, 125, { color: VER, w: 10, seed: 21 }); S.pieT = tag(sv, 175, 352, 'PIAMONTE', { size: 26, bg: VER, fg: PAP });
    S.aus = handCircle(sv, 640, 380, 170, 200, { color: AZU, w: 10, seed: 23 }); S.ausT = tag(sv, 650, 165, 'AUSTRIA', { size: 26, bg: AZU, fg: PAP });
    S.gap = handLine(sv, 'M335 455 Q410 425 470 455', { color: MOS, w: 9, seed: 25 }); S.gapT = tag(sv, 405, 405, 'SEPARADOS', { size: 22, bg: MOS });
    S.fr6 = handArrow(sv, 'M410 860 C405 760 395 640 400 480', { color: NAR, w: 26, seed: 27 });
    S.w6 = handArrow(sv, 'M385 470 C330 470 280 490 245 510', { color: NAR, w: 20, seed: 29 });
    S.e6 = handArrow(sv, 'M420 455 C480 430 520 410 560 400', { color: NAR, w: 20, seed: 31 });
    S.x1 = [handLine(sv, 'M95 420 Q175 500 255 585', { color: INK, w: 10, seed: 33 }), handLine(sv, 'M255 420 Q175 500 95 585', { color: INK, w: 10, seed: 34 })];
    S.x2 = [handLine(sv, 'M540 260 Q640 380 740 500', { color: INK, w: 10, seed: 35 }), handLine(sv, 'M740 260 Q640 380 540 500', { color: INK, w: 10, seed: 36 })];
   }, update(el, lt, t) {
    camKeys(S.m6, [[22.6, 480, 430, .5625], [25.0, 480, 430, .56], [29.0, 440, 450, .6], [31.6, 430, 460, .64]], t);
    setHandCircle(S.pie, D(t, 25.2, .7)); setTag(S.pieT, D(t, 25.8, .3)); setHandCircle(S.aus, D(t, 26.3, .7)); setTag(S.ausT, D(t, 26.9, .3));
    setHandLine(S.gap, D(t, 27.9, .5)); setTag(S.gapT, D(t, 28.3, .3));
    setHandArrow(S.fr6, D(t, 29.27, .85)); setHandArrow(S.w6, D(t, 30.3, .45)); S.x1.forEach((x, i) => setHandLine(x, D(t, 30.65 + i * .12, .2)));
    setHandArrow(S.e6, D(t, 30.9, .4)); S.x2.forEach((x, i) => setHandLine(x, D(t, 31.2 + i * .1, .18)));
   } },
 // ---------- Los cuerpos + Ulm (mismo mapa, la cámara viaja) ----------
 { id: 's7', s: 31.6, e: 49.2, setup(el) {
    S.m7 = makeMap('mw7', 'ulm'); const sv = S.m7.sv; jagged(el.querySelector('.cabecera'), 7);
    const names = ['NEY', 'LANNES', 'MARMONT', 'SOULT', 'DAVOUT', 'BERNADOTTE'], xs = [300, 390, 480, 570, 660, 750], cross = [[405, 445], [470, 395], [565, 300], [690, 195], [740, 200], [800, 185]];
    S.routes = xs.map((x, i) => { const [cx, cy] = cross[i]; return samplePath(`M${x} ${215 + (i % 2) * 34} C${x} 260 ${(x + cx) / 2} ${cy - 40} ${cx} ${cy} C${cx - 40} ${cy + 60} ${430 + i * 6} ${505 + i * 4} ${415 + i * 7} ${515 + i * 5}`, 160); });
    S.trails = S.routes.map((r, i) => { const g = svgEl('g', {}, sv); const p = svgEl('path', { fill: 'rgba(238,106,31,.55)' }, g); g._r = r; g._p = p; return g; });
    S.corps = names.map(n => unit(sv, { w: 40, h: 13, color: NAR, label: n }));
    S.corps.forEach(u => { const t = u.querySelector('text'); t.setAttribute('font-size', 11); t.setAttribute('y', 24); t.setAttribute('stroke-width', 3); });
    S.meet = handCircle(sv, 440, 528, 48, 30, { color: NAR, w: 5, seed: 41 });
    S.mack = unit(sv, { w: 34, h: 11, color: AZU, label: 'MACK' }); { const t = S.mack.querySelector('text'); t.setAttribute('font-size', 9); t.setAttribute('y', 21); t.setAttribute('stroke-width', 2.6); }
    S.look = handArrow(sv, 'M195 505 C175 503 158 500 138 497', { color: AZU, w: 6, seed: 43 }); S.lookT = tag(sv, 168, 470, 'ESPERA AL OESTE', { size: 9 });
    S.feint = handArrow(sv, 'M124 585 Q150 565 178 545', { color: NAR, w: 3.6, seed: 45 }); S.feintT = tag(sv, 150, 610, 'FINTA', { size: 8, bg: NAR });
    S.south = handArrow(sv, 'M420 545 C390 615 300 650 245 605 C230 590 225 570 228 548', { color: NAR, w: 7, seed: 47 });
    S.north = handArrow(sv, 'M410 500 C370 470 310 455 262 480', { color: NAR, w: 7, seed: 49 });
    S.ring = handCircle(sv, 218, 512, 62, 46, { color: NAR, w: 7.5, seed: 51 });
    S.flag = flagIcon(sv, 222, 498); S.flagT = tag(sv, 220, 440, 'SE RINDE · 20/10/1805', { size: 9, bg: PAP });
   }, update(el, lt, t) {
    camKeys(S.m7, [[31.6, 494, 434, .45], [33.0, 525, 445, .62], [36.0, 525, 445, .62], [37.6, 500, 450, .62], [39.4, 470, 450, .6], [40.6, 290, 505, 1.0], [43.7, 285, 505, 1.0], [44.8, 300, 535, .82], [47.6, 260, 515, .92], [49.2, 240, 512, 1.0]], t);
    document.getElementById('ficha7').textContent = t < 39.6 ? 'La gran idea · 1805' : 'Batalla 3 · Ulm · Octubre 1805';
    const spread = E(t, 32.77, 1.0), march = E(t, 36.14, 1.8), join = E(t, 38.08, .9);
    S.corps.forEach((u, i) => { const r = S.routes[i]; let k;
      if (t < 36.14) { const x0 = 525 + (i - 2.5) * 8, x1 = r[0][0]; setUnit(u, x0 + (x1 - x0) * spread, 215 + (i % 2) * 34 * spread, 0, D(t, 32.0, .3)); }
      else { k = march * .62 + join * .38; const p = r[Math.min(r.length - 1, Math.round(k * (r.length - 1)))]; setUnit(u, p[0], p[1], 0, 1); }
      u.querySelector('text').style.opacity = 1 - D(t, 38.2, .4);
      if (t > 40.0) { const o = 1 - D(t, 40.0, .5); u.style.opacity = o; if (o <= 0) u.style.display = 'none'; }
      const tr = S.trails[i]; const kk = t < 36.14 ? 0 : march * .62 + join * .38; tr._p.setAttribute('d', kk > 0 ? brushD(r, kk, 4.5, 60 + i, [.05, .95]) : ''); tr.style.opacity = 1 - D(t, 43.9, .5) * .6;
    });
    setHandCircle(S.meet, D(t, 38.4, .6)); S.meet.style.opacity = 1 - D(t, 40.2, .4);
    setUnit(S.mack, 215, 505, 0, D(t, 40.0, .3)); setHandArrow(S.look, D(t, 41.8, .5)); setTag(S.lookT, D(t, 42.1, .3));
    setHandArrow(S.feint, D(t, 42.6, .5)); setTag(S.feintT, D(t, 42.9, .3));
    setHandArrow(S.south, D(t, 43.86, 1.3)); setHandArrow(S.north, D(t, 44.4, 1.0)); setHandCircle(S.ring, D(t, 45.3, .9));
    if (t >= 48.04) { S.mack.querySelectorAll('rect')[1].setAttribute('fill', PAP); } else S.mack.querySelectorAll('rect')[1].setAttribute('fill', AZU);
    pop(S.flag, D(t, 48.04, .35)); setTag(S.flagT, D(t, 48.3, .3));
   } },
 // ---------- Austerlitz ----------
 { id: 's9', s: 49.2, e: 61.55, setup(el) {
    S.m9 = makeMap('mw9', 'austerlitz'); const sv = S.m9.sv; jagged(el.querySelector('.cabecera'), 9);
    S.allyStart = [[575, 410], [605, 440], [565, 466], [615, 476]]; S.allyEnd = [[492, 518], [505, 545], [478, 560], [522, 532]];
    S.allies = S.allyStart.map(() => unit(sv, { w: 36, h: 12, color: AZU }));
    S.allyRoutes = S.allyStart.map(([x, y], i) => samplePath(`M${x} ${y} C${x - 20} ${y + 40} ${S.allyEnd[i][0] + 40} ${S.allyEnd[i][1] - 30} ${S.allyEnd[i][0]} ${S.allyEnd[i][1]}`, 60));
    S.cut = handArrow(sv, 'M590 470 C560 520 500 552 440 562 C370 575 320 595 280 615', { color: AZU, w: 8, seed: 61 }); S.cutT = tag(sv, 400, 600, 'CAMINO A VIENA', { size: 10, bg: AZU, fg: PAP });
    S.bait = [[405, 522], [425, 548]].map(() => unit(sv, { w: 28, h: 10, color: NAR }));
    S.flank = handCircle(sv, 418, 535, 46, 34, { color: MOS, w: 4.5, seed: 63 }); S.flankT = tag(sv, 418, 487, 'FLANCO DERECHO', { size: 9, bg: MOS }); S.baitT = tag(sv, 440, 588, 'CARNADA', { size: 9, bg: NAR });
    S.frStart = [[455, 380], [472, 402], [448, 422]]; S.frEnd = [[572, 418], [592, 444], [562, 456]];
    S.fr = S.frStart.map(() => unit(sv, { w: 32, h: 11, color: NAR }));
    S.strike = handArrow(sv, 'M462 395 C505 382 545 395 584 430', { color: NAR, w: 12, seed: 65 });
    S.hillC = handCircle(sv, 582, 442, 52, 40, { color: MOS, w: 4.5, seed: 67 }); S.hillT = tag(sv, 600, 382, 'LA COLINA VACÍA', { size: 9, bg: MOS });
    S.sp1 = handArrow(sv, 'M585 455 C565 495 540 530 512 562', { color: NAR, w: 9, seed: 69 }); S.sp2 = handArrow(sv, 'M595 432 C630 405 665 388 712 370', { color: NAR, w: 9, seed: 71 });
   }, update(el, lt, t) {
    camKeys(S.m9, [[49.2, 500, 437, .45], [50.3, 500, 437, .45], [52.6, 470, 500, .6], [53.2, 425, 525, 1.05], [56.3, 425, 525, 1.05], [57.0, 515, 475, .72], [58.4, 515, 475, .72], [59.5, 545, 455, .82], [61.55, 555, 455, .76]], t);
    const g = document.getElementById('gerard9'); const go = D(t, 50.0, .45); g.style.opacity = 1 - go; g.style.transform = `translateY(${go * 120}px) rotate(${-2 + go * 4}deg) scale(${1 + D(t, 49.2, 1) * .04})`; g.style.display = go >= 1 ? 'none' : 'block';
    document.getElementById('fuente9').textContent = t < 50.2 ? 'Pintura: F. Gérard, 1810 · dominio público' : 'Mapa: A.K. Johnston, 1850 · dominio público';
    const down = E(t, 56.75, 1.5);
    S.allies.forEach((u, i) => { if (t < 56.75) setUnit(u, S.allyStart[i][0], S.allyStart[i][1], 0, D(t, 50.3, .4)); else unitOnPath(u, S.allyRoutes[i], down);
      if (t > 60.21) { const sp = E(t, 60.21, .6); const dx = i % 2 ? 18 : -18; u.setAttribute('transform', u.getAttribute('transform') + ` translate(${dx * sp},${-dx * .5 * sp})`); } });
    setHandArrow(S.cut, D(t, 50.4, 1.6)); setTag(S.cutT, D(t, 51.6, .35)); S.cut.style.opacity = 1 - D(t, 52.9, .4) * .6;
    S.bait.forEach((u, i) => setUnit(u, [405, 425][i], [522, 548][i], -20, t < 53.0 ? 0 : (t < 55.2 ? D(t, 53.0, .3) : .45 + .45 * (.5 + .5 * Math.cos((t - 55.2) * 7)))));
    setHandCircle(S.flank, D(t, 53.5, .7)); setTag(S.flankT, D(t, 54.1, .3)); setTag(S.baitT, D(t, 55.7, .3));
    const up = E(t, 58.63, 1.2);
    S.fr.forEach((u, i) => { const [x0, y0] = S.frStart[i], [x1, y1] = S.frEnd[i]; setUnit(u, x0 + (x1 - x0) * up, y0 + (y1 - y0) * up, -10, D(t, 50.3, .4)); });
    setHandArrow(S.strike, D(t, 58.63, .9)); setHandCircle(S.hillC, D(t, 59.3, .6)); setTag(S.hillT, D(t, 59.6, .3));
    setHandArrow(S.sp1, D(t, 60.21, .55)); setHandArrow(S.sp2, D(t, 60.35, .55));
   } },
 // ---------- Ciudades no, ejércitos sí ----------
 { id: 's11', s: 61.55, e: 65.6, setup() { const sv = document.getElementById('sv11');
    S.x11 = [handLine(sv, 'M100 860 Q300 1100 500 1350', { color: NAR, w: 34, seed: 81 }), handLine(sv, 'M500 860 Q300 1100 100 1350', { color: NAR, w: 34, seed: 82 })];
    S.c11 = handCircle(sv, 790, 1110, 260, 300, { color: MOS, w: 22, seed: 83 }); },
   update(el, lt, t) { S.x11.forEach((x, i) => setHandLine(x, D(t, 62.3 + i * .25, .3))); setHandCircle(S.c11, D(t, 63.5, .8)); } },
 // ---------- San Martín: columnas dibujadas sobre la foto de los Andes ----------
 { id: 's14', s: 72.8, e: 79.0, setup(el) {
    S.m14 = makeMap('mw14', 'andes'); const sv = S.m14.sv; jagged(el.querySelector('.cabecera'), 14);
    S.cols = [700, 810, 920, 1040, 1150, 1260].map((y, i) => handArrow(sv, `M1385 ${y} C1080 ${y} 760 ${y + (1000 - y) * .3} 560 ${y + (1000 - y) * .78} S330 1000 262 1000`, { color: NAR, w: 22, seed: 91 + i }));
    S.dest = handCircle(sv, 220, 1000, 95, 80, { color: MOS, w: 16, seed: 99 });
    S.tM = tag(sv, 1190, 1380, 'MENDOZA', { size: 34 }); S.tC = tag(sv, 230, 1130, 'CHILE', { size: 34 }); S.t6 = tag(sv, 760, 640, '6 COLUMNAS · ENERO 1817', { size: 30, bg: NAR, fg: PAP });
   }, update(el, lt, t) {
    camKeys(S.m14, [[72.8, 720, 1080, .78], [79.0, 690, 1010, .86]], t);
    setTag(S.tM, D(t, 73.4, .3)); setTag(S.tC, D(t, 73.9, .3));
    S.cols.forEach((a, i) => setHandArrow(a, D(t, 75.48 + i * .12, 1.9))); setHandCircle(S.dest, D(t, 77.45, .7)); setTag(S.t6, D(t, 76.4, .3));
   } },
 // ---------- ¿Te suena? ----------
 { id: 's15', s: 79.0, e: 80.6, setup() {
    S.pa = makeMap('mw15a', 'ulm'); S.pb = makeMap('mw15b', 'andes');
    S.pa.cols = [300, 390, 480, 570, 660, 750].map((x, i) => handArrow(S.pa.sv, `M${x} 180 C${x} 300 ${430 + (x - 430) * .4} 420 432 505`, { color: NAR, w: 7, seed: 101 + i }));
    S.pb.cols = [700, 810, 920, 1040, 1150, 1260].map((y, i) => handArrow(S.pb.sv, `M1385 ${y} C1080 ${y} 760 ${y + (1000 - y) * .3} 560 ${y + (1000 - y) * .78} S330 1000 262 1000`, { color: NAR, w: 26, seed: 111 + i }));
   }, update(el, lt) {
    camAt(S.pa, 500, 360, .5 + lt * .02, 500, 220); camAt(S.pb, 760, 990, .62 + lt * .02, 500, 220);
    S.pa.cols.forEach((a, i) => setHandArrow(a, D(lt, i * .05, .7))); S.pb.cols.forEach((a, i) => setHandArrow(a, D(lt, .25 + i * .05, .7)));
   } },
];
