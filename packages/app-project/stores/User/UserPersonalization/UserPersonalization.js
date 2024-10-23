import asyncStates from '@zooniverse/async-states'
import { addDisposer, getRoot, types } from 'mobx-state-tree'
import { autorun } from 'mobx'

import Notifications from './Notifications'
import UserProjectPreferences from './UserProjectPreferences'
import YourStats from './YourStats'

const UserPersonalization = types
  .model('UserPersonalization', {
    notifications: types.optional(Notifications, {}),
    projectPreferences: types.optional(UserProjectPreferences, {}),
    sessionCount: types.optional(types.number, 0),
    stats: types.optional(YourStats, {})
  })
  .views(self => ({
    get counts() {
      const today = self.todaysCount
      const total = self.stats.total

      return {
        today,
        total
      }
    },

    get sessionCountIsDivisibleByFive() {
      return self.sessionCount % 5 === 0
    },

    get todaysCount() {
      let todaysCount = 0
      try {
        todaysCount = self.todaysStats.count
      } catch (error) {
        todaysCount = self.sessionCount
      }
      return todaysCount
    },

    get todaysStats() {
      const todaysDate = new Date()
      if (self.stats.thisWeek.length === 7) {
        return self.stats.thisWeek.find(stat => stat.dayNumber === todaysDate.getDay())
      }
      return null
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

      increment() {
        self.sessionCount = self.sessionCount + 1
        self.todaysStats?.increment()
        self.stats.incrementTotal()
        const { user } = getRoot(self)
        if (user?.id && self.sessionCountIsDivisibleByFive) {
          self.projectPreferences.refreshSettings()
        }
      },

      load(newUser = true) {
        self.notifications.fetchAndSubscribe()
        if (newUser) {
          self.stats.fetchDailyCounts()
          self.projectPreferences.fetchResource()
        } else {
          self.projectPreferences.refreshSettings()
        }
      },

      reset() {
        self.notifications.reset()
        self.projectPreferences.reset()
        self.projectPreferences.setLoadingState(asyncStates.success)
        self.stats.reset()
        self.sessionCount = 0
      }
    }
  })

export default UserPersonalization
