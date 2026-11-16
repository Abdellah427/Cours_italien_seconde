// Mise à jour : hors ligne grâce au service worker ; au retour dans l'app, on recharge si une version plus récente est en ligne.
(function(){
  var V = "__V__", dernier = 0;
  if ("serviceWorker" in navigator && location.protocol === "https:") navigator.serviceWorker.register("sw.js").catch(function(){});
  function saisieEnCours(){
    var a = document.activeElement;
    return !!(a && a.tagName === "INPUT" && a.value);
  }
  function verifie(){
    if (document.hidden || location.protocol.indexOf("http") !== 0 || Date.now() - dernier < 300000) return;
    dernier = Date.now();
    fetch("version.json?t=" + dernier, { cache: "no-store" }).then(function(r){ return r.ok ? r.json() : null; }).then(function(j){
      if (j && j.v && j.v !== V && !saisieEnCours()) location.reload();
    }).catch(function(){});
  }
  document.addEventListener("visibilitychange", verifie);
  window.addEventListener("pageshow", verifie);
})();
