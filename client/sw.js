function interceptFetch(evt){
    evt.respondWith (handleFetch(evt.request));
    evt.waitUntil (updateCache(evt.request));
}

async function handleFetch(request){
    const c = await caches.open(CACHE);
    const cachedCopy = await c.match(request);
    return cachedCopy || Promise.reject(new Error('no-match'));
}

async function updateCache(request){
    const c = await caches.open(CACHE);
    const response = await fetch(request);
    console.log('updating cache', request.url);
    return c.put(request, response);
}

const CACHE = 'SF';
const CACHEABLE = [
    './',
    './index.html',
    './server.js',
    './style.css',
    './sw.js',
];

async function cacheFiles(){
    const c = await caches.open(CACHE);
    await c.addAll(CACHEABLE);
    console.log('Cache prepared');
}

self.addEventListener('install', prepareCache);
self.addEventListener('fetch', interceptFetch);