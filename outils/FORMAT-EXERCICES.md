# Exercices du livre : format des données

## Contexte
Application de révision pour téléphone (une seule page HTML) destinée à une élève de Seconde en France.
Elle est italophone, a de grosses difficultés en maths et surtout un gros problème de langue : elle comprend
mal les énoncés en français. Chapitre 10 « Information chiffrée » (manuel Bordas) : évolutions successives
(taux global) et évolutions réciproques (taux réciproque). Chaque exercice du livre est repris tel quel en
français, avec une traduction italienne complète, un indice et une solution commentée dans les deux langues.

Pages du livre utilisées : p. 302 et 303 (cours, Capacités 4 et 5, solutions commentées), p. 311 à 313
(exercices 115 à 140), p. 314 à 316 (l’essentiel, exercices 141 à 158).

## Fichier à produire
Un fichier JavaScript qui ne contient QUE des appels `EXOS.push({...});` (un par exercice, dans l'ordre
demandé). Pas de `import`, pas de fonction, pas de variable globale autre que `EXOS`.
Exemple complet et modèle de style : `src/ch10/ex_sample.js` (exercice 115).
Validation obligatoire avant de rendre : `node outils/validate.js src/chNN/ton_fichier.js` (doit afficher OK, 0 problème).
Ce qui suit décrit le format du chapitre 10. Les compléments pour les chapitres écrits avec des formules sont à la fin.

## Schéma d'un exercice
```
EXOS.push({
  id: 'ex116',              // unique : 'ex' + numéro, ou 'cap4', 'cap5'
  group: 'succ',            // 'rappels' | 'succ' | 'recip' | 'synth'
  num: '116', page: 311,    // numéro tel qu'affiché (texte) et page du livre (nombre). Capacités : num: 'Capacité 4'
  stars: 2,                 // 1 = application directe, 2 = deux étapes, 3 = raisonnement / plusieurs étapes
  tag: { fr: 'VRAI / FAUX', it: 'VERO / FALSO' },   // optionnel : étiquette du livre (VRAI / FAUX, LOGIQUE, MATHS & SVT, QCM, CALCULATRICE, PYTHON...)
  title: { fr: 'Population d’une ville', it: 'La popolazione di una città' },  // titre court (2 à 5 mots)
  text: { fr: '<p>...</p>', it: '<p>...</p>' },     // énoncé commun (HTML simple), sans les questions numérotées
  figure: { ... },          // optionnel, voir « Schémas » plus bas
  parts: [ { ... }, ... ]   // une entrée par question (1., 2., a., b. ...)
});
```

### Une question (`parts[i]`)
Champs communs :
- `q: { fr, it }` : texte de la question (sans le numéro, il est ajouté automatiquement). HTML simple autorisé.
- `kind: 'num'` (réponse numérique tapée) ou `kind: 'choice'` (boutons).
- `hint: { fr, it }` : UN indice court qui met sur la voie sans donner le résultat.
- `sol: { fr, it }` : solution commentée, étape par étape, comme les « Solution commentée » du livre.
  Phrases courtes. Utiliser `<ol><li>...</li></ol>` pour les étapes et `<p>` pour la conclusion.
  Le résultat final en gras `<b>...</b>`. La solution doit aussi être juste avec les arrondis demandés.

Pour `kind: 'num'` :
- `label: { fr, it }` : ce que l'élève tape (ex. « Taux global », « Prix HT », « Coefficient global »).
- `unit` : texte affiché après la case : '%', '€', 'cm', 'm', 'm³', 'habitants', 'connexions', '' ...
- `ans` : la valeur attendue (nombre JavaScript avec un point décimal), dans l'unité affichée.
  Un taux de +32 % s'écrit `ans: 32`. Une diminution de 4,12 % s'écrit `ans: -4.12`.
- `tol` : écart accepté (absolu). Résultat exact à 2 décimales : 0.005. « à 0,1 % près » : 0.05.
  Coefficient exact : 0.00005. Entier : 0.01.
- `near` (optionnel) : écart pour lequel on dit « presque, vérifie l'arrondi » (défaut 10 × tol).
- `sign` : 'strict' si le signe compte (taux d'évolution : + augmentation, − diminution) ;
  'abs' si la question demande déjà le sens (« de quel pourcentage faut-il diminuer... » : 13 ou −13 acceptés).
- `traps` (optionnel, recommandé) : erreurs typiques reconnues, avec un message ciblé :
  `traps: [{ v: 30, fr: 'Tu as additionné les taux...', it: 'Hai sommato i tassi...' }]`

Pour `kind: 'choice'` :
- `choices: [{ fr, it }, ...]` (2 à 4 choix), `correct:` index (0 = premier).
- `why: { fr, it }` (optionnel) : phrase affichée après la réponse (sinon `sol` suffit).

### Schémas (`figure`), facultatif
Pour reproduire les schémas en « bulles » du livre (exercices 120, 129...) :
```
figure: { chain: {
  nodes: ['1 100', '?', '?'],                                    // textes dans les bulles orange
  top: [{ fr: 'Diminuer de 15 %', it: 'Diminuire del 15%' }, { fr: 'Diminuer de 25 %', it: 'Diminuire del 25%' }], // légendes au-dessus des flèches
  ops: ['× …', '× …'],                                            // texte sur chaque flèche
  bottom: { op: '× …', dir: 'fwd' }                              // flèche du bas : 'fwd' (globale, de gauche à droite) ou 'back' (retour, de droite à gauche)
} }
```
Pour un schéma par question (a. et b.), mettre `figure` dans la question elle-même (`parts[i].figure`).

### Tableaux et code
- Tableau : `<div class="tw"><table class="bt"><tr><th>Période</th><td>2019-2020</td>...</tr><tr>...</tr></table></div>`
- Code Python : `<pre class="code">def mystere(t, u):\n    c = (1 + t) * (1 + u)\n...</pre>` (garder les `\n`).

## Règles d'écriture (importantes)
- Français : reprendre l'énoncé du livre mot pour mot (corriger seulement une faute évidente).
  Virgule décimale (1,32), « × » pour multiplier, « ÷ » pour diviser, « − » (signe moins U+2212) pour les
  nombres négatifs et les soustractions dans le texte. Espaces normaux : la page ajoute elle-même les espaces
  insécables françaises (avant %, €, :, ?, !).
- Italien : traduction complète, naturelle et simple (élève de 15 ans), tutoiement dans les indices et
  solutions. Vocabulaire imposé :
  évolution = variazione ; taux d'évolution = tasso di variazione ; coefficient multiplicateur (CM) =
  coefficiente moltiplicativo (CM) ; évolutions successives = variazioni successive ; taux d'évolution global =
  tasso di variazione globale ; coefficient multiplicateur global = coefficiente moltiplicativo globale ;
  évolutions réciproques = variazioni reciproche ; taux d'évolution réciproque = tasso di variazione reciproco ;
  valeur initiale / finale = valore iniziale / finale ; augmentation, hausse = aumento ; diminution, baisse =
  diminuzione, calo ; arrondi à 0,1 % près = arrotondato allo 0,1% ; TVA = IVA ; prix TTC = prezzo IVA inclusa ;
  prix HT = prezzo senza IVA ; remise = sconto ; soldes = saldi.
  En italien, pas d'espace avant % (« 32% »). Attention aux articles : « del 10% », « dell’8% », « dell’11% »,
  « l’80% », « lo 0,1% ».
- Solutions : même méthode que le livre (coefficient multiplicateur C = 1 + t, produit des coefficients,
  C' = 1 ÷ C pour la réciproque, valeur initiale = valeur finale ÷ C). Dire clairement augmentation / diminution.
- INTERDIT partout : le tiret long, le tiret moyen, les emojis.
  Utiliser « : », des virgules ou des parenthèses à la place des tirets.
- Typographie des apostrophes : « ’ » de préférence dans le texte.

## Compléments : chapitres écrits avec des formules (chapitre 3, calcul littéral)

Modèle : `src/ch03/exA.js`. Ce qui change par rapport au chapitre 10 :

```
EXOS.push({
  ch: 'c3', id: 'c3e14',     // ch : le chapitre ; l'id commence par le chapitre ('c3e' + numéro, 'c3a1' pour une activité)
  group: 'calc',             // un des groupes déclarés dans src/ch03/chapitre.js et dans outils/validate.js
  num: '14', page: 85,       // sans page : src: { fr: 'cahier, activité 1', it: 'quaderno, attività 1' }
  title: { fr: '...', it: '...' },
  text: '<p class="fr">...</p>\n<p class="it">...</p>\n<p class="items">...</p>',
  parts: [ { kind: 'self', hint: '...', sol: '...' } ]
});
```

- `stars` est facultatif. `plus: true` signale un exercice ajouté pour aller plus loin (pas dans le livre).
- **Textes en HTML déjà balisé.** `text`, `q`, `hint`, `sol` et les réponses peuvent être une simple chaîne de HTML au lieu de
  `{ fr, it }` : les phrases françaises portent `class="fr"`, leur traduction `class="it"` (autant de l'un que de l'autre), et
  les calculs, écrits une seule fois, ne portent ni l'un ni l'autre. Dans une phrase : `<span class="fr">donc</span><span class="it inl">quindi</span>`.
  Dans ces chaînes, les espaces insécables françaises s'écrivent `\u00a0` (avant `: ; ? ! % € »`, après `«`, entre les groupes de trois chiffres).
- **Formules.** `<span class="m">` autour d'une formule, `<span class="mc">` pour chaque morceau qui ne doit pas être coupé
  (un morceau par égalité : `<span class="mc">A</span> <span class="mc">= 48 − 16</span> <span class="mc">= 32</span>`),
  `class="m nw"` pour une formule courte d'un seul bloc. Lettres en `<i>x</i>`, puissances en `<sup>2</sup>`,
  fraction `<span class="frac"><span>3</span><span>4</span></span>`, racine `<span class="sqrt"><span class="rad">18</span></span>`.
  Calcul pas à pas : `<div class="calc"><p>...</p><p>...</p></div>`, avec la raison en `<span class="why">`.
  Plusieurs expressions à la suite (A = ..., B = ...) : `<p class="items"><span class="item">...</span> <span class="item">...</span></p>`.

### Types de questions en plus de `num`

- `kind: 'self'` : exercice à faire sur le cahier. `sol` obligatoire, `hint` et `q` facultatifs. L'élève ouvre la solution,
  compare, puis touche « J'ai réussi » ou « À refaire ».
- `kind: 'choice'` avec une explication par réponse : `fb: ['...', '...', ...]` (une par choix, dans l'ordre). Alors `hint` et
  `sol` sont facultatifs. `correct` peut être une liste (`correct: [2, 3]`) quand plusieurs réponses sont justes : il faut les
  trouver toutes. `more` (facultatif) : un lien vers le cours, `<a class="lnk" href="#c3/cours" data-go="c3-parentheses">...</a>`.
- `kind: 'fill'` : réponse à cases. `tpl` est le modèle affiché, `ans` la liste des nombres attendus. Dans `tpl`, `{0}` est la
  case 0, `{±0}` la même case précédée d'un bouton de signe (obligatoire si le nombre attendu peut être négatif), `{s0}` le bouton
  de signe seul (pour le mettre devant une fraction). Exemple : `tpl: '= {±0}<i>x</i> {±1}'`, `ans: [6, -15]`.
  Options : `traps: [{ v: [6, -5], fr, it }]` (une erreur reconnue, `null` pour « n'importe quelle valeur »),
  `frac: [[0, 1]]` (les cases 0 et 1 forment une fraction : une fraction égale mais non simplifiée reçoit un message particulier),
  `set: true` (l'ordre des cases ne compte pas, pour les solutions d'une équation).

### Liens entre le cours et les exercices

Dans le cours, `<button type="button" class="go-b" data-exo="c3e14">` ouvre l'exercice ; `data-go="identifiant"` sur un lien ou un
bouton mène à un endroit du cours (dans le chapitre concerné, quelle que soit la page affichée).
