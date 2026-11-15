# TRAMA — Biblia de estilo (v0.1, borrador)

> **Trama** es el nombre de trabajo del estilo. Juega con dos sentidos: la *trama* de puntos de la imprenta (halftone) y la *trama* detrás de una noticia, lo que realmente pasó.
> El nombre del canal está por definir: donde dice `[NOMBRE]` va el definitivo.

Explainers de **política, tecnología y actualidad**: qué pasó, por qué importa y qué viene.
La gramática viene del video explicativo editorial (documentos, datos, mapas, cámara que viaja por un lienzo). La piel es **ilustración vectorial con estética de impresión retro**.

---

## 0. Reglas duras (se cumplen en todos los planos, siempre)

Estas reglas están por encima de cualquier otra sección. Un plano que rompe una de ellas no sale.

1. **El texto nunca se corta.** Ninguna palabra puede quedar cortada por el borde del cuadro, tapada o con letras pisadas (por ejemplo, el acento de "Ó" montado sobre la línea de arriba). Todo texto queda dentro del margen de seguridad (84 px a los lados en 1080, 40 px como mínimo absoluto), **incluso con el empuje de cámara aplicado**. Los títulos grandes se autoajustan al ancho disponible. La única excepción son las **palabras gigantes de fondo** (decorativas, al 10–15 %), que pueden salir del cuadro.
2. **Nunca un plano estático.** No existe un plano que sea "una palabra sobre un color". Cada plano tiene **una imagen** (foto tratada, ilustración o gráfico de datos) que ocupa al menos el 12 % del cuadro y **motion graphics**: mínimo dos capas que se mueven a distinta velocidad (empuje, deriva de la imagen, anillos que giran, cinta que corre, parallax, glifos). El texto acompaña a la imagen, nunca la reemplaza.
3. **Si la noticia es sobre una persona, su foto aparece.** Foto real de archivo en **blanco y negro** (duotono tinta + papel, con trama), con licencia que permita el uso (por ejemplo Wikimedia Commons con CC BY / CC BY-SA, o agencia con licencia) y **crédito visible en pantalla**. Nunca ilustrada, generada ni alterada en su expresión.
4. **Material real abajo, dibujos a mano arriba.** Todo gráfico explicativo (batallas, mapas, procesos, recorridos, comparaciones) se construye sobre material real: mapa de época o actual, foto, pintura o documento, en duotono tinta + papel. Encima van las anotaciones de `engine/anota.js`: trazos de pincel con grosor variable, curvas que siguen el terreno, puntas de flecha dibujadas, círculos de marcador que se trazan en vivo, etiquetas de papel. **Prohibido** armar mapas o esquemas con formas geométricas dibujadas en código sobre un fondo liso (líneas rectas, rectángulos, flechas rígidas): se ven amateurs. Detalle en la sección 21.
5. **Movimiento fluido.** La cámara viaja por el material (mapa, foto, pintura) con keyframes y curvas suaves, acercándose al detalle y alejándose para ver el conjunto. Cámara, trazos, unidades y gráficos se mueven sin pasos. El stop-motion de 15 fps queda solo para recortes de collage que entran a cuadro.
6. **Lectura limpia.** En escenas de mapa o foto a pantalla completa, la tipografía va sobre una cabecera de papel rasgado. Ninguna palabra queda tapada por una imagen y ninguna etiqueta dibujada queda cortada por el borde del cuadro. Los nombres de las unidades y las etiquetas se leen siempre derechos.
7. **Control automático antes de renderizar.** `node tools/qa_video.js <video>/index.html` revisa cada escena: texto fuera de margen o cortado, texto tapado por una imagen, etiqueta dibujada cortada por el borde, escena sin imagen y escena sin movimiento. Si falla, no se renderiza.

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
4. **Video vertical de afiches con tipografía cinética** (15 s, referencia de **ritmo y montaje**, no de look): cada frase es un afiche de diseño suizo, con imagen central en blanco y negro, una sola forma roja detrás del sujeto, micro-tipografía decorativa y palabras que aparecen en sincronía con la voz. Corta cada ~1.5 s. Ver secciones 15 y 16.
5. **Tutorial de collage animado estilo explainer** (70 s, vertical): grabados y fotos antiguas recortadas con borde blanco, papel rasgado, diarios viejos de fondo, un círculo plano de acento detrás y armado en stop-motion. Muestra el flujo con Higgsfield (imagen, luego animación y edición por prompt). Ver secciones 17 y 18, y [`/prompts/higgsfield.md`](../prompts/higgsfield.md).
6. **Globo de glifos** (9.5 s, cuadrado): un planeta que gira, dibujado como grilla de símbolos (monedas, anillos) en un solo color sobre fondo azul plano. Ver sección 20.

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
- Si la historia es sobre una persona, **su foto aparece** (regla dura 3): archivo real en blanco y negro con trama y crédito. Fuente preferida: Wikimedia Commons (CC BY / CC BY-SA, con autor y licencia en pantalla).
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

## 15. Tipografía cinética

Tomado de la referencia 4. Es el sistema de subtítulos "de diseño" del canal y se usa en todos los formatos.

**Jerarquía de dos niveles**
- **Línea de entrada:** las palabras de enlace ("no se trata de", "lo que importa es") van chicas, en Instrument Sans, arriba.
- **Palabra clave:** el concepto va grande, en Bricolage ExtraBold condensada, con interletrado apretado (−3 %) y pegada a la línea de entrada.
- Nunca más de **2 líneas** en pantalla.

**Aparición**
- Palabra por palabra, en la sílaba exacta en que la voz la dice.
- Cada palabra entra en **gris al 40 %** y pasa a **tinta** (o papel, sobre fondo oscuro) cuando se pronuncia, como un karaoke editorial.
- Entrada con la curva `sello`, con un desplazamiento vertical mínimo de 8 a 12 px.

**Palabra gigante de fondo**
- La palabra clave del bloque se repite enorme (de 3 a 4 veces el alto del cuadro de texto), cortada por los bordes, detrás del sujeto.
- Va en tinta al 10–15 % o en el color del bloque, con un desplazamiento lateral lento (parallax tipográfico).

**Clímax tipográfico**
- Una vez por video, la palabra central se agranda al máximo **que entre completa** en el ancho seguro (autoajuste), **sobre la imagen** del protagonista, con corte en golpe y sello. Nunca se corta por los bordes ni aparece sin imagen (regla dura 1 y 2).

---

## 16. Modo afiche (shorts verticales)

Es el montaje para clips de 9:16 de 15 a 60 s. Viene de la referencia 4, adaptado a la piel TRAMA.

**Cada frase es un afiche**
- Un plano = una frase = un afiche completo y compuesto, que funcionaría como póster impreso.
- Duración promedio de **1.5 s** (la referencia corta en 1.4 · 3.0 · 4.5 · 5.7 · 8.8 · 9.5 · 10.5 · 13.1 s). El corte cae siempre al terminar la frase.
- Dentro de cada afiche hay un **empuje** continuo y lento (escala de 1.00 a 1.06), así ningún plano queda congelado.

**Anatomía del afiche**
1. **Sujeto central:** una ilustración TRAMA (mano, anónimo u objeto) o una foto de archivo en duotono.
2. **Forma de acento:** un círculo o rectángulo **naranja** plano detrás del sujeto. Es la única forma de color fuerte del afiche.
3. **Tipografía cinética** según la sección 15.
4. **Micro-tipografía de documento:** detalles chicos en mono que hacen que el afiche parezca un objeto impreso real. Para noticias usamos metadatos verdaderos de la historia: número de expediente o de ley, fecha, folio, coordenadas, número de votos, código de barras. Nunca son decorativos inventados que puedan confundirse con datos reales.
5. **Líneas finas:** círculos punteados, guías y marcas de corte en tinta, a 1–2 px.

**Alternancia papel / tinta**
- Los afiches alternan fondo claro (papel) y fondo oscuro (tinta) para marcar el ritmo.
- El fondo tinta se reserva para los momentos de reflexión o de cambio de idea.

**Cierre**
- Logo o nombre del canal, chico y centrado sobre tinta, con 2 s de aire.

**Lo que no tomamos de la referencia**
- Personajes o escenas de películas y series: nada de propiedad intelectual ajena.
- El rojo: nuestro acento es el naranja. El rojo queda para los actores y los datos negativos.
- La foto en blanco y negro como look principal: la piel sigue siendo ilustración impresa, y la foto queda para personas reales en duotono.

---

## 17. Collage de archivo (segundo material)

Tomado de la referencia 5. TRAMA trabaja con **dos materiales** que conviven en el mismo plano:

| Material | Para qué | Cómo se ve |
|---|---|---|
| **Ilustración TRAMA** | Personajes, manos, metáforas, gente anónima | Vector, contorno de tinta, colores planos, trama |
| **Recorte de archivo** | Lugares, edificios, máquinas, objetos, documentos, personas reales | Grabado antiguo o foto de archivo, recortado con borde de papel blanco |

**Qué los une** (sin esto el collage se ve armado al azar):
- Los recortes pasan por el mismo tratamiento: **duotono** (tinta + papel, o tinta + un color de la paleta), trama de puntos y grano.
- Se pueden mezclar: una mano ilustrada sostiene un edificio grabado, o un grabado de fábrica larga humo ilustrado.
- Los dos materiales comparten la sombra dura en tinta (desplazada 4–6 px, sin desenfoque).

**Recursos del collage**
- **Papel rasgado:** los cambios de plano y los bordes de capas grandes usan un corte irregular con la fibra blanca del papel a la vista.
- **Fondo de diario viejo:** titulares y columnas en tinta al 10–20 %, desenfocados, como textura (nunca legibles como noticia real inventada).
- **Círculo de acento:** el círculo plano naranja detrás del sujeto, compartido con el modo afiche.
- **Anotación a mano:** círculo o subrayado de marcador mostaza dibujado en vivo sobre el detalle clave (por ejemplo, rodear una chimenea).
- **Siluetas** de multitudes caminando en tinta plana, para "la gente" en escenas históricas.
- **Elementos vivos:** humo, nubes de papel, pájaros recortados. Se mueven en stop-motion, nunca de forma fluida y realista.

**Origen de las imágenes**
- Los grabados y fotos antiguas salen de archivos de **dominio público** (bibliotecas nacionales, Wikimedia Commons, Library of Congress) o se generan con IA **solo cuando son genéricos** (un edificio, una fábrica, un tren).
- Las personas reales siguen la regla de la sección 4.3: foto real con crédito, nunca generada.

---

## 18. Stop-motion y armado de escena

La referencia 5 confirma la regla de "en dos": la escena se arma **pieza por pieza**, como alguien apoyando recortes sobre una mesa.

- **Armado:** al empezar un plano, los recortes entran de a uno, cada 2 cuadros (15 fps), en una ráfaga de 0.5 a 1.5 s. Después la escena **se sostiene** de 3 a 5 s con movimiento mínimo.
- **Boil de recortes:** en la ráfaga, cada pieza puede cambiar levemente de posición o rotación (±1°) en cada paso, como en el stop-motion real.
- **Sin interpolación suave** en los elementos de collage: humo, nubes y pájaros avanzan a saltos.
- **Excepción:** mapas, anotaciones, unidades y cámara se mueven fluidos (sección 21).
- La cámara sigue las reglas de la sección 8 (suave). El contraste entre collage a saltos y cámara suave es parte de la firma.

**Montaje para formatos con conductor en cámara** (opcional): pantalla dividida en vertical, con la animación arriba (55–60 %) y la persona abajo, y subtítulos en mayúsculas en la línea de unión, palabra por palabra.

---

## 19. Banco de imágenes: Pexels

Pexels está conectado (por Composio) y se usa como fuente de **recortes de archivo** genéricos.

**Para qué sí**
- Edificios, ciudades, fábricas, objetos, máquinas y tecnología.
- Texturas: papel viejo, papel arrugado, cartón kraft, diario, bordes rasgados.
- Videos como **elementos vivos** (humo, nubes, multitudes en silueta, servidores), siempre tratados y llevados a 15 fps.

**Para qué no**
- Noticias, hechos concretos o personas reales de la historia: Pexels no tiene ese material. Eso sale de archivo con crédito.
- Personas identificables de Pexels usadas como si fueran protagonistas de la noticia ("un votante", "un trabajador despedido"). La licencia prohíbe mostrarlas de forma engañosa u ofensiva. Para gente genérica se usan **los anónimos** ilustrados.
- Fotos sin tratar: todo lo que viene de Pexels pasa por el tratamiento TRAMA antes de entrar a un plano.

**Tratamiento automático**
`tools/trama_treat.py` convierte cualquier foto en recorte TRAMA (duotono, trama a 45°, desregistro, grano, borde blanco y sombra dura) leyendo los colores de `tokens/colors.json`:

```
python3 tools/trama_treat.py foto.jpg recorte.png --color mostaza --fondo verde
```

Ejemplos con crédito en [`/examples/pexels-test`](../examples/pexels-test).

**Crédito:** la licencia de Pexels no lo exige, pero el canal lo da igual en la descripción del video (fotógrafo + link), como parte de la regla de fuentes visibles.

---

## 20. Trama de glifos

Tomado de la referencia 6 (un globo terráqueo que gira, dibujado como una grilla de símbolos sobre un fondo plano). Es la **trama de puntos llevada a datos**: en vez de puntos, cada celda es un símbolo que dice algo.

**Cómo funciona**
- La imagen se reduce a una grilla (celdas de 20–26 px en 1080).
- Cada celda elige un glifo según su luminosidad: vacío → anillo chico → anillo → **moneda con símbolo**.
- El símbolo es semántico y cambia con el tema: `$` dinero, `%` mercado, `✓`/`×` votos, `◆` chips, `!` alerta.
- Dos colores nada más: fondo plano de la paleta + glifos en papel o naranja.

**Cuándo usarla**
- Globos y mapas (comercio, sanciones, exportaciones de chips).
- Cifras y masas ("millones de usuarios", "miles de millones de dólares").
- Siluetas simples con forma clara. Con fotos complejas no se lee: el origen tiene que tener figura y fondo bien separados.

**Movimiento**
- La fuente gira o se desplaza de forma suave (un globo rotando), y la grilla se recalcula a **15 fps**, lo que da el parpadeo de los glifos.
- Los glifos pueden "encenderse" de a grupos para revelar una región del mapa.

`tools/trama_glifos.py` genera la trama a partir de cualquier imagen, con los colores de la paleta. Prueba en [`/examples/glifos-test.jpg`](../examples/glifos-test.jpg).

---

## 21. Mapas, batallas y procesos: material real + dibujos a mano

Aprendido en el piloto 02: los mapas y diagramas **dibujados desde cero en código** (líneas rectas, rectángulos, flechas rígidas) se ven amateurs. El estándar de calidad es el del explainer editorial: **material real abajo, dibujos a mano arriba, cámara fluida**.

**Base: siempre material real**
- Mapas de época (atlas del siglo XIX, planos militares) o mapas actuales con licencia, en duotono tinta + papel.
- Fotos reales (Pexels, archivo) o pinturas de época cuando no hay mapa: los dibujos van encima de la foto.
- Nunca un fondo liso con formas geométricas inventadas.

**Dibujos encima (`engine/anota.js`)**
- **Trazos de pincel** con grosor variable (fino → grueso → fino) y leve temblor: flechas, subrayados, tachados. Nada de líneas de grosor constante.
- **Curvas**, no rectas: las flechas siguen el terreno (caminos, ríos, valles).
- **Puntas de flecha dibujadas** con dos trazos que aparecen al final, no triángulos.
- **Círculos de marcador** de algo más de una vuelta, irregulares, que se dibujan en vivo.
- **Etiquetas de papel** clavadas en el mapa, que entran con rebote.
- **Unidades estilo atlas** (rectángulos redondeados con borde de tinta y sombra) que viajan por curvas y dejan rastro. Sus nombres siempre derechos, nunca rotados.
- Colores: naranja para el protagonista, azul y verde para los demás actores, mostaza para marcar, tinta para tachar.

**Movimiento: fluido**
- La **cámara viaja por el mapa** con keyframes y curvas suaves (acercarse al detalle, alejarse para ver el tablero). Los dibujos viven en la misma capa que el mapa, así quedan pegados al terreno.
- Los trazos, las unidades y la cámara se mueven **sin pasos**: el stop-motion de 15 fps (sección 18) queda solo para recortes de collage que entran a cuadro, nunca para mapas ni anotaciones.

**Lectura**
- En escenas de mapa, el texto va sobre una **cabecera de papel rasgado** arriba; el mapa ocupa el resto del cuadro.
- Ninguna etiqueta dibujada puede quedar cortada por el borde (lo controla `tools/qa_video.js`).

---

## Pendientes
- [ ] Nombre del canal y logo.
- [ ] País o región principal (para la lista negra de colores partidarios).
- [ ] Hoja de personajes: manos (5 poses) y anónimos (5 poses).
- [ ] Librería de texturas: trama, grano, papel, rayado.
- [ ] Primer video piloto para validar la biblia.
