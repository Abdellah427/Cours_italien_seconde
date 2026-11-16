EXOS.push({
  id: 'ex146', group: 'rappels', num: '146', page: 315, stars: 1,
  tag: { fr: 'VOCABULAIRE', it: 'VOCABOLARIO' },
  title: { fr: 'Taux et coefficient', it: 'Tasso e coefficiente' },
  text: {
    fr: '<p>Soit Q<sub>1</sub> et Q<sub>2</sub> deux valeurs d’une même quantité.</p><p>Recopier et compléter les phrases suivantes :</p>',
    it: '<p>Siano Q<sub>1</sub> e Q<sub>2</sub> due valori di una stessa quantità.</p><p>Ricopia e completa le frasi seguenti:</p>'
  },
  parts: [{
    q: {
      fr: 'Le rapport (Q<sub>2</sub> − Q<sub>1</sub>) ÷ Q<sub>1</sub> s’appelle …… de … à … .',
      it: 'Il rapporto (Q<sub>2</sub> − Q<sub>1</sub>) ÷ Q<sub>1</sub> si chiama …… da … a … .'
    },
    kind: 'choice',
    choices: [
      { fr: 'le coefficient multiplicateur de Q<sub>1</sub> à Q<sub>2</sub>', it: 'il coefficiente moltiplicativo da Q<sub>1</sub> a Q<sub>2</sub>' },
      { fr: 'le taux d’évolution de Q<sub>1</sub> à Q<sub>2</sub>', it: 'il tasso di variazione da Q<sub>1</sub> a Q<sub>2</sub>' },
      { fr: 'le taux d’évolution de Q<sub>2</sub> à Q<sub>1</sub>', it: 'il tasso di variazione da Q<sub>2</sub> a Q<sub>1</sub>' }
    ],
    correct: 1,
    hint: {
      fr: 'Q<sub>2</sub> − Q<sub>1</sub>, c’est ce qui a changé. On le divise par la valeur de départ Q<sub>1</sub> : on obtient l’évolution en pourcentage (par exemple 0,2 = +20 %). Attention au sens : on part de la valeur par laquelle on divise.',
      it: 'Q<sub>2</sub> − Q<sub>1</sub> è quello che è cambiato. Lo dividi per il valore di partenza Q<sub>1</sub>: ottieni la variazione in percentuale (per esempio 0,2 = +20%). Attenzione al verso: si parte dal valore per cui si divide.'
    },
    sol: {
      fr: '<ol><li>On divise par Q<sub>1</sub> : Q<sub>1</sub> est la valeur initiale, Q<sub>2</sub> la valeur finale.</li>' +
          '<li>(valeur finale − valeur initiale) ÷ valeur initiale : c’est la formule du taux d’évolution.</li></ol>' +
          '<p>Le rapport (Q<sub>2</sub> − Q<sub>1</sub>) ÷ Q<sub>1</sub> s’appelle <b>le taux d’évolution de Q<sub>1</sub> à Q<sub>2</sub></b>.</p>',
      it: '<ol><li>Si divide per Q<sub>1</sub>: Q<sub>1</sub> è il valore iniziale, Q<sub>2</sub> il valore finale.</li>' +
          '<li>(valore finale − valore iniziale) ÷ valore iniziale: è la formula del tasso di variazione.</li></ol>' +
          '<p>Il rapporto (Q<sub>2</sub> − Q<sub>1</sub>) ÷ Q<sub>1</sub> si chiama <b>tasso di variazione da Q<sub>1</sub> a Q<sub>2</sub></b>.</p>'
    }
  }, {
    q: {
      fr: 'Le nombre Q<sub>2</sub> ÷ Q<sub>1</sub> est le …… de l’évolution de … à … .',
      it: 'Il numero Q<sub>2</sub> ÷ Q<sub>1</sub> è il …… della variazione da … a … .'
    },
    kind: 'choice',
    choices: [
      { fr: 'le taux d’évolution de Q<sub>1</sub> à Q<sub>2</sub>', it: 'il tasso di variazione da Q<sub>1</sub> a Q<sub>2</sub>' },
      { fr: 'le coefficient multiplicateur de l’évolution de Q<sub>2</sub> à Q<sub>1</sub>', it: 'il coefficiente moltiplicativo della variazione da Q<sub>2</sub> a Q<sub>1</sub>' },
      { fr: 'le coefficient multiplicateur de l’évolution de Q<sub>1</sub> à Q<sub>2</sub>', it: 'il coefficiente moltiplicativo della variazione da Q<sub>1</sub> a Q<sub>2</sub>' }
    ],
    correct: 2,
    hint: {
      fr: 'Ici, pas de soustraction. Remarque que Q<sub>1</sub> × (Q<sub>2</sub> ÷ Q<sub>1</sub>) = Q<sub>2</sub> : c’est le nombre par lequel on multiplie la valeur de départ Q<sub>1</sub> pour obtenir Q<sub>2</sub>. Comment s’appelle ce nombre ?',
      it: 'Qui non c’è sottrazione. Nota che Q<sub>1</sub> × (Q<sub>2</sub> ÷ Q<sub>1</sub>) = Q<sub>2</sub>: è il numero per cui si moltiplica il valore di partenza Q<sub>1</sub> per ottenere Q<sub>2</sub>. Come si chiama questo numero?'
    },
    sol: {
      fr: '<ol><li>Q<sub>1</sub> est la valeur initiale et Q<sub>2</sub> la valeur finale.</li>' +
          '<li>Q<sub>1</sub> × (Q<sub>2</sub> ÷ Q<sub>1</sub>) = Q<sub>2</sub> : c’est le nombre par lequel on multiplie Q<sub>1</sub> pour obtenir Q<sub>2</sub>.</li>' +
          '<li>Lien avec le taux d’évolution t : C = 1 + t.</li></ol>' +
          '<p>Le nombre Q<sub>2</sub> ÷ Q<sub>1</sub> est <b>le coefficient multiplicateur de l’évolution de Q<sub>1</sub> à Q<sub>2</sub></b>.</p>',
      it: '<ol><li>Q<sub>1</sub> è il valore iniziale e Q<sub>2</sub> il valore finale.</li>' +
          '<li>Q<sub>1</sub> × (Q<sub>2</sub> ÷ Q<sub>1</sub>) = Q<sub>2</sub>: è il numero per cui si moltiplica Q<sub>1</sub> per ottenere Q<sub>2</sub>.</li>' +
          '<li>Legame con il tasso di variazione t: C = 1 + t.</li></ol>' +
          '<p>Il numero Q<sub>2</sub> ÷ Q<sub>1</sub> è <b>il coefficiente moltiplicativo della variazione da Q<sub>1</sub> a Q<sub>2</sub></b>.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex147', group: 'rappels', num: '147', page: 315, stars: 1,
  title: { fr: 'Les lettres de la Poste', it: 'Le lettere della Posta' },
  text: {
    fr: '<p>En 2008, la Poste se chargeait d’amener à bon port pas moins de 18 milliards de lettres.</p><p>En 2022, ce nombre est tombé à 7 milliards.</p>',
    it: '<p>Nel 2008, la Posta francese (la Poste) si occupava di consegnare ben 18 miliardi di lettere.</p><p>Nel 2022, questo numero è sceso a 7 miliardi.</p>'
  },
  parts: [{
    q: {
      fr: 'Déterminer, à 0,01 % près, le pourcentage de diminution du nombre de lettres distribuées par la Poste entre 2008 et 2022.',
      it: 'Determina, arrotondata allo 0,01%, la percentuale di diminuzione del numero di lettere consegnate dalla Posta tra il 2008 e il 2022.'
    },
    kind: 'num',
    label: { fr: 'Diminution', it: 'Diminuzione' }, unit: '%', ans: 61.11, tol: 0.005, sign: 'abs',
    traps: [
      { v: 11,
        fr: 'Tu as calculé la différence 18 − 7 = 11 (en milliards de lettres). Pour avoir un pourcentage, divise cette différence par la valeur de départ, 18.',
        it: 'Hai calcolato la differenza 18 − 7 = 11 (miliardi di lettere). Per avere una percentuale, dividi questa differenza per il valore di partenza, 18.' },
      { v: 157.14,
        fr: 'Tu as divisé par 7. Il faut diviser par la valeur de départ : celle de 2008, c’est-à-dire 18.',
        it: 'Hai diviso per 7. Devi dividere per il valore di partenza: quello del 2008, cioè 18.' },
      { v: 38.89,
        fr: '7 ÷ 18 ≈ 0,3889 est le coefficient multiplicateur : il reste 38,89 % des lettres. Le taux d’évolution est C − 1.',
        it: '7 ÷ 18 ≈ 0,3889 è il coefficiente moltiplicativo: rimane il 38,89% delle lettere. Il tasso di variazione è C − 1.' }
    ],
    hint: {
      fr: 'Utilise la formule du taux d’évolution : t = (valeur finale − valeur initiale) ÷ valeur initiale. La valeur initiale est celle de 2008. Écris ensuite t en pourcentage.',
      it: 'Usa la formula del tasso di variazione: t = (valore finale − valore iniziale) ÷ valore iniziale. Il valore iniziale è quello del 2008. Poi scrivi t in percentuale.'
    },
    sol: {
      fr: '<ol><li>Valeur initiale (2008) : 18 milliards ; valeur finale (2022) : 7 milliards.</li>' +
          '<li>Taux d’évolution : t = (7 − 18) ÷ 18 = −11 ÷ 18 ≈ −0,6111.</li>' +
          '<li>−0,6111 = −61,11 % : le taux est négatif, c’est une diminution.</li></ol>' +
          '<p>Le nombre de lettres a diminué de <b>61,11 %</b> (à 0,01 % près).</p>',
      it: '<ol><li>Valore iniziale (2008): 18 miliardi; valore finale (2022): 7 miliardi.</li>' +
          '<li>Tasso di variazione: t = (7 − 18) ÷ 18 = −11 ÷ 18 ≈ −0,6111.</li>' +
          '<li>−0,6111 = −61,11%: il tasso è negativo, quindi è una diminuzione.</li></ol>' +
          '<p>Il numero di lettere è diminuito del <b>61,11%</b> (arrotondato allo 0,01%).</p>'
    }
  }]
});

EXOS.push({
  id: 'ex148', group: 'rappels', num: '148', page: 315, stars: 1,
  tag: { fr: 'VRAI / FAUX', it: 'VERO / FALSO' },
  title: { fr: 'Coefficient et pourcentage', it: 'Coefficiente e percentuale' },
  text: {
    fr: '<p><i>Indiquer si les affirmations suivantes sont vraies ou fausses, puis justifier.</i></p>',
    it: '<p><i>Indica se le seguenti affermazioni sono vere o false, poi giustifica.</i></p>'
  },
  parts: [{
    q: {
      fr: '« Augmenter une quantité de 15 %, c’est la multiplier par 0,15. »',
      it: '«Aumentare una quantità del 15% vuol dire moltiplicarla per 0,15.»'
    },
    kind: 'choice',
    choices: [{ fr: 'Vrai', it: 'Vero' }, { fr: 'Faux', it: 'Falso' }],
    correct: 1,
    hint: {
      fr: 'Augmenter de 15 %, c’est garder 100 % de la quantité et ajouter 15 %. Ça fait combien de pour cent au total ? Écris ce nombre en décimal.',
      it: 'Aumentare del 15% vuol dire tenere il 100% della quantità e aggiungere il 15%. Quanto fa in tutto, in percentuale? Scrivi questo numero in forma decimale.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 15 %, c’est multiplier par 1 + 0,15 = 1,15.</li>' +
          '<li>Exemple : 100 × 1,15 = 115, alors que 100 × 0,15 = 15 (seulement 15 % de 100).</li></ol>' +
          '<p>L’affirmation est <b>fausse</b> : il faut multiplier par 1,15.</p>',
      it: '<ol><li>Aumentare del 15% vuol dire moltiplicare per 1 + 0,15 = 1,15.</li>' +
          '<li>Esempio: 100 × 1,15 = 115, mentre 100 × 0,15 = 15 (solo il 15% di 100).</li></ol>' +
          '<p>L’affermazione è <b>falsa</b>: bisogna moltiplicare per 1,15.</p>'
    }
  }, {
    q: {
      fr: '« Lorsqu’on multiplie une valeur par 0,2, cela revient à diminuer cette valeur de 80 %. »',
      it: '«Quando si moltiplica un valore per 0,2, è come diminuire questo valore dell’80%.»'
    },
    kind: 'choice',
    choices: [{ fr: 'Vrai', it: 'Vero' }, { fr: 'Faux', it: 'Falso' }],
    correct: 0,
    hint: {
      fr: 'Le coefficient multiplicateur est C = 0,2. Calcule le taux T = C − 1 : est-il positif ou négatif ?',
      it: 'Il coefficiente moltiplicativo è C = 0,2. Calcola il tasso T = C − 1: è positivo o negativo?'
    },
    sol: {
      fr: '<ol><li>Le coefficient multiplicateur est C = 0,2.</li>' +
          '<li>Taux : T = C − 1 = 0,2 − 1 = −0,8 = −80 %.</li>' +
          '<li>Le taux est négatif : c’est une diminution de 80 %.</li></ol>' +
          '<p>L’affirmation est <b>vraie</b>.</p>',
      it: '<ol><li>Il coefficiente moltiplicativo è C = 0,2.</li>' +
          '<li>Tasso: T = C − 1 = 0,2 − 1 = −0,8 = −80%.</li>' +
          '<li>Il tasso è negativo: è una diminuzione dell’80%.</li></ol>' +
          '<p>L’affermazione è <b>vera</b>.</p>'
    }
  }, {
    q: {
      fr: '« Diminuer un prix de 2 %, c’est multiplier ce prix par 0,98. »',
      it: '«Diminuire un prezzo del 2% vuol dire moltiplicare questo prezzo per 0,98.»'
    },
    kind: 'choice',
    choices: [{ fr: 'Vrai', it: 'Vero' }, { fr: 'Faux', it: 'Falso' }],
    correct: 0,
    hint: {
      fr: 'Une baisse de 2 % correspond au taux t = −0,02. Calcule le coefficient C = 1 + t.',
      it: 'Un calo del 2% corrisponde al tasso t = −0,02. Calcola il coefficiente C = 1 + t.'
    },
    sol: {
      fr: '<ol><li>Une diminution de 2 % correspond au taux t = −0,02.</li>' +
          '<li>Coefficient multiplicateur : C = 1 + t = 1 − 0,02 = 0,98.</li></ol>' +
          '<p>L’affirmation est <b>vraie</b>.</p>',
      it: '<ol><li>Una diminuzione del 2% corrisponde al tasso t = −0,02.</li>' +
          '<li>Coefficiente moltiplicativo: C = 1 + t = 1 − 0,02 = 0,98.</li></ol>' +
          '<p>L’affermazione è <b>vera</b>.</p>'
    }
  }]
});

EXOS.push({
  id: 'cap4', group: 'succ', num: 'Capacité 4', page: 303, stars: 2,
  title: { fr: 'Le cours d’une action', it: 'La quotazione di un’azione' },
  text: {
    fr: '<p>Le tableau ci-dessous décrit l’évolution du cours d’une action au 1<sup>er</sup> jour de chaque mois de 2022.</p>' +
        '<div class="tw"><table class="bt">' +
        '<tr><th>Premier jour du mois</th><td>janvier</td><td>février</td><td>mars</td><td>avril</td><td>mai</td><td>juin</td><td>juillet</td></tr>' +
        '<tr><th>Évolution d’un mois sur l’autre</th><td></td><td>+15 %</td><td>+20 %</td><td>+45 %</td><td>−30 %</td><td>−15 %</td><td>−16 %</td></tr>' +
        '</table></div>',
    it: '<p>La tabella qui sotto descrive la variazione della quotazione di un’azione (il suo valore in borsa) il 1° giorno di ogni mese del 2022.</p>' +
        '<div class="tw"><table class="bt">' +
        '<tr><th>Primo giorno del mese</th><td>gennaio</td><td>febbraio</td><td>marzo</td><td>aprile</td><td>maggio</td><td>giugno</td><td>luglio</td></tr>' +
        '<tr><th>Variazione rispetto al mese precedente</th><td></td><td>+15%</td><td>+20%</td><td>+45%</td><td>−30%</td><td>−15%</td><td>−16%</td></tr>' +
        '</table></div>'
  },
  parts: [{
    q: {
      fr: 'D’après ce tableau, le cours de l’action a augmenté de 15 % puis de 20 % entre le 1<sup>er</sup> janvier et le 1<sup>er</sup> mars. Quel est le pourcentage d’évolution du cours de l’action sur cette période ?',
      it: 'Secondo questa tabella, la quotazione dell’azione è aumentata del 15% e poi del 20% tra il 1° gennaio e il 1° marzo. Qual è la percentuale di variazione della quotazione dell’azione in questo periodo?'
    },
    kind: 'num',
    label: { fr: 'Taux global', it: 'Tasso globale' }, unit: '%', ans: 38, tol: 0.005, sign: 'strict',
    traps: [
      { v: 35,
        fr: 'Tu as additionné les taux : 15 % + 20 %. Les taux ne s’additionnent pas : on multiplie les coefficients multiplicateurs.',
        it: 'Hai sommato i tassi: 15% + 20%. I tassi non si sommano: si moltiplicano i coefficienti moltiplicativi.' },
      { v: 1.38,
        fr: '1,38 est le coefficient multiplicateur global C. Le taux est T = C − 1, à écrire en pourcentage.',
        it: '1,38 è il coefficiente moltiplicativo globale C. Il tasso è T = C − 1, da scrivere in percentuale.' }
    ],
    hint: {
      fr: 'Augmenter de 15 % revient à multiplier par 1,15. Augmenter de 20 % revient à multiplier par 1,2. Multiplie ces deux coefficients pour avoir C, puis calcule T = C − 1.',
      it: 'Aumentare del 15% vuol dire moltiplicare per 1,15. Aumentare del 20% vuol dire moltiplicare per 1,2. Moltiplica questi due coefficienti per avere C, poi calcola T = C − 1.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 15 % revient à multiplier par 1,15 ; augmenter de 20 % revient à multiplier par 1,2.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,15 × 1,2 = 1,38.</li>' +
          '<li>Taux global : T = C − 1 = 1,38 − 1 = 0,38 = 38 %.</li></ol>' +
          '<p>Le cours de l’action a augmenté globalement de <b>38 %</b> entre le 1<sup>er</sup> janvier et le 1<sup>er</sup> mars 2022 (et non de 35 %).</p>',
      it: '<ol><li>Aumentare del 15% vuol dire moltiplicare per 1,15; aumentare del 20% vuol dire moltiplicare per 1,2.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,15 × 1,2 = 1,38.</li>' +
          '<li>Tasso globale: T = C − 1 = 1,38 − 1 = 0,38 = 38%.</li></ol>' +
          '<p>La quotazione dell’azione è aumentata globalmente del <b>38%</b> tra il 1° gennaio e il 1° marzo 2022 (e non del 35%).</p>'
    }
  }, {
    q: {
      fr: 'Entre le 1<sup>er</sup> mars et le 1<sup>er</sup> mai, la valeur de l’action a augmenté de 45 % puis a diminué de 30 %. Déterminer le pourcentage d’évolution global du cours de cette action pour cette période.',
      it: 'Tra il 1° marzo e il 1° maggio, il valore dell’azione è aumentato del 45% e poi è diminuito del 30%. Determina la percentuale di variazione globale della quotazione di questa azione in questo periodo.'
    },
    kind: 'num',
    label: { fr: 'Taux global', it: 'Tasso globale' }, unit: '%', ans: 1.5, tol: 0.005, sign: 'strict',
    traps: [
      { v: 15,
        fr: 'Tu as calculé 45 % − 30 %. Les taux ne s’additionnent pas (et ne se soustraient pas) : on multiplie les coefficients multiplicateurs.',
        it: 'Hai calcolato 45% − 30%. I tassi non si sommano (e non si sottraggono): si moltiplicano i coefficienti moltiplicativi.' },
      { v: -13.5,
        fr: 'Tu as multiplié les taux : 0,45 × (−0,3). Il faut multiplier les coefficients multiplicateurs 1 + t, pas les taux.',
        it: 'Hai moltiplicato i tassi: 0,45 × (−0,3). Bisogna moltiplicare i coefficienti moltiplicativi 1 + t, non i tassi.' }
    ],
    hint: {
      fr: 'Augmenter de 45 % : multiplier par 1,45. Diminuer de 30 % : multiplier par 1 − 0,30. Multiplie ces deux coefficients, puis calcule T = C − 1.',
      it: 'Aumentare del 45%: moltiplicare per 1,45. Diminuire del 30%: moltiplicare per 1 − 0,30. Moltiplica questi due coefficienti, poi calcola T = C − 1.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 45 % revient à multiplier par 1,45 ; diminuer de 30 % revient à multiplier par 0,7.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,45 × 0,7 = 1,015.</li>' +
          '<li>Taux global : T = C − 1 = 1,015 − 1 = 0,015 = 1,5 %.</li></ol>' +
          '<p>Le cours de l’action a augmenté globalement de <b>1,5 %</b> entre le 1<sup>er</sup> mars et le 1<sup>er</sup> mai 2022 (et non de 15 %).</p>',
      it: '<ol><li>Aumentare del 45% vuol dire moltiplicare per 1,45; diminuire del 30% vuol dire moltiplicare per 0,7.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,45 × 0,7 = 1,015.</li>' +
          '<li>Tasso globale: T = C − 1 = 1,015 − 1 = 0,015 = 1,5%.</li></ol>' +
          '<p>La quotazione dell’azione è aumentata globalmente dell’<b>1,5%</b> tra il 1° marzo e il 1° maggio 2022 (e non del 15%).</p>'
    }
  }, {
    q: {
      fr: 'Justifier qu’au 1<sup>er</sup> juillet l’action a presque retrouvé sa valeur initiale du 1<sup>er</sup> janvier. Pour cela, calculer le coefficient multiplicateur global du 1<sup>er</sup> janvier au 1<sup>er</sup> juillet, arrondi à 10<sup>−3</sup> près (0,001).',
      it: 'Giustifica che il 1° luglio l’azione ha quasi ritrovato il suo valore iniziale del 1° gennaio. Per farlo, calcola il coefficiente moltiplicativo globale dal 1° gennaio al 1° luglio, arrotondato a 10<sup>−3</sup> (0,001).'
    },
    kind: 'num',
    label: { fr: 'Coefficient global', it: 'Coefficiente globale' }, unit: '', ans: 1, tol: 0.0006, sign: 'strict',
    traps: [
      { v: 1.19,
        fr: 'Tu as additionné les taux (+15 + 20 + 45 − 30 − 15 − 16 = +19 %). Les taux ne s’additionnent pas : multiplie les 6 coefficients multiplicateurs.',
        it: 'Hai sommato i tassi (+15 + 20 + 45 − 30 − 15 − 16 = +19%). I tassi non si sommano: moltiplica i 6 coefficienti moltiplicativi.' },
      { v: 0,
        fr: 'Tu as donné le taux global T (presque 0). Ici, on demande le coefficient multiplicateur : C = 1 + T.',
        it: 'Hai dato il tasso globale T (quasi 0). Qui si chiede il coefficiente moltiplicativo: C = 1 + T.' }
    ],
    hint: {
      fr: 'Il y a 6 évolutions (de février à juillet). Écris le coefficient de chacune : une hausse de 15 % donne 1,15, une baisse de 30 % donne 0,7… Puis multiplie les 6 coefficients.',
      it: 'Ci sono 6 variazioni (da febbraio a luglio). Scrivi il coefficiente di ognuna: un aumento del 15% dà 1,15, un calo del 30% dà 0,7… Poi moltiplica i 6 coefficienti.'
    },
    sol: {
      fr: '<ol><li>Coefficients des 6 évolutions : 1,15 ; 1,2 ; 1,45 ; 0,7 ; 0,85 ; 0,84 (par exemple, baisse de 16 % : 1 − 0,16 = 0,84).</li>' +
          '<li>Coefficient multiplicateur global : C = 1,15 × 1,2 × 1,45 × 0,7 × 0,85 × 0,84.</li>' +
          '<li>Pas à pas : 1,15 × 1,2 = 1,38 ; 1,38 × 1,45 = 2,001 ; 2,001 × 0,7 = 1,4007 ; 1,4007 × 0,85 = 1,190595 ; 1,190595 × 0,84 = 1,0000998.</li>' +
          '<li>Donc C ≈ 1,000 à 10<sup>−3</sup> près, et T = C − 1 ≈ 0.</li></ol>' +
          '<p>C ≈ <b>1</b> : multiplier par 1 ne change pas la valeur. Le 1<sup>er</sup> juillet 2022, la valeur de l’action est pratiquement égale à sa valeur du 1<sup>er</sup> janvier 2022.</p>',
      it: '<ol><li>Coefficienti delle 6 variazioni: 1,15; 1,2; 1,45; 0,7; 0,85; 0,84 (per esempio, calo del 16%: 1 − 0,16 = 0,84).</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,15 × 1,2 × 1,45 × 0,7 × 0,85 × 0,84.</li>' +
          '<li>Passo per passo: 1,15 × 1,2 = 1,38; 1,38 × 1,45 = 2,001; 2,001 × 0,7 = 1,4007; 1,4007 × 0,85 = 1,190595; 1,190595 × 0,84 = 1,0000998.</li>' +
          '<li>Quindi C ≈ 1,000 arrotondato a 10<sup>−3</sup>, e T = C − 1 ≈ 0.</li></ol>' +
          '<p>C ≈ <b>1</b>: moltiplicare per 1 non cambia il valore. Il 1° luglio 2022 il valore dell’azione è praticamente uguale al suo valore del 1° gennaio 2022.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex116', group: 'succ', num: '116', page: 311, stars: 2,
  title: { fr: 'Population d’une ville', it: 'La popolazione di una città' },
  text: {
    fr: '<p>On étudie l’évolution de la population d’une ville pendant plusieurs années successives.</p>' +
        '<div class="tw"><table class="bt">' +
        '<tr><th>Période</th><td>2019-2020</td><td>2020-2021</td><td>2021-2022</td></tr>' +
        '<tr><th>Évolution</th><td>+2 %</td><td>−6 %</td><td>+8 %</td></tr>' +
        '</table></div>',
    it: '<p>Si studia la variazione della popolazione di una città durante diversi anni successivi.</p>' +
        '<div class="tw"><table class="bt">' +
        '<tr><th>Periodo</th><td>2019-2020</td><td>2020-2021</td><td>2021-2022</td></tr>' +
        '<tr><th>Variazione</th><td>+2%</td><td>−6%</td><td>+8%</td></tr>' +
        '</table></div>'
  },
  parts: [{
    q: {
      fr: 'Justifier que la population a globalement diminué de 4,12 % sur la période 2019-2021. Pour cela, calculer le coefficient multiplicateur global de cette période.',
      it: 'Giustifica che la popolazione è diminuita globalmente del 4,12% nel periodo 2019-2021. Per farlo, calcola il coefficiente moltiplicativo globale di questo periodo.'
    },
    kind: 'num',
    label: { fr: 'Coefficient global', it: 'Coefficiente globale' }, unit: '', ans: 0.9588, tol: 0.00005, sign: 'strict',
    traps: [
      { v: 0.96,
        fr: 'Si tu as additionné les taux (2 % − 6 % = −4 %, d’où 0,96), c’est faux : multiplie les coefficients 1,02 et 0,94. Si tu as arrondi, écris le résultat exact, sans arrondir.',
        it: 'Se hai sommato i tassi (2% − 6% = −4%, quindi 0,96), è sbagliato: moltiplica i coefficienti 1,02 e 0,94. Se hai arrotondato, scrivi il risultato esatto, senza arrotondare.' },
      { v: -0.0012,
        fr: 'Tu as multiplié les taux (0,02 × (−0,06)). Il faut multiplier les coefficients multiplicateurs 1 + t, pas les taux.',
        it: 'Hai moltiplicato i tassi (0,02 × (−0,06)). Bisogna moltiplicare i coefficienti moltiplicativi 1 + t, non i tassi.' }
    ],
    hint: {
      fr: 'Une hausse de 2 % : on multiplie par 1,02. Une baisse de 6 % : on multiplie par 1 − 0,06. Multiplie ces deux coefficients.',
      it: 'Un aumento del 2%: si moltiplica per 1,02. Un calo del 6%: si moltiplica per 1 − 0,06. Moltiplica questi due coefficienti.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 2 % revient à multiplier par 1,02 ; diminuer de 6 % revient à multiplier par 0,94.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,02 × 0,94 = 0,9588.</li>' +
          '<li>Taux global : T = C − 1 = 0,9588 − 1 = −0,0412 = −4,12 %.</li></ol>' +
          '<p>C = <b>0,9588</b>. Le taux global est négatif : la population a bien diminué de 4,12 % entre 2019 et 2021.</p>',
      it: '<ol><li>Aumentare del 2% vuol dire moltiplicare per 1,02; diminuire del 6% vuol dire moltiplicare per 0,94.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,02 × 0,94 = 0,9588.</li>' +
          '<li>Tasso globale: T = C − 1 = 0,9588 − 1 = −0,0412 = −4,12%.</li></ol>' +
          '<p>C = <b>0,9588</b>. Il tasso globale è negativo: la popolazione è davvero diminuita del 4,12% tra il 2019 e il 2021.</p>'
    }
  }, {
    q: {
      fr: 'Justifier que la population a globalement augmenté de 1,52 % sur la période 2020-2022. Pour cela, calculer le coefficient multiplicateur global de cette période.',
      it: 'Giustifica che la popolazione è aumentata globalmente dell’1,52% nel periodo 2020-2022. Per farlo, calcola il coefficiente moltiplicativo globale di questo periodo.'
    },
    kind: 'num',
    label: { fr: 'Coefficient global', it: 'Coefficiente globale' }, unit: '', ans: 1.0152, tol: 0.00005, sign: 'strict',
    traps: [
      { v: 1.02,
        fr: 'Si tu as additionné les taux (−6 % + 8 % = 2 %, d’où 1,02), c’est faux : multiplie les coefficients 0,94 et 1,08. Si tu as arrondi, écris le résultat exact, sans arrondir.',
        it: 'Se hai sommato i tassi (−6% + 8% = 2%, quindi 1,02), è sbagliato: moltiplica i coefficienti 0,94 e 1,08. Se hai arrotondato, scrivi il risultato esatto, senza arrotondare.' },
      { v: -0.0048,
        fr: 'Tu as multiplié les taux ((−0,06) × 0,08). Il faut multiplier les coefficients multiplicateurs 1 + t, pas les taux.',
        it: 'Hai moltiplicato i tassi ((−0,06) × 0,08). Bisogna moltiplicare i coefficienti moltiplicativi 1 + t, non i tassi.' }
    ],
    hint: {
      fr: 'Une baisse de 6 % : on multiplie par 0,94. Une hausse de 8 % : on multiplie par 1 + 0,08. Multiplie ces deux coefficients.',
      it: 'Un calo del 6%: si moltiplica per 0,94. Un aumento dell’8%: si moltiplica per 1 + 0,08. Moltiplica questi due coefficienti.'
    },
    sol: {
      fr: '<ol><li>Diminuer de 6 % revient à multiplier par 0,94 ; augmenter de 8 % revient à multiplier par 1,08.</li>' +
          '<li>Coefficient multiplicateur global : C = 0,94 × 1,08 = 1,0152.</li>' +
          '<li>Taux global : T = C − 1 = 1,0152 − 1 = 0,0152 = 1,52 %.</li></ol>' +
          '<p>C = <b>1,0152</b>. Le taux global est positif : la population a bien augmenté de 1,52 % entre 2020 et 2022.</p>',
      it: '<ol><li>Diminuire del 6% vuol dire moltiplicare per 0,94; aumentare dell’8% vuol dire moltiplicare per 1,08.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 0,94 × 1,08 = 1,0152.</li>' +
          '<li>Tasso globale: T = C − 1 = 1,0152 − 1 = 0,0152 = 1,52%.</li></ol>' +
          '<p>C = <b>1,0152</b>. Il tasso globale è positivo: la popolazione è davvero aumentata dell’1,52% tra il 2020 e il 2022.</p>'
    }
  }, {
    q: {
      fr: 'Déterminer le pourcentage d’évolution global de la population sur la période 2019-2022.',
      it: 'Determina la percentuale di variazione globale della popolazione nel periodo 2019-2022.'
    },
    kind: 'num',
    label: { fr: 'Taux global', it: 'Tasso globale' }, unit: '%', ans: 3.5504, tol: 0.006, sign: 'strict',
    traps: [
      { v: 4,
        fr: 'Tu as additionné les taux : 2 − 6 + 8 = 4. Les taux ne s’additionnent pas : multiplie les trois coefficients multiplicateurs.',
        it: 'Hai sommato i tassi: 2 − 6 + 8 = 4. I tassi non si sommano: moltiplica i tre coefficienti moltiplicativi.' },
      { v: 1.035504,
        fr: 'C’est le coefficient multiplicateur global C. Le taux est T = C − 1, à écrire en pourcentage.',
        it: 'Questo è il coefficiente moltiplicativo globale C. Il tasso è T = C − 1, da scrivere in percentuale.' }
    ],
    hint: {
      fr: 'Tu connais déjà C = 0,9588 de 2019 à 2021 (question 1). Multiplie-le par le coefficient de 2021-2022, puis calcule T = C − 1.',
      it: 'Conosci già C = 0,9588 dal 2019 al 2021 (domanda 1). Moltiplicalo per il coefficiente del 2021-2022, poi calcola T = C − 1.'
    },
    sol: {
      fr: '<ol><li>Les trois coefficients multiplicateurs sont 1,02 ; 0,94 et 1,08.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,02 × 0,94 × 1,08 = 0,9588 × 1,08 = 1,035504.</li>' +
          '<li>Taux global : T = C − 1 = 0,035504 = 3,5504 %.</li></ol>' +
          '<p>De 2019 à 2022, la population a augmenté globalement de <b>3,5504 %</b> (environ 3,55 %), et non de 4 %.</p>',
      it: '<ol><li>I tre coefficienti moltiplicativi sono 1,02; 0,94 e 1,08.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,02 × 0,94 × 1,08 = 0,9588 × 1,08 = 1,035504.</li>' +
          '<li>Tasso globale: T = C − 1 = 0,035504 = 3,5504%.</li></ol>' +
          '<p>Dal 2019 al 2022 la popolazione è aumentata globalmente del <b>3,5504%</b> (circa 3,55%), e non del 4%.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex117', group: 'succ', num: '117', page: 311, stars: 1,
  title: { fr: 'Coût d’une bouteille', it: 'Il costo di una bottiglia' },
  text: {
    fr: '<p>Le coût de fabrication d’une bouteille a augmenté de 24 %, puis il a diminué de 17 %.</p>',
    it: '<p>Il costo di produzione di una bottiglia è aumentato del 24%, poi è diminuito del 17%.</p>'
  },
  parts: [{
    q: {
      fr: 'L’évolution globale correspondante est-elle une augmentation ou une diminution ?',
      it: 'La variazione globale corrispondente è un aumento o una diminuzione?'
    },
    kind: 'choice',
    choices: [{ fr: 'Une augmentation', it: 'Un aumento' }, { fr: 'Une diminution', it: 'Una diminuzione' }],
    correct: 0,
    hint: {
      fr: 'Calcule le coefficient multiplicateur global (hausse de 24 % : 1,24 ; baisse de 17 % : 1 − 0,17). Est-il plus grand ou plus petit que 1 ?',
      it: 'Calcola il coefficiente moltiplicativo globale (aumento del 24%: 1,24; calo del 17%: 1 − 0,17). È più grande o più piccolo di 1?'
    },
    sol: {
      fr: '<ol><li>Augmenter de 24 % revient à multiplier par 1,24 ; diminuer de 17 % revient à multiplier par 0,83.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,24 × 0,83 = 1,0292.</li>' +
          '<li>C est plus grand que 1.</li></ol>' +
          '<p>L’évolution globale est une <b>augmentation</b>.</p>',
      it: '<ol><li>Aumentare del 24% vuol dire moltiplicare per 1,24; diminuire del 17% vuol dire moltiplicare per 0,83.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,24 × 0,83 = 1,0292.</li>' +
          '<li>C è più grande di 1.</li></ol>' +
          '<p>La variazione globale è un <b>aumento</b>.</p>'
    }
  }, {
    q: { fr: 'De quel taux ?', it: 'Di quale tasso? (tasso di variazione globale)' },
    kind: 'num',
    label: { fr: 'Taux global', it: 'Tasso globale' }, unit: '%', ans: 2.92, tol: 0.005, sign: 'strict',
    traps: [
      { v: 7,
        fr: 'Tu as calculé 24 % − 17 %. Les taux ne s’additionnent pas : on multiplie les coefficients multiplicateurs.',
        it: 'Hai calcolato 24% − 17%. I tassi non si sommano: si moltiplicano i coefficienti moltiplicativi.' },
      { v: 1.0292,
        fr: '1,0292 est le coefficient multiplicateur global C. Le taux est T = C − 1, à écrire en pourcentage.',
        it: '1,0292 è il coefficiente moltiplicativo globale C. Il tasso è T = C − 1, da scrivere in percentuale.' }
    ],
    hint: {
      fr: 'Utilise C = 1,24 × 0,83. Le taux global est T = C − 1, à écrire en pourcentage.',
      it: 'Usa C = 1,24 × 0,83. Il tasso globale è T = C − 1, da scrivere in percentuale.'
    },
    sol: {
      fr: '<ol><li>Coefficient multiplicateur global : C = 1,24 × 0,83 = 1,0292.</li>' +
          '<li>Taux global : T = C − 1 = 1,0292 − 1 = 0,0292 = 2,92 %.</li></ol>' +
          '<p>Le coût de fabrication a augmenté globalement de <b>2,92 %</b> (et non de 24 − 17 = 7 %).</p>',
      it: '<ol><li>Coefficiente moltiplicativo globale: C = 1,24 × 0,83 = 1,0292.</li>' +
          '<li>Tasso globale: T = C − 1 = 1,0292 − 1 = 0,0292 = 2,92%.</li></ol>' +
          '<p>Il costo di produzione è aumentato globalmente del <b>2,92%</b> (e non del 24 − 17 = 7%).</p>'
    }
  }]
});

EXOS.push({
  id: 'ex118', group: 'succ', num: '118', page: 311, stars: 1,
  tag: { fr: 'VRAI / FAUX', it: 'VERO / FALSO' },
  title: { fr: 'Hausses et baisses successives', it: 'Aumenti e cali successivi' },
  text: {
    fr: '<p><i>Indiquer si les affirmations suivantes sont vraies ou fausses, puis justifier.</i></p>',
    it: '<p><i>Indica se le seguenti affermazioni sono vere o false, poi giustifica.</i></p>'
  },
  parts: [{
    q: {
      fr: '« Une augmentation de 30 % suivie d’une augmentation de 20 % correspondent à une augmentation globale de 50 %. »',
      it: '«Un aumento del 30% seguito da un aumento del 20% corrisponde a un aumento globale del 50%.»'
    },
    kind: 'choice',
    choices: [{ fr: 'Vrai', it: 'Vero' }, { fr: 'Faux', it: 'Falso' }],
    correct: 1,
    hint: {
      fr: 'Écris les coefficients des deux hausses (30 % : 1,3 ; 20 % : 1,2), multiplie-les, puis calcule T = C − 1.',
      it: 'Scrivi i coefficienti dei due aumenti (30%: 1,3; 20%: 1,2), moltiplicali, poi calcola T = C − 1.'
    },
    sol: {
      fr: '<ol><li>Coefficients : 1,3 et 1,2.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,3 × 1,2 = 1,56.</li>' +
          '<li>Taux global : T = C − 1 = 0,56 = 56 %.</li></ol>' +
          '<p>L’affirmation est <b>fausse</b> : l’augmentation globale est de 56 %, pas de 50 %.</p>',
      it: '<ol><li>Coefficienti: 1,3 e 1,2.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,3 × 1,2 = 1,56.</li>' +
          '<li>Tasso globale: T = C − 1 = 0,56 = 56%.</li></ol>' +
          '<p>L’affermazione è <b>falsa</b>: l’aumento globale è del 56%, non del 50%.</p>'
    }
  }, {
    q: {
      fr: '« Deux diminutions successives de 30 % correspondent à une diminution globale de 51 %. »',
      it: '«Due diminuzioni successive del 30% corrispondono a una diminuzione globale del 51%.»'
    },
    kind: 'choice',
    choices: [{ fr: 'Vrai', it: 'Vero' }, { fr: 'Faux', it: 'Falso' }],
    correct: 0,
    hint: {
      fr: 'Une baisse de 30 % : on multiplie par 0,7. Deux fois de suite : calcule 0,7 × 0,7, puis T = C − 1.',
      it: 'Un calo del 30%: si moltiplica per 0,7. Due volte di seguito: calcola 0,7 × 0,7, poi T = C − 1.'
    },
    sol: {
      fr: '<ol><li>Diminuer de 30 % revient à multiplier par 0,7.</li>' +
          '<li>Coefficient multiplicateur global : C = 0,7 × 0,7 = 0,49.</li>' +
          '<li>Taux global : T = C − 1 = 0,49 − 1 = −0,51 = −51 %.</li></ol>' +
          '<p>L’affirmation est <b>vraie</b> : c’est une diminution globale de 51 % (et non de 60 %).</p>',
      it: '<ol><li>Diminuire del 30% vuol dire moltiplicare per 0,7.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 0,7 × 0,7 = 0,49.</li>' +
          '<li>Tasso globale: T = C − 1 = 0,49 − 1 = −0,51 = −51%.</li></ol>' +
          '<p>L’affermazione è <b>vera</b>: è una diminuzione globale del 51% (e non del 60%).</p>'
    }
  }, {
    q: {
      fr: '« Une augmentation de 10 % suivie d’une diminution de 10 % se compensent globalement. »',
      it: '«Un aumento del 10% e poi una diminuzione del 10% si compensano globalmente.»'
    },
    kind: 'choice',
    choices: [{ fr: 'Vrai', it: 'Vero' }, { fr: 'Faux', it: 'Falso' }],
    correct: 1,
    hint: {
      fr: '« Se compenser » veut dire revenir à la valeur de départ, donc avoir un coefficient global égal à 1. Calcule 1,1 × 0,9.',
      it: '«Compensarsi» vuol dire tornare al valore di partenza, cioè avere un coefficiente globale uguale a 1. Calcola 1,1 × 0,9.'
    },
    sol: {
      fr: '<ol><li>Coefficients : 1,1 et 0,9.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,1 × 0,9 = 0,99.</li>' +
          '<li>Taux global : T = C − 1 = 0,99 − 1 = −0,01 = −1 %.</li></ol>' +
          '<p>L’affirmation est <b>fausse</b> : C n’est pas égal à 1, la quantité diminue globalement de 1 %.</p>',
      it: '<ol><li>Coefficienti: 1,1 e 0,9.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,1 × 0,9 = 0,99.</li>' +
          '<li>Tasso globale: T = C − 1 = 0,99 − 1 = −0,01 = −1%.</li></ol>' +
          '<p>L’affermazione è <b>falsa</b>: C non è uguale a 1, la quantità diminuisce globalmente dell’1%.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex119', group: 'succ', num: '119', page: 311, stars: 2,
  tag: { fr: 'MATHS & ÉCONOMIE', it: 'MATEMATICA & ECONOMIA' },
  title: { fr: 'Inflation dans deux pays', it: 'Inflazione in due paesi' },
  text: {
    fr: '<p>Au pays de la Cascade, l’inflation a été de 4 % en 2021, puis de 3 % en 2022. Au pays du Ciel, l’inflation a été de 5 % en 2021, puis de 2 % en 2022.</p>' +
        '<p><i><b>Le saviez-vous ?</b> L’inflation est la perte du pouvoir d’achat de la monnaie qui se traduit par une augmentation générale et durable des prix.</i></p>',
    it: '<p>Nel paese della Cascata, l’inflazione è stata del 4% nel 2021, poi del 3% nel 2022. Nel paese del Cielo, l’inflazione è stata del 5% nel 2021, poi del 2% nel 2022.</p>' +
        '<p><i><b>Lo sapevi?</b> L’inflazione è la perdita del potere d’acquisto della moneta, che si traduce in un aumento generale e duraturo dei prezzi.</i></p>'
  },
  parts: [{
    q: {
      fr: 'Calculer le taux d’évolution global des prix au pays de la Cascade sur l’ensemble des deux années.',
      it: 'Calcola il tasso di variazione globale dei prezzi nel paese della Cascata sull’insieme dei due anni.'
    },
    kind: 'num',
    label: { fr: 'Taux global (Cascade)', it: 'Tasso globale (Cascata)' }, unit: '%', ans: 7.12, tol: 0.005, sign: 'strict',
    traps: [
      { v: 7,
        fr: 'Tu as additionné 4 % et 3 %. Les taux ne s’additionnent pas : multiplie les coefficients 1,04 et 1,03.',
        it: 'Hai sommato 4% e 3%. I tassi non si sommano: moltiplica i coefficienti 1,04 e 1,03.' },
      { v: 0.12,
        fr: 'Tu as multiplié les taux (0,04 × 0,03). Il faut multiplier les coefficients multiplicateurs 1 + t.',
        it: 'Hai moltiplicato i tassi (0,04 × 0,03). Bisogna moltiplicare i coefficienti moltiplicativi 1 + t.' }
    ],
    hint: {
      fr: 'Une inflation de 4 % veut dire que les prix augmentent de 4 % : ils sont multipliés par 1,04. Fais de même pour 3 %, multiplie les deux coefficients, puis calcule T = C − 1.',
      it: 'Un’inflazione del 4% vuol dire che i prezzi aumentano del 4%: vengono moltiplicati per 1,04. Fai lo stesso per il 3%, moltiplica i due coefficienti, poi calcola T = C − 1.'
    },
    sol: {
      fr: '<ol><li>Inflation de 4 % : les prix sont multipliés par 1,04 ; inflation de 3 % : par 1,03.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,04 × 1,03 = 1,0712.</li>' +
          '<li>Taux global : T = C − 1 = 0,0712 = 7,12 %.</li></ol>' +
          '<p>Au pays de la Cascade, les prix ont augmenté globalement de <b>7,12 %</b>.</p>',
      it: '<ol><li>Inflazione del 4%: i prezzi vengono moltiplicati per 1,04; inflazione del 3%: per 1,03.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,04 × 1,03 = 1,0712.</li>' +
          '<li>Tasso globale: T = C − 1 = 0,0712 = 7,12%.</li></ol>' +
          '<p>Nel paese della Cascata i prezzi sono aumentati globalmente del <b>7,12%</b>.</p>'
    }
  }, {
    q: {
      fr: 'Calculer le taux d’évolution global des prix au pays du Ciel sur l’ensemble des deux années.',
      it: 'Calcola il tasso di variazione globale dei prezzi nel paese del Cielo sull’insieme dei due anni.'
    },
    kind: 'num',
    label: { fr: 'Taux global (Ciel)', it: 'Tasso globale (Cielo)' }, unit: '%', ans: 7.1, tol: 0.005, sign: 'strict',
    traps: [
      { v: 7.12,
        fr: '7,12 %, c’est le taux du pays de la Cascade (question 1). Ici, pour le pays du Ciel, multiplie 1,05 × 1,02.',
        it: '7,12% è il tasso del paese della Cascata (domanda 1). Qui, per il paese del Cielo, moltiplica 1,05 × 1,02.' },
      { v: 7,
        fr: 'Tu as additionné 5 % et 2 %. Les taux ne s’additionnent pas : multiplie les coefficients 1,05 et 1,02.',
        it: 'Hai sommato 5% e 2%. I tassi non si sommano: moltiplica i coefficienti 1,05 e 1,02.' },
      { v: 0.1,
        fr: 'Tu as multiplié les taux (0,05 × 0,02). Il faut multiplier les coefficients multiplicateurs 1 + t.',
        it: 'Hai moltiplicato i tassi (0,05 × 0,02). Bisogna moltiplicare i coefficienti moltiplicativi 1 + t.' }
    ],
    hint: {
      fr: 'Même méthode : une inflation de 5 % donne le coefficient 1,05, une inflation de 2 % donne 1,02. Multiplie-les, puis calcule T = C − 1.',
      it: 'Stesso metodo: un’inflazione del 5% dà il coefficiente 1,05, un’inflazione del 2% dà 1,02. Moltiplicali, poi calcola T = C − 1.'
    },
    sol: {
      fr: '<ol><li>Inflation de 5 % : les prix sont multipliés par 1,05 ; inflation de 2 % : par 1,02.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,05 × 1,02 = 1,071.</li>' +
          '<li>Taux global : T = C − 1 = 0,071 = 7,1 %.</li></ol>' +
          '<p>Au pays du Ciel, les prix ont augmenté globalement de <b>7,1 %</b>.</p>',
      it: '<ol><li>Inflazione del 5%: i prezzi vengono moltiplicati per 1,05; inflazione del 2%: per 1,02.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,05 × 1,02 = 1,071.</li>' +
          '<li>Tasso globale: T = C − 1 = 0,071 = 7,1%.</li></ol>' +
          '<p>Nel paese del Cielo i prezzi sono aumentati globalmente del <b>7,1%</b>.</p>'
    }
  }, {
    q: {
      fr: 'Dans quel pays les prix ont-ils le moins augmenté sur l’ensemble des deux années ?',
      it: 'In quale paese i prezzi sono aumentati di meno sull’insieme dei due anni?'
    },
    kind: 'choice',
    choices: [
      { fr: 'Au pays de la Cascade', it: 'Nel paese della Cascata' },
      { fr: 'Au pays du Ciel', it: 'Nel paese del Cielo' },
      { fr: 'Les prix ont augmenté autant dans les deux pays', it: 'I prezzi sono aumentati allo stesso modo nei due paesi' }
    ],
    correct: 1,
    hint: {
      fr: 'Compare les deux taux globaux que tu as calculés aux questions 1 et 2.',
      it: 'Confronta i due tassi globali che hai calcolato nelle domande 1 e 2.'
    },
    sol: {
      fr: '<ol><li>Cascade : hausse globale de 7,12 % (C = 1,0712).</li>' +
          '<li>Ciel : hausse globale de 7,1 % (C = 1,071).</li>' +
          '<li>7,1 est plus petit que 7,12.</li></ol>' +
          '<p>Les prix ont le moins augmenté <b>au pays du Ciel</b>. Attention : en additionnant les taux, on trouverait 7 % dans les deux pays, ce qui est faux.</p>',
      it: '<ol><li>Cascata: aumento globale del 7,12% (C = 1,0712).</li>' +
          '<li>Cielo: aumento globale del 7,1% (C = 1,071).</li>' +
          '<li>7,1 è più piccolo di 7,12.</li></ol>' +
          '<p>I prezzi sono aumentati di meno <b>nel paese del Cielo</b>. Attenzione: sommando i tassi si troverebbe 7% in tutti e due i paesi, ed è sbagliato.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex120', group: 'succ', num: '120', page: 311, stars: 2,
  title: { fr: 'Schémas à compléter', it: 'Schemi da completare' },
  text: {
    fr: '<p>Reproduire et compléter chaque schéma par les coefficients multiplicateurs correspondants, puis calculer la valeur masquée par le point d’interrogation en une seule étape.</p>',
    it: '<p>Ricopia e completa ogni schema con i coefficienti moltiplicativi corrispondenti, poi calcola il valore nascosto dal punto interrogativo in un solo passaggio.</p>'
  },
  parts: [{
    figure: { chain: {
      nodes: ['1 100', '', '?'],
      top: [{ fr: 'Diminuer de 15 %', it: 'Diminuire del 15%' }, { fr: 'Diminuer de 25 %', it: 'Diminuire del 25%' }],
      ops: ['× …', '× …'],
      bottom: { op: '× …', dir: 'fwd' }
    } },
    q: {
      fr: 'Schéma a. Compléter les flèches. Par quel nombre multiplie-t-on sur la flèche du bas (coefficient multiplicateur global) ?',
      it: 'Schema a. Completa le frecce. Per quale numero si moltiplica sulla freccia in basso (coefficiente moltiplicativo globale)?'
    },
    kind: 'num',
    label: { fr: 'Coefficient global', it: 'Coefficiente globale' }, unit: '', ans: 0.6375, tol: 0.00005, sign: 'strict',
    traps: [
      { v: 0.6,
        fr: 'Tu as additionné les baisses (15 % + 25 % = 40 %). Les taux ne s’additionnent pas : multiplie les deux coefficients des flèches du haut.',
        it: 'Hai sommato i cali (15% + 25% = 40%). I tassi non si sommano: moltiplica i due coefficienti delle frecce in alto.' },
      { v: 0.0375,
        fr: 'Tu as multiplié 0,15 et 0,25. Pour une baisse, le coefficient est 1 moins le taux : 1 − 0,15 et 1 − 0,25.',
        it: 'Hai moltiplicato 0,15 e 0,25. Per un calo il coefficiente è 1 meno il tasso: 1 − 0,15 e 1 − 0,25.' }
    ],
    hint: {
      fr: 'Diminuer de 15 %, c’est multiplier par 1 − 0,15. Fais de même pour 25 %. La flèche du bas, c’est le produit des deux coefficients.',
      it: 'Diminuire del 15% vuol dire moltiplicare per 1 − 0,15. Fai lo stesso per il 25%. La freccia in basso è il prodotto dei due coefficienti.'
    },
    sol: {
      fr: '<ol><li>Diminuer de 15 % revient à multiplier par 1 − 0,15 = 0,85 : première flèche « × 0,85 ».</li>' +
          '<li>Diminuer de 25 % revient à multiplier par 1 − 0,25 = 0,75 : deuxième flèche « × 0,75 ».</li>' +
          '<li>Flèche du bas : on multiplie les coefficients, C = 0,85 × 0,75 = 0,6375.</li></ol>' +
          '<p>Coefficient multiplicateur global : <b>0,6375</b> (flèche du bas « × 0,6375 »).</p>',
      it: '<ol><li>Diminuire del 15% vuol dire moltiplicare per 1 − 0,15 = 0,85: prima freccia «× 0,85».</li>' +
          '<li>Diminuire del 25% vuol dire moltiplicare per 1 − 0,25 = 0,75: seconda freccia «× 0,75».</li>' +
          '<li>Freccia in basso: si moltiplicano i coefficienti, C = 0,85 × 0,75 = 0,6375.</li></ol>' +
          '<p>Coefficiente moltiplicativo globale: <b>0,6375</b> (freccia in basso «× 0,6375»).</p>'
    }
  }, {
    q: {
      fr: 'Schéma a. Calculer en une seule étape la valeur masquée par le point d’interrogation.',
      it: 'Schema a. Calcola in un solo passaggio il valore nascosto dal punto interrogativo a destra.'
    },
    kind: 'num',
    label: { fr: 'Valeur masquée', it: 'Valore nascosto' }, unit: '', ans: 701.25, tol: 0.005, sign: 'strict',
    traps: [
      { v: 660,
        fr: 'Tu as utilisé 0,6 (baisse de 15 % + 25 % = 40 %). Les baisses ne s’additionnent pas : utilise le coefficient global 0,85 × 0,75.',
        it: 'Hai usato 0,6 (calo del 15% + 25% = 40%). I cali non si sommano: usa il coefficiente globale 0,85 × 0,75.' },
      { v: 935,
        fr: '935 est la valeur de la bulle du milieu (après la première flèche seulement). Va jusqu’au point d’interrogation de droite.',
        it: '935 è il valore della bolla in mezzo (solo dopo la prima freccia). Arriva fino al punto interrogativo a destra.' }
    ],
    hint: {
      fr: 'En une seule étape : multiplie 1 100 par le coefficient global de la question précédente.',
      it: 'In un solo passaggio: moltiplica 1 100 per il coefficiente globale della domanda precedente.'
    },
    sol: {
      fr: '<ol><li>En une seule étape : 1 100 × 0,6375 = 701,25.</li>' +
          '<li>Vérification en deux étapes : 1 100 × 0,85 = 935 (bulle du milieu), puis 935 × 0,75 = 701,25.</li></ol>' +
          '<p>La valeur masquée par le point d’interrogation est <b>701,25</b>.</p>',
      it: '<ol><li>In un solo passaggio: 1 100 × 0,6375 = 701,25.</li>' +
          '<li>Verifica in due passaggi: 1 100 × 0,85 = 935 (bolla in mezzo), poi 935 × 0,75 = 701,25.</li></ol>' +
          '<p>Il valore nascosto dal punto interrogativo è <b>701,25</b>.</p>'
    }
  }, {
    figure: { chain: {
      nodes: ['400', '', '?'],
      top: [{ fr: 'Diminuer de 40 %', it: 'Diminuire del 40%' }, { fr: 'Augmenter de 5 %', it: 'Aumentare del 5%' }],
      ops: ['× …', '× …'],
      bottom: { op: '× …', dir: 'fwd' }
    } },
    q: {
      fr: 'Schéma b. Compléter les flèches. Par quel nombre multiplie-t-on sur la flèche du bas (coefficient multiplicateur global) ?',
      it: 'Schema b. Completa le frecce. Per quale numero si moltiplica sulla freccia in basso (coefficiente moltiplicativo globale)?'
    },
    kind: 'num',
    label: { fr: 'Coefficient global', it: 'Coefficiente globale' }, unit: '', ans: 0.63, tol: 0.00005, sign: 'strict',
    traps: [
      { v: 0.65,
        fr: 'Tu as additionné les taux (−40 % + 5 % = −35 %). Les taux ne s’additionnent pas : multiplie les deux coefficients des flèches du haut.',
        it: 'Hai sommato i tassi (−40% + 5% = −35%). I tassi non si sommano: moltiplica i due coefficienti delle frecce in alto.' },
      { v: -0.02,
        fr: 'Tu as multiplié les taux (−0,4 × 0,05). Il faut multiplier les coefficients multiplicateurs 1 + t.',
        it: 'Hai moltiplicato i tassi (−0,4 × 0,05). Bisogna moltiplicare i coefficienti moltiplicativi 1 + t.' }
    ],
    hint: {
      fr: 'Diminuer de 40 %, c’est multiplier par 1 − 0,40 ; augmenter de 5 %, c’est multiplier par 1 + 0,05. La flèche du bas, c’est le produit des deux coefficients.',
      it: 'Diminuire del 40% vuol dire moltiplicare per 1 − 0,40; aumentare del 5% vuol dire moltiplicare per 1 + 0,05. La freccia in basso è il prodotto dei due coefficienti.'
    },
    sol: {
      fr: '<ol><li>Diminuer de 40 % revient à multiplier par 1 − 0,4 = 0,6 : première flèche « × 0,6 ».</li>' +
          '<li>Augmenter de 5 % revient à multiplier par 1 + 0,05 = 1,05 : deuxième flèche « × 1,05 ».</li>' +
          '<li>Flèche du bas : on multiplie les coefficients, C = 0,6 × 1,05 = 0,63.</li></ol>' +
          '<p>Coefficient multiplicateur global : <b>0,63</b> (flèche du bas « × 0,63 »).</p>',
      it: '<ol><li>Diminuire del 40% vuol dire moltiplicare per 1 − 0,4 = 0,6: prima freccia «× 0,6».</li>' +
          '<li>Aumentare del 5% vuol dire moltiplicare per 1 + 0,05 = 1,05: seconda freccia «× 1,05».</li>' +
          '<li>Freccia in basso: si moltiplicano i coefficienti, C = 0,6 × 1,05 = 0,63.</li></ol>' +
          '<p>Coefficiente moltiplicativo globale: <b>0,63</b> (freccia in basso «× 0,63»).</p>'
    }
  }, {
    q: {
      fr: 'Schéma b. Calculer en une seule étape la valeur masquée par le point d’interrogation.',
      it: 'Schema b. Calcola in un solo passaggio il valore nascosto dal punto interrogativo a destra.'
    },
    kind: 'num',
    label: { fr: 'Valeur masquée', it: 'Valore nascosto' }, unit: '', ans: 252, tol: 0.01, sign: 'strict',
    traps: [
      { v: 260,
        fr: 'Tu as utilisé 0,65 (addition des taux : −40 % + 5 %). Utilise le coefficient global 0,6 × 1,05.',
        it: 'Hai usato 0,65 (somma dei tassi: −40% + 5%). Usa il coefficiente globale 0,6 × 1,05.' },
      { v: 240,
        fr: '240 est la valeur de la bulle du milieu (après la première flèche seulement). Va jusqu’au point d’interrogation de droite.',
        it: '240 è il valore della bolla in mezzo (solo dopo la prima freccia). Arriva fino al punto interrogativo a destra.' }
    ],
    hint: {
      fr: 'En une seule étape : multiplie 400 par le coefficient global de la question précédente.',
      it: 'In un solo passaggio: moltiplica 400 per il coefficiente globale della domanda precedente.'
    },
    sol: {
      fr: '<ol><li>En une seule étape : 400 × 0,63 = 252.</li>' +
          '<li>Vérification en deux étapes : 400 × 0,6 = 240 (bulle du milieu), puis 240 × 1,05 = 252.</li></ol>' +
          '<p>La valeur masquée par le point d’interrogation est <b>252</b>.</p>',
      it: '<ol><li>In un solo passaggio: 400 × 0,63 = 252.</li>' +
          '<li>Verifica in due passaggi: 400 × 0,6 = 240 (bolla in mezzo), poi 240 × 1,05 = 252.</li></ol>' +
          '<p>Il valore nascosto dal punto interrogativo è <b>252</b>.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex121', group: 'succ', num: '121', page: 311, stars: 2,
  tag: { fr: 'PYTHON', it: 'PYTHON' },
  title: { fr: 'Comprendre un programme', it: 'Capire un programma' },
  text: {
    fr: '<p>On donne ci-dessous le programme Python d’une fonction mystere.</p>' +
        '<pre class="code">def mystere(t, u):\n    c = (1 + t) * (1 + u)\n    v = c - 1\n    return c, v</pre>',
    it: '<p>Qui sotto c’è il programma Python di una funzione chiamata mystere («mistero» in francese).</p>' +
        '<pre class="code">def mystere(t, u):\n    c = (1 + t) * (1 + u)\n    v = c - 1\n    return c, v</pre>'
  },
  parts: [{
    q: {
      fr: 'Quelles sont les valeurs renvoyées par mystere(0.2, -0.4) ? Donner d’abord la valeur de c.',
      it: 'Quali sono i valori restituiti da mystere(0.2, -0.4)? Scrivi prima il valore di c.'
    },
    kind: 'num',
    label: { fr: 'Valeur de c', it: 'Valore di c' }, unit: '', ans: 0.72, tol: 0.00005, sign: 'strict',
    traps: [
      { v: 0.8,
        fr: 'Tu as additionné : 1 + 0,2 − 0,4. Le programme multiplie (le signe * veut dire ×) : (1 + t) × (1 + u).',
        it: 'Hai sommato: 1 + 0,2 − 0,4. Il programma moltiplica (il segno * vuol dire ×): (1 + t) × (1 + u).' },
      { v: -0.08,
        fr: 'Tu as multiplié t et u. Le programme multiplie (1 + t) et (1 + u).',
        it: 'Hai moltiplicato t e u. Il programma moltiplica (1 + t) e (1 + u).' }
    ],
    hint: {
      fr: 'Dans la ligne c = (1 + t) * (1 + u), remplace t par 0,2 et u par −0,4. En Python, * veut dire ×.',
      it: 'Nella riga c = (1 + t) * (1 + u), sostituisci t con 0,2 e u con −0,4. In Python, * vuol dire ×.'
    },
    sol: {
      fr: '<ol><li>Avec t = 0,2 et u = −0,4 : c = (1 + 0,2) × (1 − 0,4).</li>' +
          '<li>c = 1,2 × 0,6 = 0,72.</li></ol>' +
          '<p>La fonction renvoie <b>c = 0,72</b>.</p>',
      it: '<ol><li>Con t = 0,2 e u = −0,4: c = (1 + 0,2) × (1 − 0,4).</li>' +
          '<li>c = 1,2 × 0,6 = 0,72.</li></ol>' +
          '<p>La funzione restituisce <b>c = 0,72</b>.</p>'
    }
  }, {
    q: {
      fr: 'Quelle est la valeur de v renvoyée par mystere(0.2, -0.4) ?',
      it: 'Qual è il valore di v restituito da mystere(0.2, -0.4)?'
    },
    kind: 'num',
    label: { fr: 'Valeur de v', it: 'Valore di v' }, unit: '', ans: -0.28, tol: 0.00005, sign: 'strict',
    traps: [
      { v: 0.72,
        fr: '0,72 est la valeur de c. Regarde la ligne suivante : v = c - 1.',
        it: '0,72 è il valore di c. Guarda la riga dopo: v = c - 1.' },
      { v: -0.2,
        fr: 'Tu as additionné t et u. Le programme calcule v = c − 1, avec c = 0,72.',
        it: 'Hai sommato t e u. Il programma calcola v = c − 1, con c = 0,72.' }
    ],
    hint: {
      fr: 'Regarde la ligne v = c - 1 et utilise la valeur de c que tu viens de trouver.',
      it: 'Guarda la riga v = c - 1 e usa il valore di c che hai appena trovato.'
    },
    sol: {
      fr: '<ol><li>v = c − 1 = 0,72 − 1 = −0,28.</li></ol>' +
          '<p>La fonction renvoie <b>v = −0,28</b> : une hausse de 20 % puis une baisse de 40 % donnent une baisse globale de 28 %.</p>',
      it: '<ol><li>v = c − 1 = 0,72 − 1 = −0,28.</li></ol>' +
          '<p>La funzione restituisce <b>v = −0,28</b>: un aumento del 20% e poi un calo del 40% danno un calo globale del 28%.</p>'
    }
  }, {
    q: {
      fr: 'Si t et u sont des taux d’évolution, que permet de calculer cette fonction ?',
      it: 'Se t e u sono tassi di variazione, che cosa permette di calcolare questa funzione?'
    },
    kind: 'choice',
    choices: [
      { fr: 'La somme des deux taux t et u', it: 'La somma dei due tassi t e u' },
      { fr: 'Le coefficient multiplicateur global c et le taux d’évolution global v de deux évolutions successives de taux t et u',
        it: 'Il coefficiente moltiplicativo globale c e il tasso di variazione globale v di due variazioni successive di tassi t e u' },
      { fr: 'Le taux d’évolution réciproque de t et celui de u', it: 'Il tasso di variazione reciproco di t e quello di u' }
    ],
    correct: 1,
    hint: {
      fr: '1 + t et 1 + u sont des coefficients multiplicateurs. La fonction les multiplie, puis enlève 1. D’après le cours, qu’obtient-on ?',
      it: '1 + t e 1 + u sono coefficienti moltiplicativi. La funzione li moltiplica, poi toglie 1. Secondo la lezione, che cosa si ottiene?'
    },
    sol: {
      fr: '<ol><li>1 + t et 1 + u sont les coefficients multiplicateurs de deux évolutions successives de taux t et u.</li>' +
          '<li>c = (1 + t) × (1 + u) est leur produit : c’est le coefficient multiplicateur global.</li>' +
          '<li>v = c − 1 : c’est le taux d’évolution global (T = C − 1).</li></ol>' +
          '<p>La fonction calcule <b>le coefficient multiplicateur global c et le taux d’évolution global v</b> de deux évolutions successives de taux t et u.</p>',
      it: '<ol><li>1 + t e 1 + u sono i coefficienti moltiplicativi di due variazioni successive di tassi t e u.</li>' +
          '<li>c = (1 + t) × (1 + u) è il loro prodotto: è il coefficiente moltiplicativo globale.</li>' +
          '<li>v = c − 1: è il tasso di variazione globale (T = C − 1).</li></ol>' +
          '<p>La funzione calcola <b>il coefficiente moltiplicativo globale c e il tasso di variazione globale v</b> di due variazioni successive di tassi t e u.</p>'
    }
  }, {
    q: {
      fr: 'Programmer cette fonction sur un ordinateur ou une calculatrice, puis tester l’appel mystere(1, 0.2). Quelle est la valeur de v ?',
      it: 'Programma questa funzione su un computer o su una calcolatrice, poi prova la chiamata mystere(1, 0.2). Qual è il valore di v?'
    },
    kind: 'num',
    label: { fr: 'Valeur de v', it: 'Valore di v' }, unit: '', ans: 1.4, tol: 0.00005, sign: 'strict',
    traps: [
      { v: 2.4,
        fr: '2,4 est la valeur de c. Le programme renvoie aussi v = c − 1.',
        it: '2,4 è il valore di c. Il programma restituisce anche v = c − 1.' },
      { v: 1.2,
        fr: 'Tu as additionné t et u (1 + 0,2). Calcule d’abord c = (1 + 1) × (1 + 0,2), puis v = c − 1.',
        it: 'Hai sommato t e u (1 + 0,2). Calcola prima c = (1 + 1) × (1 + 0,2), poi v = c − 1.' }
    ],
    hint: {
      fr: 'Sans ordinateur, tu peux le faire à la main : c = (1 + 1) × (1 + 0,2), puis v = c − 1.',
      it: 'Senza computer puoi farlo a mano: c = (1 + 1) × (1 + 0,2), poi v = c − 1.'
    },
    sol: {
      fr: '<ol><li>c = (1 + 1) × (1 + 0,2) = 2 × 1,2 = 2,4.</li>' +
          '<li>v = c − 1 = 2,4 − 1 = 1,4.</li></ol>' +
          '<p>mystere(1, 0.2) renvoie c = 2,4 et <b>v = 1,4</b> : une hausse de 100 % puis une hausse de 20 % donnent une hausse globale de 140 %.</p>',
      it: '<ol><li>c = (1 + 1) × (1 + 0,2) = 2 × 1,2 = 2,4.</li>' +
          '<li>v = c − 1 = 2,4 − 1 = 1,4.</li></ol>' +
          '<p>mystere(1, 0.2) restituisce c = 2,4 e <b>v = 1,4</b>: un aumento del 100% e poi un aumento del 20% danno un aumento globale del 140%.</p>'
    }
  }, {
    q: {
      fr: 'Tester ensuite l’appel mystere(-0.75, -0.25). Quelle est la valeur de v ?',
      it: 'Poi prova la chiamata mystere(-0.75, -0.25). Qual è il valore di v?'
    },
    kind: 'num',
    label: { fr: 'Valeur de v', it: 'Valore di v' }, unit: '', ans: -0.8125, tol: 0.00005, sign: 'strict',
    traps: [
      { v: 0.1875,
        fr: '0,1875 est la valeur de c. Le programme renvoie aussi v = c − 1.',
        it: '0,1875 è il valore di c. Il programma restituisce anche v = c − 1.' },
      { v: -1,
        fr: 'Tu as additionné t et u (−0,75 − 0,25 = −1). Calcule d’abord c = (1 − 0,75) × (1 − 0,25), puis v = c − 1.',
        it: 'Hai sommato t e u (−0,75 − 0,25 = −1). Calcola prima c = (1 − 0,75) × (1 − 0,25), poi v = c − 1.' }
    ],
    hint: {
      fr: 'À la main : c = (1 − 0,75) × (1 − 0,25), puis v = c − 1.',
      it: 'A mano: c = (1 − 0,75) × (1 − 0,25), poi v = c − 1.'
    },
    sol: {
      fr: '<ol><li>c = (1 − 0,75) × (1 − 0,25) = 0,25 × 0,75 = 0,1875.</li>' +
          '<li>v = c − 1 = 0,1875 − 1 = −0,8125.</li></ol>' +
          '<p>mystere(-0.75, -0.25) renvoie c = 0,1875 et <b>v = −0,8125</b> : une baisse de 75 % puis une baisse de 25 % donnent une baisse globale de 81,25 % (et non de 100 %).</p>',
      it: '<ol><li>c = (1 − 0,75) × (1 − 0,25) = 0,25 × 0,75 = 0,1875.</li>' +
          '<li>v = c − 1 = 0,1875 − 1 = −0,8125.</li></ol>' +
          '<p>mystere(-0.75, -0.25) restituisce c = 0,1875 e <b>v = −0,8125</b>: un calo del 75% e poi un calo del 25% danno un calo globale dell’81,25% (e non del 100%).</p>'
    }
  }]
});

EXOS.push({
  id: 'ex122', group: 'succ', num: '122', page: 311, stars: 2,
  tag: { fr: 'LOGIQUE', it: 'LOGICA' },
  title: { fr: 'Deux hausses successives', it: 'Due aumenti successivi' },
  text: {
    fr: '<p>On considère la proposition « Si une quantité subit deux hausses successives, alors cette quantité augmente. »</p>',
    it: '<p>Considera la proposizione: «Se una quantità subisce due aumenti successivi, allora questa quantità aumenta.»</p>'
  },
  parts: [{
    q: { fr: 'Cette proposition est-elle vraie ?', it: 'Questa proposizione è vera?' },
    kind: 'choice',
    choices: [{ fr: 'Oui, elle est vraie', it: 'Sì, è vera' }, { fr: 'Non, elle est fausse', it: 'No, è falsa' }],
    correct: 0,
    hint: {
      fr: 'Une hausse correspond à un coefficient multiplicateur plus grand que 1. Que donne le produit de deux nombres plus grands que 1 ?',
      it: 'Un aumento corrisponde a un coefficiente moltiplicativo più grande di 1. Che cosa dà il prodotto di due numeri più grandi di 1?'
    },
    sol: {
      fr: '<ol><li>Une hausse de taux t (t positif) correspond à un coefficient 1 + t plus grand que 1.</li>' +
          '<li>Pour deux hausses, le coefficient global est le produit de deux nombres plus grands que 1 : il est plus grand que 1 (exemple : 1,1 × 1,2 = 1,32).</li>' +
          '<li>Un coefficient global plus grand que 1 correspond à une augmentation.</li></ol>' +
          '<p>La proposition est <b>vraie</b>.</p>',
      it: '<ol><li>Un aumento di tasso t (t positivo) corrisponde a un coefficiente 1 + t più grande di 1.</li>' +
          '<li>Con due aumenti, il coefficiente globale è il prodotto di due numeri più grandi di 1: è più grande di 1 (esempio: 1,1 × 1,2 = 1,32).</li>' +
          '<li>Un coefficiente globale più grande di 1 corrisponde a un aumento.</li></ol>' +
          '<p>La proposizione è <b>vera</b>.</p>'
    }
  }, {
    q: {
      fr: 'Écrire la proposition réciproque. Cette réciproque est-elle vraie ? (Réciproque : « Si une quantité augmente, alors elle a subi deux hausses successives. »)',
      it: 'Scrivi la proposizione reciproca. Questa reciproca è vera? (Reciproca: «Se una quantità aumenta, allora ha subito due aumenti successivi.»)'
    },
    kind: 'choice',
    choices: [{ fr: 'Oui, elle est vraie', it: 'Sì, è vera' }, { fr: 'Non, elle est fausse', it: 'No, è falsa' }],
    correct: 1,
    hint: {
      fr: 'Pour montrer qu’une proposition est fausse, un seul contre-exemple suffit. Essaie une forte hausse suivie d’une petite baisse, par exemple +50 % puis −10 % : la quantité augmente-t-elle ?',
      it: 'Per dimostrare che una proposizione è falsa basta un solo controesempio. Prova un grande aumento seguito da un piccolo calo, per esempio +50% e poi −10%: la quantità aumenta?'
    },
    sol: {
      fr: '<ol><li>Pour écrire la réciproque, on échange les deux parties : « Si une quantité augmente, alors elle a subi deux hausses successives. »</li>' +
          '<li>Contre-exemple : une hausse de 50 % puis une baisse de 10 %. C = 1,5 × 0,9 = 1,35.</li>' +
          '<li>C est plus grand que 1 : la quantité augmente (de 35 %), mais elle a subi une hausse et une baisse, pas deux hausses.</li></ol>' +
          '<p>La réciproque est <b>fausse</b>.</p>',
      it: '<ol><li>Per scrivere la reciproca si scambiano le due parti: «Se una quantità aumenta, allora ha subito due aumenti successivi.»</li>' +
          '<li>Controesempio: un aumento del 50% e poi un calo del 10%. C = 1,5 × 0,9 = 1,35.</li>' +
          '<li>C è più grande di 1: la quantità aumenta (del 35%), ma ha subito un aumento e un calo, non due aumenti.</li></ol>' +
          '<p>La reciproca è <b>falsa</b>.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex123', group: 'succ', num: '123', page: 311, stars: 2,
  title: { fr: 'Une question ouverte', it: 'Una domanda aperta' },
  text: {
    fr: '<p>La longueur des côtés d’un carré augmente de 20 %.</p>',
    it: '<p>La lunghezza dei lati di un quadrato aumenta del 20%.</p>'
  },
  parts: [{
    q: { fr: 'De quel pourcentage augmente l’aire de ce carré ?', it: 'Di quale percentuale aumenta l’area di questo quadrato?' },
    kind: 'num',
    label: { fr: 'Hausse de l’aire', it: 'Aumento dell’area' }, unit: '%', ans: 44, tol: 0.005, sign: 'abs',
    traps: [
      { v: 40,
        fr: 'Tu as fait 20 % + 20 %. Les taux ne s’additionnent pas : l’aire est multipliée par 1,2 × 1,2.',
        it: 'Hai fatto 20% + 20%. I tassi non si sommano: l’area viene moltiplicata per 1,2 × 1,2.' },
      { v: 20,
        fr: '20 %, c’est la hausse du côté. Mais l’aire, c’est côté × côté : les deux côtés sont multipliés par 1,2.',
        it: 'Il 20% è l’aumento del lato. Ma l’area è lato × lato: tutti e due i lati vengono moltiplicati per 1,2.' },
      { v: 4,
        fr: 'Tu as calculé 0,2 × 0,2. Il faut multiplier les coefficients multiplicateurs : 1,2 × 1,2.',
        it: 'Hai calcolato 0,2 × 0,2. Bisogna moltiplicare i coefficienti moltiplicativi: 1,2 × 1,2.' }
    ],
    hint: {
      fr: 'Essaie avec un carré de côté 10 cm : son aire est 10 × 10 = 100 cm². Le nouveau côté mesure 10 × 1,2 = 12 cm. Calcule la nouvelle aire et compare-la à 100.',
      it: 'Prova con un quadrato di lato 10 cm: la sua area è 10 × 10 = 100 cm². Il nuovo lato misura 10 × 1,2 = 12 cm. Calcola la nuova area e confrontala con 100.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 20 %, c’est multiplier par 1,2 : si le côté mesure c, le nouveau côté mesure 1,2 × c.</li>' +
          '<li>Nouvelle aire : (1,2 × c) × (1,2 × c) = 1,44 × c × c. L’aire est multipliée par 1,2 × 1,2 = 1,44.</li>' +
          '<li>Taux : T = 1,44 − 1 = 0,44 = 44 %.</li></ol>' +
          '<p>L’aire augmente de <b>44 %</b> (et non de 20 % ni de 40 %). Exemple : côté 10 cm, aire 100 cm² ; côté 12 cm, aire 144 cm².</p>',
      it: '<ol><li>Aumentare del 20% vuol dire moltiplicare per 1,2: se il lato misura c, il nuovo lato misura 1,2 × c.</li>' +
          '<li>Nuova area: (1,2 × c) × (1,2 × c) = 1,44 × c × c. L’area viene moltiplicata per 1,2 × 1,2 = 1,44.</li>' +
          '<li>Tasso: T = 1,44 − 1 = 0,44 = 44%.</li></ol>' +
          '<p>L’area aumenta del <b>44%</b> (e non del 20% né del 40%). Esempio: lato 10 cm, area 100 cm²; lato 12 cm, area 144 cm².</p>'
    }
  }, {
    q: { fr: 'De quel pourcentage augmente la longueur des diagonales de ce carré ?', it: 'Di quale percentuale aumenta la lunghezza delle diagonali di questo quadrato?' },
    kind: 'num',
    label: { fr: 'Hausse des diagonales', it: 'Aumento delle diagonali' }, unit: '%', ans: 20, tol: 0.005, sign: 'abs',
    traps: [
      { v: 44,
        fr: '44 %, c’est pour l’aire (côté × côté). La diagonale est une longueur, comme le côté.',
        it: 'Il 44% vale per l’area (lato × lato). La diagonale è una lunghezza, come il lato.' },
      { v: 41.42,
        fr: '√2 ≈ 1,414 relie la diagonale et le côté d’un même carré. Ici, on compare l’ancienne et la nouvelle diagonale.',
        it: '√2 ≈ 1,414 collega la diagonale e il lato di uno stesso quadrato. Qui si confrontano la vecchia e la nuova diagonale.' }
    ],
    hint: {
      fr: 'Dans un carré, diagonale = côté × √2. Si le côté est multiplié par 1,2, par combien la diagonale est-elle multipliée ?',
      it: 'In un quadrato, diagonale = lato × √2. Se il lato viene moltiplicato per 1,2, per quanto viene moltiplicata la diagonale?'
    },
    sol: {
      fr: '<ol><li>Dans un carré de côté c, la diagonale mesure d = c × √2.</li>' +
          '<li>Nouveau côté : 1,2 × c. Nouvelle diagonale : 1,2 × c × √2 = 1,2 × d.</li>' +
          '<li>La diagonale est multipliée par 1,2 : T = 1,2 − 1 = 0,2 = 20 %.</li></ol>' +
          '<p>Les diagonales augmentent de <b>20 %</b>, comme les côtés.</p>',
      it: '<ol><li>In un quadrato di lato c, la diagonale misura d = c × √2.</li>' +
          '<li>Nuovo lato: 1,2 × c. Nuova diagonale: 1,2 × c × √2 = 1,2 × d.</li>' +
          '<li>La diagonale viene moltiplicata per 1,2: T = 1,2 − 1 = 0,2 = 20%.</li></ol>' +
          '<p>Le diagonali aumentano del <b>20%</b>, come i lati.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex124', group: 'succ', num: '124', page: 311, stars: 1,
  title: { fr: 'Population d’un village', it: 'La popolazione di un villaggio' },
  text: {
    fr: '<p>Un village comptait 700 habitants en 2018. Suite à la fermeture d’une usine en 2020, 8 % des habitants du village sont partis. Heureusement, avec l’arrivée du TGV en 2022, le maire prévoit une augmentation de 25 % de la population.</p>',
    it: '<p>Un villaggio contava 700 abitanti nel 2018. Dopo la chiusura di una fabbrica nel 2020, l’8% degli abitanti del villaggio se n’è andato. Per fortuna, con l’arrivo del TGV (il treno ad alta velocità) nel 2022, il sindaco prevede un aumento del 25% della popolazione.</p>'
  },
  parts: [{
    q: { fr: 'Calculer le coefficient multiplicateur global.', it: 'Calcola il coefficiente moltiplicativo globale.' },
    kind: 'num',
    label: { fr: 'Coefficient global', it: 'Coefficiente globale' }, unit: '', ans: 1.15, tol: 0.00005, sign: 'strict',
    traps: [
      { v: 1.17,
        fr: 'Tu as additionné les taux (−8 % + 25 % = 17 %). Les taux ne s’additionnent pas : multiplie les deux coefficients.',
        it: 'Hai sommato i tassi (−8% + 25% = 17%). I tassi non si sommano: moltiplica i due coefficienti.' },
      { v: 1.35,
        fr: '8 % des habitants sont partis : c’est une baisse, donc le coefficient est 1 − 0,08 et non 1,08.',
        it: 'L’8% degli abitanti se n’è andato: è un calo, quindi il coefficiente è 1 − 0,08 e non 1,08.' },
      { v: -0.02,
        fr: 'Tu as multiplié les taux (−0,08 × 0,25). Il faut multiplier les coefficients multiplicateurs 1 + t.',
        it: 'Hai moltiplicato i tassi (−0,08 × 0,25). Bisogna moltiplicare i coefficienti moltiplicativi 1 + t.' }
    ],
    hint: {
      fr: '8 % des habitants partent : c’est une baisse de 8 %, on multiplie par 1 − 0,08. Une hausse de 25 % : on multiplie par 1,25. Multiplie ces deux coefficients.',
      it: 'L’8% degli abitanti se ne va: è un calo dell’8%, si moltiplica per 1 − 0,08. Un aumento del 25%: si moltiplica per 1,25. Moltiplica questi due coefficienti.'
    },
    sol: {
      fr: '<ol><li>Départ de 8 % des habitants : baisse de 8 %, coefficient 1 − 0,08 = 0,92.</li>' +
          '<li>Augmentation de 25 % : coefficient 1 + 0,25 = 1,25.</li>' +
          '<li>Coefficient multiplicateur global : C = 0,92 × 1,25 = 1,15.</li></ol>' +
          '<p>Le coefficient multiplicateur global est <b>1,15</b> (soit une hausse globale de 15 %).</p>',
      it: '<ol><li>Se ne va l’8% degli abitanti: calo dell’8%, coefficiente 1 − 0,08 = 0,92.</li>' +
          '<li>Aumento del 25%: coefficiente 1 + 0,25 = 1,25.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 0,92 × 1,25 = 1,15.</li></ol>' +
          '<p>Il coefficiente moltiplicativo globale è <b>1,15</b> (cioè un aumento globale del 15%).</p>'
    }
  }, {
    q: { fr: 'En déduire le nombre prévisible d’habitants en 2022.', it: 'Deduci il numero previsto di abitanti nel 2022.' },
    kind: 'num',
    label: { fr: 'Habitants en 2022', it: 'Abitanti nel 2022' }, unit: 'habitants', ans: 805, tol: 0.01, sign: 'strict',
    traps: [
      { v: 819,
        fr: 'Tu as utilisé 1,17 (addition des taux). Utilise le coefficient global de la question 1 : 0,92 × 1,25.',
        it: 'Hai usato 1,17 (somma dei tassi). Usa il coefficiente globale della domanda 1: 0,92 × 1,25.' },
      { v: 644,
        fr: '644, c’est le nombre d’habitants en 2020, après le départ de 8 %. Il manque la hausse de 25 %.',
        it: '644 è il numero di abitanti nel 2020, dopo la partenza dell’8%. Manca l’aumento del 25%.' }
    ],
    hint: {
      fr: 'Multiplie le nombre d’habitants de 2018 par le coefficient global trouvé à la question 1.',
      it: 'Moltiplica il numero di abitanti del 2018 per il coefficiente globale trovato nella domanda 1.'
    },
    sol: {
      fr: '<ol><li>Valeur finale = valeur initiale × C.</li>' +
          '<li>700 × 1,15 = 805.</li>' +
          '<li>Vérification en deux étapes : 700 × 0,92 = 644 habitants en 2020, puis 644 × 1,25 = 805.</li></ol>' +
          '<p>On peut prévoir <b>805 habitants</b> en 2022.</p>',
      it: '<ol><li>Valore finale = valore iniziale × C.</li>' +
          '<li>700 × 1,15 = 805.</li>' +
          '<li>Verifica in due passaggi: 700 × 0,92 = 644 abitanti nel 2020, poi 644 × 1,25 = 805.</li></ol>' +
          '<p>Si possono prevedere <b>805 abitanti</b> nel 2022.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex125', group: 'succ', num: '125', page: 311, stars: 1,
  title: { fr: 'Une caméra soldée', it: 'Una videocamera in saldo' },
  text: {
    fr: '<p>Une caméra « sport » au prix de 320 € est soldée de 12 %. Une carte de fidélité permet d’avoir 10 % de remise supplémentaire.</p>',
    it: '<p>Una videocamera «sport» al prezzo di 320 € è in saldo con uno sconto del 12%. Una carta fedeltà permette di avere un ulteriore sconto del 10%.</p>'
  },
  parts: [{
    q: { fr: 'Calculer le coefficient multiplicateur global.', it: 'Calcola il coefficiente moltiplicativo globale.' },
    kind: 'num',
    label: { fr: 'Coefficient global', it: 'Coefficiente globale' }, unit: '', ans: 0.792, tol: 0.00005, sign: 'strict',
    traps: [
      { v: 0.78,
        fr: 'Tu as additionné les remises (12 % + 10 % = 22 %). Les remises ne s’additionnent pas : multiplie les deux coefficients.',
        it: 'Hai sommato gli sconti (12% + 10% = 22%). Gli sconti non si sommano: moltiplica i due coefficienti.' },
      { v: 0.012,
        fr: 'Tu as multiplié les taux (0,12 × 0,1). Pour une remise, les coefficients sont 1 − 0,12 et 1 − 0,1.',
        it: 'Hai moltiplicato i tassi (0,12 × 0,1). Per uno sconto, i coefficienti sono 1 − 0,12 e 1 − 0,1.' }
    ],
    hint: {
      fr: 'Une remise de 12 % : on multiplie par 1 − 0,12. Une remise de 10 % : on multiplie par 1 − 0,10. Multiplie ces deux coefficients.',
      it: 'Uno sconto del 12%: si moltiplica per 1 − 0,12. Uno sconto del 10%: si moltiplica per 1 − 0,10. Moltiplica questi due coefficienti.'
    },
    sol: {
      fr: '<ol><li>Solde de 12 % : coefficient 1 − 0,12 = 0,88.</li>' +
          '<li>Remise de 10 % : coefficient 1 − 0,1 = 0,9.</li>' +
          '<li>Coefficient multiplicateur global : C = 0,88 × 0,9 = 0,792.</li></ol>' +
          '<p>Le coefficient multiplicateur global est <b>0,792</b> (soit une baisse globale de 20,8 %, et non de 22 %).</p>',
      it: '<ol><li>Saldo del 12%: coefficiente 1 − 0,12 = 0,88.</li>' +
          '<li>Sconto del 10%: coefficiente 1 − 0,1 = 0,9.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 0,88 × 0,9 = 0,792.</li></ol>' +
          '<p>Il coefficiente moltiplicativo globale è <b>0,792</b> (cioè un calo globale del 20,8%, e non del 22%).</p>'
    }
  }, {
    q: { fr: 'En déduire le prix de cette caméra après ces remises.', it: 'Deduci il prezzo di questa videocamera dopo questi sconti.' },
    kind: 'num',
    label: { fr: 'Prix final', it: 'Prezzo finale' }, unit: '€', ans: 253.44, tol: 0.005, sign: 'strict',
    traps: [
      { v: 249.6,
        fr: 'Tu as utilisé une remise de 22 % (12 % + 10 %). Utilise le coefficient global de la question 1.',
        it: 'Hai usato uno sconto del 22% (12% + 10%). Usa il coefficiente globale della domanda 1.' },
      { v: 281.6,
        fr: '281,6 €, c’est le prix après la première remise seulement. Il manque la remise de 10 % de la carte de fidélité.',
        it: '281,6 € è il prezzo solo dopo il primo sconto. Manca lo sconto del 10% della carta fedeltà.' }
    ],
    hint: {
      fr: 'Multiplie le prix de départ (320 €) par le coefficient global trouvé à la question 1.',
      it: 'Moltiplica il prezzo di partenza (320 €) per il coefficiente globale trovato nella domanda 1.'
    },
    sol: {
      fr: '<ol><li>Prix final = prix de départ × C.</li>' +
          '<li>320 × 0,792 = 253,44.</li>' +
          '<li>Vérification en deux étapes : 320 × 0,88 = 281,6, puis 281,6 × 0,9 = 253,44.</li></ol>' +
          '<p>Après les deux remises, la caméra coûte <b>253,44 €</b>.</p>',
      it: '<ol><li>Prezzo finale = prezzo di partenza × C.</li>' +
          '<li>320 × 0,792 = 253,44.</li>' +
          '<li>Verifica in due passaggi: 320 × 0,88 = 281,6, poi 281,6 × 0,9 = 253,44.</li></ol>' +
          '<p>Dopo i due sconti, la videocamera costa <b>253,44 €</b>.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex126', group: 'succ', num: '126', page: 311, stars: 2,
  title: { fr: 'Le livret A', it: 'Il libretto di risparmio' },
  text: {
    fr: '<p>En 2023, le taux d’intérêt du livret A est 3 % par an.</p>',
    it: '<p>Nel 2023, il tasso di interesse del Livret A (un libretto di risparmio francese) è del 3% all’anno.</p>'
  },
  parts: [{
    q: {
      fr: 'Le 1<sup>er</sup> janvier 2023, Zohra place 12 000 € sur un livret A. Combien y aura-t-il sur ce compte en 2024 ?',
      it: 'Il 1° gennaio 2023, Zohra mette 12 000 € su un Livret A. Quanto avrà su questo conto nel 2024?'
    },
    kind: 'num',
    label: { fr: 'Somme en 2024', it: 'Somma nel 2024' }, unit: '€', ans: 12360, tol: 0.01, sign: 'strict',
    traps: [
      { v: 360,
        fr: '360 €, ce sont seulement les intérêts. On demande la somme sur le compte : 12 000 € + les intérêts.',
        it: '360 € sono solo gli interessi. Si chiede la somma sul conto: 12 000 € + gli interessi.' },
      { v: 15600,
        fr: 'Attention : 3 % = 0,03. On multiplie donc par 1 + 0,03 = 1,03 (et non par 1,3).',
        it: 'Attenzione: 3% = 0,03. Quindi si moltiplica per 1 + 0,03 = 1,03 (e non per 1,3).' }
    ],
    hint: {
      fr: 'Augmenter de 3 %, c’est multiplier par 1 + 0,03. Entre 2023 et 2024, une année est passée.',
      it: 'Aumentare del 3% vuol dire moltiplicare per 1 + 0,03. Tra il 2023 e il 2024 è passato un anno.'
    },
    sol: {
      fr: '<ol><li>Chaque année, la somme augmente de 3 % : elle est multipliée par 1,03.</li>' +
          '<li>Du 1<sup>er</sup> janvier 2023 au 1<sup>er</sup> janvier 2024 : une année.</li>' +
          '<li>12 000 × 1,03 = 12 360.</li></ol>' +
          '<p>En 2024, Zohra aura <b>12 360 €</b> sur son livret A.</p>',
      it: '<ol><li>Ogni anno la somma aumenta del 3%: viene moltiplicata per 1,03.</li>' +
          '<li>Dal 1° gennaio 2023 al 1° gennaio 2024: un anno.</li>' +
          '<li>12 000 × 1,03 = 12 360.</li></ol>' +
          '<p>Nel 2024 Zohra avrà <b>12 360 €</b> sul suo Livret A.</p>'
    }
  }, {
    q: {
      fr: 'En supposant que ce taux reste constant et que Zohra n’ajoute pas d’argent sur ce livret, quelle somme, arrondie au centime, Zohra aura-t-elle sur ce compte en 2026 ?',
      it: 'Supponendo che questo tasso resti costante e che Zohra non aggiunga soldi su questo libretto, quale somma, arrotondata al centesimo, avrà Zohra su questo conto nel 2026?'
    },
    kind: 'num',
    label: { fr: 'Somme en 2026', it: 'Somma nel 2026' }, unit: '€', ans: 13112.72, tol: 0.006, sign: 'strict',
    traps: [
      { v: 13080,
        fr: 'Tu as ajouté 3 × 3 % = 9 %. Les taux ne s’additionnent pas : chaque année, la somme est multipliée par 1,03.',
        it: 'Hai aggiunto 3 × 3% = 9%. I tassi non si sommano: ogni anno la somma viene moltiplicata per 1,03.' },
      { v: 13506.11,
        fr: 'Tu as compté 4 années. De 2023 à 2026, il y a 3 années (2024, 2025 et 2026).',
        it: 'Hai contato 4 anni. Dal 2023 al 2026 ci sono 3 anni (2024, 2025 e 2026).' }
    ],
    hint: {
      fr: 'De 2023 à 2026, il y a 3 années : la somme est multipliée 3 fois de suite par 1,03.',
      it: 'Dal 2023 al 2026 ci sono 3 anni: la somma viene moltiplicata 3 volte di seguito per 1,03.'
    },
    sol: {
      fr: '<ol><li>De 2023 à 2026 : 3 années, donc 3 hausses successives de 3 %.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,03 × 1,03 × 1,03 = 1,03<sup>3</sup> = 1,092727.</li>' +
          '<li>12 000 × 1,092727 = 13 112,724 ≈ 13 112,72.</li></ol>' +
          '<p>En 2026, Zohra aura <b>13 112,72 €</b> (arrondi au centime).</p>',
      it: '<ol><li>Dal 2023 al 2026: 3 anni, quindi 3 aumenti successivi del 3%.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,03 × 1,03 × 1,03 = 1,03<sup>3</sup> = 1,092727.</li>' +
          '<li>12 000 × 1,092727 = 13 112,724 ≈ 13 112,72.</li></ol>' +
          '<p>Nel 2026 Zohra avrà <b>13 112,72 €</b> (arrotondato al centesimo).</p>'
    }
  }, {
    q: {
      fr: 'En 2030 ? Quelle somme, arrondie au centime, Zohra aura-t-elle sur ce compte ?',
      it: 'E nel 2030? Quale somma, arrotondata al centesimo, avrà Zohra su questo conto?'
    },
    kind: 'num',
    label: { fr: 'Somme en 2030', it: 'Somma nel 2030' }, unit: '€', ans: 14758.49, tol: 0.006, sign: 'strict',
    traps: [
      { v: 14520,
        fr: 'Tu as ajouté 7 × 3 % = 21 %. Les taux ne s’additionnent pas : il faut multiplier 7 fois de suite par 1,03.',
        it: 'Hai aggiunto 7 × 3% = 21%. I tassi non si sommano: bisogna moltiplicare 7 volte di seguito per 1,03.' },
      { v: 15201.24,
        fr: 'Tu as compté 8 années. De 2023 à 2030, il y a 7 années.',
        it: 'Hai contato 8 anni. Dal 2023 al 2030 ci sono 7 anni.' }
    ],
    hint: {
      fr: 'Compte les années de 2023 à 2030. Multiplie 12 000 par 1,03 autant de fois (touche puissance ^ de la calculatrice).',
      it: 'Conta gli anni dal 2023 al 2030. Moltiplica 12 000 per 1,03 lo stesso numero di volte (tasto potenza ^ della calcolatrice).'
    },
    sol: {
      fr: '<ol><li>De 2023 à 2030 : 7 années, donc 7 hausses successives de 3 %.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,03<sup>7</sup> ≈ 1,229874.</li>' +
          '<li>12 000 × 1,03<sup>7</sup> ≈ 14 758,486 ≈ 14 758,49.</li></ol>' +
          '<p>En 2030, Zohra aura <b>14 758,49 €</b> (arrondi au centime).</p>',
      it: '<ol><li>Dal 2023 al 2030: 7 anni, quindi 7 aumenti successivi del 3%.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,03<sup>7</sup> ≈ 1,229874.</li>' +
          '<li>12 000 × 1,03<sup>7</sup> ≈ 14 758,486 ≈ 14 758,49.</li></ol>' +
          '<p>Nel 2030 Zohra avrà <b>14 758,49 €</b> (arrotondato al centesimo).</p>'
    }
  }]
});

EXOS.push({
  id: 'ex151', group: 'succ', num: '151', page: 315, stars: 1,
  title: { fr: 'Une action en bourse', it: 'Un’azione in borsa' },
  text: {
    fr: '<p>Un jour donné, le cours d’une action cotée en bourse a augmenté de 25 % ; le lendemain, le cours de cette action a diminué de 20 %.</p>',
    it: '<p>Un certo giorno, la quotazione di un’azione in borsa (il suo valore) è aumentata del 25%; il giorno dopo, la quotazione di questa azione è diminuita del 20%.</p>'
  },
  parts: [{
    q: {
      fr: 'Quelle est l’évolution globale, sur ces deux jours, du cours de cette action ?',
      it: 'Qual è la variazione globale, in questi due giorni, della quotazione di questa azione?'
    },
    kind: 'num',
    label: { fr: 'Taux global', it: 'Tasso globale' }, unit: '%', ans: 0, tol: 0.005, sign: 'strict',
    traps: [
      { v: 5,
        fr: 'Tu as calculé 25 % − 20 %. Les taux ne s’additionnent pas : multiplie les coefficients 1,25 et 0,8.',
        it: 'Hai calcolato 25% − 20%. I tassi non si sommano: moltiplica i coefficienti 1,25 e 0,8.' },
      { v: 1,
        fr: '1 est le coefficient multiplicateur global C. Le taux global est T = C − 1.',
        it: '1 è il coefficiente moltiplicativo globale C. Il tasso globale è T = C − 1.' }
    ],
    hint: {
      fr: 'Augmenter de 25 % : multiplier par 1,25. Diminuer de 20 % : multiplier par 1 − 0,2. Multiplie ces coefficients, puis calcule T = C − 1.',
      it: 'Aumentare del 25%: moltiplicare per 1,25. Diminuire del 20%: moltiplicare per 1 − 0,2. Moltiplica questi coefficienti, poi calcola T = C − 1.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 25 % revient à multiplier par 1,25 ; diminuer de 20 % revient à multiplier par 0,8.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,25 × 0,8 = 1.</li>' +
          '<li>Taux global : T = C − 1 = 1 − 1 = 0 = 0 %.</li></ol>' +
          '<p>L’évolution globale est de <b>0 %</b> : le cours de l’action est revenu à sa valeur de départ. Le coefficient global est égal à 1, donc ces deux évolutions sont réciproques.</p>',
      it: '<ol><li>Aumentare del 25% vuol dire moltiplicare per 1,25; diminuire del 20% vuol dire moltiplicare per 0,8.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,25 × 0,8 = 1.</li>' +
          '<li>Tasso globale: T = C − 1 = 1 − 1 = 0 = 0%.</li></ol>' +
          '<p>La variazione globale è dello <b>0%</b>: la quotazione dell’azione è tornata al suo valore di partenza. Il coefficiente globale è uguale a 1, quindi queste due variazioni sono reciproche.</p>'
    }
  }]
});

EXOS.push({
  id: 'ex152', group: 'succ', num: '152', page: 315, stars: 2,
  title: { fr: 'Chiffre d’affaires mensuel', it: 'Il fatturato mensile' },
  text: {
    fr: '<p>Le tableau ci-dessous décrit l’évolution du chiffre d’affaires mensuel au cours du second trimestre 2023 d’une entreprise de service à la personne.</p>' +
        '<p>D’après ce tableau, le chiffre d’affaires de l’entreprise a augmenté de 4 % entre mars et avril.</p>' +
        '<div class="tw"><table class="bt">' +
        '<tr><th>Mois</th><td>mars</td><td>avril</td><td>mai</td><td>juin</td></tr>' +
        '<tr><th>Évolution d’un mois à l’autre</th><td></td><td>+4 %</td><td>+5 %</td><td>−20 %</td></tr>' +
        '</table></div>',
    it: '<p>La tabella qui sotto descrive la variazione del fatturato mensile (i soldi incassati ogni mese) di un’azienda di servizi alla persona, durante il secondo trimestre 2023.</p>' +
        '<p>Secondo questa tabella, il fatturato dell’azienda è aumentato del 4% tra marzo e aprile.</p>' +
        '<div class="tw"><table class="bt">' +
        '<tr><th>Mese</th><td>marzo</td><td>aprile</td><td>maggio</td><td>giugno</td></tr>' +
        '<tr><th>Variazione da un mese all’altro</th><td></td><td>+4%</td><td>+5%</td><td>−20%</td></tr>' +
        '</table></div>'
  },
  parts: [{
    q: {
      fr: 'Déterminer le pourcentage d’évolution du chiffre d’affaires mensuel de cette entreprise entre le mois de mars et le mois de mai.',
      it: 'Determina la percentuale di variazione del fatturato mensile di questa azienda tra il mese di marzo e il mese di maggio.'
    },
    kind: 'num',
    label: { fr: 'Taux global', it: 'Tasso globale' }, unit: '%', ans: 9.2, tol: 0.005, sign: 'strict',
    traps: [
      { v: 9,
        fr: 'Tu as additionné 4 % et 5 %. Les taux ne s’additionnent pas : multiplie les coefficients 1,04 et 1,05.',
        it: 'Hai sommato 4% e 5%. I tassi non si sommano: moltiplica i coefficienti 1,04 e 1,05.' },
      { v: 0.2,
        fr: 'Tu as multiplié les taux (0,04 × 0,05). Il faut multiplier les coefficients multiplicateurs 1 + t.',
        it: 'Hai moltiplicato i tassi (0,04 × 0,05). Bisogna moltiplicare i coefficienti moltiplicativi 1 + t.' }
    ],
    hint: {
      fr: 'De mars à mai, il y a deux évolutions : +4 % (avril) et +5 % (mai). Multiplie leurs coefficients, puis calcule T = C − 1.',
      it: 'Da marzo a maggio ci sono due variazioni: +4% (aprile) e +5% (maggio). Moltiplica i loro coefficienti, poi calcola T = C − 1.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 4 % revient à multiplier par 1,04 ; augmenter de 5 % revient à multiplier par 1,05.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,04 × 1,05 = 1,092.</li>' +
          '<li>Taux global : T = C − 1 = 1,092 − 1 = 0,092 = 9,2 %.</li></ol>' +
          '<p>Entre mars et mai, le chiffre d’affaires a augmenté de <b>9,2 %</b> (et non de 9 %).</p>',
      it: '<ol><li>Aumentare del 4% vuol dire moltiplicare per 1,04; aumentare del 5% vuol dire moltiplicare per 1,05.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,04 × 1,05 = 1,092.</li>' +
          '<li>Tasso globale: T = C − 1 = 1,092 − 1 = 0,092 = 9,2%.</li></ol>' +
          '<p>Tra marzo e maggio il fatturato è aumentato del <b>9,2%</b> (e non del 9%).</p>'
    }
  }, {
    q: {
      fr: 'Déterminer le pourcentage d’évolution du chiffre d’affaires mensuel de cette entreprise entre le mois de mars et le mois de juin.',
      it: 'Determina la percentuale di variazione del fatturato mensile di questa azienda tra il mese di marzo e il mese di giugno.'
    },
    kind: 'num',
    label: { fr: 'Taux global', it: 'Tasso globale' }, unit: '%', ans: -12.64, tol: 0.005, sign: 'strict',
    traps: [
      { v: -11,
        fr: 'Tu as additionné les taux (4 + 5 − 20 = −11). Les taux ne s’additionnent pas : multiplie les trois coefficients.',
        it: 'Hai sommato i tassi (4 + 5 − 20 = −11). I tassi non si sommano: moltiplica i tre coefficienti.' },
      { v: -10.8,
        fr: 'Tu as calculé 9,2 % − 20 %. Les taux ne s’additionnent pas : multiplie le coefficient 1,092 par 0,8.',
        it: 'Hai calcolato 9,2% − 20%. I tassi non si sommano: moltiplica il coefficiente 1,092 per 0,8.' },
      { v: 87.36,
        fr: '87,36 % correspond au coefficient C = 0,8736 : le chiffre d’affaires de juin vaut 87,36 % de celui de mars. Le taux est T = C − 1.',
        it: '87,36% corrisponde al coefficiente C = 0,8736: il fatturato di giugno è l’87,36% di quello di marzo. Il tasso è T = C − 1.' }
    ],
    hint: {
      fr: 'Reprends le coefficient de mars à mai (question 1) et multiplie-le par le coefficient de juin (baisse de 20 % : 1 − 0,2). Puis calcule T = C − 1.',
      it: 'Riprendi il coefficiente da marzo a maggio (domanda 1) e moltiplicalo per il coefficiente di giugno (calo del 20%: 1 − 0,2). Poi calcola T = C − 1.'
    },
    sol: {
      fr: '<ol><li>De mars à mai : coefficient 1,092 (question 1).</li>' +
          '<li>Diminuer de 20 % revient à multiplier par 0,8.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,092 × 0,8 = 0,8736.</li>' +
          '<li>Taux global : T = C − 1 = 0,8736 − 1 = −0,1264 = −12,64 %.</li></ol>' +
          '<p>Le taux d’évolution entre mars et juin est <b>−12,64 %</b> : le chiffre d’affaires a diminué de 12,64 %.</p>',
      it: '<ol><li>Da marzo a maggio: coefficiente 1,092 (domanda 1).</li>' +
          '<li>Diminuire del 20% vuol dire moltiplicare per 0,8.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,092 × 0,8 = 0,8736.</li>' +
          '<li>Tasso globale: T = C − 1 = 0,8736 − 1 = −0,1264 = −12,64%.</li></ol>' +
          '<p>Il tasso di variazione tra marzo e giugno è <b>−12,64%</b>: il fatturato è diminuito del 12,64%.</p>'
    }
  }]
});
