self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("flab-to-fab-cache").then((cache) => {
            return cache.addAll([
                "/",
                "/index.html",
                "/styles.css",
                "/app.js",
                "zibby.png",
                "zibby.png"
            ]);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
