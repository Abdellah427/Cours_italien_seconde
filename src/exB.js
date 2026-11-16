EXOS.push({
  id: 'ex150', group: 'recip', num: '150', page: 315, stars: 1,
  tag: { fr: 'VOCABULAIRE', it: 'VOCABOLARIO' },
  title: { fr: 'Compléter la définition', it: 'Completa la definizione' },
  text: {
    fr: '<p>Recopier et compléter la phrase suivante :</p>',
    it: '<p>Ricopia e completa la frase seguente:</p>'
  },
  parts: [{
    q: { fr: 'Lorsque le coefficient multiplicateur global de deux évolutions est égal à 1, on dit que ces évolutions sont … .',
         it: 'Quando il coefficiente moltiplicativo globale di due variazioni è uguale a 1, si dice che queste variazioni sono … .' },
    kind: 'choice',
    choices: [
      { fr: 'successives', it: 'successive' },
      { fr: 'réciproques', it: 'reciproche' },
      { fr: 'globales', it: 'globali' },
      { fr: 'opposées', it: 'opposte' }
    ],
    correct: 1,
    hint: {
      fr: 'Un coefficient global égal à 1 veut dire : à la fin, on retrouve la valeur de départ. La deuxième évolution « annule » la première. Quel mot du cours décrit ce cas ?',
      it: 'Un coefficiente globale uguale a 1 vuol dire: alla fine si ritrova il valore di partenza. La seconda variazione «annulla» la prima. Quale parola del corso descrive questo caso?'
    },
    sol: {
      fr: '<ol><li>Multiplier par 1 ne change rien : après les deux évolutions, on retrouve la valeur de départ.</li>' +
          '<li>La deuxième évolution annule la première. Exemple : +25 % puis −20 %, car 1,25 × 0,8 = 1.</li>' +
          '<li>Cours : deux évolutions sont réciproques lorsque leur coefficient multiplicateur global est égal à 1.</li></ol>' +
          '<p>Ces évolutions sont <b>réciproques</b>.</p>',
      it: '<ol><li>Moltiplicare per 1 non cambia niente: dopo le due variazioni si ritrova il valore di partenza.</li>' +
          '<li>La seconda variazione annulla la prima. Esempio: +25% e poi −20%, perché 1,25 × 0,8 = 1.</li>' +
          '<li>Corso: due variazioni sono reciproche quando il loro coefficiente moltiplicativo globale è uguale a 1.</li></ol>' +
          '<p>Queste variazioni sono <b>reciproche</b>.</p>'
    }
  }]
});

EXOS.push({
  id: 'cap5', group: 'recip', num: 'Capacité 5', page: 303, stars: 2,
  title: { fr: 'Les connexions d’un site', it: 'Le connessioni di un sito' },
  text: {
    fr: '<p>Un administrateur de site web fait chaque année le bilan de l’attractivité de son site.</p>',
    it: '<p>Ogni anno l’amministratore di un sito web fa il bilancio dell’attrattività del suo sito.</p>'
  },
  parts: [{
    q: { fr: 'Entre 2019 et 2020, le nombre de connexions au site a diminué de 12 %. Déterminer, à 0,1 % près, le pourcentage d’augmentation nécessaire entre 2020 et 2021 pour revenir au nombre de connexions initial.',
         it: 'Tra il 2019 e il 2020, il numero di connessioni al sito è diminuito del 12%. Determina la percentuale di aumento necessaria tra il 2020 e il 2021 per tornare al numero iniziale di connessioni, arrotondata allo 0,1%.' },
    kind: 'num',
    label: { fr: 'Pourcentage d’augmentation', it: 'Percentuale di aumento' }, unit: '%', ans: 13.6, tol: 0.05, sign: 'abs',
    traps: [
      { v: 12,
        fr: 'Dans l’autre sens, ce n’est pas le même pourcentage. Après la baisse, on part d’un nombre plus petit : il faut augmenter de plus de 12 %. Calcule C′ = 1 ÷ 0,88.',
        it: 'Nell’altro senso la percentuale non è la stessa. Dopo il calo si parte da un numero più piccolo: bisogna aumentare di più del 12%. Calcola C′ = 1 ÷ 0,88.' },
      { v: 113.6,
        fr: 'Tu as donné le coefficient 1,136 en pourcentage. Le taux, c’est C′ − 1.',
        it: 'Hai dato il coefficiente 1,136 in percentuale. Il tasso è C′ − 1.' }
    ],
    hint: {
      fr: 'Diminuer de 12 % revient à multiplier par 0,88. Pour revenir au nombre initial, on multiplie par le coefficient réciproque C′ = 1 ÷ 0,88. Ensuite, le taux est t′ = C′ − 1.',
      it: 'Diminuire del 12% vuol dire moltiplicare per 0,88. Per tornare al numero iniziale si moltiplica per il coefficiente reciproco C′ = 1 ÷ 0,88. Poi il tasso è t′ = C′ − 1.'
    },
    sol: {
      fr: '<ol><li>Diminuer de 12 % revient à multiplier par 1 − 0,12 = 0,88.</li>' +
          '<li>Coefficient multiplicateur de l’évolution réciproque : C′ = 1 ÷ 0,88 ≈ 1,136 (à 10<sup>−3</sup> près).</li>' +
          '<li>Taux réciproque : t′ = C′ − 1 ≈ 1,136 − 1 = 0,136 = 13,6 %.</li></ol>' +
          '<p>Il faut une augmentation d’environ <b>13,6 %</b> (et non de 12 %) pour revenir au nombre de connexions initial.</p>',
      it: '<ol><li>Diminuire del 12% vuol dire moltiplicare per 1 − 0,12 = 0,88.</li>' +
          '<li>Coefficiente moltiplicativo della variazione reciproca: C′ = 1 ÷ 0,88 ≈ 1,136 (arrotondato a 10<sup>−3</sup>).</li>' +
          '<li>Tasso reciproco: t′ = C′ − 1 ≈ 1,136 − 1 = 0,136 = 13,6%.</li></ol>' +
          '<p>Serve un aumento del <b>13,6%</b> circa (e non del 12%) per tornare al numero iniziale di connessioni.</p>'
    }
  }, {
    q: { fr: 'Entre 2021 et 2022, le nombre de connexions a augmenté de 4,5 % pour s’établir début 2022 à 1 463 connexions par jour. Combien y avait-il de connexions par jour à ce site début 2021 ?',
         it: 'Tra il 2021 e il 2022, il numero di connessioni è aumentato del 4,5% ed è arrivato, all’inizio del 2022, a 1 463 connessioni al giorno. Quante connessioni al giorno aveva questo sito all’inizio del 2021?' },
    kind: 'num',
    label: { fr: 'Connexions début 2021', it: 'Connessioni inizio 2021' }, unit: 'connexions', ans: 1400, tol: 0.01, sign: 'strict',
    traps: [
      { v: 1397.165,
        fr: 'Tu as fait 1 463 × 0,955 (enlever 4,5 %). Mais les 4,5 % sont calculés sur le nombre de 2021, pas sur 1 463 : on divise par 1,045.',
        it: 'Hai fatto 1 463 × 0,955 (togliere il 4,5%). Ma il 4,5% è calcolato sul numero del 2021, non su 1 463: si divide per 1,045.' },
      { v: 1397,
        fr: 'Tu as fait 1 463 × 0,955 (enlever 4,5 %). Mais les 4,5 % sont calculés sur le nombre de 2021, pas sur 1 463 : on divise par 1,045.',
        it: 'Hai fatto 1 463 × 0,955 (togliere il 4,5%). Ma il 4,5% è calcolato sul numero del 2021, non su 1 463: si divide per 1,045.' },
      { v: 1528.835,
        fr: 'Tu as multiplié par 1,045. Mais 1 463 est déjà le nombre après l’augmentation : pour revenir en arrière, on divise par 1,045.',
        it: 'Hai moltiplicato per 1,045. Ma 1 463 è già il numero dopo l’aumento: per tornare indietro si divide per 1,045.' }
    ],
    hint: {
      fr: 'Augmenter de 4,5 % revient à multiplier par 1,045 : connexions début 2021 × 1,045 = 1 463. Pour retrouver la valeur initiale, divise la valeur finale par le coefficient.',
      it: 'Aumentare del 4,5% vuol dire moltiplicare per 1,045: connessioni inizio 2021 × 1,045 = 1 463. Per ritrovare il valore iniziale, dividi il valore finale per il coefficiente.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 4,5 % revient à multiplier par 1 + 0,045 = 1,045.</li>' +
          '<li>Donc : connexions début 2021 × 1,045 = 1 463.</li>' +
          '<li>Valeur initiale = valeur finale ÷ C = 1 463 ÷ 1,045 = 1 400.</li></ol>' +
          '<p>Début 2021, il y avait <b>1 400 connexions</b> par jour.</p>',
      it: '<ol><li>Aumentare del 4,5% vuol dire moltiplicare per 1 + 0,045 = 1,045.</li>' +
          '<li>Quindi: connessioni inizio 2021 × 1,045 = 1 463.</li>' +
          '<li>Valore iniziale = valore finale ÷ C = 1 463 ÷ 1,045 = 1 400.</li></ol>' +
          '<p>All’inizio del 2021 c’erano <b>1 400 connessioni</b> al giorno.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex127', group: 'recip', num: '127', page: 312, stars: 2,
  title: { fr: 'L’épaisseur d’un livre', it: 'Lo spessore di un libro' },
  text: {
    fr: '<p>Entre son édition « classique » et son édition « poche », l’épaisseur d’un livre a diminué de 36 %.</p>',
    it: '<p>Tra la sua edizione «classica» e la sua edizione «tascabile», lo spessore di un libro è diminuito del 36%.</p>'
  },
  parts: [{
    q: { fr: 'Déterminer le pourcentage d’augmentation de l’épaisseur du livre entre l’édition poche et l’édition classique.',
         it: 'Determina la percentuale di aumento dello spessore del libro tra l’edizione tascabile e l’edizione classica.' },
    kind: 'num',
    label: { fr: 'Pourcentage d’augmentation', it: 'Percentuale di aumento' }, unit: '%', ans: 56.25, tol: 0.005, sign: 'abs',
    traps: [
      { v: 36,
        fr: 'Dans l’autre sens, ce n’est pas le même pourcentage. L’édition poche est plus mince : pour revenir à l’édition classique, il faut augmenter de plus de 36 %. Calcule C′ = 1 ÷ 0,64.',
        it: 'Nell’altro senso la percentuale non è la stessa. L’edizione tascabile è più sottile: per tornare all’edizione classica bisogna aumentare di più del 36%. Calcola C′ = 1 ÷ 0,64.' },
      { v: 156.25,
        fr: 'Tu as donné le coefficient 1,5625 en pourcentage. Le taux, c’est C′ − 1.',
        it: 'Hai dato il coefficiente 1,5625 in percentuale. Il tasso è C′ − 1.' }
    ],
    hint: {
      fr: 'Classique → poche : on multiplie par 1 − 0,36 = 0,64. Poche → classique, c’est le chemin inverse : C′ = 1 ÷ 0,64, puis t′ = C′ − 1.',
      it: 'Classica → tascabile: si moltiplica per 1 − 0,36 = 0,64. Tascabile → classica è il percorso inverso: C′ = 1 ÷ 0,64, poi t′ = C′ − 1.'
    },
    sol: {
      fr: '<ol><li>Classique → poche : diminuer de 36 % revient à multiplier par 1 − 0,36 = 0,64.</li>' +
          '<li>Poche → classique : coefficient réciproque C′ = 1 ÷ 0,64 = 1,5625.</li>' +
          '<li>Taux réciproque : t′ = C′ − 1 = 0,5625 = 56,25 %.</li></ol>' +
          '<p>De l’édition poche à l’édition classique, l’épaisseur augmente de <b>56,25 %</b> (et non de 36 %).</p>',
      it: '<ol><li>Classica → tascabile: diminuire del 36% vuol dire moltiplicare per 1 − 0,36 = 0,64.</li>' +
          '<li>Tascabile → classica: coefficiente reciproco C′ = 1 ÷ 0,64 = 1,5625.</li>' +
          '<li>Tasso reciproco: t′ = C′ − 1 = 0,5625 = 56,25%.</li></ol>' +
          '<p>Dall’edizione tascabile all’edizione classica, lo spessore aumenta del <b>56,25%</b> (e non del 36%).</p>'
    }
  }, {
    q: { fr: 'L’édition « luxe » a une épaisseur de 4,6 cm. Cette édition est 15 % plus épaisse que l’édition classique. Quelle est l’épaisseur de l’édition classique ?',
         it: 'L’edizione «di lusso» ha uno spessore di 4,6 cm. Questa edizione è più spessa del 15% rispetto all’edizione classica. Qual è lo spessore dell’edizione classica?' },
    kind: 'num',
    label: { fr: 'Édition classique', it: 'Edizione classica' }, unit: 'cm', ans: 4, tol: 0.005, sign: 'strict',
    traps: [
      { v: 3.91,
        fr: 'Tu as fait 4,6 × 0,85 (enlever 15 %). Mais les 15 % sont calculés sur l’édition classique, pas sur 4,6 cm : on divise par 1,15.',
        it: 'Hai fatto 4,6 × 0,85 (togliere il 15%). Ma il 15% è calcolato sull’edizione classica, non su 4,6 cm: si divide per 1,15.' },
      { v: 5.29,
        fr: 'Tu as multiplié par 1,15. Mais 4,6 cm est déjà l’épaisseur après l’augmentation : pour revenir en arrière, on divise par 1,15.',
        it: 'Hai moltiplicato per 1,15. Ma 4,6 cm è già lo spessore dopo l’aumento: per tornare indietro si divide per 1,15.' }
    ],
    hint: {
      fr: '15 % plus épaisse : épaisseur classique × 1,15 = 4,6. Pour retrouver la valeur initiale, divise la valeur finale par le coefficient.',
      it: 'Più spessa del 15%: spessore classica × 1,15 = 4,6. Per ritrovare il valore iniziale, dividi il valore finale per il coefficiente.'
    },
    sol: {
      fr: '<ol><li>15 % plus épaisse : on multiplie par 1 + 0,15 = 1,15. Donc épaisseur classique × 1,15 = 4,6 cm.</li>' +
          '<li>Valeur initiale = valeur finale ÷ C = 4,6 ÷ 1,15 = 4.</li>' +
          '<li>Vérification : 4 × 1,15 = 4,6.</li></ol>' +
          '<p>L’édition classique a une épaisseur de <b>4 cm</b>.</p>',
      it: '<ol><li>Più spessa del 15%: si moltiplica per 1 + 0,15 = 1,15. Quindi spessore classica × 1,15 = 4,6 cm.</li>' +
          '<li>Valore iniziale = valore finale ÷ C = 4,6 ÷ 1,15 = 4.</li>' +
          '<li>Verifica: 4 × 1,15 = 4,6.</li></ol>' +
          '<p>L’edizione classica ha uno spessore di <b>4 cm</b>.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex128', group: 'recip', num: '128', page: 312, stars: 2,
  tag: { fr: 'CALCULATRICE', it: 'CALCOLATRICE' },
  title: { fr: 'Du quotient au taux', it: 'Dal quoziente al tasso' },
  text: {
    fr: '<p>À l’aide de la calculatrice, écrire chaque quotient sous forme décimale arrondie à 10<sup>−3</sup> près. Préciser si l’évolution associée à ce coefficient est une augmentation ou une diminution et donner son taux sous forme de pourcentage.</p>' +
        '<p>a. 1 ÷ 1,8 ; b. 1 ÷ 0,7 ; c. 1 ÷ 0,51 ; d. 1 ÷ 1,235</p>',
    it: '<p>Con la calcolatrice, scrivi ogni quoziente in forma decimale, arrotondato al millesimo (10<sup>−3</sup>). Indica se la variazione associata a questo coefficiente è un aumento o una diminuzione e dai il suo tasso in percentuale.</p>' +
        '<p>a. 1 ÷ 1,8; b. 1 ÷ 0,7; c. 1 ÷ 0,51; d. 1 ÷ 1,235</p>'
  },
  parts: [{
    q: { fr: 'Quotient a : écrire 1 ÷ 1,8 sous forme décimale, arrondi à 10<sup>−3</sup> près (3 chiffres après la virgule).',
         it: 'Quoziente a: scrivi 1 ÷ 1,8 in forma decimale, arrotondato a 10<sup>−3</sup> (3 cifre dopo la virgola).' },
    kind: 'num',
    label: { fr: 'Quotient', it: 'Quoziente' }, unit: '', ans: 0.556, tol: 0.0005, sign: 'strict',
    hint: {
      fr: 'Tape 1 ÷ 1,8 à la calculatrice, puis garde 3 chiffres après la virgule. Regarde le 4<sup>e</sup> chiffre : s’il vaut 5 ou plus, le 3<sup>e</sup> chiffre augmente de 1.',
      it: 'Digita 1 ÷ 1,8 sulla calcolatrice, poi tieni 3 cifre dopo la virgola. Guarda la 4<sup>a</sup> cifra: se vale 5 o più, la 3<sup>a</sup> cifra aumenta di 1.'
    },
    sol: {
      fr: '<p>1 ÷ 1,8 = 0,5555… ≈ <b>0,556</b>. Ce coefficient est plus petit que 1 : diminution.</p>',
      it: '<p>1 ÷ 1,8 = 0,5555… ≈ <b>0,556</b>. Questo coefficiente è minore di 1: diminuzione.</p>'
    }
  }, {
    q: { fr: 'Quotient a (1 ÷ 1,8) : donner le taux d’évolution associé en pourcentage, avec le signe − si c’est une diminution.',
         it: 'Quoziente a (1 ÷ 1,8): dai il tasso di variazione associato in percentuale, con il segno − se è una diminuzione.' },
    kind: 'num',
    label: { fr: 'Taux', it: 'Tasso' }, unit: '%', ans: -44.4, tol: 0.05, sign: 'strict',
    traps: [
      { v: -80,
        fr: '1,8 correspond à +80 %, mais le retour d’une hausse de 80 % n’est pas une baisse de 80 %. Calcule 1 ÷ 1,8, puis enlève 1.',
        it: '1,8 corrisponde a +80%, ma il ritorno da un aumento dell’80% non è un calo dell’80%. Calcola 1 ÷ 1,8, poi sottrai 1.' },
      { v: 55.6,
        fr: 'Tu as donné le coefficient 0,556 en pourcentage. Le taux, c’est C − 1.',
        it: 'Hai dato il coefficiente 0,556 in percentuale. Il tasso è C − 1.' },
      { v: 44.4,
        fr: 'Le nombre est bon, mais le coefficient est plus petit que 1 : c’est une diminution, donc le taux est négatif.',
        it: 'Il numero è giusto, ma il coefficiente è minore di 1: è una diminuzione, quindi il tasso è negativo.' }
    ],
    hint: {
      fr: 'Tape 1 ÷ 1,8 à la calculatrice et arrondis à 3 chiffres après la virgule : c’est le coefficient C. Si C est plus petit que 1, c’est une diminution. Le taux est C − 1.',
      it: 'Digita 1 ÷ 1,8 sulla calcolatrice e arrotonda a 3 cifre dopo la virgola: è il coefficiente C. Se C è minore di 1, è una diminuzione. Il tasso è C − 1.'
    },
    sol: {
      fr: '<ol><li>À la calculatrice : 1 ÷ 1,8 = 0,5555… ≈ 0,556 (à 10<sup>−3</sup> près).</li>' +
          '<li>0,556 est plus petit que 1 : c’est une diminution.</li>' +
          '<li>Taux : 0,556 − 1 = −0,444 = −44,4 %.</li></ol>' +
          '<p>Diminution, taux <b>−44,4 %</b>. Remarque : 1,8 correspond à une hausse de 80 % ; l’évolution réciproque est une baisse de 44,4 %, pas de 80 %.</p>',
      it: '<ol><li>Con la calcolatrice: 1 ÷ 1,8 = 0,5555… ≈ 0,556 (arrotondato a 10<sup>−3</sup>).</li>' +
          '<li>0,556 è minore di 1: è una diminuzione.</li>' +
          '<li>Tasso: 0,556 − 1 = −0,444 = −44,4%.</li></ol>' +
          '<p>Diminuzione, tasso <b>−44,4%</b>. Nota: 1,8 corrisponde a un aumento dell’80%; la variazione reciproca è un calo del 44,4%, non dell’80%.</p>'
    }
  }, {
    q: { fr: 'Quotient b : écrire 1 ÷ 0,7 sous forme décimale, arrondi à 10<sup>−3</sup> près (3 chiffres après la virgule).',
         it: 'Quoziente b: scrivi 1 ÷ 0,7 in forma decimale, arrotondato a 10<sup>−3</sup> (3 cifre dopo la virgola).' },
    kind: 'num',
    label: { fr: 'Quotient', it: 'Quoziente' }, unit: '', ans: 1.429, tol: 0.0005, sign: 'strict',
    hint: {
      fr: 'Tape 1 ÷ 0,7 à la calculatrice, puis garde 3 chiffres après la virgule. Regarde le 4<sup>e</sup> chiffre : s’il vaut 5 ou plus, le 3<sup>e</sup> chiffre augmente de 1.',
      it: 'Digita 1 ÷ 0,7 sulla calcolatrice, poi tieni 3 cifre dopo la virgola. Guarda la 4<sup>a</sup> cifra: se vale 5 o più, la 3<sup>a</sup> cifra aumenta di 1.'
    },
    sol: {
      fr: '<p>1 ÷ 0,7 = 1,42857… ≈ <b>1,429</b>. Ce coefficient est plus grand que 1 : augmentation.</p>',
      it: '<p>1 ÷ 0,7 = 1,42857… ≈ <b>1,429</b>. Questo coefficiente è maggiore di 1: aumento.</p>'
    }
  }, {
    q: { fr: 'Quotient b (1 ÷ 0,7) : donner le taux d’évolution associé en pourcentage, avec le signe − si c’est une diminution.',
         it: 'Quoziente b (1 ÷ 0,7): dai il tasso di variazione associato in percentuale, con il segno − se è una diminuzione.' },
    kind: 'num',
    label: { fr: 'Taux', it: 'Tasso' }, unit: '%', ans: 42.9, tol: 0.05, sign: 'strict',
    traps: [
      { v: 30,
        fr: '0,7 correspond à −30 %, mais le retour d’une baisse de 30 % n’est pas une hausse de 30 %. Calcule 1 ÷ 0,7, puis enlève 1.',
        it: '0,7 corrisponde a −30%, ma il ritorno da un calo del 30% non è un aumento del 30%. Calcola 1 ÷ 0,7, poi sottrai 1.' },
      { v: 142.9,
        fr: 'Tu as donné le coefficient 1,429 en pourcentage. Le taux, c’est C − 1.',
        it: 'Hai dato il coefficiente 1,429 in percentuale. Il tasso è C − 1.' },
      { v: -42.9,
        fr: 'Le nombre est bon, mais le coefficient est plus grand que 1 : c’est une augmentation, donc le taux est positif.',
        it: 'Il numero è giusto, ma il coefficiente è maggiore di 1: è un aumento, quindi il tasso è positivo.' }
    ],
    hint: {
      fr: 'Tape 1 ÷ 0,7 et arrondis à 3 chiffres après la virgule : c’est C. C plus grand que 1 : augmentation ; C plus petit que 1 : diminution. Le taux est C − 1.',
      it: 'Digita 1 ÷ 0,7 e arrotonda a 3 cifre dopo la virgola: è C. C maggiore di 1: aumento; C minore di 1: diminuzione. Il tasso è C − 1.'
    },
    sol: {
      fr: '<ol><li>1 ÷ 0,7 = 1,4285… ≈ 1,429.</li>' +
          '<li>1,429 est plus grand que 1 : c’est une augmentation.</li>' +
          '<li>Taux : 1,429 − 1 = 0,429 = 42,9 %.</li></ol>' +
          '<p>Augmentation, taux <b>+42,9 %</b>.</p>',
      it: '<ol><li>1 ÷ 0,7 = 1,4285… ≈ 1,429.</li>' +
          '<li>1,429 è maggiore di 1: è un aumento.</li>' +
          '<li>Tasso: 1,429 − 1 = 0,429 = 42,9%.</li></ol>' +
          '<p>Aumento, tasso <b>+42,9%</b>.</p>'
    }
  }, {
    q: { fr: 'Quotient c : écrire 1 ÷ 0,51 sous forme décimale, arrondi à 10<sup>−3</sup> près (3 chiffres après la virgule).',
         it: 'Quoziente c: scrivi 1 ÷ 0,51 in forma decimale, arrotondato a 10<sup>−3</sup> (3 cifre dopo la virgola).' },
    kind: 'num',
    label: { fr: 'Quotient', it: 'Quoziente' }, unit: '', ans: 1.961, tol: 0.0005, sign: 'strict',
    hint: {
      fr: 'Tape 1 ÷ 0,51 à la calculatrice, puis garde 3 chiffres après la virgule. Regarde le 4<sup>e</sup> chiffre : s’il vaut 5 ou plus, le 3<sup>e</sup> chiffre augmente de 1.',
      it: 'Digita 1 ÷ 0,51 sulla calcolatrice, poi tieni 3 cifre dopo la virgola. Guarda la 4<sup>a</sup> cifra: se vale 5 o più, la 3<sup>a</sup> cifra aumenta di 1.'
    },
    sol: {
      fr: '<p>1 ÷ 0,51 = 1,96078… ≈ <b>1,961</b>. Ce coefficient est plus grand que 1 : augmentation.</p>',
      it: '<p>1 ÷ 0,51 = 1,96078… ≈ <b>1,961</b>. Questo coefficiente è maggiore di 1: aumento.</p>'
    }
  }, {
    q: { fr: 'Quotient c (1 ÷ 0,51) : donner le taux d’évolution associé en pourcentage, avec le signe − si c’est une diminution.',
         it: 'Quoziente c (1 ÷ 0,51): dai il tasso di variazione associato in percentuale, con il segno − se è una diminuzione.' },
    kind: 'num',
    label: { fr: 'Taux', it: 'Tasso' }, unit: '%', ans: 96.1, tol: 0.05, sign: 'strict',
    traps: [
      { v: 49,
        fr: '0,51 correspond à −49 %, mais le retour d’une baisse de 49 % n’est pas une hausse de 49 %. Calcule 1 ÷ 0,51, puis enlève 1.',
        it: '0,51 corrisponde a −49%, ma il ritorno da un calo del 49% non è un aumento del 49%. Calcola 1 ÷ 0,51, poi sottrai 1.' },
      { v: 196.1,
        fr: 'Tu as donné le coefficient 1,961 en pourcentage. Le taux, c’est C − 1.',
        it: 'Hai dato il coefficiente 1,961 in percentuale. Il tasso è C − 1.' },
      { v: -96.1,
        fr: 'Le nombre est bon, mais le coefficient est plus grand que 1 : c’est une augmentation, donc le taux est positif.',
        it: 'Il numero è giusto, ma il coefficiente è maggiore di 1: è un aumento, quindi il tasso è positivo.' }
    ],
    hint: {
      fr: 'Tape 1 ÷ 0,51 et arrondis à 3 chiffres après la virgule : c’est C. C plus grand que 1 : augmentation ; C plus petit que 1 : diminution. Le taux est C − 1.',
      it: 'Digita 1 ÷ 0,51 e arrotonda a 3 cifre dopo la virgola: è C. C maggiore di 1: aumento; C minore di 1: diminuzione. Il tasso è C − 1.'
    },
    sol: {
      fr: '<ol><li>1 ÷ 0,51 = 1,9607… ≈ 1,961.</li>' +
          '<li>1,961 est plus grand que 1 : c’est une augmentation.</li>' +
          '<li>Taux : 1,961 − 1 = 0,961 = 96,1 %.</li></ol>' +
          '<p>Augmentation, taux <b>+96,1 %</b>.</p>',
      it: '<ol><li>1 ÷ 0,51 = 1,9607… ≈ 1,961.</li>' +
          '<li>1,961 è maggiore di 1: è un aumento.</li>' +
          '<li>Tasso: 1,961 − 1 = 0,961 = 96,1%.</li></ol>' +
          '<p>Aumento, tasso <b>+96,1%</b>.</p>'
    }
  }, {
    q: { fr: 'Quotient d : écrire 1 ÷ 1,235 sous forme décimale, arrondi à 10<sup>−3</sup> près (3 chiffres après la virgule).',
         it: 'Quoziente d: scrivi 1 ÷ 1,235 in forma decimale, arrotondato a 10<sup>−3</sup> (3 cifre dopo la virgola).' },
    kind: 'num',
    label: { fr: 'Quotient', it: 'Quoziente' }, unit: '', ans: 0.81, tol: 0.0005, sign: 'strict',
    hint: {
      fr: 'Tape 1 ÷ 1,235 à la calculatrice, puis garde 3 chiffres après la virgule. Regarde le 4<sup>e</sup> chiffre : s’il vaut 5 ou plus, le 3<sup>e</sup> chiffre augmente de 1.',
      it: 'Digita 1 ÷ 1,235 sulla calcolatrice, poi tieni 3 cifre dopo la virgola. Guarda la 4<sup>a</sup> cifra: se vale 5 o più, la 3<sup>a</sup> cifra aumenta di 1.'
    },
    sol: {
      fr: '<p>1 ÷ 1,235 = 0,80971… ≈ <b>0,810</b>. Ce coefficient est plus petit que 1 : diminution.</p>',
      it: '<p>1 ÷ 1,235 = 0,80971… ≈ <b>0,810</b>. Questo coefficiente è minore di 1: diminuzione.</p>'
    }
  }, {
    q: { fr: 'Quotient d (1 ÷ 1,235) : donner le taux d’évolution associé en pourcentage, avec le signe − si c’est une diminution.',
         it: 'Quoziente d (1 ÷ 1,235): dai il tasso di variazione associato in percentuale, con il segno − se è una diminuzione.' },
    kind: 'num',
    label: { fr: 'Taux', it: 'Tasso' }, unit: '%', ans: -19, tol: 0.05, sign: 'strict',
    traps: [
      { v: -23.5,
        fr: '1,235 correspond à +23,5 %, mais le retour d’une hausse de 23,5 % n’est pas une baisse de 23,5 %. Calcule 1 ÷ 1,235, puis enlève 1.',
        it: '1,235 corrisponde a +23,5%, ma il ritorno da un aumento del 23,5% non è un calo del 23,5%. Calcola 1 ÷ 1,235, poi sottrai 1.' },
      { v: 81,
        fr: 'Tu as donné le coefficient 0,810 en pourcentage. Le taux, c’est C − 1.',
        it: 'Hai dato il coefficiente 0,810 in percentuale. Il tasso è C − 1.' },
      { v: 19,
        fr: 'Le nombre est bon, mais le coefficient est plus petit que 1 : c’est une diminution, donc le taux est négatif.',
        it: 'Il numero è giusto, ma il coefficiente è minore di 1: è una diminuzione, quindi il tasso è negativo.' }
    ],
    hint: {
      fr: 'Tape 1 ÷ 1,235 et arrondis à 3 chiffres après la virgule : c’est C. C plus grand que 1 : augmentation ; C plus petit que 1 : diminution. Le taux est C − 1.',
      it: 'Digita 1 ÷ 1,235 e arrotonda a 3 cifre dopo la virgola: è C. C maggiore di 1: aumento; C minore di 1: diminuzione. Il tasso è C − 1.'
    },
    sol: {
      fr: '<ol><li>1 ÷ 1,235 = 0,8097… ≈ 0,810.</li>' +
          '<li>0,810 est plus petit que 1 : c’est une diminution.</li>' +
          '<li>Taux : 0,810 − 1 = −0,190 = −19 %.</li></ol>' +
          '<p>Diminution, taux <b>−19 %</b>.</p>',
      it: '<ol><li>1 ÷ 1,235 = 0,8097… ≈ 0,810.</li>' +
          '<li>0,810 è minore di 1: è una diminuzione.</li>' +
          '<li>Tasso: 0,810 − 1 = −0,190 = −19%.</li></ol>' +
          '<p>Diminuzione, tasso <b>−19%</b>.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex129', group: 'recip', num: '129', page: 312, stars: 2,
  title: { fr: 'Compléter les schémas', it: 'Completa gli schemi' },
  text: {
    fr: '<p>Reproduire et compléter chaque schéma par les coefficients multiplicateurs correspondants, puis calculer la valeur masquée par le point d’interrogation.</p>',
    it: '<p>Riproduci e completa ogni schema con i coefficienti moltiplicativi corrispondenti, poi calcola il valore nascosto dal punto interrogativo.</p>'
  },
  parts: [{
    figure: { chain: {
      nodes: ['?', '638'],
      top: [{ fr: 'Diminuer de 42 %', it: 'Diminuire del 42%' }],
      ops: ['× …'],
      bottom: { op: '…', dir: 'back' }
    } },
    q: { fr: 'Schéma a : quel coefficient multiplicateur faut-il écrire sur la flèche du haut (× …) ?',
         it: 'Schema a: quale coefficiente moltiplicativo bisogna scrivere sulla freccia in alto (× …)?' },
    kind: 'num',
    label: { fr: 'Coefficient', it: 'Coefficiente' }, unit: '', ans: 0.58, tol: 0.00005, sign: 'strict',
    traps: [
      { v: 0.42,
        fr: '0,42, c’est 42 %. Mais on enlève 42 % : il reste 100 % − 42 % de la valeur.',
        it: '0,42 è il 42%. Ma si toglie il 42%: resta il 100% − 42% del valore.' },
      { v: 1.42,
        fr: '1,42 sert à augmenter de 42 %. Ici, on diminue.',
        it: '1,42 serve ad aumentare del 42%. Qui si diminuisce.' },
      { v: 58,
        fr: 'Presque : 58 % s’écrit 0,58 sous forme décimale.',
        it: 'Quasi: il 58% si scrive 0,58 in forma decimale.' }
    ],
    hint: {
      fr: 'Diminuer de 42 %, c’est garder 100 % − 42 % de la valeur. Écris ce pourcentage sous forme décimale.',
      it: 'Diminuire del 42% vuol dire tenere il 100% − 42% del valore. Scrivi questa percentuale in forma decimale.'
    },
    sol: {
      fr: '<ol><li>Diminuer de 42 % revient à multiplier par 1 − 0,42 = 0,58.</li>' +
          '<li>Flèche du haut : × 0,58.</li>' +
          '<li>Flèche du bas (retour) : on fait l’opération inverse, ÷ 0,58.</li></ol>' +
          '<p>Coefficient multiplicateur : <b>0,58</b>.</p>',
      it: '<ol><li>Diminuire del 42% vuol dire moltiplicare per 1 − 0,42 = 0,58.</li>' +
          '<li>Freccia in alto: × 0,58.</li>' +
          '<li>Freccia in basso (ritorno): si fa l’operazione inversa, ÷ 0,58.</li></ol>' +
          '<p>Coefficiente moltiplicativo: <b>0,58</b>.</p>'
    }
  }, {
    q: { fr: 'Schéma a : calculer la valeur masquée par le point d’interrogation.',
         it: 'Schema a: calcola il valore nascosto dal punto interrogativo.' },
    kind: 'num',
    label: { fr: 'Valeur masquée', it: 'Valore nascosto' }, unit: '', ans: 1100, tol: 0.01, sign: 'strict',
    traps: [
      { v: 370.04,
        fr: 'Tu as multiplié 638 par 0,58. Mais 638 est la valeur d’arrivée : pour revenir en arrière, on divise par 0,58.',
        it: 'Hai moltiplicato 638 per 0,58. Ma 638 è il valore di arrivo: per tornare indietro si divide per 0,58.' },
      { v: 905.96,
        fr: 'Tu as augmenté 638 de 42 %. Le retour d’une baisse de 42 % n’est pas une hausse de 42 % : on divise par 0,58.',
        it: 'Hai aumentato 638 del 42%. Il ritorno da un calo del 42% non è un aumento del 42%: si divide per 0,58.' },
      { v: 1519.05,
        fr: 'Tu as divisé par 0,42 (le taux). On divise par le coefficient 0,58.',
        it: 'Hai diviso per 0,42 (il tasso). Si divide per il coefficiente 0,58.' }
    ],
    hint: {
      fr: 'On a : ? × 0,58 = 638. Suis la flèche du bas : pour revenir en arrière, on divise par le coefficient.',
      it: 'Si ha: ? × 0,58 = 638. Segui la freccia in basso: per tornare indietro si divide per il coefficiente.'
    },
    sol: {
      fr: '<ol><li>Flèche du haut : ? × 0,58 = 638.</li>' +
          '<li>Flèche du bas : on revient en arrière en divisant, ? = 638 ÷ 0,58 = 1 100.</li>' +
          '<li>Vérification : 1 100 × 0,58 = 638.</li></ol>' +
          '<p>La valeur masquée est <b>1 100</b>.</p>',
      it: '<ol><li>Freccia in alto: ? × 0,58 = 638.</li>' +
          '<li>Freccia in basso: si torna indietro dividendo, ? = 638 ÷ 0,58 = 1 100.</li>' +
          '<li>Verifica: 1 100 × 0,58 = 638.</li></ol>' +
          '<p>Il valore nascosto è <b>1 100</b>.</p>'
    }
  }, {
    figure: { chain: {
      nodes: ['?', '1 276'],
      top: [{ fr: 'Augmenter de 16 %', it: 'Aumentare del 16%' }],
      ops: ['× …'],
      bottom: { op: '…', dir: 'back' }
    } },
    q: { fr: 'Schéma b : quel coefficient multiplicateur faut-il écrire sur la flèche du haut (× …) ?',
         it: 'Schema b: quale coefficiente moltiplicativo bisogna scrivere sulla freccia in alto (× …)?' },
    kind: 'num',
    label: { fr: 'Coefficient', it: 'Coefficiente' }, unit: '', ans: 1.16, tol: 0.00005, sign: 'strict',
    traps: [
      { v: 0.16,
        fr: '0,16, c’est seulement 16 %. Après une hausse de 16 %, on a 100 % + 16 % de la valeur.',
        it: '0,16 è solo il 16%. Dopo un aumento del 16% si ha il 100% + 16% del valore.' },
      { v: 0.84,
        fr: '0,84 sert à diminuer de 16 %. Ici, on augmente.',
        it: '0,84 serve a diminuire del 16%. Qui si aumenta.' },
      { v: 116,
        fr: 'Presque : 116 % s’écrit 1,16 sous forme décimale.',
        it: 'Quasi: il 116% si scrive 1,16 in forma decimale.' }
    ],
    hint: {
      fr: 'Augmenter de 16 %, c’est avoir 100 % + 16 % de la valeur. Écris ce pourcentage sous forme décimale.',
      it: 'Aumentare del 16% vuol dire avere il 100% + 16% del valore. Scrivi questa percentuale in forma decimale.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 16 % revient à multiplier par 1 + 0,16 = 1,16.</li>' +
          '<li>Flèche du haut : × 1,16.</li>' +
          '<li>Flèche du bas (retour) : on fait l’opération inverse, ÷ 1,16.</li></ol>' +
          '<p>Coefficient multiplicateur : <b>1,16</b>.</p>',
      it: '<ol><li>Aumentare del 16% vuol dire moltiplicare per 1 + 0,16 = 1,16.</li>' +
          '<li>Freccia in alto: × 1,16.</li>' +
          '<li>Freccia in basso (ritorno): si fa l’operazione inversa, ÷ 1,16.</li></ol>' +
          '<p>Coefficiente moltiplicativo: <b>1,16</b>.</p>'
    }
  }, {
    q: { fr: 'Schéma b : calculer la valeur masquée par le point d’interrogation.',
         it: 'Schema b: calcola il valore nascosto dal punto interrogativo.' },
    kind: 'num',
    label: { fr: 'Valeur masquée', it: 'Valore nascosto' }, unit: '', ans: 1100, tol: 0.01, sign: 'strict',
    traps: [
      { v: 1480.16,
        fr: 'Tu as multiplié 1 276 par 1,16. Mais 1 276 est la valeur d’arrivée : pour revenir en arrière, on divise par 1,16.',
        it: 'Hai moltiplicato 1 276 per 1,16. Ma 1 276 è il valore di arrivo: per tornare indietro si divide per 1,16.' },
      { v: 1071.84,
        fr: 'Tu as enlevé 16 % à 1 276. Le retour d’une hausse de 16 % n’est pas une baisse de 16 % : on divise par 1,16.',
        it: 'Hai tolto il 16% a 1 276. Il ritorno da un aumento del 16% non è un calo del 16%: si divide per 1,16.' },
      { v: 7975,
        fr: 'Tu as divisé par 0,16 (le taux). On divise par le coefficient 1,16.',
        it: 'Hai diviso per 0,16 (il tasso). Si divide per il coefficiente 1,16.' }
    ],
    hint: {
      fr: 'On a : ? × 1,16 = 1 276. Suis la flèche du bas : pour revenir en arrière, on divise par le coefficient.',
      it: 'Si ha: ? × 1,16 = 1 276. Segui la freccia in basso: per tornare indietro si divide per il coefficiente.'
    },
    sol: {
      fr: '<ol><li>Flèche du haut : ? × 1,16 = 1 276.</li>' +
          '<li>Flèche du bas : on revient en arrière en divisant, ? = 1 276 ÷ 1,16 = 1 100.</li>' +
          '<li>Vérification : 1 100 × 1,16 = 1 276.</li></ol>' +
          '<p>La valeur masquée est <b>1 100</b>.</p>',
      it: '<ol><li>Freccia in alto: ? × 1,16 = 1 276.</li>' +
          '<li>Freccia in basso: si torna indietro dividendo, ? = 1 276 ÷ 1,16 = 1 100.</li>' +
          '<li>Verifica: 1 100 × 1,16 = 1 276.</li></ol>' +
          '<p>Il valore nascosto è <b>1 100</b>.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex130', group: 'recip', num: '130', page: 312, stars: 1,
  title: { fr: 'Prix HT d’un réfrigérateur', it: 'Prezzo senza IVA di un frigorifero' },
  text: {
    fr: '<p>Le taux de TVA en France est 20 % et le prix TTC d’un réfrigérateur est 450 €.</p>' +
        '<p><b>Le saviez-vous ?</b> <i>La TVA (Taxe sur la Valeur Ajoutée) est un impôt sur la consommation créé en 1954 en France. Elle a été instaurée ensuite dans différents pays. Aux États-Unis, la Taxe sur les Ventes est ce qui se rapproche le plus de notre TVA.</i></p>',
    it: '<p>In Francia l’IVA è del 20% e il prezzo IVA inclusa di un frigorifero è 450 €.</p>' +
        '<p><b>Lo sapevi?</b> <i>L’IVA (Imposta sul Valore Aggiunto, in francese TVA) è un’imposta sui consumi creata in Francia nel 1954. In seguito è stata introdotta in diversi paesi. Negli Stati Uniti, la tassa sulle vendite (Sales Tax) è ciò che si avvicina di più alla nostra IVA.</i></p>'
  },
  parts: [{
    q: { fr: 'Quel est le prix hors taxes du réfrigérateur ?',
         it: 'Qual è il prezzo senza IVA del frigorifero?' },
    kind: 'num',
    label: { fr: 'Prix HT', it: 'Prezzo senza IVA' }, unit: '€', ans: 375, tol: 0.005, sign: 'strict',
    traps: [
      { v: 360,
        fr: 'Tu as enlevé 20 % de 450 €. Mais la TVA de 20 % est calculée sur le prix HT, pas sur 450 € : on divise par 1,2.',
        it: 'Hai tolto il 20% a 450 €. Ma l’IVA del 20% è calcolata sul prezzo senza IVA, non su 450 €: si divide per 1,2.' },
      { v: 540,
        fr: 'Tu as multiplié par 1,2 : tu as ajouté la TVA une deuxième fois. 450 € contient déjà la TVA : on divise par 1,2.',
        it: 'Hai moltiplicato per 1,2: hai aggiunto l’IVA una seconda volta. 450 € contiene già l’IVA: si divide per 1,2.' },
      { v: 2250,
        fr: 'Tu as divisé par 0,2 (le taux). On divise par le coefficient 1,2.',
        it: 'Hai diviso per 0,2 (il tasso). Si divide per il coefficiente 1,2.' }
    ],
    hint: {
      fr: 'Le prix TTC, c’est le prix HT augmenté de 20 % : prix HT × 1,2 = 450 €. Pour retrouver la valeur initiale, divise la valeur finale par le coefficient.',
      it: 'Il prezzo IVA inclusa è il prezzo senza IVA aumentato del 20%: prezzo senza IVA × 1,2 = 450 €. Per ritrovare il valore iniziale, dividi il valore finale per il coefficiente.'
    },
    sol: {
      fr: '<ol><li>Ajouter 20 % de TVA revient à multiplier par 1 + 0,2 = 1,2 : prix HT × 1,2 = prix TTC.</li>' +
          '<li>Ici, prix HT × 1,2 = 450 €. Valeur initiale = valeur finale ÷ C = 450 ÷ 1,2 = 375.</li>' +
          '<li>Vérification : 375 × 1,2 = 450.</li></ol>' +
          '<p>Le prix hors taxes du réfrigérateur est <b>375 €</b> (et non 360 €).</p>',
      it: '<ol><li>Aggiungere il 20% di IVA vuol dire moltiplicare per 1 + 0,2 = 1,2: prezzo senza IVA × 1,2 = prezzo IVA inclusa.</li>' +
          '<li>Qui, prezzo senza IVA × 1,2 = 450 €. Valore iniziale = valore finale ÷ C = 450 ÷ 1,2 = 375.</li>' +
          '<li>Verifica: 375 × 1,2 = 450.</li></ol>' +
          '<p>Il prezzo senza IVA del frigorifero è <b>375 €</b> (e non 360 €).</p>'
    }
  }]
});

EXOS.push({
  id: 'ex131', group: 'recip', num: '131', page: 312, stars: 2,
  tag: { fr: 'MATHS & SVT', it: 'MATEMATICA & SCIENZE' },
  title: { fr: 'La fonte des glaciers', it: 'Lo scioglimento dei ghiacciai' },
  text: {
    fr: '<p>Les glaciers sont directement touchés par le réchauffement climatique. Leur fonte est beaucoup plus rapide que prévu : selon des travaux menés par des chercheurs, les glaciers alpins qui culminent à moins de 3 500 mètres d’altitude auront disparu d’ici la fin du siècle.</p>' +
        '<p>Dans le parc des Écrins, de nouvelles mesures ont conclu à une perte d’épaisseur du glacier Blanc de 9,4 m en moyenne entre 2002 et 2014, c’est-à-dire environ 34 % de plus que l’estimation initiale.</p>',
    it: '<p>I ghiacciai sono colpiti direttamente dal riscaldamento climatico. Il loro scioglimento è molto più rapido del previsto: secondo studi condotti da alcuni ricercatori, i ghiacciai alpini la cui cima è a meno di 3 500 metri di altitudine saranno scomparsi entro la fine del secolo.</p>' +
        '<p>Nel parco degli Écrins, nuove misurazioni hanno concluso che il ghiacciaio Blanc ha perso in media 9,4 m di spessore tra il 2002 e il 2014, cioè circa il 34% in più rispetto alla stima iniziale.</p>'
  },
  parts: [{
    q: { fr: 'Retrouver cette estimation initiale à 0,1 m près.',
         it: 'Ritrova questa stima iniziale, arrotondata a 0,1 m.' },
    kind: 'num',
    label: { fr: 'Estimation initiale', it: 'Stima iniziale' }, unit: 'm', ans: 7, tol: 0.05, sign: 'strict',
    traps: [
      { v: 6.2,
        fr: 'Tu as fait 9,4 × 0,66 (enlever 34 %). Mais les 34 % sont calculés sur l’estimation initiale, pas sur 9,4 m : on divise par 1,34.',
        it: 'Hai fatto 9,4 × 0,66 (togliere il 34%). Ma il 34% è calcolato sulla stima iniziale, non su 9,4 m: si divide per 1,34.' },
      { v: 12.6,
        fr: 'Tu as multiplié par 1,34. Mais 9,4 m est déjà la valeur avec les 34 % en plus : pour revenir en arrière, on divise par 1,34.',
        it: 'Hai moltiplicato per 1,34. Ma 9,4 m è già il valore con il 34% in più: per tornare indietro si divide per 1,34.' },
      { v: 27.6,
        fr: 'Tu as divisé par 0,34 (le taux). On divise par le coefficient 1,34.',
        it: 'Hai diviso per 0,34 (il tasso). Si divide per il coefficiente 1,34.' }
    ],
    hint: {
      fr: '« 34 % de plus que l’estimation » veut dire : estimation initiale × 1,34 = 9,4. Pour retrouver la valeur initiale, divise la valeur finale par le coefficient.',
      it: '«Il 34% in più della stima» vuol dire: stima iniziale × 1,34 = 9,4. Per ritrovare il valore iniziale, dividi il valore finale per il coefficiente.'
    },
    sol: {
      fr: '<ol><li>34 % de plus : on multiplie par 1 + 0,34 = 1,34. Donc estimation initiale × 1,34 = 9,4 m.</li>' +
          '<li>Valeur initiale = valeur finale ÷ C = 9,4 ÷ 1,34 ≈ 7,01.</li>' +
          '<li>Arrondi à 0,1 m près : 7,0 m.</li></ol>' +
          '<p>L’estimation initiale était d’environ <b>7,0 m</b>.</p>',
      it: '<ol><li>Il 34% in più: si moltiplica per 1 + 0,34 = 1,34. Quindi stima iniziale × 1,34 = 9,4 m.</li>' +
          '<li>Valore iniziale = valore finale ÷ C = 9,4 ÷ 1,34 ≈ 7,01.</li>' +
          '<li>Arrotondato a 0,1 m: 7,0 m.</li></ol>' +
          '<p>La stima iniziale era di circa <b>7,0 m</b>.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex132', group: 'recip', num: '132', page: 312, stars: 2,
  title: { fr: 'Population de Porto-Vecchio', it: 'Gli abitanti di Porto-Vecchio' },
  text: {
    fr: '<p>En 2015, la commune de Porto-Vecchio, en Corse, comptait 11 826 habitants, en augmentation de 7,17 % par rapport à 2010.</p>',
    it: '<p>Nel 2015, il comune di Porto-Vecchio, in Corsica, contava 11 826 abitanti, con un aumento del 7,17% rispetto al 2010.</p>'
  },
  parts: [{
    q: { fr: 'Combien la ville comptait-elle d’habitants, à l’unité près, en 2010 ?',
         it: 'Quanti abitanti contava la città nel 2010, arrotondando all’unità?' },
    kind: 'num',
    label: { fr: 'Habitants en 2010', it: 'Abitanti nel 2010' }, unit: 'habitants', ans: 11035, tol: 0.01, near: 1, sign: 'strict',
    traps: [
      { v: 10978,
        fr: 'Tu as enlevé 7,17 % à 11 826. Mais les 7,17 % sont calculés sur la population de 2010, pas sur 11 826 : on divise par 1,0717.',
        it: 'Hai tolto il 7,17% a 11 826. Ma il 7,17% è calcolato sulla popolazione del 2010, non su 11 826: si divide per 1,0717.' },
      { v: 12674,
        fr: 'Tu as multiplié par 1,0717 : tu avances dans le temps. Pour revenir en 2010, on divise par 1,0717.',
        it: 'Hai moltiplicato per 1,0717: così vai avanti nel tempo. Per tornare al 2010 si divide per 1,0717.' },
      { v: 6888,
        fr: 'Attention : 7,17 % = 0,0717. Le coefficient est 1 + 0,0717 = 1,0717, pas 1,717.',
        it: 'Attenzione: 7,17% = 0,0717. Il coefficiente è 1 + 0,0717 = 1,0717, non 1,717.' }
    ],
    hint: {
      fr: 'Habitants en 2010 × 1,0717 = 11 826 (attention : 7,17 % = 0,0717). Pour retrouver la valeur initiale, divise la valeur finale par le coefficient.',
      it: 'Abitanti nel 2010 × 1,0717 = 11 826 (attenzione: 7,17% = 0,0717). Per ritrovare il valore iniziale, dividi il valore finale per il coefficiente.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 7,17 % revient à multiplier par 1 + 0,0717 = 1,0717.</li>' +
          '<li>Donc : habitants en 2010 × 1,0717 = 11 826.</li>' +
          '<li>Valeur initiale = valeur finale ÷ C = 11 826 ÷ 1,0717 ≈ 11 034,8.</li>' +
          '<li>À l’unité près : 11 035.</li></ol>' +
          '<p>En 2010, Porto-Vecchio comptait environ <b>11 035 habitants</b>.</p>',
      it: '<ol><li>Aumentare del 7,17% vuol dire moltiplicare per 1 + 0,0717 = 1,0717.</li>' +
          '<li>Quindi: abitanti nel 2010 × 1,0717 = 11 826.</li>' +
          '<li>Valore iniziale = valore finale ÷ C = 11 826 ÷ 1,0717 ≈ 11 034,8.</li>' +
          '<li>Arrotondato all’unità: 11 035.</li></ol>' +
          '<p>Nel 2010, Porto-Vecchio contava circa <b>11 035 abitanti</b>.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex133', group: 'recip', num: '133', page: 312, stars: 1,
  tag: { fr: 'VRAI / FAUX', it: 'VERO / FALSO' },
  title: { fr: 'Deux affirmations', it: 'Due affermazioni' },
  text: {
    fr: '<p><i>Indiquer si les affirmations suivantes sont vraies ou fausses, puis justifier.</i></p>',
    it: '<p><i>Indica se le seguenti affermazioni sono vere o false, poi giustifica.</i></p>'
  },
  parts: [{
    q: { fr: 'L’évolution réciproque d’une diminution de 37,5 % est une augmentation de 60 %.',
         it: 'La variazione reciproca di una diminuzione del 37,5% è un aumento del 60%.' },
    kind: 'choice',
    choices: [{ fr: 'Vrai', it: 'Vero' }, { fr: 'Faux', it: 'Falso' }],
    correct: 0,
    hint: {
      fr: 'Diminuer de 37,5 % revient à multiplier par 1 − 0,375. Calcule le coefficient réciproque C′ = 1 ÷ (1 − 0,375) : à quel taux correspond-il ?',
      it: 'Diminuire del 37,5% vuol dire moltiplicare per 1 − 0,375. Calcola il coefficiente reciproco C′ = 1 ÷ (1 − 0,375): a quale tasso corrisponde?'
    },
    sol: {
      fr: '<ol><li>Diminuer de 37,5 % revient à multiplier par 1 − 0,375 = 0,625.</li>' +
          '<li>Coefficient réciproque : C′ = 1 ÷ 0,625 = 1,6.</li>' +
          '<li>Taux réciproque : t′ = 1,6 − 1 = 0,6 = +60 %.</li></ol>' +
          '<p>L’affirmation est <b>vraie</b>. Vérification : 0,625 × 1,6 = 1.</p>',
      it: '<ol><li>Diminuire del 37,5% vuol dire moltiplicare per 1 − 0,375 = 0,625.</li>' +
          '<li>Coefficiente reciproco: C′ = 1 ÷ 0,625 = 1,6.</li>' +
          '<li>Tasso reciproco: t′ = 1,6 − 1 = 0,6 = +60%.</li></ol>' +
          '<p>L’affermazione è <b>vera</b>. Verifica: 0,625 × 1,6 = 1.</p>'
    }
  }, {
    q: { fr: 'Si, après une réduction de 30 %, un prix est de 154 €, il suffit de diviser 154 par 0,3 pour retrouver le prix avant la réduction.',
         it: 'Se, dopo uno sconto del 30%, un prezzo è di 154 €, basta dividere 154 per 0,3 per ritrovare il prezzo prima dello sconto.' },
    kind: 'choice',
    choices: [{ fr: 'Vrai', it: 'Vero' }, { fr: 'Faux', it: 'Falso' }],
    correct: 1,
    hint: {
      fr: 'Teste : calcule 154 ÷ 0,3, puis enlève 30 % à ce résultat. Retombes-tu sur 154 € ?',
      it: 'Prova: calcola 154 ÷ 0,3, poi togli il 30% a questo risultato. Ritrovi 154 €?'
    },
    sol: {
      fr: '<ol><li>Une réduction de 30 % revient à multiplier par 1 − 0,3 = 0,7 (et non par 0,3).</li>' +
          '<li>Prix avant × 0,7 = 154, donc prix avant = 154 ÷ 0,7 = 220 €.</li>' +
          '<li>Avec 154 ÷ 0,3 ≈ 513,33 € : 513,33 × 0,7 ≈ 359,33 €, ce n’est pas 154 €.</li></ol>' +
          '<p>L’affirmation est <b>fausse</b> : il faut diviser 154 par 0,7. Le prix avant la réduction était de 220 €.</p>',
      it: '<ol><li>Uno sconto del 30% vuol dire moltiplicare per 1 − 0,3 = 0,7 (e non per 0,3).</li>' +
          '<li>Prezzo prima × 0,7 = 154, quindi prezzo prima = 154 ÷ 0,7 = 220 €.</li>' +
          '<li>Con 154 ÷ 0,3 ≈ 513,33 €: 513,33 × 0,7 ≈ 359,33 €, non 154 €.</li></ol>' +
          '<p>L’affermazione è <b>falsa</b>: bisogna dividere 154 per 0,7. Il prezzo prima dello sconto era di 220 €.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex134', group: 'recip', num: '134', page: 312, stars: 3,
  tag: { fr: 'LOGIQUE', it: 'LOGICA' },
  title: { fr: 'Comparer t et t′', it: 'Confrontare t e t′' },
  text: {
    fr: '<p>Que pensez-vous de la proposition suivante : « Si <i>t</i> est un pourcentage d’augmentation et <i>t</i>′ le pourcentage de la diminution réciproque de cette augmentation, alors <i>t</i>′ &lt; <i>t</i>. » ?</p>',
    it: '<p>Che cosa pensi della seguente affermazione: «Se <i>t</i> è una percentuale di aumento e <i>t</i>′ la percentuale della diminuzione reciproca di questo aumento, allora <i>t</i>′ &lt; <i>t</i>.»?</p>'
  },
  parts: [{
    q: { fr: 'Cette proposition est-elle vraie ou fausse ?',
         it: 'Questa affermazione è vera o falsa?' },
    kind: 'choice',
    choices: [{ fr: 'Vraie', it: 'Vera' }, { fr: 'Fausse', it: 'Falsa' }],
    correct: 0,
    hint: {
      fr: 'Essaie avec un exemple : t = 25 %. Calcule C′ = 1 ÷ 1,25 et le pourcentage de diminution t′. Compare t′ et t. Essaie aussi avec t = 100 %.',
      it: 'Prova con un esempio: t = 25%. Calcola C′ = 1 ÷ 1,25 e la percentuale di diminuzione t′. Confronta t′ e t. Prova anche con t = 100%.'
    },
    sol: {
      fr: '<ol><li>Exemple 1 : t = 25 %. C = 1,25 et C′ = 1 ÷ 1,25 = 0,8 : diminution de 20 %. On a bien 20 % &lt; 25 %.</li>' +
          '<li>Exemple 2 : t = 100 %. C = 2 et C′ = 1 ÷ 2 = 0,5 : diminution de 50 %. On a bien 50 % &lt; 100 %.</li>' +
          '<li>Cas général : C′ = 1 ÷ (1 + t) et C′ = 1 − t′, donc t′ = 1 − 1 ÷ (1 + t) = t ÷ (1 + t).</li>' +
          '<li>Comme 1 + t &gt; 1, diviser t par (1 + t) donne un nombre plus petit que t : t′ &lt; t.</li></ol>' +
          '<p>La proposition est <b>vraie</b>. On diminue en partant d’une valeur plus grande, donc un pourcentage plus petit suffit pour revenir au départ.</p>',
      it: '<ol><li>Esempio 1: t = 25%. C = 1,25 e C′ = 1 ÷ 1,25 = 0,8: diminuzione del 20%. Infatti 20% &lt; 25%.</li>' +
          '<li>Esempio 2: t = 100%. C = 2 e C′ = 1 ÷ 2 = 0,5: diminuzione del 50%. Infatti 50% &lt; 100%.</li>' +
          '<li>Caso generale: C′ = 1 ÷ (1 + t) e C′ = 1 − t′, quindi t′ = 1 − 1 ÷ (1 + t) = t ÷ (1 + t).</li>' +
          '<li>Poiché 1 + t &gt; 1, dividendo t per (1 + t) si ottiene un numero più piccolo di t: t′ &lt; t.</li></ol>' +
          '<p>L’affermazione è <b>vera</b>. Si diminuisce partendo da un valore più grande, quindi basta una percentuale più piccola per tornare al valore di partenza.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex154', group: 'recip', num: '154', page: 315, stars: 2,
  title: { fr: 'Prix et consommation de gaz', it: 'Prezzo e consumo di gas' },
  text: {
    fr: '<p>En janvier 2023, le prix du gaz a augmenté de 15 %.</p>',
    it: '<p>A gennaio 2023, il prezzo del gas è aumentato del 15%.</p>'
  },
  parts: [{
    q: { fr: 'Déterminer, à 0,1 % près, le pourcentage de diminution nécessaire pour revenir au tarif du gaz avant cette augmentation de 15 %.',
         it: 'Determina la percentuale di diminuzione necessaria per tornare alla tariffa del gas di prima di questo aumento del 15%, arrotondata allo 0,1%.' },
    kind: 'num',
    label: { fr: 'Pourcentage de diminution', it: 'Percentuale di diminuzione' }, unit: '%', ans: 13, tol: 0.05, sign: 'abs',
    traps: [
      { v: 15,
        fr: 'Une baisse de 15 % est trop forte : 1,15 × 0,85 = 0,9775, on descend sous l’ancien tarif. Calcule C′ = 1 ÷ 1,15.',
        it: 'Un calo del 15% è troppo forte: 1,15 × 0,85 = 0,9775, si scende sotto la vecchia tariffa. Calcola C′ = 1 ÷ 1,15.' },
      { v: 87,
        fr: 'Tu as donné le coefficient 0,87 en pourcentage. Le taux, c’est C′ − 1.',
        it: 'Hai dato il coefficiente 0,87 in percentuale. Il tasso è C′ − 1.' }
    ],
    hint: {
      fr: 'Augmenter de 15 % revient à multiplier par 1,15. Pour revenir au tarif d’avant, on multiplie par C′ = 1 ÷ 1,15. Ensuite, le taux est t′ = C′ − 1.',
      it: 'Aumentare del 15% vuol dire moltiplicare per 1,15. Per tornare alla tariffa di prima si moltiplica per C′ = 1 ÷ 1,15. Poi il tasso è t′ = C′ − 1.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 15 % revient à multiplier par 1 + 0,15 = 1,15.</li>' +
          '<li>Coefficient réciproque : C′ = 1 ÷ 1,15 ≈ 0,8696.</li>' +
          '<li>Taux réciproque : t′ = C′ − 1 ≈ 0,8696 − 1 = −0,1304, soit −13,0 % à 0,1 % près.</li></ol>' +
          '<p>Il faut une diminution d’environ <b>13,0 %</b> (et non de 15 %) pour revenir au tarif d’avant.</p>',
      it: '<ol><li>Aumentare del 15% vuol dire moltiplicare per 1 + 0,15 = 1,15.</li>' +
          '<li>Coefficiente reciproco: C′ = 1 ÷ 1,15 ≈ 0,8696.</li>' +
          '<li>Tasso reciproco: t′ = C′ − 1 ≈ 0,8696 − 1 = −0,1304, cioè −13,0% arrotondato allo 0,1%.</li></ol>' +
          '<p>Serve una diminuzione del <b>13,0%</b> circa (e non del 15%) per tornare alla tariffa di prima.</p>'
    }
  }, {
    q: { fr: 'Au cours de ce mois de janvier 2023, la famille Dupont a consommé 222 m³ de gaz, ce qui représente une diminution de 40 % par rapport à la consommation du mois de janvier 2022. Quel volume de gaz a consommé cette famille en janvier 2022 ?',
         it: 'In questo mese di gennaio 2023, la famiglia Dupont ha consumato 222 m³ di gas, cioè una diminuzione del 40% rispetto al consumo del mese di gennaio 2022. Quale volume di gas ha consumato questa famiglia a gennaio 2022?' },
    kind: 'num',
    label: { fr: 'Volume en janvier 2022', it: 'Volume a gennaio 2022' }, unit: 'm³', ans: 370, tol: 0.01, sign: 'strict',
    traps: [
      { v: 310.8,
        fr: 'Tu as ajouté 40 % à 222 m³. Mais les 40 % sont calculés sur la consommation de 2022, pas sur 222 m³ : on divise par 0,6.',
        it: 'Hai aggiunto il 40% a 222 m³. Ma il 40% è calcolato sul consumo del 2022, non su 222 m³: si divide per 0,6.' },
      { v: 133.2,
        fr: 'Tu as multiplié par 0,6 : tu as encore diminué. 222 m³ est la valeur après la baisse : pour revenir en arrière, on divise par 0,6.',
        it: 'Hai moltiplicato per 0,6: hai diminuito ancora. 222 m³ è il valore dopo il calo: per tornare indietro si divide per 0,6.' },
      { v: 555,
        fr: 'Tu as divisé par 0,4 (le taux). On divise par le coefficient 0,6.',
        it: 'Hai diviso per 0,4 (il tasso). Si divide per il coefficiente 0,6.' }
    ],
    hint: {
      fr: 'Diminuer de 40 % revient à multiplier par 0,6 : consommation de janvier 2022 × 0,6 = 222. Pour retrouver la valeur initiale, divise la valeur finale par le coefficient.',
      it: 'Diminuire del 40% vuol dire moltiplicare per 0,6: consumo di gennaio 2022 × 0,6 = 222. Per ritrovare il valore iniziale, dividi il valore finale per il coefficiente.'
    },
    sol: {
      fr: '<ol><li>Une diminution de 40 % revient à multiplier par 1 − 0,4 = 0,6.</li>' +
          '<li>Donc : consommation de janvier 2022 × 0,6 = 222 m³.</li>' +
          '<li>Valeur initiale = valeur finale ÷ C = 222 ÷ 0,6 = 370.</li>' +
          '<li>Vérification : 370 × 0,6 = 222.</li></ol>' +
          '<p>En janvier 2022, la famille a consommé <b>370 m³</b> de gaz.</p>',
      it: '<ol><li>Una diminuzione del 40% vuol dire moltiplicare per 1 − 0,4 = 0,6.</li>' +
          '<li>Quindi: consumo di gennaio 2022 × 0,6 = 222 m³.</li>' +
          '<li>Valore iniziale = valore finale ÷ C = 222 ÷ 0,6 = 370.</li>' +
          '<li>Verifica: 370 × 0,6 = 222.</li></ol>' +
          '<p>A gennaio 2022, la famiglia ha consumato <b>370 m³</b> di gas.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex135', group: 'synth', num: '135', page: 312, stars: 2,
  title: { fr: 'Un timbre de collection', it: 'Un francobollo da collezione' },
  text: {
    fr: '<p>La cote d’un timbre de collection augmente au fil du temps, d’abord de 7 %, puis de 16 %.</p>',
    it: '<p>La quotazione (il valore) di un francobollo da collezione aumenta nel tempo, prima del 7%, poi del 16%.</p>'
  },
  parts: [{
    q: { fr: 'Calculer le pourcentage global d’augmentation du prix de ce timbre.',
         it: 'Calcola la percentuale globale di aumento del prezzo di questo francobollo.' },
    kind: 'num',
    label: { fr: 'Augmentation globale', it: 'Aumento globale' }, unit: '%', ans: 24.12, tol: 0.005, sign: 'abs',
    traps: [
      { v: 23,
        fr: 'Tu as additionné les taux : 7 % + 16 %. Les taux ne s’additionnent pas : on multiplie les coefficients multiplicateurs.',
        it: 'Hai sommato i tassi: 7% + 16%. I tassi non si sommano: si moltiplicano i coefficienti moltiplicativi.' },
      { v: 124.12,
        fr: 'Tu as donné le coefficient global 1,2412 en pourcentage. Le taux global, c’est C − 1.',
        it: 'Hai dato il coefficiente globale 1,2412 in percentuale. Il tasso globale è C − 1.' }
    ],
    hint: {
      fr: 'Augmenter de 7 % : × 1,07. Augmenter de 16 % : × 1,16. Multiplie les deux coefficients, puis enlève 1.',
      it: 'Aumentare del 7%: × 1,07. Aumentare del 16%: × 1,16. Moltiplica i due coefficienti, poi sottrai 1.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 7 % revient à multiplier par 1,07 ; augmenter de 16 % revient à multiplier par 1,16.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,07 × 1,16 = 1,2412.</li>' +
          '<li>Taux global : T = C − 1 = 0,2412 = 24,12 %.</li></ol>' +
          '<p>Le prix du timbre a augmenté globalement de <b>24,12 %</b> (et non de 23 %).</p>',
      it: '<ol><li>Aumentare del 7% vuol dire moltiplicare per 1,07; aumentare del 16% vuol dire moltiplicare per 1,16.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,07 × 1,16 = 1,2412.</li>' +
          '<li>Tasso globale: T = C − 1 = 0,2412 = 24,12%.</li></ol>' +
          '<p>Il prezzo del francobollo è aumentato in totale del <b>24,12%</b> (e non del 23%).</p>'
    }
  }, {
    q: { fr: 'Actuellement, le timbre vaut 9 309 €. Calculer sa cote initiale.',
         it: 'Attualmente il francobollo vale 9 309 €. Calcola la sua quotazione iniziale.' },
    kind: 'num',
    label: { fr: 'Cote initiale', it: 'Quotazione iniziale' }, unit: '€', ans: 7500, tol: 0.01, sign: 'strict',
    traps: [
      { v: 7063.67,
        fr: 'Tu as enlevé 24,12 % à 9 309 €. Mais les 24,12 % sont calculés sur la cote initiale, pas sur 9 309 € : on divise par 1,2412.',
        it: 'Hai tolto il 24,12% a 9 309 €. Ma il 24,12% è calcolato sulla quotazione iniziale, non su 9 309 €: si divide per 1,2412.' },
      { v: 7568.29,
        fr: 'Tu as divisé par 1,23 (taux additionnés). Le coefficient global est 1,07 × 1,16 = 1,2412.',
        it: 'Hai diviso per 1,23 (tassi sommati). Il coefficiente globale è 1,07 × 1,16 = 1,2412.' },
      { v: 11554.33,
        fr: 'Tu as multiplié par 1,2412. Mais 9 309 € est la valeur après les augmentations : pour revenir en arrière, on divise par 1,2412.',
        it: 'Hai moltiplicato per 1,2412. Ma 9 309 € è il valore dopo gli aumenti: per tornare indietro si divide per 1,2412.' }
    ],
    hint: {
      fr: 'D’après la question 1 : cote initiale × 1,2412 = 9 309. Pour retrouver la valeur initiale, divise la valeur finale par le coefficient global.',
      it: 'Dalla domanda 1: quotazione iniziale × 1,2412 = 9 309. Per ritrovare il valore iniziale, dividi il valore finale per il coefficiente globale.'
    },
    sol: {
      fr: '<ol><li>D’après la question 1, la cote a été multipliée par C = 1,2412.</li>' +
          '<li>Donc : cote initiale × 1,2412 = 9 309 €.</li>' +
          '<li>Valeur initiale = valeur finale ÷ C = 9 309 ÷ 1,2412 = 7 500.</li></ol>' +
          '<p>La cote initiale du timbre était de <b>7 500 €</b>.</p>',
      it: '<ol><li>Dalla domanda 1, la quotazione è stata moltiplicata per C = 1,2412.</li>' +
          '<li>Quindi: quotazione iniziale × 1,2412 = 9 309 €.</li>' +
          '<li>Valore iniziale = valore finale ÷ C = 9 309 ÷ 1,2412 = 7 500.</li></ol>' +
          '<p>La quotazione iniziale del francobollo era di <b>7 500 €</b>.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex137', group: 'synth', num: '137', page: 313, stars: 3,
  title: { fr: 'Fréquentation d’un site', it: 'Il traffico di un sito' },
  text: {
    fr: '<p>Un site de vente par Internet réalise une étude statistique des connexions au site afin d’anticiper la puissance de ses serveurs pour les années à venir. Le tableau ci-dessous récapitule le nombre moyen de connexions par jour, calculé sur une année, pour les années 2019 à 2022 :</p>' +
        '<div class="tw"><table class="bt"><tr><th>Année</th><td>2019</td><td>2020</td><td>2021</td><td>2022</td></tr>' +
        '<tr><th>Fréquentation</th><td>2 678</td><td>2 879</td><td>3 095</td><td>3 327</td></tr></table></div>',
    it: '<p>Un sito di vendita online fa uno studio statistico sulle connessioni al sito, per prevedere la potenza dei suoi server negli anni futuri. La tabella qui sotto riassume il numero medio di connessioni al giorno, calcolato su un anno, per gli anni dal 2019 al 2022:</p>' +
        '<div class="tw"><table class="bt"><tr><th>Anno</th><td>2019</td><td>2020</td><td>2021</td><td>2022</td></tr>' +
        '<tr><th>Traffico</th><td>2 678</td><td>2 879</td><td>3 095</td><td>3 327</td></tr></table></div>'
  },
  parts: [{
    q: { fr: 'Calculer le taux d’évolution de la fréquentation du site entre 2019 et 2020. Donner le résultat en pourcentage arrondi à 0,1 % près.',
         it: 'Calcola il tasso di variazione del traffico del sito tra il 2019 e il 2020. Dai il risultato in percentuale, arrotondato allo 0,1%.' },
    kind: 'num',
    label: { fr: 'Taux 2019 → 2020', it: 'Tasso 2019 → 2020' }, unit: '%', ans: 7.5, tol: 0.05, near: 0.2, sign: 'strict',
    traps: [
      { v: 7,
        fr: 'Tu as divisé par 2 879. On divise toujours par la valeur de départ, ici celle de 2019 : 2 678.',
        it: 'Hai diviso per 2 879. Si divide sempre per il valore di partenza, qui quello del 2019: 2 678.' },
      { v: -7.5,
        fr: 'Attention au sens : on fait valeur d’arrivée − valeur de départ. La fréquentation augmente, donc le taux est positif.',
        it: 'Attenzione all’ordine: si fa valore di arrivo − valore di partenza. Il traffico aumenta, quindi il tasso è positivo.' },
      { v: 201,
        fr: '201 est l’augmentation en nombre de connexions. Le taux, c’est cette augmentation divisée par la valeur de départ.',
        it: '201 è l’aumento in numero di connessioni. Il tasso è questo aumento diviso per il valore di partenza.' }
    ],
    hint: {
      fr: 'Taux d’évolution = (valeur finale − valeur initiale) ÷ valeur initiale. Ici, la valeur initiale est celle de 2019.',
      it: 'Tasso di variazione = (valore finale − valore iniziale) ÷ valore iniziale. Qui il valore iniziale è quello del 2019.'
    },
    sol: {
      fr: '<ol><li>t = (valeur finale − valeur initiale) ÷ valeur initiale.</li>' +
          '<li>t = (2 879 − 2 678) ÷ 2 678 = 201 ÷ 2 678 ≈ 0,07506.</li>' +
          '<li>En pourcentage, arrondi à 0,1 % : 7,5 %.</li></ol>' +
          '<p>Entre 2019 et 2020, la fréquentation a augmenté d’environ <b>7,5 %</b>.</p>',
      it: '<ol><li>t = (valore finale − valore iniziale) ÷ valore iniziale.</li>' +
          '<li>t = (2 879 − 2 678) ÷ 2 678 = 201 ÷ 2 678 ≈ 0,07506.</li>' +
          '<li>In percentuale, arrotondato allo 0,1%: 7,5%.</li></ol>' +
          '<p>Tra il 2019 e il 2020, il traffico è aumentato del <b>7,5%</b> circa.</p>'
    }
  }, {
    q: { fr: 'Calculer de même le taux d’évolution de cette fréquentation entre 2020 et 2021 (arrondi à 0,1 % près).',
         it: 'Calcola nello stesso modo il tasso di variazione di questo traffico tra il 2020 e il 2021 (arrotondato allo 0,1%).' },
    kind: 'num',
    label: { fr: 'Taux 2020 → 2021', it: 'Tasso 2020 → 2021' }, unit: '%', ans: 7.5, tol: 0.05, near: 0.2, sign: 'strict',
    traps: [
      { v: 7,
        fr: 'Tu as divisé par 3 095. On divise par la valeur de départ, ici celle de 2020 : 2 879.',
        it: 'Hai diviso per 3 095. Si divide per il valore di partenza, qui quello del 2020: 2 879.' },
      { v: -7.5,
        fr: 'Attention au sens : on fait valeur d’arrivée − valeur de départ. La fréquentation augmente, donc le taux est positif.',
        it: 'Attenzione all’ordine: si fa valore di arrivo − valore di partenza. Il traffico aumenta, quindi il tasso è positivo.' },
      { v: 216,
        fr: '216 est l’augmentation en nombre de connexions. Le taux, c’est cette augmentation divisée par la valeur de départ.',
        it: '216 è l’aumento in numero di connessioni. Il tasso è questo aumento diviso per il valore di partenza.' }
    ],
    hint: {
      fr: 'Même méthode : (valeur 2021 − valeur 2020) ÷ valeur 2020.',
      it: 'Stesso metodo: (valore 2021 − valore 2020) ÷ valore 2020.'
    },
    sol: {
      fr: '<ol><li>t = (3 095 − 2 879) ÷ 2 879 = 216 ÷ 2 879 ≈ 0,07503.</li>' +
          '<li>En pourcentage, arrondi à 0,1 % : 7,5 %.</li></ol>' +
          '<p>Entre 2020 et 2021, la fréquentation a augmenté d’environ <b>7,5 %</b>.</p>',
      it: '<ol><li>t = (3 095 − 2 879) ÷ 2 879 = 216 ÷ 2 879 ≈ 0,07503.</li>' +
          '<li>In percentuale, arrotondato allo 0,1%: 7,5%.</li></ol>' +
          '<p>Tra il 2020 e il 2021, il traffico è aumentato del <b>7,5%</b> circa.</p>'
    }
  }, {
    q: { fr: 'Calculer de même le taux d’évolution de cette fréquentation entre 2021 et 2022 (arrondi à 0,1 % près).',
         it: 'Calcola nello stesso modo il tasso di variazione di questo traffico tra il 2021 e il 2022 (arrotondato allo 0,1%).' },
    kind: 'num',
    label: { fr: 'Taux 2021 → 2022', it: 'Tasso 2021 → 2022' }, unit: '%', ans: 7.5, tol: 0.05, near: 0.2, sign: 'strict',
    traps: [
      { v: 7,
        fr: 'Tu as divisé par 3 327. On divise par la valeur de départ, ici celle de 2021 : 3 095.',
        it: 'Hai diviso per 3 327. Si divide per il valore di partenza, qui quello del 2021: 3 095.' },
      { v: -7.5,
        fr: 'Attention au sens : on fait valeur d’arrivée − valeur de départ. La fréquentation augmente, donc le taux est positif.',
        it: 'Attenzione all’ordine: si fa valore di arrivo − valore di partenza. Il traffico aumenta, quindi il tasso è positivo.' },
      { v: 232,
        fr: '232 est l’augmentation en nombre de connexions. Le taux, c’est cette augmentation divisée par la valeur de départ.',
        it: '232 è l’aumento in numero di connessioni. Il tasso è questo aumento diviso per il valore di partenza.' }
    ],
    hint: {
      fr: 'Même méthode : (valeur 2022 − valeur 2021) ÷ valeur 2021.',
      it: 'Stesso metodo: (valore 2022 − valore 2021) ÷ valore 2021.'
    },
    sol: {
      fr: '<ol><li>t = (3 327 − 3 095) ÷ 3 095 = 232 ÷ 3 095 ≈ 0,07496.</li>' +
          '<li>En pourcentage, arrondi à 0,1 % : 7,5 %.</li></ol>' +
          '<p>Entre 2021 et 2022, la fréquentation a augmenté d’environ <b>7,5 %</b>.</p>',
      it: '<ol><li>t = (3 327 − 3 095) ÷ 3 095 = 232 ÷ 3 095 ≈ 0,07496.</li>' +
          '<li>In percentuale, arrotondato allo 0,1%: 7,5%.</li></ol>' +
          '<p>Tra il 2021 e il 2022, il traffico è aumentato del <b>7,5%</b> circa.</p>'
    }
  }, {
    q: { fr: 'Que peut-on constater ?',
         it: 'Che cosa si può notare?' },
    kind: 'choice',
    choices: [
      { fr: 'Le taux d’évolution augmente chaque année.', it: 'Il tasso di variazione aumenta ogni anno.' },
      { fr: 'La fréquentation augmente chaque année du même nombre de connexions.', it: 'Il traffico aumenta ogni anno dello stesso numero di connessioni.' },
      { fr: 'Le taux d’évolution est presque le même chaque année : environ +7,5 %.', it: 'Il tasso di variazione è quasi lo stesso ogni anno: circa +7,5%.' }
    ],
    correct: 2,
    hint: {
      fr: 'Compare les trois taux trouvés. Compare aussi les augmentations en nombre de connexions : 201, 216 et 232.',
      it: 'Confronta i tre tassi trovati. Confronta anche gli aumenti in numero di connessioni: 201, 216 e 232.'
    },
    sol: {
      fr: '<ol><li>Les trois taux, arrondis à 0,1 %, sont égaux : 7,5 % ; 7,5 % ; 7,5 %.</li>' +
          '<li>Les augmentations en nombre ne sont pas égales : +201, +216, +232 connexions.</li></ol>' +
          '<p>Chaque année, la fréquentation augmente <b>d’environ 7,5 %</b> : c’est le taux d’évolution qui est presque constant, pas le nombre de connexions en plus.</p>',
      it: '<ol><li>I tre tassi, arrotondati allo 0,1%, sono uguali: 7,5%; 7,5%; 7,5%.</li>' +
          '<li>Gli aumenti in numero invece non sono uguali: +201, +216, +232 connessioni.</li></ol>' +
          '<p>Ogni anno il traffico aumenta <b>del 7,5% circa</b>: è il tasso di variazione a essere quasi costante, non il numero di connessioni in più.</p>'
    }
  }, {
    q: { fr: 'Calculer de deux manières différentes le taux d’évolution, arrondi à 0,1 % près, de la fréquentation du site entre 2019 et 2022.',
         it: 'Calcola in due modi diversi il tasso di variazione del traffico del sito tra il 2019 e il 2022, arrotondato allo 0,1%.' },
    kind: 'num',
    label: { fr: 'Taux 2019 → 2022', it: 'Tasso 2019 → 2022' }, unit: '%', ans: 24.2, tol: 0.05, sign: 'strict',
    traps: [
      { v: 22.5,
        fr: 'Tu as additionné 7,5 % + 7,5 % + 7,5 %. Les taux ne s’additionnent pas : on multiplie les coefficients multiplicateurs.',
        it: 'Hai sommato 7,5% + 7,5% + 7,5%. I tassi non si sommano: si moltiplicano i coefficienti moltiplicativi.' },
      { v: 649,
        fr: '649 est l’augmentation en nombre de connexions. Le taux, c’est cette augmentation divisée par la valeur de 2019.',
        it: '649 è l’aumento in numero di connessioni. Il tasso è questo aumento diviso per il valore del 2019.' },
      { v: 124.2,
        fr: 'Tu as donné le coefficient global en pourcentage. Le taux global, c’est C − 1.',
        it: 'Hai dato il coefficiente globale in percentuale. Il tasso globale è C − 1.' }
    ],
    hint: {
      fr: 'Manière 1 : (valeur 2022 − valeur 2019) ÷ valeur 2019. Manière 2 : trois hausses successives de 7,5 %, donc on multiplie trois fois par 1,075.',
      it: 'Modo 1: (valore 2022 − valore 2019) ÷ valore 2019. Modo 2: tre aumenti successivi del 7,5%, quindi si moltiplica tre volte per 1,075.'
    },
    sol: {
      fr: '<ol><li>Manière 1 : t = (3 327 − 2 678) ÷ 2 678 = 649 ÷ 2 678 ≈ 0,2423, soit 24,2 %.</li>' +
          '<li>Manière 2 : trois évolutions successives d’environ +7,5 %, donc C ≈ 1,075 × 1,075 × 1,075 = 1,075³ ≈ 1,2423.</li>' +
          '<li>Taux global : T = C − 1 ≈ 0,2423, soit 24,2 %.</li></ol>' +
          '<p>Entre 2019 et 2022, la fréquentation a augmenté d’environ <b>24,2 %</b> (et non de 3 × 7,5 % = 22,5 %).</p>',
      it: '<ol><li>Modo 1: t = (3 327 − 2 678) ÷ 2 678 = 649 ÷ 2 678 ≈ 0,2423, cioè 24,2%.</li>' +
          '<li>Modo 2: tre variazioni successive di circa +7,5%, quindi C ≈ 1,075 × 1,075 × 1,075 = 1,075³ ≈ 1,2423.</li>' +
          '<li>Tasso globale: T = C − 1 ≈ 0,2423, cioè 24,2%.</li></ol>' +
          '<p>Tra il 2019 e il 2022, il traffico è aumentato del <b>24,2%</b> circa (e non del 3 × 7,5% = 22,5%).</p>'
    }
  }, {
    q: { fr: 'On suppose que la fréquentation de ce site a aussi augmenté de 7,5 % entre 2018 et 2019. Déterminer la fréquentation de ce site, arrondie à l’unité, en 2018.',
         it: 'Supponiamo che il traffico di questo sito sia aumentato del 7,5% anche tra il 2018 e il 2019. Determina il traffico di questo sito nel 2018, arrotondato all’unità.' },
    kind: 'num',
    label: { fr: 'Fréquentation en 2018', it: 'Traffico nel 2018' }, unit: 'connexions', ans: 2491, tol: 0.01, near: 1, sign: 'strict',
    traps: [
      { v: 2477,
        fr: 'Tu as enlevé 7,5 % à 2 678. Mais les 7,5 % sont calculés sur la valeur de 2018, pas sur 2 678 : on divise par 1,075.',
        it: 'Hai tolto il 7,5% a 2 678. Ma il 7,5% è calcolato sul valore del 2018, non su 2 678: si divide per 1,075.' },
      { v: 2879,
        fr: 'Tu as multiplié par 1,075 : tu as retrouvé la fréquentation de 2020 ! Pour reculer d’un an, on divise par 1,075.',
        it: 'Hai moltiplicato per 1,075: hai ritrovato il traffico del 2020! Per tornare indietro di un anno si divide per 1,075.' },
      { v: 35707,
        fr: 'Tu as divisé par 0,075 (le taux). On divise par le coefficient 1,075.',
        it: 'Hai diviso per 0,075 (il tasso). Si divide per il coefficiente 1,075.' }
    ],
    hint: {
      fr: 'Fréquentation 2018 × 1,075 = 2 678. Pour retrouver la valeur initiale, divise la valeur finale par le coefficient.',
      it: 'Traffico 2018 × 1,075 = 2 678. Per ritrovare il valore iniziale, dividi il valore finale per il coefficiente.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 7,5 % revient à multiplier par 1,075 : fréquentation 2018 × 1,075 = 2 678.</li>' +
          '<li>Valeur initiale = valeur finale ÷ C = 2 678 ÷ 1,075 ≈ 2 491,2.</li>' +
          '<li>Arrondi à l’unité : 2 491.</li></ol>' +
          '<p>En 2018, la fréquentation était d’environ <b>2 491 connexions</b> par jour.</p>',
      it: '<ol><li>Aumentare del 7,5% vuol dire moltiplicare per 1,075: traffico 2018 × 1,075 = 2 678.</li>' +
          '<li>Valore iniziale = valore finale ÷ C = 2 678 ÷ 1,075 ≈ 2 491,2.</li>' +
          '<li>Arrotondato all’unità: 2 491.</li></ol>' +
          '<p>Nel 2018 il traffico era di circa <b>2 491 connessioni</b> al giorno.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex140', group: 'synth', num: '140', page: 313, stars: 3,
  title: { fr: 'Population et dépenses', it: 'Popolazione e spese' },
  text: {
    fr: '<p>Entre 2002 et 2012, la population d’un village a augmenté de 12 %. Entre 2012 et 2022, cette population a augmenté de 18 %.</p>',
    it: '<p>Tra il 2002 e il 2012, la popolazione di un paese è aumentata del 12%. Tra il 2012 e il 2022, questa popolazione è aumentata del 18%.</p>'
  },
  parts: [{
    q: { fr: 'Déterminer le taux global d’augmentation, exprimé en pourcentage, de la population de ce village entre 2002 et 2022.',
         it: 'Determina il tasso globale di aumento della popolazione di questo paese tra il 2002 e il 2022, espresso in percentuale.' },
    kind: 'num',
    label: { fr: 'Taux global', it: 'Tasso globale' }, unit: '%', ans: 32.16, tol: 0.005, sign: 'abs',
    traps: [
      { v: 30,
        fr: 'Tu as additionné les taux : 12 % + 18 %. Les taux ne s’additionnent pas : on multiplie les coefficients multiplicateurs.',
        it: 'Hai sommato i tassi: 12% + 18%. I tassi non si sommano: si moltiplicano i coefficienti moltiplicativi.' },
      { v: 132.16,
        fr: 'Tu as donné le coefficient global 1,3216 en pourcentage. Le taux global, c’est C − 1.',
        it: 'Hai dato il coefficiente globale 1,3216 in percentuale. Il tasso globale è C − 1.' }
    ],
    hint: {
      fr: 'Augmenter de 12 % : × 1,12. Augmenter de 18 % : × 1,18. Multiplie les deux coefficients, puis enlève 1.',
      it: 'Aumentare del 12%: × 1,12. Aumentare del 18%: × 1,18. Moltiplica i due coefficienti, poi sottrai 1.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 12 % revient à multiplier par 1,12 ; augmenter de 18 % revient à multiplier par 1,18.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,12 × 1,18 = 1,3216.</li>' +
          '<li>Taux global : T = C − 1 = 0,3216 = 32,16 %.</li></ol>' +
          '<p>Entre 2002 et 2022, la population a augmenté globalement de <b>32,16 %</b> (et non de 30 %).</p>',
      it: '<ol><li>Aumentare del 12% vuol dire moltiplicare per 1,12; aumentare del 18% vuol dire moltiplicare per 1,18.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,12 × 1,18 = 1,3216.</li>' +
          '<li>Tasso globale: T = C − 1 = 0,3216 = 32,16%.</li></ol>' +
          '<p>Tra il 2002 e il 2022, la popolazione è aumentata in totale del <b>32,16%</b> (e non del 30%).</p>'
    }
  }, {
    q: { fr: 'Durant la période 2012-2022, les dépenses de la commune ont progressé de 56,25 %. Le maire souhaite mettre en place une gestion plus rigoureuse et revenir au niveau des dépenses de l’année 2012. De quel pourcentage les dépenses communales doivent-elles être diminuées ?',
         it: 'Nel periodo 2012-2022, le spese del comune sono aumentate del 56,25%. Il sindaco vuole introdurre una gestione più rigorosa e tornare al livello di spesa dell’anno 2012. Di quale percentuale devono essere diminuite le spese del comune?' },
    kind: 'num',
    label: { fr: 'Pourcentage de diminution', it: 'Percentuale di diminuzione' }, unit: '%', ans: 36, tol: 0.005, sign: 'abs',
    traps: [
      { v: 56.25,
        fr: 'Une baisse de 56,25 % serait beaucoup trop forte : 1,5625 × 0,4375 ≈ 0,68. Le taux réciproque n’est pas l’opposé : calcule C′ = 1 ÷ 1,5625.',
        it: 'Un calo del 56,25% sarebbe troppo forte: 1,5625 × 0,4375 ≈ 0,68. Il tasso reciproco non è l’opposto: calcola C′ = 1 ÷ 1,5625.' },
      { v: 64,
        fr: 'Tu as donné le coefficient 0,64 en pourcentage. Le taux, c’est C′ − 1.',
        it: 'Hai dato il coefficiente 0,64 in percentuale. Il tasso è C′ − 1.' }
    ],
    hint: {
      fr: 'Une hausse de 56,25 % revient à multiplier par 1,5625. Pour revenir au niveau de 2012, on multiplie par C′ = 1 ÷ 1,5625. Ensuite, t′ = C′ − 1.',
      it: 'Un aumento del 56,25% vuol dire moltiplicare per 1,5625. Per tornare al livello del 2012 si moltiplica per C′ = 1 ÷ 1,5625. Poi t′ = C′ − 1.'
    },
    sol: {
      fr: '<ol><li>Une hausse de 56,25 % revient à multiplier par 1 + 0,5625 = 1,5625.</li>' +
          '<li>Coefficient réciproque : C′ = 1 ÷ 1,5625 = 0,64.</li>' +
          '<li>Taux réciproque : t′ = 0,64 − 1 = −0,36 = −36 %.</li></ol>' +
          '<p>Les dépenses doivent être diminuées de <b>36 %</b> (et non de 56,25 %).</p>',
      it: '<ol><li>Un aumento del 56,25% vuol dire moltiplicare per 1 + 0,5625 = 1,5625.</li>' +
          '<li>Coefficiente reciproco: C′ = 1 ÷ 1,5625 = 0,64.</li>' +
          '<li>Tasso reciproco: t′ = 0,64 − 1 = −0,36 = −36%.</li></ol>' +
          '<p>Le spese devono diminuire del <b>36%</b> (e non del 56,25%).</p>'
    }
  }, {
    q: { fr: 'L’adjoint au maire fait remarquer que l’augmentation des dépenses durant la période 2012-2022 s’explique aussi par l’accroissement de la population du village. Vérifier que l’augmentation des dépenses communales par habitant est d’environ 32,4 % à 0,1 % près.',
         it: 'Il vicesindaco fa notare che l’aumento delle spese nel periodo 2012-2022 si spiega anche con la crescita della popolazione del paese. Verifica che l’aumento delle spese del comune per abitante è del 32,4% circa, arrotondato allo 0,1%.' },
    kind: 'num',
    label: { fr: 'Hausse par habitant', it: 'Aumento per abitante' }, unit: '%', ans: 32.4, tol: 0.05, sign: 'abs',
    traps: [
      { v: 32.16,
        fr: '32,16 %, c’est la hausse de la population de 2002 à 2022 (question 1). Ici, on cherche la hausse de la dépense par habitant de 2012 à 2022 : divise 1,5625 par 1,18.',
        it: '32,16% è l’aumento della popolazione dal 2002 al 2022 (domanda 1). Qui si cerca l’aumento della spesa per abitante dal 2012 al 2022: dividi 1,5625 per 1,18.' },
      { v: 38.25,
        fr: 'Tu as soustrait les taux : 56,25 % − 18 %. Les taux ne se soustraient pas : on divise les coefficients, 1,5625 ÷ 1,18.',
        it: 'Hai sottratto i tassi: 56,25% − 18%. I tassi non si sottraggono: si dividono i coefficienti, 1,5625 ÷ 1,18.' },
      { v: 84.4,
        fr: 'Tu as multiplié les coefficients. Dépense par habitant = dépenses ÷ population : on divise 1,5625 par 1,18.',
        it: 'Hai moltiplicato i coefficienti. Spesa per abitante = spese ÷ popolazione: si divide 1,5625 per 1,18.' }
    ],
    hint: {
      fr: 'Dépense par habitant = dépenses ÷ population. Entre 2012 et 2022, les dépenses sont multipliées par 1,5625 et la population par 1,18. Par combien est multipliée la dépense par habitant ?',
      it: 'Spesa per abitante = spese ÷ popolazione. Tra il 2012 e il 2022 le spese sono moltiplicate per 1,5625 e la popolazione per 1,18. Per quanto è moltiplicata la spesa per abitante?'
    },
    sol: {
      fr: '<ol><li>Entre 2012 et 2022 : dépenses × 1,5625 ; population × 1,18.</li>' +
          '<li>Dépense par habitant = dépenses ÷ population, donc elle est multipliée par C = 1,5625 ÷ 1,18 ≈ 1,3242.</li>' +
          '<li>Taux : C − 1 ≈ 0,3242, soit 32,4 % à 0,1 % près.</li></ol>' +
          '<p>La dépense par habitant a bien augmenté d’environ <b>32,4 %</b>.</p>',
      it: '<ol><li>Tra il 2012 e il 2022: spese × 1,5625; popolazione × 1,18.</li>' +
          '<li>Spesa per abitante = spese ÷ popolazione, quindi è moltiplicata per C = 1,5625 ÷ 1,18 ≈ 1,3242.</li>' +
          '<li>Tasso: C − 1 ≈ 0,3242, cioè 32,4% arrotondato allo 0,1%.</li></ol>' +
          '<p>La spesa per abitante è proprio aumentata del <b>32,4%</b> circa.</p>'
    }
  }, {
    q: { fr: 'En considérant la population du village stable, de quel pourcentage les dépenses communales doivent-elles être diminuées si l’on veut revenir à un niveau de dépense par habitant identique à celui de 2012 ?',
         it: 'Considerando stabile la popolazione del paese, di quale percentuale devono essere diminuite le spese del comune se si vuole tornare a un livello di spesa per abitante uguale a quello del 2012?' },
    kind: 'num',
    label: { fr: 'Pourcentage de diminution', it: 'Percentuale di diminuzione' }, unit: '%', ans: 24.48, tol: 0.05, sign: 'abs',
    traps: [
      { v: 32.4,
        fr: 'Le taux réciproque n’est pas l’opposé : une baisse de 32,4 % serait trop forte. Calcule C′ = 1,18 ÷ 1,5625.',
        it: 'Il tasso reciproco non è l’opposto: un calo del 32,4% sarebbe troppo forte. Calcola C′ = 1,18 ÷ 1,5625.' },
      { v: 36,
        fr: '36 % ramène les dépenses totales au niveau de 2012. Mais on veut la dépense par habitant de 2012, et il y a 18 % d’habitants en plus : la baisse doit être plus petite.',
        it: 'Il 36% riporta le spese totali al livello del 2012. Ma si vuole la spesa per abitante del 2012, e gli abitanti sono aumentati del 18%: il calo deve essere più piccolo.' },
      { v: 75.52,
        fr: 'Tu as donné le coefficient 0,7552 en pourcentage. Le taux, c’est C′ − 1.',
        it: 'Hai dato il coefficiente 0,7552 in percentuale. Il tasso è C′ − 1.' }
    ],
    hint: {
      fr: 'Il faut annuler la hausse de la dépense par habitant (× 1,5625 ÷ 1,18). Utilise le coefficient réciproque C′ = 1 ÷ (1,5625 ÷ 1,18) = 1,18 ÷ 1,5625, puis t′ = C′ − 1.',
      it: 'Bisogna annullare l’aumento della spesa per abitante (× 1,5625 ÷ 1,18). Usa il coefficiente reciproco C′ = 1 ÷ (1,5625 ÷ 1,18) = 1,18 ÷ 1,5625, poi t′ = C′ − 1.'
    },
    sol: {
      fr: '<ol><li>Depuis 2012, la dépense par habitant a été multipliée par 1,5625 ÷ 1,18 ≈ 1,3242 (question 3).</li>' +
          '<li>La population ne change plus : pour revenir à la dépense par habitant de 2012, on multiplie les dépenses par le coefficient réciproque C′ = 1 ÷ (1,5625 ÷ 1,18) = 1,18 ÷ 1,5625 = 0,7552.</li>' +
          '<li>Taux réciproque : t′ = 0,7552 − 1 = −0,2448 = −24,48 %.</li></ol>' +
          '<p>Les dépenses doivent être diminuées de <b>24,48 %</b> (environ 24,5 %).</p>',
      it: '<ol><li>Dal 2012, la spesa per abitante è stata moltiplicata per 1,5625 ÷ 1,18 ≈ 1,3242 (domanda 3).</li>' +
          '<li>La popolazione non cambia più: per tornare alla spesa per abitante del 2012, si moltiplicano le spese per il coefficiente reciproco C′ = 1 ÷ (1,5625 ÷ 1,18) = 1,18 ÷ 1,5625 = 0,7552.</li>' +
          '<li>Tasso reciproco: t′ = 0,7552 − 1 = −0,2448 = −24,48%.</li></ol>' +
          '<p>Le spese devono diminuire del <b>24,48%</b> (circa 24,5%).</p>'
    }
  }]
});

EXOS.push({
  id: 'ex153', group: 'synth', num: '153', page: 315, stars: 2,
  tag: { fr: 'QCM', it: 'SCELTA MULTIPLA' },
  title: { fr: 'Taux global et réciproque', it: 'Tasso globale e reciproco' },
  text: {
    fr: '<p><i>Choisir la ou les bonnes réponses.</i></p>',
    it: '<p><i>Scegli la risposta giusta (o le risposte giuste).</i></p>'
  },
  parts: [{
    q: { fr: 'Le taux d’évolution global d’une augmentation de 14 % suivie d’une diminution de 12 % est :',
         it: 'Il tasso di variazione globale di un aumento del 14% seguito da una diminuzione del 12% è:' },
    kind: 'choice',
    choices: [
      { fr: '3,2 %', it: '3,2%' },
      { fr: '2 %', it: '2%' },
      { fr: '0,32 %', it: '0,32%' },
      { fr: '27,68 %', it: '27,68%' }
    ],
    correct: 2,
    hint: {
      fr: 'Augmenter de 14 % : × 1,14. Diminuer de 12 % : × 0,88. Multiplie les deux coefficients, puis enlève 1.',
      it: 'Aumentare del 14%: × 1,14. Diminuire del 12%: × 0,88. Moltiplica i due coefficienti, poi sottrai 1.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 14 % revient à multiplier par 1,14 ; diminuer de 12 % revient à multiplier par 0,88.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,14 × 0,88 = 1,0032.</li>' +
          '<li>Taux global : T = C − 1 = 0,0032 = 0,32 %.</li></ol>' +
          '<p>Bonne réponse : <b>c. 0,32 %</b> (et non 14 % − 12 % = 2 %).</p>',
      it: '<ol><li>Aumentare del 14% vuol dire moltiplicare per 1,14; diminuire del 12% vuol dire moltiplicare per 0,88.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,14 × 0,88 = 1,0032.</li>' +
          '<li>Tasso globale: T = C − 1 = 0,0032 = 0,32%.</li></ol>' +
          '<p>Risposta giusta: <b>c. 0,32%</b> (e non 14% − 12% = 2%).</p>'
    }
  }, {
    q: { fr: 'Le taux d’évolution réciproque d’une augmentation de 30 % vaut, à 0,1 % près :',
         it: 'Il tasso di variazione reciproco di un aumento del 30% vale, arrotondato allo 0,1%:' },
    kind: 'choice',
    choices: [
      { fr: '0,77 %', it: '0,77%' },
      { fr: '−23,1 %', it: '−23,1%' },
      { fr: '−30 %', it: '−30%' },
      { fr: '−77 %', it: '−77%' }
    ],
    correct: 1,
    hint: {
      fr: 'Augmenter de 30 % : × 1,3. Coefficient réciproque : C′ = 1 ÷ 1,3. Ensuite, t′ = C′ − 1.',
      it: 'Aumentare del 30%: × 1,3. Coefficiente reciproco: C′ = 1 ÷ 1,3. Poi t′ = C′ − 1.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 30 % revient à multiplier par 1,3.</li>' +
          '<li>Coefficient réciproque : C′ = 1 ÷ 1,3 ≈ 0,769.</li>' +
          '<li>Taux réciproque : t′ = C′ − 1 ≈ 0,769 − 1 = −0,231 = −23,1 %.</li></ol>' +
          '<p>Bonne réponse : <b>b. −23,1 %</b> (et non −30 %).</p>',
      it: '<ol><li>Aumentare del 30% vuol dire moltiplicare per 1,3.</li>' +
          '<li>Coefficiente reciproco: C′ = 1 ÷ 1,3 ≈ 0,769.</li>' +
          '<li>Tasso reciproco: t′ = C′ − 1 ≈ 0,769 − 1 = −0,231 = −23,1%.</li></ol>' +
          '<p>Risposta giusta: <b>b. −23,1%</b> (e non −30%).</p>'
    }
  }]
});

EXOS.push({
  id: 'ex158', group: 'synth', num: '158', page: 316, stars: 3,
  title: { fr: 'Niveau sonore', it: 'Livello sonoro' },
  text: {
    fr: '<p>Pour mieux écouter sa musique, Lucas augmente une première fois le volume de 10 %. Lucas augmente une deuxième fois le son de sorte qu’il a augmenté globalement le volume de 30 % par rapport à sa valeur initiale.</p>',
    it: '<p>Per ascoltare meglio la sua musica, Lucas aumenta una prima volta il volume del 10%. Poi Lucas aumenta una seconda volta il volume, in modo che in totale il volume sia aumentato del 30% rispetto al suo valore iniziale.</p>'
  },
  parts: [{
    q: { fr: 'Déterminer, à 0,1 % près, le pourcentage de la seconde augmentation de volume.',
         it: 'Determina la percentuale del secondo aumento di volume, arrotondata allo 0,1%.' },
    kind: 'num',
    label: { fr: 'Seconde augmentation', it: 'Secondo aumento' }, unit: '%', ans: 18.2, tol: 0.05, sign: 'abs',
    traps: [
      { v: 20,
        fr: 'Tu as fait 30 % − 10 %. Les taux ne se soustraient pas : il faut 1,1 × (1 + x) = 1,3.',
        it: 'Hai fatto 30% − 10%. I tassi non si sottraggono: serve 1,1 × (1 + x) = 1,3.' },
      { v: 17,
        fr: 'Tu as fait 1,3 × 0,9. Enlever 10 % n’annule pas une hausse de 10 % : on divise par 1,1.',
        it: 'Hai fatto 1,3 × 0,9. Togliere il 10% non annulla un aumento del 10%: si divide per 1,1.' },
      { v: 118.2,
        fr: 'Tu as donné le coefficient 1,182 en pourcentage. Le taux, c’est (1 + x) − 1.',
        it: 'Hai dato il coefficiente 1,182 in percentuale. Il tasso è (1 + x) − 1.' }
    ],
    hint: {
      fr: 'Coefficients : 1,1 pour la première hausse, 1 + x pour la seconde, 1,3 au total. Écris 1,1 × (1 + x) = 1,3 et trouve 1 + x.',
      it: 'Coefficienti: 1,1 per il primo aumento, 1 + x per il secondo, 1,3 in totale. Scrivi 1,1 × (1 + x) = 1,3 e trova 1 + x.'
    },
    sol: {
      fr: '<ol><li>Première hausse de 10 % : × 1,1. Seconde hausse de taux x : × (1 + x). Hausse globale de 30 % : × 1,3.</li>' +
          '<li>Le coefficient global est le produit des coefficients : 1,1 × (1 + x) = 1,3.</li>' +
          '<li>Donc 1 + x = 1,3 ÷ 1,1 ≈ 1,1818.</li>' +
          '<li>x ≈ 0,1818, soit 18,2 % à 0,1 % près.</li></ol>' +
          '<p>La seconde augmentation est d’environ <b>18,2 %</b> (et non de 20 %).</p>',
      it: '<ol><li>Primo aumento del 10%: × 1,1. Secondo aumento con tasso x: × (1 + x). Aumento globale del 30%: × 1,3.</li>' +
          '<li>Il coefficiente globale è il prodotto dei coefficienti: 1,1 × (1 + x) = 1,3.</li>' +
          '<li>Quindi 1 + x = 1,3 ÷ 1,1 ≈ 1,1818.</li>' +
          '<li>x ≈ 0,1818, cioè 18,2% arrotondato allo 0,1%.</li></ol>' +
          '<p>Il secondo aumento è del <b>18,2%</b> circa (e non del 20%).</p>'
    }
  }]
});
