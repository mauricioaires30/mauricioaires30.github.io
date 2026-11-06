/* =====================================================================
 * Enfeites espalhados pela página:
 *  - planetas de Outer Wilds (arte do mapa planetário do jogo), atrás do conteúdo,
 *    com as luas e satélites girando em volta do planeta deles;
 *  - adesivos de Deltarune, Terraria, PvZ e Minecraft "segurando" os cards;
 *  - alguns rostos de mobs do Minecraft espiando atrás das caixas;
 *  - viajantes cruzando a tela (2 ou 3 de cada vez): nave, Xereta, Desconhecido,
 *    Duke Fishron, Olho de Cthulhu, a estrela cadente e o sol do PvZ.
 *
 * Para mexer em algo, edite as listas abaixo. Cada item fica preso a:
 *   el = um seletor CSS (o item fica por cima daquela caixa, ex.: '#projects-list .project:nth-child(2)')
 *   ou s = o id de uma seção ('top', 'about', 'tech', 'projects', 'contact').
 *   x, y = posição em % dessa caixa ou seção (pode passar um pouco de 0 ou 100 para "sair" da borda)
 *   h  = altura em pixels no computador
 *   r  = rotação em graus
 *   m  = true para aparecer também no celular
 * ===================================================================== */
var Decor = (function () {
  'use strict';

  /* Planetas sem lua (atrás do conteúdo). A Lua Quântica muda de lugar sozinha (veja quantumMoon). */
  var PLANETS = [
    { s: 'about',    a: 'ow_bramble', x: 84, y: 66, h: 150, r: -10 },
    { s: 'contact',  a: 'ow_twins',   x: 30, y: 62, h: 120, r: -12 }
  ];

  /* Astros com lua ou satélite girando em volta.
   *   sat.h = altura do satélite, radius = raio da órbita (px), dur = segundos por volta,
   *   tilt = inclinação da órbita (graus), flat = achatamento (1 = círculo).
   * O satélite fica de pé (ou, com pointDown, com a base virada para o astro) e passa por trás dele na metade de cima da órbita.
   * Os astros giram devagar no próprio eixo (CSS: .decor-item--planet > img). */
  var ORBITS = [
    { el: '.avatar', a: 'ow_timber',  x: 82, y: -8, h: 92,  r: 0, m: true,
      sat: { a: 'ow_attlerock', h: 30, radius: 74,  dur: 16, tilt: -12, flat: 0.45 } },
    { s: 'top',  a: 'ow_giants',  x: 56, y: 6,  h: 110, r: 0,
      sat: { a: 'ow_cannon',    h: 34, radius: 94,  dur: 20, tilt: -10, flat: 0.45 } },
    { s: 'tech', a: 'ow_brittle', x: 86, y: 12, h: 120, r: 0,
      sat: { a: 'ow_lantern',   h: 40, radius: 96,  dur: 18, tilt: 10,  flat: 0.45 } },
    { s: 'tech', a: 'ow_sun',     x: 6,  y: 40, h: 150, r: 0,
      sat: { a: 'ow_station',   h: 34, radius: 120, dur: 26, tilt: 8,   flat: 0.45, pointDown: true } }
  ];

  /* Adesivos "segurando" as caixas da página (borda branca de adesivo).
   *   spots = lugares possíveis em volta da caixa, em ordem de preferência:
   *     tr/tl = sentado na borda de cima (direita/esquerda), br/bl = na borda de baixo,
   *     r/l = pendurado na lateral (direita/esquerda).
   *   O código testa os lugares em ordem e usa o primeiro que não encosta em outro adesivo,
   *   nem em enfeites fixos, nem sai da tela. */
  var STICKERS = [
    { el: '.dialog',                              a: 'tr_guide',    h: 84,  spots: ['tr', 'r', 'tl'] },
    { el: '.stats',                               a: 'dr_ralsei',   h: 104, spots: ['tl', 'bl', 'br'] },
    { el: '#projects-list .project:nth-child(1)', a: 'dr_kris',     h: 92,  spots: ['tr', 'l'], m: true },
    { el: '#projects-list .project:nth-child(2)', a: 'dr_lancer',   h: 74,  spots: ['tr', 'r'] },
    { el: '#projects-list .project:nth-child(3)', a: 'dr_spamton',  h: 88,  spots: ['l', 'tl'] },
    { el: '#projects-list .project:nth-child(4)', a: 'dr_aqua',     h: 96,  spots: ['r', 'br', 'tr'], m: true },
    { el: '#projects-list .project:nth-child(5)', a: 'sv_abigail',  h: 96,  spots: ['tr', 'r'], m: true },
    { el: '.pix',                                 a: 'pvz_wallnut', h: 76,  spots: ['l', 'bl'] },
    { el: '#contact-links',                       a: 'mc_diamond',  h: 38,  spots: ['tr', 'r'] },
    { el: '.pix',                                 a: 'mc_cake',     h: 48,  spots: ['br', 'tr'] }
  ];

  /* Rostos de mobs do Minecraft espiando atrás das caixas (mesmas regras dos adesivos) */
  var FACES = [
    { el: '.stats',          a: 'mc_face_creeper',  h: 46, spots: ['br', 'r'] },
    { el: '.pix',            a: 'mc_face_zombie',   h: 46, spots: ['tr', 'r'], m: true },
    { el: '#projects-list',  a: 'mc_face_skeleton', h: 46, spots: ['br', 'r'] }
  ];

  /* Viajantes: atravessam a tela, 2 ou 3 ao mesmo tempo.
   *   faces = para que lado a ARTE original aponta ('left', 'right' ou 'down'); o código gira/espelha
   *           para eles sempre andarem de frente. null = sem frente (arte redonda).
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
    { a: 'tr_eoc',        h: 96,  dur: [16, 22], faces: 'down',
      trail: { colors: ['#e03a3a', '#ff7b7b', '#8f1d1d'], size: 5, square: false, every: 70, life: 1000, spread: 12, glow: '#ff5a5a', tail: 0.4 } },
    { a: 'tr_star',       h: 40,  dur: [5, 7],   faces: null, fall: true,
      trail: { colors: ['#fff3a0', '#ffd23d', '#ffffff'], size: 5, square: true, every: 35, life: 800, spread: 6, glow: '#ffd23d', tail: 0.5 } },
    { a: 'sun',           h: 64,  dur: [9, 12],  faces: null, fall: true,
      trail: { colors: ['#fff6b0', '#ffd23d', '#ffffff'], size: 5, square: false, every: 60, life: 900, spread: 14, glow: '#ffe066', tail: 0.4 } }
  ];
  var MAX_TRAVELERS = 3;

  /* ---------- posicionamento ---------- */
  function host(it) {
    if (it.el) {
      var target = document.querySelector(it.el);
      if (!target) return null;
      if (getComputedStyle(target).position === 'static') target.style.position = 'relative';
      return target;
    }
    var section = document.getElementById(it.s);
    if (!section) return null;
    var cls = 'decor-' + (it.back ? 'back' : 'front');
    var l = section.querySelector(':scope > .' + cls);
    if (!l) {
      l = document.createElement('div');
      l.className = cls;
      l.setAttribute('aria-hidden', 'true');
      section.insertBefore(l, section.firstChild);
    }
    return l;
  }

  function holderFor(it, cls) {
    var a = GAME_ART[it.a];
    var h = host(it);
    if (!a || !h) return null;
    var holder = document.createElement('span');
    holder.className = 'decor-item ' + cls + (it.m ? ' decor-item--m' : '') + (it.el ? ' decor-item--held' : '');
    holder.setAttribute('aria-hidden', 'true');
    holder.innerHTML = spriteHTML(it.a, it.h / a.h);
    holder.style.cssText = 'left:' + it.x + '%;top:' + it.y + '%;--r:' + (it.r || 0) + 'deg';
    h.appendChild(holder);
    return holder;
  }

  function addItems(list, cls, back) {
    list.forEach(function (it) { if (!it.spots) holderFor(Object.assign({ back: back }, it), cls); });
  }

  /* ---------- adesivos com posição inteligente ---------- */
  var placed = [];            // adesivos já posicionados: { holder, it }

  function rectOf(el) { var r = el.getBoundingClientRect(); return { l: r.left, t: r.top, r: r.right, b: r.bottom }; }
  function hits(a, b, gap) { return a.l < b.r + gap && a.r > b.l - gap && a.t < b.b + gap && a.b > b.t - gap; }

  /* posição (em px dentro da caixa) de cada lugar, para um adesivo de w x h */
  function spotXY(spot, W, H, w, h) {
    switch (spot) {
      case 'tr': return [W - w * 0.9, -h * 0.72];
      case 'tl': return [-w * 0.1, -h * 0.72];
      case 'br': return [W - w * 0.55, H - h * 0.3];
      case 'bl': return [-w * 0.45, H - h * 0.3];
      case 'r':  return [W - w * 0.2, H * 0.42 - h / 2];
      case 'l':  return [-w * 0.8, H * 0.42 - h / 2];
    }
    return [0, 0];
  }

  function obstacles() {
    var list = [];
    document.querySelectorAll('.stats__badge, .deco, .avatar__frame, .hotbar, .decor-item--planet').forEach(function (el) { list.push(rectOf(el)); });
    return list;
  }

  function placeSticker(it, cls) {
    var holder = holderFor(Object.assign({ x: 0, y: 0 }, it), cls);
    if (!holder) return;
    placed.push({ holder: holder, it: it });
  }

  function layoutStickers() {
    var walls = obstacles(), taken = [];
    var vw = document.documentElement.clientWidth;
    placed.forEach(function (p) {
      p.holder.style.display = '';
      if (getComputedStyle(p.holder).display === 'none') return;   // escondido no celular
      var box = p.holder.parentElement;
      var W = box.offsetWidth, H = box.offsetHeight;
      var hs = p.holder.offsetHeight || p.it.h, ws = p.holder.offsetWidth || p.it.h;
      var spots = p.it.spots.concat(['tr', 'tl', 'r', 'l', 'br', 'bl']), chosen = null;
      for (var i = 0; i < spots.length && !chosen; i++) {
        var xy = spotXY(spots[i], W, H, ws, hs);
        p.holder.style.left = xy[0] + 'px'; p.holder.style.top = xy[1] + 'px';
        var r = rectOf(p.holder);
        var bad = r.l < 4 || r.r > vw - 4 ||
          taken.some(function (t) { return hits(r, t, 8); }) ||
          walls.some(function (t) { return hits(r, t, 4); });
        if (!bad) chosen = r;
      }
      if (!chosen) { p.holder.style.display = 'none'; return; }   // sem lugar livre: fica de fora
      p.holder.style.display = '';
      taken.push(chosen);
    });
  }

  /* ---------- órbitas ----------
   * O satélite é movido por código numa elipse inclinada ao redor do centro do astro.
   * Na metade de trás da órbita ele passa atrás do astro. */
  var orbiters = [];

  function addOrbits() {
    ORBITS.forEach(function (o) {
      var holder = holderFor(Object.assign({ back: true }, o), 'decor-item--planet');
      if (!holder) return;
      var a = GAME_ART[o.a], sa = GAME_ART[o.sat.a];
      var w = o.h * a.w / a.h;
      var sat = document.createElement('span');
      sat.className = 'orbit-sat';
      sat.innerHTML = spriteHTML(o.sat.a, o.sat.h / sa.h);
      holder.appendChild(sat);
      orbiters.push({ el: sat, cx: w / 2, cy: o.h / 2, sw: o.sat.h * sa.w / sa.h, sh: o.sat.h, o: o.sat,
                      phase: Math.random() * Math.PI * 2 });
    });
  }

  function placeOrbiter(b, t) {
    var o = b.o, k = window.innerWidth < 700 ? 0.7 : 1;
    var ang = b.phase + (t / 1000) * (Math.PI * 2 / o.dur);
    var ex = Math.cos(ang) * o.radius * k, ey = Math.sin(ang) * o.radius * k * o.flat;
    var tilt = o.tilt * Math.PI / 180;
    var x = ex * Math.cos(tilt) - ey * Math.sin(tilt), y = ex * Math.sin(tilt) + ey * Math.cos(tilt);
    // pointDown: a parte de baixo da arte fica sempre apontada para o astro (a Estação Solar mira o Sol)
    var turn = o.pointDown ? Math.atan2(-y, -x) * 180 / Math.PI - 90 : 0;
    b.el.style.transform = 'translate(' + (b.cx + x - b.sw / 2).toFixed(1) + 'px,' + (b.cy + y - b.sh / 2).toFixed(1) + 'px) rotate(' + turn.toFixed(1) + 'deg)';
    b.el.style.zIndex = Math.sin(ang) < 0 ? -1 : 1;                 // atrás do astro na metade de cima
  }

  function runOrbits(reduceMotion) {
    if (!orbiters.length) return;
    if (reduceMotion) { orbiters.forEach(function (b) { placeOrbiter(b, 0); }); return; }
    (function tick(t) {
      if (!document.hidden) orbiters.forEach(function (b) { placeOrbiter(b, t); });
      requestAnimationFrame(tick);
    })(0);
  }

  /* ---------- viajantes ---------- */
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

  /* faixas verticais ocupadas pelos viajantes na tela, para não se cruzarem */
  var lanes = [];

  function pickLane() {
    var bands = [0.12, 0.3, 0.48, 0.66, 0.82].filter(function (b) { return lanes.indexOf(b) < 0; });
    var b = bands.length ? bands[Math.floor(Math.random() * bands.length)] : 0.5;
    lanes.push(b);
    return b;
  }

  function launch(box, kind, onDone) {
    var a = GAME_ART[kind.a];
    var h = kind.h * (window.innerWidth < 700 ? 0.7 : 1);
    var w = h * a.w / a.h;
    var vw = window.innerWidth, vh = window.innerHeight;
    var right = Math.random() < 0.5;                       // true = vai da esquerda para a direita
    var x0, y0, x1, y1, lane = null;
    if (kind.fall) {                                       // cai de cima para baixo, na diagonal
      x0 = rnd(vw * 0.1, vw * 0.85); y0 = -h - 20;
      x1 = x0 + (right ? 1 : -1) * rnd(vw * 0.1, vw * 0.25); y1 = vh + h + 20;
    } else {
      lane = pickLane();
      x0 = right ? -w - 30 : vw + 30; x1 = right ? vw + 30 : -w - 30;
      y0 = vh * lane + rnd(-vh * 0.04, vh * 0.04); y1 = y0 + rnd(-vh * 0.1, vh * 0.1);
    }
    var dx = x1 - x0, dy = y1 - y0, len = Math.hypot(dx, dy);
    var ux = dx / len, uy = dy / len;                      // sentido da viagem

    // gira/espelha a arte para ela sempre andar de frente
    var flip = 1, angle = 0;
    if (kind.faces === 'down') {
      angle = Math.atan2(dy, dx) * 180 / Math.PI - 90;     // a frente (embaixo na arte) aponta para onde vai
    } else if (kind.faces) {
      flip = ((kind.faces === 'left') === right) ? -1 : 1;
      var tilt = Math.atan2(dy, Math.abs(dx)) * 180 / Math.PI;
      angle = right ? tilt : -tilt;
    }

    var node = document.createElement('span');
    node.className = 'traffic__item';
    node.innerHTML = spriteHTML(kind.a, h / a.h);
    if (kind.spin && node.firstChild) node.firstChild.style.animation = 'tspin 26s linear infinite';   // a roda do Desconhecido gira devagar
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
      if (tr.ring) {                                       // a roda não tem traseiro: solta faíscas em volta
        var ang = Math.random() * Math.PI * 2; bx = Math.cos(ang) * w * 0.52; by = Math.sin(ang) * h * 0.52;
      } else {
        bx = -ux * w * (tr.tail || 0.5); by = -uy * w * (tr.tail || 0.5);
      }
      puff(box, cx + bx, cy + by, tr);
    }, tr.every);
    anim.onfinish = function () {
      clearInterval(timer); node.remove();
      if (lane !== null) lanes.splice(lanes.indexOf(lane), 1);
      if (onDone) onDone();
    };
  }

  function startTraffic(reduceMotion) {
    if (reduceMotion || !('animate' in Element.prototype)) return;
    var box = document.createElement('div');
    box.className = 'traffic';
    box.setAttribute('aria-hidden', 'true');
    document.body.appendChild(box);

    // até 3 ao mesmo tempo, sem repetir os mesmos tipos em seguida
    var active = 0, recent = [];
    function next() {
      setTimeout(next, rnd(5000, 9000));
      if (document.hidden || active >= MAX_TRAVELERS) return;
      var choices = TRAFFIC.filter(function (k) { return recent.indexOf(k.a) < 0; });
      var kind = choices[Math.floor(Math.random() * choices.length)];
      recent.push(kind.a); if (recent.length > 3) recent.shift();
      active++;
      launch(box, kind, function () { active--; });
    }
    setTimeout(next, 2500);
  }

  /* ---------- Lua Quântica ----------
   * Aparece num lugar aleatório da página e, como no jogo, só muda de lugar quando ninguém está
   * olhando: assim que sai da tela, ela vai para um ponto que também está fora da tela. */
  function quantumMoon() {
    var main = document.getElementById('main');
    var a = GAME_ART.ow_quantum;
    if (!main || !a) return;
    var size = window.innerWidth < 700 ? 34 : 50;
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
        x = Math.random() < 0.5 ? rnd(0.03, 0.08) * W : W - size - rnd(0.03, 0.08) * W;
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
    var reduce = opts && opts.reduceMotion;
    addItems(PLANETS, 'decor-item--planet', true);
    addOrbits();
    STICKERS.forEach(function (it) { placeSticker(it, 'decor-item--sticker'); });
    FACES.forEach(function (it) { placeSticker(it, 'decor-item--face'); });
    // posiciona depois que fontes e imagens carregam (o tamanho das caixas muda) e de novo ao redimensionar
    layoutStickers();
    window.addEventListener('load', layoutStickers);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutStickers);
    var lt; window.addEventListener('resize', function () { clearTimeout(lt); lt = setTimeout(layoutStickers, 200); });
    runOrbits(reduce);
    quantumMoon();
    startTraffic(reduce);
  }

  return { init: init };
})();
