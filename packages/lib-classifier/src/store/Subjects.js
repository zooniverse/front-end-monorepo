import { addDisposer, getRoot, onPatch, flow, types } from 'mobx-state-tree'
import Subject from './Subject'

const Subjects = types
  .model('Subjects', {
    queue: types.optional(types.array(Subject), [])
  })

  .views(self => ({
    get current () {
      return self.queue.length ? self.queue[0] : null
    }
  }))

  .actions(self => ({
    addCurrentWorkflowListener () {
      const { workflows } = getRoot(self)
      const fetchDisposer = onPatch(workflows, call => {
        if (call.path === '/current') {
          return self.fetch()
        }
      })
      addDisposer(self, fetchDisposer)
    },

    advance () {
      self.queue.shift()
      if (self.queue.length < 3) {
        self.fetch()
      }
    },

    afterAttach () {
      self.addCurrentWorkflowListener()
    },

    fetch: flow(function * fetch () {
      const { client, workflows } = getRoot(self)

      if (!workflows.current || !workflows.current.id) {
        throw new ReferenceError('No current workflow available')
      }

      try {
        const workflowId = workflows.current.id
        const response = yield client.get(`/subjects/queued`, { workflow_id: workflowId })
        const subjects = response.body.subjects
        subjects.forEach(subject => self.queue.push(subject))
      } catch (error) {
        console.info(error)
      }
    })
  }))

export default Subjects
