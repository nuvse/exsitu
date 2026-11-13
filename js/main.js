(function(){
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
let mx=-999,my=-999;
addEventListener('pointermove',e=>{mx=e.clientX;my=e.clientY});

/* курсор: точка + кольцо с задержкой, кольцо расширяется над ссылками */
if(fine&&!calm){
  document.body.classList.add('fx');
  const c=document.getElementById('cur'),r=document.getElementById('cur-r');
  let rx=0,ry=0;
  (function loop(){
    rx+=(mx-rx)*.16;ry+=(my-ry)*.16;
    c.style.transform='translate('+mx+'px,'+my+'px)';
    r.style.transform='translate('+rx+'px,'+ry+'px)';
    requestAnimationFrame(loop);
  })();
  document.querySelectorAll('a,figure,.frame').forEach(el=>{
    el.addEventListener('pointerenter',()=>r.classList.add('hov'));
    el.addEventListener('pointerleave',()=>r.classList.remove('hov'));
  });
}else{
  const a=document.getElementById('cur'),b=document.getElementById('cur-r');
  if(a)a.remove();if(b)b.remove();
}

/* фон: частицы разлетаются от курсора и медленно возвращаются на место */
const cv=document.getElementById('bg'),g=cv.getContext('2d');
let W,H,P=[];
function init(){
  const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;
  cv.width=W*d;cv.height=H*d;g.setTransform(d,0,0,d,0,0);
  const n=Math.round(W*H/9000);P=[];
  for(let i=0;i<n;i++){
    const x=Math.random()*W,y=Math.random()*H;
    P.push({hx:x,hy:y,x:x,y:y,vx:0,vy:0,s:Math.random()*1.2+.3,p:Math.random()*6.28});
  }
}
init();addEventListener('resize',init);
function draw(t){
  g.clearRect(0,0,W,H);
  for(const p of P){
    const tx=p.hx+Math.sin(t/3000+p.p)*6,ty=p.hy+Math.cos(t/3300+p.p)*6;
    const dx=p.x-mx,dy=p.y-my,d2=dx*dx+dy*dy;
    if(!calm&&d2<26000){const f=(1-d2/26000)*2.2,d=Math.sqrt(d2)||1;p.vx+=dx/d*f;p.vy+=dy/d*f;}
    p.vx+=(tx-p.x)*.008;p.vy+=(ty-p.y)*.008;
    p.vx*=.93;p.vy*=.93;p.x+=p.vx;p.y+=p.vy;
    g.fillStyle='rgba(255,255,255,'+(.25+p.s*.25)+')';
    g.fillRect(p.x,p.y,p.s,p.s);
  }
  if(!calm)requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

/* крупный заголовок: буквы отталкиваются от курсора */
const big=document.querySelector('.big');
if(big&&!calm){
  const txt=big.textContent;big.setAttribute('aria-label',txt);big.textContent='';
  [...txt].forEach(ch=>{
    const s=document.createElement('span');s.setAttribute('aria-hidden','true');
    s.innerHTML=ch===' '?'&nbsp;':ch;big.appendChild(s);
  });
  const L=[...big.children];
  (function f(){
    for(const s of L){
      const b=s.getBoundingClientRect(),cx=b.left+b.width/2,cy=b.top+b.height/2;
      const dx=cx-mx,dy=cy-my,d=Math.hypot(dx,dy),R=260;
      if(d<R){const k=1-d/R;s.style.transform='translate('+(dx/d*k*40)+'px,'+(dy/d*k*40)+'px)';s.style.opacity=1-k*.45;}
      else{s.style.transform='';s.style.opacity=1;}
    }
    requestAnimationFrame(f);
  })();
}
})();
