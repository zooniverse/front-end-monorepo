import { types } from 'mobx-state-tree'
import Resource from '../Resource'

const Project = types
  .model('Project', {
    configuration: types.frozen({}),
    display_name: types.string,
    experimental_tools: types.frozen([]),
    links: types.frozen({}),
    slug: types.string
  })
  .views(self => ({
    get defaultWorkflow() {
      const activeWorkflows = self.links['active_workflows']
      let singleActiveWorkflow
      if (activeWorkflows.length === 1) {
        [singleActiveWorkflow] = self.links['active_workflows']
      }
      const defaultWorkflow = self.configuration['default_workflow']
      return singleActiveWorkflow || defaultWorkflow
    }
  }))

export default types.compose('ProjectResource', Resource, Project)
