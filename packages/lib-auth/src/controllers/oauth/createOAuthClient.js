import { DateTime, Duration } from 'luxon'
import { applySnapshot, getSnapshot } from 'mobx-state-tree'
import ReactDOM from 'react-dom'

import clearTimer from './helpers/clearTimer'
import createClient from './helpers/createClient'
import createElement from './helpers/createElement'
import mountReactApp from './helpers/mountReactApp'
import setTimer from './helpers/setTimer'
import { oauth as OAuthApp } from '../../views'
import OAuthStore from '../../models/oauth'

const warningDuration = Duration.fromObject({ minutes: 5 })

// Key used to store credentials in localStorage
const storageKey = '@zooniverse/auth OAuth'

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
  let timeoutTimer = -1
  let warningTimer = -1

  // Functions
  function completeLogin () {
    return client.token.getToken(window.location.href)
      .then(credentials => {
        const expiresAt = DateTime.fromJSDate(credentials.expires)

        const credentialsObject = {
          expiresAt: expiresAt.toMillis(),
          token: credentials.accessToken
        }

        store.credentials.set(credentialsObject)
        saveCredentials(credentialsObject)
        setTimers(expiresAt)
      })
      .catch(error => {
        console.error(error)
      })
  }

  function deleteCredentials () {
    localStorage.removeItem(storageKey)
  }

  function destroy () {
    logout()
    clearTimer(warningTimer)
    clearTimer(timeoutTimer)
    ReactDOM.unmountComponentAtNode(element)
    element.parentNode.removeChild(element)
    element = null
  }

  function getToken () {
    const snapshot = getSnapshot(store.credentials)
    return (snapshot.expiresAt && snapshot.token)
      ? snapshot
      : null
  }

  function loadCredentials () {
    const loaded = JSON.parse(localStorage.getItem(storageKey))

    if (!loaded || (loaded.expiresAt && loaded.expiresAt <= Date.now())) {
      deleteCredentials()
      return null
    }

    applySnapshot(store.credentials, loaded)

    setTimers(DateTime.fromMillis(loaded.expiresAt))
  }

  function logout () {
    store.credentials.reset()
    store.ui.openLogoutPopup()
    clearTimer(warningTimer)
    clearTimer(timeoutTimer)
  }

  function onTimeout () {
    store.ui.openTimeoutPopup()
    logout()
  }

  function onWarning () {
    store.ui.openTimeoutWarningPopup()
  }

  function saveCredentials (snapshot) {
    localStorage.setItem(storageKey, JSON.stringify(snapshot))
  }

  function startLogin () {
    store.ui.openLoginPopup()
  }

  function setTimers (luxonExpiresAt) {
    const timeLeft = luxonExpiresAt.diffNow()

    const timeUntilWarning = (timeLeft > warningDuration.as('milliseconds'))
      ? luxonExpiresAt.minus(warningDuration).diffNow()
      : 0

    setTimer({
      onComplete: onTimeout,
      duration: timeLeft,
      ref: timeoutTimer
    })
    setTimer({
      onComplete: onWarning,
      duration: timeUntilWarning,
      ref: warningTimer
    })
  }

  // Init
  mountReactApp({
    client,
    component: OAuthApp,
    element,
    store
  })
  loadCredentials()

  // Public API - more on this pattern at https://goo.gl/9L4DAR
  return Object.freeze({
    completeLogin,
    destroy,
    getToken,
    logout,
    startLogin
  })
}

export default createOAuthClient
