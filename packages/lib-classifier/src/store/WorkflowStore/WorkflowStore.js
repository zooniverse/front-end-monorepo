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

    function * selectWorkflow(id = self.defaultWorkflowID, subjectSetID, subjectID, canPreviewWorkflows = false) {
      if (!id) {
        throw new ReferenceError('No workflow ID available')
      }
      const availableWorkflows = canPreviewWorkflows ?
        self.project?.links?.workflows :
        self.project?.links?.active_workflows

      const { subjects } = getRoot(self)
      const activeWorkflow = tryReference(() => self.active)
      const activeSubjectSet = activeWorkflow?.subjectSet
      const activeSubject = tryReference(() => subjects.active)

      const workflowChanged = id !== activeWorkflow?.id
      const subjectSetChanged = !!subjectSetID && (subjectSetID !== activeSubjectSet?.id)
      const subjectChanged = !!subjectID && (subjectID !== activeSubject?.id)

      const shouldReload = subjects.resources.size === 0 ||
        workflowChanged ||
        subjectSetChanged ||
        subjectChanged

      if (shouldReload) {
        const projectID = self.project?.id
        let selectedSubjects
        if (availableWorkflows?.indexOf(id) > -1) {
          const workflow = yield self.getResource(id)
          self.resources.put(workflow)
          const selectedWorkflow = self.resources.get(id)
          if (subjectSetID) {
            // wait for the subject set to load before activating the workflow
            const subjectSet = yield selectedWorkflow.selectSubjectSet(subjectSetID)
          }
          if (subjectID && subjectChanged) {
            selectedSubjects = [ subjectID ]
          }
          self.setActive(id)
          try {
            subjects.reset()
            subjects.populateQueue(selectedSubjects)
          } catch (error) {
            console.log('Unable to reset subject store on URL change.')
            console.error(error)
          }
        } else {
          throw new ReferenceError(`unable to load workflow ${id} for project ${projectID}`)
        }
      }
    }

    return {
      selectWorkflow: flow(selectWorkflow)
    }
  })

export default types.compose('WorkflowResourceStore', ResourceStore, WorkflowStore)
