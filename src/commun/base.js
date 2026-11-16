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
    document.documentElement.lang = l === 'it' ? 'it' : 'fr';
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

  /* Texte bilingue : objet { fr, it }, ou HTML déjà balisé (.fr / .it) quand les calculs ne s'écrivent qu'une fois */
  function B(o, tag, cls){ return o == null ? '' : typeof o === 'string' ? o : bi(o, tag, cls); }
  function BIn(o){ return o == null ? '' : typeof o === 'string' ? o : biIn(o); }
  function UI(o){ return biUI(o.fr, o.it); }

  /* Hasard */
  function rnd(a, b){ return a + Math.floor(Math.random() * (b - a + 1)); }
  function pick(a){ return a[rnd(0, a.length - 1)]; }
  function shuffle(a){ for (var i = a.length - 1; i > 0; i--){ var j = rnd(0, i), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function qcm(fr, it, opts, exp){ return { fr: fr, it: it, opts: opts, exp: exp }; }

  /* Chapitres : chacun s'enregistre dans son fichier chapitre.js. Le chapitre 10 garde ses données à la racine du stockage (première version publiée). */
  var CHAPS = [];
  function chst(c){
    var s = store;
    if (!c.root){ store.ch = store.ch || {}; s = store.ch[c.id] = store.ch[c.id] || {}; }
    s.tr = s.tr || { streak: 0, best: 0, total: 0 };
    return s;
  }
