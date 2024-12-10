import asyncStates from '@zooniverse/async-states'
import { addDisposer, getRoot, types } from 'mobx-state-tree'
import { autorun } from 'mobx'

import Notifications from './Notifications'
import UserProjectPreferences from './UserProjectPreferences'

const UserPersonalization = types
  .model('UserPersonalization', {
    notifications: types.optional(Notifications, {}),
    projectPreferences: types.optional(UserProjectPreferences, {}),
    sessionCount: types.optional(types.number, 0),
  })
  .views(self => ({
    get sessionCountIsDivisibleByFive() {
      return self.sessionCount % 5 === 0
    }
  }))
  .actions(self => {
    function _onUserChange() {
      const { user } = getRoot(self)
      if (!user.isLoggedIn && (user.loadingState === asyncStates.success)) {
        self.projectPreferences.setLoadingState(asyncStates.success)
      }
    }

    return {
      afterAttach() {
        addDisposer(self, autorun(_onUserChange))
      },

      incrementSessionCount() {
        self.sessionCount = self.sessionCount + 1
        const { user } = getRoot(self)
        if (user?.id && self.sessionCountIsDivisibleByFive) {
          self.projectPreferences.refreshSettings()
        }
      },

      load(newUser = true) {
        self.notifications.fetchAndSubscribe()
        if (newUser) {
          self.projectPreferences.fetchResource()
        } else {
          self.projectPreferences.refreshSettings()
        }
      },

      reset() {
        self.notifications.reset()
        self.projectPreferences.reset()
        self.projectPreferences.setLoadingState(asyncStates.success)
        self.sessionCount = 0
      }
    }
  })

export default UserPersonalization
