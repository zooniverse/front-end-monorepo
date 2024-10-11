/*
Experimental Auth Client
Based on PJC: https://github.com/zooniverse/panoptes-javascript-client/blob/8157794/lib/auth.js
 */

const globalStore = {
  eventListeners: {}
}

async function checkCurrent (_store) {
  const store = _store || globalStore
  console.log('+++ experimental auth client: checkCurrent()')

  broadcastEvent('change', 'wah wah')  // TEST

  // return Promise.resolve(undefined)  // TODO: not sure if this is what should be returned by oh well
}

/*
Adds event listener.
 */
function addEventListener (eventType, listener, _store) {
  console.log('+++ experimental auth client: addEventListener()')

  const store = _store || globalStore
  if (!eventType || !listener) throw new Error('PanoptesJS auth.addEventListener(): requires event type (string) and listener (callback function).')

  // Select array of listeners for specific event type. Create one if it doesn't already exist.
  if (!store.eventListeners[eventType]) store.eventListeners[eventType] = []
  const listenersForEventType = store.eventListeners[eventType]

  // Add the callback function to the list of listeners, if it's not already on the list.
  if (!listenersForEventType.find(l => l === listener)) {
    listenersForEventType.push(listener)
  } else {
    console.log(`PanoptesJS auth.addEventListener(): listener already exists for event type '${eventType}'.`)
  }
}

/*
Remove event listeners.
 */
function removeEventListener (eventType, listener, _store) {
  const store = _store || globalStore
  console.log('+++ experimental auth client: removeEventListener()')

  // Check if the listener has already been registered for the event type.
  if (!store.eventListeners[eventType] || !store.eventListeners[eventType]?.find(l => l === listener)) {
    console.log(`PanoptesJS addEventListener: listener for event type '${eventType}' hasn't been registered.`)
    return
  }

  // Remove the listener for that event type.
  store.eventListeners[eventType] = store.eventListeners[eventType].filter(l => l !== listener)
  return true
}

function broadcastEvent (eventType, args, _store) {
  const store = _store || globalStore
  store.eventListeners?.[eventType]?.forEach(listener => {
    listener(args)
  })
}

function signIn (login, password) {
  // TODO
  console.log('+++ experimental auth client: signIn() ', login, password)
}

export {
  signIn,
  checkCurrent,
  addEventListener,
  removeEventListener,
}