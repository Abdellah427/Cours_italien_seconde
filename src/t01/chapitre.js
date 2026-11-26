  /* 3e, calculs : priorités et parenthèses, fractions, puissances de 10. Chapitre écrit en français seulement.
     Les pièges visent trois erreurs : se tromper d'opération (appliquer la règle d'une autre), oublier les priorités, oublier les parenthèses. */
  (function(){
  /* ---------- Écriture des formules ---------- */
  function M(h){ return '<span class="m nw">' + h + '</span>'; }
  function frac(a, b){ return '<span class="frac"><span>' + a + '</span><span>' + b + '</span></span>'; }
  function gp(h){ return '<span class="bp">(</span>' + h + '<span class="bp">)</span>'; }      // grandes parenthèses autour d'une fraction
  function pri(h){ return '<span class="prem">' + h + '</span>'; }                              // souligné : ce que l'on calcule en premier
  function pw(a, n){ return a + '<sup>' + n + '</sup>'; }
  function z(n){ return n < 0 ? MI + num(-n, 8) : num(n, 8); }
  function zp(n){ return n < 0 ? '(' + z(n) + ')' : z(n); }
  function gcd(a, b){ a = Math.abs(a); b = Math.abs(b); while (b){ var t = a % b; a = b; b = t; } return a; }
  /* Une idée par ligne : chaque phrase commence sur sa ligne (consigne, indice, message d'une erreur reconnue, commentaire d'une solution) */
  function ph(t){ return String(t).replace(/([.!?…](?:<\/b>)?) (?=[A-ZÀ-ÖØ-Þ«(\d]|<b>|<span class="m)/g, '$1<br>'); }
  function P(t){ return '<p>' + typo(ph(t), true) + '</p>'; }
  function Q(t, math){ return P(t) + (math ? '<p class="mq">' + math + '</p>' : ''); }
  /* Calcul posé : une étape par ligne, les signes « = » alignés */
  function rg(l, r, res){ return '<span class="cl"></span><span class="cg m">' + l + '</span><span class="cd m' + (res ? ' res' : '') + '">' + r + '</span>'; }
  function rge(x, res){ return '<span class="cl"></span><span class="ce m' + (res ? ' res' : '') + '">' + x + '</span>'; }
  function lg(s){
    return s.replace(/<span class="frac"><span>([^<]*)<\/span><span>([^<]*)<\/span><\/span>/g, function(m, a, b){ return a.length > b.length ? a : b; })
      .replace(/<sup>[^<]*<\/sup>/g, '.').replace(/<[^>]+>/g, '').length;
  }
  function pose(st){
    var e = st[0], suite = st.slice(1), n = suite.length, large = Math.max.apply(null, suite.map(lg));
    if (lg(e) <= 12 && lg(e) + large <= 26) return '<div class="calc">' + suite.map(function(s, i){ return rg(i ? '' : e, s, i === n - 1); }).join('') + '</div>';
    return '<div class="calc">' + rge(e) + suite.map(function(s, i){ return rge(s, i === n - 1); }).join('') + '</div>';
  }
  /* Le même calcul rédigé comme sur la copie : le nom de l'expression recopié à chaque ligne */
  function poseA(st, fin){ return '<div class="calc">' + st.map(function(s, i){ return rg('<i>A</i>', '= ' + s, fin && i === st.length - 1); }).join('') + '</div>'; }

  /* ---------- Fractions (numérateur, dénominateur) ---------- */
  function R(n, d){ if (d < 0){ n = -n; d = -d; } var g = gcd(n, d) || 1; return [n / g, d / g]; }
  function fadd(a, b){ return R(a[0] * b[1] + b[0] * a[1], a[1] * b[1]); }
  function fsub(a, b){ return R(a[0] * b[1] - b[0] * a[1], a[1] * b[1]); }
  function fmul(a, b){ return R(a[0] * b[0], a[1] * b[1]); }
  function fdiv(a, b){ return R(a[0] * b[1], a[1] * b[0]); }
  function Hb(n, d){ return (n < 0 ? MI : '') + frac(Math.abs(n), d); }                          // fraction telle quelle
  function H(f){ return f[1] === 1 ? z(f[0]) : Hb(f[0], f[1]); }                                // fraction réduite, ou entier
  function ppcm(a, b){ return a * b / gcd(a, b); }
  var PETITES = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 6], [5, 6]];

  /* ---------- Questions ---------- */
  var PLAIN = 'Presque : le nombre est bon, mais vérifie le signe.';
  var LABS = 'Complète les cases.<br>Touche + ou − pour changer un signe.', LAB = 'Complète les cases.';
  var ORDRE = 'Ordre des calculs : les parenthèses, puis les puissances, puis × et ÷, enfin + et −. À égalité : de gauche à droite.';
  function trap(v, fr){ return { v: v, fr: ph(fr) }; }
  function numPart(ans, traps, hint, sol, label){
    var out = [];
    (traps || []).forEach(function(t){ if (isFinite(t.v) && Math.abs(t.v - ans) > 1e-9 && !out.some(function(o){ return Math.abs(o.v - t.v) < 1e-9; })) out.push(t); });
    return { kind: 'num', label: label || 'Résultat', unit: '', ans: ans, tol: 0, sign: 'strict', pm: true, signMsg: PLAIN, traps: out, hint: ph(hint), sol: sol };
  }
  function fillPart(tpl, ans, traps, hint, sol, more){
    var out = [], k;
    (traps || []).forEach(function(t){
      if (t.v.some(function(x){ return x != null && !isFinite(x); })) return;
      if (t.v.every(function(x, i){ return x == null || x === ans[i]; })) return;
      if (!out.some(function(o){ return JSON.stringify(o.v) === JSON.stringify(t.v); })) out.push(t);
    });
    var p = { kind: 'fill', label: /\{(s|±)\d/.test(tpl) ? LABS : LAB, tpl: tpl, ans: ans, traps: out, hint: ph(hint), sol: sol };
    if (more) for (k in more) p[k] = more[k];
    return p;
  }
  /* Réponse : une fraction irréductible. Un piège est donné par sa valeur : il est reconnu sous sa forme réduite et sous la forme écrite par l'élève. */
  function fracPart(f, traps, hint, sol){
    var t = [];
    (traps || []).forEach(function(x){
      var r = R(x.v[0], x.v[1]);
      if (r[0] === f[0] && r[1] === f[1]) return;
      t.push(trap(r, x.fr)); t.push(trap([x.v[0], x.v[1]], x.fr));
    });
    return fillPart('= {s0}' + frac('{0}', '{1}'), [f[0], f[1]], t, hint, sol, { frac: [[0, 1]] });
  }

  /* ---------- Priorités et parenthèses ---------- */
  var GD = 'Même priorité : on calcule de gauche à droite.';
  function gPrio(){
    var k = rnd(0, 8), a, b, c, d, q, p, e, ans, traps = [], st, regle;
    if (k === 0){
      b = rnd(2, 9); c = rnd(2, 9); a = b + c + rnd(1, 15); e = a + ' − ' + b + ' − ' + c; ans = a - b - c;
      traps.push(trap(a - (b - c), 'Tu as calculé ' + b + ' − ' + c + ' en premier. ' + GD));
      st = [pri(a + ' − ' + b) + ' − ' + c, '= ' + (a - b) + ' − ' + c, '= ' + z(ans)]; regle = GD;
    } else if (k === 1){
      b = rnd(2, 6); q = rnd(2, 9); c = rnd(2, 5); a = b * q; e = a + ' ÷ ' + b + ' × ' + c; ans = q * c;
      traps.push(trap(a / (b * c), 'Tu as calculé ' + b + ' × ' + c + ' en premier. La division et la multiplication ont la même priorité : de gauche à droite.'));
      st = [pri(a + ' ÷ ' + b) + ' × ' + c, '= ' + q + ' × ' + c, '= ' + ans]; regle = GD;
    } else if (k === 2){
      a = rnd(2, 9); b = rnd(2, 9); c = rnd(2, 9); e = a + ' + ' + b + ' × ' + c; ans = a + b * c;
      traps.push(trap((a + b) * c, 'Tu as fait l’addition en premier. La multiplication passe avant l’addition.'));
      st = [a + ' + ' + pri(b + ' × ' + c), '= ' + a + ' + ' + b * c, '= ' + ans]; regle = 'La multiplication passe avant l’addition.';
    } else if (k === 3){
      a = rnd(2, 9); b = rnd(2, 9); c = rnd(2, 9); e = '(' + a + ' + ' + b + ') × ' + c; ans = (a + b) * c;
      traps.push(trap(a + b * c, 'Tu as fait la multiplication en premier. Ici il y a des parenthèses : on les calcule d’abord.'));
      st = [pri('(' + a + ' + ' + b + ')') + ' × ' + c, '= ' + (a + b) + ' × ' + c, '= ' + ans]; regle = 'La parenthèse d’abord.';
    } else if (k === 4){
      a = rnd(2, 5); b = rnd(2, 5); e = a + ' × ' + pw(b, 2); ans = a * b * b;
      traps.push(trap(a * b * a * b, 'Tu as fait la multiplication en premier. La puissance passe avant : calcule ' + b + '² d’abord.'));
      traps.push(trap(a * 2 * b, 'Attention à la puissance : ' + b + '², c’est ' + b + ' × ' + b + ', pas ' + b + ' × 2.'));
      st = [a + ' × ' + pri(pw(b, 2)), '= ' + a + ' × ' + b * b, '= ' + ans]; regle = 'La puissance passe avant la multiplication.';
    } else if (k === 5){
      a = rnd(2, 4); b = rnd(2, 4); e = pw('(' + a + ' × ' + b + ')', 2); ans = a * b * a * b;
      traps.push(trap(a * b * b, 'Tu as calculé la puissance en premier. Ici la parenthèse passe avant.'));
      traps.push(trap(a * b * 2, 'Attention à la puissance : ' + a * b + '², c’est ' + a * b + ' × ' + a * b + ', pas ' + a * b + ' × 2.'));
      st = [pw(pri('(' + a + ' × ' + b + ')'), 2), '= ' + pw(a * b, 2), '= ' + ans]; regle = 'La parenthèse d’abord.';
    } else if (k === 6){
      a = rnd(2, 9); b = rnd(2, 5); c = rnd(1, 5); d = c + rnd(1, 4); p = c - d; e = a + ' − ' + b + ' × (' + c + ' − ' + d + ')'; ans = a - b * p;
      traps.push(trap(a + b * p, 'Attention aux signes : ' + b + ' × (' + z(p) + ') = ' + z(b * p) + ', et soustraire ' + z(b * p) + ', c’est ajouter ' + (-b * p) + '.'));
      traps.push(trap((a - b) * p, 'Tu as calculé ' + a + ' − ' + b + ' en premier. La multiplication passe avant la soustraction.'));
      st = [a + ' − ' + b + ' × ' + pri('(' + c + ' − ' + d + ')'), '= ' + a + ' − ' + pri(b + ' × (' + z(p) + ')'), '= ' + a + ' − (' + z(b * p) + ')', '= ' + a + ' + ' + (-b * p), '= ' + ans];
      regle = 'La parenthèse, puis la multiplication, puis la soustraction. Soustraire un nombre négatif, c’est ajouter son opposé.';
    } else if (k === 7){
      c = rnd(1, 6); b = c + rnd(1, 6); a = b + rnd(1, 12); e = a + ' − (' + b + ' − ' + c + ')'; ans = a - (b - c);
      traps.push(trap(a - b - c, 'Tu as enlevé la parenthèse sans changer les signes à l’intérieur. Calcule d’abord la parenthèse.'));
      st = [a + ' − ' + pri('(' + b + ' − ' + c + ')'), '= ' + a + ' − ' + (b - c), '= ' + ans]; regle = 'La parenthèse d’abord.';
    } else {
      b = rnd(2, 5); c = rnd(2, 5); a = b * c + rnd(-3, 9); d = rnd(1, 9); e = a + ' − ' + b + ' × ' + c + ' + ' + d; ans = a - b * c + d;
      traps.push(trap((a - b) * c + d, 'Tu as calculé ' + a + ' − ' + b + ' en premier. La multiplication passe avant la soustraction.'));
      traps.push(trap(a - b * (c + d), 'Il n’y a pas de parenthèses autour de ' + c + ' + ' + d + ' : la multiplication d’abord, puis de gauche à droite.'));
      traps.push(trap(a - (b * c + d), 'Après la multiplication, on calcule de gauche à droite : la soustraction d’abord.'));
      st = [a + ' − ' + pri(b + ' × ' + c) + ' + ' + d, '= ' + pri(a + ' − ' + b * c) + ' + ' + d, '= ' + z(a - b * c) + ' + ' + d, '= ' + z(ans)];
      regle = 'La multiplication d’abord. Ensuite − et + ont la même priorité : de gauche à droite.';
    }
    return { type: 'Priorités', text: Q('Souligne ce que tu calcules en premier, puis calcule.', M(e)), part: numPart(ans, traps, ORDRE, pose(st) + P(regle)) };
  }

  /* ---------- Somme, différence, produit ou quotient ? ---------- */
  var NAT = ['une somme', 'une différence', 'un produit', 'un quotient'], OPN = ['une addition', 'une soustraction', 'une multiplication', 'une division'];
  function natPart(premier, natp, bon){
    var fb = NAT.map(function(x, k){
      if (k === bon) return P('Je fais en premier : ' + premier + '. La dernière opération est ' + OPN[bon] + ' : c’est <b>' + NAT[bon] + '</b>.');
      if (k === natp) return P('Tu as regardé l’opération que l’on fait <b>en premier</b>. C’est la <b>dernière</b> opération qui donne la nature du calcul.');
      return P('Cherche d’abord ce que tu calcules en premier. L’opération qui reste à la fin donne la nature du calcul.');
    });
    return { kind: 'choice', choices: NAT, correct: bon, fb: fb };
  }
  function natExpr(){
    var k = rnd(0, 9), a = rnd(2, 9), b = rnd(2, 9), c = rnd(2, 9), f1, f2, m, n;
    do { f1 = pick(PETITES); f2 = pick(PETITES); } while (f1 === f2);
    var F1 = frac(f1[0], f1[1]), F2 = frac(f2[0], f2[1]);
    if (k === 0) return [a + ' + ' + b + ' × ' + c, M(b + ' × ' + c), 2, 0];
    if (k === 1) return ['(' + a + ' + ' + b + ') × ' + c, M(a + ' + ' + b), 0, 2];
    if (k === 2) return [a + b * c + ' − ' + b * c + ' ÷ ' + c, M(b * c + ' ÷ ' + c), 3, 1];
    if (k === 3) return ['(' + (a + b * c) + ' − ' + a + ') ÷ ' + c, M((a + b * c) + ' − ' + a), 1, 3];
    if (k === 4) return [F1 + ' − ' + F2 + ' × ' + c, M(F2 + ' × ' + c), 2, 1];
    if (k === 5) return [gp(F1 + ' + ' + F2) + ' × ' + c, M(F1 + ' + ' + F2), 0, 2];
    if (k === 6){ m = rnd(2, 5); do { n = rnd(2, 5); } while (n === m); return [a + ' × ' + pw(10, m) + ' + ' + b + ' × ' + pw(10, n), 'les puissances, puis les deux produits', 2, 0]; }
    if (k === 7) return [(a * a + b) + ' − ' + pw(a, 2), M(pw(a, 2)), -1, 1];
    if (k === 8) return [a + ' × ' + b + ' − ' + c, M(a + ' × ' + b), 2, 1];
    return [a * (b + c) + ' ÷ (' + b + ' + ' + c + ')', M(b + ' + ' + c), 0, 3];
  }
  function gNat(){
    var x = natExpr();
    return { type: 'Somme ou produit ?', text: Q('Sans calculer : ce calcul est…', M(x[0])), part: natPart(x[1], x[2], x[3]) };
  }

  /* ---------- Fractions : la bonne règle pour la bonne opération ---------- */
  var NOM = { '+': 'une addition', '−': 'une soustraction', '×': 'une multiplication', '÷': 'une division' };
  function gFrac(){
    var op = pick(['+', '+', MI, MI, '×', '÷']), f1, f2, r, a, b, c, d, traps = [], st, phrase, hint;
    do {
      f1 = pick(PETITES); f2 = pick(PETITES);
      r = op === '+' ? fadd(f1, f2) : op === MI ? fsub(f1, f2) : op === '×' ? fmul(f1, f2) : fdiv(f1, f2);
    } while (r[1] === 1 || r[0] === 0 || (f1 === f2) || r[1] > 60 || Math.abs(r[0]) > 60);
    a = f1[0]; b = f1[1]; c = f2[0]; d = f2[1];
    var F1 = frac(a, b), F2 = frac(c, d), e = F1 + ' ' + op + ' ' + F2, AUTRE = 'Regarde le signe avant de choisir la règle : c’est ' + NOM[op] + '.';
    if (op === '+' || op === MI){
      var l = ppcm(b, d), k1 = l / b, k2 = l / d, a2 = a * k1, c2 = c * k2, s = op === '+' ? a2 + c2 : a2 - c2;
      phrase = 'C’est ' + NOM[op] + ' : il faut <b>le même dénominateur</b>' + (b === d ? ' (c’est déjà le cas).' : ' (' + l + ').');
      hint = 'Regarde le signe : c’est ' + NOM[op] + '. Il faut d’abord le même dénominateur.';
      if (b !== d) traps.push(trap(op === '+' ? [a + c, b + d] : [a - c, b - d], 'On n’additionne pas et on ne soustrait pas les dénominateurs : il faut d’abord le même dénominateur.'));
      traps.push(trap([a * c, b * d], 'Tu as appliqué la règle de la multiplication. ' + AUTRE));
      st = [e];
      if (b !== d) st.push('= ' + (k1 > 1 ? frac(a + ' × ' + k1, b + ' × ' + k1) : F1) + ' ' + op + ' ' + (k2 > 1 ? frac(c + ' × ' + k2, d + ' × ' + k2) : F2), '= ' + frac(a2, l) + ' ' + op + ' ' + frac(c2, l));
      st.push('= ' + Hb(s, l));
      if (Math.abs(s) !== Math.abs(r[0])) st.push('= ' + H(r));
    } else if (op === '×'){
      phrase = 'C’est une multiplication : numérateur fois numérateur, dénominateur fois dénominateur.';
      hint = 'Regarde le signe : c’est une multiplication. Pas besoin du même dénominateur.';
      traps.push(trap(fadd(f1, f2), 'Tu as additionné les deux fractions. ' + AUTRE));
      traps.push(trap([a * d, b * c], 'Tu as retourné la deuxième fraction : c’est la règle de la division. Ici on multiplie directement.'));
      st = [e, '= ' + frac(a + ' × ' + c, b + ' × ' + d), '= ' + frac(a * c, b * d)];
      if (a * c !== r[0]) st.push('= ' + H(r));
    } else {
      phrase = 'C’est une division : je multiplie par l’inverse de la deuxième fraction.';
      hint = 'Regarde le signe : c’est une division. Diviser par une fraction, c’est multiplier par son inverse.';
      traps.push(trap([a * c, b * d], 'Tu as multiplié sans retourner la deuxième fraction. Diviser, c’est multiplier par l’inverse.'));
      traps.push(trap([b * c, a * d], 'Tu as retourné la première fraction. On retourne celle par laquelle on divise : la deuxième.'));
      st = [e, '= ' + F1 + ' × ' + frac(d, c), '= ' + frac(a + ' × ' + d, b + ' × ' + c), '= ' + frac(a * d, b * c)];
      if (a * d !== r[0]) st.push('= ' + H(r));
    }
    return { type: 'Fractions', text: Q('Dis d’abord la règle, puis calcule. Donne une fraction irréductible.', M(e)), part: fracPart(r, traps, hint, P(phrase) + pose(st)) };
  }

  /* ---------- Fractions et priorités : les paires piégées ---------- */
  function gFprio(){
    var op1, op2, par, f1, f2, f3, n, bon, autre, e, st1, st2, intro1, intro2, t;
    do {
      op1 = pick(['+', MI]); op2 = pick(['×', '×', '÷']); par = Math.random() < 0.5;
      do { f1 = pick(PETITES); f2 = pick(PETITES); } while (f1 === f2 || (op1 === MI && f1[0] * f2[1] <= f2[0] * f1[1] && par));
      if (op2 === '×') f3 = Math.random() < 0.5 ? pick(PETITES) : [rnd(2, 4), 1]; else { n = rnd(2, 4); f3 = [n, 1]; }
      var s12 = op1 === '+' ? fadd(f1, f2) : fsub(f1, f2), p23 = op2 === '×' ? fmul(f2, f3) : fdiv(f2, f3);
      var vPar = op2 === '×' ? fmul(s12, f3) : fdiv(s12, f3), vSans = op1 === '+' ? fadd(f1, p23) : fsub(f1, p23);
      bon = par ? vPar : vSans; autre = par ? vSans : vPar;
    } while (bon[1] === 1 || bon[0] === 0 || bon[1] > 60 || Math.abs(bon[0]) > 60 || (bon[0] === autre[0] && bon[1] === autre[1]));
    var F1 = frac(f1[0], f1[1]), F2 = frac(f2[0], f2[1]), F3 = f3[1] === 1 ? String(f3[0]) : frac(f3[0], f3[1]);
    var INV = f3[1] === 1 ? frac(1, f3[0]) : frac(f3[1], f3[0]);
    var nomOp2 = op2 === '×' ? 'la multiplication' : 'la division', nomOp1 = op1 === '+' ? 'l’addition' : 'la soustraction';
    var reg2 = op2 === '×' ? 'Règle : numérateur fois numérateur, dénominateur fois dénominateur.' : 'Règle : diviser par ' + f3[0] + ', c’est multiplier par ' + M(INV) + '.';
    /* même dénominateur pour x op1 y : les deux lignes (transformation, puis fractions de même dénominateur) et le résultat non réduit */
    function meme(x, y, suite){
      var l = ppcm(x[1], y[1]), k1 = l / x[1], k2 = l / y[1], out = [];
      var X = frac(Math.abs(x[0]), x[1]), Y = frac(Math.abs(y[0]), y[1]);
      if (k1 > 1 || k2 > 1) out.push((k1 > 1 ? frac(x[0] + ' × ' + k1, x[1] + ' × ' + k1) : X) + ' ' + op1 + ' ' + (k2 > 1 ? frac(y[0] + ' × ' + k2, y[1] + ' × ' + k2) : Y) + suite,
        frac(x[0] * k1, l) + ' ' + op1 + ' ' + frac(y[0] * k2, l) + suite);
      return { l: l, s: op1 === '+' ? x[0] * k1 + y[0] * k2 : x[0] * k1 - y[0] * k2, lignes: out };
    }
    if (!par){
      /* sans parenthèses : la multiplication (ou la division) d'abord */
      e = F1 + ' ' + op1 + ' ' + F2 + ' ' + op2 + ' ' + F3;
      var pn = op2 === '×' ? f2[0] * f3[0] : f2[0], pd = op2 === '×' ? f2[1] * f3[1] : f2[1] * f3[0];      /* produit non réduit */
      st1 = op2 === '×' ? [F1 + ' ' + op1 + ' ' + frac(f2[0] + (f3[1] === 1 ? ' × ' + f3[0] : ' × ' + f3[0]), f3[1] === 1 ? f2[1] : f2[1] + ' × ' + f3[1])]
                         : [F1 + ' ' + op1 + ' ' + F2 + ' × ' + INV, F1 + ' ' + op1 + ' ' + frac(f2[0] + ' × 1', f2[1] + ' × ' + f3[0])];
      st1.push(F1 + ' ' + op1 + ' ' + frac(pn, pd));
      var m = meme(f1, [pn, pd], '');
      st2 = m.lignes.concat([Hb(m.s, m.l)]);
      if (Math.abs(m.s) !== Math.abs(bon[0]) || m.l !== bon[1]) st2.push(H(bon));
      intro1 = '<b>En premier : ' + nomOp2 + '</b>, car ' + op2 + ' passe avant ' + op1 + '. ' + reg2;
      intro2 = '<b>Ensuite : ' + nomOp1 + '.</b> Règle : il faut le même dénominateur' + (f1[1] === pd ? ' (c’est déjà le cas).' : ' (' + m.l + ').');
      t = [trap(autre, 'Tu as fait ' + nomOp1 + ' en premier. Sans parenthèses, ' + nomOp2 + ' passe avant.')];
    } else {
      /* avec parenthèses : la parenthèse d'abord */
      e = gp(F1 + ' ' + op1 + ' ' + F2) + ' ' + op2 + ' ' + F3;
      var suite = ' ' + op2 + ' ' + F3, mm = meme(f1, f2, ''), dedans = mm.lignes.map(function(x){ return gp(x) + suite; });
      st1 = dedans.concat([Hb(mm.s, mm.l) + suite]);
      var rn = op2 === '×' ? mm.s * f3[0] : mm.s, rd = op2 === '×' ? mm.l * f3[1] : mm.l * f3[0];
      st2 = op2 === '×' ? [frac(mm.s + ' × ' + f3[0], f3[1] === 1 ? mm.l : mm.l + ' × ' + f3[1])] : [Hb(mm.s, mm.l) + ' × ' + INV, frac(mm.s + ' × 1', mm.l + ' × ' + f3[0])];
      st2.push(Hb(rn, rd));
      if (Math.abs(rn) !== Math.abs(bon[0]) || rd !== bon[1]) st2.push(H(bon));
      intro1 = '<b>En premier : la parenthèse.</b> Règle : il faut le même dénominateur' + (f1[1] === f2[1] ? ' (c’est déjà le cas).' : ' (' + mm.l + ').');
      intro2 = '<b>Ensuite : ' + nomOp2 + '.</b> ' + reg2;
      t = [trap(autre, 'Tu as fait ' + nomOp2 + ' en premier. Ici, la parenthèse passe avant.')];
    }
    return { type: 'Fractions et priorités',
      text: Q('Souligne ce que tu fais en premier, écris la règle, puis calcule. Donne une fraction irréductible.', M('<i>A</i> = ' + e)),
      part: fracPart(bon, t, 'Qu’est-ce que tu fais en premier : y a-t-il des parenthèses ? Sinon, × et ÷ passent avant + et −.',
        P(intro1) + poseA(st1) + P(intro2) + poseA(st2, true)) };
  }

  /* ---------- Puissances, surtout de 10 ---------- */
  var PROD = 'Pour un produit, on additionne les exposants : on ne les multiplie pas.';
  var QUOT = 'Pour un quotient, on soustrait les exposants : celui du haut moins celui du bas.';
  var PPUI = 'Pour une puissance de puissance, on multiplie les exposants : on ne les additionne pas.';
  function nz(a, b){ var v; do { v = rnd(a, b); } while (!v); return v; }
  function expPart(n, traps, hint, sol){ return fillPart('= 10<sup class="bxs">{±0}</sup>', [n], traps, hint, sol); }
  /* écriture décimale à la française de k × 10^e (k entier), sans passer par les nombres à virgule de la machine */
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
  function gP10(){
    var k = rnd(0, 7), m, n, p, e, ans, a;
    var UNE = 'Écris sous la forme d’une seule puissance de 10. Dis d’abord la règle.';
    if (k === 0){
      do { m = nz(-6, 8); n = nz(-6, 8); } while (m + n === m * n || m === 1 || n === 1);
      e = pw(10, z(m)) + ' × ' + pw(10, z(n));
      return { type: 'Puissances de 10', text: Q(UNE, M(e)), part: expPart(m + n, [trap([m * n], PROD), trap([m - n], PROD)],
        'C’est un produit : que fait-on avec les exposants ?', P('Produit : j’additionne les exposants.') + pose([e, '= ' + pw(10, z(m) + ' + ' + zp(n)), '= ' + pw(10, z(m + n))])) };
    }
    if (k === 1){
      do { m = nz(-6, 8); n = nz(-6, 8); } while (m === n || m === 1 || n === 1 || m - n === m + n);
      e = frac(pw(10, z(m)), pw(10, z(n)));
      return { type: 'Puissances de 10', text: Q(UNE, M(e)), part: expPart(m - n, [trap([m + n], QUOT), trap([n - m], 'L’ordre compte : exposant du haut moins exposant du bas.')],
        'C’est un quotient : que fait-on avec les exposants ?', P('Quotient : je soustrais les exposants.' + (n < 0 ? ' Soustraire ' + z(n) + ', c’est ajouter ' + (-n) + '.' : '')) + pose([e, '= ' + pw(10, z(m) + ' − ' + zp(n)), '= ' + pw(10, z(m - n))])) };
    }
    if (k === 2){
      do { m = nz(-4, 5); n = nz(-3, 4); } while (m + n === m * n || m === 1 || n === 1);
      e = pw(gpetit(pw(10, z(m))), z(n));
      return { type: 'Puissances de 10', text: Q(UNE, M(e)), part: expPart(m * n, [trap([m + n], PPUI)],
        'C’est une puissance de puissance : que fait-on avec les exposants ?', P('Puissance d’une puissance : je multiplie les exposants.') + pose([e, '= ' + pw(10, zp(m) + ' × ' + zp(n)), '= ' + pw(10, z(m * n))])) };
    }
    if (k === 3){
      do { m = nz(-6, 8); n = nz(-6, 8); p = nz(-6, 8); } while (m === 1 || n === 1 || p === 1 || m + n === 0 || m + n === 1 || m + n - p === m + n + p);
      e = frac(pw(10, z(m)) + ' × ' + pw(10, z(n)), pw(10, z(p)));
      return { type: 'Puissances de 10', text: Q(UNE, M(e)), part: expPart(m + n - p, [trap([m + n + p], 'On additionne les exposants du produit, puis on soustrait celui du dénominateur.'), trap([m * n - p], PROD)],
        'Commence par le numérateur : c’est un produit. Ensuite, c’est un quotient.',
        P('D’abord le numérateur (produit), puis le quotient.') + pose([e, '= ' + frac(pw(10, z(m + n)), pw(10, z(p))), '= ' + pw(10, z(m + n) + ' − ' + zp(p)), '= ' + pw(10, z(m + n - p))])) };
    }
    if (k === 4){
      /* le piège : une somme de puissances */
      m = rnd(2, 5); do { n = rnd(1, 5); } while (n === m && Math.random() < 0.6);
      e = pw(10, m) + ' + ' + pw(10, n); ans = Math.pow(10, m) + Math.pow(10, n);
      return { type: 'Puissances de 10', text: Q('Calcule. Attention à l’opération.', M(e)),
        part: numPart(ans, [trap(Math.pow(10, m + n), 'C’est le piège : tu as additionné les exposants, mais c’est la règle du produit. Il n’y a pas de règle pour l’addition.'),
            trap(Math.pow(10, m * n), 'Il n’y a pas de règle pour l’addition : calcule chaque puissance, puis additionne.')],
          'C’est une somme : il n’y a pas de règle sur les exposants. Calcule chaque puissance.',
          P('C’est une <b>somme</b> : il n’y a pas de règle pour l’addition. Je calcule chaque puissance.') + pose([e, '= ' + decStr(1, m) + ' + ' + decStr(1, n), '= ' + decStr(ans, 0)])) };
    }
    if (k === 5){
      n = pick([-4, -3, -2, -1, 2, 3, 4, 5, 6]); e = pw(10, z(n)); ans = Math.pow(10, n);
      var t5 = n < 0 ? [trap(-Math.pow(10, -n), 'Un exposant négatif ne donne pas un nombre négatif : c’est l’inverse d’une puissance de 10.'), trap(10 * n, 'Une puissance n’est pas une multiplication, et un exposant négatif ne donne pas un nombre négatif.'),
            trap(Math.pow(10, n - 1), 'Compte les rangs : le 1 est au rang ' + (-n) + ' après la virgule.'), trap(Math.pow(10, n + 1), 'Compte les rangs : le 1 est au rang ' + (-n) + ' après la virgule.')]
          : [trap(10 * n, 'Une puissance n’est pas une multiplication : c’est 10 multiplié ' + n + ' fois par lui-même.'), trap(Math.pow(10, n - 1), 'Compte les zéros : il en faut ' + n + '.'), trap(Math.pow(10, n + 1), 'Compte les zéros : il en faut ' + n + '.')];
      return { type: 'Puissances de 10', text: Q('Donne l’écriture décimale.', M(e)),
        part: numPart(ans, t5, n < 0 ? 'Avec un exposant négatif, le 1 est au rang ' + (-n) + ' après la virgule.' : 'Un 1 suivi de ' + n + ' zéros.',
          pose([e, '= ' + decStr(1, n)]) + P(n < 0 ? 'Le 1 est au rang ' + (-n) + ' après la virgule. Ce nombre est positif.' : 'Un 1 suivi de ' + n + ' zéros.'), 'Écriture décimale') };
    }
    if (k === 6){
      var mk = pick([[32, 1], [7, 0], [405, 2], [6, 0], [17, 1], [25, 1], [9, 0], [58, 1]]);
      do { n = nz(-3, 5); } while (n < 0 && -n + mk[1] > 4);
      var mant = decStr(mk[0], -mk[1]); e = mant + ' × ' + pw(10, z(n)); ans = Number((mk[0] * Math.pow(10, n - mk[1])).toFixed(8));
      var faux = Number((mk[0] * Math.pow(10, -n - mk[1])).toFixed(8));
      return { type: 'Puissances de 10', text: Q('Donne l’écriture décimale.', M(e)),
        part: numPart(ans, [trap(faux, n < 0 ? 'L’exposant est négatif : le nombre devient plus petit, la virgule part vers la gauche.' : 'L’exposant est positif : le nombre devient plus grand, la virgule part vers la droite.')],
          'Multiplier par ' + M(pw(10, z(n))) + ' décale la virgule de ' + Math.abs(n) + ' rang' + (Math.abs(n) > 1 ? 's' : '') + ' vers la ' + (n > 0 ? 'droite' : 'gauche') + '.',
          pose([e, '= ' + decStr(mk[0], n - mk[1])]) + P('La virgule se décale de ' + Math.abs(n) + ' rang' + (Math.abs(n) > 1 ? 's' : '') + ' vers la ' + (n > 0 ? 'droite' : 'gauche') + '.'), 'Écriture décimale') };
    }
    /* le signe et la puissance */
    a = rnd(2, 5); n = pick([2, 2, 3, 4]);
    var av = Math.random() < 0.5, P1 = Math.pow(a, n);
    if (av){
      e = MI + pw(a, n); ans = -P1;
      return { type: 'Puissances', text: Q('Calcule. Regarde bien les parenthèses.', M(e)),
        part: numPart(ans, [trap(P1, 'Sans parenthèses, seul ' + a + ' est à la puissance ' + n + ' : le signe − reste devant.'), trap(-a * n, 'Une puissance n’est pas une multiplication : ' + a + ' est multiplié ' + n + ' fois par lui-même.')],
          'Il n’y a pas de parenthèses : sur quoi porte la puissance ?', pose([e, '= ' + MI + '(' + new Array(n + 1).join(a + ' × ').slice(0, -3) + ')', '= ' + z(ans)]) + P('Sans parenthèses, seul ' + a + ' est à la puissance ' + n + '.')) };
    }
    e = pw('(' + MI + a + ')', n); ans = n % 2 ? -P1 : P1;
    return { type: 'Puissances', text: Q('Calcule. Regarde bien les parenthèses.', M(e)),
      part: numPart(ans, [trap(-ans, n % 2 ? 'Exposant impair : le résultat garde le signe −.' : 'Avec les parenthèses, c’est ' + MI + a + ' qui est à la puissance ' + n + ' : un nombre pair de facteurs négatifs donne un résultat positif.'),
          trap(-a * n, 'Une puissance n’est pas une multiplication : ' + MI + a + ' est multiplié ' + n + ' fois par lui-même.')],
        'Écris la puissance comme un produit de facteurs égaux, puis compte les signes −.', pose([e, '= ' + new Array(n + 1).join('(' + MI + a + ') × ').slice(0, -3), '= ' + z(ans)])) };
  }
  function gpetit(h){ return '(' + h + ')'; }

  /* ---------- Écriture scientifique ---------- */
  function sciPart(mant, e, traps, hint, sol){ return fillPart('= {0} × 10<sup class="bxs">{±1}</sup>', [mant, e], traps, hint, sol, { sci: [0, 1] }); }
  function gSci(){
    var mk = pick([[12, 1], [3, 0], [45, 1], [602, 2], [72, 1], [96, 1], [25, 1], [8, 0], [175, 2], [56, 1]]), e, k = rnd(0, 2);
    var mant = mk[0] / Math.pow(10, mk[1]), MANT = decStr(mk[0], -mk[1]);
    if (k < 2){
      do { e = rnd(-6, 7); } while (Math.abs(e) < 2);
      var N = decStr(mk[0], e - mk[1]);
      return { type: 'Écriture scientifique', text: Q('Donne l’écriture scientifique de ce nombre.', M(N)),
        part: sciPart(mant, e, [trap([mant, -e], e > 0 ? 'Ce nombre est plus grand que 10 : l’exposant est positif.' : 'Ce nombre est plus petit que 1 : l’exposant est négatif.')],
          'Place la virgule après le premier chiffre non nul, puis compte de combien de rangs elle s’est déplacée.',
          pose([N, '= ' + MANT + ' × ' + pw(10, z(e))]) + P('Un seul chiffre non nul avant la virgule. La virgule s’est déplacée de ' + Math.abs(e) + ' rangs.')) };
    }
    /* un nombre qui n'est pas encore en écriture scientifique : 382 × 10^3 */
    var d = rnd(1, 2), g = mk[0] * Math.pow(10, d) / Math.pow(10, mk[1]);
    if (mk[1] > d) d = mk[1];
    g = mk[0] * Math.pow(10, d - mk[1]);
    do { e = nz(-6, 6); } while (e + d === 0);
    var E = decStr(g, 0) + ' × ' + pw(10, z(e));
    return { type: 'Écriture scientifique', text: Q('Donne l’écriture scientifique.', M(E)),
      part: sciPart(mant, e + d, [trap([mant, e], 'Tu as déplacé la virgule sans changer l’exposant : ' + decStr(g, 0) + ' = ' + MANT + ' × ' + pw(10, d) + '.')],
        'Écris d’abord ' + decStr(g, 0) + ' en écriture scientifique, puis additionne les exposants.',
        pose([E, '= ' + MANT + ' × ' + pw(10, d) + ' × ' + pw(10, z(e)), '= ' + MANT + ' × ' + pw(10, z(e + d))])) };
  }

  var GEN = { prio: gPrio, nat: gNat, frac: gFrac, fprio: gFprio, p10: gP10, sci: gSci };
  /* explication d'une question du contrôle : une phrase par ligne, comme partout ailleurs */
  function parLignes(f){ return function(){ var q = f(); if (q.exp && q.exp.fr) q.exp.fr = ph(q.exp.fr); return q; }; }

  /* ---------- Contrôle blanc : les automatismes, avec d'autres nombres à chaque fois ---------- */
  function egal(e){ return M(e) + ' est égal à :'; }
  var TQ = [
    function(){
      var b = rnd(2, 4), c = rnd(2, 4), a = b * c + rnd(-3, 4), d = rnd(1, 5), e = a + ' − ' + b + ' × ' + c + ' + ' + d;
      return qcm(egal(e), null, [M(z(a - b * c + d)), M(z((a - b) * c + d)), M(z(a - b * (c + d))), M(z(a - b * c - d))],
        { fr: 'La multiplication d’abord, puis de gauche à droite.', calc: pose([a + ' − ' + pri(b + ' × ' + c) + ' + ' + d, '= ' + a + ' − ' + b * c + ' + ' + d, '= ' + z(a - b * c + d)]) });
    },
    function(){
      var b = rnd(2, 6), q = rnd(2, 6), c = rnd(2, 4), a = b * q * c, e = a + ' ÷ ' + b + ' × ' + c;
      return qcm(egal(e), null, [M(a / b * c), M(a / (b * c)), M(a * b * c), M(a / b + c)],
        { fr: 'La division et la multiplication ont la même priorité : de gauche à droite.', calc: pose([pri(a + ' ÷ ' + b) + ' × ' + c, '= ' + a / b + ' × ' + c, '= ' + a / b * c]) });
    },
    function(){
      var a = rnd(2, 5), b = rnd(2, 5), e = a + ' × ' + pw(b, 2);
      return qcm(egal(e), null, [M(a * b * b), M(a * b * a * b), M(2 * a * b), M(a * b + 2)],
        { fr: 'La puissance passe avant la multiplication.', calc: pose([a + ' × ' + pri(pw(b, 2)), '= ' + a + ' × ' + b * b, '= ' + a * b * b]) });
    },
    function(){
      var c = rnd(1, 5), b = c + rnd(1, 5), a = b + rnd(1, 9), e = a + ' − (' + b + ' − ' + c + ')';
      return qcm(egal(e), null, [M(a - b + c), M(a - b - c), M(-(a - b + c)), M(a + b - c)],
        { fr: 'La parenthèse d’abord. On n’enlève pas une parenthèse précédée d’un signe − sans changer les signes à l’intérieur.', calc: pose([a + ' − ' + pri('(' + b + ' − ' + c + ')'), '= ' + a + ' − ' + (b - c), '= ' + (a - b + c)]) });
    },
    function(){
      var a = rnd(2, 6), e = pw('(' + MI + a + ')', 2) + ' − ' + pw(a, 2);
      return qcm(egal(e), null, [M('0'), M(2 * a * a), M(z(-2 * a * a)), M(z(-4 * a))],
        { fr: 'Les deux carrés sont positifs et égaux.', calc: pose([e, '= ' + a * a + ' − ' + a * a, '= 0']) });
    },
    function(){
      /* a/b − c/d × n, avec d = b × n : le produit se simplifie */
      var n = rnd(2, 3), b = pick([2, 3, 4, 5]), d = b * n, a = rnd(1, b - 1) || 1, c = 1;
      if (gcd(a, b) !== 1) a = 1;
      var bon = fsub([a, b], fmul([c, d], [n, 1])), f1 = fmul(fsub([a, b], [c, d]), [n, 1]), f2 = fsub([a, b], [c, d]), f3 = fadd([a, b], fmul([c, d], [n, 1]));
      var e = frac(a, b) + ' − ' + frac(c, d) + ' × ' + n;
      return qcm(egal(e), null, [M(H(bon)), M(H(f1)), M(H(f2)), M(H(f3))],
        { fr: 'La multiplication d’abord, puis la soustraction avec le même dénominateur.',
          calc: pose([frac(a, b) + ' − ' + pri(frac(c, d) + ' × ' + n), '= ' + frac(a, b) + ' − ' + frac(c * n, d), '= ' + frac(a, b) + ' − ' + frac(c, b), '= ' + H(bon)]) });
    },
    function(){
      var f1, f2, s, w1, w2, w3;
      do { f1 = pick(PETITES); f2 = pick(PETITES); s = fadd(f1, f2); w1 = R(f1[0] + f2[0], f1[1] + f2[1]); w2 = fmul(f1, f2); w3 = fsub(f1, f2);
      } while (f1[1] === f2[1] || s[1] === 1 || [w1, w2, w3].some(function(w){ return w[0] === s[0] && w[1] === s[1]; }) || (w1[0] === w2[0] && w1[1] === w2[1]) || (w1[0] === w3[0] && w1[1] === w3[1]) || (w2[0] === w3[0] && w2[1] === w3[1]));
      var l = ppcm(f1[1], f2[1]), e = frac(f1[0], f1[1]) + ' + ' + frac(f2[0], f2[1]);
      return qcm(egal(e), null, [M(H(s)), M(H(w1)), M(H(w2)), M(H(w3))],
        { fr: 'C’est une addition : il faut le même dénominateur (' + l + '). On n’additionne jamais les dénominateurs.',
          calc: pose([e, '= ' + frac(f1[0] * l / f1[1], l) + ' + ' + frac(f2[0] * l / f2[1], l), '= ' + Hb(f1[0] * l / f1[1] + f2[0] * l / f2[1], l)].concat(f1[0] * l / f1[1] + f2[0] * l / f2[1] !== s[0] ? ['= ' + H(s)] : [])) });
    },
    function(){
      var f1, f2, q, w1, w2, w3;
      do { f1 = pick(PETITES); f2 = pick(PETITES); q = fdiv(f1, f2); w1 = fmul(f1, f2); w2 = fdiv(f2, f1); w3 = fsub(f1, f2);
      } while (f1 === f2 || [w1, w2, w3].some(function(w){ return w[0] === q[0] && w[1] === q[1]; }) || (w1[0] === w2[0] && w1[1] === w2[1]) || (w1[0] === w3[0] && w1[1] === w3[1]) || (w2[0] === w3[0] && w2[1] === w3[1]));
      var e = frac(f1[0], f1[1]) + ' ÷ ' + frac(f2[0], f2[1]);
      return qcm(egal(e), null, [M(H(q)), M(H(w1)), M(H(w2)), M(H(w3))],
        { fr: 'C’est une division : je multiplie par l’inverse de la deuxième fraction.',
          calc: pose([e, '= ' + frac(f1[0], f1[1]) + ' × ' + frac(f2[1], f2[0]), '= ' + frac(f1[0] * f2[1], f1[1] * f2[0])].concat(f1[0] * f2[1] !== q[0] ? ['= ' + H(q)] : [])) });
    },
    function(){
      var a, b, k = rnd(1, 4), n;
      do { b = pick([3, 4, 5]); a = rnd(2, b - 1); } while (gcd(a, b) !== 1);
      n = a * b * k;
      return qcm('Les ' + M(frac(a, b)) + ' de ' + n + ' font :', null, [M(a * a * k), M(b * b * k), M(a * k), M(n - a * b)],
        { fr: '« Les ' + M(frac(a, b)) + ' de » veut dire « ' + M(frac(a, b) + ' ×') + ' » : c’est une multiplication.', calc: pose([frac(a, b) + ' × ' + n, '= ' + frac(a * n, b), '= ' + a * a * k]) });
    },
    function(){
      var m, n, p;
      do { m = nz(-5, 8); n = nz(-5, 8); p = nz(2, 8); } while (m === 1 || n === 1 || m + n === 0 || m + n === 1 || m * n - p === m + n - p);
      var e = frac(pw(10, z(m)) + ' × ' + pw(10, z(n)), pw(10, z(p)));
      return qcm(egal(e), null, [M(pw(10, z(m + n - p))), M(pw(10, z(m + n + p))), M(pw(10, z(m * n - p)))],
        { fr: 'Au numérateur, un produit : j’additionne les exposants. Puis un quotient : je soustrais.',
          calc: pose([e, '= ' + frac(pw(10, z(m + n)), pw(10, z(p))), '= ' + pw(10, z(m + n) + ' − ' + p), '= ' + pw(10, z(m + n - p))]) });
    },
    function(){
      var m = rnd(2, 4), n = rnd(2, 4), e = pw(10, m) + ' + ' + pw(10, n), v = Math.pow(10, m) + Math.pow(10, n);
      return qcm(egal(e), null, [M(decStr(v, 0)), M(pw(10, m + n)), M(pw(10, m * n + (m * n === m + n ? 1 : 0))), M(decStr(20, Math.max(m, n)))],
        { fr: 'C’est une somme : il n’y a pas de règle pour additionner des puissances. Je calcule chaque puissance.', calc: pose([e, '= ' + decStr(1, m) + ' + ' + decStr(1, n), '= ' + decStr(v, 0)]) });
    },
    function(){
      var n = rnd(2, 4), e = pw(10, MI + n);
      return qcm(egal(e), null, [M(decStr(1, -n)), M(MI + decStr(1, n)), M(MI + 10 * n), M(decStr(1, -n - 1))],
        { fr: 'Un exposant négatif ne donne pas un nombre négatif : le 1 est au rang ' + n + ' après la virgule.', calc: pose([e, '= ' + frac(1, pw(10, n)), '= ' + decStr(1, -n)]) });
    },
    function(){
      var mk = pick([[56, 1], [72, 1], [45, 1], [38, 1], [91, 1], [64, 1]]), e, N, MANT = decStr(mk[0], -1);
      do { e = rnd(-5, 5); } while (Math.abs(e) < 2);
      N = decStr(mk[0], e - 1);
      return qcm('L’écriture scientifique de ' + M(N) + ' est :', null, [M(MANT + ' × ' + pw(10, z(e))), M(mk[0] + ' × ' + pw(10, z(e - 1))), M(MANT + ' × ' + pw(10, z(-e)))],
        { fr: 'Un seul chiffre non nul avant la virgule. ' + (e > 0 ? 'Le nombre est plus grand que 10 : l’exposant est positif.' : 'Le nombre est plus petit que 1 : l’exposant est négatif.'),
          calc: pose([N, '= ' + MANT + ' × ' + pw(10, z(e))]) });
    },
    function(){
      var x = natExpr();
      return qcm('Sans calculer : ' + M(x[0]) + ' est :', null, [NAT[x[3]]].concat(NAT.filter(function(_, k){ return k !== x[3]; })),
        { fr: 'Je fais en premier : ' + x[1] + '. La dernière opération est ' + OPN[x[3]] + ' : c’est ' + NAT[x[3]] + '.' });
    }
  ];

  CHAPS.push({
    id: 't1', niv: '3e', num: 1, sym: '<span class="m">½</span>',
    title: 'Calculs : priorités, fractions, puissances',
    short: 'Calculs',
    sub: 'Priorités et parenthèses, fractions, puissances de 10 : la méthode, les pièges, un contrôle blanc type brevet',
    groups: [
      { k: 'prio', fr: 'Priorités et parenthèses', chip: 'Priorités' },
      { k: 'frac', fr: 'Fractions : la bonne règle pour la bonne opération', chip: 'Fractions' },
      { k: 'puis', fr: 'Puissances, surtout de 10', chip: 'Puissances' },
      { k: 'brevet', fr: 'Contrôle blanc type brevet', chip: 'Brevet blanc' }
    ],
    exLead: 'Avant chaque calcul : qu’est-ce que je fais en premier ? Quelle règle ? Écris tes étapes sur ton cahier, une par ligne.',
    modes: [
      { k: 'prio', fr: 'Priorités' },
      { k: 'nat', fr: 'Somme ou produit ?' },
      { k: 'frac', fr: 'Fractions' },
      { k: 'fprio', fr: 'Fractions et priorités' },
      { k: 'p10', fr: 'Puissances de 10' },
      { k: 'sci', fr: 'Écriture scientifique' }
    ],
    mix: ['prio', 'prio', 'nat', 'frac', 'fprio', 'fprio', 'p10', 'p10', 'sci'],
    gen: GEN, tq: TQ.map(parLignes),
    low: 'Courage ! Relis la fiche réflexe, refais les exercices, puis recommence.',
    dit: [
      ['Avant de calculer : qu’est-ce que je fais en premier ?', ''],
      ['Regarde le signe : chaque opération a sa règle.', ''],
      ['Une étape par ligne, et ta prof voit ta démarche.', ''],
      ['Pas de règle pour additionner des puissances !', '']
    ]
  });
  })();
