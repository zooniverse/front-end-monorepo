import { flow, getRoot, types } from 'mobx-state-tree'
import { get } from 'lodash'
import asyncStates from '../helpers/asyncStates'
import numberString from './types/numberString'

const Project = types
  .model('Project', {
    displayName: types.maybe(types.string),
    error: types.optional(types.frozen, null),
    id: types.maybe(numberString),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized)
  })

  .actions(self => {
    let client

    return {
      afterAttach () {
        client = getRoot(self).client.projects
      },

      fetch: flow(function * fetch (slug) {
        self.loadingState = asyncStates.loading
        try {
          const project = yield client.get({ query: { slug } })
            .then(response => get(response, 'body.projects[0]'))
          self.displayName = project.display_name
          self.id = project.id
          self.loadingState = asyncStates.success
        } catch (error) {
          self.error = error.message
          self.loadingState = asyncStates.error
        }
      })
    }
  })

export default Project
