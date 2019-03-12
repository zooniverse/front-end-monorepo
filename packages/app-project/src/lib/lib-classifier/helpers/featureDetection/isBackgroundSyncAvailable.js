// All browsers support service worker, but only Chrome supports background sync API
export default function isBackgroundSyncAvailable () {
  return 'SyncManager' in window
}
