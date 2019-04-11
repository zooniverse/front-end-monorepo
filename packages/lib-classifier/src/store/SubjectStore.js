import asyncStates from '@zooniverse/async-states'
import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, onPatch, types } from 'mobx-state-tree'
import { getBearerToken } from './utils'
import { filterByLabel, filters } from '../components/Classifier/components/MetaTools/components/MetadataModal'
import ResourceStore from './ResourceStore'
import Subject from './Subject'

const SubjectStore = types
  .model('SubjectStore', {
    active: types.maybe(types.reference(Subject)),
    resources: types.optional(types.map(Subject), {}),
    type: types.optional(types.string, 'subjects')
  })

  .views(self => ({
    get isThereMetadata () {
      if (self.active) {
        const filteredMetadata = Object.keys(self.active.metadata)
          .filter((label) => filterByLabel(label, filters))
        return filteredMetadata.length > 0
      }

      return false
    }
  }))

  .actions(self => {
    function advance () {
      if (self.active) {
        const idToRemove = self.active.id
        self.resources.delete(idToRemove)
        self.active = undefined
      }

      if (self.resources.size < 3) {
        console.log('Fetching more subjects')
        self.populateQueue()
      }

      self.active = self.resources.values().next().value.id
    }

    function afterAttach () {
      createWorkflowObserver()
      createClassificationObserver()
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

    function createClassificationObserver () {
      const classificationDisposer = autorun(() => {
        onPatch(getRoot(self), (patch) => {
          const { path, value } = patch
          if (path === '/classifications/loadingState' && value === 'posting') self.advance()
        })
      })
      addDisposer(self, classificationDisposer)
    }

    function * populateQueue () {
      const root = getRoot(self)
      const client = root.client.panoptes
      const workflowId = root.workflows.active.id
      self.loadingState = asyncStates.loading

      try {
        const { authClient } = getRoot(self)
        const authorization = yield getBearerToken(authClient)
        const response = yield client.get(`/subjects/queued`, { workflow_id: workflowId }, { authorization })

        if (response.body.subjects && response.body.subjects.length > 0) {
          response.body.subjects.forEach(subject => {
            self.resources.put(subject)
          })

          if (!self.active) {
            self.advance()
          }
        }

        self.loadingState = asyncStates.success
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      }
    }

    function reset () {
      self.active = undefined
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

export default types.compose('SubjectResourceStore', ResourceStore, SubjectStore)
