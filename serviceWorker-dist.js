let version = "solnet-alpha-1.01";
let sources = [
    //<DebutSources
    // Le contenu ici sera généré par la commande :
    // node build
    //FinSources>
];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(version).then((cache) => {
            console.log(`Mise en cache : ${version}`);
            return cache.addAll(sources);
        })
    );
});

this.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName!=version;
                }).map(function (cacheName) {
                    console.log(`Nettoyage cache : ${cacheName}`);
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

this.addEventListener('fetch', function (event) {
    console.log(event);
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});