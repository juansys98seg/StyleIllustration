// Render del piloto: node render.js [preview t1,t2,...] | node render.js full
const {chromium}=require('playwright'); const fs=require('fs'); const path=require('path');
(async()=>{
  const mode=process.argv[2]||'full';
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1080,height:1920}});
  p.on('pageerror',e=>console.log('ERR',e.message));
  await p.goto('file://'+path.resolve(__dirname,'index.html')); await p.evaluate(()=>document.fonts.ready);
  await p.waitForTimeout(500);
  const out=path.resolve(__dirname, mode==='full'?'build/frames':'build/preview'); fs.mkdirSync(out,{recursive:true});
  const times = mode==='full' ? null : process.argv[3].split(',').map(Number);
  if(times){ for(const t of times){ await p.evaluate(t=>render(t),t); await p.screenshot({path:`${out}/t${t}.jpg`,type:'jpeg',quality:85}); } }
  else { const N=Math.round(await p.evaluate(()=>DUR*FPS));
    for(let f=0;f<N;f++){ await p.evaluate(t=>render(t),f/30); await p.screenshot({path:`${out}/${String(f).padStart(4,'0')}.jpg`,type:'jpeg',quality:92}); if(f%150==0) console.log('frame',f,'/',N); } }
  await b.close();
})();
