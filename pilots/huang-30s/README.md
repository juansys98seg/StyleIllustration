# Piloto 01 — Huang (vertical 9:16, 28 s)

- `GUION.md`: guion, plano por plano, fuentes y créditos.
- `index.html`: la animación. `render(t)` dibuja cualquier instante, así el render es exacto cuadro por cuadro.
- `render.js`: `node render.js full` genera los 840 cuadros en `build/frames` (`node render.js preview 2.5,7.3` para cuadros sueltos).
- `sfx.py`: genera los efectos (papel, sellos, golpe) en `audio/sfx.wav`.
- `audio/voz.mp3`: locución (Fish Audio). `audio/mezcla.wav`: voz + efectos.

Armar el video:
```
node ../../tools/qa_video.js index.html   # tiene que dar "Todo en regla"
node render.js full
python3 sfx.py
ffmpeg -i audio/voz.mp3 -i audio/sfx.wav -filter_complex "[0]aresample=48000,apad=whole_dur=28[v];[1]volume=0.32[s];[v][s]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-15:TP=-1.5[a]" -map "[a]" audio/mezcla.wav
ffmpeg -framerate 30 -i build/frames/%04d.jpg -i audio/mezcla.wav -c:v libx264 -crf 19 -pix_fmt yuv420p -c:a aac -shortest piloto01-huang-sin-musica.mp4
```
Para sumar música: agregarla como tercera entrada del primer `ffmpeg`, a −18 dB por debajo de la voz.
