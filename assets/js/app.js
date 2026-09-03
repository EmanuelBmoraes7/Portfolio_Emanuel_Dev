/* ============================================================================
 * NEON GRID — Portfólio de Emanuel Borges Moraes
 * Script principal (JavaScript vanilla, ES6+)
 * ----------------------------------------------------------------------------
 * Organização:
 *   1. Constantes e paleta            — cores, WhatsApp, helper esc()
 *   2. i18n                           — dicionário EN/PT e função t()
 *   3. Dados                          — SKILLS, PROJECTS, JOURNEY, CERTS
 *   4. Boot & fundo                   — sequência de boot, Matrix, cursor
 *   5. Render                         — monta seções a partir dos dados
 *   6. Interações                     — modal, contato, navegação, idioma
 *   7. Three.js                       — holograma WebGL do hero
 *
 * Para atualizar conteúdo, edite os objetos da seção 3 (Dados).
 * ========================================================================== */

const C={cyan:"#38bdf8",magenta:"#2563eb",purple:"#3b82f6",lime:"#22d3ee",pink:"#1e6fff",dim:"#5f7a86",muted:"#8aacb8"};
const WHATSAPP="5563999570506";
const esc=s=>(s||"").replace(/[<>&]/g,m=>({"<":"&lt;",">":"&gt;","&":"&amp;"}[m]));

/* ============ i18n ============ */
const I18N={
  en:{
    enter:"⛧ ENTER THE GRID ⛧",status:"SYSTEM ONLINE · PALMAS_TO // BR",
    nav_home:"HOME",nav_about:"ABOUT",nav_projects:"PROJECTS",nav_journey:"JOURNEY",nav_certs:"CERTS",nav_contact:"CONTACT",
    cta_projects:"View Projects",cta_cv:"⬇ Download CV",cta_contact:"Contact",
    m_projects:"PROJECTS",m_certs:"CERTIFICATIONS",m_grad:"GRADUATION",
    ab_eyebrow:"01 · About",ab_title:'Complex problems into <span class="a">clean</span>, <span class="b">tested</span> code.',
    ab_p1:"I'm a Software Engineering student and <b>Development Intern at ATI</b> (State of Tocantins IT Agency), where I build <b>REST APIs with FastAPI</b> and Python automations over public data at state scale.",
    ab_p2:"I work with <b>PostgreSQL, Docker and automated tests (BDD/TDD)</b> integrated into CI/CD, plus applied data structures — binary trees, simulations and recommendation systems. I turn complex problems into <b>readable, tested and maintainable code</b>.",
    pr_eyebrow:"02 · Mission archive",pr_title:'Featured <span class="a">projects</span>.',
    pr_lead:"REST APIs, data automation and applied data structures. Click any card for the full dossier.",
    jr_eyebrow:"03 · Journey",jr_title:'Experience & <span class="b">Education</span>.',
    ce_eyebrow:"04 · Credentials",ce_title:"Certifications.",
    co_eyebrow:"05 · Transmission",co_title:'Let\'s <span class="a">connect</span>.',
    co_lead:"Open to internships, projects and collaborations. Send a message straight to my WhatsApp.",
    co_send:"Send via WhatsApp →",ph_name:"Your name",ph_msg:"Your message...",
    foot_by:"Developed by",foot_hint:"psst — try",coding:"coding",
    filt_all:"All",
    live:"● LIVE",open_dossier:"> open dossier",view_live:"View live ↗",view_repo:"Code on GitHub ↗",private_repo:"Private repository",
    st_available:"Available"
  },
  pt:{
    enter:"⛧ ENTRAR NA GRID ⛧",status:"SISTEMA ONLINE · PALMAS_TO // BR",
    nav_home:"INÍCIO",nav_about:"SOBRE",nav_projects:"PROJETOS",nav_journey:"TRAJETÓRIA",nav_certs:"CERTIFICAÇÕES",nav_contact:"CONTATO",
    cta_projects:"Ver Projetos",cta_cv:"⬇ Baixar CV",cta_contact:"Contato",
    m_projects:"PROJETOS",m_certs:"CERTIFICAÇÕES",m_grad:"FORMATURA",
    ab_eyebrow:"01 · Sobre",ab_title:'Problemas complexos em código <span class="a">limpo</span> e <span class="b">testado</span>.',
    ab_p1:"Sou estudante de Engenharia de Software e <b>estagiário de desenvolvimento na ATI</b> (Agência de Tecnologia da Informação do Tocantins), onde construo <b>APIs REST em FastAPI</b> e automações em Python sobre dados públicos em escala estadual.",
    ab_p2:"Trabalho com <b>PostgreSQL, Docker e testes automatizados (BDD/TDD)</b> integrados a CI/CD, além de estruturas de dados aplicadas — árvores binárias, simulações e sistemas de recomendação. Transformo problemas complexos em <b>código legível, testado e fácil de manter</b>.",
    pr_eyebrow:"02 · Arquivo de missões",pr_title:'Projetos em <span class="a">destaque</span>.',
    pr_lead:"APIs REST, automação de dados e estruturas de dados aplicadas. Clique num card para o dossiê completo.",
    jr_eyebrow:"03 · Trajetória",jr_title:'Experiência & <span class="b">Educação</span>.',
    ce_eyebrow:"04 · Credenciais",ce_title:"Certificações.",
    co_eyebrow:"05 · Transmissão",co_title:'Vamos <span class="a">conectar</span>.',
    co_lead:"Aberto a estágios, projetos e colaborações. Envie uma mensagem direto pro meu WhatsApp.",
    co_send:"Enviar via WhatsApp →",ph_name:"Seu nome",ph_msg:"Sua mensagem...",
    foot_by:"Desenvolvido por",foot_hint:"psst — experimente",coding:"codando",
    filt_all:"Todos",
    live:"● LIVE",open_dossier:"> abrir dossiê",view_live:"Ver ao vivo ↗",view_repo:"Código no GitHub ↗",private_repo:"Repositório privado",
    st_available:"Disponível"
  }
};
let LANG="en";
function t(k){return (I18N[LANG][k]!==undefined?I18N[LANG][k]:I18N.en[k])||k;}

/* ============ DADOS ============ */
const SKILLS=["Python","FastAPI","PostgreSQL","Docker","AWS","REST APIs","Pydantic","JWT","Clean Architecture","pytest / BDD","Playwright","Git & CI/CD","React","TypeScript"];

const PROJECTS=[
  {type:"Backend",accent:C.cyan,live:false,repo:"https://github.com/EmanuelBmoraes7/api-previsao-tempo",demo:null,
   stack:["FastAPI","pytest","Docker","GitHub Actions"],
   cat:{en:"Backend · API",pt:"Backend · API"},
   name:{en:"Weather Forecast API",pt:"API de Previsão do Tempo"},
   desc:{en:"REST API with layered architecture, unit test suite and a CI pipeline running tests on every push.",pt:"API REST com arquitetura em camadas, suíte de testes unitários e pipeline de CI executando os testes a cada push."},
   detail:{en:"A production-shaped weather forecast REST API built with FastAPI. Layered architecture, a unit-test suite with pytest, and a GitHub Actions pipeline that runs the tests on every push — the kind of backend that's actually maintainable.",pt:"API REST de previsão do tempo com cara de produção, feita em FastAPI. Arquitetura em camadas, suíte de testes com pytest e pipeline no GitHub Actions que roda os testes a cada push — o tipo de backend que dá pra manter de verdade."}},
  {type:"AI",accent:C.purple,live:false,repo:"https://github.com/EmanuelBmoraes7/LLMlocal_com_chat_e_FastAPI",demo:null,
   stack:["Python","FastAPI","Ollama","LLM"],
   cat:{en:"AI · LLM",pt:"IA · LLM"},
   name:{en:"Local LLM Chat",pt:"Chat com LLM Local"},
   desc:{en:"Chat app wired to a language model running locally via Ollama, with a layered backend.",pt:"App de chat integrado a um modelo de linguagem executado localmente via Ollama, com backend em camadas."},
   detail:{en:"A chat application connected to a large language model running fully locally through Ollama. Structured, layered FastAPI backend — a hands-on exploration of integrating LLMs into real applications without relying on external APIs.",pt:"Aplicação de chat conectada a um modelo de linguagem rodando 100% localmente via Ollama. Backend em FastAPI estruturado em camadas — uma exploração prática de como integrar LLMs em aplicações reais sem depender de APIs externas."}},
  {type:"Game",accent:C.magenta,live:false,private:true,repo:null,demo:null,
   stack:["Java","JGames2D","AWT/Swing","2D Game"],
   cat:{en:"Java · 2D Game (collab)",pt:"Java · Jogo 2D (colab)"},
   name:{en:"MakeMeDev",pt:"MakeMeDev"},
   desc:{en:"2D game that teaches programming, built in pure Java on the JGames2D engine. One of 2 contributors, 117+ commits.",pt:"Jogo 2D que ensina programação, feito em Java puro sobre o motor JGames2D. Um dos 2 contribuidores, 117+ commits."},
   detail:{en:"A 2D game designed to teach programming, built in pure Java (AWT/Swing) on top of the JGames2D engine. I'm one of two contributors on a repository with 117+ commits — working on scenes, game logic, level editing and the distributable jar build. Structured with a real game architecture (engine, images, sounds, tools). Private repo — code and full walkthrough available on request.",pt:"Um jogo 2D criado para ensinar programação, feito em Java puro (AWT/Swing) sobre o motor JGames2D. Sou um dos dois contribuidores em um repositório com mais de 117 commits — atuando em cenas, lógica de jogo, edição de fases e no build do jar distribuível. Estruturado com arquitetura real de jogo (motor, imagens, sons, ferramentas). Repositório privado — código e demonstração completa disponíveis mediante solicitação."}},
  {type:"Backend",accent:C.pink,live:true,repo:"https://github.com/EmanuelBmoraes7/LandingPage-da-Fiat",demo:"https://autoviasitefinal.netlify.app/",
   stack:["FastAPI","Clean Arch","Behave","NLP"],
   cat:{en:"Full-stack · Chatbot",pt:"Full-stack · Chatbot"},
   name:{en:"Fiat Dealership + Chatbot",pt:"Concessionária Fiat + Chatbot"},
   desc:{en:"Published institutional landing page + a layered conversational backend with NLP built on the standard library only, and BDD integration tests.",pt:"Landing page institucional publicada + backend conversacional em camadas, com NLP feito só com a biblioteca padrão e testes de integração em BDD."},
   detail:{en:"A real dealership project: a published institutional landing page plus a conversational backend structured in clean architecture. The NLP intent layer was built using only Python's standard library, and the whole thing is covered by BDD integration tests with Behave.",pt:"Projeto de uma concessionária real: landing page institucional publicada mais um backend conversacional estruturado em Clean Architecture. A camada de NLP foi construída usando apenas a biblioteca padrão do Python, e tudo é coberto por testes de integração em BDD com Behave."}},
  {type:"DSA",accent:C.magenta,live:false,repo:"https://github.com/EmanuelBmoraes7/Arvore-playoff-championsleague",demo:null,
   stack:["Python","Binary Tree","DSA"],
   cat:{en:"Python · Binary Tree",pt:"Python · Árvore Binária"},
   name:{en:"Champions League Bracket",pt:"Mata-Mata da Champions League"},
   desc:{en:"Knockout bracket simulator modeled with a binary tree, walking through the ties to the champion.",pt:"Simulador de chaveamento eliminatório modelado com árvore binária, percorrendo os confrontos até o campeão."},
   detail:{en:"A knockout-stage simulator where each tie is a node in a binary tree. The tree models the full bracket and the simulation traverses the matchups until it crowns a champion — a tangible way to show tree construction and traversal.",pt:"Simulador de fase eliminatória onde cada confronto é um nó de uma árvore binária. A árvore modela o chaveamento completo e a simulação percorre os confrontos até coroar um campeão — uma forma tangível de mostrar construção e travessia de árvores."}},
  {type:"DSA",accent:C.cyan,live:false,repo:"https://github.com/EmanuelBmoraes7/Lista-telefonica",demo:null,
   stack:["Python","ArrayList","DSA"],
   cat:{en:"Python · Data Structures",pt:"Python · Estruturas de Dados"},
   name:{en:"Phone Book (ArrayList)",pt:"Lista Telefônica (ArrayList)"},
   desc:{en:"Interactive phone book built on a custom ArrayList implemented from scratch in Python.",pt:"Lista telefônica interativa construída sobre uma ArrayList própria, implementada do zero em Python."},
   detail:{en:"An interactive phone book where the underlying ArrayList was implemented from scratch in Python, with dynamic resizing. Add, search, list and remove contacts — a hands-on data structures exercise.",pt:"Lista telefônica interativa onde a ArrayList por baixo foi implementada do zero em Python, com redimensionamento dinâmico. Adicionar, buscar, listar e remover contatos — um exercício prático de estruturas de dados."}},
  {type:"Backend",accent:C.purple,live:false,repo:"https://github.com/EmanuelBmoraes7/FastAPI",demo:null,
   stack:["Python","FastAPI","REST"],
   cat:{en:"Backend · Python",pt:"Backend · Python"},
   name:{en:"FastAPI Studies",pt:"Estudos com FastAPI"},
   desc:{en:"Hands-on repository exploring FastAPI: routes, validation and REST API fundamentals in Python.",pt:"Repositório prático explorando FastAPI: rotas, validação e fundamentos de APIs REST em Python."},
   detail:{en:"A study and practice repository focused on FastAPI — building routes, handling request validation and structuring REST endpoints. The foundation behind the more complete backends in this portfolio.",pt:"Repositório de estudo e prática focado em FastAPI — construção de rotas, validação de requisições e estruturação de endpoints REST. A base por trás dos backends mais completos deste portfólio."}},
  {type:"Web",accent:C.cyan,live:true,repo:"https://github.com/EmanuelBmoraes7/Projeto-Portal-de-noticias",demo:"https://emanuelbmoraes7.github.io/Projeto-Portal-de-noticias/",
   stack:["HTML","CSS","JavaScript"],
   cat:{en:"Web · Front-end",pt:"Web · Front-end"},
   name:{en:"News Portal",pt:"Portal de Notícias"},
   desc:{en:"Responsive news portal with a modern layout, published and live.",pt:"Portal de notícias responsivo com layout moderno, publicado e no ar."},
   detail:{en:"A responsive news portal with organized headlines and a modern layout. Focus on semantic structure and responsiveness across screens.",pt:"Portal de notícias responsivo com manchetes organizadas e layout moderno. Foco em estrutura semântica e responsividade em várias telas."}},
  {type:"Web",accent:C.magenta,live:true,repo:"https://github.com/EmanuelBmoraes7/Projeto-Travelgram",demo:"https://emanuelbmoraes7.github.io/Projeto-Travelgram/",
   stack:["HTML","CSS","JavaScript"],
   cat:{en:"Web · Front-end",pt:"Web · Front-end"},
   name:{en:"Travelgram",pt:"Travelgram"},
   desc:{en:"Social-style travel page with a visual feed, published and live.",pt:"Página de viagens estilo rede social com feed visual, publicada e no ar."},
   detail:{en:"A travel page inspired by social networks, with a photo feed and an attractive visual layout. A front-end and responsiveness practice project — published and live.",pt:"Página de viagens inspirada em redes sociais, com feed de fotos e layout visual atraente. Projeto de prática de front-end e responsividade — publicado e no ar."}},
  {type:"Web",accent:C.lime,live:true,repo:"https://github.com/EmanuelBmoraes7/Projeto-Pagina-de-receita",demo:"https://emanuelbmoraes7.github.io/Projeto-Pagina-de-receita/",
   stack:["HTML","CSS","JavaScript"],
   cat:{en:"Web · Front-end",pt:"Web · Front-end"},
   name:{en:"Recipe Page",pt:"Página de Receita"},
   desc:{en:"Culinary recipe page with a clean, responsive layout, published and live.",pt:"Página de receita culinária com layout limpo e responsivo, publicada e no ar."},
   detail:{en:"A responsive recipe page with an organized presentation of ingredients and preparation steps. A clean front-end layout — published and live.",pt:"Página de receita responsiva com apresentação organizada de ingredientes e modo de preparo. Layout de front-end limpo — publicada e no ar."}},
  {type:"Web",accent:C.pink,live:false,repo:"https://github.com/EmanuelBmoraes7/Formulario-de-matricula",demo:null,
   stack:["HTML","CSS"],
   cat:{en:"Web · Front-end",pt:"Web · Front-end"},
   name:{en:"Enrollment Form",pt:"Formulário de Matrícula"},
   desc:{en:"Enrollment form with organized fields, basic validation and a clean layout in HTML/CSS.",pt:"Formulário de matrícula com campos organizados, validação básica e layout limpo em HTML/CSS."},
   detail:{en:"An enrollment form with well-organized fields, basic validation and a clean visual layout. A practice project on forms and usability in front-end.",pt:"Formulário de matrícula com campos bem organizados, validação básica e layout visual limpo. Projeto de prática de formulários e usabilidade em front-end."}}
];

const LOCKED={accent:C.lime};

const JOURNEY=[
  {kind:"exp",when:{en:"May 2026 — present",pt:"mai/2026 — atual"},
   title:{en:"Systems Development Intern",pt:"Estagiário de Desenvolvimento de Sistemas"},
   org:"ATI — Agência de Tecnologia do Estado do Tocantins",
   note:{en:"Build REST APIs (FastAPI + PostgreSQL, containerized with Docker), automate manual data-collection routines in Python, and built an async Playwright crawler for Tocantins Government portals. Cleaned and enriched the CNPJ registry of all 139 municipalities in the state.",pt:"Construo APIs REST (FastAPI + PostgreSQL, containerizadas com Docker), automatizo rotinas manuais de coleta de dados em Python e criei um coletor assíncrono em Playwright para portais do Governo do Tocantins. Higienizei e enriqueci a base cadastral (CNPJ) das 139 prefeituras do estado."}},
  {kind:"edu",when:{en:"2023 — 2028",pt:"2023 — 2028"},
   title:{en:"B.Sc. Software Engineering",pt:"Bacharelado em Engenharia de Software"},
   org:"UniCatólica — Centro Universitário Católica do Tocantins",
   note:{en:"Focus on data structures, algorithms and software engineering. Graduation expected 2028.",pt:"Foco em estruturas de dados, algoritmos e engenharia de software. Conclusão prevista para 2028."}},
  {kind:"edu",when:{en:"2019 — 2022",pt:"2019 — 2022"},
   title:{en:"Environmental Technician",pt:"Técnico em Meio Ambiente"},
   org:"IFTO — Instituto Federal do Tocantins",
   note:{en:"Technical high-school diploma.",pt:"Curso técnico integrado ao ensino médio."}}
];

const CERTS=[
  {ico:"☁️",name:{en:"AWS Technical Essentials",pt:"AWS Technical Essentials"},by:"Amazon Web Services · 2026",file:"assets/certs/aws-technical-essentials.pdf"},
  {ico:"☁️",name:{en:"Introduction to AWS",pt:"Introdução à AWS"},by:"Rocketseat · 2026",file:"assets/certs/introducao-aws.pdf"},
  {ico:"⚡",name:{en:"FastAPI",pt:"FastAPI"},by:"Rocketseat · 2026",file:"assets/certs/fastapi.pdf"},
  {ico:"🧠",name:{en:"Prompt Engineering",pt:"Engenharia de Prompt"},by:"Rocketseat · 2026",file:"assets/certs/prompt-engineering.pdf"},
  {ico:"🤖",name:{en:"Generative AI from Scratch",pt:"IA Generativa do Zero"},by:"Rocketseat · 2026",file:"assets/certs/ia-generativa.pdf"},
  {ico:"🔧",name:{en:"Git & GitHub",pt:"Git e GitHub"},by:"Rocketseat · 2026",file:"assets/certs/git-github.pdf"},
  {ico:"🐍",name:{en:"Python",pt:"Python"},by:"Santander · 2026",file:"assets/certs/python-santander.pdf"},
  {ico:"🚀",name:{en:"AI Masterclass",pt:"Masterclass de IA"},by:"Rocketseat · 2026",file:"assets/certs/masterclass-ia.pdf"}
];

const ABOUT_SIDE=[
  {k:{en:"Name",pt:"Nome"},v:"Emanuel B. Moraes"},
  {k:{en:"Location",pt:"Local"},v:"Palmas — TO, BR"},
  {k:{en:"Role",pt:"Cargo"},v:{en:"Dev Intern · ATI-TO",pt:"Estagiário · ATI-TO"}},
  {k:{en:"Focus",pt:"Foco"},v:{en:"Back-end · Python · Data",pt:"Back-end · Python · Dados"}},
  {k:{en:"Degree",pt:"Formação"},v:{en:"Software Engineering",pt:"Eng. de Software"}},
  {k:{en:"Graduation",pt:"Conclusão"},v:"2028"},
  {k:{en:"English",pt:"Inglês"},v:{en:"Technical reading",pt:"Leitura técnica"}},
  {k:{en:"Status",pt:"Status"},v:{en:"Available",pt:"Disponível"},lime:true}
];

/* ============ BOOT ============ */
const BOOT=["[0.00] neon_grid kernel booting...","[0.14] loading identity: EMANUEL_B_MORAES .. OK",
"[0.41] mounting /projects ................. OK","[0.77] decrypting skill matrix ............ OK",
"[1.02] linking ATI-TO intern node ......... OK","[1.30] rendering holographic UI ........... OK"];
(function(){const el=document.getElementById("boot");if(!el)return;let i=0;
  const iv=setInterval(()=>{
    if(i<BOOT.length){const d=document.createElement("div");d.className="l";d.innerHTML=esc(BOOT[i]).replace("OK",'<span class="ok">OK</span>');el.appendChild(d);i++;}
    else{clearInterval(iv);const g=document.createElement("div");g.className="grant";g.textContent="ACCESS GRANTED";el.appendChild(g);document.getElementById("enterBtn")?.classList.remove("hidden");}
  },230);})();
document.getElementById("enterBtn")?.addEventListener("click",()=>{const g=document.getElementById("gate");if(g){g.style.opacity="0";setTimeout(()=>g.style.display="none",600);}startTyping();});

/* ============ MATRIX bg ============ */
(function(){const cv=document.getElementById("matrix");if(!cv)return;const ctx=cv.getContext("2d");
  const rs=()=>{cv.width=innerWidth;cv.height=innerHeight};rs();addEventListener("resize",rs);
  let drops=Array(Math.floor(cv.width/16)).fill(1).map(()=>Math.random()*-50);const ch="アカサ01ｦｧ<>{}#EM";
  (function d(){ctx.fillStyle="rgba(10,10,15,.13)";ctx.fillRect(0,0,cv.width,cv.height);ctx.font="14px monospace";
    drops.forEach((y,i)=>{ctx.fillStyle=Math.random()>.97?C.magenta:C.cyan;ctx.fillText(ch[Math.random()*ch.length|0],i*16,y*16);
    if(y*16>cv.height&&Math.random()>.975)drops[i]=0;drops[i]++;});requestAnimationFrame(d);})();})();

/* ============ cursor + progress ============ */
(function(){const c=document.querySelector(".cursor");if(!c)return;addEventListener("mousemove",e=>c.style.transform=`translate(${e.clientX}px,${e.clientY}px)`);})();
addEventListener("scroll",()=>{const h=document.documentElement,bar=document.getElementById("progress");if(!bar)return;const p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;bar.style.width=p+"%";});

/* ============ NAV ============ */
const nav=document.getElementById("nav"),tog=document.getElementById("navToggle"),scrim=document.getElementById("navScrim");
function toggleNav(o){nav?.classList.toggle("open",o);tog?.classList.toggle("x",o);scrim?.classList.toggle("on",o);}
if(tog)tog.onclick=()=>toggleNav(!nav.classList.contains("open"));
if(scrim)scrim.onclick=()=>toggleNav(false);
nav?.querySelectorAll("a").forEach(a=>a.onclick=()=>toggleNav(false));

/* ============ TYPING (bilingue) ============ */
const PHRASES={en:["Back-End Developer","Python · FastAPI · AWS","Data Automation Engineer","Building the Future in Neon"],
               pt:["Desenvolvedor Back-End","Python · FastAPI · AWS","Engenheiro de Automação de Dados","Construindo o Futuro em Neon"]};
let typingStarted=false;
function startTyping(){
  if(typingStarted)return;typingStarted=true;
  const el=document.getElementById("typed");if(!el)return;let p=0,i=0,del=false;
  (function tick(){
    const arr=PHRASES[LANG];const full=arr[p%arr.length];
    el.innerHTML=esc(del?full.slice(0,i--):full.slice(0,i++))+'<span class="cur">▌</span>';
    if(!del&&i>full.length){del=true;setTimeout(tick,1500);return;}
    if(del&&i<0){del=false;i=0;p++;setTimeout(tick,200);return;}
    setTimeout(tick,del?40:75);
  })();
}

/* ============ RENDER ============ */
function applyI18n(){
  document.documentElement.lang=LANG;
  document.querySelectorAll("[data-i18n]").forEach(el=>{const k=el.getAttribute("data-i18n");el.innerHTML=t(k);});
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>el.placeholder=t(el.getAttribute("data-i18n-ph")));
  renderAboutSide();renderChips();renderFilters();paint(window.__f||"__all");renderTimeline();renderCerts();
  document.querySelectorAll("#lang [data-lang]").forEach(s=>s.classList.toggle("on",s.dataset.lang===LANG));
}
function L(o){return typeof o==="object"?(o[LANG]||o.en):o;}

function renderChips(){document.getElementById("chips").innerHTML=SKILLS.map(s=>`<span class="chip sfx">${s}</span>`).join("");}
function renderAboutSide(){
  document.getElementById("about-side").innerHTML=ABOUT_SIDE.map(r=>
    `<div class="row"><span class="k">${L(r.k)}</span><span class="v" ${r.lime?'style="color:var(--lime)"':""}>${L(r.v)}</span></div>`).join("");
}
function renderFilters(){
  const types=["__all",...new Set(PROJECTS.map(p=>p.type))];
  const labels={"__all":t("filt_all"),Backend:"Backend",AI:"AI",DSA:"DSA",Web:"Web",Game:"Game"};
  document.getElementById("filters").innerHTML=types.map((c,i)=>`<button data-c="${c}" class="sfx ${(window.__f||"__all")===c?"on":""}">${labels[c]||c}</button>`).join("");
  document.querySelectorAll("#filters button").forEach(b=>b.onclick=()=>{window.__f=b.dataset.c;
    document.querySelectorAll("#filters button").forEach(x=>x.classList.toggle("on",x===b));paint(b.dataset.c);});
}
function paint(f){
  f=f||"__all";
  const list=PROJECTS.filter(p=>f==="__all"||p.type===f);
  let html=list.map((p)=>{
    const idx=PROJECTS.indexOf(p);
    return `<article class="card sfx" data-i="${idx}" style="--accent:${p.accent}">
      <div class="cat">${esc(L(p.cat))}</div><h3>${esc(L(p.name))}</h3>
      <p>${esc(L(p.desc))}</p>
      <div class="stack">${p.stack.map(x=>`<span class="tag">${esc(x)}</span>`).join("")}</div>
      <div class="go"><span>${t("open_dossier")}</span>${p.live?`<span class="live">${t("live")}</span>`:p.private?`<span style="color:var(--dim)">🔒 ${LANG==="pt"?"privado":"private"}</span>`:""}</div>
    </article>`;}).join("");
  document.getElementById("projects-grid").innerHTML=html;
  document.querySelectorAll("#projects-grid .card").forEach(c=>{
    c.onclick=()=>openModal(PROJECTS[c.dataset.i]);
  });
}
function renderTimeline(){
  document.getElementById("timeline").innerHTML=JOURNEY.map(j=>
    `<div class="tl ${j.kind==="edu"?"edu":""}"><div class="dot"></div>
      <div class="when">${esc(L(j.when))}</div><h4>${esc(L(j.title))}</h4>
      <div class="org">${esc(j.org)}</div><p>${esc(L(j.note))}</p></div>`).join("");
}
function renderCerts(){
  document.getElementById("certs-grid").innerHTML=CERTS.map(c=>{
    const inner=`<div class="ico">${c.ico}</div><div><h4>${esc(L(c.name))}</h4><div class="by">${esc(c.by)}</div></div>`;
    return c.file
      ? `<a class="cert sfx" href="${esc(c.file)}" target="_blank" rel="noreferrer">${inner}</a>`
      : `<div class="cert sfx">${inner}</div>`;
  }).join("");
}

/* ============ MODAL ============ */
function openModal(p){
  const box=document.getElementById("modal-box");box.style.borderColor=p.accent;box.style.boxShadow=`0 0 50px ${p.accent}44`;
  box.innerHTML=`
    <div style="display:flex;justify-content:space-between;align-items:start;border-bottom:1px solid ${p.accent}33;padding-bottom:14px">
      <div><div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.1em;color:${p.accent}">${esc(L(p.cat))}</div>
      <h2 class="orb" style="font-size:1.5rem;margin:8px 0 0;font-weight:500">${esc(L(p.name))}</h2></div>
      <button class="sfx" onclick="document.getElementById('modal').style.display='none'" style="background:none;border:1px solid ${p.accent};color:${p.accent};width:34px;height:34px;border-radius:6px;cursor:pointer">✕</button>
    </div>
    <p style="color:var(--muted);line-height:1.7;margin:18px 0">${esc(L(p.detail))}</p>
    <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:24px">${(p.stack||[]).map(x=>`<span class="tag">${esc(x)}</span>`).join("")}</div>
    <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center">
      ${p.demo?`<a class="btn btn-fill sfx" href="${p.demo}" target="_blank" rel="noreferrer">${t("view_live")}</a>`:""}
      ${p.repo?`<a class="btn btn-ghost sfx" href="${p.repo}" target="_blank" rel="noreferrer">${t("view_repo")}</a>`
        :`<span style="font-family:'JetBrains Mono',monospace;font-size:12px;color:var(--dim);border:1px dashed var(--line);padding:11px 18px;border-radius:3px">🔒 ${t("private_repo")}</span>`}
    </div>`;
  document.getElementById("modal").style.display="flex";
}
document.getElementById("modal")?.addEventListener("click",e=>{if(e.target.id==="modal")e.currentTarget.style.display="none";});
addEventListener("keydown",e=>{if(e.key==="Escape"){const m=document.getElementById("modal");if(m)m.style.display="none";}});

/* ============ CONTATO -> WhatsApp ============ */
document.getElementById("send")?.addEventListener("click",()=>{
  const n=(document.getElementById("f-nome")?.value||"").trim();
  const m=(document.getElementById("f-msg")?.value||"").trim();
  const greet=LANG==="pt"?"Olá Emanuel! Vim pelo seu portfólio.":"Hi Emanuel! I came from your portfolio.";
  const txt=`${greet}${n?`\n\n${LANG==="pt"?"Nome":"Name"}: ${n}`:""}${m?`\n\n${m}`:""}`;
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`,"_blank");
});

/* ============ LANG TOGGLE ============ */
document.getElementById("lang")?.addEventListener("click",()=>{LANG=LANG==="en"?"pt":"en";applyI18n();
  if(typingStarted){typingStarted=false;const ty=document.getElementById("typed");if(ty)ty.innerHTML='<span class="cur">▌</span>';startTyping();}});

/* ============ MATRIX FS + KONAMI ============ */
function showMatrix(){const d=document.createElement("div");d.style.cssText="position:fixed;inset:0;z-index:9999;background:#0a0a0f;cursor:pointer";
  d.innerHTML='<canvas style="position:fixed;inset:0"></canvas><div style="position:fixed;bottom:30px;left:0;right:0;text-align:center;color:'+C.lime+';font-family:monospace;letter-spacing:3px">[ click to exit ]</div>';
  document.body.appendChild(d);const cv=d.querySelector("canvas"),ctx=cv.getContext("2d");cv.width=innerWidth;cv.height=innerHeight;
  let drops=Array(Math.floor(cv.width/16)).fill(1);const ch="アカサ01<>#EM";let raf;
  (function dr(){ctx.fillStyle="rgba(10,10,15,.06)";ctx.fillRect(0,0,cv.width,cv.height);ctx.font="15px monospace";
    drops.forEach((y,i)=>{ctx.fillStyle=Math.random()>.97?C.magenta:C.cyan;ctx.fillText(ch[Math.random()*ch.length|0],i*16,y*16);
    if(y*16>cv.height&&Math.random()>.975)drops[i]=0;drops[i]++;});raf=requestAnimationFrame(dr);})();
  d.onclick=()=>{cancelAnimationFrame(raf);d.remove();};}
(function(){const seq=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];let buf=[];
  addEventListener("keydown",e=>{buf.push(e.key);buf=buf.slice(-seq.length);if(buf.join()===seq.join())showMatrix();});})();
window.matrix=showMatrix;

/* ============ REVEAL ============ */
(function(){
  try{
    if(typeof IntersectionObserver==="undefined"){throw new Error("no IO");}
    const io=new IntersectionObserver(es=>es.forEach(x=>x.isIntersecting&&x.target.classList.add("in")),{threshold:.1});
    document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
  }catch(e){
    // fallback: se IntersectionObserver não existir/falhar, mostra tudo direto
    document.querySelectorAll(".reveal").forEach(el=>el.classList.add("in"));
  }
})();

/* ============ HOLOGRAMA 3D ============ */
(function(){if(!window.THREE)return;const mount=document.getElementById("holo");if(!mount)return;
  const w=mount.clientWidth||320,h=mount.clientHeight||320;
  const scene=new THREE.Scene(),cam=new THREE.PerspectiveCamera(55,w/h,.1,100);cam.position.z=6;
  const rn=new THREE.WebGLRenderer({antialias:true,alpha:true});rn.setPixelRatio(Math.min(devicePixelRatio,2));rn.setSize(w,h);rn.setClearColor(0,0);mount.appendChild(rn.domElement);
  const g1=new THREE.Mesh(new THREE.IcosahedronGeometry(2.1,1),new THREE.MeshBasicMaterial({color:0x38bdf8,wireframe:true,transparent:true,opacity:.6}));
  const g2=new THREE.Mesh(new THREE.IcosahedronGeometry(1.3,0),new THREE.MeshBasicMaterial({color:0x2563eb,wireframe:true,transparent:true,opacity:.45}));
  scene.add(g1,g2);
  const pts=new Float32Array(400*3);for(let i=0;i<400;i++){const r=3+Math.random()*1.5,a=Math.random()*6.28,b=Math.random()*3.14;
    pts[i*3]=r*Math.sin(b)*Math.cos(a);pts[i*3+1]=r*Math.sin(b)*Math.sin(a);pts[i*3+2]=r*Math.cos(b);}
  const pg=new THREE.BufferGeometry();pg.setAttribute("position",new THREE.BufferAttribute(pts,3));
  scene.add(new THREE.Points(pg,new THREE.PointsMaterial({color:0x22d3ee,size:.045,transparent:true,opacity:.8})));
  const clk=new THREE.Clock();let mx=0,my=0;addEventListener("mousemove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5;});
  (function loop(){requestAnimationFrame(loop);const tt=clk.getElapsedTime();
    g1.rotation.x=tt*.2+my*.5;g1.rotation.y=tt*.3+mx*.5;g2.rotation.x=-tt*.4;g2.rotation.z=tt*.25;rn.render(scene,cam);})();
  addEventListener("resize",()=>{const nw=mount.clientWidth,nh=mount.clientHeight;if(nw&&nh){cam.aspect=nw/nh;cam.updateProjectionMatrix();rn.setSize(nw,nh);}});
})();

/* ============ CODING STATUS (avatar) ============ */
const CODING={en:["coding","git push","debugging","building API","deploying"],pt:["codando","git push","debugando","criando API","fazendo deploy"]};
(function(){
  const el=()=>document.querySelector(".coding [data-i18n='coding']");
  let k=0;
  setInterval(()=>{const e=el();if(!e)return;const arr=CODING[LANG]||CODING.en;k=(k+1)%arr.length;e.textContent="> "+arr[k];},2600);
})();

/* ============ INIT ============ */
window.__f="__all";
try{
  applyI18n();
}catch(e){
  // se algo falhar, garante que projetos e certificações apareçam mesmo assim
  console.error("init error:",e);
  try{renderAboutSide();}catch(_){}
  try{renderChips();}catch(_){}
  try{renderFilters();}catch(_){}
  try{paint("__all");}catch(_){}
  try{renderTimeline();}catch(_){}
  try{renderCerts();}catch(_){}
  document.querySelectorAll(".reveal").forEach(el=>el.classList.add("in"));
}