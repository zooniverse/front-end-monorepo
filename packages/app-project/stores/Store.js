import { addMiddleware, getEnv, types } from 'mobx-state-tree'
import { logNodeError } from '../src/helpers/logger'

import Collections from './Collections'
import Project from './Project'
import Recents from './Recents'
import UI from './UI'
import User from './User'
import YourStats from './YourStats'

const Store = types
  .model('Store', {
    collections: types.optional(Collections, {}),
    project: types.optional(Project, {}),
    recents: types.optional(Recents, {}),
    ui: types.optional(UI, {}),
    user: types.optional(User, {}),
    yourStats: types.optional(YourStats, {})
  })

  .views(self => ({
    get client () {
      return getEnv(self).client
    }
  }))

  .actions(self => ({
    afterCreate () {
      addMiddleware(self, (call, next, abort) => {
        try {
          next(call)
        } catch (error) {
          console.error('Project App MST error:', error)
          logNodeError(error)
        }
      })
    },

    testError () {
      throw new Error('Testing errors')
    }
  }))

export default Store
