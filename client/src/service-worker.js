/* eslint-disable no-restricted-globals */
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import {
  getAllDataFromCollection,
  addDataToCollection,
} from './util/indexedDb';
import { dummyGames, dummyPlayers } from './util/dummyData';

clientsClaim();

const additionalResourcesToCache = [
  { url: 'favicon.ico', revision: '1' },
  { url: 'service-worker.js', revision: null },
  { url: 'android-chrome-96x96.png', revision: '1' },
  { url: 'android-chrome-192x192.png', revision: '1' },
  { url: 'apple-touch-icon.png', revision: '1' },
  { url: 'browserconfig.xml', revision: '1' },
  { url: 'favicon-16x16.png', revision: '1' },
  { url: 'favicon-32x32.png', revision: '1' },
  { url: 'app.webmanifest', revision: '1' },
  { url: 'safari-pinned-tab.svg', revision: '1' },
  { url: 'mstile-150x150.png', revision: '1' },
];

precacheAndRoute(self.__WB_MANIFEST.concat(additionalResourcesToCache));

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') return false;
    if (url.pathname.startsWith('/_')) return false;
    if (url.pathname.match(fileExtensionRegexp)) return false;
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

async function seedIfEmpty(collection, data) {
  const existing = await getAllDataFromCollection(collection);
  if (existing.length === 0) {
    for (const item of data) {
      await addDataToCollection(item, collection);
    }
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      seedIfEmpty('all_games', dummyGames),
      seedIfEmpty('all_players', dummyPlayers),
    ])
  );
});
