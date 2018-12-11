This demo explains how PWA ( Progresive Web App ) feature can be added to an existing website.

Instructions:

Clone the repository to your local system.

execte the following in cli

Note: you must have npm installed in global scope

yarn 
yarn sw:generate // to generate the Service Worker using workbox

for test server
yarn sw:test // to convert the generated sw to installable file


for production 
yarn sw:production //to create a minimised SW file.

To experiment:
find the workbox-config.js file in the root and experiment with the caching strategies and URL patterns.
