#!/usr/bin/env python3
"""Pista de efectos TRAMA (biblia, sección 13): papel, sellos y golpes, sintetizados (sin licencias).

Uso: python3 tools/sfx.py salida.wav DURACION cues.json
cues.json: {"papel":[0,4.8,...], "sello":[...], "golpe":[...], "golpe_suave":[...]}
"""
import json, sys, wave
import numpy as np
SR = 48000
rng = np.random.default_rng(3)
def env(n, a, d): t = np.arange(n) / SR; return np.minimum(t / a, 1) * np.exp(-t / d)
def bandnoise(n, lo, hi):
    X = np.fft.rfft(rng.standard_normal(n)); f = np.fft.rfftfreq(n, 1 / SR); X[(f < lo) | (f > hi)] = 0
    y = np.fft.irfft(X, n); return y / np.abs(y).max()
def papel(): n = int(SR * .32); return bandnoise(n, 1500, 7000) * env(n, .03, .09) * .5
def sello():
    n = int(SR * .35); t = np.arange(n) / SR
    return np.sin(2 * np.pi * (90 - 40 * t) * t) * np.exp(-t / .07) * .9 + bandnoise(n, 800, 4000) * np.exp(-t / .012) * .6
def golpe(g=1.0):
    n = int(SR * 1.1); t = np.arange(n) / SR; f = 110 * np.exp(-t * 3) + 38
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .35) + bandnoise(n, 40, 400) * np.exp(-t / .08) * .5) * g
GEN = {"papel": (papel, .35), "sello": (sello, .55), "golpe": (golpe, .9), "golpe_suave": (golpe, .45)}
def main(out, dur, cues):
    track = np.zeros(int(SR * dur))
    for kind, times in cues.items():
        fn, gain = GEN[kind]
        for at in times:
            sig = fn(); i = int(at * SR); j = min(len(track), i + len(sig)); track[i:j] += sig[:j - i] * gain
    track = np.clip(track, -1, 1)
    with wave.open(out, "wb") as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((track * 32767 * .9).astype("<i2").tobytes())
if __name__ == "__main__":
    main(sys.argv[1], float(sys.argv[2]), json.load(open(sys.argv[3]))); print("ok", sys.argv[1])
