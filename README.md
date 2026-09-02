# Neon Grid — Portfólio de Emanuel Borges Moraes

> Portfólio pessoal interativo com estética cyberpunk, desenvolvido em HTML, CSS e JavaScript puro (vanilla), com WebGL via Three.js.

**🔗 Ver ao vivo:** _[adicione aqui a URL da Netlify após o deploy]_

Desenvolvedor Back-End · Python · FastAPI · AWS · Automação de Dados
Palmas — Tocantins, Brasil

---

## ✨ Funcionalidades

- **Bilíngue (EN/PT)** — troca de idioma dinâmica sem recarregar a página.
- **Estética cyberpunk** — efeito Matrix, glitch, scanlines, grid neon e hologramas.
- **Avatar holográfico** — moldura hexagonal animada com scanline e status de "codando".
- **WebGL** — icosaedro wireframe e nuvem de partículas com Three.js.
- **Projetos dinâmicos** — cards filtráveis por categoria (Backend, AI, DSA, Web, Game) com modal de detalhes.
- **Contato via WhatsApp** — formulário que monta a mensagem e abre a conversa.
- **Download de currículo** em PDF.
- **Responsivo** e com acessibilidade básica (`prefers-reduced-motion`, navegação por teclado).
- **Easter egg** — código Konami (↑↑↓↓←→←→ B A).

---

## 🗂️ Estrutura do projeto

```
portfolio/
├── index.html                 # marcação semântica da página
└── assets/
    ├── css/
    │   └── styles.css         # todos os estilos (variáveis CSS, layout, animações)
    ├── js/
    │   └── app.js             # lógica: i18n, render de dados, Three.js, interações
    ├── img/
    │   └── avatar.png         # avatar (imagem)
    └── docs/
        └── Emanuel_Borges_Moraes_CV.pdf
```

Separação de responsabilidades: **estrutura** (HTML), **estilo** (CSS) e **comportamento** (JS) em arquivos independentes. Os dados (projetos, certificações, trajetória) ficam centralizados em objetos no início de `app.js`, facilitando a manutenção — para atualizar um projeto, basta editar um objeto.

---

## 🛠️ Tecnologias

- **HTML5** semântico
- **CSS3** — variáveis, grid, flexbox, `clip-path`, animações `@keyframes`
- **JavaScript (ES6+)** vanilla — sem frameworks
- **[Three.js](https://threejs.org/)** (r128) — efeitos WebGL
- **Google Fonts** — Orbitron, Rajdhani, JetBrains Mono

---

## 🚀 Rodando localmente

Por ser um site estático, basta abrir o `index.html` no navegador. Para evitar restrições de CORS ao carregar os assets, o ideal é servir com um servidor local:

```bash
# Python
python3 -m http.server 8000

# ou Node
npx serve
```

Depois acesse `http://localhost:8000`.

---

## 📦 Deploy

O projeto é 100% estático e pode ser publicado em qualquer host de sites estáticos (Netlify, Vercel, GitHub Pages). Basta apontar para a pasta `portfolio/` (ou a raiz, conforme sua configuração).

---

## 📫 Contato

- **GitHub:** [EmanuelBmoraes7](https://github.com/EmanuelBmoraes7)
- **LinkedIn:** [Emanuel Borges Moraes](https://www.linkedin.com/in/emanuel-borges-moraes-4a30301a0/)
- **E-mail:** emanuelborgesmoraes@gmail.com

---

<p align="center"><sub>Desenvolvido por Emanuel Borges Moraes · Powered by Neon Code</sub></p>
