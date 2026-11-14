// Control de calidad TRAMA (biblia, sección 0 · Reglas duras).
// Uso: node tools/qa_video.js pilots/<carpeta>/index.html
// Revisa cada escena y falla si:
//  1. algún texto (menos las palabras gigantes decorativas .giant) sale del cuadro o invade el margen de 40 px;
//  2. la escena no tiene una imagen, ilustración o gráfico (img, svg, canvas) que ocupe al menos el 12 % del cuadro;
//  3. la escena está quieta: compara dos cuadros de la misma escena y exige diferencia visible.
const {chromium}=require('playwright'); const path=require('path');
(async()=>{
  const file=path.resolve(process.argv[2]||'index.html');
  const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1080,height:1920}});
  await p.goto('file://'+file); await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(300);
  const scenes=await p.evaluate(()=>SCENES);
  let fails=0;
  for(const [id,s,e] of scenes){
    const tEnd=e-0.04, tA=s+(e-s)*0.35;
    await p.evaluate(t=>render(t),tEnd);
    const r=await p.evaluate((id)=>{
      const sc=document.getElementById(id), W=1080, H=1920, M=40, out=[];
      const textEls=[...sc.querySelectorAll('.ln .w,.fit,.sello,.meta,.fuente,.kin .ln')].filter(el=>!el.closest('.giant'));
      for(const el of textEls){ if(getComputedStyle(el).visibility==='hidden'||+getComputedStyle(el).opacity===0) continue;
        const b=el.getBoundingClientRect(); if(!b.width) continue;
        if(b.left<M-1||b.right>W-M+1||b.top<M-1||b.bottom>H-M+1) out.push(`texto fuera de margen: "${el.textContent.trim().slice(0,30)}" [${Math.round(b.left)},${Math.round(b.right)}]`);
        if(el.classList.contains('fit')&&el.scrollWidth>el.clientWidth) out.push(`texto cortado: "${el.textContent.trim()}"`); }
      const media=[...sc.querySelectorAll('img,svg,canvas')].map(m=>m.getBoundingClientRect()).map(b=>Math.max(0,Math.min(b.right,W)-Math.max(b.left,0))*Math.max(0,Math.min(b.bottom,H)-Math.max(b.top,0))/(W*H));
      if(!media.some(a=>a>=0.12)) out.push('sin imagen/ilustración/gráfico de peso (≥12 % del cuadro)');
      return out; },id);
    const a=await p.screenshot({type:'jpeg',quality:60}); await p.evaluate(t=>render(t),tA); const c=await p.screenshot({type:'jpeg',quality:60});
    const diff=Math.abs(a.length-c.length)/a.length; if(Buffer.compare(a,c)===0||diff<0.002) r.push('escena quieta: no hay movimiento visible');
    if(r.length){fails+=r.length; console.log(`✗ ${id}`); r.forEach(x=>console.log('   - '+x));} else console.log(`✓ ${id}`);
  }
  await b.close(); console.log(fails?`\n${fails} problema(s). No renderizar hasta corregir.`:'\nTodo en regla.'); process.exit(fails?1:0);
})();
