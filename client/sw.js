// Function to intercept fetch requests
function interceptFetch(evt) {
  evt.respondWith(handleFetch(evt.request));
  evt.waitUntil(updateCache(evt.request));
}

// Function to handle fetch requests
async function handleFetch(request) {
  const c = await caches.open(CACHE);
  const cachedCopy = await c.match(request);
  return cachedCopy || Promise.reject(new Error('no-match'));
}

// Function to update cache with fetched response
async function updateCache(request) {
  const c = await caches.open(CACHE);
  const response = await fetch(request);
  console.log('updating cache', request.url);
  return c.put(request, response);
}

// Cache name
const CACHE = 'SF';

// Array of cacheable files
const CACHEABLE = [
  './',
  './index.html',
  './server.js',
  './style.css',
  './sw.js',
];

// Function to cache files on installation
async function cacheFiles() {
  const c = await caches.open(CACHE);
  await c.addAll(CACHEABLE);
  console.log('Cache prepared');
}

// Event listener for installation
self.addEventListener('install', cacheFiles);

// Event listener for fetch requests
self.addEventListener('fetch', interceptFetch);
