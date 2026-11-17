// Hors ligne : la page est gardée en mémoire ; en ligne, la version la plus récente est toujours chargée.
const CACHE = "scolair-maths-v1";
const POLICE = /^https:\/\/fonts\.(googleapis|gstatic)\.com\//;
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["./", "manifest.webmanifest", "icon-192.png", "icon-180.png"])).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.url.indexOf("version.json") >= 0) return;
  e.respondWith(
    fetch(e.request).then((r) => {
      if (r && (r.ok || r.type === "opaque")) { const copie = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copie)); }
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || (e.request.mode === "navigate" ? caches.match("./") : Response.error())))
  );
});
// La page donne la liste des fichiers de police dont elle a besoin (chargés avant que le service worker soit actif) : on les garde aussi.
self.addEventListener("message", (e) => {
  const urls = e.data && e.data.garder;
  if (!Array.isArray(urls)) return;
  e.waitUntil(caches.open(CACHE).then((c) => Promise.all(urls.filter((u) => POLICE.test(u)).map((u) =>
    c.match(u).then((m) => m || fetch(u).then((r) => { if (r && r.ok) return c.put(u, r); })).catch(() => {})))));
});
