/* =====================================================================
 * Enfeites espalhados pela página (todos com arte oficial dos jogos):
 *  - planetas de Outer Wilds, atrás do conteúdo;
 *  - adesivos de Undertale, Deltarune, PvZ e Minecraft, por cima;
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

  /* Planetas (atrás do conteúdo) */
  var PLANETS = [
    { s: 'top',      a: 'ow_giants',    x: 55,  y: 5,   h: 96,  r: 0 },
    { s: 'top',      a: 'ow_brittle',   x: 92,  y: 46,  h: 92,  r: 8 },
    { s: 'top',      a: 'ow_lantern',   x: 96,  y: 14,  h: 52,  r: 0,   m: true },
    { s: 'top',      a: 'ow_twins',     x: 44,  y: 80,  h: 100, r: 14 },
    { s: 'top',      a: 'ow_quantum',   x: 68,  y: 88,  h: 46,  r: 0 },
    { s: 'about',    a: 'ow_bramble',   x: 91,  y: 58,  h: 130, r: -10 },
    { s: 'about',    a: 'ow_quantum',   x: 1,   y: 6,   h: 54,  r: 0,   m: true },
    { s: 'tech',     a: 'ow_brittle',   x: 91,  y: 6,   h: 120, r: -12 },
    { s: 'tech',     a: 'ow_twins',     x: 1.5, y: 56,  h: 110, r: -18 },
    { s: 'projects', a: 'ow_giants',    x: -4,  y: 38,  h: 150, r: 0,   m: true },
    { s: 'projects', a: 'ow_lantern',   x: 95,  y: 82,  h: 64,  r: 10 },
    { s: 'contact',  a: 'ow_attlerock', x: 94,  y: 4,   h: 66,  r: 0,   m: true },
    { s: 'contact',  a: 'ow_timber',    x: -3,  y: 62,  h: 110, r: 0 }
  ];

  /* Adesivos (por cima, com borda branca de adesivo) */
  var STICKERS = [
    { s: 'about',    a: 'dr_ralsei',   x: 92,  y: 6,   h: 132, r: 8 },
    { s: 'about',    a: 'ut_flowey',   x: -1,  y: 74,  h: 92,  r: -9 },
    { s: 'tech',     a: 'ut_sans',     x: 3,   y: 28,  h: 130, r: -6 },
    { s: 'tech',     a: 'ut_papyrus',  x: 88,  y: 36,  h: 160, r: 6 },
    { s: 'tech',     a: 'ut_dog',      x: 74,  y: 74,  h: 66,  r: -4 },
    { s: 'projects', a: 'ut_toriel',   x: -2,  y: 1,   h: 150, r: -6 },
    { s: 'projects', a: 'dr_spamton',  x: -1.5, y: 52, h: 130, r: 6 },
    { s: 'projects', a: 'dr_susie',    x: 91,  y: 58,  h: 150, r: 5 },
    { s: 'projects', a: 'pvz_wallnut', x: 93,  y: 90,  h: 90,  r: -8 },
    { s: 'projects', a: 'dr_kris',     x: 1,   y: 80,  h: 130, r: -4 },
    { s: 'contact',  a: 'pvz_dave',    x: 3,   y: 56,  h: 190, r: -4 },
    { s: 'contact',  a: 'dr_lancer',   x: 42,  y: 72,  h: 96,  r: 6 },
    { s: 'contact',  a: 'mc_diamond',  x: 52,  y: 10,  h: 56,  r: -10 },
    { s: 'contact',  a: 'mc_cake',     x: 87,  y: 88,  h: 72,  r: 7 }
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

  /* Viajantes do espaço: atravessam a tela de tempos em tempos */
  var TRAFFIC = [
    { a: 'ow_ship',       h: 62,  dur: [22, 30], flip: false, pixel: true },
    { a: 'ow_interloper', h: 62,  dur: [12, 17], flip: true },      // a cabeça do cometa aponta para a esquerda
    { a: 'ow_stranger',   h: 120, dur: [36, 46], flip: false }
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

  function launch(box, kind) {
    var a = GAME_ART[kind.a];
    var h = kind.h * (window.innerWidth < 700 ? 0.7 : 1);
    var w = h * a.w / a.h;
    var vw = window.innerWidth, vh = window.innerHeight;
    var right = Math.random() < 0.5;                       // true = vai da esquerda para a direita
    var x0 = right ? -w - 30 : vw + 30, x1 = right ? vw + 30 : -w - 30;
    var y0 = rnd(vh * 0.1, vh * 0.78), y1 = Math.min(vh * 0.85, Math.max(vh * 0.05, y0 + rnd(-vh * 0.25, vh * 0.25)));
    var angle = Math.atan2(y1 - y0, Math.abs(x1 - x0)) * 180 / Math.PI * (right ? 1 : -1);
    var flip = kind.flip ? (right ? -1 : 1) : 1;

    var node = document.createElement('span');
    node.className = 'traffic__item';
    node.innerHTML = spriteHTML(kind.a, h / a.h);
    box.appendChild(node);

    function pose(x, y) { return 'translate(' + x + 'px,' + y + 'px) rotate(' + angle + 'deg) scaleX(' + flip + ')'; }
    var anim = node.animate([{ transform: pose(x0, y0) }, { transform: pose(x1, y1) }],
      { duration: rnd(kind.dur[0], kind.dur[1]) * 1000, easing: 'linear', fill: 'forwards' });
    anim.onfinish = function () { node.remove(); };
  }

  function startTraffic(reduceMotion) {
    if (reduceMotion || !('animate' in Element.prototype)) return;
    var box = document.createElement('div');
    box.className = 'traffic';
    box.setAttribute('aria-hidden', 'true');
    document.body.appendChild(box);

    var last = -1;
    function next() {
      if (!document.hidden && box.children.length < 2) {
        var i; do { i = Math.floor(Math.random() * TRAFFIC.length); } while (i === last && TRAFFIC.length > 1);
        last = i;
        launch(box, TRAFFIC[i]);
      }
      setTimeout(next, rnd(9000, 16000));
    }
    setTimeout(next, 3000);
  }

  function init(opts) {
    addItems(PLANETS, 'decor-back', 'decor-item--planet');
    addItems(STICKERS, 'decor-front', 'decor-item--sticker');
    addItems(FACES, 'decor-front', 'decor-item--face');
    startTraffic(opts && opts.reduceMotion);
  }

  return { init: init };
})();
