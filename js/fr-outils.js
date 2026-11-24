/* Outils pour le français : conjugaison, banques de phrases, générateurs d'exercices */
var FR = (function () {
  "use strict";
  var R = U.R, pick = U.pick, shuffle = U.shuffle, big = U.big;

  /* ---------- Conjugaison ---------- */
  var IMP_END = ["ais", "ais", "ait", "ions", "iez", "aient"], FUT_END = ["ai", "as", "a", "ons", "ez", "ont"];
  // Verbes irréguliers écrits en entier : présent, radical de l'imparfait, radical du futur, participe passé, impératif
  var IRR = {
    "être": { pr: "suis es est sommes êtes sont", imp: "ét", fut: "ser", pp: "été", ipf: "sois soyons soyez" },
    "avoir": { pr: "ai as a avons avez ont", imp: "av", fut: "aur", pp: "eu", ipf: "aie ayons ayez" },
    "aller": { pr: "vais vas va allons allez vont", imp: "all", fut: "ir", pp: "allé", aux: "être", ipf: "va allons allez" },
    "finir": { pr: "finis finis finit finissons finissez finissent", imp: "finiss", fut: "finir", pp: "fini", ipf: "finis finissons finissez" },
    "dire": { pr: "dis dis dit disons dites disent", imp: "dis", fut: "dir", pp: "dit", ipf: "dis disons dites" },
    "faire": { pr: "fais fais fait faisons faites font", imp: "fais", fut: "fer", pp: "fait", ipf: "fais faisons faites" },
    "entendre": { pr: "entends entends entend entendons entendez entendent", imp: "entend", fut: "entendr", pp: "entendu", ipf: "entends entendons entendez" },
    "savoir": { pr: "sais sais sait savons savez savent", imp: "sav", fut: "saur", pp: "su" },
    "vouloir": { pr: "veux veux veut voulons voulez veulent", imp: "voul", fut: "voudr", pp: "voulu" },
    "mettre": { pr: "mets mets met mettons mettez mettent", imp: "mett", fut: "mettr", pp: "mis", ipf: "mets mettons mettez" },
    "pouvoir": { pr: "peux peux peut pouvons pouvez peuvent", imp: "pouv", fut: "pourr", pp: "pu" },
    "prendre": { pr: "prends prends prend prenons prenez prennent", imp: "pren", fut: "prendr", pp: "pris", ipf: "prends prenons prenez" },
    "sortir": { pr: "sors sors sort sortons sortez sortent", imp: "sort", fut: "sortir", pp: "sorti", aux: "être", ipf: "sors sortons sortez" },
    "courir": { pr: "cours cours court courons courez courent", imp: "cour", fut: "courr", pp: "couru", ipf: "cours courons courez" },
    "voir": { pr: "vois vois voit voyons voyez voient", imp: "voy", fut: "verr", pp: "vu", ipf: "vois voyons voyez" },
    "venir": { pr: "viens viens vient venons venez viennent", imp: "ven", fut: "viendr", pp: "venu", aux: "être", ipf: "viens venons venez" }
  };
  var ER_AUX_ETRE = { arriver: 1, tomber: 1, rentrer: 1, rester: 1 };

  // Verbes en -er : radicaux (j'achète, j'emploie…)
  function erStems(inf) {
    var st = inf.slice(0, -2), strong = st, fut = inf;
    if (inf === "acheter" || inf === "peler") { strong = st.slice(0, -2) + "è" + st.slice(-1); fut = strong + "er"; }
    if (/yer$/.test(inf)) { strong = st.slice(0, -1) + "i"; fut = strong + "er"; }
    return { st: st, strong: strong, fut: fut };
  }
  // nous mangeons, nous commençons : on garde le son devant a et o
  function soft(inf, st, next) {
    if (/ger$/.test(inf) && /^[ao]/.test(next)) return st + "e";
    if (/cer$/.test(inf) && /^[ao]/.test(next)) return st.slice(0, -1) + "ç";
    return st;
  }
  function present(inf) {
    if (IRR[inf]) return IRR[inf].pr.split(" ");
    var s = erStems(inf);
    return ["e", "es", "e", "ons", "ez", "ent"].map(function (e, p) { return (p === 3 || p === 4 ? soft(inf, s.st, e) : s.strong) + e; });
  }
  function imparfait(inf) {
    if (IRR[inf]) return IMP_END.map(function (e) { return IRR[inf].imp + e; });
    var st = erStems(inf).st;
    return IMP_END.map(function (e) { return soft(inf, st, e) + e; });
  }
  function futStem(inf) { return IRR[inf] ? IRR[inf].fut : erStems(inf).fut; }
  function futur(inf) { var f = futStem(inf); return FUT_END.map(function (e) { return f + e; }); }
  function conditionnel(inf) { var f = futStem(inf); return IMP_END.map(function (e) { return f + e; }); }
  function pp(inf) { return IRR[inf] ? IRR[inf].pp : inf.slice(0, -2) + "é"; }
  function aux(inf) { return (IRR[inf] && IRR[inf].aux === "être") || ER_AUX_ETRE[inf] ? "être" : "avoir"; }
  // g : genre du sujet ("f" ou "m"), pour l'accord avec être
  function passeCompose(inf, g) {
    var a = aux(inf), A = present(a), p = pp(inf);
    return A.map(function (x, i) { return a === "être" ? x + " " + p + (g === "f" ? "e" : "") + (i >= 3 ? "s" : "") : x + " " + p; });
  }
  function imperatif(inf) {
    if (IRR[inf]) return IRR[inf].ipf ? IRR[inf].ipf.split(" ") : null;
    var p = present(inf);
    return [erStems(inf).strong + "e", p[3], p[4]];
  }
  var TENSES = { "présent": present, "imparfait": imparfait, "futur": futur, "passé composé": passeCompose, "conditionnel présent": conditionnel };
  function conj(inf, tense, g) { return TENSES[tense](inf, g); }

  var PRON = ["je", "tu", "il", "nous", "vous", "ils"];
  function withPron(pron, form) {
    if (pron.toLowerCase() === "je" && /^[aeéèêiouyh]/i.test(form)) return pron.charAt(0) + "'" + form;
    return pron + " " + form;
  }
  function table(inf, tense, g) {
    var f = conj(inf, tense, g), h = '<table class="conj"><tr><th>' + inf + " · " + tense + "</th></tr>";
    for (var i = 0; i < 6; i++) h += "<tr><td>" + withPron(i === 2 ? (g === "f" ? "elle" : "il") : i === 5 ? (g === "f" ? "elles" : "ils") : PRON[i], f[i]) + "</td></tr>";
    return h + "</table>";
  }
  function tableImp(inf) {
    var f = imperatif(inf);
    return '<table class="conj"><tr><th>' + inf + " · impératif</th></tr><tr><td>" + f[0] + " !</td></tr><tr><td>" + f[1] + " !</td></tr><tr><td>" + f[2] + " !</td></tr></table>";
  }

  // Compléments naturels pour faire des phrases
  var COMP = {
    "être": "à la maison", "avoir": "un chat", "aller": "à la piscine", "chanter": "une chanson", "jouer": "au ballon", "aimer": "le chocolat",
    "regarder": "les étoiles", "finir": "le puzzle", "dire": "la vérité", "faire": "un gâteau", "entendre": "un bruit", "savoir": "la réponse",
    "vouloir": "un dessert", "manger": "une pomme", "commencer": "un livre", "mettre": "un pull", "pouvoir": "venir", "oublier": "le pain",
    "prendre": "le bus", "sortir": "dans le jardin", "courir": "dans le parc", "voir": "la mer", "venir": "avec nous", "employer": "un outil",
    "payer": "les billets", "acheter": "du pain", "peler": "une orange", "arriver": "en avance", "tomber": "dans la neige", "rester": "à l'école",
    "danser": "sur la musique", "parler": "avec la maîtresse", "ranger": "la chambre", "lancer": "le ballon", "nager": "dans le lac"
  };
  var MARK = { "présent": "Aujourd'hui,", "imparfait": "Autrefois,", "futur": "Demain,", "passé composé": "Hier,", "conditionnel présent": "Avec un peu de chance," };
  var THIRD_S = [["il", "m"], ["elle", "f"], ["Léa", "f"], ["Tom", "m"], ["mon frère", "m"], ["ma tante", "f"]];
  var THIRD_P = [["ils", "m"], ["elles", "f"], ["les enfants", "m"], ["mes cousines", "f"], ["nos voisins", "m"]];
  function subject(p) {
    if (p === 2) return pick(THIRD_S);
    if (p === 5) return pick(THIRD_P);
    return [PRON[p], pick(["m", "f"])];
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  // Conjuguer un verbe dans une phrase ; others = temps utilisés pour les pièges
  function conjQ(verbs, tense, others) {
    var inf = pick(verbs), p = R(0, 5), sj = subject(p), g = sj[1], forms = conj(inf, tense, g), good = forms[p], bad = [];
    for (var i = 0; i < 6; i++) if (i !== p) bad.push(forms[i]);
    bad = shuffle(bad);
    var other = pick((others || ["présent", "imparfait", "futur", "passé composé"]).filter(function (t) { return t !== tense; }));
    bad = bad.slice(0, 2).concat([conj(inf, other, g)[p]]).concat(bad.slice(2));
    var mark = MARK[tense], comp = COMP[inf] || "";
    return U.choice("Conjugue au <b>" + tense + "</b> :" + big(mark + " " + sj[0] + " <i>(" + inf + ")</i> … " + comp + "."), good, bad, {
      visual: table(inf, tense, g),
      steps: ["Le verbe <b>" + inf + "</b> au " + tense + ", avec le sujet « " + sj[0] + " ».",
        "La phrase : " + mark + " " + withPron(sj[0], "<b>" + good + "</b>").replace(/^(j')<b>/, "<b>$1") + " " + comp + "."]
    });
  }

  var TENSE_RULE = {
    "présent": "Le <b>présent</b> : l'action se passe maintenant.",
    "imparfait": "L'<b>imparfait</b> : terminaisons -ais, -ais, -ait, -ions, -iez, -aient.",
    "futur": "Le <b>futur</b> : on entend le « r » : -rai, -ras, -ra, -rons, -rez, -ront.",
    "passé composé": "Le <b>passé composé</b> : deux mots, l'auxiliaire <b>avoir</b> ou <b>être</b> + le participe passé.",
    "conditionnel présent": "Le <b>conditionnel présent</b> : le « r » du futur + les terminaisons de l'imparfait (-rais, -rait, -rions…)."
  };
  // Reconnaître le temps d'un verbe (au niveau 1, un mot comme « Hier, » aide)
  function tempsQ(verbs, tenses, d) {
    var inf = pick(verbs), tense = pick(tenses), p = R(0, 5), sj = subject(p), form = conj(inf, tense, sj[1])[p];
    var sentence = withPron(sj[0], form) + " " + (COMP[inf] || "") + ".";
    sentence = d === 1 ? MARK[tense] + " " + sentence : cap(sentence);
    return U.choice("À quel temps est le verbe ?" + big(sentence), tense, tenses.filter(function (t) { return t !== tense; }), {
      steps: ["Le verbe conjugué est « <b>" + form + "</b> » (verbe " + inf + ").", TENSE_RULE[tense]]
    });
  }

  var IMP_P = ["2e personne du singulier (tu)", "1re personne du pluriel (nous)", "2e personne du pluriel (vous)"];
  function imperatifQ(verbs) {
    var inf = pick(verbs.filter(function (v) { return imperatif(v); })), i = R(0, 2), forms = imperatif(inf), good = forms[i], pr = present(inf);
    var bad = forms.filter(function (f, j) { return j !== i; }).concat([pr[1], pr[5]]);
    var er = /er$/.test(inf) && inf !== "aller";
    return U.choice("Mets à l'impératif, <b>" + IMP_P[i] + "</b> :" + big("<i>(" + inf + ")</i> … " + (COMP[inf] || "") + " !"), good, bad, {
      visual: tableImp(inf),
      steps: ["À l'impératif, il n'y a <b>pas de sujet</b> : on donne un ordre ou un conseil.",
        er ? "Verbe en -er : <b>pas de s</b> à la 2e personne du singulier (chante !, mange !)." : "On part du présent : tu " + pr[1] + " → <b>" + forms[0] + " !</b>",
        "La phrase : <b>" + cap(good) + "</b> " + (COMP[inf] || "") + " !"]
    });
  }

  /* ---------- Banques de phrases ---------- */
  // Une ligne = "niveau|champ|champ|…"
  function lines(s) {
    return s.split("\n").map(function (x) { return x.replace(/^\s+|\s+$/g, ""); }).filter(function (x) { return x; })
      .map(function (x) { var p = x.split("|"); return { l: +p[0], f: p.slice(1) }; });
  }
  // banque sans niveau : "a|b|c"
  function rows(s) {
    return s.split("\n").map(function (x) { return x.replace(/^\s+|\s+$/g, ""); }).filter(function (x) { return x; }).map(function (x) { return x.split("|"); });
  }
  // Niveau d : on prend les phrases du niveau d (et d-1 pour varier)
  function lv(items, d) {
    var pool = items.filter(function (it) { return it.l === d || it.l === d - 1; });
    return pick(pool.length ? pool : items);
  }
  function blank(s) { return s.replace("___", '<span class="blank">…</span>'); }
  function fill(s, w) { return s.replace("___", "<b>" + w + "</b>"); }

  // Homophones : "niveau|phrase avec ___|bon mot|piège,piège"
  function homoQ(items, rules, d) {
    var it = lv(items, d), s = it.f[0], good = it.f[1], bad = it.f[2].split(",");
    var st = [rules[good.toLowerCase()]];
    bad.forEach(function (b) { var r = rules[b.toLowerCase()]; if (r) st.push("<small>Rappel pour « " + b + " » : " + r + "</small>"); });
    st.push("La phrase : " + fill(s, good));
    return U.choice("Complète avec le bon mot :" + big(blank(s)), good, bad, { steps: st });
  }

  var PERS = {
    "1s": "1re personne du singulier (comme « je »)", "2s": "2e personne du singulier (comme « tu »)", "3s": "3e personne du singulier (comme « il » ou « elle »)",
    "1p": "1re personne du pluriel (comme « nous »)", "2p": "2e personne du pluriel (comme « vous »)", "3p": "3e personne du pluriel (comme « ils » ou « elles »)"
  };
  // Accord sujet-verbe : "niveau|phrase|bon|pièges|sujet|personne"
  function svQ(items, d) {
    var it = lv(items, d), f = it.f;
    return U.choice("Choisis la bonne forme du verbe :" + big(blank(f[0])), f[1], f[2].split(","), {
      steps: ["Je cherche le sujet : qui est-ce qui fait l'action ? → « <b>" + f[3] + "</b> ».", "C'est la " + PERS[f[4]] + ".", "La phrase : " + fill(f[0], f[1])]
    });
  }

  // Adjectifs : masculin singulier, féminin singulier, masculin pluriel, féminin pluriel
  var ADJ = {
    petit: "petit petite petits petites", grand: "grand grande grands grandes", joli: "joli jolie jolis jolies", vert: "vert verte verts vertes",
    noir: "noir noire noirs noires", bleu: "bleu bleue bleus bleues", rond: "rond ronde ronds rondes", lourd: "lourd lourde lourds lourdes",
    gentil: "gentil gentille gentils gentilles", blanc: "blanc blanche blancs blanches", heureux: "heureux heureuse heureux heureuses",
    gros: "gros grosse gros grosses", beau: "beau belle beaux belles", nouveau: "nouveau nouvelle nouveaux nouvelles", long: "long longue longs longues",
    doux: "doux douce doux douces", vieux: "vieux vieille vieux vieilles", sportif: "sportif sportive sportifs sportives"
  };
  var GN_IDX = { ms: 0, fs: 1, mp: 2, fp: 3 }, GN_TXT = { ms: "masculin singulier", fs: "féminin singulier", mp: "masculin pluriel", fp: "féminin pluriel" };
  // Accords dans le GN : "niveau|groupe avec ___|nom|ms/fs/mp/fp|adjectif"
  function gnQ(items, d) {
    var it = lv(items, d), f = it.f, forms = ADJ[f[3]].split(" "), good = forms[GN_IDX[f[2]]];
    return U.choice("Accorde l'adjectif <b>" + f[3] + "</b> :" + big(blank(f[0])), good, forms, {
      steps: ["Le nom « <b>" + f[1] + "</b> » est " + GN_TXT[f[2]] + ".", "L'adjectif s'accorde avec le nom (genre et nombre) : " + forms.join(", ") + ".", "Le groupe : " + fill(f[0], good)]
    });
  }

  /* ---------- Classes de mots : "Le:D petit:A chat:N dort:V ." ---------- */
  var CLASS = {
    D: ["Déterminant", "Le <b>déterminant</b> est un petit mot placé devant le nom (le, une, mon, ces…)."],
    N: ["Nom commun", "Le <b>nom commun</b> désigne une personne, un animal ou une chose ; on peut mettre « le » ou « un » devant."],
    NP: ["Nom propre", "Le <b>nom propre</b> est le nom particulier d'une personne ou d'un lieu ; il commence par une majuscule."],
    V: ["Verbe", "Le <b>verbe</b> se conjugue : on peut le mettre à un autre temps (hier…, demain…)."],
    A: ["Adjectif", "L'<b>adjectif</b> donne une précision sur le nom et s'accorde avec lui."],
    P: ["Pronom", "Le <b>pronom</b> remplace un nom ou un groupe nominal (je, tu, il, elle, nous, vous, ils, elles, le, la, lui…)."],
    ADV: ["Adverbe", "L'<b>adverbe</b> est invariable ; il précise un verbe, un adjectif ou un autre adverbe (vite, très, hier, lentement…)."]
  };
  function words(s) {
    return s.split(" ").map(function (w) { var i = w.indexOf(":"); return i > 0 ? { x: w.slice(0, i), t: w.slice(i + 1) } : { x: w, t: null }; });
  }
  function joinWords(ws, hl) {
    return ws.map(function (w, i) { return i === hl ? '<span class="hlw">' + w.x + "</span>" : w.x; }).join(" ").replace(/ ([.,])/g, "$1").replace(/ ([!?])/g, " $1");
  }
  function classQ(sentences, tagsByLevel, allTags, d) {
    var tags = tagsByLevel[d - 1], ws, idx, tries = 0;
    do {
      ws = words(pick(sentences));
      var cand = []; ws.forEach(function (w, i) { if (w.t && tags.indexOf(w.t) >= 0) cand.push(i); });
      idx = cand.length ? pick(cand) : -1; tries++;
    } while (idx < 0 && tries < 30);
    var w = ws[idx], good = CLASS[w.t][0];
    var bad = shuffle(allTags.filter(function (t) { return t !== w.t; })).map(function (t) { return CLASS[t][0]; });
    return U.choice("Quelle est la classe du mot surligné ?" + big(joinWords(ws, idx)), good, bad, {
      steps: ["Le mot « <b>" + w.x + "</b> » : <b>" + good.toLowerCase() + "</b>.", CLASS[w.t][1]]
    });
  }

  /* ---------- Fonctions : "[S:Le chat] [GV:dort] [CP:le soir]." ---------- */
  var FUNC = {
    S: ["Sujet", "Le <b>sujet</b> répond à la question « Qui est-ce qui … ? ». On peut l'encadrer par « c'est … qui »."],
    GV: ["Groupe verbal", "Le <b>groupe verbal</b> contient le verbe conjugué. On ne peut ni le déplacer ni le supprimer."],
    CP: ["Complément de phrase", "Le <b>complément de phrase</b> peut être déplacé ou supprimé : la phrase garde son sens."],
    CV: ["Complément du verbe", "Le <b>complément du verbe</b> est placé après le verbe. On ne peut ni le déplacer ni le supprimer."],
    ATT: ["Attribut du sujet", "L'<b>attribut du sujet</b> suit un verbe comme être, sembler, paraître, devenir… Il dit comment est le sujet."]
  };
  function parse(s) {
    var parts = [], re = /\[(\w+):([^\]]+)\]/g, m, last = 0;
    while ((m = re.exec(s))) {
      if (m.index > last) parts.push({ t: null, x: s.slice(last, m.index) });
      parts.push({ t: m[1], x: m[2] });
      last = re.lastIndex;
    }
    if (last < s.length) parts.push({ t: null, x: s.slice(last) });
    return parts;
  }
  function render(parts, hl, skip) {
    var out = "";
    for (var i = 0; i < parts.length; i++) {
      if (i === skip) continue;
      out += i === hl ? '<span class="hlw">' + parts[i].x + "</span>" : parts[i].x;
    }
    out = out.replace(/^[\s,]+/, "").replace(/\s+,/g, ",").replace(/,\s*\./g, ".").replace(/\s+\./g, ".").replace(/\s{2,}/g, " ");
    return out.replace(/^(<span class="hlw">)?(.)/, function (a, sp, c) { return (sp || "") + c.toUpperCase(); });
  }
  function funcQ(sentences, tagsByLevel, allTags, d) {
    var tags = tagsByLevel[d - 1], parts, idx, tries = 0;
    do {
      parts = parse(pick(sentences));
      var cand = []; parts.forEach(function (p, i) { if (p.t && tags.indexOf(p.t) >= 0) cand.push(i); });
      idx = cand.length ? pick(cand) : -1; tries++;
    } while (idx < 0 && tries < 30);
    var p = parts[idx], good = FUNC[p.t][0], st = ["Le groupe « <b>" + p.x + "</b> » : <b>" + good.toLowerCase() + "</b>.", FUNC[p.t][1]];
    if (p.t === "CP") st.push("Essai sans lui : « " + render(parts, -1, idx) + " » → la phrase a encore du sens.");
    var bad = allTags.filter(function (t) { return t !== p.t; }).map(function (t) { return FUNC[t][0]; });
    return U.choice("Quelle est la fonction du groupe surligné ?" + big(render(parts, idx)), good, bad, { steps: st });
  }

  /* ---------- Types et formes de phrases ---------- */
  var TYPES = {
    D: ["Déclarative", "La phrase <b>déclarative</b> donne une information. Elle se termine par un point."],
    I: ["Interrogative", "La phrase <b>interrogative</b> pose une question. Elle se termine par un point d'interrogation."],
    E: ["Exclamative", "La phrase <b>exclamative</b> exprime une émotion (joie, surprise, colère…). Elle se termine par un point d'exclamation."],
    M: ["Impérative", "La phrase <b>impérative</b> donne un ordre ou un conseil. Le verbe est à l'impératif, sans sujet."]
  };
  var FORMS = {
    P: ["Positive", "Il n'y a pas de négation : la phrase est à la forme <b>positive</b>."],
    N: ["Négative", "La phrase contient une négation (ne … pas, ne … jamais, ne … plus, ne … rien) : forme <b>négative</b>."]
  };
  // banque : "phrase|type|forme"
  function typeQ(bank, types) {
    var it = pick(bank.filter(function (b) { return types.indexOf(b[1]) >= 0; }));
    return U.choice("Quel est le <b>type</b> de cette phrase ?" + big(it[0]), TYPES[it[1]][0], types.filter(function (t) { return t !== it[1]; }).map(function (t) { return TYPES[t][0]; }), {
      steps: [TYPES[it[1]][1]]
    });
  }
  function formQ(bank, types) {
    var it = pick(bank.filter(function (b) { return types.indexOf(b[1]) >= 0; }));
    return U.choice("Quelle est la <b>forme</b> de cette phrase ?" + big(it[0]), FORMS[it[2]][0], [FORMS[it[2] === "P" ? "N" : "P"][0]], { steps: [FORMS[it[2]][1]] });
  }
  // banque : "phrase positive|bonne négative|piège|piège"
  function negQ(bank) {
    var it = pick(bank);
    return U.choice("Quelle est la bonne phrase <b>négative</b> ?" + big(it[0]), it[1], it.slice(2), {
      steps: ["La négation entoure le verbe conjugué : <b>ne</b> … <b>pas</b>.", "Devant une voyelle, « ne » devient <b>n'</b>.", "Réponse : " + it[1]]
    });
  }

  /* ---------- Vocabulaire ---------- */
  var WORDS = ("arbre abeille avion araignée ami ballon banane bateau biscuit bonbon bulle balai cheval chat chien chocolat château chemise citron cadeau carotte " +
    "dauphin dragon domino école éléphant étoile fleur fraise forêt fusée girafe gâteau guitare hibou herbe île jardin jouet koala lapin lune lit loup " +
    "maison marron mardi mouton montagne moto nuage neige orange ours papillon parc pain patin page pomme poule poisson quille renard robot rose " +
    "soleil sapin salade sac singe tortue tomate table train tigre usine vache vélo valise wagon yaourt zèbre").split(" ");
  function plain(w) {
    return w.replace(/[éèêë]/g, "e").replace(/[àâä]/g, "a").replace(/[îï]/g, "i").replace(/[ôö]/g, "o").replace(/[ûùü]/g, "u").replace(/ç/g, "c");
  }
  // Ordre alphabétique : niveau d = on compare la d-ième lettre
  function alphaQ(d) {
    var list, tries = 0;
    do {
      var pre = d === 1 ? "" : plain(pick(WORDS)).slice(0, d - 1), seen = {};
      list = shuffle(WORDS.filter(function (w) {
        var p = plain(w), key = p.charAt(d - 1);
        if (p.slice(0, d - 1) !== pre || seen[key]) return false;
        seen[key] = 1; return true;
      })).slice(0, 4);
      tries++;
    } while (list.length < 3 && tries < 60);
    var sorted = list.slice().sort(function (a, b) { return plain(a) < plain(b) ? -1 : 1; });
    var n = ["1re", "2e", "3e"][d - 1];
    return U.choice("Quel mot vient <b>en premier</b> dans le dictionnaire ?" + big(list.join(" · ")), sorted[0], list, {
      steps: [d === 1 ? "On compare la <b>1re lettre</b> de chaque mot, dans l'ordre de l'alphabet." : "Les mots commencent pareil : on compare la <b>" + n + " lettre</b>.",
        "Dans l'ordre : " + sorted.join(" → ") + "."]
    });
  }
  // banque : "mot|synonyme|antonyme"
  function synQ(bank, d) {
    var it = pick(bank), kind = d === 1 ? 0 : d === 2 ? 1 : R(0, 1), good = it[1 + kind], others = shuffle(bank.filter(function (b) { return b !== it; }));
    var bad = [it[2 - kind]].concat(others.slice(0, 2).map(function (b) { return b[1 + R(0, 1)]; }));
    return U.choice((kind ? "Quel mot veut dire le <b>contraire</b> de" : "Quel mot a le <b>même sens</b> que") + big("« " + it[0] + " »"), good, bad, {
      steps: [kind ? "Un <b>antonyme</b> est un mot de sens contraire : " + it[0] + " ≠ <b>" + good + "</b>." : "Un <b>synonyme</b> est un mot de même sens : " + it[0] + " = <b>" + good + "</b>.",
        kind ? "« " + it[1] + " » est un synonyme : il a le même sens, pas le contraire." : "« " + it[2] + " » est un antonyme : il veut dire le contraire."]
    });
  }
  // banque : "mot de base|membres,…|intrus"
  function famQ(bank, d) {
    var it = pick(bank), mem = it[1].split(","), st = ["Les mots d'une même <b>famille</b> ont le même radical et un sens proche : " + it[0] + " → " + mem.join(", ") + "."];
    if (d === 1) {
      var good = pick(mem), bad = shuffle(bank.filter(function (b) { return b !== it; })).slice(0, 3).map(function (b) { return b[2]; });
      return U.choice("Quel mot est de la famille de" + big("« " + it[0] + " »"), good, bad, { steps: st });
    }
    st.push("« " + it[2] + " » ressemble un peu, mais n'a <b>aucun rapport de sens</b> avec « " + it[0] + " ».");
    return U.choice("Quel mot n'est <b>pas</b> de la famille de" + big("« " + it[0] + " »"), it[2], shuffle(mem).slice(0, 3), { steps: st });
  }

  return {
    present: present, imparfait: imparfait, futur: futur, conditionnel: conditionnel, passeCompose: passeCompose, imperatif: imperatif, pp: pp, aux: aux,
    conj: conj, table: table, tableImp: tableImp, withPron: withPron, conjQ: conjQ, tempsQ: tempsQ, imperatifQ: imperatifQ, COMP: COMP,
    lines: lines, rows: rows, lv: lv, blank: blank, fill: fill, cap: cap, homoQ: homoQ, svQ: svQ, gnQ: gnQ, ADJ: ADJ, PERS: PERS,
    classQ: classQ, funcQ: funcQ, parse: parse, render: render, words: words, joinWords: joinWords,
    typeQ: typeQ, formQ: formQ, negQ: negQ, alphaQ: alphaQ, synQ: synQ, famQ: famQ, plain: plain
  };
})();
