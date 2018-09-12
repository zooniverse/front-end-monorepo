import { types } from 'mobx-state-tree'
import Project from './Project'
import ResourceStore from './ResourceStore'

const ProjectStore = types
  .model({
    active: types.maybeNull(types.reference(Project)),
    resources: types.map(Project),
    type: types.optional(types.string, 'projects')
  })

export default types.compose('ProjectStore', ResourceStore, ProjectStore)
