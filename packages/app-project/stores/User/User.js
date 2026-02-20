import asyncStates from '@zooniverse/async-states'
import { reaction } from 'mobx'
import { addDisposer, applySnapshot, flow, getSnapshot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'

const isBrowser = typeof window !== 'undefined'

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
      return self.isLoggedIn && self.admin
    },

    get isLoaded() {
      return self.loadingState === asyncStates.success
    },

    get isLoggedIn () {
      return !!self.id
    }
  }))

  .volatile(self => ({
    _adminMode: false
  }))

  .views(self => ({
    get adminMode() {
      return self.isAdmin && self._adminMode
    }
  }))

  .actions(self => ({
    afterAttach() {
      self._createAdminModeObserver()
    },

    _createAdminModeObserver() {
      const adminModeDisposer = reaction(
        () => ({ isLoaded: self.isLoaded, isAdmin: self.isAdmin }),
        ({ isLoaded, isAdmin }) => {
          if (isLoaded) {
            if (isAdmin) {
              self.initAdminMode()
            } else if (isBrowser) {
              window.localStorage.removeItem('adminFlag')
            }
          }
        },
        { fireImmediately: true, name: 'adminModeInit' }
      )
      addDisposer(self, adminModeDisposer)
    },

    initAdminMode() {
      if (isBrowser && self.isAdmin) {
        self._adminMode = !!window.localStorage.getItem('adminFlag')
      }
    },

    setAdminMode(flag) {
      self._adminMode = flag
      if (isBrowser) {
        if (flag) {
          window.localStorage.setItem('adminFlag', 'true')
        } else {
          window.localStorage.removeItem('adminFlag')
        }
      }
    },

    toggleAdminMode() {
      self.setAdminMode(!self._adminMode)
    },

    clear() {
      const loggedOutUser = {
        id: null,
        display_name: null,
        login: null,
        loadingState: asyncStates.success,
        personalization: {
          projectPreferences: {
            loadingState: asyncStates.success
          }
        }
      }
      applySnapshot(self, loggedOutUser)
      self._adminMode = false
      if (isBrowser) {
        window.localStorage.removeItem('adminFlag')
      }
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
        current_user_roles: 'owner,collaborator,contributor',
        page_size: 100
      })
      if (self.id) {
        self.personalization.load(newUser)
      }
    }
  }))

export default User
