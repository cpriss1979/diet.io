self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("flab-to-fab-cache").then((cache) => {
            return cache.addAll([
                "/fittofab.io/",
                "/fittofab.io/index.html",
                "/fittofab.io/styles.css",
                "/fittofab.io/app.js",
                "/fittofab.io/.nojekyll",
                "/fittofab.io/404.html",
                "/fittofab.io/calculator.html",
                "/fittofab.io/exercises.html",
                "/fittofab.io/foods.html",
                "/fittofab.io/foods0.html",
                "/fittofab.io/manifest.json",
                "/fittofab.io/progress.html",
                "/fittofab.io/script.js",
                "/fittofab.io/yoga.png",
                "/fittofab.io/ZibbyDiamonds.png",
                "/fittofab.io/ZibbyDiamonds0.png"
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
