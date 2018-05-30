import { types } from 'mobx-state-tree'
import Project from './Project'

const Store = types
  .model('Store', {
    project: types.optional(Project, Project.create()),
  })

export default Store
