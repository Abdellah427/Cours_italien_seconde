  /* Moteur des chapitres : exercices du livre, entraînement, contrôle blanc, sommaire du cours. Une instance par chapitre. */
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

  function makeChapter(c){
    var st = chst(c), groups = c.groups;
    var EX = EX_ALL.filter(function(e){ return e.ch === c.id; });
    function gIndex(k){ for (var i = 0; i < groups.length; i++) if (groups[i].k === k) return i; return 99; }
    function rank(e){ var i = (c.order || []).indexOf(e.id); return gIndex(e.group) * 100000 + (i < 0 ? 50000 + e._i : i); }
    EX.sort(function(a, b){ return rank(a) - rank(b); });

    /* ---------- Exercices du livre ---------- */
    var vEx = mkView('exercices', c, vhead({ fr: 'Les exercices du livre', it: 'Gli esercizi del libro' }, { fr: 'Exercices', it: 'Esercizi' }, c.exLead) +
      '<div class="summary"><div class="row"><span class="ui"><span class="fr">Exercices réussis</span><span class="it">Esercizi risolti</span></span><span class="big ex-count">0 / 0</span></div><div class="prog"><i class="ex-bar"></i></div></div>' +
      '<div class="chips ui ex-filter" role="group" aria-label="Filtre">' + chip('f', 'all', { fr: 'Tous', it: 'Tutti' }, true) +
      groups.map(function(g){ return chip('f', g.k, g.chip || g); }).join('') + chip('f', 'todo', { fr: 'À faire', it: 'Da fare' }) + '</div><div class="ex-list"></div>');
    var listEl = $('.ex-list', vEx), filter = 'all', opened = {}, listed = false;
    function cardHead(e){
      var cap = /^cap/.test(e.id), n = cap ? 'Cap.<br>' + String(e.num).replace(/\D/g, '') : esc(e.num), L = curLang(), bits = [];
      if (e.page) bits.push('p.' + NB + e.page); else if (e.src) bits.push(esc(e.src[L]));
      if (e.stars) bits.push('<span class="stars" aria-label="' + e.stars + ' / 3">' + starStr(e.stars) + '</span>');
      if (e.tag) bits.push(esc(e.tag[L]));
      if (e.parts.length > 1 || e.parts[0].kind !== 'self') bits.push(e.parts.length + ' Q');
      return '<button class="exo-h" type="button" aria-expanded="' + (opened[e.id] ? 'true' : 'false') + '"><span class="exo-n' + (cap ? ' cap' : '') + (e.plus ? ' plus' : '') + '">' + n + '</span>' +
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
          onUnsolved: function(){ delete store.solved[pk(e, j)]; save(); refreshCard(e); refreshSummary(); }
        });
      });
    }
    function bindCard(e, art){
      var head = $('.exo-h', art), body = $('.exo-b', art);
      head.addEventListener('click', function(){
        var open = body.hidden;
        if (open && !body.firstChild) renderBody(e, body);
        body.hidden = !open; opened[e.id] = open;
        head.setAttribute('aria-expanded', String(open));
        art.classList.toggle('open', open);
      });
    }
    function markLinks(e){ $$('[data-exo="' + e.id + '"]').forEach(function(b){ b.classList.toggle('done', isDone(e)); }); }
    function refreshCard(e){
      markLinks(e);
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
      listed = true;
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
    }
    function setFilter(f){
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
      '<div class="chips ui tr-modes" role="group" aria-label="Thème">' + chip('m', 'mix', { fr: 'Tout mélangé', it: 'Tutto misto' }, true) + c.modes.map(function(m){ return chip('m', m.k, m); }).join('') + '</div>' +
      '<div class="stats ui"><div class="stat"><b class="tr-streak">0</b><small><span class="fr">Série</span><span class="it">Serie</span></small></div>' +
      '<div class="stat"><b class="tr-best">0</b><small><span class="fr">Record</span><span class="it">Record</span></small></div>' +
      '<div class="stat"><b class="tr-total">0</b><small><span class="fr">Réussies</span><span class="it">Giuste</span></small></div></div><div class="card tr-card"></div>');
    var trMode = 'mix', trQ = null, trCard = $('.tr-card', vTr), trLast = '';
    function trStats(){ $('.tr-streak', vTr).textContent = st.tr.streak; $('.tr-best', vTr).textContent = st.tr.best; $('.tr-total', vTr).textContent = st.tr.total; }
    function nextTraining(){
      var m, q, tries = 0;
      /* On évite de reposer deux fois de suite exactement la même question */
      do { m = trMode === 'mix' ? pick(c.mix) : trMode; q = c.gen[m](); tries++; } while (tries < 6 && JSON.stringify(q.text) === trLast);
      trQ = q; trLast = JSON.stringify(q.text);
      trCard.innerHTML = '<span class="qtype">' + biIn(trQ.type) + '</span><div class="qtext">' + B(trQ.text) + '</div><div class="part tr-part"></div>' +
        '<div class="tools"><button class="btn pri tr-next" type="button">' + biUI('Nouvelle question', 'Nuova domanda') + ICON_NEXT + '</button></div>';
      mountPart($('.tr-part', trCard), trQ.part, '?', {
        id: 'tr-in-' + c.id,
        onSolved: function(v, first){ if (first){ st.tr.streak++; st.tr.total++; if (st.tr.streak > st.tr.best) st.tr.best = st.tr.streak; } else { st.tr.total++; } save(); trStats(); if (first && st.tr.streak % 5 === 0) owlEvt('serie', st.tr.streak); },
        onWrong: function(){ st.tr.streak = 0; save(); trStats(); },
        onReveal: function(){ st.tr.streak = 0; save(); trStats(); $('.fbw', trCard).innerHTML = fbHTML('mid', MSG.seen); }
      });
      $('.tr-next', trCard).addEventListener('click', function(){ nextTraining(); trCard.scrollIntoView({ block: 'start' }); });
    }
    $$('.tr-modes .chip', vTr).forEach(function(ch){
      ch.addEventListener('click', function(){ trMode = ch.dataset.m; press($$('.tr-modes .chip', vTr), ch); nextTraining(); });
    });
    trStats();

    /* ---------- Contrôle blanc ---------- */
    var vTe = mkView('controle', c, '<div class="vhead"><p class="eyebrow">' + biIn({ fr: 'Comme le jour du contrôle', it: 'Come il giorno della verifica' }) + '</p><h1><span class="fr">Contrôle blanc</span><span class="it sub-it">Verifica di prova</span></h1>' +
      bi({ fr: '10 questions, une seule bonne réponse par question, 2 points chacune. Réponds à tout, puis corrige. Un nouveau sujet à chaque fois.', it: '10 domande, una sola risposta giusta per domanda, 2 punti ciascuna. Rispondi a tutto, poi correggi. Ogni volta un compito nuovo.' }, 'p', 'lead') +
      '<p class="best test-best"></p></div><div class="card test-box"></div>');
    var testBox = $('.test-box', vTe), testQs = null, testDone = false;
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
    function renderTest(){
      var h = '';
      testQs.forEach(function(q, i){
        var qn = '<span class="qn">' + (i + 1) + '.</span> ';
        h += '<div class="tq" data-i="' + i + '"><div class="qtext">' + bi({ fr: qn + q.fr, it: qn + q.it }) + '</div><div class="choices">' +
          q.list.map(function(o, k){ return '<button class="choice" type="button" data-k="' + k + '" aria-pressed="false"><span class="k">' + 'abcd'.charAt(k) + '</span>' + optHTML(o) + '</button>'; }).join('') +
          '</div><div class="fbw"></div></div>';
      });
      h += '<div class="tools"><button class="btn pri test-go" type="button">' + biUI('Corriger', 'Correggi') + '</button><span class="note-s test-count"></span></div><div class="test-res" aria-live="polite"></div>';
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
      countTest();
    }
    function countTest(){ var n = testQs.filter(function(q){ return q.pick >= 0; }).length; $('.test-count', testBox).innerHTML = biIn({ fr: n + ' / ' + testQs.length + ' réponses', it: n + ' / ' + testQs.length + ' risposte' }); }
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
        $('.fbw', div).innerHTML = '<p class="fb ' + (good ? 'ok' : 'ko') + '">' + biIn(good ? { fr: 'Juste : +2 points.', it: 'Giusto: +2 punti.' } : q.pick < 0 ? { fr: 'Pas de réponse.', it: 'Nessuna risposta.' } : { fr: 'Faux.', it: 'Sbagliato.' }) + '</p><div class="panel">' + bi({ fr: '<p>' + q.exp.fr + '</p>', it: '<p>' + q.exp.it + '</p>' }) + '</div>';
      });
      if (st.bestTest == null || score > st.bestTest){ st.bestTest = score; save(); }
      var msg = score === 20 ? { fr: 'Parfait ! Tu maîtrises le chapitre.', it: 'Perfetto! Sai bene il capitolo.' } : score >= 14 ? { fr: 'Très bien ! Lis les corrections, puis refais un contrôle.', it: 'Molto bene! Leggi le correzioni, poi rifai una verifica.' } : score >= 10 ? { fr: 'Bien ! Pour les questions ratées, relis le cours.', it: 'Bene! Per le domande sbagliate, rileggi la lezione.' } : c.low;
      $('.test-res', testBox).innerHTML = '<div class="score"><span class="big">' + score + ' / 20</span>' + '<div class="coach" data-owl-host><div class="owl-slot test-owl"></div><div class="bubble"><span class="fr">' + typo(msg.fr, true) + '</span><span class="it">' + msg.it + '</span></div></div></div><div class="tools"><button class="btn pri test-new" type="button">' + biUI('Nouveau contrôle', 'Nuova verifica') + ICON_NEXT + '</button></div>';
      $('.test-go', testBox).disabled = true;
      $('.test-new', testBox).addEventListener('click', function(){ newTest(); window.scrollTo(0, 0); });
      showBest(); owlEvt('note', score, $('.test-owl', testBox));
      $('.test-res', testBox).scrollIntoView({ block: 'center' });
    }
    function showBest(){ $('.test-best', vTe).innerHTML = st.bestTest == null ? '' : biIn({ fr: 'Ton meilleur score : ' + st.bestTest + ' / 20', it: 'Il tuo record: ' + st.bestTest + ' / 20' }); }
    function newTest(){ testQs = makeTest(); testDone = false; renderTest(); showBest(); }

    /* ---------- Cours : sommaire, parties ---------- */
    var vCo = document.getElementById('v-cours-' + c.id), toc = $('.toc', vCo), lessons = $$('.lesson', vCo);
    function tocMark(id){
      $$('.chip', toc).forEach(function(ch){ var on = ch.dataset.go === id; ch.setAttribute('aria-pressed', String(on)); if (on) toc.scrollLeft = ch.offsetLeft - 24; });
    }
    function showPart(id){
      if (!document.getElementById(id)) id = lessons[0].id;
      lessons.forEach(function(l){ l.hidden = l.id !== id; });
      tocMark(id);
      if (st.part !== id){ st.part = id; save(); }
    }
    /* Montre un endroit du cours : une partie entière ou un titre à l'intérieur d'une partie */
    function reveal(el, smooth){
      var l = el.classList.contains('lesson') ? el : el.closest('.lesson');
      if (c.paged && l) showPart(l.id); else if (l) tocMark(l.id);
      el.scrollIntoView({ behavior: smooth && !c.paged ? 'smooth' : 'auto', block: 'start' });
    }
    if (c.paged){
      lessons.forEach(function(l, i){
        var prev = lessons[i - 1], next = lessons[i + 1], nav = document.createElement('div');
        function b(x, dir){ return '<button class="btn' + (dir > 0 ? ' pri' : '') + '" type="button" data-go="' + x.id + '">' + (dir < 0 ? ICON_PREV : '') + '<span>' + $('.lhead h2', x).innerHTML.replace(/sub-it/g, '') + '</span>' + (dir > 0 ? ICON_NEXT : '') + '</button>'; }
        nav.className = 'pager ui';
        nav.innerHTML = (prev ? b(prev, -1) : '<span></span>') + (next ? b(next, 1) : '<a class="btn pri" href="#' + c.id + '/exercices">' + biUI('Passer aux exercices', 'Vai agli esercizi') + ICON_NEXT + '</a>');
        l.appendChild(nav);
      });
      showPart(st.part || lessons[0].id);
    }
    /* Bilan à cocher : les coches restent enregistrées */
    $$('input[data-chk]', vCo).forEach(function(x){
      st.checks = st.checks || {};
      x.checked = !!st.checks[x.getAttribute('data-chk')];
      x.addEventListener('change', function(){ st.checks[x.getAttribute('data-chk')] = x.checked ? 1 : 0; save(); if (x.checked) owlEvt('ok'); });
    });
    function homeProg(){
      var box = $('.mini', vCo);
      if (!box) return;
      var d = EX.filter(isDone).length;
      box.innerHTML =
        '<a href="#' + c.id + '/exercices"><b>' + d + '<small>/' + EX.length + '</small></b><span class="fr">exercices</span><span class="it">esercizi</span></a>' +
        '<a href="#' + c.id + '/entrainement"><b>' + st.tr.best + '</b><span class="fr">meilleure série</span><span class="it">miglior serie</span></a>' +
        '<a href="#' + c.id + '/controle"><b>' + (st.bestTest == null ? MI : st.bestTest) + '<small>/20</small></b><span class="fr">meilleur contrôle</span><span class="it">miglior verifica</span></a>';
    }

    return {
      c: c, st: st, EX: EX, paged: !!c.paged,
      el: { cours: vCo, exercices: vEx, entrainement: vTr, controle: vTe },
      enter: function(v){
        if (v === 'exercices' && !listed) renderList();
        if (v === 'entrainement' && !trQ && c.mix.length) nextTraining();
        if (v === 'controle' && !testQs && c.tq.length) newTest();
        if (v === 'cours') homeProg();
      },
      stats: function(){ return { done: EX.filter(isDone).length, total: EX.length, best: st.tr.best, test: st.bestTest }; },
      reveal: reveal,
      spy: function(){
        if (c.paged || !lessons.length) return;
        var cur = lessons[0].id, lim = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--abh')) || 56) + 80;
        lessons.forEach(function(l){ if (l.getBoundingClientRect().top < lim) cur = l.id; });
        tocMark(cur);
      },
      /* Ouvre un exercice dans la liste et renvoie sa carte */
      openExo: function(id){
        var e = null;
        EX.forEach(function(x){ if (x.id === id) e = x; });
        if (!e) return null;
        opened[id] = true;
        if (filter !== 'all' && filter !== e.group) filter = 'all';
        $$('.ex-filter .chip', vEx).forEach(function(x){ x.setAttribute('aria-pressed', String(x.dataset.f === filter)); });
        renderList();
        return document.getElementById('x-' + id);
      },
      setFilter: setFilter,
      /* Un contrôle blanc commencé et pas encore corrigé : on ne recharge pas la page à ce moment-là */
      busy: function(){ return !!testQs && !testDone && testQs.some(function(q){ return q.pick >= 0; }); }
    };
  }

  /* ---------- Chapitres, accueil, navigation ---------- */
  var ICON_PREV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
  var CH = {}, VIEWS = ['cours', 'exercices', 'entrainement', 'controle'];
  CHAPS.forEach(function(c){ CH[c.id] = makeChapter(c); });
  window.scolairOccupe = function(){ return CHAPS.some(function(c){ return CH[c.id].busy(); }); };
  var VNAME = { cours: { fr: 'le cours', it: 'la lezione' }, exercices: { fr: 'les exercices', it: 'gli esercizi' }, entrainement: { fr: 'l’entraînement', it: 'l’allenamento' }, controle: { fr: 'le contrôle blanc', it: 'la verifica di prova' } };
  function renderHome(){
    var h = '';
    CHAPS.forEach(function(c, i){
      var s = CH[c.id].stats(), pct = s.total ? Math.round(s.done / s.total * 100) : 0, last = i === CHAPS.length - 1 && CHAPS.length > 1;
      h += '<a class="chap" href="#' + c.id + '/' + (CH[c.id].st.v || 'cours') + '" data-ch="' + c.id + '"><span class="chap-n">' + c.num + '</span><span class="chap-b">' +
        '<span class="chap-k ui"><span class="fr">Chapitre ' + c.num + '</span><span class="it">Capitolo ' + c.num + '</span>' + (last ? '<span class="chap-new"><span class="fr">Nouveau</span><span class="it">Nuovo</span></span>' : '') + '</span>' +
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
    $('.brand-s').innerHTML = home ? '<span class="fr">Maths · Seconde</span><span class="it">Matematica · Seconde</span>' : '<span class="fr">Chapitre ' + ch.c.num + ' · SCOLAIR</span><span class="it">Capitolo ' + ch.c.num + ' · SCOLAIR</span>';
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
      if (cur.ch === ch.c.id && cur.v === 'cours') ch.reveal(el, true);
      else go('#' + ch.c.id + '/cours', function(){ ch.reveal(el, false); });
    } else if (t.hasAttribute('data-exo')){
      id = t.getAttribute('data-exo');
      EX_ALL.forEach(function(e){ if (e.id === id) ch = CH[e.ch]; });
      if (!ch) return;
      ev.preventDefault();
      go('#' + ch.c.id + '/exercices', function(){ var art = ch.openExo(id); if (art) art.scrollIntoView({ block: 'start' }); });
    } else {
      ch = CH[t.getAttribute('data-ch')];
      if (!ch) return;
      ev.preventDefault();
      go('#' + ch.c.id + '/exercices', function(){ ch.setFilter(t.getAttribute('data-exg')); window.scrollTo(0, 0); });
    }
  });
  var spyTick = false;
  window.addEventListener('scroll', function(){
    if (spyTick || !cur.ch || cur.v !== 'cours') return;
    spyTick = true;
    requestAnimationFrame(function(){ spyTick = false; if (cur.ch && cur.v === 'cours') CH[cur.ch].spy(); });
  }, { passive: true });
  function setAbh(){ var a = $('.appbar'); if (a) document.documentElement.style.setProperty('--abh', a.offsetHeight + 'px'); }
  window.addEventListener('resize', setAbh);
  window.addEventListener('hashchange', route);
