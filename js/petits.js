/* Graine de star (4 ans, 1H) : les jeux en images, avec une voix qui lit les consignes */
(function () {
  "use strict";
  var D = window.KDATA, R = U.R, pick = U.pick, shuffle = U.shuffle, VOICE_V = "1";

  /* ---------- La voix : on enchaîne de petits fichiers son ---------- */
  var token = 0, cur = null;
  function stop() { token++; if (cur) { try { cur.pause(); } catch (e) {} cur = null; } }
  function play(ids, done) {
    stop();
    var my = token, list = ids.slice();
    (function next() {
      if (my !== token) return;
      if (!list.length) { if (done) done(); return; }
      var a = new Audio("voix/" + list.shift() + ".wav?v=" + VOICE_V);
      cur = a; a.onended = next; a.onerror = next;
      try { var p = a.play(); if (p && p.catch) p.catch(function () { next(); }); } catch (e) { next(); }
    })();
  }
  window.KSAY = { play: play, stop: stop, praise: function () { return "b" + R(1, 6); }, oops: function () { return "o" + R(1, 3); } };

  /* ---------- Petits outils d'affichage ---------- */
  function em(id) { return D.items[id][0]; }
  function name(id) { return D.items[id][1]; }
  function others(list, not, n) { return shuffle(list.filter(function (x) { return not.indexOf(x) < 0; })).slice(0, n); }
  // mélange la bonne réponse avec les pièges ; c = fonction qui dessine une réponse
  function make(o, good, bad, draw, says) {
    var all = shuffle([good].concat(bad));
    o.choices = all.map(draw);
    o.ok = all.indexOf(good);
    if (says) o.says = all.map(says);
    return o;
  }
  function digit(n) { return '<span class="kd">' + n + "</span>"; }
  function group(e, n) { var h = '<span class="kgroup' + (n > 6 ? " many" : "") + '">'; for (var i = 0; i < n; i++) h += "<i>" + e + "</i>"; return h + "</span>"; }
  var COUNTABLE = ["pomme", "fraise", "banane", "poire", "cerise", "ballon", "etoile", "fleur", "poisson", "canard", "papillon", "voiture", "coeur", "lapin"];
  function shape(s, col) {
    var p = {
      rond: '<circle cx="50" cy="50" r="42"/>', carre: '<rect x="10" y="10" width="80" height="80" rx="3"/>',
      triangle: '<polygon points="50,8 94,90 6,90"/>', rectangle: '<rect x="4" y="25" width="92" height="50" rx="3"/>',
      etoile: '<polygon points="50,5 61,38 96,38 68,59 78,93 50,72 22,93 32,59 4,38 39,38"/>',
      coeur: '<path d="M50 88 C20 66 5 50 5 32 C5 17 17 7 30 7 C40 7 47 13 50 20 C53 13 60 7 70 7 C83 7 95 17 95 32 C95 50 80 66 50 88 Z"/>'
    }[s];
    return '<svg class="kshape" viewBox="0 0 100 100" fill="' + col + '" stroke="rgba(0,0,0,.35)" stroke-width="2">' + p + "</svg>";
  }
  var SHAPE_COLS = ["#e53935", "#1e88e5", "#fdd835", "#43a047", "#fb8c00", "#8e24aa", "#f48fb1"];
  function maxN(l) { return [5, 7, 10][l - 1]; }
  function nums(n, max, k) { var out = [n]; while (out.length < k) { var x = R(1, max); if (out.indexOf(x) < 0) out.push(x); } return out.slice(1); }

  /* ---------- Les jeux ---------- */
  var G = {
    combien: function (l) {
      var n = R(1, maxN(l)), e = em(pick(COUNTABLE));
      return make({ say: ["combien"], cap: "Compte ! Combien y en a-t-il ?", show: group(e, n), after: ["nb" + n] }, n, nums(n, maxN(l), 3), digit);
    },
    chiffre: function (l) {
      var n = R(1, maxN(l));
      return make({ say: ["montre_chiffre", "nb" + n], cap: "Montre-moi le chiffre " + D.text["nb" + n] + "." }, n, nums(n, maxN(l), l === 3 ? 4 : 3), digit);
    },
    plus: function (l) {
      var e = em(pick(COUNTABLE)), k = l === 3 ? 3 : 2, gap = [3, 2, 1][l - 1], ns, tries = 0;
      do { ns = []; for (var i = 0; i < k; i++) ns.push(R(1, maxN(l))); ns.sort(function (a, b) { return a - b; }); tries++; }
      while (tries < 50 && ns.some(function (x, i) { return i && x - ns[i - 1] < gap; }));
      var less = l > 1 && R(0, 1), good = less ? ns[0] : ns[k - 1];
      return make({ say: [less ? "moins" : "plus"], cap: less ? "Où y en a-t-il le moins ?" : "Où y en a-t-il le plus ?", ccls: "wide" },
        good, ns.filter(function (x) { return x !== good; }), function (x) { return group(e, x); });
    },
    groupe: function (l) {
      var n = R(1, maxN(l)), e = em(pick(COUNTABLE));
      return make({ say: ["montre", "nb" + n], cap: "Montre-moi " + D.text["nb" + n] + ".", ccls: "wide" }, n, nums(n, maxN(l), 3), function (x) { return group(e, x); });
    },
    couleurs: function (l) {
      var cs = shuffle(D.colors).slice(0, l === 1 ? 3 : 4), c = cs[0];
      return make({ say: ["montre", "c_" + c[0]], cap: "Montre-moi le " + c[0] + "." }, c, cs.slice(1), function (x) { return '<span class="kblob" style="background:' + x[1] + '"></span>'; });
    },
    formes: function (l) {
      var pool = l === 1 ? ["rond", "carre", "triangle", "etoile", "coeur"] : D.shapes, ss = shuffle(pool).slice(0, l === 1 ? 3 : 4), cols = shuffle(SHAPE_COLS);
      var same = l === 1 ? cols[0] : null;
      return make({ say: ["montre", "s_" + ss[0]], cap: "Montre-moi " + D.text["s_" + ss[0]] + "." }, ss[0], ss.slice(1), function (s, i) { return shape(s, same || cols[ss.indexOf(s)]); });
    },
    taille: function (l) {
      var e = em(pick(COUNTABLE.concat(["elephant", "chat", "maison", "sapin"]))), sizes = [[6, 11, 17], [7, 10, 15], [9, 12, 15]][l - 1], big = R(0, 1);
      return make({ say: [big ? "grand" : "petit"], cap: big ? "Montre-moi le plus grand !" : "Montre-moi le plus petit !" }, big ? sizes[2] : sizes[0], big ? sizes.slice(0, 2) : sizes.slice(1),
        function (s) { return '<span style="font-size:' + s + 'vh;line-height:1">' + e + "</span>"; });
    },
    intrus: function (l) {
      var cats = shuffle(D.cats), a = cats[0], odd = pick(cats[1]), same;
      same = l === 1 ? [pick(a), null, null] : shuffle(a).slice(0, 3);
      if (l === 1) same = [same[0], same[0], same[0]];
      var all = shuffle(same.concat([odd])), o = { say: ["intrus"], cap: "Trouve l'intrus : lequel n'est pas comme les autres ?" };
      o.choices = all.map(function (x) { return em(x); }); o.ok = all.indexOf(odd);
      return o;
    },
    lettre: function (l) {
      var pool = l === 1 ? ["A", "E", "I", "O", "U", "L", "M"] : l === 2 ? D.letters.slice(0, 11) : D.letters, ls = shuffle(pool).slice(0, 3);
      return make({ say: ["montre_lettre", "l_" + ls[0]], cap: "Montre-moi la lettre " + ls[0] + "." }, ls[0], ls.slice(1), function (x) { return '<span class="kletter">' + x + "</span>"; });
    },
    son: function (l) { return soundQ(D.sounds, "debut", "Qu'est-ce qui commence comme « ", l); },
    rime: function (l) { return soundQ(D.rhymes, "rime", "Qu'est-ce qui rime avec « ", l); },
    suite: function (l) {
      var pats = [["A", "B"]], set;
      if (l === 2) pats = [["A", "A", "B"], ["A", "B", "B"]];
      if (l === 3) pats = [["A", "B", "C"], ["A", "A", "B"], ["A", "B", "B"]];
      var pat = pick(pats), shown = pat.length === 2 ? R(4, 5) : R(5, 7), map = {};
      set = shuffle(R(0, 1) ? ["pomme", "banane", "fraise", "poire", "cerise"] : ["chat", "chien", "lapin", "poussin", "souris"]);
      map.A = em(set[0]); map.B = em(set[1]); map.C = em(set[2]);
      var seq = ""; for (var i = 0; i < shown; i++) seq += "<i>" + map[pat[i % pat.length]] + "</i>";
      var good = map[pat[shown % pat.length]], bad = [map.A, map.B, map.C, em(set[3])].filter(function (x) { return x !== good; }).slice(0, 2);
      if (pat.length === 2) bad = [pat[shown % 2] === "A" ? map.B : map.A, em(set[3])];
      return make({ say: ["suite"], cap: "Qu'est-ce qui vient après ?", show: '<span class="kseq">' + seq + '<i class="kq">?</i></span>' }, good, bad, function (x) { return x; });
    },
    avec: function (l) {
      var p = pick(D.pairs), pool = D.pairs.map(function (x) { return x[1]; });
      var bad = others(pool, [p[1]].concat(p[2]), l === 3 ? 3 : 2);
      return make({ say: ["avec", "n_" + p[0]], cap: "Qu'est-ce qui va avec " + name(p[0]) + " ?", show: em(p[0]) }, p[1], bad, em);
    },
    ombre: function (l) {
      var t = pick(D.shadows), bad = others(D.shadows, [t], l === 1 ? 2 : 3);
      return make({ say: ["ombre"], cap: "Trouve la bonne ombre !", show: em(t) }, t, bad, function (x) { return '<span class="kshadow">' + em(x) + "</span>"; });
    },
    cris: function (l) {
      var a = pick(D.cris);
      return make({ say: ["cr_" + a], cap: D.text["cr_" + a] }, a, others(D.cris, [a], l === 1 ? 2 : 3), em);
    },
    corps: function (l) {
      var b = pick(D.body);
      return make({ say: ["montre", "n_" + b], cap: "Montre-moi " + name(b) + "." }, b, others(D.body, [b], l === 1 ? 2 : 3), em);
    },
    emotions: function (l) {
      var es = shuffle(D.emotions).slice(0, l === 1 ? 3 : 4);
      return make({ say: ["e_" + es[0][0]], cap: D.text["e_" + es[0][0]] }, es[0], es.slice(1), function (x) { return x[1]; });
    },
    meteo: function (l) {
      var m = pick(D.meteo), good = pick(m[2]), pool = [];
      D.meteo.forEach(function (x) { if (x !== m) pool = pool.concat(x[2]); });
      return make({ say: ["m_" + m[0]], cap: D.text["m_" + m[0]], show: m[1] }, good, others(pool, [], l === 1 ? 2 : 3), em);
    }
  };
  // Son du début ou rime : l'image à comparer en haut, la voix dit le nom de chaque image quand on la choisit
  function soundQ(groups, sayId, cap, l) {
    var gi = R(0, groups.length - 1), g = shuffle(groups[gi]), t = g[0], good = g[1], bad = [];
    shuffle(groups.map(function (x, i) { return i; }).filter(function (i) { return i !== gi; })).slice(0, l === 3 ? 3 : 2).forEach(function (i) { bad.push(pick(groups[i])); });
    return make({ say: [sayId, "w_" + t], cap: cap + D.text["w_" + t] + " » ?", show: em(t), after: ["w_" + good], hint: "Choisis une image : je te dis son nom." }, good, bad, em, function (x) { return "w_" + x; });
  }

  var WORLDS = [
    { id: "numbers", icon: "🔢", name: "Les nombres", color: "#ff8a5c", games: [["combien", "🍎", "Combien ?"], ["chiffre", "🔟", "Les chiffres"], ["groupe", "🎈", "Le bon groupe"], ["plus", "⚖️", "Le plus, le moins"]] },
    { id: "formes", icon: "🔺", name: "Formes et couleurs", color: "#4cd38a", games: [["couleurs", "🎨", "Les couleurs"], ["formes", "⭐", "Les formes"], ["taille", "🐘", "Grand ou petit ?"], ["intrus", "🔍", "L'intrus"]] },
    { id: "lettres", icon: "🔤", name: "Lettres et sons", color: "#5fd3ff", games: [["lettre", "🅰️", "Les lettres"], ["son", "👂", "Le premier son"], ["rime", "🎵", "Les rimes"]] },
    { id: "logique", icon: "🧩", name: "Jeux de logique", color: "#c38bff", games: [["suite", "🍎", "Les suites"], ["avec", "🔗", "Ça va ensemble"], ["ombre", "🌑", "Les ombres"], ["memo", "🃏", "Le mémo"]] },
    { id: "monde", icon: "🐮", name: "Découvrir le monde", color: "#ffc94a", games: [["cris", "🐄", "Les cris des animaux"], ["corps", "👃", "Mon corps"], ["emotions", "😀", "Les émotions"], ["meteo", "☂️", "Quel temps fait-il ?"]] }
  ];
  var MEMO = ["chat", "chien", "lapin", "lion", "cochon", "grenouille", "poussin", "papillon", "pomme", "fraise", "ballon", "etoile", "voiture", "fusee"];

  window.KIDS = {
    worlds: WORLDS, gen: function (gid, l) { return G[gid](l); }, games: G, data: D,
    memo: function (l) { var pairs = [3, 4, 6][l - 1], e = shuffle(MEMO).slice(0, pairs), cards = shuffle(e.concat(e)); return cards.map(function (x) { return { e: em(x), open: false, done: false }; }); }
  };
})();
