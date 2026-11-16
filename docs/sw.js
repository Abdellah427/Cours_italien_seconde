// Hors ligne : la page est gardée en mémoire ; en ligne, la version la plus récente est toujours chargée.
const CACHE = "evolutions-v1";
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(["./", "manifest.webmanifest", "icon-192.png", "icon-180.png"])).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || e.request.url.indexOf("version.json") >= 0) return;
  e.respondWith(
    fetch(e.request).then((r) => {
      if (r && (r.ok || r.type === "opaque")) { const copie = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, copie)); }
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then((r) => r || caches.match("./")))
  );
});
