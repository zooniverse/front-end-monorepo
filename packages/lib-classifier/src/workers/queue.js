if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`)
  const queue = new workbox.backgroundSync.Queue('ClassificationQueue')

  self.addEventListener('fetch', (event) => {
    const { request } = event
    const endpointRegex = /(panoptes-staging|panoptes)\.zooniverse\.org\/api\/classification/
    // Clone the request to ensure it's saved to read when
    // adding to the Queue.
    if (request.method === 'POST' && endpointRegex.test(request.url)) {
      const promiseChain = fetch(request.clone())
        .catch((error) => {
          console.log('Classification POST failed', error)
          console.log('Adding classification POST to queue', request)
          return queue.addRequest(request)
        })

      event.waitUntil(promiseChain)
    }
  })
} else {
  console.log(`Boo! Workbox didn't load 😬`)
}
