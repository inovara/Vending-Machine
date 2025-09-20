// Optimized Service Worker for Performance
const CACHE_NAME = 'inovara-vending-v1.0.0';
const STATIC_CACHE = 'static-cache-v1';
const DYNAMIC_CACHE = 'dynamic-cache-v1';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/inovara.svg',
  '/site.webmanifest'
];

// Resources to cache with longer TTL
const STATIC_RESOURCES = [
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/inovara.svg',
  '/site.webmanifest',
  '/browserconfig.xml'
];

// Install event - cache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - optimized caching strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (url.origin === location.origin) {
    // Same-origin requests
    event.respondWith(handleSameOriginRequest(request));
  } else if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    // Font requests - cache with long TTL
    event.respondWith(handleFontRequest(request));
  } else if (url.hostname.includes('www.googletagmanager.com') || 
             url.hostname.includes('www.google-analytics.com') ||
             url.hostname.includes('analytics.google.com') ||
             url.hostname.includes('googletagmanager.com')) {
    // Analytics requests - network first, never cache
    event.respondWith(handleAnalyticsRequest(request));
  } else {
    // Other external requests
    event.respondWith(handleExternalRequest(request));
  }
});

// Handle same-origin requests with cache-first strategy
async function handleSameOriginRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Serve from cache and update in background
      updateCacheInBackground(request);
      return cachedResponse;
    }
    
    // Fetch from network
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('Network error', { status: 503 });
  }
}

// Handle font requests with long-term caching
async function handleFontRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    return new Response('Font unavailable', { status: 503 });
  }
}

// Handle analytics requests with network-first strategy and error handling
async function handleAnalyticsRequest(request) {
  try {
    // Add timeout and retry logic for analytics requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const networkResponse = await fetch(request, {
      signal: controller.signal,
      cache: 'no-store', // Never cache analytics requests
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    clearTimeout(timeoutId);
    
    // Don't cache analytics responses, always return fresh data
    return new Response(networkResponse.body, {
      status: networkResponse.status,
      statusText: networkResponse.statusText,
      headers: {
        ...networkResponse.headers,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    return new Response('', { status: 200 });
  }
}

// Handle external requests with fallback
async function handleExternalRequest(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    return new Response('External resource unavailable', { status: 503 });
  }
}

// Update cache in background
async function updateCacheInBackground(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
  } catch (error) {
    // Silently fail for background updates
  }
}

// Handle background sync for offline functionality
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Perform background sync operations
}

// Handle push notifications (if needed)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/inovara.svg',
      badge: '/inovara.svg',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1
      }
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});