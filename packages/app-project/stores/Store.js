import { addMiddleware, getEnv, types } from 'mobx-state-tree'
import { logNodeError } from '../src/helpers/logger'

import Auth from './Auth'
import Collections from './Collections'
import Config from './Config'
import Project from './Project'
import Recents from './Recents'
import UI from './UI'
import User from './User'
import YourStats from './YourStats'

const Store = types
  .model('Store', {
    auth: types.optional(Auth, {}),
    collections: types.optional(Collections, {}),
    config: types.optional(Config, {}),
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
