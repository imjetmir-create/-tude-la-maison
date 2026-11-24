/* Français 7H : thèmes alignés sur le Plan d'études romand (L1 26, cycle 2, 7e-8e) */
(function () {
  "use strict";
  var T = window.THEMES = window.THEMES || [];
  var R = U.R, pick = U.pick, shuffle = U.shuffle, big = U.big, tab = FR.table;
  function add(chapter, o) { o.grade = 7; o.subject = "francais"; o.chapter = chapter; T.push(o); }
  var C1 = "Conjugaison", C2 = "Grammaire", C3 = "Orthographe", C4 = "Vocabulaire";
  var T5 = ["présent", "imparfait", "futur", "passé composé", "conditionnel présent"];
  var V7 = ["manger", "commencer", "mettre", "pouvoir", "oublier", "prendre", "sortir", "courir", "voir", "venir", "employer", "payer", "acheter", "peler"];
  var BASE = ["être", "avoir", "aller", "chanter", "finir", "dire", "faire", "entendre", "savoir", "vouloir"];
  var ALL = V7.concat(BASE);
  function side(a, b) { return '<div class="duo">' + a + b + "</div>"; }

  /* ================= Conjugaison ================= */
  add(C1, {
    id: "f7-present", icon: "🎯", title: "Le présent : les verbes difficiles",
    desc: "manger, commencer, acheter, employer, prendre, venir…",
    learn: [
      { t: "Rappel des terminaisons", h: "Verbes en <b>-er</b> : -e, -es, -e, -ons, -ez, -ent.<br>Les autres : souvent -s, -s, -t, -ons, -ez, -ent.<br><br><small>pouvoir et vouloir : je peu<b>x</b>, tu peu<b>x</b>.</small>" },
      { t: "manger et commencer", h: side(tab("manger", "présent"), tab("commencer", "présent")) + "On garde le son : nous mang<b>e</b>ons, nous commen<b>ç</b>ons." },
      { t: "acheter, peler, employer, payer", h: side(tab("acheter", "présent"), tab("employer", "présent")) + "<small>j'ach<b>è</b>te, je p<b>è</b>le · le y devient i devant un e muet : j'emplo<b>i</b>e, je pa<b>i</b>e.</small>" },
      { t: "prendre, venir, voir, mettre", h: side(tab("prendre", "présent"), tab("venir", "présent")) + "<small>ils pre<b>nn</b>ent, ils vie<b>nn</b>ent · je vois, nous vo<b>y</b>ons · je me<b>t</b>s, il me<b>t</b>.</small>" }
    ],
    gen: function () { return FR.conjQ(V7, "présent", T5); }
  });

  add(C1, {
    id: "f7-imparfait-futur", icon: "🕰️", title: "L'imparfait et le futur",
    desc: "Deux temps à ne pas confondre.",
    learn: [
      { t: "L'imparfait", h: "Terminaisons pour tous les verbes :" + big("-ais · -ais · -ait · -ions · -iez · -aient") + side(tab("manger", "imparfait"), tab("voir", "imparfait")) + "<small>nous voy<b>i</b>ons : on garde le y + i.</small>" },
      { t: "Le futur", h: "Terminaisons :" + big("-ai · -as · -a · -ons · -ez · -ont") + side(tab("venir", "futur"), tab("acheter", "futur")) },
      { t: "Les futurs irréguliers", h: "voir → je <b>verr</b>ai · courir → je <b>courr</b>ai · pouvoir → je <b>pourr</b>ai<br>venir → je <b>viendr</b>ai · aller → j'<b>ir</b>ai · faire → je <b>fer</b>ai<br>employer → j'<b>emploier</b>ai · payer → je <b>paier</b>ai" }
    ],
    gen: function (d) { return FR.conjQ(ALL, d === 2 || (d === 3 && R(0, 1)) ? "futur" : "imparfait", T5); }
  });

  add(C1, {
    id: "f7-passe-compose", icon: "📸", title: "Le passé composé",
    desc: "Avec avoir ou être, et l'accord avec être.",
    learn: [
      { t: "Auxiliaire + participe passé", h: big("j'<u>ai</u> <u>pris</u> · elle <u>est</u> <u>venue</u>") + "L'auxiliaire <b>avoir</b> ou <b>être</b> au présent + le <b>participe passé</b>." },
      { t: "Les participes à connaître", h: "mangé, commencé, oublié, acheté · fini, sorti · couru, vu, venu, pu, voulu, su, entendu · pris, mis · fait, dit · été, eu" },
      { t: "Avec être, on accorde", h: side(tab("venir", "passé composé", "f"), "<div>Avec <b>être</b>, le participe s'accorde avec le sujet :<br>elle est venu<b>e</b><br>ils sont venu<b>s</b><br>elles sont venu<b>es</b><br><br><small>Verbes avec être : aller, venir, sortir, arriver, tomber, rester…</small></div>") }
    ],
    gen: function () { return FR.conjQ(["manger", "prendre", "mettre", "voir", "courir", "oublier", "acheter", "faire", "venir", "sortir", "aller", "arriver", "tomber", "rester"], "passé composé", T5); }
  });

  add(C1, {
    id: "f7-conditionnel", icon: "🌈", title: "Le conditionnel présent",
    desc: "Exprimer un souhait, une demande polie ou une condition.",
    learn: [
      { t: "À quoi sert-il ?", h: "Le <b>conditionnel</b> exprime :<br>• un <b>souhait</b> : J'<b>aimerais</b> voyager.<br>• une <b>demande polie</b> : <b>Pourrais</b>-tu m'aider ?<br>• une <b>condition</b> : Si j'avais le temps, je <b>viendrais</b>." },
      { t: "Comment le former ?", h: "Radical du <b>futur</b> + terminaisons de l'<b>imparfait</b> :" + big("je chante<b>r</b> + <b>ais</b> = je chanterais") + side(tab("chanter", "conditionnel présent"), tab("pouvoir", "conditionnel présent")) },
      { t: "Futur ou conditionnel ?", h: "je chanterai (futur) · je chanterais (conditionnel)<br><br>Astuce : je remplace par « nous ».<br>nous chanterons → futur → <b>-ai</b><br>nous chanterions → conditionnel → <b>-ais</b>" }
    ],
    gen: function (d) { return d === 3 && R(0, 1) ? FR.tempsQ(ALL, ["futur", "conditionnel présent", "imparfait"], 2) : FR.conjQ(ALL, "conditionnel présent", T5); }
  });

  add(C1, {
    id: "f7-imperatif", icon: "📢", title: "L'impératif",
    desc: "Donner un ordre ou un conseil.",
    learn: [
      { t: "Un temps sans sujet", h: "L'<b>impératif</b> sert à donner un ordre, un conseil ou une consigne. Il n'a <b>pas de sujet</b> et seulement <b>3 personnes</b> :" + big("Mange ! · Mangeons ! · Mangez !") },
      { t: "Comment le former ?", h: "On part du présent, sans le pronom :<br>tu prends → <b>prends !</b> · nous prenons → <b>prenons !</b> · vous prenez → <b>prenez !</b><br><br>Verbes en -er : <b>pas de s</b> à la 1re forme : tu manges → <b>mange !</b>" + side(FR.tableImp("manger"), FR.tableImp("venir")) },
      { t: "Les irréguliers", h: side(FR.tableImp("être"), FR.tableImp("avoir")) + "<small>aller → <b>va !</b> (sans s) · faire → faites ! · dire → dites !</small>" }
    ],
    gen: function () { return FR.imperatifQ(ALL.filter(function (v) { return v !== "avoir" && v !== "entendre"; })); }
  });

  add(C1, {
    id: "f7-temps", icon: "⏳", title: "Reconnaître les temps",
    desc: "Présent, imparfait, futur, passé composé ou conditionnel ?",
    learn: [
      { t: "Les indices", h: "Présent : je prends<br>Imparfait : -ais, -ait, -aient → je pren<b>ais</b><br>Futur : -rai, -ra, -ront → je prend<b>rai</b><br>Conditionnel : -rais, -rait → je prend<b>rais</b><br>Passé composé : 2 mots → j'<b>ai pris</b>" },
      { t: "Futur ou conditionnel ?", h: "La différence est dans le « s » : je viend<b>rai</b> (futur) / je viend<b>rais</b> (conditionnel).<br><br>Avec il : il viendr<b>a</b> (futur) / il viendr<b>ait</b> (conditionnel)." }
    ],
    gen: function (d) { return FR.tempsQ(ALL, T5, d); }
  });

  /* ================= Grammaire ================= */
  var CLS = [
    "Le:D chien:N court:V très:ADV vite:ADV .", "Elle:P chante:V toujours:ADV juste .", "Ce:D vieux:A château:N domine:V la:D vallée:N .",
    "Ils:P la:P regardent:V attentivement:ADV .", "Mes:D parents:N partent:V demain:ADV en Italie:NP .", "Le:D renard:N rusé:A guette:V les:D poules:N .",
    "Nous:P lui:P offrons:V un:D cadeau:N .", "Cette:D histoire:N semble:V vraiment:ADV incroyable:A .", "Vous:P marchez:V lentement:ADV .",
    "Quelques:D élèves:N travaillent:V calmement:ADV .", "Sarah:NP le:P pose:V ici:ADV .", "Ton:D frère:N parle:V trop:ADV fort .",
    "Hier:ADV , Lucas:NP a pris une:D énorme:A glace:N .", "Les:D Alpes:NP sont:V magnifiques:A ."
  ];
  add(C2, {
    id: "f7-classes", icon: "🏷️", title: "Les classes de mots",
    desc: "Nom, déterminant, adjectif, verbe, pronom, adverbe.",
    learn: [
      { t: "Les classes variables", h: "Ces mots changent de forme (genre, nombre, temps) :<br><b>nom</b> (chien, Lucas) · <b>déterminant</b> (le, ces, quelques) · <b>adjectif</b> (rusé, vieux) · <b>verbe</b> (court, partent) · <b>pronom</b> (il, la, lui, nous)" },
      { t: "Le pronom", h: "Le <b>pronom</b> remplace un nom ou un GN :" + big("Ils regardent <u>la lune</u>. → Ils <b>la</b> regardent.") + "Ne confonds pas : « la lune » (la = déterminant, devant un nom) et « ils la regardent » (la = pronom, devant un verbe)." },
      { t: "L'adverbe", h: "L'<b>adverbe</b> est <b>invariable</b> : il ne change jamais. Il précise un verbe, un adjectif ou un autre adverbe :" + big("Il court <b>très vite</b>.") + "Souvent : très, trop, vite, bien, hier, demain, ici, toujours, et les mots en <b>-ment</b> (lentement)." }
    ],
    gen: function (d) { return FR.classQ(CLS, [["N", "V", "A", "D"], ["P", "NP", "A", "ADV"], ["ADV", "P", "D", "V"]], ["D", "N", "NP", "V", "A", "P", "ADV"], d); }
  });

  var FCT = [
    "[S:Le facteur] apporte [CV:une lettre] [CP:chaque matin].", "[CP:Hier soir], [S:mes cousins] ont regardé [CV:un film].",
    "[S:Ce gâteau] semble [ATT:délicieux].", "[S:Mes parents] sont [ATT:fatigués] [CP:ce soir].", "[S:Les élèves] parlent [CV:à leur maîtresse].",
    "[S:Ma tante] est devenue [ATT:infirmière].", "[S:Julien] pense [CV:à ses vacances] [CP:depuis une semaine].",
    "[CP:Dans le jardin], [S:le chat] attrape [CV:une souris].", "[S:Les montagnes] paraissent [ATT:immenses] [CP:depuis le village].",
    "[S:Ton frère] range [CV:sa chambre] [CP:le samedi].", "[CP:Pour gagner le match], [S:l'équipe] travaille [CV:sa défense].",
    "[S:Cette chanson] est [ATT:magnifique]."
  ];
  add(C2, {
    id: "f7-fonctions", icon: "🧱", title: "Les fonctions dans la phrase",
    desc: "Sujet, complément du verbe, complément de phrase, attribut.",
    learn: [
      { t: "Sujet et complément de phrase", h: "Le <b>sujet</b> : « Qui est-ce qui … ? » → [Le facteur] apporte une lettre.<br><br>Le <b>complément de phrase</b> peut être <b>déplacé</b> et <b>supprimé</b> :<br>[Chaque matin], le facteur apporte une lettre." },
      { t: "Le complément du verbe", h: "Le <b>complément du verbe</b> fait partie du groupe verbal. On ne peut <b>ni le déplacer ni le supprimer</b> :" + big("Le facteur apporte <b>une lettre</b>.") + "<small>« Le facteur apporte. » → il manque quelque chose !</small>" },
      { t: "L'attribut du sujet", h: "Après les verbes <b>être, sembler, paraître, devenir, rester</b>, le mot qui dit <b>comment est le sujet</b> est l'<b>attribut</b> :" + big("Ce gâteau semble <b>délicieux</b>.") + "Il s'accorde avec le sujet : Mes parents sont fatigu<b>és</b>." }
    ],
    gen: function (d) { return FR.funcQ(FCT, [["S", "CP"], ["S", "CV", "CP"], ["CV", "ATT", "CP", "S"]], ["S", "CV", "CP", "ATT"], d); }
  });

  var REL = FR.lines([
    "1|Le chien ___ aboie est à mon voisin.|qui", "1|Le livre ___ je lis est passionnant.|que", "1|La fille ___ chante s'appelle Zoé.|qui",
    "1|Le gâteau ___ tu as fait est délicieux.|que", "1|L'élève ___ a gagné reçoit une médaille.|qui", "1|Les chansons ___ elle préfère sont anciennes.|que",
    "2|C'est le film ___ je t'ai parlé.|dont", "2|La maison ___ je rêve a un grand jardin.|dont", "2|Le garçon ___ le père est pilote habite ici.|dont",
    "2|La ville ___ j'habite est petite.|où", "2|Les fleurs ___ tu as cueillies sont belles.|que",
    "3|Voici le stylo ___ j'ai besoin.|dont", "3|Le village ___ je suis né est au bord du lac.|où", "3|C'est un jeu ___ tout le monde connaît.|que",
    "3|Le jour ___ il est arrivé, il pleuvait.|où", "3|J'ai un ami ___ adore les dinosaures.|qui", "3|L'histoire ___ tu te souviens est vraie.|dont"
  ].join("\n"));
  var RREL = {
    qui: "<b>qui</b> est le <b>sujet</b> du verbe qui suit (c'est lui qui fait l'action).",
    que: "<b>que</b> est suivi d'un sujet (je, tu, elle…) : il est <b>complément</b> du verbe.",
    dont: "<b>dont</b> remplace un complément construit avec « <b>de</b> » (parler de, rêver de, avoir besoin de, se souvenir de…).",
    "où": "<b>où</b> indique un <b>lieu</b> ou un <b>moment</b>."
  };
  add(C2, {
    id: "f7-relatifs", icon: "🪢", title: "Qui, que, dont, où",
    desc: "Les pronoms relatifs pour relier deux phrases.",
    learn: [
      { t: "Relier deux phrases", h: "Le pronom relatif évite de répéter un nom :" + big("J'ai un chien. Le chien aboie. → J'ai un chien <b>qui</b> aboie.") + "La partie « qui aboie » s'appelle une <b>proposition relative</b> : elle complète le nom." },
      { t: "qui ou que ?", h: "<b>qui</b> est <b>sujet</b> : le chien <b>qui</b> aboie (c'est le chien qui aboie).<br><br><b>que</b> est suivi d'un autre sujet : le livre <b>que je</b> lis." },
      { t: "dont et où", h: "<b>dont</b> remplace « de … » : je parle <b>de</b> ce film → le film <b>dont</b> je parle.<br><br><b>où</b> indique un lieu ou un moment : la ville <b>où</b> j'habite, le jour <b>où</b> il est venu." }
    ],
    gen: function (d) {
      var it = FR.lv(REL, d), s = it.f[0], good = it.f[1];
      return U.choice("Complète avec le bon pronom relatif :" + big(FR.blank(s)), good, ["qui", "que", "dont", "où"], { steps: [RREL[good], "La phrase : " + FR.fill(s, good)] });
    }
  });

  var PH = FR.rows([
    "Le soleil brille sur le lac.|D|P", "Est-ce que tu viens avec nous ?|I|P", "Quelle belle journée !|E|P", "Range ta chambre.|M|P",
    "Ne cours pas dans le couloir !|M|N", "Comme tu as grandi !|E|P", "Pourquoi n'es-tu pas venu ?|I|N", "Je n'ai jamais vu la mer.|D|N",
    "Ferme la porte, s'il te plaît.|M|P", "N'oublie pas ton sac.|M|N", "Que c'est beau !|E|P", "Il ne pleut plus.|D|N",
    "As-tu fini tes devoirs ?|I|P", "Ce n'est pas possible !|E|N", "Mes amis arrivent demain.|D|P", "Prenez vos cahiers.|M|P"
  ].join("\n"));
  var NEG = FR.rows([
    "Il aime le chocolat.|Il n'aime pas le chocolat.|Il aime pas le chocolat.|Il ne aime pas le chocolat.",
    "Nous partons ce soir.|Nous ne partons pas ce soir.|Nous partons ne pas ce soir.|Ne nous partons pas ce soir.",
    "Tu as déjà vu ce film.|Tu n'as jamais vu ce film.|Tu as jamais vu ce film.|Tu n'as vu jamais ce film.",
    "Elle mange encore de la viande.|Elle ne mange plus de viande.|Elle mange plus de viande.|Elle ne plus mange de viande.",
    "J'ai vu quelque chose.|Je n'ai rien vu.|J'ai rien vu.|Je n'ai vu rien.",
    "Vous avez faim.|Vous n'avez pas faim.|Vous ne avez pas faim.|Vous avez pas faim."
  ].join("\n"));
  add(C2, {
    id: "f7-phrases", icon: "❓", title: "Types et formes de phrases",
    desc: "Déclarative, interrogative, exclamative, impérative ; positive ou négative.",
    learn: [
      { t: "Quatre types de phrases", h: "<b>Déclarative</b> : donne une information. (.)<br><b>Interrogative</b> : pose une question. (?)<br><b>Exclamative</b> : exprime une émotion. (!)<br><b>Impérative</b> : donne un ordre ; verbe à l'impératif, sans sujet. (. ou !)" },
      { t: "Exclamative ou impérative ?", h: "Les deux peuvent finir par « ! » :" + big("Quelle belle journée ! · Ferme la porte !") + "S'il y a un <b>ordre</b> (verbe à l'impératif), la phrase est <b>impérative</b>. Sinon, c'est une émotion : <b>exclamative</b>." },
      { t: "La forme négative", h: "Elle utilise deux mots autour du verbe : <b>ne … pas</b>, <b>ne … jamais</b>, <b>ne … plus</b>, <b>ne … rien</b>." + big("Je <b>n'</b>ai <b>rien</b> vu.") + "Au passé composé, la négation entoure l'<b>auxiliaire</b>." }
    ],
    gen: function (d) { return d === 1 ? FR.typeQ(PH, ["D", "I", "E", "M"]) : d === 2 ? (R(0, 1) ? FR.formQ(PH, ["D", "I", "E", "M"]) : FR.typeQ(PH, ["D", "I", "E", "M"])) : FR.negQ(NEG); }
  });

  /* ================= Orthographe ================= */
  var HRULES = {
    "a": "On peut dire « avait » → verbe avoir : <b>a</b>.", "à": "On ne peut pas dire « avait » → <b>à</b>.",
    "on": "On peut dire « il » → <b>on</b>.", "ont": "On peut dire « avaient » → verbe avoir : <b>ont</b>.",
    "son": "On peut dire « mon » → <b>son</b>.", "sont": "On peut dire « étaient » → verbe être : <b>sont</b>.",
    "se": "Devant un verbe, on peut dire « je <b>me</b> … » → <b>se</b>.", "ce": "Devant un nom, on peut dire « ce …-là » → <b>ce</b>.",
    "leur": "Devant un verbe (= « à eux »), ou devant un nom au singulier → <b>leur</b>, sans s.",
    "leurs": "Devant un nom au pluriel → <b>leurs</b>, avec un s.",
    "quel": "Devant un nom masculin (livre) → <b>quel</b>.", "quelle": "Devant un nom féminin (heure, journée) → <b>quelle</b>.",
    "qu'elle": "On peut dire « qu'il » à la place → <b>qu'elle</b> (que + elle).",
    "c'est": "On peut dire « cela est » → <b>c'est</b>.", "s'est": "Devant un participe passé, on peut dire « je <b>me</b> suis » → <b>s'est</b>."
  };
  var HOMO = FR.lines([
    "1|Il ___ lave les mains.|se|ce", "1|___ chien aboie toute la nuit.|Ce|Se", "1|Elle ___ brosse les dents.|se|ce", "1|Tu as vu ___ film ?|ce|se",
    "1|Les enfants ___ couchent tôt.|se|ce", "1|Les oiseaux ___ dans le nid.|sont|son", "1|Mes voisins ___ un chat.|ont|on",
    "2|Je ___ donne un bonbon (à mes cousins).|leur|leurs", "2|Les élèves rangent ___ cahiers.|leurs|leur", "2|Mes voisins ont vendu ___ voiture.|leur|leurs",
    "2|Ils ont oublié ___ clés.|leurs|leur", "2|Je ___ ai écrit une lettre.|leur|leurs", "2|___ belle journée !|Quelle|Quel,Qu'elle",
    "2|___ livre préfères-tu ?|Quel|Quelle,Qu'elle", "2|Je crois ___ est malade.|qu'elle|quelle,quel", "2|___ heure est-il ?|Quelle|Quel,Qu'elle",
    "3|Il faut ___ vienne demain.|qu'elle|quelle,quel", "3|___ est une bonne idée !|C'est|S'est", "3|Le chat ___ caché sous le lit.|s'est|c'est",
    "3|Elle ___ réveillée très tôt.|s'est|c'est", "3|___ mon anniversaire demain.|C'est|S'est", "3|Il ___ trompé de chemin.|s'est|c'est",
    "3|Les parents parlent à ___ enfants.|leurs|leur", "3|___ joli dessin !|Quel|Quelle,Qu'elle"
  ].join("\n"));
  add(C3, {
    id: "f7-homophones", icon: "👂", title: "Les homophones",
    desc: "ce/se, leur/leurs, quel/quelle/qu'elle, c'est/s'est…",
    learn: [
      { t: "ce ou se ?", h: "<b>se</b> est devant un verbe → on peut dire « je <b>me</b> » : Il <b>se</b> lave (je me lave).<br><br><b>ce</b> est devant un nom → « ce …-là » : <b>ce</b> chien." },
      { t: "leur ou leurs ?", h: "<b>leur</b> devant un verbe = « à eux », jamais de s : Je <b>leur</b> parle.<br><br>Devant un nom : <b>leur</b> si le nom est singulier (leur voiture), <b>leurs</b> s'il est pluriel (leurs clés)." },
      { t: "quel, quelle ou qu'elle ?", h: "<b>quel</b> / <b>quelle</b> s'accorde avec le nom : <b>quel</b> livre, <b>quelle</b> heure, <b>quels</b> jeux.<br><br><b>qu'elle</b> = que + elle → on peut dire « qu'il » : Je crois <b>qu'elle</b> (qu'il) est malade." },
      { t: "c'est ou s'est ?", h: "<b>c'est</b> = cela est : <b>C'est</b> super !<br><br><b>s'est</b> se trouve devant un participe passé → « je me suis » : Il <b>s'est</b> caché (je me suis caché)." }
    ],
    gen: function (d) { return FR.homoQ(HOMO, HRULES, d); }
  });

  // Pluriels : "niveau|singulier|pluriel|règle"
  var PLU = FR.lines([
    "1|bateau|bateaux|eau", "1|château|châteaux|eau", "1|gâteau|gâteaux|eau", "1|oiseau|oiseaux|eau", "1|tuyau|tuyaux|au", "1|jeu|jeux|eu",
    "1|cheveu|cheveux|eu", "1|cheval|chevaux|al", "1|journal|journaux|al", "1|animal|animaux|al",
    "2|clou|clous|ou", "2|trou|trous|ou", "2|kangourou|kangourous|ou", "2|bijou|bijoux|ou", "2|caillou|cailloux|ou", "2|genou|genoux|ou",
    "2|hibou|hiboux|ou", "2|chou|choux|ou", "2|rail|rails|ail", "2|détail|détails|ail",
    "3|festival|festivals|al", "3|carnaval|carnavals|al", "3|bal|bals|al", "3|travail|travaux|ail", "3|vitrail|vitraux|ail", "3|corail|coraux|ail",
    "3|pneu|pneus|eu", "3|landau|landaus|au", "3|joujou|joujoux|ou", "3|pou|poux|ou"
  ].join("\n"));
  var PRULE = {
    eau: "Les noms en <b>-eau</b> prennent un <b>x</b> au pluriel : des bateaux, des oiseaux.",
    au: "Les noms en <b>-au</b> prennent un <b>x</b> (des tuyaux), sauf landau et sarrau qui prennent un s.",
    eu: "Les noms en <b>-eu</b> prennent un <b>x</b> (des jeux, des cheveux), sauf <b>pneu</b>, bleu et émeu qui prennent un s.",
    al: "Les noms en <b>-al</b> font <b>-aux</b> (des chevaux), sauf <b>bal, carnaval, festival</b>, chacal, récital qui prennent un s.",
    ou: "Les noms en <b>-ou</b> prennent un <b>s</b>, sauf 7 qui prennent un x : <b>bijou, caillou, chou, genou, hibou, joujou, pou</b>.",
    ail: "Les noms en <b>-ail</b> prennent un <b>s</b> (des rails), sauf <b>travail, corail, vitrail</b>, émail, bail, soupirail, vantail qui font -aux."
  };
  add(C3, {
    id: "f7-pluriels", icon: "🐚", title: "Les pluriels en -au, -eu, -ou, -al, -ail",
    desc: "Des pluriels en s ou en x… et leurs exceptions.",
    learn: [
      { t: "-eau, -au, -eu → x", h: big("un bateau → des bateau<b>x</b> · un jeu → des jeu<b>x</b>") + "<small>Exceptions : des pneu<b>s</b>, des landau<b>s</b>.</small>" },
      { t: "-al → -aux", h: big("un cheval → des chev<b>aux</b>") + "<small>Exceptions avec un s : des bals, des carnavals, des festivals, des chacals, des récitals.</small>" },
      { t: "-ou → s, sauf 7 mots", h: big("un clou → des clou<b>s</b>") + "Mais : bijou, caillou, chou, genou, hibou, joujou, pou → <b>x</b>.<br><small>Phrase pour retenir : « Viens mon chou, mon bijou, mon joujou, sur mes genoux, et jette des cailloux à ce hibou plein de poux ! »</small>" },
      { t: "-ail → s, sauf quelques-uns", h: big("un rail → des rail<b>s</b> · un détail → des détail<b>s</b>") + "<small>Exceptions en -aux : travail → travaux, corail → coraux, vitrail → vitraux, émail → émaux.</small>" }
    ],
    gen: function (d) {
      var it = FR.lv(PLU, d), w = it.f[0], good = it.f[1];
      var bad = [w + "s", w + "x", w.replace(/ail$|al$/, "aux"), w.replace(/al$/, "als"), w + "es"].filter(function (b) { return b !== w; });
      return U.choice("Quel est le pluriel de" + big("un " + w + " → des …"), good, shuffle(bad), { steps: [PRULE[it.f[2]], "Réponse : des <b>" + good + "</b>."] });
    }
  });

  var SV = FR.lines([
    "1|Les enfants de ma voisine ___ au parc.|jouent|joue,joues|les enfants de ma voisine (le mot important est « enfants »)|3p",
    "1|Le bruit des voitures ___ le bébé.|réveille|réveillent,réveilles|le bruit des voitures (le mot important est « bruit »)|3s",
    "1|La couleur de ces fleurs ___ magnifique.|est|sont,es|la couleur de ces fleurs (le mot important est « couleur »)|3s",
    "1|Les livres de ma sœur ___ sur l'étagère.|sont|est,sommes|les livres de ma sœur|3p",
    "2|Mon frère et moi ___ au foot.|jouons|jouent,joue|mon frère et moi (= nous)|1p", "2|Toi et ta sœur ___ en retard.|êtes|sont,es|toi et ta sœur (= vous)|2p",
    "2|Le chat et le chien ___ ensemble.|dorment|dort,dors|le chat et le chien (= ils)|3p", "2|Lucas, Emma et Noé ___ un château de sable.|construisent|construit,construis|Lucas, Emma et Noé (= ils)|3p",
    "2|Ma mère et ma tante ___ au marché.|vont|va,allons|ma mère et ma tante (= elles)|3p",
    "3|C'est moi qui ___ ce dessin.|ai fait|a fait,avons fait|qui (= moi, donc « je »)|1s", "3|C'est toi qui ___ raison.|as|a,ont|qui (= toi, donc « tu »)|2s",
    "3|Les élèves qui ___ sages auront une surprise.|sont|est,es|qui (= les élèves)|3p", "3|Je les ___ souvent au marché.|vois|voit,voient|je (« les » n'est pas le sujet !)|1s",
    "3|Il nous ___ une histoire.|raconte|racontons,racontent|il (« nous » n'est pas le sujet !)|3s", "3|C'est nous qui ___ gagné.|avons|ont,a|qui (= nous)|1p"
  ].join("\n"));
  add(C3, {
    id: "f7-accord-sv", icon: "🔗", title: "L'accord sujet-verbe : les pièges",
    desc: "Sujet éloigné, plusieurs sujets, le pronom « qui ».",
    learn: [
      { t: "Le sujet éloigné", h: "Le verbe s'accorde avec le <b>mot principal</b> du sujet :" + big("Le bruit <u>des voitures</u> réveill<b>e</b> le bébé.") + "Qui est-ce qui réveille ? → le <b>bruit</b> (singulier), pas « les voitures »." },
      { t: "Plusieurs sujets", h: "Plusieurs sujets = un verbe au <b>pluriel</b> :<br>Le chat et le chien → <b>ils</b> dorm<b>ent</b><br>Mon frère et moi → <b>nous</b> jou<b>ons</b><br>Toi et ta sœur → <b>vous</b> ê<b>tes</b>" },
      { t: "Avec « qui » et les pronoms", h: "Le verbe après « qui » s'accorde avec le mot que « qui » remplace :<br>C'est <b>moi qui ai</b> fait · C'est <b>toi qui as</b> raison.<br><br>Les pronoms « le, la, les, nous, lui » devant le verbe ne sont pas le sujet : Je <b>les</b> vois → je vo<b>is</b>." }
    ],
    gen: function (d) { return FR.svQ(SV, d); }
  });

  // Participe passé : "niveau|phrase|bon|participe de base|E/A/S|qui"
  var PP = FR.lines([
    "1|Mes sœurs sont ___ en vacances.|parties|parti|E|mes sœurs (féminin pluriel)", "1|Léa est ___ tôt ce matin.|arrivée|arrivé|E|Léa (féminin singulier)",
    "1|Les garçons sont ___ du train.|descendus|descendu|E|les garçons (masculin pluriel)", "1|Ma tante est ___ à Genève.|allée|allé|E|ma tante (féminin singulier)",
    "1|Nos voisins sont ___ hier.|venus|venu|E|nos voisins (masculin pluriel)", "1|Elles sont ___ très tard.|rentrées|rentré|E|elles (féminin pluriel)",
    "2|Les filles ont ___ une chanson.|chanté|chanté|A|les filles", "2|Elle a ___ tout son gâteau.|mangé|mangé|A|elle", "2|Nous avons ___ nos devoirs.|fini|fini|A|nous",
    "2|Mes parents ont ___ un cadeau.|acheté|acheté|A|mes parents", "2|Les élèves ont ___ leur exposé.|présenté|présenté|A|les élèves", "2|Ils ont ___ le bus.|pris|pris|A|ils",
    "3|Une porte ___ laisse passer le froid.|ouverte|ouvert|S|une porte (féminin singulier)", "3|Les volets ___ protègent du soleil.|fermés|fermé|S|les volets (masculin pluriel)",
    "3|J'ai trouvé des clés ___.|perdues|perdu|S|des clés (féminin pluriel)", "3|Les chemises ___ sèchent au soleil.|lavées|lavé|S|les chemises (féminin pluriel)",
    "3|Une tarte ___ sent bon.|cuite|cuit|S|une tarte (féminin singulier)", "3|Ma sœur est ___ dans la neige.|tombée|tombé|E|ma sœur (féminin singulier)"
  ].join("\n"));
  var PPRULE = {
    E: "Avec l'auxiliaire <b>être</b>, le participe passé s'accorde avec le <b>sujet</b>.",
    A: "Avec l'auxiliaire <b>avoir</b>, le participe passé <b>ne s'accorde pas</b> avec le sujet.",
    S: "Sans auxiliaire, le participe passé s'emploie comme un <b>adjectif</b> : il s'accorde avec le nom."
  };
  add(C3, {
    id: "f7-participe", icon: "🎓", title: "L'accord du participe passé",
    desc: "Avec être, avec avoir, ou sans auxiliaire.",
    learn: [
      { t: "Avec être : on accorde", h: "Avec <b>être</b>, le participe s'accorde avec le <b>sujet</b>, comme un adjectif :" + big("Léa est arrivé<b>e</b>. · Les garçons sont descendu<b>s</b>.") },
      { t: "Avec avoir : pas d'accord avec le sujet", h: "Avec <b>avoir</b>, le participe ne s'accorde <b>pas</b> avec le sujet :" + big("Les filles ont chanté.") + "<small>(Il y a une règle spéciale quand le complément est placé avant : tu la verras plus tard.)</small>" },
      { t: "Sans auxiliaire", h: "Seul, le participe passé est comme un <b>adjectif</b> : il s'accorde avec le nom :" + big("une porte ouvert<b>e</b> · des clés perdu<b>es</b>") },
      { t: "Trouver la terminaison", h: "Pour savoir s'il finit par é, i, u, s ou t, je le mets au <b>féminin</b> :<br>pris → pri<b>se</b> · fait → fai<b>te</b> · fini → fini<b>e</b><br><br>Et pour ne pas confondre é / er : je remplace par « vendu » : il a mangé (il a vendu)." }
    ],
    gen: function (d) {
      var it = FR.lv(PP, d), f = it.f, b = f[2], forms = /s$/.test(b) ? [b, b + "e", b, b + "es"] : [b, b + "e", b + "s", b + "es"];
      var st = [PPRULE[f[3]], f[3] === "A" ? "On n'accorde pas avec « " + f[4] + " »." : "On accorde avec <b>" + f[4] + "</b>.", "La phrase : " + FR.fill(f[0], f[1])];
      return U.choice("Écris le participe passé correctement :" + big(FR.blank(f[0])), f[1], forms.concat([b.replace(/é$/, "er")]), { steps: st });
    }
  });

  /* ================= Vocabulaire ================= */
  var PREF = FR.rows([
    "honnête|malhonnête", "possible|impossible", "patient|impatient", "poli|impoli", "content|mécontent", "visible|invisible", "coller|décoller",
    "obéir|désobéir", "habiller|déshabiller", "heureux|malheureux", "lisible|illisible", "connu|inconnu", "adroit|maladroit", "prudent|imprudent",
    "faire|défaire", "ordre|désordre", "juste|injuste", "chance|malchance", "mobile|immobile", "légal|illégal"
  ].join("\n"));
  var SUF = FR.rows([
    "fillette|-ette|petit", "maisonnette|-ette|petit", "camionnette|-ette|petit", "chanteur|-eur|celui qui fait l'action", "nageur|-eur|celui qui fait l'action",
    "danseur|-eur|celui qui fait l'action", "lavable|-able|qu'on peut le faire", "mangeable|-able|qu'on peut le faire", "jetable|-able|qu'on peut le faire",
    "lavage|-age|l'action de", "nettoyage|-age|l'action de", "pommier|-ier|l'arbre qui porte le fruit", "cerisier|-ier|l'arbre qui porte le fruit",
    "lentement|-ment|la manière (comment ?)", "doucement|-ment|la manière (comment ?)"
  ].join("\n"));
  var SENS = ["petit", "celui qui fait l'action", "qu'on peut le faire", "l'action de", "l'arbre qui porte le fruit", "la manière (comment ?)"];
  add(C4, {
    id: "f7-prefixes", icon: "🧬", title: "Préfixes et suffixes",
    desc: "Construire des mots en ajoutant un début ou une fin.",
    learn: [
      { t: "Radical, préfixe, suffixe", h: big("<b>in</b>-visible · lav-<b>able</b>") + "Le <b>préfixe</b> se place <b>avant</b> le radical, le <b>suffixe</b> <b>après</b>. Ils changent le sens du mot." },
      { t: "Les préfixes du contraire", h: "<b>in-</b> / <b>im-</b> / <b>il-</b> : invisible, impossible, illisible<br><b>dé-</b> / <b>dés-</b> : décoller, désobéir<br><b>mal-</b> / <b>mé-</b> : malheureux, mécontent<br><br><small>im- devant m, b, p : impossible, immobile · il- devant l : illégal.</small>" },
      { t: "Quelques suffixes", h: "<b>-ette</b> = petit : fillette<br><b>-eur</b> = celui qui fait : chanteur<br><b>-able</b> = qu'on peut : lavable<br><b>-age</b> = l'action de : lavage<br><b>-ier</b> = l'arbre : pommier<br><b>-ment</b> = la manière : lentement" }
    ],
    gen: function (d) {
      if (d === 3 || (d === 2 && R(0, 1))) {
        var s = pick(SUF);
        return U.choice("Dans le mot <b>« " + s[0] + " »</b>, que veut dire le suffixe <b>" + s[1] + "</b> ?", s[2], shuffle(SENS.filter(function (x) { return x !== s[2]; })), {
          steps: ["« " + s[0] + " » = radical + suffixe <b>" + s[1] + "</b>.", "Le suffixe " + s[1] + " veut dire : <b>" + s[2] + "</b>."]
        });
      }
      var p = pick(PREF), w = p[0], good = p[1];
      var bad = ["in", "im", "il", "dé", "dés", "mal", "mé"].map(function (x) { return x + w; }).filter(function (x) { return x !== good; });
      return U.choice("Quel est le <b>contraire</b> de" + big("« " + w + " »"), good, shuffle(bad), {
        steps: ["On ajoute un <b>préfixe</b> qui veut dire « le contraire » : <b>" + good.slice(0, good.length - w.length) + "-</b>.", w + " → <b>" + good + "</b>"]
      });
    }
  });

  var SYN = FR.rows([
    "rapide|véloce|lent", "courageux|intrépide|lâche", "généreux|charitable|avare", "augmenter|accroître|diminuer", "accepter|admettre|refuser",
    "ancien|antique|moderne", "célèbre|connu|inconnu", "sûr|certain|douteux", "abîmer|détériorer|réparer", "rare|exceptionnel|fréquent",
    "amusant|drôle|ennuyeux", "solide|résistant|fragile", "gagner|remporter|perdre", "obscur|sombre|lumineux"
  ].join("\n"));
  add(C4, {
    id: "f7-synonymes", icon: "🔁", title: "Synonymes et antonymes",
    desc: "Enrichir son vocabulaire avec des mots de même sens ou de sens contraire.",
    learn: [
      { t: "Les synonymes", h: "Les <b>synonymes</b> ont un sens proche. Ils permettent d'éviter les répétitions et d'être plus précis :" + big("célèbre = connu · sombre = obscur") },
      { t: "Les antonymes", h: "Les <b>antonymes</b> ont un sens contraire :" + big("solide ≠ fragile · gagner ≠ perdre") + "<small>On peut aussi créer un antonyme avec un préfixe : connu ≠ <b>in</b>connu.</small>" },
      { t: "Choisir le bon mot", h: "Un synonyme doit être de la même <b>classe</b> : un adjectif pour un adjectif, un verbe pour un verbe.<br><br>rapide (adjectif) = véloce (adjectif)<br>rapidement (adverbe) = vite (adverbe)" }
    ],
    gen: function (d) { return FR.synQ(SYN, d); }
  });

  var FAM = FR.rows([
    "terre|terrain,enterrer,terrestre,souterrain|terrible", "dent|dentiste,dentifrice,dentaire,édenté|danse", "lait|laitier,laitage,allaiter,laiterie|laid",
    "mer|marin,maritime,amerrir,marée|mère", "nuit|nocturne,minuit,nuitée|nuire", "eau|aquatique,aquarium,aquarelle,aqueduc|haut",
    "main|manuel,manette,manier,menotte|maintenant", "fleur|fleuriste,fleurir,floral,floraison|flotter", "pied|piéton,piétiner,trépied,pédestre|pierre",
    "œil|oculaire,œillade,oculiste,œillère|oie"
  ].join("\n"));
  add(C4, {
    id: "f7-familles", icon: "🌳", title: "Les familles de mots",
    desc: "Le radical et les mots de la même famille, même quand ils changent.",
    learn: [
      { t: "Un radical commun", h: "Les mots d'une même famille partagent un <b>radical</b> et un <b>sens</b> :" + big("terre → terrain, enterrer, souterrain") },
      { t: "Quand le radical change", h: "Parfois, le radical vient du <b>latin</b> et ne ressemble plus au mot de base :<br>mer → <b>mar</b>in, <b>mar</b>itime<br>nuit → <b>noct</b>urne<br>eau → <b>aqu</b>atique<br>main → <b>man</b>uel" },
      { t: "Les faux amis", h: "Certains mots se ressemblent mais n'ont <b>aucun rapport de sens</b> :" + big("terre ≠ terrible · main ≠ maintenant") }
    ],
    gen: function (d) { return FR.famQ(FAM, d); }
  });
})();
