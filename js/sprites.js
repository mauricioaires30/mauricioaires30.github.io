/* =====================================================================
 * Pixel art em código. Cada sprite é uma grade de caracteres:
 * "." = transparente, qualquer outra letra aponta para a paleta (pal).
 * "outline" (opcional) desenha um contorno de 1px em volta do sprite.
 * Para usar: <span data-sprite="nome" data-scale="4"></span> no HTML.
 * ===================================================================== */
const SPRITES = {
  /* ---------- Interface ---------- */
  heart: {
    pal: { X: "#e53935", h: "#ff8a80" },
    rows: [
      ".XX...XX.",
      "XhXX.XXXX",
      "XXXXXXXXX",
      "XXXXXXXXX",
      ".XXXXXXX.",
      "..XXXXX..",
      "...XXX...",
      "....X...."
    ]
  },
  sun: {
    pal: { Y: "#ffc83d", y: "#ffe27a", O: "#f2a31e", W: "#fff7cf" },
    rows: [
      "...YYYY...",
      ".YYyyYYYY.",
      ".YyWWYYYY.",
      "YyWYYYYYYY",
      "YyYYYYYYYY",
      "YYYYYYYYOY",
      "YYYYYYYOOY",
      ".YYYYYOOY.",
      ".YYYYYYYY.",
      "...YYYY..."
    ]
  },
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

  /* ---------- Minecraft: cabeças de mobs (8x8, com contorno) ---------- */
  creeper: {
    pal: { G: "#4c9a2a", g: "#6cc24a", k: "#101810" },
    outline: "#0d1a0d",
    rows: [
      "GgGGgGGg",
      "gGGgGGgG",
      "GkkGGkkG",
      "GkkGgkkg",
      "gGGkkGGG",
      "GGkkkkGg",
      "gGkkkkGG",
      "GGkGGkGg"
    ]
  },
  skeleton: {
    pal: { W: "#d9d9d9", w: "#b4b4b4", k: "#2a2a2a" },
    outline: "#0d0d10",
    rows: [
      "WWWWWWWw",
      "WWWWWWWw",
      "WkkWWkkw",
      "WkkWWkkw",
      "WWWkkWWw",
      "WWWWWWWw",
      "WkWkWkWk",
      "wwwwwwww"
    ]
  },
  zombie: {
    pal: { d: "#2f6b2f", z: "#5aa04a", e: "#4a8a3c", k: "#1a2a5a", m: "#2f4a24" },
    outline: "#0d1a0d",
    rows: [
      "dddddddd",
      "dddddddd",
      "dzzzzzzd",
      "zkkzzkkz",
      "zzzzzzzz",
      "zzzmmzzz",
      "zzmmmmzz",
      "eeeeeeee"
    ]
  },
  pig: {
    pal: { p: "#f0a0a0", q: "#e08a8a", S: "#d97a7a", n: "#6a2a2a", w: "#ffffff", k: "#2a1010" },
    outline: "#3a1010",
    rows: [
      "pppppppp",
      "pppppppp",
      "pwkppkwp",
      "pppppppp",
      "ppSSSSpp",
      "ppnSSnpp",
      "ppSSSSpp",
      "qqqqqqqq"
    ]
  },
  torch: {
    pal: { O: "#f2761e", Y: "#ffc83d", W: "#fff3c4", B: "#8b5a2b", b: "#5e3b1c" },
    rows: [
      "..OO..",
      ".OYYO.",
      ".OYWO.",
      "..YY..",
      "..BB..",
      "..Bb..",
      "..BB..",
      "..Bb..",
      "..BB..",
      "..Bb.."
    ]
  },
  poppy: {
    pal: { R: "#d8282d", r: "#a31a1f", k: "#2a1a0a", G: "#3f8a2a" },
    rows: [
      "..RRR..",
      ".RRrRR.",
      ".RrkrR.",
      ".RRrRR.",
      "..RRR..",
      "...G...",
      "..GG...",
      "...GG..",
      "...G..."
    ]
  },
  dandelion: {
    pal: { Y: "#ffd933", y: "#f2b81a", k: "#7a5a0a", G: "#3f8a2a" },
    rows: [
      "..YYY..",
      ".YYyYY.",
      ".YykyY.",
      ".YYyYY.",
      "..YYY..",
      "...G...",
      "..GG...",
      "...GG..",
      "...G..."
    ]
  },
  grass: {
    pal: { g: "#6cc24a", G: "#4c9a2a", D: "#7a4f27", d: "#5e3b1c" },
    rows: ["gGgGgGgG", "GgGGgGGg", "DdDDdDDD", "DDDdDDdD"]
  },
  dirt: {
    pal: { D: "#7a4f27", d: "#5e3b1c", e: "#8d5f31" },
    rows: [
      "DDdDDeDD",
      "DeDDDDdD",
      "dDDDdDDD",
      "DDeDDDDe",
      "DDDDdDDD",
      "eDDDDDeD",
      "DdDDeDDD",
      "DDDdDDdD"
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
  },
  /* glifos nomai (escrita de Outer Wilds) */
  nomai1: {
    pal: { X: "#39d6c6" },
    rows: [
      "..XXXXX..",
      ".X.....X.",
      "X.......X",
      "X...X...X",
      "X.......X",
      ".X.....X.",
      "..XXXXX..",
      "....X....",
      "....X...."
    ]
  },
  nomai2: {
    pal: { X: "#39d6c6" },
    rows: [
      "XXXXXXXX.",
      "X......X.",
      "X.XXXX.X.",
      "X.X..X.X.",
      "X.X.XX.X.",
      "X.X....X.",
      "X.XXXXXX.",
      "X........",
      "........."
    ]
  },
  nomai3: {
    pal: { X: "#39d6c6" },
    rows: [
      "X.......X",
      ".X.....X.",
      "..X...X..",
      "...X.X...",
      "....X....",
      "....X....",
      "....X....",
      "..XXXXX..",
      "....X...."
    ]
  },
  nomai4: {
    pal: { X: "#39d6c6" },
    rows: [
      "..XX.XX..",
      ".X..X..X.",
      "X...X...X",
      "X...X...X",
      "X...X...X",
      ".X..X..X.",
      "..XX.XX..",
      "....X....",
      "..XXXXX.."
    ]
  },
  nomai5: {
    pal: { X: "#39d6c6" },
    rows: [
      "..XXXXX..",
      ".X.....X.",
      "X.XXXXX.X",
      "X.......X",
      "X.XXXXX.X",
      ".X.....X.",
      "..XXXXX..",
      "X.......X",
      "....X...."
    ]
  }
};

/* ---------- Sprites gerados por código ---------- */

/* Girassol: pétalas em círculo, rosto, caule e folhas (com simetria perfeita). */
(function () {
  var W = 19, H = 28, cx = 9, cy = 9;
  var g = [];
  for (var y = 0; y < H; y++) { g.push([]); for (var x = 0; x < W; x++) g[y].push("."); }

  for (y = 0; y < 19; y++) {
    for (x = 0; x < W; x++) {
      var dx = x - cx, dy = y - cy;
      var r = Math.sqrt(dx * dx + dy * dy), a = Math.atan2(dy, dx);
      var R = 7.4 + 1.9 * Math.cos(10 * a);
      if (r <= 4.9) g[y][x] = (r > 4.0 || dx + dy > 4) ? "b" : "B";
      else if (r <= R) g[y][x] = dx + dy < -5 ? "y" : (dx + dy > 5 ? "O" : "Y");
    }
  }
  [[7, 7], [7, 8], [11, 7], [11, 8], [7, 10], [8, 11], [9, 11], [10, 11], [11, 10]].forEach(function (p) { g[p[1]][p[0]] = "k"; });
  // caule
  for (y = 19; y < H; y++) { g[y][8] = "S"; g[y][9] = "s"; g[y][10] = "S"; }
  // folhas
  [[22, 5, 7], [23, 3, 7], [24, 4, 7], [25, 6, 7]].forEach(function (l) {
    for (var xx = l[1]; xx <= l[2]; xx++) { g[l[0]][xx] = "S"; g[l[0]][W - 1 - xx] = "S"; }
  });
  [[22, 6], [23, 5], [23, 4]].forEach(function (p) { g[p[0]][p[1]] = "s"; g[p[0]][W - 1 - p[1]] = "s"; });

  SPRITES.sunflower = {
    pal: { Y: "#ffcc2e", y: "#ffe680", O: "#f2a21b", B: "#7b4a22", b: "#5c3517", k: "#2a1608", S: "#3f9a2a", s: "#62c241" },
    outline: "#3b2208",
    rows: g.map(function (row) { return row.join(""); })
  };
})();

/* Planetas de Outer Wilds (esferas com continentes, geradas por ruído simples). */
function makePlanet(d, pal, seed, thr) {
  var rad = d / 2, rows = [];
  for (var y = 0; y < d; y++) {
    var row = "";
    for (var x = 0; x < d; x++) {
      var dx = x + 0.5 - rad, dy = y + 0.5 - rad, dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > rad) { row += "."; continue; }
      var n = (Math.sin((x + seed) * 1.1) + Math.cos((y - seed) * 0.9) + Math.sin((x + y + seed) * 0.7)) / 3;
      var land = n > thr, shade = (dx + dy) / rad;
      var c = land ? "L" : "B";
      if (shade > 0.75) c = land ? "l" : "D";
      else if (shade < -0.95 && !land) c = "H";
      row += c;
    }
    rows.push(row);
  }
  return { pal: pal, rows: rows, outline: "#0d0d18" };
}
SPRITES.timber = makePlanet(14, { B: "#3f78d6", L: "#58b04c", D: "#2c55a0", l: "#3d8236", H: "#7fa8ee" }, 3, 0.12);
SPRITES.brittle = makePlanet(10, { B: "#8d86a8", L: "#6b6585", D: "#615a7d", l: "#4a4563", H: "#b6b0cf" }, 7, 0.2);
SPRITES.giants = makePlanet(12, { B: "#2f9e8f", L: "#7fd6c2", D: "#1f6f66", l: "#4fa393", H: "#aef0e0" }, 11, 0.05);
SPRITES.ember = makePlanet(8, { B: "#e0742a", L: "#f2a550", D: "#a3501a", l: "#c27a33", H: "#ffc88a" }, 5, 0.25);

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

/* Versão em data URI, usada em background-image do CSS. */
function spriteURL(name, scale) {
  return 'url("data:image/svg+xml,' + encodeURIComponent(spriteSVG(name, scale)) + '")';
}
