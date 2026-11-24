/* École TV : écrans, navigation à la télécommande, progression */
(function () {
  "use strict";
  var THEMES = window.THEMES || [];
  var PROFILES = [
    { id: "artiste", name: "L'Artiste", cls: "5H", grade: 5, icon: "🎨", color: "#ff8a5c" },
    { id: "tempetueux", name: "Le Tempétueux", cls: "7H", grade: 7, icon: "⚡", color: "#8b9bff" }
  ];
  var SUBJECTS = [
    { id: "maths", name: "Mathématiques", icon: "🔢" },
    { id: "francais", name: "Français", icon: "📚" },
    { id: "allemand", name: "Allemand", icon: "💬" }
  ];
  var QUIZ_LEN = 10, SHEET_LEN = 6;
  var COLORS = ["red", "green", "yellow", "blue"];
  var PRAISE = ["✅ Bravo !", "🎉 Super !", "⭐ Génial !", "👏 Excellent !", "🚀 Trop fort !", "💯 Parfait !", "🌟 Bien vu !"];
  var OOPS = ["❌ Pas tout à fait…", "🤔 Presque !", "💪 On apprend en se trompant !"];
  // Médailles des épreuves : pourcentage minimum de bonnes réponses
  var MEDALS = [["🥉", "Médaille de bronze", 0.6], ["🥈", "Médaille d'argent", 0.75], ["🥇", "Médaille d'or", 0.9]];
  function medalFor(pct) { var m = null; MEDALS.forEach(function (x) { if (pct >= x[2] - 1e-9) m = x; }); return m; }

  /* ---------- Sauvegarde (dans la mémoire du navigateur de la TV) ---------- */
  var KEY = "ecole-tv-v1", data = { p: {} };
  try { var raw = localStorage.getItem(KEY); if (raw) data = JSON.parse(raw) || data; } catch (e) {}
  if (!data.p) data.p = {};
  function save() { try { localStorage.setItem(KEY, JSON.stringify(data)); } catch (e) {} }
  function prog(pid, tid) {
    var p = data.p[pid] || (data.p[pid] = { t: {} });
    if (!p.t) p.t = {};
    return p.t[tid] || (p.t[tid] = { stars: 0, learn: false, ex: false, sheet: false, quiz: 0 });
  }
  function totalStars(pid) {
    var p = data.p[pid], n = 0;
    if (p && p.t) for (var k in p.t) n += p.t[k].stars || 0;
    return n;
  }

  function exams(pid) { var p = data.p[pid] || (data.p[pid] = { t: {} }); return p.x || (p.x = {}); }
  function profile(id) { for (var i = 0; i < PROFILES.length; i++) if (PROFILES[i].id === id) return PROFILES[i]; }
  function theme(id) { for (var i = 0; i < THEMES.length; i++) if (THEMES[i].id === id) return THEMES[i]; }
  function themesFor(grade, sub) { return THEMES.filter(function (t) { return t.grade === grade && t.subject === sub; }); }
  function stars(n) { var s = ""; for (var i = 0; i < 3; i++) s += i < n ? "★" : "☆"; return '<span class="st">' + s + "</span>"; }
  function esc(s) { return String(s).replace(/"/g, "&quot;"); }

  /* ---------- Navigation entre écrans ---------- */
  var app = document.getElementById("app"), S = null, hist = [], focusKey = null, timer = null;
  function go(state) { if (S) hist.push({ s: S, f: focusKey }); S = state; focusKey = null; render(); }
  function back() {
    clearTimeout(timer);
    if (!hist.length) return;
    var h = hist.pop(); S = h.s; focusKey = h.f; render();
  }

  function btn(label, action, o) {
    o = o || {};
    return '<div class="f ' + (o.cls || "btn") + (o.def ? " def" : "") + '" data-a="' + esc(action) + '" data-k="' + esc(o.k || action) + '">' + label + "</div>";
  }

  function render() {
    clearTimeout(timer);
    var html = VIEWS[S.v]();
    var p = S.pid ? profile(S.pid) : null, crumbs = '<span class="logo">🏫 École TV</span>';
    if (p) crumbs += ' <span class="sep">›</span> <span style="color:' + p.color + '">' + p.icon + " " + p.name + "</span>";
    if (S.tid) crumbs += ' <span class="sep">›</span> ' + theme(S.tid).title;
    else if (S.exam) crumbs += ' <span class="sep">›</span> ' + S.exam.title;
    // Boutons toujours visibles en haut : revenir à l'écran précédent ou à l'accueil
    var nav = S.v === "home" ? "" : '<div class="nav">' + btn("⬅ Retour", "back", { cls: "btn nav", k: "nav-back" }) + btn("🏠 Accueil", "home", { cls: "btn nav", k: "nav-home" }) + "</div>";
    app.innerHTML = '<div class="top"><div class="crumbs">' + crumbs + '</div><div class="total">' + (p ? "⭐ " + totalStars(p.id) : "") + "</div>" + nav +
      '</div><div class="main" id="main">' + html + '</div><div id="toast"></div>';
    var el = (focusKey && app.querySelector('[data-k="' + focusKey + '"]')) || app.querySelector(".f.def") || app.querySelector(".f");
    if (el) setFocus(el);
  }

  function setFocus(el) {
    var old = app.querySelectorAll(".f.focus");
    for (var i = 0; i < old.length; i++) old[i].className = old[i].className.replace(" focus", "");
    el.className += " focus";
    focusKey = el.getAttribute("data-k");
    var m = document.getElementById("main");
    if (m && m.contains(el)) {
      var r = el.getBoundingClientRect(), mr = m.getBoundingClientRect();
      if (r.bottom > mr.bottom - 10) m.scrollTop += r.bottom - mr.bottom + 30;
      else if (r.top < mr.top + 10) m.scrollTop -= mr.top - r.top + 30;
    }
  }
  function current() { return app.querySelector(".f.focus"); }

  // Déplacement « spatial » : on va vers le bouton le plus proche dans la direction choisie
  function move(dir) {
    var cur = current(), els = app.querySelectorAll(".f");
    if (!cur) { if (els[0]) setFocus(els[0]); return; }
    var a = cur.getBoundingClientRect(), ax = a.left + a.width / 2, ay = a.top + a.height / 2, best = null, bd = Infinity;
    for (var i = 0; i < els.length; i++) {
      var e = els[i];
      if (e === cur) continue;
      var b = e.getBoundingClientRect(), bx = b.left + b.width / 2, by = b.top + b.height / 2, dx = bx - ax, dy = by - ay, main, side;
      if (dir === "left") { if (b.right > a.left + 4 && dx > -4) continue; main = -dx; side = Math.abs(dy); }
      else if (dir === "right") { if (b.left < a.right - 4 && dx < 4) continue; main = dx; side = Math.abs(dy); }
      else if (dir === "up") { if (b.bottom > a.top + 4 && dy > -4) continue; main = -dy; side = Math.abs(dx); }
      else { if (b.top < a.bottom - 4 && dy < 4) continue; main = dy; side = Math.abs(dx); }
      if (main <= 0) continue;
      var dist = main + side * 2.5;
      if (dist < bd) { bd = dist; best = e; }
    }
    if (best) setFocus(best);
  }

  function toast(msg) {
    var t = document.getElementById("toast");
    if (!t) return;
    t.innerHTML = msg; t.className = "on";
    setTimeout(function () { if (t) t.className = ""; }, 2200);
  }

  /* ---------- Questions ---------- */
  // w : question « à écrire sur la feuille » si le thème en propose
  function newQ(t, d, seen, w) {
    var q, tries = 0, g = w && t.write ? t.write : t.gen;
    do { q = g(d); tries++; } while (seen && seen[q.text + (q.choices || "")] && tries < 15);
    if (seen) seen[q.text + (q.choices || "")] = 1;
    return q;
  }
  function answerText(q) { return q.type === "write" ? q.answer : q.type === "choice" ? q.choices[q.answer] : U.fmt(q.answer) + (q.unit ? " " + q.unit : ""); }
  function check(q, given) {
    if (q.type === "choice") return given === q.answer;
    var v = parseFloat(String(given).replace(",", "."));
    return !isNaN(v) && Math.abs(v - q.answer) < 1e-6;
  }
  function stepsHTML(q, upto) {
    var n = upto === undefined ? q.steps.length : upto, h = "";
    var vis = q.vis ? (n > 0 ? q.vis[Math.min(n, q.vis.length) - 1] : "") : (n > 0 && q.visual ? q.visual : "");
    if (upto === undefined && q.visual) vis = q.visual;
    if (vis) h += '<div class="vis">' + vis + "</div>";
    h += '<ol class="steps">';
    for (var i = 0; i < n; i++) h += "<li>" + q.steps[i] + "</li>";
    return h + "</ol>";
  }

  /* ---------- Écrans ---------- */
  var VIEWS = {
    home: function () {
      var h = '<div class="hero"><h1>🏫 École TV</h1><div class="sub">Qui vient apprendre aujourd\'hui ?</div><div class="cards">';
      PROFILES.forEach(function (p, i) {
        h += btn('<div class="av" style="background:' + p.color + '">' + p.icon + '</div><div class="pn">' + p.name + '</div><div class="pc">' + p.cls + " · ⭐ " + totalStars(p.id) + "</div>",
          "profile|" + p.id, { cls: "card prof", def: i === 0 });
      });
      h += btn('<div class="av big"><svg viewBox="0 0 100 100" style="width:11vh;height:11vh" fill="#fbfaf6" stroke="#1a1a1a" stroke-width="4" stroke-linejoin="round">' +
        '<path d="M30 79 C29 63 39 55 46 47 C38 50 30 53 25 47 C22 41 33 30 39 24 L41 12 L50 21 C67 23 77 41 74 79 Z"/><circle cx="44" cy="32" r="3.5" fill="#1a1a1a" stroke="none"/>' +
        '<rect x="20" y="80" width="60" height="11" rx="3"/></svg></div><div class="pn">Échecs</div><div class="pc">Jouer et apprendre</div>', "link|echecs/", { cls: "card" });
      return h + '</div><div class="hint">Flèches pour choisir · <b>OK</b> pour valider · <b>Retour</b> pour revenir</div></div>';
    },
    subjects: function () {
      var p = profile(S.pid), h = '<div class="hero"><h1>' + p.icon + " Salut " + p.name + " !</h1><div class=\"sub\">Que veux-tu travailler ?</div><div class=\"cards\">";
      SUBJECTS.forEach(function (s, i) {
        var n = themesFor(p.grade, s.id).length, fx = exams(p.id)[s.id + "|final|"];
        h += btn('<div class="av big">' + s.icon + '</div><div class="pn">' + s.name + '</div><div class="pc">' + (s.soon ? "Bientôt !" : n + " thèmes" + (fx && fx.medal ? " · " + fx.medal : "")) + "</div>",
          "subject|" + s.id, { cls: "card" + (s.soon ? " soon" : ""), def: i === 0 });
      });
      return h + "</div></div>";
    },
    themes: function () {
      var p = profile(S.pid), list = themesFor(p.grade, S.sub), chap = null, first = true, X = exams(S.pid), got = 0;
      list.forEach(function (t) { got += prog(S.pid, t.id).stars; });
      var fx = X[S.sub + "|final|"], pct = Math.round(100 * got / (list.length * 3));
      var h = '<div class="shead"><div class="sprog">⭐ ' + got + " / " + list.length * 3 + ' étoiles<div class="pbar"><i style="width:' + pct + '%"></i></div></div>' +
        btn("🏆 Épreuve finale <small>30 questions sur tout le programme</small>" + (fx && fx.medal ? " " + fx.medal : ""), "exam|final", { cls: "btn final", k: "final" }) + "</div>";
      list.forEach(function (t) {
        if (t.chapter !== chap) {
          if (chap !== null) h += "</div>";
          chap = t.chapter;
          var cx = X[S.sub + "|chap|" + chap];
          h += '<div class="chaprow"><h2 class="chap">' + chap + "</h2>" + btn("🏁 Bilan du chapitre" + (cx && cx.medal ? " " + cx.medal : ""), "exam|chap|" + chap, { cls: "btn mini", k: "chap-" + chap }) + '</div><div class="tgrid">';
        }
        var pr = prog(S.pid, t.id), marks = (pr.learn ? "📖" : "") + (pr.sheet ? "✏️" : "");
        h += btn('<span class="ti">' + t.icon + '</span><span class="tt">' + t.title + '</span><span class="tm">' + marks + " " + stars(pr.stars) + "</span>", "theme|" + t.id, { cls: "tbtn", def: first });
        first = false;
      });
      return h + "</div>";
    },
    theme: function () {
      var t = theme(S.tid), pr = prog(S.pid, t.id);
      var steps = [["learn", "📖", "J'apprends", "La leçon expliquée pas à pas", pr.learn], ["ex", "🤝", "On essaie ensemble", "Des exemples corrigés étape par étape", pr.ex],
        ["sheet", "✏️", "Sur ma feuille", "Des exercices à faire sur papier", pr.sheet], ["quiz", "🎯", "Le quiz", "10 questions · " + stars(pr.stars), pr.stars > 0]];
      var next = 0; while (next < 3 && steps[next][4]) next++;
      var h = '<div class="thead"><span class="ti">' + t.icon + "</span><div><h1>" + t.title + '</h1><div class="sub">' + t.desc + '</div></div></div><div class="flow">';
      steps.forEach(function (s, i) {
        h += btn('<div class="num">' + (i + 1) + '</div><div class="fi">' + s[1] + '</div><div class="fn">' + s[2] + '</div><div class="fd">' + s[3] + "</div>" + (s[4] ? '<div class="done">✔</div>' : ""),
          "step|" + s[0], { cls: "card step" + (i === next ? " next" : ""), def: i === next });
      });
      return h + "</div>";
    },
    learn: function () {
      var t = theme(S.tid), sl = t.learn[S.i], last = S.i === t.learn.length - 1, dots = "";
      for (var i = 0; i < t.learn.length; i++) dots += '<span class="dot' + (i === S.i ? " on" : "") + '"></span>';
      if (last) { prog(S.pid, t.id).learn = true; save(); }
      return '<div class="slide"><div class="kicker">📖 J\'apprends · ' + (S.i + 1) + " / " + t.learn.length + "</div><h1>" + sl.t + '</h1><div class="body">' + sl.h + "</div></div>" +
        '<div class="bar">' + (S.i > 0 ? btn("◀ Précédent", "lprev") : "") + '<div class="dots">' + dots + "</div>" +
        (last ? btn("🤝 Voir des exemples ▶", "step|ex", { def: true }) : btn("Suivant ▶", "lnext", { def: true })) + "</div>";
    },
    ex: function () {
      var q = S.q, done = S.k >= q.steps.length, h = '<div class="kicker">🤝 On essaie ensemble · exemple ' + S.n + " / 3</div>";
      if (done) { prog(S.pid, S.tid).ex = true; save(); }
      h += '<div class="excol"><div class="qcard">' + q.text + choicesList(q) + (done ? '<div class="ans">Réponse : <b>' + answerText(q) + "</b></div>" : "") + "</div>";
      h += '<div class="expl">' + (S.k ? stepsHTML(q, S.k) : '<div class="sub">Essaie d\'abord de trouver toi-même, puis appuie sur <b>OK</b> pour voir la correction pas à pas.</div>') + "</div></div>";
      h += '<div class="bar">' + (S.k > 0 ? btn("◀ Étape précédente", "exprev") : "") + (!done ? btn("▶ Étape suivante", "exnext", { def: true }) : S.n < 3 ? btn("🔄 Autre exemple", "exmore", { def: true }) : "") +
        btn("✏️ Sur ma feuille", "step|sheet", { def: done && S.n >= 3 }) + "</div>";
      return h;
    },
    sheet: function () {
      var h;
      if (S.phase === "do") {
        h = '<div class="kicker">✏️ Prends une feuille et un crayon ! Écris le numéro, puis ta réponse.</div><div class="sgrid">';
        S.qs.forEach(function (q, i) { h += '<div class="scard"><div class="sn">' + (i + 1) + "</div>" + q.text + choicesList(q) + "</div>"; });
        return h + '</div><div class="bar">' + btn("🔄 Autres exercices", "snew") + btn("J'ai fini : voir la correction ▶", "scor", { def: true }) + "</div>";
      }
      if (S.i >= S.qs.length) {
        var ok = S.marks.filter(function (x) { return x; }).length;
        prog(S.pid, S.tid).sheet = true; save();
        return '<div class="hero"><h1>' + (ok === S.qs.length ? "🏆 Parfait !" : ok >= S.qs.length / 2 ? "👍 Bien joué !" : "💪 Continue, tu progresses !") + '</h1><div class="sub">Tu as <b>' + ok + " sur " + S.qs.length + '</b> exercices justes.</div><div class="bar center">' +
          btn("🎯 Passer au quiz", "step|quiz", { def: true }) + btn("🔄 Nouvelle feuille", "step|sheet") + btn("⬅ Retour au thème", "back") + "</div></div>";
      }
      var q = S.qs[S.i];
      h = '<div class="kicker">✏️ Correction · exercice ' + (S.i + 1) + " / " + S.qs.length + '</div><div class="excol"><div class="qcard">' + q.text + choicesList(q) +
        '<div class="ans">Réponse : <b>' + answerText(q) + "</b></div></div>" + '<div class="expl">' + stepsHTML(q) + "</div></div>";
      return h + '<div class="bar">' + btn(S.i > 0 ? "◀ Exercice précédent" : "◀ Revoir la feuille", "sprev") + btn('<span class="kb green"></span> J\'avais juste', "smark|1", { def: true, cls: "btn good" }) + btn('<span class="kb red"></span> Je m\'étais trompé·e', "smark|0", { cls: "btn bad" }) + "</div>";
    },
    quiz: function () {
      var q = S.qs[S.i], h = '<div class="qhead"><div class="kicker">' + (S.exam ? S.exam.title : "🎯 Quiz") + " · question " + (S.i + 1) + " / " + S.len + "</div>";
      if (S.len > 12) h += '<div class="qprog"><span>✔ ' + S.score + '</span><div class="pbar"><i style="width:' + Math.round(100 * S.i / S.len) + '%"></i></div></div></div>';
      else {
        h += '<div class="pdots">';
        for (var i = 0; i < S.len; i++) h += '<span class="pd ' + (S.res[i] === true ? "ok" : S.res[i] === false ? "ko" : i === S.i ? "on" : "") + '"></span>';
        h += "</div></div>";
      }
      var qt = S.plan ? theme(S.plan[S.i].tid) : null;
      h += '<div class="quiz"><div class="qcard">' + (qt ? '<div class="qtag">' + qt.icon + " " + qt.title + "</div>" : "") + q.text;
      if (q.type === "num") h += '<div class="input' + (S.fb ? (S.fb === "ok" ? " ok" : " ko") : "") + '">' + (S.input || '<span class="ph">?</span>') + (S.fb ? "" : '<span class="caret"></span>') + "</div>" + (q.unit ? '<span class="unit">' + q.unit + "</span>" : "");
      h += '</div><div class="qside">';
      if (S.fb === "ok") h += '<div class="fb good">' + S.msg + "</div>" + (S.streak >= 3 ? '<div class="combo">🔥 ' + S.streak + " bonnes réponses de suite !</div>" : "") + btn("Suivant ▶", "qnext", { def: true });
      else if (S.fb === "ko") h += '<div class="fb bad">' + S.msg + '</div><div class="ans">La bonne réponse : <b>' + answerText(q) + '</b></div><div class="expl small">' + stepsHTML(q) + "</div>" + btn("J'ai compris, suivant ▶", "qnext", { def: true });
      else if (q.type === "choice") {
        h += '<div class="choices">';
        q.choices.forEach(function (c, i) { h += btn('<span class="kb ' + COLORS[i] + '"></span>' + c, "qchoice|" + i, { cls: "btn choice", def: i === 0, k: "c" + i }); });
        h += '</div><div class="hint">Choisis avec les flèches et <b>OK</b>, ou avec les touches de couleur.</div>';
      } else {
        h += '<div class="pad">';
        ["7", "8", "9", "4", "5", "6", "1", "2", "3", ",", "0", "⌫"].forEach(function (k) { h += btn(k, "key|" + k, { cls: "btn key", def: k === "5", k: "k" + k }); });
        h += "</div>" + btn("✔ Valider", "qok", { cls: "btn ok", k: "kok" }) + '<div class="hint">Tu peux aussi taper avec les chiffres de la télécommande.</div>';
      }
      return h + "</div></div>";
    },
    result: function () {
      var t = theme(S.tid), pr = prog(S.pid, t.id), n = S.score, st = n >= 9 ? 3 : n >= 7 ? 2 : n >= 5 ? 1 : 0, msg;
      msg = st === 3 ? "🏆 Champion·ne !" : st === 2 ? "🌟 Très bien !" : st === 1 ? "👍 Pas mal !" : "💪 On recommence ?";
      return '<div class="hero"><h1>' + msg + '</h1><div class="score">' + n + " / " + QUIZ_LEN + '</div><div class="bigstars">' + stars(st) + "</div>" +
        (st > S.before ? '<div class="sub">Nouveau record ! 🎉</div>' : pr.stars === 3 ? '<div class="sub">Tu maîtrises ce thème !</div>' : '<div class="sub">Il faut 9 bonnes réponses pour 3 étoiles.</div>') +
        '<div class="bar center">' + btn("🔄 Refaire le quiz", "step|quiz", { def: true }) + btn("⬅ Retour au thème", "back") + btn("📚 Autres thèmes", "themes") + "</div></div>";
    },
    xresult: function () {
      var m = S.medal, pct = Math.round(100 * S.score / S.len), h = '<div class="hero"><h1>' + (m ? m[0] + " " + m[1] + " !" : "💪 Continue à t'entraîner !") + "</h1>";
      h += '<div class="score">' + S.score + " / " + S.len + '</div><div class="pbar big"><i style="width:' + pct + '%"></i></div>';
      h += '<div class="sub">' + (S.record ? "Nouveau record ! 🎉 " : "") + "🥉 dès 60 % · 🥈 dès 75 % · 🥇 dès 90 %</div>";
      var weak = Object.keys(S.weak).sort(function (a, b) { return S.weak[b] - S.weak[a]; }).slice(0, 3);
      if (weak.length) {
        h += '<div class="sub">📌 À revoir en priorité :</div><div class="bar center">';
        weak.forEach(function (id) { var t = theme(id); h += btn(t.icon + " " + t.title, "theme|" + id, { cls: "btn mini" }); });
        h += "</div>";
      } else h += '<div class="sub">Aucune erreur : incroyable ! 🏆</div>';
      return h + '<div class="bar center">' + btn("🔄 Refaire l'épreuve", "exam|" + S.exam.kind + (S.exam.arg ? "|" + S.exam.arg : ""), { def: true }) + btn("📚 Retour aux thèmes", "themes") + "</div></div>";
    }
  };

  function choicesList(q) {
    if (q.type !== "choice" || S.v === "quiz") return "";
    var L = ["A", "B", "C", "D"], h = '<div class="clist">';
    q.choices.forEach(function (c, i) { h += "<span><b>" + L[i] + ")</b> " + c + "</span>"; });
    return h + "</div>";
  }

  /* ---------- Actions ---------- */
  function startStep(s) {
    var t = theme(S.tid), base = { pid: S.pid, tid: S.tid };
    function st(o) { for (var k in base) o[k] = base[k]; return o; }
    // depuis une sous-étape, on remplace l'écran courant au lieu d'empiler
    var replace = S.v !== "theme";
    var next;
    if (s === "learn") next = st({ v: "learn", i: 0 });
    else if (s === "ex") next = st({ v: "ex", n: 1, k: 0, q: newQ(t, 1) });
    else if (s === "sheet") { var seen = {}; next = st({ v: "sheet", phase: "do", qs: [1, 2, 2, 2, 3, 3].map(function (d, i) { return newQ(t, d, seen, i >= 4); }), i: 0, marks: [] }); }
    else if (s === "quiz") next = st({ v: "quiz", len: QUIZ_LEN, qs: [newQ(t, 1, S.seen = {})], seen: S.seen, i: 0, input: "", fb: null, res: [], score: 0, streak: 0 });
    if (replace) { S = next; focusKey = null; render(); } else go(next);
  }

  // Épreuve : questions tirées de tous les thèmes d'une matière (ou d'un chapitre), de plus en plus difficiles
  function startExam(kind, arg) {
    var p = profile(S.pid), sub = S.sub, list = themesFor(p.grade, sub), order = [];
    if (kind === "chap") list = list.filter(function (t) { return t.chapter === arg; });
    var len = kind === "final" ? 30 : 15;
    while (order.length < len) order = order.concat(U.shuffle(list.slice()));
    var plan = order.slice(0, len).map(function (t, i) { return { tid: t.id, d: i < len * 0.2 ? 1 : i < len * 0.6 ? 2 : 3 }; });
    var seen = {}, next = { v: "quiz", pid: S.pid, sub: sub, exam: { key: sub + "|" + kind + "|" + (arg || ""), kind: kind, arg: arg, title: kind === "final" ? "🏆 Épreuve finale" : "🏁 Bilan : " + arg },
      plan: plan, len: len, qs: [newQ(theme(plan[0].tid), plan[0].d, seen)], seen: seen, i: 0, input: "", fb: null, res: [], score: 0, streak: 0 };
    if (S.v === "xresult") { S = next; focusKey = null; render(); } else go(next);
  }
  function examEnd() {
    var m = medalFor(S.score / S.len), X = exams(S.pid), old = X[S.exam.key], weak = {};
    S.res.forEach(function (r, i) { if (!r) { var id = S.plan[i].tid; weak[id] = (weak[id] || 0) + 1; } });
    var record = !old || S.score > old.best;
    if (record) X[S.exam.key] = { best: S.score, len: S.len, medal: m ? m[0] : "" };
    save();
    S = { v: "xresult", pid: S.pid, sub: S.sub, exam: S.exam, score: S.score, len: S.len, medal: m, weak: weak, record: record && !!old };
    focusKey = null; render();
    if (m) confetti();
  }
  // Pluie de confettis pour fêter un beau résultat
  function confetti() {
    var c = document.createElement("div"), cols = ["#ffc94a", "#4cd38a", "#5fd3ff", "#ff7a6b", "#c38bff", "#ff8fc7"], h = "";
    c.className = "confetti";
    for (var i = 0; i < 60; i++) h += '<i style="left:' + Math.random() * 100 + "%;background:" + cols[i % cols.length] + ";animation-delay:" + (Math.random() * 1.2).toFixed(2) + "s;animation-duration:" + (2.2 + Math.random() * 1.8).toFixed(2) + 's"></i>';
    c.innerHTML = h;
    document.body.appendChild(c);
    setTimeout(function () { if (c.parentNode) c.parentNode.removeChild(c); }, 4500);
  }

  function quizAnswer(given) {
    var q = S.qs[S.i];
    if (S.fb) return;
    if (q.type === "num" && !S.input) { toast("Tape d'abord ta réponse 🙂"); return; }
    var ok = check(q, given);
    S.fb = ok ? "ok" : "ko"; S.res[S.i] = ok; if (ok) S.score++;
    S.streak = ok ? (S.streak || 0) + 1 : 0; S.msg = U.pick(ok ? PRAISE : OOPS);
    if (q.type === "choice") S.picked = given;
    focusKey = null; render();
    if (ok) timer = setTimeout(quizNext, 1300);
  }
  function quizNext() {
    clearTimeout(timer);
    if (S.v !== "quiz" || !S.fb) return;
    if (S.i + 1 >= S.len) {
      if (S.exam) { examEnd(); return; }
      var pr = prog(S.pid, S.tid), st = S.score >= 9 ? 3 : S.score >= 7 ? 2 : S.score >= 5 ? 1 : 0;
      var before = pr.stars;
      pr.quiz++; if (st > pr.stars) pr.stars = st; save();
      S = { v: "result", pid: S.pid, tid: S.tid, score: S.score, before: before }; focusKey = null; render();
      if (st >= 2) confetti();
      return;
    }
    S.i++; S.fb = null; S.input = "";
    S.qs.push(S.plan ? newQ(theme(S.plan[S.i].tid), S.plan[S.i].d, S.seen) : newQ(theme(S.tid), S.i < 3 ? 1 : S.i < 7 ? 2 : 3, S.seen));
    focusKey = null; render();
  }
  function typeKey(k) {
    if (S.fb) return;
    if (k === "⌫") S.input = S.input.slice(0, -1);
    else if (k === ",") { if (S.input.indexOf(",") < 0) S.input = (S.input || "0") + ","; }
    else if (S.input.length < 9) S.input = S.input === "0" ? k : S.input + k;
    render();
  }

  function act(a) {
    var p = a.split("|"), name = p[0], arg = p[1];
    if (name === "profile") go({ v: "subjects", pid: arg });
    else if (name === "subject") {
      var sub = null; SUBJECTS.forEach(function (s) { if (s.id === arg) sub = s; });
      if (sub.soon) toast(sub.icon + " " + sub.name + " arrive bientôt !"); else go({ v: "themes", pid: S.pid, sub: arg });
    }
    else if (name === "theme") go({ v: "theme", pid: S.pid, tid: arg });
    else if (name === "step") startStep(arg);
    else if (name === "exam") startExam(arg, p[2]);
    else if (name === "lnext") { S.i++; focusKey = null; render(); }
    else if (name === "lprev") { S.i--; focusKey = null; render(); }
    else if (name === "exnext") { S.k++; render(); }
    else if (name === "exprev") { S.k--; focusKey = null; render(); }
    else if (name === "sprev") { if (S.i > 0) { S.i--; S.marks.pop(); } else S.phase = "do"; focusKey = null; render(); }
    else if (name === "home") { hist = []; S = null; go({ v: "home" }); }
    else if (name === "exmore") { S.n++; S.k = 0; S.q = newQ(theme(S.tid), S.n); focusKey = null; render(); }
    else if (name === "snew") startStep("sheet");
    else if (name === "scor") { S.phase = "cor"; S.i = 0; focusKey = null; render(); }
    else if (name === "smark") { S.marks.push(arg === "1"); S.i++; focusKey = null; render(); }
    else if (name === "qchoice") quizAnswer(+arg);
    else if (name === "key") typeKey(arg);
    else if (name === "qok") quizAnswer(S.input);
    else if (name === "qnext") quizNext();
    else if (name === "back") back();
    else if (name === "link") location.href = arg;
    else if (name === "themes") { while (hist.length && hist[hist.length - 1].s.v !== "themes") hist.pop(); back(); }
  }

  /* ---------- Télécommande, clavier, souris ---------- */
  app.addEventListener("click", function (e) {
    var t = e.target;
    while (t && t !== app) {
      if (t.getAttribute && t.getAttribute("data-a")) { setFocus(t); act(t.getAttribute("data-a")); return; }
      t = t.parentNode;
    }
  });

  document.addEventListener("keydown", function (e) {
    var k = e.keyCode, typing = S.v === "quiz" && !S.fb && S.qs[S.i].type === "num";
    // chiffres (télécommande, clavier, pavé numérique)
    if (typing && ((k >= 48 && k <= 57) || (k >= 96 && k <= 105))) {
      e.preventDefault(); typeKey(String(k >= 96 ? k - 96 : k - 48));
      var okb = app.querySelector('[data-k="kok"]'); if (okb) setFocus(okb);
      return;
    }
    if (typing && (k === 188 || k === 110 || k === 190)) { e.preventDefault(); typeKey(","); return; }
    if (typing && k === 8) { e.preventDefault(); typeKey("⌫"); return; }
    if (k === 10009 || k === 27 || k === 8) { e.preventDefault(); back(); return; }
    // touches de couleur : rouge 403, vert 404, jaune 405, bleu 406
    if (k >= 403 && k <= 406) {
      e.preventDefault();
      var idx = k - 403;
      if (S.v === "quiz" && !S.fb && S.qs[S.i].type === "choice" && idx < S.qs[S.i].choices.length) quizAnswer(idx);
      else if (S.v === "sheet" && S.phase === "cor" && S.i < S.qs.length && (idx === 0 || idx === 1)) act("smark|" + (idx === 1 ? "1" : "0"));
      return;
    }
    if (k >= 37 && k <= 40) { e.preventDefault(); move(["left", "up", "right", "down"][k - 37]); return; }
    if (k === 13) { e.preventDefault(); var c = current(); if (c) act(c.getAttribute("data-a")); }
  });

  try {
    if (window.tizen && tizen.tvinputdevice) {
      ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "ColorF0Red", "ColorF1Green", "ColorF2Yellow", "ColorF3Blue"].forEach(function (n) {
        try { tizen.tvinputdevice.registerKey(n); } catch (err) {}
      });
    }
  } catch (err) {}

  window.EcoleTV = { themes: THEMES, data: data, check: check, state: function () { return S; }, go: function (s) { S = null; hist = []; go(s); } };
  go({ v: "home" });
})();
