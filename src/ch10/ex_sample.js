EXOS.push({
  id: 'ex115', group: 'succ', num: '115', page: 311, stars: 1,
  title: { fr: 'Le prix du foie gras', it: 'Il prezzo del foie gras' },
  text: {
    fr: '<p>Suite à deux épisodes de grippe aviaire, le prix du foie gras augmente de 10 % puis de 20 %.</p>',
    it: '<p>Dopo due episodi di influenza aviaria, il prezzo del foie gras aumenta del 10% e poi del 20%.</p>'
  },
  parts: [{
    q: { fr: 'Calculer le taux d’évolution global du prix.', it: 'Calcola il tasso di variazione globale del prezzo.' },
    kind: 'num',
    label: { fr: 'Taux global', it: 'Tasso globale' }, unit: '%', ans: 32, tol: 0.005, sign: 'strict',
    traps: [{ v: 30,
      fr: 'Tu as additionné les taux : 10 % + 20 %. Les taux ne s’additionnent pas : on multiplie les coefficients multiplicateurs.',
      it: 'Hai sommato i tassi: 10% + 20%. I tassi non si sommano: si moltiplicano i coefficienti moltiplicativi.' }],
    hint: {
      fr: 'Augmenter de 10 % revient à multiplier par 1,1. Augmenter de 20 % revient à multiplier par 1,2. Multiplie ces deux coefficients.',
      it: 'Aumentare del 10% vuol dire moltiplicare per 1,1. Aumentare del 20% vuol dire moltiplicare per 1,2. Moltiplica questi due coefficienti.'
    },
    sol: {
      fr: '<ol><li>Augmenter de 10 % revient à multiplier par 1,1 ; augmenter de 20 % revient à multiplier par 1,2.</li>' +
          '<li>Coefficient multiplicateur global : C = 1,1 × 1,2 = 1,32.</li>' +
          '<li>Taux global : T = C − 1 = 1,32 − 1 = 0,32 = 32 %.</li></ol>' +
          '<p>Le prix a augmenté globalement de <b>32 %</b> (et non de 30 %).</p>',
      it: '<ol><li>Aumentare del 10% vuol dire moltiplicare per 1,1; aumentare del 20% vuol dire moltiplicare per 1,2.</li>' +
          '<li>Coefficiente moltiplicativo globale: C = 1,1 × 1,2 = 1,32.</li>' +
          '<li>Tasso globale: T = C − 1 = 1,32 − 1 = 0,32 = 32%.</li></ol>' +
          '<p>Il prezzo è aumentato in totale del <b>32%</b> (e non del 30%).</p>'
    }
  }]
});
