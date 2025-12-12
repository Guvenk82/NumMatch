// Service Worker for NumMatch PWA
const CACHE_NAME = 'nummatch-v2';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  // Don't wait for other service workers
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Don't fail if some files don't exist
        return cache.addAll(urlsToCache).catch((error) => {
          console.log('Cache addAll failed (non-critical):', error);
          // Continue even if caching fails
          return Promise.resolve();
        });
      })
      .catch((error) => {
        console.log('Cache open failed (non-critical):', error);
        return Promise.resolve();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  // Only handle GET requests and same-origin requests
  if (event.request.method !== 'GET') {
    return;
  }
  
  // Only handle same-origin requests
  const url = new URL(event.request.url);
  if (url.origin !== location.origin) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request).catch((error) => {
          console.log('Fetch failed:', error);
          // Return a basic response if fetch fails
          return new Response('Offline', { 
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
      .catch((error) => {
        console.log('Cache match failed:', error);
        // Fallback to network
        return fetch(event.request).catch(() => {
          return new Response('Offline', { 
            status: 503,
            headers: { 'Content-Type': 'text/plain' }
          });
        });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      ).then(() => {
        // Force update by claiming all clients
        return self.clients.claim();
      });
    })
  );
});

