import { getEnv, types } from 'mobx-state-tree'

import Project from './Project'
import User from './User'

const Store = types
  .model('Store', {
    project: types.optional(Project, {}),
    user: types.optional(User, {})
  })

  .views(self => ({
    get client () {
      return getEnv(self).client
    }
  }))

export default Store
