// Professional Service Worker for Production
const CACHE_NAME = 'inovara-vending-v2.0.0';
const STATIC_CACHE = 'static-cache-v2';
const DYNAMIC_CACHE = 'dynamic-cache-v2';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/logo.svg',
  '/site.webmanifest'
];

// Resources to cache with longer TTL
const STATIC_RESOURCES = [
  '/src/main.tsx',
  '/src/App.tsx',
  '/src/index.css',
  '/logo.svg',
  '/site.webmanifest',
  '/browserconfig.xml'
];

// Professional error handling utility
const handleCacheError = (error, context = 'cache operation') => {
  console.debug(`Service Worker ${context} failed:`, error.message);
  // In production, we silently fail to avoid cluttering console
  return false;
};

// Professional request validation
const isValidRequest = (request) => {
  // Only handle GET requests
  if (request.method !== 'GET') {
    return false;
  }
  
  // Only handle HTTP/HTTPS requests
  if (!request.url.startsWith('http')) {
    return false;
  }
  
  // Skip chrome-extension, data, blob, and other non-web schemes
  try {
    const url = new URL(request.url);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (error) {
    return false;
  }
};

// Professional cache operation with error handling
const safeCachePut = async (cache, request, response) => {
  try {
    if (isValidRequest(request)) {
      await cache.put(request, response);
      return true;
    }
  } catch (error) {
    handleCacheError(error, 'cache put');
  }
  return false;
};

// Install event - cache critical resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        // Force activation of new service worker
        return self.skipWaiting();
      })
      .catch(error => {
        handleCacheError(error, 'install');
      })
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
      .then(() => {
        // Take control of all clients immediately
        return self.clients.claim();
      })
      .catch(error => {
        handleCacheError(error, 'activate');
      })
  );
});

// Professional fetch event handler
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Validate request before processing
  if (!isValidRequest(request)) {
    return;
  }

  try {
    const url = new URL(request.url);
    
    // Route requests based on origin
    if (url.origin === location.origin) {
      event.respondWith(handleSameOriginRequest(request));
    } else if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
      event.respondWith(handleFontRequest(request));
    } else if (url.hostname.includes('www.googletagmanager.com') || 
               url.hostname.includes('www.google-analytics.com') ||
               url.hostname.includes('analytics.google.com') ||
               url.hostname.includes('googletagmanager.com')) {
      event.respondWith(handleAnalyticsRequest(request));
    } else {
      event.respondWith(handleExternalRequest(request));
    }
  } catch (error) {
    handleCacheError(error, 'fetch routing');
    // Fallback to network request
    event.respondWith(fetch(request));
  }
});

// Professional same-origin request handler
async function handleSameOriginRequest(request) {
  try {
    // Check cache first
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
      await safeCachePut(cache, request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    handleCacheError(error, 'same-origin request');
    return new Response('Network error', { status: 503 });
  }
}

// Professional font request handler
async function handleFontRequest(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      await safeCachePut(cache, request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    handleCacheError(error, 'font request');
    return new Response('Font unavailable', { status: 503 });
  }
}

// Professional analytics request handler
async function handleAnalyticsRequest(request) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const networkResponse = await fetch(request, {
      signal: controller.signal,
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    clearTimeout(timeoutId);
    
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
    handleCacheError(error, 'analytics request');
    return new Response('', { status: 200 });
  }
}

// Professional external request handler
async function handleExternalRequest(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    handleCacheError(error, 'external request');
    return new Response('External resource unavailable', { status: 503 });
  }
}

// Professional background cache update
async function updateCacheInBackground(request) {
  try {
    // Validate request before processing
    if (!isValidRequest(request)) {
      return;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      await safeCachePut(cache, request, networkResponse.clone());
    }
  } catch (error) {
    handleCacheError(error, 'background update');
  }
}

// Professional background sync handler
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Professional background sync operations
  try {
    // Add any background sync logic here
  } catch (error) {
    handleCacheError(error, 'background sync');
  }
}

// Professional push notification handler
self.addEventListener('push', event => {
  if (event.data) {
    try {
      const data = event.data.json();
      const options = {
        body: data.body,
        icon: '/logo.svg',
        badge: '/logo.svg',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      };
      
      event.waitUntil(
        self.registration.showNotification(data.title, options)
      );
    } catch (error) {
      handleCacheError(error, 'push notification');
    }
  }
});

// Professional notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Professional message handler for force updates
self.addEventListener('message', event => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// Professional error reporting
self.addEventListener('error', event => {
  handleCacheError(event.error, 'global error');
});

self.addEventListener('unhandledrejection', event => {
  handleCacheError(event.reason, 'unhandled promise rejection');
});