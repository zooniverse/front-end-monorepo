import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, types } from 'mobx-state-tree'
import ResourceStore from './ResourceStore'
import Subject from './Subject'

const SubjectStore = types
  .model('SubjectStore', {
    resources: types.optional(types.map(Subject), {}),
    active: types.maybe(types.reference(Subject)),
    queue: types.optional(types.array(types.reference(Subject)), [])
  })

  .actions(self => {
    function advance () {
      if (self.active) {
        const idToRemove = self.queue.shift()
        self.resources.delete(idToRemove)
      }

      if (self.queue.length < 3) {
        self.populateQueue()
      }

      self.active = self.queue[0]
    }

    function afterAttach () {
      createWorkflowObserver()
    }

    function createWorkflowObserver() {
      const workflowDisposer = autorun(() => {
        const workflow = getRoot(self).workflows.active
        if (workflow) {
          self.reset()
          self.populateQueue()
        }
      })
      addDisposer(self, workflowDisposer)
    }

    function * populateQueue () {
      const client = getRoot(self).client.panoptes
      const workflowId = getRoot(self).workflows.active.id

      const response = yield client.get(`/subjects/queued`, { workflow_id: workflowId })

      response.body.subjects.forEach(subject => {
        self.resources.put(subject)
        self.queue.push(subject.id)
      })

      if (!self.active) {
        self.advance()
      }
    }

    function reset () {
      self.active = null
      self.queue.clear()
      self.resources.clear()
    }

    // We set ResourceStore methods we don't want to expose as `undefined`
    return {
      advance,
      afterAttach,
      fetchResource: undefined,
      populateQueue: flow(populateQueue),
      reset,
      setActive: undefined
    }
  })


export default types.compose(ResourceStore, SubjectStore)
