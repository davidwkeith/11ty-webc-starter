export default class {
  data() {
    return {
      permalink: '/service-worker.js',
      eleventyExcludeFromCollections: true,
    };
  }

  render(data) {
    const urlsToCache = [
      '/',
      '/index.html',
      // Add all HTML pages
      ...data.collections.all
        .filter((item) => item.outputPath && item.outputPath.endsWith('.html'))
        .map((item) => item.url),
      // Add bundled CSS and JS
      ...(data.bundles
        ? Object.values(data.bundles)
            .flat()
            .map((bundle) => bundle.url)
        : []),
      // Add static assets
      '/img/favicon.svg',
      '/icon-192.png',
      '/icon-512.png',
      '/manifest.webmanifest',
    ];

    return `
const CACHE_NAME = '11ty-webc-starter-v1';
const urlsToCache = ${JSON.stringify(urlsToCache, null, 2)};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});
`;
  }
}
