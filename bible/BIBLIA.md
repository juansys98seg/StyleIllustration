# TRAMA — Biblia de estilo (v0.1, borrador)

> **Trama** es el nombre de trabajo del estilo. Juega con dos sentidos: la *trama* de puntos de la imprenta (halftone) y la *trama* detrás de una noticia, lo que realmente pasó.
> El nombre del canal está por definir: donde dice `[NOMBRE]` va el definitivo.

Explainers de **política, tecnología y actualidad**: qué pasó, por qué importa y qué viene.
La gramática viene del video explicativo editorial (documentos, datos, mapas, cámara que viaja por un lienzo). La piel es **ilustración vectorial con estética de impresión retro**.

---

## 1. Alma

**Tres palabras:** Claro · Impreso · Con criterio.

- **Claro:** una idea por plano. Si hay que explicar dos cosas, son dos planos.
- **Impreso:** todo parece salido de una imprenta: tinta, papel, trama, desregistro. Nada brilla ni tiene gradientes digitales.
- **Con criterio:** el estilo transmite rigor. Las fuentes se ven y los hechos se distinguen de las opiniones.

**Lo que NO es**
- No es un canal de memes: no ridiculizamos a personas reales.
- No es 3D brillante, ni glassmorphism, ni neón, ni "tech futurista".
- No es partidario: ningún color representa a un bando.
- No es caótico: el collage está ordenado y cada elemento entra cuando la voz lo nombra.

**Referencias de mood** (no se suben al repo porque son obras de terceros):
1. Mano con llave inglesa y reloj dorado: halftone fuerte, contorno negro grueso, colores saturados planos (naranja, verde botella, mostaza) y piel rosada.
2. Manos de colores girando perillas de una consola, vista cenital-isométrica: **manos como metáfora de poder y control**, rayado (hatching) para volumen y paleta primaria apagada sobre crema.
3. Fantasma planchando: minimalismo, personaje sin rostro con dos puntos por ojos, fondos de color pleno, línea fina y grano de papel.

---

## 2. Paleta

Tokens en [`/tokens/colors.json`](../tokens/colors.json).

| Token | Hex | Uso |
|---|---|---|
| `tinta` | `#17140F` | Contornos, texto y sombras. Nunca negro puro. |
| `papel` | `#F2E6CF` | Fondo base, "el papel". |
| `naranja` | `#EE6A1F` | **Color de marca.** Énfasis, alerta, títulos clave. Máximo 1 foco por plano. |
| `verde` | `#1F6E55` | Fondos de contexto, estabilidad, institucional. |
| `mostaza` | `#F3A72B` | **Resaltador.** Marca la frase clave del documento. |
| `rosa` | `#E79A8C` | Piel genérica de manos y personajes. |
| `acero` | `#B8B5AE` | Metal, objetos tecnológicos, neutros fríos. |
| `rojo` | `#CF3F2A` | Actores (manos) y datos negativos. **Nunca representa un partido.** |
| `azul` | `#2E5A9E` | Actores (manos) y datos. **Nunca representa un partido.** |

**Reglas**
1. Cada plano usa **tinta + papel + máximo 3 colores**.
2. Los colores de actores (rojo, azul, verde, mostaza) se asignan **por rol en la historia**, nunca por ideología. Si hay dos bandos, se alternan o se usan colores no asociados a ningún partido local.
3. Lista negra local: antes de cada video revisar los colores de los partidos involucrados y no usarlos para representarlos.
4. Sin gradientes. El volumen se hace con **trama de puntos** o **rayado**.

---

## 3. Línea, forma y textura

- **Contorno:** tinta, grosor relativo al 0.4 % del ancho de cuadro (≈ 8 px en 1920). Puntas redondeadas y trazo levemente irregular, como de pincel.
- **Detalle interno** (arrugas, pliegues, nudillos): a la mitad del grosor del contorno.
- **Formas:** simplificadas pero pesadas, con objetos que se sienten "manipulables". Manos grandes.
- **Trama (halftone):** puntos a 45°, en las sombras y en los colores planos grandes, con opacidad del 15 al 30 %.
- **Rayado (hatching):** alternativa a la trama para objetos y máquinas (ver referencia 2).
- **Grano de papel:** capa global, siempre activa, muy sutil (ruido al 6–8 %).
- **Desregistro:** los colores se corren 2–4 px respecto del contorno, como una imprenta mal calibrada. Es sutil en reposo y se exagera en las transiciones.

---

## 4. Personajes y motivos

### 4.1 Las manos (motivo principal)
La política y la tecnología tratan de **quién controla qué**, así que la mano es el símbolo central del estilo:
- Manos que giran perillas, firman, mueven fichas, sostienen herramientas o tiran de hilos.
- Cada actor de la historia (gobierno, empresa, organismo, ciudadanía) es una **mano de un color**.
- Los accesorios cuentan la historia: reloj dorado = dinero, anillo con sello = poder, guante de látex = burocracia, mano manchada de grasa = trabajo.

### 4.2 Gente genérica: "los anónimos"
- Figuras sin rostro, con **dos puntos como ojos** y cuerpo simplificado.
- Representan a la ciudadanía, a usuarios y trabajadores, a "la gente".
- Se expresan con postura, tamaño y con lo que hacen con las manos, no con caras.

### 4.3 Personas reales (regla dura)
- **Nunca se ilustran ni se generan con IA** políticos, empresarios ni ninguna persona real.
- Se usan **fotos de archivo reales** con tratamiento de impresión: duotono (tinta + 1 color), trama de puntos, recorte con borde de papel y **crédito visible**.
- Sin deformar, caricaturizar ni poner expresiones que no tuvieron.

---

## 5. Código de veracidad

Cada tipo de información tiene un tratamiento visual fijo y el espectador lo aprende con el uso.

| Tipo | Tratamiento | Sello |
|---|---|---|
| **Hecho confirmado** | Documento nítido + resaltador mostaza + etiqueta de fuente | `CONFIRMADO` en verde |
| **Declaración** | Cita en recorte de papel + foto duotono + nombre y fecha | `DIJO` en tinta |
| **En disputa / sin confirmar** | Papel arrugado + rayado diagonal + desaturado | `SIN CONFIRMAR` en naranja |
| **Análisis / opinión** | Hoja cuadriculada de libreta + letra manuscrita | `ANÁLISIS` en tinta |

**Etiqueta de fuente:** siempre en la esquina inferior izquierda, en tipografía mono, con este formato: `FUENTE · Medio — dd/mm/aaaa`.

---

## 6. Tipografía

Tokens en [`/tokens/typography.json`](../tokens/typography.json).

| Rol | Fuente | Uso |
|---|---|---|
| Display | **Bricolage Grotesque** ExtraBold, condensada | Títulos, cifras grandes, nombres de bloque |
| Texto | **Instrument Sans** | Subtítulos, citas, etiquetas |
| Utilidad | **IBM Plex Mono** | Fuentes, fechas, datos, sellos |

- Texto en pantalla: **máximo 7 palabras** por placa.
- Las cifras van en display, enormes, con la unidad pequeña al lado.
- El texto entra **palabra por palabra en sincronía con la voz** o de golpe, nunca con fade lento.

---

## 7. Movimiento

Tokens en [`/tokens/motion.json`](../tokens/motion.json).

**Dos velocidades conviven**, y ese contraste es parte de la firma:
- **Personajes y manos:** animación limitada "en dos" (12 fps) con *line boil*, es decir, el contorno tiembla levemente cada 2–3 cuadros.
- **Cámara, gráficos y texto:** suaves, a 24/30 fps completos.

**Curvas con nombre**
| Nombre | Curva | Uso |
|---|---|---|
| `sello` | entra rápido, rebota 1 vez (overshoot 8 %) | Sellos, etiquetas, cifras |
| `papel` | ease-out largo, sin rebote | Recortes que se apoyan en la mesa |
| `imprenta` | escalonado (steps) | Desregistro, apariciones "impresas" |
| `respiro` | ease-in-out muy lento | Movimiento de cámara ambiental |

**Reglas**
- Todo entra en la **palabra exacta** en que la voz lo nombra.
- Después de un dato fuerte viene un **respiro**: 1–2 s casi quietos.
- Squash & stretch solo en manos y objetos, de forma moderada. Los documentos no se deforman.

---

## 8. Cámara

Tokens en [`/tokens/camera.json`](../tokens/camera.json).

El mundo es una **mesa de trabajo 2.5D**: capas planas a distintas profundidades y una cámara que viaja entre ellas. La lente es casi ortográfica: no hay distorsión de perspectiva.

### Ángulos permitidos
1. **Frontal plano:** como mirar un afiche. Es el ángulo por defecto para escenas y personajes.
2. **Cenital (mesa):** desde arriba, mirando documentos, mapas y manos sobre la mesa.
3. **Isométrico 3/4:** para máquinas, consolas, edificios y sistemas (ver referencia 2).

### Movimientos permitidos
| Movimiento | Descripción | Duración típica |
|---|---|---|
| **Empuje** | Push-in lento hacia el elemento clave | 3–6 s |
| **Paneo de mesa** | Desplazamiento lateral sobre la mesa con parallax entre capas | 2–4 s |
| **Zoom portal** | Zoom a un detalle que se convierte en la escena siguiente | 1–1.5 s |
| **Elevación** | De frontal a cenital (o al revés) para "mirar el tablero" | 1.5–2 s |
| **Corte en golpe** | Corte seco sincronizado con un golpe de sonido. Máximo 1 cada 20 s. | instantáneo |

### Prohibido
- Cámara en mano o temblor (el temblor ya lo da el *line boil*).
- Órbitas 3D y perspectiva exagerada.
- Ángulos holandeses.
- Zoom sobre imágenes rasterizadas que se pixelan.
- Movimientos sin motivación: la cámara se mueve solo para **revelar** o **conectar**.

---

## 9. Transiciones

- **Firma: "Desregistro".** Las capas de color de la escena siguiente entran por separado (naranja, verde, mostaza) desplazadas y se alinean con el contorno en tinta. Dura de 10 a 14 cuadros.
- **Zoom portal:** se usa para pasar de lo general a lo particular.
- **Hoja que se da vuelta:** para cambiar de bloque narrativo.
- **Corte en golpe:** para sorpresas.
- Prohibido: disolvencias largas, barridos con estrella y transiciones de plantilla.

---

## 10. Estructura narrativa

Cada video sigue **cuatro bloques**, y cada bloque tiene su "modo" de color, cámara y música:

| Bloque | Pregunta | Fondo dominante | Cámara | Música |
|---|---|---|---|---|
| **1. Qué pasó** | ¿Cuál es la noticia? | `naranja` | Cortes en golpe, empuje rápido | Pulso, tensión |
| **2. Contexto** | ¿Cómo llegamos acá? | `verde` | Paneo de mesa, líneas de tiempo | Más calma |
| **3. Por qué importa** | ¿A quién afecta? | `mostaza` | Zoom portal a "los anónimos" | Emocional, contenida |
| **4. Qué viene** | ¿Qué hay que mirar? | `papel` | Elevación a cenital, el tablero completo | Resolución |

---

## 11. Plantillas (escenas reutilizables)

1. **Titular:** el recorte de diario cae a la mesa (`papel`), empuje y resaltador.
2. **Línea de tiempo:** cinta de papel con fechas en mono y paneo de mesa.
3. **Quién es quién:** fotos duotono como fichas sobre la mesa, con hilos entre ellas.
4. **El dato:** cifra gigante en display con sello.
5. **El documento clave:** página del documento real, resaltador y el resto desenfocado.
6. **Mapa:** mapa plano con trama y regiones que se pintan, más zoom portal.
7. **Gráfico que se construye:** barras o línea dibujadas con contorno de tinta, una a la vez.
8. **La máquina:** diagrama isométrico de un sistema (algoritmo, cadena de pagos, proceso legislativo) operado por manos.
9. **Las manos:** escena metafórica de poder (perillas, hilos, fichas).
10. **Cierre "qué mirar":** checklist en libreta con lo que viene.

---

## 12. Formatos

- **Master:** 16:9, 1920×1080 (o 3840×2160).
- **Zona segura vertical:** franja central de 608 px de ancho (equivale a 9:16 a 1080 de alto). Lo esencial de cada plano vive ahí, así cada video largo se recorta en clips verticales.
- **Zona de fuente:** esquina inferior izquierda, fuera de la zona de subtítulos.

---

## 13. Sonido

- **Foley de papel y oficina:** papel que se apoya, sellos de goma, máquina de escribir, perillas. Es el "SFX de la casa".
- **Música:** instrumental, con texturas analógicas (sintes vintage, bajo, percusión seca), sin letra.
- **Voz:** cercana, clara y sin dramatismo. El estilo visual pone el ritmo, no la voz impostada.
- **Silencios:** un silencio de 0.5 s antes de un dato clave.

---

## 14. Ética (no negociable)

1. Ninguna persona real se genera con IA (ni imagen ni voz).
2. Toda afirmación lleva su fuente en pantalla.
3. El código de veracidad se respeta siempre.
4. Las fotos de archivo tienen licencia o uso legítimo y crédito visible.
5. La sátira, si la hay, se marca explícitamente.
6. Ningún color identifica a un partido.

---

## Pendientes
- [ ] Nombre del canal y logo.
- [ ] País o región principal (para la lista negra de colores partidarios).
- [ ] Hoja de personajes: manos (5 poses) y anónimos (5 poses).
- [ ] Librería de texturas: trama, grano, papel, rayado.
- [ ] Primer video piloto para validar la biblia.
