  /* ---------- Les tenues et les danses d'Hector : des récompenses que l'on gagne en travaillant ----------
     Une récompense se gagne une fois pour toutes. but : [mesure, seuil], tous chapitres confondus :
       q : questions réussies dans les exercices        s : meilleure série à l'entraînement
       e : bonnes réponses à l'entraînement             n : meilleure note à un contrôle blanc
     acc : l'accessoire du dessin (une tenue) ; gr : deux tenues du même groupe ne se portent pas ensemble ; pas : les gestes d'une danse. */
  var REC = [
    { k: 'crayon', acc: 'pencil', vb: '84 50 216 156', fr: 'Le crayon', it: 'La matita', c: ['Crayon', 'Matita'], but: ['q', 5] },
    { k: 'echarpe', acc: 'scarf', gr: 'cou', vb: '170 438 480 212', fr: 'L’écharpe', it: 'La sciarpa', c: ['Écharpe', 'Sciarpa'], but: ['q', 15] },
    { k: 'noeud', acc: 'bow', gr: 'cou', vb: '262 434 296 144', fr: 'Le nœud papillon', it: 'Il papillon', c: ['Nœud papillon', 'Papillon'], but: ['q', 30] },
    { k: 'lunettes', acc: 'shades', vb: '50 120 720 340', fr: 'Les lunettes de soleil', it: 'Gli occhiali da sole', c: ['Lunettes', 'Occhiali'], but: ['s', 5] },
    { k: 'toque', acc: 'cap', gr: 'tete', vb: '170 -48 480 210', fr: 'La toque', it: 'Il tocco', c: ['Toque', 'Tocco'], but: ['n', 10] },
    { k: 'couronne', acc: 'crown', gr: 'tete', vb: '216 -104 388 274', fr: 'La couronne', it: 'La corona', c: ['Couronne', 'Corona'], but: ['n', 16] },
    { k: 'toupie', pas: ['toupie'], fr: 'La toupie', it: 'La trottola', c: ['Toupie', 'Trottola'], but: ['s', 3],
      ic: '<path d="M20 12a8 8 0 1 1-2.5-5.8"/><path d="M20.5 3.5v5h-5"/>' },
    { k: 'jongleur', pas: ['jongle', 'jongle'], fr: 'Le jongleur', it: 'Il giocoliere', c: ['Jongleur', 'Giocoliere'], but: ['e', 10],
      ic: '<circle cx="5.5" cy="10" r="2.2"/><circle cx="12" cy="5" r="2.2"/><circle cx="18.5" cy="10" r="2.2"/><path d="M5 18c2.5 2.4 11.5 2.4 14 0"/>' },
    { k: 'disco', pas: ['disco'], fr: 'Le disco', it: 'La disco', c: ['Disco', 'Disco'], but: ['q', 50],
      ic: '<path d="M12 2.500v3.5"/><circle cx="12" cy="13.5" r="7.5"/><path d="M4.5 13.500h15M12 6v15M6.5 9c3.5 1.6 7.5 1.6 11 0M6.5 18c3.5-1.6 7.5-1.6 11 0"/>' },
    { k: 'moonwalk', pas: ['moonwalk'], fr: 'Le moonwalk', it: 'Il moonwalk', c: ['Moonwalk', 'Moonwalk'], but: ['q', 80],
      ic: '<path d="M20 14.500A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.500z"/>' }
  ];
  var RK = {};
  REC.forEach(function(r){ RK[r.k] = r; });
  /* Ce qu'il faut faire pour gagner une récompense, et où l'on en est */
  var BUT = {
    q: function(n){ return { fr: 'Réussis ' + n + ' questions dans les exercices.', it: 'Risolvi ' + n + ' domande negli esercizi.' }; },
    s: function(n){ return { fr: 'Réussis ' + n + ' questions de suite à l’entraînement.', it: 'Rispondi bene a ' + n + ' domande di fila nell’allenamento.' }; },
    e: function(n){ return { fr: 'Réussis ' + n + ' questions à l’entraînement.', it: 'Rispondi bene a ' + n + ' domande nell’allenamento.' }; },
    n: function(n){ return { fr: 'Obtiens ' + n + ' / 20 ou plus à un contrôle blanc.', it: 'Prendi ' + n + ' / 20 o più in una verifica di prova.' }; }
  };
  function jeuOu(r, m){
    var v = m[r.but[0]], t = r.but[1];
    if (r.but[0] === 'n') return v == null ? { fr: 'Pas encore de contrôle blanc.', it: 'Ancora nessuna verifica di prova.' } : { fr: 'Ton meilleur score : ' + v + ' / 20.', it: 'Il tuo record: ' + v + ' / 20.' };
    if (r.but[0] === 's') return { fr: 'Ta meilleure série : ' + v + '.', it: 'La tua serie migliore: ' + v + '.' };
    return { fr: 'Tu en es à ' + v + ' sur ' + t + '.', it: 'Sei a ' + v + ' su ' + t + '.' };
  }
  var ICON_LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>';
  var ICON_JEU = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="9" rx="1.5"/><path d="M3 7.500h18V11H3zM12 7.500V20M12 7.500C10.5 3.5 6 4 7.5 7.500M12 7.500c1.5-4 6-3.5 4.5 0"/></svg>';
  /* L'image d'une récompense : l'accessoire tel qu'il est dans le dessin d'Hector, ou un pictogramme pour une danse */
  function jeuImage(r){
    if (!r.acc) return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + r.ic + '</svg>';
    var tpl = document.getElementById('owl-tpl'), g = tpl && tpl.content ? tpl.content.querySelector('.owl-acc-' + r.acc) : null;
    return '<svg viewBox="' + r.vb + '" aria-hidden="true">' + (g ? g.innerHTML : '') + '</svg>';
  }

  /* Enregistré sur le téléphone : ok (gagnées), vus (déjà montrées dans la vue), port (tenues portées), danse (la danse préférée) */
  var jeu = store.jeu = store.jeu || {};
  jeu.ok = jeu.ok || {}; jeu.vus = jeu.vus || {}; jeu.port = jeu.port || {};
  function jeuMesures(){
    var m = { q: 0, s: 0, e: 0, n: null };
    CHAPS.forEach(function(c){
      var s = CH[c.id].stats();
      m.q += s.q; m.e += s.tr;
      if (s.best > m.s) m.s = s.best;
      if (s.test != null && (m.n == null || s.test > m.n)) m.n = s.test;
    });
    return m;
  }
  function jeuGagnees(){ return REC.filter(function(r){ return jeu.ok[r.k]; }); }
  function jeuNeuves(){ return REC.filter(function(r){ return jeu.ok[r.k] && !jeu.vus[r.k]; }); }
  function minus(s){ return s.charAt(0).toLowerCase() + s.slice(1); }
  /* Les accessoires portés, sur tous les Hector de la page */
  function jeuHabille(){
    if (!HK || !HK.tenue) return;
    HK.tenue(REC.filter(function(r){ return r.acc && jeu.ok[r.k] && jeu.port[r.k]; }).map(function(r){ return r.acc; }));
  }
  /* Une danse gagnée (sans précision : la préférée). Renvoie false s'il n'y en a pas. */
  function jeuDanse(o, k){
    var r = RK[k || jeu.danse];
    if (!o || !r || !r.pas || !jeu.ok[r.k]) return false;
    var pas = r.pas.slice();
    (function suite(){ var g = pas.shift(); if (g) o.anim(g).then(function(fini){ if (fini) suite(); }); })();
    return true;
  }
  /* Ce qui vient d'être gagné. annonce : Hector le dit, et l'écran affiché se met à jour. */
  function jeuVerifie(annonce){
    var m = jeuMesures(), neuf = [];
    REC.forEach(function(r){ var v = m[r.but[0]]; if (!jeu.ok[r.k] && v != null && v >= r.but[1]){ jeu.ok[r.k] = 1; neuf.push(r); } });
    if (!neuf.length) return neuf;
    save();
    if (!annonce) return neuf;
    if (owlTop){
      try {
        var un = neuf.length === 1 ? neuf[0] : null;
        var fr = un ? (un.acc ? 'Nouvelle tenue : ' : 'Nouvelle danse : ') + minus(un.fr) + ' !' : neuf.length + ' nouvelles récompenses !';
        var it = un ? (un.acc ? 'Nuovo vestito: ' : 'Nuovo ballo: ') + minus(un.it) + '!' : neuf.length + ' nuovi premi!';
        owlTop.anim('fierte');
        owlTop.speak('<span class="fr">' + typo(fr + ' Va voir sur l’accueil.', true) + '</span><span class="it">' + it + ' Guarda nella home.</span>', { muet: true });
      } catch (e) {}
    }
    if (!cur.ch){ if (cur.v === 'hector') renderJeu(); else renderHome(); }
    return neuf;
  }
  var jeuT = 0;
  function jeuBientot(ms){ clearTimeout(jeuT); jeuT = setTimeout(function(){ jeuT = 0; jeuVerifie(true); }, ms); }

  /* Le bouton de l'accueil */
  function jeuBouton(){
    var n = jeuGagnees().length, neuves = jeuNeuves().length;
    return '<a class="jeu-b" href="#hector"><span class="jeu-bi">' + ICON_JEU + '</span><span class="jeu-bt">' +
      '<span class="jeu-b1"><span class="fr">' + typo('Tenues et danses d’Hector', true) + '</span><span class="it sub-it">Vestiti e balli di Hector</span></span>' +
      '<span class="jeu-b2 ui"><span><b>' + n + '</b> / ' + REC.length + ' <span class="fr">gagnées</span><span class="it">vinti</span></span>' +
      (neuves ? '<span class="jeu-neuf"><span class="fr">Nouveau</span><span class="it">Nuovo</span></span>' : '') + '</span>' +
      '</span><span class="chap-go" aria-hidden="true">' + ICON_NEXT + '</span></a>';
  }

  /* La vue : Hector, la récompense choisie, puis les tenues et les danses */
  var vJeu = document.getElementById('v-hector'), jeuSel = null, jeuOwl = null, jeuNeufs = {};
  function jeuTuile(r, m){
    var ok = !!jeu.ok[r.k], v = m[r.but[0]] || 0, t = r.but[1], etat;
    if (!ok) etat = '<span class="jeu-l">' + ICON_LOCK + '<span>' + (r.but[0] === 'n' ? t + ' / 20' : Math.min(v, t) + ' / ' + t) + '</span></span>';
    else if (r.acc && jeu.port[r.k]) etat = '<span class="jeu-e on">' + biUI('porté', 'indossato') + '</span>';
    else if (!r.acc && jeu.danse === r.k) etat = '<span class="jeu-e on">' + biUI('sa danse', 'il suo ballo') + '</span>';
    else if (jeuNeufs[r.k]) etat = '<span class="jeu-e neuf">' + biUI('nouveau', 'nuovo') + '</span>';
    else etat = '<span class="jeu-e">' + biUI('gagné', 'vinto') + '</span>';
    return '<button class="jeu-t' + (ok ? ' ok' : '') + '" type="button" data-rec="' + r.k + '" aria-pressed="' + (jeuSel === r.k) + '">' +
      '<span class="jeu-i">' + jeuImage(r) + '</span><span class="jeu-tn">' + biUI(r.c[0], r.c[1]) + '</span>' + etat + '</button>';
  }
  function jeuFiche(r, m){
    var ok = !!jeu.ok[r.k], h = '<p class="jeu-k">' + (r.acc ? biUI('Tenue', 'Vestito') : biUI('Danse', 'Ballo')) + '</p>' +
      '<h2 class="jeu-n"><span class="fr">' + r.fr + '</span><span class="it">' + r.it + '</span></h2>';
    if (!ok){
      var b = BUT[r.but[0]](r.but[1]), ou = jeuOu(r, m), v = m[r.but[0]] || 0;
      h += '<p class="fr">' + typo(b.fr, true) + '</p><p class="it">' + b.it + '</p>' +
        '<div class="prog"><i style="width:' + Math.min(100, Math.round(v / r.but[1] * 100)) + '%"></i></div>' +
        '<p class="jeu-ou">' + biUI(typo(ou.fr, true), ou.it) + '</p>';
    } else if (r.acc){
      h += '<button class="btn pri jeu-a" type="button">' + (jeu.port[r.k] ? biUI('Enlever', 'Togli') : biUI('Mettre', 'Indossa')) + '</button>';
    } else {
      h += '<button class="btn pri jeu-a" type="button">' + biUI('Danser', 'Balla') + '</button>' +
        (jeu.danse === r.k ? '<p class="jeu-ou">' + biUI('Hector la danse quand tu finis un exercice.', 'Hector lo balla quando finisci un esercizio.') + '</p>' : '');
    }
    return h;
  }
  /* Sur l'Hector de la vue : les tenues portées, et celle que l'on regarde (on l'essaie, même pas encore gagnée) */
  function jeuEssai(){
    if (!jeuOwl) return;
    var r = RK[jeuSel];
    REC.forEach(function(x){ if (x.acc) jeuOwl.el.classList.toggle('acc-' + x.acc, !!(jeu.ok[x.k] && jeu.port[x.k])); });
    if (r && r.acc){
      if (r.gr) REC.forEach(function(x){ if (x.acc && x.gr === r.gr) jeuOwl.el.classList.remove('acc-' + x.acc); });
      jeuOwl.el.classList.add('acc-' + r.acc);
    }
  }
  function renderJeu(){
    if (!vJeu) return;
    var m = jeuMesures();
    if (!vJeu.firstChild){
      vJeu.innerHTML = '<div class="jeu-h"><a class="btn sm ex-back" href="#accueil" aria-label="Accueil / Home">' + ICON_PREV + '</a>' +
        '<h1 id="t-hector" class="ui"><span class="fr">Tenues et danses</span><span class="it">Vestiti e balli</span></h1><span class="jeu-c ui"></span></div>' +
        '<div class="jeu-s"><div class="owl-slot"></div><div class="jeu-d" aria-live="polite"></div></div>' +
        '<p class="jeu-gt">' + biUI('Tenues', 'Vestiti') + '</p><div class="jeu-g t"></div>' +
        '<p class="jeu-gt">' + biUI('Danses', 'Balli') + '</p><div class="jeu-g d"></div>';
      jeuOwl = mkOwl($('.owl-slot', vJeu), { sommeil: false });
    }
    if (!RK[jeuSel]) jeuSel = (jeuNeuves()[0] || REC.filter(function(r){ return !jeu.ok[r.k]; }).sort(function(a, b){ return (m[b.but[0]] || 0) / b.but[1] - (m[a.but[0]] || 0) / a.but[1]; })[0] || REC[0]).k;
    $('.jeu-c', vJeu).innerHTML = '<b>' + jeuGagnees().length + '</b> / ' + REC.length;
    $('.jeu-d', vJeu).innerHTML = jeuFiche(RK[jeuSel], m);
    $('.jeu-g.t', vJeu).innerHTML = REC.filter(function(r){ return r.acc; }).map(function(r){ return jeuTuile(r, m); }).join('');
    $('.jeu-g.d', vJeu).innerHTML = REC.filter(function(r){ return !r.acc; }).map(function(r){ return jeuTuile(r, m); }).join('');
    jeuEssai();
  }
  /* En arrivant dans la vue : ce qui a été gagné depuis la dernière visite est marqué « nouveau », et Hector fait la fête */
  function ouvreJeu(){
    jeuVerifie(false);
    jeuNeufs = {};
    var neuves = jeuNeuves();
    neuves.forEach(function(r){ jeuNeufs[r.k] = 1; jeu.vus[r.k] = 1; });
    jeuSel = neuves.length ? neuves[0].k : null;
    if (neuves.length) save();
    renderJeu();
    if (neuves.length && jeuOwl) setTimeout(function(){ try { jeuOwl.anim('danse'); if (HK) HK.confetti(); } catch (e) {} }, 350);
  }
  if (vJeu) vJeu.addEventListener('click', function(ev){
    var t = ev.target.closest ? ev.target.closest('[data-rec]') : null, r;
    if (t){ jeuSel = t.getAttribute('data-rec'); renderJeu(); return; }
    if (!(ev.target.closest && ev.target.closest('.jeu-a'))) return;
    r = RK[jeuSel];
    if (!r || !jeu.ok[r.k]) return;
    if (r.acc){
      if (jeu.port[r.k]) delete jeu.port[r.k];
      else { if (r.gr) REC.forEach(function(x){ if (x.gr === r.gr) delete jeu.port[x.k]; }); jeu.port[r.k] = 1; }
      save(); jeuHabille(); renderJeu();
      if (jeuOwl && jeu.port[r.k]) try { jeuOwl.anim('fierte'); } catch (e) {}
    } else {
      jeu.danse = r.k; save(); renderJeu();
      jeuDanse(jeuOwl, r.k);
    }
  });
  /* Au lancement : ce que le travail déjà fait a fait gagner (sans annonce : le bouton de l'accueil le montre), et la tenue portée */
  jeuVerifie(false);
  jeuHabille();
