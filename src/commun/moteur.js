  /* Moteur des chapitres : exercices, entraînement, contrôle blanc, sommaire du cours. Une instance par chapitre. */
  var EX_ALL = (typeof EXOS !== 'undefined' ? EXOS : []).slice();
  EX_ALL.forEach(function(e, i){ if (!e.ch) e.ch = 'c10'; e._i = i; });
  function pk(e, j){ return e.id + ':' + j; }
  function nDone(e){ var c = 0; e.parts.forEach(function(p, j){ if (store.solved[pk(e, j)]) c++; }); return c; }
  function isDone(e){ return nDone(e) === e.parts.length; }
  function curLang(){ return store.lang === 'it' ? 'it' : 'fr'; }
  var mainEl = $('main');
  function mkView(kind, c, html){
    var s = document.createElement('section');
    s.id = 'v-' + kind + '-' + c.id; s.className = 'view'; s.hidden = true; s.setAttribute('data-ch', c.id);
    s.innerHTML = html; mainEl.appendChild(s);
    return s;
  }
  function vhead(eyebrow, title, lead){
    return '<div class="vhead"><p class="eyebrow">' + biIn(eyebrow) + '</p><h1><span class="fr">' + title.fr + '</span><span class="it sub-it">' + title.it + '</span></h1>' + bi(lead, 'p', 'lead') + '</div>';
  }
  function chip(attr, k, label, on){ return '<button class="chip" type="button" data-' + attr + '="' + k + '" aria-pressed="' + (on ? 'true' : 'false') + '"><span class="fr">' + label.fr + '</span><span class="it">' + label.it + '</span></button>'; }
  function press(list, on){ list.forEach(function(x){ x.setAttribute('aria-pressed', String(x === on)); }); }

  /* Vues en pages : la barre qui se remplit en haut, les boutons Précédent / Suivant en bas */
  function pgBar(){ return '<div class="pgbar" role="progressbar" aria-valuemin="0" aria-valuemax="100"><i></i></div>'; }
  function pgNavHTML(){
    return '<div class="pgnav-in"><button class="btn pg-prev" type="button">' + ICON_PREV + biUI('Précédent', 'Indietro') + '</button><span class="pg-count" aria-live="polite"></span>' +
      '<button class="btn pri pg-next" type="button"><span class="pg-next-t"></span>' + ICON_NEXT + '</button></div>';
  }
  function setBar(head, pct){ var b = $('.pgbar', head); $('i', b).style.width = pct + '%'; b.setAttribute('aria-valuenow', Math.round(pct)); }
  /* Glisser le doigt vers la gauche ou la droite tourne la page (sauf sur une zone qui défile elle-même de côté, ou dans un champ) */
  function glisser(view, tourne){
    var g = null;
    function deCote(el){ for (; el && el !== view; el = el.parentNode) if (el.scrollWidth > el.clientWidth + 2 && /auto|scroll/.test(getComputedStyle(el).overflowX)) return true; return false; }
    view.addEventListener('touchstart', function(ev){ var p = ev.touches[0]; g = ev.touches.length === 1 ? { x: p.clientX, y: p.clientY, t: Date.now(), el: ev.target } : null; }, { passive: true });
    view.addEventListener('touchend', function(ev){
      if (!g) return;
      var p = ev.changedTouches[0], dx = p.clientX - g.x, dy = p.clientY - g.y, d = g;
      g = null;
      if (Date.now() - d.t > 700 || Math.abs(dx) < 64 || Math.abs(dx) < 2.2 * Math.abs(dy) || /^(INPUT|TEXTAREA|SELECT)$/.test(d.el.tagName) || deCote(d.el)) return;
      tourne(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  function makeChapter(c){
    var st = chst(c), groups = c.groups;
    var EX = EX_ALL.filter(function(e){ return e.ch === c.id; });
    function gIndex(k){ for (var i = 0; i < groups.length; i++) if (groups[i].k === k) return i; return 99; }
    function rank(e){ var i = (c.order || []).indexOf(e.id); return gIndex(e.group) * 100000 + (i < 0 ? 50000 + e._i : i); }
    EX.sort(function(a, b){ return rank(a) - rank(b); });
    EX.forEach(function(e, i){ e.n = i + 1; });      /* numéro affiché : celui de l'application, dans l'ordre de la liste */

    /* ---------- Exercices ---------- */
    var vEx = mkView('exercices', c, vhead(c.title, { fr: 'Exercices', it: 'Esercizi' }, c.exLead) +
      '<div class="summary"><div class="row"><span class="ui"><span class="fr">Exercices réussis</span><span class="it">Esercizi risolti</span></span><span class="big ex-count">0 / 0</span></div><div class="prog"><i class="ex-bar"></i></div></div>' +
      '<div class="chips ui ex-filter" role="group" aria-label="Filtre">' + chip('f', 'all', { fr: 'Tous', it: 'Tutti' }, true) +
      groups.map(function(g){ return chip('f', g.k, g.chip || g); }).join('') + chip('f', 'todo', { fr: 'À faire', it: 'Da fare' }) + '</div><div class="ex-list"></div>');
    var listEl = $('.ex-list', vEx), filter = 'all', opened = {}, listed = false, focus = null, liste = [];
    vEx.classList.add('serre');
    /* Un exercice ouvert prend la place de la liste et se lit en pages, comme le cours : l'énoncé, puis une question par page.
       En haut, sa place dans la série ; en bas, Précédent / Suivant. */
    var exHead = document.createElement('div'), exNav = document.createElement('div');
    var XL = null, xPage = 0, xQ = [], xS = [];      /* l'exercice ouvert : ses pages, la page affichée, l'unité de chaque question et de chaque solution */
    exHead.className = 'pghead exhead ui'; exHead.hidden = true;
    exHead.innerHTML = '<div class="exhead-r"><button class="btn sm ex-back" type="button" aria-label="Liste des exercices / Lista degli esercizi">' + ICON_PREV + '</button>' +
      '<span class="exo-n ex-num"></span><span class="ex-where"></span>' +
      '<button class="btn sm stmt-b" type="button" aria-expanded="false" hidden>' + ICON_DOC + biUI('Énoncé', 'Testo') + '</button></div>' + pgBar();
    vEx.insertBefore(exHead, vEx.firstChild);
    exNav.className = 'pgnav ui'; exNav.hidden = true; exNav.innerHTML = pgNavHTML();
    vEx.appendChild(exNav);
    function parId(id){ for (var n = 0; n < EX.length; n++) if (EX[n].id === id) return EX[n]; return null; }
    /* La série en cours : les exercices de la liste affichée, dans l'ordre */
    function rang(){ for (var n = 0; n < liste.length; n++) if (liste[n].id === focus) return n; return -1; }
    function aFaire(e){ for (var j = 0; j < e.parts.length; j++) if (!store.solved[pk(e, j)]) return j; return 0; }      /* la première question pas encore réussie */
    function ouvrir(e, on){
      var art = document.getElementById('x-' + e.id);
      if (on) opened[e.id] = true; else delete opened[e.id];
      if (!art) return;
      var body = $('.exo-b', art);
      if (on && !body.firstChild) renderBody(e, body);
      body.hidden = !on;
      $('.exo-h', art).setAttribute('aria-expanded', String(on));
      art.classList.toggle('open', on);
      if (!on) $$('.pg-off', body).forEach(function(x){ x.classList.remove('pg-off'); });
    }
    /* Les unités de l'exercice ouvert : l'énoncé (découpé comme le cours), chaque question d'un seul bloc, et la solution quand elle est affichée.
       Une question à réponse écrite nettement plus haute que l'écran se lit en deux temps : son texte, puis la réponse. */
    function exoUnits(e){
      var art = document.getElementById('x-' + e.id), body = $('.exo-b', art), u = [], H;
      xQ = []; xS = [];
      $$('.pg-off', body).forEach(function(x){ x.classList.remove('pg-off'); });
      H = budget(art);
      function hauteur(el, sp){      /* la carte quand elle ne montre que cette question */
        var autres = [].filter.call(body.children, function(x){ return x !== el; }).concat(sp ? [sp] : []), h;
        autres.forEach(function(x){ x.classList.add('pg-off'); });
        h = art.offsetHeight;
        autres.forEach(function(x){ x.classList.remove('pg-off'); });
        return h;
      }
      function tropHaute(el, sp){
        var h;
        el.classList.remove('juste');
        h = hauteur(el, sp);
        if (h > H){ el.classList.add('juste'); h = hauteur(el, sp); }      /* trop haute : elle se resserre, et souvent elle tient */
        return h > H;
      }
      [].forEach.call(body.children, function(el){
        var k = el.classList;
        if (k.contains('btag')) return;
        if (k.contains('stmt')){ unitsOf(el, [el]).forEach(function(x){ x.enonce = true; u.push(x); }); return; }
        if (!k.contains('part')){ u.push({ els: [el], anc: [], enonce: true }); return; }      /* le schéma de l'énoncé */
        var j = Number(el.dataset.j), sp = $('.panel.sol', el), pq = $('.pq', el), kids = [].filter.call(el.children, function(x){ return x !== sp; }), n;
        xQ[j] = u.length;
        if (tropHaute(el, sp) && pq && !$('.choices', el)){      /* pas un choix : les réponses se lisent avec la question */
          n = kids.indexOf(pq) + 1;
          u.push({ els: kids.slice(0, n), anc: [el], entier: true, brk: j > 0 });
          u.push({ els: kids.slice(n), anc: [el], entier: true });
        } else u.push({ els: kids, anc: [el], entier: true, brk: j > 0 });      /* une question par page */
        if (sp && !sp.hidden){ xS[j] = u.length; u = u.concat(unitsOf(sp, [el, sp])); }
      });
      u.forEach(function(x, n){
        x.id = n; x.brk = !!x.brk; x.tete = false; x.on = true;
        x.keep = !x.entier && /[:：]\s*$/.test(x.els[0].textContent);      /* une phrase qui annonce la suite ne reste pas seule en bas de page */
        x.anc.forEach(function(a){ a._pg = 0; });
      });
      u.forEach(function(x){ x.anc.forEach(function(a){ a._pg++; }); });
      XL = { el: art, base: u, units: u, pages: null, key: '' };
    }
    function majFocus(){
      var k = rang();
      if (k < 0 || !XL || !XL.pages) return;
      var e = liste[k], num = $('.ex-num', exHead), fin = k === liste.length - 1 && xPage === XL.pages.length - 1;
      /* en haut : le numéro (vert quand l'exercice est réussi) et le titre de l'exercice */
      num.textContent = e.n; num.className = 'exo-n ex-num' + (e.plus ? ' plus' : '') + (isDone(e) ? ' done' : '');
      $('.ex-where', exHead).innerHTML = '<span class="fr">' + typo(e.title.fr, true) + '</span><span class="it">' + typo(e.title.it, false) + '</span>';
      setBar(exHead, (k + (xPage + 1) / XL.pages.length) / liste.length * 100);      /* la barre avance d'un cran à chaque page de l'exercice */
      $('.pg-count', exNav).textContent = (k + 1) + ' / ' + liste.length;
      $('.pg-prev', exNav).disabled = k === 0 && xPage === 0;
      $('.pg-next-t', exNav).innerHTML = fin ? biUI('Liste', 'Lista') : biUI('Suivant', 'Avanti');
    }
    function showX(k){
      if (!XL || vEx.hidden) return;
      if (!XL.pages || XL.key !== pgKey(XL)) paginate(XL);
      xPage = k = Math.max(0, Math.min(XL.pages.length - 1, k));
      var ici = XL.pages[k], sb = $('.stmt-b', exHead);
      XL.units.forEach(function(u, n){ vis(XL, n, ici.indexOf(n) >= 0); });
      /* « Énoncé » : sur une page de question où l'énoncé n'est pas en entier, un bouton le fait réapparaître au-dessus */
      sb.hidden = !ici.some(function(n){ return !XL.units[n].enonce; }) || XL.units.every(function(u, n){ return !u.enonce || ici.indexOf(n) >= 0; });
      sb.setAttribute('aria-expanded', 'false');
      majFocus();
    }
    function enonce(){
      var sb = $('.stmt-b', exHead), on = sb.getAttribute('aria-expanded') !== 'true';
      if (!XL || !XL.pages) return;
      XL.units.forEach(function(u, n){ if (u.enonce && XL.pages[xPage].indexOf(n) < 0) vis(XL, n, on); });
      sb.setAttribute('aria-expanded', String(on));
      if (on) window.scrollTo(0, 0);
    }
    $('.stmt-b', exHead).addEventListener('click', enonce);
    /* Ouvre un exercice (les autres disparaissent de l'écran). où : rien = à la première question pas encore réussie ; 'debut' ; 'fin'.
       Sans identifiant : retour à la liste, à l'endroit de l'exercice quitté. */
    function plein(){ document.documentElement.classList.toggle('plein', !!focus && !vEx.hidden); }      /* les onglets s'effacent : toute la hauteur pour l'exercice */
    function setFocus(id, ou){
      var avant = focus, e = id ? parId(id) : null, j;
      if (avant && (!e || avant !== e.id) && parId(avant)) ouvrir(parId(avant), false);
      focus = e ? e.id : null;
      vEx.classList.toggle('one', !!focus);
      exHead.hidden = exNav.hidden = !focus;
      plein();
      if (e){
        ouvrir(e, true); XL = null;
        if (vEx.hidden) return;                                   /* les pages se mesurent : il faut que la vue soit affichée */
        exoUnits(e); paginate(XL); j = aFaire(e);
        showX(ou === 'fin' ? XL.pages.length - 1 : ou === 'debut' || j === 0 ? 0 : pageOf(XL, xQ[j]));
        window.scrollTo(0, 0);
      } else {
        XL = null;
        if (avant){ var a = document.getElementById('x-' + avant); if (a) a.scrollIntoView({ block: 'center' }); }
      }
    }
    function pas(d){
      if (!focus || !XL || !XL.pages) return;
      if (xPage + d >= 0 && xPage + d < XL.pages.length){ showX(xPage + d); window.scrollTo(0, 0); return; }
      var o = liste[rang() + d];
      if (o) setFocus(o.id, d > 0 ? 'debut' : 'fin'); else if (d > 0) setFocus(null);
    }
    /* Après un nouveau découpage (langue, polices, rotation de l'écran), on reste au même endroit : la page de ce qu'on vient de toucher
       (un bouton, un champ) s'il est encore à l'écran, sinon celle du premier bloc affiché */
    var xAncre = null;
    vEx.addEventListener('click', function(ev){ xAncre = ev.target; }, true);
    function refocus(){
      var e = parId(focus), el, n, id = 0, ouvert = $('.stmt-b', exHead).getAttribute('aria-expanded') === 'true';
      if (!e || !XL || !XL.pages || vEx.hidden) return;
      el = xAncre && XL.el.contains(xAncre) && xAncre.getClientRects().length ? xAncre : XL.units[XL.pages[xPage][0]].els[0];
      exoUnits(e); paginate(XL);
      for (n = XL.base.length - 1; n >= 0; n--) if (XL.base[n].els.some(function(x){ return x === el || x.contains(el); })) id = n;
      showX(pageOf(XL, id));
      if (ouvert && !$('.stmt-b', exHead).hidden) enonce();      /* l'énoncé qu'on avait fait réapparaître reste affiché */
    }
    /* La solution d'une question vient d'être affichée ou cachée : les pages de l'exercice sont refaites, et on va là où elle commence */
    function solution(e, j, on){
      if (focus !== e.id || !XL || vEx.hidden) return;
      var k;
      exoUnits(e); paginate(XL);
      k = pageOf(XL, on && xS[j] != null ? xS[j] : xQ[j]);
      if (k !== xPage) window.scrollTo(0, 0);
      showX(k);
    }
    $('.ex-back', exHead).addEventListener('click', function(){ setFocus(null); });
    $('.pg-prev', exNav).addEventListener('click', function(){ pas(-1); });
    $('.pg-next', exNav).addEventListener('click', function(){ pas(1); });
    glisser(vEx, function(d){ if (focus) pas(d); });
    document.addEventListener('langchange', refocus);
    var xTimer = null, xLarg = window.innerWidth;
    window.addEventListener('resize', function(){ clearTimeout(xTimer); xTimer = setTimeout(function(){ if (xLarg !== window.innerWidth){ xLarg = window.innerWidth; refocus(); } }, 180); });
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', function(){ clearTimeout(xTimer); xTimer = setTimeout(refocus, 60); });
    function cardHead(e){
      var L = curLang(), bits = [], nq = e.parts.length;
      if (e.stars) bits.push('<span class="stars" aria-label="' + e.stars + ' / 3">' + starStr(e.stars) + '</span>');
      if (e.tag) bits.push(esc(e.tag[L]));
      if (nq > 1) bits.push(nq + (L === 'it' ? ' domande' : ' questions'));
      return '<button class="exo-h" type="button" aria-expanded="' + (opened[e.id] ? 'true' : 'false') + '"><span class="exo-n' + (e.plus ? ' plus' : '') + '">' + e.n + '</span>' +
        '<span><span class="exo-t">' + biIn(e.title) + '</span><span class="exo-m">' + bits.join(' · ') + '</span></span><span class="exo-s" aria-hidden="true">✓</span></button>';
    }
    function cardClass(e){ var d = nDone(e); return 'exo' + (d === e.parts.length ? ' done' : d ? ' part-done' : '') + (opened[e.id] ? ' open' : ''); }
    function renderBody(e, body){
      var h = (e.tag ? '<span class="btag">' + biIn(e.tag) + '</span>' : '') + (e.text ? '<div class="stmt">' + B(e.text) + '</div>' : '');
      if (e.figure && e.figure.chain) h += '<div class="chain efig"></div>';
      e.parts.forEach(function(p, j){ h += '<div class="part" data-j="' + j + '"></div>'; });
      body.innerHTML = h;
      if (e.figure && e.figure.chain) drawChain($('.efig', body), e.figure.chain, true);
      e.parts.forEach(function(p, j){
        mountPart($('.part[data-j="' + j + '"]', body), p, j + 1, {
          id: 'in-' + e.id + '-' + j, solved: store.solved[pk(e, j)] || false,
          onSolved: function(val){ store.solved[pk(e, j)] = String(val || '1'); save(); refreshCard(e); refreshSummary(); if (nDone(e) === e.parts.length) owlEvt('exo'); },
          onUnsolved: function(){ delete store.solved[pk(e, j)]; save(); refreshCard(e); refreshSummary(); },
          onSol: function(on){ solution(e, j, on); }
        });
      });
    }
    function bindCard(e, art){
      $('.exo-h', art).addEventListener('click', function(){ setFocus(focus === e.id ? null : e.id); });
    }
    function markLinks(e){ $$('[data-exo="' + e.id + '"]').forEach(function(b){ b.classList.toggle('done', isDone(e)); var k = b.querySelector('b'); if (k) k.textContent = e.n; }); }
    function refreshCard(e){
      markLinks(e);
      if (focus === e.id) majFocus();
      var art = document.getElementById('x-' + e.id);
      if (!art) return;
      art.className = cardClass(e);
      var gh = document.getElementById('gh-' + c.id + '-' + e.group);
      if (gh){ var items = EX.filter(function(x){ return x.group === e.group; }); gh.textContent = items.filter(isDone).length + ' / ' + items.length; }
    }
    function refreshSummary(){
      var d = EX.filter(isDone).length;
      $('.ex-count', vEx).textContent = d + ' / ' + EX.length;
      $('.ex-bar', vEx).style.width = (EX.length ? d / EX.length * 100 : 0) + '%';
    }
    function renderList(){
      listed = true; liste = [];
      listEl.innerHTML = '';
      groups.forEach(function(g){
        var items = EX.filter(function(e){ return e.group === g.k; });
        var shown = items.filter(function(e){ return filter === 'all' || filter === g.k || (filter === 'todo' && !isDone(e)); });
        if (!shown.length) return;
        var gh = document.createElement('div');
        gh.className = 'ghead';
        gh.innerHTML = '<h2>' + biIn(g) + '</h2><span id="gh-' + c.id + '-' + g.k + '">' + items.filter(isDone).length + ' / ' + items.length + '</span>';
        listEl.appendChild(gh);
        shown.forEach(function(e){
          liste.push(e);
          var art = document.createElement('article');
          art.id = 'x-' + e.id;
          art.className = cardClass(e);
          art.innerHTML = cardHead(e) + '<div class="exo-b"' + (opened[e.id] ? '' : ' hidden') + '></div>';
          listEl.appendChild(art);
          if (opened[e.id]) renderBody(e, $('.exo-b', art));
          bindCard(e, art);
        });
      });
      if (!listEl.firstChild) listEl.innerHTML = '<div class="card">' + bi({ fr: '<p><b>Bravo !</b> Tous les exercices de cette liste sont réussis.</p>', it: '<p><b>Brava!</b> Hai risolto tutti gli esercizi di questa lista.</p>' }) + '</div>';
      refreshSummary();
      if (focus && !document.getElementById('x-' + focus)) setFocus(null);
    }
    /* À l'ouverture, la liste montre le premier groupe où il reste un exercice à faire : une liste courte */
    function premierGroupe(){
      for (var n = 0; n < groups.length; n++) if (EX.some(function(e){ return e.group === groups[n].k && !isDone(e); })) return groups[n].k;
      return 'all';
    }
    function setFilter(f){
      if (focus) setFocus(null);
      filter = f;
      $$('.ex-filter .chip', vEx).forEach(function(x){ x.setAttribute('aria-pressed', String(x.dataset.f === f)); });
      renderList();
    }
    $$('.ex-filter .chip', vEx).forEach(function(ch){ ch.addEventListener('click', function(){ setFilter(ch.dataset.f); }); });
    document.addEventListener('langchange', function(){
      EX.forEach(function(e){ var art = document.getElementById('x-' + e.id); if (art){ var m = $('.exo-m', art); if (m){ var tmp = document.createElement('div'); tmp.innerHTML = cardHead(e); m.innerHTML = $('.exo-m', tmp).innerHTML; } } });
    });
    EX.forEach(markLinks);

    /* ---------- Entraînement ---------- */
    var vTr = mkView('entrainement', c, vhead({ fr: 'Questions sans fin', it: 'Domande senza fine' }, { fr: 'Entraînement', it: 'Allenamento' },
      { fr: 'Une nouvelle question à chaque fois, avec d’autres nombres. Choisis un thème et enchaîne les bonnes réponses.', it: 'Ogni volta una domanda nuova, con altri numeri. Scegli un argomento e fai una serie di risposte giuste.' }) +
      /* en haut : les thèmes et une barre qui se remplit en cinq bonnes réponses de suite ; en bas, toujours à portée : la série et « Nouvelle question » */
      '<div class="pghead trhead ui"><div class="chips tr-modes" role="group" aria-label="Thème">' + chip('m', 'mix', { fr: 'Tout mélangé', it: 'Tutto misto' }, true) + c.modes.map(function(m){ return chip('m', m.k, m); }).join('') + '</div>' + pgBar() + '</div>' +
      '<div class="card tr-card"></div>' +
      '<div class="pgnav ui"><div class="pgnav-in tr-nav"><div class="tr-stats"><span><span class="fr">Série</span><span class="it">Serie</span> <b class="tr-streak">0</b></span>' +
      '<span><span class="fr">Record</span><span class="it">Record</span> <b class="tr-best">0</b></span><span><span class="fr">Réussies</span><span class="it">Giuste</span> <b class="tr-total">0</b></span></div>' +
      '<button class="btn pri tr-next" type="button">' + biUI('Nouvelle question', 'Nuova domanda') + ICON_NEXT + '</button></div></div>');
    var trMode = 'mix', trQ = null, trCard = $('.tr-card', vTr), trLast = '';
    vTr.classList.add('pg');
    function trStats(){
      $('.tr-streak', vTr).textContent = st.tr.streak; $('.tr-best', vTr).textContent = st.tr.best; $('.tr-total', vTr).textContent = st.tr.total;
      setBar(vTr, st.tr.streak ? ((st.tr.streak - 1) % 5 + 1) * 20 : 0);      /* pleine à 5, 10, 15... : Hector félicite */
    }
    function nextTraining(){
      var m, q, tries = 0;
      /* On évite de reposer deux fois de suite exactement la même question */
      do { m = trMode === 'mix' ? pick(c.mix) : trMode; q = c.gen[m](); tries++; } while (tries < 6 && JSON.stringify(q.text) === trLast);
      trQ = q; trLast = JSON.stringify(q.text);
      trCard.innerHTML = '<span class="qtype">' + biIn(trQ.type) + '</span><div class="qtext">' + B(trQ.text) + '</div><div class="part tr-part"></div>';
      mountPart($('.tr-part', trCard), trQ.part, '?', {
        id: 'tr-in-' + c.id,
        onSolved: function(v, first){ if (first){ st.tr.streak++; st.tr.total++; if (st.tr.streak > st.tr.best) st.tr.best = st.tr.streak; } else { st.tr.total++; } save(); trStats(); if (first && st.tr.streak % 5 === 0) owlEvt('serie', st.tr.streak); },
        onWrong: function(){ st.tr.streak = 0; save(); trStats(); },
        onReveal: function(){ st.tr.streak = 0; save(); trStats(); $('.fbw', trCard).innerHTML = fbHTML('mid', MSG.seen); }
      });
      serreTr();
    }
    /* une question un peu trop haute pour l'écran se resserre : le bouton du bas ne cache rien */
    function serreTr(){
      if (vTr.hidden || !trQ) return;
      trCard.classList.remove('juste');
      if (trCard.offsetHeight > budget(trCard)) trCard.classList.add('juste');
    }
    document.addEventListener('langchange', serreTr);
    $('.tr-next', vTr).addEventListener('click', function(){ nextTraining(); window.scrollTo(0, 0); });
    $$('.tr-modes .chip', vTr).forEach(function(ch){
      ch.addEventListener('click', function(){ trMode = ch.dataset.m; press($$('.tr-modes .chip', vTr), ch); nextTraining(); });
    });
    trStats();

    /* ---------- Contrôle blanc ---------- */
    var vTe = mkView('controle', c, '<div class="vhead"><p class="eyebrow">' + biIn({ fr: 'Comme le jour du contrôle', it: 'Come il giorno della verifica' }) + '</p><h1><span class="fr">Contrôle blanc</span><span class="it sub-it">Verifica di prova</span></h1></div><div class="card test-box"></div>');
    var testBox = $('.test-box', vTe), testQs = null, testDone = false;
    /* Le contrôle se fait page par page, une question à la fois : la barre avance en haut, Précédent / Suivant en bas */
    var tHead = document.createElement('div'), tNav = document.createElement('div'), TL = { el: testBox, base: [], units: [], pages: null, key: '' }, tPage = 0, tQ = [];
    tHead.className = 'pghead exhead ui';
    tHead.innerHTML = '<div class="exhead-r"><span class="ex-where"><span class="fr">Contrôle blanc</span><span class="it">Verifica di prova</span></span><span class="t-rep"></span></div>' + pgBar();
    vTe.insertBefore(tHead, testBox);
    tNav.className = 'pgnav ui'; tNav.innerHTML = pgNavHTML();
    vTe.appendChild(tNav);
    vTe.classList.add('pg');
    /* Les unités à mettre en pages : la consigne, chaque question avec ses réponses, puis sa correction, la page « Corriger », le résultat */
    function testUnits(){
      var u = [], H = budget(testBox), enfants = [].slice.call(testBox.children);
      tQ = [];
      $$('.pg-off', testBox).forEach(function(e){ e.classList.remove('pg-off'); });
      /* une question (avec ses réponses) plus haute que l'écran se resserre pour y tenir */
      $$('.tq', testBox).forEach(function(el){
        var autres = enfants.filter(function(x){ return x !== el; }).concat([$('.fbw', el)]);
        el.classList.remove('juste');
        autres.forEach(function(x){ x.classList.add('pg-off'); });
        if (testBox.offsetHeight > H) el.classList.add('juste');
        autres.forEach(function(x){ x.classList.remove('pg-off'); });
      });
      [].forEach.call(testBox.children, function(el){
        if (el.hidden || !el.firstChild) return;
        if (el.classList.contains('tq')){
          tQ[Number(el.dataset.i)] = u.length;
          u.push({ els: [$('.qtext', el), $('.choices', el)], anc: [el], entier: true, brk: true });      /* une question par page */
          [].forEach.call($('.fbw', el).children, function(x){ u.push({ els: [x], anc: [el] }); });
        } else if (el.classList.contains('test-intro')) u.push({ els: [el], anc: [] });
        else [].forEach.call(el.children, function(x, n){ u.push({ els: [x], anc: [el], brk: n === 0, keep: x.tagName === 'P' }); });      /* page « Corriger », résultat */
      });
      u.forEach(function(x, n){ x.id = n; x.brk = !!x.brk; x.tete = false; x.keep = !!x.keep; x.on = true; x.anc.forEach(function(a){ a._pg = 0; }); });
      u.forEach(function(x){ x.anc.forEach(function(a){ a._pg++; }); });
      TL.base = TL.units = u; TL.pages = null; TL.key = '';
    }
    function showT(k){
      if (vTe.hidden || !TL.base.length) return;
      if (!TL.pages || TL.key !== pgKey(TL)) paginate(TL);
      k = Math.max(0, Math.min(TL.pages.length - 1, k)); tPage = k;
      var fin = k === TL.pages.length - 1;
      TL.units.forEach(function(u, n){ vis(TL, n, TL.pages[k].indexOf(n) >= 0); });
      setBar(tHead, (k + 1) / TL.pages.length * 100);
      $('.pg-count', tNav).textContent = (k + 1) + ' / ' + TL.pages.length;
      $('.pg-prev', tNav).disabled = k === 0;
      $('.pg-next', tNav).disabled = fin && !testDone;      /* à la dernière page : on corrige ; après la correction : un nouveau contrôle */
      $('.pg-next-t', tNav).innerHTML = fin && testDone ? biUI('Nouveau contrôle', 'Nuova verifica') : biUI('Suivant', 'Avanti');
      window.scrollTo(0, 0);
    }
    function tPas(d){ if (d > 0 && testDone && TL.pages && tPage === TL.pages.length - 1) newTest(); else showT(tPage + d); }
    function retest(){      /* au même endroit après un nouveau découpage (langue, polices, rotation de l'écran) */
      if (vTe.hidden || !TL.pages) return;
      var el = TL.units[TL.pages[tPage][0]].els[0], n, id = 0;
      testUnits(); paginate(TL);
      for (n = TL.base.length - 1; n >= 0; n--) if (TL.base[n].els.indexOf(el) >= 0) id = n;
      showT(pageOf(TL, id));
    }
    $('.pg-prev', tNav).addEventListener('click', function(){ tPas(-1); });
    $('.pg-next', tNav).addEventListener('click', function(){ tPas(1); });
    glisser(vTe, function(d){ if (d < 0 || !TL.pages || tPage < TL.pages.length - 1) showT(tPage + d); });
    document.addEventListener('langchange', retest);
    var tTimer = null, tLarg = window.innerWidth;
    window.addEventListener('resize', function(){ clearTimeout(tTimer); tTimer = setTimeout(function(){ if (tLarg !== window.innerWidth){ tLarg = window.innerWidth; retest(); } }, 180); });
    if (document.fonts && document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', function(){ clearTimeout(tTimer); tTimer = setTimeout(retest, 60); });
    /* Un numéro par question : on voit d'un coup d'œil où il manque une réponse (puis, après la correction, ce qui est juste ou faux) et on y va d'un geste */
    function nums(){
      return '<div class="t-nums ui">' + testQs.map(function(q, i){
        var k = !testDone ? (q.pick >= 0 ? ' on' : '') : q.pick === q.ok ? ' ok' : q.pick < 0 ? ' vide' : ' ko';
        return '<button class="t-num' + k + '" type="button" data-q="' + i + '">' + (i + 1) + (testDone ? '<i aria-hidden="true">' + (q.pick === q.ok ? '✓' : q.pick < 0 ? '?' : '✗') + '</i>' : '') + '</button>';
      }).join('') + '</div>';
    }
    testBox.addEventListener('click', function(ev){
      var b = ev.target.closest ? ev.target.closest('.t-num') : null;
      if (b && TL.pages) showT(pageOf(TL, tQ[Number(b.dataset.q)]));
    });
    function optKey(o){ return typeof o === 'string' ? o : o.fr; }
    function makeTest(){
      return shuffle(c.tq.slice()).slice(0, 10).map(function(f){
        var q, keys;
        do { q = f(); keys = q.opts.map(optKey); } while (keys.some(function(k, i){ return keys.indexOf(k) !== i; }));
        var good = q.opts[0];
        q.list = shuffle(q.opts.slice());
        q.ok = q.list.indexOf(good);
        q.pick = -1;
        return q;
      });
    }
    function optHTML(o){ return typeof o === 'string' ? '<span class="ct">' + typo(o, true) + '</span>' : '<span class="ct">' + biIn(o) + '</span>'; }
    function bestHTML(){ return st.bestTest == null ? '' : biIn({ fr: 'Ton meilleur score : ' + st.bestTest + ' / 20', it: 'Il tuo record: ' + st.bestTest + ' / 20' }); }
    function renderTest(){
      var h = '<div class="test-intro">' + bi({ fr: '10 questions, une seule bonne réponse par question, 2 points chacune. Réponds à tout, puis corrige.', it: '10 domande, una sola risposta giusta per domanda, 2 punti ciascuna. Rispondi a tutto, poi correggi.' }, 'p') + '<p class="best test-best"></p></div>';
      testQs.forEach(function(q, i){
        var qn = '<span class="qn">' + (i + 1) + '.</span> ';
        h += '<div class="tq" data-i="' + i + '"><div class="qtext">' + bi({ fr: qn + q.fr, it: qn + q.it }) + '</div><div class="choices">' +
          q.list.map(function(o, k){ return '<button class="choice" type="button" data-k="' + k + '" aria-pressed="false"><span class="k">' + 'abcd'.charAt(k) + '</span>' + optHTML(o) + '</button>'; }).join('') +
          '</div><div class="fbw"></div></div>';
      });
      h += '<div class="tfin"><p class="t-aide ui"><span class="fr">As-tu répondu à tout ? Touche un numéro pour revoir une question.</span><span class="it">Hai risposto a tutto? Tocca un numero per rivedere una domanda.</span></p><div class="t-numw"></div>' +
        '<div class="tools"><button class="btn pri test-go" type="button">' + biUI('Corriger', 'Correggi') + '</button></div></div><div class="test-res" aria-live="polite"></div>';
      testBox.innerHTML = h;
      $$('.tq', testBox).forEach(function(div){
        var q = testQs[Number(div.dataset.i)];
        $$('.choice', div).forEach(function(b){
          b.addEventListener('click', function(){
            if (testDone) return;
            q.pick = Number(b.dataset.k);
            $$('.choice', div).forEach(function(x){ var on = x === b; x.setAttribute('aria-pressed', String(on)); x.classList.toggle('sel', on); });
            countTest();
          });
        });
      });
      $('.test-go', testBox).addEventListener('click', gradeTest);
      countTest(); showBest();
      testUnits(); showT(0);
    }
    function countTest(){
      var n = testQs.filter(function(q){ return q.pick >= 0; }).length, r = { fr: n + ' / ' + testQs.length + ' réponses', it: n + ' / ' + testQs.length + ' risposte' };
      $('.t-numw', testBox).innerHTML = nums();
      $('.t-rep', tHead).innerHTML = '<span class="fr">' + r.fr + '</span><span class="it">' + r.it + '</span>';      /* en haut : où on en est dans les réponses */
    }
    function gradeTest(){
      var score = 0;
      testDone = true;
      $$('.tq', testBox).forEach(function(div){
        var q = testQs[Number(div.dataset.i)], good = q.pick === q.ok;
        if (good) score += 2;
        $$('.choice', div).forEach(function(x){
          var k = Number(x.dataset.k);
          x.disabled = true; x.classList.remove('sel');
          if (k === q.ok) x.classList.add('ok'); else if (k === q.pick) x.classList.add('ko');
        });
        $('.fbw', div).innerHTML = '<p class="fb ' + (good ? 'ok' : 'ko') + '">' + biIn(good ? { fr: 'Juste : +2 points.', it: 'Giusto: +2 punti.' } : q.pick < 0 ? { fr: 'Pas de réponse.', it: 'Nessuna risposta.' } : { fr: 'Faux.', it: 'Sbagliato.' }) + '</p><div class="panel">' + bi({ fr: '<p>' + q.exp.fr + '</p>', it: '<p>' + q.exp.it + '</p>' }) + (q.exp.calc || '') + '</div>';
      });
      if (st.bestTest == null || score > st.bestTest){ st.bestTest = score; save(); }
      var msg = score === 20 ? { fr: 'Parfait ! Tu maîtrises le chapitre.', it: 'Perfetto! Sai bene il capitolo.' } : score >= 14 ? { fr: 'Très bien ! Lis les corrections, puis refais un contrôle.', it: 'Molto bene! Leggi le correzioni, poi rifai una verifica.' } : score >= 10 ? { fr: 'Bien ! Pour les questions ratées, relis le cours.', it: 'Bene! Per le domande sbagliate, rileggi la lezione.' } : c.low;
      /* le résultat d'abord, puis les questions corrigées, page par page */
      $('.test-res', testBox).innerHTML = '<div class="score"><span class="big">' + score + ' / 20</span>' + '<div class="coach" data-owl-host><div class="owl-slot test-owl"></div><div class="bubble"><span class="fr">' + typo(msg.fr, true) + '</span><span class="it">' + msg.it + '</span></div></div></div>' +
        '<p class="t-aide ui"><span class="fr">Touche un numéro pour voir sa correction.</span><span class="it">Tocca un numero per vedere la correzione.</span></p>' + nums() +
        '<div class="tools"><button class="btn pri test-new" type="button">' + biUI('Nouveau contrôle', 'Nuova verifica') + ICON_NEXT + '</button></div>';
      $('.test-go', testBox).disabled = true;
      $('.test-new', testBox).addEventListener('click', function(){ newTest(); });
      showBest(); owlEvt('note', score, $('.test-owl', testBox));
      testBox.insertBefore($('.test-res', testBox), testBox.firstChild);
      [].forEach.call(testBox.children, function(el){ if (el.classList.contains('tfin') || el.classList.contains('test-intro')) el.hidden = true; });
      $('.t-rep', tHead).textContent = score + ' / 20';
      testUnits(); showT(0);
    }
    function showBest(){ var h = bestHTML(); $$('.test-best', vTe).forEach(function(e){ e.innerHTML = h; }); }
    function newTest(){ testQs = makeTest(); testDone = false; renderTest(); }

    /* ---------- Cours : des pages qui tiennent à l'écran ---------- */
    /* Chaque partie du cours est découpée en petites unités (un titre, une paire de paragraphes fr + it, un calcul, une ligne
       de tableau...) regroupées en pages à la hauteur de l'écran. Rien n'est déplacé dans le document : une page montre ses
       unités et cache les autres (classe pg-off). En haut, une barre se remplit ; en bas, Précédent et Suivant. */
    var vCo = document.getElementById('v-cours-' + c.id), toc = $('.toc', vCo), lessons = $$('.lesson', vCo);
    var PG = { L: {}, cur: null, page: 0 };
    function tocMark(id){
      $$('.chip', toc).forEach(function(ch){ var on = ch.dataset.go === id; ch.setAttribute('aria-pressed', String(on)); if (on) toc.scrollLeft = ch.offsetLeft - 24; });
    }
    function hasText(el){ for (var n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 3 && /\S/.test(n.nodeValue)) return true; return false; }
    function isFrame(el){      /* un cadre : on découpe à l'intérieur (encadré, tableau ligne par ligne, liste, série d'exercices) */
      var k = el.classList, tg = el.tagName;
      return k.contains('box') || k.contains('tw') || k.contains('sheet') || k.contains('kw') || k.contains('go-ex') || k.contains('go-l') || tg === 'TBODY' ||
        (tg === 'TABLE' && !k.contains('mult') && !k.contains('bt')) || ((tg === 'UL' || tg === 'OL') && !k.contains('fr') && !k.contains('it'));
    }
    function isDecor(el){ var k = el.classList; return k.contains('tag') || k.contains('go-t') || k.contains('ph') || el.tagName === 'THEAD'; }      /* affiché avec son cadre, jamais seul */
    function numerote(ol){ if (ol.tagName === 'OL') kidsOf(ol).forEach(function(li, n){ li.setAttribute('value', n + 1); }); }      /* un numéro garde sa valeur même si la liste est coupée */
    function kidsOf(el){ return [].filter.call(el.children, function(x){ return !isDecor(x); }); }
    function sameShape(a, b){
      if (a.tagName !== b.tagName || hasText(a) || hasText(b)) return false;
      var x = kidsOf(a), y = kidsOf(b);
      return x.length > 0 && x.length === y.length && x.every(function(e, n){ return e.tagName === y[n].tagName; });
    }
    /* Une paire fr + it de même forme (deux listes de même longueur, deux blocs des mêmes paragraphes) se découpe élément par élément */
    function pairUnits(a, b, anc){
      if (a.classList.contains('calc') && b.classList.contains('calc') && a.tagName === 'DIV'){
        /* un calcul posé écrit dans chaque langue : coupé aux mêmes endroits des deux côtés, jamais au milieu d'une ligne */
        var ca = calcUnits(a, anc.concat([a, b])), cb = calcUnits(b, anc.concat([a, b]));
        if (ca.length === cb.length) return ca.map(function(u, n){ return { els: u.els.concat(cb[n].els), anc: u.anc, mi: u.els.length }; });      /* mi : où commence l'italien */
        return [{ els: [a, b], anc: anc }];
      }
      if ((a.tagName === 'DIV' || a.tagName === 'UL' || a.tagName === 'OL') && sameShape(a, b)){
        var x = kidsOf(a), y = kidsOf(b), out = [], anc2 = anc.concat([a, b]);
        numerote(a); numerote(b);
        x.forEach(function(e, n){ out = out.concat(pairUnits(e, y[n], anc2)); });
        return out;
      }
      return [{ els: [a, b], anc: anc }];
    }
    /* Un calcul posé se coupe entre deux calculs (jamais au milieu d'une suite d'égalités ni d'une résolution d'équation) */
    function calcUnits(calc, anc){
      var kids = [].slice.call(calc.children), rows = [], n = 0, out = [], cur = null, cont = false, apresLib = false, apresTexte = false;
      while (n < kids.length){
        var e = kids[n], k = e.classList, a = kids[n + 1], b = kids[n + 2], r;
        if (k.contains('cn') && rows.length){ rows[rows.length - 1].els.push(e); n++; continue; }      /* une remarque reste sous son étape */
        if (!k.contains('cl')){ rows.push({ els: [e], texte: true }); n++; continue; }
        if (k.contains('seul')){ rows.push({ els: [e], seul: true }); n++; continue; }
        r = { els: [e], lib: !k.contains('eqv') && !!e.textContent.trim(), suite: k.contains('eqv') };
        n++;
        if (a && a.classList.contains('cg')){ r.els.push(a); n++; if (!a.textContent.trim()) r.suite = true; if (b && b.classList.contains('cd')){ r.els.push(b); n++; } }
        else if (a && a.classList.contains('ce')){ r.els.push(a); n++; if (/^[=≈]/.test(a.textContent.trim())) r.suite = true; }
        rows.push(r);
      }
      var nb = 0;
      rows.forEach(function(r){
        var neuf = !cur || r.texte || r.seul || apresTexte || (!apresLib && (r.lib || (!r.suite && (cont || nb >= 6))));
        if (neuf){ cur = { els: [], anc: anc }; out.push(cur); cont = false; nb = 0; }
        cur.els = cur.els.concat(r.els); nb++;
        apresLib = !!r.seul; apresTexte = !!r.texte;
        if (r.suite) cont = true;
      });
      return out;
    }
    function unitsOf(el, anc){
      var out = [], kids = kidsOf(el);
      numerote(el);
      for (var n = 0; n < kids.length; n++){
        var k = kids[n], nx = kids[n + 1];
        if (k.classList.contains('calc') && k.tagName === 'DIV'){ out = out.concat(calcUnits(k, anc.concat([k]))); continue; }
        if (isFrame(k) && !hasText(k)){ var sub = unitsOf(k, anc.concat([k])); if (sub.length){ out = out.concat(sub); continue; } }
        if (k.classList.contains('fr') && nx && nx.classList.contains('it')){ out = out.concat(pairUnits(k, nx, anc)); n++; continue; }
        out.push({ els: [k], anc: anc });
      }
      return out;
    }
    function vis(L, n, on){
      var u = L.units[n];
      if (u.on === on) return;
      u.on = on;
      u.els.forEach(function(e){ e.classList.toggle('pg-off', !on); });
      u.anc.forEach(function(a){ a._pg = (a._pg || 0) + (on ? 1 : -1); a.classList.toggle('pg-off', a._pg <= 0); });
    }
    lessons.forEach(function(l){
      var units = unitsOf(l, []);
      units.forEach(function(u, n){
        var e = u.els[0], h = /^H[34]$/.test(e.tagName);
        u.id = n;
        u.brk = h;                                                                                   /* un titre commence une page */
        u.tete = e.classList.contains('lhead');
        u.keep = h || u.tete || e.classList.contains('lbl') || /[:：]\s*$/.test(e.textContent);      /* jamais en bas de page : la suite vient avec */
        u.on = true;
        u.anc.forEach(function(a){ a._pg = (a._pg || 0) + 1; });                                     /* un cadre se montre tant qu'une de ses unités est affichée */
      });
      var L = PG.L[l.id] = { el: l, base: units, units: units, pages: null, key: '' };
      units.forEach(function(u, n){ vis(L, n, false); });
    });
    /* Barre de progression sous les parties, boutons de page au-dessus des onglets */
    var pgHead = document.createElement('div'), pgNav = document.createElement('div');
    pgHead.className = 'pghead ui';
    toc.parentNode.insertBefore(pgHead, toc); pgHead.appendChild(toc);
    pgHead.insertAdjacentHTML('beforeend', pgBar());
    pgNav.className = 'pgnav ui';
    pgNav.innerHTML = pgNavHTML();
    vCo.appendChild(pgNav);
    vCo.classList.add('pg');
    /* Ce dont dépend le découpage : la langue affichée, la largeur de l'écran et la hauteur disponible pour une page */
    function pgKey(L){ return store.lang + '|' + window.innerWidth + '|' + Math.round(budget(L.el) / 16); }
    /* Hauteur disponible pour une page : de la barre de progression jusqu'aux boutons du bas */
    function budget(l){
      var top = l.getBoundingClientRect().top + window.pageYOffset;
      var bas = parseFloat(getComputedStyle(mainEl).paddingBottom) + parseFloat(getComputedStyle(l.closest('.view')).paddingBottom);      /* place gardée pour les boutons et les onglets */
      return Math.max(240, window.innerHeight - top - bas);
    }
    function visible(u){ return u.els.some(function(e){ return e.getClientRects().length > 0; }); }
    /* Les cadres (encadré, liste, tableau, calcul) qui s'ouvrent à l'unité n, du plus grand au plus petit, et la dernière unité d'un cadre */
    function ouvre(U, n){ var prec = n > 0 ? U[n - 1].anc : []; return U[n].anc.filter(function(f){ return prec.indexOf(f) < 0; }); }
    function finDe(U, n, f){ var e = n; while (e + 1 < U.length && U[e + 1].anc.indexOf(f) >= 0) e++; return e; }
    function montre(L, a, b, on){ for (var n = a; n <= b; n++) vis(L, n, on); }
    function copie(u, els){ var o = {}, k; for (k in u) o[k] = u[k]; o.els = els; o.on = false; return o; }
    function paginate(L){
      var H, U, pages = [], a = 0, b, page, real;
      L.units.forEach(function(u, n){ vis(L, n, false); });
      /* on repart des unités de base : les séparations faites pour une autre langue ou une autre taille d'écran ne valent plus */
      U = L.units = L.base.map(function(u){ return copie(u, u.els); });
      H = budget(L.el);
      while (a < U.length){
        page = []; real = false; b = a;
        while (b < U.length){
          if (real && U[b].brk) break;
          /* Un encadré, une liste, un tableau ou un calcul qui tient sur une page n'est pas coupé : il passe entier, ici ou à la page suivante */
          var cadres = ouvre(U, b), fait = 0, e, h;
          for (var q = 0; q < cadres.length && !fait; q++){
            e = finDe(U, b, cadres[q]);
            if (e === b) continue;
            montre(L, b, e, true);
            if (L.el.offsetHeight <= H){ for (var n2 = b; n2 <= e; n2++){ page.push(n2); if (!U[n2].keep && visible(U[n2])) real = true; } b = e + 1; fait = 1; break; }
            montre(L, b, e, false);
            if (real || (page.length && U[page[0]].tete)){
              /* tiendrait-il sur une page à lui (sous les titres qui le précèdent, sans le titre de la partie) ? */
              var garde = real ? [] : page.slice(1);
              page.forEach(function(n){ vis(L, n, false); }); garde.forEach(function(n){ vis(L, n, true); }); montre(L, b, e, true);
              h = L.el.offsetHeight;
              montre(L, b, e, false); garde.forEach(function(n){ vis(L, n, false); }); page.forEach(function(n){ vis(L, n, true); });
              if (h <= H){
                if (real) fait = 2;
                else { page.slice(1).forEach(function(n){ vis(L, n, false); }); b = page[0] + 1; page = [page[0]]; fait = 2; }      /* le titre de la partie, seul sur sa page */
              }
            }
          }
          if (fait === 2) break;
          if (fait) continue;
          vis(L, b, true);
          if (L.el.offsetHeight > H){
            if (real){
              vis(L, b, false);
              /* pas de dernier élément de liste tout seul sur la page suivante : l'avant-dernier l'accompagne */
              var f = U[b].anc[U[b].anc.length - 1], der = page[page.length - 1], dans = function(n){ return U[n].anc[U[n].anc.length - 1] === f; };
              if (f && /^(UL|OL|TBODY)$/.test(f.tagName) && finDe(U, b, f) === b && page.length > 2 && dans(der) && dans(page[page.length - 2]) && !U[der].keep){ vis(L, page.pop(), false); b--; }
              break;
            }
            if (page.length && U[page[0]].tete){      /* la suite ne tient pas sous le titre de la partie : il ouvre la partie, seul sur sa page */
              vis(L, b, false); page.slice(1).forEach(function(n){ vis(L, n, false); });
              b = page[0] + 1; page = [page[0]]; break;
            }
            var mi = U[b].entier ? 0 : U[b].mi || (U[b].els.length === 2 ? 1 : 0);
            if (mi && U[b].els.every(function(e){ return e.getClientRects().length > 0; })){
              /* le français et sa traduction ne tiennent pas ensemble sur l'écran : le français d'abord, l'italien sur la page suivante */
              vis(L, b, false);
              var fr = copie(U[b], U[b].els.slice(0, mi)), it = copie(U[b], U[b].els.slice(mi));
              fr.tete = it.tete = fr.keep = it.brk = false;
              fr.entier = it.entier = true;      /* chaque moitié reste d'un seul tenant */
              U.splice(b, 1, fr, it);
              continue;
            }
            if (page.length){
              /* il n'y a encore que des annonces sur la page et la suite n'y tient pas : si elle tient seule sur une page, elle y va */
              page.forEach(function(n){ vis(L, n, false); });
              h = L.el.offsetHeight;
              page.forEach(function(n){ vis(L, n, true); });
              if (h <= H){ vis(L, b, false); break; }
            }
          }
          page.push(b); if (!U[b].keep && visible(U[b])) real = true; b++;
        }
        /* une annonce (« ... : ») restée en bas de page passe à la page suivante avec ce qu'elle annonce, si les deux y tiennent ensemble */
        var nk = 0, haut, h2;
        while (b < U.length && nk < page.length - 1 && U[page[page.length - 1 - nk]].keep) nk++;
        if (nk){
          haut = page.slice(0, page.length - nk);
          haut.forEach(function(n){ vis(L, n, false); }); vis(L, b, true);
          h2 = L.el.offsetHeight;
          vis(L, b, false); haut.forEach(function(n){ vis(L, n, true); });
          if (h2 <= H) while (nk--){ vis(L, page.pop(), false); b--; }
        }
        if (!real && pages.length && !page.some(function(n){ return visible(U[n]); })) pages[pages.length - 1] = pages[pages.length - 1].concat(page);      /* rien à voir dans cette langue : pas de page vide */
        else pages.push(page);
        page.forEach(function(n){ vis(L, n, false); });
        a = b;
      }
      L.pages = pages; L.key = pgKey(L); PG.w = window.innerWidth;
    }
    function pageOf(L, id){      /* la page où se trouve une unité de base */
      for (var k = 0; k < L.pages.length; k++) if (L.pages[k].some(function(n){ return L.units[n].id >= id; })) return k;
      return L.pages.length - 1;
    }
    function showPage(L, k){
      k = Math.max(0, Math.min(L.pages.length - 1, k));
      L.units.forEach(function(u, n){ vis(L, n, L.pages[k].indexOf(n) >= 0); });
      PG.cur = L; PG.page = k;
      st.pu = st.pu || {};
      var prem = L.units[L.pages[k][0]].id;
      if (st.pu[L.el.id] !== prem){ st.pu[L.el.id] = prem; save(); }
      var n = lessons.indexOf(L.el), fin = n === lessons.length - 1 && k === L.pages.length - 1;
      setBar(pgHead, (k + 1) / L.pages.length * 100);
      $('.pg-count', pgNav).textContent = (k + 1) + ' / ' + L.pages.length;
      $('.pg-prev', pgNav).disabled = n === 0 && k === 0;
      $('.pg-next-t', pgNav).innerHTML = fin ? biUI('Exercices', 'Esercizi') : biUI('Suivant', 'Avanti');
      window.scrollTo(0, 0);
    }
    /* Affiche une partie. où : rien = là où on s'était arrêté dans cette partie ; 'debut' ; 'fin' ; ou le numéro d'une unité */
    function showPart(id, ou){
      if (!PG.L[id]) id = lessons[0].id;
      var L = PG.L[id];
      lessons.forEach(function(l){ l.hidden = l.id !== id; });
      tocMark(id);
      if (st.part !== id){ st.part = id; save(); }
      if (vCo.hidden) return;                                   /* les pages se mesurent : il faut que la vue soit affichée */
      if (!L.pages || L.key !== pgKey(L)) paginate(L);
      if (ou === 'fin') return showPage(L, L.pages.length - 1);
      showPage(L, pageOf(L, ou === 'debut' ? 0 : typeof ou === 'number' ? ou : (st.pu && st.pu[id]) || 0));
    }
    function step(d){
      var L = PG.cur;
      if (!L || vCo.hidden) return;
      var k = PG.page + d;
      if (k >= 0 && k < L.pages.length) return showPage(L, k);
      var o = lessons[lessons.indexOf(L.el) + (d > 0 ? 1 : -1)];
      if (o) showPart(o.id, d > 0 ? 'debut' : 'fin');
      else if (d > 0) location.hash = '#' + c.id + '/exercices';
    }
    $('.pg-prev', pgNav).addEventListener('click', function(){ step(-1); });
    $('.pg-next', pgNav).addEventListener('click', function(){ step(1); });
    /* Montre un endroit du cours : une partie (là où on s'y était arrêté, ou au début si on y est déjà) ou un titre à l'intérieur */
    function reveal(el){
      var l = el.classList.contains('lesson') ? el : el.closest('.lesson');
      if (!l) return;
      if (el === l) return showPart(l.id, PG.cur && PG.cur.el === l && !vCo.hidden ? 'debut' : undefined);
      var U = PG.L[l.id].base, n = 0;
      for (var k = 0; k < U.length; k++) if (U[k].els.some(function(e){ return e === el || e.contains(el) || el.contains(e); })){ n = k; break; }
      showPart(l.id, n);
    }
    glisser(vCo, step);
    document.addEventListener('keydown', function(ev){
      var d = ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowLeft' ? -1 : 0;
      if (!d || ev.altKey || ev.ctrlKey || ev.metaKey || /^(INPUT|TEXTAREA|SELECT)$/.test(ev.target.tagName)) return;
      if (!vCo.hidden) step(d); else if (!vEx.hidden){ if (focus) pas(d); } else if (!vTe.hidden && (d < 0 || !TL.pages || tPage < TL.pages.length - 1)) showT(tPage + d);
    });
    /* La hauteur des pages dépend de la langue affichée, de la taille de l'écran et des polices : on redécoupe quand elles changent */
    function redecoupe(){ if (!vCo.hidden && st.part) showPart(st.part); }
    document.addEventListener('langchange', redecoupe);
    var pgTimer = null;
    /* à la rotation de l'écran seulement : sur iPhone, la hauteur change aussi quand la barre de Safari se replie, et la page lue ne doit pas bouger */
    window.addEventListener('resize', function(){ clearTimeout(pgTimer); pgTimer = setTimeout(function(){ if (PG.cur && PG.w !== window.innerWidth) redecoupe(); }, 180); });
    if (document.fonts){
      /* avec une police de remplacement, le texte n'a pas la même hauteur : dès qu'une police arrive, les pages sont à refaire */
      var police = function(){ lessons.forEach(function(l){ PG.L[l.id].key = ''; }); clearTimeout(pgTimer); pgTimer = setTimeout(redecoupe, 60); };
      if (document.fonts.ready) document.fonts.ready.then(police);
      if (document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', police);
    }
    showPart(st.part || lessons[0].id);
    /* Bilan à cocher : les coches restent enregistrées */
    $$('input[data-chk]', vCo).forEach(function(x){
      st.checks = st.checks || {};
      x.checked = !!st.checks[x.getAttribute('data-chk')];
      x.addEventListener('change', function(){ st.checks[x.getAttribute('data-chk')] = x.checked ? 1 : 0; save(); if (x.checked) owlEvt('ok'); });
    });
    return {
      c: c, st: st, EX: EX,
      el: { cours: vCo, exercices: vEx, entrainement: vTr, controle: vTe },
      enter: function(v){
        plein();
        if (v === 'exercices'){ if (!listed) setFilter(premierGroupe()); else if (focus){ if (XL && XL.pages) refocus(); else setFocus(focus); } }
        if (v === 'entrainement'){ if (!trQ && c.mix.length) nextTraining(); else serreTr(); }
        if (v === 'controle'){ if (!testQs && c.tq.length) newTest(); else retest(); }
        if (v === 'cours') showPart(st.part || lessons[0].id);
      },
      stats: function(){ return { done: EX.filter(isDone).length, total: EX.length, best: st.tr.best, test: st.bestTest }; },
      reveal: reveal,
      /* Ouvre un exercice dans la liste et renvoie sa carte */
      openExo: function(id){
        var e = parId(id);
        if (!e) return null;
        if (!listed || (filter !== 'all' && filter !== e.group)) setFilter(e.group);
        setFocus(id);
        return document.getElementById('x-' + id);
      },
      setFilter: setFilter,
      /* Un contrôle blanc commencé et pas encore corrigé : on ne recharge pas la page à ce moment-là */
      busy: function(){ return !!testQs && !testDone && testQs.some(function(q){ return q.pick >= 0; }); }
    };
  }

  /* ---------- Chapitres, accueil, navigation ---------- */
  var ICON_PREV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
  var ICON_DOC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v4h4M10 12h5M10 16h5"/></svg>';
  var CH = {}, VIEWS = ['cours', 'exercices', 'entrainement', 'controle'];
  CHAPS.forEach(function(c){ CH[c.id] = makeChapter(c); });
  window.scolairOccupe = function(){ return CHAPS.some(function(c){ return CH[c.id].busy(); }); };
  var VNAME = { cours: { fr: 'le cours', it: 'la lezione' }, exercices: { fr: 'les exercices', it: 'gli esercizi' }, entrainement: { fr: 'l’entraînement', it: 'l’allenamento' }, controle: { fr: 'le contrôle blanc', it: 'la verifica di prova' } };
  function renderHome(){
    var h = '';
    CHAPS.forEach(function(c, i){
      var s = CH[c.id].stats(), pct = s.total ? Math.round(s.done / s.total * 100) : 0, last = i === CHAPS.length - 1 && CHAPS.length > 1;
      h += '<a class="chap" href="#' + c.id + '/' + (CH[c.id].st.v || 'cours') + '" data-ch="' + c.id + '"><span class="chap-n">' + c.sym + '</span><span class="chap-b">' +
        (last ? '<span class="chap-k ui"><span class="chap-new"><span class="fr">Nouveau</span><span class="it">Nuovo</span></span></span>' : '') +
        '<span class="chap-t"><span class="fr">' + c.title.fr + '</span><span class="it sub-it">' + c.title.it + '</span></span>' +
        '<span class="chap-s"><span class="fr">' + typo(c.sub.fr, true) + '</span><span class="it">' + c.sub.it + '</span></span>' +
        '<span class="prog"><i style="width:' + pct + '%"></i></span>' +
        '<span class="chap-m ui"><span><b>' + s.done + '</b> / ' + s.total + ' <span class="fr">exercices</span><span class="it">esercizi</span></span>' +
        '<span><span class="fr">série</span><span class="it">serie</span> <b>' + s.best + '</b></span>' +
        '<span><span class="fr">contrôle</span><span class="it">verifica</span> <b>' + (s.test == null ? MI : s.test) + '</b>/20</span></span>' +
        '</span><span class="chap-go" aria-hidden="true">' + ICON_NEXT + '</span></a>';
    });
    $('#home-list').innerHTML = h;
    var r = $('#home-resume'), l = store.last;
    if (l && CH[l.ch] && VIEWS.indexOf(l.v) >= 0){
      var c = CH[l.ch].c;
      r.innerHTML = '<a class="btn pri resume" href="#' + l.ch + '/' + l.v + '"><span class="ui"><span class="fr">' + typo('Reprendre : ' + c.short.fr + ', ' + VNAME[l.v].fr, true) + '</span><span class="it">Riprendi: ' + c.short.it + ', ' + VNAME[l.v].it + '</span></span>' + ICON_NEXT + '</a>';
    } else r.innerHTML = '';
  }

  var cur = { ch: null, v: 'accueil' }, scrolls = {}, pending = null, started = false;
  function keyOf(r){ return r.ch ? r.ch + '/' + r.v : 'accueil'; }
  function parseHash(){
    var h = (location.hash || '').replace(/^#\/?/, '');
    if (VIEWS.indexOf(h) >= 0 && CH.c10) return { ch: 'c10', v: h };
    var m = /^(c\d+)\/([a-z]+)$/.exec(h);
    if (m && CH[m[1]] && VIEWS.indexOf(m[2]) >= 0) return { ch: m[1], v: m[2] };
    return { ch: null, v: 'accueil' };
  }
  function route(){
    if (started) scrolls[keyOf(cur)] = window.pageYOffset;
    var r = parseHash(), k = keyOf(r), same = started && k === keyOf(cur);
    started = true; cur = r;
    $$('main > .view').forEach(function(s){ s.hidden = true; });
    var home = !r.ch, ch = home ? null : CH[r.ch];
    document.body.classList.toggle('at-home', home);
    document.documentElement.classList.remove('plein');      /* remis par la vue des exercices quand un exercice y est ouvert */
    if (home){ renderHome(); document.getElementById('v-accueil').hidden = false; }
    else {
      ch.el[r.v].hidden = false;
      ch.enter(r.v);
      if (ch.st.v !== r.v) ch.st.v = r.v;
      store.last = { ch: r.ch, v: r.v }; save();
      $$('.tab[data-v]').forEach(function(t){
        var v = t.dataset.v;
        t.setAttribute('href', '#' + r.ch + '/' + v);
        if (v === r.v) t.setAttribute('aria-current', 'page'); else t.removeAttribute('aria-current');
      });
    }
    $('.brand-t').innerHTML = home ? 'SCOLAIR' : '<span class="fr">' + ch.c.short.fr + '</span><span class="it">' + ch.c.short.it + '</span>';
    $('.brand-s').innerHTML = home ? '<span class="fr">Maths · Seconde</span><span class="it">Matematica · Seconde</span>' : 'SCOLAIR · Seconde';
    owlChapter(ch ? ch.c : null);
    setAbh();
    if (pending){ var f = pending; pending = null; f(); }
    else if (!same) window.scrollTo(0, scrolls[k] || 0);
  }
  function go(hash, then){
    pending = then || null;
    if (location.hash === hash) route(); else location.hash = hash;
  }
  /* Liens internes : data-go (un endroit du cours), data-exo (un exercice), data-exg (un groupe d'exercices) */
  document.addEventListener('click', function(ev){
    var t = ev.target.closest ? ev.target.closest('[data-go],[data-exo],[data-exg]') : null;
    if (!t) return;
    var id, ch;
    if (t.hasAttribute('data-go')){
      var el = document.getElementById(t.getAttribute('data-go')), sec = el && el.closest('section.view');
      ch = sec && CH[sec.getAttribute('data-ch')];
      if (!ch) return;
      ev.preventDefault();
      if (cur.ch === ch.c.id && cur.v === 'cours') ch.reveal(el);
      else go('#' + ch.c.id + '/cours', function(){ ch.reveal(el); });
    } else if (t.hasAttribute('data-exo')){
      id = t.getAttribute('data-exo');
      EX_ALL.forEach(function(e){ if (e.id === id) ch = CH[e.ch]; });
      if (!ch) return;
      ev.preventDefault();
      go('#' + ch.c.id + '/exercices', function(){ ch.openExo(id); });
    } else {
      ch = CH[t.getAttribute('data-ch')];
      if (!ch) return;
      ev.preventDefault();
      go('#' + ch.c.id + '/exercices', function(){ ch.setFilter(t.getAttribute('data-exg')); window.scrollTo(0, 0); });
    }
  });
  function setAbh(){
    var a = $('.appbar'), b = $('.tabbar'), s = document.documentElement.style;
    if (a) s.setProperty('--abh', a.offsetHeight + 'px');
    if (b && b.offsetHeight) s.setProperty('--tabh', b.offsetHeight + 'px');      /* les boutons de page se posent juste au-dessus des onglets */
  }
  window.addEventListener('resize', setAbh);
  window.addEventListener('hashchange', route);
