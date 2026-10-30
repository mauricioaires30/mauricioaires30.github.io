/* =====================================================================
 * Pixel art em código. Cada sprite é uma grade de caracteres:
 * "." = transparente, qualquer outra letra aponta para a paleta (pal).
 * Para criar um novo, adicione uma entrada em SPRITES e use
 * <span data-sprite="nome" data-scale="4"></span> no HTML.
 * ===================================================================== */
const SPRITES = {
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
  sunflower: {
    pal: { Y: "#ffc83d", B: "#7a4a1d", k: "#2a1a0a", G: "#4c9a2a" },
    rows: [
      "....YYY....",
      "..YYYYYYY..",
      ".YYYBBBYYY.",
      ".YYBBBBBYY.",
      ".YYBkBkBYY.",
      ".YYBBBBBYY.",
      ".YYYBBBYYY.",
      "..YYYYYYY..",
      "....YYY....",
      ".....G.....",
      "..GG.G.GG..",
      "...GGGGG...",
      ".....G.....",
      ".....G....."
    ]
  },
  creeper: {
    pal: { G: "#4c9a2a", g: "#6cc24a", k: "#101810" },
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
  planet: {
    pal: { P: "#4a86d8", G: "#5fae52", O: "#e8a24a", s: "#8fb8f0" },
    rows: [
      "...PPPP...",
      ".PsPPPPPP.",
      ".PGGPPPPP.",
      "PGGGPPPPPP",
      "PPGPPPPOOP",
      "PPPPPPOOOP",
      "PPPPPPPOPP",
      ".PPPPPPPP.",
      ".PPPPPPPP.",
      "...PPPP..."
    ]
  },
  campfire: {
    pal: { O: "#f2761e", Y: "#ffc83d", W: "#fff3c4", B: "#6b4423", b: "#4a2f17" },
    rows: [
      ".....O....",
      "....OOO...",
      "...OYYOO..",
      "...OYYYO..",
      "..OOYYYOO.",
      "..OYYYYYO.",
      ".OOYYWYYOO",
      "..BBBBBB..",
      ".BbBBBBbB.",
      "BB......BB"
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
    pal: { M: "#cfd6ff" },
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
    rows: [
      "..W..",
      "..W..",
      "WWWWW",
      "..W..",
      "..W.."
    ]
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
  note: {
    pal: { X: "#2b2418" },
    rows: [
      "..XXXXXX",
      "..XXXXXX",
      "..X....X",
      "..X....X",
      "..X....X",
      "XXX..XXX",
      "XXX..XXX",
      ".X....X."
    ]
  },
  cross: {
    pal: { R: "#e53935" },
    rows: [
      "..RRR..",
      "..RRR..",
      "RRRRRRR",
      "RRRRRRR",
      "RRRRRRR",
      "..RRR..",
      "..RRR.."
    ]
  },
  container: {
    pal: { R: "#d8453a", r: "#a8302a" },
    rows: [
      "RRRRRRRRRR",
      "RrRrRrRrRR",
      "RrRrRrRrRR",
      "RrRrRrRrRR",
      "RrRrRrRrRR",
      "RRRRRRRRRR"
    ]
  },
  leaf: {
    pal: { G: "#4c9a2a", g: "#8fd16a", D: "#6b4423" },
    rows: [
      "......GG",
      ".....GGG",
      "....GGgG",
      "...GGgGG",
      "..GGgGG.",
      ".GGgGG..",
      "GGgGG...",
      "Dg......"
    ]
  },
  grass: {
    pal: { g: "#6cc24a", G: "#4c9a2a", D: "#7a4f27", d: "#5e3b1c" },
    rows: [
      "gGgGgGgG",
      "GgGGgGGg",
      "DdDDdDDD",
      "DDDdDDdD"
    ]
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
  }
};

/* Monta o <svg> de um sprite (retângulos agrupados por linha para ficar leve). */
function spriteSVG(name, scale, palOverride) {
  var s = SPRITES[name];
  if (!s) return "";
  var pal = Object.assign({}, s.pal, palOverride || {});
  var h = s.rows.length;
  var w = s.rows[0].length;
  var rects = "";
  s.rows.forEach(function (row, y) {
    var x = 0;
    while (x < w) {
      var c = row[x];
      if (c === ".") { x++; continue; }
      var start = x;
      while (x < w && row[x] === c) x++;
      rects += '<rect x="' + start + '" y="' + y + '" width="' + (x - start) + '" height="1" fill="' + pal[c] + '"/>';
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
