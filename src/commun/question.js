
  /* Icônes */
  var ICON_BULB = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3z"/></svg>';
  var ICON_EYE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  var ICON_NEXT = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
  var ICON_PEN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20l1.2-4.8L15.8 4.6l3.6 3.6L8.8 18.8z"/><path d="M13.6 6.8l3.6 3.6"/></svg>';
  var ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';

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
    seen: { fr: 'Tu as regardé la solution. Recopie-la sur ton cahier, puis essaie une autre question.', it: 'Hai guardato la soluzione. Ricopiala sul quaderno, poi prova un’altra domanda.' },
    more: { fr: 'Juste ! Il y a encore une autre bonne réponse à trouver.', it: 'Giusto! C’è ancora un’altra risposta giusta da trovare.' },
    fempty: { fr: 'Remplis d’abord toutes les cases.', it: 'Riempi prima tutte le caselle.' },
    fbad: { fr: 'Dans chaque case, écris seulement un nombre, par exemple 12 ou 2,5.', it: 'In ogni casella scrivi solo un numero, per esempio 12 o 2,5.' },
    fsign: { fr: 'Presque : les nombres sont bons, mais vérifie les signes. Touche le signe + ou − pour le changer.', it: 'Quasi: i numeri sono giusti, ma controlla i segni. Tocca il segno + o − per cambiarlo.' },
    fpart: { fr: 'Pas encore. Les cases vertes sont justes : corrige les cases rouges.', it: 'Non ancora. Le caselle verdi sono giuste: correggi quelle rosse.' },
    firr: { fr: 'Presque : c’est bien égal, mais la fraction n’est pas irréductible. Simplifie-la.', it: 'Quasi: è uguale, ma la frazione non è ridotta ai minimi termini. Semplificala.' },
    fzero: { fr: 'Un dénominateur ne peut pas être égal à 0.', it: 'Un denominatore non può essere uguale a 0.' },
    selfok: { fr: 'Bravo, exercice réussi !', it: 'Brava, esercizio riuscito!' },
    selfko: { fr: 'Ce n’est pas grave : on apprend en corrigeant ses erreurs. Relis la solution, cache-la, puis refais l’exercice sur ton cahier.', it: 'Non fa niente: si impara correggendo gli errori. Rileggi la soluzione, nascondila, poi rifai l’esercizio sul quaderno.' }
  };
  function fbHTML(cls, m, extra){ return '<p class="fb ' + cls + '">' + biIn(m) + (extra ? '<br>' + biIn(extra) : '') + '</p>'; }
  function decimalsOf(tol){ if (tol >= 0.5) return 0; if (tol >= 0.05) return 1; if (tol >= 0.005) return 2; if (tol >= 0.0005) return 3; return 4; }
  function starStr(n){ var s = ''; for (var i = 0; i < 3; i++) s += i < n ? '★' : '☆'; return s; }

  /* Réponse à cases : le modèle contient {0}, {1}... (cases), {s0} (signe de la case 0) ou {±0} (signe puis case) */
  var BOX_CLEAN = new RegExp('[^0-9,.]', 'g');
  var DASH1 = new RegExp('[-' + String.fromCharCode(8722, 8211, 8212) + ']');
  function fillHTML(p, id){
    var len = 1;
    p.ans.forEach(function(a){ len = Math.max(len, num(Math.abs(a), 4).length); });
    var w = Math.max(2.4, len * 0.62 + 1.5), first = true;
    var tpl = p.tpl.replace(/\{(s|±)?(\d+)\}/g, function(m, f, i){
      var sg = '<button class="sgn" type="button" data-b="' + i + '" data-s="1" aria-label="Signe / Segno">+</button>';
      var inp = '<input class="bx" data-b="' + i + '"' + (first && id ? ' id="' + id + '"' : '') + ' style="width:' + rd(w, 2) + 'em" type="text" inputmode="decimal" autocomplete="off" autocorrect="off" spellcheck="false" enterkeyhint="done" aria-label="Case ' + (Number(i) + 1) + ' / Casella ' + (Number(i) + 1) + '">';
      if (f !== 's') first = false;
      return f === 's' ? sg : f === '±' ? '<span class="sbx">' + sg + inp + '</span>' : inp;
    });
    return '<div class="ans fill">' + (p.label ? '<span class="al">' + BIn(p.label) + '</span>' : '') + '<div class="fexp m">' + tpl + '</div>' +
      '<button class="btn pri chk" type="button">' + biUI('Vérifier', 'Verifica') + '</button></div>';
  }
  function judgeFill(p, vals){
    var n = p.ans.length, tol = (p.tol || 0) + 1e-9, i, okv = [];
    function eq(a, b){ return Math.abs(a - b) <= tol; }
    if (p.set){
      /* L'ordre ne compte pas : chaque valeur attendue doit apparaître une fois */
      var left = p.ans.slice();
      for (i = 0; i < n; i++){
        var k = -1;
        for (var j = 0; j < left.length; j++) if (eq(vals[i], left[j])){ k = j; break; }
        okv.push(k >= 0);
        if (k >= 0) left.splice(k, 1);
      }
    } else for (i = 0; i < n; i++) okv.push(eq(vals[i], p.ans[i]));
    if (okv.every(Boolean)) return { r: 'ok' };
    if (p.check){ var c = p.check(vals); if (c) return c === 'ok' ? { r: 'ok' } : c; }
    var fr = p.frac || [];
    for (i = 0; i < fr.length; i++){
      var a = fr[i][0], b = fr[i][1];
      if (Math.abs(vals[b]) < 1e-12) return { r: 'mid', msg: MSG.fzero };
      var others = okv.every(function(v, k){ return v || k === a || k === b; });
      if (others && (!okv[a] || !okv[b]) && Math.abs(vals[a] * p.ans[b] - p.ans[a] * vals[b]) < 1e-9) return { r: 'mid', msg: MSG.firr };
    }
    var traps = p.traps || [];
    for (i = 0; i < traps.length; i++){
      if (traps[i].v.every(function(v, k){ return v == null || eq(vals[k], v); })) return { r: 'ko', msg: traps[i] };
    }
    if (!p.set && vals.every(function(v, k){ return eq(Math.abs(v), Math.abs(p.ans[k])); })) return { r: 'mid', msg: MSG.fsign };
    return { r: 'ko', msg: okv.some(Boolean) ? MSG.fpart : MSG.no, okv: okv };
  }

  /* Une question (exercice ou entraînement). Types : num (un nombre), fill (cases), choice (boutons), self (sur le cahier, puis on compare). */
  function mountPart(box, p, num_, o){
    o = o || {};
    var solved = !!o.solved, self = p.kind === 'self';
    var h = '';
    if (p.figure && p.figure.chain) h += '<div class="chain"></div>';
    if (p.q) h += '<div class="pq"><span class="pn">' + num_ + '</span><div class="pt">' + B(p.q) + '</div></div>';
    if (p.kind === 'num'){
      var pm = (p.unit === '%' && p.sign === 'strict') || p.ans < 0 || p.pm;
      h += '<div class="ans"><label class="al" for="' + o.id + '">' + BIn(p.label) + '</label>' +
        '<input id="' + o.id + '" type="text" inputmode="decimal" autocomplete="off" autocorrect="off" spellcheck="false" enterkeyhint="done">' +
        (p.unit ? '<span class="unit">' + esc(p.unit) + '</span>' : '') +
        (pm ? '<button class="btn pm" type="button" aria-label="Changer le signe / Cambia il segno">±</button>' : '') +
        '<button class="btn pri chk" type="button">' + biUI('Vérifier', 'Verifica') + '</button></div>';
    } else if (p.kind === 'fill'){
      h += fillHTML(p, o.id);
    } else if (p.kind === 'choice'){
      h += '<div class="choices">' + p.choices.map(function(c, k){
        return '<button class="choice" type="button" data-k="' + k + '"><span class="k">' + 'abcd'.charAt(k) + '</span><span class="ct">' + BIn(c) + '</span></button>';
      }).join('') + '</div>';
    } else if (self){
      h += '<p class="selfhow">' + ICON_PEN + '<span><span class="fr">Fais l’exercice sur ton cahier. Ensuite, compare avec la solution.</span><span class="it">Fai l’esercizio sul quaderno. Poi confronta con la soluzione.</span></span></p>';
    }
    h += (self ? '' : '<div class="fbw" aria-live="polite"></div>') + '<div class="tools">' +
      (p.hint ? '<button class="btn sm hb" type="button" aria-expanded="false">' + ICON_BULB + biUI('Indice', 'Indizio') + '</button>' : '') +
      (p.sol ? '<button class="btn sm sb" type="button" aria-expanded="false">' + ICON_EYE + biUI('Solution', 'Soluzione') + '</button>' : '') + '</div>' +
      (p.more ? '<p class="more">' + B(p.more) + '</p>' : '') +
      (p.hint ? '<div class="panel hint" hidden><div class="ph">' + biUI('Indice', 'Indizio') + '</div>' + B(p.hint) + '</div>' : '') +
      (p.sol ? '<div class="panel sol" hidden><div class="ph">' + biUI('Solution commentée', 'Soluzione spiegata') + '</div>' + B(p.sol) +
        (self ? '<div class="selfq"><p>' + biIn({ fr: 'Compare ligne par ligne avec ton cahier. Alors ?', it: 'Confronta riga per riga con il tuo quaderno. Allora?' }) + '</p><div class="tools">' +
          '<button class="btn pri sok" type="button" aria-pressed="false">' + ICON_CHECK + biUI('J’ai réussi', 'Ci sono riuscita') + '</button>' +
          '<button class="btn sko" type="button">' + biUI('À refaire', 'Da rifare') + '</button></div><div class="fbw" aria-live="polite"></div></div>' : '') + '</div>' : '');
    box.innerHTML = h;
    box.classList.toggle('solved', solved);
    if (p.figure && p.figure.chain) drawChain($('.chain', box), p.figure.chain, true);
    var fbw = $('.fbw', box), tried = false;
    /* ce qui vient d'apparaître (message, indice, solution) est amené à l'écran s'il dépasse en bas */
    function voir(el){ if (el && el.scrollIntoView && el.getClientRects().length) el.scrollIntoView({ block: 'nearest' }); }
    function done(val){
      if (!solved){ solved = true; box.classList.add('solved'); if (o.onSolved) o.onSolved(val, !tried); owlEvt('ok'); }
    }
    function wrong(){ if (!tried){ tried = true; if (o.onWrong) o.onWrong(); } owlEvt('ko'); }
    if (p.kind === 'num'){
      var inp = $('input', box), chk = $('.chk', box), pmb = $('.pm', box);
      if (solved){ inp.value = typeof o.solved === 'string' ? o.solved : num(p.ans, decimalsOf(p.tol)); inp.classList.add('ok'); }
      var go = function(){
        var r = judge(p, inp.value);
        if (r === 'ok'){ inp.classList.add('ok'); fbw.innerHTML = fbHTML('ok', MSG.ok); done(inp.value); voir(fbw); return; }
        inp.classList.remove('ok');
        if (r === 'empty' || r === 'bad'){ fbw.innerHTML = fbHTML('ko', MSG[r]); voir(fbw); return; }
        wrong();
        if (typeof r === 'object') fbw.innerHTML = fbHTML('ko', r.trap);
        else fbw.innerHTML = fbHTML(r === 'no' ? 'ko' : 'mid', (r === 'sign' || r === 'nominus') && p.signMsg ? p.signMsg : MSG[r]);
        voir(fbw);
      };
      chk.addEventListener('click', go);
      inp.addEventListener('keydown', function(e){ if (e.key === 'Enter'){ e.preventDefault(); go(); } });
      if (pmb) pmb.addEventListener('click', function(){
        var v = inp.value.trim();
        if (/^[-+]/.test(v) || v.charAt(0) === MI) v = (v.charAt(0) === '+' ? MI : '') + v.slice(1);
        else v = MI + v;
        inp.value = v; inp.focus();
      });
    } else if (p.kind === 'fill'){
      var bxs = $$('.bx', box), sgs = $$('.sgn', box), fchk = $('.chk', box);
      var sgOf = function(i){ for (var k = 0; k < sgs.length; k++) if (sgs[k].dataset.b === String(i)) return sgs[k]; return null; };
      var setSg = function(b, s){ b.dataset.s = String(s); b.textContent = s < 0 ? MI : '+'; b.classList.toggle('neg', s < 0); };
      var clearMarks = function(){ bxs.forEach(function(x){ x.classList.remove('ok', 'ko'); }); };
      sgs.forEach(function(b){ b.addEventListener('click', function(){ if (solved) return; setSg(b, b.dataset.s === '1' ? -1 : 1); clearMarks(); }); });
      bxs.forEach(function(x){
        x.addEventListener('input', function(){
          /* Un signe tapé au clavier règle le bouton de signe ; la case ne garde que le nombre */
          var v = x.value, sg = sgOf(x.dataset.b);
          if (sg && DASH1.test(v)) setSg(sg, -1); else if (sg && v.indexOf('+') >= 0) setSg(sg, 1);
          var c = v.replace(BOX_CLEAN, '');
          if (c !== v) x.value = c;
          x.classList.remove('ok', 'ko');
        });
        x.addEventListener('keydown', function(e){
          if (e.key !== 'Enter') return;
          e.preventDefault();
          var k = bxs.indexOf(x);
          if (k < bxs.length - 1 && !bxs[k + 1].value) bxs[k + 1].focus(); else goFill();
        });
      });
      var showFill = function(vals){
        bxs.forEach(function(x){ var i = Number(x.dataset.b), sg = sgOf(i); x.value = num(Math.abs(vals[i]), 4); x.classList.add('ok'); if (sg) setSg(sg, vals[i] < 0 ? -1 : 1); });
      };
      if (solved) showFill(p.ans);
      var goFill = function(){
        if (solved) return;
        var vals = [], bad = false, empty = false;
        bxs.forEach(function(x){
          var i = Number(x.dataset.b), r = readAnswers(x.value), sg = sgOf(i);
          if (r === null) empty = true; else if (r !== r || !r.length) bad = true; else vals[i] = r[0] * (sg && sg.dataset.s === '-1' ? -1 : 1);
        });
        if (empty || bad){ fbw.innerHTML = fbHTML('ko', empty ? MSG.fempty : MSG.fbad); voir(fbw); return; }
        var res = judgeFill(p, vals);
        clearMarks();
        if (res.r === 'ok'){ bxs.forEach(function(x){ x.classList.add('ok'); }); fbw.innerHTML = fbHTML('ok', MSG.ok); done(vals.join(';')); voir(fbw); return; }
        wrong();
        if (res.okv) bxs.forEach(function(x){ x.classList.add(res.okv[Number(x.dataset.b)] ? 'ok' : 'ko'); });
        fbw.innerHTML = fbHTML(res.r === 'mid' ? 'mid' : 'ko', res.msg);
        voir(fbw);
      };
      fchk.addEventListener('click', goFill);
    } else if (p.kind === 'choice'){
      var bs = $$('.choice', box), goods = [].concat(p.correct), found = [];
      var isGood = function(k){ return goods.indexOf(k) >= 0; };
      if (solved){ bs.forEach(function(b){ b.disabled = true; if (isGood(Number(b.dataset.k))) b.classList.add('ok'); }); }
      bs.forEach(function(b){
        b.addEventListener('click', function(){
          if (solved) return;
          var k = Number(b.dataset.k), own = p.fb && p.fb[k];
          if (isGood(k)){
            b.classList.add('ok'); b.disabled = true;
            if (found.indexOf(k) < 0) found.push(k);
            if (found.length < goods.length){ fbw.innerHTML = '<p class="fb ok">' + biIn(MSG.more) + '</p>' + (own ? '<div class="panel why">' + B(own) + '</div>' : ''); voir(fbw); return; }
            bs.forEach(function(x){ x.disabled = true; });
            fbw.innerHTML = own ? '<p class="fb ok">' + biIn(MSG.ok) + '</p><div class="panel why">' + B(own) + '</div>' : fbHTML('ok', MSG.ok, p.why);
            done(goods.join(','));
          } else {
            b.classList.add('ko'); b.disabled = true;
            wrong();
            fbw.innerHTML = own ? '<p class="fb ko">' + biIn(MSG.cko) + '</p><div class="panel why">' + B(own) + '</div>' : fbHTML('ko', MSG.cko);
          }
          voir(fbw);
        });
      });
    }
    var hb = $('.hb', box), sb = $('.sb', box), hp = $('.panel.hint', box), sp = $('.panel.sol', box);
    if (hb) hb.addEventListener('click', function(){ hp.hidden = !hp.hidden; hb.setAttribute('aria-expanded', String(!hp.hidden)); voir(hp); });
    if (sb) sb.addEventListener('click', function(){
      sp.hidden = !sp.hidden; sb.setAttribute('aria-expanded', String(!sp.hidden));
      box.classList.toggle('vu', !sp.hidden);
      if (!sp.hidden && !solved && o.onReveal) o.onReveal();
      if (o.onSol) o.onSol(!sp.hidden);      /* la vue qui affiche la question peut se réorganiser (pages) */
      voir(sp);
    });
    if (self){
      var sok = $('.sok', box), sko = $('.sko', box);
      var paint = function(){ sok.setAttribute('aria-pressed', String(solved)); };
      paint();
      sok.addEventListener('click', function(){
        if (solved) return;
        fbw.innerHTML = fbHTML('ok', MSG.selfok); done('1'); paint();
        fbw.scrollIntoView({ block: 'nearest' });
      });
      sko.addEventListener('click', function(){
        if (solved){ solved = false; box.classList.remove('solved'); if (o.onUnsolved) o.onUnsolved(); }
        paint(); owlEvt('ko');
        fbw.innerHTML = fbHTML('mid', MSG.selfko);
        fbw.scrollIntoView({ block: 'nearest' });
      });
    }
  }
