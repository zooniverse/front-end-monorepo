import asyncStates from '@zooniverse/async-states'
import { flow, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'

import Collections from './Collections'
import Recents from './Recents'
import UserPersonalization from './UserPersonalization'

import numberString from '@stores/types/numberString'

const User = types
  .model('User', {
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

    get isLoggedIn () {
      return !!self.id
    }
  }))

  .actions(self => ({
    clear() {
      self.id = null
      self.display_name = null
      self.login = null
      self.loadingState = asyncStates.success
    },

    set(user) {
      self.id = user.id
      self.display_name = user.display_name
      self.login = user.login
      self.loadingState = asyncStates.success
      self.recents.fetch()
      self.collections.fetchFavourites()
      self.collections.searchCollections({
        favorite: false,
        current_user_roles: 'owner,collaborator,contributor'
      })
      if (self.id) {
        self.personalization.load()
      }
    }
  }))

export default User
