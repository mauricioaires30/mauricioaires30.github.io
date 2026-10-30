/* =====================================================================
 * Enfeites espalhados pela página (todos com arte oficial dos jogos):
 *  - planetas de Outer Wilds, atrás do conteúdo;
 *  - adesivos de Deltarune, Terraria, PvZ e Minecraft, por cima;
 *  - rostos de mobs do Minecraft espiando pelas laterais;
 *  - tráfego espacial: nave, cometa Xereta e O Desconhecido cruzando a tela.
 *
 * Para mexer em algo, edite as listas abaixo. Cada item:
 *   s  = id da seção onde fica ('top' = início, 'about', 'tech', 'projects', 'contact')
 *   a  = nome da arte (veja GAME_ART em sprites.js)
 *   x  = posição horizontal (% da seção; pode ser negativo ou passar de 100)
 *   y  = posição vertical (% da seção)
 *   h  = altura em pixels no computador
 *   r  = rotação em graus
 *   m  = true para aparecer também no celular
 * ===================================================================== */
var Decor = (function () {
  'use strict';

  /* Planetas (atrás do conteúdo). Cada um aparece uma vez só na página, junto da sua lua:
   * Timber Hearth + Attlerock ficam ao lado da foto (no HTML); Brittle Hollow + Hollow's Lantern
   * aqui. A Lua Quântica não está nesta lista: ela muda de lugar sozinha (veja quantumMoon). */
  var PLANETS = [
    { s: 'about',    a: 'ow_bramble',   x: 91,  y: 58,  h: 130, r: -10 },
    { s: 'tech',     a: 'ow_brittle',   x: 91,  y: 6,   h: 120, r: -12 },
    { s: 'tech',     a: 'ow_lantern',   x: 86.5, y: 2,  h: 60,  r: 6 },
    { s: 'projects', a: 'ow_twins',     x: -3,  y: 30,  h: 120, r: -14 }
  ];

  /* Astros com um satélite girando em volta (a órbita é uma elipse inclinada).
   *   a/h = o astro e sua altura; sat = o satélite, com altura h, raio da órbita (px, no computador),
   *   dur = segundos por volta, tilt = inclinação da órbita (graus) e flat = achatamento (0 a 1). */
  var ORBITS = [
    { s: 'top',  a: 'ow_giants', x: 55,  y: 5,  h: 96,  r: 0,
      sat: { a: 'ow_cannon',  h: 40, radius: 92,  dur: 16, tilt: -18, flat: 0.42 } },
    { s: 'tech', a: 'ow_sun',    x: 8,   y: 44, h: 150, r: 0,
      sat: { a: 'ow_station', h: 30, radius: 118, dur: 26, tilt: 14,  flat: 0.38 } }
  ];

  /* Adesivos (por cima, com borda branca de adesivo): Deltarune, Terraria, PvZ e Minecraft */
  var STICKERS = [
    { s: 'top',      a: 'mc_totem',    x: 48,  y: 8,   h: 44,  r: 12 },
    { s: 'top',      a: 'tr_guide',    x: 95.5, y: 70, h: 96,  r: -6 },
    { s: 'about',    a: 'dr_ralsei',   x: 92,  y: 6,   h: 132, r: 8 },
    { s: 'about',    a: 'tr_life',     x: 1.5, y: 82,  h: 56,  r: -10 },
    { s: 'about',    a: 'tr_wizard',   x: 60,  y: 82,  h: 110, r: 5 },
    { s: 'tech',     a: 'ut_sans',     x: 90,  y: 38,  h: 100, r: 6 },
    { s: 'tech',     a: 'mc_gapple',   x: 70,  y: 78,  h: 52,  r: -14 },
    { s: 'projects', a: 'dr_aqua',     x: -2.5, y: 1,  h: 150, r: -6 },
    { s: 'projects', a: 'dr_spamton',  x: -1.5, y: 62, h: 130, r: 6 },
    { s: 'projects', a: 'dr_susie',    x: 91,  y: 58,  h: 150, r: 5 },
    { s: 'projects', a: 'pvz_wallnut', x: 93,  y: 90,  h: 90,  r: -8 },
    { s: 'projects', a: 'dr_kris',     x: 1,   y: 84,  h: 130, r: -4 },
    { s: 'projects', a: 'tr_slime',    x: 93,  y: 12,  h: 56,  r: 7 },
    { s: 'contact',  a: 'pvz_dave',    x: 3,   y: 56,  h: 190, r: -4 },
    { s: 'contact',  a: 'dr_lancer',   x: 42,  y: 72,  h: 96,  r: 6 },
    { s: 'contact',  a: 'dr_rouxls',   x: 90,  y: 66,  h: 150, r: 6 },
    { s: 'contact',  a: 'mc_diamond',  x: 52,  y: 10,  h: 56,  r: -10 },
    { s: 'contact',  a: 'mc_cake',     x: 87,  y: 88,  h: 72,  r: 7 },
    { s: 'contact',  a: 'mc_pearl',    x: 47,  y: 90,  h: 44,  r: 0 }
  ];

  /* Rostos de mobs do Minecraft espiando pelas laterais (só a frente da cabeça) */
  var FACES = [
    { s: 'about',    a: 'mc_face_creeper',  x: -1.8, y: 32, h: 60, r: -12, m: true },
    { s: 'about',    a: 'mc_face_skeleton', x: 98.6, y: 46, h: 60, r: 12,  m: true },
    { s: 'tech',     a: 'mc_face_zombie',   x: -1.8, y: 10, h: 60, r: -10 },
    { s: 'tech',     a: 'mc_face_creeper',  x: 98.6, y: 80, h: 60, r: 10,  m: true },
    { s: 'projects', a: 'mc_face_skeleton', x: -1.8, y: 66, h: 60, r: -9 },
    { s: 'projects', a: 'mc_face_zombie',   x: 98.6, y: 14, h: 60, r: 11,  m: true },
    { s: 'contact',  a: 'mc_face_creeper',  x: 98.8, y: 40, h: 60, r: 9 },
    { s: 'contact',  a: 'mc_face_zombie',   x: -1.8, y: 14, h: 60, r: -11 }
  ];

  /* Viajantes: atravessam a tela um de cada vez (nunca mais de um ao mesmo tempo).
   *   faces = para que lado a ARTE original aponta ('left' ou 'right'); o código espelha
   *           quando a viagem é no outro sentido, então eles sempre andam de frente.
   *           null = sem frente (arte redonda ou simétrica).
   *   fall  = true: cai de cima para baixo na diagonal, como uma estrela cadente.
   *   trail = rastro de partículas: cores, tamanho, forma, intervalo (ms), duração (ms),
   *           espalhamento (px) e tail = onde nasce (fração da largura, a partir do centro). */
  var TRAFFIC = [
    { a: 'ow_ship',       h: 62,  dur: [22, 30], faces: 'left',
      trail: { colors: ['#ffd23d', '#f2761e', '#fff3c4'], size: 5, square: true, every: 70, life: 750, spread: 8, glow: '#ff9a3c', tail: 0.5 } },
    { a: 'ow_interloper', h: 96,  dur: [14, 19], faces: 'left',
      trail: { colors: ['#dff6ff', '#8fe3ff', '#4fa8e8'], size: 6, square: false, every: 40, life: 1200, spread: 14, glow: '#8fe3ff', tail: 0.45 } },
    { a: 'ow_stranger',   h: 96,  dur: [38, 48], faces: null, spin: true,
      trail: { colors: ['#7fdcff', '#bfeeff', '#4fc9c0'], size: 4, square: false, every: 140, life: 1500, spread: 30, glow: '#7fdcff', ring: true } },
    { a: 'tr_duke',       h: 96,  dur: [16, 22], faces: 'left',
      trail: { colors: ['#ffffff', '#bfeeff', '#7fd6ff'], size: 6, square: false, every: 80, life: 1100, spread: 12, glow: '#7fd6ff', tail: 0.45 } },
    { a: 'tr_eoc',        h: 100, dur: [16, 22], faces: 'left',
      trail: { colors: ['#e03a3a', '#ff7b7b', '#8f1d1d'], size: 5, square: false, every: 70, life: 1000, spread: 12, glow: '#ff5a5a', tail: 0.4 } },
    { a: 'tr_wyvern',     h: 46,  dur: [20, 26], faces: 'left', bob: true,
      trail: { colors: ['#ffffff', '#e6f7ff', '#cfe9ff'], size: 7, square: false, every: 90, life: 1400, spread: 14, glow: '#ffffff', tail: 0.5 } },
    { a: 'tr_star',       h: 40,  dur: [4, 6],   faces: null, fall: true, spin: true,
      trail: { colors: ['#fff3a0', '#ffd23d', '#ffffff'], size: 5, square: true, every: 35, life: 800, spread: 6, glow: '#ffd23d', tail: 0.5 } }
  ];

  function layer(section, cls) {
    var l = section.querySelector(':scope > .' + cls);
    if (!l) {
      l = document.createElement('div');
      l.className = cls;
      l.setAttribute('aria-hidden', 'true');
      section.insertBefore(l, section.firstChild);
    }
    return l;
  }

  function addOrbits() {
    ORBITS.forEach(function (o) {
      var section = document.getElementById(o.s);
      var a = GAME_ART[o.a], sa = GAME_ART[o.sat.a];
      if (!section || !a || !sa) return;
      var holder = document.createElement('span');
      holder.className = 'decor-item decor-item--planet';
      holder.style.cssText = 'left:' + o.x + '%;top:' + o.y + '%;--r:' + (o.r || 0) + 'deg';
      holder.innerHTML = spriteHTML(o.a, o.h / a.h);
      var w = o.h * a.w / a.h;
      var plane = document.createElement('span');
      plane.className = 'orbit';
      // o centro da órbita é o centro do astro
      plane.style.cssText = 'left:' + (w / 2) + 'px;top:' + (o.h / 2) + 'px;--radius:' + o.sat.radius + 'px;--dur:' + o.sat.dur + 's;' +
        '--tilt:' + o.sat.tilt + 'deg;--flat:' + o.sat.flat + ';--inv:' + (1 / o.sat.flat).toFixed(3);
      var sat = document.createElement('span');
      sat.className = 'orbit__sat';
      sat.innerHTML = spriteHTML(o.sat.a, o.sat.h / sa.h);
      var spin = document.createElement('span');
      spin.className = 'orbit__spin';
      spin.appendChild(sat);
      plane.appendChild(spin);
      holder.appendChild(plane);
      layer(section, 'decor-back').appendChild(holder);
    });
  }

  function addItems(list, layerClass, itemClass) {
    list.forEach(function (it) {
      var section = document.getElementById(it.s);
      var a = GAME_ART[it.a];
      if (!section || !a) return;
      var holder = document.createElement('span');
      holder.className = 'decor-item ' + itemClass + (it.m ? ' decor-item--m' : '');
      holder.innerHTML = spriteHTML(it.a, it.h / a.h);
      holder.style.cssText = 'left:' + it.x + '%;top:' + it.y + '%;--r:' + (it.r || 0) + 'deg';
      layer(section, layerClass).appendChild(holder);
    });
  }

  /* ---------- tráfego espacial ---------- */
  function rnd(a, b) { return a + Math.random() * (b - a); }

  /* Uma partícula do rastro, nascendo em (x, y) e se apagando. */
  function puff(box, x, y, tr) {
    var p = document.createElement('span');
    p.className = 'trail';
    var size = tr.size * rnd(0.6, 1.3);
    var color = tr.colors[Math.floor(Math.random() * tr.colors.length)];
    p.style.cssText = 'width:' + size + 'px;height:' + size + 'px;background:' + color + ';' +
      'box-shadow:0 0 ' + (size * 2) + 'px ' + tr.glow + ';' + (tr.square ? '' : 'border-radius:50%;');
    box.appendChild(p);
    var sx = x + rnd(-tr.spread, tr.spread) * 0.4 - size / 2, sy = y + rnd(-tr.spread, tr.spread) * 0.4 - size / 2;
    var anim = p.animate([
      { transform: 'translate(' + sx + 'px,' + sy + 'px) scale(1)', opacity: 0.95 },
      { transform: 'translate(' + (sx + rnd(-8, 8)) + 'px,' + (sy + rnd(-8, 8)) + 'px) scale(.2)', opacity: 0 }
    ], { duration: tr.life * rnd(0.8, 1.2), easing: 'ease-out', fill: 'forwards' });
    anim.onfinish = function () { p.remove(); };
  }

  function launch(box, kind, onDone) {
    var a = GAME_ART[kind.a];
    var h = kind.h * (window.innerWidth < 700 ? 0.7 : 1);
    var w = h * a.w / a.h;
    var vw = window.innerWidth, vh = window.innerHeight;
    var right = Math.random() < 0.5;                       // true = vai da esquerda para a direita
    var x0, y0, x1, y1;
    if (kind.fall) {                                       // estrela cadente: de cima para baixo, na diagonal
      x0 = rnd(vw * 0.15, vw * 0.9); y0 = -h - 20;
      x1 = x0 + (right ? 1 : -1) * rnd(vw * 0.12, vw * 0.3); y1 = vh + h + 20;
    } else {
      x0 = right ? -w - 30 : vw + 30; x1 = right ? vw + 30 : -w - 30;
      y0 = rnd(vh * 0.1, vh * 0.78); y1 = Math.min(vh * 0.85, Math.max(vh * 0.05, y0 + rnd(-vh * 0.25, vh * 0.25)));
    }
    var dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
    var ux = dx / len, uy = dy / len;                      // sentido da viagem

    // a arte aponta para `faces`; se a viagem vai para o outro lado, espelha: assim sempre anda de frente
    var flip = 1, angle = 0;
    if (kind.faces) {
      flip = ((kind.faces === 'left') === right) ? -1 : 1;
      var tilt = Math.atan2(dy, Math.abs(dx)) * 180 / Math.PI;   // o nariz acompanha a trajetória
      angle = right ? tilt : -tilt;
    }

    var node = document.createElement('span');
    node.className = 'traffic__item';
    node.innerHTML = spriteHTML(kind.a, h / a.h);
    if (kind.spin && node.firstChild) node.firstChild.style.animation = (kind.a === 'ow_stranger' ? 'tspin 26s linear infinite' : 'tspin .7s linear infinite');   // a estrela gira ao cair; a roda do Desconhecido, bem devagar
    if (kind.bob && node.firstChild) node.firstChild.style.animation = 'bob .5s steps(2) infinite';   // bate as asas / balança
    box.appendChild(node);

    function pose(x, y) { return 'translate(' + x + 'px,' + y + 'px) rotate(' + angle + 'deg) scaleX(' + flip + ')'; }
    var dur = rnd(kind.dur[0], kind.dur[1]) * 1000;
    var anim = node.animate([{ transform: pose(x0, y0) }, { transform: pose(x1, y1) }],
      { duration: dur, easing: 'linear', fill: 'forwards' });

    // rastro: sai do traseiro, no sentido contrário ao da viagem
    var tr = kind.trail;
    var timer = setInterval(function () {
      if (document.hidden) return;
      var t = anim.currentTime / dur;
      if (!(t >= 0 && t < 1)) return;
      var cx = x0 + dx * t + w / 2, cy = y0 + dy * t + h / 2;
      var bx, by;
      if (tr.ring) {                                       // o medalhão não tem traseiro: solta faíscas em volta
        var ang = Math.random() * Math.PI * 2; bx = Math.cos(ang) * w * 0.52; by = Math.sin(ang) * h * 0.52;
      } else {
        bx = -ux * w * (tr.tail || 0.5); by = -uy * w * (tr.tail || 0.5);
      }
      puff(box, cx + bx, cy + by, tr);
    }, tr.every);
    anim.onfinish = function () { clearInterval(timer); node.remove(); if (onDone) onDone(); };
  }

  function startTraffic(reduceMotion) {
    if (reduceMotion || !('animate' in Element.prototype)) return;
    var box = document.createElement('div');
    box.className = 'traffic';
    box.setAttribute('aria-hidden', 'true');
    document.body.appendChild(box);

    // um de cada vez, com uma pausa entre eles, para a tela não ficar poluída
    var last = -1;
    function next() {
      if (document.hidden) { setTimeout(next, 4000); return; }
      var i;
      do { i = Math.floor(Math.random() * TRAFFIC.length); } while (i === last && TRAFFIC.length > 1);
      last = i;
      launch(box, TRAFFIC[i], function () { setTimeout(next, rnd(9000, 16000)); });
    }
    setTimeout(next, 3500);
  }

  /* ---------- Lua Quântica ----------
   * Aparece num lugar aleatório da página e, como no jogo, só muda de lugar quando ninguém está
   * olhando: assim que sai da tela, ela vai para um ponto que também está fora da tela. */
  function quantumMoon() {
    var main = document.getElementById('main');
    var a = GAME_ART.ow_quantum;
    if (!main || !a) return;
    var size = window.innerWidth < 700 ? 34 : 52;
    var moon = document.createElement('span');
    moon.className = 'quantum';
    moon.setAttribute('aria-hidden', 'true');
    moon.innerHTML = spriteHTML('ow_quantum', size / a.h);
    main.appendChild(moon);

    function place(avoidView) {
      var H = main.scrollHeight, W = main.clientWidth;
      var top = main.getBoundingClientRect().top;
      var viewTop = -top - 60, viewBottom = -top + window.innerHeight + 60;
      var x, y, tries = 0;
      do {
        x = Math.random() < 0.5 ? rnd(0.008, 0.035) * W : W - size - rnd(0.008, 0.035) * W;
        y = rnd(60, Math.max(120, H - size - 60));
        tries++;
      } while (avoidView && y + size > viewTop && y < viewBottom && tries < 60);
      moon.style.left = Math.round(x) + 'px';
      moon.style.top = Math.round(y) + 'px';
    }

    place(false);
    var seen = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) { seen = true; return; }
        if (seen) { seen = false; place(true); }      // acabou de sair da tela: muda de lugar, longe dos olhos
      }, { threshold: 0 }).observe(moon);
    }
    window.addEventListener('resize', function () { place(true); });
  }

  function init(opts) {
    addItems(PLANETS, 'decor-back', 'decor-item--planet');
    addOrbits();
    addItems(STICKERS, 'decor-front', 'decor-item--sticker');
    addItems(FACES, 'decor-front', 'decor-item--face');
    quantumMoon();
    startTraffic(opts && opts.reduceMotion);
  }

  return { init: init };
})();
