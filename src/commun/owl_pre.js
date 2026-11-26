(function(){
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstElementChild; };
const pick = (a) => a[Math.floor(Math.random() * a.length)];
const inline = (s) => s;
// Les tenues : les accessoires du dessin qu'Hector peut porter. Lesquels sont portés se règle avec Hector.tenue([...]).
const ACCS = ["scarf", "cap", "bow", "shades", "crown"].map((k) => ({ k, lvl: 1 }));
const levelOf = () => 1;
const S = { xp: 0, owl: { acc: {} } };
ACCS.forEach((a) => { S.owl.acc[a.k] = false; });
const ASSO = { nom: "SCOLAIR", chouette: "Hector" };
const coach = { react() {} };
let HECTOR_DIT = [
  ["Hi hi, ça chatouille !", "Ih ih, mi fai il solletico!"],
  ["Tu progresses à chaque question.", "Migliori a ogni domanda."],
  ["Une erreur, c’est une chose de plus que tu sais.", "Un errore è una cosa in più che sai."],
];
function msg(cat) {
  if (cat !== "chatouille") return "";
  const m = pick(HECTOR_DIT);
  return '<span class="fr">' + m[0] + '</span><span class="it">' + m[1] + '</span>';
}
