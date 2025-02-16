self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("flab-to-fab-cache").then((cache) => {
            return cache.addAll([
    
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/.nojekyll",
  "/404.html",
  "/calculator.html",
  "/exercises.html",
  "/foods.html",
  "/foods0.html",
  "/manifest.json",
  "/progress.html",
  "/script.js",
  "/yoga.png",
  "/ZibbyDiamonds.png",
  "/ZibbyDiamonds0.png"
                
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
