import { DateTime } from 'luxon'
import { getSnapshot } from 'mobx-state-tree'
import queryString from 'query-string'
import ReactDOM from 'react-dom'

import createClient from './helpers/createClient'
import createElement from './helpers/createElement'
import mountReactApp from './helpers/mountReactApp'
import { oauth as OAuthApp } from '../../views'
import OAuthStore from '../../models/oauth'

function createOAuthClient ({
  authorizationUri,
  clientId,
  env,
  redirectUri,
  scopes
} = {}) {
  // Private variables
  const client = createClient({
    authorizationUri,
    clientId,
    env,
    redirectUri,
    scopes
  })
  const store = OAuthStore.create()
  let element = createElement()

  // Functions
  function initialize () {
    const { expiresAt, token } = store.credentials
    const { access_token, expires_in } = queryString.parse(window.location.hash)

    if (expiresAt && token) {
      console.log('Getting bearer token from storage')
      return store.user.fetchResource(token)
        .catch((error) => { console.error(error) })
    } else if (access_token && expires_in) {
      return completeLogin()
        .then((credentials) => {
          if (credentials && credentials.token) {
            return store.user.fetchResource(credentials.token)
          }
        }).catch((error) => { console.error(error) })
    }

    console.log('No user')
    return Promise.resolve(null)
  }

  function completeLogin () {
    console.log('Getting bearer token from hash fragment')
    return client.token.getToken(window.location.href)
      .then(credentials => {
        if (credentials) {
          const expiresAt = DateTime.fromJSDate(credentials.expires)

          const credentialsObject = {
            expiresAt: expiresAt.toMillis(),
            token: credentials.accessToken
          }

          store.credentials.set(credentialsObject)
          return credentialsObject
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  function destroy (beforeDestroy, afterDestroy) {
    return Promise.resolve(() => {
        if (beforeDestroy) beforeDestroy()
      })
      .then(() => {
        store.credentials.logout()
        ReactDOM.unmountComponentAtNode(element)
        element.parentNode.removeChild(element)
        element = null
      })
      .then(() => {
        if (afterDestroy) afterDestroy()
      })

  }

  function getToken () {
    const snapshot = getSnapshot(store.credentials)
    return (snapshot.expiresAt && snapshot.token)
      ? snapshot
      : null
  }

  function getUser () {
    return (store.user.active) ? getSnapshot(store.user.active) : null
  }

  function logout (beforeLogout, afterLogout) {
    return Promise.resolve(() => {
        if (beforeLogout) beforeLogout()
      })
      .then(() => store.credentials.logout())
      .then(getUser())
      .then(() => {
        if (afterLogout) afterLogout()
      })
  }

  function startLogin (beforeStartLogin, afterStartLogin) {
    return Promise.resolve(() => {
        if (beforeStartLoging) beforeStartLogin()
      })
      .then(() => store.ui.openLoginPopup())
      .then(() => {
        if (afterStartLogin) afterStartLogin()
      })
  }

  // Init
  mountReactApp({
    client,
    component: OAuthApp,
    element,
    store
  })

  // Public API - more on this pattern at https://goo.gl/9L4DAR
  return Object.freeze({
    completeLogin,
    destroy,
    getToken,
    getUser,
    initialize,
    logout,
    startLogin
  })
}

export default createOAuthClient
