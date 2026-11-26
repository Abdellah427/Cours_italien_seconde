# Consigne : l'application de révision de maths, aux couleurs de SCOLAIR

## Ce que contient ce dossier

Une application de révision pour **mes deux élèves**, chacune dans sa classe :

- une élève de **Seconde**, italophone, qui a de grandes difficultés surtout à cause du français. Ses chapitres sont écrits en français et en italien. Je lui fais cours tous les lundis, et chaque semaine on ajoute ou on met à jour un chapitre ;
- une élève de **3e**. Ses chapitres sont écrits en français seulement. Je la vois le jeudi soir.

Chacune travaille seule, sur son téléphone. Au premier lancement, l'application demande la classe (voir « Les classes »).

- `src/commun/` : ce qui sert à tous les chapitres (écran d'accueil, navigation, questions, entraînement, contrôle blanc, Hector, styles).
- `src/ch10/`, `src/ch03/` (Seconde), `src/t01/` (3e) : un dossier par chapitre (le cours, les exercices, et `chapitre.js` : classe, groupes d'exercices, questions d'entraînement, questions du contrôle blanc).
- `outils/` : `assemble.py` (fabrique l'application), `teste.py` (teste tout dans un navigateur), `validate.js` (vérifie un fichier d'exercices), `FORMAT-EXERCICES.md` (format des données et règles d'écriture).
- `docs/` : la version installable, publiée telle quelle par GitHub Pages. **Ne jamais la modifier à la main** : elle est refaite par `assemble.py`.
- `autonome/` : la même application en un seul fichier HTML, à envoyer par message si besoin.
- `statique/` : icônes, manifeste et service worker copiés dans `docs/`.

Deux chapitres de Seconde sont faits (manuel Bordas) :

- chapitre 10, « Information chiffrée » : évolutions successives, taux global, évolutions réciproques. 34 exercices, 84 questions ;
- chapitre 3, « Calcul littéral » : priorités, fractions, puissances, racines carrées, développer, factoriser, équations, inéquations. 76 exercices, 84 questions. Les exercices se font sur le cahier, puis on compare avec la solution ; les QCM se font dans l'application.

Un chapitre de 3e est fait :

- « Calculs : priorités, fractions, puissances » : priorités et parenthèses, fractions, puissances de 10, écriture scientifique, et un contrôle blanc type brevet. 19 exercices, 114 questions. Voir « Le chapitre de 3e ».

L'écran d'accueil liste les chapitres de la classe choisie, dans l'ordre où ils ont été ajoutés, avec la progression de chacun.

## Les classes

- Les classes sont déclarées dans `src/commun/base.js` (`NIVEAUX`). Un chapitre appartient à la Seconde, sauf s'il porte `niv: '3e'` dans son `chapitre.js`.
- Au premier lancement, l'accueil demande seulement la classe. Le choix est gardé sur le téléphone ; on peut en changer en haut de l'accueil. Une élève qui utilisait déjà l'application reste dans sa classe sans rien choisir.
- Le lien `https://abdellah427.github.io/Cours_italien_seconde/#3e` (ou `#2de`) ouvre directement l'accueil d'une classe : c'est celui que j'envoie à l'élève.
- La 3e est en français seulement : le choix de la langue (FR, FR·IT, IT) n'apparaît pas, et les textes de ses chapitres sont de simples chaînes, sans traduction.

## Le chapitre de 3e

Il vise trois erreurs : appliquer la règle d'une autre opération (multiplier quand c'est une soustraction), oublier les priorités, oublier les parenthèses. Et une habitude à prendre : montrer sa démarche.

- La méthode revient partout, toujours avec les mêmes mots : « Qu'est-ce que je fais en premier ? Quelle règle j'utilise ? Comment je l'applique ? ». Dans une solution, chaque étape s'écrit « **En premier : la multiplication.** », puis à la ligne « Règle : ... », puis le calcul posé, le nom de l'expression recopié à chaque ligne comme sur une copie.
- Ce que l'on calcule en premier est souligné (`class="prem"`).
- Les exercices vont par paires qui se ressemblent (mêmes nombres, opération ou parenthèses différentes) ; les erreurs attendues sont reconnues et expliquées (« Tu as fait l'addition en premier. »).
- Dans l'application, l'élève tape seulement le résultat : le calcul se fait sur le cahier, une étape par ligne. Les consignes le rappellent.
- Aucun prénom d'élève : « Lucas » (les calculs à corriger) est un élève imaginaire.

## Ce qu'il ne faut pas ajouter

Pas de comptes, pas de connexion, pas d'Espace prof, pas d'orientation, pas de devoirs rendus en ligne, pas de serveur. La progression reste sur son téléphone. L'application doit rester simple : cours, exercices, entraînement, contrôle blanc. Une seule touche de jeu, pour donner envie de travailler : les tenues et les danses d'Hector (voir plus bas). Pas de classement, pas de points à dépenser, pas de boutique.

## L'application se suffit à elle-même

L'élève travaille seule avec l'application, sans le manuel à côté. Le livre et le cahier servent à écrire le contenu, mais rien à l'écran n'y renvoie :

- pas de numéro de page, pas de « du livre » ni « du manuel », pas de « Capacité 4 » ni de numéro d'exercice du livre ;
- les exercices sont numérotés par l'application, dans l'ordre de la liste (1, 2, 3...) ;
- pas de liste d'exercices « pour aller plus loin dans le manuel », pas de note annexe (histoire, logiciels) : seulement ce qui sert à réviser ;
- dans les données, `num` et `page` gardent la trace de l'origine d'un exercice : ils ne sont pas affichés.

## Les tenues et les danses d'Hector

En travaillant, l'élève gagne dix récompenses pour Hector : six tenues (des accessoires qu'il porte partout dans l'application) et quatre danses. Sur l'accueil, sous Hector, un bouton mène à la vue où on les regarde, où on essaie une tenue, où on la met et où on le fait danser. Quand une récompense est gagnée pendant le travail, Hector l'annonce dans une bulle.

| Récompense | Ce qu'il faut faire |
| --- | --- |
| Le crayon | 5 questions réussies dans les exercices |
| L'écharpe | 15 questions réussies dans les exercices |
| Le nœud papillon | 30 questions réussies dans les exercices |
| Les lunettes de soleil | 5 questions réussies de suite à l'entraînement |
| La toque | 10 / 20 ou plus à un contrôle blanc |
| La couronne | 16 / 20 ou plus à un contrôle blanc |
| La toupie (danse) | 3 questions réussies de suite à l'entraînement |
| Le jongleur (danse) | 10 questions réussies à l'entraînement |
| Le disco (danse) | 50 questions réussies dans les exercices |
| Le moonwalk (danse) | 80 questions réussies dans les exercices |

- Tout se compte tous chapitres confondus. Une récompense gagnée le reste, même si une question est remise « à refaire ».
- Deux tenues au même endroit ne se portent pas ensemble (écharpe ou nœud papillon ; toque ou couronne). La danse choisie en dernier est celle qu'Hector fait quand un exercice est fini.
- Les récompenses demandent du travail juste, pas du temps passé : rien ne se gagne en ouvrant une solution ou en touchant Hector.
- Les règles et la vue sont dans `src/commun/jeu.js` (tableau `REC`). Un accessoire est un groupe `owl-acc-...` du dessin `owl.svg`, affiché par une classe `acc-...` (`chouette.css`) ; une danse est un geste de `chouette.js` (`OWL_ANIMS`) animé dans `chouette.css`. Pour en ajouter une : une ligne dans `REC`, le dessin ou le geste, la ligne du tableau ci-dessus, et le seuil dans `outils/teste.py` (`JEU_BUTS`), qui les réécrit une seconde fois pour les vérifier.
- Enregistré sur le téléphone, dans `jeu` : `ok` (gagnées), `vus` (déjà montrées), `port` (tenues portées), `danse` (la danse préférée).
- Les deux classes ont les mêmes récompenses ; en Seconde, les textes sont aussi en italien.

## Présentation : ce qui doit rester vrai

L'écran est étroit et l'élève lit lentement : la forme compte autant que le fond.

- **Un calcul se pose ligne par ligne**, une étape par ligne, les signes « = » les uns sous les autres (bloc `.calc`, voir `outils/FORMAT-EXERCICES.md`). Pour une équation : une équation par ligne, le signe ⇔ au début de chaque nouvelle ligne.
- **Une formule n'est jamais coupée en fin de ligne.** Courte, elle est insécable (`class="m nw"`) ; longue, elle est posée à part, en lignes alignées.
- **Une question par ligne** : dans un énoncé, « 1. », « 2. », « a. », « b. » commencent chacun une ligne, le numéro en gras.
- **Une idée par ligne** : on revient à la ligne dès qu'une nouvelle idée commence (« Règle : », « Attention : », « Méthode : », « Barème : », le constat d'une erreur puis la règle à appliquer). Dans les chapitres de 3e, chaque phrase d'une consigne, d'un indice, d'un message ou d'un commentaire de solution commence sur sa ligne (`<br>`), sauf après un simple « Oui. ».
- Une remarque sur un calcul se place sous l'étape qu'elle explique, en petit.
- Les tableaux de règles (nom, règle, exemple) deviennent des fiches sur téléphone (`class="tb fx"`).
- Aucun bloc à faire défiler de gauche à droite.
- **Tout se lit page par page, sans faire défiler l'écran** : en haut, une barre se remplit ; en bas, Précédent et Suivant (on peut aussi glisser le doigt). `moteur.js` découpe lui-même en pages à la hauteur du téléphone :
  - le cours : chaque partie en pages ;
  - les exercices : l'exercice touché dans la liste prend tout l'écran (les onglets s'effacent, la flèche du haut ramène à la liste), son numéro et son titre en haut ; l'énoncé d'abord, puis une question par page ; une solution affichée continue sur les pages suivantes ; le bouton « Énoncé » fait réapparaître l'énoncé au-dessus d'une question ;
  - le contrôle blanc : la consigne, une question par page, une page « Corriger » qui montre les questions sans réponse, puis la note et les corrections ; un numéro touché mène à sa question ;
  - l'entraînement : une question à l'écran ; la barre du haut se remplit en cinq bonnes réponses de suite ; la série et « Nouvelle question » restent en bas.

  Il suffit d'écrire comme d'habitude, en petits blocs (un encadré par idée, des paragraphes courts, les deux langues l'une après l'autre, des énoncés et des questions brefs). Un bloc d'un seul tenant plus haut que l'écran (un très long paragraphe, une grande figure) oblige à faire défiler : le test le signale.
- Pas de grand titre ni de texte d'introduction en haut des vues : l'onglet dit déjà où l'on est, et la place sert au contenu.

`outils/teste.py` contrôle tout cela dans les trois modes de langue : signes « = » alignés, aucune formule coupée, aucune formule plus large que son bloc, aucun tableau ni calcul qui défile. Il tourne aussi toutes les pages, avec les marges d'un iPhone 13 : celles du cours, de chaque exercice (tel qu'on l'ouvre, puis solutions affichées) et d'un contrôle blanc complet. Aucune page à faire défiler, aucune page vide, tout le contenu affiché une fois et une seule, la reprise à la bonne page. À l'entraînement, chaque question doit tenir au-dessus du bouton du bas.

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

Ce qui suit vaut pour la Seconde. Pour la 3e, voir aussi « Ajouter un chapitre de 3e ».

1. Créer `src/chNN/` avec : le cours (`cours1.html`...), les exercices (`exA.js`...) et `chapitre.js`. Prendre `src/ch10/` comme modèle pour un chapitre avec des réponses à taper, `src/ch03/` pour un chapitre de calcul littéral (formules en HTML, cours en plusieurs pages, exercices à faire sur le cahier).
2. La vue du cours s'appelle `<section id="v-cours-cNN" class="view" data-ch="cNN" hidden>` ; elle contient la liste des parties (`<div class="toc">`, un bouton `data-go` par partie) puis une `<article class="lesson" id="...">` par partie. Le découpage en pages se fait tout seul. Les identifiants d'exercices commencent par `cNN` (sauf ceux du chapitre 10, déjà publiés).
3. Déclarer le chapitre dans `outils/assemble.py` (liste `CHAPITRES`, dans l'ordre de l'écran d'accueil : le nouveau à la fin) et ses groupes d'exercices dans `outils/validate.js`.
4. Ajouter dans `outils/teste.py` le recalcul des questions d'entraînement et de contrôle du chapitre (dictionnaire `RECALCUL`).

### Ajouter un chapitre de 3e

Même démarche, avec ces différences (modèle : `src/t01/`) :

1. Le dossier s'appelle `src/tNN/`, le chapitre `tN` : la vue du cours `v-cours-tN`, les identifiants d'exercices `tNe1`, `tNe2`...
2. Dans `chapitre.js`, le chapitre porte `niv: '3e'`.
3. Tout est écrit en français seulement : un texte est une simple chaîne (pas de `{ fr, it }`, pas de `class="it"`). Déclarer le chapitre dans la liste `MONO` de `outils/validate.js`.
4. Une phrase par ligne (voir « Présentation »), et la méthode du chapitre de 3e (voir « Le chapitre de 3e »).

## Attention : les élèves reçoivent chaque publication

Dès qu'une version est poussée, elle arrive sur leur téléphone à la prochaine ouverture (rechargement automatique, sauf pendant la saisie d'une réponse ou un contrôle blanc). Les deux classes partagent la même application : une publication pour l'une arrive aussi chez l'autre.

- Ne jamais pousser une version non testée.
- **Ne jamais renommer ni supprimer un identifiant d'exercice existant, ni changer l'ordre des questions d'un exercice déjà publié** : sa progression est enregistrée sur son téléphone sous la clé `identifiant:numéro de question`. On ajoute, on ne déplace pas.
- Ne jamais changer la clé de stockage (`LS` dans `src/commun/base.js`). Le chapitre 10 garde ses données à la racine du stockage, les autres chapitres dans `ch.cNN` ou `ch.tN`. La classe choisie est gardée dans `niv`.
- Ne pas publier pendant qu'une élève risque de travailler (la veille d'un contrôle, le soir). Le bon moment : juste après un cours.

## Règles à respecter absolument

- **Commits** au nom de `Abdellah427 <95984944+Abdellah427@users.noreply.github.com>` (adresse GitHub masquée : GitHub refuse les envois qui exposent l'adresse personnelle), messages en français, sans emoji. **Aucune ligne Co-Authored-By ni signature** dans les messages. Vérifier avec `git log` après chaque commit.
- **Jamais de tiret long ni de tiret moyen** dans les textes : deux-points, virgules ou parenthèses.
- Aucun nom, prénom, numéro ou adresse d'une élève dans le dépôt : il est public. Rien non plus sur ses notes ni sur ce qu'en disent ses professeurs. Pas de photo du manuel ni du cahier dans le dépôt.
- Le nom affiché est **SCOLAIR** ; la mascotte s'appelle **Hector**. Couleurs, polices (Fredoka, Atkinson Hyperlegible), boutons et Hector viennent de l'application Maths Terminale SCOLAIR : ne pas changer l'identité visuelle. Les formules sont écrites avec la police STIX Two Text, comme dans un manuel.
- Mobile d'abord (390 px, iPhone), mode clair seulement, aucun débordement horizontal.
- Italien (Seconde) : on s'adresse à une fille (« Brava »), on dit « tasso reciproco », « variazione », « coefficiente moltiplicativo », « sviluppare », « scomporre in fattori », « prodotti notevoli », « disequazione » ; les pourcentages s'écrivent « 20% » en italien et « 20 % » en français.
- Les énoncés repris du livre lui restent fidèles (nombres, sens), sans le citer. Si un nombre est illisible sur une photo, me le demander.
- Avant toute action difficile à défaire (créer un dépôt, le rendre public, supprimer, réécrire l'historique), me demander d'abord.
