/* =====================================================================
 * Cena do rodapé: uma ervilheira (Plants vs. Zombies) à esquerda atira em
 * zumbis que entram pela direita, em cima dos blocos de grama do Minecraft.
 *
 * A ervilheira é a do PvZ 2 (parada e atirando, assets/games/pvz2-*.webp). Os zumbis são os
 * GIFs originais do PvZ 1 (não há animações do PvZ 2 deles disponíveis): andam, e conforme levam
 * tiros perdem o capacete e depois a cabeça,
 * como no jogo, até morrerem com a animação de morte. O código só move os
 * elementos. A ervilheira sempre vence: os zumbis são lentos e ainda existe
 * uma linha de segurança que derruba quem chegar perto.
 * ===================================================================== */
var Lawn = (function () {
  'use strict';

  var DIR = 'assets/games/';

  /* Tamanho do quadro de cada GIF e a caixa onde o desenho aparece (esq., topo, dir., base),
   * para alinhar os pés com o chão e a frente do zumbi com a sua posição. */
  var G = {
    'zombie-walk':   { f: 'pvz-zombie-walk.gif',   w: 166, h: 144, box: [67, 15, 159, 143] },
    'zombie-nohead': { f: 'pvz-zombie-nohead.gif', w: 166, h: 144, box: [81, 49, 159, 143] },
    'zombie-die':    { f: 'pvz-zombie-die.gif',    w: 166, h: 144, box: [37, 51, 149, 143], ms: 1560 },
    'cone-walk':     { f: 'pvz-cone-walk.gif',     w: 166, h: 144, box: [67, 0, 159, 143] },
    'bucket-walk':   { f: 'pvz-bucket-walk.gif',   w: 166, h: 144, box: [66, 1, 159, 143] },
    'football-walk':     { f: 'pvz-football-walk.gif',     w: 154, h: 172, box: [0, 0, 139, 161] },
    'football-nohelmet': { f: 'pvz-football-nohelmet.gif', w: 154, h: 172, box: [0, 3, 139, 161] },
    'football-nohead':   { f: 'pvz-football-nohead.gif',   w: 154, h: 172, box: [0, 17, 139, 161] },
    'football-die':      { f: 'pvz-football-die.gif',      w: 236, h: 170, box: [26, 35, 229, 170], ms: 720 },
    'gargantuar':     { f: 'pvz-gargantuar.webp',     w: 148, h: 176, box: [0, 0, 148, 176] },
    'gargantuar-die': { f: 'pvz-gargantuar_die.webp', w: 307, h: 210, box: [0, 0, 307, 210], ms: 2400, scale: 0.8 }
  };
  var HEAD = { f: 'pvz-zombie-head.gif', w: 150, ms: 480 };

  /* hp = tiros para derrubar; speed = px/s num palco de 1200 px.
   * stages: [hp acima de, animação]: a primeira que servir; a última vale para o resto da vida. */
  var TYPES = {
    zombie:     { hp: 4,  speed: 26, stages: [[2, 'zombie-walk'], [0, 'zombie-nohead']], die: 'zombie-die' },
    cone:       { hp: 7,  speed: 24, stages: [[4, 'cone-walk'], [2, 'zombie-walk'], [0, 'zombie-nohead']], die: 'zombie-die' },
    bucket:     { hp: 10, speed: 22, stages: [[5, 'bucket-walk'], [2, 'zombie-walk'], [0, 'zombie-nohead']], die: 'zombie-die' },
    football:   { hp: 9,  speed: 58, stages: [[5, 'football-walk'], [2, 'football-nohelmet'], [0, 'football-nohead']], die: 'football-die' },
    gargantuar: { hp: 30, speed: 17, boss: true, stages: [[0, 'gargantuar']], die: 'gargantuar-die' }
  };
  var COMMON = ['zombie', 'zombie', 'cone', 'cone', 'bucket', 'football'];

  var SHOOT_EVERY = 1.6;          // segundos entre tiros (a animação de tiro dura 1,2 s)
  var PEA_SPEED = 430;            // px/s
  /* Ervilheira do PvZ 2: parada (pvz2-peashooter-idle) e atirando (pvz2-peashooter-shoot),
   * as duas no mesmo quadro de 157 x 150 px; a ervilha sai do cano no quadro 33 de 60 (0,66 s). */
  var SHOOTER_H = 110, SHOOTER_RATIO = 157 / 150, SHOOT_MS = 1200, PEA_OUT_MS = 660;

  function init() {
    var lawn = document.getElementById('lawn');
    if (!lawn) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { lawn.hidden = true; return; }

    var W = 0, k = 1, speedK = 1;
    var shooter, shooterW = 0;
    var zombies = [], peas = [];
    var running = false, raf = 0, last = 0, fireAcc = 0, spawnIn = 1.4, spawned = 0;

    function measure() {
      W = lawn.clientWidth;
      k = W < 700 ? 0.72 : 1;
      speedK = Math.max(0.3, W / 1200);
    }

    function setup() {
      measure();
      shooterW = Math.round(SHOOTER_H * SHOOTER_RATIO * k);
      shooter = document.createElement('img');
      shooter.className = 'pvz-shooter';
      shooter.alt = '';
      shooter.src = DIR + 'pvz2-peashooter-idle.webp';
      shooter.style.width = shooterW + 'px';
      lawn.appendChild(shooter);
      // pré-carrega a animação de tiro
      new Image().src = DIR + 'pvz2-peashooter-shoot.webp';
    }

    /* Toca a animação de tiro (um <img> novo para ela começar do primeiro quadro) e solta a ervilha na hora do cuspe */
    var shooting = false;
    function shoot() {
      if (shooting) return;
      shooting = true;
      var img = document.createElement('img');
      img.className = 'pvz-shooter'; img.alt = '';
      img.src = DIR + 'pvz2-peashooter-shoot.webp';
      img.style.width = shooterW + 'px';
      shooter.replaceWith(img); shooter = img;
      setTimeout(function () { if (running) launchPea(); }, PEA_OUT_MS);
      setTimeout(function () {
        var idle = document.createElement('img');
        idle.className = 'pvz-shooter'; idle.alt = '';
        idle.src = DIR + 'pvz2-peashooter-idle.webp';
        idle.style.width = shooterW + 'px';
        shooter.replaceWith(idle); shooter = idle; shooting = false;
      }, SHOOT_MS);
    }

    /* Mostra a animação `name` no zumbi: um <img> novo, para o GIF recomeçar do primeiro quadro */
    function show(z, name) {
      var a = G[name], s = k * (a.scale || 1);
      var img = document.createElement('img');
      img.alt = ''; img.src = DIR + a.f;
      img.style.width = Math.round(a.w * s) + 'px';
      // pés no chão e frente do desenho sobre a posição do zumbi
      img.style.marginBottom = '-' + Math.round((a.h - a.box[3]) * s) + 'px';
      img.style.marginLeft = '-' + Math.round(a.box[0] * s) + 'px';
      z.box.replaceChildren(img);
      z.img = img; z.anim = name;
    }

    function stageFor(z) {
      var st = z.t.stages;
      for (var i = 0; i < st.length; i++) if (z.hp > st[i][0]) return st[i][1];
      return st[st.length - 1][1];
    }

    function spawn(name) {
      var t = TYPES[name];
      var box = document.createElement('div');
      box.className = 'pvz-zombie';
      lawn.appendChild(box);
      var first = G[t.stages[0][1]];
      var z = { t: t, box: box, x: W + 10, hp: t.hp, dying: false, anim: '', w: (first.box[2] - first.box[0]) * k };
      show(z, t.stages[0][1]);
      box.style.transform = 'translate3d(' + z.x + 'px,0,0)';
      zombies.push(z);
    }

    function dropHead(z) {                           // a cabeça sai rolando (animação original)
      var h = document.createElement('img');
      h.className = 'pvz-head'; h.alt = ''; h.src = DIR + HEAD.f;
      h.style.width = Math.round(HEAD.w * k * 0.7) + 'px';
      h.style.transform = 'translate3d(' + Math.round(z.x - 30 * k) + 'px,0,0)';
      lawn.appendChild(h);
      setTimeout(function () { h.classList.add('pvz-fade'); }, HEAD.ms + 200);
      setTimeout(function () { h.remove(); }, HEAD.ms + 800);
    }

    function die(z) {
      z.dying = true;
      var a = G[z.t.die];
      show(z, z.t.die);
      setTimeout(function () { z.img.classList.add('pvz-fade'); }, Math.max(0, a.ms - 400));
      setTimeout(function () { z.box.remove(); }, a.ms + 300);
    }

    function hit(z) {
      z.hp -= 1;
      z.img.classList.add('pvz-hit');
      setTimeout(function () { if (z.img) z.img.classList.remove('pvz-hit'); }, 110);
      if (z.hp <= 0) { die(z); return; }
      var next = stageFor(z);
      if (next !== z.anim) {
        if (next === 'zombie-nohead' || next === 'football-nohead') dropHead(z);
        show(z, next);
      }
    }

    function frontZombie() {
      var best = null;
      zombies.forEach(function (z) { if (!z.dying && z.x < W - 6 && (!best || z.x < best.x)) best = z; });
      return best;
    }

    function launchPea() {
      var p = document.createElement('img');
      p.className = 'pvz-pea'; p.alt = ''; p.src = DIR + 'pvz-pea.png';
      p.style.width = Math.round(24 * k) + 'px';
      var x = 8 + shooterW * 0.86;
      p.style.bottom = Math.round(SHOOTER_H * k * 0.66) + 'px';
      p.style.transform = 'translate3d(' + x + 'px,0,0)';
      lawn.appendChild(p);
      peas.push({ el: p, x: x });
    }

    function frame(now) {
      if (!running) return;
      var dt = Math.min(0.1, (now - last) / 1000); last = now;
      measure();

      // chegada de zumbis: no máximo 2 por vez, e o chefe vem sozinho
      spawnIn -= dt;
      var alive = zombies.filter(function (z) { return !z.dying; });
      var bossAlive = alive.some(function (z) { return z.t.boss; });
      if (spawnIn <= 0 && alive.length < 2 && !bossAlive) {
        spawned++;
        spawn(spawned % 8 === 0 ? 'gargantuar' : COMMON[Math.floor(Math.random() * COMMON.length)]);
        spawnIn = 4.8 + Math.random() * 3;
      }

      // zumbis andando (+ linha de segurança: nenhum chega perto da ervilheira)
      var safeX = 8 + shooterW + 40;
      alive.forEach(function (z) {
        z.x -= z.t.speed * speedK * dt;
        z.box.style.transform = 'translate3d(' + z.x + 'px,0,0)';
        if (z.x < safeX) die(z);
      });

      // tiros: a ervilheira só atira quando há zumbi na frente
      if (frontZombie()) {
        fireAcc += dt;
        if (fireAcc >= SHOOT_EVERY) { fireAcc = 0; shoot(); }
      } else {
        fireAcc = SHOOT_EVERY * 0.6;
      }

      for (var i = peas.length - 1; i >= 0; i--) {
        var p = peas[i];
        p.x += PEA_SPEED * k * dt;
        p.el.style.transform = 'translate3d(' + p.x + 'px,0,0)';
        var hitZ = frontZombie();
        if (hitZ && p.x >= hitZ.x + hitZ.w * 0.25) {
          hit(hitZ);
          p.el.remove(); peas.splice(i, 1);
        } else if (p.x > W + 30) {
          p.el.remove(); peas.splice(i, 1);
        }
      }
      zombies = zombies.filter(function (z) { return z.box.isConnected; });

      raf = requestAnimationFrame(frame);
    }

    function start() {
      if (running || document.hidden) return;
      running = true; last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() { running = false; cancelAnimationFrame(raf); }

    setup();
    // só corre enquanto o gramado está na tela e a aba está ativa
    var visible = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        visible ? start() : stop();
      }, { threshold: 0.05 }).observe(lawn);
    } else { visible = true; start(); }
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : (visible && start()); });
  }

  return { init: init };
})();
