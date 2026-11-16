  'use strict';
  var NB = ' ', MI = '−', TIMES = '×', DIV = '÷', APPROX = '≈';
  var LS = 'evo-chap10-v1';
  var store = (function(){ try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } })();
  store.solved = store.solved || {};
  store.lang = store.lang || 'both';
  store.tr = store.tr || { streak: 0, best: 0, total: 0 };
  function save(){ try { localStorage.setItem(LS, JSON.stringify(store)); } catch (e) {} }

  function $(s, r){ return (r || document).querySelector(s); }
  function $$(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function add(a, b){ return a + b; }
  function esc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

  /* Typographie : espaces insécables françaises et groupes de chiffres */
  function typo(html, isFr){
    return String(html).split(/(<[^>]*>)/).map(function(s, i){
      if (i % 2) return s;
      s = s.replace(/(\d) (?=\d{3}(?!\d))/g, '$1' + NB);
      if (isFr) s = s.replace(/ ([%€:;!?»])/g, NB + '$1').replace(/« /g, '«' + NB);
      return s;
    }).join('');
  }
  function bi(o, tag, cls){
    tag = tag || 'div';
    var c = cls ? ' ' + cls : '';
    return '<' + tag + ' class="fr' + c + '">' + typo(o.fr, true) + '</' + tag + '><' + tag + ' class="it' + c + '">' + typo(o.it, false) + '</' + tag + '>';
  }
  function biIn(o){ return '<span class="fr">' + typo(o.fr, true) + '</span><span class="it inl">' + typo(o.it, false) + '</span>'; }
  function biUI(fr, it){ return '<span class="ui"><span class="fr">' + fr + '</span><span class="it">' + it + '</span></span>'; }

  /* Nombres à la française */
  function rd(n, d){ var p = Math.pow(10, d); return Math.round(n * p) / p; }
  function num(n, d){
    if (d == null) d = 2;
    var v = rd(Math.abs(n), d);
    var s = v.toLocaleString('fr-FR', { maximumFractionDigits: d }).replace(/[ \s]/g, NB);
    return (n < 0 && v !== 0 ? MI : '') + s;
  }
  function sgn(n, d){ return (rd(n, d == null ? 2 : d) > 0 ? '+' : '') + num(n, d); }
  function exact(n, d){ var p = Math.pow(10, d); return Math.abs(n * p - Math.round(n * p)) < 1e-7; }

  /* Langue */
  function setLang(l){
    store.lang = l; save();
    document.documentElement.setAttribute('data-lang', l);
    $$('.seg button').forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.lang === l)); });
    document.dispatchEvent(new Event('langchange'));
  }
  $$('.seg button').forEach(function(b){ b.addEventListener('click', function(){ setLang(b.dataset.lang); }); });

  /* Schémas en bulles, comme dans le manuel */
  var chainId = 0, chains = [];
  function markers(id){
    return ['ink', 'up', 'down'].map(function(t){
      return '<marker id="' + id + t + '" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="c-ah' + (t === 'ink' ? '' : ' ' + t) + '" d="M0 0L10 5L0 10z"/></marker>';
    }).join('');
  }
  function chainSVG(spec){
    var lang = store.lang === 'it' ? 'it' : 'fr';
    var nodes = spec.nodes.map(String), n = nodes.length, ops = spec.ops || [], tones = spec.tones || [];
    var hasTop = !!(spec.top && spec.top.length), b = spec.bottom;
    var ws = nodes.map(function(t){ return Math.max(46, t.length * 9.5 + 24); });
    var gaps = [];
    for (var i = 0; i < n - 1; i++){
      var need = Math.max(78, String(ops[i] || '').length * 8.4 + 14);
      if (hasTop){ var cap = spec.top[i][lang] || spec.top[i].fr; need = Math.max(need, cap.length * 6.4 + 10 - (ws[i] + ws[i + 1]) / 2 + 20); }
      gaps.push(need);
    }
    var content = ws.reduce(add, 0) + gaps.reduce(add, 0);
    var W = Math.max(300, content + 16, b ? String(b.op).length * 8.4 + 40 : 0);
    var x = (W - content) / 2, xs = [];
    for (i = 0; i < n; i++){ xs.push(x + ws[i] / 2); x += ws[i] + (gaps[i] || 0); }
    var ry = 18, cy = hasTop ? 70 : 52, H = cy + ry + (b ? 50 : 12);
    var id = 'ch' + (++chainId);
    var s = '<svg viewBox="0 0 ' + rd(W, 1) + ' ' + H + '" role="img" aria-label="' + esc(nodes.join(' → ')) + '"><defs>' + markers(id) + '</defs>';
    for (i = 0; i < n - 1; i++){
      var x1 = rd(xs[i] + ws[i] / 2 - 4, 1), x2 = rd(xs[i + 1] - ws[i + 1] / 2 + 4, 1), xm = rd((x1 + x2) / 2, 1), t = tones[i] || '';
      s += '<path class="c-arc ' + t + '" d="M' + x1 + ' ' + (cy - 8) + 'Q' + xm + ' ' + (cy - 50) + ' ' + x2 + ' ' + (cy - 8) + '" marker-end="url(#' + id + (t || 'ink') + ')"/>';
      s += '<text class="c-op ' + t + '" x="' + xm + '" y="' + (cy - 35) + '" text-anchor="middle">' + esc(ops[i] || '') + '</text>';
      if (hasTop) s += '<text class="c-cap" x="' + xm + '" y="' + (cy - 54) + '" text-anchor="middle">' + esc(spec.top[i][lang] || spec.top[i].fr) + '</text>';
    }
    if (b){
      var bt = b.tone || '', xa = rd(xs[0], 1), xb = rd(xs[n - 1], 1), yb = cy + ry - 1, ym = yb + 46, mid = rd((xa + xb) / 2, 1);
      var d = b.dir === 'back' ? 'M' + xb + ' ' + yb + 'Q' + mid + ' ' + ym + ' ' + xa + ' ' + yb : 'M' + xa + ' ' + yb + 'Q' + mid + ' ' + ym + ' ' + xb + ' ' + yb;
      s += '<path class="c-arc ' + bt + '" d="' + d + '" marker-end="url(#' + id + (bt || 'ink') + ')"/>';
      s += '<text class="c-op ' + bt + '" x="' + mid + '" y="' + (yb + 40) + '" text-anchor="middle">' + esc(b.op) + '</text>';
    }
    for (i = 0; i < n; i++){
      var q = nodes[i] === '?';
      s += '<ellipse class="c-node' + (q ? ' q' : '') + '" cx="' + rd(xs[i], 1) + '" cy="' + cy + '" rx="' + rd(ws[i] / 2, 1) + '" ry="' + ry + '"/>';
      s += '<text class="c-nt" x="' + rd(xs[i], 1) + '" y="' + (cy + 5) + '" text-anchor="middle">' + esc(nodes[i]) + '</text>';
    }
    return s + '</svg>';
  }
  function drawChain(el, spec, keep){
    el.innerHTML = chainSVG(spec);
    if (keep) chains.push({ el: el, spec: spec });
  }
  document.addEventListener('langchange', function(){
    chains = chains.filter(function(c){ return document.body.contains(c.el); });
    chains.forEach(function(c){ c.el.innerHTML = chainSVG(c.spec); });
  });
  $$('.chain[data-spec]').forEach(function(el){
    try { drawChain(el, JSON.parse(el.getAttribute('data-spec')), true); } catch (e) {}
  });

  /* Petits labos du cours */
  var ICON_LAB = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/></svg>';
  function stepper(id, label, val, min, max, step, onChange){
    var wrap = document.createElement('div');
    wrap.className = 'ctrl';
    wrap.innerHTML = '<span>' + label + '</span><div class="stepper"><button type="button" aria-label="moins">' + MI + '</button><output aria-live="polite"></output><button type="button" aria-label="plus">+</button></div>';
    var out = $('output', wrap), bs = $$('button', wrap);
    function show(){ out.textContent = sgn(val, 1) + NB + '%'; out.className = val > 0 ? 'up' : val < 0 ? 'down' : ''; }
    bs[0].addEventListener('click', function(){ if (val - step >= min){ val -= step; show(); onChange(val); } });
    bs[1].addEventListener('click', function(){ if (val + step <= max){ val += step; show(); onChange(val); } });
    show();
    return wrap;
  }
  function rateFr(t){ return (t >= 0 ? 'Augmenter de ' : 'Diminuer de ') + num(Math.abs(t), 1) + ' %'; }
  function rateIt(t){ var s = num(Math.abs(t), 1); return (t >= 0 ? 'Aumentare ' : 'Diminuire ') + (/^0/.test(s) ? 'dello ' : /^(8|11(,|$)|1(,|$))/.test(s) ? 'dell’' : 'del ') + s + '%'; }

  function labCM(box){
    box.innerHTML = '<p class="lab-t">' + ICON_LAB + biUI('Fais varier le taux', 'Fai variare il tasso') + '</p>' +
      '<label class="ui" for="lab-cm-r"><span class="fr">Taux t :</span><span class="it">Tasso t:</span></label>' +
      '<input type="range" id="lab-cm-r" min="-80" max="100" step="5" value="20">' +
      '<div class="kv" aria-live="polite"></div><div class="chain"></div>';
    var r = $('input', box), kv = $('.kv', box), ch = $('.chain', box);
    function up(){
      var t = Number(r.value), c = 1 + t / 100;
      kv.innerHTML = bi({
        fr: '<p><b>' + rateFr(t) + '</b> revient à multiplier par <b>' + num(c, 2) + '</b>.</p><p>C ' + (c > 1 ? '&gt; 1 : augmentation.' : c < 1 ? '&lt; 1 : diminution.' : '= 1 : pas de changement.') + '</p>',
        it: '<p><b>' + rateIt(t) + '</b> vuol dire moltiplicare per <b>' + num(c, 2) + '</b>.</p><p>C ' + (c > 1 ? '&gt; 1: aumento.' : c < 1 ? '&lt; 1: diminuzione.' : '= 1: nessun cambiamento.') + '</p>'
      });
      drawChain(ch, { nodes: ['100 €', num(100 * c, 2) + ' €'], ops: [TIMES + ' ' + num(c, 2)], top: [{ fr: rateFr(t), it: rateIt(t) }], tones: [t >= 0 ? 'up' : 'down'] });
    }
    r.addEventListener('input', up);
    document.addEventListener('langchange', up);
    up();
  }

  function labSucc(box){
    var t1 = 20, t2 = -25;
    box.innerHTML = '<p class="lab-t">' + ICON_LAB + biUI('Essaie avec deux évolutions', 'Prova con due variazioni') + '</p><div class="ctrls"></div><div class="chain"></div><div class="cmp" aria-live="polite"></div>';
    var ctrls = $('.ctrls', box), ch = $('.chain', box), cmp = $('.cmp', box);
    ctrls.appendChild(stepper('s1', biUI('1<sup>re</sup> évolution', '1ª variazione'), t1, -50, 100, 5, function(v){ t1 = v; up(); }));
    ctrls.appendChild(stepper('s2', biUI('2<sup>e</sup> évolution', '2ª variazione'), t2, -50, 100, 5, function(v){ t2 = v; up(); }));
    function up(){
      var c1 = 1 + t1 / 100, c2 = 1 + t2 / 100, c = c1 * c2, T = (c - 1) * 100, v1 = 100 * c1, v2 = v1 * c2;
      drawChain(ch, { nodes: ['100', num(v1, 2), num(v2, 2)], ops: [TIMES + ' ' + num(c1, 2), TIMES + ' ' + num(c2, 2)],
        tones: [t1 >= 0 ? 'up' : 'down', t2 >= 0 ? 'up' : 'down'], bottom: { op: TIMES + ' ' + num(c, 4), dir: 'fwd', tone: c >= 1 ? 'up' : 'down' } });
      cmp.innerHTML = '<div class="good"><small>' + biUI('Juste : on multiplie', 'Giusto: si moltiplica') + '</small><span class="calc">' + num(c1, 2) + ' ' + TIMES + ' ' + num(c2, 2) + ' = ' + num(c, 4) + '</span><span class="big">' + sgn(T, 2) + NB + '%</span></div>' +
        '<div class="bad"><small>' + biUI('Faux : on additionne', 'Sbagliato: si somma') + '</small><span class="calc">' + sgn(t1, 0) + ' ' + (t2 < 0 ? MI + ' ' + num(-t2, 0) : '+ ' + num(t2, 0)) + ' = ' + sgn(t1 + t2, 0) + '</span><span class="big">' + sgn(t1 + t2, 0) + NB + '%</span></div>';
    }
    up();
  }

  function labRecip(box){
    var t = 20;
    box.innerHTML = '<p class="lab-t">' + ICON_LAB + biUI('Aller et retour', 'Andata e ritorno') + '</p><div class="ctrls"></div><div class="chain"></div><div class="cmp" aria-live="polite"></div>';
    var ctrls = $('.ctrls', box), ch = $('.chain', box), cmp = $('.cmp', box);
    ctrls.appendChild(stepper('r1', biUI('Évolution de départ', 'Variazione iniziale'), t, -50, 100, 5, function(v){ t = v; up(); }));
    function up(){
      var c = 1 + t / 100, cr = 1 / c, tr = (cr - 1) * 100, ex = exact(tr, 1), v = 100 * c, opp = 1 - t / 100;
      drawChain(ch, { nodes: ['100', num(v, 2)], ops: [TIMES + ' ' + num(c, 2)], tones: [t >= 0 ? 'up' : 'down'], bottom: { op: DIV + ' ' + num(c, 2), dir: 'back', tone: t >= 0 ? 'down' : 'up' } });
      cmp.innerHTML = '<div class="good"><small>' + biUI('Juste : 1 ÷ C', 'Giusto: 1 ÷ C') + '</small><span class="calc">1 ' + DIV + ' ' + num(c, 2) + ' ' + (exact(cr, 3) ? '=' : APPROX) + ' ' + num(cr, 3) + '</span><span class="big">' + (ex ? '' : APPROX + NB) + sgn(tr, 1) + NB + '%</span></div>' +
        '<div class="bad"><small>' + biUI('Faux : l’opposé', 'Sbagliato: l’opposto') + '</small><span class="calc">' + num(v, 2) + ' ' + TIMES + ' ' + num(opp, 2) + ' = ' + num(v * opp, 2) + (Math.abs(v * opp - 100) > 1e-9 ? ' ≠ 100' : '') + '</span><span class="big">' + sgn(-t, 0) + NB + '%</span></div>';
    }
    up();
  }
  $$('.lab[data-lab]').forEach(function(box){
    var k = box.getAttribute('data-lab');
    if (k === 'cm') labCM(box); else if (k === 'succ') labSucc(box); else if (k === 'recip') labRecip(box);
  });

  /* Sommaire du cours */
  var toc = $('.toc');
  function tocMark(id){
    $$('.chip', toc).forEach(function(c){ var on = c.dataset.go === id; c.setAttribute('aria-pressed', String(on)); if (on) toc.scrollLeft = c.offsetLeft - 24; });
  }
  $$('.chip', toc).forEach(function(c){
    c.addEventListener('click', function(){ var l = document.getElementById(c.dataset.go); if (l){ l.scrollIntoView({ behavior: 'smooth', block: 'start' }); tocMark(c.dataset.go); } });
  });
  var spyTick = false;
  window.addEventListener('scroll', function(){
    if (spyTick || document.getElementById('v-cours').hidden) return;
    spyTick = true;
    requestAnimationFrame(function(){
      spyTick = false;
      var cur = 'l1', lim = (parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--abh')) || 56) + 80;
      $$('.lesson').forEach(function(l){ if (l.getBoundingClientRect().top < lim) cur = l.id; });
      tocMark(cur);
    });
  }, { passive: true });
  function setAbh(){ var a = $('.appbar'); if (a) document.documentElement.style.setProperty('--abh', a.offsetHeight + 'px'); }
  window.addEventListener('resize', setAbh);
  setAbh();
