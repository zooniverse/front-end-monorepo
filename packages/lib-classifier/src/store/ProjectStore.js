import { flow, getRoot, types } from 'mobx-state-tree'
import ResourceStore from './ResourceStore'
import Project from './Project'

const ProjectStore = types
  .model('ProjectStore', {
    resources: types.optional(types.map(Project), {}),
    active: types.maybe(types.reference(Project))
  })

export default types.compose(ResourceStore, ProjectStore)
