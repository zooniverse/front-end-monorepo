import { addMiddleware, getEnv, types } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'
import { logToSentry } from '../src/helpers/logger'

import Collections from './Collections'
import Project from './Project'
import Recents from './Recents'
import UI from './UI'
import User from './User'

const Store = types
  .model('Store', {
    collections: types.optional(Collections, {}),
    project: types.optional(Project, {}),
    recents: types.optional(Recents, {}),
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

  .actions(self => ({
    afterCreate () {
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
  }))

export default Store
