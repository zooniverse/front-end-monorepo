import asyncStates from '@zooniverse/async-states'
import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, types } from 'mobx-state-tree'

import ResourceStore from './ResourceStore'
import Subject from './Subject'

const SubjectStore = types
  .model('SubjectStore', {
    active: types.maybeNull(types.reference(Subject)),
    resources: types.map(Subject),
    queue: types.array(types.reference(Subject)),
    type: types.optional(types.string, 'subjects')
  })

  .actions(self => {
    function advance () {
      if (self.active) {
        const idToRemove = self.active.id
        self.queue.shift()
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

    function createWorkflowObserver () {
      const workflowDisposer = autorun(() => {
        const root = getRoot(self)
        if (root.workflows && root.workflows.active) {
          self.reset()
          self.populateQueue()
        }
      })
      addDisposer(self, workflowDisposer)
    }

    function * populateQueue () {
      const root = getRoot(self)
      const client = root.client.panoptes
      const workflowId = root.workflows.active.id
      self.loadingState = asyncStates.loading

      try {
        const response = yield client.get(`/subjects/queued`, { workflow_id: workflowId })

        response.body.subjects.forEach(subject => {
          self.resources.put(subject)
          self.queue.push(subject.id)
        })

        self.loadingState = asyncStates.success

        if (!self.active) {
          self.advance()
        }
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
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
