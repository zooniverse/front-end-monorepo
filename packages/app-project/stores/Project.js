import { flow, getRoot, types } from 'mobx-state-tree'
import { get } from 'lodash'
import asyncStates from './asyncStates'

const Project = types
  .model('Project', {
    displayName: types.optional(types.string, ''),
    error: types.optional(types.frozen, null),
    id: types.optional(types.string, ''),
    state: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized)
  })

  .volatile(self => ({
    client: {}
  }))

  .actions(self => ({
    afterAttach () {
      self.client = getRoot(self).client.projects
    },

    fetch: flow(function * fetch (slug) {
      self.state = asyncStates.loading
      try {
        const project = yield self.client.get({ query: { slug }})
          .then(response => get(response, 'projects[0]'))
        self.displayName = project.display_name
        self.id = project.id
        self.state = asyncStates.success
      } catch (error) {
        self.error = error
        self.state = asyncStates.error
      }
    })
  }))

export default Project
