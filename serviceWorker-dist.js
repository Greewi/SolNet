let version = "solnet-alpha-1";
let sources = [
    //<DebutSources
    // Le contenu ici sera généré par la commande :
    // node build
    //FinSources>
];

this.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(version).then((cache) => {
            return cache.addAll(sources);
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