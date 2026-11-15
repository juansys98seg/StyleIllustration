# Piloto 02 — Napoleón (vertical 9:16, 83 s)

- `GUION.md`: guion, plano por plano, notas de rigor y fuentes.
- `index.html` + `scenes_v2.js`: la animación, sobre el motor compartido `engine/`. Las batallas usan mapas de época con cámara y dibujos a mano encima (`engine/anota.js`).
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

| Batalla de Austerlitz (planos 9–11) | [La bataille d'Austerlitz](https://commons.wikimedia.org/wiki/File:La_bataille_d%27Austerlitz._2_decembre_1805_(Fran%C3%A7ois_G%C3%A9rard)_(cropped,_1to1_portrait).jpg) (1810) | François Gérard |
| Mapa de Toulon | [Siege of Toulon, 19 December 1793](https://commons.wikimedia.org/wiki/File:Siege_of_Toulon,_19_December_1793._A.K._Johnston_F.R.G.S._William_Blackwood_and_Sons,_Edinburgh_and_London._(to_accompany)_Atlas_to_(IA_dr_siege-of-toulon-19-december-1793-ak-johnston-frgs-william-blackwood-13200020).jpg) | A.K. Johnston (atlas de Alison, 1850) |
| Mapa de Ulm | [Map of the operations which led to the Capitulation of Ulm](https://commons.wikimedia.org/wiki/File:Map_of_the_operations_which_led_to_the_Capitulation_of_Ulm_in_October_1805._A.K._Johnston_F.R.G.S._William_Blackwood_and_(IA_dr_map-of-the-operations-which-led-to-the-capitulation-of-ulm-in-october-1805-13200048).jpg) | A.K. Johnston (atlas de Alison, 1850) |
| Mapa de Austerlitz | [Battle of Austerlitz, 2 December 1805](https://commons.wikimedia.org/wiki/File:Battle_of_Austerlitz,_2_December_1805._A.K._Johnston_F.R.G.S._William_Blackwood_and_Sons,_Edinburgh_and_London._(to_accompany)_(IA_dr_battle-of-austerlitz-2-december-1805-ak-johnston-frgs-william-black-13200049).jpg) | A.K. Johnston (atlas de Alison, 1850) |
| Plano de Montenotte | [Plan No.02 Montenotte](https://commons.wikimedia.org/wiki/File:Plan_No.02_Montenotte.jpg) | Scheffner |

Foto de los Andes: [Aerial view of the Andes mountains in Chile](https://www.pexels.com/photo/aerial-view-of-the-andes-mountains-in-chile-37056464/), Marilia B. C. (Pexels).

Las flechas, unidades y círculos dibujados sobre los mapas son ilustrativos: muestran la idea de cada maniobra, no posiciones exactas.
