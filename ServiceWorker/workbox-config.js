
module.exports = {

    // workbox import form
    importWorkboxFrom: 'local', //{ local | cdn }

    // main global/public dir
    globDirectory: "public",

    // maximum file size
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,

    // global pattern for pre catching static assets
    globPatterns: [
        "*{javascripts,stylesheets}*/*.{js,css,jpg,jpeg,png}"
    ],

    // sw generate destination
    swDest: "public/sw_generated.js",

    // cache and indexedDb name
    cacheId: 'sw',

    skipWaiting: true,
    clientsClaim: true,

    // for run time caching
    runtimeCaching: [
        {
            // Match any request ends with .png, .jpg, .jpeg or .svg.
            urlPattern: /(^((?!images\/).)*(jpg|jpeg|png|gif|svg|ico))$/,

            // Apply a cache-first strategy.
            // for more information about cache strategies visit https://developers.google.com/web/tools/workbox/modules/workbox-strategies
            handler: 'cacheFirst', // { cacheFirst | staleWhileRevalidate | networkFirst }

            options: {

                // Use a custom cache name.
                cacheName: 'images',

                // Only cache 100 images.
                expiration: {
                    maxEntries: 100,
                },
            },
        },
        {
            // Match any request ends with css|js|ttf|eot|woff|woff2
            urlPattern: /(^((?!(javascripts|stylesheets)).)*(css|js|ttf|eot|woff|woff2))$/,

            // Apply a cache-first strategy.
            handler: 'cacheFirst', // { cacheFirst | staleWhileRevalidate | networkFirst }

            options: {

                // Use a custom cache name.
                cacheName: 'assets',

                // Only cache 100 files.
                expiration: {
                    maxEntries: 100,
                },
            },
        },
        {
            // match any url, you can use custom RegEx pattern for caching any page
            urlPattern:  /(.*)\/(.*)/,

            // apply network-First strategy
            handler: 'networkFirst', // { cacheFirst | staleWhileRevalidate | networkFirst }

            options: {

                cacheName: 'offline-pages',

                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        }
    ],

    // ignore path for catching
    navigateFallbackBlacklist: [ /(.*((CacheManager|sw).).*(js|css))|(.*((workbox-.*\/).).*(js|css))/ ],

    // import other files
    importScripts: ["./CacheManager.js"],

    // google analytics for offline browsing
    offlineGoogleAnalytics: true

};
