/* =====================================================================
 * Pixel art em código (ícones dos projetos, itens do inventário, céu…).
 * A arte dos jogos (Minecraft, Outer Wilds, PvZ, Deltarune, Terraria) fica em
 * assets/games e é listada em GAME_ART, no fim deste arquivo.
 * Cada sprite é uma grade de caracteres:
 * "." = transparente, qualquer outra letra aponta para a paleta (pal).
 * "outline" (opcional) desenha um contorno de 1px em volta do sprite.
 * Para usar: <span data-sprite="nome" data-scale="4"></span> no HTML.
 * ===================================================================== */
const SPRITES = {
  /* ---------- Interface ---------- */
  daysun: {
    pal: { Y: "#ffc83d" },
    rows: [
      "....Y....",
      ".Y..Y..Y.",
      "..YYYYY..",
      "..YYYYY..",
      "YYYYYYYYY",
      "..YYYYY..",
      "..YYYYY..",
      ".Y..Y..Y.",
      "....Y...."
    ]
  },
  moon: {
    pal: { M: "#5a63c9" },
    rows: [
      "...MMM..",
      "..MMM...",
      ".MMM....",
      ".MMM....",
      ".MMM....",
      ".MMMM...",
      "..MMMMM.",
      "...MMM.."
    ]
  },
  star: {
    pal: { W: "#ffffff" },
    rows: ["..W..", "..W..", "WWWWW", "..W..", "..W.."]
  },
  cloud: {
    pal: { W: "#ffffff", s: "#dbeffa" },
    rows: [
      "......WWWW......",
      "...WWWWWWWWW....",
      "..WWWWWWWWWWWW..",
      ".WWWWWWWWWWWWWWW",
      "WWWWWWWWWWWWWWWW",
      "sssssssssssssss."
    ]
  },

  /* ---------- Ícones dos projetos ---------- */
  note: {
    pal: { X: "#a77bff", h: "#e0d0ff" },
    outline: "#2a1a55",
    rows: [
      "..XXXXXX",
      "..XhhhhX",
      "..X....X",
      "..X....X",
      "..X....X",
      "XXX..XXX",
      "XhX..XhX",
      ".X....X."
    ]
  },
  /* cruz vermelha (R1 Academy): cor única, sem brilho */
  cross: {
    pal: { R: "#e53935" },
    outline: "#4a0f0d",
    rows: [
      "...RRR...",
      "...RRR...",
      "...RRR...",
      "RRRRRRRRR",
      "RRRRRRRRR",
      "RRRRRRRRR",
      "...RRR...",
      "...RRR...",
      "...RRR..."
    ]
  },
  /* estrela do ícone do HelperValley */
  hvstar: {
    pal: { o: "#72240c", Y: "#ffff18", y: "#efc90b" },
    rows: [
      "....oo..",
      "...oYo..",
      "oooyYooo",
      "oYYYYYYo",
      ".oyYYyo.",
      ".oYyyYo.",
      "oYyooyYo",
      "ooo..ooo"
    ]
  },
  containers: {
    pal: { R: "#d8453a", r: "#a8302a", B: "#3d7de0", b: "#2a58a8", Y: "#f5c518", y: "#c99a0c" },
    outline: "#1d1d1d",
    rows: [
      "...RRRRRRRR...",
      "...RrRrRrRr...",
      "...RrRrRrRr...",
      "BBBBBBBYYYYYYY",
      "BbBbBbBYyYyYyY",
      "BbBbBbBYyYyYyY",
      "BBBBBBBYYYYYYY"
    ]
  },
  /* Flor da vitoria-regia vista de cima (icone do Tekoha), com uma folha no canto */
  victoria: {
    pal: { a: "#d93f8e", b: "#ef6fb0", c: "#ffa6d0", d: "#fff0f7", k: "#8f1d5e", g: "#c2297a", L: "#3f9a3a", l: "#2a6f2d" },
    outline: "#4a1530",
    rows: [
      ".............a.............",
      "............aaa............",
      "............aaa............",
      "......aaa..aakaa..aaa......",
      ".....aaaaa.akbka.aaaaa.....",
      ".....aaaaaakbbbkaaaaaa.....",
      "......kkkkakbbbkakkkk......",
      "......bbbbkbbbbbkbbbb......",
      "...aaakbbkckkbkkckbbkaaa...",
      ".aaaaakbbkccckccckbbkaaaaa.",
      ".aaaaaakbkcckkkcckbkaaaaaa.",
      "..aaakkbkccgdgdgcckbkkaaa..",
      "...akbbkcckdgggdkcckbbka...",
      "...kbbkccckggdggkccckbbk...",
      "...akbbkcckdgggdkcckbbka...",
      "..aaakkbkccgdgdgcckbkkaaa..",
      ".aaaaaakbkcckkkcckbkaaaaaa.",
      ".aaaaakbbkccckccckbbkaaaaa.",
      "...aaakbbkckkbkkckbbkaaa...",
      "Ll....bbbbkbbbbbkbbbb......",
      "LLl...kkkkakbbbkakkkk......",
      "LLLl.aaaaaakbbbkaaaaaa.....",
      "LLLLlaaaaa.akbka.aaaaa.....",
      "LLLLLlaaa..aakaa..aaa......",
      "LLLLLLl.....aaa............",
      "LLLLLLLl....aaa............",
      "LLLLLLLL.....a............."
    ]
  }
};

/* Monta o <svg> de um sprite (retângulos agrupados por linha para ficar leve). */
function spriteSVG(name, scale, palOverride, outlineOverride) {
  var s = SPRITES[name];
  if (!s) return "";
  var pal = Object.assign({}, s.pal, palOverride || {});
  var outline = outlineOverride || s.outline;
  var rows = s.rows;

  if (outline) {
    var ow = rows[0].length, oh = rows.length;
    var orig = function (x, y) { return x >= 0 && y >= 0 && x < ow && y < oh && rows[y][x] !== "."; };
    var padded = [];
    for (var y = -1; y <= oh; y++) {
      var line = "";
      for (var x = -1; x <= ow; x++) {
        if (orig(x, y)) line += rows[y][x];
        else if (orig(x - 1, y) || orig(x + 1, y) || orig(x, y - 1) || orig(x, y + 1)) line += "#";
        else line += ".";
      }
      padded.push(line);
    }
    rows = padded;
    pal["#"] = outline;
  }

  var h = rows.length, w = rows[0].length, rects = "";
  rows.forEach(function (row, yy) {
    var xx = 0;
    while (xx < w) {
      var c = row[xx];
      if (c === ".") { xx++; continue; }
      var start = xx;
      while (xx < w && row[xx] === c) xx++;
      rects += '<rect x="' + start + '" y="' + yy + '" width="' + (xx - start) + '" height="1" fill="' + pal[c] + '"/>';
    }
  });
  var size = scale ? ' width="' + w * scale + '" height="' + h * scale + '"' : "";
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + " " + h + '"' + size +
    ' shape-rendering="crispEdges" aria-hidden="true" focusable="false">' + rects + "</svg>";
}

/* ---------- Arte dos jogos (arquivos em assets/games) ----------
 * w/h = tamanho natural do arquivo em pixels. A escala multiplica esse tamanho
 * (escala 1 = tamanho natural). pixel: true mantem os pixels nitidos ao ampliar. */
function art(file, w, h, pixel, card) { return { src: "assets/games/" + file, w: w, h: h, pixel: !!pixel, card: !!card }; }

const GAME_ART = {
  /* Deltarune (sprites oficiais, pixel art) e a SOUL, igual nos dois jogos do Toby Fox */
  soul:        art("ut-soul.png", 16, 16, true),
  dr_kris:     art("dr-kris.png", 38, 74, true),
  dr_lancer:   art("dr-lancer.png", 60, 68, true),
  dr_ralsei:   art("dr-ralsei.png", 46, 86, true),
  dr_spamton:  art("dr-spamton.webp", 64, 76, true),
  dr_aqua:     art("dr-aqua.webp", 52, 68, true),

  /* Terraria */
  tr_guide:    art("tr-guide.png", 26, 46, true),
  tr_life:     art("tr-life-crystal.png", 32, 32, true),
  tr_wizard:   art("tr-wizard.png", 34, 54, true),
  tr_slime:    art("tr-blue-slime.png", 32, 22, true),
  tr_star:     art("tr-fallen-star.png", 22, 24, true),
  tr_eoc:      art("tr-eye-of-cthulhu.gif", 110, 162, true),
  tr_duke:     art("tr-duke-fishron.webp", 196, 144, true),

  /* Plants vs. Zombies */
  sun:         art("pvz-sun.png", 94, 97),
  sunflower:   art("pvz2-sunflower.webp", 201, 218),
  pvz_wallnut: art("pvz-wall-nut.png", 170, 197),

  /* Minecraft: so a frente das cabecas dos mobs e alguns itens */
  mc_face_creeper:  art("mc-face-creeper.png", 8, 8, true),
  mc_face_skeleton: art("mc-face-skeleton.png", 8, 8, true),
  mc_face_zombie:   art("mc-face-zombie.png", 8, 8, true),
  mc_diamond:       art("mc-diamond.png", 16, 16, true),
  mc_cake:          art("mc-cake.png", 16, 16, true),
  mc_totem:         art("mc-totem.png", 14, 15, true),
  mc_gapple:        art("mc-golden-apple.png", 12, 14, true),
  mc_pearl:         art("mc-ender-pearl.png", 13, 13, true),

  /* Outer Wilds: planetas (recortes do mapa planetario oficial), naves e cometa */
  ow_timber    : art("ow-timber-hearth.png", 99, 99),
  ow_attlerock : art("ow-attlerock.png", 43, 44),
  ow_giants    : art("ow-giants-deep.png", 262, 262),
  ow_brittle   : art("ow-brittle-hollow.png", 108, 132),
  ow_lantern   : art("ow-hollows-lantern.png", 59, 68),
  ow_bramble   : art("ow-dark-bramble.png", 241, 263),
  ow_twins     : art("ow-hourglass-twins.png", 68, 128),
  ow_quantum   : art("ow-quantum-moon.png", 58, 58),
  ow_interloper: art("map-interloper.png", 336, 220),
  ow_stranger:   art("ow-stranger.png", 227, 231),
  ow_sun       : art("map-sun.png", 343, 342),
  ow_station   : art("ow-sun-station.png", 300, 202),
  ow_cannon    : art("ow-probe-cannon.png", 100, 77),
  ow_eye_symbol: art("ow-eye-symbol.png", 360, 360),
  ow_ship:       art("ow-ship.png", 27, 26, true),
  ow_ventures:   art("ow-ventures.png", 160, 125)
};

/* HTML de um sprite: usa a arte do jogo se existir, senao o pixel art em codigo. */
function spriteHTML(name, scale) {
  var a = GAME_ART[name];
  if (!a) return spriteSVG(name, scale);
  return '<img src="' + a.src + '" width="' + Math.round(a.w * scale) + '" height="' + Math.round(a.h * scale) +
    '" alt="" class="art' + (a.pixel ? ' art--pixel' : '')  + '" loading="lazy" decoding="async">';
}
