/* =====================================================================
 * Escrita nomai (Outer Wilds), desenhada por código.
 * Uma única corrente de conversas desce pela página inteira: cada texto
 * (espiral) nasce num galho do texto anterior, ligado por uma curva, e
 * cada espiral tem respostas (galhos) que também são espirais. Como é um
 * desenho só, que cobre a página toda, nada é cortado na troca de seção.
 * Tudo sai de uma semente, então fica igual em toda visita.
 * ===================================================================== */
function nomaiChainSVG(W, H, seed) {
  var state = seed * 9301 + 49297;
  function rand() { state = (state * 9301 + 49297) % 233280; return state / 233280; }
  function f(n) { return n.toFixed(1); }

  var mobile = W < 700;
  var baseR = Math.max(64, Math.min(150, W * 0.095));
  var step = mobile ? 360 : 470;
  var paths = [];
  var maxDepth = mobile ? 1 : 2;

  /* Espiral que começa em (sx, sy) indo na direção `heading` e se enrola para
   * dentro (dir = 1 ou -1). Devolve os pontos para ligar galhos e pontes. */
  function spiral(sx, sy, heading, dir, R0, turns, depth, width) {
    var steps = Math.round(60 + turns * 36);
    var T = turns * 2 * Math.PI;
    var k = Math.log(13) / T;
    var a0 = heading - dir * Math.PI / 2;
    var cx = sx - R0 * Math.cos(a0), cy = sy - R0 * Math.sin(a0);
    var pts = [];
    for (var i = 0; i <= steps; i++) {
      var t = i / steps * T, r = R0 * Math.exp(-k * t), a = a0 + dir * t;
      pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a), r]);
    }
    paths.push({ d: 'M' + pts.map(function (p) { return f(p[0]) + ' ' + f(p[1]); }).join(' L'), w: width });

    if (depth < maxDepth) {
      var count = depth === 0 ? (mobile ? 2 : 2 + Math.floor(rand() * 2)) : (rand() < 0.6 ? 1 : 0);
      var used = [];
      for (var b = 0; b < count; b++) {
        var idx = Math.floor(steps * (0.07 + rand() * 0.4));
        if (used.some(function (u) { return Math.abs(u - idx) < steps * 0.09; })) continue;
        used.push(idx);
        var p = pts[idx], q = pts[idx + 1];
        var tang = Math.atan2(q[1] - p[1], q[0] - p[0]);
        var head = tang - dir * (0.5 + rand() * 0.6);
        var radius = p[2] * (0.46 + rand() * 0.18);
        if (radius < 14) continue;
        spiral(p[0], p[1], head, -dir, radius, 1.3 + rand() * 0.7, depth + 1, width * 0.88);
      }
    }
    return pts;
  }

  /* Curva ligando um galho de uma espiral ao começo da próxima. */
  function bridge(p, tangent, q, arrival, width) {
    var dist = Math.hypot(q[0] - p[0], q[1] - p[1]);
    var d = dist * 0.42;
    var c1 = [p[0] + Math.cos(tangent) * d, p[1] + Math.sin(tangent) * d];
    var c2 = [q[0] - Math.cos(arrival) * d, q[1] - Math.sin(arrival) * d];
    paths.push({ d: 'M' + f(p[0]) + ' ' + f(p[1]) + ' C' + f(c1[0]) + ' ' + f(c1[1]) + ' ' + f(c2[0]) + ' ' + f(c2[1]) + ' ' + f(q[0]) + ' ' + f(q[1]), w: width });
  }

  var width = mobile ? 1.9 : 2.5;
  var prev = null, y = mobile ? 120 : 210, i = 0;
  while (y < H - 140) {
    var left = i % 2 === 0;
    var R = baseR * (0.85 + rand() * 0.3);
    var x = left ? W * (0.03 + rand() * 0.09) : W * (0.88 + rand() * 0.09);
    var heading, dir = rand() < 0.5 ? 1 : -1;

    if (prev) {
      // sai de um ponto de baixo da espiral anterior e chega na próxima
      var bi = 0;
      for (var j = 3; j < prev.length * 0.55; j++) if (prev[j][1] > prev[bi][1]) bi = j;
      var p = prev[bi], pn = prev[bi + 1];
      var tang = Math.atan2(pn[1] - p[1], pn[0] - p[0]);
      var q = [x, y];
      var toward = Math.atan2(q[1] - p[1], q[0] - p[0]);
      var diff = Math.atan2(Math.sin(toward - tang), Math.cos(toward - tang));
      if (Math.abs(diff) > Math.PI / 2) tang += Math.PI;      // segue o sentido que aponta para a próxima
      heading = toward + (rand() - 0.5) * 0.5;
      bridge(p, tang, q, heading, width);
    } else {
      heading = Math.PI * (0.25 + rand() * 0.5);
    }
    prev = spiral(x, y, heading, dir, R, 2 + rand() * 0.5, 0, width);
    y += step * (0.88 + rand() * 0.24);
    i++;
  }

  var body = paths.map(function (p) { return '<path stroke-width="' + p.w.toFixed(2) + '" d="' + p.d + '"/>'; }).join('');
  return '<svg class="nomai-svg" xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H +
    '" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" filter="url(#nomai-fuzz)">' +
    body + '</g></svg>';
}

/* Filtro que deixa o traço tremido (definido uma vez na página). */
function nomaiDefs() {
  return '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
    '<filter id="nomai-fuzz" x="0" y="0" width="100%" height="100%">' +
    '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="4" result="noise"/>' +
    '<feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G"/>' +
    '</filter></defs></svg>';
}
