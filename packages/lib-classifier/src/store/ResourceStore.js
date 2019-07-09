import asyncStates from '@zooniverse/async-states'
import { flow, getRoot, types } from 'mobx-state-tree'

import Resource from './Resource'

const ResourceStore = types
  .model('ResourceStore', {
    active: types.maybe(types.reference(Resource)),
    headers: types.maybe(types.frozen({
      // etag: types.string // setting this is causing the store to be set with a MST type and thus defined. Maybe a bug?
    })),
    resources: types.map(Resource),
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
        self.headers = response.headers
        const resource = response.body[type][0]
        self.loadingState = asyncStates.success
        return resource
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
        return undefined
      }
    }),

    reset () {
      self.headers = undefined
      self.active = undefined
      self.resources.clear()
    },

    setResource (resource) {
      if (resource) {
        try {
          self.resources.put(resource)
          self.loadingState = asyncStates.success
        } catch (error) {
          console.error(error)
        }
      }
    },

    setActive: flow(function * setActive (id = null) {
      const active = self.resources.get(id)
      if (!active) {
        const resource = yield self.fetchResource(id)
        self.setResource(resource)
      }
      self.active = id
    })
  }))

export default ResourceStore
