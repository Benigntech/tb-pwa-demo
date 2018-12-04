/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("workbox-v3.6.3/workbox-sw.js");
workbox.setConfig({modulePathPrefix: "workbox-v3.6.3"});

importScripts(
  "./CacheManager.js"
);

workbox.core.setCacheNameDetails({prefix: "sw"});

workbox.skipWaiting();
workbox.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "javascripts/bootstrap.min.js",
    "revision": "5869c96cc8f19086aee625d670d741f9"
  },
  {
    "url": "javascripts/jquery.min.js",
    "revision": "e071abda8fe61194711cfc2ab99fe104"
  },
  {
    "url": "javascripts/notify.min.js",
    "revision": "37ad78b7c171c572c10ec77084ac1f08"
  },
  {
    "url": "stylesheets/bootstrap.min.css",
    "revision": "ec3bb52a00e176a7181d454dffaea219"
  },
  {
    "url": "stylesheets/style.css",
    "revision": "d513fc040a31435f4a2ca9606a2be3ef"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

workbox.routing.registerRoute(/(^((?!images\/).)*(jpg|jpeg|png|gif|svg|ico))$/, workbox.strategies.cacheFirst({ "cacheName":"images", plugins: [new workbox.expiration.Plugin({"maxEntries":100,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/(^((?!(javascripts|stylesheets)).)*(css|js|ttf|eot|woff|woff2))$/, workbox.strategies.cacheFirst({ "cacheName":"assets", plugins: [new workbox.expiration.Plugin({"maxEntries":100,"purgeOnQuotaError":false})] }), 'GET');
workbox.routing.registerRoute(/(.*)\/(.*)/, workbox.strategies.networkFirst({ "cacheName":"offline-pages", plugins: [new workbox.cacheableResponse.Plugin({"statuses":[0,200]})] }), 'GET');
