# SCOLAIR : maths de Seconde avec Hector

Application de révision sur téléphone : cours en français et en italien, exercices corrigés pas à pas, entraînement sans fin, contrôle blanc noté sur 20. Elle se suffit à elle-même : rien à l'écran ne renvoie à un manuel. Un écran d'accueil liste les chapitres et la progression de chacun. Installable sur l'écran d'accueil, fonctionne hors ligne.

Chapitres :

- chapitre 10, information chiffrée : évolutions successives, taux global, évolutions réciproques ;
- chapitre 3, calcul littéral : priorités, fractions, puissances, racines carrées, développer, factoriser, équations, inéquations.

## Démarrer

```
python3 outils/assemble.py     # fabrique autonome/ et docs/
python3 outils/teste.py        # teste tout (nécessite playwright et node)
```

Ouvrir `autonome/scolair-maths-seconde.html` dans un navigateur, ou servir `docs/` (`python3 -m http.server -d docs`).

## Organisation des sources

`src/commun/` : ce qui sert à tous les chapitres.

- `shell_top.html`, `accueil.html`, `shell_bottom.html` : barre du haut, écran d'accueil, barre d'onglets.
- `base.js` : langue, stockage, textes bilingues, schémas en bulles, registre des chapitres.
- `question.js` : une question et sa correction (un nombre, des cases à remplir, un choix, ou un exercice à faire sur le cahier).
- `moteur.js` : pour chaque chapitre, la liste des exercices, l'entraînement, le contrôle blanc, le sommaire du cours ; l'écran d'accueil et la navigation.
- `hector.js`, `owl_pre.js`, `chouette.js`, `chouette.css`, `owl.svg` : Hector.
- `app.css`, `scolair.css`, `maths.css` : styles (`maths.css` : formules, calculs posés ligne par ligne avec les signes « = » alignés, composants des cours écrits avec des formules).
- `maj.js` : service worker et rechargement quand une version plus récente est en ligne.
- `depart.js` : démarrage.

`src/ch10/`, `src/ch03/` : un dossier par chapitre.

- `cours1.html`... : le cours.
- `ex*.js` : les exercices (format : `outils/FORMAT-EXERCICES.md`).
- `chapitre.js` : titre, groupes d'exercices, questions d'entraînement aléatoires, questions du contrôle blanc.

Adresses dans l'application : `#accueil`, puis `#c10/cours`, `#c10/exercices`, `#c10/entrainement`, `#c10/controle` (de même avec `c3`).

Voir `CONSIGNE.md` pour la mise en ligne, la mise à jour hebdomadaire et l'ajout d'un chapitre.
