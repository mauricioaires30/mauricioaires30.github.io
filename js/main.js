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

  /* ---------- Escrita nomai (Outer Wilds): uma corrente só, pela página inteira ---------- */
  document.body.insertAdjacentHTML('afterbegin', nomaiDefs());
  var mainEl = document.getElementById('main');
  var nomaiLayer = el('div', { class: 'nomai-layer', 'aria-hidden': 'true' });
  mainEl.appendChild(nomaiLayer);
  var nomaiSize = { w: 0, h: 0 };

  function buildNomai(force) {
    var w = mainEl.clientWidth, h = mainEl.scrollHeight;
    if (!force && Math.abs(w - nomaiSize.w) < 30 && Math.abs(h - nomaiSize.h) < 80) return;
    nomaiSize = { w: w, h: h };
    nomaiLayer.innerHTML = nomaiChainSVG(w, h, 7);
  }

  var nomaiTimer;
  function scheduleNomai(force) {
    clearTimeout(nomaiTimer);
    nomaiTimer = setTimeout(function () { buildNomai(force); }, 220);
  }
  buildNomai(true);
  window.addEventListener('resize', function () { scheduleNomai(false); });
  window.addEventListener('load', function () { scheduleNomai(true); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { scheduleNomai(false); });

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

  /* ---------- Hotbar do Minecraft (linguagens), com vida, armadura, fome e XP ----------
   * Passar o mouse (ou focar com o teclado) move a moldura branca de seleção
   * e mostra o nome do item, como ao trocar de item no jogo. */
  var selectedSlot = 0;
  var nameTimer;

  function hudRow(file, n, cls) {
    var row = el('div', { class: 'mc__row ' + cls });
    for (var i = 0; i < n; i++) row.appendChild(el('img', { src: 'assets/games/mc-hud-' + file + '.png', alt: '', width: '9', height: '9' }));
    return row;
  }

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
        var btn = el('button', { type: 'button', class: 'hotbar__btn', 'aria-label': item.name }, [
          el('img', { src: item.logo, alt: '', width: '48', height: '48', class: 'hotbar__logo' })
        ]);
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

    var hud = el('div', { class: 'mc__hud', 'aria-hidden': 'true' }, [
      el('div', { class: 'mc__left' }, [hudRow('armor', 10, 'mc__armor'), hudRow('heart', 10, 'mc__hearts')]),
      hudRow('hunger', 10, 'mc__hunger')
    ]);
    var xp = el('div', { class: 'mc__xp', 'aria-hidden': 'true' }, [
      el('span', { class: 'mc__lvl', text: String(SITE.tech.length) }),
      el('span', { class: 'mc__xpfill' })
    ]);

    wrap.appendChild(el('div', { class: 'mc' }, [name, hud, xp, bar]));
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
    scheduleNomai(false);
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

  /* ---------- Init ---------- */
  setLang(detectLang());
  Decor.init({ reduceMotion: reduceMotion });
  Lawn.init();
})();
