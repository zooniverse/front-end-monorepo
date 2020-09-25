import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, tryReference, types } from 'mobx-state-tree'
import ResourceStore from '../ResourceStore'
import Workflow from '../Workflow'
import queryString from 'query-string'

const WorkflowStore = types
  .model('WorkflowStore', {
    active: types.safeReference(Workflow),
    resources: types.map(Workflow),
    type: types.optional(types.string, 'workflows')
  })

  .views(self => ({
    get project () {
      const activeProject = getRoot(self).projects.active
      return tryReference(() => activeProject)
    }
  }))

  .actions(self => {

    function afterAttach() {
      createProjectObserver()
      createUPPObserver()
    }

    function createProjectObserver() {
      const projectDisposer = autorun(() => {
        const project = self.project
        const workflow = tryReference(() => self.active)
        if (project && !workflow) {
          // TODO request for the workflow if project has changed and there isn't one already
          // self.reset()
          // selectWorkflow()
        }
      }, { name: 'Workflow Store Project Observer autorun' })
      addDisposer(self, projectDisposer)
    }

    function createUPPObserver() {
      const uppDisposer = autorun(() => {
        const upp = tryReference(() => getRoot(self).userProjectPreferences?.active)
        const workflow = tryReference(() => self.active)
        if (upp && !workflow) {
          // TODO validate and get workflow id from UPP to select
          // self.reset()
          // selectWorkflow()
        }
      }, { name: 'Workflow Store UPP Observer autorun' })
      addDisposer(self, uppDisposer)
    }

    function getDefaultWorkflowId () {
      const { project } = self
      let id = ''

      if (project) {
        if (project.configuration && project.configuration.default_workflow) {
          id = project.configuration.default_workflow
        } else if (project.links && project.links.active_workflows[0]) {
          // TODO: This should be changed to select an id randomly out of the active workflows array
          id = project.links.active_workflows[0]
        }
      }

      return id
    }

    function * selectWorkflow (id = getDefaultWorkflowId(), subjectSetID) {
      if (id) {
        const activeWorkflows = self.project?.links?.active_workflows || []
        const projectID = self.project?.id
        if (activeWorkflows.indexOf(id) > -1) {
          const workflow = yield self.getResource(id)
          self.resources.put(workflow)
          if (subjectSetID) {
            const selectedWorkflow = self.resources.get(id)
            // wait for the subject set to load before activating the workflow
            const subjectSet = yield selectedWorkflow.selectSubjectSet(subjectSetID)
          }
          self.setActive(id)
        } else {
          throw new ReferenceError(`unable to load workflow ${id} for project ${projectID}`)
        }
      } else {
        throw new ReferenceError('No workflow ID available')
      }
    }

    return {
      afterAttach,
      selectWorkflow: flow(selectWorkflow)
    }
  })

export default types.compose('WorkflowResourceStore', ResourceStore, WorkflowStore)
