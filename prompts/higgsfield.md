# Kit de prompts TRAMA para Higgsfield

Plantillas para generar con Higgsfield (por MCP desde Claude) respetando la biblia.
El flujo de la referencia 5 es: **imagen fija → animación → ediciones por prompt**.

> Reglas antes de generar (biblia, sección 14):
> - Nunca pedir personas reales (políticos, empresarios, figuras públicas) ni logos de marcas o medios.
> - Lo generado es solo para elementos genéricos: lugares, edificios, objetos, manos, gente anónima.
> - Las fotos de personas reales se colocan después, desde archivo, con crédito.

---

## 1. Bloque de estilo (pegar al final de todo prompt de imagen)

```
Editorial paper collage illustration in retro print style. Two materials combined:
(1) flat vector illustration with thick dark brown-black ink outlines (#17140F), flat colors,
halftone dot shading at 45 degrees, subtle misregistration between color and line;
(2) vintage engraving / archival photo cutouts in duotone (ink + cream paper), each cutout
with a thin white paper border and a hard offset ink shadow.
Limited palette: cream paper #F2E6CF, ink #17140F, burnt orange #EE6A1F, bottle green #1F6E55,
mustard #F3A72B, plus pink skin #E79A8C and steel gray #B8B5AE. Max 3 colors besides ink and paper.
Torn paper edges with visible white fibers, faint old newspaper texture in the background,
paper grain overall. Flat 2.5D layered composition, orthographic, no perspective distortion.
No gradients, no glossy 3D, no neon, no real people, no text, no logos.
```

## 2. Plantillas de imagen

**Afiche con sujeto central (modo afiche, 9:16)**
```
Vertical 9:16 poster composition. A large flat burnt-orange circle behind a central subject:
{SUJETO}. Thin dotted ink circle around it. Lots of empty cream paper space at the top for
headline text. [BLOQUE DE ESTILO]
```

**Las manos (metáfora de poder)**
```
Three oversized cartoon hands in flat vector style with thick ink outlines entering from the
top of the frame, each sleeve a different color (orange, green, mustard), {ACCIÓN: turning
knobs on a vintage control panel / pulling strings attached to a building / moving chess
pieces on a map}. Top-down isometric 3/4 view. Hatching for volume on machines. [BLOQUE DE ESTILO]
```

**Escena de contexto histórico**
```
Paper collage scene: vintage engraving of {LUGAR: a factory with smokestacks / a parliament
building / a port with ships} as a duotone cutout, paper clouds, small ink silhouettes of
anonymous people walking in a row at the bottom, torn paper horizon. [BLOQUE DE ESTILO]
```

**Mano que sostiene (ilustración + archivo)**
```
A large engraved-style hand holding up a cluster of {OBJETO: buildings / servers / coins /
ballot boxes} as duotone archival cutouts, flat orange circle behind, small paper birds.
[BLOQUE DE ESTILO]
```

**Gente anónima**
```
Simple faceless characters: rounded body, round head with only two black dot eyes, no mouth,
thick ink outline, flat colors, {ACCIÓN}. [BLOQUE DE ESTILO]
```

## 3. Prompt de animación (imagen → video)

```
Animate this paper collage in stop-motion style at 12-15 fps (on twos): the cutouts appear one
by one as if placed by hand on a table during the first second, with tiny jitter in position
and rotation on each step. Then hold the composition with minimal movement: {ELEMENTO VIVO:
smoke puffs rising in steps / paper clouds drifting / birds flapping}. Slow smooth camera
push-in (scale 1.00 to 1.06). No morphing, no realistic fluid motion, no new objects,
keep all outlines and colors stable.
```

## 4. Ediciones por prompt (como en la referencia)

- `Change the background to {color de la paleta}, keep everything else identical.`
- `Swap the {objeto} for {objeto nuevo}, same style, same position.`
- `Remove the background, keep only the cutouts with their white paper borders.`
- `Add {elemento} falling in stop-motion steps.`
- `Draw a mustard marker circle around the {detalle}, appearing as if hand drawn.`

## 5. Checklist antes de usar un resultado

- [ ] ¿Respeta la paleta (máximo 3 colores + tinta + papel)?
- [ ] ¿Contornos de tinta y trama visibles, sin gradientes ni brillo 3D?
- [ ] ¿No aparece ninguna persona real, logo ni texto inventado legible?
- [ ] ¿El color de acento no representa a un partido?
- [ ] ¿Queda espacio para la tipografía cinética?
