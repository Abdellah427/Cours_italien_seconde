# Consigne : l'application de révision de maths (Seconde), aux couleurs de SCOLAIR

## Ce que contient ce dossier

Une application de révision pour **une seule élève** de Seconde, italophone, qui a de grandes difficultés surtout à cause du français. Elle travaille seule, sur iPhone. Je lui fais cours tous les lundis, et chaque semaine on ajoute ou on met à jour un chapitre.

- `src/` : les sources (cours, exercices, entraînement, contrôle blanc, Hector).
- `outils/` : `assemble.py` (fabrique l'application), `teste.py` (teste tout dans un navigateur), `validate.js` (vérifie un fichier d'exercices), `FORMAT-EXERCICES.md` (format des données et règles d'écriture).
- `docs/` : la version installable, publiée telle quelle par GitHub Pages. **Ne jamais la modifier à la main** : elle est refaite par `assemble.py`.
- `autonome/` : la même application en un seul fichier HTML, à envoyer par message si besoin.
- `statique/` : icônes, manifeste et service worker copiés dans `docs/`.

Le premier chapitre est fait : « Information chiffrée » (Bordas Seconde, chapitre 10) : évolutions successives, taux global, évolutions réciproques. 34 exercices du livre, 84 questions.

## Ce qu'il ne faut pas ajouter

Pas de comptes, pas de connexion, pas d'Espace prof, pas d'orientation, pas de devoirs rendus en ligne, pas de serveur. La progression reste sur son téléphone. L'application doit rester simple : cours, exercices du livre, entraînement, contrôle blanc.

## Première mise en ligne (une seule fois)

1. Initialiser le dépôt git dans ce dossier, premier commit, branche `main`.
2. Créer le dépôt GitHub public `Abdellah427/evolutions` (ou le nom que je donne) et pousser.
3. Activer GitHub Pages : source `main`, dossier `/docs`.
4. Attendre la mise en ligne, ouvrir l'adresse, vérifier à 390 px de large que tout s'affiche, puis me donner le lien.
5. Me rappeler la marche pour l'élève : ouvrir le lien dans **Safari** (pas dans le navigateur de WhatsApp), Partager, « Sur l'écran d'accueil ».

Avant de créer le dépôt ou d'activer Pages, me demander confirmation.

## Mise à jour du lundi

Je dicte le chapitre vu en cours et j'envoie les photos du livre (cours et exercices). Ensuite :

1. Lire les photos. Recopier fidèlement les nombres et le sens des énoncés du livre ; ne rien inventer.
2. Écrire le cours en français simple et en italien, dans le même style que `src/cours1.html` et `src/cours2.html` : phrases courtes, un exemple du livre par notion, les pièges classiques, une fiche résumé, un lexique français vers italien.
3. Écrire les exercices au format de `outils/FORMAT-EXERCICES.md` : indice, solution commentée pas à pas, erreurs classiques reconnues avec un message qui explique l'erreur. Vérifier chaque fichier avec `node outils/validate.js src/<fichier>.js`.
4. Ajouter des questions d'entraînement aléatoires et des questions de contrôle blanc pour le chapitre (voir `src/app3.js`).
5. Refaire tous les calculs de manière indépendante avant de publier : réponses, solutions, indices, dans les deux langues.
6. `python3 outils/assemble.py`, puis `python3 outils/teste.py`. **Si un test échoue, on ne publie pas.** Quand on ajoute un type de question, on ajoute aussi son recalcul dans `teste.py`.
7. Regarder le résultat à 390 px de large, dans les trois modes de langue (FR, FR·IT, IT).
8. Commit, push. GitHub Pages met de 1 à 10 minutes à servir la nouvelle version. Vérifier le lien, puis me dire que c'est en ligne.

### Quand on ajoutera le deuxième chapitre

Aujourd'hui l'application ne contient qu'un chapitre. Au moment d'ajouter le deuxième, installer un écran d'accueil avec la liste des chapitres (Hector, la progression de chaque chapitre), et ranger chaque chapitre dans son dossier sous `src/`. Le chapitre 10 devient le premier de la liste. Me proposer le plan avant de le faire.

## Attention : l'élève reçoit chaque publication

Dès qu'une version est poussée, elle arrive sur son téléphone à la prochaine ouverture (rechargement automatique, sauf si elle est en train de saisir une réponse).

- Ne jamais pousser une version non testée.
- **Ne jamais renommer ni supprimer un identifiant d'exercice existant, ni changer l'ordre des questions d'un exercice déjà publié** : sa progression est enregistrée sur son téléphone sous la clé `identifiant:numéro de question`. On ajoute, on ne déplace pas.
- Ne jamais changer la clé de stockage (`LS` dans `src/app1.js`).
- Ne pas publier pendant qu'elle risque de travailler (la veille d'un contrôle, le soir). Le bon moment : juste après le cours du lundi.

## Règles à respecter absolument

- **Commits** au nom de `Abdellah427 <95984944+Abdellah427@users.noreply.github.com>` (adresse GitHub masquée : GitHub refuse les envois qui exposent l'adresse personnelle), messages en français, sans emoji. **Aucune ligne Co-Authored-By ni signature** dans les messages. Vérifier avec `git log` après chaque commit.
- **Jamais de tiret long ni de tiret moyen** dans les textes : deux-points, virgules ou parenthèses.
- Aucun nom, prénom, numéro ou adresse de l'élève dans le dépôt : il est public.
- Le nom affiché est **SCOLAIR** ; la mascotte s'appelle **Hector**. Couleurs, polices (Fredoka, Atkinson Hyperlegible), boutons et Hector viennent de l'application Maths Terminale SCOLAIR : ne pas changer l'identité visuelle.
- Mobile d'abord (390 px, iPhone), mode clair seulement, aucun débordement horizontal.
- Italien : on s'adresse à une fille (« Brava »), on dit « tasso reciproco », « variazione », « coefficiente moltiplicativo » ; les pourcentages s'écrivent « 20% » en italien et « 20 % » en français.
- Les énoncés du livre restent fidèles au livre. Si un nombre est illisible sur une photo, me le demander.
- Avant toute action difficile à défaire (créer un dépôt, le rendre public, supprimer, réécrire l'historique), me demander d'abord.
