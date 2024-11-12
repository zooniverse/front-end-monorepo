/*
Experimental Auth Client
Based on PJC: https://github.com/zooniverse/panoptes-javascript-client/blob/8157794/lib/auth.js
 */

const globalStore = {
  eventListeners: {},
  _currentUserPromise: null,
  //_bearerToken: '',
  //_bearerTokenExpiration: NaN,
  //_refreshToken: '',
  //_tokenRefreshPromise: null,
}

async function checkCurrent (_store) {
  const store = _store || globalStore
  console.log('+++ experimental auth client: checkCurrent()')

  if (!store._currentUserPromise) {
    console.log('Checking current user')
    store._currentUserPromise = _getUser(store)
    await store._currentUserPromise
    broadcastEvent('change', store._currentUserPromise, store)
  }

  return store._currentUserPromise
  /*
  Orignal PJC code

  if (!this._currentUserPromise) {
    console.log('Checking current user');
    this._currentUserPromise = this._getUser();
    await this._currentUserPromise;
    this.emit('change', this._currentUserPromise);
  }

  return this._currentUserPromise;
   */
}

async function _getUser (_store) {
  const store = _store || globalStore
  console.log('+++ experimental auth client: getUser()')

  try {
    const token = await _getBearerToken(store)
    return _getSession(store)
  } catch (error) {
    // Nobody's signed in. This isn't an error.
    console.info('No current user')
    return null
  }
}

async function _getBearerToken (_store) {
  const store = _store || globalStore
  console.log('+++ experimental auth client: getBearerToken()')

  // TODO
}

async function _getSession (_store) {
  const store = _store || globalStore
  console.log('+++ experimental auth client: _getSession()')

  // TODO
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

async function signIn (login, password, _store) {
  // TODO
  const store = _store || globalStore
  console.log('+++ experimental auth client: signIn() ', login, password)

  const user = await checkCurrent(_store)

  console.log('+++ user: ', user)

  /*
  Original PJC code:

  const user = await this.checkCurrent();
  if (user) {
    await this.signOut();
    return this.signIn(credentials);
  } else {
    console.log('Signing in', credentials.login);
    const token = await getCSRFToken(config.host)
    const data = {
      authenticity_token: token,
      user: {
        login: credentials.login,
        password: credentials.password,
        remember_me: true,
      },
    };

    const signInRequest = this._makeSignInRequest(data);
    this._currentUserPromise = signInRequest.catch(() => null);
    await this._currentUserPromise;
    this.emit('change', this._currentUserPromise);

    return signInRequest;
  }
  */
}

export {
  signIn,
  checkCurrent,
  addEventListener,
  removeEventListener,
}