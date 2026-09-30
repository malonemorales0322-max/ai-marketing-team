const CACHE = "mao-ai-team-github-v6";
const BASE = "/ai-marketing-team/";
const APP_SHELL = [
  BASE,
  `${BASE}index.html`,
  `${BASE}styles.css`,
  `${BASE}agents.js`,
  `${BASE}app.js`,
  `${BASE}manifest.webmanifest`
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(
      APP_SHELL.map(url => cache.add(url).catch(() => {}))
    );
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

function isPageRequest(request) {
  return request.mode === "navigate" || (request.headers.get("accept") || "").includes("text/html");
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    try {
      const fresh = await fetch(request);
      if (fresh && fresh.ok) {
        const cache = await caches.open(CACHE);
        cache.put(url.pathname === `${BASE}` || url.pathname === `${BASE}index.html` ? `${BASE}index.html` : request, fresh.clone());
      }
      return fresh;
    } catch {
      const cached = await caches.match(request) || await caches.match(url.pathname);
      if (cached) return cached;
      if (url.pathname.endsWith("agents.js") || url.pathname.endsWith("app.js")) {
        return caches.match(`${BASE}${url.pathname.split("/").pop()}`);
      }
      if (isPageRequest(request)) {
        return (await caches.match(`${BASE}index.html`)) || Response.error();
      }
      return Response.error();
    }
  })());
});
