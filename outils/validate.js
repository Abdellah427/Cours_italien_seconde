// Usage: node validate.js fichier1.js [fichier2.js ...]
const fs = require('fs');
const vm = require('vm');
const files = process.argv.slice(2);
if (!files.length) { console.log('Usage: node validate.js fichier.js'); process.exit(1); }
const ctx = { EXOS: [] };
vm.createContext(ctx);
let problems = [];
for (const f of files) {
  try { vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f }); }
  catch (e) { problems.push(f + ' : erreur JavaScript : ' + e.message); }
}
const EX = ctx.EXOS;
const GROUPS = ['rappels', 'succ', 'recip', 'synth'];
const ids = new Set();
const isBi = (o) => o && typeof o.fr === 'string' && typeof o.it === 'string' && o.fr.trim() && o.it.trim();
const BAD = [[/\u2014/, 'tiret long'], [/\u2013/, 'tiret moyen'], [/\p{Extended_Pictographic}/u, 'emoji'], [/<script|\son\w+=/i, 'HTML dangereux']];
function scan(where, v) {
  if (typeof v === 'string') {
    for (const [re, name] of BAD) if (re.test(v)) problems.push(where + ' : ' + name);
    for (const t of ['p', 'b', 'i', 'ol', 'ul', 'li', 'table', 'tr', 'td', 'th', 'div', 'span', 'sub', 'sup', 'pre', 'em', 'strong']) {
      const o = (v.match(new RegExp('<' + t + '(\\s[^>]*)?>', 'g')) || []).length;
      const c = (v.match(new RegExp('</' + t + '>', 'g')) || []).length;
      if (o !== c) problems.push(where + ' : balise <' + t + '> ouverte ' + o + ' fois, fermée ' + c + ' fois');
    }
  } else if (Array.isArray(v)) v.forEach((x, i) => scan(where + '[' + i + ']', x));
  else if (v && typeof v === 'object') for (const k of Object.keys(v)) scan(where + '.' + k, v[k]);
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
  if (!/^[a-z0-9]+$/.test(e.id || '')) problems.push(w + ' : id invalide');
  if (ids.has(e.id)) problems.push(w + ' : id en double'); ids.add(e.id);
  if (!GROUPS.includes(e.group)) problems.push(w + ' : group invalide');
  if (typeof e.num !== 'string' || !e.num) problems.push(w + ' : num doit être un texte');
  if (typeof e.page !== 'number') problems.push(w + ' : page doit être un nombre');
  if (![1, 2, 3].includes(e.stars)) problems.push(w + ' : stars doit valoir 1, 2 ou 3');
  if (e.tag && !isBi(e.tag)) problems.push(w + ' : tag doit être {fr, it}');
  if (!isBi(e.title)) problems.push(w + ' : title {fr, it} manquant');
  if (!isBi(e.text)) problems.push(w + ' : text {fr, it} manquant');
  checkFigure(w, e.figure);
  if (!Array.isArray(e.parts) || !e.parts.length) { problems.push(w + ' : parts vide'); return; }
  e.parts.forEach((p, j) => {
    const pw = w + ' question ' + (j + 1);
    if (!isBi(p.q)) problems.push(pw + ' : q {fr, it} manquant');
    if (!isBi(p.hint)) problems.push(pw + ' : hint {fr, it} manquant');
    if (!isBi(p.sol)) problems.push(pw + ' : sol {fr, it} manquant');
    checkFigure(pw, p.figure);
    if (p.kind === 'num') {
      if (!isBi(p.label)) problems.push(pw + ' : label {fr, it} manquant');
      if (typeof p.unit !== 'string') problems.push(pw + ' : unit doit être un texte');
      if (typeof p.ans !== 'number' || !isFinite(p.ans)) problems.push(pw + ' : ans doit être un nombre');
      if (typeof p.tol !== 'number' || p.tol < 0) problems.push(pw + ' : tol invalide');
      if (p.near != null && (typeof p.near !== 'number' || p.near < p.tol)) problems.push(pw + ' : near invalide');
      if (!['strict', 'abs'].includes(p.sign)) problems.push(pw + ' : sign doit valoir strict ou abs');
      (p.traps || []).forEach((t, k) => {
        if (typeof t.v !== 'number' || !t.fr || !t.it) problems.push(pw + ' : trap ' + k + ' invalide');
        if (typeof t.v === 'number' && Math.abs(t.v - p.ans) <= p.tol) problems.push(pw + ' : trap ' + k + ' égal à la bonne réponse');
      });
    } else if (p.kind === 'choice') {
      if (!Array.isArray(p.choices) || p.choices.length < 2 || p.choices.length > 4 || !p.choices.every(isBi)) problems.push(pw + ' : choices doit avoir 2 à 4 éléments {fr, it}');
      if (!Number.isInteger(p.correct) || !p.choices || p.correct < 0 || p.correct >= p.choices.length) problems.push(pw + ' : correct invalide');
      if (p.why && !isBi(p.why)) problems.push(pw + ' : why doit être {fr, it}');
    } else problems.push(pw + ' : kind doit valoir num ou choice');
  });
  scan(w, e);
});
const byGroup = {};
let nParts = 0;
EX.forEach((e) => { byGroup[e.group] = (byGroup[e.group] || 0) + 1; nParts += (e.parts || []).length; });
console.log('Exercices : ' + EX.length + ' | questions : ' + nParts + ' | par groupe : ' + JSON.stringify(byGroup));
if (problems.length) { console.log(problems.length + ' problème(s) :'); problems.forEach((p) => console.log(' - ' + p)); process.exit(1); }
console.log('OK, 0 problème.');
