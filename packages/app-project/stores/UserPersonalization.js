import { addDisposer, getRoot, types } from 'mobx-state-tree'
import { autorun } from 'mobx'
import asyncStates from '@zooniverse/async-states'
import UserProjectPreferences from './UserProjectPreferences'
import YourStats from './YourStats'

const UserPersonalization = types
  .model('UserPersonalization', {
    projectPreferences: types.optional(UserProjectPreferences, {}),
    stats: types.optional(YourStats, {}),
    totalClassificationCount: 0
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
    }
  }))
  .actions(self => {
    function createParentObserver() {
      const parentDisposer = autorun(() => {
        const { project, user } = getRoot(self)
        if (project.id && user.id) {
          self.projectPreferences.fetchResource()
          self.stats.fetchDailyCounts()
        } else if (user.loadingState === asyncStates.success) {
          self.projectPreferences.setLoadingState(asyncStates.success)
        } else {
          self.projectPreferences.reset()
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
        self.totalClassificationCount = self.totalClassificationCount + 1

        if (self.sessionCountIsDivisibleByFive) {
          self.projectPreferences.refreshResource()
        }
      },

      setTotalClassificationCount(count) {
        self.totalClassificationCount = count
      }
    }
  })

export default UserPersonalization