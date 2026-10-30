/* =====================================================================
 * Escrita nomai (Outer Wilds).
 * Cada conversa é uma árvore de espirais: a primeira frase é a espiral
 * principal e as respostas brotam dela, curvando para o outro lado, como
 * nas paredes do jogo. O traço é tremido por um filtro SVG (nomai-fuzz)
 * e, ao "traduzir", o brilho percorre cada espiral do início ao centro;
 * uma resposta só acende quando o brilho chega no ponto de onde ela sai.
 * Tudo sai de uma semente, então cada conversa fica igual em toda visita.
 * ===================================================================== */
var NOMAI_SPEED = 120;   // unidades por segundo ao traduzir

function nomaiConversationSVG(seed) {
  var state = seed * 9301 + 49297;
  function rand() { state = (state * 9301 + 49297) % 233280; return state / 233280; }

  var spirals = [];
  var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

  function f(n) { return n.toFixed(1); }

  /* Espiral que começa em (sx, sy) indo na direção `heading` e se enrola
   * para dentro (dir = 1 horário, -1 anti-horário). `start` é o segundo
   * em que o brilho da tradução chega ao início dela. */
  function spiral(sx, sy, heading, dir, R0, turns, depth, start) {
    var steps = Math.round(70 + turns * 40);
    var T = turns * 2 * Math.PI;
    var k = Math.log(14) / T;                     // termina com raio R0/14
    var a0 = heading - dir * Math.PI / 2;         // ângulo do centro até o início
    var cx = sx - R0 * Math.cos(a0);
    var cy = sy - R0 * Math.sin(a0);

    var pts = [], lengths = [0];
    for (var i = 0; i <= steps; i++) {
      var t = i / steps * T;
      var r = R0 * Math.exp(-k * t);
      var a = a0 + dir * t;
      var px = cx + r * Math.cos(a), py = cy + r * Math.sin(a);
      if (i) lengths.push(lengths[i - 1] + Math.hypot(px - pts[i - 1][0], py - pts[i - 1][1]));
      pts.push([px, py]);
      if (px < minX) minX = px;
      if (py < minY) minY = py;
      if (px > maxX) maxX = px;
      if (py > maxY) maxY = py;
    }
    var total = lengths[steps];
    spirals.push({ pts: pts, start: start, dur: total / NOMAI_SPEED });

    // respostas: brotam da parte de fora da espiral e curvam para o outro lado
    if (depth < 3) {
      var count = depth === 0 ? 2 + Math.floor(rand() * 2) : depth === 1 ? 1 + Math.floor(rand() * 2) : (rand() < 0.5 ? 1 : 0);
      var used = [];
      for (var b = 0; b < count; b++) {
        var idx = Math.floor(steps * (0.08 + rand() * 0.42));
        if (used.some(function (u) { return Math.abs(u - idx) < steps * 0.1; })) continue;
        used.push(idx);
        var p = pts[idx], q = pts[idx + 1];
        var tang = Math.atan2(q[1] - p[1], q[0] - p[0]);
        var head = tang - dir * (0.5 + rand() * 0.6);
        var radius = R0 * Math.exp(-k * idx / steps * T);
        if (radius * 0.5 < 10) continue;                 // pequena demais: vira um borrão
        spiral(p[0], p[1], head, -dir, radius * (0.5 + rand() * 0.2), 1.3 + rand() * 0.7, depth + 1,
          start + (lengths[idx] / total) * (total / NOMAI_SPEED));
      }
    }
  }

  spiral(0, 0, rand() * Math.PI * 2, rand() < 0.5 ? 1 : -1, 100, 2 + rand() * 0.6, 0, 0);

  var pad = 8;
  var vb = [minX - pad, minY - pad, maxX - minX + pad * 2, maxY - minY + pad * 2].map(f).join(' ');

  var base = '', glow = '';
  spirals.forEach(function (s) {
    var d = 'M' + s.pts.map(function (p) { return f(p[0]) + ' ' + f(p[1]); }).join(' L');
    base += '<path d="' + d + '"/>';
    glow += '<path pathLength="1" style="animation-delay:' + s.start.toFixed(2) + 's;animation-duration:' + s.dur.toFixed(2) + 's" d="' + d + '"/>';
  });

  return '<svg class="nomai-svg" xmlns="http://www.w3.org/2000/svg" viewBox="' + vb + '" aria-hidden="true" focusable="false">' +
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" filter="url(#nomai-fuzz)">' +
    '<g class="nomai-base" stroke-width="2.6">' + base + '</g>' +
    '<g class="nomai-glow" stroke-width="2.8">' + glow + '</g>' +
    '</g></svg>';
}

/* Filtro que deixa o traço tremido (definido uma vez na página). */
function nomaiDefs() {
  return '<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>' +
    '<filter id="nomai-fuzz" x="-5%" y="-5%" width="110%" height="110%">' +
    '<feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="noise"/>' +
    '<feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G"/>' +
    '</filter></defs></svg>';
}
