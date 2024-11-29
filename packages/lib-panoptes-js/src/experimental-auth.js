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

  // Here's how to SIGN IN to Panoptes!

  // Some general setup stuff.
  const PANOPTES_HEADERS = {  // the Panoptes API requires specific HTTP headers
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
  // const login = 'janezooniverse'
  // const password = 'bleepbloop'

  // Step 1: get a CSRF token.
  // - The CSRF token (or rather, the anti-cross-site request forgery token) is a
  //   unique, one-off, time-sensitive token. Kinda like the time-based OTPs
  //   provided by apps like the Google Authenticator. 
  // - This "authenticity token", as it will be later be called, prevents third
  //   parties from simply replaying the HTTPs-encoded sign-in request.
  // - In our case, the CSRF token is provided Panoptes itself.
  const request1 = new Request(`https://panoptes-staging.zooniverse.org/users/sign_in/?now=${Date.now()}`, {
    credentials: 'include',
    method: 'GET',
    headers: PANOPTES_HEADERS,
  })
  const response1 = await fetch(request1)
  const csrfToken = response1?.headers.get('x-csrf-token')  // The CSRF Token is in the response header
  console.log('+++ Step 1: csrfToken received: ', csrfToken)
  // Note: we don't actually care about the response body, which happens to be blank.

  // Step 2: submit the login details.
  // - IMPORTANT: at this point, Panoptes should be attaching (HTTP-only)
  //   cookies (_Panoptes_session and remember_user_token) to its responses.
  // - These HTTP cookies identify requests as coming from us (or rather, from
  //   our particular session.
  // - This is how request2 (submit username & password) and request3 (request
  //   bearer token for a logged in user) are magically linked and recognised
  //   as coming from the same person/session, even though request3 isn't
  //   providing any login data explicitly via the JavaScript code.
  // - HTTP-only cookies can't be viewed or edited by JavaScript, as it happens.
  // - HTTP-only cookies are automagically handled by the web browser and the
  //   server.
  // - (If you're curious about the mechanics, check the first response headers'
  //   "Set-Cookie" values, and the following second request header's "Cookie"
  //   values.)
  // - Our only control as front-end devs is to specify the fetch() of Request()'s
  //   `credentials` option to either "omit" (bad idea for us), "same-origin"
  //   (the default), or "include" (when you need things to work cross-origin)
  // - ❗️ That `credentials: "include"` option is probably important if we need
  //   Panoptes.JS to work on non-*.zooniverse.org domains!

  const request2 = new Request(`https://panoptes-staging.zooniverse.org/users/sign_in`, {
    body: JSON.stringify({
      authenticity_token: csrfToken,
      user: {
        login,
        password,
        remember_me: true,
      },
    }),
    credentials: 'include',
    method: 'POST',
    headers: PANOPTES_HEADERS,
  })
  const response2 = await fetch(request2)
  console.log('+++ Step 2: login status: ', response2)

  // Possible responses from /users/sign_in:
  // 1. valid login & password => 200 with User resource 
  // 2. blank login / password => 401 with { error: "You need to sign in or sign up before continuing." }
  // 3. invalid login / password => 401 with { error: "Invalid email or password." }
  // 4. invalid authenticity token => 
  // 5. already logged in => 200 with User resource of the logged-in user(!) This means if Panoptes things you're already logged in (see notes on http-only cookies), then any subsequent login attempts are ignored!
  // X. Unexpected error, e.g. network down

  // Note: old PJC doesn't actually care about the response body, which is the
  // logged-in user's User resource. This is because PJC has a separate call for
  // fetching the user resource, which is, uh, kinda extra work, but keeps the
  // calls standardised I guess?

  // Step 3: get the bearer token.

  const request3 = new Request(`https://panoptes-staging.zooniverse.org/oauth/token`, {
    body: JSON.stringify({
      client_id: '535759b966935c297be11913acee7a9ca17c025f9f15520e7504728e71110a27',
      grant_type: 'password',
    }),
    credentials: 'include',
    method: 'POST',
    headers: PANOPTES_HEADERS,
  })
  const response3 = await fetch(request3)
  console.log('+++ Step 3: ', response3)

  // TODO

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