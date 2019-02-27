import { isServiceWorkerAvailable } from '../helpers/featureDetection'

export default function unregisterWorkers (which) {
  if (isServiceWorkerAvailable()) {
    if (which) {
      navigator.serviceWorker.getRegistration(which).then((registration) => {
        if (registration) {
          registration.unregister()
          console.log(`${registration.scope} found and now unregistered.`)
        }
      })
    } else {
      navigator.serviceWorker.getRegistrations().then((registration) => {
        registration.unregister()
      })
    }
  }
}
