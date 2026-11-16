/* ---------- Hector, la chouette de SCOLAIR ---------- */
// Une instance par emplacement : const owl = new Owl({ float, tap, taille, etat, sommeil }) ; owl.el se place dans un
// conteneur [data-owl-host] qui contient une .bubble. Les animations sont en CSS (transform et opacity) et pilotées
// par des classes : .is-<état> pour les états durables, .a-<geste> pour les gestes courts.
// Rien ne tourne hors écran, onglet caché ou après un long sommeil ; tout se calme si l'appareil demande moins d'animations.
const OWLS = new Set();
const SYMS = ["%", "×", "÷", "+", "1", "t", "C"];
const OWL_DE = new WeakMap();
const OWL_TAILLES = { petite: 40, s: 40, moyenne: 80, m: 80, grande: 160, l: 160 };
const OWL_CLASSES_TAILLE = { 40: "owl-petite", 80: "owl-moyenne", 160: "owl-grande" };
const OWL_ETATS = ["idle", "happy", "sad", "think", "sleep", "surprise", "read", "proud"];
const OWL_ETAT_ALIAS = { repos: "idle", joie: "happy", content: "happy", triste: "sad", reflechit: "think", reflechir: "think", dort: "sleep", sommeil: "sleep", endormi: "sleep", surpris: "surprise", lire: "read", lit: "read", lecture: "read", fier: "proud", fierte: "proud" };
// Gestes : durée en ms et parties occupées (c corps, a ailes, t tête, y yeux, x accessoire).
// Un geste interrompt ceux qui occupent les mêmes parties ; « etat » : le geste passe par un état temporaire.
const OWL_ANIMS = {
  cligne: { ms: 200, p: "y" }, clin: { ms: 800, p: "ty" }, saut: { ms: 700, p: "ca" }, ailes: { ms: 900, p: "ca" },
  salut: { ms: 1500, p: "at" }, oui: { ms: 800, p: "t" }, non: { ms: 900, p: "t" }, danse: { ms: 1600, p: "caty" },
  toque: { ms: 2000, p: "catyx" }, fierte: { ms: 1800, p: "caty" }, jokr: { ms: 2400, p: "atyx" }, surprise: { ms: 1100, p: "caty" },
  reveil: { ms: 1400, p: "caty" }, rire: { ms: 900, p: "cay" }, tourne: { ms: 900, p: "c" }, ebouriffe: { ms: 650, p: "ct" },
  lunettes: { ms: 1400, p: "y" }, regard: { ms: 1800, p: "ty" }, aigrette: { ms: 500, p: "t" }, parle: { ms: 450, p: "t" },
  loupe: { ms: 2300, p: "ayx" }, jongle: { ms: 1600, p: "ay" },
  reflechir: { ms: 1800, etat: "think" }, lire: { ms: 3400, etat: "read" }, dormir: { ms: 0, etat: "sleep" },
};
const OWL_ANIM_ALIAS = {
  blink: "cligne", wink: "clin", hop: "saut", jump: "saut", flap: "ailes", wave: "salut", nod: "oui", yes: "oui", shake: "non", no: "non",
  dance: "danse", cap: "toque", maitrise: "toque", proud: "fierte", pride: "fierte", joker: "jokr", "jok'r": "jokr", carte: "jokr",
  wake: "reveil", giggle: "rire", spin: "tourne", ruffle: "ebouriffe", glasses: "lunettes", look: "regard", talk: "parle",
  search: "loupe", chercher: "loupe", juggle: "jongle", think: "reflechir", read: "lire", sleep: "dormir", endormi: "dormir",
};
// En mode calme, certains gestes deviennent une pose fixe ; les autres ne font rien.
const OWL_POSES = { danse: "happy", fierte: "proud", toque: "happy", rire: "happy", saut: "happy", surprise: "surprise", reveil: null };
// Effets qui accompagnent certains gestes (étincelles, symboles, ! et ?).
const OWL_EFFETS = {
  toque: (o) => setTimeout(() => o.eclats(6), 1450),
  fierte: (o) => setTimeout(() => o.eclats(4), 300),
  danse: (o) => o.eclats(3),
  jokr: (o) => setTimeout(() => o.eclats(3, 70), 1000),
  surprise: (o) => o.marque("!"),
  reveil: (o) => o.marque("!"),
  jongle: (o) => o.symboles(),
};
let owlUid = 0;

class Owl {
  constructor(opts = {}) {
    this.opts = opts;
    this.id = ++owlUid;
    this.ne = performance.now();
    this.el = h('<div class="owl" role="img"></div>');
    this.el.setAttribute("aria-label", owlNom());
    if (opts.float) this.el.classList.add("owl-float");
    const tpl = $("#owl-tpl");
    const svg = tpl ? tpl.content.firstElementChild.cloneNode(true) : document.createElementNS("http://www.w3.org/2000/svg", "svg");
    // Les paupières sont découpées par des clipPath : identifiants propres à chaque Hector de la page.
    svg.querySelectorAll("[id]").forEach((n) => {
      const ancien = n.id;
      n.id = `${ancien}-${this.id}`;
      svg.querySelectorAll(`[clip-path="url(#${ancien})"]`).forEach((m) => m.setAttribute("clip-path", `url(#${n.id})`));
    });
    const souffle = document.createElement("div");
    souffle.className = "owl-souffle";
    souffle.appendChild(svg);
    this.fx = document.createElement("div");
    this.fx.className = "owl-fx";
    this.fx.setAttribute("aria-hidden", "true");
    this.el.append(souffle, this.fx);
    this.looks = [...svg.querySelectorAll(".owl-look")];
    this.state = "idle";
    this.runs = new Map();
    this.vu = true;
    this.attache = false;
    this.peutDormir = opts.sommeil !== false;
    this.dernierGeste = Date.now();
    this.dernierRire = "";
    this.taps = [];
    this.regardT = "";
    this.taille(opts.taille);
    this.dress();
    OWLS.add(this);
    OWL_DE.set(this.el, this);
    if (opts.tap !== false) {
      this.el.dataset.tap = "";
      this.el.addEventListener("click", () => this.touche());
    }
    if (owlCalme()) this.el.classList.add("owl-calme");
    owlDemarre();
    if (OWL_IO) OWL_IO.observe(this.el);
    if (opts.etat) this.set(opts.etat);
    this.planifie();
  }

  // Taille : "petite" (40 px), "moyenne" (80 px), "grande" (160 px) ou un nombre de pixels ; rien = la place du conteneur.
  taille(t) {
    Object.values(OWL_CLASSES_TAILLE).forEach((c) => this.el.classList.remove(c));
    const px = typeof t === "number" ? t : OWL_TAILLES[t];
    if (!px) { this.el.style.removeProperty("width"); return this; }
    if (typeof t !== "number" && OWL_CLASSES_TAILLE[px]) this.el.classList.add(OWL_CLASSES_TAILLE[px]);
    this.el.style.width = px + "px";
    return this;
  }

  // Lunettes et accessoires débloqués selon le niveau de l'élève.
  dress() {
    const lvl = typeof levelOf === "function" ? levelOf(S.xp || 0) : 1;
    const acc = (S.owl && S.owl.acc) || {};
    (typeof ACCS !== "undefined" ? ACCS : []).forEach((a) => this.el.classList.toggle("acc-" + a.k, lvl >= a.lvl && acc[a.k] !== false));
    const gl = typeof GLASSES !== "undefined" ? GLASSES : [];
    const g = gl.find((x) => x.c === (S.owl && S.owl.glasses) && x.lvl <= lvl) || gl[0];
    if (g) this.el.style.setProperty("--owl-glasses", g.c);
    return this;
  }

  // États durables : idle, happy, sad, think, sleep, surprise, read, proud (ms : retour au repos après ce délai).
  set(state, ms) {
    state = OWL_ETAT_ALIAS[state] || state;
    if (!OWL_ETATS.includes(state)) state = "idle";
    const avant = this.state;
    clearTimeout(this.stateT);
    if (state !== avant) {
      OWL_ETATS.forEach((s) => s !== "idle" && this.el.classList.toggle("is-" + s, s === state));
      this.state = state;
      this.el.classList.remove("owl-profond");
      this.zzz(state === "sleep");
      if (state === "sleep" || state === "think" || state === "read" || state === "sad") this.look(0, 0);
      if (state === "think") this.marque("?");
      if (state === "sleep") this.runs.forEach((r, k) => this.stop(k));
    }
    if (ms) this.stateT = setTimeout(() => { if (this.state === state) this.set("idle"); }, ms);
    this.planifie();
    return this;
  }

  // Gestes courts (voir OWL_ANIMS) ; renvoie une promesse résolue à la fin du geste.
  anim(nom, ms) {
    const cle = OWL_ANIM_ALIAS[nom] || nom, def = OWL_ANIMS[cle];
    if (!def) return Promise.resolve(false);
    this.dernierGeste = Date.now();
    if (def.etat) {
      this.set(def.etat, def.ms ? Math.max(def.ms, ms || 0) : 0);
      return new Promise((res) => setTimeout(() => res(true), def.ms || 0));
    }
    if (this.state === "sleep" && cle !== "reveil") this.set("idle");
    if (owlCalme()) return this.pose(cle, def);
    const relance = this.runs.has(cle);
    for (const k of [...this.runs.keys()]) if ([...def.p].some((c) => OWL_ANIMS[k].p.includes(c))) this.stop(k);
    const cls = "a-" + cle;
    if (relance) void this.el.offsetWidth;
    this.el.classList.add(cls);
    if (OWL_EFFETS[cle] && this.vu) OWL_EFFETS[cle](this);
    return new Promise((res) => {
      const t = setTimeout(() => { this.el.classList.remove(cls); this.runs.delete(cle); res(true); }, def.ms + 40);
      this.runs.set(cle, { t, res });
    });
  }
  stop(cle) {
    const r = this.runs.get(cle);
    if (!r) return;
    clearTimeout(r.t);
    this.el.classList.remove("a-" + cle);
    this.runs.delete(cle);
    r.res(false);
  }
  occupe(parties) { return [...this.runs.keys()].some((k) => !parties || [...parties].some((c) => OWL_ANIMS[k].p.includes(c))); }
  // Version immobile d'un geste (animations réduites).
  pose(cle, def) {
    const duree = Math.min(def.ms, 1400);
    if (cle === "jokr" || cle === "loupe") {
      const c = "p-" + cle;
      this.el.classList.add(c);
      return new Promise((res) => setTimeout(() => { this.el.classList.remove(c); res(true); }, duree));
    }
    const etat = OWL_POSES[cle];
    if (etat) this.set(etat, duree);
    return new Promise((res) => setTimeout(() => res(true), etat ? duree : 0));
  }
  // Joue un geste dès qu'Hector est à l'écran (utile juste après sa création).
  jouerQuandVisible(nom) {
    if (!OWL_IO) { setTimeout(() => this.anim(nom), 250); return; }
    if (this.vu && this.el.isConnected && this.attache) this.anim(nom);
    else this.attente = nom;
  }
  jouerEnAttente() {
    if (!this.attente || !this.vu || !this.el.isConnected) return;
    const a = this.attente;
    this.attente = null;
    setTimeout(() => this.anim(a), 220);
  }

  blink() {
    if (this.state === "sleep" || this.state === "happy" || this.state === "proud" || this.occupe("y") || owlCalme()) return;
    this.anim("cligne");
  }
  wink() { return this.anim("clin"); }
  look(dx, dy) {
    const t = dx || dy ? `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)` : "";
    if (t === this.regardT) return;
    this.regardT = t;
    this.looks.forEach((g) => (g.style.transform = t));
  }
  happy() { this.set("happy", 1600); this.anim("saut"); return this; }
  sad() { this.set("sad", 1800); return this; }
  cheer() { this.set("happy", 2600); this.anim("danse"); return this; }
  think(ms = 1800) { return this.set("think", ms); }
  sleep() { return this.set("sleep"); }
  // Réveil : discret quand l'élève revient ailleurs sur la page, complet quand on touche Hector.
  wake(discret) {
    if (this.state !== "sleep") return this;
    this.set("idle");
    if (!discret) this.anim("reveil");
    return this;
  }

  // Petits effets autour d'Hector.
  zzz(on) {
    const z = this.fx.querySelector(".owl-zzz");
    if (on && !z) this.fx.appendChild(h('<span class="owl-zzz"><span>z</span><span>z</span><span>Z</span></span>'));
    if (!on && z) z.remove();
  }
  marque(c) {
    if (owlCalme() || !this.vu) return;
    this.fx.querySelectorAll(".owl-marque").forEach((m) => m.remove());
    const m = document.createElement("span");
    m.className = "owl-marque";
    m.textContent = c;
    this.fx.appendChild(m);
    setTimeout(() => m.remove(), 1400);
  }
  eclats(n = 5, x0) {
    if (owlCalme() || !this.vu) return;
    for (let i = 0; i < n; i++) {
      const e = document.createElement("i");
      e.className = "owl-eclat";
      // Autour d'Hector (au-dessus de la tête ou sur les côtés), jamais sur son visage.
      const cote = i % 2 ? 1 : -1, haut = Math.random() < 0.4;
      const x = x0 != null ? x0 + (Math.random() * 18 - 9) : haut ? 22 + Math.random() * 46 : 45 + cote * (30 + Math.random() * 12);
      const y = x0 != null ? 30 + Math.random() * 30 : haut ? -10 + Math.random() * 8 : 4 + Math.random() * 40;
      e.style.cssText = `--x:${Math.max(0, Math.min(88, x)).toFixed(0)}%;--y:${y.toFixed(0)}%;--d:${(i * 0.09).toFixed(2)}s`;
      this.fx.appendChild(e);
      setTimeout(() => e.remove(), 1500);
    }
  }
  symboles() {
    if (owlCalme() || !this.vu) return;
    for (let k = 0; k < 4; k++) setTimeout(() => {
      const s = document.createElement("span");
      s.className = "owl-sym";
      s.textContent = pick(SYMS);
      s.style.setProperty("--x", (26 + Math.random() * 48).toFixed(0) + "%");
      this.fx.appendChild(s);
      setTimeout(() => s.remove(), 1600);
    }, k * 200);
  }
  juggle() { return this.anim("jongle"); }

  // Toucher Hector : il se réveille, ou il rit (chatouilles).
  touche() {
    owlActivite();
    if (this.state === "sleep") { this.wake(); this.say("reveil", null, { muet: true }); return; }
    this.tickle();
  }
  tickle() {
    S.taps = (S.taps || 0) + 1;
    if (typeof save === "function") save();
    if (typeof checkBadges === "function") checkBadges();
    const now = Date.now();
    this.taps = this.taps.filter((t) => now - t < 2500).concat(now);
    const texte = msg("chatouille");
    this.speak(texte, { muet: true });
    owlReactionChatouille(this, texte, this.taps.length);
    return texte;
  }

  // Parole : dans la bulle de l'hôte [data-owl-host], sinon dans une petite bulle passagère.
  speak(text, opts = {}) {
    if (!text) return this;
    if (this.state === "sleep") this.set("idle");
    const host = this.el.closest("[data-owl-host]"), b = host && host.querySelector(".bubble");
    const html = typeof inline === "function" ? inline(String(text)) : esc(String(text));
    if (b) { b.innerHTML = html; b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop"); }
    else if (opts.bulle !== false) owlBulle(this, html);
    if (!opts.muet && (this.state === "idle" || this.state === "happy") && !this.occupe("t") && !owlCalme()) this.anim("parle");
    this.texte = String(text);
    return this;
  }
  say(cat, ctx, opts) { const t = msg(cat, ctx || {}); if (t) this.speak(t, opts); return t; }
  react(evenement, donnees) { return coach.react(evenement, Object.assign({}, donnees, { owl: this })); }

  // Vie au repos : clignements irréguliers et, de temps en temps, un petit geste. Un seul minuteur par Hector visible.
  actif() { return this.vu && !document.hidden && this.el.isConnected && !owlCalme(); }
  planifie() {
    clearTimeout(this.vieT);
    this.vieT = 0;
    if (!this.actif() || this.state === "sleep") return;
    this.vieT = setTimeout(() => this.vie(), 1800 + Math.random() * 4200);
  }
  vie() {
    this.vieT = 0;
    if (!this.actif()) return;
    if (this.state === "idle" && !this.runs.size && Date.now() - this.dernierGeste > 15000 && Math.random() < 0.3) {
      this.anim(pick(["regard", "aigrette", "regard", "ebouriffe"]));
    } else {
      this.blink();
      if (Math.random() < 0.15) setTimeout(() => this.blink(), 300);
    }
    this.planifie();
  }

  destroy() {
    clearTimeout(this.vieT);
    clearTimeout(this.stateT);
    this.runs.forEach((r) => clearTimeout(r.t));
    this.runs.clear();
    if (OWL_IO) OWL_IO.unobserve(this.el);
    OWLS.delete(this);
  }
}

function owlNom() { return `${ASSO.chouette || "Hector"}, la chouette de ${ASSO.nom || "SCOLAIR"}`; }

// Mode calme : préférence de l'appareil (ou forcé pour un test).
const owlMq = window.matchMedia ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
let owlForceCalme = false;
function owlCalme() { return owlForceCalme || (typeof reduceMotion !== "undefined" && reduceMotion) || !!(owlMq && owlMq.matches); }
function owlCalmeChange() {
  const c = owlCalme();
  OWLS.forEach((o) => {
    o.el.classList.toggle("owl-calme", c);
    if (c) { o.runs.forEach((r, k) => o.stop(k)); o.look(0, 0); }
    o.planifie();
  });
}

// À l'écran ou non : un seul observateur pour tous les Hector.
const OWL_IO = "IntersectionObserver" in window ? new IntersectionObserver((entries) => {
  for (const en of entries) {
    const o = OWL_DE.get(en.target);
    if (!o) continue;
    if (en.target.isConnected) o.attache = true;
    else if (o.attache) { o.destroy(); continue; }
    o.vu = en.isIntersecting;
    o.el.classList.toggle("owl-off", !o.vu);
    if (o.vu) { o.planifie(); o.jouerEnAttente(); } else { clearTimeout(o.vieT); o.vieT = 0; }
  }
}, { rootMargin: "60px 0px" }) : null;

// Activité de l'élève : sommeil après une minute sans rien faire, sommeil profond (plus aucune animation) deux minutes plus tard.
const OWL_SOMMEIL_MS = 60000, OWL_PROFOND_MS = 120000, OWL_GESTES_REPOS = ["cligne", "regard", "aigrette", "ebouriffe", "parle"];
let owlActifA = Date.now(), owlSommeilT = 0, owlProfondT = 0, owlEstProfond = false, owlLance = false;
let owlPtr = null, owlRaf = 0, owlRetourT = 0;
function owlActivite() {
  owlActifA = Date.now();
  if (owlProfondT) { clearTimeout(owlProfondT); owlProfondT = 0; }
  if (owlEstProfond) { owlEstProfond = false; OWLS.forEach((o) => o.el.classList.remove("owl-profond")); }
  if (!owlSommeilT) owlSommeilT = setTimeout(owlVerifieSommeil, OWL_SOMMEIL_MS);
}
function owlVerifieSommeil() {
  owlSommeilT = 0;
  const reste = OWL_SOMMEIL_MS - (Date.now() - owlActifA);
  if (reste > 400) { owlSommeilT = setTimeout(owlVerifieSommeil, reste); return; }
  let dort = false, occupe = false;
  OWLS.forEach((o) => {
    if (!o.el.isConnected) { if (o.attache) o.destroy(); return; }
    if (o.peutDormir && o.state === "idle" && o.vu && !document.hidden) {
      // Un clignement ou un petit geste de repos n'empêche pas de s'endormir ; un vrai geste, si (on revérifie bientôt).
      if ([...o.runs.keys()].every((k) => OWL_GESTES_REPOS.includes(k))) o.set("sleep");
      else occupe = true;
    }
    if (o.state === "sleep") dort = true;
  });
  if (occupe) owlSommeilT = setTimeout(owlVerifieSommeil, 3000);
  if (dort && !owlProfondT) owlProfondT = setTimeout(owlProfond, OWL_PROFOND_MS);
}
function owlProfond() {
  owlProfondT = 0;
  owlEstProfond = true;
  OWLS.forEach((o) => { if (o.state === "sleep") o.el.classList.add("owl-profond"); });
}
// Regard qui suit le doigt ou la souris (une seule mesure par image).
function owlPointeur(e) {
  owlActivite();
  owlPtr = e;
  if (!owlRaf) owlRaf = requestAnimationFrame(owlSuitRegard);
  if (e.type === "pointerdown" && e.pointerType !== "mouse") {
    clearTimeout(owlRetourT);
    owlRetourT = setTimeout(() => OWLS.forEach((o) => o.look(0, 0)), 1800);
  }
}
function owlSuitRegard() {
  owlRaf = 0;
  const e = owlPtr;
  if (!e || owlCalme()) return;
  OWLS.forEach((o) => {
    if (!o.vu || !o.el.isConnected || ["sleep", "think", "read", "sad"].includes(o.state)) return;
    const r = o.el.getBoundingClientRect();
    if (!r.width) return;
    const cx = r.left + r.width / 2, cy = r.top + r.height * 0.33;
    const dx = e.clientX - cx, dy = e.clientY - cy, d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / (60 + r.width));
    o.look((dx / d) * 22 * k, (dy / d) * 17 * k);
  });
}
function owlClic(e) {
  owlActivite();
  const cible = e.target && e.target.closest ? e.target.closest(".owl") : null;
  OWLS.forEach((o) => { if (o.state === "sleep" && o.el !== cible) o.wake(true); });
}
function owlClavier() {
  owlActivite();
  OWLS.forEach((o) => { if (o.state === "sleep") o.wake(true); });
}
function owlVisibilite() {
  const cache = document.hidden;
  OWLS.forEach((o) => {
    o.el.classList.toggle("owl-cache", cache);
    if (cache) { clearTimeout(o.vieT); o.vieT = 0; } else o.planifie();
  });
  if (!cache) owlActivite();
}
function owlDemarre() {
  if (owlLance) return;
  owlLance = true;
  const passif = { passive: true };
  document.addEventListener("pointermove", owlPointeur, passif);
  document.addEventListener("pointerdown", owlPointeur, passif);
  document.addEventListener("keydown", owlClavier, passif);
  document.addEventListener("wheel", owlActivite, passif);
  document.addEventListener("scroll", owlActivite, { passive: true, capture: true });
  document.addEventListener("click", owlClic, true);
  document.addEventListener("visibilitychange", owlVisibilite);
  if (owlMq) { if (owlMq.addEventListener) owlMq.addEventListener("change", owlCalmeChange); else if (owlMq.addListener) owlMq.addListener(owlCalmeChange); }
  owlActivite();
}

// Chatouilles : le geste suit la blague quand c'est possible, sinon un rire varié (jamais deux fois le même de suite).
const OWL_GESTES_BLAGUE = [
  [/270|tête|radians/i, "non"], [/tourne|cercle trigo/i, "tourne"], [/lunettes|flou/i, "lunettes"], [/jongl/i, "jongle"],
  [/danse/i, "danse"], [/quiz|hmm/i, "reflechir"], [/yeux|voir/i, "surprise"], [/plume/i, "ebouriffe"],
  [/récurrence|hérédité/i, "oui"], [/décimale|π/i, "regard"], [/mémoi'r|souvenir|oublier/i, "clin"],
  [/infini|croissant|limite|exponenti|géométrique|rire|ris |glousse/i, "rire"],
];
function owlReactionChatouille(o, texte, rafale) {
  let geste = (OWL_GESTES_BLAGUE.find(([re]) => re.test(texte || "")) || [])[1];
  if (!geste || geste === o.dernierRire) geste = pick(["rire", "saut", "ailes", "ebouriffe", "clin", "rire", "tourne"].filter((g) => g !== o.dernierRire));
  if (rafale >= 5 && rafale % 5 === 0) geste = "danse";
  o.dernierRire = geste;
  o.anim(geste);
}

// Bulle passagère quand Hector n'a pas de bulle à côté de lui.
let owlBulleEl = null, owlBulleT = 0;
function owlBulle(o, html) {
  if (!o.el.isConnected) return;
  const r = o.el.getBoundingClientRect();
  if (!r.width) return;
  if (owlBulleEl) owlBulleEl.remove();
  clearTimeout(owlBulleT);
  const b = h('<div class="owl-bulle" role="status"></div>');
  b.innerHTML = html;
  document.body.appendChild(b);
  const vw = document.documentElement.clientWidth, w = b.offsetWidth, hb = b.offsetHeight;
  const x = Math.max(8, Math.min(vw - w - 8, r.left + r.width / 2 - w / 2));
  let y = r.top - hb - 8;
  if (y < 8) y = r.bottom + 8;
  b.style.left = x + "px";
  b.style.top = y + "px";
  owlBulleEl = b;
  const fin = () => { b.remove(); if (owlBulleEl === b) owlBulleEl = null; window.removeEventListener("scroll", fin, true); };
  owlBulleT = setTimeout(fin, 3400);
  window.addEventListener("scroll", fin, { passive: true, capture: true });
}

// Salutation : le plus récent des Hector (créé à l'instant) fait le geste dès qu'il apparaît.
function owlSaluePlusTard(nom) {
  if (!nom) return;
  const now = performance.now();
  let o = null;
  OWLS.forEach((x) => { if (now - x.ne < 600 && (!o || x.ne > o.ne)) o = x; });
  if (o) o.jouerQuandVisible(nom);
}

function confetti() {
  if (owlCalme()) return;
  const box = h('<div class="confetti" aria-hidden="true"></div>');
  const cols = ["#4D61F4", "#FFDA1B", "#8897CB", "#F2B33D", "#17804A", "#C2352B"];
  const n = window.innerWidth < 500 ? 50 : 70;
  for (let i = 0; i < n; i++) box.appendChild(h(`<i style="left:${Math.random() * 100}%;background:${pick(cols)};animation-duration:${1.6 + Math.random() * 1.6}s;animation-delay:${Math.random() * 0.4}s;transform:rotate(${Math.random() * 360}deg)"></i>`));
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3800);
}
