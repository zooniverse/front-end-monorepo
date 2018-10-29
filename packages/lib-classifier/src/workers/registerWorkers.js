export default function registerWorkers () {
  // Check that service workers are registered
  console.log('Checking for service worker support')
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    console.log('Service workers are supported')
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/queue.js')
        .then(function (registration) {
          // Successful registration
          console.log('Hooray. Registration successful, scope is:', registration.scope)
        }).catch(function (error) {
          // Failed registration, service worker won’t be installed
          console.error('Whoops. Service worker registration failed, error:', error)
        })
    })
  }
}
