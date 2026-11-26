  // Hector, la chouette de SCOLAIR : il accompagne, félicite et encourage.
  var HK = window.Hector || null, owlTop = null, owlDanseA = 0;
  function mkOwl(slot, opts){
    if (!HK || !slot) return null;
    try { var o = new HK.Owl(opts || {}); slot.appendChild(o.el); return o; } catch (e) { return null; }
  }
  function owlEvt(kind, n, slot){
    /* un travail réussi peut faire gagner une tenue ou une danse : Hector l'annonce une fois son geste fini */
    if (kind !== 'ko') jeuBientot(kind === 'exo' || Date.now() - owlDanseA < 400 ? 2900 : 1100);
    if (!HK) return;
    try {
      if (kind === 'note'){
        var t = mkOwl(slot, { sommeil: false });
        if (t){ if (n >= 14){ t.anim(n === 20 ? 'toque' : 'fierte'); } else if (n >= 10) t.anim('oui'); else t.set('think', 2500); }
        if (n >= 16) HK.confetti();
        return;
      }
      if (!owlTop) return;
      if (kind === 'ok'){ if (Date.now() - owlDanseA > 400) owlTop.anim('saut'); }      /* la dernière question d'un exercice : la danse d'abord */
      else if (kind === 'ko') owlTop.set('think', 1800);
      else if (kind === 'exo'){ owlDanseA = Date.now(); if (!jeuDanse(owlTop)) owlTop.anim('danse'); }
      else if (kind === 'serie'){
        owlTop.anim('fierte');
        owlTop.speak('<span class="fr">' + typo(n + ' de suite, bravo !', true) + '</span><span class="it">' + n + ' di fila, brava!</span>', { muet: true });
        if (n % 10 === 0) HK.confetti();
      }
    } catch (e) {}
  }
  /* Ce que dit Hector quand on le touche : quelques phrases générales, plus celles du chapitre ouvert */
  var DIT = [
    ['Hi hi, ça chatouille !', 'Ih ih, mi fai il solletico!'],
    ['Tu progresses à chaque question.', 'Migliori a ogni domanda.'],
    ['Une erreur, c’est une chose de plus que tu sais.', 'Un errore è una cosa in più che sai.']
  ];
  function owlChapter(c){
    if (!HK || !HK.phrases) return;
    var list = DIT.slice();
    (c ? [c] : CHAPS).forEach(function(x){ list = list.concat(x.dit || []); });
    list = list.map(function(d){ return [typo(d[0], true), d[1]]; });
    HK.phrases(list);
  }
  (function(){
    owlTop = mkOwl($('#owl-top'), {});
    var home = $('#v-accueil .vhead');
    if (home && HK){
      var c = document.createElement('div');
      c.className = 'coach'; c.setAttribute('data-owl-host', '');
      c.innerHTML = '<div class="owl-slot"></div><div class="bubble"><span class="fr">' + typo('Salut, moi c’est Hector ! Choisis un chapitre. On avance pas à pas : le cours, les exercices, puis l’entraînement.', true) + '</span><span class="it">Ciao, sono Hector! Scegli un capitolo. Andiamo un passo alla volta: la lezione, gli esercizi, poi l’allenamento.</span></div>';
      home.appendChild(c);
      var o = mkOwl($('.owl-slot', c), {});
      if (o) setTimeout(function(){ try { o.anim('salut'); } catch (e) {} }, 500);
    }
  })();
