/*
Experimental Auth Client
Based on PJC: https://github.com/zooniverse/panoptes-javascript-client/blob/8157794/lib/auth.js
 */

const globalStore = {
  eventListeners: {},
  userData: null,
  bearerToken: '',
  bearerTokenExpiry: NaN,
  refreshToken: '',
}

const PANOPTES_HEADERS = {  // the Panoptes API requires specific HTTP headers
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

/*
Add an event listener.

Input:
- eventType: (string) event type, e.g. "change".
  ❗️ TODO: list event types.
- listener: (function) function that will be called when event is broadcasted.
- _store: (optional) data store. See default globalStore.
Output:
- true if an event listener is successfully added, false otherwise.
Side Effects:
- on success, _store's eventListeners will be updated.
Notes:
- Invalid input is ignored. If no listener or no eventType is specified,
  nothing happens.
- Duplicates are ignored. If the same listener is added to the same event,
  nothing happens.
 */
function addEventListener (eventType, listener, _store) {
  console.log('+++ experimental auth client: addEventListener()')

  const store = _store || globalStore
  if (!eventType || !listener) {
    console.log('Panoptes.js auth.addEventListener(): requires event type (string) and listener (callback function).')
    return false
  }

  // Select array of listeners for specific event type. Create one if it doesn't already exist.
  if (!store.eventListeners[eventType]) store.eventListeners[eventType] = []
  const listenersForEventType = store.eventListeners[eventType]

  // Add the callback function to the list of listeners, if it's not already on the list.
  if (!listenersForEventType.find(l => l === listener)) {
    listenersForEventType.push(listener)
    return true
  } else {
    console.log(`Panoptes.js auth.addEventListener(): listener already exists for event type '${eventType}'.`)
    return false
  }
}

/*
Remove an event listener.

Input:
- eventType: (string) event type, e.g. "change".
  ❗️ TODO: list event types.
- listener: (function) function that would have been called when event is
  broadcasted.
- _store: (optional) data store. See default globalStore.
Output:
- true if an event listener is successfully removed, false otherwise.
Side Effects:
- on success, _store's eventListeners will be updated.
Possible Errors: n/a
Notes:
- Attempts to remove non-existent listener are ignored.
 */
function removeEventListener (eventType, listener, _store) {
  const store = _store || globalStore
  console.log('+++ experimental auth client: removeEventListener()')

  // Check if the listener has already been registered for the event type.
  if (!store.eventListeners[eventType] || !store.eventListeners[eventType]?.find(l => l === listener)) {
    console.log(`Panoptes.js addEventListener: listener for event type '${eventType}' hasn't been registered.`)
    return false
  }

  // Remove the listener for that event type.
  store.eventListeners[eventType] = store.eventListeners[eventType].filter(l => l !== listener)
  return true
}

/*
Broadcast an event to subscribed listeners.

Input:
- eventType: (string) event type, e.g. "change".
  ❗️ TODO: list event types.
- args: (anything) arguments to be broadcast with event.
- _store: (optional) data store. See default globalStore.
Output: n/a
 */
function _broadcastEvent (eventType, args, _store) {
  const store = _store || globalStore
  store.eventListeners?.[eventType]?.forEach(listener => {
    listener(args)
  })
}

/*
Sign In to Zooniverse.
This action attempts to sign the user into the Panoptes system, using the
user's login and password. If successful, the function returns a Panoptes
User object, and the store is updated with the signed-in user's details
(including their access tokens).

Input:
- login: (string) user's login, e.g. "zootester1"
- password: (string) user's password
- _store: (optional) data store. See default globalStore.
Output:
- (object) Panoptes User resource.
Side Effects:
- on success, _store's userData, bearerToken, bearerTokenExpiry, and
  refreshToken are updated.
Events:
- "change": when the user successfully signs in, the Panoptes User object is
  broadcasted with the event.
Possible Errors:
- standard (expected) API errors: no login/password; or incorrect login/password.
- Uncategorised network errors.
- Extremely unlikely API errors: invalid CSRF tokens, etc. Don't worry about these.
 */
async function signIn (login, password, _store) {
  const store = _store || globalStore
  console.log('+++ experimental auth client: signIn() ', login, password)

  // Here's how to sign in to Panoptes!

  try {

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
    
    // Extract data and check for errors.
    // NOTE: this is way more thorough than necessary.
    if (!response2.ok) {
      const jsonData2 = await response2.json()
      const error = jsonData2?.error || 'No idea what went wrong; no specific error message detected.'
      throw new Error(`Error from API. ${error}`)
    }
    const jsonData2 = await response2.json()
    const userData = jsonData2?.users?.[0]
    if (!userData) {
      throw new Error('Impossible API response. No user returned.')
    } else if (userData.login && userData.login !== login) {
      throw new Error('Impossible API response. User returned is different from login attempt. Did you forget to sign out first?')
    }

    // Possible responses from /users/sign_in:
    // 1. valid login & password => 200 with User resource 
    // 2. blank login / password => 401 with { error: "You need to sign in or sign up before continuing." }
    // 3. invalid login / password => 401 with { error: "Invalid email or password." }
    // 4. invalid authenticity token => see https://github.com/zooniverse/operations/issues/561
    // 5. already logged in => 200 with User resource of the previously logged-in user(!) This means if Panoptes thinks you're already logged in (see notes on http-only cookies), then any subsequent login attempts are ignored.
    // X. Unexpected error, e.g. network down.

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
    
    // Extract data and check for errors.
    if (!response3.ok) {
      const jsonData3 = await response3.json()
      const error = jsonData3?.error || 'No idea what went wrong; no specific error message detected.'
      throw new Error(`Error from API. ${error}`)
    }
    const jsonData3 = await response3.json()
    const bearerToken = jsonData3?.access_token  // The bearer token is short-lived
    const refreshToken = jsonData3?.refresh_token  // The refresh token is used to get new bearer tokens.
    const bearerTokenExpiry = Date.now() + (jsonData3?.expires_in * 1000)  // Use Date.now() instead of response.created_at, because it keeps future "has expired?" comparisons consistent to the client's clock instead of the server's clock.
    if (!bearerToken || !refreshToken) {
      throw new Error('Impossible API response. access_token and/or refresh_token unavailable.')
    } else if (jsonData3?.token_type !== 'Bearer') {
      throw new Error('Impossible API response. Token wasn\'t of type "Bearer".')
    } else if (isNaN(bearerTokenExpiry)) {
      throw new Error('Impossible API response. Token expiry can\'t be calculated.')
    } else if (bearerTokenExpiry <= Date.now()) {
      throw new Error('Impossible API response. Token has already expired for some reason.')
    }

    console.log('+++ signIn() Results: ',
      '\n\n  userData:', userData,
      '\n\n  bearerToken', bearerToken,
      '\n\n  bearerTokenExpiry', new Date(bearerTokenExpiry),
      '\n\n  refreshToken', refreshToken,
    )
    store.userData = userData
    store.bearerToken = bearerToken,
    store.bearerTokenExpiry = bearerTokenExpiry
    store.refreshToken = refreshToken
    _broadcastEvent('change', userData)

    return userData

  } catch (err) {
    console.error('Panoptes.js auth.signIn(): ', err)
    throw(err)
  }

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
  addEventListener,
  removeEventListener,
}