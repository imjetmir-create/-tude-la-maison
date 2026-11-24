/* Français 5H : thèmes alignés sur le Plan d'études romand (L1 26, cycle 2, 5e-6e) */
(function () {
  "use strict";
  var T = window.THEMES = window.THEMES || [];
  var big = U.big, tab = FR.table;
  function add(chapter, o) { o.grade = 5; o.subject = "francais"; o.chapter = chapter; T.push(o); }
  var C1 = "Conjugaison", C2 = "Grammaire", C3 = "Orthographe", C4 = "Vocabulaire";
  var T4 = ["présent", "imparfait", "futur", "passé composé"];
  var ER = ["chanter", "jouer", "aimer", "regarder", "danser", "parler"];
  var ALL = ER.concat(["être", "avoir", "aller", "finir", "dire", "faire", "entendre", "savoir", "vouloir"]);
  function side(a, b) { return '<div class="duo">' + a + b + "</div>"; }

  /* ================= Conjugaison ================= */
  add(C1, {
    id: "f5-present-er", icon: "🎤", title: "Le présent des verbes en -er",
    desc: "Conjuguer chanter, jouer, aimer… au présent.",
    learn: [
      { t: "Le verbe et son sujet", h: "Le <b>verbe</b> dit ce que fait le sujet. Il change selon <b>qui</b> fait l'action : c'est la <b>conjugaison</b>." + big("je chante · nous chantons") + "L'infinitif, c'est le nom du verbe : <b>chanter</b>." },
      { t: "Les terminaisons du présent", h: "Pour les verbes en <b>-er</b>, on enlève « er » et on ajoute :" + big("-e · -es · -e · -ons · -ez · -ent") + "<small>Attention : « ils chantent » se termine par -ent, mais on ne l'entend pas !</small>" },
      { t: "Exemple : chanter", h: side(tab("chanter", "présent"), "<div>On garde le <b>radical</b> « chant- » et on change seulement la fin.<br><br>Avec une voyelle, « je » devient <b>j'</b> : j'aime, j'écoute.</div>") },
      { t: "Comment ne pas se tromper", h: "1. Je trouve le <b>sujet</b> (qui fait l'action ?).<br>2. Je choisis la bonne <b>terminaison</b>.<br><br>tu → toujours un <b>s</b> : tu chantes<br>nous → <b>-ons</b> · vous → <b>-ez</b><br>ils, elles → <b>-ent</b>" }
    ],
    gen: function () { return FR.conjQ(ER, "présent", T4); }
  });

  add(C1, {
    id: "f5-etre-avoir", icon: "⭐", title: "Être, avoir et aller au présent",
    desc: "Les trois verbes les plus utilisés, à savoir par cœur.",
    learn: [
      { t: "Trois verbes très importants", h: "<b>être</b>, <b>avoir</b> et <b>aller</b> ne suivent pas de règle : on les apprend <b>par cœur</b>.<br><br>On les utilise tout le temps : « je suis content », « j'ai faim », « je vais à l'école »." },
      { t: "Être et avoir", h: side(tab("être", "présent"), tab("avoir", "présent")) },
      { t: "Aller", h: side(tab("aller", "présent"), "<div>Attention :<br><b>je vais</b>, tu vas, il va<br>mais <b>ils vont</b> !<br><br><small>Astuce : ils <b>s</b>ont, ils <b>o</b>nt, ils <b>v</b>ont, ils <b>f</b>ont : 4 verbes en -ont.</small></div>") }
    ],
    gen: function () { return FR.conjQ(["être", "avoir", "aller"], "présent", T4); }
  });

  add(C1, {
    id: "f5-present-autres", icon: "🧩", title: "Finir, faire, dire, savoir… au présent",
    desc: "Le présent des verbes finir, dire, faire, entendre, savoir, vouloir.",
    learn: [
      { t: "D'autres terminaisons", h: "Beaucoup de verbes qui ne finissent pas en -er ont ces terminaisons :" + big("-s · -s · -t · -ons · -ez · -ent") + "je fini<b>s</b>, tu fini<b>s</b>, il fini<b>t</b>" },
      { t: "Finir et faire", h: side(tab("finir", "présent"), tab("faire", "présent")) + "<small>Attention : vous <b>faites</b> (et pas « faisez ») · vous <b>dites</b>.</small>" },
      { t: "Dire et entendre", h: side(tab("dire", "présent"), tab("entendre", "présent")) + "<small>il entend : pas de t, le d est déjà là.</small>" },
      { t: "Savoir et vouloir", h: side(tab("savoir", "présent"), tab("vouloir", "présent")) + "<small>je veu<b>x</b>, tu veu<b>x</b> : avec un x !</small>" }
    ],
    gen: function () { return FR.conjQ(["finir", "dire", "faire", "entendre", "savoir", "vouloir"], "présent", T4); }
  });

  add(C1, {
    id: "f5-imparfait", icon: "🕰️", title: "L'imparfait",
    desc: "Raconter ce qui se passait autrefois.",
    learn: [
      { t: "À quoi sert l'imparfait ?", h: "L'<b>imparfait</b> est un temps du <b>passé</b>. Il sert à décrire ou à dire ce qui se passait souvent :" + big("Autrefois, je jouais dans le jardin.") },
      { t: "Les terminaisons", h: "Pour <b>tous</b> les verbes, les terminaisons sont les mêmes :" + big("-ais · -ais · -ait · -ions · -iez · -aient") + side(tab("jouer", "imparfait"), tab("finir", "imparfait")) },
      { t: "Le radical", h: "Le radical vient de « nous » au présent :<br>nous <b>fais</b>ons → je <b>fais</b>ais<br>nous <b>finiss</b>ons → je <b>finiss</b>ais<br><br>Seul <b>être</b> est spécial : j'<b>ét</b>ais, tu étais…" + tab("être", "imparfait") }
    ],
    gen: function () { return FR.conjQ(ALL, "imparfait", T4); }
  });

  add(C1, {
    id: "f5-futur", icon: "🚀", title: "Le futur",
    desc: "Dire ce qui va se passer plus tard.",
    learn: [
      { t: "À quoi sert le futur ?", h: "Le <b>futur</b> dit ce qui se passera plus tard :" + big("Demain, nous jouerons au parc.") },
      { t: "Les terminaisons", h: "On garde l'infinitif et on ajoute :" + big("-ai · -as · -a · -ons · -ez · -ont") + "On entend toujours le <b>r</b> : je chante<b>r</b>ai, je fini<b>r</b>ai." + tab("chanter", "futur") },
      { t: "Des verbes spéciaux", h: side(tab("être", "futur"), tab("avoir", "futur")) + "<small>aller → j'<b>ir</b>ai · faire → je <b>fer</b>ai · savoir → je <b>saur</b>ai · vouloir → je <b>voudr</b>ai</small>" }
    ],
    gen: function () { return FR.conjQ(ALL, "futur", T4); }
  });

  add(C1, {
    id: "f5-passe-compose", icon: "📸", title: "Le passé composé",
    desc: "Raconter une action terminée : « hier, j'ai joué ».",
    learn: [
      { t: "Un temps en deux mots", h: "Le <b>passé composé</b> raconte une action <b>terminée</b>. Il est formé de deux mots :" + big("j'<u>ai</u> <u>chanté</u>") + "l'<b>auxiliaire</b> (avoir ou être) au présent + le <b>participe passé</b>." },
      { t: "Avec avoir", h: side(tab("chanter", "passé composé"), "<div>La plupart des verbes utilisent <b>avoir</b>.<br><br>Participes : chant<b>é</b>, fin<b>i</b>, fai<b>t</b>, di<b>t</b>, entend<b>u</b>, s<b>u</b>, voul<b>u</b>, e<b>u</b>, ét<b>é</b></div>") },
      { t: "Avec être", h: side(tab("aller", "passé composé", "f"), "<div>Quelques verbes utilisent <b>être</b> : aller, arriver, tomber, rester…<br><br>Le participe s'accorde alors avec le sujet :<br>elle est all<b>ée</b><br>ils sont all<b>és</b></div>") }
    ],
    gen: function () { return FR.conjQ(["chanter", "jouer", "regarder", "finir", "faire", "dire", "entendre", "être", "avoir", "aller", "arriver", "tomber"], "passé composé", T4); }
  });

  add(C1, {
    id: "f5-temps", icon: "⏳", title: "Passé, présent ou futur ?",
    desc: "Reconnaître le temps d'un verbe conjugué.",
    learn: [
      { t: "La ligne du temps", h: big("passé ← présent → futur") + "<b>Hier</b> : c'est le passé (imparfait, passé composé).<br><b>Aujourd'hui</b> : le présent.<br><b>Demain</b> : le futur." },
      { t: "Les indices", h: "Imparfait : -ais, -ait, -aient → je jou<b>ais</b><br>Passé composé : deux mots → j'<b>ai joué</b><br>Futur : on entend le r → je joue<b>rai</b><br>Présent : je joue" }
    ],
    gen: function (d) { return FR.tempsQ(ALL, T4, d); }
  });

  /* ================= Grammaire ================= */
  var CLS = [
    "Le:D petit:A chat:N dort:V .", "Léa:NP mange:V une:D pomme:N rouge:A .", "Nous:P regardons:V les:D étoiles:N .",
    "Mon:D grand:A frère:N joue:V au foot .", "Elle:P porte:V un:D joli:A manteau:N .", "Tom:NP lit:V une:D histoire:N drôle:A .",
    "Ils:P construisent:V une:D cabane:N .", "La:D vieille:A dame:N promène:V son:D chien:N .", "Tu:P dessines:V un:D cheval:N blanc:A .",
    "Le:D lac:N de Morat:NP brille:V au soleil .", "Je:P mange:V des:D frites:N croustillantes:A .", "Notre:D maîtresse:N raconte:V une:D histoire:N .",
    "Paul:NP et Zoé:NP habitent:V à Fribourg:NP .", "Vous:P chantez:V une:D belle:A chanson:N .", "Ce:D gros:A nuage:N cache:V le:D soleil:N ."
  ];
  add(C2, {
    id: "f5-classes", icon: "🏷️", title: "Les classes de mots",
    desc: "Nom, déterminant, adjectif, verbe, pronom.",
    learn: [
      { t: "Chaque mot a une classe", h: "Les mots sont rangés en familles qu'on appelle des <b>classes</b> :" + big("Le petit chat dort.") + "Le = déterminant · petit = adjectif · chat = nom · dort = verbe" },
      { t: "Le nom et le déterminant", h: "Le <b>nom commun</b> désigne une personne, un animal, une chose : chat, maison, maman.<br>Le <b>nom propre</b> a une majuscule : Léa, Fribourg.<br><br>Le <b>déterminant</b> est devant le nom : le, la, les, un, une, des, mon, ce…" },
      { t: "L'adjectif et le verbe", h: "L'<b>adjectif</b> dit comment est le nom : un chat <b>noir</b>, une <b>grande</b> maison.<br><br>Le <b>verbe</b> se conjugue. Pour le trouver, je change le temps :<br>Le chat <b>dort</b> → Hier, le chat <b>dormait</b>." },
      { t: "Le pronom personnel", h: "Le <b>pronom</b> remplace un nom :" + big("Léa mange. → Elle mange.") + "je, tu, il, elle, nous, vous, ils, elles" }
    ],
    gen: function (d) { return FR.classQ(CLS, [["N", "V", "D"], ["A", "NP", "D", "N"], ["P", "A", "NP", "V"]], ["D", "N", "NP", "V", "A", "P"], d); }
  });

  var FCT = [
    "[S:Le chat] [GV:dort sur le canapé] [CP:tous les après-midi].", "[CP:Ce matin], [S:Léa] [GV:a mangé une tartine].",
    "[S:Les enfants] [GV:jouent au ballon] [CP:dans la cour].", "[CP:En hiver], [S:mon grand-père] [GV:fait du ski].",
    "[S:Nous] [GV:visitons le château] [CP:pendant les vacances].", "[CP:Dans la forêt], [S:le renard] [GV:cherche sa nourriture].",
    "[S:Ma petite sœur] [GV:dessine un arc-en-ciel] [CP:chaque soir].", "[CP:Demain], [S:nos voisins] [GV:partiront en voyage].",
    "[S:Le maître] [GV:lit une histoire] [CP:après la récréation].", "[CP:Au printemps], [S:les fleurs] [GV:poussent].",
    "[S:Mes cousins] [GV:font du vélo] [CP:le dimanche].", "[CP:À la piscine], [S:Tom] [GV:apprend à nager]."
  ];
  add(C2, {
    id: "f5-fonctions", icon: "🧱", title: "Sujet, groupe verbal, complément",
    desc: "Les trois parties d'une phrase.",
    learn: [
      { t: "Les morceaux de la phrase", h: "Une phrase se découpe en groupes :" + big('<span class="hlw">Le chat</span> dort sur le canapé.') + "Le <b>sujet</b> · le <b>groupe verbal</b> · parfois un <b>complément de phrase</b>." },
      { t: "Le sujet", h: "Le <b>sujet</b> dit <b>qui</b> fait l'action. Je pose la question « Qui est-ce qui … ? »<br><br>Qui est-ce qui dort ? → <b>le chat</b><br><br>Je peux l'encadrer : « <b>C'est</b> le chat <b>qui</b> dort »." },
      { t: "Le groupe verbal", h: "Le <b>groupe verbal</b> contient le verbe conjugué et ce qui va avec :<br>Le chat <b>dort sur le canapé</b>.<br><br>On ne peut pas l'enlever : la phrase n'aurait plus de sens." },
      { t: "Le complément de phrase", h: "Le <b>complément de phrase</b> dit <b>quand</b>, <b>où</b> ou <b>pourquoi</b>. On peut le <b>déplacer</b> ou le <b>supprimer</b> :<br><br><b>Ce matin</b>, Léa a mangé.<br>Léa a mangé <b>ce matin</b>.<br>Léa a mangé." }
    ],
    gen: function (d) { return FR.funcQ(FCT, [["S"], ["S", "GV"], ["S", "GV", "CP"]], ["S", "GV", "CP"], d); }
  });

  var PH = FR.rows([
    "Le soleil brille.|D|P", "Est-ce que tu viens ?|I|P", "Je ne connais pas cette chanson.|D|N", "Où vas-tu ?|I|P",
    "Pourquoi n'est-il pas venu ?|I|N", "Mon chat n'aime pas l'eau.|D|N", "Nous partons demain.|D|P", "As-tu fini tes devoirs ?|I|P",
    "Il ne pleut jamais ici.|D|N", "Tu ne veux pas jouer ?|I|N", "Les fleurs sentent bon.|D|P", "Elle ne mange plus de viande.|D|N",
    "Quel âge as-tu ?|I|P", "Je n'ai rien vu.|D|N"
  ].join("\n"));
  var NEG = FR.rows([
    "Il aime le chocolat.|Il n'aime pas le chocolat.|Il aime pas le chocolat.|Il ne aime pas le chocolat.",
    "Nous partons ce soir.|Nous ne partons pas ce soir.|Nous partons ne pas ce soir.|Ne nous partons pas ce soir.",
    "Tu es fatigué.|Tu n'es pas fatigué.|Tu es pas fatigué.|Tu ne pas es fatigué.",
    "Elle joue au tennis.|Elle ne joue pas au tennis.|Elle joue pas au tennis.|Elle ne pas joue au tennis.",
    "Je regarde la télé.|Je ne regarde pas la télé.|Je regarde ne pas la télé.|Je pas regarde la télé.",
    "Le chien aboie.|Le chien n'aboie pas.|Le chien ne aboie pas.|Le chien aboie pas.",
    "Vous avez faim.|Vous n'avez pas faim.|Vous ne avez pas faim.|Vous avez pas faim.",
    "Les oiseaux chantent.|Les oiseaux ne chantent pas.|Les oiseaux chantent ne pas.|Les oiseaux pas chantent."
  ].join("\n"));
  add(C2, {
    id: "f5-phrases", icon: "❓", title: "Types et formes de phrases",
    desc: "Phrase déclarative ou interrogative, positive ou négative.",
    learn: [
      { t: "Deux types de phrases", h: "La phrase <b>déclarative</b> donne une information. Elle finit par un <b>point</b> :" + big("Le soleil brille.") + "La phrase <b>interrogative</b> pose une question. Elle finit par un <b>?</b>" + big("Est-ce que tu viens ?") },
      { t: "Positive ou négative", h: "Une phrase <b>négative</b> dit « non ». Elle contient <b>ne … pas</b> (ou ne … jamais, ne … plus, ne … rien) :" + big("Je <b>ne</b> joue <b>pas</b>.") + "Sans négation, elle est <b>positive</b> : Je joue." },
      { t: "Écrire la négation", h: "« ne » et « pas » entourent le verbe, comme un sandwich :" + big("Il <b>n'</b>aime <b>pas</b> le chocolat.") + "Devant une voyelle, « ne » devient <b>n'</b>.<br><small>À l'oral, on oublie souvent le « ne », mais à l'écrit il faut toujours l'écrire !</small>" }
    ],
    gen: function (d) { return d === 1 ? FR.typeQ(PH, ["D", "I"]) : d === 2 ? FR.formQ(PH, ["D", "I"]) : FR.negQ(NEG); }
  });

  /* ================= Orthographe ================= */
  var HRULES = {
    "a": "On peut dire « avait » → c'est le verbe avoir : <b>a</b> (sans accent).",
    "à": "On ne peut pas dire « avait » → c'est <b>à</b> (avec un accent).",
    "on": "On peut dire « il » à la place → <b>on</b>.",
    "ont": "On peut dire « avaient » → c'est le verbe avoir : <b>ont</b>.",
    "et": "On peut dire « et puis » → <b>et</b>.",
    "est": "On peut dire « était » → c'est le verbe être : <b>est</b>.",
    "son": "On peut dire « mon » à la place → <b>son</b> (à lui, à elle).",
    "sont": "On peut dire « étaient » → c'est le verbe être : <b>sont</b>.",
    "ou": "On peut dire « ou bien » → <b>ou</b> (sans accent).",
    "où": "Ça parle d'un lieu (on demande « où ? ») → <b>où</b> (avec un accent).",
    "ces": "On montre quelque chose (« ces …-là ») → <b>ces</b>.",
    "ses": "C'est à lui ou à elle (au singulier : « son », « sa ») → <b>ses</b>."
  };
  var HOMO = FR.lines([
    "1|Léo ___ un chien noir.|a|à", "1|Nous allons ___ la piscine.|à|a", "1|Elle ___ peur du noir.|a|à", "1|Il pense ___ ses vacances.|à|a",
    "1|Le chat ___ faim.|a|à", "1|Je vais ___ l'école en bus.|à|a", "1|Mon frère ___ ma sœur jouent.|et|est", "1|Le ciel ___ tout bleu.|est|et",
    "1|Ce gâteau ___ délicieux.|est|et", "1|J'aime les pommes ___ les poires.|et|est", "1|Les enfants ___ fini leurs devoirs.|ont|on",
    "1|___ va au cinéma ce soir.|On|Ont", "1|Mes cousins ___ un grand jardin.|ont|on", "1|Demain, ___ mange chez mamie.|on|ont",
    "2|Les fleurs ___ jolies.|sont|son", "2|Tom range ___ vélo.|son|sont", "2|Où ___ mes chaussures ?|sont|son", "2|Elle a perdu ___ bonnet.|son|sont",
    "2|Tu veux du jus ___ du lait ?|ou|où", "2|___ habites-tu ?|Où|Ou", "2|Je ne sais pas ___ est mon livre.|où|ou", "2|Rouge ___ vert : choisis une couleur.|ou|où",
    "3|Regarde ___ beaux nuages là-haut !|ces|ses", "3|Léa prête ___ crayons à son amie.|ses|ces", "3|Le chat lèche ___ pattes.|ses|ces",
    "3|Qui a mis ___ bottes ici ?|ces|ses", "3|Ma tante ___ partie en voyage.|est|et", "3|Sam a mal ___ la tête.|à|a",
    "3|Les oiseaux ___ dans le nid.|sont|son", "3|Les voisins ___ un nouveau chat.|ont|on"
  ].join("\n"));
  add(C3, {
    id: "f5-homophones", icon: "👂", title: "Les homophones : a/à, et/est, on/ont…",
    desc: "Des mots qui se prononcent pareil mais ne s'écrivent pas pareil.",
    learn: [
      { t: "Ça sonne pareil !", h: "Les <b>homophones</b> se prononcent de la même façon mais s'écrivent différemment :" + big("a / à · et / est · on / ont") + "Pour choisir, on fait un <b>test de remplacement</b>." },
      { t: "a ou à ? et ou est ?", h: "<b>a</b> = verbe avoir → on peut dire « avait » : Léo <b>a</b> (avait) un chien.<br><b>à</b> sinon : Je vais <b>à</b> l'école.<br><br><b>est</b> = verbe être → on peut dire « était » : Le ciel <b>est</b> bleu.<br><b>et</b> = « et puis » : Léa <b>et</b> Tom." },
      { t: "on ou ont ? son ou sont ?", h: "<b>ont</b> → « avaient » : Ils <b>ont</b> faim.<br><b>on</b> → « il » : <b>On</b> joue.<br><br><b>sont</b> → « étaient » : Les fleurs <b>sont</b> belles.<br><b>son</b> → « mon » : Tom range <b>son</b> vélo." },
      { t: "ou ou où ? ces ou ses ?", h: "<b>ou</b> → « ou bien » : du jus <b>ou</b> du lait.<br><b>où</b> → un lieu : <b>Où</b> habites-tu ?<br><br><b>ces</b> → on montre : <b>ces</b> nuages-là.<br><b>ses</b> → à lui, à elle : Léa prête <b>ses</b> crayons." }
    ],
    gen: function (d) { return FR.homoQ(HOMO, HRULES, d); }
  });

  var GN = FR.lines([
    "1|une ___ maison|maison|fs|petit", "1|un chat ___|chat|ms|noir", "1|une robe ___|robe|fs|vert", "1|une ___ fille|fille|fs|grand",
    "1|une balle ___|balle|fs|bleu", "1|une table ___|table|fs|rond", "1|un ___ jardin|jardin|ms|joli",
    "2|des ___ chats|chats|mp|petit", "2|des fleurs ___|fleurs|fp|bleu", "2|les ___ montagnes|montagnes|fp|grand", "2|des pulls ___|pulls|mp|vert",
    "2|des sacs ___|sacs|mp|lourd", "2|des ___ poupées|poupées|fp|joli", "2|des chaussures ___|chaussures|fp|noir",
    "3|une ___ voiture|voiture|fs|nouveau", "3|une ___ fleur|fleur|fs|beau", "3|des enfants ___|enfants|mp|heureux", "3|une maîtresse ___|maîtresse|fs|gentil",
    "3|une nappe ___|nappe|fs|blanc", "3|des ___ chiens|chiens|mp|beau", "3|une ___ dame|dame|fs|vieux", "3|une couverture ___|couverture|fs|doux"
  ].join("\n"));
  add(C3, {
    id: "f5-accord-gn", icon: "🧶", title: "Les accords dans le groupe nominal",
    desc: "Accorder le déterminant, le nom et l'adjectif.",
    learn: [
      { t: "Le groupe nominal", h: "Le <b>groupe nominal</b> (GN) est formé d'un déterminant, d'un nom et parfois d'un adjectif :" + big("une petite maison") + "Tous les mots du GN vont <b>ensemble</b> : ils s'accordent." },
      { t: "Le féminin", h: "Si le nom est <b>féminin</b>, l'adjectif prend souvent un <b>e</b> :" + big("un chat noir · une chatte noir<b>e</b>") + "<small>Quelques adjectifs changent plus : beau → belle, gentil → gentille, blanc → blanche, vieux → vieille.</small>" },
      { t: "Le pluriel", h: "Si le nom est au <b>pluriel</b>, le nom et l'adjectif prennent un <b>s</b> :" + big("des chat<b>s</b> noir<b>s</b> · des fleur<b>s</b> bleu<b>es</b>") + "<small>Les mots en -x ne changent pas : un enfant heureux → des enfants heureux.</small>" }
    ],
    gen: function (d) { return FR.gnQ(GN, d); }
  });

  var SV = FR.lines([
    "1|Les enfants ___ dans la cour.|jouent|joue,joues|les enfants|3p", "1|Mon chat ___ sur le canapé.|dort|dors,dorment|mon chat|3s",
    "1|Tu ___ très bien.|chantes|chante,chantent|tu|2s", "1|Nous ___ nos devoirs.|finissons|finissez,finissent|nous|1p",
    "1|Ma sœur ___ un livre.|lit|lis,lisent|ma sœur|3s", "1|Vous ___ en vacances.|partez|partons,partent|vous|2p",
    "2|Les oiseaux ___ dans le ciel.|volent|vole,voles|les oiseaux|3p", "2|Léa et Tom ___ au ballon.|jouent|joue,jouons|Léa et Tom|3p",
    "2|Le chien de mes voisins ___ fort.|aboie|aboient,aboies|le chien de mes voisins (le mot important est « chien »)|3s",
    "2|Les filles ___ une chanson.|chantent|chante,chantes|les filles|3p", "2|Mon père ___ le dîner.|prépare|préparent,prépares|mon père|3s",
    "2|Les élèves ___ attentifs.|sont|est,sommes|les élèves|3p",
    "3|Dans la forêt ___ les loups.|vivent|vit,vis|les loups (le sujet est après le verbe !)|3p",
    "3|Sur la branche ___ un oiseau.|chante|chantent,chantes|un oiseau (le sujet est après le verbe !)|3s",
    "3|Que ___ les enfants ?|disent|dit,dis|les enfants (le sujet est après le verbe !)|3p",
    "3|Où ___ mes lunettes ?|sont|est,sommes|mes lunettes (le sujet est après le verbe !)|3p",
    "3|Dans le pré ___ les vaches.|broutent|broute,broutes|les vaches (le sujet est après le verbe !)|3p",
    "3|Au loin ___ le train.|arrive|arrivent,arrives|le train (le sujet est après le verbe !)|3s"
  ].join("\n"));
  add(C3, {
    id: "f5-accord-sv", icon: "🔗", title: "L'accord du sujet et du verbe",
    desc: "Le verbe s'accorde toujours avec son sujet.",
    learn: [
      { t: "Le verbe suit son sujet", h: "Le verbe <b>s'accorde</b> avec son sujet :" + big("Le chien aboie. · Les chiens aboient.") + "Quand le sujet est au pluriel, le verbe aussi (-ent)." },
      { t: "Trouver le sujet", h: "Je pose la question « <b>Qui est-ce qui</b> … ? »<br><br>Qui est-ce qui aboie ? → <b>les chiens</b> → pluriel → aboi<b>ent</b>.<br><br>Je peux remplacer le sujet par un pronom : les chiens = <b>ils</b>." },
      { t: "Attention aux pièges", h: "Parfois, le sujet est <b>après</b> le verbe :" + big("Dans la forêt vivent <b>les loups</b>.") + "Qui est-ce qui vit ? → les loups → viv<b>ent</b>.<br><br><small>Dans « le chien de mes voisins », le mot important est « chien » : il aboi<b>e</b>.</small>" }
    ],
    gen: function (d) { return FR.svQ(SV, d); }
  });

  /* ================= Vocabulaire ================= */
  add(C4, {
    id: "f5-alpha", icon: "🔤", title: "L'ordre alphabétique",
    desc: "Ranger les mots comme dans le dictionnaire.",
    learn: [
      { t: "L'alphabet", h: big("a b c d e f g h i j k l m n o p q r s t u v w x y z") + "Dans le <b>dictionnaire</b>, les mots sont rangés dans l'ordre de l'alphabet." },
      { t: "Comparer la 1re lettre", h: "On regarde la <b>1re lettre</b> de chaque mot :" + big("<b>b</b>allon · <b>l</b>apin · <b>t</b>ortue") + "b vient avant l, qui vient avant t." },
      { t: "Si la 1re lettre est pareille", h: "On regarde la <b>2e lettre</b>, puis la 3e…" + big("c<b>a</b>deau · c<b>h</b>at · c<b>i</b>tron") + "<small>Les accents ne comptent pas : é se range comme e.</small>" }
    ],
    gen: function (d) { return FR.alphaQ(d); }
  });

  var SYN = FR.rows([
    "content|joyeux|triste", "grand|immense|petit", "commencer|débuter|finir", "beau|joli|laid", "facile|simple|difficile",
    "crier|hurler|chuchoter", "calme|tranquille|agité", "gentil|aimable|méchant", "froid|glacé|chaud", "vieux|âgé|jeune",
    "fatigué|épuisé|reposé", "monter|grimper|descendre", "riche|fortuné|pauvre", "courageux|brave|peureux", "sombre|obscur|clair"
  ].join("\n"));
  add(C4, {
    id: "f5-synonymes", icon: "🔁", title: "Synonymes et contraires",
    desc: "Des mots de même sens ou de sens contraire.",
    learn: [
      { t: "Les synonymes", h: "Deux mots <b>synonymes</b> ont presque le <b>même sens</b> :" + big("content = joyeux") + "Ils servent à ne pas répéter toujours le même mot." },
      { t: "Les contraires", h: "Deux mots <b>contraires</b> (on dit aussi <b>antonymes</b>) ont un sens opposé :" + big("grand ≠ petit · monter ≠ descendre") }
    ],
    gen: function (d) { return FR.synQ(SYN, d); }
  });

  var FAM = FR.rows([
    "dent|dentiste,dentifrice,dentier|danse", "jardin|jardinier,jardinage,jardiner|jaune", "lait|laitier,laitage,allaiter|laid",
    "fleur|fleuriste,fleurir,fleuri|flèche", "chant|chanter,chanteur,chanson|champ", "glace|glacier,glaçon,glacé|glisser",
    "neige|neiger,enneigé,neigeux|nez", "froid|refroidir,froideur,froidement|frite", "long|longueur,allonger,longer|loup",
    "peur|peureux,apeuré,peureuse|pleurer", "terre|terrain,enterrer,terrestre|tirer"
  ].join("\n"));
  add(C4, {
    id: "f5-familles", icon: "👨‍👩‍👧", title: "Les familles de mots",
    desc: "Des mots construits à partir du même mot.",
    learn: [
      { t: "Une famille de mots", h: "Les mots d'une même <b>famille</b> sont construits à partir du même mot et ont un sens proche :" + big("dent → dentiste, dentifrice, dentier") },
      { t: "Attention aux intrus", h: "Certains mots se ressemblent, mais n'ont <b>aucun rapport de sens</b> :" + big("lait ≠ laid") + "Le laitier vend du lait ; « laid » veut dire « pas beau » : ce n'est pas la même famille." }
    ],
    gen: function (d) { return FR.famQ(FAM, d); }
  });
})();
