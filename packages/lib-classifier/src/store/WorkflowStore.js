import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, types } from 'mobx-state-tree'
import ResourceStore from './ResourceStore'
import Workflow from './Workflow'

const WorkflowStore = types
  .model('WorkflowStore', {
    active: types.maybe(types.reference(Workflow)),
    resources: types.optional(types.map(Workflow), {})
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

    function reset () {
      self.active = null
      self.resources.clear()
    }

    function selectWorkflow (id) {
      if (id) {
        self.setActive(id)
      } else {
        const project = getRoot(self).projects.active
        const defaultWorkflow = project.configuration.default_workflow
        self.setActive(defaultWorkflow)
      }
    }

    return {
      afterAttach,
      reset
    }
  })

export default types.compose(ResourceStore, WorkflowStore)
