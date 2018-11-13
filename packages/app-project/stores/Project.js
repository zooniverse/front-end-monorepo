import asyncStates from '@zooniverse/async-states'
import { flow, getRoot, types } from 'mobx-state-tree'

import numberString from './types/numberString'

const Project = types
  .model('Project', {
    background: types.frozen({}),
    displayName: types.maybeNull(types.string),
    error: types.maybeNull(types.frozen({})),
    id: types.maybeNull(numberString),
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
          const query = { slug }
          const response = yield client.getWithLinkedResources({ query })
          const project = response.body.projects[0]
          const linked = response.body.linked

          self.displayName = project.display_name
          self.id = project.id
          self.slug = project.slug
          self.background = linked.backgrounds[0] || {}

          self.loadingState = asyncStates.success
        } catch (error) {
          self.error = error.message
          self.loadingState = asyncStates.error
        }
      })
    }
  })

export default Project
