
  /* Icônes */
  var ICON_BULB = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>';
  var ICON_EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  var ICON_NEXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

  /* Lecture d'une réponse tapée */
  var DASHES = new RegExp('[' + String.fromCharCode(8722, 8211, 8212) + ']', 'g');
  function readAnswers(raw){
    var s = String(raw).replace(/[\s  ]/g, '').replace(DASHES, '-').replace(/[%€a-zA-ZÀ-ſ²³]/g, '');
    if (s === '' || s === '-' || s === '+') return null;
    var out = [];
    if (/^[+-]?\d+(,\d+)?$/.test(s) || /^[+-]?,\d+$/.test(s)) out.push(Number(s.replace(',', '.')));
    else if (/^[+-]?\d+\.\d+$/.test(s) || /^[+-]?\d+$/.test(s)) out.push(Number(s));
    if (/^[+-]?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) out.push(Number(s.replace(/\./g, '').replace(',', '.')));
    return out.length ? out : NaN;
  }
  function judgeOne(p, v){
    var tol = p.tol + 1e-9;
    if (Math.abs(v - p.ans) <= tol) return 'ok';
    if (p.sign === 'abs' && Math.abs(Math.abs(v) - Math.abs(p.ans)) <= tol) return 'ok';
    var traps = p.traps || [];
    for (var i = 0; i < traps.length; i++){ var d = p.sign === 'abs' ? Math.abs(Math.abs(v) - Math.abs(traps[i].v)) : Math.abs(v - traps[i].v); if (d <= Math.max(p.tol, 0.006) + 1e-9) return { trap: traps[i] }; }
    if (p.sign === 'strict' && Math.abs(-v - p.ans) <= tol) return p.unit !== '%' && p.ans > 0 ? 'nominus' : 'sign';
    var near = (p.near != null ? p.near : 10 * p.tol) + 1e-9;
    if (Math.abs(v - p.ans) <= near || (p.sign === 'abs' && Math.abs(Math.abs(v) - Math.abs(p.ans)) <= near)) return 'near';
    return 'no';
  }
  function judge(p, raw){
    var vals = readAnswers(raw);
    if (vals === null) return 'empty';
    if (vals !== vals || !vals.length) return 'bad';
    var best = 'no', order = ['ok', 'trap', 'sign', 'nominus', 'near', 'no'];
    for (var i = 0; i < vals.length; i++){
      var r = judgeOne(p, vals[i]);
      var rk = typeof r === 'object' ? 'trap' : r;
      var bk = typeof best === 'object' ? 'trap' : best;
      if (order.indexOf(rk) < order.indexOf(bk)) best = r;
    }
    return best;
  }
  var MSG = {
    ok: { fr: 'Bravo, c’est juste !', it: 'Brava, è giusto!' },
    nominus: { fr: 'Presque : le nombre est bon, mais ici il n’y a pas de signe moins. Un coefficient multiplicateur ou une valeur positive s’écrit sans « − ».', it: 'Quasi: il numero è giusto, ma qui non c’è il segno meno. Un coefficiente moltiplicativo o un valore positivo si scrive senza «−».' },
    sign: { fr: 'Presque : le nombre est bon, mais attention au signe. Augmentation : +, diminution : −.', it: 'Quasi: il numero è giusto, ma attenzione al segno. Aumento: +, diminuzione: −.' },
    near: { fr: 'Presque ! Vérifie l’arrondi demandé ou ton dernier calcul.', it: 'Quasi! Controlla l’arrotondamento richiesto o l’ultimo calcolo.' },
    no: { fr: 'Pas encore. Relis l’énoncé et essaie avec l’indice.', it: 'Non ancora. Rileggi il testo e prova con l’indizio.' },
    empty: { fr: 'Écris d’abord un nombre.', it: 'Scrivi prima un numero.' },
    bad: { fr: 'Écris seulement un nombre, par exemple 12,5 ou −4.', it: 'Scrivi solo un numero, per esempio 12,5 o −4.' },
    cko: { fr: 'Ce n’est pas la bonne réponse. Essaie encore.', it: 'Non è la risposta giusta. Riprova.' },
    seen: { fr: 'Tu as regardé la solution. Recopie-la sur ton cahier, puis essaie une autre question.', it: 'Hai guardato la soluzione. Ricopiala sul quaderno, poi prova un’altra domanda.' }
  };
  function fbHTML(cls, m, extra){ return '<p class="fb ' + cls + '">' + biIn(m) + (extra ? '<br>' + biIn(extra) : '') + '</p>'; }
  function decimalsOf(tol){ if (tol >= 0.5) return 0; if (tol >= 0.05) return 1; if (tol >= 0.005) return 2; if (tol >= 0.0005) return 3; return 4; }
  function starStr(n){ var s = ''; for (var i = 0; i < 3; i++) s += i < n ? '★' : '☆'; return s; }

  /* Une question (exercice du livre ou entraînement) */
  function mountPart(box, p, num, o){
    o = o || {};
    var solved = !!o.solved;
    var h = '';
    if (p.figure && p.figure.chain) h += '<div class="chain"></div>';
    if (p.q) h += '<div class="pq"><span class="pn">' + num + '</span><div class="pt">' + bi(p.q) + '</div></div>';
    if (p.kind === 'num'){
      var pm = (p.unit === '%' && p.sign === 'strict') || p.ans < 0;
      h += '<div class="ans"><label class="al" for="' + o.id + '">' + biIn(p.label) + '</label>' +
        '<input id="' + o.id + '" type="text" inputmode="decimal" autocomplete="off" autocorrect="off" spellcheck="false" enterkeyhint="done">' +
        (p.unit ? '<span class="unit">' + esc(p.unit) + '</span>' : '') +
        (pm ? '<button class="btn pm" type="button" aria-label="Changer le signe / Cambia il segno">±</button>' : '') +
        '<button class="btn pri chk" type="button">' + biUI('Vérifier', 'Verifica') + '</button></div>';
    } else {
      h += '<div class="choices">' + p.choices.map(function(c, k){
        return '<button class="choice" type="button" data-k="' + k + '"><span class="k">' + 'abcd'.charAt(k) + '</span><span class="ct">' + biIn(c) + '</span></button>';
      }).join('') + '</div>';
    }
    h += '<div class="fbw" aria-live="polite"></div>' +
      '<div class="tools"><button class="btn sm hb" type="button" aria-expanded="false">' + ICON_BULB + biUI('Indice', 'Indizio') + '</button>' +
      '<button class="btn sm sb" type="button" aria-expanded="false">' + ICON_EYE + biUI('Solution', 'Soluzione') + '</button></div>' +
      '<div class="panel hint" hidden><div class="ph">' + biUI('Indice', 'Indizio') + '</div>' + bi(p.hint) + '</div>' +
      '<div class="panel sol" hidden><div class="ph">' + biUI('Solution commentée', 'Soluzione spiegata') + '</div>' + bi(p.sol) + '</div>';
    box.innerHTML = h;
    box.classList.toggle('solved', solved);
    if (p.figure && p.figure.chain) drawChain($('.chain', box), p.figure.chain, true);
    var fbw = $('.fbw', box), tried = false;
    function done(val){
      if (!solved){ solved = true; box.classList.add('solved'); if (o.onSolved) o.onSolved(val, !tried); owlEvt('ok'); }
    }
    if (p.kind === 'num'){
      var inp = $('input', box), chk = $('.chk', box), pmb = $('.pm', box);
      if (solved){ inp.value = typeof o.solved === 'string' ? o.solved : num(p.ans, decimalsOf(p.tol)); inp.classList.add('ok'); }
      var go = function(){
        var r = judge(p, inp.value);
        if (r === 'ok'){ inp.classList.add('ok'); fbw.innerHTML = fbHTML('ok', MSG.ok); done(inp.value); return; }
        inp.classList.remove('ok');
        if (r === 'empty' || r === 'bad'){ fbw.innerHTML = fbHTML('ko', MSG[r]); return; }
        if (!tried){ tried = true; if (o.onWrong) o.onWrong(); } owlEvt('ko');
        if (typeof r === 'object') fbw.innerHTML = fbHTML('ko', r.trap);
        else fbw.innerHTML = fbHTML(r === 'no' ? 'ko' : 'mid', MSG[r]);
      };
      chk.addEventListener('click', go);
      inp.addEventListener('keydown', function(e){ if (e.key === 'Enter'){ e.preventDefault(); go(); } });
      if (pmb) pmb.addEventListener('click', function(){
        var v = inp.value.trim();
        if (/^[-+]/.test(v) || v.charAt(0) === MI) v = (v.charAt(0) === '+' ? MI : '') + v.slice(1);
        else v = MI + v;
        inp.value = v; inp.focus();
      });
    } else {
      var bs = $$('.choice', box);
      if (solved){ bs.forEach(function(b){ b.disabled = true; if (Number(b.dataset.k) === p.correct) b.classList.add('ok'); }); }
      bs.forEach(function(b){
        b.addEventListener('click', function(){
          if (solved) return;
          if (Number(b.dataset.k) === p.correct){
            b.classList.add('ok');
            bs.forEach(function(x){ x.disabled = true; });
            fbw.innerHTML = fbHTML('ok', MSG.ok, p.why);
            done(String(p.correct));
          } else {
            b.classList.add('ko'); b.disabled = true;
            if (!tried){ tried = true; if (o.onWrong) o.onWrong(); } owlEvt('ko');
            fbw.innerHTML = fbHTML('ko', MSG.cko);
          }
        });
      });
    }
    var hb = $('.hb', box), sb = $('.sb', box), hp = $('.panel.hint', box), sp = $('.panel.sol', box);
    hb.addEventListener('click', function(){ hp.hidden = !hp.hidden; hb.setAttribute('aria-expanded', String(!hp.hidden)); });
    sb.addEventListener('click', function(){
      sp.hidden = !sp.hidden; sb.setAttribute('aria-expanded', String(!sp.hidden));
      if (!sp.hidden && !solved && o.onReveal) o.onReveal();
    });
  }

  /* Liste des exercices du livre */
  var GROUPS = [
    { k: 'rappels', fr: 'Rappels : taux et coefficients', it: 'Ripasso: tassi e coefficienti' },
    { k: 'succ', fr: 'Évolutions successives', it: 'Variazioni successive' },
    { k: 'recip', fr: 'Évolutions réciproques', it: 'Variazioni reciproche' },
    { k: 'synth', fr: 'Problèmes de synthèse', it: 'Problemi di sintesi' }
  ];
  var ORDER = ['ex146', 'ex147', 'ex148', 'cap4', 'ex115', 'ex116', 'ex117', 'ex118', 'ex119', 'ex120', 'ex121', 'ex122', 'ex123', 'ex124', 'ex125', 'ex126', 'ex151', 'ex152',
    'cap5', 'ex150', 'ex127', 'ex128', 'ex129', 'ex130', 'ex131', 'ex132', 'ex133', 'ex134', 'ex154', 'ex135', 'ex137', 'ex140', 'ex153', 'ex158'];
  var EX = (typeof EXOS !== 'undefined' ? EXOS : []).slice();
  function gIndex(k){ for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].k === k) return i; return 9; }
  function rank(e){ var i = ORDER.indexOf(e.id); return gIndex(e.group) * 1000 + (i < 0 ? 900 + (parseInt(String(e.num).replace(/\D/g, ''), 10) || 0) / 1000 : i); }
  EX.sort(function(a, b){ return rank(a) - rank(b); });
  function pk(e, j){ return e.id + ':' + j; }
  function nDone(e){ var c = 0; e.parts.forEach(function(p, j){ if (store.solved[pk(e, j)]) c++; }); return c; }
  function isDone(e){ return nDone(e) === e.parts.length; }

  var listEl = $('#ex-list'), filter = 'all', opened = {};
  function cardHead(e){
    var cap = /^cap/.test(e.id), n = cap ? 'Cap.<br>' + String(e.num).replace(/\D/g, '') : esc(e.num);
    var meta = 'p.' + NB + e.page + ' · <span class="stars" aria-label="' + e.stars + ' / 3">' + starStr(e.stars) + '</span>' + (e.tag ? ' · ' + esc(e.tag[store.lang === 'it' ? 'it' : 'fr']) : '') + ' · ' + e.parts.length + ' Q';
    return '<button class="exo-h" type="button" aria-expanded="' + (opened[e.id] ? 'true' : 'false') + '"><span class="exo-n' + (cap ? ' cap' : '') + '">' + n + '</span>' +
      '<span><span class="exo-t">' + biIn(e.title) + '</span><span class="exo-m">' + meta + '</span></span><span class="exo-s" aria-hidden="true">✓</span></button>';
  }
  function cardClass(e){ var d = nDone(e); return 'exo' + (d === e.parts.length ? ' done' : d ? ' part-done' : '') + (opened[e.id] ? ' open' : ''); }
  function renderBody(e, body){
    var h = (e.tag ? '<span class="btag">' + biIn(e.tag) + '</span>' : '') + '<div class="stmt">' + bi(e.text) + '</div>';
    if (e.figure && e.figure.chain) h += '<div class="chain efig"></div>';
    e.parts.forEach(function(p, j){ h += '<div class="part" data-j="' + j + '"></div>'; });
    body.innerHTML = h;
    if (e.figure && e.figure.chain) drawChain($('.efig', body), e.figure.chain, true);
    e.parts.forEach(function(p, j){
      mountPart($('.part[data-j="' + j + '"]', body), p, j + 1, {
        id: 'in-' + e.id + '-' + j, solved: store.solved[pk(e, j)] || false,
        onSolved: function(val){ store.solved[pk(e, j)] = String(val || '1'); save(); refreshCard(e); refreshSummary(); if (nDone(e) === e.parts.length) owlEvt('exo'); }
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
  function refreshCard(e){
    var art = document.getElementById('x-' + e.id);
    if (!art) return;
    art.className = cardClass(e);
    var gh = document.getElementById('gh-' + e.group);
    if (gh){ var items = EX.filter(function(x){ return x.group === e.group; }); gh.textContent = items.filter(isDone).length + ' / ' + items.length; }
  }
  function refreshSummary(){
    var d = EX.filter(isDone).length;
    $('#ex-count').textContent = d + ' / ' + EX.length;
    $('#ex-bar').style.width = (EX.length ? d / EX.length * 100 : 0) + '%';
  }
  function renderList(){
    listEl.innerHTML = '';
    GROUPS.forEach(function(g){
      var items = EX.filter(function(e){ return e.group === g.k; });
      var shown = items.filter(function(e){ return filter === 'all' || filter === g.k || (filter === 'todo' && !isDone(e)); });
      if (!shown.length) return;
      var gh = document.createElement('div');
      gh.className = 'ghead';
      gh.innerHTML = '<h2>' + biIn(g) + '</h2><span id="gh-' + g.k + '">' + items.filter(isDone).length + ' / ' + items.length + '</span>';
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
  $$('#ex-filter .chip').forEach(function(c){
    c.addEventListener('click', function(){
      filter = c.dataset.f;
      $$('#ex-filter .chip').forEach(function(x){ x.setAttribute('aria-pressed', String(x === c)); });
      renderList();
    });
  });
  document.addEventListener('langchange', function(){
    EX.forEach(function(e){ var art = document.getElementById('x-' + e.id); if (art){ var m = $('.exo-m', art); if (m){ var tmp = document.createElement('div'); tmp.innerHTML = cardHead(e); m.innerHTML = $('.exo-m', tmp).innerHTML; } } });
  });
  renderList();
