'use strict'

async function init(){
    console.log('js ready');
}

window.addEventListener('load', init);

async function registerServiceWorker() {
    if (navigator.serviceWorker) {
        await navigator.serviceWorker.register('/sw.js');
    }
}

window.addEventListener('load', registerServiceWorker);