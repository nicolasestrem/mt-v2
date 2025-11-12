const CACHE_NAME = 'mobility-trailblazers-v2';
const IS_DEV = self.location.hostname === 'localhost';
const urlsToCache = [
  '/',
  '/favicon.ico',
  '/manifest.json',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png'
];

// Pages that should never be cached (thank you pages, forms, etc.)
const NEVER_CACHE = [
  '/danke-nominierung',
  '/danke-newsletter',
  '/api/'
];

// Third-party domains that should never be cached (analytics, tracking, etc.)
const THIRD_PARTY_SKIP_CACHE = [
  'google-analytics.com',
  'googletagmanager.com',
  'cloudflareinsights.com',
  'sociablekit.com',
  'tarteaucitron.io',
  'umami.is',
  'web3forms.com',
  'spreadshirtmedia.net'
];

// Install event - cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        if (IS_DEV) {
          console.log('Opened cache');
        }
        return cache.addAll(urlsToCache);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            if (IS_DEV) {
              console.log('Deleting old cache:', cacheName);
            }
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Helper function to check if URL should be cached
function shouldCache(url) {
  const urlObj = new URL(url);
  const urlPath = urlObj.pathname;

  // Skip sensitive pages
  if (NEVER_CACHE.some(pattern => urlPath.includes(pattern))) {
    return false;
  }

  // Skip third-party domains (analytics, tracking, etc.)
  if (THIRD_PARTY_SKIP_CACHE.some(domain => urlObj.hostname.includes(domain))) {
    return false;
  }

  return true;
}

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', event => {
  // Skip chrome-extension and non-http(s) requests
  if (event.request.url.startsWith('chrome-extension://') ||
      !event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Check if response exists
        if (!response) {
          // No response received, go to cache fallback
          throw new Error('Network request failed: No response received');
        }

        // Check if valid response - allow both same-origin and CORS responses
        if (response.status !== 200 || (response.type !== 'basic' && response.type !== 'cors')) {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache the fetched response for future use (except sensitive pages)
        if (shouldCache(event.request.url)) {
          caches.open(CACHE_NAME)
            .then(cache => {
              // Only cache GET requests
              if (event.request.method === 'GET') {
                cache.put(event.request, responseToCache)
                  .catch(err => console.error('Cache put failed:', err));
              }
            })
            .catch(err => console.error('Cache open failed:', err));
        }

        return response;
      })
      .catch(() => {
        // Network request failed, try to get from cache
        return caches.match(event.request)
          .then(response => {
            if (response) {
              return response;
            }
            
            // If requesting HTML and not cached, return offline page or home
            const acceptHeader = event.request.headers.get('accept');
            if (acceptHeader && acceptHeader.includes('text/html')) {
              return caches.match('/');
            }
          });
      })
  );
});

// Handle app install prompt
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
