<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Aurora – Mundo Realista</title>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&display=swap" rel="stylesheet">
<style>
:root{--gold:#f2b45a;--ink:#f6ead8;--glass:rgba(18,14,12,.55);box-sizing:border-box}
*{box-sizing:border-box;margin:0;-webkit-tap-highlight-color:transparent;user-select:none}
html,body{height:100%;overflow:hidden;background:#1a1410;color:var(--ink);font-family:system-ui,-apple-system,"Segoe UI",sans-serif}
canvas{display:block;position:fixed;inset:0;width:100%;height:100%;filter:contrast(1.1) saturate(1.1) sepia(.15)}
body::after{content:"";position:fixed;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 55%,rgba(10,6,2,.35))}
#menu{position:fixed;inset:0;display:flex;align-items:center;justify-content:flex-start;padding:max(24px,env(safe-area-inset-top)) max(28px,env(safe-area-inset-right)) max(24px,env(safe-area-inset-bottom)) max(28px,env(safe-area-inset-left));background:linear-gradient(90deg,rgba(10,7,5,.78),rgba(10,7,5,.15) 70%)}
#panel{width:min(380px,100%);max-height:100%;overflow:auto}
h1{font-family:Cinzel,Georgia,serif;font-weight:700;font-size:clamp(44px,9vw,84px);letter-spacing:.12em;line-height:1;color:var(--gold);text-shadow:0 4px 30px rgba(242,180,90,.35)}
.sub{margin:10px 0 28px;font-size:15px;opacity:.8}
button.b{display:block;width:100%;padding:15px 20px;margin-bottom:10px;border:1px solid rgba(242,180,90,.45);border-radius:6px;background:var(--glass);color:var(--ink);font:600 16px system-ui;text-align:left;cursor:pointer;backdrop-filter:blur(8px);transition:background .15s,transform .15s}
button.b:hover,button.b:focus-visible{background:rgba(242,180,90,.25);outline:none;transform:translateX(4px)}
button.b.main{background:var(--gold);color:#2a1a08;border-color:var(--gold)}
.sec{display:none;background:var(--glass);border:1px solid rgba(242,180,90,.3);border-radius:8px;padding:18px;backdrop-filter:blur(10px)}
.row{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:12px 0;font-size:14px}
.row input[type=range]{flex:1;max-width:190px;accent-color:var(--gold)}
select{background:#2a2019;color:var(--ink);border:1px solid #6b5334;border-radius:4px;padding:6px}
kbd{background:#2a2019;border:1px solid #6b5334;border-radius:4px;padding:2px 8px;font:600 13px system-ui}
#load{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#140f0b;font-family:Cinzel,serif;font-size:22px;letter-spacing:.2em;color:var(--gold);z-index:9}
#rays{position:fixed;inset:0;pointer-events:none;mix-blend-mode:screen;opacity:0}
#act,#bld{position:fixed;width:64px;height:64px;border:2px solid rgba(255,255,255,.5);background:rgba(0,0,0,.3);color:#fff;border-radius:50%;font:600 12px system-ui;display:flex;align-items:center;justify-content:center}
#act{right:max(112px,env(safe-area-inset-right));bottom:max(40px,env(safe-area-inset-bottom))}
#bld{right:max(30px,env(safe-area-inset-right));bottom:max(120px,env(safe-area-inset-bottom))}
#wood{position:fixed;top:max(16px,env(safe-area-inset-top));left:50%;transform:translateX(-50%);padding:6px 14px;background:rgba(0,0,0,.45);border-radius:20px;color:#fff;font:600 14px system-ui;opacity:0;transition:opacity .3s;pointer-events:none}
#uw{position:fixed;inset:0;pointer-events:none;background:rgba(10,70,90,.5);opacity:0;transition:opacity .15s}
#fade{position:fixed;inset:0;background:#000;opacity:0;pointer-events:none;transition:opacity 1s;z-index:5}
#slp{position:fixed;width:64px;height:64px;right:max(190px,env(safe-area-inset-right));bottom:max(40px,env(safe-area-inset-bottom));border:2px solid rgba(255,255,255,.5);background:rgba(0,0,0,.3);color:#fff;border-radius:50%;font:600 12px system-ui;display:flex;align-items:center;justify-content:center}
#intro,#endscr{position:fixed;inset:0;display:none;align-items:center;justify-content:center;flex-direction:column;text-align:center;padding:28px;background:rgba(8,5,3,.88);z-index:8}
#intro h2,#endscr h2{font-family:Cinzel,Georgia,serif;color:var(--gold);font-size:clamp(26px,5vw,44px);letter-spacing:.1em;margin-bottom:14px}
#intro p,#endscr p{max-width:560px;line-height:1.55;font-size:15px;opacity:.92;margin-bottom:10px}
#intro button,#endscr button{max-width:260px;text-align:center;margin-top:12px}
#stats{position:fixed;left:max(74px,env(safe-area-inset-left));top:max(14px,env(safe-area-inset-top));display:none;font:600 11px system-ui;pointer-events:none}
#stats div{display:flex;align-items:center;gap:6px;margin-bottom:3px}
#stats b{width:34px;font-weight:600}
#stats u{display:block;width:84px;height:7px;border-radius:4px;background:linear-gradient(90deg,var(--c) var(--p,100%),rgba(255,255,255,.2) var(--p,100%))}
#s0{--c:#e5484d}#s1{--c:#f2a93c}#s2{--c:#4aa8ff}#s3{--c:#ffd166}
#obj,#inv{display:block;margin-top:4px;text-shadow:0 1px 3px #000;max-width:260px;line-height:1.3}
#story{position:fixed;left:50%;bottom:max(20px,env(safe-area-inset-bottom));transform:translateX(-50%);max-width:min(560px,80vw);padding:10px 16px;background:rgba(0,0,0,.6);border-radius:10px;color:#fff;font:500 14px/1.4 system-ui;text-align:center;opacity:0;transition:opacity .4s;pointer-events:none}
#use,#fir{position:fixed;width:64px;height:64px;border:2px solid rgba(255,255,255,.5);background:rgba(0,0,0,.3);color:#fff;border-radius:50%;font:600 12px system-ui;display:flex;align-items:center;justify-content:center}
#use{right:max(30px,env(safe-area-inset-right));bottom:max(200px,env(safe-area-inset-bottom))}
#fir{right:max(112px,env(safe-area-inset-right));bottom:max(120px,env(safe-area-inset-bottom))}
#mp input,#cin{background:#2a2019;color:var(--ink);border:1px solid #6b5334;border-radius:4px;padding:7px;font:14px system-ui;width:150px}
#cin{position:fixed;left:50%;bottom:max(70px,env(safe-area-inset-bottom));transform:translateX(-50%);width:min(420px,80vw);display:none;z-index:6}
#chatlog{position:fixed;left:max(12px,env(safe-area-inset-left));bottom:max(110px,env(safe-area-inset-bottom));max-width:min(340px,50vw);font:500 13px/1.35 system-ui;text-shadow:0 1px 3px #000;pointer-events:none}
#mpcount{position:fixed;left:50%;top:max(48px,env(safe-area-inset-top));transform:translateX(-50%);display:none;font:600 12px system-ui;text-shadow:0 1px 3px #000;pointer-events:none}
#cht{position:fixed;width:64px;height:64px;right:max(112px,env(safe-area-inset-right));bottom:max(200px,env(safe-area-inset-bottom));border:2px solid rgba(255,255,255,.5);background:rgba(0,0,0,.3);color:#fff;border-radius:50%;font:600 12px system-ui;display:none;align-items:center;justify-content:center}
#hud{position:fixed;left:50%;top:50%;width:4px;height:4px;margin:-2px;border-radius:50%;background:rgba(255,255,255,.7);display:none}
#touch{display:none}
#stick{position:fixed;width:110px;height:110px;margin:-55px;border-radius:50%;border:2px solid rgba(255,255,255,.4);background:rgba(255,255,255,.08);display:none}
#knob{position:absolute;left:35px;top:35px;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.5)}
#jump,#pause{position:fixed;border:2px solid rgba(255,255,255,.5);background:rgba(0,0,0,.3);color:#fff;border-radius:50%;font:600 13px system-ui;display:flex;align-items:center;justify-content:center}
#jump{right:max(26px,env(safe-area-inset-right));bottom:max(30px,env(safe-area-inset-bottom));width:74px;height:74px}
#pause{right:max(16px,env(safe-area-inset-right));top:max(16px,env(safe-area-inset-top));width:44px;height:44px}
@media (max-width:600px){#menu{align-items:flex-end;background:linear-gradient(0deg,rgba(10,7,5,.85),rgba(10,7,5,.1) 80%)}}
@media (prefers-reduced-motion:reduce){button.b{transition:none}}
</style>
</head>
<body>
<div id="load">GERANDO MUNDO…</div>
<canvas id="c"></canvas>
<div id="rays"></div><div id="uw"></div><div id="fade"></div><div id="wood"></div>
<div id="stats"><div><b>Vida</b><u id="s0"></u></div><div><b>Fome</b><u id="s1"></u></div><div><b>Sede</b><u id="s2"></u></div><div><b>Calor</b><u id="s3"></u></div><span id="obj"></span><span id="inv"></span></div>
<div id="story"></div><div id="mpcount"></div><div id="chatlog"></div><input id="cin" maxlength="120" placeholder="Mensagem (Enter envia)"><div id="hud"></div>
<div id="touch"><div id="stick"><div id="knob"></div></div><div id="jump">Pular</div><div id="act">Machado</div><div id="bld">Cabana</div><div id="slp">Dormir</div><div id="use">Usar</div><div id="fir">Fogueira</div><div id="cht">Chat</div><div id="pause">II</div></div>
<div id="intro"><h2>DIA 1 — O ACIDENTE</h2><p>O voo 417 caiu nas montanhas ao norte do Lago Aurora. Você é o único sobrevivente.</p><p>O rádio de emergência quebrou: faltam 3 peças, espalhadas pela região. Procure os feixes de luz azul. Antes disso, é preciso passar a noite: junte madeira com o machado, acenda uma fogueira e construa uma cabana.</p><p>Beba água, ache comida e não deixe o frio te vencer. Quando o rádio funcionar, sobreviva até o amanhecer: o resgate está a caminho.</p><button class="b main" id="ibtn">Começar</button></div>
<div id="endscr"><h2 id="eT"></h2><p id="eP"></p><button class="b main" id="ebtn">Jogar de novo</button></div>
<div id="menu" style="display:none"><div id="panel">
 <div id="home">
  <h1>AURORA</h1><p class="sub">Um mundo vivo de montanhas, florestas e lagos.</p>
  <button class="b main" id="play">Jogar</button>
  <button class="b" id="bset">Configurações</button>
  <button class="b" id="bctl">Controles</button>
  <button class="b" id="bmp">Multijogador (online)</button>
  <button class="b" id="bch">Meu personagem</button>
 </div>
 <div class="sec" id="set">
  <div class="row">Hora do dia <input type="range" id="sTime" min="0" max="24" step=".1" value="17.0"></div>
  <div class="row">Ciclo automático <input type="checkbox" id="sAuto" checked></div>
  <div class="row">Vento <input type="range" id="sWind" min="0" max="3" step=".1" value="1.2"></div>
  <div class="row">Campo de visão <input type="range" id="sFov" min="55" max="100" value="72"></div>
  <div class="row">Qualidade <select id="sQ"><option value="1">Alta</option><option value=".6">Média</option><option value=".3">Baixa</option></select></div>
  <div class="row">Volume <input type="range" id="sVol" min="0" max="1" step=".05" value=".7"></div>
  <div class="row">Sombras <select id="sSh"><option value="2048">Alta</option><option value="1024">Média</option><option value="0">Desligadas</option></select></div>
  <button class="b" data-back>Voltar</button>
 </div>
 <div class="sec" id="mp">
  <div class="row">Apelido <input id="mpn" maxlength="16" value="Sobrevivente"></div>
  <input id="mpc" type="hidden" value="sala1"><div id="mpl" style="margin:8px 0;font-size:13px"></div>
  <p id="mpst" style="font-size:13px;opacity:.85;margin:8px 0">Crie o seu mundo, ou procure o mundo aberto de um amigo e toque para entrar. Os dois precisam abrir o mesmo link.</p>
  <button class="b main" id="mpsv">Jogar com servidor (salas por código)</button><button class="b" id="mpauto">Jogar online com amigos (automático)</button><button class="b" id="mpp2">Conexão direta (sem conta, igual Minecraft)</button><button class="b" id="mpgo">Criar meu mundo (sala online)</button><button class="b" id="mpfind">Procurar mundos abertos</button><div class="row">Código do mundo <input id="mpcode" maxlength="12" style="width:100px;text-transform:uppercase"><button class="b" id="mpcj" style="width:auto;margin:0;padding:8px 14px;text-align:center">Entrar</button></div><button class="b" data-back>Voltar</button>
 </div>
 <div class="sec" id="ch">
   <div class="row">Pele <select id="chS"><option value="0">Clara</option><option value="1">Morena clara</option><option value="2">Morena</option><option value="3">Parda</option><option value="4">Escura</option><option value="5">Negra profunda</option></select></div>
   <div class="row">Cabelo <select id="chO"><option value="0">Curto</option><option value="1">Longo</option><option value="2">Rabo de cavalo</option><option value="3">Boné</option></select></div>
   <div class="row">Cor do cabelo <select id="chH"><option value="0">Preto</option><option value="1">Castanho</option><option value="2">Castanho claro</option><option value="3">Loiro</option><option value="4">Ruivo</option><option value="5">Grisalho</option></select></div>
   <div class="row">Jaqueta <select id="chC"><option value="0">Azul</option><option value="1">Vinho</option><option value="2">Verde</option><option value="3">Mostarda</option><option value="4">Roxo</option><option value="5">Grafite</option></select></div>
   <p style="font-size:13px;opacity:.85;margin:8px 0">No jogo, toque no botão 👤 (ou tecle C) para ver seu personagem em 3ª pessoa.</p>
   <button class="b" data-back>Voltar</button>
  </div>
 <div class="sec" id="p2">
   <p style="font-size:13px;opacity:.9;margin-bottom:6px">Não precisa de conta nem de servidor: os celulares se conectam direto. Funciona melhor no mesmo Wi-Fi, mas costuma funcionar na internet também.</p>
   <h4>Quem cria o mundo</h4>
   <button class="b main" id="p2mk">1) Criar convite</button>
   <textarea id="p2o" readonly placeholder="O convite aparece aqui"></textarea>
   <button class="b" id="p2cp">Copiar / enviar convite</button>
   <textarea id="p2a" placeholder="3) Cole aqui a resposta do amigo"></textarea>
   <button class="b" id="p2ok">Conectar amigo</button>
   <h4>Quem entra no mundo do amigo</h4>
   <textarea id="p2i" placeholder="Cole aqui o convite recebido"></textarea>
   <button class="b main" id="p2ac">2) Aceitar convite</button>
   <textarea id="p2r" readonly placeholder="A resposta aparece aqui"></textarea>
   <button class="b" id="p2cp2">Copiar / enviar resposta</button>
   <p id="p2st" style="font-size:13px;margin:8px 0"></p>
   <button class="b" data-back>Voltar</button>
  </div>
 <div class="sec" id="sv">
   <p style="font-size:13px;opacity:.9;margin-bottom:6px">Servidor próprio: um de vocês cria a sala e passa o código de 6 letras. Até 8 jogadores.</p>
   <button class="b main" id="svmk">Criar sala</button>
   <div class="row">Sala pública (aparece na lista) <input type="checkbox" id="svpub"></div>
   <div class="row">Código <input id="svin" maxlength="8" style="width:110px;text-transform:uppercase"><button class="b" id="svjn" style="width:auto;margin:0;padding:8px 14px;text-align:center">Entrar</button></div>
   <button class="b" id="svls">Ver salas públicas</button><div id="svl" style="font-size:13px"></div>
   <p id="svst" style="font-size:13px;margin:8px 0"></p>
   <button class="b" data-back>Voltar</button>
  </div>
 <div class="sec" id="ctl">
  <div class="row">Mover <span><kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd></span></div>
  <div class="row">Olhar <span>Mouse</span></div>
  <div class="row">Correr <kbd>Shift</kbd></div>
  <div class="row">Pular <kbd>Espaço</kbd></div>
  <div class="row">Pausar <kbd>Esc</kbd></div>
  <div class="row">Cortar árvore <span><kbd>Clique</kbd> ou <kbd>E</kbd></span></div>
  <div class="row">Cabana (10 madeiras) <kbd>B</kbd></div>
  <div class="row">Dormir (na cabana, à noite) <kbd>Z</kbd></div>
  <div class="row">Nadar <span>Olhe para baixo e avance para mergulhar</span></div>
  <div class="row">Usar (beber, comer, rádio) <kbd>F</kbd></div>
  <div class="row">Chat (online) <kbd>Enter</kbd></div>
  <div class="row">Fogueira (3 madeiras) <kbd>G</kbd></div>
  <div class="row">Celular <span>Joystick à esquerda, arraste à direita para olhar</span></div>
  <button class="b" data-back>Voltar</button>
 </div>
</div></div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script>
const $=id=>document.getElementById(id);
const isTouch='ontouchstart' in window||navigator.maxTouchPoints>0;
// ---------- ruído e terreno ----------
const hs=(x,y)=>{const h=Math.sin(x*127.1+y*311.7)*43758.5453;return h-Math.floor(h)};
function vn(x,y){const ix=Math.floor(x),iy=Math.floor(y);let fx=x-ix,fy=y-iy;fx*=fx*(3-2*fx);fy*=fy*(3-2*fy);
 const a=hs(ix,iy),b=hs(ix+1,iy),c=hs(ix,iy+1),d=hs(ix+1,iy+1);return a+(b-a)*fx+(c-a)*fy+(a-b-c+d)*fx*fy}
function fbm(x,y,o){let s=0,a=.5;for(let i=0;i<o;i++){s+=a*vn(x,y);x=x*2.03+17;y=y*2.03+5;a*=.5}return s}
function H(x,z){const r=Math.hypot(x,z);let h=(fbm(x*.005,z*.005,5)-.43)*70;
 const rd=1-Math.abs(2*fbm(x*.0021+80,z*.0021+20,5)-1);h+=Math.pow(rd,2.2)*Math.min(1,Math.max(0,(r-120)/380))*Math.min(1,Math.max(0,(fbm(x*.0012+300,z*.0012,3)-.38)*7))*330;return h+(fbm(x*.11,z*.11,2)-.5)*1.6}
// ---------- cena ----------
const renderer=new THREE.WebGLRenderer({canvas:$('c'),antialias:true});
renderer.setPixelRatio(Math.min(devicePixelRatio,isTouch?1.5:2));
renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0xbbbbbb,.0035);
const cam=new THREE.PerspectiveCamera(72,1,.1,1500);cam.rotation.order='YXZ';
const sun=new THREE.DirectionalLight(0xffffff,1.2);sun.castShadow=true;
sun.shadow.mapSize.set(2048,2048);sun.shadow.bias=-.001;sun.shadow.normalBias=1.4;
Object.assign(sun.shadow.camera,{left:-70,right:70,top:70,bottom:-70,near:1,far:600});
scene.add(sun,sun.target);
const hemi=new THREE.HemisphereLight(0xaaccff,0x6b5a3a,.5);scene.add(hemi);
const U={uT:{value:0},uW:{value:1.2},uP:{value:new THREE.Vector3(0,-999,0)}};
function sway(m,k,pk=0){m.customProgramCacheKey=()=>'sw'+k+'_'+pk;m.onBeforeCompile=s=>{s.uniforms.uT=U.uT;s.uniforms.uW=U.uW;s.uniforms.uP=U.uP;
 s.vertexShader='uniform float uT;uniform float uW;uniform vec3 uP;\n'+s.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
 vec3 ip=vec3(instanceMatrix[3]);float ph=ip.x*.07+ip.z*.09;
 float w=(sin(uT*1.1+ph)+.5*sin(uT*2.3+ph*2.1)+.3*sin(uT*4.1+ip.x))*uW;
 float hh=max(position.y,0.);transformed.x+=w*hh*hh*${k};transformed.z+=w*.6*hh*hh*${k};
 vec2 dp=ip.xz-uP.xz;float dl=length(dp);float ps=(1.-smoothstep(.2,2.4,dl))*${pk}.;
 vec3 wd=vec3(dp.x,0.,dp.y)/max(dl,.05);mat3 im=mat3(instanceMatrix);
 transformed+=(transpose(im)*wd/dot(im[0],im[0]))*ps*(hh*.9+hh*hh*.6);`)}}
// céu
const skyU={sd:{value:new THREE.Vector3()},sc:{value:new THREE.Vector3()},top:{value:new THREE.Vector3()},hor:{value:new THREE.Vector3()},t:{value:0},night:{value:0},lum:{value:1}};
const sky=new THREE.Mesh(new THREE.SphereGeometry(1000,32,16),new THREE.ShaderMaterial({uniforms:skyU,side:THREE.BackSide,depthWrite:false,fog:false,
vertexShader:'varying vec3 vD;void main(){vD=position;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
fragmentShader:`varying vec3 vD;uniform vec3 sd,sc,top,hor;uniform float t,night,lum;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fb(vec2 p){float s=0.,a=.5;for(int i=0;i<5;i++){s+=a*n(p);p*=2.02;a*=.5;}return s;}
void main(){vec3 d=normalize(vD);float y=max(d.y,0.);vec3 col=mix(hor,top,pow(y,.5));
 float sd0=max(dot(d,sd),0.);
 col+=sc*(pow(sd0,5.)*.3+pow(sd0,40.)*.6+pow(sd0,400.)*2.5);
 col+=sc*smoothstep(.99965,.9999,sd0)*12.;
 col+=vec3(step(.9972,h(floor(d.xz/(abs(d.y)+.25)*240.)))*night*step(0.,d.y));
 if(d.y>0.){vec2 p=d.xz/(d.y+.18)*.7+vec2(t*.012,t*.004);float c=fb(p*1.6);c=smoothstep(.5,.82,c)*smoothstep(0.,.12,d.y);
  float lit=pow(sd0,3.);vec3 cc=mix(hor*.75+vec3(.22),sc*1.15,lit*.7)*lum+sc*pow(sd0,12.)*.5*lum;cc*=.72+.28*smoothstep(.5,.9,fb(p*3.));
  col=mix(col,cc,c*.92);}
 gl_FragColor=vec4(col,1.);}`}));
scene.add(sky);
// água
const wU={t:{value:0},sd:skyU.sd,sc:skyU.sc,top:skyU.top,hor:skyU.hor,fogC:{value:new THREE.Vector3()},fogD:{value:.0035},w:U.uW,lum:skyU.lum};
const water=new THREE.Mesh(new THREE.PlaneGeometry(3000,3000).rotateX(-Math.PI/2),new THREE.ShaderMaterial({uniforms:wU,transparent:true,
vertexShader:'varying vec3 vW;void main(){vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}',
fragmentShader:`varying vec3 vW;uniform vec3 sd,sc,top,hor,fogC;uniform float t,fogD,w,lum;
void main(){vec2 p=vW.xz;vec2 d=vec2(0.);
 for(int i=0;i<6;i++){float fi=float(i);vec2 dr=vec2(cos(fi*1.7+.3),sin(fi*1.7+.3));float fr=.4*pow(1.55,fi);
  d+=dr*.05*cos(dot(dr,p)*fr+t*(.7+fi*.25))*exp(-length(cameraPosition-vW)*fr*.006);}
 d*=.5+.4*w;vec3 n=normalize(vec3(-d.x,1.,-d.y));vec3 v=normalize(cameraPosition-vW);
 float f=.03+.97*pow(1.-max(dot(n,v),0.),5.);vec3 r=reflect(-v,n);r.y=abs(r.y);
 vec3 skyc=mix(hor,top,pow(clamp(r.y,0.,1.),.5));
 float sp=pow(max(dot(r,sd),0.),350.)*2.+pow(max(dot(r,sd),0.),30.)*.25;
 vec3 deep=vec3(.03,.13,.17)*(.25+.75*lum);
 vec3 col=mix(deep,skyc,clamp(f,0.,1.))+sc*sp;
 float dist=length(cameraPosition-vW);col=mix(col,fogC,1.-exp(-fogD*fogD*dist*dist));
 gl_FragColor=vec4(col,max(mix(.58,1.,f),smoothstep(15.,90.,dist)));}`}));
water.renderOrder=2;scene.add(water);
// ---------- texturas ----------
function mkTex(rx,ry){const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');x.fillStyle='#bbb';x.fillRect(0,0,256,256);
 for(let i=0;i<6000;i++){const v=90+Math.random()*165|0;x.fillStyle=`rgb(${v},${v},${v})`;const s=1+Math.random()*3;x.fillRect(Math.random()*256,Math.random()*256,s,s*(.5+Math.random()))}
 const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.repeat.set(rx,ry);t.anisotropy=8;return t}
// ---------- detalhe do terreno ----------
function detail(m){m.customProgramCacheKey=()=>'terr';m.onBeforeCompile=s=>{
 s.vertexShader='varying vec3 vWP;\n'+s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvWP=(modelMatrix*vec4(transformed,1.)).xyz;');
 s.fragmentShader=`varying vec3 vWP;
float hh_(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5);}
float tn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hh_(i),hh_(i+vec2(1,0)),f.x),mix(hh_(i+vec2(0,1)),hh_(i+vec2(1,1)),f.x),f.y);}
`+s.fragmentShader.replace('#include <map_fragment>',`#include <map_fragment>
 vec2 q=vWP.xz;float fd=1.-smoothstep(40.,260.,length(vViewPosition));
 float n1=tn(q*.045),n2=tn(q*.5),n3=tn(q*2.7)*fd;
 diffuseColor.rgb*=1.7*(.62+.55*n1+.3*n2+.25*n3);
 diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(1.15,1.05,.8),smoothstep(.45,.75,tn(q*.12)));`).replace('#include <normal_fragment_maps>',`#include <normal_fragment_maps>
 {vec2 e=vec2(.12,0.);vec3 pn=vec3(tn(q*3.+e)-tn(q*3.-e),0.,tn(q*3.+e.yx)-tn(q*3.-e.yx));pn+=vec3(tn(q*.9+e)-tn(q*.9-e),0.,tn(q*.9+e.yx)-tn(q*.9-e.yx))*.8;
 normal=normalize(normal-(2.2*fd+.6)*(viewMatrix*vec4(pn,0.)).xyz);}`)}}
// ---------- som ----------
let AC,master,nb,wG,wF,wvG,cr,crG,rG,vol=.7,lastP=null,footT=0,nextBird=3;
function audioInit(){if(AC){AC.resume();return}
 AC=new(window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=vol;master.connect(AC.destination);
 nb=AC.createBuffer(1,AC.sampleRate*3,AC.sampleRate);const d=nb.getChannelData(0);let l=0;for(let i=0;i<d.length;i++){l=l*.97+(Math.random()*2-1)*.25;d[i]=l*1.6}
 const src=(type,f,q,g)=>{const s=AC.createBufferSource();s.buffer=nb;s.loop=true;const fl=AC.createBiquadFilter();fl.type=type;fl.frequency.value=f;fl.Q.value=q;const gn=AC.createGain();gn.gain.value=g;s.connect(fl);fl.connect(gn);gn.connect(master);s.start();return[fl,gn]};
 [wF,wG]=src('lowpass',500,.7,.05);[,wvG]=src('bandpass',1100,.5,0);[,rG]=src('highpass',3500,.4,0);cr=AC.createOscillator();cr.frequency.value=4600;const cg=AC.createGain();cg.gain.value=.5;crG=AC.createGain();crG.gain.value=0;const lf=AC.createOscillator();lf.frequency.value=28;const lg=AC.createGain();lg.gain.value=.5;lf.connect(lg);lg.connect(cg.gain);cr.connect(cg);cg.connect(crG);crG.connect(master);cr.start();lf.start()}
function burst(f,g,dur,type){const s=AC.createBufferSource();s.buffer=nb;const fl=AC.createBiquadFilter();fl.type=type;fl.frequency.value=f;fl.Q.value=type==='bandpass'?1.5:.7;const gn=AC.createGain(),t=AC.currentTime;gn.gain.setValueAtTime(g,t);gn.gain.exponentialRampToValueAtTime(.001,t+dur);s.connect(fl);fl.connect(gn);gn.connect(master);s.start(t,Math.random()*2,dur)}
function chirp(){const t=AC.currentTime,o=AC.createOscillator(),g=AC.createGain(),f=2400+Math.random()*2200,n=2+(Math.random()*4|0);o.connect(g);g.connect(master);g.gain.value=0;
 for(let i=0;i<n;i++){const a=t+i*.11;o.frequency.setValueAtTime(f*(1+Math.random()*.2),a);o.frequency.exponentialRampToValueAtTime(f*1.35,a+.07);g.gain.setValueAtTime(0,a);g.gain.linearRampToValueAtTime(.035,a+.02);g.gain.linearRampToValueAtTime(0,a+.08)}
 o.start(t);o.stop(t+n*.11+.1)}
function audioUpdate(dt){if(!AC)return;const P=player.pos,gh=H(P.x,P.z),w=set.wind,t=AC.currentTime;
 const gust=Math.max(0,1+.5*Math.sin(T*.37)+.3*Math.sin(T*.91));
 wG.gain.setTargetAtTime(.025*w*gust*(1+Math.min(1,player.eye/30)),t,.3);wF.frequency.setTargetAtTime(280+240*w*gust,t,.3);
 wvG.gain.setTargetAtTime(Math.max(0,1-Math.max(gh,0)/14)*.07*(.7+.3*Math.sin(T*.8)),t,.3);
 crG.gain.setTargetAtTime(skyU.night.value*.025,t,.5);rG.gain.setTargetAtTime(.004*w*gust*(1+Math.min(1,player.eye/25)),t,.3);nextBird-=dt;if(nextBird<0){nextBird=2+Math.random()*7;if(skyU.lum.value>.5)song()}
 if(mode==='play'){if(lastP&&player.ground){footT+=Math.hypot(P.x-lastP.x,P.z-lastP.z);if(footT>(gh<-1?2.2:1.8)){footT=0;gh<-1?burst(900,.12,.25,'bandpass'):gh>60?[0,60,120].forEach(d=>setTimeout(()=>burst(3600,.09,.04,'bandpass'),d)):(burst(2600+Math.random()*1400,.11,.09,'bandpass'),burst(1000,.03,.1,'lowpass'))}}lastP=P.clone()}}
addEventListener('pointerdown',()=>audioInit(),{once:true});
const raysEl=$('rays'),pv=new THREE.Vector3();let occ=1;
function rays_(){cam.updateMatrixWorld();pv.copy(cam.position).addScaledVector(skyU.sd.value,500).project(cam);
 const vis=pv.z<1&&Math.abs(pv.x)<2&&Math.abs(pv.y)<2?1:0;const sv=skyU.sd.value,hl=Math.hypot(sv.x,sv.z),tt=sv.y/hl;let oc=1;for(let u=15;u<=600;u+=30)if(H(cam.position.x+sv.x/hl*u,cam.position.z+sv.z/hl*u)>cam.position.y+u*tt){oc=0;break}
 occ+=(oc-occ)*.08;
 const k=vis*Math.min(1,Math.max(0,(skyU.lum.value-.2)*2))*.75*occ;raysEl.style.opacity=k;if(k<.01)return;
 const X=(pv.x*.5+.5)*innerWidth,Y=(-pv.y*.5+.5)*innerHeight,m=`radial-gradient(circle at ${X}px ${Y}px,#000,transparent 75%)`;
 raysEl.style.background=`radial-gradient(ellipse 80vw 1.4vh at ${X}px ${Y}px,rgba(255,215,150,.6),transparent),radial-gradient(circle at ${X}px ${Y}px,rgba(255,235,180,.65),rgba(255,200,120,.1) 18%,transparent 45%)`;
 raysEl.style.maskImage=raysEl.style.webkitMaskImage=m}
// ---------- colisão, machado, cabana, pássaros, capim ----------
const cg={};let wood=0,swing=0,hudT=0;const mt4=new THREE.Matrix4(),zero=new THREE.Matrix4().makeScale(0,0,0),_p=new THREE.Vector3(),_s=new THREE.Vector3(),_q=new THREE.Quaternion();
function addC(x,z,r,M,i){const c={x,z,r,r0:r,M,i,hits:0},k=Math.floor(x/8)+','+Math.floor(z/8);(cg[k]=cg[k]||[]).push(c);return c}
function addCol(M,cnt,f){for(let i=0;i<cnt;i++){M.getMatrixAt(i,mt4);mt4.decompose(_p,_q,_s);addC(_p.x,_p.z,_s.x*f,M,i)}}
function near(x,z,fn){for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++){const l=cg[(Math.floor(x/8)+a)+','+(Math.floor(z/8)+b)];if(l)for(const c of l)fn(c)}}
function push(P){near(P.x,P.z,c=>{const dx=P.x-c.x,dz=P.z-c.z,d=Math.hypot(dx,dz),m=c.r+.4;if(c.r>0&&d<m&&d>1e-4){P.x=c.x+dx/d*m;P.z=c.z+dz/d*m}})}
function say(t){const e=$('wood');e.textContent=t;e.style.opacity=1;hudT=2.5}
function chop(){if(mode!=='play'||swing>0)return;swing=.01;if(AC)burst(2200,.1,.05,'bandpass');
 const P=player.pos,fx=-Math.sin(player.yaw),fz=-Math.cos(player.yaw);let best=null,bd=1e9;
 near(P.x,P.z,c=>{if(!c.M||!c.M.userData.tree||c.r<=0)return;const dx=c.x-P.x,dz=c.z-P.z,d=Math.hypot(dx,dz);if(d<c.r+3.2&&(dx*fx+dz*fz)/d>.5&&d<bd){bd=d;best=c}});
 setTimeout(()=>{if(!best)return;best.hits++;if(AC){burst(170,.6,.18,'lowpass');burst(1200,.2,.05,'bandpass')}
  if(best.hits>=4){best.M.setMatrixAt(best.i,zero);best.M.instanceMatrix.needsUpdate=true;best.r=0;best.felled=true;wood+=best.M.userData.tree;say('Madeira: '+wood)}else say('Madeira: '+wood+'  (árvore '+best.hits+'/4)')},180)}
function build_(){if(mode!=='play')return;if(wood<10){say('Precisa de 10 madeiras (você tem '+wood+')');return}
 wood-=10;const P=player.pos,fx=-Math.sin(player.yaw),fz=-Math.cos(player.yaw),cx=P.x+fx*7,cz=P.z+fz*7,gy=Math.max(H(cx,cz),H(cx+3,cz),H(cx-3,cz),H(cx,cz+3),H(cx,cz-3)),g=new THREE.Group();g.position.set(cx,gy,cz);g.rotation.y=player.yaw;
 const tx=mkTex(2,1),lm=new THREE.MeshStandardMaterial({color:0x7a4a28,map:tx,roughness:.9}),rm=new THREE.MeshStandardMaterial({color:0x5a3520,map:tx,roughness:.95});
 const box=(w,h,d,x,y,z,m,ry=0,rx=0)=>{const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);b.position.set(x,y,z);b.rotation.set(rx,ry,0);b.castShadow=b.receiveShadow=true;g.add(b)};
 box(5.4,.3,5.4,0,.1,0,rm);box(5.6,1.6,5.6,0,-.7,0,rm);
 for(let k=0;k<9;k++){const y=.4+k*.3;box(5,.3,.3,0,y,-2.5,lm);box(.3,.3,5,-2.5,y,0,lm);box(.3,.3,5,2.5,y,0,lm);
  if(k>=7)box(5,.3,.3,0,y,2.5,lm);else{box(1.9,.3,.3,-1.55,y,2.5,lm);box(1.9,.3,.3,1.55,y,2.5,lm)}}
 box(5.8,.15,3.2,0,3.9,-1.3,rm,0,-.5);box(5.8,.15,3.2,0,3.9,1.3,rm,0,.5);scene.add(g);
 const cy=Math.cos(player.yaw),sy=Math.sin(player.yaw),wc=(lx,lz)=>addC(cx+lx*cy+lz*sy,cz-lx*sy+lz*cy,.45);
 for(let t=-2.4;t<=2.41;t+=.6){wc(t,-2.5);wc(-2.5,t);wc(2.5,t);if(Math.abs(t)>1)wc(t,2.5)}
 say('Cabana construída! Madeira: '+wood)}
addEventListener('mousedown',()=>{if(mode==='play'&&document.pointerLockElement)chop()});
addEventListener('keydown',e=>{if(e.code==='KeyB')build_();if(e.code==='KeyE')chop()});
const axe=new THREE.Group();{const hm=new THREE.MeshStandardMaterial({color:0x6b4423,roughness:.8}),sm=new THREE.MeshStandardMaterial({color:0xc0c4c8,metalness:.2,roughness:.5});
 const h=new THREE.Mesh(new THREE.CylinderGeometry(.018,.022,.7,8),hm),hd=new THREE.Mesh(new THREE.BoxGeometry(.2,.13,.03),sm);hd.position.set(.09,.28,0);axe.add(h,hd)}
axe.position.set(.32,-.3,-.55);axe.rotation.set(.3,0,-.3);cam.add(axe);scene.add(cam);
const BN=28,bg=new THREE.BufferGeometry();bg.setAttribute('position',new THREE.Float32BufferAttribute([0,0,.25,-.04,0,-.15,.04,0,-.15,0,0,.1,-.5,0,-.02,0,0,-.12,0,0,.1,0,0,-.12,.5,0,-.02],3));
const bmat=new THREE.MeshBasicMaterial({color:0x2a211b,side:THREE.DoubleSide});bmat.customProgramCacheKey=()=>'bird';
bmat.onBeforeCompile=s=>{s.uniforms.uT=U.uT;s.vertexShader='uniform float uT;\n'+s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ntransformed.y+=abs(position.x)*sin(uT*11.+instanceMatrix[3].x*.7)*.9;')};
const birds=new THREE.InstancedMesh(bg,bmat,BN);birds.frustumCulled=false;scene.add(birds);
const bdat=[];for(let i=0;i<BN;i++)bdat.push({cx:(Math.random()-.5)*160,cz:(Math.random()-.5)*160,r:15+Math.random()*30,a:Math.random()*6.3,s:.25+Math.random()*.25,y:14+Math.random()*26,ph:Math.random()*6});
const bo=new THREE.Object3D();
function birdsUpdate(dt){birds.visible=skyU.lum.value>.35;if(!birds.visible)return;for(let i=0;i<BN;i++){const d=bdat[i];d.a+=dt*d.s;bo.position.set(player.pos.x+d.cx+Math.cos(d.a)*d.r,d.y+Math.sin(T*.8+d.ph)*2,player.pos.z+d.cz+Math.sin(d.a)*d.r);bo.rotation.set(0,-d.a,0);bo.scale.setScalar(1.3);bo.updateMatrix();birds.setMatrixAt(i,bo.matrix)}birds.instanceMatrix.needsUpdate=true}
function song(){const t=AC.currentTime,o=AC.createOscillator(),o2=AC.createOscillator(),g=AC.createGain(),g2=AC.createGain(),vb=AC.createOscillator(),vg=AC.createGain(),f=2200+Math.random()*2500,n=3+(Math.random()*6|0),pan=AC.createStereoPanner?AC.createStereoPanner():null;
 vb.frequency.value=22;vg.gain.value=60;vb.connect(vg);vg.connect(o.frequency);o2.connect(g2);o.connect(g);g2.gain.value=.25;g2.connect(g);g.gain.value=0;
 if(pan){pan.pan.value=Math.random()*2-1;g.connect(pan);pan.connect(master)}else g.connect(master);let a=t;
 for(let i=0;i<n;i++){const d=.05+Math.random()*.09,f0=f*(.8+Math.random()*.5),f1=f*(.9+Math.random()*.7);for(const x of[o,o2]){const m=x===o?1:2;x.frequency.setValueAtTime(f0*m,a);x.frequency.exponentialRampToValueAtTime(f1*m,a+d)}
  g.gain.setValueAtTime(0,a);g.gain.linearRampToValueAtTime(.03+Math.random()*.02,a+d*.3);g.gain.linearRampToValueAtTime(0,a+d);a+=d+.03+Math.random()*.08}
 for(const x of[o,o2,vb]){x.start(t);x.stop(a+.1)}}
function tuft(nb,h0,h1,wd,bend,c0,c1,seed,head){const P=[],N=[],C=[],S=4;
 for(let b=0;b<nb;b++){const a=Math.random()*6.283,ox=(Math.random()-.5)*.6,oz=(Math.random()-.5)*.6,h=h0+Math.random()*(h1-h0),w=wd*(.7+Math.random()*.6),bd=bend*(.3+Math.random()),c=Math.cos(a),s=Math.sin(a),k=.85+Math.random()*.3;let pl,pr;
  for(let i=0;i<=S;i++){const t=i/S,y=h*t,fw=(head&&t>.78?wd*(t>.95?.5:1.8):w*(1-t*.9))/2,off=bd*h*t*t,cx=ox+c*off,cz=oz+s*off,L=[cx+s*fw,y,cz-c*fw],R=[cx-s*fw,y,cz+c*fw],col=c0.map((v,j)=>(v+(c1[j]-v)*t)*k);
   if(i){P.push(...pl,...pr,...L,...pr,...R,...L);for(let q=0;q<6;q++){N.push(c*.6,.5,s*.6);C.push(...col)}}pl=L;pr=R}}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));g.setAttribute('color',new THREE.Float32BufferAttribute(C,3));return g}
// ---------- rochas, chão e folhagem realistas ----------
function h3(x,y,z){const h=Math.sin(x*127.1+y*311.7+z*74.7)*43758.5453;return h-Math.floor(h)}
function n3(x,y,z){const ix=Math.floor(x),iy=Math.floor(y),iz=Math.floor(z);let fx=x-ix,fy=y-iy,fz=z-iz;fx*=fx*(3-2*fx);fy*=fy*(3-2*fy);fz*=fz*(3-2*fz);
 const L=(a,b,t)=>a+(b-a)*t;return L(L(L(h3(ix,iy,iz),h3(ix+1,iy,iz),fx),L(h3(ix,iy+1,iz),h3(ix+1,iy+1,iz),fx),fy),L(L(h3(ix,iy,iz+1),h3(ix+1,iy,iz+1),fx),L(h3(ix,iy+1,iz+1),h3(ix+1,iy+1,iz+1),fx),fy),fz)}
function f3(x,y,z,o){let s=0,a=.5;for(let i=0;i<o;i++){s+=a*n3(x,y,z);x*=2.1;y*=2.1;z*=2.1;a*=.5}return s}
function rockGeo(seed){const g=new THREE.IcosahedronGeometry(1,3),p=g.attributes.position,nm=g.attributes.normal;
 const pl=[];for(let i=0;i<4;i++)pl.push([new THREE.Vector3(Math.random()-.5,Math.random()-.2,Math.random()-.5).normalize(),.62+Math.random()*.25]);
 const R=(x,y,z)=>{const l=Math.hypot(x,y,z);x/=l;y/=l;z/=l;let r=1+.32*(f3(x*1.8+seed,y*1.8,z*1.8,3)-.5);
  for(const[v,c]of pl){const d=x*v.x+y*v.y+z*v.z;if(d>.25)r=Math.min(r,c/d)}
  const rid=1-Math.abs(2*f3(x*4+seed,y*4,z*4,3)-1);return r+.07*rid+.025*(f3(x*14,y*14+seed,z*14,2)-.5)};
 const e=.03,a=new THREE.Vector3(),t1=new THREE.Vector3(),t2=new THREE.Vector3(),p0=new THREE.Vector3(),p1=new THREE.Vector3(),p2=new THREE.Vector3(),q=new THREE.Vector3();
 const P=(d,o)=>{const l=R(d.x,d.y,d.z);return o.copy(d).normalize().multiplyScalar(l)};
 for(let i=0;i<p.count;i++){a.set(p.getX(i),p.getY(i),p.getZ(i)).normalize();t1.set(-a.z,0,a.x);if(t1.lengthSq()<.01)t1.set(1,0,0);t1.normalize();t2.crossVectors(a,t1);
  P(a,p0);P(q.copy(a).addScaledVector(t1,e),p1);P(q.copy(a).addScaledVector(t2,e),p2);
  p1.sub(p0);p2.sub(p0);const n=p1.cross(p2).normalize();if(n.dot(a)<0)n.negate();p.setXYZ(i,p0.x,p0.y,p0.z);nm.setXYZ(i,n.x,n.y,n.z)}
 return g}
function cvs(n){const c=document.createElement('canvas');c.width=c.height=n;return c}
function ctex(cv){const t=new THREE.CanvasTexture(cv);t.wrapS=t.wrapT=THREE.RepeatWrapping;t.anisotropy=8;return t}
function rockTex(){const c=cvs(256),b=cvs(256),x=c.getContext('2d'),y=b.getContext('2d');
 x.fillStyle='#8a847a';x.fillRect(0,0,256,256);y.fillStyle='#888';y.fillRect(0,0,256,256);
 for(let i=0;i<9000;i++){const v=90+Math.random()*110|0,px=Math.random()*256,py=Math.random()*256,s=1+Math.random()*3,h=Math.random()*255|0;x.fillStyle='rgb('+(v+10)+','+(v+5)+','+(v-5)+')';x.fillRect(px,py,s,s);y.fillStyle='rgb('+h+','+h+','+h+')';y.fillRect(px,py,s,s)}
 for(let i=0;i<26;i++){x.strokeStyle='rgba(20,18,15,.55)';y.strokeStyle='rgba(0,0,0,.8)';x.lineWidth=y.lineWidth=.8+Math.random()*1.6;x.beginPath();y.beginPath();let px=Math.random()*256,py=Math.random()*256;x.moveTo(px,py);y.moveTo(px,py);for(let k=0;k<7;k++){px+=(Math.random()-.5)*50;py+=(Math.random()-.5)*50;x.lineTo(px,py);y.lineTo(px,py)}x.stroke();y.stroke()}
 for(let i=0;i<70;i++){x.fillStyle=Math.random()<.6?'rgba(120,140,60,.35)':'rgba(190,170,70,.3)';x.beginPath();x.arc(Math.random()*256,Math.random()*256,3+Math.random()*10,0,6.3);x.fill()}
 const t=ctex(c),u=ctex(b);t.repeat.set(2,2);u.repeat.set(2,2);return[t,u]}
function pebbleTex(){const c=cvs(512),b=cvs(512),x=c.getContext('2d'),y=b.getContext('2d');
 x.fillStyle='#8c7a58';x.fillRect(0,0,512,512);y.fillStyle='#555';y.fillRect(0,0,512,512);
 const pal=['#b89a5a','#a08455','#8a8a82','#c8b78a','#6e6455','#9c7a45','#b0a690'];
 for(let i=0;i<2600;i++){const px=Math.random()*512,py=Math.random()*512,r=2+Math.random()*7,asp=.6+Math.random()*.5,rot=Math.random()*3;
  for(const[ctx,fill]of[[x,0],[y,1]]){ctx.save();ctx.translate(px,py);ctx.rotate(rot);ctx.scale(1,asp);const g=ctx.createRadialGradient(-r*.3,-r*.3,0,0,0,r);
   if(fill){g.addColorStop(0,'#fff');g.addColorStop(1,'#777')}else{g.addColorStop(0,pal[i%7]);g.addColorStop(1,'#6a5d45')}
   ctx.fillStyle=g;ctx.beginPath();ctx.arc(0,0,r,0,6.3);ctx.fill();ctx.restore()}}
 return[ctex(c),ctex(b)]}
function leafTex(){const c=cvs(128),x=c.getContext('2d');x.fillStyle='#c9d8b0';x.fillRect(0,0,128,128);x.strokeStyle='rgba(60,90,30,.7)';x.lineWidth=4;x.beginPath();x.moveTo(64,128);x.lineTo(64,0);x.stroke();x.lineWidth=2;
 for(let y=118;y>10;y-=14){x.beginPath();x.moveTo(64,y);x.lineTo(12,y-40);x.moveTo(64,y);x.lineTo(116,y-40);x.stroke()}
 for(let i=0;i<300;i++){x.fillStyle='rgba('+(100+Math.random()*80|0)+','+(130+Math.random()*80|0)+',60,.18)';x.fillRect(Math.random()*128,Math.random()*128,3,3)}
 const t=new THREE.CanvasTexture(c);t.anisotropy=8;return t}
function bushGeo(){const P=[],N=[],C=[],V=[],lo=new THREE.Object3D(),nv=new THREE.Vector3(),q=new THREE.Vector3();
 const leaf=[[0,0,0,.5,0],[-1,0,.4,0,.4],[0,.08,.45,.5,.45],[1,0,.4,1,.4],[0,.15,1,.5,1]],tri=[[0,1,2],[0,2,3],[1,4,2],[2,4,3]];
 for(let i=0;i<150;i++){const a=Math.random()*6.283,r=.5+Math.random()*.9,ph=Math.acos(Math.random()*.9+.1),px=Math.sin(ph)*Math.cos(a)*r*1.3,py=.25+Math.cos(ph)*r*.85,pz=Math.sin(ph)*Math.sin(a)*r*1.3;
  lo.position.set(px,py,pz);lo.lookAt(px*2+(Math.random()-.5),py*1.3+Math.random()*.4,pz*2+(Math.random()-.5));lo.updateMatrix();
  const L=.4+Math.random()*.3,W=.12+Math.random()*.1,k=.8+Math.random()*.4;nv.set(0,1,0).transformDirection(lo.matrix);
  for(const t of tri)for(const j of t){const v=leaf[j];q.set(v[0]*W,v[1]*L,v[2]*L).applyMatrix4(lo.matrix);P.push(q.x,q.y,q.z);N.push(nv.x,nv.y,nv.z);V.push(v[3],v[4]);const s=v[2];C.push((.2+.35*s)*k,(.4+.35*s)*k,(.1+.1*s)*k)}}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(V,2));g.setAttribute('color',new THREE.Float32BufferAttribute(C,3));return g}
// ---------- mundo infinito, nado, peixes, machado real, cabana ----------
let CEN=null,worldObjs=[],rebuilding=false,hitDone=true,fishMesh=null,ci=0;const cabins=[],fish=[],falling=[],chips=[];
function rockTex(){const c=cvs(512),b=cvs(512),x=c.getContext('2d'),y=b.getContext('2d');x.fillStyle='#857d70';x.fillRect(0,0,512,512);y.fillStyle='#808080';y.fillRect(0,0,512,512);
 const blob=(ctx,px,py,r,col,a)=>{const g=ctx.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,'rgba('+col+','+a+')');g.addColorStop(1,'rgba('+col+',0)');ctx.fillStyle=g;ctx.fillRect(px-r,py-r,2*r,2*r)};
 for(let i=0;i<1800;i++){const px=Math.random()*512,py=Math.random()*512,r=4+Math.random()*26,v=70+Math.random()*130|0;blob(x,px,py,r,(v+12)+','+v+','+(v-14),.28);blob(y,px,py,r,v+','+v+','+v,.3)}
 for(let i=0;i<40;i++){let px=Math.random()*512,py=Math.random()*512;x.strokeStyle='rgba(25,22,18,.5)';y.strokeStyle='rgba(20,20,20,.7)';x.lineWidth=y.lineWidth=1+Math.random()*2.2;x.beginPath();y.beginPath();x.moveTo(px,py);y.moveTo(px,py);for(let k=0;k<9;k++){px+=(Math.random()-.5)*70;py+=(Math.random()-.3)*40;x.lineTo(px,py);y.lineTo(px,py)}x.stroke();y.stroke()}
 for(let i=0;i<90;i++)blob(x,Math.random()*512,Math.random()*512,6+Math.random()*16,Math.random()<.6?'110,135,55':'185,165,70',.35);
 return[ctex(c),ctex(b)]}
function groundAt(x,z){let h=H(x,z);for(const c of cabins){const dx=x-c.x,dz=z-c.z,cy=Math.cos(c.yaw),sy=Math.sin(c.yaw),lx=dx*cy-dz*sy,lz=dx*sy+dz*cy;if(Math.abs(lx)<2.7&&Math.abs(lz)<2.7)h=Math.max(h,c.y+.25)}return h}
function clearWorld(){for(const o of worldObjs){scene.remove(o);if(o.geometry)o.geometry.dispose();const m=o.material;if(m){for(const k of['map','bumpMap'])if(m[k])m[k].dispose();m.dispose()}}worldObjs=[];for(const k in cg)cg[k]=cg[k].filter(c=>!c.M)}
function envUpdate(dt){const P=player.pos,uw=cam.position.y<0;$('uw').style.opacity=uw?1:0;if(uw){scene.fog.color.setRGB(.04,.22,.28);scene.fog.density=.06}
 for(const c of cabins)c.light.intensity=skyU.lum.value<.4?1.6:0;
 if(CEN&&!rebuilding&&Math.hypot(P.x-CEN.x,P.z-CEN.z)>260){rebuilding=true;$('load').style.display='flex';setTimeout(()=>{CEN={x:Math.round(P.x/200)*200,z:Math.round(P.z/200)*200};clearWorld();build();$('sQ').onchange({target:$('sQ')});rebuilding=false;$('load').style.display='none'},60)}}
// machado de verdade: cabo de ~90 cm, cabeça em cunha, golpe com recuo do pulso, lascas voando
while(axe.children.length)axe.remove(axe.children[0]);
{const hm=new THREE.MeshStandardMaterial({color:0x7a5230,roughness:.85}),sm=new THREE.MeshStandardMaterial({color:0xb4b9be,metalness:.35,roughness:.4}),sh=new THREE.Shape();
 sh.moveTo(-.03,-.07);sh.lineTo(.05,-.09);sh.quadraticCurveTo(.2,-.17,.22,0);sh.quadraticCurveTo(.2,.17,.05,.09);sh.lineTo(-.03,.07);sh.lineTo(-.03,-.07);
 const h=new THREE.Mesh(new THREE.CylinderGeometry(.016,.022,.9,10),hm),hd=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:.035,bevelEnabled:false}),sm);hd.position.set(0,.38,-.0175);axe.add(h,hd)}
{const cm=new THREE.MeshStandardMaterial({color:0xc9a26a,roughness:.9});for(let i=0;i<24;i++){const m=new THREE.Mesh(new THREE.BoxGeometry(.06,.025,.04),cm);m.visible=false;scene.add(m);chips.push({m,v:new THREE.Vector3(),t:0})}}
function emit(x,y,z){for(let k=0;k<7;k++){const c=chips[ci++%chips.length];c.m.position.set(x,y,z);c.v.set((Math.random()-.5)*3,Math.random()*3+1,(Math.random()-.5)*3);c.t=1;c.m.visible=true}}
function chop(){if(mode!=='play'||swing>0)return;swing=.001;hitDone=false}
function axeAnim(dt){for(const c of chips)if(c.m.visible){c.v.y-=9*dt;c.m.position.addScaledVector(c.v,dt);c.m.rotation.x+=dt*8;c.t-=dt*1.2;if(c.t<=0)c.m.visible=false}
 for(const f of falling){if(f.done)continue;f.t+=dt;const a=Math.min(Math.PI/2,.04+Math.pow(f.t/2.4,2)*1.5);f.m.quaternion.setFromAxisAngle(f.ax,a).multiply(f.q0);
  if(a>=Math.PI/2-.001){f.done=true;if(AC){burst(90,.7,.5,'lowpass');burst(500,.25,.4,'bandpass')}wood+=f.w;say('Madeira: '+wood)}}
 if(swing>0){swing+=dt*1.8;const s=swing,e=s<.3?-Math.sin(s/.3*Math.PI/2)*.9:s<.5?-.9+Math.pow((s-.3)/.2,2)*2.3:1.4-((s-.5)/.5)*1.4;
  axe.rotation.x=.3+e;axe.position.z=-.55+(s>.3&&s<.55?-.12:0);axe.position.y=-.3+(s<.3?.08*s/.3:0);
  if(!hitDone&&s>=.5){hitDone=true;doHit()}if(s>=1){swing=0;axe.rotation.x=.3;axe.position.set(.32,-.3,-.55)}}}
function doHit(){const P=player.pos,fx=-Math.sin(player.yaw),fz=-Math.cos(player.yaw);let best=null,bd=1e9;
 near(P.x,P.z,c=>{if(!c.M||!c.M.userData.tree||c.r<=0)return;const dx=c.x-P.x,dz=c.z-P.z,d=Math.hypot(dx,dz);if(d<c.r+3.2&&(dx*fx+dz*fz)/d>.5&&d<bd){bd=d;best=c}});
 if(!best){if(AC)burst(1800,.08,.12,'bandpass');return}
 best.hits++;emit(P.x+fx*(bd-best.r),player.eye-.4,P.z+fz*(bd-best.r));if(AC){burst(160,.7,.2,'lowpass');burst(900,.25,.06,'bandpass');burst(3000,.1,.03,'bandpass')}
 if(best.hits>=5){fell(best,fx,fz);mpEmit({t:'fell',x:best.x,z:best.z})}else{if(best.hits===4&&AC)burst(70,.35,.7,'lowpass');say('Madeira: '+wood+(best.hits<3?'  (entalhe '+best.hits+'/2)':'  (corte de trás '+(best.hits-2)+'/3)'))}}
function fell(c,fx,fz,rm){const M=c.M;M.getMatrixAt(c.i,mt4);mt4.decompose(_p,_q,_s);M.setMatrixAt(c.i,zero);M.instanceMatrix.needsUpdate=true;c.r=.35;c.felled=true;
 const fm=M.userData.fm=M.userData.fm||new THREE.MeshStandardMaterial({vertexColors:true,side:THREE.DoubleSide,roughness:.9,map:M.material.map});
 const m=new THREE.Mesh(M.geometry,fm);m.position.copy(_p);m.scale.copy(_s);m.quaternion.copy(_q);m.castShadow=true;scene.add(m);
 const st=new THREE.Mesh(new THREE.CylinderGeometry(.35*_s.x,.45*_s.x,.7,8),new THREE.MeshStandardMaterial({color:0x6b4a2b,roughness:.95}));st.position.set(_p.x,_p.y+.3,_p.z);st.castShadow=true;scene.add(st);
 falling.push({m,t:0,q0:_q.clone(),ax:new THREE.Vector3(fz,0,-fx).normalize(),w:rm?0:M.userData.tree,done:false});say('Árvore caindo! Afaste-se')}
function build_(){if(!RM&&mode!=='play')return;if(!RM&&wood<10){say('Precisa de 10 madeiras (você tem '+wood+')');return}
 if(!RM)wood-=10;const P=player.pos,YW=RM?RM.yaw:player.yaw,fx=-Math.sin(YW),fz=-Math.cos(YW),cx=RM?RM.x:P.x+fx*7,cz=RM?RM.z:P.z+fz*7,gy=Math.max(H(cx,cz),H(cx+3,cz),H(cx-3,cz),H(cx,cz+3),H(cx,cz-3)),g=new THREE.Group();g.position.set(cx,gy,cz);g.rotation.y=YW;
 const tx=mkTex(2,1),lm=new THREE.MeshStandardMaterial({color:0x8a5a32,map:tx,roughness:.9}),rm=new THREE.MeshStandardMaterial({color:0x5a3520,map:tx,roughness:.95,side:THREE.DoubleSide}),bm2=new THREE.MeshStandardMaterial({color:0x9b2d2d,roughness:.9}),sm2=new THREE.MeshStandardMaterial({color:0xe8e2d0,roughness:.95});
 const add=(gm,m,x,y,z,ry=0,rx=0)=>{const o=new THREE.Mesh(gm,m);o.position.set(x,y,z);o.rotation.set(rx,ry,0);o.castShadow=o.receiveShadow=true;g.add(o);return o};
 const box=(w,h,d,x,y,z,m,ry,rx)=>add(new THREE.BoxGeometry(w,h,d),m,x,y,z,ry,rx);
 const log=(len,x,y,z,ax)=>{const gm=new THREE.CylinderGeometry(.16,.16,len,10);if(ax==='x')gm.rotateZ(Math.PI/2);else gm.rotateX(Math.PI/2);add(gm,lm,x,y,z)};
 box(5.4,.3,5.4,0,.1,0,rm);box(5.6,1.6,5.6,0,-.7,0,rm);
 for(let k=0;k<9;k++){const y=.45+k*.3;log(5.4,0,y,-2.5,'x');log(5.4,-2.5,y,0,'z');log(5.4,2.5,y,0,'z');if(k>=7)log(5.4,0,y,2.5,'x');else{log(2,-1.7,y,2.5,'x');log(2,1.7,y,2.5,'x')}}
 box(5.8,.15,3.3,0,3.95,-1.3,rm,0,-.5);box(5.8,.15,3.3,0,3.95,1.3,rm,0,.5);
 const gb=new THREE.ShapeGeometry(new THREE.Shape([new THREE.Vector2(-2.7,3.1),new THREE.Vector2(2.7,3.1),new THREE.Vector2(0,4.75)]));
 for(const sx of[-2.55,2.55])add(gb,rm,sx,0,0,Math.PI/2);
 box(1,.3,2,-1.7,.55,-1.4,rm);box(.92,.16,1.9,-1.7,.78,-1.4,sm2);box(.7,.14,.4,-1.7,.92,-2.1,bm2);
 box(1.2,.08,.8,1.5,.95,-1.8,rm);for(const[a,b]of[[1.1,-2.1],[1.9,-2.1],[1.1,-1.5],[1.9,-1.5]])box(.1,.7,.1,a,.6,b,rm);
 const lg=new THREE.PointLight(0xffb060,0,10);lg.position.set(0,2.6,0);g.add(lg);scene.add(g);
 const cy=Math.cos(YW),sy=Math.sin(YW),wc=(lx,lz)=>addC(cx+lx*cy+lz*sy,cz-lx*sy+lz*cy,.45);
 for(let t=-2.4;t<=2.41;t+=.6){wc(t,-2.5);wc(-2.5,t);wc(2.5,t);if(Math.abs(t)>1.5)wc(t,2.5)}
 cabins.push({x:cx,z:cz,y:gy,yaw:YW,light:lg});if(!RM)mpEmit({t:'cabin',x:cx,z:cz,yaw:YW});say('Cabana construída! À noite, entre e aperte Z para dormir.')}
function sleep(){if(mode!=='play')return;const P=player.pos,cb=cabins.find(c=>Math.hypot(c.x-P.x,c.z-P.z)<2.6);
 if(!cb){say('Entre na cabana para dormir');return}if(skyU.lum.value>.3){say('Só dá para dormir à noite');return}
 const f=$('fade');f.style.opacity=1;say('Dormindo...');setTimeout(()=>{set.time=6.3;f.style.opacity=0;say('Bom dia!')},1500)}
addEventListener('keydown',e=>{if(e.code==='KeyZ')sleep()});
function makeFish(){const NF=34,body=new THREE.SphereGeometry(1,10,8).scale(.1,.16,.5).toNonIndexed(),pp=Array.from(body.attributes.position.array),nn=Array.from(body.attributes.normal.array),cl=[];
 for(let i=0;i<body.attributes.position.count;i++)cl.push(...(pp[i*3+1]>0?[.25,.32,.2]:[.8,.82,.78]));
 const tail=[0,0,-.4,0,.2,-.8,0,-.2,-.8,0,0,-.4,0,-.2,-.8,0,.2,-.8];for(let i=0;i<6;i++){pp.push(tail[i*3],tail[i*3+1],tail[i*3+2]);nn.push(1,0,0);cl.push(.3,.33,.22)}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pp,3));g.setAttribute('normal',new THREE.Float32BufferAttribute(nn,3));g.setAttribute('color',new THREE.Float32BufferAttribute(cl,3));
 const fm=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.4,metalness:.3,side:THREE.DoubleSide});fm.customProgramCacheKey=()=>'fish';
 fm.onBeforeCompile=s=>{s.uniforms.uT=U.uT;s.vertexShader='uniform float uT;\n'+s.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\ntransformed.x+=sin(uT*9.+instanceMatrix[3].x)*.14*smoothstep(-.1,-.8,position.z);')};
 const m=new THREE.InstancedMesh(g,fm,NF);m.frustumCulled=false;scene.add(m);fish.length=0;
 for(let i=0;i<NF*8&&fish.length<NF;i++){const a=Math.random()*6.283,r=Math.random()*180,x=spawn.x+Math.cos(a)*r,z=spawn.z+Math.sin(a)*r,h=H(x,z);if(h>-2.5)continue;fish.push({cx:x,cz:z,r:2+Math.random()*5,a:Math.random()*6.3,s:(.3+Math.random()*.4)*(Math.random()<.5?1:-1),y:Math.max(h+.8,-1-Math.random()*(-h-1.5))})}
 fishMesh=m}
function fishUpdate(dt){if(!fishMesh)return;fishMesh.count=fish.length;for(let i=0;i<fish.length;i++){const f=fish[i];f.a+=dt*f.s;bo.position.set(f.cx+Math.cos(f.a)*f.r,f.y+Math.sin(T*.7+i)*.15,f.cz+Math.sin(f.a)*f.r);bo.rotation.set(0,f.s>0?-f.a:Math.PI-f.a,0);bo.scale.setScalar(f.dead?0:.35+(i%5)*.08);bo.updateMatrix();fishMesh.setMatrixAt(i,bo.matrix)}fishMesh.instanceMatrix.needsUpdate=true}
// ---------- sobrevivência e história ----------
let introDone=false,ended=false,fireLit=false,cabinBuilt=false,radioSent=false,waitDawn=false,prevT=17,day=1,parts=0,bag=0,heli=null,objT=0,storyT=0;
const S4={v:100,f:85,s:85,w:100},fires=[],pieces=[];
const MSG=['Peça 1/3: um painel do avião, ainda morno. Tem fios que servem ao rádio.','Peça 2/3: a antena. Entortada, mas inteira.','Peça 3/3: a bateria! Volte à cabana e monte o rádio (F).'];
function tell(t,sec){const e=$('story');e.textContent=t;e.style.opacity=1;storyT=sec||6}
function chime(){const t=AC.currentTime;[660,880,1320].forEach((f,i)=>{const o=AC.createOscillator(),g=AC.createGain(),a=t+i*.12;o.frequency.value=f;g.gain.setValueAtTime(0,a);g.gain.linearRampToValueAtTime(.08,a+.02);g.gain.exponentialRampToValueAtTime(.001,a+.6);o.connect(g);g.connect(master);o.start(a);o.stop(a+.7)})}
function radioStatic(){for(let i=0;i<6;i++)setTimeout(()=>burst(2500+Math.random()*2000,.1,.25,'bandpass'),i*180)}
function placePieces(){for(let k=0;k<3;k++){const a0=Math.random()*6.283+k*2.09;for(let r=140;r<330;r+=8){const a=a0+(r%3)*.15,x=spawn.x+Math.cos(a)*r,z=spawn.z+Math.sin(a)*r,h=H(x,z);
  if(h>2.5&&h<45){const g=new THREE.Group();g.position.set(x,h,z);const b=new THREE.Mesh(new THREE.BoxGeometry(.5,.35,.35),new THREE.MeshStandardMaterial({color:0x334455,emissive:0x2299ff,emissiveIntensity:1.2,roughness:.4}));b.position.y=.3;
   const bm=new THREE.Mesh(new THREE.CylinderGeometry(.35,.35,70,12,1,true),new THREE.MeshBasicMaterial({color:0x44aaff,transparent:true,opacity:.28,blending:THREE.AdditiveBlending,depthWrite:false,fog:false,side:THREE.DoubleSide}));bm.position.y=35;g.add(b,bm);scene.add(g);pieces.push({x,z,g,got:false});break}}}}
function makeFire(){if(!RM&&(mode!=='play'||ended))return;if(!RM&&wood<3){say('Precisa de 3 madeiras para a fogueira');return}if(!RM)wood-=3;
 const P=player.pos,x=RM?RM.x:P.x-Math.sin(player.yaw)*2.5,z=RM?RM.z:P.z-Math.cos(player.yaw)*2.5,g=new THREE.Group();g.position.set(x,H(x,z),z);
 const lm=new THREE.MeshStandardMaterial({color:0x4a2f18,roughness:1}),sm=new THREE.MeshStandardMaterial({color:0x777777,roughness:1});
 for(let i=0;i<4;i++){const l=new THREE.Mesh(new THREE.CylinderGeometry(.07,.07,.9,6),lm);l.position.y=.12;l.rotation.set(0,i*.8,Math.PI/2);g.add(l)}
 for(let i=0;i<9;i++){const s=new THREE.Mesh(new THREE.SphereGeometry(.14,6,5),sm);s.position.set(Math.cos(i*.7)*.55,.08,Math.sin(i*.7)*.55);g.add(s)}
 const fl=[[.22,.6,0xff6a10],[.16,.45,0xffa530],[.1,.3,0xffe080]].map(([r,h,c])=>{const m=new THREE.Mesh(new THREE.ConeGeometry(r,h,8),new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.88,fog:false}));m.position.y=.12+h/2;g.add(m);return m});
 const light=new THREE.PointLight(0xff8a3a,2,16);light.position.y=.8;g.add(light);scene.add(g);addC(x,z,.5);
 fires.push({g,fl,light,t:240,x,z});if(!RM)mpEmit({t:'fire',x,z});while(fires.filter(f=>f.t>0).length>2){const o=fires.find(f=>f.t>0);o.t=0}
 if(!RM&&!fireLit){fireLit=true;tell('A fogueira aquece e afasta o frio. Fique perto dela à noite.',7)}}
function fireUpdate(dt){for(const f of fires){if(f.t>0){f.t-=dt;f.light.intensity=1.6+Math.sin(T*23+f.x)*.4+Math.random()*.4;f.fl.forEach((m,i)=>m.scale.set(1+Math.sin(T*17+i)*.1,.9+Math.random()*.3,1));
  if(AC&&Math.hypot(f.x-player.pos.x,f.z-player.pos.z)<14&&Math.random()<dt*9)burst(1500+Math.random()*2500,.06,.04,'bandpass')}else if(f.g.visible){f.g.visible=false;f.light.intensity=0}}}
function useAct(){if(mode!=='play'||ended)return;const P=player.pos,fx=-Math.sin(player.yaw),fz=-Math.cos(player.yaw),swim=cam.position.y<.6&&H(P.x,P.z)<-1;
 if(cabins.some(c=>Math.hypot(c.x-P.x,c.z-P.z)<4)&&parts>=3&&!radioSent){radioSent=true;waitDawn=true;tell('Você monta o rádio. Entre ruídos, uma voz: "Aqui é o resgate. Aguente até o amanhecer. Estamos a caminho."',9);if(AC)radioStatic();return}
 if(swim)for(const f of fish){if(f.dead)continue;if(Math.hypot(f.cx+Math.cos(f.a)*f.r-P.x,f.cz+Math.sin(f.a)*f.r-P.z)<3.5){f.dead=true;bag++;say('Você pegou um peixe! ('+bag+')');if(AC)burst(600,.3,.3,'bandpass');return}}
 if(bag>0&&fires.some(f=>f.t>0&&Math.hypot(f.x-P.x,f.z-P.z)<5)){bag--;S4.f=Math.min(100,S4.f+65);say('Peixe assado na fogueira. +fome');return}
 if(swim||H(P.x+fx*1.6,P.z+fz*1.6)<.1){S4.s=Math.min(100,S4.s+40);say('Você bebe água do lago. +sede');if(AC)burst(700,.2,.3,'bandpass');return}
 let bb=null;near(P.x,P.z,c=>{if(window.Q&&c.M===Q.B&&!c.eaten&&Math.hypot(c.x-P.x,c.z-P.z)<c.r+2.2)bb=c});
 if(bb){bb.eaten=true;S4.f=Math.min(100,S4.f+14);say('Frutinhas silvestres. +fome');return}
 if(bag>0){bag--;S4.f=Math.min(100,S4.f+30);if(Math.random()<.3)S4.v=Math.max(1,S4.v-10);say('Peixe cru: mata a fome, mas cai mal.');return}
 say('Nada para usar aqui')}
function sleep(){if(mode!=='play'||ended)return;const P=player.pos,cb=cabins.find(c=>Math.hypot(c.x-P.x,c.z-P.z)<2.6);if(!cb){say('Entre na cabana para dormir');return}if(skyU.lum.value>.3){say('Só dá para dormir à noite');return}
 const f=$('fade');f.style.opacity=1;say('Dormindo...');setTimeout(()=>{if(!MPon){set.time=6.3;prevT=6.3;day++}S4.v=Math.min(100,S4.v+40);S4.f=Math.max(5,S4.f-15);S4.s=Math.max(5,S4.s-18);S4.w=100;f.style.opacity=0;say('Bom dia!');if(waitDawn&&!MPon)startEnding()},1500)}
function showEnd(t,p){$('eT').textContent=t;$('eP').textContent=p;$('endscr').style.display='flex'}
function endGame(win,why){if(ended)return;ended=true;mode='cine';if(document.exitPointerLock)document.exitPointerLock();$('touch').style.display='none';showEnd('VOCÊ NÃO SOBREVIVEU',why+' Você resistiu '+day+' dia(s).')}
function startEnding(){if(ended)return;ended=true;waitDawn=false;mode='cine';$('touch').style.display='none';if(document.exitPointerLock)document.exitPointerLock();
 const g=new THREE.Group(),bm=new THREE.MeshStandardMaterial({color:0xcc2222,roughness:.5,metalness:.3}),P=player.pos;
 g.add(new THREE.Mesh(new THREE.SphereGeometry(1,16,12).scale(1.1,.9,2),bm));const tl=new THREE.Mesh(new THREE.CylinderGeometry(.12,.3,3.6,8).rotateX(Math.PI/2),bm);tl.position.z=-3.3;g.add(tl);
 const rot=new THREE.Mesh(new THREE.BoxGeometry(7,.05,.25),new THREE.MeshStandardMaterial({color:0x222222}));rot.position.y=1.15;g.add(rot);scene.add(g);
 heli={g,rot,t:0,sx:P.x+200,sz:P.z+120,sy:P.y0||60,tx:P.x+10,tz:P.z-8};
 if(AC){const o=AC.createOscillator(),gg=AC.createGain(),l=AC.createOscillator(),lg=AC.createGain();o.type='sawtooth';o.frequency.value=48;gg.gain.value=.1;l.frequency.value=13;lg.gain.value=.08;l.connect(lg);lg.connect(gg.gain);o.connect(gg);gg.connect(master);o.start();l.start()}
 say('Você ouve um helicóptero!')}
function endUpdate(dt){if(!heli)return;const h=heli,P=player.pos;h.t+=dt;const k=Math.min(1,h.t/9),e=k*k*(3-2*k),gy=H(h.tx,h.tz)+16;
 h.g.position.set(h.sx+(h.tx-h.sx)*e,h.sy+(gy-h.sy)*e,h.sz+(h.tz-h.sz)*e);h.g.rotation.y=Math.atan2(h.tx-h.sx,h.tz-h.sz);h.rot.rotation.y+=dt*40;
 player.yaw=Math.atan2(-(h.g.position.x-P.x),-(h.g.position.z-P.z));player.pitch=.3;
 if(h.t>11&&$('endscr').style.display!=='flex')showEnd('RESGATADO','O helicóptero pousa ao amanhecer. Você sobreviveu '+day+' dia(s) nas montanhas e volta para casa. FIM.')}
function survUpdate(dt){if(mode!=='play'||ended||!introDone)return;const P=player.pos,night=skyU.lum.value<.35,swim=cam.position.y<.6&&H(P.x,P.z)<-1;
 const nearFire=fires.some(f=>f.t>0&&Math.hypot(f.x-P.x,f.z-P.z)<7),inCab=cabins.some(c=>{const dx=P.x-c.x,dz=P.z-c.z,cy=Math.cos(c.yaw),sy=Math.sin(c.yaw);return Math.abs(dx*cy-dz*sy)<2.5&&Math.abs(dx*sy+dz*cy)<2.5});
 S4.f=Math.max(0,S4.f-dt*.085);S4.s=Math.max(0,S4.s-dt*.14);
 let dw=night?-.25:.15;if(nearFire)dw=2.5;else if(inCab)dw=Math.max(dw,night?.6:.3);if(swim)dw=-1.2;if(cam.position.y<0)dw-=.4;S4.w=Math.max(0,Math.min(100,S4.w+dw*dt));
 let dh=0;if(S4.f<=0)dh-=1;if(S4.s<=0)dh-=1.2;if(S4.w<=0)dh-=1.5;if(!dh&&S4.f>35&&S4.s>35&&S4.w>35)dh=.6;S4.v=Math.max(0,Math.min(100,S4.v+dh*dt));
 if(S4.v<=0){endGame(false,S4.s<=0?'Você morreu de sede.':S4.f<=0?'Você morreu de fome.':'Você morreu de frio.');return}
 for(const q of pieces)if(!q.got&&Math.hypot(q.x-P.x,q.z-P.z)<2.3){q.got=true;scene.remove(q.g);parts++;tell(MSG[parts-1],8);if(AC)chime()}
 if(cabins.length)cabinBuilt=true;
 const t=set.time;if(prevT<6&&t>=6){day++;if(waitDawn)startEnding()}prevT=t;
 ['v','f','s','w'].forEach((k,i)=>$('s'+i).style.setProperty('--p',S4[k]+'%'));
 objT-=dt;if(objT<=0){objT=.5;let o;if(!fireLit)o='junte 3 madeiras (E) e acenda uma fogueira (G).';else if(!cabinBuilt)o='construa uma cabana com 10 madeiras (B).';
  else if(parts<3){const d=pieces.filter(q=>!q.got).map(q=>Math.hypot(q.x-P.x,q.z-P.z)).sort((a,b)=>a-b)[0]|0;o='ache as peças do rádio ('+parts+'/3), feixes azuis. Mais próxima: '+d+' m.'}
  else if(!radioSent)o='volte à cabana e monte o rádio (F).';else o='o resgate está a caminho. Sobreviva até o amanhecer!';
  $('obj').textContent='Dia '+day+' — '+o;$('inv').textContent='Madeira '+wood+' · Peixe '+bag}
 if(storyT>0){storyT-=dt;if(storyT<=0)$('story').style.opacity=0}fireUpdate(dt)}
addEventListener('keydown',e=>{if(e.code==='KeyF')useAct();if(e.code==='KeyG')makeFire()});
$('ibtn').onclick=()=>{introDone=true;$('intro').style.display='none';$('stats').style.display='block';start();tell('O sol está baixo e a noite vem rápido. Procure madeira!',7)};
$('ebtn').onclick=()=>location.reload();
// ---------- multijogador online (sala compartilhada) ----------
let MPon=false,MPr=null,RM=null,MPname='Jogador',chatting=false,mpLast=0;const MPhue=Math.random(),remotes={};
function mkRand(s){return()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
function hashStr(s){let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function seedFor(c){return hashStr('aurora:'+(c?Math.round(c.x/200)+','+Math.round(c.z/200):'0,0'))}
function mpEmit(d){if(MPr)MPr.emit('fx',d).catch(()=>{})}
function chatLine(t){const d=document.createElement('div');d.textContent=t;const L=$('chatlog');L.appendChild(d);while(L.children.length>5)L.removeChild(L.firstChild);setTimeout(()=>d.remove(),9000)}
function openChat(){if(!MPr||mode!=='play'||chatting)return;chatting=true;if(document.exitPointerLock)document.exitPointerLock();const i=$('cin');i.style.display='block';i.value='';setTimeout(()=>i.focus(),30)}
function closeChat(){chatting=false;const i=$('cin');i.style.display='none';i.blur();for(const k in keys)keys[k]=false;if(!isTouch&&mode==='play'&&$('c').requestPointerLock)$('c').requestPointerLock()}
$('cin').addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Enter'){const t=$('cin').value.trim().slice(0,120);if(t&&MPr){chatLine('Você: '+t);MPr.emit('chat',{n:MPname,t}).catch(()=>{})}closeChat()}else if(e.key==='Escape')closeChat()});
addEventListener('keydown',e=>{if(e.code==='Enter')openChat()});
const SK=[0xf1c9a5,0xe0ac82,0xc68863,0x9a6240,0x6b4228,0x4a2c1b],HC=[0x16110e,0x4a2c1b,0x8a5a32,0xc9a24a,0xa8401f,0xd0d0d0],CL=[0x3f6b8a,0x8a3b3b,0x4f7a4a,0xc9902f,0x6a4a8a,0x2f2f36];
let CHo={s:1,h:1,o:0,c:0};try{Object.assign(CHo,JSON.parse(localStorage.getItem('aurora_ch')||'{}'))}catch(e){}
const chCode=()=>''+CHo.s+CHo.h+CHo.o+CHo.c,chParse=c=>{const a=String(c||'1100').split('').map(Number);return{s:a[0]|0,h:a[1]|0,o:a[2]|0,c:a[3]|0}};
for(const k of['S','H','O','C']){const e=$('ch'+k),p=k.toLowerCase();e.value=CHo[p];e.onchange=()=>{CHo[p]=+e.value;try{localStorage.setItem('aurora_ch',JSON.stringify(CHo))}catch(x){}if(MPr)MPr.presence({c:chCode()}).catch(()=>{});if(meAv)scene.remove(meAv.g);meAv=null}}
let meAv=null,tp=true;
function mkAvatar(o){o=o||{};const M=(c,r)=>new THREE.MeshStandardMaterial({color:c,roughness:r==null?.8:r}),
 sk=M(SK[o.s]||SK[1],.55),hr=M(HC[o.h]||HC[1],.85),cl=M(CL[o.c]||CL[0],.92),pn=M(0x2b2f3a,.95),bt=M(0x33241a,.75),lt=M(0x6b4a2b,.7);
 const g=new THREE.Group(),A=(p,geo,mat,x,y,z,sx,sy,sz)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.scale.set(sx||1,sy||1,sz||1);m.castShadow=true;p.add(m);return m},
 sp=r=>new THREE.SphereGeometry(r,18,14),cy=(a,b,h)=>new THREE.CylinderGeometry(a,b,h,16),bx=(w,h,d)=>new THREE.BoxGeometry(w,h,d),grp=(p,x,y,z)=>{const q=new THREE.Group();q.position.set(x,y,z);p.add(q);return q};
 const bd=grp(g,0,0,0);
 A(bd,sp(.19),pn,0,.98,0,1.12,.62,.82);A(bd,cy(.2,.17,.34),cl,0,1.2,0,1,1,.66);A(bd,sp(.21),cl,0,1.38,0,1.2,.78,.76);A(bd,cy(.185,.185,.06),lt,0,1.02,0,1,1,.7);A(bd,bx(.05,.04,.02),M(0xb8a060,.3),0,1.02,-.13);
 A(bd,cy(.2,.2,.04),cl,0,1.0,0,1.02,1,.7);A(bd,bx(.04,.3,.012),M(0x222222),0,1.28,-.138);
 A(bd,bx(.3,.38,.14),lt,0,1.34,.17);A(bd,cy(.07,.07,.3),M(0x4a5a3a),0,1.56,.17).rotation.z=Math.PI/2;
 A(bd,cy(.055,.065,.1),sk,0,1.6,0);const hd=grp(bd,0,1.73,0);
 A(hd,sp(.11),sk,0,0,0,1,1.2,1.08);A(hd,sp(.085),sk,0,-.07,-.02,1,.9,1);A(hd,sp(.022),sk,0,-.015,-.118,.9,1.25,1.3);
 for(const x of[-1,1]){A(hd,sp(.02),M(0xf4f0ea,.3),x*.04,.025,-.098,1.2,.8,.5);A(hd,sp(.011),M(0x2a3a2a,.2),x*.04,.025,-.108);A(hd,bx(.045,.009,.012),hr,x*.042,.058,-.103).rotation.z=-x*.12;A(hd,sp(.026),sk,x*.113,0,.0,.6,1,1)}
 A(hd,bx(.04,.008,.01),M(0xa5504a,.5),0,-.065,-.108);
 const S=o.o|0;
 if(S!==3){const cap=A(hd,new THREE.SphereGeometry(.118,18,14,0,6.283,0,1.75),hr,0,.005,.012,1,1.2,1.1);A(hd,bx(.2,.045,.03),hr,0,.075,-.1)}
 if(S===1){A(hd,cy(.11,.09,.42),hr,0,-.17,.06,1,1,.5);A(bd,sp(.07),hr,0,1.55,.09,1.2,1.4,.8)}
 if(S===2){A(hd,sp(.05),hr,0,.06,.13);A(hd,cy(.03,.012,.26),hr,0,-.07,.17,1,1,1).rotation.x=.4}
 if(S===3){const c=M(CL[o.c]||CL[0],.9);A(hd,new THREE.SphereGeometry(.122,18,14,0,6.283,0,1.5),c,0,.02,.01,1,1.15,1.1);A(hd,bx(.18,.015,.12),c,0,.035,-.15)}
 const arm=x=>{const a=grp(bd,x*.265,1.5,0);A(a,sp(.06),cl,0,0,0);A(a,cy(.055,.047,.3),cl,0,-.15,0);const f=grp(a,0,-.3,0);A(f,sp(.045),cl,0,0,0);A(f,cy(.043,.034,.27),sk,0,-.135,0);const h=grp(f,0,-.29,0);A(h,sp(.04),sk,0,0,0,1,1.15,.8);return{a,f,h}},
 R=arm(1),L=arm(-1);
 const leg=x=>{const l=grp(bd,x*.1,.95,0);A(l,cy(.09,.068,.46),pn,0,-.23,0);const k=grp(l,0,-.46,0);A(k,sp(.066),pn,0,0,0);A(k,cy(.066,.054,.4),pn,0,-.2,0);A(k,cy(.062,.07,.14),bt,0,-.36,0);A(k,bx(.1,.07,.22),bt,0,-.43,-.04);return{l,k}},
 LR=leg(1),LL=leg(-1);
 const ax=grp(R.h,0,-.02,0);ax.rotation.x=-Math.PI/2;A(ax,cy(.015,.02,.8),M(0x7a5230,.8),0,.3,0);A(ax,bx(.2,.12,.03),M(0xb4b9be,.4),.09,.62,0);
 return{g,bd,hd,aR:R.a,fR:R.f,aL:L.a,fL:L.f,lR:LR.l,kR:LR.k,lL:LL.l,kL:LL.k,ax,ph:0,v:0}}
function animAv(a,v,sw,swim,dt){const w=Math.min(1,v/4.5),T_=T;a.ph+=dt*(2+v*1.15);const p=a.ph,s=Math.sin(p)*w,br=Math.sin(T_*1.7)*.012;
 if(swim){const st=Math.sin(T_*4);a.aL.rotation.x=-1.6+st*.7;a.aR.rotation.x=sw?-1.6+Math.sin(T_*9)*.9:-1.6-st*.7;a.fL.rotation.x=a.fR.rotation.x=-.3;a.lL.rotation.x=Math.sin(T_*8)*.4;a.lR.rotation.x=-Math.sin(T_*8)*.4;a.kL.rotation.x=a.kR.rotation.x=-.2;a.bd.position.y=-.1;return}
 a.bd.position.y=Math.abs(Math.cos(p))*.035*w+br;a.lL.rotation.x=s*.85;a.lR.rotation.x=-s*.85;a.kL.rotation.x=-Math.max(0,-Math.cos(p))*w*1.1;a.kR.rotation.x=-Math.max(0,Math.cos(p))*w*1.1;
 a.aL.rotation.x=-s*.7;a.fL.rotation.x=-.2-w*.35;a.aR.rotation.x=sw?-1.5+Math.sin(T_*9)*1.0:s*.7-.25;a.fR.rotation.x=sw?-.5:-.3-w*.3;a.aL.rotation.z=.06;a.aR.rotation.z=-.06;a.hd.rotation.y=Math.sin(T_*.6)*.12*(1-w);a.bd.rotation.x=w*.08}
function tagSprite(t){const c=cvs(256);c.height=64;const x=c.getContext('2d');x.fillStyle='rgba(0,0,0,.55)';x.fillRect(0,0,256,64);x.fillStyle='#fff';x.font='600 36px system-ui';x.textAlign='center';x.fillText(t,128,46);
 const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),depthTest:false}));s.scale.set(2,.5,1);s.position.y=2.3;s.renderOrder=10;return s}
function mpUpdate(dt){if(!MPr)return;const now=performance.now();
 if(now-mpLast>70){mpLast=now;const P=player.pos;MPr.presence({x:+P.x.toFixed(2),y:+Math.max(player.eye-1.7,-1.4).toFixed(2),z:+P.z.toFixed(2),r:+player.yaw.toFixed(2),s:swing>0?1:0,h:MPhue,n:MPname,c:chCode()}).catch(()=>{})}
 const seen={},k=Math.min(1,dt*10);
 for(const p of MPr.peers()){if(p.isMe||p.kind!=='viewer')continue;seen[p.peer]=1;const pr=p.presence;let a=remotes[p.peer];
  if(!a||a.c!==pr.c){const old=a;if(old)scene.remove(old.g);a=remotes[p.peer]=Object.assign(mkAvatar(chParse(pr.c)),{n:null,c:pr.c});scene.add(a.g);a.g.position.set(+pr.x||0,+pr.y||0,+pr.z||0)}
  if(pr.n!==a.n){a.n=pr.n;if(a.tag)a.g.remove(a.tag);a.tag=tagSprite(String(pr.n||'Jogador').slice(0,16));a.g.add(a.tag)}
  const g=a.g,ox=g.position.x,oz=g.position.z;g.position.x+=((+pr.x||0)-g.position.x)*k;g.position.y+=((+pr.y||0)-g.position.y)*k;g.position.z+=((+pr.z||0)-g.position.z)*k;
  const d=((((+pr.r||0)+Math.PI)-g.rotation.y+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;g.rotation.y+=d*k;
  a.v+=(Math.hypot(g.position.x-ox,g.position.z-oz)/Math.max(dt,.001)-a.v)*Math.min(1,dt*8);animAv(a,a.v,pr.s,H(g.position.x,g.position.z)<-1,dt)}
 for(const id in remotes)if(!seen[id]){scene.remove(remotes[id].g);delete remotes[id]}}
const tpb=document.createElement('div');tpb.textContent='👤';tpb.style.cssText='position:fixed;left:max(16px,env(safe-area-inset-left));top:max(14px,env(safe-area-inset-top));width:44px;height:44px;border-radius:50%;background:rgba(0,0,0,.4);border:2px solid rgba(255,255,255,.5);display:none;align-items:center;justify-content:center;font-size:20px;z-index:3';document.body.appendChild(tpb);
const togTP=()=>{tp=!tp};tpb.onclick=togTP;tpb.ontouchstart=e=>{e.preventDefault();e.stopPropagation();togTP()};addEventListener('keydown',e=>{if(e.code==='KeyC'&&mode==='play'&&!chatting)togTP()});
let lpx=0,lpz=0;
function tpUpdate(dt){tpb.style.display=mode==='play'?'flex':'none';const P=player;
 if(!meAv){meAv=mkAvatar(CHo);meAv.g.visible=false;scene.add(meAv.g);meAv.g.add(tagSprite('Você'))}
 const sh=tp&&mode==='play';meAv.g.visible=sh;axe.visible=mode==='play'&&!tp;if(!sh){lpx=P.pos.x;lpz=P.pos.z;return}
 const fy=Math.max(P.eye-1.7,-1.4);meAv.g.position.set(P.pos.x,fy,P.pos.z);meAv.g.rotation.y=P.yaw;
 const v=Math.hypot(P.pos.x-lpx,P.pos.z-lpz)/Math.max(dt,.001);lpx=P.pos.x;lpz=P.pos.z;meAv.v+=(v-meAv.v)*Math.min(1,dt*8);
 animAv(meAv,meAv.v,swing>0,H(P.pos.x,P.pos.z)<-1,dt);
 const cp=Math.cos(P.pitch),fx=-Math.sin(P.yaw)*cp,fz=-Math.cos(P.yaw)*cp,fyv=Math.sin(P.pitch),D=3.6;
 cam.position.set(P.pos.x-fx*D,P.eye+.2-fyv*D,P.pos.z-fz*D);cam.position.y=Math.max(cam.position.y,H(cam.position.x,cam.position.z)+.4);}
function remoteFell(x,z){let b=null,bd=1.5;near(x,z,c=>{if(c.M&&c.M.userData.tree&&c.r>0){const d=Math.hypot(c.x-x,c.z-z);if(d<bd){bd=d;b=c}}});if(b)fell(b,0,1,true)}
async function mpJoin(){const st=$('mpst'),name=($('mpn').value||'Jogador').slice(0,16),code=($('mpc').value||'sala1').toLowerCase().replace(/[^a-z0-9_-]/g,'').slice(0,30)||'sala1';
 if(typeof claude==='undefined'){st.textContent='Multijogador indisponível aqui.';return}st.textContent='Conectando...';let room=null;
 try{const r=await claude.use('room');if(!r){st.textContent='Multijogador indisponível: abra o link compartilhado, logado na sua conta.';return}room=await r.join('aurora-'+code)}catch(e){st.textContent='Não foi possível entrar na sala.';return}
 MPr=room;MPname=name;MPon=true;{const t=parseInt(code.slice(1),36);window._t0=code[0]==='w'&&t>1.7e9&&t<2.5e9?t:0}room.presence({n:name,h:MPhue,c:chCode()}).catch(()=>{});
 room.on('chat',m=>{if(m.isMe)return;const d=m.data||{};chatLine(String(d.n||'?').slice(0,16)+': '+String(d.t||'').slice(0,120))});
 room.on('fx',m=>{if(m.isMe)return;const d=m.data||{},ok=v=>typeof v==='number'&&isFinite(v)&&Math.abs(v)<1e5;if(!ok(d.x)||!ok(d.z))return;
  if(d.t==='fell')remoteFell(d.x,d.z);else if(d.t==='fire'){RM={x:d.x,z:d.z};try{makeFire()}finally{RM=null}}else if(d.t==='cabin'&&ok(d.yaw)){RM={x:d.x,z:d.z,yaw:d.yaw};try{build_()}finally{RM=null}}});
 room.onPeers(c=>{$('mpcount').textContent='Online: '+c.peers.filter(p=>p.kind==='viewer').length+' · Código '+code.slice(1).toUpperCase()});
 $('mpcount').style.display='block';$('cht').style.display='flex';st.textContent='Sala "'+code+'": conectado. Toque em Voltar e depois em Jogar. Compartilhe o link e o código.'}
(function(){
 const css=document.createElement('style');css.textContent='#p2 textarea{width:100%;height:62px;background:#2a2019;color:var(--ink);border:1px solid #6b5334;border-radius:4px;padding:6px;font:11px monospace;margin:4px 0;user-select:text;-webkit-user-select:text}#p2 h4{margin:12px 0 4px;color:var(--gold);font-size:14px}';document.head.appendChild(css);
 const ICE={iceServers:[{urls:'stun:stun.l.google.com:19302'},{urls:'turn:openrelay.metered.ca:80',username:'openrelayproject',credential:'openrelayproject'},{urls:'turn:openrelay.metered.ca:443?transport=tcp',username:'openrelayproject',credential:'openrelayproject'}]};
 const st=t=>{$('p2st').textContent=t};
 const links=[],hnd={},pcb=[],rem={};let nid=0,host=false,pend=null,begun=false;const me={peer:'me',by:null,isMe:true,sameTab:true,kind:'viewer',guest:false,presence:{}};
 const fire=()=>{const l=[me,...Object.values(rem)];for(const f of pcb){try{f({peers:l,joined:[],left:[],updated:[]})}catch(e){}}};
 const sendTo=(l,o)=>{try{if(l.dc&&l.dc.readyState==='open')l.dc.send(JSON.stringify(o))}catch(e){}};
 const bcast=(o,ex)=>{for(const l of links)if(l!==ex)sendTo(l,o)};
 function recv(l,raw){let m;try{m=JSON.parse(raw)}catch(e){return}if(!m||typeof m!=='object')return;
  if(m.t==='hello'){if(typeof m.t0==='number'&&isFinite(m.t0))window._t0=m.t0;return}
  const f=host?l.id:String(m.f||'h').slice(0,12);
  if(m.t==='x'){delete rem[String(m.f).slice(0,12)];fire();return}
  if(m.t==='p'&&m.d&&typeof m.d==='object'){rem[f]={peer:f,by:null,isMe:false,sameTab:false,kind:'viewer',guest:false,presence:m.d,updatedAt:Date.now()};fire()}
  else if(m.t==='e'&&typeof m.k==='string'){for(const h of(hnd[m.k]||[])){try{h({topic:m.k,data:m.d,isMe:false,peer:f,kind:'viewer'})}catch(e){}}}
  if(host){m.f=f;bcast(m,l)}}
 const room={presence(p){Object.assign(me.presence,p);bcast({t:'p',d:me.presence,f:'h'});return Promise.resolve()},
  peers:()=>[me,...Object.values(rem)],
  emit(k,d){bcast({t:'e',k,d,f:'h'});return Promise.resolve()},
  on(k,fn){(hnd[k]=hnd[k]||[]).push(fn);return()=>{}},
  onPeers(fn){pcb.push(fn);fn({peers:room.peers(),joined:[],left:[],updated:[]});return()=>{}}};
 function begin(){if(begun)return;begun=true;MPr=room;MPname=($('mpn').value||'Sobrevivente').slice(0,16);MPon=true;room.presence({n:MPname,h:MPhue,c:chCode()});
  room.on('chat',m=>{const d=m.data||{};chatLine(String(d.n||'?').slice(0,16)+': '+String(d.t||'').slice(0,120))});
  room.on('fx',m=>{const d=m.data||{},ok=v=>typeof v==='number'&&isFinite(v)&&Math.abs(v)<1e5;if(!ok(d.x)||!ok(d.z))return;
   if(d.t==='fell')remoteFell(d.x,d.z);else if(d.t==='fire'){RM={x:d.x,z:d.z};try{makeFire()}finally{RM=null}}else if(d.t==='cabin'&&ok(d.yaw)){RM={x:d.x,z:d.z,yaw:d.yaw};try{build_()}finally{RM=null}}});
  room.onPeers(c=>{$('mpcount').textContent='Online: '+c.peers.length+' \u00b7 Conex\u00e3o direta'});
  $('mpcount').style.display='block';$('cht').style.display='flex';start()}
 function attach(l){const dc=l.dc;
  dc.onopen=()=>{begin();if(host)sendTo(l,{t:'hello',t0:window._t0});st('Conectado!')};
  dc.onmessage=e=>recv(l,e.data);
  dc.onclose=()=>{const i=links.indexOf(l);if(i>=0)links.splice(i,1);if(host){delete rem[l.id];bcast({t:'x',f:l.id});fire()}else{for(const k in rem)delete rem[k];fire();say('O anfitri\u00e3o saiu do mundo')}}}
 const gather=pc=>new Promise(r=>{if(pc.iceGatheringState==='complete')return r();const f=()=>{if(pc.iceGatheringState==='complete'){pc.removeEventListener('icegatheringstatechange',f);r()}};pc.addEventListener('icegatheringstatechange',f);setTimeout(r,7000)});
 const enc=d=>btoa(unescape(encodeURIComponent(JSON.stringify(d)))),dec=t=>JSON.parse(decodeURIComponent(escape(atob(t.trim().replace(/\s+/g,'')))));
 $('p2mk').onclick=async()=>{try{if(typeof RTCPeerConnection==='undefined'){st('Este navegador n\u00e3o suporta conex\u00e3o direta.');return}host=true;if(!window._t0)window._t0=Math.floor(Date.now()/1000);st('Gerando convite...');
  const pc=new RTCPeerConnection(ICE),l={pc,id:'p'+(++nid)};l.dc=pc.createDataChannel('g');links.push(l);attach(l);
  await pc.setLocalDescription(await pc.createOffer());await gather(pc);$('p2o').value=enc(pc.localDescription);pend=l;st('Envie o convite ao amigo. Quando ele devolver a resposta, cole no campo 3.')}catch(e){st('Erro ao criar convite.')}};
 $('p2ok').onclick=async()=>{try{if(!pend)throw 0;await pend.pc.setRemoteDescription(dec($('p2a').value));st('Conectando...')}catch(e){st('Resposta inv\u00e1lida. Confira se copiou inteira.')}};
 $('p2ac').onclick=async()=>{try{if(typeof RTCPeerConnection==='undefined'){st('Este navegador n\u00e3o suporta conex\u00e3o direta.');return}host=false;const o=dec($('p2i').value);st('Gerando resposta...');
  const pc=new RTCPeerConnection(ICE),l={pc,id:'h'};links.length=0;links.push(l);pc.ondatachannel=e=>{l.dc=e.channel;attach(l)};
  await pc.setRemoteDescription(o);await pc.setLocalDescription(await pc.createAnswer());await gather(pc);$('p2r').value=enc(pc.localDescription);st('Envie esta resposta ao amigo e aguarde a conex\u00e3o.')}catch(e){st('Convite inv\u00e1lido. Confira se copiou inteiro.')}};
 const cp=async id=>{const t=$(id);if(!t.value)return;t.focus();t.select();try{t.setSelectionRange(0,1e7)}catch(e){}try{await navigator.clipboard.writeText(t.value);st('Copiado!')}catch(e){}if(navigator.share){try{await navigator.share({text:t.value})}catch(e){}}};
 $('p2cp').onclick=()=>cp('p2o');$('p2cp2').onclick=()=>cp('p2r');$('mpp2').onclick=()=>showSec('p2');
})();
(function(){
 const css=document.createElement('style');css.textContent='#mpauto,#mpgo,#mpfind,#mpl,.row:has(#mpcode){display:none!important}';document.head.appendChild(css);
 const st=t=>{$('svst').textContent=t},noSv='Não consegui falar com o servidor. Abra o jogo pelo endereço do seu servidor (veja o README).';
 const SURL=new URLSearchParams(location.search).get('server')||((location.protocol==='https:'?'wss://':'ws://')+location.host);
 let ws=null,begun=false,code=null,tries=0;const hnd={},pcb=[],rem={};
 const me={peer:'me',by:null,isMe:true,sameTab:true,kind:'viewer',guest:false,presence:{}};
 const fire=()=>{const l=[me,...Object.values(rem)];for(const f of pcb){try{f({peers:l,joined:[],left:[],updated:[]})}catch(e){}}};
 const tx=o=>{if(ws&&ws.readyState===1)ws.send(JSON.stringify(o))};
 const room={presence(p){Object.assign(me.presence,p);tx({t:'p',d:me.presence});return Promise.resolve()},peers:()=>[me,...Object.values(rem)],
  emit(k,d){tx({t:'e',k,d});return Promise.resolve()},on(k,fn){(hnd[k]=hnd[k]||[]).push(fn);return()=>{}},
  onPeers(fn){pcb.push(fn);fn({peers:room.peers(),joined:[],left:[],updated:[]});return()=>{}}};
 const setP=(id,d)=>{rem[id]={peer:id,by:null,isMe:false,sameTab:false,kind:'viewer',guest:false,presence:d,updatedAt:Date.now()}};
 const nm=()=>($('mpn').value||'Sobrevivente').slice(0,16);
 function begin(){if(begun)return;begun=true;MPr=room;MPname=nm();MPon=true;room.presence({n:MPname,h:MPhue,c:chCode()});
  room.on('chat',m=>{const d=m.data||{};chatLine(String(d.n||'?').slice(0,16)+': '+String(d.t||'').slice(0,120))});
  room.on('fx',m=>{const d=m.data||{},ok=v=>typeof v==='number'&&isFinite(v)&&Math.abs(v)<1e5;if(!ok(d.x)||!ok(d.z))return;
   if(d.t==='fell')remoteFell(d.x,d.z);else if(d.t==='fire'){RM={x:d.x,z:d.z};try{makeFire()}finally{RM=null}}else if(d.t==='cabin'&&ok(d.yaw)){RM={x:d.x,z:d.z,yaw:d.yaw};try{build_()}finally{RM=null}}});
  room.onPeers(c=>{$('mpcount').textContent='Online: '+c.peers.length+' · Sala '+code});
  $('mpcount').style.display='block';$('cht').style.display='flex';start()}
 function on_(m){
  if(m.t==='joined'){code=m.code;window._t0=m.t0;for(const k in rem)delete rem[k];for(const p of m.peers||[])setP(p.id,p.p||{});begin();fire();st('Sala '+code+': conectado.')}
  else if(m.t==='p'&&m.d&&typeof m.f==='string'){setP(m.f,m.d);fire()}
  else if(m.t==='out'){delete rem[m.id];fire()}
  else if(m.t==='e'&&typeof m.k==='string'){for(const h of(hnd[m.k]||[])){try{h({topic:m.k,data:m.d,isMe:false,peer:m.f,kind:'viewer'})}catch(e){}}}
  else if(m.t==='err'){st(m.e);if(begun)say(m.e)}
  else if(m.t==='list'){const L=$('svl');L.innerHTML='';for(const r of m.rooms||[]){const b=document.createElement('button');b.className='b';b.textContent='Sala de '+String(r.host||'?').slice(0,16)+' ('+r.n+'/8)';b.onclick=()=>connect({t:'join',code:r.code,name:nm()});L.appendChild(b)}if(!L.children.length)L.textContent='Nenhuma sala pública agora.'}}
 function connect(first){if(MPon&&!begun){st('Você já está em um mundo.');return}if(begun&&first.t!=='join'){return}
  if(ws&&ws.readyState===1){tx(first);return}
  st('Conectando ao servidor...');let opened=false;try{ws=new WebSocket(SURL)}catch(e){st(noSv);return}
  ws.onopen=()=>{opened=true;tries=0;tx(first)};
  ws.onmessage=e=>{let m;try{m=JSON.parse(e.data)}catch(x){return}on_(m)};
  ws.onerror=()=>{};
  ws.onclose=()=>{ws=null;if(!opened&&!begun){st(noSv);return}if(begun&&code&&tries<6){tries++;say('Conexão perdida. Reconectando...');setTimeout(()=>connect({t:'join',code,name:MPname}),2000*tries)}else if(begun)say('Desconectado do servidor')}}
 $('svmk').onclick=()=>connect({t:'create',name:nm(),pub:$('svpub').checked});
 $('svjn').onclick=()=>{const c=($('svin').value||'').toUpperCase().replace(/[^A-Z0-9]/g,'');if(c)connect({t:'join',code:c,name:nm()})};
 $('svls').onclick=()=>connect({t:'list'});
 $('mpsv').onclick=()=>showSec('sv');
})();
$('bmp').onclick=()=>showSec('mp');$('bch').onclick=()=>showSec('ch');let LB=null,lbT=0,lbOn=false;
async function lobby(){if(LB)return LB;if(typeof claude==='undefined')throw 0;const r=await claude.use('room');if(!r)throw 0;LB=r;return LB}
function lbRender(){const L=$('mpl');if(!LB||MPon)return;L.innerHTML='';let n=0;for(const p of LB.peers()){const d=p.presence||{};if(p.isMe||p.kind!=='viewer'||!d.host||!d.w)continue;n++;const b=document.createElement('button');b.className='b';b.textContent='Entrar no mundo de '+String(d.n||'?').slice(0,16);b.onclick=()=>{$('mpc').value=String(d.w).slice(0,30);clearInterval(lbT);mpJoin().then(()=>{if(MPr)start()})};L.appendChild(b)}if(!n)L.textContent='Nenhum mundo aberto agora. Peça para seu amigo criar um e toque de novo.'}
const noMP='Multijogador indisponível: abra o link compartilhado, logado na sua conta.';
$('mpgo').onclick=async()=>{const st=$('mpst');if(MPon){st.textContent='Você já está em um mundo.';return}
 $('mpc').value='w'+Math.floor(Date.now()/1000).toString(36);const code=$('mpc').value,name=($('mpn').value||'Sobrevivente').slice(0,16);
 await mpJoin();if(!MPr)return;
 try{const l=await lobby();l.presence({n:name,w:code,host:1}).catch(()=>{});st.textContent='Seu mundo está aberto! Seu amigo já pode entrar.';start()}catch(e){st.textContent=noMP}};
$('mpfind').onclick=async()=>{const st=$('mpst');if(MPon){st.textContent='Você já está em um mundo.';return}st.textContent='Procurando mundos...';
 try{const l=await lobby();if(!lbOn){lbOn=true;l.onPeers(lbRender,e=>{window._lbe=e.code})}
 const info=()=>{if(window._lbe)return 'Servidor recusou a conexão ('+window._lbe+'). Quem entra precisa estar logado no Claude e ter acesso à página (menu Compartilhar).';if(!l.connected())return 'Conectando ao servidor...';return 'Servidor conectado ✓ — '+l.peers().filter(p=>p.kind==='viewer').length+' jogador(es) online. Mundos abertos:'};
 clearInterval(lbT);lbT=setInterval(()=>{lbRender();st.textContent=info()},1500);lbRender();st.textContent=info()}catch(e){st.textContent=noMP}};
$('mpauto').onclick=async()=>{const st=$('mpst');if(MPon){st.textContent='Você já está em um mundo.';return}st.textContent='Procurando mundo aberto...';
 try{const l=await lobby();if(!lbOn){lbOn=true;l.onPeers(lbRender,e=>{window._lbe=e.code})}
  for(let i=0;i<8;i++){await new Promise(r=>setTimeout(r,500));if(window._lbe){st.textContent='Servidor recusou a conexão ('+window._lbe+'). Quem entra precisa estar logado no Claude e ter acesso à página (menu Compartilhar).';return}}
  const h=l.peers().find(p=>!p.isMe&&p.kind==='viewer'&&p.presence&&p.presence.host&&p.presence.w);
  if(h){st.textContent='Entrando no mundo de '+String(h.presence.n||'amigo').slice(0,16)+'...';$('mpc').value=String(h.presence.w).slice(0,30);await mpJoin();if(MPr)start()}
  else{st.textContent='Nenhum mundo aberto. Criando o seu...';$('mpgo').onclick()}}catch(e){st.textContent=noMP}};
$('mpcj').onclick=()=>{const c=($('mpcode').value||'').toLowerCase().replace(/[^a-z0-9]/g,'');if(!c)return;$('mpc').value='w'+c;mpJoin().then(()=>{if(MPr)start()})};
// ---------- mundo ----------
let spawn=new THREE.Vector3(),terrain;
function build(){
 const _R=Math.random;Math.random=mkRand(seedFor(CEN));const pre=new Set(scene.children),OX=CEN?Math.round(CEN.x/5)*5:0,OZ=CEN?Math.round(CEN.z/5)*5:0;const S=1500,N=420,g=new THREE.PlaneGeometry(S,S,N,N).rotateX(-Math.PI/2);const p=g.attributes.position;
 for(let i=0;i<p.count;i++)p.setY(i,H(p.getX(i)+OX,p.getZ(i)+OZ));
 g.computeVertexNormals();const nm=g.attributes.normal,col=new Float32Array(p.count*3);
 for(let i=0;i<p.count;i++){const h=p.getY(i),ny=nm.getY(i),v=.85+hs(p.getX(i)*.3,p.getZ(i)*.3)*.3;let c;
  if(h<1.3)c=[.72,.65,.46];else c=[.26*v,.33*v,.11*v];
  if(h>=1.3&&h<3)c=c.map((x,k)=>x+([.72,.65,.46][k]-x)*(1-(h-1.3)/1.7));
  if(ny<.72||h>70){const k=Math.min(1,Math.max((.72-ny)*4,(h-70)/50,0));const r=.4;c=c.map((x,j)=>x+(r-x)*k)}
  if(h>120){const k=Math.min(1,(h-120)/30);c=c.map(x=>x+(.95-x)*k)}
  col.set(c,i*3)}
 g.setAttribute('color',new THREE.BufferAttribute(col,3));
 const pt=pebbleTex();pt[0].repeat.set(300,300);pt[1].repeat.set(300,300);const tmat=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.95,map:pt[0],bumpMap:pt[1],bumpScale:.6});detail(tmat);terrain=new THREE.Mesh(g,tmat);terrain.position.set(OX,0,OZ);
 terrain.receiveShadow=true;terrain.castShadow=true;scene.add(terrain);
 const aa=(set.time-6)/24*Math.PI*2,sl=Math.hypot(Math.cos(aa)*.85,.35),SX=Math.cos(aa)*.85/sl,SZ=.35/sl;let best=1e9;if(CEN)spawn.set(CEN.x,0,CEN.z);else for(let x=-200;x<=200;x+=4)for(let z=-200;z<=200;z+=4){const h=H(x,z);
  if(h>6&&h<40&&Math.abs(H(x+4,z)-h)<4&&H(x+SX*140,z+SZ*140)<-1){let los=1;for(let u=30;u<=500;u+=30)if(H(x+SX*u,z+SZ*u)>h+1.7+u*Math.sin(aa)/sl*.9){los=0;break}const d=Math.hypot(x,z)+(los?0:1000);if(d<best){best=d;spawn.set(x,h,z)}}}
 // pinheiros
 const parts=[];const add=(geo,y,c)=>{parts.push([geo.translate(0,y,0),c])};
 add(new THREE.CylinderGeometry(.25,.4,3.6,6),1.8,[.25,.16,.09]);
 for(let k=0;k<12;k++){const R=3.6*Math.pow(1-k/12.5,.9)+.2,gc=new THREE.ConeGeometry(R,3.4,12,1,true),q=gc.attributes.position;
  for(let i=0;i<q.count;i++){const x=q.getX(i),z=q.getZ(i),y=q.getY(i);if(y<0){const a=Math.atan2(z,x),f=1+.2*Math.sin(a*3+k*1.7)+.4*(Math.abs(Math.sin(a*5+k*2.3))-.5);q.setXYZ(i,x*f,y-.5*f,z*f)}}
  add(gc,4+k*1.3,[.06+k*.004,.17+k*.011,.065+k*.002])}
 const P=[],Nn=[],C=[],UV=[];for(const[gg,c]of parts){const q=gg.toNonIndexed();for(const v of q.attributes.position.array)P.push(v);for(const v of q.attributes.normal.array)Nn.push(v);for(const v of q.attributes.uv.array)UV.push(v);for(let i=0;i<q.attributes.position.count;i++)C.push(...c)}
 const tg=new THREE.BufferGeometry();tg.setAttribute('position',new THREE.Float32BufferAttribute(P,3));tg.setAttribute('normal',new THREE.Float32BufferAttribute(Nn,3));tg.setAttribute('color',new THREE.Float32BufferAttribute(C,3));tg.setAttribute('uv',new THREE.Float32BufferAttribute(UV,2));
 const tm=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.9,side:THREE.DoubleSide,map:mkTex(3,3)});sway(tm,.0011);
 const T=new THREE.InstancedMesh(tg,tm,5000),o=new THREE.Object3D();let n=0;
 for(let i=0;i<30000&&n<5000;i++){const L=i%3?360:1100,x=spawn.x+(Math.random()-.5)*L,z=spawn.z+(Math.random()-.5)*L,h=H(x,z);
  if(h<2||h>75||Math.abs(H(x+2,z)-h)+Math.abs(H(x,z+2)-h)>2.6||fbm(x*.02,z*.02,2)<.36)continue;
  const s=.8+Math.random()*.9;o.position.set(x,h-.3,z);o.rotation.y=Math.random()*6.3;o.scale.set(s,s*(.9+Math.random()*.3),s);o.updateMatrix();T.setMatrixAt(n++,o.matrix)}
 T.count=n;T.castShadow=true;T.receiveShadow=true;scene.add(T);
 // grama
 const gm=new THREE.MeshStandardMaterial({vertexColors:true,side:THREE.DoubleSide,roughness:1});sway(gm,.2,1);
 const G=new THREE.InstancedMesh(tuft(7,.35,.8,.07,.6,[.08,.16,.04],[.5,.62,.2]),gm,12000);let m=0;const cc=new THREE.Color();
 for(let i=0;i<80000&&m<12000;i++){const a=Math.random()*6.283,r=Math.sqrt(Math.random())*90,x=spawn.x+Math.cos(a)*r,z=spawn.z+Math.sin(a)*r,h=H(x,z);
  if(h<1.5||h>30||Math.abs(H(x+1,z)-h)>.8)continue;
  o.position.set(x,h-.05,z);o.rotation.set(0,Math.random()*3.14,0);o.scale.set(1.2,.7+Math.random()*.7,1.2);o.updateMatrix();G.setMatrixAt(m,o.matrix);
  G.setColorAt(m++,cc.setRGB(.8+Math.random()*.4,.8+Math.random()*.4,.8+Math.random()*.3))}
 G.count=m;scene.add(G);
 const wm=new THREE.MeshStandardMaterial({vertexColors:true,side:THREE.DoubleSide,roughness:1});sway(wm,.2,1);
 const scat=(M,mx,ok)=>{let c=0;for(let i=0;i<mx*10&&c<mx;i++){const a=Math.random()*6.283,r=Math.sqrt(Math.random())*90,x=spawn.x+Math.cos(a)*r,z=spawn.z+Math.sin(a)*r,h=H(x,z);if(h<1.8||h>28||Math.abs(H(x+1,z)-h)>.9||!ok(x,z))continue;o.position.set(x,h-.05,z);o.rotation.set(0,Math.random()*6.3,0);const s=.8+Math.random()*.6;o.scale.set(s,s,s);o.updateMatrix();M.setMatrixAt(c,o.matrix);M.setColorAt(c++,cc.setRGB(.85+Math.random()*.3,.85+Math.random()*.3,.85+Math.random()*.2))}M.count=c;scene.add(M);return c};
 const W=new THREE.InstancedMesh(tuft(6,.9,1.35,.05,.3,[.35,.3,.12],[.88,.72,.3],0,true),wm,1400),w=scat(W,1400,(x,z)=>fbm(x*.03+7,z*.03,2)>.52);
 const V=new THREE.InstancedMesh(tuft(4,.3,.65,.2,.7,[.08,.2,.05],[.3,.5,.12]),wm,1500),v=scat(V,1500,()=>true);
 const mg=ps=>{const P=[],N=[],C=[],V=[];for(const[gg,c]of ps){const q=gg.index?gg.toNonIndexed():gg;for(const v of q.attributes.position.array)P.push(v);for(const v of q.attributes.normal.array)N.push(v);for(const v of q.attributes.uv.array)V.push(v);for(let i=0;i<q.attributes.position.count;i++)C.push(...c)}
  const r=new THREE.BufferGeometry();r.setAttribute('position',new THREE.Float32BufferAttribute(P,3));r.setAttribute('normal',new THREE.Float32BufferAttribute(N,3));r.setAttribute('color',new THREE.Float32BufferAttribute(C,3));r.setAttribute('uv',new THREE.Float32BufferAttribute(V,2));return r};
 // cerejeiras
 const cpar=[[new THREE.CylinderGeometry(.3,.5,4.5,7).translate(0,2.25,0),[.2,.12,.09]]];
 for(const[dx,dy,dz,r]of[[0,6,0,2.8],[1.8,5.2,.6,2.1],[-1.7,5.4,-.8,2.2],[.4,7.4,.8,2],[.3,5,-1.9,1.9]]){const s=new THREE.IcosahedronGeometry(r,2),q=s.attributes.position;
  for(let i=0;i<q.count;i++){const f=1+.22*Math.sin(q.getX(i)*2.1+q.getY(i)*1.7)*Math.cos(q.getZ(i)*2.3);q.setXYZ(i,q.getX(i)*f,q.getY(i)*f,q.getZ(i)*f)}
  s.translate(dx,dy,dz);cpar.push([s,[1,.62,.78]])}
 const cm=new THREE.MeshStandardMaterial({vertexColors:true,roughness:.85,map:mkTex(2,2)});sway(cm,.003);
 const CH=new THREE.InstancedMesh(mg(cpar),cm,260);let c2=0;
 for(let i=0;i<6000&&c2<260;i++){const x=spawn.x+(Math.random()-.5)*280,z=spawn.z+(Math.random()-.5)*280,h=H(x,z);
  if(h<2||h>16||Math.abs(H(x+2,z)-h)+Math.abs(H(x,z+2)-h)>2||fbm(x*.015+30,z*.015,2)<.5)continue;
  const s=.9+Math.random()*.6;o.position.set(x,h-.2,z);o.rotation.set(0,Math.random()*6.3,0);o.scale.set(s,s,s);o.updateMatrix();CH.setMatrixAt(c2++,o.matrix)}
 CH.count=c2;CH.castShadow=true;CH.receiveShadow=true;scene.add(CH);
 // flores
 const fm=new THREE.MeshStandardMaterial({roughness:.7});sway(fm,.5);
 const F=new THREE.InstancedMesh(new THREE.SphereGeometry(.09,6,4).translate(0,.42,0),fm,3500);let f=0;const pal=[[1,.5,.7],[1,.85,.2],[.95,.95,.95],[.7,.5,1]];
 for(let i=0;i<9000&&f<3500;i++){const a=Math.random()*6.283,r=Math.sqrt(Math.random())*100,x=spawn.x+Math.cos(a)*r,z=spawn.z+Math.sin(a)*r,h=H(x,z);
  if(h<1.6||h>22)continue;o.position.set(x,h,z);o.rotation.set(0,0,0);o.scale.setScalar(.8+Math.random()*.8);o.updateMatrix();F.setMatrixAt(f,o.matrix);F.setColorAt(f++,cc.setRGB(...pal[i%4]))}
 F.count=f;scene.add(F);
 // arbustos
 const bm=new THREE.MeshStandardMaterial({vertexColors:true,side:THREE.DoubleSide,roughness:.8,map:leafTex()});sway(bm,.012);
 const B=new THREE.InstancedMesh(bushGeo(),bm,380);let b=0;
 for(let i=0;i<4000&&b<380;i++){const x=spawn.x+(Math.random()-.5)*260,z=spawn.z+(Math.random()-.5)*260,h=H(x,z);
  if(h<2||h>24||Math.abs(H(x+2,z)-h)>1.2)continue;const s=.6+Math.random()*1.1;o.position.set(x,h-.1,z);o.rotation.set(0,Math.random()*6.3,0);o.scale.set(s,s,s);o.updateMatrix();B.setMatrixAt(b,o.matrix);B.setColorAt(b++,cc.setRGB(.85+Math.random()*.3,.85+Math.random()*.3,.85+Math.random()*.2))}
 B.count=b;B.castShadow=true;B.receiveShadow=true;scene.add(B);
 // pedras
 const rg=rockGeo(1),rq=rg.attributes.position;
 for(let i=0;i<rq.count;i++){const x=rq.getX(i),y=rq.getY(i),z=rq.getZ(i),f=1;rq.setXYZ(i,x*f,y*f,z*f)}
 
 const rt=rockTex();const rm=new THREE.MeshStandardMaterial({roughness:.9,map:rt[0],bumpMap:rt[1],bumpScale:.8});
 const R=new THREE.InstancedMesh(rg,rm,420);let rn=0;
 for(let i=0;i<4000&&rn<420;i++){const big=rn<14,a=Math.random()*6.283,r=big?6+Math.random()*30:10+Math.sqrt(Math.random())*200,x=spawn.x+Math.cos(a)*r,z=spawn.z+Math.sin(a)*r,h=H(x,z);
  if(h<1.2)continue;const s=big?3+Math.random()*3:.4+Math.random()*1.8;o.position.set(x,h+s*.05,z);o.rotation.set((Math.random()-.5)*.4,Math.random()*6.3,(Math.random()-.5)*.4);o.scale.set(s*(1+Math.random()*.8),s*(.5+Math.random()*.6),s*(.9+Math.random()*.6));o.updateMatrix();R.setMatrixAt(rn,o.matrix);R.setColorAt(rn++,cc.setRGB(.9+Math.random()*.3,.9+Math.random()*.25,.85+Math.random()*.2))}
 R.count=rn;R.castShadow=true;R.receiveShadow=true;scene.add(R);
 window.Q={T,G,F,B,CH,n,m,f,b,c2,W,V,w,v,R,rn};T.userData.tree=4;CH.userData.tree=3;addCol(T,n,.55);addCol(CH,c2,.55);addCol(B,b,1.05);addCol(R,rn,.6);makeFish();worldObjs=scene.children.filter(c=>!pre.has(c));CEN={x:spawn.x,z:spawn.z};Math.random=_R;
}
// ---------- hora, luz, atmosfera ----------
const ss=(a,b,x)=>{x=Math.min(1,Math.max(0,(x-a)/(b-a)));return x*x*(3-2*x)};
const mx=(a,b,t)=>a.map((v,i)=>v+(b[i]-v)*t);
const set={time:17.0,auto:true,wind:1.2,fov:72};
function applyTime(){
 const a=(set.time-6)/24*Math.PI*2;const sd=skyU.sd.value.set(Math.cos(a)*.85,Math.sin(a),.35).normalize();const e=sd.y;
 const hor=e<0?mx([.02,.03,.07],[1,.5,.25],ss(-.25,0,e)):mx([1,.5,.25],[.68,.8,.92],ss(0,.45,e));
 const top=e<0?mx([.01,.02,.05],[.25,.3,.5],ss(-.25,0,e)):mx([.25,.3,.5],[.2,.45,.85],ss(0,.5,e));
 const sc=mx([1,.52,.22],[1,.95,.86],ss(0,.55,e));const day=ss(-.05,.3,e);
 skyU.hor.value.set(...hor);skyU.top.value.set(...top);skyU.sc.value.set(...sc);skyU.night.value=1-ss(-.2,.05,e);skyU.lum.value=.12+.88*day;
 sun.color.setRGB(...sc);sun.intensity=2.3*day;hemi.intensity=.3+.8*day;
 hemi.color.setRGB(top[0]+.1,top[1]+.1,top[2]+.1);hemi.groundColor.setRGB(.45*day+.04,.34*day+.04,.2*day+.03);
 const fd=.0015+.0014*(1-ss(0,.4,e));scene.fog.density=fd;wU.fogD.value=fd;scene.fog.color.setRGB(...hor);wU.fogC.value.set(...hor);
 const pt=player.pos;sun.position.copy(pt).addScaledVector(sd,250);sun.target.position.copy(pt);sun.visible=day>.01;
 sky.position.copy(cam.position);
}
// ---------- jogador e controles ----------
const player={pos:new THREE.Vector3(),yaw:0,pitch:0,vy:0,ground:true,eye:0};
let mode='menu',jumpReq=false;const keys={};
let jv=[0,0],jid=null,jc=[0,0],lid=null,lp=[0,0];
function start(){audioInit();mode='play';$('menu').style.display='none';$('hud').style.display='block';
 if(isTouch)$('touch').style.display='block';else $('c').requestPointerLock?.()}
function pause(){mode='menu';$('hud').style.display='none';$('touch').style.display='none';$('menu').style.display='flex';$('play').textContent='Continuar';showSec(null)}
function showSec(id){$('home').style.display=id?'none':'block';['set','ctl','mp','ch','p2','sv'].forEach(s=>$(s).style.display=s===id?'block':'none')}
$('play').onclick=()=>{if(introDone)start();else $('intro').style.display='flex'};$('bset').onclick=()=>showSec('set');$('bctl').onclick=()=>showSec('ctl');
document.querySelectorAll('[data-back]').forEach(b=>b.onclick=()=>showSec(null));
$('sTime').oninput=e=>{set.time=+e.target.value};$('sAuto').onchange=e=>set.auto=e.target.checked;$('sVol').oninput=e=>{vol=+e.target.value;if(AC)master.gain.value=vol};$('sQ').onchange=e=>{const k=+e.target.value;for(const[a,c]of[['T','n'],['G','m'],['F','f'],['B','b'],['CH','c2'],['W','w'],['V','v'],['R','rn']])Q[a].count=Math.floor(Q[c]*k);for(const l of Object.values(cg))for(const c of l)if(c.M&&!c.felled)c.r=c.i>=c.M.count?0:c.r0};
$('sWind').oninput=e=>{set.wind=+e.target.value;U.uW.value=set.wind};
$('sFov').oninput=e=>{cam.fov=+e.target.value;cam.updateProjectionMatrix()};
$('sSh').onchange=e=>{const v=+e.target.value;sun.castShadow=v>0;if(v){sun.shadow.mapSize.set(v,v);sun.shadow.map?.dispose();sun.shadow.map=null}scene.traverse(o=>{if(o.material)o.material.needsUpdate=true})};
addEventListener('keydown',e=>{keys[e.code]=true;if(e.code==='Space'&&mode==='play'){jumpReq=true;e.preventDefault()}});
addEventListener('keyup',e=>keys[e.code]=false);
document.addEventListener('pointerlockchange',()=>{if(!document.pointerLockElement&&mode==='play'&&!isTouch&&!chatting)pause()});
addEventListener('mousemove',e=>{if(mode==='play'&&document.pointerLockElement){player.yaw-=e.movementX*.0022;player.pitch=Math.max(-1.5,Math.min(1.5,player.pitch-e.movementY*.0022))}});
addEventListener('touchstart',e=>{if(mode!=='play')return;e.preventDefault();for(const t of e.changedTouches){
 const el=document.elementFromPoint(t.clientX,t.clientY);
 if(el&&el.id==='jump'){jumpReq=true;continue}if(el&&el.id==='act'){chop();continue}if(el&&el.id==='bld'){build_();continue}if(el&&el.id==='slp'){sleep();continue}if(el&&el.id==='use'){useAct();continue}if(el&&el.id==='cht'){openChat();continue}if(el&&el.id==='fir'){makeFire();continue}if(el&&el.id==='pause'){pause();continue}
 if(t.clientX<innerWidth*.45&&jid===null){jid=t.identifier;jc=[t.clientX,t.clientY];const s=$('stick');s.style.display='block';s.style.left=jc[0]+'px';s.style.top=jc[1]+'px'}
 else if(lid===null){lid=t.identifier;lp=[t.clientX,t.clientY]}}},{passive:false});
addEventListener('touchmove',e=>{if(mode!=='play')return;e.preventDefault();for(const t of e.changedTouches){
 if(t.identifier===jid){let dx=t.clientX-jc[0],dy=t.clientY-jc[1];const l=Math.hypot(dx,dy),k=l>55?55/l:1;dx*=k;dy*=k;jv=[dx/55,dy/55];$('knob').style.transform=`translate(${dx*.6}px,${dy*.6}px)`}
 else if(t.identifier===lid){player.yaw-=(t.clientX-lp[0])*.005;player.pitch=Math.max(-1.5,Math.min(1.5,player.pitch-(t.clientY-lp[1])*.005));lp=[t.clientX,t.clientY]}}},{passive:false});
addEventListener('touchend',e=>{for(const t of e.changedTouches){if(t.identifier===jid){jid=null;jv=[0,0];$('stick').style.display='none';$('knob').style.transform=''}if(t.identifier===lid)lid=null}});
addEventListener('touchcancel',()=>{jid=lid=null;jv=[0,0];$('stick').style.display='none'});
function resize(){renderer.setSize(innerWidth,innerHeight,false);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()}
addEventListener('resize',resize);resize();
// ---------- loop ----------
let last=performance.now(),T=0;
function frame(now){requestAnimationFrame(frame);const dt=Math.min(.05,(now-last)/1000);last=now;T+=dt;
 U.uT.value=T;U.uP.value.set(player.pos.x,0,player.pos.z);wU.t.value=T;skyU.t.value=T;
 if(MPon&&mode==='play'){set.time=(7+(Date.now()/1000-(window._t0||0))*.0133)%24;$('sTime').value=set.time}else if(set.auto&&mode==='play'){set.time=(set.time+dt*.0133)%24;$('sTime').value=set.time}
 const P=player;
 if(mode==='play'){
  let f=(keys.KeyW||keys.ArrowUp?1:0)-(keys.KeyS||keys.ArrowDown?1:0),r=(keys.KeyD||keys.ArrowRight?1:0)-(keys.KeyA||keys.ArrowLeft?1:0);
  f-=jv[1];r+=jv[0];const l=Math.hypot(f,r);if(l>1){f/=l;r/=l}
  const gh=H(P.pos.x,P.pos.z),swim=gh<-1;
  const sp=(keys.ShiftLeft||keys.ShiftRight||Math.hypot(jv[0],jv[1])>.92?9:5)*(swim?.55:1);
  P.pos.x+=(-Math.sin(P.yaw)*f+Math.cos(P.yaw)*r)*sp*dt;P.pos.z+=(-Math.cos(P.yaw)*f-Math.sin(P.yaw)*r)*sp*dt;
  push(P.pos);const g2=groundAt(P.pos.x,P.pos.z);
  const jr=jumpReq;if(jr&&P.ground&&g2<-1===false){P.vy=8;P.ground=false}jumpReq=false;
  if(g2<-1){const dv=f*Math.sin(P.pitch)*3;P.vy+=((dv<-.3?dv:(.45-P.eye)*5)-P.vy)*Math.min(1,dt*4);if(jr)P.vy=3;P.eye=Math.max(g2+.4,Math.min(.5,P.eye+P.vy*dt));P.ground=false}else{P.vy-=25*dt;P.eye+=P.vy*dt}
  const floor=g2<-1?-99:g2+1.7;
  if(P.eye<=floor){P.eye=floor;P.vy=0;P.ground=true}
 }else{P.yaw+=dt*.012;P.pitch=-.05;const gh=H(P.pos.x,P.pos.z);P.eye=Math.max(gh+7,P.eye)}
 cam.position.set(P.pos.x,P.eye,P.pos.z);cam.rotation.set(P.pitch,P.yaw,0);
 axeAnim(dt);try{tpUpdate(dt)}catch(e){}
 if(hudT>0){hudT-=dt;if(hudT<=0)$('wood').style.opacity=0}
 water.position.set(cam.position.x,0,cam.position.z);
 applyTime();try{birdsUpdate(dt);fishUpdate(dt);audioUpdate(dt);rays_();envUpdate(dt);survUpdate(dt);endUpdate(dt);mpUpdate(dt)}catch(e){}renderer.render(scene,cam)}
setTimeout(()=>{build();if(!spawn.y)spawn.y=H(spawn.x,spawn.z);player.pos.copy(spawn);player.eye=spawn.y+1.7;{const a=(set.time-6)/24*Math.PI*2;player.yaw=Math.atan2(-Math.cos(a)*.85,-.35)}
 {const _r=Math.random;Math.random=mkRand(seedFor(null)+7);placePieces();Math.random=_r}if(isTouch){$('sQ').value='.6';$('sQ').onchange({target:$('sQ')})}$('load').style.display='none';$('menu').style.display='flex';requestAnimationFrame(frame)},60);
</script>
</body>
</html>








