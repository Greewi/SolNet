let version = "<version>";
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
            for (let i = 0; i < sources.length; i++)
                sources[i] = new Request(sources[i], { cache: 'no-cache' });
            return cache.addAll(sources);
        }).then(()=>{
            const channel = new BroadcastChannel('sw-messages');
            channel.postMessage({version:version});
        })
    );
});

this.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName != version;
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
        caches.open(version)
            .then((cache) => {
                return cache.match(event.request);
            })
            .then((response) => {
                console.log(response);
                return response || fetch(event.request);
            })
            .catch((error) => {
                console.error(error);
                return fetch(event.request);
            })
    );
});

this.addEventListener('message', function (event) {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});
