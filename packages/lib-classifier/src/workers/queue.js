if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)
  localStorage.setItem('workboxLoaded', true)
  const queue = new workbox.backgroundSync.Queue('ClassificationQueue')

  const manageFailure = function (error, request) {
    console.log('Classification POST failed', error)
    console.log('Adding classification POST to queue', request)
    try {
      return queue.addRequest(request)
    } catch (saveQueueError) {
      console.error('Failed to update classification queue:', saveQueueError)
    }
  }

  self.addEventListener('fetch', (event) => {
    const { request } = event
    const endpointRegex = /(panoptes-staging|panoptes)\.zooniverse\.org\/api\/classification/
    // Clone the request to ensure it's saved to read when
    // adding to the Queue.
    if (request.method === 'POST' && endpointRegex.test(request.url)) {
      const promiseChain = fetch(request.clone())
        .then((response) => {
          if (!response.ok) {
            if (response.status !== 422) {
              console.log('hey', response, response.body)
              manageFailure(response, request)
            } else {
              console.error('Dropping malformed classification permanently', request, response)
            }
          }
        })
        .catch((error) => {
          manageFailure(error, request)
        })

      event.waitUntil(promiseChain)
    }
  })
} else {
  console.log(`Boo! Workbox didn't load 😬`)
  localStorage.setItem('workboxLoaded', false)
}
