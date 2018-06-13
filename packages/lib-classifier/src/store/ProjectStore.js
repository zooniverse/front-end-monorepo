import { types } from 'mobx-state-tree'
import Project from './Project'
import ResourceStore from './ResourceStore'

const ProjectStore = types
  .model('ProjectStore', {
    active: types.maybe(types.reference(Project)),
    resources: types.optional(types.map(Project), {})
  })

export default types.compose(ResourceStore, ProjectStore)
