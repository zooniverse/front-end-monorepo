// We check localStorage for the state of the workbox
// Because the workbox library is sandboxed inside the service worker for security
export default function isServiceWorkerAvailable () {
  return 'serviceWorker' in navigator && localStorage.getItem('workboxLoaded')
}
