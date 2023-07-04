import * as panoptesJS from '@zooniverse/panoptes-js'
import asyncStates from '@zooniverse/async-states'
import { applySnapshot, flow, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'

import numberString from '../types/numberString'

import UserPersonalization from './UserPersonalization'

async function fetchPanoptesUser() {
  try {
    const token = await auth.checkBearerToken()
    if (token) {
      const { user, error } = await panoptesJS.auth.decodeJWT(token)
      if (user) {
        return user
      }
      if (error) {
        throw error
      }
    }
    return await auth.checkCurrent()
  } catch (error) {
    console.log(error)
    return null
  }
}

const User = types
  .model('User', {
    avatar_src: types.maybeNull(types.string),
    display_name: types.maybeNull(types.string),
    error: types.maybeNull(types.frozen({})),
    id: types.maybeNull(numberString),
    loadingState: asyncStates.loading,
    login: types.maybeNull(types.string),
    personalization: types.optional(UserPersonalization, {})
  })

  .views(self => ({
    get displayName () {
      return self.display_name
    },

    get isLoggedIn () {
      return !!self.id
    }
  }))

  .actions(self => ({
    checkCurrent: flow(function * checkCurrent () {
      self.loadingState = asyncStates.loading
      try {
        const userResource = yield fetchPanoptesUser()
        self.loadingState = asyncStates.success
        if (userResource) {
          self.set(userResource)
        }
      } catch (error) {
        console.log(error)
        self.loadingState = asyncStates.error
        self.error = error
      }
    }),

    clear () {
      const loggedOutUser = {
        id: null,
        display_name: null,
        loadingState: asyncStates.success,
        login: null
      }
      applySnapshot(self, loggedOutUser)
      self.personalization.reset()
    },

    set (user) {
      self.id = user.id
      self.display_name = user.display_name
      self.login = user.login
      if (user.id) {
        self.personalization.load()
      }
    }
  }))

export default User
