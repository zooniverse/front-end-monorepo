import asyncStates from '@zooniverse/async-states'
import { applySnapshot, getSnapshot, types } from 'mobx-state-tree'

import Collections from './Collections'
import Recents from './Recents'
import UserPersonalization from './UserPersonalization'

import numberString from '@stores/types/numberString'

const User = types
  .model('User', {
    admin: types.optional(types.boolean, false),
    avatar_src: types.maybeNull(types.string),
    collections: types.optional(Collections, {}),
    display_name: types.maybeNull(types.string),
    error: types.maybeNull(types.frozen({})),
    id: types.maybeNull(numberString),
    login: types.maybeNull(types.string),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    personalization: types.optional(UserPersonalization, {}),
    recents: types.optional(Recents, {})
  })

  .views(self => ({
    get displayName () {
      return self.display_name
    },

    get isAdmin() {
      return self.admin
    },

    get isLoggedIn () {
      return !!self.id
    }
  }))

  .actions(self => ({
    clear() {
      self.personalization.reset()
      const loggedOutUser = {
        id: null,
        display_name: null,
        login: null,
        loadingState: asyncStates.success,
      }
      applySnapshot(self, loggedOutUser)
    },

    set(user) {
      const newUser = self.id !== user?.id
      const { personalization } = getSnapshot(self)
      const userSnapshot = {
        personalization,
        ...user,
        loadingState: asyncStates.success
      }
      applySnapshot(self, userSnapshot)
      self.recents.fetch()
      self.collections.searchCollections({
        favorite: false,
        current_user_roles: 'owner,collaborator,contributor'
      })
      if (self.id) {
        self.personalization.load(newUser)
      }
    }
  }))

export default User
