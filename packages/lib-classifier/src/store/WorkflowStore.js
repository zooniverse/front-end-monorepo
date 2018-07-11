import { autorun } from 'mobx'
import { addDisposer, getRoot, types } from 'mobx-state-tree'
import ResourceStore from './ResourceStore'
import Workflow from './Workflow'

const WorkflowStore = types
  .model('WorkflowStore', {
    active: types.maybe(types.reference(Workflow)),
    resources: types.optional(types.map(Workflow), {}),
    type: types.optional(types.string, 'workflows')
  })

  .actions(self => {
    function afterAttach () {
      createProjectObserver()
    }

    function createProjectObserver () {
      const projectDisposer = autorun(() => {
        const project = getRoot(self).projects.active
        if (project) {
          self.reset()
          selectWorkflow()
        }
      })
      addDisposer(self, projectDisposer)
    }

    function getDefaultWorkflowId () {
      const project = getRoot(self).projects.active
      const { configuration, links } = project
      let id = null

      if (project) {
        if (configuration && configuration.default_workflow) {
          id = configuration.default_workflow
        } else if (links && links.active_workflows[0]) {
          id = links.active_workflows[0]
        }
      }

      return id
    }

    function selectWorkflow (id = getDefaultWorkflowId()) {
      if (id) {
        self.setActive(id)
      } else {
        throw new ReferenceError('No workflow ID available')
      }
    }

    return {
      afterAttach
    }
  })

export default types.compose(ResourceStore, WorkflowStore)
