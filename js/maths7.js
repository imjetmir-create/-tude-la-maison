/* Mathématiques 7H : thèmes alignés sur le Plan d'études romand (cycle 2, 7e-8e) */
(function () {
  "use strict";
  var T = window.THEMES = window.THEMES || [];
  var R = U.R, pick = U.pick, f = U.fmt, big = U.big, rd = U.round;
  function add(chapter, o) { o.grade = 7; o.subject = "maths"; o.chapter = chapter; T.push(o); }
  var KIDS = [["Léa", 1], ["Noah", 0], ["Emma", 1], ["Luca", 0], ["Mia", 1], ["Liam", 0], ["Chloé", 1], ["Gabriel", 0], ["Zoé", 1], ["Nathan", 0]];
  function kid() { var k = pick(KIDS); return { n: k[0], il: k[1] ? "elle" : "il", Il: k[1] ? "Elle" : "Il" }; }
  function dec(min, max, dp) { var p = Math.pow(10, dp); return rd(R(min * p, max * p) / p); }

  var C1 = "Nombres décimaux et fractions", C2 = "Calculer", C3 = "Grandeurs et mesures", C4 = "Problèmes";

  /* ================= Décimaux et fractions ================= */
  add(C1, {
    id: "m7-decimaux", icon: "🔟", title: "Les nombres décimaux",
    desc: "Dixièmes, centièmes, millièmes : la valeur de chaque chiffre.",
    learn: [
      { t: "Après la virgule", h: "À droite de la virgule, on trouve les <b>dixièmes</b>, puis les <b>centièmes</b>, puis les <b>millièmes</b>." + U.placeTable(37.582) },
      { t: "Ce que vaut chaque chiffre", h: "1 dixième = " + U.frac(1, 10) + " = 0,1<br>1 centième = " + U.frac(1, 100) + " = 0,01<br><br>3,75 = 3 + 0,7 + 0,05<br>(3 unités, 7 dixièmes, 5 centièmes)" },
      { t: "Combien de dixièmes en tout ?", h: "Dans <b>2,5</b>, il y a <b>25 dixièmes</b> en tout (2 unités = 20 dixièmes, + 5).<br>Dans <b>3,25</b>, il y a <b>325 centièmes</b>." }
    ],
    gen: function (d) {
      var dp = d === 1 ? R(1, 2) : R(2, 3), n = dec(1, 99, dp);
      if (U.decs(n) < dp) n = rd(n + Math.pow(10, -dp));
      dp = U.decs(n);
      var kind = d === 1 ? "chiffre" : d === 2 ? pick(["chiffre", "compose"]) : pick(["compose", "total"]);
      var s = n.toFixed(dp).replace(".", "");
      if (kind === "chiffre") {
        var k = R(0, s.length - 1), dg = +s.charAt(s.length - 1 - k);
        return U.num("Dans " + big(f(n)) + "quel est le chiffre des <b>" + U.place(k, dp) + "</b> ?", dg, { visual: U.placeTable(n), steps: ["Dans le tableau, la colonne des " + U.place(k, dp) + " contient <b>" + dg + "</b>."] });
      }
      if (kind === "compose") {
        var parts = [];
        for (var i = 0; i < s.length; i++) { var dd = +s.charAt(i), kk = s.length - 1 - i; if (dd) parts.push(rd(dd * Math.pow(10, kk - dp))); }
        return U.num("Écris ce nombre :" + big(U.shuffle(parts).map(f).join(" + ")), n, { visual: U.placeTable(n), steps: ["Je range chaque nombre dans sa colonne du tableau.", "Résultat : <b>" + f(n) + "</b>"] });
      }
      var unit = pick(["dixièmes", "centièmes"]), m = unit === "dixièmes" ? 10 : 100, ans = Math.floor(rd(n * m));
      return U.num("Combien de <b>" + unit + " en tout</b> dans" + big(f(n)), ans, { visual: U.placeTable(n), steps: ["Je cache les chiffres à droite des " + unit + " et j'enlève la virgule : <b>" + ans + "</b>.", "Autre façon : " + f(n) + " × " + m + " = " + f(rd(n * m)) + " → " + ans + " " + unit + " entiers."] });
    }
  });

  add(C1, {
    id: "m7-comparer", icon: "⚖️", title: "Comparer et ranger les décimaux",
    desc: "Ne pas se faire piéger : 2,5 est plus grand que 2,45 !",
    learn: [
      { t: "D'abord la partie entière", h: "On compare d'abord ce qui est <b>avant la virgule</b>.<br>12,1 &gt; 9,87 parce que 12 &gt; 9." },
      { t: "Puis chiffre par chiffre", h: "Même partie entière ? On compare les dixièmes, puis les centièmes…<br><br>Astuce : on ajoute des <b>zéros</b> pour avoir le même nombre de chiffres :<br>2,5 = 2,<b>50</b> et 2,45 → 50 &gt; 45<br>donc <b>2,5 &gt; 2,45</b>." },
      { t: "Le grand piège", h: "Un nombre avec plus de chiffres après la virgule n'est <b>pas</b> forcément plus grand !<br>0,7 &gt; 0,65 · 3,8 &gt; 3,08" }
    ],
    gen: function (d) {
      function trap() {
        var a = R(1, 9), x = R(1, 8);
        return pick([[rd(a + x / 10), rd(a + x / 10 + R(1, 9) / 100 - 0.1 * R(0, 0))], [rd(a + x / 10), rd(a + (x - 1) / 10 + R(1, 9) / 100)], [rd(a + x / 10), rd(a + x / 100)], [rd(a + x / 100), rd(a + x / 10 + R(1, 9) / 1000)]]);
      }
      if (d === 3 && Math.random() < 0.5) {
        var p = trap(), base = Math.floor(p[0]), set = [];
        while (set.length < 4) { var v = rd(base + R(1, 99) / pick([10, 100, 100])); if (v > base && v < base + 1 && set.indexOf(v) < 0) set.push(v); }
        var gr = Math.random() < 0.5, best = gr ? Math.max.apply(null, set) : Math.min.apply(null, set);
        return U.choice("Quel est le <b>plus " + (gr ? "grand" : "petit") + "</b> nombre ?", f(best), set.filter(function (x) { return x !== best; }).map(f),
          { steps: ["Même partie entière (" + base + ") : je compare les dixièmes, puis les centièmes.", "J'écris tous les nombres avec 2 chiffres après la virgule : " + set.map(function (x) { return x.toFixed(2).replace(".", ","); }).join(" · ") + ".", "Le plus " + (gr ? "grand" : "petit") + " : <b>" + f(best) + "</b>."] });
      }
      var a, b;
      if (d === 1) { a = dec(1, 30, 1); b = Math.random() < 0.1 ? a : dec(1, 30, R(1, 2)); }
      else { var t = trap(); a = t[0]; b = t[1]; if (Math.random() < 0.5) { a = t[1]; b = t[0]; } if (Math.random() < 0.1) b = a; }
      var sign = a < b ? "&lt;" : a > b ? "&gt;" : "=", w = Math.max(U.decs(a), U.decs(b), 1);
      return U.choice("Quel signe faut-il mettre ?" + big(f(a) + " … " + f(b)), sign, ["&lt;", "&gt;", "="].filter(function (x) { return x !== sign; }),
        { steps: ["J'écris les deux nombres avec le même nombre de décimales : " + a.toFixed(w).replace(".", ",") + " et " + b.toFixed(w).replace(".", ",") + ".", "Je compare de gauche à droite : <b>" + f(a) + " " + sign + " " + f(b) + "</b>."] });
    }
  });

  add(C1, {
    id: "m7-fractions", icon: "🍰", title: "Fractions et décimaux",
    desc: "Moitié, quart, trois quarts d'une quantité, et l'écriture décimale.",
    learn: [
      { t: "La fraction d'une quantité", h: "Le <b>quart</b> de 36 : je partage 36 en 4 → 36 : 4 = <b>9</b>.<br>Le <b>tiers</b> de 27 : 27 : 3 = <b>9</b>." },
      { t: "Plusieurs parts", h: "Les " + U.frac(3, 4) + " de 20 :<br>1. Un quart : 20 : 4 = 5<br>2. Trois quarts : 5 × 3 = <b>15</b>" },
      { t: "Une même valeur, plusieurs écritures", h: U.frac(1, 2) + " = 0,5 = " + U.frac(5, 10) + "<br>" + U.frac(1, 4) + " = 0,25 · " + U.frac(3, 4) + " = 0,75<br>" + U.frac(1, 10) + " = 0,1 · " + U.frac(7, 10) + " = 0,7 · " + U.frac(3, 100) + " = 0,03" }
    ],
    gen: function (d) {
      var NM = { 2: "la moitié", 3: "le tiers", 4: "le quart", 5: "le cinquième", 10: "le dixième" };
      if (d === 1) {
        var den = pick([2, 3, 4, 5, 10]), q = R(2, 15), n = den * q;
        return U.num("Combien vaut " + NM[den] + " de " + n + " ?", q, { steps: [NM[den].charAt(0).toUpperCase() + NM[den].slice(1) + ", c'est partager en " + den + " : " + n + " : " + den + " = <b>" + q + "</b>."] });
      }
      if (d === 2) {
        var de = pick([3, 4, 5, 10]), nu = R(2, de - 1), qq = R(2, 12), tot = de * qq;
        return U.num("Combien valent les " + U.frac(nu, de) + " de <b>" + tot + "</b> ?", nu * qq, { steps: ["Une part : " + tot + " : " + de + " = " + qq + ".", nu + " parts : " + qq + " × " + nu + " = <b>" + nu * qq + "</b>."] });
      }
      var pairs = [[1, 2, 0.5], [1, 4, 0.25], [3, 4, 0.75], [1, 5, 0.2], [2, 5, 0.4], [R(1, 9), 10], [R(1, 99), 100]], p = pick(pairs);
      if (p.length === 2) p.push(rd(p[0] / p[1]));
      if (Math.random() < 0.5) return U.num("Écris en nombre décimal :" + big(U.frac(p[0], p[1])), p[2], { steps: [U.frac(p[0], p[1]) + " = " + p[0] + " : " + p[1] + " = <b>" + f(p[2]) + "</b>."] });
      var bad = [U.frac(p[1], p[0]), U.frac(Math.round(p[2] * 10), 100), U.frac(p[0] + 1, p[1]), U.frac(p[0], p[1] * 10)].filter(function (x) { return x !== U.frac(p[0], p[1]); });
      return U.choice("Quelle fraction est égale à <b>" + f(p[2]) + "</b> ?", U.frac(p[0], p[1]), bad, { steps: [U.frac(p[0], p[1]) + " = " + p[0] + " : " + p[1] + " = <b>" + f(p[2]) + "</b>."] });
    }
  });

  add(C1, {
    id: "m7-droite", icon: "📍", title: "La droite graduée",
    desc: "Lire un nombre placé sur une droite graduée.",
    learn: [
      { t: "Trouver la valeur d'un petit trait", h: "1. Je prends deux nombres écrits.<br>2. Je compte les <b>intervalles</b> (les espaces) entre eux.<br>3. Écart : nombre d'intervalles = valeur d'un intervalle." + U.numLine(2, 3, 10, 7, [0, 10]) + "De 2 à 3, il y a 10 intervalles → chacun vaut 0,1. La flèche montre <b>2,7</b>." }
    ],
    gen: function (d) {
      var min, step, n = 10, v, labels;
      if (d === 1) { step = pick([1, 2, 5, 10]); min = R(0, 10) * step * 2; }
      else if (d === 2) { step = 0.1; min = R(0, 20); }
      else { var o = pick([[0.01, 10], [0.25, 4], [0.5, 8], [0.2, 5]]); step = o[0]; n = o[1]; min = step === 0.01 ? rd(R(0, 50) / 10) : R(0, 10); }
      var max = rd(min + step * n);
      v = R(1, n - 1);
      labels = d === 3 || n !== 10 ? [0, n] : [0, n / 2, n];
      var ans = rd(min + step * v);
      return U.num("Quel nombre la flèche montre-t-elle ?" + U.numLine(min, max, n, v, labels), ans,
        { steps: ["De " + f(min) + " à " + f(max) + ", il y a " + n + " intervalles.", "Un intervalle vaut (" + f(max) + " − " + f(min) + ") : " + n + " = " + f(step) + ".", "La flèche est " + v + " intervalles après " + f(min) + " : " + f(min) + " + " + v + " × " + f(step) + " = <b>" + f(ans) + "</b>."] });
    }
  });

  /* ================= Calculer ================= */
  add(C2, {
    id: "m7-livrets", icon: "✖️", title: "Livrets jusqu'à 12 × 12",
    desc: "Multiplications et divisions du livret, par cœur.",
    learn: [
      { t: "Les livrets de 11 et 12", h: "× 11 jusqu'à 9 : on double le chiffre. 11 × 7 = <b>77</b><br>× 12 = × 10 + × 2 : 12 × 7 = 70 + 14 = <b>84</b><br>12 × 12 = <b>144</b>" },
      { t: "La division, c'est le livret à l'envers", h: "56 : 8 = ? → je cherche <b>8 × ? = 56</b>.<br>8 × 7 = 56, donc 56 : 8 = <b>7</b>." }
    ],
    gen: function (d) {
      var a = d === 1 ? R(6, 9) : R(6, 12), b = d === 1 ? R(3, 9) : R(3, 12);
      if (d === 2) a = pick([11, 12, R(6, 9)]);
      var kind = d === 1 ? "mul" : d === 2 ? pick(["mul", "div"]) : pick(["mul", "div", "miss"]);
      if (kind === "div") return U.num("Calcule :" + big(a * b + " : " + a), b, { steps: ["Je cherche " + a + " × ? = " + a * b + ".", a + " × " + b + " = " + a * b + ", donc " + a * b + " : " + a + " = <b>" + b + "</b>."] });
      if (kind === "miss") return U.num("Quel nombre manque ?" + big("? × " + a + " = " + a * b), b, { steps: [b + " × " + a + " = " + a * b + ", donc il manque <b>" + b + "</b>."] });
      var st = a === 12 || b === 12 ? ["× 12 = × 10 + × 2 : " + (a === 12 ? b : a) + " × 10 + " + (a === 12 ? b : a) + " × 2 = " + (a === 12 ? b : a) * 10 + " + " + (a === 12 ? b : a) * 2 + "."] :
        a === 11 || b === 11 ? ["× 11 = × 10 + × 1 : " + (a === 11 ? b : a) * 10 + " + " + (a === 11 ? b : a) + "."] : [];
      return U.num("Calcule :" + big(a + " × " + b), a * b, { steps: st.concat([a + " × " + b + " = <b>" + a * b + "</b>"]) });
    }
  });

  add(C2, {
    id: "m7-adddec", icon: "➕", title: "Additions et soustractions de décimaux",
    desc: "Aligner les virgules et calculer en colonnes.",
    learn: [
      { t: "Virgule sous virgule !", h: "On aligne les <b>virgules</b> les unes sous les autres : unités sous unités, dixièmes sous dixièmes…" + U.colAdd(12.5, 3.75).final },
      { t: "Compléter avec des zéros", h: "4,5 − 1,27 : j'écris 4,5<b>0</b> pour avoir autant de chiffres que 1,27." + U.colSub(4.5, 1.27).final },
      { t: "Un nombre entier a aussi une virgule", h: "7 = 7,00<br>7 − 2,35 → 7,00 − 2,35 = <b>4,65</b>" }
    ],
    gen: function (d) {
      var a, b, plus = d === 1 ? Math.random() < 0.7 : Math.random() < 0.5;
      if (d === 1) { a = dec(1, 50, 1); b = dec(1, 40, 1); }
      else if (d === 2) { a = dec(5, 200, 2); b = dec(1, 99, R(1, 2)); }
      else { a = Math.random() < 0.4 ? R(5, 50) : dec(5, 300, R(1, 3)); b = dec(1, 99, R(1, 3)); }
      if (!plus && b > a) { var t = a; a = b; b = t; }
      if (!plus && a === b) a = rd(a + 1);
      var c = plus ? U.colAdd(a, b) : U.colSub(a, b), ans = rd(plus ? a + b : a - b);
      return U.num("Pose et calcule :" + big(f(a) + (plus ? " + " : " − ") + f(b)), ans, { visual: c.final, steps: ["J'aligne les virgules et je complète avec des zéros si besoin."].concat(c.steps), vis: [c.vis[0]].concat(c.vis) });
    }
  });

  add(C2, {
    id: "m7-mul", icon: "🧮", title: "Multiplications en colonnes",
    desc: "Multiplier par un nombre à deux chiffres, et des décimaux.",
    learn: [
      { t: "Multiplier par 2 chiffres", h: "47 × 23 : on fait deux lignes.<br>Ligne 1 : 47 × 3 = 141<br>Ligne 2 : 47 × 20 = 940 (j'écris d'abord un <b>0</b>, puis 47 × 2)<br>Puis on additionne : 141 + 940 = <b>1081</b>" + U.colMul(47, 23).final },
      { t: "Avec un nombre décimal", h: "3,25 × 4 : je calcule <b>sans la virgule</b> : 325 × 4 = 1300.<br>3,25 a 2 chiffres après la virgule → le résultat aussi : 13,00 = <b>13</b>." }
    ],
    gen: function (d) {
      if (d === 3 && Math.random() < 0.5) {
        var dp = R(1, 2), x = dec(1, 40, dp), m = R(2, 9), xi = Math.round(x * Math.pow(10, U.decs(x))), c = U.colMul(xi, m), ans = rd(x * m);
        return U.num("Pose et calcule :" + big(f(x) + " × " + m), ans, { visual: c.final,
          steps: ["Je calcule sans la virgule : " + f(xi) + " × " + m + "."].concat(c.steps.slice(0, -1)).concat([f(xi) + " × " + m + " = " + f(xi * m) + ". " + f(x) + " a " + U.decs(x) + " chiffre" + (U.decs(x) > 1 ? "s" : "") + " après la virgule → <b>" + f(ans) + "</b>."]) });
      }
      var a = d === 1 ? R(102, 999) : d === 2 ? R(12, 99) : R(102, 999), b = d === 1 ? R(3, 9) : R(12, 89);
      while (b % 10 === 0) b++;
      var cc = U.colMul(a, b);
      return U.num("Pose et calcule :" + big(f(a) + " × " + b), a * b, { visual: cc.final, steps: cc.steps, vis: cc.vis });
    }
  });

  add(C2, {
    id: "m7-div", icon: "➗", title: "Divisions",
    desc: "Poser une division, trouver le quotient et le reste.",
    learn: [
      { t: "Les mots de la division", h: "756 : 3 = 252<br><b>756</b> est le dividende, <b>3</b> le diviseur, <b>252</b> le quotient.<br>S'il reste quelque chose à la fin, c'est le <b>reste</b>." },
      { t: "La méthode", h: "756 : 3<br>• Dans 7, combien de fois 3 ? <b>2</b> fois (6), reste 1.<br>• J'abaisse le 5 → 15 : <b>5</b> fois, reste 0.<br>• J'abaisse le 6 → 6 : <b>2</b> fois, reste 0.<br>Résultat : <b>252</b>" },
      { t: "Vérifier", h: "Je vérifie avec une multiplication :<br>252 × 3 = 756 ✔<br><br>Avec un reste : 17 : 5 = 3 reste 2, car 3 × 5 + 2 = 17." }
    ],
    gen: function (d) {
      var dv, q;
      if (d === 1) { dv = R(2, 9); q = R(12, 120); }
      else if (d === 2) { dv = R(3, 9); q = R(120, 1100); }
      else if (Math.random() < 0.5) { dv = R(11, 25); q = R(12, 99); }
      else {
        dv = R(3, 9); q = R(25, 300); var r = R(1, dv - 1), a0 = q * dv + r, L0 = U.longDiv(a0, dv);
        return U.num("Pose la division. Quel est le <b>reste</b> ?" + big(f(a0) + " : " + dv), r, { steps: L0.steps.concat(["Vérification : " + f(q) + " × " + dv + " + " + r + " = " + f(a0) + " ✔"]) });
      }
      var a = q * dv, L = U.longDiv(a, dv);
      return U.num("Pose et calcule :" + big(f(a) + " : " + dv), q, { steps: L.steps.concat(["Vérification : " + f(q) + " × " + dv + " = " + f(a) + " ✔"]) });
    }
  });

  add(C2, {
    id: "m7-x10", icon: "🚀", title: "× et : par 10, 100, 1000",
    desc: "Déplacer les chiffres : la virgule ne se trompe jamais.",
    learn: [
      { t: "Multiplier par 10, 100, 1000", h: "× 10 : chaque chiffre prend une valeur <b>10 fois plus grande</b> : la virgule se déplace de <b>1 rang vers la droite</b>.<br>3,75 × 10 = 37,5<br>3,75 × 100 = 375<br>3,75 × 1000 = 3750 (on ajoute un 0)" },
      { t: "Diviser par 10, 100, 1000", h: ": 10 → la virgule se déplace de <b>1 rang vers la gauche</b>.<br>45 : 10 = 4,5<br>45 : 100 = 0,45<br>45 : 1000 = 0,045 (on ajoute des 0 devant)" }
    ],
    gen: function (d) {
      var m = pick([10, 100, 1000]), z = String(m).length - 1, x, mul;
      if (d === 1) { x = R(2, 99); mul = Math.random() < 0.6; if (!mul) x = x * m; }
      else if (d === 2) { x = dec(0.1, 50, R(1, 2)); mul = true; }
      else { x = Math.random() < 0.5 ? dec(0.1, 99, R(1, 2)) : R(3, 999); mul = Math.random() < 0.4; }
      var ans = rd(mul ? x * m : x / m);
      return U.num("Calcule :" + big(f(x) + (mul ? " × " : " : ") + f(m)), ans, { steps: [(mul ? "× " : ": ") + f(m) + " : les chiffres se déplacent de <b>" + z + " rang" + (z > 1 ? "s" : "") + "</b> vers la " + (mul ? "gauche (la valeur grandit), la virgule va vers la droite" : "droite (la valeur diminue), la virgule va vers la gauche") + ".", "Résultat : <b>" + f(ans) + "</b>"] });
    }
  });

  add(C2, {
    id: "m7-divisibilite", icon: "🔍", title: "Multiples, diviseurs, divisibilité",
    desc: "Les critères de divisibilité par 2, 3, 5, 9, 10 et 100.",
    learn: [
      { t: "Par 2, 5, 10, 100", h: "Par <b>2</b> : se termine par 0, 2, 4, 6, 8.<br>Par <b>5</b> : se termine par 0 ou 5.<br>Par <b>10</b> : se termine par 0.<br>Par <b>100</b> : se termine par 00." },
      { t: "Par 3 et par 9", h: "On additionne les chiffres !<br>Par <b>3</b> : la somme est dans le livret de 3.<br>Par <b>9</b> : la somme est dans le livret de 9.<br><br>252 → 2 + 5 + 2 = 9 → divisible par 3 <b>et</b> par 9." },
      { t: "Les diviseurs", h: "Les <b>diviseurs</b> de 12 : les nombres qui divisent 12 sans reste.<br>1, 2, 3, 4, 6, 12 → on les trouve par paires : 1 × 12, 2 × 6, 3 × 4." }
    ],
    gen: function (d) {
      if (d === 3 && Math.random() < 0.5) {
        var n = pick([12, 16, 18, 20, 24, 28, 30, 36, 40, 42, 48]), dvs = [];
        for (var i = 1; i <= n; i++) if (n % i === 0) dvs.push(i);
        var pairs = []; for (var j = 0; j < dvs.length && dvs[j] * dvs[j] <= n; j++) pairs.push(dvs[j] + " × " + n / dvs[j]);
        if (Math.random() < 0.5) return U.num("Combien le nombre <b>" + n + "</b> a-t-il de diviseurs ?", dvs.length, { steps: ["Je cherche les paires : " + pairs.join(" · ") + ".", "Les diviseurs : " + dvs.join(", ") + " → <b>" + dvs.length + "</b>."] });
        var bad = []; for (var k = 2; k < n; k++) if (n % k && bad.length < 6) bad.push(String(k));
        var notDiv = pick(bad);
        return U.choice("Quel nombre n'est <b>pas</b> un diviseur de " + n + " ?", notDiv, U.shuffle(dvs.slice(1, -1)).map(String), { steps: ["Les diviseurs de " + n + " : " + dvs.join(", ") + ".", "<b>" + notDiv + "</b> n'en fait pas partie : " + n + " : " + notDiv + " a un reste."] });
      }
      var dv = d === 1 ? pick([2, 5, 10]) : pick([3, 9, 3, 9, 2, 5, 100]), x = Math.random() < 0.5 ? dv * R(12, 999) : R(100, 9999);
      var sum = String(x).split("").reduce(function (s, c) { return s + +c; }, 0), yes = x % dv === 0;
      var why = dv === 3 || dv === 9 ? "Somme des chiffres : " + String(x).split("").join(" + ") + " = " + sum + (sum % dv === 0 ? " → dans le livret de " : " → pas dans le livret de ") + dv + "." :
        "Divisible par " + dv + " : " + { 2: "se termine par 0, 2, 4, 6 ou 8", 5: "se termine par 0 ou 5", 10: "se termine par 0", 100: "se termine par 00" }[dv] + ".";
      return U.yesno("Est-ce que <b>" + f(x) + "</b> est divisible par <b>" + dv + "</b> ?", yes, { steps: [why, yes ? "Donc <b>oui</b>." : "Donc <b>non</b>."] });
    }
  });

  add(C2, {
    id: "m7-priorites", icon: "🎯", title: "Parenthèses et priorités",
    desc: "Dans quel ordre calculer quand il y a plusieurs opérations.",
    learn: [
      { t: "L'ordre des calculs", h: "1. D'abord ce qui est entre <b>parenthèses</b>.<br>2. Puis les <b>×</b> et les <b>:</b>.<br>3. Enfin les <b>+</b> et les <b>−</b>, de gauche à droite." },
      { t: "Exemples", h: "3 + 4 × 5 = 3 + 20 = <b>23</b> (la × d'abord)<br>(3 + 4) × 5 = 7 × 5 = <b>35</b> (les parenthèses d'abord)" }
    ],
    gen: function (d) {
      var a = R(2, 12), b = R(2, 9), c = R(2, 9), e = R(2, 9), t = d === 1 ? R(0, 1) : d === 2 ? R(0, 3) : R(2, 5), ex, res, st;
      switch (t) {
        case 0: ex = a + " + " + b + " × " + c; res = a + b * c; st = [b + " × " + c + " = " + b * c + " (la × d'abord)", a + " + " + b * c + " = <b>" + res + "</b>"]; break;
        case 1: ex = "(" + a + " + " + b + ") × " + c; res = (a + b) * c; st = [a + " + " + b + " = " + (a + b) + " (les parenthèses d'abord)", (a + b) + " × " + c + " = <b>" + res + "</b>"]; break;
        case 2: a = b * c + R(1, 30); ex = a + " − " + b + " × " + c; res = a - b * c; st = [b + " × " + c + " = " + b * c, a + " − " + b * c + " = <b>" + res + "</b>"]; break;
        case 3: ex = b * c + " : " + c + " + " + a; res = b + a; st = [b * c + " : " + c + " = " + b, b + " + " + a + " = <b>" + res + "</b>"]; break;
        case 4: if (c <= e) c = e + R(1, 5); ex = "(" + a + " + " + b + ") × (" + c + " − " + e + ")"; res = (a + b) * (c - e); st = [a + " + " + b + " = " + (a + b) + " et " + c + " − " + e + " = " + (c - e), (a + b) + " × " + (c - e) + " = <b>" + res + "</b>"]; break;
        default: ex = a + " × " + b + " − " + c + " × " + e; if (a * b < c * e) { ex = c + " × " + e + " − " + a + " × " + b; res = c * e - a * b; st = [c + " × " + e + " = " + c * e + " et " + a + " × " + b + " = " + a * b, c * e + " − " + a * b + " = <b>" + res + "</b>"]; }
          else { res = a * b - c * e; st = [a + " × " + b + " = " + a * b + " et " + c + " × " + e + " = " + c * e, a * b + " − " + c * e + " = <b>" + res + "</b>"]; }
      }
      return U.num("Calcule :" + big(ex), res, { steps: st });
    }
  });

  /* ================= Grandeurs et mesures ================= */
  function convQ(val, from, to, factor, table) {
    var ans = rd(val * factor);
    return U.num("Convertis :" + big(f(val) + " " + from + " = ? " + to), ans, { unit: to, steps: [table, factor >= 1 ? "1 " + from + " = " + f(factor) + " " + to + ", donc je multiplie par " + f(factor) + "." : "1 " + to + " = " + f(rd(1 / factor)) + " " + from + ", donc je divise par " + f(rd(1 / factor)) + ".", f(val) + " " + from + " = <b>" + f(ans) + " " + to + "</b>"] });
  }
  var LEN = { km: 1000000, m: 1000, dm: 100, cm: 10, mm: 1 };
  add(C3, {
    id: "m7-longueurs", icon: "📏", title: "Conversions de longueurs",
    desc: "km, m, dm, cm, mm : passer d'une unité à l'autre.",
    learn: [
      { t: "Le tableau des longueurs", h: '<table class="ptab"><tr><th>km</th><th>…</th><th>…</th><th class="u">m</th><th>dm</th><th>cm</th><th>mm</th></tr></table>Entre m, dm, cm et mm : chaque fois <b>× 10</b> vers la droite.<br>1 km = <b>1000 m</b> · 1 m = 10 dm = 100 cm = <b>1000 mm</b>' },
      { t: "Vers une unité plus petite", h: "Le nombre devient <b>plus grand</b> : on multiplie.<br>3,5 m = 3,5 × 100 = <b>350 cm</b><br>2,5 km = 2,5 × 1000 = <b>2500 m</b>" },
      { t: "Vers une unité plus grande", h: "Le nombre devient <b>plus petit</b> : on divise.<br>45 mm = 45 : 10 = <b>4,5 cm</b><br>1250 m = 1250 : 1000 = <b>1,25 km</b>" }
    ],
    gen: function (d) {
      var pairs = [["m", "cm"], ["km", "m"], ["cm", "mm"], ["m", "mm"], ["dm", "cm"], ["m", "dm"]], p = pick(pairs), up = d >= 2 && Math.random() < 0.5;
      var from = up ? p[1] : p[0], to = up ? p[0] : p[1], factor = LEN[from] / LEN[to], val;
      if (d === 1) val = R(2, 60);
      else if (up) val = R(2, 99) * (factor < 1 ? Math.round(1 / factor) / pick([1, 10]) : 1);
      else val = dec(0.1, 30, R(1, 2));
      if (d === 3 && Math.random() < 0.3) {
        var m = R(1, 9), cm = R(1, 99);
        return U.num("Convertis :" + big(m + " m " + cm + " cm = ? cm"), m * 100 + cm, { unit: "cm", steps: [m + " m = " + m * 100 + " cm.", m * 100 + " + " + cm + " = <b>" + (m * 100 + cm) + " cm</b>"] });
      }
      return convQ(rd(val), from, to, factor, "Tableau : km · … · m · dm · cm · mm");
    }
  });

  add(C3, {
    id: "m7-masses", icon: "⚖️", title: "Masses et capacités",
    desc: "t, kg, g et l, dl : convertir les masses et les contenances.",
    learn: [
      { t: "Les masses", h: "1 t (tonne) = <b>1000 kg</b><br>1 kg = <b>1000 g</b><br><br>2,5 kg = 2,5 × 1000 = <b>2500 g</b><br>750 g = 750 : 1000 = <b>0,75 kg</b>" },
      { t: "Les capacités", h: "1 l (litre) = <b>10 dl</b> (décilitres)<br>Un verre contient environ 2 dl.<br><br>1,5 l = <b>15 dl</b> · 7 dl = <b>0,7 l</b>" }
    ],
    gen: function (d) {
      var p = pick([["kg", "g", 1000], ["t", "kg", 1000], ["l", "dl", 10]]), up = d >= 2 && Math.random() < 0.5, val;
      if (d === 1) val = R(2, 20);
      else if (up) val = p[2] === 10 ? R(3, 95) : R(1, 99) * pick([10, 50, 100]) + pick([0, 0, 5]);
      else val = dec(0.1, 12, R(1, p[2] === 10 ? 1 : 3));
      return up ? convQ(val, p[1], p[0], 1 / p[2], "1 " + p[0] + " = " + p[2] + " " + p[1]) : convQ(val, p[0], p[1], p[2], "1 " + p[0] + " = " + p[2] + " " + p[1]);
    }
  });

  add(C3, {
    id: "m7-durees", icon: "⏱️", title: "Les durées",
    desc: "Heures, minutes, secondes : attention, on compte par 60 !",
    learn: [
      { t: "Par 60, pas par 100 !", h: "1 h = <b>60 min</b> · 1 min = <b>60 s</b> · 1 jour = <b>24 h</b><br><br>2 h 15 min = 120 + 15 = <b>135 min</b>" },
      { t: "Le piège des décimaux", h: "1,5 h n'est <b>pas</b> 1 h 50 min !<br>0,5 h = la moitié d'une heure = <b>30 min</b>.<br>Donc 1,5 h = <b>1 h 30 min</b> = 90 min." },
      { t: "Calculer une durée", h: "De 14 h 35 à 16 h 10 :<br>14 h 35 → 15 h 00 : 25 min<br>15 h 00 → 16 h 00 : 60 min<br>16 h 00 → 16 h 10 : 10 min<br>Total : 25 + 60 + 10 = <b>95 min</b>" }
    ],
    gen: function (d) {
      if (d === 1) { var h = R(2, 9); return Math.random() < 0.5 ? U.num("Convertis :" + big(h + " h = ? min"), h * 60, { unit: "min", steps: ["1 h = 60 min, donc " + h + " × 60 = <b>" + h * 60 + " min</b>."] }) : U.num("Convertis :" + big(h + " min = ? s"), h * 60, { unit: "s", steps: ["1 min = 60 s, donc " + h + " × 60 = <b>" + h * 60 + " s</b>."] }); }
      if (d === 2) {
        var hh = R(1, 4), mm = R(5, 55);
        if (Math.random() < 0.5) return U.num("Convertis :" + big(hh + " h " + mm + " min = ? min"), hh * 60 + mm, { unit: "min", steps: [hh + " h = " + hh * 60 + " min.", hh * 60 + " + " + mm + " = <b>" + (hh * 60 + mm) + " min</b>."] });
        var tot = hh * 60 + mm, good = hh + " h " + mm + " min";
        return U.choice("Combien font <b>" + tot + " min</b> ?", good, [Math.floor(tot / 100) + " h " + tot % 100 + " min", (hh + 1) + " h " + mm + " min", hh + " h " + (mm > 30 ? mm - 20 : mm + 20) + " min", (hh - 1 > 0 ? hh - 1 : hh + 2) + " h " + mm + " min"],
          { steps: ["Dans " + tot + " min, combien de fois 60 ? " + hh + " fois (" + hh * 60 + " min).", "Il reste " + tot + " − " + hh * 60 + " = " + mm + " min → <b>" + good + "</b>."] });
      }
      if (Math.random() < 0.4) { var x = pick([1.5, 2.5, 0.5, 0.25, 0.75, 3.5]); return U.num("Convertis :" + big(f(x) + " h = ? min"), x * 60, { unit: "min", steps: ["1 h = 60 min, donc " + f(x) + " h = " + f(x) + " × 60 = <b>" + x * 60 + " min</b>.", "Attention : " + f(x) + " h n'est pas " + Math.floor(x) + " h " + Math.round((x % 1) * 100) + " min !"] }); }
      var sh = R(8, 18), sm = R(5, 55), dur = R(65 - sm, 175), e = sh * 60 + sm + dur, eh = Math.floor(e / 60), em = e % 60, mm2 = function (m) { return m < 10 ? "0" + m : m; };
      var toNext = 60 - sm, rest = dur - toNext, fullH = Math.floor(rest / 60), lastM = rest % 60;
      return U.num("Un film commence à <b>" + sh + " h " + mm2(sm) + "</b> et se termine à <b>" + eh + " h " + mm2(em) + "</b>. Combien de minutes dure-t-il ?", dur, { unit: "min",
        steps: [sh + " h " + mm2(sm) + " → " + (sh + 1) + " h 00 : " + toNext + " min.", fullH ? "Puis " + fullH + " heure" + (fullH > 1 ? "s" : "") + " entière" + (fullH > 1 ? "s" : "") + " : " + fullH * 60 + " min." : "Pas d'heure entière.", "Puis " + lastM + " min jusqu'à " + eh + " h " + mm2(em) + ".", "Total : " + toNext + (fullH ? " + " + fullH * 60 : "") + " + " + lastM + " = <b>" + dur + " min</b>."] });
    }
  });

  add(C3, {
    id: "m7-perimetre", icon: "🔲", title: "Le périmètre",
    desc: "Calculer la longueur du tour d'une figure.",
    learn: [
      { t: "Le tour de la figure", h: "Le <b>périmètre</b>, c'est la longueur du <b>tour</b> d'une figure, comme une clôture autour d'un jardin." },
      { t: "Les formules", h: "Rectangle : (longueur + largeur) × 2<br>Carré : côté × 4<br>Triangle et autres : on <b>additionne tous les côtés</b>." + U.rect(8, 5, "cm") + "(8 + 5) × 2 = <b>26 cm</b>" }
    ],
    gen: function (d) {
      var L, l;
      if (d === 1) { L = R(4, 20); l = R(2, L - 1); if (Math.random() < 0.3) return U.num("Quel est le périmètre de ce <b>carré</b> ?" + U.rect(L, L, "cm"), 4 * L, { unit: "cm", steps: ["Un carré a 4 côtés égaux : " + L + " × 4 = <b>" + 4 * L + " cm</b>."] });
        return U.num("Quel est le périmètre de ce rectangle ?" + U.rect(L, l, "cm"), 2 * (L + l), { unit: "cm", steps: ["(" + L + " + " + l + ") × 2 = " + (L + l) + " × 2 = <b>" + 2 * (L + l) + " cm</b>."] }); }
      if (d === 2) {
        if (Math.random() < 0.5) { L = dec(3, 15, 1); l = dec(1, 9, 1); return U.num("Quel est le périmètre de ce rectangle ?" + U.rect(L, l, "m"), rd(2 * (L + l)), { unit: "m", steps: ["(" + f(L) + " + " + f(l) + ") × 2 = " + f(rd(L + l)) + " × 2 = <b>" + f(rd(2 * (L + l))) + " m</b>."] }); }
        var a = R(5, 14), b = R(5, 14), c = R(Math.abs(a - b) + 2, a + b - 2);
        return U.num("Un triangle a des côtés de <b>" + a + " cm</b>, <b>" + b + " cm</b> et <b>" + c + " cm</b>. Quel est son périmètre ?", a + b + c, { unit: "cm", steps: ["J'additionne les 3 côtés : " + a + " + " + b + " + " + c + " = <b>" + (a + b + c) + " cm</b>."] });
      }
      if (Math.random() < 0.5) { var s = R(3, 25); return U.num("Un carré a un périmètre de <b>" + 4 * s + " cm</b>. Combien mesure un côté ?", s, { unit: "cm", steps: ["Le carré a 4 côtés égaux : " + 4 * s + " : 4 = <b>" + s + " cm</b>."] }); }
      L = R(8, 16); l = R(5, 10); var ca = R(2, L - 3), cb = R(2, l - 2);
      return U.num("Quel est le périmètre de cette figure ?" + U.lshape(L, l, ca, cb, "m"), 2 * (L + l), { unit: "m", steps: ["J'additionne tous les côtés : " + [L - ca, cb, ca, l - cb, L, l].join(" + ") + " = <b>" + 2 * (L + l) + " m</b>.", "Astuce : c'est le même périmètre que le grand rectangle " + L + " × " + l + " !"] });
    }
  });

  add(C3, {
    id: "m7-aire", icon: "🟧", title: "L'aire",
    desc: "Calculer la surface du rectangle, du carré, du triangle, du parallélogramme.",
    learn: [
      { t: "Mesurer une surface", h: "L'<b>aire</b>, c'est la surface à l'intérieur d'une figure. On la mesure en <b>cm²</b> : des petits carrés de 1 cm sur 1 cm." + U.grid(5, 3) + "Ici : 5 × 3 = <b>15 cm²</b>" },
      { t: "Les formules", h: "Rectangle : longueur × largeur<br>Carré : côté × côté<br>Parallélogramme : base × hauteur<br>Triangle : (base × hauteur) : 2" },
      { t: "Aire ou périmètre ?", h: "Le <b>périmètre</b>, c'est le tour (en cm).<br>L'<b>aire</b>, c'est la surface (en cm²).<br>Ne les mélange pas !" }
    ],
    gen: function (d) {
      var L, l;
      if (d === 1) {
        L = R(3, 9); l = R(2, 5);
        if (Math.random() < 0.5) return U.num("Combien de carrés de 1 cm² ? Quelle est l'aire ?" + U.grid(L, l), L * l, { unit: "cm²", steps: [l + " rangées de " + L + " carrés : " + L + " × " + l + " = <b>" + L * l + " cm²</b>."] });
        return U.num("Quelle est l'aire de ce rectangle ?" + U.rect(L, l, "cm"), L * l, { unit: "cm²", steps: ["Longueur × largeur : " + L + " × " + l + " = <b>" + L * l + " cm²</b>."] });
      }
      if (d === 2) {
        if (Math.random() < 0.4) { L = R(3, 15); return U.num("Quelle est l'aire de ce carré ?" + U.rect(L, L, "m"), L * L, { unit: "m²", steps: ["Côté × côté : " + L + " × " + L + " = <b>" + L * L + " m²</b>."] }); }
        L = R(4, 16); l = R(2, 12); if (L % 2 && l % 2) L++;
        return U.num("Quelle est l'aire de ce triangle ?" + U.tri(L, l, "cm"), L * l / 2, { unit: "cm²", steps: ["(base × hauteur) : 2", "(" + L + " × " + l + ") : 2 = " + L * l + " : 2 = <b>" + L * l / 2 + " cm²</b>."] });
      }
      var t = R(0, 2);
      if (t === 0) { L = R(4, 15); l = R(3, 10); return U.num("Quelle est l'aire de ce parallélogramme ?" + U.para(L, l, "cm"), L * l, { unit: "cm²", steps: ["Base × hauteur : " + L + " × " + l + " = <b>" + L * l + " cm²</b>.", "Attention : on prend la <b>hauteur</b> (pointillés), pas le côté penché."] }); }
      if (t === 1) { L = R(8, 16); l = R(5, 10); var ca = R(2, L - 3), cb = R(2, l - 2), A = L * l - ca * cb;
        return U.num("Quelle est l'aire de cette figure ?" + U.lshape(L, l, ca, cb, "m"), A, { unit: "m²", steps: ["Le grand rectangle : " + L + " × " + l + " = " + L * l + " m².", "Le coin enlevé : " + ca + " × " + cb + " = " + ca * cb + " m².", L * l + " − " + ca * cb + " = <b>" + A + " m²</b>."] }); }
      L = R(4, 12); l = R(2, 9); var askA = Math.random() < 0.5;
      return U.choice("Pour ce rectangle de " + L + " cm sur " + l + " cm, quelle est " + (askA ? "l'<b>aire</b>" : "le <b>périmètre</b>") + " ?" + U.rect(L, l, "cm"), askA ? L * l + " cm²" : 2 * (L + l) + " cm", askA ? [2 * (L + l) + " cm", L + l + " cm²", 2 * L * l + " cm²"] : [L * l + " cm²", L + l + " cm", 4 * L + " cm"],
        { steps: [askA ? "Aire = longueur × largeur = " + L + " × " + l + " = <b>" + L * l + " cm²</b>." : "Périmètre = (longueur + largeur) × 2 = <b>" + 2 * (L + l) + " cm</b>."] });
    }
  });

  add(C3, {
    id: "m7-volume", icon: "📦", title: "Le volume",
    desc: "Calculer le volume du cube et du pavé.",
    learn: [
      { t: "Remplir avec des petits cubes", h: "Le <b>volume</b>, c'est la place qu'occupe un objet. On le mesure en <b>cm³</b> : des petits cubes de 1 cm de côté." },
      { t: "La formule", h: "Pavé : longueur × largeur × hauteur<br>Cube : côté × côté × côté" + U.box(5, 3, 2, "cm") + "5 × 3 × 2 = <b>30 cm³</b>" },
      { t: "Volume et litres", h: "1 dm³ = 1000 cm³ = <b>1 litre</b>.<br>Une brique de lait d'un litre fait environ 1 dm³ !" }
    ],
    gen: function (d) {
      var L = R(2, d === 1 ? 6 : 12), l = R(2, d === 1 ? 5 : 9), h = R(2, d === 1 ? 4 : 10);
      if (d === 2 && Math.random() < 0.4) { var c = R(2, 10); return U.num("Quel est le volume d'un <b>cube</b> de " + c + " cm de côté ?", c * c * c, { unit: "cm³", steps: [c + " × " + c + " × " + c + " = " + c * c + " × " + c + " = <b>" + c * c * c + " cm³</b>."] }); }
      if (d === 3 && Math.random() < 0.5) return U.num("Un pavé a un volume de <b>" + L * l * h + " cm³</b>. Sa longueur est " + L + " cm et sa largeur " + l + " cm. Quelle est sa hauteur ?", h, { unit: "cm", steps: ["La base : " + L + " × " + l + " = " + L * l + " cm².", "Hauteur : " + L * l * h + " : " + L * l + " = <b>" + h + " cm</b>."] });
      return U.num("Quel est le volume de ce pavé ?" + U.box(L, l, h, "cm"), L * l * h, { unit: "cm³", steps: ["Longueur × largeur × hauteur", L + " × " + l + " × " + h + " = " + L * l + " × " + h + " = <b>" + L * l * h + " cm³</b>."] });
    }
  });

  add(C3, {
    id: "m7-angles", icon: "📐", title: "Les angles",
    desc: "Angle aigu, droit, obtus, et estimer une mesure en degrés.",
    learn: [
      { t: "L'angle droit", h: U.angle(90, 0) + "L'angle <b>droit</b> mesure <b>90°</b>, comme le coin d'une feuille. On le marque avec un petit carré." },
      { t: "Aigu, obtus, plat", h: "<b>Aigu</b> : plus petit qu'un angle droit (moins de 90°).<br><b>Obtus</b> : plus grand qu'un angle droit (entre 90° et 180°).<br><b>Plat</b> : 180°, une ligne droite." + U.angle(40, 10) + U.angle(130, 10) },
      { t: "Le rapporteur", h: "On place le <b>centre</b> du rapporteur sur le sommet de l'angle, le 0 sur un côté, et on lit la mesure sur l'autre côté." }
    ],
    gen: function (d) {
      if (d === 1) {
        var deg = pick([R(20, 75), 90, R(105, 165)]), rot = R(0, 180 - deg), type = deg < 90 ? "aigu" : deg === 90 ? "droit" : "obtus";
        return U.choice("Cet angle est…" + U.angle(deg, rot), type, ["aigu", "droit", "obtus", "plat"].filter(function (x) { return x !== type; }), { steps: ["Je compare avec le coin d'une feuille (90°).", "Cet angle est <b>" + type + "</b>" + (type === "aigu" ? " : plus petit que 90°." : type === "obtus" ? " : plus grand que 90°." : " : il mesure exactement 90°.")] });
      }
      if (d === 2) {
        var g = pick([30, 45, 60, 90, 120, 135, 150]), r2 = R(0, 180 - g), opts = [30, 45, 60, 90, 120, 135, 150, 170].filter(function (x) { return Math.abs(x - g) >= 30; });
        return U.choice("Environ combien mesure cet angle ?" + U.angle(g, r2), g + "°", U.shuffle(opts).map(function (x) { return x + "°"; }), { steps: ["Je compare avec l'angle droit (90°) et sa moitié (45°).", "Cet angle mesure environ <b>" + g + "°</b>."] });
      }
      var tot = pick([90, 180]), a1 = R(15, tot - 20);
      return U.num((tot === 90 ? "Un angle <b>droit</b>" : "Un angle <b>plat</b>") + " est partagé en deux angles. L'un mesure <b>" + a1 + "°</b>. Combien mesure l'autre ?", tot - a1, { unit: "°", steps: ["Un angle " + (tot === 90 ? "droit" : "plat") + " mesure " + tot + "°.", tot + " − " + a1 + " = <b>" + (tot - a1) + "°</b>."] });
    }
  });

  /* ================= Problèmes ================= */
  add(C4, {
    id: "m7-proportion", icon: "🛒", title: "La proportionnalité",
    desc: "Passer par l'unité : prix, recettes, quantités.",
    learn: [
      { t: "Deux fois plus…", h: "Si 3 cahiers coûtent 6 fr., alors 6 cahiers coûtent <b>2 fois plus</b> : 12 fr." },
      { t: "Passer par l'unité", h: "4 croissants coûtent 6 fr. Combien coûtent 10 croissants ?<br>1. Un croissant : 6 : 4 = 1,50 fr.<br>2. Dix croissants : 10 × 1,50 = <b>15 fr.</b>" },
      { t: "Attention aux pièges", h: "À 10 ans, Léo mesure 1,40 m. À 20 ans, mesurera-t-il 2,80 m ? <b>Non !</b><br>La taille ne grandit pas de façon proportionnelle à l'âge. Il faut toujours se demander si c'est vraiment proportionnel." }
    ],
    gen: function (d) {
      var items = [["cahiers", "cahier"], ["croissants", "croissant"], ["stylos", "stylo"], ["billets de train", "billet"], ["pommes", "pomme"]], it = pick(items);
      if (d === 1) { var n1 = R(2, 5), u = R(2, 9), k = R(2, 4);
        return U.num(n1 + " " + it[0] + " coûtent <b>" + n1 * u + " fr.</b> Combien coûtent " + n1 * k + " " + it[0] + " ?", n1 * u * k, { unit: "fr.", steps: [n1 * k + ", c'est " + k + " fois " + n1 + ".", "Donc le prix est " + k + " fois plus grand : " + n1 * u + " × " + k + " = <b>" + n1 * u * k + " fr.</b>"] }); }
      if (d === 2) { var a = R(2, 6), up = pick([1.5, 2, 2.5, 3, 3.5, 4, 1.2, 0.8]), b = R(5, 12); if (b === a) b++;
        return U.num(a + " " + it[0] + " coûtent <b>" + U.money(a * up) + "</b> Combien coûtent " + b + " " + it[0] + " ?", rd(b * up), { unit: "fr.", steps: ["1 " + it[1] + " : " + f(rd(a * up)) + " : " + a + " = " + U.money(up), b + " " + it[0] + " : " + b + " × " + f(up) + " = <b>" + U.money(b * up) + "</b>"] }); }
      if (Math.random() < 0.25) return U.choice("À 10 ans, Léo mesure 1,40 m. Combien mesurera-t-il à 20 ans ?", "On ne peut pas savoir", ["2,80 m", "1,40 m", "2,40 m"], { steps: ["La taille n'est <b>pas proportionnelle</b> à l'âge : on ne grandit pas toujours à la même vitesse.", "Réponse : <b>on ne peut pas savoir</b> avec ces informations."] });
      var p1 = pick([2, 4, 6]), p2 = pick([3, 5, 8, 10, 12]), per = pick([25, 50, 75, 100, 125, 150]);
      if (p1 === p2) p2 = p1 + 2;
      return U.num("Pour <b>" + p1 + " personnes</b>, il faut <b>" + p1 * per + " g</b> de farine. Combien de grammes faut-il pour <b>" + p2 + " personnes</b> ?", p2 * per, { unit: "g", steps: ["Pour 1 personne : " + p1 * per + " : " + p1 + " = " + per + " g.", "Pour " + p2 + " personnes : " + p2 + " × " + per + " = <b>" + p2 * per + " g</b>."] });
    }
  });

  add(C4, {
    id: "m7-problemes", icon: "🕵️", title: "Problèmes à étapes",
    desc: "Des problèmes en plusieurs calculs, avec des francs et des centimes.",
    learn: [
      { t: "Découper le problème", h: "Un problème difficile, c'est souvent <b>plusieurs petits problèmes</b> à la suite.<br>Je cherche d'abord ce que je peux calculer avec les informations données." },
      { t: "Écrire les étapes", h: "Sur ma feuille, j'écris chaque étape :<br>Étape 1 : je cherche … → calcul<br>Étape 2 : je cherche … → calcul<br>Puis une phrase réponse." },
      { t: "Vérifier", h: "Ma réponse a-t-elle du sens ?<br>Un élève qui paie 3000 fr. pour une course d'école… il y a sûrement une erreur !" }
    ],
    gen: function (d) {
      var k = kid(), t = d === 1 ? R(0, 1) : d === 2 ? R(2, 4) : R(5, 7), a, b, c, n;
      switch (t) {
        case 0: a = R(12, 48); b = R(12, 35);
          return U.num("Un cinéma a " + a + " rangées de " + b + " sièges. Combien de sièges y a-t-il en tout ?", a * b, { unit: "sièges", steps: ["Je cherche plusieurs fois la même quantité : " + a + " × " + b + " = <b>" + a * b + "</b>."] });
        case 1: b = R(3, 9); n = R(15, 120); a = n * b;
          return U.num("On range " + a + " œufs dans des boîtes de " + b + ". Combien de boîtes faut-il ?", n, { unit: "boîtes", steps: ["Je partage " + a + " en paquets de " + b + " : " + a + " : " + b + " = <b>" + n + "</b>."] });
        case 2: n = pick([18, 20, 22, 24, 25]); c = n * R(15, 30); b = R(4, 12);
          return U.num("Une classe de " + n + " élèves part en course d'école. Le car coûte " + c + " fr. et l'entrée au musée " + b + " fr. par élève. Combien chaque élève doit-il payer ?", c / n + b, { unit: "fr.",
            steps: ["Étape 1 — le car par élève : " + c + " : " + n + " = " + c / n + " fr.", "Étape 2 — avec le musée : " + c / n + " + " + b + " = <b>" + (c / n + b) + " fr.</b>"] });
        case 3: b = R(20, 45); n = R(6, 12); a = b * n; c = R(2, n - 2);
          return U.num(k.n + " lit " + b + " pages par jour. Son livre a " + a + " pages. " + k.Il + " a déjà lu pendant " + c + " jours. Combien de jours lui faut-il encore ?", n - c, { unit: "jours",
            steps: ["Étape 1 — pages déjà lues : " + c + " × " + b + " = " + c * b + ".", "Étape 2 — pages restantes : " + a + " − " + c * b + " = " + (a - c * b) + ".", "Étape 3 — jours : " + (a - c * b) + " : " + b + " = <b>" + (n - c) + "</b>."] });
        case 4: a = R(4, 9) * 100; n = pick([4, 5, 8, 10]);
          return U.num("Un vélo coûte " + a + " fr. Les parents paient la moitié. " + k.n + " paie le reste en " + n + " mois, la même somme chaque mois. Combien paie-t-" + k.il + " par mois ?", a / 2 / n, { unit: "fr.",
            steps: ["Étape 1 — la moitié : " + a + " : 2 = " + a / 2 + " fr.", "Étape 2 — par mois : " + a / 2 + " : " + n + " = <b>" + f(a / 2 / n) + " fr.</b>"] });
        case 5: a = R(2, 4); b = pick([2.4, 3.2, 2.8, 4.5, 3.6]); c = pick([3.5, 4.2, 2.9, 5.8]);
          return U.num("Maman achète " + a + " kg de pommes à " + U.money(b) + " le kilo et un pain à " + U.money(c) + " Combien paie-t-elle ?", rd(a * b + c), { unit: "fr.",
            steps: ["Étape 1 — les pommes : " + a + " × " + f(b) + " = " + U.money(a * b), "Étape 2 — avec le pain : " + f(rd(a * b)) + " + " + f(c) + " = <b>" + U.money(a * b + c) + "</b>"] });
        case 6: b = pick([4.2, 3.6, 5.4, 2.7]); n = pick([6, 4]); c = n * R(3, 8);
          return U.num("Un paquet de " + n + " bouteilles coûte " + U.money(b) + " Combien coûtent " + c + " bouteilles ?", rd(c / n * b), { unit: "fr.",
            steps: ["Étape 1 — nombre de paquets : " + c + " : " + n + " = " + c / n + ".", "Étape 2 — le prix : " + c / n + " × " + f(b) + " = <b>" + U.money(c / n * b) + "</b>"] });
        default: b = pick([3.5, 4.8, 6.25, 7.5]); n = R(2, 4); a = Math.ceil(n * b) + R(3, 25);
          return U.num(k.n + " a " + a + " fr. " + k.Il + " achète " + n + " magazines à " + U.money(b) + " Combien d'argent lui reste-t-il ?", rd(a - n * b), { unit: "fr.",
            steps: ["Étape 1 — les magazines : " + n + " × " + f(b) + " = " + U.money(n * b), "Étape 2 — ce qui reste : " + a + " − " + f(rd(n * b)) + " = <b>" + U.money(a - n * b) + "</b>"] });
      }
    }
  });
})();
