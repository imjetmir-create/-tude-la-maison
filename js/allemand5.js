/* Allemand 5H : premiers pas (Plan d'études romand, L2 26 : comprendre et dire des mots et phrases simples) */
(function () {
  "use strict";
  var T = window.THEMES = window.THEMES || [];
  var R = U.R, pick = U.pick, big = U.big;
  function add(chapter, o) { o.grade = 5; o.subject = "allemand"; o.chapter = chapter; T.push(o); }
  function sw(c) { return '<i class="sw" style="background:' + c + '"></i>'; }
  var C1 = "Premiers pas", C2 = "Mon monde", C3 = "Les phrases";

  /* ================= Premiers pas ================= */
  add(C1, DE.vocab({
    id: "d5-hallo", icon: "👋", title: "Hallo ! Se saluer et se présenter",
    desc: "Dire bonjour, au revoir, merci, et se présenter.",
    learn: [{ t: "Bonjour en allemand", h: "Pour saluer, on dit <b>Hallo</b> (salut) ou <b>Guten Tag</b> (bonjour).<br>Pour partir : <b>Tschüss</b> ou <b>Auf Wiedersehen</b>." + big("Hallo! Ich heisse Lena.") + "<small>En Suisse, on écrit « ss » : heissen, Strasse, gross.</small>" }],
    words: "Hallo|Salut|👋\nGuten Morgen|Bonjour (le matin)|🌅\nGuten Tag|Bonjour|🌞\nGuten Abend|Bonsoir|🌆\nGute Nacht|Bonne nuit|🌙\nTschüss|Au revoir (entre amis)|🚶\nAuf Wiedersehen|Au revoir|🙋\nDanke|Merci|🙏\n" +
      "Bitte|S'il te plaît|🤲\nJa|Oui|👍\nNein|Non|👎\nWie heisst du?|Comment t'appelles-tu ?|❓\nIch heisse …|Je m'appelle …|😀\nWie geht's?|Comment ça va ?|🤔\nGut, danke!|Bien, merci !|😊\nWie alt bist du?|Quel âge as-tu ?|🎂\nIch bin zehn Jahre alt.|J'ai dix ans.|🔟\nEntschuldigung!|Pardon !|😅"
  }));

  var SONS = DE.rows([
    "ei|aï|drei, Eis, klein|i,é,eu", "ie|i|vier, spielen, Liebe|aï,ié,é", "eu|oï|neun, heute, Freund|eu,u,é", "au|aou|Haus, Maus, blau|o,ô,eu",
    "u|ou|Hund, gut, Uhr|u,eu,o", "ü|u (comme en français)|fünf, müde, Tür|ou,i,eu", "ö|eu|schön, hören|o,é,ou", "ä|è|Mädchen, Käse|a,i,o",
    "sch|ch (comme « chat »)|Schule, Fisch|sk,s,k", "w|v|Wasser, Wo, Wetter|w (oua),f,b", "v|f|Vater, vier, Vogel|v,b,w", "z|ts|zehn, Zug, Katze|z,s,dz",
    "j|y (comme « yaourt »)|ja, Jahr, Junge|j,ch,g", "st (au début)|cht|Stern, Stuhl|st,s,ss", "sp (au début)|chp|spielen, Sport|sp,s,ss", "e (à la fin)|é léger (jamais muet)|Katze, Schule|muet,a,i"
  ].join("\n"));
  add(C1, {
    id: "d5-sons", icon: "🗣️", title: "Lire et prononcer l'allemand",
    desc: "ei, ie, u, ü, sch, w, z… les sons de l'allemand.",
    learn: [
      { t: "Des lettres qui se lisent autrement", h: "En allemand, certaines lettres ne se prononcent pas comme en français :" + big("ei → « aï » · ie → « i »") + "<b>drei</b> (3) se dit « draï », <b>vier</b> (4) se dit « fir »." },
      { t: "Les voyelles", h: "<b>u</b> → « ou » : Hund (« hount »)<br><b>ü</b> → « u » : fünf<br><b>ö</b> → « eu » : schön<br><b>ä</b> → « è » : Käse<br><b>au</b> → « aou » : Haus<br><b>eu</b> → « oï » : neun" },
      { t: "Les consonnes", h: "<b>sch</b> → « ch » : Schule<br><b>w</b> → « v » : Wasser<br><b>v</b> → « f » : Vater<br><b>z</b> → « ts » : zehn<br><b>j</b> → « y » : ja<br><b>st</b>, <b>sp</b> au début → « cht », « chp » : Stern, spielen" },
      { t: "Astuce", h: "En allemand, on prononce <b>toutes</b> les lettres, même le <b>e</b> final : Katze se dit « katse », pas « kats ».<br><br>Et le <b>h</b> au début se souffle : Hund, Haus." }
    ],
    gen: function (d) {
      var s = pick(SONS), ex = pick(s[2].split(", ")), g = s[0].split(" ")[0], fin = /fin/.test(s[0]);
      var re = fin ? /e$/ : new RegExp(g, "i");
      if (d === 3 && R(0, 1)) {
        // des mots qui ne contiennent pas du tout cette lettre
        var all = []; SONS.forEach(function (x) { if (x !== s) all = all.concat(x[2].split(", ")); });
        var other = U.shuffle(all.filter(function (w) { return !re.test(w); })).slice(0, 3);
        return U.choice("Dans quel mot entends-tu le son <b>« " + s[1].split(" (")[0] + " »</b>, écrit <b>" + g + "</b> ?", ex, other, { steps: ["« " + s[0] + " » se prononce <b>" + s[1] + "</b>.", "Exemples : " + s[2]] });
      }
      return U.choice("Dans le mot <b>« " + ex + " »</b>, comment se prononce <b>" + g + "</b> ?" + big(ex.replace(re, function (m) { return "<u>" + m + "</u>"; })), s[1], s[3].split(","), {
        steps: ["En allemand, <b>" + s[0] + "</b> se prononce <b>« " + s[1] + " »</b>.", "D'autres mots : " + s[2]]
      });
    }
  });

  add(C1, {
    id: "d5-zahlen", icon: "🔢", title: "Les nombres de 0 à 100",
    desc: "Compter en allemand… et le piège de 21, 47, 85 !",
    learn: [
      { t: "De 0 à 12", h: '<div class="vgrid small">' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function (n) { return '<div class="vc"><span class="emo">' + n + "</span><b>" + DE.zahl(n) + "</b></div>"; }).join("") + "</div>" },
      { t: "De 13 à 20", h: "On ajoute <b>-zehn</b> (dix) :" + big("drei + zehn = dreizehn (13)") + "13 dreizehn · 14 vierzehn · 15 fünfzehn · 16 <b>sech</b>zehn · 17 <b>sieb</b>zehn · 18 achtzehn · 19 neunzehn · 20 zwanzig" },
      { t: "Les dizaines", h: "20 zwanzig · 30 drei<b>ss</b>ig · 40 vierzig · 50 fünfzig<br>60 sechzig · 70 siebzig · 80 achtzig · 90 neunzig · 100 hundert" },
      { t: "Le grand piège : à l'envers !", h: "En allemand, on dit d'abord les <b>unités</b>, puis « und » (et), puis les <b>dizaines</b> :" + big("47 = sieben<b>und</b>vierzig") + "« sept-et-quarante »<br><small>21 = <b>ein</b>undzwanzig (on dit « ein », pas « eins »).</small>" }
    ],
    gen: function (d) { return d === 1 ? DE.zahlQ(0, 12, 1) : d === 2 ? DE.zahlQ(10, 30, 2) : DE.zahlQ(21, 99, 3); }
  });

  add(C1, DE.vocab({
    id: "d5-farben", icon: "🎨", title: "Les couleurs",
    desc: "rot, blau, gelb, grün…",
    learn: [{ t: "Welche Farbe?", h: "<b>Welche Farbe?</b> = Quelle couleur ?" + big("Der Ball ist rot.") + "<small>Les couleurs ne prennent pas de majuscule : ce ne sont pas des noms.</small>" }],
    words: ["rot|rouge|" + sw("#e5484d"), "blau|bleu|" + sw("#3d8bfd"), "grün|vert|" + sw("#3fbf6f"), "gelb|jaune|" + sw("#f5c542"), "orange|orange|" + sw("#ff8a3d"),
      "lila|violet|" + sw("#9b5de5"), "rosa|rose|" + sw("#ff8fc7"), "braun|brun|" + sw("#8b5a2b"), "schwarz|noir|" + sw("#111"), "weiss|blanc|" + sw("#fff"), "grau|gris|" + sw("#888"),
      "hell|clair|🌞", "dunkel|foncé|🌑"].join("\n")
  }));

  /* ================= Mon monde ================= */
  var FAM_N = [["Vater", "m"], ["Mutter", "f"], ["Bruder", "m"], ["Schwester", "f"], ["Grossvater", "m"], ["Grossmutter", "f"], ["Onkel", "m"], ["Tante", "f"], ["Baby", "n"], ["Eltern", "p"]];
  add(C2, DE.vocab({
    id: "d5-familie", icon: "👨‍👩‍👧", title: "La famille",
    desc: "Vater, Mutter, Bruder… et « mein / meine ».",
    learn: [
      { t: "Meine Familie", h: "Pour présenter sa famille :" + big("Das ist <b>mein</b> Bruder. Das ist <b>meine</b> Schwester.") },
      { t: "mein ou meine ?", h: "<b>mein</b> devant un mot masculin ou neutre : mein Vater, mein Baby.<br><b>meine</b> devant un mot féminin ou pluriel : meine Mutter, meine Eltern.<br><br><b>dein / deine</b> = ton / ta : dein Bruder, deine Tante." }
    ],
    words: "der Vater|le père|👨\ndie Mutter|la mère|👩\nder Bruder|le frère|👦\ndie Schwester|la sœur|👧\nder Grossvater|le grand-père|👴\ndie Grossmutter|la grand-mère|👵\nder Onkel|l'oncle|🧔\ndie Tante|la tante|👩\ndas Baby|le bébé|👶\ndie Eltern|les parents|👫\ndie Familie|la famille|🏡\nder Freund|l'ami|🤝",
    extra: function (d) {
      var n = pick(FAM_N), dein = d === 3 && R(0, 1), base = dein ? "dein" : "mein", good = base + (n[1] === "f" || n[1] === "p" ? "e" : "");
      return U.choice("Complète (" + (dein ? "ton / ta / tes" : "mon / ma / mes") + ") :" + big("Das ist " + '<span class="blank">…</span> ' + n[0] + "."), good, [base, base + "e", dein ? "mein" : "dein"], {
        steps: ["« " + n[0] + " » est " + { m: "masculin", f: "féminin", n: "neutre", p: "au pluriel" }[n[1]] + ".", "<b>" + base + "</b> pour masculin et neutre, <b>" + base + "e</b> pour féminin et pluriel.", "Das ist <b>" + good + "</b> " + n[0] + "."]
      });
    }
  }));

  add(C2, DE.vocab({
    id: "d5-tiere", icon: "🐶", title: "Les animaux",
    desc: "der Hund, die Katze, das Pferd…",
    learn: [{ t: "Die Tiere", h: "Chaque nom allemand a un <b>article</b> : der, die ou das." + big('<span class="der">der</span> Hund · <span class="die">die</span> Katze · <span class="das">das</span> Pferd') + "Les noms ont toujours une <b>majuscule</b>." }],
    words: "der Hund|le chien|🐶\ndie Katze|le chat|🐱\ndie Maus|la souris|🐭\ndas Pferd|le cheval|🐴\ndie Kuh|la vache|🐮\ndas Schwein|le cochon|🐷\nder Vogel|l'oiseau|🐦\nder Fisch|le poisson|🐟\n" +
      "das Kaninchen|le lapin|🐰\nder Frosch|la grenouille|🐸\ndie Schlange|le serpent|🐍\nder Elefant|l'éléphant|🐘\nder Löwe|le lion|🦁\nder Bär|l'ours|🐻\ndas Schaf|le mouton|🐑\ndie Ente|le canard|🦆"
  }));

  add(C2, DE.vocab({
    id: "d5-schule", icon: "🎒", title: "À l'école",
    desc: "Le matériel scolaire et la classe.",
    learn: [{ t: "In der Schule", h: big("Ich habe ein Buch und einen Bleistift.") + "<small>Le mot « Schule » se dit « chou-lé ».</small>" }],
    words: "das Buch|le livre|📕\ndas Heft|le cahier|📓\nder Bleistift|le crayon|✏️\nder Kugelschreiber|le stylo|🖊️\nder Radiergummi|la gomme|🧽\ndie Schere|les ciseaux|✂️\ndas Lineal|la règle|📏\n" +
      "die Schultasche|le cartable|🎒\nder Tisch|la table|🍽️\nder Stuhl|la chaise|💺\ndie Tafel|le tableau noir|⬛\nder Lehrer|l'enseignant|👨‍🏫\ndie Lehrerin|l'enseignante|👩‍🏫\nder Computer|l'ordinateur|💻\nder Leim|la colle|🧴\ndie Pause|la récréation|⏸️"
  }));

  add(C2, DE.vocab({
    id: "d5-koerper", icon: "🙋", title: "Le corps",
    desc: "der Kopf, die Hand, das Auge…",
    learn: [{ t: "Mein Körper", h: big("Ich habe zwei Augen und eine Nase.") + "<small>Mir tut der Bauch weh = J'ai mal au ventre.</small>" }],
    words: "der Kopf|la tête|🙂\ndas Auge|l'œil|👁️\ndie Nase|le nez|👃\nder Mund|la bouche|👄\ndas Ohr|l'oreille|👂\ndie Hand|la main|✋\nder Arm|le bras|💪\ndas Bein|la jambe|🦵\n" +
      "der Fuss|le pied|🦶\nder Bauch|le ventre|😋\ndie Haare|les cheveux|💇\nder Zahn|la dent|🦷\nder Finger|le doigt|☝️\nder Rücken|le dos|🔙"
  }));

  add(C2, DE.vocab({
    id: "d5-essen", icon: "🍎", title: "Manger et boire",
    desc: "Les aliments et les boissons.",
    learn: [{ t: "Ich habe Hunger!", h: big("Ich habe Hunger. · Ich habe Durst.") + "J'ai faim. · J'ai soif.<br><br><b>Ich mag Schokolade.</b> = J'aime le chocolat." }],
    words: "der Apfel|la pomme|🍎\ndie Banane|la banane|🍌\ndas Brot|le pain|🍞\nder Käse|le fromage|🧀\ndie Milch|le lait|🥛\ndas Wasser|l'eau|💧\nder Kuchen|le gâteau|🍰\ndas Ei|l'œuf|🥚\n" +
      "die Schokolade|le chocolat|🍫\ndie Karotte|la carotte|🥕\ndie Pizza|la pizza|🍕\nder Saft|le jus|🍹\ndas Eis|la glace|🍦\ndie Tomate|la tomate|🍅\ndie Erdbeere|la fraise|🍓\ndie Birne|la poire|🍐"
  }));

  add(C2, DE.vocab({
    id: "d5-kalender", icon: "📅", title: "Les jours et les saisons",
    desc: "Montag, Dienstag… Frühling, Sommer…",
    learn: [{ t: "Die Woche", h: "Les jours sont tous masculins : <b>der</b> Montag.<br>« <b>am</b> Montag » = lundi (ce jour-là)." + big("Am Samstag spiele ich Fussball.") }],
    words: "der Montag|lundi|1️⃣\nder Dienstag|mardi|2️⃣\nder Mittwoch|mercredi|3️⃣\nder Donnerstag|jeudi|4️⃣\nder Freitag|vendredi|5️⃣\nder Samstag|samedi|6️⃣\nder Sonntag|dimanche|7️⃣\n" +
      "der Frühling|le printemps|🌷\nder Sommer|l'été|🌞\nder Herbst|l'automne|🍂\nder Winter|l'hiver|⛄\nheute|aujourd'hui|📍\nmorgen|demain|➡️\ngestern|hier|⬅️"
  }));

  /* ================= Les phrases ================= */
  var NOUNS = ["der Hund|🐶", "die Katze|🐱", "das Pferd|🐴", "der Apfel|🍎", "die Banane|🍌", "das Brot|🍞", "der Bleistift|✏️", "die Schere|✂️", "das Buch|📕",
    "der Vater|👨", "die Mutter|👩", "das Baby|👶", "der Kopf|🙂", "die Nase|👃", "das Auge|👁️", "der Käse|🧀", "die Milch|🥛", "das Ei|🥚", "der Tisch|🍽️", "die Schule|🏫", "das Heft|📓"];
  add(C3, {
    id: "d5-artikel", icon: "🔵", title: "der, die, das",
    desc: "Les trois articles et leurs couleurs.",
    learn: [
      { t: "Trois articles", h: "En allemand, il y a trois genres :" + big('<span class="der">der</span> · <span class="die">die</span> · <span class="das">das</span>') + "<b>der</b> = masculin (bleu)<br><b>die</b> = féminin (rouge)<br><b>das</b> = neutre (vert) : ni masculin, ni féminin !" },
      { t: "Pas comme en français !", h: "Le genre change souvent d'une langue à l'autre :" + big('la lune → <span class="der">der</span> Mond · le soleil → <span class="die">die</span> Sonne') + "<small>Et même : la fille → <span class=\"das\">das</span> Mädchen !</small>" },
      { t: "Comment les retenir ?", h: "Apprends toujours le nom <b>avec</b> son article, comme un seul mot : « derhund », « diekatze ».<br><br>Au pluriel, c'est toujours <b>die</b> : die Hunde, die Katzen." }
    ],
    gen: function () {
      var n = pick(NOUNS).split("|"), a = DE.article(n[0]);
      return U.choice("Quel est le bon article ?" + big(DE.pic(n[1]) + ' <span class="blank">…</span> ' + DE.noun(n[0])), a, ["der", "die", "das"], { steps: ["On dit <b>" + DE.art(n[0]) + "</b>.", DE.ART_TIP] });
    }
  });

  var SEIN = [["sein", "être", "müde"], ["sein", "être", "in der Schule"], ["sein", "être", "glücklich"], ["sein", "être", "zehn Jahre alt"], ["sein", "être", "zu Hause"],
    ["haben", "avoir", "einen Hund"], ["haben", "avoir", "Hunger"], ["haben", "avoir", "Durst"], ["haben", "avoir", "eine Schwester"], ["haben", "avoir", "ein Velo"]];
  add(C3, {
    id: "d5-sein-haben", icon: "⭐", title: "sein et haben",
    desc: "Être et avoir : ich bin, ich habe…",
    learn: [
      { t: "Les pronoms", h: "ich = je · du = tu · er = il · sie = elle · es = il/elle (neutre)<br>wir = nous · ihr = vous (plusieurs amis) · sie = ils/elles<br><b>Sie</b> (majuscule) = vous de politesse" },
      { t: "sein (être)", h: '<div class="duo">' + DE.table("sein", "être") + "<div>Ich <b>bin</b> müde. = Je suis fatigué.<br>Wir <b>sind</b> Freunde.<br><br><small>« ich bin » ressemble à « I am » ? Non ! Rien à voir, à apprendre par cœur.</small></div></div>" },
      { t: "haben (avoir)", h: '<div class="duo">' + DE.table("haben", "avoir") + "<div>Ich <b>habe</b> einen Hund.<br>Er <b>hat</b> Hunger.<br><br><small>Attention : « J'ai dix ans » se dit « Ich <b>bin</b> zehn Jahre alt ».</small></div></div>" }
    ],
    gen: function () { return DE.verbQ(SEIN); }
  });

  var VERBS5 = [["spielen", "jouer", "Fussball"], ["wohnen", "habiter", "in Freiburg"], ["machen", "faire", "die Hausaufgaben"], ["lernen", "apprendre", "Deutsch"],
    ["kommen", "venir", "aus der Schweiz"], ["gehen", "aller", "in die Schule"], ["schwimmen", "nager", "im See"], ["malen", "peindre", "ein Bild"], ["singen", "chanter", "ein Lied"],
    ["trinken", "boire", "Wasser"], ["hören", "écouter", "Musik"], ["kochen", "cuisiner", "Spaghetti"]];
  add(C3, {
    id: "d5-verben", icon: "⚽", title: "Les verbes au présent",
    desc: "ich spiele, du spielst, er spielt…",
    learn: [
      { t: "Les terminaisons", h: "On enlève <b>-en</b> de l'infinitif (spiel<b>en</b>) et on ajoute :" + big("-e · -st · -t · -en · -t · -en") + "C'est la même chose pour presque tous les verbes !" },
      { t: "Exemple : spielen", h: '<div class="duo">' + DE.table("spielen", "jouer") + "<div>Ich spiel<b>e</b> Fussball.<br>Du spiel<b>st</b> Tennis.<br>Wir spiel<b>en</b> zusammen.<br><br><small>wir et sie : comme l'infinitif.</small></div></div>" },
      { t: "Mots utiles", h: "wohnen (habiter) · lernen (apprendre) · kommen (venir) · gehen (aller) · schwimmen (nager) · singen (chanter) · trinken (boire) · hören (écouter)" + big("Ich wohne in Freiburg.") }
    ],
    gen: function () { return DE.verbQ(VERBS5); }
  });

  var FRAGEN = DE.rows([
    "___ heisst du? – Ich heisse Lena.|Wie|Wo,Was,Wer|Wie = comment", "___ wohnst du? – In Freiburg.|Wo|Wie,Was,Wer|Wo = où",
    "___ ist das? – Das ist mein Bruder.|Wer|Wo,Wie,Was|Wer = qui (une personne)", "___ ist das? – Das ist ein Apfel.|Was|Wer,Wo,Wie|Was = quoi, qu'est-ce que (une chose)",
    "___ alt bist du? – Ich bin neun.|Wie|Wo,Was,Wer|Wie alt = quel âge", "___ geht's? – Gut, danke!|Wie|Was,Wo,Wer|Wie geht's = comment ça va",
    "___ machst du? – Ich spiele.|Was|Wer,Wo,Wie|Was = quoi", "___ ist die Katze? – Unter dem Tisch.|Wo|Wie,Was,Wer|Wo = où",
    "___ kommt? – Oma kommt!|Wer|Was,Wo,Wie|Wer = qui", "___ spielst du gern? – Fussball.|Was|Wer,Wo,Wie|Was = quoi"
  ].join("\n"));
  add(C3, {
    id: "d5-fragen", icon: "❓", title: "Poser des questions",
    desc: "Wer? Was? Wo? Wie?",
    learn: [
      { t: "Les mots pour questionner", h: "<b>Wer?</b> = Qui ?<br><b>Was?</b> = Quoi ? Qu'est-ce que ?<br><b>Wo?</b> = Où ?<br><b>Wie?</b> = Comment ?" + big("Wie heisst du? – Ich heisse Tom.") },
      { t: "Attention aux faux amis", h: "<b>Wer</b> ressemble à « where » en anglais, mais veut dire <b>qui</b> !<br><b>Wo</b> veut dire <b>où</b>.<br><br><b>Wie alt bist du?</b> = Quel âge as-tu ?" }
    ],
    gen: function () { return DE.fillQ(FRAGEN, "Quel mot interrogatif manque ?"); }
  });
})();
