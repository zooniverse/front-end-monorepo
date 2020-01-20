const cookie = require('cookie')
const isNode = require('detect-node')

const createImmutable = require('./helpers/create-immutable')

/**
 * The main Client class, which provides methods to authenticate against the API and request access tokens.
 *
 * @class
 */
class Client {
  /**
   * Creates a new instance of the client
   *
   * @param {object} config - Configuration parameters for the client
   * @param {object} httpClient - A configured HTTP client for making requests
   */
  constructor (config, httpClient) {
    createImmutable(this, '_config', config)
    createImmutable(this, '_httpClient', httpClient)
    this._resetState()
  }

  /**
   * Makes a request to exchange a JWT for a access token.
   *
   * @async
   * @private
   * @param {string} jwt - A JSON Web Token
   * @returns {Promise} Resolves to the new access token.
   */
  async _exchangeJWTForToken (jwt) {
    if (!jwt) {
      return null
    }

    const data = {
      'client_id': this._config.clientAppID,
      'grant_type': 'password'
    }

    const config = {
      headers: {
        cookie: `${this._config.cookieName}=${jwt}`
      },
      withCredentials: true
    }

    const response = await this._httpClient.post('/oauth/token', data, config)
    this._handleNewTokenData(response.data)
    return this._state.accessToken
  }

  /**
   * Gets an access token. Returns the current access token if it's still valid, otherwise attempts to try and refresh it before returning.
   *
   * @async
   * @returns {Promise} Resolves to the access token, or an empty string if not available.
   */
  async getAccessToken() {
    if (!this._state.accessToken) {
      return ''
    } else if (this._isAccessTokenValid()) {
      return this._state.accessToken
    } else {
      return this._refreshTokenData()
    }
  }

  /**
   * Requests a cross-site request forgery (CSRF) token, which is used in the main authentication-related actions.
   *
   * @async
   * @private
   * @returns {Promise} Resolves to the CSRF token.
   */
  async _getCSRFToken () {
    try {
      const url = `/users/sign_in?now=${Date.now()}`
      const config = { withCredentials: true }
      const response = await this._httpClient.head(url, config)
      const csrfToken = response.headers['x-csrf-token']
      return csrfToken
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  /**
   * Tries to get the Panoptes session cookie from the browser's cookie jar.
   *
   * @private
   * @returns {string} The JWT from the browser cookie, or an empty string
   */
  _getJWTFromBrowser () {
    if (isNode) {
      return ''
    }
    const { cookieName } = this._config
    const cookies = cookie.parse(document.cookie)
    return cookies[cookieName] || ''
  }

  /**
   * Extracts the JWT from a response object's `set-cookie` header.
   *
   * @param {Object} response - The response object
   * @param {Object} response.headers - The headers on the response object
   * @param {Array|string} response.headers.set-cookie - The `set-cookie` header
   */
  _getJWTFromResponse (response) {
    const setCookie = response.headers['set-cookie']
    const cookies = (setCookie instanceof Array) ? setCookie : [setCookie]
    return cookies.reduce((jwt, cookieString) => {
      if (jwt) {
        return jwt
      }
      const parsed = cookie.parse(cookieString)
      return parsed[this._config.cookieName] || null
    }, null)
  }

  /**
   * Takes the new token data and merges it into the client's state
   *
   * @private
   * @param {Object} tokenData - The token data returned from the API.
   * @param {string} tokenData.access_token - The access token used to authenticate requests.
   * @param {string} tokenData.created_at - The UNIX timestamp for the access token's creation.
   * @param {string} tokenData.expires_in - The number of seconds before the access token expires.
   * @param {string} tokenData.refresh_token - A token that can be exchanged for a new access token.
   * @param {string} tokenData.scope - The scopes granted to the access token.
   * @returns {void}
   */
  _handleNewTokenData (tokenData) {
    this._state = {
      accessToken: tokenData['access_token'],
      accessTokenCreatedAt: tokenData['created_at'],
      accessTokenExpiresAt: tokenData['created_at'] + tokenData['expires_in'],
      accessTokenExpiresIn: tokenData['expires_in'],
      refreshToken: tokenData['refresh_token'],
      scope: tokenData.scope
    }
  }

  /**
   * Checks whether the current access token is still valid or has expired.
   *
   * @private
   * @returns {boolean}
   */
  _isAccessTokenValid () {
    const { accessToken, accessTokenExpiresAt } = this._state
    return !!accessToken && Date.now() > accessTokenExpiresAt
  }

  /**
   * Check whether a user is signed in
   *
   * @returns {boolean}
   */
  isSignedIn () {
    return !!this._state.accessToken
  }

  /**
   * Makes a request to exchange the refresh token for new token data.
   *
   * @async
   * @private
   * @returns {Promise} Resolves to the new access token.
   */
  async _refreshTokenData () {
    const data = {
      'client_id': this._config.clientAppID,
      'grant_type': 'refresh_token',
      'refresh_token': this._state.refreshToken
    }
    const response = await this._httpClient.post('/oauth/token', data)
    this._handleNewTokenData(response.data)
    return this._state.accessToken
  }

  /**
   * Registers a new user and logs them in.
   *
   * @async
   * @param {Object} user - The details of the new user account.
   * @param {boolean} user.betaEmailCommunication - Whether the new user wants to opt in to beta emails.
   * @param {string} user.creditedName - The new user's credited name (used in citations etc).
   * @param {string} user.email - The new user's email address.
   * @param {string} user.login - The new user's username.
   * @param {boolean} user.globalEmailCommunication - Whether the new user wants to opt in to global emails.
   * @param {string} user.password - The new user's password.
   * @param {boolean} user.projectEmailCommunication - Whether the new user wants to opt in to project-related emails when registering via a specific project.
   * @param {string} user.projectId - The project ID when registering via a specific project.
   * @returns {Promise} Resolves to a new access token.
   */
  async register (user) {
    if (this.isSignedIn()) {
      await this.signOut()
    }

    const csrfToken = await this._getCSRFToken()
    const data = {
      'authenticity_token': csrfToken,
      user: {
        'beta_email_communication': user.betaEmailCommunication,
        'credited_name': user.creditedName,
        email: user.email,
        'global_email_communication': user.globalEmailCommunication,
        login: user.login,
        password: user.password,
        'project_email_communication': user.projectEmailCommunication,
        'project_id': user.projectId
      }
    }
    const registerResponse = await this._httpClient.post('/users', data)

    // After the user is created, we need to sign in to actually get an access
    // token. `panoptes-javascript-client` manages to do it without this step;
    // there's no `set-cookie` header on the response that I can see, so I'm not
    // actually sure how.
    const credentials = {
      login: user.login,
      password: user.password,
    }
    return this.signIn(credentials)
  }

  /**
   * Resets the client state to its initial state
   *
   * @private
   * @returns {void}
   */
  _resetState () {
    this._state = {
      accessToken: '',
      accessTokenCreatedAt: NaN,
      accessTokenExpiresAt: NaN,
      accessTokenExpiresIn: NaN,
      refreshToken: '',
      scope: ''
    }
  }

  /**
   * Resumes a session for a logged-in user.
   *
   * @async
   * @param {string} [jwt] - A JWT to exchange for an access token. Allows the client to be used on the server side by extracting the JWT included in the cookies in the `req` object and passing it in here. If run on the browser without the JWT argument, it will try to retrieve it from document object.
   * @returns {Promise} Resolves to the new access token if logged in, or `null` if logged out.
   */
  async resumeSession (jwt = this._getJWTFromBrowser()) {
    if (jwt) {
      const newAccessToken = await this._exchangeJWTForToken(jwt)
      return newAccessToken
    } else {
      return null
    }
  }

  /**
   * Signs a user in
   *
   * @param {Object} credentials - The credentials for the user logging in.
   * @param {string} credentials.login - The user's username or email address.
   * @param {string} credentials.password - The user's password.
   * @returns {Promise} Resolves to the new access token.
   */
  async signIn (credentials) {
    if (this.isSignedIn()) {
      await this.signOut()
    }

    const csrfToken = await this._getCSRFToken()
    const data = {
      'authenticity_token': csrfToken,
      user: {
        login: credentials.login,
        password: credentials.password,
        remember_me: true
      }
    }
    const response = await this._httpClient.post('/users/sign_in', data)
    const jwt = this._getJWTFromResponse(response)
    return this.resumeSession(jwt)
  }

  /**
   * Signs a user out.
   *
   * @async
   * @returns {Promise} Resolves to `null`.
   */
  async signOut () {
    const currentSession = await this.getAccessToken()

    // If there's no session, we can't log out.
    if (!currentSession) {
      return
    }

    const csrfToken = await this._getCSRFToken()
    const config = {
      headers: {
        'x-csrf-token': csrfToken
      }
    }
    await this._httpClient.delete('/users/sign_out', config)
    this._resetState()
    return
  }
}

module.exports = Client
