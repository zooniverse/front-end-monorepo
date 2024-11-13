import { isValidReference, types } from 'mobx-state-tree'
import Project from './Project'
import ResourceStore from './ResourceStore'

const ProjectStore = types
  .model('ProjectStore', {
    active: types.safeReference(Project),
    resources: types.map(Project),
    type: types.optional(types.string, 'projects')
  })
  .views(self => ({
    get isVolumetricViewer() {
      return (isValidReference(() => self.active))
        ? self.active.experimental_tools.includes('volumetricViewer')
        : false
    }
  }))

export default types.compose('ProjectResourceStore', ResourceStore, ProjectStore)
