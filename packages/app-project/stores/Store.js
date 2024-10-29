import asyncStates from '@zooniverse/async-states'
import {
  addDisposer,
  addMiddleware,
  getEnv,
  types
} from 'mobx-state-tree'
import { autorun } from 'mobx'
import logToSentry from '../src/helpers/logger/logToSentry.js'

import Organization from './Organization'
import Project from './Project'
import UI from './UI'
import User from './User'

const Store = types
  .model('Store', {
    organization: types.optional(Organization, {}),
    project: types.optional(Project, {}),
    ui: types.optional(UI, {}),
    user: types.optional(User, {})
  })

  .views(self => ({
    get client () {
      return getEnv(self).client
    },

    get appLoadingState () {
      const loadingStates = [self.user.loadingState, self.user.personalization.projectPreferences.loadingState, self.project.loadingState]
      if (loadingStates.includes(asyncStates.error)) {
        return asyncStates.error
      }

      if (loadingStates.includes(asyncStates.loading)) {
        return asyncStates.loading
      }

      if (loadingStates.every(state => state === asyncStates.success)) {
        return asyncStates.success
      }

      return asyncStates.initialized
    }
  }))

  .actions(self => {
    /* Stats and session count should be refreshed project id changes */
    function _onProjectChange() {
      const projectID = self.project?.id
      if (projectID) {
        self.user.personalization.refreshCounts()
      }
    }

    return {
      afterCreate() {
        addDisposer(self.project, autorun(_onProjectChange))
        addMiddleware(self, (call, next, abort) => {
          try {
            next(call)
          } catch (error) {
            console.error('Project App MST error:', error)
            logToSentry(error)
          }
        })
      },

      testError () {
        throw new Error('Testing errors')
      }
    }
  })

export default Store
