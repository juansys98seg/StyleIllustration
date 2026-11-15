# TRAMA — sistema de estilo

Estilo visual para explainers de política, tecnología y actualidad: ilustración vectorial con estética de impresión retro (contorno de tinta, colores planos, trama de puntos) más la gramática del video explicativo editorial.

- [`bible/BIBLIA.md`](bible/BIBLIA.md): la biblia de estilo (alma, paleta, personajes, cámara, movimiento, ética).
- [`tokens/`](tokens): las decisiones de la biblia en JSON, para que el código y los prompts las lean.
- [`prompts/higgsfield.md`](prompts/higgsfield.md): kit de prompts para generar imágenes y animaciones con el estilo.
- [`tools/trama_treat.py`](tools/trama_treat.py): convierte fotos (por ejemplo de Pexels) en recortes con el tratamiento TRAMA.
- [`tools/trama_glifos.py`](tools/trama_glifos.py): trama de glifos (grilla de símbolos) a partir de una imagen.
- [`engine/`](engine): motor de animación compartido (`trama.js`) y anotaciones a mano sobre mapas y fotos (`anota.js`).
- [`tools/render_video.js`](tools/render_video.js) y [`tools/sfx.py`](tools/sfx.py): render de cuadros y efectos de sonido.
- [`tools/qa_video.js`](tools/qa_video.js): control automático de las reglas duras.
- [`examples/`](examples): pruebas del estilo.
- [`pilots/`](pilots): videos piloto.

## Reglas duras

Se cumplen en todos los planos de todos los videos (detalle en la sección 0 de la biblia):

1. **El texto nunca se corta** ni sale del margen de seguridad, ni siquiera con el empuje de cámara. Los títulos grandes se autoajustan.
2. **Nunca un plano estático**: cada plano tiene una imagen (foto tratada, ilustración o gráfico) y motion graphics con al menos dos capas en movimiento. Nada de "una palabra sobre un color".
3. **Si la noticia es sobre una persona, aparece su foto** de archivo en blanco y negro, con licencia y crédito en pantalla.
4. **Antes de renderizar**, correr `node tools/qa_video.js <video>/index.html`. Si falla, se corrige primero.

Próximo paso: componentes reutilizables (Remotion) y plantillas de escena.
