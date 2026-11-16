  /* Chapitre 10 : information chiffrée (évolutions successives, taux global, évolutions réciproques) */
  (function(){
  /* Petits labos du cours */
  var ICON_LAB = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/></svg>';
  function stepper(id, label, val, min, max, step, onChange){
    var wrap = document.createElement('div');
    wrap.className = 'ctrl';
    wrap.innerHTML = '<span>' + label + '</span><div class="stepper"><button type="button" aria-label="moins">' + MI + '</button><output aria-live="polite"></output><button type="button" aria-label="plus">+</button></div>';
    var out = $('output', wrap), bs = $$('button', wrap);
    function show(){ out.textContent = sgn(val, 1) + NB + '%'; out.className = val > 0 ? 'up' : val < 0 ? 'down' : ''; }
    bs[0].addEventListener('click', function(){ if (val - step >= min){ val -= step; show(); onChange(val); } });
    bs[1].addEventListener('click', function(){ if (val + step <= max){ val += step; show(); onChange(val); } });
    show();
    return wrap;
  }
  function rateFr(t){ return (t >= 0 ? 'Augmenter de ' : 'Diminuer de ') + num(Math.abs(t), 1) + ' %'; }
  function rateIt(t){ var s = num(Math.abs(t), 1); return (t >= 0 ? 'Aumentare ' : 'Diminuire ') + (/^0/.test(s) ? 'dello ' : /^(8|11(,|$)|1(,|$))/.test(s) ? 'dell’' : 'del ') + s + '%'; }

  function labCM(box){
    box.innerHTML = '<p class="lab-t">' + ICON_LAB + biUI('Fais varier le taux', 'Fai variare il tasso') + '</p>' +
      '<label class="ui" for="lab-cm-r"><span class="fr">Taux t :</span><span class="it">Tasso t:</span></label>' +
      '<input type="range" id="lab-cm-r" min="-80" max="100" step="5" value="20">' +
      '<div class="kv" aria-live="polite"></div><div class="chain"></div>';
    var r = $('input', box), kv = $('.kv', box), ch = $('.chain', box);
    function up(){
      var t = Number(r.value), c = 1 + t / 100;
      kv.innerHTML = bi({
        fr: '<p><b>' + rateFr(t) + '</b> revient à multiplier par <b>' + num(c, 2) + '</b>.</p><p>C ' + (c > 1 ? '&gt; 1 : augmentation.' : c < 1 ? '&lt; 1 : diminution.' : '= 1 : pas de changement.') + '</p>',
        it: '<p><b>' + rateIt(t) + '</b> vuol dire moltiplicare per <b>' + num(c, 2) + '</b>.</p><p>C ' + (c > 1 ? '&gt; 1: aumento.' : c < 1 ? '&lt; 1: diminuzione.' : '= 1: nessun cambiamento.') + '</p>'
      });
      drawChain(ch, { nodes: ['100 €', num(100 * c, 2) + ' €'], ops: [TIMES + ' ' + num(c, 2)], top: [{ fr: rateFr(t), it: rateIt(t) }], tones: [t >= 0 ? 'up' : 'down'] });
    }
    r.addEventListener('input', up);
    document.addEventListener('langchange', up);
    up();
  }

  function labSucc(box){
    var t1 = 20, t2 = -25;
    box.innerHTML = '<p class="lab-t">' + ICON_LAB + biUI('Essaie avec deux évolutions', 'Prova con due variazioni') + '</p><div class="ctrls"></div><div class="chain"></div><div class="cmp" aria-live="polite"></div>';
    var ctrls = $('.ctrls', box), ch = $('.chain', box), cmp = $('.cmp', box);
    ctrls.appendChild(stepper('s1', biUI('1<sup>re</sup> évolution', '1ª variazione'), t1, -50, 100, 5, function(v){ t1 = v; up(); }));
    ctrls.appendChild(stepper('s2', biUI('2<sup>e</sup> évolution', '2ª variazione'), t2, -50, 100, 5, function(v){ t2 = v; up(); }));
    function up(){
      var c1 = 1 + t1 / 100, c2 = 1 + t2 / 100, c = c1 * c2, T = (c - 1) * 100, v1 = 100 * c1, v2 = v1 * c2;
      drawChain(ch, { nodes: ['100', num(v1, 2), num(v2, 2)], ops: [TIMES + ' ' + num(c1, 2), TIMES + ' ' + num(c2, 2)],
        tones: [t1 >= 0 ? 'up' : 'down', t2 >= 0 ? 'up' : 'down'], bottom: { op: TIMES + ' ' + num(c, 4), dir: 'fwd', tone: c >= 1 ? 'up' : 'down' } });
      cmp.innerHTML = '<div class="good"><small>' + biUI('Juste : on multiplie', 'Giusto: si moltiplica') + '</small><span class="calc">' + num(c1, 2) + ' ' + TIMES + ' ' + num(c2, 2) + ' = ' + num(c, 4) + '</span><span class="big">' + sgn(T, 2) + NB + '%</span></div>' +
        '<div class="bad"><small>' + biUI('Faux : on additionne', 'Sbagliato: si somma') + '</small><span class="calc">' + sgn(t1, 0) + ' ' + (t2 < 0 ? MI + ' ' + num(-t2, 0) : '+ ' + num(t2, 0)) + ' = ' + sgn(t1 + t2, 0) + '</span><span class="big">' + sgn(t1 + t2, 0) + NB + '%</span></div>';
    }
    up();
  }

  function labRecip(box){
    var t = 20;
    box.innerHTML = '<p class="lab-t">' + ICON_LAB + biUI('Aller et retour', 'Andata e ritorno') + '</p><div class="ctrls"></div><div class="chain"></div><div class="cmp" aria-live="polite"></div>';
    var ctrls = $('.ctrls', box), ch = $('.chain', box), cmp = $('.cmp', box);
    ctrls.appendChild(stepper('r1', biUI('Évolution de départ', 'Variazione iniziale'), t, -50, 100, 5, function(v){ t = v; up(); }));
    function up(){
      var c = 1 + t / 100, cr = 1 / c, tr = (cr - 1) * 100, ex = exact(tr, 1), v = 100 * c, opp = 1 - t / 100;
      drawChain(ch, { nodes: ['100', num(v, 2)], ops: [TIMES + ' ' + num(c, 2)], tones: [t >= 0 ? 'up' : 'down'], bottom: { op: DIV + ' ' + num(c, 2), dir: 'back', tone: t >= 0 ? 'down' : 'up' } });
      cmp.innerHTML = '<div class="good"><small>' + biUI('Juste : 1 ÷ C', 'Giusto: 1 ÷ C') + '</small><span class="calc">1 ' + DIV + ' ' + num(c, 2) + ' ' + (exact(cr, 3) ? '=' : APPROX) + ' ' + num(cr, 3) + '</span><span class="big">' + (ex ? '' : APPROX + NB) + sgn(tr, 1) + NB + '%</span></div>' +
        '<div class="bad"><small>' + biUI('Faux : l’opposé', 'Sbagliato: l’opposto') + '</small><span class="calc">' + num(v, 2) + ' ' + TIMES + ' ' + num(opp, 2) + ' = ' + num(v * opp, 2) + (Math.abs(v * opp - 100) > 1e-9 ? ' ≠ 100' : '') + '</span><span class="big">' + sgn(-t, 0) + NB + '%</span></div>';
    }
    up();
  }
  $$('.lab[data-lab]').forEach(function(box){
    var k = box.getAttribute('data-lab');
    if (k === 'cm') labCM(box); else if (k === 'succ') labSucc(box); else if (k === 'recip') labRecip(box);
  });


  /* Générateurs de questions */
  function pc(n, d){ return num(n, d == null ? 2 : d) + ' %'; }
  function pcIt(n, d){ return num(n, d == null ? 2 : d) + '%'; }
  function cm(t){ return num(1 + t / 100, 4); }
  function frEv(t){ return (t >= 0 ? 'augmente de ' : 'diminue de ') + pc(Math.abs(t)); }
  function itEv(t){ var s = num(Math.abs(t), 2); return (t >= 0 ? 'aumenta ' : 'diminuisce ') + (/^(8|11(,|$)|1(,|$))/.test(s) ? 'dell’' : 'del ') + s + '%'; }
  function delIt(t){ var s = num(Math.abs(t), 2); return (/^(8|11(,|$)|1(,|$))/.test(s) ? 'dell’' : 'del ') + s + '%'; }
  var RATES = [-40, -30, -25, -20, -15, -12, -10, -5, 5, 8, 10, 12, 15, 20, 25, 30, 40, 50];
  var CTX = [
    { fr: 'Le prix d’un article', it: 'Il prezzo di un articolo' },
    { fr: 'Le nombre d’abonnés d’une chaîne', it: 'Il numero di iscritti a un canale' },
    { fr: 'La population d’une ville', it: 'La popolazione di una città' },
    { fr: 'Le cours d’une action', it: 'La quotazione di un’azione' }
  ];

  var GEN = {
    cm: function(){
      var k = rnd(0, 2), t, c;
      if (k === 0){
        t = Math.random() < 0.5 ? pick([3, 5, 8, 12, 15, 20, 25, 30, 45, 60, 100, 150]) : -pick([2, 4, 5, 10, 12, 15, 20, 25, 30, 40, 60, 75]);
        c = 1 + t / 100;
        return { type: { fr: 'Coefficient', it: 'Coefficiente' },
          text: { fr: '<p>' + (t > 0 ? 'Augmenter' : 'Diminuer') + ' une quantité de ' + pc(Math.abs(t)) + ' revient à la multiplier par quel nombre ?</p>', it: '<p>' + (t > 0 ? 'Aumentare' : 'Diminuire') + ' una quantità ' + delIt(t) + ' vuol dire moltiplicarla per quale numero?</p>' },
          part: { kind: 'num', label: { fr: 'Coefficient C', it: 'Coefficiente C' }, unit: '', ans: c, tol: 0.00005, sign: 'abs',
            traps: [{ v: Math.abs(t) / 100, fr: 'Ça, c’est le taux en écriture décimale. Le coefficient est ' + (t > 0 ? '1 + t.' : '1 − t.'), it: 'Questo è il tasso in forma decimale. Il coefficiente è ' + (t > 0 ? '1 + t.' : '1 − t.') }].concat(t < 0 ? [{ v: 1 - t / 100, fr: 'Attention : pour une diminution, C = 1 − t, donc C est plus petit que 1.', it: 'Attenzione: per una diminuzione C = 1 − t, quindi C è più piccolo di 1.' }] : []),
            hint: { fr: (t > 0 ? 'C = 1 + t' : 'C = 1 − t') + '. Écris d’abord t en écriture décimale : ' + pc(Math.abs(t)) + ' = ' + num(Math.abs(t) / 100, 4) + '.', it: (t > 0 ? 'C = 1 + t' : 'C = 1 − t') + '. Scrivi prima t in forma decimale: ' + pcIt(Math.abs(t)) + ' = ' + num(Math.abs(t) / 100, 4) + '.' },
            sol: { fr: '<p>C = 1 ' + (t > 0 ? '+' : MI) + ' ' + num(Math.abs(t) / 100, 4) + ' = <b>' + num(c, 4) + '</b>.</p>', it: '<p>C = 1 ' + (t > 0 ? '+' : MI) + ' ' + num(Math.abs(t) / 100, 4) + ' = <b>' + num(c, 4) + '</b>.</p>' } } };
      }
      if (k === 1){
        t = pick([-36, -25, -20, -15, -12, -8, -3, 2, 4.5, 7, 15, 35, 60, 150]);
        c = 1 + t / 100;
        return { type: { fr: 'Coefficient', it: 'Coefficiente' },
          text: { fr: '<p>Multiplier une quantité par ' + num(c, 4) + ' revient à appliquer quel taux d’évolution (en %) ?</p>', it: '<p>Moltiplicare una quantità per ' + num(c, 4) + ' vuol dire applicare quale tasso di variazione (in %)?</p>' },
          part: { kind: 'num', label: { fr: 'Taux t', it: 'Tasso t' }, unit: '%', ans: t, tol: 0.005, sign: 'strict',
            traps: [{ v: rd(c * 100, 4), fr: 'Tu as oublié d’enlever 1 : t = C − 1.', it: 'Hai dimenticato di togliere 1: t = C − 1.' }],
            hint: { fr: 't = C − 1, puis on écrit le résultat en pourcentage. C ' + (c > 1 ? '&gt;' : '&lt;') + ' 1 : ' + (c > 1 ? 'augmentation.' : 'diminution.'), it: 't = C − 1, poi si scrive il risultato in percentuale. C ' + (c > 1 ? '&gt;' : '&lt;') + ' 1: ' + (c > 1 ? 'aumento.' : 'diminuzione.') },
            sol: { fr: '<p>t = ' + num(c, 4) + ' − 1 = ' + num(t / 100, 4) + ' = <b>' + sgn(t) + ' %</b> : c’est une ' + (t > 0 ? 'augmentation' : 'diminution') + '.</p>', it: '<p>t = ' + num(c, 4) + ' − 1 = ' + num(t / 100, 4) + ' = <b>' + sgn(t) + '%</b>: è ' + (t > 0 ? 'un aumento' : 'una diminuzione') + '.</p>' } } };
      }
      var vi = pick([40, 50, 60, 80, 120, 150, 200, 250, 400]); t = pick([-30, -25, -20, -15, -10, -5, 5, 10, 12.5, 15, 20, 25, 30, 40]);
      var vf = rd(vi * (1 + t / 100), 2);
      return { type: { fr: 'Taux d’évolution', it: 'Tasso di variazione' },
        text: { fr: '<p>Un prix passe de ' + num(vi) + ' € à ' + num(vf) + ' €. Quel est le taux d’évolution, en % ?</p>', it: '<p>Un prezzo passa da ' + num(vi) + ' € a ' + num(vf) + ' €. Qual è il tasso di variazione, in %?</p>' },
        part: { kind: 'num', label: { fr: 'Taux t', it: 'Tasso t' }, unit: '%', ans: t, tol: 0.005, sign: 'strict',
          traps: [{ v: rd((vf - vi) / vf * 100, 2), fr: 'On divise par la valeur de départ, pas par la valeur d’arrivée.', it: 'Si divide per il valore iniziale, non per quello finale.' }],
          hint: { fr: 't = (valeur finale − valeur initiale) ÷ valeur initiale.', it: 't = (valore finale − valore iniziale) ÷ valore iniziale.' },
          sol: { fr: '<p>t = (' + num(vf) + ' − ' + num(vi) + ') ÷ ' + num(vi) + ' = ' + num(t / 100, 4) + ' = <b>' + sgn(t) + ' %</b>.</p>', it: '<p>t = (' + num(vf) + ' − ' + num(vi) + ') ÷ ' + num(vi) + ' = ' + num(t / 100, 4) + ' = <b>' + sgn(t) + '%</b>.</p>' } } };
    },
    succ: function(){
      var three = Math.random() < 0.3, ts = [], i;
      do { ts = [pick(RATES), pick(RATES)]; if (three) ts.push(pick(RATES)); } while (ts[0] === -ts[1]);
      var cs = ts.map(function(t){ return 1 + t / 100; }), C = cs.reduce(function(a, b){ return a * b; }, 1), T = rd((C - 1) * 100, 6), sum = ts.reduce(add, 0);
      var ex2 = exact(T, 2), ctx = pick(CTX);
      var frList = ts.map(frEv), itList = ts.map(itEv);
      var frTxt = ctx.fr + ' ' + frList.slice(0, -1).join(', puis ') + ', puis ' + frList[frList.length - 1] + '.';
      var itTxt = ctx.it + ' ' + itList.slice(0, -1).join(', poi ') + ', poi ' + itList[itList.length - 1] + '.';
      var askValue = !three && Math.random() < 0.35, V = pick([40, 80, 120, 150, 200, 250, 400, 500]);
      var steps = '<li>C = ' + cs.map(function(c){ return num(c, 4); }).join(' × ') + ' = ' + num(C, 6) + '</li>';
      if (askValue){
        var vfin = rd(V * C, 2);
        return { type: { fr: 'Évolutions successives', it: 'Variazioni successive' },
          text: { fr: '<p>Un article coûte ' + num(V) + ' €. Son prix ' + frList[0] + ', puis ' + frList[1] + '. Quel est son nouveau prix ?</p>', it: '<p>Un articolo costa ' + num(V) + ' €. Il prezzo ' + itList[0] + ', poi ' + itList[1] + '. Qual è il nuovo prezzo?</p>' },
          part: { kind: 'num', label: { fr: 'Nouveau prix', it: 'Nuovo prezzo' }, unit: '€', ans: vfin, tol: 0.005, sign: 'abs',
            traps: [{ v: rd(V * (1 + sum / 100), 2), fr: 'Tu as additionné les taux. On multiplie les coefficients.', it: 'Hai sommato i tassi. Si moltiplicano i coefficienti.' }],
            hint: { fr: 'Coefficient global : ' + num(cs[0], 4) + ' × ' + num(cs[1], 4) + '. Puis multiplie le prix par ce coefficient.', it: 'Coefficiente globale: ' + num(cs[0], 4) + ' × ' + num(cs[1], 4) + '. Poi moltiplica il prezzo per questo coefficiente.' },
            sol: { fr: '<ol>' + steps + '<li>' + num(V) + ' × ' + num(C, 6) + ' = <b>' + num(vfin) + ' €</b></li></ol>', it: '<ol>' + steps + '<li>' + num(V) + ' × ' + num(C, 6) + ' = <b>' + num(vfin) + ' €</b></li></ol>' } } };
      }
      return { type: { fr: 'Taux global', it: 'Tasso globale' },
        text: { fr: '<p>' + frTxt + ' Quel est le taux d’évolution global' + (ex2 ? '' : ' (à 0,01 % près)') + ' ?</p>', it: '<p>' + itTxt + ' Qual è il tasso di variazione globale' + (ex2 ? '' : ' (arrotondato allo 0,01%)') + '?</p>' },
        part: { kind: 'num', label: { fr: 'Taux global T', it: 'Tasso globale T' }, unit: '%', ans: T, tol: ex2 ? 0.005 : 0.0051, sign: 'strict',
          traps: Math.abs(sum - T) > 0.01 ? [{ v: sum, fr: 'Tu as additionné les taux. Les taux ne s’additionnent pas : on multiplie les coefficients.', it: 'Hai sommato i tassi. I tassi non si sommano: si moltiplicano i coefficienti.' }] : [],
          hint: { fr: 'Les coefficients sont : ' + cs.map(function(c){ return num(c, 4); }).join(' ; ') + '. Multiplie-les, puis enlève 1.', it: 'I coefficienti sono: ' + cs.map(function(c){ return num(c, 4); }).join('; ') + '. Moltiplicali, poi togli 1.' },
          sol: { fr: '<ol>' + steps + '<li>T = C − 1 = ' + num(C - 1, 6) + (ex2 ? ' = ' : ' ≈ ') + '<b>' + sgn(T) + ' %</b></li></ol><p>' + (T >= 0 ? 'C’est une augmentation globale.' : 'C’est une diminution globale.') + '</p>', it: '<ol>' + steps + '<li>T = C − 1 = ' + num(C - 1, 6) + (ex2 ? ' = ' : ' ≈ ') + '<b>' + sgn(T) + '%</b></li></ol><p>' + (T >= 0 ? 'È un aumento globale.' : 'È una diminuzione globale.') + '</p>' } } };
    },
    recip: function(){
      var t = pick([5, 8, 10, 12, 15, 20, 25, 30, 40, 50, 60, 100, -10, -12, -15, -20, -25, -30, -36, -40, -50, -60]);
      var c = 1 + t / 100, cr = 1 / c, tr = (cr - 1) * 100, ctx = pick(CTX), askDir = Math.random() < 0.4;
      var crs = num(cr, 4), trs = num(rd(tr, 1), 1), ex1 = exact(tr, 1);
      var sol = { fr: '<ol><li>C = ' + num(c, 4) + '</li><li>C’ = 1 ÷ ' + num(c, 4) + ' ' + (exact(cr, 4) ? '=' : '≈') + ' ' + crs + '</li><li>t’ = C’ − 1 ' + (ex1 ? '=' : '≈') + ' <b>' + sgn(tr, 1) + ' %</b></li></ol><p>' + (tr > 0 ? 'Il faut une augmentation' : 'Il faut une diminution') + ' d’environ ' + trs.replace(MI, '') + ' %, et non de ' + num(Math.abs(t)) + ' %.</p>',
        it: '<ol><li>C = ' + num(c, 4) + '</li><li>C’ = 1 ÷ ' + num(c, 4) + ' ' + (exact(cr, 4) ? '=' : '≈') + ' ' + crs + '</li><li>t’ = C’ − 1 ' + (ex1 ? '=' : '≈') + ' <b>' + sgn(tr, 1) + '%</b></li></ol><p>' + (tr > 0 ? 'Serve un aumento' : 'Serve una diminuzione') + ' di circa ' + (/^(8|11(,|$)|1(,|$))/.test(trs.replace(MI, '')) ? 'l’' : 'il ') + trs.replace(MI, '') + '%, e non ' + delIt(t) + '.</p>' };
      var hint = { fr: 'C = ' + num(c, 4) + '. Calcule C’ = 1 ÷ C à la calculatrice, puis t’ = C’ − 1.', it: 'C = ' + num(c, 4) + '. Calcola C’ = 1 ÷ C con la calcolatrice, poi t’ = C’ − 1.' };
      var traps = [{ v: -t, fr: 'Ce n’est pas l’opposé ! L’évolution réciproque se calcule avec C’ = 1 ÷ C.', it: 'Non è l’opposto! La variazione reciproca si calcola con C’ = 1 ÷ C.' }];
      if (askDir){
        var up = tr > 0;
        return { type: { fr: 'Taux réciproque', it: 'Tasso reciproco' },
          text: { fr: '<p>' + ctx.fr + ' ' + frEv(t) + '. De quel pourcentage doit-' + (ctx.fr.indexOf('La ') === 0 ? 'elle' : 'il') + ' ' + (up ? 'augmenter' : 'diminuer') + ' pour revenir à sa valeur initiale (à 0,1 % près) ?</p>', it: '<p>' + ctx.it + ' ' + itEv(t) + '. Di quale percentuale deve ' + (up ? 'aumentare' : 'diminuire') + ' per tornare al valore iniziale (arrotondato allo 0,1%)?</p>' },
          part: { kind: 'num', label: { fr: up ? 'Augmentation' : 'Diminution', it: up ? 'Aumento' : 'Diminuzione' }, unit: '%', ans: Math.abs(tr), tol: 0.05, near: 0.3, sign: 'abs',
            traps: [{ v: Math.abs(t), fr: 'Ce n’est pas le même pourcentage ! On calcule C’ = 1 ÷ C.', it: 'Non è la stessa percentuale! Si calcola C’ = 1 ÷ C.' }], hint: hint, sol: sol } };
      }
      return { type: { fr: 'Taux réciproque', it: 'Tasso reciproco' },
        text: { fr: '<p>' + ctx.fr + ' ' + frEv(t) + '. Quel est le taux d’évolution réciproque, à 0,1 % près ?</p>', it: '<p>' + ctx.it + ' ' + itEv(t) + '. Qual è il tasso di variazione reciproco, arrotondato allo 0,1%?</p>' },
        part: { kind: 'num', label: { fr: 'Taux réciproque t’', it: 'Tasso reciproco t’' }, unit: '%', ans: tr, tol: 0.051, near: 0.3, sign: 'strict', traps: traps, hint: hint, sol: sol } };
    },
    init: function(){
      var k = rnd(0, 2), t, O, V, C;
      if (k === 2){
        O = pick([40, 75, 80, 120, 150, 250, 300, 450]); V = rd(O * 1.2, 2);
        return { type: { fr: 'Valeur de départ', it: 'Valore iniziale' },
          text: { fr: '<p>Le taux de TVA est 20 %. Le prix TTC d’un objet est ' + num(V) + ' €. Quel est son prix HT ?</p>', it: '<p>L’IVA è del 20%. Il prezzo IVA inclusa (TTC) di un oggetto è ' + num(V) + ' €. Qual è il prezzo senza IVA (HT)?</p>' },
          part: { kind: 'num', label: { fr: 'Prix HT', it: 'Prezzo senza IVA' }, unit: '€', ans: O, tol: 0.005, sign: 'abs',
            traps: [{ v: rd(V * 0.8, 2), fr: 'Enlever 20 % du prix TTC ne marche pas. On divise par 1,2.', it: 'Togliere il 20% dal prezzo IVA inclusa non funziona. Si divide per 1,2.' }],
            hint: { fr: 'TTC = HT × 1,2. Donc HT = TTC ÷ 1,2.', it: 'TTC = HT × 1,2. Quindi HT = TTC ÷ 1,2.' },
            sol: { fr: '<p>HT = ' + num(V) + ' ÷ 1,2 = <b>' + num(O) + ' €</b>. Vérification : ' + num(O) + ' × 1,2 = ' + num(V) + ' €.</p>', it: '<p>HT = ' + num(V) + ' ÷ 1,2 = <b>' + num(O) + ' €</b>. Verifica: ' + num(O) + ' × 1,2 = ' + num(V) + ' €.</p>' } } };
      }
      var down = k === 0;
      do { t = down ? pick([10, 15, 20, 25, 30, 40, 50]) : pick([5, 10, 12, 15, 20, 25, 40, 50]); O = pick([40, 60, 80, 120, 150, 200, 240, 300, 500]); C = down ? 1 - t / 100 : 1 + t / 100; V = O * C; } while (!exact(V, 2));
      V = rd(V, 2);
      var w = down ? ['baisse', 'calo', 'la baisse', 'del calo'] : ['hausse', 'aumento', 'la hausse', 'dell’aumento'];
      return { type: { fr: 'Valeur de départ', it: 'Valore iniziale' },
        text: { fr: '<p>Après une ' + w[0] + ' de ' + pc(t, 0) + ', un article coûte ' + num(V) + ' €. Quel était son prix avant ' + w[2] + ' ?</p>', it: '<p>Dopo un ' + w[1] + ' ' + delIt(t) + ', un articolo costa ' + num(V) + ' €. Quanto costava prima ' + w[3] + '?</p>' },
        part: { kind: 'num', label: { fr: 'Prix de départ', it: 'Prezzo iniziale' }, unit: '€', ans: O, tol: 0.005, sign: 'abs',
          traps: [{ v: rd(V * (down ? 1 + t / 100 : 1 - t / 100), 2), fr: down ? 'Ajouter ' + t + ' % au nouveau prix ne marche pas. On divise par ' + num(C, 2) + '.' : 'Enlever ' + t + ' % au nouveau prix ne marche pas. On divise par ' + num(C, 2) + '.', it: down ? 'Aggiungere il ' + t + '% al nuovo prezzo non funziona. Si divide per ' + num(C, 2) + '.' : 'Togliere il ' + t + '% dal nuovo prezzo non funziona. Si divide per ' + num(C, 2) + '.' },
            { v: rd(V / (t / 100), 2), fr: 'On ne divise pas par le taux, mais par le coefficient C = ' + num(C, 2) + '.', it: 'Non si divide per il tasso, ma per il coefficiente C = ' + num(C, 2) + '.' }],
          hint: { fr: 'Prix de départ × ' + num(C, 2) + ' = ' + num(V) + ' €. Donc prix de départ = ' + num(V) + ' ÷ ' + num(C, 2) + '.', it: 'Prezzo iniziale × ' + num(C, 2) + ' = ' + num(V) + ' €. Quindi prezzo iniziale = ' + num(V) + ' ÷ ' + num(C, 2) + '.' },
          sol: { fr: '<ol><li>' + (down ? 'Baisse' : 'Hausse') + ' de ' + pc(t, 0) + ' : C = ' + num(C, 2) + '.</li><li>Prix de départ = ' + num(V) + ' ÷ ' + num(C, 2) + ' = <b>' + num(O) + ' €</b>.</li></ol><p>Vérification : ' + num(O) + ' × ' + num(C, 2) + ' = ' + num(V) + ' €.</p>', it: '<ol><li>' + (down ? 'Calo' : 'Aumento') + ' ' + delIt(t) + ': C = ' + num(C, 2) + '.</li><li>Prezzo iniziale = ' + num(V) + ' ÷ ' + num(C, 2) + ' = <b>' + num(O) + ' €</b>.</li></ol><p>Verifica: ' + num(O) + ' × ' + num(C, 2) + ' = ' + num(V) + ' €.</p>' } } };
    }
  };

  /* Contrôle blanc : questions à choix */
  var TQ = [
    function(){
      var a, b; do { a = pick([10, 12, 14, 15, 20, 25, 30, 40]); b = pick([10, 12, 15, 20, 25, 30]); } while (a === b);
      var C = (1 + a / 100) * (1 - b / 100), T = rd((C - 1) * 100, 4);
      return qcm('Le taux d’évolution global d’une augmentation de ' + a + ' % suivie d’une diminution de ' + b + ' % est :',
        'Il tasso di variazione globale di un aumento ' + delIt(a) + ' seguito da una diminuzione ' + delIt(b) + ' è:',
        [sgn(T) + ' %', sgn(a - b) + ' %', sgn(a + b) + ' %', sgn(-T) + ' %'],
        { fr: num(1 + a / 100, 2) + ' × ' + num(1 - b / 100, 2) + ' = ' + num(C, 4) + ', puis ' + num(C, 4) + ' − 1 = ' + num(C - 1, 4) + ' : ' + sgn(T) + ' %. On n’additionne pas les taux.', it: num(1 + a / 100, 2) + ' × ' + num(1 - b / 100, 2) + ' = ' + num(C, 4) + ', poi ' + num(C, 4) + ' − 1 = ' + num(C - 1, 4) + ': ' + sgn(T) + '%. I tassi non si sommano.' });
    },
    function(){
      var t = pick([4, 8, 12, 15, 20, 25, 35, 40]);
      return qcm('Diminuer une quantité de ' + t + ' % revient à la multiplier par :', 'Diminuire una quantità ' + delIt(t) + ' vuol dire moltiplicarla per:',
        [num(1 - t / 100, 2), num(1 + t / 100, 2), num(t / 100, 2), MI + num(t / 100, 2)],
        { fr: 'C = 1 − ' + num(t / 100, 2) + ' = ' + num(1 - t / 100, 2) + '.', it: 'C = 1 − ' + num(t / 100, 2) + ' = ' + num(1 - t / 100, 2) + '.' });
    },
    function(){
      var t = pick([10, 15, 20, 25, 30, 40, 50, 60]), cr = 1 / (1 + t / 100), tr = (cr - 1) * 100;
      return qcm('Le taux d’évolution réciproque d’une augmentation de ' + t + ' % vaut, à 0,1 % près :', 'Il tasso di variazione reciproco di un aumento ' + delIt(t) + ' vale, arrotondato allo 0,1%:',
        [sgn(rd(tr, 1), 1) + ' %', MI + num(t) + ' %', num(cr * 100, 1) + ' %', MI + num(rd(cr * 100, 1), 1) + ' %'],
        { fr: '1 ÷ ' + num(1 + t / 100, 2) + ' ≈ ' + num(cr, 4) + ', puis ' + num(cr, 4) + ' − 1 ≈ ' + num(cr - 1, 4) + ' : ' + sgn(rd(tr, 1), 1) + ' %. La réciproque n’est pas l’opposé.', it: '1 ÷ ' + num(1 + t / 100, 2) + ' ≈ ' + num(cr, 4) + ', poi ' + num(cr, 4) + ' − 1 ≈ ' + num(cr - 1, 4) + ': ' + sgn(rd(tr, 1), 1) + '%. Il tasso reciproco non è l’opposto.' });
    },
    function(){
      var t = pick([10, 20, 25, 36, 40, 50, 60]), cr = 1 / (1 - t / 100), tr = (cr - 1) * 100;
      return qcm('Une quantité a diminué de ' + t + ' %. Pour revenir à sa valeur initiale, il faut l’augmenter de (à 0,1 % près) :', 'Una quantità è diminuita ' + delIt(t) + '. Per tornare al valore iniziale bisogna aumentarla di (arrotondato allo 0,1%):',
        [num(rd(tr, 1), 1) + ' %', num(t) + ' %', num(100 - t) + ' %', num(100 + t) + ' %'],
        { fr: 'C = ' + num(1 - t / 100, 2) + ' ; C’ = 1 ÷ ' + num(1 - t / 100, 2) + ' ≈ ' + num(cr, 4) + ' ; donc une augmentation d’environ ' + num(rd(tr, 1), 1) + ' %.', it: 'C = ' + num(1 - t / 100, 2) + '; C’ = 1 ÷ ' + num(1 - t / 100, 2) + ' ≈ ' + num(cr, 4) + '; quindi un aumento di circa ' + (/^(8|11(,|$)|1(,|$))/.test(num(rd(tr, 1), 1)) ? 'l’' : 'il ') + num(rd(tr, 1), 1) + '%.' });
    },
    function(){
      var t, O, V; do { t = pick([10, 20, 25, 50]); O = pick([40, 60, 80, 120, 200, 240]); V = O * (1 + t / 100); } while (!exact(V, 2));
      return qcm('Après une hausse de ' + t + ' %, un prix vaut ' + num(V) + ' €. Avant la hausse, il valait :', 'Dopo un aumento ' + delIt(t) + ', un prezzo vale ' + num(V) + ' €. Prima dell’aumento valeva:',
        [num(O) + ' €', num(rd(V * (1 - t / 100), 2)) + ' €', num(V - t) + ' €', num(rd(V / (t / 100), 2)) + ' €'],
        { fr: num(V) + ' ÷ ' + num(1 + t / 100, 2) + ' = ' + num(O) + ' €.', it: num(V) + ' ÷ ' + num(1 + t / 100, 2) + ' = ' + num(O) + ' €.' });
    },
    function(){
      var t, O, V; do { t = pick([10, 20, 25, 30, 40]); O = pick([50, 80, 120, 150, 200, 250]); V = O * (1 - t / 100); } while (!exact(V, 2));
      return qcm('Après une baisse de ' + t + ' %, un prix vaut ' + num(V) + ' €. Avant la baisse, il valait :', 'Dopo un calo ' + delIt(t) + ', un prezzo vale ' + num(V) + ' €. Prima del calo valeva:',
        [num(O) + ' €', num(rd(V * (1 + t / 100), 2)) + ' €', num(rd(V / (t / 100), 2)) + ' €', num(V + t) + ' €'],
        { fr: 'On divise par ' + num(1 - t / 100, 2) + ' : ' + num(V) + ' ÷ ' + num(1 - t / 100, 2) + ' = ' + num(O) + ' €.', it: 'Si divide per ' + num(1 - t / 100, 2) + ': ' + num(V) + ' ÷ ' + num(1 - t / 100, 2) + ' = ' + num(O) + ' €.' });
    },
    function(){
      var a = pick([5, 10, 20]), b = pick([10, 20, 25]), c = pick([5, 10, 15]), C = (1 + a / 100) * (1 - b / 100) * (1 + c / 100);
      return qcm('Une quantité augmente de ' + a + ' %, puis diminue de ' + b + ' %, puis augmente de ' + c + ' %. Le coefficient multiplicateur global est :', 'Una quantità aumenta ' + delIt(a) + ', poi diminuisce ' + delIt(b) + ', poi aumenta ' + delIt(c) + '. Il coefficiente moltiplicativo globale è:',
        [num(C, 4), num(1 + (a - b + c) / 100, 4), num((a - b + c) / 100, 4), num((1 + a / 100) * (1 + b / 100) * (1 + c / 100), 4)],
        { fr: num(1 + a / 100, 2) + ' × ' + num(1 - b / 100, 2) + ' × ' + num(1 + c / 100, 2) + (exact(C, 4) ? ' = ' : ' ≈ ') + num(C, 4) + '. On multiplie les coefficients.', it: num(1 + a / 100, 2) + ' × ' + num(1 - b / 100, 2) + ' × ' + num(1 + c / 100, 2) + (exact(C, 4) ? ' = ' : ' ≈ ') + num(C, 4) + '. Si moltiplicano i coefficienti.' });
    },
    function(){
      return qcm('Deux évolutions sont réciproques lorsque :', 'Due variazioni sono reciproche quando:',
        [{ fr: 'leur coefficient multiplicateur global est égal à 1', it: 'il loro coefficiente moltiplicativo globale è uguale a 1' }, { fr: 'leurs taux sont opposés', it: 'i loro tassi sono opposti' }, { fr: 'elles ont lieu l’une après l’autre', it: 'avvengono una dopo l’altra' }, { fr: 'la somme de leurs taux est égale à 0', it: 'la somma dei loro tassi è uguale a 0' }],
        { fr: 'C’est la définition du livre : coefficient global égal à 1. Par exemple +25 % et −20 % : 1,25 × 0,8 = 1.', it: 'È la definizione del libro: coefficiente globale uguale a 1. Per esempio +25% e −20%: 1,25 × 0,8 = 1.' });
    },
    function(){
      var vi = pick([40, 50, 80, 120, 200, 250]), t = pick([-30, -20, -15, -10, 10, 15, 20, 25, 40]), vf = rd(vi * (1 + t / 100), 2);
      return qcm('Un prix passe de ' + num(vi) + ' € à ' + num(vf) + ' €. Le taux d’évolution est :', 'Un prezzo passa da ' + num(vi) + ' € a ' + num(vf) + ' €. Il tasso di variazione è:',
        [sgn(t) + ' %', sgn(rd((vf - vi) / vf * 100, 2)) + ' %', sgn(vf - vi) + ' %', num(rd(vf / vi * 100, 2)) + ' %'],
        { fr: '(' + num(vf) + ' − ' + num(vi) + ') ÷ ' + num(vi) + ' = ' + num(t / 100, 4) + ' = ' + sgn(t) + ' %.', it: '(' + num(vf) + ' − ' + num(vi) + ') ÷ ' + num(vi) + ' = ' + num(t / 100, 4) + ' = ' + sgn(t) + '%.' });
    },
    function(){
      var c = pick([1.035, 0.965, 1.18, 0.82, 1.6, 0.4, 1.07, 0.93]), t = rd(Math.abs(c - 1) * 100, 2), up = c > 1;
      function U(x){ return { fr: 'augmenter de ' + num(x) + ' %', it: 'aumentare ' + delIt(x) }; }
      function D(x){ return { fr: 'diminuer de ' + num(x) + ' %', it: 'diminuire ' + delIt(x) }; }
      return qcm('Multiplier une quantité par ' + num(c, 3) + ' revient à :', 'Moltiplicare una quantità per ' + num(c, 3) + ' vuol dire:',
        [up ? U(t) : D(t), up ? D(t) : U(t), up ? U(rd(c * 100, 2)) : D(rd(c * 100, 2)), up ? U(rd(c * 10, 2)) : D(rd(100 - c * 10, 2))],
        { fr: num(c, 3) + ' − 1 = ' + (up ? '' : MI) + num(t / 100, 4) + ' : ' + (up ? 'augmentation' : 'diminution') + ' de ' + num(t) + ' %.', it: num(c, 3) + ' − 1 = ' + (up ? '' : MI) + num(t / 100, 4) + ': ' + (up ? 'aumento' : 'diminuzione') + ' ' + delIt(t) + '.' });
    }
  ];

  CHAPS.push({
    id: 'c10', num: 10, root: true,
    title: { fr: 'Information chiffrée', it: 'Informazione numerica' },
    short: { fr: 'Évolutions %', it: 'Variazioni %' },
    sub: { fr: 'Évolutions successives, taux global, évolutions réciproques', it: 'Variazioni successive, tasso globale, variazioni reciproche' },
    groups: [
      { k: 'rappels', fr: 'Rappels : taux et coefficients', it: 'Ripasso: tassi e coefficienti', chip: { fr: 'Rappels', it: 'Ripasso' } },
      { k: 'succ', fr: 'Évolutions successives', it: 'Variazioni successive', chip: { fr: 'Successives', it: 'Successive' } },
      { k: 'recip', fr: 'Évolutions réciproques', it: 'Variazioni reciproche', chip: { fr: 'Réciproques', it: 'Reciproche' } },
      { k: 'synth', fr: 'Problèmes de synthèse', it: 'Problemi di sintesi', chip: { fr: 'Synthèse', it: 'Sintesi' } }
    ],
    order: ['ex146', 'ex147', 'ex148', 'cap4', 'ex115', 'ex116', 'ex117', 'ex118', 'ex119', 'ex120', 'ex121', 'ex122', 'ex123', 'ex124', 'ex125', 'ex126', 'ex151', 'ex152',
      'cap5', 'ex150', 'ex127', 'ex128', 'ex129', 'ex130', 'ex131', 'ex132', 'ex133', 'ex134', 'ex154', 'ex135', 'ex137', 'ex140', 'ex153', 'ex158'],
    exLead: {
      fr: 'Les énoncés du manuel, traduits. Écris ta réponse, puis touche « Vérifier ». Si tu bloques : l’indice, puis la solution commentée.',
      it: 'I testi del libro, tradotti. Scrivi la risposta e tocca «Vérifier». Se ti blocchi: l’indizio, poi la soluzione spiegata.'
    },
    modes: [
      { k: 'cm', fr: 'Coefficients', it: 'Coefficienti' },
      { k: 'succ', fr: 'Taux global', it: 'Tasso globale' },
      { k: 'recip', fr: 'Taux réciproque', it: 'Tasso reciproco' },
      { k: 'init', fr: 'Valeur de départ', it: 'Valore iniziale' }
    ],
    mix: ['cm', 'succ', 'succ', 'recip', 'recip', 'init'],
    gen: GEN, tq: TQ,
    low: { fr: 'Courage ! Relis le cours (parties 2, 3 et 4), puis recommence.', it: 'Coraggio! Rileggi la lezione (parti 2, 3 e 4), poi ricomincia.' },
    dit: [
      ['Un pourcentage, c’est une multiplication cachée.', 'Una percentuale è una moltiplicazione nascosta.'],
      ['On n’additionne pas les taux : on multiplie les coefficients.', 'I tassi non si sommano: si moltiplicano i coefficienti.'],
      ['Pour revenir en arrière, on divise par le coefficient.', 'Per tornare indietro, si divide per il coefficiente.'],
      ['+20 % puis −20 %, ça ne fait pas 0 % !', '+20 % poi −20 % non fa 0 %!']
    ]
  });
  })();
