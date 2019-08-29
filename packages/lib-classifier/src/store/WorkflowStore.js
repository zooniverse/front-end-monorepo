import { autorun } from 'mobx'
import { addDisposer, getRoot, isValidReference, types } from 'mobx-state-tree'
import ResourceStore from './ResourceStore'
import Workflow from './Workflow'
import queryString from 'query-string'

const WorkflowStore = types
  .model('WorkflowStore', {
    active: types.safeReference(Workflow),
    resources: types.map(Workflow),
    type: types.optional(types.string, 'workflows')
  })

  .actions(self => {
    function afterAttach() {
      createProjectObserver()
      createUPPObserver()
    }

    function createProjectObserver() {
      const projectDisposer = autorun(() => {
        const validProjectReference = isValidReference(() => getRoot(self).projects.active)
        if (validProjectReference) {
          self.reset()
          const queryParamId = getQueryParamId()
          selectWorkflow(queryParamId)
        }
      }, { name: 'Workflow Store Project Observer autorun' })
      addDisposer(self, projectDisposer)
    }

    function createUPPObserver() {
      const uppDisposer = autorun(() => {
        const validUPPReference = isValidReference(() => getRoot(self).userProjectPreferences.active)
        const validWorkflowReference = isValidReference(() => self.active)
        if (validUPPReference && !validWorkflowReference) {
          self.reset()
          selectWorkflow()
        }
      }, { name: 'Workflow Store UPP Observer autorun' })
      addDisposer(self, uppDisposer)
    }

    function getQueryParamId() {
      if (window.location && window.location.search) {
        const { workflow } = queryString.parse(window.location.search) // Search the query string for the 'project='
        if (workflow) {
          return workflow
        }

        return undefined
      }

      return undefined
    }

    function getDefaultWorkflowId() {
      const validProjectReference = isValidReference(() => getRoot(self).projects.active)
      let id = ''

      if (validProjectReference) {
        const project = getRoot(self).projects.active
        if (project.configuration && project.configuration.default_workflow) {
          id = project.configuration.default_workflow
        } else if (project.links && project.links.active_workflows[0]) {
          // TODO: This should be changed to select an id randomly out of the active workflows array
          id = project.links.active_workflows[0]
        }
      }

      return id
    }

    function selectWorkflow(id = getDefaultWorkflowId()) {
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

export default types.compose('WorkflowResourceStore', ResourceStore, WorkflowStore)