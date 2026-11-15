// Piloto 03 · Bernays — material real + dibujos a mano + cámara fluida (reglas duras 4–6).
const cab = el => jaggedEdge(el.querySelector('.cabecera'), el.id.length * 7 + el.id.charCodeAt(1));
const P = prg;

const SCENES = [
 // 1 · Desfile de Pascua (foto de referencia de 1910, con su fecha en pantalla)
 { id: 's1', s: 0, e: 6.75, setup(el) { cab(el); S.v1 = photoView('v1', V('desfile')); const sv = S.v1.sv;
    S.t1a = tag(sv, 500, 200, 'DESFILE DE PASCUA · QUINTA AVENIDA', { size: 18 });
    S.c1 = handCircle(sv, 450, 470, 150, 85, { color: MOS, w: 9, seed: 3 }); S.t1b = tag(sv, 450, 585, 'LA MULTITUD', { size: 15, bg: MOS });
    S.a1 = handArrow(sv, 'M610 320 C590 350 570 385 545 420', { color: NAR, w: 12, seed: 5 }); S.t1c = tag(sv, 600, 292, 'FOTÓGRAFOS AVISADOS', { size: 15, bg: NAR, fg: PAP });
   }, update(el, lt, t) { viewCam(S.v1, [[0, 500, 365, .45], [3.5, 480, 410, .68], [6.75, 470, 430, .8]], t);
    setTag(S.t1a, P(t, 1.7, .35)); setHandCircle(S.c1, P(t, 3.9, .8)); setTag(S.t1b, P(t, 4.5, .3)); setHandArrow(S.a1, P(t, 5.6, .6)); setTag(S.t1c, P(t, 5.8, .3)); } },

 // 2 · ¿Protesta? No: publicidad (aviso real de Lucky Strike, 1929)
 { id: 's2', s: 6.75, e: 10.7, setup(el) { cab(el); S.v2 = photoView('v2', V('lucky')); const sv = S.v2.sv;
    S.t2a = tag(sv, 500, 250, '¿PROTESTA?', { size: 30 });
    S.c2 = handCircle(sv, 150, 1040, 135, 185, { color: NAR, w: 10, seed: 7 }); S.t2b = tag(sv, 260, 1270, 'PUBLICIDAD', { size: 30, bg: NAR, fg: PAP });
    S.x2 = handLine(sv, 'M370 220 Q500 245 630 270', { color: INK, w: 8, seed: 9 });
   }, update(el, lt, t) { viewCam(S.v2, [[6.75, 500, 430, .95], [8.6, 500, 440, .95], [9.6, 250, 960, 1.0], [10.7, 240, 1000, 1.05]], t);
    setTag(S.t2a, P(t, 7.3, .35)); setHandLine(S.x2, P(t, 8.85, .3)); setHandCircle(S.c2, P(t, 9.4, .8)); setTag(S.t2b, P(t, 9.9, .3)); } },

 // 3 · Bernays + Freud unidos por un hilo
 { id: 's3', s: 10.7, e: 16.5, setup() { const sv = document.getElementById('o3');
    S.h3 = handLine(sv, 'M420 1150 C520 1080 600 1110 700 1180', { color: '#CF3F2A', w: 9, seed: 11 }); S.t3 = tag(sv, 560, 1070, 'SOBRINO (DOBLE)', { size: 28 }); },
   update(el, lt, t) { setHandLine(S.h3, P(t, 12.9, .6)); setTag(S.t3, P(t, 13.4, .35)); } },

 // 4 · Truco 1: el aviso vende libertad, no cigarrillos
 { id: 's4', s: 16.5, e: 22.1, setup(el) { cab(el); S.v4 = photoView('v4', V('lucky')); const sv = S.v4.sv;
    S.u4 = handLine(sv, 'M110 128 Q500 142 890 122', { color: MOS, w: 14, seed: 13 });
    S.c4 = handCircle(sv, 500, 420, 260, 240, { color: MOS, w: 10, seed: 15 }); S.t4 = tag(sv, 520, 720, 'LIBERTAD', { size: 34, bg: MOS });
    S.a4 = handArrow(sv, 'M210 930 C260 820 330 720 400 640', { color: NAR, w: 16, seed: 17 }); S.t4b = tag(sv, 170, 1230, 'EL PRODUCTO', { size: 26 });
   }, update(el, lt, t) { viewCam(S.v4, [[16.5, 500, 200, 1.2], [18.2, 500, 240, 1.05], [20.0, 420, 600, .82], [22.1, 380, 700, .76]], t);
    setHandLine(S.u4, P(t, 17.0, .7)); setHandCircle(S.c4, P(t, 18.5, .8)); setTag(S.t4, P(t, 19.0, .3)); setTag(S.t4b, P(t, 20.1, .3)); setHandArrow(S.a4, P(t, 20.4, .7)); } },

 // 5 · "Antorchas de la libertad"
 { id: 's5', s: 22.1, e: 25.7, setup(el) { cab(el); S.v5 = photoView('v5', V('libertad')); const sv = S.v5.sv;
    S.c5 = handCircle(sv, 186, 335, 85, 105, { color: MOS, w: 10, seed: 19 }); S.t5 = tag(sv, 300, 470, 'ANTORCHA', { size: 22, bg: MOS });
    S.f5 = [0, 1, 2].map(i => handLine(S.v5.sv, `M${160 + i * 24} 255 Q${148 + i * 26} ${222 - i * 6} ${175 + i * 20} ${190 - i * 5}`, { color: NAR, w: 7, seed: 21 + i }));
   }, update(el, lt, t) { viewCam(S.v5, [[22.1, 500, 600, .77], [23.6, 220, 330, 1.5], [25.7, 210, 330, 1.62]], t);
    setHandCircle(S.c5, P(t, 23.4, .7)); setTag(S.t5, P(t, 23.9, .3)); S.f5.forEach((f, i) => setHandLine(f, P(t, 24.3 + i * .12, .35))); } },

 // 6 · Truco 2: los médicos y la panceta
 { id: 's6', s: 25.7, e: 35.9, setup(el) { cab(el); S.v6 = photoView('v6', V('desayuno')); const sv = S.v6.sv;
    S.c6 = handCircle(sv, 300, 1160, 210, 170, { color: MOS, w: 10, seed: 23 }); S.t6 = tag(sv, 300, 945, 'PANCETA', { size: 30, bg: MOS });
    S.docs = [[200, 520], [380, 470], [640, 500], [800, 600], [150, 700], [700, 760], [420, 640], [860, 900], [160, 1330], [560, 1330], [820, 1200], [300, 820]].map(([x, y], i) => tag(sv, x, y, 'MÉDICO', { size: 20, rot: (hash(i) - .5) * 14 }));
    S.big6 = tag(sv, 500, 1000, '4.500 MÉDICOS', { size: 52, bg: NAR, fg: PAP });
    S.salud = tag(sv, 500, 1230, 'CONSEJO DE SALUD', { size: 40 });
    S.a6 = [handArrow(sv, 'M500 1060 C500 1110 500 1150 500 1185', { color: INK, w: 10, seed: 25, shadow: false })];
   }, update(el, lt, t) { viewCam(S.v6, [[25.7, 500, 750, .77], [28.4, 500, 820, .77], [29.5, 320, 1080, 1.05], [31.0, 500, 900, .84], [35.9, 500, 920, .86]], t);
    setHandCircle(S.c6, P(t, 28.7, .7)); setTag(S.t6, P(t, 29.1, .3)); S.c6.style.opacity = 1 - P(t, 30.6, .4) * .7; S.t6.style.opacity = 1 - P(t, 30.6, .4);
    S.docs.forEach((d, i) => setTag(d, P(t, 29.9 + i * .17, .3))); setTag(S.big6, P(t, 32.0, .35));
    setHandArrow(S.a6[0], P(t, 33.4, .4)); setTag(S.salud, P(t, 33.8, .35)); } },

 // 7 · Truco 3: Guatemala en el mapa
 { id: 's7', s: 35.9, e: 46.3, setup(el) { cab(el); S.v7 = photoView('v7', V('mapa_ca')); const sv = S.v7.sv;
    S.uf = handArrow(sv, 'M330 40 C290 120 200 250 110 350', { color: AZU, w: 9, seed: 31 }); S.ufT = tag(sv, 330, 70, 'UNITED FRUIT (EE.UU.)', { size: 14, bg: AZU, fg: PAP });
    S.gt = handCircle(sv, 80, 385, 62, 42, { color: MOS, w: 6, seed: 33 }); S.gtT = tag(sv, 95, 300, '“AMENAZA COMUNISTA”', { size: 13, bg: MOS });
    S.inv = handArrow(sv, 'M200 395 C170 380 140 378 112 382', { color: NAR, w: 8, seed: 35 }); S.invT = tag(sv, 215, 440, 'JUNIO 1954', { size: 14, bg: NAR, fg: PAP });
    S.gt2 = handCircle(sv, 80, 385, 70, 48, { color: NAR, w: 8, seed: 37 });
   }, update(el, lt, t) { viewCam(S.v7, [[35.9, 500, 375, .5625], [39.5, 400, 360, .7], [41.0, 210, 340, 1.2], [44.5, 200, 380, 1.4], [46.3, 190, 390, 1.55]], t);
    setHandArrow(S.uf, P(t, 39.9, 1.1)); setTag(S.ufT, t < 42.4 ? P(t, 40.0, .3) : 0); setHandCircle(S.gt, P(t, 42.6, .7)); setTag(S.gtT, P(t, 43.1, .3));
    setTag(S.invT, P(t, 44.9, .3)); setHandArrow(S.inv, P(t, 45.1, .6)); setHandCircle(S.gt2, P(t, 45.6, .6));
    document.getElementById('arbenz7').style.opacity = t > 44.6 ? Math.max(0, 1 - (t - 44.6) / .3) : 1; } },

 // 8 · El documento desclasificado de la CIA
 { id: 's8', s: 46.3, e: 48.6, setup(el) { cab(el); S.v8 = photoView('v8', V('cia')); const sv = S.v8.sv;
    S.hl8 = svgEl('g', {}, sv); S.hl8.style.mixBlendMode = 'multiply'; S.hl8._l = handLine(S.hl8, 'M255 78 Q580 74 910 76', { color: 'rgba(243,167,43,.75)', w: 26, seed: 41 });
    S.t8 = tag(sv, 470, 165, '27 DE JUNIO DE 1954: ÁRBENZ RENUNCIA', { size: 22, bg: MOS });
   }, update(el, lt, t) { viewCam(S.v8, [[46.3, 580, 110, 1.25], [48.6, 560, 200, 1.0]], t); setHandLine(S.hl8._l, P(t, 46.6, .9)); setTag(S.t8, P(t, 47.3, .3)); } },

 // 9 · Propaganda (1928)
 { id: 's9', s: 48.6, e: 55.4 },

 // 10 · 1929 → hoy: el diario se va, aparece el celular
 { id: 's10', s: 55.4, e: 59.4, setup(el) { cab(el); S.v10 = photoView('v10', V('feed')); const sv = S.v10.sv;
    S.c10 = handCircle(sv, 500, 640, 150, 270, { color: NAR, w: 10, seed: 51 }); S.t10 = tag(sv, 500, 290, 'EL NUEVO DIARIO', { size: 30, bg: NAR, fg: PAP });
   }, update(el, lt, t) { viewCam(S.v10, [[55.4, 500, 700, .77], [59.4, 500, 650, .92]], t);
    const d = document.getElementById('diario10'), k = ease.io(P(t, 57.0, .9)); d.style.transform = `translate(${k * 700}px,${k * 260}px) rotate(${-3 + k * 18}deg)`; d.style.display = k >= 1 ? 'none' : 'block';
    document.getElementById('fuente10').textContent = t < 57.6 ? 'Santa Ana Register, 28/10/1929 · Orange County Archives (CC BY 2.0)' : 'Foto: I\'m Zion / Pexels';
    setHandCircle(S.c10, P(t, 58.0, .7)); setTag(S.t10, P(t, 58.4, .3)); } },

 // 11 · Marcas que venden identidad
 { id: 's11', s: 59.4, e: 63.2, setup(el) { cab(el); S.v11 = photoView('v11', V('timessq')); const sv = S.v11.sv;
    S.c11a = handCircle(sv, 150, 470, 150, 300, { color: MOS, w: 10, seed: 61 }); S.c11b = handCircle(sv, 755, 1220, 85, 125, { color: MOS, w: 10, seed: 63 });
    S.t11 = tag(sv, 470, 830, 'IDENTIDAD', { size: 40, bg: MOS });
   }, update(el, lt, t) { viewCam(S.v11, [[59.4, 500, 900, .77], [63.2, 470, 820, .86]], t);
    setHandCircle(S.c11a, P(t, 60.6, .7)); setHandCircle(S.c11b, P(t, 61.0, .7)); setTag(S.t11, P(t, 61.4, .35)); } },

 // 12 · Influencers (el médico de 1920 → la persona con el aro de luz)
 { id: 's12', s: 63.2, e: 65.8, setup(el) { cab(el); S.v12 = photoView('v12', V('influencer')); const sv = S.v12.sv;
    S.c12 = handCircle(sv, 470, 560, 170, 260, { color: NAR, w: 10, seed: 71 }); S.t12 = tag(sv, 620, 860, 'INFLUENCER', { size: 40, bg: NAR, fg: PAP });
    const o = document.getElementById('o12'); S.a12 = handArrow(o, 'M380 1220 C470 1130 560 1060 640 1000', { color: MOS, w: 22, seed: 73 }); S.t12b = tag(o, 220, 1560, 'MÉDICOS, 1920', { size: 26, bg: PAP });
   }, update(el, lt, t) { viewCam(S.v12, [[63.2, 500, 700, .77], [65.8, 480, 640, .9]], t);
    setTag(S.t12b, P(t, 63.6, .3)); setHandArrow(S.a12, P(t, 64.0, .6)); setHandCircle(S.c12, P(t, 64.5, .7)); setTag(S.t12, P(t, 64.9, .3)); } },

 // 13 · Algoritmos que saben qué te emociona
 { id: 's13', s: 65.8, e: 69.3, setup(el) { cab(el); S.v13 = photoView('v13', V('feed')); const sv = S.v13.sv;
    S.hearts = [...Array(14)].map((_, i) => { const a = i / 14 * Math.PI * 2, r = 230 + hash(i) * 120; return heartIcon(sv, 500 + Math.cos(a) * r * .8, 640 + Math.sin(a) * r * 1.1, 2.2 + hash(i + 3) * 1.4, i % 3 ? NAR : MOS); });
    S.t13 = tag(sv, 500, 1010, 'LO QUE TE EMOCIONA, SE MULTIPLICA', { size: 22, bg: PAP });
   }, update(el, lt, t) { viewCam(S.v13, [[65.8, 500, 700, .8], [69.3, 500, 680, .95]], t);
    S.hearts.forEach((h, i) => { popIn(h, P(t, 67.0 + i * .1, .35)); if (t > 67.0 + i * .1 + .35) { const [x, y, s] = h._p; const f = (t - 67.0 - i * .1) * 6; h.setAttribute('transform', `translate(${x},${y - f}) scale(${s})`); } });
    setTag(S.t13, P(t, 68.0, .3)); } },

 // 14 · Cambridge Analytica: 87 millones
 { id: 's14', s: 69.3, e: 77.4, setup(el) { cab(el); S.v14 = photoView('v14', V('calle')); const sv = S.v14.sv;
    S.people = []; for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) S.people.push(personIcon(sv, 120 + c * 95, 880 + r * 105, 2.3, r * 9 + c < 0 ? PAP : PAP));
    S.t14 = tag(sv, 500, 790, 'HASTA 87.000.000 DE PERFILES', { size: 30, bg: NAR, fg: PAP });
    S.c14 = handCircle(sv, 500, 1090, 470, 290, { color: MOS, w: 10, seed: 81 });
   }, update(el, lt, t) { viewCam(S.v14, [[69.3, 500, 750, .77], [77.4, 500, 900, .84]], t);
    S.people.forEach((p, i) => { popIn(p, P(t, 70.2 + i * .04, .3)); const lit = t > 73.0 + (i % 9) * .08 + Math.floor(i / 9) * .05; p.querySelectorAll('circle,path').forEach(e => e.setAttribute('fill', lit ? NAR : PAP)); });
    setTag(S.t14, P(t, 73.4, .35)); setHandCircle(S.c14, P(t, 75.5, .9)); } },

 // 15 · Un desfile y los diarios / tu pantalla (misma flecha en las dos épocas)
 { id: 's15', s: 77.4, e: 81.6, setup() { S.p15a = photoView('v15a', V('desfile')); S.p15b = photoView('v15b', V('calle'));
    S.a15a = handArrow(S.p15a.sv, 'M720 300 C640 340 580 390 520 440', { color: NAR, w: 12, seed: 91 });
    S.a15b = handArrow(S.p15b.sv, 'M900 300 C760 380 660 460 560 540', { color: NAR, w: 22, seed: 93 });
   }, update(el, lt, t) { viewAt(S.p15a, 480, 420, .62 + lt * .02, 500, 200); viewAt(S.p15b, 500, 450, .75 + lt * .02, 500, 200);
    setHandArrow(S.a15a, P(t, 78.2, .7)); setHandArrow(S.a15b, P(t, 80.3, .7)); } },

 // 16 · La pregunta
 { id: 's16', s: 81.6, e: 84.9, setup(el) { cab(el); S.v16 = photoView('v16', V('ojo')); S.c16 = handCircle(S.v16.sv, 615, 440, 80, 50, { color: MOS, w: 7, seed: 95 }); },
   update(el, lt, t) { viewCam(S.v16, [[81.6, 550, 700, .77], [84.0, 612, 470, 1.6], [84.9, 615, 450, 1.9]], t); setHandCircle(S.c16, P(t, 84.03, .6)); } },

 // 17 · cierre
 { id: 's17', s: 84.9, e: DUR, update(el, lt) {
    const c = document.getElementById('g17'), x = c.getContext('2d'); x.clearRect(0, 0, 1080, 1920); const tq = lt, cell = 36;
    for (let gy = 0; gy < 54; gy++) for (let gx = 0; gx < 30; gx++) { const cx = gx * cell + 18, cy = gy * cell + 18, r = Math.hypot(cx - 540, cy - 900);
      const v = 0.5 + 0.5 * Math.sin(r / 70 - tq * 4) * Math.exp(-r / 900); const R = cell * .4; if (v < .45) continue;
      x.lineWidth = 2; x.strokeStyle = 'rgba(242,230,207,.55)'; x.fillStyle = 'rgba(238,106,31,.85)';
      if (v < .6) { x.beginPath(); x.arc(cx, cy, R * .35, 0, 7); x.stroke(); } else if (v < .75) { x.beginPath(); x.arc(cx, cy, R * .8, 0, 7); x.stroke(); } else { x.beginPath(); x.arc(cx, cy, R, 0, 7); x.fill(); } }
    const k = Math.min(lt / .5, 1), st = ease.out(k); document.getElementById('logo').style.textShadow = `${-26 * (1 - st) - 6}px ${14 * (1 - st) + 5}px 0 var(--naranja), ${24 * (1 - st) + 6}px ${-16 * (1 - st) - 4}px 0 var(--verde)`;
 }},
];
