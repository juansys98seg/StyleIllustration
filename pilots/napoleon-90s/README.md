# Piloto 02 — Napoleón (vertical 9:16, 83 s)

- `GUION.md`: guion, plano por plano, notas de rigor y fuentes.
- `index.html`: la animación, construida sobre el motor compartido `engine/` (mapas, ejércitos de glifos, flechas, tipografía cinética).
- `audio/voz.mp3`: locución. `audio/cues.json`: efectos (papel, sellos, golpes). `audio/mezcla.wav`: voz + efectos.

Armar el video (desde la raíz del repo):
```
node tools/qa_video.js pilots/napoleon-90s/index.html     # tiene que dar "Todo en regla"
node tools/render_video.js pilots/napoleon-90s            # 2.496 cuadros en build/frames
python3 tools/sfx.py pilots/napoleon-90s/audio/sfx.wav 83.2 pilots/napoleon-90s/audio/cues.json
```
Después mezclar y codificar con `ffmpeg` como en `pilots/huang-30s/README.md`.

## Créditos de imágenes (Wikimedia Commons, dominio público)

| Uso | Obra | Autor |
|---|---|---|
| Napoleón (planos 1–2) | [The Emperor Napoleon in His Study at the Tuileries](https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_The_Emperor_Napoleon_in_His_Study_at_the_Tuileries_-_Google_Art_Project.jpg) (1812) | Jacques-Louis David |
| Toulon (plano 3) | [Napoléon à Toulon](https://commons.wikimedia.org/wiki/File:Napoleon_%C3%A0_Toulon_par_Edouard_Detaille.jpg) | Édouard Detaille |
| Waterloo (plano 12) | [Battle of Waterloo 1815](https://commons.wikimedia.org/wiki/File:Battle_of_Waterloo_1815.PNG) | William Sadler |
| Clausewitz (plano 13) | [Clausewitz](https://commons.wikimedia.org/wiki/File:Clausewitz.jpg) | Wilhelm Wach |
| San Martín (plano 14) | [Retrato del general José de San Martín, 1818](https://commons.wikimedia.org/wiki/File:RETRATO_DEL_GENERAL_JOS%C3%89_DE_SAN_MART%C3%8DN_1818.jpg) | José Gil de Castro |

Los mapas son esquemas dibujados en código (no son cartografía exacta) y lo dicen en pantalla.
