import { flow, getRoot, types } from 'mobx-state-tree'
import _ from 'lodash'
import { panoptes } from '@zooniverse/panoptes-js'
import asyncStates from './asyncStates'

const Project = types
  .model('Project', {
    displayName: types.optional(types.string, ''),
    error: types.optional(types.frozen, null),
    id: types.optional(types.string, ''),
    state: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized)
  })

  .actions(self => ({
    fetch: flow(function * fetch (slug) {
      self.state = 'loading'
      const { client } = getRoot(self)
      try {
        const project = yield client.get('/projects', { slug })
          .then(response => _.get(response, 'body.projects[0]'))
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
