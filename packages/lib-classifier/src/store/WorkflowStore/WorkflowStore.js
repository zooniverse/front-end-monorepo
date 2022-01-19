import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, tryReference, types } from 'mobx-state-tree'
import ResourceStore from '@store/ResourceStore'
import Workflow from './Workflow'
import queryString from 'query-string'

const WorkflowStore = types
  .model('WorkflowStore', {
    active: types.safeReference(Workflow),
    resources: types.map(Workflow),
    type: types.optional(types.string, 'workflows')
  })

  .views(self => ({
    get defaultWorkflowID() {
      const { project } = self
      return project?.defaultWorkflow || ''
    },

    get project() {
      const activeProject = getRoot(self).projects.active
      return tryReference(() => activeProject)
    }
  }))

  .actions(self => {

    function * selectWorkflow (id = self.defaultWorkflowID, subjectSetID, subjectID) {
      if (id) {
        const { subjects } = getRoot(self)
        const activeWorkflows = self.project?.links?.active_workflows || []
        const activeSubject = tryReference(() => subjects.active)
        const projectID = self.project?.id
        let selectedSubjects
        if (activeWorkflows.indexOf(id) > -1) {
          const workflow = yield self.getResource(id)
          self.resources.put(workflow)
          const selectedWorkflow = self.resources.get(id)
          if (subjectSetID) {
            // wait for the subject set to load before activating the workflow
            const subjectSet = yield selectedWorkflow.selectSubjectSet(subjectSetID)
          }
          if (subjectID && subjectID !== activeSubject?.id) {
            selectedSubjects = [ subjectID ]
          }
          self.setActive(id)
          subjects.reset()
          subjects.populateQueue(selectedSubjects)
        } else {
          throw new ReferenceError(`unable to load workflow ${id} for project ${projectID}`)
        }
      } else {
        throw new ReferenceError('No workflow ID available')
      }
    }

    return {
      selectWorkflow: flow(selectWorkflow)
    }
  })

export default types.compose('WorkflowResourceStore', ResourceStore, WorkflowStore)
