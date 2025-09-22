// Professional Service Worker for Inovara Vending Solutions
// Version: 2.0.0 - Complete rewrite with comprehensive error handling

const CACHE_NAME = 'inovara-vending-v2.0.0';
const STATIC_CACHE = 'static-cache-v2.0';
const DYNAMIC_CACHE = 'dynamic-cache-v2.0';

// Critical resources to cache immediately
const CRITICAL_RESOURCES = [
  '/',
  '/index.html',
  '/logo.svg',
  '/site.webmanifest'
];

// Utility function to check if URL is cacheable
function isCacheableUrl(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol.startsWith('http') && 
           !urlObj.protocol.includes('chrome-extension') &&
           !urlObj.protocol.includes('moz-extension') &&
           !urlObj.protocol.includes('safari-extension') &&
           !urlObj.protocol.includes('data') &&
           !urlObj.protocol.includes('blob');
  } catch (error) {
    return false;
  }
}

// Utility function to safely cache a response
async function safeCachePut(cache, request, response) {
  try {
    if (isCacheableUrl(request.url)) {
      await cache.put(request, response);
      return true;
    }
  } catch (error) {
    console.debug('Cache put failed for URL:', request.url, error.message);
  }
  return false;
}

// Install event - cache critical resources
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching critical resources...');
        return cache.addAll(CRITICAL_RESOURCES);
      })
      .then(() => {
        console.log('Service Worker installed successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker installation failed:', error);
      })
  );
});

// Activate event - clean up old caches and take control
self.addEventListener('activate', event => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        const deletePromises = cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        });
        return Promise.all(deletePromises);
      })
      .then(() => {
        console.log('Service Worker activated successfully');
        return self.clients.claim();
      })
      .catch(error => {
        console.error('Service Worker activation failed:', error);
      })
  );
});

// Fetch event - professional caching strategy
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip non-cacheable URLs entirely
  if (!isCacheableUrl(request.url)) {
    return;
  }

  try {
    const url = new URL(request.url);
    
    // Handle different types of requests
    if (url.origin === location.origin) {
      // Same-origin requests - cache first strategy
      event.respondWith(handleSameOriginRequest(request));
    } else if (isFontRequest(url)) {
      // Font requests - cache with long TTL
      event.respondWith(handleFontRequest(request));
    } else if (isAnalyticsRequest(url)) {
      // Analytics requests - network first, never cache
      event.respondWith(handleAnalyticsRequest(request));
    } else {
      // Other external requests - network first
      event.respondWith(handleExternalRequest(request));
    }
  } catch (error) {
    console.debug('Fetch event error:', error.message);
    // Let the browser handle the request normally
  }
});

// Check if request is for fonts
function isFontRequest(url) {
  return url.hostname.includes('fonts.googleapis.com') || 
         url.hostname.includes('fonts.gstatic.com') ||
         url.pathname.includes('.woff') ||
         url.pathname.includes('.woff2') ||
         url.pathname.includes('.ttf') ||
         url.pathname.includes('.eot');
}

// Check if request is for analytics
function isAnalyticsRequest(url) {
  return url.hostname.includes('googletagmanager.com') ||
         url.hostname.includes('google-analytics.com') ||
         url.hostname.includes('analytics.google.com') ||
         url.hostname.includes('gtag') ||
         url.hostname.includes('ga.js') ||
         url.hostname.includes('analytics.js');
}

// Handle same-origin requests with cache-first strategy
async function handleSameOriginRequest(request) {
  try {
    // Try cache first
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      // Update cache in background
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
    console.debug('Same-origin request failed:', error.message);
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
      await safeCachePut(cache, request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.debug('Font request failed:', error.message);
    return new Response('Font unavailable', { status: 503 });
  }
}

// Handle analytics requests with network-first strategy
async function handleAnalyticsRequest(request) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
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
    
    // Return fresh response without caching
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
    console.debug('Analytics request failed:', error.message);
    return new Response('', { status: 200 });
  }
}

// Handle external requests
async function handleExternalRequest(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    console.debug('External request failed:', error.message);
    return new Response('External resource unavailable', { status: 503 });
  }
}

// Update cache in background - professional implementation
async function updateCacheInBackground(request) {
  // Skip if not cacheable
  if (!isCacheableUrl(request.url)) {
    return;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      await safeCachePut(cache, request, networkResponse.clone());
    }
  } catch (error) {
    // Silently fail for background updates
    console.debug('Background cache update failed:', error.message);
  }
}

// Handle background sync
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Perform background sync operations
  console.log('Background sync executed');
}

// Handle push notifications
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
      console.error('Push notification error:', error);
    }
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/')
  );
});

// Handle service worker errors
self.addEventListener('error', event => {
  console.error('Service Worker error:', event.error);
});

self.addEventListener('unhandledrejection', event => {
  console.error('Service Worker unhandled rejection:', event.reason);
});

console.log('Service Worker loaded successfully');