// This file is intentionally without code.
// It's present so that service worker registration will work when serving from the 'app' directory.
// The version of service-worker.js that's present in the 'dist' directory is automatically
// generated by the 'generate-service-worker' gulp task, and contains code to precache resources.

// https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja
const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '/',
    '/styles/main.css',
    '/scripts/main.js',
    '/images/cat.svg'
];

// Observer install event
self.addEventListener ('install', (event) => {
    event.waitUntil (
        caches.open (CACHE_NAME)
            .then ((cache) => {
                return cache.addAll (urlsToCache);
            })
    );
});

self.addEventListener ('activate', event => {
    console.log ('V1 now ready to handle fetches!');
});

self.addEventListener ('fetch', (event) => {

    const url = new URL (event.request.url);

    // serve the cat SVG from the cache if the request is
    // same-origin and the path is '/dog.svg'
    if (url.origin == location.origin && url.pathname == '/images/dog.svg') {
        event.respondWith (caches.match ('/images/cat.svg'));
    }

    /*
    event.respondWith (
        caches.match (event.requst)
            .then ((response) => {
                // キャッシュがあったのでそのレスポンスを返す
                if (response) {
                    return response;
                }

                const fetchRequest = event.request.clone ();

                return fetch (fetchRequest).then (
                    (response) => {
                        // 正しいレスポンスなのかチェック
                        if (!response || response.state !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        const responseToCache = response.clone ();

                        caches.open (CACHE_NAME)
                            .then ((cache) => {
                                cache.put (event.request, responseToCache);
                            });

                        return response;
                    }
                );
            })
    );
    */
});