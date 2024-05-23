/* eslint-disable require-await */
'use strict';

// Function to initialize the JavaScript code
async function init() {
  console.log('js ready');
}

// Event listener to call the init function when the window loads
window.addEventListener('load', init);

// Function to register the service worker
async function registerServiceWorker() {
  if (navigator.serviceWorker) {
    await navigator.serviceWorker.register('/sw.js');
  }
}

// Event listener to call the registerServiceWorker function when the window loads
window.addEventListener('load', registerServiceWorker);
