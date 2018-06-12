import { getRoot, flow, types } from 'mobx-state-tree'
import Workflow from './Workflow'

const Workflows = types
  .model('Workflows', {
    current: types.maybe(types.reference(Workflow)),
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

        if (!self.current) {
          self.current = project.configuration.default_workflow
        }
      } catch (error) {
        console.info(error)
      }
    }),

    reset() {
      self.current = null
      self.workflows.clear()
    }
  }))

export default Workflows
