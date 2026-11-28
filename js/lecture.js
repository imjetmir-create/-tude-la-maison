/* Lecture (textes à lire) et phrases à remettre dans l'ordre, en français et en allemand,
   plus « ranger les nombres » en maths */
(function () {
  "use strict";
  var T = window.THEMES = window.THEMES || [];
  var R = U.R, pick = U.pick, big = U.big;
  function add(grade, subject, chapter, o) { o.grade = grade; o.subject = subject; o.chapter = chapter; T.push(o); }
  function find(id) { for (var i = 0; i < T.length; i++) if (T[i].id === id) return T[i]; }
  function p(s) { return "<p>" + s + "</p>"; }
  // texte allemand : on peut l'écouter (bouton 🔊), sans lecture automatique car il est long
  function deRead(g) { return function (d) { var q = g(d); q.sayT = DE.textOf(q.text); return q; }; }
  // banque « niveau|phrase » : on prend une phrase du niveau demandé
  function lv(bank, d) {
    var rows = bank.filter(function (r) { return +r.charAt(0) === d; });
    return pick(rows.length ? rows : bank).slice(2);
  }
  var READ_LEARN = [
    { t: "Lire, c'est comprendre", h: "1. Je lis le <b>titre</b> : de quoi va parler le texte ?<br>2. Je lis le texte <b>en entier</b>, tranquillement.<br>3. Je lis la <b>question</b>, puis je cherche la réponse <b>dans le texte</b>." },
    { t: "Les questions pièges", h: "Parfois, la réponse est écrite dans le texte. D'autres fois, il faut <b>deviner</b> grâce aux indices :" + big("« Le soleil revient… » → le bonhomme de neige va fondre") + "Si tu hésites, <b>relis</b> le passage : le texte reste affiché !" }
  ];
  var ORDER_LEARN = [
    { t: "Une phrase a un sens", h: "Une phrase, c'est des mots <b>dans le bon ordre</b> :" + big("chat · Le · dort → Le chat dort.") + "La phrase commence par une <b>majuscule</b> et finit par un <b>point</b>." },
    { t: "Comment faire", h: "1. Je cherche le mot avec une <b>majuscule</b> : c'est souvent le premier.<br>2. Je trouve <b>qui</b> fait l'action, puis le <b>verbe</b>.<br>3. J'ajoute la suite et je <b>relis</b> la phrase : est-ce qu'elle veut dire quelque chose ?<br><br>Avec la télécommande : choisis les mots un par un. <b>⌫ Effacer</b> enlève le dernier mot." }
  ];
  function orderSteps(s) { return ["Cherche le mot avec une majuscule pour commencer, puis le verbe.", "Relis la phrase à voix haute : elle doit avoir du sens.", "La phrase : <b>" + s.split("||")[0].replace(/_/g, " ") + "</b>"]; }
  function orderTheme(bank) {
    return function (d) { var s = lv(bank, d); return U.order("Remets les mots dans l'ordre pour faire une phrase.", s, { steps: orderSteps(s) }); };
  }

  /* ===================== Français 5H ===================== */
  var F5 = [
    { t: "La cabane dans le bois",
      x: p("Samedi matin, Noé et sa cousine Inès partent dans le bois derrière la maison. Ils veulent construire une cabane. Noé ramasse de grosses branches et Inès apporte une vieille couverture pour faire le toit.") +
         p("À midi, la cabane est presque finie, mais il commence à pleuvoir. Les deux enfants se glissent à l'intérieur : ils sont tout secs ! « Notre cabane est vraiment solide », dit Inès en riant.") +
         p("Quand la pluie s'arrête, ils rentrent à la maison pour manger une soupe bien chaude."),
      q: ["1|Qui accompagne Noé dans le bois ?|sa cousine Inès|son frère,sa maman,son ami Léo", "1|Que veulent construire les enfants ?|une cabane|un pont,un bonhomme de neige,un feu",
          "2|Avec quoi Inès fait-elle le toit ?|une vieille couverture|des feuilles,des planches,un parapluie", "2|Quel temps fait-il à midi ?|il pleut|il neige,il fait très chaud,il y a du vent",
          "3|Pourquoi Inès dit-elle que la cabane est solide ?|ils restent secs sous la pluie|elle est très grande,Noé l'a dit,elle est en pierre|Un indice dans le texte : « ils sont tout secs ! »",
          "3|Que font les enfants à la fin ?|ils mangent une soupe|ils dorment dans la cabane,ils jouent au ballon,ils démontent la cabane"],
      ev: ["Ils partent dans le bois.", "Ils construisent la cabane.", "Il commence à pleuvoir.", "Ils mangent une soupe."] },
    { t: "Le chat de Mme Rossier",
      x: p("Mme Rossier habite au troisième étage. Elle a un chat tout noir qui s'appelle Gribouille. Un soir, Gribouille ne rentre pas. Mme Rossier est très inquiète : elle le cherche dans l'escalier, dans la cave et dans le jardin.") +
         p("Le lendemain matin, la petite Léa, sa voisine, frappe à la porte. Elle tient Gribouille dans ses bras. « Il dormait dans notre garage ! » explique-t-elle.") +
         p("Pour la remercier, Mme Rossier offre à Léa un gros pot de confiture."),
      q: ["1|Comment s'appelle le chat ?|Gribouille|Minou,Caramel,Rossier", "1|De quelle couleur est le chat ?|noir|blanc,roux,gris",
          "2|Qui retrouve le chat ?|Léa|Mme Rossier,le facteur,un policier", "2|Que reçoit Léa pour la remercier ?|un pot de confiture|un chaton,des bonbons,un livre",
          "3|Où le chat a-t-il passé la nuit ?|dans le garage de Léa|dans la cave,sur le toit,dans le jardin", "3|Comment se sent Mme Rossier quand le chat ne rentre pas ?|inquiète|joyeuse,fâchée,fière|Le texte dit : « Mme Rossier est très inquiète ». Inquiète = elle se fait du souci."],
      ev: ["Gribouille ne rentre pas.", "Mme Rossier cherche partout.", "Léa frappe à la porte.", "Léa reçoit de la confiture."] },
    { t: "La course d'école",
      x: p("Aujourd'hui, c'est la course d'école ! La classe de Mme Clerc part en train jusqu'à Gruyères. Ensuite, les élèves montent à pied jusqu'au château.") +
         p("Il fait très chaud et Malik a oublié sa gourde. Son ami Théo partage son eau avec lui. Au château, le guide raconte l'histoire des comtes de Gruyères. Pour le pique-nique, tout le monde s'installe dans l'herbe.") +
         p("Le soir, dans le train du retour, beaucoup d'enfants s'endorment, fatigués mais contents."),
      q: ["1|Comment la classe va-t-elle à Gruyères ?|en train|en bus,à vélo,en voiture", "1|Où montent les élèves ?|au château|sur une montagne,à la piscine,au zoo",
          "2|Qu'a oublié Malik ?|sa gourde|son pique-nique,sa casquette,son sac", "2|Qui aide Malik ?|Théo|Mme Clerc,le guide,sa maman",
          "3|Pourquoi Malik a-t-il besoin d'aide ?|il fait chaud et il n'a pas d'eau|il est perdu,il a mal au pied,il a faim", "3|Comment sont les enfants le soir ?|fatigués mais contents|tristes,fâchés,malades"],
      ev: ["La classe part en train.", "Les élèves montent au château.", "Le guide raconte une histoire.", "Les enfants s'endorment."] },
    { t: "Le bonhomme de neige",
      x: p("Cette nuit, il a beaucoup neigé. Zoé et son petit frère Arthur courent dans le jardin. Ils roulent une grosse boule pour le ventre, puis une plus petite pour la tête.") +
         p("Arthur va chercher une carotte à la cuisine : ce sera le nez. Zoé ajoute deux cailloux pour les yeux et la vieille écharpe rouge de papa. « Il lui manque un chapeau ! » dit Arthur. Maman leur prête son bonnet de laine.") +
         p("Le bonhomme est magnifique. Mais l'après-midi, le soleil revient…"),
      q: ["1|Qui fait le bonhomme de neige avec Zoé ?|son petit frère Arthur|sa maman,son papa,sa copine", "1|Avec quoi font-ils le nez ?|une carotte|un caillou,une pomme,un bâton",
          "2|À qui est l'écharpe rouge ?|à papa|à maman,à Arthur,à Zoé", "2|Que prête maman ?|son bonnet de laine|son chapeau,ses gants,son écharpe",
          "3|Que va-t-il sans doute arriver au bonhomme ?|il va fondre|il va grandir,il va s'envoler,il va s'endormir|Le soleil revient : la neige va fondre. Le texte ne le dit pas : il faut le deviner !",
          "3|Pourquoi Arthur dit-il « Il lui manque un chapeau » ?|le bonhomme n'a rien sur la tête|il a froid,il veut un cadeau,il est fâché"],
      ev: ["Il neige pendant la nuit.", "Les enfants roulent deux boules.", "Arthur apporte une carotte.", "Maman prête son bonnet."] },
    { t: "Le gâteau d'anniversaire",
      x: p("Dimanche, c'est l'anniversaire de maman. Lucas veut lui faire une surprise avec son papa : un gâteau au chocolat ! Ils cassent les œufs, puis mélangent la farine, le sucre et le chocolat fondu. Lucas lèche la cuillère : c'est délicieux.") +
         p("Pendant que le gâteau cuit dans le four, ils préparent une carte avec un grand cœur. Quand maman rentre, Lucas allume les bougies et toute la famille chante « Joyeux anniversaire ».") +
         p("Maman a les larmes aux yeux : elle est très émue."),
      q: ["1|C'est l'anniversaire de qui ?|de maman|de Lucas,de papa,de la grand-mère", "1|Quel gâteau préparent-ils ?|un gâteau au chocolat|une tarte aux pommes,un gâteau aux fraises,des biscuits",
          "2|Avec qui Lucas prépare-t-il le gâteau ?|avec son papa|avec sa maman,tout seul,avec sa sœur", "2|Que préparent-ils pendant que le gâteau cuit ?|une carte|une soupe,un cadeau,des bougies",
          "3|Pourquoi maman a-t-elle les larmes aux yeux ?|elle est émue par la surprise|elle s'est fait mal,elle est triste,le gâteau est brûlé|« Émue » : elle est touchée, ce sont des larmes de joie."],
      ev: ["Ils cassent les œufs.", "Lucas lèche la cuillère.", "Ils préparent une carte.", "Maman rentre à la maison."] },
    { t: "Le petit escargot",
      x: p("Un petit escargot veut voir le sommet du grand chêne. Il monte lentement, très lentement, le long du tronc.") +
         p("Un merle se moque de lui : « Tu n'arriveras jamais en haut ! » L'escargot ne répond pas et continue à grimper. Il monte toute la journée, puis toute la nuit.") +
         p("Le lendemain matin, il arrive enfin au sommet. De là-haut, il voit la forêt, la rivière et même le village. « Ça valait la peine », pense-t-il, très fier."),
      q: ["1|Où l'escargot veut-il aller ?|au sommet du grand chêne|à la rivière,au village,dans le jardin", "1|Quel animal se moque de lui ?|un merle|un renard,un lapin,une fourmi",
          "2|Comment l'escargot monte-t-il ?|très lentement|très vite,en sautant,en volant", "2|Combien de temps lui faut-il pour arriver en haut ?|un jour et une nuit|une heure,une semaine,dix minutes",
          "3|Que veut nous apprendre cette histoire ?|il ne faut pas abandonner|il faut se moquer des autres,les merles sont méchants,il ne faut pas grimper aux arbres",
          "3|Comment se sent l'escargot à la fin ?|fier|triste,fâché,effrayé|Le texte dit : « très fier »."],
      ev: ["L'escargot commence à monter.", "Le merle se moque de lui.", "Il grimpe toute la nuit.", "Il arrive au sommet."] }
  ];
  var F5_ORDER = [
    "1|Le chat dort.", "1|Ma sœur aime les fraises.", "1|Nous allons à l'école.", "1|Tom mange une pomme.", "1|Il fait très froid.", "1|Les oiseaux chantent.", "1|Papa lit le journal.",
    "2|Le petit chat boit son lait.", "2|Papa prépare une bonne soupe.", "2|Les enfants jouent dans la cour.", "2|Ma grand-mère tricote une écharpe.", "2|Le facteur apporte une lettre.",
    "2|Nous regardons les étoiles le soir.", "2|Mon chien aime courir dans le parc.", "2|Les élèves écoutent une histoire.",
    "3|Est-ce que tu viens jouer avec moi ?", "3|Où as-tu caché le trésor ?", "3|Pendant les vacances, nous irons à la montagne.", "3|Demain matin, mon frère partira en train.",
    "3|Pourquoi le bébé pleure-t-il ?", "3|Quel est ton animal préféré ?", "3|Après l'école, je fais mes devoirs."
  ];
  add(5, "francais", "Lecture", { id: "f5-lecture", icon: "📖", title: "Comprendre un texte", desc: "Lire une petite histoire et répondre aux questions.", long: true, learn: READ_LEARN, gen: U.reading(F5).gen, sheet: U.reading(F5).sheet });
  add(5, "francais", "Lecture", { id: "f5-ordre", icon: "🧩", title: "Remettre la phrase en ordre", desc: "Ranger les mots pour faire une vraie phrase.", learn: ORDER_LEARN, gen: orderTheme(F5_ORDER) });

  /* ===================== Français 7H ===================== */
  var F7 = [
    { t: "Le message dans la bouteille",
      x: p("En vacances au bord du lac de Neuchâtel, Camille trouve une bouteille coincée entre deux rochers. À l'intérieur, il y a un papier roulé. Elle le déplie avec précaution : « Je m'appelle Julien, j'ai 10 ans et j'habite à Yverdon. Si tu trouves ce message, écris-moi ! »") +
         p("Le papier est daté d'il y a trois ans. Camille hésite : Julien se souvient-il encore de sa bouteille ? Le soir même, elle lui écrit pourtant une longue lettre et raconte où elle a trouvé le message.") +
         p("Deux semaines plus tard, une réponse arrive. Julien est fou de joie : il avait presque oublié son message et ne pensait plus recevoir de nouvelles."),
      q: ["1|Où Camille trouve-t-elle la bouteille ?|au bord du lac de Neuchâtel|au bord de la mer,dans une rivière,dans son jardin", "1|Où habite Julien ?|à Yverdon|à Neuchâtel,à Fribourg,à Genève",
          "2|Que demande Julien dans son message ?|qu'on lui écrive|qu'on lui rende la bouteille,qu'on lui téléphone,qu'on vienne le voir", "2|Combien de temps la réponse met-elle à arriver ?|deux semaines|trois ans,un jour,un mois",
          "3|Quel âge a Julien quand Camille trouve le message ?|13 ans|10 ans,3 ans,7 ans|Il avait 10 ans quand il a écrit le message, il y a 3 ans : 10 + 3 = 13 ans.",
          "3|Pourquoi Camille hésite-t-elle à écrire ?|le message a été écrit il y a trois ans|elle ne sait pas écrire,elle a peur de Julien,la bouteille est cassée",
          "3|Que ressent Julien en recevant la lettre ?|une grande joie|de la colère,de la peur,de l'ennui|« Fou de joie » veut dire très, très content."],
      ev: ["Camille trouve une bouteille.", "Elle lit le message.", "Elle écrit une lettre.", "Une réponse arrive."] },
    { t: "Les abeilles",
      x: p("Les abeilles vivent en colonies dans une ruche. Une colonie peut compter jusqu'à 50 000 abeilles, mais une seule reine. La reine pond les œufs : jusqu'à 2000 par jour au printemps !") +
         p("Les ouvrières, elles, font tout le reste : elles nettoient la ruche, nourrissent les larves et vont butiner les fleurs. En récoltant le nectar, elles transportent aussi le pollen d'une fleur à l'autre. C'est ainsi que les fleurs peuvent donner des fruits. Sans les abeilles, nous aurions beaucoup moins de pommes, de cerises ou de fraises.") +
         p("Malheureusement, les pesticides et la disparition des fleurs sauvages menacent aujourd'hui les abeilles."),
      q: ["1|Où vivent les abeilles ?|dans une ruche|dans un terrier,dans un nid d'oiseau,sous la terre", "1|Combien y a-t-il de reines dans une colonie ?|une seule|deux,cent,50 000",
          "2|Quel est le rôle de la reine ?|pondre les œufs|butiner les fleurs,nettoyer la ruche,défendre la ruche", "2|Qui va butiner les fleurs ?|les ouvrières|la reine,les larves,les fermiers",
          "3|Pourquoi les abeilles sont-elles utiles pour les fruits ?|elles transportent le pollen de fleur en fleur|elles mangent les insectes,elles arrosent les plantes,elles font pousser les feuilles",
          "3|Quel est le type de ce texte ?|un documentaire|un conte,une recette,une poésie|Il donne des informations vraies sur un sujet : c'est un texte documentaire.",
          "2|Qu'est-ce qui menace les abeilles ?|les pesticides|les fruits,les ruches,le miel"] },
    { t: "La panne",
      x: p("Le bus de la classe roulait vers le col du Jaun quand il s'est arrêté net au milieu d'un virage. « Le moteur ne veut plus démarrer », a annoncé le chauffeur, embarrassé. Dehors, il neigeait de plus en plus fort.") +
         p("M. Bapst, l'enseignant, a téléphoné au garage : la dépanneuse arriverait dans une heure. Les élèves commençaient à avoir froid. Alors une vieille dame qui habitait la ferme voisine est sortie avec un grand thermos. « Venez vous réchauffer chez moi ! »") +
         p("Toute la classe s'est serrée dans sa cuisine, autour du poêle, à boire du thé et à manger des biscuits. Quand la dépanneuse est enfin arrivée, plus personne n'avait envie de partir."),
      q: ["1|Où allait le bus ?|vers le col du Jaun|à la piscine,à Berne,à la gare", "1|Quel temps faisait-il ?|il neigeait|il faisait beau,il pleuvait,il y avait de l'orage",
          "2|Qui a téléphoné au garage ?|M. Bapst|le chauffeur,la vieille dame,un élève", "2|Qu'a apporté la vieille dame ?|un thermos|une couverture,une pelle,un téléphone",
          "3|Pourquoi la dame invite-t-elle la classe ?|les élèves ont froid|elle veut vendre ses biscuits,le bus est chez elle,elle connaît le chauffeur",
          "3|Que signifie « plus personne n'avait envie de partir » ?|les élèves se sentaient bien chez la dame|les élèves étaient malades,le bus était cassé pour toujours,la route était fermée",
          "3|Que veut dire « embarrassé » ?|gêné|content,fâché,endormi|Le chauffeur est gêné, mal à l'aise, parce que son bus est en panne."],
      ev: ["Le bus tombe en panne.", "M. Bapst téléphone au garage.", "Une vieille dame sort de la ferme.", "La dépanneuse arrive."] },
    { t: "Pâte à crêpes (pour 4 personnes)",
      x: p("<b>Ingrédients :</b> 250 g de farine, 4 œufs, 5 dl de lait, 1 pincée de sel, 2 cuillères à soupe de sucre, 50 g de beurre fondu.") +
         p("1. Verse la farine dans un saladier et fais un puits au milieu.<br>2. Ajoute les œufs, le sel et le sucre, puis mélange.<br>3. Verse le lait petit à petit en fouettant, pour éviter les grumeaux.<br>4. Ajoute le beurre fondu et laisse reposer la pâte une heure.<br>5. Fais cuire les crêpes dans une poêle chaude, une minute de chaque côté."),
      q: ["1|Pour combien de personnes est cette recette ?|4 personnes|2 personnes,6 personnes,10 personnes", "1|Combien d'œufs faut-il ?|4|2,5,250",
          "2|Que faut-il faire juste après avoir versé la farine ?|faire un puits au milieu|ajouter le lait,faire cuire la pâte,ajouter le beurre", "2|Combien de temps la pâte doit-elle reposer ?|une heure|une minute,dix minutes,une nuit",
          "3|Pourquoi verse-t-on le lait petit à petit ?|pour éviter les grumeaux|pour aller plus vite,pour que ce soit sucré,pour refroidir la pâte",
          "3|À quoi servent les numéros de 1 à 5 ?|à donner l'ordre des étapes|à compter les crêpes,à compter les ingrédients,à donner le prix",
          "2|Quel est le type de ce texte ?|une recette|un conte,une lettre,un poème"],
      ev: ["Verser la farine.", "Ajouter les œufs.", "Verser le lait.", "Laisser reposer.", "Faire cuire."] },
    { t: "Le loup et le chien",
      x: p("Un loup très maigre rencontre un chien gras et bien nourri. « Comment fais-tu pour être si beau ? » demande le loup. « C'est simple, répond le chien. Viens vivre avec moi chez mon maître. Tu garderas la maison et tu auras à manger tous les jours. »") +
         p("Le loup est tenté. Mais en chemin, il remarque que le cou du chien est pelé. « Qu'est-ce que c'est ? – Oh, rien : c'est le collier qui m'attache pendant la journée. – Tu es attaché ? Tu ne peux donc pas aller où tu veux ? »") +
         p("Le loup s'arrête net. « Garde ta nourriture. Je préfère avoir faim et rester libre ! » Et il repart en courant vers la forêt."),
      q: ["1|Comment est le loup au début ?|très maigre|très gros,blessé,endormi", "1|Que propose le chien au loup ?|de vivre chez son maître|de chasser avec lui,de partir en voyage,de manger dans la forêt",
          "2|Que doit faire le chien pour son maître ?|garder la maison|chasser les lapins,tirer un traîneau,ramener le journal", "2|Pourquoi le cou du chien est-il pelé ?|à cause du collier|à cause d'un loup,parce qu'il est vieux,parce qu'il a froid",
          "3|Pourquoi le loup refuse-t-il finalement ?|il veut rester libre|il n'aime pas la nourriture,il a peur du maître,il n'aime pas le chien",
          "3|Quelle est la morale de cette histoire ?|la liberté vaut plus que le confort|il faut toujours manger beaucoup,les chiens sont méchants,il ne faut pas parler aux inconnus",
          "3|Quel genre de texte est-ce ?|une fable|une recette,un documentaire,une lettre|Des animaux qui parlent et une leçon à retenir (la morale) : c'est une fable."],
      ev: ["Le loup rencontre le chien.", "Le chien l'invite chez son maître.", "Le loup voit le cou pelé.", "Le loup repart vers la forêt."] },
    { t: "Le tri des déchets",
      x: p("En Suisse, chaque habitant produit environ 700 kg de déchets par année. Heureusement, une grande partie peut être recyclée.") +
         p("Le verre est trié par couleur : brun, vert et blanc. Le papier et le carton sont récupérés pour fabriquer du nouveau papier. Les bouteilles en PET deviennent… de nouvelles bouteilles, ou même des vestes polaires ! Les épluchures de légumes vont au compost : elles deviennent de la terre pour le jardin.") +
         p("Les piles, elles, ne doivent jamais aller à la poubelle, car elles contiennent des produits dangereux : on les rapporte au magasin. Trier ses déchets, c'est un petit geste qui protège la planète."),
      q: ["1|Combien de déchets un habitant produit-il par année ?|environ 700 kg|environ 7 kg,environ 70 kg,environ 7000 kg", "1|Où vont les épluchures de légumes ?|au compost|à la poubelle,au magasin,dans le lac",
          "2|Comment trie-t-on le verre ?|par couleur|par taille,par poids,par prix", "2|Que peut-on fabriquer avec des bouteilles en PET ?|des vestes polaires|du papier,de la terre,des piles",
          "3|Pourquoi ne faut-il pas jeter les piles à la poubelle ?|elles contiennent des produits dangereux|elles sont trop lourdes,elles sentent mauvais,elles prennent trop de place",
          "3|Quel est le but de ce texte ?|informer et donner envie de trier|raconter une histoire drôle,vendre des poubelles,donner une recette"] }
  ];
  var F7_ORDER = [
    "1|Ma tante cultive des tomates dans son jardin.", "1|Le train pour Fribourg part à huit heures.", "1|Les élèves écoutent attentivement la maîtresse.||Les élèves écoutent la maîtresse attentivement.",
    "1|Mon cousin habite dans une ferme près de Bulle.", "1|Les montagnes sont couvertes de neige.",
    "2|Hier soir, nous avons regardé un film passionnant.", "2|Le chat noir de la voisine dort sur le toit.", "2|Pourquoi n'es-tu pas venu à la fête ?",
    "2|Les pompiers ont éteint le feu très rapidement.", "2|Ma grand-mère nous raconte souvent des histoires.||Ma grand-mère nous raconte des histoires souvent.",
    "3|Quand il pleut, les escargots sortent de leur cachette.", "3|Les abeilles fabriquent le miel avec le nectar des fleurs.", "3|Le gardien du musée ferme les portes à dix-huit heures.",
    "3|Ne touche surtout pas à ce fil électrique !", "3|Si tu te dépêches, tu attraperas le dernier bus.", "3|Depuis combien de temps apprends-tu le piano ?"
  ];
  add(7, "francais", "Lecture", { id: "f7-lecture", icon: "📖", title: "Comprendre un texte", desc: "Récits, documentaires, recettes et fables.", long: true, learn: READ_LEARN.concat([
    { t: "Les types de textes", h: "<b>Récit</b> : il raconte une histoire.<br><b>Documentaire</b> : il donne des informations vraies.<br><b>Recette</b> : il explique comment faire, étape par étape.<br><b>Fable</b> : des animaux qui parlent et une <b>morale</b> (une leçon)." }
  ]), gen: U.reading(F7).gen, sheet: U.reading(F7).sheet });
  add(7, "francais", "Lecture", { id: "f7-ordre", icon: "🧩", title: "Remettre la phrase en ordre", desc: "Ranger les mots, même dans les longues phrases.", learn: ORDER_LEARN, gen: orderTheme(F7_ORDER) });

  /* ===================== Allemand 5H ===================== */
  var D5 = [
    { t: "Hallo!",
      x: p("Hallo! Ich heisse Tom. Ich bin neun Jahre alt. Ich wohne in Freiburg.") + p("Ich habe einen Hund. Er heisst Rex. Rex ist braun und sehr lustig. Ich spiele gern mit Rex im Park."),
      q: ["1|Comment s'appelle le garçon ?|Tom|Rex,Freiburg,Leo", "1|Quel âge a Tom ?|9 ans|10 ans,8 ans,7 ans|« neun » = neuf.", "1|Où habite Tom ?|à Fribourg|à Berne,à Zurich,à Bâle",
          "2|Quel animal a Tom ?|un chien|un chat,un lapin,un poisson|der Hund = le chien.", "2|De quelle couleur est Rex ?|brun|noir,blanc,gris|braun = brun.",
          "3|Où Tom joue-t-il avec Rex ?|au parc|à l'école,dans sa chambre,à la piscine", "3|Comment est Rex ?|très drôle|très méchant,très petit,très vieux|lustig = drôle."] },
    { t: "Meine Familie",
      x: p("Das ist Mia. Ihr Vater heisst Marco und ihre Mutter heisst Sara. Mia hat einen Bruder. Er heisst Luca und er ist sechs Jahre alt.") + p("Mia hat keine Schwester. Die Familie hat eine Katze. Mias Lieblingsfarbe ist Blau."),
      q: ["1|Comment s'appelle la maman de Mia ?|Sara|Marco,Luca,Mia|die Mutter = la mère.", "1|Comment s'appelle le frère de Mia ?|Luca|Marco,Sara,Tom|der Bruder = le frère.",
          "2|Quel âge a Luca ?|6 ans|7 ans,9 ans,16 ans|« sechs » = six.", "2|Mia a-t-elle une sœur ?|non|oui,on ne sait pas|« keine Schwester » = pas de sœur.",
          "2|Quel animal a la famille ?|un chat|un chien,un oiseau,un cheval|die Katze = le chat.", "3|Quelle est la couleur préférée de Mia ?|le bleu|le rouge,le vert,le jaune|Lieblingsfarbe = couleur préférée."] },
    { t: "Montag",
      x: p("Heute ist Montag. Es ist kalt und es schneit. Lisa geht in die Schule. In der Schule hat sie Deutsch und Mathe.") + p("Am Mittag isst Lisa Pizza. Lecker! Am Nachmittag spielt sie mit Emma im Schnee."),
      q: ["1|Quel jour est-ce ?|lundi|mardi,dimanche,samedi", "1|Quel temps fait-il ?|il neige|il pleut,il fait chaud,il y a du soleil|« es schneit » = il neige.",
          "2|Où va Lisa ?|à l'école|au zoo,à la piscine,chez sa grand-mère", "2|Que mange Lisa à midi ?|de la pizza|des pâtes,une soupe,du poulet",
          "3|Que veut dire « Lecker ! » ?|délicieux !|beurk !,au secours !,bonne nuit !", "3|Que fait Lisa l'après-midi ?|elle joue dans la neige|elle dort,elle fait ses devoirs,elle regarde la télé"],
      ev: ["Lisa geht in die Schule.", "Lisa isst Pizza.", "Lisa spielt im Schnee."] },
    { t: "Im Zoo",
      x: p("Heute sind Leo und Papa im Zoo. Sie sehen einen Elefanten. Er ist sehr gross und grau. Die Affen sind lustig.") + p("Leo mag die Pinguine am liebsten. Die Pinguine sind schwarz und weiss. Sie schwimmen schnell. Am Ende kauft Papa ein Eis für Leo."),
      q: ["1|Où sont Leo et papa ?|au zoo|au cirque,à la ferme,au parc", "1|De quelle couleur est l'éléphant ?|gris|brun,blanc,noir|grau = gris.",
          "2|Comment sont les singes ?|drôles|tristes,grands,méchants|die Affen = les singes · lustig = drôle.", "2|Quels animaux Leo préfère-t-il ?|les pingouins|les singes,les éléphants,les lions|« am liebsten » = ce qu'il préfère.",
          "3|Que font les pingouins ?|ils nagent vite|ils dorment,ils mangent,ils volent|schwimmen = nager · schnell = vite.", "3|Qu'achète papa à la fin ?|une glace|un ballon,une peluche,un sandwich|das Eis = la glace."],
      ev: ["Sie sehen einen Elefanten.", "Die Affen sind lustig.", "Papa kauft ein Eis."] }
  ];
  // phrase | traduction
  var D5_ORDER = [
    "1|Ich heisse Lena.|Je m'appelle Lena.", "1|Wie heisst du?|Comment t'appelles-tu ?", "1|Das ist mein Hund.|C'est mon chien.", "1|Wo wohnst du?|Où habites-tu ?", "1|Der Apfel ist rot.|La pomme est rouge.",
    "2|Ich bin neun Jahre alt.|J'ai neuf ans.", "2|Ich wohne in Freiburg.|J'habite à Fribourg.", "2|Meine Katze ist schwarz.|Mon chat est noir.", "2|Hast du einen Bruder?|As-tu un frère ?", "2|Wir spielen im Park.|Nous jouons au parc.",
    "3|Ich esse gern Pizza.|J'aime manger de la pizza.", "3|Mein Bruder hat ein Velo.|Mon frère a un vélo.", "3|Kommst du heute zu mir?|Tu viens chez moi aujourd'hui ?", "3|Wie alt ist deine Schwester?|Quel âge a ta sœur ?", "3|Ich habe zwei Katzen.|J'ai deux chats."
  ];
  add(5, "allemand", "Lire en allemand", { id: "d5-lesen", icon: "📖", title: "Lire un petit texte", desc: "Comprendre une courte histoire en allemand.", long: true, learn: [
    { t: "Lire en allemand", h: "Tu n'as pas besoin de comprendre <b>tous</b> les mots !<br>1. Cherche les mots que tu <b>connais</b> : Hund, Katze, Schule…<br>2. Cherche les <b>noms</b> : ils ont une majuscule.<br>3. Lis la question en français, puis retrouve l'endroit du texte qui en parle." },
    { t: "Petits mots utiles", h: "<b>ist</b> = est · <b>hat</b> = a · <b>und</b> = et<br><b>heisst</b> = s'appelle · <b>wohnt</b> = habite<br><b>gern</b> = volontiers (j'aime bien) · <b>sehr</b> = très" }
  ], gen: deRead(U.reading(D5).gen), sheet: U.reading(D5).sheet });
  add(5, "allemand", "Lire en allemand", { id: "d5-saetze", icon: "🧩", title: "Construire une phrase", desc: "Remettre les mots allemands dans l'ordre.", learn: [
    { t: "Une phrase allemande", h: "Comme en français, on commence par <b>qui</b>, puis le <b>verbe</b> :" + big("Ich · heisse · Lena.") + "Attention : en allemand, tous les <b>noms</b> ont une majuscule (Hund, Katze, Apfel) ! Le premier mot n'est donc pas toujours le seul avec une majuscule." },
    { t: "Les questions", h: "Le mot interrogatif vient en premier, puis le verbe :" + big("Wo · wohnst · du?") + "Sans mot interrogatif, on commence par le verbe :" + big("Hast · du · einen Bruder?") }
  ], gen: function (d) {
    var r = lv(D5_ORDER, d).split("|");
    return DE.tag(U.order("Remets les mots dans l'ordre.<br><small>(" + r[1] + ")</small>", r[0], { steps: ["Commence par qui (Ich, Mein Bruder…) ou par le mot interrogatif (Wie, Wo…).", "Le verbe vient juste après.", "La phrase : <b>" + r[0] + "</b> = " + r[1]] }), null, r[0]);
  } });

  /* ===================== Allemand 7H ===================== */
  var D7 = [
    { t: "Ein Brief aus dem Skilager",
      x: p("Zermatt, den 3. Februar") + p("Liebe Oma,<br>ich bin jetzt im Skilager in Zermatt. Das Wetter ist super: Die Sonne scheint, aber es ist sehr kalt, minus zehn Grad! Am Morgen fahren wir Ski, am Nachmittag spielen wir im Schnee oder wir gehen ins Hallenbad.") +
         p("Das Essen ist gut, aber ich vermisse deine Rösti. Mein Zimmer teile ich mit Ben und Samuel. Am Freitag fahre ich nach Hause.") + p("Viele liebe Grüsse<br>dein Noah"),
      q: ["1|Qui écrit la lettre ?|Noah|Oma,Ben,Samuel", "1|À qui Noah écrit-il ?|à sa grand-mère|à sa maman,à son ami,à son professeur|Oma = grand-maman.",
          "2|Quelle température fait-il ?|moins 10 degrés|plus 10 degrés,0 degré,moins 3 degrés|« minus zehn Grad »", "2|Que font les enfants le matin ?|du ski|de la natation,leurs devoirs,une promenade|« Am Morgen fahren wir Ski »",
          "3|Que veut dire « ich vermisse deine Rösti » ?|tes röstis me manquent|je déteste tes röstis,je mange tes röstis,je fais des röstis",
          "3|Quand Noah rentre-t-il à la maison ?|vendredi|lundi,dimanche,le 3 février|Freitag = vendredi.", "2|Avec qui Noah partage-t-il sa chambre ?|avec Ben et Samuel|avec Oma,tout seul,avec son frère"] },
    { t: "Mein Tag",
      x: p("Ich heisse Elias und ich bin zwölf Jahre alt. Ich stehe um halb sieben auf. Zum Frühstück esse ich Müesli und ich trinke Orangensaft.") +
         p("Um Viertel nach sieben fahre ich mit dem Velo zur Schule. Mein Lieblingsfach ist Sport, aber Französisch finde ich schwierig.") +
         p("Nach der Schule mache ich meine Hausaufgaben. Am Abend spiele ich Gitarre. Um neun Uhr gehe ich ins Bett."),
      q: ["1|Quel âge a Elias ?|12 ans|11 ans,20 ans,2 ans|zwölf = douze.", "1|Que mange Elias au petit-déjeuner ?|du müesli|du pain,des œufs,une tartine",
          "2|À quelle heure Elias se lève-t-il ?|6 h 30|7 h 30,6 h 00,7 h 15|Attention : « halb sieben » = la moitié avant 7 heures, donc 6 h 30.", "2|Comment va-t-il à l'école ?|à vélo|en bus,à pied,en voiture|das Velo = le vélo.",
          "2|Quelle est sa branche préférée ?|le sport|le français,les maths,la musique|Lieblingsfach = branche préférée.", "3|Que pense Elias du français ?|c'est difficile|c'est facile,c'est ennuyeux,c'est sa branche préférée|schwierig = difficile.",
          "3|À quelle heure part-il à l'école ?|7 h 15|7 h 45,6 h 30,7 h 00|« Viertel nach sieben » = un quart d'heure après 7 heures."],
      ev: ["Ich stehe auf.", "Ich fahre zur Schule.", "Ich mache meine Hausaufgaben.", "Ich gehe ins Bett."] },
    { t: "Im Restaurant",
      x: p("<b>Kellner:</b> Guten Tag! Was möchtet ihr?<br><b>Mama:</b> Ich nehme einen Salat und ein Mineralwasser, bitte.<br><b>Jan:</b> Ich möchte eine Pizza mit Schinken.<br><b>Kellner:</b> Und zu trinken?<br><b>Jan:</b> Einen Apfelsaft, bitte.") +
         p("…<br><b>Mama:</b> Die Rechnung, bitte!<br><b>Kellner:</b> Das macht zweiundvierzig Franken.<br><b>Mama:</b> Hier sind fünfzig Franken. Stimmt so!"),
      q: ["1|Que commande maman à manger ?|une salade|une pizza,une soupe,des pâtes", "1|Que boit Jan ?|un jus de pomme|un jus d'orange,de l'eau,un sirop|der Apfelsaft = le jus de pomme.",
          "2|Quelle pizza Jan choisit-il ?|une pizza au jambon|une pizza au fromage,une pizza aux champignons,une pizza au thon|der Schinken = le jambon.",
          "2|Combien coûte le repas ?|42 francs|24 francs,50 francs,12 francs|zweiundvierzig : on dit d'abord « zwei » (2), puis « vierzig » (40) → 42.",
          "3|Que demande maman avec « Die Rechnung, bitte » ?|l'addition|le menu,du pain,un dessert", "3|Combien maman laisse-t-elle de pourboire ?|8 francs|2 francs,5 francs,10 francs|50 − 42 = 8 francs. « Stimmt so » = gardez la monnaie.",
          "2|Qui est « der Kellner » ?|le serveur|le cuisinier,le papa,le client"] },
    { t: "Wo ist die Post?",
      x: p("<b>Tourist:</b> Entschuldigung, wo ist die Post?<br><b>Sofia:</b> Die Post? Das ist nicht weit. Gehen Sie hier geradeaus bis zur Kirche. Dann gehen Sie links. Die Post ist neben der Bäckerei.<br><b>Tourist:</b> Ist es weit?<br><b>Sofia:</b> Nein, nur fünf Minuten zu Fuss.<br><b>Tourist:</b> Vielen Dank!<br><b>Sofia:</b> Bitte, gern geschehen!"),
      q: ["1|Que cherche le touriste ?|la poste|la gare,l'église,la boulangerie", "1|Que veut dire « Entschuldigung » ?|excusez-moi|merci,au revoir,bonjour",
          "2|Que veut dire « geradeaus » ?|tout droit|à gauche,à droite,derrière", "2|De quel côté faut-il tourner à l'église ?|à gauche|à droite,on ne tourne pas,on fait demi-tour|links = à gauche.",
          "3|Où est la poste ?|à côté de la boulangerie|derrière l'église,en face de la gare,dans la boulangerie|neben = à côté de.", "3|Combien de temps faut-il à pied ?|5 minutes|15 minutes,50 minutes,une heure|« zu Fuss » = à pied."],
      ev: ["Gehen Sie geradeaus.", "Gehen Sie links.", "Die Post ist neben der Bäckerei."] },
    { t: "Am Wochenende",
      x: p("Am Samstag fahren Lara und ihr Bruder Jonas mit dem Velo zum See. Es ist warm und die Sonne scheint. Am See essen sie Sandwiches und Jonas spielt Frisbee. Lara möchte nicht schwimmen, denn das Wasser ist sehr kalt.") +
         p("Am Sonntag regnet es. Die Familie bleibt zu Hause und spielt Karten. Lara gewinnt dreimal!"),
      q: ["1|Où vont Lara et Jonas samedi ?|au lac|à la montagne,en ville,à la piscine|der See = le lac.", "1|Comment y vont-ils ?|à vélo|en train,en bus,à pied",
          "2|Quel temps fait-il samedi ?|il fait chaud et beau|il pleut,il neige,il y a du vent", "2|Pourquoi Lara ne veut-elle pas nager ?|l'eau est très froide|elle est malade,elle n'a pas de maillot,elle a peur des poissons|denn = car.",
          "3|Que fait la famille dimanche ?|elle joue aux cartes|elle va au lac,elle fait du vélo,elle va au cinéma|« Am Sonntag regnet es » : il pleut, alors on reste à la maison.", "3|Combien de fois Lara gagne-t-elle ?|trois fois|une fois,deux fois,jamais|dreimal = trois fois."],
      ev: ["Sie fahren zum See.", "Sie essen Sandwiches.", "Am Sonntag regnet es.", "Lara gewinnt dreimal."] }
  ];
  add(7, "allemand", "Lire en allemand", { id: "d7-lesen", icon: "📖", title: "Lire un texte", desc: "Lettres, dialogues et récits en allemand.", long: true, learn: [
    { t: "Lire en allemand", h: "Tu n'as pas besoin de comprendre <b>tous</b> les mots !<br>1. Regarde le <b>type</b> de texte : une lettre, un dialogue, un récit ?<br>2. Repère les mots que tu <b>connais</b> et les <b>noms</b> (majuscules).<br>3. Lis la question, puis cherche l'endroit du texte qui en parle." },
    { t: "Attention aux pièges", h: "<b>halb sieben</b> = 6 h 30 (et pas 7 h 30 !)<br><b>zweiundvierzig</b> = 42 (on lit les unités d'abord)<br><b>denn</b> = car · <b>aber</b> = mais · <b>dann</b> = ensuite" }
  ], gen: deRead(U.reading(D7).gen), sheet: U.reading(D7).sheet });

  // « L'ordre des mots » : une question sur deux, on construit soi-même la phrase
  var D7_ORDER = [
    "Heute spiele ich Fussball.", "Am Montag gehe ich ins_Schwimmbad.", "Ich kann gut schwimmen.", "Morgen fahren wir nach_Bern.", "Ich möchte ein_Eis essen.",
    "Spielst du gern Tennis?||Spielst du Tennis gern?", "Nach_der_Schule mache ich meine_Hausaufgaben.", "Wir müssen jetzt nach_Hause gehen.", "Im_Winter fahre ich Ski.",
    "Am_Wochenende besuche ich meine_Oma.", "Er will einen_Hund haben.", "Was machst du heute?", "Dann essen wir Pizza.", "Kannst du mir helfen?"
  ];
  var satz = find("d7-satz");
  if (satz) {
    var g0 = satz.gen;
    satz.gen = function (d) {
      if (d === 1 || R(0, 1)) return g0(d);
      var s = pick(D7_ORDER);
      return DE.tag(U.order("Construis la phrase : le verbe conjugué en <b>2e position</b> !", s, { steps: ["Trouve le verbe conjugué : il va en 2e position (en 1re dans une question sans mot interrogatif).", "S'il y a un 2e verbe (infinitif), il va tout à la fin.", "La phrase : <b>" + s.split("||")[0].replace(/_/g, " ") + "</b>"] }), null, s.split("||")[0].replace(/_/g, " "));
    };
  }

  /* ===================== Maths : ranger les nombres ===================== */
  function distinct(n, f) { var out = [], tries = 0; while (out.length < n && tries++ < 200) { var v = f(); if (out.indexOf(v) < 0) out.push(v); } return out; }
  function rangeQ(nums) {
    var sorted = nums.slice().sort(function (a, b) { return a - b; }).map(U.fmt);
    return U.orderItems("Range ces nombres du <b>plus petit</b> au <b>plus grand</b>.", sorted, "", {
      sep: " < ", steps: ["Compare d'abord le nombre de chiffres (ou ce qui est avant la virgule).", "Si c'est pareil, compare chiffre par chiffre, de gauche à droite.", "L'ordre : <b>" + sorted.join(" &lt; ") + "</b>"]
    });
  }
  var m5 = find("m5-comparer");
  if (m5) {
    var g5 = m5.gen;
    m5.gen = function (d) {
      if (d === 1 || R(0, 2)) return g5(d);
      // nombres proches qui se ressemblent (mêmes milliers) : le vrai piège
      var base = d === 2 ? R(1, 9) * 100 : R(1, 9) * 1000, span = d === 2 ? 100 : 1000;
      return rangeQ(distinct(d === 2 ? 4 : 5, function () { return base + R(0, span - 1); }));
    };
  }
  var m7 = find("m7-comparer");
  if (m7) {
    var g7 = m7.gen;
    m7.gen = function (d) {
      if (d === 1 || R(0, 2)) return g7(d);
      var e = R(1, 9);
      // 3,5 · 3,45 · 3,405 · 3,054 : les décimaux de longueurs différentes
      return rangeQ(distinct(d === 2 ? 4 : 5, function () { var k = R(1, 3), m = Math.pow(10, k); return U.round(e + R(1, m - 1) / m); }));
    };
  }
})();
