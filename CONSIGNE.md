# Consigne : l'application de révision de maths (Seconde), aux couleurs de SCOLAIR

## Ce que contient ce dossier

Une application de révision pour **une seule élève** de Seconde, italophone, qui a de grandes difficultés surtout à cause du français. Elle travaille seule, sur iPhone. Je lui fais cours tous les lundis, et chaque semaine on ajoute ou on met à jour un chapitre.

- `src/commun/` : ce qui sert à tous les chapitres (écran d'accueil, navigation, questions, entraînement, contrôle blanc, Hector, styles).
- `src/ch10/`, `src/ch03/` : un dossier par chapitre (le cours, les exercices, et `chapitre.js` : groupes d'exercices, questions d'entraînement, questions du contrôle blanc).
- `outils/` : `assemble.py` (fabrique l'application), `teste.py` (teste tout dans un navigateur), `validate.js` (vérifie un fichier d'exercices), `FORMAT-EXERCICES.md` (format des données et règles d'écriture).
- `docs/` : la version installable, publiée telle quelle par GitHub Pages. **Ne jamais la modifier à la main** : elle est refaite par `assemble.py`.
- `autonome/` : la même application en un seul fichier HTML, à envoyer par message si besoin.
- `statique/` : icônes, manifeste et service worker copiés dans `docs/`.

Deux chapitres sont faits (manuel Bordas de Seconde) :

- chapitre 10, « Information chiffrée » : évolutions successives, taux global, évolutions réciproques. 34 exercices, 84 questions ;
- chapitre 3, « Calcul littéral » : priorités, fractions, puissances, racines carrées, développer, factoriser, équations, inéquations. 76 exercices, 84 questions. Les exercices se font sur le cahier, puis on compare avec la solution ; les QCM se font dans l'application.

L'écran d'accueil liste les chapitres dans l'ordre où ils ont été ajoutés, avec la progression de chacun.

## Ce qu'il ne faut pas ajouter

Pas de comptes, pas de connexion, pas d'Espace prof, pas d'orientation, pas de devoirs rendus en ligne, pas de serveur. La progression reste sur son téléphone. L'application doit rester simple : cours, exercices, entraînement, contrôle blanc.

## L'application se suffit à elle-même

L'élève travaille seule avec l'application, sans le manuel à côté. Le livre et le cahier servent à écrire le contenu, mais rien à l'écran n'y renvoie :

- pas de numéro de page, pas de « du livre » ni « du manuel », pas de « Capacité 4 » ni de numéro d'exercice du livre ;
- les exercices sont numérotés par l'application, dans l'ordre de la liste (1, 2, 3...) ;
- pas de liste d'exercices « pour aller plus loin dans le manuel », pas de note annexe (histoire, logiciels) : seulement ce qui sert à réviser ;
- dans les données, `num` et `page` gardent la trace de l'origine d'un exercice : ils ne sont pas affichés.

## Présentation : ce qui doit rester vrai

L'écran est étroit et l'élève lit lentement : la forme compte autant que le fond.

- **Un calcul se pose ligne par ligne**, une étape par ligne, les signes « = » les uns sous les autres (bloc `.calc`, voir `outils/FORMAT-EXERCICES.md`). Pour une équation : une équation par ligne, le signe ⇔ au début de chaque nouvelle ligne.
- **Une formule n'est jamais coupée en fin de ligne.** Courte, elle est insécable (`class="m nw"`) ; longue, elle est posée à part, en lignes alignées.
- **Une question par ligne** : dans un énoncé, « 1. », « 2. », « a. », « b. » commencent chacun une ligne, le numéro en gras.
- Une remarque sur un calcul se place sous l'étape qu'elle explique, en petit.
- Les tableaux de règles (nom, règle, exemple) deviennent des fiches sur téléphone (`class="tb fx"`).
- Aucun bloc à faire défiler de gauche à droite.

`outils/teste.py` contrôle tout cela dans les trois modes de langue : signes « = » alignés, aucune formule coupée, aucune formule plus large que son bloc, aucun tableau ni calcul qui défile.

## Première mise en ligne (une seule fois)

Le dépôt public est `Abdellah427/Cours_italien_seconde`, branche `main`. Il reste à faire, une seule fois :

1. Activer GitHub Pages (sur GitHub : Settings, Pages, « Deploy from a branch », branche `main`, dossier `/docs`).
2. Attendre la mise en ligne (1 à 10 minutes), ouvrir https://abdellah427.github.io/Cours_italien_seconde/, vérifier à 390 px de large que tout s'affiche.
3. Pour l'élève : ouvrir le lien dans **Safari** (pas dans le navigateur de WhatsApp), Partager, « Sur l'écran d'accueil ». C'est important : installée sur l'écran d'accueil, l'application garde sa progression et marche hors ligne.

## Mise à jour du lundi

Je dicte le chapitre vu en cours et j'envoie les photos du livre (cours et exercices). Ensuite :

1. Lire les photos. Recopier fidèlement les nombres et le sens des énoncés du livre ; ne rien inventer. À l'écran, rien ne renvoie au livre (voir « L'application se suffit à elle-même »).
2. Écrire le cours en français simple et en italien, dans le même style que `src/ch10/cours1.html` et `src/ch10/cours2.html` : phrases courtes, un exemple par notion, les pièges classiques, une fiche résumé, un lexique français vers italien. Chaque calcul est posé ligne par ligne (voir « Présentation »).
3. Écrire les exercices au format de `outils/FORMAT-EXERCICES.md` : indice, solution commentée pas à pas, erreurs classiques reconnues avec un message qui explique l'erreur. Vérifier chaque fichier avec `node outils/validate.js src/<chapitre>/<fichier>.js`.
4. Ajouter des questions d'entraînement aléatoires et des questions de contrôle blanc pour le chapitre (dans `src/<chapitre>/chapitre.js`).
5. Refaire tous les calculs de manière indépendante avant de publier : réponses, solutions, indices, dans les deux langues.
6. `python3 outils/assemble.py`, puis `python3 outils/teste.py`. **Si un test échoue, on ne publie pas.** Quand on ajoute un type de question, on ajoute aussi son recalcul dans `teste.py`.
7. Regarder le résultat à 390 px de large, dans les trois modes de langue (FR, FR·IT, IT) : retours à la ligne, alignement des calculs, rien de trop dense.
8. Commit, push. GitHub Pages met de 1 à 10 minutes à servir la nouvelle version. Vérifier le lien, puis me dire que c'est en ligne.

### Ajouter un chapitre

1. Créer `src/chNN/` avec : le cours (`cours1.html`...), les exercices (`exA.js`...) et `chapitre.js`. Prendre `src/ch10/` comme modèle pour un chapitre avec des réponses à taper, `src/ch03/` pour un chapitre de calcul littéral (formules en HTML, cours en plusieurs pages, exercices à faire sur le cahier).
2. La vue du cours s'appelle `<section id="v-cours-cNN" class="view" data-ch="cNN" hidden>`. Les identifiants d'exercices commencent par `cNN` (sauf ceux du chapitre 10, déjà publiés).
3. Déclarer le chapitre dans `outils/assemble.py` (liste `CHAPITRES`, dans l'ordre de l'écran d'accueil : le nouveau à la fin) et ses groupes d'exercices dans `outils/validate.js`.
4. Ajouter dans `outils/teste.py` le recalcul des questions d'entraînement et de contrôle du chapitre (dictionnaire `RECALCUL`).

## Attention : l'élève reçoit chaque publication

Dès qu'une version est poussée, elle arrive sur son téléphone à la prochaine ouverture (rechargement automatique, sauf si elle est en train de saisir une réponse ou de faire un contrôle blanc).

- Ne jamais pousser une version non testée.
- **Ne jamais renommer ni supprimer un identifiant d'exercice existant, ni changer l'ordre des questions d'un exercice déjà publié** : sa progression est enregistrée sur son téléphone sous la clé `identifiant:numéro de question`. On ajoute, on ne déplace pas.
- Ne jamais changer la clé de stockage (`LS` dans `src/commun/base.js`). Le chapitre 10 garde ses données à la racine du stockage, les autres chapitres dans `ch.cNN`.
- Ne pas publier pendant qu'elle risque de travailler (la veille d'un contrôle, le soir). Le bon moment : juste après le cours du lundi.

## Règles à respecter absolument

- **Commits** au nom de `Abdellah427 <95984944+Abdellah427@users.noreply.github.com>` (adresse GitHub masquée : GitHub refuse les envois qui exposent l'adresse personnelle), messages en français, sans emoji. **Aucune ligne Co-Authored-By ni signature** dans les messages. Vérifier avec `git log` après chaque commit.
- **Jamais de tiret long ni de tiret moyen** dans les textes : deux-points, virgules ou parenthèses.
- Aucun nom, prénom, numéro ou adresse de l'élève dans le dépôt : il est public. Pas de photo du manuel ni du cahier dans le dépôt.
- Le nom affiché est **SCOLAIR** ; la mascotte s'appelle **Hector**. Couleurs, polices (Fredoka, Atkinson Hyperlegible), boutons et Hector viennent de l'application Maths Terminale SCOLAIR : ne pas changer l'identité visuelle. Les formules sont écrites avec la police STIX Two Text, comme dans un manuel.
- Mobile d'abord (390 px, iPhone), mode clair seulement, aucun débordement horizontal.
- Italien : on s'adresse à une fille (« Brava »), on dit « tasso reciproco », « variazione », « coefficiente moltiplicativo », « sviluppare », « scomporre in fattori », « prodotti notevoli », « disequazione » ; les pourcentages s'écrivent « 20% » en italien et « 20 % » en français.
- Les énoncés repris du livre lui restent fidèles (nombres, sens), sans le citer. Si un nombre est illisible sur une photo, me le demander.
- Avant toute action difficile à défaire (créer un dépôt, le rendre public, supprimer, réécrire l'historique), me demander d'abord.
