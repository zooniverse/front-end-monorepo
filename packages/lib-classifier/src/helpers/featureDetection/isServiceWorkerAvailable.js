export default function isServiceWorkerAvailable () {
  return (navigator !== undefined) && 'serviceWorker' in navigator
}
