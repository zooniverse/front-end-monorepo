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
    stats: types.optional(YourStats, {})
  })
  .volatile(self => ({
    sessionCount: 0
  }))
  .views(self => ({
    get counts() {
      const todaysDate = new Date()
      let today
      try {
        const todaysCount = self.stats.thisWeek.length === 7
          ? self.stats.thisWeek[todaysDate.getDay() - 1].count
          : 0
        today = todaysCount + self.sessionCount
      } catch (error) {
        today = 0
      }

      return {
        today,
        total: self.totalClassificationCount
      }
    },

    get sessionCountIsDivisibleByFive() {
      return self.sessionCount % 5 === 0
    },

    get totalClassificationCount() {
      const activityCount = self.projectPreferences?.activity_count || 0
      return  activityCount + self.sessionCount
    }
  }))
  .actions(self => {
    function createParentObserver() {
      const parentDisposer = autorun(() => {
        const { project, user } = getRoot(self)
        if (project.id && user.id) {
          self.notifications.fetchAndSubscribe()
          self.projectPreferences.fetchResource()
          self.stats.fetchDailyCounts()
        } else if (user.loadingState === asyncStates.success) {
          self.projectPreferences.setLoadingState(asyncStates.success)
        }
      })
      addDisposer(self, parentDisposer)
    }
    return {
      afterAttach() {
        createParentObserver()
      },

      increment() {
        self.sessionCount = self.sessionCount + 1

        const { user } = getRoot(self)
        if (user?.id && self.sessionCountIsDivisibleByFive) {
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