/* =====================================================================
 * Cena do rodapé: uma ervilheira (Plants vs. Zombies) à esquerda atira em
 * zumbis que entram pela direita, em cima dos blocos de grama do Minecraft.
 * As animações são as oficiais do jogo (assets/games/pvz-*.webp); o código só
 * move os elementos. A ervilheira sempre vence: os zumbis são devagar e ainda
 * existe uma linha de segurança que derruba qualquer um que chegue perto.
 * ===================================================================== */
var Lawn = (function () {
  'use strict';

  var DIR = 'assets/games/';
  /* hp = tiros para derrubar; speed = px/s num palco de 1200px de largura */
  var TYPES = {
    zombie:     { src: 'pvz-zombie.webp',     w: 73,  h: 123, hp: 4,  speed: 24 },
    cone:       { src: 'pvz-conehead.webp',   w: 73,  h: 141, hp: 7,  speed: 22 },
    bucket:     { src: 'pvz-buckethead.webp', w: 78,  h: 139, hp: 10, speed: 20 },
    football:   { src: 'pvz-football.webp',   w: 122, h: 139, hp: 9,  speed: 42 },
    gargantuar: { src: 'pvz-gargantuar.webp', w: 148, h: 176, hp: 30, speed: 15, boss: true, die: 'pvz-gargantuar_die.webp', dieMs: 2300 }
  };
  var COMMON = ['zombie', 'zombie', 'cone', 'cone', 'bucket', 'football'];
  var SHOOT_EVERY = 0.9;        // segundos entre tiros
  var PEA_SPEED = 430;          // px/s

  function init() {
    var lawn = document.getElementById('lawn');
    if (!lawn) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) { lawn.hidden = true; return; }

    var W = 0, k = 1, speedK = 1;
    var shooter, shooterW = 100, shooterH = 103;
    var zombies = [], peas = [];
    var running = false, raf = 0, last = 0, fireAcc = 0, spawnIn = 1.4, spawned = 0;

    function measure() {
      W = lawn.clientWidth;
      k = W < 700 ? 0.72 : 1;
      speedK = Math.max(0.3, W / 1200);
    }

    function setup() {
      measure();
      shooter = document.createElement('img');
      shooter.className = 'pvz-shooter';
      shooter.src = DIR + 'pvz-peashooter.webp';
      shooter.alt = '';
      shooter.style.width = Math.round(shooterW * k) + 'px';
      lawn.appendChild(shooter);
    }

    function spawn(name) {
      var t = TYPES[name];
      var box = document.createElement('div');
      box.className = 'pvz-zombie';
      var img = document.createElement('img');
      img.alt = ''; img.src = DIR + t.src;
      img.style.width = Math.round(t.w * k) + 'px';
      box.appendChild(img);
      lawn.appendChild(box);
      var z = { t: t, box: box, img: img, x: W + 10, w: t.w * k, hp: t.hp, dying: false };
      box.style.transform = 'translate3d(' + z.x + 'px,0,0)';
      zombies.push(z);
    }

    function die(z) {
      z.dying = true;
      if (z.t.die) {
        z.img.src = DIR + z.t.die;                       // animação oficial de morte do Gargantuar
        z.img.style.width = Math.round(307 * 0.95 * k) + 'px';
        z.box.style.marginLeft = Math.round(-z.w * 0.6) + 'px';
        setTimeout(function () { z.img.classList.add('pvz-fade'); }, z.t.dieMs - 500);
        setTimeout(function () { z.box.remove(); }, z.t.dieMs + 300);
      } else {
        z.img.classList.add('pvz-fall');                 // queda simples (sem animação de morte oficial)
        setTimeout(function () { z.box.remove(); }, 800);
      }
    }

    function frontZombie() {
      var best = null;
      zombies.forEach(function (z) { if (!z.dying && z.x < W - 6 && (!best || z.x < best.x)) best = z; });
      return best;
    }

    function shoot() {
      var p = document.createElement('img');
      p.className = 'pvz-pea'; p.alt = ''; p.src = DIR + 'pvz-pea.png';
      var size = Math.round(24 * k);
      p.style.width = size + 'px';
      var x = 8 + shooterW * k * 0.78;
      p.style.bottom = Math.round(shooterH * k * 0.58) + 'px';
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
      var safeX = 8 + shooterW * k + 40;
      alive.forEach(function (z) {
        z.x -= z.t.speed * speedK * dt;
        z.box.style.transform = 'translate3d(' + z.x + 'px,0,0)';
        if (z.x < safeX) die(z);
      });

      // tiros
      var target = frontZombie();
      if (target) {
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
        if (hitZ && p.x >= hitZ.x + hitZ.w * 0.3) {
          hitZ.hp -= 1;
          hitZ.img.classList.add('pvz-hit');
          (function (z) { setTimeout(function () { z.img.classList.remove('pvz-hit'); }, 110); })(hitZ);
          if (hitZ.hp <= 0) die(hitZ);
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
