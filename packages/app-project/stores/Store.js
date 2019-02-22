import { getEnv, types } from 'mobx-state-tree'

import Collections from './Collections'
import Project from './Project'
import Recents from './Recents'
import User from './User'

const Store = types
  .model('Store', {
    collections: types.optional(Collections, {}),
    project: types.optional(Project, {}),
    recents: types.optional(Recents, {}),
    user: types.optional(User, {})
  })

  .views(self => ({
    get client () {
      return getEnv(self).client
    }
  }))

export default Store
