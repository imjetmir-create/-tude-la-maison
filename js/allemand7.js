/* Allemand 7H : Plan d'études romand (L2 26, cycle 2, 7e-8e) — vocabulaire du quotidien et bases de la grammaire */
(function () {
  "use strict";
  var T = window.THEMES = window.THEMES || [];
  var R = U.R, pick = U.pick, shuffle = U.shuffle, big = U.big;
  function add(chapter, o) { o.grade = 7; o.subject = "allemand"; o.chapter = chapter; T.push(o); }
  var C1 = "Nombres et temps", C2 = "Mon quotidien", C3 = "Grammaire";

  /* ================= Nombres et temps ================= */
  add(C1, {
    id: "d7-zahlen", icon: "🔢", title: "Les nombres jusqu'à 1000 et les prix",
    desc: "Les grands nombres, le piège de l'inversion, les francs.",
    learn: [
      { t: "Rappel : à l'envers !", h: "De 21 à 99, on dit les <b>unités d'abord</b> :" + big("85 = fünf<b>und</b>achtzig") + "« cinq-et-huitante »… comme si on disait « cinq et quatre-vingts »." },
      { t: "Les centaines", h: "On dit les centaines, puis le reste (toujours à l'envers) :" + big("347 = dreihundert<b>sieben</b>und<b>vierzig</b>") + "100 hundert · 200 zweihundert · 1000 tausend<br><small>Tout s'écrit en un seul mot !</small>" },
      { t: "Les prix", h: "En Suisse, on paie en <b>Franken</b> (francs) et <b>Rappen</b> (centimes) :" + big("Das kostet 4 Franken 50.") + "« vier Franken fünfzig » = 4 fr. 50<br><b>Wie viel kostet das?</b> = Combien ça coûte ?" }
    ],
    gen: function (d) {
      if (d === 3 && R(0, 1)) {
        var f = R(1, 20), r = pick([0, 10, 20, 50, 80, 90, 40]), txt = "Das kostet " + DE.zahl(f) + " Franken" + (r ? " " + DE.zahl(r) : "") + ".";
        return U.num("Combien ça coûte ? (en francs)" + big(txt), f + r / 100, { unit: "fr.", steps: ["« " + DE.zahl(f) + " Franken » = " + f + " francs.", r ? "« " + DE.zahl(r) + " » = " + r + " centimes." : "Pas de centimes.", "Prix : <b>" + U.fmt(f + r / 100) + " fr.</b>"] });
      }
      return d === 1 ? DE.zahlQ(13, 99, 2) : DE.zahlQ(100, 999, d);
    }
  });

  add(C1, {
    id: "d7-uhrzeit", icon: "⏰", title: "L'heure",
    desc: "Wie spät ist es? Viertel nach, halb, Viertel vor…",
    learn: [
      { t: "Wie spät ist es?", h: "Quelle heure est-il ? → <b>Es ist …</b>" + '<div class="duo">' + DE.clock(3, 0) + "<div>Es ist drei <b>Uhr</b>.<br>(3 h 00)</div></div>" },
      { t: "Et quart, moins le quart", h: '<div class="duo">' + DE.clock(3, 15) + "<div><b>Viertel nach</b> drei<br>= 3 h 15<br><br><b>Viertel vor</b> vier<br>= 3 h 45</div></div>" },
      { t: "Le piège de « halb »", h: '<div class="duo">' + DE.clock(3, 30) + "<div>3 h 30 = <b>halb vier</b> !<br><br>« halb vier » = la moitié <b>avant</b> quatre heures.<br>On regarde l'heure qui <b>vient</b>.</div></div>" },
      { t: "Les minutes", h: "<b>nach</b> = après · <b>vor</b> = avant" + big("fünf nach zwei = 2 h 05") + "zehn nach zwei = 2 h 10 · zwanzig nach zwei = 2 h 20<br>zehn vor drei = 2 h 50 · fünf vor drei = 2 h 55" }
    ],
    gen: function (d) { return DE.uhrQ(d); }
  });

  add(C1, DE.vocab({
    id: "d7-kalender", icon: "📅", title: "Les mois et l'anniversaire",
    desc: "Januar, Februar… Wann hast du Geburtstag?",
    learn: [{ t: "Wann hast du Geburtstag?", h: "Quand est ton anniversaire ?" + big("Ich habe <b>im</b> Mai Geburtstag.") + "On dit « <b>im</b> » devant un mois ou une saison : im Juli, im Winter.<br>Mais « <b>am</b> » devant un jour : am Montag." }],
    words: "der Januar|janvier|❄️\nder Februar|février|🎭\nder März|mars|🌱\nder April|avril|🌦️\nder Mai|mai|🌷\nder Juni|juin|🍓\nder Juli|juillet|🏖️\nder August|août|🎆\n" +
      "der September|septembre|🍇\nder Oktober|octobre|🎃\nder November|novembre|🍂\nder Dezember|décembre|🎄\nder Geburtstag|l'anniversaire|🎂\ndas Jahr|l'année|📆\nder Monat|le mois|🗓️\ndie Woche|la semaine|7️⃣"
  }));

  add(C1, DE.vocab({
    id: "d7-wetter", icon: "🌦️", title: "La météo",
    desc: "Es regnet, die Sonne scheint…",
    learn: [{ t: "Wie ist das Wetter?", h: "Quel temps fait-il ?" + big("Es regnet. · Es schneit.") + "Comme en français « il pleut », on utilise <b>es</b> (il) : es ist kalt = il fait froid." }],
    words: "Die Sonne scheint.|Le soleil brille.|☀️\nEs regnet.|Il pleut.|🌧️\nEs schneit.|Il neige.|🌨️\nEs ist windig.|Il y a du vent.|💨\nEs ist bewölkt.|C'est nuageux.|☁️\nEs gibt ein Gewitter.|Il y a un orage.|⛈️\n" +
      "Es ist heiss.|Il fait très chaud.|🔥\nEs ist kalt.|Il fait froid.|❄️\nEs ist warm.|Il fait chaud.|🌡️\nEs ist neblig.|Il y a du brouillard.|🌫️\nder Regenschirm|le parapluie|☂️\nder Regenbogen|l'arc-en-ciel|🌈"
  }));

  /* ================= Mon quotidien ================= */
  add(C2, DE.vocab({
    id: "d7-freizeit", icon: "⚽", title: "Les loisirs",
    desc: "Was machst du gern? Ich spiele gern Fussball.",
    learn: [{ t: "Was machst du gern?", h: "Qu'est-ce que tu aimes faire ?" + big("Ich spiele <b>gern</b> Fussball.") + "« <b>gern</b> » après le verbe = j'aime faire ça.<br>« <b>nicht gern</b> » = je n'aime pas : Ich koche nicht gern." }],
    words: "Fussball spielen|jouer au foot|⚽\nlesen|lire|📚\nschwimmen|nager|🏊\nVelo fahren|faire du vélo|🚲\nreiten|faire du cheval|🏇\ntanzen|danser|💃\nGitarre spielen|jouer de la guitare|🎸\nKlavier spielen|jouer du piano|🎹\n" +
      "malen|peindre|🎨\nSki fahren|faire du ski|⛷️\nMusik hören|écouter de la musique|🎧\nfernsehen|regarder la télé|📺\nkochen|cuisiner|🍳\nsingen|chanter|🎤\nGames spielen|jouer aux jeux vidéo|🎮\nFreunde treffen|voir des amis|👫"
  }));

  add(C2, DE.vocab({
    id: "d7-haus", icon: "🏠", title: "La maison",
    desc: "Les pièces et les meubles.",
    learn: [{ t: "Mein Zuhause", h: big("Mein Zimmer ist klein, aber schön.") + "Beaucoup de pièces finissent par <b>-zimmer</b> (pièce) : Schlafzimmer, Wohnzimmer, Badezimmer… Elles sont toutes <b>das</b> !" }],
    words: "das Haus|la maison|🏠\ndie Wohnung|l'appartement|🏢\ndie Küche|la cuisine|🍳\ndas Badezimmer|la salle de bain|🛁\ndas Schlafzimmer|la chambre à coucher|🛏️\ndas Wohnzimmer|le salon|🛋️\ndas Kinderzimmer|la chambre d'enfant|🧸\nder Garten|le jardin|🌳\n" +
      "das Bett|le lit|😴\nder Tisch|la table|🍽️\nder Stuhl|la chaise|💺\nder Schrank|l'armoire|🚪\ndie Lampe|la lampe|💡\ndas Fenster|la fenêtre|🖼️\ndie Treppe|l'escalier|📶\ndie Toilette|les toilettes|🚽"
  }));

  add(C2, DE.vocab({
    id: "d7-kleidung", icon: "👕", title: "Les vêtements",
    desc: "Was ziehst du an?",
    learn: [{ t: "Was ziehst du an?", h: "Qu'est-ce que tu mets ?" + big("Ich trage eine Jacke und eine Mütze.") + "<b>tragen</b> = porter · <b>anziehen</b> = mettre (un habit)" }],
    words: "die Hose|le pantalon|👖\ndas T-Shirt|le t-shirt|👕\nder Pullover|le pull|🧶\ndie Jacke|la veste|🧥\ndas Kleid|la robe|👗\nder Rock|la jupe|💃\ndie Schuhe|les chaussures|👟\ndie Socken|les chaussettes|🧦\n" +
      "die Mütze|le bonnet|🧢\nder Schal|l'écharpe|🧣\ndie Handschuhe|les gants|🧤\nder Hut|le chapeau|🎩\ndie Brille|les lunettes|👓\nder Rucksack|le sac à dos|🎒\ndas Hemd|la chemise|👔\ndie Stiefel|les bottes|👢"
  }));

  add(C2, DE.vocab({
    id: "d7-stadt", icon: "🏙️", title: "En ville",
    desc: "Les lieux et le chemin : links, rechts, geradeaus.",
    learn: [{ t: "Wo ist der Bahnhof?", h: "Où est la gare ?" + big("Geh geradeaus und dann links!") + "<b>links</b> = à gauche · <b>rechts</b> = à droite · <b>geradeaus</b> = tout droit" }],
    words: "der Bahnhof|la gare|🚉\ndie Schule|l'école|🏫\ndas Kino|le cinéma|🎬\ndie Post|la poste|🏤\ndas Spital|l'hôpital|🏥\ndie Bäckerei|la boulangerie|🥖\nder Supermarkt|le supermarché|🛒\ndie Bibliothek|la bibliothèque|📚\n" +
      "das Schwimmbad|la piscine|🏊\nder Park|le parc|🌳\ndie Kirche|l'église|⛪\ndas Restaurant|le restaurant|🍽️\ndie Strasse|la rue|🛣️\nlinks|à gauche|⬅️\nrechts|à droite|➡️\ngeradeaus|tout droit|⬆️"
  }));

  add(C2, DE.vocab({
    id: "d7-essen", icon: "🛒", title: "Les repas et les courses",
    desc: "Ich möchte… Das Frühstück, das Mittagessen…",
    learn: [{ t: "Ich möchte…", h: "Pour demander poliment :" + big("Ich möchte ein Brötchen, bitte.") + "Je voudrais un petit pain, s'il vous plaît.<br><small>Les repas : das Frühstück (matin), das Mittagessen (midi), das Abendessen (soir).</small>" }],
    words: "das Frühstück|le petit-déjeuner|🥣\ndas Mittagessen|le dîner (à midi)|🍽️\ndas Abendessen|le souper|🌙\ndas Gemüse|les légumes|🥦\ndas Obst|les fruits|🍇\ndas Fleisch|la viande|🥩\nder Reis|le riz|🍚\ndie Nudeln|les pâtes|🍝\n" +
      "die Kartoffel|la pomme de terre|🥔\ndie Suppe|la soupe|🍲\nder Salat|la salade|🥗\ndas Brötchen|le petit pain|🥐\nder Zucker|le sucre|🍬\nder Tee|le thé|🍵\nder Kaffee|le café|☕\ndie Wurst|la saucisse|🌭"
  }));

  /* ================= Grammaire ================= */
  var REG = [["spielen", "jouer", "Tennis"], ["wohnen", "habiter", "in Bern"], ["lernen", "apprendre", "Englisch"], ["kaufen", "acheter", "Brot"], ["besuchen", "rendre visite à", "die Oma"],
    ["arbeiten", "travailler", "im Garten"], ["finden", "trouver", "den Schlüssel"], ["tanzen", "danser", "gern"], ["heissen", "s'appeler", "Müller"], ["reisen", "voyager", "nach Italien"], ["kochen", "cuisiner", "Reis"]];
  add(C3, {
    id: "d7-praesens", icon: "🎯", title: "Le présent : les verbes réguliers",
    desc: "Les terminaisons et les cas particuliers (arbeiten, tanzen…).",
    learn: [
      { t: "Les terminaisons", h: big("-e · -st · -t · -en · -t · -en") + '<div class="duo">' + DE.table("kaufen", "acheter") + "<div>Le <b>verbe</b> se trouve en général en <b>2e position</b> :<br>Ich kauf<b>e</b> Brot.<br>Heute kauf<b>e</b> ich Brot.</div></div>" },
      { t: "Radical en -t ou -d", h: "On ajoute un <b>e</b> pour pouvoir prononcer :" + '<div class="duo">' + DE.table("arbeiten", "travailler") + "<div>du arbeit<b>e</b>st<br>er arbeit<b>e</b>t<br>ihr arbeit<b>e</b>t<br><br>Pareil : finden → du findest</div></div>" },
      { t: "Radical en -s, -ss, -z", h: "À « du », on ajoute seulement <b>-t</b> :" + big("du tanzt · du heisst · du reist") }
    ],
    gen: function () { return DE.verbQ(REG); }
  });

  var STR = [["fahren", "aller (en véhicule)", "mit dem Velo"], ["schlafen", "dormir", "lange"], ["laufen", "courir", "schnell"], ["tragen", "porter", "eine Jacke"],
    ["essen", "manger", "einen Apfel"], ["lesen", "lire", "ein Buch"], ["sehen", "voir", "einen Film"], ["sprechen", "parler", "Deutsch"], ["nehmen", "prendre", "den Bus"],
    ["geben", "donner", "ein Geschenk"], ["helfen", "aider", "Mama"]];
  add(C3, {
    id: "d7-starke", icon: "💪", title: "Les verbes qui changent : fahren, essen, lesen…",
    desc: "a → ä et e → i à « du » et « er ».",
    learn: [
      { t: "Des verbes qui changent de voyelle", h: "Certains verbes changent de voyelle, mais <b>seulement</b> avec <b>du</b> et <b>er/sie/es</b> :" + '<div class="duo">' + DE.table("fahren", "aller") + DE.table("lesen", "lire") + "</div>" },
      { t: "a → ä", h: "fahren → du f<b>ä</b>hrst, er f<b>ä</b>hrt<br>schlafen → du schl<b>ä</b>fst<br>tragen → du tr<b>ä</b>gst<br>laufen → du l<b>äu</b>fst" },
      { t: "e → i ou ie", h: "essen → du <b>i</b>sst, er <b>i</b>sst<br>sprechen → du spr<b>i</b>chst<br>geben → du g<b>i</b>bst · helfen → du h<b>i</b>lfst<br>nehmen → du n<b>imm</b>st, er n<b>imm</b>t<br>lesen → du l<b>ie</b>st · sehen → du s<b>ie</b>hst" }
    ],
    gen: function () {
      return DE.verbQ(STR, function (inf, p) { return p === 1 || p === 2 ? "Attention : avec <b>du</b> et <b>er/sie/es</b>, la voyelle change !" : "Avec ce sujet, la voyelle <b>ne change pas</b>."; });
    }
  });

  var MOD = [["können", "pouvoir, savoir faire", "gut schwimmen"], ["wollen", "vouloir", "ein Eis essen"], ["müssen", "devoir", "die Hausaufgaben machen"],
    ["dürfen", "avoir le droit de", "heute fernsehen"], ["mögen", "aimer", "Schokolade"], ["möchten", "voudrais", "ein Brötchen"], ["können", "pouvoir", "Gitarre spielen"],
    ["müssen", "devoir", "früh aufstehen"], ["wollen", "vouloir", "nach Hause gehen"]];
  add(C3, {
    id: "d7-modal", icon: "🦸", title: "können, wollen, müssen…",
    desc: "Les verbes de modalité et l'infinitif à la fin.",
    learn: [
      { t: "Les verbes de modalité", h: "<b>können</b> = pouvoir / savoir faire · <b>wollen</b> = vouloir · <b>müssen</b> = devoir<br><b>dürfen</b> = avoir le droit · <b>mögen</b> = aimer · <b>möchten</b> = je voudrais" },
      { t: "Leur conjugaison", h: "Avec ich et er, pas de terminaison et souvent une autre voyelle :" + '<div class="duo">' + DE.table("können", "pouvoir") + DE.table("wollen", "vouloir") + "</div>" },
      { t: "L'infinitif à la fin !", h: "Le verbe de modalité est en 2e position, l'autre verbe va <b>à la fin</b> de la phrase, à l'infinitif :" + big("Ich <b>kann</b> gut <b>schwimmen</b>.") + "Wir <b>müssen</b> die Hausaufgaben <b>machen</b>." }
    ],
    gen: function () { return DE.verbQ(MOD, function (inf, p) { return p === 0 || p === 2 ? "Avec ich et er/sie/es, ces verbes n'ont <b>pas de terminaison</b>." : ""; }); }
  });

  var AKK = [["Hund", "m", "🐶"], ["Katze", "f", "🐱"], ["Pferd", "n", "🐴"], ["Apfel", "m", "🍎"], ["Banane", "f", "🍌"], ["Ei", "n", "🥚"], ["Buch", "n", "📕"], ["Bleistift", "m", "✏️"],
    ["Schultasche", "f", "🎒"], ["Velo", "n", "🚲"], ["Ball", "m", "⚽"], ["Jacke", "f", "🧥"], ["Kuchen", "m", "🍰"], ["Pizza", "f", "🍕"], ["Brötchen", "n", "🥐"], ["Rucksack", "m", "🎒"]];
  var AV = ["Ich habe", "Ich kaufe", "Ich möchte", "Ich sehe", "Ich brauche", "Wir haben", "Er sucht"];
  add(C3, {
    id: "d7-akkusativ", icon: "🎁", title: "einen, eine, ein (l'accusatif)",
    desc: "Le complément du verbe : der → den, ein → einen.",
    learn: [
      { t: "Le complément du verbe", h: "Après des verbes comme haben, kaufen, sehen, möchten, le nom est à l'<b>accusatif</b> :" + big("Ich habe <b>einen</b> Hund.") + "Seul le <b>masculin</b> change !" },
      { t: "Le tableau", h: '<table class="conj"><tr><th></th><th>masculin</th><th>féminin</th><th>neutre</th></tr><tr><td>sujet</td><td>der / ein</td><td>die / eine</td><td>das / ein</td></tr><tr><td>accusatif</td><td><b>den / einen</b></td><td>die / eine</td><td>das / ein</td></tr></table>' + big("Ich sehe den Hund, die Katze und das Pferd.") },
      { t: "kein = pas de", h: "<b>kein</b> se comporte comme <b>ein</b> :" + big("Ich habe <b>keinen</b> Hund, <b>keine</b> Katze und <b>kein</b> Pferd.") }
    ],
    gen: function (d) {
      var n = pick(AKK), v = pick(AV), g = n[1], kind = d === 1 ? "ein" : d === 2 ? pick(["ein", "kein"]) : pick(["kein", "der"]);
      var F = { ein: { m: "einen", f: "eine", n: "ein" }, kein: { m: "keinen", f: "keine", n: "kein" }, der: { m: "den", f: "die", n: "das" } }[kind];
      var good = F[g], opts = [F.m, F.f, F.n, kind === "der" ? "der" : kind === "ein" ? "einer" : "keiner"];
      var hint = kind === "kein" ? " <i>(pas de)</i>" : kind === "der" ? " <i>(le / la)</i>" : " <i>(un / une)</i>";
      return U.choice("Complète" + hint + " :" + big(DE.pic(n[2]) + " " + v + ' <span class="blank">…</span> ' + n[0] + "."), good, opts, {
        steps: ["« " + n[0] + " » est " + { m: "masculin (der " + n[0] + ")", f: "féminin (die " + n[0] + ")", n: "neutre (das " + n[0] + ")" }[g] + ".",
          g === "m" ? "Au masculin, après le verbe, l'article change : der → <b>den</b>, ein → <b>einen</b>, kein → <b>keinen</b>." : "Au féminin et au neutre, l'article <b>ne change pas</b>.",
          v + " <b>" + good + "</b> " + n[0] + "."]
      });
    }
  });

  var ORDER = DE.rows([
    "Heute spiele ich Fussball.|Heute ich spiele Fussball.,Ich heute spiele Fussball.", "Am Montag gehe ich ins Schwimmbad.|Am Montag ich gehe ins Schwimmbad.,Ich am Montag gehe ins Schwimmbad.",
    "Ich kann gut schwimmen.|Ich kann schwimmen gut.,Ich gut kann schwimmen.", "Morgen fahren wir nach Bern.|Morgen wir fahren nach Bern.,Morgen wir nach Bern fahren.",
    "Ich möchte ein Eis essen.|Ich möchte essen ein Eis.,Ich essen möchte ein Eis.", "Wo wohnst du?|Wo du wohnst?,Du wo wohnst?",
    "Spielst du gern Tennis?|Du gern spielst Tennis?,Spielst gern du Tennis?", "Nach der Schule mache ich meine Hausaufgaben.|Nach der Schule ich mache meine Hausaufgaben.,Nach der Schule mache meine Hausaufgaben ich.",
    "Wir müssen jetzt nach Hause gehen.|Wir müssen gehen jetzt nach Hause.,Wir jetzt müssen nach Hause gehen.", "Im Winter fahre ich Ski.|Im Winter ich fahre Ski.,Im Winter Ski ich fahre.",
    "Am Wochenende besuche ich meine Oma.|Am Wochenende ich besuche meine Oma.,Ich am Wochenende besuche meine Oma.", "Er will einen Hund haben.|Er will haben einen Hund.,Er einen Hund will haben.",
    "Was machst du heute?|Was du machst heute?,Was heute du machst?", "Dann essen wir Pizza.|Dann wir essen Pizza.,Dann Pizza wir essen."
  ].join("\n"));
  add(C3, {
    id: "d7-satz", icon: "🧩", title: "L'ordre des mots",
    desc: "Le verbe en 2e position, l'infinitif à la fin.",
    learn: [
      { t: "Le verbe en 2e position", h: "Dans une phrase allemande, le verbe conjugué est <b>toujours en 2e position</b> :" + big("Ich <b>spiele</b> heute Fussball.<br>Heute <b>spiele</b> ich Fussball.") + "Si la phrase commence par « Heute », le sujet passe <b>après</b> le verbe !" },
      { t: "Les questions", h: "Avec un mot interrogatif, le verbe vient juste après :" + big("Wo <b>wohnst</b> du?") + "Sans mot interrogatif, le verbe est en <b>1re</b> position :" + big("<b>Spielst</b> du Tennis?") },
      { t: "Deux verbes", h: "Avec können, müssen, wollen… le 2e verbe va <b>tout à la fin</b> :" + big("Ich <b>kann</b> gut <b>schwimmen</b>.") }
    ],
    gen: function () {
      var it = pick(ORDER);
      return U.choice("Quelle phrase est <b>correcte</b> ?", it[0], it[1].split(","), {
        steps: ["Le verbe conjugué est en <b>2e position</b> (ou en 1re dans une question sans mot interrogatif).", "S'il y a deux verbes, l'infinitif va à la <b>fin</b>.", "Réponse : <b>" + it[0] + "</b>"]
      });
    }
  });

  var FRAGEN = DE.rows([
    "___ wohnst du? – In Freiburg.|Wo|Wohin,Woher,Wie|Wo = où (on y est)", "___ kommst du? – Aus Italien.|Woher|Wo,Wohin,Wer|Woher = d'où",
    "___ gehst du? – Ins Kino.|Wohin|Wo,Woher,Wann|Wohin = où (on y va)", "___ beginnt die Schule? – Um acht Uhr.|Wann|Wie,Wo,Was|Wann = quand",
    "___ kostet das? – Fünf Franken.|Wie viel|Wann,Was,Wie|Wie viel = combien", "___ weinst du? – Weil ich müde bin.|Warum|Wann,Wie,Was|Warum = pourquoi",
    "___ ist das? – Das ist meine Lehrerin.|Wer|Was,Wo,Wie|Wer = qui", "___ machst du am Samstag? – Ich spiele Fussball.|Was|Wer,Wann,Wie|Was = quoi",
    "___ alt ist dein Bruder? – Vierzehn.|Wie|Was,Wann,Wo|Wie alt = quel âge", "___ hast du Geburtstag? – Im März.|Wann|Wo,Wie,Warum|Wann = quand",
    "___ Geschwister hast du? – Zwei.|Wie viele|Wann,Was,Warum|Wie viele = combien de", "___ fährst du in den Ferien? – Nach Spanien.|Wohin|Wo,Woher,Wann|Wohin = où (on y va)"
  ].join("\n"));
  add(C3, {
    id: "d7-fragen", icon: "❓", title: "Les mots interrogatifs",
    desc: "Wo, woher, wohin, wann, warum, wie viel…",
    learn: [
      { t: "Les W-Fragen", h: "Presque tous les mots interrogatifs commencent par <b>W</b> :<br>wer = qui · was = quoi · wann = quand · warum = pourquoi<br>wie = comment · wie alt = quel âge · wie viel = combien" },
      { t: "Wo, woher, wohin", h: "<b>Wo</b> wohnst du? = Où habites-tu ? (on y est)<br><b>Woher</b> kommst du? = D'où viens-tu ?<br><b>Wohin</b> gehst du? = Où vas-tu ? (direction)" }
    ],
    gen: function () { return DE.fillQ(FRAGEN, "Quel mot interrogatif manque ?"); }
  });
})();
