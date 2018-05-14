import { types } from 'mobx-state-tree'
import Project, { defaultProjectState } from './Project'

const Store = types
  .model('Store', {
    project: types.optional(Project, defaultProjectState)
  })

export default Store
