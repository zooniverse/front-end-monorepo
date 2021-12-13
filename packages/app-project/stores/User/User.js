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
    checkCurrent: flow(function* checkCurrent() {
      self.loadingState = asyncStates.loading
      try {
        const userResource = yield auth.checkCurrent()
        self.loadingState = asyncStates.success
        if (userResource) {
          self.set(userResource)
        } else {
          self.clear()
        }
      } catch (error) {
        console.log(error)
        self.loadingState = asyncStates.error
        self.error = error
      }
    }),

    clear() {
      self.id = null
      self.display_name = null
      self.login = null
      self.collections = Collections.create({})
      self.personalization.reset()
      self.recents = Recents.create({})
    },

    set(user) {
      if (user.id !== self.id) {
        self.id = user.id
        self.display_name = user.display_name
        self.login = user.login
        self.recents.fetch()
      }
      /*
        Request preferences, stats, collections and project favourites, which may be stale.
      */
      self.collections.fetchFavourites()
      self.personalization.load()
      self.collections.searchCollections({
        favorite: false,
        current_user_roles: 'owner,collaborator,contributor'
      })
    }
  }))

export default User
