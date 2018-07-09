import { flow, getRoot, types } from 'mobx-state-tree'
import asyncStates from '../helpers/asyncStates'
import Resource from './Resource'

const ResourceStore = types
  .model('ResourceStore', {
    active: types.maybe(types.reference(Resource)),
    resources: types.optional(types.map(Resource), {}),
    loadingState: types.optional(types.enumeration('loadingState', asyncStates.values), asyncStates.initialized),
    type: types.string
  })

  .actions(self => ({
    fetchResource: flow(function * fetchResource (id) {
      const client = getRoot(self).client.panoptes
      const { type } = self
      self.loadingState = asyncStates.loading
      try {
        const response = yield client.get(`/${type}/${id}`)
        const resource = response.body[type][0]
        self.loadingState = asyncStates.success
        return resource
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      }
    }),

    reset () {
      self.active = null
      self.resources.clear()
    },

    setActive: flow(function * setActive (id) {
      // console.info('setActive', id)
      const active = self.resources.get(id) || null

      if (!active) {
        const resource = yield self.fetchResource(id)
        self.resources.put(resource)
      }

      self.active = id
    })
  }))

export default ResourceStore
