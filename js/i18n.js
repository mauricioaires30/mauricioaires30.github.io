/* =====================================================================
 * CONTEÚDO DO SITE — este é o único arquivo que você precisa editar.
 * ===================================================================== */

/* ---------- Dados que NÃO mudam com o idioma ---------- */
const SITE = {
  name: "Mauricio Aires",
  shortName: "Mauricio",

  // QR Code Pix: salve a imagem do seu QR neste caminho
  pixQr: "assets/pix-qr.png",

  // Contatos (label é o texto exibido; href é o link)
  contacts: [
    { key: "email",     label: "E-mail",    value: "mauricioaires30@gmail.com", href: "mailto:mauricioaires30@gmail.com" },
    { key: "instagram", label: "Instagram", value: "@mauricioaires_",           href: "https://instagram.com/mauricioaires_" },
    { key: "github",    label: "GitHub",    value: "github.com/mauricioaires30", href: "https://github.com/mauricioaires30" }
  ],

  // Linguagens (nomes não são traduzidos; o título do grupo está em I18N)
  tech: [
    { key: "languages", items: ["Python", "Java", "GML", "GDScript", "JavaScript", "TypeScript"] }
  ],

  // Projetos: dados fixos (textos ficam em I18N.<lang>.projects.items, na MESMA ordem)
  projects: [
    { stack: ["Kotlin", "Jetpack Compose"], repo: "https://github.com/mauricioaires30/TruePlayer", demo: "" },
    { stack: ["SaaS", "Web"], repo: "", demo: "https://www.r1academy.app/landingpage" },
    { stack: ["GameMaker", "GML", "Python"], repo: "https://github.com/flavioramon/Paralegram", demo: "" },
    { stack: ["Godot", "GDScript"], repo: "", demo: "https://labspider-ufpa.itch.io/tekoha" }
  ]
};

/* ---------- Textos traduzíveis ---------- */
const I18N = {
  pt: {
    lang: "pt-BR",
    meta: {
      title: "Mauricio Aires — Portfólio",
      description: "Desenvolvedor de software, artista pixel art e gamedev. Graduando em Ciência da Computação na UFPA."
    },
    ui: { skip: "Ir para o conteúdo", themeToggle: "Alternar tema claro/escuro" },
    nav: { about: "Sobre", tech: "Linguagens", projects: "Projetos", contact: "Contato" },
    hero: {
      greeting: "Olá, eu sou",
      role: "Desenvolvedor de software · Artista pixel art · Gamedev",
      tagline: "Graduando em Ciência da Computação na UFPA.",
      cta1: "Ver projetos",
      cta2: "Entrar em contato"
    },
    about: {
      title: "Sobre",
      text: "Sou graduando em Ciência da Computação na Universidade Federal do Pará (UFPA). Desenvolvo software e jogos e também crio a arte em pixel art dos meus projetos, então costumo cuidar tanto do código quanto do visual."
    },
    tech: {
      title: "Linguagens",
      labels: { languages: "Linguagens" }
    },
    projects: {
      title: "Projetos",
      role: "Meu papel",
      code: "Código",
      demo: "Ver projeto",
      items: [
        { title: "TruePlayer", role: "Desenvolvimento completo (projeto solo, em evolução)", desc: "Aplicativo Android gratuito e open source para tocar música e editar tags. Baixa músicas a partir de links, completa tags e capas automaticamente e pode sincronizar a biblioteca com o GitHub." },
        { title: "R1 Academy", role: "Criação da plataforma", desc: "SaaS de preparação para residência médica. Gestores organizam mentores, e os mentores montam rotinas de estudo, aulas e questões para os alunos. A plataforma também tem agendamento de reuniões, feedback de provas e acompanhamento do desempenho, como o percentual de acertos." },
        { title: "Paralegram", role: "Programação e arte", desc: "Jogo sério em pixel art, feito em GameMaker, que ensina pensamento computacional paralelo por meio de programação em blocos. Foi avaliado com estudantes de Ciência da Computação." },
        { title: "Tekohá", role: "Equipe de desenvolvimento · Laboratório SPIDER – UFPA", desc: "Jogo de ação e aventura 2D em pixel art, feito em Godot, inspirado no folclore amazônico e na cultura paraense. Ainda em desenvolvimento." }
      ]
    },
    contact: {
      title: "Contato",
      text: "Vamos conversar? Me chame por qualquer um dos canais abaixo.",
      pixTitle: "Apoie meu trabalho",
      pixText: "Se algum projeto meu te ajudou, você pode contribuir via Pix. Qualquer valor é bem-vindo!",
      pixAlt: "QR Code Pix para apoiar o trabalho"
    },
    footer: { text: "Feito com HTML, CSS e JS." }
  },

  en: {
    lang: "en",
    meta: {
      title: "Mauricio Aires — Portfolio",
      description: "Software developer, pixel artist and game developer. Computer Science student at UFPA."
    },
    ui: { skip: "Skip to content", themeToggle: "Toggle light/dark theme" },
    nav: { about: "About", tech: "Languages", projects: "Projects", contact: "Contact" },
    hero: {
      greeting: "Hi, I'm",
      role: "Software developer · Pixel artist · Game developer",
      tagline: "Computer Science student at UFPA.",
      cta1: "View projects",
      cta2: "Get in touch"
    },
    about: {
      title: "About",
      text: "I'm a Computer Science student at the Federal University of Pará (UFPA). I build software and games and also draw the pixel art for my projects, so I usually handle both the code and the visuals."
    },
    tech: {
      title: "Languages",
      labels: { languages: "Languages" }
    },
    projects: {
      title: "Projects",
      role: "My role",
      code: "Code",
      demo: "View project",
      items: [
        { title: "TruePlayer", role: "Full development (solo project, ongoing)", desc: "Free, open-source Android app for playing music and editing tags. Downloads songs from links, fills in tags and cover art automatically, and can sync the library with GitHub." },
        { title: "R1 Academy", role: "Platform creator", desc: "SaaS for medical residency exam preparation. Managers organize mentors, and mentors build study routines, lessons and question sets for students. The platform also offers meeting scheduling, exam feedback and performance tracking, such as accuracy rates." },
        { title: "Paralegram", role: "Programming & art", desc: "Pixel-art serious game built in GameMaker that teaches parallel computational thinking through block-based programming. It was evaluated with Computer Science students." },
        { title: "Tekohá", role: "Development team · SPIDER Lab – UFPA", desc: "2D pixel-art action-adventure game built in Godot, inspired by Amazonian folklore and the culture of Pará, Brazil. Still in development." }
      ]
    },
    contact: {
      title: "Contact",
      text: "Let's talk! Reach out through any of the channels below.",
      pixTitle: "Support my work",
      pixText: "If any of my projects helped you, you can contribute via Pix (Brazilian instant payment). Any amount is appreciated!",
      pixAlt: "Pix QR Code to support the work"
    },
    footer: { text: "Built with HTML, CSS and JS." }
  }
};
