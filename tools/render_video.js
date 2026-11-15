// Render de un video TRAMA: node tools/render_video.js <carpeta> [preview t1,t2,...]
// Genera <carpeta>/build/frames/0000.jpg ... a 30 fps (o cuadros sueltos en build/preview).
const {chromium}=require('playwright'); const fs=require('fs'); const path=require('path');
(async()=>{
  const dir=path.resolve(process.argv[2]); const mode=process.argv[3]||'full';
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1080,height:1920}});
  p.on('pageerror',e=>console.log('ERR',e.message));
  await p.goto('file://'+path.join(dir,'index.html'));
  await p.waitForFunction(()=>window.READY===true||(!window.boot&&typeof window.render==='function'),null,{timeout:20000});
  await p.waitForTimeout(300);
  const out=path.join(dir,'build',mode==='full'?'frames':'preview'); fs.mkdirSync(out,{recursive:true});
  if(mode!=='full'){ for(const t of process.argv[4].split(',').map(Number)){ await p.evaluate(t=>render(t),t); await p.screenshot({path:`${out}/t${t}.jpg`,type:'jpeg',quality:85}); } }
  else { const N=Math.round(await p.evaluate(()=>window.DUR*30));
    for(let f=0;f<N;f++){ await p.evaluate(t=>render(t),f/30); await p.screenshot({path:`${out}/${String(f).padStart(4,'0')}.jpg`,type:'jpeg',quality:92}); if(f%300==0) console.log('frame',f,'/',N); } }
  await b.close();
})();
