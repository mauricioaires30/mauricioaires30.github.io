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
    holder.innerHTML = spriteSVG(name, scale, pal);
    return holder;
  }

  /* ---------- Sprites declarados no HTML (<span data-sprite="...">) ---------- */
  document.querySelectorAll('[data-sprite]').forEach(function (node) {
    node.classList.add('sprite');
    node.innerHTML = spriteSVG(node.getAttribute('data-sprite'), Number(node.getAttribute('data-scale')) || 4);
  });

  /* Texturas de chão (grama e terra) usadas no rodapé via CSS */
  root.style.setProperty('--tile-grass', spriteURL('grass', 8));
  root.style.setProperty('--tile-dirt', spriteURL('dirt', 8));

  /* ---------- Céu: nuvens (dia) e estrelas (noite) ---------- */
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

  function renderTech() {
    var list = document.getElementById('tech-list');
    list.replaceChildren();
    SITE.tech.forEach(function (lang) {
      list.appendChild(el('li', { class: 'slot-wrap' }, [
        el('span', { class: 'slot', text: lang.abbr, 'aria-hidden': 'true' }),
        el('span', { class: 'slot__name', text: lang.name })
      ]));
    });
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

      var icon = el('span', { class: 'project__icon' }, [sprite(p.icon, 4)]);
      var head = el('div', { class: 'project__head' }, [
        icon,
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
      var heart = sprite('heart', 3);
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

    var paragraphs = lines.map(function (line) {
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
    var changed = lang !== currentLang || !typing.started;
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
    if (changed) { typing.started = true; typeDialog(t.hero.dialog); }
    currentLang = lang;
  }

  var currentLang = null;
  var initialLang = detectLang();

  document.querySelectorAll('.lang__btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  /* ---------- Conteúdo independente de idioma ---------- */
  document.querySelectorAll('[data-site]').forEach(function (node) {
    var v = SITE[node.getAttribute('data-site')];
    if (v) node.textContent = v;
  });
  document.getElementById('year').textContent = new Date().getFullYear();

  var qr = document.getElementById('pix-qr');
  qr.src = SITE.pixQr;

  var avatar = document.getElementById('avatar-img');
  avatar.addEventListener('error', function () {
    // Sem foto (offline, por exemplo): mostra um coração no lugar
    var holder = sprite('heart', 16);
    holder.classList.add('avatar__fallback');
    avatar.replaceWith(holder);
  });
  avatar.src = SITE.avatar;

  renderTech();
  renderContacts();

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
    drop.appendChild(sprite('sun', 6));
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
  setLang(initialLang);
})();
