/* =====================================================================
 * Pixel art em código (ícones dos projetos, itens do inventário, céu…).
 * A arte dos jogos (Minecraft, Outer Wilds, PvZ, Undertale) fica em
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
  cross: {
    pal: { R: "#e53935", h: "#ff8a80" },
    outline: "#4a0f0d",
    rows: [
      "..RhR..",
      "..RRR..",
      "RRRRRRR",
      "RhRRRRR",
      "RRRRRRR",
      "..RRR..",
      "..RRR.."
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
  /* Flor da vitória-régia (Victoria amazonica) sobre a folha */
  victoria: {
    pal: { P: "#f06aa8", p: "#c2297a", W: "#ffd6e8", G: "#2f7a33", g: "#58b85a", w: "#8fd3f0" },
    outline: "#243a24",
    rows: [
      ".........P.........",
      "........PPP........",
      ".......PPpPP.......",
      ".....PPPPpPPPP.....",
      "...PPWWPPpPPWWPP...",
      "..PWWWPPPpPPPWWWP..",
      "..PPWWPPPPPPPWWPP..",
      "....GGGGGGGGGGG....",
      "..GGGgggggggggGGG..",
      ".GGgggggggggggggGG.",
      "GGgggggggggggggggGG",
      ".GGGGGGGGGGGGGGGGG.",
      "...wwwwwwwwwwwww..."
    ]
  },


  /* ---------- Itens do inventário (linguagens) ---------- */
  item_python: {
    pal: { B: "#3776ab", Y: "#ffd43b", w: "#ffffff" },
    rows: [
      ".BBBBBB.....",
      "BBBBBBBB....",
      "BwBBBBBB....",
      "BBBBBBBB....",
      "BBBBYYYYYYY.",
      "BBBBYYYYYYYY",
      "....YYYYYYYY",
      "....YYYYYYYY",
      "....YYYYYwYY",
      "....YYYYYYYY",
      ".....YYYYYY."
    ]
  },
  item_java: {
    pal: { R: "#e8453c", B: "#2a6fb5" },
    rows: [
      "...R..R.....",
      "....R..R....",
      ".BBBBBBBB...",
      ".BBBBBBBBBB.",
      ".BBBBBBBB.BB",
      ".BBBBBBBB.BB",
      ".BBBBBBBBBB.",
      "..BBBBBBB...",
      "RRRRRRRRRRR."
    ]
  },
  item_gml: {
    pal: { P: "#6a4fc8", W: "#ffffff", Y: "#ffd43b", R: "#e8453c" },
    rows: [
      "..PPPPPPPP..",
      ".PPPPPPPPPP.",
      "PPPWPPPPPYPP",
      "PPWWWPPPYPRP",
      "PPPWPPPPPRPP",
      "PPPPPPPPPPPP",
      ".PPPP..PPPP.",
      "..PP....PP.."
    ]
  },
  item_godot: {
    pal: { B: "#478cbf", W: "#ffffff", k: "#1b2a3a", n: "#1b2a3a" },
    rows: [
      "..B......B..",
      ".BBB....BBB.",
      ".BBBBBBBBBB.",
      ".BBBBBBBBBB.",
      "BBWWBBBBWWBB",
      "BBWkBBBBWkBB",
      "BBWWBBBBWWBB",
      "BBBBBnnBBBBB",
      ".BBBBBBBBBB.",
      "..BBBBBBBB..",
      "...BBBBBB..."
    ]
  },
  item_js: {
    pal: { Y: "#f7df1e", X: "#1a1a1a" },
    rows: [
      "YYYYYYYYYYYY",
      "YYYYYYYYYYYY",
      "YYYYYYYYYYYY",
      "YYYYYYYYYYYY",
      "YYXXXYYXXXYY",
      "YYYYXYYXYYYY",
      "YYYYXYYXXXYY",
      "YYXYXYYYYXYY",
      "YYYXYYYXXXYY",
      "YYYYYYYYYYYY",
      "YYYYYYYYYYYY",
      "YYYYYYYYYYYY"
    ]
  },
  item_ts: {
    pal: { B: "#3178c6", W: "#ffffff" },
    rows: [
      "BBBBBBBBBBBB",
      "BBBBBBBBBBBB",
      "BBBBBBBBBBBB",
      "BBBBBBBBBBBB",
      "BBWWWBBWWWBB",
      "BBBWBBBWBBBB",
      "BBBWBBBWWWBB",
      "BBBWBBBBBWBB",
      "BBBWBBBWWWBB",
      "BBBBBBBBBBBB",
      "BBBBBBBBBBBB",
      "BBBBBBBBBBBB"
    ]
  },

  item_html: {
    pal: { H: "#e34f26", h: "#f06529", W: "#ffffff" },
    rows: [
      "HHHHHHhhhhhh",
      "HHHHHHhhhhhh",
      "HHHHWWWWhhhh",
      "HHHHWHhhhhhh",
      "HHHHWWWhhhhh",
      "HHHHHHhWhhhh",
      "HHHHHHhWhhhh",
      "HHHHWWWhhhhh",
      ".HHHHHhhhhh.",
      "..HHHHhhhh..",
      "...HHHhhh...",
      ".....Hh....."
    ]
  },
  item_css: {
    pal: { C: "#1572b6", c: "#33a9dc", W: "#ffffff" },
    rows: [
      "CCCCCCcccccc",
      "CCCCCCcccccc",
      "CCCCWWWWcccc",
      "CCCCCCcWcccc",
      "CCCCCWWWcccc",
      "CCCCCCcWcccc",
      "CCCCCCcWcccc",
      "CCCCWWWWcccc",
      ".CCCCCccccc.",
      "..CCCCcccc..",
      "...CCCccc...",
      ".....Cc....."
    ]
  },
  /* nave dos Hearthians (Outer Wilds), desenhada em pixel art */
  ship: {
    pal: { k: "#2a1d14", M: "#9aa0aa", m: "#61666f", W: "#c07a3e", w: "#8a5226", R: "#c94a3a", G: "#8fe3ff", g: "#3a8fb0" },
    rows: [
      "........kkkkkkk.......",
      "......kkMMMMMMMkk.....",
      "....kkWWWWWWWWWMMk....",
      "...kWWWWWWWWWWWMGGk...",
      "..kWWRRRRRWWWWWMGGGk..",
      "..kmWWWWWWWWWWWMgGGGk.",
      "..kmWWWWWWWWWWWMMMMMMk",
      "..kmwwwwwwwwwwwMMMMMk.",
      "..kmwwwwwwwwwwwmmmmk..",
      "...kwwwwwwwwwwwmmk....",
      "....kkkkkkkkkkkkk.....",
      ".....k.k.....k.k......",
      "....kk.kk...kk.kk....."
    ]
  },
  shipflame: {
    pal: { O: "#f2761e", Y: "#ffd23d", W: "#fff3c4" },
    rows: [
      "..OO",
      ".OYY",
      "OYWY",
      ".OYY",
      "..OO"
    ]
  },

  /* ---------- Outer Wilds ---------- */
  /* Fogueira com marshmallow no espeto */
  campfire: {
    pal: { O: "#f2761e", Y: "#ffc83d", W: "#fff3c4", B: "#6b4423", b: "#3f2814", s: "#8b5a2b", w: "#fff7e6", t: "#d9a066", T: "#8a5a2b" },
    rows: [
      "...................s",
      "..................s.",
      ".................s..",
      "................s...",
      "...........wwwws....",
      "..........wwwwww....",
      "..........twwwwt....",
      "...........tTTt.....",
      ".........OOYYOO.....",
      "........OOYYYYOO....",
      "........OYYWWYYO....",
      ".......OOYYWWYYOO...",
      "......OOYYYWWYYYOO..",
      ".....BBBBBBBBBBBBB..",
      "....BbBBBBBBBBBBbB..",
      "...BB............BB."
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

/* ---------- Arte dos jogos (PNGs em assets/games) ----------
 * w/h = tamanho base; a escala multiplica, igual aos sprites.
 * pixel: true mantém os pixels nítidos ao ampliar. */
const GAME_ART = {
  soul:         { src: "assets/games/ut-soul.png",           w: 16, h: 16, pixel: true },
  sun:          { src: "assets/games/pvz-sun.png",           w: 10, h: 10 },
  sunflower:    { src: "assets/games/pvz-sunflower.png",     w: 18, h: 20.3 },
  mc_creeper:   { src: "assets/games/mc-creeper-head.png",   w: 16, h: 16, pixel: true },
  mc_skeleton:  { src: "assets/games/mc-skeleton-skull.png", w: 16, h: 16, pixel: true },
  mc_zombie:    { src: "assets/games/mc-zombie-head.png",    w: 16, h: 16, pixel: true },
  mc_wither:    { src: "assets/games/mc-wither-skull.png",   w: 16, h: 16, pixel: true },
  mc_piglin:    { src: "assets/games/mc-piglin-head.png",    w: 16, h: 16, pixel: true },
  mc_torch:     { src: "assets/games/mc-torch.png",          w: 16, h: 16, pixel: true },
  mc_poppy:     { src: "assets/games/mc-poppy.png",          w: 16, h: 16, pixel: true },
  mc_dandelion: { src: "assets/games/mc-dandelion.png",      w: 16, h: 16, pixel: true },
  mc_campfire:  { src: "assets/games/mc-campfire.png",       w: 16, h: 16, pixel: true },
  /* planetas: arte ilustrada do mapa do sistema solar de Outer Wilds */
  ow_timber:     { src: "assets/games/ow-timber-hearth.png",   w: 16, h: 16.7 },
  ow_attlerock:  { src: "assets/games/ow-attlerock.png",       w: 6,  h: 6 },
  ow_giants:     { src: "assets/games/ow-giants-deep.png",     w: 16, h: 16 },
  ow_brittle:    { src: "assets/games/ow-brittle-hollow.png",  w: 16, h: 19.1 },
  ow_lantern:    { src: "assets/games/ow-hollows-lantern.png", w: 7,  h: 7.9 },
  ow_bramble:    { src: "assets/games/ow-dark-bramble.png",    w: 16, h: 17.3 },
  ow_twins:      { src: "assets/games/ow-hourglass-twins.png", w: 8,  h: 15.75 },
  ow_quantum:    { src: "assets/games/ow-quantum-moon.png",    w: 6,  h: 6 },
  ow_interloper: { src: "assets/games/ow-interloper.png",      w: 22, h: 10.2 },
  ow_ventures:   { src: "assets/games/ow-ventures.png",        w: 16, h: 12.5 },
  ow_eye:        { src: "assets/games/ow-eye-of-the-universe.webp", w: 16, h: 16 },
  ow_eye_symbol: { src: "assets/games/ow-eye-symbol.png",    w: 16, h: 13.1 }
};

/* HTML de um sprite: usa a arte do jogo se existir, senão o pixel art em código. */
function spriteHTML(name, scale) {
  var art = GAME_ART[name];
  if (!art) return spriteSVG(name, scale);
  return '<img src="' + art.src + '" width="' + Math.round(art.w * scale) + '" height="' + Math.round(art.h * scale) +
    '" alt="" class="art' + (art.pixel ? ' art--pixel' : '') + '" loading="lazy" decoding="async">';
}
