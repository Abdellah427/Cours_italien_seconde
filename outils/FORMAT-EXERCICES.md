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
Exemple complet et modèle de style : `ex_sample.js` (exercice 115) dans le même dossier.
Validation obligatoire avant de rendre : `node validate.js ton_fichier.js` (doit afficher OK, 0 problème).

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
