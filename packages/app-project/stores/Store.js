import { getEnv, types } from 'mobx-state-tree'
import Project from './Project'

const Store = types
  .model('Store', {
    project: types.optional(Project, Project.create())
  })

  .views(self => ({
    get client () {
      return getEnv(self).client
    }
  }))

export default Store
