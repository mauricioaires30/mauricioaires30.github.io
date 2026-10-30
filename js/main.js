(function () {
  'use strict';

  var DEFAULT_LANG = 'en';
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- localStorage seguro ---------- */
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignore */ } }
  };

  /* ---------- helpers ---------- */
  function lookup(obj, path) {
    return path.split('.').reduce(function (o, k) { return o == null ? o : o[k]; }, obj);
  }

  function el(tag, props, children) {
    var node = document.createElement(tag);
    Object.keys(props || {}).forEach(function (k) {
      if (k === 'class') node.className = props[k];
      else if (k === 'text') node.textContent = props[k];
      else node.setAttribute(k, props[k]);
    });
    (children || []).forEach(function (c) { node.appendChild(c); });
    return node;
  }

  function sprite(name, scale, pal) {
    var holder = el('span', { class: 'sprite' });
    holder.innerHTML = pal ? spriteSVG(name, scale, pal) : spriteHTML(name, scale);
    return holder;
  }

  /* ---------- Sprites declarados no HTML (<span data-sprite="...">) ---------- */
  document.querySelectorAll('[data-sprite]').forEach(function (node) {
    node.classList.add('sprite');
    node.innerHTML = spriteHTML(node.getAttribute('data-sprite'), Number(node.getAttribute('data-scale')) || 4);
  });

  /* ---------- Escrita nomai (Outer Wilds): conversas em espiral atrás do conteúdo ---------- */
  document.body.insertAdjacentHTML('afterbegin', nomaiDefs());

  // [seção, semente, left %, top %, largura px, rotação]
  var NOMAI = [
    ['top', 3, 40, 2, 520, -10], ['top', 14, -8, 50, 380, 150],
    ['about', 8, 66, -10, 480, 20], ['about', 27, -10, 40, 360, -140],
    ['tech', 41, 60, 4, 540, 200], ['tech', 55, -6, 60, 320, 40],
    ['projects', 62, -10, 0, 460, 70], ['projects', 73, 74, 30, 440, -30], ['projects', 88, 28, 76, 420, 170],
    ['contact', 95, 44, -14, 440, 100], ['contact', 101, 82, 58, 340, -60]
  ];

  var nomaiLayers = {};
  NOMAI.forEach(function (n) {
    var section = document.getElementById(n[0]);
    var layer = nomaiLayers[n[0]];
    if (!layer) {
      layer = nomaiLayers[n[0]] = el('div', { class: 'nomai-bg', 'aria-hidden': 'true' });
      section.insertBefore(layer, section.firstChild);
    }
    var item = el('span', { class: 'nomai-bg__item' });
    item.innerHTML = nomaiConversationSVG(n[1]);
    item.style.cssText = 'left:' + n[2] + '%;top:' + n[3] + '%;width:min(' + n[4] + 'px,80vw);transform:rotate(' + n[5] + 'deg)';
    layer.appendChild(item);
  });

  // Placa nomai ao lado da fogueira
  document.getElementById('slab').innerHTML = nomaiConversationSVG(120);

  // A escrita é traduzida quando aparece na tela, como no jogo
  var nomaiNodes = document.querySelectorAll('.nomai-bg__item, .slab');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-read'); io.unobserve(e.target); }
      });
    }, { threshold: 0.2 });
    nomaiNodes.forEach(function (n) { io.observe(n); });
  } else {
    nomaiNodes.forEach(function (n) { n.classList.add('is-read'); });
  }

  /* ---------- Céu: nuvens (dia), estrelas e planetas (noite) ---------- */
  (function buildSky() {
    var sky = document.getElementById('sky');
    var clouds = [[6, 14, 5, 70], [38, 8, 4, 95], [68, 20, 6, 80]];
    clouds.forEach(function (c, i) {
      var n = sprite('cloud', c[2]);
      n.classList.add('sky__cloud');
      n.style.cssText = 'left:' + c[0] + '%;top:' + c[1] + '%;animation-duration:' + c[3] + 's;animation-delay:-' + i * 17 + 's';
      sky.appendChild(n);
    });
    // posições fixas para o layout não mudar a cada visita
    var stars = [[4,12],[11,64],[17,28],[23,80],[29,10],[34,52],[41,22],[47,72],[53,8],[58,40],[63,86],[69,18],[74,58],[79,30],[84,76],[89,12],[93,48],[97,84],[8,88],[50,92]];
    stars.forEach(function (p, i) {
      var n = sprite('star', i % 4 === 0 ? 3 : 2);
      n.classList.add('sky__star');
      n.style.cssText = 'left:' + p[0] + '%;top:' + p[1] + '%;animation-delay:-' + (i * 0.37).toFixed(2) + 's';
      sky.appendChild(n);
    });
    // [sprite, left %, top %, escala]
    var planets = [
      ['ow_interloper', 27, 2, 4], ['ow_giants', 55, 4, 5], ['ow_brittle', 92, 22, 3.5], ['ow_lantern', 97, 12, 2.5],
      ['ow_twins', 47, 76, 3], ['ow_quantum', 70, 90, 3], ['ow_bramble', 95, 80, 3.5]
    ];
    planets.forEach(function (p, i) {
      var n = sprite(p[0], p[3]);
      n.classList.add('sky__planet');
      n.style.cssText = 'left:' + p[1] + '%;top:' + p[2] + '%;animation-delay:-' + i * 0.8 + 's';
      sky.appendChild(n);
    });
    // a nave atravessando o céu de tempos em tempos
    var flame = sprite('shipflame', 3);
    flame.classList.add('ship__flame');
    sky.appendChild(el('span', { class: 'ship' }, [el('span', { class: 'ship__bob' }, [flame, sprite('ship', 3)])]));
  })();

  /* ---------- Rodapé: cabeças de mobs, flores e tochas sobre a grama ---------- */
  (function buildGround() {
    var wrap = document.getElementById('footer-decos');
    // [sprite, left %, escala, classe extra]
    var items = [
      ['mc_poppy', 3, 3], ['mc_creeper', 11, 4, 'mob'], ['mc_torch', 20, 4, 'torch'], ['mc_skeleton', 29, 4, 'mob'],
      ['mc_dandelion', 38, 3], ['sunflower', 48, 4], ['mc_zombie', 58, 4, 'mob'], ['mc_campfire', 67, 4, 'torch'],
      ['mc_wither', 76, 4, 'mob'], ['mc_piglin', 85, 4, 'mob'], ['mc_torch', 94, 4, 'torch']
    ];
    items.forEach(function (it) {
      var n = sprite(it[0], it[2]);
      n.classList.add('footer__deco');
      if (it[3]) n.classList.add('footer__deco--' + it[3]);
      n.style.left = it[1] + '%';
      wrap.appendChild(n);
    });
  })();

  /* ---------- Tema ---------- */
  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    store.set('theme', theme);
  }

  document.getElementById('theme-toggle').addEventListener('click', function () {
    setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });

  // Segue o sistema enquanto o usuário não escolheu manualmente
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!store.get('theme')) root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    });
  }

  /* ---------- Idioma ---------- */
  function detectLang() {
    var saved = store.get('lang');
    if (saved && I18N[saved]) return saved;
    var nav = (navigator.language || '').toLowerCase();
    return nav.indexOf('pt') === 0 ? 'pt' : DEFAULT_LANG;
  }

  function renderStats(t) {
    var dl = document.getElementById('stats');
    dl.replaceChildren();
    t.about.stats.forEach(function (s) {
      dl.appendChild(el('div', { class: 'stats__row' }, [
        el('dt', { text: s.k }),
        el('dd', { text: s.v })
      ]));
    });
  }

  /* ---------- Hotbar do Minecraft (linguagens) ----------
   * Passar o mouse (ou focar com o teclado) move a moldura branca de seleção
   * e mostra o nome do item acima da barra, como ao trocar de item no jogo. */
  var selectedSlot = 0;
  var nameTimer;

  function renderTech() {
    var wrap = document.getElementById('tech-list');
    wrap.replaceChildren();

    var name = el('p', { class: 'hotbar__name', 'aria-hidden': 'true' });
    var bar = el('ul', { class: 'hotbar', role: 'list' });
    var frame = el('span', { class: 'hotbar__sel', 'aria-hidden': 'true' });

    function select(i, announce) {
      selectedSlot = i;
      bar.style.setProperty('--sel', i);
      var item = SITE.tech[i];
      clearTimeout(nameTimer);
      name.textContent = item ? item.name : '';
      name.classList.toggle('is-visible', !!(item && announce));
      if (item && announce) nameTimer = setTimeout(function () { name.classList.remove('is-visible'); }, 1800);
    }

    for (var i = 0; i < 9; i++) {
      var item = SITE.tech[i];
      var slot = el('li', { class: 'hotbar__slot', style: '--i:' + i });
      if (item) {
        var btn = el('button', { type: 'button', class: 'hotbar__btn', 'aria-label': item.name }, [sprite(item.sprite, 4)]);
        btn.addEventListener('focus', select.bind(null, i, true));
        btn.addEventListener('click', select.bind(null, i, true));
        slot.appendChild(btn);
      } else {
        slot.setAttribute('aria-hidden', 'true');
      }
      slot.addEventListener('mouseenter', select.bind(null, i, true));
      bar.appendChild(slot);
    }
    bar.appendChild(frame);

    wrap.appendChild(name);
    wrap.appendChild(bar);
    select(selectedSlot, false);
  }

  function renderProjects(t) {
    var list = document.getElementById('projects-list');
    list.replaceChildren();
    SITE.projects.forEach(function (p, i) {
      var txt = t.projects.items[i];
      if (!txt) return;

      var links = el('div', { class: 'project__links' });
      if (p.repo) links.appendChild(el('a', { class: 'btn btn--sm btn--ghost', href: p.repo, target: '_blank', rel: 'noopener noreferrer', text: t.projects.code + ' ↗' }));
      if (p.demo) links.appendChild(el('a', { class: 'btn btn--sm btn--ghost', href: p.demo, target: '_blank', rel: 'noopener noreferrer', text: t.projects.demo + ' ↗' }));

      var head = el('div', { class: 'project__head' }, [
        el('span', { class: 'project__icon' }, [sprite(p.icon, 4)]),
        el('div', {}, [
          el('span', { class: 'project__phase', text: t.projects.phase + ' ' + String(i + 1).padStart(2, '0') }),
          el('h3', { text: txt.title })
        ])
      ]);

      var body = [
        head,
        el('p', { class: 'project__role', text: '* ' + t.projects.role + ': ' + txt.role }),
        el('p', { text: txt.desc })
      ];
      if (p.stack.length) {
        body.push(el('ul', { class: 'chips' }, p.stack.map(function (s) {
          return el('li', { class: 'chip', text: s });
        })));
      }
      body.push(links);

      list.appendChild(el('article', { class: 'card project' }, body));
    });
  }

  function renderContacts() {
    var list = document.getElementById('contact-links');
    list.replaceChildren();
    SITE.contacts.forEach(function (c) {
      var heart = sprite('soul', 1.5);
      heart.classList.add('menu__soul');
      var a = el('a', { href: c.href, target: c.href.indexOf('mailto:') === 0 ? '_self' : '_blank', rel: 'noopener noreferrer' }, [
        heart,
        el('span', { class: 'menu__label', text: c.label }),
        el('small', { text: c.value })
      ]);
      list.appendChild(el('li', {}, [a]));
    });
  }

  /* ---------- Diálogo estilo RPG (máquina de escrever) ---------- */
  var typing = { timer: null };

  function typeDialog(lines) {
    var box = document.getElementById('dialog-text');
    var dialog = document.getElementById('dialog');
    clearTimeout(typing.timer);
    box.replaceChildren();
    dialog.classList.remove('is-done');

    var paragraphs = lines.map(function () {
      var p = el('p', {});
      box.appendChild(p);
      return p;
    });

    if (reduceMotion) {
      lines.forEach(function (line, i) { paragraphs[i].textContent = line; });
      dialog.classList.add('is-done');
      return;
    }

    var li = 0, ci = 0;
    (function step() {
      if (li >= lines.length) { dialog.classList.add('is-done'); return; }
      ci++;
      paragraphs[li].textContent = lines[li].slice(0, ci);
      if (ci >= lines[li].length) { li++; ci = 0; typing.timer = setTimeout(step, 450); }
      else typing.timer = setTimeout(step, 32);
    })();
  }

  function setLang(lang) {
    var t = I18N[lang];
    if (!t) return;
    var changed = lang !== currentLang;
    store.set('lang', lang);
    root.lang = t.lang;
    document.title = t.meta.title;
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', t.meta.description);

    document.querySelectorAll('[data-i18n]').forEach(function (node) {
      var v = lookup(t, node.getAttribute('data-i18n'));
      if (typeof v === 'string') node.textContent = v;
    });
    // data-i18n-attr="atributo:chave"
    document.querySelectorAll('[data-i18n-attr]').forEach(function (node) {
      var parts = node.getAttribute('data-i18n-attr').split(':');
      var v = lookup(t, parts[1]);
      if (typeof v === 'string') node.setAttribute(parts[0], v);
    });

    document.querySelectorAll('.lang__btn').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });

    renderStats(t);
    renderProjects(t);
    if (changed) typeDialog(t.hero.dialog);
    currentLang = lang;
  }

  var currentLang = null;

  document.querySelectorAll('.lang__btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  /* ---------- Conteúdo independente de idioma ---------- */
  document.querySelectorAll('[data-site]').forEach(function (node) {
    var v = SITE[node.getAttribute('data-site')];
    if (v) node.textContent = v;
  });
  document.getElementById('year').textContent = new Date().getFullYear();

  document.getElementById('pix-qr').src = SITE.pixQr;

  var avatar = document.getElementById('avatar-img');
  avatar.addEventListener('error', function () {
    // Sem foto (offline, por exemplo): mostra um coração no lugar
    var holder = sprite('soul', 10);
    holder.classList.add('avatar__fallback');
    avatar.replaceWith(holder);
  });
  avatar.src = SITE.avatar;

  renderContacts();
  renderTech();

  /* ---------- Sóis (brincadeira de Plants vs. Zombies) ---------- */
  var sunCount = parseInt(store.get('suns'), 10) || 0;
  var sunEl = document.getElementById('sun-count');
  sunEl.textContent = sunCount;

  function addSuns(n, x, y) {
    sunCount += n;
    sunEl.textContent = sunCount;
    store.set('suns', String(sunCount));
    if (x != null && !reduceMotion) {
      var pop = el('span', { class: 'sun-pop', text: '+' + n });
      pop.style.left = x + 'px';
      pop.style.top = y + 'px';
      document.body.appendChild(pop);
      setTimeout(function () { pop.remove(); }, 900);
    }
  }

  var sunBtn = document.getElementById('sun-btn');
  sunBtn.addEventListener('click', function () {
    var r = sunBtn.getBoundingClientRect();
    addSuns(25, r.left + r.width / 2, r.bottom);
  });

  function dropSun() {
    if (document.hidden) return scheduleSun();
    var drop = el('button', { type: 'button', class: 'sun-drop', 'aria-label': I18N[currentLang].ui.sunDrop });
    drop.appendChild(sprite('sun', 10));
    drop.style.left = (6 + Math.random() * 84) + '%';
    drop.addEventListener('click', function () {
      var r = drop.getBoundingClientRect();
      addSuns(25, r.left + r.width / 2, r.top);
      drop.remove();
    });
    drop.addEventListener('animationend', function () { drop.remove(); });
    document.body.appendChild(drop);
    scheduleSun();
  }

  function scheduleSun() {
    setTimeout(dropSun, 16000 + Math.random() * 14000);
  }

  if (!reduceMotion) setTimeout(dropSun, 9000);

  /* ---------- Init ---------- */
  setLang(detectLang());
})();
