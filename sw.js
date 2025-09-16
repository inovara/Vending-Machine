const CACHE_NAME = 'inovara-v1.1.0';
const STATIC_CACHE = 'inovara-static-v1.1.0';
const DYNAMIC_CACHE = 'inovara-dynamic-v1.1.0';

const urlsToCache = [
  '/',
  '/index.html',
  '/inovaralo.svg',
  '/site.webmanifest',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
];

// Cache strategies
const CACHE_STRATEGIES = {
  static: ['/', '/index.html', '/inovaralo.svg', '/site.webmanifest'],
  fonts: ['fonts.googleapis.com', 'fonts.gstatic.com'],
  images: ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'],
  api: ['/api/']
};

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Opened static cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Fetch event with advanced caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Static assets - Cache First
  if (CACHE_STRATEGIES.static.some(path => url.pathname === path)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Fonts - Cache First with long TTL
  if (CACHE_STRATEGIES.fonts.some(domain => url.hostname.includes(domain))) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Images - Cache First
  if (CACHE_STRATEGIES.images.some(ext => url.pathname.includes(ext))) {
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE));
    return;
  }

  // API calls - Network First
  if (CACHE_STRATEGIES.api.some(path => url.pathname.startsWith(path))) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    return;
  }

  // Default - Network First
  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// Cache First strategy
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Cache First failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network First strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    console.error('Network First failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (![STATIC_CACHE, DYNAMIC_CACHE].includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});
