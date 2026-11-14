"""Genera la pista de efectos TRAMA (papel, sellos, golpe) sincronizada al piloto."""
import numpy as np, wave
SR=48000; DUR=28.0
rng=np.random.default_rng(3)
track=np.zeros(int(SR*DUR))
def env(n,a,d): t=np.arange(n)/SR; return np.minimum(t/a,1)*np.exp(-t/d)
def bandnoise(n,lo,hi):
    x=rng.standard_normal(n); X=np.fft.rfft(x); f=np.fft.rfftfreq(n,1/SR); X[(f<lo)|(f>hi)]=0; y=np.fft.irfft(X,n); return y/np.abs(y).max()
def papel():  # roce de papel: ruido filtrado con barrido
    n=int(SR*0.32); return bandnoise(n,1500,7000)*env(n,0.03,0.09)*0.5
def sello():  # golpe seco de sello de goma
    n=int(SR*0.35); t=np.arange(n)/SR
    body=np.sin(2*np.pi*(90-40*t)*t)*np.exp(-t/0.07); click=bandnoise(n,800,4000)*np.exp(-t/0.012)
    return (body*0.9+click*0.6)
def golpe():  # golpe grave para "renunció"
    n=int(SR*1.1); t=np.arange(n)/SR; f=110*np.exp(-t*3)+38
    return (np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t/0.35)+bandnoise(n,40,400)*np.exp(-t/0.08)*0.5)
def add(sig,at,g):
    i=int(at*SR); j=min(len(track),i+len(sig)); track[i:j]+=sig[:j-i]*g
for t in [0.0,3.10,5.00,7.85,12.25,15.85,18.80,22.45,25.40]: add(papel(),t,0.35)
add(golpe(),4.15,0.9)
for t in [4.45,10.15,12.95,20.90]: add(sello(),t,0.55)
track=np.clip(track,-1,1)
with wave.open('audio/sfx.wav','wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((track*32767*0.9).astype('<i2').tobytes())
print('ok')
