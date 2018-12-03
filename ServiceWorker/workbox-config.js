
module.exports = {

    //workbox import form
    importWorkboxFrom: 'local',

    //main dir
    globDirectory: "public",

    //maximum file size
    maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,

    //precache patterns
    // globPatterns: [
    //     "build/0*.{js,css}", "build/polyfill*.{js,css}", 'build/manifest*.{js,css}', 'build/vendor*.{js,css}', 'build/app*.{js,css}', 'build/material*.{js,css}'
    // ],

    globPatterns: [
        "**/*.{js,css}"
    ],

    //cache destination
    swDest: "public/sw_generated.js",

    //cache and indexedDb name
    cacheId: 'sw',

    skipWaiting: true,
    clientsClaim: true,

    runtimeCaching: [
        {
            // Match any request ends with .png, .jpg, .jpeg or .svg.
            urlPattern: /(^((?!images\/).)*(jpg|jpeg|png|gif|svg))$/,

            // Apply a cache-first strategy.
            handler: 'cacheFirst',

            options: {

                // Use a custom cache name.
                cacheName: 'images',

                // Only cache 100 images.
                expiration: {
                    maxEntries: 100,
                },
            },
        }, {
            // Match any request ends with css|js|ttf|eot|woff|woff2
            urlPattern: /(^((?!(javascripts|stylesheets)).)*(css|js|ttf|eot|woff|woff2))$/,

            // Apply a cache-first strategy.
            handler: 'cacheFirst',

            options: {
                // Use a custom cache name.
                cacheName: 'assets',

                // Only cache 100 files.
                expiration: {
                    maxEntries: 100,
                },
            },
        }, {
            urlPattern:  /(.*)\/(.*)/,
            handler: 'networkFirst',
            options: {

                cacheName: 'offline-pages',

                cacheableResponse: {
                    statuses: [0, 200]
                }
            }
        }
    ]

    // navigateFallbackBlacklist: [ /(.*(admin.).*(js|css))/ ],
    //
    // importScripts: ["./CacheManager.min.js"],
    //
    // offlineGoogleAnalytics: true
};
