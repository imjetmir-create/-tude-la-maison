/* Mathématiques 5H : thèmes alignés sur le Plan d'études romand (cycle 2, 5e-6e) */
(function () {
  "use strict";
  var T = window.THEMES = window.THEMES || [];
  var R = U.R, pick = U.pick, f = U.fmt, big = U.big;
  function add(chapter, o) { o.grade = 5; o.subject = "maths"; o.chapter = chapter; T.push(o); }
  var KIDS = [["Léa", 1], ["Noah", 0], ["Emma", 1], ["Luca", 0], ["Mia", 1], ["Liam", 0], ["Chloé", 1], ["Gabriel", 0], ["Zoé", 1], ["Nathan", 0], ["Lina", 1], ["Samuel", 0]];
  function kid(not) { var k; do { k = pick(KIDS); } while (not && k[0] === not[0]); return { n: k[0], il: k[1] ? "elle" : "il" }; }

  var C1 = "Les nombres jusqu'à 10'000", C2 = "Calculer", C3 = "Résoudre des problèmes", C4 = "Géométrie et mesures";

  /* ================= Les nombres ================= */
  add(C1, {
    id: "m5-rangs", icon: "🔢", title: "Unités, dizaines, centaines, milliers",
    desc: "Lire un nombre et savoir ce que vaut chaque chiffre.",
    learn: [
      { t: "Le tableau des rangs", h: "Chaque chiffre d'un nombre a une place, qu'on appelle son <b>rang</b>. De droite à gauche : les <b>unités</b>, les <b>dizaines</b>, les <b>centaines</b>, les <b>milliers</b>." + U.placeTable(4527) },
      { t: "Ce que vaut chaque chiffre", h: "Dans <b>4527</b> :<br>4 milliers = <b>4000</b><br>5 centaines = <b>500</b><br>2 dizaines = <b>20</b><br>7 unités = <b>7</b><br><br>4527 = 4000 + 500 + 20 + 7" },
      { t: "Le zéro garde la place", h: "Dans <b>3058</b>, il n'y a pas de centaines : le <b>0</b> garde leur place.<br><br>3058 = 3000 + 50 + 8" + U.placeTable(3058) },
      { t: "Combien de dizaines en tout ?", h: "Dans 4527, le <b>chiffre</b> des dizaines est 2.<br>Mais le <b>nombre</b> de dizaines en tout, c'est <b>452</b> : on cache simplement le chiffre des unités.<br><br>De même, il y a <b>45</b> centaines en tout dans 4527." }
    ],
    gen: function (d) {
      var n = d === 1 ? R(100, 999) : R(1000, 9999);
      if (d === 3 && Math.random() < 0.5) n = R(1, 9) * 1000 + pick([0, R(1, 9)]) * 100 + pick([0, R(1, 9)]) * 10 + R(1, 9);
      var s = String(n), len = s.length, kind = pick(d === 3 ? ["chiffre", "compose", "total", "total"] : ["chiffre", "compose"]);
      if (kind === "chiffre") {
        var k = R(0, len - 1), dg = +s.charAt(len - 1 - k);
        return U.num("Dans le nombre " + big(f(n)) + "quel est le chiffre des <b>" + U.place(k) + "</b> ?", dg,
          { visual: U.placeTable(n), steps: ["Je range le nombre dans le tableau.", "Dans la colonne des " + U.place(k) + ", il y a le chiffre <b>" + dg + "</b>."] });
      }
      if (kind === "compose") {
        var parts = [], names = [];
        for (var i = 0; i < len; i++) {
          var dd = +s.charAt(i);
          if (dd) { parts.push(dd * Math.pow(10, len - 1 - i)); names.push(f(dd * Math.pow(10, len - 1 - i)) + " = " + dd + " " + U.place(len - 1 - i, 0, dd === 1)); }
        }
        var shown = d >= 2 ? U.shuffle(parts) : parts;
        var st = ["Je range chaque nombre dans sa colonne : " + names.join(" · ") + "."];
        if (s.indexOf("0") >= 0) st.push("Une colonne est vide : j'écris un <b>0</b> pour garder sa place.");
        st.push("Résultat : <b>" + f(n) + "</b>");
        return U.num("Calcule :" + big(shown.map(f).join(" + ")), n, { visual: U.placeTable(n), steps: st });
      }
      var cent = Math.random() < 0.5, div = cent ? 100 : 10, ans = Math.floor(n / div);
      return U.num("Combien y a-t-il de <b>" + (cent ? "centaines" : "dizaines") + " en tout</b> dans" + big(f(n)), ans,
        { visual: U.placeTable(n), steps: ["Je cache les chiffres à droite des " + (cent ? "centaines" : "dizaines") + " : il reste <b>" + ans + "</b>.",
          "Vérification : " + ans + " " + (cent ? "centaines" : "dizaines") + " = " + f(ans * div) + " (et il reste " + (n % div) + ")."] });
    }
  });

  add(C1, {
    id: "m5-comparer", icon: "⚖️", title: "Comparer et ranger les nombres",
    desc: "Trouver le plus grand, le plus petit, utiliser < et >.",
    learn: [
      { t: "D'abord, compter les chiffres", h: "Le nombre qui a <b>le plus de chiffres</b> est le plus grand.<br><br><b>1002</b> a 4 chiffres, <b>998</b> en a 3 :<br>1002 est plus grand que 998." },
      { t: "Même nombre de chiffres", h: "On compare chiffre par chiffre <b>en partant de la gauche</b>.<br><br>4527 et 4572 :<br>4 = 4, puis 5 = 5, puis <b>2 &lt; 7</b><br>donc <b>4527 &lt; 4572</b>." },
      { t: "Les signes < et >", h: "<b>&lt;</b> veut dire « plus petit que », <b>&gt;</b> veut dire « plus grand que ».<br><br>Astuce : le côté ouvert est toujours tourné vers le <b>plus grand</b> nombre, comme une bouche qui veut manger la plus grosse part !<br><br>3 &lt; 8 · 9 &gt; 2" }
    ],
    gen: function (d) {
      var a, b;
      if (d === 3 && Math.random() < 0.6) {
        var base = R(1000, 9999), set = [base], s = String(base), want = Math.random() < 0.5;
        var tries = 0;
        while (set.length < 4 && tries++ < 50) {
          var sh = U.shuffle(s.split("")).join("");
          if (sh.charAt(0) !== "0" && set.indexOf(+sh) < 0) set.push(+sh);
          else if (tries > 20) { var v = base + pick([-1, 1]) * R(1, 99); if (set.indexOf(v) < 0) set.push(v); }
        }
        var best = want ? Math.max.apply(null, set) : Math.min.apply(null, set), others = [];
        for (var i = 0; i < set.length; i++) if (set[i] !== best) others.push(f(set[i]));
        return U.choice("Quel est le <b>plus " + (want ? "grand" : "petit") + "</b> nombre ?", f(best), others,
          { steps: ["Tous ces nombres ont 4 chiffres : je compare les milliers, puis les centaines, puis les dizaines…", "Le plus " + (want ? "grand" : "petit") + " est <b>" + f(best) + "</b>."] });
      }
      if (d === 1) { a = R(10, 999); b = Math.random() < 0.1 ? a : R(10, 999); }
      else { a = R(1000, 9999); var sa = String(a).split(""), p = R(1, 3); b = Math.random() < 0.1 ? a : +(sa.slice(0, p).join("") + String(R(0, Math.pow(10, 4 - p) - 1) + Math.pow(10, 4 - p)).slice(1)); }
      if (Math.random() < 0.4 && d > 1 && a !== b) b = +String(b).slice(1) || b;
      var sign = a < b ? "&lt;" : a > b ? "&gt;" : "=";
      var why = a === b ? "Les deux nombres sont égaux." : String(a).length !== String(b).length ?
        "Ils n'ont pas le même nombre de chiffres : le plus long est le plus grand." :
        "Même nombre de chiffres : je compare de gauche à droite jusqu'au premier chiffre différent.";
      return U.choice("Quel signe faut-il mettre ?" + big(f(a) + " … " + f(b)), sign, ["&lt;", "&gt;", "="].filter(function (x) { return x !== sign; }),
        { steps: [why, "Donc <b>" + f(a) + " " + sign + " " + f(b) + "</b>."] });
    }
  });

  add(C1, {
    id: "m5-plusmoins", icon: "➕", title: "+1, +10, +100, +1000",
    desc: "Avancer ou reculer d'une unité, d'une dizaine, d'une centaine, d'un millier.",
    learn: [
      { t: "Ajouter 10, 100 ou 1000", h: "Ajouter <b>10</b>, c'est ajouter 1 au chiffre des <b>dizaines</b>.<br>Ajouter <b>100</b>, c'est ajouter 1 au chiffre des <b>centaines</b>.<br><br>3426 + 10 = 34<b>3</b>6<br>3426 + 100 = 3<b>5</b>26" },
      { t: "Attention aux 9 !", h: "Quand le chiffre est un <b>9</b>, il devient 0 et le rang suivant augmente de 1.<br><br>3<b>9</b>50 + 100 = <b>40</b>50<br>(9 centaines + 1 centaine = 10 centaines = 1 millier de plus)" },
      { t: "Reculer", h: "Enlever 100, c'est enlever 1 au chiffre des centaines.<br>5<b>3</b>40 − 100 = 5<b>2</b>40<br><br>Avec un 0 : 4<b>0</b>25 − 100 = <b>39</b>25" }
    ],
    gen: function (d) {
      var steps = d === 1 ? [1, 10] : [10, 100, 1000], s = pick(steps), k = String(s).length - 1, n, plus = d === 1 ? true : Math.random() < 0.6;
      n = R(1000, 8900);
      if (d === 3) { // provoquer un passage : chiffre 9 (ou 0 en reculant)
        var arr = String(n).split(""), idx = 3 - k;
        arr[idx] = plus ? "9" : "0";
        if (k < 3 && idx > 0 && plus && Math.random() < 0.5) arr[idx - 1] = "9";
        n = +arr.join(""); if (n < 1100) n += 1000;
      }
      var res = plus ? n + s : n - s, dk = Math.floor(n / s) % 10, jump = plus ? dk === 9 : dk === 0;
      return U.num("Calcule :" + big(f(n) + (plus ? " + " : " − ") + f(s)), res,
        { steps: [(plus ? "J'ajoute" : "J'enlève") + " 1 " + U.place(k, 0, true) + " : je change le chiffre des " + U.place(k) + ".",
          (jump ? (plus ? "Le 9 devient 0 et le rang à gauche augmente de 1. " : "Le 0 devient 9 et le rang à gauche diminue de 1. ") : "") + "Résultat : <b>" + f(res) + "</b>"] });
    }
  });

  /* ================= Calculer ================= */
  add(C2, {
    id: "m5-add", icon: "➕", title: "Additions en colonnes",
    desc: "Poser une addition et gérer les retenues.",
    learn: [
      { t: "Bien poser l'addition", h: "On écrit les nombres l'un sous l'autre : <b>unités sous les unités</b>, dizaines sous les dizaines, centaines sous les centaines." + U.colAdd(347, 285).final },
      { t: "On commence par la droite", h: "On calcule toujours d'abord la colonne des <b>unités</b>, puis les dizaines, puis les centaines." },
      { t: "La retenue", h: "Si une colonne fait <b>10 ou plus</b>, on écrit le chiffre des unités et on <b>retient 1</b>, qu'on écrit en petit en haut de la colonne suivante.<br><br>7 + 5 = 12 → j'écris 2, je retiens 1." },
      { t: "Vérifier avec un ordre de grandeur", h: "347 + 285, c'est environ 350 + 300 = 650.<br>Mon résultat <b>632</b> est proche : il est sûrement juste !" }
    ],
    gen: function (d) {
      var a, b;
      if (d === 1) { a = R(11, 89); b = R(11, 99 - a > 11 ? 89 : 89); }
      else if (d === 2) { a = R(120, 899); b = R(25, 899); }
      else { a = R(1200, 7999); b = R(150, 9999 - a); }
      var c = U.colAdd(a, b);
      return U.num("Pose et calcule :" + big(f(a) + " + " + f(b)), a + b, { visual: c.final, steps: c.steps, vis: c.vis });
    }
  });

  add(C2, {
    id: "m5-sub", icon: "➖", title: "Soustractions en colonnes",
    desc: "Poser une soustraction, même quand le chiffre du haut est trop petit.",
    learn: [
      { t: "Bien poser la soustraction", h: "Le <b>plus grand</b> nombre en haut. Unités sous les unités, dizaines sous les dizaines…" + U.colSub(85, 32).final },
      { t: "Quand c'est trop petit", h: "52 − 17 : aux unités, je ne peux pas faire 2 − 7.<br>J'<b>échange 1 dizaine contre 10 unités</b> : le 5 devient 4, et le 2 devient 12.<br>12 − 7 = 5, puis 4 − 1 = 3." + U.colSub(52, 17).final },
      { t: "Avec des zéros", h: "Dans 302 − 47, il n'y a pas de dizaine à échanger : on échange 1 centaine, les 0 deviennent des 9." + U.colSub(302, 47).final + "<small>Ton enseignant·e utilise peut-être une autre façon d'écrire les retenues : le résultat est le même !</small>" },
      { t: "Vérifier avec l'addition", h: "52 − 17 = 35 ?<br>Je vérifie : 35 + 17 = 52 ✔" }
    ],
    gen: function (d) {
      var a, b;
      if (d === 1) { a = R(30, 99); b = R(11, a - 5); }
      else if (d === 2) { a = R(200, 999); b = R(45, a - 30); }
      else if (Math.random() < 0.5) { a = R(1, 9) * 1000 + R(0, 1) * R(1, 9) * 10 + R(0, 9); b = R(120, a - 50); }
      else { a = R(2000, 9999); b = R(500, a - 100); }
      var c = U.colSub(a, b);
      return U.num("Pose et calcule :" + big(f(a) + " − " + f(b)), a - b, { visual: c.final, steps: c.steps.concat(["Vérification : " + f(a - b) + " + " + f(b) + " = " + f(a) + " ✔"]), vis: c.vis.concat([c.final]) });
    }
  });

  add(C2, {
    id: "m5-livsous", icon: "🧠", title: "Le livret des soustractions",
    desc: "Les soustractions de 0 − 0 à 19 − 9, à connaître par cœur.",
    learn: [
      { t: "Passer par 10", h: "13 − 5 = ?<br>J'enlève d'abord 3 pour arriver à 10 : 13 − 3 = 10<br>Puis il reste 2 à enlever : 10 − 2 = <b>8</b>" },
      { t: "Penser à l'addition", h: "13 − 5 = ? c'est la même chose que <b>5 + ? = 13</b>.<br>Je connais 5 + 8 = 13, donc 13 − 5 = <b>8</b>." },
      { t: "Un peu chaque jour", h: "Le livret s'apprend par cœur, comme une chanson.<br>Fais ce quiz souvent : tu iras de plus en plus vite ! 🚀" }
    ],
    gen: function (d) {
      var a, b, miss = d === 3 && Math.random() < 0.5;
      if (d === 1) { a = R(5, 10); b = R(0, a); }
      else { b = R(2, 9); a = R(11, b + 9); }
      var r = a - b, st = a > 10 && b > a - 10 ? ["J'enlève d'abord " + (a - 10) + " pour arriver à 10, puis encore " + (b - (a - 10)) + " : 10 − " + (b - (a - 10)) + " = " + r + "."] : [];
      st.push("Je pense à l'addition : " + b + " + " + r + " = " + a + ".");
      if (miss) return U.num("Quel nombre manque ?" + big(a + " − ? = " + r), b, { steps: ["Je cherche combien il faut enlever à " + a + " pour arriver à " + r + " : " + a + " − " + r + " = " + b + ".", "Réponse : <b>" + b + "</b>"] });
      return U.num("Calcule de tête :" + big(a + " − " + b), r, { steps: st.concat(["Réponse : <b>" + r + "</b>"]) });
    }
  });

  function livretSteps(a, b) {
    var st = [];
    if (b === 2 || a === 2) st.push("× 2, c'est le double : " + (a === 2 ? b : a) + " + " + (a === 2 ? b : a) + " = " + a * b + ".");
    else if (b === 10 || a === 10) st.push("× 10 : j'ajoute un 0 à droite.");
    else if (b === 5 || a === 5) st.push("× 5, c'est la moitié de × 10 : " + (a === 5 ? b : a) + " × 10 = " + (a === 5 ? b : a) * 10 + ", la moitié = " + a * b + ".");
    else if (b === 9 || a === 9) { var o = a === 9 ? b : a; st.push("× 9, c'est × 10 moins une fois : " + o + " × 10 − " + o + " = " + o * 10 + " − " + o + " = " + a * b + "."); }
    else if (b === 4 || a === 4) { var p = a === 4 ? b : a; st.push("× 4, c'est le double du double : " + p + " → " + p * 2 + " → " + p * 4 + "."); }
    var seq = []; for (var i = 1; i <= a; i++) seq.push(i * b);
    st.push("Je récite le livret de " + b + " : " + seq.join(", ") + ".");
    st.push(a + " × " + b + " = <b>" + a * b + "</b>");
    return st;
  }
  add(C2, {
    id: "m5-liv2510", icon: "✌️", title: "Livrets de 2, 5 et 10",
    desc: "Les trois livrets les plus faciles pour commencer.",
    learn: [
      { t: "Le livret de 2", h: "× 2, c'est le <b>double</b>.<br>7 × 2 = 7 + 7 = <b>14</b><br><br>2, 4, 6, 8, 10, 12, 14, 16, 18, 20" },
      { t: "Le livret de 10", h: "× 10 : on ajoute un <b>0</b> à droite !<br>6 × 10 = <b>60</b><br><br>10, 20, 30, 40, 50, 60, 70, 80, 90, 100" },
      { t: "Le livret de 5", h: "× 5, c'est la <b>moitié</b> de × 10.<br>8 × 10 = 80, la moitié : 8 × 5 = <b>40</b><br><br>Les résultats finissent toujours par <b>0 ou 5</b>." }
    ],
    gen: function (d) {
      var b = pick([2, 5, 10]), a = d === 1 ? R(1, 5) : R(2, 10);
      if (Math.random() < 0.5) { var t = a; a = b; b = t; }
      if (d === 3 && Math.random() < 0.5) {
        var tb = a === 2 || a === 5 || a === 10 ? a : b, other = tb === a ? b : a;
        return U.num("Quel nombre manque ?" + big(tb + " × ? = " + tb * other), other, { steps: ["Je récite le livret de " + tb + " jusqu'à " + tb * other + ".", tb + " × <b>" + other + "</b> = " + tb * other] });
      }
      var tab = (b === 2 || b === 5 || b === 10) ? b : a, n = tab === b ? a : b;
      return U.num("Calcule :" + big(a + " × " + b), a * b, { steps: livretSteps(n, tab) });
    }
  });

  add(C2, {
    id: "m5-livrets", icon: "✖️", title: "Tous les livrets jusqu'à 9 × 9",
    desc: "Connaître les livrets par cœur.",
    learn: [
      { t: "Moins de choses à apprendre", h: "7 × 8 = 8 × 7 : on peut tourner la multiplication !<br>Si tu connais l'un, tu connais l'autre." },
      { t: "Les astuces", h: "× 4 : le double du double. 6 → 12 → <b>24</b><br>× 9 : × 10 moins une fois. 7 × 9 = 70 − 7 = <b>63</b><br>× 5 : la moitié de × 10." },
      { t: "Les plus difficiles", h: "6 × 7 = <b>42</b><br>6 × 8 = <b>48</b><br>7 × 7 = <b>49</b><br>7 × 8 = <b>56</b> (5, 6, 7, 8 !)<br>8 × 8 = <b>64</b>" }
    ],
    gen: function (d) {
      var a = d === 1 ? R(2, 5) : d === 2 ? R(3, 9) : R(6, 9), b = R(2, 9);
      if (d === 3 && Math.random() < 0.4) return U.num("Quel nombre manque ?" + big(a + " × ? = " + a * b), b, { steps: ["Je récite le livret de " + a + " jusqu'à " + a * b + ".", a + " × <b>" + b + "</b> = " + a * b] });
      return U.num("Calcule :" + big(b + " × " + a), a * b, { steps: livretSteps(b, a) });
    }
  });

  add(C2, {
    id: "m5-mul", icon: "🧮", title: "Multiplications en colonnes",
    desc: "Multiplier un nombre par un chiffre, avec les retenues.",
    learn: [
      { t: "Bien poser", h: "On écrit le grand nombre en haut, le chiffre en bas, à droite, sous les unités." + U.colMul(46, 3).final },
      { t: "Chiffre par chiffre", h: "On multiplie le chiffre du bas par <b>chaque chiffre du haut</b>, en commençant par les unités.<br><br>46 × 3 : 6 × 3 = 18 → j'écris 8, je retiens 1.<br>4 × 3 = 12, + 1 de retenue = 13 → j'écris 13." },
      { t: "Ne pas oublier la retenue", h: "La retenue s'ajoute <b>après</b> la multiplication.<br>4 × 3 = 12, puis 12 + 1 = 13." }
    ],
    gen: function (d) {
      var a = d === 1 ? R(12, 49) : d === 2 ? R(102, 499) : R(234, 1999), b = d === 1 ? R(2, 5) : R(3, 9);
      if (a * b > 9999) a = Math.floor(9999 / b);
      var c = U.colMul(a, b);
      return U.num("Pose et calcule :" + big(f(a) + " × " + b), a * b, { visual: c.final, steps: c.steps, vis: c.vis });
    }
  });

  add(C2, {
    id: "m5-multiples", icon: "🔍", title: "Multiples et divisibilité",
    desc: "Reconnaître les multiples et les nombres divisibles par 2, 5, 10, 100.",
    learn: [
      { t: "Les multiples", h: "Les <b>multiples de 3</b>, ce sont les nombres du livret de 3 : 3, 6, 9, 12, 15, 18…<br>On peut continuer à l'infini !" },
      { t: "Divisible par 2", h: "Un nombre est divisible par 2 s'il est <b>pair</b> : il se termine par <b>0, 2, 4, 6 ou 8</b>.<br>346 ✔ · 351 ✘" },
      { t: "Divisible par 5, 10, 100", h: "Par <b>5</b> : il se termine par <b>0 ou 5</b>.<br>Par <b>10</b> : il se termine par <b>0</b>.<br>Par <b>100</b> : il se termine par <b>00</b>." }
    ],
    gen: function (d) {
      if (d === 1) {
        var k = R(2, 9), good = k * R(2, 10), bad = [];
        while (bad.length < 3) { var x = R(k + 1, 10 * k); if (x % k && bad.indexOf(f(x)) < 0) bad.push(f(x)); }
        return U.choice("Quel nombre est un <b>multiple de " + k + "</b> ?", f(good), bad,
          { steps: ["Je récite le livret de " + k + " : " + [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (i) { return i * k; }).join(", ") + ".", "<b>" + good + "</b> est dans le livret : " + good / k + " × " + k + " = " + good + "."] });
      }
      var div = pick(d === 2 ? [2, 5, 10] : [2, 5, 10, 100]), rule = { 2: "il se termine par 0, 2, 4, 6 ou 8", 5: "il se termine par 0 ou 5", 10: "il se termine par 0", 100: "il se termine par 00" }[div];
      function ok(n) { return n % div === 0; }
      if (d === 2) {
        var g, others = [];
        do { g = R(100, 9999); } while (!ok(g));
        while (others.length < 3) { var y = R(100, 9999); if (!ok(y) && others.indexOf(f(y)) < 0) others.push(f(y)); }
        return U.choice("Quel nombre est <b>divisible par " + div + "</b> ?", f(g), others, { steps: ["Divisible par " + div + " : " + rule + ".", "C'est le cas de <b>" + f(g) + "</b>."] });
      }
      var n = Math.random() < 0.5 ? R(10, 99) * (div === 100 ? 100 : div) : R(100, 9999);
      return U.yesno("Est-ce que <b>" + f(n) + "</b> est divisible par <b>" + div + "</b> ?", ok(n), { steps: ["Divisible par " + div + " : " + rule + ".", f(n) + (ok(n) ? " ✔ oui" : " ✘ non") + "."] });
    }
  });

  add(C2, {
    id: "m5-suites", icon: "🪜", title: "Suites de nombres",
    desc: "Trouver la règle d'une suite et la continuer.",
    learn: [
      { t: "Trouver la règle", h: "12 · 17 · 22 · 27 · ?<br>Je regarde de combien on avance : 12 → 17, c'est <b>+5</b>.<br>Je vérifie avec les suivants : 17 → 22 → 27, toujours +5.<br>Le suivant : 27 + 5 = <b>32</b>." },
      { t: "Ça peut aussi descendre", h: "100 · 90 · 80 · ?<br>On recule de 10 à chaque fois : <b>70</b>." }
    ],
    gen: function (d) {
      var step = d === 1 ? pick([2, 5, 10]) : d === 2 ? pick([3, 4, 6, 7, 8, 9, 25, 50, 100]) : pick([11, 15, 20, 25, 50, 100, 250, 500, 1000]);
      var down = d === 3 && Math.random() < 0.5, start = down ? R(5, 9) * step + R(0, 50) : R(0, 60);
      var seq = []; for (var i = 0; i < 5; i++) seq.push(down ? start - i * step : start + i * step);
      var hole = d === 3 ? R(1, 4) : 4, ans = seq[hole];
      var shown = seq.map(function (v, i) { return i === hole ? "?" : f(v); }).join(" · ");
      return U.num("Quel nombre remplace le « ? »" + big(shown), ans,
        { steps: ["De nombre en nombre, on " + (down ? "recule" : "avance") + " de <b>" + f(step) + "</b>.", "Le nombre qui manque : <b>" + f(ans) + "</b>"] });
    }
  });

  /* ================= Problèmes ================= */
  function prob(text, answer, why, calc, unit) {
    return U.num(text, answer, { unit: unit || "", steps: ["Je cherche : " + why + ".", "Calcul : " + calc + " = <b>" + f(answer) + "</b>", "Réponse : " + f(answer) + (unit ? " " + unit : "") + "."] });
  }
  add(C3, {
    id: "m5-problemes", icon: "🕵️", title: "Problèmes : +, −, ×",
    desc: "Lire un énoncé, choisir la bonne opération, calculer.",
    learn: [
      { t: "1. Bien lire", h: "Je lis l'énoncé <b>deux fois</b>. Je cherche <b>la question</b> : qu'est-ce qu'on me demande ?" },
      { t: "2. Choisir l'opération", h: "<b>+</b> : on ajoute, on reçoit, « en tout »<br><b>−</b> : on enlève, « il reste », « de plus que »<br><b>×</b> : plusieurs fois la même quantité (rangées, paquets, prix)<br><b>partager</b> : chacun reçoit la même part" },
      { t: "3. Calculer et vérifier", h: "Je calcule, puis je me demande : <b>est-ce que ma réponse a du sens ?</b><br>Si 25 enfants partent en course et que je trouve 300 cars… il y a un problème !" },
      { t: "4. Répondre par une phrase", h: "Sur ta feuille, termine par une phrase : « Léa a 313 cartes. »" }
    ],
    gen: function (d) {
      var a = kid(), b = kid(a), x, y, n, p, t = d === 3 ? R(5, 7) : R(0, d === 2 ? 5 : 4);
      var big1 = d === 1 ? 50 : 600;
      switch (t) {
        case 0: x = R(12, big1); y = R(5, big1);
          return prob(a.n + " a " + x + " cartes à collectionner. Pour son anniversaire, on lui en offre " + y + ". Combien de cartes a-t-" + a.il + " maintenant ?", x + y, "le nombre de cartes en tout", x + " + " + y, "cartes");
        case 1: x = R(30, big1 + 40); y = R(8, x - 5);
          return prob("Dans un car, il y a " + x + " places. " + y + " places sont occupées. Combien de places sont libres ?", x - y, "ce qui reste", x + " − " + y, "places");
        case 2: x = R(25, big1 + 30); y = R(10, x - 3);
          return prob(a.n + " a " + x + " billes et " + b.n + " en a " + y + ". Combien de billes " + a.n + " a-t-" + a.il + " de plus que " + b.n + " ?", x - y, "la différence entre les deux", x + " − " + y, "billes");
        case 3: x = R(2, d === 1 ? 5 : 9); y = d === 1 ? R(2, 10) : R(12, 45);
          return prob("Dans la salle de gym, il y a " + x + " rangées de " + y + " chaises. Combien y a-t-il de chaises en tout ?", x * y, "plusieurs fois la même quantité", x + " × " + y, "chaises");
        case 4: x = R(2, 9); y = d === 1 ? R(2, 5) : R(3, 15);
          return prob("Un ticket de piscine coûte " + y + " francs. Combien coûtent " + x + " tickets ?", x * y, "le prix de " + x + " tickets", x + " × " + y, "francs");
        case 5: n = R(2, 6); p = R(5, 15); x = n * p + R(5, 40);
          return U.num(a.n + " a " + x + " francs. " + (a.il === "elle" ? "Elle" : "Il") + " achète " + n + " livres à " + p + " francs. Combien d'argent lui reste-t-il ?", x - n * p,
            { unit: "francs", steps: ["Étape 1 — le prix des livres : " + n + " × " + p + " = " + n * p + " francs.", "Étape 2 — ce qui reste : " + x + " − " + n * p + " = <b>" + (x - n * p) + "</b> francs."] });
        case 6: n = R(3, 8); p = R(18, 26); x = R(2, 6);
          return U.num("Une école a " + n + " classes de " + p + " élèves et " + x + " enseignants. Combien de personnes y a-t-il en tout ?", n * p + x,
            { unit: "personnes", steps: ["Étape 1 — les élèves : " + n + " × " + p + " = " + n * p + ".", "Étape 2 — avec les enseignants : " + n * p + " + " + x + " = <b>" + (n * p + x) + "</b>."] });
        default: p = R(2, 9); n = R(3, 9); x = p * n;
          return U.num("On partage " + x + " bonbons entre " + p + " enfants. Chacun reçoit le même nombre de bonbons. Combien de bonbons chaque enfant reçoit-il ?", n,
            { unit: "bonbons", steps: ["Je cherche : la part de chacun.", "Je pense au livret de " + p + " : " + p + " × ? = " + x + ".", p + " × <b>" + n + "</b> = " + x + ", donc chacun reçoit " + n + " bonbons."] });
      }
    }
  });

  /* ================= Géométrie et mesures ================= */
  add(C4, {
    id: "m5-fractions", icon: "🍕", title: "Les fractions",
    desc: "Moitié, tiers, quart : lire et comparer des fractions simples.",
    learn: [
      { t: "Couper en parts égales", h: "Une fraction, c'est des parts <b>égales</b> d'un tout.<br>Le nombre <b>du bas</b> : en combien de parts on coupe.<br>Le nombre <b>du haut</b> : combien de parts on prend." + U.pie(4, 3) + "Ici : " + U.frac(3, 4) + " (trois quarts)" },
      { t: "Les noms", h: U.frac(1, 2) + " un demi (la moitié) · " + U.frac(1, 3) + " un tiers · " + U.frac(1, 4) + " un quart<br>" + U.frac(1, 5) + " un cinquième · " + U.frac(1, 10) + " un dixième" },
      { t: "Comparer", h: "Plus on coupe en parts, plus elles sont <b>petites</b> !<br>" + U.frac(1, 2) + " est plus grand que " + U.frac(1, 4) + "." + U.bar(2, 1) + U.bar(4, 1) }
    ],
    gen: function (d) {
      if (d === 3 && Math.random() < 0.5) {
        var den = U.shuffle([2, 3, 4, 5, 6, 8, 10]).slice(0, 4), big2 = Math.random() < 0.5, best = big2 ? Math.min.apply(null, den) : Math.max.apply(null, den);
        return U.choice("Quelle fraction est la plus <b>" + (big2 ? "grande" : "petite") + "</b> ?", U.frac(1, best), den.filter(function (x) { return x !== best; }).map(function (x) { return U.frac(1, x); }),
          { steps: ["Toutes les fractions ont 1 part. Plus on coupe en parts, plus elles sont petites.", "La plus " + (big2 ? "grande" : "petite") + " : " + U.frac(1, best) + "."] });
      }
      var n = d === 1 ? R(2, 4) : R(3, 8), k = R(1, n - 1), pic = Math.random() < 0.6 ? U.pie(n, k) : U.bar(n, k);
      var bad = [U.frac(n, k), U.frac(k, n + 1), U.frac(n - k, n), U.frac(k + 1, n), U.frac(k, n - 1)].filter(function (x) { return x !== U.frac(k, n); });
      return U.choice("Quelle fraction est coloriée ?" + pic, U.frac(k, n), U.shuffle(bad),
        { steps: ["Le tout est coupé en <b>" + n + "</b> parts égales : c'est le nombre du bas.", "<b>" + k + "</b> parts sont coloriées : c'est le nombre du haut.", "Réponse : " + U.frac(k, n)] });
    }
  });

  var SH_INFO = {
    "carré": "4 côtés égaux et 4 angles droits", "rectangle": "4 angles droits, les côtés opposés de même longueur",
    "triangle": "3 côtés et 3 sommets", "triangle rectangle": "3 côtés, dont un angle droit", "losange": "4 côtés égaux, mais pas forcément d'angle droit", "cercle": "une ligne courbe : tous ses points sont à la même distance du centre"
  };
  add(C4, {
    id: "m5-figures", icon: "🔷", title: "Les figures planes",
    desc: "Carré, rectangle, triangle, losange, cercle et leurs propriétés.",
    learn: [
      { t: "Le carré et le rectangle", h: U.shape("carré") + U.shape("rectangle") + "<br>Le <b>carré</b> : 4 côtés égaux, 4 angles droits.<br>Le <b>rectangle</b> : 4 angles droits, côtés opposés égaux." },
      { t: "Le losange et le triangle", h: U.shape("losange") + U.shape("triangle") + "<br>Le <b>losange</b> : 4 côtés égaux.<br>Le <b>triangle</b> : 3 côtés, 3 sommets." },
      { t: "Le cercle", h: U.shape("cercle") + "<br>Le <b>cercle</b> n'a pas de côté : c'est une ligne courbe dont tous les points sont à la même distance du centre." },
      { t: "Parallèles et perpendiculaires", h: "Deux droites <b>parallèles</b> ne se croisent jamais, comme des rails de train.<br>Deux droites <b>perpendiculaires</b> se croisent en faisant un angle droit, comme le coin d'une feuille." }
    ],
    gen: function (d) {
      var names = ["carré", "rectangle", "triangle", "losange", "cercle"];
      if (d === 1) {
        var nm = pick(names), rot = nm === "carré" ? pick([0, 0, 45]) : pick([0, 15, 30, 90]);
        return U.choice("Comment s'appelle cette figure ?" + U.shape(nm, rot), nm, U.shuffle(names.filter(function (x) { return x !== nm; })), { steps: ["C'est un <b>" + nm + "</b> : " + SH_INFO[nm] + "."] });
      }
      if (d === 2) {
        var q = pick([["carré", 4], ["rectangle", 4], ["triangle", 3], ["losange", 4]]), what = pick(["côtés", "sommets"]);
        return U.num("Combien de <b>" + what + "</b> a un <b>" + q[0] + "</b> ?" + U.shape(q[0]), q[1], { steps: ["Je compte les " + what + " sur le dessin : <b>" + q[1] + "</b>."] });
      }
      var Q = pick([
        ["Quelle figure a 4 côtés égaux <b>et</b> 4 angles droits ?", "carré", ["losange", "rectangle", "triangle"]],
        ["Quelle figure a 4 angles droits, mais pas forcément 4 côtés égaux ?", "rectangle", ["losange", "triangle", "cercle"]],
        ["Quelle figure a 4 côtés égaux, mais pas d'angle droit ?", "losange", ["carré", "rectangle", "triangle"]],
        ["Quelle figure n'a aucun côté ?", "cercle", ["carré", "triangle", "losange"]]]);
      if (Math.random() < 0.4) {
        var y = pick([["Un carré a-t-il 4 angles droits ?", true, "Oui : le carré a 4 angles droits."],
          ["Un losange a-t-il toujours 4 angles droits ?", false, "Non : seulement s'il est aussi un carré."],
          ["Un rectangle a-t-il toujours 4 côtés égaux ?", false, "Non : seulement s'il est aussi un carré."],
          ["Un triangle peut-il avoir un angle droit ?", true, "Oui : c'est un triangle rectangle."]]);
        return U.yesno(y[0], y[1], { steps: [y[2]] });
      }
      return U.choice(Q[0], Q[1], Q[2], { steps: ["C'est le <b>" + Q[1] + "</b> : " + SH_INFO[Q[1]] + "."] });
    }
  });

  var SOL = { "cube": [6, 12, 8, "6 faces carrées"], "pavé": [6, 12, 8, "6 faces rectangulaires"], "pyramide": [5, 8, 5, "1 base carrée et 4 faces triangulaires"] };
  add(C4, {
    id: "m5-solides", icon: "🧊", title: "Les solides",
    desc: "Cube, pavé, pyramide : faces, arêtes et sommets.",
    learn: [
      { t: "Faces, arêtes, sommets", h: U.solid("cube") + "<br>Les <b>faces</b> : les surfaces plates.<br>Les <b>arêtes</b> : les bords où deux faces se touchent.<br>Les <b>sommets</b> : les coins, où plusieurs arêtes se rejoignent." },
      { t: "Le cube et le pavé", h: U.solid("cube") + U.solid("pavé") + "<br>Les deux ont <b>6 faces, 12 arêtes, 8 sommets</b>.<br>Le cube a des faces carrées, le pavé (une boîte) des faces rectangulaires." },
      { t: "La pyramide", h: U.solid("pyramide") + "<br>La pyramide à base carrée : <b>5 faces</b> (1 carré + 4 triangles), <b>8 arêtes</b>, <b>5 sommets</b>." },
      { t: "Le patron", h: "Le <b>patron</b> d'un solide, c'est sa forme dépliée à plat. Le patron du cube est fait de <b>6 carrés</b>." }
    ],
    gen: function (d) {
      var nm = pick(["cube", "pavé", "pyramide"]), s = SOL[nm];
      if (d === 1) return U.choice("Comment s'appelle ce solide ?" + U.solid(nm), nm, ["cube", "pavé", "pyramide", "cylindre"].filter(function (x) { return x !== nm; }), { steps: ["C'est un <b>" + nm + "</b> : " + s[3] + "."] });
      var w = d === 2 ? pick([0, 2]) : pick([0, 1, 2]), word = ["faces", "arêtes", "sommets"][w];
      return U.num("Combien de <b>" + word + "</b> a ce " + nm + " ?" + U.solid(nm), s[w], { steps: ["Le " + nm + " a " + s[0] + " faces, " + s[1] + " arêtes et " + s[2] + " sommets.", "Réponse : <b>" + s[w] + "</b> " + word + "."] });
    }
  });

  add(C4, {
    id: "m5-symetrie", icon: "🦋", title: "Les axes de symétrie",
    desc: "Trouver les axes de symétrie d'une figure.",
    learn: [
      { t: "Plier en deux", h: "Un <b>axe de symétrie</b> partage une figure en deux moitiés qui se superposent exactement quand on plie, comme les ailes d'un papillon 🦋." + U.shape("carré", 0, [100, 20, 100, 180]) },
      { t: "Combien d'axes ?", h: "Carré : <b>4</b> axes · Rectangle : <b>2</b> · Losange : <b>2</b><br>Triangle aux 3 côtés égaux : <b>3</b> · Cercle : une infinité !" },
      { t: "Le piège du rectangle", h: "La <b>diagonale</b> d'un rectangle n'est <b>pas</b> un axe de symétrie : si on plie, les coins ne se superposent pas.<br>Pour le carré, la diagonale est bien un axe." + U.shape("rectangle", 0, [20, 60, 180, 140]) }
    ],
    gen: function (d) {
      if (d === 1) {
        var yes = ["A", "H", "I", "M", "O", "T", "U", "V", "W", "X", "Y", "B", "C", "D", "E"], no = ["F", "G", "J", "L", "P", "R", "S", "Z", "N", "Q"];
        var has = Math.random() < 0.5, ch = pick(has ? yes : no);
        return U.yesno("Cette lettre a-t-elle un axe de symétrie ?" + U.letter(ch), has, { steps: [has ? "Oui : on peut la plier en deux moitiés identiques." : "Non : aucun pliage ne donne deux moitiés identiques."] });
      }
      if (d === 2) {
        var q = pick([["carré", "4"], ["rectangle", "2"], ["losange", "2"], ["cercle", "une infinité"]]);
        return U.choice("Combien d'axes de symétrie a ce <b>" + q[0] + "</b> ?" + U.shape(q[0]), q[1], ["1", "2", "4", "une infinité", "0"].filter(function (x) { return x !== q[1]; }), { steps: ["Le " + q[0] + " a <b>" + q[1] + "</b> axe" + (q[1] === "1" ? "" : "s") + " de symétrie."] });
      }
      var c = pick([["carré", [100, 20, 100, 180], true], ["carré", [45, 45, 155, 155], true], ["rectangle", [20, 60, 180, 140], false], ["rectangle", [100, 40, 100, 160], true], ["rectangle", [10, 100, 190, 100], true], ["losange", [100, 10, 100, 190], true], ["triangle rectangle", [40, 30, 165, 165], false]]);
      return U.yesno("La ligne bleue est-elle un axe de symétrie ?" + U.shape(c[0], 0, c[1]), c[2], { steps: [c[2] ? "Oui : si on plie le long de la ligne, les deux moitiés se superposent." : "Non : si on plie le long de la ligne, les deux parties ne se superposent pas."] });
    }
  });

  add(C4, {
    id: "m5-mesures", icon: "📏", title: "Mesurer : cm et m",
    desc: "Lire une règle et passer des mètres aux centimètres.",
    learn: [
      { t: "Mesurer avec la règle", h: "On place le <b>0</b> de la règle au début de l'objet, puis on lit le nombre à l'autre bout." + U.ruler(0, 7) + "Ce crayon mesure <b>7 cm</b>." },
      { t: "Si l'objet ne commence pas à 0", h: "On fait la différence : fin − début." + U.ruler(2, 9) + "9 − 2 = <b>7 cm</b>." },
      { t: "Mètres et centimètres", h: "<b>1 m = 100 cm</b><br>3 m = 300 cm<br>2 m 45 cm = 200 + 45 = <b>245 cm</b>" }
    ],
    gen: function (d) {
      if (d === 1 || (d === 3 && Math.random() < 0.4)) {
        var st = d === 1 ? 0 : R(1, 5), en = st + R(3, d === 1 ? 14 : 15 - st);
        if (en > 16) en = 16;
        return U.num("Combien mesure ce crayon ?" + U.ruler(st, en), en - st, { unit: "cm", steps: [st ? "Le crayon commence à " + st + " et finit à " + en + " : " + en + " − " + st + " = <b>" + (en - st) + " cm</b>." : "Le crayon commence à 0 et finit à <b>" + en + " cm</b>."] });
      }
      var m = R(1, 9), cm = R(1, 95);
      if (d === 2 && Math.random() < 0.5) return U.num("Combien de centimètres ?" + big(m + " m = ? cm"), m * 100, { unit: "cm", steps: ["1 m = 100 cm, donc " + m + " m = " + m + " × 100 = <b>" + m * 100 + " cm</b>."] });
      if (d === 2) return U.num("Combien de centimètres ?" + big(m + " m " + cm + " cm = ? cm"), m * 100 + cm, { unit: "cm", steps: [m + " m = " + m * 100 + " cm.", m * 100 + " + " + cm + " = <b>" + (m * 100 + cm) + " cm</b>."] });
      var tot = m * 100 + cm, good = m + " m " + cm + " cm";
      return U.choice("Quelle longueur est égale à <b>" + tot + " cm</b> ?", good, [(m + 1) + " m " + cm + " cm", m + " m " + (cm + 10 > 99 ? cm - 10 : cm + 10) + " cm", Math.floor(tot / 10) + " m " + (tot % 10) + " cm", cm + " m " + m + " cm"],
        { steps: [tot + " cm = " + m * 100 + " cm + " + cm + " cm.", m * 100 + " cm = " + m + " m, donc <b>" + good + "</b>."] });
    }
  });
})();
