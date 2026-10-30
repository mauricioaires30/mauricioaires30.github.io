(function () {
  'use strict';

  var DEFAULT_LANG = 'en';
  var root = document.documentElement;

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

  function renderTech(t) {
    var wrap = document.getElementById('tech-list');
    wrap.replaceChildren();
    SITE.tech.forEach(function (group) {
      var chips = el('div', { class: 'chips' }, group.items.map(function (name) {
        return el('span', { class: 'chip', text: name });
      }));
      wrap.appendChild(el('div', { class: 'tech__group' }, [
        el('h3', { text: t.tech.labels[group.key] || group.key }),
        chips
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
      if (p.repo) links.appendChild(el('a', { href: p.repo, target: '_blank', rel: 'noopener noreferrer', text: t.projects.code + ' ↗' }));
      if (p.demo) links.appendChild(el('a', { href: p.demo, target: '_blank', rel: 'noopener noreferrer', text: t.projects.demo + ' ↗' }));

      var body = [
        el('h3', { text: txt.title }),
        el('span', { class: 'project__role', text: t.projects.role + ': ' + txt.role }),
        el('p', { text: txt.desc })
      ];
      if (p.stack.length) {
        body.push(el('div', { class: 'chips' }, p.stack.map(function (s) {
          return el('span', { class: 'chip', text: s });
        })));
      }
      body.push(links);

      list.appendChild(el('article', { class: 'card project' }, [
        el('div', { class: 'project__body' }, body)
      ]));
    });
  }

  function renderContacts() {
    var list = document.getElementById('contact-links');
    list.replaceChildren();
    SITE.contacts.forEach(function (c) {
      var a = el('a', { href: c.href, target: c.href.indexOf('mailto:') === 0 ? '_self' : '_blank', rel: 'noopener noreferrer' }, [
        el('span', { text: c.label }),
        el('small', { text: c.value })
      ]);
      list.appendChild(el('li', {}, [a]));
    });
  }

  function setLang(lang) {
    var t = I18N[lang];
    if (!t) return;
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

    renderTech(t);
    renderProjects(t);
    currentLang = lang;
  }

  var currentLang = detectLang();

  document.querySelectorAll('.lang__btn').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });

  /* ---------- Conteúdo estático (independente de idioma) ---------- */
  document.querySelectorAll('[data-site]').forEach(function (node) {
    var v = SITE[node.getAttribute('data-site')];
    if (v) node.textContent = v;
  });
  document.getElementById('year').textContent = new Date().getFullYear();
  var qr = document.getElementById('pix-qr');
  qr.onerror = function () { qr.onerror = null; qr.src = 'assets/pix-qr.svg'; };
  qr.src = SITE.pixQr;
  renderContacts();

  /* ---------- Init ---------- */
  setLang(currentLang);
})();
