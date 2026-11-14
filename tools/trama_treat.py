#!/usr/bin/env python3
"""Tratamiento TRAMA para recortes de archivo (biblia, sección 17).

Convierte una foto (Pexels, archivo, etc.) en un recorte con el estilo:
duotono (tinta + color), trama de puntos a 45°, grano, borde de papel blanco
y sombra dura en tinta. Lee los colores de tokens/colors.json.

Uso:
  python3 tools/trama_treat.py entrada.jpg salida.png --color papel --fondo naranja
  python3 tools/trama_treat.py entrada.jpg salida.png --color mostaza --sin-fondo
"""
import argparse, json, random
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFilter, ImageChops

ROOT = Path(__file__).resolve().parent.parent
tok = json.loads((ROOT / "tokens/colors.json").read_text())
PAL = {k: v["value"] for grp in ("base", "brand", "support") for k, v in tok[grp].items()}
hexrgb = lambda h: tuple(int(h[i:i + 2], 16) for i in (1, 3, 5))


def halftone_mask(gray, cell):
    """Máscara de puntos (0 = punto de tinta) en una grilla rotada 45°."""
    w, h = gray.size
    big = int((w ** 2 + h ** 2) ** 0.5) + cell * 2
    g = gray.rotate(45, expand=True, fillcolor=255)
    gs = g.resize((g.width // cell + 1, g.height // cell + 1), Image.BILINEAR)
    m = Image.new("L", (gs.width * cell, gs.height * cell), 255)
    d = ImageDraw.Draw(m)
    px = gs.load()
    for y in range(gs.height):
        for x in range(gs.width):
            r = (1 - px[x, y] / 255) ** 1.1 * cell * 0.72
            if r > 0.35:
                cx, cy = x * cell + cell / 2, y * cell + cell / 2
                d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=0)
    m = m.resize(g.size).rotate(-45, fillcolor=255)
    ox, oy = (m.width - w) // 2, (m.height - h) // 2
    return m.crop((ox, oy, ox + w, oy + h))


def treat(src, color="papel", width=900, cell=None, trama=0.45, grano=0.07,
          borde=14, sombra=18, fondo=None, registro=3):
    tinta, hi = hexrgb(PAL["tinta"]), hexrgb(PAL[color])
    im = Image.open(src).convert("RGB")
    im = ImageOps.contain(im, (width, width * 2))
    g = ImageOps.autocontrast(ImageOps.grayscale(im), cutoff=2)
    g = g.filter(ImageFilter.UnsharpMask(2, 120, 2))
    duo = ImageOps.colorize(g, tinta, hi, mid=tuple((a + b) // 2 for a, b in zip(tinta, hi)))
    # trama: puntos de tinta en sombras y medios tonos
    cell = cell or max(5, width // 140)
    dots = halftone_mask(g, cell)
    ink = Image.new("RGB", duo.size, tinta)
    duo = Image.blend(duo, Image.composite(duo, ink, dots), trama)
    # desregistro: la capa de color corrida unos px respecto de la tinta
    if registro:
        shifted = ImageChops.offset(Image.new("RGB", duo.size, hi), registro, -registro)
        duo = Image.composite(duo, Image.blend(duo, shifted, 0.08), g.point(lambda p: 255 if p < 200 else 0))
    # grano de papel
    if grano:
        rnd = random.Random(7)
        noise = Image.effect_noise(duo.size, 64).point(lambda p: p)
        duo = Image.blend(duo, Image.merge("RGB", [noise] * 3), grano)
    # borde de papel blanco + sombra dura
    card = Image.new("RGBA", (duo.width + 2 * borde, duo.height + 2 * borde), (255, 255, 255, 255))
    card.paste(duo, (borde, borde))
    pad = sombra + 24
    out = Image.new("RGBA", (card.width + 2 * pad, card.height + 2 * pad),
                    hexrgb(PAL[fondo]) + (255,) if fondo else (0, 0, 0, 0))
    sh = Image.new("RGBA", card.size, tinta + (255,))
    out.alpha_composite(sh, (pad + sombra, pad + sombra))
    out.alpha_composite(card, (pad, pad))
    return out


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("entrada"); ap.add_argument("salida")
    ap.add_argument("--color", default="papel", choices=sorted(PAL), help="color claro del duotono")
    ap.add_argument("--fondo", default=None, choices=sorted(PAL), help="color de fondo (por defecto transparente)")
    ap.add_argument("--sin-fondo", action="store_true")
    ap.add_argument("--ancho", type=int, default=900)
    ap.add_argument("--trama", type=float, default=0.45, help="intensidad de la trama 0-1")
    a = ap.parse_args()
    treat(a.entrada, a.color, a.ancho, trama=a.trama, fondo=None if a.sin_fondo else a.fondo).save(a.salida)
    print("ok", a.salida)
