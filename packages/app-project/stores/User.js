import asyncStates from '@zooniverse/async-states'
import { flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'

import numberString from './types/numberString'

const User = types
  .model('User', {
    avatar_src: types.maybeNull(types.string),
    display_name: types.maybeNull(types.string),
    id: types.maybeNull(numberString),
    login: types.maybeNull(types.string)
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
      const userResource = yield auth.checkCurrent()
      if (userResource) {
        self.set(userResource)
      }
    }),

    clear () {
      self.id = null
    },

    set (user) {
      self.id = user.id
      self.display_name = user.display_name
      self.login = user.login
    }
  }))

export default User
