/* =====================================================================
 * CONTEÚDO DO SITE — este é o único arquivo que você precisa editar.
 * ===================================================================== */

/* ---------- Dados que NÃO mudam com o idioma ---------- */
const SITE = {
  name: "Mauricio Aires",
  shortName: "Mauricio",

  // Foto: usa o avatar do GitHub, então ao trocar a foto lá ela muda aqui também.
  avatar: "https://github.com/mauricioaires30.png?size=360",

  // QR Code Pix: salve a imagem do seu QR neste caminho
  pixQr: "assets/pix-qr.png",

  // Contatos (label é o texto exibido; href é o link)
  contacts: [
    { key: "email",     label: "E-mail",    value: "mauricioaires30@gmail.com", href: "mailto:mauricioaires30@gmail.com" },
    { key: "instagram", label: "Instagram", value: "@mauricioaires_",           href: "https://instagram.com/mauricioaires_" },
    { key: "github",    label: "GitHub",    value: "github.com/mauricioaires30", href: "https://github.com/mauricioaires30" }
  ],

  // Linguagens: cada uma vira um item na hotbar do Minecraft (logo oficial em assets/logos).
  // A hotbar tem 9 slots; os que sobrarem ficam vazios.
  tech: [
    { name: "HTML",       logo: "assets/logos/html5.svg" },
    { name: "CSS",        logo: "assets/logos/css3.svg" },
    { name: "JavaScript", logo: "assets/logos/javascript.svg" },
    { name: "TypeScript", logo: "assets/logos/typescript.svg" },
    { name: "Python",     logo: "assets/logos/python.svg" },
    { name: "Java",       logo: "assets/logos/java.svg" },
    { name: "GDScript",   logo: "assets/logos/godot.svg" },
    { name: "GML",        logo: "assets/logos/gamemaker.svg" }
  ],

  // Projetos: dados fixos (textos ficam em I18N.<lang>.projects.items, na MESMA ordem)
  projects: [
    { icon: "note",      stack: ["Kotlin", "Jetpack Compose"], repo: "https://github.com/mauricioaires30/TruePlayer", demo: "" },
    { icon: "cross",     stack: ["SaaS", "Web"],               repo: "", demo: "https://www.r1academy.app/landingpage" },
    { icon: "containers", stack: ["GameMaker", "GML", "Python"], repo: "https://github.com/flavioramon/Paralegram", demo: "" },
    { icon: "victoria",  stack: ["Godot", "Pixel art"],        repo: "", demo: "https://labspider-ufpa.itch.io/tekoha" }
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
    ui: {
      skip: "Ir para o conteúdo",
      themeToggle: "Alternar entre dia e noite",
      sunDrop: "Coletar sol"
    },
    nav: { about: "Sobre", tech: "Linguagens", projects: "Projetos", contact: "Contato" },
    hero: {
      greeting: "Olá, viajante! Eu sou",
      role: "Desenvolvedor de software · Artista pixel art · Gamedev",
      tagline: "Graduando em Ciência da Computação na UFPA.",
      dialog: [
        "* Você encontrou o portfólio do Mauricio.",
        "* Aqui tem jogos, software e muita pixel art."
      ],
      cta1: "Ver projetos",
      cta2: "Entrar em contato",
      photoAlt: "Foto de Mauricio Aires"
    },
    about: {
      title: "Sobre",
      text: "Sou graduando em Ciência da Computação na Universidade Federal do Pará (UFPA). Desenvolvo software e jogos e também crio a arte em pixel art dos meus projetos, então costumo cuidar tanto do código quanto do visual.",
      stats: [
        { k: "NOME",   v: "Mauricio Aires" },
        { k: "CLASSE", v: "Dev · Artista pixel art · Gamedev" },
        { k: "NÍVEL",  v: "Graduando em Ciência da Computação" },
        { k: "GUILDA", v: "UFPA · Laboratório SPIDER" }
      ]
    },
    tech: {
      title: "Linguagens"
    },
    projects: {
      title: "Projetos",
      phase: "FASE",
      role: "Meu papel",
      code: "Código",
      demo: "Ver projeto",
      items: [
        { title: "TruePlayer", role: "Desenvolvimento completo (projeto solo, em evolução)", desc: "Aplicativo Android gratuito e open source para tocar música e editar tags. Baixa músicas a partir de links, completa tags e capas automaticamente e pode sincronizar a biblioteca com o GitHub." },
        { title: "R1 Academy", role: "Criação da plataforma", desc: "SaaS de preparação para residência médica. Gestores organizam mentores, e os mentores montam rotinas de estudo, aulas e questões para os alunos. A plataforma também tem agendamento de reuniões, feedback de provas e acompanhamento do desempenho, como o percentual de acertos." },
        { title: "Paralegram", role: "Programação e arte", desc: "Jogo sério em pixel art, feito em GameMaker, que ensina pensamento computacional paralelo por meio de programação em blocos. Foi avaliado com estudantes de Ciência da Computação." },
        { title: "Tekohá", role: "Pixel art, game design e level design · Laboratório SPIDER – UFPA", desc: "Jogo de ação e aventura 2D em pixel art, feito em Godot, com combate, exploração e habilidades inspiradas no folclore amazônico, como a Iara e o Curupira, e na cultura paraense. Disponível para Windows e Linux." }
      ]
    },
    contact: {
      title: "Contato",
      text: "Vamos conversar? Escolha uma opção abaixo.",
      pixTitle: "Apoie meu trabalho",
      pixText: "Se algum projeto meu te ajudou, você pode contribuir via Pix. Qualquer valor é bem-vindo!",
      pixAlt: "QR Code Pix para apoiar o trabalho"
    },
    footer: {
      text: "Feito com HTML, CSS e JS.",
      credits: "Minecraft © Mojang · Outer Wilds © Mobius Digital · Plants vs. Zombies © PopCap/EA · Undertale e Deltarune © Toby Fox. Artes usadas como homenagem, num site pessoal sem fins comerciais."
    }
  },

  en: {
    lang: "en",
    meta: {
      title: "Mauricio Aires — Portfolio",
      description: "Software developer, pixel artist and game developer. Computer Science student at UFPA."
    },
    ui: {
      skip: "Skip to content",
      themeToggle: "Switch between day and night",
      sunDrop: "Collect sun"
    },
    nav: { about: "About", tech: "Languages", projects: "Projects", contact: "Contact" },
    hero: {
      greeting: "Hello, traveler! I'm",
      role: "Software developer · Pixel artist · Game developer",
      tagline: "Computer Science student at UFPA.",
      dialog: [
        "* You found Mauricio's portfolio.",
        "* There are games, software and lots of pixel art here."
      ],
      cta1: "View projects",
      cta2: "Get in touch",
      photoAlt: "Photo of Mauricio Aires"
    },
    about: {
      title: "About",
      text: "I'm a Computer Science student at the Federal University of Pará (UFPA). I build software and games and also draw the pixel art for my projects, so I usually handle both the code and the visuals.",
      stats: [
        { k: "NAME",  v: "Mauricio Aires" },
        { k: "CLASS", v: "Dev · Pixel artist · Game dev" },
        { k: "LEVEL", v: "Computer Science student" },
        { k: "GUILD", v: "UFPA · SPIDER Lab" }
      ]
    },
    tech: {
      title: "Languages"
    },
    projects: {
      title: "Projects",
      phase: "STAGE",
      role: "My role",
      code: "Code",
      demo: "View project",
      items: [
        { title: "TruePlayer", role: "Full development (solo project, ongoing)", desc: "Free, open-source Android app for playing music and editing tags. Downloads songs from links, fills in tags and cover art automatically, and can sync the library with GitHub." },
        { title: "R1 Academy", role: "Platform creator", desc: "SaaS for medical residency exam preparation. Managers organize mentors, and mentors build study routines, lessons and question sets for students. The platform also offers meeting scheduling, exam feedback and performance tracking, such as accuracy rates." },
        { title: "Paralegram", role: "Programming & art", desc: "Pixel-art serious game built in GameMaker that teaches parallel computational thinking through block-based programming. It was evaluated with Computer Science students." },
        { title: "Tekohá", role: "Pixel art, game design and level design · SPIDER Lab – UFPA", desc: "2D pixel-art action-adventure game built in Godot, with combat, exploration and abilities inspired by Amazonian folklore, such as the Iara and the Curupira, and by the culture of Pará, Brazil. Available for Windows and Linux." }
      ]
    },
    contact: {
      title: "Contact",
      text: "Let's talk! Pick an option below.",
      pixTitle: "Support my work",
      pixText: "If any of my projects helped you, you can contribute via Pix (Brazilian instant payment). Any amount is appreciated!",
      pixAlt: "Pix QR Code to support the work"
    },
    footer: {
      text: "Built with HTML, CSS and JS.",
      credits: "Minecraft © Mojang · Outer Wilds © Mobius Digital · Plants vs. Zombies © PopCap/EA · Undertale and Deltarune © Toby Fox. Art used as a tribute on a personal, non-commercial site."
    }
  }
};
