# Piloto 03 — Bernays vs. hoy (vertical 9:16, 88 s)

- `GUION.md`: guion, plano por plano, notas de rigor y fuentes.
- `index.html` + `scenes.js`: la animación, sobre el motor compartido `engine/` (`photoView`, `viewCam`, anotaciones a mano de `anota.js`).
- `audio/voz.mp3`: locución. `audio/cues.json`: efectos. `audio/mezcla.wav`: voz + efectos.

Armar el video (desde la raíz del repo):
```
node tools/qa_video.js pilots/bernays-90s/index.html     # tiene que dar "Todo en regla"
node tools/render_video.js pilots/bernays-90s            # 2.637 cuadros
python3 tools/sfx.py pilots/bernays-90s/audio/sfx.wav 87.9 pilots/bernays-90s/audio/cues.json
```

## Créditos

**Archivo (Wikimedia Commons)**

| Uso | Obra | Autor / origen | Licencia |
|---|---|---|---|
| Desfile (referencia, plano 1) | [Easter Parade, Fifth Ave., New York](https://commons.wikimedia.org/wiki/File:Easter_Parade,_Fifth_Ave.,_New_York_LCCN2014684592.jpg) (1910) | Bain News Service, Library of Congress | Dominio público |
| Aviso de Lucky Strike (planos 2 y 4) | [Lucky Strike 'prejudice' ad, Theatre Magazine](https://commons.wikimedia.org/wiki/File:Lucky_Strike_%27prejudice%27_ad_from_Theatre_Magazine,_December_1929.png) (dic. 1929) | American Tobacco Co. | Dominio público |
| Retrato de Bernays (plano 3) | [Edward Bernays cropped](https://commons.wikimedia.org/wiki/File:Edward_Bernays_cropped.png) (1917) | — | Dominio público |
| Retrato de Freud (plano 3) | [Sigmund Freud, by Max Halberstadt](https://commons.wikimedia.org/wiki/File:Sigmund_Freud,_by_Max_Halberstadt_(cropped).jpg) (c. 1921) | Max Halberstadt | Dominio público |
| Mapa de Centroamérica (plano 7) | [Central America and the Caribbean Shaded Relief Map](https://commons.wikimedia.org/wiki/File:Central_America_and_the_Caribbean_Shaded_Relief_Map.png) | Gobierno de EE.UU. | Dominio público |
| Retrato de Árbenz (plano 7) | [Jacobo Arbenz Guzman (oficial)](https://commons.wikimedia.org/wiki/File:Jacobo_Arbenz_Guzman_(oficial).jpg) (1951) | Gobierno de Guatemala | Dominio público |
| Documento de la CIA (plano 8) | [CIA-Arbenz-overthrow-FOIA-documents-3of5](https://commons.wikimedia.org/wiki/File:CIA-Arbenz-overthrow-FOIA-documents-3of5.gif) | CIA, liberado por FOIA en 1975 | Dominio público |
| Bernays y Doris Fleischman (plano 9) | [Edward Bernays and Doris E. Fleischman](https://commons.wikimedia.org/wiki/File:Edward_Bernays_and_Doris_E._Fleischman.jpg) (1923) | — | Dominio público |
| Diario de 1929 (plano 10) | [Santa Ana Register front page, Oct 28, 1929](https://commons.wikimedia.org/wiki/File:Santa_Ana_Register_front_page,_Oct_28,_1929_-_Flickr_-_Orange_County_Archives.jpg) | Orange County Archives | CC BY 2.0 |

**Pexels:** [Estatua de la Libertad](https://www.pexels.com/photo/top-of-statue-of-liberty-20820869/) (Natalia FaLon), [desayuno](https://www.pexels.com/photo/breakfast-with-bacon-22882257/) (Hebert Santos), [Times Square](https://www.pexels.com/photo/bustling-times-square-in-new-york-city-35299317/) (Abhishek Navlakha), [aro de luz](https://www.pexels.com/photo/woman-fixing-a-smart-phone-on-a-tripod-13929321/) (Mizuno K), [celular](https://www.pexels.com/photo/person-holding-a-mobile-phone-4597991/) (I'm Zion), [calle](https://www.pexels.com/photo/photo-of-young-men-using-phones-on-a-street-19623369/) (Boris Hamer), [ojo](https://www.pexels.com/photo/portrait-of-person-with-face-illuminated-by-phone-light-12304661/) (Darya Grey_Owl).

**Notas de honestidad visual**
- La foto del desfile es de 1910 y se usa como **referencia** del lugar: lo dice en pantalla. No se marcan cigarrillos en ella.
- El diario de 1929 aparece como objeto de época ("los diarios"), no como fuente de la historia de la panceta.
- Las etiquetas "MÉDICO" sobre el desayuno son ilustrativas de la cifra (unos 4.500 médicos encuestados).
