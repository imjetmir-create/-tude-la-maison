/* Outils communs : hasard, écriture des nombres, opérations en colonnes, dessins SVG.
   Écrit en JavaScript « ancien » (ES5) pour le navigateur de la TV. */
var U = (function () {
  "use strict";

  /* ---------- Hasard et nombres ---------- */
  function R(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function round(x) { return Math.round(x * 1000) / 1000; }
  // 4527 · 12'500 · 3,75 (écriture suisse romande)
  function fmt(n) {
    n = round(n);
    var neg = n < 0, s = String(Math.abs(n)), p = s.split("."), ip = p[0];
    if (ip.length > 4) ip = ip.replace(/\B(?=(\d{3})+(?!\d))/g, "'");
    return (neg ? "−" : "") + ip + (p[1] ? "," + p[1] : "");
  }
  function money(n) { return round(n).toFixed(2).replace(".", ",") + " fr."; }
  function decs(n) { var s = String(round(n)), i = s.indexOf("."); return i < 0 ? 0 : s.length - i - 1; }
  function digits(n, dp) { return round(n).toFixed(dp).replace(".", ""); }
  function big(s) { return '<div class="big">' + s + "</div>"; }
  function frac(a, b) { return '<span class="frac"><span>' + a + "</span><span>" + b + "</span></span>"; }

  /* ---------- Questions ---------- */
  function mix(o, extra) { if (extra) for (var k in extra) o[k] = extra[k]; return o; }
  // Réponse à taper (chiffres)
  function num(text, answer, extra) { return mix({ type: "num", text: text, answer: round(answer) }, extra); }
  // Réponse à choisir (boutons de couleur)
  function choice(text, good, bad, extra) {
    var opts = [String(good)];
    for (var i = 0; i < bad.length && opts.length < 4; i++) {
      var b = String(bad[i]);
      if (opts.indexOf(b) < 0) opts.push(b);
    }
    opts = shuffle(opts);
    return mix({ type: "choice", text: text, choices: opts, answer: opts.indexOf(String(good)) }, extra);
  }
  function yesno(text, yes, extra) { return mix({ type: "choice", text: text, choices: ["Oui", "Non"], answer: yes ? 0 : 1 }, extra); }
  // Fausses réponses proches d'un nombre
  function near(n, deltas) {
    var out = [];
    for (var i = 0; i < deltas.length; i++) { var v = round(n + deltas[i]); if (v >= 0 && v !== n) out.push(fmt(v)); }
    return shuffle(out);
  }

  /* ---------- Noms des rangs ---------- */
  var PI = ["unités", "dizaines", "centaines", "milliers", "dizaines de mille", "centaines de mille"];
  var PIs = ["unité", "dizaine", "centaine", "millier", "dizaine de mille", "centaine de mille"];
  var PD = ["dixièmes", "centièmes", "millièmes"], PDs = ["dixième", "centième", "millième"];
  // k = rang compté depuis la droite, dp = nombre de décimales
  function place(k, dp, sing) {
    dp = dp || 0;
    if (k < dp) return (sing ? PDs : PD)[dp - 1 - k];
    return (sing ? PIs : PI)[k - dp];
  }

  /* ---------- Tableau des rangs ---------- */
  function placeTable(n, dp) {
    dp = dp === undefined ? decs(n) : dp;
    var s = digits(n, dp), ab = ["U", "D", "C", "M", "DM", "CM"], abd = ["d", "c", "m"];
    var h1 = "", h2 = "";
    for (var k = s.length - 1; k >= 0; k--) {
      var cls = k === dp ? ' class="u"' : "";
      h1 += "<th" + cls + ">" + (k < dp ? abd[dp - 1 - k] : ab[k - dp]) + "</th>";
      h2 += "<td" + cls + ">" + s.charAt(s.length - 1 - k) + "</td>";
    }
    var legend = dp ? '<div class="legend">U = unités · d = dixièmes · c = centièmes · m = millièmes</div>' :
      '<div class="legend">M = milliers · C = centaines · D = dizaines · U = unités</div>';
    return '<table class="ptab"><tr>' + h1 + "</tr><tr>" + h2 + "</tr></table>" + legend;
  }

  /* ---------- Opérations en colonnes ---------- */
  function table(rows, w, hl) {
    var h = '<table class="col">';
    for (var r = 0; r < rows.length; r++) {
      h += '<tr class="' + (rows[r].cls || "") + '">';
      for (var i = 0; i < w; i++) {
        var c = rows[r].cells[i];
        h += "<td" + (hl >= 0 && i > 0 && w - 1 - i === hl ? ' class="hl"' : "") + ">" + (c || "") + "</td>";
      }
      h += "</tr>";
    }
    return h + "</table>";
  }
  // Une ligne de chiffres alignée à droite ; show(k) décide si le chiffre de rang k est visible
  function line(s, w, dp, sign, show) {
    var cells = [], i, k;
    for (i = 0; i < w; i++) cells.push("");
    cells[0] = sign || "";
    for (k = 0; k < s.length; k++) {
      if (show && !show(k)) continue;
      cells[w - 1 - k] = s.charAt(s.length - 1 - k) + (dp && k === dp ? "," : "");
    }
    return cells;
  }
  function dAt(s, k) { return k < s.length ? +s.charAt(s.length - 1 - k) : 0; }
  function empty(w) { var c = []; for (var i = 0; i < w; i++) c.push(""); return c; }

  function colAdd(a, b) {
    var dp = Math.max(decs(a), decs(b)), sa = digits(a, dp), sb = digits(b, dp), sum = round(a + b), ss = digits(sum, dp);
    var w = Math.max(sa.length, sb.length, ss.length) + 1, n = Math.max(sa.length, sb.length);
    var carries = {}, carry = 0, texts = [], vis = [];
    function draw(upto, hl) {
      var cr = empty(w);
      for (var c in carries) if (+c <= upto + 1) cr[w - 1 - c] = "<small>" + carries[c] + "</small>";
      return table([{ cells: cr, cls: "carry" }, { cells: line(sa, w, dp) }, { cells: line(sb, w, dp, "+"), cls: "under" },
        { cells: line(ss, w, dp, "", function (k) { return k <= upto; }), cls: "res" }], w, hl);
    }
    for (var k = 0; k < n; k++) {
      var t = dAt(sa, k) + dAt(sb, k) + carry, last = k === n - 1, terms = [];
      if (k < sa.length) terms.push(dAt(sa, k));
      if (k < sb.length) terms.push(dAt(sb, k));
      if (carry) terms.push("1 (retenue)");
      var txt = "Colonne des " + place(k, dp) + " : " + terms.join(" + ") + (terms.length > 1 ? " = " + t : "");
      if (t >= 10 && !last) { txt += " → j'écris " + (t % 10) + " et je retiens 1."; carries[k + 1] = 1; carry = 1; }
      else { txt += " → j'écris " + t + "."; carry = 0; }
      texts.push(txt); vis.push(draw(last ? 99 : k, k));
    }
    texts.push("Résultat : " + fmt(a) + " + " + fmt(b) + " = <b>" + fmt(sum) + "</b>");
    vis.push(draw(99, -1));
    return { steps: texts, vis: vis, final: draw(99, -1) };
  }

  // Soustraction : quand le chiffre du haut est trop petit, on échange 1 rang supérieur contre 10
  function colSub(a, b) {
    var dp = Math.max(decs(a), decs(b)), sa = digits(a, dp), sb = digits(b, dp), diff = round(a - b), sd = digits(diff, dp);
    var L = sa.length, w = L + 1, top = [], orig = [], k, texts = [], vis = [];
    for (k = 0; k < L; k++) { top[k] = dAt(sa, k); orig[k] = top[k]; }
    function draw(upto, hl) {
      var cells = line(sa, w, dp);
      for (var j = 0; j < L; j++) if (top[j] !== orig[j]) cells[w - 1 - j] = "<s>" + orig[j] + "</s><sup>" + top[j] + "</sup>" + (dp && j === dp ? "," : "");
      return table([{ cells: cells }, { cells: line(sb, w, dp, "−"), cls: "under" },
        { cells: line(sd, w, dp, "", function (q) { return q <= upto; }), cls: "res" }], w, hl);
    }
    for (k = 0; k < L; k++) {
      var y = dAt(sb, k), txt = "Colonne des " + place(k, dp) + " : ";
      if (top[k] < y) {
        var j = k + 1;
        while (top[j] === 0) j++;
        var before = top[k];
        top[j]--;
        for (var m = j - 1; m > k; m--) top[m] = 9;
        top[k] += 10;
        txt += "je ne peux pas faire " + before + " − " + y + ". " + (j === k + 1 ?
          "J'échange 1 " + place(j, dp, true) + " contre 10 " + place(k, dp) + ". " :
          "J'échange 1 " + place(j, dp, true) + " : les 0 deviennent des 9 et j'ai 10 " + place(k, dp) + " de plus. ");
      }
      var r = top[k] - y;
      if (k >= sb.length && k === L - 1 && r === 0) txt += "il ne reste rien, je n'écris pas de 0 devant.";
      else if (k >= sb.length && top[k] === orig[k]) txt += "rien à enlever, je descends le " + top[k] + ".";
      else txt += top[k] + " − " + y + " = " + r + " → j'écris " + r + ".";
      texts.push(txt); vis.push(draw(k, k));
    }
    texts.push("Résultat : " + fmt(a) + " − " + fmt(b) + " = <b>" + fmt(diff) + "</b>");
    vis.push(draw(99, -1));
    return { steps: texts, vis: vis, final: draw(99, -1) };
  }

  // Multiplication de nombres entiers (multiplicateur à 1 ou plusieurs chiffres)
  function colMul(a, b) {
    var sa = String(a), sb = String(b), prod = a * b, sp = String(prod), texts = [], vis = [], k;
    var w = Math.max(sp.length, sa.length, sb.length) + 1;
    if (sb.length === 1) {
      var carry = 0, carries = {};
      var draw = function (upto, hl) {
        var cr = empty(w);
        for (var c in carries) if (+c <= upto + 1) cr[w - 1 - c] = "<small>" + carries[c] + "</small>";
        return table([{ cells: cr, cls: "carry" }, { cells: line(sa, w, 0) }, { cells: line(sb, w, 0, "×"), cls: "under" },
          { cells: line(sp, w, 0, "", function (q) { return q <= upto; }), cls: "res" }], w, hl);
      };
      for (k = 0; k < sa.length; k++) {
        var x = dAt(sa, k), t = x * b + carry, last = k === sa.length - 1;
        var txt = "Colonne des " + place(k, 0) + " : " + x + " × " + b + (carry ? " = " + x * b + ", + " + carry + " (retenue) = " + t : " = " + t);
        if (!last && t >= 10) { carry = Math.floor(t / 10); carries[k + 1] = carry; txt += " → j'écris " + (t % 10) + " et je retiens " + carry + "."; }
        else { if (!last) carry = 0; txt += " → j'écris " + t + "."; }
        texts.push(txt); vis.push(draw(last ? 99 : k, k));
      }
      texts.push("Résultat : " + fmt(a) + " × " + b + " = <b>" + fmt(prod) + "</b>");
      vis.push(draw(99, -1));
      return { steps: texts, vis: vis, final: draw(99, -1) };
    }
    var parts = [];
    var drawP = function (upto) {
      var rows = [{ cells: line(sa, w, 0) }, { cells: line(sb, w, 0, "×"), cls: "under" }];
      for (var i = 0; i < parts.length && i <= upto; i++)
        rows.push({ cells: line(String(parts[i]), w, 0, i > 0 && i === sb.length - 1 ? "+" : ""), cls: i === sb.length - 1 ? "under" : "" });
      if (upto >= sb.length) rows.push({ cells: line(sp, w, 0), cls: "res" });
      return table(rows, w, -1);
    };
    for (k = 0; k < sb.length; k++) parts.push(a * dAt(sb, k) * Math.pow(10, k));
    for (k = 0; k < sb.length; k++) {
      var dg = dAt(sb, k), zeros = k === 1 ? "un 0" : "deux 0";
      texts.push(k === 0 ? "Ligne 1 : " + fmt(a) + " × " + dg + " = " + fmt(parts[0]) + "." :
        "Ligne " + (k + 1) + " : " + fmt(a) + " × " + dg + (k === 1 ? "0" : "00") + ". J'écris d'abord " + zeros + " à droite, puis " +
        fmt(a) + " × " + dg + " = " + fmt(a * dg) + " → " + fmt(parts[k]) + ".");
      vis.push(drawP(k));
    }
    texts.push("J'additionne les lignes : " + parts.map(fmt).join(" + ") + " = <b>" + fmt(prod) + "</b>");
    vis.push(drawP(99));
    return { steps: texts, vis: vis, final: drawP(99) };
  }

  // Division « en potence » racontée étape par étape
  function longDiv(a, d) {
    var s = String(a), cur = 0, q = "", texts = [], first = true;
    for (var i = 0; i < s.length; i++) {
      cur = cur * 10 + +s.charAt(i);
      if (first && cur < d && i < s.length - 1) continue;
      var qd = Math.floor(cur / d), r = cur - qd * d;
      texts.push((first ? "Je prends " + cur : "J'abaisse le " + s.charAt(i) + " → " + cur) + " : dans " + cur +
        ", combien de fois " + d + " ? <b>" + qd + "</b> fois (" + qd + " × " + d + " = " + qd * d + "), il reste " + r + ".");
      q += qd; cur = r; first = false;
    }
    texts.push("Résultat : " + fmt(a) + " : " + d + " = <b>" + fmt(+q) + "</b>" + (cur ? " reste <b>" + cur + "</b>" : ""));
    return { steps: texts, q: +q, r: cur };
  }

  /* ---------- Dessins SVG ---------- */
  var INK = "#f2efe8", FILL = "#ffb347", EMPTY = "#2d3750", ACC = "#5fd3ff";
  function svg(vb, w, h, body) {
    return '<svg class="pic" viewBox="' + vb + '" style="width:' + w + "vh;height:" + h + 'vh">' + body + "</svg>";
  }
  function pt(cx, cy, r, deg) { var a = deg * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; }
  function rnd(x) { return Math.round(x * 10) / 10; }

  function pie(n, k) {
    var b = "";
    if (n === 1) b = '<circle cx="100" cy="100" r="85" fill="' + (k ? FILL : EMPTY) + '" stroke="' + INK + '" stroke-width="4"/>';
    for (var i = 0; i < n && n > 1; i++) {
      var p0 = pt(100, 100, 85, -90 + 360 * i / n), p1 = pt(100, 100, 85, -90 + 360 * (i + 1) / n);
      b += '<path d="M100 100 L' + rnd(p0[0]) + " " + rnd(p0[1]) + " A85 85 0 " + (360 / n > 180 ? 1 : 0) + " 1 " + rnd(p1[0]) + " " + rnd(p1[1]) +
        ' Z" fill="' + (i < k ? FILL : EMPTY) + '" stroke="' + INK + '" stroke-width="4"/>';
    }
    return svg("0 0 200 200", 24, 24, b);
  }
  function bar(n, k) {
    var b = "", wd = 360 / n;
    for (var i = 0; i < n; i++) b += '<rect x="' + rnd(20 + i * wd) + '" y="20" width="' + rnd(wd) + '" height="70" fill="' + (i < k ? FILL : EMPTY) + '" stroke="' + INK + '" stroke-width="4"/>';
    return svg("0 0 400 110", 44, 12, b);
  }

  var SHAPES = {
    "carré": '<rect x="45" y="45" width="110" height="110"/>',
    "rectangle": '<rect x="20" y="60" width="160" height="80"/>',
    "triangle": '<polygon points="100,25 175,155 25,155"/>',
    "triangle rectangle": '<polygon points="40,30 40,165 165,165"/>',
    "losange": '<polygon points="100,15 160,100 100,185 40,100"/>',
    "cercle": '<circle cx="100" cy="100" r="78"/>'
  };
  function shape(name, rot, axis) {
    var b = '<g transform="rotate(' + (rot || 0) + ' 100 100)" fill="' + FILL + '" stroke="' + INK + '" stroke-width="4">' + SHAPES[name] + "</g>";
    if (axis) b += '<line x1="' + axis[0] + '" y1="' + axis[1] + '" x2="' + axis[2] + '" y2="' + axis[3] + '" stroke="' + ACC + '" stroke-width="5" stroke-dasharray="12 8"/>';
    return svg("0 0 200 200", 26, 26, b);
  }

  function solid(name) {
    var st = ' stroke="' + INK + '" stroke-width="4" fill="none"', da = ' stroke-dasharray="9 7"', b = "";
    if (name === "cube" || name === "pavé") {
      var x = 30, y = name === "cube" ? 80 : 95, w = name === "cube" ? 100 : 150, h = name === "cube" ? 100 : 75, dx = 50, dy = -45;
      b += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + FILL + '" fill-opacity=".35"' + st.replace(' fill="none"', "") + "/>";
      b += '<polyline points="' + x + "," + y + " " + (x + dx) + "," + (y + dy) + " " + (x + w + dx) + "," + (y + dy) + " " + (x + w) + "," + y + '"' + st + "/>";
      b += '<polyline points="' + (x + w + dx) + "," + (y + dy) + " " + (x + w + dx) + "," + (y + h + dy) + " " + (x + w) + "," + (y + h) + '"' + st + "/>";
      b += '<polyline points="' + (x + dx) + "," + (y + dy) + " " + (x + dx) + "," + (y + h + dy) + " " + (x + w + dx) + "," + (y + h + dy) + '"' + st + da + "/>";
      b += '<line x1="' + x + '" y1="' + (y + h) + '" x2="' + (x + dx) + '" y2="' + (y + h + dy) + '"' + st + da + "/>";
    } else {
      b += '<polygon points="30,165 140,165 175,125 100,30" fill="' + FILL + '" fill-opacity=".35" stroke="none"/>';
      b += '<polyline points="30,165 140,165 175,125"' + st + "/>";
      b += '<polyline points="30,165 65,125 175,125"' + st + da + "/>";
      b += '<line x1="65" y1="125" x2="100" y2="30"' + st + da + "/>";
      b += '<polyline points="30,165 100,30 140,165"' + st + "/>";
      b += '<line x1="100" y1="30" x2="175" y2="125"' + st + "/>";
    }
    return svg("0 0 240 200", 30, 25, b);
  }

  // Règle graduée (cm) avec un crayon posé de start à end
  function ruler(start, end) {
    var s = 46, x0 = 30, b = '<rect x="10" y="95" width="' + (16 * s + 40) + '" height="70" rx="6" fill="#f6e7b0"/>';
    for (var mm = 0; mm <= 160; mm++) {
      var x = x0 + mm * s / 10, hh = mm % 10 === 0 ? 26 : mm % 5 === 0 ? 18 : 10;
      b += '<line x1="' + rnd(x) + '" y1="95" x2="' + rnd(x) + '" y2="' + (95 + hh) + '" stroke="#222" stroke-width="' + (mm % 10 ? 1.5 : 3) + '"/>';
      if (mm % 10 === 0) b += '<text x="' + x + '" y="152" font-size="22" text-anchor="middle" fill="#222" font-family="Arial">' + mm / 10 + "</text>";
    }
    var xa = x0 + start * s, xb = x0 + end * s;
    b += '<rect x="' + xa + '" y="45" width="' + (xb - xa - 22) + '" height="36" fill="#ff8a5c" stroke="#222" stroke-width="3"/>';
    b += '<polygon points="' + (xb - 22) + ",45 " + xb + ",63 " + (xb - 22) + ',81" fill="#f6d6a8" stroke="#222" stroke-width="3"/>';
    b += '<line x1="' + xa + '" y1="40" x2="' + xa + '" y2="95" stroke="' + ACC + '" stroke-width="2" stroke-dasharray="5 4"/>';
    b += '<line x1="' + xb + '" y1="40" x2="' + xb + '" y2="95" stroke="' + ACC + '" stroke-width="2" stroke-dasharray="5 4"/>';
    return svg("0 0 " + (16 * s + 60) + " 175", 80, 18, b);
  }

  // Droite graduée : de min à max, n intervalles, flèche sur la graduation v (index), labels = indices écrits
  function numLine(min, max, n, v, labels) {
    var x0 = 50, x1 = 850, b = '<line x1="' + (x0 - 20) + '" y1="110" x2="' + (x1 + 25) + '" y2="110" stroke="' + INK + '" stroke-width="4"/>';
    b += '<polygon points="' + (x1 + 35) + ",110 " + (x1 + 20) + ",102 " + (x1 + 20) + ',118" fill="' + INK + '"/>';
    for (var i = 0; i <= n; i++) {
      var x = x0 + (x1 - x0) * i / n, lab = labels.indexOf(i) >= 0;
      b += '<line x1="' + rnd(x) + '" y1="' + (lab ? 92 : 98) + '" x2="' + rnd(x) + '" y2="' + (lab ? 128 : 122) + '" stroke="' + INK + '" stroke-width="' + (lab ? 4 : 2.5) + '"/>';
      if (lab) b += '<text x="' + rnd(x) + '" y="165" font-size="30" text-anchor="middle" fill="' + INK + '" font-family="Arial">' + fmt(min + (max - min) * i / n) + "</text>";
    }
    var xv = x0 + (x1 - x0) * v / n;
    b += '<polygon points="' + rnd(xv) + ",88 " + rnd(xv - 14) + ",58 " + rnd(xv + 14) + ',58" fill="' + FILL + '"/>';
    b += '<text x="' + rnd(xv) + '" y="45" font-size="34" font-weight="bold" text-anchor="middle" fill="' + FILL + '" font-family="Arial">?</text>';
    return svg("0 0 900 180", 82, 16.5, b);
  }

  function label(x, y, t, anchor) {
    return '<text x="' + rnd(x) + '" y="' + rnd(y) + '" font-size="26" font-weight="bold" text-anchor="' + (anchor || "middle") + '" fill="' + ACC + '" font-family="Arial">' + t + "</text>";
  }
  // Rectangle proportionné avec ses mesures
  function rect(L, l, unit, opts) {
    opts = opts || {};
    var sc = Math.min(300 / L, 170 / l), w = L * sc, h = l * sc, x = 60, y = 30;
    var b = '<rect x="' + x + '" y="' + y + '" width="' + rnd(w) + '" height="' + rnd(h) + '" fill="' + FILL + '" fill-opacity=".35" stroke="' + INK + '" stroke-width="4"/>';
    b += label(x + w / 2, y + h + 32, fmt(L) + " " + unit);
    if (!opts.noSide) b += label(x + w + 12, y + h / 2 + 9, fmt(l) + " " + unit, "start");
    return svg("0 0 520 " + rnd(h + 78), 50, Math.min(30, (h + 78) / 520 * 50), b);
  }
  function grid(cols, rows) {
    var c = 34, b = "";
    for (var i = 0; i < rows; i++) for (var j = 0; j < cols; j++)
      b += '<rect x="' + (10 + j * c) + '" y="' + (10 + i * c) + '" width="' + c + '" height="' + c + '" fill="' + FILL + '" fill-opacity=".5" stroke="' + INK + '" stroke-width="2"/>';
    return svg("0 0 " + (cols * c + 20) + " " + (rows * c + 20), Math.min(60, (cols * c + 20) / 12), Math.min(30, (rows * c + 20) / 12), b);
  }
  function tri(base, hgt, unit) {
    var sc = Math.min(320 / base, 170 / hgt), w = base * sc, h = hgt * sc, x = 50, y = 20 + h, apx = x + w * 0.35;
    var b = '<polygon points="' + x + "," + rnd(y) + " " + rnd(x + w) + "," + rnd(y) + " " + rnd(apx) + ',20" fill="' + FILL + '" fill-opacity=".35" stroke="' + INK + '" stroke-width="4"/>';
    b += '<line x1="' + rnd(apx) + '" y1="20" x2="' + rnd(apx) + '" y2="' + rnd(y) + '" stroke="' + ACC + '" stroke-width="3" stroke-dasharray="9 6"/>';
    b += '<rect x="' + rnd(apx) + '" y="' + rnd(y - 16) + '" width="16" height="16" fill="none" stroke="' + ACC + '" stroke-width="2"/>';
    b += label(x + w / 2, y + 32, "base " + fmt(base) + " " + unit) + label(apx + 12, 20 + h / 2, "hauteur " + fmt(hgt) + " " + unit, "start");
    return svg("0 0 560 " + rnd(h + 70), 52, Math.min(30, (h + 70) / 560 * 52), b);
  }
  function para(base, hgt, unit) {
    var sc = Math.min(260 / base, 170 / hgt), w = base * sc, h = hgt * sc, off = 70, x = 40, y = 20 + h;
    var b = '<polygon points="' + x + "," + rnd(y) + " " + rnd(x + w) + "," + rnd(y) + " " + rnd(x + w + off) + ",20 " + (x + off) + ',20" fill="' + FILL + '" fill-opacity=".35" stroke="' + INK + '" stroke-width="4"/>';
    b += '<line x1="' + (x + off) + '" y1="20" x2="' + (x + off) + '" y2="' + rnd(y) + '" stroke="' + ACC + '" stroke-width="3" stroke-dasharray="9 6"/>';
    b += label(x + w / 2, y + 32, "base " + fmt(base) + " " + unit) + label(x + off + 10, 20 + h / 2, "hauteur " + fmt(hgt) + " " + unit, "start");
    return svg("0 0 560 " + rnd(h + 70), 52, Math.min(30, (h + 70) / 560 * 52), b);
  }
  // Figure en L : rectangle L×l auquel on enlève un coin a×b (en haut à droite)
  function lshape(L, l, a, bb, unit) {
    var sc = Math.min(300 / L, 180 / l), x = 60, y = 30, W = L * sc, H = l * sc, A = a * sc, B = bb * sc;
    var p = [[x, y], [x + W - A, y], [x + W - A, y + B], [x + W, y + B], [x + W, y + H], [x, y + H]];
    var b = '<polygon points="' + p.map(function (q) { return rnd(q[0]) + "," + rnd(q[1]); }).join(" ") + '" fill="' + FILL + '" fill-opacity=".35" stroke="' + INK + '" stroke-width="4"/>';
    b += label(x + (W - A) / 2, y - 8, fmt(L - a) + " " + unit) + label(x + W - A - 8, y + B / 2 + 8, fmt(bb) + " " + unit, "end") +
      label(x + W - A / 2, y + B - 10, fmt(a) + " " + unit) + label(x + W + 8, y + B + (H - B) / 2 + 8, fmt(l - bb) + " " + unit, "start") +
      label(x + W / 2, y + H + 32, fmt(L) + " " + unit) + label(x - 8, y + H / 2 + 8, fmt(l) + " " + unit, "end");
    return svg("-40 0 600 " + rnd(H + 70), 54, Math.min(30, (H + 70) / 600 * 54), b);
  }
  function box(L, l, h, unit) {
    var sc = Math.min(200 / L, 120 / h, 150 / l), W = L * sc, H = h * sc, D = l * sc * 0.6, x = 40, y = 30 + D;
    var st = ' stroke="' + INK + '" stroke-width="4"';
    var b = '<rect x="' + x + '" y="' + rnd(y) + '" width="' + rnd(W) + '" height="' + rnd(H) + '" fill="' + FILL + '" fill-opacity=".35"' + st + "/>";
    b += '<polygon points="' + x + "," + rnd(y) + " " + rnd(x + D) + "," + rnd(y - D) + " " + rnd(x + W + D) + "," + rnd(y - D) + " " + rnd(x + W) + "," + rnd(y) + '" fill="' + FILL + '" fill-opacity=".2"' + st + "/>";
    b += '<polygon points="' + rnd(x + W) + "," + rnd(y) + " " + rnd(x + W + D) + "," + rnd(y - D) + " " + rnd(x + W + D) + "," + rnd(y - D + H) + " " + rnd(x + W) + "," + rnd(y + H) + '" fill="' + FILL + '" fill-opacity=".1"' + st + "/>";
    b += label(x + W / 2, y + H + 32, fmt(L) + " " + unit) + label(x + W + D / 2 + 10, y + H - D / 2 + 20, fmt(l) + " " + unit, "start") + label(x - 8, y + H / 2 + 8, fmt(h) + " " + unit, "end");
    return svg("-90 0 560 " + rnd(H + D + 80), 48, Math.min(30, (H + D + 80) / 560 * 48), b);
  }
  // Angle de deg degrés, premier côté orienté à rot degrés (sens inverse des aiguilles)
  function angle(deg, rot) {
    var cx = 200, cy = 190, r = 165, p1 = pt(cx, cy, r, -rot), p2 = pt(cx, cy, r, -(rot + deg));
    var st = ' stroke="' + INK + '" stroke-width="5" stroke-linecap="round"';
    var b = '<line x1="' + cx + '" y1="' + cy + '" x2="' + rnd(p1[0]) + '" y2="' + rnd(p1[1]) + '"' + st + "/>";
    b += '<line x1="' + cx + '" y1="' + cy + '" x2="' + rnd(p2[0]) + '" y2="' + rnd(p2[1]) + '"' + st + "/>";
    if (deg === 90) {
      var q1 = pt(cx, cy, 30, -rot), q2 = pt(cx, cy, 30, -(rot + 90)), q3 = [q1[0] + q2[0] - cx, q1[1] + q2[1] - cy];
      b += '<polyline points="' + rnd(q1[0]) + "," + rnd(q1[1]) + " " + rnd(q3[0]) + "," + rnd(q3[1]) + " " + rnd(q2[0]) + "," + rnd(q2[1]) + '" fill="none" stroke="' + FILL + '" stroke-width="4"/>';
    } else {
      var a1 = pt(cx, cy, 45, -rot), a2 = pt(cx, cy, 45, -(rot + deg));
      b += '<path d="M' + rnd(a1[0]) + " " + rnd(a1[1]) + " A45 45 0 " + (deg > 180 ? 1 : 0) + " 0 " + rnd(a2[0]) + " " + rnd(a2[1]) + '" fill="none" stroke="' + FILL + '" stroke-width="4"/>';
    }
    b += '<circle cx="' + cx + '" cy="' + cy + '" r="6" fill="' + INK + '"/>';
    return svg("0 0 400 210", 38, 20, b);
  }
  function letter(ch) {
    return svg("0 0 200 200", 22, 22, '<text x="100" y="165" font-size="180" font-weight="bold" text-anchor="middle" fill="' + FILL + '" font-family="Arial, Helvetica, sans-serif">' + ch + "</text>");
  }

  return {
    R: R, pick: pick, shuffle: shuffle, round: round, fmt: fmt, money: money, decs: decs, big: big, frac: frac,
    num: num, choice: choice, yesno: yesno, near: near, place: place, placeTable: placeTable,
    colAdd: colAdd, colSub: colSub, colMul: colMul, longDiv: longDiv,
    pie: pie, bar: bar, shape: shape, solid: solid, ruler: ruler, numLine: numLine, rect: rect, grid: grid,
    tri: tri, para: para, lshape: lshape, box: box, angle: angle, letter: letter
  };
})();
