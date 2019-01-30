import asyncStates from '@zooniverse/async-states'
import { flow, getRoot, types } from 'mobx-state-tree'

import numberString from './types/numberString'

const User = types
  .model('User', {
    avatar_src: types.maybeNull(types.string),
    display_name: types.maybeNull(types.string),
    id: types.maybeNull(numberString)
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
    clear () {
      self.id = null
    },

    set (user) {
      self.id = user.id
      self.display_name = user.display_name
    }
  }))

export default User
