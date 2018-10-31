export default function isServiceWorkerAvailable () {
  return 'serviceWorker' in navigator
}
