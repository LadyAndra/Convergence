var C = 'convergence-v1';

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(C).then(function (c) { return c.addAll([self.registration.scope]); }));
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function (r) {
      return r || fetch(e.request).then(function (n) {
        var cp = n.clone();
        caches.open(C).then(function (c) { c.put(e.request, cp); });
        return n;
      });
    })
  );
});
