/* Outils pour l'allemand : vocabulaire illustré, nombres, heure, conjugaison (orthographe suisse : ss, pas de ß) */
var DE = (function () {
  "use strict";
  var R = U.R, pick = U.pick, shuffle = U.shuffle, big = U.big;

  /* ---------- La voix allemande : un petit fichier son par mot ou phrase (voix-de/) ---------- */
  var VOICE_V = "1", cur = null;
  function plain(h) { return String(h).replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").replace(/^ | $/g, ""); }
  function key(t) { var h = 5381; t = plain(t); for (var i = 0; i < t.length; i++) h = ((h * 33) ^ t.charCodeAt(i)) >>> 0; return ("0000000" + h.toString(16)).slice(-8); }
  function hush() { if (cur) { try { cur.pause(); } catch (e) {} cur = null; } }
  function speak(t) {
    hush();
    if (!t) return;
    var a = new Audio("voix-de/" + key(t) + ".mp3?v=" + VOICE_V);
    cur = a;
    try { var p = a.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
  }
  // sayQ : l'allemand de la question (lu tout de suite) ; sayA : l'allemand de la bonne réponse (lu après la réponse)
  // le texte d'une lecture (titre + histoire), pris dans le HTML de la question ou de la feuille
  function textOf(h) { var m = /<div class="texte">([\s\S]*?)<\/div>(<div class="qq">|$)/.exec(h); return m ? plain(m[1].replace("</div>", ". </div>")) : ""; }
  function tag(q, sayQ, sayA) { if (sayQ) q.sayQ = plain(sayQ); if (sayA) q.sayA = plain(sayA); return q; }

  function rows(s) {
    return s.split("\n").map(function (x) { return x.replace(/^\s+|\s+$/g, ""); }).filter(function (x) { return x; }).map(function (x) { return x.split("|"); });
  }
  function article(s) { var m = /^(der|die|das) /.exec(s); return m ? m[1] : null; }
  function noun(s) { return s.replace(/^(der|die|das) /, ""); }
  // Code couleur des articles : der bleu, die rouge, das vert
  function art(s) { return s.replace(/^(der|die|das) /, function (a, x) { return '<span class="' + x + '">' + x + "</span> "; }); }
  function pic(e) { return '<span class="emo">' + (e || "💬") + "</span>"; }
  var GENDER = { der: "masculin", die: "féminin", das: "neutre" };
  var ART_TIP = "<b>der</b> = masculin · <b>die</b> = féminin · <b>das</b> = neutre. Le genre n'est pas toujours le même qu'en français : apprends chaque mot <b>avec son article</b> !";

  /* ---------- Fautes d'orthographe plausibles ---------- */
  var SWAPS = [[/ie/, "ei"], [/ei/, "ie"], [/sch/, "ch"], [/u(?!e)/, "ou"], [/z/, "ts"], [/w/, "v"], [/v/, "f"], [/ä/, "e"], [/ü/, "u"], [/ö/, "o"],
    [/eu/, "oi"], [/ss/, "s"], [/([aeiou])h/, "$1"], [/([bcdfgklmnprt])\1/, "$1"], [/k/, "c"], [/au/, "o"], [/ch(?!t)/, "sch"], [/e$/, ""], [/t$/, "d"]];
  function misspell(s) {
    var a = article(s), base = a ? noun(s) : s, out = [], tries = 0;
    if (a) out.push(a + " " + base.charAt(0).toLowerCase() + base.slice(1)); // oubli de la majuscule
    while (out.length < 4 && tries < 40) {
      var sw = pick(SWAPS), w = base.replace(sw[0], sw[1]);
      tries++;
      if (w === base || w.length < 2) continue;
      w = a ? a + " " + w : w;
      if (out.indexOf(w) < 0) out.push(w);
    }
    return shuffle(out).slice(0, 3);
  }

  /* ---------- Thème de vocabulaire illustré ---------- */
  // o.words : "mot allemand|mot français|emoji" ; o.learn : diapos d'introduction ; o.extra(d) : autre type de question
  function vocab(o) {
    var W = rows(o.words), nouns = W.filter(function (w) { return article(w[0]); }), slides = (o.learn || []).slice();
    for (var i = 0; i < W.length; i += 8) {
      var h = '<div class="vgrid">';
      W.slice(i, i + 8).forEach(function (w) { h += '<div class="vc f" data-a="desay|' + plain(w[0]) + '">' + pic(w[2]) + "<b>" + art(w[0]) + "</b><span>" + w[1] + "</span></div>"; });
      slides.push({ t: "Les mots" + (W.length > 8 ? " (" + (i / 8 + 1) + "/" + Math.ceil(W.length / 8) + ")" : ""), h: h + "</div>" });
    }
    if (nouns.length) slides.push({ t: "der, die, das", h: ART_TIP + '<div class="vgrid">' + shuffle(nouns).slice(0, 4).map(function (w) { return '<div class="vc">' + pic(w[2]) + "<b>" + art(w[0]) + "</b><span>" + GENDER[article(w[0])] + "</span></div>"; }).join("") + "</div>" });
    o.learn = slides;
    o.gen = function (d) {
      if (o.extra && d >= 2 && R(0, 2) === 0) return o.extra(d);
      var w = pick(W), others = shuffle(W.filter(function (x) { return x !== w; })), a = article(w[0]);
      var kinds = d === 1 ? ["fd", "fd", "df"] : d === 2 ? ["fd", "df", a ? "art" : "sp", "sp"] : [a ? "art" : "sp", "sp", "df", "fd"], k = pick(kinds);
      var bad = k === "sp" ? misspell(w[0]) : [];
      if (k === "sp" && bad.length < 2) k = "fd";
      var st = [pic(w[2]) + " <b>" + art(w[0]) + "</b> = " + w[1]];
      if (k === "fd") return tag(U.choice("Comment dit-on en allemand ?" + big(pic(w[2]) + " " + w[1]), w[0], others.map(function (x) { return x[0]; }), { steps: st }), null, w[0]);
      if (k === "df") return tag(U.choice("Que veut dire ce mot ?" + big(w[0]), w[1], others.map(function (x) { return x[1]; }), { steps: st }), w[0]);
      if (k === "art") return tag(U.choice("Quel est le bon article ?" + big(pic(w[2]) + ' <span class="blank">…</span> ' + noun(w[0])), a, ["der", "die", "das"],
        { steps: st.concat(["C'est un mot " + GENDER[a] + " : <b>" + a + "</b>.", ART_TIP]) }), null, w[0]);
      return tag(U.choice("Quel mot est bien écrit ?" + big(pic(w[2]) + " " + w[1]), w[0], bad,
        { steps: st.concat([a ? "En allemand, les <b>noms</b> commencent toujours par une <b>majuscule</b>." : "Lis bien chaque lettre."]) }), null, w[0]);
    };
    o.write = function () {
      var w = pick(W), a = article(w[0]);
      return { type: "write", sayA: plain(w[0]), text: "✍️ Écris en allemand" + (a ? " (avec l'article)" : "") + " :" + big(pic(w[2]) + " " + w[1]), answer: w[0],
        steps: ["Réponse : <b>" + art(w[0]) + "</b>", a ? "Vérifie l'article et la majuscule du nom." : "Vérifie chaque lettre."] };
    };
    return o;
  }

  /* ---------- Nombres ---------- */
  var U20 = "null eins zwei drei vier fünf sechs sieben acht neun zehn elf zwölf dreizehn vierzehn fünfzehn sechzehn siebzehn achtzehn neunzehn".split(" ");
  var TENS = ",,zwanzig,dreissig,vierzig,fünfzig,sechzig,siebzig,achtzig,neunzig".split(",");
  function zahl(n) {
    if (n < 20) return U20[n];
    if (n < 100) { var u = n % 10, t = Math.floor(n / 10); return u ? (u === 1 ? "ein" : U20[u]) + "und" + TENS[t] : TENS[t]; }
    if (n < 1000) { var h = Math.floor(n / 100), r = n % 100; return (h === 1 ? "" : U20[h]) + "hundert" + (r ? zahl(r) : ""); }
    return "tausend";
  }
  function zahlSteps(n) {
    if (n < 20) return [n + " = <b>" + zahl(n) + "</b>"];
    var st = [];
    if (n >= 100) st.push("D'abord les centaines : " + Math.floor(n / 100) * 100 + " = " + zahl(Math.floor(n / 100) * 100) + ".");
    var r = n % 100, u = r % 10, t = r - u;
    if (r >= 20 && u) st.push("Puis, à l'envers : d'abord les <b>unités</b>, puis « und », puis les dizaines : " + u + " (" + (u === 1 ? "ein" : U20[u]) + ") + und + " + t + " (" + TENS[t / 10] + ").");
    else if (r) st.push("Puis " + r + " = " + zahl(r) + ".");
    st.push(n + " = <b>" + zahl(n) + "</b>");
    return st;
  }
  function zahlQ(lo, hi, d) {
    var n = R(lo, hi), good = zahl(n), bad = [];
    var u = n % 10, t = Math.floor(n / 10) % 10;
    if (n >= 20 && u && t && u !== t) bad.push(zahl(n - n % 100 + u * 10 + t)); // le piège : 47 ↔ 74
    [1, -1, 10, -10, 2].forEach(function (k) { if (n + k >= 0 && n + k < 1000) bad.push(zahl(n + k)); });
    if (d >= 2 && R(0, 1)) return tag(U.num("Écris ce nombre en chiffres :" + big(cap(good)), n, { steps: zahlSteps(n) }), good);
    return tag(U.choice("Comment écrit-on ce nombre en allemand ?" + big(String(n)), good, shuffle(bad.slice(0, 1)).concat(shuffle(bad.slice(1))), { steps: zahlSteps(n) }), null, good);
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------- L'heure ---------- */
  function clock(h, m) {
    var s = '<svg class="pic" viewBox="0 0 200 200" style="width:28vh;height:28vh"><circle cx="100" cy="100" r="92" fill="#fbfaf6" stroke="#ffc94a" stroke-width="8"/>';
    for (var i = 1; i <= 12; i++) {
      var a = i * Math.PI / 6;
      s += '<text x="' + (100 + 72 * Math.sin(a)).toFixed(1) + '" y="' + (100 - 72 * Math.cos(a) + 7).toFixed(1) + '" font-size="20" font-weight="700" text-anchor="middle" fill="#222">' + i + "</text>";
    }
    function hand(ang, len, w, c) { var r = ang * Math.PI / 180; return '<line x1="100" y1="100" x2="' + (100 + len * Math.sin(r)).toFixed(1) + '" y2="' + (100 - len * Math.cos(r)).toFixed(1) + '" stroke="' + c + '" stroke-width="' + w + '" stroke-linecap="round"/>'; }
    s += hand((h % 12 + m / 60) * 30, 44, 9, "#222") + hand(m * 6, 68, 5, "#e5484d") + '<circle cx="100" cy="100" r="7" fill="#222"/></svg>';
    return s;
  }
  function hw(h) { h = ((h - 1) % 12 + 12) % 12 + 1; return zahl(h); }
  function uhr(h, m) {
    if (m === 0) return "Es ist " + (h % 12 === 1 ? "ein" : hw(h)) + " Uhr.";
    if (m === 15) return "Es ist Viertel nach " + hw(h) + ".";
    if (m === 30) return "Es ist halb " + hw(h + 1) + ".";
    if (m === 45) return "Es ist Viertel vor " + hw(h + 1) + ".";
    if (m < 30) return "Es ist " + zahl(m) + " nach " + hw(h) + ".";
    return "Es ist " + zahl(60 - m) + " vor " + hw(h + 1) + ".";
  }
  function fr(h, m) { return h + " h " + (m < 10 ? "0" + m : m); }
  var UHR_RULE = {
    0: "Heure pile : « <b>… Uhr</b> ».", 15: "Et quart : « <b>Viertel nach</b> » + l'heure.",
    30: "Attention, piège ! « <b>halb</b> » + l'heure <b>suivante</b> : 3 h 30 = halb <b>vier</b> (la moitié avant 4 h).",
    45: "Moins le quart : « <b>Viertel vor</b> » + l'heure suivante.", x: "Après l'heure : « … <b>nach</b> … » ; avant l'heure : « … <b>vor</b> … »."
  };
  function uhrQ(d) {
    var h = R(1, 12), M = d === 1 ? [0, 30] : d === 2 ? [0, 15, 30, 45] : [5, 10, 20, 30, 40, 45, 50, 55], m = pick(M), good = uhr(h, m);
    var rule = UHR_RULE[m] !== undefined ? UHR_RULE[m] : UHR_RULE.x;
    if (d >= 2 && R(0, 1)) {
      // de l'allemand vers l'heure (le piège de « halb »)
      var bad = [fr(h % 12 + 1, m), fr(h, (m + 30) % 60), fr(h === 1 ? 12 : h - 1, m), fr(h % 12 + 1, 0)];
      return tag(U.choice("Quelle heure est-il ?" + big(good), fr(h, m), bad, { visual: clock(h, m), steps: [rule, good + " = <b>" + fr(h, m) + "</b>"] }), good);
    }
    var opts = [uhr(h % 12 + 1, m), uhr(h, m === 15 ? 45 : m === 45 ? 15 : (m + 30) % 60), uhr(h === 1 ? 12 : h - 1, m)];
    if (m === 30) opts.unshift("Es ist halb " + hw(h) + ".");
    return tag(U.choice("Quelle heure est-il ?" + big(clock(h, m)), good, opts, { steps: ["Il est " + fr(h, m) + ".", rule, "<b>" + good + "</b>"] }), null, good);
  }

  /* ---------- Conjugaison ---------- */
  var PRON = ["ich", "du", "er / sie / es", "wir", "ihr", "sie / Sie"];
  var PRON_FR = ["je", "tu", "il / elle", "nous", "vous", "ils / elles / vous (politesse)"];
  var SPECIAL = {
    sein: "bin bist ist sind seid sind", haben: "habe hast hat haben habt haben",
    "können": "kann kannst kann können könnt können", wollen: "will willst will wollen wollt wollen", "müssen": "muss musst muss müssen müsst müssen",
    "dürfen": "darf darfst darf dürfen dürft dürfen", "mögen": "mag magst mag mögen mögt mögen", "möchten": "möchte möchtest möchte möchten möchtet möchten"
  };
  // Verbes forts : formes de du et er (le reste est régulier)
  var STRONG = {
    fahren: "fährst fährt", schlafen: "schläfst schläft", laufen: "läufst läuft", tragen: "trägst trägt", essen: "isst isst", lesen: "liest liest",
    sehen: "siehst sieht", sprechen: "sprichst spricht", nehmen: "nimmst nimmt", geben: "gibst gibt", helfen: "hilfst hilft"
  };
  function conj(inf) {
    if (SPECIAL[inf]) return SPECIAL[inf].split(" ");
    var st = inf.replace(/e?n$/, ""), e = /[td]$/.test(st) ? "e" : "", s = /(s|z|x)$/.test(st);
    var f = [st + "e", st + e + (s ? "t" : "st"), st + e + "t", inf, st + e + "t", inf];
    if (STRONG[inf]) { var x = STRONG[inf].split(" "); f[1] = x[0]; f[2] = x[1]; }
    return f;
  }
  function table(inf, fr) {
    var f = conj(inf), h = '<table class="conj"><tr><th colspan="2">' + inf + (fr ? " (" + fr + ")" : "") + "</th></tr>";
    for (var i = 0; i < 6; i++) h += "<tr><td>" + PRON[i] + "</td><td><b>" + f[i] + "</b></td></tr>";
    return h + "</table>";
  }
  var SUBJ = [["Ich"], ["Du"], ["Er", "Anna", "Tom", "Mein Bruder", "Meine Schwester"], ["Wir"], ["Ihr"], ["Die Kinder", "Meine Eltern", "Anna und Tom"]]; // jamais « Sie » en début de phrase : elle ou ils ?
  // verbs : "infinitif|traduction|complément"
  function verbQ(verbs, note) {
    var v = pick(verbs), p = R(0, 5), subj = pick(SUBJ[p]), f = conj(v[0]), good = f[p];
    var bad = f.filter(function (x, i) { return i !== p; });
    var st = ["Le sujet « " + subj + " » se conjugue comme <b>" + PRON[p].split(" / ")[0] + "</b> (" + PRON_FR[p].split(" / ")[0] + ").",
      "<b>" + v[0] + "</b> → " + PRON[p].split(" / ")[0] + " <b>" + good + "</b>"];
    if (note) { var n = note(v[0], p); if (n) st.push(n); }
    st.push("La phrase : " + subj + " <b>" + good + "</b> " + v[2] + (/\?$/.test(v[2]) ? "" : "."));
    return tag(U.choice("Complète avec le verbe <b>" + v[0] + "</b> <i>(" + v[1] + ")</i> :" + big(subj + ' <span class="blank">…</span> ' + v[2] + (/\?$/.test(v[2]) ? "" : ".")), good, shuffle(bad), {
      visual: table(v[0], v[1]), steps: st
    }), null, subj + " " + good + " " + v[2] + (/\?$/.test(v[2]) ? "" : "."));
  }

  /* ---------- Banques de questions simples ---------- */
  // "question avec ___|bon|pièges séparés par des virgules|explication"
  function fillQ(items, title) {
    var it = pick(items), s = it[0];
    return tag(U.choice(title + big(s.replace("___", '<span class="blank">…</span>')), it[1], it[2].split(","), {
      steps: (it[3] ? [it[3]] : []).concat(["Réponse : " + s.replace("___", "<b>" + it[1] + "</b>")])
    }), null, s.replace("___", it[1]));
  }

  return {
    rows: rows, article: article, noun: noun, art: art, pic: pic, vocab: vocab, misspell: misspell, ART_TIP: ART_TIP,
    zahl: zahl, zahlQ: zahlQ, zahlSteps: zahlSteps, clock: clock, uhr: uhr, uhrQ: uhrQ, fr: fr,
    conj: conj, table: table, verbQ: verbQ, PRON: PRON, PRON_FR: PRON_FR, fillQ: fillQ, cap: cap,
    plain: plain, key: key, speak: speak, hush: hush, tag: tag, textOf: textOf
  };
})();
