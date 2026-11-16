
  // Hector, la chouette de SCOLAIR : il accompagne, félicite et encourage.
  var HK = window.Hector || null, owlTop = null;
  function mkOwl(slot, opts){
    if (!HK || !slot) return null;
    try { var o = new HK.Owl(opts || {}); slot.appendChild(o.el); return o; } catch (e) { return null; }
  }
  function owlEvt(kind, n){
    if (!HK) return;
    try {
      if (kind === 'note'){
        var t = mkOwl($('#test-owl'), { sommeil: false });
        if (t){ if (n >= 14){ t.anim(n === 20 ? 'toque' : 'fierte'); } else if (n >= 10) t.anim('oui'); else t.set('think', 2500); }
        if (n >= 16) HK.confetti();
        return;
      }
      if (!owlTop) return;
      if (kind === 'ok') owlTop.anim('saut');
      else if (kind === 'ko') owlTop.set('think', 1800);
      else if (kind === 'exo') owlTop.anim('danse');
      else if (kind === 'serie'){
        owlTop.anim('fierte');
        owlTop.speak('<span class="fr">' + n + ' de suite, bravo !</span><span class="it">' + n + ' di fila, brava!</span>', { muet: true });
        if (n % 10 === 0) HK.confetti();
      }
    } catch (e) {}
  }
  (function(){
    owlTop = mkOwl($('#owl-top'), {});
    var home = $('#v-cours .vhead');
    if (home && HK){
      var c = document.createElement('div');
      c.className = 'coach'; c.setAttribute('data-owl-host', '');
      c.innerHTML = '<div class="owl-slot"></div><div class="bubble"><span class="fr">Salut, moi c’est Hector ! On avance pas à pas : le cours, les exercices du livre, puis l’entraînement.</span><span class="it">Ciao, sono Hector! Andiamo un passo alla volta: la lezione, gli esercizi del libro, poi l’allenamento.</span></div>';
      home.appendChild(c);
      var o = mkOwl($('.owl-slot', c), {});
      if (o) setTimeout(function(){ try { o.anim('salut'); } catch (e) {} }, 500);
    }
  })();
