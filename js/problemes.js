/* Mathématiques 5H et 7H : problèmes variés (choisir le calcul, argent, temps, partages, énigmes, tableaux et graphiques) */
(function () {
  "use strict";
  var T = window.THEMES = window.THEMES || [];
  var R = U.R, pick = U.pick, f = U.fmt, rd = U.round, money = U.money, shuffle = U.shuffle;
  // On range chaque nouveau thème à la fin de son chapitre (pour que la carte d'aventure reste en ordre)
  var pos = {};
  function add(grade, chapter, o) {
    o.grade = grade; o.subject = "maths"; o.chapter = chapter;
    var key = grade + "|" + chapter, at = pos[key];
    if (at === undefined) { at = T.length - 1; T.forEach(function (t, i) { if (t.grade === grade && t.subject === "maths" && t.chapter === chapter) at = i; }); at++; }
    T.splice(at, 0, o); pos[key] = at + 1;
  }
  var NAMES = [["Léa", 1], ["Noah", 0], ["Emma", 1], ["Luca", 0], ["Mia", 1], ["Liam", 0], ["Chloé", 1], ["Gabriel", 0], ["Zoé", 1], ["Nathan", 0], ["Inès", 1], ["Malik", 0]];
  function kid(not) { var k; do { k = pick(NAMES); } while (not && k[0] === not.n); return { n: k[0], il: k[1] ? "elle" : "il", Il: k[1] ? "Elle" : "Il", e: k[1] ? "e" : "" }; }
  function P(text, ans, unit, steps) { return U.num(text, ans, { unit: unit || "", steps: steps }); }
  function hm(m) { var h = Math.floor(m / 60) % 24, mm = m % 60; return h + " h" + (mm ? " " + (mm < 10 ? "0" : "") + mm : ""); }
  function dur(m) { var h = Math.floor(m / 60), mm = m % 60; return (h ? h + " h" : "") + (h && mm ? " " : "") + (mm ? mm + " min" : ""); }
  function timeQ(text, ans, wrongs, steps) { return U.choice(text, hm(ans), wrongs.filter(function (w) { return w > 0 && w !== ans; }).map(hm), { steps: steps }); }
  function price(lo, hi) { return rd(R(lo * 20, hi * 20) / 20); }
  function s(n, word) { return n + " " + word + (n > 1 ? "s" : ""); }
  function table(head, rows) {
    var h = '<table class="ptab"><tr>' + head.map(function (x) { return "<th>" + x + "</th>"; }).join("") + "</tr>";
    rows.forEach(function (r) { h += "<tr>" + r.map(function (x) { return "<td>" + x + "</td>"; }).join("") + "</tr>"; });
    return h + "</table>";
  }
  // Les 4 calculs possibles avec deux nombres : un seul est le bon
  function opQ(text, a, b, op, why) {
    var res = { "+": a + b, "−": a - b, "×": a * b, ":": a / b };
    function ex(o) { return f(a) + " " + o + " " + f(b); }
    return U.choice("<b>Quel calcul</b> permet de répondre ?<br><br>" + text, ex(op), ["+", "−", "×", ":"].filter(function (o) { return o !== op; }).map(ex),
      { steps: [why, "Calcul : " + ex(op) + " = <b>" + f(rd(res[op])) + "</b>"] });
  }
  var C5 = "Résoudre des problèmes", C7 = "Problèmes";
  var SOLVE = { t: "Ma méthode pour les problèmes", h: "1. Je lis l'énoncé <b>deux fois</b>.<br>2. Je cherche <b>la question</b>.<br>3. Je trie les informations : lesquelles servent ?<br>4. Je calcule, étape par étape.<br>5. Je vérifie : ma réponse a-t-elle du sens ?<br>6. J'écris une <b>phrase réponse</b>." };

  /* ============================ 5H ============================ */
  add(5, C5, {
    id: "m5-operation", icon: "🤔", title: "Quel calcul choisir ?",
    desc: "Lire l'histoire et trouver la bonne opération.",
    learn: [
      { t: "Les mots qui aident", h: "<b>+</b> : on reçoit, on ajoute, « en tout »<br><b>−</b> : on enlève, on mange, « il reste », « de plus que »<br><b>×</b> : plusieurs fois la même quantité (des boîtes de…, des rangées de…)<br><b>:</b> : on partage en parts égales" },
      { t: "Attention aux pièges", h: "« Léa a 12 cartes. Elle en a 5 <b>de moins</b> que Tom. Combien Tom en a-t-il ? »<br>Le mot « moins » est là… mais Tom en a <b>plus</b> que Léa : 12 + 5 = <b>17</b>.<br><br>Il faut toujours <b>imaginer l'histoire</b> dans sa tête !" },
      SOLVE
    ],
    gen: function (d) {
      var a = kid(), b = kid(a), x, y, t = d === 1 ? R(0, 2) : d === 2 ? R(0, 4) : R(3, 6);
      switch (t) {
        case 0: x = R(12, d === 1 ? 40 : 90); y = R(4, 30);
          return opQ(a.n + " a " + x + " images. " + b.n + " lui en donne " + y + ". Combien d'images " + a.n + " a-t-" + a.il + " maintenant ?", x, y, "+", a.n + " <b>reçoit</b> des images : on ajoute.");
        case 1: x = R(20, d === 1 ? 40 : 90); y = R(3, x - 5);
          return opQ("Il y a " + x + " pommes dans un panier. On en mange " + y + ". Combien de pommes reste-t-il ?", x, y, "−", "On en <b>enlève</b> : on soustrait.");
        case 2: x = R(3, 9); y = R(4, 12);
          return opQ("Il y a " + x + " boîtes de " + y + " crayons. Combien y a-t-il de crayons en tout ?", x, y, "×", "Plusieurs boîtes avec <b>la même quantité</b> : on multiplie.");
        case 3: y = R(2, 9); x = y * R(3, 9);
          return opQ("On partage " + x + " autocollants entre " + y + " enfants. Chacun reçoit le même nombre. Combien chaque enfant en reçoit-il ?", x, y, ":", "On <b>partage en parts égales</b> : on divise.");
        case 4: x = R(40, 95); y = R(10, x - 5);
          return opQ(a.n + " a " + x + " billes et " + b.n + " en a " + y + ". Combien de billes " + a.n + " a-t-" + a.il + " de plus que " + b.n + " ?", x, y, "−", "« De plus que » : on cherche <b>l'écart</b> entre les deux, on soustrait.");
        case 5: x = R(15, 60); y = R(4, 20);
          return opQ(a.n + " a " + x + " autocollants. " + a.Il + " en a " + y + " de moins que " + b.n + ". Combien d'autocollants " + b.n + " a-t-" + b.il + " ?", x, y, "+", "Piège ! " + a.n + " en a <b>moins</b>, donc " + b.n + " en a <b>plus</b> : on additionne.");
        default: x = R(25, 80); y = R(5, x - 10);
          return opQ("Après avoir reçu " + y + " francs de sa grand-mère, " + a.n + " a " + x + " francs. Combien avait-" + a.il + " avant ?", x, y, "−", "Piège ! <b>Avant</b> le cadeau, " + a.il + " avait moins : on enlève ce qu'" + a.il + " a reçu.");
      }
    }
  });

  add(5, C5, {
    id: "m5-monnaie", icon: "💰", title: "L'argent : payer et rendre",
    desc: "Billets, pièces, prix et monnaie à rendre.",
    learn: [
      { t: "L'argent suisse", h: "Billets : <b>10, 20, 50, 100, 200</b> francs…<br>Pièces : <b>5, 2, 1</b> franc, et 50, 20, 10, 5 centimes.<br>" + U.big("1 franc = 100 centimes") },
      { t: "Rendre la monnaie", h: "Un livre coûte <b>13 fr.</b>, je paie avec <b>20 fr.</b><br>Je compte en avançant : de 13 à 20, il manque <b>7</b>.<br>Ou je calcule : 20 − 13 = <b>7 fr.</b>" },
      SOLVE
    ],
    gen: function (d) {
      var a = kid(), t = d === 1 ? R(0, 2) : d === 2 ? R(3, 5) : R(6, 8), x, y, n, p, b;
      switch (t) {
        case 0: p = R(3, 17);
          return P("Tu achètes un livre à " + p + " fr. Tu paies avec un billet de 20 fr. Combien d'argent te rend-on ?", 20 - p, "fr.", ["On rend la différence entre 20 fr. et le prix.", "20 − " + p + " = <b>" + (20 - p) + " fr.</b>"]);
        case 1: x = R(2, 9); y = R(2, 9);
          return P("Un jus coûte " + x + " fr. et un sandwich " + y + " fr. Combien paies-tu en tout ?", x + y, "fr.", ["« En tout » : on additionne.", x + " + " + y + " = <b>" + (x + y) + " fr.</b>"]);
        case 2: x = R(1, 4); y = R(1, 4); n = R(0, 3);
          return P("Dans ta tirelire, il y a " + s(x, "billet") + " de 10 fr., " + s(y, "pièce") + " de 2 fr." + (n ? " et " + s(n, "pièce") + " de 1 fr." : "") + " Combien d'argent as-tu ?", 10 * x + 2 * y + n, "fr.",
            ["Les billets : " + x + " × 10 = " + 10 * x + " fr.", "Les pièces de 2 fr. : " + y + " × 2 = " + 2 * y + " fr." + (n ? " Et " + n + " fr. en pièces de 1 fr." : ""), "En tout : <b>" + (10 * x + 2 * y + n) + " fr.</b>"]);
        case 3: x = R(8, 25); y = R(5, 20);
          return P("Tu achètes un ballon à " + x + " fr. et une gourde à " + y + " fr. Tu paies avec un billet de 50 fr. Combien te rend-on ?", 50 - x - y, "fr.",
            ["Étape 1 — le prix total : " + x + " + " + y + " = " + (x + y) + " fr.", "Étape 2 — la monnaie : 50 − " + (x + y) + " = <b>" + (50 - x - y) + " fr.</b>"]);
        case 4: n = R(3, 6); p = R(8, 15);
          return P("Une famille de " + n + " personnes va au cinéma. Un billet coûte " + p + " fr. Combien la famille paie-t-elle ?", n * p, "fr.", ["Le même prix " + n + " fois : on multiplie.", n + " × " + p + " = <b>" + n * p + " fr.</b>"]);
        case 5: x = R(3, 9) * 10;
          return P("Combien de billets de 10 fr. faut-il pour payer " + x + " fr. ?", x / 10, "billets", ["Combien de fois 10 dans " + x + " ?", x + " : 10 = <b>" + x / 10 + "</b>"]);
        case 6: n = R(1, 9) * 2;
          return P("Une sucette coûte 50 centimes. Combien de francs coûtent " + n + " sucettes ?", n / 2, "fr.", ["2 sucettes = 2 × 50 centimes = 100 centimes = 1 franc.", n + " sucettes, c'est " + n / 2 + " fois 2 sucettes : <b>" + n / 2 + " fr.</b>"]);
        case 7: x = R(2, 9);
          return P("Combien de centimes y a-t-il dans " + x + " francs ?", x * 100, "centimes", ["1 franc = 100 centimes.", x + " × 100 = <b>" + x * 100 + " centimes</b>"]);
        default: p = R(3, 9); n = R(4, 9); b = p * n;
          return P(a.n + " économise " + p + " fr. par semaine. " + a.Il + " veut s'acheter un jeu à " + b + " fr. Combien de semaines doit-" + a.il + " économiser ?", n, "semaines",
            ["Combien de fois " + p + " fr. pour arriver à " + b + " fr. ?", b + " : " + p + " = <b>" + n + "</b> (car " + n + " × " + p + " = " + b + ")."]);
      }
    }
  });

  add(5, C5, {
    id: "m5-temps", icon: "⏰", title: "Problèmes de temps",
    desc: "Heures, minutes, jours et semaines.",
    learn: [
      { t: "Ce qu'il faut savoir", h: "1 heure = <b>60 minutes</b><br>1 jour = <b>24 heures</b><br>1 semaine = <b>7 jours</b><br>lundi · mardi · mercredi · jeudi · vendredi · samedi · dimanche" },
      { t: "Calculer une durée", h: "Je pars à <b>7 h 40</b>, j'arrive à <b>8 h 05</b>.<br>Je compte jusqu'à l'heure pleine : de 7 h 40 à 8 h → <b>20 min</b>.<br>Puis de 8 h à 8 h 05 → <b>5 min</b>.<br>En tout : 20 + 5 = <b>25 minutes</b>." },
      SOLVE
    ],
    gen: function (d) {
      var a = kid(), t = d === 1 ? R(0, 2) : d === 2 ? R(3, 5) : R(6, 8), n, st, dd, en, w;
      var DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
      switch (t) {
        case 0: n = R(2, 5);
          return P("Une semaine a 7 jours. Combien de jours y a-t-il dans " + n + " semaines ?", 7 * n, "jours", [n + " fois 7 jours.", n + " × 7 = <b>" + 7 * n + " jours</b>"]);
        case 1: st = R(9, 16) * 60; dd = R(1, 3) * 60;
          return timeQ("Le spectacle commence à <b>" + hm(st) + "</b>. Il dure " + s(dd / 60, "heure") + ". À quelle heure finit-il ?", st + dd, [st + dd - 60, st + dd + 60, st - dd],
            ["On avance de " + s(dd / 60, "heure") + " : " + hm(st) + " + " + dd / 60 + " h.", "Le spectacle finit à <b>" + hm(st + dd) + "</b>."]);
        case 2: n = R(1, 3);
          return P("Combien de minutes y a-t-il dans " + s(n, "heure") + " ?", 60 * n, "min", ["1 heure = 60 minutes.", n + " × 60 = <b>" + 60 * n + " minutes</b>"]);
        case 3: st = R(13, 17) * 60 + pick([0, 15, 30, 45]); dd = pick([30, 45, 75, 90, 105]);
          return timeQ("Le film commence à <b>" + hm(st) + "</b> et dure <b>" + dur(dd) + "</b>. À quelle heure finit-il ?", st + dd, [st + dd - 15, st + dd + 15, st + dd + 60],
            ["J'ajoute d'abord les heures, puis les minutes.", hm(st) + " + " + dur(dd) + " = <b>" + hm(st + dd) + "</b>"]);
        case 4: st = 7 * 60 + R(6, 10) * 5; en = 8 * 60 + R(0, 3) * 5;
          return P(a.n + " part de chez " + (a.il === "elle" ? "elle" : "lui") + " à <b>" + hm(st) + "</b> et arrive à l'école à <b>" + hm(en) + "</b>. Combien de minutes dure le trajet ?", en - st, "min",
            ["De " + hm(st) + " à 8 h : " + (480 - st) + " min.", "De 8 h à " + hm(en) + " : " + (en - 480) + " min.", "En tout : " + (480 - st) + " + " + (en - 480) + " = <b>" + (en - st) + " min</b>"]);
        case 5: n = R(1, 2); dd = pick([10, 15, 20, 30, 45]);
          return P("Combien de minutes durent <b>" + n + " h " + dd + " min</b> ?", 60 * n + dd, "min", [n + " h = " + 60 * n + " min.", 60 * n + " + " + dd + " = <b>" + (60 * n + dd) + " min</b>"]);
        case 6: w = R(1, 3); n = R(1, 6);
          return P("Les vacances durent " + s(w, "semaine") + " et " + s(n, "jour") + ". Combien de jours cela fait-il ?", 7 * w + n, "jours", [w + " × 7 = " + 7 * w + " jours.", 7 * w + " + " + n + " = <b>" + (7 * w + n) + " jours</b>"]);
        case 7: st = R(15, 18) * 60 + R(5, 11) * 5; en = st + R(5, 18) * 5;
          return P("Une émission commence à <b>" + hm(st) + "</b> et finit à <b>" + hm(en) + "</b>. Combien de minutes dure-t-elle ?", en - st, "min",
            ["Je compte jusqu'à l'heure pleine, puis j'ajoute le reste.", "De " + hm(st) + " à " + hm(en) + " : <b>" + (en - st) + " min</b>"]);
        default: n = R(8, 20); var d0 = R(0, 6), ans = DAYS[(d0 + n) % 7];
          return U.choice("Aujourd'hui, nous sommes <b>" + DAYS[d0] + "</b>. Quel jour serons-nous dans <b>" + n + " jours</b> ?", ans, shuffle(DAYS.filter(function (x) { return x !== ans; })).slice(0, 3),
            { steps: ["Dans 7 jours, c'est de nouveau " + DAYS[d0] + ". Dans 14 jours aussi !", n + " = " + (n >= 14 ? "14 + " + (n - 14) : "7 + " + (n - 7)) + " : j'avance encore de " + (n % 7) + " jour(s).", "Réponse : <b>" + ans + "</b>"] });
      }
    }
  });

  add(5, C5, {
    id: "m5-partage", icon: "🍪", title: "Partager et faire des groupes",
    desc: "Les parts égales et ce qu'on fait du reste.",
    learn: [
      { t: "Partager en parts égales", h: "24 biscuits pour 4 enfants : chacun en reçoit <b>24 : 4 = 6</b>.<br>Je vérifie avec le livret : 4 × 6 = 24 ✔" },
      { t: "Et s'il y a un reste ?", h: "26 œufs dans des boîtes de 6 : 26 : 6 = <b>4</b>, reste <b>2</b>.<br>→ On remplit <b>4 boîtes</b>, et 2 œufs restent dehors." },
      { t: "Le piège des voitures", h: "26 enfants, des voitures de 4 places : 26 : 4 = 6, reste 2.<br>Avec 6 voitures, 2 enfants restent à pied ! Il faut donc <b>7 voitures</b>." }
    ],
    gen: function (d) {
      var t = d === 1 ? R(0, 1) : d === 2 ? R(2, 3) : R(4, 5), p, n, r, x;
      switch (t) {
        case 0: p = R(2, 6); n = R(2, 9);
          return P("On range " + p * n + " crayons dans " + p + " boîtes, le même nombre dans chaque boîte. Combien de crayons y a-t-il par boîte ?", n, "crayons", ["On partage en " + p + " parts égales.", p * n + " : " + p + " = <b>" + n + "</b> (car " + p + " × " + n + " = " + p * n + ")."]);
        case 1: p = R(3, 6); n = R(2, 8);
          return P("Pour un jeu, on fait des équipes de " + p + " enfants. Il y a " + p * n + " enfants. Combien d'équipes peut-on faire ?", n, "équipes", ["Combien de fois " + p + " dans " + p * n + " ?", p * n + " : " + p + " = <b>" + n + "</b>"]);
        case 2: case 3: p = pick([4, 5, 6]); n = R(3, 8); r = R(1, p - 1); x = p * n + r;
          return t === 2
            ? P("On a " + x + " œufs. On les range dans des boîtes de " + p + ". Combien de boîtes peut-on remplir complètement ?", n, "boîtes", [x + " : " + p + " = " + n + ", reste " + r + ".", "On remplit <b>" + n + " boîtes</b> ; " + r + " œuf(s) restent dehors."])
            : P("On a " + x + " œufs. On les range dans des boîtes de " + p + ". Combien d'œufs restent en dehors des boîtes ?", r, "œufs", [p + " × " + n + " = " + p * n + " œufs dans les boîtes.", x + " − " + p * n + " = <b>" + r + "</b> œuf(s) restent."]);
        case 4: p = pick([4, 5, 8]); n = R(3, 7); r = R(1, p - 1); x = p * n + r;
          return P(x + " enfants partent en course. Chaque voiture peut emmener " + p + " enfants. Combien de voitures faut-il pour que <b>tout le monde</b> puisse partir ?", n + 1, "voitures",
            [x + " : " + p + " = " + n + ", reste " + r + ".", "Avec " + n + " voitures, " + r + " enfant(s) resteraient à pied !", "Il faut donc une voiture de plus : <b>" + (n + 1) + " voitures</b>."]);
        default: p = pick([5, 6, 8, 10]); n = R(3, 9); r = R(1, p - 1); x = p * n + r;
          return P("Un ruban mesure " + x + " cm. On coupe des morceaux de " + p + " cm. Combien de morceaux complets peut-on couper ?", n, "morceaux", [x + " : " + p + " = " + n + ", reste " + r + " cm.", "Le petit bout de " + r + " cm ne fait pas un morceau complet : <b>" + n + " morceaux</b>."]);
      }
    }
  });

  add(5, C5, {
    id: "m5-etapes", icon: "🪜", title: "Problèmes à étapes",
    desc: "Deux calculs (ou plus) pour trouver la réponse.",
    learn: [
      { t: "Plusieurs petits problèmes", h: "Parfois, il faut <b>deux calculs</b>.<br>« Dans un bus, il y a 20 personnes. 5 descendent, puis 8 montent. »<br>Étape 1 : 20 − 5 = 15<br>Étape 2 : 15 + 8 = <b>23</b>" },
      SOLVE
    ],
    gen: function (d) {
      var a = kid(), b = kid(a), c = kid(b), t = d === 1 ? R(0, 1) : d === 2 ? R(2, 3) : R(4, 6), x, y, z, n, m;
      switch (t) {
        case 0: x = R(15, 40); y = R(3, x - 5); z = R(2, 15);
          return P("Dans un bus, il y a " + x + " personnes. Au premier arrêt, " + y + " personnes descendent et " + z + " montent. Combien de personnes y a-t-il maintenant dans le bus ?", x - y + z, "personnes",
            ["Étape 1 — après la descente : " + x + " − " + y + " = " + (x - y) + ".", "Étape 2 — après la montée : " + (x - y) + " + " + z + " = <b>" + (x - y + z) + "</b>."]);
        case 1: x = R(30, 90); y = R(5, 15); z = R(5, 15);
          return P(a.n + " a " + x + " cartes. " + a.Il + " en donne " + y + " à " + b.n + " et " + z + " à " + c.n + ". Combien de cartes lui reste-t-il ?", x - y - z, "cartes",
            ["Étape 1 — cartes données : " + y + " + " + z + " = " + (y + z) + ".", "Étape 2 — ce qui reste : " + x + " − " + (y + z) + " = <b>" + (x - y - z) + "</b>."]);
        case 2: n = R(2, 5); m = R(6, 12); x = R(5, n * m - 3);
          return P("Une boulangère prépare " + n + " plaques de " + m + " croissants. Elle en vend " + x + ". Combien de croissants lui reste-t-il ?", n * m - x, "croissants",
            ["Étape 1 — les croissants préparés : " + n + " × " + m + " = " + n * m + ".", "Étape 2 — ce qui reste : " + n * m + " − " + x + " = <b>" + (n * m - x) + "</b>."]);
        case 3: n = R(2, 4); m = R(3, 8); x = n * m < 20 ? 20 : 50;
          return P("Tu achètes " + n + " paquets de biscuits à " + m + " fr. Tu paies avec un billet de " + x + " fr. Combien te rend-on ?", x - n * m, "fr.",
            ["Étape 1 — le prix : " + n + " × " + m + " = " + n * m + " fr.", "Étape 2 — la monnaie : " + x + " − " + n * m + " = <b>" + (x - n * m) + " fr.</b>"]);
        case 4: x = R(3, 9); y = R(2, 6);
          return P("Un fermier a " + x + " poules et " + y + " lapins. Combien de pattes y a-t-il en tout ?", 2 * x + 4 * y, "pattes",
            ["Étape 1 — les poules (2 pattes) : " + x + " × 2 = " + 2 * x + ".", "Étape 2 — les lapins (4 pattes) : " + y + " × 4 = " + 4 * y + ".", "Étape 3 — en tout : " + 2 * x + " + " + 4 * y + " = <b>" + (2 * x + 4 * y) + "</b>."]);
        case 5: n = R(4, 7) * 4; x = R(9, n - 9);
          return P("Une classe a " + x + " filles et " + (n - x) + " garçons. On fait des équipes de 4. Combien d'équipes y a-t-il ?", n / 4, "équipes",
            ["Étape 1 — les élèves : " + x + " + " + (n - x) + " = " + n + ".", "Étape 2 — les équipes : " + n + " : 4 = <b>" + n / 4 + "</b>."]);
        default: x = R(6, 25);
          return P(a.n + " lit " + x + " pages le lundi et deux fois plus le mardi. Combien de pages a-t-" + a.il + " lues en tout ?", 3 * x, "pages",
            ["Étape 1 — le mardi : " + x + " × 2 = " + 2 * x + " pages.", "Étape 2 — en tout : " + x + " + " + 2 * x + " = <b>" + 3 * x + "</b> pages."]);
      }
    }
  });

  add(5, C5, {
    id: "m5-enigmes", icon: "🧩", title: "Énigmes mathématiques",
    desc: "Des devinettes de nombres à résoudre comme un détective.",
    learn: [
      { t: "Je pense à un nombre…", h: "« J'ajoute 5 à mon nombre et je trouve 12. »<br>Pour retrouver le nombre, je fais <b>le contraire</b> : 12 − 5 = <b>7</b>.<br>Je vérifie : 7 + 5 = 12 ✔" },
      { t: "Essayer et vérifier", h: "Quand c'est difficile, j'<b>essaie</b> un nombre, je vérifie, puis j'ajuste.<br>C'est comme ça que travaillent les détectives !" }
    ],
    gen: function (d) {
      var t = d === 1 ? R(0, 2) : d === 2 ? R(3, 5) : R(6, 8), n, a, k, lo, c, o;
      switch (t) {
        case 0: n = R(2, 15); a = R(2, 9);
          return P("Je pense à un nombre. Je lui ajoute " + a + " et je trouve " + (n + a) + ". Quel est mon nombre ?", n, "", ["Je fais le contraire : " + (n + a) + " − " + a + " = <b>" + n + "</b>.", "Je vérifie : " + n + " + " + a + " = " + (n + a) + " ✔"]);
        case 1: n = R(10, 30); a = R(2, 9);
          return P("Je pense à un nombre. Je lui enlève " + a + " et je trouve " + (n - a) + ". Quel est mon nombre ?", n, "", ["Je fais le contraire : " + (n - a) + " + " + a + " = <b>" + n + "</b>.", "Je vérifie : " + n + " − " + a + " = " + (n - a) + " ✔"]);
        case 2: c = R(2, 6);
          return P("Dans le jardin, il y a " + c + " chats. Combien de pattes cela fait-il ?", 4 * c, "pattes", ["Un chat a 4 pattes.", c + " × 4 = <b>" + 4 * c + "</b>"]);
        case 3: k = R(2, 9); n = R(2, 9);
          return P("Je pense à un nombre. Je le multiplie par " + k + " et je trouve " + k * n + ". Quel est mon nombre ?", n, "", ["Je cherche dans le livret de " + k + " : " + k + " × ? = " + k * n + ".", "Mon nombre est <b>" + n + "</b>."]);
        case 4: do { k = R(6, 9); lo = R(2, 8) * 10; n = []; for (var i = lo + 1; i < lo + 10; i++) if (i % k === 0) n.push(i); } while (n.length !== 1);
          return P("Je suis un nombre plus grand que " + lo + " et plus petit que " + (lo + 10) + ". Je suis dans le livret de " + k + ". Qui suis-je ?", n[0], "",
            ["Le livret de " + k + " : … " + (n[0] - k) + ", " + n[0] + ", " + (n[0] + k) + " …", "Le seul entre " + lo + " et " + (lo + 10) + " : <b>" + n[0] + "</b>."]);
        case 5: c = R(2, 5); o = R(2, 6);
          return P("Dans le jardin, il y a " + c + " chats et " + o + " oiseaux. Combien de pattes cela fait-il ?", 4 * c + 2 * o, "pattes", ["Les chats : " + c + " × 4 = " + 4 * c + ".", "Les oiseaux : " + o + " × 2 = " + 2 * o + ".", "En tout : <b>" + (4 * c + 2 * o) + "</b>."]);
        case 6: a = R(4, 8); n = R(1, a - 1);
          return P("Dans un pré, il y a des poules et des moutons. On compte <b>" + a + " têtes</b> et <b>" + (2 * a + 2 * n) + " pattes</b>. Combien y a-t-il de moutons ?", n, "moutons",
            ["Si tous les animaux étaient des poules : " + a + " × 2 = " + 2 * a + " pattes.", "Il y a " + 2 * n + " pattes de plus. Un mouton a 2 pattes de plus qu'une poule.", 2 * n + " : 2 = <b>" + n + " moutons</b>."]);
        case 7: n = R(5, 9); a = R(2, 5);
          return P("Léa a " + a + " ans de plus que son frère. Ensemble, ils ont " + (2 * n + a) + " ans. Quel âge a Léa ?", n + a, "ans",
            ["Si on enlève les " + a + " ans d'écart : " + (2 * n + a) + " − " + a + " = " + 2 * n + ".", "Le frère a donc " + 2 * n + " : 2 = " + n + " ans.", "Léa : " + n + " + " + a + " = <b>" + (n + a) + " ans</b>."]);
        default: n = R(3, 15); a = R(1, 9);
          return P("Je pense à un nombre. Je le double, puis j'ajoute " + a + ". Je trouve " + (2 * n + a) + ". Quel est mon nombre ?", n, "",
            ["Je remonte : " + (2 * n + a) + " − " + a + " = " + 2 * n + ".", "Puis la moitié : " + 2 * n + " : 2 = <b>" + n + "</b>."]);
      }
    }
  });

  var MENU = [["🍦 Glace", 3, "une glace"], ["🧃 Jus de pomme", 2, "un jus de pomme"], ["🥐 Croissant", 2, "un croissant"], ["🥪 Sandwich", 6, "un sandwich"], ["🌭 Hot-dog", 5, "un hot-dog"],
              ["🍓 Salade de fruits", 4, "une salade de fruits"], ["💧 Eau", 1, "une eau"], ["🧇 Gaufre", 4, "une gaufre"], ["🍕 Part de pizza", 5, "une part de pizza"]];
  add(5, C5, {
    id: "m5-tableau", icon: "📋", title: "Lire un tableau de prix",
    desc: "Trouver les bonnes informations dans un tableau.",
    long: true,
    learn: [
      { t: "Lire un tableau", h: "Un tableau range les informations en <b>lignes</b> et en <b>colonnes</b>.<br>Pour trouver un prix, je cherche la <b>ligne</b> de l'article, puis je lis dans la colonne « Prix »." },
      SOLVE
    ],
    gen: function (d) {
      var m = shuffle(MENU).slice(0, 5).map(function (x) { return [x[0], x[1] + R(0, 1), x[2]]; }), tab = table(["Buvette de la piscine", "Prix"], m.map(function (x) { return [x[0], x[1] + " fr."]; }));
      var A = m[0], B = m[1], C = m[2], t = d === 1 ? R(0, 1) : d === 2 ? R(2, 3) : R(4, 5), x, n, bill;
      switch (t) {
        case 0: return P(tab + "Combien coûtent " + A[2] + " et " + B[2] + " ?", A[1] + B[1], "fr.",
          ["Je lis les prix : " + A[1] + " fr. et " + B[1] + " fr.", A[1] + " + " + B[1] + " = <b>" + (A[1] + B[1]) + " fr.</b>"]);
        case 1: x = m.slice().sort(function (p, q) { return q[1] - p[1]; });
          if (x[0][1] === x[1][1]) { x[0][1]++; tab = table(["Buvette de la piscine", "Prix"], m.map(function (y) { return [y[0], y[1] + " fr."]; })); }
          return U.choice(tab + "Quel article est <b>le plus cher</b> ?", x[0][0], x.slice(1, 4).map(function (y) { return y[0]; }), { steps: ["Je compare tous les prix de la colonne « Prix ».", "Le plus grand : " + x[0][1] + " fr. → <b>" + x[0][0] + "</b>"] });
        case 2: return P(tab + "Tu achètes <b>2 × " + A[0] + "</b> et <b>1 × " + B[0] + "</b>. Combien paies-tu ?", 2 * A[1] + B[1], "fr.",
          ["2 × " + A[1] + " = " + 2 * A[1] + " fr.", 2 * A[1] + " + " + B[1] + " = <b>" + (2 * A[1] + B[1]) + " fr.</b>"]);
        case 3: x = A[1] + B[1] + C[1]; bill = x < 20 ? 20 : 50;
          return P(tab + "Tu achètes " + A[2] + ", " + B[2] + " et " + C[2] + ". Tu paies avec un billet de " + bill + " fr. Combien te rend-on ?", bill - x, "fr.",
            ["Étape 1 — le total : " + A[1] + " + " + B[1] + " + " + C[1] + " = " + x + " fr.", "Étape 2 — la monnaie : " + bill + " − " + x + " = <b>" + (bill - x) + " fr.</b>"]);
        case 4: n = Math.floor(20 / A[1]);
          return P(tab + "Tu as 20 fr. Combien de fois peux-tu acheter <b>" + A[2] + "</b> au maximum ?", n, "", ["Combien de fois " + A[1] + " fr. dans 20 fr. ?", "20 : " + A[1] + " = " + n + (20 % A[1] ? ", reste " + 20 % A[1] + " fr. (pas assez pour un de plus)" : "") + ".", "Réponse : <b>" + n + "</b>"]);
        default: n = R(2, 3);
          return P(tab + "Tu as 50 fr. Tu achètes <b>" + n + " × " + A[0] + "</b> et <b>" + n + " × " + B[0] + "</b>. Combien d'argent te reste-t-il ?", 50 - n * (A[1] + B[1]), "fr.",
            ["Étape 1 — un de chaque : " + A[1] + " + " + B[1] + " = " + (A[1] + B[1]) + " fr.", "Étape 2 — " + n + " fois : " + n + " × " + (A[1] + B[1]) + " = " + n * (A[1] + B[1]) + " fr.", "Étape 3 — ce qui reste : 50 − " + n * (A[1] + B[1]) + " = <b>" + (50 - n * (A[1] + B[1])) + " fr.</b>"]);
      }
    }
  });

  /* ============================ 7H ============================ */
  function exprQ(text, good, bad, value, why) {
    return U.choice("<b>Quel calcul</b> donne la réponse ?<br><br>" + text, good, bad, { steps: [why, "Calcul : " + good + " = <b>" + value + "</b>"] });
  }
  var PEAKS = [["le Cervin", 4478], ["la Jungfrau", 4158], ["l'Eiger", 3967], ["le Säntis", 2502], ["le Pilatus", 2128], ["la Dent de Lys", 2014], ["le Moléson", 2002]];
  add(7, C7, {
    id: "m7-operation", icon: "🤔", title: "Choisir le bon calcul",
    desc: "Décimaux, grands nombres et calculs en plusieurs étapes.",
    learn: [
      { t: "Le sens des opérations", h: "<b>+</b> réunir, ajouter · <b>−</b> enlever, comparer, chercher un écart<br><b>×</b> répéter la même quantité, un prix à l'unité × une quantité<br><b>:</b> partager en parts égales, chercher « combien de fois »" },
      { t: "Les parenthèses", h: "5 amis paient ensemble une pizza à 18 fr. et des boissons à 12 fr.<br>Chacun paie : <b>(18 + 12) : 5</b> = 30 : 5 = 6 fr.<br>Sans parenthèses, 18 + 12 : 5 = 18 + 2,4 = 20,4 : faux ! On divise <b>avant</b> d'additionner." },
      SOLVE
    ],
    gen: function (d) {
      var t = d === 1 ? R(0, 2) : d === 2 ? R(3, 5) : R(6, 8), a, b, c, n, p, k, pk;
      switch (t) {
        case 0: p = pick([1.85, 1.9, 2.05, 1.95]); n = R(20, 50);
          return opQ("Un litre d'essence coûte " + f(p) + " fr. Combien coûtent " + n + " litres ?", n, p, "×", "Le prix d'un litre, " + n + " fois : on multiplie.");
        case 1: b = pick([0.2, 0.25, 0.5]); k = R(6, 16); a = rd(b * k);
          return opQ("On verse " + f(a) + " l de sirop dans des verres de " + f(b) + " l. Combien de verres peut-on remplir ?", a, b, ":", "On cherche « combien de fois " + f(b) + " l dans " + f(a) + " l » : on divise.");
        case 2: a = rd(R(80, 250) / 10); b = rd(R(15, Math.floor(a * 10) - 20) / 10);
          return opQ("Une corde mesure " + f(a) + " m. On en coupe " + f(b) + " m. Quelle longueur reste-t-il ?", a, b, "−", "On enlève un morceau : on soustrait.");
        case 3: n = R(15, 40) * 12;
          return opQ("Un abonnement coûte " + n + " fr. pour 12 mois. Combien coûte-t-il par mois ?", n, 12, ":", "On partage le prix en 12 parts égales : on divise.");
        case 4: a = price(120, 300); b = price(15, 60);
          return opQ("Léa a économisé " + money(a) + " Pour son anniversaire, elle reçoit encore " + money(b) + " Combien a-t-elle maintenant ?", a, b, "+", "Elle reçoit de l'argent : on additionne.");
        case 5: pk = shuffle(PEAKS).slice(0, 2).sort(function (x, y) { return y[1] - x[1]; });
          return opQ(cap(pk[0][0]) + " mesure " + f(pk[0][1]) + " m, " + pk[1][0] + " " + f(pk[1][1]) + " m. Quelle est la différence d'altitude ?", pk[0][1], pk[1][1], "−", "On cherche l'écart entre deux hauteurs : on soustrait.");
        case 6: n = R(2, 5); p = pick([2.5, 3.2, 1.8, 4.5]); c = R(3, 9);
          return exprQ("Tu achètes " + n + " cahiers à " + f(p) + " fr. et un stylo à " + c + " fr. Combien paies-tu ?", n + " × " + f(p) + " + " + c,
            [n + " × (" + f(p) + " + " + c + ")", "(" + n + " + " + f(p) + ") × " + c, n + " + " + f(p) + " + " + c], money(n * p + c), "Les cahiers : " + n + " × " + f(p) + ", puis on ajoute le stylo (un seul !).");
        case 7: k = R(3, 6); a = R(12, 30); b = (k * R(8, 14)) - a; if (b < 4) b += k * 3;
          return exprQ(k + " amis achètent une pizza à " + a + " fr. et des boissons à " + b + " fr. Ils partagent la note en parts égales. Combien paie chacun ?", "(" + a + " + " + b + ") : " + k,
            [a + " + " + b + " : " + k, "(" + a + " + " + b + ") × " + k, a + " : " + k + " + " + b], f(rd((a + b) / k)) + " fr.", "D'abord le total (entre parenthèses), puis on partage en " + k + ".");
        default: c = R(20, 40) * 2; n = R(2, 8) * 2;
          return exprQ("Une boîte contient " + c + " chocolats. Noah en mange " + n + ", puis il partage le reste en deux parts égales avec sa sœur. Combien de chocolats reçoit chacun ?", "(" + c + " − " + n + ") : 2",
            [c + " − " + n + " : 2", c + " : 2 − " + n, "(" + c + " + " + n + ") : 2"], (c - n) / 2, "D'abord ce qui reste (entre parenthèses), puis la moitié.");
      }
    }
  });
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  add(7, C7, {
    id: "m7-achats", icon: "🛍️", title: "Achats, soldes et bonnes affaires",
    desc: "Francs et centimes, prix à l'unité, réductions.",
    learn: [
      { t: "La meilleure affaire", h: "Lot de 6 yogourts à 4,20 fr. ou 1 yogourt à 0,75 fr. ?<br>Dans le lot, un yogourt coûte 4,20 : 6 = <b>0,70 fr.</b><br>0,70 &lt; 0,75 : le lot est plus avantageux." },
      { t: "Les réductions", h: "<b>Moitié prix</b> = le prix divisé par 2.<br><b>10 % de réduction</b> = on enlève <b>un dixième</b> du prix.<br>Un vélo à 480 fr. : 480 : 10 = 48 → 480 − 48 = <b>432 fr.</b>" },
      SOLVE
    ],
    gen: function (d) {
      var a = kid(), t = d === 1 ? R(0, 1) : d === 2 ? R(2, 4) : R(5, 7), p, q, r, n, k, u, sp;
      switch (t) {
        case 0: p = price(3, 18);
          return P("Tu achètes un magazine à " + money(p) + " Tu paies avec un billet de 20 fr. Combien te rend-on ?", rd(20 - p), "fr.", ["La monnaie : 20 − " + f(p) + ".", "= <b>" + money(20 - p) + "</b>"]);
        case 1: p = price(3, 9); q = price(4, 12); r = price(2, 5);
          return P("Au marché, Papa achète des fraises à " + money(p) + ", du fromage à " + money(q) + " et du pain à " + money(r) + " Combien paie-t-il ?", rd(p + q + r), "fr.",
            ["On additionne les trois prix.", f(p) + " + " + f(q) + " + " + f(r) + " = <b>" + money(p + q + r) + "</b>"]);
        case 2: k = pick([4, 6, 8]); u = pick([0.6, 0.65, 0.7, 0.75, 0.8, 0.9]); sp = rd(u + pick([-0.1, -0.05, 0.05, 0.1]));
          var lot = rd(k * u), cheap = u < sp ? "Le lot de " + k : "À l'unité";
          return U.choice("Les yogourts : <b>lot de " + k + " à " + money(lot) + "</b> ou <b>" + money(sp) + " pièce</b>. Quelle est la meilleure affaire ?", cheap, [u < sp ? "À l'unité" : "Le lot de " + k],
            { steps: ["Dans le lot, un yogourt coûte : " + f(lot) + " : " + k + " = " + money(u), "À comparer avec " + money(sp) + " → <b>" + cheap + "</b>"] });
        case 3: p = R(15, 60) * 2;
          return P("Un pull coûte " + p + " fr. Il est soldé à <b>moitié prix</b>. Combien coûte-t-il maintenant ?", p / 2, "fr.", ["Moitié prix : on divise par 2.", p + " : 2 = <b>" + p / 2 + " fr.</b>"]);
        case 4: n = 3; p = pick([13.5, 14.5, 12.5, 15.5, 16.5]);
          return P(a.n + " a 50 fr. " + a.Il + " achète " + n + " billets de cinéma à " + money(p) + " Combien d'argent lui reste-t-il ?", rd(50 - n * p), "fr.",
            ["Étape 1 — les billets : " + n + " × " + f(p) + " = " + money(n * p), "Étape 2 — ce qui reste : 50 − " + f(rd(n * p)) + " = <b>" + money(50 - n * p) + "</b>"]);
        case 5: p = R(20, 90) * 10;
          return P("Un vélo coûte " + p + " fr. Le magasin fait <b>10 % de réduction</b> (on enlève un dixième du prix). Combien coûte le vélo ?", p - p / 10, "fr.",
            ["Un dixième du prix : " + p + " : 10 = " + p / 10 + " fr.", "Nouveau prix : " + p + " − " + p / 10 + " = <b>" + (p - p / 10) + " fr.</b>"]);
        case 6: k = pick([35, 40, 45, 50]); n = R(6, 9); p = k * n + R(1, 3) * 5;
          return P("Au ski, la carte journalière coûte " + k + " fr. L'abonnement de saison coûte " + p + " fr. À partir de combien de jours de ski l'abonnement devient-il <b>moins cher</b> ?", n + 1, "jours",
            [n + " jours : " + n + " × " + k + " = " + n * k + " fr. (moins cher que " + p + " fr.)", (n + 1) + " jours : " + (n + 1) + " × " + k + " = " + (n + 1) * k + " fr. (plus cher que " + p + " fr.)", "Dès <b>" + (n + 1) + " jours</b>, l'abonnement est avantageux."]);
        default: k = R(3, 5); p = price(2, 6); q = price(1, 3);
          return P("Pour un pique-nique, on achète " + k + " paquets de chips à " + money(p) + " et " + k + " bouteilles à " + money(q) + " Combien paie-t-on ?", rd(k * (p + q)), "fr.",
            ["Étape 1 — un paquet et une bouteille : " + f(p) + " + " + f(q) + " = " + money(p + q), "Étape 2 — " + k + " fois : " + k + " × " + f(rd(p + q)) + " = <b>" + money(k * (p + q)) + "</b>"]);
      }
    }
  });

  add(7, C7, {
    id: "m7-horaires", icon: "🚆", title: "Horaires et durées",
    desc: "Lire un horaire de train, calculer des durées.",
    long: true,
    learn: [
      { t: "Lire un horaire", h: "Chaque <b>ligne</b> est un train : son heure de départ et son heure d'arrivée.<br>Durée du trajet = arrivée − départ." },
      { t: "Calculer une durée", h: "Départ <b>8 h 47</b>, arrivée <b>9 h 32</b>.<br>De 8 h 47 à 9 h : 13 min. De 9 h à 9 h 32 : 32 min.<br>En tout : 13 + 32 = <b>45 min</b>." }
    ],
    gen: function (d) {
      var h0 = R(6, 17) * 60, deps = [h0 + R(0, 11) * 5 + 2], i, rows = [], arrs = [];
      for (i = 1; i < 3; i++) deps.push(deps[i - 1] + R(25, 35));
      deps.forEach(function (x) { var a = x + pick([42, 46, 53, 58]); arrs.push(a); rows.push([hm(x), hm(a)]); });
      if (arrs[1] <= arrs[0] + 4) { arrs[1] = arrs[0] + 9; rows[1][1] = hm(arrs[1]); }
      if (arrs[2] <= arrs[1] + 4) { arrs[2] = arrs[1] + 9; rows[2][1] = hm(arrs[2]); }
      var tab = table(["Départ Fribourg", "Arrivée Lausanne"], rows), t = d === 1 ? 0 : d === 2 ? R(1, 2) : R(2, 3), k, lim, st, dd;
      switch (t) {
        case 0: k = R(0, 2);
          return P(tab + "Combien de minutes dure le trajet du train qui part à <b>" + hm(deps[k]) + "</b> ?", arrs[k] - deps[k], "min",
            ["Départ " + hm(deps[k]) + ", arrivée " + hm(arrs[k]) + ".", "Je compte de " + hm(deps[k]) + " jusqu'à " + hm(arrs[k]) + " : <b>" + (arrs[k] - deps[k]) + " min</b>"]);
        case 1: lim = arrs[1] + Math.max(1, Math.floor((arrs[2] - arrs[1]) / 2));
          return U.choice(tab + "Tu dois être à Lausanne <b>avant " + hm(lim) + "</b>. Quel est le <b>dernier</b> train que tu peux prendre ?", "celui de " + hm(deps[1]), ["celui de " + hm(deps[0]), "celui de " + hm(deps[2])],
            { steps: ["Je regarde les heures d'arrivée : lesquelles sont avant " + hm(lim) + " ?", hm(arrs[0]) + " ✔ et " + hm(arrs[1]) + " ✔ ; " + hm(arrs[2]) + " ✘ (trop tard).", "Le dernier possible : le train de <b>" + hm(deps[1]) + "</b>."] });
        case 2: st = deps[0] + R(2, deps[1] - deps[0] - 3);
          return P(tab + "Tu arrives à la gare de Fribourg à <b>" + hm(st) + "</b>. Combien de minutes dois-tu attendre le prochain train ?", deps[1] - st, "min",
            ["Le train de " + hm(deps[0]) + " est déjà parti. Le prochain part à " + hm(deps[1]) + ".", "De " + hm(st) + " à " + hm(deps[1]) + " : <b>" + (deps[1] - st) + " min</b>"]);
        default: st = R(18, 20) * 60 + pick([15, 30, 45]); dd = pick([95, 105, 110, 125]);
          return timeQ("Un match de hockey commence à <b>" + hm(st) + "</b> et dure <b>" + dur(dd) + "</b> (avec les pauses). À quelle heure finit-il ?", st + dd, [st + dd - 10, st + dd + 10, st + dd - 60],
            ["J'ajoute d'abord les heures, puis les minutes.", hm(st) + " + " + dur(dd) + " = <b>" + hm(st + dd) + "</b>"]);
      }
    }
  });

  add(7, C7, {
    id: "m7-mesures-pb", icon: "📐", title: "Problèmes de mesures",
    desc: "Clôtures, moquette, bouteilles, farine et cartes.",
    learn: [
      { t: "Bien choisir", h: "Faire le tour → <b>périmètre</b> (on additionne les côtés).<br>Recouvrir une surface → <b>aire</b> (longueur × largeur).<br>Toujours vérifier que les <b>unités</b> sont les mêmes !" },
      { t: "Les conversions utiles", h: "1 l = 10 dl · 1 kg = 1000 g · 1 t = 1000 kg · 1 km = 1000 m · 1 m = 100 cm" },
      SOLVE
    ],
    gen: function (d) {
      var a = kid(), t = d === 1 ? R(0, 1) : d === 2 ? R(2, 4) : R(5, 7), L, l, p, c, g, n;
      switch (t) {
        case 0: L = R(8, 25); l = R(4, L - 2);
          return P("Un jardin rectangulaire mesure " + L + " m sur " + l + " m. Combien de mètres de clôture faut-il pour en faire le tour ?", 2 * (L + l), "m",
            ["Faire le tour : c'est le <b>périmètre</b>.", "2 × (" + L + " + " + l + ") = 2 × " + (L + l) + " = <b>" + 2 * (L + l) + " m</b>"]);
        case 1: c = pick([[1, 2], [1, 2.5], [1.5, 2.5], [2, 2], [2, 2.5], [1.5, 3], [1.5, 1.5]]); n = rd(c[0] * 10 / c[1]);
          return P("Avec une bouteille de " + f(c[0]) + " l, combien de verres de " + f(c[1]) + " dl peut-on remplir ?", n, "verres",
            ["On convertit : " + f(c[0]) + " l = " + c[0] * 10 + " dl.", c[0] * 10 + " : " + f(c[1]) + " = <b>" + n + " verres</b>"]);
        case 2: L = R(3, 6); l = R(2, 5); p = pick([15, 20, 25, 30]);
          return P("Une chambre mesure " + L + " m sur " + l + " m. La moquette coûte " + p + " fr. le m². Combien coûte la moquette pour toute la chambre ?", L * l * p, "fr.",
            ["Étape 1 — l'aire : " + L + " × " + l + " = " + L * l + " m².", "Étape 2 — le prix : " + L * l + " × " + p + " = <b>" + L * l * p + " fr.</b>"]);
        case 3: g = pick([200, 250, 400, 500]);
          return P("Avec un sac de 2 kg de farine, combien de gâteaux peut-on faire si la recette demande " + g + " g de farine ?", 2000 / g, "gâteaux",
            ["On convertit : 2 kg = 2000 g.", "2000 : " + g + " = <b>" + 2000 / g + " gâteaux</b>"]);
        case 4: n = R(3, 12);
          return P("Un tour de piste mesure 400 m. " + a.n + " fait " + n + " tours. Combien de kilomètres a-t-" + a.il + " parcourus ?", rd(n * 0.4), "km",
            ["La distance : " + n + " × 400 = " + n * 400 + " m.", n * 400 + " m = <b>" + f(rd(n * 0.4)) + " km</b>"]);
        case 5: c = R(2, 9); p = pick([500, 250, 1000]);
          return P("Sur une carte, 1 cm représente " + p + " m en vrai. Deux villages sont à " + c + " cm l'un de l'autre sur la carte. Quelle est la vraie distance en kilomètres ?", rd(c * p / 1000), "km",
            ["Étape 1 — en mètres : " + c + " × " + p + " = " + c * p + " m.", "Étape 2 — en km : " + c * p + " m = <b>" + f(rd(c * p / 1000)) + " km</b>"]);
        case 6: L = R(2, 5); l = R(2, 3);
          return P("On carrelle un mur de " + L + " m sur " + l + " m avec des carreaux carrés de 50 cm de côté. Combien de carreaux faut-il ?", 4 * L * l, "carreaux",
            ["Dans 1 m, il y a 2 carreaux de 50 cm.", "Sur la longueur : " + L + " × 2 = " + 2 * L + " ; sur la hauteur : " + l + " × 2 = " + 2 * l + ".", 2 * L + " × " + 2 * l + " = <b>" + 4 * L * l + " carreaux</b>"]);
        default: c = pick([2, 3, 4]); g = pick([200, 250, 500]);
          return P("Un camion peut transporter " + c + " t. Une caisse pèse " + g + " kg. Combien de caisses peut-il transporter au maximum ?", c * 1000 / g, "caisses",
            ["On convertit : " + c + " t = " + c * 1000 + " kg.", c * 1000 + " : " + g + " = <b>" + c * 1000 / g + " caisses</b>"]);
      }
    }
  });

  add(7, C7, {
    id: "m7-reste", icon: "🚌", title: "Divisions : que faire du reste ?",
    desc: "Arrondir au-dessus ou en dessous selon la situation.",
    learn: [
      { t: "Le reste compte !", h: "230 élèves, des cars de 48 places : 230 : 48 = 4, reste 38.<br>Avec 4 cars, 38 élèves restent sur le trottoir… Il faut <b>5 cars</b> (on arrondit <b>au-dessus</b>)." },
      { t: "… ou pas", h: "87 roses, des bouquets de 6 : 87 : 6 = 14, reste 3.<br>On peut faire <b>14 bouquets complets</b> (on arrondit <b>en dessous</b>) ; 3 roses restent." },
      SOLVE
    ],
    gen: function (d) {
      var t = d === 1 ? R(0, 1) : d === 2 ? R(2, 3) : R(4, 6), p, n, r, x;
      switch (t) {
        case 0: p = pick([12, 15, 24, 25]); n = R(6, 20);
          return P("On range " + p * n + " livres sur des étagères de " + p + " livres. Combien d'étagères remplit-on ?", n, "étagères", [p * n + " : " + p + " = <b>" + n + "</b>", "Vérification : " + n + " × " + p + " = " + p * n + " ✔"]);
        case 1: n = R(15, 52);
          return P("Combien de semaines complètes y a-t-il dans " + 7 * n + " jours ?", n, "semaines", ["1 semaine = 7 jours.", 7 * n + " : 7 = <b>" + n + "</b>"]);
        case 2: case 3: p = pick([6, 7, 8, 12]); n = R(8, 25); r = R(1, p - 1); x = p * n + r;
          return t === 2
            ? P("Le fleuriste a " + x + " roses. Il fait des bouquets de " + p + " roses. Combien de bouquets complets peut-il faire ?", n, "bouquets", [x + " : " + p + " = " + n + ", reste " + r + ".", "Les " + r + " roses qui restent ne font pas un bouquet : <b>" + n + " bouquets</b>."])
            : P("Le fleuriste a " + x + " roses. Il fait des bouquets de " + p + " roses. Combien de roses lui reste-t-il après avoir fait le plus de bouquets possible ?", r, "roses", [x + " : " + p + " = " + n + ", reste " + r + ".", "Vérification : " + n + " × " + p + " + " + r + " = " + x + " ✔ → <b>" + r + "</b>"]);
        case 4: p = pick([45, 48, 50, 52]); n = R(2, 6); r = R(5, p - 5); x = p * n + r;
          return P(x + " élèves partent en camp. Un car a " + p + " places. Combien de cars faut-il ?", n + 1, "cars", [x + " : " + p + " = " + n + ", reste " + r + ".", "Les " + r + " élèves restants ont aussi besoin d'un car : <b>" + (n + 1) + " cars</b>."]);
        case 5: p = pick([10, 12, 24]); n = R(5, 15); r = R(1, p - 1); x = p * n + r;
          return P("Pour la classe, il faut " + x + " crayons. Ils sont vendus en boîtes de " + p + ". Combien de boîtes faut-il acheter ?", n + 1, "boîtes", [x + " : " + p + " = " + n + ", reste " + r + ".", "Avec " + n + " boîtes, il manquerait " + r + " crayon(s) : <b>" + (n + 1) + " boîtes</b>."]);
        default: p = pick([4, 6, 8]); n = R(10, 30); r = R(1, p - 1); x = p * n + r;
          return P("Une salle de " + x + " personnes. On installe des tables de " + p + " places. Combien de tables faut-il pour que tout le monde soit assis ?", n + 1, "tables", [x + " : " + p + " = " + n + ", reste " + r + ".", "Il faut une table de plus pour les " + r + " dernières personnes : <b>" + (n + 1) + " tables</b>."]);
      }
    }
  });

  add(7, C7, {
    id: "m7-enigmes", icon: "🧩", title: "Énigmes et logique",
    desc: "Nombres mystères, âges, pattes et pièces de monnaie.",
    learn: [
      { t: "Remonter le calcul", h: "« Je multiplie mon nombre par 4, puis j'ajoute 3 : je trouve 31. »<br>Je remonte en faisant le contraire, dans l'ordre inverse :<br>31 − 3 = 28, puis 28 : 4 = <b>7</b>." },
      { t: "Somme et différence", h: "Deux nombres : somme 30, différence 8.<br>Le grand = (30 + 8) : 2 = <b>19</b> · le petit = (30 − 8) : 2 = <b>11</b>.<br>Vérification : 19 + 11 = 30 ✔ et 19 − 11 = 8 ✔" },
      { t: "Essayer et ajuster", h: "Si je ne vois pas, j'<b>essaie</b> une valeur, je vérifie et je corrige. Faire un <b>tableau</b> d'essais aide beaucoup !" }
    ],
    gen: function (d) {
      var t = d === 1 ? R(0, 1) : d === 2 ? R(2, 3) : R(4, 7), n, k, a, S, D, h, x, b, c;
      switch (t) {
        case 0: n = R(3, 15); k = R(2, 9); a = R(1, 20);
          return P("Je pense à un nombre. Je le multiplie par " + k + ", puis j'ajoute " + a + ". Je trouve " + (k * n + a) + ". Quel est mon nombre ?", n, "",
            ["Je remonte : " + (k * n + a) + " − " + a + " = " + k * n + ".", k * n + " : " + k + " = <b>" + n + "</b>"]);
        case 1: n = R(5, 40);
          return P("Trois nombres qui se suivent ont pour somme " + (3 * n + 3) + ". Quel est le plus petit ?", n, "",
            ["Les trois nombres : ?, ? + 1, ? + 2. Leur somme : 3 × ? + 3.", "(" + (3 * n + 3) + " − 3) : 3 = <b>" + n + "</b>", "Vérification : " + n + " + " + (n + 1) + " + " + (n + 2) + " = " + (3 * n + 3) + " ✔"]);
        case 2: a = R(10, 60); b = R(2, 30); S = 2 * a + b; D = b;
          return P("Deux nombres ont pour somme <b>" + S + "</b> et pour différence <b>" + D + "</b>. Quel est le plus grand ?", a + b, "",
            ["Le grand = (somme + différence) : 2.", "(" + S + " + " + D + ") : 2 = <b>" + (a + b) + "</b>", "Vérification : " + (a + b) + " + " + a + " = " + S + " ✔"]);
        case 3: h = R(8, 20); x = R(2, h - 2);
          return P("Dans un clapier, il y a des poules et des lapins. On compte <b>" + h + " têtes</b> et <b>" + (2 * h + 2 * x) + " pattes</b>. Combien y a-t-il de lapins ?", x, "lapins",
            ["Si tous étaient des poules : " + h + " × 2 = " + 2 * h + " pattes.", "Il y a " + 2 * x + " pattes de plus ; chaque lapin en ajoute 2.", 2 * x + " : 2 = <b>" + x + " lapins</b>"]);
        case 4: n = R(6, 12); k = R(3, 5);
          return P("Maman a " + k + " fois l'âge de Léa. Ensemble, elles ont " + (k + 1) * n + " ans. Quel âge a Léa ?", n, "ans",
            ["Léa = 1 part, Maman = " + k + " parts : en tout " + (k + 1) + " parts.", (k + 1) * n + " : " + (k + 1) + " = <b>" + n + " ans</b>"]);
        case 5: a = R(2, 8); b = R(2, 6); x = a + 2 * b;
          return P("Dans " + a + " ans, Noah aura le double de l'âge qu'il avait il y a " + b + " ans. Quel âge a Noah ?", x, "ans",
            ["J'essaie : avec " + x + " ans, dans " + a + " ans il aura " + (x + a) + " ans ; il y a " + b + " ans il avait " + (x - b) + " ans.", (x - b) + " × 2 = " + (x + a) + " ✔ → <b>" + x + " ans</b>"]);
        case 6: n = R(6, 12); c = R(1, n - 1);
          return P("Tu as " + n + " pièces : des pièces de 2 fr. et de 5 fr. En tout, tu as " + (2 * n + 3 * c) + " fr. Combien as-tu de pièces de 5 fr. ?", c, "pièces",
            ["Si toutes étaient des pièces de 2 fr. : " + n + " × 2 = " + 2 * n + " fr.", "Il manque " + 3 * c + " fr. ; une pièce de 5 fr. vaut 3 fr. de plus.", 3 * c + " : 3 = <b>" + c + "</b>"]);
        default: n = R(3, 12); k = R(2, 5); a = R(2, 9);
          return P("Je pense à un nombre. J'ajoute " + a + ", puis je multiplie par " + k + ". Je trouve " + k * (n + a) + ". Quel est mon nombre ?", n, "",
            ["Je remonte : " + k * (n + a) + " : " + k + " = " + (n + a) + ".", (n + a) + " − " + a + " = <b>" + n + "</b>"]);
      }
    }
  });

  var CHARTS = [["Visiteurs à la piscine", ["lundi", "mardi", "mercredi", "jeudi", "vendredi"], "visiteurs"],
                ["Livres empruntés à la bibliothèque", ["lundi", "mardi", "mercredi", "jeudi", "vendredi"], "livres"],
                ["Glaces vendues au kiosque", ["lundi", "mardi", "mercredi", "jeudi", "vendredi"], "glaces"]];
  function chart(title, labels, vals, step) {
    var max = Math.ceil(Math.max.apply(null, vals) / step) * step + step, W = 620, H = 300, x0 = 60, y0 = 260, ch = 230, bw = 70, gap = (W - x0 - 20 - labels.length * bw) / labels.length, h = "";
    for (var v = 0; v <= max; v += step) { var y = y0 - v / max * ch; h += '<line x1="' + x0 + '" y1="' + y + '" x2="' + (W - 10) + '" y2="' + y + '" stroke="#3a4566" stroke-width="1"/><text x="' + (x0 - 8) + '" y="' + (y + 6) + '" text-anchor="end" font-size="21" fill="#a8b1c7">' + v + "</text>"; }
    labels.forEach(function (l, i) {
      var x = x0 + gap / 2 + i * (bw + gap), bh = vals[i] / max * ch;
      h += '<rect x="' + x + '" y="' + (y0 - bh) + '" width="' + bw + '" height="' + bh + '" rx="4" fill="#5fd3ff"/><text x="' + (x + bw / 2) + '" y="' + (y0 + 24) + '" text-anchor="middle" font-size="21" fill="#f4f1ea">' + l + "</text>";
    });
    return '<div class="pchart"><div class="pct">' + title + '</div><svg viewBox="0 0 ' + W + " " + (H - 10) + '">' + h + "</svg></div>";
  }
  add(7, C7, {
    id: "m7-graphique", icon: "📊", title: "Lire un diagramme",
    desc: "Lire des barres, comparer, calculer un total ou une moyenne.",
    long: true,
    learn: [
      { t: "Lire un diagramme en barres", h: "Chaque <b>barre</b> montre une quantité. Je regarde où arrive le haut de la barre sur l'<b>axe des nombres</b>, à gauche.<br>Si la barre s'arrête entre deux lignes, c'est le nombre du milieu." },
      { t: "La moyenne", h: "Pour la moyenne, j'additionne toutes les valeurs, puis je divise par le nombre de valeurs.<br>Exemple : 20, 30, 40 → (20 + 30 + 40) : 3 = <b>30</b>." }
    ],
    gen: function (d) {
      var c = pick(CHARTS), step = 10, unit = d === 1 ? 10 : 5, vals, t = d === 1 ? R(0, 1) : d === 2 ? R(2, 3) : R(4, 5), i, j, tot, best;
      do { vals = c[1].map(function () { return R(2, 16) * unit; }); best = Math.max.apply(null, vals); } while (vals.filter(function (v) { return v === best; }).length > 1);
      var g = chart(c[0], c[1].map(cap), vals, step), sum = vals.reduce(function (a, b) { return a + b; }, 0), kb = c[1][vals.indexOf(best)];
      i = R(0, 4); do { j = R(0, 4); } while (j === i || vals[j] === vals[i]);
      switch (t) {
        case 0: return U.choice(g + "Quel jour y a-t-il eu <b>le plus</b> de " + c[2] + " ?", kb, c[1].filter(function (x) { return x !== kb; }).slice(0, 3), { steps: ["Je cherche la barre la plus haute.", "C'est le <b>" + kb + "</b> : " + best + " " + c[2] + "."] });
        case 1: case 2: return P(g + "Combien de " + c[2] + " le <b>" + c[1][i] + "</b> ?", vals[i], c[2], ["Je suis le haut de la barre du " + c[1][i] + " jusqu'à l'axe de gauche.", "La barre arrive à <b>" + vals[i] + "</b>."]);
        case 3: var A = vals[i] > vals[j] ? i : j, B = A === i ? j : i, hi = vals[A], lo = vals[B];
          return P(g + "Combien de " + c[2] + " de plus le <b>" + c[1][A] + "</b> que le <b>" + c[1][B] + "</b> ?", hi - lo, c[2],
            ["Je lis les deux barres : " + hi + " et " + lo + ".", hi + " − " + lo + " = <b>" + (hi - lo) + "</b>"]);
        case 4: return P(g + "Quelle est la <b>moyenne</b> de " + c[2] + " par jour ?", sum / 5, c[2], ["Le total : " + vals.join(" + ") + " = " + sum + ".", "La moyenne : " + sum + " : 5 = <b>" + sum / 5 + "</b>"]);
        default: return P(g + "Combien de " + c[2] + " en tout pendant la semaine ?", sum, c[2], ["J'additionne les 5 barres : " + vals.join(" + ") + ".", "= <b>" + sum + "</b>"]);
      }
    }
  });
})();
