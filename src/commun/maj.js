// Version installable : hors ligne grâce au service worker ; au retour dans l'appli, on recharge si une version plus récente est en ligne.
(function(){
  var V = "__V__", dernier = 0, sw = navigator.serviceWorker;
  var POLICES = ['400 1em "Atkinson Hyperlegible"', '700 1em "Atkinson Hyperlegible"', 'italic 400 1em "Atkinson Hyperlegible"', '500 1em Fredoka', '600 1em Fredoka', '700 1em Fredoka',
    '400 1em "STIX Two Text"', '600 1em "STIX Two Text"', 'italic 400 1em "STIX Two Text"'];
  /* Hors ligne complet dès la première visite : le service worker garde les polices déjà chargées par la page, puis on demande les autres. */
  function gardePolices(reg){
    try {
      var deja = performance.getEntriesByType("resource").map(function(e){ return e.name; }).filter(function(u){ return /^https:\/\/fonts\.(googleapis|gstatic)\.com\//.test(u); });
      if (reg.active && deja.length) reg.active.postMessage({ garder: deja });
      if (document.fonts && document.fonts.load) POLICES.forEach(function(f){ document.fonts.load(f, "Aé x 2 × − ÷ √ ≤ ≥ ≠ ∞ ∈ ⇔ π").catch(function(){}); });
    } catch (e) {}
  }
  if (sw && location.protocol === "https:") sw.register("sw.js").then(function(){ return sw.ready; }).then(function(reg){
    if (sw.controller) gardePolices(reg); else sw.addEventListener("controllerchange", function(){ gardePolices(reg); });
  }).catch(function(){});
  function saisieEnCours(){
    var a = document.activeElement;
    return !!(a && a.tagName === "INPUT" && a.type !== "checkbox" && a.value) || !!(window.scolairOccupe && window.scolairOccupe());
  }
  /* Un seul essai de rechargement toutes les deux minutes pour une même version : jamais de boucle si le réseau sert encore l'ancienne page. */
  function recharge(v){
    try {
      var k = "maj:" + v, t = Number(sessionStorage.getItem(k) || 0);
      if (Date.now() - t < 120000) return;
      sessionStorage.setItem(k, String(Date.now()));
    } catch (e) {}
    location.reload();
  }
  function verifie(){
    if (document.hidden || location.protocol.indexOf("http") !== 0 || Date.now() - dernier < 300000) return;
    dernier = Date.now();
    fetch("version.json?t=" + dernier, { cache: "no-store" }).then(function(r){ return r.ok ? r.json() : null; }).then(function(j){
      if (j && j.v && j.v !== V && !saisieEnCours()) recharge(j.v);
    }).catch(function(){});
  }
  document.addEventListener("visibilitychange", verifie);
  window.addEventListener("pageshow", verifie);
})();
