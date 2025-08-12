// Service Worker for Flonze Fulfillment Website
// Provides offline functionality, caching, and background sync

const CACHE_NAME = 'flonze-fulfillment-v2.0.0';
const STATIC_CACHE = 'flonze-static-v2.0.0';
const DYNAMIC_CACHE = 'flonze-dynamic-v2.0.0';

// Files to cache immediately
const STATIC_FILES = [
  '/',
  '/index.html',
  '/style.css',
  '/advanced-features.js',
  '/services.html',
  '/pricing.html',
  '/about.html',
  '/contact.html',
  '/logo.png',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\/shipping\/calculate/,
  /\/api\/stats/,
  /\/api\/health/
];

// Install event - cache static files
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        console.log('Service Worker: Static files cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('Service Worker: Failed to cache static files', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated successfully');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle network requests
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle different types of requests
  if (request.method === 'GET') {
    if (isStaticFile(request.url)) {
      // Static files - cache first strategy
      event.respondWith(cacheFirst(request));
    } else if (isAPIRequest(request.url)) {
      // API requests - network first strategy
      event.respondWith(networkFirst(request));
    } else {
      // Other requests - stale while revalidate
      event.respondWith(staleWhileRevalidate(request));
    }
  } else if (request.method === 'POST') {
    // Handle POST requests (forms, analytics)
    event.respondWith(handlePostRequest(request));
  }
});

// Background sync for offline form submissions
self.addEventListener('sync', event => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForms());
  } else if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

// Push notifications
self.addEventListener('push', event => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update from Flonze Fulfillment',
    icon: '/logo.png',
    badge: '/logo.png',
    vibrate: [200, 100, 200],
    data: {
      url: '/'
    },
    actions: [
      {
        action: 'open',
        title: 'Open Website'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Flonze Fulfillment', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  console.log('Service Worker: Notification clicked');
  
  event.notification.close();
  
  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});

// Cache strategies
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, networkResponse.clone());
    
    return networkResponse;
  } catch (error) {
    console.error('Cache first strategy failed:', error);
    return new Response('Offline - Content not available', {
      status: 503,
      statusText: 'Service Unavailable'
    });
  }
}

async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful API responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', error);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline response for API requests
    return new Response(JSON.stringify({
      error: 'Offline - Please try again when connected',
      offline: true
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    cache.put(request, networkResponse.clone());
    return networkResponse;
  }).catch(error => {
    console.log('Network request failed:', error);
    return cachedResponse;
  });
  
  return cachedResponse || fetchPromise;
}

async function handlePostRequest(request) {
  try {
    // Try to send the request
    const response = await fetch(request);
    return response;
  } catch (error) {
    console.log('POST request failed, storing for background sync:', error);
    
    // Store the request for background sync
    const requestData = {
      url: request.url,
      method: request.method,
      headers: Object.fromEntries(request.headers.entries()),
      body: await request.text()
    };
    
    // Store in IndexedDB for background sync
    await storeOfflineRequest(requestData);
    
    // Register background sync
    if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
      const tag = request.url.includes('/contact') ? 'contact-form-sync' : 'analytics-sync';
      await self.registration.sync.register(tag);
    }
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Request stored for when you\'re back online',
      offline: true
    }), {
      status: 202,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Background sync functions
async function syncContactForms() {
  console.log('Service Worker: Syncing contact forms');
  
  const offlineRequests = await getOfflineRequests('contact');
  
  for (const requestData of offlineRequests) {
    try {
      const response = await fetch(requestData.url, {
        method: requestData.method,
        headers: requestData.headers,
        body: requestData.body
      });
      
      if (response.ok) {
        await removeOfflineRequest(requestData.id);
        console.log('Contact form synced successfully');
        
        // Show success notification
        self.registration.showNotification('Form Submitted', {
          body: 'Your contact form has been submitted successfully!',
          icon: '/logo.png'
        });
      }
    } catch (error) {
      console.error('Failed to sync contact form:', error);
    }
  }
}

async function syncAnalytics() {
  console.log('Service Worker: Syncing analytics');
  
  const offlineRequests = await getOfflineRequests('analytics');
  
  for (const requestData of offlineRequests) {
    try {
      const response = await fetch(requestData.url, {
        method: requestData.method,
        headers: requestData.headers,
        body: requestData.body
      });
      
      if (response.ok) {
        await removeOfflineRequest(requestData.id);
        console.log('Analytics event synced successfully');
      }
    } catch (error) {
      console.error('Failed to sync analytics:', error);
    }
  }
}

// IndexedDB operations for offline storage
async function storeOfflineRequest(requestData) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('FlonzeOfflineDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['requests'], 'readwrite');
      const store = transaction.objectStore('requests');
      
      const data = {
        ...requestData,
        id: Date.now(),
        timestamp: new Date().toISOString(),
        type: requestData.url.includes('/contact') ? 'contact' : 'analytics'
      };
      
      store.add(data);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    };
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('requests')) {
        const store = db.createObjectStore('requests', { keyPath: 'id' });
        store.createIndex('type', 'type', { unique: false });
      }
    };
  });
}

async function getOfflineRequests(type) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('FlonzeOfflineDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['requests'], 'readonly');
      const store = transaction.objectStore('requests');
      const index = store.index('type');
      const getRequest = index.getAll(type);
      
      getRequest.onsuccess = () => resolve(getRequest.result);
      getRequest.onerror = () => reject(getRequest.error);
    };
  });
}

async function removeOfflineRequest(id) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('FlonzeOfflineDB', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const db = request.result;
      const transaction = db.transaction(['requests'], 'readwrite');
      const store = transaction.objectStore('requests');
      
      store.delete(id);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    };
  });
}

// Utility functions
function isStaticFile(url) {
  return STATIC_FILES.some(file => url.includes(file)) ||
         url.includes('.css') ||
         url.includes('.js') ||
         url.includes('.png') ||
         url.includes('.jpg') ||
         url.includes('.jpeg') ||
         url.includes('.svg') ||
         url.includes('fonts.googleapis.com');
}

function isAPIRequest(url) {
  return url.includes('/api/') ||
         API_CACHE_PATTERNS.some(pattern => pattern.test(url));
}

// Message handling for communication with main thread
self.addEventListener('message', event => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  } else if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  } else if (event.data && event.data.type === 'CLEAR_CACHE') {
    clearAllCaches().then(() => {
      event.ports[0].postMessage({ success: true });
    });
  }
});

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  return Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
}

console.log('Service Worker: Script loaded successfully');