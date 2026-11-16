(function(){
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const inline = (s) => s;
const S = { xp: 0, owl: {} };
const ASSO = { nom: "SCOLAIR", chouette: "Hector" };
const coach = { react() {} };
const HECTOR_DIT = [
  ["Hi hi, ça chatouille !", "Ih ih, mi fai il solletico!"],
  ["Un pourcentage, c’est une multiplication cachée.", "Una percentuale è una moltiplicazione nascosta."],
  ["On n’additionne pas les taux : on multiplie les coefficients.", "I tassi non si sommano: si moltiplicano i coefficienti."],
  ["Pour revenir en arrière, on divise par le coefficient.", "Per tornare indietro, si divide per il coefficiente."],
  ["Tu progresses à chaque question.", "Migliori a ogni domanda."],
  ["Une erreur, c’est une chose de plus que tu sais.", "Un errore è una cosa in più che sai."],
  ["+20 % puis −20 %, ça ne fait pas 0 % !", "+20 % poi −20 % non fa 0 %!"],
];
function msg(cat) {
  if (cat !== "chatouille") return "";
  const m = pick(HECTOR_DIT);
  return '<span class="fr">' + m[0] + '</span><span class="it">' + m[1] + '</span>';
}
