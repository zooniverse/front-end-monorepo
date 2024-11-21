import { types } from 'mobx-state-tree'
import Resource from '../Resource'

const TranslationStrings = types.map(types.maybeNull(types.string))

const Project = types
  .model('Project', {
    configuration: types.frozen({}),
    experimental_tools: types.frozen([]),
    links: types.frozen({}),
    strings: TranslationStrings,
    slug: types.string
  })
  .views(self => ({
    get defaultWorkflow() {
      const activeWorkflows = self.links['active_workflows']
      let singleActiveWorkflow
      if (activeWorkflows.length === 1) {
        [singleActiveWorkflow] = self.links['active_workflows']
      }
      return singleActiveWorkflow
    },

    get display_name() {
      return self.strings.get('display_name')
    },

    get isVolumetricViewer() {
      return self.experimental_tools.includes('volumetricViewer')
    },
  }))

export default types.compose('ProjectResource', Resource, Project)
