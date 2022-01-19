//importScripts('https://momentjs.com/downloads/moment.min.js');
//workbox.precaching.precacheAndRoute(self.__precacheManifest);
//const cacheExpTime = moment().add(1, 'day');
//const cacheTimeLeft = moment.duration(cacheExpTime.diff(moment())).asSeconds();
//workbox.routing.registerRoute(
//    /\.(?:png|ico|gif|jpg|jpeg|svg)$/,
//    new workbox.strategies.StaleWhileRevalidate({
//        cacheName: 'images',
//        plugins: [
//            new workbox.expiration.Plugin({
//                maxEntries: 60,
//                maxAgeSeconds: cacheTimeLeft, // 1 day
//            }),
//        ],
//    })
//);
importScripts("/precache-manifest.7b241a43a2278739512d45eb32884cc1.js");
importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
workbox.core.setCacheNameDetails({prefix: "vue-pwa"});
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});