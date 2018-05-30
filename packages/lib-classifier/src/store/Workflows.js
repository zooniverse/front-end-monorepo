import { getRoot, flow, types } from 'mobx-state-tree'
import Workflow from './Workflow'

const Workflows = types
  .model('Workflows', {
    activeWorkflow: types.maybe(types.reference(Workflow)),
    workflows: types.optional(types.array(Workflow), [])
  })

  .actions(self => ({
    afterAttach () {
      self.fetchWorkflows()
    },

    fetchWorkflows: flow(function * fetchWorkflows () {
      const { client, project } = getRoot(self)
      const workflowIds = project.links.active_workflows

      try {
        const workflowFetchers = workflowIds.map(workflowId =>
          client.get(`/workflows/${workflowId}`))
        const responses = yield Promise.all(workflowFetchers)
        responses.forEach(response => {
          const workflow = response.body.workflows[0]
          self.workflows.push(workflow)
        })

        if (!self.activeWorkflow) {
          self.setActiveWorkflow(self.workflows[0].id)
        }
      } catch (error) {
        console.info(error)
      }
    }),

    setActiveWorkflow (workflowId) {
      self.activeWorkflow = workflowId
    }
  }))

export default Workflows
