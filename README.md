# Évolutions % avec Hector (SCOLAIR, Seconde)

Application de révision sur téléphone : cours en français et en italien, exercices du livre corrigés pas à pas, entraînement sans fin, contrôle blanc noté sur 20. Installable sur l'écran d'accueil, fonctionne hors ligne.

## Démarrer

```
python3 outils/assemble.py     # fabrique autonome/ et docs/
python3 outils/teste.py        # teste tout (nécessite playwright et node)
```

Ouvrir `autonome/evolutions-taux-global-reciproque.html` dans un navigateur, ou servir `docs/` (`python3 -m http.server -d docs`).

## Organisation des sources

- `shell_top.html`, `shell_bottom.html` : barre du haut, vues, barre d'onglets.
- `cours1.html`, `cours2.html` : le cours (7 parties).
- `ex_sample.js`, `exA.js`, `exB.js` : les exercices (format : `outils/FORMAT-EXERCICES.md`).
- `app1.js` : langue, stockage, schémas en bulles, petits laboratoires du cours.
- `app2.js` : correction des réponses, liste des exercices.
- `app3.js` : entraînement aléatoire, contrôle blanc, navigation.
- `app4.js`, `owl_pre.js`, `chouette.js`, `chouette.css`, `owl.svg` : Hector.
- `app.css`, `scolair.css` : styles.
- `maj.js` : service worker et rechargement quand une version plus récente est en ligne.

Voir `CONSIGNE.md` pour la mise en ligne et la mise à jour hebdomadaire.
