// Vérifie des fichiers d'exercices (format : outils/FORMAT-EXERCICES.md).
// Usage : node outils/validate.js src/ch10/exA.js [autres fichiers...]
const fs = require('fs');
const vm = require('vm');
const files = process.argv.slice(2);
if (!files.length) { console.log('Usage : node outils/validate.js fichier.js [autres fichiers...]'); process.exit(1); }
const ctx = { EXOS: [] };
vm.createContext(ctx);
let problems = [];
for (const f of files) {
  try { vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f }); }
  catch (e) { problems.push(f + ' : erreur JavaScript : ' + e.message); }
}
const EX = ctx.EXOS;
// Groupes d'exercices de chaque chapitre (les mêmes que dans le fichier chapitre.js du chapitre)
const GROUPS = {
  c10: ['rappels', 'succ', 'recip', 'synth'],
  c3: ['cahier', 'calc', 'rac', 'expr', 'eq', 'ineq', 'dem', 'eval'],
  t1: ['prio', 'frac', 'puis', 'brevet']
};
// Chapitres écrits en français seulement (classe de 3e) : un texte est une simple chaîne (ou { fr }), sans italien
const MONO = ['t1'];
const ids = new Set();
const isBi2 = (o) => o && typeof o === 'object' && typeof o.fr === 'string' && typeof o.it === 'string' && o.fr.trim() && o.it.trim();
const isFr = (o) => (typeof o === 'string' && o.trim() !== '') || !!(o && typeof o === 'object' && typeof o.fr === 'string' && o.fr.trim() && o.it == null);
let mono = false;      // le chapitre de l'exercice en cours de vérification est-il en français seulement ?
const isBi = (o) => mono ? isFr(o) : isBi2(o);
// Un texte : { fr, it }, ou du HTML déjà balisé (.fr / .it) quand les calculs ne s'écrivent qu'une fois
const isText = (o) => isBi(o) || (typeof o === 'string' && o.trim() !== '');
const count = (s, re) => (s.match(re) || []).length;
// Le signe ✓ (U+2713) est un caractère typographique : il est admis.
const BAD = [[/—/, 'tiret long'], [/–/, 'tiret moyen'], [/(?!✓)\p{Extended_Pictographic}/u, 'emoji'], [/<script|\son\w+=/i, 'HTML dangereux'], [/[  ]{3,}/, 'trop d’espaces insécables']];
const TAGS = ['p', 'b', 'i', 'ol', 'ul', 'li', 'table', 'tr', 'td', 'th', 'div', 'span', 'sub', 'sup', 'pre', 'em', 'strong', 'a', 'button', 'figure', 'figcaption', 'svg', 'text', 'tspan', 'code', 's', 'thead', 'tbody', 'details', 'summary'];
function scan(where, v) {
  if (typeof v === 'string') {
    for (const [re, name] of BAD) if (re.test(v)) problems.push(where + ' : ' + name);
    for (const t of TAGS) {
      const o = count(v, new RegExp('<' + t + '(\\s[^>]*)?>', 'g'));
      const c = count(v, new RegExp('</' + t + '>', 'g'));
      if (o !== c) problems.push(where + ' : balise <' + t + '> ouverte ' + o + ' fois, fermée ' + c + ' fois');
    }
  } else if (Array.isArray(v)) v.forEach((x, i) => scan(where + '[' + i + ']', x));
  else if (v && typeof v === 'object') for (const k of Object.keys(v)) scan(where + '.' + k, v[k]);
}
// HTML déjà balisé : chaque passage en français doit avoir son passage en italien
function checkMixed(where, s) {
  if (typeof s !== 'string') return;
  const fr = count(s, /class="fr[ "]/g), it = count(s, /class="it[ "]/g);
  if (fr !== it) problems.push(where + ' : ' + fr + ' passage(s) .fr pour ' + it + ' passage(s) .it');
  if (/\slang="/.test(s)) problems.push(where + ' : utiliser class="fr" / class="it", pas l’attribut lang');
}
function checkFigure(where, fig) {
  if (!fig) return;
  const ch = fig.chain;
  if (!ch || !Array.isArray(ch.nodes) || ch.nodes.length < 2) { problems.push(where + ' : figure.chain.nodes manquant'); return; }
  const n = ch.nodes.length - 1;
  if (!Array.isArray(ch.ops) || ch.ops.length !== n) problems.push(where + ' : figure.chain.ops doit avoir ' + n + ' éléments');
  if (ch.top && (!Array.isArray(ch.top) || ch.top.length !== n || !ch.top.every(isBi))) problems.push(where + ' : figure.chain.top doit avoir ' + n + ' éléments {fr, it}');
  if (ch.bottom && (typeof ch.bottom.op !== 'string' || !['fwd', 'back'].includes(ch.bottom.dir))) problems.push(where + ' : figure.chain.bottom invalide');
}
EX.forEach((e, i) => {
  const w = 'exercice ' + (e && e.id ? e.id : '#' + i);
  if (!e || typeof e !== 'object') { problems.push(w + ' : pas un objet'); return; }
  const ch = e.ch || 'c10';
  if (!GROUPS[ch]) { problems.push(w + ' : chapitre inconnu « ' + ch + ' » (à déclarer dans outils/validate.js)'); return; }
  mono = MONO.includes(ch);
  if (mono && /class="it[ "]/.test(JSON.stringify(e))) problems.push(w + ' : chapitre en français seulement, pas de passage class="it"');
  if (!/^[a-z0-9]+$/.test(e.id || '')) problems.push(w + ' : id invalide');
  if (ch !== 'c10' && !String(e.id).startsWith(ch)) problems.push(w + ' : l’id doit commencer par « ' + ch + ' » pour rester unique entre les chapitres');
  if (ids.has(e.id)) problems.push(w + ' : id en double'); ids.add(e.id);
  if (!GROUPS[ch].includes(e.group)) problems.push(w + ' : group invalide');
  if (typeof e.num !== 'string' || !e.num) problems.push(w + ' : num doit être un texte');
  if (e.page != null ? typeof e.page !== 'number' : !isBi(e.src)) problems.push(w + ' : page (nombre) ou src (origine de l’exercice) manquant');
  if (ch === 'c10' ? ![1, 2, 3].includes(e.stars) : (e.stars != null && ![1, 2, 3].includes(e.stars))) problems.push(w + ' : stars doit valoir 1, 2 ou 3');
  if (e.tag && !isBi(e.tag)) problems.push(w + ' : tag doit être {fr, it}');
  if (!isBi(e.title)) problems.push(w + ' : title {fr, it} manquant');
  if (!Array.isArray(e.parts) || !e.parts.length) { problems.push(w + ' : parts vide'); return; }
  if (e.text != null ? !isText(e.text) : !e.parts.every((p) => isText(p.q))) problems.push(w + ' : text manquant (ou alors chaque question doit avoir son énoncé q)');
  checkMixed(w + ' text', e.text);
  checkFigure(w, e.figure);
  e.parts.forEach((p, j) => {
    const pw = w + ' question ' + (j + 1);
    ['q', 'hint', 'sol', 'more', 'label'].forEach((k) => checkMixed(pw + ' ' + k, p[k]));
    if (p.q != null && !isText(p.q)) problems.push(pw + ' : q invalide');
    if (p.hint != null && !isText(p.hint)) problems.push(pw + ' : hint invalide');
    if (p.sol != null && !isText(p.sol)) problems.push(pw + ' : sol invalide');
    const needHelp = () => {
      if (!isText(p.q)) problems.push(pw + ' : q manquant');
      if (!isText(p.hint)) problems.push(pw + ' : hint manquant');
      if (!isText(p.sol)) problems.push(pw + ' : sol manquant');
    };
    checkFigure(pw, p.figure);
    if (p.kind === 'num') {
      needHelp();
      if (!isBi(p.label)) problems.push(pw + ' : label {fr, it} manquant');
      if (typeof p.unit !== 'string') problems.push(pw + ' : unit doit être un texte');
      if (typeof p.ans !== 'number' || !isFinite(p.ans)) problems.push(pw + ' : ans doit être un nombre');
      if (typeof p.tol !== 'number' || p.tol < 0) problems.push(pw + ' : tol invalide');
      if (p.near != null && (typeof p.near !== 'number' || p.near < p.tol)) problems.push(pw + ' : near invalide');
      if (!['strict', 'abs'].includes(p.sign)) problems.push(pw + ' : sign doit valoir strict ou abs');
      (p.traps || []).forEach((t, k) => {
        if (typeof t.v !== 'number' || !t.fr || (!mono && !t.it)) problems.push(pw + ' : trap ' + k + ' invalide');
        if (typeof t.v === 'number' && Math.abs(t.v - p.ans) <= p.tol) problems.push(pw + ' : trap ' + k + ' égal à la bonne réponse');
      });
    } else if (p.kind === 'fill') {
      needHelp();
      if (!Array.isArray(p.ans) || !p.ans.length || !p.ans.every((a) => typeof a === 'number' && isFinite(a))) problems.push(pw + ' : ans doit être une liste de nombres');
      else if (typeof p.tpl !== 'string') problems.push(pw + ' : tpl manquant');
      else p.ans.forEach((a, k) => {
        if (!new RegExp('\\{±?' + k + '\\}').test(p.tpl)) problems.push(pw + ' : la case {' + k + '} manque dans tpl');
        if (a < 0 && !new RegExp('\\{(s|±)' + k + '\\}').test(p.tpl)) problems.push(pw + ' : la case ' + k + ' attend un nombre négatif, il lui faut un signe {±' + k + '} ou {s' + k + '}');
      });
      const n = Array.isArray(p.ans) ? p.ans.length : 0, caseOk = (k) => Number.isInteger(k) && k >= 0 && k < n;
      (p.traps || []).forEach((t, k) => {
        if (!Array.isArray(t.v) || !t.fr || (!mono && !t.it)) problems.push(pw + ' : trap ' + k + ' invalide');
        else if (t.v.length !== n || !t.v.every((x) => x === null || (typeof x === 'number' && isFinite(x)))) problems.push(pw + ' : trap ' + k + ' : une valeur (ou null) par case');
        else if (t.v.every((x, i) => x === null || x === p.ans[i])) problems.push(pw + ' : trap ' + k + ' égal à la bonne réponse');
      });
      if (p.frac != null && !(Array.isArray(p.frac) && p.frac.every((f) => Array.isArray(f) && f.length === 2 && f.every(caseOk)))) problems.push(pw + ' : frac doit être une liste de paires de cases [numérateur, dénominateur]');
      if (p.sci != null) {
        if (!(Array.isArray(p.sci) && p.sci.length === 2 && p.sci.every(caseOk))) problems.push(pw + ' : sci doit désigner deux cases [nombre, exposant]');
        else if (!(Math.abs(p.ans[p.sci[0]]) >= 1 && Math.abs(p.ans[p.sci[0]]) < 10 && Number.isInteger(p.ans[p.sci[1]]))) problems.push(pw + ' : sci : la réponse n’est pas une écriture scientifique');
      }
    } else if (p.kind === 'choice') {
      if (!isText(p.q)) problems.push(pw + ' : q manquant');
      if (!Array.isArray(p.choices) || p.choices.length < 2 || p.choices.length > 4 || !p.choices.every(isText)) problems.push(pw + ' : choices doit avoir 2 à 4 éléments');
      const goods = Array.isArray(p.correct) ? p.correct : [p.correct];
      if (!goods.length || !p.choices || !goods.every((g) => Number.isInteger(g) && g >= 0 && g < p.choices.length) || new Set(goods).size !== goods.length) problems.push(pw + ' : correct invalide');
      if (p.why && !isBi(p.why)) problems.push(pw + ' : why doit être {fr, it}');
      if (p.fb) {
        if (!Array.isArray(p.fb) || !p.choices || p.fb.length !== p.choices.length || !p.fb.every(isText)) problems.push(pw + ' : fb doit donner une explication par réponse');
        else p.fb.forEach((f, k) => checkMixed(pw + ' fb ' + k, f));
      } else needHelp();
    } else if (p.kind === 'self') {
      if (!isText(p.sol)) problems.push(pw + ' : sol manquant');
    } else problems.push(pw + ' : kind doit valoir num, fill, choice ou self');
  });
  scan(w, e);
});
const byGroup = {};
let nParts = 0;
EX.forEach((e) => { const k = (e.ch || 'c10') + '.' + e.group; byGroup[k] = (byGroup[k] || 0) + 1; nParts += (e.parts || []).length; });
console.log('Exercices : ' + EX.length + ' | questions : ' + nParts + ' | par groupe : ' + JSON.stringify(byGroup));
if (problems.length) { console.log(problems.length + ' problème(s) :'); problems.forEach((p) => console.log(' - ' + p)); process.exit(1); }
console.log('OK, 0 problème.');
