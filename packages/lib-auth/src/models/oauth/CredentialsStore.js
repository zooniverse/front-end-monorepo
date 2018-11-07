import { DateTime, Duration } from 'luxon'
import { toJS } from 'mobx'
import { applySnapshot, getRoot, getType, types } from 'mobx-state-tree'
import setTimer from './helpers/setTimer'
import clearTimer from './helpers/clearTimer'

// Key used to store credentials in localStorage
const storageKey = '@zooniverse/auth OAuth'

const defaultCredentials = {
  expiresAt: 0,
  token: ''
}

const warningDuration = Duration.fromObject({ minutes: 5 })

function loadCredentials(key) {
  const loaded = JSON.parse(localStorage.getItem(storageKey))

  if (!loaded || (loaded.expiresAt && loaded.expiresAt <= Date.now())) {
    return defaultCredentials[key]
  }

  return loaded[key]
}

let timeoutTimer = -1
let warningTimer = -1

const Credentials = types
  .model('Credentials', {
    expiresAt: types.optional(types.number, loadCredentials('expiresAt')),
    token: types.optional(types.string, loadCredentials('token'))
  })

  .actions(self => ({
    afterCreate () {
      if (self.expiresAt) self.setTimers(DateTime.fromMillis(self.expiresAt))
    },

    reset () {
      self.deleteCredentials()
      clearTimer(warningTimer)
      clearTimer(timeoutTimer)
      self.expiresAt = defaultCredentials.expiresAt
      self.token = defaultCredentials.token
    },

    set (credentialsObject) {
      if (!credentialsObject.expiresAt || !credentialsObject.token) {
        throw new ReferenceError('You must pass an object with both an `expiresAt` and a `token` property')
      }
      console.log('credentialsObject', credentialsObject)
      self.saveCredentials(credentialsObject)
      self.setTimers(credentialsObject.expiresAt)
      applySnapshot(self, credentialsObject)
    },

    logout () {
      const uiStore = getRoot(self).ui
      self.reset()
      uiStore.openLogoutPopup()
    },

    onTimeout () {
      const uiStore = getRoot(self).ui
      uiStore.openTimeoutPopup()
      self.logout()
    },

    setTimers(expiresAt) {
      const jsExpiresAt = new Date(toJS(expiresAt)) // convert from observable
      const luxonExpiresAt = DateTime.fromJSDate(jsExpiresAt)

      const uiStore = getRoot(self).ui
      const timeLeft = luxonExpiresAt.diffNow()
      const timeUntilWarning = (timeLeft > warningDuration.as('milliseconds'))
        ? luxonExpiresAt.minus(warningDuration).diffNow()
        : 0

      setTimer({
        onComplete: self.onTimeout,
        duration: timeLeft,
        ref: timeoutTimer
      })
      setTimer({
        onComplete: uiStore.openTimeoutWarningPopup,
        duration: timeUntilWarning,
        ref: warningTimer
      })
    },

    saveCredentials (snapshot) {
      localStorage.setItem(storageKey, JSON.stringify(snapshot))
    },

    deleteCredentials () {
      localStorage.removeItem(storageKey)
    }
  }))

export default Credentials
