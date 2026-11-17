  /* Chapitre 3 : calcul littéral (priorités, fractions, puissances, racines, développer, factoriser, équations, inéquations) */
  (function(){
  /* ---------- Écriture des formules en HTML ---------- */
  var X = '<i>x</i>', SQ = '<sup>2</sup>', LT = '&lt;', GT = '&gt;', LE = '≤', GE = '≥', INF = '∞';
  function M(h){ return '<span class="m nw">' + h + '</span>'; }
  function MC(a){ return '<span class="m">' + a.map(function(x){ return '<span class="mc">' + x + '</span>'; }).join(' ') + '</span>'; }
  function frac(a, b){ return '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>'; }
  function rac(a){ return '<span class="sqrt' + (String(a).indexOf('class="frac"') >= 0 ? ' gr' : '') + '"><span class="rad">' + a + '</span></span>'; }   // gr : grand radical au-dessus d'une fraction
  function racBox(a){ return '<span class="sqrt bxr"><span class="rad">' + a + '</span></span>'; }   // racine dont le contenu est une case à remplir
  function pw(a, n){ return a + '<sup>' + n + '</sup>'; }
  function z(n){ return n < 0 ? MI + num(-n, 6) : num(n, 6); }               // nombre relatif, avec le vrai signe moins
  function zp(n){ return n < 0 ? '(' + z(n) + ')' : z(n); }                  // entre parenthèses s'il est négatif
  function pm(n){ return (n < 0 ? MI + ' ' : '+ ') + num(Math.abs(n), 6); }  // « + 5 » ou « − 5 » à la suite d'un calcul
  function mono(c, v){ var a = Math.abs(c); return (v && a === 1 ? '' : num(a, 6)) + v; }
  function poly(ts){
    var s = '';
    ts.forEach(function(t){ if (!t[0]) return; s += s ? (t[0] < 0 ? ' ' + MI + ' ' : ' + ') + mono(t[0], t[1]) : (t[0] < 0 ? MI : '') + mono(t[0], t[1]); });
    return s || '0';
  }
  function lin(a, b){ return poly([[a, X], [b, '']]); }
  function quad(a, b, c){ return poly([[a, X + SQ], [b, X], [c, '']]); }
  function nz(a, b){ var v; do { v = rnd(a, b); } while (!v); return v; }
  function gcd(a, b){ a = Math.abs(a); b = Math.abs(b); while (b){ var t = a % b; a = b; b = t; } return a; }
  function Q(fr, it, math){ return bi({ fr: fr, it: it }, 'p') + (math ? '<p class="mq">' + math + '</p>' : ''); }
  /* Calcul posé : une étape par ligne, les signes « = » alignés (bloc .calc de maths.css).
     pose(['expression', '= étape', '= résultat']) pour une suite d'égalités ; pose(['a = b', '⇔ c = d', ...]) pour des équations équivalentes
     (une équation par ligne, le signe ⇔ au début de chaque nouvelle ligne). */
  function cl(eqv){ return eqv ? '<span class="cl eqv">⇔</span>' : '<span class="cl"></span>'; }
  function rg(l, r, eqv){ return cl(eqv) + '<span class="cg m">' + l + '</span><span class="cd m">' + r + '</span>'; }
  function rge(x, eqv){ return cl(eqv) + '<span class="ce m">' + x + '</span>'; }
  function coupe(eq){ var i = eq.indexOf(' = '); return i < 0 || eq.indexOf(' = ', i + 1) >= 0 ? null : [eq.slice(0, i), '= ' + eq.slice(i + 3)]; }
  function pose(st){
    if (st.some(function(s){ return s.indexOf('⇔') === 0; })){
      return st.map(function(s){ var eqv = s.indexOf('⇔') === 0; s = s.replace(/^⇔ /, ''); var c = coupe(s); return c ? rg(c[0], c[1], eqv) : rge(s, eqv); }).join('');
    }
    /* L'expression de départ reste sur la ligne de la première égalité si elle est courte et si l'ensemble tient dans la largeur
       d'un téléphone ; sinon elle passe seule sur sa ligne, et les lignes « = ... » prennent toute la largeur. */
    var lg = function(s){ return s.replace(/<sup>[^<]*<\/sup>/g, '.').replace(/<[^>]+>/g, '').length; };
    var e = st[0], suite = st.slice(1), large = Math.max.apply(null, suite.map(lg));
    if (lg(e) <= 12 && lg(e) + large <= 30) return suite.map(function(s, i){ return rg(i ? '' : e, s); }).join('');
    return rge(e) + suite.map(function(s){ return rge(s); }).join('');
  }
  function calc(rows, fr, it){ return '<div class="calc">' + rows + '</div>' + (fr ? bi({ fr: fr, it: it }, 'p') : ''); }
  /* Indice avec des formules : une phrase, une formule par ligne (signes « = » alignés), puis une seconde phrase éventuelle. */
  var LA = '<i>a</i>', LB = '<i>b</i>', LN = '<i>n</i>', LP = '<i>p</i>';
  function regles(fr, it, eqs, fr2, it2){
    return bi({ fr: fr, it: it }, 'p') + '<div class="calc">' + eqs.map(function(q){ var c = coupe(q); return c ? rg(c[0], c[1]) : rge(q); }).join('') + '</div>' + (fr2 ? bi({ fr: fr2, it: it2 }, 'p') : '');
  }
  var ID1 = '(' + LA + ' + ' + LB + ')' + SQ + ' = ' + LA + SQ + ' + 2' + LA + LB + ' + ' + LB + SQ,
      ID2 = '(' + LA + ' − ' + LB + ')' + SQ + ' = ' + LA + SQ + ' − 2' + LA + LB + ' + ' + LB + SQ,
      ID3 = '(' + LA + ' − ' + LB + ')(' + LA + ' + ' + LB + ') = ' + LA + SQ + ' − ' + LB + SQ;
  function why(fr, it){ return ' <span class="why"><span class="fr">' + typo(fr, true) + '</span><span class="it inl">' + it + '</span></span>'; }
  var OU = ' <span class="ui"><span class="fr">ou</span><span class="it">o</span></span> ';
  var PLAIN = { fr: 'Presque : le nombre est bon, mais vérifie le signe.', it: 'Quasi: il numero è giusto, ma controlla il segno.' };
  var RES = { fr: 'Résultat', it: 'Risultato' };
  var LAB = { fr: 'Complète les cases.', it: 'Completa le caselle.' };
  var LABS = { fr: 'Complète les cases. Touche + ou − pour changer un signe.', it: 'Completa le caselle. Tocca + o − per cambiare un segno.' };
  function uniq(traps, same){
    var out = [];
    (traps || []).forEach(function(t){ if (t && !same(t.v) && !out.some(function(o){ return JSON.stringify(o.v) === JSON.stringify(t.v); })) out.push(t); });
    return out;
  }
  function numPart(ans, traps, hint, sol, label){
    return { kind: 'num', label: label || RES, unit: '', ans: ans, tol: 0, sign: 'strict', pm: true, signMsg: PLAIN,
      traps: uniq(traps, function(v){ return v === ans || !isFinite(v); }), hint: hint, sol: sol };
  }
  function fillPart(tpl, ans, traps, hint, sol, more){
    var p = { kind: 'fill', label: /\{(s|±)\d/.test(tpl) ? LABS : LAB, tpl: tpl, ans: ans, hint: hint, sol: sol,
      traps: uniq(traps, function(v){ return v.every(function(x, i){ return x == null || x === ans[i]; }); }) };
    if (more) for (var k in more) p[k] = more[k];
    return p;
  }
  function trap(v, fr, it){ return { v: v, fr: fr, it: it }; }

  /* ---------- Calculs : priorités, valeur d'une expression, puissances, fractions, écriture scientifique ---------- */
  function gPrio(){
    var k = rnd(0, 5), a, b, c, e, ans, traps = [], st, d;
    var MULT = ['La multiplication passe avant l’addition et la soustraction.', 'La moltiplicazione viene prima dell’addizione e della sottrazione.'];
    var CAR = function(n){ return ['Le carré porte seulement sur ' + n + ' : calcule d’abord ' + n + '².', 'Il quadrato riguarda solo ' + n + ': calcola prima ' + n + '².']; };
    if (k === 0){
      a = rnd(2, 9); b = rnd(2, 9); c = rnd(2, 9); e = a + ' + ' + b + ' × ' + c; ans = a + b * c;
      traps.push(trap((a + b) * c, 'Tu as calculé de gauche à droite. ' + MULT[0], 'Hai calcolato da sinistra a destra. ' + MULT[1]));
      st = [e, '= ' + a + ' + ' + b * c, '= ' + z(ans)];
    } else if (k === 1){
      a = rnd(2, 30); b = rnd(2, 6); c = rnd(2, 6); e = a + ' − ' + b + ' × ' + c; ans = a - b * c;
      traps.push(trap((a - b) * c, 'Tu as calculé de gauche à droite. ' + MULT[0], 'Hai calcolato da sinistra a destra. ' + MULT[1]));
      st = [e, '= ' + a + ' − ' + b * c, '= ' + z(ans)];
    } else if (k === 2){
      a = rnd(2, 9); b = rnd(2, 9); c = rnd(2, 6); e = a + ' × ' + b + ' − ' + pw(c, 2); ans = a * b - c * c;
      traps.push(trap((a * b - c) * (a * b - c), CAR(c)[0], CAR(c)[1]));
      traps.push(trap(a * b - 2 * c, c + '², c’est ' + c + ' × ' + c + ', pas 2 × ' + c + '.', c + '² è ' + c + ' × ' + c + ', non 2 × ' + c + '.'));
      st = [e, '= ' + a * b + ' − ' + c * c, '= ' + z(ans)];
    } else if (k === 3){
      a = rnd(2, 20); b = rnd(2, 5); c = rnd(2, 4); e = a + ' − ' + b + ' × ' + pw(c, 2); ans = a - b * c * c;
      traps.push(trap((a - b) * c * c, MULT[0], MULT[1]));
      traps.push(trap(a - b * c * b * c, CAR(c)[0], CAR(c)[1]));
      st = [e, '= ' + a + ' − ' + b + ' × ' + c * c, '= ' + a + ' − ' + b * c * c, '= ' + z(ans)];
    } else if (k === 4){
      do { a = rnd(2, 12); b = rnd(2, 12); } while (a === b);
      c = rnd(2, 5); d = a - b; e = '(' + a + ' − ' + b + ') × ' + pw(c, 2); ans = d * c * c;
      traps.push(trap(a - b * c * c, 'Les parenthèses d’abord : calcule ' + a + ' − ' + b + ' en premier.', 'Prima le parentesi: calcola ' + a + ' − ' + b + ' per primo.'));
      traps.push(trap(d * c * d * c, CAR(c)[0], CAR(c)[1]));
      st = [e, '= ' + zp(d) + ' × ' + pw(c, 2), '= ' + zp(d) + ' × ' + c * c, '= ' + z(ans)];
    } else {
      a = rnd(2, 15); do { b = rnd(2, 9); c = rnd(2, 9); } while (b === c);
      d = b - c; e = a + ' + (' + b + ' − ' + c + ')' + SQ; ans = a + d * d;
      traps.push(trap((a + d) * (a + d), 'Le carré porte seulement sur la parenthèse.', 'Il quadrato riguarda solo la parentesi.'));
      traps.push(trap(a + b * b - c * c, 'Calcule d’abord la parenthèse : (' + b + ' − ' + c + ')² n’est pas ' + b + '² − ' + c + '².', 'Calcola prima la parentesi: (' + b + ' − ' + c + ')² non è ' + b + '² − ' + c + '².'));
      st = [e, '= ' + a + ' + ' + pw(zp(d), 2), '= ' + a + ' + ' + d * d, '= ' + z(ans)];
    }
    return { type: { fr: 'Priorités', it: 'Ordine delle operazioni' },
      text: Q('Calcule en respectant les priorités.', 'Calcola rispettando l’ordine delle operazioni.', M(e)),
      part: numPart(ans, traps,
        { fr: 'Ordre des calculs : les parenthèses, puis les puissances, puis × et ÷, enfin + et −.', it: 'Ordine dei calcoli: le parentesi, poi le potenze, poi × e ÷, infine + e −.' },
        calc(pose(st))) };
  }
  function gSubst(){
    var k = rnd(0, 3), xv = pick([-5, -4, -3, -2, -1, 2, 3, 4, 5, 6]), a, b, e, ans, traps = [], st;
    var SUB = '(' + z(xv) + ')';
    if (k === 0){
      a = rnd(2, 6); b = nz(-9, 9); e = lin(a, b); ans = a * xv + b;
      if (xv > 0) traps.push(trap(10 * a + xv + b, 'Tu as lu « ' + a + 'x » comme le nombre ' + (10 * a + xv) + '. Mais ' + a + 'x veut dire ' + a + ' × x.', 'Hai letto «' + a + 'x» come il numero ' + (10 * a + xv) + '. Ma ' + a + 'x significa ' + a + ' × x.'));
      traps.push(trap(a + xv + b, 'Tu as additionné ' + a + ' et x. Mais ' + a + 'x veut dire ' + a + ' × x.', 'Hai sommato ' + a + ' e x. Ma ' + a + 'x significa ' + a + ' × x.'));
      st = [a + ' × ' + zp(xv) + ' ' + pm(b), '= ' + z(a * xv) + ' ' + pm(b), '= ' + z(ans)];
    } else if (k === 1){
      a = rnd(1, 12); b = rnd(2, 6); e = poly([[a, ''], [-b, X]]); ans = a - b * xv;
      traps.push(trap((a - b) * xv, 'La multiplication passe avant la soustraction : calcule d’abord ' + b + ' × x.', 'La moltiplicazione viene prima della sottrazione: calcola prima ' + b + ' × x.'));
      if (xv < 0) traps.push(trap(a + b * xv, 'Moins par moins donne plus : − ' + b + ' × ' + SUB + ' = + ' + (-b * xv) + '.', 'Meno per meno dà più: − ' + b + ' × ' + SUB + ' = + ' + (-b * xv) + '.'));
      st = [a + ' − ' + b + ' × ' + zp(xv), '= ' + a + ' ' + pm(-b * xv), '= ' + z(ans)];
    } else if (k === 2){
      b = nz(-6, 6); e = poly([[1, X + SQ], [b, X]]); ans = xv * xv + b * xv;
      if (xv < 0) traps.push(trap(-xv * xv + b * xv, 'Le carré d’un nombre négatif est positif : ' + SUB + '² = ' + xv * xv + '.', 'Il quadrato di un numero negativo è positivo: ' + SUB + '² = ' + xv * xv + '.'));
      traps.push(trap(2 * xv + b * xv, 'x², c’est x × x, pas 2 × x.', 'x² è x × x, non 2 × x.'));
      st = [pw(zp(xv), 2) + ' ' + (b < 0 ? MI : '+') + ' ' + (Math.abs(b) === 1 ? '' : Math.abs(b) + ' × ') + zp(xv), '= ' + xv * xv + ' ' + pm(b * xv), '= ' + z(ans)];
    } else {
      a = pick([2, 3, 4, 5, -2, -3]); b = nz(-9, 9); e = poly([[a, X + SQ], [b, '']]); ans = a * xv * xv + b;
      traps.push(trap(a * xv * a * xv + b, 'Le carré porte seulement sur x : calcule d’abord x², puis multiplie par ' + z(a) + '.', 'Il quadrato riguarda solo x: calcola prima x², poi moltiplica per ' + z(a) + '.'));
      if (xv < 0) traps.push(trap(-a * xv * xv + b, 'Le carré d’un nombre négatif est positif : ' + SUB + '² = ' + xv * xv + '.', 'Il quadrato di un numero negativo è positivo: ' + SUB + '² = ' + xv * xv + '.'));
      st = [z(a) + ' × ' + pw(zp(xv), 2) + ' ' + pm(b), '= ' + z(a) + ' × ' + xv * xv + ' ' + pm(b), '= ' + z(a * xv * xv) + ' ' + pm(b), '= ' + z(ans)];
    }
    var XV = M(X + ' = ' + z(xv));
    return { type: { fr: 'Valeur d’une expression', it: 'Valore di un’espressione' },
      text: Q('Pour ' + XV + ', calcule :', 'Per ' + XV + ', calcola:', M(e)),
      part: numPart(ans, traps,
        xv < 0 ? { fr: 'Remplace x par ' + SUB + ', entre parenthèses, et remets le signe × là où il était caché.', it: 'Sostituisci x con ' + SUB + ', tra parentesi, e rimetti il segno × dove era nascosto.' }
          : { fr: 'Remplace x par ' + xv + ' et remets le signe × là où il était caché.', it: 'Sostituisci x con ' + xv + ' e rimetti il segno × dove era nascosto.' },
        calc(pose(st))) };
  }
  function gPuiss(){
    var k = rnd(0, 4), a, m, n, p, e, ans, traps = [], sol, hint;
    var TXT = Q('Écris sous la forme d’une seule puissance.', 'Scrivi come un’unica potenza.');
    var H = regles('Les règles de calcul sur les puissances :', 'Le regole di calcolo sulle potenze:', [
      pw(LA, LN) + ' × ' + pw(LA, LP) + ' = ' + pw(LA, LN + ' + ' + LP),
      frac(pw(LA, LN), pw(LA, LP)) + ' = ' + pw(LA, LN + ' − ' + LP),
      pw('(' + pw(LA, LN) + ')', LP) + ' = ' + pw(LA, LN + ' × ' + LP)]);
    if (k === 3){
      /* Calculer une puissance d'un nombre négatif */
      a = rnd(2, 5); var c = rnd(0, 4), SOLV;
      if (c === 0){ e = pw('(' + MI + a + ')', 2); ans = a * a;
        traps.push(trap(-a * a, 'Le carré d’un nombre négatif est positif : (' + MI + a + ') × (' + MI + a + ') = +' + a * a + '.', 'Il quadrato di un numero negativo è positivo: (' + MI + a + ') × (' + MI + a + ') = +' + a * a + '.'));
        traps.push(trap(-2 * a, '(' + MI + a + ')², c’est (' + MI + a + ') × (' + MI + a + '), pas 2 × (' + MI + a + ').', '(' + MI + a + ')² è (' + MI + a + ') × (' + MI + a + '), non 2 × (' + MI + a + ').'));
        SOLV = [e, '= (' + MI + a + ') × (' + MI + a + ')', '= ' + ans];
      } else if (c === 1){ e = MI + pw(a, 2); ans = -a * a;
        traps.push(trap(a * a, 'Sans parenthèses, le carré porte seulement sur ' + a + ' : ' + MI + a + '² = ' + MI + '(' + a + ' × ' + a + ').', 'Senza parentesi il quadrato riguarda solo ' + a + ': ' + MI + a + '² = ' + MI + '(' + a + ' × ' + a + ').'));
        SOLV = [e, '= ' + MI + '(' + a + ' × ' + a + ')', '= ' + z(ans)];
      } else if (c === 2){ e = pw('(' + MI + a + ')', 3); ans = -a * a * a;
        traps.push(trap(a * a * a, 'Exposant impair : le résultat garde le signe moins.', 'Esponente dispari: il risultato mantiene il segno meno.'));
        traps.push(trap(-3 * a, 'Une puissance 3, c’est trois facteurs égaux multipliés, pas 3 × (' + MI + a + ').', 'Una potenza 3 vuol dire tre fattori uguali moltiplicati, non 3 × (' + MI + a + ').'));
        SOLV = [e, '= (' + MI + a + ') × (' + MI + a + ') × (' + MI + a + ')', '= ' + a * a + ' × (' + MI + a + ')', '= ' + z(ans)];
      } else if (c === 3){ e = pw(a, 3); ans = a * a * a;
        traps.push(trap(3 * a, a + '³, c’est ' + a + ' × ' + a + ' × ' + a + ', pas 3 × ' + a + '.', a + '³ è ' + a + ' × ' + a + ' × ' + a + ', non 3 × ' + a + '.'));
        SOLV = [e, '= ' + a + ' × ' + a + ' × ' + a, '= ' + a * a + ' × ' + a, '= ' + ans];
      } else { a = rnd(2, 12); e = pw(a, 0); ans = 1;
        traps.push(trap(0, 'Un nombre non nul à la puissance 0 vaut 1, pas 0.', 'Un numero diverso da zero elevato a 0 vale 1, non 0.'));
        traps.push(trap(a, a + ' tout seul, c’est ' + a + '¹. À la puissance 0, on obtient 1.', a + ' da solo è ' + a + '¹. Elevato a 0 si ottiene 1.'));
        SOLV = [e, '= 1'];
      }
      return { type: { fr: 'Puissances', it: 'Potenze' }, text: Q('Calcule.', 'Calcola.', M(e)),
        part: numPart(ans, traps, { fr: 'Écris la puissance comme un produit de facteurs égaux, puis compte les signes moins.', it: 'Scrivi la potenza come un prodotto di fattori uguali, poi conta i segni meno.' }, calc(pose(SOLV))) };
    }
    a = pick([2, 3, 5, 7, 10]);
    if (k === 0){
      do { m = nz(-6, 9); n = nz(-6, 9); } while (m + n === 0 || m + n === 1 || m === n || m === 1 || n === 1);
      e = pw(a, z(m)) + ' × ' + pw(a, z(n)); ans = m + n;
      traps.push(trap([m * n], 'Pour un produit de puissances d’un même nombre, on additionne les exposants (on ne les multiplie pas).', 'Per un prodotto di potenze dello stesso numero si sommano gli esponenti (non si moltiplicano).'));
      sol = calc(pose([e, '= ' + pw(a, z(m) + ' + ' + zp(n)), '= ' + pw(a, z(ans))]));
    } else if (k === 1){
      do { m = nz(-6, 9); n = nz(-6, 9); } while (m === n || m - n === 1 || m === 1 || n === 1);
      e = frac(pw(a, z(m)), pw(a, z(n))); ans = m - n;
      traps.push(trap([m + n], 'Pour un quotient, on soustrait les exposants : celui du haut moins celui du bas.', 'Per un quoziente si sottraggono gli esponenti: quello sopra meno quello sotto.'));
      traps.push(trap([n - m], 'L’ordre compte : exposant du haut moins exposant du bas.', 'L’ordine conta: esponente sopra meno esponente sotto.'));
      sol = calc(pose([e, '= ' + pw(a, z(m) + ' − ' + zp(n)), '= ' + pw(a, z(ans))]));
    } else if (k === 2){
      do { m = nz(-4, 6); n = nz(-4, 6); } while (m + n === m * n || m * n === 1 || m === 1 || n === 1);
      e = pw('(' + pw(a, z(m)) + ')', z(n)); ans = m * n;
      traps.push(trap([m + n], 'Pour une puissance de puissance, on multiplie les exposants (on ne les additionne pas).', 'Per una potenza di potenza si moltiplicano gli esponenti (non si sommano).'));
      sol = calc(pose([e, '= ' + pw(a, z(m) + ' × ' + zp(n)), '= ' + pw(a, z(ans))]));
    } else {
      a = 10;
      do { m = nz(-8, 8); n = nz(-8, 8); p = nz(-8, 8); } while (m + n - p === 0 || m + n - p === 1 || m === 1 || n === 1 || p === 1 || m + n === 0 || m + n === 1);
      e = frac(pw(10, z(m)) + ' × ' + pw(10, z(n)), pw(10, z(p))); ans = m + n - p;
      traps.push(trap([m + n + p], 'On additionne les exposants du produit, puis on soustrait celui du dénominateur.', 'Si sommano gli esponenti del prodotto, poi si sottrae quello del denominatore.'));
      sol = calc(pose([e, '= ' + frac(pw(10, z(m + n)), pw(10, z(p))), '= ' + pw(10, z(m + n) + ' − ' + zp(p)), '= ' + pw(10, z(ans))]));
    }
    return { type: { fr: 'Puissances', it: 'Potenze' }, text: TXT + '<p class="mq">' + M(e) + '</p>',
      part: fillPart('= ' + a + '<sup class="bxs">{±0}</sup>', [ans], traps, H, sol) };
  }
  function gFrac(){
    var op = pick(['+', '+', MI, MI, '×', '÷']), a, b, c, d, n, dn, g, traps = [], sol, hint;
    do {
      b = pick([2, 3, 4, 5, 6, 8, 9, 10, 12]); d = pick([2, 3, 4, 5, 6, 8, 9, 10, 12]);
      a = rnd(1, 9); c = rnd(1, 9);
      if (op === '+'){ n = a * d + c * b; dn = b * d; }
      else if (op === MI){ n = a * d - c * b; dn = b * d; }
      else if (op === '×'){ n = a * c; dn = b * d; }
      else { n = a * d; dn = b * c; }
      g = gcd(n, dn) || 1; n /= g; dn /= g;
    } while (gcd(a, b) !== 1 || gcd(c, d) !== 1 || dn === 1 || n === 0 || dn > 99 || Math.abs(n) > 99 || ((op === '+' || op === MI) && b === d && a === c) || (op === '÷' && c === 1 && d === 1));
    var F1 = frac(a, b), F2 = frac(c, d), e = F1 + ' ' + op + ' ' + F2, R = (n < 0 ? MI : '') + frac(Math.abs(n), dn);
    if (op === '+' || op === MI){
      var l = b * d / gcd(b, d), a2 = a * l / b, c2 = c * l / d, s = op === '+' ? a2 + c2 : a2 - c2;
      if (b !== d){
        traps.push(trap(op === '+' ? [a + c, b + d] : [a - c, b - d], 'On n’additionne pas (et on ne soustrait pas) les dénominateurs : il faut d’abord un dénominateur commun.', 'I denominatori non si sommano (e non si sottraggono): serve prima un denominatore comune.'));
        hint = { fr: 'Mets les deux fractions au même dénominateur : le plus petit multiple commun de ' + b + ' et ' + d + ' est ' + l + '.', it: 'Porta le due frazioni allo stesso denominatore: il minimo comune multiplo di ' + b + ' e ' + d + ' è ' + l + '.' };
      } else hint = { fr: 'Le dénominateur est déjà commun : on garde ' + b + ' et on calcule avec les numérateurs. Puis on simplifie.', it: 'Il denominatore è già comune: si tiene ' + b + ' e si calcola con i numeratori. Poi si semplifica.' };
      var st = [e];
      if (b !== d) st.push('= ' + frac(a2, l) + ' ' + op + ' ' + frac(c2, l));
      st.push('= ' + (s < 0 ? MI : '') + frac(Math.abs(s), l));
      if (Math.abs(s) !== Math.abs(n) || l !== dn) st.push('= ' + R);
      sol = calc(pose(st));
    } else if (op === '×'){
      traps.push(trap([a * d, b * c], 'Pour multiplier : numérateurs entre eux, dénominateurs entre eux. On ne retourne aucune fraction.', 'Per moltiplicare: numeratori tra loro, denominatori tra loro. Non si capovolge nessuna frazione.'));
      hint = { fr: 'Multiplie les numérateurs entre eux et les dénominateurs entre eux. Simplifie avant de calculer si tu peux.', it: 'Moltiplica i numeratori tra loro e i denominatori tra loro. Se puoi, semplifica prima di calcolare.' };
      var st2 = [e, '= ' + frac(a + ' × ' + c, b + ' × ' + d), '= ' + frac(a * c, b * d)];
      if (a * c !== n) st2.push('= ' + R);
      sol = calc(pose(st2));
    } else {
      traps.push(trap([a * c / gcd(a * c, b * d), b * d / gcd(a * c, b * d)], 'Diviser par une fraction, c’est multiplier par son inverse : il faut retourner la deuxième fraction.', 'Dividere per una frazione vuol dire moltiplicare per la sua inversa: bisogna capovolgere la seconda frazione.'));
      hint = { fr: 'Diviser par ' + F2 + ', c’est multiplier par son inverse ' + frac(d, c) + '.', it: 'Dividere per ' + F2 + ' vuol dire moltiplicare per la sua inversa ' + frac(d, c) + '.' };
      var st3 = [e, '= ' + F1 + ' × ' + frac(d, c), '= ' + frac(a * d, b * c)];
      if (a * d !== n) st3.push('= ' + R);
      sol = calc(pose(st3));
    }
    return { type: { fr: 'Fractions', it: 'Frazioni' },
      text: Q('Calcule et donne le résultat sous forme de fraction irréductible.', 'Calcola e dai il risultato come frazione ridotta ai minimi termini.', M(e)),
      part: fillPart('= {s0}' + frac('{0}', '{1}'), [n, dn], traps, hint, sol, { frac: [[0, 1]] }) };
  }
  /* Écriture décimale à la française d'un nombre k × 10^e (k entier), sans passer par les nombres à virgule de la machine */
  function decStr(k, e){
    var s = String(k), ent, dec = '';
    if (e >= 0) ent = s + new Array(e + 1).join('0');
    else if (-e < s.length){ ent = s.slice(0, s.length + e); dec = s.slice(s.length + e); }
    else { ent = '0'; dec = new Array(-e - s.length + 1).join('0') + s; }
    dec = dec.replace(/0+$/, '');
    ent = ent.replace(/\B(?=(\d{3})+(?!\d))/g, NB);
    dec = dec.replace(/(\d{3})(?=\d)/g, '$1' + NB);
    return ent + (dec ? ',' + dec : '');
  }
  function gSci(){
    var mk = pick([[12, 1], [3, 0], [45, 1], [602, 2], [71, 1], [96, 1], [25, 1], [8, 0], [175, 2], [64, 1]]), e;
    do { e = rnd(-6, 8); } while (Math.abs(e) < 2);
    var mant = mk[0] / Math.pow(10, mk[1]), N = decStr(mk[0], e - mk[1]), MANT = num(mant, 3), val = mk[0] * Math.pow(10, e - mk[1]);
    return { type: { fr: 'Écriture scientifique', it: 'Notazione scientifica' },
      text: Q('Donne l’écriture scientifique de ce nombre.', 'Scrivi questo numero in notazione scientifica.', M(N)),
      part: fillPart('= {0} × 10<sup class="bxs">{±1}</sup>', [mant, e], [],
        { fr: 'Déplace la virgule pour obtenir un nombre entre 1 et 10, puis compte de combien de rangs tu l’as déplacée. Vers la gauche : exposant positif. Vers la droite : exposant négatif.', it: 'Sposta la virgola per ottenere un numero tra 1 e 10, poi conta di quanti posti l’hai spostata. Verso sinistra: esponente positivo. Verso destra: esponente negativo.' },
        calc(pose([N, '= ' + MANT + ' × ' + pw(10, z(e))]),
          'Le premier facteur, ' + MANT + ', est entre 1 et 10. La virgule s’est déplacée de ' + Math.abs(e) + ' rang' + (Math.abs(e) > 1 ? 's' : '') + ' vers la ' + (e > 0 ? 'gauche' : 'droite') + '.',
          'Il primo fattore, ' + MANT + ', è tra 1 e 10. La virgola si è spostata di ' + Math.abs(e) + ' post' + (Math.abs(e) > 1 ? 'i' : 'o') + ' verso ' + (e > 0 ? 'sinistra' : 'destra') + '.'),
        { check: function(v){
            if (v[1] !== Math.round(v[1]) || Math.abs(v[1]) > 30) return null;
            if (Math.abs(v[0] * Math.pow(10, v[1]) - val) <= Math.abs(val) * 1e-9) return { r: 'mid', msg: { fr: 'Presque : le nombre est bon, mais ce n’est pas l’écriture scientifique. Le premier facteur doit être entre 1 et 10 (10 exclu).', it: 'Quasi: il numero è giusto, ma non è la notazione scientifica. Il primo fattore deve essere tra 1 e 10 (10 escluso).' } };
            return null;
          } }) };
  }

  /* ---------- Racines carrées ---------- */
  function sqfree(n){ for (var i = 2; i * i <= n; i++) if (n % (i * i) === 0) return false; return true; }
  function gRac(){
    var k = rnd(0, 5), a, b, m, n, e, traps = [];
    var T = { fr: 'Racines carrées', it: 'Radici quadrate' };
    if (k <= 1){
      /* √n = a√m, m le plus petit possible */
      do { a = pick([2, 3, 4, 5, 6, 7, 10]); m = pick([2, 3, 5, 6, 7, 10]); n = a * a * m; } while (n > 500);
      traps.push(trap([a * a, m], 'Le carré ' + a * a + ' sort de la racine en devenant ' + a + ' : ' + rac(a * a) + ' = ' + a + '.', 'Il quadrato ' + a * a + ' esce dalla radice diventando ' + a + ': ' + rac(a * a) + ' = ' + a + '.'));
      traps.push(trap([m, a], 'Tu as inversé : c’est le carré ' + a * a + ' = ' + a + '² qui sort de la racine, et ' + m + ' reste dessous.', 'Hai invertito: è il quadrato ' + a * a + ' = ' + a + '² che esce dalla radice, e ' + m + ' resta sotto.'));
      return { type: T,
        text: Q('Écris sous la forme a√b, avec b le plus petit possible.', 'Scrivi nella forma a√b, con b il più piccolo possibile.', M(rac(n))),
        part: fillPart('= {0}' + racBox('{1}'), [a, m], traps,
          { fr: 'Cherche le plus grand carré (4, 9, 16, 25, 36, 49, 100...) qui divise ' + n + '.', it: 'Cerca il più grande quadrato (4, 9, 16, 25, 36, 49, 100...) che divide ' + n + '.' },
          calc(pose([rac(n), '= ' + rac(a * a + ' × ' + m), '= ' + rac(a * a) + ' × ' + rac(m), '= ' + a + rac(m)])),
          { check: function(v){
              if (v[0] > 0 && v[1] > 0 && Math.abs(v[0] * v[0] * v[1] - n) < 1e-9 && v[1] !== m) return { r: 'mid', msg: { fr: 'Presque : c’est bien égal, mais on peut encore simplifier. Le nombre sous la racine contient encore un carré.', it: 'Quasi: è uguale, ma si può semplificare ancora. Il numero sotto la radice contiene ancora un quadrato.' } };
              return null;
            } }) };
    }
    if (k === 2){
      /* a√m + b√m */
      m = pick([2, 3, 5, 6, 7]); do { a = nz(-9, 9); b = nz(-9, 9); } while (a + b === 0 || a + b === 1 || a === 1);
      e = poly([[a, rac(m)], [b, rac(m)]]);
      return { type: T, text: Q('Réduis cette somme.', 'Riduci questa somma.', M(e)),
        part: fillPart('= {±0}' + rac(m), [a + b], [],
          { fr: 'On compte les ' + rac(m) + ' comme on compte des x : ' + z(a) + ' ' + pm(b) + '.', it: 'Le ' + rac(m) + ' si contano come le x: ' + z(a) + ' ' + pm(b) + '.' },
          calc(pose([e, '= (' + z(a) + ' ' + pm(b) + ')' + rac(m), '= ' + mono(a + b, rac(m)).replace(/^/, a + b < 0 ? MI : '')]))) };
    }
    if (k === 3){
      /* produit ou quotient de deux racines : le résultat est un entier */
      if (Math.random() < 0.5){
        var pr = pick([[2, 8], [3, 12], [2, 18], [5, 20], [3, 27], [2, 32], [6, 24], [5, 45], [2, 50], [7, 28]]);
        a = pr[0]; b = pr[1]; n = Math.round(Math.sqrt(a * b));
        traps.push(trap(a * b, 'N’oublie pas la racine : ' + rac(a) + ' × ' + rac(b) + ' = ' + rac(a * b) + ', et ' + rac(a * b) + ' = ' + n + '.', 'Non dimenticare la radice: ' + rac(a) + ' × ' + rac(b) + ' = ' + rac(a * b) + ', e ' + rac(a * b) + ' = ' + n + '.'));
        return { type: T, text: Q('Calcule. Le résultat est un entier.', 'Calcola. Il risultato è un numero intero.', M(rac(a) + ' × ' + rac(b))),
          part: numPart(n, traps, { fr: 'Le produit de deux racines est la racine du produit.', it: 'Il prodotto di due radici è la radice del prodotto.' },
            calc(pose([rac(a) + ' × ' + rac(b), '= ' + rac(a + ' × ' + b), '= ' + rac(a * b), '= ' + n]))) };
      }
      var qt = pick([[18, 2], [50, 2], [12, 3], [75, 3], [20, 5], [48, 3], [32, 2], [45, 5], [96, 6], [28, 7], [72, 2], [98, 2]]);
      a = qt[0]; b = qt[1]; n = Math.round(Math.sqrt(a / b));
      traps.push(trap(a / b, 'N’oublie pas la racine : le quotient des racines est ' + rac(a / b) + ', et ' + rac(a / b) + ' = ' + n + '.', 'Non dimenticare la radice: il quoziente delle radici è ' + rac(a / b) + ', e ' + rac(a / b) + ' = ' + n + '.'));
      return { type: T, text: Q('Calcule. Le résultat est un entier.', 'Calcola. Il risultato è un numero intero.', M(frac(rac(a), rac(b)))),
        part: numPart(n, traps, { fr: 'Le quotient de deux racines est la racine du quotient.', it: 'Il quoziente di due radici è la radice del quoziente.' },
          calc(pose([frac(rac(a), rac(b)), '= ' + rac(frac(a, b)), '= ' + rac(a / b), '= ' + n]))) };
    }
    if (k === 4){
      /* carré d'une racine, racine d'un carré */
      var c = rnd(0, 2);
      if (c === 0){
        a = rnd(2, 6); m = pick([2, 3, 5, 6, 7]); n = a * a * m; e = pw('(' + a + rac(m) + ')', 2);
        traps.push(trap(a * m, 'Le carré porte aussi sur ' + a + ' : ' + a + '² = ' + a * a + '.', 'Il quadrato riguarda anche ' + a + ': ' + a + '² = ' + a * a + '.'));
        traps.push(trap(a * a * m * m, 'Le carré d’une racine redonne le nombre : ' + pw('(' + rac(m) + ')', 2) + ' = ' + m + ', pas ' + m * m + '.', 'Il quadrato di una radice ridà il numero: ' + pw('(' + rac(m) + ')', 2) + ' = ' + m + ', non ' + m * m + '.'));
        return { type: T, text: Q('Calcule.', 'Calcola.', M(e)),
          part: numPart(n, traps, regles('Le carré d’un produit est le produit des carrés. Et le carré d’une racine redonne le nombre.', 'Il quadrato di un prodotto è il prodotto dei quadrati. E il quadrato di una radice ridà il numero.',
            ['(' + LA + LB + ')' + SQ + ' = ' + LA + SQ + ' × ' + LB + SQ, pw('(' + rac(LA) + ')', 2) + ' = ' + LA]),
            calc(pose([e, '= ' + pw(a, 2) + ' × ' + pw('(' + rac(m) + ')', 2), '= ' + a * a + ' × ' + m, '= ' + n]))) };
      }
      a = pick([2, 3, 5, 6, 7, 8, 10, 11, 12, 13]);
      if (c === 1){
        e = rac(pw('(' + MI + a + ')', 2));
        traps.push(trap(-a, 'Une racine carrée est toujours positive ou nulle : ' + e + ' = ' + rac(a * a) + ' = ' + a + '.', 'Una radice quadrata è sempre positiva o nulla: ' + e + ' = ' + rac(a * a) + ' = ' + a + '.'));
        return { type: T, text: Q('Calcule.', 'Calcola.', M(e)),
          part: numPart(a, traps, { fr: 'Calcule d’abord le carré sous la racine. Le résultat d’une racine carrée n’est jamais négatif.', it: 'Calcola prima il quadrato sotto la radice. Il risultato di una radice quadrata non è mai negativo.' },
            calc(pose([e, '= ' + rac(a * a), '= ' + a]))) };
      }
      e = pw('(' + rac(a) + ')', 2);
      traps.push(trap(a * a, 'Le carré et la racine carrée se compensent : on retrouve ' + a + ', pas ' + a * a + '.', 'Il quadrato e la radice quadrata si compensano: si ritrova ' + a + ', non ' + a * a + '.'));
      return { type: T, text: Q('Calcule.', 'Calcola.', M(e)),
        part: numPart(a, traps, { fr: 'Par définition, ' + rac('a') + ' est le nombre positif dont le carré vaut a.', it: 'Per definizione, ' + rac('a') + ' è il numero positivo il cui quadrato vale a.' },
          calc(pose([e, '= ' + a]))) };
    }
    /* deux racines à simplifier avant de réduire : p√(a²m) + q√(b²m) */
    var p, q;
    m = pick([2, 3, 5]);
    do { a = pick([2, 3, 4, 5]); b = pick([2, 3, 4, 5]); p = pick([1, 2, 3, -1, -2]); q = pick([1, 2, 3, -1, -2, -3]); } while (a === b || p * a + q * b === 0 || p * a + q * b === 1 || a * a * m > 100 || b * b * m > 100);
    e = poly([[p, rac(a * a * m)], [q, rac(b * b * m)]]);
    n = p * a + q * b;
    return { type: T, text: Q('Simplifie chaque racine, puis réduis.', 'Semplifica ogni radice, poi riduci.', M(e)),
      part: fillPart('= {±0}' + rac(m), [n], [trap([p + q], 'Simplifie d’abord chaque racine : ' + rac(a * a * m) + ' = ' + a + rac(m) + ' et ' + rac(b * b * m) + ' = ' + b + rac(m) + '.', 'Semplifica prima ogni radice: ' + rac(a * a * m) + ' = ' + a + rac(m) + ' e ' + rac(b * b * m) + ' = ' + b + rac(m) + '.')],
        { fr: a * a * m + ' = ' + a * a + ' × ' + m + ' et ' + b * b * m + ' = ' + b * b + ' × ' + m + '.', it: a * a * m + ' = ' + a * a + ' × ' + m + ' e ' + b * b * m + ' = ' + b * b + ' × ' + m + '.' },
        calc(pose([e, '= ' + poly([[p * a, rac(m)], [q * b, rac(m)]]), '= ' + (n < 0 ? MI : '') + mono(n, rac(m))]))) };
  }

  /* ---------- Développer et réduire ---------- */
  function gDev(){
    var k = rnd(0, 5), a, b, c, d, e, kk, traps = [];
    var H2 = { fr: 'Chaque terme de la première parenthèse multiplie chaque terme de la seconde : 4 produits. Ensuite, on regroupe les termes en x.', it: 'Ogni termine della prima parentesi moltiplica ogni termine della seconda: 4 prodotti. Poi si raggruppano i termini in x.' };
    if (k === 0){
      kk = pick([2, 3, 4, 5, 6, 7, 8, 9, -2, -3, -4, -5, -6]); a = rnd(1, 5); b = nz(-9, 9);
      e = z(kk) + '(' + lin(a, b) + ')';
      traps.push(trap([kk * a, b], 'Tu as multiplié seulement le premier terme. Le facteur ' + z(kk) + ' multiplie chaque terme de la parenthèse.', 'Hai moltiplicato solo il primo termine. Il fattore ' + z(kk) + ' moltiplica ogni termine della parentesi.'));
      return { type: { fr: 'Développer', it: 'Sviluppare' }, text: Q('Développe.', 'Sviluppa.', M(e)),
        part: fillPart('= {±0}' + X + ' {±1}', [kk * a, kk * b], traps,
          { fr: 'k(a + b) = ka + kb : multiplie chaque terme de la parenthèse par ' + z(kk) + '. Attention à la règle des signes.', it: 'k(a + b) = ka + kb: moltiplica ogni termine della parentesi per ' + z(kk) + '. Attenzione alla regola dei segni.' },
          calc(pose([e, '= ' + z(kk) + ' × ' + mono(a, X) + ' ' + (kk < 0 ? '+ (' + z(kk) + ')' : '+ ' + kk) + ' × ' + zp(b), '= ' + lin(kk * a, kk * b)]))) };
    }
    if (k === 1){
      do { a = nz(-9, 9); b = nz(-9, 9); } while (a + b === 0 || a + b === a * b);
      e = '(' + lin(1, a) + ')(' + lin(1, b) + ')';
      traps.push(trap([a * b, a + b], 'Tu as inversé : le nombre devant x est la somme ' + z(a) + ' ' + pm(b) + ', le dernier terme est le produit ' + zp(a) + ' × ' + zp(b) + '.', 'Hai invertito: il numero davanti a x è la somma ' + z(a) + ' ' + pm(b) + ', l’ultimo termine è il prodotto ' + zp(a) + ' × ' + zp(b) + '.'));
      return { type: { fr: 'Développer', it: 'Sviluppare' }, text: Q('Développe et réduis.', 'Sviluppa e riduci.', M(e)),
        part: fillPart('= ' + X + SQ + ' {±0}' + X + ' {±1}', [a + b, a * b], traps, H2,
          calc(pose([e, '= ' + poly([[1, X + SQ], [b, X], [a, X], [a * b, '']]), '= ' + quad(1, a + b, a * b)]))) };
    }
    if (k === 2){
      do { a = rnd(1, 4); c = rnd(1, 4); b = nz(-7, 7); d = nz(-7, 7); } while ((a === 1 && c === 1) || a * d + b * c === 0);
      e = '(' + lin(a, b) + ')(' + lin(c, d) + ')';
      return { type: { fr: 'Développer', it: 'Sviluppare' }, text: Q('Développe et réduis.', 'Sviluppa e riduci.', M(e)),
        part: fillPart('= {±0}' + X + SQ + ' {±1}' + X + ' {±2}', [a * c, a * d + b * c, b * d], [], H2,
          calc(pose([e, '= ' + poly([[a * c, X + SQ], [a * d, X], [b * c, X], [b * d, '']]), '= ' + quad(a * c, a * d + b * c, b * d)]))) };
    }
    if (k === 3 || k === 4){
      var T = { fr: 'Identités remarquables', it: 'Prodotti notevoli' }, v = rnd(0, 3);
      var H = regles('Les trois identités remarquables :', 'I tre prodotti notevoli:', [ID1, ID2, ID3]);
      a = rnd(1, 9);
      if (v === 0 || v === 1){
        var s = v === 0 ? 1 : -1;
        e = '(' + lin(1, s * a) + ')' + SQ;
        traps.push(trap([0, a * a], 'Il manque le double produit : (x ' + (s > 0 ? '+' : MI) + ' ' + a + ')² n’est pas x² + ' + a + '².', 'Manca il doppio prodotto: (x ' + (s > 0 ? '+' : MI) + ' ' + a + ')² non è x² + ' + a + '².'));
        traps.push(trap([s * a, a * a], 'Le double produit, c’est 2 × x × ' + a + ' = ' + 2 * a + 'x.', 'Il doppio prodotto è 2 × x × ' + a + ' = ' + 2 * a + 'x.'));
        if (a !== 2) traps.push(trap([2 * s * a, 2 * a], a + '², c’est ' + a + ' × ' + a + ' = ' + a * a + ', pas 2 × ' + a + '.', a + '² è ' + a + ' × ' + a + ' = ' + a * a + ', non 2 × ' + a + '.'));
        if (s < 0) traps.push(trap([-2 * a, -a * a], 'Le dernier terme est un carré : (' + MI + a + ')² = +' + a * a + '.', 'L’ultimo termine è un quadrato: (' + MI + a + ')² = +' + a * a + '.'));
        return { type: T, text: Q('Développe et réduis.', 'Sviluppa e riduci.', M(e)),
          part: fillPart('= ' + X + SQ + ' {±0}' + X + ' {±1}', [2 * s * a, a * a], traps, H,
            calc(pose([e, '= ' + X + SQ + ' ' + (s > 0 ? '+' : MI) + ' 2 × ' + X + ' × ' + a + ' + ' + pw(a, 2), '= ' + quad(1, 2 * s * a, a * a)]))) };
      }
      if (v === 2){
        e = '(' + lin(1, -a) + ')(' + lin(1, a) + ')';
        traps.push(trap([a * a], '(a − b)(a + b) = a² − b² : c’est une différence, le signe est moins.', '(a − b)(a + b) = a² − b²: è una differenza, il segno è meno.'));
        traps.push(trap([-2 * a], a + '², c’est ' + a + ' × ' + a + ' = ' + a * a + ', pas 2 × ' + a + '.', a + '² è ' + a + ' × ' + a + ' = ' + a * a + ', non 2 × ' + a + '.'));
        return { type: T, text: Q('Développe et réduis.', 'Sviluppa e riduci.', M(e)),
          part: fillPart('= ' + X + SQ + ' {±0}', [-a * a], traps, H,
            calc(pose([e, '= ' + X + SQ + ' − ' + pw(a, 2), '= ' + X + SQ + ' − ' + a * a]), 'Les termes en x s’annulent : −' + a + 'x + ' + a + 'x = 0.', 'I termini in x si annullano: −' + a + 'x + ' + a + 'x = 0.')) };
      }
      c = rnd(2, 5); b = nz(-6, 6);
      e = '(' + lin(c, b) + ')' + SQ;
      traps.push(trap([c, 2 * c * b, b * b], 'Le carré porte sur tout le terme ' + c + 'x : (' + c + 'x)² = ' + c * c + 'x².', 'Il quadrato riguarda tutto il termine ' + c + 'x: (' + c + 'x)² = ' + c * c + 'x².'));
      traps.push(trap([c * c, c * b, b * b], 'Le double produit, c’est 2 × ' + c + 'x × ' + zp(b) + ' = ' + z(2 * c * b) + 'x.', 'Il doppio prodotto è 2 × ' + c + 'x × ' + zp(b) + ' = ' + z(2 * c * b) + 'x.'));
      return { type: T, text: Q('Développe et réduis.', 'Sviluppa e riduci.', M(e)),
        part: fillPart('= {0}' + X + SQ + ' {±1}' + X + ' {±2}', [c * c, 2 * c * b, b * b], traps, H,
          calc(pose([e, '= ' + pw('(' + c + X + ')', 2) + ' ' + (b > 0 ? '+' : MI) + ' 2 × ' + c + X + ' × ' + Math.abs(b) + ' + ' + pw(Math.abs(b), 2), '= ' + quad(c * c, 2 * c * b, b * b)]))) };
    }
    /* Supprimer une parenthèse précédée du signe moins, puis réduire */
    var p, q, r, s2;
    do { p = rnd(1, 12); q = rnd(1, 5); r = rnd(2, 12); s2 = nz(-9, 9); } while (q === r || p === s2 || p === -s2 || q + r === q - r);
    e = poly([[p, ''], [q, X]]) + ' − (' + lin(r, s2) + ')';
    var SIG = ['Un signe « − » devant une parenthèse change tous les signes à l’intérieur : −(' + lin(r, s2) + ') = ' + lin(-r, -s2) + '.', 'Un segno «−» davanti a una parentesi cambia tutti i segni all’interno: −(' + lin(r, s2) + ') = ' + lin(-r, -s2) + '.'];
    traps.push(trap([q - r, p + s2], SIG[0], SIG[1]));
    traps.push(trap([q + r, p + s2], 'Tu as enlevé la parenthèse sans changer les signes. ' + SIG[0], 'Hai tolto la parentesi senza cambiare i segni. ' + SIG[1]));
    traps.push(trap([q + r, p - s2], SIG[0], SIG[1]));
    return { type: { fr: 'Réduire', it: 'Ridurre' }, text: Q('Supprime la parenthèse, puis réduis.', 'Togli la parentesi, poi riduci.', M(e)),
      part: fillPart('= {±0}' + X + ' {±1}', [q - r, p - s2], traps,
        { fr: 'Le signe « − » devant la parenthèse change le signe de chaque terme. Ensuite, regroupe les x entre eux et les nombres entre eux.', it: 'Il segno «−» davanti alla parentesi cambia il segno di ogni termine. Poi raggruppa le x tra loro e i numeri tra loro.' },
        calc(pose([e, '= ' + poly([[p, ''], [q, X], [-r, X], [-s2, '']]), '= ' + lin(q - r, p - s2)]))) };
  }

  /* ---------- Factoriser ---------- */
  function gFact(){
    var k = rnd(0, 5), a, b, c, e, kk, traps = [];
    var T = { fr: 'Factoriser', it: 'Scomporre' }, TXT = ['Factorise.', 'Scomponi in fattori.'];
    if (k === 0){
      do { kk = rnd(2, 9); a = rnd(1, 5); b = nz(-9, 9); } while (gcd(a, b) !== 1);
      e = lin(kk * a, kk * b);
      var MAXF = { fr: 'Presque : c’est bien égal, mais on peut factoriser davantage. Cherche le plus grand nombre qui divise ' + kk * a + ' et ' + Math.abs(kk * b) + '.', it: 'Quasi: è uguale, ma si può scomporre ancora. Cerca il più grande numero che divide ' + kk * a + ' e ' + Math.abs(kk * b) + '.' };
      var hint = { fr: 'Cherche le plus grand nombre qui divise à la fois ' + kk * a + ' et ' + Math.abs(kk * b) + ' : c’est le facteur commun.', it: 'Cerca il più grande numero che divide sia ' + kk * a + ' sia ' + Math.abs(kk * b) + ': è il fattore comune.' };
      var sol = calc(pose([e, '= ' + kk + ' × ' + mono(a, X) + ' ' + (b < 0 ? MI : '+') + ' ' + kk + ' × ' + Math.abs(b), '= ' + kk + '(' + lin(a, b) + ')']));
      if (a === 1) return { type: T, text: Q(TXT[0], TXT[1], M(e)), part: fillPart('= {0}(' + X + ' {±1})', [kk, b], [trap([kk, kk * b], 'Dans la parenthèse, il reste ' + Math.abs(kk * b) + ' ÷ ' + kk + ' = ' + Math.abs(b) + '.', 'Nella parentesi resta ' + Math.abs(kk * b) + ' ÷ ' + kk + ' = ' + Math.abs(b) + '.')], hint, sol) };
      return { type: T, text: Q(TXT[0], TXT[1], M(e)),
        part: fillPart('= {0}({1}' + X + ' {±2})', [kk, a, b], [], hint, sol,
          { check: function(v){ return v[0] > 0 && v[0] !== kk && v[0] * v[1] === kk * a && v[0] * v[2] === kk * b ? { r: 'mid', msg: MAXF } : null; } }) };
    }
    if (k === 1){
      b = nz(-9, 9);
      if (Math.random() < 0.5){
        e = poly([[1, X + SQ], [b, X]]);
        return { type: T, text: Q(TXT[0], TXT[1], M(e)),
          part: fillPart('= ' + X + '(' + X + ' {±0})', [b], [],
            { fr: 'x² = x × x : le facteur commun aux deux termes est x.', it: 'x² = x × x: il fattore comune ai due termini è x.' },
            calc(pose([e, '= ' + X + ' × ' + X + ' ' + (b < 0 ? MI : '+') + ' ' + Math.abs(b) + ' × ' + X, '= ' + X + '(' + lin(1, b) + ')']))) };
      }
      kk = rnd(2, 6);
      e = poly([[kk, X + SQ], [kk * b, X]]);
      return { type: T, text: Q(TXT[0], TXT[1], M(e)),
        part: fillPart('= {0}' + X + '(' + X + ' {±1})', [kk, b], [trap([kk, kk * b], 'Dans la parenthèse, il reste ' + Math.abs(kk * b) + ' ÷ ' + kk + ' = ' + Math.abs(b) + '.', 'Nella parentesi resta ' + Math.abs(kk * b) + ' ÷ ' + kk + ' = ' + Math.abs(b) + '.')],
          { fr: 'Le facteur commun contient un nombre et une lettre : ' + kk + 'x.', it: 'Il fattore comune contiene un numero e una lettera: ' + kk + 'x.' },
          calc(pose([e, '= ' + kk + X + ' × ' + X + ' ' + (b < 0 ? MI : '+') + ' ' + kk + X + ' × ' + Math.abs(b), '= ' + kk + X + '(' + lin(1, b) + ')']))) };
    }
    var HD = regles('C’est une différence de deux carrés :', 'È una differenza di due quadrati:', [LA + SQ + ' − ' + LB + SQ + ' = (' + LA + ' − ' + LB + ')(' + LA + ' + ' + LB + ')']);
    if (k === 2){
      a = rnd(2, 12); e = X + SQ + ' − ' + a * a;
      return { type: T, text: Q(TXT[0], TXT[1], M(e)),
        part: fillPart('= (' + X + ' − {0})(' + X + ' + {1})', [a, a], [trap([a * a, a * a], a * a + ' est le carré de ' + a + ' : c’est ' + a + ' qu’on écrit dans les parenthèses.', a * a + ' è il quadrato di ' + a + ': nelle parentesi si scrive ' + a + '.')], HD,
          calc(pose([e, '= ' + X + SQ + ' − ' + pw(a, 2), '= (' + lin(1, -a) + ')(' + lin(1, a) + ')']))) };
    }
    if (k === 3){
      a = rnd(2, 5); b = rnd(1, 9); e = a * a + X + SQ + ' − ' + b * b;
      return { type: T, text: Q(TXT[0], TXT[1], M(e)),
        part: fillPart('= ({0}' + X + ' − {1})({2}' + X + ' + {3})', [a, b, a, b], [trap([a * a, b * b, a * a, b * b], a * a + 'x² est le carré de ' + a + 'x, et ' + b * b + ' est le carré de ' + b + '.', a * a + 'x² è il quadrato di ' + a + 'x, e ' + b * b + ' è il quadrato di ' + b + '.')], HD,
          calc(pose([e, '= ' + pw('(' + a + X + ')', 2) + ' − ' + pw(b, 2), '= (' + lin(a, -b) + ')(' + lin(a, b) + ')']))) };
    }
    if (k === 4){
      a = rnd(1, 9); var s = pick([1, -1]);
      e = quad(1, 2 * s * a, a * a);
      return { type: T, text: Q(TXT[0], TXT[1], M(e)),
        part: fillPart('= (' + X + ' {±0})' + SQ, [s * a], [trap([s * a * a], a * a + ' est le carré de ' + a + ' : c’est ' + a + ' qu’on écrit dans la parenthèse.', a * a + ' è il quadrato di ' + a + ': nella parentesi si scrive ' + a + '.')].concat(a !== 1 ? [trap([2 * s * a], 2 * a + ' est le double produit 2 × ' + a + ' : dans la parenthèse on écrit ' + a + '.', 2 * a + ' è il doppio prodotto 2 × ' + a + ': nella parentesi si scrive ' + a + '.')] : []),
          regles('Reconnais une identité remarquable :', 'Riconosci un prodotto notevole:',
            [LA + SQ + ' ' + (s > 0 ? '+' : MI) + ' 2' + LA + LB + ' + ' + LB + SQ + ' = (' + LA + ' ' + (s > 0 ? '+' : MI) + ' ' + LB + ')' + SQ],
            'Ici ' + M(LA + ' = ' + X) + ' et ' + M(LB + SQ + ' = ' + a * a) + '.', 'Qui ' + M(LA + ' = ' + X) + ' e ' + M(LB + SQ + ' = ' + a * a) + '.'),
          calc(pose([e, '= ' + X + SQ + ' ' + (s > 0 ? '+' : MI) + ' 2 × ' + X + ' × ' + a + ' + ' + pw(a, 2), '= (' + lin(1, s * a) + ')' + SQ]))) };
    }
    /* Une parenthèse en facteur commun */
    var p, q, r, s3, minus = Math.random() < 0.5, A, B;
    do { p = nz(-6, 6); q = nz(-8, 8); r = rnd(2, 5); s3 = nz(-8, 8); A = minus ? 1 - r : 1 + r; B = minus ? q - s3 : q + s3; } while (!A || !B || p === q || gcd(A, B) !== 1);
    var F = '(' + lin(1, p) + ')';
    e = F + '(' + lin(1, q) + ') ' + (minus ? MI : '+') + ' ' + F + '(' + lin(r, s3) + ')';
    if (minus) traps.push(trap([1 - r, q + s3], 'Le signe « − » porte sur toute la deuxième parenthèse : −(' + lin(r, s3) + ') = ' + lin(-r, -s3) + '.', 'Il segno «−» riguarda tutta la seconda parentesi: −(' + lin(r, s3) + ') = ' + lin(-r, -s3) + '.'));
    return { type: T, text: Q(TXT[0], TXT[1], MC([F + '(' + lin(1, q) + ')', (minus ? MI : '+') + ' ' + F + '(' + lin(r, s3) + ')'])),
      part: fillPart('= ' + F + '({±0}' + X + ' {±1})', [A, B], traps,
        { fr: 'La parenthèse ' + F + ' apparaît dans les deux termes : c’est le facteur commun. Dans le crochet, écris ce qui reste, puis réduis.', it: 'La parentesi ' + F + ' compare nei due termini: è il fattore comune. Nella parentesi quadra scrivi ciò che resta, poi riduci.' },
        calc(pose(['<span class="mc">' + F + '(' + lin(1, q) + ')</span> <span class="mc">' + (minus ? MI : '+') + ' ' + F + '(' + lin(r, s3) + ')</span>', '= ' + F + '[(' + lin(1, q) + ') ' + (minus ? MI : '+') + ' (' + lin(r, s3) + ')]', '= ' + F + '(' + poly([[1, X], [q, ''], [minus ? -r : r, X], [minus ? -s3 : s3, '']]) + ')', '= ' + F + '(' + lin(A, B) + ')']))) };
  }

  /* ---------- Équations ---------- */
  function gEq(){
    var k = rnd(0, 6), a, b, c, d, x0, e, traps = [];
    var T = { fr: 'Équations', it: 'Equazioni' }, TXT = ['Résous l’équation.', 'Risolvi l’equazione.'], XL = M(X + ' =');
    var H1 = { fr: 'Isole x : fais la même opération des deux côtés. D’abord les additions et soustractions, puis la division.', it: 'Isola x: fai la stessa operazione dai due lati. Prima le addizioni e sottrazioni, poi la divisione.' };
    if (k === 0 || k === 1){
      do { a = nz(-9, 9); } while (Math.abs(a) === 1);
      x0 = nz(-9, 9); b = nz(-12, 12); c = a * x0 + b;
      e = lin(a, b) + ' = ' + z(c);
      traps.push(trap((c + b) / a, 'Erreur de signe : pour enlever ' + pm(b) + ' à gauche, on fait l’opération contraire des deux côtés.', 'Errore di segno: per togliere ' + pm(b) + ' a sinistra, si fa l’operazione contraria dai due lati.'));
      traps.push(trap(c - b, 'Il reste à diviser par ' + z(a) + ' : ' + mono(a, X).replace(/^/, a < 0 ? MI : '') + ' = ' + z(c - b) + '.', 'Resta da dividere per ' + z(a) + ': ' + mono(a, X).replace(/^/, a < 0 ? MI : '') + ' = ' + z(c - b) + '.'));
      return { type: T, text: Q(TXT[0], TXT[1], M(e)),
        part: numPart(x0, traps, H1, calc(pose([e, '⇔ ' + lin(a, 0) + ' = ' + z(c) + ' ' + pm(-b), '⇔ ' + lin(a, 0) + ' = ' + z(c - b), '⇔ ' + X + ' = ' + frac(z(c - b), z(a)), '⇔ ' + X + ' = ' + z(x0)]),
          'Vérification : ' + z(a) + ' × ' + zp(x0) + ' ' + pm(b) + ' = ' + z(c) + '.', 'Verifica: ' + z(a) + ' × ' + zp(x0) + ' ' + pm(b) + ' = ' + z(c) + '.'), XL) };
    }
    if (k === 2){
      do { a = nz(-7, 9); c = nz(-7, 9); } while (a === c);
      x0 = nz(-8, 8); b = nz(-12, 12); d = (a - c) * x0 + b;
      e = lin(a, b) + ' = ' + lin(c, d);
      if (a + c !== 0) traps.push(trap((d - b) / (a + c), 'Quand on enlève ' + mono(c, X).replace(/^/, c < 0 ? MI : '') + ' des deux côtés, on calcule ' + z(a) + 'x ' + pm(-c) + 'x.', 'Quando si toglie ' + mono(c, X).replace(/^/, c < 0 ? MI : '') + ' dai due lati, si calcola ' + z(a) + 'x ' + pm(-c) + 'x.'));
      traps.push(trap((d + b) / (a - c), 'Erreur de signe avec les nombres : on fait la même opération des deux côtés.', 'Errore di segno con i numeri: si fa la stessa operazione dai due lati.'));
      return { type: T, text: Q(TXT[0], TXT[1], M(e)),
        part: numPart(x0, traps, { fr: 'Regroupe les x à gauche et les nombres à droite, en faisant la même opération des deux côtés.', it: 'Raggruppa le x a sinistra e i numeri a destra, facendo la stessa operazione dai due lati.' },
          calc(pose([e, '⇔ ' + lin(a, 0) + ' ' + (c < 0 ? '+' : MI) + ' ' + mono(c, X) + ' = ' + z(d) + ' ' + pm(-b), '⇔ ' + lin(a - c, 0) + ' = ' + z(d - b)].concat(a - c === 1 ? [] : ['⇔ ' + X + ' = ' + z(x0)])),
            'Vérification : à gauche ' + z(a * x0 + b) + ', à droite ' + z(c * x0 + d) + '.', 'Verifica: a sinistra ' + z(a * x0 + b) + ', a destra ' + z(c * x0 + d) + '.'), XL) };
    }
    if (k === 3){
      /* solution fractionnaire : ax + b = c */
      var n, dn, g;
      do { a = rnd(2, 9); b = rnd(-9, 9); c = nz(-12, 12); n = c - b; g = gcd(n, a) || 1; dn = a / g; n /= g; } while (dn === 1 || n === 0);
      e = lin(a, b) + ' = ' + z(c);
      traps.push(trap([dn * (n < 0 ? -1 : 1), Math.abs(n)], 'Tu as inversé : x = ' + z(c - b) + ' ÷ ' + a + ', donc ' + z(c - b) + ' est en haut.', 'Hai invertito: x = ' + z(c - b) + ' ÷ ' + a + ', quindi ' + z(c - b) + ' sta sopra.'));
      var st = [e];
      if (b) st.push('⇔ ' + lin(a, 0) + ' = ' + z(c - b));
      st.push('⇔ ' + X + ' = ' + (c - b < 0 ? MI : '') + frac(Math.abs(c - b), a));
      if (g !== 1) st.push('⇔ ' + X + ' = ' + (n < 0 ? MI : '') + frac(Math.abs(n), dn));
      return { type: T, text: Q('Résous l’équation. Donne la solution sous forme de fraction irréductible.', 'Risolvi l’equazione. Dai la soluzione come frazione ridotta ai minimi termini.', M(e)),
        part: fillPart(X + ' = {s0}' + frac('{0}', '{1}'), [n, dn], traps, H1, calc(pose(st)), { frac: [[0, 1]] }) };
    }
    var SG = { r: 'mid', msg: { fr: 'Presque : vérifie les signes. Pour chaque facteur, résous « facteur = 0 ». Par exemple, x − 3 = 0 donne x = 3.', it: 'Quasi: controlla i segni. Per ogni fattore risolvi «fattore = 0». Per esempio, x − 3 = 0 dà x = 3.' } };
    var absSame = function(v, r){ var s = function(t){ return t.map(Math.abs).sort(function(u, w){ return u - w; }).join(';'); }; return s(v) === s(r); };
    if (k === 4){
      /* équation produit nul */
      var p, q, kk = pick([1, 1, 2, 3]);
      do { p = nz(-9, 9); q = nz(-9, 9); } while (p === q || p === -q);
      var F1 = '(' + lin(kk, -kk * p) + ')', F2 = '(' + lin(1, -q) + ')', roots = [p, q];
      e = F1 + F2 + ' = 0';
      return { type: T, text: Q(TXT[0], TXT[1], M(e)),
        part: fillPart(X + ' = {±0}' + OU + X + ' = {±1}', roots, [],
          { fr: 'Un produit est nul si l’un de ses facteurs est nul. Résous chaque petite équation : facteur = 0.', it: 'Un prodotto è nullo se uno dei suoi fattori è nullo. Risolvi ogni piccola equazione: fattore = 0.' },
          calc(pose([e, '⇔ ' + lin(kk, -kk * p) + ' = 0' + OU + lin(1, -q) + ' = 0', '⇔ ' + X + ' = ' + z(p) + OU + X + ' = ' + z(q)])),
          { set: true, check: function(v){ return absSame(v, roots) ? SG : null; } }) };
    }
    if (k === 5){
      a = rnd(2, 12);
      e = X + SQ + ' = ' + a * a;
      var rs = [a, -a];
      return { type: T, text: Q(TXT[0], TXT[1], M(e)),
        part: fillPart(X + ' = {±0}' + OU + X + ' = {±1}', rs, [trap([a * a / 2, -a * a / 2], 'x² = ' + a * a + ' ne veut pas dire 2x = ' + a * a + ' : on cherche les nombres dont le carré vaut ' + a * a + '.', 'x² = ' + a * a + ' non vuol dire 2x = ' + a * a + ': si cercano i numeri il cui quadrato vale ' + a * a + '.')],
          { fr: 'Deux nombres ont pour carré ' + a * a + ' : un nombre positif et son opposé.', it: 'Due numeri hanno come quadrato ' + a * a + ': un numero positivo e il suo opposto.' },
          calc(pose([e, '⇔ ' + X + ' = ' + rac(a * a) + OU + X + ' = ' + MI + rac(a * a), '⇔ ' + X + ' = ' + a + OU + X + ' = ' + MI + a])),
          { set: true, check: function(v){ return Math.abs(v[0]) === a && Math.abs(v[1]) === a ? { r: 'mid', msg: { fr: 'Presque : il y a deux solutions différentes, ' + a + ' et son opposé ' + MI + a + '.', it: 'Quasi: ci sono due soluzioni diverse, ' + a + ' e il suo opposto ' + MI + a + '.' } } : null; } }) };
    }
    /* Combien de solutions pour x² = a ? */
    var cas = pick([-1, 0, 1]), val = cas < 0 ? -pick([4, 9, 16, 25, 7]) : cas === 0 ? 0 : pick([4, 9, 16, 25, 7, 10]);
    e = X + SQ + ' = ' + z(val);
    var R = rac(val);
    var FB = [
      cas < 0 ? bi({ fr: 'Un carré n’est jamais négatif : aucun nombre n’a pour carré ' + z(val) + '.', it: 'Un quadrato non è mai negativo: nessun numero ha come quadrato ' + z(val) + '.' }, 'p') : bi({ fr: 'Il y a au moins une solution : ' + (cas === 0 ? '0² = 0.' : pw('(' + R + ')', 2) + ' = ' + val + '.'), it: 'C’è almeno una soluzione: ' + (cas === 0 ? '0² = 0.' : pw('(' + R + ')', 2) + ' = ' + val + '.') }, 'p'),
      cas === 0 ? bi({ fr: 'Seul 0 a pour carré 0.', it: 'Solo 0 ha come quadrato 0.' }, 'p') : cas < 0 ? bi({ fr: 'Aucun nombre réel n’a un carré négatif.', it: 'Nessun numero reale ha un quadrato negativo.' }, 'p') : bi({ fr: 'N’oublie pas l’opposé : ' + R + ' et ' + MI + R + ' ont le même carré.', it: 'Non dimenticare l’opposto: ' + R + ' e ' + MI + R + ' hanno lo stesso quadrato.' }, 'p'),
      cas > 0 ? bi({ fr: 'Les deux solutions sont ' + R + ' et ' + MI + R + (Math.sqrt(val) % 1 === 0 ? ', c’est-à-dire ' + Math.sqrt(val) + ' et ' + MI + Math.sqrt(val) + '.' : '.'), it: 'Le due soluzioni sono ' + R + ' e ' + MI + R + (Math.sqrt(val) % 1 === 0 ? ', cioè ' + Math.sqrt(val) + ' e ' + MI + Math.sqrt(val) + '.' : '.') }, 'p') : cas === 0 ? bi({ fr: '0 et son opposé sont le même nombre : il n’y a qu’une solution.', it: '0 e il suo opposto sono lo stesso numero: c’è una sola soluzione.' }, 'p') : bi({ fr: 'Un carré n’est jamais négatif : il n’y a aucune solution.', it: 'Un quadrato non è mai negativo: non c’è nessuna soluzione.' }, 'p')
    ];
    return { type: T, text: Q('Combien de solutions cette équation a-t-elle ?', 'Quante soluzioni ha questa equazione?', M(e)),
      part: { kind: 'choice', choices: [{ fr: 'Aucune solution', it: 'Nessuna soluzione' }, { fr: 'Une seule solution', it: 'Una sola soluzione' }, { fr: 'Deux solutions', it: 'Due soluzioni' }], correct: cas + 1, fb: FB,
        hint: { fr: 'L’équation ' + M(X + SQ + ' = ' + LA) + ' a deux solutions si ' + M(LA) + ' est positif, une seule si ' + M(LA + ' = 0') + ', aucune si ' + M(LA) + ' est négatif.', it: 'L’equazione ' + M(X + SQ + ' = ' + LA) + ' ha due soluzioni se ' + M(LA) + ' è positivo, una sola se ' + M(LA + ' = 0') + ', nessuna se ' + M(LA) + ' è negativo.' } } };
  }

  /* ---------- Inéquations et intervalles ---------- */
  var SYM = { lt: LT, le: LE, gt: GT, ge: GE }, FLIP = { lt: 'gt', le: 'ge', gt: 'lt', ge: 'le' };
  function ineq(l, s, r){ return l + ' ' + SYM[s] + ' ' + r; }
  /* L'ensemble des solutions de « x s v » sous forme d'intervalle */
  function inter(s, v){
    var V = z(v);
    return s === 'lt' ? ']' + MI + INF + ' ; ' + V + '[' : s === 'le' ? ']' + MI + INF + ' ; ' + V + ']' : s === 'gt' ? ']' + V + ' ; +' + INF + '[' : '[' + V + ' ; +' + INF + '[';
  }
  function choicePart(opts, hint){
    /* opts : [{ h: réponse, ok: vrai ou faux, fr, it }] ; l'ordre est mélangé */
    var o = shuffle(opts.slice()), good = -1;
    o.forEach(function(x, i){ if (x.ok) good = i; });
    return { kind: 'choice', choices: o.map(function(x){ return x.h; }), correct: good, fb: o.map(function(x){ return bi({ fr: x.fr, it: x.it }, 'p'); }), hint: hint };
  }
  function gIneq(){
    var k = rnd(0, 4), a, b, c, v, s, s2, e;
    var T = { fr: 'Inéquations', it: 'Disequazioni' }, TI = { fr: 'Intervalles', it: 'Intervalli' };
    var HN = { fr: 'Isole x comme dans une équation. Attention : si tu multiplies ou divises par un nombre négatif, le sens de l’inégalité change.', it: 'Isola x come in un’equazione. Attenzione: se moltiplichi o dividi per un numero negativo, il verso della disuguaglianza cambia.' };
    if (k === 0 || k === 1 || k === 2){
      do { a = nz(-6, 6); } while (Math.abs(a) === 1);
      v = nz(-9, 9); b = nz(-12, 12); c = a * v + b; s = pick(['lt', 'le', 'gt', 'ge']); s2 = a < 0 ? FLIP[s] : s;
      e = ineq(lin(a, b), s, z(c));
      var okFr = 'On garde les x à gauche : ' + ineq(lin(a, 0), s, z(c - b)) + ', puis on divise par ' + z(a) + (a < 0 ? ', un nombre négatif : le sens change.' : ', un nombre positif : le sens ne change pas.');
      var okIt = 'Si tengono le x a sinistra: ' + ineq(lin(a, 0), s, z(c - b)) + ', poi si divide per ' + z(a) + (a < 0 ? ', un numero negativo: il verso cambia.' : ', un numero positivo: il verso non cambia.');
      var sensFr = a < 0 ? 'Tu as divisé par ' + z(a) + ', un nombre négatif, sans changer le sens de l’inégalité.' : 'Tu as changé le sens de l’inégalité. On ne le change que si on multiplie ou divise par un nombre négatif, et ici on divise par ' + a + '.';
      var sensIt = a < 0 ? 'Hai diviso per ' + z(a) + ', un numero negativo, senza cambiare il verso della disuguaglianza.' : 'Hai cambiato il verso della disuguaglianza. Si cambia solo se si moltiplica o si divide per un numero negativo, e qui si divide per ' + a + '.';
      var sigFr = 'Erreur de signe : ' + z(c - b) + ' ÷ ' + zp(a) + ' = ' + z(v) + '.', sigIt = 'Errore di segno: ' + z(c - b) + ' ÷ ' + zp(a) + ' = ' + z(v) + '.';
      if (k === 2){
        /* les solutions sous forme d'intervalle */
        var wrongSide = FLIP[s2], brk = { lt: 'le', le: 'lt', gt: 'ge', ge: 'gt' };
        var strict = s2 === 'lt' || s2 === 'gt';
        var bFr = strict ? 'L’inégalité est stricte : ' + z(v) + ' n’est pas solution, le crochet est tourné vers l’extérieur.' : 'L’inégalité est large : ' + z(v) + ' est solution, le crochet est tourné vers ' + z(v) + '.';
        var bIt = strict ? 'La disuguaglianza è stretta: ' + z(v) + ' non è soluzione, la parentesi quadra è rivolta verso l’esterno.' : 'La disuguaglianza è larga: ' + z(v) + ' è soluzione, la parentesi quadra è rivolta verso ' + z(v) + '.';
        var sideFr = 'On trouve ' + M(ineq(X, s2, z(v))) + ' : les solutions sont les nombres ' + (s2 === 'lt' || s2 === 'le' ? 'plus petits que ' + z(v) + ', donc du côté de −∞.' : 'plus grands que ' + z(v) + ', donc du côté de +∞.');
        var sideIt = 'Si trova ' + M(ineq(X, s2, z(v))) + ': le soluzioni sono i numeri ' + (s2 === 'lt' || s2 === 'le' ? 'più piccoli di ' + z(v) + ', quindi dalla parte di −∞.' : 'più grandi di ' + z(v) + ', quindi dalla parte di +∞.');
        return { type: T, text: Q('Quel est l’ensemble des solutions de cette inéquation ?', 'Qual è l’insieme delle soluzioni di questa disequazione?', M(e)),
          part: choicePart([
            { h: M(inter(s2, v)), ok: true, fr: okFr + ' On obtient ' + M(ineq(X, s2, z(v))) + '.', it: okIt + ' Si ottiene ' + M(ineq(X, s2, z(v))) + '.' },
            { h: M(inter(brk[s2], v)), fr: bFr, it: bIt },
            { h: M(inter(wrongSide, v)), fr: sideFr, it: sideIt },
            { h: M(inter(brk[wrongSide], v)), fr: sideFr, it: sideIt }
          ], HN) };
      }
      return { type: T, text: Q('Résous l’inéquation : choisis la bonne réponse.', 'Risolvi la disequazione: scegli la risposta giusta.', M(e)),
        part: choicePart([
          { h: M(ineq(X, s2, z(v))), ok: true, fr: okFr, it: okIt },
          { h: M(ineq(X, FLIP[s2], z(v))), fr: sensFr, it: sensIt },
          { h: M(ineq(X, s2, z(-v))), fr: sigFr, it: sigIt },
          { h: M(ineq(X, FLIP[s2], z(-v))), fr: sigFr + ' ' + (a < 0 ? 'Et le sens de l’inégalité change quand on divise par un nombre négatif.' : 'Et le sens de l’inégalité ne change pas quand on divise par un nombre positif.'), it: sigIt + ' ' + (a < 0 ? 'E il verso della disuguaglianza cambia quando si divide per un numero negativo.' : 'E il verso della disuguaglianza non cambia quando si divide per un numero positivo.') }
        ], HN) };
    }
    if (k === 3){
      /* intervalle borné ↔ encadrement */
      do { a = rnd(-9, 8); b = rnd(-8, 9); } while (a >= b);
      var lo = pick(['[', ']']), hi = pick(['[', ']']);       // « [a » : a inclus ; « ]a » : a exclu ; « b] » : b inclus ; « b[ » : b exclu
      var I = function(l, h){ return l + z(a) + ' ; ' + z(b) + h; };
      var E = function(l, h){ return z(a) + ' ' + (l === '[' ? LE : LT) + ' ' + X + ' ' + (h === ']' ? LE : LT) + ' ' + z(b); };
      var ol = lo === '[' ? ']' : '[', oh = hi === ']' ? '[' : ']';
      var RFr = 'Un crochet tourné vers le nombre l’inclut (≤), un crochet tourné vers l’extérieur l’exclut (&lt;).', RIt = 'Una parentesi quadra rivolta verso il numero lo include (≤), una rivolta verso l’esterno lo esclude (&lt;).';
      if (Math.random() < 0.5){
        return { type: TI, text: Q('Que signifie cette appartenance ?', 'Che cosa significa questa appartenenza?', M(X + ' ∈ ' + I(lo, hi))),
          part: choicePart([
            { h: M(E(lo, hi)), ok: true, fr: RFr, it: RIt },
            { h: M(E(ol, hi)), fr: 'Regarde le crochet du côté de ' + z(a) + '. ' + RFr, it: 'Guarda la parentesi dalla parte di ' + z(a) + '. ' + RIt },
            { h: M(E(lo, oh)), fr: 'Regarde le crochet du côté de ' + z(b) + '. ' + RFr, it: 'Guarda la parentesi dalla parte di ' + z(b) + '. ' + RIt },
            { h: M(E(ol, oh)), fr: 'Regarde les deux crochets. ' + RFr, it: 'Guarda le due parentesi. ' + RIt }
          ], { fr: RFr, it: RIt }) };
      }
      return { type: TI, text: Q('Écris cet encadrement avec un intervalle.', 'Scrivi questa doppia disuguaglianza con un intervallo.', M(E(lo, hi))),
        part: choicePart([
          { h: M(X + ' ∈ ' + I(lo, hi)), ok: true, fr: RFr, it: RIt },
          { h: M(X + ' ∈ ' + I(ol, hi)), fr: 'Regarde le symbole du côté de ' + z(a) + '. ' + RFr, it: 'Guarda il simbolo dalla parte di ' + z(a) + '. ' + RIt },
          { h: M(X + ' ∈ ' + I(lo, oh)), fr: 'Regarde le symbole du côté de ' + z(b) + '. ' + RFr, it: 'Guarda il simbolo dalla parte di ' + z(b) + '. ' + RIt },
          { h: M(X + ' ∈ ' + I(ol, oh)), fr: 'Regarde les deux symboles. ' + RFr, it: 'Guarda i due simboli. ' + RIt }
        ], { fr: RFr, it: RIt }) };
    }
    /* Un nombre est-il solution ? */
    a = nz(-5, 6); b = nz(-9, 9); s = pick(['lt', 'le', 'gt', 'ge']);
    var t = nz(-4, 5), lhs = a * t + b, edge = Math.random() < 0.4;
    c = edge ? lhs : lhs + nz(-4, 4);
    var truth = s === 'lt' ? lhs < c : s === 'le' ? lhs <= c : s === 'gt' ? lhs > c : lhs >= c;
    e = ineq(lin(a, b), s, z(c));
    var CAL = M(z(a) + ' × ' + zp(t) + ' ' + pm(b) + ' = ' + z(lhs));
    var conclFr = 'On remplace x par ' + z(t) + ' : ' + CAL + '. ' + (truth ? 'Or ' + M(ineq(z(lhs), s, z(c))) + ' est vrai.' : 'Or ' + M(ineq(z(lhs), s, z(c))) + ' est faux' + (lhs === c ? ' : l’inégalité est stricte.' : '.'));
    var conclIt = 'Si sostituisce x con ' + z(t) + ': ' + CAL + '. ' + (truth ? 'E ' + M(ineq(z(lhs), s, z(c))) + ' è vero.' : 'E ' + M(ineq(z(lhs), s, z(c))) + ' è falso' + (lhs === c ? ': la disuguaglianza è stretta.' : '.'));
    return { type: T, text: Q('Le nombre ' + M(z(t)) + ' est-il solution de cette inéquation ?', 'Il numero ' + M(z(t)) + ' è soluzione di questa disequazione?', M(e)),
      part: { kind: 'choice', choices: [{ fr: 'Oui', it: 'Sì' }, { fr: 'Non', it: 'No' }], correct: truth ? 0 : 1,
        fb: [bi({ fr: conclFr, it: conclIt }, 'p'), bi({ fr: conclFr, it: conclIt }, 'p')],
        hint: { fr: 'Remplace x par ' + z(t) + ', calcule le membre de gauche, puis regarde si l’inégalité est vraie.', it: 'Sostituisci x con ' + z(t) + ', calcola il membro di sinistra, poi guarda se la disuguaglianza è vera.' } } };
  }

  var GEN = {
    calc: function(){ return pick([gPrio, gSubst, gPuiss, gPuiss, gFrac, gFrac, gSci])(); },
    rac: gRac, dev: gDev, fact: gFact, eq: gEq, ineq: gIneq
  };

  /* ---------- Contrôle blanc : questions à choix (la première réponse est la bonne, l'ordre est mélangé à l'affichage) ---------- */
  var TQ = [
    function(){
      var a = rnd(2, 9), b = rnd(2, 9), c = rnd(2, 9), e = a + ' + ' + b + ' × ' + c;
      return qcm(M(e) + ' est égal à :', M(e) + ' è uguale a:', [M(a + b * c), M((a + b) * c), M(a * b + c), M(a + b + c)],
        { fr: 'La multiplication passe avant l’addition.', it: 'La moltiplicazione viene prima dell’addizione.', calc: calc(pose([e, '= ' + a + ' + ' + b * c, '= ' + (a + b * c)])) });
    },
    function(){
      var a = pick([2, 3, 5, 7, 10]), m, n;
      do { m = rnd(2, 7); n = rnd(2, 7); } while (m === n || m + n === m * n);
      var e = pw(a, m) + ' × ' + pw(a, n);
      return qcm(M(e) + ' est égal à :', M(e) + ' è uguale a:', [M(pw(a, m + n)), M(pw(a, m * n)), M(pw(2 * a, m + n)), M(pw(a * a, m * n))],
        { fr: 'Même nombre, produit : on additionne les exposants.', it: 'Stesso numero, prodotto: si sommano gli esponenti.', calc: calc(pose([e, '= ' + pw(a, m + ' + ' + n), '= ' + pw(a, m + n)])) });
    },
    function(){
      var a, b, c, d, n, dn, g;
      do { b = pick([2, 3, 4, 5, 6]); d = pick([2, 3, 4, 5, 6]); a = rnd(1, 5); c = rnd(1, 5); n = a * d + c * b; dn = b * d; g = gcd(n, dn); n /= g; dn /= g; }
      while (b === d || gcd(a, b) !== 1 || gcd(c, d) !== 1 || dn === 1 || (a + c) * dn === n * (b + d));
      var e = frac(a, b) + ' + ' + frac(c, d), l = b * d / gcd(b, d);
      return qcm(M(e) + ' est égal à :', M(e) + ' è uguale a:', [M(frac(n, dn)), M(frac(a + c, b + d)), M(frac(a + c, b * d)), M(frac(a * c, b * d))],
        { fr: 'On met les deux fractions au même dénominateur, ' + l + '. On n’additionne jamais les dénominateurs.', it: 'Si portano le due frazioni allo stesso denominatore, ' + l + '. I denominatori non si sommano mai.',
          calc: calc(pose([e, '= ' + frac(a * l / b, l) + ' + ' + frac(c * l / d, l), '= ' + frac(a * l / b + c * l / d, l)].concat(a * l / b + c * l / d !== n ? ['= ' + frac(n, dn)] : []))) });
    },
    function(){
      var a, m, n;
      do { a = pick([2, 3, 4, 5, 6]); m = pick([2, 3, 5, 6, 7]); n = a * a * m; } while (a === m || n > 300);
      return qcm(M(rac(n)) + ' est égal à :', M(rac(n)) + ' è uguale a:', [M(a + rac(m)), M(m + rac(a)), M(a * a + rac(m)), M(a + rac(2 * m))],
        { fr: 'On fait apparaître le carré ' + a * a + ' sous la racine, car ' + M(rac(a * a) + ' = ' + a) + '.', it: 'Si fa comparire il quadrato ' + a * a + ' sotto la radice, perché ' + M(rac(a * a) + ' = ' + a) + '.',
          calc: calc(pose([rac(n), '= ' + rac(a * a + ' × ' + m), '= ' + rac(a * a) + ' × ' + rac(m), '= ' + a + rac(m)])) });
    },
    function(){
      var kk = pick([2, 3, 4, 5, -2, -3, -4]), a = rnd(2, 5), b = nz(-7, 7), e = z(kk) + '(' + lin(a, b) + ')';
      return qcm(M(e) + ' est égal à :', M(e) + ' è uguale a:', [M(lin(kk * a, kk * b)), M(lin(kk * a, b)), M(lin(kk * a, -kk * b)), M(lin(kk + a, kk * b))],
        { fr: 'Le facteur ' + z(kk) + ' multiplie chaque terme : ' + M(z(kk) + ' × ' + a + X + ' = ' + z(kk * a) + X) + ' et ' + M(z(kk) + ' × ' + zp(b) + ' = ' + z(kk * b)) + '.', it: 'Il fattore ' + z(kk) + ' moltiplica ogni termine: ' + M(z(kk) + ' × ' + a + X + ' = ' + z(kk * a) + X) + ' e ' + M(z(kk) + ' × ' + zp(b) + ' = ' + z(kk * b)) + '.' });
    },
    function(){
      var a = rnd(3, 9), s = pick([1, -1]), e = '(' + lin(1, s * a) + ')' + SQ;
      return qcm(M(e) + ' est égal à :', M(e) + ' è uguale a:', [M(quad(1, 2 * s * a, a * a)), M(quad(1, 0, a * a)), M(quad(1, s * a, a * a)), M(quad(1, 2 * s * a, -a * a))],
        { fr: 'Identité remarquable : le double produit vaut ' + M('2 × ' + X + ' × ' + a + ' = ' + 2 * a + X) + ' et ' + M(a + '² = ' + a * a) + '.', it: 'Prodotto notevole: il doppio prodotto vale ' + M('2 × ' + X + ' × ' + a + ' = ' + 2 * a + X) + ' e ' + M(a + '² = ' + a * a) + '.' });
    },
    function(){
      var a = rnd(3, 12), e = X + SQ + ' − ' + a * a;
      return qcm('La forme factorisée de ' + M(e) + ' est :', 'La forma scomposta di ' + M(e) + ' è:', [M('(' + lin(1, -a) + ')(' + lin(1, a) + ')'), M('(' + lin(1, -a) + ')' + SQ), M('(' + lin(1, -a * a) + ')(' + lin(1, 1) + ')'), M(X + '(' + lin(1, -a * a) + ')')],
        { fr: 'C’est une différence de deux carrés.', it: 'È una differenza di due quadrati.', calc: calc(pose([e, '= ' + X + SQ + ' − ' + pw(a, 2), '= (' + lin(1, -a) + ')(' + lin(1, a) + ')'])) });
    },
    function(){
      var a, c, x0, b, d;
      do { a = rnd(2, 8); c = rnd(1, 7); x0 = nz(-6, 6); b = nz(-9, 9); d = (a - c) * x0 + b; } while (a === c || d === 0 || Math.abs(x0) === 1 || (d + b) % (a - c) !== 0 || (d + b) / (a - c) === -x0 || (d + b) / (a - c) === x0);
      var e = lin(a, b) + ' = ' + lin(c, d);
      return qcm('La solution de l’équation ' + M(e) + ' est :', 'La soluzione dell’equazione ' + M(e) + ' è:', [M(z(x0)), M(z(-x0)), M(z((d + b) / (a - c))), M(z(x0 + (x0 > 0 ? 1 : -1)))],
        { fr: M(lin(a - c, 0) + ' = ' + z(d - b)) + ', donc ' + M(X + ' = ' + z(x0)) + '. Vérification : ' + z(a * x0 + b) + ' des deux côtés.', it: M(lin(a - c, 0) + ' = ' + z(d - b)) + ', quindi ' + M(X + ' = ' + z(x0)) + '. Verifica: ' + z(a * x0 + b) + ' dai due lati.' });
    },
    function(){
      var p, q;
      do { p = rnd(1, 9); q = rnd(1, 9); } while (p === q);
      var e = '(' + lin(1, -p) + ')(' + lin(1, q) + ') = 0';
      function O(u, w){ return { fr: M(z(u)) + ' et ' + M(z(w)), it: M(z(u)) + ' e ' + M(z(w)) }; }
      return qcm('Les solutions de l’équation ' + M(e) + ' sont :', 'Le soluzioni dell’equazione ' + M(e) + ' sono:', [O(p, -q), O(-p, q), O(p, q), O(-p, -q)],
        { fr: 'Un produit est nul si l’un des facteurs est nul : ' + M(lin(1, -p) + ' = 0') + ' donne ' + M(X + ' = ' + p) + ', et ' + M(lin(1, q) + ' = 0') + ' donne ' + M(X + ' = ' + z(-q)) + '.', it: 'Un prodotto è nullo se uno dei fattori è nullo: ' + M(lin(1, -p) + ' = 0') + ' dà ' + M(X + ' = ' + p) + ', e ' + M(lin(1, q) + ' = 0') + ' dà ' + M(X + ' = ' + z(-q)) + '.' });
    },
    function(){
      var a = -rnd(2, 6), v = nz(-8, 8), b = nz(-9, 9), c = a * v + b, s = pick(['lt', 'gt', 'le', 'ge']), s2 = FLIP[s], e = ineq(lin(a, b), s, z(c));
      return qcm('L’inéquation ' + M(e) + ' équivaut à :', 'La disequazione ' + M(e) + ' equivale a:', [M(ineq(X, s2, z(v))), M(ineq(X, s, z(v))), M(ineq(X, s2, z(-v))), M(ineq(X, s, z(-v)))],
        { fr: M(ineq(lin(a, 0), s, z(c - b))) + ', puis on divise par ' + z(a) + ', un nombre négatif : le sens change. On obtient ' + M(ineq(X, s2, z(v))) + '.', it: M(ineq(lin(a, 0), s, z(c - b))) + ', poi si divide per ' + z(a) + ', un numero negativo: il verso cambia. Si ottiene ' + M(ineq(X, s2, z(v))) + '.' });
    },
    function(){
      var v = nz(-9, 9), s = pick(['lt', 'le', 'gt', 'ge']), brk = { lt: 'le', le: 'lt', gt: 'ge', ge: 'gt' }, e = ineq(X, s, z(v));
      var strict = s === 'lt' || s === 'gt';
      return qcm('L’inégalité ' + M(e) + ' s’écrit aussi :', 'La disuguaglianza ' + M(e) + ' si scrive anche:', [M(X + ' ∈ ' + inter(s, v)), M(X + ' ∈ ' + inter(brk[s], v)), M(X + ' ∈ ' + inter(FLIP[s], v)), M(X + ' ∈ ' + inter(brk[FLIP[s]], v))],
        { fr: 'Les nombres ' + (s === 'lt' || s === 'le' ? 'plus petits' : 'plus grands') + ' que ' + z(v) + ' : du côté de ' + (s === 'lt' || s === 'le' ? '−∞' : '+∞') + '. ' + (strict ? 'Inégalité stricte : ' + z(v) + ' est exclu, crochet vers l’extérieur.' : 'Inégalité large : ' + z(v) + ' est inclus, crochet vers le nombre.'), it: 'I numeri ' + (s === 'lt' || s === 'le' ? 'più piccoli' : 'più grandi') + ' di ' + z(v) + ': dalla parte di ' + (s === 'lt' || s === 'le' ? '−∞' : '+∞') + '. ' + (strict ? 'Disuguaglianza stretta: ' + z(v) + ' è escluso, parentesi verso l’esterno.' : 'Disuguaglianza larga: ' + z(v) + ' è incluso, parentesi verso il numero.') });
    },
    function(){
      var xv = -rnd(2, 5), a = rnd(2, 4), b = nz(-9, 9), e = poly([[a, X + SQ], [b, '']]), ans = a * xv * xv + b;
      var XV = M(X + ' = ' + z(xv));
      return qcm('Pour ' + XV + ', l’expression ' + M(e) + ' vaut :', 'Per ' + XV + ', l’espressione ' + M(e) + ' vale:', [M(z(ans)), M(z(-a * xv * xv + b)), M(z(a * xv * a * xv + b)), M(z(2 * a * xv + b))],
        { fr: 'On remplace x par ' + z(xv) + ', entre parenthèses. Le carré d’un nombre négatif est positif.', it: 'Si sostituisce x con ' + z(xv) + ', tra parentesi. Il quadrato di un numero negativo è positivo.',
          calc: calc(pose([a + ' × ' + pw('(' + z(xv) + ')', 2) + ' ' + pm(b), '= ' + a + ' × ' + xv * xv + ' ' + pm(b), '= ' + z(a * xv * xv) + ' ' + pm(b), '= ' + z(ans)])) });
    },
    function(){
      var p, q, r, s;
      do { p = rnd(2, 12); q = rnd(1, 4); r = rnd(2, 9); s = rnd(1, 9); } while (q === r || p === s || q + r === q - r);
      var e = poly([[p, ''], [q, X]]) + ' − (' + lin(r, -s) + ')';
      return qcm(M(e) + ' est égal à :', M(e) + ' è uguale a:', [M(poly([[p + s, ''], [q - r, X]])), M(poly([[p - s, ''], [q - r, X]])), M(poly([[p + s, ''], [q + r, X]])), M(poly([[p - s, ''], [q + r, X]]))],
        { fr: 'Le signe « − » change tous les signes de la parenthèse.', it: 'Il segno «−» cambia tutti i segni della parentesi.', calc: calc(pose([e, '= ' + poly([[p, ''], [q, X], [-r, X], [s, '']]), '= ' + poly([[p + s, ''], [q - r, X]])])) });
    }
  ];

  CHAPS.push({
    id: 'c3', num: 3, sym: '<span class="m"><i>x</i></span>',
    title: { fr: 'Calcul littéral', it: 'Calcolo letterale' },
    short: { fr: 'Calcul littéral', it: 'Calcolo letterale' },
    sub: { fr: 'Fractions, puissances, racines, développer, factoriser, équations, inéquations', it: 'Frazioni, potenze, radici, sviluppare, scomporre, equazioni, disequazioni' },
    groups: [
      { k: 'cahier', fr: 'Ton cahier : le test de prérequis', it: 'Il tuo quaderno: il test dei prerequisiti', chip: { fr: 'Cahier', it: 'Quaderno' } },
      { k: 'calc', fr: 'Priorités, fractions et puissances', it: 'Ordine delle operazioni, frazioni e potenze', chip: { fr: 'Calculs', it: 'Calcoli' } },
      { k: 'rac', fr: 'Racines carrées', it: 'Radici quadrate', chip: { fr: 'Racines', it: 'Radici' } },
      { k: 'expr', fr: 'Développer, réduire, factoriser', it: 'Sviluppare, ridurre, scomporre', chip: { fr: 'Développer', it: 'Sviluppare' } },
      { k: 'eq', fr: 'Équations', it: 'Equazioni', chip: { fr: 'Équations', it: 'Equazioni' } },
      { k: 'ineq', fr: 'Intervalles, inégalités, inéquations', it: 'Intervalli, disuguaglianze, disequazioni', chip: { fr: 'Inéquations', it: 'Disequazioni' } },
      { k: 'dem', fr: 'Démontrer et comparer', it: 'Dimostrare e confrontare', chip: { fr: 'Démontrer', it: 'Dimostrare' } },
      { k: 'eval', fr: 'Je me prépare à l’évaluation', it: 'Mi preparo alla verifica', chip: { fr: 'Évaluation', it: 'Verifica' } }
    ],
    exLead: {
      fr: 'Fais chaque exercice sur ton cahier, puis compare avec la solution. Pour les QCM, touche ta réponse. Si tu bloques : l’indice.',
      it: 'Fai ogni esercizio sul quaderno, poi confronta con la soluzione. Per i quiz, tocca la tua risposta. Se ti blocchi: l’indizio.'
    },
    modes: [
      { k: 'calc', fr: 'Calculs', it: 'Calcoli' },
      { k: 'rac', fr: 'Racines', it: 'Radici' },
      { k: 'dev', fr: 'Développer', it: 'Sviluppare' },
      { k: 'fact', fr: 'Factoriser', it: 'Scomporre' },
      { k: 'eq', fr: 'Équations', it: 'Equazioni' },
      { k: 'ineq', fr: 'Inéquations', it: 'Disequazioni' }
    ],
    mix: ['calc', 'calc', 'rac', 'dev', 'dev', 'fact', 'eq', 'eq', 'ineq'],
    gen: GEN, tq: TQ,
    low: { fr: 'Courage ! Relis le cours (parties 3 à 7), puis recommence.', it: 'Coraggio! Rileggi la lezione (parti da 3 a 7), poi ricomincia.' },
    dit: [
      ['Une lettre, c’est un nombre qui se cache.', 'Una lettera è un numero che si nasconde.'],
      ['Un signe − devant une parenthèse change tous les signes à l’intérieur.', 'Un segno − davanti a una parentesi cambia tutti i segni all’interno.'],
      ['(a + b)², ce n’est pas a² + b² : n’oublie pas le double produit !', '(a + b)² non è a² + b²: non dimenticare il doppio prodotto!'],
      ['Quand on divise une inégalité par un nombre négatif, on change le sens.', 'Quando si divide una disuguaglianza per un numero negativo, si cambia il verso.']
    ]
  });
  })();
