import asyncStates from '@zooniverse/async-states'
import { flow, getRoot, types } from 'mobx-state-tree'

import Resource from '../Resource'

const ResourceStore = types
  .model('ResourceStore', {
    active: types.safeReference(Resource),
    headers: types.optional(types.model({
      etag: types.maybe(types.string)
    }), {}),
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
        if (response.body[type] && response.body[type].length > 0) {
          const resource = response.body[type][0]
          self.loadingState = asyncStates.success
          return resource
        } else {
          self.loadingState = asyncStates.success
          return undefined
        }
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

    getResource: flow(function * getResource(id) {
      const resource = self.resources.get(id)
      if (!resource) {
        const panoptesResource = yield self.fetchResource(id)
        self.setResources([panoptesResource])
      }
      return self.resources.get(id)
    }),

    setResources (resources = []) {
      if (resources && resources.length > 0) {
        try {
          resources.forEach((resource) => {
            if (resource) self.resources.put(resource)
          })
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
        self.setResources([resource])
      }
      self.active = id
    })
  }))

export default ResourceStore
