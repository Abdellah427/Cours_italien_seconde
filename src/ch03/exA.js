// Chapitre 3, calcul littéral : exercices (cahier, calculs, racines, développer et factoriser).
// Format : outils/FORMAT-EXERCICES.md. Les textes sont en HTML déjà balisé (.fr / .it) : les calculs ne sont écrits qu'une fois.
EXOS.push({
  ch: 'c3', id: 'c3qcm', group: 'cahier', num: 'QCM',
  src: { fr: 'cahier, activité 1', it: 'quaderno, attività 1' },
  tag: { fr: 'QCM', it: 'QUIZ' },
  title: { fr: 'Le QCM de ton cahier', it: 'Il quiz del tuo quaderno' },
  parts: [
    { kind: 'choice',
      q: '<p class="fr">Le nombre <span class="m nw">9 + <i>x</i> − (12<i>x</i> − 7)</span> est égal à\u00a0:</p>\n<p class="it">Il numero <span class="m nw">9 + <i>x</i> − (12<i>x</i> − 7)</span> è uguale a:</p>',
      choices: [
        '<span class="m nw">2 − 11<i>x</i></span>',
        '<span class="m nw">16 + 13<i>x</i></span>',
        '<span class="m nw">16 − 11<i>x</i></span>',
        '<span class="m nw">5<i>x</i></span>'
      ],
      correct: 2,
      fb: [
        '<p class="fr">Tu as bien changé le signe de <span class="m nw">12<i>x</i></span>, mais pas celui de <span class="m nw">−7</span>\u00a0: c’est pour ça que tu trouves <span class="m nw">9 − 7 = 2</span>. Un signe «\u00a0−\u00a0» devant une parenthèse change <b>tous</b> les signes à l’intérieur\u00a0: <span class="m nw">−(12<i>x</i> − 7) = −12<i>x</i> + 7</span>.</p>\n<p class="it">Hai cambiato il segno di <span class="m nw">12<i>x</i></span>, ma non quello di <span class="m nw">−7</span>: per questo trovi <span class="m nw">9 − 7 = 2</span>. Un segno «−» davanti a una parentesi cambia <b>tutti</b> i segni all’interno: <span class="m nw">−(12<i>x</i> − 7) = −12<i>x</i> + 7</span>.</p>',
        '<p class="fr">Tu as changé le signe de <span class="m nw">−7</span> mais pas celui de <span class="m nw">12<i>x</i></span>\u00a0: tu as calculé <span class="m nw"><i>x</i> + 12<i>x</i> = 13<i>x</i></span>. Il fallait <span class="m nw"><i>x</i> − 12<i>x</i> = −11<i>x</i></span>.</p>\n<p class="it">Hai cambiato il segno di <span class="m nw">−7</span> ma non quello di <span class="m nw">12<i>x</i></span>: hai calcolato <span class="m nw"><i>x</i> + 12<i>x</i> = 13<i>x</i></span>. Bisognava fare <span class="m nw"><i>x</i> − 12<i>x</i> = −11<i>x</i></span>.</p>',
        '<p class="fr"><span class="calc"><span class="cl"></span><span class="ce m">9 + <i>x</i> − (12<i>x</i> − 7)</span><span class="cl"></span><span class="ce m">= 9 + <i>x</i> − 12<i>x</i> + 7</span><span class="cl"></span><span class="ce m">= 16 − 11<i>x</i></span></span> On regroupe les nombres (<span class="m nw">9 + 7 = 16</span>) et les termes en <span class="m nw"><i>x</i></span> (<span class="m nw"><i>x</i> − 12<i>x</i> = −11<i>x</i></span>).</p>\n<p class="it"><span class="calc"><span class="cl"></span><span class="ce m">9 + <i>x</i> − (12<i>x</i> − 7)</span><span class="cl"></span><span class="ce m">= 9 + <i>x</i> − 12<i>x</i> + 7</span><span class="cl"></span><span class="ce m">= 16 − 11<i>x</i></span></span> Si raggruppano i numeri (<span class="m nw">9 + 7 = 16</span>) e i termini in <span class="m nw"><i>x</i></span> (<span class="m nw"><i>x</i> − 12<i>x</i> = −11<i>x</i></span>).</p>',
        '<p class="fr">On ne peut pas additionner un nombre et des <span class="m nw"><i>x</i></span>\u00a0: <span class="m nw">16</span> et <span class="m nw">−11<i>x</i></span> ne sont pas des termes semblables, donc <span class="m nw">16 − 11<i>x</i></span> ne se simplifie plus. Vérifie avec <span class="m nw"><i>x</i> = 0</span>\u00a0: <span class="m nw">16 − 0 = 16</span>, alors que <span class="m nw">5 × 0 = 0</span>.</p>\n<p class="it">Non si può sommare un numero con delle <span class="m nw"><i>x</i></span>: <span class="m nw">16</span> e <span class="m nw">−11<i>x</i></span> non sono termini simili, quindi <span class="m nw">16 − 11<i>x</i></span> non si semplifica più. Verifica con <span class="m nw"><i>x</i> = 0</span>: <span class="m nw">16 − 0 = 16</span>, mentre <span class="m nw">5 × 0 = 0</span>.</p>'
      ],
      more: '<a class="lnk" href="#c3/cours" data-go="c3-parentheses"><span class="fr">Revoir\u00a0: supprimer des parenthèses</span><span class="it inl">Ripassa: togliere le parentesi</span> →</a>' },
    { kind: 'choice',
      q: '<p class="fr"><span class="m nw"><span class="bp">(</span><span class="frac"><span>−3<i>x</i></span><span>11</span></span><span class="bp">)</span><sup>2</sup></span> est égal à\u00a0:</p>\n<p class="it"><span class="m nw"><span class="bp">(</span><span class="frac"><span>−3<i>x</i></span><span>11</span></span><span class="bp">)</span><sup>2</sup></span> è uguale a:</p>',
      choices: [
        '<span class="m nw"><span class="frac"><span>−3<i>x</i><sup>2</sup></span><span>121</span></span></span>',
        '<span class="m nw"><span class="frac"><span>9<i>x</i><sup>2</sup></span><span>121</span></span></span>',
        '<span class="m nw">−<span class="frac"><span>9<i>x</i><sup>2</sup></span><span>121</span></span></span>',
        '<span class="m nw"><span class="frac"><span>9<i>x</i><sup>2</sup></span><span>11</span></span></span>'
      ],
      correct: 1,
      fb: [
        '<p class="fr">Tu as élevé au carré <span class="m nw"><i>x</i></span> et <span class="m nw">11</span>, mais pas <span class="m nw">−3</span>. Le carré s’applique à tout ce qui est dans la parenthèse\u00a0: <span class="calc"><span class="cl"></span><span class="cg m">(−3<i>x</i>)<sup>2</sup></span><span class="cd m">= (−3)<sup>2</sup> × <i>x</i><sup>2</sup></span><span class="cl"></span><span class="cg m"></span><span class="cd m">= 9<i>x</i><sup>2</sup></span></span> </p>\n<p class="it">Hai elevato al quadrato <span class="m nw"><i>x</i></span> e <span class="m nw">11</span>, ma non <span class="m nw">−3</span>. Il quadrato si applica a tutto ciò che sta nella parentesi: <span class="calc"><span class="cl"></span><span class="cg m">(−3<i>x</i>)<sup>2</sup></span><span class="cd m">= (−3)<sup>2</sup> × <i>x</i><sup>2</sup></span><span class="cl"></span><span class="cg m"></span><span class="cd m">= 9<i>x</i><sup>2</sup></span></span> </p>',
        '<p class="fr">On élève au carré le numérateur et le dénominateur (puissance d’un quotient)\u00a0: <span class="calc"><span class="cl"></span><span class="cg m"><span class="bp">(</span><span class="frac"><span>−3<i>x</i></span><span>11</span></span><span class="bp">)</span><sup>2</sup></span><span class="cd m">= <span class="frac"><span>(−3<i>x</i>)<sup>2</sup></span><span>11<sup>2</sup></span></span></span><span class="cl"></span><span class="cg m"></span><span class="cd m">= <span class="frac"><span>9<i>x</i><sup>2</sup></span><span>121</span></span></span></span> </p>\n<p class="it">Si elevano al quadrato il numeratore e il denominatore (potenza di un quoziente): <span class="calc"><span class="cl"></span><span class="cg m"><span class="bp">(</span><span class="frac"><span>−3<i>x</i></span><span>11</span></span><span class="bp">)</span><sup>2</sup></span><span class="cd m">= <span class="frac"><span>(−3<i>x</i>)<sup>2</sup></span><span>11<sup>2</sup></span></span></span><span class="cl"></span><span class="cg m"></span><span class="cd m">= <span class="frac"><span>9<i>x</i><sup>2</sup></span><span>121</span></span></span></span> </p>',
        '<p class="fr">Erreur de signe\u00a0: <span class="calc"><span class="cl"></span><span class="cg m">(−3)<sup>2</sup></span><span class="cd m">= (−3) × (−3)</span><span class="cl"></span><span class="cg m"></span><span class="cd m">= +9</span></span> Un carré n’est jamais négatif.</p>\n<p class="it">Errore di segno: <span class="calc"><span class="cl"></span><span class="cg m">(−3)<sup>2</sup></span><span class="cd m">= (−3) × (−3)</span><span class="cl"></span><span class="cg m"></span><span class="cd m">= +9</span></span> Un quadrato non è mai negativo.</p>',
        '<p class="fr">Tu as oublié d’élever le dénominateur au carré\u00a0: <span class="m nw">11<sup>2</sup> = 121</span>, pas <span class="m nw">11</span>.</p>\n<p class="it">Hai dimenticato di elevare al quadrato il denominatore: <span class="m nw">11<sup>2</sup> = 121</span>, non <span class="m nw">11</span>.</p>'
      ],
      more: '<a class="lnk" href="#c3/cours" data-go="c3-puissances"><span class="fr">Revoir\u00a0: les puissances</span><span class="it inl">Ripassa: le potenze</span> →</a>' },
    { kind: 'choice',
      q: '<p class="fr"><span class="m nw">−3<i>a</i> × (−5<i>a</i>)</span> est égal à\u00a0:</p>\n<p class="it"><span class="m nw">−3<i>a</i> × (−5<i>a</i>)</span> è uguale a:</p>',
      choices: [
        '<span class="m nw">15<i>a</i></span>',
        '<span class="m nw">8<i>a</i></span>',
        '<span class="m nw">−8<i>a</i><sup>2</sup></span>',
        '<span class="m nw">15<i>a</i><sup>2</sup></span>'
      ],
      correct: 3,
      fb: [
        '<p class="fr">Le nombre est juste, mais <span class="m nw"><i>a</i> × <i>a</i> = <i>a</i><sup>2</sup></span>, pas <span class="m nw"><i>a</i></span>.</p>\n<p class="it">Il numero è giusto, ma <span class="m nw"><i>a</i> × <i>a</i> = <i>a</i><sup>2</sup></span>, non <span class="m nw"><i>a</i></span>.</p>',
        '<p class="fr">Tu as additionné <span class="m nw">3</span> et <span class="m nw">5</span>. Ici c’est un produit\u00a0: on multiplie.</p>\n<p class="it">Hai sommato <span class="m nw">3</span> e <span class="m nw">5</span>. Qui è un prodotto: si moltiplica.</p>',
        '<p class="fr">Tu as additionné <span class="m nw">−3</span> et <span class="m nw">−5</span>. Dans un produit, on multiplie les nombres\u00a0: <span class="m nw">(−3) × (−5) = +15</span> (moins par moins donne plus).</p>\n<p class="it">Hai sommato <span class="m nw">−3</span> e <span class="m nw">−5</span>. In un prodotto si moltiplicano i numeri: <span class="m nw">(−3) × (−5) = +15</span> (meno per meno dà più).</p>',
        '<p class="fr">On multiplie les nombres entre eux et les lettres entre elles\u00a0: <span class="m nw">(−3) × (−5) = 15</span> et <span class="m nw"><i>a</i> × <i>a</i> = <i>a</i><sup>2</sup></span>.</p>\n<p class="it">Si moltiplicano i numeri tra loro e le lettere tra loro: <span class="m nw">(−3) × (−5) = 15</span> e <span class="m nw"><i>a</i> × <i>a</i> = <i>a</i><sup>2</sup></span>.</p>'
      ],
      more: '<a class="lnk" href="#c3/cours" data-go="c3-multiplier"><span class="fr">Revoir\u00a0: multiplier des expressions</span><span class="it inl">Ripassa: moltiplicare espressioni</span> →</a>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3p1', group: 'cahier', num: '+1', plus: true,
  src: { fr: 'pour aller plus loin', it: 'per approfondire' },
  title: { fr: 'Développer le programme', it: 'Sviluppare il programma' },
  text: '<p class="fr">Développer et réduire <span class="m nw"><i>P</i>(<i>a</i>) = 2(<i>a</i> − 7)<sup>2</sup> − 10</span>.</p>\n<p class="it">Sviluppa e riduci <span class="m nw"><i>P</i>(<i>a</i>) = 2(<i>a</i> − 7)<sup>2</sup> − 10</span>.</p>',
  parts: [
    { kind: 'self',
      hint: '<p class="fr">Développe d’abord <span class="m nw">(<i>a</i> − 7)<sup>2</sup></span> avec l’identité <span class="m nw">(<i>a</i> − <i>b</i>)<sup>2</sup> = <i>a</i><sup>2</sup> − 2<i>ab</i> + <i>b</i><sup>2</sup></span> (partie 5 du cours), puis multiplie par 2.</p>\n<p class="it">Sviluppa prima <span class="m nw">(<i>a</i> − 7)<sup>2</sup></span> con il prodotto notevole <span class="m nw">(<i>a</i> − <i>b</i>)<sup>2</sup> = <i>a</i><sup>2</sup> − 2<i>ab</i> + <i>b</i><sup>2</sup></span> (parte 5 della lezione), poi moltiplica per 2.</p>',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m">(<i>a</i> − 7)<sup>2</sup></span><span class="cd m">= <i>a</i><sup>2</sup> − 2 × <i>a</i> × 7 + 7<sup>2</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= <i>a</i><sup>2</sup> − 14<i>a</i> + 49</span>\n<span class="cl"></span><span class="cg m"><i>P</i>(<i>a</i>)</span><span class="cd m">= 2(<i>a</i><sup>2</sup> − 14<i>a</i> + 49) − 10</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 2<i>a</i><sup>2</sup> − 28<i>a</i> + 98 − 10</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m res">= 2<i>a</i><sup>2</sup> − 28<i>a</i> + 88</span>\n<span class="cl"></span><span class="cg m"><i>P</i>(−1)</span><span class="cd m">= 2 + 28 + 88</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 118</span>\n<span class="cn"><span class="fr">contrôle</span><span class="it inl">controllo</span> ✓</span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3p2', group: 'cahier', num: '+2', plus: true,
  src: { fr: 'pour aller plus loin', it: 'per approfondire' },
  title: { fr: 'Remonter le programme', it: 'Risalire il programma' },
  text: '<p class="fr">Quel nombre de départ faut-il choisir pour obtenir <span class="m nw">−10</span>\u00a0? Peut-on obtenir <span class="m nw">−20</span>\u00a0?</p>\n<p class="it">Quale numero di partenza bisogna scegliere per ottenere <span class="m nw">−10</span>? Si può ottenere <span class="m nw">−20</span>?</p>',
  parts: [
    { kind: 'self',
      hint: '<p class="fr">Écris l’équation <span class="m nw">2(<i>a</i> − 7)<sup>2</sup> − 10 = −10</span>. Pour <span class="m nw">−20</span>\u00a0: un carré peut-il être négatif\u00a0?</p>\n<p class="it">Scrivi l’equazione <span class="m nw">2(<i>a</i> − 7)<sup>2</sup> − 10 = −10</span>. Per <span class="m nw">−20</span>: un quadrato può essere negativo?</p>',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m">2(<i>a</i> − 7)<sup>2</sup> − 10</span><span class="cd m">= −10</span>\n<span class="cl eqv">⇔</span><span class="cg m">2(<i>a</i> − 7)<sup>2</sup></span><span class="cd m">= 0</span>\n<span class="cl eqv">⇔</span><span class="cg m">(<i>a</i> − 7)<sup>2</sup></span><span class="cd m">= 0</span>\n<span class="cl eqv">⇔</span><span class="cg m"><i>a</i></span><span class="cd m">= 7</span>\n</div>\n<p class="fr">Il faut partir de <span class="m nw">7</span>. Pour <span class="m nw">−20</span>, c’est impossible\u00a0: <span class="m nw">(<i>a</i> − 7)<sup>2</sup> ≥ 0</span>, donc <span class="m nw">2(<i>a</i> − 7)<sup>2</sup> ≥ 0</span>, donc <span class="m nw"><i>P</i>(<i>a</i>) ≥ −10</span>. Le programme ne donne jamais un résultat plus petit que <span class="m nw">−10</span>.</p>\n<p class="it">Bisogna partire da <span class="m nw">7</span>. Per <span class="m nw">−20</span> è impossibile: <span class="m nw">(<i>a</i> − 7)<sup>2</sup> ≥ 0</span>, quindi <span class="m nw">2(<i>a</i> − 7)<sup>2</sup> ≥ 0</span>, quindi <span class="m nw"><i>P</i>(<i>a</i>) ≥ −10</span>. Il programma non dà mai un risultato minore di <span class="m nw">−10</span>.</p>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e13', group: 'calc', num: '13', page: 84,
  tag: { fr: 'QCM', it: 'QUIZ' },
  title: { fr: 'Par quel calcul commencer ?', it: 'Da quale calcolo cominciare?' },
  parts: [
    { kind: 'choice',
      q: '<p class="fr">Dans l’expression <span class="m nw">7 + 3 × 4</span>, on commence par calculer\u00a0:</p>\n<p class="it">Nell’espressione <span class="m nw">7 + 3 × 4</span> si comincia calcolando:</p>',
      choices: [
        '<span class="m nw">7 + 3</span>',
        '<span class="m nw">3 × 4</span>',
        '<span class="fr">peu importe</span><span class="it inl">non importa</span>'
      ],
      correct: 1,
      fb: [
        '<p class="fr">La multiplication passe avant l’addition. En commençant par <span class="m nw">7 + 3</span> on trouverait <span class="m nw">40</span> au lieu de <span class="m nw">19</span>.</p>\n<p class="it">La moltiplicazione viene prima dell’addizione. Cominciando da <span class="m nw">7 + 3</span> si troverebbe <span class="m nw">40</span> invece di <span class="m nw">19</span>.</p>',
        '<p class="fr"><span class="calc"><span class="cl"></span><span class="cg m">7 + 3 × 4</span><span class="cd m">= 7 + 12</span><span class="cl"></span><span class="cg m"></span><span class="cd m">= 19</span></span> </p>\n<p class="it"><span class="calc"><span class="cl"></span><span class="cg m">7 + 3 × 4</span><span class="cd m">= 7 + 12</span><span class="cl"></span><span class="cg m"></span><span class="cd m">= 19</span></span> </p>',
        '<p class="fr">L’ordre change le résultat\u00a0: <span class="m nw">19</span> d’un côté, <span class="m nw">40</span> de l’autre.</p>\n<p class="it">L’ordine cambia il risultato: <span class="m nw">19</span> da una parte, <span class="m nw">40</span> dall’altra.</p>'
      ] },
    { kind: 'choice',
      q: '<p class="fr">Dans l’expression <span class="m nw">5 − 2 × 3<sup>2</sup></span>, on commence par calculer\u00a0:</p>\n<p class="it">Nell’espressione <span class="m nw">5 − 2 × 3<sup>2</sup></span> si comincia calcolando:</p>',
      choices: [
        '<span class="m nw">5 − 2</span>',
        '<span class="m nw">2 × 3</span>',
        '<span class="m nw">3<sup>2</sup></span>'
      ],
      correct: 2,
      fb: [
        '<p class="fr">La soustraction passe en dernier.</p>\n<p class="it">La sottrazione si fa per ultima.</p>',
        '<p class="fr">Le carré porte seulement sur le 3, et les puissances passent avant les multiplications.</p>\n<p class="it">Il quadrato riguarda solo il 3, e le potenze vengono prima delle moltiplicazioni.</p>',
        '<p class="fr"><span class="calc"><span class="cl"></span><span class="cg m">5 − 2 × 3<sup>2</sup></span><span class="cd m">= 5 − 2 × 9</span><span class="cl"></span><span class="cg m"></span><span class="cd m">= 5 − 18</span><span class="cl"></span><span class="cg m"></span><span class="cd m">= −13</span></span> </p>\n<p class="it"><span class="calc"><span class="cl"></span><span class="cg m">5 − 2 × 3<sup>2</sup></span><span class="cd m">= 5 − 2 × 9</span><span class="cl"></span><span class="cg m"></span><span class="cd m">= 5 − 18</span><span class="cl"></span><span class="cg m"></span><span class="cd m">= −13</span></span> </p>'
      ] }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e14', group: 'calc', num: '14', page: 85,
  title: { fr: 'Calculer en respectant les priorités', it: 'Calcola rispettando l’ordine delle operazioni' },
  text: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= 8 × 6 − 4<sup>2</sup></span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= 8 − 6 × 4<sup>2</sup></span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= 6 − (8 ÷ 4)<sup>2</sup></span>\n<span class="cl"></span><span class="cg m"><i>D</i></span><span class="cd m">= (8 − 6) × 4<sup>2</sup></span>\n<span class="cl"></span><span class="cg m"><i>E</i></span><span class="cd m">= 8 − 6 + 4<sup>2</sup></span>\n<span class="cl"></span><span class="cg m"><i>F</i></span><span class="cd m">= 8 ÷ (6 − 4)<sup>2</sup></span>\n</div>',
  parts: [
    { kind: 'self',
      hint: '<p class="fr">Souligne d’abord les parenthèses, puis les puissances. Écris une ligne par opération.</p>\n<p class="it">Sottolinea prima le parentesi, poi le potenze. Scrivi una riga per ogni operazione.</p>',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= 48 − 16</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 32</span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= 8 − 96</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= −88</span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= 6 − 2<sup>2</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 6 − 4</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 2</span>\n<span class="cl"></span><span class="cg m"><i>D</i></span><span class="cd m">= 2 × 16</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 32</span>\n<span class="cl"></span><span class="cg m"><i>E</i></span><span class="cd m">= 2 + 16</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 18</span>\n<span class="cl"></span><span class="cg m"><i>F</i></span><span class="cd m">= 8 ÷ 2<sup>2</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 8 ÷ 4</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 2</span>\n</div>\n<p class="fr small">A et D donnent le même résultat par des calculs différents, C et F aussi\u00a0: c’est un hasard, pas une règle.</p>\n<p class="it small">A e D danno lo stesso risultato con calcoli diversi, e anche C e F: è un caso, non una regola.</p>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e12', group: 'calc', num: '12', page: 84,
  title: { fr: 'Placer des parenthèses', it: 'Inserire le parentesi' },
  text: '<p class="fr">Recopier puis compléter chaque égalité avec des parenthèses pour qu’elle soit exacte.</p>\n<p class="it">Ricopia e completa ogni uguaglianza con delle parentesi perché sia esatta.</p>\n<div class="calc">\n<span class="cl">a.</span><span class="cg m">5 − 3 + 2</span><span class="cd m">= 0</span>\n<span class="cl">b.</span><span class="cg m">−5 − 3 + 2</span><span class="cd m">= 0</span>\n<span class="cl">c.</span><span class="cg m">−5 − 3 + 2</span><span class="cd m">= −4</span>\n<span class="cl">d.</span><span class="cg m">−5 − 3 + 2</span><span class="cd m">= −10</span>\n</div>',
  parts: [
    { kind: 'self',
      hint: '<p class="fr">Essaie plusieurs places et calcule à chaque fois. Le signe «\u00a0−\u00a0» du début peut rester en dehors de la parenthèse.</p>\n<p class="it">Prova diverse posizioni e calcola ogni volta. Il segno «−» iniziale può restare fuori dalla parentesi.</p>',
      sol: '<div class="calc">\n<span class="cl">a.</span><span class="cg m">5 − (3 + 2)</span><span class="cd m">= 5 − 5</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 0</span>\n<span class="cl">b.</span><span class="cg m">−(5 − 3) + 2</span><span class="cd m">= −2 + 2</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 0</span>\n<span class="cl">c.</span><span class="cg m">−(5 − 3 + 2)</span><span class="cd m">= −4</span>\n<span class="cl">d.</span><span class="cg m">−5 − (3 + 2)</span><span class="cd m">= −5 − 5</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= −10</span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e31', group: 'calc', num: '31', page: 100,
  title: { fr: 'Vrai ou faux ?', it: 'Vero o falso?' },
  text: '<p class="items"><span class="item">a. <span class="m nw"><span class="frac"><span>4</span><span>3</span></span> + <span class="frac"><span>7</span><span>3</span></span></span>  <span class="ui"><span class="fr">vaut</span><span class="it">vale</span></span>  <span class="m nw"><span class="frac"><span>11</span><span>6</span></span></span></span> <span class="item">b. <span class="m nw"><span class="frac"><span>1</span><span>6</span></span> + <span class="frac"><span>1</span><span>3</span></span></span>  <span class="ui"><span class="fr">vaut</span><span class="it">vale</span></span>  <span class="m nw"><span class="frac"><span>1</span><span>2</span></span></span></span> <span class="item">c. <span class="m nw"><span class="frac"><span>3</span><span>4</span></span> × <span class="frac"><span>5</span><span>3</span></span></span>  <span class="ui"><span class="fr">vaut</span><span class="it">vale</span></span>  <span class="m nw"><span class="frac"><span>5</span><span>4</span></span></span></span> <span class="item">d. <span class="m nw"><span class="frac"><span>2</span><span><span class="frac"><span>1</span><span>4</span></span></span></span></span>  <span class="ui"><span class="fr">vaut</span><span class="it">vale</span></span>  <span class="m nw"><span class="frac"><span>1</span><span>8</span></span></span></span></p>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<p class="ct">a. <b class="wrong"><span class="fr">Faux</span><span class="it inl">Falso</span></b>\u00a0: <span class="m nw"><span class="frac"><span>4</span><span>3</span></span> + <span class="frac"><span>7</span><span>3</span></span> = <span class="frac"><span>11</span><span>3</span></span></span> <span class="why"><span class="fr">on n’additionne pas les dénominateurs</span><span class="it inl">i denominatori non si sommano</span></span></p>\n<p class="ct">b. <b class="right"><span class="fr">Vrai</span><span class="it inl">Vero</span></b>\u00a0: <span class="m nw"><span class="frac"><span>1</span><span>6</span></span> + <span class="frac"><span>2</span><span>6</span></span> = <span class="frac"><span>3</span><span>6</span></span> = <span class="frac"><span>1</span><span>2</span></span></span></p>\n<p class="ct">c. <b class="right"><span class="fr">Vrai</span><span class="it inl">Vero</span></b>\u00a0: <span class="m nw"><span class="frac"><span>3 × 5</span><span>4 × 3</span></span> = <span class="frac"><span>5</span><span>4</span></span></span></p>\n<p class="ct">d. <b class="wrong"><span class="fr">Faux</span><span class="it inl">Falso</span></b>\u00a0: <span class="m nw">2 ÷ <span class="frac"><span>1</span><span>4</span></span> = 2 × 4 = 8</span></p>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e32', group: 'calc', num: '32', page: 100,
  title: { fr: 'Fractions irréductibles', it: 'Frazioni ridotte ai minimi termini' },
  text: '<p class="fr">Calculer et donner le résultat sous forme de fraction irréductible.</p>\n<p class="it">Calcola e scrivi il risultato come frazione ridotta ai minimi termini.</p>\n<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= <span class="frac"><span>3</span><span>4</span></span> + <span class="frac"><span>4</span><span>5</span></span></span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= <span class="frac"><span>7</span><span>6</span></span> − <span class="frac"><span>5</span><span>4</span></span></span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= <span class="frac"><span>9</span><span>20</span></span> × <span class="frac"><span>25</span><span>4</span></span></span>\n<span class="cl"></span><span class="cg m"><i>D</i></span><span class="cd m">= <span class="frac"><span><span class="frac"><span>12</span><span>5</span></span></span><span><span class="frac"><span>18</span><span>25</span></span></span></span></span>\n</div>',
  parts: [
    { kind: 'self',
      hint: '<p class="fr">Pour <span class="m nw"><i>B</i></span>, le plus petit multiple commun de 6 et 4 est 12. Pour <span class="m nw"><i>C</i></span> et <span class="m nw"><i>D</i></span>, simplifie avant de multiplier.</p>\n<p class="it">Per <span class="m nw"><i>B</i></span> il minimo comune multiplo di 6 e 4 è 12. Per <span class="m nw"><i>C</i></span> e <span class="m nw"><i>D</i></span> semplifica prima di moltiplicare.</p>',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= <span class="frac"><span>15</span><span>20</span></span> + <span class="frac"><span>16</span><span>20</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= <span class="frac"><span>31</span><span>20</span></span></span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= <span class="frac"><span>14</span><span>12</span></span> − <span class="frac"><span>15</span><span>12</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= −<span class="frac"><span>1</span><span>12</span></span></span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= <span class="frac"><span>9 × 5 × 5</span><span>4 × 5 × 4</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= <span class="frac"><span>45</span><span>16</span></span></span>\n<span class="cl"></span><span class="cg m"><i>D</i></span><span class="cd m">= <span class="frac"><span>12</span><span>5</span></span> × <span class="frac"><span>25</span><span>18</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= <span class="frac"><span>6 × 2 × 5 × 5</span><span>5 × 6 × 3</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= <span class="frac"><span>10</span><span>3</span></span></span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e36', group: 'calc', num: '36', page: 100,
  title: { fr: 'Une seule écriture fractionnaire', it: 'Un’unica scrittura frazionaria' },
  text: '<p class="fr">Soit <span class="m nw"><i>x</i></span> un réel différent de 1. Écrire chaque expression sous la forme d’une écriture fractionnaire.</p>\n<p class="it">Sia <span class="m nw"><i>x</i></span> un numero reale diverso da 1. Scrivi ogni espressione come un’unica scrittura frazionaria.</p>\n<div class="calc">\n<span class="cl">a.</span><span class="ce m"><span class="frac"><span>10</span><span><i>x</i> − 1</span></span> + <span class="frac"><span>7<i>x</i></span><span><i>x</i> − 1</span></span></span>\n<span class="cl">b.</span><span class="ce m"><span class="frac"><span>1</span><span><i>x</i> − 1</span></span> − <span class="frac"><span>3(<i>x</i> + 2)</span><span><i>x</i> − 1</span></span></span>\n<span class="cl">c.</span><span class="ce m"><span class="frac"><span>1</span><span><i>x</i> − 1</span></span> − <span class="frac"><span>2(<i>x</i> − 3)</span><span><i>x</i> − 1</span></span></span>\n<span class="cl">d.</span><span class="ce m"><span class="frac"><span>1</span><span><i>x</i> − 1</span></span> − <span class="frac"><span><i>x</i> + 5</span><span><i>x</i> − 1</span></span></span>\n</div>',
  parts: [
    { kind: 'self',
      hint: '<p class="fr">Le dénominateur est déjà commun. Pour b, c et d, attention au signe «\u00a0−\u00a0» devant la deuxième fraction\u00a0: il porte sur tout le numérateur.</p>\n<p class="it">Il denominatore è già comune. Per b, c e d, attenzione al segno «−» davanti alla seconda frazione: riguarda tutto il numeratore.</p>',
      sol: '<div class="calc">\n<span class="cl">a.</span><span class="ce m"><span class="frac"><span>7<i>x</i> + 10</span><span><i>x</i> − 1</span></span></span>\n<span class="cl">b.</span><span class="ce m"><span class="frac"><span>1 − 3(<i>x</i> + 2)</span><span><i>x</i> − 1</span></span></span>\n<span class="cl"></span><span class="ce m">= <span class="frac"><span>1 − 3<i>x</i> − 6</span><span><i>x</i> − 1</span></span></span>\n<span class="cl"></span><span class="ce m">= <span class="frac"><span>−3<i>x</i> − 5</span><span><i>x</i> − 1</span></span></span>\n<span class="cl">c.</span><span class="ce m"><span class="frac"><span>1 − 2(<i>x</i> − 3)</span><span><i>x</i> − 1</span></span></span>\n<span class="cl"></span><span class="ce m">= <span class="frac"><span>1 − 2<i>x</i> + 6</span><span><i>x</i> − 1</span></span></span>\n<span class="cl"></span><span class="ce m">= <span class="frac"><span>−2<i>x</i> + 7</span><span><i>x</i> − 1</span></span></span>\n<span class="cl">d.</span><span class="ce m"><span class="frac"><span>1 − (<i>x</i> + 5)</span><span><i>x</i> − 1</span></span></span>\n<span class="cl"></span><span class="ce m">= <span class="frac"><span>−<i>x</i> − 4</span><span><i>x</i> − 1</span></span></span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e16', group: 'calc', num: '16', page: 85,
  title: { fr: 'Puissances et signes', it: 'Potenze e segni' },
  text: '<p class="fr">Dans chaque cas, calculer A, B et C.</p>\n<p class="it">In ogni caso calcola A, B e C.</p>\n<p class="items"><span class="item"><b>1.</b> <span class="m nw"><i>A</i> = 3<sup>2</sup></span></span> <span class="item"><span class="m nw"><i>B</i> = 2<sup>3</sup></span></span> <span class="item"><span class="m nw"><i>C</i> = <span class="frac"><span>1</span><span>2<sup>2</sup></span></span></span></span> <br> <span class="item"><b>2.</b> <span class="m nw"><i>A</i> = (−2)<sup>2</sup></span></span> <span class="item"><span class="m nw"><i>B</i> = (−2)<sup>3</sup></span></span> <span class="item"><span class="m nw"><i>C</i> = −2<sup>2</sup></span></span></p>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl">1.</span><span class="cg m"><i>A</i></span><span class="cd m">= 9</span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= 8</span>\n<span class="cn"><span class="fr">et pas 6</span><span class="it inl">e non 6</span></span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= <span class="frac"><span>1</span><span>4</span></span></span>\n<span class="cl">2.</span><span class="cg m"><i>A</i></span><span class="cd m">= 4</span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= −8</span>\n<span class="cn"><span class="fr">exposant impair</span><span class="it inl">esponente dispari</span></span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= −4</span>\n<span class="cn"><span class="fr">le carré ne porte que sur 2</span><span class="it inl">il quadrato riguarda solo il 2</span></span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e41', group: 'calc', num: '41', page: 100,
  title: { fr: 'Puissances de 10', it: 'Potenze di 10' },
  text: '<p class="fr">Écrire sous la forme <span class="m nw">10<sup><i>n</i></sup></span>, où <span class="m nw"><i>n</i></span> est un entier relatif.</p>\n<p class="it">Scrivi nella forma <span class="m nw">10<sup><i>n</i></sup></span>, con <span class="m nw"><i>n</i></span> intero relativo.</p>\n<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= <span class="frac"><span>10<sup>7</sup></span><span>10<sup>3</sup> × 10<sup>2</sup></span></span></span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= <span class="frac"><span>10<sup>−7</sup> × 10<sup>8</sup></span><span>10<sup>5</sup></span></span></span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= <span class="frac"><span>(10<sup>−2</sup>)<sup>4</sup></span><span>10<sup>14</sup></span></span></span>\n</div>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= <span class="frac"><span>10<sup>7</sup></span><span>10<sup>5</sup></span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 10<sup>7−5</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 10<sup>2</sup></span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= <span class="frac"><span>10<sup>1</sup></span><span>10<sup>5</sup></span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 10<sup>1−5</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 10<sup>−4</sup></span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= <span class="frac"><span>10<sup>−8</sup></span><span>10<sup>14</sup></span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 10<sup>−8−14</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 10<sup>−22</sup></span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e90', group: 'calc', num: '90', page: 103,
  title: { fr: 'Tout en puissances de 3', it: 'Tutto in potenze di 3' },
  text: '<p class="fr">Écrire chaque nombre sous la forme <span class="m nw">3<sup><i>p</i></sup></span>, où <span class="m nw"><i>p</i></span> est un entier relatif.</p>\n<p class="it">Scrivi ogni numero nella forma <span class="m nw">3<sup><i>p</i></sup></span>, con <span class="m nw"><i>p</i></span> intero relativo.</p>\n<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= 27 × 9<sup>5</sup></span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= <span class="frac"><span>81<sup>4</sup> × 9<sup>−2</sup></span><span>27<sup>−3</sup></span></span></span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= 9<sup>−3</sup> × 81<sup>2</sup></span>\n</div>',
  parts: [
    { kind: 'self',
      hint: '<div class="calc">\n<span class="cl"></span><span class="cg m">9</span><span class="cd m">= 3<sup>2</sup></span>\n<span class="cl"></span><span class="cg m">27</span><span class="cd m">= 3<sup>3</sup></span>\n<span class="cl"></span><span class="cg m">81</span><span class="cd m">= 3<sup>4</sup></span>\n</div>',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= 3<sup>3</sup> × (3<sup>2</sup>)<sup>5</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 3<sup>3</sup> × 3<sup>10</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 3<sup>13</sup></span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= <span class="frac"><span>(3<sup>4</sup>)<sup>4</sup> × (3<sup>2</sup>)<sup>−2</sup></span><span>(3<sup>3</sup>)<sup>−3</sup></span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= <span class="frac"><span>3<sup>16</sup> × 3<sup>−4</sup></span><span>3<sup>−9</sup></span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 3<sup>12 − (−9)</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 3<sup>21</sup></span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= (3<sup>2</sup>)<sup>−3</sup> × (3<sup>4</sup>)<sup>2</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 3<sup>−6</sup> × 3<sup>8</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 3<sup>2</sup></span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e92', group: 'calc', num: '92', page: 103,
  tag: { fr: 'QCM', it: 'QUIZ' },
  title: { fr: 'Multiples et puissances', it: 'Multipli e potenze' },
  parts: [
    { kind: 'choice',
      q: '<p class="fr"><span class="m nw">2<sup>10</sup> + 2<sup>10</sup></span> est égal à\u00a0:</p>\n<p class="it"><span class="m nw">2<sup>10</sup> + 2<sup>10</sup></span> è uguale a:</p>',
      choices: [
        '<span class="m nw">4<sup>10</sup></span>',
        '<span class="m nw">2<sup>20</sup></span>',
        '<span class="m nw">2<sup>11</sup></span>',
        '<span class="m nw">4<sup>20</sup></span>'
      ],
      correct: 2,
      fb: [
        '<p class="fr">On n’additionne pas les bases. <span class="m nw">4<sup>10</sup> = 2<sup>20</sup></span>, c’est beaucoup trop grand.</p>\n<p class="it">Le basi non si sommano. <span class="m nw">4<sup>10</sup> = 2<sup>20</sup></span>, è molto più grande.</p>',
        '<p class="fr">Additionner les exposants, c’est pour un <b>produit</b>. Ici c’est une somme.</p>\n<p class="it">Gli esponenti si sommano per un <b>prodotto</b>. Qui è una somma.</p>',
        '<p class="fr"><span class="calc"><span class="cl"></span><span class="cg m">2<sup>10</sup> + 2<sup>10</sup></span><span class="cd m">= 2 × 2<sup>10</sup></span><span class="cl"></span><span class="cg m"></span><span class="cd m">= 2<sup>11</sup></span></span> (deux fois la même chose).</p>\n<p class="it"><span class="calc"><span class="cl"></span><span class="cg m">2<sup>10</sup> + 2<sup>10</sup></span><span class="cd m">= 2 × 2<sup>10</sup></span><span class="cl"></span><span class="cg m"></span><span class="cd m">= 2<sup>11</sup></span></span> (due volte la stessa cosa).</p>',
        '<p class="fr">Tu as additionné les bases et les exposants. Pense «\u00a0deux fois <span class="m nw">2<sup>10</sup></span>\u00a0».</p>\n<p class="it">Hai sommato le basi e gli esponenti. Pensa «due volte <span class="m nw">2<sup>10</sup></span>».</p>'
      ] },
    { kind: 'choice',
      q: '<p class="fr"><span class="m nw">2 × 5<sup>3</sup> × 11<sup>4</sup></span> est un multiple de\u00a0:</p>\n<p class="it"><span class="m nw">2 × 5<sup>3</sup> × 11<sup>4</sup></span> è un multiplo di:</p>\n<p class="fr small">Plusieurs réponses sont justes\u00a0: trouve-les toutes.</p>\n<p class="it small">Più risposte sono giuste: trovale tutte.</p>',
      choices: [
        '15',
        '20',
        '50',
        '110'
      ],
      correct: [2, 3],
      fb: [
        '<p class="fr"><span class="m nw">15 = 3 × 5</span>, et il n’y a pas de facteur 3 dans le nombre.</p>\n<p class="it"><span class="m nw">15 = 3 × 5</span>, e nel numero non c’è nessun fattore 3.</p>',
        '<p class="fr"><span class="m nw">20 = 2<sup>2</sup> × 5</span>\u00a0: il faudrait deux facteurs 2, il n’y en a qu’un.</p>\n<p class="it"><span class="m nw">20 = 2<sup>2</sup> × 5</span>: servirebbero due fattori 2, ce n’è solo uno.</p>',
        '<p class="fr"><span class="m nw">50 = 2 × 5<sup>2</sup></span>, et le nombre contient un 2 et trois 5. Il y a une autre bonne réponse.</p>\n<p class="it"><span class="m nw">50 = 2 × 5<sup>2</sup></span>, e il numero contiene un 2 e tre 5. C’è un’altra risposta giusta.</p>',
        '<p class="fr"><span class="m nw">110 = 2 × 5 × 11</span>\u00a0: les trois facteurs sont présents. Il y a une autre bonne réponse.</p>\n<p class="it"><span class="m nw">110 = 2 × 5 × 11</span>: i tre fattori sono presenti. C’è un’altra risposta giusta.</p>'
      ] }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e15', group: 'calc', num: '15', page: 85,
  title: { fr: 'Écriture scientifique', it: 'Notazione scientifica' },
  text: '<p class="fr">On considère <span class="m nw"><i>A</i> = 90\u00a0000\u00a0000</span> et <span class="m nw"><i>B</i> = 0,000 03</span>. <br><b>1.</b> Donner l’écriture scientifique de A et de B. <br><b>2.</b> En déduire celle de <span class="m nw"><i>A</i> × <i>B</i></span>, puis celle de <span class="m nw"><span class="frac"><span><i>A</i></span><span><i>B</i></span></span></span>.</p>\n<p class="it">Consideriamo <span class="m nw"><i>A</i> = 90\u00a0000\u00a0000</span> e <span class="m nw"><i>B</i> = 0,000 03</span>. <br><b>1.</b> Scrivi A e B in notazione scientifica. <br><b>2.</b> Deduci la notazione scientifica di <span class="m nw"><i>A</i> × <i>B</i></span> e poi di <span class="m nw"><span class="frac"><span><i>A</i></span><span><i>B</i></span></span></span>.</p>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl">1.</span><span class="cg m"><i>A</i></span><span class="cd m">= 9 × 10<sup>7</sup></span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= 3 × 10<sup>−5</sup></span>\n<span class="cl">2.</span><span class="cg m"><i>A</i> × <i>B</i></span><span class="cd m">= 27 × 10<sup>7 + (−5)</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 27 × 10<sup>2</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 2,7 × 10<sup>3</sup></span>\n<span class="cn"><span class="fr">27 n’est pas entre 1 et 10</span><span class="it inl">27 non è compreso tra 1 e 10</span></span>\n<span class="cl"></span><span class="cg m"><span class="frac"><span><i>A</i></span><span><i>B</i></span></span></span><span class="cd m">= <span class="frac"><span>9</span><span>3</span></span> × 10<sup>7 − (−5)</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 3 × 10<sup>12</sup></span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3a1', group: 'calc', num: 'A1', page: 86,
  tag: { fr: 'ACTIVITÉ', it: 'ATTIVITÀ' },
  title: { fr: 'Gravure des microprocesseurs', it: 'L’incisione dei microprocessori' },
  text: '<div class="fr"><p>Le transistor, inventé en 1948, a permis de miniaturiser les composants électroniques, en particulier les microprocesseurs. La finesse de gravure des plaques de silicium se mesure en nanomètres (nm).</p>\n<ol>\n<li>Compléter à l’aide d’une puissance de 10\u00a0: 1\u00a0nm = …… m.</li>\n<li>L’Intel 4004 (1971) était gravé en 10\u00a0000\u00a0nm. Donner l’écriture scientifique de cette finesse\u00a0: <br><b>a.</b> en nanomètres\u00a0; <br><b>b.</b> en millimètres\u00a0; <br><b>c.</b> en mètres.</li>\n<li>Il comportait 2\u00a0300 transistors. On suppose que la finesse de gravure correspond à la taille d’un transistor. En les alignant tous, quelle longueur obtient-on, en millimètres\u00a0?</li>\n<li>L’Intel i7 Skylake (2015) comptait <span class="m nw">1,75 × 10<sup>9</sup></span> transistors. <br><b>a.</b> S’ils étaient gravés en 10\u00a0000\u00a0nm et alignés côte à côte, montrer qu’on atteindrait 17,5 kilomètres. <br><b>b.</b> En fait, il était gravé en 14\u00a0nm. Peut-on placer tous ces transistors sur une plaque carrée de 4,2\u00a0cm de côté\u00a0?</li>\n</ol></div>\n<div class="it"><p>Il transistor, inventato nel 1948, ha permesso di miniaturizzare i componenti elettronici, in particolare i microprocessori. La finezza di incisione delle piastre di silicio si misura in nanometri (nm).</p>\n<ol>\n<li>Completa con una potenza di 10: 1\u00a0nm = …… m.</li>\n<li>L’Intel 4004 (1971) era inciso a 10\u00a0000\u00a0nm. Scrivi questa finezza in notazione scientifica: <br><b>a.</b> in nanometri; <br><b>b.</b> in millimetri; <br><b>c.</b> in metri.</li>\n<li>Conteneva 2\u00a0300 transistor. Supponiamo che la finezza di incisione corrisponda alla dimensione di un transistor. Mettendoli tutti in fila, che lunghezza si ottiene, in millimetri?</li>\n<li>L’Intel i7 Skylake (2015) aveva <span class="m nw">1,75 × 10<sup>9</sup></span> transistor. <br><b>a.</b> Se fossero incisi a 10\u00a0000\u00a0nm e allineati, mostra che si arriverebbe a 17,5 chilometri. <br><b>b.</b> In realtà era inciso a 14\u00a0nm. Si possono mettere tutti questi transistor su una piastra quadrata di 4,2\u00a0cm di lato?</li>\n</ol></div>',
  parts: [
    { kind: 'self',
      hint: '<p class="fr">1\u00a0m = <span class="m nw">10<sup>3</sup></span> mm = <span class="m nw">10<sup>9</sup></span> nm. Pour 4.b, compte combien de transistors tiennent sur un côté de la plaque, puis sur toute la plaque.</p>\n<p class="it">1\u00a0m = <span class="m nw">10<sup>3</sup></span> mm = <span class="m nw">10<sup>9</sup></span> nm. Per il 4.b conta quanti transistor stanno su un lato della piastra, poi su tutta la piastra.</p>',
      sol: '<div class="calc">\n<p class="ct">1. 1\u00a0nm = <span class="m nw">10<sup>−9</sup></span> m</p>\n<p class="ct">2. a. <span class="m nw">10\u00a0000</span> nm = <span class="m nw">1 × 10<sup>4</sup></span> nm · b. <span class="m nw">10<sup>4</sup> × 10<sup>−6</sup></span> mm = <span class="m nw">1 × 10<sup>−2</sup></span> mm · c. <span class="m nw">10<sup>4</sup> × 10<sup>−9</sup></span> m = <span class="m nw">1 × 10<sup>−5</sup></span> m</p>\n<p class="ct">3. <span class="m nw">2\u00a0300 × 10<sup>−2</sup></span> mm = 23\u00a0mm</p>\n<p class="ct">4. a. <span class="m nw">1,75 × 10<sup>9</sup> × 10<sup>−5</sup></span> m = <span class="m nw">1,75 × 10<sup>4</sup></span> m = 17\u00a0500\u00a0m = 17,5\u00a0km</p>\n<p class="ct">4. b. 4,2\u00a0cm = <span class="m nw">4,2 × 10<sup>7</sup></span> nm\u00a0; <span class="m nw"><span class="frac"><span>4,2 × 10<sup>7</sup></span><span>14</span></span> = 3 × 10<sup>6</sup></span> <span class="why"><span class="fr">transistors par côté</span><span class="it inl">transistor per lato</span></span></p>\n<span class="cl"></span><span class="cg m">(3 × 10<sup>6</sup>)<sup>2</sup></span><span class="cd m">= 9 × 10<sup>12</sup></span>\n<span class="cn"><span class="fr">transistors sur la plaque</span><span class="it inl">transistor sulla piastra</span></span>\n</div>\n<p class="fr"><span class="m nw">9 × 10<sup>12</sup></span> est bien plus grand que <span class="m nw">1,75 × 10<sup>9</sup></span>\u00a0: oui, ils tiennent largement (environ 5\u00a0000 fois).</p>\n<p class="it"><span class="m nw">9 × 10<sup>12</sup></span> è molto più grande di <span class="m nw">1,75 × 10<sup>9</sup></span>: sì, ci stanno ampiamente (circa 5\u00a0000 volte).</p>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3a2', group: 'rac', num: 'A2', page: 86,
  tag: { fr: 'ACTIVITÉ', it: 'ATTIVITÀ' },
  title: { fr: 'Des carrés à la racine', it: 'Dai quadrati alla radice' },
  text: '<div class="fr"><ol>\n<li><b>a.</b> Le carré ABCD est tel que AB = 6. Quelle est son aire\u00a0? <br><b>b.</b> L’aire du carré EFGH est 6. Quelle est la longueur EF\u00a0?</li>\n<li>L’aire du carré MNOP est 54. <b>a.</b> Combien faut-il de carrés EFGH pour le paver entièrement, sans chevauchement\u00a0? <br><b>b.</b> Quelle est la longueur MN\u00a0? <br><b>c.</b> Compléter\u00a0: MN = … × EF. <br><b>d.</b> En déduire une écriture simplifiée de <span class="m nw"><span class="sqrt"><span class="rad">54</span></span></span>.</li>\n<li>Un carré a pour aire 8. <b>a.</b> Combien faut-il de carrés d’aire 2 pour le paver\u00a0? <br><b>b.</b> En déduire une écriture simplifiée de <span class="m nw"><span class="sqrt"><span class="rad">8</span></span></span>.</li>\n<li>En remarquant que <span class="m nw">75 = 3 × 25</span>, déterminer une écriture simplifiée de <span class="m nw"><span class="sqrt"><span class="rad">75</span></span></span>.</li>\n</ol></div>\n<div class="it"><ol>\n<li><b>a.</b> Il quadrato ABCD è tale che AB = 6. Qual è la sua area? <br><b>b.</b> L’area del quadrato EFGH è 6. Quanto misura EF?</li>\n<li>L’area del quadrato MNOP è 54. <b>a.</b> Quanti quadrati EFGH servono per ricoprirlo interamente, senza sovrapposizioni? <br><b>b.</b> Quanto misura MN? <br><b>c.</b> Completa: MN = … × EF. <br><b>d.</b> Deduci una scrittura semplificata di <span class="m nw"><span class="sqrt"><span class="rad">54</span></span></span>.</li>\n<li>Un quadrato ha area 8. <b>a.</b> Quanti quadrati di area 2 servono per ricoprirlo? <br><b>b.</b> Deduci una scrittura semplificata di <span class="m nw"><span class="sqrt"><span class="rad">8</span></span></span>.</li>\n<li>Osservando che <span class="m nw">75 = 3 × 25</span>, determina una scrittura semplificata di <span class="m nw"><span class="sqrt"><span class="rad">75</span></span></span>.</li>\n</ol></div>',
  parts: [
    { kind: 'self',
      sol: '<figure><svg class="fig" viewbox="0 0 420 200" role="img" aria-label="Un carré d\'aire 54 pavé par 9 carrés d\'aire 6"><rect class="fb2" x="40" y="70" width="46" height="46"/><text class="lb" x="63.0" y="98.0">6</text><text class="lb" x="63.0" y="138">EF = √6</text><rect class="fa" x="220" y="20" width="46" height="46"/><text class="lb sm" x="243.0" y="48.0">6</text><rect class="fa" x="266" y="20" width="46" height="46"/><text class="lb sm" x="289.0" y="48.0">6</text><rect class="fa" x="312" y="20" width="46" height="46"/><text class="lb sm" x="335.0" y="48.0">6</text><rect class="fa" x="220" y="66" width="46" height="46"/><text class="lb sm" x="243.0" y="94.0">6</text><rect class="fa" x="266" y="66" width="46" height="46"/><text class="lb sm" x="289.0" y="94.0">6</text><rect class="fa" x="312" y="66" width="46" height="46"/><text class="lb sm" x="335.0" y="94.0">6</text><rect class="fa" x="220" y="112" width="46" height="46"/><text class="lb sm" x="243.0" y="140.0">6</text><rect class="fa" x="266" y="112" width="46" height="46"/><text class="lb sm" x="289.0" y="140.0">6</text><rect class="fa" x="312" y="112" width="46" height="46"/><text class="lb sm" x="335.0" y="140.0">6</text><text class="lb" x="289.0" y="180">MN = 3 × EF = 3√6</text><text class="lb sm" x="206" y="162">M</text><text class="lb sm" x="370" y="162">N</text><text class="lb sm" x="34" y="120">E</text><text class="lb sm" x="94" y="120">F</text></svg><figcaption><span class="fr">9 carrés d’aire 6, rangés 3 par 3, forment un carré d’aire 54.</span><span class="it">9 quadrati di area 6, disposti 3 per 3, formano un quadrato di area 54.</span></figcaption></figure>\n<div class="calc">\n<p class="ct">1. a. <span class="m nw">6<sup>2</sup> = 36</span> · b. EF = <span class="m nw"><span class="sqrt"><span class="rad">6</span></span></span></p>\n<p class="ct">2. a. <span class="m nw">54 ÷ 6 = 9</span> <span class="fr">carrés, rangés en 3 lignes de 3</span><span class="it inl">quadrati, disposti in 3 righe da 3</span></p>\n<p class="ct">b. MN = <span class="m nw"><span class="sqrt"><span class="rad">54</span></span></span> · c. MN = 3 × EF · d. <span class="m nw"><span class="sqrt"><span class="rad">54</span></span> = 3<span class="sqrt"><span class="rad">6</span></span></span></p>\n<p class="ct">3. a. <span class="m nw">8 ÷ 2 = 4</span> <span class="fr">carrés (2 × 2)</span><span class="it inl">quadrati (2 × 2)</span> · b. <span class="m nw"><span class="sqrt"><span class="rad">8</span></span> = 2<span class="sqrt"><span class="rad">2</span></span></span></p>\n<p class="ct">4. <span class="m nw">75 = 25 × 3</span>\u00a0: <span class="fr">25 carrés d’aire 3 rangés 5 par 5, donc</span><span class="it inl">25 quadrati di area 3 disposti 5 per 5, quindi</span> <span class="m nw"><span class="sqrt"><span class="rad">75</span></span> = 5<span class="sqrt"><span class="rad">3</span></span></span></p>\n</div>\n<p class="fr">Ce que l’activité fait découvrir\u00a0: <span class="calc"><span class="cl"></span><span class="cg m"><span class="sqrt"><span class="rad">54</span></span></span><span class="cd m">= <span class="sqrt"><span class="rad">9 × 6</span></span></span><span class="cl"></span><span class="cg m"></span><span class="cd m">= <span class="sqrt"><span class="rad">9</span></span> × <span class="sqrt"><span class="rad">6</span></span></span><span class="cl"></span><span class="cg m"></span><span class="cd m">= 3<span class="sqrt"><span class="rad">6</span></span></span></span> C’est la propriété du paragraphe suivant.</p>\n<p class="it">Che cosa fa scoprire l’attività: <span class="calc"><span class="cl"></span><span class="cg m"><span class="sqrt"><span class="rad">54</span></span></span><span class="cd m">= <span class="sqrt"><span class="rad">9 × 6</span></span></span><span class="cl"></span><span class="cg m"></span><span class="cd m">= <span class="sqrt"><span class="rad">9</span></span> × <span class="sqrt"><span class="rad">6</span></span></span><span class="cl"></span><span class="cg m"></span><span class="cd m">= 3<span class="sqrt"><span class="rad">6</span></span></span></span> È la proprietà del paragrafo seguente.</p>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e44', group: 'rac', num: '44', page: 100,
  tag: { fr: 'QCM', it: 'QUIZ' },
  title: { fr: 'Produit et quotient de racines', it: 'Prodotto e quoziente di radici' },
  parts: [
    { kind: 'choice',
      q: '<p class="fr">Le produit <span class="m nw"><span class="sqrt"><span class="rad">18</span></span> × <span class="sqrt"><span class="rad">2</span></span></span> est égal à\u00a0:</p>\n<p class="it">Il prodotto <span class="m nw"><span class="sqrt"><span class="rad">18</span></span> × <span class="sqrt"><span class="rad">2</span></span></span> è uguale a:</p>',
      choices: [
        '3',
        '6',
        '9',
        '18'
      ],
      correct: 1,
      fb: [
        '<p class="fr">3, c’est le quotient <span class="m nw"><span class="frac"><span><span class="sqrt"><span class="rad">18</span></span></span><span><span class="sqrt"><span class="rad">2</span></span></span></span></span>. Ici on multiplie\u00a0: <span class="m nw"><span class="sqrt"><span class="rad">18 × 2</span></span> = <span class="sqrt"><span class="rad">36</span></span></span>.</p>\n<p class="it">3 è il quoziente <span class="m nw"><span class="frac"><span><span class="sqrt"><span class="rad">18</span></span></span><span><span class="sqrt"><span class="rad">2</span></span></span></span></span>. Qui si moltiplica: <span class="m nw"><span class="sqrt"><span class="rad">18 × 2</span></span> = <span class="sqrt"><span class="rad">36</span></span></span>.</p>',
        '<p class="fr"><span class="m nw"><span class="sqrt"><span class="rad">18</span></span> × <span class="sqrt"><span class="rad">2</span></span> = <span class="sqrt"><span class="rad">36</span></span> = 6</span>.</p>\n<p class="it"><span class="m nw"><span class="sqrt"><span class="rad">18</span></span> × <span class="sqrt"><span class="rad">2</span></span> = <span class="sqrt"><span class="rad">36</span></span> = 6</span>.</p>',
        '<p class="fr">9, c’est <span class="m nw"><span class="frac"><span>18</span><span>2</span></span></span> sans les racines.</p>\n<p class="it">9 è <span class="m nw"><span class="frac"><span>18</span><span>2</span></span></span> senza le radici.</p>',
        '<p class="fr">18 est le nombre sous la première racine, pas le résultat du produit\u00a0: <span class="m nw"><span class="sqrt"><span class="rad">18</span></span> × <span class="sqrt"><span class="rad">2</span></span> = <span class="sqrt"><span class="rad">36</span></span> = 6</span>.</p>\n<p class="it">18 è il numero sotto la prima radice, non il risultato del prodotto: <span class="m nw"><span class="sqrt"><span class="rad">18</span></span> × <span class="sqrt"><span class="rad">2</span></span> = <span class="sqrt"><span class="rad">36</span></span> = 6</span>.</p>'
      ] },
    { kind: 'choice',
      q: '<p class="fr">Le quotient <span class="m nw"><span class="frac"><span><span class="sqrt"><span class="rad">18</span></span></span><span><span class="sqrt"><span class="rad">2</span></span></span></span></span> est égal à\u00a0:</p>\n<p class="it">Il quoziente <span class="m nw"><span class="frac"><span><span class="sqrt"><span class="rad">18</span></span></span><span><span class="sqrt"><span class="rad">2</span></span></span></span></span> è uguale a:</p>',
      choices: [
        '3',
        '6',
        '9',
        '18'
      ],
      correct: 0,
      fb: [
        '<p class="fr"><span class="m nw"><span class="frac"><span><span class="sqrt"><span class="rad">18</span></span></span><span><span class="sqrt"><span class="rad">2</span></span></span></span> = <span class="sqrt gr"><span class="rad"><span class="frac"><span>18</span><span>2</span></span></span></span> = <span class="sqrt"><span class="rad">9</span></span> = 3</span>.</p>\n<p class="it"><span class="m nw"><span class="frac"><span><span class="sqrt"><span class="rad">18</span></span></span><span><span class="sqrt"><span class="rad">2</span></span></span></span> = <span class="sqrt gr"><span class="rad"><span class="frac"><span>18</span><span>2</span></span></span></span> = <span class="sqrt"><span class="rad">9</span></span> = 3</span>.</p>',
        '<p class="fr">6 est le produit. Pour le quotient\u00a0: <span class="m nw"><span class="sqrt gr"><span class="rad"><span class="frac"><span>18</span><span>2</span></span></span></span> = <span class="sqrt"><span class="rad">9</span></span></span>.</p>\n<p class="it">6 è il prodotto. Per il quoziente: <span class="m nw"><span class="sqrt gr"><span class="rad"><span class="frac"><span>18</span><span>2</span></span></span></span> = <span class="sqrt"><span class="rad">9</span></span></span>.</p>',
        '<p class="fr">Tu as calculé <span class="m nw"><span class="frac"><span>18</span><span>2</span></span> = 9</span> mais oublié la racine\u00a0: <span class="m nw"><span class="sqrt"><span class="rad">9</span></span> = 3</span>.</p>\n<p class="it">Hai calcolato <span class="m nw"><span class="frac"><span>18</span><span>2</span></span> = 9</span> ma hai dimenticato la radice: <span class="m nw"><span class="sqrt"><span class="rad">9</span></span> = 3</span>.</p>',
        '<p class="fr">Divise d’abord sous la racine\u00a0: <span class="m nw"><span class="sqrt gr"><span class="rad"><span class="frac"><span>18</span><span>2</span></span></span></span> = <span class="sqrt"><span class="rad">9</span></span> = 3</span>.</p>\n<p class="it">Dividi prima sotto la radice: <span class="m nw"><span class="sqrt gr"><span class="rad"><span class="frac"><span>18</span><span>2</span></span></span></span> = <span class="sqrt"><span class="rad">9</span></span> = 3</span>.</p>'
      ] }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e45', group: 'rac', num: '45', page: 100,
  title: { fr: 'Compter les racines', it: 'Contare le radici' },
  text: '<p class="fr">Écrire chaque nombre sous la forme <span class="m nw"><i>a</i><span class="sqrt"><span class="rad"><i>b</i></span></span></span>.</p>\n<p class="it">Scrivi ogni numero nella forma <span class="m nw"><i>a</i><span class="sqrt"><span class="rad"><i>b</i></span></span></span>.</p>\n<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= 3<span class="sqrt"><span class="rad">2</span></span> + 5<span class="sqrt"><span class="rad">2</span></span></span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= 7<span class="sqrt"><span class="rad">6</span></span> − 9<span class="sqrt"><span class="rad">6</span></span></span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= −2<span class="sqrt"><span class="rad">3</span></span> + 3<span class="sqrt"><span class="rad">3</span></span></span>\n<span class="cl"></span><span class="cg m"><i>D</i></span><span class="cd m">= −<span class="sqrt"><span class="rad">7</span></span> − 4<span class="sqrt"><span class="rad">7</span></span></span>\n</div>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= 8<span class="sqrt"><span class="rad">2</span></span></span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= −2<span class="sqrt"><span class="rad">6</span></span></span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= <span class="sqrt"><span class="rad">3</span></span></span>\n<span class="cl"></span><span class="cg m"><i>D</i></span><span class="cd m">= −5<span class="sqrt"><span class="rad">7</span></span></span>\n</div>\n<p class="fr small">Pour D, <span class="m nw">−<span class="sqrt"><span class="rad">7</span></span></span> compte pour <span class="m nw">−1<span class="sqrt"><span class="rad">7</span></span></span>.</p>\n<p class="it small">Per D, <span class="m nw">−<span class="sqrt"><span class="rad">7</span></span></span> vale <span class="m nw">−1<span class="sqrt"><span class="rad">7</span></span></span>.</p>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e98', group: 'rac', num: '98', page: 103,
  title: { fr: 'Entiers cachés et forme a√b', it: 'Interi nascosti e forma a√b' },
  text: '<p class="fr"><b>1.</b> Justifier que <span class="m nw"><i>A</i> = <span class="sqrt"><span class="rad">3</span></span> × <span class="sqrt"><span class="rad">12</span></span></span>, <span class="m nw"><i>B</i> = <span class="frac"><span><span class="sqrt"><span class="rad">96</span></span></span><span><span class="sqrt"><span class="rad">6</span></span></span></span></span> et <span class="m nw"><i>C</i> = <span class="sqrt"><span class="rad">5</span></span> × <span class="sqrt"><span class="rad">180</span></span></span> sont des entiers. <br><b>2.</b> Écrire <span class="m nw"><i>D</i> = <span class="sqrt"><span class="rad">90</span></span></span>, <span class="m nw"><i>E</i> = 7<span class="sqrt"><span class="rad">5</span></span> − 4<span class="sqrt"><span class="rad">5</span></span></span> et <span class="m nw"><i>F</i> = 2<span class="sqrt"><span class="rad">27</span></span> − 5<span class="sqrt"><span class="rad">48</span></span></span> sous la forme <span class="m nw"><i>a</i><span class="sqrt"><span class="rad"><i>b</i></span></span></span>, <span class="m nw"><i>b</i></span> le plus petit possible.</p>\n<p class="it"><b>1.</b> Giustifica che <span class="m nw"><i>A</i> = <span class="sqrt"><span class="rad">3</span></span> × <span class="sqrt"><span class="rad">12</span></span></span>, <span class="m nw"><i>B</i> = <span class="frac"><span><span class="sqrt"><span class="rad">96</span></span></span><span><span class="sqrt"><span class="rad">6</span></span></span></span></span> e <span class="m nw"><i>C</i> = <span class="sqrt"><span class="rad">5</span></span> × <span class="sqrt"><span class="rad">180</span></span></span> sono interi. <br><b>2.</b> Scrivi <span class="m nw"><i>D</i> = <span class="sqrt"><span class="rad">90</span></span></span>, <span class="m nw"><i>E</i> = 7<span class="sqrt"><span class="rad">5</span></span> − 4<span class="sqrt"><span class="rad">5</span></span></span> e <span class="m nw"><i>F</i> = 2<span class="sqrt"><span class="rad">27</span></span> − 5<span class="sqrt"><span class="rad">48</span></span></span> nella forma <span class="m nw"><i>a</i><span class="sqrt"><span class="rad"><i>b</i></span></span></span>, con <span class="m nw"><i>b</i></span> il più piccolo possibile.</p>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= <span class="sqrt"><span class="rad">36</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 6</span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= <span class="sqrt gr"><span class="rad"><span class="frac"><span>96</span><span>6</span></span></span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= <span class="sqrt"><span class="rad">16</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 4</span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= <span class="sqrt"><span class="rad">900</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 30</span>\n<span class="cl"></span><span class="cg m"><i>D</i></span><span class="cd m">= <span class="sqrt"><span class="rad">9 × 10</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 3<span class="sqrt"><span class="rad">10</span></span></span>\n<span class="cl"></span><span class="cg m"><i>E</i></span><span class="cd m">= 3<span class="sqrt"><span class="rad">5</span></span></span>\n<span class="cl"></span><span class="cg m"><i>F</i></span><span class="cd m">= 2<span class="sqrt"><span class="rad">9 × 3</span></span> − 5<span class="sqrt"><span class="rad">16 × 3</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 6<span class="sqrt"><span class="rad">3</span></span> − 20<span class="sqrt"><span class="rad">3</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= −14<span class="sqrt"><span class="rad">3</span></span></span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e103', group: 'rac', num: '103', page: 104,
  title: { fr: 'Simplifier puis réduire', it: 'Semplificare e poi ridurre' },
  text: '<div class="calc">\n<span class="cl">a.</span><span class="ce m">3<span class="sqrt"><span class="rad">3</span></span> − 2<span class="sqrt"><span class="rad">12</span></span> + <span class="sqrt"><span class="rad">300</span></span></span>\n<span class="cl">b.</span><span class="ce m">3<span class="sqrt"><span class="rad">5</span></span> − <span class="sqrt"><span class="rad">20</span></span> − 3<span class="sqrt"><span class="rad">45</span></span></span>\n</div>',
  parts: [
    { kind: 'self',
      hint: '<div class="calc">\n<span class="cl"></span><span class="cg m">12</span><span class="cd m">= 4 × 3</span>\n<span class="cl"></span><span class="cg m">300</span><span class="cd m">= 100 × 3</span>\n<span class="cl"></span><span class="cg m">20</span><span class="cd m">= 4 × 5</span>\n<span class="cl"></span><span class="cg m">45</span><span class="cd m">= 9 × 5</span>\n</div>',
      sol: '<div class="calc">\n<span class="cl">a.</span><span class="ce m">3<span class="sqrt"><span class="rad">3</span></span> − 2 × 2<span class="sqrt"><span class="rad">3</span></span> + 10<span class="sqrt"><span class="rad">3</span></span></span>\n<span class="cl"></span><span class="ce m">= (3 − 4 + 10)<span class="sqrt"><span class="rad">3</span></span></span>\n<span class="cl"></span><span class="ce m">= 9<span class="sqrt"><span class="rad">3</span></span></span>\n<span class="cl">b.</span><span class="ce m">3<span class="sqrt"><span class="rad">5</span></span> − 2<span class="sqrt"><span class="rad">5</span></span> − 3 × 3<span class="sqrt"><span class="rad">5</span></span></span>\n<span class="cl"></span><span class="ce m">= (3 − 2 − 9)<span class="sqrt"><span class="rad">5</span></span></span>\n<span class="cl"></span><span class="ce m">= −8<span class="sqrt"><span class="rad">5</span></span></span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e108', group: 'rac', num: '108', page: 104,
  title: { fr: 'Sans racine au dénominateur', it: 'Razionalizzare' },
  text: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= <span class="frac"><span>2</span><span><span class="sqrt"><span class="rad">2</span></span></span></span></span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= <span class="frac"><span>21</span><span><span class="sqrt"><span class="rad">7</span></span></span></span></span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= <span class="frac"><span>9</span><span><span class="sqrt"><span class="rad">3</span></span></span></span></span>\n<span class="cl"></span><span class="cg m"><i>D</i></span><span class="cd m">= <span class="frac"><span>3</span><span><span class="sqrt"><span class="rad">5</span></span></span></span></span>\n</div>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= <span class="frac"><span>2<span class="sqrt"><span class="rad">2</span></span></span><span>2</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= <span class="sqrt"><span class="rad">2</span></span></span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= <span class="frac"><span>21<span class="sqrt"><span class="rad">7</span></span></span><span>7</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 3<span class="sqrt"><span class="rad">7</span></span></span>\n<span class="cl"></span><span class="cg m"><i>C</i></span><span class="cd m">= <span class="frac"><span>9<span class="sqrt"><span class="rad">3</span></span></span><span>3</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 3<span class="sqrt"><span class="rad">3</span></span></span>\n<span class="cl"></span><span class="cg m"><i>D</i></span><span class="cd m">= <span class="frac"><span>3<span class="sqrt"><span class="rad">5</span></span></span><span>5</span></span></span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e110', group: 'rac', num: '110', page: 104,
  title: { fr: 'Racines et Pythagore', it: 'Radici e Pitagora' },
  text: '<p class="fr">ABC est rectangle en A, avec AC = 3\u00a0cm et AB = <span class="m nw">3<span class="sqrt"><span class="rad">2</span></span></span> cm. Montrer que BC = <span class="m nw">3<span class="sqrt"><span class="rad">3</span></span></span> cm.</p>\n<p class="it">ABC è rettangolo in A, con AC = 3\u00a0cm e AB = <span class="m nw">3<span class="sqrt"><span class="rad">2</span></span></span> cm. Dimostra che BC = <span class="m nw">3<span class="sqrt"><span class="rad">3</span></span></span> cm.</p>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>BC</i><sup>2</sup></span><span class="cd m">= <i>AB</i><sup>2</sup> + <i>AC</i><sup>2</sup></span>\n<span class="cn"><span class="fr">théorème de Pythagore</span><span class="it inl">teorema di Pitagora</span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= (3<span class="sqrt"><span class="rad">2</span></span>)<sup>2</sup> + 3<sup>2</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 9 × 2 + 9</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 27</span>\n<span class="cl"></span><span class="cg m"><i>BC</i></span><span class="cd m">= <span class="sqrt"><span class="rad">27</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= <span class="sqrt"><span class="rad">9 × 3</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 3<span class="sqrt"><span class="rad">3</span></span>\u00a0cm</span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e112', group: 'rac', num: '112', page: 104,
  title: { fr: 'Racine d’un carré', it: 'Radice di un quadrato' },
  text: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i></span><span class="cd m">= <span class="sqrt"><span class="rad">(−1)<sup>2</sup></span></span></span>\n<span class="cl"></span><span class="cg m"><i>B</i></span><span class="cd m">= <span class="sqrt"><span class="rad">(3 + <span class="sqrt"><span class="rad">2</span></span>)<sup>2</sup></span></span></span>\n</div>',
  parts: [
    { kind: 'self',
      sol: '<p class="fr"><span class="m nw"><i>A</i> = |−1| = 1</span>. <span class="m nw"><i>B</i> = 3 + <span class="sqrt"><span class="rad">2</span></span></span>, car <span class="m nw">3 + <span class="sqrt"><span class="rad">2</span></span></span> est positif.</p>\n<p class="it"><span class="m nw"><i>A</i> = |−1| = 1</span>. <span class="m nw"><i>B</i> = 3 + <span class="sqrt"><span class="rad">2</span></span></span>, perché <span class="m nw">3 + <span class="sqrt"><span class="rad">2</span></span></span> è positivo.</p>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e21', group: 'expr', num: '21', page: 85,
  tag: { fr: 'QCM', it: 'QUIZ' },
  title: { fr: 'Valeur d’une expression', it: 'Valore di un’espressione' },
  parts: [
    { kind: 'choice',
      q: '<p class="fr">Pour <span class="m nw"><i>x</i> = 7</span>, l’expression <span class="m nw">2<i>x</i> − 3</span> vaut\u00a0:</p>\n<p class="it">Per <span class="m nw"><i>x</i> = 7</span>, l’espressione <span class="m nw">2<i>x</i> − 3</span> vale:</p>',
      choices: [
        '<span class="m nw">8</span>',
        '<span class="m nw">24</span>',
        '<span class="m nw">11</span>',
        '<span class="m nw">6</span>'
      ],
      correct: 2,
      fb: [
        '<p class="fr">Tu as calculé <span class="m nw">2 × (7 − 3)</span>. Il n’y a pas de parenthèses\u00a0: la multiplication passe avant la soustraction.</p>\n<p class="it">Hai calcolato <span class="m nw">2 × (7 − 3)</span>. Non ci sono parentesi: la moltiplicazione viene prima della sottrazione.</p>',
        '<p class="fr">Tu as lu «\u00a0<span class="m nw">2<i>x</i></span>\u00a0» comme le nombre 27\u00a0! <span class="m nw">2<i>x</i></span> veut dire <span class="m nw">2 × <i>x</i> = 14</span>.</p>\n<p class="it">Hai letto «<span class="m nw">2<i>x</i></span>» come il numero 27! <span class="m nw">2<i>x</i></span> significa <span class="m nw">2 × <i>x</i> = 14</span>.</p>',
        '<p class="fr"><span class="m nw">2 × 7 − 3 = 14 − 3 = 11</span>.</p>\n<p class="it"><span class="m nw">2 × 7 − 3 = 14 − 3 = 11</span>.</p>',
        '<p class="fr">Tu as additionné 2 et 7. Mais <span class="m nw">2<i>x</i></span> veut dire <span class="m nw">2 × <i>x</i></span>\u00a0: <span class="m nw">2 × 7 = 14</span>, puis <span class="m nw">14 − 3 = 11</span>.</p>\n<p class="it">Hai sommato 2 e 7. Ma <span class="m nw">2<i>x</i></span> significa <span class="m nw">2 × <i>x</i></span>: <span class="m nw">2 × 7 = 14</span>, poi <span class="m nw">14 − 3 = 11</span>.</p>'
      ] },
    { kind: 'choice',
      q: '<p class="fr">Pour <span class="m nw"><i>x</i> = 4</span>, l’expression <span class="m nw">6 − 3<i>x</i></span> vaut\u00a0:</p>\n<p class="it">Per <span class="m nw"><i>x</i> = 4</span>, l’espressione <span class="m nw">6 − 3<i>x</i></span> vale:</p>',
      choices: [
        '12',
        '−28',
        '−6',
        '7'
      ],
      correct: 2,
      fb: [
        '<p class="fr">Tu as calculé <span class="m nw">(6 − 3) × 4</span>. La multiplication passe avant la soustraction.</p>\n<p class="it">Hai calcolato <span class="m nw">(6 − 3) × 4</span>. La moltiplicazione viene prima della sottrazione.</p>',
        '<p class="fr">Tu as lu «\u00a0<span class="m nw">3<i>x</i></span>\u00a0» comme le nombre 34\u00a0! <span class="m nw">3<i>x</i></span> veut dire <span class="m nw">3 × <i>x</i> = 12</span>.</p>\n<p class="it">Hai letto «<span class="m nw">3<i>x</i></span>» come il numero 34! <span class="m nw">3<i>x</i></span> significa <span class="m nw">3 × <i>x</i> = 12</span>.</p>',
        '<p class="fr"><span class="calc"><span class="cl"></span><span class="cg m">6 − 3 × 4</span><span class="cd m">= 6 − 12</span><span class="cl"></span><span class="cg m"></span><span class="cd m">= −6</span></span> </p>\n<p class="it"><span class="calc"><span class="cl"></span><span class="cg m">6 − 3 × 4</span><span class="cd m">= 6 − 12</span><span class="cl"></span><span class="cg m"></span><span class="cd m">= −6</span></span> </p>',
        '<p class="fr">Tu as calculé <span class="m nw">6 − 3 + 4</span>\u00a0: <span class="m nw">3<i>x</i></span> n’est pas <span class="m nw">3 + <i>x</i></span>.</p>\n<p class="it">Hai calcolato <span class="m nw">6 − 3 + 4</span>: <span class="m nw">3<i>x</i></span> non è <span class="m nw">3 + <i>x</i></span>.</p>'
      ] },
    { kind: 'choice',
      q: '<p class="fr">Pour <span class="m nw"><i>x</i> = −3</span>, l’expression <span class="m nw">4<i>x</i> + 2</span> vaut\u00a0:</p>\n<p class="it">Per <span class="m nw"><i>x</i> = −3</span>, l’espressione <span class="m nw">4<i>x</i> + 2</span> vale:</p>',
      choices: [
        '3',
        '−1',
        '−10',
        '−14'
      ],
      correct: 2,
      fb: [
        '<p class="fr">Tu as calculé <span class="m nw">4 + (−3) + 2</span>\u00a0: <span class="m nw">4<i>x</i></span> veut dire <span class="m nw">4 × <i>x</i></span>.</p>\n<p class="it">Hai calcolato <span class="m nw">4 + (−3) + 2</span>: <span class="m nw">4<i>x</i></span> significa <span class="m nw">4 × <i>x</i></span>.</p>',
        '<p class="fr">Tu as oublié le 4\u00a0: <span class="m nw">−3 + 2 = −1</span>.</p>\n<p class="it">Hai dimenticato il 4: <span class="m nw">−3 + 2 = −1</span>.</p>',
        '<p class="fr"><span class="calc"><span class="cl"></span><span class="cg m">4 × (−3) + 2</span><span class="cd m">= −12 + 2</span><span class="cl"></span><span class="cg m"></span><span class="cd m">= −10</span></span> </p>\n<p class="it"><span class="calc"><span class="cl"></span><span class="cg m">4 × (−3) + 2</span><span class="cd m">= −12 + 2</span><span class="cl"></span><span class="cg m"></span><span class="cd m">= −10</span></span> </p>',
        '<p class="fr">Erreur de signe sur le 2\u00a0: c’est <span class="m nw">−12 + 2</span>, pas <span class="m nw">−12 − 2</span>.</p>\n<p class="it">Errore di segno sul 2: è <span class="m nw">−12 + 2</span>, non <span class="m nw">−12 − 2</span>.</p>'
      ] }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e22', group: 'expr', num: '22', page: 85,
  title: { fr: 'Réduire', it: 'Ridurre' },
  text: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i>(<i>x</i>)</span><span class="cd m">= 125<i>x</i> + 20<i>x</i> + 10</span>\n<span class="cl"></span><span class="cg m"><i>B</i>(<i>x</i>)</span><span class="cd m">= 6<i>x</i> − 2<i>x</i> − 30<i>x</i></span>\n<span class="cl"></span><span class="cg m"><i>C</i>(<i>x</i>)</span><span class="cd m">= 6<i>x</i><sup>2</sup> + 2 + 3<i>x</i><sup>2</sup> − 1</span>\n<span class="cl"></span><span class="cg m"><i>D</i>(<i>x</i>)</span><span class="cd m">= 6 × 3 × <i>x</i> − 3<i>x</i> + 6</span>\n</div>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i>(<i>x</i>)</span><span class="cd m">= 145<i>x</i> + 10</span>\n<span class="cn"><span class="fr">et surtout pas 155x</span><span class="it inl">e non 155x</span></span>\n<span class="cl"></span><span class="cg m"><i>B</i>(<i>x</i>)</span><span class="cd m">= (6 − 2 − 30)<i>x</i></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= −26<i>x</i></span>\n<span class="cl"></span><span class="cg m"><i>C</i>(<i>x</i>)</span><span class="cd m">= 9<i>x</i><sup>2</sup> + 1</span>\n<span class="cl"></span><span class="cg m"><i>D</i>(<i>x</i>)</span><span class="cd m">= 18<i>x</i> − 3<i>x</i> + 6</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 15<i>x</i> + 6</span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e23', group: 'expr', num: '23', page: 85,
  title: { fr: 'Développer et réduire', it: 'Sviluppa e riduci' },
  text: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i>(<i>x</i>)</span><span class="cd m">= 3(<i>x</i> + 4) + <i>x</i>(6 − <i>x</i>)</span>\n<span class="cl"></span><span class="cg m"><i>B</i>(<i>x</i>)</span><span class="cd m">= 1 − 2(3<i>x</i> + 5)</span>\n<span class="cl"></span><span class="cg m"><i>C</i>(<i>x</i>)</span><span class="cd m">= 5<i>x</i> − 5(7<i>x</i> − 1)</span>\n</div>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i>(<i>x</i>)</span><span class="cd m">= 3<i>x</i> + 12 + 6<i>x</i> − <i>x</i><sup>2</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= −<i>x</i><sup>2</sup> + 9<i>x</i> + 12</span>\n<span class="cl"></span><span class="cg m"><i>B</i>(<i>x</i>)</span><span class="cd m">= 1 − 6<i>x</i> − 10</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= −6<i>x</i> − 9</span>\n<span class="cl"></span><span class="cg m"><i>C</i>(<i>x</i>)</span><span class="cd m">= 5<i>x</i> − 35<i>x</i> + 5</span>\n<span class="cn"><span class="fr"><span class="m nw">−5 × (−1) = +5</span></span><span class="it inl"><span class="m nw">−5 × (−1) = +5</span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= −30<i>x</i> + 5</span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e24', group: 'expr', num: '24', page: 85,
  title: { fr: 'Double distributivité', it: 'Doppia distributività' },
  text: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i>(<i>x</i>)</span><span class="cd m">= (4<i>x</i> + 1)(5 + <i>x</i>)</span>\n<span class="cl"></span><span class="cg m"><i>B</i>(<i>x</i>)</span><span class="cd m">= (<i>x</i> + 8)(2 − <i>x</i>)</span>\n<span class="cl"></span><span class="cg m"><i>C</i>(<i>x</i>)</span><span class="cd m">= (<i>x</i> + 8)(<i>x</i> − 8)</span>\n</div>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i>(<i>x</i>)</span><span class="cd m">= 20<i>x</i> + 4<i>x</i><sup>2</sup> + 5 + <i>x</i></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 4<i>x</i><sup>2</sup> + 21<i>x</i> + 5</span>\n<span class="cl"></span><span class="cg m"><i>B</i>(<i>x</i>)</span><span class="cd m">= 2<i>x</i> − <i>x</i><sup>2</sup> + 16 − 8<i>x</i></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= −<i>x</i><sup>2</sup> − 6<i>x</i> + 16</span>\n<span class="cl"></span><span class="cg m"><i>C</i>(<i>x</i>)</span><span class="cd m">= <i>x</i><sup>2</sup> − 8<i>x</i> + 8<i>x</i> − 64</span>\n<span class="cn"><span class="fr">c’est l’identité <span class="m nw">(<i>a</i> + <i>b</i>)(<i>a</i> − <i>b</i>) = <i>a</i><sup>2</sup> − <i>b</i><sup>2</sup></span></span><span class="it inl">è il prodotto notevole <span class="m nw">(<i>a</i> + <i>b</i>)(<i>a</i> − <i>b</i>) = <i>a</i><sup>2</sup> − <i>b</i><sup>2</sup></span></span></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= <i>x</i><sup>2</sup> − 64</span>\n<span class="cl"></span><span class="cg m"><i>x</i></span><span class="cd m">= 2</span>\n<span class="cl"></span><span class="cg m"><i>A</i>(2)</span><span class="cd m">= 9 × 7</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 63</span>\n<span class="cl"></span><span class="ce m"><span class="ui"><span class="fr">et</span><span class="it">e</span></span> 4 × 4 + 42 + 5 = 63</span>\n<span class="cn"><span class="fr">contrôle</span><span class="it inl">controllo</span> ✓</span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e125', group: 'expr', num: '125', page: 105,
  title: { fr: 'Développer et réduire', it: 'Sviluppa e riduci' },
  text: '<div class="calc">\n<span class="cl">a.</span><span class="ce m"><i>x</i> − 4(3<i>x</i> + 2)</span>\n<span class="cl">b.</span><span class="ce m">(<i>x</i> − 2)(<i>x</i> − 3)</span>\n<span class="cl">c.</span><span class="ce m">6 − 3(2<i>x</i> − 1)</span>\n<span class="cl">d.</span><span class="ce m">(5<i>x</i> − 4)(3<i>x</i> + 2)</span>\n</div>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl">a.</span><span class="cg m"><i>x</i> − 12<i>x</i> − 8</span><span class="cd m">= −11<i>x</i> − 8</span>\n<span class="cl">b.</span><span class="ce m"><i>x</i><sup>2</sup> − 3<i>x</i> − 2<i>x</i> + 6</span>\n<span class="cl"></span><span class="ce m">= <i>x</i><sup>2</sup> − 5<i>x</i> + 6</span>\n<span class="cl">c.</span><span class="cg m">6 − 6<i>x</i> + 3</span><span class="cd m">= −6<i>x</i> + 9</span>\n<span class="cl">d.</span><span class="ce m">15<i>x</i><sup>2</sup> + 10<i>x</i> − 12<i>x</i> − 8</span>\n<span class="cl"></span><span class="ce m">= 15<i>x</i><sup>2</sup> − 2<i>x</i> − 8</span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e53', group: 'expr', num: '53', page: 101,
  title: { fr: 'Carré d’une différence', it: 'Quadrato di una differenza' },
  text: '<p class="fr"><b>1.</b> Quelle est la forme développée de <span class="m nw">(<i>a</i> − <i>b</i>)<sup>2</sup></span>\u00a0? <br><b>2.</b> Développer et réduire\u00a0: <br><b>a.</b> <span class="m nw">(<i>x</i> − 1)<sup>2</sup></span> <br><b>b.</b> <span class="m nw">(7 − <i>x</i>)<sup>2</sup></span> <br><b>c.</b> <span class="m nw">(2<i>x</i> − 1)<sup>2</sup></span>.</p>\n<p class="it"><b>1.</b> Qual è la forma sviluppata di <span class="m nw">(<i>a</i> − <i>b</i>)<sup>2</sup></span>? <br><b>2.</b> Sviluppa e riduci: <br><b>a.</b> <span class="m nw">(<i>x</i> − 1)<sup>2</sup></span> <br><b>b.</b> <span class="m nw">(7 − <i>x</i>)<sup>2</sup></span> <br><b>c.</b> <span class="m nw">(2<i>x</i> − 1)<sup>2</sup></span>.</p>',
  parts: [
    { kind: 'self',
      hint: '<p class="fr">Pour c., <span class="m nw"><i>a</i> = 2<i>x</i></span> et <span class="m nw"><i>b</i> = 1</span>. Attention\u00a0: <span class="m nw"><i>a</i><sup>2</sup> = (2<i>x</i>)<sup>2</sup> = 4<i>x</i><sup>2</sup></span>.</p>\n<p class="it">Per la c., <span class="m nw"><i>a</i> = 2<i>x</i></span> e <span class="m nw"><i>b</i> = 1</span>. Attenzione: <span class="m nw"><i>a</i><sup>2</sup> = (2<i>x</i>)<sup>2</sup> = 4<i>x</i><sup>2</sup></span>.</p>',
      sol: '<div class="calc">\n<span class="cl">1.</span><span class="cg m">(<i>a</i> − <i>b</i>)<sup>2</sup></span><span class="cd m">= <i>a</i><sup>2</sup> − 2<i>ab</i> + <i>b</i><sup>2</sup></span>\n<span class="cl">a.</span><span class="ce m"><i>x</i><sup>2</sup> − 2<i>x</i> + 1</span>\n<span class="cl">b.</span><span class="ce m">49 − 14<i>x</i> + <i>x</i><sup>2</sup></span>\n<span class="cl">c.</span><span class="ce m">4<i>x</i><sup>2</sup> − 4<i>x</i> + 1</span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e132', group: 'expr', num: '132', page: 106,
  title: { fr: 'Avec les identités remarquables', it: 'Con i prodotti notevoli' },
  text: '<div class="calc">\n<span class="cl">a.</span><span class="ce m">(3<i>x</i> + 5)<sup>2</sup></span>\n<span class="cl">b.</span><span class="ce m">(2<i>x</i> − 1)(2<i>x</i> + 1)</span>\n<span class="cl">c.</span><span class="ce m">(1 − 2<i>x</i>)<sup>2</sup></span>\n</div>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl">a.</span><span class="ce m">(3<i>x</i>)<sup>2</sup> + 2 × 3<i>x</i> × 5 + 5<sup>2</sup></span>\n<span class="cl"></span><span class="ce m">= 9<i>x</i><sup>2</sup> + 30<i>x</i> + 25</span>\n<span class="cl">b.</span><span class="cg m">(2<i>x</i>)<sup>2</sup> − 1<sup>2</sup></span><span class="cd m">= 4<i>x</i><sup>2</sup> − 1</span>\n<span class="cl">c.</span><span class="ce m">1 − 2 × 1 × 2<i>x</i> + (2<i>x</i>)<sup>2</sup></span>\n<span class="cl"></span><span class="ce m">= 1 − 4<i>x</i> + 4<i>x</i><sup>2</sup></span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e25', group: 'expr', num: '25', page: 85,
  title: { fr: 'Factoriser', it: 'Scomponi in fattori' },
  text: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i>(<i>x</i>)</span><span class="cd m">= 4<i>x</i> − 12</span>\n<span class="cl"></span><span class="cg m"><i>B</i>(<i>x</i>)</span><span class="cd m">= <i>x</i><sup>2</sup> + 3<i>x</i></span>\n<span class="cl"></span><span class="cg m"><i>C</i>(<i>x</i>)</span><span class="cd m">= <i>x</i><sup>2</sup> − 4</span>\n</div>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i>(<i>x</i>)</span><span class="cd m">= 4 × <i>x</i> − 4 × 3</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 4(<i>x</i> − 3)</span>\n<span class="cl"></span><span class="cg m"><i>B</i>(<i>x</i>)</span><span class="cd m">= <i>x</i> × <i>x</i> + 3 × <i>x</i></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= <i>x</i>(<i>x</i> + 3)</span>\n<span class="cl"></span><span class="cg m"><i>C</i>(<i>x</i>)</span><span class="cd m">= <i>x</i><sup>2</sup> − 2<sup>2</sup></span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= (<i>x</i> − 2)(<i>x</i> + 2)</span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e139', group: 'expr', num: '139', page: 106,
  title: { fr: 'Facteur commun entre parenthèses', it: 'Fattore comune tra parentesi' },
  text: '<p class="fr">Factoriser au maximum.</p>\n<p class="it">Scomponi il più possibile.</p>\n<div class="calc">\n<span class="cl"></span><span class="ce m"><i>A</i>(<i>x</i>)</span>\n<span class="cl"></span><span class="ce m">= (<i>x</i> + 2)(<i>x</i> − 1) + (3<i>x</i> + 5)(<i>x</i> + 2)</span>\n<span class="cl"></span><span class="cg m"><i>B</i>(<i>x</i>)</span><span class="cd m">= 7(5 − <i>x</i>) − (2<i>x</i> + 3)(5 − <i>x</i>)</span>\n</div>',
  parts: [
    { kind: 'self',
      hint: '<p class="fr">Repère la parenthèse qui apparaît dans les deux termes. Pour B, attention aux parenthèses après le signe «\u00a0−\u00a0».</p>\n<p class="it">Individua la parentesi che compare nei due termini. Per B, attenzione alle parentesi dopo il segno «−».</p>',
      sol: '<div class="calc">\n<span class="cl"></span><span class="ce m"><i>A</i>(<i>x</i>)</span>\n<span class="cl"></span><span class="ce m">= (<i>x</i> + 2)[(<i>x</i> − 1) + (3<i>x</i> + 5)]</span>\n<span class="cl"></span><span class="ce m">= (<i>x</i> + 2)(4<i>x</i> + 4)</span>\n<span class="cl"></span><span class="ce m">= 4(<i>x</i> + 2)(<i>x</i> + 1)</span>\n<span class="cl"></span><span class="cg m"><i>B</i>(<i>x</i>)</span><span class="cd m">= (5 − <i>x</i>)[7 − (2<i>x</i> + 3)]</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= (5 − <i>x</i>)(4 − 2<i>x</i>)</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 2(5 − <i>x</i>)(2 − <i>x</i>)</span>\n</div>\n<p class="fr small">«\u00a0Au maximum\u00a0»\u00a0: on sort aussi le 4 de <span class="m nw">4<i>x</i> + 4</span> et le 2 de <span class="m nw">4 − 2<i>x</i></span>.</p>\n<p class="it small">«Il più possibile»: si raccoglie anche il 4 di <span class="m nw">4<i>x</i> + 4</span> e il 2 di <span class="m nw">4 − 2<i>x</i></span>.</p>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e142', group: 'expr', num: '142', page: 106,
  title: { fr: 'Différences de carrés', it: 'Differenze di quadrati' },
  text: '<div class="calc">\n<span class="cl"></span><span class="cg m"><i>A</i>(<i>x</i>)</span><span class="cd m">= (<i>x</i> − 2)<sup>2</sup> − 36</span>\n<span class="cl"></span><span class="cg m"><i>B</i>(<i>x</i>)</span><span class="cd m">= 1 − (2<i>x</i> + 3)<sup>2</sup></span>\n</div>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<span class="cl"></span><span class="ce m"><i>A</i>(<i>x</i>)</span>\n<span class="cl"></span><span class="ce m">= (<i>x</i> − 2)<sup>2</sup> − 6<sup>2</sup></span>\n<span class="cl"></span><span class="ce m">= [(<i>x</i> − 2) − 6][(<i>x</i> − 2) + 6]</span>\n<span class="cl"></span><span class="ce m">= (<i>x</i> − 8)(<i>x</i> + 4)</span>\n<span class="cl"></span><span class="ce m"><i>B</i>(<i>x</i>)</span>\n<span class="cl"></span><span class="ce m">= 1<sup>2</sup> − (2<i>x</i> + 3)<sup>2</sup></span>\n<span class="cl"></span><span class="ce m">= [1 − (2<i>x</i> + 3)][1 + (2<i>x</i> + 3)]</span>\n<span class="cl"></span><span class="ce m">= (−2<i>x</i> − 2)(2<i>x</i> + 4)</span>\n<span class="cl"></span><span class="ce m">= −4(<i>x</i> + 1)(<i>x</i> + 2)</span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e176', group: 'expr', num: '176', page: 108,
  title: { fr: 'Trois formes d’une même expression', it: 'Tre forme della stessa espressione' },
  text: '<div class="calc">\n<span class="cl">①</span><span class="cg m"><i>A</i>(<i>x</i>)</span><span class="cd m">= <i>x</i><sup>2</sup> + 2<i>x</i> − 3</span>\n<span class="cl">②</span><span class="cg m"><i>A</i>(<i>x</i>)</span><span class="cd m">= (<i>x</i> + 1)<sup>2</sup> − 4</span>\n<span class="cl">③</span><span class="cg m"><i>A</i>(<i>x</i>)</span><span class="cd m">= (<i>x</i> − 1)(<i>x</i> + 3)</span>\n</div>\n<p class="fr">En choisissant la forme la plus adaptée\u00a0: <br><b>1.</b> Calculer <span class="m nw"><i>A</i>(<span class="sqrt"><span class="rad">5</span></span> − 1)</span>. <br><b>2.</b> Résoudre <span class="m nw"><i>A</i>(<i>x</i>) = 0</span>. <br><b>3.</b> Résoudre <span class="m nw"><i>A</i>(<i>x</i>) = −3</span>.</p>\n<p class="it">Scegliendo la forma più adatta: <br><b>1.</b> Calcola <span class="m nw"><i>A</i>(<span class="sqrt"><span class="rad">5</span></span> − 1)</span>. <br><b>2.</b> Risolvi <span class="m nw"><i>A</i>(<i>x</i>) = 0</span>. <br><b>3.</b> Risolvi <span class="m nw"><i>A</i>(<i>x</i>) = −3</span>.</p>',
  parts: [
    { kind: 'self',
      hint: '<p class="fr"><b>1.</b> Dans quelle forme <span class="m nw"><span class="sqrt"><span class="rad">5</span></span> − 1</span> «\u00a0se simplifie\u00a0»\u00a0? <br><b>3.</b> Dans quelle forme le <span class="m nw">−3</span> apparaît-il déjà\u00a0?</p>\n<p class="it"><b>1.</b> In quale forma <span class="m nw"><span class="sqrt"><span class="rad">5</span></span> − 1</span> «si semplifica»? <br><b>3.</b> In quale forma compare già il <span class="m nw">−3</span>?</p>',
      sol: '<div class="calc">\n<span class="cl">1. ② :</span><span class="cg m"><i>A</i>(<span class="sqrt"><span class="rad">5</span></span> − 1)</span><span class="cd m">= (<span class="sqrt"><span class="rad">5</span></span>)<sup>2</sup> − 4</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 5 − 4</span>\n<span class="cl"></span><span class="cg m"></span><span class="cd m">= 1</span>\n<span class="cl">2. ③ :</span><span class="cg m">(<i>x</i> − 1)(<i>x</i> + 3)</span><span class="cd m">= 0</span>\n<span class="cl eqv">⇔</span><span class="ce m"><i>x</i> = 1 <span class="ui"><span class="fr">ou</span><span class="it">o</span></span> <i>x</i> = −3</span>\n<span class="cl">3. ① :</span><span class="cg m"><i>x</i><sup>2</sup> + 2<i>x</i> − 3</span><span class="cd m">= −3</span>\n<span class="cl eqv">⇔</span><span class="cg m"><i>x</i><sup>2</sup> + 2<i>x</i></span><span class="cd m">= 0</span>\n<span class="cl eqv">⇔</span><span class="cg m"><i>x</i>(<i>x</i> + 2)</span><span class="cd m">= 0</span>\n<span class="cl eqv">⇔</span><span class="ce m"><i>x</i> = 0 <span class="ui"><span class="fr">ou</span><span class="it">o</span></span> <i>x</i> = −2</span>\n</div>' }
  ]
});
EXOS.push({
  ch: 'c3', id: 'c3e129', group: 'expr', num: '129', page: 105,
  title: { fr: 'Comprendre un programme Python', it: 'Capire un programma Python' },
  text: '<pre class="code"><code>def f(x):\n    a = x - 1\n    b = 2*a + 3\n    return a*b</code></pre>\n<p class="fr"><b>1.</b> Quelle valeur renvoie <code>f(-4)</code>\u00a0? <br><b>2.</b> La valeur retournée est une expression de <span class="m nw"><i>x</i></span>. En donner la forme développée.</p>\n<p class="it"><b>1.</b> Quale valore restituisce <code>f(-4)</code>? <br><b>2.</b> Il valore restituito è un’espressione in <span class="m nw"><i>x</i></span>. Scrivine la forma sviluppata.</p>',
  parts: [
    { kind: 'self',
      sol: '<div class="calc">\n<p class="ct">1. <span class="m nw"><i>a</i> = −5</span>, <span class="m nw"><i>b</i> = −7</span>, <span class="ui"><span class="fr">renvoie</span><span class="it">restituisce</span></span> <span class="m nw">(−5) × (−7) = 35</span></p>\n<span class="cl">2.</span><span class="ce m">(<i>x</i> − 1)(2(<i>x</i> − 1) + 3)</span>\n<span class="cl"></span><span class="ce m">= (<i>x</i> − 1)(2<i>x</i> + 1)</span>\n<span class="cl"></span><span class="ce m">= 2<i>x</i><sup>2</sup> − <i>x</i> − 1</span>\n<span class="cl"></span><span class="cg m"><i>x</i></span><span class="cd m">= −4</span>\n<span class="cl"></span><span class="cg m">32 + 4 − 1</span><span class="cd m">= 35 ✓</span>\n</div>' }
  ]
});
