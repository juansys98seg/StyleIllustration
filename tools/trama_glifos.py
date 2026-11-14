#!/usr/bin/env python3
"""Trama de glifos (biblia, sección 20): convierte una imagen en una grilla de símbolos.

Cada celda toma la luminosidad de la imagen y elige un glifo: vacío, anillo chico,
anillo, moneda con símbolo. El símbolo cambia según el tema ($, %, ✓, ×, etc.).

Uso: python3 tools/trama_glifos.py foto.jpg salida.png --simbolo '$' --fondo verde --tinta papel --celda 22
"""
import argparse, json
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
tok = json.loads((ROOT / "tokens/colors.json").read_text())
PAL = {k: v["value"] for g in ("base", "brand", "support") for k, v in tok[g].items()}

def glifos(src, out, simbolo="$", fondo="verde", tinta="papel", celda=22, ancho=1080, circulo=False, invertir=False):
    im = ImageOps.grayscale(Image.open(src).convert("RGB"))
    im = ImageOps.autocontrast(im, cutoff=2)
    if invertir: im = ImageOps.invert(im)
    W = ancho; H = int(im.height * W / im.width)
    cols, rows = W // celda, H // celda
    small = im.resize((cols, rows), Image.BILINEAR); px = small.load()
    canvas = Image.new("RGB", (W, H), PAL[fondo]); d = ImageDraw.Draw(canvas)
    fg = PAL[tinta]; bg = PAL[fondo]
    font_path = ROOT / "pilots/huang-30s/assets/fonts/ibm-plex-mono-latin-600-normal.woff2"
    try: font = ImageFont.truetype(str(font_path), int(celda * 0.5))
    except Exception: font = ImageFont.load_default()
    r0 = celda * 0.42
    for y in range(rows):
        for x in range(cols):
            cx, cy = x * celda + celda / 2, y * celda + celda / 2
            if circulo and ((x - cols / 2) ** 2 + (y - rows / 2) ** 2) ** .5 > min(cols, rows) / 2: continue
            v = px[x, y] / 255
            if v < 0.18: continue
            elif v < 0.38: d.ellipse([cx - r0 * .35, cy - r0 * .35, cx + r0 * .35, cy + r0 * .35], outline=fg, width=1)
            elif v < 0.6: d.ellipse([cx - r0 * .8, cy - r0 * .8, cx + r0 * .8, cy + r0 * .8], outline=fg, width=2)
            else:
                d.ellipse([cx - r0, cy - r0, cx + r0, cy + r0], fill=fg)
                d.ellipse([cx - r0 * .72, cy - r0 * .72, cx + r0 * .72, cy + r0 * .72], outline=bg, width=1)
                d.text((cx, cy), simbolo, fill=bg, font=font, anchor="mm")
    canvas.save(out)

if __name__ == "__main__":
    a = argparse.ArgumentParser(); a.add_argument("entrada"); a.add_argument("salida")
    a.add_argument("--simbolo", default="$"); a.add_argument("--fondo", default="verde", choices=sorted(PAL))
    a.add_argument("--tinta", default="papel", choices=sorted(PAL)); a.add_argument("--celda", type=int, default=22)
    a.add_argument("--circulo", action="store_true"); a.add_argument("--invertir", action="store_true")
    o = a.parse_args(); glifos(o.entrada, o.salida, o.simbolo, o.fondo, o.tinta, o.celda, circulo=o.circulo, invertir=o.invertir); print("ok", o.salida)
